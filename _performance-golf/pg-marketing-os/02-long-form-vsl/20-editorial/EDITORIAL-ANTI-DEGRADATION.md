# EDITORIAL-ANTI-DEGRADATION.md

**Version:** 2.0
**Created:** 2026-02-05
**Updated:** 2026-02-14
**Purpose:** STRUCTURAL enforcement to prevent editorial skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: EDITORIAL-ANTI-DEGRADATION.md v2.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Skip any of the 6 expert lenses, introduce slop/poison words during revisions, or make APPROVAL-REQUIRED changes without explicit human approval.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI performs editorial review WITHOUT loading type-matched specimens
- AI skips one or more of the 6 expert lenses (Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga)
- AI fails to score against all 7 criteria
- AI introduces slop/poison words during revisions
- AI makes APPROVAL-REQUIRED changes without explicit human approval
- AI accepts revisions that regress voice preservation or threading
- AI produces editorial without human selection of final version
- AI generates revisions without loaded specimens as statistical attractors

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

```
[project]/20-editorial/checkpoints/LAYER_1_COMPLETE.yaml
[project]/20-editorial/checkpoints/LAYER_2_COMPLETE.yaml
[project]/20-editorial/checkpoints/ARENA_COMPLETE.yaml    # Arena Layer (2.5) — MANDATORY
[project]/20-editorial/checkpoints/LAYER_3_COMPLETE.yaml
[project]/20-editorial/HUMAN_APPROVAL.yaml  # For APPROVAL-REQUIRED changes
[project]/20-editorial/HUMAN_SELECTION.yaml  # BLOCKING for final
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/20-editorial/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/20-editorial/checkpoints/LAYER_2_COMPLETE.yaml
[project]/20-editorial/checkpoints/ARENA_COMPLETE.yaml
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Specimens loaded** | Type-matched verbatim | HALT — Load specimens |
| **Expert lenses** | 6/6 | HALT — All lenses review |
| **Criteria scored** | 7/7 | HALT — Score all criteria |
| **Overall weighted score** | >= 8.5 | HALT — Revise or reject |
| **Voice preservation** | >= 7.0 | HALT — Voice break detected |
| **Threading preservation** | >= 7.0 | HALT — Threading damaged |
| **Issue/goal resolution** | >= 7.0 | HALT — Objective not met |
| **Slop/poison words** | 0 | HALT — Remove all |
| **Human approval** | For APPROVAL-REQUIRED | HALT — Get approval |
| **Human selection** | BLOCKING | HALT — Get selection |

### The 7 Judging Criteria (ALL MUST BE SCORED)

```yaml
criteria_scoring:
  criterion_1_issue_resolution:
    weight: "20%"
    score: [1-10]
    minimum: 7.0
    description: "Does this actually accomplish the objective?"

  criterion_2_voice_preservation:
    weight: "20%"
    score: [1-10]
    minimum: 7.0  # DEAL-BREAKER if below
    description: "Does it maintain established voice/tone?"

  criterion_3_flow_enhancement:
    weight: "15%"
    score: [1-10]
    description: "Does it improve or maintain momentum?"

  criterion_4_clarity_improvement:
    weight: "15%"
    score: [1-10]
    description: "Clearer without oversimplifying?"

  criterion_5_slop_elimination:
    weight: "10%"
    score: [1-10]
    description: "Zero AI telltales, no corporate filler?"

  criterion_6_brevity:
    weight: "10%"
    score: [1-10]
    description: "Same or more impact with fewer words?"

  criterion_7_threading_preservation:
    weight: "10%"
    score: [1-10]
    minimum: 7.0  # Cannot sacrifice threading
    description: "Mechanism name, root cause, framework intact?"

  overall_weighted_score: [calculated]
  minimum_required: 8.5

  IF overall_weighted_score < 8.5:
    HALT — "Overall score below 8.5 threshold"

  IF criterion_2_voice_preservation < 7.0:
    HALT — "🛑 CRITICAL: Voice preservation below 7.0 — voice break detected"

  IF criterion_7_threading_preservation < 7.0:
    HALT — "🛑 CRITICAL: Threading preservation below 7.0 — threading damaged"

  IF criterion_1_issue_resolution < 7.0:
    HALT — "🛑 CRITICAL: Issue resolution below 7.0 — objective not met"
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "specimens are reference only" | Specimens are REQUIRED statistical attractors | HALT — Load verbatim |
| "5 lenses is enough" | ALL 6 expert lenses REQUIRED | HALT — Complete all lenses |
| "voice change is minor" | Voice preservation >= 7.0 is DEAL-BREAKER | HALT — Preserve voice |
| "threading can flex" | Threading preservation >= 7.0 REQUIRED | HALT — Preserve threading |
| "8.0 is close enough" | 8.5 overall minimum is NON-NEGOTIABLE | HALT — Revise or reject |
| "this word isn't really slop" | ZERO poison words allowed | HALT — Remove all |
| "this change is clearly better" | APPROVAL-REQUIRED changes need EXPLICIT approval | HALT — Get approval |
| "I can infer selection" | Human selection is BLOCKING | HALT — Get selection |

---

## STRUCTURAL FIX 4: EXPERT LENS GATE

### The Problem
AI skips expert lenses to save time, losing multi-perspective review value.

### The Fix

**ALL 6 LENSES REQUIRED:**

```yaml
expert_lens_validation:
  makepeace:
    executed: [Y/N]
    focus: "Flow & Architecture"
    question: "Does it pull the reader forward?"
    issues_found: [list]
    revisions_suggested: [list]

  halbert:
    executed: [Y/N]
    focus: "Entertainment & Personality"
    question: "Would they stop scrolling for this?"
    issues_found: [list]
    revisions_suggested: [list]

  schwartz:
    executed: [Y/N]
    focus: "Sophistication Calibration"
    question: "Is this fresh for THIS market?"
    issues_found: [list]
    revisions_suggested: [list]

  ogilvy:
    executed: [Y/N]
    focus: "Credibility & Clarity"
    question: "Would a skeptic accept this?"
    issues_found: [list]
    revisions_suggested: [list]

  clemens:
    executed: [Y/N]
    focus: "Scientific Clarity"
    question: "Would a 12-year-old understand this?"
    issues_found: [list]
    revisions_suggested: [list]

  bencivenga:
    executed: [Y/N]
    focus: "Proof-First Authority"
    question: "Can every element be proven?"
    issues_found: [list]
    revisions_suggested: [list]

  all_lenses_executed: [Y/N]

  IF all_lenses_executed == N:
    HALT — "All 6 expert lenses must review before proceeding"
    missing: [list missing lenses]
```

---

## STRUCTURAL FIX 5: SLOP/POISON WORD GATE

### The Problem
AI introduces AI telltales and corporate filler during revisions.

### The Fix

**ZERO POISON WORDS ALLOWED:**

```yaml
slop_validation:
  scan_categories:
    ai_telltales:
      - "revolutionary"
      - "game-changing"
      - "unlock"
      - "harness"
      - "leverage"
      - "dive deep"
      - "journey"
      - "empower"
      - "transform"
      - "breakthrough"

    corporate_filler:
      - "comprehensive"
      - "robust"
      - "innovative"
      - "state-of-the-art"
      - "synergy"
      - "best-in-class"
      - "holistic"
      - "optimize"
      - "streamline"

    hedge_words:
      - "might"
      - "could potentially"
      - "may want to"
      - "perhaps"
      - "arguably"
      - "it seems"
      - "appears to be"

    empty_intensifiers:
      - "literally"
      - "absolutely"
      - "totally"
      - "completely"
      - "incredibly"
      - "extremely"
      - "amazingly"
      - "truly"

    copywriting_cliches:
      - "imagine if you could"
      - "picture this"
      - "what if I told you"
      - "the truth is"
      - "here's the thing"

  scan_result:
    poison_words_found: [list]
    count: [number]

  IF count > 0:
    HALT — "Zero poison words allowed in editorial output"
    words_to_remove: [list with locations]
```

---

## STRUCTURAL FIX 6: APPROVAL-REQUIRED GATE

### The Problem
AI makes major element changes without explicit human approval.

### The Fix

**APPROVAL-REQUIRED CLASSIFICATIONS:**

```yaml
approval_required_validation:
  change_classification:
    root_cause_changes:
      detected: [Y/N]
      description: "[what was changed]"
      requires_approval: true

    mechanism_name_changes:
      detected: [Y/N]
      description: "[what was changed]"
      requires_approval: true

    promise_changes:
      detected: [Y/N]
      description: "[what was changed]"
      requires_approval: true

    anchor_phrase_changes:
      detected: [Y/N]
      description: "[what was changed]"
      requires_approval: true

  any_approval_required_changes: [Y/N]

  IF any_approval_required_changes == Y:
    approval_status:
      human_approval_received: [Y/N]
      approval_timestamp: "[ISO 8601]"

    IF human_approval_received == N:
      HALT — "APPROVAL-REQUIRED changes detected — cannot proceed without explicit human approval"
      changes_requiring_approval: [list]
```

---

## STRUCTURAL FIX 7: EDITORIAL-SPECIFIC MC-CHECK

```yaml
EDITORIAL-MC-CHECK:
  timestamp: "[current time]"

  specimen_verification:
    specimens_loaded: [Y/N]
    type_matched: [Y/N]
    if_any_no: "STOP — Load type-matched specimens"

  lens_verification:
    lenses_executed: [number]
    if_under_6: "STOP — All 6 expert lenses required"

  criteria_verification:
    criteria_scored: [number]
    if_under_7: "STOP — All 7 criteria must be scored"

    voice_preservation_score: [number]
    if_under_7: "🛑 CRITICAL — Voice break detected"

    threading_preservation_score: [number]
    if_under_7: "🛑 CRITICAL — Threading damaged"

    issue_resolution_score: [number]
    if_under_7: "🛑 CRITICAL — Objective not met"

    overall_weighted_score: [number]
    if_under_8.5: "STOP — Overall score below 8.5 threshold"

  slop_verification:
    poison_words_found: [number]
    if_above_0: "STOP — Zero poison words allowed"

  approval_verification:
    approval_required_changes_detected: [Y/N]
    if_yes:
      human_approval_received: [Y/N]
      if_no: "STOP — APPROVAL-REQUIRED changes need explicit human approval"

  human_selection_verification:
    selection_received: [Y/N]
    if_at_final_and_no: "STOP — Human selection is BLOCKING"

  result: [CONTINUE | HALT_SPECIMENS | HALT_LENSES | HALT_CRITERIA | HALT_VOICE | HALT_THREADING | HALT_SLOP | HALT_APPROVAL | HALT_SELECTION]
```

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 12, 15):
[ ] EDITORIAL-ANTI-DEGRADATION.md read (THIS FILE)
[ ] EDITORIAL-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 14)
[ ] Input files validated (assembled-draft, campaign-brief, structure-package)

LAYER 0 (FOUNDATION):
[ ] Assembled draft loaded from campaign-assembly
[ ] 0.2.6-curated-gold-specimens.md READ
[ ] Type-matched specimens loaded VERBATIM
[ ] Campaign brief voice/tone direction loaded

LAYER 1 (MULTI-LENS REVIEW):
[ ] Makepeace lens executed (flow & architecture)
[ ] Halbert lens executed (entertainment & personality)
[ ] Schwartz lens executed (sophistication calibration)
[ ] Ogilvy lens executed (credibility & clarity)
[ ] Clemens lens executed (scientific clarity)
[ ] Bencivenga lens executed (proof-first authority)
[ ] All 6 lenses documented with issues and suggestions
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (SCORING & REVISION):
[ ] All 7 criteria scored
[ ] Voice preservation >= 7.0
[ ] Threading preservation >= 7.0
[ ] Issue resolution >= 7.0
[ ] Overall weighted score >= 8.5
[ ] Revisions applied from consensus issues
[ ] APPROVAL-REQUIRED changes flagged
[ ] Human approval received for flagged changes (if any)
[ ] LAYER_2_COMPLETE.yaml created

LAYER 2.5 (ARENA — MANDATORY, CANNOT BE SKIPPED):
[ ] All 7 competitors generated across 2 rounds
[ ] Adversarial critique completed each round
[ ] Targeted revision completed each round
[ ] Post-Arena Synthesis: 2-3 hybrids created
[ ] 9-10 candidates presented to human
[ ] Human selection received (BLOCKING)
[ ] ARENA_COMPLETE.yaml created

LAYER 3 (VALIDATION & POLISH):
[ ] Slop scan passes (0 poison words)
[ ] Final coherence check
[ ] Anti-slop validation passes
[ ] Human selection received
[ ] HUMAN_SELECTION.yaml created
[ ] LAYER_3_COMPLETE.yaml created

OUTPUT:
[ ] editorial-package.json created
[ ] EDITORIAL-SUMMARY.md created
[ ] FINAL-DRAFT.md created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified (editorial-package.json, EDITORIAL-SUMMARY.md, FINAL-DRAFT.md, execution-log.md)
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY specimens loaded
[ ] VERIFY all 6 lenses executed
[ ] VERIFY all 7 criteria scored
[ ] VERIFY critical scores >= 7.0
[ ] VERIFY overall score >= 8.5
[ ] VERIFY 0 poison words
[ ] VERIFY human approvals received
[ ] VERIFY human selection exists
```

---

## KEY INSIGHT

> **"6 lenses see what 1 lens misses. Voice breaks destroy credibility. Threading damage fragments the copy. Zero poison words — not 'minimal' — zero."**

---

## STRUCTURAL FIX 8: FULL-READ COHERENCE GATE (CRITICAL — ADDED 2026-02-06)

### The Problem (Ultra Liver Failure 2026-02-05)

AI passed copy with A- (91%) grade that had MASSIVE content repetition:
- The 6 expert lenses each evaluated their criteria in isolation
- Each section scored well individually
- But as a UNIFIED NARRATIVE, it failed completely
- Same content repeated 3-4 times across sections

**Root cause:** No lens asked: "If a reader reads this straight through, would they feel like they're being told the same thing multiple times?"

**Threading counts were INFLATED:**
- "Phase 3" appeared 18 times → But many were in REPEATED explanations
- High counts looked like "good threading" but were actually "bad duplication"

### The Fix

**NEW MICROSKILL:** `layer-1/1.5-full-read-coherence.md`

```yaml
full_read_coherence_gate:
  position: "Layer 1, after blind read capture, before 6-lens critique"

  execution:
    step_1: "Fresh full read-through as a READER would experience"
    step_2: "Progressive information audit — what NEW info in each section?"
    step_3: "Repetition heat map — where do concepts appear?"
    step_4: "Threading quality vs quantity — genuine or inflated?"

  core_question: |
    "If someone reads this draft from beginning to end in one sitting, will they:
    - Feel like they're reading ONE continuous narrative, or multiple documents?
    - Feel information PROGRESSES, or REPEATS?
    - Want to keep reading, or feel like they've already heard this?"

  scoring:
    progression_score: "Does information progress or repeat? (min 7.0)"
    unity_score: "One narrative or multiple documents? (min 7.0)"
    momentum_score: "Keep reading or heard this already? (min 7.0)"
    threading_quality_score: "Genuine threading or inflated counts? (min 7.0)"
    overall_coherence_score: "Average of above (min 7.0)"

  gate_criteria:
    IF overall_coherence_score < 7.0:
      action: "HALT — Return to Assembly for restructure OR heavy editorial with human approval"

    IF overall_coherence_score >= 7.0 AND < 8.0:
      action: "PROCEED_WITH_CAUTION — Flag coherence issues as P1"

    IF overall_coherence_score >= 8.0:
      action: "PASS — Strong narrative coherence"
```

### Updated Minimum Thresholds

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Progression score** | 7.0 | HALT — Information repeating |
| **Unity score** | 7.0 | HALT — Narrative fragmented |
| **Momentum score** | 7.0 | HALT — Reader would tune out |
| **Threading quality** | 7.0 | HALT — Counts inflated |
| **Overall coherence** | 7.0 | HALT — Cannot proceed |

### Updated EDITORIAL-MC-CHECK Addition

```yaml
coherence_verification:  # NEW SECTION
  full_read_completed: [Y/N]
  if_no: "STOP — Full-read coherence audit required"

  progression_score: [number]
  if_under_7: "🛑 CRITICAL — Information repeating across sections"

  unity_score: [number]
  if_under_7: "🛑 CRITICAL — Narrative fragmented"

  momentum_score: [number]
  if_under_7: "🛑 CRITICAL — Reader would tune out from repetition"

  threading_quality_score: [number]
  if_under_7: "🛑 CRITICAL — Threading counts inflated by duplication"

  overall_coherence_score: [number]
  if_under_7: "STOP — Overall coherence below 7.0 threshold"
```

### Swipe Comparison Requirement

```yaml
swipe_comparison:
  required: true
  purpose: "Compare structural patterns against quality VSL benchmarks"

  benchmark_patterns:
    emma_pattern:
      - "Problem introduced ONCE"
      - "Mechanism explained ONCE"
      - "Each section builds on previous"
      - "No re-explanation of earlier content"

    gundry_pattern:
      - "Three-pronged defense introduced ONCE"
      - "Progressive build throughout"
      - "Later sections ASSUME earlier understanding"

  comparison_questions:
    - "Does this draft explain any concept more than once with full detail?"
    - "Does this draft use any metaphor more than once?"
    - "Would Emma or Gundry structure this as one explanation or multiple?"
    - "Does later content BUILD on earlier or REPEAT earlier?"
```

---

## DOCUMENTED FAILURE: ULTRA LIVER 2026-02-05

### Failure Summary

```yaml
failure_record:
  id: "FAIL_EDITORIAL_001"
  date: "2026-02-05"
  campaign: "Ultra Liver"
  grade_assigned: "A- (91%)"
  actual_quality: "FAIL — Massive structural issues"

  what_passed:
    - "Makepeace lens: 8.8 — Flow evaluated per-transition, not whole narrative"
    - "Halbert lens: 8.5 — Personality consistent (same content repeated)"
    - "Schwartz lens: 9.0 — Sophistication calibrated (irrelevant to repetition)"
    - "Ogilvy lens: 9.0 — Each explanation credible (but explanation repeated 3x)"
    - "Clemens lens: 9.2 — Mechanism clear (explained THREE TIMES)"
    - "Kennedy lens: 8.8 — Offer/close solid"
    - "Threading audit: PASS — Counts high (inflated by duplication)"

  what_was_missed:
    - "Same concept (3 phases) explained THREE TIMES"
    - "Same metaphor (car wash) used TWICE"
    - "Same explanation (sticky bile) FOUR TIMES"
    - "Narrative felt like 3 documents stitched together"
    - "Reader would think 'didn't they just say this?' multiple times"

  why_existing_gates_missed_it:
    - "Each lens evaluated its criteria, not the whole as one narrative"
    - "No full-read coherence check existed"
    - "Threading counts didn't distinguish quality from quantity"
    - "No swipe comparison for structural patterns"

  fix_implemented:
    - "Added 1.5-full-read-coherence.md to Layer 1"
    - "Added coherence verification to MC-CHECK"
    - "Added swipe comparison requirement"
    - "Distinguished threading quality from threading quantity"

  lessons_learned:
    - "Individual section scores can be high while whole narrative fails"
    - "Threading = same PHRASE, Duplication = same EXPLANATION"
    - "6 lenses see trees, need coherence audit to see forest"
    - "Quality VSLs (Emma, Gundry) explain each concept ONCE"
```

---

## STRUCTURAL FIX 11: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 2-round + audience evaluation competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/20-editorial/checkpoints/ARENA_COMPLETE.yaml
```

This file is created ONLY after:
1. All 7 competitors have generated across 2 rounds
2. Adversarial critique completed each round
3. Targeted revision completed each round
4. All candidates scored against 7 criteria
5. Post-arena synthesis complete (2-3 hybrids)
6. Human selection received (BLOCKING)

### Checkpoint Progression (Updated)

```
LAYER_1_COMPLETE.yaml → LAYER_2_COMPLETE.yaml → ARENA_COMPLETE.yaml → LAYER_3_COMPLETE.yaml → LAYER_4_COMPLETE
```

**ARENA_COMPLETE.yaml sits between LAYER_2 and LAYER_3. Layer 3 is BLOCKED without it.**

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

## STRUCTURAL FIX 12: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which layers completed and what candidates were selected is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/20-editorial/
├── PROJECT-STATE.md          # Living document — updated after every layer
├── PROGRESS-LOG.md           # Append-only timeline of all actions
├── checkpoints/              # Gate checkpoint files
├── execution-log.md          # Detailed execution record
├── editorial-package.json    # PRIMARY OUTPUT
├── EDITORIAL-SUMMARY.md      # Human-readable handoff
└── FINAL-DRAFT.md            # Final polished draft
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "20-editorial"
created: "[date]"
last_updated: "[date]"
current_layer: [0-5]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
inputs_validated:
  assembled_draft: [Y/N]
  campaign_brief: [Y/N]
  structure_package: [Y/N]
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 13: BINARY GATE ENFORCEMENT (FORBIDDEN STATUSES)

### The Problem
Previous skills had models invent gate statuses like "PARTIAL_PASS" and "CONDITIONAL_PASS" — statuses that don't exist.

### The Fix

**Gate statuses are BINARY: PASS or FAIL. Decision statuses are explicit.**

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

IF any forbidden status is generated:
  1. HALT immediately
  2. DELETE any output files created under the false status
  3. RETURN to the failing layer
  4. Re-evaluate with valid statuses only
```

---

## STRUCTURAL FIX 14: STALE ARTIFACT CLEANUP

### The Fix

**Before writing ANY replacement output file, VERIFY and DELETE stale artifacts:**

```
STALE ARTIFACT PROTOCOL:

BEFORE writing editorial-package.json, EDITORIAL-SUMMARY.md, or FINAL-DRAFT.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/editorial-package.json (root — from failed attempts)
     - [project]/20-editorial/editorial-package.json (correct location)
     - [project]/outputs/editorial-package.json (wrong path)
  2. IF stale file exists at wrong location:
     - DELETE it
     - LOG deletion in PROGRESS-LOG.md
  3. ONLY THEN write the new output files

AFTER any FAILED attempt:
  1. DELETE all output artifacts from the failed attempt
  2. LOG the failure and cleanup in PROGRESS-LOG.md
```

---

## STRUCTURAL FIX 15: ANTI-DEGRADATION MANDATORY READ

### The Fix

**Session startup protocol — BEFORE any Editorial execution:**

```
SESSION STARTUP:
  1. READ this file (EDITORIAL-ANTI-DEGRADATION.md) — MANDATORY
  2. READ EDITORIAL-AGENT.md — agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin Editorial execution without reading this anti-degradation file first.
```

---

---

## Per-Microskill Output Protocol (v3.2)

**Added:** 2026-02-12
**Reference:** ~system/SYSTEM-CORE.md § MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

**Note:** Skill 20 (Editorial) is unique among all CopywritingEngine skills in having a Layer 5 (final assessment and grading). The per-microskill output protocol covers all six layers (0-5).

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-vault-intelligence-loader | layer-0-outputs/0.2-vault-intelligence-loader.md | 1KB |
| 0 | 0.2.6-curated-gold-specimens | layer-0-outputs/0.2.6-specimen-loading.md | 2KB |
| 0 | 0.3-teachings-loader | layer-0-outputs/0.3-teachings-loader.md | 1KB |
| 0 | 0.4-input-validator | layer-0-outputs/0.4-input-validator.md | 1KB |
| 0 | 0.5-human-checkpoint-curator | layer-0-outputs/0.5-human-checkpoint.md | 1KB |
| 1 | 1.1-first-read-capture | layer-1-outputs/1.1-first-read-capture.md | 3KB |
| 1 | 1.2-quick-scan-scoring | layer-1-outputs/1.2-quick-scan-scoring.md | 3KB |
| 1 | 1.3-issue-flagging | layer-1-outputs/1.3-issue-flagging.md | 3KB |
| 1 | 1.5-full-read-coherence | layer-1-outputs/1.5-full-read-coherence.md | 3KB |
| 2 | 2.1-makepeace-lens | layer-2-outputs/2.1-makepeace-lens.md | 3KB |
| 2 | 2.2-halbert-lens | layer-2-outputs/2.2-halbert-lens.md | 3KB |
| 2 | 2.3-schwartz-lens | layer-2-outputs/2.3-schwartz-lens.md | 3KB |
| 2 | 2.4-ogilvy-lens | layer-2-outputs/2.4-ogilvy-lens.md | 3KB |
| 2 | 2.5-clemens-lens | layer-2-outputs/2.5-clemens-lens.md | 3KB |
| 2 | 2.6-kennedy-lens | layer-2-outputs/2.6-kennedy-lens.md | 3KB |
| 2 | 2.7-critique-synthesis | layer-2-outputs/2.7-critique-synthesis.md | 5KB |
| 3 | 3.1-structural-compliance-audit | layer-3-outputs/3.1-structural-compliance.md | 3KB |
| 3 | 3.2-principle-alignment-audit | layer-3-outputs/3.2-principle-alignment.md | 3KB |
| 3 | 3.3-contextual-appropriateness | layer-3-outputs/3.3-contextual-appropriateness.md | 3KB |
| 3 | 3.4-craft-quality-audit | layer-3-outputs/3.4-craft-quality.md | 3KB |
| 3 | 3.5-benchmark-comparison | layer-3-outputs/3.5-benchmark-comparison.md | 3KB |
| 4 | 4.1-priority-fixer | layer-4-outputs/4.1-priority-fixes.md | 5KB |
| 4 | 4.2-multi-pass-revision | layer-4-outputs/4.2-multi-pass-revision.md | 5KB |
| 4 | 4.3-anti-slop-final-pass | layer-4-outputs/4.3-anti-slop-final.md | 3KB |
| 4 | 4.4-polish-pass | layer-4-outputs/4.4-polish-pass.md | 3KB |
| 5 | 5.1-second-read-assessment | layer-5-outputs/5.1-second-read-assessment.md | 3KB |
| 5 | 5.2-quality-scoring | layer-5-outputs/5.2-quality-scoring.md | 3KB |
| 5 | 5.3-grade-assignment | layer-5-outputs/5.3-grade-assignment.md | 2KB |
| 5 | 5.4-output-assembly | layer-5-outputs/5.4-output-assembly.md | 5KB |

### Layer Gate Enhancement

Each LAYER_N_COMPLETE.yaml checkpoint MUST list all microskill output files with sizes. If ANY output file is missing, the checkpoint CANNOT be created. This includes LAYER_5_COMPLETE.yaml, which is unique to this skill.

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
| 2.0 | 2026-02-14 | STRUCTURAL FIXES 12-15: Added 4 structural fixes propagated from Skills 01-04. Fix 12: Mandatory Project Infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md, checkpoints/ — includes Layer 5 unique to Editorial). Fix 13: Binary Gate Enforcement (forbidden statuses — PARTIAL_PASS, CONDITIONAL_PASS, etc. trigger IMMEDIATE HALT). Fix 14: Stale Artifact Cleanup (search and delete before writing replacement output — covers editorial-package.json, EDITORIAL-SUMMARY.md, FINAL-DRAFT.md). Fix 15: Anti-Degradation Mandatory Read (session startup protocol — read this file + EDITORIAL-AGENT.md before execution). Added PRE-EXECUTION and POST-EXECUTION sections to implementation checklist. |
| 1.3 | 2026-02-12 | PER-MICROSKILL OUTPUT PROTOCOL (v3.2): Added per-microskill output table with 30 required output files across Layers 0-5 (including Layer 5 unique to Editorial). Enhanced layer gate, execution log, and forbidden behaviors for per-microskill enforcement. |
| 1.2 | 2026-02-06 | ARENA MANDATORY ENFORCEMENT: Added structural fix for Arena Layer (2.5) — cannot be skipped. ARENA_COMPLETE.yaml checkpoint required before Layer 3. Added Arena-specific forbidden rationalizations. Updated checkpoint progression and implementation checklist. |
| 1.1 | 2026-02-06 | CRITICAL UPDATE: Added Structural Fix 8 (Full-Read Coherence Gate) after Ultra Liver failure. Added 1.5-full-read-coherence.md requirement. Added swipe comparison. Added failure documentation. Distinguished threading quality from quantity. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |

---

## STRUCTURAL FIX 9: REPETITION DETECTION PATTERNS (CRITICAL — ADDED 2026-02-06)

### The Problem (Ultra Liver 2026-02-06 Extended Failure)

Even after initial fixes, the draft STILL had repetition issues:
- 61% statistic appeared 4 times
- NAC recommendation appeared 4 times
- "18 months" appeared 2 times
- "Remember Brenda?" callback to content that wasn't developed
- Guarantee explained twice

**Root cause:** No SPECIFIC detection patterns for common repetition types.

### The Fix

**EXPLICIT REPETITION DETECTION PATTERNS:**

```yaml
repetition_detection_patterns:
  purpose: "Scan for specific patterns that indicate lazy repetition vs intentional threading"

  pattern_1_statistic_repetition:
    detection: "Same percentage/number appearing with explanation/context 2+ times"
    scan_for:
      - "[X]% ... [ingredient/concept] ... [effect]"
      - "studies show [X]"
      - "research found [X]"
    examples:
      - "61% bile flow increase" — if explained 2+ times, VIOLATION
      - "85 million Americans" — if with full context 2+ times, VIOLATION
    action: "Count full-context appearances, limit to 1"

  pattern_2_false_callbacks:
    detection: "'Remember X' or callback referencing undeveloped content"
    scan_for:
      - "Remember [Name]?"
      - "As [Name] said..."
      - "Like [Name] discovered..."
    validation:
      for_each_callback:
        referenced_content: "[what's being called back to]"
        original_word_count: [number]
        IF original_word_count < 100:
          HALT — "False callback: [callback] references content too brief to warrant callback"
        IF referenced_content == "testimonial quote only":
          HALT — "Cannot 'Remember' a testimonial — no story was told"

  pattern_3_timeframe_repetition:
    detection: "Same specific timeframe mentioned 2+ times with context"
    scan_for:
      - "[N] months"
      - "[N] years"
      - "[N] weeks"
    examples:
      - "18 months" in lead AND in product section — VIOLATION
      - "28 days" mentioned once — OK
    action: "Keep first mention, remove or convert subsequent to reference"

  pattern_4_institution_repetition:
    detection: "Same institution/credential mentioned with full context 2+ times"
    scan_for:
      - "[Institution] researchers found..."
      - "The [Institution] recommends..."
      - "Published in [Journal]..."
    examples:
      - "American Association for the Study of Liver Diseases" — full context once only
      - "Harvard researchers" — full context once only
    action: "Full institutional context ONCE, name-only thereafter"

  pattern_5_guarantee_repetition:
    detection: "Guarantee explained multiple times"
    scan_for:
      - "money back"
      - "refund"
      - "60 days"
      - "90 days"
    validation:
      guarantee_explanation_count: [number]
      IF count > 1:
        FLAG — "Guarantee explained [count] times — should be 1 with depth"

  pattern_6_mechanism_re_explanation:
    detection: "Same mechanism explained multiple times (not threading)"
    distinction:
      THREADING: "Tri-Phase Flow" (name repeated) — OK
      REPETITION: "Phase 1 breaks down... Phase 2 packages... Phase 3 eliminates..." (explanation repeated) — NOT OK
    validation:
      mechanism_explanation_count: [number]
      IF count > 1:
        HALT — "Mechanism explained [count] times — should be ONCE"

  pattern_7_offer_close_duplication:
    detection: "Close section repeating offer section content"
    scan_for:
      - Same bullet lists
      - Same bonuses listed twice
      - Same guarantee language repeated
    validation:
      offer_bullets_in_close: [Y/N]
      IF duplicates_found:
        FLAG — "Close should not repeat offer — should advance/close"
```

### EDITORIAL REPETITION SCAN OUTPUT

```yaml
editorial_repetition_scan:
  timestamp: "[ISO 8601]"

  statistics_check:
    statistics_found: [list]
    for_each:
      statistic: "[the number/percentage]"
      full_context_appearances: [count]
      locations: [list]
      verdict: [OK | VIOLATION]

  callbacks_check:
    callbacks_found: [list]
    for_each:
      callback: "[the callback text]"
      references: "[what it references]"
      original_content_exists: [Y/N]
      original_word_count: [number]
      verdict: [OK | FALSE_CALLBACK]

  timeframes_check:
    timeframes_found: [list]
    for_each:
      timeframe: "[N months/years]"
      appearances: [count]
      verdict: [OK | VIOLATION]

  institutions_check:
    institutions_found: [list]
    for_each:
      institution: "[name]"
      full_context_appearances: [count]
      verdict: [OK | VIOLATION]

  guarantee_check:
    explanation_count: [number]
    verdict: [OK | VIOLATION]

  mechanism_check:
    explanation_count: [number]
    verdict: [OK | VIOLATION]

  overall_repetition_score: [number]
  violations_found: [list]

  IF violations_found > 0:
    HALT — "Repetition patterns detected"
    fix_instructions: [list specific fixes]
```

---

## STRUCTURAL FIX 10: MANDATORY SECTION VERIFICATION (ADDED 2026-02-06)

### The Problem

Assembly may pass a draft missing critical sections. Editorial must verify.

### The Fix

**SECTION PRESENCE VERIFICATION:**

```yaml
mandatory_section_verification:
  purpose: "Editorial verifies all required sections present before proceeding"

  required_for_VSL:
    lead_with_authority:
      present: [Y/N]
      authority_word_count: [number]
      IF word_count < 50: FLAG — "Authority needs depth"

    countersell:
      present: [Y/N]
      IF missing: HALT — "No countersell section"

    damage_escalation:
      present: [Y/N]
      contains_urgency_proof: [Y/N]
      IF missing: HALT — "No damage escalation section — where is the urgency?"

    promise_benefits:
      present: [Y/N]
      benefits_explicit: [Y/N]
      IF missing: HALT — "No explicit promise/benefits section"
      IF only_in_offer: FLAG — "Benefits buried in offer, should have dedicated section"

    mechanism_education:
      present: [Y/N]
      IF missing: FLAG — "No education before mechanism reveal"

    proof:
      present: [Y/N]
      proof_count: [number]

    product:
      present: [Y/N]

    offer:
      present: [Y/N]

    guarantee:
      present: [Y/N]
      explained_once: [Y/N]

    close:
      present: [Y/N]
      crossroads_or_urgency: [Y/N]

  missing_sections: [list]

  IF any_required_missing:
    HALT — "Cannot proceed with editorial — draft missing sections"
    missing: [list]
    recommended_action: "Return to Assembly"
```

---

## Updated EDITORIAL-MC-CHECK Additions

```yaml
EDITORIAL-MC-CHECK:
  # ... existing checks ...

  repetition_detection:  # NEW
    scan_completed: [Y/N]
    if_no: "STOP — Repetition detection scan required"

    statistic_violations: [list]
    callback_violations: [list]
    timeframe_violations: [list]
    institution_violations: [list]
    guarantee_violation: [Y/N]
    mechanism_violation: [Y/N]

    total_violations: [number]
    IF total_violations > 0:
      HALT — "Repetition detected"
      violations: [detailed list]
      fixes_required: [list]

  section_verification:  # NEW
    all_required_present: [Y/N]
    IF no:
      HALT — "Missing required sections"
      missing: [list]

    damage_escalation_present: [Y/N]
    IF no: HALT — "Draft missing Damage Escalation section"

    promise_benefits_present: [Y/N]
    IF no: HALT — "Draft missing Promise/Benefits section"

    authority_depth_adequate: [Y/N]
    IF no: FLAG — "Authority section needs more depth"
```

---

## COMPREHENSIVE FAILURE DOCUMENTATION: ULTRA LIVER 2026-02-06

```yaml
extended_failure_record:
  campaign: "Ultra Liver"
  dates: "2026-02-05 to 2026-02-06"

  failure_wave_1:
    date: "2026-02-05"
    issues:
      - "Mechanism explained 3 times"
      - "Car wash metaphor used twice"
      - "Sticky bile explained 4 times"
    root_cause: "No deduplication audit in Assembly"
    fix: "Added 3.5-deduplication-audit.md"

  failure_wave_2:
    date: "2026-02-06"
    issues:
      - "61% statistic appeared 4 times"
      - "NAC AASLD appeared 4 times"
      - "'Remember Brenda' callback to undeveloped content"
      - "18 months mentioned twice"
      - "Guarantee explained twice"
      - "Missing Damage Escalation section"
      - "Missing Promise/Benefits section"
      - "Weak lead (symptom list, single sentence authority)"
      - "Harvard JAMA stat in wrong section"
    root_causes:
      - "No proof usage registry (same proof cited multiple times)"
      - "No callback verification (false callbacks passed)"
      - "No claim tracking (timeframes repeated)"
      - "No mandatory section checklist (missing sections)"
      - "No proof placement rules (urgency proof in close)"
      - "No lead specificity requirements (abstract 4 elements passed weak lead)"
    fixes_implemented:
      - "Added proof_usage_registry to Assembly"
      - "Added mandatory_section_presence to Assembly"
      - "Added proof_placement_rules to Assembly"
      - "Added claim_tracking_registry to Assembly"
      - "Added lead_component_specificity_gate to Lead"
      - "Added repetition_detection_patterns to Editorial"
      - "Added mandatory_section_verification to Editorial"

  lessons_learned:
    - "Learning logs and instructions DO NOT WORK — only structures work"
    - "Abstract requirements (4 elements) can be checked off with weak content"
    - "Threading counts can mask repetition (quantity ≠ quality)"
    - "Each skill must track what it uses, not just what it produces"
    - "Missing sections must be caught by explicit checklist, not inference"
    - "Proof belongs in specific sections based on type"
    - "Callbacks must reference actual developed content"

  structural_principle:
    quote: "Instructions can be ignored. Structures cannot be bypassed."
    application: "Every quality requirement must have a VALIDATION GATE with specific criteria, not general guidance"
```
