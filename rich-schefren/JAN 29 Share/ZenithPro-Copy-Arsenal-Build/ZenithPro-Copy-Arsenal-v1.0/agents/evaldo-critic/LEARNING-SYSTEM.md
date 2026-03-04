# Evaldo Critic - Learning System Integration

This document defines how the Evaldo Critic contributes to the central skill improvement system.

---

## Core Responsibility

After EVERY critique, this critic:
1. Logs findings locally (for Evaldo-specific pattern detection)
2. Reports to central learning system (for cross-skill pattern sharing)
3. Checks pattern index for recurring issues
4. Triggers alerts or auto-applies based on thresholds

---

## Dual Logging Protocol

### Local Log
**Location:** `~/.claude/agents/evaldo-critic/logs/critique-log.md`

Contains:
- Full critique details
- Evaldo-specific pattern categorization
- Historical record of all evaluations

### Central Log
**Location:** `~/.claude/learning-system/logs/central-log.md`

Report format:
```markdown
## [TIMESTAMP] | EVALDO-CRITIC | Pattern: [PATTERN-ID]

**Affected Skill(s):** [evaldo-headlines, evaldo-leads, etc.]
**Failure:** [specific failure description]
**Root Cause:** [execution gap / skill gap / knowledge gap]
**Proposed Fix:** [specific skill update proposal]
**Occurrence:** [1st / 2nd / 3rd / etc.]
```

---

## Pattern Detection Thresholds

| Occurrence | Status | Action |
|------------|--------|--------|
| 1st | LOGGED | Log only, no alert |
| 2nd | **PENDING** | Alert user: "Skill update pending approval" |
| 3rd-5th | PENDING | Remind user each occurrence |
| 6th | **AUTO-APPLY** | Update skill automatically, notify user |

---

## Pattern ID Format

`evaldo-{element}-{short-description}`

Examples:
- `evaldo-onebelief-unclear`
- `evaldo-10questions-missing-why-now`
- `evaldo-crocbrain-filter-fail`
- `evaldo-threebox-not-new`
- `evaldo-headlines-no-open-loop`
- `evaldo-close-no-reclose`

---

## Evaldo-Specific Patterns to Watch

| Pattern | Framework Violated | Frequency Check |
|---------|-------------------|-----------------|
| One Belief unclear | One Belief Formula | Critical - foundation |
| 10 Questions incomplete | 10 Questions | Count which missing |
| Croc Brain filter fail | Three Filters | Which filter? |
| Three Box fail | Three Box Check | Which box? |
| Headline no open loop | 13 Boosters + Loops | Common miss |
| Lead no punch in gut | First 5 Minutes | Energy issue |
| Proof pyramid incomplete | Proof Pyramid | Count layers |
| Content triangle missing | E+E+P | Which missing? |
| Bullets no curiosity | Curiosity + Benefit | Balance check |
| Close no re-close | Close Elements | Often skipped |
| Stack incomplete | Stack Presentation | Value clarity |
| Guarantee risk-focused | Positive Guarantee | Tone issue |

---

## Skill Update Workflow

When pattern reaches threshold:

### At 2nd Occurrence (PENDING)
1. Create entry in `~/.claude/learning-system/logs/pending-updates.md`
2. Alert user with summary
3. Propose specific skill file changes
4. Await approval

### At 6th Occurrence (AUTO-APPLY)
1. Apply the proposed changes to skill files
2. Log to `~/.claude/learning-system/logs/applied-updates.md`
3. Notify user of auto-applied change
4. Include rollback instructions

---

## Cross-Pollination Opportunities

Patterns found here may apply to:
- `deutsch-*` skills (VSL structure overlap)
- `clayton-*` skills (proof, persuasion similarities)
- `webinar-*` skills (presentation structure parallels)

When logging, consider if pattern is Evaldo-specific or universal.

---

## Files Maintained

| File | Purpose |
|------|---------|
| `logs/critique-log.md` | Full local critique history |
| `LEARNING-SYSTEM.md` | This file - protocol definition |

Central files referenced:
| File | Purpose |
|------|---------|
| `~/.claude/learning-system/logs/central-log.md` | All critics report here |
| `~/.claude/learning-system/logs/pending-updates.md` | Updates awaiting approval |
| `~/.claude/learning-system/logs/applied-updates.md` | Completed updates history |
| `~/.claude/learning-system/logs/pattern-index.md` | Pattern occurrence tracking |

---

*Part of the Evaldo Albuquerque Copywriting Suite*
