# LP-17: Conversion Audit — Master Agent

> **Version:** 1.0
> **Skill:** LP-17-conversion-audit
> **Position:** Phase 4 — Quality Gate (runs after LP-15 Page Assembly)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** `assembled-page-package.json` (LP-15), `page-brief.json` (LP-00), `conversion-intelligence.json` (LP-01, if available)
> **Output:** `conversion-audit.json` + `CONVERSION-AUDIT-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Score an assembled landing page against the 20-point conversion benchmark checklist. Identify every weakness. Rank optimization opportunities by expected conversion lift. Produce a verdict: launch-ready, needs optimization, or structural rebuild required.

**This is the quality gate.** No page exits the Landing Page Engine without passing through LP-17. The audit is objective, evidence-based, and tied to real conversion data from conversion-data-reference.md. Every FAIL score must include a specific, actionable fix with an expected lift estimate sourced from benchmark data.

**Success Criteria:**
- All 20 checklist points explicitly scored (PASS or FAIL — no skips)
- Every FAIL includes: specific evidence from the page, specific fix recommendation, expected lift with source citation
- Total score matches the sum of individual point scores
- Priority ranking sorts optimizations by (expected lift x ease of implementation)
- Page type (Type A / Type B / Hybrid) governs which criteria apply and what thresholds are used
- Zero hallucinated statistics — every lift estimate cites conversion-data-reference.md or cross-page-pattern-analysis.md

---

## IDENTITY

**This skill IS:**
- The quality gate between page assembly and launch readiness
- A scoring engine that evaluates 20 specific conversion criteria
- An optimization identifier that ranks fixes by expected impact
- An evidence-based auditor — every score requires proof from the page itself

**This skill is NOT:**
- A fixer — it identifies problems but does not rewrite copy or restructure pages
- A writer — it produces audit output, not page content
- An architecture skill — it evaluates architecture decisions made upstream (LP-03, LP-04, LP-05, LP-06)
- A subjective opinion generator — every score is backed by checklist criteria, page evidence, and benchmark data

**Upstream:** LP-15 (Page Assembly) provides the assembled page. LP-00 provides the brief. LP-01 provides conversion intelligence.
**Downstream:** Feeds `conversion-audit.json` to LP-18 (A/B Test Plan). Feeds `CONVERSION-AUDIT-SUMMARY.md` to human reviewer. If score < 15, triggers revision cycle back to relevant Phase 2/3 skills.

---

## STATE MACHINE

```
IDLE -> TRIGGERED
  |
LAYER_0: Input Loading
  -> 0.1: Load assembled page package (from LP-15)
  -> 0.2: Load page brief (from LP-00)
  -> 0.3: Load conversion benchmark data (conversion-data-reference.md)
  -> 0.4: Load specimen reference data (cross-page-pattern-analysis.md)
  | [GATE_0: Assembled page + page brief both present?]
LAYER_1: Audit Planning
  -> 1.1: Validate page type and confirm criteria set
  -> 1.2: Plan audit scope (which of 20 points apply, which need type-specific thresholds)
  -> 1.3: Configure checklist (set Type A/B/Hybrid-specific criteria and thresholds)
  | [GATE_1: Audit scope confirmed, checklist configured?]
LAYER_2: Five-Category Audit (the core evaluation layer)
  -> 2.1: Above-Fold Audit (points 01-04)
  -> 2.2: Copy Quality Audit (points 05-08)
  -> 2.3: Social Proof Audit (points 09-12)
  -> 2.4: Offer/Conversion Architecture Audit (points 13-16)
  -> 2.5: Mobile/Speed Audit (points 17-20)
  | [GATE_2: All 20 points scored? Every FAIL has evidence + fix + lift?]
LAYER_3: Scoring & Prioritization
  -> 3.1: Calculate total score and determine verdict
  -> 3.2: Rank all FAIL items by priority (expected lift x ease of implementation)
  -> 3.3: Generate optimization recommendations with implementation guidance
  | [GATE_3: Total score matches sum? Priority ranking complete?]
LAYER_4: Package Assembly
  -> 4.1: Compile conversion-audit.json
  -> 4.2: Write CONVERSION-AUDIT-SUMMARY.md (human-readable)
  -> 4.3: Write execution-log.md
  |
COMPLETE
```

---

## MODEL ASSIGNMENT TABLE

| Layer | Microskill | Model | Rationale |
|-------|-----------|-------|-----------|
| 0 | 0.1 Assembled Page Loader | haiku | File loading, no judgment |
| 0 | 0.2 Brief Loader | haiku | File loading, no judgment |
| 0 | 0.3 Benchmark Loader | haiku | Data extraction, no judgment |
| 0 | 0.4 Specimen Reference Loader | haiku | Data extraction, no judgment |
| 1 | 1.1 Page Type Validator | sonnet | Structural validation, moderate judgment |
| 1 | 1.2 Audit Scope Planner | sonnet | Planning, moderate judgment |
| 1 | 1.3 Checklist Configurator | sonnet | Configuration, moderate judgment |
| 2 | 2.1 Above-Fold Auditor | opus | Critical judgment — evaluating headline quality, hero image, CTA visibility, trust signals |
| 2 | 2.2 Copy Quality Auditor | opus | Critical judgment — evaluating reading level, AI telltales, single-offer compliance, benefit-feature ordering |
| 2 | 2.3 Social Proof Auditor | opus | Critical judgment — evaluating proof placement, volume, specificity, before/after usage |
| 2 | 2.4 Offer/Conversion Auditor | opus | Critical judgment — evaluating value-before-price, guarantee quality, CTA count, price anchoring |
| 2 | 2.5 Mobile/Speed Auditor | opus | Critical judgment — evaluating load targets, sticky ATC, image optimization, touch targets |
| 3 | 3.1 Score Calculator | sonnet | Arithmetic + verdict assignment |
| 3 | 3.2 Priority Ranker | sonnet | Sorting + lift estimation |
| 3 | 3.3 Optimization Generator | sonnet | Structured recommendation writing |
| 4 | 4.1 Audit Compiler | haiku | JSON assembly |
| 4 | 4.2 Summary Writer | haiku | Markdown formatting |
| 4 | 4.3 Log Writer | haiku | Execution logging |

**POSITIONAL REINFORCEMENT — READ THIS AT EVERY LAYER ENTRY:**
> You are LP-17, the Conversion Audit. You SCORE and EVALUATE. You do NOT rewrite, redesign, or fix. Every score requires evidence from the assembled page. Every FAIL requires a specific fix with an expected lift cited from conversion-data-reference.md. Gates are PASS or FAIL — nothing else.

---

## LAYER DETAILS

### Layer 0: Input Loading

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 0.1 | Assembled Page Loader | `skills/layer-0/0.1-assembled-page-loader.md` | Load the assembled page package from LP-15 | `assembled-page-package.json` path | `assembled-page-load.md` | haiku |
| 0.2 | Brief Loader | `skills/layer-0/0.2-brief-loader.md` | Load the page brief from LP-00 | `page-brief.json` path | `brief-load.md` | haiku |
| 0.3 | Benchmark Loader | `skills/layer-0/0.3-benchmark-loader.md` | Load conversion benchmark data | `conversion-data-reference.md` | `benchmark-load.md` | haiku |
| 0.4 | Specimen Reference Loader | `skills/layer-0/0.4-specimen-reference-loader.md` | Load cross-page pattern data for comparison | `cross-page-pattern-analysis.md` | `specimen-reference-load.md` | haiku |

**GATE_0:** Assembled page package loaded AND page brief loaded. Both files must be present and parseable. If either is missing -> HALT with message: "LP-17 requires assembled-page-package.json (LP-15) and page-brief.json (LP-00) to proceed."

### Layer 1: Audit Planning

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 1.1 | Page Type Validator | `skills/layer-1/1.1-page-type-validator.md` | Confirm page type and check for mismatches between brief and assembled page | `brief-load.md`, `assembled-page-load.md` | `page-type-validation.md` | sonnet |
| 1.2 | Audit Scope Planner | `skills/layer-1/1.2-audit-scope-planner.md` | Determine which of the 20 points apply and identify type-specific thresholds | `page-type-validation.md` | `audit-scope.md` | sonnet |
| 1.3 | Checklist Configurator | `skills/layer-1/1.3-checklist-configurator.md` | Set exact criteria, thresholds, and evidence requirements for each of the 20 points | `audit-scope.md`, `benchmark-load.md` | `configured-checklist.md` | sonnet |

**GATE_1:** All 20 points have configured criteria. Type-specific thresholds set. If any point has no criteria -> HALT, re-run Layer 1.

### Layer 2: Five-Category Audit

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 2.1 | Above-Fold Auditor | `skills/layer-2/2.1-above-fold-auditor.md` | Score points 01-04 (headline, hero image, CTA visibility, trust signals) | `assembled-page-load.md`, `configured-checklist.md`, `benchmark-load.md` | `above-fold-audit.md` | opus |
| 2.2 | Copy Quality Auditor | `skills/layer-2/2.2-copy-quality-auditor.md` | Score points 05-08 (reading level, AI telltales, single offer, benefit-feature order) | `assembled-page-load.md`, `configured-checklist.md`, `benchmark-load.md` | `copy-quality-audit.md` | opus |
| 2.3 | Social Proof Auditor | `skills/layer-2/2.3-social-proof-auditor.md` | Score points 09-12 (proof placement, volume, specificity, before/after) | `assembled-page-load.md`, `configured-checklist.md`, `benchmark-load.md`, `specimen-reference-load.md` | `social-proof-audit.md` | opus |
| 2.4 | Offer/Conversion Auditor | `skills/layer-2/2.4-offer-conversion-auditor.md` | Score points 13-16 (value-before-price, guarantee, CTA count, price anchoring) | `assembled-page-load.md`, `configured-checklist.md`, `benchmark-load.md` | `offer-conversion-audit.md` | opus |
| 2.5 | Mobile/Speed Auditor | `skills/layer-2/2.5-mobile-speed-auditor.md` | Score points 17-20 (load time, sticky ATC, image optimization, touch targets) | `assembled-page-load.md`, `configured-checklist.md`, `benchmark-load.md` | `mobile-speed-audit.md` | opus |

**GATE_2:** All 5 audit files exist. All 20 points have a PASS or FAIL score. Every FAIL has (a) specific page evidence, (b) specific fix recommendation, (c) expected lift with source citation. If any point is unscored or any FAIL lacks the three required elements -> HALT, complete the missing items.

### Layer 3: Scoring & Prioritization

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 3.1 | Score Calculator | `skills/layer-3/3.1-score-calculator.md` | Sum all 20 point scores, assign verdict | All 5 audit files | `score-calculation.md` | sonnet |
| 3.2 | Priority Ranker | `skills/layer-3/3.2-priority-ranker.md` | Rank FAIL items by (expected lift x ease of implementation) | `score-calculation.md`, all 5 audit files | `priority-ranking.md` | sonnet |
| 3.3 | Optimization Generator | `skills/layer-3/3.3-optimization-generator.md` | Generate specific optimization recommendations with implementation steps | `priority-ranking.md`, `benchmark-load.md` | `optimization-recommendations.md` | sonnet |

**GATE_3:** Total score matches sum of individual scores. Priority ranking is sorted descending by priority score. At least one optimization recommendation exists for every FAIL item.

### Layer 4: Package Assembly

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 4.1 | Audit Compiler | `skills/layer-4/4.1-audit-compiler.md` | Compile all audit data into conversion-audit.json | All Layer 2 + Layer 3 outputs | `conversion-audit.json` | haiku |
| 4.2 | Summary Writer | `skills/layer-4/4.2-summary-writer.md` | Write human-readable CONVERSION-AUDIT-SUMMARY.md | `conversion-audit.json` | `CONVERSION-AUDIT-SUMMARY.md` | haiku |
| 4.3 | Log Writer | `skills/layer-4/4.3-log-writer.md` | Write execution-log.md | All outputs | `execution-log.md` | haiku |

---

## GATE CONDITIONS DETAIL

### GATE_0 (Inputs Present)
**PASS:** `assembled-page-package.json` loaded AND `page-brief.json` loaded. Both parseable.
**FAIL:** Either file missing or unparseable. Action: HALT with message identifying which file is missing and which upstream skill (LP-15 or LP-00) must be run first.

### GATE_1 (Audit Configured)
**PASS:** `configured-checklist.md` exists with all 20 points having criteria, thresholds, and evidence requirements specified. Page type confirmed.
**FAIL:** Missing criteria for any point. Action: Return to Layer 1, complete configuration.

### GATE_2 (All Points Scored)
**PASS:** All 5 category audit files exist. All 20 points scored PASS or FAIL. Every FAIL has: (1) evidence quote/reference from assembled page, (2) specific fix recommendation, (3) expected lift with source.
**FAIL:** Any point unscored, or any FAIL missing required elements. Action: Return to the specific auditor (2.1-2.5) that is incomplete.

### GATE_3 (Scoring Valid)
**PASS:** Total score = sum of individual PASS scores (1 point each). Priority ranking sorted. Every FAIL has an optimization recommendation.
**FAIL:** Score mismatch or unsorted ranking. Action: Re-run Layer 3.

---

## THE 20-POINT CONVERSION AUDIT CHECKLIST

This checklist is the core evaluation instrument. It is embedded here so it is always loaded when LP-17 executes.

### Category A: Above-Fold Audit (Points 01-04)

| Point | Criterion | PASS Evidence Required | Type A Specifics | Type B Specifics |
|-------|----------|----------------------|-----------------|-----------------|
| 01 | Headline communicates a specific, credible promise (not generic) | Quote the headline. Confirm it names a specific outcome, audience, or mechanism. | Must hook attention for cold traffic. T2/T4/T5/T6 for Stage 1-2 awareness. | Must name the product benefit clearly. Can be T1 (Direct Benefit). |
| 02 | Hero image reflects aspirational outcome OR product in context (not stock) | Describe the image. Confirm it shows outcome, lifestyle, or product-in-use. | Aspirational outcome or persona image. NOT a product shot. | Product hero image in context. NOT generic stock. |
| 03 | Primary CTA is visible without scrolling on both desktop and mobile | Confirm CTA is above fold. State CTA text. | CTA may be below deck copy but still visible without scrolling. | CTA MUST be above fold with price + ATC. |
| 04 | Trust signals present above or immediately below fold | List specific trust signals found. Each must be specific (not "Satisfaction Guaranteed"). | At least 1 specific trust signal (media mention, stat, certification). | Rating strip + trust badges required. |

### Category B: Copy Quality Audit (Points 05-08)

| Point | Criterion | PASS Evidence Required | Type A Specifics | Type B Specifics |
|-------|----------|----------------------|-----------------|-----------------|
| 05 | Reading level 5th-7th grade (Hemingway score <=7) | Assess reading level of body copy. Cite specific complex passages if FAIL. | Full page body copy assessed. Lead copy especially critical. | Short description + benefit bullets assessed. |
| 06 | Zero generic AI telltales | Search for: revolutionary, game-changing, unlock, transform, harness, empower, journey, comprehensive, elevate, leverage. List any found. | Full page scan. | Full page scan. |
| 07 | Single conversion goal — ONE offer, ONE CTA direction | Confirm all CTAs point to the same action. List any competing offers. | All CTAs must point to same purchase/signup. | All CTAs must point to same ATC action. |
| 08 | Benefits lead, features follow (not feature dump first) | Identify first benefit mention and first feature mention. Benefits must appear first. | Benefits in lead/story before feature deep-dives. | Key benefits bullets before ingredient lists. |

### Category C: Social Proof Audit (Points 09-12)

| Point | Criterion | PASS Evidence Required | Type A Specifics | Type B Specifics |
|-------|----------|----------------------|-----------------|-----------------|
| 09 | Proof appears within first 25% of page | Calculate page length. Identify first proof element. Confirm it falls within first 25%. | First proof block position. Authority anchor, media mention, or stat. | Rating strip counts. Review count badge counts. |
| 10 | Proof volume appropriate to page type | Count total proof elements (testimonials, reviews, citations, endorsements). | Type A: 15+ testimonials/proof elements minimum. | Type B: 50+ reviews minimum (or equivalent volume signal like "83,502 reviews"). |
| 11 | Proof includes specific outcomes/numbers | Quote at least 3 proof elements. Each must cite a specific result, number, or timeframe. | "Lost 30 lbs in 8 weeks" = PASS. "Changed my life" = FAIL. | Star rating + specific review content with outcomes. |
| 12 | Before/after format used where applicable | Check if product category warrants before/after (supplements, weight loss, skin care, fitness). If yes, confirm presence. | Before/after stories in testimonial section. | Before/after images or review content. If category does not warrant before/after, auto-PASS with note. |

### Category D: Offer/Conversion Architecture Audit (Points 13-16)

| Point | Criterion | PASS Evidence Required | Type A Specifics | Type B Specifics |
|-------|----------|----------------------|-----------------|-----------------|
| 13 | Value established BEFORE price is revealed | Identify where value is first established and where price first appears. Value must precede price. | Value stack section before pricing block. | Benefits + proof before price display. For Type B with price above fold: mechanism/benefit content must precede the primary pricing section below fold. |
| 14 | Guarantee is visible, branded, and specific | Quote the guarantee. Must have a name (not "money-back guarantee"), duration, and specifics. | Guarantee section with branded name. | Guarantee visible near ATC or in dedicated section. |
| 15 | 3+ CTA placements on page | Count all CTA instances. Minimum 3: early, mid, pre-close. | Early (hero/lead), mid (after proof), pre-close (after guarantee/urgency). | Above fold ATC, mid-page CTA, sticky ATC counts. |
| 16 | Price anchored | Identify anchoring technique: retail/compare price, alternative cost, per-day calculation, or savings display. | Retail price crossed out, or "value of X if bought separately." | Crossed original price, per-unit savings on bundles, subscribe-and-save comparison. |

### Category E: Mobile/Speed Audit (Points 17-20)

| Point | Criterion | PASS Evidence Required | Type A Specifics | Type B Specifics |
|-------|----------|----------------------|-----------------|-----------------|
| 17 | Page load target met | Check for load-impacting elements: unoptimized images, excessive scripts, large video embeds. | Target: <3 seconds. | Target: <2 seconds. |
| 18 | Sticky ATC bar implemented on mobile | Confirm sticky CTA/ATC bar is specified for mobile. | Recommended (not required). Auto-PASS with note if absent. | Required. FAIL if absent. |
| 19 | All images optimized | Check image format specifications (WebP), lazy loading directives, compression notes. | All images specified as WebP + lazy loaded. | All images specified as WebP + lazy loaded. |
| 20 | CTA buttons minimum 44px touch target on mobile | Check CTA button size specifications. Must be >= 44px touch target. | All CTA buttons >= 44px. | ATC button + sticky bar >= 44px. |

### Scoring Thresholds

| Score | Verdict | Action |
|-------|---------|--------|
| 18-20 | LAUNCH READY | Proceed to LP-18 (A/B Test Plan). Page is ready for implementation. |
| 15-17 | MINOR OPTIMIZATION | Proceed to LP-18 with priority fixes flagged. Fix before launch but no structural changes needed. |
| 12-14 | SIGNIFICANT GAPS | Return to relevant Phase 2/3 skills. Do NOT proceed to LP-18. Revision required. |
| Below 12 | STRUCTURAL REBUILD | Return to LP-03/LP-04. Page architecture has fundamental problems. |

---

## OUTPUT SCHEMA

### conversion-audit.json

```json
{
  "schema_version": "1.0",
  "created": "[ISO timestamp]",
  "project_name": "[from page-brief.json]",
  "page_type": "[type_a | type_b | hybrid]",

  "total_score": "[0-20]",
  "verdict": "[LAUNCH_READY | MINOR_OPTIMIZATION | SIGNIFICANT_GAPS | STRUCTURAL_REBUILD]",

  "category_scores": {
    "above_fold": {
      "score": "[0-4]",
      "points": {
        "01_headline_promise": {
          "score": "[0 | 1]",
          "status": "[PASS | FAIL]",
          "evidence": "[specific quote or description from assembled page]",
          "fix": "[specific fix recommendation if FAIL, null if PASS]",
          "expected_lift": "[estimated lift with source if FAIL, null if PASS]"
        },
        "02_hero_image": { "...same structure..." },
        "03_cta_above_fold": { "...same structure..." },
        "04_trust_signals": { "...same structure..." }
      }
    },
    "copy_quality": {
      "score": "[0-4]",
      "points": {
        "05_reading_level": { "...same structure..." },
        "06_ai_telltales": { "...same structure..." },
        "07_single_offer": { "...same structure..." },
        "08_benefits_first": { "...same structure..." }
      }
    },
    "social_proof": {
      "score": "[0-4]",
      "points": {
        "09_proof_early": { "...same structure..." },
        "10_proof_volume": { "...same structure..." },
        "11_proof_specificity": { "...same structure..." },
        "12_before_after": { "...same structure..." }
      }
    },
    "offer_conversion": {
      "score": "[0-4]",
      "points": {
        "13_value_before_price": { "...same structure..." },
        "14_guarantee_quality": { "...same structure..." },
        "15_cta_count": { "...same structure..." },
        "16_price_anchoring": { "...same structure..." }
      }
    },
    "mobile_speed": {
      "score": "[0-4]",
      "points": {
        "17_page_load": { "...same structure..." },
        "18_sticky_atc": { "...same structure..." },
        "19_image_optimization": { "...same structure..." },
        "20_touch_targets": { "...same structure..." }
      }
    }
  },

  "priority_ranking": [
    {
      "rank": 1,
      "point_id": "[e.g., 06_ai_telltales]",
      "category": "[e.g., copy_quality]",
      "expected_lift": "[e.g., +56%]",
      "lift_source": "[e.g., VWO — 5th-7th grade reading level vs complex copy]",
      "ease_of_implementation": "[easy | medium | hard]",
      "priority_score": "[calculated: lift_weight x ease_weight]",
      "fix_summary": "[1-sentence fix]"
    }
  ],

  "optimization_recommendations": [
    {
      "point_id": "[e.g., 06_ai_telltales]",
      "title": "[e.g., Eliminate AI Telltale Language]",
      "current_state": "[what the page has now]",
      "recommended_state": "[what it should have]",
      "implementation_steps": ["[step 1]", "[step 2]"],
      "expected_lift": "[e.g., +56%]",
      "lift_source": "[source citation]",
      "skill_to_revise": "[e.g., LP-07 Hero Section Writer]"
    }
  ],

  "metadata": {
    "assembled_page_source": "[path to assembled-page-package.json]",
    "page_brief_source": "[path to page-brief.json]",
    "benchmark_data_source": "conversion-data-reference.md v1.0",
    "specimen_data_source": "cross-page-pattern-analysis.md v1.0"
  }
}
```

### CONVERSION-AUDIT-SUMMARY.md

```markdown
# Conversion Audit Summary — [Project Name]

## Verdict: [VERDICT] ([Score]/20)

## Score by Category
| Category | Score | Notes |
|----------|-------|-------|
| Above-Fold | [0-4]/4 | [1-sentence summary] |
| Copy Quality | [0-4]/4 | [1-sentence summary] |
| Social Proof | [0-4]/4 | [1-sentence summary] |
| Offer/Conversion | [0-4]/4 | [1-sentence summary] |
| Mobile/Speed | [0-4]/4 | [1-sentence summary] |

## Top 3 Priority Fixes
1. **[Fix Title]** — Expected lift: [X%] ([Source]). [1-sentence description].
2. **[Fix Title]** — Expected lift: [X%] ([Source]). [1-sentence description].
3. **[Fix Title]** — Expected lift: [X%] ([Source]). [1-sentence description].

## Full Point-by-Point Results
[Table of all 20 points with PASS/FAIL and 1-line evidence]

## Recommended Next Steps
[Based on verdict: proceed to LP-18, fix and re-audit, or structural rebuild]
```

---

## FORBIDDEN BEHAVIORS

1. Skipping any of the 20 points — all must be explicitly scored
2. Scoring a point as PASS without citing specific evidence from the assembled page
3. Scoring a point as FAIL without providing a specific fix recommendation
4. Hallucinating conversion lift statistics — every number must cite conversion-data-reference.md or cross-page-pattern-analysis.md
5. Applying Type B criteria to a Type A page or vice versa without noting the type-specific difference
6. Using "conditional pass" or "partial pass" — each point is PASS (1) or FAIL (0)
7. Inflating scores to avoid delivering bad news — a failing page scores as failing
8. Producing conversion-audit.json without CONVERSION-AUDIT-SUMMARY.md and execution-log.md
9. Providing vague fix recommendations ("improve the headline") instead of specific ones ("change headline from generic benefit to T4 Story-Based to match Stage 2 Problem-Aware cold traffic")
10. Claiming the audit is complete before all 20 points are scored with evidence

---

## REVISION ROUTING (When Score < 15)

When the audit identifies significant gaps, route fixes to the appropriate upstream skill:

| Failure Area | Route Fix To |
|-------------|-------------|
| Points 01-04 (Above-Fold) | LP-03 Above-Fold Architecture + LP-07 Hero Section Writer |
| Points 05-06 (Copy Quality — language) | LP-07, LP-09, LP-10, LP-11, LP-12, LP-13, LP-14 (whichever wrote the flagged copy) |
| Point 07 (Single Offer) | LP-06 Offer/CTA Architecture |
| Point 08 (Benefits First) | LP-04 Section Sequence Planner + LP-09 Benefits/Features Writer |
| Points 09-12 (Social Proof) | LP-05 Social Proof Architecture + LP-10 Social Proof Writer |
| Points 13-16 (Offer/Conversion) | LP-06 Offer/CTA Architecture + LP-11 Offer/Pricing Writer + LP-14 CTA Optimizer |
| Points 17-20 (Mobile/Speed) | LP-16 Mobile/Speed Audit (if not run) + LP-15 Page Assembly (implementation specs) |
