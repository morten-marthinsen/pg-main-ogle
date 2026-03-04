---
name: loms-capture
description: Captures today's Claude Code sessions across all projects and generates a daily summary for the Look Over My Shoulder system. Run this at end of day to capture what was worked on.
license: Private
metadata:
  version: 1.1.0
  category: automation
---

# LOMS Daily Capture

Captures all Claude Code conversations from today and generates a structured daily summary.

## Configuration

Read library path from `~/.claude/skills/loms-config.json`:
```json
{"library_base": "~/Documents/LOMS-Library"}
```

If config missing, use default: `~/Documents/LOMS-Library/`

## When to Use

- End of day to capture what you worked on
- Before a lesson to see what's available to share
- When `/loms-run` calls this as part of the pipeline

## What It Captures

For each project with today's sessions:
- Project name and path
- Number of sessions and messages
- First prompt preview (to understand context)
- Files created, modified, or edited
- Session duration

## Output Location

- Markdown summary: `{library_base}/library/daily/YYYY-MM-DD.md`
- JSON data: `{library_base}/library/daily/YYYY-MM-DD.json`

## How It Works

1. Read config to get library_base
2. Scan `~/.claude/projects/` for all project folders
3. Read `sessions-index.json` from each project
4. Filter to sessions modified today (local date)
5. Parse JSONL transcripts to extract:
   - User and assistant messages
   - Write, Edit tool calls (to find files created/modified)
   - Timestamps (for duration calculation)
6. Generate structured summary
7. Save to library folder

## Execution Instructions

When this skill is invoked, Claude should:

### Step 0: Read Config

Read `~/.claude/skills/loms-config.json` to get the `library_base` path.
Expand `~` to the user's home directory.

If the config file is missing, use the default: `~/Documents/LOMS-Library/`

### Step 1: Discover Projects

```bash
ls ~/.claude/projects/
```

For each project folder, read `sessions-index.json`.

### Step 2: Filter Today's Sessions

Parse each `sessions-index.json` and filter entries where `modified` timestamp is today (local date, not UTC).

### Step 3: Parse Transcripts

For each today's session, read the JSONL file. Extract:

1. **Messages**: Lines with `type: "user"` or `type: "assistant"` that have `message.content`
2. **File Operations**: Lines with tool_use where `name` is "Write" or "Edit" - extract the `file_path` from `input`
3. **Timestamps**: First and last message timestamps for duration

### Step 4: Generate Summary

Create markdown following this template:

```markdown
# Look Over My Shoulder - Daily Capture

**Date:** YYYY-MM-DD
**Captured:** HH:MM (time of capture)

---

## Summary

- **Projects Active:** N
- **Total Sessions:** N
- **Total Messages:** N
- **Total Duration:** X hours Y minutes

---

## Projects

### [Project Name]

**Sessions:** N | **Messages:** N | **Duration:** X min

**First Prompt:**
> [First 200 characters of first user message...]

**Files Modified:**
- `path/to/file1.md` (created)
- `path/to/file2.md` (edited)

---

## Metadata

- **Capture Version:** 1.1
- **Library Base:** {library_base}
- **Projects Scanned:** N
- **Sessions Included:** N
- **Errors:** N (or "None")
```

### Step 5: Save Output

Save to:
- `{library_base}/library/daily/YYYY-MM-DD.md`
- `{library_base}/library/daily/YYYY-MM-DD.json`

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Config missing | Use default ~/Documents/LOMS-Library/ |
| No sessions today | Create summary noting "No AI sessions recorded today" |
| Missing sessions-index.json | Skip project, count in errors |
| Malformed JSONL line | Skip line, continue processing |
| File already exists | Overwrite with updated summary |

## JSON Output Structure

```json
{
  "date": "YYYY-MM-DD",
  "capturedAt": "ISO timestamp",
  "version": "1.1",
  "libraryBase": "{library_base}",
  "summary": {
    "projectCount": N,
    "sessionCount": N,
    "messageCount": N,
    "durationMinutes": N
  },
  "projects": [
    {
      "name": "Project Name",
      "path": "/original/path",
      "sessions": [...]
    }
  ],
  "errors": []
}
```

---

*LOMS Capture Skill v1.1*
