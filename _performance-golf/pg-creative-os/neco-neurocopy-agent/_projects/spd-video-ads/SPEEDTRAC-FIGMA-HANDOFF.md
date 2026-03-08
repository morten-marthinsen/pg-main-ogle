# SpeedTrac Figma Board + Video Ad Scripts — Session Handoff

**Date**: 2026-02-27 (created) | 2026-03-06 (last updated S043)
**Owner**: Christopher Ogle
**Agents**: Neco (personas + copy), COS root (Figma board)

> **Current State (S043)**: Persona workshop COMPLETE (5/5 locked). Hero persona LOCKED (First from the Fairway). 3 body angles LOCKED. Comeback King renamed to The Fading Competitor (S042). Script writing IN PROGRESS — sourcing from VSL body first. Figma board DEFERRED until scripts are drafted. This doc is the Figma board's source of truth — updated to reflect all S039-S043 decisions.

---

## Intent

Christopher is fusing two tasks into one workflow:

1. **Build the SpeedTrac Figma Board** — the first product-level Figma board per Creative OS PRD Section 3.4. This becomes the centralized source of truth for SpeedTrac creative direction: product info, look/feel, personas, ad set structure (angle x persona grid), talent direction, and campaign mapping. Built for JoJo and the wider team to open and immediately understand who we're targeting, what the creative direction is, and what content is needed for shoots.

2. **Write SpeedTrac Video Ad Scripts** — due tomorrow (Feb 28). These flow directly FROM the persona work — personas first, then angles, then scripts. The Figma board is the strategic foundation; the video ad scripts are the first output.

**Key principle (Christopher-directed):** Personas drive everything. Personas first → angles second → hooks/scripts third. The Neco S036 angle library (32 angles, 5 segments, 3 concepts) was an experiment and should be treated as reference material, NOT as the driving structure. We rebuild personas from research, then let those personas inform the angle selection and script writing.

---

## What's Been Done This Session

### Figma MCP Server Installed
- **Official Figma remote MCP** added: `https://mcp.figma.com/mcp` (HTTP transport)
- Added to local config at `~/.claude.json`
- Requires: Figma Pro plan (confirmed upgraded), Full seat
- **No existing SpeedTrac Figma file** — creating from scratch

### Research Files Ingested
All SpeedTrac research files have been read and are available in context:

| File | Path (relative to `_pg-physical-products/spd/`) | Status |
|------|--------------------------------------------------|--------|
| Main Copy Doc | `1a-spd-research/spd-speedtrac-v1.md` | FULLY READ |
| Proof Elements | `1a-spd-research/spd-speedtrac-v1-proof.md` | PARTIALLY READ (saved to tool-results) |
| Features | `1a-spd-research/spd-speedtrac-v1-features.md` | TOO LARGE (84K tokens, 22 lines of mega-text) — need chunked reads |
| Competition | `1a-spd-research/spd-speedtrac-v1-competition.md` | FULLY READ (8 competitors profiled) |
| Comparison | `1a-spd-research/spd-speedtrac-v1-comparison.md` | FULLY READ |
| Micro-Scripts | `spd-backend-vsls/spd-up1-sf2-arena-output-1/spd-_speedtrac-copy-micro-scripts.md` | FULLY READ |
| Deep Research Brief | `1a-spd-research/speedtrac v2 outputs/speedtrac/00-deep-research/speedtrac-brief.md` | FULLY READ |
| Product Innovation PDF | `1b-spd-product-innovation/speedtrac.pdf` | UNREAD — needs `brew install poppler` for PDF rendering |
| Neco Angle Library | `../../pg-creative-os/neco-neurocopy-agent/_projects/spd-video-ads/spd-video-ad-angles.md` | PARTIALLY READ (segments A-E read, angles/concepts available as reference) |

### Transcript Intelligence Extracted

**From 02/25 JoJo/Christopher call:**
- Figma board = "vision board for the product" — central location for visuals, documentation, look/feel, personas
- JoJo's definition of creative direction: what assets, how many, what type, when, what the company wants them to look like
- Personas should be deep (comeback king vs. skeptical equipment veteran — same demographic, different value systems)
- Talent selection should MAP to personas before shoots
- Hero persona selection is critical
- JoJo wants to collaborate on the board before broader presentation — "you and I can beat it up, then present to John"
- Briefs to influencers should flow FROM the Figma board personas
- Caution against big group calls — prefer Christopher builds vision → Christopher + JoJo refine → present to leadership

**From 02/24 Creative OS Kickoff:**
- SpeedTrac used as the EXAMPLE in the presentation for the angle x persona testing grid
- Root angle example: "Speed Without the Slice"
- 5 example personas: Weekend Warriors 50+, Competitive Amateurs 35-55, High Handicap Improvers, New Golfers, Data-Driven Golfers
- Minimum 3, max 5 ad sets per launch; each ad set = one angle across ALL personas
- At least 2 ad sets must be UGC-generated organic angles
- Expansion testing: vertical (hook stacking) and horizontal (environment changes)
- Figma board identified as Day 30 milestone (~March 11)

---

## SpeedTrac Product Context (Condensed)

### Core Positioning
- **DSI**: "The only swing trainer that gives you speed AND accuracy at the same time"
- **Binary Frame**: Fast AND Straight vs. Fast OR Straight
- **Category**: Speed + Accuracy Training (category of one)
- **Price**: $199 (confirmed in micro-scripts)
- **Guarantee**: 365-day "Permission to Fail"

### 5 Hero Mechanisms
1. **Y-Trac Weight System** — off-axis, adjustable weight (heel/toe/center), 15 configurations
2. **Speed Spoon Head** — mini-driver shaped, real face profile, open crown
3. **SpeedTrac Stack** — 5 weight configs (145g-255g), complete overspeed/overload protocol
4. **Non-Axial CG Engine** — CG positioned OFF swing axis (unlike ALL competitors)
5. **Zip & Flip Weight System** — quick-change weight bag, tool-free, under 30 seconds

### Competitive Landscape (ALL shaft-aligned, NONE train face control)
| Competitor | Price | Key Weakness vs. SpeedTrac |
|-----------|-------|---------------------------|
| SuperSpeed | $130-$200 | 3 separate clubs, no face control, bulky |
| Stack System | $299+ (+ $230 radar + $100/yr app) | Axial weight, steep learning curve, expensive |
| Rypstick | $199 | Axial weight, no face control |
| Orange Whip | $100 | Tempo tool, not real speed trainer |
| Speed Toad | $125-$150 | Attaches to YOUR driver, but axial weight |
| Others | $69-$179 | Legacy/niche, all axial |

### Approved Micro-Scripts
**Core DSI / Binary Frame (APPROVED):**
- Speed without the slice
- More yards, same fairway
- Distance you can aim
- The speed you keep
- Bomb it and find it
- Longer off the tee, not further in the trees
- Finally, distance with direction

**Problem Agitation (APPROVED):**
- All gas, no steering
- Your speed went up, your handicap didn't go down
- Stop practicing your bad habits at higher speeds

**Mechanism (APPROVED):**
- Real club weight, real club feel
- One tool, 15 configurations

### Key Audience Language (Verbatim from Research)
**Pain:**
- "62 years old. Between 45 and 50 I lost probably 15 yards... Now my driver carry is closer to 210 yards. Depressing."
- "I just haven't been able to get behind the idea that hitting a club further makes it more accurate."
- "I absolutely sprayed the ball." (post-speed-training)
- "Tried super speed sticks and actually caused an injury."
- "Bought a RypStick... took a video of one session and that was it. Disgusting swings."

**Desire:**
- "My cruising driver swing speed has went from 96mph to 103mph... it's great having a gap wedge into a hole when you're used to hitting an 8 iron."
- "I went from 111->120 and added 20 yards carry. Worth it."

### Proof Foundation
- USGA: 2.84 yards per 1 mph swing speed gain
- Mark Broadie strokes gained: distance = most valuable stat
- 5-15 mph untapped speed potential in amateur golfers
- Off-axis force vectors create face awareness (physics validation)
- Every competitor uses shaft-aligned (axial) weight — SpeedTrac is the ONLY non-axial trainer

---

## Existing Neco Segments (S036 — Reference, Not Driving Structure)

These 5 segments were generated autonomously from research. They are REFERENCE for the persona work — Christopher wants to rebuild personas deliberately.

| Segment | Name | Awareness | Age | Research Grounding |
|---------|------|-----------|-----|-------------------|
| A (Primary) | Age-Decline Griever | Problem Aware | 50-65 | 470 age-decline quotes |
| B (Secondary) | Plateau Prisoner | Solution Aware | 35-55 | 181 plateau mentions |
| C (Tertiary) | Speed-Accuracy Skeptic | Solution Aware | 40-60 | 47 swing-wrecking + 34 non-transfer mentions |
| D (Quaternary) | Competitor Refugee | Product Aware | 30-55 | Competitor-specific complaints |
| E (Quinary) | Distance-Anxious Peer Comparer | Problem Aware | 35-60 | Social distance anxiety verbatims |

---

## Figma Board Structure (Per PRD Section 3.4)

The board should follow this hierarchy:

```
SPEEDTRAC FIGMA BOARD
─────────────────────────────────────────────────────
1. PRODUCT OVERVIEW
   ├── Product name, price, guarantee
   ├── DSI: "The only swing trainer that gives you speed AND accuracy at the same time"
   ├── Binary Frame: Fast AND Straight vs. Fast OR Straight
   ├── 5 Hero Mechanisms (visual cards)
   └── Look & Feel / Inspiration (mood board section)

2. BRAND THREAD ALIGNMENT
   ├── Thread 1: Smarter Way to Play Better Golf
   ├── Thread 2: Stories of Innovation
   └── Root Angle: Speed Without the Slice

3. PERSONAS (the centerpiece — Christopher builds these)
   ├── PG-Level Persona mapping
   ├── Product-Level Personas (3-5, with deep behavioral profiles)
   │   ├── Hero Persona [selected]
   │   ├── Persona 2
   │   ├── Persona 3
   │   └── [etc.]
   └── Each persona: photo/visual, name, age, wound, desire, internal dialogue, mechanism fit

4. AD SET TESTING GRID (Angle x Persona)
   ├── Ad Set 1: [Angle name] [Brand Thread]
   │   └── Persona A → Persona B → Persona C → etc.
   ├── Ad Set 2: [Angle name] [Brand Thread]
   │   └── Persona A → Persona B → Persona C → etc.
   ├── [Ad Set 3-5]
   └── UGC Ad Sets (min 2)

5. EXPANSION TESTING MAP
   ├── Vertical Expansion: Hook stacking (5 hook types per winning combo)
   └── Horizontal Expansion: Environment changes (range, simulator, course, home, pro shop)

6. TALENT DIRECTION
   ├── Talent mapped to personas
   ├── Interview/content direction per persona
   └── Shoot asset checklist (lifestyle, studio, testimonial, etc.)

7. ASSET TRACKER
   └── Asset ID / Brief Owner / Status per ad set x persona cell
```

---

## Hero Persona Selection (S042 — LOCKED)

**Hero Persona**: First from the Fairway
**Selected by**: Christopher Ogle (S042, 2026-03-06)

**Why**: Social wound (being outdriven publicly) is the #1 purchase trigger in the research corpus. 95% of buyers are active regular golfers who play in groups — First from the Fairway is the only persona that requires the social context the dominant buyer lives in. Best "Fast AND Straight" fit: gaining speed that sprays sideways makes the social wound WORSE.

**All 5 personas appear in every script** — First from the Fairway leads hooks, other personas power different sections of the body.

Full rationale: see `spd-persona-workshop.md` > Hero Persona Selection.

---

## Ad Set Testing Grid (3 Angles x 5 Personas)

This is the grid that maps directly to the Figma board's Ad Set Testing section (Section 4 in board structure above).

| | First from the Fairway (HERO) | The Fading Competitor | Skeptical Equipment Veteran | The Plateau Prisoner | Accurate But Two Clubs Back |
|---|---|---|---|---|---|
| **Script 1: "Fast AND Straight"** (Category Killer) | Hook 1 (social wound) | Hook 2 (identity erosion) | Hook 3 (mechanism skepticism) | Hook 4 (system plateau) | Hook 5 (strategy ceiling) |
| **Script 2: "The Smartest Way to Add Distance"** (Strategic Intelligence) | Hook 1 | Hook 2 | Hook 3 | Hook 4 | Hook 5 |
| **Script 3: "Where Did The Speed Go?"** (Age-Decline Reclamation) | Hook 1 | Hook 2 | Hook 3 | Hook 4 | Hook 5 |

**Structure**: Each cell = one persona-specific hook that enters a shared script body. 3 scripts x 5 hooks = 15 hook variants total. Bodies are shared per script (not per persona).

**Format**: 90-120s long-form social. Three-column production format (Timecode | Visual/Talent Direction | Copy/VO).

---

## Persona Layer Model (How Personas Stack Within Each Script)

Not every persona gets their own script. Instead, personas play ROLES within each script:

| Script Section | Persona Role | Why |
|---------------|-------------|-----|
| **Hook** (0-8s) | All 5 personas get separate hooks (tested independently) | Persona at hook level = audience targeting. Each hook enters the same body. |
| **Body — Wound/Problem** (8-30s) | The Fading Competitor | Identity-erosion psychology is the deepest emotional layer. Powers the "why this matters" section. |
| **Body — Mechanism/Proof** (30-80s) | Skeptical Equipment Veteran | Analytical skepticism demands physics-level explanation. If it convinces HIM, it convinces everyone. |
| **Body — Ceiling/Reframe** (variable) | Accurate But Two Clubs Back + The Plateau Prisoner | Strategic ceiling and system plateau provide the "even if you've tried everything" objection handling. |
| **CTA** (80-120s) | First from the Fairway | Return to the social wound — the drive sailing past everyone. Visual resolution of the hook's tension. |

This means the Figma board's talent direction should map talent to persona ROLES, not just persona demographics.

---

## Phased Work Plan (Updated S043)

### Phase 1: SpeedTrac Persona Workshop — COMPLETE (S039-S042)
- 5/5 personas locked. Hero persona selected. 3 body angles locked.
- See `spd-persona-workshop.md` for all decisions.

### Phase 2: Video Ad Script Writing — IN PROGRESS (S043+)
- **Step 1**: Source body copy from existing SpeedTrac VSL (Christopher directive — write ads from the VSL first)
- **Step 2**: Write Script 1 — "Fast AND Straight" (Category Killer), 5 persona hooks, three-column production format
- **Step 3**: Write Script 2 — "The Smartest Way to Add Distance" (Strategic Intelligence)
- **Step 4**: Write Script 3 — "Where Did The Speed Go?" (Age-Decline Reclamation)

### Phase 3: Figma Board Creation — DEFERRED
- Build after scripts are drafted. Scripts populate the ad set grid.
- Board structure defined above (Section 1-7). Persona cards, ad set grid, talent direction all feed from completed scripts.
- Share with JoJo for collaborative review before presenting to John.

---

## Remaining Gaps

| # | Gap | Impact | Resolution |
|---|-----|--------|------------|
| 1 | Features file unreadable (84K tokens in 22 lines) | Missing granular feature details | Main copy doc covers 5 hero mechanisms sufficiently |
| 2 | Product Innovation PDF unreadable | Missing visual/engineering context | Christopher provides key details verbally as needed |
| 3 | Figma MCP untested | Unknown if MCP works end-to-end | Test when Phase 3 begins — not blocking scripts |
