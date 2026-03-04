# RESEARCH-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent research process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

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

## SUMMARY

| Fix | What It Does | Why It Works |
|-----|--------------|--------------|
| Checkpoint Files | Gate pass creates a physical file | Layer 2 skills can check if file exists |
| Progress Tracking | Tracks items processed vs scraped | Makes sampling visible and unacceptable |
| Forbidden Rationalizations | Explicit list of invalid excuses | Removes "loopholes" |
| Context Resume Verification | Forces re-verification on resume | Prevents compaction from preserving lies |
| Research MC-CHECK | Periodic self-monitoring | Catches degradation mid-execution |
| Validator Creates File | File existence = gate passed | Structural instead of instructional |

**Instructions can be ignored. These structures cannot be bypassed.**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-05 | Initial creation after catastrophic failure (121/1000 quotes delivered, "conditional pass" invented) |
