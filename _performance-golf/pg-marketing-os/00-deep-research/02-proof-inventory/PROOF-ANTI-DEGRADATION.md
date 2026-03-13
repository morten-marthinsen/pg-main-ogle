# PROOF-ANTI-DEGRADATION.md

**Version:** 2.0
**Created:** 2026-02-05
**Updated:** 2026-02-12
**Purpose:** STRUCTURAL enforcement to prevent proof inventory process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: PROOF-ANTI-DEGRADATION.md v2.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Skip Layer 3 discovery, claim existing proof is sufficient without searching, or go straight to output without executing discovery operations.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Process Failure Event (2026-02-05):**
- AI admitted: "You're right. I documented existing proof from the brief but skipped the actual DISCOVERY operation"
- Layer 3 (Discovery/Generation) was skipped entirely
- AI went from extraction → output without searching for additional studies
- Only performed web searches AFTER being called out
- Same degradation pattern as Research catastrophic failure

**Metacognitive Protocol additions (MC-CHECK) didn't prevent this failure.**

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: MANDATORY DISCOVERY LOG FILE

### The Problem
Layer 3 contains 7 discovery microskills (3.1-3.7). The AI skipped all of them and went straight to Layer 4 output.

### The Fix

**Before ANY Layer 4 skill can execute, this file MUST exist:**

```
[project]/02-proof-inventory/DISCOVERY_LOG.md
```

**This file is created ONLY by completing Layer 3 discovery operations.**

**Mandatory Format:**

```markdown
# PROOF DISCOVERY LOG

## Project: [project-name]
## Generated: [ISO 8601 timestamp]

## Discovery Operations Completed

### 3.1 Discovery Routing
- [ ] Gap analysis reviewed
- [ ] Discovery priorities determined
- Highest priority gaps: [list]

### 3.2 Study Discovery
- [ ] EXECUTED — NOT SKIPPED
- Searches performed: [count]
- Search queries used:
  - "[query 1]"
  - "[query 2]"
  - "[query 3]"
  - [minimum 5 queries required]
- Studies/papers found: [count]
- Studies added to inventory: [count]
- Source URLs:
  - [url 1]
  - [url 2]

### 3.3 Data Discovery
- [ ] EXECUTED — NOT SKIPPED
- Searches performed: [count]
- Data points discovered: [count]
- Statistics/numbers added: [count]

### 3.4 Expert Quote Discovery
- [ ] EXECUTED — NOT SKIPPED
- Searches performed: [count]
- Expert quotes found: [count]
- Expert quotes added: [count]

### 3.5 Analogous Proof Discovery
- [ ] EXECUTED — NOT SKIPPED
- Analogous proofs found: [count]

### 3.6 Generation Recommendations
- [ ] EXECUTED — NOT SKIPPED
- Recommendations for client-generated proof: [count]

### 3.7 Implementation Guidance
- [ ] EXECUTED — NOT SKIPPED
- Implementation steps documented: [Y/N]

## Discovery Summary
- Total new elements discovered: [count]
- Elements added to inventory: [count]
- Categories strengthened: [list]
- Remaining gaps after discovery: [list]

## Verification
- All Layer 3 microskills executed: [Y/N]
- Discovery log complete: [Y/N]
- Ready for Layer 4: [Y/N]
```

### Enforcement Protocol

```
BEFORE ANY LAYER 4 SKILL (4.1 through 4.7):

STEP 1: CHECK FILE EXISTS
  path = [project]/02-proof-inventory/DISCOVERY_LOG.md
  IF NOT EXISTS:
    ┌────────────────────────────────────────────────────────────────────┐
    │  STRUCTURAL BLOCK: DISCOVERY_LOG.md DOES NOT EXIST                │
    │                                                                    │
    │  This file is created ONLY by executing Layer 3 discovery.        │
    │  Without it, Layer 4 cannot execute.                              │
    │                                                                    │
    │  ACTION: Return to Layer 3 and execute all discovery skills       │
    └────────────────────────────────────────────────────────────────────┘
    HALT — DO NOT PROCEED

STEP 2: VERIFY DISCOVERY ACTUALLY OCCURRED
  READ DISCOVERY_LOG.md

  IF study_discovery.searches_performed < 5:
    HALT — Insufficient study discovery (minimum 5 search queries)

  IF study_discovery.executed != true:
    HALT — Study discovery was skipped

  IF data_discovery.executed != true:
    HALT — Data discovery was skipped

  IF expert_quote_discovery.executed != true:
    HALT — Expert quote discovery was skipped

STEP 3: VERIFY MINIMUM DISCOVERY OUTPUT
  IF total_new_elements_discovered == 0:
    HALT — No elements discovered. Discovery was not properly executed.

ONLY IF ALL STEPS PASS → PROCEED TO LAYER 4
```

---

## STRUCTURAL FIX 2: MANDATORY GATE CHECKPOINT FILE

### The Problem
There was no checkpoint file requirement between layers.

### The Fix

**Layer 4 CANNOT execute unless this file exists:**

```
[project]/02-proof-inventory/checkpoints/LAYER_3_COMPLETE.yaml
```

**Created ONLY after Discovery Log is complete and validated:**

```yaml
# LAYER_3_COMPLETE.yaml — Created after discovery validation
layer: 3
status: COMPLETE
timestamp: "[ISO 8601]"

discovery_summary:
  study_discovery:
    executed: true
    searches_performed: [number >= 5]
    elements_discovered: [number]
  data_discovery:
    executed: true
    searches_performed: [number]
    elements_discovered: [number]
  expert_quote_discovery:
    executed: true
    searches_performed: [number]
    elements_discovered: [number]
  analogous_proof:
    executed: true
    elements_discovered: [number]

total_new_elements: [number]
elements_added_to_inventory: [number]
inventory_updated: true
```

---

## STRUCTURAL FIX 3: MINIMUM DISCOVERY THRESHOLDS

### The Problem
The AI could claim "discovery complete" after doing nothing.

### The Fix

**NON-NEGOTIABLE Discovery Minimums:**

| Discovery Type | Minimum Requirement | If Not Met |
|----------------|---------------------|------------|
| **Study Discovery Searches** | 5 queries minimum | HALT — Continue searching |
| **Data Discovery Searches** | 3 queries minimum | HALT — Continue searching |
| **Expert Quote Searches** | 3 queries minimum | HALT — Continue searching |
| **Total Discovery Operations** | At least 3 of 7 microskills must add elements | HALT — Discovery incomplete |

**"Zero elements discovered" is NOT acceptable unless genuinely exhaustive search was performed.**

---

## STRUCTURAL FIX 4: FORBIDDEN RATIONALIZATIONS

### The Problem
The AI justified skipping discovery with implicit rationalizations.

### The Fix

**FORBIDDEN RATIONALIZATIONS — These statements are INVALID and trigger immediate HALT:**

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "existing proof is sufficient" | Discovery phase is MANDATORY regardless of existing inventory | HALT — Execute discovery |
| "brief contains enough proof" | Discovery searches for ADDITIONAL proof beyond the brief | HALT — Execute discovery |
| "I'll update the inventory now" | Cannot update inventory before discovery phase | HALT — Execute discovery first |
| "time constraints" | Quality over speed. Discovery cannot be skipped. | HALT — Execute discovery |
| "the gaps aren't significant" | Gap severity is determined AFTER discovery attempts | HALT — Execute discovery |
| "web searches came back empty" | Log the searches anyway. Empty results are still discovery. | Document searches in DISCOVERY_LOG.md |
| "I already know this market" | Discovery requires ACTUAL searches, not recalled knowledge | HALT — Execute actual searches |

**Enforcement:**

```
DURING PROOF INVENTORY EXECUTION:

IF you find yourself thinking ANY of the above rationalizations:
  1. STOP immediately
  2. OUTPUT: "🛑 RATIONALIZATION DETECTED: [which one]"
  3. Do NOT act on the rationalization
  4. Return to Layer 3 discovery

This is not optional. Rationalizations are degradation signals.
```

---

## STRUCTURAL FIX 5: PROOF-SPECIFIC MC-CHECK

### The Fix

**PROOF-MC-CHECK (Required at Layer 2→3 transition and Layer 3→4 transition):**

```yaml
PROOF-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [2 | 3 | 4]
    previous_layer_complete: [Y/N]

  discovery_verification:  # Only at Layer 3→4 transition
    discovery_log_exists: [Y/N]
    if_no: "STOP — Cannot proceed to Layer 4 without DISCOVERY_LOG.md"

    study_discovery:
      executed: [Y/N]
      search_count: [number]
      if_under_5: "STOP — Minimum 5 study searches required"

    data_discovery:
      executed: [Y/N]
      search_count: [number]
      if_under_3: "STOP — Minimum 3 data searches required"

    expert_quote_discovery:
      executed: [Y/N]
      search_count: [number]
      if_under_3: "STOP — Minimum 3 expert quote searches required"

  rationalization_check:
    am_i_thinking_existing_proof_sufficient: [Y/N]
    am_i_thinking_skip_discovery: [Y/N]
    am_i_thinking_just_update_inventory: [Y/N]
    am_i_thinking_brief_has_enough: [Y/N]
    if_any_yes: "🛑 HALT — Rationalization detected. Execute discovery."

  rushing_check:
    am_i_skipping_layer_3: [Y/N]
    am_i_going_straight_to_output: [Y/N]
    am_i_avoiding_web_searches: [Y/N]
    if_any_yes: "🛑 HALT — Rushing detected. Slow down."

  result: [CONTINUE | HALT_DISCOVERY_REQUIRED | HALT_RATIONALIZATION | HALT_RUSHING]
```

---

## STRUCTURAL FIX 6: LAYER EXECUTION VERIFICATION

### The Problem
The AI jumped from Layer 2 to Layer 4, skipping Layer 3 entirely.

### The Fix

**Mandatory Layer Execution Order with Checkpoint Files:**

```
Layer 1 (Extraction) → Creates: extraction-complete.yaml
Layer 2 (Scoring)    → Creates: scoring-complete.yaml
Layer 3 (Discovery)  → Creates: LAYER_3_COMPLETE.yaml + DISCOVERY_LOG.md
Layer 4 (Output)     → Requires all above files to exist

EACH LAYER VALIDATES PREVIOUS LAYER'S CHECKPOINT FILE EXISTS.
```

**Layer 4 Entry Check:**

```
BEFORE EXECUTING ANY LAYER 4 SKILL:

[ ] extraction-complete.yaml exists
[ ] scoring-complete.yaml exists
[ ] LAYER_3_COMPLETE.yaml exists
[ ] DISCOVERY_LOG.md exists
[ ] DISCOVERY_LOG.md shows all discovery types executed

IF ANY MISSING → HALT — Return to incomplete layer
```

---

## IMPLEMENTATION CHECKLIST

When running Proof Inventory, verify these structural elements:

```
PRE-EXECUTION (Fix 9):
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] PROOF-ANTI-DEGRADATION.md read (THIS FILE)
[ ] Stale artifacts from previous attempts searched and deleted (Fix 8)

LAYER 0 (VALIDATION):
[ ] All input files validated (research FINAL_HANDOFF, brief, transcripts)
[ ] Route determined (full_pipeline or individual operation)
[ ] Schwartz stage identified
[ ] MODEL: haiku (Fix 11)

LAYER 1 (EXTRACTION):
[ ] Source files parsed
[ ] Testimonials extracted
[ ] Promotions mined
[ ] Studies documented
[ ] Elements classified and scored
[ ] Phase tags applied (for multi-phase products — Fix 13)
[ ] extraction-complete.yaml created
[ ] PROJECT-STATE.md updated
[ ] MODEL: sonnet for extraction, opus for scoring (Fix 11)

LAYER 2 (SCORING):
[ ] Composite scores calculated
[ ] Schwartz adjustments applied
[ ] Category strengths calculated
[ ] Gaps detected with severity (CRITICAL/MODERATE/MINOR)
[ ] Promise ceiling calculated
[ ] scoring-complete.yaml created
[ ] PROJECT-STATE.md updated
[ ] MODEL: opus (Fix 11)

LAYER 3 (DISCOVERY) — CANNOT BE SKIPPED:
[ ] Discovery routing executed (3.1)
[ ] Study discovery executed with 5+ searches (3.2)
[ ] Data discovery executed with 3+ searches (3.3)
[ ] Expert quote discovery executed with 3+ searches (3.4)
[ ] Analogous proof discovery executed (3.5)
[ ] Generation recommendations created (3.6)
[ ] Implementation guidance documented (3.7)
[ ] DISCOVERY_LOG.md created and complete
[ ] LAYER_3_COMPLETE.yaml created
[ ] PROJECT-STATE.md updated
[ ] All subagents received 8-section structured context (Fix 12)
[ ] MODEL: sonnet for web searches, opus for analysis (Fix 11)

LAYER 4 (OUTPUT):
[ ] Verify all checkpoint files exist
[ ] Stale FINAL_HANDOFF.md deleted from incorrect locations (Fix 8)
[ ] Knockout proof selected
[ ] Position rankings created
[ ] Objection mappings complete
[ ] Gradualization sequence created
[ ] Promise handoff packaged
[ ] FINAL_HANDOFF.md assembled with ALL 11 sections (Sections 0-10)
[ ] FINAL_HANDOFF.md >= 50KB (comprehensive, not abbreviated)
[ ] IF element_count >= 50: Staged write protocol used (Fix 7)
[ ] FINAL_HANDOFF.md contains ALL elements (Section 10 is complete inventory)
[ ] FINAL_HANDOFF.md downstream handoffs populated (03, 04, 05, 06, 18)
[ ] Gate status is PASS only — no invented statuses (Fix 10)
[ ] MODEL: opus (Fix 11)

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] Learning log updated with any catches/fixes

IF FINAL_HANDOFF.md DOES NOT EXIST → SKILL IS NOT COMPLETE

ON CONTEXT RESUME:
[ ] DO NOT trust summary claims about layer completion
[ ] RE-READ PROJECT-STATE.md for current position
[ ] RE-READ checkpoint files
[ ] VERIFY DISCOVERY_LOG.md exists and is complete
[ ] If discovery was skipped, RETURN to Layer 3
```

---

## STRUCTURAL FIX 7: STAGED WRITE PROTOCOL FOR LARGE FILES

### The Problem
The Layer 4 assembly agent hit the 32,000 output token maximum TWICE when trying to write the 83KB FINAL_HANDOFF.md in a single API response. The file was too large to generate in one Write call. This will happen on EVERY real project (minimum 50KB requirement guarantees it).

### The Fix

**ANY file expected to exceed 50KB MUST be written in staged chunks:**

```
STAGED WRITE PROTOCOL:

IF estimated_output_size > 50KB:
  1. DO NOT attempt single Write call
  2. SPLIT into 3 staged operations:
     - Stage 1: Sections 0-2 (Executive Summary + Full Element Inventory)
     - Stage 2: Sections 3-7 (Scoring + Gap Analysis + Rankings + Phase Matrix)
     - Stage 3: Sections 8-10 (Objection Mapping + Downstream Handoffs + Element Index)
  3. Each stage APPENDS to the file (Stage 1 creates, Stages 2-3 append)
  4. After Stage 3: VERIFY file completeness (all 11 sections present)

IF single Write call fails with token limit:
  1. DO NOT retry the same call
  2. SWITCH to staged protocol immediately
  3. Use execution-log.md and DISCOVERY_LOG.md as authoritative source data
```

**Indicator that staged writing is needed:**
- 75+ proof elements = staged writing required
- 50+ proof elements = staged writing recommended
- <50 elements = single write may succeed (but staged is always safer)

### Enforcement

```
BEFORE LAYER 4 FINAL_HANDOFF.md WRITE:
  element_count = [count from extraction]
  IF element_count >= 50:
    MANDATORY staged write protocol
  ELSE:
    Single write permitted (but verify size after)
```

---

## STRUCTURAL FIX 8: STALE ARTIFACT CLEANUP

### The Problem
A failed 223-quote Skill 01 attempt produced a 35KB FINAL_HANDOFF.md with `gate_1_status: PARTIAL_PASS` at the project root. When the successful attempt completed, BOTH files existed simultaneously. Any downstream skill searching for "FINAL_HANDOFF.md" could find the stale version first.

### The Fix

**Before writing ANY replacement output file, VERIFY and DELETE stale artifacts:**

```
STALE ARTIFACT PROTOCOL:

BEFORE writing FINAL_HANDOFF.md:
  1. SEARCH for existing FINAL_HANDOFF.md at ALL possible locations:
     - [project]/FINAL_HANDOFF.md (root — stale from failed attempts)
     - [project]/02-proof-inventory/FINAL_HANDOFF.md (correct location)
  2. IF stale file exists at root:
     - DELETE it
     - LOG deletion in PROGRESS-LOG.md
     - UPDATE PROJECT-STATE.md stale_artifacts section
  3. ONLY THEN write the new FINAL_HANDOFF.md

AFTER any FAILED attempt:
  1. DELETE all output artifacts from the failed attempt
  2. OR clearly mark them: rename to FINAL_HANDOFF.FAILED.md
  3. LOG the failure and cleanup in PROGRESS-LOG.md
```

### Why This Matters
Downstream skills (03, 04, 05, 06, 18) consume FINAL_HANDOFF.md. A stale file with 20% of required content would silently degrade ALL subsequent skills.

---

## STRUCTURAL FIX 9: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session proof inventory projects lose continuity without persistent state files. Without PROJECT-STATE.md, expansion round progress is lost, which layers completed is forgotten, and output file locations must be rediscovered.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/02-proof-inventory/
├── PROJECT-STATE.md          # Living document — updated after every layer
├── PROGRESS-LOG.md           # Append-only timeline of all actions
├── checkpoints/              # Gate checkpoint files
│   ├── extraction-complete.yaml
│   ├── scoring-complete.yaml
│   └── LAYER_3_COMPLETE.yaml
├── DISCOVERY_LOG.md          # Layer 3 discovery findings
├── execution-log.md          # Detailed execution record
└── FINAL_HANDOFF.md          # PRIMARY DELIVERABLE (written last)
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "02-proof-inventory"
created: "[date]"
last_updated: "[date]"
current_layer: [0-4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
inputs_validated:
  research_final_handoff: [true/false]
  brief: [true/false]
stale_artifacts:
  - path: "[if any]"
    status: "[pending_deletion | DELETED]"
output_files: []  # Populated as files are created
```

**PROGRESS-LOG.md Format:**

```markdown
| Timestamp | Layer | Action | Result |
|-----------|-------|--------|--------|
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 10: BINARY GATE ENFORCEMENT (FORBIDDEN STATUSES)

### The Problem
When the initial extraction failed Gate 1, the model invented "PARTIAL_PASS" as a gate status — a status that does not exist. A 35KB FINAL_HANDOFF.md was generated with `gate_1_status: PARTIAL_PASS` and delivered as if research were complete.

### The Fix

**Gate statuses are BINARY: PASS or FAIL. No other value exists.**

```
VALID GATE STATUSES:
  ✅ PASS
  ✅ FAIL

FORBIDDEN GATE STATUSES (trigger IMMEDIATE HALT if detected):
  ❌ PARTIAL_PASS
  ❌ CONDITIONAL_PASS
  ❌ PASS_WITH_CONCERNS
  ❌ SOFT_PASS
  ❌ PASS_WITH_CAVEATS
  ❌ WARNING
  ❌ PROCEED_WITH_CONCERNS

IF any forbidden status is generated:
  1. HALT immediately
  2. DELETE any output files created under the false status
  3. RETURN to the failing layer
  4. FIX the underlying issue
  5. Re-evaluate with PASS or FAIL only
```

**Gate checkpoint files:**
- Only `LAYER_N_COMPLETE.yaml` triggers downstream (not `LAYER_N_FAILED.yaml`)
- If a gate FAILS, no checkpoint file is created — the absence of the file IS the block

---

## STRUCTURAL FIX 11: MODEL SELECTION + PERSONA ASSIGNMENTS

### The Problem
All subagents were spawned at the same model tier regardless of task complexity. Infrastructure tasks consumed opus-tier compute while analysis tasks ran on sonnet.

### The Fix

**Binding Model Assignment Table for Proof Inventory:**

| Layer | Task | Model | Persona | Rationale |
|-------|------|-------|---------|-----------|
| 0 | Validation + Routing | haiku | — | Simple input checks |
| 1 | Extraction + Classification | sonnet | EXTRACTOR | Pattern matching from source docs |
| 1 | Scoring (5 dimensions) | opus | ANALYST | Judgment-heavy composite scoring |
| 2 | Gap Analysis + Schwartz Adjustment | opus | ANALYST | Strategic analysis requiring market context |
| 2 | Promise Ceiling | opus | STRATEGIST | High-stakes strategic determination |
| 3.1 | Discovery Routing | sonnet | ROUTER | Priority mapping |
| 3.2 | Study Discovery | sonnet | SOURCE_HUNTER | Web search + extraction |
| 3.3 | Data Discovery | sonnet | SOURCE_HUNTER | Web search + extraction |
| 3.4 | Expert Quote Discovery | sonnet | SOURCE_HUNTER | Web search + extraction |
| 3.5 | Analogous Proof Discovery | opus | SYNTHESIZER | Cross-domain pattern recognition |
| 3.6-3.7 | Generation + Implementation | opus | STRATEGIST | Recommendation design |
| 4 | Ranking + Final Assembly | opus | ASSEMBLER | Full-context integration |

### Enforcement
Every subagent spawn MUST specify model and persona from this table. Ad-hoc spawns without model/persona assignment are forbidden.

---

## STRUCTURAL FIX 12: SUBAGENT STRUCTURED CONTEXT TEMPLATE

### The Problem
Layer 3 discovery subagents were spawned with ad-hoc prompts containing no structured context. They lacked awareness of the overall proof inventory, gap priorities, and output format requirements.

### The Fix

**ALL proof inventory subagents MUST receive this 8-section structured context:**

```markdown
## 1. MODEL
[Model tier from Fix 11 table]

## 2. PERSONA
[Persona from Fix 11 table + brief description]

## 3. OBJECTIVE
[Specific task: what to discover/analyze/write]

## 4. PROOF CONTEXT
- Total elements extracted: [N]
- Gaps to address: [list with severity]
- Schwartz stage: [N] — implications for proof type priority
- Mechanism to prove: [description]
- Promise to support: [description]

## 5. INPUTS
[Specific file paths and what to read from each]

## 6. CONSTRAINTS
- Minimum search queries: [N]
- Output format: [description]
- Quality thresholds: [relevant thresholds]

## 7. OUTPUT FORMAT
[Exact structure of expected output, with section headers]

## 8. COORDINATION
- Write to: [specific file path]
- Sections to write: [e.g., "Parts 4-6 of DISCOVERY_LOG.md"]
- Do NOT overwrite: [sections owned by other agents]
```

### Parallel Agent Coordination

When Layer 3 discovery is parallelized (recommended for 2-3 agents):

```
Agent 1 (sonnet/SOURCE_HUNTER): Study + Data Discovery
  → Writes DISCOVERY_LOG.md Parts 1-3

Agent 2 (sonnet/SOURCE_HUNTER): Expert Quote + Analogous Proof Discovery
  → Writes DISCOVERY_LOG.md Parts 4-6

COORDINATION RULE:
  - Agent 1 CREATES the file and writes Parts 1-3
  - Agent 2 APPENDS Parts 4-6 AFTER Agent 1 completes
  - OR: Both write to separate temp files, orchestrator merges
  - NEVER: Both write to the same file simultaneously
```

---

## KEY INSIGHT

> **"Discovery is not optional. The brief is the starting point, not the finish line."**

The Proof Inventory skill has 4 layers for a reason:
- Layer 1: Extract what exists in provided materials
- Layer 2: Score and analyze what was extracted
- **Layer 3: DISCOVER additional proof that wasn't in the brief**
- Layer 4: Package everything for downstream skills

Skipping Layer 3 means delivering only what the client already knew they had.

---

## SUMMARY

| Fix | What It Does | Why It Works |
|-----|--------------|--------------|
| 1. Discovery Log File | Tracks every discovery operation | Layer 4 can verify discovery actually happened |
| 2. Gate Checkpoint File | Physical file that must exist | Layer 4 blocked without it |
| 3. Minimum Thresholds | Study searches >= 5, Data >= 3, Expert >= 3 | Prevents "I searched once" excuse |
| 4. Forbidden Rationalizations | Explicit list of invalid excuses | Removes "loopholes" |
| 5. Proof MC-CHECK | Specific verification for proof inventory | Catches skipped layers |
| 6. Layer Execution Verification | Each layer creates checkpoint file | Cannot skip layers |
| FINAL_HANDOFF.md Mandatory | Must exist with all 11 sections, >= 50KB | Skill incomplete without deliverable |
| **7. Staged Write Protocol** | **Files >50KB written in 3 stages** | **Prevents 32K token limit failures** |
| **8. Stale Artifact Cleanup** | **Delete failed-attempt outputs before writing replacement** | **Prevents downstream contamination** |
| **9. Project Infrastructure** | **PROJECT-STATE.md + PROGRESS-LOG.md mandatory** | **Multi-session continuity preserved** |
| **10. Binary Gate Enforcement** | **PASS/FAIL only — forbidden status list** | **No invented statuses bypass gates** |
| **11. Model Selection** | **Binding model/persona table per layer** | **Right compute tier for each task** |
| **12. Structured Context** | **8-section template + parallel coordination** | **Subagents get full context, not ad-hoc prompts** |

**Instructions can be ignored. These structures cannot be bypassed.**

---

## Per-Microskill Output Protocol (v3.2)

**Added:** 2026-02-12
**Reference:** ~system/SYSTEM-CORE.md § MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | L0-validation-routing | layer-0-outputs/L0-validation-routing.md | 1KB min |
| 0 | 0.2-vault-intelligence-loader | layer-0-outputs/0.2-vault-intelligence-loader.md | 1KB min |
| 0 | 0.2.5-specimen-decomposer | layer-0-outputs/0.2.5-specimen-decomposer.md | 1KB min |
| 1 | 1.1-source-parsing | layer-1-outputs/1.1-source-parsing.md | 3KB min |
| 1 | 1.2-testimonial-extraction | layer-1-outputs/1.2-testimonial-extraction.md | 5KB min |
| 1 | 1.3-promotion-mining | layer-1-outputs/1.3-promotion-mining.md | 3KB min |
| 1 | 1.4-study-document-extraction | layer-1-outputs/1.4-study-document-extraction.md | 3KB min |
| 1 | 1.5-category-classification | layer-1-outputs/1.5-category-classification.md | 3KB min |
| 1 | 1.6-sub-type-matching | layer-1-outputs/1.6-sub-type-matching.md | 3KB min |
| 1 | 1.7-element-scoring | layer-1-outputs/1.7-element-scoring.md | 5KB min |
| 2 | 2.1-composite-score | layer-2-outputs/2.1-composite-score.md | 2KB min |
| 2 | 2.2-schwartz-adjustment | layer-2-outputs/2.2-schwartz-adjustment.md | 2KB min |
| 2 | 2.3-category-strength | layer-2-outputs/2.3-category-strength.md | 2KB min |
| 2 | 2.4-overall-strength | layer-2-outputs/2.4-overall-strength.md | 2KB min |
| 2 | 2.5-gap-detection | layer-2-outputs/2.5-gap-detection.md | 3KB min |
| 2 | 2.6-gap-severity | layer-2-outputs/2.6-gap-severity.md | 2KB min |
| 2 | 2.7-promise-ceiling | layer-2-outputs/2.7-promise-ceiling.md | 2KB min |
| 3 | 3.1-discovery-routing | layer-3-outputs/3.1-discovery-routing.md | 2KB min |
| 3 | 3.2-study-discovery | layer-3-outputs/3.2-study-discovery.md | 3KB min |
| 3 | 3.3-data-discovery | layer-3-outputs/3.3-data-discovery.md | 3KB min |
| 3 | 3.4-expert-quote-discovery | layer-3-outputs/3.4-expert-quote-discovery.md | 3KB min |
| 3 | 3.5-analogous-proof-discovery | layer-3-outputs/3.5-analogous-proof-discovery.md | 3KB min |
| 3 | 3.6-generation-recommendations | layer-3-outputs/3.6-generation-recommendations.md | 3KB min |
| 3 | 3.7-implementation-guidance | layer-3-outputs/3.7-implementation-guidance.md | 3KB min |
| 4 | 4.1-knockout-proof | layer-4-outputs/4.1-knockout-proof.md | 2KB min |
| 4 | 4.2-position-ranking | layer-4-outputs/4.2-position-ranking.md | 3KB min |
| 4 | 4.3-objection-mapping | layer-4-outputs/4.3-objection-mapping.md | 3KB min |
| 4 | 4.4-gradualization | layer-4-outputs/4.4-gradualization.md | 3KB min |
| 4 | 4.5-promise-handoff | layer-4-outputs/4.5-promise-handoff.md | 5KB min |
| 4 | 4.6-big-idea-handoff | layer-4-outputs/4.6-big-idea-handoff.md | 5KB min |
| 4 | 4.7-final-assembly | layer-4-outputs/4.7-final-assembly.md | 5KB min |

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
| 2.1 | 2026-02-12 | Added Per-Microskill Output Protocol (v3.2) — complete output file table for all 31 microskills across Layers 0, 1, 2, 3, and 4. Layer gate enhancement, execution log enhancement, forbidden behaviors. |
| 2.0 | 2026-02-12 | 6 new structural fixes from Transformation Academy Skill 02 execution. Fix 7: Staged write protocol (32K token limit hit twice on 83KB FINAL_HANDOFF.md). Fix 8: Stale artifact cleanup (35KB PARTIAL_PASS artifact contamination risk). Fix 9: Mandatory project infrastructure (PROJECT-STATE.md + PROGRESS-LOG.md). Fix 10: Binary gate enforcement with forbidden statuses (PARTIAL_PASS, CONDITIONAL_PASS, etc.). Fix 11: Model selection + persona assignments by layer (haiku/sonnet/opus binding table). Fix 12: Subagent structured context template (8-section mandatory format) + parallel Layer 3 coordination pattern. |
| 1.1 | 2026-02-08 | Added FINAL_HANDOFF.md as mandatory deliverable. Layer 4 checklist now requires FINAL_HANDOFF.md with all 11 sections (0-10), >= 50KB, complete element inventory, and populated downstream handoffs. Without FINAL_HANDOFF.md, skill is NOT complete. |
| 1.0 | 2026-02-05 | Initial creation after process failure (Layer 3 discovery skipped entirely) |
