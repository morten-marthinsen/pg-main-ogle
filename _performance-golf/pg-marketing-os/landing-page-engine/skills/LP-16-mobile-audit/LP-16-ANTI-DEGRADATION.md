# LP-16: Mobile/Speed Audit — Anti-Degradation File

> **Version:** 1.0
> **Skill:** LP-16-mobile-audit
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-16 has six specific failure modes:

1. **Desktop Bias:** AI evaluates the page through a desktop lens — analyzing layout as if the user has a 1440px screen and a fiber connection. This is the most common and most damaging failure mode. 60%+ of direct response traffic arrives on mobile devices (conversion-data-reference.md, Mobile-Specific Data). Every evaluation must start from a 375px viewport on a 4G connection. If the auditor does not explicitly state viewport widths and mobile-specific constraints, it is exhibiting desktop bias.

2. **Generic Mobile Advice:** AI writes "make it mobile-friendly" or "optimize for mobile" as a fix. This is useless. Every fix must specify: (a) the exact element ("Section 7: Benefits/Features — the 4-paragraph ingredient description"), (b) the exact issue ("renders as a 12-line wall of text on 375px width with no visual breaks"), (c) the exact solution ("break into 4 separate expandable accordions, one per ingredient, each <=3 lines when collapsed"), (d) the expected impact ("mobile-responsive optimization: +25.2% mobile conversions — VWO"). A fix under 25 words is almost certainly too vague.

3. **Missing Speed Estimation:** AI skips the speed dimension because "we can't run Lighthouse or WebPageTest." Correct — LP-16 cannot run real performance tools. But it CAN and MUST estimate page weight from the content inventory: count sections, count images, check format specs, count video embeds, count third-party scripts, apply the estimation formula. The estimate does not need to be exact. It needs to flag obvious problems — like a page with 15 unoptimized PNG images and 3 video embeds that will clearly exceed the 2-second target.

4. **Type A/B Threshold Confusion:** Type B pages have STRICTER mobile requirements than Type A pages. Specifically:
   - Type B: Sticky ATC bar is **REQUIRED** (FAIL if absent). Load target: < 2 seconds.
   - Type A: Sticky CTA bar is **RECOMMENDED** (score ceiling of 7 if absent, not automatic FAIL). Load target: < 3 seconds.
   - Scoring a Type A page as FAIL for missing sticky bar, or scoring a Type B page as acceptable without one, are both errors.

5. **Ignoring Thumb Zone:** CTA placement analysis that only checks "is the CTA visible?" without analyzing whether it is in the natural thumb reach zone (bottom 60% of the screen). A CTA at the very top of the screen is visible but requires the user to shift grip to tap — this is a friction point on mobile. The thumb zone is not optional analysis.

6. **Overlooking Content Collapse:** Long Type A pages (info products, long-form sales pages) often have sections exceeding 500 words. On desktop, these are manageable. On mobile, a 500-word section becomes 30+ lines of scrolling with no interaction — this is a scroll trap. LP-16 MUST recommend accordion/collapse treatment for any section exceeding 500 words on a Type A page. This is not a suggestion — it is a scored criterion.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `assembled-page-load.md` | Layer 1 |
| After Layer 0 | `brief-load.md` | Layer 1 |
| After Layer 0 | `benchmark-load.md` | Layer 1 |
| After Layer 1 | `mobile-criteria.md` | Layer 2 |
| After Layer 1 | `device-context.md` | Layer 2 |
| After Layer 2 | `viewport-analysis.md` | Layer 3 |
| After Layer 2 | `content-density-audit.md` | Layer 3 |
| After Layer 2 | `cta-mobile-audit.md` | Layer 3 |
| After Layer 2 | `media-performance-audit.md` | Layer 3 |
| After Layer 2 | `speed-estimation.md` | Layer 3 |
| After Layer 3 | `mobile-score.md` | Layer 4 |
| After Layer 3 | `mobile-fixes.md` | Layer 4 |
| Output | `mobile-audit.json` | LP-17, human |
| Output | `MOBILE-AUDIT-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF ANY REQUIRED FILE DOES NOT EXIST -> THE LAYER IS NOT COMPLETE.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Dimensions scored | All 7 explicitly scored (0-10) | HALT — score remaining dimensions |
| Sub-7.0 evidence | Every score < 7.0 has specific page evidence | HALT — add evidence for bare scores |
| Sub-7.0 fix | Every score < 7.0 has specific fix recommendation | HALT — write specific fixes |
| Sub-7.0 impact | Every score < 7.0 cites conversion-data-reference.md | HALT — add impact citations |
| Score calculation | Mobile Readiness Score = correct weighted average | HALT — recalculate |
| Fix ranking | Sorted by (impact x ease) descending | HALT — re-sort |
| Speed estimation | Content inventory counted, weight estimated, load time calculated | HALT — run speed estimation |
| Three-file output | mobile-audit.json + MOBILE-AUDIT-SUMMARY.md + execution-log.md | HALT — write missing files |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It Is Invalid |
|----------------|-----------------|
| "The page will probably load fast enough" | Based on what? Count the sections, images, scripts. Estimate the weight. Calculate the load time. "Probably" is not a score. |
| "Mobile optimization depends on implementation" | Correct — and LP-16 audits whether the assembled page SPECIFIES the correct implementation. If the spec says "hero image" without format, sizing, or lazy loading directives, that is a mobile FAIL regardless of future implementation. |
| "The CTA is visible on mobile" | Visible WHERE on mobile? Above the fold on 375px? In the thumb zone? With adequate touch target size? With adequate spacing from other tappable elements? "Visible" is necessary but insufficient. |
| "Content density is fine for this audience" | What screen are they reading on? A 375px screen does not care about audience sophistication — a 12-line paragraph is a wall of text regardless of who is reading it. Measure against mobile viewport constraints, not audience assumptions. |
| "Sticky bar is a nice-to-have" | For Type A: it is recommended (score ceiling of 7 if absent). For Type B: it is REQUIRED (score ceiling of 4 if absent). Sticky ATC bar on mobile is the highest-impact single change for mobile conversion (conversion-data-reference.md). |
| "We can't measure real page speed" | Correct. We estimate from content inventory. A page with 23 sections, 15 images (no WebP spec), 2 video embeds, and 4 third-party scripts will be slow regardless of future optimization. Flag it. |
| "Typography is just a design concern" | Body copy under 16px triggers iOS Safari auto-zoom, which breaks the layout and creates horizontal scroll. This is a functional mobile failure, not a design preference. |
| "This dimension doesn't apply to this page type" | All 7 dimensions apply to all page types. The THRESHOLDS differ by type (Type A vs Type B), but no dimension is skipped. |

---

## 7-DIMENSION EVIDENCE REQUIREMENT

For each dimension, what constitutes valid evidence:

| Dimension | Valid Evidence | Invalid Evidence |
|-----------|---------------|-----------------|
| Viewport Fit | "Hero section contains: 48px headline (12 words), 80px hero image, 44px CTA button, 16px subhead (25 words). Total above-fold height estimate: 420px. iPhone SE viewport: 667px. CTA visible at ~320px from top = above fold." | "CTA is above the fold." |
| Content Density | "Section 5 (Benefits/Features): 4 paragraphs, ~320 words, zero visual breaks. At 375px width with 16px body font, this renders as approximately 28 lines of continuous text — a scroll trap." | "Some sections are dense." |
| CTA Accessibility | "Sticky ATC bar: not specified in assembled page. CTA buttons: 3 instances — hero (position 1), after proof (position 5), pre-close (position 8). Touch target size: not specified. Spacing from other tappable elements: not specified." | "CTAs are present." |
| Media Optimization | "11 images in assembled page. Format specified: 0/11 (no WebP directive). Lazy loading specified: 0/11. Hero image: dimensions not specified. Estimated image weight at 300KB each (unoptimized): 3,300KB = 3.3MB images alone." | "Images need optimization." |
| Page Speed | "Content inventory: 9 sections, 11 images (unoptimized), 1 video embed, 2 third-party scripts (analytics + chat). Estimated weight: 200KB base + 450KB sections + 3,300KB images + 500KB video + 200KB scripts = 4,650KB. At 1.5MB/s mobile: 3.1s + 0.5s overhead = 3.6s. EXCEEDS 2s target (Type B)." | "Page might be slow." |
| Typography | "Body copy font size specified: 14px (FAIL — below 16px minimum, triggers iOS auto-zoom). Line height: 1.3x (FAIL — below 1.4x minimum). Headline: 28px (PASS)." | "Fonts look readable." |
| Navigation | "Page has 13 sections. No anchor links specified. No back-to-top element. After Section 7 (midpoint), user has scrolled ~5 screen heights with no navigation aid. Section 9 to Section 10 transition has no visual connector — potential dead-end." | "Navigation is clear." |

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|-------------|-----------|----------|------------|
| Desktop bias | Audit mentions "desktop," "1440px," "wide screen" as primary evaluation frame, or fails to specify mobile viewport widths | Re-audit all dimensions starting from 375px viewport. State mobile viewport widths explicitly in every finding. | If desktop bias persists after re-audit, flag in execution log as SYSTEMATIC DESKTOP BIAS |
| Generic mobile advice | Any fix recommendation under 25 words or uses "mobile-friendly," "optimize," "improve" without element-specific details | Rewrite fix with: exact element, exact issue, exact solution, expected impact | If unable to make specific, flag as INSUFFICIENT PAGE DATA and note which upstream skill's output lacks mobile specs |
| Type A/B conflation | Type B criteria applied to Type A page or vice versa (e.g., requiring sticky ATC on Type A, or permitting missing sticky bar on Type B) | Re-read brief-load.md. Re-score affected dimensions with correct type thresholds. | HALT if page type is genuinely ambiguous — escalate to human for type confirmation |
| Missing speed estimation | No speed-estimation.md file, or file exists but contains no content inventory count or load time calculation | Run the full speed estimation: count sections, images, videos, scripts. Calculate weight. Estimate load time. | Never skip speed estimation. An estimate is always better than no estimate. |
| Score without evidence | Any dimension scored without citing specific elements or measurements from the assembled page | Add specific evidence for every score. If evidence cannot be found, the dimension scores lower (absence of specs IS a finding). | Evidence absence = finding: "assembled page does not specify [X], which means mobile implementation will default to unoptimized behavior" |
| Dimension skipping | Fewer than 7 dimensions scored in final output | Score remaining dimensions. Do not proceed to Layer 3 until all 7 scored. | If context window is limited, split the audit across the 5 Layer 2 files (each covers specific dimensions) |
| Impact fabrication | Any impact percentage without a conversion-data-reference.md citation | Add source citation or change to "significant impact expected (no specific benchmark available for this element)" | Never fabricate statistics. The reference file has specific data for speed (-7% per second), mobile responsiveness (+25.2%), reading level (+56%), and more. Use them. |

---

## THREE-FILE OUTPUT REQUIREMENT

LP-16 is NOT complete until all three exist:

```
[ ] mobile-audit.json — EXISTS
[ ] mobile-audit.json — Has: mobile_readiness_score, verdict, all 7 dimensions scored, priority_fixes, speed_inventory
[ ] mobile-audit.json — Every score < 7.0 has: evidence, fix, expected_impact
[ ] mobile-audit.json — Mobile Readiness Score matches weighted average calculation
[ ] MOBILE-AUDIT-SUMMARY.md — EXISTS
[ ] MOBILE-AUDIT-SUMMARY.md — Contains: verdict, score by dimension, speed estimate, top 3 priority fixes, full fix list
[ ] execution-log.md — EXISTS
[ ] execution-log.md — Shows all microskills executed with spec files read
[ ] execution-log.md — Shows all checkpoint files created

IF ANY CHECKBOX UNCHECKED -> LP-16 IS NOT COMPLETE
```

---

## SKILL-SPECIFIC MC-CHECK (Run at Every Layer Entry)

```yaml
LP-16-MC-CHECK:
  trigger: "[layer_entry | gate | output]"
  current_layer: "[0 | 1 | 2 | 3 | 4]"

  # Critical checks
  assembled_page_loaded: "[Y/N]"
  page_brief_loaded: "[Y/N]"
  page_type_confirmed: "[type_a | type_b | hybrid]"
  benchmark_data_loaded: "[Y/N]"

  # Degradation detection
  evaluating_from_desktop_perspective: "[Y/N]"
  using_generic_mobile_advice: "[Y/N]"
  applying_wrong_type_thresholds: "[Y/N]"
  skipping_speed_estimation: "[Y/N]"
  skipping_dimensions: "[Y/N]"
  scoring_without_evidence: "[Y/N]"
  fabricating_impact_data: "[Y/N]"
  ignoring_thumb_zone: "[Y/N]"

  IF any degradation_detection = Y: STOP — execute the skipped step
  result: "[PROCEED | PAUSE | HALT]"
```
