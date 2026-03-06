# LP-11: Offer/Pricing Section Writer — Anti-Degradation File

> **Version:** 1.0
> **Skill:** LP-11-offer-pricing
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-11 has five specific failure modes — all related to the fact that pricing copy is where mathematical precision meets persuasion, and models tend to sacrifice one for the other:

1. **Price Before Value (Type A):** AI reveals the price before the value stack and "if all it did was" framework have established perceived value. This destroys the value-to-price gap. For Type A pages, the price reveal is a COPY MOMENT that requires 500-2000 words of value establishment first. Showing the price early collapses the entire persuasion sequence.

2. **Missing Guarantee Copy:** AI writes the entire pricing section and never references the guarantee. The guarantee is a risk-reversal mechanism that belongs IN the pricing section as a brief reference (branded name + duration). Without it, the price feels final and risky. Note: LP-11 REFERENCES the guarantee — it does not write the full guarantee block (that comes from LP-06 architecture).

3. **Generic Savings Language:** AI uses vague savings claims like "incredible value" or "massive savings" instead of mathematically specific calculations. Every savings claim must be verifiable: "Save 32%" must mean the math actually produces 32%, not 31.7% rounded up to sound better. Generic savings language triggers the same distrust as AI telltales.

4. **Bundle Confusion:** AI writes bundle/tier pricing that requires more than 5 seconds to parse. Type B pricing must be scannable — a reader glancing at the pricing module must instantly understand: (a) how many tiers exist, (b) which is the best deal, (c) what they save. If the pricing copy requires careful reading, it has failed.

5. **Value Stack Inflation:** AI assigns absurdly high perceived values to value stack components (Type A), destroying credibility. A 3-page PDF checklist valued at "$997" makes the reader distrust the entire value stack. Values must be individually believable — a reader should think "yeah, that could be worth that" for each component.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `packages-loaded.md` | Layer 1 |
| After Layer 0 | `offer-architecture-loaded.md` | Layer 1 |
| After Layer 0 | `specimens-loaded.md` | Layer 1 |
| After Layer 1 | `pricing-display-confirmed.md` | Layer 2 |
| After Layer 1 | `value-stack-plan.md` | Layer 2.2 + 2.5 |
| After Layer 1 | `bonus-strategy.md` | Layer 2.3 |
| After Layer 2 | `pricing-copy.md` | Layer 3 |
| After Layer 2 | `value-stack-copy.md` (Type A) | Layer 3 |
| After Layer 2 | `bonus-copy.md` | Layer 3 |
| After Layer 2 | `savings-callouts.md` | Layer 3 |
| After Layer 2 | `if-all-it-did-copy.md` (Type A) | Layer 3 |
| After Layer 3 | `offer-copy-validation.md` — shows all math PASS | Layer 4 |
| After Layer 3 | `price-value-audit.md` — shows score ≥7.5 | Layer 4 |
| Output | `pricing-section-package.json` | All downstream |
| Output | `PRICING-SECTION-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF any Layer 2 output file does not exist for its page type -> that Layer 2 microskill was not executed. HALT.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Value-to-price ratio (Type A) | ≥3x | HALT — value stack is too thin. Add components or increase value anchors (within believable range) |
| "If all it did was" benefits | ≥3 distinct benefits (Type A) | HALT — generate additional benefits |
| Math accuracy | 100% — zero errors | HALT — recalculate every savings claim |
| Savings percentage precision | Within 1% of actual calculation | HALT — rounding up by >1% is forbidden |
| Bundle tier clarity (Type B) | Parseable in ≤5 seconds | HALT — simplify and restructure |
| Pricing section audit score | ≥7.5/10 | HALT — revise until met |
| AI telltales | 0 in all copy | HALT — remove every instance |
| One-offer check | Single conversion goal | HALT — remove any competing offer copy |
| Guarantee reference | Present in pricing section | HALT — add branded guarantee reference |
| Bonus descriptions | Benefit-first | HALT — rewrite any feature-first descriptions |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "The price is low enough that value stacking isn't necessary" | Value stacking is not about the absolute price. A $27 product still benefits from perceived value >$100. The value-to-price gap drives conversion at ANY price point. |
| "The savings percentage rounds to the same number" | 31.7% is not 32%. If you claim 32%, the math must produce 32% or higher. Rounding up by >1% is deceptive. |
| "The value anchor is aspirational — it represents what the outcome is worth" | Value anchors must represent what the COMPONENT is worth, not what the buyer's life change is worth. "$10,000 value" on a PDF is aspirational fraud, not anchoring. |
| "I'll skip the 'if all it did was' framework because the value stack already establishes enough value" | The "if all it did was" framework serves a different function than the value stack. Value stack = what you GET. "If all it did was" = what it DOES FOR YOU. Both are required for Type A. |
| "The guarantee is implied — the reader already knows it exists" | The guarantee reference must be EXPLICIT in the pricing section copy. "Implied" guarantees reduce conversion by 15-20%. A single sentence with the branded name and duration is sufficient. |
| "Bundle pricing is complex — the reader will figure it out" | If the reader has to "figure it out," you've already lost them. 5-second parsability is not a suggestion. It is the threshold. |
| "I'll write the full guarantee copy here since it's adjacent to pricing" | LP-11 writes a guarantee REFERENCE (branded name + duration in 1-2 sentences). The full guarantee block is designed by LP-06 and may be expanded by a separate skill. Overwriting LP-06's guarantee architecture is a boundary violation. |
| "This comparison anchor is standard for the industry" | Unless you can name the specific competitor and verify the price, the comparison anchor is fabricated. "Similar programs cost $997" is only valid if you can name the program and confirm the price. |

---

## MATH VERIFICATION PROTOCOL

Every savings claim in the pricing section must be verified using this protocol:

```yaml
MATH-VERIFICATION:
  claim_1:
    claim_text: "[exact text of savings claim]"
    original_price: "[number]"
    offer_price: "[number]"
    calculated_savings_amount: "[original - offer]"
    calculated_savings_percentage: "[((original - offer) / original) × 100]"
    claimed_savings_percentage: "[what the copy says]"
    difference: "[calculated - claimed]"
    pass: "[Y/N — must be within 1% AND never inflated]"

  claim_2:
    [same format for every savings claim]

  per_day_calculation:
    total_price: "[number]"
    timeframe_days: "[number]"
    calculated_per_day: "[total / days]"
    claimed_per_day: "[what the copy says]"
    pass: "[Y/N — must be accurate to the penny]"

  bundle_savings:
    single_unit_price: "[number]"
    bundle_units: "[number]"
    bundle_total: "[number]"
    bundle_per_unit: "[bundle_total / bundle_units]"
    calculated_savings_per_unit: "[single - bundle_per_unit]"
    calculated_savings_percentage: "[((single - bundle_per_unit) / single) × 100]"
    claimed_savings_percentage: "[what the copy says]"
    pass: "[Y/N]"

  all_claims_verified: "[Y/N]"
  IF any pass = N: HALT — correct the math before proceeding
```

---

## VALUE STACK BELIEVABILITY CHECK (TYPE A)

Before presenting value stack copy, verify each component's value anchor:

```yaml
VALUE-STACK-BELIEVABILITY:
  component_1:
    name: "[component name]"
    claimed_value: "$[amount]"
    what_it_is: "[brief description of the deliverable]"
    comparable_market_price: "[what similar things actually sell for, if known]"
    believable: "[Y/N]"
    rationale: "[why a skeptical reader would or wouldn't believe this value]"

  component_2:
    [same format]

  total_claimed_value: "$[sum]"
  actual_price: "$[amount]"
  ratio: "[claimed / actual]x"
  ratio_in_range: "[Y/N — 3x-10x is credible. >10x triggers skepticism.]"

  any_component_unbelievable: "[Y/N]"
  IF Y: HALT — reduce value anchor for flagged components to believable range
```

---

## TYPE A vs TYPE B VERIFICATION CHECK

Before beginning Layer 2, verify the page type is correct and the right microskills are planned:

```yaml
TYPE-VERIFICATION:
  page_type: "[type_a | type_b | hybrid]"
  pricing_display_strategy: "[value-first | price-visible]"

  type_a_microskills:
    2.1_pricing_section_writer: "[execute | skip]"
    2.2_value_stack_writer: "[execute | skip]"
    2.3_bonus_description_writer: "[execute | skip]"
    2.4_savings_callout_writer: "[execute | skip]"
    2.5_if_all_it_did_writer: "[execute | skip]"

  consistency_check:
    type_a_requires: "2.1 + 2.2 + 2.3 + 2.4 + 2.5 — all execute"
    type_b_requires: "2.1 + 2.3 + 2.4 — execute. 2.2 condensed. 2.5 skip."
    hybrid_requires: "All execute — 2.2 and 2.5 for below-fold value section"

  IF page_type = type_a AND any of [2.1, 2.2, 2.3, 2.4, 2.5] = skip: HALT
  IF page_type = type_b AND 2.5 = execute: FLAG — "if all it did was" not used for Type B
  IF page_type = type_b AND 2.2 = execute (full version): FLAG — Type B uses condensed 2.2
```

---

## THREE-FILE OUTPUT REQUIREMENT

LP-11 is NOT complete until all three exist:

```
[ ] pricing-section-package.json — EXISTS
[ ] pricing-section-package.json — Contains: all pricing copy, value stack (Type A), bonus descriptions, savings callouts, "if all it did was" (Type A), pricing tiers (Type B)
[ ] pricing-section-package.json — price-value audit score field shows ≥7.5
[ ] pricing-section-package.json — All savings math verified (math_verification_pass: true)
[ ] PRICING-SECTION-SUMMARY.md — EXISTS
[ ] PRICING-SECTION-SUMMARY.md — Contains: value-to-price ratio, savings claims with calculations, bonus list, audit score, downstream handoffs
[ ] execution-log.md — EXISTS
[ ] execution-log.md — Shows which microskills were executed vs skipped (with page type justification for skips)

IF ANY CHECKBOX UNCHECKED -> LP-11 IS NOT COMPLETE
```

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|-------------|-----------|----------|------------|
| **Price before value (Type A)** | Price revealed in first 500 words of pricing section; value stack absent above price | HALT generation. Restructure: value stack -> "if all it did was" -> price reveal | If architecture mismatch with LP-06: flag for human review |
| **Math error in savings** | Math verification protocol produces any `pass: N` | HALT. Recalculate. Rewrite the specific claim. Re-verify | If source data from LP-06 contains math errors: flag upstream |
| **Unbelievable value anchor** | Value stack believability check produces `believable: N` for any component | Reduce value anchor to believable range. Rewrite component description to support the revised value | If total value drops below 3x price: flag for human review of offer structure |
| **Bundle confusion** | Pricing tier copy fails 5-second parsability check (validated in 3.1) | Simplify tier layout. Reduce to 2-3 tiers max. Add "Best Value" / "Most Popular" labels | If product has >4 tiers: flag to LP-06 for tier consolidation |
| **Missing guarantee reference** | Pricing copy validation finds no guarantee mention in pricing section | Add single-sentence guarantee reference using branded name from LP-06 | If LP-06 has no branded guarantee: HALT and flag upstream |
| **AI telltales found** | Anti-slop scan detects forbidden words in pricing copy | Revise every instance with specific, concrete language. Re-scan | If same telltale appears 3+ times after revision: model is struggling — reduce scope, re-prompt |
| **"If all it did was" overlap** | Two or more benefits in the framework address the same outcome | Rewrite one benefit to address a different outcome entirely | If fewer than 3 distinct benefits exist: flag — product may not support the framework |
| **One-offer violation** | Pricing section copy contains CTAs for different products or competing price structures | Remove competing offer copy. Clarify single conversion goal | If LP-06 architecture contains multiple offers: HALT — escalate to LP-06 for re-architecture |
| **Bonus feature-first** | Bonus description opens with "Includes..." or "Contains..." or "Features..." | Rewrite with benefit-first opening: "What this does for you..." → "Never worry about X again..." | If bonus has no clear benefit: consider removing it from the section |
| **Type mismatch** | Type A microskills executed for Type B page or vice versa | HALT. Re-check page type from LP-00. Re-plan Layer 2 execution | If page type classification is ambiguous: escalate to LP-00 |

---

## SKILL-SPECIFIC MC-CHECK (Run Before Every Major Execution)

```yaml
LP-11-MC-CHECK:
  trigger: "[before_generation | before_validation | before_output]"

  before_generation:
    specimens_loaded: "[Y/N]"
    upstream_packages_loaded: "[Y/N]"
    offer_architecture_loaded: "[Y/N]"
    pricing_display_confirmed: "[Y/N]"
    value_stack_planned: "[Y/N — or N/A]"
    bonus_strategy_set: "[Y/N]"
    page_type_confirmed: "[type_a | type_b | hybrid]"
    type_verification_run: "[Y/N]"

  before_validation:
    all_layer_2_outputs_exist: "[Y/N]"
    math_verification_run: "[Y/N]"
    value_stack_believability_checked: "[Y/N — or N/A for Type B]"

  before_output:
    math_verification_pass: "[Y/N]"
    anti_slop_pass: "[Y/N]"
    audit_score: "[X.X — must be ≥7.5]"
    one_offer_check: "[Y/N]"
    guarantee_referenced: "[Y/N]"
    three_files_exist: "[Y/N]"

  rushing_detection:
    price_before_value_type_a: "[Y/N]"
    skipping_specimen_load: "[Y/N]"
    fabricating_comparison_anchors: "[Y/N]"
    math_not_verified: "[Y/N]"
    skipping_if_all_it_did_type_a: "[Y/N]"
    writing_full_guarantee_copy: "[Y/N]"

  IF any rushing = Y: STOP — execute skipped step properly
  result: "[PROCEED | PAUSE | HALT]"
```
