# A04-SCRIPT-ARCHITECTURE-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-22
**Purpose:** STRUCTURAL enforcement to prevent script architecture skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: A04-SCRIPT-ARCHITECTURE-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Accept word counts as "close enough" (word count is physics, not a guideline), generate monolithic scripts instead of modular [HOOK]+[SETUP]+[MECHANISM]+[PROOF]+[CTA] structures, or omit mechanism integration from 60+ second scripts.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI selects frameworks randomly or defaults to PAS for everything without analyzing the 5 selection variables
- AI violates word count physics (6s=15w, 15s=40w, 30s=75w, 60s=160w, 2-3min=450w)
- AI generates non-modular scripts (monolithic blocks instead of swappable [HOOK] + [SETUP] + [MECHANISM] + [PROOF] + [CTA] modules)
- AI creates hook-body disconnect (hook promises "3 foods" but body talks about stress and sleep)
- AI omits mechanism integration from 60+ second scripts
- AI produces vague visual column ("Show product") instead of detailed visual intent per module
- AI skips AV format (audio-visual two-column structure)
- AI assigns length-incompatible frameworks (Edutainment for 15s, Story Narrative for 6s bumper)
- AI assigns platform-incompatible frameworks (Story Narrative for TikTok 15s)
- AI generates content briefs that are actually full copy instead of WHAT to write instructions for A07

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/A04-script-architecture/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/A04-script-architecture/checkpoints/LAYER_1_COMPLETE.yaml
```

**Layer 2.5 (Arena, if triggered) CANNOT execute unless this file exists:**
```
[project]/A04-script-architecture/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/A04-script-architecture/checkpoints/LAYER_2_COMPLETE.yaml
(AND GATE_2.5_COMPLETE.yaml if Arena was triggered)
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/A04-script-architecture/checkpoints/LAYER_3_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "A04-script-architecture"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  frameworks_assigned: [integer]
  module_blueprints_complete: [integer]
  word_count_verifications_pass: true
  hook_body_coherence_checks_pass: true
  av_blueprints_complete: true
  variant_swap_plans_complete: true

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
| **Word count accuracy** | Total within +/- 5%, modules within +/- 20% | HALT -- Rebalance word budgets |
| **Framework assignments** | 100% of ad concepts | HALT -- Assign framework to all concepts |
| **Framework selection rationale** | All 5 variables cited per assignment | HALT -- Document rationale |
| **Hook-body coherence** | All 5 questions pass per concept | HALT -- Redesign failing modules |
| **Mechanism integration** | 100% of 60+ second scripts | HALT -- Integrate mechanism |
| **CTA variants** | 3 per ad concept | HALT -- Design additional CTAs |
| **Module structure** | All scripts use [HOOK] + [SETUP] + [MECHANISM] + [PROOF] + [CTA] | HALT -- Decompose into modules |
| **AV format** | Two-column audio-visual per blueprint | HALT -- Create AV format |
| **Visual intent detail** | Specific intent per module (not "Show product") | HALT -- Specify visual intent |
| **Variant swap groups** | 3+ hooks, 3+ CTAs, 2+ proof per concept | HALT -- Design swap groups |
| **Clean seams** | Transition design at every module boundary | HALT -- Design seam transitions |

### Word Count Enforcement Table

| Ad Length | Target Words | Tolerance | Physics |
|-----------|-------------|-----------|---------|
| 6 seconds | 15 words | +/- 2 words | 2.5 words/second |
| 15 seconds | 40 words | +/- 4 words | 2.67 words/second |
| 30 seconds | 75 words | +/- 6 words | 2.5 words/second |
| 60 seconds | 160 words | +/- 8 words | 2.67 words/second |
| 2-3 minutes | 450 words | +/- 20 words | 2.5 words/second |

**MANDATORY VERIFICATION:** After every module design, run word count verification. If OVERALL = FAIL, rebalance before proceeding.

### Framework Compatibility Matrix

| Framework | Valid Lengths | Invalid Lengths | Valid Platforms | Invalid Platforms |
|-----------|--------------|----------------|-----------------|-------------------|
| PAS | 15-60s | 6s, 2-3min | Meta, TikTok | (none) |
| AIDA | 30-90s | 6s, 15s | All platforms | (none) |
| BAB | 15-60s | 6s, 2-3min | Meta, TikTok | (none) |
| Hook-Body-CTA | 15-30s | 6s | TikTok, Reels, Shorts, Meta | (none -- universal) |
| Story Narrative | 60-120s | 6s, 15s, 30s | YouTube, Meta long-form | TikTok short, Reels, Shorts |
| Edutainment | 2-5min | 6s, 15s, 30s, 60s | YouTube | TikTok, Reels, Shorts |
| UGC-DR | 15-45s | 6s, 2-3min | TikTok, Meta | (none) |
| Fast-Paced Viral | 6-15s | 30s+, 2-3min | TikTok, Shorts | YouTube pre-roll, Meta |

**IF framework assigned outside valid length/platform:** HALT -- reassign framework.

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "Close enough to the word count" | Word count is physics. 200 words is 80 seconds, not 30 seconds. | HALT -- Compress or expand to target |
| "The framework doesn't matter that much" | Framework selection is the architectural foundation. Random selection causes structural failures. | HALT -- Analyze 5 variables and assign correctly |
| "We'll fix the hook-body coherence in A07" | A07 writes copy from briefs. If the architecture is disconnected, the copy will be disconnected. | HALT -- Redesign modules now |
| "Mechanism can be added later" | 60+ second scripts without mechanism have no persuasive weight. | HALT -- Integrate mechanism |
| "All scripts can use the same framework" | Different hooks, platforms, lengths require different frameworks. One-size-fits-all fails. | HALT -- Assign per concept |
| "The visual column is A05's job" | A04 specifies visual INTENT per module. A05 creates shot-level briefs. | HALT -- Specify visual intent |
| "Content briefs can be generic" | A07 needs specific WHAT to write instructions, not vague guidance. | HALT -- Write detailed content briefs |
| "Hook swap groups are optional" | Variant testing requires swappable modules. Without swap groups, testing is impossible. | HALT -- Design swap groups |
| "Script doesn't need to be modular" | Monolithic scripts cannot be tested as variants. Modularity is mandatory. | HALT -- Decompose into [HOOK] + [SETUP] + [MECHANISM] + [PROOF] + [CTA] |
| "Bumper ads can use a framework" | 6-second bumpers are too short for frameworks. They need single-idea design. | HALT -- Use bumper structure, not framework |

---

## STRUCTURAL FIX 4: A04-SPECIFIC MC-CHECK

```yaml
SCRIPT-ARCHITECTURE-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [0 | 1 | 2 | 2.5 | 3 | 4]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP -- Cannot proceed without checkpoint file"

  framework_selection_compliance:
    all_concepts_have_framework: [Y/N]
    all_assignments_cite_5_variables: [Y/N]
    no_length_incompatible: [Y/N]
    no_platform_incompatible: [Y/N]
    if_any_no: "STOP -- Fix framework assignments"

  word_count_compliance:
    all_scripts_within_tolerance: [Y/N]
    any_over_length: [list or 'none']
    if_any_over_length: "STOP -- Rebalance word budgets"

  hook_body_coherence:
    all_5_questions_pass: [Y/N]
    any_disconnect: [list or 'none']
    if_any_disconnect: "STOP -- Redesign failing modules"

  module_structure_check:
    all_scripts_use_5_modules: [Y/N]
    clean_seams_defined: [Y/N]
    transitions_specified: [Y/N]
    if_any_no: "STOP -- Decompose into modules with clean seams"

  mechanism_integration:
    60s_plus_scripts_count: [integer]
    mechanism_integrated_count: [integer]
    all_integrated: [Y/N]
    if_no: "STOP -- Integrate mechanism into 60s+ scripts"

  av_format_check:
    all_blueprints_have_av: [Y/N]
    visual_intent_specific: [Y/N]
    audio_intent_specific: [Y/N]
    if_any_no: "STOP -- Create AV format with detailed intent"

  variant_planning_check:
    hook_swap_groups_avg: [float]
    cta_variants_min: [integer]
    proof_variants_min: [integer]
    if_below_thresholds: "STOP -- Design additional swap groups"

  rationalization_check:
    am_i_thinking_close_enough_word_count: [Y/N]
    am_i_thinking_framework_doesnt_matter: [Y/N]
    am_i_thinking_fix_coherence_later: [Y/N]
    am_i_thinking_mechanism_later: [Y/N]
    am_i_thinking_same_framework_all: [Y/N]
    if_any_yes: "HALT -- Rationalization detected"

  result: [CONTINUE | HALT_FRAMEWORK | HALT_WORD_COUNT | HALT_COHERENCE | HALT_MECHANISM | HALT_AV | HALT_VARIANTS]
```

---

## STRUCTURAL FIX 5: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which ad concepts have architectures and which frameworks were assigned is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/A04-script-architecture/
  PROJECT-STATE.md          # Living document -- updated after every layer
  PROGRESS-LOG.md           # Append-only timeline of all actions
  checkpoints/              # Gate checkpoint files
  execution-log.md          # Detailed execution record
  layer-0-outputs/          # Per-microskill output files
  layer-1-outputs/
  layer-2-outputs/
  layer-2.5-outputs/        # Arena outputs if triggered
  layer-3-outputs/
  layer-4-outputs/
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "A04-script-architecture"
created: "[date]"
last_updated: "[date]"
current_layer: "[0 | 1 | 2 | 2.5 | 3 | 4]"
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"

inputs_validated:
  campaign_brief: [Y/N]
  hook_angle_matrix: [Y/N]
  format_strategy: [Y/N]
  mechanism: [Y/N]
  script_structures_loaded: [Y/N]

progress:
  ad_concepts_total: [integer]
  frameworks_assigned: [integer]
  module_blueprints_complete: [integer]
  word_count_verified: [integer]
  coherence_verified: [integer]
  variant_plans_complete: [integer]

gate_status:
  GATE_0: [PASS/PENDING]
  GATE_1: [PASS/FAIL/PENDING]
  GATE_2: [PASS/FAIL/PENDING]
  GATE_2.5: [PASS/FAIL/PENDING/SKIPPED]
  GATE_3: [PASS/FAIL/PENDING]
  GATE_4: [PASS/FAIL/PENDING]
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 6: BINARY GATE ENFORCEMENT (FORBIDDEN STATUSES)

### The Problem
Previous skills had models invent gate statuses like "PARTIAL_PASS" and "CONDITIONAL_PASS" -- statuses that don't exist.

### The Fix

**Gate statuses are BINARY: PASS or FAIL. Decision statuses are explicit.**

```
VALID GATE STATUSES (checkpoint files):
  COMPLETE (layer checkpoint)
  PASS (gate evaluation)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  close_enough_to_word_count / approximately_correct
  framework_doesnt_matter / fix_later
  "word count is close" / "coherence is mostly there"
  "mechanism can be added in A07" / "visual intent is A05's job"

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

BEFORE writing script architecture files:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/script-architecture.md (root -- from failed attempts)
     - [project]/A04-script-architecture/SCRIPT-ARCHITECTURE-PACKAGE.md (correct location)
     - [project]/outputs/script-architecture.md (wrong path)
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

**Session startup protocol -- BEFORE any script architecture execution:**

```
SESSION STARTUP:
  1. READ this file (A04-SCRIPT-ARCHITECTURE-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ A04-SCRIPT-ARCHITECTURE-AGENT.md -- agent architecture and constraints
  3. READ AD-ENGINE.md -- The 5 Laws, word count physics, framework reference
  4. READ AD-SCRIPT-STRUCTURES.md -- HOLD IN ACTIVE CONTEXT during Layer 1
  5. IF resuming: READ PROJECT-STATE.md for current position
  6. IF resuming: READ checkpoint files to verify layer completion
  7. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  8. ONLY THEN begin execution

NEVER begin script architecture without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Reference:** ~system/SYSTEM-CORE.md MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.0.1-vertical-profile-loader | layer-0-outputs/0.0.1-vertical-profile-loader.md | 1KB |
| 0 | 0.1-upstream-strategic-loader | layer-0-outputs/0.1-upstream-strategic-loader.md | 2KB |
| 0 | 0.2-hook-angle-matrix-loader | layer-0-outputs/0.2-hook-angle-matrix-loader.md | 2KB |
| 0 | 0.3-format-strategy-loader | layer-0-outputs/0.3-format-strategy-loader.md | 2KB |
| 0 | 0.4-script-structures-loader | layer-0-outputs/0.4-script-structures-loader.md | 3KB |
| 0 | 0.5-soul-md-loader | layer-0-outputs/0.5-soul-md-loader.md | 1KB |
| 0 | 0.6-input-validator | layer-0-outputs/0.6-input-validator.md | 2KB |
| 1 | 1.1-ad-concept-inventory | layer-1-outputs/1.1-ad-concept-inventory.md | 3KB |
| 1 | 1.2-framework-analysis-matrix | layer-1-outputs/1.2-framework-analysis-matrix.md | 5KB |
| 1 | 1.3-framework-assignments | layer-1-outputs/1.3-framework-assignments.md | 5KB |
| 1 | 1.4-bumper-ad-design | layer-1-outputs/1.4-bumper-ad-design.md | 2KB |
| 1 | 1.5-layer-1-validator | layer-1-outputs/1.5-layer-1-validator.md | 3KB |
| 2 | 2.1-module-sequence-design | layer-2-outputs/2.1-module-sequence-design.md | 5KB |
| 2 | 2.2-hook-module-briefs | layer-2-outputs/2.2-hook-module-briefs.md | 3KB |
| 2 | 2.3-setup-module-briefs | layer-2-outputs/2.3-setup-module-briefs.md | 5KB |
| 2 | 2.4-mechanism-module-briefs | layer-2-outputs/2.4-mechanism-module-briefs.md | 5KB |
| 2 | 2.5-proof-module-briefs | layer-2-outputs/2.5-proof-module-briefs.md | 3KB |
| 2 | 2.6-cta-module-briefs | layer-2-outputs/2.6-cta-module-briefs.md | 3KB |
| 2 | 2.7-av-format-blueprints | layer-2-outputs/2.7-av-format-blueprints.md | 5KB |
| 2.5 | 2.5.1-alternative-architecture-generation | layer-2.5-outputs/2.5.1-alternative-architecture-generation.md | 5KB |
| 2.5 | 2.5.2-architecture-scoring | layer-2.5-outputs/2.5.2-architecture-scoring.md | 3KB |
| 2.5 | 2.5.3-architecture-selection | layer-2.5-outputs/2.5.3-architecture-selection.md | 2KB |
| 2.5 | 2.5.4-arena-validator | layer-2.5-outputs/2.5.4-arena-validator.md | 2KB |
| 3 | 3.1-hook-swap-groups | layer-3-outputs/3.1-hook-swap-groups.md | 5KB |
| 3 | 3.2-cta-swap-groups | layer-3-outputs/3.2-cta-swap-groups.md | 3KB |
| 3 | 3.3-proof-swap-groups | layer-3-outputs/3.3-proof-swap-groups.md | 3KB |
| 3 | 3.4-variant-matrix-calculator | layer-3-outputs/3.4-variant-matrix-calculator.md | 3KB |

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

## A04-SPECIFIC DEGRADATION PATTERNS

### Pattern 1: Random Framework Selection

**Symptom:** Every ad concept assigned PAS or AIDA without analysis.

**Root Cause:** Model defaults to familiar frameworks instead of analyzing the 5 variables.

**Fix:** Layer 1 microskill 1.2 MUST produce scored framework matrix (1-10 per framework per variable). Assignments without scores are INVALID.

### Pattern 2: Word Count Violations

**Symptom:** 30-second script comes back with 200 words (80 seconds spoken).

**Root Cause:** LLMs have no internal sense of time. Word count must be externally enforced.

**Fix:** MANDATORY word count verification after every module design. Formula: `(words / 2.5) = seconds`. If delta > 5%, HALT and rebalance.

### Pattern 3: Hook-Body Disconnect

**Symptom:** Hook promises "3 foods destroying your gut," body talks about stress management.

**Root Cause:** Hooks and bodies designed separately without coherence mapping.

**Fix:** MANDATORY 5-question coherence check after every AV blueprint:
1. Does hook make a promise?
2. Does [SETUP] begin fulfilling within 5 seconds?
3. Does [MECHANISM] match hook's specificity?
4. Does script lead to big idea?
5. Would viewer feel body was for them?

ALL 5 must pass. If ANY fail, redesign modules.

### Pattern 4: Monolithic Scripts

**Symptom:** Complete scripts written as single blocks, not decomposed into swappable modules.

**Root Cause:** Model writes "the script" instead of designing module architecture.

**Fix:** Layer 2.1 MUST produce module sequence with word budgets PER MODULE. Each subsequent microskill designs ONE module type across all concepts. Assembly happens in Layer 2.7, not during module design.

### Pattern 5: Vague Visual Column

**Symptom:** Visual column says "Show product" or "B-roll footage."

**Root Cause:** Model treats visual as afterthought instead of co-equal design element.

**Fix:** Layer 2.7 AV blueprints MUST specify visual INTENT per module:
- What viewer SEES
- Shot type direction (CU/MS/WS)
- Text overlay content
- Visual surprise moments
- Product/ingredient callouts

Generic descriptions = FAIL.

### Pattern 6: Mechanism Missing from 60s+ Scripts

**Symptom:** 60-second script omits mechanism or mentions it in 5 words.

**Root Cause:** Model compresses mechanism to fit word budget instead of making it structural priority.

**Fix:** Layer 2.4 mechanism module briefs MUST allocate 40-50 words for 60s scripts. Mechanism is NOT optional for this length. Gate 2 blocks if mechanism missing.

### Pattern 7: Content Briefs Are Copy

**Symptom:** Content briefs contain full sentences of finished copy instead of WHAT to write instructions.

**Root Cause:** Confusion about A04 (architecture) vs. A07 (copy production) roles.

**Fix:** Content briefs use this format:
- "Establish problem: [specific pain from research]"
- "Explain mechanism: [unique explanation adapted from Skill 04]"
- "Present proof: [specific testimonial or data from Skill 02]"

NOT: "Imagine struggling with bloating every day. You've tried everything..."

### Pattern 8: Platform-Incompatible Frameworks

**Symptom:** Story Narrative assigned to TikTok 15s ad, or Edutainment assigned to 30s Meta ad.

**Root Cause:** Framework selected without checking platform compatibility matrix.

**Fix:** Layer 1 microskill 1.5 validator MUST check every assignment against compatibility matrix. Length-incompatible OR platform-incompatible = GATE_1 FAIL.

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 5, 8):
[ ] A04-SCRIPT-ARCHITECTURE-ANTI-DEGRADATION.md read (THIS FILE)
[ ] A04-SCRIPT-ARCHITECTURE-AGENT.md read
[ ] AD-ENGINE.md read (The 5 Laws, word count enforcement)
[ ] AD-SCRIPT-STRUCTURES.md loaded (8 frameworks in active context)
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 7)
[ ] Input files validated (campaign brief, A02 output, A03 output, Skill 04 mechanism)

LAYER 0 (LOADING):
[ ] Vertical profile loaded
[ ] Campaign brief loaded with big idea, mechanism, root cause, promise, offer
[ ] Hook-Angle Matrix loaded with 8+ selected hooks
[ ] Format Strategy loaded with platform/length assignments
[ ] AD-SCRIPT-STRUCTURES.md loaded and held in active context
[ ] Soul.md loaded if exists
[ ] All inputs validated
[ ] LAYER_0_COMPLETE.yaml created

LAYER 1 (FRAMEWORK SELECTION):
[ ] Ad concept inventory built (hooks x formats x platforms x lengths)
[ ] Framework analysis matrix produced (5 variables x 8 frameworks per concept)
[ ] Framework assignments documented with rationale citing all 5 variables
[ ] Bumper ad designs created if any 6s ads exist
[ ] Validator confirms: no length-incompatible, no platform-incompatible, all rationales present
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (MODULE DESIGN):
[ ] Module sequences designed with word count budgets per module (totals = target length)
[ ] [HOOK] module briefs specify selected hook text and transition to [SETUP]
[ ] [SETUP] module briefs specify problem/context and verify hook promise fulfillment
[ ] [MECHANISM] module briefs integrate mechanism for 60s+ scripts (40-50 words)
[ ] [PROOF] module briefs select specific proof elements from Skill 02
[ ] [CTA] module briefs design 3 variants per concept (urgency, risk reversal, low-friction)
[ ] AV format blueprints assembled (two-column audio-visual with detailed intent per module)
[ ] MANDATORY word count verification run per concept (within +/- 5% total, +/- 20% per module)
[ ] MANDATORY hook-body coherence check run per concept (all 5 questions pass)
[ ] LAYER_2_COMPLETE.yaml created

LAYER 2.5 (ARENA -- OPTIONAL, if triggered):
[ ] Alternative architectures generated (2-3 per concept)
[ ] All alternatives scored on 5 Arena criteria
[ ] Human selections received (BLOCKING)
[ ] Winning architectures validated
[ ] GATE_2.5_COMPLETE.yaml created

LAYER 3 (VARIANT PLANNING):
[ ] Hook swap groups designed (3-5 compatible hooks per body)
[ ] All swap hooks pass coherence check
[ ] CTA swap groups verified (3+ variants per concept)
[ ] Proof swap groups designed (2-3 proof options per concept)
[ ] Variant matrix calculated (hooks x CTAs x proof)
[ ] Total campaign variants >= 30 minimum threshold
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (OUTPUT PACKAGING):
[ ] SCRIPT-ARCHITECTURE-PACKAGE.md assembled
[ ] All framework assignments documented
[ ] All module blueprints included
[ ] All AV format blueprints included
[ ] All variant swap plans included
[ ] Word count verification summary table included
[ ] Hook-body coherence summary table included
[ ] Downstream handoff sections populated (for A05, A06, A07, A09)
[ ] LAYER_4_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated with skill completion
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY frameworks assigned with 5-variable rationale
[ ] VERIFY word counts within tolerance (not "close enough")
[ ] VERIFY hook-body coherence (all 5 questions passed)
[ ] VERIFY mechanism integrated in 60s+ scripts
[ ] VERIFY AV format exists with detailed visual intent
[ ] If any structural element missing, RETURN to appropriate layer
```

---

## KEY INSIGHT

> **"Framework selection is not arbitrary. Word count is not approximate. Hook-body coherence is not optional. Module boundaries are not suggestions. Scripts without architectural discipline produce variants that cannot be tested, copy that cannot be written, and ads that cannot convert."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation with 8 structural fixes, per-microskill output table (27 microskills across Layers 0-3), implementation checklist, 8 A04-specific degradation patterns. Full script architecture anti-degradation enforcement. Mandatory word count verification protocol, hook-body coherence 5-question check, framework compatibility matrix enforcement, modular decomposition requirements, AV format two-column specification, variant swap group planning. |
