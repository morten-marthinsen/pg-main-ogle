# ARCHITECTURE-EXTENSION.md

> **Version:** 1.0
> **Extends:** `16-offer-copy/OFFER-COPY-AGENT.md`
> **Source:** `CopywritingEngine/PERSONA-SYSTEM.md`

---

## 1. Manager Agent Architecture

### Execution Model

```
                    USER REQUEST
                         |
                         v
              +---------------------+
              |  OFFER COPY         |
              |  AGENT              |
              |  (State Machine)    |
              |                     |
              |  * Parse upstream   |
              |  * Human checkpoint |
              |  * Classify format  |
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
| 0.2 | Source teaching + TIER1 loading | Sarah Chen -- Competitive Intelligence | Marcus Webster -- Pattern Synthesis |
| 0.3 | Input validation | Dr. James Liu -- Research Director | Sarah A. Conco -- Client Protection |
| 0.4 | Human checkpoint curation | Alex Rivera -- Strategic Integration | Dr. James Liu -- Research Director |
| 1.1 | Offer presentation classification | Sarah Chen -- Competitive Intelligence | Marcus Webster -- Pattern Synthesis |
| 1.2 | Deliverable sequence mapping | Marcus Webster -- Pattern Synthesis | Alex Rivera -- Strategic Integration |
| 1.3 | Value demonstration design | The Legendary Copywriter | Marcus Webster -- Pattern Synthesis |
| 1.4 | Price presentation planning | Alex Rivera -- Strategic Integration | Marcus Webster -- Pattern Synthesis |
| 2.1 | Deliverable stack writing | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 2.2 | Bonus presentation writing | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 2.3 | Value demonstration writing | The Legendary Copywriter | Alex Rivera -- Strategic Integration |
| 2.4 | Price/guarantee/CTA writing | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 3.1 | Transition flow optimization | The Legendary Copywriter | Marcus Webster -- Pattern Synthesis |
| 3.2 | Promise repetition calibration | Marcus Webster -- Pattern Synthesis | The Legendary Copywriter |
| 3.3 | Emotional escalation verification | Dr. Alena Vasquez -- Evidence Evaluation | The Legendary Copywriter |
| 3.4 | CTA variation generation | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 4.1 | Offer principles check | Sarah A. Conco -- Client Protection | Dr. Richard Stern -- Skeptical Academic |
| 4.2 | Anti-slop validation | Sarah A. Conco -- Client Protection | Dr. Richard Stern -- Skeptical Academic |
| 4.3 | Vault pattern comparison | Sarah Chen -- Competitive Intelligence | Marcus Webster -- Pattern Synthesis |
| 4.4 | Final offer copy assembly | Alex Rivera -- Strategic Integration | Dr. James Liu -- Research Director |

Reference: `CopywritingEngine/PERSONA-SYSTEM.md`

---

## 2. Quality Threshold Constraints

### Threshold Application

| Output Type | Threshold Level | Minimum Score | Evidence Required |
|-------------|-----------------|---------------|-------------------|
| Upstream loading | STANDARD | 70% completeness | count: required packages present (offer may be partial) |
| Source teaching + TIER1 loading | STANDARD | 70% completeness | count: SIN template indexed + TIER1 offer patterns indexed |
| Input validation | ELEVATED | 85% completeness | match: minimum offer data present, gaps identified |
| Human checkpoint | CRITICAL | 100% confirmation | match: human response received, minimum data confirmed |
| Offer presentation classification | ELEVATED | 85% alignment | match: format matches niche + product type |
| Deliverable sequence mapping | CRITICAL | 95% completeness | count: all deliverables and bonuses mapped with D-F-W-B-P |
| Value demonstration design | CRITICAL | 95% quality | count: 3 benefits selected, reasons drafted |
| Price presentation planning | CRITICAL | 95% accuracy | match: anchor points defined, savings math correct |
| Deliverable stack draft | CRITICAL | 95% quality | match: all items in D-F-W-B-P format, product summary present |
| Bonus presentation draft | CRITICAL | 95% quality | match: all bonuses in D-F-W-B-P, transitions present, values stated |
| Value demonstration draft | CRITICAL | 95% quality | count: 3+ "if all it did was..." iterations with compelling reasons |
| Price/guarantee/CTA draft | CRITICAL | 95% quality | match: price anchored, guarantee branded, 3+ CTAs with variety |
| Transition flow | ELEVATED | 85% smoothness | match: no "new section" feelings between chunks |
| Promise repetition calibration | CRITICAL | 95% quality | match: promise restated 3+ times, never copy-pasted |
| Emotional escalation | CRITICAL | 95% accuracy | trace: ascending arc from value through desire to urgency |
| CTA variation | CRITICAL | 95% quality | count: all 3 CTAs use different emotions and language |
| Offer principles check | CRITICAL | 100% compliance | count: all 10 principles pass |
| Anti-slop | CRITICAL | 100% pass | count: violations = 0 |
| Final offer copy package | CRITICAL | 95% integrity | score: overall >= 7.0, full text populated |

### Validation Score Thresholds

| Dimension | Minimum | Good | Excellent |
|-----------|---------|------|-----------|
| D-F-W-B-P completeness | 7.0 | 8.0 | 9.0+ |
| Value demonstration impact | 7.0 | 8.0 | 9.0+ |
| Price psychology | 7.0 | 8.0 | 9.0+ |
| Guarantee strength | 7.0 | 8.0 | 9.0+ |
| CTA variety | 7.0 | 8.0 | 9.0+ |
| Emotional escalation | 7.0 | 8.0 | 9.0+ |
| Transition smoothness | 7.0 | 8.0 | 9.0+ |
| Promise restatement quality | 7.0 | 8.0 | 9.0+ |
| Vault pattern comparison | 6.0 | 7.0 | 8.0+ |
| Overall weighted average | 7.0 | 8.0 | 9.0+ |

---

## 3. Feedback Bus

### Upstream Dependencies

| Upstream Skill | Trigger Condition | Request Payload |
|----------------|-------------------|-----------------|
| 07-offer | Offer package incomplete or deliverable descriptions too vague | `{ skill: "07-offer", request: "offer_completion", missing: [string] }` |
| 07-offer | Guarantee too weak for promise | `{ skill: "07-offer", request: "guarantee_strengthening", current: string }` |
| 15-product-introduction | Product introduction ending doesn't set up offer entry | `{ skill: "15-product-introduction", request: "handoff_alignment", issue: string }` |
| 05-promise | Benefit claims can't trace to primary promise | `{ skill: "05-promise", request: "promise_scope_check", claims: [string] }` |
| 02-proof-inventory | Insufficient proof for D-F-W-B-P proof elements | `{ skill: "02-proof-inventory", request: "proof_gap", deliverable: string, needed: string }` |

### Downstream Skills

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| 17-close | offer-copy-package.json assembled | Uses `downstream_handoffs.for_close` |
| Campaign assembly | offer-copy-package.json assembled | Uses `downstream_handoffs.for_campaign_assembly` |

### Feedback Schemas

```yaml
feedback_request:
  requesting_skill: "16-offer-copy"
  requesting_layer: string
  requesting_microskill: string
  target_skill: string
  request_type: enum[offer_completion, guarantee_strengthening, handoff_alignment, promise_scope_check, proof_gap]
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
      product_introduction_package_loaded: boolean
      offer_package_loaded: boolean
      offer_package_complete: boolean  # false triggers PARTIAL checkpoint default
      structure_package_loaded: boolean
      promise_package_loaded: boolean
      proof_inventory_loaded: boolean
      all_required_present: boolean
  source_teaching_intelligence:
    claim: "SIN methodology and TIER1 offer patterns indexed"
    evidence_type: count
    evidence:
      sin_template_indexed: boolean
      sin_chunk_sequence_mapped: boolean
      dfwbp_format_indexed: boolean
      value_demo_pattern_indexed: boolean
      price_presentation_pattern_indexed: boolean
      tier1_offer_patterns_indexed: boolean
      tier1_guarantee_patterns_indexed: boolean
      tier1_cta_patterns_indexed: boolean
      all_patterns_complete: boolean
  human_checkpoint:
    claim: "Human confirmed offer details"
    evidence_type: match
    evidence:
      response_received: boolean
      response_type: enum[confirm, modify, provide, partial]
      minimum_data_present: boolean
      product_name_confirmed: boolean
      deliverables_confirmed: boolean
      price_confirmed: boolean
      guarantee_confirmed: boolean
```

### Layer 1 Gate Evidence

```yaml
layer_1_gate_evidence:
  offer_classification:
    claim: "Offer format classified with niche alignment"
    evidence_type: match
    evidence:
      selected_format: string
      niche_alignment: boolean
      dfwbp_depth_determined: boolean
  deliverable_sequence:
    claim: "D-F-W-B-P sequence mapped for all items"
    evidence_type: count
    evidence:
      deliverables_mapped: integer
      bonuses_mapped: integer
      all_have_dfwbp: boolean
      proof_type_per_item: boolean
  value_demonstration:
    claim: "Value demonstration designed with 3 benefit selections"
    evidence_type: count
    evidence:
      benefits_selected: integer  # minimum 3
      reasons_drafted: boolean
      benefits_diverse: boolean  # different life areas
  price_presentation:
    claim: "Price presentation planned with correct math"
    evidence_type: match
    evidence:
      retail_anchor_defined: boolean
      actual_price_defined: boolean
      savings_calculated: boolean
      savings_math_correct: boolean
      stack_review_planned: boolean
```

### Layer 2 Gate Evidence

```yaml
layer_2_gate_evidence:
  deliverable_stack:
    claim: "All deliverables in D-F-W-B-P format with summary"
    evidence_type: count
    evidence:
      deliverables_written: integer
      all_have_feature: boolean
      all_have_why: boolean
      all_have_benefit: boolean
      all_have_proof: boolean
      product_summary_present: boolean
      promise_restated_in_summary: boolean
  bonus_presentation:
    claim: "All bonuses in D-F-W-B-P with transitions and values"
    evidence_type: count
    evidence:
      bonuses_written: integer
      all_have_dfwbp: boolean
      transitions_present: boolean
      values_stated: boolean
  value_demonstration:
    claim: "Value demo with 3+ 'if all it did was' iterations"
    evidence_type: count
    evidence:
      iteration_count: integer  # minimum 3
      all_have_reasons: boolean
      reasons_compelling: boolean
      value_totaling_present: boolean
  price_guarantee_ctas:
    claim: "Price anchored, guarantee branded, 3+ CTAs varied"
    evidence_type: match
    evidence:
      price_anchored: boolean
      guarantee_branded: boolean
      guarantee_not_generic: boolean  # no "if not satisfied"
      cta_count: integer  # minimum 3
      ctas_varied: boolean
      consequence_amplification_present: boolean
```

### Layer 3 Gate Evidence

```yaml
layer_3_gate_evidence:
  transition_flow:
    claim: "All transitions smooth between sections"
    evidence_type: match
    evidence:
      deliverable_to_deliverable_smooth: boolean
      deliverable_to_bonus_smooth: boolean
      bonus_to_value_demo_smooth: boolean
      value_demo_to_price_smooth: boolean
      price_to_guarantee_smooth: boolean
      guarantee_to_cta_smooth: boolean
  promise_repetition:
    claim: "Promise restated 3+ times with varied language"
    evidence_type: count
    evidence:
      restatement_count: integer  # minimum 3
      all_unique_language: boolean
      no_copy_paste: boolean
  emotional_escalation:
    claim: "Emotional arc ascending through offer section"
    evidence_type: trace
    evidence:
      value_phase_confidence: boolean
      excitement_phase_bonuses: boolean
      urgency_phase_price: boolean
      action_phase_ctas: boolean
      arc_ascending: boolean
  cta_variation:
    claim: "All CTAs use different emotions and language"
    evidence_type: count
    evidence:
      cta_1_emotion: string
      cta_2_emotion: string
      cta_3_emotion: string
      all_different: boolean
      contrast_enhancement_present: boolean
```

### Layer 4 Gate Evidence

```yaml
layer_4_gate_evidence:
  offer_principles:
    claim: "All 10 offer copy principles pass"
    evidence_type: count
    evidence:
      dfwbp_sacred: boolean
      promise_restated_not_repeated: boolean
      value_before_price: boolean
      if_all_it_did_present: boolean
      guarantee_is_feature: boolean
      three_ctas_minimum: boolean
      consequence_amplification: boolean
      urgency_justified: boolean
      stack_review_before_price: boolean
      seamless_entry: boolean
      all_ten_pass: boolean
  anti_slop:
    claim: "Zero generic or cliched offer elements"
    evidence_type: count
    evidence:
      violations: integer  # must be 0
      pass: boolean
  vault_comparison:
    claim: "Offer copy compared to elite offer presentations"
    evidence_type: match
    evidence:
      patterns_compared: integer
      differentiation_documented: boolean
      comparison_score: float
  assembly:
    claim: "offer-copy-package.json complete and valid"
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

`16-offer-copy/outputs/offer-copy-learning-log.json`

### What Gets Logged

```yaml
run_entry:
  run_id: string
  timestamp: string
  niche: string
  sub_niche: string
  product_name: string
  product_format: string
  deliverable_count: integer
  bonus_count: integer
  total_value: float
  actual_price: float
  guarantee_branded_name: string
  cta_count: integer
  value_demo_count: integer
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
    dfwbp_completeness: float
    value_demonstration_impact: float
    price_psychology: float
    guarantee_strength: float
    cta_variety: float
    emotional_escalation: float
    transition_smoothness: float
    overall_weighted_average: float
  offer_principle_violations: [string]
  feedback_requests: [object]
  failure_log: [object]

offer_format_pattern_entry:
  niche: string
  product_format: string
  deliverable_count: integer
  bonus_count: integer
  value_demo_approach: string
  cta_count: integer
  effectiveness_score: float
  word_count: integer
  notes: string
```

### Manager Responsibility

- Log every run automatically upon completion
- Track D-F-W-B-P completeness scores by product format
- Track value demonstration impact by benefit type selection
- Track price anchor ratio effectiveness (retail vs. actual)
- Track guarantee branded naming effectiveness
- Track CTA count vs. effectiveness (is 3 enough or does 5 perform better?)
- Track emotional escalation patterns by niche
- Track promise restatement variety quality
- Surface recurring offer principle violations for microskill improvement
- Track human checkpoint provision frequency to measure 07-offer maturity

---

## 6. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-27 | Initial architecture extension: full persona deployment, 19-row quality threshold table, feedback bus for 5 upstream skills, verification evidence for all 5 gates, continuous learning log with D-F-W-B-P and value demonstration tracking |
