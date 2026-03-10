# LP-06: Offer/CTA Architecture — Anti-Degradation File

> **Version:** 1.0
> **Skill:** LP-06-offer-cta-architecture
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

LP-06 has five specific failure modes:

1. **Multiple Offer Violation:** AI designs more than one offer on the page — a second product, a competing subscription tier that functions as a separate offer, or CTAs pointing to different checkout destinations. Research shows a -266% conversion penalty for multiple offers (KlientBoost). This is the single highest-impact failure mode in the entire Landing Page Engine.

2. **Price Before Value (Type A):** AI places the pricing block before the value stack is established. For Type A long-form pages, revealing price before the visitor understands total value destroys the anchoring frame. The price-after-value sequence is not a suggestion — it is a structural requirement backed by the entire direct response tradition and the blueprint's Section 7 -> Section 8 ordering.

3. **Generic CTA Copy Direction:** AI writes "compelling CTA about the product's benefits" or "Buy Now" as a CTA direction. Personalized CTAs outperform generic by +202% (HubSpot). Every CTA direction must include: emotional appeal type, personalization vector (product name, benefit, savings, audience identity), and specific language territory. "Get My 60-Day Supply of [Product] — Risk Free" is a direction. "Buy Now" is not.

4. **Missing or Generic Guarantee:** AI omits the guarantee or writes "30-day money-back guarantee" without branding or specific terms. Every landing page requires a guarantee. Every guarantee requires a branded name, specific duration, specific terms for how to claim, and visual treatment direction. "The [Product] Complete Confidence Promise — 90 Days, No Questions Asked" is a guarantee. "Satisfaction guaranteed" is invisible.

5. **Unjustified Urgency:** AI inserts countdown timers, "only X left" claims, or "sale ends tonight" without a credible real-world reason. Fabricated urgency destroys trust with sophisticated buyers and creates legal liability. If no legitimate urgency exists, the correct action is to EXCLUDE urgency entirely and document why — not to fabricate it.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `brief-loaded.md` | Layer 1 |
| After Layer 0 | `offer-data-loaded.md` | Layer 1 |
| After Layer 0 | `specimen-offers-loaded.md` | Layer 1 |
| After Layer 1 | `offer-type-classification.md` | Layer 2 |
| After Layer 1 | `pricing-display-strategy.md` | Layer 2 |
| After Layer 1 | `cta-strategy.md` | Layer 2 |
| After Layer 1 | `guarantee-architecture.md` | Layer 2 |
| After Layer 2 | `value-stack-architecture.md` | Layer 3 |
| After Layer 2 | `price-anchor-design.md` | Layer 3 |
| After Layer 2 | `cta-placement-map.md` | Layer 3 |
| After Layer 2 | `urgency-scarcity-plan.md` | Layer 3 |
| After Layer 2 | `cta-language-directions.md` | Layer 3 |
| After Layer 3 | `architecture-validation.md` | Layer 4 |
| After Layer 3 | `one-offer-audit.md` (PASS required) | Layer 4 |
| Output | `offer-cta-architecture.json` | LP-11, LP-13, LP-14, LP-15 |
| Output | `OFFER-CTA-ARCHITECTURE-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF ANY REQUIRED FILE DOES NOT EXIST -> THE LAYER IS NOT COMPLETE.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| One-offer audit | PASS — zero competing offers | HALT -- remove competing offers until single offer confirmed |
| CTA placements | >= 3 mapped placements | HALT -- add placements until minimum met |
| CTA emotional appeals | >= 3 per placement | HALT -- generate additional appeal directions |
| Guarantee branded | Name is NOT generic ("money-back", "satisfaction") | HALT -- create branded guarantee name |
| Guarantee terms | Specific duration + claim process documented | HALT -- specify terms |
| Price display strategy | Matches page type (A = after value, B = above fold) | HALT -- realign strategy to page type |
| Urgency justification | Every claim has documented real-world reason OR urgency excluded | HALT -- justify or remove |
| Value stack order (Type A) | Value established BEFORE price revealed | HALT -- reorder value stack |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "Two pricing tiers count as one offer" | Tiers of the SAME product (1-pack, 3-pack, subscription) = one offer. Two DIFFERENT products or two different conversion goals = multiple offers. |
| "The visitor can decide between products" | Giving the visitor a choice between products on the same page = multiple offers = -266% penalty. One offer. One decision. |
| "Price above fold works for Type A too" | Type A price-after-value is structural. The value stack creates the anchor. Price without anchor loses the comparison frame. |
| "'Buy Now' is clear and simple" | Clear AND generic. Personalized CTAs outperform by 202%. Clarity + personalization is the standard. |
| "The guarantee name is fine as 'money-back guarantee'" | Generic guarantee = invisible. Branded guarantee creates a NAMED promise the visitor remembers. |
| "Urgency always helps conversion" | Fabricated urgency helps the first visit. It destroys trust, repeat purchases, and brand on every subsequent interaction. |
| "The product is always available so we can't have urgency" | Correct. Exclude urgency and document the reason. Absence of urgency is better than fake urgency. |
| "I'll let LP-14 figure out the CTA copy" | LP-06 provides the DIRECTION. LP-14 writes the COPY. Direction without emotional appeal type + personalization vector + language territory = LP-14 operating blind. |
| "Three appeals per CTA is overkill" | LP-14 selects the BEST appeal from the options provided. Fewer options = worse selection = weaker CTAs. |
| "The guarantee section covers risk reversal" | Guarantee section exists. But risk reversal TEXT inline with CTA buttons is a separate architectural decision that must be specified per CTA. |

---

## ONE-OFFER AUDIT CHECKLIST

Before GATE_3, run this exhaustive check:

```yaml
ONE-OFFER-AUDIT:
  # The -266% check
  single_product_or_service: "[Y/N — is there exactly ONE thing being sold?]"
  all_ctas_point_to_same_action: "[Y/N — do all CTAs lead to same checkout/conversion?]"
  no_competing_product_recommendations: "[Y/N — no 'also consider' or 'alternatively' blocks?]"
  no_multiple_checkout_paths: "[Y/N — one add-to-cart, one checkout destination?]"
  bundle_tiers_are_same_product: "[Y/N — if tiers exist, all tiers are quantity variants of ONE product?]"

  # Boundary cases
  upsell_bundle_section: "[if exists — does it suggest ADDING to cart, not REPLACING the offer?]"
  subscription_vs_one_time: "[if both — are they pricing options for the SAME product, not different products?]"

  violations_found: "[list any violations]"
  result: "[PASS | FAIL]"
  IF FAIL: "[specific violation and required fix]"
```

---

## PRICING STRATEGY VERIFICATION

```yaml
PRICING-STRATEGY-CHECK:
  page_type: "[type_a | type_b | hybrid]"

  IF type_a:
    value_stack_before_price: "[Y/N — MUST BE Y]"
    comparison_anchor_present: "[Y/N]"
    per_day_minimizer_present: "[Y/N]"
    price_above_fold: "[MUST BE N for Type A]"

  IF type_b:
    price_above_fold: "[Y/N — MUST BE Y]"
    strikethrough_anchor_present: "[Y/N]"
    savings_display_present: "[Y/N]"
    bundle_tiers_visible: "[Y/N if applicable]"

  IF hybrid:
    type_b_price_above_fold: "[Y/N — MUST BE Y]"
    type_a_value_stack_below_fold: "[Y/N — recommended]"

  strategy_matches_page_type: "[Y/N]"
  IF N: HALT -- realign pricing strategy
```

---

## CTA DIRECTION SPECIFICITY CHECK

Before writing `cta-language-directions.md`, every CTA direction must pass:

```yaml
CTA-SPECIFICITY-CHECK:
  cta_[id]:
    has_emotional_appeal_type: "[Y/N — must name the appeal: desire, transformation, etc.]"
    has_personalization_vector: "[Y/N — product name, benefit, savings, or audience identity]"
    has_language_territory: "[Y/N — specific enough for LP-14 to write from]"
    uses_forbidden_generic: "[Y/N — 'Buy Now', 'Get Started', 'Submit', 'Click Here' = Y = FAIL]"

  all_ctas_specific: "[Y/N]"
  IF N: HALT -- rewrite directions with appeal type + personalization + territory
```

---

## THREE-FILE OUTPUT REQUIREMENT

LP-06 is NOT complete until all three exist:

```
[ ] offer-cta-architecture.json -- EXISTS
[ ] offer-cta-architecture.json -- one_offer_rule.single_offer_confirmed = Y
[ ] offer-cta-architecture.json -- cta_architecture.total_placements >= 3
[ ] offer-cta-architecture.json -- guarantee.branded_name is NOT generic
[ ] offer-cta-architecture.json -- All CTA placements have 3+ emotional appeals
[ ] offer-cta-architecture.json -- urgency justified OR excluded with reason
[ ] OFFER-CTA-ARCHITECTURE-SUMMARY.md -- EXISTS
[ ] OFFER-CTA-ARCHITECTURE-SUMMARY.md -- Contains: offer type, pricing strategy, CTA map, guarantee, urgency status, one-offer audit result
[ ] execution-log.md -- EXISTS
[ ] execution-log.md -- Shows all microskills executed with spec files read
[ ] execution-log.md -- Shows one-offer audit result

IF ANY CHECKBOX UNCHECKED -> LP-06 IS NOT COMPLETE
```

---

## SKILL-SPECIFIC MC-CHECK (Run at Every Layer Entry)

```yaml
LP-06-MC-CHECK:
  trigger: "[layer_entry | gate | output]"
  current_layer: "[0 | 1 | 2 | 3 | 4]"

  # Critical checks
  page_brief_loaded: "[Y/N]"
  page_type_confirmed: "[type_a | type_b | hybrid]"
  offer_data_available: "[Y/N]"
  operating_mode: "[downstream | standalone]"

  # Rushing detection
  designing_multiple_offers: "[Y/N]"
  placing_price_before_value_in_type_a: "[Y/N]"
  writing_generic_cta_directions: "[Y/N]"
  using_unbranded_guarantee: "[Y/N]"
  fabricating_urgency: "[Y/N]"
  skipping_one_offer_audit: "[Y/N]"

  IF any rushing_detection = Y: STOP -- execute the skipped step
  result: "[PROCEED | PAUSE | HALT]"
```

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|-------------|-----------|----------|------------|
| Multiple offer violation | One-offer audit finds competing products, split CTAs, or multiple checkout paths | Remove competing offers; consolidate to single conversion goal | HALT -- cannot proceed until single offer confirmed |
| Price before value (Type A) | Pricing strategy check shows price above fold or before value stack for Type A | Move price after value stack section; add comparison anchor | If no value stack elements exist to precede price, flag as OFFER GAP and request client input |
| Generic CTA direction | CTA specificity check finds "Buy Now", "Get Started", or direction without appeal type | Rewrite with emotional appeal type + personalization vector + language territory | If product benefits are too vague to personalize, request more product information from client |
| Generic guarantee | Guarantee name matches "money-back guarantee", "satisfaction guaranteed", or similar generic | Create branded name incorporating product identity and specific duration | If no product identity available for branding, use outcome-based naming: "The [Outcome] Promise" |
| Unjustified urgency | Urgency plan uses countdown timer, stock count, or deadline without documented real-world reason | Remove unjustified urgency; document exclusion reason; or provide legitimate justification | If client insists on urgency but no legitimate reason exists, document the trust risk and recommend exclusion |
