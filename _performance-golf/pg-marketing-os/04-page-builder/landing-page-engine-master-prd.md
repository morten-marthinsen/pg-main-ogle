# Landing Page Engine — Master PRD

**Version:** 1.0
**Created:** 2026-02-24
**Status:** Foundation Build
**Parent System:** CopywritingEngine (parallel, integrated)

---

## SYSTEM THESIS

The CopywritingEngine generates the **words** of a promotion. The Landing Page Engine generates the **container** that holds, structures, and delivers those words in a way that maximizes conversion. Great copy in a broken container converts at 2%. Great copy in an optimized container converts at 10%+.

The Landing Page Engine is NOT a replacement for the CopywritingEngine. It is the **structural execution layer** that takes CopywritingEngine outputs (copy packages) and assembles them into conversion-optimized page architectures.

**Core hierarchy (from CreativeThirst / Bobby Hewitt):**
1. **List** — Audience targeting (handled upstream, pre-engine)
2. **Offer** — Packaging, pricing, bonuses, guarantee (shared with CopywritingEngine 07-Offer)
3. **Copy** — The words themselves (CopywritingEngine Skills 10-18)
4. **Container** — The page structure, visual hierarchy, element ordering (THIS ENGINE)

**The offer has an INVERSE relationship to copy:** The stronger the offer, the weaker the copy can be. The weaker the offer, the stronger the copy must be. The Landing Page Engine amplifies offer strength through strategic structural presentation.

---

## TWO PAGE TYPES

This engine handles two fundamentally different landing page architectures:

### Type A: Long-Form Sales Page (Direct Response)
**Definition:** Story-driven, education-first pages that build belief before asking for purchase. Typically 3,000–20,000+ words. Built on the E5 framework: Engage → Educate → Excite → Encourage → Empower.

**Variants:**
- VSL landing page (video + text support)
- Magalog-style (newspaper editorial format)
- Advertorial → Sales page flow
- Long-form ecomm hybrid (extended PDP with narrative)

**Primary markets:** Health/supplements, info products, financial, personal development, high-ticket offers

**Conversion benchmark:** 2–8% for cold traffic; 8–20% for warm traffic (product-aware)

**Key examples from research vault:**
- Hormonal Harmony (menopause — long-form, heavy narrative)
- Be-Serene VSL (anxiety supplement — video-first)
- BioTrust Keto Elevate (VSL + text hybrid)
- Profits Unlimited (financial — Agora style)
- Todd Brown E5 VSL (info product)

**Structural anatomy:**
Pre-head → Headline → Deck → Lead → Story → Root Cause → Mechanism → Proof Block 1 → Product Introduction → Ingredient Deep-Dives → Proof Block 2 → Value Stack → Pricing → Guarantee → Urgency → Proof Block 3 → FAQ → Close → P.S.

### Type B: Ecomm/PDP Style Page (Direct-to-Consumer)
**Definition:** Scan-optimized, image-heavy pages where the product IS the hero and conversion happens through visual persuasion + social proof density. Above-the-fold experience is critical. Mobile-first always.

**Variants:**
- Pure ecomm PDP (Shopify-style)
- Supplement PDP with extended content below
- Hybrid (ecomm shell + long-form content module)
- DTC brand page

**Primary markets:** Supplements, beauty/wellness, food/beverage, fitness, consumer goods

**Conversion benchmark:** 2.5–5% typical; 8–15%+ top performers (Magnesium Breakthrough, Kachava level)

**Key examples from research vault:**
- Magnesium Breakthrough (reference standard — bold condensed typography, image-heavy)
- Kachava (clean DTC, subscription)
- Athletic Greens (authority + lifestyle)
- Seed Daily Symbiotic (clinical + consumer)
- Happy Mammoth Hormone Harmony (DTC ecomm)
- SkinnyFit Collagen (social proof dense)

**Structural anatomy (above-fold critical):**
Breadcrumb → H1 → Rating Strip → Hero Image → Price/Savings → ATC Primary → Trust Badges → Short Description → Key Benefits → Variant/Quantity → [FOLD] → Ingredient Deep-Dives → How It Works → Review Cascade → FAQ → Guarantee → Comparison Table → Upsell/Bundle → Sticky ATC (mobile)

---

## DATA FOUNDATION

### Conversion Benchmarks (Unbounce Q4 2024, 41K pages, 464M visitors)

| Benchmark | Value | Source |
|-----------|-------|--------|
| Median conversion rate (all industries) | 6.6% | Unbounce primary data |
| "Good" conversion rate threshold | 10%+ | Unbounce |
| Top 10% of pages capture | ~80% traffic | SeedProd |
| Ecomm typical range | 2.5–5% | Shopify |
| High-ticket sales pages (warm traffic) | 5–15%+ | Industry |
| Events/entertainment (highest) | 12.6% | Shopify India |

### Element-Level Impact Data

| Element | Lift | Source |
|---------|------|--------|
| Personalized CTAs vs generic | +202% | HubSpot |
| Video on landing pages | +86% | VWO |
| Long-form vs short-form (leads) | +220% | KlientBoost |
| Single offer vs multiple offers | -266% penalty for multiple | KlientBoost |
| Mobile-responsive vs static | +25.2% mobile conversions | VWO |
| 1-second load delay | -7% conversions | Google |
| 5th–7th grade reading level vs complex | +56% | VWO |
| Social proof placement (early) | Significant lift | CXL |
| Guarantee visibility | Significant lift | Multiple |

### The Single Most Important Rule (Source: 266% Data)
**ONE OFFER PER PAGE.** Multiple offers, multiple CTAs pointing different directions, or choice overload decimates conversions by up to 266%. Every element on the page must serve a SINGLE conversion goal.

---

## SKILL ARCHITECTURE

### Phase 1: Intelligence & Classification (3 Skills)

**LP-00: Brief & Page Type Classifier**
- Ingests product brief, audience data, CopywritingEngine outputs (if available)
- Classifies: Type A (Long-Form) or Type B (Ecomm/PDP)
- Outputs: page-brief.json with classification, audience profile, offer summary, vertical

**LP-01: Conversion Intelligence Loader**
- Loads relevant benchmark data for the classified page type + vertical
- Identifies competitive examples from swipe vault by type/vertical
- Outputs: conversion-intelligence.json with benchmarks, examples, strategic context

**LP-02: Competitive Page Audit**
- Analyzes 3–5 competitor/reference pages in the vertical
- Maps their element order, proof strategy, CTA architecture, offer framing
- Identifies what's saturated vs. what's differentiated
- Outputs: competitive-audit.json

### Phase 2: Architecture Design (4 Skills)

**LP-03: Above-Fold Architecture**
- Engineers the critical first screen (Type A: headline + hook; Type B: product + price + CTA)
- Determines: headline, subheadline, hero image strategy, trust signals, primary CTA
- For Type B: Price display, rating strip, ATC button placement
- Outputs: above-fold-blueprint.json

**LP-04: Section Sequence Planner**
- Determines the full page section order and proportion targets
- Maps each section to its persuasion function
- Specifies: section names, purpose, word count targets, visual type, proof density
- Outputs: section-sequence.json

**LP-05: Social Proof Architecture**
- Determines the proof strategy: types, placement, density, sequencing
- Maps: testimonials, star ratings, media mentions, user counts, case studies, before/afters
- Applies wave pattern (heavy early, lighter mid, heavy pre-close)
- Outputs: proof-architecture.json

**LP-06: Offer/CTA Architecture**
- Designs the pricing display, value stack, guarantee presentation
- Plans CTA count, placement, language variety (3+ minimum)
- Designs urgency/scarcity stack with justification
- Outputs: offer-cta-architecture.json

### Phase 3: Element-Level Writing (8 Skills)

**LP-07: Hero Section Writer**
- Writes: headline, deck, subheadline, pre-head, hero copy
- Type A: Lead (first 300–1,000 words) — hooks attention, opens loops
- Type B: Product title, short description, key benefits bullets
- Outputs: hero-section-package.json

**LP-08: Trust Element Generator**
- Writes: trust bar copy, media mention callouts, certification explanations
- Type B: Generates trust badge copy, trust signals for above/below fold
- Outputs: trust-elements-package.json

**LP-09: Benefits/Features Section Writer**
- Writes: benefit bullets, feature explanations, ingredient deep-dives
- Uses D-F-W-B-P (Deliverable-Feature-Why-Benefit-Proof) format from CopywritingEngine
- Outputs: benefits-section-package.json

**LP-10: Social Proof Writer**
- Writes: testimonial intros, review header copy, before/after captions
- Writes: social proof section transitions (into and out of)
- Selects/formats actual testimonials from proof inventory
- Outputs: social-proof-copy-package.json

**LP-11: Offer/Pricing Section Writer**
- Writes: pricing copy, savings callouts, multi-pack incentive copy
- Writes: value stack copy, bonus descriptions
- Uses "If all it did was..." framework
- Outputs: pricing-section-package.json

**LP-12: FAQ/Objection Crusher**
- Identifies 8–12 core objections from research
- Writes Q&A format objection handlers
- Sequences by objection strength (hardest first or hardest last depending on page type)
- Outputs: faq-package.json

**LP-13: Urgency/Scarcity Stack**
- Writes justified urgency copy (supply, time, price, availability)
- Writes scarcity support copy (stock level indicators, countdown explanations)
- Outputs: urgency-package.json

**LP-14: CTA Copy Optimizer**
- Writes 6–10 CTA variations with different emotional appeals
- CTA 1: Confidence/desire ("Get [X] Now")
- CTA 2: Consequence awareness ("Don't Wait — [Risk]")
- CTA 3: Urgency ("Claim Your [X] Before [Deadline]")
- Plus P.S. copy, final close paragraph
- Outputs: cta-copy-package.json

### Phase 4: Assembly & Optimization (4 Skills)

**LP-15: Page Assembly**
- Integrates all element packages into a complete page brief
- Writes section transitions
- Validates threading (headline promise → mechanism → close)
- Outputs: assembled-page-package.json

**LP-16: Mobile/Speed Audit**
- Reviews assembled page against mobile-first principles
- Identifies elements that hurt mobile UX (excessive text, bad CTA placement)
- Outputs: mobile-audit.json with specific fixes

**LP-17: Conversion Audit**
- Scores assembled page against conversion benchmark checklist
- Identifies highest-priority optimization opportunities
- Outputs: conversion-audit.json with priority ranking

**LP-18: A/B Test Plan**
- Generates 5–10 specific test hypotheses ranked by expected lift
- Includes: what to test, control vs. variant, predicted outcome, sample size guidance
- Outputs: ab-test-plan.json

---

## ELEMENT TAXONOMY

### Long-Form Sales Page — Complete Element Library

| # | Element | Function | Type A | Type B |
|---|---------|----------|--------|--------|
| 01 | Pre-head / Attention Getter | Micro-targeting hook before headline | Required | Optional |
| 02 | Headline (Primary) | Single most important conversion driver | Required | Required |
| 03 | Deck Copy / Subheadline | Promise expansion, curiosity deepening | Required | Required |
| 04 | Lead / Hook Copy | Opens loops, earns readership | Required | Below fold |
| 05 | Hero Image | Aspirational visual, product shot | Required | Required (above fold) |
| 06 | Trust Bar | Logos, media, certifications | Optional | Required |
| 07 | Rating Strip | Star rating + review count | Optional | Required (above fold) |
| 08 | Primary CTA Block | ATC/buy button + supporting copy | Required (below) | Required (above fold) |
| 09 | Price Display | Price, savings, multi-pack | Below fold | Required (above fold) |
| 10 | Short Product Description | 2–3 sentence benefit summary | Below fold | Required (above fold) |
| 11 | Key Benefits Bullets | Scannable benefit list | Optional | Required |
| 12 | Variant Selector | SKU/flavor/size selection | N/A | Required if variants |
| 13 | Quantity / Bundle Incentive | Buy-more-save-more | Optional | Required |
| 14 | Origin/Discovery Story | Emotional proof vehicle | Required | Optional |
| 15 | Problem Agitation | Pain amplification section | Required | Optional |
| 16 | Root Cause Narrative | Worldview-shifting revelation | Required | Optional |
| 17 | Mechanism Narrative | How/why solution works | Required | Required (below fold) |
| 18 | Ingredient Deep-Dives | Per-ingredient proof blocks | Required | Required |
| 19 | How It Works Module | Step-by-step process | Optional | Required |
| 20 | Proof Block 1 (Early) | Authority anchor, early credibility | Required | Required |
| 21 | Proof Block 2 (Mid) | Social proof density, testimonials | Required | Required |
| 22 | Proof Block 3 (Pre-close) | Transformation proof, momentum | Required | Required |
| 23 | Before/After Gallery | Transformation evidence | Optional | Required (supplements) |
| 24 | Review Cascade | Structured customer review section | Required | Required |
| 25 | Review Filtering Module | Sort by concern/result | N/A | Required |
| 26 | Value Stack / Offer Block | What you get + total value | Required | Optional |
| 27 | Pricing Block | Price + savings + multi-pack options | Required | Required |
| 28 | Guarantee Block | Branded risk reversal | Required | Required |
| 29 | Comparison Table | vs. competitors or vs. doing nothing | Optional | Recommended |
| 30 | Urgency/Scarcity Module | Time/supply pressure | Required | Required |
| 31 | FAQ / Objection Handler | Removes friction, handles doubts | Required | Required |
| 32 | Secondary CTA Block | Mid-page conversion capture | Required | Required |
| 33 | Tertiary CTA Block | Pre-close conversion capture | Required | Required |
| 34 | Close Paragraph | Final emotional push | Required | Optional |
| 35 | P.S. Section | Guarantee restatement, urgency, bonus | Required | Optional |
| 36 | Sticky ATC Bar (Mobile) | Always-visible CTA on mobile | Recommended | Required |
| 37 | Upsell/Cross-Sell Module | AOV increase | Optional | Required |
| 38 | Exit Intent Module | Last-chance capture | Optional | Optional |
| 39 | Trust Badge Footer | Satisfaction/security badges | Recommended | Required |
| 40 | Phone/Contact Trust | "Questions? Call us" | Optional | Recommended |

---

## QUALITY STANDARDS

### Conversion Audit Checklist (20-Point System)

Every assembled page must pass this audit before being considered complete:

**Above-Fold Audit (4 points)**
- [ ] 01. Headline communicates a specific, credible promise (not generic)
- [ ] 02. Hero image reflects aspirational outcome OR product in context (not stock)
- [ ] 03. Primary CTA is visible without scrolling on both desktop and mobile
- [ ] 04. Trust signals present above or immediately below fold

**Copy Quality Audit (4 points)**
- [ ] 05. Reading level 5th–7th grade (Hemingway score ≤7)
- [ ] 06. Zero generic AI telltales (revolutionary, game-changing, unlock, transform, etc.)
- [ ] 07. Single conversion goal — ONE offer, ONE CTA direction
- [ ] 08. Benefits lead, features follow (not feature dump first)

**Social Proof Audit (4 points)**
- [ ] 09. Proof appears within first 25% of page (early trust anchoring)
- [ ] 10. Proof volume appropriate to page type (Type A: 15+ testimonials; Type B: 50+ reviews)
- [ ] 11. Proof includes specific outcomes/numbers (not vague "changed my life")
- [ ] 12. Before/after format used where applicable (supplements, weight loss, etc.)

**Offer/Conversion Architecture (4 points)**
- [ ] 13. Value established BEFORE price is revealed
- [ ] 14. Guarantee is visible, branded, and specific (not generic "30-day money-back")
- [ ] 15. 3+ CTA placements on page (early, mid, pre-close minimum)
- [ ] 16. Price anchored (retail price, alternative cost, or per-day calculation)

**Mobile/Speed (4 points)**
- [ ] 17. Page load target <2 seconds (Type B) or <3 seconds (Type A)
- [ ] 18. Sticky ATC bar implemented on mobile (Type B required, Type A recommended)
- [ ] 19. All images optimized (WebP format, lazy loaded)
- [ ] 20. CTA buttons minimum 44px touch target on mobile

**Scoring:**
- 18–20: Ready to launch
- 15–17: Minor optimization needed pre-launch
- 12–14: Significant gaps — revise before launch
- Below 12: Structural rebuild required

---

## INTEGRATION WITH COPYWRITINGENGINE

### Upstream Inputs (from CopywritingEngine)

| CopywritingEngine Output | Landing Page Engine Consumer | How Used |
|--------------------------|------------------------------|----------|
| 01-research output | LP-01 (Intelligence Loader) | Audience quotes, pain/hope buckets |
| 02-proof-inventory output | LP-10 (Social Proof Writer) | Testimonials, studies, before/afters |
| 03-root-cause package | LP-07 (Hero Section), LP-15 (Assembly) | Root cause narrative for lead/story |
| 04-mechanism package | LP-09 (Benefits/Features) | Mechanism explanation for how-it-works |
| 05-promise package | LP-07 (Hero Section) | Headline territory, promise language |
| 07-offer package | LP-06, LP-11 | Offer structure, pricing, bonuses |
| 09-campaign-brief output | LP-00, LP-01 | Full campaign context, voice direction |
| 10-headlines package | LP-07 (Hero Section) | Primary headline selection |
| 11-lead package | LP-07 (Hero Section), LP-15 | Lead copy blocks |
| 12-story package | LP-15 (Assembly) | Story section |
| 13-root-cause-narrative package | LP-15 (Assembly) | Root cause section |
| 14-mechanism-narrative package | LP-15 (Assembly) | Mechanism section |
| 16-offer-copy package | LP-11, LP-15 | Offer/pricing section copy |
| 17-close package | LP-14, LP-15 | Close + CTAs |
| 18-proof-weaving package | LP-10, LP-15 | All proof blocks |
| 19-campaign-assembly package | LP-15 (Assembly) | Full assembled draft as starting point |

### Standalone Mode (No CopywritingEngine Inputs)

The Landing Page Engine can also run in **Standalone Mode** when:
- Only a product brief exists (no CopywritingEngine campaign run)
- Quick-build needed for a DTC/ecomm PDP
- Supplementing an existing page

In Standalone Mode:
- LP-00 generates a simplified brief from user input
- LP-07 generates hero copy from scratch (without CopywritingEngine packages)
- LP-09 generates benefits copy from brief
- All other skills proceed normally

---

## FILE STRUCTURE

```
04-page-builder/
├── landing-page-engine-master-prd.md          (this file)
├── landing-page-engine-master-blueprint.md    (architecture overview)
├── LANDING-PAGE-ENGINE.md                        (execution constraints))
├── element-taxonomy.md                        (complete element library)
├── swipe-vault-index.md                       (organized reference examples)
├── conversion-data-reference.md              (benchmark data)
│
├── skills/
│   ├── LP-00-brief-classifier/
│   │   ├── LP-00-AGENT.md
│   │   ├── LP-00-ANTI-DEGRADATION.md
│   │   └── skills/
│   ├── LP-01-conversion-intelligence/
│   ├── LP-02-competitive-audit/
│   ├── LP-03-above-fold-architecture/
│   ├── LP-04-section-sequence/
│   ├── LP-05-social-proof-architecture/
│   ├── LP-06-offer-cta-architecture/
│   ├── LP-07-hero-section/
│   ├── LP-08-trust-elements/
│   ├── LP-09-benefits-features/
│   ├── LP-10-social-proof-writer/
│   ├── LP-11-offer-pricing/
│   ├── LP-12-faq-objections/
│   ├── LP-13-urgency-scarcity/
│   ├── LP-14-cta-optimizer/
│   ├── LP-15-page-assembly/
│   ├── LP-16-mobile-audit/
│   ├── LP-17-conversion-audit/
│   └── LP-18-ab-test-plan/
│
├── specimens/
│   ├── long-form-sales-pages/     (Type A specimens indexed by type)
│   ├── ecomm-pdp/                 (Type B specimens indexed by type)
│   └── hybrid/                    (Hybrid examples)
│
├── swipe-vault/
│   ├── supplements/               (from Trello research)
│   ├── info-products/
│   ├── health-wellness/
│   ├── finance/
│   ├── personal-development/
│   └── ecomm-dtc/
│
└── reference/
    ├── design-principles.md
    ├── typography-reference.md
    └── visual-hierarchy.md
```

---

## BUILD PRIORITY

### Phase 1 (Foundation — Build First)
1. LP-00: Brief & Page Type Classifier
2. LP-01: Conversion Intelligence Loader
3. LP-03: Above-Fold Architecture
4. LP-04: Section Sequence Planner
5. LP-07: Hero Section Writer
6. LP-17: Conversion Audit

### Phase 2 (Core Writing Skills)
7. LP-05: Social Proof Architecture
8. LP-06: Offer/CTA Architecture
9. LP-09: Benefits/Features Section Writer
10. LP-10: Social Proof Writer
11. LP-11: Offer/Pricing Section Writer
12. LP-14: CTA Copy Optimizer

### Phase 3 (Supporting Skills)
13. LP-02: Competitive Audit
14. LP-08: Trust Element Generator
15. LP-12: FAQ/Objection Crusher
16. LP-13: Urgency/Scarcity Stack
17. LP-15: Page Assembly
18. LP-16: Mobile/Speed Audit
19. LP-18: A/B Test Plan

---

## SWIPE VAULT INDEX (FROM TRELLO RESEARCH — 2021 REFERENCE)

### Top Reference Examples by Category

**Long-Form DR Sales Pages (Type A):**
- Hormonal Harmony (menopause — long-form archetype)
- Be-Serene VSL (anxiety supplement)
- SANE Solution — Leaky Brain (anti-aging long-form)
- Keto GT (advertorial → ecomm hybrid)
- BioTrust Keto Elevate (VSL + text)
- Profits Unlimited (Agora financial VSL)
- Todd Brown E5 VSL (info product long-form)
- 1450 Income (Agora advertorial → VSL)

**Ecomm/PDP Style Pages (Type B):**
- Magnesium Breakthrough (design reference standard)
- Kachava (clean DTC subscription)
- Athletic Greens (authority + lifestyle)
- Seed Daily Symbiotic (clinical + consumer hybrid)
- Happy Mammoth Hormone Harmony (DTC ecomm)
- SkinnyFit Collagen (social proof dense)
- Rootine (personalized nutrition ecomm)
- fatty15 (anti-aging supplement DTC)

**Hybrid (Long-Form + Ecomm):**
- HANAH ONE (extended product ecomm page)
- LadyBoss Lean Protein (interstitial → ecomm)
- NightShred (ecomm hybrid)
- Dr. KellyAnn Cleanse Kit (ecomm hybrid)
- Earth Echo Golden Superfood Bliss (ecomm + story)

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-24 | Initial build. Research synthesized from: Trello DR research board (500+ landing page examples), Unbounce Q4 2024 primary data (41K pages, 464M visitors), CreativeThirst (List > Offer > Copy hierarchy), VWO/KlientBoost/SeedProd benchmark data. CopywritingEngine architecture replicated for landing page domain. |
