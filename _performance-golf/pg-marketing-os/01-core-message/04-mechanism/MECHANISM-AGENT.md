# Mechanism Skill — Master Agent

**Version:** 4.1 (Expression Anchoring Protocol + Concept/Naming Separation + Soul.md Integration + Process Enforcement)
**Skill:** 04-mechanism
**Position:** Phase 1, Step 4 (Research & Strategy)
**Type:** Orchestrator (State Machine)
**Inputs:** Root Cause Package (02), Market Research (00), Proof Inventory (01), Vault Intelligence, Source Teachings, SOUL.md (project-level)
**RSF Dependencies (Optional):** expectation_schema.json, latent_resonance_field.json, competitive_sophistication_audit.json
**Output:** mechanism-package.json

---

## RSF ENHANCEMENT (v3.0)

This version adds **RSF-aware mechanism naming and differentiation** — the ability to leverage expectation schema intelligence when creating mechanism names and evaluating differentiation.

**Core Principle:** Mechanism FUNCTION is not affected by RSF. Mechanism NAMING and POSITIONING can be.

**New capabilities:**
- Whitespace-aware naming: Avoid saturated mechanism naming patterns
- Schema distance evaluation for mechanism names
- Integration with competitive_sophistication_audit for naming originality
- RSF metadata in output for Big Ideas downstream consumption
- Latent emotion connection for mechanism framing

**Why this matters:** Mechanisms that occupy naming whitespace create stronger differentiation scores and feed cleaner inputs to Big Ideas.

---

## Purpose

Orchestrate the mechanism development pipeline — transforming market research, root cause diagnosis, and proof inventory into a fully scored, proof-backed, named mechanism ready for downstream copy skills.

**Success Criteria:**
- Mechanism name created and validated
- 13-dimension scorecard completed with weighted average ≥ 7.0
- All primary dimensions score ≥ 7, supporting dimensions ≥ 5
- Proof elements mapped to mechanism claims
- Handoffs complete for 05-promise and 06-big-idea

**This agent NEVER performs analysis or generation itself.** It sequences microskills, validates gates, and manages state.

---

## Identity Boundaries

**This skill IS:**
- Orchestration of mechanism development pipeline
- Gate validation between layers
- State machine management
- Microskill sequencing and coordination

**This skill is NOT:**
- Root cause derivation (that's 03-root-cause)
- Promise calibration (that's 05-promise)
- Big Idea synthesis (that's 06-big-idea)
- Mechanism NARRATIVE writing (that's 14-mechanism-narrative)
- Direct analysis or creative generation (delegated to microskills)

**Upstream dependencies:** Deep Research (00), Proof Inventory (01), Root Cause (02) must complete before this skill runs.

**Downstream consumers:** Promise (04), Big Ideas (05), and Mechanism-Narrative (11) all depend on this skill's output.

---

## State Machine (v4.0 — Concept/Naming Separation)

```
IDLE → TRIGGERED → LAYER_0 → LAYER_1A → [CONCEPT_CHECKPOINT] → LAYER_1B → LAYER_2 → LAYER_3 → LAYER_4 → COMPLETE
                      ↓          ↓              ↓                   ↓          ↓          ↓          ↓
                   [GATE_0]   [GATE_1A]    [HUMAN_SELECT]       [GATE_1B]  [GATE_2]   [GATE_3]   [GATE_4]
                      ↓          ↓              ↓                   ↓          ↓          ↓          ↓
                   PASS/FAIL  PASS/FAIL    APPROVED/REVISE      PASS/FAIL  PASS/FAIL  PASS/FAIL  PASS/FAIL
```

### Why Concept/Naming Separation Matters (v4.0)

**The old failure mode:** AI simultaneously identifies the mechanism AND names it. A mediocre mechanism concept gets a flashy name and scores well. The CONCEPT quality and the NAMING quality are conflated.

**The fix:** Two separate phases with a human checkpoint between them.
1. **Phase 1A — Concept Discovery:** "What IS the mechanism? Describe it plainly."
2. **Human Checkpoint:** Anthony selects the mechanism concept based on strategic merit, NOT naming creativity
3. **Phase 1B — Naming:** Generate 15+ names for the APPROVED concept only

**What changes:**
- Layer 1A produces mechanism CONCEPTS in plain language (what it does, how it solves the root cause, how it's different)
- Human approval happens BEFORE any naming
- Layer 1B naming-generator only runs on the APPROVED mechanism concept
- This prevents good names from propping up weak mechanisms

---

## Layer Sequence

### Layer 0: Foundation (Data Loading & Validation)
| Skill | File | Does |
|-------|------|------|
| 0.0.1 | `0.0.1-vertical-profile-loader.md` | Load vertical config (persona panel, specimens, taste defaults, anti-slop) |
| 0.1 | upstream-loader | Loads Big Idea brief, Root Cause package, Market Research |
| 0.2 | vault-intelligence-loader | Loads mechanism-vault-intelligence.json, extracts patterns |
| 0.3 | teachings-loader | Loads scorecard dimensions, E5 framework, naming principles |
| 0.4 | input-validator | Validates all inputs present and schema-compliant |
| 0.5 | rsf-loader (optional) | Loads RSF data for naming whitespace check |
| 0.2.7 | `0.2.7-persona-voice-loader.md` | Load persona-specific voice specimens for System 2 Arena calibration |
| 0.2.8 | `0.2.8-tier1-expression-reference.md` | Load TIER1 conversion-validated naming patterns for naming anchoring |

**RSF Loading (Layer 0 — Optional Enhancement):**

```
STEP: Load RSF Data
  1. CHECK: Does [project]/layer-2-rsf-outputs/expectation_schema.json exist?
  2. CHECK: Does [project]/layer-2-rsf-outputs/latent_resonance_field.json exist?
  3. IF BOTH exist:
     - Load both files
     - SET rsf_inputs_available: true
     - Extract whitespace_zones for mechanism naming whitespace check
     - Extract saturated_claims for naming conflict avoidance
     - Log: "RSF data loaded — naming whitespace and resonance enhancement active"
  4. IF EITHER missing:
     - SET rsf_inputs_available: false
     - Log: "RSF data unavailable — proceeding with standard naming protocol"
     - Continue without RSF enhancement (v3.0 conditional logic handles this)
```

### FSSIT Integration (Optional but Recommended)

If `[project]/01-research/FSSIT-RANKING.md` exists:
- LOAD expectation whitespace zones from FSSIT handoff (Section: Expectation Whitespace Zones)
- USE whitespace zones to inform mechanism NAMING — name something that sits in the gap between what the audience expects and what's actually true
- Mechanism names that exploit expectation whitespace have higher novelty and stickiness
- REFERENCE: `~system/protocols/FSSIT-HANDOFF-TEMPLATE.md` for field definitions

If `RSF_SKIP_ACKNOWLEDGED.yaml` exists:
- Note in execution log: "RSF skipped — mechanism naming generated without expectation whitespace data"

**Gate 0:** All inputs loaded, validated, schema-matched. FAIL = missing upstream outputs.

---

### Layer 1A: Mechanism Concept Discovery (v4.0 — Plain Language)

**Purpose:** Identify WHAT the mechanism IS — described in plain language, without naming. Focus on strategic merit: Does this mechanism solve the root cause? Is it differentiated? Is it provable?

| Skill | File | Does |
|-------|------|------|
| 1.0 | emphasis-strategy-selector | Determines Root Cause vs Science vs Delivery emphasis + dimensionality budget |
| 1.1 | mechanism-type-selector | Evaluates which types fit the root cause |
| 1.3 | explanation-architect | Develops core explanatory logic per concept |
| 1.4 | analogy-developer | Creates simplifying analogies/visuals per concept |
| 1.5 | proof-mapper | Maps available proof to each concept's claims |
| 1.6A | concept-gate | Quality gate — are concepts strategically sound? |

**Execution order:** 1.0 runs FIRST. Then 1.1, 1.3-1.5 in parallel. 1.6A validates.

**Gate 1A:** ≥ 5 viable mechanism CONCEPTS, each with: plain-language description, explanation logic, analogy, proof map. NO NAMES. Emphasis strategy defined. FAIL = fewer than 5 or incomplete concepts.

**Output format for human checkpoint:**

```markdown
## Mechanism Concept Candidates

### Concept A: [Plain-language description of what the mechanism DOES]
**How it solves the root cause:** [Direct connection]
**Type:** [scientific / behavioral / natural / compound / sequence / system]
**Emphasis:** [Which emphasis strategy this fits]
**Differentiation:** [How is this different from what competitors offer?]
**Proof strength:** [Strong/Medium/Weak — what evidence exists?]
**Analogy:** [Simple analogy that explains it]
**Soul.md fit:** [Does this concept align with the project's voice/energy?]

### Concept B: [Plain-language description]
[Same format]

[...3-5 total concepts minimum]

---
**Recommended:** [Which concept and why]
**Awaiting your selection before proceeding to naming.**
```

### ★ HUMAN CHECKPOINT: MECHANISM CONCEPT APPROVAL (BLOCKING) ★

Present 5+ mechanism concepts to Anthony in plain language. NO names. NO creative framing.

Anthony selects the mechanism CONCEPT based on strategic merit:
- Does it solve the root cause?
- Is it genuinely different?
- Can we prove it?
- Does it match the Soul.md energy?

**Write CONCEPT_APPROVED.yaml:**
```yaml
mechanism_concept_approved:
  selected_concept: "[letter]"
  plain_description: "[What the mechanism does in plain language]"
  type: "[mechanism type]"
  emphasis: "[emphasis strategy]"
  root_cause_connection: "[How it solves the root cause]"
  differentiation: "[How it's different]"
  anthony_notes: "[Any direction about naming/framing]"
  approved_at: "[timestamp]"
  total_concepts_presented: [number]
```

**HARD GATE:** Layer 1B (Naming) CANNOT begin without CONCEPT_APPROVED.yaml.

---

### Layer 1B: Mechanism Naming (v4.0 — Approved Concept Only)

**Purpose:** Generate 15+ creative names for the APPROVED mechanism concept. This is pure naming creativity — the strategic decision was already made.

| Skill | File | Does |
|-------|------|------|
| 1.2 | naming-generator | Produces 15+ naming candidates via verbalized sampling (4 passes incl. E5 strategies) — FOR APPROVED CONCEPT ONLY |
| 1.6B | naming-gate | Quality gate — do we have sufficient naming variety? |
| 1.7 | naming-anchoring-score | Score all name candidates against audience vocabulary, TIER1 naming patterns, and FSSIT. Generate 5+ quote-first names. Top 5 anchored names proceed to Layer 2. |

**Gate 1B:** ≥ 15 naming candidates for the approved concept. Each with: name, naming pattern, embedded benefits check, mouth feel assessment. FAIL = fewer than 15 or all names in same pattern.

### Quote-First Naming (v4.1 — Expression Anchoring)

In addition to the 15+ names from 1.2, derive 5 names from audience vocabulary. Extract mechanism-adjacent language from Competitor Mechanisms and Root Cause quotes. Names built from audience language score higher on anchoring because the audience's mental model already contains the vocabulary. All 20+ names (15+ concept-down + 5+ quote-first) are scored using the 3-dimension anchoring protocol (Audience Vocabulary Match 40%, TIER1 Naming Pattern 30%, FSSIT Echo 30%). Top 5 anchored names proceed to Layer 2. See `~system/protocols/EXPRESSION-ANCHORING-PROTOCOL.md` for full scoring methodology.

### RSF-Aware Naming Enhancement (v3.0)

When RSF inputs are available, Layer 1 naming gains additional optimization:

```
IN 1.2-naming-generator:
  IF expectation_schema.json available:
    LOAD: saturated_mechanism_patterns from expectation_schema

    FOR each naming candidate:
      CHECK: Does this name fall into a saturated pattern?

      IF name resembles saturated_mechanism_patterns:
        FLAG: "Saturated naming pattern — consider alternative"
        GENERATE: Additional candidates in whitespace territory

      IF name occupies whitespace_zone:
        BOOST: Differentiation potential (+2 pre-score)
        NOTE: "Name leverages unexploited naming territory"

  IF latent_resonance_field.json available:
    CHECK: Can mechanism name connect to latent emotion?

    IF name evokes latent_emotion:
      BOOST: Visceral response potential (+1)
      DOCUMENT: Which emotion is evoked

  IF competitive_sophistication_audit.json available:
    CHECK: schwartz_stage and exhausted_mechanisms list

    AVOID: Mechanism naming patterns exhausted at current stage
    PRIORITIZE: Naming patterns appropriate for sophistication level
```

**Example saturated patterns to avoid (when RSF data indicates):**
- "[X] Protocol" (overused in health)
- "[X] Method" (generic across niches)
- "[X] System" (weak differentiation)

**Example whitespace opportunities (when RSF data indicates):**
- Metaphor-based names when category uses clinical
- Origin-story names when category uses numbered
- Experiential names when category uses scientific

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

### Layer 2: Scorecard Optimization (13 Dimensions)
| Skill | File | Dimension |
|-------|------|-----------|
| 2.1 | image-strength-optimizer | Can the prospect PICTURE this working? |
| 2.2 | simplicity-validator | Can a 12-year-old understand it? |
| 2.3 | proof-integrator | Is there believable evidence? |
| 2.4 | virality-assessor | Would someone tell a friend about this? |
| 2.5 | ease-of-use-checker | Does the product seem easy to use? |
| 2.6 | differentiation-scorer | Is it clearly different from competitors? |
| 2.7 | embedded-benefits-extractor | Are benefits baked into the mechanism name? |
| 2.8 | doomsday-developer | What happens if they DON'T use this? |
| 2.9 | belief-compatibility-checker | Does it fit what they already believe? |
| 2.10 | thesis-cohesion-aligner | Does it support the Big Idea? |
| 2.11 | super-power-articulator | Does it give a NEW capability? |
| 2.12 | visceral-response-validator | Does it produce a gut-level response? |
| 2.13 | delivery-tangible-evaluator | Can the prospect SEE what the product DOES? |

**Dimensionality Budget (from 1.0 emphasis_strategy):**
Layer 2 does NOT optimize all 13 dimensions equally. The emphasis strategy determines:
- **Primary dimensions (4-5):** Optimize aggressively (target 8-10). These carry the mechanism.
- **Supporting dimensions (8-9):** Meet threshold (target ≥ 6). Don't over-invest here.

This prevents flat, generic mechanisms where everything scores 7 and nothing dominates. The emphasis strategy tells Layer 2 WHERE to spend its optimization energy.

**Gate 2:** All 13 dimensions scored for all candidates. Primary dimensions must score ≥ 7. Supporting dimensions must score ≥ 5. No candidate may proceed with any dimension unscored.

---

### Layer 3: Validation & Selection
| Skill | File | Does |
|-------|------|------|
| 3.1 | scorecard-scorer | Aggregates all 12 dimension scores per candidate |
| 3.2 | minimum-threshold-gate | Rejects candidates below avg < 7 or any dimension < 5 |
| 3.3 | vault-pattern-comparator | Compares against top-25 vault exemplars |
| 3.4 | anti-slop-validator | Language quality check on all mechanism copy |
| 3.5 | mechanism-selector | Selects winner + runner-up with rationale |

**Gate 3:** ≥ 1 candidate passes threshold. Winner scores ≥ 7.0 weighted average, primary dimensions ≥ 7, supporting dimensions ≥ 5. All language scores ≤ 2.0 slop density. FAIL = no candidates pass (return to Layer 1 for new candidates).

---

### Layer 4: Package Assembly
| Skill | File | Does |
|-------|------|------|
| 4.1 | mechanism-brief-compiler | Assembles complete mechanism package |
| 4.2 | copy-integration-mapper | Maps mechanism touchpoints across downstream skills |
| 4.3 | handoff-packager | Formats output for 04-headlines consumption |

**Gate 4:** Package complete, all required fields populated, handoff schema validated.

---

## Constraints

### Input Constraints
- NEVER proceed without root_cause_package from 03-root-cause
- NEVER proceed without market_psychology_snapshot from 01-research
- NEVER proceed without proof_inventory from 02-proof-inventory
- NEVER proceed without mechanism-vault-intelligence.json loaded
- NEVER accept schwartz_stage outside range 2-5 (Stage 1 markets don't need mechanisms)

### Layer 0 Constraints
- NEVER pass Gate 0 with missing upstream outputs
- NEVER pass Gate 0 with schema validation failures
- ALWAYS validate all input files before proceeding

### Layer 1 Constraints
- NEVER run 1.1-1.5 before 1.0 (emphasis strategy must come first)
- NEVER generate fewer than 15 naming candidates in 1.2
- NEVER proceed without mechanism type selected in 1.1
- NEVER pass Gate 1 with fewer than 5 viable candidates
- NEVER pass Gate 1 without emphasis strategy defined
- ALWAYS use verbalized sampling (minimum 4 passes) in 1.2-naming-generator

### RSF Layer 1 Constraints (v3.0)
- WHEN RSF inputs available: MUST check names against saturated_mechanism_patterns
- WHEN name matches saturated pattern: MUST generate additional whitespace alternatives
- WHEN whitespace_zone identified: SHOULD prioritize names occupying that territory
- NEVER select a name with schema_distance < 3 when alternatives score higher
- ALWAYS populate rsf_metadata.naming_schema_distance in output
- ALWAYS set rsf_inputs_available: false when RSF data not present

### Layer 2 Constraints
- NEVER score a dimension without explicit criteria from scorecard
- NEVER score any dimension outside range 1-10
- NEVER optimize supporting dimensions beyond threshold (wastes budget)
- NEVER pass Gate 2 with any primary dimension < 7
- NEVER pass Gate 2 with any supporting dimension < 5
- NEVER pass Gate 2 with any dimension unscored
- ALWAYS respect dimensionality budget from emphasis strategy

### Layer 3 Constraints
- NEVER pass candidate with weighted average < 7.0
- NEVER pass candidate with any dimension < 5
- NEVER pass candidate with slop density > 2.0 per 100 words
- NEVER select winner without comparing to vault exemplars
- NEVER pass Gate 3 without ≥1 candidate meeting all thresholds
- ALWAYS document selection rationale for winner vs runner-up

### Layer 4 Constraints
- NEVER output without all package fields populated
- NEVER output without copy_integration_map completed
- NEVER handoff without schema validation
- ALWAYS include runner-up with why_not_winner explanation

### Execution Constraints
- NEVER allow Layer N+1 to start before Layer N gate passes
- NEVER iterate any layer more than 3 times before human checkpoint
- NEVER skip emphasis strategy flow to downstream skills
- ALWAYS log gate failures with specific reasons

---

## Execution Rules

1. **Sequential layers only** — Layer N must pass its gate before Layer N+1 begins
2. **Parallel within layers** — Microskills within a layer may execute in parallel when they share no dependencies (except 1.0 which runs first in Layer 1)
3. **Gate failure protocol** — On FAIL, log failure reason, return to appropriate layer for regeneration
4. **Maximum iterations** — Any layer may iterate max 3 times before escalating to human checkpoint
5. **Verbalized sampling required** — Layer 1 naming-generator and Layer 2 optimization skills MUST use verbalized sampling for creative diversity
6. **Emphasis flows downstream** — 1.0 emphasis_strategy.json is consumed by ALL Layer 1 and Layer 2 skills. It determines type bias (1.1), naming direction (1.2), explanation depth allocation (1.3), proof priorities (1.5), and dimensionality budget (all Layer 2 skills)
7. **Dimensionality budget enforced** — Layer 2 skills check whether they are a PRIMARY or SUPPORTING dimension for this emphasis strategy. Primary dimensions optimize aggressively. Supporting dimensions meet threshold only.

---

## Post-Processing Checkpoint

Before finalizing mechanism package, verify:

1. **Upstream Coherence:** Root cause → mechanism connection is logical and solvable
2. **Scoring Integrity:** All 13 dimensions scored, no scores outside 1-10 range
3. **Threshold Compliance:** Primary dimensions ≥ 7, supporting dimensions ≥ 5, weighted average ≥ 7.0
4. **Proof Mapping:** All mechanism claims have proof elements mapped
5. **Anti-Slop:** All generated text passes slop density check (≤ 2.0 per 100 words)
6. **Vault Comparison:** Winner compared to top-25 vault exemplars with differentiation documented
7. **Handoff Completeness:** All downstream skill handoffs populated and schema-valid

If any check fails → return to relevant layer for correction before output.

---

## Trigger-Template Refusals

### Refuse to Proceed When:
- **Missing root cause:** "Cannot develop mechanism without root_cause_package. Run 03-root-cause first."
- **Missing proof:** "Cannot validate mechanism claims without proof_inventory. Run 02-proof-inventory first."
- **Stage 1 market:** "Stage 1 markets don't require mechanisms. Promise alone is sufficient. Adjust schwartz_stage or skip mechanism skill."
- **No candidates pass:** "No mechanism candidates met thresholds after 3 iterations. Escalating to human checkpoint. Review: [list of failures]."
- **Slop detected:** "Mechanism copy contains slop density [X] per 100 words, exceeds threshold 2.0. Return to Layer 3 for anti-slop remediation."

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

## Input Requirements

```yaml
required_inputs:
  from_01_deep_research:
    - market_psychology_snapshot
    - competitive_analysis
    - customer_language_database
  from_01_big_ideas:
    - big_idea_brief (concept, promise, angle, big_idea_type)
  from_03_root_cause:
    - root_cause_package:
        surface_problem: string
        real_root_cause: string
        reframe_technique: string
        failure_narrative: string
  from_vault:
    - mechanism-vault-intelligence.json
  from_teachings:
    - mechanism-scorecard.md (12 dimensions)
    - e5-method.md (explanation framework)
    - naming-principles.md (naming patterns)
```

---

## Output Schema

```yaml
mechanism_package:
  emphasis_strategy:
    primary_emphasis: enum[root_cause, science_conceptual, delivery_tangible, balanced]
    bandwidth_allocation:
      root_cause_pct: integer
      science_conceptual_pct: integer
      delivery_tangible_pct: integer
    schwartz_stage: enum[stage_2, stage_3, stage_4, stage_5]
    primary_dimensions: [string]
  winner:
    name: string
    type_primary: enum[scientific, technical, natural, compound, behavioral, sequence, system]
    type_secondary: enum[scientific, technical, natural, compound, behavioral, sequence, system, null]
    naming_pattern_primary: enum[clinical, branded_format, metaphor, origin, numbered, experiential, invented]
    naming_pattern_secondary: enum[clinical, branded_format, metaphor, origin, numbered, experiential, invented, null]
    e5_strategy: enum[actual, unspoken, transsubstantiated]
    root_cause_connection: string
    explanation:
      core_logic: string
      analogy: string
      step_by_step: [string]
      scientific_backing: [string]
    proof_elements:
      - type: string
        claim: string
        evidence: string
    scorecard:
      image_strength: integer[1-10]
      simplicity: integer[1-10]
      proof: integer[1-10]
      virality: integer[1-10]
      ease_of_use: integer[1-10]
      differentiation: integer[1-10]
      embedded_benefits: integer[1-10]
      doomsday: integer[1-10]
      belief_compatibility: integer[1-10]
      thesis_cohesion: integer[1-10]
      super_power: integer[1-10]
      visceral_response: integer[1-10]
      delivery_tangibility: integer[1-10]
      average: float
      weighted_average: float    # Adjusted by dimensionality budget weights
    uniqueness_claim: string
    copy_integration_map:
      headline_hooks: [string]
      lead_angles: [string]
      body_explanations: [string]
      proof_section_elements: [string]
  runner_up:
    name: string
    scorecard_average: float
    why_not_winner: string
  selection_rationale: string
  vault_comparison:
    most_similar_exemplar: string
    differentiation_from_exemplar: string

  # RSF v3.0: RSF Integration Metadata
  rsf_metadata:
    rsf_inputs_available: boolean
    naming_schema_distance:
      score: integer[1-10]        # How different is this name from expected patterns?
      saturated_patterns_avoided: [string]  # Which saturated patterns were NOT used
      whitespace_leveraged: string  # Which whitespace territory does name occupy?
    resonance_connection:
      connected_latent_emotion: string  # If name evokes latent emotion
      connection_type: enum[direct, metaphorical, implied, none]
      connection_strength: integer[1-10]
    differentiation_enhancement:
      pre_rsf_differentiation_score: integer[1-10]
      post_rsf_differentiation_score: integer[1-10]
      rsf_contribution: string  # How RSF improved differentiation
    rsf_naming_notes: string  # How RSF influenced naming decisions
```

---

## Quality Protocol Integration

- **Anti-slop:** All generated text checked by 3.4-anti-slop-validator
- **Verbalized sampling:** Required in 1.2-naming-generator (minimum 4 distribution-level prompts)
- **Ultra-rich:** Pre-Task Interrogation runs at Layer 0, During-Task at Layer 2, Post-Task at Layer 4

---

## Vault Exemplar Reference

Top 5 mechanism patterns from vault (for comparison in Layer 3):

| Swipe ID | Mechanism Name | Type | Avg Score | Key Strength |
|----------|---------------|------|-----------|--------------|
| pg_ssts_vsl_001 | "Simple Strike Sequence" | behavioral | 8.7 | Image strength, simplicity |
| glucotrust_vsl | "Deep Sleep Reset" | natural | 8.4 | Belief compatibility, embedded benefits |
| pg_fixd_vsl_001 | "First Move Fix" | behavioral | 8.2 | Simplicity, proof integration |
| resurge_vsl | "Metabolic Regeneration" | scientific | 8.1 | Authority, differentiation |
| pg_sf1_vsl_001 | "Pressure-Proof Protocol" | sequence | 7.9 | Super power, visceral response |

Use these as benchmark comparisons in 3.3-vault-pattern-comparator.

---

## PRE-EXECUTION PROTOCOL (v4.0)

**BEFORE any mechanism execution, the following steps are MANDATORY:**

```
SESSION STARTUP:
  1. READ MECHANISM-ANTI-DEGRADATION.md v2.0 — MANDATORY
  2. READ SOUL-MD-PROTOCOL.md — understand Soul.md integration
  3. LOAD [project]/SOUL.md — if exists, constrains naming and framing
  4. READ this file (MECHANISM-AGENT.md) — architecture and constraints
  5. IF resuming: READ PROJECT-STATE.md for current position
  6. IF resuming: READ checkpoint files to verify layer completion
  7. CREATE infrastructure if not exists:
     - PROJECT-STATE.md (living state document)
     - PROGRESS-LOG.md (append-only timeline)
     - checkpoints/ directory
  8. VERIFY upstream inputs exist:
     - research FINAL_HANDOFF.md
     - proof FINAL_HANDOFF.md
     - root-cause-package.yaml (or ROOT-CAUSE-SUMMARY.md)
     - brief
  9. CHECK for stale artifacts from previous failed attempts
  10. ONLY THEN begin Layer 0 execution
```

**Binding Model Assignment Table (v4.0):**

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure setup + Soul.md load | haiku | File creation only |
| 0 | Input validation + loading | haiku | Simple validation |
| 1A | Concept discovery (emphasis, type, explanation, analogy, proof) | opus | Deep strategic analysis |
| 1A-CP | Human checkpoint: concept selection | — | Human judgment |
| 1B | Naming generation (15+ names for approved concept) | opus | Creative naming |
| 2 | Scorecard optimization (13 dimensions) | opus | Judgment-heavy scoring |
| 2.5 | Arena (7 competitors × 2 rounds + audience evaluation) | opus | Maximum quality required |
| 3 | Validation + selection | opus | Judgment-heavy comparison |
| 4 | Output packaging | sonnet | Assembly from existing content |

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

### Failure Modes
| Mode | Severity | Detection | Handling |
|------|----------|-----------|----------|
| Upstream root_cause_package missing | HIGH | Layer 0 input validation | HALT with remediation: run 03-root-cause |
| Upstream proof_inventory missing | HIGH | Layer 0 input validation | HALT with remediation: run 02-proof-inventory |
| Vault intelligence file not found | HIGH | Layer 0 load check | HALT with fallback: provide vault file path |
| Schwartz stage = 1 (invalid for mechanism) | HIGH | Input validation | HALT with guidance: Stage 1 markets skip mechanism skill |
| Emphasis strategy not defined | HIGH | Gate 1 check | HALT + run 1.0-emphasis-strategy-selector first |
| Fewer than 15 naming candidates | MEDIUM | Layer 1 output check | REJECT + re-run 1.2-naming-generator with 4 passes |
| Fewer than 5 viable candidates at Gate 1 | HIGH | Gate 1 validation | HALT + regenerate Layer 1 with expanded inputs |
| Primary dimension score < 7 | HIGH | Gate 2 validation | REJECT candidate + optimize or eliminate |
| Supporting dimension score < 5 | MEDIUM | Gate 2 validation | REJECT candidate + address dimension gap |
| Weighted average < 7.0 | HIGH | Gate 3 validation | REJECT candidate + return to Layer 2 optimization |
| Slop density > 2.0 per 100 words | MEDIUM | Anti-slop validation 3.4 | REJECT + remediate language in Layer 3 |
| No candidates pass Gate 3 after 3 iterations | HIGH | Iteration counter | HALT + escalate to human checkpoint |
| Handoff schema validation fails | HIGH | Gate 4 validation | REJECT + re-package per downstream schema |
| Timeout on vault comparison | MEDIUM | Timeout monitor | Retry once, then proceed with warning flag |

---

### Anti-Slop Lexicon
NEVER use these words/phrases in mechanism naming or copy:

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

**Mechanism-specific slop (ban for naming):**
- protocol (overused), system (generic), method (vague), technique (weak), approach (bland), solution (meaningless)

---

## Status

**VERSION 3.2** — RSF-Enhanced + Operational Hardening per Research/Proof/Root Cause propagation pattern.

**Changes from v3.0:**
- Added PRE-EXECUTION PROTOCOL section (v3.2): mandatory anti-degradation read, project infrastructure creation, upstream input verification, stale artifact check, model assignment table
- Added Binding Model Assignment Table: haiku for infrastructure (0), opus for ideation/scorecard/arena/validation (1-3), sonnet for packaging (4)
- References MECHANISM-ANTI-DEGRADATION.md v2.0 (5 new structural fixes: project infrastructure, binary gates, model selection, stale artifact cleanup, session startup protocol)

**Changes from v2.1:**
- Added RSF Dependencies (optional) to header
- Added RSF Enhancement section explaining v3.0 capabilities
- Added RSF-Aware Naming Enhancement section to Layer 1
- Added rsf_metadata to output schema for downstream Big Ideas consumption
- Added 6 RSF Layer 1 Constraints
- Mechanism naming now considers expectation_schema for saturated pattern avoidance
- Mechanism naming now considers latent_resonance_field for emotional connection
- Mechanism naming now considers competitive_sophistication_audit for stage-appropriate differentiation

**Key Principle:** Mechanism FUNCTION is not affected by RSF. Mechanism NAMING and POSITIONING can be enhanced by RSF intelligence.

**Changes from v2.0 (retained in v2.1):**
- Added Identity Boundaries section
- Expanded constraints to 34 explicit NEVER/ALWAYS statements (including 6 RSF constraints)
- Added Post-Processing Checkpoint
- Added Trigger-Template Refusals
- Added Vault Exemplar Reference table
- Added Success Criteria to Purpose
- Updated verbalized sampling requirement from 3 to 4 passes

**Architecture:**
- State machine with 5 layers (0-4)
- Gate validation between layers
- 13-dimension scorecard with emphasis-based weighting
- RSF-enhanced naming in Layer 1 (v3.0)
- Parallel microskill execution within layers

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | — | Initial state machine architecture with 13-dimension scorecard |
| 2.1 | — | NateJones audit enhancements (constraints, boundaries, gates) |
| 3.0 | 2026-01-29 | RSF integration: whitespace-aware naming, schema distance evaluation, resonance connection |
| 3.2 | 2026-02-12 | Operational hardening: PRE-EXECUTION PROTOCOL section, Binding Model Assignment Table, MECHANISM-ANTI-DEGRADATION.md v2.0 reference |
| 4.1 | 2026-02-23 | **Expression Anchoring Protocol.** Added 0.2.8 TIER1 Expression Reference loader (Layer 0) and 1.7 Naming Anchoring Score (Layer 1B, after 1.6B). Quote-First Naming: 5+ naming candidates derived from audience vocabulary. All names scored on 3 dimensions (Audience Vocabulary Match 40%, TIER1 Naming Pattern 30%, FSSIT Echo 30%). Top 5 anchored names proceed to Layer 2. Shared protocol: `Skills/protocols/EXPRESSION-ANCHORING-PROTOCOL.md`. |
| 4.0 | 2026-02-14 | **Concept/Naming Separation + Soul.md Integration.** Layer 1 split into 1A (concept discovery, plain language, 5+ candidates) → Human Checkpoint (CONCEPT_APPROVED.yaml) → 1B (naming, 15+ names for approved concept only). Soul.md loaded as mandatory taste constraint. State machine updated for two-phase Layer 1. |
