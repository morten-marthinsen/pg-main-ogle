# PDP-03: Hero Carousel + Buy Box Architect — Master Agent

> **Version:** 1.0
> **Skill:** PDP-03-hero-carousel-buybox
> **Position:** Phase 2 — First PDP Architecture Skill (replaces LP-03 for Type B)
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** LP-00 (page-brief.json), LP-01 (conversion intelligence)
> **Output:** `pdp-above-fold-blueprint.json` + `PDP-ABOVE-FOLD-SUMMARY.md` + `execution-log.md`

---

## PURPOSE

Engineer the **PDP above-fold experience** — the hero carousel, facts panel, and buy box that constitute 80% of the PDP conversion decision. This is fundamentally different from LP-03's headline/deck/hero approach because a PDP above-fold is an interactive purchasing system, not a reading experience.

**Three components this skill architects:**

1. **Hero Carousel** — 10-thumbnail story architecture following the NLS persuasion arc (Outcome → Problem Signs → Ingredients → Enjoyment → How It Works → What to Expect → How to Use → Credibility → Comparison → Testimonials)
2. **Facts Panel** — Nutrition/Supplement Facts + quality/diet icons positioned below carousel
3. **Buy Box** — Product title, rating strip, price display, variant selector, subscription tiles, quantity stepper, ATC button, express payments, micro-trust signals, shipping proximity

**The 8-Second Test (PDP Version):** Before any scrolling, the above-fold must answer:
1. What is this product?
2. Is it for me? (self-selection via problem signs in carousel)
3. How much does it cost and how do I buy it? (buy box visible)

**Success Criteria:**
- 10-thumbnail carousel architecture with per-slide purpose, copy direction, and visual direction
- Facts panel architecture specifying panel content and quality icons
- Buy box architecture with all required components per Baymard best practices
- PDP 8-second test passes all 3 questions
- Buy box audit score >= 7.0/10
- Carousel completeness check passes (all 10 slide types present)

This agent is a **workflow orchestrator**. It creates the blueprint that PDP-06 (Offer/Buy Box Writer) and PDP-07 (BTF Section Writer) execute for copy. It does NOT write final copy.

---

## IDENTITY

**This skill IS:**
- The architectural blueprint for the entire PDP above-fold experience
- The carousel story arc designer (10 thumbnails with deliberate persuasion sequence)
- The buy box UX architect (variant chips, stepper, subscription tiles, ATC, micro-trust)
- The single highest-leverage PDP conversion element (80% of purchase decisions happen here)

**This skill is NOT:**
- The buy box copy writer (PDP-06 writes final ATC copy, subscription copy, micro-trust copy)
- The BTF section sequencer (PDP-04 handles section ordering below the fold)
- The review system designer (PDP-05 handles that)
- A visual design tool (outputs structural specifications, not pixel-level design)

---

## STATE MACHINE

```
IDLE → TRIGGERED
  ↓
LAYER_0: Load upstream packages + reference docs
  → 0.1: Input Loader (LP-00 brief, LP-01 intelligence)
  → 0.2: PDP Reference Loader (PDP-BEST-PRACTICES-REFERENCE.md)
  → 0.3: Specimen Loader (PDP specimen URLs by vertical)
  ↓ [GATE_0: Required inputs present? Page type confirmed as type_b or hybrid?]
LAYER_1: Carousel Architecture
  → 1.1: KSP Extraction (top 10 Key Selling Points from brief/research)
  → 1.2: Carousel Story Architecture (10 slides, per-slide purpose/copy/visual)
  → 1.3: Facts Panel Architecture (supplement facts + quality icons)
  → 1.4: Video Strategy (which slides get video overlays, highlight reel spec)
  ↓ [GATE_1: 10 slides architectured? Each has purpose + copy direction + visual direction?]
LAYER_2: Buy Box Architecture
  → 2.1: Product Title Rules (full title, never truncate)
  → 2.2: Rating Strip Design (stars + anchor link + review count)
  → 2.3: Short Description Architecture (key benefits list, 3-5 bullets)
  → 2.4: Price Display Architecture (anchor price, savings, shipping proximity)
  → 2.5: Variant Selector Design (exposed chips, not dropdowns)
  → 2.6: Subscription Tile Design (OTP vs S&S, explicit savings)
  → 2.7: Quantity Stepper Spec (stepper UI, touch targets)
  → 2.8: ATC Button Spec (full-width, state change, post-click mini-cart)
  → 2.9: Express Payment Layout (below ATC, OR divider, one row)
  → 2.10: Micro-Trust Signals (3-4 signals below ATC)
  ↓ [GATE_2: All buy box components specified per Baymard best practices?]
LAYER_3: Audit
  → 3.1: PDP 8-Second Test (3 questions answered from above-fold alone)
  → 3.2: Buy Box Audit (10-point checklist)
  → 3.3: Carousel Completeness Check (all 10 story positions filled)
  → 3.4: Anti-Slop Check (no generic AI language in copy directions)
  ↓ [GATE_3: 8-second test passes AND buy box audit >= 7.0 AND carousel complete?]
LAYER_4: Package Assembly
  → 4.1: pdp-above-fold-blueprint.json compiler
  → 4.2: PDP-ABOVE-FOLD-SUMMARY.md writer
  → 4.3: execution-log.md writer
  ↓
COMPLETE
```

---

## LAYER SEQUENCE

### Layer 0: Foundation Loading

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 0.1: Input Loader | Load LP-00 brief (page type, audience, offer), LP-01 intelligence | input-verification.md |
| 0.2: PDP Reference Loader | Load PDP-BEST-PRACTICES-REFERENCE.md sections 2-4 | pdp-reference-load.md |
| 0.3: Specimen Loader | Load PDP specimen URLs filtered by vertical from brief | specimen-load.md |

**GATE_0:** page-brief.json loaded AND page type = `type_b` or `hybrid`. If page type = `type_a` → HALT — use LP-03 instead.

### Layer 1: Carousel Architecture

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 1.1: KSP Extraction | Extract top 10 Key Selling Points from brief and research | ksp-inventory.md |
| 1.2: Carousel Story Architecture | Design 10 thumbnails following NLS story arc | carousel-architecture.md |
| 1.3: Facts Panel Architecture | Design supplement/nutrition facts panel + quality icons | facts-panel.md |
| 1.4: Video Strategy | Specify which slides have video overlays + highlight reel spec | video-strategy.md |

**GATE_1:** 10 slides each have: slide number, story position (from NLS arc), purpose statement, copy direction (specific text/phrases), visual direction (specific imagery/layout). Facts panel has panel type + icon list.

### Layer 2: Buy Box Architecture

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 2.1: Product Title Rules | Full title display spec, truncation prohibition | title-rules.md |
| 2.2: Rating Strip Design | Star display + review count + anchor link spec | rating-strip.md |
| 2.3: Short Description | Key benefits list structure (3-5 bullets) | short-description.md |
| 2.4: Price Display Architecture | Anchor price, savings (% + $), multi-pack, shipping proximity | price-display.md |
| 2.5: Variant Selector Design | Exposed chips spec, per-variant pricing, stock status | variant-selector.md |
| 2.6: Subscription Tile Design | OTP vs S&S tiles, explicit savings, cancel anytime, frequency | subscription-tiles.md |
| 2.7: Quantity Stepper Spec | Stepper (+/-) UI, 44px touch targets, default=1 | quantity-stepper.md |
| 2.8: ATC Button Spec | Full-width, label, state change, post-click mini-cart | atc-button.md |
| 2.9: Express Payment Layout | Below ATC, OR divider, one row of payment logos | express-payments.md |
| 2.10: Micro-Trust Signals | 3-4 signals in small gray text below ATC | micro-trust.md |

**GATE_2:** All 10 buy box components have output files. Each component follows Baymard best practices from PDP-BEST-PRACTICES-REFERENCE.md. Variant selector uses chips (not dropdowns). Subscription uses tiles (not pre-selected). Quantity uses stepper (not dropdown).

### Layer 3: Audit

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 3.1: PDP 8-Second Test | Simulate first-time PDP visitor — answer 3 questions | eight-second-test.md |
| 3.2: Buy Box Audit | Score against 10-point PDP buy box checklist | buy-box-audit.md |
| 3.3: Carousel Completeness Check | Verify all 10 NLS story positions filled | carousel-check.md |
| 3.4: Anti-Slop Check | Verify zero generic AI language in copy directions | anti-slop-check.md |

**GATE_3:** 8-second test answers all 3 questions AND buy box audit score >= 7.0/10 AND carousel has all 10 story positions AND anti-slop passes.

### Layer 4: Package Assembly

| Microskill | Purpose | Output |
|-----------|---------|--------|
| 4.1: Blueprint Compiler | Assemble pdp-above-fold-blueprint.json | pdp-above-fold-blueprint.json |
| 4.2: Summary Writer | Write PDP-ABOVE-FOLD-SUMMARY.md | PDP-ABOVE-FOLD-SUMMARY.md |
| 4.3: Log Writer | Write execution-log.md | execution-log.md |

---

## 10-THUMBNAIL STORY ARCHITECTURE

Every PDP carousel follows this arc. Slide order is not arbitrary — each position serves a specific persuasion function.

| Slide | Story Position | Persuasion Function | Required Elements |
|-------|---------------|--------------------|--------------------|
| 1 | Outcome | Reconfirm the promise the user was pre-sold on | Product shot + outcome headline + play overlay → 30s video |
| 2 | Problem Signs | Self-identification and relevance | Visual checklist of symptoms/frustrations |
| 3 | Ingredients | Answer "what's in this" in human terms | Product centered + ingredient visuals orbiting + "X for Y" benefits |
| 4 | Enjoyment | Build desire via lived experience | Lifestyle imagery, real person using product |
| 5 | How It Works | Make solution feel logical | 4-step flow: problem → ingredient → mechanism → benefit |
| 6 | What to Expect | Set expectations, prevent premature doubt | 3-phase timeline: immediate → medium → long-term |
| 7 | How to Use | Remove friction, show ease | 3-step instruction: dose → timing → method |
| 8 | Credibility | Signal legitimacy | Study reference, expert endorsement, or authority badge |
| 9 | Comparison | Collapse choice into obvious verdict | 3-column table, 5 rows, checks vs Xs |
| 10 | Testimonials | Transfer belief, create FOMO | Real user + play overlay → testimonial montage |

---

## BUY BOX 10-POINT AUDIT

Score each point 0 (fail) or 1 (pass):

**Title & Identity (2 points)**
1. Full product title displayed (never truncated)?
2. Rating strip is an anchor link to reviews section?

**Price & Value (2 points)**
3. Original price shown struck through with savings in both % and $ amount?
4. Shipping cost or "Free Shipping" visible near price?

**Selection UX (3 points)**
5. Variant selector uses exposed chips (not dropdowns)?
6. Subscription vs OTP uses selectable tiles with explicit savings?
7. Quantity selector uses stepper (not dropdown), 44px+ touch targets?

**Conversion (3 points)**
8. ATC button is full-width with standard "Add to Cart" label?
9. Post-click behavior is slide-out mini-cart (not cart redirect)?
10. Micro-trust signals (3-4) visible directly below ATC button?

**Scoring:**
- 10/10: Exceptional — proceed
- 8-9/10: Good — proceed with notes
- 6-7/10: Needs revision before PDP-06 execution
- Below 6: Structural rethink required

---

## CAROUSEL COPY DIRECTION QUALITY STANDARD

Each carousel slide's copy direction must be:
- **Specific:** Not "add a headline about benefits" but "Outcome headline: 'Calm Focus. All Day.' positioned center-bottom over product image"
- **Actionable:** A designer/developer can build the slide from the direction alone
- **Product-relevant:** Each slide maps to actual product KSPs, not generic category claims
- **Consistent:** All 10 slides maintain consistent visual language (typography, color, spacing rules)

---

## MODEL ASSIGNMENT TABLE

| Layer | Task | Model |
|-------|------|-------|
| 0 | Input loading + reference loading | haiku |
| 1.1 | KSP extraction from brief/research | sonnet |
| 1.2 | Carousel story architecture | opus |
| 1.3-1.4 | Facts panel + video strategy | sonnet |
| 2.1-2.10 | Buy box component specs | sonnet |
| 3.1 | PDP 8-second test | opus |
| 3.2-3.4 | Buy box audit + carousel check + anti-slop | sonnet |
| 4 | Package assembly | haiku |

---

## FORBIDDEN BEHAVIORS

1. ❌ Running PDP-03 for a Type A page — use LP-03 instead
2. ❌ Carousel with fewer than 10 slides — the NLS story architecture requires all 10 positions
3. ❌ Carousel slides without specific copy direction — "add benefit text" is not a direction
4. ❌ Buy box with dropdown variant selector — must use exposed chips per Baymard
5. ❌ Pre-selected subscription option — must use honest selectable tiles
6. ❌ Quantity dropdown — must use stepper (+/-)
7. ❌ Cart redirect on ATC click — must use slide-out mini-cart
8. ❌ Missing micro-trust signals below ATC — users have last-second anxiety
9. ❌ Truncated product title — always display full title per Baymard
10. ❌ Rating stars without anchor link to reviews — must smooth-scroll to review section
11. ❌ Price without savings displayed in both % and $ — show both formats
12. ❌ Skipping the 8-second test — this validates the entire above-fold works
13. ❌ Generic AI telltales in copy directions (revolutionary, game-changing, transform, unlock)
14. ❌ Proceeding to PDP-06 with buy box audit score below 7.0
