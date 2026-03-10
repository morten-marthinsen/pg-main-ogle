# PDP-16: PDP Mobile + Conversion Audit — Anti-Degradation File

> **Version:** 1.0
> **Skill:** PDP-16-mobile-conversion-audit
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

PDP-16 has six specific failure modes:

1. **LP-16/LP-17 Pattern Leakage:** AI applies generic mobile audit criteria (viewport fit, content density) instead of PDP-specific Baymard criteria (carousel thumbnails, buy box chips, review histogram). LP-16 and LP-17 were designed for Type A pages. PDP-16 exists because PDP mobile UX and conversion are inseparable.

2. **Evidence-Free Scoring:** AI writes "PASS" or "FAIL" without citing specific content from the assembled page. Every single criterion must reference what was found (or not found) in LP-15 output. A score without evidence is not an audit.

3. **Section Skipping:** AI audits 5-6 of 8 sections and declares the audit complete. All 8 Baymard sections must be evaluated. Partial audits miss critical conversion killers.

4. **Baymard Stat Fabrication:** AI invents statistics ("Baymard found that 73% of users...") that are not in PDP-BEST-PRACTICES-REFERENCE.md. Only cite statistics that appear in the reference document.

5. **UNSPECIFIED = PASS Error:** AI encounters a criterion where the assembled page does not specify the behavior (e.g., no mention of back-button handling in gallery overlay) and scores it PASS. UNSPECIFIED is scored as FAIL — if it was not specified, it will not be implemented correctly.

6. **Priority Ranking Skip:** AI calculates the composite score and stops. The priority ranking (3.3) is the most actionable output — it tells the team what to fix first for maximum conversion lift. Skipping it makes the audit decorative.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `assembled-page-load.md` | Layer 1 |
| After Layer 0 | `pdp-reference-load.md` | Layer 1 |
| After Layer 0 | `benchmark-load.md` | Layer 1 |
| After Layer 1 | `pdp-audit-criteria.md` | Layer 2 |
| After Layer 1 | `weight-assignment.md` | Layer 2 |
| After Layer 2 | `image-gallery-audit.md` | Layer 3 |
| After Layer 2 | `buy-box-audit.md` | Layer 3 |
| After Layer 2 | `product-info-audit.md` | Layer 3 |
| After Layer 2 | `btf-section-audit.md` | Layer 3 |
| After Layer 2 | `social-proof-audit.md` | Layer 3 |
| After Layer 2 | `navigation-audit.md` | Layer 3 |
| After Layer 2 | `mobile-performance-audit.md` | Layer 3 |
| After Layer 2 | `conversion-flow-audit.md` | Layer 3 |
| After Layer 3 | `per-section-scores.md` | Layer 4 |
| After Layer 3 | `composite-score.md` | Layer 4 |
| After Layer 3 | `priority-ranking.md` | Layer 4 |
| Output | `pdp-audit-report.json` | LP-18 |
| Output | `PDP-AUDIT-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF ANY REQUIRED FILE DOES NOT EXIST -> THE LAYER IS NOT COMPLETE.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Audit sections evaluated | All 8 | HALT — complete missing sections |
| Per-criterion evidence | Every PASS/FAIL cites assembled page content | HALT — add evidence |
| UNSPECIFIED criteria | Scored as FAIL | HALT — do not score as PASS |
| Layer 2 output files | All 8 exist (one per section) | HALT — write missing files |
| Composite score calculated | Weighted average with all 8 sections | HALT — include all sections |
| Priority ranking produced | Every FAIL item ranked | HALT — complete ranking |
| Baymard statistics | Only from PDP-BEST-PRACTICES-REFERENCE.md | HALT — remove fabricated stats |
| Composite score for LP-18 | >= 7.0 to proceed without flag | FLAG if < 7.0 (complete audit, but flag) |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "The carousel probably uses thumbnails" | If the assembled page does not specify thumbnails, score as UNSPECIFIED -> FAIL. Assumptions are not audits. |
| "Buy box audit is 8/10, close enough" | If 2 criteria failed, those 2 criteria are conversion killers. Identify which ones and add to priority ranking. |
| "BTF sections look fine at a glance" | Each BTF section must be evaluated for scannability, module independence, and proof density. "Looks fine" is not a finding. |
| "We can skip the social proof audit — reviews are platform-handled" | The review SYSTEM design (histogram, filters, UGC position, card template) is specified in PDP-05 output. Audit what was specified. |
| "Mobile performance is a dev concern, not a copy concern" | Touch targets, font sizes, and viewport fit are specified in PDP output. If the spec says "44px touch target" for ATC, verify that spec exists. |
| "The page passed PDP-03's buy box audit, so we can skip Section 2" | PDP-03 audited the ARCHITECTURE. PDP-16 audits the ASSEMBLED PAGE after PDP-06 wrote the actual copy and LP-15 assembled it. Architecture audit != assembled page audit. |
| "LP-16 already covered mobile" | LP-16 covers generic mobile dimensions. PDP-16 covers PDP-specific Baymard criteria. They are different audits for different page types. |
| "Priority ranking is optional since the score is high" | Even at 9.0/10, there are FAIL items. Priority ranking identifies what to fix for the next 0.5 points. Marginal gains compound. |

---

## SECTION AUDIT VALIDATION

Before writing any Layer 2 audit file, verify:

```yaml
SECTION-AUDIT-CHECK:
  section_name: "[1-8]"
  criteria_count: "[number of criteria in this section]"
  each_criterion_evaluated: "[Y/N]"
  each_has_pass_or_fail: "[Y/N]"
  each_has_evidence: "[Y/N — cites specific assembled page content]"
  unspecified_scored_as_fail: "[Y/N — MUST BE Y]"
  baymard_stats_verified: "[Y/N — only stats from reference doc]"

  IF any N: HALT — complete the section audit
```

---

## COMPOSITE SCORE VALIDATION

Before writing composite-score.md, verify:

```yaml
COMPOSITE-SCORE-CHECK:
  all_8_sections_scored: "[Y/N — MUST BE Y]"
  weights_sum_to_100: "[Y/N — MUST BE Y]"
  weighted_average_calculated: "[Y/N — show math]"
  threshold_classification: "[exceptional | good | needs_revision | structural_issues]"
  flag_set_if_below_7: "[Y/N if applicable]"

  IF any N: HALT — fix calculation
```

---

## THREE-FILE OUTPUT REQUIREMENT

PDP-16 is NOT complete until all three exist:

```
[ ] pdp-audit-report.json — EXISTS
[ ] pdp-audit-report.json — Has: all 8 section scores, composite score, weight assignments
[ ] pdp-audit-report.json — Has: per-criterion PASS/FAIL with evidence for every criterion
[ ] pdp-audit-report.json — Has: priority ranking of all FAIL items
[ ] pdp-audit-report.json — Has: metadata (project name, page type, date, PDP-16 version)
[ ] PDP-AUDIT-SUMMARY.md — EXISTS
[ ] PDP-AUDIT-SUMMARY.md — Contains: composite score, per-section scores, top 5 priority fixes
[ ] PDP-AUDIT-SUMMARY.md — Contains: proceed/flag/halt recommendation
[ ] PDP-AUDIT-SUMMARY.md — Human-readable (no JSON, no code blocks for narrative sections)
[ ] execution-log.md — EXISTS
[ ] execution-log.md — Shows all 19 microskills executed with spec files read
[ ] execution-log.md — Shows composite score and recommendation

IF ANY CHECKBOX UNCHECKED -> PDP-16 IS NOT COMPLETE
```

---

## SKILL-SPECIFIC MC-CHECK (Run at Every Layer Entry)

```yaml
PDP-16-MC-CHECK:
  trigger: "[layer_entry | gate | output]"
  current_layer: "[0 | 1 | 2 | 3 | 4]"

  # Critical checks
  assembled_page_loaded: "[Y/N]"
  page_type_confirmed: "[type_b | hybrid — NOT type_a]"
  pdp_reference_loaded: "[Y/N]"
  benchmarks_loaded: "[Y/N]"

  # Rushing detection
  fewer_than_8_sections_audited: "[Y/N]"
  criteria_without_evidence: "[Y/N]"
  unspecified_scored_as_pass: "[Y/N]"
  using_lp16_criteria: "[Y/N]"
  fabricated_baymard_stats: "[Y/N]"
  skipping_priority_ranking: "[Y/N]"
  combining_section_audits: "[Y/N]"
  missing_audit_output_files: "[Y/N]"

  IF any rushing_detection = Y: STOP — execute the skipped step
  result: "[PROCEED | PAUSE | HALT]"
```

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|-------------|-----------|----------|------------|
| LP-16/LP-17 pattern leakage | Audit criteria reference viewport fit, content density, or other LP-16 dimensions instead of Baymard PDP sections | Re-read PDP-16-AGENT.md and PDP-BEST-PRACTICES-REFERENCE.md. Restart from Layer 1. | Clear context of LP-16/LP-17 patterns |
| Evidence-free scoring | Any criterion has PASS/FAIL without quoted assembled page content | Add evidence for every criterion. Re-audit if necessary. | If assembled page content is insufficient for evaluation, score as UNSPECIFIED -> FAIL |
| Section skipping | Fewer than 8 Layer 2 output files | Complete missing section audits | HALT — no partial audits |
| Baymard stat fabrication | Statistic cited that does not appear in PDP-BEST-PRACTICES-REFERENCE.md | Remove fabricated stat, replace with actual reference or remove stat citation | Non-negotiable — only cite documented statistics |
| UNSPECIFIED = PASS error | Criterion evaluated as PASS when assembled page does not mention the behavior | Change to FAIL with note "UNSPECIFIED in assembled page" | This is a systemic error — re-audit all criteria for UNSPECIFIED handling |
| Priority ranking skip | composite-score.md exists but priority-ranking.md does not | Execute 3.3 priority ranking | Non-negotiable — this is the most actionable output |
