# Override Learning System

**Location:** `~/.claude/webinar-arena/overrides/`

## Purpose

When users override the Judge's winner selection, capture and learn from the override. These are high-signal events indicating where the Judge's prediction model may need calibration.

## Override Record Format

Each override is stored as: `[date]-[competition].md`

```markdown
---
type: override
competition_id: [id]
date: [YYYY-MM-DD]
---

# Override Record: [Competition Name]

## Original Prediction
- **Judge's Winner:** [Expert/Synthesis]
- **Confidence:** [High/Medium/Low]
- **Reasoning:** [Summary of why Judge picked this winner]

## Override Details
- **User's Choice:** [Expert/Synthesis]
- **Stated Reason:** [User's explanation]
- **Context Tags:** [audience type, offer type, etc.]

## Analysis
- **Pattern Match:** [Does this match any known override patterns?]
- **Calibration Signal:** [What should Judge learn from this?]
- **Confidence Adjustment:** [How should Judge confidence change for similar contexts?]

## Outcome (when reported)
- **Override Validated:** [Yes/No/Pending]
- **Override Choice Result:** [Positive/Negative/Unknown]
- **Original Choice Would Have:** [Better/Worse/Same/Unknown]

---

*Recorded: [Timestamp]*
```

## Override Patterns

When multiple overrides share characteristics, detect patterns:

| Pattern | Occurrences | Judge Adjustment |
|---------|-------------|------------------|
| Kennedy overridden for informal audiences | 0 | Reduce confidence 15% |
| Brunson overridden for skeptical markets | 0 | Reduce confidence 10% |
| Synthesis overridden for simple offers | 0 | Consider expert simplicity |

## Commands

### `/arena-overrides`

View override history and patterns.

**Options:**
- `--recent=[N]` - Show N most recent overrides
- `--expert=[name]` - Show overrides affecting specific expert
- `--patterns` - Show detected override patterns
- `--validated` - Show only validated overrides (with outcomes)

## Integration

### Inputs
- Judge prediction (winner + confidence + reasoning)
- User override choice
- User-stated reason for override
- Competition context (brief details)

### Outputs
- Override record (stored here)
- Pattern detection → Calibration adjustments
- Events to Learning Feed
- Updates to Judge confidence model

## Validation Loop

Overrides are most valuable when validated by outcomes:

1. **Override recorded** → Pending validation
2. **Outcome reported** → Compare override choice vs original prediction
3. **If override validated** → Strong signal to adjust Judge
4. **If override wrong** → User may have been mistaken; note but don't over-adjust

---

*Part of Webinar Arena v2.0*
*PRD-08: Override Learning System*
