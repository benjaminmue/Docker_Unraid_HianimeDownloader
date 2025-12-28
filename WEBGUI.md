## WebGUI

GDownloader now includes a web interface for managing downloads through a browser. The WebGUI provides:

- **Web-based job submission** - Submit download URLs through a Bootstrap-styled interface
- **Background processing** - Jobs continue running even after closing the browser
- **Live progress tracking** - Real-time progress updates and log streaming
- **Job management** - View, cancel, and monitor all download jobs
- **Persistent history** - All jobs and logs are stored in SQLite database

### Quick Start

```bash
# Build and start the WebGUI
docker-compose up -d hianime-webgui

# Access the web interface
open http://localhost:8080
```

### Required Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `WEB_PORT` | Web server port | `8080` | No |
| `URL_ALLOWLIST` | Comma-separated list of allowed domains | *(empty)* | **Yes** |
| `OUTPUT_DIR` | Download destination directory | `/downloads` | No |
| `CONFIG_DIR` | Config/database/logs directory | `/config` | No |
| `LOG_LEVEL` | Logging level (DEBUG/INFO/WARNING/ERROR) | `INFO` | No |

### Optional Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `WEB_USER` | Username for basic authentication | `admin` |
| `WEB_PASSWORD` | Password for basic authentication | `secret123` |

### URL Allowlist Security

**IMPORTANT:** The `URL_ALLOWLIST` environment variable controls which domains can be downloaded.

- **Empty allowlist** = All URLs are rejected (secure default)
- **Specified domains** = Only listed domains are allowed

**Examples:**

```yaml
# Allow specific sites
URL_ALLOWLIST: "hianime.to,youtube.com,instagram.com"

# Allow all YouTube and Google domains
URL_ALLOWLIST: "youtube.com,googlevideo.com,ytimg.com"

# Reject all URLs (most secure)
URL_ALLOWLIST: ""
```

**Domain matching rules:**
- Exact match: `example.com` allows `example.com`
- Subdomain match: `example.com` allows `www.example.com`, `api.example.com`
- No wildcards needed

### Docker Compose Configuration

```yaml
version: '3.8'

services:
  hianime-webgui:
    image: hianime-downloader:latest
    container_name: hianime-webgui
    entrypoint: ["/bin/bash", "/app/docker/webgui-entrypoint.sh"]
    environment:
      CONFIG_DIR: /config
      OUTPUT_DIR: /downloads
      WEB_PORT: 8080
      LOG_LEVEL: INFO

      # Security - Allow specific domains only
      URL_ALLOWLIST: "hianime.to,youtube.com,instagram.com"

      # Optional: Enable authentication
      # WEB_USER: admin
      # WEB_PASSWORD: changeme

    volumes:
      - /path/to/downloads:/downloads
      - hianime-webgui-config:/config

    ports:
      - "8080:8080"

    restart: unless-stopped

volumes:
  hianime-webgui-config:
```

### Docker Run Command

```bash
docker run -d \
  --name hianime-webgui \
  -p 8080:8080 \
  -e URL_ALLOWLIST="hianime.to,youtube.com,instagram.com" \
  -e WEB_PORT=8080 \
  -e LOG_LEVEL=INFO \
  -v /path/to/downloads:/downloads \
  -v hianime-webgui-config:/config \
  --entrypoint /bin/bash \
  hianime-downloader:latest \
  /app/docker/webgui-entrypoint.sh
```

### Unraid Template

Create a new template in Unraid with these settings:

**Container Settings:**
- **Repository:** `hianime-downloader:latest`
- **Network Type:** `bridge`
- **Console Shell:** `bash`

**Ports:**
- **Container Port:** `8080` → **Host Port:** `8080` (WebUI)

**Paths:**
- **Container Path:** `/downloads` → **Host Path:** `/mnt/user/downloads/hianime`
- **Container Path:** `/config` → **Host Path:** `/mnt/user/appdata/hianime-webgui`

**Environment Variables:**
- **URL_ALLOWLIST:** `hianime.to,youtube.com,instagram.com` *(required)*
- **WEB_PORT:** `8080`
- **LOG_LEVEL:** `INFO`
- **WEB_USER:** *(optional - for authentication)*
- **WEB_PASSWORD:** *(optional - for authentication)*

**Post Arguments:**
```
--entrypoint /bin/bash /app/docker/webgui-entrypoint.sh
```

### Web Interface Features

#### 1. Home Page (`/`)
- Submit new download jobs
- Enter media URL
- Select output profile (sub/dub)
- Add optional extra arguments

#### 2. Jobs List (`/jobs`)
- View all download jobs
- See status (queued/running/success/failed/canceled)
- View progress percentage and current stage
- Filter by status
- Auto-refresh when active jobs exist

#### 3. Job Detail Page (`/jobs/{id}`)
- Live progress bar with real-time updates
- Current stage indicator
- Job metadata (URL, profile, timestamps)
- Live log viewer with auto-scroll
- Actions:
  - Cancel running job
  - Download log file
  - Download diagnostics bundle (job info + logs)

### Background Job Processing

Jobs are executed in the background using:
- **SQLite database** for job state persistence
- **Embedded worker thread** runs alongside web server
- **Subprocess execution** of the existing `main.py` CLI
- **Progress wrapper** script for generic progress tracking

Job states: `queued` → `running` → `success` / `failed` / `canceled`

### Progress Tracking

The WebGUI implements a progress protocol with these stages:

| Stage | Progress % | Description |
|-------|-----------|-------------|
| `init` | 5% | Initializing download |
| `resolve` | 15% | Resolving URL and extracting info |
| `download` | 30-90% | Downloading media fragments |
| `postprocess` | 95% | Merging, converting, embedding |
| `done` | 100% | Download complete |

#### Machine-Readable Progress

The download script can emit progress via stdout:

```bash
# Simple stage marker
echo "STAGE: download"

# Detailed progress with JSON
echo 'PROGRESS: {"percent": 42, "stage": "download", "text": "Downloading episode 5/12"}'
```

These markers are automatically detected and update the WebGUI in real-time.

### Security Features

1. **URL Allowlist** - Domain-based URL filtering (required)
2. **Basic Authentication** - Optional username/password protection
3. **Command Injection Prevention** - Safe subprocess argument construction
4. **Scheme Validation** - Only `http` and `https` URLs allowed

### Log Management

- **Location:** `/config/logs/job_{id}.log`
- **Rotation:** Automatically removes old logs (keeps last 100 by default)
- **Download:** Available via web interface or API
- **Real-time streaming:** Live log updates via Server-Sent Events (SSE)

### API Endpoints

The WebGUI provides REST APIs for programmatic access:

#### Jobs Management

```bash
# Create new job
POST /api/jobs
Content-Type: application/json
{
  "url": "https://example.com/video",
  "profile": "sub",
  "extra_args": "--ep-from 1 --ep-to 12"
}

# List all jobs
GET /api/jobs?limit=100&offset=0

# Get job details
GET /api/jobs/{id}

# Cancel job
POST /api/jobs/{id}/cancel
```

#### Live Updates

```bash
# Server-Sent Events for live progress
GET /api/jobs/{id}/events

# Events:
# - status: Job status and progress changed
# - log: New log lines available
# - complete: Job finished
# - error: Error occurred
```

#### Downloads

```bash
# Download log file
GET /api/jobs/{id}/log

# Download diagnostics bundle (tar.gz)
GET /api/jobs/{id}/diagnostics
```

### Developer Notes

#### Adding Progress Signals

To improve progress accuracy for specific download scenarios, you can add progress signals in the existing download scripts **without adding provider-specific logic**:

**Option 1: Stage Markers (Simple)**

Add stage markers to indicate major phases:

```python
# In your download script (e.g., extractors/hianime.py)
print("STAGE: resolve")  # When extracting URLs
# ... do work ...
print("STAGE: download")  # When downloading starts
# ... do work ...
print("STAGE: postprocess")  # When merging/converting
```

**Option 2: Detailed Progress (Advanced)**

Emit JSON progress for fine-grained control:

```python
import json

# During download loop
for i, episode in enumerate(episodes):
    percent = int((i / len(episodes)) * 100)
    progress = {
        "percent": percent,
        "stage": "download",
        "text": f"Downloading episode {i+1}/{len(episodes)}"
    }
    print(f"PROGRESS: {json.dumps(progress)}", flush=True)
```

**Where to Add Signals:**

1. **Initialization** (5%) - After imports, before main logic
2. **URL Resolution** (15%) - After extracting video URLs
3. **Download Loop** (30-90%) - Inside episode/fragment iteration
4. **Post-Processing** (95%) - Before/during ffmpeg conversion
5. **Completion** (100%) - After successful finish

**Guidelines:**
- Use `print()` with `flush=True` for immediate output
- Keep progress logic generic (no site-specific details)
- Don't break existing functionality
- Progress messages are optional - scripts work without them

#### Plugging Custom Extractors

The worker automatically runs `main.py` which routes to the appropriate extractor. No changes needed to add new extractors - they'll work automatically through the existing CLI interface.

### Troubleshooting

#### WebGUI won't start

```bash
# Check logs
docker logs hianime-webgui

# Verify entrypoint
docker inspect hianime-webgui | grep -A 5 Entrypoint
```

#### All URLs rejected

```bash
# Check allowlist configuration
docker exec hianime-webgui env | grep URL_ALLOWLIST

# Should show: URL_ALLOWLIST=domain1.com,domain2.com
# Empty or missing = all URLs rejected
```

#### Jobs stuck in "queued"

```bash
# Check worker is running
docker logs hianime-webgui | grep "worker started"

# Check for errors
docker logs hianime-webgui | grep -i error
```

#### Can't access WebGUI

```bash
# Verify port mapping
docker port hianime-webgui

# Should show: 8080/tcp -> 0.0.0.0:8080

# Test from container host
curl http://localhost:8080/health
```

#### Downloads not appearing

```bash
# Check download directory permissions
docker exec hianime-webgui ls -la /downloads

# Check job logs
docker exec hianime-webgui cat /config/logs/job_1.log
```

### Running Tests

```bash
# Run all tests
docker-compose run --rm hianime-webgui pytest tests/

# Run specific test file
docker-compose run --rm hianime-webgui pytest tests/test_security.py -v

# Run with coverage
docker-compose run --rm hianime-webgui pytest --cov=webgui tests/
```

### Production Recommendations

1. **Always set `URL_ALLOWLIST`** - Empty allowlist rejects all URLs
2. **Enable authentication** - Set `WEB_USER` and `WEB_PASSWORD`
3. **Use HTTPS** - Put behind reverse proxy (Nginx, Caddy, Traefik)
4. **Limit exposure** - Don't expose directly to internet
5. **Monitor logs** - Check `/config/logs` regularly
6. **Set resource limits** - Add CPU/memory limits in docker-compose.yml

### Example: Behind Nginx Reverse Proxy

```nginx
server {
    listen 443 ssl;
    server_name downloads.example.com;

    ssl_certificate /etc/ssl/certs/example.com.crt;
    ssl_certificate_key /etc/ssl/private/example.com.key;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # For SSE (Server-Sent Events)
        proxy_buffering off;
        proxy_cache off;
        proxy_set_header Connection '';
        proxy_http_version 1.1;
        chunked_transfer_encoding off;
    }
}
```

### License and Disclaimer

This WebGUI is provided as-is for personal use. Users are responsible for:
- Ensuring they have rights to download content
- Complying with terms of service of source websites
- Configuring appropriate security measures

The URL allowlist feature helps prevent abuse but does not guarantee legal compliance.
