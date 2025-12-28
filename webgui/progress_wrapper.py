#!/usr/bin/env python3
"""
Progress wrapper that runs the existing download script and emits progress events.
This is a thin wrapper that doesn't contain provider-specific logic.
"""

import argparse
import asyncio
import json
import subprocess
import sys
import re
from pathlib import Path

# Add parent directory to path to import database
sys.path.insert(0, str(Path(__file__).parent.parent))

from webgui.database import Database, JobStage, STAGE_PROGRESS


async def emit_progress(db: Database, job_id: int, percent: int, stage: str, text: str = ""):
    """Emit progress update."""
    print(f"PROGRESS: {json.dumps({'percent': percent, 'stage': stage, 'text': text})}", flush=True)
    await db.update_progress(job_id, percent, stage, text)


async def run_with_progress(job_id: int, db_path: str, command: list):
    """Run command and emit generic progress based on output patterns."""
    db = Database(db_path)

    # Stage detection patterns (generic, not provider-specific)
    patterns = {
        JobStage.INIT: [
            r"loading", r"initializing", r"starting", r"setup",
        ],
        JobStage.RESOLVE: [
            r"searching", r"finding", r"resolving", r"fetching.*url",
            r"getting.*info", r"extracting.*info",
        ],
        JobStage.DOWNLOAD: [
            r"download", r"fragment.*\d+/\d+", r"\[download\]",
            r"downloading", r"\d+\.\d+%", r"\d+ of \d+",
        ],
        JobStage.POSTPROCESS: [
            r"postprocess", r"merging", r"converting", r"muxing",
            r"embedding", r"fixing",
        ],
    }

    current_stage = JobStage.INIT
    await emit_progress(db, job_id, STAGE_PROGRESS[JobStage.INIT], JobStage.INIT.value, "Starting download")

    try:
        # Run command
        process = subprocess.Popen(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
        )

        # Stream output and detect stages
        for line in iter(process.stdout.readline, ""):
            if not line:
                break

            print(line, end="", flush=True)  # Forward output

            # Detect stage changes based on output patterns
            line_lower = line.lower()

            for stage, stage_patterns in patterns.items():
                if stage.value != current_stage.value:  # Only transition forward
                    for pattern in stage_patterns:
                        if re.search(pattern, line_lower):
                            current_stage = stage
                            await emit_progress(
                                db,
                                job_id,
                                STAGE_PROGRESS[stage],
                                stage.value,
                                f"Stage: {stage.value}",
                            )
                            break

            # Try to extract percentage from download progress
            if current_stage == JobStage.DOWNLOAD:
                # Look for patterns like "45.2%" or "[download] 45.2%"
                percent_match = re.search(r'(\d+(?:\.\d+)?)\s*%', line)
                if percent_match:
                    try:
                        percent_value = float(percent_match.group(1))
                        # Map download percentage (0-100) to progress range (30-90)
                        mapped_percent = int(30 + (percent_value / 100) * 60)
                        await emit_progress(
                            db,
                            job_id,
                            mapped_percent,
                            JobStage.DOWNLOAD.value,
                            f"Downloading: {percent_value:.1f}%",
                        )
                    except ValueError:
                        pass

        # Wait for completion
        return_code = process.wait()

        if return_code == 0:
            await emit_progress(db, job_id, 100, JobStage.DONE.value, "Download complete")
        else:
            print(f"PROGRESS: {json.dumps({'percent': 0, 'stage': 'failed', 'text': f'Exit code {return_code}'})}", flush=True)

        return return_code

    except Exception as e:
        print(f"PROGRESS: {json.dumps({'percent': 0, 'stage': 'failed', 'text': str(e)})}", flush=True)
        return 1


def main():
    parser = argparse.ArgumentParser(description="Progress wrapper for download jobs")
    parser.add_argument("--job-id", type=int, required=True, help="Job ID")
    parser.add_argument("--db-path", required=True, help="Database path")
    parser.add_argument("command", nargs=argparse.REMAINDER, help="Command to run")

    args = parser.parse_args()

    # Remove '--' separator if present
    command = args.command
    if command and command[0] == "--":
        command = command[1:]

    if not command:
        print("Error: No command specified", file=sys.stderr)
        sys.exit(1)

    # Run with progress tracking
    exit_code = asyncio.run(run_with_progress(args.job_id, args.db_path, command))
    sys.exit(exit_code)


if __name__ == "__main__":
    main()
