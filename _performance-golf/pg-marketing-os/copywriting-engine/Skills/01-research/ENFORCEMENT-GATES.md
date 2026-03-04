# Deep Research System - ENFORCEMENT GATES

**Version:** 1.0
**Created:** 2026-01-29
**Purpose:** MANDATORY stopping points that CANNOT be bypassed
**Authority:** This document has EQUAL authority to RESEARCH-PRD.md

---

## WHY THIS DOCUMENT EXISTS

**Root Cause of Previous Failures:**
- PRD requirements exist but can be skipped
- Validator skills exist but aren't forced to run
- Layer transitions happen without validation
- Human checkpoints can be bypassed
- Final handoff attempts synthesis instead of assembly

**This document creates HARD STOPS that PHYSICALLY PREVENT progression.**

---

## CRITICAL EXECUTION RULE

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  BEFORE EXECUTING ANY SKILL, CHECK THE GATE FOR THAT LAYER.                  │
│                                                                               │
│  IF THE GATE IS CLOSED → YOU CANNOT RUN SKILLS IN THAT LAYER.               │
│  THERE ARE NO EXCEPTIONS. NO "I'LL VALIDATE LATER."                         │
│  NO "I'LL JUST DO A QUICK DRAFT."                                           │
│                                                                               │
│  GATES ARE BINARY. OPEN OR CLOSED. NO CONDITIONAL PASSAGE.                   │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## GATE 0: LAYER 1 ENTRY GATE

**Condition:** Can Layer 1 skills execute?

**OPEN IF:**
- [ ] Research brief exists with all required fields
- [ ] market_config.yaml created with all 7 sections
- [ ] Project folder structure created
- [ ] PRD loaded and cached

**CLOSED IF:**
- Any above condition is FALSE

**ENFORCEMENT:**
```
BEFORE any Layer 1 skill (1.0 through 1.6):
  CHECK: market_config.yaml exists?
  IF NO → HALT: "Cannot start Layer 1 - market configuration missing"

  CHECK: project folder exists?
  IF NO → HALT: "Cannot start Layer 1 - project not initialized"
```

---

## GATE 1: LAYER 1 → LAYER 2 TRANSITION (HARD BLOCK)

**Condition:** Can Layer 2 skills execute?

**MANDATORY VALIDATION BEFORE PROCEEDING:**

```yaml
GATE_1_CHECKLIST:
  # You MUST run this checklist BEFORE any Layer 2 skill

  quote_volume:
    total_quotes:
      minimum: 1000
      actual: [COUNT FROM scored_quotes.json]
      status: PASS | BLOCKED

    pain_quotes:
      minimum: 300
      actual: [COUNT WHERE bucket = "pain"]
      status: PASS | BLOCKED

    hope_quotes:
      minimum: 250
      actual: [COUNT WHERE bucket = "hope"]
      status: PASS | BLOCKED

    root_cause_quotes:
      minimum: 200
      actual: [COUNT WHERE bucket = "root_cause"]
      status: PASS | BLOCKED

    solutions_tried_quotes:
      minimum: 150
      actual: [COUNT WHERE bucket = "solutions_tried"]
      status: PASS | BLOCKED

    competitor_mechanism_quotes:
      minimum: 100
      actual: [COUNT WHERE bucket = "competitor_mechanism"]
      status: PASS | BLOCKED

    villain_quotes:
      minimum: 75
      actual: [COUNT WHERE bucket = "villain"]
      status: PASS | BLOCKED

  structural_requirements:
    numbered_quote_system:
      requirement: "All quotes have IDs (P-XXX, H-XXX, etc.)"
      status: PASS | BLOCKED

    pain_hope_pairs:
      minimum: 25
      actual: [COUNT FROM pain_hope_pairs.json]
      status: PASS | BLOCKED

    why_how_pairs:
      minimum: 25
      actual: [COUNT FROM why_how_pairs.json]
      status: PASS | BLOCKED

    mechanisms_mapped:
      minimum: 15
      actual: [COUNT FROM mechanism_map.json]
      status: PASS | BLOCKED

  layer1_validator:
    ran_1.6-A: YES | NO
    validator_verdict: PASS | FAIL

  GATE_STATUS:
    IF any status = "BLOCKED" → GATE CLOSED
    IF layer1_validator.ran_1.6-A = NO → GATE CLOSED
    IF layer1_validator.validator_verdict = FAIL → GATE CLOSED
    ELSE → GATE OPEN
```

**HARD ENFORCEMENT:**

```
BEFORE any Layer 2 skill (2.1 through 2.8):

  STEP 1: COUNT QUOTES
  ─────────────────────
  READ scored_quotes.json
  total = COUNT(all quotes)

  IF total < 1000:
    OUTPUT: "
    ┌─────────────────────────────────────────────────────────────┐
    │  GATE 1 BLOCKED - INSUFFICIENT QUOTES                       │
    │                                                              │
    │  Required: 1,000 quotes                                      │
    │  Actual:   [total] quotes                                    │
    │  Deficit:  [1000 - total] quotes                            │
    │                                                              │
    │  ACTION: Return to Layer 1.4 and expand scraping.           │
    │          DO NOT attempt Layer 2 skills.                     │
    │          This gate CANNOT be bypassed.                      │
    └─────────────────────────────────────────────────────────────┘
    "
    HALT EXECUTION

  STEP 2: COUNT BUCKETS
  ─────────────────────
  pain = COUNT(quotes WHERE bucket = "pain")
  hope = COUNT(quotes WHERE bucket = "hope")
  root_cause = COUNT(quotes WHERE bucket = "root_cause")
  solutions_tried = COUNT(quotes WHERE bucket = "solutions_tried")
  competitor_mechanism = COUNT(quotes WHERE bucket = "competitor_mechanism")
  villain = COUNT(quotes WHERE bucket = "villain")

  bucket_failures = []
  IF pain < 300: bucket_failures.append("Pain: {pain}/300")
  IF hope < 250: bucket_failures.append("Hope: {hope}/250")
  IF root_cause < 200: bucket_failures.append("Root Cause: {root_cause}/200")
  IF solutions_tried < 150: bucket_failures.append("Solutions Tried: {solutions_tried}/150")
  IF competitor_mechanism < 100: bucket_failures.append("Competitor Mechanism: {competitor_mechanism}/100")
  IF villain < 75: bucket_failures.append("Villain: {villain}/75")

  IF bucket_failures NOT EMPTY:
    OUTPUT: "
    ┌─────────────────────────────────────────────────────────────┐
    │  GATE 1 BLOCKED - BUCKET MINIMUMS NOT MET                   │
    │                                                              │
    │  Failed buckets:                                            │
    │  [list each bucket_failure]                                 │
    │                                                              │
    │  ACTION: Return to Layer 1.4-1.5 and expand.                │
    │          DO NOT attempt Layer 2 skills.                     │
    └─────────────────────────────────────────────────────────────┘
    "
    HALT EXECUTION

  STEP 3: VERIFY VALIDATOR RAN
  ────────────────────────────
  CHECK: layer1_validation_report.md exists?
  CHECK: gate_decision.json exists AND status = "pass"?

  IF EITHER NO:
    OUTPUT: "
    ┌─────────────────────────────────────────────────────────────┐
    │  GATE 1 BLOCKED - VALIDATOR NOT RUN                         │
    │                                                              │
    │  Layer 1 Validator (1.6-A) must run before Layer 2.         │
    │  Run skill 1.6-A-layer1-validator now.                      │
    │                                                              │
    │  DO NOT skip the validator.                                 │
    └─────────────────────────────────────────────────────────────┘
    "
    HALT EXECUTION

  STEP 4: GATE OPENS
  ──────────────────
  IF all checks pass:
    LOG: "GATE 1 OPEN - Proceeding to Layer 2"
    PROCEED
```

---

## GATE 2: LAYER 2 → LAYER 2.5 TRANSITION

**Condition:** Can Layer 2.5 synthesis skills execute?

**MANDATORY VALIDATION:**

```yaml
GATE_2_CHECKLIST:
  layer2_outputs:
    web_analysis.json: EXISTS | MISSING
    belief_inventory.json: EXISTS | MISSING
    now_after_grid.json: EXISTS | MISSING
    market_sophistication.json: EXISTS | MISSING
    mechanism_map.json: EXISTS | MISSING
    villain_inventory.json: EXISTS | MISSING
    competitor_offer_analysis.json: EXISTS | MISSING
    market_intelligence.md: EXISTS | MISSING
    voice_of_customer_analysis.md: EXISTS | MISSING

  layer2_validator:
    ran_2.6-A: YES | NO
    validator_verdict: PASS | FAIL

  e5_requirements:
    web_analysis_complete: YES | NO  # Wants, Emotions, Beliefs all populated
    belief_categories_complete: YES | NO  # WHY, WHAT, WHO, HOW all present
    now_after_grid_complete: YES | NO  # All 4 quadrants populated
    mechanisms_count: [actual] >= 15

  GATE_STATUS:
    IF any output = MISSING → GATE CLOSED
    IF layer2_validator.ran_2.6-A = NO → GATE CLOSED
    IF layer2_validator.validator_verdict = FAIL → GATE CLOSED
    IF any e5_requirement = NO → GATE CLOSED
    ELSE → GATE OPEN
```

**HARD ENFORCEMENT:**

```
BEFORE any Layer 2.5 skill (2.5-A through 2.5-G):

  CHECK: layer2_validation_report.md exists?
  CHECK: gate_decision.json status = "pass"?

  IF NO:
    HALT: "GATE 2 BLOCKED - Layer 2 validator (2.6-A) must pass first"

  CHECK: All required Layer 2 output files exist?

  IF ANY MISSING:
    HALT: "GATE 2 BLOCKED - Missing Layer 2 outputs: [list missing files]"
```

---

## GATE 2.5: LAYER 2.5 → LAYER 3 TRANSITION (HUMAN CHECKPOINT)

**Condition:** Can Layer 3 opportunity skills execute?

**MANDATORY VALIDATION:**

```yaml
GATE_2.5_CHECKLIST:
  layer2.5_artifacts:
    transformation_pairs.md:
      exists: YES | NO
      pair_count: [actual] >= 25

    educational_pairs.md:
      exists: YES | NO
      pair_count: [actual] >= 25

    web_synthesis.md:
      exists: YES | NO
      all_categories_populated: YES | NO

    transformation_grid.md:
      exists: YES | NO
      all_dimensions_populated: YES | NO

    language_patterns.md:
      exists: YES | NO
      gold_phrase_count: [actual] >= 10

    final_categorization.md:
      exists: YES | NO
      quote_count_matches_input: YES | NO

    SYNTHESIS_VALIDATION.md:
      exists: YES | NO

  human_checkpoint:
    presented_to_human: YES | NO
    human_response: APPROVED | REVISE | REJECT | PENDING

  GATE_STATUS:
    IF any artifact missing → GATE CLOSED
    IF any minimum not met → GATE CLOSED
    IF human_checkpoint.human_response != APPROVED → GATE CLOSED
    ELSE → GATE OPEN
```

**HARD ENFORCEMENT:**

```
BEFORE any Layer 3 skill (3.1-A through 3.4-A):

  STEP 1: VERIFY ALL 7 ARTIFACTS EXIST
  ────────────────────────────────────
  artifacts = [
    "transformation_pairs.md",
    "educational_pairs.md",
    "web_synthesis.md",
    "transformation_grid.md",
    "language_patterns.md",
    "final_categorization.md",
    "SYNTHESIS_VALIDATION.md"
  ]

  FOR each artifact:
    CHECK: layer-2-5-outputs/{artifact} exists?
    IF NO: missing.append(artifact)

  IF missing NOT EMPTY:
    OUTPUT: "
    ┌─────────────────────────────────────────────────────────────┐
    │  GATE 2.5 BLOCKED - MISSING SYNTHESIS ARTIFACTS             │
    │                                                              │
    │  Required artifacts not found:                              │
    │  [list each missing artifact]                               │
    │                                                              │
    │  ACTION: Run the corresponding Layer 2.5 skill first.       │
    │          DO NOT attempt Layer 3 without all 7 artifacts.    │
    └─────────────────────────────────────────────────────────────┘
    "
    HALT EXECUTION

  STEP 2: VERIFY HUMAN APPROVAL
  ─────────────────────────────
  CHECK: Was SYNTHESIS_VALIDATION.md presented to human?
  CHECK: Did human respond with "APPROVED"?

  IF NOT APPROVED:
    OUTPUT: "
    ┌─────────────────────────────────────────────────────────────┐
    │  GATE 2.5 BLOCKED - HUMAN APPROVAL REQUIRED                 │
    │                                                              │
    │  Layer 2.5 human checkpoint has not been approved.          │
    │                                                              │
    │  ACTION: Present SYNTHESIS_VALIDATION.md to human.          │
    │          Wait for explicit APPROVED response.               │
    │          DO NOT auto-approve. DO NOT skip.                  │
    └─────────────────────────────────────────────────────────────┘
    "
    HALT EXECUTION
```

---

## GATE 3: PRE-FINAL-HANDOFF ASSEMBLY GATE

**Condition:** Can FINAL_HANDOFF.md be assembled?

**CRITICAL RULE:**
```
┌──────────────────────────────────────────────────────────────────────────────┐
│  FINAL_HANDOFF.md IS ASSEMBLY ONLY.                                          │
│                                                                               │
│  IT DOES NOT:                                                                │
│  - Generate new analysis                                                     │
│  - Create new insights                                                       │
│  - Synthesize data                                                           │
│  - Fill gaps with generated content                                          │
│                                                                               │
│  IT ONLY:                                                                    │
│  - Combines pre-validated artifacts into a single document                   │
│  - Formats content into the required structure                               │
│  - Preserves all quote IDs and attribution                                   │
│                                                                               │
│  IF ANY ARTIFACT IS MISSING → HALT AND RETURN TO SOURCE SKILL               │
│  DO NOT ATTEMPT TO GENERATE MISSING CONTENT INLINE                          │
└──────────────────────────────────────────────────────────────────────────────┘
```

**MANDATORY PRE-ASSEMBLY CHECKLIST:**

```yaml
GATE_3_CHECKLIST:
  layer1_complete:
    scored_quotes.json: EXISTS | MISSING
    total_quotes: [count] >= 1000
    all_bucket_minimums_met: YES | NO
    pain_hope_pairs.json: EXISTS & count >= 25
    why_how_pairs.json: EXISTS & count >= 25
    layer1_validation_report.md: EXISTS & status = PASS

  layer2_complete:
    web_analysis.json: EXISTS
    belief_inventory.json: EXISTS
    now_after_grid.json: EXISTS
    market_intelligence.md: EXISTS
    layer2_validation_report.md: EXISTS & status = PASS

  layer2.5_complete:
    transformation_pairs.md: EXISTS & count >= 25
    educational_pairs.md: EXISTS & count >= 25
    web_synthesis.md: EXISTS & all_categories_populated
    transformation_grid.md: EXISTS & all_dimensions
    language_patterns.md: EXISTS & gold_phrases >= 10
    final_categorization.md: EXISTS & count = total_quotes
    SYNTHESIS_VALIDATION.md: EXISTS
    human_checkpoint_2.5: APPROVED

  layer3_complete:
    ranked_opportunities.json: EXISTS & count >= 5
    evidence_packages.json: EXISTS
    objection_responses.json: EXISTS & all_8_categories
    risk_factors.json: EXISTS
    action_sequence.json: EXISTS
    measurement_framework.json: EXISTS
    opportunity_map.md: EXISTS

  ASSEMBLY_AUTHORIZATION:
    IF ALL above = YES/EXISTS/PASS → AUTHORIZED
    IF ANY fails → NOT AUTHORIZED - identify missing artifact
```

**HARD ENFORCEMENT:**

```
BEFORE creating FINAL_HANDOFF.md:

  RUN GATE_3_CHECKLIST

  IF any artifact MISSING:
    OUTPUT: "
    ┌─────────────────────────────────────────────────────────────┐
    │  FINAL HANDOFF BLOCKED - MISSING PREREQUISITES              │
    │                                                              │
    │  Cannot assemble FINAL_HANDOFF.md without all artifacts.    │
    │                                                              │
    │  Missing:                                                   │
    │  [list each missing artifact with source skill]             │
    │                                                              │
    │  ACTION: Return to the source skill and generate artifact.  │
    │          DO NOT attempt to generate content during handoff. │
    │          Handoff is ASSEMBLY only.                          │
    └─────────────────────────────────────────────────────────────┘
    "
    HALT EXECUTION

  IF ALL artifacts present:
    LOG: "All prerequisites verified. Beginning FINAL_HANDOFF.md assembly."
    PROCEED with assembly (NOT synthesis)
```

---

## REAL-TIME QUOTE COUNTER PROTOCOL

**Purpose:** Prevent proceeding with insufficient quotes by forcing explicit counting.

**WHEN TO COUNT:**
1. After EVERY scraping session (1.4)
2. After EVERY extraction session (1.5)
3. Before ANY Layer 2 skill
4. During Layer 1 validation (1.6)

**COUNTER FORMAT:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  QUOTE VOLUME CHECK - [timestamp]                                           │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ BUCKET          │ REQUIRED │ ACTUAL │ STATUS     │ DEFICIT            │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │ TOTAL           │ 1,000    │ [X]    │ PASS/FAIL  │ [1000-X if fail]   │ │
│  │ Pain            │ 300      │ [X]    │ PASS/FAIL  │ [deficit]          │ │
│  │ Hope            │ 250      │ [X]    │ PASS/FAIL  │ [deficit]          │ │
│  │ Root Cause      │ 200      │ [X]    │ PASS/FAIL  │ [deficit]          │ │
│  │ Solutions Tried │ 150      │ [X]    │ PASS/FAIL  │ [deficit]          │ │
│  │ Competitor Mech │ 100      │ [X]    │ PASS/FAIL  │ [deficit]          │ │
│  │ Villain         │ 75       │ [X]    │ PASS/FAIL  │ [deficit]          │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  OVERALL: [PASS - proceed] or [FAIL - expand before proceeding]            │
└─────────────────────────────────────────────────────────────────────────────┘
```

**MANDATORY OUTPUT:**
After every scraping/extraction session, this table MUST be produced.
If ANY row shows FAIL, expansion is REQUIRED before Layer 2.

---

## STATE LOCK MECHANISM

**Purpose:** Prevent phase skipping by tracking current state.

**STATE TRANSITIONS:**

```
INIT → LAYER_1 → GATE_1_CHECK → LAYER_2 → GATE_2_CHECK → LAYER_2.5 →
       GATE_2.5_CHECK → LAYER_3 → GATE_3_CHECK → FINAL_HANDOFF
```

**VALID TRANSITIONS:**
- INIT → LAYER_1 (always allowed)
- LAYER_1 → GATE_1_CHECK (after 1.6 validator)
- GATE_1_CHECK → LAYER_2 (only if gate = OPEN)
- GATE_1_CHECK → LAYER_1 (if gate = CLOSED, must expand)
- LAYER_2 → GATE_2_CHECK (after 2.6 validator)
- GATE_2_CHECK → LAYER_2.5 (only if gate = OPEN)
- GATE_2_CHECK → LAYER_2 (if gate = CLOSED)
- LAYER_2.5 → GATE_2.5_CHECK (after human checkpoint)
- GATE_2.5_CHECK → LAYER_3 (only if human APPROVED)
- LAYER_3 → GATE_3_CHECK (after opportunity map)
- GATE_3_CHECK → FINAL_HANDOFF (only if all artifacts exist)

**INVALID TRANSITIONS (BLOCKED):**
- LAYER_1 → LAYER_2 (must go through GATE_1_CHECK)
- LAYER_1 → LAYER_2.5 (cannot skip)
- LAYER_1 → LAYER_3 (cannot skip)
- LAYER_2 → LAYER_3 (must go through LAYER_2.5)
- ANY → FINAL_HANDOFF (without GATE_3_CHECK)

**ENFORCEMENT:**
```
current_state = READ FROM context.yaml

BEFORE executing any skill:
  target_layer = DETERMINE from skill number (e.g., 2.1 = LAYER_2)

  IF target_layer > current_state + 1:
    HALT: "Invalid state transition: Cannot jump from {current_state} to {target_layer}"

  IF target_layer = current_state + 1:
    CHECK: Did previous gate pass?
    IF NO: HALT: "Gate not passed - cannot proceed to {target_layer}"
```

---

## FAILURE RECOVERY PROTOCOL

**When a gate fails:**

1. **IDENTIFY** which criterion failed
2. **LOG** the failure with specifics
3. **DO NOT** attempt to patch or work around
4. **RETURN** to the appropriate layer/skill
5. **EXPAND** to meet the requirement
6. **RE-VALIDATE** through the gate
7. **ONLY PROCEED** when gate opens

**Example:**
```
GATE 1 FAILED: Pain quotes = 234 (required 300)

ACTION:
1. Return to 1.4-C (Reddit scraper) or 1.4-A (Forum scraper)
2. Generate additional queries targeting pain expressions
3. Scrape additional sources
4. Re-run 1.5 extraction and classification
5. Re-run 1.6-A validator
6. Re-check GATE 1
7. Only proceed when Pain >= 300 AND total >= 1000
```

---

## AUDIT TRAIL REQUIREMENT

**Every gate check MUST be logged:**

```yaml
gate_audit:
  gate_id: "GATE_1"
  timestamp: "[ISO 8601]"
  check_results:
    - criterion: "total_quotes"
      required: 1000
      actual: [value]
      status: "PASS" | "FAIL"
    - criterion: "pain_quotes"
      required: 300
      actual: [value]
      status: "PASS" | "FAIL"
    # ... all criteria
  overall_status: "OPEN" | "CLOSED"
  action_taken: "PROCEED" | "EXPAND" | "HALT"

Save to: projects/[project]/validation-logs/gate_[X]_[timestamp].yaml
```

---

## SUMMARY: THE NON-NEGOTIABLE GATES

| Gate | Blocks | Key Criterion | Cannot Bypass |
|------|--------|---------------|---------------|
| GATE 0 | Layer 1 start | market_config.yaml exists | TRUE |
| GATE 1 | Layer 1 → 2 | 1000+ quotes, all bucket mins | TRUE |
| GATE 2 | Layer 2 → 2.5 | All E5 outputs complete | TRUE |
| GATE 2.5 | Layer 2.5 → 3 | 7 artifacts + HUMAN APPROVED | TRUE |
| GATE 3 | → Final Handoff | ALL artifacts exist | TRUE |

**THERE ARE NO EXCEPTIONS. GATES ARE BINARY. OPEN OR CLOSED.**

---

*This enforcement document was created 2026-01-29 after catastrophic process failure where:*
- *Only 150 quotes were collected (required: 1000+)*
- *Layer 2.5 was entirely skipped*
- *Final handoff was attempted without required artifacts*
- *Human checkpoints were bypassed*

*These gates exist to prevent this from ever happening again.*
