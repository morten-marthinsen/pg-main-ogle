# EMAIL-WRITER-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-21
**Purpose:** STRUCTURAL enforcement to prevent email writer skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: EMAIL-WRITER-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Change the body type from what the blueprint assigned, batch-generate multiple emails instead of one at a time, or skip specimen loading before generation.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates email body WITHOUT loading body-type-matched Ben Settle specimens
- AI violates content-to-pitch ratio (writing 50/50 or worse)
- AI skips bridge/transition section or writes a clumsy "now buy this" pivot
- AI generates email without Arena validation (single-perspective output)
- AI changes body type from what the blueprint assigned
- AI batch-generates multiple emails instead of one at a time
- AI produces emails outside word count range (200-500)
- AI uses wrong CTA pattern (not what blueprint assigned)
- AI skips persona voice loading (System 2) before Arena

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/E1-email-writer/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/E1-email-writer/checkpoints/LAYER_1_COMPLETE.yaml
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/E1-email-writer/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/E1-email-writer/checkpoints/LAYER_2_COMPLETE.yaml
[project]/E1-email-writer/checkpoints/ARENA_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "E1-email-writer"
email_position: "[position in sequence, e.g., email-03]"
body_type: "[CT|QO|TM|QA|LB|ST|NR]"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  specimens_loaded:
    structural_specimens: true
    persona_voice_specimens: true
    loaded_verbatim: true
  body_type_assigned: "[type code]"
  word_count:
    target: [number]
    actual: [number]
    within_tolerance: true
  content_to_pitch_ratio:
    content_percent: [number]
    pitch_percent: [number]
    compliant: true

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
| **Word count** | 200-500 (per body type target, +/-20%) | HALT -- Revise to fit range |
| **Content-to-pitch ratio** | 70-80% content / 20-30% pitch | HALT -- Move pitch elements later |
| **Paragraph max** | 3 sentences (most should be 1-2) | HALT -- Break into shorter paragraphs |
| **Opening hook** | 3 lines maximum | HALT -- Compress opening |
| **Structural specimens loaded** | Body-type-matched, verbatim | HALT -- Load specimens |
| **Persona voice specimens loaded** | 6 personas loaded before Arena | HALT -- Load persona specimens |
| **CTA length** | Max 3 sentences (transition + URL + sign-off) | HALT -- Compress CTA |
| **Arena rounds** | 2 + audience evaluation minimum | HALT -- Complete all rounds |
| **Arena competitors** | 7 (6 personas + Architect) | HALT -- All must generate |
| **Human selection** | BLOCKING | HALT -- Cannot package without |
| **Quality score** | >= 7.5 weighted | HALT -- Refine or regenerate |

### Specimen Loading Protocol

**BEFORE ANY EMAIL GENERATION:**

```yaml
specimen_protocol:
  step_1: "READ specimens/specimen-index.md"
  step_2: "IDENTIFY assigned body type from campaign-blueprint.yaml"
  step_3: "LOAD 3-5 structural specimens from specimens/[body-type]/ directory"
  step_4: "HOLD specimens in active context during generation"
  step_5: "DO NOT summarize specimens -- use VERBATIM text"

  body_type_to_specimen_dir:
    CT: "specimens/contrarian/"
    QO: "specimens/quote-opener/"
    TM: "specimens/testimonial/"
    QA: "specimens/qa-response/"
    LB: "specimens/list-based/"
    ST: "specimens/story/"
    NR: "specimens/negative-response/"

  IF specimens_not_loaded:
    HALT -- "Cannot generate email without structural specimen injection"
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "Pitch is only slightly over 30%" | Ratio is 70-80/20-30. Over 30% pitch = protocol violation | HALT -- Revise to reduce pitch content |
| "Body type is close enough" | Body type is ASSIGNED by blueprint. Cannot substitute | HALT -- Use assigned body type |
| "Bridge isn't needed for this email" | Every email has a bridge/transition section (except TM which has minimal commentary + direct CTA) | HALT -- Write the bridge |
| "One Arena round produced great results" | 2 rounds + audience evaluation MANDATORY per ~system/SYSTEM-CORE.md | HALT -- Complete all 2 rounds + audience evaluation |
| "Specimens aren't available for this body type" | All 7 body types have specimen directories | HALT -- Load correct specimen directory |
| "I can write multiple emails to save time" | ONE email at a time. Never batch | HALT -- Focus on current email only |
| "This email doesn't need Arena" | Arena is MANDATORY for every email | HALT -- Execute Arena |
| "The opening is only 4 lines but it's strong" | 3-line maximum is structural, not qualitative | HALT -- Compress to 3 lines |
| "Word count is close enough to target" | +/-20% tolerance is the limit. Outside = protocol violation | HALT -- Edit to fit range |
| "I'll load specimens after I draft" | Specimens BEFORE generation, never after | HALT -- Load specimens first |

---

## STRUCTURAL FIX 4: E1-SPECIFIC MC-CHECK

```yaml
EMAIL-WRITER-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [0 | 1 | 2 | 2.5 | 3]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP -- Cannot proceed without checkpoint file"

  body_type_compliance:
    assigned_body_type: "[CT|QO|TM|QA|LB|ST|NR]"
    template_loaded_for_type: [Y/N]
    structural_elements_present: [Y/N]
    if_any_no: "STOP -- Load correct body type template"

  specimen_verification:
    structural_specimens_loaded: [Y/N]
    loaded_verbatim: [Y/N]
    body_type_matched: [Y/N]
    persona_voice_specimens_loaded: [Y/N]
    if_any_no: "STOP -- Load type-matched specimens verbatim"

  ratio_check:
    content_word_count: [number]
    pitch_word_count: [number]
    content_percent: [number]
    pitch_percent: [number]
    ratio_compliant: [Y/N]
    if_no: "STOP -- Content must be 70-80%, pitch 20-30%"

  bridge_quality:
    bridge_section_exists: [Y/N]
    transition_feels_natural: [Y/N]
    bridge_uses_specimen_pattern: [Y/N]
    if_any_no: "STOP -- Bridge section is mandatory and must be smooth"

  word_count_check:
    target_word_count: [number]
    actual_word_count: [number]
    within_20_percent: [Y/N]
    if_no: "STOP -- Edit to fit word count range"

  arena_verification:
    competitors_completed: [number]
    if_under_7: "STOP -- All 7 Arena competitors must generate"
    rounds_completed: [number]
    if_under_2: "STOP -- All 2 Arena rounds + audience evaluation must complete"

  human_selection_verification:
    at_layer_3: [Y/N]
    selection_received: [Y/N]
    if_at_layer_3_and_no_selection: "STOP -- Human selection is BLOCKING"

  rationalization_check:
    am_i_skipping_specimens: [Y/N]
    am_i_changing_body_type: [Y/N]
    am_i_exceeding_pitch_ratio: [Y/N]
    am_i_skipping_bridge: [Y/N]
    am_i_batch_generating: [Y/N]
    if_any_yes: "HALT -- Rationalization detected"

  result: [CONTINUE | HALT_SPECIMENS | HALT_RATIO | HALT_BRIDGE | HALT_ARENA | HALT_SELECTION | HALT_WORD_COUNT]
```

---

## STRUCTURAL FIX 5: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which emails were completed and which body types were assigned is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/E1-email-writer/
  PROJECT-STATE.md          # Living document -- updated after every email
  PROGRESS-LOG.md           # Append-only timeline of all actions
  checkpoints/              # Gate checkpoint files
  execution-log.md          # Detailed execution record
  layer-0-outputs/          # Per-microskill output files
  layer-1-outputs/
  layer-2-outputs/
  layer-3-outputs/
  arena/                    # Arena results per email
  email-drafts/             # Final email drafts (post-selection)
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "E1-email-writer"
created: "[date]"
last_updated: "[date]"
current_email_position: "[email-01, email-02, etc.]"
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
mode: "[A (full pipeline) | B (brief-only)]"
inputs_validated:
  campaign_blueprint: [Y/N]
  body_type_assigned: [Y/N]
  structural_specimens_loaded: [Y/N]
  persona_voice_specimens_loaded: [Y/N]
emails_completed:
  - position: "email-01"
    body_type: "CT"
    status: "COMPLETE"
    quality_score: 8.2
  - position: "email-02"
    body_type: "ST"
    status: "IN_PROGRESS"
    current_layer: 2
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

VALID DECISION STATUSES (validation layer):
  approved
  revision (return to previous layer)
  blocked (return to earlier layer)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  approved_with_concerns / conditional_approval
  PROCEED_WITH_CONCERNS / WARNING
  "good enough" / "acceptable for now"
  "ratio is close enough" / "word count is approximately right"

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

BEFORE writing email draft or package files:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/email-draft-[position].md (root -- from failed attempts)
     - [project]/E1-email-writer/email-drafts/email-[position].md (correct location)
     - [project]/outputs/email-[position].md (wrong path)
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

**Session startup protocol -- BEFORE any email writing execution:**

```
SESSION STARTUP:
  1. READ this file (EMAIL-WRITER-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ EMAIL-WRITER-AGENT.md -- agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin email generation without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Reference:** ~system/SYSTEM-CORE.md MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-specimen-loader | layer-0-outputs/0.2-specimen-loader.md | 2KB |
| 0 | 0.2.7-persona-voice-loader | layer-0-outputs/0.2.7-persona-voice-loader.md | 2KB |
| 0 | 0.3-input-validator | layer-0-outputs/0.3-input-validator.md | 1KB |
| 1 | 1.1-body-type-router | layer-1-outputs/1.1-body-type-router.md | 2KB |
| 1 | 1.2-structural-template | layer-1-outputs/1.2-structural-template.md | 3KB |
| 1 | 1.3-content-source-mapper | layer-1-outputs/1.3-content-source-mapper.md | 3KB |
| 2 | 2.1-opening-generator | layer-2-outputs/2.1-opening-generator.md | 2KB |
| 2 | 2.2-body-generator | layer-2-outputs/2.2-body-generator.md | 5KB |
| 2 | 2.3-bridge-generator | layer-2-outputs/2.3-bridge-generator.md | 2KB |
| 2 | 2.4-cta-generator | layer-2-outputs/2.4-cta-generator.md | 2KB |
| 3 | 3.1-email-validator | layer-3-outputs/3.1-email-validator.md | 3KB |
| 3 | 3.2-output-packager | layer-3-outputs/3.2-output-packager.md | 5KB |

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
[ ] EMAIL-WRITER-ANTI-DEGRADATION.md read (THIS FILE)
[ ] EMAIL-WRITER-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 7)
[ ] Input files validated (campaign-blueprint.yaml, upstream packages or brief)

LAYER 0 (LOADING):
[ ] Campaign blueprint loaded from E0
[ ] Current email position identified
[ ] Body type determined from blueprint
[ ] Ben Settle structural specimens loaded VERBATIM for body type
[ ] Persona voice specimens loaded for Arena
[ ] All inputs validated
[ ] LAYER_0_COMPLETE.yaml created

LAYER 1 (ARCHITECTURE):
[ ] Body type routed to correct template
[ ] Structural template loaded for body type
[ ] Content mapped to template slots
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (GENERATION):
[ ] Type-matched specimens in active context
[ ] Opening generated (3 lines max)
[ ] Body generated (70-80% content section)
[ ] Bridge generated (smooth content-to-pitch transition)
[ ] CTA generated (matching assigned pattern)
[ ] Word count verified within range
[ ] Content-to-pitch ratio verified (70-80/20-30)
[ ] LAYER_2_COMPLETE.yaml created

LAYER 2.5 (ARENA -- MANDATORY, CANNOT BE SKIPPED):
[ ] All 7 competitors generated across 2 rounds + audience evaluation
[ ] Adversarial critique completed each round
[ ] Targeted revision completed each round
[ ] Post-Arena Synthesis: 2-3 hybrids created
[ ] 9-10 candidates presented to human
[ ] Human selection received (BLOCKING)
[ ] ARENA_COMPLETE.yaml created

LAYER 3 (VALIDATION & OUTPUT):
[ ] Selected email scored against 9-criterion rubric
[ ] Weighted score >= 7.5
[ ] All structural checks pass
[ ] Output packaged for E2 (subject lines) and E3 (assembly)
[ ] LAYER_3_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated with email completion
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY specimens were loaded (check execution log)
[ ] VERIFY body type matches blueprint assignment
[ ] VERIFY content-to-pitch ratio from actual draft
[ ] VERIFY human selection exists (ARENA_COMPLETE.yaml)
[ ] If specimens skipped, RETURN to Layer 0
```

---

## KEY INSIGHT

> **"Emails without structural specimen injection default to generic marketing copy. Emails without strict ratio enforcement become sales pitches that destroy subscriber trust. Emails without Arena validation lack the competitive quality that keeps readers opening."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-21 | Initial creation with 8 structural fixes, per-microskill output table (13 microskills), implementation checklist. Full E1 anti-degradation architecture. |

---

## FAILURE MODE TABLE

| Failure Mode | Detection Signal | Automated Response | Human Escalation Threshold |
|-------------|-----------------|-------------------|---------------------------|
| Body type structural violation | Email doesn't follow assigned body type structure | HALT — restructure to match body type | After 2 restructure attempts |
| Content ratio violation | Content < 70% or pitch > 30% | HALT — rebalance content/pitch ratio | If product requires more pitch |
| Missing specimen loading | Execution log shows no specimen injection | HALT — load specimens, regenerate | Immediately |
| Arena shortfall | Fewer than 2 rounds + audience evaluation or < 7 competitors | HALT — complete Arena protocol | Immediately |
| Voice contamination | Email voice inconsistent with Soul.md | HALT — revise for voice alignment | After 2 revision attempts |
