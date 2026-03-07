#!/bin/bash
# ClickUp Transcript Sync — Wrapper for launchd
# Runs every 5 minutes via com.performancegolf.clickup-sync
# Wraps python3 call through bash to inherit Full Disk Access

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_DIR="$SCRIPT_DIR/logs"
FAIL_COUNTER="$LOG_DIR/.consecutive-failures"
mkdir -p "$LOG_DIR"

TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
LOG_FILE="$LOG_DIR/sync-$TIMESTAMP.log"

cd "$SCRIPT_DIR"

echo "=== ClickUp Transcript Sync ===" >> "$LOG_FILE"
echo "Started: $(date)" >> "$LOG_FILE"

python3 fetch-clickup-transcripts.py >> "$LOG_FILE" 2>&1
EXIT_CODE=$?

echo "Exit code: $EXIT_CODE" >> "$LOG_FILE"
echo "Finished: $(date)" >> "$LOG_FILE"

# Consecutive failure tracking
if [ "$EXIT_CODE" -eq 0 ]; then
    echo "0" > "$FAIL_COUNTER"
else
    PREV=$(cat "$FAIL_COUNTER" 2>/dev/null || echo "0")
    CURRENT=$((PREV + 1))
    echo "$CURRENT" > "$FAIL_COUNTER"
    echo "Consecutive failures: $CURRENT" >> "$LOG_FILE"
    if [ "$CURRENT" -ge 5 ]; then
        echo "ALERT: $CURRENT consecutive failures — investigate" >> "$LOG_FILE"
    fi
fi

# Clean up logs older than 7 days
find "$LOG_DIR" -name "sync-*.log" -mtime +7 -delete 2>/dev/null || true

exit $EXIT_CODE
