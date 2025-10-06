#!/usr/bin/env bash

# -------- Chrome profile handling --------
# If you WANT persistence across runs, set CHROME_PERSIST_PROFILE=true in Unraid.
if [[ "${CHROME_PERSIST_PROFILE:-false}" == "true" ]]; then
  export XDG_CONFIG_HOME="${XDG_CONFIG_HOME:-/config}"
  PROFILE_DIR="$XDG_CONFIG_HOME/google-chrome"
else
  # Fresh profile per run avoids "user data dir in use" errors forever
  export XDG_CONFIG_HOME="/tmp/chrome-profile-$(date +%s)-$$"
  PROFILE_DIR="$XDG_CONFIG_HOME/google-chrome"
fi

mkdir -p "$PROFILE_DIR" || true
# Remove any stale locks if present
rm -f "$PROFILE_DIR"/Singleton* 2>/dev/null || true

set -euo pipefail

# Optional: honor UMASK if provided
if [[ -n "${UMASK:-}" ]]; then
  umask "${UMASK}"
fi

cd /app

# Chrome args (safe defaults)
EXTRA="${CHROME_EXTRA_ARGS:-}"
case "$EXTRA" in *--no-first-run* ) :;; *) EXTRA="$EXTRA --no-first-run";; esac
case "$EXTRA" in *--no-default-browser-check* ) :;; *) EXTRA="$EXTRA --no-default-browser-check";; esac
export CHROME_EXTRA_ARGS="$EXTRA"

# If container was started with arguments, pass them straight to the app
if [[ "$#" -gt 0 ]]; then
  exec python3 main.py "$@"
fi

# Auto-interactive when a TTY is present (i.e., you opened Console) and no LINK/NAME provided
if [[ -z "${LINK:-}" && -z "${NAME:-}" ]]; then
  if [[ -t 0 && -t 1 ]]; then
    exec python3 /app/main.py
  fi
fi

# Build env-driven args for non-interactive runs
ARGS=()
[[ -n "${OUTPUT_DIR:-}" ]] && ARGS+=( -o "${OUTPUT_DIR}" )
[[ -n "${LINK:-}"      ]] && ARGS+=( -l "${LINK}" )
[[ -n "${NAME:-}"      ]] && ARGS+=( -n "${NAME}" )
[[ -n "${SERVER:-}"    ]] && ARGS+=( --server "${SERVER}" )
[[ "${NO_SUBTITLES:-false}" == "true" ]] && ARGS+=( --no-subtitles )
[[ "${ARIA:-false}" == "true" ]] && ARGS+=( --aria )

exec python3 main.py "${ARGS[@]}"
