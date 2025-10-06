#!/usr/bin/env bash

# -------- Chrome profile handling --------
if [[ "${CHROME_PERSIST_PROFILE:-false}" == "true" ]]; then
  export XDG_CONFIG_HOME="${XDG_CONFIG_HOME:-/config}"
  PROFILE_DIR="$XDG_CONFIG_HOME/google-chrome"
else
  export XDG_CONFIG_HOME="/tmp/chrome-profile-$(date +%s)-$$"
  PROFILE_DIR="$XDG_CONFIG_HOME/google-chrome"
fi
mkdir -p "$PROFILE_DIR" || true
rm -f "$PROFILE_DIR"/Singleton* 2>/dev/null || true

set -euo pipefail
[[ -n "${UMASK:-}" ]] && umask "${UMASK}"
cd /app

# ---- Chrome args (force our profile dir) ----
EXTRA="${CHROME_EXTRA_ARGS:-}"
case "$EXTRA" in *--no-first-run* ) :;; *) EXTRA="$EXTRA --no-first-run";; esac
case "$EXTRA" in *--no-default-browser-check* ) :;; *) EXTRA="$EXTRA --no-default-browser-check";; esac
# >>> add these three; the first is the key bit <<<
case "$EXTRA" in *--user-data-dir=* ) :;; *) EXTRA="$EXTRA --user-data-dir=$PROFILE_DIR";; esac
case "$EXTRA" in *--disable-dev-shm-usage* ) :;; *) EXTRA="$EXTRA --disable-dev-shm-usage";; esac
case "$EXTRA" in *--headless=*|*--headless* ) :;; *) EXTRA="$EXTRA --headless=new";; esac
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
