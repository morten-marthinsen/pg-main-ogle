# ARCHITECTURE-EXTENSION.md

> **Version:** 1.0
> **Extends:** `17-close/CLOSE-AGENT.md`
> **Source:** `~brain/documentation/PERSONA-SYSTEM.md`

---

## 1. Manager Agent Architecture

### Execution Model

```
                    USER REQUEST
                         |
                         v
              +---------------------+
              |  CLOSE AGENT        |
              |  (State Machine)    |
              |                     |
              |  * Parse upstream   |
              |  * Human checkpoint |
              |  * Select theme     |
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
| 1.1 | Closing theme selection | Marcus Webster -- Pattern Synthesis | The Legendary Copywriter |
| 1.2 | Benefit summary design | Alex Rivera -- Strategic Integration | The Legendary Copywriter |
| 1.3 | CTA repetition planning | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 1.4 | P.S. strategy selection | The Legendary Copywriter | Alex Rivera -- Strategic Integration |
| 2.1 | Benefit summary writing | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 2.2 | Guarantee close writing | The Legendary Copywriter | Sarah A. Conco -- Client Protection |
| 2.3 | Closing theme writing | The Legendary Copywriter | Marcus Webster -- Pattern Synthesis |
| 2.4 | CTA/action sequence writing | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 3.1 | Urgency/scarcity integration | The Legendary Copywriter | Alex Rivera -- Strategic Integration |
| 3.2 | Future pacing / crossroads | The Legendary Copywriter | Jake Torres -- Viral Content Architect |
| 3.3 | P.S. section writing | The Legendary Copywriter | Alex Rivera -- Strategic Integration |
| 3.4 | Cialdini commitment integration | Marcus Webster -- Pattern Synthesis | The Legendary Copywriter |
| 4.1 | Makepeace elements check | Sarah A. Conco -- Client Protection | Dr. Richard Stern -- Skeptical Academic |
| 4.2 | Anti-slop validation | Sarah A. Conco -- Client Protection | Dr. Richard Stern -- Skeptical Academic |
| 4.3 | Vault pattern comparison | Sarah Chen -- Competitive Intelligence | Marcus Webster -- Pattern Synthesis |
| 4.4 | Final close assembly | Alex Rivera -- Strategic Integration | Dr. James Liu -- Research Director |

Reference: `~brain/documentation/PERSONA-SYSTEM.md`

---

## 2. Quality Threshold Constraints

### Threshold Application

| Output Type | Threshold Level | Minimum Score | Evidence Required |
|-------------|-----------------|---------------|-------------------|
| Upstream loading | STANDARD | 70% completeness | count: required packages present |
| Source teaching + TIER1 loading | STANDARD | 70% completeness | count: Makepeace 6+7 indexed, Week 13 patterns indexed, TIER1 close patterns indexed |
| Input validation | ELEVATED | 85% completeness | match: benefits, guarantee, offer details present |
| Human checkpoint | CRITICAL | 100% confirmation | match: human response received, theme selected |
| Closing theme selection | CRITICAL | 95% alignment | match: theme matches niche + format + emotional state |
| Benefit summary design | ELEVATED | 85% completeness | count: 5+ benefits identified, "You get" format planned |
| CTA repetition planning | CRITICAL | 95% completeness | count: 6+ asks mapped to emotions and placements |
| P.S. strategy selection | ELEVATED | 85% alignment | match: technique selected, content assigned |
| Benefit summary draft | CRITICAL | 95% quality | count: 5+ "You get" bullets with strong reasons |
| Guarantee close draft | CRITICAL | 95% quality | match: contract/promise framing, NOT "if not satisfied" |
| Closing theme draft | CRITICAL | 95% quality | match: theme executed with sincerity, not fabrication |
| CTA/action sequence draft | CRITICAL | 95% quality | count: 6+ CTAs varied, action instructions specific |
| Urgency/scarcity integration | CRITICAL | 95% quality | match: every urgency claim justified, staccato present |
| Future pacing / crossroads | CRITICAL | 95% quality | match: both futures vivid, decision ownership present |
| P.S. section | CRITICAL | 95% quality | match: P.S. uses prime real estate effectively |
| Cialdini integration | ELEVATED | 85% subtlety | match: commitment/consistency present, not heavy-handed |
| Makepeace elements check | CRITICAL | 100% compliance | count: all 6 elements present |
| Anti-slop | CRITICAL | 100% pass | count: violations = 0 |
| Final close package | CRITICAL | 95% integrity | score: overall >= 7.0, full text populated, final section |

### Validation Score Thresholds

| Dimension | Minimum | Good | Excellent |
|-----------|---------|------|-----------|
| Benefit summary impact | 7.0 | 8.0 | 9.0+ |
| Guarantee confidence building | 7.0 | 8.0 | 9.0+ |
| CTA repetition effectiveness | 7.0 | 8.0 | 9.0+ |
| CTA variety | 7.0 | 8.0 | 9.0+ |
| Closing theme execution | 7.0 | 8.0 | 9.0+ |
| Urgency credibility | 7.0 | 8.0 | 9.0+ |
| Future pacing vividness | 7.0 | 8.0 | 9.0+ |
| P.S. impact | 7.0 | 8.0 | 9.0+ |
| Cialdini integration | 7.0 | 8.0 | 9.0+ |
| Vault pattern comparison | 6.0 | 7.0 | 8.0+ |
| Overall weighted average | 7.0 | 8.0 | 9.0+ |

---

## 3. Feedback Bus

### Upstream Dependencies

| Upstream Skill | Trigger Condition | Request Payload |
|----------------|-------------------|-----------------|
| 16-offer-copy | Offer copy ending doesn't set up close entry | `{ skill: "16-offer-copy", request: "handoff_alignment", issue: string }` |
| 16-offer-copy | Guarantee details insufficient for close | `{ skill: "16-offer-copy", request: "guarantee_detail", needed: string }` |
| 05-promise | Benefit claims can't trace to primary promise | `{ skill: "05-promise", request: "promise_scope_check", claims: [string] }` |
| 02-proof-inventory | Insufficient proof for benefit summary or P.S. testimonials | `{ skill: "02-proof-inventory", request: "proof_gap", section: string, needed: string }` |
| 08-structure | Close section conflicts with campaign argument arc | `{ skill: "08-structure", request: "close_placement", conflict: string }` |

### Downstream Skills

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| Campaign assembly | close-package.json assembled | Uses `downstream_handoffs.for_campaign_assembly` -- FINAL COPY SKILL |

### Feedback Schemas

```yaml
feedback_request:
  requesting_skill: "17-close"
  requesting_layer: string
  requesting_microskill: string
  target_skill: string
  request_type: enum[handoff_alignment, guarantee_detail, promise_scope_check, proof_gap, close_placement]
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
      offer_copy_package_loaded: boolean
      product_introduction_package_loaded: boolean
      promise_package_loaded: boolean
      structure_package_loaded: boolean
      proof_inventory_loaded: boolean
      all_required_present: boolean
  source_teaching_intelligence:
    claim: "Makepeace + Week 13 + TIER1 close patterns fully indexed"
    evidence_type: count
    evidence:
      makepeace_six_elements_indexed: boolean
      makepeace_seven_themes_indexed: boolean
      makepeace_repetition_psychology_indexed: boolean
      makepeace_ps_techniques_indexed: boolean
      makepeace_cialdini_indexed: boolean
      week13_branded_guarantee_patterns_indexed: boolean
      week13_crossroads_patterns_indexed: boolean
      week13_staccato_patterns_indexed: boolean
      week13_checkout_patterns_indexed: boolean
      week13_dream_nightmare_patterns_indexed: boolean
      tier1_close_patterns_indexed: boolean
      all_teachings_complete: boolean
  human_checkpoint:
    claim: "Human confirmed close approach"
    evidence_type: match
    evidence:
      response_received: boolean
      response_type: enum[confirm, modify, provide]
      closing_theme_selected: boolean
      ps_strategy_selected: boolean
      cta_count_confirmed: boolean
```

### Layer 1 Gate Evidence

```yaml
layer_1_gate_evidence:
  closing_theme:
    claim: "Closing theme(s) selected with niche/format alignment"
    evidence_type: match
    evidence:
      primary_theme: string
      secondary_themes: [string]
      niche_alignment: boolean
      format_alignment: boolean
      emotional_state_alignment: boolean
  benefit_summary:
    claim: "Benefit summary designed with 5+ benefits"
    evidence_type: count
    evidence:
      benefits_identified: integer  # minimum 5
      you_get_format_planned: boolean
      reasons_why_outlined: boolean
  cta_repetition:
    claim: "6+ CTAs planned with emotional variety"
    evidence_type: count
    evidence:
      cta_count_planned: integer  # minimum 6
      emotions_assigned: boolean
      all_different_emotions: boolean
      placements_mapped: boolean
  ps_strategy:
    claim: "P.S. strategy selected with content assigned"
    evidence_type: match
    evidence:
      technique_selected: string
      ps_count_planned: integer
      content_assigned: boolean
```

### Layer 2 Gate Evidence

```yaml
layer_2_gate_evidence:
  benefit_summary:
    claim: "Benefit summary written with 'You get' format"
    evidence_type: count
    evidence:
      bullet_count: integer  # minimum 5
      you_get_format_used: boolean
      each_has_reason_why: boolean
      desire_reignited: boolean
  guarantee_close:
    claim: "Guarantee written as contract/promise"
    evidence_type: match
    evidence:
      style_used: enum[contract, personal_promise]
      branded_name_present: boolean
      absolutely_delighted_framing: boolean
      no_if_not_satisfied: boolean  # must be true
      rush_language_present: boolean
  closing_theme:
    claim: "Closing theme executed with sincerity"
    evidence_type: match
    evidence:
      primary_theme_written: boolean
      secondary_themes_integrated: boolean
      tone_sincere: boolean
      not_fabricated: boolean
  cta_action_sequence:
    claim: "6+ CTAs written with variety and action instructions"
    evidence_type: count
    evidence:
      cta_count: integer  # minimum 6
      all_varied: boolean
      action_instructions_present: boolean
      themes_woven_into_action: boolean
```

### Layer 3 Gate Evidence

```yaml
layer_3_gate_evidence:
  urgency_scarcity:
    claim: "Urgency justified and staccato present"
    evidence_type: match
    evidence:
      all_urgency_justified: boolean
      no_generic_act_now: boolean
      staccato_sections_present: boolean
      week13_patterns_used: boolean
  future_pacing_crossroads:
    claim: "Dream/nightmare vivid with sincere crossroads"
    evidence_type: match
    evidence:
      dream_feelings_vivid: boolean
      nightmare_feelings_vivid: boolean
      crossroads_two_paths: boolean
      decision_ownership: boolean
      tone_sincere: boolean
  ps_section:
    claim: "P.S. uses prime real estate effectively"
    evidence_type: match
    evidence:
      ps_count: integer
      technique_applied: boolean
      high_impact_content: boolean
      could_standalone_as_sell: boolean
  cialdini_integration:
    claim: "Commitment/consistency woven subtly"
    evidence_type: match
    evidence:
      integration_present: boolean
      subtlety_maintained: boolean
      not_heavy_handed: boolean
      implicit_agreement_leveraged: boolean
```

### Layer 4 Gate Evidence

```yaml
layer_4_gate_evidence:
  makepeace_elements:
    claim: "All 6 Makepeace foundational elements present"
    evidence_type: count
    evidence:
      benefit_summary_present: boolean
      guarantee_as_confidence: boolean
      sale_asked_6_plus: boolean
      action_instructions_present: boolean
      ps_present: boolean
      sidebars_noted: boolean
      all_six_present: boolean
  anti_slop:
    claim: "Zero generic or cliched close elements"
    evidence_type: count
    evidence:
      violations: integer  # must be 0
      pass: boolean
  vault_comparison:
    claim: "Close compared to elite close sections"
    evidence_type: match
    evidence:
      patterns_compared: integer
      differentiation_documented: boolean
      comparison_score: float
  assembly:
    claim: "close-package.json complete and valid -- FINAL COPY SECTION"
    evidence_type: count
    evidence:
      all_sections_populated: boolean
      full_narrative_text_present: boolean
      downstream_handoffs_present: boolean
      overall_score: float
      above_minimum: boolean
      close_is_final: boolean  # always true
```

---

## 5. Continuous Learning Log

### Log Location

`17-close/outputs/close-learning-log.json`

### What Gets Logged

```yaml
run_entry:
  run_id: string
  timestamp: string
  niche: string
  sub_niche: string
  product_name: string
  product_format: string
  primary_closing_theme: string
  secondary_themes: [string]
  ps_strategy: string
  ps_count: integer
  cta_count: integer
  benefit_summary_count: integer
  guarantee_style: string
  guarantee_branded_name: string
  crossroads_present: boolean
  cialdini_used: boolean
  word_count: integer
  human_checkpoint_response: string
  gate_results:
    layer_0: enum[pass, fail]
    layer_1: enum[pass, fail]
    layer_2: enum[pass, fail]
    layer_3: enum[pass, fail]
    layer_4: enum[pass, fail]
  validation_scores:
    benefit_summary_impact: float
    guarantee_confidence_building: float
    cta_repetition_effectiveness: float
    closing_theme_execution: float
    urgency_credibility: float
    future_pacing_vividness: float
    ps_impact: float
    cialdini_integration: float
    overall_weighted_average: float
  makepeace_element_failures: [string]
  feedback_requests: [object]
  failure_log: [object]

closing_theme_pattern_entry:
  niche: string
  product_format: string
  primary_theme_selected: string
  secondary_themes: [string]
  cta_count: integer
  ps_strategy: string
  effectiveness_score: float
  word_count: integer
  notes: string
```

### Manager Responsibility

- Log every run automatically upon completion
- Track closing theme effectiveness by niche and product format
- Track CTA repetition count vs. close effectiveness score
- Track P.S. technique impact by type (which of 6 techniques performs best?)
- Track guarantee presentation style (contract vs. personal promise) effectiveness
- Track Cialdini integration subtlety and effectiveness
- Track crossroads/future pacing vividness scores by niche
- Track benefit summary length (item count) vs. close quality
- Surface recurring Makepeace element omissions for microskill improvement
- This is the FINAL skill — track overall close quality as pipeline culmination metric

---

## 6. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-27 | Initial architecture extension: full persona deployment, 19-row quality threshold table, feedback bus for 5 upstream skills, verification evidence for all 5 gates, continuous learning log with Makepeace element and CTA repetition tracking. FINAL copy execution skill architecture. |
