#!/usr/bin/env bash

# --- Hard reset any stray Chrome from previous run ---
pkill -9 -f "chrome.*user-data-dir=" 2>/dev/null || true
pkill -9 -f "chrome --" 2>/dev/null || true

# --- Always use a unique, ephemeral profile unless you opt-in to persistence ---
if [[ "${CHROME_PERSIST_PROFILE:-false}" == "true" ]]; then
  export XDG_CONFIG_HOME="${XDG_CONFIG_HOME:-/config}"
  PROFILE_DIR="$XDG_CONFIG_HOME/google-chrome"
  mkdir -p "$PROFILE_DIR"
else
  # unique per run
  export XDG_CONFIG_HOME="/tmp/chrome-profile-$(date +%s)-$$"
  PROFILE_DIR="$XDG_CONFIG_HOME/google-chrome"
  rm -rf "$PROFILE_DIR" 2>/dev/null || true
  mkdir -p "$PROFILE_DIR"
fi
# remove any stale locks just in case
rm -f "$PROFILE_DIR"/Singleton* 2>/dev/null || true

set -euo pipefail
[[ -n "${UMASK:-}" ]] && umask "${UMASK}"
cd /app

# --- Force Chrome to use the profile we chose + safe defaults ---
EXTRA="${CHROME_EXTRA_ARGS:-}"
case "$EXTRA" in *--user-data-dir=* ) :;; *) EXTRA="$EXTRA --user-data-dir=$PROFILE_DIR";; esac
case "$EXTRA" in *--no-first-run* ) :;; *) EXTRA="$EXTRA --no-first-run";; esac
case "$EXTRA" in *--no-default-browser-check* ) :;; *) EXTRA="$EXTRA --no-default-browser-check";; esac
case "$EXTRA" in *--disable-dev-shm-usage* ) :;; *) EXTRA="$EXTRA --disable-dev-shm-usage";; esac
case "$EXTRA" in *--headless* ) :;; *) EXTRA="$EXTRA --headless=new";; esac
# random free port avoids reuse issues
case "$EXTRA" in *--remote-debugging-port=* ) :;; *) EXTRA="$EXTRA --remote-debugging-port=0";; esac
# keep cache/temp in /tmp so persistence never blocks us
case "$EXTRA" in *--disk-cache-dir=* ) :;; *) EXTRA="$EXTRA --disk-cache-dir=/tmp/chrome-cache-$$";; esac
export CHROME_EXTRA_ARGS="$EXTRA"

# If container was started with arguments, pass them straight to the app
if [[ "$#" -gt 0 ]]; then
  exec python3 main.py "$@"
fi

# Auto-interactive only if you didn't provide LINK/NAME
# (see section 2 below to auto-run when opening Console)
if [[ -z "${LINK:-}" && -z "${NAME:-}" ]]; then
  if [[ -t 0 && -t 1 ]]; then
    exec python3 /app/main.py
  fi
fi

ARGS=()
[[ -n "${OUTPUT_DIR:-}" ]] && ARGS+=( -o "${OUTPUT_DIR}" )
[[ -n "${LINK:-}"      ]] && ARGS+=( -l "${LINK}" )
[[ -n "${NAME:-}"      ]] && ARGS+=( -n "${NAME}" )
[[ -n "${SERVER:-}"    ]] && ARGS+=( --server "${SERVER}" )
[[ "${NO_SUBTITLES:-false}" == "true" ]] && ARGS+=( --no-subtitles )
[[ "${ARIA:-false}" == "true" ]] && ARGS+=( --aria )

exec python3 main.py "${ARGS[@]}"
