# Deutsch Critic Learning System

This document describes how the Deutsch critic system improves through use.

---

## Overview

The Deutsch critic operates silently, evaluating all output from deutsch skills before the user sees it. Findings are logged for continuous improvement.

**Key Principle:** The user never sees the critique or the draft. They only see the final, polished output.

---

## The Silent Critique Loop

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   DEUTSCH SKILL PRODUCES DRAFT (hidden from user)                           │
│              ↓                                                              │
│   DEUTSCH-CRITIC EVALUATES (hidden from user)                               │
│              ↓                                                              │
│   LOGS TO:                                                                  │
│       1. Local: ~/.claude/agents/deutsch-critic/logs/critique-log.md        │
│       2. Central: ~/.claude/learning-system/logs/central-log.md             │
│              ↓                                                              │
│   FIXES APPLIED (hidden from user)                                          │
│              ↓                                                              │
│   USER SEES: Final polished output only                                     │
│              ↓                                                              │
│   PATTERN DETECTION checks logs:                                            │
│       • 2nd occurrence → ALERT USER for approval                            │
│       • 6th occurrence → AUTO-APPLY skill update                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Log Files

### Local Logs (Deutsch-specific)
`~/.claude/agents/deutsch-critic/logs/`

| File | Purpose |
|------|---------|
| `critique-log.md` | Every critique finding |
| `skill-changelog.md` | Version history of deutsch skill updates |

### Central Logs (Cross-system)
`~/.claude/learning-system/logs/`

| File | Purpose |
|------|---------|
| `central-log.md` | All critics report here |
| `pending-updates.md` | Updates awaiting approval |
| `applied-updates.md` | Update history |
| `pattern-index.md` | Pattern → count lookup |

---

## Pattern Detection Thresholds

| Occurrence | Classification | Action | User Sees |
|------------|---------------|--------|-----------|
| 1st | Note | Log only | Nothing |
| 2nd | **ALERT** | Flag for approval | "Skill update pending approval" |
| 3rd | Watch | Remind | "Reminder: pending updates" |
| 4th | Watch | Remind | "Reminder: pending updates" |
| 5th | Watch | Remind | "Reminder: pending updates" |
| 6th | **AUTO-APPLY** | Update skill | "Auto-applied skill update" |

---

## Workflow: After Each Critique

1. **Generate draft** using deutsch skill (hidden)
2. **Evaluate draft** using full AGENT.md framework (hidden)
3. **Identify failures** — What went wrong?
4. **Root cause analysis** — Is this:
   - Execution gap (writer didn't follow skill)?
   - Skill gap (skill doesn't address this)?
   - Knowledge gap (skill lacks this framework)?
5. **Append to BOTH logs:**
   - Local: `logs/critique-log.md`
   - Central: `~/.claude/learning-system/logs/central-log.md`
6. **Apply fixes** to create polished output (hidden)
7. **Check pattern index** for threshold status
8. **Present to user:**
   - Always: polished output
   - If 2nd occurrence: + alert
   - If 6th occurrence: + auto-apply notice

---

## Pattern ID Format

```
deutsch-{category}-{short-description}

Categories: headlines, bullets, leads, body, stories, close, psychology, strategy, process

Examples:
- deutsch-leads-story-first-required
- deutsch-body-explainer-trap
- deutsch-close-weak-crossroads
- deutsch-psychology-missing-triggers
```

---

## Skill Update Protocol

When a pattern reaches threshold:

### At 2nd Occurrence (Alert)
1. Append to output: "**Learning System Alert:** Skill update pending approval."
2. Include: pattern-id, issue description, proposed fix
3. Add to `pending-updates.md`

### At 6th Occurrence (Auto-Apply)
1. Apply the update to the skill file(s)
2. Log in `applied-updates.md`
3. Update `skill-changelog.md`
4. Append to output: "**Learning System Notice:** Auto-applied skill update."
5. Include: pattern-id, what was changed

---

## Rollback Protocol

If a skill update causes problems:

1. Check `logs/skill-changelog.md` for the version entry
2. Follow rollback instructions in that entry
3. Revert files to previous state
4. Log the rollback as a new changelog entry
5. Analyze why the update caused issues

---

## Deutsch-Specific Patterns to Watch

Based on Deutsch's methodology, common areas where gaps emerge:

| Pattern | Description |
|---------|-------------|
| `deutsch-leads-story-first-required` | Opening with problem rehash instead of origin story |
| `deutsch-body-explainer-trap` | Defining mechanism instead of demonstrating it |
| `deutsch-body-feature-list` | Listing deliverables instead of narrating transformation |
| `deutsch-close-weak-crossroads` | Mild discomfort instead of identity-level fear |
| `deutsch-close-abstract-future` | Abstract transformation instead of sensory future pace |
| `deutsch-close-fake-scarcity` | Scarcity without real constraint explanation |
| `deutsch-psychology-missing-triggers` | Not using all applicable emotional triggers |
| `deutsch-voice-inconsistency` | Shifting between conversational and formal |

---

## Commands

### Show Pending Updates
```
"Show me pending skill updates for Deutsch"
```

### Approve Update
```
"Approve update deutsch-leads-story-first-required"
```

### Reject Update
```
"Reject update deutsch-leads-story-first-required"
```

### Review Full Log
```
"Show me the Deutsch critique log"
```

### Check Pattern Status
```
"What's the status of pattern deutsch-body-explainer-trap?"
```

---

## Best Practices

1. **Log everything** — Better to over-log than miss a pattern
2. **Be specific** — Vague failures are hard to fix
3. **Root cause matters** — Not all failures are skill gaps
4. **Small updates** — Incremental improvements beat rewrites
5. **Preserve what works** — Don't "fix" working patterns into mediocrity
6. **Version carefully** — Always log before changing

---

*Deutsch Critic Learning System v2.0 - December 2025*
*Updated: New 2nd/6th thresholds, dual logging, silent critique workflow*
