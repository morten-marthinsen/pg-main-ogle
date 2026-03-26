#!/bin/bash
# Memory Reminders — SessionStart Hook
# Reads the current user's MEMORY.md and surfaces any lines tagged "REMIND".
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

# Extract lines containing "REMIND" (case-insensitive)
REMIND_LINES=$(grep -i "REMIND" "$MEMORY_INDEX" 2>/dev/null)

if [ -z "$REMIND_LINES" ]; then
  exit 0
fi

# Build the reminder output
OUTPUT="## Session Reminders\n\nThe following items from your memory require attention:\n"

while IFS= read -r line; do
  # Extract the linked filename if present: [Title](filename.md)
  LINKED_FILE=$(echo "$line" | sed -n 's/.*(\([^)]*\.md\)).*/\1/p')

  if [ -n "$LINKED_FILE" ] && [ -f "$MEMORY_DIR/$LINKED_FILE" ]; then
    # Read the memory file content (skip frontmatter)
    CONTENT=$(sed -n '/^---$/,/^---$/d; /^$/d; p' "$MEMORY_DIR/$LINKED_FILE" | head -10)
    # Clean up the index line (remove markdown link syntax for display)
    DISPLAY=$(echo "$line" | sed 's/^- //')
    OUTPUT="$OUTPUT\n$DISPLAY\n"
    if [ -n "$CONTENT" ]; then
      OUTPUT="$OUTPUT> $CONTENT\n"
    fi
  else
    DISPLAY=$(echo "$line" | sed 's/^- //')
    OUTPUT="$OUTPUT\n$DISPLAY\n"
  fi
done <<< "$REMIND_LINES"

echo -e "$OUTPUT"
