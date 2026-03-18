#!/usr/bin/env bash
# dispatch-validator.sh — Routes PostToolUse and Stop hook events to appropriate validators
#
# Quality Engine v4 — Portable version
# Called by AI tool hooks on Write/Edit operations and Stop events
#
# Usage:
#   PostToolUse: Receives JSON on stdin with tool_name, file_path, etc.
#   Stop:        Called with --final-check flag for comprehensive validation
#
# Environment variables (all optional — sensible defaults provided):
#   QE_PROJECT_ROOT  — Root directory of your project (auto-detected if unset)
#   QE_SCOPE_DIR     — Only validate files inside this directory (defaults to QE_PROJECT_ROOT)
#   QE_OUTPUTS_DIR   — Where project outputs live (defaults to QE_PROJECT_ROOT/outputs)

set -euo pipefail

# --- PATH CONFIGURATION ---
# Auto-detect project root from the location of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VALIDATORS_DIR="$SCRIPT_DIR/validators"

# Project root: use env var if set, otherwise go two levels up from .hooks/
PROJECT_ROOT="${QE_PROJECT_ROOT:-$(cd "$SCRIPT_DIR/.." && pwd)}"

# Scope directory: only validate files inside this path
# Set QE_SCOPE_DIR to limit validation to a specific subdirectory
SCOPE_DIR="${QE_SCOPE_DIR:-$PROJECT_ROOT}"

# Outputs directory: where project output folders live
OUTPUTS_DIR="${QE_OUTPUTS_DIR:-$PROJECT_ROOT/outputs}"

# --- STOP HOOK (--final-check) ---
# Runs comprehensive validation when the agent tries to finish
if [[ "${1:-}" == "--final-check" ]]; then
    if [[ ! -d "$OUTPUTS_DIR" ]]; then
        exit 0  # No outputs directory — nothing to validate
    fi

    ERRORS=""

    # Find the most recently modified project directory
    LATEST_PROJECT=""
    if [[ "$(uname)" == "Darwin" ]]; then
        LATEST_PROJECT=$(find "$OUTPUTS_DIR" -mindepth 1 -maxdepth 1 -type d -exec stat -f '%m %N' {} \; 2>/dev/null | sort -rn | head -1 | cut -d' ' -f2-)
    else
        LATEST_PROJECT=$(find "$OUTPUTS_DIR" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' 2>/dev/null | sort -rn | head -1 | cut -d' ' -f2-)
    fi

    if [[ -z "$LATEST_PROJECT" ]]; then
        exit 0
    fi

    # Run gate validator on all checkpoint files
    while IFS= read -r -d '' checkpoint; do
        RESULT=$(python3 "$VALIDATORS_DIR/gate_validator.py" "$checkpoint" 2>/dev/null || true)
        if [[ -n "$RESULT" && "$RESULT" != "{}" ]]; then
            ERRORS="${ERRORS}${RESULT}\n"
        fi
    done < <(find "$LATEST_PROJECT" -name "*_COMPLETE.yaml" -print0 2>/dev/null)

    # Run forbidden status validator on all YAML files
    while IFS= read -r -d '' yamlfile; do
        RESULT=$(python3 "$VALIDATORS_DIR/forbidden_status_validator.py" "$yamlfile" 2>/dev/null || true)
        if [[ -n "$RESULT" && "$RESULT" != "{}" ]]; then
            ERRORS="${ERRORS}${RESULT}\n"
        fi
    done < <(find "$LATEST_PROJECT" -name "*.yaml" -o -name "*.yml" -print0 2>/dev/null)

    # Run token estimator summary
    RESULT=$(python3 "$VALIDATORS_DIR/token_estimator.py" --summary "$LATEST_PROJECT" 2>/dev/null || true)
    if [[ -n "$RESULT" && "$RESULT" != "{}" ]]; then
        ERRORS="${ERRORS}${RESULT}\n"
    fi

    if [[ -n "$ERRORS" ]]; then
        # Output structured feedback for the agent
        python3 -c "
import json, sys
errors = sys.argv[1]
print(json.dumps({
    'hookSpecificOutput': {
        'hookEventName': 'Stop',
        'additionalContext': 'FINAL VALIDATION REPORT:\\n' + errors
    }
}))
" "$ERRORS"
        # Exit 2 blocks the agent from stopping if critical failures exist
        exit 2
    fi

    exit 0
fi

# --- POST-TOOL-USE HANDLER ---
# Read JSON from stdin (hook input from the AI tool)
INPUT=$(cat)

# Extract the file path from the hook input
FILE_PATH=$(echo "$INPUT" | python3 -c "
import json, sys
try:
    data = json.load(sys.stdin)
    # Navigate the hook input structure to find the file path
    tool_input = data.get('tool_input', {})
    # Write tool uses file_path, Edit tool also uses file_path
    path = tool_input.get('file_path', '')
    print(path)
except:
    print('')
" 2>/dev/null || echo "")

if [[ -z "$FILE_PATH" ]]; then
    exit 0  # No file path — nothing to validate
fi

# --- PATH SCOPING ---
# Only validate files within the configured scope directory.
# Without this guard, writes to other parts of the repo trigger false positives.
case "$FILE_PATH" in
    "$SCOPE_DIR"/*) ;; # File is inside scope — continue
    *) exit 0 ;;       # File is outside scope — skip all validators
esac

FEEDBACK=""

# --- VALIDATOR ROUTING ---
# Each section routes to a validator based on file path patterns.
# Add new validators by copying a section and adjusting the pattern match.

# 1. Checkpoint files -> gate_validator
#    Catches forbidden gate statuses (CONDITIONAL_PASS, PARTIAL_PASS, etc.)
if [[ "$FILE_PATH" == *"checkpoints/"* ]] || [[ "$FILE_PATH" == *"_COMPLETE.yaml"* ]]; then
    RESULT=$(python3 "$VALIDATORS_DIR/gate_validator.py" "$FILE_PATH" 2>/dev/null || true)
    if [[ -n "$RESULT" && "$RESULT" != "{}" ]]; then
        FEEDBACK="${FEEDBACK}${RESULT}\n"
    fi
fi

# 2. Package/handoff files -> schema_validator
#    Checks required fields, arena verification, minimum file sizes
if [[ "$FILE_PATH" == *"-package.json"* ]] || [[ "$FILE_PATH" == *"-package.yaml"* ]]; then
    RESULT=$(python3 "$VALIDATORS_DIR/schema_validator.py" "$FILE_PATH" 2>/dev/null || true)
    if [[ -n "$RESULT" && "$RESULT" != "{}" ]]; then
        FEEDBACK="${FEEDBACK}${RESULT}\n"
    fi
fi

# 3. Output files -> fact_change_validator
#    Detects stale upstream values from incomplete fact changes
if [[ "$FILE_PATH" == *"outputs/"* ]] && [[ "$FILE_PATH" == *.md || "$FILE_PATH" == *.json || "$FILE_PATH" == *.yaml ]]; then
    RESULT=$(python3 "$VALIDATORS_DIR/fact_change_validator.py" "$FILE_PATH" 2>/dev/null || true)
    if [[ -n "$RESULT" && "$RESULT" != "{}" ]]; then
        FEEDBACK="${FEEDBACK}${RESULT}\n"
    fi
fi

# 4. All YAML/markdown files -> forbidden_status_validator
#    Catches invented pass/fail variants in any file (broader than gate_validator)
if [[ "$FILE_PATH" == *.yaml ]] || [[ "$FILE_PATH" == *.yml ]] || [[ "$FILE_PATH" == *.md ]]; then
    RESULT=$(python3 "$VALIDATORS_DIR/forbidden_status_validator.py" "$FILE_PATH" 2>/dev/null || true)
    if [[ -n "$RESULT" && "$RESULT" != "{}" ]]; then
        FEEDBACK="${FEEDBACK}${RESULT}\n"
    fi
fi

# 5. All writes -> token_estimator
#    Tracks cumulative context load and classifies into cost/quality zones
RESULT=$(python3 "$VALIDATORS_DIR/token_estimator.py" "$FILE_PATH" 2>/dev/null || true)
if [[ -n "$RESULT" && "$RESULT" != "{}" ]]; then
    FEEDBACK="${FEEDBACK}${RESULT}\n"
fi

# --- OUTPUT FEEDBACK ---
# If any validators returned results, package them for the agent
if [[ -n "$FEEDBACK" ]]; then
    python3 -c "
import json, sys
feedback = sys.argv[1]
print(json.dumps({
    'hookSpecificOutput': {
        'hookEventName': 'PostToolUse',
        'additionalContext': feedback
    }
}))
" "$FEEDBACK"
fi

exit 0
