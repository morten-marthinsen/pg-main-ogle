---
name: loms-run
description: Runs the complete LOMS (Look Over My Shoulder) pipeline - Capture, Analyze, Package, and Curate. Execute at end of day to harvest shareable content from today's work.
license: Private
triggers:
  - /loms
  - /loms-run
  - run loms
  - harvest today's work
  - end of day capture
metadata:
  version: 1.1.0
  category: automation
---

# LOMS Pipeline Orchestrator

Runs the complete Look Over My Shoulder pipeline to transform today's Claude Code work into student-ready resources.

## Configuration

**IMPORTANT:** Before using, check your library path in:
```
~/.claude/skills/loms-config.json
```

Default location: `~/Documents/LOMS-Library/`

To change, edit the `library_base` value in that file.

## When to Use

- **End of day** - Capture everything you worked on
- **Before lesson prep** - Ensure latest content is available
- **Nightly automation** - Scheduled runs (future)

## What It Does

Executes four phases in sequence:

```
Phase 1: Capture    -> library/daily/{date}.json
Phase 2: Analyze    -> library/processed/{date}/
Phase 3: Package    -> library/packages/{type}/{name}/
Phase 4: Curate     -> library/harvest/current-week/
```

## Usage

```
/loms
```

Or:
```
/loms-run
```

Or simply:
> "Run the LOMS pipeline"

## Pipeline Phases

### Phase 1: Capture (`/loms-capture`)

**What:** Scans `~/.claude/projects/` for today's sessions
**Output:** `library/daily/{date}.md` and `.json`
**Time:** ~30 seconds

Extracts:
- Projects worked on
- Session counts and durations
- Files created/modified
- First prompt previews

### Phase 2: Analyze (`/loms-analyze`)

**What:** Classifies captured content
**Output:** `library/processed/{date}/` with per-session analysis
**Time:** ~60 seconds

Determines:
- Content type (resource, pattern, artifact, none)
- Shareability (high, medium, low)
- Program relevance

### Phase 3: Package (`/loms-package`)

**What:** Creates distributable packages for high-shareability items
**Output:** `library/packages/{type}/{name}/` with complete packages
**Time:** ~60 seconds

Generates:
- README.md with usage instructions
- install.sh / install.ps1 for skills
- Copies all necessary files

### Phase 4: Curate (`/loms-curate`)

**What:** Organizes packages into browsable library
**Output:** `library/harvest/` with indexes and summaries
**Time:** ~30 seconds

Creates:
- Daily index with item listings
- Weekly summary with highlights
- Selection tracking

## Execution Instructions

When this skill is invoked, Claude should:

### Step 0: Read Config

Read `~/.claude/skills/loms-config.json` to get the `library_base` path.
Expand `~` to the user's home directory.

### Step 1: Run Capture

Execute the `/loms-capture` skill logic:
1. Scan `~/.claude/projects/` for all project folders
2. Read `sessions-index.json` from each
3. Filter to today's sessions (local date)
4. Parse transcripts for messages and file operations
5. Save to `{library_base}/library/daily/{date}.md` and `.json`

**Checkpoint:** Verify capture file exists before proceeding.

### Step 2: Run Analyze

Execute the `/loms-analyze` skill logic:
1. Read `{library_base}/library/daily/{date}.json`
2. Classify each session by type
3. Score shareability
4. Tag program relevance
5. Save to `{library_base}/library/processed/{date}/`

**Checkpoint:** Verify analysis summary exists before proceeding.

### Step 3: Run Package

Execute the `/loms-package` skill logic:
1. Read `{library_base}/library/processed/{date}/summary.json`
2. Filter to high-shareability items
3. Generate packages with READMEs and installers
4. Save to `{library_base}/library/packages/{type}/{name}/`

**Checkpoint:** Verify packages summary exists before proceeding.

### Step 4: Run Curate

Execute the `/loms-curate` skill logic:
1. Read `{library_base}/library/processed/{date}/packages-created.json` (or scan `library/packages/index.md`)
2. Generate daily index in harvest library
3. Update weekly summary
4. Update program-specific views

### Step 5: Report Summary

Output a completion summary:

```markdown
## LOMS Pipeline Complete

**Date:** {date}
**Library:** {library_base}

### Capture
- Projects: {n}
- Sessions: {n}
- Messages: {n}

### Analyze
- High shareability: {n}
- Medium shareability: {n}
- Low shareability: {n}

### Package
- Packages created: {n}
- Skills: {n}
- Documentation: {n}

### Curate
- Daily index created
- Weekly summary updated

**Ready for lesson prep:** {library_base}/library/harvest/
```

## Output Locations

| Phase | Output |
|-------|--------|
| Capture | `{library_base}/library/daily/{date}.md/.json` |
| Analyze | `{library_base}/library/processed/{date}/*.json` |
| Package | `{library_base}/library/packages/{name}/` |
| Curate | `{library_base}/library/harvest/` |

## Error Handling

| Error | Behavior |
|-------|----------|
| Config file missing | Use default `~/Documents/LOMS-Library/` |
| No sessions today | Complete with "0 items captured" |
| Capture fails | Stop, report error |
| Analyze fails | Stop, report error |
| Package fails | Continue to Curate with available data |
| Curate fails | Report error, packages still available |

## Performance Target

| Phase | Target |
|-------|--------|
| Capture | 30 sec |
| Analyze | 60 sec |
| Package | 60 sec |
| Curate | 30 sec |
| **Total** | **< 3 min** |

## Individual Phase Access

Run phases separately if needed:

- `/loms-capture` - Just capture
- `/loms-analyze` - Just analyze (requires capture)
- `/loms-package` - Just package (requires analyze)
- `/loms-curate` - Just curate (requires package)

---

*LOMS Pipeline Orchestrator v1.1*
*Look Over My Shoulder - Automated Content Harvesting*
