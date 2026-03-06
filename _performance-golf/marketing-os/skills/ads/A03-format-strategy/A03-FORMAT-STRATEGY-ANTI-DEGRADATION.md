# A03-FORMAT-STRATEGY-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-22
**Purpose:** STRUCTURAL enforcement to prevent format strategy skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI assigns every hook to the same format (all video, all 30s, all 9:16) without per-hook analysis
- AI generates format plans that are platform-blind (ignores Meta vs. TikTok vs. YouTube differences)
- AI assigns format without creative treatment (outputs "video" without specifying UGC vs. polished vs. demo)
- AI ignores A01 intelligence data when making format decisions
- AI fails to cascade word count constraints to A04 (scripts arrive overwritten)
- AI produces budget-blind plans (calls for 40 video productions on $5K budget)
- AI skips variant matrix calculation (downstream has no testing plan)
- AI assigns audio-dependent hooks to sound-off platforms (Meta feed)
- AI outputs FORMAT-STRATEGY.md under 30KB minimum

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/A03-format-strategy/checkpoints/GATE_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/A03-format-strategy/checkpoints/GATE_1_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/A03-format-strategy/checkpoints/GATE_2_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/A03-format-strategy/checkpoints/GATE_3_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# GATE_[N]_COMPLETE.yaml
gate: [N]
skill: "A03-format-strategy"
timestamp: "[ISO 8601]"
result: PASS  # PASS or FAIL only. No other values permitted.

verification:
  all_inputs_loaded: true
  all_hooks_assessed: true
  all_assignments_data_grounded: true
  word_counts_cascaded: true
  variant_matrix_calculated: true
  format_strategy_md_exists: true

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
| **Selected hooks processed** | 8-10 (all from A02) | HALT -- Must map every selected hook |
| **Hook-platform compatibility cells** | Every hook × every platform assessed | HALT -- No blank cells permitted |
| **Format assignments** | Every OPTIMAL/VIABLE hook-platform pair | HALT -- Cannot skip format decisions |
| **Word count constraints** | Cascaded for EVERY video assignment | HALT -- A04 needs these constraints |
| **Creative treatment assigned** | For EVERY video assignment | HALT -- Cannot output "video" without treatment type |
| **Aspect ratio specified** | For EVERY visual assignment | HALT -- A05 needs these constraints |
| **Variant matrix total** | >= 30 variants | HALT -- Insufficient testing volume |
| **Platform-specific constraints** | Every assignment has platform specs | HALT -- No platform-blind entries |
| **A01 intelligence citations** | Every format decision cites A01 data | HALT -- Decisions must be data-grounded |
| **FORMAT-STRATEGY.md size** | >= 30KB | HALT -- Output is incomplete |
| **Required sections populated** | All 12 sections | HALT -- No empty/placeholder sections |

### Data Grounding Protocol

**BEFORE ANY FORMAT DECISION:**

```yaml
data_grounding_protocol:
  step_1: "READ A01 intelligence handoff"
  step_2: "EXTRACT format distribution data (video %, static %, carousel %)"
  step_3: "EXTRACT winning format patterns (what formats are in top 20 winning ads?)"
  step_4: "EXTRACT creative treatment distribution (UGC %, polished %, demo %)"
  step_5: "EXTRACT length distribution (which ad lengths are most common/winning?)"
  step_6: "FOR EACH format decision, CITE specific A01 data point"

  IF a01_data_not_loaded:
    HALT -- "Cannot make format decisions without A01 intelligence data"

  IF format_decision_without_citation:
    HALT -- "Every format decision must reference A01 data"
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "All hooks should be video" | Format decision is per-hook, per-platform, data-grounded. Not blanket. | HALT -- Assess each hook individually |
| "30 seconds works for everything" | Length determined by hook type, framework, platform sweet spot, A01 data | HALT -- Calculate optimal length per assignment |
| "Platform specs don't matter yet" | Platform specs are BINDING for A04/A05. Deferring produces platform-blind output | HALT -- Document specs NOW |
| "We'll figure out word count later" | Word count must cascade NOW. A04 cannot enforce limits it doesn't receive | HALT -- Cascade word counts |
| "UGC for everything because it performs best" | UGC outperforms on average. Authority hooks need authority treatment | HALT -- Match treatment to hook type |
| "Budget can wait until production" | Budget-blind plans are unexecutable. Even rough allocation required | HALT -- Define budget scenarios |
| "Variant math is straightforward" | Variant count drives testing, budget, timeline. Must be explicit | HALT -- Calculate variant matrix |
| "Same creative for TikTok and Meta" | Platform-native or die (Law 1). Same creative = protocol violation | HALT -- Platform-specific assignments |
| "Compliance checking is for later" | Compliance pre-check prevents A04 from writing non-compliant scripts | HALT -- Flag compliance risks NOW |
| "I know frameworks without the matrix" | Framework Selection Matrix exists for cross-referencing. Don't assume | HALT -- Consult matrix |

---

## STRUCTURAL FIX 4: A03-SPECIFIC MC-CHECK

```yaml
A03-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [0 | 1 | 2 | 3 | 4]
    previous_gate_checkpoint_exists: [Y/N]
    if_no: "STOP -- Cannot proceed without checkpoint file"

  platform_awareness:
    am_i_assigning_same_format_to_every_hook: [Y/N]
    am_i_ignoring_platform_differences: [Y/N]
    am_i_skipping_sound_behavior_analysis: [Y/N]
    have_i_checked_platform_specs_for_every_assignment: [Y/N]
    if_any_yes_except_specs: "STOP -- Platform-blind assignment detected"

  data_grounding:
    am_i_referencing_A01_intelligence_data: [Y/N]
    am_i_using_the_framework_selection_matrix: [Y/N]
    are_my_format_decisions_backed_by_data: [Y/N]
    am_i_inventing_format_decisions: [Y/N]
    if_any_concerning: "STOP -- Re-read A01 intelligence"

  constraint_cascading:
    have_i_cascaded_word_counts: [Y/N]
    have_i_specified_aspect_ratios: [Y/N]
    have_i_documented_compliance_flags: [Y/N]
    have_i_assigned_creative_treatment: [Y/N]
    if_any_no: "STOP -- Cascade constraints before proceeding"

  completeness:
    do_all_hooks_have_assignments: [Y/N]
    is_variant_matrix_calculated: [Y/N]
    are_downstream_handoffs_built: [Y/N]
    is_format_strategy_md_30kb_plus: [Y/N]
    if_any_no: "STOP -- Complete required outputs"

  rationalization_check:
    am_i_thinking_all_video: [Y/N]
    am_i_thinking_same_across_platforms: [Y/N]
    am_i_thinking_word_count_later: [Y/N]
    am_i_thinking_compliance_later: [Y/N]
    if_any_yes: "HALT -- Rationalization detected"

  result: [CONTINUE | HALT_PLATFORM | HALT_DATA | HALT_CONSTRAINTS | HALT_COMPLETION]
```

---

## STRUCTURAL FIX 5: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which hooks were assessed and which platforms were prioritized is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/A03-format-strategy/
  PROJECT-STATE.md          # Living document -- updated after every layer
  PROGRESS-LOG.md           # Append-only timeline of all actions
  checkpoints/              # Gate checkpoint files
  execution-log.md          # Detailed execution record
  layer-0-outputs/          # Per-microskill output files
  layer-1-outputs/
  layer-2-outputs/
  layer-3-outputs/
  layer-4-outputs/
  FORMAT-STRATEGY.md        # Primary output (30KB+)
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "A03-format-strategy"
created: "[date]"
last_updated: "[date]"
current_layer: "[0 | 1 | 2 | 3 | 4]"
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"

inputs_validated:
  campaign_brief: [Y/N]
  ad_intelligence_handoff: [Y/N]
  hook_angle_matrix: [Y/N]
  ad_script_structures: [Y/N]
  ad_hook_taxonomy: [Y/N]
  vertical_profile: [Y/N]

processing_status:
  hooks_assessed: "[count] / [total]"
  platforms_analyzed: "[count] / [total]"
  format_assignments_complete: "[count] / [target]"
  variant_matrix_calculated: [Y/N]
  budget_allocated: [Y/N]
  format_strategy_md_assembled: [Y/N]
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
  PASS (gate evaluation)
  COMPLETE (layer checkpoint -- same as PASS for A03 gates)

VALID WORKFLOW STATUSES (in PROJECT-STATE.md):
  INITIALIZING
  IN_PROGRESS
  COMPLETE

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  approved_with_concerns / conditional_approval
  PROCEED_WITH_CONCERNS / WARNING
  "good enough" / "acceptable for now"
  "most hooks assigned" / "variant count is approximately right"

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

BEFORE writing FORMAT-STRATEGY.md or checkpoint files:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/format-strategy.md (root -- from failed attempts)
     - [project]/A03-format-strategy/FORMAT-STRATEGY.md (correct location)
     - [project]/outputs/format-strategy.md (wrong path)
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

**Session startup protocol -- BEFORE any A03 execution:**

```
SESSION STARTUP:
  1. READ this file (A03-FORMAT-STRATEGY-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ A03-FORMAT-STRATEGY-AGENT.md -- agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin format strategy analysis without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Reference:** ./CLAUDE.md MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.0.1-vertical-profile-loader | layer-0-outputs/0.0.1-vertical-profile.md | 1KB |
| 0 | 0.1-campaign-brief-loader | layer-0-outputs/0.1-campaign-brief.md | 1KB |
| 0 | 0.2-ad-intelligence-loader | layer-0-outputs/0.2-ad-intelligence.md | 2KB |
| 0 | 0.3-hook-angle-matrix-loader | layer-0-outputs/0.3-hook-angle-matrix.md | 2KB |
| 0 | 0.4-reference-loader | layer-0-outputs/0.4-reference-loader.md | 2KB |
| 0 | 0.5-soul-md-loader | layer-0-outputs/0.5-soul-md.md | 1KB |
| 0 | 0.6-input-validation | layer-0-outputs/0.6-input-validation.md | 1KB |
| 1 | 1.1-platform-priority | layer-1-outputs/1.1-platform-priority.md | 3KB |
| 1 | 1.2-hook-platform-compatibility | layer-1-outputs/1.2-hook-platform-compatibility.md | 5KB |
| 1 | 1.3-sound-behavior-analysis | layer-1-outputs/1.3-sound-behavior-analysis.md | 3KB |
| 1 | 1.4-compliance-precheck | layer-1-outputs/1.4-compliance-precheck.md | 3KB |
| 1 | 1.5-layer1-validation | layer-1-outputs/1.5-layer1-validation.md | 2KB |
| 2 | 2.1-format-assignment | layer-2-outputs/2.1-format-assignment.md | 5KB |
| 2 | 2.2-length-wordcount | layer-2-outputs/2.2-length-wordcount.md | 5KB |
| 2 | 2.3-creative-treatment | layer-2-outputs/2.3-creative-treatment.md | 5KB |
| 2 | 2.4-framework-recommendation | layer-2-outputs/2.4-framework-recommendation.md | 5KB |
| 2 | 2.5-platform-specs-cascade | layer-2-outputs/2.5-platform-specs-cascade.md | 5KB |
| 2 | 2.6-layer2-validation | layer-2-outputs/2.6-layer2-validation.md | 2KB |
| 3 | 3.1-variant-matrix | layer-3-outputs/3.1-variant-matrix.md | 5KB |
| 3 | 3.2-creative-volume-plan | layer-3-outputs/3.2-creative-volume-plan.md | 5KB |
| 3 | 3.3-budget-allocation | layer-3-outputs/3.3-budget-allocation.md | 5KB |
| 3 | 3.4-testing-sequence | layer-3-outputs/3.4-testing-sequence.md | 5KB |
| 3 | 3.5-downstream-handoffs | layer-3-outputs/3.5-downstream-handoffs.md | 5KB |
| 4 | 4.1-format-strategy-assembly | layer-4-outputs/4.1-format-strategy-assembly.md | 3KB |
| 4 | 4.2-final-validation | layer-4-outputs/4.2-final-validation.md | 2KB |

### Layer Gate Enhancement

Each GATE_N_COMPLETE.yaml checkpoint MUST list all microskill output files with sizes. If ANY output file is missing, the checkpoint CANNOT be created.

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
[ ] A03-FORMAT-STRATEGY-ANTI-DEGRADATION.md read (THIS FILE)
[ ] A03-FORMAT-STRATEGY-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 7)
[ ] Input files validated (Campaign Brief, A01, A02, references exist)

LAYER 0 (FOUNDATION & LOADING):
[ ] Vertical profile loaded
[ ] Campaign brief loaded (budget, timeline, target platforms)
[ ] Ad intelligence loaded from A01 (format distribution, winning patterns)
[ ] Hook-angle matrix loaded from A02 (8-10 selected hooks)
[ ] AD-SCRIPT-STRUCTURES.md loaded (Framework Selection Matrix)
[ ] AD-HOOK-TAXONOMY.md loaded (platform considerations)
[ ] Soul.md loaded if exists (or warned if missing)
[ ] All inputs validated
[ ] GATE_0_COMPLETE.yaml created

LAYER 1 (PLATFORM ANALYSIS):
[ ] Platform priority order established with A01 data rationale
[ ] Hook-platform compatibility matrix completed (every hook × every platform)
[ ] Sound behavior classified for every hook (AUDIO_DEPENDENT / VISUAL_FIRST / DUAL_MODE)
[ ] Compliance pre-check completed for all hooks on all platforms
[ ] All hooks have at least one OPTIMAL or VIABLE platform
[ ] GATE_1_COMPLETE.yaml created

LAYER 2 (FORMAT MAPPING):
[ ] Format type assigned to every OPTIMAL/VIABLE hook-platform pair
[ ] Length and word count constraints cascaded for every assignment
[ ] Creative treatment assigned for every video assignment (UGC/polished/demo/etc.)
[ ] Script framework recommended for every assignment (using Framework Selection Matrix)
[ ] Platform specs documented (aspect ratio, resolution, sound, CTA)
[ ] All assignments cite A01 intelligence data
[ ] Zero platform-blind assignments
[ ] GATE_2_COMPLETE.yaml created

LAYER 3 (CREATIVE VOLUME PLANNING):
[ ] Full variant matrix calculated (hooks × formats × visuals × CTAs)
[ ] Variant count meets minimum (30) or is flagged
[ ] Creative volume plan built (production requirements by type)
[ ] Budget allocation defined (by platform, format, production method)
[ ] Testing sequence defined (Phase 1-3 with kill/scale criteria)
[ ] Downstream handoff packages built for A04, A05, A07, A09, A10, A11
[ ] GATE_3_COMPLETE.yaml created

LAYER 4 (OUTPUT PACKAGING):
[ ] FORMAT-STRATEGY.md assembled with all 12 required sections
[ ] FORMAT-STRATEGY.md is 30KB+ (verified)
[ ] All sections populated (no empty/placeholder sections)
[ ] Master Format Assignment Table complete (every row has all columns)
[ ] Executive Summary quantifies total variants, platforms, formats
[ ] Execution log written confirming all microskills executed
[ ] GATE_4_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated with skill completion
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified (existence, size, completeness)
[ ] All downstream handoffs populated and structured
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY A01 intelligence data was loaded and cited
[ ] VERIFY every hook has format assignments
[ ] VERIFY word count constraints are cascaded
[ ] VERIFY variant matrix is calculated with total
[ ] VERIFY FORMAT-STRATEGY.md exists and is 30KB+
[ ] If any verification fails, RETURN to appropriate layer
```

---

## PLATFORM-SPECIFIC ENFORCEMENT

### Sound Behavior Violations (IMMEDIATE HALT)

| Violation | Detection | Required Action |
|-----------|----------|----------------|
| Audio-dependent hook assigned to Meta feed | Hook classification = AUDIO_DEPENDENT + Platform = Meta Feed + No text overlay plan | HALT -- Provide text overlay adaptation OR reassign platform |
| Visual-first hook assigned sound-ON expectation | Hook classification = VISUAL_FIRST + Script framework assumes audio narration | HALT -- Align script approach with hook classification |
| Sound classification missing | Any hook without AUDIO_DEPENDENT / VISUAL_FIRST / DUAL_MODE classification | HALT -- Complete 1.3-sound-behavior-analysis |

### Platform Specification Violations

| Violation | Detection | Required Action |
|-----------|----------|----------------|
| Horizontal video assigned to TikTok | Aspect ratio = 16:9 + Platform = TikTok | HALT -- TikTok is 9:16 ONLY |
| Missing aspect ratio | Format = video or static + Aspect ratio field = empty | HALT -- Specify aspect ratio for every visual |
| Missing word count constraint | Format = video + Word count max = empty | HALT -- Cascade word count from enforcement table |
| Creative treatment unspecified | Format = video + Treatment = "video" (no type) | HALT -- Assign treatment (UGC/polished/demo/etc.) |

### Variant Matrix Violations

| Violation | Detection | Required Action |
|-----------|----------|----------------|
| Variant count under 30 | Total variants calculated < 30 | HALT -- Flag insufficient volume OR expand hook/format coverage |
| Variant count uncalculated | 3.1-variant-matrix.md missing or empty | HALT -- Cannot proceed to Layer 4 without variant math |
| Missing variant dimensions | Variant calculation missing hooks OR formats OR visuals OR CTAs | HALT -- Complete all four variant dimensions |

---

## A03-SPECIFIC DEGRADATION PATTERNS

### Pattern 1: One-Size-Fits-All Formatting

**Symptom:** All 8-10 hooks assigned to identical format (all 30s UGC video, all 9:16).

**Detection:**
```yaml
degradation_check:
  unique_formats_assigned: [count]
  unique_lengths_assigned: [count]
  if_unique_formats_less_than_3: "DEGRADATION DETECTED -- Blanket assignment pattern"
  if_all_hooks_same_length: "DEGRADATION DETECTED -- No per-hook length analysis"
```

**Fix:** HALT. Return to Layer 2. For EACH hook:
1. Analyze hook type's natural duration requirement
2. Cross-reference with platform sweet spot
3. Cite A01 data for length distribution
4. Assign optimal length PER HOOK, not blanket

### Pattern 2: Platform Blindness

**Symptom:** Format decisions that ignore platform-specific characteristics.

**Detection:**
```yaml
platform_blindness_check:
  assignments_with_aspect_ratio: [count]
  assignments_with_sound_classification: [count]
  assignments_with_platform_aesthetic_notes: [count]
  if_any_count_less_than_total_assignments: "PLATFORM BLINDNESS DETECTED"
```

**Fix:** HALT. Return to Layer 1 or 2. For EACH assignment:
1. Document platform-specific aspect ratio
2. Classify sound behavior for platform
3. Note platform aesthetic requirements (TikTok-native, Meta-optimized, YouTube-formatted)
4. Cross-reference with platform specifications in AGENT.md

### Pattern 3: Missing Creative Treatment

**Symptom:** Format assigned as "video" without specifying UGC vs. polished vs. demo vs. talking head.

**Detection:**
```yaml
treatment_check:
  video_assignments: [count]
  video_with_treatment_specified: [count]
  if_mismatch: "MISSING CREATIVE TREATMENT -- Cannot send to A05 without treatment type"
```

**Fix:** HALT. Return to Layer 2 microskill 2.3. For EACH video assignment:
1. Determine creative treatment type (UGC / polished / demo / talking head / mixed / etc.)
2. Cite A01 treatment distribution data
3. Match treatment to hook type (Authority = expert presentation, Testimonial = UGC, Demo = product demonstration)

### Pattern 4: A01 Intelligence Ignored

**Symptom:** Format decisions that cite zero A01 data points.

**Detection:**
```yaml
data_grounding_check:
  total_format_decisions: [count]
  decisions_with_a01_citation: [count]
  if_citation_rate_under_80_percent: "DATA GROUNDING FAILURE"
```

**Fix:** HALT. Return to Layer 0 microskill 0.2. Re-read A01 intelligence handoff. For EACH format decision in Layer 2:
1. CITE specific A01 data point (format distribution, winning pattern, treatment performance)
2. Ground decision in vertical-specific intelligence
3. Acknowledge when format deviates from A01 patterns (with rationale)

### Pattern 5: Word Count Cascade Failure

**Symptom:** Format assignments missing word count constraints.

**Detection:**
```yaml
word_count_check:
  video_assignments: [count]
  video_with_word_count_max: [count]
  if_mismatch: "WORD COUNT CASCADE FAILURE -- A04 needs these constraints"
```

**Fix:** HALT. Return to Layer 2 microskill 2.2. For EACH video assignment:
1. Consult AD-ENGINE-CLAUDE.md word count enforcement table
2. Match assigned length to word count max (6s=15, 15s=40, 30s=75, 60s=160, 2-3min=450)
3. Cascade constraint to Master Format Assignment Table
4. Document as BINDING (not suggested)

### Pattern 6: Budget-Blind Planning

**Symptom:** Creative volume plan calls for production that exceeds budget by 3x+.

**Detection:**
```yaml
budget_check:
  budget_specified: [Y/N]
  total_production_cost_estimate: [amount]
  budget_exceeded: [Y/N]
  if_exceeded: "BUDGET-BLIND PLAN -- Unusable"
```

**Fix:** HALT. Return to Layer 3 microskill 3.3. Options:
1. If budget not specified: Produce THREE scenarios (conservative, moderate, aggressive)
2. If budget specified: Allocate realistically across platforms/formats
3. If plan exceeds budget: Reduce variant count OR recommend budget increase with justification

### Pattern 7: Missing Variant Math

**Symptom:** No variant matrix calculation in Layer 3.

**Detection:**
```yaml
variant_check:
  variant_matrix_file_exists: [Y/N]
  total_variants_calculated: [Y/N]
  variant_dimensions_complete: [Y/N -- hooks × formats × visuals × CTAs]
  if_any_no: "VARIANT MATRIX MISSING"
```

**Fix:** HALT. Return to Layer 3 microskill 3.1. Execute:
1. Calculate hooks (count from A02)
2. Calculate formats per hook (from Layer 2 assignments)
3. Calculate visual treatment variants per hook (typically 2-3)
4. Calculate CTA variants (typically 2-3)
5. Multiply: total variants = hooks × formats × visuals × CTAs
6. Verify meets minimum (30)

---

## KEY INSIGHT

> **"Format strategy without platform awareness is a guess. Format strategy without A01 intelligence is arbitrary. Format strategy without variant math is incomplete. Every format decision must be per-hook, per-platform, data-grounded, and cascaded with binding constraints."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation with 8 structural fixes, per-microskill output table (23 microskills), implementation checklist, 7 A03-specific degradation patterns (one-size-fits-all, platform blindness, missing treatment, A01 ignored, word count cascade failure, budget-blind planning, missing variant math), platform-specific enforcement tables, sound behavior violations, variant matrix violations. Full A03 anti-degradation architecture. |
