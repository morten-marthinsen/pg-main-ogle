# Learning Requests Directory

**Location:** `~/.claude/webinar-arena/learning-requests/`

## Purpose

Store skill-specific learning needs identified by the Continual Improvement Agent. Each expert has their own file tracking gaps, research needs, and improvement opportunities.

## File Structure

Each expert has: `[expert-name].md`

Example: `fladlien.md`, `brunson.md`, etc.

## Learning Request Format

```markdown
# Learning Requests: [Expert Name]

**Last Updated:** [Date]
**Total Open Requests:** [N]
**Research In Progress:** [N]
**Completed This Month:** [N]

---

## Open Requests

### [Request ID] - [Title]
**Priority:** High | Medium | Low
**Identified:** [Date]
**Status:** Open | Research In Progress | Completed | Rejected

**Gap Description:**
[What problem or opportunity was identified]

**Evidence:**
- [Competition/pattern that triggered this]
- [Data points supporting the gap]

**Research Question:**
[Specific question to answer]

**Proposed Approach:**
[How this might be addressed]

---

## Completed Requests

### [Request ID] - [Title]
**Completed:** [Date]
**Resolution:** [How it was resolved]
**Skill Update:** [Version number if applied]

---

## Rejected Requests

### [Request ID] - [Title]
**Rejected:** [Date]
**Reason:** [Why it was rejected]

---
```

## Priority Levels

| Priority | Criteria | Response Time |
|----------|----------|---------------|
| HIGH | Gap >25%, pattern confidence >0.9 | Next improvement cycle |
| MEDIUM | Gap 15-25%, pattern confidence >0.7 | Within 2 cycles |
| LOW | Gap <15%, or low confidence | When capacity allows |

## Request Lifecycle

1. **Created** - Agent detects gap/opportunity
2. **Open** - Awaiting research or action
3. **Research In Progress** - Deep Research engaged
4. **Completed** - Research done, skill updated
5. **Rejected** - Determined not actionable or invalid

## Integration

- Created by: Continual Improvement Agent (PRD-05)
- Consumed by: Skill Self-Learning System (PRD-09)
- Research by: Deep Research Integration (PRD-10)
- Tracked in: Learning Ledger and Dashboard

---

*Part of Webinar Arena v2.0*
*PRD-09: Skill Self-Learning System*
