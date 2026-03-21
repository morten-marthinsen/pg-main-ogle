#!/bin/bash
# Copy Principles Enforcer — PreToolUse Hook
# Fires BEFORE Edit/Write on copy files.
# Injects the ACTUAL principles from WORKSPACE.md into active context.

INPUT=$(cat)

FILE_PATH=$(echo "$INPUT" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/"file_path"[[:space:]]*:[[:space:]]*"//' | sed 's/"$//')

if echo "$FILE_PATH" | grep -qiE '(ecomm-copy|copy-final|e-comm/page|ec-[0-9]+-outputs)'; then

  REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
  WORKSPACE="$REPO_ROOT/WORKSPACE.md"

  if [ -f "$WORKSPACE" ]; then
    # Extract the actual principles section
    PRINCIPLES=$(sed -n '/^## Copywriting Principles — Persuasion Craft$/,/^## [^C]/p' "$WORKSPACE" | head -300)

    echo '{"type":"reminder","detector":"copy-principles-enforcer","severity":"critical","message":"COPY FILE DETECTED — PRINCIPLES LOADED INTO ACTIVE CONTEXT. You MUST write every sentence THROUGH these principles. They are below. Read them NOW before writing.\n\n'"$(echo "$PRINCIPLES" | sed 's/"/\\"/g' | tr '\n' ' ')"'"}'
  fi
fi
