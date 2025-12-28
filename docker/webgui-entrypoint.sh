#!/bin/bash
# WebGUI entrypoint for Docker container
# Starts the FastAPI web server with embedded worker

set -e

# Kill any stray Chrome processes from previous runs (procps may not be installed)
killall chrome chromedriver 2>/dev/null || true

# Set defaults
export CONFIG_DIR=${CONFIG_DIR:-/config}
export OUTPUT_DIR=${OUTPUT_DIR:-/downloads}
export WEB_PORT=${WEB_PORT:-8080}
export LOG_LEVEL=${LOG_LEVEL:-INFO}

# Create necessary directories (as root if needed)
mkdir -p "$CONFIG_DIR"
mkdir -p "$OUTPUT_DIR"
mkdir -p "$CONFIG_DIR/logs"

# Fix permissions for app user
chown -R app:app "$CONFIG_DIR" "$OUTPUT_DIR"

echo "======================================"
echo "  HiAni DL WebGUI Starting"
echo "======================================"
echo "Config directory: $CONFIG_DIR"
echo "Download directory: $OUTPUT_DIR"
echo "Web port: $WEB_PORT"
echo "Log level: $LOG_LEVEL"

if [ -n "$URL_ALLOWLIST" ]; then
    echo "URL allowlist: $URL_ALLOWLIST"
else
    echo "WARNING: No URL_ALLOWLIST set - all URLs will be rejected"
fi

if [ -n "$WEB_USER" ] && [ -n "$WEB_PASSWORD" ]; then
    echo "Basic authentication: ENABLED"
else
    echo "Basic authentication: DISABLED"
fi

echo "======================================"

# Switch to app user and run the FastAPI application
exec runuser -u app -- python3 -m uvicorn webgui.app:app \
    --host 0.0.0.0 \
    --port "$WEB_PORT" \
    --log-level "$(echo $LOG_LEVEL | tr '[:upper:]' '[:lower:]')"
