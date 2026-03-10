# ARCHITECTURE-EXTENSION.md

> **Version:** 1.0
> **Extends:** `14-mechanism-narrative/MECHANISM-NARRATIVE-AGENT.md`
> **Source:** `~brain/documentation/PERSONA-SYSTEM.md`

---

## 1. Manager Agent Architecture

### Execution Model

```
                    USER REQUEST
                         |
                         v
              +---------------------+
              |  MECHANISM          |
              |  NARRATIVE AGENT    |
              |  (State Machine)    |
              |                     |
              |  * Parse upstream   |
              |  * Human checkpoint |
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
| 0.1 | Upstream loading | Dr. James Liu -- Research Director | -- |
| 0.2 | TIER1 intelligence loading | Sarah Chen -- Competitive Intelligence | Marcus Webster -- Pattern Synthesis |
| 0.3 | Input validation | Dr. James Liu -- Research Director | Sarah A. Conco -- Client Protection |
| 0.4 | Human checkpoint curation | Alex Rivera -- Strategic Integration | Dr. James Liu -- Research Director |
| 1.1 | Narrative type classification | Sarah Chen -- Competitive Intelligence | Marcus Webster -- Pattern Synthesis |
| 1.2 | Framing pattern selection | Marcus Webster -- Pattern Synthesis | The Legendary Copywriter |
| 1.3 | Emotional arc design | The Legendary Copywriter | Marcus Webster -- Pattern Synthesis |
| 1.4 | Explanation sequence mapping | Alex Rivera -- Strategic Integration | The Legendary Copywriter |
| 2.1 | Problem amplification writing | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 2.2 | Mechanism naming/reveal writing | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 2.3 | Mechanism explanation writing | The Legendary Copywriter | Dr. Alena Vasquez -- Evidence Evaluation |
| 2.4 | Mechanism proof integration | Dr. Alena Vasquez -- Evidence Evaluation | The Legendary Copywriter |
| 3.1 | Simplification calibration | Marcus Webster -- Pattern Synthesis | The Legendary Copywriter |
| 3.2 | Villain-mechanism pairing | The Legendary Copywriter | Sarah Chen -- Competitive Intelligence |
| 3.3 | Product bridge construction | Alex Rivera -- Strategic Integration | The Legendary Copywriter |
| 3.4 | Narrative flow polish | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 4.1 | E-level alignment check | Sarah Chen -- Competitive Intelligence | Dr. Richard Stern -- Skeptical Academic |
| 4.2 | Anti-slop validation | Sarah A. Conco -- Client Protection | Dr. Richard Stern -- Skeptical Academic |
| 4.3 | Vault pattern comparison | Sarah Chen -- Competitive Intelligence | Marcus Webster -- Pattern Synthesis |
| 4.4 | Final narrative assembly | Alex Rivera -- Strategic Integration | Dr. James Liu -- Research Director |

Reference: `~brain/documentation/PERSONA-SYSTEM.md`

---

## 2. Quality Threshold Constraints

### Threshold Application

| Output Type | Threshold Level | Minimum Score | Evidence Required |
|-------------|-----------------|---------------|-------------------|
| Upstream loading | STANDARD | 70% completeness | count: required packages present |
| TIER1 intelligence loading | STANDARD | 70% completeness | count: all 11 intelligence parts indexed |
| Input validation | ELEVATED | 85% completeness | match: mechanism winner complete, root cause handoff present |
| Human checkpoint | CRITICAL | 100% confirmation | match: human response received and processed |
| Narrative type classification | ELEVATED | 85% alignment | match: type matches E-level + niche from decision matrix |
| Framing pattern selection | ELEVATED | 85% alignment | match: frame matches mechanism characteristics |
| Emotional arc design | CRITICAL | 95% quality | trace: continues from root cause handoff state, all phase targets defined |
| Explanation sequence mapping | CRITICAL | 95% accuracy | match: phases follow 5-phase universal sequence, simplification assigned |
| Problem amplification draft | ELEVATED | 85% quality | match: problem escalated beyond root cause, mechanism need established |
| Mechanism naming/reveal draft | CRITICAL | 95% quality | match: name introduced with drama, naming architecture followed |
| Mechanism explanation draft | CRITICAL | 95% quality | match: metaphor anchor + detail layer + "think about it" present |
| Mechanism proof integration | CRITICAL | 95% quality | count: minimum 3 proof elements integrated, strategy followed |
| Simplification calibration | CRITICAL | 95% quality | match: 12-year-old comprehension test passes, not dumbed down |
| Villain-mechanism pairing | ELEVATED | 85% coherence | match: pairing architecture used, villain from root cause |
| Product bridge construction | CRITICAL | 95% quality | match: bridge connects to Skill 13, appropriate type used |
| Narrative flow polish | ELEVATED | 85% smoothness | match: no jarring transitions, emotional arc continuous |
| E-level alignment check | CRITICAL | 100% compliance | match: narrative matches E-level strategy requirements |
| Anti-slop | CRITICAL | 100% pass | count: violations = 0 |
| Final narrative package | CRITICAL | 95% integrity | score: overall >= 7.0, full_narrative_text populated |

### Validation Score Thresholds

| Dimension | Minimum | Good | Excellent |
|-----------|---------|------|-----------|
| Narrative clarity | 7.0 | 8.0 | 9.0+ |
| Mechanism graspability | 7.0 | 8.0 | 9.0+ |
| Simplification quality | 7.0 | 8.0 | 9.0+ |
| Proof integration | 7.0 | 8.0 | 9.0+ |
| Emotional arc continuity | 7.0 | 8.0 | 9.0+ |
| Naming memorability | 7.0 | 8.0 | 9.0+ |
| Product bridge smoothness | 7.0 | 8.0 | 9.0+ |
| Vault pattern comparison | 6.0 | 7.0 | 8.0+ |
| Overall weighted average | 7.0 | 8.0 | 9.0+ |

---

## 3. Feedback Bus

### Upstream Dependencies

| Upstream Skill | Trigger Condition | Request Payload |
|----------------|-------------------|-----------------|
| 04-mechanism | Mechanism explanation doesn't simplify cleanly | `{ skill: "04-mechanism", request: "narrative_simplification", issue: string }` |
| 04-mechanism | Naming doesn't create dramatic reveal moment | `{ skill: "04-mechanism", request: "naming_drama", current_name: string }` |
| 13-root-cause-narrative | Root cause bridge doesn't connect to mechanism entry | `{ skill: "13-root-cause-narrative", request: "bridge_alignment", issue: string }` |
| 02-proof-inventory | Insufficient proof for selected integration strategy | `{ skill: "02-proof-inventory", request: "mechanism_proof_gap", strategy: string }` |
| 08-structure | Mechanism placement conflicts with explanation sequence | `{ skill: "08-structure", request: "mechanism_placement", conflict: string }` |

### Downstream Skills

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| 15-product-introduction | mechanism-narrative-package.json assembled | Uses `downstream_handoffs.for_product_introduction` |
| Body copy assembly | mechanism-narrative-package.json assembled | Uses `downstream_handoffs.for_body_copy` |
| 17-close | mechanism-narrative-package.json assembled | Uses `downstream_handoffs.for_close` |

### Feedback Schemas

```yaml
feedback_request:
  requesting_skill: "14-mechanism-narrative"
  requesting_layer: string
  requesting_microskill: string
  target_skill: string
  request_type: enum[narrative_simplification, naming_drama, bridge_alignment, mechanism_proof_gap, mechanism_placement]
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
      mechanism_package_loaded: boolean
      root_cause_narrative_loaded: boolean
      structure_package_loaded: boolean
      proof_inventory_loaded: boolean
      all_required_present: boolean
  tier1_intelligence:
    claim: "TIER1 mechanism narrative intelligence fully indexed"
    evidence_type: count
    evidence:
      narrative_types_indexed: boolean
      explanation_sequence_indexed: boolean
      framing_patterns_indexed: boolean
      proof_strategies_indexed: boolean
      naming_architectures_indexed: boolean
      simplification_techniques_indexed: boolean
      bridge_patterns_indexed: boolean
      emotional_arcs_indexed: boolean
      e_level_matrix_indexed: boolean
      villain_pairings_indexed: boolean
      cross_cutting_patterns_indexed: boolean
      all_11_parts_complete: boolean
  root_cause_handoff:
    claim: "Root cause narrative handoff integrated"
    evidence_type: match
    evidence:
      bridge_text_received: boolean
      villain_context_received: boolean
      emotional_state_received: boolean
  human_checkpoint:
    claim: "Human confirmed mechanism selection"
    evidence_type: match
    evidence:
      response_received: boolean
      response_type: enum[confirm, modify, switch, provide]
      confirmed_mechanism_valid: boolean
```

### Layer 1 Gate Evidence

```yaml
layer_1_gate_evidence:
  narrative_type:
    claim: "Narrative type classified with E-level alignment"
    evidence_type: match
    evidence:
      selected_type: string
      e_level: string
      decision_matrix_match: boolean
      niche_alignment: boolean
  framing_pattern:
    claim: "Framing patterns selected with mechanism fit"
    evidence_type: match
    evidence:
      primary_frame: string
      secondary_frame: string
      mechanism_characteristics_match: boolean
  emotional_arc:
    claim: "Emotional arc designed continuing from root cause"
    evidence_type: trace
    evidence:
      arc_type: string
      continues_from_state: string
      phase_count: integer
      all_targets_defined: boolean
  explanation_sequence:
    claim: "5-phase sequence mapped with simplification assignments"
    evidence_type: match
    evidence:
      phases_mapped: integer  # must be 5
      simplification_techniques_assigned: boolean
      word_counts_allocated: boolean
      structure_alignment_verified: boolean
```

### Layer 2 Gate Evidence

```yaml
layer_2_gate_evidence:
  problem_amplification:
    claim: "Problem amplification escalates beyond root cause"
    evidence_type: match
    evidence:
      problem_escalated: boolean
      mechanism_need_established: boolean
      word_count_in_range: boolean
  mechanism_naming:
    claim: "Mechanism named with dramatic reveal"
    evidence_type: match
    evidence:
      naming_architecture_followed: boolean
      drama_technique_used: boolean
      name_memorable: boolean
  mechanism_explanation:
    claim: "Mechanism explained with metaphor + detail + simplification"
    evidence_type: match
    evidence:
      metaphor_anchor_present: boolean
      escalating_detail_present: boolean
      think_about_it_present: boolean
      word_count_in_range: boolean
  proof_integration:
    claim: "Proof elements integrated using selected strategy"
    evidence_type: count
    evidence:
      proof_elements_count: integer  # minimum 3
      strategy_followed: boolean
      integration_organic: boolean
```

### Layer 3 Gate Evidence

```yaml
layer_3_gate_evidence:
  simplification:
    claim: "Simplification calibrated for target audience"
    evidence_type: match
    evidence:
      twelve_year_old_test_passes: boolean
      not_dumbed_down: boolean
      techniques_applied: [string]
  villain_pairing:
    claim: "Villain-mechanism pairing coherent"
    evidence_type: match
    evidence:
      pairing_architecture: string
      villain_from_root_cause: boolean
      pairing_coherent: boolean
  product_bridge:
    claim: "Product bridge connects to Skill 13"
    evidence_type: match
    evidence:
      bridge_type: string
      skill_13_entry_clear: boolean
      emotional_state_handed_off: boolean
  narrative_flow:
    claim: "Narrative flows without jarring transitions"
    evidence_type: match
    evidence:
      emotional_arc_continuous: boolean
      aha_moment_placed: boolean
      no_jarring_transitions: boolean
```

### Layer 4 Gate Evidence

```yaml
layer_4_gate_evidence:
  e_level_alignment:
    claim: "Narrative matches E-level strategy"
    evidence_type: match
    evidence:
      expected_strategy: string
      actual_strategy: string
      aligned: boolean
  anti_slop:
    claim: "Zero generic or cliched elements"
    evidence_type: count
    evidence:
      violations: integer  # must be 0
      pass: boolean
  vault_comparison:
    claim: "Narrative compared to elite mechanism patterns"
    evidence_type: match
    evidence:
      patterns_compared: integer
      differentiation_documented: boolean
      comparison_score: float
  assembly:
    claim: "mechanism-narrative-package.json complete and valid"
    evidence_type: count
    evidence:
      all_sections_populated: boolean
      full_narrative_text_present: boolean
      product_bridge_present: boolean
      downstream_handoffs_present: boolean
      overall_score: float
      above_minimum: boolean
```

---

## 5. Continuous Learning Log

### Log Location

`14-mechanism-narrative/outputs/narrative-learning-log.json`

### What Gets Logged

```yaml
run_entry:
  run_id: string
  timestamp: string
  niche: string
  sub_niche: string
  mechanism_name: string
  e_level: string
  narrative_type: string
  framing_patterns: [string]
  emotional_arc: string
  simplification_techniques: [string]
  naming_architecture: string
  bridge_type: string
  villain_mechanism_pairing: string
  word_count: integer
  human_checkpoint_response: string
  gate_results:
    layer_0: enum[pass, fail]
    layer_1: enum[pass, fail]
    layer_2: enum[pass, fail]
    layer_3: enum[pass, fail]
    layer_4: enum[pass, fail]
  validation_scores:
    narrative_clarity: float
    mechanism_graspability: float
    simplification_quality: float
    proof_integration: float
    emotional_arc_continuity: float
    naming_memorability: float
    product_bridge_smoothness: float
    overall_weighted_average: float
  feedback_requests: [object]
  failure_log: [object]

narrative_type_pattern_entry:
  niche: string
  e_level: string
  narrative_type_selected: string
  effectiveness_score: float
  word_count: integer
  notes: string
```

### Manager Responsibility

- Log every run automatically upon completion
- Track narrative type effectiveness by E-level and niche
- Track simplification technique combinations for highest graspability
- Track naming architecture memorability across niches
- Track villain-mechanism pairing coherence scores
- Track product bridge smoothness by bridge type
- Surface recurring E-level alignment issues for classification improvement
- Track human checkpoint modification patterns

---

## 6. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-27 | Initial architecture extension: full persona deployment, 19-row quality threshold table, feedback bus for 5 upstream skills, verification evidence for all 5 gates, continuous learning log with E-level tracking |
