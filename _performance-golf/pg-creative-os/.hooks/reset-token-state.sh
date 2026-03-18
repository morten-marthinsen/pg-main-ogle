#!/bin/bash
# =============================================================================
# Creative OS — Reset Token Estimator State
# =============================================================================
# Clears the token estimator state file at session start so cumulative
# token tracking begins fresh. Prevents stale state from prior sessions
# triggering false YELLOW/RED zone warnings.
#
# Registered in .claude/settings.json as a SessionStart hook.
# =============================================================================

STATE_FILE="$(dirname "${BASH_SOURCE[0]}")/.token-estimator-state.json"

if [ -f "$STATE_FILE" ]; then
    rm "$STATE_FILE"
fi

exit 0
