#!/usr/bin/env bash
# Clean stale Chrome locks so Selenium can start
export XDG_CONFIG_HOME="${XDG_CONFIG_HOME:-/config}"
PROFILE_DIR="$XDG_CONFIG_HOME/google-chrome"
mkdir -p "$PROFILE_DIR" || true
rm -f "$PROFILE_DIR"/Singleton* 2>/dev/null || true

set -euo pipefail
if [[ -n "${UMASK:-}" ]]; then
  umask "${UMASK}"
fi
cd /app

export CHROME_EXTRA_ARGS="${CHROME_EXTRA_ARGS:-}"

if [[ "$#" -gt 0 ]]; then
  exec python3 main.py "$@"
fi

# If no LINK/NAME and we have a TTY (i.e., you opened Console), run interactive
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
