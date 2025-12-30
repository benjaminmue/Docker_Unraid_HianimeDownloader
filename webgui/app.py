"""
FastAPI application for HiAni DL WebGUI.
"""

import os
import asyncio
import logging
from pathlib import Path
from typing import Optional, List
from datetime import datetime
from zoneinfo import ZoneInfo

from fastapi import FastAPI, Request, HTTPException, Depends, Form, status
from fastapi.responses import HTMLResponse, StreamingResponse, FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, HttpUrl, validator, Field
from sse_starlette.sse import EventSourceResponse

from .database import Database, JobStatus, EpisodeStatus, EPISODE_STATUS_LABELS
from .worker import JobWorker
from .security import URLValidator, BasicAuthManager

# Configuration from environment
CONFIG_DIR = os.getenv("CONFIG_DIR", "/config")
DOWNLOAD_DIR = os.getenv("OUTPUT_DIR", "/downloads")
DB_PATH = os.path.join(CONFIG_DIR, "jobs.db")
WEB_PORT = int(os.getenv("WEB_PORT", "8080"))
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

# Configure logging
logging.basicConfig(
    level=getattr(logging, LOG_LEVEL.upper()),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("webgui")

# Suppress noisy third-party loggers
logging.getLogger("aiosqlite").setLevel(logging.WARNING)

# Security configuration
URL_ALLOWLIST_STR = os.getenv("URL_ALLOWLIST", "")
URL_ALLOWLIST = [d.strip() for d in URL_ALLOWLIST_STR.split(",") if d.strip()] if URL_ALLOWLIST_STR else None

WEB_USER = os.getenv("WEB_USER")
WEB_PASSWORD = os.getenv("WEB_PASSWORD")

# Initialize components
app = FastAPI(title="HiAni DL WebGUI", version="1.0.0")
templates = Jinja2Templates(directory=str(Path(__file__).parent / "templates"))

# Add custom Jinja2 filter to reorder episode arguments
def format_episode_args(args_str: str) -> str:
    """Reorder --ep-from and --ep-to to show in logical order."""
    if not args_str:
        return args_str

    import re
    # Extract --ep-from and --ep-to values
    from_match = re.search(r'--ep-from\s+(\S+)', args_str)
    to_match = re.search(r'--ep-to\s+(\S+)', args_str)

    if from_match and to_match:
        # Remove both from original string
        cleaned = re.sub(r'--ep-from\s+\S+', '', args_str)
        cleaned = re.sub(r'--ep-to\s+\S+', '', cleaned)
        # Remove extra whitespace
        cleaned = re.sub(r'\s+', ' ', cleaned).strip()

        # Build new string with from/to at the beginning
        result = f"--ep-from {from_match.group(1)} --ep-to {to_match.group(1)}"
        if cleaned:
            result += f" {cleaned}"
        return result

    return args_str


# Add custom Jinja2 filter for datetime formatting with timezone support
def format_datetime(dt_str: str, format_type: str = "full") -> str:
    """
    Format ISO datetime string to user's timezone and locale.

    Args:
        dt_str: ISO datetime string (e.g., "2025-12-28T17:17:37.935420")
        format_type: "full" (date + time), "date" (date only), "time" (time only)

    Returns:
        Formatted datetime string according to timezone and locale
    """
    if not dt_str:
        return "-"

    try:
        # Get timezone from environment (default to UTC)
        tz_name = os.getenv("TZ", "UTC")
        locale = os.getenv("LOCALE", "")

        # Parse ISO datetime (assumes UTC from database)
        if isinstance(dt_str, str):
            # Handle both with and without microseconds
            if '.' in dt_str:
                dt = datetime.fromisoformat(dt_str.replace('Z', '+00:00'))
            else:
                dt = datetime.fromisoformat(dt_str)

            # If datetime is naive (no timezone), assume UTC
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=ZoneInfo("UTC"))
        else:
            dt = dt_str

        # Convert to user's timezone
        user_tz = ZoneInfo(tz_name)
        dt_local = dt.astimezone(user_tz)

        # Determine format based on locale/timezone
        # European format: DD.MM.YYYY HH:mm:ss (24-hour)
        # US format: MM/DD/YYYY hh:mm:ss AM/PM (12-hour)
        if locale.startswith("de_") or locale.startswith("fr_") or locale.startswith("it_") or tz_name.startswith("Europe/"):
            # European format
            if format_type == "date":
                return dt_local.strftime("%d.%m.%Y")
            elif format_type == "time":
                return dt_local.strftime("%H:%M:%S")
            else:  # full
                return dt_local.strftime("%d.%m.%Y %H:%M:%S")
        elif locale.startswith("en_US") or tz_name.startswith("America/"):
            # US format
            if format_type == "date":
                return dt_local.strftime("%m/%d/%Y")
            elif format_type == "time":
                return dt_local.strftime("%I:%M:%S %p")
            else:  # full
                return dt_local.strftime("%m/%d/%Y %I:%M:%S %p")
        else:
            # Default ISO-like format
            if format_type == "date":
                return dt_local.strftime("%Y-%m-%d")
            elif format_type == "time":
                return dt_local.strftime("%H:%M:%S")
            else:  # full
                return dt_local.strftime("%Y-%m-%d %H:%M:%S")

    except Exception as e:
        logger.warning(f"Failed to format datetime '{dt_str}': {e}")
        return str(dt_str)


templates.env.filters['format_episode_args'] = format_episode_args
templates.env.filters['format_datetime'] = format_datetime

db = Database(DB_PATH)
worker = JobWorker(db, CONFIG_DIR, DOWNLOAD_DIR)
url_validator = URLValidator(URL_ALLOWLIST)

# Log directory for path validation
LOG_DIR = Path(CONFIG_DIR) / "logs"


def validate_log_path(log_file_path: str) -> Path:
    """Validate log file path to prevent path traversal attacks."""
    try:
        # Convert to Path and resolve to absolute path
        log_path = Path(log_file_path).resolve()
        log_dir_resolved = LOG_DIR.resolve()

        # Check if the resolved path is within the log directory
        if not str(log_path).startswith(str(log_dir_resolved)):
            raise ValueError(f"Log file path is outside allowed directory")

        # Check if file exists
        if not log_path.exists():
            raise FileNotFoundError(f"Log file does not exist")

        # Check if it's actually a file (not a directory)
        if not log_path.is_file():
            raise ValueError(f"Path is not a file")

        return log_path

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid log file path: {e}"
        )
auth_manager = BasicAuthManager(WEB_USER, WEB_PASSWORD)

# Startup/shutdown events
@app.on_event("startup")
async def startup():
    """Initialize database and start worker."""
    await db.init_db()
    asyncio.create_task(worker.start())
    logger.info(f"WebGUI started on port {WEB_PORT}")
    if URL_ALLOWLIST:
        logger.info(f"URL allowlist enabled: {', '.join(URL_ALLOWLIST)}")
    else:
        logger.warning("No URL allowlist configured - all domains rejected by default")
    if auth_manager.enabled:
        logger.info("Basic authentication enabled")


@app.on_event("shutdown")
async def shutdown():
    """Stop worker."""
    await worker.stop()
    logger.info("WebGUI stopped")


# Pydantic models
class JobCreate(BaseModel):
    url: str = Field(..., min_length=1, max_length=2048, description="URL to download")
    profile: Optional[str] = Field(None, max_length=100, description="Download profile name")
    extra_args: Optional[str] = Field(None, max_length=500, description="Additional command-line arguments")

    @validator('url')
    def validate_url_format(cls, v):
        """Validate URL is not empty and doesn't contain control characters."""
        v = v.strip()
        if not v:
            raise ValueError("URL cannot be empty")
        # Check for control characters and other dangerous characters
        if any(ord(c) < 32 or ord(c) == 127 for c in v):
            raise ValueError("URL contains invalid control characters")
        return v

    @validator('profile')
    def validate_profile(cls, v):
        """Validate profile name if provided."""
        if v is None:
            return v
        v = v.strip()
        if not v:
            return None
        # Profile should only contain alphanumeric, dash, underscore
        if not all(c.isalnum() or c in '-_' for c in v):
            raise ValueError("Profile name can only contain alphanumeric characters, dashes, and underscores")
        return v

    @validator('extra_args')
    def validate_extra_args(cls, v):
        """Validate extra_args if provided."""
        if v is None:
            return v
        v = v.strip()
        if not v:
            return None
        # Check for control characters
        if any(ord(c) < 32 or ord(c) == 127 for c in v):
            raise ValueError("Extra arguments contain invalid control characters")
        # Check for shell metacharacters (will be validated again in worker, but fail fast)
        dangerous_chars = [';', '|', '&', '`', '$', '(', ')', '<', '>', '\n', '\r', '\\']
        if any(char in v for char in dangerous_chars):
            raise ValueError("Extra arguments contain shell metacharacters")
        return v


class JobResponse(BaseModel):
    id: int
    url: str
    profile: Optional[str]
    extra_args: Optional[str]
    status: str
    stage: Optional[str]
    progress_percent: int
    progress_text: Optional[str]
    created_at: str
    started_at: Optional[str]
    finished_at: Optional[str]
    error_message: Optional[str]
    log_file: Optional[str]


# Auth dependency
def get_current_user(user: str = auth_manager.get_dependency()):
    """Get current authenticated user."""
    return user


# Static files
@app.get("/logo.svg")
async def get_logo():
    """Serve the logo SVG file."""
    logo_path = Path(__file__).parent.parent / "logo.svg"
    if not logo_path.exists():
        raise HTTPException(status_code=404, detail="Logo not found")
    return FileResponse(logo_path, media_type="image/svg+xml")


@app.get("/manifest.json")
async def get_manifest():
    """Serve the PWA manifest file."""
    manifest_path = Path(__file__).parent / "manifest.json"
    if not manifest_path.exists():
        raise HTTPException(status_code=404, detail="Manifest not found")
    return FileResponse(manifest_path, media_type="application/manifest+json")


# HTML Pages
@app.get("/", response_class=HTMLResponse)
async def index(request: Request, user: str = Depends(get_current_user)):
    """Home page with job submission form."""
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "allowlist": URL_ALLOWLIST,
            "allowlist_enabled": url_validator.use_allowlist,
        },
    )


@app.get("/jobs", response_class=HTMLResponse)
async def jobs_page(request: Request, user: str = Depends(get_current_user)):
    """Jobs list page."""
    jobs = await db.get_jobs(limit=100)
    return templates.TemplateResponse(
        "jobs.html",
        {"request": request, "jobs": jobs},
    )


@app.get("/jobs/{job_id}", response_class=HTMLResponse)
async def job_detail_page(request: Request, job_id: int, user: str = Depends(get_current_user)):
    """Job detail page."""
    job = await db.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return templates.TemplateResponse(
        "job_detail.html",
        {"request": request, "job": job},
    )


# REST API Endpoints
@app.post("/api/jobs", response_model=JobResponse)
async def create_job(job: JobCreate, user: str = Depends(get_current_user)):
    """Create a new download job."""
    # Validate URL
    url_validator.validate(job.url)

    # Check job limit (max 3 concurrent jobs)
    active_jobs = await db.get_active_jobs()
    if len(active_jobs) >= 3:
        raise HTTPException(
            status_code=429,
            detail="Max concurrent jobs reached. Please wait until one finishes."
        )

    # Create job
    job_id = await db.create_job(
        url=job.url,
        profile=job.profile,
        extra_args=job.extra_args,
    )

    # Return created job
    created_job = await db.get_job(job_id)
    return JobResponse(**created_job)


@app.get("/api/jobs", response_model=List[JobResponse])
async def list_jobs(
    limit: int = 100,
    offset: int = 0,
    user: str = Depends(get_current_user),
):
    """List all jobs."""
    jobs = await db.get_jobs(limit=limit, offset=offset)
    return [JobResponse(**job) for job in jobs]


@app.get("/api/jobs/{job_id}", response_model=JobResponse)
async def get_job(job_id: int, user: str = Depends(get_current_user)):
    """Get job details."""
    job = await db.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return JobResponse(**job)


@app.post("/api/jobs/{job_id}/cancel")
async def cancel_job(job_id: int, user: str = Depends(get_current_user)):
    """Cancel a job."""
    success = await worker.cancel_job(job_id)
    if not success:
        raise HTTPException(status_code=404, detail="Job not found or not cancelable")
    return {"status": "canceled"}


@app.post("/api/jobs/delete-all")
async def delete_all_jobs(user: str = Depends(get_current_user)):
    """Delete all jobs except running ones."""
    deleted_count, skipped_count = await db.delete_all_jobs_except_running()
    return {
        "deleted_count": deleted_count,
        "skipped_count": skipped_count,
        "message": f"Deleted {deleted_count} job(s), skipped {skipped_count} running job(s)"
    }


@app.get("/api/jobs/{job_id}/episodes")
async def get_job_episodes(job_id: int, user: str = Depends(get_current_user)):
    """Get all episodes for a job."""
    job = await db.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    episodes = await db.get_job_episodes(job_id)

    # Add status labels
    for episode in episodes:
        episode["status_label"] = EPISODE_STATUS_LABELS.get(
            EpisodeStatus(episode["status"]),
            episode["status"]
        )

    return episodes


# Server-Sent Events for live updates
@app.get("/api/jobs/{job_id}/events")
async def job_events(job_id: int, user: str = Depends(get_current_user)):
    """Stream job status and progress updates via SSE."""

    async def event_generator():
        """Generate SSE events for job updates."""
        import json

        last_status = None
        last_progress = None
        last_log_pos = 0
        last_episodes = None

        while True:
            try:
                # Get current job state
                job = await db.get_job(job_id)
                if not job:
                    yield {
                        "event": "error",
                        "data": json.dumps({"message": "Job not found"}),
                    }
                    break

                # Send status update if changed
                current_status = {
                    "status": job["status"],
                    "progress_percent": job["progress_percent"],
                    "stage": job["stage"],
                    "progress_text": job["progress_text"],
                }

                if current_status != last_status:
                    yield {
                        "event": "status",
                        "data": json.dumps(current_status),
                    }
                    last_status = current_status.copy()

                # Send new log lines (async to avoid blocking)
                if job["log_file"] and Path(job["log_file"]).exists():
                    def read_log():
                        with open(job["log_file"], "r") as f:
                            f.seek(last_log_pos)
                            new_lines = f.readlines()
                            return new_lines, f.tell()

                    new_lines, new_pos = await asyncio.to_thread(read_log)
                    logger.debug(f"Job {job_id}: Read {len(new_lines)} new lines from position {last_log_pos} to {new_pos}")
                    last_log_pos = new_pos

                    if new_lines:
                        logger.debug(f"Job {job_id}: Yielding {len(new_lines)} log lines")
                        yield {
                            "event": "log",
                            "data": json.dumps({"lines": new_lines}),
                        }
                elif job["log_file"]:
                    logger.debug(f"Job {job_id}: Log file {job['log_file']} does not exist yet")

                # Send episode updates
                episodes = await db.get_job_episodes(job_id)
                if episodes:
                    # Add status labels
                    for episode in episodes:
                        episode["status_label"] = EPISODE_STATUS_LABELS.get(
                            EpisodeStatus(episode["status"]),
                            episode["status"]
                        )

                    # Send if changed (convert to JSON string for comparison)
                    current_episodes_json = json.dumps(episodes, sort_keys=True)
                    if current_episodes_json != last_episodes:
                        logger.debug(f"Job {job_id}: Sending {len(episodes)} episode updates")
                        yield {
                            "event": "episodes",
                            "data": json.dumps({"episodes": episodes}),
                        }
                        last_episodes = current_episodes_json

                # Stop streaming if job is finished
                if job["status"] in (JobStatus.SUCCESS.value, JobStatus.FAILED.value, JobStatus.CANCELED.value):
                    yield {
                        "event": "complete",
                        "data": json.dumps({"status": job["status"]}),
                    }
                    break

                await asyncio.sleep(1)  # Poll every second

            except Exception as e:
                logger.error(f"Error in event stream: {e}", exc_info=True)
                yield {
                    "event": "error",
                    "data": json.dumps({"message": str(e)}),
                }
                break

    return EventSourceResponse(event_generator())


# Log download endpoints
@app.get("/api/jobs/{job_id}/log")
async def download_log(job_id: int, user: str = Depends(get_current_user)):
    """Download job log file."""
    job = await db.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    if not job["log_file"]:
        raise HTTPException(status_code=404, detail="Log file not found")

    # Validate log file path to prevent path traversal
    validated_path = validate_log_path(job["log_file"])

    return FileResponse(
        str(validated_path),
        filename=f"job_{job_id}.log",
        media_type="text/plain",
    )


@app.get("/api/jobs/{job_id}/diagnostics")
async def download_diagnostics(job_id: int, user: str = Depends(get_current_user)):
    """Download diagnostics bundle (job info + log)."""
    import json
    import tarfile
    import io

    job = await db.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    # Create tar.gz in memory
    tar_buffer = io.BytesIO()
    with tarfile.open(fileobj=tar_buffer, mode="w:gz") as tar:
        # Add job metadata as JSON
        job_json = json.dumps(job, indent=2).encode("utf-8")
        job_info = tarfile.TarInfo(name=f"job_{job_id}_info.json")
        job_info.size = len(job_json)
        tar.addfile(job_info, io.BytesIO(job_json))

        # Add log file if exists
        if job["log_file"] and Path(job["log_file"]).exists():
            tar.add(job["log_file"], arcname=f"job_{job_id}.log")

    tar_buffer.seek(0)

    return StreamingResponse(
        iter([tar_buffer.read()]),
        media_type="application/gzip",
        headers={
            "Content-Disposition": f"attachment; filename=job_{job_id}_diagnostics.tar.gz"
        },
    )


@app.get("/api/episodes/{episode_id}/log")
async def stream_episode_log(episode_id: int, user: str = Depends(get_current_user)):
    """Stream per-episode log via SSE."""

    async def event_generator():
        """Generate SSE events for episode log updates."""
        import json

        last_log_pos = 0

        # Get episode to find log file
        episode = await db.get_episode(episode_id)
        if not episode:
            yield {
                "event": "error",
                "data": json.dumps({"message": "Episode not found"}),
            }
            return

        log_file_path = episode.get("log_file")
        if not log_file_path:
            yield {
                "event": "error",
                "data": json.dumps({"message": "No log file for this episode"}),
            }
            return

        # Validate log file path
        try:
            validated_path = validate_log_path(log_file_path)
        except HTTPException as e:
            yield {
                "event": "error",
                "data": json.dumps({"message": e.detail}),
            }
            return

        # Stream log updates
        while True:
            try:
                # Re-fetch episode to check status
                episode = await db.get_episode(episode_id)
                if not episode:
                    break

                # Read new log lines
                if validated_path.exists():
                    def read_log():
                        with open(validated_path, "r") as f:
                            f.seek(last_log_pos)
                            new_lines = f.readlines()
                            return new_lines, f.tell()

                    new_lines, new_pos = await asyncio.to_thread(read_log)
                    last_log_pos = new_pos

                    if new_lines:
                        yield {
                            "event": "log",
                            "data": json.dumps({"lines": new_lines}),
                        }

                # Stop streaming if episode is complete or failed
                if episode["status"] in ("complete", "failed"):
                    yield {
                        "event": "complete",
                        "data": json.dumps({"status": episode["status"]}),
                    }
                    break

                await asyncio.sleep(0.5)  # Poll every 500ms for per-episode logs

            except Exception as e:
                logger.error(f"Error in episode log stream: {e}", exc_info=True)
                yield {
                    "event": "error",
                    "data": json.dumps({"message": str(e)}),
                }
                break

    return EventSourceResponse(event_generator())


# Health check
@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "webgui.app:app",
        host="0.0.0.0",
        port=WEB_PORT,
        log_level=LOG_LEVEL.lower(),
    )
