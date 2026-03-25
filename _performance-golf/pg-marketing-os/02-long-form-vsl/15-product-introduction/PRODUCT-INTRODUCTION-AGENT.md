# Product Introduction Skill — Master Agent

**Version:** 1.3
**Skill:** 15-product-introduction
**Position:** Phase 3, Step 3 (Copy Execution)
**Type:** Master Orchestrator (State Machine)
**Dependencies:** 07-offer, 04-mechanism, 14-mechanism-narrative, 08-structure, 02-proof-inventory
**Output:** `product-introduction-package.json`

---

## PURPOSE

Transform the strategic offer package (from Skill 11) into the product introduction section — the copy that reveals the product, bridges from mechanism to offer, stacks value, reveals price, presents guarantees, creates urgency, and closes with a binary choice. This skill handles the most dangerous transition in the promotion: from education to selling. It must make the product feel like a natural, inevitable conclusion to the mechanism narrative, not a jarring sales pitch.

**Success Criteria:**
- Human-confirmed product details loaded and validated
- Introduction type classified for format, niche, and audience
- Bridge moment constructed using one of 6 bridge architectures
- Product revealed with positioning statement and uniqueness claim
- Components revealed through appropriate pattern (three-prong, ingredient deep dive, step-by-step, usage demo, nutrient protocol)
- Value stacked and price revealed through appropriate architecture
- Guarantee branded and named, scarcity justified
- Anti-slop validation passes with zero generic language violations
- All 8 master principles validated
- Overall weighted average score >= 7.0/10
- Full narrative text assembled and handoffs packaged

**Critical Distinction:** This is an EXECUTION skill, not a strategy skill. Skill 07-offer designs the offer architecture (pricing, bonuses, guarantee, scarcity). This skill WRITES the copy that presents it. The offer strategy is already decided — this skill translates it into compelling prose.

---

## IDENTITY

**This skill IS:**
- A product reveal execution engine that translates offer architecture into copy
- A TIER1-taught writing system — all patterns learned from elite control analysis
- The bridge constructor between mechanism education (Skill 15) and purchasing decision
- A value stacking and price presentation system
- A guarantee and scarcity narrative builder
- A 13-step emotional architecture executor

**This skill is NOT:**
- An offer architect (that is 07-offer)
- A mechanism narrative writer (that is 14-mechanism-narrative)
- A root cause narrative writer (that is 13-root-cause-narrative)
- A close writer (that is 17-close — this skill builds to the close, not the close itself)
- A structure/argument architect (that is 08-structure)
- A direct executor of analysis (delegated to microskills)
- A source-teaching-dependent system (all teachings are TIER1-derived)

**Upstream:** Receives `offer-package.json` (06), `mechanism-narrative-package.json` (12), `mechanism-package.json` (03), `structure-package.json` (07), `proof-inventory-output.json` (01)
**Downstream:** Feeds `product-introduction-package.json` to 17-close, body copy assembly, and campaign assembly

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Foundation + specimen loading | haiku | Input loading, no reasoning needed |
| 1 | Introduction type + bridge architecture + price architecture classification | sonnet | Pattern matching from vault |
| 2 | Full draft (bridge + reveal + components + price) | opus | Creative generation — max quality |
| 2.5 | Arena (7 competitors × 2 rounds + audience evaluation) | opus | Maximum quality generation |
| 3 | Refinement + 8-principle validation | opus | Judgment-heavy evaluation |
| 4 | Validation + packaging | sonnet | Assembly from existing content |

### Layer 2.5: Arena (MANDATORY FILE READS)

**BEFORE generating ANY Arena competitor output, READ these files:**

1. `15-product-introduction/ARENA-LAYER.md` — skill-specific criteria and weights
2. `~system/protocols/ARENA-CORE-PROTOCOL.md` — execution protocol
3. `~system/protocols/ARENA-PERSONA-PANEL.md` — persona specifications

**VERIFY personas match protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect**

**If personas don't match → HALT — FABRICATION DETECTED**

---

## TEACHING FOUNDATIONS

### Primary: TIER1-Derived Product Introduction Intelligence
**Source:** `tier1-extractions/ANALYSIS_product_introduction_patterns.md`

This skill has NO external source teachings. All patterns were extracted from deep analysis of 12 TIER1 control extractions. The patterns found ARE the teachings.

**Core Knowledge Base:**
1. **7 Introduction Types** — manufacturing_quest, formula_development, honored_introduction, alternative_pivot, news_announcement, mechanism_to_product_bridge, challenge_introduction
2. **5-Phase Universal Sequence** — Mechanism Saturation → Desire Amplification → Bridge Moment → Product Presentation → Component Reveal
3. **6 Bridge Architectures** — accessibility_bridge, story_continuation, deferred_reveal, activation_invitation, competitive_elimination, partnership_bridge
4. **5 Component Reveal Patterns** — three_prong_defense, ingredient_deep_dive, step_by_step_system, usage_demonstration, nutrient_protocol
5. **4 Value Stacking Techniques** — dollar_value_parade, category_diversification, continuity_trojan_horse, worth_entire_course_anchor
6. **4 Bonus Introduction Patterns** — stacked_reveal, but_wait_escalation, pre_price_bonus_stack, bonus_free_authority_play
7. **5 Price Reveal Architectures** — descending_anchor_cascade, comparison_anchor, rhetorical_value_question, price_per_day_minimizer, non_monetary_justification
8. **5 Scarcity Architectures** — quantity_limited, price_increasing, suppression_takedown, time_limited_window, real_world_supply_constraint
9. **Guarantee Patterns** — strength hierarchy (extreme/strong/moderate/standard) + branded naming
10. **13-Step Emotional Architecture** — Problem ID → Root Cause → Mechanism → Personal Results → Social Proof → Product Intro → Components → Value Stack → Price Reveal → Guarantee → Scarcity → Future Pacing → Binary Choice
11. **8 Master Principles** — product_never_hero, withholding_creates_value, bridge_moment_most_dangerous, components_are_proof, value_before_price, guarantees_named_branded, scarcity_must_be_justified, close_is_binary_choice
12. **Transition Language Catalog** — 12 product bridge transitions, 6 price reveal transitions, 5 bonus introduction transitions (exact language from controls)
13. **Product Naming Timing** — bimodal distribution: immediate (0-10%) for news/advertorial OR late (60-75%) for story-driven VSL

### Secondary: Vault Intelligence
**Source:** `TIER1_EXTRACTIONS/` batch files
- `offer_architecture` fields from v3 extraction schema
- `offer_architecture.value_stack` across all extractions
- `offer_architecture.price_psychology` patterns
- `offer_architecture.guarantee` patterns
- `narrative_flow.section_sequence` product positioning data

### Tertiary: Mechanism Narrative Handoff
**Source:** `mechanism-narrative-package.json` (from 14-mechanism-narrative)
- `downstream_handoffs.for_product_introduction` — bridge text, mechanism context, mechanism name, proof elements established, emotional state at handoff, belief level at handoff
- The product introduction MUST continue from the mechanism narrative's product bridge
- The belief level established by the mechanism must be maintained and amplified

### Quaternary: Offer Architecture
**Source:** `offer-package.json` (from 07-offer)
- `core_offer` — what the prospect is buying
- `enhancement_stack` — bonuses, guarantee, scarcity, urgency
- `price_architecture` — pricing strategy, anchor points, per-day breakdown
- `naming` — product name, positioning statement
- `presentation_script` — SIN offer presentation methodology (D-F-W-B-P)

**Note:** Skill 06 is currently a PLACEHOLDER. If offer-package.json is incomplete or unavailable, the human checkpoint will be used to provide product details manually. The skill is designed to work with partial offer data supplemented by human input.

---

## HUMAN CHECKPOINT PROTOCOL

### Purpose
Before writing any product introduction copy, the agent must confirm the product details with the human operator. This checkpoint is especially critical because:

1. Skill 06 (offer) may be incomplete — human provides missing product details
2. Product name, pricing, bonuses, and guarantee may need campaign-specific adjustment
3. The human knows the actual product better than any upstream skill
4. Product introduction is where copy becomes most directly commercial — accuracy is essential

### Checkpoint Flow

```
LAYER_0 completes (all upstream loaded and validated)
           ↓
   HUMAN_CHECKPOINT state entered
           ↓
   Present to human:
   ┌──────────────────────────────────────────────────┐
   │ PRODUCT DETAILS CONFIRMATION                     │
   │                                                  │
   │ Product (from 07-offer or manual):               │
   │   Name: [product_name]                           │
   │   Core Offer: [what they get]                    │
   │   Format: [supplement/digital/physical/info]     │
   │   Positioning: [statement]                       │
   │   Uniqueness Claim: [claim]                      │
   │                                                  │
   │ Pricing:                                         │
   │   Anchor Price: [high_anchor]                    │
   │   Actual Price: [price]                          │
   │   Per-Day Price: [per_day]                       │
   │   Multi-buy Options: [options]                   │
   │                                                  │
   │ Bonuses: [count] bonuses totaling $[value]       │
   │   [list of bonuses with names and values]        │
   │                                                  │
   │ Guarantee:                                       │
   │   Type: [type]                                   │
   │   Duration: [days]                               │
   │   Name: [branded_name]                           │
   │                                                  │
   │ Scarcity:                                        │
   │   Type: [type]                                   │
   │   Justification: [reason]                        │
   │                                                  │
   │ Mechanism (from 12):                             │
   │   Name: [mechanism_name]                         │
   │   Bridge Text: [preview]                         │
   │   Belief Level at Handoff: [level]               │
   │                                                  │
   │ OPTIONS:                                         │
   │   [1] CONFIRM — proceed with these details       │
   │   [2] MODIFY — adjust specific fields            │
   │   [3] PROVIDE — supply complete product data     │
   │   [4] PARTIAL — confirm what exists, fill gaps   │
   │                                                  │
   │ DEFAULT: [1] CONFIRM (if all data present)       │
   │          [4] PARTIAL (if offer-package incomplete)│
   └──────────────────────────────────────────────────┘
           ↓
   Human response received
           ↓
   If CONFIRM: proceed to LAYER_1 with all data
   If MODIFY: update specified fields, re-validate, proceed
   If PROVIDE: ingest complete product data, validate schema, proceed
   If PARTIAL: merge existing + human input, validate, proceed
```

### Checkpoint Constraints
- **BLOCKING:** Cannot proceed to Layer 1 without human response
- **TIMEOUT:** No timeout — waits indefinitely for human input
- **DEFAULT:** If offer-package is complete, default is CONFIRM. If incomplete, default is PARTIAL.
- **MINIMUM DATA:** Must have at minimum: product name, core offer description, price, and guarantee type before proceeding
- **VALIDATION:** Any provided data must pass schema validation before proceeding
- **LOGGING:** Checkpoint response is logged including which fields were human-provided vs. upstream-sourced

---

## STATE MACHINE

```
                    ┌───────────────────────────────────────────────────────────────────────────────────┐
                    │                                                                                   │
                    ▼                                                                                   │
IDLE ──► TRIGGERED ──► LAYER_0 ──► HUMAN_CHECKPOINT ──► LAYER_1 ──► LAYER_2 ──► ARENA ──► LAYER_3 ──► LAYER_4 ──► COMPLETE
                          ↓                                 ↓          ↓          ↓          ↓          ↓
                       [GATE_0]                          [GATE_1]   [GATE_2]  [GATE_2.5] [GATE_3]   [GATE_4]
                          ↓                                 ↓          ↓          ↓          ↓          ↓
                       PASS/FAIL                         PASS/FAIL  PASS/FAIL  HUMAN_SEL PASS/FAIL  PASS/FAIL
                          ↓                                 ↓          ↓          ↓          ↓          ↓
                      [Remediate]                       [Remediate] [Remediate] BLOCKING [Remediate] [Remediate]
                          ↓                                 ↓          ↓          ↓          ↓          ↓
                          └─────────────────────────────────┴──────────┴──────────┴──────────┴──────────┘
                                                          ▲
                                                          │
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
| HUMAN_CHECKPOINT | Awaiting human confirmation | Gate 0 passes | Human confirms product details |
| LAYER_1 | Strategic classification | Human confirms | Gate 1 passes |
| LAYER_2 | Draft generation | Gate 1 passes | Gate 2 passes |
| ARENA | Multi-perspective generation & judging | Gate 2 passes | Human selects winner (Gate 2.5) |
| LAYER_3 | Refinement & commercial architecture | Gate 2.5 passes | Gate 3 passes |
| LAYER_4 | Validation & assembly | Gate 3 passes | Gate 4 passes |
| COMPLETE | Package assembled | Gate 4 passes | Output delivered |

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

**Purpose:** Load all upstream packages, TIER1 product introduction intelligence, verbatim specimens, mechanism handoff, and validate completeness. Present human checkpoint for product details confirmation.

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load offer-package.json, mechanism-narrative-package.json, mechanism-package.json, structure-package.json, proof-inventory-output.json |
| 0.2 | `0.2-tier1-intelligence-loader.md` | Load ANALYSIS_product_introduction_patterns.md — all 13 sections of TIER1 analysis |
| 0.2.5 | `0.2.5-specimen-decomposer.md` | Decompose Gold/Silver specimens into structural templates, technique catalogs, and power elements |
| 0.2.6 | `0.2.6-curated-gold-specimens.md` | **CRITICAL:** Load verbatim product introduction specimens as statistical attractors for type-matched generation |
| 0.3 | `0.3-input-validator.md` | Validate all inputs present, identify gaps in offer-package, determine checkpoint default |
| 0.4 | `0.4-human-checkpoint-curator.md` | Present product details to human for confirmation/modification/provision |

**Execution Order:** 0.1 → 0.2 → 0.2.5 → 0.2.6 (sequential specimen loading) → 0.3 → 0.4

**SPECIMEN INJECTION PROTOCOL:**
After Layer 0 classification, 0.2.6 specimens are loaded based on:
- **Introduction Type Match:** Load Gold specimen matching classified introduction_type
- **Bridge Architecture Match:** Load Gold specimen matching selected bridge_architecture
- **Component/Price Match:** Load Gold specimen matching component_reveal_pattern OR price_reveal_architecture
- **Context Budget:** Maximum 4 specimens loaded per generation (3 Gold + 1 Silver template)

**GATE_0:** All upstream packages loaded (offer may be partial), TIER1 intelligence indexed, mechanism handoff integrated, human confirmation received with minimum required fields present. FAIL = minimum data not available even after human input.

---

### Layer 1: Strategic Classification

**Purpose:** Classify the product introduction strategy based on confirmed product details, campaign format, niche, and mechanism narrative handoff state.

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-introduction-type-classifier.md` | Classify into one or more of 7 introduction types based on product category, format, and niche |
| 1.2 | `1.2-bridge-architecture-selector.md` | Select bridge architecture from 6 options based on mechanism narrative handoff and introduction type |
| 1.3 | `1.3-component-reveal-selector.md` | Select component reveal pattern from 5 options based on product type (supplement, digital, physical, info) |
| 1.4 | `1.4-price-value-strategy-mapper.md` | Map price reveal architecture, value stacking technique, bonus pattern, guarantee approach, and scarcity type |

**Execution Order:** 1.1 → 1.2 → 1.3, 1.4 (parallel)

**GATE_1:** Introduction type classified with format alignment. Bridge architecture selected with mechanism handoff compatibility. Component reveal pattern matched to product type. Price/value strategy mapped with all sub-architectures assigned. FAIL = type doesn't match format OR bridge incompatible with mechanism handoff OR price strategy undefined.

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

**Purpose:** Generate the actual product introduction prose — from bridge moment through component reveal and value stack.

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-bridge-moment-writer.md` | Write the critical transition from mechanism narrative to product reveal — THE most dangerous point in the copy |
| 2.2 | `2.2-product-reveal-writer.md` | Write the product name reveal with positioning statement, uniqueness claim, and manufacturing/quality credibility |
| 2.3 | `2.3-component-reveal-writer.md` | Write the component/ingredient/step reveal using the selected pattern — each component carries its own proof |
| 2.4 | `2.4-value-stack-writer.md` | Write the value stack — bonuses, dollar values, category diversification, total value statement |

**Execution Order:** 2.1 → 2.2 → 2.3 → 2.4 (sequential — each section builds on the previous)

**GATE_2:** Bridge moment smooth (no jarring "now I'm selling" shift). Product revealed with positioning + uniqueness. Components revealed with per-component proof. Value stack assembled with total value. FAIL = bridge feels like a pitch OR product reveal flat OR components are features not proof OR value stack incomplete.

---

### Layer 2.5: Arena (Multi-Perspective Generation & Judging)

**Purpose:** Generate multiple product introduction candidates through 6 legendary copywriter personas, score against skill-specific criteria, and present ranked options for human selection. Product introduction is THE MOST DANGEROUS transition in copy — persona diversity reveals optimal bridge approach.

**Reference:** Full Arena specification in `ARENA-LAYER.md`

#### Arena Persona Panel

| Persona | Lens | Product Introduction Focus |
|---------|------|----------------------------|
| **Makepeace** | Flow & Architecture | Accessibility bridge — "you don't have to spend X to get Y" |
| **Halbert** | Entertainment & Hook | Story continuation — product emerges naturally from narrative |
| **Schwartz** | Market Sophistication | Positioning precision — differentiation from saturated claims |
| **Ogilvy** | Credibility & Clarity | Institutional validation — manufacturing, quality, third-party proof |
| **Clemens** | Scientific Clarity | Mechanism-backed introduction — formula explains itself through science |
| **Bencivenga** | Proof-First | Component proof packages — every ingredient/step carries evidence |

#### Execution Sequence

1. **Multi-Perspective Generation** — Each persona generates complete product introduction draft
2. **Judging Round** — Score all 6 candidates against 7 criteria
3. **Ranking & Rationale** — Order candidates by weighted score with strengths/weaknesses
4. **Human Selection Checkpoint** — Present top candidates for human choice

#### Judging Criteria (7 Dimensions)

| Criterion | Weight | What It Measures |
|-----------|--------|------------------|
| Bridge Moment Smoothness | 25% | **CRITICAL** — Does transition feel natural or like a sales pitch? |
| Product Positioning Impact | 15% | Clear positioning + defensible uniqueness claim |
| Component Proof Packaging | 15% | Each component carries proof, not feature listing |
| Value Stack Persuasiveness | 15% | Value established before price, bonuses feel valuable |
| Price Reveal Psychology | 10% | Proper anchoring structure for price reveal |
| Guarantee Positioning | 10% | Branded guarantee, not generic "money-back" |
| Binary Choice Clarity | 10% | Two futures established, no middle ground |

#### Quality Threshold

- **Minimum weighted average:** 8.5/10 to proceed
- **Critical threshold:** Bridge Moment Smoothness must be >= 7 (pitchy bridges are BLOCKING)
- Below threshold → additional generation round with adjusted parameters
- Max 3 Arena iterations before human escalation

**GATE_2.5 (BLOCKING):** Human must explicitly select one candidate. Cannot proceed without human input. All 8 master principles must pass on selected candidate. Selection is logged with rationale.

---

### Layer 3: Refinement & Commercial Architecture

**Purpose:** Build the commercial infrastructure — price reveal, guarantee, scarcity, and emotional architecture calibration.

| Skill | File | Function |
|-------|------|----------|
| 3.1 | `3.1-price-reveal-constructor.md` | Construct the price reveal using selected architecture — descending cascade, comparison anchor, rhetorical questions, per-day, or non-monetary |
| 3.2 | `3.2-guarantee-scarcity-writer.md` | Write the branded guarantee and justified scarcity sections — guarantee is a feature, not a policy |
| 3.3 | `3.3-emotional-architecture-calibrator.md` | Calibrate the 13-step emotional architecture — ensure the sequence from product intro through binary choice follows the universal pattern |
| 3.4 | `3.4-future-pacing-close-setup.md` | Write the future pacing section (positive/negative futures) and set up the binary choice for Skill 14 handoff |

**Execution Order:** 3.1 → 3.2 (sequential) → 3.3, 3.4 (parallel)

**GATE_3:** Price revealed through appropriate architecture with anchor points. Guarantee branded and named. Scarcity justified with real reason. Emotional architecture follows 13-step sequence. Future pacing vivid with binary choice. FAIL = price reveal lacks anchoring OR guarantee generic OR scarcity unjustified OR emotional sequence broken.

---

### Layer 4: Validation & Assembly

**Purpose:** Validate against 8 master principles, anti-slop, vault patterns, and assemble the final package.

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-master-principles-checker.md` | Validate all 8 master principles with evidence for each |
| 4.2 | `4.2-anti-slop-validator.md` | Zero-tolerance check for generic, cliched, or AI-default language |
| 4.3 | `4.3-vault-pattern-comparator.md` | Compare against elite product introductions from TIER1 with differentiation |
| 4.4 | `4.4-final-introduction-assembler.md` | Assemble product-introduction-package.json with all sections, scores, and downstream handoffs |

**Execution Order:** 4.1, 4.2, 4.3 (parallel) → 4.4

**GATE_4:** All 8 principles validated. Anti-slop passes (zero violations). Vault comparison completed. Overall weighted average >= 7.0. Full narrative text assembled. Close handoff packaged. FAIL = principle violation OR slop detected OR score < 7.0.

---

## OUTPUT SCHEMA

```yaml
product_introduction_package:
  metadata:
    skill: "15-product-introduction"
    version: "1.0"
    timestamp: string
    niche: string
    sub_niche: string
    run_id: string

  product_confirmed:
    name: string
    core_offer: string
    format: enum[supplement, digital, physical, information, hybrid]
    positioning_statement: string
    uniqueness_claim: string
    manufacturing_credibility: [string]  # GMP, third-party tested, etc.
    human_checkpoint_response: enum[confirm, modify, provide, partial]
    data_source: enum[offer_package, human_provided, merged]

  pricing_confirmed:
    anchor_price: float
    actual_price: float
    per_day_price: float
    multi_buy_options:
      - quantity: integer
        price: float
        per_unit: float
        savings: string

  bonuses_confirmed:
    - name: string
      description: string
      stated_value: float
      category: string
    total_bonus_value: float
    bonus_count: integer

  guarantee_confirmed:
    type: enum[extreme, strong, moderate, standard]
    duration_days: integer
    branded_name: string
    description: string

  scarcity_confirmed:
    type: string  # one of 5 architectures
    justification: string
    specifics: string

  introduction_strategy:
    introduction_type: string  # one or more of 7 types
    introduction_type_rationale: string
    bridge_architecture: string  # one of 6
    component_reveal_pattern: string  # one of 5
    value_stacking_technique: string  # one of 4
    bonus_introduction_pattern: string  # one of 4
    price_reveal_architecture: string  # one of 5
    product_naming_timing: enum[immediate, late]
    emotional_architecture_phase: string  # which of 13 steps this starts at

  narrative_sections:
    mechanism_saturation_recap:
      text: string
      word_count: integer
      purpose: "Ensure mechanism belief locked before product"
    desire_amplification:
      text: string
      word_count: integer
      technique: enum[personal_results, social_proof, future_pacing]
    bridge_moment:
      text: string
      word_count: integer
      bridge_type: string
      transition_language: string
      feels_like_pitch: boolean  # must be false
    product_reveal:
      text: string
      word_count: integer
      name_introduced: string
      positioning_delivered: boolean
      uniqueness_claimed: boolean
      credibility_signals: [string]
    component_reveal:
      components:
        - name: string
          description: string
          proof_package: string
          text: string
      full_text: string
      word_count: integer
      pattern_used: string
    value_stack:
      bonuses:
        - name: string
          value: float
          description: string
      total_value: float
      full_text: string
      word_count: integer
      technique_used: string
    price_reveal:
      anchor_points: [float]
      final_price: float
      per_day_breakdown: string
      full_text: string
      word_count: integer
      architecture_used: string
    guarantee:
      branded_name: string
      type: string
      duration: string
      full_text: string
      word_count: integer
    scarcity_urgency:
      type: string
      justification: string
      full_text: string
      word_count: integer
    future_pacing:
      positive_future: string
      negative_future: string
      full_text: string
      word_count: integer
    binary_choice_setup:
      choice_a: string  # take action
      choice_b: string  # do nothing
      full_text: string
      word_count: integer

  full_narrative_text: string  # complete assembled prose

  validation:
    scores:
      bridge_smoothness: float
      product_reveal_impact: float
      component_proof_quality: float
      value_stack_effectiveness: float
      price_psychology: float
      guarantee_strength: float
      scarcity_credibility: float
      emotional_architecture: float
      vault_pattern_comparison: float
    overall_weighted_average: float
    master_principles_check:
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
      violations: integer  # must be 0
      pass: boolean

  downstream_handoffs:
    for_close:
      binary_choice_text: string
      future_pacing_context: string
      guarantee_reference: string
      scarcity_reference: string
      emotional_state_at_handoff: string
    for_campaign_assembly:
      full_product_section: string
      product_name: string
      price_final: float
      guarantee_branded_name: string
      bonus_names: [string]
```

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER design the offer** — the offer architecture comes from Skill 06 (or human at checkpoint). This skill WRITES, not designs.
2. **ALWAYS execute human checkpoint** — especially critical since 07-offer may be incomplete.
3. **ALWAYS continue from mechanism narrative** — the product introduction must flow from Skill 15's product bridge.
4. **ALWAYS classify before writing** — Layer 1 classification determines all draft generation patterns.
5. **SEQUENTIAL Layer 2 execution** — product introduction sections build on each other.
6. **NEVER let the bridge feel like a pitch** — the transition from mechanism to product is the most dangerous point (Principle 3).
7. **ALWAYS build value before revealing price** — the sequence is sacrosanct (Principle 5).

### Quality Constraints
8. **Product is NEVER the hero** — the mechanism is always the hero; the product is the delivery vehicle (Principle 1).
9. **Components are PROOF, not features** — each component carries its own mini-proof package (Principle 4).
10. **Guarantee must be NAMED and BRANDED** — "money-back guarantee" is never acceptable; it must be a named feature (Principle 6).
11. **Scarcity must be JUSTIFIED** — naked scarcity without a real reason is never used (Principle 7).
12. **Close is BINARY** — the prospect faces two futures: take action or don't. No middle ground (Principle 8).
13. **Withholding creates value** — product name appears late (60-75%) in story-driven formats (Principle 2).

### Anti-Slop Constraints
14. **ZERO generic language** — no "don't miss out," "act now," "limited time offer" without specific justification.
15. **ZERO generic bonuses** — every bonus must have a specific name, value, and description.
16. **ZERO unjustified pricing** — every price point must be anchored against something real (competitor cost, individual ingredient cost, alternative cost).
17. **ZERO fake urgency** — scarcity claims must have verifiable or plausible backing.

### Integration Constraints
18. **Mechanism handoff continuity** — belief level, emotional state, and mechanism name from Skill 15 must be maintained.
19. **Structure-aligned** — product section must fit within the campaign argument flow from structure-package.
20. **SIN segue compatible** — if structure uses the SIN (Seamlessly Introduce Next) segue, the product introduction must follow that transition pattern.
21. **Close-ready** — the binary choice setup must cleanly hand off to Skill 15's close writing.

### Enforcement Constraints
22. **IF bridge moment feels like sales pitch → REJECT** — the transition from mechanism to product must feel like natural continuation, not jarring commercial shift.
23. **IF product positioning statement missing → HALT** — every product introduction requires explicit positioning; vague product descriptions rejected.
24. **IF component reveals read as feature lists → REJECT** — components must carry proof packages; naked feature dumps trigger rewrite.
25. **IF value presented after price → HALT** — value-before-price sequence is sacrosanct; violations block progression.
26. **IF guarantee not branded with specific name → REJECT** — "money-back guarantee" without branding is never acceptable.
27. **IF scarcity claim lacks justification → REJECT** — naked urgency without real-world reason is automatically rejected.
28. **IF binary choice not established → HALT** — close setup must present exactly two futures (act vs. don't act); middle-ground options rejected.

### Failure Modes

| Mode | Severity | Detection | Handling |
|------|----------|-----------|----------|
| Upstream mechanism-narrative-package.json missing | HIGH | Input validation | HALT with field name + request Skill 12 re-run |
| Offer-package.json incomplete | MEDIUM | Schema validation | Trigger PARTIAL human checkpoint for missing fields |
| Bridge moment feels like a pitch | HIGH | Pitch detector | REJECT + rewrite using story_continuation or accessibility pattern |
| Product positioning vague or missing | HIGH | Positioning validator | HALT + require explicit positioning statement |
| Components presented as features, not proof | MEDIUM | Proof integration check | REJECT + rewrite each component with proof package |
| Value stack incomplete or understated | MEDIUM | Value coverage check | WARN + expand value elements |
| Price revealed before value established | HIGH | Sequence validator | HALT + restructure to value-first order |
| Guarantee generic or unbranded | HIGH | Guarantee branding check | REJECT + brand the guarantee with specific name |
| Scarcity unjustified | MEDIUM | Justification validator | REJECT + add real-world justification |
| Schema violation in output | HIGH | Output validation | REJECT + re-execute failing microskill |

### Anti-Slop Lexicon

NEVER use these words/phrases in generated product introduction output:

**Vague qualifiers:** many, often, most, some, several, usually, typically, around, approximately, about, roughly, nearly, almost, kind of, sort of

**AI telltales:** revolutionary, game-changing, unlock, harness, leverage, dive deep, journey, empower, transform your life, discover the secret, breakthrough, cutting-edge, next-level

**Corporate filler:** comprehensive, robust, innovative, state-of-the-art, synergy, best-in-class, world-class, leading-edge, holistic, optimize, streamline, solution

**Hedge words:** might, could potentially, should consider, may want to, perhaps, arguably, it seems, appears to be, tends to, in some cases

**Copywriting clichés (product intro specific):** imagine if you could, picture this, what if I told you, the truth is, here's the thing, introducing, now available, finally revealed, exclusive access

**Empty intensifiers:** literally, absolutely, totally, completely, incredibly, extremely, amazingly, remarkably, unbelievably, truly

**Product introduction poison words:** amazing bonuses, incredible value, don't miss out, act now (without justification), limited time offer (without specifics), once in a lifetime, best deal ever, no-brainer (without proof), unbeatable

**Banned guarantee phrases:** money-back guarantee (unbranded), if not satisfied return for refund, satisfaction guaranteed (generic), no questions asked (without context)

---

## REMEDIATION PROTOCOL

### Gate Failure Response

| Gate | Common Failures | Remediation |
|------|----------------|-------------|
| Gate 0 | Offer-package incomplete | Trigger PARTIAL human checkpoint to fill gaps |
| Gate 1 | Introduction type doesn't match format | Re-classify considering campaign format constraints |
| Gate 1 | Bridge architecture incompatible with mechanism handoff | Select alternative bridge that continues mechanism narrative naturally |
| Gate 2 | Bridge feels like a pitch | Rewrite using story_continuation or accessibility bridge pattern |
| Gate 2 | Components read as features | Rewrite each component with its own proof package |
| Gate 3 | Price reveal lacks anchoring | Add comparison anchors (competitor cost, ingredient cost, alternative cost) |
| Gate 3 | Guarantee generic | Brand the guarantee with a specific name tied to the mechanism or promise |
| Gate 3 | Scarcity unjustified | Add real-world justification (supply, manufacturing, cost increases) |
| Gate 4 | Master principle violations | Rewrite specific section violating the principle |
| Gate 4 | Anti-slop failure | Replace all generic commercial language with specific, justified alternatives |

### Escalation
- Max 3 remediation iterations per gate
- After 3 failures: HUMAN CHECKPOINT with failure log
- Human may: override score, provide direction, adjust product details, or approve with exceptions

---

## FEEDBACK BUS

### Upstream Dependencies

| Upstream Skill | Trigger Condition | Request Payload |
|----------------|-------------------|-----------------|
| 07-offer | Offer package incomplete or pricing doesn't support narrative | `{ skill: "07-offer", request: "offer_completion", missing: [string] }` |
| 07-offer | Guarantee too weak for the promise made | `{ skill: "07-offer", request: "guarantee_strengthening", current: string }` |
| 14-mechanism-narrative | Product bridge doesn't connect to introduction entry | `{ skill: "14-mechanism-narrative", request: "bridge_alignment", issue: string }` |
| 04-mechanism | Mechanism name doesn't flow naturally into product naming | `{ skill: "04-mechanism", request: "naming_alignment", issue: string }` |
| 08-structure | Product section placement conflicts with SIN segue | `{ skill: "08-structure", request: "sin_segue_adjustment", conflict: string }` |

### Downstream Skills

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| 17-close | product-introduction-package.json assembled | Uses `downstream_handoffs.for_close` |
| Campaign assembly | product-introduction-package.json assembled | Uses `downstream_handoffs.for_campaign_assembly` |

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
- Track bridge architecture smoothness scores across formats
- Track price reveal architecture effectiveness
- Track guarantee strength correlation with conversion indicators
- Track scarcity type credibility scores
- Surface recurring master principle violations for microskill improvement
- Track human checkpoint data provision frequency to measure 07-offer completeness over time

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.3 | 2026-02-12 | Model Assignment Table: Added Binding Model Assignment Table. Haiku for infrastructure (Pre/0), sonnet for classification (1) and packaging (4), opus for generation/Arena/validation (2-3). |
| 1.2 | 2026-02-03 | Added Layer 2.5 Arena integration with 6-persona generation panel, 7 judging criteria (Bridge Moment Smoothness 25%, Product Positioning Impact 15%, Component Proof Packaging 15%, Value Stack Persuasiveness 15%, Price Reveal Psychology 10%, Guarantee Positioning 10%, Binary Choice Clarity 10%), BLOCKING human selection checkpoint at Gate 2.5, 8 master principle compliance verification, pitch detector integration, updated state machine |
| 1.1 | 2026-02-01 | Added Layer 0 verbatim specimen injection: 0.2.5-specimen-decomposer.md + 0.2.6-curated-gold-specimens.md with 6 Gold specimens covering all introduction types, bridge architectures, component patterns, and price architectures. Updated execution order for sequential specimen loading |
| 1.0 | 2026-01-27 | Initial build: TIER1-taught execution skill with human checkpoint, 7 introduction types, 6 bridge architectures, 5 component reveal patterns, 5 price architectures, 8 master principles, 13-step emotional architecture, partial offer data support |
