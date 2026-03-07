# A09-ASSEMBLY-VARIANT-MATRIX-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-22
**Purpose:** STRUCTURAL enforcement to prevent A09 assembly & variant matrix process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: A09-ASSEMBLY-VARIANT-MATRIX-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Assemble variants without coherence validation (every combination must be validated), create phantom variants listed in the matrix but whose files do not exist, or sample combinations for validation instead of validating every single one.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI assembles variants WITHOUT coherence validation (producing broken ads)
- AI generates fewer than 30 testable variants ("close enough to 30")
- AI creates phantom variants (listed in matrix but files don't exist)
- AI assembles variants without platform-specific format specs (platform-blind assembly)
- AI uses inconsistent naming convention across variants
- AI pairs incompatible elements (testimonial hook + motion graphics visual)
- AI skips incompatibility filter (producing untestable combinations)
- AI generates variants without file manifests (cannot be uploaded)
- AI claims assembly complete without verifying files exist on disk
- AI produces matrix summary under 20KB (abbreviated, not comprehensive)
- AI skips combinatorial enumeration (estimates instead of exhaustive expansion)
- AI applies coherence validation to subset instead of every combination

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/A09-assembly-variant-matrix/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/A09-assembly-variant-matrix/checkpoints/LAYER_1_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/A09-assembly-variant-matrix/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/A09-assembly-variant-matrix/checkpoints/LAYER_3_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "A09-assembly-variant-matrix"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  all_inputs_loaded: true
  combinations_enumerated: [integer]
  coherence_validated: [integer]
  variants_passing: [integer >= 30]
  all_have_variant_ids: true
  all_have_file_manifests: true
  all_files_verified_on_disk: true

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
| **Testable variants (coherent)** | 30 | HALT -- Continue coherence validation |
| **Target testable variants** | 90 | Warning if not reached, pass if >= 30 |
| **Concepts represented** | 3 | HALT -- Missing concept combinations |
| **Platforms covered** | 2 | HALT -- Insufficient platform coverage |
| **Hook variants per concept** | 5 | HALT -- Insufficient hooks from A07 |
| **Visual treatments per concept** | 2 | HALT -- Insufficient visuals from A08 |
| **Valid combinations before filtering** | 30+ | HALT -- Bottleneck analysis required |
| **Coherence pass rate** | 100% of enumerated | Every combination MUST be validated |
| **File manifest verification** | 100% | All referenced files MUST exist |
| **Orphaned variants** | 0 | HALT -- Reconcile orphaned variants |
| **Summary file size** | 20KB | HALT -- Expand to comprehensive coverage |

### Variant Naming Convention (BINDING)

```
[CONCEPT]-[HOOK]-[BODY]-[CTA]-[VISUAL]-[PLATFORM]

ALL 6 components MANDATORY
Hook and Visual: zero-padded to 2 digits (H01, V03)
Platform LAST
No spaces, no special characters

Examples:
  C1-H03-B1-CTA2-V01-META       ✓
  C2-H01-B2-CTA1-V03-TIKTOK     ✓
  C1-H7-META                    ✗ (missing components)
  C1-H03-B1-CTA2-META-V01       ✗ (platform not last)
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "most variants are coherent" | 100% of enumerated combinations must be validated. "Most" is not acceptable | HALT -- Validate remaining combinations |
| "30 is approximately 30" | 29 is not 30. Numbers are exact. | HALT -- Reach exact threshold |
| "we can validate coherence later" | Coherence IS the value of A09. Cannot defer | HALT -- Validate now |
| "the matrix is essentially complete" | "Essentially" = incomplete. Complete = all fields populated | HALT -- Complete remaining fields |
| "these variants are close enough to testable" | "Close enough" = untestable. Need file manifest + platform specs | HALT -- Complete file manifests |
| "platform specs can be added later" | Platform specs are part of assembly. Required now | HALT -- Assign platform specs |
| "coherence is subjective" | Criteria are defined (hook-body, body-CTA, hook-visual, full-unit). Not subjective | HALT -- Evaluate against criteria |
| "we have enough variants to start testing" | "Enough" is 30 minimum. Subjective not allowed | HALT -- Meet threshold |
| "upstream variants determine matrix size" | A09 must produce >= 30. If upstream insufficient, escalate | HALT -- Escalate to human |
| "I'll sample combinations for validation" | Every combination must be validated. No sampling | HALT -- Validate all |

---

## STRUCTURAL FIX 4: A09-SPECIFIC MC-CHECK

```yaml
A09-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [0 | 1 | 2 | 3 | 4]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP -- Cannot proceed without checkpoint file"

  input_verification:
    copy_catalog_loaded: [Y/N]
    asset_catalog_loaded: [Y/N]
    format_strategy_loaded: [Y/N]
    arena_results_loaded: [Y/N]
    concepts_loaded: [integer]
    minimum_concepts_met: [Y/N >= 3]
    if_any_no: "STOP -- Load missing inputs"

  combination_count_check:
    theoretical_combinations: [integer]
    incompatible_removed: [integer]
    valid_combinations: [integer]
    minimum_30_met: [Y/N]
    if_no: "STOP -- Address bottleneck or escalate"

  coherence_validation_check:
    combinations_validated: [integer]
    combinations_passing: [integer]
    minimum_30_passing: [Y/N]
    every_combination_validated: [Y/N]
    if_no: "STOP -- Complete coherence validation"

  matrix_completeness_check:
    all_variants_have_ids: [Y/N]
    all_variants_have_manifests: [Y/N]
    all_files_verified_on_disk: [Y/N]
    all_variants_have_platform_specs: [Y/N]
    orphaned_variants_count: [integer]
    if_any_no_or_orphans: "STOP -- Fix organizational gaps"

  rationalization_check:
    am_i_thinking_most_coherent: [Y/N]
    am_i_thinking_close_enough_to_30: [Y/N]
    am_i_thinking_validate_later: [Y/N]
    am_i_thinking_essentially_complete: [Y/N]
    am_i_creating_phantom_variants: [Y/N]
    am_i_skipping_platform_specs: [Y/N]
    am_i_using_inconsistent_naming: [Y/N]
    if_any_yes: "HALT -- Rationalization detected"

  result: [CONTINUE | HALT_INPUTS | HALT_COMBINATIONS | HALT_COHERENCE | HALT_MATRIX | HALT_RATIONALIZATION]
```

---

## STRUCTURAL FIX 5: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which variants passed coherence and which files are missing is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/A09-assembly-variant-matrix/
  PROJECT-STATE.md          # Living document -- updated after every layer
  PROGRESS-LOG.md           # Append-only timeline of all actions
  checkpoints/              # Gate checkpoint files
  execution-log.md          # Detailed execution record
  layer-0-outputs/          # Per-microskill output files
  layer-1-outputs/
  layer-2-outputs/
  layer-3-outputs/
  layer-4-outputs/
  AD-VARIANT-MATRIX/        # Primary deliverable directory
    VARIANT-MATRIX.yaml     # Primary structured output
    [PLATFORM]/             # Per-platform variant directories
  AD-VARIANT-MATRIX-SUMMARY.md  # Primary summary handoff
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "A09-assembly-variant-matrix"
created: "[date]"
last_updated: "[date]"
current_layer: "[0/1/2/3/4]"
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"

input_inventory:
  concepts_loaded: [count]
  hooks_per_concept: [count]
  bodies_per_concept: [count]
  ctas_per_concept: [count]
  visuals_per_concept: [count]
  platforms_targeted: [count]

combination_progress:
  theoretical_combinations: [count]
  valid_combinations: [count]
  incompatible_removed: [count]

coherence_progress:
  combinations_validated: [count]
  pass_count: [count]
  fail_count: [count]
  flag_count: [count]

matrix_progress:
  variants_in_matrix: [count]
  tier_1_count: [count]
  tier_2_count: [count]
  tier_3_count: [count]

gate_status:
  GATE_0: [PASS/PENDING]
  GATE_1: [PASS/FAIL/PENDING]
  GATE_2: [PASS/FAIL/PENDING]
  GATE_3: [PASS/FAIL/PENDING]
  GATE_4: [PASS/FAIL/PENDING]
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 6: BINARY GATE ENFORCEMENT (FORBIDDEN STATUSES)

### The Problem
Previous skills had models invent gate statuses like "PARTIAL_PASS" and "CONDITIONAL_PASS" -- statuses that don't exist.

### The Fix

**Gate statuses are BINARY: PASS or FAIL. No other status exists.**

```
VALID GATE STATUSES (checkpoint files):
  COMPLETE (layer checkpoint)
  PASS (gate evaluation)

VALID DECISION STATUSES (validation layer):
  approved
  revision (return to previous layer)
  blocked (return to earlier layer)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  approved_with_concerns / conditional_approval
  PROCEED_WITH_CONCERNS / WARNING
  "good enough" / "acceptable for now"
  "close to 30" / "approximately 30"
  "most variants coherent" / "coherence mostly complete"

IF any forbidden status is generated:
  1. HALT immediately
  2. DELETE any output files created under the false status
  3. RETURN to the failing layer
  4. Re-evaluate with valid statuses only
```

---

## STRUCTURAL FIX 7: STALE ARTIFACT CLEANUP

### The Fix

**Before writing ANY replacement output file, VERIFY and DELETE stale artifacts:**

```
STALE ARTIFACT PROTOCOL:

BEFORE writing VARIANT-MATRIX.yaml or summary files:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/variant-matrix.yaml (root -- from failed attempts)
     - [project]/A09-assembly-variant-matrix/VARIANT-MATRIX.yaml (wrong location)
     - [project]/AD-VARIANT-MATRIX/VARIANT-MATRIX.yaml (correct location)
     - [project]/outputs/variant-matrix.yaml (wrong path)
  2. IF stale file exists at wrong location:
     - DELETE it
     - LOG deletion in PROGRESS-LOG.md
  3. ONLY THEN write the new output files

AFTER any FAILED attempt:
  1. DELETE all output artifacts from the failed attempt
  2. LOG the failure and cleanup in PROGRESS-LOG.md
```

---

## STRUCTURAL FIX 8: ANTI-DEGRADATION MANDATORY READ

### The Fix

**Session startup protocol -- BEFORE any A09 execution:**

```
SESSION STARTUP:
  1. READ this file (A09-ASSEMBLY-VARIANT-MATRIX-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ A09-ASSEMBLY-VARIANT-MATRIX-AGENT.md -- agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current layer and counts
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin A09 execution without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Reference:** ./CLAUDE.md MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.0.1-vertical-profile-loader | layer-0-outputs/0.0.1-vertical-profile-loader.md | 1KB |
| 0 | 0.1-copy-variant-loader | layer-0-outputs/0.1-copy-variant-loader.md | 2KB |
| 0 | 0.2-asset-loader | layer-0-outputs/0.2-asset-loader.md | 2KB |
| 0 | 0.3-format-strategy-loader | layer-0-outputs/0.3-format-strategy-loader.md | 1KB |
| 0 | 0.4-arena-results-loader | layer-0-outputs/0.4-arena-results-loader.md | 1KB |
| 0 | 0.5-input-validator | layer-0-outputs/0.5-input-validator.md | 2KB |
| 1 | 1.1-combinatorial-expander | layer-1-outputs/1.1-combinatorial-expander.md | 5KB |
| 1 | 1.2-incompatibility-filter | layer-1-outputs/1.2-incompatibility-filter.md | 5KB |
| 1 | 1.3-platform-specific-mapper | layer-1-outputs/1.3-platform-specific-mapper.md | 3KB |
| 1 | 1.4-combination-validator | layer-1-outputs/1.4-combination-validator.md | 3KB |
| 2 | 2.1-hook-body-coherence | layer-2-outputs/2.1-hook-body-coherence.md | 5KB |
| 2 | 2.2-body-cta-coherence | layer-2-outputs/2.2-body-cta-coherence.md | 5KB |
| 2 | 2.3-hook-visual-coherence | layer-2-outputs/2.3-hook-visual-coherence.md | 5KB |
| 2 | 2.4-full-unit-coherence | layer-2-outputs/2.4-full-unit-coherence.md | 5KB |
| 2 | 2.5-coherence-validator | layer-2-outputs/2.5-coherence-validator.md | 3KB |
| 3 | 3.1-variant-id-assigner | layer-3-outputs/3.1-variant-id-assigner.md | 3KB |
| 3 | 3.2-testing-priority-assigner | layer-3-outputs/3.2-testing-priority-assigner.md | 3KB |
| 3 | 3.3-file-manifest-builder | layer-3-outputs/3.3-file-manifest-builder.md | 5KB |
| 3 | 3.4-platform-grouper | layer-3-outputs/3.4-platform-grouper.md | 3KB |
| 3 | 3.5-matrix-validator | layer-3-outputs/3.5-matrix-validator.md | 3KB |
| 4 | 4.1-variant-matrix-assembler | layer-4-outputs/4.1-variant-matrix-assembler.md | Variable |
| 4 | 4.2-platform-directory-builder | layer-4-outputs/4.2-platform-directory-builder.md | 2KB |
| 4 | 4.3-summary-assembler | layer-4-outputs/4.3-summary-assembler.md | 20KB |
| 4 | 4.4-checkpoint-and-log | layer-4-outputs/4.4-checkpoint-and-log.md | 3KB |

### Layer Gate Enhancement

Each LAYER_N_COMPLETE.yaml checkpoint MUST list all microskill output files with sizes. If ANY output file is missing, the checkpoint CANNOT be created.

### Execution Log Enhancement

Each microskill entry in execution-log.md MUST include:
- Spec file read: [Y/N] with path
- Output file created: [Y/N] with path
- Output file size: [X]KB
- Schema compliance: [Y/N]

### Forbidden Behaviors

1. Executing microskills without reading their .md spec files
2. Producing summary output without per-microskill files
3. Checkpoint YAML without microskill output file listing
4. Output files below minimum size thresholds
5. Output files missing required section headers from spec

---

## COHERENCE VALIDATION RULES (DETAILED)

### Hook-Body Coherence Rules

| Hook Type Category | Body Must Deliver | FAIL If Body... |
|--------------------|-------------------|-----------------|
| **Curiosity/Information Gap** (A) | Answer the question or close the gap | Discusses unrelated topic |
| **Authority/Social Proof** (B) | Present the authority's claim or proof | Ignores the authority entirely |
| **Problem/Pain** (C) | Address the specific problem named in hook | Pivots to different problem |
| **Transformation/Results** (D) | Show or explain the transformation | Discusses theory without results |
| **Identity/Belonging** (E) | Speak to the identified group | Addresses different audience |
| **Pattern Interrupt** (F) | Resolve the interrupt with relevance | Stays absurd without connecting to product |
| **Platform-Native** (G) | Match the native format's expectations | Breaks platform conventions |
| **Scarcity/Urgency** (H) | Justify the urgency with real reason | Provides no urgency justification |
| **Value/Education** (I) | Deliver the promised value/education | Withholds value behind hard sell |
| **Story/Narrative** (J) | Continue the story arc | Abandons the narrative |

### Hook-Visual Coherence Rules

| Hook Type | Compatible Visual Styles | Incompatible Visual Styles |
|-----------|------------------------|--------------------------|
| Testimonial/UGC hooks | UGC, talking head, before/after | Polished studio, motion graphics |
| Data/Statistics hooks | Text overlay, charts, split-screen | Lifestyle, pure product demo |
| Demonstration hooks | Product demo, screen recording, before/after | Pure text overlay, abstract motion |
| Authority hooks | Talking head, credentialed setting | UGC casual, humor/absurd |
| Story/Narrative hooks | Lifestyle, talking head, mixed | Pure text, charts, data visualization |
| Pattern Interrupt hooks | Any (interrupt defines the style) | BUT visual must match the specific interrupt |
| Question hooks | Text overlay, talking head | N/A -- most visuals work |

### Body-CTA Coherence Rules

| Body Type | Compatible CTAs | Incompatible CTAs |
|-----------|----------------|-------------------|
| Educational/value-first | "Learn more", "Watch free video", "Get the guide" | "Buy now", "Order today" (too aggressive) |
| Problem-agitation | "Discover the solution", "See if you qualify" | "Subscribe" (no solution implied) |
| Proof/testimonial | "Try it risk-free", "Join X customers" | "Learn more" (they've already learned) |
| Offer/price-focused | "Claim your discount", "Order now", "Get started" | "Read more" (price demands action) |
| Mechanism explanation | "See how it works", "Watch the presentation" | "Limited time offer" (mechanism != urgency) |
| Urgency/scarcity | "Claim before midnight", "Only X left" | "Learn more" (urgency demands action) |

---

## INCOMPATIBILITY FILTER RULES (DETAILED)

### Structural Incompatibilities (Always Filter)

| Rule ID | Incompatibility | Reason |
|---------|----------------|--------|
| INC-01 | Video hook + static image visual | Cannot have moving hook on a still image |
| INC-02 | Sound-dependent hook + Meta feed (sound-off) | 85% of Meta feed is sound-off |
| INC-03 | 3-minute body + TikTok (max 60s for most formats) | Body exceeds platform duration limit |
| INC-04 | Horizontal (16:9) visual + TikTok feed (9:16 native) | Format mismatch -- unless cropped |
| INC-05 | "Swipe Up" CTA + non-Stories format | Swipe Up only available in Stories/Reels |
| INC-06 | Carousel body + video visual | Carousel is image-based, not video |
| INC-07 | 6-second body + detailed mechanism explanation | Mechanism cannot be explained in 6 seconds |

### Soft Incompatibilities (Filter with Note)

| Rule ID | Incompatibility | Can Override If... |
|---------|----------------|--------------------|
| SINC-01 | UGC hook + polished visual | Visual is intentionally "elevated UGC" style |
| SINC-02 | Data hook + lifestyle visual | Data is overlaid on lifestyle footage |
| SINC-03 | Humor hook + authority body | Humor-to-authority tonal shift is intentional |
| SINC-04 | Testimonial hook + no testimonial in body | Hook references a testimonial that appears later in body |

Soft incompatibilities produce FLAG status, not FAIL. They require human review.

---

## TESTING PRIORITY ALGORITHM

Each variant's testing priority is calculated from 4 weighted factors:

```
PRIORITY_SCORE = (0.35 * arena_score_normalized) +
                 (0.25 * coherence_score_normalized) +
                 (0.25 * hook_performance_score) +
                 (0.15 * platform_priority_score)

WHERE:
  arena_score_normalized = parent concept's Arena score / 10
  coherence_score_normalized = full-unit coherence score / 10
  hook_performance_score = hook type's benchmark performance from A01 / 10
  platform_priority_score = platform priority rank from A03 (primary=1.0, secondary=0.7, tertiary=0.4)

TIER ASSIGNMENT:
  TIER_1: top 20% by PRIORITY_SCORE
  TIER_2: middle 50% by PRIORITY_SCORE
  TIER_3: bottom 30% by PRIORITY_SCORE
```

---

## MODEL ASSIGNMENT (BINDING)

| Phase | Skills | Model | Reason |
|-------|--------|-------|--------|
| Pre-Execution | Infra | haiku | File creation, directory setup -- mechanical only |
| Layer 0 | 0.0.1-0.5 | haiku | Loading, validation, cataloguing -- mechanical extraction |
| Layer 1 | 1.1-1.4 | sonnet | Combinatorial expansion + filtering requires moderate reasoning |
| Layer 2 | 2.1-2.5 | opus | Coherence validation is CORE VALUE -- requires deep reasoning |
| Layer 3 | 3.1-3.5 | sonnet | Matrix organization is structured/mechanical, not creative |
| Layer 4 | 4.1-4.4 | sonnet | Assembly and formatting -- structured packaging |

**Enforcement:** Using a different model requires HUMAN APPROVAL with documented reason.

---

## SUBAGENT CONTEXT TEMPLATE

**Every subagent spawned by the A09 orchestrator MUST receive this structured context:**

```
+------------------------------------------------------------------------------+
|  SUBAGENT CONTEXT TEMPLATE -- ALL 8 SECTIONS MANDATORY                        |
+------------------------------------------------------------------------------+

## 1. MODEL
[haiku | sonnet | opus -- from Binding Model Assignment Table]

## 2. PERSONA
[Task-specific persona from Persona Library in AGENT.md]

## 3. OBJECTIVE
[Exact task description -- what this subagent must produce]

## 4. VARIANT TARGETS
[Exact numeric targets]
- Total combinations to process: [X]
- Minimum pass threshold: [X]
- Platform coverage requirement: [X]

## 5. INPUTS
[Exact file paths the subagent must read]
- Copy Catalog: [path]
- Asset Catalog: [path]
- Platform Specs: [path]
- Arena Scores: [path]
- Previous layer outputs: [paths if any]

## 6. CONSTRAINTS
[Skill-specific rules that apply to this subagent]
- Naming convention: [CONCEPT]-[HOOK]-[BODY]-[CTA]-[VISUAL]-[PLATFORM]
- Coherence criteria: [reference to specific rules]
- Platform requirements: [reference to platform specs]

## 7. ERROR HANDLING
[What to do if issues arise]
- Missing file references: log and flag, do not skip
- Ambiguous coherence: FLAG (not PASS or FAIL)
- Escalation: log issue and continue with remaining variants

## 8. OUTPUT FORMAT
[Exact output file path and required structure]
- Output file: [path]
- Required sections: [list]
- Minimum size: [X]KB
```

**Ad-hoc prompts without all 8 sections are FORBIDDEN.**

---

## FORBIDDEN BEHAVIORS (A09-Specific)

### Assembly Failures
1. Writing new copy (A09 assembles existing A07 copy, it NEVER writes new copy)
2. Modifying visual assets (A09 pairs existing A08 assets, it NEVER edits assets)
3. Assembling variants without coherence validation
4. Claiming assembly is complete with fewer than 30 passing variants
5. Creating variant IDs that don't follow the binding naming convention
6. Mixing up concept numbering (C1/C2/C3 must match Arena results)

### Coherence Validation Failures
7. Batch-validating coherence ("these 40 are all coherent" without individual evaluation)
8. Skipping any coherence dimension (hook-body, body-CTA, hook-visual, full-unit)
9. Marking ambiguous cases as PASS instead of FLAG
10. Validating fewer than 100% of enumerated combinations
11. Applying coherence rules inconsistently across combinations
12. Ignoring hook type when evaluating hook-visual coherence

### Combination Generation Failures
13. Estimating combinations instead of enumerating them
14. Skipping the incompatibility filter
15. Not logging WHY incompatible pairs were removed
16. Missing combinations because of incomplete Cartesian product
17. Applying platform-specific filters without loading A03 format strategy

### Matrix Organization Failures
18. Variants in the matrix that reference non-existent files (phantom variants)
19. Variants without testing priority assignment
20. Variants without platform-specific format specs
21. Orphaned variants (in matrix but not in manifest, or in manifest but not in matrix)
22. Inconsistent variant IDs across matrix, manifest, and platform directories

### Output Failures
23. VARIANT-MATRIX.yaml with fewer variants than Layer 3 validated
24. AD-VARIANT-MATRIX-SUMMARY.md under 20KB
25. Missing any of the 7 required summary sections
26. Platform directories that don't match the variant matrix
27. Assembling outputs in a single write operation when variant count exceeds 30

### Process Failures
28. Executing Layer N+1 without LAYER_N_COMPLETE.yaml existing
29. Inventing gate statuses other than PASS or FAIL
30. Spawning subagents without the 8-section structured context template
31. Using wrong model for a subagent (not matching the Binding Model Assignment Table)
32. Skipping MC-CHECK for more than 30 minutes during execution
33. Not updating PROJECT-STATE.md after every major operation

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 5, 8):
[ ] A09-ASSEMBLY-VARIANT-MATRIX-ANTI-DEGRADATION.md read (THIS FILE)
[ ] A09-ASSEMBLY-VARIANT-MATRIX-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 7)
[ ] All upstream files verified (A07, A08, A03, A06)

LAYER 0 (LOADING):
[ ] Vertical profile loaded (if exists)
[ ] Copy catalog loaded from A07 (all concepts, hooks, bodies, CTAs)
[ ] Asset catalog loaded from A08 (all concepts, visuals, videos, audio)
[ ] Format strategy loaded from A03 (platform list, format requirements)
[ ] Arena results loaded from A06 (winning concepts with scores)
[ ] All inputs validated (cross-referenced, minimums met)
[ ] LAYER_0_COMPLETE.yaml created

LAYER 1 (COMBINATION GENERATION):
[ ] Full Cartesian product computed (ALL combinations enumerated)
[ ] Incompatibility filter applied with logged removals
[ ] Platform-specific mapping completed
[ ] Minimum 30 valid combinations verified
[ ] Concepts >= 3, Platforms >= 2 verified
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (COHERENCE VALIDATION -- CANNOT BE SKIPPED):
[ ] Hook-Body coherence evaluated for EVERY combination
[ ] Body-CTA coherence evaluated for EVERY combination
[ ] Hook-Visual coherence evaluated for EVERY combination
[ ] Full-Unit coherence evaluated for EVERY combination
[ ] Minimum 30 PASS variants verified
[ ] All failure reasons documented
[ ] LAYER_2_COMPLETE.yaml created

LAYER 3 (MATRIX ORGANIZATION):
[ ] Variant IDs assigned to ALL passing variants (naming convention)
[ ] Testing priority assigned to ALL variants (algorithm applied)
[ ] File manifests built for ALL variants
[ ] ALL file manifests verified (files exist on disk)
[ ] Platform groups created
[ ] Zero orphaned variants confirmed
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (OUTPUT PACKAGING):
[ ] VARIANT-MATRIX.yaml assembled with ALL variants
[ ] Per-platform directories created
[ ] AD-VARIANT-MATRIX-SUMMARY.md created (>= 20KB)
[ ] All 7 required summary sections populated
[ ] Execution log complete
[ ] All checkpoint files exist
[ ] LAYER_4_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated with completion
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY coherence was completed (not skipped)
[ ] VERIFY variant count is exact (not "approximately 30")
[ ] VERIFY file manifests reference existing files
[ ] VERIFY naming convention is consistent
[ ] If any gaps found, RETURN to appropriate layer
```

---

## KEY INSIGHT

> **"Coherence is non-negotiable. Every assembled variant must work as a complete, coherent ad unit. A hook that promises one thing paired with a body that delivers another is not a 'testable variant' -- it is waste. Assembly without coherence validation produces 90 broken ads instead of 90 testable ones. The coherence gate is the entire value of this skill."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation with 8 structural fixes, coherence validation rules (3 dimensions with detailed matching tables), incompatibility filter rules (7 hard + 4 soft), testing priority algorithm (4 weighted factors), per-microskill output table (24 microskills), implementation checklist, 33 forbidden behaviors, model assignment table, subagent context template. Full A09 anti-degradation architecture. |
