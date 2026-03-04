# Research Cache Directory

**Location:** `~/.claude/webinar-arena/research-cache/`

## Purpose

Store completed deep research for Arena skill improvement. Cache allows reuse of research across similar questions and provides audit trail of research quality.

## Deep Research Integration (PRD-10)

### How It Works

1. **Gap Detected** → Continual Improvement Agent identifies knowledge gap
2. **Research Triggered** → Request sent to deep-research skill
3. **Research Executed** → Deep research skill investigates
4. **Results Cached** → Findings stored here with metadata
5. **Skill Updated** → Findings integrated into relevant expert skill

### Research Request Format

```markdown
# Research Request: [Cache Key]

**Requested:** [Date]
**For Skill:** [Expert name]
**Priority:** High | Medium | Low
**Triggered By:** [Pattern | Gap | User request]

**Research Question:**
[Specific question to answer]

**Context:**
[Why this matters, what problem it solves]

**Desired Output:**
- Frameworks applicable to webinar creation
- Specific techniques with examples
- Success metrics if available

**Constraints:**
- Must be actionable for webinar methodology
- Should include implementation guidance
- Prefer proven techniques over theory
```

### Research Result Format

```markdown
# Research Result: [Cache Key]

**Completed:** [Date]
**Duration:** [Time to complete]
**Quality Score:** [1-10]
**Sources Consulted:** [N]

---

## Findings Summary

[3-5 bullet executive summary]

---

## Detailed Findings

### [Finding 1 Title]
**Relevance:** High | Medium | Low
**Applicability:** Direct | Adaptation Required | Inspiration Only

[Detailed finding with context]

**Webinar Application:**
[How this applies to webinar methodology]

**Implementation:**
[Specific steps to implement]

---

### [Finding 2 Title]
...

---

## Recommended Skill Updates

Based on this research, recommend the following updates:

1. **[Update description]**
   - Skill: [Expert name]
   - Change Type: [Framework | Technique | Threshold | Example]
   - Priority: [High | Medium | Low]

2. ...

---

## Quality Assessment

| Criterion | Score (1-10) |
|-----------|--------------|
| Relevance to question | X |
| Depth of analysis | X |
| Actionability | X |
| Source quality | X |
| **Overall** | **X** |

---

## Cache Metadata

**Cache Key:** [unique-identifier]
**Expiry:** [Date - typically 90 days for relevance]
**Reuse Count:** [N times this research was referenced]
**Last Accessed:** [Date]

---

*Part of Deep Research Integration (PRD-10)*
```

## Cache Management

### Cache Key Generation

```
[skill]-[topic-slug]-[date]
```

Example: `kennedy-informal-authority-2026-01-23`

### Expiry Policy

- **Default expiry:** 90 days
- **High-quality research (score >8):** 180 days
- **Foundational research:** No expiry
- **Expired cache:** Still accessible, flagged as potentially stale

### Reuse Logic

Before triggering new research:
1. Check cache for matching topic
2. If found and not expired, use cached result
3. If expired but relevant, offer to update vs reuse
4. If not found, trigger new research

## Graceful Degradation

If deep-research skill unavailable:
- Log limitation
- Skip research step
- Proceed with pattern-based improvements only
- Queue research for later

---

*Part of Webinar Arena v2.0*
*PRD-10: Deep Research Integration*
