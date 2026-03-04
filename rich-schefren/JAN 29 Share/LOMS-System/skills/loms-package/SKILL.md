---
name: loms-package
description: Transforms analyzed LOMS content into student-ready packages with READMEs, installers, and documentation.
license: Private
metadata:
  version: 1.1.0
  category: automation
---

# LOMS Package

Transforms analyzed content into distributable packages with documentation, installers, and clear usage instructions.

## Configuration

Read library path from `~/.claude/skills/loms-config.json`:
```json
{"library_base": "~/Documents/LOMS-Library"}
```

## When to Use

- After `/loms-analyze` has classified today's content
- When `/loms-run` executes the full pipeline
- Manually to repackage specific resources

## What It Creates

For each high-shareability item:

### Skill Packages
```
{skill-name}/
├── README.md          # What it does, how to install, how to use
├── SKILL.md           # The actual skill definition
├── install.sh         # Bash installer (Mac/Linux)
├── install.ps1        # PowerShell installer (Windows)
└── references/        # If skill has reference files
```

### Documentation Packages
```
{doc-name}/
├── README.md          # Overview and usage
└── *.md               # All documentation files
```

### Pattern Packages
```
{pattern-name}/
├── README.md          # Problem, solution, examples
├── excerpt.md         # Conversation showing pattern
└── teaching-notes.md  # How to teach this pattern
```

## Input/Output

**Input:** `{library_base}/library/processed/{date}/`

**Output:** `{library_base}/library/packages/`

### Package Structure

```
packages/
├── index.md              # Master index of all packages
├── skills/
│   └── {skill-name}/
├── documentation/
│   └── {doc-name}/
└── patterns/
    └── {pattern-name}/
```

## Execution Instructions

### Step 0: Read Config

Read `~/.claude/skills/loms-config.json` to get library_base.

### Step 1: Load Analyzed Data

Read `{library_base}/library/processed/{date}/summary.json`.

### Step 2: Filter Packageable Items

Select items where:
- `shareability.score` is "high"
- `classification.type` is "resource", "artifact", or "pattern"

### Step 3: Generate Packages

For each item:

#### Skills
1. Create `{library_base}/library/packages/skills/{skill-name}/`
2. Copy SKILL.md from original location
3. Copy references/ folder if exists
4. Generate README.md with:
   - What it does
   - Installation instructions (Mac + Windows)
   - Usage examples
5. Generate install.sh and install.ps1

#### Documentation
1. Create `{library_base}/library/packages/documentation/{doc-name}/`
2. Copy all documentation files
3. Generate README.md with overview

#### Patterns
1. Create `{library_base}/library/packages/patterns/{pattern-name}/`
2. Generate README.md from pattern data
3. Create excerpt.md with conversation
4. Create teaching-notes.md

### Step 4: Update Package Index

Update `{library_base}/library/packages/index.md` with all packages.

### Step 5: Generate Summary

Create `{library_base}/library/processed/{date}/packages-created.json`.

## README Template for Skills

```markdown
# {Skill Name}

{Description}

## Installation

**Mac/Linux:**
```bash
cd ~/Downloads/{skill-name}
chmod +x install.sh
./install.sh
```

**Windows (PowerShell):**
```powershell
cd ~/Downloads/{skill-name}
.\install.ps1
```

## How to Use

{Usage instructions}

## What Gets Installed

- `~/.claude/skills/{skill-name}/SKILL.md`
- Any reference files

---
*Packaged by LOMS - {date}*
```

## install.sh Template

```bash
#!/bin/bash
set -e
SKILL_NAME="{skill-name}"
SKILL_DIR="$HOME/.claude/skills/$SKILL_NAME"

echo "Installing $SKILL_NAME..."

if [ -d "$SKILL_DIR" ]; then
    read -p "Skill exists. Overwrite? (y/N) " -n 1 -r
    echo
    [[ ! $REPLY =~ ^[Yy]$ ]] && exit 1
    rm -rf "$SKILL_DIR"
fi

mkdir -p "$SKILL_DIR"
cp -r ./* "$SKILL_DIR/"
rm -f "$SKILL_DIR/install.sh" "$SKILL_DIR/install.ps1" "$SKILL_DIR/README.md"

echo "Installed to $SKILL_DIR"
```

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Config missing | Use default library path |
| No high-shareability items | Note "No items to package" |
| Original file missing | Skip, log error |
| Package exists | Update, note in log |

---

*LOMS Package Skill v1.1*
