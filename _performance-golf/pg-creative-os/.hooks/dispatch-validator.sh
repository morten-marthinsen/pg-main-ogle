#!/bin/bash
# =============================================================================
# Creative OS — Dispatch Validator (Hook Entry Point)
# =============================================================================
# Routes file writes to specialized validators based on file path patterns.
# Two modes:
#   PostToolUse (default): Triggered after Write/Edit on files in pg-creative-os/
#   Stop (--final-check):  Comprehensive validation at session end
#
# Registered in .claude/settings.json as a PostToolUse hook for Write/Edit events.
# =============================================================================

HOOKS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VALIDATORS_DIR="$HOOKS_DIR/validators"
CREATIVE_OS_DIR="$(dirname "$HOOKS_DIR")"

# Python interpreter — prefer the system python3
PYTHON="${PYTHON:-python3}"

# =============================================================================
# Mode Detection
# =============================================================================

if [ "$1" = "--final-check" ]; then
    MODE="stop"
else
    MODE="post_tool_use"
fi

# =============================================================================
# PostToolUse Mode — Route file writes to validators
# =============================================================================

if [ "$MODE" = "post_tool_use" ]; then
    # Read hook input from stdin (JSON with file_path)
    INPUT=$(cat)
    FILE_PATH=$(echo "$INPUT" | $PYTHON -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('file_path',''))" 2>/dev/null)

    # Scope: only validate files within pg-creative-os/
    case "$FILE_PATH" in
        *pg-creative-os/*) ;;
        *) exit 0 ;;  # Not our directory — skip silently
    esac

    RESULTS=""

    # --- Naming Convention Validator ---
    # Triggers on files that contain Asset IDs (intake queue data, naming convention docs, pipeline outputs)
    case "$FILE_PATH" in
        *intake*|*naming*|*asset*|*registry*|*.csv)
            RESULT=$($PYTHON "$VALIDATORS_DIR/naming_convention_validator.py" "$FILE_PATH" 2>/dev/null)
            if [ -n "$RESULT" ] && [ "$RESULT" != "{}" ]; then
                RESULTS="$RESULT"
            fi
            ;;
    esac

    # --- Forbidden Gate Status Validator ---
    # Triggers on all markdown and YAML files (gate statuses can appear anywhere)
    case "$FILE_PATH" in
        *.md|*.yaml|*.yml)
            RESULT=$($PYTHON "$VALIDATORS_DIR/forbidden_gate_status_validator.py" "$FILE_PATH" 2>/dev/null)
            if [ -n "$RESULT" ] && [ "$RESULT" != "{}" ]; then
                if [ -n "$RESULTS" ]; then
                    RESULTS="$RESULTS\n$RESULT"
                else
                    RESULTS="$RESULT"
                fi
            fi
            ;;
    esac

    # --- Handoff Field Validator ---
    # Triggers on handoff-related files (intake queue, data protocol outputs, scripts)
    case "$FILE_PATH" in
        *handoff*|*intake*|*protocol*|*bridge*)
            RESULT=$($PYTHON "$VALIDATORS_DIR/handoff_field_validator.py" "$FILE_PATH" 2>/dev/null)
            if [ -n "$RESULT" ] && [ "$RESULT" != "{}" ]; then
                if [ -n "$RESULTS" ]; then
                    RESULTS="$RESULTS\n$RESULT"
                else
                    RESULTS="$RESULT"
                fi
            fi
            ;;
    esac

    # --- Token Estimator ---
    # Triggers on ALL file writes (tracks cumulative context load)
    RESULT=$($PYTHON "$VALIDATORS_DIR/token_estimator.py" "$FILE_PATH" 2>/dev/null)
    if [ -n "$RESULT" ] && [ "$RESULT" != "{}" ]; then
        if [ -n "$RESULTS" ]; then
            RESULTS="$RESULTS\n$RESULT"
        else
            RESULTS="$RESULT"
        fi
    fi

    # Output results if any validators returned findings
    if [ -n "$RESULTS" ]; then
        # Format as hook output
        echo "{\"hookSpecificOutput\": {\"hookEventName\": \"PostToolUse:Write\", \"additionalContext\": \"$RESULTS\"}}"
    fi

    exit 0
fi

# =============================================================================
# Stop Mode — Comprehensive session-end validation
# =============================================================================

if [ "$MODE" = "stop" ]; then
    WARNINGS=""

    # --- Check 1: Forbidden gate statuses in recently modified files ---
    MODIFIED=$(find "$CREATIVE_OS_DIR" -name "*.md" -newer "$HOOKS_DIR/.last-stop-check" 2>/dev/null)
    if [ -n "$MODIFIED" ]; then
        while IFS= read -r file; do
            RESULT=$($PYTHON "$VALIDATORS_DIR/forbidden_gate_status_validator.py" "$file" 2>/dev/null)
            if [ -n "$RESULT" ] && [ "$RESULT" != "{}" ]; then
                WARNINGS="${WARNINGS}WARN: Forbidden gate status in $(basename "$file"). "
            fi
        done <<< "$MODIFIED"
    fi

    # --- Check 2: Uncommitted code changes in Veda ---
    VEDA_DIR="$CREATIVE_OS_DIR/veda-video-editing-agent"
    if [ -d "$VEDA_DIR/src" ]; then
        VEDA_CHANGES=$(cd "$CREATIVE_OS_DIR/.." && git diff --name-only -- "pg-creative-os/veda-video-editing-agent/src/" 2>/dev/null | head -5)
        if [ -n "$VEDA_CHANGES" ]; then
            CHANGE_COUNT=$(echo "$VEDA_CHANGES" | wc -l | xargs)
            WARNINGS="${WARNINGS}WARN: $CHANGE_COUNT uncommitted Veda source file(s). Consider committing before session end. "
        fi
    fi

    # --- Check 3: Token estimator summary ---
    RESULT=$($PYTHON "$VALIDATORS_DIR/token_estimator.py" --summary "$CREATIVE_OS_DIR" 2>/dev/null)
    if [ -n "$RESULT" ] && [ "$RESULT" != "{}" ]; then
        ZONE=$(echo "$RESULT" | $PYTHON -c "import sys,json; print(json.load(sys.stdin).get('zone','GREEN'))" 2>/dev/null)
        if [ "$ZONE" != "GREEN" ]; then
            WARNINGS="${WARNINGS}INFO: Session ended in $ZONE context zone. "
        fi
    fi

    # Update timestamp for next stop check
    touch "$HOOKS_DIR/.last-stop-check"

    # Output advisory warnings (never block — exit 0)
    if [ -n "$WARNINGS" ]; then
        echo "Creative OS Session-End Check: $WARNINGS"
    fi

    exit 0
fi
