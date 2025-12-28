# Automated Docker Builds

This repository automatically builds and publishes Docker images to GitHub Container Registry (ghcr.io).

## How It Works

The GitHub Actions workflow `.github/workflows/docker-publish.yml` automatically:

1. **Triggers on:**
   - Every push to `main` branch (except documentation-only changes)
   - New releases published
   - Manual workflow dispatch

2. **Builds:**
   - Multi-platform images (amd64 and arm64)
   - Uses Docker BuildKit with layer caching
   - Optimized build process

3. **Publishes to:**
   - GitHub Container Registry: `ghcr.io/benjaminmue/hiani-dl`

4. **Tags:**
   - `latest` - Always points to the latest main branch build
   - `main-<sha>` - Git commit SHA for traceability
   - `v1.2.3` - Semantic version tags for releases
   - `1.2` - Major.minor version tags

## Image URLs

**Latest stable:**
```
ghcr.io/benjaminmue/hiani-dl:latest
```

**Specific version (when tagged):**
```
ghcr.io/benjaminmue/hiani-dl:v1.0.0
ghcr.io/benjaminmue/hiani-dl:1.0
```

**Specific commit:**
```
ghcr.io/benjaminmue/hiani-dl:main-abc1234
```

## Using the Images

### In docker-compose.yml

```yaml
services:
  hianime-webgui:
    image: ghcr.io/benjaminmue/hiani-dl:latest
    # ... rest of configuration
```

### Updating to Latest

```bash
docker-compose pull
docker-compose up -d
```

## Build Status

Check the [Actions tab](https://github.com/benjaminmue/HiAni-DL/actions) to see build status and logs.

## Manual Trigger

Maintainers can manually trigger a build:

1. Go to [Actions tab](https://github.com/benjaminmue/HiAni-DL/actions)
2. Select "Build and Push Docker Image"
3. Click "Run workflow"

## Troubleshooting

### Build Failures

Check the workflow logs in the Actions tab for detailed error messages.

### Image Not Found

Ensure the repository's package visibility is set to public:
1. Go to repository Settings
2. Packages → Select the package
3. Change visibility to Public

### Permission Issues

The workflow uses `GITHUB_TOKEN` which is automatically provided. No manual secrets configuration needed.

## Multi-Platform Support

Images are built for:
- `linux/amd64` - x86_64 systems (most PCs)
- `linux/arm64` - ARM64 systems (Apple Silicon, some servers)

Docker automatically pulls the correct architecture for your system.

## Caching

The workflow uses GitHub Actions cache to speed up builds:
- Layer cache from previous builds
- Significantly faster rebuild times
- Automatic cache management

## Documentation Changes

Changes to these files do NOT trigger builds:
- `*.md` files (documentation)
- `docs/**` (documentation folder)
- `.gitignore`
- `LICENSE`

This prevents unnecessary builds for documentation-only updates.
