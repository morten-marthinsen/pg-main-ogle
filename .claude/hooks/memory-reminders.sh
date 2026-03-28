#!/bin/bash
# Memory Reminders — SessionStart Hook
# Reads the current user's MEMORY.md and surfaces all Project entries
# plus any lines tagged "REMIND" at session start.
# Each user has their own memory directory under ~/.claude/projects/, so
# reminders are per-user even though this hook is shared in the repo.

# Derive the memory directory path from the git root
GIT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
if [ -z "$GIT_ROOT" ]; then
  exit 0
fi

# Claude Code encodes the project path by replacing / with -
ENCODED_PATH=$(echo "$GIT_ROOT" | tr '/' '-')
MEMORY_DIR="$HOME/.claude/projects/${ENCODED_PATH}/memory"
MEMORY_INDEX="$MEMORY_DIR/MEMORY.md"

if [ ! -f "$MEMORY_INDEX" ]; then
  exit 0
fi

OUTPUT=""

# --- Surface all Project entries ---
# Extract lines between "## Project" and the next "##" heading
PROJECT_LINES=$(sed -n '/^## Project$/,/^## /{/^## Project$/d; /^## /d; /^$/d; p;}' "$MEMORY_INDEX" 2>/dev/null)

if [ -n "$PROJECT_LINES" ]; then
  OUTPUT="## Active Projects\n\nThese are your current active projects from memory:\n"
  while IFS= read -r line; do
    LINKED_FILE=$(echo "$line" | sed -n 's/.*(\([^)]*\.md\)).*/\1/p')
    DISPLAY=$(echo "$line" | sed 's/^- //')

    if [ -n "$LINKED_FILE" ] && [ -f "$MEMORY_DIR/$LINKED_FILE" ]; then
      CONTENT=$(sed -n '/^---$/,/^---$/d; /^$/d; p' "$MEMORY_DIR/$LINKED_FILE" | head -5)
      OUTPUT="$OUTPUT\n- $DISPLAY\n"
      if [ -n "$CONTENT" ]; then
        OUTPUT="$OUTPUT  > $CONTENT\n"
      fi
    else
      OUTPUT="$OUTPUT\n- $DISPLAY\n"
    fi
  done <<< "$PROJECT_LINES"
fi

# --- Surface any REMIND-tagged lines from any section ---
REMIND_LINES=$(grep -i "REMIND" "$MEMORY_INDEX" 2>/dev/null)

if [ -n "$REMIND_LINES" ]; then
  OUTPUT="$OUTPUT\n## Reminders\n"
  while IFS= read -r line; do
    DISPLAY=$(echo "$line" | sed 's/^- //')
    OUTPUT="$OUTPUT\n- $DISPLAY\n"
  done <<< "$REMIND_LINES"
fi

if [ -z "$OUTPUT" ]; then
  exit 0
fi

echo -e "$OUTPUT"
