"""
FastAPI application for GDownloader WebGUI.
"""

import os
import asyncio
import logging
from pathlib import Path
from typing import Optional, List
from datetime import datetime

from fastapi import FastAPI, Request, HTTPException, Depends, Form, status
from fastapi.responses import HTMLResponse, StreamingResponse, FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, HttpUrl, validator, Field
from sse_starlette.sse import EventSourceResponse

from .database import Database, JobStatus
from .worker import JobWorker
from .security import URLValidator, BasicAuthManager

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("webgui")

# Configuration from environment
CONFIG_DIR = os.getenv("CONFIG_DIR", "/config")
DOWNLOAD_DIR = os.getenv("OUTPUT_DIR", "/downloads")
DB_PATH = os.path.join(CONFIG_DIR, "jobs.db")
WEB_PORT = int(os.getenv("WEB_PORT", "8080"))
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

# Security configuration
URL_ALLOWLIST_STR = os.getenv("URL_ALLOWLIST", "")
URL_ALLOWLIST = [d.strip() for d in URL_ALLOWLIST_STR.split(",") if d.strip()] if URL_ALLOWLIST_STR else None

WEB_USER = os.getenv("WEB_USER")
WEB_PASSWORD = os.getenv("WEB_PASSWORD")

# Initialize components
app = FastAPI(title="GDownloader WebGUI", version="1.0.0")
templates = Jinja2Templates(directory=str(Path(__file__).parent / "templates"))

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


# Server-Sent Events for live updates
@app.get("/api/jobs/{job_id}/events")
async def job_events(job_id: int, user: str = Depends(get_current_user)):
    """Stream job status and progress updates via SSE."""

    async def event_generator():
        """Generate SSE events for job updates."""
        last_status = None
        last_progress = None
        last_log_pos = 0

        while True:
            try:
                # Get current job state
                job = await db.get_job(job_id)
                if not job:
                    yield {
                        "event": "error",
                        "data": {"message": "Job not found"},
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
                        "data": current_status,
                    }
                    last_status = current_status.copy()

                # Send new log lines
                if job["log_file"] and Path(job["log_file"]).exists():
                    with open(job["log_file"], "r") as f:
                        f.seek(last_log_pos)
                        new_lines = f.readlines()
                        last_log_pos = f.tell()

                        if new_lines:
                            yield {
                                "event": "log",
                                "data": {"lines": new_lines},
                            }

                # Stop streaming if job is finished
                if job["status"] in (JobStatus.SUCCESS.value, JobStatus.FAILED.value, JobStatus.CANCELED.value):
                    yield {
                        "event": "complete",
                        "data": {"status": job["status"]},
                    }
                    break

                await asyncio.sleep(1)  # Poll every second

            except Exception as e:
                logger.error(f"Error in event stream: {e}", exc_info=True)
                yield {
                    "event": "error",
                    "data": {"message": str(e)},
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
