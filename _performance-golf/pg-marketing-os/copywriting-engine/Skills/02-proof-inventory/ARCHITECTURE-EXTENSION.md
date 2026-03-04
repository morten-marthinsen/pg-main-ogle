# 01-Proof-Inventory Architecture Extension

**Version:** 1.0
**Extends:** PROOF-INVENTORY-AGENT.md v2.0
**Source:** Rich Call Analysis (2026-01-25)

---

## Manager Agent Architecture

### Execution Model

```
UPSTREAM: 01-research outputs
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MANAGER AGENT                                │
│                    (This Document)                              │
│                                                                 │
│  Responsibilities:                                              │
│  • Load and validate upstream deep research outputs             │
│  • Select optimal persona(s) for each layer                     │
│  • Route extraction to Dr. James Liu                            │
│  • Route scoring to Dr. Alena Vasquez                           │
│  • Route gap analysis to Dr. Richard Stern                      │
│  • Aggregate and validate proof inventory                       │
│  • Enforce quality thresholds                                   │
│  • Trigger feedback bus when proof gaps are critical            │
│  • Log learnings to continuous learning log                     │
│                                                                 │
│  NEVER performs extraction or scoring directly                  │
│  ALWAYS delegates to persona sub-agents                         │
└─────────────────────────────────────────────────────────────────┘
     │
     ├────────────────────────────────────────────────────────────┐
     │                                                            │
     ▼                                                            ▼
┌─────────────────────────────┐              ┌─────────────────────────────┐
│   Dr. James Liu             │              │   Dr. Alena Vasquez         │
│   Systematic Research       │              │   Evidence Evaluation       │
│                             │              │                             │
│   Tasks:                    │              │   Tasks:                    │
│   • Proof extraction        │              │   • Scoring (5 dimensions)  │
│   • Classification          │              │   • Composite calculation   │
│   • Source documentation    │              │   • Ceiling determination   │
│   • Verbatim preservation   │              │   • Gap severity assessment │
└─────────────────────────────┘              └─────────────────────────────┘
     │                                                            │
     └────────────────────────────────────────────────────────────┤
                                                                  │
                                                                  ▼
                              ┌─────────────────────────────┐
                              │   Dr. Richard Stern         │
                              │   Skeptical Academic        │
                              │                             │
                              │   Tasks:                    │
                              │   • Gap identification      │
                              │   • Weakness exposure       │
                              │   • Remediation planning    │
                              │   • Believability stress    │
                              └─────────────────────────────┘
```

### Persona Deployment Matrix

| Layer | Task Type | Primary Persona | Secondary Persona |
|-------|-----------|-----------------|-------------------|
| Layer 1 (Extraction) | Proof element extraction | Dr. James Liu | — |
| Layer 1 (Classification) | Category assignment | Dr. James Liu | Dr. Alena Vasquez |
| Layer 2 (Scoring) | 5-dimension scoring | Dr. Alena Vasquez | — |
| Layer 2 (Gap Analysis) | Gap identification | Dr. Richard Stern | Dr. Alena Vasquez |
| Layer 3 (Discovery) | External proof research | Dr. James Liu | Sarah Chen |
| Layer 3 (Generation) | Proof creation recommendations | Dr. Richard Stern | — |
| Layer 4 (Ranking) | Knockout selection | Dr. Alena Vasquez | Dr. Richard Stern |
| Layer 4 (Output) | Handoff packaging | Dr. James Liu | — |

See [PERSONA-SYSTEM.md](../PERSONA-SYSTEM.md) for full persona specifications.

---

## Quality Threshold Constraints

### Threshold Application

| Output Type | Threshold Level | Minimum Score | Evidence Required |
|-------------|-----------------|---------------|-------------------|
| Proof element extraction | STANDARD | 70% completeness | Element count + coverage |
| Verbatim preservation | CRITICAL | 95% accuracy | Source verification |
| 5-dimension scoring | ELEVATED | 85% consistency | Scoring rationale per element |
| Composite score calculation | CRITICAL | 95% accuracy | Formula verification |
| Promise ceiling determination | CRITICAL | 95% confidence | Multi-factor validation |
| Gap severity assessment | ELEVATED | 85% accuracy | Evidence-based severity |
| Knockout proof selection | ELEVATED | 85% justified | Comparison evidence |

### Quality Threshold Protocol

1. Every layer output receives quality score (0-100)
2. Score must meet threshold for output type
3. If score < threshold:
   - Log failure reason with specific evidence
   - Attempt remediation (max 2 iterations)
   - If still failing, trigger feedback bus to 01-research OR escalate

### Quality Evidence Schema

```yaml
quality_evidence:
  layer: string
  output_type: string
  score: integer (0-100)
  threshold_type: enum[standard, elevated, critical]
  threshold_met: boolean
  scoring_dimensions:
    - dimension: string
      score: integer
      evidence: string
  remediation_attempts: integer
  escalation_triggered: boolean
```

---

## Feedback Bus

### Upstream Dependencies This Skill Can Request Re-Run

| Upstream Skill | Trigger Condition | Request Payload |
|----------------|-------------------|-----------------|
| 01-research | Insufficient testimonial source material | Request re-scrape of testimonial-rich platforms |
| 01-research | Missing competitor proof patterns | Request competitive proof analysis |
| 01-research | No scientific backing found | Request academic/study source scraping |

### Downstream Skills That Can Request Re-Run

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| 03-root-cause | Proof ceiling too low for root cause claims | Re-run with targeted proof discovery |
| 04-mechanism | Insufficient mechanism proof elements | Re-run Layer 3 discovery for mechanism support |
| 05-promise | Proof-to-promise pairings insufficient | Re-run Layer 4 with promise constraints |
| 06-big-idea | Knockout proof doesn't support Big Idea | Re-evaluate knockout selection |

### Feedback Request Handling

When feedback received:

1. Log request to continuous learning log
2. Identify deficiency type:
   - **missing_data:** Trigger DISCOVERY operation
   - **insufficient_quality:** Re-score with ELEVATED threshold
   - **wrong_format:** Repackage handoffs
   - **logical_gap:** Re-run gap analysis
   - **proof_gap:** Trigger GENERATION recommendations
3. Re-execute relevant operation(s)
4. Apply ELEVATED threshold to re-run outputs
5. Validate resolution before sending response

### Feedback Schemas

```yaml
feedback_request:
  requesting_skill: string
  target_skill: "02-proof-inventory"
  deficiency_type: enum[missing_data, insufficient_quality, wrong_format, logical_gap, proof_gap]
  specific_issue: string
  affected_category: string  # Which proof category
  evidence: string
  priority: enum[blocking, important, nice_to_have]

feedback_response:
  original_request_id: string
  status: enum[resolved, partial, escalated]
  changes_made:
    - operation_rerun: string
    - category_affected: string
    - elements_added: integer
    - score_changes: object
  new_ceiling: string  # If ceiling changed
  validation:
    threshold_met: boolean
    evidence: object
```

---

## Verification Evidence Requirements

### Layer Gate Evidence

**Layer 1 Gate Evidence (Extraction):**
```yaml
layer_1_gate_evidence:
  element_extraction:
    claim: "≥1 proof element extracted"
    evidence_type: count
    evidence:
      total_elements: integer
      by_category:
        social: integer
        authority: integer
        demonstration: integer
        mechanism: integer
        data: integer
        risk_reversal: integer
      source_files_processed: integer

  verbatim_preservation:
    claim: "All proof text verbatim, not summarized"
    evidence_type: match
    evidence:
      sample_verifications:
        - element_id: string
          verbatim_text: string
          source_match: boolean
      verification_rate: float
```

**Layer 2 Gate Evidence (Scoring):**
```yaml
layer_2_gate_evidence:
  scoring_completeness:
    claim: "All 5 dimensions scored for all elements"
    evidence_type: match
    evidence:
      elements_scored: integer
      dimensions_per_element: 5
      any_missing: boolean
      missing_list: [string]

  ceiling_calculation:
    claim: "Promise ceiling calculated correctly"
    evidence_type: score
    evidence:
      overall_strength: integer
      gap_severity: string
      ceiling_determined: string
      calculation_inputs:
        category_scores: object
        schwartz_adjustments: object
        formula_applied: string
```

**Layer 4 Gate Evidence (Output):**
```yaml
layer_4_gate_evidence:
  knockout_selection:
    claim: "Knockout proof identified with rationale"
    evidence_type: trace
    evidence:
      knockout_id: string
      knockout_score: integer
      rationale: string
      comparison_to_runner_up:
        runner_up_id: string
        runner_up_score: integer
        why_knockout_wins: string

  handoff_completeness:
    claim: "All downstream handoffs populated"
    evidence_type: match
    evidence:
      to_promise:
        populated: boolean
        fields: [string]
      to_big_idea:
        populated: boolean
        fields: [string]
      to_mechanism:
        populated: boolean
        fields: [string]
      to_root_cause:
        populated: boolean
        fields: [string]
```

---

## Continuous Learning Log

### Log Location
`CopywritingEngine/LearningLog/02-proof-inventory-learning.json`

### What Gets Logged

**On Every Run:**
```yaml
run_entry:
  run_id: string
  timestamp: string
  operation: enum[inventory, discovery, generation, ranking, full_pipeline]
  input_summary:
    source_files_count: integer
    schwartz_stage: integer
    niche: string
  output_summary:
    total_elements: integer
    categories_covered: integer
    overall_strength: integer
    promise_ceiling: string
    gap_severity: string
  quality_scores:
    extraction_quality: integer
    scoring_consistency: integer
    ceiling_confidence: integer
  threshold_met: boolean
```

**On Gap Discovery:**
```yaml
gap_entry:
  run_id: string
  gap_category: string
  gap_severity: string
  remediation_recommended: string
  discovery_triggered: boolean
  generation_triggered: boolean
  outcome: string  # Was gap addressed?
```

**On Feedback Request Received:**
```yaml
feedback_received_entry:
  run_id: string
  requesting_skill: string
  deficiency_type: string
  category_affected: string
  resolution_approach: string
  ceiling_changed: boolean
  old_ceiling: string
  new_ceiling: string
```

**On Scoring Pattern:**
```yaml
scoring_pattern_entry:
  run_id: string
  niche: string
  schwartz_stage: integer
  average_scores_by_category:
    social: float
    authority: float
    demonstration: float
    mechanism: float
    data: float
    risk_reversal: float
  strongest_category: string
  weakest_category: string
  pattern_note: string  # Any notable observation
```

### Manager Responsibility

The Manager Agent:
- Logs every run automatically
- Tracks ceiling outcomes by niche for benchmarking
- Flags when same category consistently weak across projects
- Queries log to predict likely gaps before running
- Surfaces scoring patterns for calibration review

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-25 | Initial architecture extension from Rich call |

