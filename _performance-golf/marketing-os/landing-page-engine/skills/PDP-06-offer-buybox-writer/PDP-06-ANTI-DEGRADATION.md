# PDP-06: Offer/Buy Box Writer — Anti-Degradation File

> **Version:** 1.0
> **Skill:** PDP-06-offer-buybox-writer
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

PDP-06 has six specific failure modes:

1. **Creative ATC Disease:** AI writes "Get Yours Now" or "Claim Your Bottle" instead of "Add to Cart". Baymard research: standard "Add to Cart" outperforms creative labels. Users expect standard labels on PDPs. Creative CTAs belong on long-form sales pages, not PDPs.

2. **Hidden Savings Trap:** AI writes "$59.99" without showing the anchor price or savings breakdown. Every price display must show: ~~original~~ sale price (Save $X -- X% off). Savings must appear in BOTH dollar amount AND percentage. Requiring mental math costs conversions.

3. **Pre-Selected Subscription:** AI pre-selects the Subscribe & Save tile to inflate S&S uptake. Baymard: this is the #1 cause of cart abandonment complaints and chargebacks. Neither OTP nor S&S can be pre-selected. User must actively choose.

4. **Feature-Forward Description:** AI writes "Contains 500mg Ashwagandha, 200mg L-Theanine" instead of benefit-forward bullets. Features belong in the ingredients carousel slide and supplement facts. The short description bullet list must lead with what the ingredient DOES for the user.

5. **Micro-Trust Overflow:** AI writes 8-10 trust signals below ATC, creating a wall of badges. Baymard: 3-4 max. Each signal must be a specific factual statement ("Free Shipping on Orders $50+"), not marketing language ("Premium Quality You Can Trust").

6. **CTA Inconsistency:** AI writes "Add to Cart" on the main button, "Buy Now" on the sticky bar, and "Checkout" on the mini-cart. All three must use identical primary label text. Inconsistency creates subconscious friction.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `input-verification.md` | Layer 1 |
| After Layer 0 | `pdp-reference-load.md` | Layer 1 |
| After Layer 0 | `blueprint-extraction.md` | Layer 1 |
| After Layer 1 | `pricing-copy.md` | Layer 2 |
| After Layer 1 | `variant-copy.md` | Layer 2 |
| After Layer 1 | `subscription-copy.md` | Layer 2 |
| After Layer 1 | `quantity-copy.md` | Layer 2 |
| After Layer 1 | `short-description-copy.md` | Layer 2 |
| After Layer 2 | `atc-copy.md` | Layer 3 |
| After Layer 2 | `express-payment-copy.md` | Layer 3 |
| After Layer 2 | `micro-trust-copy.md` | Layer 3 |
| After Layer 2 | `sticky-atc-copy.md` | Layer 3 |
| After Layer 2 | `mini-cart-copy.md` | Layer 3 |
| After Layer 3 | `buy-box-copy-audit.md` | Layer 4 |
| After Layer 3 | `cta-consistency-check.md` | Layer 4 |
| After Layer 3 | `anti-slop-check.md` | Layer 4 |
| Output | `pdp-offer-buy-box.json` | PDP-07, LP-15, PDP-16 |
| Output | `PDP-OFFER-BUYBOX-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF ANY REQUIRED FILE DOES NOT EXIST -> THE LAYER IS NOT COMPLETE.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| ATC button label | Exactly "Add to Cart" | HALT -- replace with standard label |
| Savings display | Both % AND $ amount shown | HALT -- add missing format |
| Subscription pre-selection | Neither tile pre-selected | HALT -- remove pre-selection |
| Short description | 3-5 bullets, benefit-forward | HALT -- rewrite as benefits |
| Micro-trust signals | Exactly 3-4, factual | HALT -- add/remove to hit 3-4 |
| CTA consistency | Identical label on main, sticky, mini-cart | HALT -- align all labels |
| Anti-slop check | 0 forbidden words in any copy | HALT -- remove all instances |
| Post-ATC behavior | Slide-out mini-cart specified | HALT -- change from cart redirect |
| PDP-03 blueprint | Must exist and be loaded | HALT -- run PDP-03 first |
| All buy box components | Copy exists for every PDP-03 component | HALT -- write missing copy |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "Buy Now converts better than Add to Cart on this product" | Baymard: "Add to Cart" is the universal standard for PDPs. "Buy Now" implies immediate checkout, not cart addition. Standard label reduces cognitive load. |
| "We only need to show savings as a percentage" | Different buyers prefer different formats. Some think "25% off" while others think "$20 off." Show BOTH, always. |
| "Pre-selecting Subscribe saves the user a click" | Pre-selecting Subscribe is the #1 documented cause of subscription chargeback complaints. It's unethical and reduces LTV. Honest selection converts better long-term. |
| "The features ARE the benefits for this audience" | Never true. "500mg Ashwagandha" is a feature. "Supports calm focus without drowsiness" is the benefit of that feature. Lead with what it does, not what it is. |
| "More trust signals = more trust" | Diminishing returns after 3-4. Beyond that, it creates visual noise and pushes the ATC further down. Less is more. |
| "The sticky bar can say Buy Now since it's a different context" | Inconsistent CTAs create subconscious confusion about what button does what. If main = "Add to Cart", sticky = "Add to Cart", mini-cart = "Add to Cart". |
| "Add to Cart is boring" | Boring is the point. Standard labels require zero cognitive processing. Users tap "Add to Cart" on autopilot. That's exactly what we want. |
| "We can skip the mini-cart copy -- the platform handles it" | PDP-06 specifies copy for every user-facing element. Platform default copy is generic. Specifying mini-cart copy ensures brand voice and cross-sell messaging. |

---

## ATC LABEL VALIDATION

Before writing `atc-copy.md`, verify the label hierarchy:

```yaml
ATC-LABEL-CHECK:
  main_buy_box_label: "[must be 'Add to Cart']"
  sticky_bar_label: "[must match main_buy_box_label]"
  mini_cart_checkout_label: "[must be 'Checkout']"
  mini_cart_continue_label: "[must be 'Continue Shopping']"

  loading_state: "[must be 'Adding...']"
  success_state: "[must be 'Added!']"
  oos_state: "[must be 'Sold Out -- Notify Me']"
  disabled_state: "[must be 'Select a [variant type]']"

  all_labels_standard: "[Y/N]"
  IF N: HALT -- replace creative labels with standard ones
```

---

## SAVINGS DISPLAY VALIDATION

Before writing `pricing-copy.md`, verify savings are displayed correctly:

```yaml
SAVINGS-DISPLAY-CHECK:
  original_price_shown: "[Y/N -- struck through]"
  sale_price_shown: "[Y/N -- bold/accent]"
  savings_percentage_shown: "[Y/N]"
  savings_dollar_amount_shown: "[Y/N]"
  per_unit_price_shown: "[Y/N -- if multi-pack]"
  subscription_savings_shown: "[Y/N -- explicit inside tile]"

  both_formats_present: "[Y/N -- % AND $]"
  IF N: HALT -- add missing savings format
```

---

## SUBSCRIPTION TILE VALIDATION

Before writing `subscription-copy.md`, verify tile compliance:

```yaml
SUBSCRIPTION-TILE-CHECK:
  otp_tile_present: "[Y/N]"
  otp_tile_text: "[exact text]"
  subscribe_tile_present: "[Y/N]"
  subscribe_tile_text: "[exact text]"
  cancel_anytime_visible: "[Y/N -- MUST BE Y inside S&S tile]"
  frequency_selector_present: "[Y/N]"
  neither_pre_selected: "[Y/N -- MUST BE Y]"
  savings_explicit_in_tile: "[Y/N -- not requiring calculation]"

  all_compliant: "[Y/N]"
  IF N: HALT -- fix non-compliant tile
```

---

## MICRO-TRUST VALIDATION

Before writing `micro-trust-copy.md`, verify signal compliance:

```yaml
MICRO-TRUST-CHECK:
  signal_count: "[must be 3-4]"
  signal_1:
    text: "[exact text]"
    is_specific_factual: "[Y/N -- 'Free Shipping on Orders $50+' = Y, 'Premium Quality' = N]"
  signal_2:
    text: "[exact text]"
    is_specific_factual: "[Y/N]"
  signal_3:
    text: "[exact text]"
    is_specific_factual: "[Y/N]"
  signal_4:
    text: "[exact text or 'N/A if only 3']"
    is_specific_factual: "[Y/N or N/A]"

  all_signals_specific: "[Y/N]"
  count_in_range: "[Y/N -- 3-4]"
  IF any N: HALT -- replace generic signals with specific factual ones
```

---

## THREE-FILE OUTPUT REQUIREMENT

PDP-06 is NOT complete until all three exist:

```
[ ] pdp-offer-buy-box.json -- EXISTS
[ ] pdp-offer-buy-box.json -- Has: pricing_copy, variant_copy, subscription_copy, quantity_copy, short_description_copy
[ ] pdp-offer-buy-box.json -- Has: atc_copy (all 5 states), express_payment_copy, micro_trust_copy (3-4), sticky_atc_copy, mini_cart_copy
[ ] pdp-offer-buy-box.json -- Savings in BOTH % and $ amount
[ ] pdp-offer-buy-box.json -- ATC label = "Add to Cart" across all placements
[ ] pdp-offer-buy-box.json -- Subscription tiles not pre-selected, "Cancel anytime" present
[ ] PDP-OFFER-BUYBOX-SUMMARY.md -- EXISTS
[ ] PDP-OFFER-BUYBOX-SUMMARY.md -- Contains: all component copy summary, audit results, consistency check results
[ ] execution-log.md -- EXISTS
[ ] execution-log.md -- Shows all microskills executed with spec files read
[ ] execution-log.md -- Shows audit results and anti-slop check

IF ANY CHECKBOX UNCHECKED -> PDP-06 IS NOT COMPLETE
```

---

## SKILL-SPECIFIC MC-CHECK (Run at Every Layer Entry)

```yaml
PDP-06-MC-CHECK:
  trigger: "[layer_entry | gate | output]"
  current_layer: "[0 | 1 | 2 | 3 | 4]"

  # Critical checks
  page_brief_loaded: "[Y/N]"
  pdp03_blueprint_loaded: "[Y/N]"
  pdp_reference_loaded: "[Y/N]"
  buy_box_components_extracted: "[Y/N]"

  # Rushing detection
  writing_creative_atc_label: "[Y/N]"
  hiding_savings_format: "[Y/N]"
  pre_selecting_subscription: "[Y/N]"
  writing_feature_forward_description: "[Y/N]"
  exceeding_4_micro_trust_signals: "[Y/N]"
  using_inconsistent_cta_labels: "[Y/N]"
  using_generic_ai_language: "[Y/N]"
  skipping_blueprint_extraction: "[Y/N]"

  IF any rushing_detection = Y: STOP -- execute the skipped step
  result: "[PROCEED | PAUSE | HALT]"
```

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|-------------|-----------|----------|------------|
| Creative ATC label | ATC label != "Add to Cart" in any placement | Replace with "Add to Cart" | Non-negotiable -- no escalation needed, just fix it |
| Hidden savings | Price display missing % or $ savings format | Add both formats to price display copy | If original price unknown, HALT -- request from brief |
| Pre-selected subscription | Subscription tile has default_selected = true | Set both tiles to unselected, user must choose | Non-negotiable -- no escalation needed |
| Feature-forward description | Short description bullets lead with ingredient names or dosages | Rewrite each bullet leading with the benefit, ingredient as supporting detail | If benefits unknown for an ingredient, flag as data gap |
| Micro-trust overflow | Signal count > 4 | Remove lowest-impact signals to reach 3-4 | If unable to prioritize, use: security + shipping + guarantee + certification |
| CTA inconsistency | Main ATC label != sticky bar label or mini-cart ATC label | Align all to main buy box label | Non-negotiable -- no escalation needed |
| PDP-03 blueprint missing | pdp-above-fold-blueprint.json not found | HALT -- cannot write copy without architecture | Escalate to human: run PDP-03 first |
| Generic AI copy | Anti-slop check finds forbidden words | Rewrite offending copy with specific, factual alternatives | If unable to replace (no product data for specificity), flag as data gap |
