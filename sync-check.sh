#!/bin/bash
# Checks if Christopher's main has updates you don't have locally.
# Run this before starting any work session.

git fetch upstream --quiet

BEHIND=$(git rev-list --count main..upstream/main 2>/dev/null)

if [ "$BEHIND" -eq 0 ]; then
  echo "✓ You are up to date with Christopher's main."
else
  echo "⚠ Christopher's main is $BEHIND commit(s) ahead of yours."
  echo ""
  echo "Recent upstream commits:"
  git log main..upstream/main --oneline
  echo ""
  echo "To pull them in: git checkout main && git merge upstream/main && git push origin main"
fi
