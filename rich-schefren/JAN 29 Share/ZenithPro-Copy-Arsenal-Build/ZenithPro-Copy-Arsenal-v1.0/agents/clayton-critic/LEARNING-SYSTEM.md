# Clayton Critic - Learning System Integration

This document defines how the Clayton Critic contributes to the central skill improvement system.

---

## Core Responsibility

After EVERY critique, this critic:
1. Logs findings locally (for Clayton-specific pattern detection)
2. Reports to central learning system (for cross-skill pattern sharing)
3. Checks pattern index for recurring issues
4. Triggers alerts or auto-applies based on thresholds

---

## Dual Logging Protocol

### Local Log
**Location:** `~/.claude/agents/clayton-critic/logs/critique-log.md`

Contains:
- Full critique details
- Clayton-specific pattern categorization
- Historical record of all evaluations

### Central Log
**Location:** `~/.claude/learning-system/logs/central-log.md`

Report format:
```markdown
## [TIMESTAMP] | CLAYTON-CRITIC | Pattern: [PATTERN-ID]

**Affected Skill(s):** [clayton-headlines, clayton-leads, etc.]
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

`clayton-{element}-{short-description}`

Examples:
- `clayton-headlines-clarity-first`
- `clayton-proof-bare-necessities-missing`
- `clayton-close-trivialize-skipped`
- `clayton-leads-story-mismatch`
- `clayton-emotion-fear-only-no-greed`
- `clayton-bullets-all-naked`

---

## Clayton-Specific Patterns to Watch

| Pattern | Framework Violated | Frequency Check |
|---------|-------------------|-----------------|
| Gate check failure | Benefit presence | High priority |
| Chain breaks | Tingle Factor | Track location |
| Missing components | 11-component architecture | Count which |
| Headline fails clarity | 6 Maxims pre-check | Critical |
| All fear, no greed | 29 Emotions sequence | Common |
| Bare necessities missing | 13 Proof Strategies | Non-negotiable |
| No trivialize step | 10-Step Close | Often skipped |
| No crossroads close | 10-Step Close | Often skipped |
| Risk-focused guarantee | Benefit-rich guarantee | Tone issue |
| Wimp words present | Voice audit | Scan for |

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
- `deutsch-*` skills (copywriting principles overlap)
- `evaldo-*` skills (proof, structure similarities)
- `webinar-*` skills (close and persuasion patterns)

When logging, consider if pattern is Clayton-specific or universal.

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

*Part of the Clayton Makepeace Copywriting Suite*
