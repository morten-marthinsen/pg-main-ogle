# ARCHITECTURE-EXTENSION.md

> **Version:** 1.0
> **Extends:** `15-product-introduction/PRODUCT-INTRODUCTION-AGENT.md`
> **Source:** `CopywritingEngine/PERSONA-SYSTEM.md`

---

## 1. Manager Agent Architecture

### Execution Model

```
                    USER REQUEST
                         |
                         v
              +---------------------+
              |  PRODUCT            |
              |  INTRODUCTION AGENT |
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
| 1.1 | Introduction type classification | Sarah Chen -- Competitive Intelligence | Marcus Webster -- Pattern Synthesis |
| 1.2 | Bridge architecture selection | Alex Rivera -- Strategic Integration | The Legendary Copywriter |
| 1.3 | Component reveal selection | Marcus Webster -- Pattern Synthesis | Dr. Alena Vasquez -- Evidence Evaluation |
| 1.4 | Price/value strategy mapping | Alex Rivera -- Strategic Integration | Marcus Webster -- Pattern Synthesis |
| 2.1 | Bridge moment writing | The Legendary Copywriter | Alex Rivera -- Strategic Integration |
| 2.2 | Product reveal writing | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 2.3 | Component reveal writing | The Legendary Copywriter | Dr. Alena Vasquez -- Evidence Evaluation |
| 2.4 | Value stack writing | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 3.1 | Price reveal construction | The Legendary Copywriter | Alex Rivera -- Strategic Integration |
| 3.2 | Guarantee/scarcity writing | The Legendary Copywriter | Sarah A. Conco -- Client Protection |
| 3.3 | Emotional architecture calibration | Marcus Webster -- Pattern Synthesis | The Legendary Copywriter |
| 3.4 | Future pacing / close setup | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 4.1 | Master principles check | Sarah A. Conco -- Client Protection | Dr. Richard Stern -- Skeptical Academic |
| 4.2 | Anti-slop validation | Sarah A. Conco -- Client Protection | Dr. Richard Stern -- Skeptical Academic |
| 4.3 | Vault pattern comparison | Sarah Chen -- Competitive Intelligence | Marcus Webster -- Pattern Synthesis |
| 4.4 | Final introduction assembly | Alex Rivera -- Strategic Integration | Dr. James Liu -- Research Director |

Reference: `CopywritingEngine/PERSONA-SYSTEM.md`

---

## 2. Quality Threshold Constraints

### Threshold Application

| Output Type | Threshold Level | Minimum Score | Evidence Required |
|-------------|-----------------|---------------|-------------------|
| Upstream loading | STANDARD | 70% completeness | count: required packages present (offer may be partial) |
| TIER1 intelligence loading | STANDARD | 70% completeness | count: all 13 intelligence sections indexed |
| Input validation | ELEVATED | 85% completeness | match: minimum product data present, gaps identified |
| Human checkpoint | CRITICAL | 100% confirmation | match: human response received, minimum data confirmed |
| Introduction type classification | ELEVATED | 85% alignment | match: type matches format + niche |
| Bridge architecture selection | CRITICAL | 95% compatibility | match: bridge continues mechanism narrative naturally |
| Component reveal selection | ELEVATED | 85% match | match: pattern matches product type |
| Price/value strategy mapping | CRITICAL | 95% accuracy | match: all sub-architectures assigned |
| Bridge moment draft | CRITICAL | 95% quality | match: no pitch feeling, smooth transition |
| Product reveal draft | CRITICAL | 95% quality | match: name + positioning + uniqueness + credibility |
| Component reveal draft | CRITICAL | 95% quality | match: each component has proof package |
| Value stack draft | ELEVATED | 85% quality | count: all bonuses described with values |
| Price reveal construction | CRITICAL | 95% quality | match: anchor points + final price + per-day |
| Guarantee/scarcity writing | CRITICAL | 95% quality | match: guarantee named, scarcity justified |
| Emotional architecture | CRITICAL | 95% accuracy | trace: 13-step sequence followed |
| Future pacing / close setup | CRITICAL | 95% quality | match: positive/negative futures vivid, binary choice clear |
| Master principles check | CRITICAL | 100% compliance | count: all 8 principles pass |
| Anti-slop | CRITICAL | 100% pass | count: violations = 0 |
| Final introduction package | CRITICAL | 95% integrity | score: overall >= 7.0, full text populated |

### Validation Score Thresholds

| Dimension | Minimum | Good | Excellent |
|-----------|---------|------|-----------|
| Bridge smoothness | 7.0 | 8.0 | 9.0+ |
| Product reveal impact | 7.0 | 8.0 | 9.0+ |
| Component proof quality | 7.0 | 8.0 | 9.0+ |
| Value stack effectiveness | 7.0 | 8.0 | 9.0+ |
| Price psychology | 7.0 | 8.0 | 9.0+ |
| Guarantee strength | 7.0 | 8.0 | 9.0+ |
| Scarcity credibility | 7.0 | 8.0 | 9.0+ |
| Emotional architecture | 7.0 | 8.0 | 9.0+ |
| Vault pattern comparison | 6.0 | 7.0 | 8.0+ |
| Overall weighted average | 7.0 | 8.0 | 9.0+ |

---

## 3. Feedback Bus

### Upstream Dependencies

| Upstream Skill | Trigger Condition | Request Payload |
|----------------|-------------------|-----------------|
| 07-offer | Offer package incomplete | `{ skill: "07-offer", request: "offer_completion", missing: [string] }` |
| 07-offer | Guarantee too weak for promise | `{ skill: "07-offer", request: "guarantee_strengthening", current: string }` |
| 14-mechanism-narrative | Product bridge doesn't connect | `{ skill: "14-mechanism-narrative", request: "bridge_alignment", issue: string }` |
| 04-mechanism | Mechanism name doesn't flow to product naming | `{ skill: "04-mechanism", request: "naming_alignment", issue: string }` |
| 08-structure | Product placement conflicts with SIN segue | `{ skill: "08-structure", request: "sin_segue_adjustment", conflict: string }` |

### Downstream Skills

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| 17-close | product-introduction-package.json assembled | Uses `downstream_handoffs.for_close` |
| Campaign assembly | product-introduction-package.json assembled | Uses `downstream_handoffs.for_campaign_assembly` |

### Feedback Schemas

```yaml
feedback_request:
  requesting_skill: "15-product-introduction"
  requesting_layer: string
  requesting_microskill: string
  target_skill: string
  request_type: enum[offer_completion, guarantee_strengthening, bridge_alignment, naming_alignment, sin_segue_adjustment]
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
      offer_package_loaded: boolean
      offer_package_complete: boolean  # false triggers PARTIAL checkpoint default
      mechanism_narrative_loaded: boolean
      mechanism_package_loaded: boolean
      structure_package_loaded: boolean
      proof_inventory_loaded: boolean
      all_required_present: boolean
  tier1_intelligence:
    claim: "TIER1 product introduction intelligence fully indexed"
    evidence_type: count
    evidence:
      introduction_types_indexed: boolean
      sequence_indexed: boolean
      bridge_architectures_indexed: boolean
      component_patterns_indexed: boolean
      value_stacking_indexed: boolean
      bonus_patterns_indexed: boolean
      price_architectures_indexed: boolean
      scarcity_architectures_indexed: boolean
      guarantee_patterns_indexed: boolean
      emotional_architecture_indexed: boolean
      master_principles_indexed: boolean
      transition_catalog_indexed: boolean
      naming_timing_indexed: boolean
      all_13_sections_complete: boolean
  mechanism_handoff:
    claim: "Mechanism narrative handoff integrated"
    evidence_type: match
    evidence:
      bridge_text_received: boolean
      mechanism_name_received: boolean
      belief_level_received: boolean
      emotional_state_received: boolean
  human_checkpoint:
    claim: "Human confirmed product details"
    evidence_type: match
    evidence:
      response_received: boolean
      response_type: enum[confirm, modify, provide, partial]
      minimum_data_present: boolean
      product_name_confirmed: boolean
      price_confirmed: boolean
      guarantee_confirmed: boolean
```

### Layer 1 Gate Evidence

```yaml
layer_1_gate_evidence:
  introduction_type:
    claim: "Introduction type classified with format alignment"
    evidence_type: match
    evidence:
      selected_type: string
      format_match: boolean
      niche_alignment: boolean
  bridge_architecture:
    claim: "Bridge architecture compatible with mechanism handoff"
    evidence_type: match
    evidence:
      selected_bridge: string
      mechanism_handoff_compatible: boolean
      no_pitch_feeling: boolean
  component_reveal:
    claim: "Component reveal pattern matches product type"
    evidence_type: match
    evidence:
      selected_pattern: string
      product_type_match: boolean
  price_value_strategy:
    claim: "All price/value sub-architectures assigned"
    evidence_type: count
    evidence:
      price_reveal_architecture: boolean
      value_stacking_technique: boolean
      bonus_pattern: boolean
      guarantee_approach: boolean
      scarcity_type: boolean
      all_assigned: boolean
```

### Layer 2 Gate Evidence

```yaml
layer_2_gate_evidence:
  bridge_moment:
    claim: "Bridge moment transitions smoothly"
    evidence_type: match
    evidence:
      feels_like_pitch: boolean  # must be false
      continues_from_mechanism: boolean
      bridge_type_followed: boolean
      word_count_in_range: boolean
  product_reveal:
    claim: "Product revealed with positioning and uniqueness"
    evidence_type: match
    evidence:
      name_introduced: boolean
      positioning_delivered: boolean
      uniqueness_claimed: boolean
      credibility_present: boolean
  component_reveal:
    claim: "Components revealed with per-component proof"
    evidence_type: count
    evidence:
      components_revealed: integer
      each_has_proof: boolean
      pattern_followed: boolean
  value_stack:
    claim: "Value stack assembled with total"
    evidence_type: count
    evidence:
      bonuses_described: integer
      values_assigned: boolean
      total_value_stated: boolean
```

### Layer 3 Gate Evidence

```yaml
layer_3_gate_evidence:
  price_reveal:
    claim: "Price revealed through selected architecture"
    evidence_type: match
    evidence:
      anchor_points_present: boolean
      final_price_revealed: boolean
      per_day_breakdown: boolean
      architecture_followed: boolean
  guarantee_scarcity:
    claim: "Guarantee branded and scarcity justified"
    evidence_type: match
    evidence:
      guarantee_named: boolean
      guarantee_not_generic: boolean
      scarcity_justified: boolean
      scarcity_has_reason: boolean
  emotional_architecture:
    claim: "13-step emotional sequence followed"
    evidence_type: trace
    evidence:
      steps_followed: integer  # target: all applicable steps
      no_sequence_breaks: boolean
      emotional_flow_natural: boolean
  future_pacing:
    claim: "Future pacing vivid with binary choice"
    evidence_type: match
    evidence:
      positive_future_vivid: boolean
      negative_future_vivid: boolean
      binary_choice_clear: boolean
      close_handoff_ready: boolean
```

### Layer 4 Gate Evidence

```yaml
layer_4_gate_evidence:
  master_principles:
    claim: "All 8 master principles pass"
    evidence_type: count
    evidence:
      product_never_hero: boolean
      withholding_creates_value: boolean
      bridge_not_pitch: boolean
      components_are_proof: boolean
      value_before_price: boolean
      guarantee_named_branded: boolean
      scarcity_justified: boolean
      close_is_binary: boolean
      all_eight_pass: boolean
  anti_slop:
    claim: "Zero generic or cliched elements"
    evidence_type: count
    evidence:
      violations: integer  # must be 0
      pass: boolean
  vault_comparison:
    claim: "Introduction compared to elite product reveals"
    evidence_type: match
    evidence:
      patterns_compared: integer
      differentiation_documented: boolean
      comparison_score: float
  assembly:
    claim: "product-introduction-package.json complete and valid"
    evidence_type: count
    evidence:
      all_sections_populated: boolean
      full_narrative_text_present: boolean
      downstream_handoffs_present: boolean
      overall_score: float
      above_minimum: boolean
```

---

## 5. Continuous Learning Log

### Log Location

`15-product-introduction/outputs/introduction-learning-log.json`

### What Gets Logged

```yaml
run_entry:
  run_id: string
  timestamp: string
  niche: string
  sub_niche: string
  product_name: string
  product_format: string
  introduction_type: string
  bridge_architecture: string
  component_reveal_pattern: string
  price_reveal_architecture: string
  guarantee_type: string
  scarcity_type: string
  bonus_count: integer
  word_count: integer
  human_checkpoint_response: string
  offer_data_source: string
  gate_results:
    layer_0: enum[pass, fail]
    layer_1: enum[pass, fail]
    layer_2: enum[pass, fail]
    layer_3: enum[pass, fail]
    layer_4: enum[pass, fail]
  validation_scores:
    bridge_smoothness: float
    product_reveal_impact: float
    component_proof_quality: float
    value_stack_effectiveness: float
    price_psychology: float
    guarantee_strength: float
    scarcity_credibility: float
    emotional_architecture: float
    overall_weighted_average: float
  master_principle_violations: [string]
  feedback_requests: [object]
  failure_log: [object]

introduction_type_pattern_entry:
  niche: string
  product_format: string
  introduction_type_selected: string
  bridge_architecture: string
  effectiveness_score: float
  word_count: integer
  notes: string
```

### Manager Responsibility

- Log every run automatically upon completion
- Track introduction type effectiveness by product format and niche
- Track bridge architecture smoothness scores
- Track price reveal architecture effectiveness by niche
- Track guarantee type correlation with perceived strength scores
- Track scarcity credibility by justification type
- Track component reveal pattern effectiveness by product format
- Surface recurring master principle violations for microskill improvement
- Track human checkpoint data provision frequency (measure 07-offer maturity)

---

## 6. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-27 | Initial architecture extension: full persona deployment, 19-row quality threshold table, feedback bus for 5 upstream skills, verification evidence for all 5 gates, continuous learning log with bridge and price tracking |
