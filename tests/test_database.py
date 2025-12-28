"""
Tests for database operations and job state transitions.
"""

import pytest
import asyncio
import tempfile
import os
from pathlib import Path

from webgui.database import Database, JobStatus, JobStage


@pytest.fixture
async def db():
    """Create a temporary database for testing."""
    with tempfile.TemporaryDirectory() as tmpdir:
        db_path = os.path.join(tmpdir, "test.db")
        database = Database(db_path)
        await database.init_db()
        yield database


@pytest.mark.asyncio
async def test_create_job(db):
    """Test job creation."""
    job_id = await db.create_job(
        url="https://example.com/video",
        profile="sub",
        extra_args="--test",
    )

    assert job_id == 1

    job = await db.get_job(job_id)
    assert job["url"] == "https://example.com/video"
    assert job["profile"] == "sub"
    assert job["extra_args"] == "--test"
    assert job["status"] == JobStatus.QUEUED.value
    assert job["progress_percent"] == 0


@pytest.mark.asyncio
async def test_job_state_transitions(db):
    """Test job state transitions."""
    # Create job (queued)
    job_id = await db.create_job(url="https://example.com/video")
    job = await db.get_job(job_id)
    assert job["status"] == JobStatus.QUEUED.value

    # Start job (running)
    await db.start_job(job_id, pid=12345, log_file="/tmp/test.log")
    job = await db.get_job(job_id)
    assert job["status"] == JobStatus.RUNNING.value
    assert job["pid"] == 12345
    assert job["log_file"] == "/tmp/test.log"
    assert job["started_at"] is not None
    assert job["stage"] == JobStage.INIT.value

    # Update progress
    await db.update_progress(job_id, percent=50, stage=JobStage.DOWNLOAD.value, text="Downloading...")
    job = await db.get_job(job_id)
    assert job["progress_percent"] == 50
    assert job["stage"] == JobStage.DOWNLOAD.value
    assert job["progress_text"] == "Downloading..."

    # Finish job (success)
    await db.finish_job(job_id, success=True)
    job = await db.get_job(job_id)
    assert job["status"] == JobStatus.SUCCESS.value
    assert job["finished_at"] is not None
    assert job["progress_percent"] == 100


@pytest.mark.asyncio
async def test_job_failure(db):
    """Test job failure state."""
    job_id = await db.create_job(url="https://example.com/video")
    await db.start_job(job_id, pid=12345, log_file="/tmp/test.log")

    # Fail job
    await db.finish_job(job_id, success=False, error_message="Download failed")
    job = await db.get_job(job_id)
    assert job["status"] == JobStatus.FAILED.value
    assert job["error_message"] == "Download failed"
    assert job["finished_at"] is not None


@pytest.mark.asyncio
async def test_job_cancellation(db):
    """Test job cancellation."""
    job_id = await db.create_job(url="https://example.com/video")
    await db.start_job(job_id, pid=12345, log_file="/tmp/test.log")

    # Cancel job
    await db.cancel_job(job_id)
    job = await db.get_job(job_id)
    assert job["status"] == JobStatus.CANCELED.value
    assert job["finished_at"] is not None


@pytest.mark.asyncio
async def test_get_jobs(db):
    """Test retrieving multiple jobs."""
    # Create multiple jobs
    await db.create_job(url="https://example.com/video1")
    await db.create_job(url="https://example.com/video2")
    await db.create_job(url="https://example.com/video3")

    jobs = await db.get_jobs(limit=10)
    assert len(jobs) == 3

    # Jobs should be ordered by created_at DESC
    assert jobs[0]["url"] == "https://example.com/video3"
    assert jobs[1]["url"] == "https://example.com/video2"
    assert jobs[2]["url"] == "https://example.com/video1"


@pytest.mark.asyncio
async def test_get_active_jobs(db):
    """Test retrieving active jobs only."""
    # Create jobs in different states
    job1 = await db.create_job(url="https://example.com/video1")
    job2 = await db.create_job(url="https://example.com/video2")
    job3 = await db.create_job(url="https://example.com/video3")

    # Start one job
    await db.start_job(job2, pid=12345, log_file="/tmp/test.log")

    # Finish one job
    await db.start_job(job3, pid=12346, log_file="/tmp/test2.log")
    await db.finish_job(job3, success=True)

    # Get active jobs (queued + running)
    active_jobs = await db.get_active_jobs()
    assert len(active_jobs) == 2

    job_ids = [j["id"] for j in active_jobs]
    assert job1 in job_ids  # queued
    assert job2 in job_ids  # running
    assert job3 not in job_ids  # finished
