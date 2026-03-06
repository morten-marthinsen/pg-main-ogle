# LP-18: A/B Test Plan — Master Agent

> **Version:** 1.0
> **Skill:** LP-18-ab-test-plan
> **Position:** Phase 4 — Optimization (runs after LP-17 Conversion Audit)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** `conversion-audit.json` (LP-17), `assembled-page-package.json` (LP-15), `mobile-audit.json` (LP-16, if available), `page-brief.json` (LP-00), conversion-data-reference.md, cross-page-pattern-analysis.md
> **Output:** `ab-test-plan.json` + `AB-TEST-PLAN-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Generate 5-10 specific, implementable A/B test hypotheses for an assembled landing page. Each hypothesis is ranked by expected conversion lift, sized for statistical significance, and tied to evidence from LP-17's conversion audit, LP-16's mobile audit, conversion-data-reference.md benchmarks, and cross-page-pattern-analysis.md specimen patterns.

**This is the final skill in the Landing Page Engine.** Every test hypothesis must be specific enough that a developer or CRO specialist can implement it without asking clarifying questions. Vague tests ("try a different headline") are the primary failure mode — they waste traffic, time, and money.

**Success Criteria:**
- 5-10 test hypotheses, each following the full Test Hypothesis Schema
- Every hypothesis specifies: exact control state, exact variant, expected lift with source, sample size estimate, implementation difficulty
- Priority ranking sorts tests by (expected lift x ease of implementation / traffic required)
- Conflicting tests (same element modified) are flagged — cannot run simultaneously
- Sample sizes calculated using the standard formula (95% confidence, 80% power)
- Zero vague hypotheses — every test is implementable as stated
- Low-traffic page awareness: if page gets <500 visitors/month, recommend sequential testing and prioritize the top 2-3 tests only

---

## IDENTITY

**This skill IS:**
- A test planning engine that converts audit failures and optimization opportunities into specific, ranked A/B test hypotheses
- A statistical sizing tool that estimates required sample sizes for each test
- A conflict detector that prevents running incompatible tests simultaneously
- An evidence-based planner — every hypothesis traces back to audit data, benchmark data, or specimen patterns

**This skill is NOT:**
- A test execution tool — it plans tests but does not run them
- A copy rewriter — it specifies what to test, not how to write the variant (the variant description is specific enough to brief a writer, but does not contain finished copy)
- A statistics engine — it estimates sample sizes using a standard formula, not a custom statistical model
- An audit skill — it consumes LP-17's audit output, it does not re-audit the page

**Upstream:** LP-17 (Conversion Audit) provides `conversion-audit.json` with scored points, priority-ranked failures, and optimization recommendations. LP-16 (Mobile/Speed Audit) provides mobile-specific test targets. LP-15 (Page Assembly) provides the assembled page for control state extraction.
**Downstream:** `ab-test-plan.json` feeds to the implementation team (developer, CRO specialist, or marketing team). `AB-TEST-PLAN-SUMMARY.md` feeds to the human reviewer.

---

## STATE MACHINE

```
IDLE -> TRIGGERED
  |
LAYER_0: Input Loading
  -> 0.1: Load assembled page (LP-15 output — extracts control states)
  -> 0.2: Load audit results (LP-17 conversion audit + LP-16 mobile audit — identifies test targets)
  -> 0.3: Load benchmarks and specimen patterns (conversion-data-reference.md + cross-page-pattern-analysis.md)
  | [GATE_0: Assembled page loaded AND audit results loaded?]
LAYER_1: Test Planning
  -> 1.1: Identify test opportunities from audit failures, competitive gaps, and high-impact areas
  -> 1.2: Prioritize opportunities by expected lift, ease of implementation, and traffic requirements
  | [GATE_1: 5-10 test opportunities identified and ranked?]
LAYER_2: Hypothesis Generation (the core creative layer)
  -> 2.1: Generate headline test hypotheses
  -> 2.2: Generate CTA test hypotheses
  -> 2.3: Generate social proof test hypotheses
  -> 2.4: Generate offer/pricing test hypotheses
  -> 2.5: Generate layout/structure test hypotheses
  | [GATE_2: Every hypothesis has: control, variant, expected lift, reasoning? No vague hypotheses?]
LAYER_3: Validation & Sizing
  -> 3.1: Validate each hypothesis (testable? realistic? specific enough?)
  -> 3.2: Calculate sample sizes for each test
  | [GATE_3: All hypotheses validated? All sample sizes calculated? Conflicts flagged?]
LAYER_4: Package Assembly
  -> 4.1: Compile ab-test-plan.json
  -> 4.2: Write AB-TEST-PLAN-SUMMARY.md (human-readable)
  -> 4.3: Write execution-log.md
  |
COMPLETE
```

---

## MODEL ASSIGNMENT TABLE

| Layer | Microskill | Model | Rationale |
|-------|-----------|-------|-----------|
| 0 | 0.1 Assembled Page Loader | haiku | File loading, no judgment |
| 0 | 0.2 Audit Results Loader | haiku | File loading, no judgment |
| 0 | 0.3 Benchmark Loader | haiku | Data extraction, no judgment |
| 1 | 1.1 Test Opportunity Identifier | sonnet | Pattern matching, moderate judgment |
| 1 | 1.2 Test Prioritizer | sonnet | Multi-factor ranking, moderate judgment |
| 2 | 2.1 Headline Test Generator | opus | Creative hypothesis generation — must propose specific, non-obvious headline alternatives grounded in benchmark data |
| 2 | 2.2 CTA Test Generator | opus | Creative hypothesis generation — CTA copy, placement, and format alternatives |
| 2 | 2.3 Proof Test Generator | opus | Creative hypothesis generation — proof architecture, placement, density alternatives |
| 2 | 2.4 Offer Test Generator | opus | Creative hypothesis generation — pricing psychology, guarantee, urgency alternatives |
| 2 | 2.5 Layout Test Generator | opus | Creative hypothesis generation — structural and mobile layout alternatives |
| 3 | 3.1 Hypothesis Validator | sonnet | Logical validation, moderate judgment |
| 3 | 3.2 Sample Size Calculator | sonnet | Statistical calculation, moderate judgment |
| 4 | 4.1 Test Plan Compiler | haiku | JSON assembly |
| 4 | 4.2 Summary Writer | sonnet | Structured writing for human consumption |
| 4 | 4.3 Log Writer | haiku | Execution logging |

**POSITIONAL REINFORCEMENT — READ THIS AT EVERY LAYER ENTRY:**
> You are LP-18, the A/B Test Plan. You generate SPECIFIC, IMPLEMENTABLE test hypotheses ranked by expected lift. Every hypothesis must have an exact control state, an exact variant description, an expected lift with source, and a sample size estimate. You do NOT write finished copy. You do NOT re-audit the page. You do NOT run tests. Gates are PASS or FAIL — nothing else.

---

## LAYER DETAILS

### Layer 0: Input Loading

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 0.1 | Assembled Page Loader | `skills/layer-0/0.1-assembled-page-loader.md` | Load the assembled page from LP-15 to extract current (control) states for every testable element | `assembled-page-package.json` path | `assembled-page-load.md` | haiku |
| 0.2 | Audit Results Loader | `skills/layer-0/0.2-audit-results-loader.md` | Load LP-17 conversion audit results and LP-16 mobile audit results to identify prioritized test targets | `conversion-audit.json`, `mobile-audit.json` (optional) | `audit-results-load.md` | haiku |
| 0.3 | Benchmark Loader | `skills/layer-0/0.3-benchmark-loader.md` | Load conversion benchmarks, specimen patterns, and A/B test priority data | `conversion-data-reference.md`, `cross-page-pattern-analysis.md` | `benchmark-load.md` | haiku |

**GATE_0:** Assembled page loaded AND at least one audit result (LP-17) loaded. Benchmark data loaded. If assembled page is missing -> HALT with message: "LP-18 requires assembled-page-package.json (LP-15) to extract control states." If LP-17 audit is missing -> HALT with message: "LP-18 requires conversion-audit.json (LP-17) to identify test targets."

### Layer 1: Test Planning

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 1.1 | Test Opportunity Identifier | `skills/layer-1/1.1-test-opportunity-identifier.md` | Identify all testable elements from audit failures, competitive gaps, specimen patterns, and standard high-impact areas | `audit-results-load.md`, `benchmark-load.md`, `assembled-page-load.md` | `test-opportunities.md` | sonnet |
| 1.2 | Test Prioritizer | `skills/layer-1/1.2-test-prioritizer.md` | Rank opportunities by expected lift, ease of implementation, and traffic requirements | `test-opportunities.md`, `benchmark-load.md` | `prioritized-opportunities.md` | sonnet |

**GATE_1:** `test-opportunities.md` lists 5-15 raw opportunities. `prioritized-opportunities.md` ranks the top 5-10 by priority score. If fewer than 5 opportunities identified -> review: is the page genuinely well-optimized, or did 1.1 miss opportunities? Re-scan before proceeding with <5.

### Layer 2: Hypothesis Generation

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 2.1 | Headline Test Generator | `skills/layer-2/2.1-headline-test-generator.md` | Generate headline A/B test hypotheses with specific control/variant pairs | `prioritized-opportunities.md`, `assembled-page-load.md`, `benchmark-load.md` | `headline-tests.md` | opus |
| 2.2 | CTA Test Generator | `skills/layer-2/2.2-cta-test-generator.md` | Generate CTA A/B test hypotheses covering copy, placement, and format | `prioritized-opportunities.md`, `assembled-page-load.md`, `benchmark-load.md` | `cta-tests.md` | opus |
| 2.3 | Proof Test Generator | `skills/layer-2/2.3-proof-test-generator.md` | Generate social proof A/B test hypotheses covering placement, density, and format | `prioritized-opportunities.md`, `assembled-page-load.md`, `benchmark-load.md` | `proof-tests.md` | opus |
| 2.4 | Offer Test Generator | `skills/layer-2/2.4-offer-test-generator.md` | Generate offer/pricing A/B test hypotheses covering anchoring, guarantee, urgency | `prioritized-opportunities.md`, `assembled-page-load.md`, `benchmark-load.md` | `offer-tests.md` | opus |
| 2.5 | Layout Test Generator | `skills/layer-2/2.5-layout-test-generator.md` | Generate layout/structure A/B test hypotheses covering section order, mobile layout, above-fold composition | `prioritized-opportunities.md`, `assembled-page-load.md`, `benchmark-load.md` | `layout-tests.md` | opus |

**GATE_2:** All generated test files exist. Every hypothesis in every file has: (1) specific control state with exact current text/element, (2) specific variant with exact proposed change, (3) expected lift with source, (4) reasoning. If ANY hypothesis uses vague language ("test a different X") -> REJECT and rewrite with specifics. Layer 2 generators only produce hypotheses for categories that appear in the prioritized opportunities list — not every generator produces output for every page.

### Layer 3: Validation & Sizing

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 3.1 | Hypothesis Validator | `skills/layer-3/3.1-hypothesis-validator.md` | Validate each hypothesis: testable, realistic, specific, no conflicts, implementable | All Layer 2 test files | `validated-hypotheses.md` | sonnet |
| 3.2 | Sample Size Calculator | `skills/layer-3/3.2-sample-size-calculator.md` | Calculate required sample size for each test using the standard formula | `validated-hypotheses.md`, `benchmark-load.md` | `sample-sizes.md` | sonnet |

**GATE_3:** `validated-hypotheses.md` has 5-10 validated tests. Every rejected hypothesis has a rejection reason. `sample-sizes.md` has a sample size for every validated test. All conflicts between tests are flagged. Tests requiring >10K visitors are marked as HIGH_TRAFFIC.

### Layer 4: Package Assembly

| ID | Name | Spec Path | Purpose | Input | Output | Effort |
|----|------|-----------|---------|-------|--------|--------|
| 4.1 | Test Plan Compiler | `skills/layer-4/4.1-test-plan-compiler.md` | Compile all validated, sized hypotheses into ab-test-plan.json | `validated-hypotheses.md`, `sample-sizes.md` | `ab-test-plan.json` | haiku |
| 4.2 | Summary Writer | `skills/layer-4/4.2-summary-writer.md` | Write human-readable AB-TEST-PLAN-SUMMARY.md | `ab-test-plan.json` | `AB-TEST-PLAN-SUMMARY.md` | sonnet |
| 4.3 | Log Writer | `skills/layer-4/4.3-log-writer.md` | Write execution-log.md documenting all microskills executed | All outputs | `execution-log.md` | haiku |

---

## GATE CONDITIONS DETAIL

### GATE_0 (Inputs Present)
**PASS:** `assembled-page-package.json` loaded AND `conversion-audit.json` loaded. Benchmark data loaded.
**FAIL:** Assembled page or LP-17 audit missing. Action: HALT with message identifying which upstream skill must be run.

### GATE_1 (Opportunities Identified)
**PASS:** 5-15 raw test opportunities identified. Top 5-10 ranked by priority score.
**FAIL:** Fewer than 5 opportunities. Action: Re-scan page against all high-impact test categories from conversion-data-reference.md. If page is genuinely well-optimized (LP-17 score 18+), proceed with fewer tests but document the reasoning.

### GATE_2 (Hypotheses Generated)
**PASS:** Every generated hypothesis has: exact control state, exact variant description, expected lift with source, reasoning that connects the change to a conversion mechanism. Zero vague hypotheses.
**FAIL:** Any hypothesis missing required elements, or any hypothesis that uses vague language. Action: Return to the specific generator (2.1-2.5) and rewrite with specifics.

### GATE_3 (Validated & Sized)
**PASS:** 5-10 validated hypotheses. Sample sizes calculated for all. Conflicts flagged. High-traffic tests marked.
**FAIL:** Validation failures not resolved, or sample sizes missing. Action: Re-run Layer 3.

---

## TEST HYPOTHESIS SCHEMA

Every test hypothesis MUST follow this schema:

```yaml
test_id: "T-[N]"
category: "[headline | cta | proof | offer | layout | mobile]"
hypothesis: "If we change [X] from [control] to [variant], conversion rate will [increase/decrease] by [estimated %] because [reasoning]."
control:
  description: "[Current state]"
  specific_text_or_element: "[exact current copy/element]"
variant:
  description: "[Proposed change]"
  specific_text_or_element: "[exact new copy/element or specific description of the change]"
expected_lift: "[X-Y%]"
lift_source: "[conversion-data-reference.md citation | cross-page-pattern-analysis.md citation | estimated]"
implementation_difficulty: "[low | medium | high]"
traffic_required: "[estimated visitors to reach significance]"
confidence_level: "95%"
minimum_detectable_effect: "[X%]"
priority_rank: "[1-10]"
conflicts_with: "[test IDs that cannot run simultaneously, or 'none']"
```

---

## SAMPLE SIZE FORMULA

For every test, calculate:

```
n = (Z_alpha/2 + Z_beta)^2 * p(1-p) / delta^2
```

Where:
- Z_alpha/2 = 1.96 (95% confidence)
- Z_beta = 0.84 (80% power)
- p = baseline conversion rate (from page-brief.json or industry benchmark from conversion-data-reference.md)
- delta = minimum detectable effect (MDE) — the smallest lift worth detecting

(Z_alpha/2 + Z_beta)^2 = (1.96 + 0.84)^2 = (2.80)^2 = 7.84

**n per variant** = 7.84 * p(1-p) / delta^2
**Total visitors needed** = 2 * n (two variants: control + test)

**Worked example:**
- Baseline CVR: 3% (p = 0.03)
- Want to detect a 20% relative lift (MDE: 0.6% absolute, delta = 0.006)
- n = 7.84 * 0.03 * 0.97 / 0.006^2 = 7.84 * 0.0291 / 0.000036 = 6,335 per variant
- Total: 12,670 visitors

**Traffic context:**
- Flag any test requiring >10,000 total visitors as HIGH_TRAFFIC
- For pages with <500 visitors/month, recommend running tests sequentially (top 2-3 only)
- Include estimated test duration: total visitors needed / daily traffic estimate

---

## OUTPUT SCHEMA

### ab-test-plan.json

```json
{
  "schema_version": "1.0",
  "created": "[ISO timestamp]",
  "project_name": "[from page-brief.json]",
  "page_type": "[type_a | type_b | hybrid]",
  "page_url": "[if available from brief]",

  "baseline_conversion_rate": "[X% — from brief or industry benchmark]",
  "baseline_source": "[page-brief.json | conversion-data-reference.md industry benchmark]",
  "estimated_monthly_traffic": "[if available, else 'unknown']",

  "audit_score": "[X/20 from LP-17]",
  "audit_verdict": "[from LP-17]",

  "test_count": "[5-10]",
  "tests": [
    {
      "test_id": "T-1",
      "category": "[headline | cta | proof | offer | layout | mobile]",
      "hypothesis": "[full hypothesis statement]",
      "control": {
        "description": "[current state description]",
        "specific_text_or_element": "[exact current copy/element]"
      },
      "variant": {
        "description": "[proposed change description]",
        "specific_text_or_element": "[exact new copy/element or specific change description]"
      },
      "expected_lift": "[X-Y%]",
      "lift_source": "[source citation]",
      "implementation_difficulty": "[low | medium | high]",
      "sample_size": {
        "per_variant": "[number]",
        "total": "[number]",
        "minimum_detectable_effect": "[X%]",
        "confidence_level": "95%",
        "power": "80%",
        "estimated_duration": "[X days/weeks at estimated traffic]"
      },
      "priority_rank": "[1-10]",
      "conflicts_with": ["[test IDs]"],
      "notes": "[any additional context — e.g., 'run after T-1 completes if T-1 modifies above-fold']"
    }
  ],

  "test_sequence_recommendation": {
    "phase_1": ["[test IDs to run first — highest priority, no conflicts]"],
    "phase_2": ["[test IDs to run after phase 1 — may depend on phase 1 results]"],
    "phase_3": ["[remaining tests]"],
    "rationale": "[why this sequence]"
  },

  "metadata": {
    "assembled_page_source": "[path]",
    "conversion_audit_source": "[path to conversion-audit.json]",
    "mobile_audit_source": "[path to mobile-audit.json or 'not available']",
    "benchmark_data_source": "conversion-data-reference.md v1.0",
    "specimen_data_source": "cross-page-pattern-analysis.md v1.0"
  }
}
```

### AB-TEST-PLAN-SUMMARY.md

```markdown
# A/B Test Plan — [Project Name]

## Page Overview
- **Page type:** [Type A / Type B / Hybrid]
- **Audit score:** [X/20] — [VERDICT]
- **Baseline conversion rate:** [X%]
- **Estimated monthly traffic:** [X visitors or unknown]

## Test Plan Summary
- **Total tests planned:** [N]
- **Test categories:** [list unique categories]
- **Estimated total test duration:** [X weeks/months for all phases]

## Priority-Ranked Tests

### T-1: [Test Title] (Priority 1)
- **Category:** [category]
- **Hypothesis:** [full statement]
- **Control:** [current state]
- **Variant:** [proposed change]
- **Expected lift:** [X-Y%] ([source])
- **Difficulty:** [low/medium/high]
- **Sample size:** [total visitors] (~[X days/weeks])

[Repeat for all tests...]

## Testing Sequence
### Phase 1: [test IDs] — Run First
[Rationale]

### Phase 2: [test IDs] — Run After Phase 1
[Rationale]

### Phase 3: [test IDs] — Run Last
[Rationale]

## Conflict Map
| Test | Conflicts With | Reason |
|------|---------------|--------|
[Any conflicting test pairs]

## Low-Traffic Advisory (if applicable)
[If page gets <500 visitors/month, specific guidance on sequential testing]
```

---

## FORBIDDEN BEHAVIORS

1. Generating vague hypotheses — "Test a different headline" is not a hypothesis. It must specify WHAT the current headline is, WHAT the alternative is, WHY it should work, and WHAT metric to measure.
2. Predicting unrealistic lift — claiming +200% from a button color change. All lift estimates must cite conversion-data-reference.md or cross-page-pattern-analysis.md, or be labeled "estimated" with reasoning.
3. Proposing untestable tests — tests that require a full page rebuild instead of a variant swap. Each test must be implementable as a split-test variant.
4. Omitting the control definition — every test needs the exact current state documented. Cannot test "new headline" without documenting the current headline verbatim.
5. Ignoring sample size requirements — proposing 10 tests for a page with 500 visitors/month. Must prioritize by traffic requirements and recommend sequential testing for low-traffic pages.
6. Generating duplicate tests — two tests that modify the same element (both change the headline). Must flag as conflicting — run sequentially, not simultaneously.
7. Ignoring the audit — generating headline tests when LP-17 scored the headline as PASS and flagged proof as the primary weakness. Test opportunities should map to audit failures and priority ranking.
8. Producing ab-test-plan.json without AB-TEST-PLAN-SUMMARY.md and execution-log.md — all three files are required.
9. Fabricating benchmark data — inventing conversion lift statistics without a source. If no benchmark exists, state "estimated" and explain the reasoning.
10. Generating tests unrelated to conversion — testing font choices, background gradients, or other design tweaks that have no documented conversion impact.

---

## REVISION ROUTING

If LP-17 audit score is below 15 (SIGNIFICANT_GAPS or STRUCTURAL_REBUILD), LP-18 should NOT run. The page needs fixes before testing. However, if LP-18 is triggered on a page with a score of 15-17 (MINOR_OPTIMIZATION), the test plan should prioritize hypotheses that address the specific FAIL points from the audit.

| Audit Failure Area | Test Category |
|-------------------|---------------|
| Points 01-04 (Above-Fold) | headline, layout |
| Points 05-08 (Copy Quality) | headline, layout |
| Points 09-12 (Social Proof) | proof |
| Points 13-16 (Offer/Conversion) | offer, cta |
| Points 17-20 (Mobile/Speed) | mobile, layout |
