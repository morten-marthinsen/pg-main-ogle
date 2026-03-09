# A02-HOOK-ANGLE-DISCOVERY-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-22
**Purpose:** STRUCTURAL enforcement to prevent hook & angle discovery process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: A02-HOOK-ANGLE-DISCOVERY-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Generate the big idea AS the hook instead of entry points that LEAD to the big idea, generate fewer than 50 hooks and declare "these are the strongest", or bypass the mandatory human curation checkpoint by auto-selecting winners.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**

- AI generates generic hooks ("Want better skin?" instead of "I threw out every product my dermatologist recommended")
- AI generates the big idea AS the hook instead of generating entry points that LEAD to the big idea
- AI generates 50 hooks but they're all variations of 2-3 types (all questions, all curiosity gaps) instead of spanning the 32-type taxonomy
- AI generates hooks without traceability to strategic angles (orphaned hooks with no angle attribution)
- AI generates 15 hooks and declares "these are the strongest" without hitting the 50+ minimum
- AI scores hooks and auto-selects winners, bypassing mandatory human curation checkpoint
- AI invents angles instead of deriving them from research and strategy (synthesizing instead of extracting)
- AI generates angles that ARE the big idea instead of entry points TO the big idea
- AI skips automated scoring or scores on fewer than 6 criteria
- AI proceeds without loading AD-HOOK-TAXONOMY.md (all 32 types required in active context)

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/A02-hook-angle-discovery/checkpoints/GATE_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/A02-hook-angle-discovery/checkpoints/GATE_1_COMPLETE.yaml
```

**Layer 2.5 CANNOT execute unless this file exists:**
```
[project]/A02-hook-angle-discovery/checkpoints/GATE_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/A02-hook-angle-discovery/checkpoints/GATE_2.5_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless BOTH files exist:**
```
[project]/A02-hook-angle-discovery/checkpoints/GATE_3_COMPLETE.yaml
[project]/A02-hook-angle-discovery/HUMAN_SELECTION.yaml
```

### Checkpoint File Format

```yaml
# GATE_0_COMPLETE.yaml
gate: 0
skill: "A02-hook-angle-discovery"
timestamp: "[ISO 8601]"
result: PASS

inputs_loaded:
  campaign_brief: true
  research_handoff: true
  root_cause: true
  mechanism: true
  promise: true
  big_idea: true
  ad_intelligence_handoff: true
  hook_taxonomy: true

vertical_profile: "[vertical name or 'universal']"
big_idea_statement: "[1-2 sentence big idea from Skill 06]"
market_awareness_level: "[unaware/problem-aware/solution-aware/product-aware/most-aware]"
target_platforms: "[list from Campaign Brief]"

all_required_inputs: true
```

```yaml
# GATE_1_COMPLETE.yaml
gate: 1
skill: "A02-hook-angle-discovery"
timestamp: "[ISO 8601]"
result: PASS

angle_counts:
  pain_based: [count]
  mechanism_based: [count]
  identity_based: [count]
  proof_based: [count]
  competitive_gap: [count]
  total_after_dedup: [count]  # must be >= 10

categories_represented: [count]  # must be >= 3
all_angles_have_source: true
no_angle_is_big_idea: true

microskill_outputs:
  - id: "1.1"
    file: "layer-1-outputs/1.1-pain-angles.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "1.2"
    file: "layer-1-outputs/1.2-mechanism-angles.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "1.3"
    file: "layer-1-outputs/1.3-identity-angles.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "1.4"
    file: "layer-1-outputs/1.4-proof-angles.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "1.5"
    file: "layer-1-outputs/1.5-competitive-gap-angles.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "1.6"
    file: "layer-1-outputs/1.6-ranked-angles.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "1.7"
    file: "layer-1-outputs/1.7-layer1-validation.md"
    size_bytes: [integer]
    minimum_met: true

all_outputs_verified: true
```

```yaml
# GATE_2_COMPLETE.yaml
gate: 2
skill: "A02-hook-angle-discovery"
timestamp: "[ISO 8601]"
result: PASS

hook_counts:
  total_after_dedup: [count]  # must be >= 50
  by_category:
    A_curiosity: [count]
    B_authority: [count]
    C_pain: [count]
    D_transformation: [count]
    E_urgency: [count]
    F_engagement: [count]
    G_visual: [count]
    H_humor: [count]
    I_list: [count]
    J_special: [count]

types_represented: [count]  # must be >= 8
types_list: "[comma-separated type codes]"
angles_with_hooks: [count]  # must be >= 8
all_hooks_classified: true
all_hooks_attributed: true
all_hooks_platform_tagged: true

microskill_outputs:
  - id: "2.1"
    file: "layer-2-outputs/2.1-hook-type-matrix.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "2.2"
    file: "layer-2-outputs/2.2-hooks-curiosity.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "2.3"
    file: "layer-2-outputs/2.3-hooks-authority-pain.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "2.4"
    file: "layer-2-outputs/2.4-hooks-transform-identity.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "2.5"
    file: "layer-2-outputs/2.5-hooks-native-value-story.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "2.6"
    file: "layer-2-outputs/2.6-deduplicated-hooks.md"
    size_bytes: [integer]
    minimum_met: true
  - id: "2.7"
    file: "layer-2-outputs/2.7-layer2-validation.md"
    size_bytes: [integer]
    minimum_met: true

all_outputs_verified: true
```

```yaml
# GATE_2.5_COMPLETE.yaml
gate: 2.5
skill: "A02-hook-angle-discovery"
timestamp: "[ISO 8601]"
result: PASS

scoring_summary:
  total_hooks_scored: [count]
  composite_threshold: [7.0 or 6.5]
  hooks_above_threshold: [count]  # must be >= 15
  hooks_advancing: [count]  # 15-20

score_distribution:
  above_8: [count]
  7_to_8: [count]
  6_to_7: [count]
  below_6: [count]

type_diversity_in_top_20:
  types_represented: [count]

angle_diversity_in_top_20:
  angles_represented: [count]

all_outputs_verified: true
```

```yaml
# GATE_3_COMPLETE.yaml
gate: 3
skill: "A02-hook-angle-discovery"
timestamp: "[ISO 8601]"
result: PASS

human_selection_received: true
hooks_selected: [count]  # must be >= 8
hooks_modified: [count]
new_hooks_added: [count]

HUMAN_SELECTION_yaml_exists: true
```

```yaml
# GATE_4_COMPLETE.yaml
gate: 4
skill: "A02-hook-angle-discovery"
timestamp: "[ISO 8601]"
result: PASS

primary_output:
  file: "HOOK-ANGLE-MATRIX.md"
  size_bytes: [integer]  # must be >= 30720 (30KB)
  sections_populated: 7  # must be 7/7

execution_log:
  file: "execution-log.md"
  exists: true

all_gates_passed: [0, 1, 2, 2.5, 3, 4]
skill_complete: true
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Strategic angles (Layer 1)** | 10 angles | HALT -- Return to Layer 1 angle mining and expand |
| **Angle categories represented** | 3 of 5 categories | HALT -- Mine underrepresented categories |
| **Angle source attribution** | 100% of angles | HALT -- Add missing source quotes/data |
| **Total hooks generated (Layer 2)** | 50 unique hooks | HALT -- Continue generating, return to 2.2-2.5 |
| **Hook types represented** | 8 of 32 types | HALT -- Generate hooks in underrepresented types |
| **Hook classification** | 100% of hooks | HALT -- Classify all unclassified hooks |
| **Hook angle attribution** | 100% of hooks | HALT -- Attribute all orphaned hooks |
| **Hook platform tagging** | 100% of hooks | HALT -- Tag all untagged hooks |
| **Hooks above threshold (Layer 2.5)** | 15 hooks | HALT -- Lower threshold to 6.5 or return to Layer 2 |
| **Human-selected hooks (Layer 3)** | 8 hooks | HALT -- Request additional selections from human |
| **HOOK-ANGLE-MATRIX.md size** | 30KB | HALT -- Output is too thin, expand all sections |

### AD-HOOK-TAXONOMY.md Loading Protocol

**BEFORE ANY HOOK GENERATION:**

```yaml
taxonomy_protocol:
  step_1: "READ References/AD-HOOK-TAXONOMY.md"
  step_2: "LOAD all 32 hook types into active context"
  step_3: "HOLD taxonomy during entire Layer 2 execution"
  step_4: "DO NOT summarize types -- use VERBATIM taxonomy definitions"

  hook_type_categories:
    A_curiosity: "[A1-A6] -- 6 types"
    B_authority: "[B1-B4] -- 4 types"
    C_pain: "[C1-C4] -- 4 types"
    D_transformation: "[D1-D3] -- 3 types"
    E_urgency: "[E1-E3] -- 3 types"
    F_engagement: "[F1-F4] -- 4 types"
    G_visual: "[G1-G4] -- 4 types"
    H_humor: "[H1-H2] -- 2 types"
    I_list: "[I1-I2] -- 2 types"
    J_special: "[J1-J3] -- 3 types"

  IF taxonomy_not_loaded:
    HALT -- "Cannot generate hooks without AD-HOOK-TAXONOMY.md in active context"
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "Quality over quantity -- these 15 hooks are better than 50 mediocre ones" | BOTH quality AND quantity required. Generate 50+ first, THEN score for quality. | HALT -- Continue generating to 50+ |
| "We don't need all 32 hook types" | Minimum 8 types required, not all 32. But monoculture (all one type) is forbidden. | HALT -- Generate in underrepresented types |
| "The big idea IS the best hook" | Structurally impossible. Big idea is destination. Hooks are entry points. | HALT -- Generate hooks that LEAD to big idea |
| "These angles are obvious from the brief" | Angles must be DERIVED from research quotes with source attribution, not assumed. | HALT -- Extract angles from research with citations |
| "Scoring is subjective so automated scoring doesn't help" | Systematic scoring surfaces hooks that would be overlooked. Human curation is the subjective step. | HALT -- Score all hooks on all 6 criteria |
| "The human can select from 10 hooks instead of 15-20" | Present 15-20. The human may surprise you with what they select. | HALT -- Advance 15-20 hooks minimum |
| "Platform tags don't matter at this stage" | Platform awareness during generation produces better hooks. A TikTok hook differs from a YouTube hook. | HALT -- Tag all hooks with platform recommendations |
| "These hooks are good enough" | "Good enough" does not exist. Hit the numbers, THEN curate. | HALT -- Meet all minimums before proceeding |
| "Close to 50 hooks" | 49 is not 50. Numbers are exact, not approximate. | HALT -- Generate to exactly 50+ |
| "Most hooks are classified" | 100% means 100%. | HALT -- Classify all remaining hooks |
| "We can skip human curation -- the scores are clear" | Human selection is BLOCKING. Cannot be bypassed. | HALT -- Wait for HUMAN_SELECTION.yaml |
| "8 hook types if you count subtypes" | 8 means 8 distinct type codes from the 32-type taxonomy. | HALT -- Verify type codes from taxonomy |

---

## STRUCTURAL FIX 4: A02-SPECIFIC MC-CHECK

```yaml
A02-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [0 | 1 | 2 | 2.5 | 3 | 4]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP -- Cannot proceed without checkpoint file"

  taxonomy_verification:
    taxonomy_loaded: [Y/N]  # Is AD-HOOK-TAXONOMY.md in active context?
    loaded_verbatim: [Y/N]  # Not summarized?
    all_32_types_available: [Y/N]
    if_any_no: "STOP -- Load taxonomy verbatim before hook generation"

  angle_verification:
    angles_from_research: [Y/N]  # Derived from upstream, not invented?
    all_angles_have_source: [Y/N]
    no_angle_is_big_idea: [Y/N]
    angle_count: [exact]  # Is it >= 10?
    if_any_no: "STOP -- Fix angle issues before hook generation"

  hook_count_verification:
    hook_count: [exact]  # Is it >= 50?
    type_diversity: [count]  # Is it >= 8 types?
    all_hooks_attributed: [Y/N]  # Does every hook trace to an angle?
    if_any_no: "STOP -- Complete hook generation requirements"

  scoring_verification:
    all_hooks_scored: [Y/N]
    scored_on_6_criteria: [Y/N]
    hooks_above_threshold: [count]  # Is it >= 15?
    if_any_no: "STOP -- Complete automated scoring"

  human_selection_verification:
    at_layer_3: [Y/N]
    HUMAN_SELECTION_yaml_exists: [Y/N]
    hooks_selected: [count]  # Is it >= 8?
    if_at_layer_3_and_missing: "STOP -- Human selection is BLOCKING"

  rationalization_check:
    am_i_generating_big_idea_as_hook: [Y/N]
    am_i_generating_only_one_type: [Y/N]
    am_i_thinking_good_enough_with_low_count: [Y/N]
    am_i_thinking_skip_human_curation: [Y/N]
    am_i_inventing_angles_instead_of_deriving: [Y/N]
    if_any_yes: "HALT -- Rationalization detected"

  result: [CONTINUE | HALT_TAXONOMY | HALT_ANGLES | HALT_HOOKS | HALT_SCORING | HALT_SELECTION]
```

---

## STRUCTURAL FIX 5: MANDATORY PROJECT INFRASTRUCTURE

### The Problem

Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which angles were approved and which hooks were selected is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/A02-hook-angle-discovery/
  PROJECT-STATE.md          # Living document -- updated after every layer
  PROGRESS-LOG.md           # Append-only timeline of all actions
  checkpoints/              # Gate checkpoint files
  execution-log.md          # Detailed execution record
  layer-0-outputs/          # Per-microskill output files
  layer-1-outputs/
  layer-2-outputs/
  layer-2.5-outputs/
  layer-3-outputs/
  HOOK-ANGLE-MATRIX.md      # Primary output
  HUMAN_SELECTION.yaml      # Human curation selections
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "A02-hook-angle-discovery"
created: "[date]"
last_updated: "[date]"
current_layer: [0-4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"

inputs_validated:
  campaign_brief: [Y/N]
  research_handoff: [Y/N]
  root_cause: [Y/N]
  mechanism: [Y/N]
  promise: [Y/N]
  big_idea: [Y/N]
  ad_intelligence: [Y/N]
  hook_taxonomy: [Y/N]

layer_1_complete:
  angles_discovered: [count]
  top_3_angles: "[list]"

layer_2_complete:
  hooks_generated: [count]
  types_represented: [count]

layer_2_5_complete:
  hooks_advancing: [count]
  composite_threshold: [value]

layer_3_complete:
  hooks_selected: [count]
  human_notes: "[any direction from human]"
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 6: BINARY GATE ENFORCEMENT (FORBIDDEN STATUSES)

### The Problem

Previous skills had models invent gate statuses like "PARTIAL_PASS" and "CONDITIONAL_PASS" -- statuses that don't exist.

### The Fix

**Gate statuses are BINARY: PASS or FAIL. No invented statuses.**

```
VALID GATE STATUSES (checkpoint files):
  COMPLETE (layer checkpoint)
  PASS (gate evaluation)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  approved_with_concerns / conditional_approval
  PROCEED_WITH_CONCERNS / WARNING
  "good enough" / "acceptable for now"
  "close to 50 hooks" / "approximately 10 angles"
  "most hooks are classified" / "nearly all hooks scored"

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

BEFORE writing hook outputs or HOOK-ANGLE-MATRIX.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/HOOK-ANGLE-MATRIX.md (root -- from failed attempts)
     - [project]/A02-hook-angle-discovery/HOOK-ANGLE-MATRIX.md (correct location)
     - [project]/outputs/HOOK-ANGLE-MATRIX.md (wrong path)
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

**Session startup protocol -- BEFORE any A02 execution:**

```
SESSION STARTUP:
  1. READ this file (A02-HOOK-ANGLE-DISCOVERY-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ A02-HOOK-ANGLE-DISCOVERY-AGENT.md -- agent architecture and constraints
  3. READ AD-ENGINE-CLAUDE.md -- The 5 Laws, Hook vs Big Idea Distinction
  4. IF resuming: READ PROJECT-STATE.md for current layer position
  5. IF resuming: READ checkpoint files to verify layer completion
  6. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  7. ONLY THEN begin execution

NEVER begin hook/angle generation without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Reference:** ./CLAUDE.md MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.0.1-vertical-profile-loader | layer-0-outputs/0.0.1-vertical-profile.md | 1KB |
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-packages.md | 2KB |
| 0 | 0.2-ad-intelligence-loader | layer-0-outputs/0.2-ad-intelligence.md | 2KB |
| 0 | 0.3-hook-taxonomy-loader | layer-0-outputs/0.3-hook-taxonomy.md | 2KB |
| 0 | 0.4-soul-md-loader | layer-0-outputs/0.4-soul-md.md | 1KB |
| 0 | 0.5-input-validator | layer-0-outputs/0.5-input-validation.md | 1KB |
| 1 | 1.1-pain-angles | layer-1-outputs/1.1-pain-angles.md | 3KB |
| 1 | 1.2-mechanism-angles | layer-1-outputs/1.2-mechanism-angles.md | 3KB |
| 1 | 1.3-identity-angles | layer-1-outputs/1.3-identity-angles.md | 3KB |
| 1 | 1.4-proof-angles | layer-1-outputs/1.4-proof-angles.md | 3KB |
| 1 | 1.5-competitive-gap-angles | layer-1-outputs/1.5-competitive-gap-angles.md | 3KB |
| 1 | 1.6-ranked-angles | layer-1-outputs/1.6-ranked-angles.md | 5KB |
| 1 | 1.7-layer1-validation | layer-1-outputs/1.7-layer1-validation.md | 2KB |
| 2 | 2.1-hook-type-matrix | layer-2-outputs/2.1-hook-type-matrix.md | 3KB |
| 2 | 2.2-hooks-curiosity | layer-2-outputs/2.2-hooks-curiosity.md | 5KB |
| 2 | 2.3-hooks-authority-pain | layer-2-outputs/2.3-hooks-authority-pain.md | 5KB |
| 2 | 2.4-hooks-transform-identity | layer-2-outputs/2.4-hooks-transform-identity.md | 5KB |
| 2 | 2.5-hooks-native-value-story | layer-2-outputs/2.5-hooks-native-value-story.md | 5KB |
| 2 | 2.6-deduplicated-hooks | layer-2-outputs/2.6-deduplicated-hooks.md | 5KB |
| 2 | 2.7-layer2-validation | layer-2-outputs/2.7-layer2-validation.md | 2KB |
| 2.5 | 2.5.1-scroll-stop-scores | layer-2.5-outputs/2.5.1-scroll-stop-scores.md | 3KB |
| 2.5 | 2.5.2-curiosity-gap-scores | layer-2.5-outputs/2.5.2-curiosity-gap-scores.md | 3KB |
| 2.5 | 2.5.3-big-idea-alignment-scores | layer-2.5-outputs/2.5.3-big-idea-alignment-scores.md | 3KB |
| 2.5 | 2.5.4-platform-nativeness-scores | layer-2.5-outputs/2.5.4-platform-nativeness-scores.md | 3KB |
| 2.5 | 2.5.5-compliance-safety-scores | layer-2.5-outputs/2.5.5-compliance-safety-scores.md | 3KB |
| 2.5 | 2.5.6-specificity-scores | layer-2.5-outputs/2.5.6-specificity-scores.md | 3KB |
| 2.5 | 2.5.7-composite-ranking | layer-2.5-outputs/2.5.7-composite-ranking.md | 5KB |
| 3 | 3.1-presentation | layer-3-outputs/3.1-presentation.md | 5KB |
| 3 | 3.2-human-selection | layer-3-outputs/3.2-human-selection.md | 2KB |
| 4 | 4.1-hook-angle-matrix | HOOK-ANGLE-MATRIX.md | 30KB |
| 4 | 4.2-execution-log | execution-log.md | 3KB |

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

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 5, 8):
[ ] A02-HOOK-ANGLE-DISCOVERY-ANTI-DEGRADATION.md read (THIS FILE)
[ ] A02-HOOK-ANGLE-DISCOVERY-AGENT.md read
[ ] AD-ENGINE-CLAUDE.md read (The 5 Laws, Hook vs Big Idea)
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 7)
[ ] Input files validated (campaign brief, research, strategic outputs, A01)

LAYER 0 (FOUNDATION):
[ ] Vertical profile loaded (if applicable)
[ ] All upstream packages loaded (Campaign Brief, Research, Root Cause, Mechanism, Promise, Big Idea, Offer, Proof)
[ ] Ad Intelligence Handoff loaded
[ ] AD-HOOK-TAXONOMY.md loaded VERBATIM in active context
[ ] Soul.md loaded (if exists)
[ ] All inputs validated
[ ] GATE_0_COMPLETE.yaml created

LAYER 1 (ANGLE DISCOVERY):
[ ] Pain-based angles mined with source quotes
[ ] Mechanism-based angles mined with source quotes
[ ] Identity-based angles mined with source quotes
[ ] Proof-based angles mined with source quotes
[ ] Competitive gap angles mined with A01 reference
[ ] All angles deduplicated and ranked
[ ] Minimum 10 angles generated
[ ] Minimum 3 angle categories represented
[ ] All angles have source attribution
[ ] No angle IS the big idea (all are entry points)
[ ] GATE_1_COMPLETE.yaml created

LAYER 2 (HOOK GENERATION):
[ ] Hook type selection matrix created for all angles
[ ] AD-HOOK-TAXONOMY.md in active context during generation
[ ] Hooks generated across Categories A-J
[ ] Minimum 50 unique hooks generated
[ ] Minimum 8 hook types represented
[ ] Each hook classified by type (A1-J3 codes)
[ ] Each hook attributed to source angle
[ ] Each hook tagged with platform recommendation
[ ] All hooks are 5-15 words (text hooks)
[ ] Hooks deduplicated
[ ] GATE_2_COMPLETE.yaml created

LAYER 2.5 (AUTOMATED SCORING):
[ ] All hooks scored on Scroll-Stop Power (1-10)
[ ] All hooks scored on Curiosity Gap (1-10)
[ ] All hooks scored on Big Idea Alignment (1-10)
[ ] All hooks scored on Platform Nativeness (1-10)
[ ] All hooks scored on Compliance Safety (1-10)
[ ] All hooks scored on Specificity (1-10)
[ ] Composite scores calculated (average of 6)
[ ] Hooks ranked by composite score
[ ] Bottom hooks cut (below 7.0 or 6.5 threshold)
[ ] Top 15-20 hooks advancing to human curation
[ ] GATE_2.5_COMPLETE.yaml created

LAYER 3 (HUMAN CURATION -- BLOCKING):
[ ] Top 15-20 hooks organized by angle group
[ ] Presentation document created with all scores
[ ] Human selection received (BLOCKING)
[ ] Minimum 8 hooks selected
[ ] Any modifications captured
[ ] Any new hooks added
[ ] Human notes captured
[ ] HUMAN_SELECTION.yaml created
[ ] GATE_3_COMPLETE.yaml created

LAYER 4 (OUTPUT PACKAGING):
[ ] HOOK-ANGLE-MATRIX.md assembled with all 7 sections
[ ] Section 1: Strategic Angles (10-15 with source attribution)
[ ] Section 2: Full Hook Bank (50-100+ with all data)
[ ] Section 3: Top 15-20 Presentation
[ ] Section 4: Human Selections (8-10 hooks)
[ ] Section 5: Hook-Angle Cross-Reference
[ ] Section 6: Platform Recommendations
[ ] Section 7: Variant Potential
[ ] HOOK-ANGLE-MATRIX.md >= 30KB
[ ] execution-log.md created with all microskills
[ ] GATE_4_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated with completion
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY taxonomy was loaded (check execution log)
[ ] VERIFY angles were derived from research (not invented)
[ ] VERIFY hook count meets minimum (50+)
[ ] VERIFY human selection exists (HUMAN_SELECTION.yaml)
[ ] If taxonomy skipped, RETURN to Layer 0
```

---

## KEY INSIGHT

> **"Hooks without strategic angles are random attention-grabbers. Angles without research grounding are invented narratives. Generic hooks default to copywriting cliches. Volume before curation. The big idea is the destination; hooks are entry points. The algorithm needs variant volume. Human curation is non-negotiable."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation with 8 structural fixes, per-microskill output table (32 microskills across Layers 0-4), implementation checklist. Full A02 anti-degradation architecture following EMAIL-WRITER template pattern. Includes: mandatory checkpoint files (6 gates), minimum thresholds (10 angles, 50 hooks, 8 types, 15 top hooks, 8 selected), forbidden rationalizations (12 items), A02-specific MC-CHECK, mandatory project infrastructure, binary gate enforcement, stale artifact cleanup, anti-degradation mandatory read. Addresses core failure patterns: generic hooks, hook-as-big-idea conflation, type monoculture, missing angle attribution, premature curation, skipping human selection. |
