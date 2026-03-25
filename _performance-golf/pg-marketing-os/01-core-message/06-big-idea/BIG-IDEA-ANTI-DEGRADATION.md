# BIG-IDEA-ANTI-DEGRADATION.md

**Version:** 2.0
**Created:** 2026-02-05
**Updated:** 2026-02-14
**Purpose:** STRUCTURAL enforcement to prevent big idea skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: BIG-IDEA-ANTI-DEGRADATION.md v2.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Generate fewer than 9 candidates (3x3 matrix), skip schema distance calibration, or skip FSSIT validation.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates fewer than 9 candidates (should be 3×3 matrix)
- AI skips schema distance calibration (ideas too familiar OR too alien)
- AI produces fewer than 10 headlines per candidate
- AI skips volume validation (not enough candidates to select from)
- AI produces Big Ideas without FSSIT elements
- AI skips defensibility validation (idea can't be proven)

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 2A (Concept Generation) CANNOT execute unless this file exists:**
```
[project]/06-big-idea/checkpoints/LAYER_1_COMPLETE.yaml
```

**Layer 2B (Creative Wrapping) CANNOT execute unless BOTH files exist:**
```
[project]/06-big-idea/checkpoints/LAYER_2A_COMPLETE.yaml
[project]/06-big-idea/checkpoints/CONCEPT_APPROVED.yaml
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/06-big-idea/checkpoints/LAYER_2B_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/06-big-idea/checkpoints/LAYER_2_COMPLETE.yaml
[project]/06-big-idea/checkpoints/ARENA_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/06-big-idea/checkpoints/LAYER_3_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "06-big-idea"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  candidates_generated:
    required: 9
    actual: [number]
    verified: true
  schema_distance_range:
    minimum: 4
    maximum: 8
    actual_range: "[min-max]"
    verified: true
  headlines_per_candidate:
    required: 10
    actual_minimum: [number]
    verified: true

completeness:
  all_microskills_executed: true
  minimum_thresholds_met: true
  quality_gates_passed: true
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Big Idea candidates** | 9 (3×3 matrix) | HALT — Generate more candidates |
| **Schema distance** | 4-8 range | HALT — Too familiar (<4) or too alien (>8) |
| **Headlines per candidate** | 10 | HALT — Generate more headlines |
| **Leads per top candidate** | 3 | HALT — Generate more leads |
| **FSSIT elements present** | 5/5 | HALT — Include all FSSIT elements |
| **Defensibility score** | 7.0 | HALT — Idea can't be proven |

### The 3×3 Candidate Matrix

Big Idea generation MUST produce a 3×3 matrix:

| | Strategy A | Strategy B | Strategy C |
|---|---|---|---|
| **Angle 1** | Candidate 1 | Candidate 2 | Candidate 3 |
| **Angle 2** | Candidate 4 | Candidate 5 | Candidate 6 |
| **Angle 3** | Candidate 7 | Candidate 8 | Candidate 9 |

**IF FEWER THAN 9 CANDIDATES → IDEATION INCOMPLETE**

### FSSIT Elements (All 5 Required)

Every Big Idea MUST contain:

| Element | Description | Check |
|---------|-------------|-------|
| **F** - Fresh | Not already saturated in market | [ ] |
| **S** - Specific | Concrete, not vague | [ ] |
| **S** - Surprising | Creates genuine "aha" | [ ] |
| **I** - Intriguing | Opens curiosity loop | [ ] |
| **T** - Truthful | Can be defended with proof | [ ] |

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

**FORBIDDEN RATIONALIZATIONS — These statements are INVALID and trigger immediate HALT:**

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "6 strong candidates is enough" | 3×3 matrix = 9 candidates minimum | HALT — Complete the matrix |
| "schema distance is subjective" | Schema distance has measurable criteria | HALT — Apply criteria |
| "5 headlines capture the idea" | 10 headlines explore different angles | HALT — Generate 5 more |
| "this idea is obviously best" | Selection requires scoring, not intuition | HALT — Score all candidates |
| "FSSIT is a guideline" | FSSIT is mandatory validation | HALT — Validate all 5 elements |
| "we can prove it later" | Defensibility must be confirmed NOW | HALT — Verify proof exists |

### Enforcement Protocol

```
DURING BIG IDEA EXECUTION:

IF you find yourself thinking ANY of the above rationalizations:
  1. STOP immediately
  2. OUTPUT: "🛑 RATIONALIZATION DETECTED: [which one]"
  3. Do NOT act on the rationalization
  4. Return to proper execution

This is not optional. Rationalizations are degradation signals.
```

---

## STRUCTURAL FIX 4: SCHEMA DISTANCE GATE

### The Problem
AI generates Big Ideas that are either too familiar (boring, "seen it before") or too alien (confusing, "what does that even mean").

### The Fix

**MANDATORY SCHEMA DISTANCE CALIBRATION:**

```yaml
schema_distance_validation:
  candidate: "[candidate name]"

  familiarity_score: [1-10]
    # 1 = Completely novel concept
    # 10 = Exact match to existing market claims

  alienness_score: [1-10]
    # 1 = Instantly comprehensible
    # 10 = Requires extensive explanation

  schema_distance: [calculated as (10 - familiarity) + alienness / 2]

  optimal_range: 4-8

  IF schema_distance < 4:
    HALT — "Big Idea too familiar. Market has seen this."
    ACTION: "Increase novelty or angle"

  IF schema_distance > 8:
    HALT — "Big Idea too alien. Market won't understand."
    ACTION: "Ground in familiar concepts"
```

### Schema Distance Examples

| Score | Example | Problem |
|-------|---------|---------|
| 2 | "Lose weight fast" | Too familiar, ignored |
| 4 | "The hidden fat trigger doctors miss" | Edge of familiar, intriguing |
| 6 | "The 3-second hormone reset" | Novel but grounded |
| 8 | "Quantum cellular reprogramming" | Edge of comprehension |
| 10 | "Mitochondrial phase-shifting" | Too alien, confusing |

---

## STRUCTURAL FIX 5: BIG-IDEA-SPECIFIC MC-CHECK

**BIGIDEA-MC-CHECK (Required at each layer transition):**

```yaml
BIGIDEA-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [1 | 2 | 3 | 4]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP — Cannot proceed without checkpoint file"

  candidate_verification:
    total_candidates: [number]
    if_under_9: "STOP — Need 3×3 matrix (9 candidates)"

    matrix_complete: [Y/N]
    if_no: "STOP — Complete the 3×3 matrix"

  schema_distance_verification:
    candidates_in_range: [number]
    candidates_too_familiar: [number]
    candidates_too_alien: [number]

    if_too_familiar > 3: "STOP — Too many familiar ideas"
    if_too_alien > 3: "STOP — Too many alien ideas"

  headline_verification:
    minimum_headlines_per_candidate: [number]
    if_under_10: "STOP — Generate 10 headlines per candidate"

  FSSIT_verification:
    fresh: [Y/N]
    specific: [Y/N]
    surprising: [Y/N]
    intriguing: [Y/N]
    truthful: [Y/N]
    if_any_no: "STOP — All 5 FSSIT elements required"

  defensibility_verification:
    proof_exists: [Y/N]
    defensibility_score: [number]
    if_score_under_7: "STOP — Big Idea cannot be defended"

  concept_checkpoint_verification:
    concept_approved_yaml_exists: [Y/N]
    if_no_and_in_layer_2B: "STOP — CONCEPT_APPROVED.yaml is MANDATORY before creative wrapping"
    concepts_presented_in_plain_language: [Y/N]
    if_no: "STOP — Remove all headlines/wrappers/leads before presenting to human"
    am_i_thinking_headline_will_clarify_concept: [Y/N]
    am_i_thinking_concept_is_obvious: [Y/N]
    am_i_skipping_human_approval: [Y/N]
    if_any_yes: "🛑 HALT — Concept checkpoint rationalization detected"

  soul_md_check:
    soul_md_loaded_this_session: [Y/N]
    if_no_and_exists: "HALT — Load Soul.md before proceeding"
    anti_voice_patterns_in_output: [Y/N]
    if_yes: "HALT — Output contains anti-voice patterns. Rewrite."
    creative_wrappers_match_voice: [Y/N]
    if_no: "HALT — Wrappers don't match campaign voice. Regenerate."

  rationalization_check:
    am_i_accepting_too_few_candidates: [Y/N]
    am_i_skipping_schema_calibration: [Y/N]
    am_i_skipping_defensibility: [Y/N]
    if_any_yes: "🛑 HALT — Rationalization detected"

  result: [CONTINUE | HALT_CANDIDATES | HALT_SCHEMA | HALT_HEADLINES | HALT_FSSIT | HALT_DEFENSIBILITY | HALT_CONCEPT | HALT_SOUL]
```

---

## STRUCTURAL FIX 6: VOLUME VALIDATION GATE

### The Problem
AI selects "the best" Big Idea from too few options, missing potentially stronger candidates.

### The Fix

**MANDATORY VOLUME BEFORE SELECTION:**

```yaml
volume_validation:
  # BEFORE any selection can occur:

  candidates_generated: [number]
  minimum_required: 9

  IF candidates_generated < 9:
    HALT — "Cannot select from insufficient candidates"
    ACTION: "Return to generation, complete 3×3 matrix"

  headlines_generated: [total across all candidates]
  minimum_required: 90  # 10 per candidate × 9 candidates

  IF headlines_generated < 90:
    HALT — "Cannot evaluate without sufficient headline exploration"
    ACTION: "Generate remaining headlines"

  only_then: "Proceed to scoring and selection"
```

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 9, 10):
[ ] BIG-IDEA-ANTI-DEGRADATION.md read (THIS FILE)
[ ] BIG-IDEA-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Input files validated (research FINAL_HANDOFF, proof FINAL_HANDOFF, root-cause-package, mechanism-package, promise-package, brief)
[ ] Soul.md checked — loaded if exists, flagged if absent (Fix 9)

LAYER 0 (FOUNDATION):
[ ] Deep research loader executed
[ ] Vault schema normalized
[ ] Specimen decomposer run
[ ] Soul.md loaded — voice_register, energy_signature, anti_voice extracted
[ ] Input threshold validated
[ ] Component pool constructed
[ ] Deep research summarized
[ ] Foundation gate passed

LAYER 1 (INTELLIGENCE):
[ ] Pattern analyzer executed
[ ] Saturation mapper completed
[ ] Gap identifier run
[ ] Emotional mapper executed
[ ] Mechanism mapper run
[ ] Intelligence gate passed
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2A / PHASE A (CONCEPT GENERATION):
[ ] Candidate strategy selector run
[ ] 5+ Big Idea CONCEPTS generated in PLAIN LANGUAGE
[ ] Each concept has FSSIT anchor + strategic rationale
[ ] NO headlines, leads, wrappers, or creative packaging
[ ] Schema distance conceptually assessed (4-8 range)
[ ] Concepts presented to human WITHOUT creative expression
[ ] LAYER_2A_COMPLETE.yaml created
[ ] MODEL: opus

CONCEPT CHECKPOINT (Fix 8 — BLOCKING):
[ ] 5+ concepts presented in plain language ONLY
[ ] NO headlines, leads, or creative wrappers included
[ ] Each concept has clear FSSIT anchor documented
[ ] Human reviewed and approved 1+ concepts
[ ] CONCEPT_APPROVED.yaml created with approved concept IDs + FSSIT anchors
[ ] Human notes/direction captured in CONCEPT_APPROVED.yaml
[ ] VERIFY: CONCEPT_APPROVED.yaml exists before proceeding to Phase B

LAYER 2B / PHASE B (CREATIVE WRAPPING — approved concepts only):
[ ] Candidate architect executed for APPROVED concepts only (3×3 matrix)
[ ] 9 candidates generated (from approved concept base)
[ ] Headline generator run (10 per candidate) — constrained by Soul.md voice
[ ] Lead generator run (3 per top candidate) — constrained by Soul.md pacing
[ ] Proof architect executed
[ ] Schema distance calibrated (4-8 range)
[ ] Anti-voice patterns checked against all headlines and leads
[ ] Generation gate passed
[ ] LAYER_2B_COMPLETE.yaml created
[ ] MODEL: opus

LAYER 2.5 (ARENA — MANDATORY, CANNOT BE SKIPPED):
[ ] ARENA-LAYER.md READ (MANDATORY — contains skill-specific judging criteria)
[ ] ARENA-CORE-PROTOCOL.md READ (path: ~system/protocols/ARENA-CORE-PROTOCOL.md)
[ ] ARENA-PERSONA-PANEL.md READ (path: ~system/protocols/ARENA-PERSONA-PANEL.md)
[ ] Persona names VERIFIED against protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect
[ ] All 7 competitors generated across 2 rounds
[ ] Adversarial critique completed each round
[ ] Targeted revision completed each round
[ ] Post-Arena Synthesis: 2-3 hybrids created
[ ] 9-10 candidates presented to human
[ ] Human selection received (BLOCKING)
[ ] ARENA_COMPLETE.yaml created

LAYER 3 (VALIDATION):
[ ] Volume validator passed (9 candidates, 90 headlines)
[ ] Quantification validator run
[ ] Defensibility validator executed (score >= 7.0)
[ ] Actionability validator run
[ ] Anti-slop validator passed
[ ] FSSIT validation complete (5/5)
[ ] Validation gate passed
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (PACKAGING):
[ ] Brief compiler executed
[ ] Downstream mapper run
[ ] Handoff packager completed

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All 3 output files verified (YAML + Summary + Log)
[ ] All downstream handoffs populated (10-headlines, 11-lead, 09-campaign-brief)
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] DO NOT trust summary claims about candidate counts
[ ] RE-READ PROJECT-STATE.md for current position
[ ] RE-READ checkpoint files
[ ] VERIFY 3×3 matrix from actual output
[ ] VERIFY schema distance was calibrated
[ ] VERIFY headlines per candidate (10 each)
[ ] VERIFY CONCEPT_APPROVED.yaml exists if past Layer 2A
[ ] If generation was abbreviated, RETURN to Layer 2
```

---

## KEY INSIGHT

> **"A Big Idea without volume is a guess. A Big Idea without schema calibration is either boring or confusing. A Big Idea without defensibility is a lawsuit waiting to happen."**

The Big Idea skill has 4 layers for a reason:
- Layer 1: UNDERSTAND the market landscape and gaps
- Layer 2: GENERATE volume (9 candidates, 10 headlines each)
- Layer 3: VALIDATE defensibility, FSSIT, and schema distance
- Layer 4: Package selected Big Idea for downstream

Skipping volume means selecting from too few options.

---

## STRUCTURAL FIX 7: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 2-round + audience evaluation competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/06-big-idea/checkpoints/ARENA_COMPLETE.yaml
```

This file is created ONLY after:
1. All 7 competitors have generated across 2 rounds
2. Adversarial critique completed each round
3. Targeted revision completed each round
4. All candidates scored against 7 criteria
5. Post-arena synthesis complete (2-3 hybrids)
6. Human selection received (BLOCKING)

### ARENA_COMPLETE.yaml Format

```yaml
# ARENA_COMPLETE.yaml
layer: "2.5"
skill: "06-big-idea"
status: COMPLETE
timestamp: "[ISO 8601]"

arena_execution:
  rounds_completed: 2
  competitors_per_round: 7
  critique_phases_completed: 2
  revision_phases_completed: 2
  hybrids_created: [number]

human_selection:
  selected_candidate: "[name]"
  selection_type: "[pure | hybrid]"
  selected_from_persona: "[persona name or 'synthesizer']"
  timestamp: "[ISO 8601]"

verification:
  all_7_competitors_generated: true
  all_2_rounds_completed: true
  critique_before_scoring: true
  human_selection_received: true

persona_verification:
  personas_loaded_from: "~system/protocols/ARENA-PERSONA-PANEL.md"
  personas_used:
    - Makepeace
    - Halbert
    - Schwartz
    - Ogilvy
    - Clemens
    - Bencivenga
    - The Architect
  all_match_protocol: true  # FALSE = HALT — fabrication detected
```

### Checkpoint Progression (Updated)

```
LAYER_1_COMPLETE.yaml → LAYER_2A_COMPLETE.yaml → CONCEPT_APPROVED.yaml → LAYER_2B_COMPLETE.yaml → ARENA_COMPLETE.yaml → LAYER_3_COMPLETE.yaml → LAYER_4_COMPLETE
```

**CONCEPT_APPROVED.yaml sits between LAYER_2A and LAYER_2B. Layer 2B (Creative Wrapping) is BLOCKED without it.**
**ARENA_COMPLETE.yaml sits between LAYER_2B and LAYER_3. Layer 3 is BLOCKED without it.**

### Forbidden Rationalizations (Arena-Specific)

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "Arena is optional" | Arena is MANDATORY per ~system/SYSTEM-CORE.md | HALT — Execute Arena |
| "Output is good enough without Arena" | Single-perspective output lacks competitive quality | HALT — Execute Arena |
| "Arena can be run separately" | Arena is part of the skill execution flow, not a separate pass | HALT — Execute Arena now |
| "Context is too large for Arena" | Request session break, do NOT skip Arena | HALT — Session break, then Arena |
| "I'll note Arena was skipped" | Noting a skip does not excuse the skip | HALT — Execute Arena |
| "Arena adds too many tokens" | Quality over cost. Always. | HALT — Execute Arena |

---

## STRUCTURAL FIX 8: CONCEPT CHECKPOINT GATE (v2.0)

### The Problem
Big Idea v4.x generated concepts AND creative wrappers/headlines/leads simultaneously. Good headlines propped up weak strategic concepts. Anthony couldn't evaluate whether the Big Idea was strategically sound without being influenced by creative packaging. Creative work (headlines, leads, wrappers) was wasted when the underlying concept was wrong.

### The Fix

**Layer 2B (Creative Wrapping) CANNOT execute unless this file exists:**
```
[project]/06-big-idea/checkpoints/CONCEPT_APPROVED.yaml
```

This file is created ONLY when:
1. Layer 2A generated 5+ Big Idea concepts in plain language
2. Concepts were presented WITHOUT headlines, leads, wrappers, or creative packaging
3. Each concept was FSSIT-anchored with strategic rationale
4. Anthony reviewed and approved 1+ concepts
5. CONCEPT_APPROVED.yaml was written with approved concept IDs

### CONCEPT_APPROVED.yaml Format

```yaml
# CONCEPT_APPROVED.yaml
skill: "06-big-idea"
timestamp: "[ISO 8601]"
concepts_presented: [count]
concepts_approved:
  - concept_id: "[ID]"
    fssit_anchor: "[the FSSIT element this concept crystallizes]"
    human_notes: "[direction from Anthony]"
concepts_rejected:
  - concept_id: "[ID]"
    reason: "[why]"
soul_md_loaded: [true/false]
```

### Forbidden Rationalizations (Concept Checkpoint)

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "concept is obvious from research" | Even obvious concepts need human validation of strategic synthesis | HALT — Present to human |
| "only one viable concept" | Present it anyway — human may disagree or redirect | HALT — Present to human |
| "a good headline will clarify the concept" | Headlines MASK weak concepts — evaluate concept FIRST | HALT — Present plain language |
| "I'll present the wrapped version" | Creative packaging biases evaluation — plain language ONLY in Phase A | HALT — Remove wrappers |
| "human approval slows things down" | Quality over speed. Concept approval is non-negotiable. | HALT — Present to human |
| "the Big Idea IS the headline" | The concept is the strategic insight; the headline is creative expression OF that insight | HALT — Separate concept from expression |

---

## STRUCTURAL FIX 9: SOUL.MD LOADING GATE (v2.0)

### The Problem
Without taste constraints, Big Idea creative wrappers, headlines, and leads default to generic AI patterns that don't match the campaign voice. This is especially damaging for Big Idea because creative expression IS the deliverable of Phase B.

### The Fix

**MANDATORY Soul.md check at pre-execution:**

```yaml
soul_md_verification:
  soul_md_exists: [Y/N]
  soul_md_path: "[project]/SOUL.md"

  IF soul_md_exists == Y:
    soul_md_loaded: true
    status: "[Seed | Expanded | Finalized]"
    voice_register_extracted: [Y/N]
    energy_signature_extracted: [Y/N]
    anti_voice_extracted: [Y/N]

    IF status != "Finalized":
      WARNING: "Soul.md not finalized — taste constraints may be incomplete"

    CONSTRAINTS ACTIVE:
      - Creative wrappers must match voice register
      - Headlines must match energy signature
      - Anti-voice patterns are FORBIDDEN in all creative output
      - Leads must match pacing signature

  IF soul_md_exists == N:
    WARNING: "No Soul.md found — generation will lack taste constraints"
    FLAG: All outputs flagged as "generated without Soul.md"
    PROCEED: But document the absence
```

### MC-CHECK Enhancement for Soul.md

Add to BIGIDEA-MC-CHECK:

```yaml
soul_md_check:
  soul_md_loaded_this_session: [Y/N]
  if_no_and_exists: "HALT — Load Soul.md before proceeding"
  anti_voice_patterns_in_output: [Y/N]
  if_yes: "HALT — Output contains anti-voice patterns. Rewrite."
  creative_wrappers_match_voice: [Y/N]
  if_no: "HALT — Wrappers don't match campaign voice. Regenerate."
```

---

## STRUCTURAL FIX 10: ANTI-DEGRADATION MANDATORY READ

### The Fix

**Session startup protocol — BEFORE any big idea execution:**

```
SESSION STARTUP:
  1. READ this file (BIG-IDEA-ANTI-DEGRADATION.md) — MANDATORY
  2. READ BIG-IDEA-AGENT.md — agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin big idea execution without reading this anti-degradation file first.
```

---

## STRUCTURAL FIX 11: SEMI-FORMAL REASONING FOR SCHEMA DISTANCE VALIDATION

### The Problem
Schema distance calibration (Layer 3, microskill 3.7-3.8) produces analytical conclusions about whether a Big Idea is too familiar or too alien. Without structured reasoning, schema distance scores can be pattern-matched ("health supplement = medium distance") rather than derived from competitive landscape evidence.

### The Fix

**Reference:** `~system/protocols/SEMI-FORMAL-REASONING-PROTOCOL.md`

**Schema distance validation (3.7-3.8) MUST use the Semi-Formal Reasoning Template:**

Each schema distance output must include:
- **PREMISES** — Sourced from saturation mapper (1.2), gap identifier (1.3), and competitive landscape data
- **EVIDENCE CHAIN** — Why this Big Idea lands at THIS specific schema distance, with competitive evidence
- **CONCLUSION** — The schema distance score with specific justification
- **COUNTEREXAMPLE CHECK** — "If this Big Idea were actually at distance [N-2], what market evidence would support that? Does it exist?"
- **CONFIDENCE ASSESSMENT** — Based on quality of competitive data, not gut feel

**Specifically for Defensibility Validation (3.3):**
- Steel Man Gate applies: Before accepting defensibility score >= 7.0, articulate the strongest challenge to the Big Idea's defensibility
- If the challenge cannot be defeated: flag for human review

**MC-CHECK Addition:**

Add to BIGIDEA-MC-CHECK at Layer 3:

```yaml
reasoning_quality_check:
  semi_formal_template_used_for_schema: [Y/N]
  counterexample_included: [Y/N]
  defensibility_steel_man_completed: [Y/N]
  if_any_no: "HALT — Schema distance and defensibility validation require semi-formal reasoning per SEMI-FORMAL-REASONING-PROTOCOL.md"
```

---

## Per-Microskill Output Protocol (v3.2)

**Added:** 2026-02-12
**Reference:** ~system/SYSTEM-CORE.md § MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-deep-research-loader | layer-0-outputs/0.1-deep-research-loader.md | 1KB min |
| 0 | 0.2-vault-schema-normalizer | layer-0-outputs/0.2-vault-schema-normalizer.md | 1KB min |
| 0 | 0.2.5-specimen-decomposer | layer-0-outputs/0.2.5-specimen-decomposer.md | 1KB min |
| 0 | 0.2.8-tier1-expression-reference | layer-0-outputs/0.2.8-tier1-expression-reference.json | 2KB min |
| 0 | 0.3-input-threshold-validator | layer-0-outputs/0.3-input-threshold-validator.md | 1KB min |
| 0 | 0.4-component-pool-constructor | layer-0-outputs/0.4-component-pool-constructor.md | 3KB min |
| 0 | 0.5-deep-research-summarizer | layer-0-outputs/0.5-deep-research-summarizer.md | 3KB min |
| 0 | 0.6-foundation-gate | layer-0-outputs/0.6-foundation-gate.md | 1KB min |
| 1 | 1.1-pattern-analyzer | layer-1-outputs/1.1-pattern-analyzer.md | 3KB min |
| 1 | 1.2-saturation-mapper | layer-1-outputs/1.2-saturation-mapper.md | 3KB min |
| 1 | 1.3-gap-identifier | layer-1-outputs/1.3-gap-identifier.md | 3KB min |
| 1 | 1.4-emotional-mapper | layer-1-outputs/1.4-emotional-mapper.md | 3KB min |
| 1 | 1.5-mechanism-mapper | layer-1-outputs/1.5-mechanism-mapper.md | 3KB min |
| 1 | 1.6-intelligence-gate | layer-1-outputs/1.6-intelligence-gate.md | 2KB min |
| 2 | 2.1-candidate-strategy-selector | layer-2-outputs/2.1-candidate-strategy-selector.md | 3KB min |
| 2 | 2.2-candidate-architect | layer-2-outputs/2.2-candidate-architect.md | 5KB min |
| 2 | 2.3-headline-generator | layer-2-outputs/2.3-headline-generator.md | 5KB min |
| 2 | 2.4-lead-generator | layer-2-outputs/2.4-lead-generator.md | 5KB min |
| 2 | 2.5-proof-architect | layer-2-outputs/2.5-proof-architect.md | 3KB min |
| 2 | 2.6-generation-gate | layer-2-outputs/2.6-generation-gate.md | 2KB min |
| 2 | 2.7-transformation-operators | layer-2-outputs/2.7-transformation-operators.md | 3KB min |
| 3 | 3.1-volume-validator | layer-3-outputs/3.1-volume-validator.md | 2KB min |
| 3 | 3.2-quantification-validator | layer-3-outputs/3.2-quantification-validator.md | 2KB min |
| 3 | 3.3-defensibility-validator | layer-3-outputs/3.3-defensibility-validator.md | 2KB min |
| 3 | 3.4-actionability-validator | layer-3-outputs/3.4-actionability-validator.md | 2KB min |
| 3 | 3.5-anti-slop-validator | layer-3-outputs/3.5-anti-slop-validator.md | 3KB min |
| 3 | 3.6-validation-gate | layer-3-outputs/3.6-validation-gate.md | 2KB min |
| 3 | 3.7-schema-distance-calculator | layer-3-outputs/3.7-schema-distance-calculator.md | 3KB min |
| 3 | 3.8-anchor-distance-ratio | layer-3-outputs/3.8-anchor-distance-ratio.md | 3KB min |
| 3 | 3.9-expression-anchoring-score | layer-3-outputs/3.9-expression-anchoring-scores.json | 3KB min |
| 4 | 4.1-brief-compiler | layer-4-outputs/4.1-brief-compiler.md | 5KB min |
| 4 | 4.2-downstream-mapper | layer-4-outputs/4.2-downstream-mapper.md | 3KB min |
| 4 | 4.3-handoff-packager | layer-4-outputs/4.3-handoff-packager.md | 5KB min |

### Layer Gate Enhancement

Each LAYER_N_COMPLETE.yaml checkpoint MUST list all microskill output files with sizes. If ANY output file is missing, the checkpoint CANNOT be created.

### Execution Log Enhancement

Each microskill entry in execution-log.md MUST include:
- Spec file read: [Y/N] with path
- Output file created: [Y/N] with path
- Output file size: [X]KB
- Schema compliance: [Y/N]

### Forbidden Behaviors

1. ❌ Executing microskills without reading their .md spec files
2. ❌ Producing summary output without per-microskill files
3. ❌ Checkpoint YAML without microskill output file listing
4. ❌ Output files below minimum size thresholds
5. ❌ Output files missing required section headers from spec

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.2 | 2026-03-06 | SEMI-FORMAL REASONING: Added Structural Fix 11 — Semi-Formal Reasoning Template required for schema distance validation (3.7-3.8) and defensibility validation (3.3). Steel Man Gate for defensibility scoring. MC-CHECK enhanced with reasoning_quality_check. Reference: `~system/protocols/SEMI-FORMAL-REASONING-PROTOCOL.md`. |
| 2.1 | 2026-02-23 | EXPRESSION ANCHORING PROTOCOL: Added 0.2.8-tier1-expression-reference (2KB min) and 3.9-expression-anchoring-scores (3KB min) to per-microskill output table. Shared protocol: Skills/protocols/EXPRESSION-ANCHORING-PROTOCOL.md. 4-dimension scoring: Quote Penetration (30%), TIER1 Pattern Match (20%), FSSIT Echo (30%), Schema Distance × Anchoring Interaction (20%). Validates creative wrapping preserved FSSIT resonance. |
| 2.0 | 2026-02-14 | CONCEPT/NAMING SEPARATION + SOUL.MD: Added STRUCTURAL FIX 8 (Concept Checkpoint Gate) — Layer 2B Creative Wrapping cannot execute without CONCEPT_APPROVED.yaml. Includes gate file format with FSSIT anchors, 6 concept-specific forbidden rationalizations. Added STRUCTURAL FIX 9 (Soul.md Loading Gate) — mandatory Soul.md check at pre-execution with voice/energy/anti-voice extraction, creative wrapper voice-matching constraint. Added STRUCTURAL FIX 10 (Anti-Degradation Mandatory Read) — session startup protocol. BIGIDEA-MC-CHECK enhanced with concept_checkpoint_verification block (6 checks) and soul_md_check block (3 checks). Implementation checklist restructured: added PRE-EXECUTION section with Soul.md check, Layer 2 split into "Layer 2A / Phase A (Concept Generation)" and "Layer 2B / Phase B (Creative Wrapping)", new CONCEPT CHECKPOINT section with 7 items, added POST-EXECUTION section, Soul.md loading in Layer 0. Checkpoint progression updated to include CONCEPT_APPROVED.yaml between LAYER_2A and LAYER_2B. |
| 1.2 | 2026-02-12 | PER-MICROSKILL OUTPUT PROTOCOL: Added per-microskill output table (31 microskills across Layers 0-4) with minimum file size thresholds. Layer gate enhancement, execution log enhancement, forbidden behaviors for per-microskill outputs. |
| 1.1 | 2026-02-06 | ARENA MANDATORY ENFORCEMENT: Added structural fix for Arena Layer (2.5) — cannot be skipped. ARENA_COMPLETE.yaml checkpoint required before Layer 3. Added Arena-specific forbidden rationalizations. Updated checkpoint progression and implementation checklist. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |
