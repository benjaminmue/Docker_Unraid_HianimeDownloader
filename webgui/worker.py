"""
Background worker for executing download jobs.
Uses subprocess to run the existing main.py with proper progress tracking.
"""

import asyncio
import os
import re
import shlex
import signal
import subprocess
from datetime import datetime
from pathlib import Path
from typing import Optional, Dict, Any, List
import json
import logging

from .database import Database, JobStatus, JobStage, STAGE_PROGRESS

logger = logging.getLogger("webgui.worker")

# Whitelist of allowed command-line arguments
ALLOWED_ARGS = {
    '--ep-from', '--ep-to', '--season', '--download-type',
    '--server', '--no-subtitles', '--aria', '--quality',
    '--sub-lang', '--dub-lang', '--format'
}


class JobWorker:
    def __init__(self, db: Database, config_dir: str, download_dir: str):
        self.db = db
        self.config_dir = Path(config_dir)
        self.download_dir = Path(download_dir)
        self.log_dir = self.config_dir / "logs"
        # Try to create log directory, but don't fail if we can't
        try:
            self.log_dir.mkdir(parents=True, exist_ok=True)
        except PermissionError:
            logger.warning(f"Cannot create log directory {self.log_dir}, will try at runtime")
        self.active_processes: Dict[int, subprocess.Popen] = {}
        self.running = False

    def get_log_file(self, job_id: int) -> Path:
        """Get log file path for a job."""
        return self.log_dir / f"job_{job_id}.log"

    def validate_extra_args(self, extra_args: str) -> List[str]:
        """Safely parse and validate extra arguments against injection attacks."""
        if not extra_args or not extra_args.strip():
            return []

        # Check for dangerous shell metacharacters
        dangerous_chars = [';', '|', '&', '`', '$', '(', ')', '<', '>', '\n', '\r', '\\']
        if any(char in extra_args for char in dangerous_chars):
            raise ValueError(f"Invalid characters in extra_args: shell metacharacters not allowed")

        # Parse safely using shlex (handles quotes properly)
        try:
            parts = shlex.split(extra_args)
        except ValueError as e:
            raise ValueError(f"Invalid extra_args format: {e}")

        validated = []
        i = 0
        while i < len(parts):
            arg = parts[i]

            # Must be a flag starting with --
            if not arg.startswith('--'):
                raise ValueError(f"Argument '{arg}' must start with '--'")

            # Extract base argument name (before =)
            base_arg = arg.split('=')[0]

            # Check against whitelist
            if base_arg not in ALLOWED_ARGS:
                raise ValueError(f"Argument '{base_arg}' not in allowed list")

            validated.append(arg)

            # If arg has no = and next part doesn't start with --, it's the value
            if '=' not in arg and i + 1 < len(parts) and not parts[i + 1].startswith('-'):
                validated.append(parts[i + 1])
                i += 1

            i += 1

        return validated

    async def start(self):
        """Start the worker loop."""
        self.running = True
        logger.info("Job worker started")
        while self.running:
            try:
                await self.process_jobs()
                await asyncio.sleep(2)  # Check for new jobs every 2 seconds
            except Exception as e:
                logger.error(f"Worker error: {e}", exc_info=True)
                await asyncio.sleep(5)

    async def stop(self):
        """Stop the worker and cancel all running jobs."""
        self.running = False
        for job_id, process in list(self.active_processes.items()):
            await self.cancel_job(job_id)
        logger.info("Job worker stopped")

    async def process_jobs(self):
        """Process queued jobs."""
        jobs = await self.db.get_active_jobs()

        # Start queued jobs
        for job in jobs:
            if job["status"] == JobStatus.QUEUED.value and len(self.active_processes) < 3:
                # Try to atomically claim this job (prevents race conditions)
                if await self.db.claim_job(job["id"]):
                    # Successfully claimed, execute it
                    await self.execute_job(job)
                # If claim failed, another worker already took it, skip

    async def execute_job(self, job: Dict[str, Any]):
        """Execute a single job."""
        job_id = job["id"]
        url = job["url"]
        profile = job.get("profile")
        extra_args = job.get("extra_args", "")

        log_file = self.get_log_file(job_id)

        # Build command args safely (no shell injection)
        cmd = [
            "python3",
            "/app/webgui/progress_wrapper.py",
            "--job-id", str(job_id),
            "--db-path", self.db.db_path,
            "--",
            "python3",
            "/app/main.py",
            "--link", url,
            "--output-dir", str(self.download_dir),
        ]

        # Add profile if specified
        if profile:
            cmd.extend(["--profile", profile])

        # Add extra args (validate and parse safely)
        if extra_args:
            try:
                validated_args = self.validate_extra_args(extra_args)
                cmd.extend(validated_args)
            except ValueError as e:
                logger.error(f"Invalid extra_args for job {job_id}: {e}")
                await self.db.finish_job(job_id, False, f"Invalid arguments: {e}")
                return

        logger.info(f"Starting job {job_id}: {' '.join(cmd)}")

        try:
            # Start process
            process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1,
                env={**os.environ, "PYTHONUNBUFFERED": "1"},
            )

            self.active_processes[job_id] = process
            await self.db.start_job(job_id, process.pid, str(log_file))

            # Stream output to log file in background
            asyncio.create_task(self._stream_output(job_id, process, log_file))

        except Exception as e:
            logger.error(f"Failed to start job {job_id}: {e}", exc_info=True)
            await self.db.finish_job(job_id, False, str(e))

    async def _stream_output(self, job_id: int, process: subprocess.Popen, log_file: Path):
        """Stream process output to log file and update progress."""
        try:
            # Ensure log directory exists
            log_file.parent.mkdir(parents=True, exist_ok=True)

            with open(log_file, "w") as f:
                f.write(f"Job {job_id} started at {datetime.utcnow().isoformat()}\n")
                f.write(f"Command: {' '.join(process.args)}\n")
                f.write("-" * 80 + "\n")
                f.flush()

                # Read output line by line
                for line in iter(process.stdout.readline, ""):
                    if not line:
                        break

                    # Write to log
                    f.write(line)
                    f.flush()

                    # Parse progress if present
                    await self._parse_progress(job_id, line)

            # Wait for process to complete
            return_code = process.wait()

            # Clean up
            if job_id in self.active_processes:
                del self.active_processes[job_id]

            # Update job status
            if return_code == 0:
                await self.db.finish_job(job_id, True)
                logger.info(f"Job {job_id} completed successfully")
            else:
                await self.db.finish_job(job_id, False, f"Process exited with code {return_code}")
                logger.error(f"Job {job_id} failed with return code {return_code}")

        except Exception as e:
            logger.error(f"Error streaming output for job {job_id}: {e}", exc_info=True)
            await self.db.finish_job(job_id, False, str(e))
            if job_id in self.active_processes:
                del self.active_processes[job_id]

    async def _parse_progress(self, job_id: int, line: str):
        """Parse progress from log line."""
        # Check for machine-readable progress
        if "PROGRESS:" in line:
            try:
                # Extract JSON after PROGRESS:
                progress_json = line.split("PROGRESS:", 1)[1].strip()
                progress = json.loads(progress_json)

                await self.db.update_progress(
                    job_id,
                    percent=progress.get("percent", 0),
                    stage=progress.get("stage"),
                    text=progress.get("text"),
                )
            except (json.JSONDecodeError, IndexError) as e:
                logger.debug(f"Failed to parse progress JSON: {e}")

        # Check for stage markers
        elif "STAGE:" in line:
            try:
                stage_name = line.split("STAGE:", 1)[1].strip().lower()
                if stage_name in [s.value for s in JobStage]:
                    stage = JobStage(stage_name)
                    await self.db.update_progress(
                        job_id,
                        percent=STAGE_PROGRESS[stage],
                        stage=stage.value,
                    )
            except (ValueError, IndexError) as e:
                logger.debug(f"Failed to parse stage: {e}")

    async def cancel_job(self, job_id: int) -> bool:
        """Cancel a running job."""
        if job_id not in self.active_processes:
            # Check if job is queued
            job = await self.db.get_job(job_id)
            if job and job["status"] == JobStatus.QUEUED.value:
                await self.db.cancel_job(job_id)
                return True
            return False

        process = self.active_processes[job_id]

        try:
            # Try graceful termination first
            process.terminate()

            # Wait up to 5 seconds
            try:
                process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                # Force kill
                process.kill()
                process.wait()

            logger.info(f"Job {job_id} canceled")
            await self.db.cancel_job(job_id)

            if job_id in self.active_processes:
                del self.active_processes[job_id]

            return True

        except Exception as e:
            logger.error(f"Error canceling job {job_id}: {e}", exc_info=True)
            return False

    async def rotate_logs(self, max_files: int = 100):
        """Rotate old log files to prevent unlimited growth."""
        try:
            log_files = sorted(self.log_dir.glob("job_*.log"), key=lambda p: p.stat().st_mtime)

            if len(log_files) > max_files:
                files_to_delete = log_files[:-max_files]
                for log_file in files_to_delete:
                    log_file.unlink()
                    logger.info(f"Rotated old log file: {log_file}")

        except Exception as e:
            logger.error(f"Error rotating logs: {e}", exc_info=True)
