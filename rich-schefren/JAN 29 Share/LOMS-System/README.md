# Look Over My Shoulder (LOMS) System

**Automatically captures, analyzes, and packages your Claude Code work sessions into shareable student resources.**

---

## What This Does

Every time you work with Claude Code, you're generating valuable content:
- Skills you build
- Patterns you discover
- Problems you solve
- Techniques you refine

The LOMS system automatically harvests this content and packages it for students to learn from - literally letting them "look over your shoulder" as you work.

---

## How It Works

The system runs as a 4-phase pipeline:

```
Phase 1: CAPTURE     - Scans today's sessions across all projects
                       Output: library/daily/{date}.json

Phase 2: ANALYZE     - Classifies content by type, scores shareability
                       Output: library/processed/{date}/

Phase 3: PACKAGE     - Creates distributable packages with READMEs
                       Output: library/packages/

Phase 4: CURATE      - Organizes into browsable library by week
                       Output: library/harvest/
```

---

## What Gets Captured

| Content Type | Example | Shareability |
|--------------|---------|--------------|
| **Skills** | New Claude Code skill you built | HIGH |
| **Agents** | Critic or evaluator agent | HIGH |
| **Patterns** | "Run these in parallel" technique | HIGH |
| **Documentation** | How-to guides you wrote | MEDIUM |
| **Artifacts** | Templates, scripts | MEDIUM |
| **Business-specific** | Internal decisions | LOW (excluded) |

The system automatically filters out:
- API keys and passwords
- Dollar amounts and financials
- Internal business discussions
- Private communications

---

## Benefits

### For You (The Expert)
- **Zero extra work** - Content harvests automatically
- **10-minute lesson prep** - Browse the harvest library, pick highlights
- **Never lose insights** - Every pattern and technique is captured
- **Content library grows** - Accumulates over time

### For Your Students
- **Real examples** - See actual work, not contrived demos
- **Full context** - Understand the why, not just the how
- **Immediate application** - Ready-to-install skills and patterns
- **Learn your thinking** - See how you approach problems

---

## Installation

### Mac (Terminal)

```bash
cd ~/Downloads/LOMS-System
chmod +x install.sh
./install.sh
```

### Windows (PowerShell)

```powershell
cd ~/Downloads/LOMS-System
.\install.ps1
```

The installer will:
1. Install all 5 LOMS skills to `~/.claude/skills/`
2. Create a config file at `~/.claude/skills/loms-config.json`
3. Create the library directory at `~/Documents/LOMS-Library/`

---

## Configuration

### Changing the Library Location

Edit `~/.claude/skills/loms-config.json`:

```json
{
  "library_base": "~/Documents/LOMS-Library",
  "description": "Edit this file to change where LOMS saves content."
}
```

Change `library_base` to your preferred location. Use `~` for your home directory.

**Examples:**
```json
{"library_base": "~/Documents/Obsidian/MyVault/LOMS"}
{"library_base": "~/Dropbox/LOMS-Content"}
{"library_base": "/Users/yourname/Teaching/LOMS"}
```

After changing, re-run the installer or manually create the folder structure.

---

## Usage

### Run the Full Pipeline

At the end of your work day:

```
/loms
```

Or tell Claude:
```
Run the LOMS pipeline
```

This executes all 4 phases and reports what was captured.

### Run Individual Phases

```
/loms-capture    # Just capture today's sessions
/loms-analyze    # Just analyze (requires capture)
/loms-package    # Just package (requires analyze)
/loms-curate     # Just curate (requires package)
```

---

## Output Structure

```
{library_base}/library/
├── daily/                    # Raw captures by date
│   ├── 2026-01-27.json
│   └── 2026-01-27.md
├── processed/                # Analyzed sessions
│   └── 2026-01-27/
│       ├── summary.json
│       └── {session-id}-analyzed.json
├── packages/                 # Distributable packages
│   ├── index.md              # Master index
│   ├── skills/
│   ├── documentation/
│   └── patterns/
└── harvest/                  # Browsable library
    ├── index.md              # Links to current week
    ├── usage-log.json
    └── 2026/
        └── week-04/
            ├── weekly-summary.md
            └── days/
                └── 2026-01-27/
                    └── index.md
```

---

## The 5 Skills Included

### 1. loms-run (Orchestrator)
The main entry point. Runs all 4 phases in sequence.

### 2. loms-capture
Scans `~/.claude/projects/` for today's sessions. Extracts:
- Project names
- Message counts
- First prompts (for context)
- Files created/modified

### 3. loms-analyze
Classifies each session:
- **Type**: resource, pattern, artifact, none
- **Shareability**: high, medium, low
- **Confidence**: high, medium, low

### 4. loms-package
Creates distributable packages for high-shareability items:
- README.md with instructions
- install.sh / install.ps1
- All necessary files

### 5. loms-curate
Organizes packages into a browsable library:
- Daily indexes
- Weekly summaries
- Selection tracking for lesson prep

---

## Workflow: End of Day

1. **Run the pipeline**
   ```
   /loms
   ```

2. **Review the summary**
   - See what was captured
   - Check high-shareability items

3. **Browse the harvest**
   - Open `{library_base}/library/harvest/`
   - Check the weekly summary
   - Pick items for upcoming lessons

4. **Prepare lesson**
   - Selected packages have everything needed
   - READMEs explain usage
   - Installers work for students

---

## Files Included

```
LOMS-System/
├── README.md               # This file
├── how-it-works.md         # Visual pipeline documentation (Mermaid diagrams)
├── install.sh              # Mac installer
├── install.ps1             # Windows installer
└── skills/
    ├── loms-config.json    # Configuration (copied during install)
    ├── loms-run/
    │   └── SKILL.md
    ├── loms-capture/
    │   └── SKILL.md
    ├── loms-analyze/
    │   └── SKILL.md
    ├── loms-package/
    │   └── SKILL.md
    └── loms-curate/
        └── SKILL.md
```

---

## Requirements

- **Claude Code** installed and working
- **Any Markdown viewer** (Obsidian, VS Code, etc.) for browsing the harvest library
- Active Claude Code projects in `~/.claude/projects/`

---

## Performance

| Phase | Typical Time |
|-------|--------------|
| Capture | ~30 seconds |
| Analyze | ~60 seconds |
| Package | ~60 seconds |
| Curate | ~30 seconds |
| **Total** | **< 3 minutes** |

---

## Troubleshooting

**"No sessions today"**
- Check that you have `~/.claude/projects/` with project folders
- Sessions must have been created/modified today (local time)

**Skills not installing**
- Check the skill folder structure
- Ensure SKILL.md exists in each folder

**Library not creating**
- Check your config file: `~/.claude/skills/loms-config.json`
- Verify the path is valid and writable
- Create the base folder manually if needed:

  **Mac/Linux:**
  ```bash
  mkdir -p ~/Documents/LOMS-Library/library
  ```

  **Windows (PowerShell):**
  ```powershell
  New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\Documents\LOMS-Library\library"
  ```

**Config file not found**
- Re-run the installer, or manually create `~/.claude/skills/loms-config.json`:
  ```json
  {
    "library_base": "~/Documents/LOMS-Library",
    "description": "Edit this file to change where LOMS saves content."
  }
  ```

---

*Packaged by Rich Schefren - Strategic Profits*
*Look Over My Shoulder - Automated Content Harvesting*
