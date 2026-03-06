# PDP-06: Offer/Buy Box Writer — Master Agent

> **Version:** 1.0
> **Skill:** PDP-06-offer-buybox-writer
> **Position:** Phase 3 — PDP Writing Skill (replaces LP-06 + LP-11 + LP-14 for Type B/Hybrid)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** LP-00 (page-brief.json), PDP-03 (pdp-above-fold-blueprint.json)
> **Output:** `pdp-offer-buy-box.json` + `PDP-OFFER-BUYBOX-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Write the **actual copy** for every buy box component that PDP-03 architected as blueprints. PDP-03 creates the structural blueprint (what components exist, where they sit, what UX pattern they follow). PDP-06 writes the words — every price display string, every variant chip label, every subscription tile, every ATC button state, every micro-trust signal line, every mini-cart element.

**The distinction is critical:**
- PDP-03 = architect (blueprint)
- PDP-06 = copywriter (words)

This skill replaces three LP Engine skills for Type B/Hybrid pages:
- LP-06 (Offer/CTA Architecture) — PDP-03 already handled the architecture
- LP-11 (Offer/Pricing Writer) — PDP-06 writes all pricing copy
- LP-14 (CTA Copy Optimizer) — PDP-06 writes all CTA copy

**The Buy Box Copy Standard:** Every piece of copy in the buy box must be specific, benefit-forward, and free of generic AI language. "Add to Cart" is standard (not creative). Savings are shown in BOTH percentage AND dollar amount. Subscription tiles show explicit savings. Micro-trust signals are concise factual statements, not marketing fluff.

**Success Criteria:**
- All buy box components from PDP-03 blueprint have written copy
- Pricing copy shows savings in both % and $ amount
- Subscription tiles show explicit savings and "Cancel anytime"
- ATC label is standard "Add to Cart" (not creative)
- Micro-trust signals are 3-4 max, specific factual statements
- Short description is 3-5 benefit-forward bullets (not feature-forward)
- All copy passes anti-slop check (zero generic AI language)
- CTA labels consistent across all placements (main, sticky, mini-cart)

This agent is a **workflow orchestrator**. It writes the production-ready copy for the buy box system.

---

## IDENTITY

**This skill IS:**
- The buy box copywriter — writes every word that appears in and around the purchase interface
- The pricing copy specialist — formats price displays, savings callouts, per-unit calculations
- The subscription copy writer — OTP vs Subscribe & Save tile copy with explicit savings
- The micro-trust copy writer — concise factual signals that resolve last-second purchase anxiety
- The mini-cart and sticky bar copywriter — compact copy for secondary purchase touchpoints

**This skill is NOT:**
- The buy box architect (PDP-03 handles structural decisions — chips vs dropdowns, tile layout, etc.)
- The hero section writer (PDP-07 handles BTF section copy)
- The social proof writer (PDP-05 handles review system and testimonial copy)
- A UX/UI design tool (outputs copy strings, not pixel-level layouts)
- The carousel copy writer (PDP-03 provides carousel copy directions; PDP-07 or dedicated carousel writer handles that)

---

## STATE MACHINE

```
IDLE -> TRIGGERED
  |
LAYER_0: Load upstream packages + reference docs
  -> 0.1: Brief Loader (LP-00 brief + PDP-03 blueprint)
  -> 0.2: PDP Reference Loader (buy box section of PDP-BEST-PRACTICES-REFERENCE.md)
  -> 0.3: Blueprint Extractor (extract buy box component specs from PDP-03 blueprint)
  | [GATE_0: Brief loaded? Blueprint loaded? All buy box components identified?]
LAYER_1: Pricing & Selection Copy
  -> 1.1: Pricing Copy Architecture
  -> 1.2: Variant Selector Copy
  -> 1.3: Subscription Tile Copy
  -> 1.4: Quantity Stepper Copy
  -> 1.5: Short Description Copy
  | [GATE_1: All pricing/selection copy written? Savings in % AND $? Subscription not pre-selected?]
LAYER_2: Conversion Copy
  -> 2.1: ATC Button Copy
  -> 2.2: Express Payment Copy
  -> 2.3: Micro-Trust Signal Copy
  -> 2.4: Sticky ATC Bar Copy
  -> 2.5: Mini-Cart Copy
  | [GATE_2: All conversion copy written? ATC label = "Add to Cart"? Micro-trust 3-4 max?]
LAYER_3: Validation
  -> 3.1: Buy Box Copy Audit
  -> 3.2: CTA Consistency Check
  -> 3.3: Anti-Slop Check
  | [GATE_3: Audit passes? CTA consistent? Zero slop?]
LAYER_4: Package Assembly
  -> 4.1: Buy Box Copy Package Compiler
  -> 4.2: Summary Writer
  -> 4.3: Log Writer
  |
COMPLETE
```

---

## LAYER SEQUENCE

### Layer 0: Foundation Loading

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 0.1: Brief Loader | Load LP-00 page-brief.json + PDP-03 pdp-above-fold-blueprint.json | input-verification.md |
| 0.2: PDP Reference Loader | Load PDP-BEST-PRACTICES-REFERENCE.md buy box section | pdp-reference-load.md |
| 0.3: Blueprint Extractor | Extract buy box component specs from PDP-03 blueprint | blueprint-extraction.md |

**GATE_0:** page-brief.json loaded AND pdp-above-fold-blueprint.json loaded AND all buy box components extracted with specs. If PDP-03 blueprint missing -> HALT, PDP-03 must run first.

### Layer 1: Pricing & Selection Copy

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 1.1: Pricing Copy Architecture | Write price display strings: anchor, savings, per-unit | pricing-copy.md |
| 1.2: Variant Selector Copy | Write per-chip labels, stock indicators, price differentials | variant-copy.md |
| 1.3: Subscription Tile Copy | Write OTP tile, Subscribe & Save tile, frequency selector | subscription-copy.md |
| 1.4: Quantity Stepper Copy | Write label, default, max, bundle savings callout | quantity-copy.md |
| 1.5: Short Description Copy | Write 3-5 benefit-forward bullet points | short-description-copy.md |

**GATE_1:** All 5 pricing/selection copy files exist. Pricing copy shows savings in BOTH % AND $ amount. Subscription tiles show explicit savings. Subscription is NOT pre-selected. Short description is benefit-forward (not feature-forward). All variant chips have labels.

### Layer 2: Conversion Copy

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 2.1: ATC Button Copy | Write primary label, loading state, success state, OOS state | atc-copy.md |
| 2.2: Express Payment Copy | Write OR divider, payment labels, express checkout labels | express-payment-copy.md |
| 2.3: Micro-Trust Signal Copy | Write 3-4 signals: security, shipping, returns, other | micro-trust-copy.md |
| 2.4: Sticky ATC Bar Copy | Write compact product name, price, ATC label, variant indicator | sticky-atc-copy.md |
| 2.5: Mini-Cart Copy | Write slide-out cart: name, variant, qty, prices, links, cross-sell | mini-cart-copy.md |

**GATE_2:** All 5 conversion copy files exist. ATC label = "Add to Cart" (standard, not creative). Micro-trust signals = exactly 3-4 (not more, not fewer). Sticky ATC bar label matches main ATC label. Mini-cart has "Continue Shopping" + "Checkout" actions.

### Layer 3: Validation

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 3.1: Buy Box Copy Audit | Verify all copy follows Baymard best practices | buy-box-copy-audit.md |
| 3.2: CTA Consistency Check | Verify ATC label consistent across all placements | cta-consistency-check.md |
| 3.3: Anti-Slop Check | Verify zero generic AI language in any copy | anti-slop-check.md |

**GATE_3:** Buy box copy audit passes (all components have copy, savings displayed correctly, no generic language). CTA consistency check passes (ATC label identical everywhere). Anti-slop check passes (zero forbidden words).

### Layer 4: Package Assembly

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 4.1: Buy Box Copy Compiler | Assemble pdp-offer-buy-box.json with all buy box copy | pdp-offer-buy-box.json |
| 4.2: Summary Writer | Write PDP-OFFER-BUYBOX-SUMMARY.md | PDP-OFFER-BUYBOX-SUMMARY.md |
| 4.3: Log Writer | Write execution-log.md | execution-log.md |

---

## BUY BOX COPY STANDARDS

### ATC Button Labels (Baymard-Validated)

| State | Label | Notes |
|-------|-------|-------|
| Default | "Add to Cart" | Standard. NOT creative ("Get Yours Now", "Buy Now", "Claim Your Bottle") |
| Loading | "Adding..." | Brief loading state |
| Success | "Added!" | Confirmation with checkmark, auto-dismiss after 1.5s |
| Out of Stock | "Sold Out -- Notify Me" | Converts OOS to lead capture |
| Disabled (no variant) | "Select a [Flavor/Size]" | Guides user to make selection first |

### Subscription Tile Rules

| Rule | Requirement |
|------|------------|
| Neither option pre-selected | User must actively choose OTP or Subscribe & Save |
| OTP tile text | "One-time purchase: $X.XX" |
| S&S tile text | "Subscribe & Save X%: $X.XX/mo" |
| Cancel policy | "Cancel anytime" visible inside S&S tile |
| Frequency selector | "Deliver every: [30 days / 60 days / 90 days]" below S&S tile |
| Savings explicit | Dollar or percentage savings shown inside tile, not requiring calculation |

### Micro-Trust Signal Rules

| Rule | Requirement |
|------|------------|
| Count | Exactly 3-4 signals (not a wall of badges) |
| Placement | Small gray text directly below ATC button |
| Format | Icon + short factual statement |
| Examples | "Secure Checkout" / "Free Shipping on Orders $X+" / "30-Day Money-Back Guarantee" / "Third-Party Tested" / "Made in USA" |
| Forbidden | Marketing language, superlatives, brand taglines, "100% Satisfaction" without specifics |

### Savings Display Rules

| Format | Example | When |
|--------|---------|------|
| Percentage | "Save 25%" | Always show |
| Dollar amount | "Save $20.00" | Always show alongside percentage |
| Per-unit | "$14.99/bottle" | Multi-pack pricing |
| Combined | "~~$79.99~~ $59.99 (Save $20 -- 25% off)" | Full price display |

---

## MODEL ASSIGNMENT TABLE

| Layer | Task | Model |
|-------|------|-------|
| 0 | Input loading + reference loading + blueprint extraction | haiku |
| 1.1-1.4 | Pricing, variant, subscription, quantity copy | sonnet |
| 1.5 | Short description copy (benefit-forward bullets) | opus |
| 2.1-2.5 | ATC, express payment, micro-trust, sticky bar, mini-cart | opus |
| 3.1-3.3 | Buy box audit, CTA consistency, anti-slop | sonnet |
| 4 | Package assembly | haiku |

---

## FORBIDDEN BEHAVIORS

1. **Creative ATC labels** — "Add to Cart" is standard. NOT "Get Yours Now", "Claim Your Bottle", "Start Your Journey", "Yes! I Want This". Creative labels reduce conversion.
2. **Pre-selected subscription** — Neither OTP nor S&S can be pre-selected. User must actively choose. Sneaky subscriptions = chargebacks + cart abandonment.
3. **Hidden savings** — Savings MUST be shown in BOTH percentage AND dollar amount. Requiring mental math = lost conversions.
4. **Feature-forward short description** — "Contains 500mg of X" is a feature. "Supports deep, uninterrupted sleep" is a benefit. Short description must be benefit-forward.
5. **More than 4 micro-trust signals** — Creates visual noise. 3-4 max. Each must be a specific factual statement.
6. **Cart redirect on ATC** — Post-ATC behavior is slide-out mini-cart. NEVER cart page redirect.
7. **Generic AI language in ANY copy** — No "revolutionary", "game-changing", "unlock", "transform", "journey", "elevate", "supercharge", "harness the power". Zero tolerance.
8. **Inconsistent CTA labels** — ATC label MUST be identical across main buy box, sticky bar, and mini-cart. Three different labels = user confusion.
9. **Subscription without "Cancel anytime"** — S&S tile MUST include "Cancel anytime" text. Omitting it creates anxiety.
10. **Variant chips without price differential** — If variant X costs $10 more than variant Y, the price difference MUST be shown inline on the chip. NOT hidden behind a click.
11. **Proceeding without PDP-03 blueprint** — PDP-06 writes copy FOR the architecture PDP-03 designed. No blueprint = no copy.
12. **Inventing buy box components not in PDP-03 blueprint** — Write copy for what PDP-03 specified. Do not add or remove components.
