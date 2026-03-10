# LP-17: Conversion Audit — Anti-Degradation File

> **Version:** 1.0
> **Skill:** LP-17-conversion-audit
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-17 has six specific failure modes:

1. **Score Inflation:** AI passes items that clearly fail to avoid delivering a low total score. The assembled page has a generic headline like "Unlock Your Potential" and the auditor scores Point 01 as PASS because "it communicates a benefit." No. That headline communicates nothing specific. FAIL.

2. **Vague Optimization Recommendations:** AI writes "improve the headline" or "add more social proof" as a fix. Every fix must specify WHAT to change, HOW to change it, and WHAT the expected result is. "Change headline from generic benefit statement to T4 Story-Based headline targeting Stage 2 Problem-Aware cold traffic, referencing the root cause mechanism — expected lift: +15-30% (conversion-data-reference.md, personalized headline data)."

3. **Type A/B Criteria Conflation:** AI applies Type B criteria (price above fold, rating strip required, 50+ reviews) to a Type A page, or applies Type A criteria (15+ testimonials, story-driven lead) to a Type B page. The checklist has type-specific criteria for a reason. Check the page type BEFORE scoring.

4. **Missing Evidence:** AI scores a point as PASS without quoting specific text, describing specific elements, or referencing specific sections from the assembled page. "Trust signals are present" is not evidence. "Trust signals present: 'Trustpilot 4.6/5 — 544 reviews' badge in hero section, 'GMP Certified' badge below fold" is evidence.

5. **Lift Estimation Without Data:** AI writes "this fix would increase conversions by approximately 30%" without citing a source. Every lift estimate MUST reference conversion-data-reference.md. If no relevant data exists for a specific fix, state "expected lift: significant (no specific benchmark available for this element)" — do NOT invent a number.

6. **Checklist Skipping Under Context Pressure:** When the page is long and context window is limited, the AI skips points 17-20 (Mobile/Speed) or rushes through the Social Proof audit. All 20 points must be scored. If context is limited, prioritize by reading the assembled page in structured sections rather than skipping entire categories.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `assembled-page-load.md` | Layer 1 |
| After Layer 0 | `brief-load.md` | Layer 1 |
| After Layer 0 | `benchmark-load.md` | Layer 1 |
| After Layer 0 | `specimen-reference-load.md` | Layer 1 |
| After Layer 1 | `page-type-validation.md` | Layer 2 |
| After Layer 1 | `audit-scope.md` | Layer 2 |
| After Layer 1 | `configured-checklist.md` | Layer 2 |
| After Layer 2 | `above-fold-audit.md` | Layer 3 |
| After Layer 2 | `copy-quality-audit.md` | Layer 3 |
| After Layer 2 | `social-proof-audit.md` | Layer 3 |
| After Layer 2 | `offer-conversion-audit.md` | Layer 3 |
| After Layer 2 | `mobile-speed-audit.md` | Layer 3 |
| After Layer 3 | `score-calculation.md` | Layer 4 |
| After Layer 3 | `priority-ranking.md` | Layer 4 |
| After Layer 3 | `optimization-recommendations.md` | Layer 4 |
| Output | `conversion-audit.json` | LP-18, human |
| Output | `CONVERSION-AUDIT-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF ANY REQUIRED FILE DOES NOT EXIST -> THE LAYER IS NOT COMPLETE.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Points scored | All 20 explicitly scored | HALT — score remaining points |
| FAIL evidence | Every FAIL has specific page evidence | HALT — add evidence for bare FAILs |
| FAIL fix recommendation | Every FAIL has specific fix | HALT — write specific fixes |
| FAIL expected lift | Every FAIL cites conversion-data-reference.md | HALT — add lift citations |
| Score accuracy | Total = sum of individual PASS scores | HALT — recalculate |
| Priority ranking | Sorted by (lift x ease) descending | HALT — re-sort |
| Three-file output | conversion-audit.json + CONVERSION-AUDIT-SUMMARY.md + execution-log.md | HALT — write missing files |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It Is Invalid |
|----------------|-----------------|
| "The headline is good enough for a PASS" | "Good enough" is not a criterion. Does it communicate a specific, credible promise? Yes = PASS. No = FAIL. |
| "Social proof is adequate" | Adequate against what standard? Type A needs 15+ testimonials. Type B needs 50+ reviews. Count them. |
| "The page will load fast because it uses modern tech" | Check for: unoptimized images, heavy video embeds, excessive scripts. If the assembled page spec does not address load optimization, it fails. |
| "Before/after doesn't apply to this product" | Only auto-PASS Point 12 if the product category genuinely does not warrant before/after (SaaS, info products). Supplements, weight loss, skincare, fitness = before/after required. |
| "I'll estimate the lift at around 20-30%" | From where? Cite the source. If conversion-data-reference.md does not have data for this specific element, say so. Do not fabricate. |
| "Most of the 20 points are passing so the page is fine" | The score is what it is. 14/20 = SIGNIFICANT GAPS regardless of how many passed. Do not editorialize a failing score into an optimistic narrative. |
| "This point doesn't really apply to this page type" | Then the Checklist Configurator (1.3) should have flagged it as type-inapplicable. If it is in the configured checklist, it applies. Score it. |

---

## 20-POINT EVIDENCE REQUIREMENT

For each point, what constitutes valid PASS evidence:

| Point | Valid PASS Evidence | Invalid PASS Evidence |
|-------|-------------------|-----------------------|
| 01 | Quote the headline verbatim. Name the specific promise or mechanism. | "The headline is compelling." |
| 02 | Describe the hero image: subject, setting, emotion, format. | "Hero image is present." |
| 03 | State CTA text and confirm position (above fold on desktop AND mobile). | "CTA exists." |
| 04 | List each trust signal by name with specifics (e.g., "4.6/5 Trustpilot, 544 reviews"). | "Trust signals present." |
| 05 | State the assessed reading level (grade). Quote any complex passages. | "Copy is clear." |
| 06 | State "zero telltale words found" after searching the full forbidden list. | "Copy sounds natural." |
| 07 | List all CTAs and confirm they point to the same action. | "One offer." |
| 08 | Identify the first benefit mention (section + text) and first feature mention. Confirm order. | "Benefits lead." |
| 09 | Calculate 25% of total page length. Identify first proof element position. Compare. | "Proof is early." |
| 10 | Count total proof elements. State the count and compare to threshold (Type A: 15+, Type B: 50+). | "Proof is sufficient." |
| 11 | Quote 3+ proof elements with specific numbers, results, or timeframes. | "Proof has specifics." |
| 12 | Describe before/after format used OR state why auto-PASS (category inapplicable). | "N/A." |
| 13 | Identify where value is first established (section name/number) and where price first appears. | "Value comes first." |
| 14 | Quote guarantee text. Confirm: has a branded name, has duration, has specifics. | "Guarantee exists." |
| 15 | Count all CTA instances by position (section name). Confirm 3+ placements. | "Multiple CTAs." |
| 16 | Identify anchoring technique used and quote the anchor price or calculation. | "Price is anchored." |
| 17 | List load-impacting elements. Assess against target (<2s Type B, <3s Type A). | "Page is fast." |
| 18 | Confirm sticky ATC/CTA bar specified for mobile. For Type A: auto-PASS with note if absent. | "Mobile looks good." |
| 19 | Confirm image format (WebP) and lazy loading directives. | "Images are fine." |
| 20 | Confirm CTA button size specification (>=44px). | "Buttons are big enough." |

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|-------------|-----------|----------|------------|
| Score inflation | Total score >= 18 but page has obvious issues visible in assembled page (generic headline, no trust signals, 3 testimonials) | Re-audit all 20 points with strict evidence requirements | If score was 18+ and drops below 15 on re-audit, flag as MAJOR INFLATION and note in execution log |
| Vague fix recommendations | Any fix recommendation under 20 words or uses words: "improve," "enhance," "better," "more" without specifics | Rewrite fix with: what to change, how to change it, expected result, which skill to revise | If unable to make specific, flag as INSUFFICIENT DATA and recommend human review |
| Type A/B conflation | Type B criteria applied to Type A page or vice versa | Re-read page-type-validation.md. Re-score affected points with correct criteria | HALT if page type is genuinely ambiguous — escalate to human for type confirmation |
| Missing evidence | Any PASS score without a quoted or described element from the page | Add specific evidence for every PASS score | If evidence cannot be found in assembled page, flip to FAIL |
| Lift estimation without data | Any lift percentage without a conversion-data-reference.md citation | Add source citation or change to "significant (no specific benchmark)" | Never fabricate statistics |
| Checklist skipping | Fewer than 20 points scored in final output | Score remaining points. Do not proceed to Layer 3 until all 20 scored | If context window is too limited, split audit across multiple passes |

---

## THREE-FILE OUTPUT REQUIREMENT

LP-17 is NOT complete until all three exist:

```
[ ] conversion-audit.json — EXISTS
[ ] conversion-audit.json — Has: total_score, verdict, all 20 points scored, priority_ranking, optimization_recommendations
[ ] conversion-audit.json — Every FAIL has: evidence, fix, expected_lift
[ ] conversion-audit.json — Total score matches sum of individual scores
[ ] CONVERSION-AUDIT-SUMMARY.md — EXISTS
[ ] CONVERSION-AUDIT-SUMMARY.md — Contains: verdict, score by category, top 3 priority fixes, full point-by-point table
[ ] execution-log.md — EXISTS
[ ] execution-log.md — Shows all microskills executed with spec files read
[ ] execution-log.md — Shows all checkpoint files created

IF ANY CHECKBOX UNCHECKED -> LP-17 IS NOT COMPLETE
```

---

## SKILL-SPECIFIC MC-CHECK (Run at Every Layer Entry)

```yaml
LP-17-MC-CHECK:
  trigger: "[layer_entry | gate | output]"
  current_layer: "[0 | 1 | 2 | 3 | 4]"

  # Critical checks
  assembled_page_loaded: "[Y/N]"
  page_brief_loaded: "[Y/N]"
  page_type_confirmed: "[type_a | type_b | hybrid]"
  benchmark_data_loaded: "[Y/N]"

  # Degradation detection
  scoring_without_evidence: "[Y/N]"
  using_vague_fix_recommendations: "[Y/N]"
  applying_wrong_type_criteria: "[Y/N]"
  skipping_checklist_points: "[Y/N]"
  fabricating_lift_estimates: "[Y/N]"
  inflating_scores: "[Y/N]"

  IF any degradation_detection = Y: STOP — execute the skipped step
  result: "[PROCEED | PAUSE | HALT]"
```
