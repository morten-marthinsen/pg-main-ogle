# SPD PDP — Shopify Section Mapping (Updated)

**Date:** 2026-02-27
**Status:** BUILD REFERENCE
**Copy Source:** `spd/3-spd-copy-sauce/spd-copy-sales-page-pdp.md`

---

## Overview

Two templates share one section map. The ONLY difference is the hero (Section 1):

| Template | Hero Section | File |
|---|---|---|
| **SPD PDP** | `pg-pdp-hero-atf` (product gallery + configurator) | `page.pg-spd-pdp.json` |
| **SPD Sales Page** | `pg-sp-hero-atf` (headline + benefit stack) | `page.pg-spd-sales-page.json` |

Sections 0 and 2–20 are identical in both templates.

---

## Section-by-Section Mapping

### SECTION 0: STICKY NAV
| | |
|---|---|
| **Copy Section** | Sticky header navigation |
| **Shopify Section** | `pg-header-anchor-links` |
| **Status** | EXISTING — direct match |
| **Notes** | Nav links: Problem, Solution, Technology, Specs, Reviews, Guarantee, FAQs. Announcement bar with rotating messages (Save $50, 365-Day Guarantee, Free Shipping). CTA: "BUY NOW" scrolls to offer box. |

---

### SECTION 1A: ABOVE THE FOLD — PDP
| | |
|---|---|
| **Copy Section** | Product gallery, title, pricing, Hand/Flex selectors, CTA, trust badges, star rating, urgency, guarantee, payment options |
| **Shopify Section** | `pg-pdp-hero-atf` |
| **Status** | EXISTING — requires modification |
| **Modification Needed** | Current section has Loft multi-select (50°/56°/60°/63°) built for ONE.1 wedge. SpeedTrac needs: Hand single-select (RH/LH) + Shaft Flex single-select (Strong/Regular). Selector logic, checklist items, and pricing calculation need updating for SpeedTrac's single-item purchase flow (vs. multi-wedge). |
| **Copy Elements** | Pre-Head: "Introducing..." / Title: "The SpeedTrac Training System For Amateur Golfers" / Tagline / ⭐ 4.7 (393 reviews) / $249 non-member, $199 member / Hand + Shaft Flex selectors / Savings callout / Urgency: green dot + timer / CTA: "GET MY SPEEDTRAC NOW" + sub-CTA / Trust badges / Guarantee outline / Payment options (Affirm/Shop Pay) |
| **Gallery** | 10 hero image/video slots (see Hero Image Architecture in copy doc) |

---

### SECTION 1B: ABOVE THE FOLD — SALES PAGE
| | |
|---|---|
| **Copy Section** | Sales page hero with headline, CTA, social proof |
| **Shopify Section** | `pg-sp-hero-atf` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Prehead: "Introducing..." / Headline: "THE FIRST-EVER SWING TRAINER THAT GIVES YOU SPEED AND FACE CONTROL" / Subhead / Hero visual (Y-Trac animation) / Price: $199 / Members Toggle / CTA: "GET MY SPEEDTRAC NOW" + sub-CTA / Urgency: green dot + timer / Guarantee / Stars + rating / Trust badges |

---

### SECTION 2: UGC CAROUSEL
| | |
|---|---|
| **Copy Section** | User-generated video testimonials |
| **Shopify Section** | `pg-ugc-carousel` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Heading: "Our Trac Record" / Subhead: "REAL STRAIGHT. REAL FAR. REAL GOLFERS." / 5-7 short-form UGC video testimonials (Martin Borgmeier, Gerry Carrey, Donnie, Brixton + others) / Auto-play muted with captions / Left/right arrows + dots/swipe |

---

### SECTION 3: FRAME CLAIM
| | |
|---|---|
| **Copy Section** | Framing the core claim — speed requires face control |
| **Shopify Section** | `pg-feature` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Heading Line 1: "To Gain Meaningful Distance You Trust On The Golf Course" / Heading Line 2: "YOU NEED SPEED AND CLUBFACE CONTROL" / Body: "Because Speed Without Control Sends You Farther... Offline" + two paragraphs about slicers/hookers / Image: split screen shot tracer visual (hook vs. slice) |
| **Layout** | Image left or right (design decision) |

---

### SECTION 4: OVERLOAD/UNDERLOAD TRAINING BACKGROUND EDUCATION
| | |
|---|---|
| **Copy Section** | Historical timeline of speed training (708 BC → 1971 → 2012-2026) |
| **Shopify Section** | **NEW SECTION REQUIRED** |
| **Status** | NEW — no existing section matches |
| **Why New** | Copy calls for a "dynamic entertaining timeline" with horizontal swipe navigation showing historical dates/events. Existing timeline sections (`pg-expect-timeline` = vertical scroll, `pg-what-to-expect-timeline` = horizontal phase cards) are designed for customer journey phases, not historical event timelines. The interactive horizontal swipe requirement and historical date formatting need a purpose-built section. |
| **Copy Elements** | Heading: "A BRIEF HISTORY OF SPEED TRAINING" / Subhead: "Did You Know?:" / Timeline entries: 708 BC (Ancient Olympics), 1971 (Soviet Coach discovery), 2012-2026 (Speed trainers unchanged) / Design ref: golfgamebook.com/about-us / Action note: horizontal swipe interaction |
| **Design Reference** | See `spd-speed-training-timeline.md` for detailed timeline content |

---

### SECTION 5: PROBLEM (Sub-section A — The Problem)
| | |
|---|---|
| **Copy Section** | "THE PROBLEM WITH TRADITIONAL SPEED TRAINING" |
| **Shopify Section** | `pg-feature` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Label: "THE PROBLEM WITH TRADITIONAL SPEED TRAINING" / Heading: "You Train Speed, But Not Face Control. (You Need BOTH!)" / Body: "Here's the real problem..." paragraph + "Speed Sticks are sticks..." + "No clubhead means:" + 4× ❌ bullet points / Media: MP4 video of golfer swinging a speed stick |
| **Layout** | Text + video, two-column |

---

### SECTION 5: PROBLEM (Sub-section B — The Science)
| | |
|---|---|
| **Copy Section** | "THE SCIENCE OF SPEED STICKS" |
| **Shopify Section** | `pg-feature` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Heading Line 1: "THE SCIENCE OF SPEED STICKS" / Body: Center of mass explanation (speed stick vs. golf club) / "ONE FATAL FLAW. TWO BIG PROBLEMS." / #1: Speed Sticks don't look, feel, or perform like a real golf club / #2: Speed Sticks can give you speed, but NO face control / Image: split-screen comparison animation (center mass vs. off-center mass) |
| **Layout** | Text + image/animation, two-column |

---

### SECTION 6: CONSEQUENCE (Section Headline)
| | |
|---|---|
| **Copy Section** | "3 Reasons Training Speed Without Face Control MAKES YOUR BIG MISS BIGGER" |
| **Shopify Section** | `pg-transition-headline` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Headline Part 1: "3 Reasons Training Speed Without Face Control" / Headline Part 2: "MAKES YOUR BIG MISS BIGGER" |

---

### SECTION 6: CONSEQUENCE (Reason #1)
| | |
|---|---|
| **Copy Section** | "The faster you swing, the more your clubface wants to open or close" |
| **Shopify Section** | `pg-feature` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Heading: "#1: The faster you swing, the more your clubface wants to open or close in the downswing." / Body: Trackman data points (angular momentum, face open/closed) / Media: MP4 video (looping — swing comparison showing speed vs. accuracy tradeoff) |

---

### SECTION 6: CONSEQUENCE (Reason #2)
| | |
|---|---|
| **Copy Section** | "The faster you swing, the less time you have to square your clubface" |
| **Shopify Section** | `pg-feature` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Heading: "#2: The faster you swing, the less time you have to square your clubface." / Body: 90mph vs. 100mph comparison / Image: side-by-side freeze frame at impact (90mph 4.5° open vs. 100mph 6.5° open) |

---

### SECTION 6: CONSEQUENCE (Reason #3)
| | |
|---|---|
| **Copy Section** | "The faster you swing, the more stress you put on your mechanics" |
| **Shopify Section** | `pg-feature` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Heading: "#3: The faster you swing, the more stress you put on your mechanics." / Body: Stress → bad habits → swing degradation / Image: TBD (no visual specified in copy — will need one for two-column layout) |
| **Design Note** | Copy doc does not specify a visual for this reason. A supporting image will need to be sourced during design. |

---

### SECTION 6: CONSEQUENCE (Slice Application)
| | |
|---|---|
| **Copy Section** | "WHAT'S THAT MEAN FOR YOU?" — Slice scenario |
| **Shopify Section** | `pg-feature` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Heading: "WHAT'S THAT MEAN FOR YOU?" / Subhead: "When You Struggle With A Slice:" / Body: Open face explanation → swing faster → bigger slice / Image: split screen with Trackman data tiles (92mph, 4.5° vs. 101mph, 6.8°) |

---

### SECTION 6: CONSEQUENCE (Hook Application)
| | |
|---|---|
| **Copy Section** | "When You Fight A Hook" |
| **Shopify Section** | `pg-feature` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Heading: "When You Fight A Hook" / Body: Closed face explanation → swing faster → bigger hook / Image: split screen with Trackman data tiles (94mph, -3.9° vs. 100mph, -6.1°) |

---

### SECTION 7: THE MECHANISM (SOLUTION)
| | |
|---|---|
| **Copy Section** | "Introducing SpeedTrac" — the solution reveal |
| **Shopify Section** | `pg-feature` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Label: "THE SOLUTION" / Heading Line 1: "Introducing SpeedTrac" / Heading Line 2: "COMMAND YOUR CLUBFACE – AT ANY SPEED" / Body: "SpeedTrac is the first swing trainer..." + supporting copy / Image/Animation: Hero 3D render of Y-Trac weight system showing heel/center/toe positions with ball flight corrections |
| **Layout** | Image right (hero reveal moment) |

---

### SECTION 8: Y-TRAC WEIGHT SYSTEM (HERO FEATURE)
| | |
|---|---|
| **Copy Section** | Interactive Y-Trac weight position selector |
| **Shopify Section** | **NEW SECTION REQUIRED** |
| **Status** | NEW — no existing section matches |
| **Why New** | This section requires a completely custom interactive UI: the user drags or taps the Y-Trac weight to three positions (heel/center/toe) and the corresponding copy dynamically appears. No existing section supports this drag-to-reveal or tap-to-switch interaction pattern. Pulsing orb hotspots, position-based copy switching, and the interactive weight track visual are all unique to this section. |
| **Copy Elements** | Heading: "Adjustable Y-Trac Weighting" / Subhead: "A FIX FOR EVERY MISS" / Body: "Dial in your distance AND accuracy..." / Instruction: "Tap The Trac To See How Y-Trac Weighting Works" / Heel position copy / Toe position copy / Center position copy |
| **Interaction** | Drag/tap weight on visual track → reveals position-specific copy. Three pulsing orbs as tap targets. |

---

### SECTION 9: FEATURES & BENEFITS (Feature A — Speed Spoon)
| | |
|---|---|
| **Copy Section** | Speed Spoon Clubhead feature |
| **Shopify Section** | `pg-feature` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Label: "Speed Spoon Clubhead" / Heading Line 1: "TRAINS YOUR BRAIN" / Heading Line 2: "FOR AUTOMATIC GAINS" / Body: "SpeedTrac looks like a driver, feels like a driver..." + transfer explanation / Image/Animation: Speed Spoon Head feature animation |

---

### SECTION 9: FEATURES & BENEFITS (Feature B — SpeedTrac Stack)
| | |
|---|---|
| **Copy Section** | SpeedTrac Stack feature with weight table |
| **Shopify Section** | `pg-feature` |
| **Status** | EXISTING — may need design consideration |
| **Copy Elements** | Label: "SpeedTrac Stack" / Heading: "STACK IT & SWING IT" / Body: 3 modes explanation (Light/Heavy/Standard) / Animation: adding/removing weights / Weight comparison table (5 rows: Overspeed through Overload with gram weights + driver comparison) |
| **Design Note** | The weight comparison table (5 rows × 3 columns) may need to be handled as a styled richtext table within the body, or as a separate visual/image. `pg-feature` body supports richtext which can include tables, but styling may need attention. |

---

### SECTION 9: FEATURES & BENEFITS (Feature C — Molded Training Grip)
| | |
|---|---|
| **Copy Section** | Molded Training Grip feature |
| **Shopify Section** | `pg-feature` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Label: "Molded Training Grip" / Heading: "GRIP IT, RIP IT, FIND IT" / Body: Universal grip guide → correct hand position → good habits / Image/Animation: Molded Grip Guide feature animation |

---

### SECTION 10: THE SPEEDTRAC TRAINING SYSTEM
| | |
|---|---|
| **Copy Section** | Martin Borgmeier's 10-Swing Training System |
| **Shopify Section** | `pg-feature` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Heading Line 1: "IT'S NOT A SPEED STICK..." / Heading Line 2: "IT'S A SPEED SYSTEM." / Body: "Included with your SpeedTrac Swing Trainer:" / "World Long Drive Champ Martin Borgmeier's 10-Swing SpeedTrac Training System" / "World Long Drive Speed Training Protocol... Modified For Everyday Golfers To Gain Speed" / Quote: "It Only Takes 10 Swings A Day... To Add Speed You Trust On The Course" / Image: Martin Borgmeier crushing a drive |
| **Alternative** | Could also use `pg-guru` if Martin's credentials warrant a full profile treatment. `pg-feature` chosen because the focus is on the training system, not Martin's bio. |

---

### SECTION 11: COUNTERSELL (Sub-section A — Argument)
| | |
|---|---|
| **Copy Section** | "SPEEDTRAC IS ENGINEERED FOR AMATEURS" — text argument |
| **Shopify Section** | `pg-feature` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Heading: "SPEEDTRAC IS ENGINEERED FOR AMATEURS" / Body: Full countersell argument (existing trainers designed for tour pros, amateurs need face control) / Image: Two-column comparison visual (Traditional: ❌ No Clubface, ✅ Speed, ❌ No Control vs. SpeedTrac: ✅ Clubface, ✅ Speed, ✅ Control) |

---

### SECTION 11: COUNTERSELL (Sub-section B — Comparison Table)
| | |
|---|---|
| **Copy Section** | "How SpeedTrac Compares" — detailed comparison chart |
| **Shopify Section** | `pg-us-vs-them` |
| **Status** | EXISTING — requires reconfiguration |
| **Copy Elements** | 7-row comparison table: SpeedTrac vs. Multi-Club Speed Stick Sets vs. Single Adjustable Speed Sticks / Features: Weight Location, Trains Face Control, Clubhead Shape, Adjustable Weight, Addresses Big Miss, Complete Training System, One Tool / ✅/❌/⚠️ indicators per cell |
| **Modification Needed** | `pg-us-vs-them` is currently configured for SF2 column headers. Needs column headers reconfigured for SpeedTrac (3 columns). Has 6 feature rows — SpeedTrac comparison has 7 rows, so may need an additional row added to the section schema. |

---

### SECTION 12: WHAT TO EXPECT — TRAINING PROTOCOL RESULTS
| | |
|---|---|
| **Copy Section** | Week-by-week results timeline |
| **Shopify Section** | `pg-expect-timeline` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Heading: "WHAT TO EXPECT" / 4 timeline blocks: Week 1 ("Feel The Face – At Speed"), Week 2 ("Distance AND Accuracy – Dialed"), Week 3-4 ("Speed Without The Spray"), Month 2+ ("Total On-Course Confidence") / Each with description text |

---

### SECTION 13: EXPERT CREDIBILITY
| | |
|---|---|
| **Copy Section** | Chris McGinley expert profile |
| **Shopify Section** | `pg-guru` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Prehead: "MEET THE ENGINEER" / Headline: "35+ Years, 11 World #1s, 700,000+ Amateurs" / Image: Chris McGinley video thumbnail (in engineering lab) / Name: Chris McGinley / Title: Nuclear Engineer Turned Equipment Innovation Expert / Credentials: ✔ 30+ years building clubs for 11 world #1s / ✔ 700,000+ amateurs currently using his equipment / Quote: "Speed without face control just sends your miss farther in the wrong direction..." |

---

### SECTION 14: MID-PAGE CTA + PRICING
| | |
|---|---|
| **Copy Section** | Full pricing section with product configuration |
| **Shopify Section** | `pg-bundle-offer-box` |
| **Status** | EXISTING — requires modification |
| **Modification Needed** | Same as Section 1A: replace Loft multi-select with Hand (RH/LH) single-select + Shaft Flex (Strong/Regular) single-select. Checklist items are SpeedTrac-specific. Pricing is single-item ($249/$199) not multi-wedge. |
| **Copy Elements** | Heading: "SPEEDTRAC / MORE SPEED. MORE FAIRWAYS." / Price: $249 crossed out → $199 member / $249 non-member / Hand selector / Shaft Flex selector (with descriptions: Strong = 250+ yards, Regular = 250 or less) / Dynamic checklist (6 items) / PG1 toggle with member/non-member copy variants / CTA: "GET MY SPEEDTRAC NOW" + sub-CTA / Stars: ⭐ "Join 1,700+ golfers..." / Trust badges |

---

### SECTION 15: SOCIAL PROOF / TESTIMONIALS
| | |
|---|---|
| **Copy Section** | Text testimonials grid |
| **Shopify Section** | `pg-text-testimonials` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Heading: "Trac Stars: See What SpeedTrac Owners Are Saying" / 6 testimonial blocks (Mark R. 18 HCP, Steve W. 14 HCP, Dave K. 20 HCP, Tom L. 12 HCP, Chris B. 15 HCP, Jim H. 11 HCP) / Each with bold key result line / Note: stand-in testimonials, replace with real when available |

---

### SECTION 16: GUARANTEE / RISK REVERSAL
| | |
|---|---|
| **Copy Section** | 365-Day guarantee with contact info |
| **Shopify Section** | `pg-guarantee` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Seal image / Headline: "365-DAY DEMO PERIOD & 100% MONEY-BACK GUARANTEE" / Body: "You WILL gain speed AND dial in your face control..." / "Or... we insist you contact us..." / Email: support@performancegolf.com / Phone: 1 (800) PG1-GOLF / 1 (800) 741-4653 |

---

### SECTION 17: SPECIFICATIONS
| | |
|---|---|
| **Copy Section** | Full technical specifications table |
| **Shopify Section** | `pg-product-specifications` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Heading: "FULL SPEEDTRAC SPECIFICATIONS" / 16 spec rows: Weight System, Head Design, Weight Adjustment, Head Weight Options, Weight Modes, Configurations, Club Length, Head Material, Grip, Shaft, Shaft Construction, Accessories, Use, Price, Guarantee |

---

### SECTION 18: FINAL CTA BLOCK
| | |
|---|---|
| **Copy Section** | Final call-to-action with benefit bullets |
| **Shopify Section** | `pg-urgency` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | Headline: "SPEEDTRAC / The First Speed + Face Control Training System For Amateurs" / Image: SpeedTrac hero animation / 5 benefit bullets (✔ More yards AND more fairways, ✔ Get back lost distance, ✔ Gain 5-8mph at ANY age, ✔ Speed breakthrough in 7 days, ✔ Stop being shortest hitter) / CTA: "GET MY SPEEDTRAC NOW" + sub-CTA / Stars: "Join 1,700+ golfers..." / Trust badges |
| **Timer Note** | `pg-urgency` includes an optional countdown timer bar. Enable or disable based on campaign strategy. |

---

### SECTION 19: FAQ
| | |
|---|---|
| **Copy Section** | Frequently asked questions (accordion) |
| **Shopify Section** | `pg-faqs` |
| **Status** | EXISTING — direct match |
| **Copy Elements** | 15 FAQ items (all start closed): How is SpeedTrac different, Will it make me faster, Already have speed sticks, Can I hit real balls, Which Y-Trac position, How long before results, How much time, Is it only for seniors, What if no big miss, How many configurations, Does it come with training program, Strong vs Regular flex, Shipping time, International shipping, Return policy |

---

### SECTION 20: FOOTER
| | |
|---|---|
| **Copy Section** | Contact info + legal |
| **Shopify Section** | Standard Shopify footer (theme-level) |
| **Status** | EXISTING — uses theme footer |
| **Copy Elements** | Phone: 1 (800) PG1-GOLF / 1 (800) 741-4653 / Email: support@performancegolf.com / Address: 101 NE 3rd Ave #1500 Fort Lauderdale, FL 33301 / © 2026 BlackFish Media + Performance Golf Products / Terms / Privacy Policy |

---

## Summary: Section Count

| Shopify Section | Count | Used For |
|---|---|---|
| `pg-header-anchor-links` | 1 | Sticky nav |
| `pg-pdp-hero-atf` | 1 | PDP hero (template A only) |
| `pg-sp-hero-atf` | 1 | Sales page hero (template B only) |
| `pg-ugc-carousel` | 1 | UGC video testimonials |
| `pg-feature` | 12 | Frame Claim, Problem ×2, Consequence ×5, Mechanism, Features ×3, Training System, Countersell argument |
| `pg-transition-headline` | 1 | "3 Reasons..." headline |
| `pg-expect-timeline` | 1 | What to expect timeline |
| `pg-guru` | 1 | Chris McGinley expert profile |
| `pg-bundle-offer-box` | 1 | Mid-page CTA + pricing |
| `pg-text-testimonials` | 1 | Testimonials grid |
| `pg-guarantee` | 1 | 365-Day guarantee |
| `pg-us-vs-them` | 1 | SpeedTrac comparison chart |
| `pg-product-specifications` | 1 | Specs table |
| `pg-urgency` | 1 | Final CTA block |
| `pg-faqs` | 1 | FAQ accordion |
| **NEW: Speed Training Timeline** | 1 | Historical timeline (Section 4) |
| **NEW: Y-Trac Interactive** | 1 | Interactive weight selector (Section 8) |
| **TOTAL** | **~27 sections per template** | |

---

## New Sections Required

### 1. Speed Training Historical Timeline (Section 4)
- **Purpose:** Horizontal swipe timeline showing the history of speed training (708 BC → 1971 → 2012-2026)
- **Key Requirements:** Horizontal swipe/scroll interaction, historical date entries with descriptions, dynamic/entertaining visual treatment
- **Design Reference:** golfgamebook.com/about-us
- **Content Reference:** `spd-speed-training-timeline.md`

### 2. Y-Trac Interactive Feature (Section 8)
- **Purpose:** Interactive weight positioning UI where users drag/tap the Y-Trac weight to heel/center/toe positions
- **Key Requirements:** Three tap/drag target positions with pulsing orb indicators, position-based dynamic copy switching, visual representation of weight track, corresponding ball flight path display per position
- **Interaction Pattern:** User taps position → copy for that position appears below

---

## Sections Requiring Modification

### 1. `pg-pdp-hero-atf` (Section 1A)
- **Current:** Loft multi-select (50°/56°/60°/63°) for ONE.1 wedge
- **Needed:** Hand single-select (RH/LH) + Shaft Flex single-select (Strong/Regular)
- **Also:** Single-item pricing ($249/$199), SpeedTrac-specific checklist items, Product Highlights TLDR (Q&A table below gallery)

### 2. `pg-bundle-offer-box` (Section 14)
- **Current:** Loft multi-select + multi-wedge pricing calculation
- **Needed:** Hand single-select (RH/LH) + Shaft Flex single-select (Strong/Regular), single-item pricing, SpeedTrac-specific checklist items and toggle copy

### 3. `pg-us-vs-them` (Section 11B)
- **Current:** SF2 vs SF1 vs competitor columns, 6 feature rows
- **Needed:** SpeedTrac vs Multi-Club Sets vs Single Adjustable Sticks columns, 7 feature rows (may need schema update for additional row)

---

## Section Order (PDP Template)

1. `pg-header-anchor-links`
2. `pg-pdp-hero-atf`
3. `pg-ugc-carousel`
4. `pg-feature` — Frame Claim
5. **NEW: Speed Training Timeline**
6. `pg-feature` — Problem: Traditional Speed Training
7. `pg-feature` — Problem: Science of Speed Sticks
8. `pg-transition-headline` — "3 Reasons..."
9. `pg-feature` — Consequence: Reason #1
10. `pg-feature` — Consequence: Reason #2
11. `pg-feature` — Consequence: Reason #3
12. `pg-feature` — Consequence: Slice Application
13. `pg-feature` — Consequence: Hook Application
14. `pg-feature` — Mechanism: Introducing SpeedTrac
15. **NEW: Y-Trac Interactive Feature**
16. `pg-feature` — Feature: Speed Spoon Clubhead
17. `pg-feature` — Feature: SpeedTrac Stack
18. `pg-feature` — Feature: Molded Training Grip
19. `pg-feature` — Training System (Martin Borgmeier)
20. `pg-feature` — Countersell: Built For Amateurs
21. `pg-us-vs-them` — Comparison Chart
22. `pg-expect-timeline` — What To Expect
23. `pg-guru` — Chris McGinley Expert Profile
24. `pg-bundle-offer-box` — Mid-Page CTA + Pricing
25. `pg-text-testimonials` — Testimonials
26. `pg-guarantee` — 365-Day Guarantee
27. `pg-product-specifications` — Specifications
28. `pg-urgency` — Final CTA Block
29. `pg-faqs` — FAQ

**Sales Page Template:** Same, except replace `pg-pdp-hero-atf` (position 2) with `pg-sp-hero-atf`.

---

## Pricing Reference

| Price Point | Amount |
|---|---|
| Non-Member Price | $249 |
| Member Price (PG1) | $199 |
| Savings Callout | PG1 Members Save $50 |

---

## Color Reference (PG Brand)

| Token | Hex | Usage |
|---|---|---|
| Orange | `#FD3300` | CTAs, accents, labels |
| Black | `#1D1A1A` | Headlines, dark backgrounds |
| Mist | `#FCFAFA` | Light backgrounds |
| Fog | `#F4F2F0` | Hero backgrounds |
| Sand | `#ECE9E4` | Card backgrounds |
| Dark Card | `#2A2727` | Dark section cards |
| Body Text | `#333333` | Body copy |
| Muted | `#7B726C` | Labels, guarantee text |

---

*Section mapping updated: 2026-02-27*
*Copy source: spd-copy-sales-page-pdp.md*
