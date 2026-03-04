# PROOF-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent proof inventory process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

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
LAYER 1 (EXTRACTION):
[ ] Source files parsed
[ ] Testimonials extracted
[ ] Promotions mined
[ ] Studies documented
[ ] Elements classified and scored
[ ] extraction-complete.yaml created

LAYER 2 (SCORING):
[ ] Composite scores calculated
[ ] Schwartz adjustments applied
[ ] Category strengths calculated
[ ] Gaps detected
[ ] Promise ceiling calculated
[ ] scoring-complete.yaml created

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

LAYER 4 (OUTPUT):
[ ] Verify all checkpoint files exist
[ ] Knockout proof selected
[ ] Position rankings created
[ ] Objection mappings complete
[ ] Gradualization sequence created
[ ] Promise handoff packaged
[ ] Final output assembled

ON CONTEXT RESUME:
[ ] DO NOT trust summary claims about layer completion
[ ] RE-READ checkpoint files
[ ] VERIFY DISCOVERY_LOG.md exists and is complete
[ ] If discovery was skipped, RETURN to Layer 3
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
| Discovery Log File | Tracks every discovery operation | Layer 4 can verify discovery actually happened |
| Gate Checkpoint File | Physical file that must exist | Layer 4 blocked without it |
| Minimum Thresholds | Study searches >= 5, Data searches >= 3, Expert searches >= 3 | Prevents "I searched once" excuse |
| Forbidden Rationalizations | Explicit list of invalid excuses | Removes "loopholes" |
| Proof MC-CHECK | Specific verification for proof inventory | Catches skipped layers |
| Layer Execution Verification | Each layer creates checkpoint file | Cannot skip layers |

**Instructions can be ignored. These structures cannot be bypassed.**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-05 | Initial creation after process failure (Layer 3 discovery skipped entirely) |
