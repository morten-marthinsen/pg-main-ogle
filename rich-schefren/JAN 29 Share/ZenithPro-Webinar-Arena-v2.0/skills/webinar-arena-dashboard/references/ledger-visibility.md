# Learning Ledger Visibility Enhancement

## Purpose

Enable all Arena skills to see their own history. Each expert can query what patterns affected them, what updates were applied, and how they've performed over time.

## Commands

### `/arena-ledger`

Query the Learning Ledger.

**Options:**
- `--expert=[name]` - Filter to specific expert's history
- `--patterns` - Show only pattern detection entries
- `--updates` - Show only skill update entries
- `--research` - Show only research entries
- `--recent=[N]` - Show N most recent entries (default: 20)
- `--search="term"` - Search ledger content
- `--from=[date]` - Filter from date (YYYY-MM-DD)
- `--to=[date]` - Filter to date (YYYY-MM-DD)

## Ledger Entry Format

### Competition Entry

```markdown
## [DATE] COMPETITION: [Project Name]

**Competitors:** Fladlien, Brunson, Cage, Kern, Joon, Kennedy, Synthesis
**Winner:** [Expert/Synthesis]
**Runner-up:** [Expert]
**Margin:** [Close/Clear/Decisive]

**Judge Reasoning:**
[2-3 sentence summary of why winner won]

**Key Insight:**
[Pattern or learning extracted from this competition]

**Outcome:** [Pending | Reported: link]

---
```

### Pattern Entry

```markdown
## [DATE] PATTERN_DETECTED

**Pattern:** [Description]
**Evidence:**
- [Competition 1]: [relevant result]
- [Competition 2]: [relevant result]
- [Competition N]: [relevant result]

**Affected Expert(s):** [Expert names]
**Recommended Action:** [What to do]
**Status:** Proposed | Validated | Applied

---
```

### Skill Update Entry

```markdown
## [DATE] SKILL_UPDATE

**Expert:** [Name]
**Update:** [Description of change]
**Source:** Pattern detection | Research | User feedback
**Version:** [X.Y.Z]
**Applied:** [Yes/No]
**Approval:** Required | Auto-applied | User approved

---
```

### Research Entry

```markdown
## [DATE] RESEARCH_COMPLETE

**Topic:** [Research question]
**Triggered By:** [Pattern | User request | Skill gap]
**For Expert:** [Name]

**Findings Summary:**
[3-5 bullet points of key findings]

**Quality Score:** [1-10]
**Applied To:** [Skill name and version]

---
```

## Expert History View

When an expert skill queries its history, it receives:

```markdown
# [Expert Name] Learning History

## Summary
- **Total Competitions:** N
- **Wins:** N (X%)
- **Patterns Affecting You:** N
- **Skill Updates:** N
- **Research For You:** N

## Recent Performance
| Date | Competition | Result | Key Factor |
|------|-------------|--------|------------|
| ... | ... | ... | ... |

## Patterns Detected
| Date | Pattern | Status | Impact |
|------|---------|--------|--------|
| ... | ... | ... | ... |

## Skill Updates Applied
| Date | Update | Source | Version |
|------|--------|--------|---------|
| ... | ... | ... | ... |

## Research Completed
| Date | Topic | Quality | Applied |
|------|-------|---------|---------|
| ... | ... | ... | ... |
```

## Cross-Skill Visibility

Skills can also see comparative data:

```markdown
## How You Compare

| Expert | Win Rate | Trend | Strength Context |
|--------|----------|-------|------------------|
| You (Fladlien) | 35% | ↗️ | High-energy launches |
| Brunson | 28% | → | Perfect Webinar format |
| ... | ... | ... | ... |

## Where You Excel
- High-energy product launches
- Commitment-building intros
- Audiences that need activation

## Where Others Excel Over You
- Skeptical markets (Kennedy: 72%, You: 23%)
- Long-form evergreen (Kern: 65%, You: 31%)
```

## Implementation

The ledger is stored at `~/.claude/webinar-arena/ledger.md` and grows over time. Each entry is appended with a timestamp and type marker.

### Archival

When ledger exceeds 500 entries:
1. Archive older entries to `ledger-archive-[date].md`
2. Keep most recent 200 entries in main ledger
3. All entries remain queryable via search

### Write Protocol

Only these systems write to the ledger:
- Marketplace Judge (competition results)
- Skill Evolver (pattern detection, updates)
- Continual Improvement Agent (research)
- Outcome Tracker (outcome links)

All writes are append-only. No deletion or modification.

---

*Part of Webinar Arena v2.0*
*PRD-04: Learning Ledger Visibility*
