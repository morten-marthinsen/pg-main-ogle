# SUBJECT-LINE-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-21
**Purpose:** STRUCTURAL enforcement to prevent subject line skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: SUBJECT-LINE-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Generate subject lines before the email body is written, skip SL-body alignment checks, or accept clickbait language or fewer than 20 candidates.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates subject lines BEFORE email body is written (reversed dependency)
- AI produces SLs that don't match email content (alignment failure)
- AI generates fewer than 20 candidates
- AI uses same formula category repeatedly across a sequence
- AI produces SLs over 10 words
- AI skips the Arena or runs fewer than 2 rounds + audience evaluation
- AI selects SLs without human approval
- AI uses clickbait or AI-telltale language

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/E2-subject-line-engine/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/E2-subject-line-engine/checkpoints/LAYER_1_COMPLETE.yaml
```

**Arena Layer (2.5) CANNOT execute unless this file exists:**
```
[project]/E2-subject-line-engine/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/E2-subject-line-engine/checkpoints/LAYER_2_COMPLETE.yaml
[project]/E2-subject-line-engine/checkpoints/ARENA_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "E2-subject-line-engine"
status: COMPLETE
timestamp: "[ISO 8601]"
email_id: "[identifier of the email being titled]"

verification:
  email_body_loaded:
    required: true
    loaded_verbatim: true
    body_type: "[CT|QO|TM|QA|LB|ST|NR]"
  formula_categories_available:
    required: 18
    actual: [number]
  candidates_generated:
    required: 20
    actual: [number]
  formula_categories_used:
    required: 5
    actual: [number]
  sl_body_alignment:
    minimum: 7.0
    all_above_minimum: true
  word_count_compliance:
    over_10_words: [number]
    sweet_spot_6_7: [number]

completeness:
  all_microskills_executed: true
  minimum_thresholds_met: true
  quality_gates_passed: true

microskill_outputs:
  - id: "[microskill id]"
    file: "[relative path to output file]"
    size_bytes: [integer]
    minimum_met: true
```

---

## STRUCTURAL FIX 2: EMAIL BODY DEPENDENCY (CRITICAL)

### The Problem
AI generates subject lines before the email body exists, creating SLs that don't match written content.

### The Fix

**E2 CANNOT execute unless the E1 email draft exists:**
```
[project]/E1-email-writer/[email-id]/email-draft.md
  OR
[project]/E1-email-writer/[email-id]/ARENA_COMPLETE.yaml
```

**Validation at Layer 0:**
```yaml
email_body_dependency:
  email_draft_exists: [Y/N]
  email_draft_path: "[path]"
  email_draft_word_count: [number]
  email_body_type: "[type code]"
  email_arena_selected: [Y/N]

  IF email_draft_exists == N:
    HALT -- "E1 must complete this email before E2 can generate subject lines."
    CANNOT: Generate any SL candidates
    CANNOT: Execute Layer 1 (formula selection)
    MUST: Return to E1 for this email position
```

**SL-BODY ALIGNMENT CHECK (Every candidate):**
```yaml
sl_body_alignment:
  sl_text: "[subject line text]"
  implicit_promise: "[what the SL implies the email contains]"
  email_delivers: [Y/N]
  alignment_score: [1-10]

  IF alignment_score < 7.0:
    REJECT -- "SL does not match email content"
    CANNOT: Include in candidate pool
    MUST: Generate replacement
```

---

## STRUCTURAL FIX 3: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Email body loaded** | Verbatim from E1 | HALT -- Load email body |
| **Formula categories available** | 18/18 | HALT -- Load formula library |
| **Candidates generated** | 20 | HALT -- Generate more |
| **Formula categories used** | 5 per email | HALT -- Diversify categories |
| **SL-body alignment** | 7.0 per candidate | REJECT candidate |
| **Top SL score** | 8.0 weighted | HALT -- Refine candidates |
| **Word count** | Max 10 words | FLAG for review |
| **Human selection** | BLOCKING | HALT -- Cannot package without |
| **Arena rounds** | 2 + audience evaluation | HALT -- All 2 rounds + audience evaluation required |
| **Arena competitors** | 7 | HALT -- All 7 must generate |

### Word Count Protocol

```yaml
word_count_protocol:
  sweet_spot: "6-7 words"
  acceptable: "3-10 words"
  flagged: "> 10 words"
  action_if_flagged: "Trim or replace -- never submit over-length SLs"

  tracking:
    candidates_in_sweet_spot: [number]
    candidates_over_10: [number]
    percentage_in_sweet_spot: [%]

  IF percentage_in_sweet_spot < 40%:
    WARN -- "Too few candidates in sweet spot. Regenerate with word count awareness."
```

---

## STRUCTURAL FIX 4: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "SL can be written before email body" | SL must match WRITTEN content | HALT -- Complete E1 first |
| "alignment is implied" | Every candidate needs explicit alignment check | HALT -- Run alignment check |
| "10 candidates is enough" | Minimum 20 required | HALT -- Generate more |
| "3 formula categories is sufficient" | Minimum 5 per email | HALT -- Diversify |
| "Arena is optional for SLs" | Arena is MANDATORY per ~system/SYSTEM-CORE.md | HALT -- Execute Arena |
| "7.5 is good enough for top score" | 8.0 is the minimum for SLs | HALT -- Refine |
| "I can infer human preference" | Human selection is BLOCKING | HALT -- Get selection |
| "word count doesn't matter" | 6-7 words is data-driven sweet spot | FLAG and review |
| "SLs are just short headlines" | SLs are a distinct craft with different rules | HALT -- Use SL-specific criteria |
| "this clickbait SL would work" | Trust destruction outweighs open rate | REJECT immediately |

---

## STRUCTURAL FIX 5: BATCH MODE DIVERSITY ENFORCEMENT

### The Problem
When generating SLs for multiple emails in batch mode, AI defaults to the same high-performing formula categories repeatedly, creating monotonous sequences.

### The Fix

**Batch Mode Diversity Tracking:**
```yaml
batch_diversity:
  emails_in_batch: [number]
  formula_categories_used:
    email_1: ["SL-THE", "SL-HOW", "SL-CUR"]
    email_2: ["SL-WHY", "SL-CON", "SL-CMD"]
    email_3: ["SL-THE", "SL-HOW", "SL-NUM"]

  consecutive_same_category: [number]
  IF consecutive_same_category >= 3:
    HALT -- "Same formula category used 3+ times consecutively. Diversify."

  categories_per_5_email_window: [number]
  IF categories_per_5_email_window < 3:
    HALT -- "Fewer than 3 different categories in 5-email window. Diversify."
```

---

## STRUCTURAL FIX 6: SL-SPECIFIC MC-CHECK

```yaml
SL-MC-CHECK:
  timestamp: "[current time]"
  email_id: "[which email is being titled]"

  dependency_verification:
    email_body_loaded: [Y/N]
    email_body_from_E1: [Y/N]
    if_any_no: "STOP -- Cannot generate SLs without E1 email body"

  generation_verification:
    candidates_generated: [number]
    if_under_20: "STOP -- Need 20+ candidates"
    formula_categories_used: [number]
    if_under_5: "STOP -- Need 5+ formula categories"

  alignment_verification:
    all_candidates_checked: [Y/N]
    any_below_7: [Y/N]
    if_below_7_not_rejected: "STOP -- Reject misaligned candidates"

  word_count_verification:
    candidates_over_10_words: [number]
    if_over_10_not_flagged: "STOP -- Flag over-length candidates"

  arena_verification:
    rounds_completed: [number]
    if_under_2: "STOP -- All 2 Arena rounds + audience evaluation required"
    competitors_completed: [number]
    if_under_7: "STOP -- All 7 competitors must generate"

  human_selection_verification:
    at_packaging_stage: [Y/N]
    selection_received: [Y/N]
    if_at_packaging_and_no_selection: "STOP -- Human selection is BLOCKING"

  quality_verification:
    top_score: [number]
    if_under_8: "STOP -- Top candidate must score >= 8.0"

  rationalization_check:
    am_i_generating_before_email_body: [Y/N]
    am_i_skipping_alignment_check: [Y/N]
    am_i_accepting_low_scores: [Y/N]
    am_i_using_clickbait: [Y/N]
    if_any_yes: "HALT -- Rationalization detected"

  result: [CONTINUE | HALT_DEPENDENCY | HALT_GENERATION | HALT_ALIGNMENT | HALT_ARENA | HALT_SELECTION]
```

---

## STRUCTURAL FIX 7: MANDATORY PROJECT INFRASTRUCTURE

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/E2-subject-line-engine/
  [email-id]/                       # Per-email subdirectory
    PROJECT-STATE.md                # Living document -- updated after every layer
    PROGRESS-LOG.md                 # Append-only timeline of all actions
    checkpoints/                    # Gate checkpoint files
    layer-0-outputs/                # Per-microskill output files
    layer-1-outputs/
    layer-2-outputs/
    layer-3-outputs/
    arena/
      ARENA-RESULTS.md
    execution-log.md                # Detailed execution record
    subject-line-package.yaml       # PRIMARY OUTPUT
    SUBJECT-LINE-SUMMARY.md         # Human-readable handoff
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "E2-subject-line-engine"
email_id: "[identifier]"
created: "[date]"
last_updated: "[date]"
current_layer: [0-3]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
inputs_validated:
  email_body_loaded: [Y/N]
  formula_library_loaded: [Y/N]
  niche_identified: [Y/N]
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 8: BINARY GATE ENFORCEMENT (FORBIDDEN STATUSES)

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

## STRUCTURAL FIX 9: STALE ARTIFACT CLEANUP

**Before writing ANY replacement output file, VERIFY and DELETE stale artifacts:**

```
STALE ARTIFACT PROTOCOL:

BEFORE writing subject-line-package.yaml or SUBJECT-LINE-SUMMARY.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/subject-line-package.yaml (root -- from failed attempts)
     - [project]/E2-subject-line-engine/subject-line-package.yaml (correct)
     - [project]/outputs/subject-line-package.yaml (wrong path)
  2. IF stale file exists at wrong location:
     - DELETE it
     - LOG deletion in PROGRESS-LOG.md
  3. ONLY THEN write the new output files

AFTER any FAILED attempt:
  1. DELETE all output artifacts from the failed attempt
  2. LOG the failure and cleanup in PROGRESS-LOG.md
```

---

## STRUCTURAL FIX 10: ANTI-DEGRADATION MANDATORY READ

**Session startup protocol -- BEFORE any SL execution:**

```
SESSION STARTUP:
  1. READ this file (SUBJECT-LINE-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ SUBJECT-LINE-AGENT.md -- agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. VERIFY E1 email body exists for the target email
  7. ONLY THEN begin execution

NEVER begin SL execution without reading this anti-degradation file first.
```

---

## STRUCTURAL FIX 11: ARENA LAYER MANDATORY ENFORCEMENT

### The Problem
Arena Layer (2.5) can be skipped during execution -- AI goes directly from Layer 2 to Layer 3, bypassing the 7-competitor, 2-round + audience evaluation competition.

### The Fix

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/E2-subject-line-engine/[email-id]/checkpoints/ARENA_COMPLETE.yaml
```

This file is created ONLY after:
1. All 7 competitors have generated across 2 rounds + audience evaluation
2. Adversarial critique completed each round
3. Targeted revision completed each round
4. All candidates scored against 7 SL-specific criteria
5. Post-arena synthesis complete
6. Human selection received (BLOCKING)

### Checkpoint Progression

```
LAYER_0_COMPLETE.yaml --> LAYER_1_COMPLETE.yaml --> LAYER_2_COMPLETE.yaml --> ARENA_COMPLETE.yaml --> LAYER_3_COMPLETE.yaml
```

**ARENA_COMPLETE.yaml sits between LAYER_2 and LAYER_3. Layer 3 is BLOCKED without it.**

### Forbidden Rationalizations (Arena-Specific)

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "Arena is optional for SLs" | Arena is MANDATORY per ~system/SYSTEM-CORE.md | HALT -- Execute Arena |
| "SLs are too short for Arena" | Short outputs still benefit from multi-perspective | HALT -- Execute Arena |
| "Context is too large for Arena" | Request session break, do NOT skip Arena | HALT -- Session break, then Arena |
| "I'll note Arena was skipped" | Noting a skip does not excuse the skip | HALT -- Execute Arena |
| "One round is sufficient for SLs" | 2 rounds + audience evaluation DEFAULT. No exceptions. | HALT -- Complete all 2 rounds + audience evaluation |

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 7, 10):
[ ] SUBJECT-LINE-ANTI-DEGRADATION.md read (THIS FILE)
[ ] SUBJECT-LINE-AGENT.md read
[ ] E1 email draft verified to exist for target email
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 9)

LAYER 0 (LOADING):
[ ] Email body loaded VERBATIM from E1 output (0.1)
[ ] Email metadata extracted (body type, content focus, emotional register)
[ ] Formula library loaded (all 18 categories) (0.2)
[ ] All inputs validated (0.3)
[ ] LAYER_0_COMPLETE.yaml created

LAYER 1 (FORMULA SELECTION):
[ ] Emotional triggers identified from email content (1.1)
[ ] 5-8 formula categories selected with rationale (1.2)
[ ] Niche calibration applied (1.3)
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (GENERATION):
[ ] 20-50 candidates generated across selected formulas (2.1)
[ ] Top 10 expanded into 2-3 variants each (2.2)
[ ] All candidates checked for SL-body alignment (>= 7.0)
[ ] All candidates checked for word count (<= 10)
[ ] LAYER_2_COMPLETE.yaml created

LAYER 2.5 (ARENA -- MANDATORY, CANNOT BE SKIPPED):
[ ] All 7 competitors generated across 2 rounds + audience evaluation
[ ] Each competitor produced 5 SLs per round
[ ] Adversarial critique completed each round
[ ] Targeted revision completed each round
[ ] Post-Arena synthesis complete
[ ] Human selection received (BLOCKING)
[ ] ARENA_COMPLETE.yaml created

LAYER 3 (RANKING + OUTPUT):
[ ] All finalists scored against 7 SL-specific criteria (3.1)
[ ] Top 5-10 SLs ranked with scores (3.1)
[ ] SL-body alignment re-verified for all finalists
[ ] subject-line-package.yaml created (3.2)
[ ] SUBJECT-LINE-SUMMARY.md created (3.2)
[ ] LAYER_3_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY email body was loaded (check execution log)
[ ] VERIFY candidate counts from actual output
[ ] VERIFY human selection exists
[ ] If email body skipped, RETURN to Layer 0
```

---

## Per-Microskill Output Protocol (v3.2)

**Reference:** ~system/SYSTEM-CORE.md MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-email-context-loader | layer-0-outputs/0.1-email-context-loader.md | 1KB |
| 0 | 0.2-formula-library-loader | layer-0-outputs/0.2-formula-library-loader.md | 1KB |
| 0 | 0.3-input-validator | layer-0-outputs/0.3-input-validator.md | 1KB |
| 1 | 1.1-emotional-trigger-selector | layer-1-outputs/1.1-emotional-trigger-selector.md | 2KB |
| 1 | 1.2-formula-matcher | layer-1-outputs/1.2-formula-matcher.md | 3KB |
| 1 | 1.3-niche-calibrator | layer-1-outputs/1.3-niche-calibrator.md | 2KB |
| 2 | 2.1-volume-generator | layer-2-outputs/2.1-volume-generator.md | 5KB |
| 2 | 2.2-variation-expander | layer-2-outputs/2.2-variation-expander.md | 3KB |
| 3 | 3.1-sl-ranker | layer-3-outputs/3.1-sl-ranker.md | 5KB |
| 3 | 3.2-output-packager | layer-3-outputs/3.2-output-packager.md | 3KB |

### Layer Gate Enhancement

Each LAYER_N_COMPLETE.yaml checkpoint MUST list all microskill output files with sizes. If ANY output file is missing, the checkpoint CANNOT be created.

### Forbidden Behaviors

1. Executing microskills without reading their .md spec files
2. Producing summary output without per-microskill files
3. Checkpoint YAML without microskill output file listing
4. Output files below minimum size thresholds
5. Output files missing required section headers from spec

---

## KEY INSIGHT

> **"Subject lines written before the email body are fiction. Subject lines written after are promises. Only promises build trust."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-02-25 | Added Per-Microskill Output Protocol (v3.2) with 10-microskill output table matching AGENT.md, layer gate enhancement, forbidden behaviors |
| 1.0 | 2026-02-21 | Initial creation -- full structural enforcement with 11 fixes: checkpoint files, email body dependency, minimum thresholds, forbidden rationalizations, batch diversity, SL-specific MC-CHECK, project infrastructure, binary gates, stale cleanup, mandatory read, Arena enforcement |

---

## FAILURE MODE TABLE

| Failure Mode | Detection Signal | Automated Response | Human Escalation Threshold |
|-------------|-----------------|-------------------|---------------------------|
| Score below minimum | Best candidate < 8.0 weighted score | HALT — generate additional candidates | After 3 generation rounds |
| SL-body misalignment | SL-body alignment score < 7.0 | HALT — revise SL for body alignment | After 2 revision rounds |
| Word count outside sweet spot | SL not 6-7 words | Flag — acceptable if score ≥ 8.5 | Never (flag only, not blocking) |
| Insufficient candidates | Fewer than 20 candidates before selection | HALT — continue generation | After 3 generation rounds |
| SL written before body | SL generation attempted without email body | HALT — complete email body first | Immediately |
