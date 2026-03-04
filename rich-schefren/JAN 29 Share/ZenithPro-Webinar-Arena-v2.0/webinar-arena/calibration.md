# Judge Calibration Data

**Created:** 2026-01-23
**Last Calibration:** Never
**Total Predictions:** 0
**Accuracy Rate:** N/A (no data yet)

---

## Purpose

Track Marketplace Judge prediction accuracy against actual outcomes. Enable continuous calibration to improve prediction quality over time.

---

## Calibration Methodology

### Accuracy Calculation

```
Accuracy = (Correct Predictions) / (Total Predictions with Outcomes)
```

A prediction is "correct" when:
- Winner was used as-is → positive outcome
- Winner was used with minor modifications → positive outcome

A prediction is "incorrect" when:
- User overrode winner → override choice had better outcome
- Winner was used → negative outcome

A prediction is "partial" when:
- Winner used with major modifications → outcome ambiguous

### Confidence Calibration

Track prediction confidence vs actual accuracy:

| Confidence Level | Expected Accuracy | Actual Accuracy | Calibration |
|------------------|-------------------|-----------------|-------------|
| High (80-100%) | 85% | TBD | TBD |
| Medium (60-79%) | 70% | TBD | TBD |
| Low (40-59%) | 50% | TBD | TBD |

If actual accuracy differs significantly from expected, adjust confidence thresholds.

---

## Prediction Log

*No predictions recorded yet.*

### Log Format

```markdown
## [Date] Prediction: [Competition Name]

**Predicted Winner:** [Expert/Synthesis]
**Confidence:** [High/Medium/Low] ([X]%)
**Reasoning Summary:** [Why this prediction]

**Outcome:**
- Status: Pending | Reported
- Version Used: [Winner/Modified/Other/None]
- Result: [Positive/Negative/Neutral]
- Accuracy: [Correct/Incorrect/Partial]

---
```

---

## Bias Detection

Track systematic prediction errors:

### Expert Bias

| Expert | Predicted Wins | Actual Wins | Bias |
|--------|----------------|-------------|------|
| Fladlien | 0 | 0 | N/A |
| Brunson | 0 | 0 | N/A |
| Cage | 0 | 0 | N/A |
| Kern | 0 | 0 | N/A |
| Joon | 0 | 0 | N/A |
| Kennedy | 0 | 0 | N/A |
| Synthesis | 0 | 0 | N/A |

### Context Bias

| Context | Prediction Accuracy | Notes |
|---------|---------------------|-------|
| High-ticket | N/A | |
| Low-ticket | N/A | |
| Skeptical audience | N/A | |
| Warm audience | N/A | |
| Launch | N/A | |
| Evergreen | N/A | |

---

## Calibration Adjustments

### Applied Adjustments

*None yet.*

### Pending Adjustments

*None yet.*

---

## Concept Drift Detection

Monitor whether learned patterns are becoming stale:

### Recent vs Historical Accuracy

| Period | Predictions | Accuracy | Trend |
|--------|-------------|----------|-------|
| Last 30 days | 0 | N/A | N/A |
| 31-60 days | 0 | N/A | N/A |
| 61-90 days | 0 | N/A | N/A |

If recent accuracy is significantly lower than historical, flag for review:
- Are market conditions changing?
- Are methodologies becoming stale?
- Are user preferences shifting?

---

## Proxy Signal Validation

### Correlation Analysis

| Proxy Signal | Sample Size | Correlation with Outcome | Confidence |
|--------------|-------------|--------------------------|------------|
| Immediate deployment | 0 | N/A | N/A |
| No major edits | 0 | N/A | N/A |
| Accepted winner | 0 | N/A | N/A |
| Quick return | 0 | N/A | N/A |

Minimum sample size for correlation: 20 observations

---

## Version History

| Version | Date | Change | Applied |
|---------|------|--------|---------|
| 1.0.0 | 2026-01-23 | Initial creation | Yes |

---

*Part of Webinar Arena v2.0*
*PRD-06: Judge Calibration System*
