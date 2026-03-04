# ARCHITECTURE-EXTENSION.md

> **Version:** 1.0
> **Extends:** `08-structure/STRUCTURE-AGENT.md`
> **Source:** `CopywritingEngine/PERSONA-SYSTEM.md`

---

## 1. Manager Agent Architecture

### Execution Model

```
                    USER REQUEST
                         │
                         ▼
              ┌─────────────────────┐
              │   STRUCTURE AGENT   │
              │  (State Machine)    │
              │                     │
              │  • Parse upstream   │
              │  • Route to layers  │
              │  • Enforce gates    │
              │  • Aggregate output │
              └──────────┬──────────┘
                         │
           ┌─────────────┼─────────────┐
           │             │             │
           ▼             ▼             ▼
    ┌────────────┐ ┌───────────┐ ┌───────────┐
    │ Research & │ │ Creative  │ │ Quality   │
    │ Analysis   │ │ & Copy    │ │ Assurance │
    │ Personas   │ │ Personas  │ │ Personas  │
    │            │ │           │ │           │
    │ Dr. Liu    │ │ Legendary │ │ Dr. Stern │
    │ S. Chen    │ │ Copywriter│ │ S. Conco  │
    │ Dr.Vasquez │ │ J. Torres │ │           │
    │ M. Webster │ │           │ │           │
    │ A. Rivera  │ │           │ │           │
    └────────────┘ └───────────┘ └───────────┘
```

### Persona Deployment Matrix

| Layer | Task Type | Primary Persona | Secondary Persona |
|-------|-----------|-----------------|-------------------|
| 0.1-0.3 | Data loading | Dr. James Liu — Research Director | — |
| 0.4 | Input validation | Dr. James Liu — Research Director | Sarah A. Conco — Client Protection |
| 1.1 | Thesis crystallization | Alex Rivera — Strategic Integration | Dr. James Liu — Research Director |
| 1.2 | Gap question mapping | Sarah Chen — Competitive Intelligence | Dr. Richard Stern — Skeptical Academic |
| 1.3 | Gap-to-chunk conversion | Marcus Webster — Pattern Synthesis | Alex Rivera — Strategic Integration |
| 1.4 | Strategy selection | Alex Rivera — Strategic Integration | Marcus Webster — Pattern Synthesis |
| 2.1 | Claim engineering | The Legendary Copywriter | Sarah A. Conco — Client Protection |
| 2.2 | Proof-to-claim mapping | Dr. Alena Vasquez — Evidence Evaluation | Dr. James Liu — Research Director |
| 2.3 | Benefit dimensionalization | The Legendary Copywriter | Jake Torres — Viral Content Architect |
| 2.4 | CPB chunk assembly | The Legendary Copywriter | Alex Rivera — Strategic Integration |
| 3.1 | Chunk sequencing | Marcus Webster — Pattern Synthesis | Dr. Richard Stern — Skeptical Academic |
| 3.2 | Simple segue building | The Legendary Copywriter | Jake Torres — Viral Content Architect |
| 3.3 | Connector engineering | The Legendary Copywriter | Marcus Webster — Pattern Synthesis |
| 3.4 | Coherence marker integration | Marcus Webster — Pattern Synthesis | The Legendary Copywriter |
| 3.5 | SIN segue building | The Legendary Copywriter | Alex Rivera — Strategic Integration |
| 4.1 | Logical coherence validation | Dr. Richard Stern — Skeptical Academic | Dr. James Liu — Research Director |
| 4.2 | Persuasion flow audit | The Legendary Copywriter | Marcus Webster — Pattern Synthesis |
| 4.3 | Anti-slop validation | Sarah A. Conco — Client Protection | Dr. Richard Stern — Skeptical Academic |
| 4.4 | Vault pattern comparison | Sarah Chen — Competitive Intelligence | Marcus Webster — Pattern Synthesis |
| 4.5 | Final assembly | Alex Rivera — Strategic Integration | Dr. James Liu — Research Director |

Reference: `CopywritingEngine/PERSONA-SYSTEM.md`

---

## 2. Quality Threshold Constraints

### Threshold Application

| Output Type | Threshold Level | Minimum Score | Evidence Required |
|-------------|-----------------|---------------|-------------------|
| Upstream package loading | STANDARD | 70% completeness | count: required fields present |
| Campaign thesis | CRITICAL | 95% alignment | trace: mechanism + promise + root cause derivation |
| Prospect gap map | ELEVATED | 85% coverage | count: ≥5 gaps, ≥3 gap types represented |
| Individual claims | ELEVATED | 85% quality | score: specificity ≥7, defensibility ≥7, opinion_test = pass |
| Proof-to-claim mappings | CRITICAL | 95% traceability | match: every proof_id exists in inventory |
| Benefit triplets | ELEVATED | 85% completeness | count: functional + dimensionalized + emotional present |
| CPB chunk coherence | ELEVATED | 85% quality | score: chunk_coherence ≥7.0 |
| Flow architecture | ELEVATED | 85% quality | score: conversational_flow ≥7.0 |
| Logical coherence | CRITICAL | 95% quality | score: logical_coherence ≥7.0, zero fallacies |
| Anti-slop validation | CRITICAL | 100% pass | count: violations = 0 |
| Final structure-package | CRITICAL | 95% integrity | score: overall_weighted_average ≥7.0 |

### Quality Threshold Protocol

1. Every microskill output receives a quality score using the relevant evidence type
2. Score must meet the threshold for that output type (STANDARD ≥70%, ELEVATED ≥85%, CRITICAL ≥95%)
3. If score < threshold:
   a. Log specific failure reason with evidence
   b. Attempt remediation within the microskill (max 2 iterations)
   c. If still failing after 2 iterations, escalate to layer-level remediation
   d. If layer remediation fails after 3 total iterations, trigger human checkpoint
4. Gate passage requires ALL constituent microskills at or above threshold
5. Final assembly blocked until all four Layer 4 validators return PASS

### Validation Score Thresholds

| Dimension | Minimum | Good | Excellent |
|-----------|---------|------|-----------|
| Logical coherence | 7.0 | 8.0 | 9.0+ |
| Persuasion flow | 7.0 | 8.0 | 9.0+ |
| Claim defensibility | 7.0 | 8.0 | 9.0+ |
| Proof density | 6.0 | 7.0 | 8.0+ |
| Benefit clarity | 7.0 | 8.0 | 9.0+ |
| Conversational flow | 7.0 | 8.0 | 9.0+ |
| Vault comparison | 6.0 | 7.0 | 8.0+ |
| Overall weighted average | 7.0 | 8.0 | 9.0+ |

---

## 3. Feedback Bus

### Upstream Dependencies

| Upstream Skill | Trigger Condition | Request Payload |
|----------------|-------------------|-----------------|
| 02-proof-inventory | CPB chunk requires proof type not available in inventory | `{ skill: "02-proof-inventory", request: "additional_proof", proof_type: string, for_claim: string, gap_question: string }` |
| 03-root-cause | Campaign thesis cannot connect to root cause expression | `{ skill: "03-root-cause", request: "expression_revision", misalignment: string, thesis_draft: string }` |
| 04-mechanism | Mechanism explanation insufficient for CPB chunk proof | `{ skill: "04-mechanism", request: "explanation_expansion", dimension: string, current_gap: string }` |
| 05-promise | Promise-thesis alignment below threshold | `{ skill: "05-promise", request: "promise_refinement", thesis: string, misalignment: string }` |

### Downstream Skills

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| 09-campaign-brief | structure-package.json assembled | Consumed as upstream input for coherence audit |
| 11-lead | structure-package.json assembled | Uses `downstream_handoffs.for_lead_writing` |
| 17-close | structure-package.json assembled | Uses `downstream_handoffs.for_close` |
| Offer presentation | structure-package.json assembled | Uses `downstream_handoffs.for_offer_presentation` |

### Feedback Request Handling

1. When a microskill identifies insufficient upstream data, it logs the gap
2. The orchestrator aggregates gap logs at the gate evaluation point
3. If gaps are blocking gate passage, the orchestrator issues a feedback request
4. Feedback requests use the schema below
5. The orchestrator waits for upstream response before re-attempting the gate

### Feedback Schemas

**Feedback Request:**
```yaml
feedback_request:
  requesting_skill: "08-structure"
  requesting_layer: string
  requesting_microskill: string
  target_skill: string
  request_type: enum[additional_proof, expression_revision, explanation_expansion, promise_refinement]
  context:
    what_is_needed: string
    why_current_is_insufficient: string
    specific_gap: string
  priority: enum[blocking, important, optional]
```

**Feedback Response:**
```yaml
feedback_response:
  responding_skill: string
  response_type: enum[fulfilled, partially_fulfilled, cannot_fulfill]
  updated_data: object
  notes: string
```

---

## 4. Verification Evidence Requirements

### Layer 0 Gate Evidence

```yaml
layer_0_gate_evidence:
  upstream_loading:
    claim: "All required upstream packages loaded and parsed"
    evidence_type: count
    evidence:
      mechanism_fields_present: integer
      mechanism_fields_required: integer
      proof_fields_present: integer
      proof_fields_required: integer
      root_cause_fields_present: integer
      root_cause_fields_required: integer
      promise_fields_present: integer
      promise_fields_required: integer
      all_required_present: boolean
  proof_strength:
    claim: "Proof inventory meets minimum strength threshold"
    evidence_type: score
    evidence:
      overall_strength: float
      minimum_required: 40
      above_minimum: boolean
  vault_intelligence:
    claim: "Structural patterns loaded from vault"
    evidence_type: count
    evidence:
      patterns_loaded: integer
      pattern_types: [string]
```

### Layer 1 Gate Evidence

```yaml
layer_1_gate_evidence:
  thesis_quality:
    claim: "Campaign thesis is single-sentence and connects upstream assets"
    evidence_type: trace
    evidence:
      thesis_statement: string
      mechanism_connection: string
      promise_connection: string
      root_cause_connection: string
      sentence_count: integer
      all_connections_present: boolean
  gap_coverage:
    claim: "Minimum 5 prospect gap questions identified across multiple gap types"
    evidence_type: count
    evidence:
      total_gaps: integer
      gap_types_represented: [string]
      gap_type_count: integer
      minimum_met: boolean
  strategy_alignment:
    claim: "Argument strategy aligned with Schwartz sophistication stage"
    evidence_type: match
    evidence:
      schwartz_stage: integer
      strategy_type: string
      alignment_rationale: string
      aligned: boolean
```

### Layer 2 Gate Evidence

```yaml
layer_2_gate_evidence:
  claim_quality:
    claim: "All claims pass specificity and defensibility tests"
    evidence_type: score
    evidence:
      total_claims: integer
      claims_passing_opinion_test: integer
      average_specificity: float
      average_defensibility: float
      minimum_specificity: float
      all_passing: boolean
  proof_traceability:
    claim: "Every proof element traces to valid inventory entry"
    evidence_type: match
    evidence:
      total_proof_elements: integer
      traced_to_inventory: integer
      untraced_elements: [string]
      all_traced: boolean
  benefit_completeness:
    claim: "Every CPB chunk has functional + dimensionalized + emotional benefits"
    evidence_type: count
    evidence:
      total_chunks: integer
      chunks_with_complete_benefits: integer
      incomplete_chunks: [string]
      all_complete: boolean
  chunk_coherence:
    claim: "Every CPB chunk meets minimum coherence threshold"
    evidence_type: score
    evidence:
      chunk_scores: [float]
      minimum_score: float
      average_score: float
      below_threshold: [string]
      all_above_minimum: boolean
```

### Layer 3 Gate Evidence

```yaml
layer_3_gate_evidence:
  sequence_logic:
    claim: "Chunk sequence has documented logical justification"
    evidence_type: trace
    evidence:
      sequence_order: [string]
      justification: string
      last_chunk_is_access: boolean
      logical_flow_verified: boolean
  segue_presence:
    claim: "Simple segue and SIN segue both present and properly constructed"
    evidence_type: match
    evidence:
      simple_segue_present: boolean
      simple_segue_references_mechanism: boolean
      simple_segue_references_promise: boolean
      sin_segue_present: boolean
      sin_segue_references_mechanism: boolean
      sin_segue_bridges_to_offer: boolean
  conversational_flow:
    claim: "Assembled argument passes conversational flow test"
    evidence_type: score
    evidence:
      flow_score: float
      minimum_required: 7.0
      above_minimum: boolean
      choppy_transitions_flagged: integer
```

### Layer 4 Gate Evidence

```yaml
layer_4_gate_evidence:
  logical_coherence:
    claim: "Argument holds together as a logical whole"
    evidence_type: score
    evidence:
      coherence_score: float
      fallacies_detected: integer
      non_sequiturs_detected: integer
      above_minimum: boolean
  persuasion_flow:
    claim: "Emotional and logical flow operates across full argument"
    evidence_type: score
    evidence:
      flow_score: float
      emotional_arc_present: boolean
      belief_progression_verified: boolean
      above_minimum: boolean
  anti_slop:
    claim: "Zero generic language violations detected"
    evidence_type: count
    evidence:
      violations_detected: integer
      violation_types: [string]
      pass: boolean
  vault_comparison:
    claim: "Structure compared to elite controls with differentiation documented"
    evidence_type: match
    evidence:
      patterns_compared: integer
      similarities_noted: [string]
      differentiators_documented: [string]
      structural_mimicry: boolean
      comparison_score: float
  assembly_integrity:
    claim: "Final structure-package.json is complete and valid"
    evidence_type: count
    evidence:
      required_sections: integer
      sections_present: integer
      downstream_handoffs_populated: boolean
      overall_weighted_average: float
      above_minimum: boolean
```

---

## 5. Continuous Learning Log

### Log Location

`08-structure/outputs/structure-learning-log.json`

### What Gets Logged

**Per-Run Entry:**
```yaml
run_entry:
  run_id: string
  timestamp: string
  niche: string
  sub_niche: string
  schwartz_stage: integer
  campaign_thesis: string
  argument_strategy: string
  total_cpb_chunks: integer
  total_proof_elements_mapped: integer
  gate_results:
    layer_0: enum[pass, fail]
    layer_1: enum[pass, fail]
    layer_2: enum[pass, fail]
    layer_3: enum[pass, fail]
    layer_4: enum[pass, fail]
  gate_iterations:
    layer_0: integer
    layer_1: integer
    layer_2: integer
    layer_3: integer
    layer_4: integer
  validation_scores:
    logical_coherence: float
    persuasion_flow: float
    claim_defensibility: float
    proof_density: float
    benefit_clarity: float
    conversational_flow: float
    anti_slop: enum[pass, fail]
    vault_comparison: float
    overall_weighted_average: float
  feedback_requests:
    - target_skill: string
      request_type: string
      resolved: boolean
  failure_log:
    - layer: integer
      microskill: string
      failure_reason: string
      remediation: string
      resolved: boolean
```

**Thesis Pattern Entry:**
```yaml
thesis_pattern_entry:
  niche: string
  schwartz_stage: integer
  thesis_type: string
  thesis_statement: string
  mechanism_type: string
  effectiveness_score: float
  notes: string
```

**Gap Distribution Entry:**
```yaml
gap_distribution_entry:
  niche: string
  total_gaps: integer
  gap_type_distribution:
    results: integer
    differentiation: integer
    superiority: integer
    mechanism: integer
    ease: integer
    speed: integer
    safety: integer
    personalization: integer
    access: integer
  most_critical_gap: string
  notes: string
```

### Manager Responsibility

- Log every run automatically upon completion (success or failure)
- Track thesis patterns across niches for emerging best practices
- Track gap distribution patterns for niche-specific optimization
- Surface feedback request patterns that indicate upstream skill gaps
- Flag gate failure patterns that suggest microskill improvement opportunities

---

## 6. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-27 | Initial architecture extension: full persona deployment, 5-level quality thresholds, feedback bus for 4 upstream skills, verification evidence for all 5 gates, continuous learning log with 3 entry types |
