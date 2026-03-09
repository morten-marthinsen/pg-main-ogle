#!/bin/bash
# Strategic Builder Methodology v3 - Installer for Mac/Linux
# Complete project lifecycle methodology with full source documentation,
# delivery operations phases, Three Questions Protocol, and all templates.

set -e

SKILL_NAME="strategic-builder"
SKILL_DIR="$HOME/.claude/skills/$SKILL_NAME"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "=================================="
echo "Strategic Builder Methodology v3"
echo "Installer"
echo "=================================="
echo ""

# Check if Claude Code skills directory exists
if [ ! -d "$HOME/.claude/skills" ]; then
    echo "Creating skills directory..."
    mkdir -p "$HOME/.claude/skills"
fi

# Check if skill already exists
if [ -d "$SKILL_DIR" ]; then
    echo ""
    echo "Warning: $SKILL_DIR already exists"
    read -p "Overwrite? (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Installation cancelled"
        exit 1
    fi
    rm -rf "$SKILL_DIR"
fi

# Create skill directory
echo "Creating skill directory..."
mkdir -p "$SKILL_DIR/references"

# Copy skill files
echo "Copying skill files..."
cp "$SCRIPT_DIR/SKILL.md" "$SKILL_DIR/"
cp "$SCRIPT_DIR/references/"*.md "$SKILL_DIR/references/"

echo ""
echo "=================================="
echo "Installation Complete!"
echo "=================================="
echo ""
echo "Skill installed to: $SKILL_DIR"
echo ""
echo "Files installed:"
echo "  SKILL.md                                  - Core methodology (agents follow this)"
echo "  references/prd-template.md                - PRD template (8 required sections)"
echo "  references/tdd-template.md                - Technical Design Document template"
echo "  references/architecture-template.md       - Architecture Map template"
echo "  references/capability-map-template.md     - Capability Map template"
echo "  references/three-questions-protocol.md    - Q1/Q2/Q3 framework with examples"
echo "  references/delivery-gap-and-prevention.md - Client-facing delivery failure patterns"
echo "  references/operations-protocol-missing-layer.md - 7 protocol distinctions"
echo "  references/skill-architecture-patterns.md - 10-layer skill quality model"
echo "  references/agentic-operations-principles.md"
echo "  references/runbooks.md"
echo "  references/technical-design-documents.md"
echo "  references/strategic-builder-source.md    - Full source methodology (50K)"
echo ""
echo "WHAT'S NEW IN V3:"
echo "  - Client-Facing Projects: Delivery Operations + End-to-End Testing phases"
echo "  - Ready to Ship checklist (mandatory before marking client projects complete)"
echo "  - Architecture template with Delivery Architecture section"
echo "  - Capability Map template with Delivery & Support Capabilities section"
echo "  - Three Questions Protocol (Q1: system? Q2: what must it do? Q3: how exactly?)"
echo "  - Full reference library: source docs, patterns, lessons from real failures"
echo ""
echo "HOW IT WORKS:"
echo "  When you start a new project in Claude Code, say:"
echo "    'New project: [describe what you want to build]'"
echo ""
echo "  The methodology covers the COMPLETE lifecycle:"
echo "    Setup > Build > Test > Audit > Optimize > Finish > Deploy > Archive"
echo ""
echo "  For client-facing projects, two additional phases are enforced:"
echo "    Delivery Operations > End-to-End Test > Ready to Ship"
echo ""
echo "=================================="
