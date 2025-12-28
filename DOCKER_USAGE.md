# Docker Usage Guide

## Quick Start

### 1. Build and Start the Container

```bash
# Build the image
docker-compose build

# Start in automated mode (using environment variables)
docker-compose up -d

# View logs
docker-compose logs -f
```

### 2. Configure Environment Variables

Copy the example environment file and customize:

```bash
cp .env.example .env
# Edit .env with your preferred settings
```

Example `.env` configuration:

```bash
NAME=Frieren: Beyond Journey's End
DOWNLOAD_TYPE=sub
SEASON=1
EP_FROM=1
EP_TO=12
SERVER=HD-1
```

### 3. Run Downloads

**Option A: Automated (Environment Variables)**

Set variables in `.env` file and run:

```bash
docker-compose up
```

**Option B: Interactive Mode**

Run with TTY enabled:

```bash
docker-compose run --rm hianime-downloader
```

Then follow the interactive prompts.

**Option C: One-off Command**

```bash
docker-compose run --rm \
  -e LINK="https://hianime.to/watch/anime-name-12345" \
  -e DOWNLOAD_TYPE=sub \
  -e EP_FROM=1 \
  -e EP_TO=5 \
  hianime-downloader
```

## File Storage

All downloaded videos are saved to:
- **Host:** `/Users/benjamin/Documents/GitHub/temp`
- **Container:** `/downloads`

Files will include:
- `*.mp4` - Video files
- `*.vtt` - Subtitle files
- `*.json` - Metadata files

## Common Use Cases

### Download Complete Anime Season

```bash
# In .env file:
NAME=Demon Slayer
DOWNLOAD_TYPE=sub
SEASON=1
EP_FROM=1
EP_TO=26
SERVER=HD-1
```

```bash
docker-compose up
```

### Download from Direct Link

```bash
docker-compose run --rm \
  -e LINK="https://hianime.to/watch/frieren-beyond-journeys-end-18542?ep=121645" \
  hianime-downloader
```

### Download with Aria2 (Faster)

```bash
# In .env:
ARIA=true
```

### Skip Subtitles

```bash
# In .env:
NO_SUBTITLES=true
```

## Maintenance

### View Logs

```bash
docker-compose logs -f
```

### Stop Container

```bash
docker-compose down
```

### Rebuild After Code Changes

```bash
docker-compose build --no-cache
docker-compose up -d
```

### Clean Up Old Containers

```bash
docker-compose down -v  # Removes volumes too
```

### Check Container Status

```bash
docker-compose ps
```

## Troubleshooting

### Chrome Not Starting

Add extra Chrome arguments:

```bash
CHROME_EXTRA_ARGS=--disable-dev-shm-usage --no-sandbox
```

### Permission Issues

Check that the temp directory is writable:

```bash
ls -la /Users/benjamin/Documents/GitHub/temp
```

If needed, adjust PUID/PGID in docker-compose.yml to match your user:

```bash
id  # Check your UID and GID
```

### Container Keeps Exiting

Check logs for errors:

```bash
docker-compose logs
```

Ensure you've provided either `LINK` or `NAME` in environment variables, or run in interactive mode with TTY.

### No Videos Downloading

- Verify the anime/video URL is correct
- Check if the streaming server is available (try different SERVER values)
- Look for error messages in logs
- Some anime may require specific server selection

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `LINK` | Direct URL to anime or media | `https://hianime.to/watch/...` |
| `NAME` | Anime name for search | `Demon Slayer` |
| `DOWNLOAD_TYPE` | Sub or dub | `sub` or `dub` |
| `EP_FROM` | First episode number | `1` |
| `EP_TO` | Last episode number | `12` |
| `SEASON` | Season number | `1` |
| `SERVER` | Streaming server | `HD-1`, `HD-2` |
| `NO_SUBTITLES` | Skip subtitle downloads | `true` or `false` |
| `ARIA` | Use aria2c downloader | `true` or `false` |
| `OUTPUT_DIR` | Output directory | `/downloads` |
| `CHROME_EXTRA_ARGS` | Extra Chrome flags | `--disable-gpu` |
| `CHROME_PERSIST_PROFILE` | Keep Chrome profile | `true` or `false` |

## Unraid Setup

For Unraid users, you can convert this docker-compose configuration:

1. Install "Community Applications" plugin
2. Search for "User Scripts" and install
3. Create a new script with the docker-compose commands
4. Or use "Composerize" to convert docker-compose.yml to docker run command

Example docker run equivalent:

```bash
docker run -d \
  --name hianime-downloader \
  -v /Users/benjamin/Documents/GitHub/temp:/downloads \
  -v hianime-config:/config \
  -e OUTPUT_DIR=/downloads \
  -e NAME="Anime Name" \
  -e DOWNLOAD_TYPE=sub \
  -e EP_FROM=1 \
  -e EP_TO=12 \
  hianime-downloader:latest
```
