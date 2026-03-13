# CAMPAIGN-BRIEF-ANTI-DEGRADATION.md

**Version:** 2.0
**Created:** 2026-02-05
**Updated:** 2026-02-14
**Purpose:** STRUCTURAL enforcement to prevent campaign brief skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: CAMPAIGN-BRIEF-ANTI-DEGRADATION.md v2.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Work from summaries instead of loading actual upstream packages, leave threading elements undocumented, or produce a brief with placeholder text.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI produces brief without loading all upstream packages (7 required)
- AI skips synthesis of key decisions into unified document
- AI produces brief without voice/tone direction
- AI skips threading element documentation
- AI produces incomplete handoff for narrative skills

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Upstream Loading Requirements

**Campaign Brief CANNOT execute unless ALL 7 upstream packages exist:**

```
[project]/01-research/FINAL_HANDOFF.md
[project]/02-proof-inventory/proof-inventory-output.json
[project]/03-root-cause/root-cause-package.yaml
[project]/04-mechanism/mechanism-package.json
[project]/05-promise/promise-package.json
[project]/06-big-idea/big-idea-package.json
[project]/07-offer/offer-package.json
```

### Checkpoint File Format

```yaml
# CAMPAIGN_BRIEF_COMPLETE.yaml
skill: "09-campaign-brief"
status: COMPLETE
timestamp: "[ISO 8601]"

upstream_verification:
  research_loaded: true
  proof_inventory_loaded: true
  root_cause_loaded: true
  mechanism_loaded: true
  promise_loaded: true
  big_idea_loaded: true
  offer_loaded: true
  all_7_packages: true

brief_components:
  core_thesis_documented: true
  voice_tone_defined: true
  threading_elements_listed: true
  narrative_sequence_specified: true

completeness:
  all_sections_populated: true
  no_placeholder_text: true
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Upstream packages loaded** | 7/7 | HALT — Load all packages |
| **Threading elements documented** | All required | HALT — Document threading |
| **Voice/tone direction** | Specified | HALT — Define voice |
| **Narrative sequence** | Defined | HALT — Specify sequence |
| **Key decisions synthesized** | All major | HALT — Complete synthesis |

### Required Brief Sections

Every Campaign Brief MUST contain:

| Section | Content Required |
|---------|-----------------|
| Campaign Thesis | The central argument synthesized |
| Target Avatar | From research, crystallized |
| Root Cause Anchor | Phrase to repeat throughout |
| Mechanism Name | Exact name to use |
| Primary Promise | Exact promise language |
| Big Idea Expression | How it manifests in copy |
| Offer Summary | Core offer + bonuses |
| Voice/Tone Direction | Specific guidance |
| Threading Elements | What repeats throughout |
| Narrative Sequence | Order of story → RC → Mech → etc. |

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "I can work from summaries" | Must load ACTUAL packages | HALT — Load packages |
| "voice will emerge" | Voice must be DEFINED upfront | HALT — Define voice |
| "threading is obvious" | Threading must be DOCUMENTED | HALT — Document threading |
| "narrative writers know the sequence" | Sequence must be SPECIFIED | HALT — Specify sequence |
| "6 packages is enough" | All 7 required | HALT — Load missing package |

---

## STRUCTURAL FIX 4: THREADING DOCUMENTATION GATE

### Mandatory Threading Elements

```yaml
threading_elements:
  mechanism_name:
    exact_text: "[mechanism name]"
    minimum_occurrences_in_copy: 8
    sections_where_required: [lead, story, mechanism, product, close]

  root_cause_anchor:
    exact_text: "[anchor phrase]"
    minimum_occurrences_in_copy: 5
    sections_where_required: [lead, root_cause, mechanism, close]

  framework_name:
    exact_text: "[system/method name if any]"
    minimum_occurrences_in_copy: 4

  primary_promise:
    exact_text: "[promise language]"
    variations_allowed: [list acceptable variations]
    minimum_occurrences_in_copy: 6

  IF any_element_undefined:
    HALT — "All threading elements must be documented"
```

---

## STRUCTURAL FIX 5: CAMPAIGN-BRIEF-SPECIFIC MC-CHECK

```yaml
BRIEF-MC-CHECK:
  timestamp: "[current time]"

  upstream_verification:
    packages_loaded: [number]
    if_under_7: "STOP — All 7 upstream packages required"

  content_verification:
    thesis_documented: [Y/N]
    voice_defined: [Y/N]
    threading_documented: [Y/N]
    sequence_specified: [Y/N]
    if_any_no: "STOP — Complete all required sections"

  placeholder_check:
    contains_TBD: [Y/N]
    contains_placeholder: [Y/N]
    if_any_yes: "STOP — No placeholder text allowed"

  result: [CONTINUE | HALT_UPSTREAM | HALT_CONTENT | HALT_PLACEHOLDER]
```

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 6, 9):
[ ] CAMPAIGN-BRIEF-ANTI-DEGRADATION.md read (THIS FILE)
[ ] CAMPAIGN-BRIEF-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 8)
[ ] Input files validated (research, proof, root-cause, mechanism, promise, big-idea, offer)

LOADING:
[ ] Research FINAL_HANDOFF.md loaded
[ ] Proof inventory loaded
[ ] Root cause package loaded
[ ] Mechanism package loaded
[ ] Promise package loaded
[ ] Big idea package loaded
[ ] Offer package loaded
[ ] All 7 packages verified

SYNTHESIS:
[ ] Campaign thesis synthesized from all inputs
[ ] Target avatar crystallized
[ ] Key decisions documented
[ ] Voice/tone direction specified
[ ] Threading elements listed with exact text
[ ] Narrative sequence defined
[ ] No placeholder text anywhere

OUTPUT:
[ ] Campaign brief document created
[ ] All sections populated
[ ] CAMPAIGN_BRIEF_COMPLETE.yaml created
[ ] Handoff ready for narrative skills

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes
```

---

## STRUCTURAL FIX 6: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which layers completed and what candidates were selected is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/09-campaign-brief/
├── PROJECT-STATE.md          # Living document — updated after every layer
├── PROGRESS-LOG.md           # Append-only timeline of all actions
├── checkpoints/              # Gate checkpoint files
├── execution-log.md          # Detailed execution record
├── campaign-brief.json       # PRIMARY OUTPUT
└── CAMPAIGN-BRIEF-SUMMARY.md # Human-readable handoff
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "09-campaign-brief"
created: "[date]"
last_updated: "[date]"
current_layer: [0-4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
inputs_validated:
  research_handoff: "[Y/N]"
  proof_inventory: "[Y/N]"
  root_cause_package: "[Y/N]"
  mechanism_package: "[Y/N]"
  promise_package: "[Y/N]"
  big_idea_package: "[Y/N]"
  offer_package: "[Y/N]"
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 7: BINARY GATE ENFORCEMENT (FORBIDDEN STATUSES)

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

## STRUCTURAL FIX 8: STALE ARTIFACT CLEANUP

### The Fix

**Before writing ANY replacement output file, VERIFY and DELETE stale artifacts:**

```
STALE ARTIFACT PROTOCOL:

BEFORE writing campaign-brief.json or CAMPAIGN-BRIEF-SUMMARY.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/campaign-brief.json (root — from failed attempts)
     - [project]/09-campaign-brief/campaign-brief.json (correct location)
     - [project]/outputs/campaign-brief.json (wrong path)
  2. IF stale file exists at wrong location:
     - DELETE it
     - LOG deletion in PROGRESS-LOG.md
  3. ONLY THEN write the new output files

AFTER any FAILED attempt:
  1. DELETE all output artifacts from the failed attempt
  2. LOG the failure and cleanup in PROGRESS-LOG.md
```

---

## STRUCTURAL FIX 9: ANTI-DEGRADATION MANDATORY READ

### The Fix

**Session startup protocol — BEFORE any Campaign Brief execution:**

```
SESSION STARTUP:
  1. READ this file (CAMPAIGN-BRIEF-ANTI-DEGRADATION.md) — MANDATORY
  2. READ CAMPAIGN-BRIEF-AGENT.md — agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin Campaign Brief execution without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Added:** 2026-02-12
**Reference:** ~system/SYSTEM-CORE.md § MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Single-Pass Assembly Note

Skill 09 (Campaign Brief) operates as a **single-pass assembly** skill without a dedicated `skills/` subdirectory of individual microskill spec files. It loads 7 upstream packages and synthesizes them into a unified campaign brief document.

Because there are no individual microskill .md specs, the per-microskill output protocol applies at the **section level** — each required brief section must be verifiably present and populated in the output. The equivalent enforcement is:

| Section | Required Output Verification | Min Content |
|---------|------------------------------|-------------|
| Campaign Thesis | Synthesized central argument present | 200 words min |
| Target Avatar | Research-derived avatar crystallized | 150 words min |
| Root Cause Anchor | Exact phrase documented with occurrence targets | 50 words min |
| Mechanism Name | Exact name with usage guidance | 50 words min |
| Primary Promise | Exact promise language with acceptable variations | 100 words min |
| Big Idea Expression | How big idea manifests in copy | 150 words min |
| Offer Summary | Core offer + bonuses summarized | 200 words min |
| Voice/Tone Direction | Specific guidance for narrative skills | 150 words min |
| Threading Elements | All elements with exact text and minimum counts | 200 words min |
| Narrative Sequence | Order of sections with transition guidance | 100 words min |

### Layer Gate Enhancement

The CAMPAIGN_BRIEF_COMPLETE.yaml checkpoint MUST verify all 10 sections are populated with content meeting minimum word counts. If ANY section is missing or below minimum, the checkpoint CANNOT be created.

### Execution Log Enhancement

The execution log MUST include:
- Upstream packages loaded: [7/7] with file paths
- Each section populated: [Y/N] with word count
- Placeholder text scan: [PASS/FAIL]
- Threading elements documented: [Y/N] with exact text

### Forbidden Behaviors

1. ❌ Executing brief assembly without loading all 7 upstream packages
2. ❌ Producing brief with placeholder/TBD text in any section
3. ❌ Checkpoint YAML without section-level verification
4. ❌ Sections below minimum word count thresholds
5. ❌ Threading elements without exact text and occurrence targets

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | 2026-02-14 | STRUCTURAL ENFORCEMENT PROPAGATION: Added 4 structural fixes from Skills 01-04 propagation pattern. Fix 6: Mandatory project infrastructure (PROJECT-STATE.md + PROGRESS-LOG.md). Fix 7: Binary gate enforcement with forbidden statuses. Fix 8: Stale artifact cleanup. Fix 9: Anti-degradation mandatory read at session startup. Implementation checklist expanded with PRE-EXECUTION and POST-EXECUTION sections. |
| 1.1 | 2026-02-12 | PER-MICROSKILL OUTPUT PROTOCOL (v3.2): Added section-level output verification for single-pass assembly skill. 10 required sections with minimum word counts. Enhanced checkpoint and execution log requirements. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |
