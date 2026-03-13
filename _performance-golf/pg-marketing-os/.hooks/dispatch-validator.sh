#!/usr/bin/env bash
# dispatch-validator.sh — Routes PostToolUse and Stop hook events to appropriate validators
# Called by Claude Code hooks on Write/Edit operations and Stop events
#
# Usage:
#   PostToolUse: Receives JSON on stdin with tool_name, file_path, etc.
#   Stop:        Called with --final-check flag for comprehensive validation

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VALIDATORS_DIR="$SCRIPT_DIR/validators"

# Check for --final-check (Stop hook)
if [[ "${1:-}" == "--final-check" ]]; then
    # Final validation: run all validators against the current project outputs
    # Find the most recent project output directory
    OUTPUTS_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)/~outputs"

    if [[ ! -d "$OUTPUTS_DIR" ]]; then
        exit 0  # No outputs directory — nothing to validate
    fi

    ERRORS=""

    # Find the most recently modified project directory
    LATEST_PROJECT=$(find "$OUTPUTS_DIR" -mindepth 1 -maxdepth 1 -type d -exec stat -f '%m %N' {} \; 2>/dev/null | sort -rn | head -1 | cut -d' ' -f2-)

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

    # Run output validator on the project
    RESULT=$(python3 "$VALIDATORS_DIR/output_validator.py" "$LATEST_PROJECT" 2>/dev/null || true)
    if [[ -n "$RESULT" && "$RESULT" != "{}" ]]; then
        ERRORS="${ERRORS}${RESULT}\n"
    fi

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

# PostToolUse handler — read JSON from stdin
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

FEEDBACK=""

# Route to appropriate validator(s) based on file path patterns

# 1. Checkpoint files → gate_validator + checkpoint_validator
if [[ "$FILE_PATH" == *"checkpoints/"* ]] || [[ "$FILE_PATH" == *"_COMPLETE.yaml"* ]]; then
    RESULT=$(python3 "$VALIDATORS_DIR/gate_validator.py" "$FILE_PATH" 2>/dev/null || true)
    if [[ -n "$RESULT" && "$RESULT" != "{}" ]]; then
        FEEDBACK="${FEEDBACK}${RESULT}\n"
    fi

    RESULT=$(python3 "$VALIDATORS_DIR/checkpoint_validator.py" "$FILE_PATH" 2>/dev/null || true)
    if [[ -n "$RESULT" && "$RESULT" != "{}" ]]; then
        FEEDBACK="${FEEDBACK}${RESULT}\n"
    fi
fi

# 2. Package/handoff files → schema_validator
if [[ "$FILE_PATH" == *"-package.json"* ]] || [[ "$FILE_PATH" == *"-package.yaml"* ]]; then
    RESULT=$(python3 "$VALIDATORS_DIR/schema_validator.py" "$FILE_PATH" 2>/dev/null || true)
    if [[ -n "$RESULT" && "$RESULT" != "{}" ]]; then
        FEEDBACK="${FEEDBACK}${RESULT}\n"
    fi

    # Also check proportionality for files with score fields
    RESULT=$(python3 "$VALIDATORS_DIR/proportionality_check.py" "$FILE_PATH" 2>/dev/null || true)
    if [[ -n "$RESULT" && "$RESULT" != "{}" ]]; then
        FEEDBACK="${FEEDBACK}${RESULT}\n"
    fi
fi

# 3. Output files in outputs/ directory → output_validator
if [[ "$FILE_PATH" == *"outputs/"* ]] && [[ "$FILE_PATH" == *.md || "$FILE_PATH" == *.json || "$FILE_PATH" == *.yaml ]]; then
    RESULT=$(python3 "$VALIDATORS_DIR/output_validator.py" "$FILE_PATH" 2>/dev/null || true)
    if [[ -n "$RESULT" && "$RESULT" != "{}" ]]; then
        FEEDBACK="${FEEDBACK}${RESULT}\n"
    fi
fi

# 4. All writes → token estimator (tracks cumulative context)
RESULT=$(python3 "$VALIDATORS_DIR/token_estimator.py" "$FILE_PATH" 2>/dev/null || true)
if [[ -n "$RESULT" && "$RESULT" != "{}" ]]; then
    FEEDBACK="${FEEDBACK}${RESULT}\n"
fi

# 5. All writes → reminder detector (event-driven degradation reminders)
RESULT=$(python3 "$VALIDATORS_DIR/reminder_detector.py" "$FILE_PATH" 2>/dev/null || true)
if [[ -n "$RESULT" && "$RESULT" != "{}" ]]; then
    FEEDBACK="${FEEDBACK}${RESULT}\n"
fi

# 6. Arena output files → convergence detector (persona convergence, round stagnation, output repetition)
if [[ "$FILE_PATH" == *"arena/"* ]] && [[ "$FILE_PATH" == *"-output.md"* || "$FILE_PATH" == *"-revised.md"* || "$FILE_PATH" == *"scores"* ]]; then
    RESULT=$(python3 "$VALIDATORS_DIR/convergence_detector.py" "$FILE_PATH" 2>/dev/null || true)
    if [[ -n "$RESULT" && "$RESULT" != "{}" ]]; then
        FEEDBACK="${FEEDBACK}${RESULT}\n"
    fi
fi

# Output feedback if any validators returned results
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
