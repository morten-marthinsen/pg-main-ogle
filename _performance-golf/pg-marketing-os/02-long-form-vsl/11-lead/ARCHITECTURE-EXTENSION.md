# ARCHITECTURE-EXTENSION.md

> **Version:** 1.0
> **Extends:** `11-lead/LEAD-AGENT.md`
> **Source:** `~brain/documentation/PERSONA-SYSTEM.md`

---

## 1. Manager Agent Architecture

### Execution Model

```
                    USER REQUEST
                         │
                         ▼
              ┌─────────────────────┐
              │     LEAD AGENT      │
              │  (State Machine)    │
              │                     │
              │  • Parse upstream   │
              │  • Classify type    │
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
| 1.1 | Lead type classification | Sarah Chen — Competitive Intelligence | Marcus Webster — Pattern Synthesis |
| 1.2 | Hook engineering | The Legendary Copywriter | Jake Torres — Viral Content Architect |
| 1.3 | Four-element mapping | Alex Rivera — Strategic Integration | The Legendary Copywriter |
| 1.4 | Emotional arc design | The Legendary Copywriter | Marcus Webster — Pattern Synthesis |
| 2.1 | Problem callout building | The Legendary Copywriter | Jake Torres — Viral Content Architect |
| 2.2 | Mechanism elevator pitch | The Legendary Copywriter | Alex Rivera — Strategic Integration |
| 2.3 | Open loop engineering | Jake Torres — Viral Content Architect | The Legendary Copywriter |
| 2.4 | Credibility insertion | Dr. Alena Vasquez — Evidence Evaluation | The Legendary Copywriter |
| 3.1 | Vagueness calibration | The Legendary Copywriter | Dr. Richard Stern — Skeptical Academic |
| 3.2 | Georgi compliance check | Sarah A. Conco — Client Protection | The Legendary Copywriter |
| 3.3 | Conversational flow | The Legendary Copywriter | Jake Torres — Viral Content Architect |
| 3.4 | Attention lock building | Jake Torres — Viral Content Architect | The Legendary Copywriter |
| 4.1 | Four-element validation | Alex Rivera — Strategic Integration | Dr. James Liu — Research Director |
| 4.2 | Emotional sale audit | The Legendary Copywriter | Marcus Webster — Pattern Synthesis |
| 4.3 | Anti-slop validation | Sarah A. Conco — Client Protection | Dr. Richard Stern — Skeptical Academic |
| 4.4 | Vault pattern comparison | Sarah Chen — Competitive Intelligence | Marcus Webster — Pattern Synthesis |
| 4.5 | Final assembly | Alex Rivera — Strategic Integration | Dr. James Liu — Research Director |

Reference: `~brain/documentation/PERSONA-SYSTEM.md`

---

## 2. Quality Threshold Constraints

### Threshold Application

| Output Type | Threshold Level | Minimum Score | Evidence Required |
|-------------|-----------------|---------------|-------------------|
| Upstream loading | STANDARD | 70% completeness | count: required fields present |
| Lead type classification | ELEVATED | 85% alignment | match: vault pattern + niche fit documented |
| Hook sentence | CRITICAL | 95% quality | score: attention ≥ 8, device type identified |
| Four E5 element mapping | CRITICAL | 100% presence | count: all 4 mapped to mechanism assets |
| Problem callout | ELEVATED | 85% calibration | match: Clemens vagueness pass |
| Mechanism elevator pitch | CRITICAL | 95% compliance | match: names mechanism, zero explanation |
| Open loops | ELEVATED | 85% quality | count: ≥ 2 loops, all with closure locations |
| Credibility insertions | ELEVATED | 85% brevity | count: each ≤ 2 sentences, not expanded to proof |
| Georgi compliance | CRITICAL | 100% compliance | count: 7 DOs present, 4 DON'Ts absent |
| Clemens calibration | CRITICAL | 100% compliance | match: problems vague, results specific |
| Conversational flow | ELEVATED | 85% quality | score: flow ≥ 7.0, reads aloud naturally |
| Anti-slop | CRITICAL | 100% pass | count: violations = 0 |
| Final lead-package | CRITICAL | 95% integrity | score: overall ≥ 7.0, word count 350-800 |

### Validation Score Thresholds

| Dimension | Minimum | Good | Excellent |
|-----------|---------|------|-----------|
| Four-element completeness | 7.0 | 8.0 | 9.0+ |
| Emotional sale achievement | 7.0 | 8.0 | 9.0+ |
| Hook strength | 8.0 | 9.0 | 10.0 |
| Open loop quality | 7.0 | 8.0 | 9.0+ |
| Conversational flow | 7.0 | 8.0 | 9.0+ |
| Vault comparison | 6.0 | 7.0 | 8.0+ |
| Overall weighted average | 7.0 | 8.0 | 9.0+ |

---

## 3. Feedback Bus

### Upstream Dependencies

| Upstream Skill | Trigger Condition | Request Payload |
|----------------|-------------------|-----------------|
| 04-mechanism | Mechanism name insufficient for lead naming | `{ skill: "04-mechanism", request: "name_refinement", issue: string }` |
| 05-promise | Primary promise too complex for elevator pitch | `{ skill: "05-promise", request: "promise_simplification", current: string }` |
| 08-structure | Campaign thesis doesn't translate to lead setup | `{ skill: "08-structure", request: "thesis_accessibility", issue: string }` |
| 02-proof-inventory | Insufficient credibility elements for lead insertion | `{ skill: "02-proof-inventory", request: "credibility_elements", type: string }` |

### Downstream Skills

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| 09-body | lead-package.json assembled | Uses `downstream_handoffs.for_body_copy` |
| Campaign argument | lead-package.json assembled | Uses `downstream_handoffs.for_campaign_argument` |
| Credibility section | lead-package.json assembled | Uses `downstream_handoffs.for_credibility_section` |

### Feedback Schemas

```yaml
feedback_request:
  requesting_skill: "11-lead"
  requesting_layer: string
  requesting_microskill: string
  target_skill: string
  request_type: enum[name_refinement, promise_simplification, thesis_accessibility, credibility_elements]
  context:
    what_is_needed: string
    why_current_is_insufficient: string
  priority: enum[blocking, important, optional]

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
    claim: "All required upstream packages loaded"
    evidence_type: count
    evidence:
      mechanism_loaded: boolean
      structure_loaded: boolean
      promise_loaded: boolean
      headline_loaded: boolean
      all_required_present: boolean
```

### Layer 1 Gate Evidence

```yaml
layer_1_gate_evidence:
  lead_type:
    claim: "Lead type classified with vault reference"
    evidence_type: match
    evidence:
      selected_type: string
      vault_reference: string
      niche_alignment: boolean
  hook:
    claim: "Hook sentence uses specific opening device"
    evidence_type: score
    evidence:
      hook_text: string
      device_type: string
      attention_score: float
      above_minimum: boolean
  four_elements:
    claim: "All four E5 elements mapped to mechanism assets"
    evidence_type: count
    evidence:
      new_different_mapped: boolean
      simple_easy_mapped: boolean
      works_quickly_mapped: boolean
      predictable_reliable_mapped: boolean
      all_four_mapped: boolean
  emotional_arc:
    claim: "Emotional arc ends at engagement/emotional sale"
    evidence_type: trace
    evidence:
      starting_state: string
      ending_state: string
      ends_at_engagement: boolean
```

### Layer 2 Gate Evidence

```yaml
layer_2_gate_evidence:
  problem_callout:
    claim: "Problem callout appropriately vague per Clemens"
    evidence_type: match
    evidence:
      vagueness_level: string
      clemens_pass: boolean
  elevator_pitch:
    claim: "Mechanism teased not explained"
    evidence_type: match
    evidence:
      mechanism_named: boolean
      how_explained: boolean  # must be false
      teases_not_tells: boolean
  open_loops:
    claim: "Minimum 2 open loops placed"
    evidence_type: count
    evidence:
      total_loops: integer
      all_have_closure_locations: boolean
      minimum_met: boolean
  credibility:
    claim: "Credibility brief, not expanded to proof"
    evidence_type: count
    evidence:
      total_insertions: integer
      all_brief: boolean
      any_expanded_to_proof: boolean  # must be false
```

### Layer 3 Gate Evidence

```yaml
layer_3_gate_evidence:
  vagueness:
    claim: "Clemens calibration applied"
    evidence_type: match
    evidence:
      problems_vague: boolean
      results_specific: boolean
      calibration_pass: boolean
  georgi:
    claim: "Georgi compliance verified"
    evidence_type: count
    evidence:
      dos_present: integer  # must be 7
      donts_violated: integer  # must be 0
      compliance_pass: boolean
  flow:
    claim: "Conversational flow passes read-aloud test"
    evidence_type: score
    evidence:
      flow_score: float
      above_minimum: boolean
  attention_lock:
    claim: "Attention lock present before transition"
    evidence_type: match
    evidence:
      lock_present: boolean
      urgency_device: string
      transition_clear: boolean
```

### Layer 4 Gate Evidence

```yaml
layer_4_gate_evidence:
  four_elements:
    claim: "All four E5 elements verified present and effective"
    evidence_type: count
    evidence:
      elements_present: integer  # must be 4
      all_connected_to_mechanism: boolean
      completeness_score: float
  emotional_sale:
    claim: "Lead achieves emotional sale"
    evidence_type: score
    evidence:
      emotional_sale_score: float
      prospect_state: string  # must include "prove it works"
      achieved: boolean
  anti_slop:
    claim: "Zero generic language violations"
    evidence_type: count
    evidence:
      violations: integer  # must be 0
      pass: boolean
  vault_comparison:
    claim: "Lead compared to elite patterns with differentiation"
    evidence_type: match
    evidence:
      patterns_compared: integer
      differentiation_documented: boolean
      comparison_score: float
  assembly:
    claim: "Lead-package.json complete and valid"
    evidence_type: count
    evidence:
      word_count: integer
      within_range: boolean
      all_sections_populated: boolean
      overall_score: float
      above_minimum: boolean
```

---

## 5. Continuous Learning Log

### Log Location

`11-lead/outputs/lead-learning-log.json`

### What Gets Logged

```yaml
run_entry:
  run_id: string
  timestamp: string
  niche: string
  sub_niche: string
  lead_type: string
  opening_device: string
  word_count: integer
  four_elements_present: boolean
  open_loops_count: integer
  georgi_compliance: boolean
  clemens_calibration: boolean
  gate_results:
    layer_0: enum[pass, fail]
    layer_1: enum[pass, fail]
    layer_2: enum[pass, fail]
    layer_3: enum[pass, fail]
    layer_4: enum[pass, fail]
  validation_scores:
    four_element_completeness: float
    emotional_sale_achievement: float
    hook_strength: float
    conversational_flow: float
    overall_weighted_average: float
  feedback_requests: [object]
  failure_log: [object]

lead_type_pattern_entry:
  niche: string
  lead_type_selected: string
  opening_device: string
  effectiveness_score: float
  word_count: integer
  notes: string
```

### Manager Responsibility

- Log every run automatically upon completion
- Track lead type effectiveness across niches
- Track opening device performance patterns
- Surface word count optimization patterns
- Flag recurring Georgi DON'T violations for microskill improvement

---

## 6. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-27 | Initial architecture extension: full persona deployment, 13-row quality threshold table, feedback bus for 4 upstream skills, verification evidence for all 5 gates, continuous learning log |
