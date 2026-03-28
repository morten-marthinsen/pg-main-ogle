#!/usr/bin/env bash
# run-production-notifier.sh — Production Calendar Notifier launcher
# Polls ClickUp Production Calendar for subtask completions, posts to Slack.
# Designed to run via launchd every 5 minutes.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="${SCRIPT_DIR}/logs"
mkdir -p "${LOG_DIR}"

# Orion venv (shared — has requests, slack_sdk, pyyaml)
VENV_PYTHON="${SCRIPT_DIR}/../daily-briefing/.venv/bin/python3"

# Load .env (symlinked to personal bot's .env which has SLACK_BOT_TOKEN)
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
    echo "$(date '+%Y-%m-%d %H:%M:%S') ERROR: .env not found at ${ENV_FILE}" >> "${LOG_DIR}/prod-notifier-stderr.log"
    exit 1
fi

# Timestamp for logs
TIMESTAMP="$(date '+%Y-%m-%d %H:%M:%S')"

# Run the notifier
"${VENV_PYTHON}" "${SCRIPT_DIR}/production_notifier.py" \
    --config "${SCRIPT_DIR}/config.yaml" \
    >> "${LOG_DIR}/prod-notifier-stdout.log" 2>> "${LOG_DIR}/prod-notifier-stderr.log"

EXIT_CODE=$?
if [[ ${EXIT_CODE} -ne 0 ]]; then
    echo "${TIMESTAMP} ERROR: production_notifier.py exited with code ${EXIT_CODE}" >> "${LOG_DIR}/prod-notifier-stderr.log"
fi

# Log rotation: keep last 7 days
find "${LOG_DIR}" -name "prod-notifier-*.log" -mtime +7 -delete 2>/dev/null || true
