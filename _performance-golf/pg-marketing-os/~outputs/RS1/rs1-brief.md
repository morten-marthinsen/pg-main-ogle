# Deep Research Brief — RS1 Putter

**Created:** 2026-03-10
**Status:** DRAFT — Awaiting human approval before execution

---

## SECTION 1: PRODUCT IDENTITY [REQUIRED]

```yaml
product:
  name: "RS1 Putter"
  category: "Physical Product — Premium Golf Putter"
  one_sentence: "A forward-weighted, face-down balanced mallet putter with Roll Straight Technology that uses heavy forward weighting (75%+ of 360g head weight in front 25% of head) and a 74° upright lie angle to eliminate face drift, counteract toe flow, and help the player's technique — not just the equipment — deliver a consistently square face through the stroke."
  price_point: "$399 (Standard: steel shaft, rubber grip) / $429 (Upgraded: graphite shaft, poly urethane grip)"

market:
  mode: "B"  # New product, no existing marketing in market yet (pre-launch)
  industry: "Golf Equipment — Premium Putters"
```

---

## SECTION 2: EXISTING ASSETS [REQUIRED FOR MODE A]

```yaml
assets:
  sales_page: ""  # Pre-launch — no live page yet
  other_urls:
    - "https://labgolf.com/pages/df3-putter"  # Primary competitor reference
    - "https://www.scottycameron.com"  # Competitor reference
    - "https://www.taylormadegolf.com/Spider-Tour-X/"  # Competitor reference
    - "https://www.odysseygolf.com"  # Competitor reference (Ai-ONE)
  documents:
    - "_performance-golf/_pg-physical-products/rs1/0b-rs1-product-innovation/rs1-putter.md"  # Chris McGinley's product deck (SOURCE OF TRUTH for all technical specs)
    - "_performance-golf/_pg-physical-products/rs1/0b-rs1-product-innovation/pg-rs1-product-deck.md"  # Product deck text export
    - "_performance-golf/_pg-physical-products/rs1/0b-rs1-product-innovation/rs1-chris-call-summary.md"  # Chris McGinley strategy call (Feb 25, 2026)
    - "_performance-golf/_pg-physical-products/rs1/0b-rs1-product-innovation/chris-call-transcript.md"  # Full transcript of Chris call
    - "_performance-golf/_pg-physical-products/rs1/0a-rs1-research/rs1.md"  # Existing competitor research (9 premium putters profiled)
    - "_performance-golf/_pg-physical-products/rs1/0a-rs1-research/rs1-research-and-copy-doc.md"  # Combined research/copy doc
    - "_performance-golf/_pg-physical-products/rs1/0a-rs1-research/rs1-root-cause-output.md"  # Previous root cause work (reference only, not approved)
    - "_performance-golf/_pg-physical-products/rs1/0a-rs1-research/rs1-mechanism-output.md"  # Previous mechanism work (reference only)
    - "_performance-golf/_pg-physical-products/rs1/0a-rs1-research/rs1-promise-output.md"  # Previous promise work (reference only)
    - "_performance-golf/_pg-physical-products/rs1/0a-rs1-research/rs1-big-ideas-output.md"  # Previous big idea work (reference only)
    - "_performance-golf/_pg-physical-products/rs1/0a-rs1-research/rs1-proof-inventory-output.md"  # Previous proof inventory (reference only)
    - "_performance-golf/_pg-physical-products/rs1/2-rs1-copy/rs1-gemini-sales-page-copy.md"  # Gemini-generated copy (decent reference, NOT approved)
    - "_performance-golf/_pg-physical-products/rs1/2-rs1-copy/rs1-gemini-micro-scripts.md"  # Gemini micro-scripts (reference only)
    - "~/Downloads/RS1 Putter.pdf"  # Product deck PDF with visuals
    - "~/Downloads/RS1 Putter Animations Requests 02.2026.md"  # Animation brief with Chris McGinley's technical corrections
    - "~/Downloads/PG_RS1_CreativePitchDeck_SHARE.pdf"  # Internal creative pitch deck — campaign platform, competitive landscape, creative direction
```

**CRITICAL NOTE ON EXISTING WORK:** Previous research outputs (root cause, mechanism, promise, big ideas, proof inventory) and copy outputs (Gemini, Claude, Codex versions) exist as REFERENCE MATERIAL ONLY. None are approved. The Gemini sales page copy is the strongest reference. This pipeline run is the definitive pass — all positioning and copy will be built fresh through the full Marketing-OS pipeline with proper gates and quality standards.

---

## SECTION 3: BUSINESS CONTEXT [OPTIONAL]

```yaml
context:
  why_now: >
    RS1 is Performance Golf's first premium physical product — a branded initiative
    that positions PG as a legitimate equipment innovator, not just a content/training
    company. This is a category-defining launch designed to establish PG in the premium
    putter space alongside LAB Golf, Scotty Cameron, and TaylorMade. The product is
    engineered by Chris McGinley (25+ years at major OEMs, worked on clubs for 11 world #1 players). Launch timeline is imminent — animations are
    in production, creative pitch deck is finalized, and the team needs copy for a premium
    branded e-commerce page (Apple/VanMoof style) plus organic social assets.

  decisions_pending:
    - "What is the definitive positioning hierarchy? (Forward weighting > Face Down Balance > Lie Angle — or different?)"
    - "How do we frame the LAB Golf comparison without being adversarial? (Evolutionary narrative: old putters → LAB → RS1)"
    - "What is the optimal page architecture for a premium branded eCom page (not a traditional DR VSL)?"
    - "Which proof elements (robot data, animations, Chris McGinley's credibility) carry the most weight for premium/serious golfers?"
    - "How do we earn the right to charge $399-429 when PG is known for sub-$200 products (SQ putter)?"
    - "What's the right balance of technical precision vs. emotional resonance for an audience that includes both tour pros and 15-handicappers?"

  launch_sku_config: >
    TWO OPTIONS AT LAUNCH (no further customization available initially):
    1. Standard ($399): Stepless steel shaft, 0.370 Tip, Dual Pistol Rubber Grip, 35" Length, 74° Lie, 3.5° loft — RH and LH
    2. Upgraded ($429): 15mm low torque graphite shaft, Dual Pistol Poly Urethane Grip — RH and LH
    FUTURE: Full customization shop planned (lie angle options, length, headweight, colors,
    laser engraving, etc.) — not for initial launch but will be built into the site later.
    The eCom page should be architected with this future expansion in mind.

  target_customer: >
    PRIMARY: Serious amateur golfers (5-20 handicap) who are actively trying to improve
    and willing to invest in premium equipment. They've likely researched putters, know
    about MOI, face balance, and stroke types. They may have considered or own a LAB Golf
    putter. They're frustrated by inconsistency on the greens — they can hit great
    approach shots but leave strokes on the green. Age 30-60, male-dominant, disposable
    income for $400 putter, tech-literate enough to appreciate engineering claims.

    SECONDARY: Low-handicap and scratch golfers (0-5) including club champions, mini-tour
    players, and serious competitors who want every edge. These buyers validate on specs
    and peer credibility — if Chris McGinley's name carries weight, they'll listen.

    TERTIARY: Equipment enthusiasts and gear junkies who follow MyGolfSpy, GolfWRX forums,
    and putter-specific YouTube channels. They buy on innovation narrative + proof. They'll
    scrutinize every claim.

    ASPIRATIONAL VALIDATION: Tour professionals and high-level influencers (Brixton Albert,
    Eric Cogorno, JT). Their adoption signals credibility to all three segments above.

  founders_500_launch: >
    FOUNDERS 500: An exclusive limited run of 500 RS1 putters with unique Performance Golf
    colorway. Same putter, distinct cosmetics. Only the first 500 buyers get this version —
    it will not be available again. Big-name golf influencers will receive and promote the
    Founders 500 edition. Their content (video, photos, reactions) becomes social proof
    assets that can be leveraged on the main eCom page post-launch. This creates a built-in
    credibility layer: by the time the general RS1 page is live, there will be influencer
    footage of real players using the putter in real conditions.

  page_credibility_architecture: >
    NO SINGLE GURU / FACE FOR THIS PAGE. This is a product-led page, not a personality-led
    page. Two key people featured:
    1. CHRIS McGINLEY — The product innovator/engineer. 25+ years at major OEMs, worked on
       clubs for 11 world #1 players. He is the technical credibility anchor. His role on
       the page: the expert who designed this, the "why it works" authority.
    2. BRIXTON ALBERT — PG CEO and visionary. His role on the page: the founder who wanted
       a premium putter good enough for his PGA Tour friends AND for PG customers. The "why
       it exists" story — bridging tour-level quality with direct-to-consumer accessibility.
    PLUS: Influencer/pro social proof from Founders 500 seeding. These are not testimonial
    sections — they're credibility signals (footage, reactions, on-course use). Think
    "as seen with" not "as endorsed by." The page earns trust through engineering proof
    and visible adoption, not through a single spokesperson.
```

---

## SECTION 4: HYPOTHESES TO VALIDATE [OPTIONAL, MAX 5]

```yaml
hypotheses:
  - statement: "Face Drift is a more resonant problem name than 'toe flow' for golfers across all skill levels"
    rationale: >
      'Toe flow' is an industry term that serious golfers know, but 'face drift'
      describes the EXPERIENCE (the face drifting off-line) rather than the MECHANISM
      (the toe flowing open). Donnie proposed this reframe in the Chris McGinley call
      and it tested well internally. Need to validate whether the broader market
      responds to this language.

  - statement: "LAB Golf's primary weakness is distance control, unconventional aesthetics, and the fact that it still requires the player to control face rotation"
    rationale: >
      Chris McGinley's core technical argument: LAB's Zero Torque design eliminates
      mechanical toe flow but does NOT actively counteract player-induced face opening.
      The player still has to control the face. RS1's forward weighting creates an
      opposing force that HELPS the player. Online sentiment analysis of LAB reviews
      should validate whether distance control and feel complaints are real pain points.

  - statement: "Premium golfers will pay $399-429 for a putter from Performance Golf IF the engineering credibility (Chris McGinley) and proof (robot data, animations) are strong enough"
    rationale: >
      PG is primarily known as a content/training brand, not an equipment brand. The
      price point puts RS1 alongside Scotty Cameron ($449-469) and LAB ($449-499).
      The credibility bridge is Chris McGinley's pedigree and the visible engineering
      sophistication (10-piece multi-material construction, CNC machining, etc.).

  - statement: "The evolutionary narrative (old putters created face drift → LAB eliminated mechanical toe flow but left the player alone → RS1 eliminates drift AND helps the player) is the most compelling competitive frame"
    rationale: >
      This was the consensus narrative from the Chris McGinley call. It positions
      RS1 as the logical next step rather than a competitor — respecting LAB's
      innovation while claiming the next chapter. Need to validate this lands with
      actual golfer sentiment.

  - statement: "The 'gravity-driven / let it fall' concept is the emotional hook that makes the technology story feel simple and physical"
    rationale: >
      The creative pitch deck proposes 'Built To Fall' as the campaign platform with
      'Let it fall' as the tagline and 'Gravity-Driven. Face-Controlled.' as the
      product truth. This reframes the forward weighting benefit from a technical
      spec into a physical feeling — you take the putter back and gravity pulls the
      heavy face forward naturally. Need to validate whether this metaphor resonates
      or oversimplifies.
```

---

## SECTION 5: ADDITIONAL QUESTIONS [OPTIONAL]

```yaml
additional_questions:
  - "How do golfers currently describe the experience of their putter face opening during the stroke? What language do they use? (Validates 'face drift' naming)"
  - "What are the top 3-5 reasons golfers switch putters? Is it frustration-driven or aspiration-driven?"
  - "How does LAB Golf position itself in their own marketing? What claims do they make? What proof do they lead with?"
  - "What is the current discourse around putter technology innovation on GolfWRX, Reddit r/golf, and MyGolfSpy? Is there appetite for a 'next generation' narrative or fatigue?"
  - "What premium putter e-commerce pages (any brand, any sport) are best-in-class for branded product storytelling? (Design/copy reference for the Apple/VanMoof-style page)"
  - "How do serious golfers talk about the difference between a 'mallet feel' and a 'blade feel'? RS1 claims 'mallet with blade feel' — how unique/credible is this?"
  - "What objections do golfers raise when a non-traditional brand (not Scotty, TaylorMade, Ping, Odyssey) enters the premium putter space?"
  - "What specific language do golfers use when describing inconsistent putting — the frustration, the self-blame, the streakiness?"
  - "What is the customer sentiment around Zero Torque / Lie Angle Balance technology specifically? (Strengths and weaknesses as perceived by users)"
```

---

## SECTION 6: EXPLORATION EMPHASIS [OPTIONAL, MAX 3]

```yaml
exploration_emphasis:
  - area: "LAB Golf customer experience + HOW they popularized torque as a mainstream concept"
    why: >
      LAB is the primary competitor and the clearest 'before' in the evolutionary
      narrative. But beyond customer sentiment, we need to understand HOW LAB made
      'zero torque' a mainstream conversation. Torque was a real physics concept that
      recreational golfers didn't talk about — LAB popularized it and built a movement.
      PG is running the same playbook with FORWARD WEIGHTING. Research should map:
      (1) what LAB converts love and what still frustrates them, (2) why LAB skeptics
      didn't buy, (3) the specific language, proof, community, and influencer strategy
      LAB used to make torque mainstream. Deep-dive LAB Golf reviews, marketing,
      GolfWRX, Reddit, YouTube comments, MyGolfSpy testing.

  - area: "Golfer emotional language around putting frustration and inconsistency"
    why: >
      The page copy needs to mirror EXACTLY how golfers describe the experience of
      missing putts they should make. This isn't about technical specs — it's about
      the feeling of walking off the green knowing you left 3-4 strokes out there.
      The copy needs to sound like someone who's been there, not someone describing
      the physics. Reddit, forums, YouTube comments after round vlogs.

  - area: "Premium product launch storytelling in equipment/tech (cross-industry)"
    why: >
      This page needs to feel like Apple, VanMoof, or a premium DTC equipment brand —
      not a typical golf e-commerce listing. Research how brands like LAB Golf,
      Scotty Cameron, VESSEL (golf bags), PXG, and non-golf brands (Dyson, Peloton,
      Ridge Wallet) position premium products with engineering narratives. What page
      structures, proof hierarchies, and storytelling patterns work?
```

---

## SECTION 7: CONSTRAINTS [OPTIONAL]

```yaml
constraints:
  budget: 50  # Increased from default — this is a flagship launch with deep competitive analysis needed
  timeline: "standard"  # Full process, no shortcuts
  platform_restrictions:
    - "PRIORITIZE: Reddit r/golf, GolfWRX forums, MyGolfSpy reviews/testing, YouTube putting content comments, LAB Golf reviews"
    - "INCLUDE: Amazon putter reviews (LAB, Scotty, TaylorMade Spider), golf equipment review sites"
    - "INCLUDE: Premium DTC brand pages for design/copy reference (cross-industry)"
```

---

## STRATEGIC NOTES (Inferred — review carefully)

### What transfers from existing work:
- **Competitive landscape** is well-mapped (9 premium putters profiled with user feedback in `rs1.md`)
- **Product specs and technical claims** are locked via Chris McGinley's product deck and call — these are SOURCE OF TRUTH
- **Chris McGinley's corrections** in the animation brief are critical guardrails:
  - The putter does NOT "stabilize the arc" — the arc is player-dependent
  - Correct: the putter HEAD is stable throughout the arc because it eliminates mechanical toe opening flow and resists player-induced face opening
  - The more upright lie angle ENCOURAGES less arc — less arc = better chance to keep face square
- **Tagline:** "Let it fall." (preferred over "Built To Fall") — double entendre: let gravity pull the putter through the stroke AND let the ball fall in the hole
- **Product truth line:** "Gravity-Driven. Face-Controlled."
- **Supporting theme:** "Do less. Make more." — the putter does more work (technology + technique) so the golfer does less and makes more putts
- **Creative direction** is locked: "Quiet Premium + Precision Overlay" — modern, restrained, not overproduced
- **Direct response principles, premium branded execution.** PG is a DR company — the logical argument structure, proof hierarchy, and persuasion architecture are rooted in DR. But the language, formatting, and tone are premium branded. No hype, no countdown timers, no overclaiming.

### Core positioning — the dual promise (CRITICAL):
RS1 is the only putter that addresses BOTH pillars of great putting:
1. **The right technology** — forward weighting, FDB, and the full Roll Straight Technology system eliminate face drift at the equipment level
2. **The right technique** — the design actively HELPS the player's technique (natural pendulum stroke, upright lie encourages less arc, forward weighting creates gravity-driven motion the player doesn't have to force)
Every other putter on the market addresses only pillar #1 (technology). Even LAB Golf, which eliminated mechanical torque, still leaves the player alone to manage their own technique. RS1 gives the golfer both — technology that fixes the equipment AND assists the human stroke. This dual promise must be woven into every layer of the positioning.

### What needs fresh research:
- Real golfer language around putting frustration (voice-of-customer mining)
- LAB Golf customer sentiment at depth (not just feature comparisons)
- HOW LAB popularized torque as a mainstream concept (language, proof, influencer strategy, community) — this is the playbook PG replicates with forward weighting
- Premium brand storytelling patterns for the eCom page architecture
- Validation of "face drift" as a consumer-facing term
- Evidence base for the evolutionary narrative (old → LAB → RS1)

### Technical language guardrails (from Chris McGinley):
- **Forward weighting** = the hero argument (75%+ of weight in front 25% of head)
- **Face Down Balance (FDB)** = secondary to forward weighting, but the visual proof (face sits down on table)
- **Face drift** = the problem name (replaces "toe flow" for consumer-facing copy)
- **Roll Straight Technology** = the umbrella name for the full technology system
- **RL STR8** = the technology branding mark
- **74° lie angle** = stock spec, more upright than industry standard 70°
- **10-piece construction** = steel face, aluminum tail, carbon composite crown, precision-milled shaft spuds
- **360g total head weight** = with 265g+ in the face (weight of a typical #7 iron head)
- **NOT "adjustable"** — use "spec customization" (Chris's correction)
- **Lie angle customization NOT in initial launch** — only 74° offered at retail
- **Ambidextrous** via flipped shaft assembly (unique, potentially sellable)
- **Patented Dual Pistol Grip** = only dual-sided pistol grip in the market

### Page format note:
This is NOT a traditional DR long-form VSL page. This is a branded eCom product page — think Apple product pages, VanMoof, LAB Golf's own pages. The copy engine will run through core message and select long-form copy skills, but the final deliverable is section-by-section eCom copy + design notes for the design team to build a premium scrolling experience with animations, parallax, and beautiful product photography.

---

*Brief Version 1.0 | Marketing-OS Deep Research v3 System*
