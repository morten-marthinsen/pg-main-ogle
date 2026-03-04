# PG Page Swiper - Implementation Notes

This document contains detailed implementation details and best practices for all page types: VSL to Pages, Checkout, Upsell 1, and Upsell 2.

---

## VSL to Pages

### Physical Product Upsell V2 Requirements

When creating a Physical Product Upsell, a second version of the VSL Expanded page must be created. This is a **sales page below the VSL** format with specific modifications:

1. **Remove Scratch Club References** - Search for all mentions of "Scratch Club", remove or replace
2. **Add Offer Box** - Product name, price, key benefits, CTA button
3. **Add "No Thanks" Link** - Below the main CTA, subtle but present
4. **Remove Equipment Guides** - Delete equipment-specific bonuses or references
5. **Update Bonus Count** - If you remove bonuses, update ALL instances everywhere (headlines, body copy, bullet lists, summary sections)

### NEW vs EXISTING Offer Logic (Upsells 2-4)

**NEW Offer:**
- Create 5 formatted headline variations
- Use the six-category angle analysis to inform headlines
- Model format from examples in delay page templates
- Each headline should highlight different angle categories

**EXISTING Offer:**
- Use current offer headline with minimal changes
- Reference `examples/vsl-to-pages/product-headlines.md`
- Only update product name, price, minor formatting
- Do NOT recreate from scratch

### Six-Category Angle Analysis Best Practices

**Analysis Approach:**
1. Read line by line - don't rush, don't skip, don't summarize early
2. Categorize thoroughly - some statements fit multiple categories (choose primary)
3. Extract exact language - preserve power phrases and unique terminology

**Category Guidelines:**

| Category | What to Look For |
|----------|-----------------|
| **Authority Proof** | Credentials, certifications, testimonials, media mentions, awards |
| **Strong Benefit/Desire** | Aspirational outcomes, transformations, goal achievements |
| **Strong Pain** | Current frustrations, problems, dissatisfaction, fears |
| **Mechanism** | How it works, unique methodology, process explanations |
| **Contrarian** | Myths busted, surprising revelations, against-the-grain positioning |
| **Big Promise** | Grand outcome statements, life-changing claims, transformation declarations |

### Artifact Creation Standards

- One artifact per page - do NOT combine multiple pages
- Clear naming: "VSL Delay - Core Offer" not "Pages 1-3"
- Markdown format only (not HTML)
- All sections complete - no placeholders like [INSERT HERE]
- Ready to copy-paste directly into webpage builder

### VSL Common Pitfalls

| Pitfall | Fix |
|---------|-----|
| Creating upsell 2-4 delay with 5 headlines when EXISTING offer | Check NEW vs EXISTING first |
| Forgetting V2 for physical upsells | Check product type, add V2 if physical |
| Creating downsell for Core Offer | Downsells only for Upsells 1-4 |
| Generic benefits without three-tier structure | Apply Tangible → Dimensionalized → Emotional |
| Claims without proof | Add evidence after each claim |
| Not using approved angles | Incorporate specific angles from six-category analysis |

---

## Checkout Pages

### Immediate Start Protocol

When user provides VSL script, sales page, or one-pager, begin immediately:

**DO NOT wait for:**
- Additional instructions
- Clarifying questions
- Permission to start

**DO start immediately with:**
- Step C-1: Extract Core Offer Details
- Present findings
- Move to Step C-2

### Physical vs Digital Conditional Logic

**Physical Products:**
- Template: `examples/checkout/template-physical.md`
- Golf clubs, training aids, equipment, physical tools (requires shipping)

**Digital Products:**
- Template: `examples/checkout/template-digital.md`
- Video training, online courses, digital downloads, apps (no shipping)

### Order Bump Handling

Reference `examples/checkout/template-order-bumps.md` for all available options.

Present ALL options to user and ask which to use for Order Bump 1, 2, and 3.

**Ultimate Combination Special Case:**

If "Ultimate Combination" is selected, STOP and request:
1. Product List: Which specific products are included?
2. Individual Prices: What does each product cost separately?
3. Combined Value: What is the total combined value?
4. Discount Amount: What discount is being offered?
5. Final Price: What is the final price after discount?

Do NOT proceed until this information is provided.

### Checkout Bonus Copy Structure

**Correct Pattern:**
```
✓ FREE BONUS: [Specific Big Benefit] [transition word] [Product/Program Name]
```

**Breakdown:**
- Checkmark: ✓
- Label: FREE BONUS:
- Benefit First: The tangible outcome or benefit
- Transition Word: "with", "using", "through"
- Product Name: The actual bonus name

**Good Examples:**
- ✓ FREE BONUS: Add 25-35+ yards off the tee with Simple Strike Driver Series
- ✓ FREE BONUS: Develop a bulletproof short game with Short Game Mastery
- ✓ FREE BONUS: Fix your slice forever using the Anti-Slice Training Guide

**Bad Examples:**
- ✓ FREE BONUS: Simple Strike Driver Series That Adds 25-35+ yards off the tee (product name first)
- ✓ FREE BONUS: The Short Game Mastery Program (no benefit stated)
- ✓ Add 25-35+ yards with Simple Strike Driver Series (missing FREE BONUS label)

### Checkout Bold Formatting Rule

**CRITICAL:** Only the benefit portion gets bold, NOT the product name.

**Pattern:**
```
**FREE BONUS: [Benefit]** [transition word] [Product Name]
```

**Correct:**
- **FREE BONUS: Add 25-35+ yards off the tee** with Simple Strike Driver Series

**Incorrect:**
- **FREE BONUS: Add 25-35+ yards off the tee with Simple Strike Driver Series** (product name should not be bold)
- FREE BONUS: **Add 25-35+ yards off the tee with Simple Strike Driver Series** (FREE BONUS should also be bold)
- **FREE BONUS:** Add 25-35+ yards off the tee with Simple Strike Driver Series (benefit should be bold)

### Checkout Bonus Count Consistency

The bonus count must be identical in EVERY location it appears:
1. Header sections mentioning "X bonuses included"
2. Bonus list introductions ("Here are your 5 bonuses")
3. Summary sections recapping the offer
4. Call-to-action sections emphasizing bonus value
5. Order bump sections referencing total bonuses

### Checkout Template Modification Philosophy

**Change ONLY:**
- Product name, benefits, pricing, bonus items, guarantee terms, order bumps

**DO NOT change:**
- Section order, structure, sentence patterns, flow/rhythm, formatting patterns, CTA language, urgency language, social proof format

### Checkout Copy Flow Preservation

**Example from Template:**
"Imagine walking up to the first tee, pulling out your driver, and confidently striping it 20+ yards past your playing partners."

**Good Update:**
"Imagine walking up to the first tee, pulling out your 7-wood, and confidently striping it 30+ yards past your playing partners."

**Bad Update:**
"Picture yourself at the tee box with your new 7-wood. You'll be able to hit it 30 yards farther than your friends, and they'll be amazed."

Why bad: Changed sentence structure, broke flow, altered rhythm.

### Checkout Common Pitfalls

| Pitfall | Fix |
|---------|-----|
| Starting without full offer details | Complete all extraction before generating |
| Product name before benefit in bonuses | Reverse: Benefit → Transition → Product |
| Product name is bold | Remove bold from product, keep only on benefit |
| Bonus count inconsistent | Search entire page, update ALL instances |
| Template structure changed | Restore exact template section order |
| Formatting doesn't match | Review template, match every bold/italic/CAPS |

---

## Upsell 1 Pages

### Downsell Pricing Information

Always collect this information at the start:
- **Total downsell price** (in dollars)
- **Extra/double discount amount** (in dollars)
- **Percent off**

This information is critical for updating the downsell page pricing sections accurately.

### Physical vs Digital Conditional Logic

**Physical Upsell Pages:**
1. Upsell 1 Delay Page - Minimal changes
2. Upsell 1 Expanded Page - Full deliverables using C-P-B
3. Downsell 1 - Minimal changes with pricing updates
4. Upsell 1 Expanded Page V2 - Sales page below VSL format

**Digital Upsell Pages:**
1. Upsell 1 Delay Page - Minimal changes
2. Upsell 1 Expanded Page - Full deliverables using C-P-B
3. Downsell 1 - Minimal changes with pricing updates

**Note:** V2 is NOT created for digital upsells.

### Google Drive Asset Retrieval

**Important:** Fetch documents using ID instead of search to avoid "files too large" error message.

### Todd Brown's C-P-B Framework Application

Every deliverable description on expanded pages must follow:

**Claim → Proof → Benefit (3-tier)**

**Three-Tier Benefit Requirements:**

1. **Tangible Benefit** - Concrete, measurable (e.g., "25 yards farther", "10 fewer strokes")
2. **Dimensionalized Benefit** - Greater impact (e.g., "reach par 5s in two", "shorter approach shots")
3. **Emotional Benefit** - Feeling achieved (e.g., "feel confident", "experience pride")

**Complete C-P-B Example:**
"This training system adds 25+ yards to your drive [CLAIM] based on biomechanical analysis from Dr. John Smith, golf biomechanics researcher at Stanford University [PROOF]. You'll drive the ball 25+ yards farther [TANGIBLE], which means you'll reach par 5s in two and have shorter approach shots on every hole [DIMENSIONALIZED], so you'll feel the confidence and pride of outdriving your buddies [EMOTIONAL]."

### Upsell 1 Expanded Page V2 Deep Dive

**When to Create V2:** ONLY for physical product upsells.

V2 is NOT a new page. It's the Upsell 1 Delay page with a full sales page appended below it.

**Structure:**
```
[Existing Upsell 1 Delay content - unchanged]
↓
[solid red arrows]
↓
[Modified sales page content starts here]
```

**Critical V2 Rule: One Headline Complex Only**

The Problem:
- Upsell 1 Delay already has a headline complex
- The sales page you're appending also has a headline complex
- If you keep both, there are two headline complexes (wrong)

The Solution:
- Keep ONLY the Upsell 1 Delay headline complex
- Remove the headline complex from the sales page
- Start the appended sales page directly with the "Sales Page Upsell Offer Box Section"

**V2 Modifications Checklist:**

- [ ] Remove ALL references to monthly continuity offers (Scratch Club, Performance Golf App, etc.)
- [ ] Add upsell offer box at top (right below solid red arrows)
- [ ] Add "no thanks" link immediately after offer box
- [ ] Remove Equipment Guide bonus
- [ ] Update bonus count EVERYWHERE (e.g., 5 → 3)
- [ ] Update ALL pricing (new upsell price, discounts)
- [ ] Update design notes in brackets [ ]

**V2 Quality Standards:**

Top of fold must be perfect:
- Only ONE headline complex (Upsell 1 Delay format)
- No duplicate VSL sections
- Solid red arrows separator in place
- Sales page headline appears immediately after arrows
- Offer box is complete and accurate
- Pricing section shows correct amounts and discounts
- Guarantee is present and accurate
- "No thanks" link is present with proper copy

Throughout the page:
- ALL continuity references removed
- Equipment Guide completely removed
- Bonus count updated in ALL locations
- Design notes in brackets [ ] are descriptive
- No new sections invented
- No sections removed (except bonuses and continuity)
- Minimal changes made (don't rewrite copy unnecessarily)

**Common V2 Mistakes:**

| Mistake | Fix |
|---------|-----|
| Two headline sections | Remove sales page headline, keep Delay headline only |
| Following example format exactly | Use user's sales page format, make minimal edits |
| Bonus count inconsistent | Search entire page, update ALL instances |
| Continuity references remain | Remove ALL Scratch Club / subscription mentions |
| Missing offer box | Add immediately after solid red arrows |
| Missing "no thanks" link | Add below offer box, use standard copy |
| Rewriting copy unnecessarily | Make only required changes, preserve original |
| Created V2 for digital | V2 is ONLY for physical products |

### Upsell 1 Minimal Changes Philosophy

| Page Type | What "Minimal" Means |
|-----------|---------------------|
| **Delay** | Update headline, product name, VSL reference only |
| **Downsell** | Update pricing, product name only |
| **V2** | Remove continuity, add offer box, update bonuses/pricing - DON'T rewrite copy |

---

## Upsell 2 Pages

### Physical vs Digital Conditional Logic

**Physical Upsell 2:**
1. Upsell 2 Delay Page - Update headline using `examples/upsell-2/up2-delay-phys.md`
2. Upsell 2 Expanded Page - Maintain layout of `examples/upsell-2/upsell-ex-phys.md`
3. Downsell 2 - Minimal changes to `examples/upsell-2/downsell-miami-md-phys.md`

**Digital Upsell 2:**
1. Upsell 2 Delay Page - Update headline using `examples/upsell-2/up2-delay-dig.md`
2. Upsell 2 Expanded Page - Maintain layout of `examples/upsell-2/upsell-ex-dig.md`
3. Downsell 2 - Minimal changes to `examples/upsell-2/downsell-miami-md-dig.md`

**Existing Product Headlines:** For EXISTING products, use pre-written headlines from `examples/upsell-2/product-headlines.md`. Only follow the headline creation process for NEW products.

### Upsell 2 C-P-B Application

Same as Upsell 1 - apply Todd Brown's C-P-B Framework to all expanded page deliverable descriptions with three-tier benefits.

---

## Shared Implementation Details

### Asset Input Methods

| Method | User Provides | You Do |
|--------|--------------|--------|
| **Google Drive** | File name | Fetch by ID (not search) to avoid size errors |
| **Copy-paste** | Full content | Confirm received, parse, analyze |
| **Verbal** | Description | Take notes, ask clarifying questions, confirm |
| **URL** (V2 only) | Website URL | ALWAYS view mobile version (not desktop) |

### Copy Style Analysis Process

**Delay Pages:** Focus on headline construction, emotional triggers, urgency elements, click motivation.

**Expanded Pages:** Focus on C-P-B framework application, three-tier benefit structure, proof elements, claim strength.

**Downsell Pages:** Focus on Miami MD format, discount emphasis, value reinforcement, limited-time framing.

### Page Format & Layout Analysis

**What to Analyze:** Section order, heading hierarchy, bullet list formatting, CTA placement, design note locations, guarantee placement, bonus presentation.

**What NOT to Change:** Overall structure, section sequencing, formatting style, design note format, Markdown vs HTML choice (always Markdown).

### Validation Checkpoints

**Checkout:**
1. After extracting offer details
2. After determining category
3. After confirming order bumps

**Upsell 1:**
1. After physical/digital selection
2. After downsell pricing provided
3. After pages list confirmed
4. After offer analyzed
5. After copy style mastered
6. After format mastered
7. (V2) After structure confirmed
8. (V2) After examples reviewed
9. (V2) After update list approved

**Upsell 2:**
1. After physical/digital selection
2. After offer analyzed
3. After copy style mastered
4. After format mastered

### Quality Control Priorities

1. **Conditional Logic** - Physical vs digital correct? All required pages created?
2. **Copy Quality** - C-P-B applied? Three-tier benefits? Minimal changes?
3. **Technical Accuracy** - Markdown format? Separate artifact per page? Design notes?
4. **V2-Specific** (if applicable) - One headline complex? Continuity removed? Bonus count?

### Troubleshooting

| Issue | Solution |
|-------|----------|
| User says pages are wrong | Ask which page, what's wrong, return to checkpoint |
| V2 has two headline sections | Remove sales page headline, keep Delay only |
| Bonus count not updated | Search entire page, update ALL instances |
| Copy doesn't match examples | Re-read example, apply C-P-B explicitly |
| Format doesn't match | Create structure outline from example, follow precisely |
| Template structure changed | Open template side-by-side, restore exact order |

---

## Lessons From SPD Backend Project (2026-02-18)

> See `SPD-BACKEND-LESSONS.md` for the full page-by-page comparison and `PAGE-SWIPING-PRECHECK.md` for the operational checklist.

### Critical Pre-Work: Information That Must Be Confirmed Before Writing

**These items were WRONG on first drafts because they were guessed instead of confirmed:**

| Information | What Went Wrong | Rule |
|-------------|-----------------|------|
| Full/retail price | Guessed $359 SpeedTrac (was $299), $598 for 357+359 (was $499) | NEVER guess. Ask for exact number. |
| Downsell price | Guessed $189 (was $199) | Get exact downsell pricing upfront. |
| Bonus count | Invented 4 bonuses (only 1 existed) | ASK. Don't assume bonuses exist. |
| Downsell structure | Made bundle discount (should have been pick-1) | Ask: "Same product cheaper? Pick-1? Reduced quantity?" |
| Feature counts | Used 12 (was 15) | Cross-reference ALL source docs. Micro-scripts > VSL. |
| PG1 pricing | Used simple strikethrough (should have been PG1 toggle) | Ask: "Is there a PG1 member pricing component?" |

### Source Document Hierarchy

When VSL scripts and micro-scripts/positioning docs conflict, follow this priority:

1. **User's direct instructions** (pricing, bonuses, structure)
2. **Micro-scripts / positioning docs** (language, terminology, killed terms)
3. **Existing PG pages and swipe templates** (format, patterns, badges)
4. **VSL scripts** (narrative, story, presenter info)

The VSL script is NOT the single source of truth for page copy.

### New Common Pitfalls (From SPD Project)

| Pitfall | Fix |
|---------|-----|
| Inventing bonuses that don't exist | ASK how many bonuses. Don't assume or add from templates. |
| Using KILLED terms from positioning doc | Read micro-scripts first. Search for "KILLED" or "DO NOT USE" sections. |
| "clubface control" instead of "face control" | Use EXACT terminology from micro-scripts doc. |
| CTA button states product name | CTA should state BENEFIT ("Distance AND Accuracy"), not product name. |
| Placeholder testimonials | Write realistic testimonials with product language, specific numbers, target demo details. |
| Mechanism-heavy copy | Benefit first ("fixes your big miss"), mechanism second. |
| Wrong presenter role | Verify: Andrew Rice = coach, Chris McGinley = engineer. Don't mix up. |
| Wrong year in footer | Use current year. Always. |
| Listing all features by name | "7 features all working together" > listing every feature individually. |
| "REGULAR PRICE" on downsell | Use "DISCOUNTED PRICE" — it's already been discounted once. |
| Yardage ranges for club use | Use iron replacement framing: "replaces your 4 or 5 iron" not "175-220 yards" |
| Same presenter for all upsells | "Our Promise" section should feature the person the customer JUST bought from. |
| Missing physical product selectors | LH/RH + shaft flex + "IN STOCK AND READY TO SHIP" on EVERY physical page. |

### Copy Quality Rules (Confirmed by SPD Revisions)

1. **Binary frames** — When positioning docs provide "AND X, not OR X" frames, use them on every page. ("Fast AND straight, not fast OR straight")
2. **Summary sentences** — End product descriptions with a bold summary. ("That's how you gain distance AND accuracy.")
3. **Specific benefit language** — "fairway-finding distance" > "shows up on the course"
4. **Audience qualifiers** — Add "for amateurs" or "for senior golfers" when relevant.
5. **Fear-elimination subheads** — "WITHOUT Making A Single Change To Your Current Swing"
6. **Softer tone** — "heck of a deal" not "hell of a deal." "bad golfer" not "stink at golf." This is a senior audience.
7. **Design directives** — Include curiosity-first thumbnail briefs in brackets. Don't just say "[VSL]."

## Version History

- **v1.1** (2026-02-18) - Added SPD Backend Project lessons, new pitfalls table, source hierarchy, copy quality rules
- **v1.0** (2026-02-07) - Consolidated from pg-checkout-pages, pg-upsell-1-pages, pg-upsell-2-pages
