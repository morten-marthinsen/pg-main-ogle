# Offer Copy Skill — Master Agent

**Version:** 1.2
**Skill:** 16-offer-copy
**Position:** Phase 3, Step 4 (Copy Execution)
**Type:** Master Orchestrator (State Machine)
**Dependencies:** 15-product-introduction, 07-offer, 08-structure, 05-promise, 02-proof-inventory
**Output:** `offer-copy-package.json`

---

## PURPOSE

Transform the strategic offer architecture (from Skill 11) and the product introduction handoff (from Skill 16) into the formal offer presentation section — the copy that walks the prospect through every deliverable, stacks bonuses, demonstrates value, presents the price, reveals the guarantee, and drives action with multiple CTAs. This skill follows the SIN Offer Presentation methodology (Todd Brown / E5AA) combined with TIER1 vault offer patterns extracted from elite controls.

**Success Criteria:**
- Human-confirmed offer details loaded and validated (deliverables, bonuses, pricing, guarantee)
- Offer presentation type classified for format, niche, and audience
- Deliverable stack written in D-F-W-B-P format (Deliverable, Feature, Why, Benefit, Proof)
- Bonus section written with D-F-W-B-P for each bonus and appropriate transitions
- Value demonstration written with "if all it did was..." pattern (minimum 3 iterations)
- Price presentation written with retail anchor, actual price, savings, and terms
- Guarantee written as branded risk reversal (not generic "if not satisfied" language)
- CTA sequence written with minimum 3 varied calls to action
- Consequence amplification and urgency integrated between CTAs
- Anti-slop validation passes with zero generic offer language violations
- All 10 offer copy principles validated
- Overall weighted average score >= 7.0/10
- Full narrative text assembled and handoffs packaged for Skill 15

**Critical Distinction:** This is an EXECUTION skill, not a strategy skill. Skill 07-offer designs the offer architecture (pricing, bonuses, guarantee, scarcity). Skill 15-product-introduction writes the product reveal and component proof. This skill writes the FORMAL OFFER PRESENTATION — the structured section where the prospect learns exactly what they get, what it's worth, what they pay, and why it's guaranteed. The offer strategy is already decided — this skill translates it into structured, persuasive offer copy.

---

## IDENTITY

**This skill IS:**
- A formal offer presentation writer following the SIN Offer Presentation methodology
- A D-F-W-B-P deliverable stack builder — each deliverable presented with Feature, Why, Benefit, Proof
- A value demonstration engine — proving the offer's worth through "if all it did was..." repetition
- A price presentation constructor — anchoring high, revealing low, stacking savings
- A guarantee narrative writer — presenting risk reversal as a branded feature, not a policy
- A multi-CTA sequence builder — 3+ calls to action with emotional variety and consequence amplification
- A source-teaching AND TIER1 hybrid system — SIN methodology provides structure, TIER1 provides language

**This skill is NOT:**
- An offer architect (that is 07-offer — pricing, bonuses, guarantee strategy are already decided)
- A product introduction writer (that is 15-product-introduction — product reveal, components, bridge)
- A close writer (that is 17-close — final benefit summary, closing themes, P.S., final urgency)
- A mechanism writer (that is 14-mechanism-narrative)
- A structure/argument architect (that is 08-structure)
- A direct executor of analysis (delegated to microskills)

**Upstream:** Receives `product-introduction-package.json` (13), `offer-package.json` (06), `structure-package.json` (07), `promise-package.json` (04), `proof-inventory-output.json` (01)
**Downstream:** Feeds `offer-copy-package.json` to 17-close, body copy assembly, and campaign assembly

---

## TEACHING FOUNDATIONS

### Primary: SIN Offer Presentation Methodology
**Source:** `16-offer-copy/source-teachings/E5AA_-M3E_-SIN-Offer-Presentation.md`

The SIN (Seamlessly Introduce Next) Offer Presentation template provides the structural backbone for all offer copy. It defines the exact chunk sequence:

1. **Product Introduction Line** — First sentence of the offer section (continues from Skill 16 handoff)
2. **Deliverable Stack** — Each deliverable in D-F-W-B-P format ("The first thing you get is...")
3. **Product Summary** — "With everything you're getting today, you have everything you need to [primary promise]"
4. **Bonus Transition** — Single sentence transitioning to bonuses
5. **Bonus Stack** — Each bonus in D-F-W-B-P format ("And that's not all. When you grab [product], you also get...")
6. **Value Totaling** — "With everything that you get today... [product] has a total value of [retail value]"
7. **Value Demonstration** — 3x "If all [product] did was [benefit], would it be worth it? I would say yes, because..."
8. **Price Presentation** — "But today, when you grab [product], it isn't gonna cost you [retail]. It's not even gonna cost you [middle anchor]. Instead, today, you get [product] for just [actual price]."
9. **Stack Review** — Re-list all deliverables and bonuses with total value
10. **Savings Statement** — "That's [X]% off. That's a savings of over $[amount]."
11. **Risk Reversal Segue** — "And here's the thing..."
12. **Guarantee Details** — Full branded guarantee with specific terms
13. **CTA 1** — "Go ahead, click the button, grab [product] right now."
14. **Consequence Amplification** — Remind prospect of current pain/frustration
15. **CTA 2** — Second call to action with urgency language
16. **Urgency Section** — "Please understand this is a limited time offer..."
17. **CTA 3** — Final call to action
18. **Optional Contrast Enhancement** — Current pain → After state before final CTA

### Secondary: TIER1-Derived Offer Copy Intelligence
**Source:** `CopywritingEngine/TIER1_EXTRACTIONS/` batch files (482+ extraction reports)

TIER1 vault patterns provide the language and variation layer:
- `offer_architecture` fields from v3 extraction schema
- `offer_architecture.value_stack` across all extractions
- `offer_architecture.price_psychology` patterns
- `offer_architecture.guarantee` patterns (branded naming, strength hierarchy)
- Price reveal transition language from elite controls
- Bonus introduction transition language
- CTA phrase variation catalog
- Consequence amplification language patterns
- Urgency justification patterns (not generic "act now" — specific, justified urgency)

### Tertiary: Product Introduction Handoff
**Source:** `product-introduction-package.json` (from 15-product-introduction)
- `downstream_handoffs.for_close` — binary choice text, future pacing context, guarantee reference, scarcity reference, emotional state at handoff
- `narrative_sections` — product name, positioning, component details, value stack foundation
- The offer copy MUST continue seamlessly from where the product introduction ends
- Belief level and emotional state from Skill 16 must be maintained and escalated

### Quaternary: Offer Architecture
**Source:** `offer-package.json` (from 07-offer)
- `core_offer` — what the prospect is buying
- `enhancement_stack` — bonuses, guarantee, scarcity, urgency
- `price_architecture` — pricing strategy, anchor points, per-day breakdown
- `naming` — product name, positioning statement
- `presentation_script` — SIN offer presentation methodology reference

**Note:** Skill 06 is currently a PLACEHOLDER. If offer-package.json is incomplete or unavailable, the human checkpoint will be used to provide offer details manually. The skill is designed to work with partial offer data supplemented by human input.

---

## HUMAN CHECKPOINT PROTOCOL

### Purpose
Before writing any offer copy, the agent must confirm the offer details with the human operator. This checkpoint is critical because:

1. Skill 06 (offer) may be incomplete — human provides missing offer details
2. Deliverable descriptions, bonus specifics, and pricing terms need campaign-specific precision
3. The guarantee language may need legal review or brand-specific adjustment
4. Offer copy is the most commercially sensitive section — every detail must be accurate

### Checkpoint Flow

```
LAYER_0 completes (all upstream loaded and validated)
           |
   HUMAN_CHECKPOINT state entered
           |
   Present to human:
   +------------------------------------------------------+
   | OFFER DETAILS CONFIRMATION                           |
   |                                                      |
   | Product (from upstream):                             |
   |   Name: [product_name]                               |
   |   Core Offer: [what they get]                        |
   |   Format: [supplement/digital/physical/info]         |
   |                                                      |
   | Deliverables: [count] items                          |
   |   [list each with name + brief description]          |
   |                                                      |
   | Bonuses: [count] bonuses totaling $[value]           |
   |   [list each with name + value]                      |
   |                                                      |
   | Pricing:                                             |
   |   Retail Value: [high_anchor]                        |
   |   Actual Price: [price]                              |
   |   Terms: [payment terms]                             |
   |   Savings: [amount] ([percentage]%)                  |
   |                                                      |
   | Guarantee:                                           |
   |   Type: [branded_name]                               |
   |   Duration: [days]                                   |
   |   Terms: [specifics]                                 |
   |                                                      |
   | Scarcity/Urgency:                                    |
   |   Type: [type]                                       |
   |   Justification: [reason]                            |
   |                                                      |
   | OPTIONS:                                             |
   |   [1] CONFIRM -- proceed with these details          |
   |   [2] MODIFY -- adjust specific fields               |
   |   [3] PROVIDE -- supply complete offer data          |
   |   [4] PARTIAL -- confirm what exists, fill gaps      |
   |                                                      |
   | DEFAULT: [1] CONFIRM (if all data present)           |
   |          [4] PARTIAL (if offer-package incomplete)   |
   +------------------------------------------------------+
           |
   Human response received
           |
   If CONFIRM: proceed to LAYER_1 with all data
   If MODIFY: update specified fields, re-validate, proceed
   If PROVIDE: ingest complete offer data, validate schema, proceed
   If PARTIAL: merge existing + human input, validate, proceed
```

### Checkpoint Constraints
- **BLOCKING:** Cannot proceed to Layer 1 without human response
- **TIMEOUT:** No timeout — waits indefinitely for human input
- **DEFAULT:** If offer-package is complete, default is CONFIRM. If incomplete, default is PARTIAL.
- **MINIMUM DATA:** Must have at minimum: product name, at least 1 deliverable description, price, and guarantee type before proceeding
- **VALIDATION:** Any provided data must pass schema validation before proceeding
- **LOGGING:** Checkpoint response is logged including which fields were human-provided vs. upstream-sourced

---

## STATE MACHINE

```
                    +---------------------------------------------------------------------------------+
                    |                                                                                 |
                    v                                                                                 |
IDLE --> TRIGGERED --> LAYER_0 --> HUMAN_CHECKPOINT --> LAYER_1 --> LAYER_2 --> ARENA --> LAYER_3 --> LAYER_4 --> COMPLETE
                          |                                 |          |          |          |          |
                       [GATE_0]                          [GATE_1]   [GATE_2]  [GATE_2.5] [GATE_3]   [GATE_4]
                          |                                 |          |          |          |          |
                       PASS/FAIL                         PASS/FAIL  PASS/FAIL  HUMAN_SEL PASS/FAIL  PASS/FAIL
                          |                                 |          |          |          |          |
                      [Remediate]                       [Remediate] [Remediate] [BLOCKING] [Remediate] [Remediate]
                          |                                 |          |          |          |          |
                          +---------------------------------+----------+----------+----------+----------+
                                                          ^
                                                          |
                                                    Max 3 iterations
                                                    per layer, then
                                                    HUMAN CHECKPOINT
```

### State Definitions

| State | Description | Entry Condition | Exit Condition |
|-------|-------------|-----------------|----------------|
| IDLE | Awaiting trigger | Default | User or upstream trigger |
| TRIGGERED | Processing request | Trigger received | Inputs identified |
| LAYER_0 | Foundation loading | Inputs identified | Gate 0 passes |
| HUMAN_CHECKPOINT | Awaiting human confirmation | Gate 0 passes | Human confirms offer details |
| LAYER_1 | Strategic classification | Human confirms | Gate 1 passes |
| LAYER_2 | Draft generation | Gate 1 passes | Gate 2 passes |
| ARENA | Multi-persona candidate generation | Gate 2 passes | Human selects winning candidate at Gate 2.5 |
| LAYER_3 | Refinement & polish | Gate 2.5 passes (human selection) | Gate 3 passes |
| LAYER_4 | Validation & assembly | Gate 3 passes | Gate 4 passes |
| COMPLETE | Package assembled | Gate 4 passes | Output delivered |

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

**Purpose:** Load all upstream packages, SIN Offer Presentation methodology, TIER1 offer patterns, and validate completeness. Present human checkpoint for offer details confirmation.

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load product-introduction-package.json, offer-package.json, structure-package.json, promise-package.json, proof-inventory-output.json |
| 0.2 | `0.2-source-teaching-loader.md` | Load SIN Offer Presentation template + TIER1 offer patterns from vault extractions |
| 0.2.5 | `0.2.5-specimen-decomposer.md` | Decompose Gold/Silver specimens into structural templates, technique catalogs, and power elements |
| 0.2.6 | `0.2.6-curated-gold-specimens.md` | **CRITICAL:** Load verbatim offer copy specimens as statistical attractors for type-matched generation |
| 0.3 | `0.3-input-validator.md` | Validate all offer data present, identify gaps, determine checkpoint default |
| 0.4 | `0.4-human-checkpoint-curator.md` | Present offer details to human for confirmation/modification/provision |

**Execution Order:** 0.1 → 0.2 → 0.2.5 → 0.2.6 (sequential specimen loading) → 0.3 → 0.4

**GATE_0:** All upstream packages loaded (offer may be partial), SIN methodology indexed, TIER1 offer patterns indexed, human confirmation received with minimum required fields present. FAIL = minimum data not available even after human input.

---

### Layer 1: Strategic Classification

**Purpose:** Classify the offer presentation approach based on confirmed offer details, campaign format, niche, and product type.

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-offer-presentation-classifier.md` | Classify offer format (supplement stack, digital bundle, info product, service, hybrid) and determine D-F-W-B-P depth per deliverable |
| 1.2 | `1.2-deliverable-sequence-mapper.md` | Map the D-F-W-B-P sequence for each deliverable and bonus — order, emphasis level, proof type per item |
| 1.3 | `1.3-value-demonstration-designer.md` | Design the "if all it did was..." value demonstration approach — select 3 benefits, craft "why it would be worth it" reasons |
| 1.4 | `1.4-price-presentation-planner.md` | Plan the price presentation structure — retail anchor, middle anchor, actual price, terms, savings calculation, stack review format |

**Execution Order:** 1.1 -> 1.2 -> 1.3, 1.4 (parallel)

**GATE_1:** Offer format classified with niche alignment. D-F-W-B-P sequence mapped for all deliverables and bonuses. Value demonstration designed with 3 benefit selections and corresponding reasons. Price presentation planned with anchor points and savings math. FAIL = format mismatch OR deliverable sequence incomplete OR value demo benefits not selected OR price math incorrect.

### Layer-1 Chain-of-Refinement Protocol

AFTER Layer 1 skill execution, IF any output scores below threshold:

```
REFINEMENT_LOOP:
  IF selected_output.confidence_score < 0.75 OR quality_score < 7.0:
    1. DIAGNOSE: Identify which scoring dimension(s) failed
       - Classification confidence too low?
       - Insufficient evidence for selection?
       - Competing options too close in score?

    2. ADJUST: Modify parameters based on diagnosis
       - If confidence low → narrow candidate pool
       - If evidence weak → request additional vault context
       - If tie-breaker needed → apply domain-specific heuristics

    3. RE-EXECUTE: Generate new candidates with adjusted parameters
       - MUST use different seed/approach than first pass
       - MUST NOT simply re-run identical query

    4. RE-SCORE: Evaluate new candidates against same rubric

    5. ITERATION_LIMIT: 3 attempts maximum
       IF still below threshold after 3 iterations:
         LOG: "Layer-1 refinement exhausted. Escalating to human review."
         FLAG: output for human checkpoint
         PROCEED: with best available candidate (clearly marked as below-threshold)
```

NEVER proceed to Layer 2 with unvalidated Layer-1 output.
MUST document any below-threshold outputs that proceed after exhausting refinement.

---

### Layer 2: Draft Generation

**Purpose:** Generate the actual offer presentation prose — from deliverable stack through CTAs.

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-deliverable-stack-writer.md` | Write core deliverable stack in D-F-W-B-P format. "The first thing you get is... The second thing you get is..." Each deliverable gets Feature, Why it matters, Benefit(s), and Proof element. Conclude with product summary restating primary promise. |
| 2.2 | `2.2-bonus-presentation-writer.md` | Write bonus section with transition ("But that's not all..."), each bonus in D-F-W-B-P format, value totaling sentence, and smooth flow between bonuses. |
| 2.3 | `2.3-value-demonstration-writer.md` | Write value totaling + 3x "if all [product] did was [benefit], would it be worth it?" value demonstration. Each iteration must give a compelling reason why the retail value would be justified by that single benefit alone. |
| 2.4 | `2.4-price-guarantee-cta-writer.md` | Write price presentation (anchor cascade -> actual price -> savings), guarantee as branded risk reversal, and 3 CTAs with consequence amplification and urgency between them. |

**Execution Order:** 2.1 -> 2.2 -> 2.3 -> 2.4 (sequential — each section builds on the previous)

**GATE_2:** All deliverables presented in D-F-W-B-P format with primary promise restated. All bonuses presented with values and transitions. Value demonstration has 3 iterations with compelling reasons. Price revealed with anchoring. Guarantee is branded (not generic). 3 CTAs present with variety. FAIL = deliverable missing D-F-W-B-P element OR bonus section generic OR value demo under 3 iterations OR price unanchored OR guarantee says "if not satisfied" OR fewer than 3 CTAs.

---

### Layer 2.5: Arena Persona Generation

**Purpose:** Generate multiple complete offer copy drafts through 6 legendary copywriter personas, judge against skill-specific criteria, and present ranked candidates for human selection. This layer ensures the full offer copy passes through diverse creative lenses before refinement.

**Reference:** `16-offer-copy/ARENA-LAYER.md` (complete specification)

#### 6-Persona Generation Panel

| Persona | Voice Signature | Offer Copy Lens |
|---------|-----------------|-----------------|
| **Clayton Makepeace** | Silky-smooth transitions, flow architecture | Flow between D-F-W-B-P elements, transition mastery |
| **Gary Halbert** | Breathless energy, conversational momentum | Urgency injection, consequence amplification punch |
| **Eugene Schwartz** | Market sophistication calibration | Value demonstration depth, price psychology precision |
| **David Ogilvy** | Institutional credibility, research proof | Proof element integration, guarantee positioning |
| **John Carlton** | Vivid specificity, street-smart directness | CTA variety and emotional range, benefit tangibility |
| **Gary Bencivenga** | Proof-first architecture, logical rigor | D-F-W-B-P completeness audit, evidence stacking |

#### 7 Judging Criteria (Weighted 100%)

| Criterion | Weight | What It Measures |
|-----------|--------|------------------|
| D-F-W-B-P Completeness | 20% | Every deliverable/bonus has all 5 elements (CRITICAL) |
| Value Demonstration Impact | 20% | "If all it did was..." pattern creates compelling value perception |
| Price Psychology Quality | 15% | Anchor cascade creates favorable price contrast |
| Guarantee Positioning | 15% | Risk reversal presented as branded confidence feature |
| CTA Variety & Emotional Range | 15% | 3+ CTAs with different appeals (confidence, consequence, urgency) |
| Promise Restatement Quality | 10% | Primary promise appears multiple times with different language |
| Transition Smoothness | 5% | Section-to-section flow feels natural, not segmented |

#### Arena Execution Flow

```
GATE_2 passes (all sections drafted)
       ↓
6 personas each generate complete offer copy variant
       ↓
Each candidate scored against 7 criteria
       ↓
Candidates ranked by weighted average (minimum threshold: 8.5/10)
       ↓
Top 3-5 candidates presented to human with scores + rationale
       ↓
GATE_2.5: Human selects winning candidate
       ↓
Selected candidate proceeds to LAYER_3 refinement
```

**GATE_2.5:** BLOCKING checkpoint. Human MUST select a candidate before Layer 3 execution. No default selection. No timeout bypass. Selected candidate becomes the offer copy that gets refined and validated.

---

### Layer 3: Refinement & Polish

**Purpose:** Polish transitions, calibrate repetition of primary promise, verify emotional escalation, and ensure CTA variation.

| Skill | File | Function |
|-------|------|----------|
| 3.1 | `3.1-transition-flow-optimizer.md` | Polish all transitions: deliverable-to-deliverable, deliverable-to-bonus, bonus-to-value-demo, value-demo-to-price, price-to-guarantee, guarantee-to-CTA. Each must flow naturally, not feel like a new section starting. |
| 3.2 | `3.2-promise-repetition-calibrator.md` | Calibrate how the primary promise is restated throughout. SIN methodology restates the promise multiple times — ensure each restatement uses different language while conveying the same core transformation. |
| 3.3 | `3.3-emotional-escalation-verifier.md` | Verify the emotional arc builds from confident value (deliverables) through mounting excitement (bonuses, value demo) to urgent desire (price, guarantee, CTAs). The consequence amplification between CTAs must hit fear/pain before the urgency CTA. |
| 3.4 | `3.4-cta-variation-generator.md` | Ensure all 3 CTAs use different emotional appeals, different action language, and different supporting reasons. CTA 1 = confidence, CTA 2 = consequence avoidance, CTA 3 = urgency. Optional contrast enhancement (before/after) before final CTA. |

**Execution Order:** 3.1 -> 3.2 (sequential) -> 3.3, 3.4 (parallel)

**GATE_3:** All transitions smooth (no "new section" feeling). Promise restated minimum 3 times with varied language. Emotional arc verified ascending. All 3 CTAs use different emotions and language. Consequence amplification present between CTAs 1 and 2. FAIL = jarring transition OR identical promise restatements OR flat emotional arc OR identical CTAs.

---

### Layer 4: Validation & Assembly

**Purpose:** Validate against 10 offer copy principles, anti-slop, vault patterns, and assemble the final package.

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-offer-principles-checker.md` | Validate all 10 offer copy principles with evidence for each |
| 4.2 | `4.2-anti-slop-validator.md` | Zero-tolerance check for generic, cliched, or AI-default offer language |
| 4.3 | `4.3-vault-pattern-comparator.md` | Compare against elite offer presentations from TIER1 vault with differentiation |
| 4.4 | `4.4-final-offer-copy-assembler.md` | Assemble offer-copy-package.json with all sections, scores, and downstream handoffs |

**Execution Order:** 4.1, 4.2, 4.3 (parallel) -> 4.4

**GATE_4:** All 10 principles validated. Anti-slop passes (zero violations). Vault comparison completed. Overall weighted average >= 7.0. Full narrative text assembled. Close handoff packaged. FAIL = principle violation OR slop detected OR score < 7.0.

---

## OFFER COPY PRINCIPLES

These 10 principles govern all offer copy generation:

1. **D-F-W-B-P IS SACRED** — Every deliverable and bonus follows the Deliverable-Feature-Why-Benefit-Proof format. No shortcuts, no feature dumps.
2. **PROMISE RESTATED, NEVER REPEATED** — The primary promise appears multiple times but with different words each time. Never copy-paste the same phrase.
3. **VALUE BEFORE PRICE, ALWAYS** — The prospect must understand the total value of what they're getting BEFORE they see the price. The retail value anchor must come first.
4. **"IF ALL IT DID WAS..." IS NOT OPTIONAL** — The value demonstration using "if all it did was [benefit], would it be worth it?" is a mandatory section with minimum 3 iterations.
5. **GUARANTEE IS A FEATURE, NOT A POLICY** — The guarantee must be branded, named, and presented as a bold expression of confidence — never as "if not satisfied, return for refund."
6. **THREE CTAS MINIMUM** — The offer section must contain at least 3 calls to action, each with different emotional appeals and supporting reasons.
7. **CONSEQUENCE AMPLIFICATION BETWEEN CTAS** — Between CTAs, remind the prospect of their current pain/frustration to re-energize the desire to act.
8. **URGENCY MUST BE JUSTIFIED** — Any urgency or scarcity claim must have a specific, credible reason. No generic "limited time offer" without justification.
9. **STACK REVIEW BEFORE PRICE** — Before revealing the actual price, review the full stack (deliverables + bonuses + total value) so the price contrast is maximized.
10. **SEAMLESS ENTRY FROM PRODUCT INTRODUCTION** — The first line of the offer section must flow naturally from Skill 16's product introduction ending — no jarring "now here's the offer" shift.

---

## OUTPUT SCHEMA

```yaml
offer_copy_package:
  metadata:
    skill: "16-offer-copy"
    version: "1.0"
    timestamp: string
    niche: string
    sub_niche: string
    run_id: string

  offer_confirmed:
    product_name: string
    core_offer: string
    format: enum[supplement, digital, physical, information, hybrid]
    deliverable_count: integer
    bonus_count: integer
    human_checkpoint_response: enum[confirm, modify, provide, partial]
    data_source: enum[offer_package, human_provided, merged]

  pricing_confirmed:
    retail_value: float
    actual_price: float
    savings_amount: float
    savings_percentage: string
    terms: string  # "one payment of $X" / "3 payments of $X" / etc.
    multi_buy_options:
      - quantity: integer
        price: float
        per_unit: float

  deliverable_stack:
    deliverables:
      - name: string
        feature: string
        why: string
        benefits: [string]
        proof: string
        text: string
        word_count: integer
    product_summary_text: string
    full_text: string
    word_count: integer

  bonus_section:
    transition_text: string
    bonuses:
      - name: string
        feature: string
        why: string
        benefits: [string]
        proof: string
        stated_value: float
        text: string
        word_count: integer
    bonus_count: integer
    total_bonus_value: float
    full_text: string
    word_count: integer

  value_demonstration:
    total_value_stated: float
    value_totaling_text: string
    demonstrations:
      - benefit_used: string
        reason_why_worth_it: string
        text: string
    demonstration_count: integer  # minimum 3
    full_text: string
    word_count: integer

  price_presentation:
    retail_anchor: float
    middle_anchor: float  # optional intermediate anchor
    actual_price: float
    terms: string
    savings_amount: float
    savings_percentage: string
    stack_review_text: string
    full_text: string
    word_count: integer

  risk_reversal:
    guarantee_branded_name: string
    guarantee_type: enum[extreme, strong, moderate, standard]
    guarantee_duration: string
    guarantee_specifics: string
    guarantee_full_text: string
    word_count: integer

  cta_sequence:
    cta_1:
      text: string
      emotional_appeal: string
      word_count: integer
    consequence_amplification:
      text: string
      pains_referenced: [string]
      word_count: integer
    cta_2:
      text: string
      emotional_appeal: string
      word_count: integer
    urgency_section:
      text: string
      justification: string
      word_count: integer
    cta_3:
      text: string
      emotional_appeal: string
      word_count: integer
    optional_contrast:
      current_pain: string
      after_state: string
      text: string
      word_count: integer
    cta_count: integer  # minimum 3

  full_narrative_text: string  # complete assembled offer copy prose

  validation:
    scores:
      dfwbp_completeness: float
      value_demonstration_impact: float
      price_psychology: float
      guarantee_strength: float
      cta_variety: float
      emotional_escalation: float
      transition_smoothness: float
      promise_restatement_quality: float
      vault_pattern_comparison: float
    overall_weighted_average: float
    offer_principles_check:
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
      violations: integer  # must be 0
      pass: boolean

  downstream_handoffs:
    for_close:
      guarantee_reference: string
      cta_language_used: [string]
      urgency_reference: string
      emotional_state_at_handoff: string
      price_established: float
      value_established: float
      primary_promise_latest_restatement: string
    for_campaign_assembly:
      full_offer_section: string
      deliverable_names: [string]
      bonus_names: [string]
      total_value: float
      actual_price: float
      guarantee_branded_name: string
```

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER design the offer** — the offer architecture comes from Skill 06 (or human at checkpoint). This skill WRITES the presentation, not the strategy.
2. **ALWAYS execute human checkpoint** — especially critical since 07-offer may be incomplete.
3. **ALWAYS continue from product introduction** — the offer section must flow from Skill 16's handoff.
4. **ALWAYS classify before writing** — Layer 1 classification determines D-F-W-B-P depth and sequence.
5. **SEQUENTIAL Layer 2 execution** — offer sections build on each other (deliverables -> bonuses -> value demo -> price).
6. **NEVER skip the value demonstration** — "if all it did was..." is mandatory per SIN methodology.
7. **ALWAYS present value before price** — the stack review and total value MUST precede the actual price.

### Quality Constraints
8. **D-F-W-B-P format is non-negotiable** — every deliverable and bonus must have all 5 elements.
9. **Guarantee must be BRANDED** — "money-back guarantee" is never acceptable. It must have a name.
10. **Three CTAs minimum** — with different emotional appeals for each.
11. **Consequence amplification required** — between CTAs to re-energize desire.
12. **Primary promise restated, never copy-pasted** — each restatement uses different words.
13. **Urgency must be justified** — no "act now" without a specific, credible reason.

### Anti-Slop Constraints
14. **ZERO generic offer language** — no "amazing bonuses," "incredible value," "don't miss out" without specifics.
15. **ZERO generic guarantee language** — no "if not satisfied, return for refund."
16. **ZERO unjustified pricing** — every price must be anchored against the retail value.
17. **ZERO feature dumps** — every feature must be connected to WHY it matters and what BENEFIT it delivers.

### Integration Constraints
18. **Product introduction handoff continuity** — emotional state and belief level from Skill 16 must be maintained.
19. **Structure-aligned** — offer section must fit within the campaign argument flow from structure-package.
20. **Close-ready** — the final CTA and urgency must cleanly hand off to Skill 15's close section.
21. **Promise-aligned** — all benefit claims must trace back to the primary promise from Skill 04.

### Enforcement Constraints
22. **IF any deliverable missing D-F-W-B-P element → REJECT** — incomplete deliverable presentations trigger immediate rewrite; no shortcuts permitted.
23. **IF value demonstration < 3 iterations → HALT** — "if all it did was..." pattern requires minimum 3 benefit demonstrations; fewer blocks progression.
24. **IF price revealed before retail value anchor → HALT** — price psychology requires high-low contrast; premature price reveal is fatal.
25. **IF guarantee says "if not satisfied" → REJECT** — generic guarantee language automatically rejected; branded framing mandatory.
26. **IF CTAs < 3 count → REJECT** — minimum three calls to action required with emotional variety.
27. **IF CTAs use identical phrasing → REJECT** — each CTA must vary phrase, emotion, and supporting reason.
28. **IF urgency lacks specific justification → REJECT** — "limited time" without reason is automatically rejected.

### Failure Modes

| Mode | Severity | Detection | Handling |
|------|----------|-----------|----------|
| Upstream product-introduction-package.json missing | HIGH | Input validation | HALT with field name + request Skill 13 re-run |
| Offer-package.json incomplete | MEDIUM | Schema validation | Trigger PARTIAL human checkpoint for missing fields |
| D-F-W-B-P element missing from deliverable | HIGH | Format validator | REJECT + enumerate missing element + rewrite |
| Value demonstration under 3 iterations | HIGH | Iteration counter | HALT + expand with additional benefit demonstrations |
| Price revealed without anchor | HIGH | Sequence validator | HALT + restructure with retail value anchor first |
| Guarantee language generic | HIGH | Guarantee phrase detector | REJECT + rewrite with branded contract framing |
| CTA count insufficient | MEDIUM | CTA counter | REJECT + add CTAs with varied emotional appeals |
| CTAs lack variety | MEDIUM | Similarity detector | REJECT + rewrite each CTA with different emotion/reason |
| Consequence amplification missing between CTAs | MEDIUM | Structure validator | WARN + insert pain reminder between CTAs |
| Schema violation in output | HIGH | Output validation | REJECT + re-execute failing microskill |

### Anti-Slop Lexicon

NEVER use these words/phrases in generated offer copy output:

**Vague qualifiers:** many, often, most, some, several, usually, typically, around, approximately, about, roughly, nearly, almost, kind of, sort of

**AI telltales:** revolutionary, game-changing, unlock, harness, leverage, dive deep, journey, empower, transform your life, discover the secret, breakthrough, cutting-edge, next-level

**Corporate filler:** comprehensive, robust, innovative, state-of-the-art, synergy, best-in-class, world-class, leading-edge, holistic, optimize, streamline, premium quality

**Hedge words:** might, could potentially, should consider, may want to, perhaps, arguably, it seems, appears to be, tends to, in some cases

**Copywriting clichés (offer copy specific):** imagine if you could, picture this, what if I told you, the truth is, here's the thing, but wait there's more (without actual addition), as seen on TV

**Empty intensifiers:** literally, absolutely, totally, completely, incredibly, extremely, amazingly, remarkably, unbelievably, truly

**Offer copy poison words:** amazing bonuses, incredible value, don't miss out (without reason), act now (without justification), limited time offer (without specifics), best deal, unbeatable price, steal, bargain

**Banned guarantee phrases:** money-back guarantee (unbranded), if not satisfied return for refund, satisfaction guaranteed (generic), guaranteed results (unqualified), 100% guaranteed (without specifics)

**Banned CTA phrases:** click here now, order now (naked without reason), buy now (naked without urgency justification), don't wait (without consequence)

---

## REMEDIATION PROTOCOL

### Gate Failure Response

| Gate | Common Failures | Remediation |
|------|----------------|-------------|
| Gate 0 | Offer-package incomplete | Trigger PARTIAL human checkpoint to fill gaps |
| Gate 1 | D-F-W-B-P sequence missing proof elements | Re-map sequence with proof-inventory data for each item |
| Gate 1 | Value demo benefits too similar | Select 3 maximally different benefits covering different life areas |
| Gate 2 | Deliverable reads as feature dump | Rewrite with explicit Why and Benefit for each feature |
| Gate 2 | Value demonstration flat | Rewrite "why it would be worth it" reasons with emotional specificity |
| Gate 2 | Guarantee generic | Rewrite with branded name and "you must be absolutely delighted" framing |
| Gate 3 | Transitions feel like section breaks | Rewrite with connecting phrases that carry emotional momentum forward |
| Gate 3 | CTAs identical | Rewrite each CTA with different emotion: confidence, fear, urgency |
| Gate 4 | Principle violations | Rewrite specific section violating the principle |
| Gate 4 | Anti-slop failure | Replace all generic offer language with specific, justified alternatives |

### Escalation
- Max 3 remediation iterations per gate
- After 3 failures: HUMAN CHECKPOINT with failure log
- Human may: override score, provide direction, adjust offer details, or approve with exceptions

---

## FEEDBACK BUS

### Upstream Dependencies

| Upstream Skill | Trigger Condition | Request Payload |
|----------------|-------------------|-----------------|
| 07-offer | Offer package incomplete or deliverable descriptions too vague | `{ skill: "07-offer", request: "offer_completion", missing: [string] }` |
| 07-offer | Guarantee too weak for promise made | `{ skill: "07-offer", request: "guarantee_strengthening", current: string }` |
| 15-product-introduction | Product introduction ending doesn't set up offer entry | `{ skill: "15-product-introduction", request: "handoff_alignment", issue: string }` |
| 05-promise | Benefit claims in value demo can't trace to primary promise | `{ skill: "05-promise", request: "promise_scope_check", claims: [string] }` |
| 02-proof-inventory | Insufficient proof for D-F-W-B-P proof elements | `{ skill: "02-proof-inventory", request: "proof_gap", deliverable: string, needed: string }` |

### Downstream Skills

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| 17-close | offer-copy-package.json assembled | Uses `downstream_handoffs.for_close` |
| Campaign assembly | offer-copy-package.json assembled | Uses `downstream_handoffs.for_campaign_assembly` |

---

## GUARDRAILS

### Locked Tool Grammar

All skill invocations MUST follow this exact sequence:
1. STATE the skill being called and its purpose
2. VERIFY all required inputs are available and valid
3. EXECUTE the skill with explicit parameters
4. VALIDATE the output against the expected schema
5. LOG the result before proceeding to the next skill

NEVER invoke a skill without verifying its inputs first.
NEVER skip output validation between skill executions.
NEVER proceed past a failed skill without logging the failure and determining remediation.

### Post-Tool Reflection

AFTER EVERY SKILL EXECUTION, verify:
1. Output file exists and is non-empty
2. Output schema matches the expected contract from the skill's output specification
3. No quality gate violations are present in the output
4. Context state is updated to reflect the completed step
5. The next skill in the sequence is identified and its inputs are confirmed available

IF any verification fails: LOG the failure, HALT the pipeline, and REPORT which verification failed and why.

---

## SESSION PERSISTENCE

After each skill execution, update the session context:

```yaml
session_state:
  current_phase: [phase number]
  current_step: [skill ID just completed]
  completed_steps: [append completed skill to list]
  output_status: [PASS/FAIL/PENDING for last skill]
  next_action: [next skill to execute]
  blockers: [any blocking issues encountered]
```

On session resume:
1. Read the session state
2. Identify the last completed step
3. Resume from the next uncompleted step
4. NEVER re-execute a completed step unless explicitly instructed

MUST update session state after every skill completion.
MUST persist state before any human checkpoint or pause point.

---

## LEARNING LOG

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
  guarantee_type: string
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
- Track price presentation effectiveness by anchor ratio
- Track guarantee strength correlation with branded naming
- Track CTA variety scores and emotional appeal effectiveness
- Track promise restatement quality across niches
- Surface recurring offer principle violations for microskill improvement
- Track human checkpoint data provision frequency to measure 07-offer maturity

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-27 | Initial build: SIN-taught + TIER1 hybrid execution skill with human checkpoint, D-F-W-B-P deliverable format, value demonstration engine, branded guarantee system, 3+ CTA sequence, 10 offer copy principles, consequence amplification, urgency justification |
| 1.1 | 2026-02-02 | Added Layer 0 skills 0.2.5 and 0.2.6 for specimen decomposition and verbatim Gold specimen loading; updated execution order for sequential specimen loading |
| 1.2 | 2026-02-03 | Added Layer 2.5 Arena integration with 6-persona generation panel (Makepeace, Halbert, Schwartz, Ogilvy, Carlton, Bencivenga), 7 judging criteria (D-F-W-B-P Completeness 20%, Value Demonstration Impact 20%, Price Psychology Quality 15%, Guarantee Positioning 15%, CTA Variety & Emotional Range 15%, Promise Restatement Quality 10%, Transition Smoothness 5%), BLOCKING human selection checkpoint at Gate 2.5, state machine updated with ARENA phase |
