# LP-03: Above-Fold Architecture — Anti-Degradation File

> **Version:** 1.0
> **Skill:** LP-03-above-fold-architecture
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-03 has five specific failure modes:

1. **Awareness Stage Mismatch:** AI selects headline type without checking awareness stage from LP-00/LP-01. A T1 (Direct Benefit) headline for Stage 1 (Unaware) cold traffic destroys conversion. Headline type MUST map to awareness stage.

2. **Generic Trust Signals:** AI writes "100% Satisfaction Guaranteed" or "High Quality" as trust signals. Every trust signal must be SPECIFIC — named publication, exact statistic, specific certification. Generic trust is invisible to visitors.

3. **Type A/B Conflation:** AI applies Type A above-fold patterns to a Type B page (or vice versa). Type B requires price + ATC + rating strip above fold. Type A requires headline + hook + story entry. Treating them as identical produces a hybrid that converts neither audience.

4. **Copy Direction Without Specificity:** AI writes "compelling headline about the product's benefits" as a direction. Directions must specify headline TYPE (T1-T7), emotional appeal, and specific claim territory. Vague directions produce vague copy in LP-07.

5. **Skipping the 8-Second Test:** AI produces the blueprint without simulating a first-time visitor. The 8-second test (What is this? Who is it for? Why should I care?) is the entire validation mechanism for above-fold architecture.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `input-verification.md` | Layer 1 |
| After Layer 0 | `specimen-load.md` | Layer 1 |
| After Layer 0 | `pattern-library.md` | Layer 1 |
| After Layer 1 | `traffic-analysis.md` | Layer 2 |
| After Layer 1 | `awareness-map.md` | Layer 2 |
| After Layer 1 | `pattern-selection.md` | Layer 2 |
| After Layer 2 | `headline-type.md` | Layer 3 |
| After Layer 2 | `cta-direction.md` | Layer 3 |
| After Layer 3 | `eight-second-test.md` | Layer 4 |
| After Layer 3 | `above-fold-audit.md` (score >= 7.0) | Layer 4 |
| After Layer 3 | `anti-slop-check.md` | Layer 4 |
| Output | `above-fold-blueprint.json` | LP-04, LP-07 |
| Output | `ABOVE-FOLD-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF ANY REQUIRED FILE DOES NOT EXIST -> THE LAYER IS NOT COMPLETE.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Above-fold audit score | >= 7.0/8 | HALT -- revise until met |
| 8-second test | All 3 questions answered | HALT -- redesign above-fold |
| CTA language variants | >= 3 emotional appeals | HALT -- generate more variants |
| Trust signals | >= 1 specific signal above fold | HALT -- add specific trust signal |
| Anti-slop check | 0 forbidden words in copy directions | HALT -- remove all instances |
| Headline type | Must map to awareness stage | HALT -- re-select type |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "T1 Direct Benefit works for any audience" | T1 requires Solution-Aware+ audience. Cold traffic needs T2/T4/T5/T6. |
| "The product name is the hero" | Type A hero = headline. Type B hero = product image. Neither is the product name alone. |
| "Satisfaction Guaranteed is a trust signal" | Generic. Must be specific: "365-Day Money-Back" or "GMP Certified" or "4.8 stars from 2,847 reviews." |
| "I'll let LP-07 figure out the CTA" | LP-03 must provide CTA direction with 3+ emotional appeal variants. LP-07 writes final copy. |
| "The blueprint is good enough without the 8-second test" | The 8-second test IS the validation. No test = no confidence the above-fold works. |
| "Price display isn't needed above fold for Type B" | Type B REQUIRES price above fold. It's what drives ATC decisions. |
| "I'll describe the hero image as 'product photo'" | Must specify: context, emotion, subject, setting. "Product photo" is not a creative brief. |

---

## HEADLINE TYPE -> AWARENESS STAGE VALIDATION

Before writing `headline-type.md`, verify this mapping:

```yaml
HEADLINE-AWARENESS-CHECK:
  awareness_stage: "[from page-brief.json]"
  headline_type_selected: "[T1-T7]"

  VALID_COMBINATIONS:
    Stage_1_Unaware: [T2, T4, T5, T6]
    Stage_2_Problem_Aware: [T2, T3, T4, T5, T6]
    Stage_3_Solution_Aware: [T1, T2, T3, T6, T7]
    Stage_4_Product_Aware: [T1, T5, T7]
    Stage_5_Most_Aware: [T1, T7]

  selected_type_valid_for_stage: "[Y/N]"
  IF N: HALT -- re-select headline type that matches awareness stage
```

---

## TYPE A vs TYPE B ABOVE-FOLD VERIFICATION

```yaml
TYPE-VERIFICATION-CHECK:
  page_type: "[type_a | type_b | hybrid]"

  IF type_a:
    headline_direction_present: "[Y/N]"
    deck_copy_direction_present: "[Y/N]"
    hero_image_brief_present: "[Y/N]"
    lead_hook_direction_present: "[Y/N]"
    price_above_fold: "[MUST BE N for Type A]"
    rating_strip_above_fold: "[OPTIONAL]"

  IF type_b:
    product_title_direction_present: "[Y/N]"
    price_display_architecture_present: "[Y/N]"
    rating_strip_present: "[Y/N -- MUST BE Y]"
    atc_button_direction_present: "[Y/N -- MUST BE Y]"
    trust_badge_selection_present: "[Y/N -- MUST BE Y]"
    short_description_direction_present: "[Y/N]"

  IF hybrid:
    type_b_above_fold_complete: "[Y/N]"
    type_a_below_fold_hook_direction_present: "[Y/N]"

  all_required_elements_present: "[Y/N]"
  IF N: HALT -- complete missing elements
```

---

## TRUST SIGNAL SPECIFICITY CHECK

Before writing `trust-architecture.md`, every trust signal must pass:

```yaml
TRUST-SPECIFICITY-CHECK:
  signal_1:
    text: "[exact trust signal text]"
    is_specific: "[Y/N -- 'Satisfaction Guaranteed' = N, '365-Day Money-Back Guarantee' = Y]"
    type: "[clinical | authority | media | certification | volume | guarantee | security]"
  signal_2:
    [same format]
  signal_3:
    [same format]

  all_signals_specific: "[Y/N]"
  IF N: HALT -- replace generic signals with specific ones
```

---

## THREE-FILE OUTPUT REQUIREMENT

LP-03 is NOT complete until all three exist:

```
[ ] above-fold-blueprint.json -- EXISTS
[ ] above-fold-blueprint.json -- Has: headline_type, deck_direction, hero_image_brief, trust_signals, cta_variants (3+), audit_score (>= 7.0)
[ ] above-fold-blueprint.json -- Type B includes: price_display, rating_strip, atc_direction, trust_badges
[ ] ABOVE-FOLD-SUMMARY.md -- EXISTS
[ ] ABOVE-FOLD-SUMMARY.md -- Contains: page type, headline type + rationale, trust signal selection, CTA variants, audit score
[ ] execution-log.md -- EXISTS
[ ] execution-log.md -- Shows all microskills executed with spec files read
[ ] execution-log.md -- Shows 8-second test results and audit score

IF ANY CHECKBOX UNCHECKED -> LP-03 IS NOT COMPLETE
```

---

## SKILL-SPECIFIC MC-CHECK (Run at Every Layer Entry)

```yaml
LP-03-MC-CHECK:
  trigger: "[layer_entry | gate | output]"
  current_layer: "[0 | 1 | 2 | 3 | 4]"

  # Critical checks
  page_brief_loaded: "[Y/N]"
  page_type_confirmed: "[type_a | type_b | hybrid]"
  awareness_stage_loaded: "[1-5]"
  specimens_loaded: "[Y/N]"

  # Rushing detection
  selecting_headline_type_without_awareness_stage: "[Y/N]"
  using_generic_trust_signals: "[Y/N]"
  treating_type_a_as_type_b: "[Y/N]"
  skipping_8_second_test: "[Y/N]"
  writing_vague_copy_directions: "[Y/N]"

  IF any rushing_detection = Y: STOP -- execute the skipped step
  result: "[PROCEED | PAUSE | HALT]"
```

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|-------------|-----------|----------|------------|
| Awareness stage mismatch | Headline type invalid for awareness stage per mapping table | Re-select headline type from valid set | HALT if no valid type fits -- escalate to human for awareness stage re-evaluation |
| Generic trust signals | Trust signal text matches forbidden generic list | Replace with specific alternatives from proof inventory | If no specific trust data available, flag as PROOF GAP |
| Type A/B conflation | Type B page missing price/ATC/rating above fold, or Type A showing price above fold | Apply correct type-specific elements | HALT -- re-read page-brief.json page_type |
| Vague copy directions | Direction contains "compelling" / "powerful" / "engaging" without specifics | Rewrite with specific claim territory, headline type, emotional appeal | If unable to make specific, LP-01 data may be insufficient -- request human input |
| 8-second test failure | Any of 3 questions unanswered after simulated first visit | Redesign above-fold to address unanswered questions | If all 3 fail, above-fold concept is fundamentally broken -- restart Layer 2 |
