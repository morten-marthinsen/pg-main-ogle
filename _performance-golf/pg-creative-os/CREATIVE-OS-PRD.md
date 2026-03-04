# Creative OS — Product Requirements Document

*Organization-Level Vision & Requirements for Performance Golf Creative Department*

**Version:** 1.1
**Created:** February 2026
**Updated:** February 2026 — Brand architecture restructured (Love Your Game tier added, Thread 1 renamed), data feedback loop added, persona architecture added, terminology aligned (ad sets vs. campaigns), Wispr Flow removed. Funnel Tier View replaced with Testing Lifecycle overview (root-core angle → net new → expansion types). SpeedTrac example expanded with vertical (hook stack) and horizontal (environment) expansion examples. Tess connection documented.
**Authors:** John Hardesty (CMO), Christopher Ogle (Interim Creative Lead)
**Status:** DRAFT
**Companion:** [CREATIVE-OS-PRD-PLAN.md](./CREATIVE-OS-PRD-PLAN.md) (planning context and history)

---

## 1. SYSTEM IDENTITY

### 1.1 What Creative OS Does

Creative OS is the organization and operating system for Performance Golf's creative department. It defines what success looks like for the creative team over 30/60/90 days, aligns all creative execution with research, data, strategy, and campaign themes, and serves as the single reference for how creative work is governed. Creative OS sits under Marketing OS and brings the Marketing OS to life through execution: ads, organic content, social, email design, and other creative output. It coordinates people, processes, and AI agents (Exa, Tess, Veda, Neco) so that every product launch and campaign ties into the same vision, reduces wasted time in meetings and Slack, and produces output that is 90–95% aligned from the start.

### 1.2 What Creative OS Does NOT Do

- NOT: Replace or define agent-level specs — those live in individual agent PRDs (e.g. EXA-PRD, TESS-PRD)
- NOT: Own copywriting methodology or long-form copy skills — those are Marketing OS (E5, A-Z, brand voice)
- NOT: Make creative decisions on behalf of John or Christopher — it establishes the rules and thinking; humans decide
- NOT: Update itself automatically — only senior team members update this PRD; a human is always in the loop
- NOT: Operate in isolation — it must align with Marketing OS and the broader marketing team

### 1.3 Success Criteria (High-Level)

| Criterion                        | Measurement                                                                      | Target                            |
| -------------------------------- | -------------------------------------------------------------------------------- | --------------------------------- |
| **30/60/90 On-Track**            | % of infrastructure + marketing track milestones met at each checkpoint          | To be set per track               |
| **Brand Thread Alignment**       | % of creative assets tagged to Thread 1 or Thread 2; visibility to teams and CEO | 100% of tracked assets mapped     |
| **Scalable Winners (Tess/Veda)** | Assets meeting scalable-winner threshold (currently 1x ROAS; defined in Tess)    | Per Tess roll-out                 |
| **GTM On-Time Delivery**         | Assets delivered per ClickUp/GTM calendar dates                                  | Definition TBD for ads team       |
| **Single Source of Truth**       | PRD (and forward-facing doc) is the unified reference for creative team          | One doc; KPIs measured against it |
| **Multi-Launch Capacity**        | System supports multiple product launches in parallel without breaking           | Required capability               |

---

## 2. ARCHITECTURAL PRINCIPLES

### 2.1 Core Design Philosophy

1. **One Foundation, Many Outputs:** Every campaign starts from the same foundation — research, data, angles, and themes from Marketing OS. Creative OS produces connected outputs for each stakeholder (ads, email, social, organic, UX) from that single starting point so alignment is built in, not negotiated after the fact. As campaigns launch and test data returns, these outputs are continuously refined. For every GTM offer, research determines the root angle — the big idea that encapsulates what the product does. The initial campaign launches with that angle, then multiple angles are tested at the **ad set** level. As confidence builds in which angles are working, we move winning angles into broader, larger **brand campaigns**. If a tested angle outperforms the original launch angle, we revisit and update the original to reflect what the data confirms is working. Creative OS is designed to close this feedback loop: research → angle → ad set testing → data → confidence → elevation.

2. **Two Threads, Every Asset:** All creative operates within two brand themes — *The Smarter Way to Play Better Golf* and *Stories of Innovation* — which ladder up to **Love Your Game**, PG's overarching brand promise. These threads feed each other and work in both directions: an innovation story opens the emotional door for the smarter path; the smarter path emotional hook is filled and justified by the innovation story. We use data to test and optimize within angles aligned to these threads; we do not chase performance at the cost of brand vision.

3. **Root Angle Principle:** Every creative asset is built around one root angle — a message communicable in 1–4 words. We test, optimize, and expand that angle; we identify new angles within assets and break them out into new **ad sets** for testing; we elevate winning root angles into **brand campaigns** over time. *(Terminology note: "ad sets" = Meta/YouTube/channel-level test units; "campaigns" = broader 360-degree brand campaigns. These are not interchangeable.)*

4. **Script–Visual Congruence:** Quality means the ad communicates the one root angle effectively. Visuals must align with and magnify the script. Incongruence creates dissonance and wastes ad spend. Reviewers must be able to watch an ad and know it delivers the one root angle in a way that hooks, holds, and inspires action.

5. **Scale the Vision, Not the Meeting:** The PRD captures strategic conversations once so they don't need repeating. The system (and sub-agents with challenger functions) should push to remember these principles and recommend ideas that connect dots, so output is 90–95% aligned before human review.

6. **Brand Halo Over Time:** We move from one-directional (our ads) to multi-directional (ads + influencers + PR + events + customer voice). Brand halo is the overall brand impact of the two threads, tracked via organic search, organic traffic, blended CAC, and related metrics. We use "brand halo" as our company term for this effect.

### 2.2 Architectural Constraints

- MUST: Reference and align with Performance Golf brand guidelines (`pg-brand-guidelines`)
- MUST: Ensure every creative asset includes brand guidelines (colors, fonts, logos), root angle (1–4 words), and CTA end card
- MUST: Run GTM creative through quality gates including Creative Director → Chris Ogle or John → Brixton (final pass)
- MUST: Support multiple product launches in parallel; launch dates driven by GTM calendar (ClickUp)
- MUST: Connect activity, tasks, and assets to Thread 1 and Thread 2 for visibility to teams and CEO
- MUST NOT: Ship creative that conflicts with brand threads for short-term performance
- MUST NOT: Allow sub-agents or humans to drift from PRD priorities without a challenger or alignment check when appropriate
- MUST NOT: Update the PRD automatically; only senior team members update it

### 2.3 Quality Standards for Creative Output

- **Effectiveness of message:** Visuals align with and magnify script; one root angle communicated effectively; hooks, holds, inspires
- **Brand thread alignment:** Checked at quality gates; uses brand guidelines, magician archetype, tone of voice, do's and don'ts
- **Creative strategy filter:** New ideas (angles, expansions) run through "how does this tie to our two brand themes?"
- **Ad checklist:** Editors use as thinking framework (DR + branding); not necessarily a literal tick-list every time
- **Persona testing for algorithm alignment:** While every ad has one root angle, different assets and horizontal expansions may test into different personas (aligned with Meta's Andromeda algorithm). The goal is to find the winning recipe: which angle resonates best with which persona. Winning angle × persona combinations build toward page tests (sales page) and, ultimately, 360-degree brand campaigns.

---

## 3. BRAND THREADS — STRATEGIC NORTH STARS

### 3.0 Brand Architecture Overview

```
PERFORMANCE GOLF BRAND ARCHITECTURE
─────────────────────────────────────────────────────

                     LOVE YOUR GAME
                  (Brand Promise / Tagline)
                          │
            ┌─────────────┴──────────────┐
            ↓                            ↓
  "The Smarter Way              "Stories of Innovation"
  to Play Better Golf"          (Brand Theme 2)
  (Brand Theme 1)
            │                            │
            └─────────────┬──────────────┘
                          ↓
              PRODUCT WE'RE ADVERTISING
                          │
                          ↓
                    ROOT CORE ANGLE
            (1–4 word message; one per asset)
                          │
                NET NEW & EXPANSION TESTING
            ┌─────────────┼─────────────┐
            ↓             ↓             ↓
        Persona A     Persona B     Persona C …

─────────────────────────────────────────────────────
TESTING LIFECYCLE:

  • ROOT-CORE ANGLE — The 1–4 word message anchoring every
    asset. This is the constant that never changes through
    the entire testing lifecycle.

  • NET NEW TESTING — Each ad set launches with 5 variations,
    each targeting a different persona. This is the discovery
    phase: which persona resonates most with this angle?

  • WINNING PERSONA IDENTIFIED — Data shows which persona
    wins. That's the signal to scale into that persona.

  • EXPANSION TESTING — Scale the winning angle × persona
    combination by running vertical and horizontal expansions.
    Each changes ONE production variable while holding the
    root angle fixed:

    Vertical Expansions (depth — same format, new creative):
      · Hook Stack — New hooks in front of winning asset
      · Scroll Stopper Refresh — New 0–3s attention opener
      · Duration — Shorter/longer cuts of winning asset

    Horizontal Expansions (breadth — new format or context):
      · Environment — Range, simulator, course, at home
      · Similar Presenter — Same demographic, different talent
      · Different Presenter — Different demographic entirely
      · Ad Format — Podcast, slice & dice, VO + B-roll, etc.
      · Copy Framework — Same visuals, different copy overlay
      · International — Adapt for a different geographic market

  • TESS (Strategic Scaling System) analyzes performance data
    across all testing phases and recommends which expansion
    types to run next. Operated by the copy team, overseen
    by Christopher.

  → Full expansion type definitions and naming convention:
    Strategic Scaling System (Tess & Naming Convention)
    https://docs.google.com/document/d/1q6Tm7XEukyq5ssYConJV0EoPXuGyYoWTsQW_4ivCAjA
─────────────────────────────────────────────────────
```

These two brand themes feed each other and always work in concert. In direct response, we might open with a *Smarter Way* emotional trigger — drilling into the feeling that the customer isn't yet on the smarter path — then fill that void with a *Story of Innovation* as the solution. Or we open with an innovation story that creates desire, then close with the *Smarter Way* framing to give it meaning. The two threads are always interconnected; they help customers understand and remember who Performance Golf is.

### 3.1 Thread 1: The Smarter Way to Play Better Golf

Education, improvement, and building a lifelong relationship with the game. This theme is not limited to digital products — it spans the full product ecosystem: quiz → PG1 → Swing Scan AI, and the physical product range (drivers, irons, putters, wedges). The promise is that PG offers a smarter, more efficient path to playing better — not just information, but the right tools, training, and connected experience. This theme is the emotional engine for email flows and upsell sequences (taking a customer from one product to the next), VIP golf experiences, and the broader connected journey. It intertwines with Stories of Innovation: innovation is the *proof* that the smarter path is real; the smarter path is the *vision* that makes innovation matter.

*(Note: Thread 2 description to be expanded in a future session with John.)*

### 3.2 Thread 2: Stories of Innovation

Showing the innovation story behind products: Chris McGinley's expertise, Joe King's experience, robot testing, CAD iterations, science and process. Goal: build credibility, trust, and enable premium pricing ($249 mid-tier vs discount brand). Visualize through 3D animations, clubmaker content, influencer reviews, PR. Whether for everyday golfers or pros (e.g. RS1), the story is that PG has real innovation and expert designers, not white-labeled product.

### 3.3 How We Use the Threads

- Every product launch and campaign ties into this PRD and thus to one or both threads
- When launching a product, we create documentation (text + Figma board) aligned with this PRD
- We want a view of how many assets align to Thread 1 vs Thread 2 (for teams and CEO)
- Metrics are at campaign and tactical level; thread alignment is the lens and visibility layer
- The threads work in both directions: a DR ad set might lead with Innovation (the solution story) and close with the Smarter Way (the emotional destination), or vice versa — they are always interconnected and together build brand recognition and recall

### 3.4 Figma Board — GTM Creative Mapping

Each GTM launch gets a Figma board card. The board maps the root angle, which brand thread(s) it connects to, all personas being tested, and the specific ad set assignments. Each ad set contains one angle tested against all personas — this is the core of the angle × persona discovery loop. The copy team gets complete clarity on who they're writing to; leadership gets a single visual of the launch's creative structure; the optimization team has a built-in expansion map once data returns. At least two ad sets per launch are UGC-generated organic angles, ensuring social proof and native formats are always part of the initial test battery. As campaigns mature, the Figma board becomes the record of what angles and personas have been tested, what won, and what was elevated.

**Example — SpeedTrac GTM Launch:**

```
GTM LAUNCH: SpeedTrac
─────────────────────────────────────────────────────
ROOT ANGLE: Speed Without the Slice
Thread: ☑ Smarter Way  ☑ Stories of Innovation  ☑ Both
│
├── PERSONAS (mapped from offer-level persona doc)
│   ├── Persona A: Weekend Warriors 50+
│   ├── Persona B: Competitive Amateurs 35–55
│   ├── Persona C: High Handicap Improvers
│   ├── Persona D: New Golfers
│   └── Persona E: Data-Driven Golfers
│
├── NN_ADDSET_STRUCTURE — Net New Ad Set Testing
│   │
│   ├── AD SET 1: "The Smarter Path to Speed"  [Smarter Way]
│   │   ├── Persona A  →  [Asset ID / Brief Owner]
│   │   ├── Persona B  →  [Asset ID / Brief Owner]
│   │   ├── Persona C  →  [Asset ID / Brief Owner]
│   │   ├── Persona D  →  [Asset ID / Brief Owner]
│   │   └── Persona E  →  [Asset ID / Brief Owner]
│   │
│   └── AD SET 2: "Built for Your Swing"  [Stories of Innovation]
│       ├── Persona A  →  [Asset ID / Brief Owner]
│       ├── Persona B  →  [Asset ID / Brief Owner]
│       ├── Persona C  →  [Asset ID / Brief Owner]
│       ├── Persona D  →  [Asset ID / Brief Owner]
│       └── Persona E  →  [Asset ID / Brief Owner]
│
│   LAUNCH RULES:
│   • Min 3 ad sets — Max 5 ad sets for initial testing
│   • Each ad set focuses on ONE angle across ALL personas
│   • At least 2 of the ad sets must be UGC-generated organic angles
│
├── EXPANSION TESTING (post-data — Persona A wins from Batch 1)
│   │
│   ├── VERTICAL EXPANSION: Hook Stack (Ad Set 1 × Persona A)
│   │   Winning asset from Ad Set 1 stays intact. Stack 5 new
│   │   hooks in front of it — each using a different proven
│   │   creative type, all targeting Persona A:
│   │   ├── Hook 1: POV shot opener        →  Persona A
│   │   ├── Hook 2: Animation opener       →  Persona A
│   │   ├── Hook 3: Good hit/result clip   →  Persona A
│   │   ├── Hook 4: Text-on-screen stat    →  Persona A
│   │   └── Hook 5: Testimonial cold open  →  Persona A
│   │   Root angle fixed. Only the hook changes. Tests which
│   │   creative opener drives the best view rate for this persona.
│   │
│   └── HORIZONTAL EXPANSION: Environment (Ad Set 1 × Persona A)
│       Same winning angle × Persona A. Change the setting to
│       environments where this persona actually exists — so the
│       angle resonates more deeply in a context they recognize:
│       ├── Env 1: Driving range            →  Persona A
│       ├── Env 2: Indoor simulator         →  Persona A
│       ├── Env 3: On-course (fairway)      →  Persona A
│       ├── Env 4: Backyard / at home       →  Persona A
│       └── Env 5: Pro shop / retail        →  Persona A
│       Root angle fixed. Only the environment changes. Tests
│       which setting deepens resonance for this persona.
│
└── ELEVATION PATH (post-expansion data)
    Top angle × persona × expansion combo → Page test → Brand campaign
─────────────────────────────────────────────────────
```

### 3.5 Persona Architecture

Persona mapping operates at two levels:

**PG-Level (Top-Level) Personas:** The broadest profiles of who Performance Golf speaks to across all products. These are the anchor identities — shared understanding across the creative team, marketing team, and broader company. Visible on the Figma board and referenced in all brand-level creative work.

**Product-Level Personas:** Every offer has its own persona set, derived from the offer's research and customer data. These personas live in the offer's documentation and feed directly into the ad set testing structure (angle × persona grid on the Figma board).

Persona mapping is a living resource. As ad set tests return data, winning angle × persona combinations are documented and used to strengthen persona profiles over time. The Figma board is the single visual where anyone — creative team, marketing, or leadership — can see who PG is speaking to at every level.

**Ownership:** Christopher owns persona architecture. Digital persona mapping developed in collaboration with Chris Hibbert; physical persona mapping with Chris Fleeks.

---

## 4. CREATIVE ASSET REQUIREMENTS & QUALITY GATES

### 4.1 Every Creative Asset Must Include

| Requirement | Description |
|-------------|-------------|
| **Brand guidelines** | Colors, fonts, logos, and other design elements per `pg-brand-guidelines` |
| **Root angle** | One core message in 1–4 words max. Asset built around it for test/optimize/expand; new angles within assets can be broken out into new ad sets; winning root angles elevated to brand campaigns. *(Detail from Tess — Performance Golf's AI-powered Strategic Scaling System that tracks ad performance data, naming conventions, and scalable-winner thresholds — and the ad naming convention to be added.)* |
| **CTA end card** | Logo, CTA message, and short micro script — the one message we want in mind as the viewer moves from ad to landing page/website. All products now have CTA end cards complete with new brand guidelines. |

### 4.2 Quality Gates

- **Ad checklist:** Exists for editors; use as a thinking framework (DR + branding), not necessarily a literal check every time
- **Message effectiveness:** Reviewer (copywriter, lead editor) can watch the ad and confirm it communicates the one root angle in a way that hooks, holds attention, and inspires click/purchase
- **GTM approval path:** Creative Director (if in place) → Chris Ogle or John (CMO) → **Brixton (final pass)** on GTM assets for campaign intent alignment
- **Figma board:** All GTM assets (ads, email templates, website headers, inbox experiences, influencer briefs) live on one Figma board for a single view (structure and workflow TBD; AI to recommend when we have more context)

### 4.3 Brand Thread Alignment in Practice

- Use brand guidelines (visual) plus: magician archetype, tone of voice, do's and don'ts, how we speak to customers
- At creative strategy: when generating new ideas (net new angles, expansion ideas), run through the filter of how they tie to the two brand themes so the message is congruent and we send the same message in many ways until it sticks

### 4.4 Decision Trees for Creative Formats

- Data-driven via Tess (Performance Golf's AI-powered Strategic Scaling System), within the creative formats we currently test; Tess also researches and tests new format types from other verticals
- Consumer/prospect data: where our audience consumes content and is persuaded; we use this (including scraping) to create formats that live on those channels

---

## 5. 30/60/90 DAY SUCCESS METRICS — TWO TRACKS

### 5.1 Track 1: Infrastructure (Processes, Systems, Org Structure, Personnel)

**Day 30** *(by March 11, 2026)*

- Process and platform in place to review creative campaigns in a Figma file (overall review)
- Clear view and visual plan for new creative work combining humans, agents, and new processes
- Roadmap ready to begin recruiting/hiring for human roles needed in the org
- Presentable plan with actionable steps in motion toward the new creative org, with processes connected to strategy
- Tess and Veda producing assets that are scalable winners (per Tess definition; currently 1x ROAS)

**Day 60** *(by April 10, 2026)* — *To be defined*

**Day 90** *(by May 10, 2026)* — *To be defined*

### 5.2 Track 2: Strategic/Tactical Marketing Success

**Scaling, acquisition, and ad performance**

- Scalable winners defined in Tess (scaling acquisition system); currently 1x ROAS; further thresholds to be set and rolled into creative structure
- Output metrics (volume of assets) and scaling winners based on ad performance

**Organic and branded content**

- Output metrics (volume of content)
- Organic traffic, organic search, conversion of those audiences
- Targets TBD

**GTM calendar and product launches**

- Tracking via **ClickUp** (projects and tasks that roll up per launch)
- On-time delivery: definition for ads team TBD
- Campaign success: unit velocity, revenue, and success metrics per launch — in progress with product, inventory planning, and media teams; TBD

**Brand halo**

- Brand dashboard: organic search, organic traffic, blended CAC, and other variables; ensure AI/team has access when available

---

## 6. INTEGRATION POINTS

### 6.1 Upstream Dependencies

- **Marketing OS:** Foundation for content, research, angles, and themes; creates the nucleus for all campaigns. Creative OS consumes this to produce execution (ads, organic, social, email, etc.). Creative OS lives under Marketing OS.
- **Brand guidelines:** `pg-skills/pg-brand-guidelines` — colors, fonts, logos, magician archetype, tone of voice, do's and don'ts
- **Tess (Strategic Scaling System):** Data, naming convention, root angle principle, scalable-winner definitions; feeds creative strategy and production
- **ClickUp:** GTM calendar, launch dates, projects and tasks per launch
- **GTM (Jenny):** Creation and launch of new offers
- **Back-end / LTV / Email:** Nurturing and customer relationship; Creative OS supports with relevant creative
- **Organic (Jojo):** Social reach and brand halo; Creative OS supports with organic and social creative

### 6.2 Key Roles (Creative OS)

- **John Hardesty (CMO):** Approver; primary consumer of PRD
- **Christopher Ogle (Interim Creative Lead):** Approver; primary consumer; system architect for Creative OS
- **Fatima:** Operations for Creative Department
- **Morten:** Lead editor, performance marketing side
- **Jenny:** GTM (Go-To-Market) — new offers and launch coordination
- **Jojo:** Organic — social and brand halo

### 6.3 Sub-Agents and PRD Alignment

- Sub-agents (e.g. Exa, Bravo) must have a challenger skill/sub-agent that keeps work aligned with this PRD
- PRD reference should be token-efficient: e.g. optional "Load Creative OS PRD for alignment?" at session start, or trigger on keywords (campaign, launch, strategy, GTM), or short PRD-reminder block in CLAUDE.md
- Challenger: event-triggered (e.g. when PRD is loaded, or on "challenge this" / "align check"), not every turn

---

## 7. CONSTRAINTS & GUARDRAILS

### 7.1 System-Level Constraints

- NEVER ship creative that contradicts brand guidelines or the two brand threads for short-term performance
- NEVER update this PRD automatically; only senior team members update it
- ALWAYS run GTM creative through the defined approval path (Creative Director if applicable → Chris or John → Brixton)
- ALWAYS ensure every creative asset includes brand guidelines, root angle, and CTA end card
- ALWAYS use the same campaign foundation (research, angles, themes) to generate connected outputs for all stakeholders
- ALWAYS use "ad sets" for channel-level test units (Meta, YouTube) and "campaigns" for broader 360-degree brand campaigns; never use these interchangeably

### 7.2 Performance Boundaries

- System must support multiple product launches in parallel; GTM calendar drives timing
- Scalable-winner thresholds and campaign-success metrics defined in Tess and with product/inventory/media teams; creative structure follows those definitions
- On-time delivery definition for ads team to be set; then measured and refined

---

## 8. VERSIONING & EVOLUTION

### 8.1 Current Version

- **Version:** 1.1
- **Last Modified:** February 2026
- **Status:** DRAFT. To be refined with org chart discovery, Marketing OS alignment, and additional inputs; then shared with Marketing OS team to align both PRDs.

### 8.2 Planned Improvements

- Day 60 and Day 90 milestones for both tracks
- On-time delivery definition for ads team
- Campaign success metrics (unit velocity, revenue, etc.) per launch
- Marketing OS handoff format, owners, timing, confirmation, and revision process
- Figma board structure, permissions, and workflow (then AI recommendations)
- Root angle detail from Tess and ad naming convention
- Forward-facing Google Doc (copy of PRD) for team daily reference; KPIs measured against it
- Org chart and sub-agent mapping per team member (from discovery interviews)

### 8.3 Document Authority

This PRD is the **requirements authority** for the Creative OS organization. In case of conflict:

- This PRD defines WHAT success looks like and what every creative asset must satisfy
- Individual agent PRDs (Exa, Tess, Veda, Neco) and Master Agent docs define HOW those agents operate within this vision
- John and Christopher's explicit decisions override the PRD when they choose to deviate (and should be documented)

---

## 9. REMAINING QUESTIONS, TALKING POINTS & ACTION STEPS

*Prioritized and sequenced for a phased approach so John and Christopher can close gaps efficiently and refine the PRD to its best possible version.*

---

### Phase 1 — Critical for Immediate Value (Next 1–2 Weeks)

| # | Type | Item | Why it matters |
|---|------|------|----------------|
| 1 | Action | Run org chart discovery with each key creative team member using `_ops/org-chart-discovery-questions.md`; feed answers/transcript back for PRD and role mapping | Unlocks org structure, sub-agent mapping, and individual pain points so the PRD reflects reality |
| 2 | Action | Share this PRD first draft with Marketing OS team and schedule alignment session to unify Creative OS + Marketing OS PRDs | Handoff points and owners only get locked when both sides align |
| 3 | Question | Marketing OS → Creative OS handoff: What exactly is handed off (brief, script, angle list, format)? Who sends and who receives? What is the SLA or lead time? How does Creative OS confirm receipt? | Without this, execution will keep relying on ad-hoc Slack and meetings |
| 4 | Action | Christopher to upload transcript on balancing DR effectiveness with brand building | Fills the "DR vs. brand" section and informs quality gates |

---

### Phase 2 — High Value (Weeks 2–4)

| # | Type | Item | Why it matters |
|---|------|------|----------------|
| 6 | Question | Define Day 60 and Day 90 milestones for both tracks (Infrastructure + Strategic/tactical marketing) | Makes 30/60/90 actionable and measurable |
| 7 | Question | Lock on-time delivery definition for the ads team (e.g. X days before launch, or within launch window) | Needed for GTM success metrics |
| 8 | Action | Add root angle detail from Tess and the ad naming convention into the PRD (and/or link to Tess docs) | Ensures every asset and agent can apply the root angle principle consistently |
| 9 | Question | Campaign success metrics: Agree with product, inventory planning, and media teams on expected unit velocity, revenue, and success metrics per product launch | Feeds Track 2 and reporting |
| 10 | Action | Implement token-efficient PRD load and challenger behavior in Exa and Bravo (per CREATIVE-OS-PRD-PLAN Section 8) | Prevents drift without burning context every session |

---

### Phase 3 — Important for Scale & Clarity (Month 2+)

| # | Type | Item | Why it matters |
|---|------|------|----------------|
| 11 | Talking point | Figma review board: When structure, permissions, and workflow are clearer, come to AI for recommendations on how to best structure the board | Single view of campaigns is a Day 30 milestone; structure needs to be decided |
| 12 | Action | Create forward-facing Google Doc (copy of PRD) for team daily reference; name TBD; KPIs measured against it | New hires and existing team need one place to see values, priorities, and direction |
| 13 | Question | Brand dashboard: Where will it live and how will Creative OS / AI get access for brand halo metrics? | Needed for visibility and reporting |
| 14 | Question | Creative Director: Confirm whether this role exists and who fills it in the GTM approval path | Currently "possible Creative Director" in the approval chain |
| 15 | Action | Document Marketing OS handoff in PRD once alignment session is done (format, owners, timing, confirmation, incomplete inputs, revisions, ClickUp linkage) | Makes handoff repeatable and auditable |

---

### Phase 4 — Ongoing Refinement

| # | Type | Item | Why it matters |
|---|------|------|----------------|
| 16 | Process | Define ongoing PRD update process: how often, who proposes changes, who approves, how master agents’ daily context feeds into refinement | Keeps PRD alive without ad-hoc edits |
| 17 | Action | When Tess scalable-winner thresholds are updated, roll them into Creative OS PRD and Tess–Creative OS integration | Keeps creative and data in sync |
| 18 | Talking point | Revisit quality gates and ad checklist once DR vs. brand transcript is integrated; tighten language if needed | Quality bar should be clear and consistent |
| 19 | Action | After org chart discovery, add (or link to) org chart and sub-agent mapping in PRD | Single place for who does what and which agents support whom |

---

*End of Creative OS PRD v1.0 (First Draft). Use the phased checklist above to drive future calls and refine the PRD.*
