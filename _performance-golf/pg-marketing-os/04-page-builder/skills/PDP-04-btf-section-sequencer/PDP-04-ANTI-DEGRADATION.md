# PDP-04: BTF Section Sequencer — Anti-Degradation File

> **Version:** 1.0
> **Skill:** PDP-04-btf-section-sequencer
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

PDP-04 has six specific failure modes:

1. **LP-04 Template Bleed:** AI loads LP-04 Type A sequential-story templates instead of PDP's modular, hunt-and-peck section taxonomy. PDP sections are self-contained modules, NOT chapters in a linear argument. Applying LP-04 logic to a PDP produces a page that assumes linear reading — PDP visitors do not read linearly.

2. **Module Dependency Creep:** AI writes section descriptions that reference other sections ("as discussed in the ingredients section..."). Each PDP section must function as a standalone persuasion unit. A visitor arriving at FAQ from a Google snippet should get full value without reading anything above.

3. **Vague Density Plans:** AI writes "add proof here" or "include images" without specifying counts, types, and requirements. Downstream skills receive zero actionable guidance. PDP pages are image-heavy — vague visual plans produce text-heavy PDPs that underconvert.

4. **Sticky ATC Omission:** AI designs the BTF sequence without defining the sticky ATC trigger point. Every PDP must have a sticky bar plan — this is the primary mobile conversion mechanism.

5. **Dead Weight Blind Spot:** AI includes conventional ecomm sections ("Our Story," "Brand Values," "Sustainability Statement") that have no conversion function. PDP visitors are in purchase mode — every section must directly serve the buy decision.

6. **FAQ Misplacement:** AI places FAQ in the middle of the sequence. FAQ is a closer — it handles final objections for visitors who have consumed other sections and are almost ready to buy. Placing it mid-sequence wastes its friction-removal power.

---

## MANDATORY CHECKPOINT FILES

Before proceeding to the next layer, these files MUST exist:

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `brief-verified.md` | Layer 1 |
| After Layer 0 | `above-fold-loaded.md` | Layer 1 |
| After Layer 0 | `pdp-reference-loaded.md` | Layer 1 |
| After Layer 1 | `taxonomy-selection.md` | Layer 2 |
| After Layer 1 | `section-ordering.md` | Layer 2 |
| After Layer 1 | `mandatory-check.md` | Layer 2 |
| After Layer 1 | `optional-decisions.md` | Layer 2 |
| After Layer 2 | `word-count-plan.md` | Layer 3 |
| After Layer 2 | `proof-density-plan.md` | Layer 3 |
| After Layer 2 | `visual-density-plan.md` | Layer 3 |
| After Layer 2 | `cta-placement-plan.md` | Layer 3 |
| After Layer 2 | `sticky-atc-plan.md` | Layer 3 |
| After Layer 3 | `sequence-validation.md` | Layer 4 |
| After Layer 3 | `dead-weight-check.md` | Layer 4 |
| After Layer 3 | `anti-slop-check.md` | Layer 4 |
| Output | `pdp-section-sequence.json` | All downstream skills |
| Output | `PDP-SECTION-SEQUENCE-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF ANY REQUIRED FILE DOES NOT EXIST -> THE LAYER IS NOT COMPLETE.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Page type confirmed | type_b or hybrid | REDIRECT to LP-04 |
| Mandatory BTF sections present | 100% of mandatory sections for product type | HALT — add missing sections |
| 4-test PDP sequence logic | All 4 tests PASS | HALT — fix sequence |
| Sequence audit score | >= 7.0/10 | HALT — revise sequence |
| Dead weight sections | 0 | HALT — remove or justify |
| Mid-page CTA placements | >= 2 (not counting sticky bar) | HALT — add placements |
| Sticky ATC trigger point | Defined with scroll-depth rationale | HALT — define trigger |
| Word count targets | Every section has a specific target number | HALT — specify target |
| Proof density specs | Every section has type + count (not "add proof") | HALT — specify |
| Visual density specs | Every section has image type + count + layout | HALT — specify |
| Module independence | Every section confirmed standalone | HALT — remove inter-section dependencies |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "The sequence looks logical without running the tests" | 4 PDP logic tests must run explicitly. Visual inspection is insufficient. |
| "I'll specify image counts in the writing phase" | Density plans are made HERE. Writing skills consume them as specs. |
| "This section adds brand context" | Brand context without conversion function = dead weight on a PDP. Remove it. |
| "The reviews section covers all proof needs" | Proof density must be specified per section. One proof section is not enough. |
| "Sticky bar is standard — no need to define trigger" | Trigger scroll depth and content MUST be documented in `sticky-atc-plan.md`. |
| "FAQ can go anywhere" | FAQ is a closer. It handles final objections. Position in last 3 BTF sections. |
| "Sections reference each other for flow" | PDP sections are MODULES, not chapters. Each must stand alone. Remove cross-references. |
| "Word count ranges are sufficient" | Every section requires a specific target number within the range. |
| "This PDP can use the LP-04 template" | PDP has its own 16-section taxonomy. LP-04 templates are for Type A long-form pages. |
| "The visitor will read top to bottom" | PDP visitors hunt and peck. Sections must work in any order. |

---

## TAXONOMY INTEGRITY CHECK

Before writing `mandatory-check.md`:

```yaml
TAXONOMY-MC-CHECK:
  page_type_confirmed: "[type_b | hybrid]"
  taxonomy_source: "NLS 16-Section PDP BTF Taxonomy from PDP-04-AGENT.md"

  # Mandatory section checklist (product-type dependent)
  mandatory_sections_present:
    product_highlights: "[Y/N]"
    what_to_expect: "[Y/N]"
    the_solution: "[Y/N]"
    why_it_works: "[Y/N]"
    how_to_use: "[Y/N]"
    faq: "[Y/N]"

  # Conditional mandatory (depends on proof inventory)
  conditional_mandatory:
    ugc_video_carousel: "[Y/N/N-A — N-A if < 3 UGC videos]"
    the_expert: "[Y/N/N-A — N-A if no expert endorser]"
    whats_in_it: "[Y/N/N-A — N-A if not supplement/formulated]"
    comparison_chart: "[Y/N/N-A — N-A if no competitors]"
    reviews_ratings: "[Y/N/N-A — N-A if < 25 reviews]"

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
  visual_density_plan_has_type_AND_count_AND_layout_for_every_section: "[Y/N]"
  cta_placement_plan_has_2_or_more_mid_page_placements: "[Y/N]"
  sticky_atc_trigger_defined: "[Y/N]"

  any_section_with_vague_density: "[Y/N — if Y, list which sections]"
  any_section_missing_visual_spec: "[Y/N — if Y, list which sections]"
  any_section_with_cross_references: "[Y/N — if Y, list which sections]"

  IF any_section_with_vague_density = Y: HALT — specify count + type
  IF any_section_missing_visual_spec = Y: HALT — specify image type + count + layout
  IF sticky_atc_trigger NOT defined: HALT — run 2.5 sticky ATC trigger planner
  IF any_section_with_cross_references = Y: HALT — remove inter-section dependencies
```

---

## LOGIC VALIDATION VERIFICATION

Before GATE_3, all 4 PDP tests must show PASS in `sequence-validation.md`:

```yaml
LOGIC-MC-CHECK:
  test_1_scannable_first:
    result: "[PASS | FAIL]"
    evidence: "[sections 1-3 listed — must be scannable/social proof sections]"

  test_2_authority_before_education:
    result: "[PASS | FAIL]"
    evidence: "[which authority section appears before which education section]"

  test_3_value_before_comparison:
    result: "[PASS | FAIL]"
    evidence: "[which value sections appear before comparison chart — need 2+ of ingredients/timeline/why_it_works]"

  test_4_faq_last:
    result: "[PASS | FAIL]"
    evidence: "[FAQ position X of Y total — must be in last 3]"

  all_four_pass: "[Y/N]"
  IF any FAIL: HALT — fix sequence until all PASS
```

---

## MODULE INDEPENDENCE AUDIT

Every section in `dead-weight-check.md` must also confirm module independence:

```
Section [N]: [Section Name]
Persuasion function: [1 sentence — what this section UNIQUELY does]
Dead weight: [Y/N]
Module independence: [Y/N — can a visitor arriving at ONLY this section understand and be persuaded?]
Cross-references found: [list any "as mentioned above" or inter-section dependencies, or "none"]
If dead weight or not independent: Action: [remove / rewrite to standalone / merge with X]
```

---

## THREE-FILE OUTPUT REQUIREMENT

PDP-04 is NOT complete until all three exist:

```
[ ] pdp-section-sequence.json — EXISTS
[ ] pdp-section-sequence.json — ALL sections have: name, persuasion_function, word_count target, proof_density (type + count), visual_density (type + count + layout), cta_present, module_independence
[ ] pdp-section-sequence.json — pdp_section_taxonomy block shows inclusion/exclusion rationale for all 16 sections
[ ] pdp-section-sequence.json — sticky_atc_trigger_point fully defined
[ ] pdp-section-sequence.json — logic_validation block shows all 4 tests PASS
[ ] pdp-section-sequence.json — sequence_score >= 7.0
[ ] PDP-SECTION-SEQUENCE-SUMMARY.md — EXISTS
[ ] PDP-SECTION-SEQUENCE-SUMMARY.md — Contains: complete section list with functions, proof wave summary, CTA placement map, sticky ATC spec, logic test results, sequence score
[ ] execution-log.md — EXISTS
[ ] execution-log.md — Shows all microskills executed and gates passed

IF ANY CHECKBOX UNCHECKED -> PDP-04 IS NOT COMPLETE
```

---

## PDP-SECTION-SEQUENCE-SUMMARY.MD REQUIRED SECTIONS

```markdown
# [Product Name] — PDP BTF Section Sequence

## Classification
- Page Type: Type B (PDP)
- Total BTF Sections: [number]
- Estimated BTF Word Count: [target range]
- Sequence Score: [X.X/10]

## Taxonomy Decisions
| Section | Included? | Rationale |
|---------|-----------|-----------|
[row per 16 taxonomy sections]

## Complete BTF Section List
| # | Section | Function | Words | Proof | Visual | CTA | Standalone? |
|---|---------|----------|-------|-------|--------|-----|-------------|
[table row per included section]

## Sticky ATC Bar
- Mobile trigger: [scroll depth]
- Desktop trigger: [scroll depth or disabled]
- Bar content: [what appears]
- Disappear condition: [when hidden]

## Proof Wave Summary
- Early zone (Sections 1-3): [density description]
- Mid zone (Sections 4-8): [density description]
- Late zone (Sections 9+): [density description]

## CTA Placement Map
- Sticky ATC: [trigger + content]
- Mid-page CTA 1: After Section [X] — [type and rationale]
- Mid-page CTA 2: After Section [X] — [type and rationale]
- [additional placements]

## Logic Test Results
- Test 1 — Scannable Sections First: [PASS/FAIL]
- Test 2 — Authority Before Education: [PASS/FAIL]
- Test 3 — Value Before Comparison: [PASS/FAIL]
- Test 4 — FAQ Last: [PASS/FAIL]

## Dead Weight Removed
[List any sections removed + reason, or "None removed"]

## Module Independence Confirmed
[Confirmation that all sections function standalone]

## Downstream Handoff Notes
[Specific notes for downstream writing skills]
```

---

## SKILL-SPECIFIC MC-CHECK (Run at Every Layer Entry)

```yaml
PDP-04-MC-CHECK:
  trigger: "[layer_entry | gate | output]"
  current_layer: "[0 | 1 | 2 | 3 | 4]"

  inputs_loaded:
    page_brief_loaded: "[Y/N]"
    pdp_above_fold_blueprint_loaded: "[Y/N]"
    pdp_reference_loaded: "[Y/N]"
    page_type_is_type_b_or_hybrid: "[Y/N]"

  sequence_integrity:
    using_pdp_taxonomy_not_lp04: "[Y/N]"
    all_mandatory_sections_present: "[Y/N]"
    all_sections_module_independent: "[Y/N]"
    all_density_plans_specific: "[Y/N — not vague]"
    all_4_pdp_logic_tests_run: "[Y/N]"
    dead_weight_check_run: "[Y/N]"
    sticky_atc_defined: "[Y/N]"

  rushing_detection:
    using_lp04_templates_for_pdp: "[Y/N]"
    generating_sequence_from_pattern_match: "[Y/N]"
    writing_vague_density_plans: "[Y/N]"
    skipping_logic_tests: "[Y/N]"
    skipping_dead_weight_audit: "[Y/N]"
    sections_have_cross_references: "[Y/N]"
    treating_pdp_as_linear_story: "[Y/N]"

  IF any rushing_detection = Y: STOP — execute the skipped step properly
  result: "[PROCEED | PAUSE | HALT]"
```

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|-------------|-----------|----------|------------|
| LP-04 template bleed | Section taxonomy matches Type A structure; "lead" or "story" sections present | HALT — reload NLS 16-section PDP taxonomy | Rebuild Layer 1 from scratch using PDP taxonomy |
| Module dependency creep | Sections contain "as mentioned above" or "see section X" language | HALT — rewrite section descriptions as standalone | Flag all dependent sections for rewrite |
| Vague density plans | Any section has "add proof" or "include images" without count + type | HALT — specify count, type, and layout | Do not proceed past GATE_2 until every section has specific specs |
| Sticky ATC omission | `sticky-atc-plan.md` does not exist after Layer 2 | HALT — run 2.5 sticky ATC trigger planner | Cannot proceed to Layer 3 |
| Dead weight sections | Section has no unique persuasion function or duplicates another section | Remove section or merge with existing section | If section is "mandatory" per taxonomy, justify OR escalate to human |
| FAQ misplacement | FAQ position < total_btf_sections - 2 | Move FAQ to last 3 positions | Rerun section ordering (1.2) with FAQ lock |
