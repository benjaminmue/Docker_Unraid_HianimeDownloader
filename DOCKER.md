# Docker Environment Variables

This document describes all available environment variables for configuring the Docker container.

## WebGUI Mode Variables

### Directory Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `CONFIG_DIR` | `/config` | Directory for persistent configuration (database, logs) |
| `OUTPUT_DIR` | `/downloads` | Directory where downloaded videos will be saved |

### Web Server Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `WEB_PORT` | `8080` | Port the web interface listens on |
| `LOG_LEVEL` | `INFO` | Logging level (`DEBUG`, `INFO`, `WARNING`, `ERROR`) |

### Timezone and Localization

| Variable | Default | Example Values | Description |
|----------|---------|----------------|-------------|
| `TZ` | `UTC` | `Europe/Zurich`, `America/New_York`, `Asia/Tokyo` | Timezone for date/time display in the WebGUI. Uses standard [IANA timezone identifiers](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). |
| `LOCALE` | *(auto)* | `de_CH.UTF-8`, `en_US.UTF-8`, `fr_FR.UTF-8` | Optional locale for regional date formatting. If not set, format is determined from timezone. |

**Date Format Examples:**
- **Europe/Zurich** or **de_CH.UTF-8**: `28.12.2025 18:30:45` (DD.MM.YYYY HH:MM:SS)
- **America/New_York** or **en_US.UTF-8**: `12/28/2025 06:30:45 PM` (MM/DD/YYYY hh:mm:ss AM/PM)
- **Other timezones**: `2025-12-28 18:30:45` (ISO format)

### Security Configuration

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `URL_ALLOWLIST` | No | *(empty)* | Comma-separated list of allowed domains for downloads. Example: `hianime.to`. Leave empty to allow all domains (less secure but convenient for home use). |
| `WEB_USER` | No | *(none)* | Username for basic HTTP authentication. Only enable if multiple untrusted users share your network. |
| `WEB_PASSWORD` | No | *(none)* | Password for basic HTTP authentication. Required if `WEB_USER` is set. |

### Chrome/Browser Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `CHROME_EXTRA_ARGS` | *(empty)* | Additional arguments to pass to Chrome/Chromium browser |
| `PYTHONUNBUFFERED` | `1` | Ensures Python output is sent directly to logs |
| `PYTHONDONTWRITEBYTECODE` | `1` | Prevents Python from writing .pyc files |

## CLI Mode Variables

These variables are only used when running in CLI mode (with `--profile cli`).

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `LINK` | URL of the anime to download | `https://hianime.to/watch/anime-name-12345` |
| `NAME` | Title/name for the downloaded anime | `"My Anime Title"` |

### Download Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `DOWNLOAD_TYPE` | `sub` | Download type: `sub` (subtitled) or `dub` (dubbed) |
| `EP_FROM` | `1` | First episode number to download |
| `EP_TO` | *(last)* | Last episode number to download |
| `SEASON` | `1` | Season number |
| `SERVER` | `HD-1` | Streaming server to use |

### Options

| Variable | Default | Description |
|----------|---------|-------------|
| `NO_SUBTITLES` | `false` | Set to `true` to skip subtitle download |
| `ARIA` | `true` | Use aria2c for faster downloads (enabled by default). Set to `false` to disable. |
| `CHROME_PERSIST_PROFILE` | `false` | Set to `true` to persist Chrome profile between runs |

## Volume Mounts

| Container Path | Description | Recommended Host Path |
|----------------|-------------|----------------------|
| `/downloads` | Downloaded video files | `/path/to/your/videos` |
| `/config` | Database, logs, and configuration | Docker volume or `/path/to/config` |

## Example docker-compose.yml Configurations

### Minimal Configuration (WebGUI)

```yaml
services:
  hianime-webgui:
    image: hianime-downloader
    ports:
      - "8080:8080"
    volumes:
      - /path/to/downloads:/downloads
      - hianime-config:/config
    environment:
      TZ: Europe/Zurich
```

### Full Configuration (WebGUI with Security)

```yaml
services:
  hianime-webgui:
    image: hianime-downloader
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
```

### CLI Mode Configuration

```yaml
services:
  hianime-downloader:
    image: hianime-downloader
    profiles: ["cli"]
    volumes:
      - /path/to/downloads:/downloads
    environment:
      LINK: "https://hianime.to/watch/anime-12345"
      NAME: "Anime Title"
      DOWNLOAD_TYPE: sub
      EP_FROM: 1
      EP_TO: 12
      ARIA: true
```

## Notes

- **LAN-Only Deployment**: This application is designed for local network use only. Do not expose it directly to the internet.
- **Timezone Changes**: Changing `TZ` or `LOCALE` requires a container restart to take effect.
- **URL Allowlist**: Leave empty for home use. Set specific domains for added security if needed.
- **Authentication**: Only needed if untrusted users can access your local network.
