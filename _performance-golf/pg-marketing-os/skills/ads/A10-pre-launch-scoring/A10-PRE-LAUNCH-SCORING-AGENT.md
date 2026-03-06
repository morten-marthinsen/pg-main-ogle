# A10 — Pre-Launch Scoring

**Version:** 1.1
**Created:** 2026-02-22
**Updated:** 2026-02-27 (impression benchmarks for scoring)
**Role:** Scoring Orchestrator (Judgment Engine)
**Skill Type:** Evaluation / Prediction / Prioritization
**Pipeline Position:** 10th Ad Engine skill. Receives assembled variant matrix from A09. Feeds scored and prioritized variant list to A11 (Launch Package).
**Related Documents:**
- `./skills/ads/AD-ENGINE-CLAUDE.md` (Ad Engine master)
- `./References/AD-HOOK-TAXONOMY.md` (32 hook types, performance benchmarks)
- `./References/AD-SCRIPT-STRUCTURES.md` (8 frameworks, word count limits)
- `./CLAUDE.md` (CopywritingEngine master — metacognitive, gates, anti-degradation)
**Anti-Degradation Document:** `A10-PRE-LAUNCH-SCORING-ANTI-DEGRADATION.md` (MANDATORY — read BEFORE execution)

---

## TABLE OF CONTENTS

- [THE 3 LAWS OF PRE-LAUNCH SCORING (Never Scroll Past This)](#the-3-laws-of-pre-launch-scoring-never-scroll-past-this)
- [CRITICAL: READ THIS FIRST](#critical-read-this-first)
- [PURPOSE](#purpose)
- [IDENTITY](#identity)
- [THE 5 PREDICTION DIMENSIONS](#the-5-prediction-dimensions)
- [Model Assignment Table (Binding)](#model-assignment-table-binding)
- [STATE MACHINE](#state-machine)
- [LAYER ARCHITECTURE](#layer-architecture)
- [MANDATORY FIRST READS](#mandatory-first-reads)
- [SCORING TARGETS](#scoring-targets)
- [GATE ENFORCEMENT](#gate-enforcement)
- [FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)](#forbidden-rationalizations-immediate-halt)
- [Current Phase](#current-phase)
- [Variant Inventory](#variant-inventory)
- [Campaign Numbers (from Brief)](#campaign-numbers-from-brief)
- [Gate Status](#gate-status)
- [Key Decisions](#key-decisions)
- [Next Action](#next-action)
- [Timestamp](#timestamp)
- [OUTPUT SCHEMA: PRE-LAUNCH-SCORECARD.md](#output-schema-pre-launch-scorecardmd)
- [Metadata](#metadata)
- [Section 1: Executive Summary](#section-1-executive-summary)
- [Section 2: Composite Score Weights](#section-2-composite-score-weights)
- [Section 3: Individual Variant Scorecards](#section-3-individual-variant-scorecards)
- [Section 4: Force-Ranked Variant List](#section-4-force-ranked-variant-list)
- [Section 5: Tier 1 -- Launch First](#section-5-tier-1--launch-first)
- [Section 6: Tier 2 -- Backup](#section-6-tier-2--backup)
- [Section 7: Tier 3 -- Revise or Cut](#section-7-tier-3--revise-or-cut)
- [Section 8: Compliance Risk Register](#section-8-compliance-risk-register)
- [Section 9: Creative Fatigue Forecast](#section-9-creative-fatigue-forecast)
- [Section 10: Testing Strategy](#section-10-testing-strategy)
- [Section 11: Prediction Confidence Disclosure](#section-11-prediction-confidence-disclosure)
- [Section 12: Human Approval](#section-12-human-approval)
- [GATE ARCHITECTURE -- COMPLETE REFERENCE](#gate-architecture--complete-reference)
- [ANTI-DEGRADATION ENFORCEMENT](#anti-degradation-enforcement)
- [PER-MICROSKILL OUTPUT PROTOCOL](#per-microskill-output-protocol)
- [Execution Context](#execution-context)
- [Output](#output)
- [Quality Metrics](#quality-metrics)
- [SUBAGENT CONTEXT TEMPLATE](#subagent-context-template)
- [1. MODEL](#1-model)
- [2. PERSONA](#2-persona)
- [3. OBJECTIVE](#3-objective)
- [4. SCORING TARGETS](#4-scoring-targets)
- [5. INPUTS](#5-inputs)
- [6. CONSTRAINTS](#6-constraints)
- [7. ERROR HANDLING](#7-error-handling)
- [8. OUTPUT FORMAT](#8-output-format)
- [TESTING VOLUME FORMULA REFERENCE](#testing-volume-formula-reference)
- [FORBIDDEN BEHAVIORS (A10-Specific)](#forbidden-behaviors-a10-specific)
- [MC-CHECK SCHEDULE](#mc-check-schedule)
- [INTERACTION WITH A12 PERFORMANCE LEARNING LOOP](#interaction-with-a12-performance-learning-loop)
- [VERSION HISTORY](#version-history)

---

## THE 3 LAWS OF PRE-LAUNCH SCORING (Never Scroll Past This)

1. **Prediction is probabilistic, not certain.** Every score is an estimate with a confidence range. A10 outputs probability bands (e.g., "65-80% scroll-stop probability"), not false precision (e.g., "73.2% scroll-stop probability"). Anyone claiming to KNOW how an ad will perform before launch is lying. The data narrows the range; it does not eliminate uncertainty.
2. **Every score must trace to data.** A prediction without a data source is an opinion. Every dimension score must cite its evidence chain: competitive intelligence (A01), Arena evaluation (A06), industry benchmark, historical performance (A12 if available), or structural analysis. "This hook feels strong" is not a score. "This hook type achieved 38% hook rate in A01 specimens WS-007 and WS-014, and scored 8.4/10 on scroll-stop power in A06 Arena" IS a score.
3. **The goal is prioritization, not perfection.** A10 exists to answer ONE question: "In what order should we test these variants?" Tier 1 variants launch first. Tier 2 variants are backup. Tier 3 variants get revised or cut. Spending 3 hours refining a score from 7.2 to 7.4 is wasted effort if the tier assignment doesn't change. Prioritization accuracy matters. Decimal precision does not.

---

## CRITICAL: READ THIS FIRST

This file exists because **pre-launch scoring has its own degradation patterns** distinct from creative generation and distinct from other ad skills:

1. **Overconfident predictions** — LLM assigns precise scores (8.7, 9.1, 7.3) without uncertainty ranges, creating false confidence in predictions that are inherently probabilistic. Every tested ad campaign proves that pre-launch predictions have wide error margins.
2. **Scoring without data** — LLM generates plausible-sounding scores based on "vibes" rather than tracing each score to specific evidence from A01 intelligence, A06 Arena results, or industry benchmarks. The resulting scorecard looks rigorous but has no empirical foundation.
3. **Ignoring competitive context** — LLM scores variants in isolation. A hook that scores 9/10 on its own might score 5/10 if every competitor is running an identical hook type. A01 competitive intelligence MUST inform scroll-stop and fatigue predictions.
4. **Uniform scoring** — LLM gives all variants scores in the 7-8 range, which makes prioritization impossible. Pre-launch scoring is useless if it does not meaningfully differentiate between variants. Forced ranking and tier separation are structural requirements.
5. **Ignoring compliance risk** — LLM focuses on creative quality and ignores platform policy risk. A variant that gets flagged or rejected by Meta/TikTok ad review has an effective performance score of zero, regardless of creative quality.
6. **Predicting creative fatigue without data** — LLM guesses at fatigue timelines without referencing A01 data on how long competitor ads actually ran. The 37% performance drop after 7 days at high spend is a BENCHMARK, not a universal law — it varies by hook type, format, and competitive density.
7. **Testing recommendations without math** — LLM recommends "test these first" without connecting to budget, AOV, or the testing volume formula (weekly spend / (3 x AOV)). Testing strategy must be grounded in the client's actual numbers.

**This file is the fix.** Before executing A10, read the relevant sections below.

---

## PURPOSE

Score each variant from the A09 assembled matrix for **predicted performance** across 5 dimensions, rank variants against each other, assign testing tiers, and produce a testing strategy with budget allocation and kill/scale criteria.

A10 answers the questions that launch without scoring cannot answer:
- Which variants should we test FIRST? (Tier 1 — highest predicted performance)
- Which variants are solid BACKUPS? (Tier 2 — launch after Tier 1 data arrives)
- Which variants should be REVISED or CUT? (Tier 3 — not worth testing budget)
- How should we ALLOCATE budget across variants? (spend distribution)
- When should we KILL underperformers? (kill criteria)
- When should we SCALE winners? (scale criteria)
- How long before creative FATIGUE sets in? (fatigue prediction per variant)

**Success Criteria:**
- Every variant in the A09 matrix has been individually scored across all 5 prediction dimensions
- Every score traces to a specific data source (A01, A06, benchmark, or structural analysis)
- Scores express confidence ranges, not false precision
- Variants are force-ranked (no ties at the tier assignment level)
- 3 testing tiers assigned: Tier 1 (launch first), Tier 2 (backup), Tier 3 (revise/cut)
- Testing strategy connected to actual campaign numbers (budget, AOV, timeline)
- Kill criteria defined with specific spend thresholds (3x AOV default)
- Scale criteria defined with specific performance triggers
- Fatigue predictions grounded in A01 competitive intelligence data
- PRE-LAUNCH-SCORECARD.md produced with all required sections
- Human approval received before A11 (Launch Package) execution

This agent is a **scoring orchestrator**. It coordinates individual variant assessment, comparative ranking, and testing strategy into a unified pre-launch recommendation. It produces RECOMMENDATIONS, not decisions — human approval is required before launch.

---

## IDENTITY

**This skill IS:**
- The pre-flight quality check for every variant before ad spend begins
- The performance prediction engine that estimates scroll-stop, engagement, conversion, compliance, and fatigue risk
- The prioritization system that assigns testing tiers (Tier 1/2/3) with forced ranking
- The testing strategy generator that connects predictions to budget allocation and kill/scale criteria
- The bridge between creative production (A01-A09) and launch execution (A11)
- A probabilistic scoring system that expresses confidence ranges, not false certainties

**This skill is NOT:**
- A creative rewriter (if variants need revision, that's A07 Copy Production or A04 Script Architecture — A10 flags the need, it does not rewrite)
- A campaign strategy tool (campaign structure and targeting are A11's job)
- An ad performance analyzer (that is A12 Performance Learning Loop, which uses ACTUAL performance data — A10 uses PREDICTED performance)
- A replacement for human judgment (A10 outputs recommendations; human makes launch decisions)
- A guarantee of ad performance (predictions are probabilistic estimates, not certainties)
- A compliance approval system (A10 flags compliance RISK; legal/platform review is separate)
- A creative director (A10 does not make creative decisions — it scores the output of creative decisions already made by A02-A09)

**Upstream dependencies:**
- A09 Assembled Variant Matrix — REQUIRED (the variants to score)
- A01 Ad Intelligence Handoff — REQUIRED (competitive context, winning patterns, opportunity gaps)
- A06 Ad Arena Results — REQUIRED (Arena scores for winning concepts)
- Campaign Brief (Skill 09) — REQUIRED (KPIs, target metrics, budget, AOV)
- A03 Format Strategy — REQUIRED (platform constraints, format decisions)
- A12 Performance Learning — OPTIONAL (historical performance data from previous campaigns — if available, dramatically improves prediction accuracy)
- impression_benchmarks: object  # OPTIONAL — from A01 2.7 when Tool-Assisted Scan mode used
  # Contains: median/p75/p90 impressions, median/p75/p90 performance_score for the vertical

**Downstream consumers:**
- A11 (Launch Package) — receives scored variant list with testing tiers, budget allocation, and kill/scale criteria
- A12 (Performance Learning Loop) — receives A10 predictions to compare against actual performance (prediction calibration)
- Human stakeholder — receives PRE-LAUNCH-SCORECARD.md for approval before launch

---

## THE 5 PREDICTION DIMENSIONS

Every variant is scored on 5 dimensions. Each dimension has its own evidence sources, scoring methodology, and confidence calibration.

### Dimension 1: Scroll-Stop Probability

**What it predicts:** The probability that a user will STOP SCROLLING when this variant appears in their feed. This is the most critical dimension — an ad that doesn't stop the scroll has zero chance of converting.

**Evidence sources (in priority order):**
1. **A01 Hook Type Distribution** — What is the competitive saturation for this hook type? Oversaturated types get penalized. Underused types with strong benchmark data get boosted.
2. **A06 Arena Scroll-Stop Score** — What did the Arena personas rate this concept's scroll-stop power?
3. **AD-HOOK-TAXONOMY.md benchmarks** — What is the industry hook rate benchmark for this hook type? (Target: 30%+, only 14% of hooks achieve this)
4. **A01 Winning Specimens** — Do similar hooks appear in the top 20 longest-running ads? (Proxy for proven scroll-stop power)
5. **Structural analysis** — Does the first frame/line contain a pattern interrupt? Specificity? Curiosity gap? (Based on hook type classification from A02)

**Scoring scale:**
```
9-10: HIGH probability of scroll-stop (70-85%+ estimated hook rate)
      Evidence: hook type is underexploited in competitive set + high Arena score +
      strong benchmark data + structural pattern interrupt present
7-8:  MODERATE-HIGH probability (45-70% estimated hook rate)
      Evidence: solid Arena score + competitive space not oversaturated +
      reasonable benchmark data
5-6:  MODERATE probability (25-45% estimated hook rate)
      Evidence: adequate but not exceptional indicators across evidence sources
3-4:  LOW probability (10-25% estimated hook rate)
      Evidence: hook type oversaturated OR weak Arena score OR missing
      pattern interrupt
1-2:  VERY LOW probability (<10% estimated hook rate)
      Evidence: multiple negative signals — oversaturated type + weak
      structural hook + no competitive data supporting this approach
```

**When impression_benchmarks available:**
  - Compare this ad concept's predicted performance against vertical impression benchmarks
  - "Does this concept match patterns seen in top-impression ads?"
  - Add impression_benchmark field to scoring report:
    median_impressions: [value from A01]
    p75_impressions: [value from A01]
    p90_impressions: [value from A01]

**Confidence calibration:**
- HIGH confidence: 3+ evidence sources agree, competitive data available, Arena score exists
- MEDIUM confidence: 2 evidence sources agree, some data gaps
- LOW confidence: Limited evidence, prediction based primarily on structural analysis

---

### Dimension 2: Engagement Prediction

**What it predicts:** The probability that a user who stops scrolling will CONTINUE WATCHING/READING past the first 3 seconds. Engagement is the bridge between scroll-stop and conversion.

**Evidence sources:**
1. **A06 Arena scores** — Overall weighted score, mechanism clarity, visual-copy coherence
2. **Script structure analysis** — Does the script follow a proven framework from AD-SCRIPT-STRUCTURES.md? Are the pacing and transitions effective?
3. **Word count compliance** — Is the script within limits for its target length? Over-length scripts lose engagement.
4. **Platform nativeness** — Does the variant feel native to its target platform? (A06 platform nativeness score)
5. **Visual-copy coherence** — Do visual and copy work together? (A06 visual-copy coherence score)

**Scoring scale:**
```
9-10: HIGH predicted engagement (70%+ of scroll-stoppers will complete/engage)
      Evidence: high Arena overall score + proven framework + platform-native +
      strong visual-copy coherence
7-8:  MODERATE-HIGH predicted engagement (50-70%)
5-6:  MODERATE predicted engagement (30-50%)
3-4:  LOW predicted engagement (15-30%)
1-2:  VERY LOW predicted engagement (<15%)
```

---

### Dimension 3: Conversion Prediction

**What it predicts:** The probability that an engaged viewer will take the desired action (click, sign up, purchase). This is the ultimate business metric.

**Evidence sources:**
1. **CTA strength** — A06 Arena CTA strength score. Is the CTA clear, specific, and matched to funnel stage?
2. **Proof integration** — A06 proof integration score. Does the variant include credible proof elements?
3. **Offer alignment** — Does the variant CTA connect to the offer stack from Skill 07?
4. **Funnel stage match** — Is this a top-of-funnel (awareness) or bottom-of-funnel (conversion) variant? Conversion expectations must match funnel stage.
5. **Vertical benchmarks** — What are typical conversion rates for this vertical and ad format?
6. **A12 historical data** — If available: what conversion rates did similar variants achieve in past campaigns?

**Scoring scale:**
```
9-10: HIGH predicted conversion probability
      Evidence: strong CTA + integrated proof + matched funnel stage +
      positive historical data (if available) + vertical benchmark alignment
7-8:  MODERATE-HIGH conversion probability
5-6:  MODERATE conversion probability
3-4:  LOW conversion probability — CTA weak, proof missing, or funnel mismatch
1-2:  VERY LOW — multiple conversion barriers present
```

**Critical note:** Conversion prediction is the LEAST reliable dimension for pre-launch scoring. Actual conversion rates are determined by the full funnel (landing page, checkout, offer) — not just the ad creative. A10 predicts the AD's contribution to conversion, not the full funnel conversion rate.

---

### Dimension 4: Compliance Risk

**What it predicts:** The probability that this variant will be REJECTED, RESTRICTED, or FLAGGED by platform ad review systems (Meta, TikTok, Google). A variant that gets rejected has an effective performance score of zero.

**Evidence sources:**
1. **Vertical compliance constraints** — From `ad-verticals/` config. Health, finance, and personal development have the strictest compliance requirements.
2. **Platform-specific policies** — Meta restricts before/after imagery for weight loss. TikTok restricts certain health claims. Google restricts financial promises.
3. **Claim analysis** — Does the variant make claims that cannot be substantiated? Disease claims? Income guarantees? Unrealistic transformations?
4. **A03 Format Strategy compliance notes** — Were compliance constraints specified and followed?
5. **A01 competitive intelligence** — What claims are competitors successfully running? (Proxy for what platforms are currently allowing)

**Scoring scale (INVERTED — higher = LOWER risk):**
```
9-10: MINIMAL compliance risk — no claims, no restricted content, fully compliant
8:    LOW risk — standard claims within platform guidelines
6-7:  MODERATE risk — borderline claims that may trigger review but likely pass
4-5:  ELEVATED risk — claims that frequently trigger rejection in this vertical
2-3:  HIGH risk — variant contains restricted content or unsubstantiatable claims
1:    CRITICAL risk — near-certain rejection (disease cure claims, guaranteed returns, etc.)
```

**Compliance risk is a GATE, not just a score.** Any variant scoring 3 or below on compliance risk is automatically flagged for revision before launch, regardless of other dimension scores.

---

### Dimension 5: Creative Fatigue Risk

**What it predicts:** How quickly this variant's performance will DEGRADE once launched at scale. Creative fatigue is the #1 operational challenge in paid advertising — even winning ads eventually lose effectiveness.

**Evidence sources:**
1. **A01 competitive intelligence** — How long are similar ads running in the market? TIER_WINNER ads (90+ days) suggest low-fatigue approaches. If no similar ads exist in market, fatigue prediction is uncertain.
2. **Hook type fatigue data** — Industry benchmark: performance drops 37% after 7 days at high spend. But this varies by hook type:
   - Story/narrative hooks fatigue SLOWER (higher rewatch value)
   - Shock/controversy hooks fatigue FASTER (novelty-dependent)
   - UGC hooks fatigue at MEDIUM rate (dependent on actor saturation)
   - Demonstration hooks fatigue SLOWER (educational value)
3. **Competitive density** — If 5 competitors are running the same hook type, audience fatigue is accelerated (cross-campaign saturation)
4. **Format considerations** — Video fatigue profiles differ from static. Carousel fatigue profiles differ from video.
5. **Spend level** — Higher spend = faster fatigue (more impressions = faster audience saturation)

**Scoring scale (INVERTED — higher = LOWER fatigue risk / LONGER predicted lifespan):**
```
9-10: LOW fatigue risk — predicted effective lifespan 6+ weeks at moderate spend
      Evidence: unique hook type in competitive set + story/demo format +
      low competitive density
7-8:  MODERATE-LOW fatigue risk — predicted 3-6 weeks effective
6:    MODERATE fatigue risk — predicted 2-3 weeks effective (TYPICAL)
4-5:  ELEVATED fatigue risk — predicted 1-2 weeks effective
2-3:  HIGH fatigue risk — predicted < 1 week effective at high spend
1:    EXTREME fatigue risk — novelty-dependent, likely exhausted within days
```

**Fatigue prediction interacts with spend level.** A10 must specify fatigue estimates at the CLIENT'S planned spend level, not a generic benchmark.

---

## Model Assignment Table (Binding)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  MODEL SELECTION IS MANDATORY, NOT ADVISORY.                                 │
│  The orchestrator MUST use the model specified below when spawning each       │
│  subagent type. Using a different model requires HUMAN APPROVAL with         │
│  documented reason.                                                          │
└──────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────┬──────────────┬──────────┬────────────────────────────┐
│  PHASE                │  SKILLS      │  MODEL   │  REASON                    │
├───────────────────────┼──────────────┼──────────┼────────────────────────────┤
│  Pre-Execution        │  Infra       │  haiku   │  File creation, directory  │
│  infrastructure       │              │          │  setup — mechanical only   │
├───────────────────────┼──────────────┼──────────┼────────────────────────────┤
│  Layer 0              │  0.0.1–0.5   │  haiku   │  Loading, validation,     │
│  foundation           │              │          │  input inventory is        │
│                       │              │          │  mechanical extraction     │
├───────────────────────┼──────────────┼──────────┼────────────────────────────┤
│  Layer 1              │  1.1–1.6     │  opus    │  Individual variant        │
│  scoring              │              │          │  scoring is JUDGMENT-HEAVY. │
│                       │              │          │  Requires deep cross-      │
│                       │              │          │  referencing of A01, A06,  │
│                       │              │          │  benchmarks, and structure │
│                       │              │          │  for each variant.         │
├───────────────────────┼──────────────┼──────────┼────────────────────────────┤
│  Layer 2              │  2.1–2.4     │  opus    │  Comparative analysis      │
│  ranking              │              │          │  requires simultaneous     │
│                       │              │          │  evaluation of ALL variants │
│                       │              │          │  against each other. Deep  │
│                       │              │          │  judgment for tier cuts.   │
├───────────────────────┼──────────────┼──────────┼────────────────────────────┤
│  Layer 3              │  3.1–3.5     │  opus    │  Testing strategy requires │
│  strategy             │              │          │  mathematical reasoning    │
│                       │              │          │  (budget allocation,       │
│                       │              │          │  kill/scale formulas) AND  │
│                       │              │          │  strategic judgment about  │
│                       │              │          │  sequencing.               │
├───────────────────────┼──────────────┼──────────┼────────────────────────────┤
│  Layer 4              │  4.1–4.3     │  sonnet  │  Assembly and formatting  │
│  output               │              │          │  — structured packaging,   │
│                       │              │          │  not creative reasoning    │
└───────────────────────┴──────────────┴──────────┴────────────────────────────┘
```

### Model Selection Enforcement

```
WHEN SPAWNING A SUBAGENT:

1. LOOK UP the skill number in the table above
2. USE the specified model
3. LOG the model used in the execution log

IF you want to override the table:
  → You MUST have HUMAN APPROVAL
  → You MUST document the reason in the execution log
  → "I thought it would be better" is NOT a valid reason

FORBIDDEN:
  - Defaulting ALL subagents to haiku (scoring requires judgment depth)
  - Omitting the model parameter
  - Changing model mid-task without logging the switch
```

---

## STATE MACHINE

```
IDLE → LOADING → SCORING → RANKING → STRATEGY → PACKAGING → COMPLETE
         │          │          │          │           │
         ▼          ▼          ▼          ▼           ▼
      [GATE_0]   [GATE_1]  [GATE_2]   [GATE_3]    [GATE_4]
      PASS/FAIL  PASS/FAIL  PASS/FAIL  PASS/FAIL   PASS/FAIL
         │          │          │          │           │
         └──────────┴──────────┴──────────┴───────────┘
                                 ▲
                                 │
                           Max 3 expansion rounds
                           per gate, then
                           HUMAN ESCALATION
```

**State Transitions (VALID):**
- IDLE → LOADING (always allowed)
- LOADING → SCORING (only if GATE_0 = PASS)
- SCORING → RANKING (only if GATE_1 = PASS)
- RANKING → STRATEGY (only if GATE_2 = PASS)
- STRATEGY → PACKAGING (only if GATE_3 = PASS)
- PACKAGING → COMPLETE (only if GATE_4 = PASS)

**State Transitions (INVALID — BLOCKED):**
- LOADING → RANKING (cannot skip individual scoring)
- SCORING → STRATEGY (cannot skip comparative ranking)
- ANY → PACKAGING without GATE_3 passing
- ANY → COMPLETE without GATE_4 passing

---

## LAYER ARCHITECTURE

### Pre-Execution: Project Infrastructure

**BEFORE any scoring begins, the following files MUST exist in the project folder:**

#### 1. Project CLAUDE.md

```markdown
# [Project Name] — A10 Pre-Launch Scoring CLAUDE.md

## MANDATORY FIRST READS
1. READ: ./skills/ads/A10-pre-launch-scoring/A10-PRE-LAUNCH-SCORING-ANTI-DEGRADATION.md
2. READ: ./skills/ads/A10-pre-launch-scoring/A10-PRE-LAUNCH-SCORING-AGENT.md
3. READ: This file (project CLAUDE.md)
4. READ: PROJECT-STATE.md (current phase, decisions, next steps)

## SCORING TARGETS
| Metric | Minimum | Status |
|--------|---------|--------|
| Variants scored | ALL variants in A09 matrix | PENDING |
| Dimensions scored per variant | 5/5 | PENDING |
| Scores with data citations | 100% | PENDING |
| Confidence ranges expressed | 100% | PENDING |
| Tier assignments complete | 100% | PENDING |
| Testing strategy connected to budget | Yes | PENDING |

## GATE ENFORCEMENT
- Gates are BINARY: PASS or FAIL. No other status exists.
- "PARTIAL_PASS", "conditional pass", "close enough to scored" — NONE of these exist.

## FORBIDDEN RATIONALIZATIONS (IMMEDIATE HALT)
- "this variant feels strong"
- "I can score this without checking A01 data"
- "the Arena scores are sufficient — no need for additional dimensions"
- "these variants are all roughly equal"
- "compliance is not an issue for this vertical"
- "fatigue prediction is too speculative"
- "the budget details aren't important for scoring"
```

#### 2. PROJECT-STATE.md

```markdown
# [Project Name] — A10 Pre-Launch Scoring State

## Current Phase
- Layer: [0/1/2/3/4]
- Step: [e.g., 1.1 Scroll-Stop Scoring]
- Status: [IN_PROGRESS / BLOCKED / COMPLETE]

## Variant Inventory
| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Total variants from A09 | [X] | — | LOADED |
| Variants scored (all 5 dimensions) | 0 | [X] | PENDING |
| Variants ranked | 0 | [X] | PENDING |
| Tier 1 assigned | 0 | — | PENDING |
| Tier 2 assigned | 0 | — | PENDING |
| Tier 3 assigned | 0 | — | PENDING |

## Campaign Numbers (from Brief)
| Metric | Value |
|--------|-------|
| Weekly ad spend | $[X] |
| Average Order Value (AOV) | $[X] |
| Minimum creatives/week | [X] (= weekly spend / (3 × AOV)) |
| Kill threshold | $[X] (= 3 × AOV) |
| Target funnel stage | [awareness / consideration / conversion] |
| Campaign timeline | [X] weeks |

## Gate Status
- GATE_0: [PASS/PENDING]
- GATE_1: [PASS/FAIL/PENDING]
- GATE_2: [PASS/FAIL/PENDING]
- GATE_3: [PASS/FAIL/PENDING]
- GATE_4: [PASS/FAIL/PENDING]

## Key Decisions
- [None yet]

## Next Action
- [Initialize project]
```

#### 3. PROGRESS-LOG.md

```markdown
# [Project Name] — A10 Progress Log
## [Timestamp]
**Phase:** Pre-Execution
**Action:** Project infrastructure created
**Files:** project CLAUDE.md, PROJECT-STATE.md, PROGRESS-LOG.md
**Next:** Begin Layer 0 execution
```

**These 3 files are created at Pre-Execution, BEFORE any Layer 0 skills run.**

---

### Layer 0: Foundation & Loading

**Purpose:** Load all required inputs — the A09 variant matrix, A01 competitive intelligence, A06 Arena scores, campaign brief with KPIs, and industry benchmarks. Validate that all inputs exist and contain the data needed for scoring.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 0.0.1 | `0.0.1-vertical-profile-loader.md` | Load ad-specific vertical config from `ad-verticals/` (scoring benchmarks, compliance thresholds, platform performance baselines, fatigue baselines, hook type performance) | haiku |
| 0.1 | `0.1-variant-matrix-loader.md` | Load A09 Assembled Variant Matrix (VARIANT-MATRIX.yaml or equivalent). Extract: complete list of variants with IDs, hook text, body text, CTA text, visual treatment, platform target, format type, ad length. Count total variants. Build variant inventory table. | haiku |
| 0.2 | `0.2-competitive-intelligence-loader.md` | Load A01 AD-INTELLIGENCE-HANDOFF.md. Extract: hook type distribution (Section 3), format distribution (Section 4), winning ad specimens (Section 6), opportunity gaps (Section 8), platform intelligence (Section 9), recommended hooks (Section 10). Build competitive context summary for scoring. | haiku |
| 0.3 | `0.3-arena-scores-loader.md` | Load A06 AD-ARENA-RESULTS.md. Extract: per-concept Arena scores across 7 ad-specific criteria (scroll-stop power, visual-copy coherence, mechanism clarity, platform nativeness, proof integration, CTA strength, memorability). Map Arena concept scores to variant IDs (multiple variants may derive from one Arena-scored concept). | haiku |
| 0.4 | `0.4-campaign-brief-loader.md` | Load Campaign Brief (Skill 09) and A03 Format Strategy. Extract: KPIs, target metrics, weekly ad spend, AOV, campaign timeline, funnel stage targets, platform priorities, compliance constraints, vertical-specific requirements. Calculate testing volume formula: min creatives/week = weekly spend / (3 x AOV). Calculate kill threshold: 3 x AOV. | haiku |
| 0.5 | `0.5-benchmark-loader.md` | Load industry benchmarks from AD-HOOK-TAXONOMY.md performance data, AD-ENGINE-CLAUDE.md testing reference data, and A12 PERFORMANCE-LEARNING.md if available. Build benchmark reference table: hook rate targets, win rate expectations (6.6-30%), creative lifespan by spend level, fatigue benchmarks. If A12 historical data exists, load prediction-vs-actual calibration data to improve current predictions. | haiku |

**Execution Order:**
1. 0.0.1, 0.1, 0.2, 0.3, 0.4, 0.5 run in parallel (all independent loading)

**Gate 0 — Layer 0 Complete:**

```yaml
# LAYER_0_COMPLETE.yaml
gate: GATE_0
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  variant_matrix_loaded: true
  variant_count: "[integer — total variants to score]"
  competitive_intelligence_loaded: true
  competitive_intelligence_size_kb: "[integer — must be >= 100KB to be genuine A01 output]"
  arena_scores_loaded: true
  arena_concepts_scored: "[integer — how many concepts have Arena scores]"
  campaign_brief_loaded: true
  weekly_ad_spend_extracted: true
  aov_extracted: true
  min_creatives_per_week_calculated: "[integer]"
  kill_threshold_calculated: "[dollar amount]"
  benchmarks_loaded: true
  a12_historical_data_available: "[true/false]"
  all_inputs_validated: true

microskill_outputs:
  - id: "0.0.1"
    file: "layer-0-outputs/0.0.1-vertical-profile-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.1"
    file: "layer-0-outputs/0.1-variant-matrix-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      variants_loaded: "[integer]"
  - id: "0.2"
    file: "layer-0-outputs/0.2-competitive-intelligence-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "0.3"
    file: "layer-0-outputs/0.3-arena-scores-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      concepts_with_arena_scores: "[integer]"
  - id: "0.4"
    file: "layer-0-outputs/0.4-campaign-brief-loader.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      weekly_spend: "[dollar amount]"
      aov: "[dollar amount]"
      min_creatives_week: "[integer]"
  - id: "0.5"
    file: "layer-0-outputs/0.5-benchmark-loader.md"
    size_bytes: "[integer]"
    minimum_met: true

IF variant_matrix_loaded = false: GATE CLOSED — execute A09 first
IF competitive_intelligence_loaded = false: GATE CLOSED — execute A01 first
IF arena_scores_loaded = false: GATE CLOSED — execute A06 first
IF campaign_brief_loaded = false: GATE CLOSED — execute Skill 09 first
IF weekly_ad_spend not extracted: GATE CLOSED — get budget from human
IF aov not extracted: GATE CLOSED — get AOV from human
```

### Schema Validation Reference

Input validators MUST verify field presence — not just file existence — for all consumed handoff files. See `skills/ads/ad-engine-schema-registry.md` for required fields per handoff file.

---

### Layer 1: Individual Variant Scoring

**Purpose:** Score each variant individually across all 5 prediction dimensions. This is the core analytical layer — every variant gets a complete scorecard with evidence citations and confidence ranges.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 1.1 | `1.1-scroll-stop-scorer.md` | Score EVERY variant on Dimension 1 (Scroll-Stop Probability). For each variant: (a) identify hook type from A02 classification, (b) look up competitive saturation from A01 hook type distribution, (c) look up Arena scroll-stop score from A06, (d) check AD-HOOK-TAXONOMY.md benchmark for this hook type, (e) check if similar hooks appear in A01 winning specimens, (f) analyze structural scroll-stop elements (pattern interrupt, specificity, curiosity gap). Produce score (1-10), confidence range (e.g., "7-9"), confidence level (HIGH/MEDIUM/LOW), and evidence chain (specific citations from A01, A06, benchmarks). | opus |
| 1.2 | `1.2-engagement-scorer.md` | Score EVERY variant on Dimension 2 (Engagement Prediction). For each variant: (a) pull Arena overall weighted score from A06, (b) check mechanism clarity score, (c) check visual-copy coherence score, (d) analyze script structure against AD-SCRIPT-STRUCTURES.md framework, (e) verify word count compliance, (f) check platform nativeness score. Produce score, confidence range, confidence level, and evidence chain. | opus |
| 1.3 | `1.3-conversion-scorer.md` | Score EVERY variant on Dimension 3 (Conversion Prediction). For each variant: (a) pull Arena CTA strength score from A06, (b) pull proof integration score, (c) check offer alignment with Skill 07 output, (d) determine funnel stage match (TOFU/MOFU/BOFU) against campaign target, (e) look up vertical conversion benchmarks, (f) check A12 historical data if available. Produce score, confidence range, confidence level, and evidence chain. Flag: conversion prediction inherently has LOWER confidence than other dimensions — document this. | opus |
| 1.4 | `1.4-compliance-scorer.md` | Score EVERY variant on Dimension 4 (Compliance Risk). For each variant: (a) check vertical compliance constraints from ad-verticals/ config, (b) check platform-specific policies for target platform, (c) analyze all claims for substantiation, (d) check for restricted content categories (before/after, income claims, disease claims), (e) check A01 competitive intelligence for what competitors are successfully running (proxy for platform tolerance), (f) check A03 format strategy compliance notes. Produce score (inverted — higher = lower risk), confidence level, specific risk flags, and recommended fixes for any variant scoring 5 or below. **CRITICAL:** Any variant scoring 3 or below is AUTOMATICALLY flagged for revision. | opus |
| 1.5 | `1.5-fatigue-scorer.md` | Score EVERY variant on Dimension 5 (Creative Fatigue Risk). For each variant: (a) check A01 data for run duration of similar hook types (TIER_WINNER = low fatigue signal), (b) classify hook type fatigue profile (story/narrative = slower, shock/controversy = faster, UGC = medium, demo = slower), (c) check competitive density for this hook type from A01, (d) factor in planned spend level from campaign brief (higher spend = faster fatigue), (e) factor in format fatigue profile (video vs. static vs. carousel). Produce score (inverted — higher = longer predicted lifespan), predicted effective lifespan range (e.g., "2-4 weeks at $10K/week spend"), confidence level, and evidence chain. | opus |
| 1.6 | `1.6-scoring-validator.md` | Validate all Layer 1 scoring outputs. For EVERY variant, verify: (a) all 5 dimensions scored, (b) every score has a confidence range (not just a point estimate), (c) every score cites at least 2 evidence sources, (d) compliance variants scoring 3 or below are flagged for revision, (e) no two variants have identical scores across all 5 dimensions (if they do, the scoring is insufficiently differentiated). Produce SCORING COMPLETENESS CHECK table. | opus |

**Execution Order:**
1. 1.1, 1.2, 1.3, 1.4, 1.5 run in parallel (independent scoring dimensions)
2. 1.6 runs after all above complete (validates completeness)

**MANDATORY SCORING COMPLETENESS CHECK:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  SCORING COMPLETENESS CHECK - [timestamp]                                    │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ DIMENSION           │ VARIANTS │ SCORED │ % COMPLETE │ WITH EVIDENCE │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │ Scroll-Stop         │ [X]      │ [X]    │ [X]%       │ [X]%          │ │
│  │ Engagement          │ [X]      │ [X]    │ [X]%       │ [X]%          │ │
│  │ Conversion          │ [X]      │ [X]    │ [X]%       │ [X]%          │ │
│  │ Compliance          │ [X]      │ [X]    │ [X]%       │ [X]%          │ │
│  │ Fatigue             │ [X]      │ [X]    │ [X]%       │ [X]%          │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ALL DIMENSIONS HAVE CONFIDENCE RANGES: [Y/N]                               │
│  ALL SCORES CITE 2+ EVIDENCE SOURCES: [Y/N]                                │
│  COMPLIANCE FLAGS (score <= 3): [count — these MUST be addressed]           │
│  UNDIFFERENTIATED VARIANTS: [count — identical scores across all 5]         │
│                                                                              │
│  REQUIRED: 100% on ALL dimensions with 100% evidence citation.              │
│  OVERALL: [PASS - proceed] or [FAIL - complete scoring]                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Gate 1 — Layer 1 Complete:**

```yaml
# LAYER_1_COMPLETE.yaml
gate: GATE_1
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  total_variants: "[integer]"
  variants_fully_scored: "[integer — must equal total_variants]"
  scroll_stop_scored_pct: 100
  engagement_scored_pct: 100
  conversion_scored_pct: 100
  compliance_scored_pct: 100
  fatigue_scored_pct: 100
  all_scores_have_confidence_ranges: true
  all_scores_cite_evidence: true
  compliance_flags_count: "[integer]"
  compliance_flags_documented: true
  undifferentiated_variant_count: "[integer — should be 0]"
  validator_ran: true
  validator_verdict: PASS

microskill_outputs:
  - id: "1.1"
    file: "layer-1-outputs/1.1-scroll-stop-scorer.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      variants_scored: "[integer — must equal total]"
  - id: "1.2"
    file: "layer-1-outputs/1.2-engagement-scorer.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      variants_scored: "[integer — must equal total]"
  - id: "1.3"
    file: "layer-1-outputs/1.3-conversion-scorer.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      variants_scored: "[integer — must equal total]"
  - id: "1.4"
    file: "layer-1-outputs/1.4-compliance-scorer.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      variants_scored: "[integer — must equal total]"
      compliance_flags: "[integer]"
  - id: "1.5"
    file: "layer-1-outputs/1.5-fatigue-scorer.md"
    size_bytes: "[integer]"
    minimum_met: true
    key_metrics:
      variants_scored: "[integer — must equal total]"
  - id: "1.6"
    file: "layer-1-outputs/1.6-scoring-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF variants_fully_scored < total_variants: GATE CLOSED — score remaining variants
IF any dimension < 100%: GATE CLOSED — complete scoring on missing dimension
IF all_scores_have_confidence_ranges = false: GATE CLOSED — add confidence ranges
IF all_scores_cite_evidence = false: GATE CLOSED — add evidence citations
```

---

### Layer 2: Comparative Analysis & Tier Assignment

**Purpose:** Rank all variants against each other, compute composite scores, and assign testing tiers. This layer transforms individual scores into a PRIORITIZED launch order.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 2.1 | `2.1-composite-score-calculator.md` | Calculate weighted composite score for each variant. Weights: Scroll-Stop (30%), Engagement (20%), Conversion (25%), Compliance (15%), Fatigue (10%). **Compliance gate override:** Any variant with compliance score <= 3 has composite score CAPPED at 4.0 regardless of other dimensions (compliance failure overrides creative quality). Calculate both the weighted composite AND the confidence-adjusted composite (composite score x confidence level multiplier: HIGH=1.0, MEDIUM=0.85, LOW=0.7). | opus |
| 2.2 | `2.2-forced-ranking.md` | Force-rank ALL variants by confidence-adjusted composite score. NO TIES at the tier boundary level. If two variants have identical composite scores, break ties using: (a) scroll-stop score (primary tiebreaker), (b) compliance score (secondary tiebreaker), (c) fatigue score (tertiary tiebreaker). Produce a complete ranked list from #1 to #[last]. Document every tie-breaking decision. | opus |
| 2.3 | `2.3-tier-assignment.md` | Assign each variant to a testing tier based on ranking position and score thresholds. **Tier 1 — Launch First:** Top variants with confidence-adjusted composite >= 7.0 AND compliance score >= 6. Maximum Tier 1 count = min_creatives_per_week (from testing volume formula). If more variants qualify than the weekly creative budget allows, only the top [min_creatives_per_week] become Tier 1. **Tier 2 — Backup:** Variants with composite >= 5.5 AND compliance score >= 5 that didn't make Tier 1 cut. These launch after Tier 1 data arrives (typically week 2-3). **Tier 3 — Revise or Cut:** Variants below 5.5 composite OR compliance score <= 4. Sub-tier: 3A = revise (specific issues identified, creative potential exists), 3B = cut (fundamental problems, not worth revision effort). For each Tier 3 variant, document specific reason for demotion and (for 3A) recommended revision direction. | opus |
| 2.4 | `2.4-ranking-validator.md` | Validate the complete ranking and tier assignment. Verify: (a) all variants are ranked (no missing), (b) no ties exist at tier boundaries, (c) tier assignments are consistent with composite scores (no variant with score 8.0 in Tier 2 while a 6.5 is in Tier 1), (d) Tier 1 count does not exceed min_creatives_per_week, (e) compliance-flagged variants are NOT in Tier 1 or Tier 2 (unless compliance issue has been resolved), (f) tier distribution is reasonable (not all variants in one tier — if 90% are Tier 1, scoring differentiation was insufficient). Produce TIER DISTRIBUTION CHECK table. | opus |

**Execution Order:**
1. 2.1 first (composite scores needed for ranking)
2. 2.2 after 2.1 (needs composite scores)
3. 2.3 after 2.2 (needs ranked list)
4. 2.4 after 2.3 (validates complete ranking and tiers)

**MANDATORY TIER DISTRIBUTION CHECK:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  TIER DISTRIBUTION CHECK - [timestamp]                                       │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ TIER       │ COUNT │ % OF TOTAL │ SCORE RANGE │ STATUS                 │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │ Tier 1     │ [X]   │ [X]%       │ [X]-[X]     │ <= min creatives/wk?  │ │
│  │ Tier 2     │ [X]   │ [X]%       │ [X]-[X]     │ Backup ready?         │ │
│  │ Tier 3A    │ [X]   │ [X]%       │ [X]-[X]     │ Revision flagged?     │ │
│  │ Tier 3B    │ [X]   │ [X]%       │ [X]-[X]     │ Cut documented?       │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  COMPLIANCE FLAGS IN TIER 1: [count — MUST be 0]                            │
│  TIER 1 COUNT VS MIN CREATIVES/WEEK: [X] vs [Y]                            │
│  ALL VARIANTS RANKED: [Y/N]                                                 │
│  DIFFERENTIATION: Are scores meaningfully spread? [Y/N]                     │
│                                                                              │
│  OVERALL: [PASS - proceed] or [FAIL - re-evaluate]                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Gate 2 — Layer 2 Complete:**

```yaml
# LAYER_2_COMPLETE.yaml
gate: GATE_2
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  all_variants_ranked: true
  total_variants_ranked: "[integer — must equal total from Layer 0]"
  no_ties_at_tier_boundaries: true
  tier_1_count: "[integer]"
  tier_1_within_weekly_creative_budget: true
  tier_2_count: "[integer]"
  tier_3a_count: "[integer]"
  tier_3b_count: "[integer]"
  compliance_flags_in_tier_1: 0
  tier_distribution_reasonable: true
  all_tier_3_have_documented_reasons: true
  validator_ran: true
  validator_verdict: PASS

composite_score_weights:
  scroll_stop: 0.30
  engagement: 0.20
  conversion: 0.25
  compliance: 0.15
  fatigue: 0.10

microskill_outputs:
  - id: "2.1"
    file: "layer-2-outputs/2.1-composite-score-calculator.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.2"
    file: "layer-2-outputs/2.2-forced-ranking.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.3"
    file: "layer-2-outputs/2.3-tier-assignment.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "2.4"
    file: "layer-2-outputs/2.4-ranking-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF all_variants_ranked = false: GATE CLOSED — rank remaining variants
IF compliance_flags_in_tier_1 > 0: GATE CLOSED — remove or resolve compliance issues
IF tier_distribution_reasonable = false: GATE CLOSED — re-examine scoring differentiation
```

---

### Layer 3: Testing Strategy

**Purpose:** Transform the scored and tiered variant list into an actionable testing plan. Connect predictions to the client's actual budget, timeline, and business metrics. Define kill criteria, scale criteria, and testing sequence.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 3.1 | `3.1-testing-sequence-planner.md` | Design the testing sequence — which variants launch in which order, over what timeline. **Week 1:** Launch all Tier 1 variants simultaneously (maximum learning velocity). **Week 2-3:** Launch Tier 2 variants as Tier 1 losers are killed. **Week 3+:** Iterate — winning variants get new hook swaps, losing approaches are abandoned. The sequence must account for: (a) platform-specific ad review timelines (Meta: 24-48 hours, TikTok: 24-72 hours), (b) minimum data accumulation period before kill/scale decisions (typically 3-5 days), (c) campaign timeline from brief (how many testing cycles are available). Produce visual testing timeline. | opus |
| 3.2 | `3.2-budget-allocation.md` | Distribute testing budget across variants. **Tier 1 allocation:** Equal split across all Tier 1 variants initially (no variant should get > 25% of total test budget in Week 1). **Per-variant daily spend:** Calculate from weekly budget / (Tier 1 count x 7). Verify per-variant daily spend is sufficient for statistical significance (minimum $20-50/day per variant depending on AOV). **Reserve budget:** 20-30% of total weekly budget held in reserve for Week 2+ scaling of winners. Produce budget allocation table with per-variant daily spend, weekly spend, and total test spend. | opus |
| 3.3 | `3.3-kill-criteria.md` | Define SPECIFIC kill criteria for underperforming variants. **Default kill rule:** Cut a variant after 3x AOV spend without a conversion. Example: $100 AOV = kill at $300 spend with zero conversions. **Secondary kill signals:** (a) Hook rate below 15% after 1000+ impressions (scroll-stop failure), (b) CTR below platform benchmark after 3 days, (c) CPA more than 2x target after sufficient data (100+ clicks), (d) Engagement rate (video views, reads) below platform benchmark. **Kill timeline:** No kill decisions before 72 hours of data (need minimum sample). Maximum 7 days before kill decision on any variant — no "let it run longer." For each Tier 1 variant, document the specific kill trigger in advance. | opus |
| 3.4 | `3.4-scale-criteria.md` | Define SPECIFIC scale criteria for winning variants. **Scale trigger:** Variant achieves target CPA (or better) with 3+ conversions over 5+ days. **Scaling protocol:** Increase daily spend by 20-30% per scaling event. Maximum one scale event every 48 hours (platform algorithms need time to optimize). **Watch metrics during scaling:** (a) CPA must stay within 120% of pre-scale CPA, (b) Hook rate must not drop more than 10% (fatigue signal), (c) If CPA rises > 150% of pre-scale, pause scaling and evaluate. **Scaling budget:** From the 20-30% reserve AND from killed variant reallocation. Produce per-variant scale triggers and protocol. | opus |
| 3.5 | `3.5-testing-strategy-validator.md` | Validate the complete testing strategy. Verify: (a) testing sequence covers all Tier 1 variants in Week 1, (b) budget allocation sums to total weekly budget (not over or under), (c) per-variant daily spend meets minimum threshold for statistical significance, (d) kill criteria are specific and measurable (not vague), (e) scale criteria are specific and measurable, (f) timeline is realistic for campaign duration, (g) reserve budget is allocated for scaling. Produce TESTING STRATEGY VALIDATION CHECK table. | opus |

**Execution Order:**
1. 3.1 first (sequence determines budget distribution)
2. 3.2 after 3.1 (needs sequence to allocate budget)
3. 3.3 and 3.4 run in parallel (independent criteria definition)
4. 3.5 after all above complete (validates complete strategy)

**MANDATORY TESTING STRATEGY VALIDATION CHECK:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  TESTING STRATEGY VALIDATION - [timestamp]                                   │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ ELEMENT                   │ STATUS    │ DETAILS                        │ │
│  ├────────────────────────────────────────────────────────────────────────┤ │
│  │ All Tier 1 in Week 1      │ [Y/N]    │ [count] variants in first wave │ │
│  │ Budget sums correctly      │ [Y/N]    │ $[X] allocated / $[Y] total   │ │
│  │ Per-variant min spend met  │ [Y/N]    │ Min $[X]/day per variant      │ │
│  │ Kill criteria specific     │ [Y/N]    │ 3x AOV = $[X] kill threshold  │ │
│  │ Scale criteria specific    │ [Y/N]    │ Target CPA = $[X]             │ │
│  │ Timeline fits campaign     │ [Y/N]    │ [X] testing cycles available  │ │
│  │ Reserve budget allocated   │ [Y/N]    │ [X]% = $[Y] held in reserve  │ │
│  │ Review timelines included  │ [Y/N]    │ Meta: 24-48hr, TikTok: 24-72 │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  OVERALL: [PASS - proceed] or [FAIL - fix strategy]                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Gate 3 — Layer 3 Complete:**

```yaml
# LAYER_3_COMPLETE.yaml
gate: GATE_3
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  testing_sequence_complete: true
  all_tier_1_in_week_1: true
  budget_allocation_sums_correctly: true
  per_variant_daily_spend_sufficient: true
  kill_criteria_defined: true
  kill_criteria_specific: true
  scale_criteria_defined: true
  scale_criteria_specific: true
  timeline_fits_campaign: true
  reserve_budget_allocated: true
  validator_ran: true
  validator_verdict: PASS

campaign_math:
  weekly_ad_spend: "[dollar amount]"
  aov: "[dollar amount]"
  min_creatives_per_week: "[integer]"
  kill_threshold: "[dollar amount]"
  tier_1_count: "[integer]"
  per_variant_daily_spend: "[dollar amount]"
  reserve_budget_pct: "[percentage]"

microskill_outputs:
  - id: "3.1"
    file: "layer-3-outputs/3.1-testing-sequence-planner.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.2"
    file: "layer-3-outputs/3.2-budget-allocation.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.3"
    file: "layer-3-outputs/3.3-kill-criteria.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.4"
    file: "layer-3-outputs/3.4-scale-criteria.md"
    size_bytes: "[integer]"
    minimum_met: true
  - id: "3.5"
    file: "layer-3-outputs/3.5-testing-strategy-validator.md"
    size_bytes: "[integer]"
    minimum_met: true

IF budget_allocation_sums_correctly = false: GATE CLOSED — fix budget math
IF per_variant_daily_spend_sufficient = false: GATE CLOSED — reduce Tier 1 count or increase budget
IF kill_criteria_specific = false: GATE CLOSED — define specific kill triggers
IF scale_criteria_specific = false: GATE CLOSED — define specific scale triggers
```

---

### Layer 4: Output Packaging

**Purpose:** Assemble all Layer 1-3 outputs into the primary deliverable: PRE-LAUNCH-SCORECARD.md. This is an ASSEMBLY operation — it combines pre-validated artifacts, it does NOT generate new analysis.

| Skill | File | Function | Model |
|-------|------|----------|-------|
| 4.1 | `4.1-scorecard-assembler.md` | Assemble PRE-LAUNCH-SCORECARD.md from all Layer 1-3 outputs. Include all required sections (see Output Schema below). Minimum size: 30KB. Use chunked assembly if needed (3-5 write operations). The scorecard must be human-readable and decision-ready — a marketing manager should be able to pick it up and know exactly what to launch, in what order, with what budget. | sonnet |
| 4.2 | `4.2-execution-log.md` | Produce execution-log.md with per-microskill entries. Each entry: spec file read confirmation, output file created, output file size, key metrics, gate status, model used. | sonnet |
| 4.3 | `4.3-checkpoint-files.md` | Create all checkpoint YAML files. Verify all output files exist with sizes. Create LAYER_4_COMPLETE.yaml. | sonnet |

**Execution Order:**
1. 4.1 first (primary deliverable)
2. 4.2 after 4.1 (logs assembly process)
3. 4.3 after 4.2 (final checkpoint)

**Gate 4 — Layer 4 Complete (Skill Complete):**

```yaml
# LAYER_4_COMPLETE.yaml
gate: GATE_4
status: PASS  # The ONLY acceptable value.
timestamp: "[ISO 8601]"
checks:
  scorecard_file_exists: true
  scorecard_file_path: "PRE-LAUNCH-SCORECARD.md"
  scorecard_file_size_kb: "[integer >= 30]"
  all_required_sections_populated: true
  execution_log_exists: true
  all_checkpoint_files_exist: true
  human_approval_received: "[true/false — BLOCKING for A11]"

post_assembly_size_validation:
  file_size_kb: "[integer]"
  minimum_required_kb: 30
  status: "[PASS if >= 30KB / FAIL if < 30KB]"

IF scorecard_file_size_kb < 30: GATE CLOSED — re-assemble with additional detail
IF any section missing or empty: GATE CLOSED — complete missing sections
IF human_approval_received = false: A11 BLOCKED — present scorecard for review
```

---

## OUTPUT SCHEMA: PRE-LAUNCH-SCORECARD.md

**Minimum size: 30KB.** This is a comprehensive scoring document, not a summary.

### The Required Sections

```markdown
# PRE-LAUNCH-SCORECARD.md
## Metadata
- Project: [name]
- Scoring Date: [ISO 8601]
- Total Variants Scored: [integer]
- Variant Source: A09 Assembled Variant Matrix
- Intelligence Sources: A01 (Ad Intelligence), A06 (Arena), Benchmarks, [A12 if available]

## Section 1: Executive Summary
- Campaign overview: [product, vertical, target audience, weekly spend, AOV]
- Testing volume: [min_creatives_per_week] creatives needed per week
- Tier distribution: [X] Tier 1, [Y] Tier 2, [Z] Tier 3
- Top 3 predicted performers (brief rationale)
- Top 3 compliance risks (if any)
- Recommended launch date and timeline
- Kill threshold: $[3 x AOV] per variant
- 3-sentence scoring summary for quick consumption

## Section 2: Composite Score Weights
- Scroll-Stop Probability: 30%
- Engagement Prediction: 20%
- Conversion Prediction: 25%
- Compliance Risk: 15%
- Creative Fatigue Risk: 10%
- Confidence adjustment methodology: [HIGH=1.0, MEDIUM=0.85, LOW=0.7]
- Why these weights: [brief rationale connecting to campaign KPIs]

## Section 3: Individual Variant Scorecards
For each variant (ALL variants, not just Tier 1):
  - Variant ID
  - Hook text (first 3 seconds / first line)
  - Platform target
  - Format and length
  - Parent concept (from A06 Arena)
  - 5-Dimension Scores:
    | Dimension | Score | Confidence Range | Confidence Level | Key Evidence |
    |-----------|-------|-----------------|-----------------|-------------|
    | Scroll-Stop | [X] | [X-Y] | [H/M/L] | [specific citation] |
    | Engagement | [X] | [X-Y] | [H/M/L] | [specific citation] |
    | Conversion | [X] | [X-Y] | [H/M/L] | [specific citation] |
    | Compliance | [X] | [X-Y] | [H/M/L] | [specific citation] |
    | Fatigue | [X] | [X-Y] | [H/M/L] | [specific citation] |
  - Composite Score: [weighted]
  - Confidence-Adjusted Composite: [adjusted]
  - Rank: #[position]
  - Tier: [1/2/3A/3B]
  - Predicted Effective Lifespan: [X-Y weeks at planned spend level]
  - Compliance Flags: [specific flags or "None"]
  - Strengths: [2-3 specific strengths]
  - Risks: [2-3 specific risks]
  - Recommendation: [launch/backup/revise with direction/cut with reason]

## Section 4: Force-Ranked Variant List
Complete ranked list from #1 to #[last]:
  | Rank | Variant ID | Composite | Adjusted | Tier | Hook (abbreviated) | Platform |

## Section 5: Tier 1 — Launch First
- Variant IDs and brief descriptions
- Why these variants are Tier 1 (data-backed rationale)
- Combined Tier 1 predicted performance profile
- Expected win rate: [6.6-30% of Tier 1 variants will be winners — cite benchmark]
- Platform distribution of Tier 1 variants
- Hook type diversity across Tier 1 (are we testing enough variety?)

## Section 6: Tier 2 — Backup
- Variant IDs and brief descriptions
- When to activate: [specific trigger — typically after Tier 1 losers are killed]
- Expected promotion: [X] of [Y] Tier 2 variants will launch by Week 3

## Section 7: Tier 3 — Revise or Cut
- Tier 3A (Revise): Variant IDs + specific revision direction per variant
- Tier 3B (Cut): Variant IDs + specific reason for cut per variant
- Recommended action: [send to A07 for revision / discard]

## Section 8: Compliance Risk Register
- All variants with compliance score <= 5:
  | Variant ID | Compliance Score | Risk Type | Specific Issue | Recommended Fix |
- Platform-specific compliance warnings
- Vertical-specific compliance warnings
- Variants BLOCKED from launch until compliance issue resolved

## Section 9: Creative Fatigue Forecast
- Per-variant fatigue prediction at planned spend level:
  | Variant ID | Predicted Lifespan | Fatigue Risk | Refresh Strategy |
- Campaign-level fatigue timeline: when will the first creative refresh be needed?
- Hook refresh recommendations (based on A01 competitive data)
- Recommended refresh interval: [X] weeks for hooks, [Y] weeks for concepts

## Section 10: Testing Strategy
### Testing Sequence
- Week 1: [Tier 1 variants — list]
- Week 2-3: [Tier 2 activation — list and trigger conditions]
- Week 3+: [Iteration plan — new hook swaps from winners, concept refreshes]

### Budget Allocation
| Variant ID | Daily Spend | Weekly Spend | % of Total | Notes |
- Reserve budget: $[X] ([Y]%) held for scaling winners

### Kill Criteria
- Default: Cut at $[3 x AOV] spend with zero conversions
- Per-variant kill triggers:
  | Variant ID | Kill Trigger | Kill Timeline | Reallocation Target |

### Scale Criteria
- Default: Scale at target CPA with 3+ conversions over 5+ days
- Scaling protocol: +20-30% daily spend per event, max 1 event per 48 hours
- Watch metrics: CPA within 120% of pre-scale, hook rate stability

### Success Metrics
- Target CPA: $[X]
- Target ROAS: [X]x
- Target hook rate: 30%+
- Win rate expectation: 6.6-30% of tested variants

## Section 11: Prediction Confidence Disclosure
- Overall prediction confidence: [HIGH/MEDIUM/LOW]
- Factors increasing confidence: [e.g., A12 historical data available, strong A01 data, vertical-specific benchmarks]
- Factors decreasing confidence: [e.g., new vertical, no A12 data, limited competitive intelligence]
- Calibration note: "Pre-launch predictions are probabilistic estimates. Actual performance will vary.
  A12 Performance Learning Loop will compare predictions to actual results to improve future scoring."
- Historical accuracy (if A12 data available): "Previous A10 predictions correlated at [X]% with actual Tier 1 performance."

## Section 12: Human Approval
- [ ] Tier 1 variant list approved for launch
- [ ] Budget allocation approved
- [ ] Kill criteria approved
- [ ] Scale criteria approved
- [ ] Testing timeline approved
- [ ] Compliance risks acknowledged
- Approver: [name]
- Approval date: [date]
- Notes: [any modifications from human review]
```

---

## GATE ARCHITECTURE — COMPLETE REFERENCE

### Gate Summary Table

| Gate | Location | Blocks | Key Criteria | Expansion Protocol |
|------|----------|--------|--------------|-------------------|
| GATE_0 | Layer 0 → Layer 1 | Scoring entry | A09 matrix loaded, A01 loaded, A06 loaded, brief loaded, benchmarks loaded | Fix missing inputs |
| GATE_1 | Layer 1 → Layer 2 | Ranking entry | ALL variants scored on ALL 5 dimensions, evidence cited, confidence ranges expressed | 3 expansion rounds to complete scoring |
| GATE_2 | Layer 2 → Layer 3 | Strategy entry | ALL variants ranked, tiers assigned, no compliance flags in Tier 1, distribution reasonable | Re-examine scoring differentiation |
| GATE_3 | Layer 3 → Layer 4 | Output entry | Testing sequence complete, budget math correct, kill/scale criteria specific | Fix strategy gaps |
| GATE_4 | Skill completion | Downstream consumption | PRE-LAUNCH-SCORECARD.md exists at 30KB+, human approval received | Re-assemble or address human feedback |

### Structural Checkpoint Files

```
[project]/A10-pre-launch-scoring/checkpoints/
  LAYER_0_COMPLETE.yaml
  LAYER_1_COMPLETE.yaml
  LAYER_2_COMPLETE.yaml
  LAYER_3_COMPLETE.yaml
  LAYER_4_COMPLETE.yaml
```

**IF checkpoint file does not exist, the next layer is BLOCKED.**

### Gate Failure Response Protocol

```
GATE FAILED → DO NOT proceed. DO NOT invent new gate statuses.
Gate status can ONLY be PASS or FAIL.

EXPANSION ROUND 1:
  1. IDENTIFY which metrics failed
  2. For scoring failures: Complete missing dimension scores with evidence
  3. For ranking failures: Re-examine composite calculations and tier boundaries
  4. For strategy failures: Fix budget math or criteria specificity
  5. UPDATE PROJECT-STATE.md
  6. Re-run the relevant check table
  7. IF PASS → proceed. IF FAIL → ROUND 2.

EXPANSION ROUND 2:
  1. IDENTIFY REMAINING deficits
  2. For scoring: Request additional data from upstream skills if evidence is insufficient
  3. For ranking: Consult human on tier boundary questions
  4. For strategy: Verify campaign numbers with human if budget math doesn't work
  5. UPDATE PROJECT-STATE.md
  6. Re-run check
  7. IF PASS → proceed. IF FAIL → ROUND 3.

EXPANSION ROUND 3:
  1. IDENTIFY REMAINING deficits
  2. Use all available approaches to resolve
  3. Document what has been tried
  4. UPDATE PROJECT-STATE.md
  5. Re-run check
  6. IF PASS → proceed. IF FAIL → ESCALATE TO HUMAN.

HUMAN ESCALATION (only after ALL 3 rounds):
  Present: exact metrics vs. targets, what was tried, why resolution failed.
  Options: (a) approve modified thresholds, (b) provide missing data,
  (c) adjust scope, (d) re-run upstream skills.
```

### Forbidden Rationalizations (IMMEDIATE HALT)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  IF ANY OF THESE PHRASES APPEAR IN GATE REASONING, THE GATE CHECK           │
│  IS INVALID AND EXECUTION MUST HALT IMMEDIATELY.                            │
└──────────────────────────────────────────────────────────────────────────────┘
```

| Rationalization | Why Forbidden | Required Response |
|-----------------|---------------|-------------------|
| "this variant feels strong" | Feelings are not evidence. Every score needs a data citation. | HALT — cite specific evidence from A01/A06/benchmarks |
| "all variants are roughly equal" | If all variants score the same, the scoring is insufficiently differentiated. | HALT — re-examine scoring methodology |
| "compliance isn't an issue for this vertical" | EVERY vertical has compliance constraints. Golf has the fewest, not zero. | HALT — check vertical compliance constraints |
| "fatigue prediction is too speculative" | Fatigue prediction is uncertain, but A01 data provides concrete benchmarks. Uncertainty is expressed via confidence ranges, not skipped entirely. | HALT — score fatigue with confidence ranges |
| "the budget details aren't important for scoring" | Testing strategy without budget math is not strategy. Budget determines Tier 1 size, kill thresholds, and scale capacity. | HALT — load campaign budget from brief |
| "close enough" / "approximately" | Numbers are exact. $300 kill threshold means $300. 3x AOV is exact. | HALT — use exact numbers |
| "the Arena scores are sufficient" | Arena scores are ONE of 5 data sources. A10 integrates A01 competitive context, benchmarks, compliance, and fatigue — Arena alone is incomplete. | HALT — score all 5 dimensions |
| "partial pass" / "conditional pass" | Does not exist. Gates are PASS or FAIL only. | HALT — gates are binary |
| "these are all good variants" | If no variant is in Tier 3, the scoring is insufficiently critical. Some variants MUST be worse than others. | HALT — force meaningful differentiation |
| "we can figure out kill criteria during the campaign" | Kill criteria must be pre-defined. Deciding when to kill DURING the campaign leads to emotional attachment and overspending on losers. | HALT — define kill criteria now |

---

## ANTI-DEGRADATION ENFORCEMENT

### Session Startup Protocol (MANDATORY)

```
BEFORE executing ANY A10 skill:
  1. READ: A10-PRE-LAUNCH-SCORING-ANTI-DEGRADATION.md (full file)
  2. READ: A10-PRE-LAUNCH-SCORING-AGENT.md (this file)
  3. READ: PROJECT-STATE.md (current phase and counts)
  4. VERIFY: Which layer are you in? What gate must pass next?
  5. VERIFY: Have all upstream inputs been loaded?

  IF you have NOT read the anti-degradation file:
    ┌────────────────────────────────────────────────────────────────────┐
    │  STRUCTURAL BLOCK: ANTI-DEGRADATION NOT READ                      │
    │                                                                    │
    │  You CANNOT execute A10 skills without reading the anti-           │
    │  degradation file. This is not optional.                          │
    │                                                                    │
    │  ACTION: READ A10-PRE-LAUNCH-SCORING-ANTI-DEGRADATION.md first.  │
    └────────────────────────────────────────────────────────────────────┘
    HALT — DO NOT PROCEED
```

### Specific Anti-Degradation Rules for A10

```
RULE 1: EVERY SCORE MUST CITE EVIDENCE.
  A score without a data citation is an opinion. "Scroll-stop: 8/10" without
  referencing A01 hook type distribution, A06 Arena score, or benchmark data
  is NOT a valid score. Every single score must cite at least 2 evidence sources.

RULE 2: CONFIDENCE RANGES ARE MANDATORY, NOT OPTIONAL.
  "Scroll-stop: 8/10" is NOT acceptable. "Scroll-stop: 8/10, confidence
  range 7-9, confidence level HIGH (A01 + A06 + benchmark agree)" IS acceptable.
  False precision is worse than acknowledged uncertainty.

RULE 3: DIFFERENTIATION IS REQUIRED.
  If all variants score between 6.5 and 7.5, the scoring is insufficiently
  differentiated. Pre-launch scoring exists to PRIORITIZE. If it cannot
  meaningfully distinguish between variants, it has failed at its core purpose.
  Forced ranking eliminates the "they're all about the same" failure mode.

RULE 4: COMPLIANCE IS A GATE, NOT A NICE-TO-HAVE.
  Compliance score <= 3 CAPS the composite at 4.0. A brilliant ad that gets
  rejected by Meta ad review has ZERO performance. Compliance risk must be
  scored, not hand-waved away.

RULE 5: TESTING STRATEGY MUST CONNECT TO REAL NUMBERS.
  "Test these first" without budget allocation, kill criteria, and scale criteria
  is not a strategy. The testing strategy section must contain: weekly spend per
  variant, kill threshold in dollars (3x AOV), scale triggers with specific metrics,
  and timeline in weeks. Numbers, not vibes.

RULE 6: FATIGUE PREDICTION MUST CITE A01 DATA.
  "This hook type will fatigue in 2-3 weeks" must reference A01 data showing
  how long similar hooks ran in the competitive set. The 37% drop at 7 days is
  a benchmark from AD-ENGINE-CLAUDE.md — use it, but also reference campaign-
  specific A01 data for adjustment.

RULE 7: THIS IS PROBABILISTIC, NOT DETERMINISTIC.
  A10 produces PREDICTIONS, not guarantees. The output document must include
  a Prediction Confidence Disclosure (Section 11) that honestly assesses the
  confidence level. Overconfident predictions erode trust when results diverge.
  Express what you know, what you don't know, and the width of the uncertainty.
```

### A10-Specific MC-CHECK (Every 30 minutes during execution)

```yaml
A10-MC-CHECK:
  current_layer: "[0/1/2/3/4]"
  variants_scored_total: "[X/Y — X scored out of Y total]"
  dimensions_scored_per_variant: "[all 5?]"
  evidence_citations_present: "[all scores have citations?]"
  confidence_ranges_present: "[all scores have ranges?]"

  am_i_scoring_without_data: "[Y/N]"
  am_i_giving_uniform_scores: "[Y/N]"
  am_i_ignoring_compliance: "[Y/N]"
  am_i_skipping_fatigue: "[Y/N]"
  am_i_disconnecting_from_budget: "[Y/N]"
  am_i_expressing_false_precision: "[Y/N]"
  am_i_thinking_these_are_all_good: "[Y/N]"

  IF any rationalization detected: "HALT — re-read anti-degradation rules"
  IF variants not fully scored: "CONTINUE SCORING — do not proceed to Layer 2"
  IF evidence missing: "ADD EVIDENCE — every score needs citations"
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce its own dedicated output file. File existence is binary verification. File contents enable quality audit.

### Output File Naming Convention

```
[project]/A10-pre-launch-scoring/layer-[N]-outputs/[microskill-id]-[short-name].md

Examples:
  A10-pre-launch-scoring/layer-0-outputs/0.0.1-vertical-profile-loader.md
  A10-pre-launch-scoring/layer-0-outputs/0.1-variant-matrix-loader.md
  A10-pre-launch-scoring/layer-0-outputs/0.2-competitive-intelligence-loader.md
  A10-pre-launch-scoring/layer-1-outputs/1.1-scroll-stop-scorer.md
  A10-pre-launch-scoring/layer-1-outputs/1.4-compliance-scorer.md
  A10-pre-launch-scoring/layer-2-outputs/2.1-composite-score-calculator.md
  A10-pre-launch-scoring/layer-2-outputs/2.3-tier-assignment.md
  A10-pre-launch-scoring/layer-3-outputs/3.1-testing-sequence-planner.md
  A10-pre-launch-scoring/layer-3-outputs/3.3-kill-criteria.md
  A10-pre-launch-scoring/layer-4-outputs/4.1-scorecard-assembler.md
```

### Minimum File Size Thresholds

| Microskill Type | Minimum Size | Examples |
|-----------------|-------------|---------|
| **Loader/Validator** (Layer 0) | 1KB | Input verification, data extraction summary |
| **Per-Dimension Scorer** (Layer 1) | 3KB per dimension | Must include per-variant scores with evidence citations |
| **Composite Calculator** (Layer 2) | 3KB | Weighted scores, confidence adjustments |
| **Ranking/Tier Output** (Layer 2) | 5KB | Force-ranked list with tier assignments and rationale |
| **Testing Strategy** (Layer 3) | 3KB per element | Sequence plan, budget table, kill/scale criteria |
| **Scorecard Assembly** (Layer 4) | 30KB | PRE-LAUNCH-SCORECARD.md |

### Required Section Headers Per Output

Every per-microskill output file MUST contain:

```markdown
# [Microskill ID]: [Microskill Name]
## Execution Context
- Skill: A10 — Pre-Launch Scoring
- Layer: [layer number]
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

## SUBAGENT CONTEXT TEMPLATE

**Every subagent spawned by the A10 orchestrator MUST receive this structured context. Ad-hoc prompts like "score these variants" are FORBIDDEN.**

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  SUBAGENT CONTEXT TEMPLATE — ALL 8 SECTIONS MANDATORY                        │
│  Do NOT spawn a subagent without all 8 sections populated.                   │
│  Ad-hoc prompts produce ad-hoc results.                                      │
└──────────────────────────────────────────────────────────────────────────────┘

## 1. MODEL
[haiku | sonnet | opus — from Binding Model Assignment Table]

## 2. PERSONA
[Task-specific persona from the Persona Library below]

## 3. OBJECTIVE
[Exact task description — what this subagent must produce]

## 4. SCORING TARGETS
[Exact numeric targets]
- Total variants to score: [X]
- Dimensions to evaluate: [list]
- Required evidence sources per score: minimum 2
- Confidence ranges: MANDATORY on every score

## 5. INPUTS
[Exact file paths the subagent must read]
- Variant Matrix: [path]
- A01 Intelligence Handoff: [path]
- A06 Arena Results: [path]
- Campaign Brief: [path]
- Benchmarks: [path]
- AD-HOOK-TAXONOMY.md: [path — for scroll-stop and fatigue scoring]

## 6. CONSTRAINTS
[Skill-specific rules that apply to this subagent]
- Every score must cite evidence (no "vibes-based" scoring)
- Confidence ranges are mandatory
- Compliance scores <= 3 trigger automatic revision flag
- Fatigue predictions must reference A01 data

## 7. ERROR HANDLING
[What to do if data is insufficient]
- If A01 data doesn't cover a hook type: score with LOW confidence, note gap
- If A06 Arena score doesn't exist for a variant's parent concept: use structural
  analysis only, score with LOW confidence
- If A12 historical data unavailable: note and use benchmarks only

## 8. OUTPUT FORMAT
[Exact output file path and required structure]
- Output file: [path]
- Required sections: [list]
- Minimum size: [X]KB
- Per-variant format: score, confidence range, confidence level, evidence chain
```

### Subagent Persona Library

#### PERSONA_SCROLL_STOP_ANALYST (Skill 1.1)

```
You are an expert at predicting scroll-stop performance for paid ads. You
evaluate hooks against competitive landscape data (A01), Arena evaluations (A06),
and industry benchmarks. You understand that scroll-stop is the MOST CRITICAL
dimension — an ad that doesn't stop the scroll has zero chance of converting.

You score hooks based on EVIDENCE, not intuition:
1. Competitive saturation — is this hook type overused or underused? (A01 data)
2. Arena assessment — what did 7 expert personas say about this hook? (A06 data)
3. Benchmark data — what hook rate does this type typically achieve? (taxonomy)
4. Structural elements — pattern interrupt, specificity, curiosity gap present?
5. Specimen comparison — do similar hooks appear in winning specimens? (A01)

Every score includes a confidence range. "8/10" alone is NOT acceptable.
"8/10, range 7-9, HIGH confidence (3 data sources agree)" IS acceptable.

You differentiate MEANINGFULLY between variants. If you score 10 variants between
7.0 and 7.5, your analysis has failed. Some hooks ARE better than others.
```

#### PERSONA_COMPLIANCE_AUDITOR (Skill 1.4)

```
You are a platform compliance specialist. Your job is identifying claims,
content, and creative elements that will trigger platform ad review rejection.
You are CONSERVATIVE — you would rather flag a borderline claim and let the
human decide than miss a claim that gets the ad rejected.

You check EVERY variant against:
1. Vertical compliance constraints (health: no disease claims; finance: no
   guaranteed returns; etc.)
2. Platform-specific policies (Meta before/after restrictions, TikTok content
   guidelines, Google ad policies)
3. Claim substantiation — can every claim in the copy be supported by proof?
4. Restricted content categories — anything that triggers special review

Compliance scoring is INVERTED — higher = lower risk.
Score 3 or below = AUTOMATIC revision flag, regardless of creative quality.

You understand that a brilliant ad that gets rejected has ZERO performance.
Compliance is not optional. It is a gate.
```

#### PERSONA_PERFORMANCE_STRATEGIST (Skills 3.1-3.4)

```
You are a media buying strategist who translates creative quality scores into
actionable testing plans. You think in NUMBERS: budgets, CPAs, AOVs, kill
thresholds, scale triggers, and timelines.

Your testing strategies are grounded in:
1. The testing volume formula: min creatives/week = weekly spend / (3 x AOV)
2. The kill rule: cut at 3x AOV spend without conversion
3. The scale protocol: +20-30% daily spend, max 1 event per 48 hours
4. Platform ad review timelines: Meta 24-48hr, TikTok 24-72hr
5. Minimum data windows: no kill decisions before 72 hours

"Test these first" is NOT a strategy. A strategy says: "Launch variants V-001
through V-012 in Week 1 at $42/day each ($504 total daily, $3,528 weekly),
with $1,472 reserve. Kill any variant at $300 spend (3x $100 AOV) with zero
conversions. Scale winners at 20% daily spend increase after 3+ conversions
at target CPA over 5+ days."

Every number in your strategy traces to the campaign brief.
```

---

## TESTING VOLUME FORMULA REFERENCE

The testing volume formula connects creative production to media buying reality.

### Formula

```
Minimum creatives per week = Weekly ad spend / (3 x Average Order Value)
```

### Example Calculations

| Weekly Spend | AOV | Minimum Creatives/Week | Kill Threshold (3x AOV) |
|-------------|-----|----------------------|------------------------|
| $3,000 | $50 | 20 | $150 |
| $5,000 | $75 | 22 | $225 |
| $7,000 | $100 | 23 | $300 |
| $10,000 | $100 | 33 | $300 |
| $15,000 | $150 | 33 | $450 |
| $25,000 | $200 | 42 | $600 |
| $50,000 | $100 | 167 | $300 |

### What This Means for A10

- **Tier 1 count is CAPPED** by min_creatives_per_week. If the formula says 23 creatives/week and 30 variants qualify for Tier 1, only the top 23 make the cut.
- **Kill threshold is EXACT.** 3 x AOV. Not "around 3x" or "roughly $300." The specific dollar amount.
- **Scale budget comes from killed variant reallocation.** When a variant is killed, its daily spend is reallocated to winners or Tier 2 activations.

### Creative Lifespan Reference (from AD-ENGINE-CLAUDE.md)

| Spend Level | Typical Lifespan | Refresh Strategy |
|-------------|-----------------|-----------------|
| Low (<$5K/week) | 4-8 weeks | Monthly concept refresh |
| Medium ($5-25K/week) | 2-4 weeks | Bi-weekly hook refresh |
| High (>$25K/week) | 1-2 weeks | Weekly hook refresh, bi-weekly concept |

### Win Rate Expectations

- **6.6-30% of tested creatives will be winners** (1-3 out of 10)
- A10 cannot predict WHICH specific variants will win — it can only predict which are MOST LIKELY to win
- Even the best-scored Tier 1 variants will have a ~70% failure rate
- This is normal. This is why volume and rapid testing matter.

---

## FORBIDDEN BEHAVIORS (A10-Specific)

### Scoring Failures
1. Scoring variants without loading A01 competitive intelligence
2. Scoring variants without loading A06 Arena results
3. Assigning scores without evidence citations (at least 2 sources per score)
4. Producing point estimates without confidence ranges (every score needs a range)
5. Uniform scoring (all variants in 6.5-7.5 range — insufficient differentiation)
6. Scoring compliance as an afterthought or skipping it entirely
7. Fatigue scoring without referencing A01 data on competitive run durations
8. Using "this feels like a [X]/10" as a scoring methodology

### Ranking Failures
9. Allowing ties at tier boundaries (forced ranking must resolve all ties)
10. Placing compliance-flagged variants (score <= 3) in Tier 1 or Tier 2
11. Placing ALL variants in Tier 1 (some variants MUST be worse than others)
12. Placing ALL variants in Tier 3 (if all variants are bad, upstream skills need re-execution)
13. Tier 1 count exceeding min_creatives_per_week (capped by budget)
14. Not documenting specific reasons for every Tier 3 assignment

### Strategy Failures
15. Testing strategy disconnected from budget numbers (no per-variant spend calculated)
16. Kill criteria not defined in advance (must pre-commit to kill thresholds)
17. Kill threshold not based on 3x AOV (using arbitrary numbers)
18. Scale criteria not specific (must specify exact metrics and triggers)
19. No reserve budget allocated for scaling winners (at least 20% held back)
20. Timeline not accounting for platform ad review delays (24-72 hours)
21. Kill decisions allowed before 72 hours of data (insufficient sample)

### Output Failures
22. PRE-LAUNCH-SCORECARD.md under 30KB
23. Missing any of the 12 required sections
24. Section 3 (Individual Scorecards) that summarizes instead of listing every variant
25. Section 10 (Testing Strategy) without specific dollar amounts
26. Section 11 (Prediction Confidence) missing or hand-waved
27. Claiming skill complete without human approval on the scorecard

### Process Failures
28. Executing Layer N+1 without LAYER_N_COMPLETE.yaml existing
29. Inventing gate statuses other than PASS or FAIL
30. Spawning subagents without the 8-section structured context template
31. Using wrong model for a subagent (not matching the Binding Model Assignment Table)
32. Skipping MC-CHECK for more than 30 minutes during execution
33. Not updating PROJECT-STATE.md after completing each layer
34. Proceeding to A11 without human approval on the scorecard

---

## MC-CHECK SCHEDULE

### Mandatory MC-CHECK Points

| Trigger | When | Focus |
|---------|------|-------|
| Layer Entry | Before starting each layer (0, 1, 2, 3, 4) | Prerequisites verified, inputs loaded |
| Mid-Layer | After completing half the microskills in a layer | Drift detection, evidence quality |
| Gate Validation | Before declaring any layer complete | Completeness, threshold compliance |
| Before Output Generation | Before assembling PRE-LAUNCH-SCORECARD.md | All sections ready, no gaps |
| Every 30 minutes | During extended execution | Rationalization detection (uniform scoring, evidence skipping, compliance ignoring) |

### MC-CHECK Format (A10-Specific)

```yaml
MC-CHECK:
  trigger: "[layer_entry | mid_layer | gate | output | timed_30min]"

  confidence_assessment:
    score: "[1-10]"
    if_below_7: "PAUSE - identify uncertainty, re-read requirements"

  rushing_detection:
    scoring_without_evidence: "[Y/N]"
    skipping_confidence_ranges: "[Y/N]"
    uniform_scoring: "[Y/N]"
    ignoring_compliance: "[Y/N]"
    disconnecting_from_budget: "[Y/N]"
    if_any_yes: "STOP - slow down, reread anti-degradation rules"

  data_verification:
    question: "Am I citing ACTUAL data from A01/A06/benchmarks, or synthesizing?"
    proof: "[Quote specific data points from loaded files]"
    if_no_proof: "HALT - go back and read the source files"

  completeness_check:
    all_variants_scored_this_dimension: "[Y/N]"
    all_scores_have_evidence: "[Y/N]"
    all_scores_have_confidence_ranges: "[Y/N]"
    if_any_no: "DO NOT proceed - address gaps"

  ad_specific_check:
    competitive_context_incorporated: "[Y/N]"
    budget_numbers_connected: "[Y/N]"
    compliance_checked: "[Y/N]"
    fatigue_grounded_in_data: "[Y/N]"
    if_any_no: "HALT — address before proceeding"

  result: "[PROCEED | PAUSE | HALT | SESSION_BREAK]"
```

---

## INTERACTION WITH A12 PERFORMANCE LEARNING LOOP

A10 and A12 form a prediction-calibration cycle that improves over time.

### First Campaign (No A12 Data)

When A12 historical data is not available:
- All predictions rely on A01 competitive intelligence, A06 Arena scores, and industry benchmarks
- Confidence levels are generally MEDIUM or LOW
- Prediction Confidence Disclosure (Section 11) clearly states: "No historical performance data available. Predictions rely on competitive intelligence and industry benchmarks."
- After launch, A12 will compare A10 predictions to actual results

### Subsequent Campaigns (A12 Data Available)

When A12 historical data IS available:
- A10 loads prediction-vs-actual calibration data from A12
- If previous Tier 1 variants had 25% win rate and A10 predicted 30%, the model is slightly optimistic — adjust
- If scroll-stop predictions were accurate within 1 point, confidence levels increase
- If compliance predictions missed 2 rejections, increase compliance scrutiny
- Historical accuracy percentage is reported in Section 11

### What A10 Sends to A12

After campaign results are available, A12 receives:
- All A10 predictions per variant (5-dimension scores, composite, tier)
- Actual performance per variant (hook rate, CTR, CPA, conversion rate, days live before fatigue)
- Comparison: prediction vs. actual for each dimension
- Calibration insights: where was A10 overconfident? Underconfident? Accurate?

This creates a continuous improvement loop: A10 predictions → A11 launch → real-world performance → A12 calibration → better A10 predictions next time.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-22 | Initial creation. Full 4-layer architecture with 19 microskills across 5 layers (Pre-execution + Layers 0-4). 5 prediction dimensions (scroll-stop probability, engagement prediction, conversion prediction, compliance risk, creative fatigue risk) with evidence-based scoring methodology and mandatory confidence ranges. Composite score calculation with compliance gate override. Force-ranked variant list with 3-tier system (Tier 1 launch, Tier 2 backup, Tier 3A revise / 3B cut). Testing strategy grounded in campaign math (testing volume formula, 3x AOV kill threshold, 20-30% scale protocol). 12-section PRE-LAUNCH-SCORECARD.md output schema at 30KB minimum. A12 Performance Learning Loop integration for prediction calibration. 5 gates with binary enforcement. 3 subagent personas. 34 forbidden behaviors. Anti-degradation enforcement with 7 specific rules and 10 forbidden rationalizations. Human approval checkpoint blocking A11 downstream. |
| 1.1 | 2026-02-27 | Meta Ad Spy integration: Added optional `impression_benchmarks` input from A01 Tool-Assisted Scan mode (median/p75/p90 impressions and performance_score). Added impression benchmark comparison to Dimension 1 (Scroll-Stop Probability) scoring — when available, predicted performance is compared against vertical impression benchmarks from top-performing competitor ads. |
