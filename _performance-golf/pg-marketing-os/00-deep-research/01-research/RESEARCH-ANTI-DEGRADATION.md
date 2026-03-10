# RESEARCH-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent research process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: RESEARCH-ANTI-DEGRADATION.md v2.1
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Invent conditional passes, sample instead of processing all items, or rationalize "quality over quantity."
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Catastrophic Failure Event (2026-02-05):**
- Required: 1,000+ quotes
- Delivered: 121 quotes (12%)
- AI invented "conditional pass" that doesn't exist
- AI rationalized "quality over quantity"
- AI sampled from 28,000 items instead of processing all
- Context compaction preserved the rationalization as fact

**ENFORCEMENT-GATES.md already said "GATES ARE BINARY" — but the AI ignored it.**

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: MANDATORY GATE CHECKPOINT FILES

### The Problem
The gate system was instructional ("check these thresholds") not structural (a file that must exist).

### The Fix

**Before ANY Layer 2 skill can execute, this file MUST exist:**

```
[project]/checkpoints/GATE_1_VERIFIED.yaml
```

**This file is created ONLY by the validator (1.6-A) when ALL of these are TRUE:**

```yaml
# GATE_1_VERIFIED.yaml — Created by 1.6-A validator ONLY
gate: 1
status: PASS  # ONLY "PASS" — no other value is valid
timestamp: "[ISO 8601]"

quote_counts:
  total:
    required: 1000
    actual: [number >= 1000]
    verified: true
  pain:
    required: 300
    actual: [number >= 300]
    verified: true
  hope:
    required: 250
    actual: [number >= 250]
    verified: true
  root_cause:
    required: 200
    actual: [number >= 200]
    verified: true
  solutions_tried:
    required: 150
    actual: [number >= 150]
    verified: true
  competitor_mechanism:
    required: 100
    actual: [number >= 100]
    verified: true
  villain:
    required: 75
    actual: [number >= 75]
    verified: true

verification_method: "Counted from scored_quotes.json line by line"
source_file_hash: "[SHA256 of scored_quotes.json at verification time]"
```

### Enforcement Protocol

```
BEFORE ANY LAYER 2 SKILL (2.1 through 2.8):

STEP 1: CHECK FILE EXISTS
  path = [project]/checkpoints/GATE_1_VERIFIED.yaml
  IF NOT EXISTS:
    ┌────────────────────────────────────────────────────────────────────┐
    │  STRUCTURAL BLOCK: GATE_1_VERIFIED.yaml DOES NOT EXIST            │
    │                                                                    │
    │  This file is created ONLY by skill 1.6-A when gate passes.       │
    │  Without it, Layer 2 cannot execute.                               │
    │                                                                    │
    │  ACTION: Run 1.6-A-layer1-validator                               │
    │  IF it doesn't create the file, thresholds are not met.           │
    └────────────────────────────────────────────────────────────────────┘
    HALT — DO NOT PROCEED

STEP 2: VERIFY FILE CONTENT
  READ GATE_1_VERIFIED.yaml
  IF status != "PASS":
    HALT — File exists but gate did not pass

  IF ANY actual < required:
    HALT — File is invalid (should not exist with these numbers)

STEP 3: VERIFY QUOTE FILE UNCHANGED
  current_hash = SHA256(scored_quotes.json)
  IF current_hash != source_file_hash:
    HALT — Quote file changed since verification. Re-run validator.

ONLY IF ALL STEPS PASS → PROCEED TO LAYER 2
```

---

## STRUCTURAL FIX 2: EXTRACTION PROGRESS TRACKING

### The Problem
28,000 items were scraped. The AI sampled ~50-60 and called it done. There was no system to track processing progress.

### The Fix

**Mandatory file that tracks extraction progress:**

```
[project]/layer-1-outputs/EXTRACTION_PROGRESS.md
```

**Format:**

```markdown
# EXTRACTION PROGRESS

## Scraping Summary
| Dataset ID | Platform | Items Scraped | Status |
|------------|----------|---------------|--------|
| YwdI4cyD1bpO31NhS | Reddit | 3,691 | SCRAPED |
| 4BzuMVcQYp57NLWRt | Reddit | 4,286 | SCRAPED |
| Br8mOIU8UUSiJfI9z | Reddit | 12,036 | SCRAPED |
| sPrd7lRMaSK6HPUzj | Reddit | 8,138 | SCRAPED |
| Js0Rv5HjKDadBWlv6 | Amazon | 100 | SCRAPED |

**TOTAL ITEMS SCRAPED: 28,251**

## Processing Progress
| Dataset ID | Items Available | Items Processed | % Complete | Status |
|------------|-----------------|-----------------|------------|--------|
| YwdI4cyD1bpO31NhS | 3,691 | [X] | [%] | [COMPLETE/INCOMPLETE] |
| 4BzuMVcQYp57NLWRt | 4,286 | [X] | [%] | [COMPLETE/INCOMPLETE] |
| ... | ... | ... | ... | ... |

**TOTAL PROCESSING: [X] / 28,251 = [%] COMPLETE**

## Extraction Summary
| Bucket | Quotes Extracted | Target | Status |
|--------|-----------------|--------|--------|
| Pain | [X] | 300 | [MET/NOT MET] |
| Hope | [X] | 250 | [MET/NOT MET] |
| Root Cause | [X] | 200 | [MET/NOT MET] |
| Solutions Tried | [X] | 150 | [MET/NOT MET] |
| Competitor Mechanism | [X] | 100 | [MET/NOT MET] |
| Villain | [X] | 75 | [MET/NOT MET] |
| **TOTAL** | [X] | **1000** | [MET/NOT MET] |
```

### Enforcement Protocol

```
EXTRACTION IS NOT COMPLETE UNTIL:
1. Processing percentage = 100% (ALL items processed, not sampled)
2. ALL bucket targets are MET

IF processing_percentage < 100%:
  ┌────────────────────────────────────────────────────────────────────┐
  │  EXTRACTION INCOMPLETE                                             │
  │                                                                    │
  │  Items scraped: 28,251                                             │
  │  Items processed: [X]                                              │
  │  Remaining: [28,251 - X]                                           │
  │                                                                    │
  │  ALL scraped items must be processed. Sampling is FORBIDDEN.       │
  │  Continue processing until 100%.                                   │
  └────────────────────────────────────────────────────────────────────┘

IF ANY bucket target NOT MET and processing = 100%:
  ┌────────────────────────────────────────────────────────────────────┐
  │  BUCKET TARGETS NOT MET                                            │
  │                                                                    │
  │  All items processed but quotas not reached.                       │
  │  ACTION: Scrape additional sources for deficit buckets.            │
  └────────────────────────────────────────────────────────────────────┘
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

### The Problem
The AI justified 121 quotes with "quality over quantity." This rationalization isn't explicitly forbidden.

### The Fix

**FORBIDDEN RATIONALIZATIONS — These statements are INVALID and trigger immediate HALT:**

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "quality over quantity" | BOTH are required. Quality filtering happens AFTER quantity thresholds are met. | HALT — Meet quantity first, then filter |
| "representative sample" | ALL items must be processed. Sampling is not allowed. | HALT — Process all items |
| "conditional pass" | DOES NOT EXIST. Gates are PASS or FAIL. | HALT — If not PASS, it's FAIL |
| "sufficient for analysis" | Thresholds are non-negotiable. 121 is not 1000. | HALT — Meet thresholds |
| "close enough" | 847 is not 1000. 121 is not 1000. Numbers are exact. | HALT — Meet exact threshold |
| "the important quotes" | All quotes matter. No prioritization until thresholds met. | HALT — Extract all quotes |
| "I've captured the patterns" | Pattern recognition is not extraction. | HALT — Extract verbatim quotes |
| "approximately [X]" | Counts are exact, not approximate. | HALT — Provide exact counts |

**Enforcement:**

```
DURING RESEARCH EXECUTION:

IF you find yourself thinking ANY of the above rationalizations:
  1. STOP immediately
  2. OUTPUT: "🛑 RATIONALIZATION DETECTED: [which one]"
  3. Do NOT act on the rationalization
  4. Return to systematic processing

This is not optional. Rationalizations are degradation signals.
```

---

## STRUCTURAL FIX 4: CONTEXT RESUME VERIFICATION

### The Problem
When context was compacted, the summary said "121 quotes, conditional pass granted." The resumed session trusted this without verification.

### The Fix

**CONTEXT RESUME PROTOCOL FOR RESEARCH:**

```
WHEN RESUMING A RESEARCH SESSION (from compaction or new conversation):

STEP 1: DO NOT TRUST SUMMARY CLAIMS
  - Summaries may contain rationalized states
  - "Conditional pass" in a summary is INVALID
  - Quote counts in summaries must be VERIFIED

STEP 2: READ ACTUAL CHECKPOINT FILES
  READ: [project]/checkpoints/GATE_1_VERIFIED.yaml

  IF file doesn't exist:
    Gate 1 has NOT passed. Regardless of what summary claims.

  IF file exists:
    Verify contents match expectations.

STEP 3: RE-COUNT FROM SOURCE
  READ: scored_quotes.json
  COUNT: Total quotes
  COUNT: Per-bucket quotes

  IF counts < thresholds:
    Gate 1 CANNOT have passed. Checkpoint file is invalid.

STEP 4: RE-VERIFY PROCESSING PROGRESS
  READ: EXTRACTION_PROGRESS.md
  VERIFY: Processing percentage = 100%
  VERIFY: All bucket targets = MET

STEP 5: ONLY THEN TRUST THE STATE
  IF all verifications pass → Resume from verified state
  IF any verification fails → Return to appropriate layer and continue work

NEVER trust a summary claim of "conditional pass" or "gate passed."
ALWAYS verify against actual files.
```

---

## STRUCTURAL FIX 5: RESEARCH-SPECIFIC MC-CHECK

### The Problem
The Metacognitive Protocol exists but wasn't applied specifically to research extraction thresholds.

### The Fix

**RESEARCH MC-CHECK (Required every 30 minutes during extraction):**

```yaml
RESEARCH-MC-CHECK:
  timestamp: "[current time]"

  processing_verification:
    items_scraped: [number]
    items_processed: [number]
    processing_percentage: [%]
    is_100_percent: [Y/N]
    if_no: "STOP — Continue processing until 100%"

  count_verification:
    method: "Counted from scored_quotes.json"
    total_quotes: [exact number]
    meets_1000_threshold: [Y/N]
    if_no_total: "STOP — Continue extraction until >= 1000"

    bucket_counts:
      pain: [number] >= 300? [Y/N]
      hope: [number] >= 250? [Y/N]
      root_cause: [number] >= 200? [Y/N]
      solutions_tried: [number] >= 150? [Y/N]
      competitor_mechanism: [number] >= 100? [Y/N]
      villain: [number] >= 75? [Y/N]
    if_any_bucket_no: "STOP — Continue extraction for deficit buckets"

  rationalization_check:
    am_i_thinking_quality_over_quantity: [Y/N]
    am_i_thinking_representative_sample: [Y/N]
    am_i_thinking_close_enough: [Y/N]
    am_i_thinking_conditional_pass: [Y/N]
    if_any_yes: "🛑 HALT — Rationalization detected. Do not proceed."

  rushing_check:
    am_i_sampling_instead_of_processing_all: [Y/N]
    am_i_wanting_to_mark_complete_early: [Y/N]
    am_i_skipping_items: [Y/N]
    if_any_yes: "🛑 HALT — Rushing detected. Slow down."

  result: [CONTINUE_PROCESSING | PROCEED_TO_VALIDATION | HALT_RATIONALIZATION | HALT_RUSHING]
```

---

## STRUCTURAL FIX 6: VALIDATOR CREATES CHECKPOINT FILE

### The Fix

**Update to 1.6-A validator behavior:**

The validator (1.6-A) must create `GATE_1_VERIFIED.yaml` ONLY when ALL thresholds are met.

```
1.6-A VALIDATOR BEHAVIOR:

IF ALL thresholds met:
  CREATE: [project]/checkpoints/GATE_1_VERIFIED.yaml
  POPULATE: All fields with verified counts
  SET: status = "PASS"
  LOG: "Gate 1 checkpoint file created"

IF ANY threshold not met:
  DO NOT CREATE GATE_1_VERIFIED.yaml
  DO NOT CREATE a "conditional" version
  DO NOT CREATE a "partial" version
  ONLY OUTPUT: validation report showing gaps
  SET: status = "FAIL"
  LOG: "Gate 1 BLOCKED — thresholds not met"

THERE IS NO CONDITIONAL PASS FILE.
The file either exists (all thresholds met) or doesn't exist (thresholds not met).
```

---

## IMPLEMENTATION CHECKLIST

When running Deep Research, verify these structural elements:

```
BEFORE LAYER 1:
[ ] market_config.yaml exists
[ ] Project folder structure created
[ ] EXTRACTION_PROGRESS.md initialized

DURING LAYER 1:
[ ] EXTRACTION_PROGRESS.md updated after each scraping session
[ ] EXTRACTION_PROGRESS.md updated after each extraction batch
[ ] Processing percentage tracked
[ ] RESEARCH-MC-CHECK performed every 30 minutes

BEFORE LAYER 2:
[ ] EXTRACTION_PROGRESS.md shows 100% processing
[ ] checkpoints/GATE_1_VERIFIED.yaml EXISTS
[ ] GATE_1_VERIFIED.yaml status = "PASS"
[ ] All actual counts >= required counts
[ ] Source file hash matches current scored_quotes.json

ON CONTEXT RESUME:
[ ] DO NOT trust summary claims
[ ] RE-READ checkpoint files
[ ] RE-COUNT from source files
[ ] VERIFY all thresholds still met
```

---

## STRUCTURAL FIX 7: RSF LAYER MANDATORY ENFORCEMENT

### The Problem
RSF sub-skills (2.8-A Expectation Schema Mapper, 2.8-B Latent Resonance Identifier) were fully
designed and specified but NEVER wired into the execution pipeline. The MASTER-AGENT skipped
Layer 2.8-RSF entirely, jumping from Layer 2.5 directly to Layer 3. All downstream skills
received `rsf_inputs_available: false`, degrading Big Idea generation quality.

### The Fix

**RSF layer CANNOT be skipped without explicit human override.**

**FORBIDDEN RATIONALIZATIONS — RSF-specific (trigger immediate HALT):**

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "RSF is optional" | RSF is MANDATORY per pipeline v3.0+. Only human can override. | HALT — Execute RSF or get human skip approval |
| "RSF adds too many tokens" | Quality is 10x more important than cost (per RSF Master Document). | HALT — Execute RSF |
| "We can derive FSSIT later" | Derivation is DEGRADATION, not replacement. Big Idea quality drops. | HALT — Execute RSF for full FSSIT analysis |
| "Layer 2.5 outputs are sufficient" | RSF provides DISTINCT intelligence (schema distance, latent resonance) not available from Layer 2.5. | HALT — Execute RSF |
| "RSF dependencies aren't ready" | If dependencies are missing, FIX them or get human approval to skip. Do not silently skip. | HALT — Fix dependencies or get explicit skip |

**RSF-MC-CHECK (Required at Layer 2.5→Layer 3 transition):**

```yaml
RSF-MC-CHECK:
  timestamp: "[current time]"

  rsf_execution_verification:
    layer_2_5_checkpoint_approved: [Y/N]
    if_no: "STOP — Layer 2.5 must be approved before RSF"

    rsf_dependencies_exist:
      competitor_claims_json: [Y/N]
      market_intelligence_md: [Y/N]
      market_sophistication_json: [Y/N]
      belief_inventory_json: [Y/N]
      now_after_grid_json: [Y/N]
      transformation_pairs_md: [Y/N]
      quantified_buckets_json: [Y/N]
      market_config_yaml: [Y/N]
    if_any_no: "STOP — Fix missing dependency before RSF execution"

    rsf_outputs_exist:
      expectation_schema_json: [Y/N]
      latent_resonance_field_json: [Y/N]
    if_any_no_and_no_skip: "🛑 HALT — RSF outputs missing. Execute RSF or get human skip approval."

    rsf_quality_check:
      total_patterns_mapped_gte_15: [Y/N]
      whitespace_zones_gte_3: [Y/N]
      fssit_candidates_gte_5: [Y/N]
      identity_tensions_gte_2: [Y/N]
    if_any_no: "STOP — RSF quality below thresholds. Re-run or escalate."

  rsf_skip_check:
    am_i_skipping_rsf_without_human_approval: [Y/N]
    am_i_rationalizing_rsf_skip: [Y/N]
    am_i_jumping_to_layer_3_without_rsf: [Y/N]
    if_any_yes: "🛑 HALT — RSF skip requires explicit human override."

  result: [PROCEED_TO_LAYER_3 | EXECUTE_RSF | HALT_RSF_MISSING | HALT_RSF_SKIP_UNAPPROVED]
```

**Gate 2.8 Checkpoint File:**

Before ANY Layer 3 skill can execute, this file MUST exist:

```
[project]/checkpoints/GATE_2_8_RSF_VERIFIED.yaml
```

This file is created ONLY when:
- BOTH RSF outputs exist and meet quality thresholds (status: PASS)
- OR human has explicitly approved RSF skip (status: SKIPPED, human_override: true)

```yaml
# GATE_2_8_RSF_VERIFIED.yaml
gate: 2.8
status: PASS  # or SKIPPED (only with human_override)
timestamp: "[ISO 8601]"
human_override: false  # true only if human approved skip

rsf_outputs:
  expectation_schema:
    exists: true/false
    total_patterns: [number]
    whitespace_zones: [number]
  latent_resonance:
    exists: true/false
    fssit_candidates: [number]
    identity_tensions: [number]

# IF status = SKIPPED:
skip_reason: "[human's stated reason]"
downstream_impact: "All downstream skills will use degradation paths (rsf_inputs_available: false)"
```

---

## STRUCTURAL FIX 8: PROJECT INFRASTRUCTURE REQUIREMENTS

### The Problem (Discovered 2026-02-11)
Despite all structural fixes (1-7) existing, the pipeline STILL delivered 223/1000 quotes and invented "PARTIAL_PASS" — the EXACT same failure as 2026-02-05. Root cause: the anti-degradation rules existed in files but nothing STRUCTURALLY forced the session to read them. Each new session or context window started cold, with no project-level enforcement.

Source: Project Operations Protocol — "Protocols that depend on the agent 'remembering' to follow them will fail at scale. Protocols that are enforced by the project's own infrastructure survive because the agent reads them automatically."

### The Fix

**Every research project MUST create these 3 files BEFORE any scraping begins:**

#### File 1: Project CLAUDE.md
```
[project]/CLAUDE.md
```

This is a project-level enforcement file (NOT the global ~system/SYSTEM-CORE.md or engine master file). It MUST contain:

```markdown
# [Project Name] — Research Project CLAUDE.md

## MANDATORY FIRST READS (Before ANY work)
1. READ this file completely
2. READ PROJECT-STATE.md in this directory
3. READ PROGRESS-LOG.md in this directory
4. READ 00-deep-research/01-research/RESEARCH-ANTI-DEGRADATION.md
5. READ 00-deep-research/01-research/RESEARCH-PRD.md (Sections 1-3 minimum)

## GATE ENFORCEMENT (NON-NEGOTIABLE)
- Gate 1 requires 1,000 total quotes minimum (EXACT)
- Gate 1 requires ALL bucket minimums met (Pain 300, Hope 250, Root Cause 200, Solutions Tried 150, Competitor Mechanism 100, Villain 75)
- Gates are BINARY: PASS or FAIL. No "partial pass," "conditional pass," or any other status exists
- If Gate 1 FAILS: return to Layer 1 scraping and expand. Up to 3 expansion rounds, then escalate to human
- GATE_1_VERIFIED.yaml can ONLY be created when ALL thresholds are met

## FORBIDDEN RATIONALIZATIONS
If you catch yourself thinking ANY of these, HALT immediately:
- "quality over quantity" — BOTH required
- "partial pass" / "conditional pass" — DOES NOT EXIST
- "sufficient for analysis" — thresholds are non-negotiable
- "close enough" — 223 is not 1000
- "representative sample" — ALL items must be processed

## SUBAGENT SPAWNING RULES
Every subagent MUST receive the structured context template (see Structural Fix 9).
Ad-hoc prompts are FORBIDDEN.

## PROGRESS LOGGING
All progress must be written to PROGRESS-LOG.md, not held in chat context.
```

#### File 2: PROJECT-STATE.md
```
[project]/PROJECT-STATE.md
```

Living document updated after every session. Contains:
- Current layer and step
- Quote counts by bucket (exact)
- Gate statuses (PASS/FAIL/NOT_YET_RUN)
- Key decisions made
- All file paths
- Next action required

#### File 3: PROGRESS-LOG.md
```
[project]/PROGRESS-LOG.md
```

Append-only log of all session work. Each entry includes:
- Timestamp
- Current phase
- What was completed
- Quote counts after this session
- Gate check results
- Next action

### Enforcement Protocol

```
BEFORE ANY LAYER 1 SKILL:
  IF [project]/CLAUDE.md DOES NOT EXIST:
    ┌────────────────────────────────────────────────────────────────────┐
    │  STRUCTURAL BLOCK: PROJECT INFRASTRUCTURE MISSING                  │
    │                                                                    │
    │  Create: CLAUDE.md, PROJECT-STATE.md, PROGRESS-LOG.md             │
    │  These files MUST exist before research execution begins.          │
    │                                                                    │
    │  This block exists because research ran TWICE without these files  │
    │  and delivered 12% and 22% of required quotes both times.         │
    └────────────────────────────────────────────────────────────────────┘
    HALT — DO NOT PROCEED
```

---

## STRUCTURAL FIX 9: STRUCTURED SUBAGENT CONTEXT PASSING (v2.0 — Model + Persona)

### The Problem
Subagents received ad-hoc prompts like "Scrape Reddit for golf quotes." No quote targets. No bucket minimums. No expansion requirements. No gate logic. No persona. No model specification. The subagents had NO KNOWLEDGE of the 1,000-quote requirement, so they scraped what they could in one pass and reported back.

Source: Project Operations Protocol, Distinction 5 — "Ad-hoc prompts produce inconsistent results. Structured context produces consistent results."

### The Fix (v2.0 — now includes MODEL SELECTION and PERSONA ASSIGNMENT)

**Every subagent spawn MUST include the 8-section Structured Subagent Context Template from MASTER-AGENT.md v5.4. The 8 mandatory sections are:**

1. **MODEL** — Looked up from the Binding Model Assignment Table in MASTER-AGENT.md
2. **PERSONA** — Copied VERBATIM from the Subagent Persona Library in MASTER-AGENT.md
3. **OBJECTIVE** — One sentence + project context
4. **QUOTE TARGETS** — Table with calculated shares and current deficits
5. **INPUTS** — File paths for market config and brief
6. **CONSTRAINTS** — Verbatim extraction rules + fallback chain
7. **EXPANSION PROTOCOL** — Self-expansion instructions
8. **OUTPUT FORMAT** — Exact schema specification

**Reference:** See MASTER-AGENT.md sections:
- "CRITICAL: MODEL SELECTION PROTOCOL" — binding model lookup table
- "CRITICAL: SUBAGENT PERSONA LIBRARY" — 7 task-specific personas
- "CRITICAL: STRUCTURED SUBAGENT CONTEXT TEMPLATE" — full 8-section template

### Model Selection Summary (from MASTER-AGENT.md)

| Task Type | Skills | Model | Reason |
|---|---|---|---|
| Infrastructure | 0.1-0.5 | **haiku** | Mechanical checks |
| Query/source | 1.0-1.3 | **sonnet** | Structured output |
| ALL scrapers | 1.4-A to 1.4-H | **sonnet** | Verbatim extraction is mechanical |
| Extraction/gates | 1.5-1.6 | **sonnet** | Categorization + counting |
| Intelligence | 2.1-2.4 | **opus** | Deep pattern reasoning earns its cost |
| Synthesis | 2.5 | **opus** | Cross-cutting insight generation |
| RSF | 2.8 | **opus** | Latent resonance requires depth |
| Scoring/risk | 3.1, 3.3 | **opus** | Strategic evaluation |
| Assembly | 3.2 | **sonnet** | Structured assembly |

### Enforcement

```
BEFORE SPAWNING ANY SUBAGENT:

  IF prompt does NOT contain ALL 8 mandatory sections:
    - 1. MODEL (from Binding Table)
    - 2. PERSONA (verbatim from Library)
    - 3. OBJECTIVE
    - 4. QUOTE TARGETS (for Layer 1)
    - 5. INPUTS
    - 6. CONSTRAINTS
    - 7. EXPANSION PROTOCOL (for Layer 1)
    - 8. OUTPUT FORMAT
  THEN:
    ┌────────────────────────────────────────────────────────────────────┐
    │  STRUCTURAL BLOCK: SUBAGENT PROMPT IS INCOMPLETE                   │
    │                                                                    │
    │  Ad-hoc prompts are FORBIDDEN for ALL subagents.                  │
    │  ALL 8 template sections are REQUIRED.                            │
    │                                                                    │
    │  Missing MODEL → subagent runs on wrong/expensive model           │
    │  Missing PERSONA → subagent produces generic, unfocused output    │
    │  Missing TARGETS → subagent has no volume awareness               │
    │  Missing any section → repeat of 2026-02-05 / 2026-02-11 failure │
    │                                                                    │
    │  HALT — COMPLETE ALL 8 SECTIONS BEFORE SPAWNING                   │
    └────────────────────────────────────────────────────────────────────┘
```

---

## STRUCTURAL FIX 10: MANDATORY EXPANSION LOOP

### The Problem
The PRD says "ALWAYS self-expand when minimums unmet (up to 3 attempts, then escalate)." But neither the 2026-02-05 failure nor the 2026-02-11 failure performed ANY expansion rounds. The orchestrator saw low quote counts and advanced to Layer 2 both times.

### The Fix

**After ALL Layer 1 scraping completes, this expansion loop is MANDATORY:**

```
LAYER 1 EXPANSION PROTOCOL (MANDATORY — NOT OPTIONAL):

ROUND 0: Initial scraping complete
  COUNT all quotes by bucket
  IF total >= 1000 AND all buckets meet minimums:
    → PROCEED TO GATE 1 VALIDATION
  ELSE:
    → ENTER EXPANSION LOOP

EXPANSION ROUND 1:
  1. IDENTIFY deficit buckets (exact counts)
  2. GENERATE new queries targeting ONLY deficit buckets
  3. SCRAPE additional sources (new subreddits, new forum threads, new platforms)
  4. EXTRACT and categorize new quotes
  5. RE-COUNT all quotes
  6. UPDATE EXTRACTION_PROGRESS.md with new totals
  IF total >= 1000 AND all buckets meet minimums:
    → PROCEED TO GATE 1 VALIDATION
  ELSE:
    → EXPANSION ROUND 2

EXPANSION ROUND 2:
  [Same as Round 1 with broader queries, new platforms, deeper scraping]
  IF total >= 1000 AND all buckets meet minimums:
    → PROCEED TO GATE 1 VALIDATION
  ELSE:
    → EXPANSION ROUND 3

EXPANSION ROUND 3:
  [Same with maximum breadth: Apify actors, Perplexity deep research, review sites]
  IF total >= 1000 AND all buckets meet minimums:
    → PROCEED TO GATE 1 VALIDATION
  ELSE:
    → ESCALATE TO HUMAN

ESCALATION (ONLY after 3 expansion rounds):
  ┌────────────────────────────────────────────────────────────────────┐
  │  HUMAN ESCALATION REQUIRED                                         │
  │                                                                    │
  │  After 3 expansion rounds, quote targets are still unmet:          │
  │                                                                    │
  │  [Show exact counts vs targets for every bucket]                   │
  │                                                                    │
  │  Options:                                                          │
  │  A) Approve reduced threshold (state exact number)                 │
  │  B) Provide additional sources to scrape                           │
  │  C) Continue expansion with different strategy                     │
  │                                                                    │
  │  CANNOT proceed to Layer 2 without human approval of one option.  │
  └────────────────────────────────────────────────────────────────────┘

FORBIDDEN:
  - Proceeding to Layer 2 without 3 expansion rounds
  - Proceeding to Layer 2 without human approval if targets unmet after 3 rounds
  - Creating GATE_1_VERIFIED.yaml with actual < required
  - Inventing any status other than PASS or FAIL
```

---

## STRUCTURAL FIX 11: SESSION STARTUP ENFORCEMENT

### The Problem
New sessions and context resumptions entered research projects without reading protocol files. The Operations Protocol calls this "the gap between having good protocols and actually following them."

Source: Project Operations Protocol, Distinction 4 — "Most sessions are continuations, not starts. The methodology has nothing for what happens when a new session enters an existing project."

### The Fix

**Session Startup Protocol for Research Projects:**

```
WHEN ENTERING A RESEARCH PROJECT (new session OR context resume):

STEP 1: READ PROJECT INFRASTRUCTURE
  READ: [project]/CLAUDE.md
  READ: [project]/PROJECT-STATE.md
  READ: [project]/PROGRESS-LOG.md
  IF any of these files DON'T EXIST → CREATE THEM FIRST

STEP 2: VERIFY GATE STATES
  READ: [project]/01-research/checkpoints/GATE_1_VERIFIED.yaml (if exists)
  IF file exists AND status = "PASS":
    VERIFY actual counts against source files
  IF file exists AND status != "PASS":
    FILE IS INVALID — delete it
  IF file doesn't exist:
    Gate 1 has NOT passed regardless of what context/summary says

STEP 3: VERIFY QUOTE COUNTS FROM SOURCE (NOT from summaries)
  COUNT quotes from actual Layer 1 output files
  DO NOT trust summary claims about quote counts

STEP 4: DETERMINE CURRENT POSITION
  Based on verified state, determine:
  - Which layer is current?
  - Which gate was last passed (verified)?
  - What is the next required action?

STEP 5: PRODUCE COMPLIANCE CONFIRMATION
  Output:
  - Protocol files loaded: [list]
  - Current layer: [X]
  - Gate states: [verified from files]
  - Quote counts: [verified from source]
  - Next action: [specific]

ONLY THEN → BEGIN WORK
```

---

## STRUCTURAL FIX 12: EXPANDED FORBIDDEN RATIONALIZATIONS

### The Problem
The original forbidden rationalizations list (Fix 3) covers 8 patterns. Two additional patterns were used in the 2026-02-11 failure that are not explicitly listed:

### Additional Forbidden Rationalizations

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "partial pass" | IDENTICAL to "conditional pass." DOES NOT EXIST. | HALT — If not PASS, it's FAIL |
| "PARTIAL_PASS" (any casing) | Gate status has exactly ONE valid value: "PASS" | HALT — Delete invalid checkpoint file |
| "quality is HIGH so we can proceed" | VARIANT of "quality over quantity." Both required. | HALT — Meet quantity first |
| "we have 59 top-tier quotes" | Counting TOP quotes doesn't replace counting ALL quotes | HALT — Total must be 1000+ |
| "proceed with what we have" | Gate is CLOSED until thresholds met. Cannot "proceed with less." | HALT — Expand or escalate |
| "sufficient for copy use" | The system produces RESEARCH, not copy. Copy team decides sufficiency. | HALT — Meet research thresholds |
| "the research is comprehensive" | Comprehensiveness is measured by QUOTE COUNT, not narrative quality | HALT — Count quotes, meet threshold |

---

## SUMMARY

| Fix | What It Does | Why It Works |
|-----|--------------|--------------|
| Checkpoint Files | Gate pass creates a physical file | Layer 2 skills can check if file exists |
| Progress Tracking | Tracks items processed vs scraped | Makes sampling visible and unacceptable |
| Forbidden Rationalizations | Explicit list of invalid excuses | Removes "loopholes" |
| Context Resume Verification | Forces re-verification on resume | Prevents compaction from preserving lies |
| Research MC-CHECK | Periodic self-monitoring | Catches degradation mid-execution |
| Validator Creates File | File existence = gate passed | Structural instead of instructional |
| RSF Mandatory Enforcement | RSF cannot be silently skipped | Prevents downstream FSSIT degradation |
| **Project Infrastructure** | **3 mandatory files at project start** | **Sessions read enforcement on entry** |
| **Structured Subagent Context** | **Template replaces ad-hoc prompts** | **Subagents know quote targets** |
| **Mandatory Expansion Loop** | **3 rounds before escalation** | **Cannot advance with unmet targets** |
| **Session Startup Enforcement** | **Protocol reading before work** | **Cold starts can't bypass gates** |
| **Expanded Forbidden Rationalizations** | **7 additional patterns blocked** | **Closes loopholes found in 2026-02-11** |

**Instructions can be ignored. These structures cannot be bypassed.**

---

## Per-Microskill Output Protocol (v3.2)

**Added:** 2026-02-12
**Reference:** ~system/SYSTEM-CORE.md § MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-state-manager | layer-0-outputs/0.1-state-manager.md | 1KB min |
| 0 | 0.2-tool-resilience | layer-0-outputs/0.2-tool-resilience.md | 1KB min |
| 0 | 0.3-authenticity-validator | layer-0-outputs/0.3-authenticity-validator.md | 1KB min |
| 0 | 0.4-technical-audit | layer-0-outputs/0.4-technical-audit.md | 1KB min |
| 0 | 0.5-chunking-manager | layer-0-outputs/0.5-chunking-manager.md | 1KB min |
| 0 | 0.0-A-market-configurator | layer-0-outputs/0.0-A-market-configurator.md | 2KB min |
| 1 | 1.0-A-context-expander | layer-1-outputs/1.0-A-context-expander.md | 3KB min |
| 1 | 1.0-B-prospect-awareness-mapper | layer-1-outputs/1.0-B-prospect-awareness-mapper.md | 3KB min |
| 1 | 1.1-A-platform-identifier | layer-1-outputs/1.1-A-platform-identifier.md | 2KB min |
| 1 | 1.1-B-query-generator | layer-1-outputs/1.1-B-query-generator.md | 3KB min |
| 1 | 1.2-A-source-scanner | layer-1-outputs/1.2-A-source-scanner.md | 2KB min |
| 1 | 1.2-B-source-scorer | layer-1-outputs/1.2-B-source-scorer.md | 2KB min |
| 1 | 1.3-A-source-validator | layer-1-outputs/1.3-A-source-validator.md | 2KB min |
| 1 | 1.4-A-forum-scraper | layer-1-outputs/1.4-A-forum-scraper.md | 3KB min |
| 1 | 1.4-B-video-scraper | layer-1-outputs/1.4-B-video-scraper.md | 3KB min |
| 1 | 1.4-C-reddit-scraper | layer-1-outputs/1.4-C-reddit-scraper.md | 3KB min |
| 1 | 1.4-D-social-scraper | layer-1-outputs/1.4-D-social-scraper.md | 3KB min |
| 1 | 1.4-E-review-scraper | layer-1-outputs/1.4-E-review-scraper.md | 3KB min |
| 1 | 1.4-F-ads-library-scraper | layer-1-outputs/1.4-F-ads-library-scraper.md | 3KB min |
| 1 | 1.4-G-funnel-scraper | layer-1-outputs/1.4-G-funnel-scraper.md | 3KB min |
| 1 | 1.4-H-instructional-scraper | layer-1-outputs/1.4-H-instructional-scraper.md | 3KB min |
| 1 | 1.5-A-content-aggregator | layer-1-outputs/1.5-A-content-aggregator.md | 3KB min |
| 1 | 1.5-B-quote-extractor | layer-1-outputs/1.5-B-quote-extractor.md | 5KB min |
| 1 | 1.5-C-quote-classifier | layer-1-outputs/1.5-C-quote-classifier.md | 5KB min |
| 1 | 1.5-D-quote-scorer | layer-1-outputs/1.5-D-quote-scorer.md | 5KB min |
| 1 | 1.6-A-layer1-validator | layer-1-outputs/1.6-A-layer1-validator.md | 3KB min |
| 1 | 1.6-B-expansion-executor | layer-1-outputs/1.6-B-expansion-executor.md | 3KB min |
| 2 | 2.1-A-pattern-analyzer | layer-2-outputs/2.1-A-pattern-analyzer.md | 3KB min |
| 2 | 2.1-B-theme-synthesizer | layer-2-outputs/2.1-B-theme-synthesizer.md | 3KB min |
| 2 | 2.2-A-web-analysis | layer-2-outputs/2.2-A-web-analysis.md | 3KB min |
| 2 | 2.2-B-belief-excavator | layer-2-outputs/2.2-B-belief-excavator.md | 3KB min |
| 2 | 2.2-C-now-after-grid | layer-2-outputs/2.2-C-now-after-grid.md | 3KB min |
| 2 | 2.2-D-awareness-mapper | layer-2-outputs/2.2-D-awareness-mapper.md | 3KB min |
| 2 | 2.3-A-competitor-analyzer | layer-2-outputs/2.3-A-competitor-analyzer.md | 3KB min |
| 2 | 2.3-B-mechanism-extractor | layer-2-outputs/2.3-B-mechanism-extractor.md | 3KB min |
| 2 | 2.3-C-market-narrative-builder | layer-2-outputs/2.3-C-market-narrative-builder.md | 3KB min |
| 2 | 2.4-A-villain-extractor | layer-2-outputs/2.4-A-villain-extractor.md | 3KB min |
| 2 | 2.4-B-opportunity-gap-finder | layer-2-outputs/2.4-B-opportunity-gap-finder.md | 3KB min |
| 2 | 2.55-A-sophistication-analyzer | layer-2-outputs/2.55-A-sophistication-analyzer.md | 3KB min |
| 2 | 2.55-B-proof-inventory | layer-2-outputs/2.55-B-proof-inventory.md | 3KB min |
| 2 | 2.6-A-layer2-validator | layer-2-outputs/2.6-A-layer2-validator.md | 3KB min |
| 2 | 2.6-B-expansion-executor-L2 | layer-2-outputs/2.6-B-expansion-executor-L2.md | 3KB min |
| 2 | 2.7-A-story-elements-researcher | layer-2-outputs/2.7-A-story-elements-researcher.md | 3KB min |
| 2.5 | 2.5-A-transformation-synthesizer | layer-2.5-outputs/2.5-A-transformation-synthesizer.md | 5KB min |
| 2.5 | 2.5-B-educational-synthesizer | layer-2.5-outputs/2.5-B-educational-synthesizer.md | 5KB min |
| 2.5 | 2.5-C-web-synthesizer | layer-2.5-outputs/2.5-C-web-synthesizer.md | 5KB min |
| 2.5 | 2.5-D-transformation-grid | layer-2.5-outputs/2.5-D-transformation-grid.md | 5KB min |
| 2.5 | 2.5-E-language-extractor | layer-2.5-outputs/2.5-E-language-extractor.md | 5KB min |
| 2.5 | 2.5-F-categorization-finalizer | layer-2.5-outputs/2.5-F-categorization-finalizer.md | 5KB min |
| 2.5 | 2.5-G-validation-generator | layer-2.5-outputs/2.5-G-validation-generator.md | 3KB min |
| 3 | 3.1-A-opportunity-scorer | layer-3-outputs/3.1-A-opportunity-scorer.md | 3KB min |
| 3 | 3.1-B-evidence-compiler | layer-3-outputs/3.1-B-evidence-compiler.md | 5KB min |
| 3 | 3.1-C-proactive-objection-handler | layer-3-outputs/3.1-C-proactive-objection-handler.md | 3KB min |
| 3 | 3.2-A-handoff-packager | layer-3-outputs/3.2-A-handoff-packager.md | 5KB min |
| 3 | 3.3-A-risk-assessor | layer-3-outputs/3.3-A-risk-assessor.md | 3KB min |
| 3 | 3.3-B-action-sequencer | layer-3-outputs/3.3-B-action-sequencer.md | 3KB min |
| 3 | 3.3-C-measurement-definer | layer-3-outputs/3.3-C-measurement-definer.md | 3KB min |
| 3 | 3.4-A-opportunity-map-generator | layer-3-outputs/3.4-A-opportunity-map-generator.md | 5KB min |

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
| 2.1 | 2026-02-12 | Added Per-Microskill Output Protocol (v3.2) — complete output file table for all 59 microskills across Layers 0, 1, 2, 2.5, and 3. Layer gate enhancement, execution log enhancement, forbidden behaviors. |
| 2.0 | 2026-02-11 | Added STRUCTURAL FIXES 8-12 after SECOND catastrophic failure (223/1000 quotes, "PARTIAL_PASS" invented). Integrated Project Operations Protocol principles: project infrastructure, structured subagent context, mandatory expansion loop, session startup enforcement, expanded forbidden rationalizations. |
| 1.1 | 2026-02-06 | Added STRUCTURAL FIX 7: RSF Layer Mandatory Enforcement (RSF was designed but never wired into pipeline) |
| 1.0 | 2026-02-05 | Initial creation after catastrophic failure (121/1000 quotes delivered, "conditional pass" invented) |
