#!/bin/bash
# =============================================================================
# Orion Daily Executive Briefing — Automation Wrapper
# =============================================================================
# Runs daily at 05:00 via launchd
# Executes daily_briefing.py, logs output, sends notifications
#
# Setup:
#   1. Configure API keys in _ops/daily-briefing/.env
#   2. Run: launchctl load ~/Library/LaunchAgents/com.performancegolf.orion.plist
#
# Manual run:
#   ./_ops/run-orion-daily.sh
# =============================================================================

# NOTE: No 'set -e' — we handle errors explicitly on the critical Python call.
# set -e was killing the script on non-fatal errors (grep warnings, tee deadlocks).

# Script directory (absolute path)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BRIEFING_DIR="$SCRIPT_DIR/daily-briefing"
LOG_DIR="$BRIEFING_DIR/logs"
LOG_FILE="$LOG_DIR/orion-$(date +%Y%m%d-%H%M%S).log"
FAIL_COUNTER="$LOG_DIR/.consecutive-failures"

# Create logs directory if it doesn't exist
mkdir -p "$LOG_DIR"

# Rotate launchd stdout/stderr logs if bloated (>1000 lines)
for LAUNCHD_LOG in "$LOG_DIR/launchd-stdout.log" "$LOG_DIR/launchd-stderr.log"; do
    if [ -f "$LAUNCHD_LOG" ]; then
        LINE_COUNT=$(wc -l < "$LAUNCHD_LOG" 2>/dev/null || echo "0")
        if [ "$LINE_COUNT" -gt 1000 ]; then
            tail -100 "$LAUNCHD_LOG" > "$LAUNCHD_LOG.tmp" 2>/dev/null && mv "$LAUNCHD_LOG.tmp" "$LAUNCHD_LOG" 2>/dev/null || true
        fi
    fi
done

# Load environment variables — safe line-by-line read (no grep/xargs piping)
if [ -f "$BRIEFING_DIR/.env" ]; then
    while IFS= read -r line; do
        # Skip comments and blank lines
        case "$line" in
            \#*|"") continue ;;
        esac
        # Split on first '=' only (handles values containing '=' signs)
        key="${line%%=*}"
        val="${line#*=}"
        # Trim whitespace
        key="$(echo "$key" | xargs)"
        val="$(echo "$val" | xargs)"
        if [ -n "$key" ]; then
            export "$key=$val"
        fi
    done < "$BRIEFING_DIR/.env"
fi

# Configuration (can be overridden in .env)
SLACK_WEBHOOK_URL="${SLACK_WEBHOOK_URL:-}"
ALERT_EMAIL="${ALERT_EMAIL:-}"

# =============================================================================
# Functions
# =============================================================================

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

send_slack() {
    local message="$1"
    local color="$2"  # "good" (green), "warning" (yellow), "danger" (red)

    if [ -n "$SLACK_WEBHOOK_URL" ]; then
        curl -s -X POST -H 'Content-type: application/json' \
            --data "{
                \"attachments\": [{
                    \"color\": \"$color\",
                    \"text\": \"$message\",
                    \"footer\": \"Orion Daily Briefing\",
                    \"ts\": $(date +%s)
                }]
            }" \
            "$SLACK_WEBHOOK_URL" > /dev/null 2>&1
        log "Slack notification sent"
    fi
}

send_email() {
    local subject="$1"
    local body="$2"

    if [ -n "$ALERT_EMAIL" ]; then
        echo "$body" | mail -s "$subject" "$ALERT_EMAIL" 2>/dev/null || true
        log "Email notification sent to $ALERT_EMAIL"
    fi
}

notify_success() {
    local report_path="$1"
    local total="$2"
    local active="$3"
    local failed="$4"
    local duration="$5"

    local message="*Orion Daily Briefing Complete*\n"
    message+="- Modules: $active active / $total total ($failed failed)\n"
    message+="- Duration: $duration\n"
    message+="- Report: $report_path"

    send_slack "$message" "good"
    send_email "[Orion] Daily Briefing Ready" "$message"
}

notify_failure() {
    local error="$1"

    local message="*Orion Daily Briefing FAILED*\n"
    message+="Error: $error\n"
    message+="Log file: $LOG_FILE\n"
    message+="Please investigate."

    send_slack "$message" "danger"
    send_email "[Orion] Daily Briefing FAILED" "$message"
}

# =============================================================================
# Main
# =============================================================================

log "=========================================="
log "ORION DAILY BRIEFING — Starting"
log "=========================================="
log "Script directory: $SCRIPT_DIR"
log "Briefing directory: $BRIEFING_DIR"
log "Log file: $LOG_FILE"

# Idempotency guard — one report per day
# Must match Python's reports_dir() logic: daily-reports/<mon>-<yy>-reports/YYYY-MM-DD.md
REPORT_BASE="$SCRIPT_DIR/daily-reports"
MONTHLY_FOLDER="$(date +%b | tr '[:upper:]' '[:lower:]')-$(date +%y)-reports"
REPORT_DIR="$REPORT_BASE/$MONTHLY_FOLDER"
TODAY_REPORT="$REPORT_DIR/$(date +%Y-%m-%d).md"
if [ -f "$TODAY_REPORT" ]; then
    log "Report already exists: $TODAY_REPORT — skipping"
    exit 0
fi

# Change to briefing directory (modules need relative imports)
cd "$BRIEFING_DIR"

# Record start time
START_TIME=$(date +%s)

# Run the briefing pipeline — redirect to log file directly (no tee piping)
# Pipeline watchdog: 10 min max (600s). Prevents indefinite hangs from blocking next day's run.
PIPELINE_TIMEOUT=600
log "Running: .venv/bin/python3 daily_briefing.py (Python 3.12) [timeout: ${PIPELINE_TIMEOUT}s]"

# macOS doesn't have `timeout` — use background + kill pattern
OUTFILE=$(mktemp)
"$BRIEFING_DIR/.venv/bin/python3" daily_briefing.py > "$OUTFILE" 2>&1 &
PY_PID=$!

# Watchdog: kill if still running after PIPELINE_TIMEOUT
( sleep "$PIPELINE_TIMEOUT" && kill "$PY_PID" 2>/dev/null && log "WATCHDOG: Killed pipeline after ${PIPELINE_TIMEOUT}s timeout" ) &
WATCHDOG_PID=$!

wait "$PY_PID"
PY_EXIT=$?

# Cancel watchdog if pipeline finished naturally
kill "$WATCHDOG_PID" 2>/dev/null
wait "$WATCHDOG_PID" 2>/dev/null

OUTPUT=$(cat "$OUTFILE")
rm -f "$OUTFILE"

if [ "$PY_EXIT" -eq 0 ]; then
    # Append Python output to log
    echo "$OUTPUT" >> "$LOG_FILE"

    # Success — parse stats from output
    END_TIME=$(date +%s)
    DURATION=$((END_TIME - START_TIME))
    DURATION_SEC=$((DURATION % 60))

    REPORT_PATH=$(echo "$OUTPUT" | grep "^REPORT_PATH=" | cut -d= -f2-)
    TOTAL=$(echo "$OUTPUT" | grep "^MODULES_TOTAL=" | cut -d= -f2-)
    ACTIVE=$(echo "$OUTPUT" | grep "^MODULES_ACTIVE=" | cut -d= -f2-)
    FAILED=$(echo "$OUTPUT" | grep "^MODULES_FAILED=" | cut -d= -f2-)

    log "=========================================="
    log "BRIEFING COMPLETE"
    log "Duration: ${DURATION}s"
    log "Report: $REPORT_PATH"
    log "=========================================="

    notify_success "$REPORT_PATH" "${TOTAL:-?}" "${ACTIVE:-?}" "${FAILED:-?}" "${DURATION}s"
    echo "0" > "$FAIL_COUNTER"
else
    # Append whatever output we got to log
    echo "$OUTPUT" >> "$LOG_FILE"

    # Failure
    ERROR=$(tail -5 "$LOG_FILE" | tr '\n' ' ')

    log "=========================================="
    log "BRIEFING FAILED"
    log "=========================================="

    # Track consecutive failures
    PREV=$(cat "$FAIL_COUNTER" 2>/dev/null || echo "0")
    CURRENT=$((PREV + 1))
    echo "$CURRENT" > "$FAIL_COUNTER"
    log "Consecutive failures: $CURRENT"
    if [ "$CURRENT" -ge 3 ]; then
        log "ALERT: $CURRENT consecutive failures — investigate"
    fi

    notify_failure "$ERROR"
    exit 1
fi

# Clean up old logs (keep last 30 days)
find "$LOG_DIR" -name "orion-*.log" -mtime +30 -delete 2>/dev/null || true

log "Done."
