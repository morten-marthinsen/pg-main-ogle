# Promise Skill — Master Agent

**Version:** 3.1 (RSF-Enhanced)
**Skill:** 05-promise
**Position:** Phase 1, Step 5 (Research & Strategy)
**Type:** Calibration + Synthesis (Orchestrator)
**Dependencies:** 01-research, 02-proof-inventory, 03-root-cause, 04-mechanism outputs
**RSF Dependencies (Optional):** latent_resonance_field.json, expectation_schema.json
**Output:** Final Promise Package (promise-output.json)

---

## RSF ENHANCEMENT (v3.0)

This version adds **RSF-aware promise framing** — the ability to connect promises directly to identified latent emotions and leverage FSSIT (Finally Someone Said It) candidates for resonance depth.

**Core Principle:** Promise TRUTH remains constrained by proof ceiling. Promise FRAMING can be enhanced by RSF intelligence.

**New capabilities:**
- Latent emotion connection for emotional frame selection
- FSSIT alignment for promise framing
- Resonance depth scoring for candidate evaluation
- RSF metadata in output for Big Ideas downstream consumption
- Temporal relevance consideration for promise timing

**Why this matters:** Promises that connect to latent emotions create the "finally someone understands" response that drives conversion. RSF intelligence ensures we're promising what the audience MOST NEEDS TO HEAR, not just what we can prove.

---

## Purpose

Calibrate the PRIMARY PROMISE — the specific, believable, provable promise of transformation that the mechanism can deliver. The promise is the synthesis point that connects root cause, mechanism, and proof into a credible claim.

**Success Criteria:**
- Primary promise selected with score ≥ 8.0
- Supporting promises ≥ 3 with scores ≥ 6.5
- Campaign thesis generated with score ≥ 7.5
- All promises validated (no VALIDATION_FAILED status)
- Proof pairings complete for all promises
- Handoffs ready for 06-big-idea

**Key Insight:** The promise must be calibrated to THREE constraints:
1. **Proof Ceiling** — What can be credibly claimed with available proof
2. **Mechanism Capability** — What the mechanism actually delivers
3. **Schwartz Stage** — What the market will believe at their sophistication level

---

## Identity Boundaries

**This skill IS:**
- Promise calibration against proof ceiling
- Promise generation and variation creation
- Campaign thesis formulation
- Validation against proof, objections, compliance
- Promise-to-proof pairing

**This skill is NOT:**
- Proof inventory or ceiling calculation (that's 02-proof-inventory)
- Root cause derivation (that's 03-root-cause)
- Mechanism development (that's 04-mechanism)
- Big Idea synthesis (that's 06-big-idea)
- Headline writing (promises feed headlines, but this isn't headline skill)
- Copy production (promises are strategic inputs to copy)

**Upstream dependencies:** Deep Research (00), Proof Inventory (01), Root Cause (02), Mechanism (03) must complete before this skill runs.

**Downstream consumers:** Big Ideas (05), Structure (07), and all Phase 3 narrative skills depend on this skill's output.

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Input validation + loading | haiku | Simple validation |
| 1 | Promise generation (raw candidates, calibration) | opus | Deep creative analysis, proof ceiling integration |
| 2 | Promise optimization + variations | opus | Nuanced judgment on promise strength |
| 2.5 | Arena (7 competitors × 3 rounds) | opus | Maximum quality generation |
| 3 | Validation + scoring | opus | Judgment-heavy evaluation |
| 4 | Output packaging | sonnet | Assembly from existing content |

---

## The Promise Formula

From E5 Method (Todd Brown):

> "A big, bold, audacious, true and believable promise of specific result"

Each word matters:
- **Big, Bold, Audacious** — Exciting enough to get prospect's attention
- **True** — Actually achievable, not fabricated
- **Believable** — Market-calibrated for skepticism level
- **Specific** — Concrete, measurable, visual

---

## Why Promise Position Matters

### Schwartz Stage → Promise Strategy

| Stage | Promise Role | Strategy |
|-------|-------------|----------|
| Stage 1 | Promise IS the Big Idea | Big promise alone sells |
| Stage 2 | Bigger/better promise | Amplify what works |
| Stage 3 | Promise + Mechanism | Mechanism makes promise credible |
| Stage 4 | New Mechanism + Promise | Unique mechanism carries the promise |
| Stage 5 | Identity + Promise | Promise wrapped in identification |

In early markets (1-2), the promise stands alone.
In late markets (4-5), the promise is foundation that mechanism and Big Idea build upon.

---

## Architecture: 4 Layers, 28 Microskills

```
LAYER 1: GENERATION (7 microskills)
├── 1.1 Blue Sky Promise Generation
├── 1.2 Promise Type Classification
├── 1.3 Emotional Frame Mapping
├── 1.4 Specificity Enhancement
├── 1.5 Mechanism Connection Drafting
├── 1.6 Customer Language Integration
└── 1.7 Candidate Assembly
         ↓
LAYER 2: CALIBRATION (7 microskills)
├── 2.1 Proof Ceiling Application
├── 2.2 Schwartz Stage Calibration
├── 2.3 Mechanism Fit Verification
├── 2.4 Competitor Differentiation
├── 2.5 Campaign Thesis Generation
├── 2.6 Calibration Scoring
└── 2.7 Top Candidate Ranking
         ↓
LAYER 3: VALIDATION (7 microskills)
├── 3.1 Proof Verification
├── 3.2 Objection Resilience
├── 3.3 Believability Testing
├── 3.4 Compliance Check
├── 3.5 Customer Voice Validation
├── 3.6 Mechanism Story Coherence
└── 3.7 Validation Assembly
         ↓
LAYER 4: OUTPUT PACKAGING (7 microskills)
├── 4.1 Primary Promise Selection
├── 4.2 Supporting Promise Selection
├── 4.3 Promise Variations
├── 4.4 Usage Matrix
├── 4.5 Proof Pairing
├── 4.6 Copy Integration Guide
└── 4.7 Final Output Assembly
```

---

## Layer 1: Generation

**Purpose:** Generate raw promise candidates from all available inputs.

| Microskill | Purpose | Document |
|------------|---------|----------|
| **1.1 Blue Sky Promise Generation** | Generate unconstrained promise ideas from all inputs | [1.1-blue-sky-promise-generation.md](skills/layer-1/1.1-blue-sky-promise-generation.md) |
| **1.2 Promise Type Classification** | Classify by type: transformation, improvement, relief, capability, prevention | [1.2-promise-type-classification.md](skills/layer-1/1.2-promise-type-classification.md) |
| **1.3 Emotional Frame Mapping** | Map emotional frames: hope, frustration_relief, fear_escape, vindication, freedom, control | [1.3-emotional-frame-mapping.md](skills/layer-1/1.3-emotional-frame-mapping.md) |
| **1.4 Specificity Enhancement** | Add timeframes, quantities, qualifiers for concreteness | [1.4-specificity-enhancement.md](skills/layer-1/1.4-specificity-enhancement.md) |
| **1.5 Mechanism Connection Drafting** | Draft mechanism-connected promise versions | [1.5-mechanism-connection-drafting.md](skills/layer-1/1.5-mechanism-connection-drafting.md) |
| **1.6 Customer Language Integration** | Integrate actual customer vocabulary | [1.6-customer-language-integration.md](skills/layer-1/1.6-customer-language-integration.md) |
| **1.7 Candidate Assembly** | Assemble all candidates with metadata for calibration | [1.7-candidate-assembly.md](skills/layer-1/1.7-candidate-assembly.md) |

**Layer 1 Output:** 15-25 raw promise candidates with type, frame, and mechanism tags.

### RSF-Aware Emotional Frame Selection (v3.0)

When RSF inputs are available, Layer 1 emotional framing gains intelligence:

```
IN 1.3-emotional-frame-mapping:
  IF latent_resonance_field.json available:
    LOAD: latent_emotions, fssit_candidates, emotional_momentum

    FOR each promise candidate:
      EVALUATE: Which latent emotion does this promise address?

      IF promise connects to high-momentum latent_emotion:
        BOOST: Resonance potential (+2)
        PRIORITIZE: This emotional frame
        NOTE: "Promise connects to increasing emotional territory"

      IF promise framing aligns with FSSIT candidate:
        STRONGLY BOOST: Resonance potential (+3)
        DOCUMENT: FSSIT alignment
        NOTE: "Promise crystallizes unspoken desire"

    EMOTIONAL FRAME PRIORITIZATION:
      1. Frames connecting to highest-momentum latent emotions
      2. Frames that align with FSSIT candidates
      3. Frames with "increasing" temporal_relevance
      4. Standard frame selection (existing logic)

IN 1.4-specificity-enhancement:
  IF FSSIT candidates available:
    CONSIDER: Can promise be framed AS a FSSIT statement?
    IF yes: Generate FSSIT-aligned variation

IN 2.4-competitor-differentiation:
  IF expectation_schema.json available:
    CHECK: Does promise fall into saturated_claims territory?
    IF yes: Adjust framing to occupy whitespace
```

**RSF-Enhanced Emotional Frame Prioritization:**

| Frame | Standard Priority | RSF Boost Condition |
|-------|------------------|---------------------|
| **Hope** | High for transformations | +2 if connects to "rising" latent emotion |
| **Frustration Relief** | High for relief promises | +3 if aligns with FSSIT candidate |
| **Fear Escape** | Medium | +2 if addresses latent fear emotion |
| **Vindication** | Medium | +2 if connects to unexpressed resentment |
| **Freedom** | High for capability promises | +2 if crystallizes "trapped" feeling |
| **Control** | Medium | +2 if addresses latent powerlessness |

**FSSIT-Promise Integration:**

When FSSIT candidates are available, consider:
1. Can the promise BE the FSSIT statement? (Strongest)
2. Can the promise DELIVER on a FSSIT desire? (Strong)
3. Can the promise FRAME around FSSIT language? (Good)

Example:
- FSSIT: "I wish someone would just tell me what actually works"
- Promise as FSSIT: "Finally, a simple answer to what actually works"
- Promise delivering FSSIT: "Know exactly what to do — no more guessing"
- Promise framing around FSSIT: "The one method that actually works"

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

## Layer 2: Calibration

**Purpose:** Calibrate promises against proof ceiling, Schwartz stage, mechanism fit, and competitive landscape.

| Microskill | Purpose | Document |
|------------|---------|----------|
| **2.1 Proof Ceiling Application** | Apply proof inventory ceiling to each promise | [2.1-proof-ceiling-application.md](skills/layer-2/2.1-proof-ceiling-application.md) |
| **2.2 Schwartz Stage Calibration** | Calibrate promise language for market sophistication stage | [2.2-schwartz-stage-calibration.md](skills/layer-2/2.2-schwartz-stage-calibration.md) |
| **2.3 Mechanism Fit Verification** | Verify mechanism can deliver what promise claims | [2.3-mechanism-fit-verification.md](skills/layer-2/2.3-mechanism-fit-verification.md) |
| **2.4 Competitor Differentiation** | Ensure promise stands apart from competitor claims | [2.4-competitor-differentiation.md](skills/layer-2/2.4-competitor-differentiation.md) |
| **2.5 Campaign Thesis Generation** | Generate campaign thesis: "[superiority] way to [promise] is [mechanism]" | [2.5-campaign-thesis-generation.md](skills/layer-2/2.5-campaign-thesis-generation.md) |
| **2.6 Calibration Scoring** | Score all calibration dimensions, generate composite | [2.6-calibration-scoring.md](skills/layer-2/2.6-calibration-scoring.md) |
| **2.7 Top Candidate Ranking** | Rank candidates, select top 5-10 for validation | [2.7-top-candidate-ranking.md](skills/layer-2/2.7-top-candidate-ranking.md) |

**Layer 2 Output:** 10-15 calibrated promises with scores, campaign thesis, top candidate ranking.

---

## Layer 3: Validation

**Purpose:** Validate top candidates against proof, objections, believability, compliance, voice, and story coherence.

| Microskill | Purpose | Document |
|------------|---------|----------|
| **3.1 Proof Verification** | Verify specific proof exists for each promise claim | [3.1-proof-verification.md](skills/layer-3/3.1-proof-verification.md) |
| **3.2 Objection Resilience** | Test promise against likely objections | [3.2-objection-resilience.md](skills/layer-3/3.2-objection-resilience.md) |
| **3.3 Believability Testing** | Test believability factors: plausibility, specificity, effort alignment | [3.3-believability-testing.md](skills/layer-3/3.3-believability-testing.md) |
| **3.4 Compliance Check** | Check FTC, health claims, platform policies, testimonial rules | [3.4-compliance-check.md](skills/layer-3/3.4-compliance-check.md) |
| **3.5 Customer Voice Validation** | Validate promise uses customer vocabulary | [3.5-customer-voice-validation.md](skills/layer-3/3.5-customer-voice-validation.md) |
| **3.6 Mechanism Story Coherence** | Verify promise fits mechanism narrative arc | [3.6-mechanism-story-coherence.md](skills/layer-3/3.6-mechanism-story-coherence.md) |
| **3.7 Validation Assembly** | Assemble validation results, assign final validation status | [3.7-validation-assembly.md](skills/layer-3/3.7-validation-assembly.md) |

**Layer 3 Output:** Validated promises with status (FULLY_VALIDATED, VALIDATED, CONDITIONAL_PASS, VALIDATION_FAILED).

---

## Layer 4: Output Packaging

**Purpose:** Package validated promises into deployment-ready deliverables.

| Microskill | Purpose | Document |
|------------|---------|----------|
| **4.1 Primary Promise Selection** | Confirm primary promise with E5 criteria | [4.1-primary-promise-selection.md](skills/layer-4/4.1-primary-promise-selection.md) |
| **4.2 Supporting Promise Selection** | Select 3-5 supporting promises with roles | [4.2-supporting-promise-selection.md](skills/layer-4/4.2-supporting-promise-selection.md) |
| **4.3 Promise Variations** | Generate copy-ready variations (headline, hook, question, future_pace, etc.) | [4.3-promise-variations.md](skills/layer-4/4.3-promise-variations.md) |
| **4.4 Usage Matrix** | Map promises to copy positions (lead, thesis, proof, close, etc.) | [4.4-usage-matrix.md](skills/layer-4/4.4-usage-matrix.md) |
| **4.5 Proof Pairing** | Pair each promise with optimal proof elements | [4.5-proof-pairing.md](skills/layer-4/4.5-proof-pairing.md) |
| **4.6 Copy Integration Guide** | Generate position-specific integration instructions | [4.6-copy-integration-guide.md](skills/layer-4/4.6-copy-integration-guide.md) |
| **4.7 Final Output Assembly** | Assemble complete deployment package | [4.7-final-output-assembly.md](skills/layer-4/4.7-final-output-assembly.md) |

**Layer 4 Output:** Complete Promise Package with primary, supporting, variations, usage matrix, proof pairings, integration guide.

---

## Input Schema

```yaml
promise_input:
  from_02_proof_inventory:
    overall_strength_score: integer (0-100)
    promise_ceiling: enum[transformation, significant_improvement, noticeable_improvement, some_benefit, minimal]
    strongest_proof_categories: [string]
    believability_constraints: [string]
    specific_proof_for_claims:
      - claim_supported: string
        proof_element: string

  from_03_root_cause:
    surface_problem: string
    real_root_cause: string
    villain_name: string
    countersell_targets: [string]
    mechanism_link: string

  from_04_mechanism:
    mechanism_name: string
    mechanism_type: string
    superiority_claim: string
    what_it_does: string
    e5_scorecard:
      image_strength: integer
      simplicity: integer
      proof: integer
      differentiation: integer

  from_01_deep_research:
    schwartz_stage: integer (1-5)
    market_psychology:
      hope_level: integer
      skepticism_level: integer
    competitor_promises: [string]
    saturated_claims: [string]
    customer_language:
      desired_outcomes: [string]
      how_they_describe_success: [string]

  product_context:
    product_name: string
    niche: string
    now_after_grid:
      now: [string]
      after: [string]

  from_rsf_optional:
    expectation_schema:          # From layer-2-rsf-outputs/expectation_schema.json
      saturated_claims: [object] # Claims with staleness scores
      whitespace_zones: [object] # Unexploited messaging territory
    latent_resonance_field:      # From layer-2-rsf-outputs/latent_resonance_field.json
      fssit_candidates: [object] # "Finally Someone Said It" statements
      latent_emotions: [object]  # Unexpressed emotional themes
      emotional_momentum: object # Temporal emotion tracking
```

**Layer 0: RSF Data Loading (Optional Enhancement):**

```
STEP: Load RSF Data
  1. CHECK: Does [project]/layer-2-rsf-outputs/expectation_schema.json exist?
  2. CHECK: Does [project]/layer-2-rsf-outputs/latent_resonance_field.json exist?
  3. IF BOTH exist:
     - Load both files
     - SET rsf_inputs_available: true
     - Extract fssit_candidates for emotional frame alignment
     - Extract saturated_claims for promise differentiation check
     - Log: "RSF data loaded — emotional frame and promise differentiation enhancement active"
  4. IF EITHER missing:
     - SET rsf_inputs_available: false
     - Log: "RSF data unavailable — proceeding with standard promise generation"
     - Continue without RSF enhancement (v3.0 conditional logic handles this)
```

---

## Output Schema

```yaml
promise_output:
  # Executive Summary
  executive_summary:
    primary_promise: string
    campaign_thesis: string
    supporting_count: integer
    validation_status: string
    proof_level: string
    ready_for_copy: boolean

  # Primary Promise Package
  primary_promise_package:
    promise_id: string
    tier: "PRIMARY"
    core_statement:
      full: string
      core: string
    variations_by_type:
      statement: [variation]
      headline: [variation]
      hook: [variation]
      question: [variation]
      future_pace: [variation]
      benefit_bullet: [variation]
      subject_line: [variation]
    variations_by_position:
      lead: variation
      thesis_statement: variation
      close: variation
    validation:
      status: string
      composite_score: float
      dimension_scores: object
    proof_package:
      primary_proof: object
      position_proof: object
    usage_guidance:
      assigned_positions: [string]
      primary_positions: [string]
    compliance:
      disclaimers_required: [string]
      platform_restrictions: [object]

  # Supporting Promise Packages
  supporting_promise_packages:
    - promise_id: string
      tier: "SUPPORTING"
      role: string
      core_statement: object
      variations: object
      validation: object
      proof: object
      usage: object

  # Campaign Thesis Package
  campaign_thesis_package:
    primary_thesis:
      statement: string
      components:
        superiority: string
        promise: string
        mechanism: string
        villain: string
      score: float
    runners_up: [thesis]
    variations:
      headline_version: string
      subhead_version: string
      body_intro_version: string
      close_version: string
    competitive_positioning:
      unique_claim: string
      differentiated_from: [string]

  # Copy Integration Guide
  copy_integration_guide:
    copy_format: string
    section_instructions: object
    transitions: object
    integration_checklist: object

  # Deployment Checklist
  deployment_checklist:
    before_writing: [string]
    during_writing: [object]
    after_writing: [string]
    before_publishing: [string]

  # Appendices
  appendices:
    testing_recommendations: object
    proof_inventory_reference: object
    full_validation_report: object

  # RSF v3.0: RSF Integration Metadata
  rsf_metadata:
    rsf_inputs_available: boolean
    resonance_connection:
      primary_promise_latent_emotion: string  # Which latent emotion primary promise connects to
      emotion_momentum: enum[increasing, stable, declining]
      connection_strength: integer[1-10]
      fssit_alignment:
        aligned: boolean
        fssit_candidate: string  # The FSSIT statement it aligns with (if any)
        alignment_type: enum[promise_is_fssit, promise_delivers_fssit, promise_frames_fssit, none]
    supporting_promises_resonance:
      - promise_id: string
        latent_emotion: string
        fssit_aligned: boolean
    emotional_frame_rsf_influence:
      frames_boosted_by_rsf: [string]  # Which frames were prioritized due to RSF
      rsf_contribution_notes: string
    temporal_fit:
      temporal_relevance: enum[high, evergreen, declining]
      timing_notes: string
```

---

## Execution Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        LAYER 1: GENERATION                       │
│  1.1 Blue Sky → 1.2 Type → 1.3 Frame → 1.4 Specificity →        │
│  1.5 Mechanism → 1.6 Customer Voice → 1.7 Assembly              │
│                                                                  │
│  OUTPUT: 15-25 raw promise candidates                           │
└─────────────────────────┬───────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                       LAYER 2: CALIBRATION                       │
│  2.1 Proof Ceiling → 2.2 Stage → 2.3 Mechanism → 2.4 Competitor │
│  → 2.5 Thesis → 2.6 Scoring → 2.7 Ranking                       │
│                                                                  │
│  OUTPUT: 10-15 calibrated promises + campaign thesis            │
└─────────────────────────┬───────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                       LAYER 3: VALIDATION                        │
│  3.1 Proof → 3.2 Objection → 3.3 Believability → 3.4 Compliance │
│  → 3.5 Voice → 3.6 Coherence → 3.7 Assembly                     │
│                                                                  │
│  OUTPUT: Validated promises with status assignments             │
└─────────────────────────┬───────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                     LAYER 4: OUTPUT PACKAGING                    │
│  4.1 Primary → 4.2 Supporting → 4.3 Variations → 4.4 Matrix →   │
│  4.5 Proof Pairing → 4.6 Integration Guide → 4.7 Final Assembly │
│                                                                  │
│  OUTPUT: Complete Promise Package                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Core Principles (From Source Teachings)

### 1. Specificity Sells, Vague Falls Flat

**Vague:** "Lose a lot of weight fast"
**Specific:** "Burn 8 pounds of belly fat in the next 72 hours"

Specific promises:
- Create concrete mental picture
- Sound more credible
- Enable better proof matching
- Narrow but more powerful

### 2. Blue Sky First, Then Back Down

Process:
1. Start with biggest possible promise
2. Ask: "Can I prove this?"
3. If no, back down until provable
4. Never start small and try to inflate

### 3. Now/After Grid Drives Promise

| NOW (Problems) | AFTER (Promise) |
|----------------|-----------------|
| What they deal with daily | What life looks like when solved |
| Pain points | Relief points |
| Limitations | New capabilities |
| Frustrations | Satisfactions |

The promise bridges NOW → AFTER.

### 4. Campaign Thesis Formula

> "The [superiority] way to [promise] is with [mechanism]"

Example: "The ONLY way to finally end your cravings is with the Gut Reset Protocol"

This formula connects mechanism to promise with a superiority claim.

### 5. Promise Types

| Type | Definition | Example |
|------|------------|---------|
| **Transformation** | Complete state change | "Go from overweight to your ideal body" |
| **Improvement** | Enhancement of existing state | "Get better sleep" |
| **Relief** | Removal of negative state | "End your cravings" |
| **Capability** | New ability gained | "Finally feel in control" |
| **Prevention** | Avoiding future negative state | "Never struggle with cravings again" |

### 6. Emotional Frames

| Frame | Core Emotion | Language Patterns |
|-------|--------------|-------------------|
| **Hope** | Possibility, optimism | "Imagine...", "What if...", "possible" |
| **Frustration Relief** | Finally-ness | "Finally...", "After years...", "no more" |
| **Fear Escape** | Safety, avoidance | "Avoid...", "never worry", "protect" |
| **Vindication** | Proving doubters wrong | "Show them...", "prove that..." |
| **Freedom** | Liberation | "Free from...", "without...", "break free" |
| **Control** | Mastery, agency | "Take control...", "in your hands", "choose" |

---

## Constraints

### Input Constraints
- NEVER proceed without proof_inventory outputs (especially promise_ceiling)
- NEVER proceed without root_cause_package from 03-root-cause
- NEVER proceed without mechanism_package from 04-mechanism
- NEVER proceed without schwartz_stage from 01-research
- NEVER accept promise_ceiling = BLOCKED (must address proof gaps first)

### Generation Constraints (Layer 1)
- NEVER produce vague promises — Specificity is mandatory (timeframes, quantities, qualifiers required)
- NEVER generate fewer than 15 raw candidates
- NEVER proceed without all 5 promise types represented (transformation, improvement, relief, capability, prevention)
- NEVER proceed without at least 3 emotional frames used
- NEVER skip customer language integration

### RSF Generation Constraints (Layer 1 — v3.0)
- WHEN RSF inputs available: MUST evaluate emotional frames against latent_resonance_field
- WHEN FSSIT candidates available: MUST generate at least 2 FSSIT-aligned promise variations
- WHEN latent emotion has "increasing" momentum: SHOULD prioritize frames connecting to that emotion
- NEVER ignore high-momentum latent emotions when selecting emotional frames
- ALWAYS document RSF influence on frame selection in rsf_metadata
- ALWAYS set rsf_inputs_available: false when RSF data not present
- WHEN promise aligns with FSSIT: MUST document alignment_type in rsf_metadata

### Calibration Constraints (Layer 2)
- NEVER claim beyond proof ceiling — Respect proof inventory limits exactly
- NEVER ignore Schwartz stage — Market calibration required for every promise
- NEVER disconnect from mechanism — Promise must be what mechanism delivers
- NEVER claim what competitors already claim — Check saturated_claims list
- NEVER proceed without campaign thesis generated
- NEVER pass primary promise with score < 8.0
- NEVER pass supporting promise with score < 6.5
- NEVER pass campaign thesis with score < 7.5

### Validation Constraints (Layer 3)
- NEVER output primary promise with status = VALIDATION_FAILED
- NEVER output promise without proof verification completed
- NEVER skip compliance check (FTC, health claims, platform policies)
- NEVER pass promise with high-severity objection resilience failure
- NEVER pass promise that fails mechanism story coherence

### Output Constraints (Layer 4)
- NEVER output without primary promise package complete
- NEVER output without at least 3 supporting promise packages
- NEVER output without all variation types generated (statement, headline, hook, question, future_pace, benefit_bullet, subject_line)
- NEVER output without usage matrix covering all copy positions
- NEVER output without proof pairings for every promise
- NEVER handoff to 06-big-idea without campaign_thesis validated

### Quality Constraints
- ALWAYS produce multiple variations — Bold, safe, niche-specific for each promise
- ALWAYS verify provability — Every claim needs proof pathway from 02-proof-inventory
- ALWAYS pair promises with proof — No orphan claims allowed
- ALWAYS include disclaimers_required in compliance section
- ALWAYS document mechanism alignment explicitly

---

## Trigger-Template Refusals

### Refuse to Proceed When:
- **Missing proof ceiling:** "Cannot calibrate promises without promise_ceiling from 02-proof-inventory. Run proof inventory first."
- **Proof ceiling BLOCKED:** "Proof ceiling is BLOCKED due to critical gaps. Cannot formulate promises. Address proof gaps in 02-proof-inventory first."
- **Missing mechanism:** "Cannot calibrate promises without mechanism_package from 04-mechanism. Promise must deliver what mechanism provides."
- **Compliance blocker:** "Promise '[X]' fails compliance check: [specific violation]. Cannot output until remediated or removed."
- **Primary promise fails:** "No primary promise candidate achieved score ≥ 8.0 after all calibration. Best candidate: [X] with score [Y]. Return to Layer 1 for regeneration."

---

### Three-Tier Uncertainty Protocol

When encountering ambiguous inputs, missing context, or unclear instructions:

- **HIGH CONFIDENCE (>90%):** Proceed with execution. No flag needed.
- **MEDIUM CONFIDENCE (60-90%):** Proceed but FLAG the assumption in output metadata. Document what was assumed and why.
- **LOW CONFIDENCE (<60%):** HALT execution. Log the uncertainty source. Request clarification before proceeding.

NEVER proceed at low confidence. NEVER suppress medium-confidence flags.

---

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

---

### Post-Tool Reflection

AFTER EVERY SKILL EXECUTION, verify:
1. Output file exists and is non-empty
2. Output schema matches the expected contract from the skill's output specification
3. No quality gate violations are present in the output
4. Context state is updated to reflect the completed step
5. The next skill in the sequence is identified and its inputs are confirmed available

IF any verification fails: LOG the failure, HALT the pipeline, and REPORT which verification failed and why.

---

## Post-Processing Checkpoint

Before finalizing output, verify:

1. **Proof Ceiling Respected:** No promise exceeds ceiling from 02-proof-inventory
2. **Mechanism Alignment:** Every promise deliverable by mechanism
3. **Schwartz Calibration:** Language matches market sophistication stage
4. **Competitor Differentiation:** No promise duplicates saturated claims
5. **Validation Status:** Primary = FULLY_VALIDATED or VALIDATED, no VALIDATION_FAILED
6. **Proof Pairings:** Every promise has ≥1 proof element mapped
7. **Compliance Clear:** No unresolved compliance blockers
8. **Handoff Completeness:** All downstream skill handoffs populated

If any check fails → return to relevant layer for correction before output.

---

## Layer Gate Criteria

### Layer 1 Gate (Generation → Calibration)
- Minimum 15 raw candidates generated
- All 5 promise types represented
- At least 3 emotional frames used
- Mechanism-connected versions for top candidates
- Customer language integration attempted

### Layer 2 Gate (Calibration → Validation)
- Primary promise selected (score >= 8.0)
- Supporting promises >= 3 (scores >= 6.5)
- Campaign thesis generated (score >= 7.5)
- Promise type coverage >= 3 types
- No mechanism misalignments in top 10

### Layer 3 Gate (Validation → Output)
- Primary promise: FULLY_VALIDATED or VALIDATED
- Supporting promises validated >= 3
- No compliance blockers
- All high-severity issues addressed

### Layer 4 Gate (Output → Handoff)
- Primary promise package complete
- 3-5 supporting promise packages complete
- All variations generated
- Usage matrix covers all positions
- Proof pairings complete
- Integration guide generated
- Deployment checklist included

---

## Handoffs

### To 06-big-idea
- Campaign thesis for Big Idea synthesis
- Primary promise constraints
- Differentiation positioning

### To 08-structure
- Promise placement positions
- Proof pairing by section
- Integration instructions

### To Copywriter
- Complete Promise Package
- Deployment checklist
- Testing recommendations

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

---

## CONSTRAINTS ENFORCEMENT

### Mandatory Execution Constraints
- MUST validate all upstream inputs before generation begins
- MUST NOT proceed without proof_inventory with promise_ceiling defined
- MUST NOT proceed without root_cause_package from 03-root-cause
- MUST NOT proceed without mechanism_package from 04-mechanism
- MUST NOT proceed if promise_ceiling = BLOCKED
- NEVER claim beyond the proof ceiling — this is inviolable
- MUST generate minimum 15 raw promise candidates in Layer 1
- MUST represent all 5 promise types (transformation, improvement, relief, capability, prevention)
- MUST use at least 3 emotional frames in generation
- ONLY pass primary promise with calibration score ≥ 8.0
- ONLY pass supporting promises with calibration score ≥ 6.5
- ONLY pass campaign thesis with score ≥ 7.5
- NEVER output primary promise with VALIDATION_FAILED status
- MUST complete compliance check (FTC, health claims, platform policies) for all promises
- NEVER output without proof pairings for every promise
- MUST include all variation types (statement, headline, hook, question, future_pace, benefit_bullet, subject_line)
- NEVER disconnect promise from mechanism — promise is what mechanism delivers
- MUST verify Schwartz stage calibration for market sophistication alignment
- MUST document disclaimers_required in compliance section

### Active Quality Gate Enforcement

```
IF proof_inventory missing or promise_ceiling undefined:
  LOG: "[INPUT_VALIDATION] FAILED: proof_inventory missing or ceiling undefined"
  ACTION: HALT
  REMEDIATION: Run 02-proof-inventory before proceeding

IF promise_ceiling = BLOCKED:
  LOG: "[INPUT_VALIDATION] FAILED: Promise ceiling BLOCKED due to critical proof gaps"
  ACTION: HALT
  REMEDIATION: Address proof gaps in 02-proof-inventory first

IF raw_candidates < 15:
  LOG: "[LAYER_1_GATE] FAILED: Only [N] candidates generated, minimum is 15"
  ACTION: HALT
  REMEDIATION: Expand generation with additional emotional frames and promise types

IF primary_promise_score < 8.0:
  LOG: "[LAYER_2_GATE] FAILED: Primary promise score [X] below minimum 8.0"
  ACTION: HALT
  REMEDIATION: Recalibrate promises; return to Layer 1 if needed

IF campaign_thesis_score < 7.5:
  LOG: "[LAYER_2_GATE] FAILED: Campaign thesis score [X] below minimum 7.5"
  ACTION: HALT
  REMEDIATION: Revise thesis to strengthen superiority + mechanism + promise connection

IF compliance_check fails:
  LOG: "[LAYER_3_GATE] FAILED: Compliance violation [specific issue]"
  ACTION: HALT
  REMEDIATION: Revise or remove promise; document required disclaimers

IF proof_pairings incomplete:
  LOG: "[LAYER_4_GATE] FAILED: Promise [ID] has no proof pairing"
  ACTION: HALT
  REMEDIATION: Map proof elements to all promises before output
```

---

### Failure Modes
| Mode | Severity | Detection | Handling |
|------|----------|-----------|----------|
| Upstream proof_inventory missing | HIGH | Input validation | HALT with remediation: run 02-proof-inventory |
| Upstream root_cause missing | HIGH | Input validation | HALT with remediation: run 03-root-cause |
| Upstream mechanism missing | HIGH | Input validation | HALT with remediation: run 04-mechanism |
| Promise ceiling = BLOCKED | HIGH | Ceiling check | HALT + address proof gaps before proceeding |
| Fewer than 15 raw candidates | MEDIUM | Layer 1 gate | REJECT + expand generation |
| Promise type coverage < 5 | MEDIUM | Layer 1 gate | REJECT + add missing promise types |
| Primary promise score < 8.0 | HIGH | Layer 2 gate | HALT + recalibrate or regenerate |
| Supporting promises < 3 | MEDIUM | Layer 2 gate | REJECT + add supporting promises |
| Campaign thesis score < 7.5 | HIGH | Layer 2 gate | HALT + revise thesis |
| Compliance blocker detected | HIGH | Layer 3 validation | HALT + remediate or remove promise |
| Proof pairing missing | MEDIUM | Layer 4 validation | REJECT + complete pairings |
| Variation types incomplete | MEDIUM | Layer 4 validation | REJECT + generate all 7 variation types |
| Mechanism misalignment detected | HIGH | Layer 2 validation | HALT + verify promise deliverable by mechanism |
| Handoff schema mismatch | HIGH | Output validation | REJECT + re-package per downstream schema |

---

### Anti-Slop Lexicon
NEVER use these words/phrases in promise copy:

**Vague quantifiers (replace with specifics):**
- many, often, most, some, several, usually, typically, around, approximately, various, numerous

**AI telltales (ban entirely):**
- revolutionary, game-changing, unlock, harness, leverage, dive deep, journey, empower, cutting-edge, groundbreaking, transformative, seamlessly

**Corporate filler (eliminate):**
- comprehensive, robust, innovative, state-of-the-art, synergy, holistic, streamlined, best-in-class, world-class

**Hedge words (replace with definitive statements):**
- might, could potentially, should consider, may want to, perhaps, arguably, it seems, appears to be

**Filler phrases (delete):**
- it's important to note, as you can see, needless to say, at the end of the day, in today's world

**Promise-specific slop (ban):**
- amazing results, incredible transformation, life-changing, unbelievable, miracle, instant, overnight (unless provable)

---

## Status

**VERSION 3.0** — RSF-Enhanced per system-wide RSF integration initiative.

**Changes from v2.1:**
- Added RSF Dependencies (optional) to header
- Added RSF Enhancement section explaining v3.0 capabilities
- Added RSF-Aware Emotional Frame Selection section to Layer 1
- Added rsf_metadata to output schema for downstream Big Ideas consumption
- Added 7 RSF Generation Constraints
- Emotional frame selection now considers latent_resonance_field
- FSSIT-aligned promise variations now generated when RSF data available
- Emotional momentum tracking influences frame prioritization

**Key Principle:** Promise TRUTH remains constrained by proof ceiling. Promise FRAMING can be enhanced by RSF intelligence.

**Changes from v2.0 (retained in v2.1):**
- Added Identity Boundaries section
- Expanded constraints to 34 explicit NEVER/ALWAYS statements (including 7 RSF constraints)
- Added Post-Processing Checkpoint
- Added Trigger-Template Refusals
- Added Success Criteria to Purpose
- Strengthened compliance integration

**Layer Status:**
- Layer 1: Generation — 7 microskills + RSF enhancement section
- Layer 2: Calibration — 7 microskills complete
- Layer 3: Validation — 7 microskills complete
- Layer 4: Output Packaging — 7 microskills complete

**Total Microskills:** 28

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 3.1 | 2026-02-12 | Model Assignment Table: Added Binding Model Assignment Table mapping haiku/sonnet/opus to layers. Haiku for infrastructure (Pre/0), opus for analysis/generation/Arena/validation (1-3), sonnet for packaging (4). |
| 2.0 | — | Initial 4-layer architecture with proof ceiling calibration |
| 2.1 | — | NateJones audit enhancements (constraints, boundaries, gates) |
| 3.0 | 2026-01-29 | RSF integration: latent emotion connection, FSSIT alignment, emotional momentum |
