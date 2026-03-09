# A10-PRE-LAUNCH-SCORING-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-22
**Purpose:** STRUCTURAL enforcement to prevent pre-launch scoring skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: A10-PRE-LAUNCH-SCORING-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Assign scores without uncertainty/confidence ranges (creating false precision), score variants based on "vibes" instead of tracing each score to specific evidence from A01/A06/benchmarks, or define kill/scale criteria without connecting to budget math and the 3x AOV formula.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI assigns precise scores (8.7, 9.1, 7.3) without uncertainty ranges, creating false confidence
- AI generates plausible-sounding scores based on "vibes" rather than tracing each score to specific evidence from A01 intelligence, A06 Arena results, or industry benchmarks
- AI scores variants in isolation, ignoring competitive context from A01
- AI gives all variants scores in the 7-8 range, making prioritization impossible
- AI focuses on creative quality and ignores platform policy risk (compliance)
- AI guesses at fatigue timelines without referencing A01 data on how long competitor ads actually ran
- AI recommends "test these first" without connecting to budget, AOV, or the testing volume formula (weekly spend / (3 x AOV))

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/A10-pre-launch-scoring/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/A10-pre-launch-scoring/checkpoints/LAYER_1_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/A10-pre-launch-scoring/checkpoints/LAYER_2_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/A10-pre-launch-scoring/checkpoints/LAYER_3_COMPLETE.yaml
```

**A11 (Launch Package) BLOCKED unless this file exists:**
```
[project]/A10-pre-launch-scoring/checkpoints/LAYER_4_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "A10-pre-launch-scoring"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  all_variants_scored: [Y/N]  # Must be Y for Layer 1+
  all_scores_have_evidence: [Y/N]  # Must be Y for Layer 1+
  all_scores_have_confidence_ranges: [Y/N]  # Must be Y for Layer 1+
  variants_ranked: [Y/N]  # Must be Y for Layer 2+
  tiers_assigned: [Y/N]  # Must be Y for Layer 2+
  testing_strategy_complete: [Y/N]  # Must be Y for Layer 3+
  budget_allocation_correct: [Y/N]  # Must be Y for Layer 3+
  scorecard_assembled: [Y/N]  # Must be Y for Layer 4
  scorecard_size_kb: [number]  # Must be >= 30 for Layer 4
  human_approval_received: [Y/N]  # BLOCKING for A11

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
| **Variants scored (all 5 dimensions)** | 100% of A09 variants | HALT -- Complete scoring |
| **Evidence citations per score** | 2 minimum | HALT -- Add evidence citations |
| **Confidence ranges** | 100% of scores | HALT -- Express confidence ranges |
| **Compliance score for Tier 1** | >= 6 (no flags) | HALT -- Remove or resolve |
| **Tier 1 count vs min creatives/week** | <= min creatives/week | HALT -- Reduce Tier 1 count |
| **Composite score minimum (Tier 1)** | >= 7.0 | HALT -- Re-evaluate tier cuts |
| **Budget allocation sum** | = weekly ad spend | HALT -- Fix budget math |
| **Kill criteria specificity** | 3x AOV exact | HALT -- Define specific thresholds |
| **Scale criteria specificity** | Target CPA exact | HALT -- Define specific metrics |
| **PRE-LAUNCH-SCORECARD.md size** | >= 30KB | HALT -- Re-assemble with detail |
| **Required sections populated** | 12/12 sections | HALT -- Complete missing sections |

### Data Source Requirements

**BEFORE ANY SCORING:**

```yaml
data_source_protocol:
  step_1: "VERIFY A09 Assembled Variant Matrix loaded"
  step_2: "VERIFY A01 Ad Intelligence Handoff loaded (>= 100KB)"
  step_3: "VERIFY A06 Ad Arena Results loaded"
  step_4: "VERIFY Campaign Brief loaded with KPIs, budget, AOV"
  step_5: "VERIFY AD-HOOK-TAXONOMY.md benchmarks loaded"
  step_6: "OPTIONAL: Check for A12 Performance Learning (historical data)"

  IF any_required_missing:
    HALT -- "Cannot score variants without upstream data sources"
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "This variant feels strong" | Feelings are not evidence. Every score needs a data citation. | HALT -- Cite specific evidence from A01/A06/benchmarks |
| "All variants are roughly equal" | If all variants score the same, the scoring is insufficiently differentiated. | HALT -- Re-examine scoring methodology |
| "Compliance isn't an issue for this vertical" | EVERY vertical has compliance constraints. Golf has the fewest, not zero. | HALT -- Check vertical compliance constraints |
| "Fatigue prediction is too speculative" | Fatigue prediction is uncertain, but A01 data provides concrete benchmarks. Uncertainty is expressed via confidence ranges, not skipped entirely. | HALT -- Score fatigue with confidence ranges |
| "The budget details aren't important for scoring" | Testing strategy without budget math is not strategy. Budget determines Tier 1 size, kill thresholds, and scale capacity. | HALT -- Load campaign budget from brief |
| "Close enough" / "approximately" | Numbers are exact. $300 kill threshold means $300. 3x AOV is exact. | HALT -- Use exact numbers |
| "The Arena scores are sufficient" | Arena scores are ONE of 5 data sources. A10 integrates A01 competitive context, benchmarks, compliance, and fatigue — Arena alone is incomplete. | HALT -- Score all 5 dimensions |
| "Partial pass" / "conditional pass" | Does not exist. Gates are PASS or FAIL only. | HALT -- Gates are binary |
| "These are all good variants" | If no variant is in Tier 3, the scoring is insufficiently critical. Some variants MUST be worse than others. | HALT -- Force meaningful differentiation |
| "We can figure out kill criteria during the campaign" | Kill criteria must be pre-defined. Deciding when to kill DURING the campaign leads to emotional attachment and overspending on losers. | HALT -- Define kill criteria now |

---

## STRUCTURAL FIX 4: A10-SPECIFIC MC-CHECK

```yaml
PRE-LAUNCH-SCORING-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [0 | 1 | 2 | 3 | 4]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP -- Cannot proceed without checkpoint file"

  data_source_verification:
    a09_variant_matrix_loaded: [Y/N]
    a01_intelligence_loaded: [Y/N]
    a01_intelligence_size_kb: [number]
    a06_arena_scores_loaded: [Y/N]
    campaign_brief_loaded: [Y/N]
    benchmarks_loaded: [Y/N]
    if_any_no: "STOP -- Load all required data sources"

  scoring_completeness:
    total_variants: [number]
    variants_scored_all_5_dimensions: [number]
    percentage_complete: [number]
    all_scores_have_evidence: [Y/N]
    all_scores_have_confidence_ranges: [Y/N]
    if_any_no: "STOP -- Complete scoring before proceeding"

  differentiation_check:
    score_range_width: [number]  # max - min composite score
    if_under_2: "STOP -- Insufficient differentiation. Re-examine scoring."
    variants_in_tier_3: [number]
    if_zero: "STOP -- Some variants MUST be worse. Force critical evaluation."

  compliance_verification:
    compliance_flags_count: [number]
    compliance_flags_in_tier_1: [number]
    if_tier_1_flags_greater_than_zero: "STOP -- Remove flagged variants from Tier 1"

  budget_math_verification:
    weekly_ad_spend: [dollar amount]
    aov: [dollar amount]
    min_creatives_per_week: [number]
    kill_threshold_3x_aov: [dollar amount]
    tier_1_count: [number]
    tier_1_within_budget: [Y/N]
    if_no: "STOP -- Reduce Tier 1 count or increase budget"

  testing_strategy_verification:
    kill_criteria_specific: [Y/N]
    scale_criteria_specific: [Y/N]
    budget_allocation_sums_correctly: [Y/N]
    if_any_no: "STOP -- Fix testing strategy before packaging"

  rationalization_check:
    am_i_scoring_without_data: [Y/N]
    am_i_giving_uniform_scores: [Y/N]
    am_i_ignoring_compliance: [Y/N]
    am_i_skipping_fatigue: [Y/N]
    am_i_disconnecting_from_budget: [Y/N]
    am_i_expressing_false_precision: [Y/N]
    am_i_thinking_these_are_all_good: [Y/N]
    if_any_yes: "HALT -- Rationalization detected"

  result: [CONTINUE | HALT_DATA | HALT_SCORING | HALT_DIFFERENTIATION | HALT_COMPLIANCE | HALT_BUDGET | HALT_STRATEGY]
```

---

## STRUCTURAL FIX 5: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session scoring projects lose continuity without persistent state files. Without PROJECT-STATE.md, which variants were scored and which tiers were assigned is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/A10-pre-launch-scoring/
  PROJECT-STATE.md          # Living document -- updated after every layer
  PROGRESS-LOG.md           # Append-only timeline of all actions
  checkpoints/              # Gate checkpoint files
  execution-log.md          # Detailed execution record
  layer-0-outputs/          # Per-microskill output files
  layer-1-outputs/
  layer-2-outputs/
  layer-3-outputs/
  layer-4-outputs/
  PRE-LAUNCH-SCORECARD.md   # Primary deliverable (30KB minimum)
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "A10-pre-launch-scoring"
created: "[date]"
last_updated: "[date]"
current_layer: [0 | 1 | 2 | 3 | 4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"

variant_inventory:
  total_variants_from_a09: [integer]
  variants_scored_all_5_dimensions: [integer]
  variants_ranked: [integer]
  tier_1_count: [integer]
  tier_2_count: [integer]
  tier_3a_count: [integer]
  tier_3b_count: [integer]

campaign_numbers:
  weekly_ad_spend: "[dollar amount]"
  aov: "[dollar amount]"
  min_creatives_per_week: "[integer]"
  kill_threshold: "[dollar amount]"
  target_funnel_stage: "[awareness | consideration | conversion]"
  campaign_timeline_weeks: [integer]

gate_status:
  GATE_0: [PASS/PENDING]
  GATE_1: [PASS/FAIL/PENDING]
  GATE_2: [PASS/FAIL/PENDING]
  GATE_3: [PASS/FAIL/PENDING]
  GATE_4: [PASS/FAIL/PENDING]

key_decisions:
  - "[None yet]"

next_action:
  - "[Initialize project]"
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
  approved (human approval received)
  revision (return to previous layer)
  blocked (return to earlier layer)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  approved_with_concerns / conditional_approval
  PROCEED_WITH_CONCERNS / WARNING
  "good enough" / "acceptable for now"
  "scores are close enough" / "approximately meets threshold"
  "most variants scored" / "sufficient for prioritization"

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

BEFORE writing scorecard or layer output files:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/PRE-LAUNCH-SCORECARD.md (correct location)
     - [project]/A10-pre-launch-scoring/PRE-LAUNCH-SCORECARD.md (alternate)
     - [project]/outputs/scorecard.md (wrong path)
     - [project]/layer-[N]-outputs/[file].md (previous attempts)
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

**Session startup protocol -- BEFORE any pre-launch scoring execution:**

```
SESSION STARTUP:
  1. READ this file (A10-PRE-LAUNCH-SCORING-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ A10-PRE-LAUNCH-SCORING-AGENT.md -- agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current layer and counts
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin scoring without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Reference:** ./CLAUDE.md MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.0.1-vertical-profile-loader | layer-0-outputs/0.0.1-vertical-profile-loader.md | 1KB |
| 0 | 0.1-variant-matrix-loader | layer-0-outputs/0.1-variant-matrix-loader.md | 1KB |
| 0 | 0.2-competitive-intelligence-loader | layer-0-outputs/0.2-competitive-intelligence-loader.md | 2KB |
| 0 | 0.3-arena-scores-loader | layer-0-outputs/0.3-arena-scores-loader.md | 2KB |
| 0 | 0.4-campaign-brief-loader | layer-0-outputs/0.4-campaign-brief-loader.md | 1KB |
| 0 | 0.5-benchmark-loader | layer-0-outputs/0.5-benchmark-loader.md | 2KB |
| 1 | 1.1-scroll-stop-scorer | layer-1-outputs/1.1-scroll-stop-scorer.md | 3KB |
| 1 | 1.2-engagement-scorer | layer-1-outputs/1.2-engagement-scorer.md | 3KB |
| 1 | 1.3-conversion-scorer | layer-1-outputs/1.3-conversion-scorer.md | 3KB |
| 1 | 1.4-compliance-scorer | layer-1-outputs/1.4-compliance-scorer.md | 3KB |
| 1 | 1.5-fatigue-scorer | layer-1-outputs/1.5-fatigue-scorer.md | 3KB |
| 1 | 1.6-scoring-validator | layer-1-outputs/1.6-scoring-validator.md | 2KB |
| 2 | 2.1-composite-score-calculator | layer-2-outputs/2.1-composite-score-calculator.md | 3KB |
| 2 | 2.2-forced-ranking | layer-2-outputs/2.2-forced-ranking.md | 3KB |
| 2 | 2.3-tier-assignment | layer-2-outputs/2.3-tier-assignment.md | 5KB |
| 2 | 2.4-ranking-validator | layer-2-outputs/2.4-ranking-validator.md | 2KB |
| 3 | 3.1-testing-sequence-planner | layer-3-outputs/3.1-testing-sequence-planner.md | 3KB |
| 3 | 3.2-budget-allocation | layer-3-outputs/3.2-budget-allocation.md | 3KB |
| 3 | 3.3-kill-criteria | layer-3-outputs/3.3-kill-criteria.md | 3KB |
| 3 | 3.4-scale-criteria | layer-3-outputs/3.4-scale-criteria.md | 3KB |
| 3 | 3.5-testing-strategy-validator | layer-3-outputs/3.5-testing-strategy-validator.md | 2KB |
| 4 | 4.1-scorecard-assembler | layer-4-outputs/4.1-scorecard-assembler.md | 5KB |
| 4 | 4.2-execution-log | layer-4-outputs/4.2-execution-log.md | 3KB |
| 4 | 4.3-checkpoint-files | layer-4-outputs/4.3-checkpoint-files.md | 1KB |

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
[ ] A10-PRE-LAUNCH-SCORING-ANTI-DEGRADATION.md read (THIS FILE)
[ ] A10-PRE-LAUNCH-SCORING-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 7)
[ ] All input files validated (A09, A01, A06, brief, benchmarks)

LAYER 0 (LOADING):
[ ] A09 Assembled Variant Matrix loaded
[ ] Total variant count extracted
[ ] A01 Ad Intelligence Handoff loaded (>= 100KB)
[ ] A06 Ad Arena Results loaded
[ ] Campaign Brief loaded (KPIs, budget, AOV)
[ ] Testing volume formula calculated: min creatives/week = weekly spend / (3 x AOV)
[ ] Kill threshold calculated: 3 x AOV
[ ] AD-HOOK-TAXONOMY.md benchmarks loaded
[ ] A12 Performance Learning loaded (if available)
[ ] LAYER_0_COMPLETE.yaml created

LAYER 1 (INDIVIDUAL VARIANT SCORING):
[ ] Scroll-stop scored for ALL variants (1.1)
[ ] Engagement scored for ALL variants (1.2)
[ ] Conversion scored for ALL variants (1.3)
[ ] Compliance scored for ALL variants (1.4)
[ ] Fatigue scored for ALL variants (1.5)
[ ] All scores have confidence ranges (not just point estimates)
[ ] All scores cite 2+ evidence sources (A01/A06/benchmarks)
[ ] Compliance flags (score <= 3) documented
[ ] Scoring completeness check passed (1.6)
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (COMPARATIVE ANALYSIS & TIER ASSIGNMENT):
[ ] Composite scores calculated with weights (2.1)
[ ] Confidence-adjusted composite calculated
[ ] All variants force-ranked (no ties at tier boundaries) (2.2)
[ ] Tier 1 assigned (composite >= 7.0, compliance >= 6) (2.3)
[ ] Tier 1 count <= min_creatives_per_week
[ ] Tier 2 assigned (composite >= 5.5, compliance >= 5)
[ ] Tier 3A (revise) and 3B (cut) assigned
[ ] All Tier 3 variants have documented reasons
[ ] Tier distribution validated (2.4)
[ ] No compliance flags in Tier 1 or Tier 2
[ ] LAYER_2_COMPLETE.yaml created

LAYER 3 (TESTING STRATEGY):
[ ] Testing sequence planned (Week 1, 2-3, 3+) (3.1)
[ ] Budget allocated per variant (daily and weekly) (3.2)
[ ] Budget allocation sums to total weekly spend
[ ] Per-variant daily spend >= minimum threshold
[ ] Reserve budget allocated (20-30% held for scaling)
[ ] Kill criteria defined (3x AOV per variant) (3.3)
[ ] Scale criteria defined (target CPA with 3+ conversions) (3.4)
[ ] Testing strategy validation passed (3.5)
[ ] Timeline accounts for platform ad review delays
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (OUTPUT PACKAGING):
[ ] PRE-LAUNCH-SCORECARD.md assembled (4.1)
[ ] Scorecard file size >= 30KB
[ ] All 12 required sections populated (see Output Schema)
[ ] Individual scorecards for ALL variants (not just Tier 1)
[ ] Force-ranked variant list complete
[ ] Tier 1/2/3 sections complete with rationale
[ ] Compliance risk register complete
[ ] Fatigue forecast complete
[ ] Testing strategy complete (sequence, budget, kill/scale)
[ ] Prediction confidence disclosure present
[ ] Human approval section ready (checkboxes)
[ ] Execution-log.md produced (4.2)
[ ] All checkpoint files created (4.3)
[ ] LAYER_4_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated with skill completion
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified (per-microskill + scorecard)
[ ] Human approval REQUESTED for scorecard
[ ] Learning log updated with any catches/fixes

HUMAN APPROVAL (BLOCKING FOR A11):
[ ] Scorecard presented to human stakeholder
[ ] Human approval received OR specific feedback documented
[ ] If approved: HUMAN_APPROVAL_RECEIVED.yaml created
[ ] If feedback: Return to appropriate layer for revision

ON CONTEXT RESUME:
[ ] VERIFY all data sources loaded (check execution log)
[ ] VERIFY variants fully scored (check LAYER_1_COMPLETE.yaml)
[ ] VERIFY tier assignments exist (check LAYER_2_COMPLETE.yaml)
[ ] VERIFY testing strategy complete (check LAYER_3_COMPLETE.yaml)
[ ] If any gaps found, RETURN to appropriate layer
```

---

## KEY INSIGHT

> **"Prediction is probabilistic, not certain. Every score is an estimate with a confidence range. Anyone claiming to KNOW how an ad will perform before launch is lying. The data narrows the range; it does not eliminate uncertainty."**

> **"A brilliant ad that gets rejected by Meta ad review has ZERO performance. Compliance is not optional. It is a gate."**

> **"Testing strategy without budget math is not strategy. Budget determines Tier 1 size, kill thresholds, and scale capacity."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation with 8 structural fixes, per-microskill output table (23 microskills across 5 layers), implementation checklist. Full A10 anti-degradation architecture covering: (1) overconfident predictions, (2) scoring without data, (3) ignoring competitive context, (4) uniform scoring, (5) ignoring compliance, (6) predicting fatigue without data, (7) testing recommendations without math. Key enforcement: all scores MUST cite 2+ evidence sources, all scores MUST have confidence ranges, tier differentiation REQUIRED, compliance is a gate (score <= 3 caps composite at 4.0), testing strategy MUST connect to budget math (testing volume formula, 3x AOV kill threshold, exact dollar amounts). A10-specific MC-CHECK with 7 rationalization checks. Human approval BLOCKING for A11. |
