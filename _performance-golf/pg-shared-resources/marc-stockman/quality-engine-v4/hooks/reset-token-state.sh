#!/usr/bin/env bash
# reset-token-state.sh — Resets token estimator state at session start
#
# Quality Engine v4 — Portable version
#
# A new AI session is a new context window. The token estimator tracks
# cumulative file writes as a proxy for context growth, but that proxy only
# works within a single session. Without this reset, the state file accumulates
# across sessions and eventually reports CRITICAL zone permanently.
#
# Usage:
#   Run this at the start of each session (PreToolUse hook on first Read).
#
# Environment variables (optional):
#   QE_PROJECT_ROOT — Root directory (auto-detected if unset)

set -euo pipefail

# Auto-detect script location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# State files live alongside the hooks
STATE_FILE="$SCRIPT_DIR/.token-estimator-state.json"
REMINDER_STATE="$SCRIPT_DIR/.reminder-state.json"

# Reset token estimator state to clean baseline
# This ensures the new session starts at GREEN zone with zero accumulated tokens
echo '{"total_tokens": 0, "files_tracked": {}, "last_zone": "GREEN"}' > "$STATE_FILE"

# Reset reminder state (stale read counter, etc.) for fresh session
if [[ -f "$REMINDER_STATE" ]]; then
    echo '{}' > "$REMINDER_STATE"
fi

exit 0
