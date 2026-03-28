#!/usr/bin/env bash
# run-intake-id.sh — Intake Auto-ID Generator launcher
# Polls ClickUp intake list, reads CP spreadsheets, assigns next Ad IDs.
# Designed to run via launchd every 2 minutes.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="${SCRIPT_DIR}/logs"
mkdir -p "${LOG_DIR}"

# Orion venv (shared — has requests, google-api-python-client, pyyaml)
VENV_PYTHON="${SCRIPT_DIR}/../../orion-chief-of-staff/_ops/daily-briefing/.venv/bin/python3"

# Load .env (symlinked to Orion's .env)
ENV_FILE="${SCRIPT_DIR}/.env"
if [[ -f "${ENV_FILE}" ]]; then
    while IFS='=' read -r key value; do
        # Skip comments and empty lines
        [[ -z "${key}" || "${key}" =~ ^# ]] && continue
        # Strip surrounding quotes from value
        value="${value%\"}"
        value="${value#\"}"
        value="${value%\'}"
        value="${value#\'}"
        export "${key}=${value}"
    done < "${ENV_FILE}"
else
    echo "$(date '+%Y-%m-%d %H:%M:%S') ERROR: .env not found at ${ENV_FILE}" >> "${LOG_DIR}/intake-id-stderr.log"
    exit 1
fi

# Timestamp for logs
TIMESTAMP="$(date '+%Y-%m-%d %H:%M:%S')"

# Run the generator
"${VENV_PYTHON}" "${SCRIPT_DIR}/intake_id_generator.py" \
    --config "${SCRIPT_DIR}/config.yaml" \
    >> "${LOG_DIR}/intake-id-stdout.log" 2>> "${LOG_DIR}/intake-id-stderr.log"

EXIT_CODE=$?
if [[ ${EXIT_CODE} -ne 0 ]]; then
    echo "${TIMESTAMP} ERROR: intake_id_generator.py exited with code ${EXIT_CODE}" >> "${LOG_DIR}/intake-id-stderr.log"
fi

# Log rotation: keep last 7 days
find "${LOG_DIR}" -name "intake-id-*.log" -mtime +7 -delete 2>/dev/null || true
