# How LOMS Works

> **Note:** This document contains Mermaid diagrams. For best results, view in Obsidian, VS Code, or GitHub.

## Overview

LOMS (Look Over My Shoulder) is a 4-phase pipeline that automatically harvests your Claude Code work into shareable student resources.

```mermaid
flowchart TD
WORK[Your Daily Work] --> CAP[Phase 1: Capture]
CAP --> ANA[Phase 2: Analyze]
ANA --> PKG[Phase 3: Package]
PKG --> CUR[Phase 4: Curate]
CUR --> LIB[(Harvest Library)]
LIB --> STUDENT((Students))
```

## Phase 1: Capture

Scans all your Claude Code projects and extracts today's sessions.

```mermaid
flowchart TD
PROJ[(~/.claude/projects)] --> SCAN[Scan All Projects]
SCAN --> FILTER[Filter Today's Sessions]
FILTER --> PARSE[Parse Transcripts]
PARSE --> DAILY[(daily/date.json)]
```

**What Gets Captured:**
- Project names
- Session counts
- First prompts
- Files modified
- Duration

## Phase 2: Analyze

Classifies each session by type and shareability.

```mermaid
flowchart TD
DAILY[(daily/date.json)] --> CLASS[Classify Content]
CLASS --> TYPE{Content Type?}
TYPE --> RES[Resource]
TYPE --> PAT[Pattern]
TYPE --> ART[Artifact]
TYPE --> NONE[None]
RES & PAT & ART --> SCORE[Score Shareability]
SCORE --> PROC[(processed/date/)]
```

**Shareability Scoring:**

```mermaid
flowchart TD
CONT[Content] --> CHK{Contains Private Data?}
CHK -->|Yes| LOW[LOW - Excluded]
CHK -->|No| TYPE{Is Skill or Agent?}
TYPE -->|Yes| HIGH[HIGH - Share]
TYPE -->|No| MED[MEDIUM - Review]
```

## Phase 3: Package

Creates distributable packages for high-shareability items.

```mermaid
flowchart TD
PROC[(processed/date/)] --> FILT[Filter High Score]
FILT --> GEN[Generate Package]
GEN --> README[README.md]
GEN --> INST[install.sh]
GEN --> INSTW[install.ps1]
GEN --> FILES[Copy Files]
README & INST & INSTW & FILES --> PKG[(packages/)]
```

**Package Types:**

```mermaid
flowchart TD
PKG[(packages/)] --> SKILLS[skills/]
PKG --> DOCS[documentation/]
PKG --> PATS[patterns/]
```

## Phase 4: Curate

Organizes packages into a browsable library by week.

```mermaid
flowchart TD
PKG[(packages/)] --> IDX[Generate Daily Index]
IDX --> WEEK[Update Weekly Summary]
WEEK --> HARVEST[(harvest/)]
```

**Library Structure:**

```mermaid
flowchart TD
HARV[(harvest/)] --> YEAR[2026/]
YEAR --> WK[week-04/]
WK --> SUM[weekly-summary.md]
WK --> DAYS[days/]
DAYS --> DATE[2026-01-27/]
DATE --> DAYIDX[index.md]
```

## Complete Pipeline

```mermaid
flowchart TD
U((You)) --> WORK[Work with Claude Code]
WORK --> EOD[End of Day]
EOD --> LOMS[Run /loms]
LOMS --> CAP[Capture]
CAP --> DAILY[(daily/)]
DAILY --> ANA[Analyze]
ANA --> PROC[(processed/)]
PROC --> PKG[Package]
PKG --> PKGF[(packages/)]
PKGF --> CUR[Curate]
CUR --> HARV[(harvest/)]
HARV --> BROWSE[Browse Library]
BROWSE --> SELECT[Select for Lesson]
SELECT --> STUDENT((Students))
```

## File Output Summary

| Phase | Input | Output |
|-------|-------|--------|
| Capture | ~/.claude/projects/ | library/daily/date.json |
| Analyze | daily/date.json | library/processed/date/ |
| Package | processed/date/ | library/packages/ |
| Curate | packages/ | library/harvest/ |

## Configuration

All paths read from `~/.claude/skills/loms-config.json`:

```mermaid
flowchart TD
CFG[(loms-config.json)] --> BASE[library_base]
BASE --> LIB[Your Library Location]
LIB --> DAILY[library/daily/]
LIB --> PROC[library/processed/]
LIB --> PKG[library/packages/]
LIB --> HARV[library/harvest/]
```

---

*Generated for LOMS System documentation*
