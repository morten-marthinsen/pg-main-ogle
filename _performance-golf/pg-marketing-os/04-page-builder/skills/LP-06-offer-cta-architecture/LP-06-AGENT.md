# LP-06: Offer/CTA Architecture — Master Agent

> **Version:** 1.0
> **Skill:** LP-06-offer-cta-architecture
> **Position:** Phase 2 — Fourth Architecture Skill (runs after LP-04, parallel to LP-05)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** LP-00 (page-brief.json), LP-04 (section-sequence.json), CopywritingEngine Skill 07 offer package (optional)
> **Output:** `offer-cta-architecture.json` + `OFFER-CTA-ARCHITECTURE-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Design the complete **offer presentation architecture** — pricing display strategy, value stack structure, CTA placement and language direction, guarantee framing, and urgency/scarcity approach — for a single landing page.

This skill answers five architectural questions:

1. **What is the offer structure?** — Single product, bundle tiers, subscription, trial, free + shipping, or combination
2. **How is pricing displayed?** — Type A (reveal after value stack) vs. Type B (above fold with anchor)
3. **Where do CTAs go and what do they say?** — Minimum 3 placements, each with 3+ emotional appeal directions
4. **How is the guarantee framed?** — Branded name, duration, specific terms, visual treatment direction
5. **What urgency/scarcity is justified?** — Only real, credible urgency — never fabricated

**The #1 Law of this skill:**

> **ONE OFFER PER PAGE.** Multiple competing offers on a single page produce a -266% conversion penalty (KlientBoost). Every element this skill designs serves ONE conversion goal. This is non-negotiable.

**Success Criteria:**
- Single offer identified and confirmed — zero competing offers
- Offer type classified from 7-type taxonomy with justification
- Pricing display strategy matched to page type (Type A vs. Type B)
- Value stack ordered (if Type A) with anchoring strategy documented
- 3+ CTA placements mapped with 3+ emotional appeal directions each
- Guarantee branded with specific terms (not "money-back guarantee")
- Urgency/scarcity approach justified or explicitly excluded
- One-offer audit passes with zero violations
- `offer-cta-architecture.json` complete — zero empty required fields

This agent is a **workflow orchestrator**. It designs WHERE offer elements go and WHAT STRUCTURE they follow. It does NOT write offer copy — LP-11 (Offer/Pricing Writer), LP-13 (Urgency/Scarcity Stack), and LP-14 (CTA Copy Optimizer) handle copy generation.

---

## IDENTITY

**This skill IS:**
- The architectural blueprint for the offer presentation system
- The CTA strategy that LP-14 executes against (emotional appeals, placement, personalization direction)
- The pricing display plan that LP-11 builds from
- The urgency/scarcity framework that LP-13 implements
- The guarantee design brief that governs risk-reversal copy

**This skill is NOT:**
- An offer copy writer (LP-11 writes value stack copy, pricing copy, guarantee copy)
- A CTA copy writer (LP-14 writes final CTA button text and surrounding copy)
- An urgency copy writer (LP-13 writes urgency/scarcity language)
- The above-fold architect (LP-03 handled that)
- The section sequencer (LP-04 handled section order; this skill designs WITHIN the offer sections)

**Upstream:** `page-brief.json` (LP-00), `section-sequence.json` (LP-04), `offer-package.json` (CopywritingEngine Skill 07 — optional)
**Downstream:** `offer-cta-architecture.json` consumed by LP-11, LP-13, LP-14, LP-15, LP-17

---

## STATE MACHINE

```
IDLE -> TRIGGERED
  |
LAYER_0: Load upstream packages
  -> 0.1: Load page-brief.json (LP-00 output)
  -> 0.2: Load offer data (from brief or CopywritingEngine Skill 07)
  -> 0.3: Load specimen offer patterns for vertical + page type
  | [GATE_0: Required inputs present? Offer data available?]
LAYER_1: Offer classification + strategy
  -> 1.1: Offer type classifier (7-type taxonomy)
  -> 1.2: Pricing display planner (Type A reveal sequence vs. Type B above-fold)
  -> 1.3: CTA strategy planner (placement count, emotional appeal categories)
  -> 1.4: Guarantee architect (brand name, duration, terms, visual treatment)
  | [GATE_1: Offer type classified? Pricing strategy declared? CTA min 3? Guarantee branded?]
LAYER_2: Detailed architecture
  -> 2.1: Value stack architect (element order, anchor strategy, "if all it did was" framing)
  -> 2.2: Price anchor designer (comparison anchors, per-day minimizer, savings display)
  -> 2.3: CTA placement mapper (section-by-section CTA map with trigger context)
  -> 2.4: Urgency/scarcity planner (justified types only, or explicit exclusion)
  -> 2.5: CTA language direction (3+ emotional appeals per placement for LP-14)
  | [GATE_2: All architecture specs complete? CTA directions specific? Urgency justified or excluded?]
LAYER_3: Validation
  -> 3.1: Offer architecture validator (internal consistency check)
  -> 3.2: One-offer audit (the -266% enforcement gate)
  | [GATE_3: Architecture consistent? One-offer audit PASS?]
LAYER_4: Package assembly
  -> 4.1: offer-cta-architecture.json compiler
  -> 4.2: OFFER-CTA-ARCHITECTURE-SUMMARY.md writer
  -> 4.3: execution-log.md writer
  |
COMPLETE
```

---

## OPERATING MODES

### Downstream Mode (CopywritingEngine Offer Package Available)

**Triggered when:** `offer-package.json` from CopywritingEngine Skill 07 exists for the project.

**What changes:** Pricing, bonuses, guarantee details, and urgency levers come pre-validated from the CopywritingEngine. LP-06 designs the PRESENTATION ARCHITECTURE around these fixed offer elements rather than inferring them from the brief.

**Brief quality in Downstream Mode:** ~95% complete for offer data. LP-06 focuses on display strategy, CTA architecture, and page-level integration.

### Standalone Mode (Brief Only)

**Triggered when:** No CopywritingEngine offer package found.

**What happens:** LP-06 extracts offer details from the `page-brief.json` offer_summary section. Missing elements are flagged as `needs_validation`. Guarantee name must still be branded. CTA strategy still requires 3+ placements with emotional appeal directions.

**Brief quality in Standalone Mode:** ~60-75% for offer data. More fields may be flagged as `needs_validation`.

---

## LAYER SEQUENCE

### Layer 0: Foundation Loading

> **POSITIONAL REINFORCEMENT:** You are loading inputs. Do NOT classify the offer, plan CTAs, or design guarantee framing. Load data only.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 0.1: Brief Loader | Load page-brief.json — page type, audience, offer summary, awareness stage | brief-loaded.md |
| 0.2: Offer Data Loader | Load offer details from CopywritingEngine package OR extract from brief | offer-data-loaded.md |
| 0.3: Specimen Offer Loader | Load offer/CTA patterns from specimens matching vertical + page type | specimen-offers-loaded.md |

**GATE_0:** `page-brief.json` loaded AND offer data available (from package or brief). If offer summary is entirely empty -> HALT with message requesting offer details.

### Layer 1: Offer Classification & Strategy

> **POSITIONAL REINFORCEMENT:** You are making structural DECISIONS. Classify the offer type, declare the pricing display strategy, set CTA minimum requirements, and brand the guarantee. Do NOT design value stack ordering, write CTA copy, or plan urgency tactics.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 1.1: Offer Type Classifier | Classify from 7-type taxonomy (Hard, Soft, Free+S&H, Limited, Limited-Time, OTO, Combination) | offer-type-classification.md |
| 1.2: Pricing Display Planner | Declare Type A (price-after-value) or Type B (price-above-fold) strategy with rationale | pricing-display-strategy.md |
| 1.3: CTA Strategy Planner | Set CTA placement count (min 3), map to page zones, select emotional appeal categories | cta-strategy.md |
| 1.4: Guarantee Architect | Brand the guarantee (name + duration + type + terms + visual treatment direction) | guarantee-architecture.md |

**GATE_1:** Offer type classified with rationale. Pricing display strategy matches page type. CTA count >= 3 with emotional categories selected. Guarantee has a branded name (NOT "money-back guarantee" or "satisfaction guaranteed").

### Layer 2: Detailed Architecture

> **POSITIONAL REINFORCEMENT:** You are designing DETAILED SPECIFICATIONS. Each output must be specific enough for downstream writing skills to execute against. "Write compelling CTA copy" is not a specification. "Desire/Confidence appeal: communicate ownership of [product benefit] starting today" IS a specification.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 2.1: Value Stack Architect | Order value stack elements, define anchor strategy, plan "if all it did was" framing | value-stack-architecture.md |
| 2.2: Price Anchor Designer | Design comparison anchors, per-day minimizer, savings display, bundle tier display | price-anchor-design.md |
| 2.3: CTA Placement Mapper | Map each CTA to its section, trigger context (what the visitor just read), and conversion intent | cta-placement-map.md |
| 2.4: Urgency/Scarcity Planner | Plan justified urgency types OR explicitly exclude with documented reason | urgency-scarcity-plan.md |
| 2.5: CTA Language Direction | For each CTA placement, generate 3+ emotional appeal directions with specific language territory | cta-language-directions.md |

**GATE_2:** Value stack has ordered elements with anchor strategy. Price anchor design complete. CTA placement map covers all CTA sections from LP-04. Urgency is justified or explicitly excluded. Every CTA placement has 3+ specific emotional appeal directions.

### Layer 3: Validation

> **POSITIONAL REINFORCEMENT:** You are AUDITING. Check internal consistency and enforce the one-offer rule. Do NOT add new offer elements, change CTA placements, or redesign the guarantee.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 3.1: Offer Architecture Validator | Check internal consistency: pricing matches offer type, CTAs match sections, guarantee matches duration claims | architecture-validation.md |
| 3.2: One-Offer Audit | THE critical audit — verify zero competing offers, zero split CTAs, zero confusion about what the visitor is buying | one-offer-audit.md |

**GATE_3:** Architecture validation PASS (zero inconsistencies). One-offer audit PASS (zero violations). If either FAILS -> HALT and fix before proceeding.

### Layer 4: Package Assembly

> **POSITIONAL REINFORCEMENT:** You are COMPILING validated outputs into the canonical JSON file and summary. Do NOT make new decisions. Do NOT add elements not present in Layer 1-3 outputs. Compile only.

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 4.1: Offer-CTA Compiler | Assemble offer-cta-architecture.json from all validated outputs | offer-cta-architecture.json |
| 4.2: Summary Writer | Write OFFER-CTA-ARCHITECTURE-SUMMARY.md for human review | OFFER-CTA-ARCHITECTURE-SUMMARY.md |
| 4.3: Log Writer | Write execution-log.md showing all microskills executed and gates passed | execution-log.md |

---

## THE 7 OFFER TYPES (Classification Taxonomy)

Every offer falls into one or more of these types. Combination offers use 2+ types simultaneously.

| Type | Definition | Conversion Psychology | Specimen Examples |
|------|-----------|----------------------|-------------------|
| **Hard Offer** | Standard: product + price + pay now | Direct transaction — works for Product-Aware+ audiences | Sunday Red ($150-$250 apparel) |
| **Soft Offer** | Pay later, installments, or try-before-commit | Lowers commitment threshold — works for Solution-Aware audiences | MAMG (free trial -> $17.90/mo) |
| **Free + Shipping** | Product free, collect shipping only | Highest trial rate — used for front-end customer acquisition | Not in current specimens |
| **Limited Offer** | Genuine scarcity (legitimate reason required) | Loss aversion — "available to first 500 only" with real cap | Not in current specimens |
| **Limited-Time** | Deadline-driven with justified reason | Time pressure — "introductory pricing ends [date]" | Richmond Dinh (countdown timer) |
| **One-Time Offer** | Seen once, never repeated | Exclusivity + urgency combined — upsell/OTO pages | Graziosi (order bumps at checkout) |
| **Combination** | Mix of 2+ types | Highest conversion ceiling | BIOptimizers (Hard + Limited-Time + Soft subscription) |

**Classification rule:** Identify the PRIMARY type first, then note any SECONDARY types. The primary type governs the pricing display strategy.

---

## CTA EMOTIONAL APPEAL FRAMEWORK (6 Appeals)

Every CTA placement gets direction from 3+ of these 6 emotional appeals:

| Appeal | Core Emotion | CTA Pattern | Use When |
|--------|-------------|------------|----------|
| **Desire/Confidence** | Ownership, certainty | "Get [X] — Start Today" | Primary CTA (default) |
| **Transformation** | Aspiration, identity | "Start My [Outcome] Journey" | Post-story, post-mechanism |
| **Consequence** | Fear of missing out | "Don't Wait — [Urgency Reason]" | Mid-page near urgency section |
| **Belonging** | Social validation | "Join [N] People Who [Outcome]" | After social proof block |
| **Risk Reversal** | Safety, zero risk | "Try [X] Risk-Free — [Guarantee Duration]" | Near guarantee section |
| **Specificity** | Precision, deal | "Claim My [X] — [Specific Savings] Today" | Final CTA, urgency + personalization |

**The +202% rule:** Personalized CTAs outperform generic by 202% (HubSpot). Every CTA direction must include at least one personalization vector: product name, specific benefit, savings amount, audience identity, or guarantee duration.

---

## PRICING DISPLAY ARCHITECTURE

### Type A: Price-After-Value Sequence

```
1. VALUE STACK — List everything they get + individual assigned values
2. TOTAL VALUE STATEMENT — "Total value: $[X]"
3. COMPARISON ANCHOR — "A single [comparable service] costs $[higher amount]"
4. PER-DAY MINIMIZER — "That's less than $[low amount]/day"
5. PRICE REVEAL — "Today, your investment is just $[price]"
6. MULTI-PACK/SUBSCRIPTION — "Save even more with [bundle option]"
```

**Rule:** Price NEVER appears before Step 1 in Type A. The value stack creates the anchor frame.

### Type B: Above-Fold Price Display

```
ABOVE FOLD:
  ~~$[original]~~ $[sale] (SAVE [X]%)
  [BUNDLE TIER — BEST VALUE]  <-- Pre-selected or highlighted
  [SINGLE UNIT — $price]
  [SUBSCRIBE & SAVE — $price/mo]
```

**Rule:** Price IS above fold for Type B. The anchoring happens through strikethrough original price + savings percentage display.

### Hybrid: Type B Above-Fold + Type A Value Stack Below

Above-fold shows price for impulse/ready buyers. Below-fold value stack section educates hesitant buyers before a second pricing CTA.

---

## GUARANTEE ARCHITECTURE

### Required Elements (ALL mandatory)

1. **Branded Name** — NOT "money-back guarantee" EVER. Examples:
   - "The [Product] Complete Confidence Promise"
   - "The 90-Day Total Transformation Guarantee"
   - "The [Product] Works or You Pay Nothing"
2. **Duration** — Specific: 60 days, 90 days, 365 days
3. **Type** — money-back, exchange, results-based, or performance
4. **Terms** — What triggers it and how to claim (specific, not vague)
5. **Visual Treatment Direction** — Badge, certificate, seal, or stamp design brief

### Guarantee Duration Data

| Duration | Return Rate | Conversion Lift | Use When |
|----------|-----------|-----------------|----------|
| 30-day | ~10-15% | Baseline | Low-risk, low-ticket |
| 60-day | ~8-12% | Moderate lift | Standard for most products |
| 90-day | ~7-10% | Strong lift | Supplements, health products |
| 365-day | ~5-8% | Highest lift | High-confidence products, brand builders |

**Counter-intuitive data:** Longer guarantees produce FEWER returns because customers feel less pressure to "test immediately" and often forget to return.

---

## URGENCY/SCARCITY RULES

### Justified (Allowed)

| Type | Justification Required | Example |
|------|----------------------|---------|
| Real limited batch | Ingredient sourcing, production run | "Only 2,000 bottles per batch — sourced from high-altitude farms" |
| Real promotional period | Specific end date with reason | "Introductory pricing ends March 15 when we move to full retail" |
| Real limited stock | Inventory count with context | "47 remaining from current batch — next batch ships in 6 weeks" |
| Subscription lock | Reverts to full price | "Lock in $49/mo — regular price returns to $79/mo on [date]" |
| Pre-sale/early bird | Product launches on specific date | "Pre-order pricing available until [date]" |

### Fabricated (Forbidden)

| Pattern | Why Forbidden |
|---------|--------------|
| Fake countdown that resets on refresh | Destroys trust immediately when discovered |
| "Only 3 left!" that never changes | Sophisticated buyers see through this |
| "Sale ends tonight!" running for months | Legal liability + trust destruction |
| Generic "Act now!" with no reason | No conversion lift — just noise |
| Inflated "regular price" never actually charged | FTC deceptive pricing risk |

**The justification rule:** Every urgency/scarcity claim must have a CREDIBLE REAL-WORLD REASON or it should not be used. If no legitimate urgency exists, explicitly exclude urgency from the architecture and document why.

---

## OFFER-CTA-ARCHITECTURE.JSON SCHEMA

```json
{
  "schema_version": "1.0",
  "created": "[ISO timestamp]",
  "project_name": "[product name]",
  "page_type": "[type_a | type_b | hybrid]",

  "one_offer_rule": {
    "single_offer_confirmed": "[Y]",
    "offer_description": "[1 sentence — what the visitor is buying]",
    "competing_offers_detected": "[N — must be N to proceed]"
  },

  "offer_classification": {
    "primary_type": "[hard | soft | free_plus_shipping | limited | limited_time | oto | combination]",
    "secondary_types": ["[list if combination, else empty]"],
    "rationale": "[1-3 sentences justifying classification]"
  },

  "pricing_display": {
    "strategy": "[price_after_value | price_above_fold | hybrid_both]",
    "anchor_method": "[value_stack | strikethrough | comparison | per_day_minimizer | combination]",
    "price_points": {
      "single_unit": "[price]",
      "multi_pack": "[price per unit if applicable, else: not_applicable]",
      "subscription": "[price if applicable, else: not_applicable]",
      "trial": "[trial terms if applicable, else: not_applicable]"
    },
    "savings_display": {
      "method": "[percentage | dollar_amount | both]",
      "primary_savings_claim": "[e.g., Save 25%]"
    },
    "bundle_tiers": [
      {
        "tier_name": "[e.g., Best Value]",
        "quantity": "[e.g., 3-pack]",
        "price_per_unit": "[price]",
        "total_price": "[price]",
        "highlighted": "[Y/N — is this the recommended tier?]"
      }
    ],
    "value_stack": {
      "items": [
        {
          "name": "[item name]",
          "assigned_value": "[dollar value]",
          "description_direction": "[1 sentence — what LP-11 should emphasize]"
        }
      ],
      "total_value": "[sum of assigned values]",
      "comparison_anchor": "[what comparable service costs more]",
      "per_day_cost": "[calculated daily cost]"
    }
  },

  "guarantee": {
    "branded_name": "[specific branded guarantee name — NEVER 'money-back guarantee']",
    "duration": "[specific: 60 days, 90 days, 365 days, etc.]",
    "type": "[money_back | exchange | results_based | performance]",
    "terms": "[specific trigger conditions and claim process]",
    "visual_treatment": "[badge | certificate | seal | stamp — with design direction]",
    "placement_sections": ["[section numbers where guarantee appears]"]
  },

  "cta_architecture": {
    "total_placements": "[number — minimum 3]",
    "personalization_approach": "[how CTAs are personalized — product name, benefit, savings, audience identity]",
    "placements": [
      {
        "cta_id": "cta_1",
        "section_number": "[section number from section-sequence.json]",
        "section_name": "[section name]",
        "placement_zone": "[above_fold | early | mid_page | post_proof | pre_close | close]",
        "trigger_context": "[what the visitor just read that makes this CTA relevant]",
        "conversion_intent": "[impulse | educated | convinced | final_capture]",
        "emotional_appeals": [
          {
            "appeal_type": "[desire | transformation | consequence | belonging | risk_reversal | specificity]",
            "language_direction": "[specific direction for LP-14 — e.g., 'Communicate ownership of daily energy starting today with product name + savings amount']"
          }
        ],
        "risk_reversal_inline": "[Y/N — does this CTA include inline guarantee reference?]",
        "risk_reversal_text_direction": "[if Y: specific direction — e.g., '60-day guarantee mention beneath button']"
      }
    ],
    "sticky_mobile_cta": {
      "enabled": "[Y/N]",
      "appears_after": "[trigger — e.g., 'initial ATC scrolls out of view']",
      "elements": "[what the sticky bar contains — product name, price, rating, button]"
    }
  },

  "urgency_scarcity": {
    "included": "[Y/N]",
    "exclusion_reason": "[if N: why urgency was excluded — e.g., 'No legitimate scarcity exists for this evergreen product']",
    "types_used": [
      {
        "type": "[limited_batch | promotional_period | limited_stock | subscription_lock | pre_sale]",
        "claim": "[exact claim — e.g., 'Introductory pricing ends March 15']",
        "justification": "[real-world reason this is credible]",
        "section_number": "[where it appears]"
      }
    ]
  },

  "downstream_handoffs": {
    "lp_11_offer_pricing": "Value stack structure, pricing display strategy, bundle tier display — LP-11 writes copy for these elements",
    "lp_13_urgency_scarcity": "Urgency types, claims, and justifications — LP-13 writes urgency copy and visual treatment",
    "lp_14_cta_optimizer": "CTA placement map with emotional appeal directions — LP-14 writes final CTA button text and surrounding copy",
    "lp_15_assembly": "Full offer element positions for page assembly integration",
    "lp_17_conversion_audit": "One-offer audit results + CTA count verification for 20-point checklist"
  },

  "validation": {
    "one_offer_audit": "[PASS]",
    "architecture_consistency": "[PASS]",
    "cta_count_minimum": "[PASS — X >= 3]",
    "guarantee_branded": "[PASS — name is not generic]",
    "urgency_justified_or_excluded": "[PASS]"
  }
}
```

---

## MODEL ASSIGNMENT TABLE

| Layer | Task | Model |
|-------|------|-------|
| 0 | Input loading + verification | haiku |
| 1.1 | Offer type classification | sonnet |
| 1.2 | Pricing display strategy | sonnet |
| 1.3 | CTA strategy planning | sonnet |
| 1.4 | Guarantee architecture | sonnet |
| 2.1–2.2 | Value stack + price anchor design | sonnet |
| 2.3 | CTA placement mapping | sonnet |
| 2.4 | Urgency/scarcity planning | sonnet |
| 2.5 | CTA language direction | sonnet |
| 3.1–3.2 | Validation + one-offer audit | sonnet |
| 4 | Package assembly | haiku |

---

## FORBIDDEN BEHAVIORS

1. Allowing more than ONE offer on the page — -266% conversion penalty is absolute
2. Revealing price before value stack in Type A pages — kills anchoring psychology
3. Writing "Buy Now" or "Get Started" as CTA direction — must include personalization vector (+202% lift at stake)
4. Naming the guarantee "money-back guarantee" or "satisfaction guaranteed" — must be branded with specific terms
5. Using fabricated urgency (fake timers, fake stock counts, perpetual "sales") — destroys trust
6. Proceeding without loading page-brief.json — page type required for pricing display strategy
7. Designing CTA emotional appeals without checking awareness stage — Stage 1 audiences need different appeals than Stage 4
8. Leaving any CTA placement without 3+ emotional appeal directions — LP-14 needs specific starting points
9. Designing urgency without documented justification — every scarcity claim needs a credible real-world reason
10. Proceeding past GATE_3 with one-offer audit FAIL — this is the non-negotiable gate
11. Producing offer-cta-architecture.json without OFFER-CTA-ARCHITECTURE-SUMMARY.md and execution-log.md
12. Vague guarantee terms ("full refund if not satisfied") — must specify how to claim, what triggers, and duration
13. Skipping bundle tier design when multi-pack options exist in the offer
14. Ignoring specimen offer patterns for the vertical — load specimens and cross-reference
