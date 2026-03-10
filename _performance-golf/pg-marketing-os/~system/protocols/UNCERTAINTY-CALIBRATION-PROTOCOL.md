# Uncertainty Calibration Protocol — Confidence Quantification for Skill Outputs

**Version:** 1.0
**Created:** 2026-03-07
**Purpose:** Add confidence quantification to skill outputs so the system flags uncertain outputs early
**Sources:** Marc Stockman Quality Engine gap analysis (Tier 1 gap, 1.5/5 coverage)

---

## Why This Exists

The current system catches BAD output (gates, thresholds, verification) but doesn't flag UNCERTAIN output. A mechanism that scores 7.5 on clarity but the model is only 40% confident in its grounding — that's important information that gets lost.

---

## When It Applies

Foundation skill outputs especially (Skills 01-09), where decisions cascade downstream. Also applicable to Arena scoring in any skill.

---

## Confidence Dimensions

At output generation, the model rates confidence (1-10) on three dimensions:

### 1. Source Grounding
**"How much of this output is derived from actual source material vs. synthesized from general knowledge?"**

| Score | Meaning |
|-------|---------|
| 9-10 | Every claim traces to a specific source (research quote, study, data point) |
| 7-8 | Most claims trace to sources, a few are inferred from patterns |
| 5-6 | Mix of sourced and synthesized — some claims lack specific backing |
| 3-4 | Mostly synthesized from general domain knowledge |
| 1-2 | Almost entirely generated from general knowledge, minimal source grounding |

### 2. Differentiation
**"How different is this output from what a generic model would produce for the same prompt?"**

| Score | Meaning |
|-------|---------|
| 9-10 | Highly distinctive — uses specific campaign data, unique framing, wouldn't exist without this product's research |
| 7-8 | Clearly product-specific — references actual research findings, real audience language |
| 5-6 | Somewhat specific — mixes product data with generic category patterns |
| 3-4 | Mostly generic — could apply to many products in this category |
| 1-2 | Entirely generic — indistinguishable from template output |

### 3. Specificity
**"How concrete and detailed is this output vs. abstract and general?"**

| Score | Meaning |
|-------|---------|
| 9-10 | Insanely specific — names, numbers, mechanisms, studies, exact quotes |
| 7-8 | Specific — concrete details, real references, actionable claims |
| 5-6 | Mixed — some specific details, some general statements |
| 3-4 | General — broad claims, abstract language, few concrete details |
| 1-2 | Vague — could mean anything, no specificity |

---

## Confidence Assessment Format

```yaml
confidence_assessment:
  skill: "[skill name]"
  output_file: "[filename]"
  timestamp: "[ISO 8601]"

  source_grounding:
    score: [1-10]
    evidence: "[cite specific sources used, or note where synthesis occurred]"
  differentiation:
    score: [1-10]
    evidence: "[what makes this product-specific vs. generic]"
  specificity:
    score: [1-10]
    evidence: "[cite concrete details included]"

  overall_confidence: [average of 3 scores]
  flag: "[NONE | LOW_CONFIDENCE]"
  flag_reason: "[if flagged, which dimension and why]"
```

---

## Flag Thresholds

| Condition | Action |
|-----------|--------|
| Any dimension below 7 | **FLAG: LOW_CONFIDENCE** — surface to human at next review point |
| All dimensions 7+ | No flag — proceed normally |
| Any dimension below 5 | **FLAG: CRITICAL** — recommend re-running with more source material |
| Overall average below 6 | **FLAG: LOW_CONFIDENCE** — output may need significant human revision |

**FLAGS are informational, not blocking.** They surface at the next human review checkpoint. The human decides whether to proceed, supplement with more data, or re-run.

---

## Reliability Caveat

Self-reported confidence is unreliable under context pressure (same MC-CHECK problem). Mitigate by:

1. **Confidence is the LAST thing assessed** — after all output is generated, not during
2. **Evidence is required** — each score must cite specific evidence, not just state a number
3. **Cross-reference with programmatic checks** — if output barely passes thresholds AND self-reported confidence is high, that's a red flag (the proportionality check hook catches some of this)
4. **Track calibration over time** — if confidence scores consistently don't correlate with human quality assessments, recalibrate the rubric

---

## Integration with Existing System

- **Foundation packages** (Skills 01-09): Confidence assessment appended to the output package
- **Arena scoring** (any skill): Confidence dimensions can inform scoring — low-confidence outputs should be scrutinized more closely
- **Context reservoir**: Human notes which Foundation outputs had low confidence scores, guiding emphasis in copy generation

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-07 | Initial creation — 3-dimension confidence assessment with flag thresholds |
