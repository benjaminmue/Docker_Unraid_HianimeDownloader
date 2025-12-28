# <span style="color: #FF9BCF">Docker Setup & Configuration</span>

Complete guide for Docker deployment of HiAni DL, including environment variables, volumes, and Unraid integration.

> 🐳 **Docker is Required**
>
> HiAni DL **only runs in Docker** - no standalone Python installation is supported or documented. All dependencies (Chrome, ffmpeg, Python packages) are included in the Docker image. This ensures consistent behavior across all platforms and eliminates dependency management issues.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Minimal Docker Compose Example](#minimal-docker-compose-example)
- [Environment Variables](#environment-variables)
- [Volume Mounts](#volume-mounts)
- [Configuration Examples](#configuration-examples)
- [Unraid Setup](#unraid-setup)
- [Maintenance](#maintenance)
- [Troubleshooting](#troubleshooting)

---

## <span style="color: #FF9BCF">Quick Start</span>

**The WebGUI starts automatically when you run the container - no additional steps needed!**

### WebGUI Mode (Default)

```bash
# 1. Clone the repository
git clone https://github.com/benjaminmue/HiAni-DL.git
cd HiAni-DL

# 2. Start the container (WebGUI launches automatically)
docker-compose up -d

# 3. Access the WebGUI at http://localhost:8080
```

> 💡 **Important:** The WebGUI is the **default service** and starts automatically with `docker-compose up -d`. You don't need to specify service names, run scripts, or take any additional steps.

### CLI Mode (Advanced Users Only)

**CLI mode requires explicit profile activation and does NOT start by default.**

```bash
# CLI mode must be started with the --profile flag
docker-compose --profile cli up -d hianime-downloader

# Or for one-off downloads:
docker-compose --profile cli run --rm \
  -e LINK="https://hianime.to/watch/anime-name-12345" \
  -e EP_FROM=1 \
  -e EP_TO=12 \
  hianime-downloader
```

> ⚠️ **Note:** CLI mode is for advanced users who prefer terminal-based downloads. Most users should use the WebGUI which starts automatically.

---

## <span style="color: #FF9BCF">Minimal Docker Compose Example</span>

**Ready-to-use docker-compose.yml for quick deployment:**

```yaml
version: '3.8'

services:
  hianime-webgui:
    image: ghcr.io/benjaminmue/hiani-dl:latest
    container_name: hianime-webgui
    environment:
      # Timezone - adjust to your region
      # Examples: America/New_York, Europe/London, Asia/Tokyo
      TZ: Europe/Zurich

      # Web server port
      WEB_PORT: 8080

      # Optional: Limit allowed domains (recommended for security)
      # Leave empty "" to allow all domains (convenient for home use)
      URL_ALLOWLIST: "hianime.to"

      # Optional: Enable basic authentication (only if needed)
      # Uncomment these lines to add password protection
      # WEB_USER: admin
      # WEB_PASSWORD: your-secure-password

    volumes:
      # Downloaded files location - CHANGE THIS PATH
      # Windows example: C:/Users/YourName/Downloads/Anime:/downloads
      # Linux/Mac example: /home/username/downloads/anime:/downloads
      - /path/to/your/downloads:/downloads

      # Persistent config and database (job history, logs)
      - hianime-config:/config

    ports:
      # Host port : Container port
      # Change 8080 to another port if needed (e.g., "8081:8080")
      - "8080:8080"

    restart: unless-stopped

volumes:
  hianime-config:
    driver: local
```

**Usage:**

1. Save the above as `docker-compose.yml`
2. Edit the volumes path `/path/to/your/downloads` to your desired location
3. Run: `docker-compose up -d`
4. Access WebGUI at `http://localhost:8080`

---

## <span style="color: #FF9BCF">Environment Variables</span>

### WebGUI Mode Variables

These variables configure the web interface and server.

#### Directory Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `CONFIG_DIR` | `/config` | Directory for persistent configuration (database, logs) |
| `OUTPUT_DIR` | `/downloads` | Directory where downloaded videos will be saved |

**Example:**
```yaml
environment:
  CONFIG_DIR: /config
  OUTPUT_DIR: /downloads
```

#### Web Server Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `WEB_PORT` | `8080` | Port the web interface listens on |
| `LOG_LEVEL` | `INFO` | Logging level (`DEBUG`, `INFO`, `WARNING`, `ERROR`) |

**Example:**
```yaml
environment:
  WEB_PORT: 8080
  LOG_LEVEL: INFO
```

#### Timezone and Localization

| Variable | Default | Example Values | Description |
|----------|---------|----------------|-------------|
| `TZ` | `UTC` | `Europe/Zurich`, `America/New_York`, `Asia/Tokyo` | Timezone for date/time display. Uses [IANA timezone identifiers](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). |
| `LOCALE` | *(auto)* | `de_CH.UTF-8`, `en_US.UTF-8`, `fr_FR.UTF-8` | Optional locale for regional date formatting. Auto-detected from timezone if not set. |

**Date Format Examples:**
- **Europe/Zurich** or **de_CH.UTF-8**: `28.12.2025 18:30:45` (DD.MM.YYYY HH:MM:SS)
- **America/New_York** or **en_US.UTF-8**: `12/28/2025 06:30:45 PM` (MM/DD/YYYY hh:mm:ss AM/PM)
- **Other timezones**: `2025-12-28 18:30:45` (ISO format)

**Example:**
```yaml
environment:
  TZ: Europe/Zurich
  LOCALE: de_CH.UTF-8
```

> 💡 **Note:** Changing `TZ` or `LOCALE` requires a container restart to take effect.

#### Security Configuration

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `URL_ALLOWLIST` | No | *(empty)* | Comma-separated list of allowed domains for downloads. Example: `hianime.to`. Leave empty to allow all domains (convenient for home use). |
| `WEB_USER` | No | *(none)* | Username for basic HTTP authentication. Only needed if untrusted users share your network. |
| `WEB_PASSWORD` | No | *(none)* | Password for basic HTTP authentication. Required if `WEB_USER` is set. |

**Example (Relaxed for Home LAN):**
```yaml
environment:
  # No URL_ALLOWLIST - allow all domains
  # No WEB_USER/WEB_PASSWORD - no authentication
```

**Example (With Security):**
```yaml
environment:
  URL_ALLOWLIST: "hianime.to"
  WEB_USER: admin
  WEB_PASSWORD: your-secure-password
```

> ⚠️ **Security Note:** For home LAN use, you can leave `URL_ALLOWLIST` empty and skip authentication. Only add these if untrusted users can access your network.

#### Chrome/Browser Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `CHROME_EXTRA_ARGS` | *(empty)* | Additional arguments to pass to Chrome/Chromium browser |
| `PYTHONUNBUFFERED` | `1` | Ensures Python output is sent directly to logs |
| `PYTHONDONTWRITEBYTECODE` | `1` | Prevents Python from writing .pyc files |

**Example:**
```yaml
environment:
  CHROME_EXTRA_ARGS: "--disable-dev-shm-usage --no-sandbox"
```

### CLI Mode Variables

These variables are only used when running in CLI mode (with `docker-compose up hianime-cli`).

#### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `LINK` | URL of the anime to download | `https://hianime.to/watch/anime-name-12345` |
| `NAME` | Title/name for the downloaded anime | `"My Anime Title"` |

> 💡 **Note:** You must provide either `LINK` or `NAME`.

#### Download Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `DOWNLOAD_TYPE` | `sub` | Download type: `sub` (subtitled) or `dub` (dubbed) |
| `EP_FROM` | `1` | First episode number to download |
| `EP_TO` | *(last)* | Last episode number to download |
| `SEASON` | `1` | Season number |
| `SERVER` | `HD-1` | Streaming server to use (`HD-1`, `HD-2`, `Vidstreaming`) |

#### Download Options

| Variable | Default | Description |
|----------|---------|-------------|
| `NO_SUBTITLES` | `false` | Set to `true` to skip subtitle download |
| `ARIA` | `true` | Use aria2c for faster downloads (enabled by default) |
| `CHROME_PERSIST_PROFILE` | `false` | Set to `true` to persist Chrome profile between runs |

---

## <span style="color: #FF9BCF">Volume Mounts</span>

### Required Volumes

| Container Path | Description | Recommended Host Path |
|----------------|-------------|----------------------|
| `/downloads` | Downloaded video files | `/path/to/your/videos` or `/mnt/user/media/anime` (Unraid) |
| `/config` | Database, logs, and configuration | Docker volume `hianime-config` or `/path/to/config` |

### Example Volume Configuration

**Using Host Paths:**
```yaml
volumes:
  - /mnt/user/media/anime:/downloads
  - /mnt/user/appdata/hianime:/config
```

**Using Docker Volumes:**
```yaml
volumes:
  - /path/to/downloads:/downloads
  - hianime-config:/config

volumes:
  hianime-config:
```

### File Structure

After downloads, your `/downloads` directory will contain:
```
/downloads/
├── Anime Name S01/
│   ├── Anime Name - S01E01.mp4
│   ├── Anime Name - S01E01.vtt
│   ├── Anime Name - S01E02.mp4
│   └── Anime Name - S01E02.vtt
└── Another Anime/
    └── ...
```

---

## <span style="color: #FF9BCF">Configuration Examples</span>

### Minimal Configuration (WebGUI - Home LAN)

Perfect for home use with trusted family members.

```yaml
services:
  hianime-webgui:
    image: hianime-downloader
    container_name: hianime-webgui
    ports:
      - "8080:8080"
    volumes:
      - /path/to/downloads:/downloads
      - hianime-config:/config
    environment:
      TZ: Europe/Zurich

volumes:
  hianime-config:
```

### Full Configuration (WebGUI with Security)

For networks with untrusted users or enhanced security.

```yaml
services:
  hianime-webgui:
    image: hianime-downloader
    container_name: hianime-webgui
    ports:
      - "8080:8080"
    volumes:
      - /path/to/downloads:/downloads
      - hianime-config:/config
    environment:
      # Timezone and Locale
      TZ: Europe/Zurich
      LOCALE: de_CH.UTF-8

      # Security
      URL_ALLOWLIST: "hianime.to"
      WEB_USER: admin
      WEB_PASSWORD: your-secure-password

      # Web Server
      WEB_PORT: 8080
      LOG_LEVEL: INFO

      # Directories
      CONFIG_DIR: /config
      OUTPUT_DIR: /downloads

volumes:
  hianime-config:
```

### CLI Mode Configuration

For automated downloads via environment variables.

```yaml
services:
  hianime-cli:
    image: hianime-downloader
    container_name: hianime-cli
    volumes:
      - /path/to/downloads:/downloads
    environment:
      # Required
      LINK: "https://hianime.to/watch/anime-12345"
      NAME: "Anime Title"

      # Download Settings
      DOWNLOAD_TYPE: sub
      EP_FROM: 1
      EP_TO: 12
      SEASON: 1

      # Options
      ARIA: true
      NO_SUBTITLES: false
      SERVER: HD-1
```

### Unraid Template Configuration

```yaml
services:
  hianime-webgui:
    image: hianime-downloader
    container_name: hianime-webgui
    ports:
      - "8080:8080"
    volumes:
      - /mnt/user/media/anime:/downloads
      - /mnt/user/appdata/hianime:/config
    environment:
      TZ: America/New_York
      PUID: 99
      PGID: 100
    restart: unless-stopped
```

---

## <span style="color: #FF9BCF">Unraid Setup</span>

### Option 1: Docker Compose (Recommended)

1. **Install Unraid Compose Plugin:**
   - Go to Apps → Search "Compose"
   - Install "Compose Manager" by dcflachs

2. **Create Compose Stack:**
   - Go to Docker → Compose
   - Click "Add New Stack"
   - Name it "hianime-downloader"
   - Paste the docker-compose.yml content

3. **Configure Paths:**
   ```yaml
   volumes:
     - /mnt/user/media/anime:/downloads
     - /mnt/user/appdata/hianime:/config
   ```

4. **Set PUID/PGID:**
   ```yaml
   environment:
     PUID: 99
     PGID: 100
   ```

5. **Start the Stack:**
   - Click "Compose Up"

### Option 2: Docker Run Command

Convert to docker run command for traditional Unraid Docker setup:

```bash
docker run -d \
  --name=hianime-webgui \
  -p 8080:8080 \
  -v /mnt/user/media/anime:/downloads \
  -v /mnt/user/appdata/hianime:/config \
  -e TZ=America/New_York \
  -e PUID=99 \
  -e PGID=100 \
  --restart unless-stopped \
  hianime-downloader:latest
```

### Unraid Community App Template

Create a new template in `/boot/config/plugins/dockerMan/templates-user/`:

```xml
<?xml version="1.0"?>
<Container version="2">
  <Name>HiAni-DL</Name>
  <Repository>hianime-downloader:latest</Repository>
  <Registry>https://hub.docker.com/</Registry>
  <Network>bridge</Network>
  <Privileged>false</Privileged>
  <Support>https://github.com/benjaminmue/HiAni-DL</Support>
  <Project>https://github.com/benjaminmue/HiAni-DL</Project>
  <Overview>Anime downloader with modern web interface</Overview>
  <Category>Downloaders:</Category>
  <WebUI>http://[IP]:[PORT:8080]</WebUI>
  <Icon>https://raw.githubusercontent.com/benjaminmue/HiAni-DL/main/logo.svg</Icon>

  <Config Name="WebUI Port" Target="8080" Default="8080" Mode="tcp" Description="Web interface port" Type="Port" Display="always" Required="true" Mask="false">8080</Config>

  <Config Name="Downloads" Target="/downloads" Default="/mnt/user/media/anime" Mode="rw" Description="Where downloaded anime will be saved" Type="Path" Display="always" Required="true" Mask="false">/mnt/user/media/anime</Config>

  <Config Name="AppData" Target="/config" Default="/mnt/user/appdata/hianime" Mode="rw" Description="Configuration and database" Type="Path" Display="always" Required="true" Mask="false">/mnt/user/appdata/hianime</Config>

  <Config Name="Timezone" Target="TZ" Default="America/New_York" Mode="" Description="Timezone for date/time display" Type="Variable" Display="always" Required="false" Mask="false">America/New_York</Config>

  <Config Name="PUID" Target="PUID" Default="99" Mode="" Description="User ID" Type="Variable" Display="advanced" Required="false" Mask="false">99</Config>

  <Config Name="PGID" Target="PGID" Default="100" Mode="" Description="Group ID" Type="Variable" Display="advanced" Required="false" Mask="false">100</Config>
</Container>
```

---

## <span style="color: #FF9BCF">Maintenance</span>

### View Logs

```bash
# Follow logs in real-time
docker-compose logs -f hianime-webgui

# View last 100 lines
docker-compose logs --tail=100 hianime-webgui

# View specific time range
docker-compose logs --since 1h hianime-webgui
```

### Restart Container

```bash
# Restart without rebuilding
docker-compose restart hianime-webgui

# Stop and start (recreate)
docker-compose down
docker-compose up -d hianime-webgui
```

### Update Container

```bash
# Pull latest image
docker-compose pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

### Backup Configuration

```bash
# Backup config directory
tar -czf hianime-config-backup.tar.gz /path/to/config

# Or with Docker volumes
docker run --rm \
  -v hianime-config:/source \
  -v $(pwd):/backup \
  alpine tar -czf /backup/config-backup.tar.gz -C /source .
```

### Clean Up

```bash
# Remove containers (keeps volumes)
docker-compose down

# Remove containers and volumes (deletes database!)
docker-compose down -v

# Remove old images
docker image prune -a
```

---

## <span style="color: #FF9BCF">Troubleshooting</span>

### Chrome Not Starting

**Symptoms:**
- Downloads fail immediately
- Error: "Chrome driver not found"

**Solutions:**

1. **Add Chrome arguments:**
   ```yaml
   environment:
     CHROME_EXTRA_ARGS: "--disable-dev-shm-usage --no-sandbox"
   ```

2. **Check logs:**
   ```bash
   docker-compose logs hianime-webgui | grep -i chrome
   ```

3. **Rebuild container:**
   ```bash
   docker-compose build --no-cache
   docker-compose up -d
   ```

### Permission Issues

**Symptoms:**
- "Permission denied" errors
- Files owned by root instead of your user

**Solutions:**

1. **Check PUID/PGID:**
   ```bash
   # On host, check your user ID
   id
   # uid=1000(user) gid=1000(user)
   ```

2. **Set in docker-compose.yml:**
   ```yaml
   environment:
     PUID: 1000
     PGID: 1000
   ```

3. **Fix existing file permissions:**
   ```bash
   sudo chown -R 1000:1000 /path/to/downloads
   sudo chown -R 1000:1000 /path/to/config
   ```

### Container Keeps Exiting

**Check logs for errors:**
```bash
docker-compose logs hianime-webgui
```

**Common causes:**
- Port 8080 already in use (change `WEB_PORT`)
- Invalid environment variables
- Corrupted database (delete `/config/jobs.db`)

### Downloads Failing

**Symptoms:**
- Jobs fail immediately
- "URL not allowed" error
- No video files created

**Solutions:**

1. **Check URL allowlist:**
   ```yaml
   environment:
     URL_ALLOWLIST: "hianime.to"  # Or leave empty
   ```

2. **Try different server:**
   Add to Extra Arguments: `--server HD-2`

3. **Check HiAnime.to availability:**
   - Verify URL works in browser
   - Site may be down or blocking automated access

4. **Increase logging:**
   ```yaml
   environment:
     LOG_LEVEL: DEBUG
   ```

### Slow Downloads

**Solutions:**

1. **aria2c is already enabled by default** - no need to add it

2. **Check network:**
   ```bash
   docker-compose exec hianime-webgui ping -c 4 hianime.to
   ```

3. **Try different server:**
   Use `--server HD-1` or `--server Vidstreaming` in Extra Arguments

### Database Corruption

**Symptoms:**
- WebGUI won't load
- Error: "database is locked"

**Solutions:**

1. **Backup and reset:**
   ```bash
   # Stop container
   docker-compose down

   # Backup database
   cp /path/to/config/jobs.db /path/to/config/jobs.db.backup

   # Remove database
   rm /path/to/config/jobs.db

   # Restart
   docker-compose up -d
   ```

2. **Repair database:**
   ```bash
   sqlite3 /path/to/config/jobs.db "PRAGMA integrity_check;"
   ```

---

## <span style="color: #FF9BCF">Advanced Configuration</span>

### Custom Network

```yaml
services:
  hianime-webgui:
    networks:
      - hianime-net

networks:
  hianime-net:
    driver: bridge
```

### Resource Limits

```yaml
services:
  hianime-webgui:
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 2G
        reservations:
          memory: 512M
```

### Health Checks

```yaml
services:
  hianime-webgui:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

---

## <span style="color: #FF9BCF">Next Steps</span>

- **[User Guide](USER_GUIDE.md)** - Learn how to use the WebGUI and select URLs
- **[WebGUI Documentation](WEBGUI.md)** - Detailed WebGUI features
- **[Arguments Reference](ARGS.md)** - All command-line options
- **[Security Guide](SECURITY.md)** - Secure your deployment

---

<div align="center">

**Questions?** [Open an issue](https://github.com/benjaminmue/HiAni-DL/issues) or check the [main documentation](../README.md)

</div>
