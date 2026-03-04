# ARCHITECTURE-EXTENSION.md

> **Version:** 1.0
> **Extends:** `12-story/STORY-AGENT.md`
> **Source:** `CopywritingEngine/PERSONA-SYSTEM.md`

---

## 1. Manager Agent Architecture

### Execution Model

```
                    USER REQUEST
                         |
                         v
              +---------------------+
              |     STORY AGENT     |
              |  (State Machine)    |
              |                     |
              |  * Parse upstream   |
              |  * Classify type    |
              |  * Route to layers  |
              |  * Enforce gates    |
              |  * Aggregate output |
              +----------+----------+
                         |
           +-------------+-------------+
           |             |             |
           v             v             v
    +------------+ +-----------+ +-----------+
    | Research & | | Creative  | | Quality   |
    | Analysis   | | & Copy    | | Assurance |
    | Personas   | | Personas  | | Personas  |
    |            | |           | |           |
    | Dr. Liu    | | Legendary | | Dr. Stern |
    | S. Chen    | | Copywriter| | S. Conco  |
    | Dr.Vasquez | | J. Torres | |           |
    | M. Webster | |           | |           |
    | A. Rivera  | |           | |           |
    +------------+ +-----------+ +-----------+
```

### Persona Deployment Matrix

| Layer | Task Type | Primary Persona | Secondary Persona |
|-------|-----------|-----------------|-------------------|
| 0.1-0.3 | Data loading | Dr. James Liu -- Research Director | -- |
| 0.4 | Input validation | Dr. James Liu -- Research Director | Sarah A. Conco -- Client Protection |
| 1.1 | Story type classification | Sarah Chen -- Competitive Intelligence | Marcus Webster -- Pattern Synthesis |
| 1.2 | Story beat mapping | The Legendary Copywriter | Marcus Webster -- Pattern Synthesis |
| 1.3 | Character architecture | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 1.4 | Emotional arc design | The Legendary Copywriter | Marcus Webster -- Pattern Synthesis |
| 2.1 | Setup/context building | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 2.2 | Discovery/experiment sequence | The Legendary Copywriter | Alex Rivera -- Strategic Integration |
| 2.3 | Mechanism revelation | The Legendary Copywriter | Dr. Alena Vasquez -- Evidence Evaluation |
| 2.4 | Transformation/payoff | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 3.1 | Sensory detail calibration | The Legendary Copywriter | Dr. Richard Stern -- Skeptical Academic |
| 3.2 | Suspense/pacing optimization | Jake Torres -- Viral Content Architect | The Legendary Copywriter |
| 3.3 | Proof integration validation | Dr. Alena Vasquez -- Evidence Evaluation | The Legendary Copywriter |
| 3.4 | Carlton compliance check | The Legendary Copywriter | Sarah A. Conco -- Client Protection |
| 4.1 | Story function validation | Alex Rivera -- Strategic Integration | The Legendary Copywriter |
| 4.2 | Mechanism-story alignment | Dr. James Liu -- Research Director | Alex Rivera -- Strategic Integration |
| 4.3 | Anti-slop validation | Sarah A. Conco -- Client Protection | Dr. Richard Stern -- Skeptical Academic |
| 4.4 | Vault pattern comparison | Sarah Chen -- Competitive Intelligence | Marcus Webster -- Pattern Synthesis |
| 4.5 | Final assembly | Alex Rivera -- Strategic Integration | Dr. James Liu -- Research Director |

Reference: `CopywritingEngine/PERSONA-SYSTEM.md`

---

## 2. Quality Threshold Constraints

### Threshold Application

| Output Type | Threshold Level | Minimum Score | Evidence Required |
|-------------|-----------------|---------------|-------------------|
| Upstream loading | STANDARD | 70% completeness | count: required fields present |
| Story type classification | ELEVATED | 85% alignment | match: vault pattern + niche fit documented |
| Story beat mapping | CRITICAL | 95% accuracy | match: beats follow classified type format |
| Character architecture | ELEVATED | 85% quality | match: protagonist mirrors prospect or serves as authority |
| Emotional arc design | CRITICAL | 95% quality | trace: progression stages documented, ends at belief/desire |
| Setup/context building | ELEVATED | 85% quality | match: stakes established, no over-explanation |
| Discovery/experiment sequence | CRITICAL | 95% quality | count: minimum 2 tension points, suspense devices identified |
| Mechanism revelation | CRITICAL | 95% naturalness | match: emerges from narrative, mechanism named |
| Transformation/payoff | CRITICAL | 95% quality | match: emotional proof with specific results, segue present |
| Sensory detail calibration | ELEVATED | 85% calibration | match: immersive without straining believability |
| Carlton compliance | CRITICAL | 100% compliance | count: all 9 Carlton principles applied |
| Anti-slop | CRITICAL | 100% pass | count: violations = 0 |
| Final story-package | CRITICAL | 95% integrity | score: overall >= 7.0, full_story_text populated |

### Validation Score Thresholds

| Dimension | Minimum | Good | Excellent |
|-----------|---------|------|-----------|
| Story function | 7.0 | 8.0 | 9.0+ |
| Mechanism alignment | 7.0 | 8.0 | 9.0+ |
| Emotional arc quality | 7.0 | 8.0 | 9.0+ |
| Suspense/pacing | 7.0 | 8.0 | 9.0+ |
| Sensory immersion | 7.0 | 8.0 | 9.0+ |
| Proof integration | 7.0 | 8.0 | 9.0+ |
| Vault comparison | 6.0 | 7.0 | 8.0+ |
| Overall weighted average | 7.0 | 8.0 | 9.0+ |

---

## 3. Feedback Bus

### Upstream Dependencies

| Upstream Skill | Trigger Condition | Request Payload |
|----------------|-------------------|-----------------|
| 04-mechanism | Mechanism doesn't translate into natural story revelation | `{ skill: "04-mechanism", request: "narrative_accessibility", issue: string }` |
| 03-root-cause | Root cause doesn't create counter-intuitive story moment | `{ skill: "03-root-cause", request: "narrative_surprise", current: string }` |
| 02-proof-inventory | Insufficient proof elements for natural story integration | `{ skill: "02-proof-inventory", request: "narrative_proof", type: string }` |
| 11-lead | Lead's story tease doesn't match story being built | `{ skill: "11-lead", request: "tease_alignment", issue: string }` |
| 05-promise | Promise too abstract for concrete story payoff | `{ skill: "05-promise", request: "concrete_result", current: string }` |

### Downstream Skills

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| Body copy | story-package.json assembled | Uses `downstream_handoffs.for_body_copy` |
| Campaign argument | story-package.json assembled | Uses `downstream_handoffs.for_campaign_argument` |
| Close | story-package.json assembled | Uses `downstream_handoffs.for_close` |

### Feedback Schemas

```yaml
feedback_request:
  requesting_skill: "12-story"
  requesting_layer: string
  requesting_microskill: string
  target_skill: string
  request_type: enum[narrative_accessibility, narrative_surprise, narrative_proof, tease_alignment, concrete_result]
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
      root_cause_loaded: boolean
      proof_loaded: boolean
      lead_loaded: boolean
      all_required_present: boolean
  teachings:
    claim: "Teaching index complete"
    evidence_type: count
    evidence:
      carlton_principles_indexed: boolean
      discovery_formats_indexed: boolean
      makepeace_pattern_indexed: boolean
      georgi_integration_indexed: boolean
      all_complete: boolean
```

### Layer 1 Gate Evidence

```yaml
layer_1_gate_evidence:
  story_type:
    claim: "Story type classified with vault reference"
    evidence_type: match
    evidence:
      selected_type: string
      vault_reference: string
      niche_alignment: boolean
      assets_support_type: boolean
  story_beats:
    claim: "Story beats mapped to classified type format"
    evidence_type: match
    evidence:
      beat_count: integer
      format_match: boolean
      sequence_logical: boolean
  character:
    claim: "Protagonist designed with prospect-mirroring elements"
    evidence_type: match
    evidence:
      protagonist_name: string
      mirror_elements_count: integer
      vulnerability_present: boolean
      credibility_present: boolean
  emotional_arc:
    claim: "Emotional arc ends at belief/desire"
    evidence_type: trace
    evidence:
      starting_state: string
      ending_state: string
      progression_stage_count: integer
      ends_at_belief: boolean
```

### Layer 2 Gate Evidence

```yaml
layer_2_gate_evidence:
  setup:
    claim: "Setup establishes context and stakes without over-explaining"
    evidence_type: match
    evidence:
      stakes_established: boolean
      over_explains: boolean  # must be false
      word_count: integer
  discovery_sequence:
    claim: "Discovery sequence builds suspense with tension points"
    evidence_type: count
    evidence:
      tension_point_count: integer  # minimum 2
      suspense_devices: [string]
      sequence_type_matches_classification: boolean
  mechanism_revelation:
    claim: "Mechanism revelation emerges naturally from narrative"
    evidence_type: match
    evidence:
      feels_natural: boolean  # must be true
      mechanism_named: boolean
      connects_to_root_cause: boolean
  transformation_payoff:
    claim: "Transformation delivers emotional proof with specific results"
    evidence_type: match
    evidence:
      emotional_proof_delivered: boolean
      results_specific: boolean
      segue_to_reader_present: boolean
```

### Layer 3 Gate Evidence

```yaml
layer_3_gate_evidence:
  sensory_details:
    claim: "Sensory details calibrated for immersion"
    evidence_type: match
    evidence:
      immersive: boolean
      believable: boolean
      not_excessive: boolean
  suspense_pacing:
    claim: "Suspense and pacing optimized"
    evidence_type: count
    evidence:
      tension_points: integer
      no_flat_stretches: boolean
      pacing_score: float
  proof_integration:
    claim: "Proof woven naturally into narrative"
    evidence_type: match
    evidence:
      proof_elements_count: integer
      all_natural: boolean  # none bolted on
      source_identified: boolean
  carlton:
    claim: "Carlton compliance verified"
    evidence_type: count
    evidence:
      three_line_structure: boolean
      transporting: boolean
      breathless_prose: boolean
      excess_trimmed: boolean
      means_for_you: boolean
      about_reader: boolean
      conversational: boolean
      empathy: boolean
      reader_feels: boolean
      all_nine_pass: boolean
```

### Layer 4 Gate Evidence

```yaml
layer_4_gate_evidence:
  story_function:
    claim: "Story achieves its persuasion function"
    evidence_type: score
    evidence:
      persuasion_function: string
      function_score: float
      prospect_believes_mechanism: boolean
  mechanism_alignment:
    claim: "Story properly supports the mechanism"
    evidence_type: match
    evidence:
      mechanism_named_in_story: boolean
      story_proves_mechanism: boolean
      alignment_score: float
  anti_slop:
    claim: "Zero generic or cliched elements"
    evidence_type: count
    evidence:
      violations: integer  # must be 0
      pass: boolean
  vault_comparison:
    claim: "Story compared to elite patterns with differentiation"
    evidence_type: match
    evidence:
      patterns_compared: integer
      differentiation_documented: boolean
      comparison_score: float
  assembly:
    claim: "Story-package.json complete and valid"
    evidence_type: count
    evidence:
      all_sections_populated: boolean
      full_story_text_present: boolean
      overall_score: float
      above_minimum: boolean
```

---

## 5. Continuous Learning Log

### Log Location

`12-story/outputs/story-learning-log.json`

### What Gets Logged

```yaml
run_entry:
  run_id: string
  timestamp: string
  niche: string
  sub_niche: string
  story_type: string
  story_format: string
  protagonist_type: string
  beat_count: integer
  word_count: integer
  carlton_compliance: boolean
  gate_results:
    layer_0: enum[pass, fail]
    layer_1: enum[pass, fail]
    layer_2: enum[pass, fail]
    layer_3: enum[pass, fail]
    layer_4: enum[pass, fail]
  validation_scores:
    story_function: float
    mechanism_alignment: float
    emotional_arc_quality: float
    suspense_pacing: float
    sensory_immersion: float
    proof_integration: float
    overall_weighted_average: float
  feedback_requests: [object]
  failure_log: [object]

story_type_pattern_entry:
  niche: string
  story_type_selected: string
  story_format: string
  protagonist_type: string
  effectiveness_score: float
  word_count: integer
  notes: string
```

### Manager Responsibility

- Log every run automatically upon completion
- Track story type effectiveness across niches
- Track protagonist type performance patterns
- Track discovery format vs. proof story format effectiveness
- Surface recurring Carlton violations for microskill improvement
- Track which Makepeace proof story elements produce highest engagement scores

---

## 6. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-27 | Initial architecture extension: full persona deployment, 13-row quality threshold table, feedback bus for 5 upstream skills, verification evidence for all 5 gates, continuous learning log with story type tracking |
