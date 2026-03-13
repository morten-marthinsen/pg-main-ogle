# Landing Page Engine — Master Blueprint

**Version:** 1.1
**Created:** 2026-02-24
**Updated:** 2026-03-05 — PDP Enhancement Layer (v1.0)

---

## ARCHITECTURE DIAGRAM

```
╔══════════════════════════════════════════════════════════════════════════╗
║                    LANDING PAGE ENGINE                                    ║
║                  v1.0 — Parallel to CopywritingEngine                    ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                           ║
║  ┌─────────────────────────────────────────────────────────────┐        ║
║  │ INPUTS                                                       │        ║
║  │  CopywritingEngine packages (Skills 01-19)  OR  Brief Only  │        ║
║  └──────────────────────────┬──────────────────────────────────┘        ║
║                             ↓                                            ║
║  ┌─────────────────────────────────────────────────────────────┐        ║
║  │ PHASE 1: INTELLIGENCE & CLASSIFICATION                       │        ║
║  │  LP-00: Brief Classifier → Type A or Type B                 │        ║
║  │  LP-01: Conversion Intelligence Loader                       │        ║
║  │  LP-02: Competitive Page Audit                               │        ║
║  └──────────────────────────┬──────────────────────────────────┘        ║
║                             ↓                                            ║
║  ┌─────────────────────────────────────────────────────────────┐        ║
║  │ PHASE 2: ARCHITECTURE DESIGN                                 │        ║
║  │  LP-03: Above-Fold Architecture        ← MOST IMPORTANT     │        ║
║  │  LP-04: Section Sequence Planner                             │        ║
║  │  LP-05: Social Proof Architecture                            │        ║
║  │  LP-06: Offer/CTA Architecture                               │        ║
║  └──────────────────────────┬──────────────────────────────────┘        ║
║                             ↓                                            ║
║  ┌─────────────────────────────────────────────────────────────┐        ║
║  │ PHASE 3: ELEMENT-LEVEL WRITING                               │        ║
║  │  LP-07: Hero Section Writer            ← Highest priority   │        ║
║  │  LP-08: Trust Element Generator                              │        ║
║  │  LP-09: Benefits/Features Writer                             │        ║
║  │  LP-10: Social Proof Writer                                  │        ║
║  │  LP-11: Offer/Pricing Section Writer                         │        ║
║  │  LP-12: FAQ/Objection Crusher                                │        ║
║  │  LP-13: Urgency/Scarcity Stack                               │        ║
║  │  LP-14: CTA Copy Optimizer                                   │        ║
║  └──────────────────────────┬──────────────────────────────────┘        ║
║                             ↓                                            ║
║  ┌─────────────────────────────────────────────────────────────┐        ║
║  │ PHASE 4: ASSEMBLY & OPTIMIZATION                             │        ║
║  │  LP-15: Page Assembly                                        │        ║
║  │  LP-16: Mobile/Speed Audit                                   │        ║
║  │  LP-17: Conversion Audit (20-point checklist)                │        ║
║  │  LP-18: A/B Test Plan                                        │        ║
║  └──────────────────────────┬──────────────────────────────────┘        ║
║                             ↓                                            ║
║  ┌─────────────────────────────────────────────────────────────┐        ║
║  │ OUTPUT: Complete Page Brief Package                          │        ║
║  │  • assembled-page-package.json                               │        ║
║  │  • page-brief.html (structured HTML brief)                   │        ║
║  │  • CONVERSION-AUDIT-REPORT.md                                │        ║
║  │  • AB-TEST-PLAN.md                                           │        ║
║  └─────────────────────────────────────────────────────────────┘        ║
║                                                                           ║
║  ┌─────────────────────────────────────────────────────────────┐        ║
║  │ PDP ENHANCEMENT LAYER (Type B / Hybrid only)                │        ║
║  │  When LP-00 classifies page_type = type_b or hybrid:        │        ║
║  │  PDP-03 replaces LP-03 (Hero Carousel + Buy Box Architect)  │        ║
║  │  PDP-04 replaces LP-04 (BTF Section Sequencer)              │        ║
║  │  PDP-05 replaces LP-05+LP-10 (Social Proof + Review System) │        ║
║  │  PDP-06 replaces LP-06+LP-11+LP-14 (Offer/Buy Box Writer)   │        ║
║  │  PDP-07 replaces LP-07+LP-09 partial (BTF Section Writer)   │        ║
║  │  PDP-16 replaces LP-16+LP-17 (PDP Mobile + Conversion Audit)│        ║
║  │  LP-08/09/12/15 SHARED — enhanced with PDP microskills      │        ║
║  │  See PDP-ENGINE.md for routing + loading protocol     │        ║
║  └─────────────────────────────────────────────────────────────┘        ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## TWO PAGE TYPE ANATOMIES

### Type A: Long-Form Sales Page — Section Flow

```
ABOVE FOLD ══════════════════════════════════════════════════════
  Pre-head (micro-targeting hook)
  HEADLINE (Primary — makes the core promise)
  Deck Copy (expands promise, deepens curiosity)
  Hero Image (aspirational/product-in-context)
  Trust Bar (media logos, "As Seen On", certifications)
  [Optional: Early CTA for warm traffic]

SECTION 1: LEAD / HOOK ══════════════════════════════════════════
  Purpose: Opens loops, earns continued readership
  Elements: Hook statement, agitation, curiosity gap, promise preview
  Length: 300–800 words
  Proof density: 1–2 authority signals only

SECTION 2: STORY ════════════════════════════════════════════════
  Purpose: Emotional proof vehicle — makes mechanism FEEL real
  Elements: Origin/discovery beats, Yoda figure, Cry for Help moment
  Length: 800–2,000 words
  Proof density: Embedded credibility (Yoda's credentials)

SECTION 3: ROOT CAUSE NARRATIVE ════════════════════════════════
  Purpose: Shifts worldview — "It's not your fault"
  Elements: What they think → What it really is → Why nothing worked
  Length: 500–1,200 words
  Proof density: 2–3 scientific supports woven in

SECTION 4: MECHANISM NARRATIVE ════════════════════════════════
  Purpose: The "aha moment" — why THIS solution works
  Elements: Naming moment, simple metaphor anchor, proof integration
  Length: 600–1,500 words
  Proof density: 3–5 studies/demonstrations

PROOF BLOCK 1 ════════════════════════════════════════════════
  Testimonials + early social proof cascade
  2–4 testimonials, 1 study/data point
  Transitions: "Don't take my word for it..."

SECTION 5: PRODUCT INTRODUCTION ════════════════════════════════
  Purpose: Bridges education to product — must feel inevitable
  Elements: Quest/formula story, product reveal, origin/sourcing
  Length: 400–800 words
  Proof density: 1 authority endorsement

SECTION 6: INGREDIENT/FEATURE DEEP-DIVES ════════════════════
  Purpose: Mechanism proof per ingredient — builds stack value
  Elements: D-F-W-B-P per ingredient, micro-studies embedded
  Length: 100–300 words per ingredient
  Total length: 800–3,000 words

PROOF BLOCK 2 ════════════════════════════════════════════════
  High-volume testimonial cascade (3–8 testimonials)
  Specific outcomes, names/locations, before/after where available

SECTION 7: VALUE STACK / OFFER BLOCK ════════════════════════
  Purpose: Establishes total value BEFORE price
  Elements: Product + bonuses, "If all it did was...", total value
  Length: 500–1,000 words

SECTION 8: PRICING BLOCK ═══════════════════════════════════
  Purpose: Price reveal after value is established
  Elements: Price anchor, multi-pack, per-day calculation, savings
  Length: 200–400 words
  CTA BLOCK 2 here

SECTION 9: GUARANTEE ════════════════════════════════════════
  Purpose: Eliminates all risk — makes "yes" the only logical choice
  Elements: Branded guarantee name, full details, duration, terms
  Length: 150–300 words

SECTION 10: URGENCY/SCARCITY ════════════════════════════════
  Purpose: Creates reason to act NOW
  Elements: Justified scarcity or deadline, supply context
  Length: 100–250 words

PROOF BLOCK 3 ════════════════════════════════════════════════
  Transformation proof + before/after
  Callbacks to Lead promise
  "You could be next" framing

SECTION 11: FAQ / OBJECTION HANDLER ════════════════════════
  Purpose: Removes final friction, handles doubts
  Elements: 8–12 Q&As, hardest objections included
  Length: 600–1,500 words

CTA BLOCK 3 / CLOSE ════════════════════════════════════════
  Benefit summary ("You get...")
  Binary choice / crossroads moment
  Final CTA with checkout instructions
  6–10 CTA variations throughout

P.S. ════════════════════════════════════════════════════════
  Makepeace-style: restate guarantee, add urgency, or bonus reveal
  Length: 100–200 words
```

---

### Type B: Ecomm/PDP Style Page — Section Flow

**PDP Enhancement Layer:** When LP-00 classifies `page_type = type_b` or `hybrid`, PDP skills (PDP-03 through PDP-16) replace LP skills where PDP diverges. See `PDP-ENGINE.md` for routing.

```
ABOVE FOLD ══════════════════════════════════════════════════════
  [CRITICAL — 80% of conversion decisions made here]
  Built by: PDP-03 (Hero Carousel + Buy Box Architect)

  IMAGE CAROUSEL (LEFT):
    10 product thumbnails in fixed order (NLS Story Architecture):
    T1: Outcome — product in desired-result context
    T2: Problem Signs — show the pain your product eliminates
    T3: Ingredient — hero ingredient in natural state
    T4: Enjoyment — product in moment-of-use
    T5: How It Works — mechanism visualization
    T6: What to Expect — timeline or progression
    T7: How to Use — dosage/application/routine
    T8: Credibility — certification, lab, expert
    T9: Comparison — us vs. them side-by-side
    T10: Testimonial — real customer with product
    Baymard: THUMBNAILS > dots (50-80% of users miss dot-only navigation)
    Baymard: left-column vertical thumbnails preferred on desktop

  BUY BOX (RIGHT):
    Breadcrumb navigation (trust + context)
    Product Title / H1 (NEVER truncate — Baymard: 46% misidentify if truncated)
    ★★★★★ 4.8 (2,847 reviews) — anchor-link to review section
    Short Description (2–3 sentences): Core benefit claim

    PRICE BLOCK:
      ~~$79.99~~ $59.99 (Save 25%)
      Baymard: Show BOTH percentage AND dollar savings
      Subscription tile: "Subscribe & Save 20%" (NEVER pre-selected)

    VARIANT SELECTOR:
      Exposed chips (NOT dropdown — Baymard: 60% friction with dropdowns)
      Flavor/Size/Color as clickable chips

    QUANTITY SELECTOR:
      Stepper (+/-) control (NEVER dropdown — Baymard UX finding)
      Bundle incentive copy: "Save more with a 3-pack"

    ATC BUTTON — Full-width, high contrast, action-verb:
      [ADD TO CART — SAVE 25% TODAY]
      Triggers slide-out mini-cart (NEVER redirect to cart page)

    MICRO-TRUST SIGNALS (below ATC):
      Shield icon + "60-Day Money-Back Guarantee"
      Truck icon + "Free Shipping on Orders $50+"
      Lock icon + "Secure Checkout"
      3-5 signals max, icon + 3-5 word phrase each

  FACTS PANEL (BELOW BUY BOX):
    6-8 scannable fact chips (icon + stat/claim)
    Example: "10mg Melatonin" | "Non-GMO" | "3rd Party Tested"

BTF SECTIONS (Below The Fold) ════════════════════════════════
  Built by: PDP-04 (sequence), PDP-07 (copy), shared LP skills (trust, FAQ)
  Sequenced by PDP-04 BTF Section Sequencer (10-Thumbnail NLS order)

SECTION 1: PRODUCT HIGHLIGHTS ═══════════════════════════════
  What to expect section — benefits in scan-optimized format
  4-6 icon + benefit statement pairs
  Length: 50-100 words

SECTION 2: EXPERT SECTION ═══════════════════════════════════
  Expert endorsement with credential-lead naming
  1-2 paragraphs + optional video direction brief
  Built by: LP-08 PDP Expert Section Writer (2.7)

SECTION 3: INGREDIENTS / FEATURES ═══════════════════════════
  3-8 key ingredients in card layout
  Each: "X for Y" naming + mechanism + proof claim
  Built by: LP-09 PDP Ingredient Card Writer (2.6)
  Length: 100-200 words per ingredient

SECTION 4: HOW IT WORKS ═══════════════════════════════════
  3-5 numbered steps with icons
  Visual format: icon + step title + 1-sentence explanation
  Length: 200-400 words

SECTION 5: PROBLEM/SOLUTION LOGIC ═══════════════════════════
  Root cause → mechanism → product link
  Length: 300-600 words

SECTION 6: COMPARISON CHART ═══════════════════════════════
  Us vs. Competitors vs. Alternative approaches
  Checkmarks for features we have, X for features they don't
  Length: 1 table, 5-8 comparison rows

SECTION 7: SOCIAL PROOF + REVIEWS ═══════════════════════════
  Built by: PDP-05 (Social Proof + Review System)
  Rating histogram + keyword filters + featured reviews
  UGC video carousel + Q&A section
  Minimum 15-25 featured reviews
  Filter by: Concern / Rating / Verified

SECTION 8: FAQ (ACCORDION) ═══════════════════════════════════
  Built by: LP-12 PDP FAQ microskills (1.4 + 2.5)
  5-7 curated questions (Baymard: top 5-7, NOT 10+)
  Accordion-only format (NEVER inline/open-by-default)
  Focus: Pre-purchase objections

SECTION 9: GUARANTEE ═══════════════════════════════════════
  Branded guarantee block with icon/badge
  Full details + visual certificate treatment

SECTION 10: IDENTITY MATCHING ══════════════════════════════
  "Is this for me?" self-selection section
  3-4 persona archetypes with checkmarks

STICKY ATC BAR (MOBILE) ════════════════════════════════════
  Always visible on mobile scroll
  Product name + star rating + price + ATC button
  Appears after initial ATC button scrolls out of view
  Baymard: highest-impact single mobile conversion change
```

---

## ABOVE-FOLD PRINCIPLE (The Most Important Section)

Research shows that 70–80% of visitors make their stay/leave decision in the first 5 seconds. The above-fold section must answer THREE questions instantly:

1. **"What is this?"** — Clear product/offer identity
2. **"Who is this for?"** — Audience self-selection
3. **"Why should I care?"** — Core benefit promise

**Type A Above-Fold hierarchy:**
1. Headline (primary promise — most tested element)
2. Deck copy (promise expansion)
3. Hero image (aspiration or credibility)
4. Trust signals (authority anchors)

**Type B Above-Fold hierarchy:**
1. Product image (large, lifestyle)
2. Product title + rating strip (immediate credibility)
3. Price + savings (value signal)
4. ATC button (conversion capture)
5. Trust badges (risk removal)

**The 8-Second Rule (Type B):**
A first-time visitor to a PDP must be able to answer "What does this do and why should I buy it?" in 8 seconds from above-fold alone. If they can't, the fold fails.

---

## SOCIAL PROOF ARCHITECTURE

### Wave Pattern (Type A — Long-Form)

```
LEAD SECTION:        Light proof (1-2 authority signals)
STORY/ROOT CAUSE:    Embedded proof (expert quotes, study mentions)
MECHANISM:          Dense proof (3-5 clinical supports)
PROOF BLOCK 1:      First testimonial wave (2-4 testimonials)
PRODUCT INTRO:      Authority endorsement (1 key testimonial)
INGREDIENT SECTION: Per-ingredient micro-proof
PROOF BLOCK 2:      Heavy testimonial cascade (5-8 testimonials)
OFFER SECTION:      Value testimonial ("Worth every penny")
CLOSE/PROOF BLOCK 3: Transformation proof + callbacks
```

### Density Pattern (Type B — Ecomm)

```
ABOVE FOLD:         Rating strip + review count (immediate)
SECTION 1:          Social counter ("50,000+ customers")
INGREDIENT SECTION: Per-ingredient proof claims
REVIEW SECTION:     25-50+ featured reviews with filtering
GUARANTEE SECTION:  Proof of confidence (back with guarantee)
```

### Proof Hierarchy by Persuasiveness

1. **Clinical studies** (most persuasive for health) — "In a double-blind study..."
2. **Expert endorsements** — Named MD/expert with credentials
3. **Specific before/after results** — Named person, specific outcome, timeframe
4. **Photo testimonials** — Image + words + specific result
5. **Social proof volume** — Numbers, star ratings, user counts
6. **Text testimonials** — Words only (least persuasive but still valuable)

---

## DESIGN PRINCIPLES (Reference Standards)

### Typography (from memory preferences)

**Headlines:**
- Font: Oswald, Barlow Condensed, or similar bold condensed sans-serif
- Weight: 700–900
- NEVER: Playfair Display, DM Sans, thin/serif fonts
- Reference: magnesiumbreakthrough.com headline style

**Body Copy:**
- Font: Clean sans-serif (Inter, Source Sans, Open Sans)
- Size: 16–18px for optimal readability
- Line height: 1.6–1.8
- Max width: 680–750px for body text columns

**CTAs:**
- Font: Same as headlines but all-caps or heavy weight
- Size: 18–22px
- Padding: Generous (16px top/bottom, 32px sides minimum)

### Color Principles

**CTA Button:**
- High contrast against page background
- Test: Orange, green, red/coral for supplement pages
- Never: Same color as background or other elements

**Price Block:**
- Sale price: Larger, accent color (red, orange, or brand accent)
- Original price: Struck through, smaller, muted gray

**Trust Badges:**
- Consistent, professional treatment (not scattered clip art)
- Group together in a single bar

### Image Principles (Critical for Type B)

**Hero Product Image:**
- Show product in lifestyle context (not white background)
- Show desired outcome/result (aspirational)
- High resolution — at least 2x for retina displays

**Ingredient Images:**
- Real photography of actual ingredients (not icons)
- Source: high-quality stock or original photography
- Show ingredient in natural state (ashwagandha root, not pill)

**Testimonial Images:**
- Real customer photos dramatically outperform stock
- Before/after: Side-by-side with consistent lighting
- No "stock photo faces" — destroys credibility

---

## CTA OPTIMIZATION

### The 3-CTA Minimum Rule

Every landing page must have at minimum:
- **CTA 1 (Early):** For warm/ready-to-buy visitors — above fold or within first 25%
- **CTA 2 (Mid-page):** For visitors who need more proof — around value stack
- **CTA 3 (Pre-close):** Final conversion capture before P.S. or page end

### CTA Language Framework (6 Emotional Appeals)

| Appeal | Example | When to Use |
|--------|---------|-------------|
| Desire/Confidence | "Get [X] — Start Today" | Primary CTA |
| Transformation | "Start My [X] Journey" | Aspirational, post-story |
| Consequence | "Don't Miss Out — [Urgency]" | Mid-page, urgency section |
| Belonging | "Join [N] People Who [X]" | After social proof |
| Risk Reversal | "Try [X] Risk-Free Today" | Near guarantee section |
| Specificity | "Claim My [X] — 20% Off Today" | Urgency + personalization |

### Personalized CTAs (+202% lift)

Where possible, adapt CTA to:
- Traffic source (Facebook ad → "Get Your Facebook Exclusive Deal")
- Gender targeting ("Get Your Women's Formula")
- Concern targeting ("Start Relieving [Specific Symptom]")

---

## OFFER PRESENTATION ARCHITECTURE

### Price Reveal Sequence (Type A — Long-Form)

1. **Value Stack First** — List everything they get + individual values
2. **Total Value Statement** — "Total value: $297"
3. **Comparison Anchor** — "A single month with a dietitian costs $300+"
4. **Per-Day Minimizer** — "That's less than a cup of coffee at $X.XX/day"
5. **Price Reveal** — "Today, your investment is just [price]"
6. **Multi-Pack Incentive** — "Save even more with a 3-month supply"

### Price Display Hierarchy (Type B — Ecomm)

```
~~$79.99~~  $59.99 (SAVE 25%)
                    ↑
              High contrast
              accent color

[BUY 3 GET 1 FREE — BEST VALUE]  ← Bundle incentive immediately visible
[BUY 2 SAVE 15%]
[BUY 1 — $59.99]
```

### Guarantee Architecture

**Required elements:**
1. Branded name (NOT "money-back guarantee" — EVER)
2. Duration (60 days, 90 days, 365 days)
3. Specific terms (what triggers the guarantee)
4. How to claim (easy process, no questions asked)
5. Visual treatment (badge/certificate design)

**Examples of branded guarantees:**
- "The [X] Total Transformation Guarantee"
- "The 90-Day Complete Confidence Promise"
- "The [Product] Works or You Pay Nothing"

---

## URGENCY/SCARCITY PRINCIPLES

### Justified vs. Fabricated

**Justified urgency/scarcity (allowed):**
- Real limited batch production (ingredient sourcing)
- Real promotional period with specific end date
- Real limited stock count
- Subscription pricing that reverts to full price
- Pre-sale/early bird pricing

**Fabricated urgency (destroys trust):**
- Fake countdown timers that reset on page refresh
- "Only 3 left!" that never changes
- "Sale ends tonight!" that runs for months
- Generic "Act now!" with no reason

**The justification rule:** Every scarcity/urgency claim must have a CREDIBLE REAL-WORLD REASON or it should not be used. Sophisticated buyers see through manipulation instantly.

---

## A/B TEST PRIORITY FRAMEWORK

### Highest-Impact Tests (Run These First)

| Test | Predicted Lift | Why |
|------|---------------|-----|
| Headline variation | 30–100% | Most-tested element with highest variance |
| Hero image: product vs. person vs. outcome | 15–50% | Context changes purchase psychology |
| CTA button color | 10–35% | High-contrast colors outperform blend-in |
| Above-fold layout: VSL vs. text | 20–60% | Traffic source dependent |
| Price display: multi-pack vs single | 15–40% | Bundle framing changes AOV and CVR |
| Guarantee placement: early vs. late | 10–25% | Risk removal earlier reduces bounce |
| Social proof position: before vs. after mechanism | 10–30% | Trust before education vs. after |
| Mobile vs. desktop specific CTAs | 15–25% | Mobile intent vs. desktop intent differ |

### Testing Protocol

1. **One variable at a time** — Never test 2+ elements simultaneously
2. **50/50 traffic split** — Unless strong reason for asymmetric split
3. **Statistical significance** — Wait for 95%+ confidence before declaring winner
4. **Sample size requirement** — Minimum 200 conversions per variant
5. **Holdout period** — Run for at least 2 weeks to account for day-of-week effects

---

## SKILL BUILD STATUS

### Core LP Skills (19/19 Built)

| Skill | Status | Priority |
|-------|--------|----------|
| LP-00: Brief Classifier | Built | P1 |
| LP-01: Conversion Intelligence | Built | P1 |
| LP-02: Competitive Audit | Built | P3 |
| LP-03: Above-Fold Architecture | Built | P1 |
| LP-04: Section Sequence | Built | P1 |
| LP-05: Social Proof Architecture | Built | P2 |
| LP-06: Offer/CTA Architecture | Built | P2 |
| LP-07: Hero Section Writer | Built | P1 |
| LP-08: Trust Elements | Built + PDP Enhanced | P3 |
| LP-09: Benefits/Features | Built + PDP Enhanced | P2 |
| LP-10: Social Proof Writer | Built | P2 |
| LP-11: Offer/Pricing | Built | P2 |
| LP-12: FAQ/Objections | Built + PDP Enhanced | P3 |
| LP-13: Urgency/Scarcity | Built | P3 |
| LP-14: CTA Optimizer | Built | P2 |
| LP-15: Page Assembly | Built + PDP Enhanced | P3 |
| LP-16: Mobile Audit | Built | P3 |
| LP-17: Conversion Audit | Built | P1 |
| LP-18: A/B Test Plan | Built | P3 |

### PDP Enhancement Layer (6/6 Built — Type B / Hybrid only)

| Skill | Replaces | Status | Files |
|-------|----------|--------|-------|
| PDP-03: Hero Carousel + Buy Box Architect | LP-03 | Built | 26 |
| PDP-04: BTF Section Sequencer | LP-04 | Built | 21 |
| PDP-05: Social Proof + Review System | LP-05, LP-10 | Built | 21 |
| PDP-06: Offer/Buy Box Writer | LP-06, LP-11, LP-14 | Built | 21 |
| PDP-07: BTF Section Writer | LP-07, LP-09 (partial) | Built | 23 |
| PDP-16: PDP Mobile + Conversion Audit | LP-16, LP-17 | Built | 21 |

**LP Skills with PDP Enhancements:**
| Skill | New PDP Microskills | Purpose |
|-------|-------------------|---------|
| LP-08 | 2.6 PDP Trust Badge Writer, 2.7 PDP Expert Section Writer | Buy box badges + expert endorsement |
| LP-09 | 2.6 PDP Ingredient Card Writer, 2.7 PDP Microscript Writer, 2.8 PDP Vertical Layout Writer | "X for Y" cards + scan microscripts + layout spec |
| LP-12 | 1.4 PDP FAQ Curation, 2.5 PDP Accordion FAQ Writer | Baymard top 5-7 + accordion format |
| LP-15 | 0.5 PDP Package Loader, 2.5 PDP Page Assembler, 3.4 PDP Assembly Validator | PDP routing + assembly + validation |
