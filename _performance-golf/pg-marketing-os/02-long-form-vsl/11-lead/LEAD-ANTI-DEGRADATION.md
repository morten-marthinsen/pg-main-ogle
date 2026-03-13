# LEAD-ANTI-DEGRADATION.md

**Version:** 2.0
**Created:** 2026-02-05
**Updated:** 2026-02-14
**Purpose:** STRUCTURAL enforcement to prevent lead skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: LEAD-ANTI-DEGRADATION.md v2.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Generate leads with fewer than 4 required elements, reveal mechanism instead of hinting, or select leads without human approval.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates leads WITHOUT loading type-matched specimens
- AI produces leads missing one or more of the 4 required elements
- AI skips emotional arc design
- AI produces leads without open loops
- AI selects lead without human approval
- AI skips lead type classification

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/11-lead/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/11-lead/checkpoints/LAYER_2_COMPLETE.yaml
[project]/11-lead/checkpoints/ARENA_COMPLETE.yaml
```

**Full Checkpoint Progression:**
```
[project]/11-lead/checkpoints/LAYER_1_COMPLETE.yaml
[project]/11-lead/checkpoints/LAYER_2_COMPLETE.yaml
[project]/11-lead/checkpoints/ARENA_COMPLETE.yaml
[project]/11-lead/checkpoints/LAYER_3_COMPLETE.yaml
[project]/11-lead/HUMAN_SELECTION.yaml  # BLOCKING for Layer 4
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "11-lead"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  specimens_loaded: true
  four_elements_present:
    hook: true
    problem_callout: true
    mechanism_hint: true
    credibility_insertion: true
  open_loops_created: [number]
  human_selection: [received | pending]
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Specimens loaded** | Type-matched verbatim | HALT — Load specimens |
| **Four elements present** | 4/4 | HALT — Include all elements |
| **Open loops** | 2 minimum | HALT — Create more loops |
| **Arena personas** | 6/6 | HALT — All personas generate |
| **Human selection** | BLOCKING | HALT — Cannot package without |
| **Emotional arc** | Designed | HALT — Design arc |

### The 4 Required Lead Elements

Every lead MUST contain ALL 4 elements:

| Element | Purpose | Check |
|---------|---------|-------|
| **Hook** | Arrest attention, create pattern interrupt | [ ] |
| **Problem Callout** | Validate reader's experience | [ ] |
| **Mechanism Hint** | Tease solution without revealing | [ ] |
| **Credibility Insertion** | Establish authority/trust | [ ] |

```yaml
four_element_validation:
  hook:
    present: [Y/N]
    type: "[curiosity | story | benefit | warning | question]"
    attention_power: [1-10]

  problem_callout:
    present: [Y/N]
    validates_experience: [Y/N]
    emotional_resonance: [1-10]

  mechanism_hint:
    present: [Y/N]
    hints_without_revealing: [Y/N]
    curiosity_created: [1-10]

  credibility_insertion:
    present: [Y/N]
    type: "[qualification | social_proof | experience | authority]"
    believability: [1-10]

  IF any_element.present == N:
    HALT — "All 4 elements required"
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "specimens are reference only" | Specimens are REQUIRED statistical attractors | HALT — Load verbatim |
| "3 elements is enough" | All 4 elements mandatory | HALT — Add missing element |
| "credibility comes later" | Credibility MUST be in lead | HALT — Insert credibility |
| "mechanism reveal is fine" | Lead HINTS, doesn't reveal | HALT — Replace with hint |
| "Arena is optional" | All 6 personas must generate | HALT — Complete Arena |
| "I can select the best lead" | Human selection is BLOCKING | HALT — Get selection |

---

## STRUCTURAL FIX 4: OPEN LOOP REQUIREMENT

### The Problem
AI produces leads that answer questions instead of opening curiosity loops.

### The Fix

**MANDATORY OPEN LOOPS:**

```yaml
open_loop_validation:
  loops_created:
    - loop_1:
        question_opened: "[what curiosity is created]"
        where_resolved: "[later section where this pays off]"
    - loop_2:
        question_opened: "[curiosity]"
        where_resolved: "[section]"

  minimum_loops: 2
  actual_loops: [number]

  IF actual_loops < 2:
    HALT — "Lead must open minimum 2 curiosity loops"

  loop_check:
    any_loop_closed_in_lead: [Y/N]
    IF yes: HALT — "Loops must remain OPEN in lead"
```

---

## STRUCTURAL FIX 5: LEAD-SPECIFIC MC-CHECK

```yaml
LEAD-MC-CHECK:
  timestamp: "[current time]"

  specimen_verification:
    specimens_loaded: [Y/N]
    type_matched: [Y/N]
    if_any_no: "STOP — Load type-matched specimens"

  four_element_verification:
    hook_present: [Y/N]
    problem_callout_present: [Y/N]
    mechanism_hint_present: [Y/N]
    credibility_insertion_present: [Y/N]
    if_any_no: "STOP — All 4 elements required"

  open_loop_verification:
    loops_created: [number]
    if_under_2: "STOP — Minimum 2 open loops"

  arena_verification:
    personas_completed: [number]
    if_under_6: "STOP — All 6 Arena personas required"

  human_selection_verification:
    selection_received: [Y/N]
    if_at_packaging_and_no_selection: "STOP — Human selection BLOCKING"

  result: [CONTINUE | HALT_SPECIMENS | HALT_ELEMENTS | HALT_LOOPS | HALT_SELECTION]
```

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 10, 13):
[ ] LEAD-ANTI-DEGRADATION.md read (THIS FILE)
[ ] LEAD-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 12)
[ ] Input files validated (headline-package, campaign-brief-package, big-idea-package, structure-package, specimens)

LAYER 0 (FOUNDATION):
[ ] Upstream packages loaded (headline, campaign brief)
[ ] 0.2.6-curated-gold-specimens.md READ
[ ] Type-matched specimens loaded VERBATIM
[ ] Input validated

LAYER 1 (ARCHITECTURE):
[ ] Lead type classified
[ ] Hook engineered
[ ] Four element mapper executed
[ ] Emotional arc designed
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (CONSTRUCTION):
[ ] Problem callout built
[ ] Mechanism elevator pitch (hint) built
[ ] Open loops engineered (2+ loops)
[ ] Credibility insertion architected
[ ] All 6 Arena personas generate
[ ] LAYER_2_COMPLETE.yaml created

LAYER 2.5 (ARENA — MANDATORY, CANNOT BE SKIPPED):
[ ] All 7 competitors generated across 3 rounds
[ ] Adversarial critique completed each round
[ ] Targeted revision completed each round
[ ] Post-Arena Synthesis: 2-3 hybrids created
[ ] 9-10 candidates presented to human
[ ] Human selection received (BLOCKING)
[ ] ARENA_COMPLETE.yaml created

LAYER 3 (REFINEMENT):
[ ] Vagueness calibrated
[ ] Georgi compliance checked
[ ] Conversational flow optimized
[ ] Attention lock built
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (VALIDATION & SELECTION):
[ ] Four element completeness validated
[ ] Emotional sale audited
[ ] Anti-slop validated
[ ] Human selection received
[ ] HUMAN_SELECTION.yaml created
[ ] lead-package.json created
[ ] LEAD-SUMMARY.md created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY specimens loaded (execution log)
[ ] VERIFY all 4 elements present
[ ] VERIFY 2+ open loops
[ ] VERIFY human selection exists
```

---

## KEY INSIGHT

> **"A lead missing any of the 4 elements is incomplete. A lead without open loops is a dead end. A lead without specimen injection lacks elite patterns."**

---

## STRUCTURAL FIX 8: LEAD COMPONENT SPECIFICITY GATE (CRITICAL — ADDED 2026-02-06)

### The Problem (Ultra Liver Failure 2026-02-06)

The lead passed the "4 elements" check but was WEAK because:
- Generic symptom list instead of opening statistic
- Single sentence authority ("I'm a Yale-trained physician") instead of depth build
- No emotional hook creating anger/fear/curiosity
- No industry indictment or dramatic tension

**Root cause:** The 4 elements (hook, problem callout, mechanism hint, credibility) are TOO ABSTRACT. They can be checked off with minimal content.

### The Fix

**MANDATORY LEAD COMPONENT SPECIFICS:**

```yaml
lead_component_specificity_gate:

  opening_statistic:
    required: true
    definition: "A specific NUMBER establishing market scale"
    examples:
      - "85 million Americans have fatty liver disease"
      - "66% of Americans are overweight"
      - "74% of Americans suffer from GI discomfort"
    validation:
      has_number: [Y/N]
      number_establishes_scale: [Y/N]
      appears_in_first_50_words: [Y/N]
    IF any_validation == N:
      HALT — "Lead must open with statistic establishing scale"

  authority_depth:
    required: true
    definition: "Authority build with SPECIFIC depth, not generic credentials"
    minimum_components:
      - years_of_experience: "[specific number]"
      - specific_achievement: "[publication, practice size, patients helped]"
      - personal_stake: "[why they devoted themselves to this]"
    validation:
      has_years: [Y/N]
      has_achievement: [Y/N]
      has_personal_stake: [Y/N]
      word_count: "[must be >= 50 words on authority]"
    IF word_count < 50 OR any_component_missing:
      HALT — "Authority must have depth, not just credentials"

    forbidden_patterns:
      - "I'm a [credential]-trained [profession]" without elaboration
      - Single sentence authority
      - Generic expertise claims

  emotional_hook:
    required: true
    definition: "Explicit emotional trigger with NAMED emotion"
    valid_emotions:
      - anger: "I need to share something that will make you angry"
      - fear: "What I'm about to tell you is disturbing"
      - curiosity: "What I discovered shocked me"
      - frustration: "You've been lied to"
    validation:
      emotion_named_or_clearly_triggered: [Y/N]
      emotion_type: "[anger | fear | curiosity | frustration]"
    IF emotion_not_triggered:
      HALT — "Lead must create specific emotional response"

  discovery_mystery:
    required: true
    definition: "Something discovered/revealed that creates anticipation"
    validation:
      discovery_language_present: [Y/N]
      mystery_created: [Y/N]
    examples:
      - "What I discovered shocked me"
      - "For 18 months, I investigated..."
      - "I found something nobody else noticed"
    IF discovery_not_present:
      HALT — "Lead must create discovery/mystery anticipation"

  problem_escalation:
    required: true
    definition: "Problem shown to be BIGGER than reader assumed"
    validation:
      problem_scope_expanded: [Y/N]
      reader_assumption_challenged: [Y/N]
    examples:
      - "This isn't just about supplements — it's a $50 billion industry failure"
      - "85 million Americans — and most don't know it"
    IF problem_not_escalated:
      FLAG — "Problem should feel bigger than reader expected"
```

### Updated LEAD-MC-CHECK Addition

```yaml
lead_specificity_verification:  # NEW SECTION

  opening_statistic:
    present: [Y/N]
    statistic: "[the actual number]"
    in_first_50_words: [Y/N]
    if_no: "🛑 HALT — Lead must open with scale-establishing statistic"

  authority_depth:
    word_count_on_authority: [number]
    has_years: [Y/N]
    has_specific_achievement: [Y/N]
    has_personal_stake: [Y/N]
    if_word_count_under_50: "🛑 HALT — Authority needs depth, not single sentence"
    if_any_component_missing: "FLAG — Authority missing component"

  emotional_hook:
    emotion_triggered: [Y/N]
    emotion_type: "[anger | fear | curiosity | frustration | none]"
    if_none: "🛑 HALT — Lead must create specific emotional response"

  discovery_mystery:
    discovery_language: [Y/N]
    mystery_created: [Y/N]
    if_no: "FLAG — Lead should create discovery anticipation"

  problem_escalation:
    problem_expanded: [Y/N]
    if_no: "FLAG — Problem should feel bigger than expected"
```

### Emma/Gundry Lead Comparison

```yaml
lead_benchmark_comparison:

  gundry_lead_components:
    - "Pattern interrupt opening (food advice clips)"
    - "Statistics: 66% overweight, projecting 85%"
    - "Personal transformation story (70 lbs lost)"
    - "Authority depth (Yale, Loma Linda, artificial heart, Dr. Oz)"
    - "Discovery: 'I realized much of what we were telling patients was flat out wrong'"
    - "Emotional hook: anger at Big Pharma, righteous mission"

  emma_lead_components:
    - "Mystery opening: 'Trust me. It's not what you think it is.'"
    - "Authority with 9/11 personal tragedy (sacred mission)"
    - "Discovery: archaea/gut vampires mechanism"
    - "Emotional hook: disgust at parasites inside you"

  ultra_liver_lead_BEFORE_fix:
    - "Generic symptom list (bloating, fatigue, fog, belly fat)"
    - "Single sentence authority: 'I'm a Yale-trained physician'"
    - "No statistic establishing scale"
    - "No emotional hook"
    - "No discovery/mystery"
    VERDICT: "FAILED benchmark comparison"

  ultra_liver_lead_AFTER_fix:
    - "85 million Americans statistic"
    - "Authority depth: 25 years, published, trained doctors, largest practice"
    - "Emotional hook: 'make you angry'"
    - "Discovery: 'What I discovered shocked me'"
    - "Problem escalation: $50 billion industry failure"
    VERDICT: "PASSES benchmark comparison"
```

---

## DOCUMENTED FAILURE: ULTRA LIVER LEAD 2026-02-06

```yaml
failure_record:
  id: "FAIL_LEAD_001"
  date: "2026-02-06"
  campaign: "Ultra Liver"

  lead_as_submitted:
    opening: "The bloating that won't go away no matter what you eat."
    authority: "My name is Dr. Josh Levitt. I'm a Yale-trained physician."

  why_it_passed_existing_gates:
    - "Hook present: YES (symptom list hooks readers with problems)"
    - "Problem callout present: YES (symptoms validated)"
    - "Mechanism hint present: YES (Phase 3 teased)"
    - "Credibility insertion present: YES (Yale mentioned)"
    - "All 4 elements checked: PASS"

  why_it_was_actually_weak:
    - "No statistic establishing scale — no sense of how big this problem is"
    - "Authority was ONE SENTENCE — no depth, no years, no achievements"
    - "No emotional hook — just neutral symptom listing"
    - "No discovery/mystery — reader not anticipating revelation"
    - "No problem escalation — problem felt individual, not systemic"

  comparison_to_benchmarks:
    gundry: "Opens with media clips + 66% statistic + 70 lb personal story"
    emma: "Opens with mystery hook + authority depth + 9/11 sacred mission"
    ultra_liver_original: "Opens with symptom list + one sentence authority"
    VERDICT: "Ultra Liver lead was D-tier compared to A-tier benchmarks"

  fix_implemented:
    - "Added lead_component_specificity_gate to LEAD-ANTI-DEGRADATION.md"
    - "Now requires: opening statistic, authority depth, emotional hook, discovery"
    - "Added Emma/Gundry benchmark comparison requirement"
```

---

## STRUCTURAL FIX 9: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution — AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 3-round competition. This eliminates the highest-value quality step.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/11-lead/checkpoints/ARENA_COMPLETE.yaml
```

This file is created ONLY after:
1. All 7 competitors have generated across 3 rounds
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

## STRUCTURAL FIX 10: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which layers completed and what candidates were selected is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/11-lead/
├── PROJECT-STATE.md          # Living document — updated after every layer
├── PROGRESS-LOG.md           # Append-only timeline of all actions
├── checkpoints/              # Gate checkpoint files
├── execution-log.md          # Detailed execution record
├── lead-package.json         # PRIMARY OUTPUT
└── LEAD-SUMMARY.md           # Human-readable handoff
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "11-lead"
created: "[date]"
last_updated: "[date]"
current_layer: [0-4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
inputs_validated:
  headline_package: [Y/N]
  campaign_brief_package: [Y/N]
  big_idea_package: [Y/N]
  structure_package: [Y/N]
  specimens_loaded: [Y/N]
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 11: BINARY GATE ENFORCEMENT (FORBIDDEN STATUSES)

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

## STRUCTURAL FIX 12: STALE ARTIFACT CLEANUP

### The Fix

**Before writing ANY replacement output file, VERIFY and DELETE stale artifacts:**

```
STALE ARTIFACT PROTOCOL:

BEFORE writing lead-package.json or LEAD-SUMMARY.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/lead-package.json (root — from failed attempts)
     - [project]/11-lead/lead-package.json (correct location)
     - [project]/outputs/lead-package.json (wrong path)
  2. IF stale file exists at wrong location:
     - DELETE it
     - LOG deletion in PROGRESS-LOG.md
  3. ONLY THEN write the new output files

AFTER any FAILED attempt:
  1. DELETE all output artifacts from the failed attempt
  2. LOG the failure and cleanup in PROGRESS-LOG.md
```

---

## STRUCTURAL FIX 13: ANTI-DEGRADATION MANDATORY READ

### The Fix

**Session startup protocol — BEFORE any lead execution:**

```
SESSION STARTUP:
  1. READ this file (LEAD-ANTI-DEGRADATION.md) — MANDATORY
  2. READ LEAD-AGENT.md — agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin lead execution without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Added:** 2026-02-12
**Reference:** ~system/SYSTEM-CORE.md § MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-vault-intelligence-loader | layer-0-outputs/0.2-vault-intelligence-loader.md | 1KB |
| 0 | 0.2.5-specimen-decomposer | layer-0-outputs/0.2.5-specimen-decomposer.md | 1KB |
| 0 | 0.2.6-curated-gold-specimens | layer-0-outputs/0.2.6-specimen-loading.md | 2KB |
| 0 | 0.3-teachings-loader | layer-0-outputs/0.3-teachings-loader.md | 1KB |
| 0 | 0.4-input-validator | layer-0-outputs/0.4-input-validator.md | 1KB |
| 1 | 1.1-lead-type-classifier | layer-1-outputs/1.1-lead-type-classifier.md | 3KB |
| 1 | 1.2-hook-engineer | layer-1-outputs/1.2-hook-engineer.md | 5KB |
| 1 | 1.3-four-element-mapper | layer-1-outputs/1.3-four-element-mapper.md | 3KB |
| 1 | 1.4-emotional-arc-designer | layer-1-outputs/1.4-emotional-arc-designer.md | 3KB |
| 2 | 2.1-problem-callout-builder | layer-2-outputs/2.1-problem-callout-builder.md | 5KB |
| 2 | 2.2-mechanism-elevator-pitch | layer-2-outputs/2.2-mechanism-elevator-pitch.md | 5KB |
| 2 | 2.3-open-loop-engineer | layer-2-outputs/2.3-open-loop-engineer.md | 3KB |
| 2 | 2.4-credibility-insertion | layer-2-outputs/2.4-credibility-insertion.md | 3KB |
| 3 | 3.1-vagueness-calibrator | layer-3-outputs/3.1-vagueness-calibrator.md | 3KB |
| 3 | 3.2-georgi-compliance | layer-3-outputs/3.2-georgi-compliance.md | 3KB |
| 3 | 3.3-conversational-flow | layer-3-outputs/3.3-conversational-flow.md | 3KB |
| 3 | 3.4-attention-lock | layer-3-outputs/3.4-attention-lock.md | 3KB |
| 4 | 4.1-four-element-completeness | layer-4-outputs/4.1-four-element-completeness.md | 3KB |
| 4 | 4.2-emotional-sale-audit | layer-4-outputs/4.2-emotional-sale-audit.md | 3KB |
| 4 | 4.3-anti-slop-validation | layer-4-outputs/4.3-anti-slop-validation.md | 3KB |
| 4 | 4.4-vault-pattern-comparison | layer-4-outputs/4.4-vault-pattern-comparison.md | 3KB |
| 4 | 4.5-final-lead-assembly | layer-4-outputs/4.5-final-lead-assembly.md | 5KB |

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
| 2.0 | 2026-02-14 | STRUCTURAL ENFORCEMENT PROPAGATION: Added 4 structural fixes from Skills 01-04 propagation pattern. Fix 10: Mandatory project infrastructure. Fix 11: Binary gate enforcement with forbidden statuses. Fix 12: Stale artifact cleanup. Fix 13: Anti-degradation mandatory read. Implementation checklist expanded with PRE-EXECUTION and POST-EXECUTION sections. |
| 1.2 | 2026-02-12 | PER-MICROSKILL OUTPUT PROTOCOL: Added v3.2 per-microskill output table with 23 required output files across 5 layers. Layer gate enhancement, execution log enhancement, forbidden behaviors for per-microskill compliance. |
| 1.1 | 2026-02-06 | ARENA MANDATORY ENFORCEMENT: Added structural fix for Arena Layer (2.5) — cannot be skipped. ARENA_COMPLETE.yaml checkpoint required before Layer 3. Added Arena-specific forbidden rationalizations. Updated checkpoint progression and implementation checklist. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |
