# LP-16: Mobile/Speed Audit — Master Agent

> **Version:** 1.0
> **Skill:** LP-16-mobile-audit
> **Position:** Phase 4 — Quality Gate (runs after LP-15 Page Assembly, before LP-17 Conversion Audit)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** `assembled-page-package.json` (LP-15), `page-brief.json` (LP-00)
> **Output:** `mobile-audit.json` + `MOBILE-AUDIT-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Review an assembled landing page against mobile-first principles and page speed benchmarks. Identify every element that hurts mobile UX — excessive text blocks, bad CTA placement, missing sticky bars, undersized touch targets, unoptimized media. Produce a scored audit with specific, actionable fixes ranked by conversion impact.

**Mobile is default.** 60%+ of direct response traffic arrives on mobile devices. A page that looks great on desktop but breaks on mobile is a page that loses the majority of its visitors. This skill audits the container, not the copy — it evaluates whether the structural and technical decisions made upstream will survive contact with a 375px screen and a 4G connection.

**Success Criteria:**
- All 7 mobile audit dimensions explicitly scored (each dimension 0-10)
- Every score below 7.0 includes: specific evidence from the assembled page, specific fix recommendation, expected impact with source citation from conversion-data-reference.md
- Overall Mobile Readiness Score calculated (weighted average across 7 dimensions)
- Page type (Type A / Type B / Hybrid) governs which thresholds apply
- Speed estimation based on content inventory — not hand-waving
- Zero hallucinated statistics — every impact estimate cites conversion-data-reference.md or cross-page-pattern-analysis.md
- Fix list ranked by (expected conversion impact x ease of implementation)

---

## IDENTITY

**This skill IS:**
- A mobile-first audit that evaluates page structure against small-screen constraints
- A speed estimator that flags load-time risks based on content inventory
- A fix generator that produces specific, implementable mobile optimization recommendations
- An evidence-based scorer — every dimension score requires proof from the assembled page itself

**This skill is NOT:**
- A fixer — it identifies problems but does not rewrite copy or restructure pages
- A copy auditor — LP-17 handles copy quality; LP-16 handles the mobile container
- A real performance testing tool — it estimates based on content inventory since it cannot run Lighthouse or WebPageTest
- A desktop audit — desktop is evaluated only where it conflicts with mobile optimization

**Upstream:** LP-15 (Page Assembly) provides the assembled page. LP-00 provides the brief (page type classification).
**Downstream:** Feeds `mobile-audit.json` to LP-17 (Conversion Audit, points 17-20). Feeds `MOBILE-AUDIT-SUMMARY.md` to human reviewer. If Mobile Readiness Score < 6.0, flags for revision before LP-17 proceeds.

---

## STATE MACHINE

```
IDLE -> TRIGGERED
  |
LAYER_0: Input Loading
  -> 0.1: Load assembled page package (from LP-15)
  -> 0.2: Load page brief (from LP-00, for page type)
  -> 0.3: Load mobile-specific benchmarks (from conversion-data-reference.md)
  | [GATE_0: Assembled page + page brief both present?]
LAYER_1: Audit Planning
  -> 1.1: Configure mobile audit criteria based on page type (Type A vs Type B thresholds)
  -> 1.2: Determine primary device context (mobile-first vs desktop-first based on traffic source and vertical)
  | [GATE_1: Criteria configured, device context determined?]
LAYER_2: Mobile Audit (7-dimension evaluation)
  -> 2.1: Viewport analysis (above-fold on 375px, 390px, 414px)
  -> 2.2: Content density audit (text walls, paragraph length, visual breaks)
  -> 2.3: CTA mobile audit (sticky bar, touch targets, thumb zone, spacing)
  -> 2.4: Media performance audit (WebP, lazy loading, dimensions, video)
  -> 2.5: Speed estimation (page weight, content inventory, load time estimate)
  | [GATE_2: All 5 audit files exist? All 7 dimensions scored?]
LAYER_3: Scoring & Fixes
  -> 3.1: Calculate mobile readiness score across 7 dimensions
  -> 3.2: Generate specific fixes ranked by impact
  | [GATE_3: Score calculated? Fix list complete and ranked?]
LAYER_4: Package Assembly
  -> 4.1: Compile mobile-audit.json
  -> 4.2: Write MOBILE-AUDIT-SUMMARY.md
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
| 1 | 1.1 Mobile Criteria Configurator | sonnet | Configuration based on page type, moderate judgment |
| 1 | 1.2 Device Context Planner | sonnet | Traffic source + vertical analysis, moderate judgment |
| 2 | 2.1 Viewport Analyzer | opus | Critical judgment — evaluating above-fold content fit across mobile viewports |
| 2 | 2.2 Content Density Auditor | opus | Critical judgment — identifying text walls and scanability failures on mobile |
| 2 | 2.3 CTA Mobile Auditor | opus | Critical judgment — evaluating sticky bar, touch targets, thumb zone accessibility |
| 2 | 2.4 Media Performance Auditor | opus | Critical judgment — evaluating image optimization, lazy loading, video handling |
| 2 | 2.5 Speed Estimator | opus | Critical judgment — estimating page weight and load time from content inventory |
| 3 | 3.1 Mobile Score Calculator | sonnet | Arithmetic + weighted scoring |
| 3 | 3.2 Fix Generator | sonnet | Structured recommendation writing, impact ranking |
| 4 | 4.1 Audit Compiler | haiku | JSON assembly |
| 4 | 4.2 Summary Writer | haiku | Markdown formatting |
| 4 | 4.3 Log Writer | haiku | Execution logging |

**POSITIONAL REINFORCEMENT — READ THIS AT EVERY LAYER ENTRY:**
> You are LP-16, the Mobile/Speed Audit. You AUDIT the mobile container. You do NOT rewrite copy, redesign pages, or fix code. Mobile is default — 60%+ of DR traffic is mobile. Every score requires evidence from the assembled page. Every fix must be specific: WHAT element, WHAT is wrong, HOW to fix it, WHAT the expected impact is. Type A and Type B have DIFFERENT mobile thresholds. Gates are PASS or FAIL — nothing else.

---

## LAYER DETAILS

### Layer 0: Input Loading

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 0.1 | Assembled Page Loader | `skills/layer-0/0.1-assembled-page-loader.md` | Load the assembled page package from LP-15 | `assembled-page-package.json` path | `assembled-page-load.md` | haiku |
| 0.2 | Brief Loader | `skills/layer-0/0.2-brief-loader.md` | Load the page brief from LP-00 for page type classification | `page-brief.json` path | `brief-load.md` | haiku |
| 0.3 | Benchmark Loader | `skills/layer-0/0.3-benchmark-loader.md` | Load mobile-specific benchmarks from conversion-data-reference.md | `conversion-data-reference.md` | `benchmark-load.md` | haiku |

**GATE_0:** Assembled page package loaded AND page brief loaded. Both files must be present and parseable. If either is missing -> HALT with message: "LP-16 requires assembled-page-package.json (LP-15) and page-brief.json (LP-00) to proceed."

### Layer 1: Audit Planning

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 1.1 | Mobile Criteria Configurator | `skills/layer-1/1.1-mobile-criteria-configurator.md` | Configure mobile audit criteria and thresholds based on page type | `brief-load.md`, `benchmark-load.md` | `mobile-criteria.md` | sonnet |
| 1.2 | Device Context Planner | `skills/layer-1/1.2-device-context-planner.md` | Determine primary device context from traffic source and vertical | `brief-load.md` | `device-context.md` | sonnet |

**GATE_1:** `mobile-criteria.md` exists with all 7 dimensions having type-specific thresholds. `device-context.md` exists with primary device determination. If either file is missing or incomplete -> HALT, re-run Layer 1.

### Layer 2: Mobile Audit (7-Dimension Evaluation)

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 2.1 | Viewport Analyzer | `skills/layer-2/2.1-viewport-analysis.md` | Analyze above-fold content for mobile viewports (375px, 390px, 414px) | `assembled-page-load.md`, `mobile-criteria.md`, `device-context.md` | `viewport-analysis.md` | opus |
| 2.2 | Content Density Auditor | `skills/layer-2/2.2-content-density-auditor.md` | Identify sections with excessive text for mobile screens | `assembled-page-load.md`, `mobile-criteria.md` | `content-density-audit.md` | opus |
| 2.3 | CTA Mobile Auditor | `skills/layer-2/2.3-cta-mobile-auditor.md` | Audit CTA placement for mobile: sticky bar, touch targets, thumb zone, spacing | `assembled-page-load.md`, `mobile-criteria.md` | `cta-mobile-audit.md` | opus |
| 2.4 | Media Performance Auditor | `skills/layer-2/2.4-media-performance-auditor.md` | Audit images/media: format, lazy loading, dimensions, video handling | `assembled-page-load.md`, `mobile-criteria.md` | `media-performance-audit.md` | opus |
| 2.5 | Speed Estimator | `skills/layer-2/2.5-speed-estimator.md` | Estimate page weight and load time from content inventory | `assembled-page-load.md`, `mobile-criteria.md`, `benchmark-load.md` | `speed-estimation.md` | opus |

**GATE_2:** All 5 Layer 2 audit files exist. All 7 mobile audit dimensions scored (Viewport Fit, Content Density, CTA Accessibility, Media Optimization, Page Speed, Typography, Navigation — the last two are distributed across 2.1-2.3). Every score below 7.0 has: (a) specific evidence from assembled page, (b) specific fix recommendation, (c) expected impact with source citation. If any dimension is unscored or any sub-7.0 score lacks the three required elements -> HALT, complete the missing items.

### Layer 3: Scoring & Fixes

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 3.1 | Mobile Score Calculator | `skills/layer-3/3.1-mobile-score-calculator.md` | Calculate overall Mobile Readiness Score (weighted average) | All 5 Layer 2 audit files | `mobile-score.md` | sonnet |
| 3.2 | Fix Generator | `skills/layer-3/3.2-fix-generator.md` | Generate specific mobile fixes ranked by (impact x ease) | `mobile-score.md`, all 5 Layer 2 audit files, `benchmark-load.md` | `mobile-fixes.md` | sonnet |

**GATE_3:** Mobile Readiness Score calculated as weighted average. Fix list exists, sorted by priority score descending. Every fix has: what element, what is wrong, how to fix it, expected impact with source. If score or ranking is incomplete -> HALT, re-run Layer 3.

### Layer 4: Package Assembly

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 4.1 | Audit Compiler | `skills/layer-4/4.1-audit-compiler.md` | Compile all audit data into mobile-audit.json | All Layer 2 + Layer 3 outputs | `mobile-audit.json` | haiku |
| 4.2 | Summary Writer | `skills/layer-4/4.2-summary-writer.md` | Write human-readable MOBILE-AUDIT-SUMMARY.md | `mobile-audit.json` | `MOBILE-AUDIT-SUMMARY.md` | haiku |
| 4.3 | Log Writer | `skills/layer-4/4.3-log-writer.md` | Write execution-log.md | All outputs | `execution-log.md` | haiku |

---

## GATE CONDITIONS DETAIL

### GATE_0 (Inputs Present)
**PASS:** `assembled-page-package.json` loaded AND `page-brief.json` loaded. Both parseable.
**FAIL:** Either file missing or unparseable. Action: HALT with message identifying which file is missing and which upstream skill (LP-15 or LP-00) must be run first.

### GATE_1 (Audit Configured)
**PASS:** `mobile-criteria.md` exists with all 7 dimension thresholds. `device-context.md` exists with primary device and traffic source determination.
**FAIL:** Missing thresholds for any dimension. Action: Return to Layer 1, complete configuration.

### GATE_2 (All Dimensions Scored)
**PASS:** All 5 audit files exist. All 7 dimensions scored 0-10. Every score below 7.0 has: (1) evidence from assembled page, (2) specific fix recommendation, (3) expected impact with source.
**FAIL:** Any dimension unscored, or any sub-7.0 score missing required elements. Action: Return to the specific auditor (2.1-2.5) that is incomplete.

### GATE_3 (Scoring Valid)
**PASS:** Mobile Readiness Score = weighted average of 7 dimension scores. Fix list sorted by priority score descending. Every fix has all required elements.
**FAIL:** Score mismatch or unsorted/incomplete fix list. Action: Re-run Layer 3.

---

## THE 7 MOBILE AUDIT DIMENSIONS

This framework is the core evaluation instrument for LP-16. It is embedded here so it is always loaded when LP-16 executes.

### Dimension 1: Viewport Fit (Weight: 20%)

**What it measures:** Does above-fold content fit mobile viewports without horizontal scrolling, truncation, or critical element loss?

| Criterion | Type A Threshold | Type B Threshold |
|----------|-----------------|-----------------|
| Headline fully visible on 375px width | Must be visible without truncation | Must be visible without truncation |
| Primary CTA visible without scrolling | CTA may be in deck copy below hero but within first viewport | CTA + price MUST be above fold |
| Hero image/video renders properly at mobile width | Image scales without cropping key content | Product image scales without cropping |
| No horizontal overflow elements | Zero horizontal scroll triggers | Zero horizontal scroll triggers |

**Scoring:**
- 9-10: All above-fold elements fit perfectly across 375px, 390px, and 414px. CTA visible without scrolling.
- 7-8: Minor adjustments needed (e.g., headline font size slightly large for 375px, but fits 390px+).
- 5-6: CTA pushed below fold on smallest viewports, or headline truncated.
- 3-4: Major viewport issues — horizontal scroll, critical elements hidden.
- 1-2: Page is essentially unusable on mobile viewports.

### Dimension 2: Content Density (Weight: 15%)

**What it measures:** Are text blocks scannable on a small screen? No walls of text, appropriate line breaks, visual breathing room.

| Criterion | Type A Threshold | Type B Threshold |
|----------|-----------------|-----------------|
| No paragraph exceeds 3 lines on mobile (~45 words) | Applied to all body copy sections | Applied to product descriptions |
| Visual break every 2-3 paragraphs minimum | Icons, images, dividers, or whitespace | Images, badges, or whitespace |
| Long sections (>500 words) have collapse/accordion recommendations | Required for sections 4+ | Required for ingredient/science sections |
| Bullet points used for lists (not inline comma separation) | All list content | All feature/benefit lists |

**Scoring:**
- 9-10: All text blocks mobile-scannable. Consistent visual breaks. No walls of text.
- 7-8: 1-2 sections slightly dense but still readable on mobile.
- 5-6: Multiple sections with text walls. Missing visual breaks in key areas.
- 3-4: Majority of body copy is wall-of-text on mobile. Poor scannability.
- 1-2: Page reads like a desktop document forced onto a phone screen.

### Dimension 3: CTA Accessibility (Weight: 25%)

**What it measures:** Can the user easily find and tap CTAs on mobile? Sticky bar present? Touch targets adequate? Thumb-zone friendly?

| Criterion | Type A Threshold | Type B Threshold |
|----------|-----------------|-----------------|
| Sticky CTA/ATC bar specified for mobile | Recommended (score 7 if absent) | **REQUIRED** (score <= 4 if absent) |
| All CTA buttons >= 44px touch target | All CTAs must meet 44px minimum | ATC button + sticky bar must meet 44px minimum |
| CTA spacing >= 8px from other tappable elements | No accidental tap risk | No accidental tap risk |
| Primary CTA in thumb zone (bottom 60% of screen) | At least 1 CTA in thumb zone | Sticky bar = always in thumb zone |
| CTA visible at every scroll breakpoint (~2 screen heights) | 3+ CTA placements minimum | Sticky bar handles continuous visibility |

**Scoring:**
- 9-10: Sticky bar specified, all touch targets >= 44px, proper spacing, thumb-zone optimized.
- 7-8: Touch targets adequate, but sticky bar absent (Type A) or CTA spacing slightly tight.
- 5-6: Missing sticky bar (Type B = automatic ceiling of 5), or touch targets under 44px.
- 3-4: CTAs difficult to reach on mobile, poor spacing, no sticky implementation.
- 1-2: CTA architecture ignores mobile entirely.

### Dimension 4: Media Optimization (Weight: 15%)

**What it measures:** Are images and media optimized for mobile delivery?

| Criterion | Type A Threshold | Type B Threshold |
|----------|-----------------|-----------------|
| Image format specified as WebP | All images | All images |
| Lazy loading specified for below-fold images | All below-fold images | All below-fold images |
| Image dimensions appropriate for mobile (no 2000px+ source for 375px display) | Max 2x display resolution (750px for 375px display) | Max 2x display resolution |
| Video autoplay disabled on mobile OR muted with poster frame | All video elements | All video elements |
| Hero image has mobile-specific crop/version | Recommended | Required for product hero |

**Scoring:**
- 9-10: WebP specified, lazy loading set, mobile-appropriate dimensions, video handled correctly.
- 7-8: Most images optimized but 1-2 missing lazy loading or dimension specs.
- 5-6: No format specification (defaulting to PNG/JPEG assumed), or no lazy loading directive.
- 3-4: Large unoptimized images, no lazy loading, desktop-sized assets.
- 1-2: No media optimization considerations in the assembled page at all.

### Dimension 5: Page Speed (Weight: 15%)

**What it measures:** Estimated load time based on content inventory.

| Criterion | Type A Threshold | Type B Threshold |
|----------|-----------------|-----------------|
| Estimated page load time | < 3 seconds | < 2 seconds |
| Maximum acceptable load time | 4 seconds | 3 seconds |
| Third-party script count | Flag if > 3 third-party scripts | Flag if > 2 third-party scripts |
| Estimated page weight (content-based) | < 3MB total | < 2MB total |

**Speed estimation formula (content-based):**
- Base HTML/CSS: ~200KB
- Per section (avg): ~50KB (markup + styles)
- Per image (optimized WebP): ~80KB avg
- Per image (unoptimized PNG/JPEG): ~300KB avg
- Video embed: ~500KB (player + poster)
- Per third-party script: ~100KB avg
- Estimated load time: page_weight / (1.5MB/s for mobile 4G) + 0.5s (DNS + connection)

**Scoring:**
- 9-10: Estimated load < target. Minimal third-party scripts. All media optimized.
- 7-8: Estimated load near target but within acceptable range. Minor script concerns.
- 5-6: Estimated load exceeds target. Multiple heavy elements. Script bloat.
- 3-4: Estimated load significantly exceeds acceptable range. Major weight issues.
- 1-2: Page is estimated to be unusably slow on mobile.

### Dimension 6: Typography (Weight: 5%)

**What it measures:** Are font sizes readable on mobile without zoom? Adequate line height?

| Criterion | Type A Threshold | Type B Threshold |
|----------|-----------------|-----------------|
| Body copy minimum 16px | Required (prevents iOS auto-zoom) | Required |
| Headline minimum 24px on mobile | Required | Required |
| Line height minimum 1.4x body font size | Required | Required |
| Maximum characters per line on mobile | ~45-55 characters | ~45-55 characters |

**Scoring:**
- 9-10: All font sizes mobile-appropriate. Proper line height. No auto-zoom triggers.
- 7-8: Minor sizing issues (e.g., footer text slightly small).
- 5-6: Body copy under 16px or line height too tight for mobile reading.
- 3-4: Multiple font sizing issues. iOS auto-zoom triggered.
- 1-2: Typography completely ignores mobile reading constraints.

### Dimension 7: Navigation (Weight: 5%)

**What it measures:** Can the user find the CTA easily? Is the scroll path clear?

| Criterion | Type A Threshold | Type B Threshold |
|----------|-----------------|-----------------|
| Clear visual hierarchy guiding scroll | Section headers, visual breaks, directional cues | Product flow is linear and obvious |
| No dead-end sections (scroll traps) | Every section leads naturally to the next | Every section leads to purchase |
| Back-to-top or persistent navigation | Recommended for pages > 5 screen heights | Not required (sticky bar handles this) |
| Anchor links for long pages | Recommended for pages > 10 sections | Not required |

**Scoring:**
- 9-10: Clear scroll path, no dead ends, navigation aids for long pages.
- 7-8: Mostly clear flow with 1-2 sections that could confuse scroll direction.
- 5-6: Several sections lack clear connection. User might get lost mid-page.
- 3-4: Poor scroll flow. Multiple dead-end sections. No navigation aids on long page.
- 1-2: User has no clear path from entry to CTA.

---

## MOBILE READINESS SCORE CALCULATION

**Weighted Average:**

| Dimension | Weight |
|-----------|--------|
| Viewport Fit | 20% |
| Content Density | 15% |
| CTA Accessibility | 25% |
| Media Optimization | 15% |
| Page Speed | 15% |
| Typography | 5% |
| Navigation | 5% |

**Mobile Readiness Score = (D1 x 0.20) + (D2 x 0.15) + (D3 x 0.25) + (D4 x 0.15) + (D5 x 0.15) + (D6 x 0.05) + (D7 x 0.05)**

### Verdicts

| Score | Verdict | Action |
|-------|---------|--------|
| 8.0-10.0 | MOBILE READY | Proceed to LP-17. Page is optimized for mobile. |
| 6.0-7.9 | MINOR MOBILE FIXES | Proceed to LP-17 with mobile fixes flagged. Fix before launch but no structural changes. |
| 4.0-5.9 | SIGNIFICANT MOBILE GAPS | Return to LP-15 for mobile-specific revisions. Do NOT proceed to LP-17. |
| Below 4.0 | MOBILE REBUILD | Return to LP-03/LP-04. Page architecture ignores mobile. Structural rebuild required. |

---

## OUTPUT SCHEMA

### mobile-audit.json

```json
{
  "schema_version": "1.0",
  "created": "[ISO timestamp]",
  "project_name": "[from page-brief.json]",
  "page_type": "[type_a | type_b | hybrid]",
  "primary_device_context": "[mobile_first | desktop_first]",

  "mobile_readiness_score": "[0.0-10.0]",
  "verdict": "[MOBILE_READY | MINOR_MOBILE_FIXES | SIGNIFICANT_MOBILE_GAPS | MOBILE_REBUILD]",

  "dimension_scores": {
    "viewport_fit": {
      "score": "[0-10]",
      "weight": 0.20,
      "weighted_score": "[calculated]",
      "findings": [
        {
          "element": "[specific element name]",
          "status": "[PASS | FLAG | FAIL]",
          "evidence": "[specific description from assembled page]",
          "fix": "[specific fix if FLAG or FAIL, null if PASS]",
          "expected_impact": "[impact estimate with source if FLAG or FAIL, null if PASS]"
        }
      ]
    },
    "content_density": {
      "score": "[0-10]",
      "weight": 0.15,
      "weighted_score": "[calculated]",
      "findings": ["...same structure..."]
    },
    "cta_accessibility": {
      "score": "[0-10]",
      "weight": 0.25,
      "weighted_score": "[calculated]",
      "findings": ["...same structure..."]
    },
    "media_optimization": {
      "score": "[0-10]",
      "weight": 0.15,
      "weighted_score": "[calculated]",
      "findings": ["...same structure..."]
    },
    "page_speed": {
      "score": "[0-10]",
      "weight": 0.15,
      "weighted_score": "[calculated]",
      "estimated_load_time_seconds": "[number]",
      "estimated_page_weight_kb": "[number]",
      "speed_target_seconds": "[2 or 3 based on page type]",
      "findings": ["...same structure..."]
    },
    "typography": {
      "score": "[0-10]",
      "weight": 0.05,
      "weighted_score": "[calculated]",
      "findings": ["...same structure..."]
    },
    "navigation": {
      "score": "[0-10]",
      "weight": 0.05,
      "weighted_score": "[calculated]",
      "findings": ["...same structure..."]
    }
  },

  "priority_fixes": [
    {
      "rank": 1,
      "dimension": "[e.g., cta_accessibility]",
      "element": "[specific element]",
      "issue": "[what is wrong]",
      "fix": "[how to fix it]",
      "expected_impact": "[e.g., +25.2% mobile conversions]",
      "impact_source": "[e.g., VWO — mobile-responsive vs static]",
      "ease_of_implementation": "[easy | medium | hard]",
      "priority_score": "[calculated: impact_weight x ease_weight]"
    }
  ],

  "speed_inventory": {
    "total_sections": "[number]",
    "total_images": "[number]",
    "images_webp_specified": "[number]",
    "images_lazy_loaded": "[number]",
    "video_embeds": "[number]",
    "third_party_scripts": "[number]",
    "estimated_page_weight_kb": "[number]",
    "estimated_load_time_seconds": "[number]"
  },

  "metadata": {
    "assembled_page_source": "[path to assembled-page-package.json]",
    "page_brief_source": "[path to page-brief.json]",
    "benchmark_data_source": "conversion-data-reference.md v1.0"
  }
}
```

### MOBILE-AUDIT-SUMMARY.md

```markdown
# Mobile/Speed Audit Summary — [Project Name]

## Verdict: [VERDICT] (Mobile Readiness: [Score]/10)

## Score by Dimension
| Dimension | Score | Weight | Weighted | Key Finding |
|-----------|-------|--------|----------|-------------|
| Viewport Fit | [0-10] | 20% | [calc] | [1-sentence summary] |
| Content Density | [0-10] | 15% | [calc] | [1-sentence summary] |
| CTA Accessibility | [0-10] | 25% | [calc] | [1-sentence summary] |
| Media Optimization | [0-10] | 15% | [calc] | [1-sentence summary] |
| Page Speed | [0-10] | 15% | [calc] | [1-sentence summary] |
| Typography | [0-10] | 5% | [calc] | [1-sentence summary] |
| Navigation | [0-10] | 5% | [calc] | [1-sentence summary] |

## Speed Estimate
- Estimated page weight: [X] KB
- Estimated load time: [X] seconds
- Target: [2 or 3] seconds ([Type A or Type B])
- Status: [PASS | OVER TARGET | CRITICAL]

## Top 3 Priority Fixes
1. **[Fix Title]** — Expected impact: [X%] ([Source]). [1-sentence description].
2. **[Fix Title]** — Expected impact: [X%] ([Source]). [1-sentence description].
3. **[Fix Title]** — Expected impact: [X%] ([Source]). [1-sentence description].

## Full Fix List
[Table of all fixes ranked by priority score]

## Recommended Next Steps
[Based on verdict: proceed to LP-17, fix and re-audit, or structural rebuild]
```

---

## FORBIDDEN BEHAVIORS

1. **Desktop Bias** — Evaluating the page as if desktop is primary. Mobile is default. 60%+ of DR traffic is mobile.
2. **Generic Mobile Advice** — "Make it mobile-friendly" is not a fix. Every fix must specify: exact element, exact issue, exact solution.
3. **Skipping Speed Estimation** — "We can't test real load times" is not an excuse. Estimate based on content inventory using the formula in Dimension 5.
4. **Type A/B Threshold Confusion** — Type B has stricter mobile requirements (sticky ATC REQUIRED, <2s load). Type A is more lenient (<3s load, sticky ATC recommended). Check the page type BEFORE scoring.
5. **Ignoring Thumb Zone** — CTA placement analysis MUST consider thumb-zone reachability. Bottom 60% of screen = natural thumb reach.
6. **Overlooking Content Collapse** — Long Type A sections (>500 words) NEED mobile accordion/collapse recommendations. Do not skip this.
7. **Fabricating Impact Data** — Every impact estimate must cite conversion-data-reference.md. If no specific benchmark exists, state "significant impact expected (no specific benchmark available)" — do NOT invent numbers.
8. **Scoring Without Evidence** — Every dimension score must reference specific elements from the assembled page. "Mobile looks good" is not evidence.
9. **Producing mobile-audit.json Without All Three Files** — mobile-audit.json + MOBILE-AUDIT-SUMMARY.md + execution-log.md. All three or it is not complete.
10. **Skipping Dimensions Under Context Pressure** — All 7 dimensions must be scored. If context is limited, process the assembled page in sections rather than dropping dimensions.

---

## REVISION ROUTING (When Score < 6.0)

When the audit identifies significant mobile gaps, route fixes to the appropriate upstream skill:

| Failure Area | Route Fix To |
|-------------|-------------|
| Viewport Fit — above-fold layout | LP-03 Above-Fold Architecture + LP-07 Hero Section Writer |
| Content Density — text walls | LP-09 Benefits/Features, LP-10 Social Proof, LP-12 FAQ (whichever produced the dense section) |
| CTA Accessibility — sticky bar, touch targets | LP-06 Offer/CTA Architecture + LP-14 CTA Optimizer |
| Media Optimization — image/video specs | LP-15 Page Assembly (implementation specifications) |
| Page Speed — weight/scripts | LP-15 Page Assembly (asset optimization specs) |
| Typography — font sizing | LP-15 Page Assembly (responsive typography specs) |
| Navigation — scroll flow | LP-04 Section Sequence Planner |
