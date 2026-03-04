---
name: loms-analyze
description: Analyzes captured LOMS sessions to classify content by type, detect resources/patterns, score shareability, and suggest program relevance.
license: Private
metadata:
  version: 1.1.0
  category: automation
---

# LOMS Analyze

Classifies captured conversation data to identify shareable resources, AI direction patterns, and packageable artifacts.

## Configuration

Read library path from `~/.claude/skills/loms-config.json`:
```json
{"library_base": "~/Documents/LOMS-Library"}
```

## When to Use

- After `/loms-capture` has run for the day
- When `/loms-run` executes the full pipeline
- Manually to re-analyze specific sessions

## What It Analyzes

For each captured session:
- **Resource Detection**: Skills, agents, tools created in `~/.claude/skills/` or `~/.claude/agents/`
- **Pattern Detection**: Corrections, multi-step instructions, refinements
- **Shareability Scoring**: High/Medium/Low based on content type and privacy flags
- **Program Relevance**: Based on content topics

## Input/Output

**Input:** `{library_base}/library/daily/{date}.json`

**Output:** `{library_base}/library/processed/{date}/` containing:
- `{session-id}-analyzed.json` for each session
- `summary.json` with aggregate analysis

## Execution Instructions

### Step 0: Read Config

Read `~/.claude/skills/loms-config.json` to get library_base.
Expand `~` to user's home directory.

### Step 1: Load Captured Data

Read the daily capture JSON from `{library_base}/library/daily/YYYY-MM-DD.json`.

### Step 2: Classify Each Session

For each session, apply these classification rules:

#### Resource Detection (Priority 1)

Check `filesModified` for paths containing:
```
~/.claude/skills/    -> type: "resource", subtype: "skill"
~/.claude/agents/    -> type: "resource", subtype: "agent"
```

#### Pattern Detection (Priority 2)

Check `firstPrompt` for correction/instruction patterns:
- "no, instead/actually/rather"
- "that's not right/correct"
- Multi-step instructions (first, then, next, finally)
- Rules (always, never, you should/must)

#### Artifact Detection (Priority 3)

Check `filesModified` for reusable artifact types:
- .html files -> subtype: "template"
- .md files (docs) -> subtype: "documentation"
- .py/.js scripts -> subtype: "script"

### Step 3: Score Shareability

**AUTO-FLAG AS LOW (private) if contains:**
- api_key, password, secret, token
- Dollar amounts ($xxx)
- Internal/confidential/private mentions

**AUTO-FLAG AS HIGH (shareable) if:**
- Resource type is skill or agent
- No private patterns detected
- Explicit teaching content

**DEFAULT TO MEDIUM if:**
- Contains some private info but also teaching value
- Unclear whether business-specific

### Step 4: Generate Output

For each session, create `{session-id}-analyzed.json`:

```json
{
  "source": {
    "sessionId": "abc123",
    "project": "Project Name",
    "capturedDate": "2026-01-23"
  },
  "classification": {
    "type": "resource|pattern|artifact|none",
    "subtype": "skill|agent|correction|template|etc",
    "confidence": "high|medium|low"
  },
  "shareability": {
    "score": "high|medium|low",
    "flags": [],
    "reason": "Explanation"
  },
  "content": {
    "summary": "Brief description",
    "firstPrompt": "truncated...",
    "messageCount": N,
    "filesModified": []
  }
}
```

Also create `summary.json`:

```json
{
  "date": "2026-01-23",
  "analyzedAt": "ISO timestamp",
  "libraryBase": "{library_base}",
  "summary": {
    "totalSessions": 15,
    "byType": {"resource": 3, "pattern": 2, "artifact": 3, "none": 7},
    "byShareability": {"high": 5, "medium": 7, "low": 3}
  },
  "sessions": ["session-id-1", "session-id-2"]
}
```

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Config missing | Use default library path |
| No capture file for date | Error with message |
| Session already analyzed | Overwrite with new analysis |
| No classifiable content | type: "none", continue |
| Multiple types detected | Use highest priority |

---

*LOMS Analyze Skill v1.1*
