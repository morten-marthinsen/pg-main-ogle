#!/bin/bash
# Copy Principles Enforcer — PreToolUse Hook
# Fires BEFORE Edit/Write on any copy file across the repo.
# Injects the ACTUAL principles from WORKSPACE.md into active context.
# Non-copy files exit silently with no error.

exec 2>/dev/null
trap 'exit 0' ERR

INPUT=$(cat)

FILE_PATH=$(echo "$INPUT" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/"file_path"[[:space:]]*:[[:space:]]*"//' | sed 's/"$//')

# Only fire for .md or .html files within _performance-golf/ (all copy work)
# Excludes system files like CLAUDE.md, SESSION-LOG, etc.
if echo "$FILE_PATH" | grep -qiE '_performance-golf/.*\.(md|html)$' && \
   ! echo "$FILE_PATH" | grep -qiE '(CLAUDE\.md|SESSION-LOG|AGENT\.md|\.hooks/|skills/)'; then

  REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
  WORKSPACE="$REPO_ROOT/WORKSPACE.md"

  if [ -f "$WORKSPACE" ]; then
    PRINCIPLES=$(sed -n '/^## Copywriting Principles — Persuasion Craft$/,/^## [^C]/p' "$WORKSPACE" | head -300)

    echo '{"type":"reminder","detector":"copy-principles-enforcer","severity":"critical","message":"COPY FILE DETECTED — PRINCIPLES LOADED INTO ACTIVE CONTEXT. You MUST write every sentence THROUGH these principles. Read them NOW before writing.\n\n'"$(echo "$PRINCIPLES" | sed 's/"/\\"/g' | tr '\n' ' ')"'"}'
  fi
fi

exit 0
