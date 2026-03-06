# LP-04: Section Sequence Planner — Anti-Degradation File

> **Version:** 1.0
> **Skill:** LP-04-section-sequence
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-04 has five specific failure modes:

1. **Template Shortcutting:** AI generates a generic "headline, benefits, testimonials, CTA" sequence from pattern-matching rather than loading the actual Type A/B template and checking mandatory sections.

2. **Vague Density Plans:** AI writes "add proof here" or "include images" without specifying counts, types, and requirements. Downstream skills receive zero actionable guidance.

3. **Logic Test Skipping:** AI assembles a plausible-looking sequence without running the 4 logic tests. Price appears before proof. CTAs appear before trust signals. These are conversion killers.

4. **Dead Weight Blind Spot:** AI includes conventional sections (About Us, Quality Promise, Our Story) that have no conversion function, bloating the page and diluting focus.

5. **Pacing Default:** AI applies generic pacing regardless of awareness stage. Cold-traffic unaware audience gets the same sequence as warm product-aware traffic. Both underperform.

---

## MANDATORY CHECKPOINT FILES

Before proceeding to the next layer, these files MUST exist:

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `brief-verified.md` | Layer 1 |
| After Layer 0 | `above-fold-loaded.md` | Layer 1 |
| After Layer 0 | `template-loaded.md` | Layer 1 |
| After Layer 1 | `mandatory-check.md` | Layer 2 |
| After Layer 1 | `optional-decisions.md` | Layer 2 |
| After Layer 2 | `word-count-plan.md` | Layer 3 |
| After Layer 2 | `proof-density-plan.md` | Layer 3 |
| After Layer 2 | `visual-density-plan.md` | Layer 3 |
| After Layer 2 | `cta-placement-plan.md` | Layer 3 |
| After Layer 3 | `logic-validation.md` | Layer 4 |
| After Layer 3 | `sequence-audit.md` | Layer 4 |
| Output | `section-sequence.json` | All downstream skills |
| Output | `SECTION-SEQUENCE-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF ANY REQUIRED FILE DOES NOT EXIST → THE LAYER IS NOT COMPLETE.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Mandatory sections present | 100% of mandatory sections for page type | HALT — add missing sections |
| 4-test sequence logic | All 4 tests PASS | HALT — fix sequence |
| Sequence audit score | ≥7.0/10 | HALT — revise sequence |
| Dead weight sections | 0 | HALT — remove or justify |
| CTA placements | ≥3 mapped sections | HALT — add placements |
| Word count targets | Every section has a specific target number | HALT — specify target |
| Proof density specs | Every section has type + count (not "add proof") | HALT — specify |
| Visual density specs | Every section has image type + count | HALT — specify |
| Awareness-stage pacing | Applied and documented | HALT — apply pacing |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "The sequence looks logical without running the tests" | 4 logic tests must run explicitly. Visual inspection is insufficient. |
| "I'll specify image counts in the writing phase" | Density plans are made HERE. Writing skills consume them as specs. |
| "This section adds context" | Context without persuasion function = dead weight. Remove it. |
| "The testimonials section covers all proof needs" | Proof density must be specified per section. One proof section is not enough. |
| "Price location is obvious" | Test 1 (value before price) must be explicitly run and documented as PASS. |
| "The pacing looks fine for this audience" | Awareness-stage pacing adjustment must be documented in `pacing-adjustment.md`. |
| "Guarantee is implicit in the offer section" | Guarantee block is a MANDATORY section. It must appear explicitly in the sequence. |
| "Word count ranges are sufficient" | Every section requires a specific target number within the range. |

---

## TEMPLATE INTEGRITY CHECK

Before writing `mandatory-check.md`:

```yaml
TEMPLATE-MC-CHECK:
  page_type_confirmed_from_brief: "[type_a | type_b | hybrid]"
  template_loaded_matches_page_type: "[Y/N]"

  # Type A mandatory section checklist
  type_a_sections_present:
    above_fold: "[Y/N | N/A]"
    lead: "[Y/N | N/A]"
    root_cause_narrative: "[Y/N | N/A]"
    mechanism_narrative: "[Y/N | N/A]"
    proof_block_at_least_2: "[Y/N | N/A]"
    product_introduction: "[Y/N | N/A]"
    pricing_block: "[Y/N | N/A]"
    guarantee_block: "[Y/N | N/A]"
    faq: "[Y/N | N/A]"
    close: "[Y/N | N/A]"
    ps_section: "[Y/N | N/A]"

  # Type B mandatory section checklist
  type_b_sections_present:
    above_fold: "[Y/N | N/A]"
    key_benefits: "[Y/N | N/A]"
    trust_bar: "[Y/N | N/A]"
    how_it_works: "[Y/N | N/A]"
    review_cascade: "[Y/N | N/A]"
    faq: "[Y/N | N/A]"
    guarantee_block: "[Y/N | N/A]"
    sticky_atc_mobile: "[Y/N | N/A]"

  any_mandatory_missing: "[Y/N]"
  IF yes: HALT — add missing mandatory sections before proceeding
```

---

## DENSITY PLAN COMPLETENESS CHECK

Before GATE_2:

```yaml
DENSITY-MC-CHECK:
  word_count_plan_has_target_for_every_section: "[Y/N]"
  proof_density_plan_has_type_AND_count_for_every_section: "[Y/N]"
  visual_density_plan_has_type_AND_count_for_every_section: "[Y/N]"
  cta_placement_plan_has_3_or_more_placements: "[Y/N]"
  pacing_adjustment_documented: "[Y/N]"

  any_section_with_vague_density: "[Y/N — if Y, list which sections]"
  any_section_missing_visual_spec: "[Y/N — if Y, list which sections]"

  IF any_section_with_vague_density = Y: HALT — specify count + type
  IF any_section_missing_visual_spec = Y: HALT — specify image type + count
  IF pacing_adjustment NOT documented: HALT — run 2.5 awareness-stage pacing
```

---

## LOGIC VALIDATION VERIFICATION

Before GATE_3, all 4 tests must show PASS in `logic-validation.md`:

```yaml
LOGIC-MC-CHECK:
  test_1_value_before_price:
    result: "[PASS | FAIL]"
    evidence: "[section numbers — e.g., 'Pricing is section 11; mechanism is section 5; proof block is section 6 — value confirmed before price']"

  test_2_trust_before_ask:
    result: "[PASS | FAIL]"
    evidence: "[which trust element appears before which CTA]"

  test_3_education_before_mechanism:
    result: "[PASS | FAIL — Type A only]"
    evidence: "[lead section number vs mechanism section number]"

  test_4_guarantee_proximate:
    result: "[PASS | FAIL]"
    evidence: "[guarantee section number vs pricing section number, difference = X]"

  all_four_pass: "[Y/N]"
  IF any FAIL: HALT — fix sequence until all PASS
```

---

## DEAD WEIGHT AUDIT REQUIREMENT

`dead-weight-check.md` must explicitly list:
- Every section reviewed
- The unique persuasion function it serves
- PASS (unique function) or FAIL (dead weight — remove)

**Minimum format for each section:**
```
Section [N]: [Section Name]
Persuasion function: [1 sentence — what this section UNIQUELY does to move visitor toward purchase]
Dead weight: [Y/N]
If Y: Action: [merge with / remove / justify as mandatory]
```

---

## THREE-FILE OUTPUT REQUIREMENT

LP-04 is NOT complete until all three exist:

```
[ ] section-sequence.json — EXISTS
[ ] section-sequence.json — ALL sections have: name, persuasion_function, word_count target, proof_density (type + count), visual_density (type + count), cta_present
[ ] section-sequence.json — logic_validation block shows all 4 tests PASS
[ ] section-sequence.json — sequence_score ≥7.0
[ ] SECTION-SEQUENCE-SUMMARY.md — EXISTS
[ ] SECTION-SEQUENCE-SUMMARY.md — Contains: complete section list with functions, proof wave summary, CTA placement map, logic test results, sequence score
[ ] execution-log.md — EXISTS
[ ] execution-log.md — Shows all microskills executed and gates passed

IF ANY CHECKBOX UNCHECKED → LP-04 IS NOT COMPLETE
```

---

## SECTION-SEQUENCE-SUMMARY.MD REQUIRED SECTIONS

```markdown
# [Product Name] — Section Sequence

## Classification
- Page Type: [Type A / Type B / Hybrid]
- Total Sections: [number]
- Estimated Word Count: [target range]
- Awareness Stage Pacing Applied: [stage name]
- Sequence Score: [X.X/10]

## Complete Section List
| # | Section | Function | Words | Proof | CTAs |
|---|---------|----------|-------|-------|------|
[table row per section]

## Proof Wave Summary
- Early zone (Sections 1–X): [density description]
- Mid zone (Sections X–Y): [density description]
- Close zone (Sections Y–end): [density description]

## CTA Placement Map
- CTA 1: Section [X] — [type and emotional appeal]
- CTA 2: Section [X] — [type and emotional appeal]
- CTA 3: Section [X] — [type and emotional appeal]
- [additional placements]

## Logic Test Results
- Test 1 — Value Before Price: [PASS/FAIL]
- Test 2 — Trust Before Ask: [PASS/FAIL]
- Test 3 — Education Before Mechanism: [PASS/FAIL]
- Test 4 — Guarantee Proximate to Price: [PASS/FAIL]

## Dead Weight Removed
[List any sections removed + reason, or "None removed"]

## Awareness-Stage Pacing Applied
[Describe adjustments made for awareness stage]

## Downstream Handoff Notes
[Specific notes for Phase 3 writing skills]
```

---

## SKILL-SPECIFIC MC-CHECK (Run at Every Layer Entry)

```yaml
LP-04-MC-CHECK:
  trigger: "[layer_entry | gate | output]"
  current_layer: "[0 | 1 | 2 | 3 | 4]"

  inputs_loaded:
    page_brief_loaded: "[Y/N]"
    above_fold_blueprint_loaded: "[Y/N]"
    template_loaded: "[Y/N]"

  sequence_integrity:
    template_matches_page_type: "[Y/N]"
    all_mandatory_sections_present: "[Y/N]"
    all_density_plans_specific: "[Y/N — not vague]"
    all_4_logic_tests_run: "[Y/N]"
    dead_weight_check_run: "[Y/N]"
    pacing_adjustment_applied: "[Y/N]"

  rushing_detection:
    generating_sequence_from_pattern_match: "[Y/N]"
    writing_vague_density_plans: "[Y/N — 'add proof' is vague]"
    skipping_logic_tests: "[Y/N]"
    skipping_dead_weight_audit: "[Y/N]"

  IF any rushing_detection = Y: STOP — execute the skipped step properly
  result: "[PROCEED | PAUSE | HALT]"
```
