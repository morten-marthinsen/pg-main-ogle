# A12-PERFORMANCE-LEARNING-ANTI-DEGRADATION.md

**Version:** 1.1
**Created:** 2026-02-22
**Purpose:** STRUCTURAL enforcement to prevent performance learning loop process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: A12-PERFORMANCE-LEARNING-ANTI-DEGRADATION.md v1.1
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Generate learnings from aggregate-level data without element-level attribution (vanity metrics), skip prediction-reality gap analysis when A10 predictions exist, or hold learnings in conversation context without propagating them back to A01/A02/A06/A10 engine files.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates learnings from aggregate-level data without element-level attribution (vanity metrics)
- AI declares "CTR improved 23%" without identifying WHICH hooks/headlines/angles drove the improvement
- AI skips prediction-reality gap analysis (ignoring when A10 predictions were wrong)
- AI generates learnings without WHAT/WHY/HOW/CONFIDENCE structure (untraceable learnings)
- AI holds learnings in conversation context only — never propagates back to engine files
- AI declares statistical significance from small sample sizes (creative fatigue blindness)
- AI confuses mid-flight analysis (live campaign optimization) with post-campaign analysis (engine learning)
- AI generates generic recommendations instead of actionable hook-level/element-level insights
- AI skips element decomposition (treating ads as monolithic instead of hook+headline+angle combinations)
- AI generates learnings that don't feed back into A01 (Continuous Monitor), A02 (Hook scoring), A06 (Arena criteria), A10 (Prediction calibration)

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/A12-performance-learning/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/A12-performance-learning/checkpoints/LAYER_1_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless BOTH files exist:**
```
[project]/A12-performance-learning/checkpoints/LAYER_2_COMPLETE.yaml
[project]/A12-performance-learning/checkpoints/CAMPAIGN_DATA_LOADED.yaml
```

**Layer 3.5 CANNOT execute unless this file exists:**
```
[project]/A12-performance-learning/checkpoints/LAYER_3_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless this file exists:**
```
[project]/A12-performance-learning/checkpoints/LAYER_3.5_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "A12-performance-learning"
campaign_id: "[campaign identifier]"
analysis_mode: "[mid_flight | post_campaign]"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  data_loaded:
    performance_data_complete: true
    element_level_data_exists: true
    prediction_data_loaded: true
  analysis_depth:
    aggregate_level: true
    element_level: true
    prediction_gap_analyzed: true
  learning_structure:
    what_documented: true
    why_hypothesized: true
    how_specified: true
    confidence_rated: true
  propagation_verified:
    engine_files_updated: true
    feedback_loops_closed: true

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
| **Element-level attribution** | Every learning MUST trace to specific hook/headline/angle | HALT -- Return to decomposition |
| **WHAT/WHY/HOW/CONFIDENCE** | All 4 fields populated for every learning | HALT -- Complete learning structure |
| **Prediction-reality gap analysis** | If A10 predictions exist, gap MUST be analyzed | HALT -- Compare predictions to actuals |
| **Statistical sample size** | Minimum 100 impressions per variant for significance claims | HALT -- Flag as insufficient data |
| **Propagation verification** | Learnings fed back to A01/A02/A06/A10 files | HALT -- Complete propagation |
| **Creative fatigue detection** | Performance decay over time analyzed (if campaign >7 days) | HALT -- Run fatigue analysis |
| **Hook taxonomy attribution** | Each hook learning mapped to 1 of 32 hook types | HALT -- Classify hook type |
| **Actionability test** | Every learning has specific next-campaign recommendation | HALT -- Add actionable HOW |
| **Confidence calibration** | High confidence (90%+) requires strong statistical + causal evidence | HALT -- Lower confidence or strengthen evidence |
| **Mode clarity** | Mid-flight vs post-campaign mode explicitly stated | HALT -- Declare analysis mode |

### Learning Structure Protocol

**EVERY learning MUST follow this format:**

```yaml
learning_entry:
  what: "[Specific observation with element-level attribution]"
  why: "[Causal hypothesis explaining the observation]"
  how: "[Actionable recommendation for next campaign]"
  confidence: "[0-100%] — calibrated to evidence strength"

  evidence:
    aggregate_metrics: "[CTR, CPC, CVR, etc.]"
    element_metrics: "[Specific hook/headline/angle performance]"
    sample_size: "[impression count]"
    statistical_significance: "[Y/N with p-value if applicable]"

  attribution:
    hook_type: "[1 of 32 types from AD-HOOK-TAXONOMY.md]"
    headline_pattern: "[pattern type if applicable]"
    angle_category: "[angle type if applicable]"

  propagation:
    feeds_into: "[A01 | A02 | A06 | A10]"
    engine_file_updated: "[file path]"
    update_type: "[scoring_weight | criteria_weight | prediction_model | threshold]"
```

**IF any field is empty → learning is NOT complete → HALT.**

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "Overall CTR improved 23%" | Aggregate only — no element attribution | HALT -- Decompose to hook/headline/angle level |
| "Hook B outperformed Hook A" | No WHY, no HOW, no attribution | HALT -- Add causal hypothesis + actionable recommendation |
| "This learning is obvious" | Untested assumptions masquerading as learnings | HALT -- Verify with data or mark as hypothesis |
| "Sample size too small to analyze" | Small samples can still generate hypotheses (low confidence) | CONTINUE -- Mark confidence as low (20-40%) |
| "A10 predictions were close enough" | Prediction errors are the BEST learning signal | HALT -- Analyze gap — why was prediction off? |
| "Creative fatigue isn't relevant here" | All campaigns >7 days must check for fatigue | HALT -- Run fatigue analysis |
| "I'll update engine files later" | Propagation is MANDATORY before layer complete | HALT -- Update files now |
| "This is just noise" | Noise vs signal requires statistical analysis, not dismissal | HALT -- Run statistical test or mark as inconclusive |
| "Hook type doesn't matter" | Every hook learning MUST map to taxonomy | HALT -- Classify hook type from 32 types |
| "Mid-flight and post-campaign are the same" | Different objectives, different analyses | HALT -- Declare mode and follow mode-specific protocol |

---

## STRUCTURAL FIX 4: A12-SPECIFIC MC-CHECK

```yaml
PERFORMANCE-LEARNING-MC-CHECK:
  timestamp: "[current time]"

  layer_verification:
    current_layer: [0 | 1 | 2 | 3 | 3.5 | 4]
    previous_layer_checkpoint_exists: [Y/N]
    if_no: "STOP -- Cannot proceed without checkpoint file"

  data_completeness:
    performance_data_loaded: [Y/N]
    element_level_data_exists: [Y/N]
    prediction_data_loaded: [Y/N]
    if_any_no: "STOP -- Load missing data sources"

  learning_structure_compliance:
    all_learnings_have_what: [Y/N]
    all_learnings_have_why: [Y/N]
    all_learnings_have_how: [Y/N]
    all_learnings_have_confidence: [Y/N]
    if_any_no: "STOP -- Complete learning structure for all entries"

  element_attribution_check:
    learnings_traced_to_hooks: [Y/N]
    learnings_traced_to_headlines: [Y/N]
    learnings_traced_to_angles: [Y/N]
    aggregate_only_learnings_exist: [Y/N]
    if_aggregate_only: "STOP -- Decompose to element level"

  prediction_gap_analysis:
    a10_predictions_exist: [Y/N]
    if_yes_gap_analyzed: [Y/N]
    if_yes_and_no_gap: "STOP -- Compare predictions to actuals"

  propagation_verification:
    learnings_feed_to_a01: [Y/N]
    learnings_feed_to_a02: [Y/N]
    learnings_feed_to_a06: [Y/N]
    learnings_feed_to_a10: [Y/N]
    engine_files_updated: [Y/N]
    if_no_propagation: "STOP -- Update engine files before proceeding"

  mode_clarity_check:
    analysis_mode_declared: [mid_flight | post_campaign | UNCLEAR]
    if_unclear: "STOP -- Declare mid-flight or post-campaign mode"

  rationalization_check:
    am_i_using_aggregate_only: [Y/N]
    am_i_skipping_why_how: [Y/N]
    am_i_ignoring_prediction_gap: [Y/N]
    am_i_deferring_propagation: [Y/N]
    if_any_yes: "HALT -- Rationalization detected"

  result: [CONTINUE | HALT_DATA | HALT_STRUCTURE | HALT_ATTRIBUTION | HALT_PROPAGATION | HALT_MODE]
```

---

## STRUCTURAL FIX 5: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Performance learning requires tracking across multiple campaigns and time periods. Without persistent state files, which campaigns were analyzed, which learnings were generated, and which propagations were completed is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/A12-performance-learning/
  PROJECT-STATE.md          # Living document -- updated after every campaign analysis
  PROGRESS-LOG.md           # Append-only timeline of all analyses
  checkpoints/              # Gate checkpoint files
  execution-log.md          # Detailed execution record
  layer-0-outputs/          # Per-microskill output files
  layer-1-outputs/
  layer-2-outputs/
  layer-3-outputs/
  layer-3.5-outputs/
  layer-4-outputs/
  learning-database/        # Accumulated learnings across campaigns
  propagation-log/          # Tracking which engine files were updated
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "A12-performance-learning"
created: "[date]"
last_updated: "[date]"
current_campaign: "[campaign ID]"
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
analysis_mode: "[mid_flight | post_campaign]"

campaigns_analyzed:
  - campaign_id: "[ID]"
    analysis_date: "[date]"
    analysis_mode: "[mid_flight | post_campaign]"
    learnings_generated: [count]
    propagations_completed: [count]
    status: "COMPLETE"
  - campaign_id: "[ID]"
    status: "IN_PROGRESS"
    current_layer: [N]

learning_database_stats:
  total_learnings: [count]
  hook_learnings: [count]
  headline_learnings: [count]
  angle_learnings: [count]
  high_confidence_learnings: [count (90%+)]

propagation_log_stats:
  a01_updates: [count]
  a02_updates: [count]
  a06_updates: [count]
  a10_updates: [count]
  last_propagation_date: "[date]"
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
  "sufficient confidence" / "confidence is reasonable"
  "sample size is adequate" / "statistically acceptable"

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

BEFORE writing learning outputs or propagation files:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/learning-summary.md (root -- from failed attempts)
     - [project]/A12-performance-learning/layer-4-outputs/learning-summary.md (correct)
     - [project]/outputs/learning-summary.md (wrong path)
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

**Session startup protocol -- BEFORE any performance learning execution:**

```
SESSION STARTUP:
  1. READ this file (A12-PERFORMANCE-LEARNING-ANTI-DEGRADATION.md) -- MANDATORY
  2. READ A12-PERFORMANCE-LEARNING-AGENT.md -- agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for campaign position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin performance learning without reading this anti-degradation file first.
```

---

## Per-Microskill Output Protocol (v3.2)

**Reference:** ./CLAUDE.md MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.0.1-vertical-profile-loader | layer-0-outputs/0.0.1-vertical-profile-loader.md | 1KB |
| 0 | 0.1-performance-data-loader | layer-0-outputs/0.1-performance-data-loader.md | 2KB |
| 0 | 0.2-variant-matrix-loader | layer-0-outputs/0.2-variant-matrix-loader.md | 2KB |
| 0 | 0.3-prediction-loader | layer-0-outputs/0.3-prediction-loader.md | 2KB |
| 0 | 0.4-benchmark-loader | layer-0-outputs/0.4-benchmark-loader.md | 2KB |
| 0 | 0.5-input-validator | layer-0-outputs/0.5-input-validator.md | 1KB |
| 1 | 1.1-platform-normalizer | layer-1-outputs/1.1-platform-normalizer.md | 2KB |
| 1 | 1.2-per-variant-calculator | layer-1-outputs/1.2-per-variant-calculator.md | 3KB |
| 1 | 1.3-time-series-builder | layer-1-outputs/1.3-time-series-builder.md | 3KB |
| 1 | 1.4-classification-engine | layer-1-outputs/1.4-classification-engine.md | 3KB |
| 2 | 2.1-prediction-comparison | layer-2-outputs/2.1-prediction-comparison.md | 3KB |
| 2 | 2.2-divergence-analysis | layer-2-outputs/2.2-divergence-analysis.md | 5KB |
| 2 | 2.3-scoring-model-audit | layer-2-outputs/2.3-scoring-model-audit.md | 3KB |
| 2 | 2.4-hook-type-performance | layer-2-outputs/2.4-hook-type-performance.md | 3KB |
| 2 | 2.5-element-attribution | layer-2-outputs/2.5-element-attribution.md | 3KB |
| 3 | 3.1-hook-learnings | layer-3-outputs/3.1-hook-learnings.md | 5KB |
| 3 | 3.2-visual-learnings | layer-3-outputs/3.2-visual-learnings.md | 5KB |
| 3 | 3.3-platform-learnings | layer-3-outputs/3.3-platform-learnings.md | 3KB |
| 3 | 3.4-fatigue-learnings | layer-3-outputs/3.4-fatigue-learnings.md | 3KB |
| 3 | 3.5-prediction-learnings | layer-3-outputs/3.5-prediction-learnings.md | 3KB |
| 3 | 3.6-learning-validator | layer-3-outputs/3.6-learning-validator.md | 3KB |
| 3.5 | 3.5.1-a01-intelligence-update | layer-3.5-outputs/3.5.1-a01-intelligence-update.md | 3KB |
| 3.5 | 3.5.2-a02-hook-scoring-update | layer-3.5-outputs/3.5.2-a02-hook-scoring-update.md | 3KB |
| 3.5 | 3.5.3-a06-arena-criteria-update | layer-3.5-outputs/3.5.3-a06-arena-criteria-update.md | 3KB |
| 3.5 | 3.5.4-a10-prediction-model-update | layer-3.5-outputs/3.5.4-a10-prediction-model-update.md | 3KB |
| 3.5 | 3.5.5-vertical-profile-update | layer-3.5-outputs/3.5.5-vertical-profile-update.md | 3KB |
| 4 | 4.1-report-assembler | layer-4-outputs/4.1-report-assembler.md | 5KB |
| 4 | 4.2-execution-log | layer-4-outputs/4.2-execution-log.md | 3KB |
| 4 | 4.3-checkpoint-files | layer-4-outputs/4.3-checkpoint-files.md | 2KB |

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

## A12-SPECIFIC DEGRADATION PATTERNS

### Pattern 1: Vanity Metrics Instead of Actionable Learnings

**What It Looks Like:**
```yaml
# BAD
learning:
  what: "CTR improved 23% over baseline"
  why: "Better creative"
  how: "Keep making better creative"
  confidence: 80%
```

**Why It's Broken:**
- No element-level attribution (WHICH hook/headline/angle?)
- Circular reasoning ("better creative" is not a causal hypothesis)
- Non-actionable HOW (what specifically should change?)

**Required Fix:**
```yaml
# GOOD
learning:
  what: "UGC testimonial hooks with specific timeframe claims (3-week, 30-day) generated 2.3x hook rate vs curiosity hooks without timeframes"
  why: "Timeframe specificity increases credibility perception in health vertical; UGC format bypasses ad blindness"
  how: "A02 hook scoring: Increase timeframe_specificity weight from 0.15 to 0.25 for health vertical testimonial hooks. A11 hook generation: Prioritize timeframe inclusion in first 3 seconds of UGC testimonials."
  confidence: 85%

  evidence:
    aggregate_metrics: "CTR 4.2% vs 1.8%"
    element_metrics: "Hook-07 (UGC 30-day) 4.8% CTR, Hook-03 (curiosity no-timeframe) 1.6% CTR"
    sample_size: "12,400 impressions per variant"
    statistical_significance: "Y (p < 0.01)"

  attribution:
    hook_type: "UGC_TESTIMONIAL_RESULT (Type 18)"
    timeframe_pattern: "specific (30-day)"
    vertical: "health"

  propagation:
    feeds_into: "A02"
    engine_file_updated: "skills/ads/A02-hook-scoring/scoring-weights-health.yaml"
    update_type: "scoring_weight (timeframe_specificity: 0.15 → 0.25)"
```

### Pattern 2: Aggregate-Only Analysis (No Element Decomposition)

**What It Looks Like:**
- "Ad Set 3 outperformed Ad Set 1 by 18%"
- No breakdown of WHICH element (hook/headline/angle) drove the difference

**Why It's Broken:**
- Can't propagate learnings to engine (which file to update?)
- Can't replicate success (what specifically worked?)
- Wastes performance signal

**Required Fix:**
1. Decompose EVERY ad into hook + headline + angle
2. Compare performance across EACH element dimension
3. Attribute variance to specific elements
4. Generate element-level learnings

### Pattern 3: Prediction-Reality Gap Ignored

**What It Looks Like:**
- A10 predicted Hook A would outperform Hook B
- Reality: Hook B outperformed Hook A by 2.1x
- AI moves on without analyzing WHY the prediction was wrong

**Why It's Broken:**
- Prediction errors are the RICHEST learning signal
- Engine can't calibrate without feedback
- Same prediction errors will repeat

**Required Fix:**
1. ALWAYS compare A10 predictions to actual results
2. For EVERY prediction error, generate gap analysis:
   - What A10 predicted and why
   - What actually happened
   - Hypothesis for the gap
   - Recommended A10 model update

### Pattern 4: Untraceable Learnings (No Structure)

**What It Looks Like:**
```
"Shock value hooks perform well in finance vertical"
```

**Why It's Broken:**
- No WHAT (which specific shock value pattern?)
- No WHY (causal hypothesis?)
- No HOW (actionable next step?)
- No CONFIDENCE (how certain are we?)

**Required Fix:**
EVERY learning MUST have WHAT/WHY/HOW/CONFIDENCE structure (see STRUCTURAL FIX 2).

### Pattern 5: Learnings Not Propagated

**What It Looks Like:**
- Learnings generated and documented
- Never fed back to A01/A02/A06/A10 files
- Next campaign starts with same outdated weights/criteria

**Why It's Broken:**
- Engine doesn't learn
- Performance gains are one-time, not compounding
- Same mistakes repeat

**Required Fix:**
Layer 3.5 (Learning Propagation) is MANDATORY and BLOCKING in Post-Campaign mode. Cannot complete A12 without updating engine files.

### Pattern 6: Statistical Insignificance Declared as Learning

**What It Looks Like:**
- "Hook A beat Hook B" (140 impressions each, 0.3% CTR difference)
- Declares this as learning with 70% confidence

**Why It's Broken:**
- Sample size too small for significance
- Noise vs signal not distinguished
- False learnings pollute database

**Required Fix:**
1. Minimum 100 impressions per variant for significance claims
2. Run statistical test (chi-square for CTR differences)
3. If p > 0.05, mark as inconclusive or hypothesis (confidence 20-40%)
4. Flag in learning database as "requires validation"

### Pattern 7: Creative Fatigue Blindness

**What It Looks Like:**
- Campaign runs 14 days
- CTR Day 1-3: 3.2%
- CTR Day 12-14: 1.8%
- AI declares "overall CTR 2.4%" without analyzing decay

**Why It's Broken:**
- Misses creative fatigue signal
- Can't recommend refresh timing
- Overstates sustainable performance

**Required Fix:**
For campaigns >7 days, MANDATORY creative fatigue analysis:
1. Plot performance over time
2. Detect decay curves
3. Estimate optimal refresh window
4. Generate refresh recommendation

### Pattern 8: Mid-Flight vs Post-Campaign Mode Confusion

**What It Looks Like:**
- AI mixes live optimization recommendations (pause underperformers) with engine learning (update scoring weights)
- Unclear whether analysis is for THIS campaign or NEXT campaign

**Why It's Broken:**
- Different objectives require different analyses
- Mid-flight: optimize current spend
- Post-campaign: extract learnings for future

**Required Fix:**
1. Declare mode at Layer 1 (mid_flight or post_campaign)
2. Mid-flight: optimization recommendations, budget reallocation
3. Post-campaign: engine learning extraction, propagation to A01/A02/A06/A10

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 5, 8):
[ ] A12-PERFORMANCE-LEARNING-ANTI-DEGRADATION.md read (THIS FILE)
[ ] A12-PERFORMANCE-LEARNING-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] learning-database/ directory created
[ ] propagation-log/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 7)

LAYER 0 -- FOUNDATION & LOADING (haiku):
[ ] Vertical profile loaded (0.0.1)
[ ] Campaign performance data loaded (0.1)
[ ] Variant matrix loaded from A09 (0.2)
[ ] A10 prediction data loaded (0.3)
[ ] Competitive benchmarks + hook taxonomy loaded (0.4)
[ ] Input validator confirms completeness (0.5)
[ ] LAYER_0_COMPLETE.yaml created
[ ] CAMPAIGN_DATA_LOADED.yaml created

LAYER 1 -- PERFORMANCE DATA INGESTION & METRIC CALCULATION (sonnet):
[ ] Platform data normalized to unified schema (1.1)
[ ] Per-variant metrics calculated (CPA, ROAS, CTR, hook rate, etc.) (1.2)
[ ] Time-series built with fatigue curves (1.3)
[ ] Variants classified as Winner/Performer/Loser/Insufficient (1.4)
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 -- PREDICTION VS REALITY ANALYSIS (opus):
[ ] A10 predictions compared against actual performance (2.1)
[ ] Divergence analysis with causal hypotheses (2.2)
[ ] Scoring model audit -- which criteria predicted real performance (2.3)
[ ] Hook type performance mapped against taxonomy benchmarks (2.4)
[ ] Element attribution -- which elements drove variance (2.5)
[ ] LAYER_2_COMPLETE.yaml created

LAYER 3 -- LEARNING EXTRACTION (opus):
[ ] Hook learnings extracted with WHAT/WHY/HOW/CONFIDENCE (3.1)
[ ] Visual learnings extracted (3.2)
[ ] Platform learnings extracted (3.3)
[ ] Fatigue learnings extracted (3.4)
[ ] Prediction learnings extracted (3.5)
[ ] All learnings validated -- minimum 10, full structure (3.6)
[ ] LAYER_3_COMPLETE.yaml created

LAYER 3.5 -- LEARNING PROPAGATION (opus, POST-CAMPAIGN ONLY):
[ ] A01 intelligence updated with campaign data (3.5.1)
[ ] A02 hook scoring weights updated (3.5.2)
[ ] A06 Arena criteria weights updated (3.5.3)
[ ] A10 prediction model calibrated (3.5.4)
[ ] Vertical profile updated with campaign learnings (3.5.5)
[ ] All engine file updates logged in propagation-log/
[ ] LAYER_3.5_COMPLETE.yaml created

LAYER 4 -- OUTPUT PACKAGING (sonnet):
[ ] Primary report assembled (PERFORMANCE-LEARNING-REPORT.md 50KB+ or MID-FLIGHT-LEARNING.md 15KB+) (4.1)
[ ] Execution log produced with per-microskill entries (4.2)
[ ] All checkpoint files created and verified (4.3)
[ ] LAYER_4_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated with campaign completion
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] All propagations verified
[ ] Learning database updated

ON CONTEXT RESUME:
[ ] VERIFY data completeness (element-level exists)
[ ] VERIFY learnings have full structure (WHAT/WHY/HOW/CONFIDENCE)
[ ] VERIFY propagation completed (engine files updated)
[ ] If propagation skipped, RETURN to Layer 3.5
```

---

## KEY INSIGHTS

> **Law 1: "Data beats predictions. When data and predictions conflict, data wins — always, completely, without negotiation."**

> **Law 2: "Learnings must be actionable. 'Hook B outperformed Hook A' is observation, not learning. Every learning must contain WHAT happened, WHY it happened (hypothesis), and HOW to apply it (specific recommendation)."**

> **Law 3: "Element-level attribution is non-negotiable. Aggregate-only analysis is vanity metrics. Every learning must trace to specific hook/headline/angle."**

> **"Performance learning without propagation is performance theater. If learnings don't feed back to A01/A02/A06/A10, the engine doesn't learn."**

> **"Creative fatigue is WHEN, not IF. All campaigns >7 days must analyze decay curves and estimate refresh windows."**

> **"Prediction-reality gaps are the richest learning signal. Every A10 error is a gift — analyze it, understand it, calibrate from it."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation with 8 structural fixes, per-microskill output table (18 microskills), implementation checklist, A12-specific degradation patterns (8 patterns: vanity metrics, aggregate-only analysis, prediction gap ignored, untraceable learnings, no propagation, statistical insignificance, creative fatigue blindness, mid-flight vs post-campaign confusion). Full A12 anti-degradation architecture. |
| 1.1 | 2026-02-25 | Aligned layer architecture to match AGENT.md (authoritative). Layers 0-5 scheme replaced with 0/1/2/3/3.5/4. Per-microskill output table updated from 18 to 30 microskills matching AGENT.md (6 Layer 0, 4 Layer 1, 5 Layer 2, 6 Layer 3, 5 Layer 3.5, 3 Layer 4). Checkpoint files updated (LAYER_3.5_COMPLETE.yaml replaces LAYER_5_COMPLETE.yaml). Directory structure updated (layer-3.5-outputs/ replaces layer-5-outputs/). MC-CHECK valid layers updated. Implementation checklist layer descriptions aligned with AGENT.md layer names and functions. |
