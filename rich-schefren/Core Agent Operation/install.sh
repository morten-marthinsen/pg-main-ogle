#!/bin/bash
#
# Core Agent Operations - Installer
# Installs autonomous execution protocols for Claude Code
#

set -e

echo "=============================================="
echo "Core Agent Operations - Installer"
echo "=============================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Create ~/.claude if it doesn't exist
if [ ! -d ~/.claude ]; then
    mkdir -p ~/.claude
    echo -e "${GREEN}✓${NC} Created ~/.claude directory"
else
    echo -e "${GREEN}✓${NC} ~/.claude directory exists"
fi

# Check for existing CLAUDE.md
if [ -f ~/.claude/CLAUDE.md ]; then
    echo ""
    echo -e "${YELLOW}WARNING: ~/.claude/CLAUDE.md already exists.${NC}"
    echo ""
    echo "Options:"
    echo "  1. Backup existing and install new (recommended)"
    echo "  2. Merge with existing (append to current file)"
    echo "  3. Cancel installation"
    echo ""
    read -p "Choose option (1/2/3): " CHOICE

    case $CHOICE in
        1)
            BACKUP_FILE=~/.claude/CLAUDE.md.backup.$(date +%Y%m%d_%H%M%S)
            cp ~/.claude/CLAUDE.md "$BACKUP_FILE"
            echo -e "${GREEN}✓${NC} Backed up existing file to: $BACKUP_FILE"
            cp "$SCRIPT_DIR/CLAUDE.md" ~/.claude/CLAUDE.md
            echo -e "${GREEN}✓${NC} Installed new CLAUDE.md"
            ;;
        2)
            echo "" >> ~/.claude/CLAUDE.md
            echo "---" >> ~/.claude/CLAUDE.md
            echo "" >> ~/.claude/CLAUDE.md
            cat "$SCRIPT_DIR/CLAUDE.md" >> ~/.claude/CLAUDE.md
            echo -e "${GREEN}✓${NC} Appended Core Agent Operations to existing CLAUDE.md"
            ;;
        3)
            echo "Installation cancelled."
            exit 0
            ;;
        *)
            echo "Invalid option. Installation cancelled."
            exit 1
            ;;
    esac
else
    cp "$SCRIPT_DIR/CLAUDE.md" ~/.claude/CLAUDE.md
    echo -e "${GREEN}✓${NC} Installed CLAUDE.md to ~/.claude/"
fi

# Also install the full skill file for reference
mkdir -p ~/.claude/skills/core-agent-operations/references
cp "$SCRIPT_DIR/core-agent-operations-full.md" ~/.claude/skills/core-agent-operations/references/full-methodology.md
echo -e "${GREEN}✓${NC} Installed full methodology reference"

# Create the skill file
cat > ~/.claude/skills/core-agent-operations/SKILL.md << 'SKILLEOF'
---
name: core-agent-operations
description: Autonomous execution protocols with verified consumption and requirements traceability. Establishes operational hygiene for all agent work.
---

# Core Agent Operations

This skill is automatically loaded via ~/.claude/CLAUDE.md for all sessions.

The full methodology is in `references/full-methodology.md`.

## Quick Reference

### Consumption Receipts
After reading any document, produce a receipt:
- Total length
- All sections identified with 1-sentence summaries
- All requirements extracted
- Conflicts or ambiguities noted
- Confirmation of full consumption

### Requirements Checklist
Before execution, create a traceable checklist:
- Every requirement from source
- Source location (line/section)
- Status tracking (Pending → In Progress → Complete)

### Context Handoff (70-80% capacity)
Create handoff document with:
- Session objective
- Completed work
- Current state
- Active blockers
- Immediate next steps
- Key decisions made
- Files modified
- Requirements status

### Autonomous Execution
**Do:** Make decisions, continue without check-ins, choose between valid approaches
**Don't:** Ask "should I proceed?", wait for feedback, stop on minor ambiguity

See full methodology for complete protocols.
SKILLEOF

echo -e "${GREEN}✓${NC} Created skill reference"

echo ""
echo "=============================================="
echo -e "${GREEN}INSTALLATION COMPLETE!${NC}"
echo "=============================================="
echo ""
echo "Core Agent Operations is now active for all Claude Code sessions."
echo ""
echo "What's installed:"
echo "  ~/.claude/CLAUDE.md - Rules Claude reads every session"
echo "  ~/.claude/skills/core-agent-operations/ - Full methodology reference"
echo ""
echo "To verify, start a new Claude Code session and ask:"
echo "  'What operational protocols are you following?'"
echo ""
echo "To customize, edit: ~/.claude/CLAUDE.md"
echo ""
