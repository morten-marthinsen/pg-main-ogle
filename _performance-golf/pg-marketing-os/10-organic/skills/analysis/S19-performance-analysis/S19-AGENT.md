# S19: Performance Analysis — Master Agent

**Version:** 1.0
**Skill:** S19-performance-analysis
**Position:** Analysis, Post-Distribution
**Type:** Forensic Analysis + Calibration
**Dependencies:** S14 Content Assembly, S15-S18 Distribution
**Output:** Performance Analysis Report (PAR)

---

## Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Input validation + data loading | haiku | Simple validation |
| 1 | Deep performance analysis + variance investigation | opus | Pattern recognition, causal analysis |
| 4 | Report assembly + alert generation | sonnet | Assembly from existing analysis |

---

## Purpose

Transform raw platform metrics into actionable intelligence. Answer three critical questions: What worked? What didn't? Why? Compare predicted performance (virality score) against reality to calibrate the system.

**Success Criteria:**
- Predicted vs actual comparison complete
- Variance analysis with causal factors
- Hook, format, timing analysis complete
- Meaningful metrics (not vanity metrics)
- Learning flags set for S20

---

## Identity Boundaries

**This skill IS:**
- Performance data collection and normalization
- Prediction vs reality calibration
- Hook effectiveness scoring
- Format and timing analysis
- Variance investigation (why predictions missed)
- Growth attribution analysis

**This skill is NOT:**
- Learning capture (that's S20)
- System updates (that's S20)
- Content production (that's S08-S14)
- Just metric reporting (must explain WHY)

---

## Layer Map

> **Critical Constraints Reminder (Layer 0)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Minimum analysis window must be met
> - Vanity metrics only = FORBIDDEN

### Layer 0: Foundation (Loading & Validation)

| Microskill | Purpose | Document |
|------------|---------|----------|
| 0.1 | Input Validator | [0.1-input-validator.md](skills/layer-0/0.1-input-validator.md) |
| 0.2 | Data Loader | [0.2-data-loader.md](skills/layer-0/0.2-data-loader.md) |

> **Critical Constraints Reminder (Layer 1)**
> - Read ANTI-DEGRADATION.md before executing
> - Predicted vs actual comparison MANDATORY
> - Variance analysis REQUIRED
> - Engagement depth required (not just views)

### Layer 1: Analysis (Performance Investigation)

| Microskill | Purpose | Document |
|------------|---------|----------|
| 1.1 | Metric Normalization | [1.1-metric-normalization.md](skills/layer-1/1.1-metric-normalization.md) |
| 1.2 | Virality Calibration | [1.2-virality-calibration.md](skills/layer-1/1.2-virality-calibration.md) |
| 1.3 | Hook Analysis | [1.3-hook-analysis.md](skills/layer-1/1.3-hook-analysis.md) |
| 1.4 | Format Analysis | [1.4-format-analysis.md](skills/layer-1/1.4-format-analysis.md) |
| 1.5 | Timing Analysis | [1.5-timing-analysis.md](skills/layer-1/1.5-timing-analysis.md) |
| 1.6 | Variance Investigation | [1.6-variance-investigation.md](skills/layer-1/1.6-variance-investigation.md) |

> **Critical Constraints Reminder (Layer 4)**
> - Read ANTI-DEGRADATION.md before executing
> - All learning flags must be set
> - Report must explain WHY (not just WHAT)

### Layer 4: Output Packaging

| Microskill | Purpose | Document |
|------------|---------|----------|
| 4.1 | Report Assembler | [4.1-report-assembler.md](skills/layer-4/4.1-report-assembler.md) |
| 4.2 | Execution Log | [4.2-execution-log.md](skills/layer-4/4.2-execution-log.md) |

---

## Execution Flow

```
                    INPUT: Performance Data + Predictions
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 0: FOUNDATION (haiku)                           │
│   Input Validation → Data Loading (metrics + baselines + predictions)   │
│                    GATE: LAYER_0_COMPLETE.yaml                           │
└───────────────────────────────┬───────────────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 1: ANALYSIS (opus)                              │
│                                                                           │
│   Normalization → Calibration → Hook/Format/Timing → Variance Analysis   │
│                    GATE: LAYER_1_COMPLETE.yaml                           │
└───────────────────────────────┬───────────────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 4: OUTPUT (sonnet)                              │
│   PAR Assembly → Learning Flags → Execution Log                          │
│                    OUTPUT: PAR.yaml                                       │
└───────────────────────────────┴───────────────────────────────────────────┘
                                │
                                ▼
                    HANDOFF: S20 Learning Capture (with learning flags)
```

---

## Output Schema

```yaml
# PERFORMANCE ANALYSIS REPORT (PAR)
report_id:
generated_at:
content_analyzed:
analysis_type: "single_content"

executive_summary:
  one_line: string
  performance_grade: "A/B/C/D/F"
  key_number: string

detailed_analysis:
  metrics_breakdown:
    views:
      actual: integer
      vs_baseline: float
      percentile: integer
    engagement:
      actual: float
      vs_baseline: float
      percentile: integer
    saves:
      actual: integer
      vs_baseline: float
      percentile: integer
    shares:
      actual: integer
      vs_baseline: float
      percentile: integer
    follows:
      actual: integer
      vs_baseline: float
      percentile: integer

  virality_calibration:
    predicted: float
    actual_equivalent: float
    calibration_status: string
    deviation: float
    calibration_notes: string

  hook_analysis:
    hook_used: string
    effectiveness_score: float
    comparison_to_category: string

  format_analysis:
    format_used: string
    format_performance: string
    format_recommendations: string

  timing_analysis:
    posted_at: datetime
    timing_impact: string
    optimal_alternative: string

  growth_analysis:
    follows_gained: integer
    follow_rate: float
    growth_driver: string

insights:
  what_worked: []
  what_didnt_work: []
  why: []

recommendations:
  immediate_actions: []
  system_updates: []

learning_capture_flags:
  promote_to_specimen: boolean
  update_hook_data: boolean
  update_timing_data: boolean
  update_format_data: boolean
  calibration_adjustment_needed: boolean
```

---

## Validation Requirements (Gate G11)

- [ ] Content meets minimum analysis window
- [ ] Predicted vs actual comparison complete
- [ ] Variance analysis explains WHY predictions missed
- [ ] Meaningful metrics tracked (engagement depth, not just views)
- [ ] Hook, format, timing analysis complete
- [ ] Learning flags set for S20
- [ ] Report explains WHY (causal analysis, not just metric reporting)

---

## Constraints

### Input Constraints
- NEVER proceed without performance data
- NEVER proceed without virality score prediction
- NEVER accept analysis before minimum window
- NEVER accept vanity metrics only (views without engagement)

### Layer 1 Constraints
- NEVER skip predicted vs actual comparison
- NEVER skip variance analysis
- NEVER accept analysis without engagement depth
- NEVER skip WHY explanation (causal factors)
- NEVER accept single-metric conclusions

### Output Constraints
- NEVER output PAR without learning flags
- NEVER output without variance explanation
- NEVER output grade without justification
- NEVER output recommendations without specific actions

---

## CRITICAL: Variance Analysis is MANDATORY

**Every content with virality score prediction MUST have:**
- Predicted score vs actual performance comparison
- Deviation magnitude and direction
- WHY prediction was accurate/missed
- Contributing factors identified

**If prediction missed by >20%:**
- Deep variance investigation REQUIRED
- Systematic factors vs anomalies identified
- Calibration adjustment flag MUST be set

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-05 | Initial decomposition from monolithic SKILL.md |
