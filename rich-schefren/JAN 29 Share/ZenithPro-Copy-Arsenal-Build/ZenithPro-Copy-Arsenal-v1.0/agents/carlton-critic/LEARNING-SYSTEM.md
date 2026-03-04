# Carlton Critic - Learning System Integration

This document defines how the Carlton Critic contributes to the central skill improvement system.

---

## Core Responsibility

After EVERY critique, this critic:
1. Logs findings locally (for Carlton-specific pattern detection)
2. Reports to central learning system (for cross-skill pattern sharing)
3. Checks pattern index for recurring issues
4. Triggers alerts or auto-applies based on thresholds

---

## Dual Logging Protocol

### Local Log
**Location:** `~/.claude/agents/carlton-critic/logs/critique-log.md`

Contains:
- Full critique details
- Carlton-specific pattern categorization
- Historical record of all evaluations

### Central Log
**Location:** `~/.claude/learning-system/logs/central-log.md`

Report format:
```markdown
## [TIMESTAMP] | CARLTON-CRITIC | Pattern: [PATTERN-ID]

**Affected Skill(s):** [carlton-headlines, carlton-bullets, etc.]
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

`carlton-{element}-{short-description}`

Examples:
- `carlton-hooks-no-juxtaposition`
- `carlton-bullets-no-one-two-punch`
- `carlton-voice-not-bar-room`
- `carlton-research-no-avatar`
- `carlton-close-weak-guarantee`
- `carlton-body-no-story`

---

## Carlton-Specific Patterns to Watch

| Pattern | Framework Violated | Frequency Check |
|---------|-------------------|-----------------|
| No incongruous juxtaposition | Hook formulas | Critical - Step 4 |
| Missing One-Two Punch | Bullet methodology | High priority |
| Not bar-room voice | Voice/tone audit | Common failure |
| No avatar research | Steps 1-3 | Foundation check |
| Weak guarantee | Step 14 | Often skipped |
| No story integration | Steps 8-12 | Body copy check |
| Missing urgency/scarcity | Close frameworks | Track strength |
| Features not benefits | Transformation | Basic check |
| No A-Brain triggers | Primal appeals | Power check |
| Zombie state not broken | Core philosophy | Ultimate test |

---

## 17-Point Simple Writing System Checkpoints

| Step | Name | Critique Focus |
|------|------|----------------|
| 1 | Research | Has market been studied? |
| 2 | Avatar | Is the ideal customer clear? |
| 3 | USP | What makes this unique? |
| 4 | Hook | Incongruous juxtaposition present? |
| 5 | Headline | Curiosity + benefit + specificity? |
| 6 | Bullets | One-Two Punch structure? |
| 7 | Lead | Pattern interrupt? Story? |
| 8-12 | Body | Story, proof, credibility? |
| 13 | Close | Urgency, scarcity, CTA? |
| 14 | Offer | Risk reversal, guarantee? |
| 15-17 | Strategy | Business considerations |

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
- `clayton-*` skills (copywriting principles overlap, especially bullets and proof)
- `deutsch-*` skills (story patterns, emotional triggers)
- `evaldo-*` skills (proof, structure similarities)
- `webinar-*` skills (close and persuasion patterns)

When logging, consider if pattern is Carlton-specific or universal.

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

*Part of the John Carlton Copywriting Suite - 6,347 frameworks across 16 skills*
