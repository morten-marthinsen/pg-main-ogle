# A12 -- Performance Learning Loop

**Version:** 1.1
**Created:** 2026-02-22
**Updated:** 2026-02-27 (Meta Ad Spy as performance data source)
**Role:** Workflow Orchestrator (State Machine)
**Skill Type:** Analysis / Intelligence Feedback
**Pipeline Position:** Final Ad Engine skill. Executes POST-LAUNCH after real performance data is collected. Feeds learnings back into A01 (Continuous Monitor), A02 (Hook scoring weights), A06 (Arena criteria weights), A10 (Prediction calibration).
**Related Documents:**
- `./skills/ads/AD-ENGINE-CLAUDE.md` (Ad Engine master)
- `./skills/protocols/LEARNING-CAPTURE-PROTOCOL.md` (CopywritingEngine learning architecture)
- `./References/AD-HOOK-TAXONOMY.md` (32 hook types, 10 categories, performance benchmarks)
- `./CLAUDE.md` (CopywritingEngine master -- metacognitive, gates, anti-degradation)
**Anti-Degradation Document:** `A12-PERFORMANCE-LEARNING-ANTI-DEGRADATION.md` (MANDATORY -- read BEFORE execution)

---

## TABLE OF CONTENTS

- [THE 3 LAWS OF PERFORMANCE LEARNING (Never Scroll Past This)](#the-3-laws-of-performance-learning-never-scroll-past-this)
- [CRITICAL: READ THIS FIRST](#critical-read-this-first)
- [PURPOSE](#purpose)
- [IDENTITY](#identity)
- [TWO OPERATIONAL MODES](#two-operational-modes)
- [MODEL ASSIGNMENT TABLE (Binding)](#model-assignment-table-binding)
- [STATE MACHINE](#state-machine)
- [PERFORMANCE METRICS REFERENCE](#performance-metrics-reference)
- [LAYER ARCHITECTURE](#layer-architecture)
- [MANDATORY FIRST READS](#mandatory-first-reads)
- [PERFORMANCE DATA REQUIREMENTS](#performance-data-requirements)
- [GATE ENFORCEMENT](#gate-enforcement)
- [FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)](#forbidden-rationalizations-immediate-halt)
- [Current Phase](#current-phase)
- [Data Ingestion Status](#data-ingestion-status)
- [Analysis Progress](#analysis-progress)
- [Gate Status](#gate-status)
- [Key Decisions](#key-decisions)
- [Next Action](#next-action)
- [Timestamp](#timestamp)
- [OUTPUT SCHEMA: PERFORMANCE-LEARNING-REPORT.md](#output-schema-performance-learning-reportmd)
- [Metadata](#metadata)
- [Section 1: Executive Summary](#section-1-executive-summary)
- [Section 2: Variant Classification](#section-2-variant-classification)
- [Section 3: Prediction vs Reality Analysis](#section-3-prediction-vs-reality-analysis)
- [Section 4: Hook Type Performance](#section-4-hook-type-performance)
- [Section 5: Element Attribution Analysis](#section-5-element-attribution-analysis)
- [Section 6: Extracted Learnings](#section-6-extracted-learnings)
- [Section 7: Engine Propagation Status](#section-7-engine-propagation-status)
- [Section 8: Next Campaign Recommendations](#section-8-next-campaign-recommendations)
- [GATE ARCHITECTURE -- COMPLETE REFERENCE](#gate-architecture----complete-reference)
- [ANTI-DEGRADATION ENFORCEMENT](#anti-degradation-enforcement)
- [SUBAGENT CONTEXT TEMPLATE](#subagent-context-template)
- [1. MODEL](#1-model)
- [2. PERSONA](#2-persona)
- [3. OBJECTIVE](#3-objective)
- [4. ANALYSIS TARGETS](#4-analysis-targets)
- [5. INPUTS](#5-inputs)
- [6. CONSTRAINTS](#6-constraints)
- [7. ERROR HANDLING](#7-error-handling)
- [8. OUTPUT FORMAT](#8-output-format)
- [PER-MICROSKILL OUTPUT PROTOCOL](#per-microskill-output-protocol)
- [Execution Context](#execution-context)
- [Output](#output)
- [Quality Metrics](#quality-metrics)
- [MID-FLIGHT ANALYSIS PROTOCOL](#mid-flight-analysis-protocol)
- [Metadata](#metadata-1)
- [Early Performance Signals](#early-performance-signals)
- [Kill Recommendations](#kill-recommendations)
- [Fatigue Alerts](#fatigue-alerts)
- [Preliminary Learnings (to be validated in Post-Campaign)](#preliminary-learnings-to-be-validated-in-post-campaign)
- [Next Mid-Flight Analysis](#next-mid-flight-analysis)
- [INTEGRATION WITH LEARNING CAPTURE PROTOCOL](#integration-with-learning-capture-protocol)
- [FORBIDDEN BEHAVIORS (A12-Specific)](#forbidden-behaviors-a12-specific)
- [MC-CHECK SCHEDULE](#mc-check-schedule)
- [VERSION HISTORY](#version-history)

---

## THE 3 LAWS OF PERFORMANCE LEARNING (Never Scroll Past This)

1. **Data beats predictions.** A10 predicted which variants would win. Reality decided. When data and predictions conflict, data wins -- always, completely, without negotiation. The engine's job is to UPDATE its model of reality, not defend its previous predictions.

2. **Learnings must be actionable.** "Hook B outperformed Hook A" is observation, not learning. "Hook B outperformed Hook A because UGC testimonial hooks with specific timeframe claims (3-week, 30-day) generate 2.3x the hook rate of curiosity hooks without timeframes in the health vertical on Meta" is actionable learning. Every learning must contain: WHAT happened, WHY it happened (hypothesis), and HOW to apply it (specific recommendation for next campaign).

3. **The loop must close.** Learnings that stay in a report are dead. A12 does not just ANALYZE performance -- it PROPAGATES learnings back into the engine files that future campaigns will read. Updated hook scoring weights in A02. Updated prediction models in A10. Updated competitive intelligence in A01. Updated Arena criteria weights in A06. If the engine files are not modified, A12 has failed regardless of how brilliant the analysis is.

---

## CRITICAL: READ THIS FIRST

This file exists because **performance learning has its own degradation patterns** distinct from ad creation and distinct from competitive intelligence:

1. **Vanity metric focus** -- LLM fixates on impressions, reach, and engagement instead of the metrics that matter: CPA, ROAS, hook rate, and conversion rate. A variant with 10M impressions and $200 CPA is a loser; a variant with 100K impressions and $15 CPA is a winner.

2. **Aggregate-only analysis** -- LLM calculates campaign-level averages and declares "the campaign performed well." This hides the variant-level insight that 3 variants carried 80% of conversions while 27 variants burned budget. Variant-level analysis is mandatory.

3. **Prediction-reality gap ignored** -- A10 made specific predictions about which variants would win. LLM ignores these predictions and analyzes performance in isolation. The COMPARISON between prediction and reality is where the engine calibrates. Skipping it means the engine never learns from its mistakes.

4. **Untraceable learnings** -- LLM produces generic learnings like "video ads performed well" without tracing back to specific hook types, visual styles, or script structures in the variant matrix. If a learning can't be traced to a specific element in the A09 variant matrix, it's noise.

5. **Learnings not propagated** -- LLM writes a beautiful analysis report, declares A12 complete, and never updates the engine files. The next campaign launches with the same prediction models, the same hook scoring weights, the same Arena criteria. Zero improvement. This is the most common and most damaging failure mode.

6. **Statistical insignificance declared as learning** -- LLM sees a 5% performance difference on $50 of spend and declares a "winner." Minimum spend thresholds and confidence intervals exist for a reason. Premature conclusions are worse than no conclusions because they create false confidence.

7. **Creative fatigue blindness** -- LLM looks at aggregate performance across the full run but misses that a "losing" variant actually outperformed for 3 days before creative fatigue killed it. Time-series analysis is mandatory -- aggregate numbers hide fatigue curves.

**This file is the fix.** Before executing A12, read the relevant sections below.

---

## PURPOSE

Close the performance learning loop by ingesting **actual campaign performance data**, comparing it against **A10 predictions**, extracting **actionable learnings** about which creative elements worked and why, and **propagating those learnings back into the engine files** that future campaigns will read.

A12 answers the questions the engine cannot answer from internal scoring alone:
- Which hook types actually stopped the scroll? Does this match the 32-type taxonomy's benchmark data?
- Which visual styles drove engagement? Did UGC outperform polished production as expected?
- Which CTAs converted? Which funnel stages had the highest drop-off?
- Which variants were winners (hit KPIs), performers (close), or losers (missed badly)?
- Where did A10's predictions match reality? Where did they diverge? What caused the divergence?
- How quickly did each variant fatigue? What was the creative fatigue curve?
- What vertical-specific patterns emerged that should update the vertical profile?
- What platform-specific patterns emerged that should update platform intelligence?

**Success Criteria:**
- ALL variant performance data ingested and mapped to A09 variant matrix
- Per-variant metrics calculated (not just campaign-level aggregates)
- A10 predictions compared against actual performance with divergence analysis
- Winners, performers, and losers classified with sufficient statistical basis
- Creative fatigue curves analyzed with time-series data
- Hook type performance mapped against AD-HOOK-TAXONOMY.md benchmarks
- Minimum 10 actionable learnings extracted with WHAT/WHY/HOW structure
- Engine files ACTUALLY UPDATED (A01 intelligence, A02 hook scoring, A06 Arena weights, A10 prediction model)
- PERFORMANCE-LEARNING-REPORT.md produced at 50KB+ minimum
- All 8 required sections populated with substantive analysis (not summaries)

This agent is a **workflow orchestrator**. It delegates data ingestion, analysis, and propagation to subagents and validates outputs at each gate. It produces intelligence that makes the NEXT campaign better than this one.

---

## IDENTITY

**This skill IS:**
- The engine's self-correction mechanism -- comparing what it predicted against what actually happened
- The performance data ingestion pipeline -- normalizing metrics across platforms into a unified view
- The variant-level performance analyzer -- every variant gets individually assessed, not just campaign aggregates
- The prediction calibration system -- updating A10's scoring model based on reality
- The creative element decoder -- tracing performance back to specific hook types, visual styles, script structures
- The creative fatigue analyst -- measuring how quickly each variant's performance degraded over time
- The learning propagation system -- writing updated weights, benchmarks, and intelligence back into engine files
- The bridge between A11 (Launch Package) and A01 (Continuous Monitor) -- completing the circle

**This skill is NOT:**
- An ad rewriter (that is A04/A07 -- A12 produces learnings, not new copy)
- A media buying optimizer (A12 analyzes creative performance, not audience targeting or bid strategies)
- A general campaign performance report (A12 focuses specifically on CREATIVE element performance)
- A replacement for platform analytics dashboards (A12 is an overlay that adds creative element attribution)
- A one-time analysis (A12 should run at regular intervals during a campaign, not just at the end)
- An ad intelligence tool (that is A01 -- A12 analyzes OUR ads, A01 analyzes COMPETITOR ads)

**Upstream:** Receives actual performance data (client-provided), A10 SCORING-REPORT.md (predictions), A09 AD-VARIANT-MATRIX/ (variant definitions), A01 AD-INTELLIGENCE-HANDOFF.md (competitive benchmarks), A02 HOOK-ANGLE-MATRIX.md (hook classifications)
**Downstream:** Feeds learnings back to A01 (Continuous Monitor update), A02 (hook scoring weight adjustments), A06 (Arena criteria weight adjustments), A10 (prediction model calibration), Vertical Profiles (vertical-specific learnings)

---

## TWO OPERATIONAL MODES

| Mode | Trigger | Scope | Output | Frequency |
|------|---------|-------|--------|-----------|
| **Mid-Flight Analysis** | 7+ days of performance data available | Early performance signals, initial winner/loser classification, fatigue detection | MID-FLIGHT-LEARNING.md | Weekly during active campaign |
| **Post-Campaign Analysis** | Campaign complete or 30+ days of data | Full performance analysis, prediction calibration, comprehensive learning extraction and propagation | PERFORMANCE-LEARNING-REPORT.md (50KB+) | Once per campaign completion |

### Mode Selection Logic

```
IF campaign has been running < 7 days:
  --> INSUFFICIENT DATA -- do not execute A12
  --> Minimum 7 days of performance data required for any analysis
  --> Exception: If spend > $5,000 in < 7 days, Mid-Flight can execute at 5 days

IF campaign has 7-29 days of data AND is still running:
  --> MODE = MID-FLIGHT ANALYSIS
  --> Focus: Early winner/loser signals, initial fatigue detection
  --> Output: MID-FLIGHT-LEARNING.md (delta report)
  --> NO engine file propagation yet (insufficient data for permanent changes)
  --> EXCEPTION: Kill signals can trigger immediate variant removal

IF campaign has 30+ days of data OR campaign has ended:
  --> MODE = POST-CAMPAIGN ANALYSIS
  --> Full analysis pipeline (Layers 0-4 complete)
  --> Engine file propagation MANDATORY
  --> Output: PERFORMANCE-LEARNING-REPORT.md (50KB+)

IF previous PERFORMANCE-LEARNING-REPORT.md exists for this campaign:
  --> MODE = POST-CAMPAIGN ANALYSIS (incremental update)
  --> Load previous report as baseline
  --> Analyze NEW data since last report
  --> Update cumulative learnings
```

### Meta Ad Spy Weekly Auto-Scrape (Tool-Assisted Mode)
**When available:** Tool-Assisted Scan mode is active for the campaign
**What it provides:** Weekly impression deltas for tracked ads -- shows which competitor ads are gaining/losing reach over time
**How it differs from post-launch data:** Provides ongoing competitive intelligence even for non-launched campaigns. Continuous monitoring, not just post-launch.
**Feedback path:** A12 --> A01 `tool_performance_update` -- weekly impression deltas for tracked ads inform future A01 scans

---

## MODEL ASSIGNMENT TABLE (Binding)

```
+---------------------------+--------------+----------+----------------------------+
|  PHASE                    |  SKILLS      |  MODEL   |  REASON                    |
+---------------------------+--------------+----------+----------------------------+
|  Pre-Execution            |  Infra       |  haiku   |  File creation, directory  |
|  infrastructure           |              |          |  setup -- mechanical only  |
+---------------------------+--------------+----------+----------------------------+
|  Layer 0                  |  0.0.1-0.5   |  haiku   |  Loading, validation,     |
|  foundation               |              |          |  data normalization is     |
|                           |              |          |  mechanical extraction     |
+---------------------------+--------------+----------+----------------------------+
|  Layer 1                  |  1.1-1.4     |  sonnet  |  Data ingestion, metric   |
|  data ingestion           |              |          |  calculation, variant     |
|                           |              |          |  mapping -- structured    |
|                           |              |          |  data processing          |
+---------------------------+--------------+----------+----------------------------+
|  Layer 2                  |  2.1-2.5     |  opus    |  Prediction vs reality    |
|  prediction analysis      |              |          |  requires deep causal     |
|                           |              |          |  reasoning about WHY      |
|                           |              |          |  divergences occurred      |
+---------------------------+--------------+----------+----------------------------+
|  Layer 3                  |  3.1-3.6     |  opus    |  Learning extraction      |
|  learning extraction      |              |          |  requires pattern         |
|                           |              |          |  recognition across       |
|                           |              |          |  variants, hypothesis     |
|                           |              |          |  generation, and causal   |
|                           |              |          |  reasoning                |
+---------------------------+--------------+----------+----------------------------+
|  Layer 3.5                |  3.5.1-3.5.5 |  opus    |  Propagation decisions    |
|  learning propagation     |              |          |  require strategic        |
|                           |              |          |  judgment about which     |
|                           |              |          |  engine files to update   |
|                           |              |          |  and how                  |
+---------------------------+--------------+----------+----------------------------+
|  Layer 4                  |  4.1-4.3     |  sonnet  |  Assembly and formatting  |
|  output                   |              |          |  -- structured packaging, |
|                           |              |          |  not creative reasoning   |
+---------------------------+--------------+----------+----------------------------+
```

### Model Selection Enforcement

```
WHEN SPAWNING A SUBAGENT:

1. LOOK UP the skill number in the table above
2. USE the specified model
3. LOG the model used in the execution log

IF you want to override the table:
  --> You MUST have HUMAN APPROVAL
  --> You MUST document the reason in the execution log
  --> "I thought it would be better" is NOT a valid reason

FORBIDDEN:
  - Defaulting ALL subagents to opus (wastes tokens on data processing tasks)
  - Defaulting ALL subagents to haiku (loses quality on causal analysis)
  - Omitting the model parameter
  - Changing model mid-task without logging the switch
```

---

## STATE MACHINE

```
IDLE --> LOADING --> INGESTION --> PREDICTION_ANALYSIS --> LEARNING_EXTRACTION --> PROPAGATION --> PACKAGING --> COMPLETE
           |           |                 |                       |                    |              |
           v           v                 v                       v                    v              v
        [GATE_0]    [GATE_1]          [GATE_2]               [GATE_3]            [GATE_3.5]     [GATE_4]
        PASS/FAIL   PASS/FAIL         PASS/FAIL              PASS/FAIL           PASS/FAIL      PASS/FAIL
           |           |                 |                       |                    |              |
           +-----------+-----------------+-----------------------+--------------------+--------------+
                                                 ^
                                                 |
                                       Max 3 expansion rounds
                                       per gate, then
                                       HUMAN ESCALATION
```

**State Transitions (VALID):**
- IDLE --> LOADING (always allowed)
- LOADING --> INGESTION (only if GATE_0 = PASS)
- INGESTION --> PREDICTION_ANALYSIS (only if GATE_1 = PASS)
- PREDICTION_ANALYSIS --> LEARNING_EXTRACTION (only if GATE_2 = PASS)
- LEARNING_EXTRACTION --> PROPAGATION (only if GATE_3 = PASS)
- PROPAGATION --> PACKAGING (only if GATE_3.5 = PASS)
- PACKAGING --> COMPLETE (only if GATE_4 = PASS)

**State Transitions (INVALID -- BLOCKED):**
- LOADING --> PREDICTION_ANALYSIS (cannot skip data ingestion)
- INGESTION --> LEARNING_EXTRACTION (cannot skip prediction comparison)
- ANY --> PROPAGATION without GATE_3 passing
- ANY --> PACKAGING without GATE_3.5 passing
- ANY --> COMPLETE without GATE_4 passing

---

## PERFORMANCE METRICS REFERENCE

### Primary Metrics (Decision-Making Metrics)

| Metric | Definition | Why It Matters | Platform Source |
|--------|-----------|---------------|----------------|
| **CPA** (Cost Per Acquisition) | Total spend / conversions | THE bottom-line metric -- what does each customer cost? | All platforms |
| **ROAS** (Return on Ad Spend) | Revenue / ad spend | Profitability metric -- is every dollar in producing > $1 out? | All platforms |
| **Hook Rate** | 3-second video views / impressions | THE creative quality metric -- did the hook stop the scroll? | Meta, TikTok |
| **Conversion Rate** | Conversions / link clicks | Landing page + offer effectiveness after the click | All platforms |

### Secondary Metrics (Diagnostic Metrics)

| Metric | Definition | What It Diagnoses |
|--------|-----------|-------------------|
| **CTR** (Click-Through Rate) | Link clicks / impressions | Ad persuasion power -- did they click? |
| **ThruPlay Rate** | Video completions / impressions | Content engagement -- did they watch the whole thing? |
| **Engagement Rate** | (Likes + comments + shares) / impressions | Content resonance -- did they interact? |
| **Frequency** | Impressions / reach | Creative fatigue indicator -- how many times has each person seen this? |
| **CPM** (Cost Per 1000 Impressions) | Spend / (impressions / 1000) | Platform competition signal -- how expensive is the audience? |
| **CPC** (Cost Per Click) | Spend / link clicks | Click efficiency |

### Fatigue Metrics (Time-Series)

| Metric | Definition | Benchmark |
|--------|-----------|-----------|
| **Day-over-day hook rate change** | Hook rate today / hook rate yesterday | > -5% daily decline = fatigue signal |
| **7-day performance drop** | (Day 1-3 average) / (Day 5-7 average) | 37% drop is typical at high spend |
| **Frequency at fatigue onset** | Frequency when CPA starts rising | Typical: 2.5-3.5 for cold audiences |
| **Creative half-life** | Days until hook rate drops to 50% of peak | Varies by spend level (see Testing Volume Reference) |

### Statistical Significance Thresholds

```
MINIMUM DATA BEFORE DECLARING A WINNER OR LOSER:

  Per-variant minimum spend: 3x AOV (e.g., $300 if AOV = $100)
  Per-variant minimum impressions: 5,000
  Per-variant minimum time: 3 days
  Confidence interval: 90% minimum (95% preferred)

  IF a variant has NOT met these minimums:
    --> Classification = "INSUFFICIENT_DATA"
    --> DO NOT classify as winner, performer, or loser
    --> DO NOT extract learnings from insufficient data

  STATISTICAL SIGNIFICANCE CALCULATION:
    Use the Z-test for proportions (conversion rates) or
    use spend-based confidence (3x AOV per variant)
    The simpler approach: if a variant has spent 3x AOV without
    a conversion, it is a loser. If it has spent 3x AOV with
    CPA at or below target, it is a winner.

  FORBIDDEN:
    - Declaring winners with < $50 spend
    - Declaring winners based on CTR alone (CTR != conversion)
    - Declaring winners based on a single day's data
    - Ignoring confidence intervals
    - "This variant looks promising" without statistical backing
```

### Winner/Performer/Loser Classification

```
WINNER (Green -- Scale)
  CPA <= target CPA
  ROAS >= target ROAS
  Hook rate >= 30% (or vertical benchmark)
  Sufficient statistical basis (3x AOV minimum spend)
  Action: Scale spend 20-30% incrementally

PERFORMER (Yellow -- Optimize)
  CPA within 1.5x target CPA
  Hook rate >= 20%
  Sufficient statistical basis
  Action: Test hook swaps, CTA swaps, or visual swaps to improve

LOSER (Red -- Kill)
  CPA > 2x target CPA after 3x AOV spend
  OR hook rate < 15%
  OR zero conversions after 3x AOV spend
  Action: Kill immediately, extract learning about WHY it failed

INSUFFICIENT_DATA (Gray -- Wait)
  Has not met minimum spend threshold
  OR has not run for minimum 3 days
  Action: Continue running, do not classify yet
```

---

## LAYER ARCHITECTURE

### Pre-Execution: Project Infrastructure

**BEFORE any performance analysis begins, the following files MUST exist in the project folder:**

#### 1. Project CLAUDE.md

```markdown
# [Project Name] -- A12 Performance Learning Loop CLAUDE.md

## MANDATORY FIRST READS
1. READ: ./skills/ads/A12-performance-learning/A12-PERFORMANCE-LEARNING-ANTI-DEGRADATION.md
2. READ: ./skills/ads/A12-performance-learning/A12-PERFORMANCE-LEARNING-AGENT.md
3. READ: This file (project CLAUDE.md)
4. READ: PROJECT-STATE.md (current phase, decisions, next steps)

## PERFORMANCE DATA REQUIREMENTS
| Metric | Required | Status |
|--------|----------|--------|
| Performance data ingested | Yes | PENDING |
| All variants mapped | Yes | PENDING |
| A10 predictions loaded | Yes | PENDING |
| Minimum spend per variant (3x AOV) | Yes | PENDING |
| Time-series data (daily) | Yes | PENDING |

## GATE ENFORCEMENT
- Gates are BINARY: PASS or FAIL. No other status exists.
- "PARTIAL_PASS", "conditional pass", "preliminary results" -- NONE of these exist.

## FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)
- "the aggregate numbers tell the story"
- "we don't need per-variant analysis"
- "the predictions were close enough"
- "we can skip the propagation step"
- "the learnings are obvious from the data"
- "insufficient data but the trend is clear"
```

#### 2. PROJECT-STATE.md

```markdown
# [Project Name] -- A12 Performance Learning Loop State

## Current Phase
- Layer: [0/1/2/3/3.5/4]
- Step: [e.g., 2.1 Winner-Loser Classification]
- Mode: [MID_FLIGHT / POST_CAMPAIGN]
- Status: [IN_PROGRESS / BLOCKED / COMPLETE]

## Data Ingestion Status
| Metric | Current | Required | Status |
|--------|---------|----------|--------|
| Variants with data | 0 | [total from A09] | PENDING |
| Days of data | 0 | 7 minimum | PENDING |
| Total spend | $0 | 3x AOV per variant | PENDING |
| Platforms with data | 0 | All launched platforms | PENDING |

## Analysis Progress
| Analysis | Status |
|----------|--------|
| Per-variant metrics | PENDING |
| Winner/loser classification | PENDING |
| Prediction comparison | PENDING |
| Fatigue analysis | PENDING |
| Learning extraction | PENDING |
| Engine propagation | PENDING |

## Gate Status
- GATE_0: [PASS/PENDING]
- GATE_1: [PASS/FAIL/PENDING]
- GATE_2: [PASS/FAIL/PENDING]
- GATE_3: [PASS/FAIL/PENDING]
- GATE_3.5: [PASS/FAIL/PENDING]
- GATE_4: [PASS/FAIL/PENDING]

## Key Decisions
- [None yet]

## Next Action
- [Initialize project]
```

#### 3. PROGRESS-LOG.md

```markdown
# [Project Name] -- A12 Progress Log
## [Timestamp]
**Phase:** Pre-Execution
**Action:** Project infrastructure created
**Files:** project CLAUDE.md, PROJECT-STATE.md, PROGRESS-LOG.md
**Next:** Begin Layer 0 execution
```

**These 3 files are created at Pre-Execution, BEFORE any Layer 0 skills run.**

---

> **CRITICAL CONSTRAINTS REMINDER:** Read ANTI-DEGRADATION.md. Every microskill produces its own file. Gates are PASS/FAIL only. Numbers are exact.

### Layer 0: Foundation & Loading

**Purpose:** Load all required inputs -- actual performance data, A10 predictions, A09 variant matrix, A01 competitive benchmarks, A02 hook classifications -- and validate readiness for performance analysis.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 0.0.1 | `0.0.1-vertical-profile-loader.md` | Load ad-specific vertical config from `ad-verticals/` (performance baselines, learning baselines, optimization references, compliance constraints, hook type performance) | haiku |
| 0.1 | `0.1-performance-data-loader.md` | Load raw performance data provided by client. Accept CSV, XLSX, platform exports, or API data. Normalize all platform-specific formats into a unified schema: variant_id, platform, date, impressions, reach, clicks, conversions, spend, revenue, video_views_3s, video_completions, engagement_actions. Flag any missing required fields. | haiku |
| 0.2 | `0.2-variant-matrix-loader.md` | Load A09 AD-VARIANT-MATRIX/ to map each performance data row to its variant definition. Each variant must trace back to: hook_id (from A02), hook_type (from taxonomy), body_id (from A04), visual_treatment_id (from A05), CTA_id (from A07), platform, format. Without this mapping, per-element analysis is impossible. | haiku |
| 0.3 | `0.3-prediction-loader.md` | Load A10 SCORING-REPORT.md to extract pre-launch predictions. For each variant: predicted_rank, predicted_performance_tier, predicted_hook_rate, predicted_CPA_range, key_strength, key_risk. These become the comparison baseline for Layer 2. | haiku |
| 0.4 | `0.4-benchmark-loader.md` | Load competitive benchmarks from A01 AD-INTELLIGENCE-HANDOFF.md: vertical average CTR, vertical average CPA, vertical average hook rate, platform-specific benchmarks. Load AD-HOOK-TAXONOMY.md performance benchmarks for hook type comparison. Load vertical profile for vertical-specific thresholds. | haiku |
| 0.5 | `0.5-input-validator.md` | Validate all inputs present and above minimum thresholds. Confirm: performance data loaded with all required fields, variant matrix mapped (every data row maps to a variant), A10 predictions loaded, benchmarks loaded. Calculate: total variants with data, total days of data, total spend, spend per variant vs 3x AOV threshold. Flag variants with insufficient data. | haiku |

**Execution Order:**
1. 0.0.1, 0.1, and 0.2 run in parallel (independent loading)
2. 0.3 and 0.4 run in parallel with above (independent loading)
3. 0.5 runs after all above complete (validates aggregated inputs)

**Gate 0 -- Layer 0 Complete:**

```yaml
# LAYER_0_COMPLETE.yaml
gate: GATE_0
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  performance_data_loaded: true
  performance_data_rows: "[integer]"
  performance_data_date_range: "[start_date to end_date]"
  variant_matrix_loaded: true
  variants_mapped: "[integer -- must equal total variants in data]"
  unmapped_variants: 0
  a10_predictions_loaded: true
  benchmarks_loaded: true
  total_spend: "[dollar amount]"
  days_of_data: "[integer >= 7]"
  variants_with_sufficient_data: "[integer]"
  variants_with_insufficient_data: "[integer]"

microskill_outputs:
  - id: "0.0.1"
    file: "layer-0-outputs/0.0.1-vertical-profile-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.1"
    file: "layer-0-outputs/0.1-performance-data-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.2"
    file: "layer-0-outputs/0.2-variant-matrix-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.3"
    file: "layer-0-outputs/0.3-prediction-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.4"
    file: "layer-0-outputs/0.4-benchmark-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.5"
    file: "layer-0-outputs/0.5-input-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF unmapped_variants > 0: GATE CLOSED -- resolve variant mapping
IF days_of_data < 7: GATE CLOSED -- insufficient data window
IF performance_data_rows = 0: GATE CLOSED -- no data to analyze
```

### Schema Validation Reference

Input validators MUST verify field presence — not just file existence — for all consumed handoff files. See `skills/ads/ad-engine-schema-registry.md` for required fields per handoff file.

---

> **CRITICAL CONSTRAINTS REMINDER:** Read ANTI-DEGRADATION.md. Every microskill produces its own file. Gates are PASS/FAIL only. Numbers are exact.

### Layer 1: Performance Data Ingestion & Metric Calculation

**Purpose:** Normalize raw performance data across platforms, calculate per-variant metrics, and produce the structured dataset that enables Layer 2 and Layer 3 analysis.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 1.1 | `1.1-platform-normalizer.md` | Normalize platform-specific data into unified schema. Handle platform naming differences (e.g., Meta "Link Clicks" = Google "Clicks"). Handle attribution differences (Meta 7-day click, Google 30-day). Produce per-platform data quality reports. Flag any anomalies (sudden spend spikes, zero-impression periods, negative metrics). | sonnet |
| 1.2 | `1.2-per-variant-calculator.md` | Calculate per-variant performance metrics. For each variant: CPA, ROAS, CTR, hook_rate, ThruPlay_rate, engagement_rate, conversion_rate, CPM, CPC. Calculate using the full date range. Calculate confidence intervals based on sample size. Flag variants with insufficient data (below 3x AOV spend or below 5,000 impressions). | sonnet |
| 1.3 | `1.3-time-series-builder.md` | Build daily time-series for each variant. Calculate: daily hook_rate, daily CPA, daily CTR, daily spend, cumulative spend. Calculate rolling 3-day averages to smooth noise. Identify performance inflection points (days where metrics shift significantly). Calculate creative fatigue curve: day-over-day hook rate change, 7-day performance drop percentage, estimated creative half-life. | sonnet |
| 1.4 | `1.4-classification-engine.md` | Classify each variant into tiers using the Winner/Performer/Loser framework (see Performance Metrics Reference above). Apply statistical significance checks before classification. Produce the VARIANT CLASSIFICATION TABLE with: variant_id, classification (WINNER/PERFORMER/LOSER/INSUFFICIENT_DATA), key_metric (CPA or ROAS), hook_rate, total_spend, total_conversions, statistical_basis (SUFFICIENT/INSUFFICIENT), confidence_interval. | sonnet |

**Execution Order:**
1. 1.1 runs first (platform normalization is prerequisite)
2. 1.2 and 1.3 run in parallel after 1.1 (both use normalized data)
3. 1.4 runs after 1.2 complete (needs per-variant metrics for classification)

**MANDATORY VARIANT CLASSIFICATION TABLE (After Layer 1):**

```
+-----------------------------------------------------------------------------+
|  VARIANT CLASSIFICATION TABLE - [timestamp]                                  |
|                                                                              |
|  +-----------------------------------------------------------------------+  |
|  | VARIANT_ID | CLASS  | CPA    | ROAS  | HOOK  | SPEND  | CONV | STAT  |  |
|  |            |        |        |       | RATE  |        |      | BASIS |  |
|  +-----------------------------------------------------------------------+  |
|  | [id]       | WINNER | $[X]   | [X]x  | [X]%  | $[X]   | [X]  | SUFF  |  |
|  | [id]       | WINNER | $[X]   | [X]x  | [X]%  | $[X]   | [X]  | SUFF  |  |
|  | [id]       | PERF   | $[X]   | [X]x  | [X]%  | $[X]   | [X]  | SUFF  |  |
|  | [id]       | LOSER  | $[X]   | [X]x  | [X]%  | $[X]   | [X]  | SUFF  |  |
|  | [id]       | INSUF  | --     | --    | [X]%  | $[X]   | [X]  | INSUF |  |
|  +-----------------------------------------------------------------------+  |
|                                                                              |
|  SUMMARY:                                                                    |
|  Winners: [X] ([X]% of total variants)                                       |
|  Performers: [X] ([X]%)                                                      |
|  Losers: [X] ([X]%)                                                          |
|  Insufficient Data: [X] ([X]%)                                               |
|                                                                              |
|  Win Rate: [X]% (benchmark: 6.6-30%)                                         |
|  Overall Campaign CPA: $[X] (target: $[X])                                   |
|  Overall Campaign ROAS: [X]x (target: [X]x)                                  |
+-----------------------------------------------------------------------------+
```

**Gate 1 -- Layer 1 Complete:**

```yaml
# LAYER_1_COMPLETE.yaml
gate: GATE_1
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  platform_data_normalized: true
  platforms_processed: "[list]"
  per_variant_metrics_calculated: true
  variants_with_metrics: "[integer -- must equal total mapped variants]"
  time_series_built: true
  variants_with_time_series: "[integer]"
  classification_complete: true
  winners_count: "[integer]"
  performers_count: "[integer]"
  losers_count: "[integer]"
  insufficient_data_count: "[integer]"
  statistical_basis_verified: true

microskill_outputs:
  - id: "1.1"
    file: "layer-1-outputs/1.1-platform-normalizer.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "1.2"
    file: "layer-1-outputs/1.2-per-variant-calculator.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      variants_calculated: "[integer]"
      variants_insufficient: "[integer]"
  - id: "1.3"
    file: "layer-1-outputs/1.3-time-series-builder.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      fatigue_curves_generated: "[integer]"
  - id: "1.4"
    file: "layer-1-outputs/1.4-classification-engine.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      winners: "[integer]"
      performers: "[integer]"
      losers: "[integer]"

IF variants_with_metrics < total_mapped_variants: GATE CLOSED -- calculate remaining
IF classification_complete = false: GATE CLOSED -- classify all variants
IF statistical_basis_verified = false: GATE CLOSED -- verify significance
```

---

> **CRITICAL CONSTRAINTS REMINDER:** Read ANTI-DEGRADATION.md. Every microskill produces its own file. Gates are PASS/FAIL only. Numbers are exact.

### Layer 2: Prediction vs Reality Analysis

**Purpose:** Compare A10's pre-launch predictions against actual performance. Where was the engine right? Where was it wrong? What patterns explain the divergences? This is the layer that CALIBRATES the engine's predictive model.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 2.1 | `2.1-prediction-comparison.md` | For each variant, compare: A10 predicted rank vs actual rank, A10 predicted tier vs actual tier, A10 predicted hook rate range vs actual hook rate, A10 predicted CPA range vs actual CPA. Classify each prediction as: ACCURATE (within predicted range), OPTIMISTIC (predicted better than reality), PESSIMISTIC (predicted worse than reality), WILDLY_WRONG (predicted tier entirely wrong). Calculate overall prediction accuracy rate. | opus |
| 2.2 | `2.2-divergence-analysis.md` | For every variant where prediction diverged from reality (OPTIMISTIC, PESSIMISTIC, or WILDLY_WRONG): generate a hypothesis for WHY the prediction was wrong. Common divergence patterns: (a) Hook rate overestimated because hook type had lower performance on this platform than taxonomy benchmarks suggested. (b) CPA underestimated because the landing page or offer was the bottleneck, not the creative. (c) Visual style predicted wrong -- UGC beat polished despite model predicting polished. (d) Creative fatigue faster than predicted. (e) Platform algorithm favored a different format than predicted. (f) Audience targeting influenced creative performance in ways the model couldn't predict. | opus |
| 2.3 | `2.3-scoring-model-audit.md` | Audit A10's scoring model: which scoring criteria correlated with actual performance, which did not. Calculate: correlation between A10 scroll-stop power score and actual hook rate, correlation between A10 overall score and actual ROAS, correlation between A10 platform nativeness score and actual platform performance. Identify the strongest and weakest predictive criteria. Recommend scoring weight adjustments for A10. | opus |
| 2.4 | `2.4-hook-type-performance.md` | Map actual performance data to hook types (from AD-HOOK-TAXONOMY.md). For each hook type used in the campaign: average hook rate, average CPA, average ROAS, winner/loser ratio. Compare against taxonomy benchmark data. Identify: hook types that outperformed benchmarks, hook types that underperformed, hook types with insufficient campaign data. Calculate performance variance by hook category (A-J). | opus |
| 2.5 | `2.5-element-attribution.md` | Decompose variant performance into ELEMENT-LEVEL attribution. Using the variant matrix from A09, compare variants that share elements: (a) HOOK ATTRIBUTION: Compare variants with same body+CTA+visual but different hooks. Isolate hook contribution to performance. (b) VISUAL ATTRIBUTION: Compare variants with same hook+body+CTA but different visuals. Isolate visual contribution. (c) CTA ATTRIBUTION: Compare variants with same hook+body+visual but different CTAs. Isolate CTA contribution. (d) BODY ATTRIBUTION: Compare variants with same hook+CTA+visual but different bodies. Isolate body contribution. This produces a per-element performance ranking that tells future campaigns which SPECIFIC elements to prioritize. | opus |

**Execution Order:**
1. 2.1 runs first (prediction comparison is prerequisite for divergence analysis)
2. 2.2 runs after 2.1 (analyzes divergences identified in 2.1)
3. 2.3 runs in parallel with 2.2 (independent scoring model audit)
4. 2.4 runs in parallel with 2.2 (independent hook type analysis)
5. 2.5 runs after 1.4 complete (needs full variant classification for element attribution)

**MANDATORY PREDICTION ACCURACY TABLE:**

```
+-----------------------------------------------------------------------------+
|  PREDICTION ACCURACY TABLE - [timestamp]                                     |
|                                                                              |
|  +-----------------------------------------------------------------------+  |
|  | METRIC                      | VALUE    | BENCHMARK | STATUS            |  |
|  +-----------------------------------------------------------------------+  |
|  | Overall prediction accuracy | [X]%     | 50-70%    | [ABOVE/AT/BELOW]  |  |
|  | Rank correlation (Spearman) | [X]      | > 0.3     | [ABOVE/BELOW]     |  |
|  | Tier prediction accuracy    | [X]%     | 40-60%    | [ABOVE/AT/BELOW]  |  |
|  | ACCURATE predictions        | [X]/[Y]  | --        | --                |  |
|  | OPTIMISTIC predictions      | [X]/[Y]  | --        | --                |  |
|  | PESSIMISTIC predictions     | [X]/[Y]  | --        | --                |  |
|  | WILDLY_WRONG predictions    | [X]/[Y]  | --        | --                |  |
|  +-----------------------------------------------------------------------+  |
|                                                                              |
|  Strongest predictive criterion: [criterion name] (r=[X])                    |
|  Weakest predictive criterion: [criterion name] (r=[X])                      |
+-----------------------------------------------------------------------------+
```

**Gate 2 -- Layer 2 Complete:**

```yaml
# LAYER_2_COMPLETE.yaml
gate: GATE_2
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  prediction_comparison_complete: true
  variants_compared: "[integer -- all variants with sufficient data]"
  divergence_hypotheses_generated: true
  divergence_count: "[integer]"
  hypotheses_count: "[integer -- must >= divergence_count]"
  scoring_model_audit_complete: true
  criteria_correlation_calculated: true
  hook_type_performance_mapped: true
  hook_types_analyzed: "[integer]"
  element_attribution_complete: true
  elements_attributed: "[hooks/visuals/CTAs/bodies]"

microskill_outputs:
  - id: "2.1"
    file: "layer-2-outputs/2.1-prediction-comparison.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      accuracy_rate: "[percentage]"
  - id: "2.2"
    file: "layer-2-outputs/2.2-divergence-analysis.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      divergences_analyzed: "[integer]"
      hypotheses_generated: "[integer]"
  - id: "2.3"
    file: "layer-2-outputs/2.3-scoring-model-audit.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.4"
    file: "layer-2-outputs/2.4-hook-type-performance.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.5"
    file: "layer-2-outputs/2.5-element-attribution.md"
    size_bytes: "[integer]"
    minimum_met: true

IF prediction_comparison_complete = false: GATE CLOSED -- complete comparison
IF divergence_hypotheses_generated = false: GATE CLOSED -- generate hypotheses
IF element_attribution_complete = false: GATE CLOSED -- complete attribution
```

---

> **CRITICAL CONSTRAINTS REMINDER:** Read ANTI-DEGRADATION.md. Every microskill produces its own file. Gates are PASS/FAIL only. Numbers are exact.

### Layer 3: Learning Extraction

**Purpose:** Transform Layer 2 analysis into actionable learnings. Not just WHAT happened, but WHY it happened and HOW to apply it. Every learning must be specific enough to change a future decision.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 3.1 | `3.1-hook-learnings.md` | Extract actionable learnings about hook performance. Which of the 32 hook types performed best in THIS campaign? How does this compare to taxonomy benchmarks? Which hook types should be prioritized in the next campaign? Which should be deprioritized? WHY did winning hooks win (specific hypotheses: timeframe specificity? emotional trigger? curiosity gap strength? authority signal?)? Generate specific hook recommendations for next campaign with confidence levels. | opus |
| 3.2 | `3.2-visual-learnings.md` | Extract actionable learnings about visual style performance. Did UGC outperform polished as expected? By how much? On which platforms? Which visual elements correlated with higher hook rates? Which with higher conversion rates? Were there visual-hook combinations that significantly outperformed? WHY did winning visuals win (hypothesis: authenticity trust? pattern interrupt? product visibility? emotional resonance?)? Generate specific visual direction recommendations. | opus |
| 3.3 | `3.3-platform-learnings.md` | Extract actionable learnings per platform. Which platform delivered the best ROAS? Which the best CPA? Were there platform-specific creative patterns (hooks that worked on TikTok but not Meta, or vice versa)? How did platform-specific constraints (sound-off on Meta, vertical format on TikTok) affect performance? Generate platform-specific creative recommendations for next campaign. | opus |
| 3.4 | `3.4-fatigue-learnings.md` | Extract actionable learnings about creative fatigue. What was the average creative half-life? Did some variants fatigue faster than others? WHY? (Hypothesis: novelty-dependent hooks fatigue faster than educational hooks? UGC fatigues slower than polished because it looks different each time?) What was the frequency at fatigue onset? Generate creative refresh cadence recommendations. Map fatigue patterns to the AD-ENGINE-CLAUDE.md Creative Lifespan reference data -- do the benchmarks hold for this vertical? | opus |
| 3.5 | `3.5-prediction-learnings.md` | Extract actionable learnings about prediction accuracy. What systematic biases existed in A10's scoring? (e.g., consistently overestimating video vs static? Consistently underestimating UGC?) Which scoring criteria should have higher weights? Lower weights? What new predictive signals emerged from the data that A10 doesn't currently model? Generate specific scoring model adjustments with magnitude (e.g., "Increase UGC bonus from +0.5 to +1.2 based on 2.4x outperformance"). | opus |
| 3.6 | `3.6-learning-validator.md` | Validate all extracted learnings. Each learning must have: (a) WHAT -- specific observation with data. (b) WHY -- causal hypothesis. (c) HOW -- actionable recommendation for next campaign. (d) CONFIDENCE -- statistical basis (HIGH if based on sufficient data, MEDIUM if directional, LOW if suggestive). (e) SCOPE -- vertical-specific or universal? Campaign-specific or generalizable? Reject learnings that are vague, lack data backing, or fail the actionability test. Minimum 10 validated learnings required. | opus |

**Execution Order:**
1. 3.1, 3.2, 3.3, 3.4 run in parallel (independent learning domains)
2. 3.5 runs after 2.3 (scoring model audit) complete
3. 3.6 runs after all above complete (validates all learnings)

**MANDATORY LEARNING EXTRACTION FORMAT:**

Every learning MUST follow this structure:

```markdown
### Learning [ID]: [Title]

**WHAT:** [Specific observation with data]
Example: "UGC testimonial hooks (D3) achieved a 34% average hook rate vs 18% for
curiosity hooks (A2) across all Meta placements. UGC testimonials also had 1.4x
better CPA ($23 vs $32)."

**WHY:** [Causal hypothesis]
Example: "UGC testimonials outperformed because they bypass the 'ad filter' --
users process them as social content rather than advertising, leading to higher
initial engagement. The specific timeframe claims ('in 3 weeks') created concrete
expectation setting that curiosity hooks lacked."

**HOW:** [Actionable recommendation for next campaign]
Example: "Next campaign: Generate 40% of hooks as UGC testimonial type (up from
20%). Ensure all UGC hooks include specific timeframe claims. Test UGC testimonial
hooks first in initial ad set before scaling other types."

**CONFIDENCE:** [HIGH/MEDIUM/LOW with basis]
Example: "HIGH -- Based on 12 UGC testimonial variants vs 15 curiosity variants,
each with 3x+ AOV spend. Pattern consistent across all 3 Meta ad sets."

**SCOPE:** [Vertical-specific/Universal] [Campaign-specific/Generalizable]
Example: "Likely vertical-specific (health/supplement). UGC trust may be lower
in finance or technology verticals. Generalizable within health vertical."

**PROPAGATION TARGET:** [Which engine file(s) to update]
Example: "A02 hook scoring weights, A10 UGC scoring bonus, health vertical profile"
```

**Gate 3 -- Layer 3 Complete:**

```yaml
# LAYER_3_COMPLETE.yaml
gate: GATE_3
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  hook_learnings_extracted: true
  hook_learnings_count: "[integer]"
  visual_learnings_extracted: true
  visual_learnings_count: "[integer]"
  platform_learnings_extracted: true
  platform_learnings_count: "[integer]"
  fatigue_learnings_extracted: true
  fatigue_learnings_count: "[integer]"
  prediction_learnings_extracted: true
  prediction_learnings_count: "[integer]"
  total_validated_learnings: "[integer >= 10]"
  all_learnings_have_what_why_how: true
  all_learnings_have_confidence: true
  all_learnings_have_propagation_target: true
  validator_ran: true
  validator_verdict: PASS

microskill_outputs:
  - id: "3.1"
    file: "layer-3-outputs/3.1-hook-learnings.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      learnings_extracted: "[integer]"
  - id: "3.2"
    file: "layer-3-outputs/3.2-visual-learnings.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.3"
    file: "layer-3-outputs/3.3-platform-learnings.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.4"
    file: "layer-3-outputs/3.4-fatigue-learnings.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.5"
    file: "layer-3-outputs/3.5-prediction-learnings.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.6"
    file: "layer-3-outputs/3.6-learning-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF total_validated_learnings < 10: GATE CLOSED -- extract more learnings
IF all_learnings_have_what_why_how = false: GATE CLOSED -- complete learning format
IF all_learnings_have_propagation_target = false: GATE CLOSED -- assign propagation targets
IF validator_verdict != PASS: GATE CLOSED -- address validation failures
```

---

> **CRITICAL CONSTRAINTS REMINDER:** Read ANTI-DEGRADATION.md. Every microskill produces its own file. Gates are PASS/FAIL only. Numbers are exact.

### Layer 3.5: Learning Propagation

**Purpose:** This is the CRITICAL layer that separates A12 from a mere reporting tool. Propagation writes validated learnings BACK INTO the engine files that future campaigns will read. Without this layer, learnings are documentation. With it, the engine actually improves.

**THIS LAYER EXISTS ONLY IN POST-CAMPAIGN MODE.** Mid-Flight Analysis skips to Layer 4 (learnings are documented but not propagated until sufficient data exists).

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 3.5.1 | `3.5.1-a01-intelligence-update.md` | Update A01 competitive intelligence with campaign performance data. Add winning ad specimens from THIS campaign to the intelligence database. Update vertical-specific performance benchmarks with real data. If A01 Continuous Monitor is active, flag high-performing hook types and visual styles for monitoring priority. Write: A01-INTELLIGENCE-PATCH.md documenting all proposed changes to A01 intelligence. | opus |
| 3.5.2 | `3.5.2-a02-hook-scoring-update.md` | Update A02 hook scoring weights based on actual hook type performance. For each hook type used in the campaign: adjust scoring weight UP if it outperformed predicted score, adjust DOWN if it underperformed. Adjust vertical-specific hook type recommendations in the relevant vertical profile (e.g., if UGC testimonial hooks dominated in health, increase their priority in health vertical profile). Write: A02-SCORING-PATCH.md documenting all proposed weight changes with justification and data backing. | opus |
| 3.5.3 | `3.5.3-a06-arena-criteria-update.md` | Update A06 Ad Arena judging criteria weights based on which criteria best predicted actual performance. If "Scroll-Stop Power" correlated strongly with hook rate, its weight should increase. If "Memorability" didn't correlate with any performance metric, consider reducing its weight. Also update platform nativeness scoring based on actual platform-specific performance patterns. Write: A06-CRITERIA-PATCH.md documenting all proposed criteria weight changes. | opus |
| 3.5.4 | `3.5.4-a10-prediction-model-update.md` | Update A10's prediction model based on the scoring model audit (2.3) and prediction learnings (3.5). Specific updates: adjust scoring formula weights, add new predictive signals identified in Layer 3, update benchmark reference data with actual campaign data, adjust platform-specific scoring adjustments, update creative fatigue predictions based on actual fatigue curves. Write: A10-PREDICTION-PATCH.md documenting all proposed model changes. | opus |
| 3.5.5 | `3.5.5-vertical-profile-update.md` | Update the relevant vertical profile (`ad-verticals/[vertical].md`) with campaign-specific learnings. Update: vertical-specific hook type performance data, vertical-specific format recommendations, vertical-specific visual style patterns, vertical-specific fatigue benchmarks, vertical-specific compliance learnings. Write: VERTICAL-PATCH.md documenting all proposed vertical profile changes. | opus |

**Execution Order:**
1. 3.5.1 through 3.5.5 can run in parallel (each updates different engine files)
2. All run ONLY in POST-CAMPAIGN mode (not Mid-Flight)

**MANDATORY PROPAGATION VERIFICATION TABLE:**

```
+-----------------------------------------------------------------------------+
|  PROPAGATION VERIFICATION TABLE - [timestamp]                                |
|                                                                              |
|  +-----------------------------------------------------------------------+  |
|  | ENGINE FILE            | PATCH FILE      | CHANGES | APPLIED | STATUS |  |
|  +-----------------------------------------------------------------------+  |
|  | A01 Intelligence       | A01-INTEL-PATCH  | [X]     | [Y/N]   | [S]   |  |
|  | A02 Hook Scoring       | A02-SCORE-PATCH  | [X]     | [Y/N]   | [S]   |  |
|  | A06 Arena Criteria     | A06-CRIT-PATCH   | [X]     | [Y/N]   | [S]   |  |
|  | A10 Prediction Model   | A10-PRED-PATCH   | [X]     | [Y/N]   | [S]   |  |
|  | Vertical Profile       | VERT-PATCH       | [X]     | [Y/N]   | [S]   |  |
|  +-----------------------------------------------------------------------+  |
|                                                                              |
|  STATUS: PROPOSED = awaiting human approval                                  |
|          APPROVED = human approved, ready to apply                           |
|          APPLIED  = changes written to engine files                          |
|          REJECTED = human rejected with reason                               |
|                                                                              |
|  CRITICAL: All patches PROPOSED first. Applied only after HUMAN APPROVAL.    |
|  Engine file modifications without human approval are FORBIDDEN.             |
+-----------------------------------------------------------------------------+
```

**IMPORTANT: Propagation is a TWO-STEP process.**

```
STEP 1: PROPOSE
  Write *-PATCH.md files documenting every proposed change
  Present patches to human for review
  Human reviews each patch and approves/rejects/modifies

STEP 2: APPLY (only after human approval)
  For each APPROVED patch:
    Read the target engine file
    Apply the proposed changes
    Verify the changes are correct
    Log the applied changes in execution log

  For each REJECTED patch:
    Log the rejection with human's reason
    Do NOT apply the changes
    Consider the rejection a learning for future A12 runs
```

### Meta Ad Spy Feedback Loop
When Meta Ad Spy data is available:
  1. A12 ingests weekly impression snapshots for all tracked competitor ads
  2. Computes impression deltas (week-over-week change per ad)
  3. Identifies ads with rapidly growing impressions (potential new winners)
  4. Identifies ads with declining impressions (potential creative fatigue)
  5. Feeds updated competitive landscape back to A01 for next scan cycle
  6. This creates a continuous learning loop: A01 --> A02-A09 --> A10-A11 --> A12 --> A01

**Gate 3.5 -- Layer 3.5 Complete:**

```yaml
# LAYER_3.5_COMPLETE.yaml
gate: GATE_3.5
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
mode: "[POST_CAMPAIGN / MID_FLIGHT]"
checks:
  # POST-CAMPAIGN mode checks:
  a01_patch_written: "[true / N/A if Mid-Flight]"
  a02_patch_written: "[true / N/A if Mid-Flight]"
  a06_patch_written: "[true / N/A if Mid-Flight]"
  a10_patch_written: "[true / N/A if Mid-Flight]"
  vertical_patch_written: "[true / N/A if Mid-Flight]"
  human_review_completed: "[true / N/A if Mid-Flight]"
  approved_patches_applied: "[true / N/A if Mid-Flight]"

  # MID-FLIGHT mode checks:
  propagation_deferred: "[true if Mid-Flight / N/A if Post-Campaign]"
  deferral_documented: "[true if Mid-Flight / N/A if Post-Campaign]"

microskill_outputs:
  - id: "3.5.1"
    file: "layer-3.5-outputs/3.5.1-a01-intelligence-update.md"
    size_bytes: "[integer]"
    minimum_met: true
    executed: "[true / false if Mid-Flight]"
  - id: "3.5.2"
    file: "layer-3.5-outputs/3.5.2-a02-hook-scoring-update.md"
    size_bytes: "[integer]"
    minimum_met: true
    executed: "[true / false if Mid-Flight]"
  - id: "3.5.3"
    file: "layer-3.5-outputs/3.5.3-a06-arena-criteria-update.md"
    size_bytes: "[integer]"
    minimum_met: true
    executed: "[true / false if Mid-Flight]"
  - id: "3.5.4"
    file: "layer-3.5-outputs/3.5.4-a10-prediction-model-update.md"
    size_bytes: "[integer]"
    minimum_met: true
    executed: "[true / false if Mid-Flight]"
  - id: "3.5.5"
    file: "layer-3.5-outputs/3.5.5-vertical-profile-update.md"
    size_bytes: "[integer]"
    minimum_met: true
    executed: "[true / false if Mid-Flight]"

IF mode = POST_CAMPAIGN AND any patch not written: GATE CLOSED -- complete patches
IF mode = POST_CAMPAIGN AND human_review_completed = false: GATE CLOSED -- awaiting review
IF mode = POST_CAMPAIGN AND approved_patches_applied = false: GATE CLOSED -- apply patches
IF mode = MID_FLIGHT AND propagation_deferred = false: GATE CLOSED -- document deferral
```

---

> **CRITICAL CONSTRAINTS REMINDER:** Read ANTI-DEGRADATION.md. Every microskill produces its own file. Gates are PASS/FAIL only. Numbers are exact.

### Layer 4: Output Packaging

**Purpose:** Assemble all Layer 1-3.5 outputs into the primary deliverable: PERFORMANCE-LEARNING-REPORT.md (Post-Campaign) or MID-FLIGHT-LEARNING.md (Mid-Flight). This is an ASSEMBLY operation -- it combines pre-validated artifacts, it does NOT generate new analysis.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 4.1 | `4.1-report-assembler.md` | Assemble the primary report from all layer outputs. POST-CAMPAIGN: PERFORMANCE-LEARNING-REPORT.md (50KB+, all 8 required sections). MID-FLIGHT: MID-FLIGHT-LEARNING.md (15KB+, focused on early signals and kill recommendations). Use chunked assembly (5-10 write operations) because LLMs have ~30KB output limits per response. Size checkpoints at each phase. | sonnet |
| 4.2 | `4.2-execution-log.md` | Produce execution-log.md with per-microskill entries. Each entry: spec file read confirmation, output file created, output file size, key metrics, gate status. Include LEARN phase (per LEARNING-CAPTURE-PROTOCOL.md): run entry, rating prompt, pattern check, project state update. | sonnet |
| 4.3 | `4.3-checkpoint-files.md` | Create all checkpoint YAML files. Verify all output files exist with sizes. Create LAYER_4_COMPLETE.yaml. Verify propagation status (Post-Campaign: all approved patches applied; Mid-Flight: deferral documented). | sonnet |

**Execution Order:**
1. 4.1 first (primary deliverable)
2. 4.2 after 4.1 (logs assembly process)
3. 4.3 after 4.2 (final checkpoint)

**Gate 4 -- Layer 4 Complete (Skill Complete):**

```yaml
# LAYER_4_COMPLETE.yaml
gate: GATE_4
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
mode: "[POST_CAMPAIGN / MID_FLIGHT]"
checks:
  report_file_exists: true
  report_file_path: "[PERFORMANCE-LEARNING-REPORT.md / MID-FLIGHT-LEARNING.md]"
  report_file_size_kb: "[integer]"
  report_minimum_size_met: "[true -- 50KB for Post-Campaign, 15KB for Mid-Flight]"
  all_sections_populated: true
  execution_log_exists: true
  all_checkpoint_files_exist: true
  learn_phase_completed: true

  # Post-Campaign specific:
  propagation_patches_applied: "[true / N/A if Mid-Flight]"
  engine_files_updated: "[list / N/A if Mid-Flight]"

post_assembly_size_validation:
  file_size_kb: "[integer]"
  minimum_required_kb: "[50 / 15]"
  status: "[PASS if >= minimum / FAIL if < minimum]"

IF report_file_size_kb < minimum: GATE CLOSED -- re-assemble with chunked protocol
IF any section missing or empty: GATE CLOSED -- complete missing sections
IF mode = POST_CAMPAIGN AND propagation_patches_applied = false: GATE CLOSED -- apply patches
```

---

## OUTPUT SCHEMA: PERFORMANCE-LEARNING-REPORT.md

**Minimum size: 50KB (Post-Campaign) / 15KB (Mid-Flight).** This is a comprehensive analysis document, not a summary.

**Chunked Assembly Required:** LLMs have ~30KB output limits per response. A 50KB+ file CANNOT be assembled in a single write. Use 5-10 write operations across 3 phases:

```
PHASE 1: SKELETON + EXECUTIVE SUMMARY + CLASSIFICATION (>= 10KB)
  Write file structure with all 8 section headers + Section 1 (Executive Summary)
  + Section 2 (Variant Classification Table)

PHASE 2: PREDICTION ANALYSIS + ELEMENT PERFORMANCE (>= 25KB cumulative)
  Append Sections 3-5 (Prediction vs Reality, Hook Type Performance,
  Element Attribution Analysis)

PHASE 3: LEARNINGS + PROPAGATION + RECOMMENDATIONS (>= 50KB cumulative)
  Append Sections 6-8 (Extracted Learnings [largest section],
  Engine Propagation Status, Next Campaign Recommendations)

SIZE CHECKPOINTS (BLOCKING):
  After Phase 1: File >= 10KB  --> IF NOT: HALT
  After Phase 2: File >= 25KB  --> IF NOT: HALT
  After Phase 3: File >= 50KB  --> IF NOT: HALT
```

### The 8 Required Sections

```markdown
# PERFORMANCE-LEARNING-REPORT.md
## Metadata
- Project: [name]
- Mode: [Post-Campaign Analysis / Mid-Flight Analysis]
- Campaign Duration: [start_date to end_date]
- Total Spend: $[amount]
- Total Variants Tested: [integer]
- Variants with Sufficient Data: [integer]
- Platforms: [list]
- Vertical: [vertical]
- Report Date: [ISO 8601]
- Previous Report Date: [ISO 8601 if incremental, N/A if first]

## Section 1: Executive Summary
- Campaign performance overview: Total CPA, ROAS, spend efficiency
- Win rate: [X]% of variants were winners (benchmark: 6.6-30%)
- Top 3 performing variants (brief description with key metrics)
- Bottom 3 performing variants (brief description with key metrics)
- A10 prediction accuracy: [X]% accurate (was the engine right?)
- Creative fatigue summary: average creative half-life, when to refresh
- Top 3 actionable learnings (most impactful for next campaign)
- Engine files updated: [list of files modified in propagation]

## Section 2: Variant Classification
- Full VARIANT CLASSIFICATION TABLE (see Layer 1)
- Winners detail (each winner: variant ID, hook type, visual style,
  CPA, ROAS, hook rate, why it won)
- Performers detail (each performer with optimization recommendations)
- Losers detail (each loser with failure hypothesis)
- Insufficient Data variants (flagged for continued monitoring)
- Win rate vs benchmark analysis
- Spend distribution analysis (how much budget went to winners vs losers)

## Section 3: Prediction vs Reality Analysis
- Full PREDICTION ACCURACY TABLE (see Layer 2)
- Divergence analysis for each non-ACCURATE prediction:
  - Variant ID, predicted rank vs actual rank
  - Divergence type (OPTIMISTIC / PESSIMISTIC / WILDLY_WRONG)
  - Hypothesis for why prediction diverged
- Scoring model audit results:
  - Criteria that correlated with actual performance
  - Criteria that did NOT correlate
  - Recommended scoring weight adjustments
- A10 systematic biases identified (e.g., consistently overestimates video)

## Section 4: Hook Type Performance
- Performance by hook type table:
  | Hook Type | Count | Avg Hook Rate | Avg CPA | Avg ROAS | Win Rate | vs Benchmark |
- Hook types that outperformed taxonomy benchmarks (with hypotheses)
- Hook types that underperformed (with hypotheses)
- Hook type x platform cross-tabulation (which types work on which platforms)
- Hook category (A-J) performance ranking
- Comparison with A01 competitive intelligence
  (are we beating competitor hook performance?)

## Section 5: Element Attribution Analysis
- Per-element performance ranking:
  - HOOKS ranked by isolated performance contribution
  - VISUALS ranked by isolated performance contribution
  - CTAs ranked by isolated performance contribution
  - BODIES ranked by isolated performance contribution
- Winning element combinations (hook + visual + CTA combos that synergize)
- Losing element combinations (combos that drag performance down)
- Creative fatigue analysis:
  - Per-variant fatigue curves (day-over-day performance)
  - Average creative half-life
  - Fatigue patterns by element type (do UGC hooks fatigue slower?)
  - Frequency at fatigue onset
  - Refresh cadence recommendations

## Section 6: Extracted Learnings
- Full list of all validated learnings (minimum 10)
- Each learning in WHAT/WHY/HOW/CONFIDENCE/SCOPE format
  (see Layer 3 Mandatory Learning Extraction Format)
- Learnings organized by domain:
  - Hook learnings
  - Visual learnings
  - Platform learnings
  - Fatigue learnings
  - Prediction model learnings
- Learning priority ranking (highest impact first)
- NOTE: This section should be the LARGEST section (15-20KB minimum).
  Each learning requires detailed data, hypothesis, and actionable recommendation.
  Do NOT summarize learnings.

## Section 7: Engine Propagation Status
- Full PROPAGATION VERIFICATION TABLE (see Layer 3.5)
- For each engine file:
  - Changes proposed
  - Human approval status
  - Changes applied (Y/N)
  - Verification that changes are correct
- Engine files NOT updated and why (rejected patches with reasons)
- Cumulative engine improvement tracking:
  - Changes from this campaign
  - Changes from previous campaigns (if multiple A12 runs exist)

## Section 8: Next Campaign Recommendations
- Creative strategy recommendations:
  - Prioritized hook types for next campaign (ranked with rationale)
  - Recommended visual styles (with platform specificity)
  - Recommended ad lengths and formats
  - Recommended testing approach (which elements to test first)
- Budget allocation recommendations:
  - Recommended initial spend distribution across variants
  - Recommended kill threshold (based on actual campaign data)
  - Recommended scale threshold for winners
- Creative refresh strategy:
  - When to refresh creatives (based on fatigue analysis)
  - How many new variants to produce per refresh cycle
  - Which elements to refresh first (hooks, visuals, CTAs)
- Platform strategy:
  - Platform prioritization for next campaign
  - Platform-specific creative recommendations
- Testing volume recommendations:
  - Recommended variant count for next campaign
  - Recommended testing cadence
  - Minimum budget per variant for statistical significance
```

---

## GATE ARCHITECTURE -- COMPLETE REFERENCE

### Gate Summary Table

| Gate | Location | Blocks | Key Criteria | Expansion Protocol |
|------|----------|--------|--------------|-------------------|
| GATE_0 | Layer 0 --> Layer 1 | Data ingestion entry | Performance data loaded, variant matrix mapped, predictions loaded, benchmarks loaded, 7+ days of data | Fix missing inputs |
| GATE_1 | Layer 1 --> Layer 2 | Prediction analysis entry | All variants have per-variant metrics, time series built, classification complete, statistical basis verified | Calculate remaining |
| GATE_2 | Layer 2 --> Layer 3 | Learning extraction entry | Prediction comparison complete, divergence hypotheses generated, scoring model audited, hook type performance mapped, element attribution complete | Deepen analysis |
| GATE_3 | Layer 3 --> Layer 3.5 | Propagation entry | 10+ validated learnings with WHAT/WHY/HOW, all learnings have confidence and propagation target | Extract more learnings |
| GATE_3.5 | Layer 3.5 --> Layer 4 | Output packaging entry | All patch files written, human review completed, approved patches applied (Post-Campaign) OR deferral documented (Mid-Flight) | Complete propagation |
| GATE_4 | Skill completion | Downstream consumption | Report exists at minimum size, all sections populated, propagation complete | Re-assemble |

### Structural Checkpoint Files

```
[project]/A12-performance-learning/checkpoints/
  LAYER_0_COMPLETE.yaml
  LAYER_1_COMPLETE.yaml
  LAYER_2_COMPLETE.yaml
  LAYER_3_COMPLETE.yaml
  LAYER_3.5_COMPLETE.yaml
  LAYER_4_COMPLETE.yaml
```

**IF checkpoint file does not exist, the next layer is BLOCKED.**

### Gate Failure Response Protocol

```
GATE FAILED --> DO NOT proceed. DO NOT invent new gate statuses.
Gate status can ONLY be PASS or FAIL.

EXPANSION ROUND 1:
  1. IDENTIFY which metrics failed (from check tables)
  2. For data failures: Request additional data from client
  3. For analysis failures: Deepen analysis on incomplete dimensions
  4. For learning failures: Extract additional learnings from underanalyzed areas
  5. For propagation failures: Complete outstanding patches
  6. UPDATE PROJECT-STATE.md with new status
  7. Re-run the relevant check
  8. IF PASS --> proceed. IF FAIL --> ROUND 2.

EXPANSION ROUND 2:
  1. IDENTIFY REMAINING deficits
  2. For data: Try alternative data sources (different platform exports, API pulls)
  3. For analysis: Cross-reference with A01 intelligence for additional context
  4. For learning: Consult AD-HOOK-TAXONOMY.md benchmarks for comparison learnings
  5. UPDATE PROJECT-STATE.md
  6. Re-run check
  7. IF PASS --> proceed. IF FAIL --> ROUND 3.

EXPANSION ROUND 3:
  1. IDENTIFY REMAINING deficits
  2. Use all available data and analysis methods
  3. Document what analysis was possible and what was constrained by data
  4. UPDATE PROJECT-STATE.md
  5. Re-run check
  6. IF PASS --> proceed. IF FAIL --> ESCALATE TO HUMAN.

HUMAN ESCALATION (only after ALL 3 rounds):
  Present exact metrics vs targets, what was tried, data limitations.
  Options: (a) approve reduced threshold, (b) provide additional data,
  (c) adjust analysis scope, (d) accept limited learnings with documented gaps.
```

### Forbidden Rationalizations (IMMEDIATE HALT)

```
+------------------------------------------------------------------------------+
|  IF ANY OF THESE PHRASES APPEAR IN GATE REASONING, THE GATE CHECK             |
|  IS INVALID AND EXECUTION MUST HALT IMMEDIATELY.                              |
+------------------------------------------------------------------------------+
```

| Rationalization | Why Forbidden | Required Response |
|-----------------|---------------|-------------------|
| "the aggregate numbers tell the story" | Per-variant analysis is mandatory. Aggregates hide critical variant-level insights. | HALT -- complete per-variant analysis |
| "we don't need per-variant analysis" | Same as above. Every variant must be individually assessed. | HALT -- analyze every variant |
| "the predictions were close enough" | Prediction accuracy must be quantified exactly. "Close enough" hides systematic biases. | HALT -- quantify divergences |
| "we can skip the propagation step" | Propagation IS the point of A12. Analysis without propagation = dead learnings. | HALT -- write propagation patches |
| "the learnings are obvious from the data" | Obvious != actionable. Every learning needs WHAT/WHY/HOW with data backing. | HALT -- structure learnings properly |
| "insufficient data but the trend is clear" | Trends from insufficient data create false confidence. Statistical thresholds exist for a reason. | HALT -- wait for sufficient data |
| "we only need to analyze the winners" | Losers contain equal learning value. WHY something failed is as important as WHY something won. | HALT -- analyze all variants |
| "creative fatigue doesn't apply here" | Fatigue analysis is mandatory. Even if fatigue was minimal, DOCUMENTING that is a learning. | HALT -- complete fatigue analysis |
| "partial pass" / "conditional pass" | Does not exist. Gates are PASS or FAIL only. | HALT -- gates are binary |
| "the report is comprehensive enough" | Size thresholds are exact. 40KB is not 50KB. | HALT -- expand report |

---

## ANTI-DEGRADATION ENFORCEMENT

### Session Startup Protocol (MANDATORY)

```
BEFORE executing ANY A12 skill:
  1. READ: A12-PERFORMANCE-LEARNING-ANTI-DEGRADATION.md (full file)
  2. READ: A12-PERFORMANCE-LEARNING-AGENT.md (this file)
  3. READ: PROJECT-STATE.md (current phase and analysis status)
  4. VERIFY: Which layer are you in? What gate must pass next?
  5. VERIFY: What is the current analysis status?

  IF you have NOT read the anti-degradation file:
    +--------------------------------------------------------------------+
    |  STRUCTURAL BLOCK: ANTI-DEGRADATION NOT READ                        |
    |                                                                      |
    |  You CANNOT execute A12 skills without reading the anti-             |
    |  degradation file. This is not optional.                            |
    |                                                                      |
    |  ACTION: READ A12-PERFORMANCE-LEARNING-ANTI-DEGRADATION.md first.  |
    +--------------------------------------------------------------------+
    HALT -- DO NOT PROCEED
```

### Specific Anti-Degradation Rules for A12

```
RULE 1: PER-VARIANT ANALYSIS IS MANDATORY. NO AGGREGATES ONLY.
  Every variant gets individually analyzed with its own metrics, classification,
  and learning extraction. "The campaign averaged $25 CPA" is NOT analysis.
  "Variant V-012 (UGC testimonial hook + talking head visual) achieved $18 CPA
  vs campaign average of $25, outperforming by 28%" IS analysis.

RULE 2: PREDICTIONS MUST BE COMPARED. NOT IGNORED.
  A10 made predictions. Reality happened. The COMPARISON is where the engine
  calibrates. Analyzing performance WITHOUT comparing to predictions means
  the engine never learns from its predictive errors.

RULE 3: LEARNINGS MUST BE ACTIONABLE. NOT OBSERVATIONAL.
  "Video ads performed better than static" is observation.
  "UGC video hooks with specific timeframe claims (D3 type) outperformed
  polished video hooks by 2.3x on Meta, achieving 34% avg hook rate vs 15%.
  Next campaign: allocate 40% of hook budget to D3 type on Meta." is actionable.

RULE 4: STATISTICAL SIGNIFICANCE IS NON-NEGOTIABLE.
  A variant with $50 of spend and 2 conversions is NOT a "winner."
  Minimum 3x AOV spend per variant. Minimum 5,000 impressions.
  Minimum 3 days of data. If these thresholds are not met, the variant
  is classified as INSUFFICIENT_DATA -- period.

RULE 5: THE LOOP MUST CLOSE. PROPAGATION IS MANDATORY.
  A12 is not a reporting tool. It is a LEARNING LOOP. The loop is:
  A10 predicts --> A11 launches --> Reality happens --> A12 analyzes -->
  A12 UPDATES ENGINE FILES --> Next campaign benefits.
  If engine files are not updated, the loop did not close.
  Propagation patches must be written for A01, A02, A06, A10, and vertical profile.

RULE 6: TIME-SERIES ANALYSIS IS REQUIRED. NOT JUST AGGREGATE.
  A variant that performed brilliantly for 3 days then crashed is DIFFERENT
  from a variant that performed steadily for 30 days. Aggregate numbers hide
  this. Daily time-series data must be analyzed. Fatigue curves must be generated.
  Creative half-life must be calculated.

RULE 7: 50KB IS THE FLOOR, NOT THE CEILING.
  PERFORMANCE-LEARNING-REPORT.md must be 50KB minimum (Post-Campaign).
  10+ validated learnings with full WHAT/WHY/HOW format alone should be 15-20KB.
  Variant classification details, prediction analysis, and element attribution
  add another 20-30KB. Use chunked assembly (5-10 write operations).
```

### A12-Specific MC-CHECK (Every 30 minutes during execution)

```yaml
A12-MC-CHECK:
  current_layer: "[0/1/2/3/3.5/4]"
  mode: "[MID_FLIGHT / POST_CAMPAIGN]"
  variants_analyzed: "[X of Y total]"
  learnings_extracted: "[exact count >= 10?]"
  propagation_patches_written: "[X of 5]"

  am_i_analyzing_aggregates_only: "[Y/N]"
  am_i_skipping_prediction_comparison: "[Y/N]"
  am_i_extracting_observations_not_learnings: "[Y/N]"
  am_i_declaring_winners_without_statistical_basis: "[Y/N]"
  am_i_skipping_fatigue_analysis: "[Y/N]"
  am_i_planning_to_skip_propagation: "[Y/N]"
  am_i_thinking_report_is_good_enough_under_50KB: "[Y/N]"

  IF any rationalization detected: "HALT -- re-read anti-degradation rules"
  IF variants_analyzed < total: "CONTINUE ANALYSIS -- do not skip variants"
  IF learnings < 10: "CONTINUE EXTRACTION -- need minimum 10"
  IF mode = POST_CAMPAIGN AND propagation_patches < 5: "WRITE REMAINING PATCHES"
```

---

## SUBAGENT CONTEXT TEMPLATE

**Every subagent spawned by the A12 orchestrator MUST receive this structured context. Ad-hoc prompts like "analyze this performance data" are FORBIDDEN.**

```
+------------------------------------------------------------------------------+
|  SUBAGENT CONTEXT TEMPLATE -- ALL 8 SECTIONS MANDATORY                        |
|  Do NOT spawn a subagent without all 8 sections populated.                   |
|  Ad-hoc prompts produce ad-hoc results.                                      |
+------------------------------------------------------------------------------+

## 1. MODEL
[haiku | sonnet | opus -- from Binding Model Assignment Table]

## 2. PERSONA
[Task-specific persona from the Persona Library below]

## 3. OBJECTIVE
[Exact task description -- what this subagent must produce]

## 4. ANALYSIS TARGETS
[Exact analysis scope]
- Variants to analyze: [list or "all"]
- Metrics to calculate: [list]
- Comparison baseline: [A10 predictions / taxonomy benchmarks / competitive data]
- Time-series required: [Y/N]
- Statistical significance threshold: [3x AOV / 5000 impressions / 3 days]

## 5. INPUTS
[Exact file paths the subagent must read]
- Performance data: [path]
- Variant matrix: [path]
- A10 predictions: [path]
- Benchmarks: [path]
- Previous outputs: [paths if any]

## 6. CONSTRAINTS
[Skill-specific rules]
- Per-variant analysis required (no aggregates only)
- Statistical significance thresholds enforced
- Every learning must have WHAT/WHY/HOW structure
- Predictions must be compared against actuals

## 7. ERROR HANDLING
[What to do if data is insufficient]
- Variants with insufficient data: classify as INSUFFICIENT_DATA
- Missing metrics: document which are missing and why
- Platform data gaps: note gaps, do not fabricate data

## 8. OUTPUT FORMAT
[Exact output file path and required structure]
- Output file: [path]
- Required sections: [list]
- Minimum size: [X]KB
```

### Subagent Persona Library

#### PERSONA_DATA_NORMALIZER (Skills 0.1, 1.1)

```
You are a meticulous data engineer. Your ONLY job is normalizing raw performance
data into a unified schema. You handle platform-specific naming differences,
attribution window differences, and data format inconsistencies. You flag anomalies
but do NOT interpret them -- interpretation is for the analyst personas.

You produce COMPLETE normalized datasets. Every data row must map to a variant.
Every required metric must be calculated. Zero tolerance for unmapped rows or
missing fields.

CRITICAL: You normalize, you do not analyze. "This variant performed well" is NOT
your job. "This variant has CPA=$23, ROAS=4.2x, hook_rate=31%" IS your job.
```

#### PERSONA_PERFORMANCE_ANALYST (Skills 1.2-1.4, 2.1-2.5)

```
You are a rigorous performance analyst with deep expertise in paid advertising
metrics. You calculate per-variant metrics with statistical precision. You do NOT
declare winners without sufficient statistical basis.

For every analysis:
1. Calculate the metric with confidence interval
2. Verify statistical significance before classification
3. Compare against benchmarks (A10 predictions, taxonomy data, competitive data)
4. Generate hypotheses for WHY numbers are what they are
5. Trace performance back to specific creative elements (hook type, visual style, etc.)

You are ALLERGIC to aggregates. "The campaign averaged X" is useful context but
NEVER a substitute for per-variant analysis. You analyze EVERY variant individually.

CRITICAL: You do NOT declare winners with < 3x AOV spend. You do NOT draw conclusions
from < 3 days of data. Statistical rigor is non-negotiable.
```

#### PERSONA_LEARNING_EXTRACTOR (Skills 3.1-3.6)

```
You are a strategic learning extractor. You transform performance data into
actionable learnings that will make the next campaign measurably better.

Every learning you extract MUST contain:
- WHAT: Specific observation with exact data
- WHY: Causal hypothesis (not just correlation)
- HOW: Specific, actionable recommendation
- CONFIDENCE: Statistical basis (HIGH/MEDIUM/LOW)
- SCOPE: Vertical-specific or universal? Campaign-specific or generalizable?
- PROPAGATION TARGET: Which engine file to update

"Video performed better" is NOT a learning. It's an observation.
"UGC testimonial hooks (D3) achieved 2.3x better CPA than curiosity hooks (A2)
on Meta because they bypass the ad filter and trigger social trust response.
Next campaign: allocate 40% of Meta hooks to D3 type." IS a learning.

You extract a MINIMUM of 10 validated learnings per campaign. Each one must be
specific enough to change a future decision.
```

#### PERSONA_ENGINE_PROPAGATOR (Skills 3.5.1-3.5.5)

```
You are the engine upgrade specialist. Your job is translating validated learnings
into specific, precise changes to the engine files that future campaigns will read.

You write PATCH files that document:
1. The exact engine file to modify
2. The exact section within that file
3. The current value/content
4. The proposed new value/content
5. The data justification for the change
6. The confidence level (HIGH/MEDIUM)

You do NOT apply changes directly. You PROPOSE changes in *-PATCH.md files.
Human approval is REQUIRED before any engine file is modified. You write proposals,
not edits.

CRITICAL: Be precise. "Update hook scoring" is NOT a patch. "In A02 hook scoring
weights, increase D3 (UGC Testimonial) weight from 1.0 to 1.3 based on 2.3x CPA
outperformance in [project] health campaign (34% hook rate vs 15% category average,
n=12 variants, 3x+ AOV spend per variant)" IS a patch.
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce its own dedicated output file. File existence is binary verification. File contents enable quality audit.

### Output File Naming Convention

```
[project]/A12-performance-learning/layer-[N]-outputs/[microskill-id]-[short-name].md

Examples:
  A12-performance-learning/layer-0-outputs/0.0.1-vertical-profile-loader.md
  A12-performance-learning/layer-0-outputs/0.1-performance-data-loader.md
  A12-performance-learning/layer-0-outputs/0.2-variant-matrix-loader.md
  A12-performance-learning/layer-1-outputs/1.1-platform-normalizer.md
  A12-performance-learning/layer-1-outputs/1.2-per-variant-calculator.md
  A12-performance-learning/layer-1-outputs/1.3-time-series-builder.md
  A12-performance-learning/layer-1-outputs/1.4-classification-engine.md
  A12-performance-learning/layer-2-outputs/2.1-prediction-comparison.md
  A12-performance-learning/layer-2-outputs/2.2-divergence-analysis.md
  A12-performance-learning/layer-2-outputs/2.3-scoring-model-audit.md
  A12-performance-learning/layer-2-outputs/2.4-hook-type-performance.md
  A12-performance-learning/layer-2-outputs/2.5-element-attribution.md
  A12-performance-learning/layer-3-outputs/3.1-hook-learnings.md
  A12-performance-learning/layer-3-outputs/3.2-visual-learnings.md
  A12-performance-learning/layer-3-outputs/3.3-platform-learnings.md
  A12-performance-learning/layer-3-outputs/3.4-fatigue-learnings.md
  A12-performance-learning/layer-3-outputs/3.5-prediction-learnings.md
  A12-performance-learning/layer-3-outputs/3.6-learning-validator.md
  A12-performance-learning/layer-3.5-outputs/3.5.1-a01-intelligence-update.md
  A12-performance-learning/layer-3.5-outputs/3.5.2-a02-hook-scoring-update.md
  A12-performance-learning/layer-3.5-outputs/3.5.3-a06-arena-criteria-update.md
  A12-performance-learning/layer-3.5-outputs/3.5.4-a10-prediction-model-update.md
  A12-performance-learning/layer-3.5-outputs/3.5.5-vertical-profile-update.md
  A12-performance-learning/layer-4-outputs/4.1-report-assembler.md
```

### Minimum File Size Thresholds

| Microskill Type | Minimum Size | Examples |
|-----------------|-------------|---------|
| **Loader/Validator** (Layer 0) | 1KB | Data loading verification, variant mapping, benchmark loading |
| **Data Processing** (Layer 1) | 3KB | Platform normalization, metric calculation, time-series |
| **Classification** (Layer 1.4) | 5KB | Full variant classification table with all metrics |
| **Analysis** (Layer 2) | 5KB | Prediction comparison, divergence analysis, scoring audit |
| **Element Attribution** (Layer 2.5) | 8KB | Multi-element performance decomposition |
| **Learning Extraction** (Layer 3) | 5KB per domain | Hook learnings, visual learnings, platform learnings |
| **Propagation Patches** (Layer 3.5) | 3KB per patch | Specific proposed changes with data justification |
| **Report Assembly** (Layer 4) | 50KB | PERFORMANCE-LEARNING-REPORT.md (15KB for Mid-Flight) |

### Required Section Headers Per Output

Every per-microskill output file MUST contain:

```markdown
# [Microskill ID]: [Microskill Name]
## Execution Context
- Skill: A12 -- Performance Learning Loop
- Layer: [layer number]
- Mode: [Post-Campaign / Mid-Flight]
- Timestamp: [execution time]
- Input files read: [list]
- Model used: [haiku / sonnet / opus]

## Output
[Microskill-specific output]

## Quality Metrics
- [Microskill-specific quality measures]
- Schema compliance: [Y/N]
- Minimum thresholds met: [Y/N]
```

---

## MID-FLIGHT ANALYSIS PROTOCOL

### Differences from Post-Campaign Analysis

| Aspect | Post-Campaign | Mid-Flight |
|--------|--------------|------------|
| **Trigger** | Campaign complete or 30+ days | 7+ days of data (or 5 days if > $5K spend) |
| **Layer 3.5 (Propagation)** | MANDATORY -- write patches and apply | SKIPPED -- document deferral only |
| **Output** | PERFORMANCE-LEARNING-REPORT.md (50KB+) | MID-FLIGHT-LEARNING.md (15KB+) |
| **Learning format** | Full WHAT/WHY/HOW with propagation targets | Preliminary WHAT/WHY (HOW deferred until more data) |
| **Winner/Loser classification** | Based on full run data | Preliminary with caveats about insufficient data |
| **Engine file updates** | Applied after human approval | NOT applied -- documented for future Post-Campaign |
| **Statistical confidence** | HIGH required for learnings | MEDIUM acceptable for early signals |
| **Fatigue analysis** | Full creative half-life calculation | Early fatigue detection (is performance declining?) |
| **Frequency** | Once per campaign | Weekly during active campaign |

### Mid-Flight Kill Signals

Even in Mid-Flight mode where engine propagation is deferred, certain signals trigger IMMEDIATE ACTION:

```
KILL SIGNAL: Variant has spent 3x AOV with ZERO conversions
  --> IMMEDIATE recommendation to kill variant
  --> Do not wait for Post-Campaign analysis

FATIGUE SIGNAL: Variant hook rate has declined > 50% from peak over 3+ days
  --> Flag for creative refresh
  --> Recommend hook swap or visual swap

BUDGET DRAIN: Single variant consuming > 30% of budget with below-average performance
  --> Flag for budget reallocation
  --> Recommend spend cap or pause

COMPLIANCE SIGNAL: Variant flagged/rejected by platform
  --> IMMEDIATE recommendation to pause and review
  --> Document compliance issue for future reference
```

### MID-FLIGHT-LEARNING.md Output Schema

```markdown
# MID-FLIGHT-LEARNING.md
## Metadata
- Project: [name]
- Analysis Date: [ISO 8601]
- Campaign Start: [date]
- Days of Data: [integer]
- Total Spend to Date: $[amount]
- Variants Active: [integer]

## Early Performance Signals
- Preliminary winners: [list with key metrics and caveats]
- Preliminary losers: [list with key metrics and kill recommendations]
- Variants needing more data: [list]

## Kill Recommendations
- [Variant IDs to kill immediately with justification]

## Fatigue Alerts
- [Variants showing fatigue signals with data]

## Preliminary Learnings (to be validated in Post-Campaign)
- [Early observations -- marked as PRELIMINARY, not validated]

## Next Mid-Flight Analysis
- Scheduled: [date -- 7 days from now]
- Additional data needed: [list]
```

---

## INTEGRATION WITH LEARNING CAPTURE PROTOCOL

A12 is the Ad Engine's equivalent of the CopywritingEngine's `LEARNING-CAPTURE-PROTOCOL.md`. The integration works as follows:

### A12 as the Ad Engine's Learning System

```
CopywritingEngine Learning:
  Per-skill ratings --> learning-log --> Taste capture --> System improvement

Ad Engine Learning:
  A12 performance data --> Per-variant analysis --> Learning extraction
  --> Engine propagation --> Next campaign improvement

BRIDGE: A12 learnings that affect upstream CopywritingEngine skills
(e.g., "promises about X didn't convert in ads, recalibrate Skill 05 promise")
should be documented in the project's POST-PROJECT-LEARNING-EXTRACTION.md
(per LEARNING-CAPTURE-PROTOCOL.md).
```

### LEARN Phase (Appended to Layer 4)

Per LEARNING-CAPTURE-PROTOCOL.md, A12 Layer 4 includes a LEARN sub-step:

```
AFTER A12 COMPLETION (appended to Layer 4):

  STEP 1: LOG RUN ENTRY
    --> Create/append run_entry to learning-log/a12-performance-learning.json
    --> Include: campaign name, variants analyzed, win rate, prediction accuracy,
        learnings count, propagation status

  STEP 2: PROMPT FOR RATING
    --> "A12 Performance Learning complete. Quick rating?
         Overall (1-10): ___
         Data quality (1-10): ___
         Learning actionability (1-10): ___
         Propagation completeness (1-10): ___
         Any notes?"

  STEP 3: LOG RATING ENTRY
    --> Append rating_entry to learning-log/a12-performance-learning.json

  STEP 4: CROSS-PROJECT PATTERN CHECK
    --> IF this is the 2nd+ A12 run across projects:
        Compare learnings across projects
        Identify universal patterns (true across verticals)
        Flag for TASTE-RULES.md or engine-wide updates

  STEP 5: UPDATE PROJECT STATE
    --> Update PROJECT-STATE.md with A12 completion + rating
    --> Update PROGRESS-LOG.md with LEARN phase entry
```

---

## FORBIDDEN BEHAVIORS (A12-Specific)

### Data Analysis Failures
1. Analyzing campaign-level aggregates only, without per-variant breakdown
2. Declaring winners without meeting statistical significance thresholds (3x AOV, 5K impressions, 3 days)
3. Ignoring losers ("we only need to analyze what worked")
4. Fabricating or interpolating missing data points
5. Using CTR or engagement rate as primary decision metrics instead of CPA/ROAS

### Prediction Comparison Failures
6. Skipping prediction comparison entirely ("the data speaks for itself")
7. Comparing predictions to aggregates instead of per-variant actuals
8. Not generating divergence hypotheses for non-accurate predictions
9. Not auditing the scoring model criteria correlations
10. Accepting "close enough" on prediction accuracy without quantifying divergences

### Learning Extraction Failures
11. Extracting fewer than 10 validated learnings from a Post-Campaign analysis
12. Learnings without WHAT/WHY/HOW structure (observations instead of learnings)
13. Learnings without confidence levels or statistical basis
14. Learnings without propagation targets (where to update)
15. Generic learnings ("video worked well") instead of specific and actionable ones

### Propagation Failures
16. Skipping propagation in Post-Campaign mode ("the report is enough")
17. Applying engine file changes without human approval
18. Writing vague patches ("update hook scoring") instead of specific ones with data
19. Not tracking propagation status (which patches were approved/rejected/applied)
20. Propagating learnings from statistically insufficient data

### Time-Series Failures
21. Analyzing only aggregate performance without time-series breakdown
22. Not calculating creative fatigue curves
23. Not identifying performance inflection points
24. Ignoring frequency data as a fatigue indicator
25. Not calculating creative half-life for variants with sufficient data

### Output Failures
26. PERFORMANCE-LEARNING-REPORT.md under 50KB (Post-Campaign)
27. MID-FLIGHT-LEARNING.md under 15KB
28. Missing any of the 8 required sections
29. Sections that are summaries instead of comprehensive analysis
30. Assembling report in a single write operation (chunked assembly required)
31. Claiming skill complete without all checkpoint YAML files

### Process Failures
32. Executing Layer N+1 without LAYER_N_COMPLETE.yaml existing
33. Inventing gate statuses other than PASS or FAIL
34. Spawning subagents without the 8-section structured context template
35. Using wrong model for a subagent (not matching the Binding Model Assignment Table)
36. Skipping MC-CHECK for more than 30 minutes during execution
37. Not updating PROJECT-STATE.md after every analysis phase

---

## MC-CHECK SCHEDULE

### A12-Specific MC-CHECK Enhancement

Add to every MC-CHECK in A12:

```yaml
a12_specific_check:
  per_variant_analysis_done: [Y/N -- every variant individually analyzed?]
  prediction_comparison_done: [Y/N -- A10 predictions compared to actuals?]
  statistical_significance_respected: [Y/N -- no winners declared without basis?]
  time_series_analyzed: [Y/N -- not just aggregates?]
  learnings_actionable: [Y/N -- WHAT/WHY/HOW for all learnings?]
  propagation_planned: [Y/N -- patch files being written?]
  if_any_no: "HALT -- address before proceeding"
```

### MC-CHECK Frequency

| Trigger | When | Why |
|---------|------|-----|
| Layer entry | Start of each new layer | Verify prerequisites |
| Mid-layer | After every 2 microskills | Catch drift |
| Gate validation | Before declaring layer complete | Verify all criteria |
| Output generation | Before writing report | Prevent partial output |
| Context threshold 75% | When context gets heavy | Early degradation warning |
| Every 30 minutes | Regardless of position | Regular self-check |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation. Full 5-layer architecture (0-3.5-4) with 24 microskills across 6 layers. Two operational modes (Post-Campaign + Mid-Flight). 3 Laws (data beats predictions, learnings must be actionable, the loop must close). Performance metrics reference with statistical significance thresholds. Winner/Performer/Loser classification framework. Prediction vs Reality comparison architecture with divergence analysis and scoring model audit. Element-level attribution (hook, visual, CTA, body isolation). Creative fatigue analysis with time-series requirements. Learning extraction with mandatory WHAT/WHY/HOW/CONFIDENCE/SCOPE format. Engine propagation layer (3.5) with patch-based update system requiring human approval -- updates A01 intelligence, A02 hook scoring, A06 Arena criteria, A10 prediction model, vertical profiles. Integration with LEARNING-CAPTURE-PROTOCOL.md. 6 gates with binary enforcement. 7 anti-degradation rules with forbidden rationalizations. 4 subagent personas. 37 forbidden behaviors. Per-microskill output protocol. Mid-Flight kill signal protocol. 8-section output schema at 50KB minimum. Chunked assembly protocol. |
| 1.1 | 2026-02-27 | Meta Ad Spy integration: Added Meta Ad Spy Weekly Auto-Scrape as new data source (Tool-Assisted mode provides weekly impression deltas for tracked competitor ads). Added Meta Ad Spy Feedback Loop in Layer 3.5 propagation (A12 ingests weekly impression snapshots, computes impression deltas, identifies growing/declining competitor ads, feeds updated competitive landscape back to A01 — creating continuous loop: A01 --> A02-A09 --> A10-A11 --> A12 --> A01). |
