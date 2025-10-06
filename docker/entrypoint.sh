#!/usr/bin/env bash
set -euo pipefail
cd /app

export CHROME_EXTRA_ARGS="${CHROME_EXTRA_ARGS:-}"

if [[ "$#" -gt 0 ]]; then
  exec python3 main.py "$@"
fi

ARGS=()
[[ -n "${OUTPUT_DIR:-}" ]] && ARGS+=( -o "${OUTPUT_DIR}" )
[[ -n "${LINK:-}"      ]] && ARGS+=( -l "${LINK}" )
[[ -n "${NAME:-}"      ]] && ARGS+=( -n "${NAME}" )
[[ -n "${SERVER:-}"    ]] && ARGS+=( --server "${SERVER}" )
[[ "${NO_SUBTITLES:-false}" == "true" ]] && ARGS+=( --no-subtitles )
[[ "${ARIA:-false}" == "true" ]] && ARGS+=( --aria )

exec python3 main.py "${ARGS[@]}"
