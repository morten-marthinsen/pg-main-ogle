# Upsell Engine — UPSELL-ENGINE.md

**Version:** 1.3
**Created:** 2026-02-26
**Updated:** 2026-02-26
**Purpose:** Institutional memory and execution constraints for Upsell Engine sessions. This is the master instruction file for the Upsell Engine subsystem of the CopywritingEngine.

---

## TABLE OF CONTENTS

- [THE 5 LAWS (Never Scroll Past This)](#the-5-laws-never-scroll-past-this)
- [CRITICAL: READ THIS FIRST](#critical-read-this-first)
- [THE CORE PROBLEM: UPSELL-SPECIFIC DEGRADATION PATTERNS](#the-core-problem-upsell-specific-degradation-patterns)
- [ARCHITECTURE OVERVIEW](#architecture-overview)
- [UPSELL SEQUENCE ARCHITECTURE](#upsell-sequence-architecture)
- [ORDER BUMP ARCHITECTURE (U1)](#order-bump-architecture-u1)
- [1-CLICK UPSELL ARCHITECTURE (U2)](#1-click-upsell-architecture-u2)
- [DOWNSELL ARCHITECTURE (U3)](#downsell-architecture-u3)
- [SEQUENCE NARRATIVE THREADING (U4)](#sequence-narrative-threading-u4)
- [WHEN EXECUTING](#when-executing)
- [SPECIMEN VAULT](#specimen-vault)
- [SKILL BUILD STATUS](#skill-build-status)
- [VERSION HISTORY](#version-history)

---

## THE 5 LAWS (Never Scroll Past This)

1. **The upsell is NOT a sales page.** Post-purchase psychology is fundamentally different from pre-purchase. The buyer already said yes. You're extending the logic of that yes — not starting a new persuasion sequence. If your upsell reads like a front-end sales page, you've failed.
2. **Congruence is everything.** The upsell must feel like a natural extension of what they just bought. The mechanism, the language, the promise — all continuous. An upsell that introduces a completely new problem or mechanism breaks the buyer's momentum and kills conversion.
3. **Speed kills (in a good way).** Order bumps: 50-150 words. Upsells: 500-2000 words. Downsells: 300-1000 words. These are NOT long-form copy. The buyer is in motion. Get to the point. Every extra word is friction.
4. **Yes-or-No architecture, not persuasion architecture.** The upsell frame is: "You already decided X. This makes X work better/faster/more completely. Yes or no?" It's a decision, not a sales pitch. Reminder → Extension → Offer → Binary Choice.
5. **Descending commitment, ascending value.** Each step in the upsell sequence asks LESS (lower price, simpler decision) while delivering MORE per dollar (better deal, bonus stack, complementary completion). The sequence rewards continued buying.

---

## CRITICAL: READ THIS FIRST

This file exists because **upsell copy has its own degradation patterns** distinct from front-end long-form copy. The failures are predictable:

1. **Upsells become mini sales pages** — full problem-agitation-solution-offer structure crammed into 500 words. The buyer already bought. They don't need to be convinced the problem exists.
2. **No congruence with front-end** — upsell introduces new mechanism, new language, new promise. Feels like a different product from a different company.
3. **Order bumps are too long** — 300+ words on a checkbox. Nobody reads that. 50-150 words. Period.
4. **Downsells are just cheaper upsells** — the downsell should reframe, not just discount. "Can't commit to the full program? Here's the essential core."
5. **The sequence has no arc** — each upsell is isolated. No narrative thread connecting purchase → bump → upsell → downsell. No momentum building.
6. **Price anchoring is missing** — the upsell price should feel like a steal relative to what they just paid. If main offer is $47 and upsell is $197, the anchoring is inverted.

**This file is the fix.** Before executing ANY Upsell Engine skill, read the relevant sections below.

---

## THE CORE PROBLEM: UPSELL-SPECIFIC DEGRADATION PATTERNS

### Pattern 1: The Mini Sales Page
The model writes a complete Problem → Agitation → Solution → Proof → Offer → Close sequence for the upsell. This is wrong. The buyer already accepted the problem and solution when they bought the front-end. **The fix:** Upsell copy uses a Reminder → Extension → Offer → Choice structure. Remind them of what they just decided. Extend the logic. Present the offer. Binary choice.

### Pattern 2: The Congruence Break
The model treats the upsell as an independent product with its own positioning. New mechanism name, new root cause framing, new promise language. **The fix:** U0 (Strategist) maps the congruence thread from front-end to each upsell. Every upsell must reference the front-end mechanism by name, use the same root cause language, and extend (not replace) the promise.

### Pattern 3: The Verbose Order Bump
The model writes 300-500 words for an order bump because it treats it like a micro-upsell. Order bumps are checkbox copy on the order form. The buyer's attention is on completing their purchase. **The fix:** Hard 150-word maximum. 3 elements only: what it is, why now, price. No story, no proof cascade, no stacking.

### Pattern 4: The Undifferentiated Downsell
The model makes the downsell a cheaper version of the upsell with the same copy shortened. This wastes the downsell opportunity. **The fix:** Downsells REFRAME the offer. Different angle, different entry point, different value proposition — not just "same thing, less stuff, lower price."

### Pattern 5: The Disconnected Sequence
Each upsell in the sequence feels standalone — no callbacks, no narrative thread, no momentum arc. **The fix:** U4 (Assembler) validates cross-page narrative threads. The sequence must feel like one continuous decision flow, not independent sales pages.

### Pattern 6: The Inverted Anchor
Upsell price is higher than front-end, or not properly anchored against what they just paid. **The fix:** U0 (Strategist) maps the pricing cascade: front-end price → order bump (10-30% of FE) → upsell 1 (50-150% of FE) → downsell (30-50% of upsell) → upsell 2 (if any).

### Anti-Degradation Protocol (Upsell-Specific)

```
WHEN YOU NOTICE YOURSELF:
- Writing a full PAS structure for an upsell → STOP. Use Reminder → Extension → Offer → Choice.
- Introducing a new mechanism name → STOP. Check front-end mechanism. Extend it.
- Writing 200+ words for an order bump → STOP. 150 words max. 3 elements.
- Making the downsell a "lite" upsell → STOP. Reframe the offer angle.
- Each page feeling standalone → STOP. Check narrative threading.
- Upsell price > front-end price without justification → STOP. Check pricing cascade.
- Using "imagine" or "picture this" → STOP. Buyer is in motion, not in a buying trance.

IF CONTEXT IS LARGE:
- This does NOT excuse PAS structure in upsells
- This does NOT excuse congruence breaks
- This does NOT excuse verbose order bumps
- Request continuation rather than compressing quality
```

---

## ARCHITECTURE OVERVIEW

The Upsell Engine is a 6-skill pipeline that generates post-purchase upsell sequences — always downstream from the Main Pipeline (Skills 01-09, especially Skill 07 Offer).

### Skill Pipeline

```
U0: Upsell Strategist
  → Analyzes offer stack, assigns positions, maps pricing cascade
  → Outputs upsell strategy YAML

U1: Order Bump Writer
  → Writes 50-150 word checkbox copy
  → No Arena (too short for competitive generation)
  → Outputs order-bump-copy.md

U2: 1-Click Upsell Writer
  → Writes 500-2000 word post-purchase upsell page
  → Arena: generative_full_draft mode
  → Outputs upsell-page-draft.md

U3: Downsell Writer
  → Writes 300-1000 word downsell page (if upsell declined)
  → Arena: generative_full_draft mode (shortened)
  → Outputs downsell-page-draft.md

U4: Upsell Sequence Assembler
  → Assembles full sequence + cross-page narrative validation
  → No Arena
  → Outputs upsell-sequence-assembled.md

U5: Upsell Editorial
  → Quality review across entire sequence
  → Arena: editorial_revision mode
  → Outputs upsell-sequence-final.md
```

### Dependency Chain

```
Skill 07 (Offer Stack) ──→ U0 (Strategy) ──→ U1 (Order Bump)
                                           ──→ U2 (Upsell Writer) ──→ U3 (Downsell)
                            U1 + U2 + U3  ──→ U4 (Assembler) ──→ U5 (Editorial)
```

### Integration Points

| From | To | What Passes |
|------|-----|------------|
| Skill 07 (Offer) | U0 | offer-package.json (price points, bonuses, guarantee, value stack) |
| Skill 09 (Campaign Brief) | U0 | campaign-brief.json (audience, tone, constraints) |
| Skill 04 (Mechanism) | U2 | mechanism-package.json (mechanism name, explanation, proof) |
| Skill 12 (Story) | U2 | story elements for narrative callbacks |
| LP-06 (CTA Architecture) | U2 | CTA patterns and page structure |
| U4 (Assembler) | E0 (Email) | upsell-sequence.yaml (for follow-up email strategy) |

---

## UPSELL SEQUENCE ARCHITECTURE

### Standard Funnel Structure

```
ORDER FORM
  └── Order Bump (U1): checkbox on order form, 50-150w
         ↓ [purchase completes]
      Upsell Page 1 (U2): 1-click, 500-2000w
         ├── YES → Upsell Page 2 (U2, optional)
         │            ├── YES → Thank You
         │            └── NO → Downsell 2 (U3) → Thank You
         └── NO → Downsell Page 1 (U3): 300-1000w
                    └── YES/NO → Thank You
```

### Position Types

| Position | Copy Length | Decision Time | Pricing Rule |
|----------|-----------|---------------|-------------|
| Order Bump | 50-150 words | 5-10 seconds | 10-30% of front-end price |
| Upsell 1 | 500-2000 words | 30-90 seconds | 50-150% of front-end price |
| Downsell 1 | 300-1000 words | 20-60 seconds | 30-50% of upsell 1 price |
| Upsell 2 | 500-1500 words | 30-60 seconds | 30-100% of front-end price |
| Downsell 2 | 300-800 words | 15-45 seconds | 30-50% of upsell 2 price |

### Congruence Thread (MANDATORY)

Every piece in the sequence must reference:
1. **The mechanism** — by name, as established in front-end
2. **The root cause** — same language, not reframed
3. **The promise** — extended, not replaced
4. **The buyer's decision** — "You just made a smart decision because..."

---

## ORDER BUMP ARCHITECTURE (U1)

### 3-Element Structure (50-150 words)

```
1. WHAT IT IS: [product/bonus name + one-sentence value prop]
2. WHY NOW: [why adding it at checkout makes sense — momentum, pricing, completeness]
3. PRICE: [price with anchor to main offer value]
```

### Order Bump Templates

| Template | When to Use | Example Hook |
|----------|------------|--------------|
| Completeness | Product needs an add-on to work fully | "Add [X] and get the complete system" |
| Accelerator | Speeds up results from main product | "Get results 2x faster with [X]" |
| Insurance | Protects the investment just made | "Protect your investment with [X]" |
| Exclusive | Only available at this moment | "Only available at checkout — [X]" |

### Hard Constraints
- **Maximum 150 words.** No exceptions.
- **No story structure.** This is checkbox copy.
- **No proof cascade.** One proof element maximum (social proof number or authority claim).
- **Price must be visually smaller than main offer.** Reader should feel "that's nothing."

---

## 1-CLICK UPSELL ARCHITECTURE (U2)

### 4-Part Structure (500-2000 words)

```
1. CONGRATULATIONS + REMINDER (50-100w)
   → Validate their purchase decision
   → Name the mechanism/product they just bought
   → "You just secured [X]..."

2. EXTENSION (200-800w)
   → "The one thing that makes [X] work even better..."
   → Extend the mechanism logic
   → Bridge from what they bought to what you're offering
   → Light proof (1-2 elements, not a proof cascade)

3. OFFER (100-300w)
   → Product/service description
   → Value stack (brief)
   → Price with anchor
   → Guarantee (mirror or extend front-end guarantee)

4. BINARY CHOICE (50-100w)
   → "Yes, add [X] to my order for just $[price]"
   → "No thanks, I'll pass on this special offer"
   → No guilt. No manipulation. Clean binary.
```

### Tone Shift (Critical)
Front-end copy: conviction, urgency, persuasion.
Upsell copy: **celebration, logic, extension.** They already bought. You're not convincing them of a problem — you're offering a better version of the solution they already chose.

---

## DOWNSELL ARCHITECTURE (U3)

### Reframe Strategy (NOT Just Cheaper)

| Reframe Type | Description | Example |
|-------------|-------------|---------|
| Core Extract | Just the essential component of the upsell | "Just the quick-start guide — skip the advanced modules" |
| Payment Plan | Same product, spread payments | "Split it into 3 easy payments of $[X]" |
| Lite Version | Reduced scope, same mechanism | "The 7-day version instead of the 30-day program" |
| Different Format | Same content, different delivery | "Get the audio version instead of video + audio" |

### 3-Part Structure (300-1000 words)

```
1. ACKNOWLEDGE (50-100w)
   → "I completely understand..."
   → No guilt, no pressure
   → Validate their hesitation

2. REFRAME (150-500w)
   → Present the alternative angle
   → Different value proposition (not just "less")
   → Why this version might actually be better for them right now

3. OFFER + CHOICE (100-200w)
   → Clear offer with price
   → "Yes, I'll take [X]" / "No thanks"
   → Even cleaner binary than upsell
```

---

## SEQUENCE NARRATIVE THREADING (U4)

### Mandatory Thread Elements

| Thread | What to Track | Minimum Occurrences |
|--------|-------------|---------------------|
| Mechanism Name | Same name used across all pages | Every page |
| Root Cause Reference | "Because [root cause]..." | 3+ across sequence |
| Promise Extension | Each step adds to the promise | Every page |
| Buyer Validation | "You made the right choice" | Every page open |
| Price Anchoring | Reference back to main purchase value | Upsell + downsell |

### Narrative Arc

```
Order Form: "You're getting [mechanism] to solve [problem]"
Order Bump: "Complete the [mechanism] system"
Upsell 1: "Make [mechanism] work even better/faster"
Downsell 1: "Start with the core of [mechanism]"
Thank You: "Here's how to get the most from [mechanism]"
```

---

## WHEN EXECUTING

1. READ `05-upsells/UPSELL-ENGINE.md` (this file)
2. READ the skill's ANTI-DEGRADATION.md
3. READ the skill's AGENT.md
4. READ each microskill .md spec BEFORE executing
5. FOLLOW all gates exactly
6. For U2/U3/U5: Also READ ~system/ARENA-PROTOCOL.md

---

## SPECIMEN VAULT

**Total Specimens:** 26 (in `specimens/system-2/UPSELL-specimen-index.md`)
**Verticals:** Golf (14), Health/Supplement (6), Credit Repair (1), Real Estate (1), Diet (2), Dating (1), Finance (2), Survival (1), Crypto (1)
**Sources:** Performance Golf (14), Justin Goff teaching collection (8), Sculpt Nation (1), ProvaSlim (1), Other (2)

### Key Specimen Findings (Top 5)

1. **CAIRO is universal.** All 26 specimens follow Congratulate-Amplify-Intrigue-Reason-Offer regardless of vertical. US-21 (Credit Repair) and US-26 (Tinder) are the gold standard — same copywriter, same template, different verticals, both 30-50% conversion.

2. **Done-for-you converts highest.** 30-50% conversion rates per Goff data. DFY formula: survey → discovery → solution → test group proof → offer. US-21, US-22, US-26.

3. **Video scripts can exceed 2000w.** OLOF data shows +39% conversion from longer videos. US-21 (2,800w), US-24 (3,400w), US-26 (4,000w). U2 engine handles this via EXTENDED_VIDEO flag.

4. **Loss leader funnels break FE-relative pricing.** US-28 is $497 on $14.95 FE (33x). U0 handles this via LOSS_LEADER_MODE.

5. **Warehouse-mistake scarcity template** is a reusable pattern for physical products (US-23, US-28). Structure: warehouse setting → supplier "mistake" → countdown timer → two-presenter handoff.

---

## SKILL BUILD STATUS

| Skill | Status | Files | Built |
|-------|--------|-------|-------|
| U0 — Upsell Strategist | BUILT | AGENT.md + ANTI-DEGRADATION.md + 11 microskills | 2026-02-26 |
| U1 — Order Bump Writer | BUILT | AGENT.md + ANTI-DEGRADATION.md + 6 microskills | 2026-02-26 |
| U2 — 1-Click Upsell Writer | BUILT | AGENT.md + ANTI-DEGRADATION.md + ARENA-LAYER.md + 14 microskills | 2026-02-26 |
| U3 — Downsell Writer | BUILT | AGENT.md + ANTI-DEGRADATION.md + ARENA-LAYER.md + 8 microskills | 2026-02-27 |
| U4 — Upsell Sequence Assembler | BUILT | AGENT.md + ANTI-DEGRADATION.md + 8 microskills | 2026-02-27 |
| U5 — Upsell Editorial | BUILT | AGENT.md + ANTI-DEGRADATION.md + ARENA-LAYER.md + 9 microskills | 2026-02-27 |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.3 | 2026-02-27 | U3 (Downsell Writer) + U4 (Upsell Sequence Assembler) + U5 (Upsell Editorial) BUILT — 33 new files. U3: 5 layers, 8 microskills, Arena (generative_full_draft), ARO structure (Acknowledge→Reframe→Offer), 7 reframe-focused competitors, 4 reframe types. U4: 3 layers, 8 microskills, no Arena, 5 parallel validators (Sequence, Narrative Thread, Congruence Chain, Pricing Cascade, Speed), dual handoff (U5 + E0). U5: 4 layers, 9 microskills, Arena (editorial_revision), 7 upsell-specific editorial lenses, S1-S5 sequence-level criteria, 7.5 minimum threshold. Upsell Engine 6/6 = 100%. |
| 1.2 | 2026-02-26 | Specimen vault expanded 18→26 (8 Goff specimens across 8 new verticals). Key integrations: EXTENDED_VIDEO flag for video scripts >2000w, LOSS_LEADER_MODE for low-FE funnels, DFY priority in U0, done-for-you narrative arc in U2. |
| 1.1 | 2026-02-26 | U1 (Order Bump Writer) + U2 (1-Click Upsell Writer) BUILT — 25 new files. U1: 3 layers, 6 microskills, no Arena, 50-150w checkbox copy, 5-7 variants. U2: 5 layers, 14 microskills, Arena (generative_full_draft), CAIRO structure, 7 upsell-specific competitors, congruence scoring. |
| 1.0 | 2026-02-26 | Initial creation — architecture, 5 Laws, all structures, integration map |
