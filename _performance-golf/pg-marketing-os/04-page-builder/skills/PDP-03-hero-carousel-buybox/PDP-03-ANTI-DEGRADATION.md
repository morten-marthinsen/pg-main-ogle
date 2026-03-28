# PDP-03: Hero Carousel + Buy Box Architect — Anti-Degradation File

> **Version:** 1.0
> **Skill:** PDP-03-hero-carousel-buybox
> **Purpose:** Structural enforcement that CANNOT be bypassed under context pressure

---

## THE CORE FAILURE MODES THIS FILE PREVENTS

PDP-03 has six specific failure modes:

1. **Carousel Story Collapse:** AI produces 4-6 generic product slides instead of the 10-position NLS story arc. Each position has a specific persuasion function. "Nice product photos" ≠ a carousel that sells.

2. **Buy Box UX Violations:** AI specifies dropdown variant selectors, pre-selected subscription, or quantity dropdowns. Baymard research shows these patterns cause 60%+ more friction. Every buy box component has a specific Baymard-validated interaction pattern.

3. **LP-03 Pattern Leakage:** AI applies LP-03's headline/deck/hero approach to a PDP. A PDP above-fold is NOT a headline + deck copy + hero image. It's a carousel + facts panel + buy box. Completely different architecture.

4. **Missing Micro-Trust:** AI omits the 3-4 micro-trust signals below ATC. Users have documented last-second anxiety before tapping "Add to Cart" — security, shipping, returns. Missing these signals costs conversions.

5. **Vague Carousel Directions:** AI writes "add benefit image" or "show product lifestyle" for carousel slides. Each slide needs specific copy text direction, visual description, and purpose mapped to the NLS story position.

6. **Cart Redirect Instead of Mini-Cart:** AI specifies "proceed to cart page" on ATC click. Baymard: this interrupts shopping flow. Must be slide-out mini-cart that keeps user on PDP.

---

## MANDATORY CHECKPOINT FILES

| Layer | Required File | Blocks |
|-------|-------------|--------|
| After Layer 0 | `input-verification.md` | Layer 1 |
| After Layer 0 | `pdp-reference-load.md` | Layer 1 |
| After Layer 0 | `specimen-load.md` | Layer 1 |
| After Layer 1 | `ksp-inventory.md` | Layer 2 |
| After Layer 1 | `carousel-architecture.md` (10 slides) | Layer 2 |
| After Layer 1 | `facts-panel.md` | Layer 2 |
| After Layer 1 | `video-strategy.md` | Layer 2 |
| After Layer 2 | `title-rules.md` | Layer 3 |
| After Layer 2 | `price-display.md` | Layer 3 |
| After Layer 2 | `variant-selector.md` | Layer 3 |
| After Layer 2 | `atc-button.md` | Layer 3 |
| After Layer 2 | `micro-trust.md` | Layer 3 |
| After Layer 3 | `eight-second-test.md` | Layer 4 |
| After Layer 3 | `buy-box-audit.md` (score >= 7.0) | Layer 4 |
| After Layer 3 | `carousel-check.md` (all 10 positions) | Layer 4 |
| After Layer 3 | `anti-slop-check.md` | Layer 4 |
| Output | `pdp-above-fold-blueprint.json` | PDP-04, PDP-06 |
| Output | `PDP-ABOVE-FOLD-SUMMARY.md` | Human review |
| Output | `execution-log.md` | Verification |

**IF ANY REQUIRED FILE DOES NOT EXIST → THE LAYER IS NOT COMPLETE.**

---

## NON-NEGOTIABLE THRESHOLDS

| Requirement | Threshold | If Not Met |
|------------|-----------|------------|
| Carousel slides | Exactly 10, matching NLS story positions | HALT — fill missing positions |
| Buy box audit score | >= 7.0/10 | HALT — revise until met |
| 8-second test | All 3 PDP questions answered | HALT — redesign above-fold |
| Variant selector | Exposed chips, NOT dropdown | HALT — redesign |
| Subscription UX | Selectable tiles, NOT pre-selected | HALT — redesign |
| Quantity selector | Stepper (+/-), NOT dropdown | HALT — redesign |
| Micro-trust signals | 3-4 signals below ATC | HALT — add signals |
| Anti-slop check | 0 forbidden words in copy directions | HALT — remove |
| Post-ATC behavior | Slide-out mini-cart, NOT cart redirect | HALT — redesign |
| Product title | Full title, never truncated | HALT — fix spec |

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid |
|----------------|-----------------|
| "6 carousel slides is enough for this product" | NLS story architecture requires 10 positions. Each has a persuasion function. Skipping positions = skipping persuasion steps. |
| "A dropdown is fine for variant selection" | Baymard: dropdowns add 3+ taps and hide options → 60% more friction. Chips are mandatory. |
| "We can pre-select subscription to increase S&S uptake" | Baymard: sneaky subscriptions are the top cause of cart abandonment and chargebacks. Honest tiles convert better long-term. |
| "The product title is too long, let's truncate" | Baymard: users confirm correct variation via title. Truncation creates anxiety. Let it take 3 lines. |
| "Add to Cart can go to the cart page" | Baymard: cart redirect interrupts shopping flow. Slide-out mini-cart keeps user on PDP. |
| "We don't need micro-trust signals" | Baymard: last-second anxieties (security, shipping, returns) are documented conversion killers. 3-4 signals mandatory. |
| "LP-03 patterns work for PDP too" | PDP above-fold is a purchasing system (carousel + buy box), not a reading experience (headline + deck + hero). Completely different architecture. |
| "The carousel doesn't need a comparison slide" | Slide 9 (Comparison) reduces comparison shopping by collapsing the choice. Skipping it leaves the user to do their own comparison — on a competitor's site. |

---

## CAROUSEL STORY POSITION VALIDATION

Before writing `carousel-architecture.md`, verify all 10 positions:

```yaml
CAROUSEL-POSITION-CHECK:
  slide_1_outcome: "[Y/N — has purpose + copy direction + visual direction?]"
  slide_2_problem_signs: "[Y/N]"
  slide_3_ingredients: "[Y/N]"
  slide_4_enjoyment: "[Y/N]"
  slide_5_how_it_works: "[Y/N]"
  slide_6_what_to_expect: "[Y/N]"
  slide_7_how_to_use: "[Y/N]"
  slide_8_credibility: "[Y/N]"
  slide_9_comparison: "[Y/N]"
  slide_10_testimonials: "[Y/N]"

  all_10_present: "[Y/N]"
  each_has_purpose: "[Y/N]"
  each_has_copy_direction: "[Y/N]"
  each_has_visual_direction: "[Y/N]"

  IF any N: HALT — complete missing positions
```

---

## BUY BOX UX VALIDATION

Before writing buy box component files, verify Baymard compliance:

```yaml
BUYBOX-UX-CHECK:
  title_full_displayed: "[Y/N — MUST BE Y]"
  rating_anchor_link: "[Y/N — MUST BE Y]"
  price_savings_both_formats: "[Y/N — savings in % AND $ amount]"
  shipping_visible_near_price: "[Y/N — MUST BE Y]"
  variant_selector_type: "[chips | dropdown — MUST BE chips]"
  subscription_ux: "[tiles | pre-selected — MUST BE tiles]"
  quantity_type: "[stepper | dropdown — MUST BE stepper]"
  atc_full_width: "[Y/N — MUST BE Y]"
  post_atc_behavior: "[mini-cart | cart-redirect — MUST BE mini-cart]"
  micro_trust_count: "[number — MUST BE 3-4]"
  express_below_atc: "[Y/N — with OR divider]"

  all_baymard_compliant: "[Y/N]"
  IF N: HALT — fix non-compliant components
```

---

## THREE-FILE OUTPUT REQUIREMENT

PDP-03 is NOT complete until all three exist:

```
[ ] pdp-above-fold-blueprint.json — EXISTS
[ ] pdp-above-fold-blueprint.json — Has: carousel (10 slides), facts_panel, buy_box (all 10 components)
[ ] pdp-above-fold-blueprint.json — Carousel: each slide has story_position, purpose, copy_direction, visual_direction
[ ] pdp-above-fold-blueprint.json — Buy box: variant=chips, subscription=tiles, quantity=stepper, atc=full-width, post_click=mini-cart
[ ] pdp-above-fold-blueprint.json — Has: audit_score (>= 7.0), eight_second_test (all 3 pass)
[ ] PDP-ABOVE-FOLD-SUMMARY.md — EXISTS
[ ] PDP-ABOVE-FOLD-SUMMARY.md — Contains: carousel summary, buy box summary, audit score, 8-second test results
[ ] execution-log.md — EXISTS
[ ] execution-log.md — Shows all microskills executed with spec files read
[ ] execution-log.md — Shows 8-second test results and buy box audit score

IF ANY CHECKBOX UNCHECKED → PDP-03 IS NOT COMPLETE
```

---

## SKILL-SPECIFIC MC-CHECK (Run at Every Layer Entry)

```yaml
PDP-03-MC-CHECK:
  trigger: "[layer_entry | gate | output]"
  current_layer: "[0 | 1 | 2 | 3 | 4]"

  # Critical checks
  page_brief_loaded: "[Y/N]"
  page_type_confirmed: "[type_b | hybrid — NOT type_a]"
  pdp_reference_loaded: "[Y/N]"
  specimens_loaded: "[Y/N]"

  # Rushing detection
  carousel_fewer_than_10_slides: "[Y/N]"
  using_dropdown_for_variants: "[Y/N]"
  using_dropdown_for_quantity: "[Y/N]"
  pre_selecting_subscription: "[Y/N]"
  missing_micro_trust_signals: "[Y/N]"
  applying_lp03_patterns: "[Y/N]"
  vague_carousel_directions: "[Y/N]"
  skipping_8_second_test: "[Y/N]"

  IF any rushing_detection = Y: STOP — execute the skipped step
  result: "[PROCEED | PAUSE | HALT]"
```

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|-------------|-----------|----------|------------|
| Carousel story collapse | Fewer than 10 slides OR slides missing NLS position mapping | Add missing slides following NLS story arc | HALT if product lacks data for any position — flag for human input on that slide |
| Buy box UX violation | Dropdown variant/quantity, pre-selected subscription | Redesign using Baymard-validated patterns | HALT — these are non-negotiable UX requirements |
| LP-03 pattern leakage | Output contains headline_type, deck_copy, hero_image instead of carousel + buy box | Restart from Layer 1 using PDP architecture | Clear context of LP-03 patterns, re-read PDP-03 AGENT.md |
| Missing micro-trust | ATC button spec lacks 3-4 signals below it | Add micro-trust signals from brief (shipping, guarantee, security, returns) | If product has no clear trust signals — escalate to human for guarantee/shipping info |
| Vague carousel directions | Slide direction contains "add benefit image" or similar non-specific language | Rewrite with specific copy text, imagery description, and layout | If product data insufficient for specific directions — flag as data gap |
| Cart redirect specified | Post-ATC behavior = "go to cart page" | Change to slide-out mini-cart | Non-negotiable — no escalation needed, just fix it |

---

## IMPLEMENTATION CHECKLIST — ARENA

```
LAYER 2.5 (ARENA -- MANDATORY):
[ ] ARENA-LAYER.md READ (MANDATORY — contains skill-specific judging criteria)
[ ] ARENA-CORE-PROTOCOL.md READ (path: ~system/protocols/ARENA-CORE-PROTOCOL.md)
[ ] ARENA-PERSONA-PANEL.md READ (path: ~system/protocols/ARENA-PERSONA-PANEL.md)
[ ] Persona names VERIFIED against protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect
[ ] All 7 competitors generated hero carousel + buy box packages
[ ] All packages scored against criteria
[ ] Human selection received (BLOCKING)
```
