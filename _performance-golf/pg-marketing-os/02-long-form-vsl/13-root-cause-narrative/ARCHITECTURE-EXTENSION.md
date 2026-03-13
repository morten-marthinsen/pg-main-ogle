# ARCHITECTURE-EXTENSION.md

> **Version:** 1.0
> **Extends:** `13-root-cause-narrative/ROOT-CAUSE-NARRATIVE-AGENT.md`
> **Source:** `~brain/documentation/PERSONA-SYSTEM.md`

---

## 1. Manager Agent Architecture

### Execution Model

```
                    USER REQUEST
                         |
                         v
              +---------------------+
              |  ROOT CAUSE         |
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
| 1.1 | Communication type classification | Sarah Chen -- Competitive Intelligence | Marcus Webster -- Pattern Synthesis |
| 1.2 | Framing pattern selection | Marcus Webster -- Pattern Synthesis | The Legendary Copywriter |
| 1.3 | Emotional arc design | The Legendary Copywriter | Marcus Webster -- Pattern Synthesis |
| 1.4 | Narrative sequence mapping | Alex Rivera -- Strategic Integration | The Legendary Copywriter |
| 2.1 | Problem agitation / false belief writing | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 2.2 | Root cause revelation writing | The Legendary Copywriter | Dr. Alena Vasquez -- Evidence Evaluation |
| 2.3 | Failure explanation / villain writing | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 2.4 | Countersell / mechanism bridge writing | The Legendary Copywriter | Alex Rivera -- Strategic Integration |
| 3.1 | Evidence integration calibration | Dr. Alena Vasquez -- Evidence Evaluation | The Legendary Copywriter |
| 3.2 | Reframe stacking optimization | Marcus Webster -- Pattern Synthesis | The Legendary Copywriter |
| 3.3 | Transition flow polish | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 3.4 | Threading guide generation | Alex Rivera -- Strategic Integration | Marcus Webster -- Pattern Synthesis |
| 4.1 | Critical rules checking | Sarah A. Conco -- Client Protection | Dr. Richard Stern -- Skeptical Academic |
| 4.2 | Anti-slop validation | Sarah A. Conco -- Client Protection | Dr. Richard Stern -- Skeptical Academic |
| 4.3 | Vault pattern comparison | Sarah Chen -- Competitive Intelligence | Marcus Webster -- Pattern Synthesis |
| 4.4 | Final narrative assembly | Alex Rivera -- Strategic Integration | Dr. James Liu -- Research Director |

Reference: `~brain/documentation/PERSONA-SYSTEM.md`

---

## 2. Quality Threshold Constraints

### Threshold Application

| Output Type | Threshold Level | Minimum Score | Evidence Required |
|-------------|-----------------|---------------|-------------------|
| Upstream loading | STANDARD | 70% completeness | count: required fields present |
| TIER1 intelligence loading | STANDARD | 70% completeness | count: all 12 intelligence parts indexed |
| Input validation | ELEVATED | 85% completeness | match: three-part structure complete, villain identified |
| Human checkpoint | CRITICAL | 100% confirmation | match: human response received and processed |
| Communication type classification | ELEVATED | 85% alignment | match: type matches niche + sophistication level |
| Framing pattern selection | ELEVATED | 85% alignment | match: frame matches evidence available |
| Emotional arc design | CRITICAL | 95% quality | trace: all phase targets defined, arc ends at desired state |
| Narrative sequence mapping | CRITICAL | 95% accuracy | match: phases follow 7-phase universal sequence |
| Problem agitation draft | ELEVATED | 85% quality | match: symptoms named, reader feels understood |
| Root cause revelation draft | CRITICAL | 95% quality | match: three-part structure delivered, counter-intuitive element present |
| Failure explanation draft | CRITICAL | 95% quality | match: all past failures explained, blame externalized |
| Countersell/bridge draft | CRITICAL | 95% quality | count: minimum 2 countersells, mechanism bridge present |
| Evidence integration | ELEVATED | 85% naturalness | match: evidence woven organically, not bolted on |
| Reframe stacking | CRITICAL | 95% quality | count: minimum 2 reframes stacked |
| Transition polish | ELEVATED | 85% smoothness | match: all transitions use TIER1 patterns |
| Threading guide | CRITICAL | 95% completeness | match: anchor phrase + repetition points + placement |
| Critical rules check | CRITICAL | 100% compliance | count: all 10 rules pass |
| Anti-slop | CRITICAL | 100% pass | count: violations = 0 |
| Final narrative package | CRITICAL | 95% integrity | score: overall >= 7.0, full_narrative_text populated |

### Validation Score Thresholds

| Dimension | Minimum | Good | Excellent |
|-----------|---------|------|-----------|
| Narrative persuasion | 7.0 | 8.0 | 9.0+ |
| Three-part clarity | 7.0 | 8.0 | 9.0+ |
| Emotional arc execution | 7.0 | 8.0 | 9.0+ |
| Evidence integration | 7.0 | 8.0 | 9.0+ |
| Countersell effectiveness | 7.0 | 8.0 | 9.0+ |
| Threading completeness | 7.0 | 8.0 | 9.0+ |
| Vault pattern comparison | 6.0 | 7.0 | 8.0+ |
| Overall weighted average | 7.0 | 8.0 | 9.0+ |

---

## 3. Feedback Bus

### Upstream Dependencies

| Upstream Skill | Trigger Condition | Request Payload |
|----------------|-------------------|-----------------|
| 03-root-cause | Three-part structure too abstract for compelling narrative | `{ skill: "03-root-cause", request: "narrative_concreteness", issue: string }` |
| 03-root-cause | Expression method doesn't map to available communication type | `{ skill: "03-root-cause", request: "expression_realignment", current: string, needed: string }` |
| 02-proof-inventory | Insufficient evidence for selected communication type | `{ skill: "02-proof-inventory", request: "evidence_gap", type: string, needed: string }` |
| 08-structure | Root cause placement conflicts with CPB structure | `{ skill: "08-structure", request: "placement_adjustment", conflict: string }` |
| 01-research | Villain data insufficient for deep dive section | `{ skill: "01-research", request: "villain_intelligence", niche: string }` |

### Downstream Skills

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| 14-mechanism-narrative | root-cause-narrative-package.json assembled | Uses `downstream_handoffs.for_mechanism_narrative` |
| Body copy assembly | root-cause-narrative-package.json assembled | Uses `downstream_handoffs.for_body_copy` + `threading_guide` |
| 17-close | root-cause-narrative-package.json assembled | Uses `downstream_handoffs.for_close` |

### Feedback Schemas

```yaml
feedback_request:
  requesting_skill: "13-root-cause-narrative"
  requesting_layer: string
  requesting_microskill: string
  target_skill: string
  request_type: enum[narrative_concreteness, expression_realignment, evidence_gap, placement_adjustment, villain_intelligence]
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
      root_cause_package_loaded: boolean
      structure_package_loaded: boolean
      proof_inventory_loaded: boolean
      all_required_present: boolean
  tier1_intelligence:
    claim: "TIER1 narrative intelligence fully indexed"
    evidence_type: count
    evidence:
      three_part_structure_indexed: boolean
      communication_types_indexed: boolean
      narrative_sequences_indexed: boolean
      framing_patterns_indexed: boolean
      evidence_patterns_indexed: boolean
      emotional_arcs_indexed: boolean
      countersell_patterns_indexed: boolean
      reframe_taxonomy_indexed: boolean
      critical_rules_indexed: boolean
      cross_vertical_patterns_indexed: boolean
      transition_patterns_indexed: boolean
      emphasis_placement_indexed: boolean
      all_12_parts_complete: boolean
  human_checkpoint:
    claim: "Human confirmed root cause selection"
    evidence_type: match
    evidence:
      response_received: boolean
      response_type: enum[confirm, modify, switch, provide]
      confirmed_three_part_valid: boolean
```

### Layer 1 Gate Evidence

```yaml
layer_1_gate_evidence:
  communication_type:
    claim: "Communication type classified with niche alignment"
    evidence_type: match
    evidence:
      selected_type: string
      niche_alignment: boolean
      sophistication_match: boolean
      vault_reference: string
  framing_pattern:
    claim: "Framing patterns selected with evidence requirements"
    evidence_type: match
    evidence:
      primary_frame: string
      secondary_frame: string
      evidence_requirements_identified: boolean
  emotional_arc:
    claim: "Emotional arc designed with phase targets"
    evidence_type: trace
    evidence:
      arc_type: string
      phase_count: integer
      ending_state: string
      all_targets_defined: boolean
  narrative_sequence:
    claim: "7-phase sequence mapped with word count allocations"
    evidence_type: match
    evidence:
      phases_mapped: integer  # must be 7
      word_counts_allocated: boolean
      format_variation_selected: boolean
      structure_alignment_verified: boolean
```

### Layer 2 Gate Evidence

```yaml
layer_2_gate_evidence:
  problem_agitation:
    claim: "Problem agitation and false belief installation drafted"
    evidence_type: match
    evidence:
      symptoms_named: boolean
      false_belief_articulated: boolean
      reader_feels_understood: boolean
      word_count_in_range: boolean
  root_cause_revelation:
    claim: "Authority bridge and root cause reveal drafted"
    evidence_type: match
    evidence:
      authority_established_before_reveal: boolean
      three_part_delivered: boolean
      counter_intuitive_element_present: boolean
      emotional_target_hit: boolean
  failure_explanation:
    claim: "Failure explanation and villain deep dive drafted"
    evidence_type: match
    evidence:
      all_failures_explained: boolean
      blame_externalized: boolean
      villain_named: boolean
      motive_established: boolean
  countersell_bridge:
    claim: "Countersells integrated and mechanism bridge drafted"
    evidence_type: count
    evidence:
      countersell_count: integer  # minimum 2
      mechanism_bridge_present: boolean
      bridge_connects_to_skill_12: boolean
```

### Layer 3 Gate Evidence

```yaml
layer_3_gate_evidence:
  evidence_integration:
    claim: "Evidence woven naturally into narrative"
    evidence_type: match
    evidence:
      patterns_used_count: integer
      all_organic: boolean  # not bolted on
      specific_evidence_cited: boolean
  reframe_stacking:
    claim: "Multiple reframe techniques stacked"
    evidence_type: count
    evidence:
      reframe_count: integer  # minimum 2
      stack_coherent: boolean
      worldview_shift_achieved: boolean
  transition_flow:
    claim: "All transitions polished with TIER1 patterns"
    evidence_type: match
    evidence:
      entry_transitions_polished: boolean
      exit_transitions_polished: boolean
      inter_phase_transitions_smooth: boolean
  threading_guide:
    claim: "Threading guide complete for downstream skills"
    evidence_type: match
    evidence:
      anchor_phrase_defined: boolean
      repetition_points_mapped: boolean
      emphasis_level_set: boolean
      placement_pattern_defined: boolean
```

### Layer 4 Gate Evidence

```yaml
layer_4_gate_evidence:
  critical_rules:
    claim: "All 10 critical rules pass"
    evidence_type: count
    evidence:
      rule_1_external: boolean
      rule_2_explains_failures: boolean
      rule_3_more_specific: boolean
      rule_4_path_to_solution: boolean
      rule_5_villain_paired: boolean
      rule_6_counter_intuitive: boolean
      rule_7_woven_throughout: boolean
      rule_8_anchor_phrase: boolean
      rule_9_authority_first: boolean
      rule_10_kills_competitors: boolean
      all_ten_pass: boolean
  anti_slop:
    claim: "Zero generic or cliched elements"
    evidence_type: count
    evidence:
      violations: integer  # must be 0
      pass: boolean
  vault_comparison:
    claim: "Narrative compared to elite root cause patterns"
    evidence_type: match
    evidence:
      patterns_compared: integer
      differentiation_documented: boolean
      comparison_score: float
  assembly:
    claim: "root-cause-narrative-package.json complete and valid"
    evidence_type: count
    evidence:
      all_sections_populated: boolean
      full_narrative_text_present: boolean
      threading_guide_complete: boolean
      downstream_handoffs_present: boolean
      overall_score: float
      above_minimum: boolean
```

---

## 5. Continuous Learning Log

### Log Location

`13-root-cause-narrative/outputs/narrative-learning-log.json`

### What Gets Logged

```yaml
run_entry:
  run_id: string
  timestamp: string
  niche: string
  sub_niche: string
  communication_type: string
  framing_patterns: [string]
  emotional_arc: string
  reframe_stack_depth: integer
  evidence_patterns_used: [string]
  countersell_count: integer
  anchor_phrase: string
  word_count: integer
  human_checkpoint_response: string
  gate_results:
    layer_0: enum[pass, fail]
    layer_1: enum[pass, fail]
    layer_2: enum[pass, fail]
    layer_3: enum[pass, fail]
    layer_4: enum[pass, fail]
  validation_scores:
    narrative_persuasion: float
    three_part_clarity: float
    emotional_arc_execution: float
    evidence_integration: float
    countersell_effectiveness: float
    threading_completeness: float
    overall_weighted_average: float
  critical_rules_violations: [string]
  feedback_requests: [object]
  failure_log: [object]

communication_type_pattern_entry:
  niche: string
  communication_type_selected: string
  framing_patterns: [string]
  emotional_arc: string
  effectiveness_score: float
  word_count: integer
  notes: string
```

### Manager Responsibility

- Log every run automatically upon completion
- Track communication type effectiveness across niches
- Track framing pattern combinations that produce highest persuasion scores
- Track evidence pattern naturalness ratings
- Track reframe stack combinations for optimal worldview shift
- Surface recurring critical rule violations for microskill improvement
- Track human checkpoint modification frequency to improve default selections
- Track which anchor phrases produce highest threading completeness

---

## 6. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-27 | Initial architecture extension: full persona deployment, 19-row quality threshold table, feedback bus for 5 upstream skills, verification evidence for all 5 gates, continuous learning log with communication type tracking |
