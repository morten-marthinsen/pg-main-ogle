# LP-18: A/B Test Plan — Anti-Degradation File

> **Version:** 1.0
> **Skill:** LP-18-ab-test-plan
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-18 has six specific failure modes:

1. **Vague Hypotheses:** The most common and most dangerous failure. "Test a different headline" is worthless — it tells the implementation team nothing. A hypothesis must specify: WHAT the current element is (verbatim), WHAT the alternative is (specific enough to implement), WHY the change should improve conversion (mechanism), and WHAT lift to expect (with source). If you cannot fill all four fields, the hypothesis is not ready.

2. **Unrealistic Lift Predictions:** Predicting +200% lift from changing a CTA button from blue to green. CTA color changes produce 0-15% lift in most documented cases. Headline changes can produce 5-500% variance — but only because that range is real. Every lift prediction must cite conversion-data-reference.md, cross-page-pattern-analysis.md, or be labeled "estimated" with explicit reasoning. Do NOT round up. Do NOT conflate relative and absolute lift.

3. **Untestable Tests:** Proposing a test that requires rebuilding the page from scratch. "Test a completely different page layout with video hero instead of text" is not an A/B test — it is a redesign project. Each test must be implementable as a variant within the existing page framework. The control is the current page. The variant is a modification of one element (or a small set of closely related elements).

4. **Missing Control Definition:** Every test needs a clear control. "Test a new headline" is meaningless without documenting the current headline verbatim. The control state must be extracted from the assembled page (LP-15 output). If the assembled page does not contain the element being tested, the test cannot proceed — flag as BLOCKED.

5. **Sample Size Blindness:** The most operationally destructive failure. Proposing 10 simultaneous tests for a page that gets 500 visitors per month. At that traffic level, even one test with a 20% MDE takes 3+ months to reach significance. LP-18 must calculate sample sizes for every test and recommend a testing sequence that accounts for real traffic constraints. Low-traffic pages get 2-3 sequential tests, not 10 simultaneous ones.

6. **Duplicate/Conflicting Tests:** Two tests that modify the same element (e.g., T-1 changes the headline, T-3 also changes the headline). Running both simultaneously invalidates both. Every test must declare which other tests it conflicts with. Conflicting tests must be sequenced, not parallelized.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `assembled-page-load.md` | Layer 1 |
| After Layer 0 | `audit-results-load.md` | Layer 1 |
| After Layer 0 | `benchmark-load.md` | Layer 1 |
| After Layer 1 | `test-opportunities.md` | Layer 2 |
| After Layer 1 | `prioritized-opportunities.md` | Layer 2 |
| After Layer 2 | `headline-tests.md` (if headline opportunities exist) | Layer 3 |
| After Layer 2 | `cta-tests.md` (if CTA opportunities exist) | Layer 3 |
| After Layer 2 | `proof-tests.md` (if proof opportunities exist) | Layer 3 |
| After Layer 2 | `offer-tests.md` (if offer opportunities exist) | Layer 3 |
| After Layer 2 | `layout-tests.md` (if layout opportunities exist) | Layer 3 |
| After Layer 3 | `validated-hypotheses.md` | Layer 4 |
| After Layer 3 | `sample-sizes.md` | Layer 4 |
| Output | `ab-test-plan.json` | Implementation team |
| Output | `AB-TEST-PLAN-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF ANY REQUIRED FILE DOES NOT EXIST -> THE LAYER IS NOT COMPLETE.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Total hypotheses | 5-10 validated tests | HALT if <5 (unless page scores 18+ on audit). Max 10. |
| Hypothesis specificity | Every test has exact control + exact variant | HALT — rewrite vague hypotheses |
| Lift source | Every lift estimate has a source or "estimated" label | HALT — add source citations |
| Sample size calculation | Every validated test has a calculated sample size | HALT — run calculator |
| Conflict detection | Every test declares conflicts_with field | HALT — check for element overlap |
| Three-file output | ab-test-plan.json + AB-TEST-PLAN-SUMMARY.md + execution-log.md | HALT — write missing files |
| Control state extraction | Every control state cites the assembled page | HALT — extract from assembled page |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It Is Invalid |
|----------------|-----------------|
| "Test a different headline" | Different HOW? What is the current headline? What is the alternative? What headline TYPE is being tested? Specifics or nothing. |
| "This test should produce significant lift" | Quantify it. "Significant" is not a number. Cite a source or label it "estimated" with reasoning. |
| "We could test many things on this page" | Name them. Rank them. Size them. Vague possibility lists waste traffic. |
| "The sample size is probably fine" | Calculate it. Use the formula. State the number. "Probably fine" is not statistics. |
| "These tests don't conflict" | If both tests modify the above-fold section, they conflict. If one changes the headline and the other changes the hero image, they interact. Be conservative — flag interactions. |
| "The page gets enough traffic for all 10 tests" | Show the math. At 200 visitors/day and 3% CVR, each test needs ~12,000 visitors minimum. That is 60 days per test. 10 sequential tests = 600 days = nearly 2 years. Prioritize ruthlessly. |
| "We should test everything the audit flagged" | Not simultaneously. Not all at once. Priority-rank by expected lift x ease. Run the highest-impact, lowest-difficulty tests first. |
| "The variant is obvious so I don't need to specify it" | Nothing is obvious. State the exact proposed change. A developer reading this plan should be able to implement the variant without asking a single question. |

---

## HYPOTHESIS QUALITY CHECKLIST

For each hypothesis, verify ALL of the following:

```
[ ] Control state extracted from assembled page (exact text/element)
[ ] Variant is specific enough to implement without clarification
[ ] Expected lift cites conversion-data-reference.md, cross-page-pattern-analysis.md, or is labeled "estimated"
[ ] Lift estimate is realistic for the element type (see variance ranges below)
[ ] Implementation difficulty is assessed (low = copy change, medium = layout change, high = structural change)
[ ] Sample size is calculated using the standard formula
[ ] Conflicts with other tests are identified
[ ] Hypothesis connects the change to a conversion mechanism (WHY it should work)
[ ] The test measures ONE variable (not a multivariate test disguised as A/B)

IF ANY CHECKBOX UNCHECKED -> THE HYPOTHESIS IS NOT READY
```

---

## REALISTIC LIFT RANGES BY ELEMENT TYPE

Use these ranges to sanity-check lift predictions. Predictions outside these ranges require extraordinary justification.

| Element | Typical Lift Range | Maximum Documented | Source |
|---------|-------------------|-------------------|--------|
| Headline | 5-50% | 500% (extreme outlier) | conversion-data-reference.md — "5-500% variance" |
| Hero image | 5-30% | 100%+ (type change) | conversion-data-reference.md — "high variance" |
| CTA copy (personalized) | 20-200% | +202% | conversion-data-reference.md — HubSpot |
| CTA placement | 5-20% | 50% | Industry data |
| CTA color/size | 0-15% | 30% (rare) | Industry data |
| Social proof placement | 5-25% | 50% | conversion-data-reference.md — CXL |
| Social proof density | 5-20% | 40% | Industry data |
| Price anchoring | 5-30% | 60% | conversion-data-reference.md — offer types |
| Guarantee prominence | 5-20% | 40% | conversion-data-reference.md — guarantee data |
| Page length | 10-50% | +220% (long vs short) | conversion-data-reference.md — KlientBoost |
| Reading level simplification | 10-56% | +56% | conversion-data-reference.md — VWO |
| Video addition | 20-86% | +86% | conversion-data-reference.md — VWO |
| Mobile sticky CTA | 10-30% | 50% | conversion-data-reference.md — mobile data |

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|-------------|-----------|----------|------------|
| Vague hypothesis | Any hypothesis field contains: "different," "better," "improved," "new" without specifics | Rewrite the hypothesis with exact control text, exact variant description, and conversion mechanism | If unable to make specific after 2 attempts, flag as NEEDS_HUMAN_INPUT |
| Unrealistic lift | Predicted lift exceeds the "Maximum Documented" column for that element type | Revise lift estimate downward to realistic range. Add note explaining why original estimate was too high | If source data supports the high estimate, keep it but add extraordinary justification |
| Untestable test | Test requires more than 1 element change, or requires page rebuild | Split into multiple single-variable tests, or reclassify as a redesign recommendation (not a test) | If cannot be split, remove from test plan and add to "future redesign recommendations" |
| Missing control | Control field references "the current X" without quoting the actual current state | Extract exact current state from assembled-page-load.md | If element not in assembled page, flag test as BLOCKED |
| Sample size blindness | Total visitors needed across all tests exceeds 12 months of estimated traffic | Reduce to 2-3 highest-priority tests. Move remaining to Phase 2/3 | If traffic estimate is unknown, provide sample sizes and let human decide |
| Duplicate/conflicting tests | Two or more tests modify the same page element | Flag as conflicting. Sequence them (higher priority first). Add to conflicts_with field | If both are equally high priority, note the dependency and let human decide sequence |

---

## THREE-FILE OUTPUT REQUIREMENT

LP-18 is NOT complete until all three exist:

```
[ ] ab-test-plan.json — EXISTS
[ ] ab-test-plan.json — Has: 5-10 tests, each following the full Test Hypothesis Schema
[ ] ab-test-plan.json — Every test has: control, variant, expected_lift, lift_source, sample_size, conflicts_with
[ ] ab-test-plan.json — test_sequence_recommendation populated with phased approach
[ ] AB-TEST-PLAN-SUMMARY.md — EXISTS
[ ] AB-TEST-PLAN-SUMMARY.md — Contains: page overview, all tests ranked by priority, testing sequence, conflict map
[ ] execution-log.md — EXISTS
[ ] execution-log.md — Shows all microskills executed with spec files read
[ ] execution-log.md — Shows all checkpoint files created

IF ANY CHECKBOX UNCHECKED -> LP-18 IS NOT COMPLETE
```

---

## SKILL-SPECIFIC MC-CHECK (Run at Every Layer Entry)

```yaml
LP-18-MC-CHECK:
  trigger: "[layer_entry | gate | output]"
  current_layer: "[0 | 1 | 2 | 3 | 4]"

  # Critical checks
  assembled_page_loaded: "[Y/N]"
  audit_results_loaded: "[Y/N]"
  benchmark_data_loaded: "[Y/N]"
  page_type_identified: "[type_a | type_b | hybrid]"

  # Degradation detection
  generating_vague_hypotheses: "[Y/N]"
  predicting_unrealistic_lift: "[Y/N]"
  proposing_untestable_tests: "[Y/N]"
  missing_control_definitions: "[Y/N]"
  ignoring_sample_size: "[Y/N]"
  generating_duplicate_tests: "[Y/N]"
  ignoring_audit_priorities: "[Y/N]"
  fabricating_benchmark_data: "[Y/N]"

  IF any degradation_detection = Y: STOP — execute the skipped step
  result: "[PROCEED | PAUSE | HALT]"
```
