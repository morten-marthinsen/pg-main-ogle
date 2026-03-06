# 00-Deep-Research Architecture Extension

**Version:** 1.0
**Extends:** MASTER-AGENT.md v4.0
**Source:** Rich Call Analysis (2026-01-25)

---

## Manager Agent Architecture

### Execution Model

```
USER REQUEST / UPSTREAM TRIGGER
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MANAGER AGENT                                │
│                    (This Document)                              │
│                                                                 │
│  Responsibilities:                                              │
│  • Parse research brief requirements                            │
│  • Activate core infrastructure (0.1-0.5)                       │
│  • Select optimal persona(s) for each subtask                   │
│  • Route work to persona sub-agents                             │
│  • Aggregate and validate outputs per layer                     │
│  • Enforce quality thresholds (see below)                       │
│  • Trigger feedback bus when quality fails                      │
│  • Log learnings to continuous learning log                     │
│                                                                 │
│  NEVER performs scraping, analysis, or synthesis directly       │
│  ALWAYS delegates to persona sub-agents                         │
└─────────────────────────────────────────────────────────────────┘
     │
     ├────────────────────────────────────────────────────────────┐
     │                                                            │
     ▼                                                            ▼
┌─────────────────────────────┐              ┌─────────────────────────────┐
│   Dr. James Liu             │              │   Sarah Chen                │
│   Systematic Research       │              │   Competitive Intel         │
│                             │              │                             │
│   Tasks:                    │              │   Tasks:                    │
│   • Source discovery        │              │   • Competitor analysis     │
│   • Quote extraction        │              │   • Positioning gaps        │
│   • Pattern documentation   │              │   • Market dynamics         │
│   • Synthesis orchestration │              │   • Strategic opportunities │
└─────────────────────────────┘              └─────────────────────────────┘
     │                                                            │
     ├────────────────────────────────────────────────────────────┤
     │                                                            │
     ▼                                                            ▼
┌─────────────────────────────┐              ┌─────────────────────────────┐
│   Marcus Webster            │              │   Alex Rivera               │
│   Pattern Synthesis         │              │   Strategic Integration     │
│                             │              │                             │
│   Tasks:                    │              │   Tasks:                    │
│   • Cross-domain patterns   │              │   • Final synthesis         │
│   • Non-obvious connections │              │   • Actionable direction    │
│   • Signal extraction       │              │   • Handoff packaging       │
└─────────────────────────────┘              └─────────────────────────────┘
```

### Persona Deployment Matrix

| Layer | Task Type | Primary Persona | Secondary Persona |
|-------|-----------|-----------------|-------------------|
| Layer 1.1-1.4 | Source discovery & scraping | Dr. James Liu | — |
| Layer 1.5 | Quote extraction | Dr. James Liu | — |
| Layer 2.1-2.2 | Pattern analysis | Marcus Webster | Dr. James Liu |
| Layer 2.3 | Competitive intelligence | Sarah Chen | Marcus Webster |
| Layer 2.4 | Schwartz stage assessment | Sarah Chen | Dr. James Liu |
| Layer 2.5 | Synthesis operations | Marcus Webster | Alex Rivera |
| Layer 3.1-3.3 | Opportunity identification | Alex Rivera | Sarah Chen |
| Final Handoff | Assembly & packaging | Alex Rivera | Dr. James Liu |

See [PERSONA-SYSTEM.md](../PERSONA-SYSTEM.md) for full persona specifications.

---

## Quality Threshold Constraints

### Threshold Application

| Output Type | Threshold Level | Minimum Score | Evidence Required |
|-------------|-----------------|---------------|-------------------|
| Quote extraction volume | STANDARD | 70% of minimums | Count verification |
| Quote authenticity | CRITICAL | 95% verified | Source traces |
| Pattern identification | ELEVATED | 85% confidence | Pattern evidence |
| Competitive intelligence | ELEVATED | 85% coverage | Competitor matrix |
| Schwartz stage assessment | CRITICAL | 95% confidence | Multi-signal validation |
| Layer 2.5 synthesis | ELEVATED | 85% coherence | Synthesis evidence block |
| Final handoff | CRITICAL | 95% complete | Assembly checklist |

### Quality Threshold Protocol

1. Every layer output receives quality score (0-100)
2. Score must meet threshold for output type
3. If score < threshold:
   - Log failure reason with specific evidence
   - Attempt remediation (max 2 iterations within layer)
   - If still failing, trigger feedback bus or escalate to human

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
      evidence: string  # Specific proof of score
  remediation_attempts: integer
  escalation_triggered: boolean
```

---

## Feedback Bus

### Upstream Dependencies (None - This is Layer 0)

This skill has no upstream dependencies. It is the first skill in the chain.

### Downstream Skills That Can Request Re-Run

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| 02-proof-inventory | Insufficient proof patterns | Re-run Layer 2.3 (competitive proof analysis) |
| 03-root-cause | Missing customer language for root cause | Re-run Layer 2.5-F (language database) |
| 04-mechanism | Insufficient mechanism patterns from competitors | Re-run Layer 2.3 focused on mechanism analysis |
| 05-promise | Missing competitor promise analysis | Re-run Layer 2.3-2.4 (competitive + Schwartz) |
| 06-big-idea | Insufficient market psychology data | Re-run Layer 2.5-A (WEB analysis) |

### Feedback Request Handling

When downstream skill requests re-run:

1. Receive feedback_request with specific deficiency
2. Log request to continuous learning log
3. Identify which layer(s) need re-execution
4. Re-execute targeted layer(s) with deficiency focus
5. Apply ELEVATED threshold to re-run outputs
6. Validate new output addresses feedback
7. Send updated output to requesting skill
8. If still failing after 2 re-runs → escalate to human

### Feedback Request Schema

```yaml
feedback_request:
  requesting_skill: string  # e.g., "03-root-cause"
  target_skill: "01-research"
  deficiency_type: enum[missing_data, insufficient_quality, wrong_format, logical_gap, proof_gap]
  specific_issue: string  # e.g., "Customer language database missing frustration patterns"
  evidence: string  # What's missing or insufficient
  suggested_layer: string  # Which layer likely needs re-run
  priority: enum[blocking, important, nice_to_have]
```

### Feedback Response Schema

```yaml
feedback_response:
  original_request_id: string
  status: enum[resolved, partial, escalated]
  changes_made:
    - layer_rerun: string
    - focus_area: string
    - additions: [string]
  new_output_location: string
  validation:
    threshold_met: boolean
    evidence: object
```

---

## Verification Evidence Requirements

### Layer Gate Evidence

Every layer gate validation requires EVIDENCE, not just assertion.

**Layer 1 Gate Evidence:**
```yaml
layer_1_gate_evidence:
  quote_volume:
    claim: "Minimum quotes per bucket met"
    evidence_type: count
    evidence:
      bucket_counts:
        frustrations: integer
        fears: integer
        desires: integer
        beliefs: integer
        behaviors: integer
      minimum_required: integer
      all_met: boolean

  source_diversity:
    claim: "Sources from minimum 6 platforms"
    evidence_type: count
    evidence:
      platforms: [string]
      count: integer
      tier_coverage:
        tier_1: [string]
        tier_2: [string]
        tier_3: [string]

  authenticity:
    claim: "All quotes verified authentic"
    evidence_type: trace
    evidence:
      total_quotes: integer
      verified_count: integer
      verification_rate: float
      failed_quotes: [object]  # Any that failed verification
```

**Layer 2 Gate Evidence:**
```yaml
layer_2_gate_evidence:
  pattern_analysis:
    claim: "All 5 aspects analyzed"
    evidence_type: match
    evidence:
      aspects_analyzed: [string]
      pattern_counts_per_aspect: object
      minimum_patterns_met: boolean

  competitive_intel:
    claim: "Competitor matrix complete"
    evidence_type: match
    evidence:
      competitors_analyzed: integer
      fields_populated: [string]
      gaps_identified: [string]

  schwartz_assessment:
    claim: "Schwartz stage determined with confidence"
    evidence_type: score
    evidence:
      stage_determined: integer
      confidence_score: float
      supporting_signals: [string]
      contradicting_signals: [string]
```

**Layer 2.5 Gate Evidence:**
```yaml
layer_2_5_gate_evidence:
  synthesis_artifacts:
    claim: "All 7 synthesis artifacts complete"
    evidence_type: count
    evidence:
      artifacts:
        - name: "transformation_pairs"
          status: enum[complete, partial, missing]
          file: string
        - name: "web_analysis"
          status: enum[complete, partial, missing]
          file: string
        # ... all 7 artifacts
      complete_count: integer

  human_approval:
    claim: "Human approved SYNTHESIS_VALIDATION.md"
    evidence_type: trace
    evidence:
      approval_timestamp: string
      approver: string
      approval_notes: string
```

---

## Continuous Learning Log

### Log Location
`learning-log/01-research-learning.json`

### What Gets Logged

**On Every Run:**
```yaml
run_entry:
  run_id: string
  timestamp: string
  project_name: string
  market_config:
    industry: string
    customer_term: string
    platform_count: integer
  layer_completion:
    layer_1: boolean
    layer_2: boolean
    layer_2_5: boolean
    layer_3: boolean
  quality_scores:
    layer_1_gate: integer
    layer_2_gate: integer
    layer_2_5_gate: integer
    final_handoff: integer
  threshold_met: boolean
  total_quotes_extracted: integer
  total_sources_scraped: integer
```

**On Tool Failure:**
```yaml
tool_failure_entry:
  run_id: string
  tool_name: string
  failure_type: string
  fallback_used: string
  fallback_successful: boolean
  learning: string  # What worked, what didn't
```

**On Feedback Request Received:**
```yaml
feedback_received_entry:
  run_id: string
  requesting_skill: string
  deficiency_type: string
  layer_rerun: string
  resolution_successful: boolean
  time_to_resolution: string
  pattern: string  # Is this a recurring request type?
```

**On Human Escalation:**
```yaml
escalation_entry:
  run_id: string
  escalation_point: string  # Where in the process
  reason: string
  human_decision: string
  learning: string  # What could prevent this next time
```

### Manager Responsibility

The Manager Agent:
- Logs every run automatically (entry created at start, updated at completion)
- Flags patterns when same feedback request type received 3+ times
- Queries log before platform selection to check historical success rates
- Surfaces tool failure patterns for human review
- Tracks average quality scores by market type for benchmarking

---

## Integration Points

### Where This Extension Applies to MASTER-AGENT.md

1. **After IDENTITY section:** Manager Agent Architecture diagram
2. **After CONSTRAINTS section:** Quality Threshold Constraints
3. **After each Layer section:** Layer-specific persona deployment notes
4. **After Final Handoff section:** Feedback Bus section
5. **After all execution sections:** Verification Evidence Requirements
6. **End of document:** Continuous Learning Log section

### Cross-References

- Persona specifications: [PERSONA-SYSTEM.md](../PERSONA-SYSTEM.md)
- Quality thresholds: [ARCHITECTURE-UPDATES.md](../ARCHITECTURE-UPDATES.md)
- Learning log schema: `learning-log/SCHEMA.md`

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-25 | Initial architecture extension from Rich call |

