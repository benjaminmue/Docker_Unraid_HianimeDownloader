"""
Database models and schema for job tracking.
Uses SQLite with aiosqlite for async operations.
"""

import aiosqlite
import json
from datetime import datetime
from pathlib import Path
from typing import Optional, List, Dict, Any
from enum import Enum


class JobStatus(str, Enum):
    QUEUED = "queued"
    RUNNING = "running"
    SUCCESS = "success"
    FAILED = "failed"
    CANCELED = "canceled"


class JobStage(str, Enum):
    INIT = "init"
    RESOLVE = "resolve"
    DOWNLOAD = "download"
    POSTPROCESS = "postprocess"
    DONE = "done"


STAGE_PROGRESS = {
    JobStage.INIT: 5,
    JobStage.RESOLVE: 15,
    JobStage.DOWNLOAD: 30,
    JobStage.POSTPROCESS: 95,
    JobStage.DONE: 100,
}


class Database:
    # Whitelist of valid column names for updates (prevents SQL injection)
    VALID_COLUMNS = {
        'url', 'profile', 'extra_args', 'status', 'stage',
        'progress_percent', 'progress_text', 'created_at',
        'started_at', 'finished_at', 'error_message', 'log_file', 'pid'
    }

    def __init__(self, db_path: str):
        self.db_path = db_path
        # Try to create parent directory, but don't fail if we can't
        try:
            Path(db_path).parent.mkdir(parents=True, exist_ok=True)
        except PermissionError:
            pass  # Will try again when actually opening the database

    async def init_db(self):
        """Initialize database schema."""
        # Ensure parent directory exists
        try:
            Path(self.db_path).parent.mkdir(parents=True, exist_ok=True)
        except PermissionError:
            pass  # Try anyway, might work if directory already exists

        async with aiosqlite.connect(self.db_path) as db:
            await db.execute("""
                CREATE TABLE IF NOT EXISTS jobs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    url TEXT NOT NULL,
                    profile TEXT,
                    extra_args TEXT,
                    status TEXT NOT NULL DEFAULT 'queued',
                    stage TEXT,
                    progress_percent INTEGER DEFAULT 0,
                    progress_text TEXT,
                    created_at TEXT NOT NULL,
                    started_at TEXT,
                    finished_at TEXT,
                    error_message TEXT,
                    log_file TEXT,
                    pid INTEGER
                )
            """)
            await db.commit()

    async def create_job(
        self,
        url: str,
        profile: Optional[str] = None,
        extra_args: Optional[str] = None,
    ) -> int:
        """Create a new job."""
        async with aiosqlite.connect(self.db_path) as db:
            cursor = await db.execute(
                """
                INSERT INTO jobs (url, profile, extra_args, status, created_at)
                VALUES (?, ?, ?, ?, ?)
                """,
                (url, profile, extra_args, JobStatus.QUEUED.value, datetime.utcnow().isoformat()),
            )
            await db.commit()
            return cursor.lastrowid

    async def get_job(self, job_id: int) -> Optional[Dict[str, Any]]:
        """Get job by ID."""
        async with aiosqlite.connect(self.db_path) as db:
            db.row_factory = aiosqlite.Row
            cursor = await db.execute("SELECT * FROM jobs WHERE id = ?", (job_id,))
            row = await cursor.fetchone()
            return dict(row) if row else None

    async def get_jobs(self, limit: int = 100, offset: int = 0) -> List[Dict[str, Any]]:
        """Get all jobs."""
        async with aiosqlite.connect(self.db_path) as db:
            db.row_factory = aiosqlite.Row
            cursor = await db.execute(
                "SELECT * FROM jobs ORDER BY created_at DESC LIMIT ? OFFSET ?",
                (limit, offset),
            )
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]

    async def update_job(self, job_id: int, **kwargs):
        """Update job fields."""
        if not kwargs:
            return

        # Validate all column names against whitelist (prevents SQL injection)
        invalid_columns = set(kwargs.keys()) - self.VALID_COLUMNS
        if invalid_columns:
            raise ValueError(f"Invalid column names: {invalid_columns}")

        fields = []
        values = []
        for key, value in kwargs.items():
            # key is already validated against whitelist above
            fields.append(f"{key} = ?")
            values.append(value)

        values.append(job_id)
        query = f"UPDATE jobs SET {', '.join(fields)} WHERE id = ?"

        async with aiosqlite.connect(self.db_path) as db:
            await db.execute(query, values)
            await db.commit()

    async def update_progress(
        self,
        job_id: int,
        percent: int,
        stage: Optional[str] = None,
        text: Optional[str] = None,
    ):
        """Update job progress."""
        updates = {"progress_percent": percent}
        if stage:
            updates["stage"] = stage
        if text:
            updates["progress_text"] = text
        await self.update_job(job_id, **updates)

    async def claim_job(self, job_id: int) -> bool:
        """
        Atomically claim a queued job for execution (prevents race conditions).

        Returns:
            True if job was successfully claimed, False if it was already claimed/running.
        """
        async with aiosqlite.connect(self.db_path) as db:
            # Use a transaction to ensure atomicity
            cursor = await db.execute(
                """
                UPDATE jobs
                SET status = ?, started_at = ?
                WHERE id = ? AND status = ?
                """,
                (JobStatus.RUNNING.value, datetime.utcnow().isoformat(),
                 job_id, JobStatus.QUEUED.value)
            )
            await db.commit()
            # If no rows were updated, job was already claimed
            return cursor.rowcount > 0

    async def start_job(self, job_id: int, pid: int, log_file: str):
        """Update running job with process details."""
        await self.update_job(
            job_id,
            pid=pid,
            log_file=log_file,
            stage=JobStage.INIT.value,
            progress_percent=STAGE_PROGRESS[JobStage.INIT],
        )

    async def finish_job(self, job_id: int, success: bool, error_message: Optional[str] = None):
        """Mark job as finished."""
        await self.update_job(
            job_id,
            status=JobStatus.SUCCESS.value if success else JobStatus.FAILED.value,
            finished_at=datetime.utcnow().isoformat(),
            error_message=error_message,
            progress_percent=100 if success else None,
            stage=JobStage.DONE.value if success else None,
        )

    async def cancel_job(self, job_id: int):
        """Mark job as canceled."""
        await self.update_job(
            job_id,
            status=JobStatus.CANCELED.value,
            finished_at=datetime.utcnow().isoformat(),
        )

    async def get_active_jobs(self) -> List[Dict[str, Any]]:
        """Get all queued or running jobs."""
        async with aiosqlite.connect(self.db_path) as db:
            db.row_factory = aiosqlite.Row
            cursor = await db.execute(
                "SELECT * FROM jobs WHERE status IN (?, ?) ORDER BY created_at ASC",
                (JobStatus.QUEUED.value, JobStatus.RUNNING.value),
            )
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]
