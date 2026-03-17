# Deep Research Brief — PG1 Founders Launch

**Created:** 2026-03-16
**Status:** APPROVED — Human reviewed and approved 2026-03-16

---

## SECTION 1: PRODUCT IDENTITY [REQUIRED]

```yaml
product:
  name: "PG1 Pulse — Founders Club"
  category: "SaaS — Mobile App / Personalized Game Improvement System"
  one_sentence: "PG1 Pulse is a mobile app that uses AI swing analysis (trained on 2M+ swings, 96% accuracy across 77+ swing flaws), personalized diagnostic profiling, and access to six elite PGA coaches to identify a golfer's single root flaw and deliver a sequenced, adaptive improvement plan — replacing the cycle of random tips and generic instruction with one clear path."
  price_point: "$199/year (annual, rate locked) or $299 lifetime (one-time payment) — Founders Club pricing for first 1,000 members only. Public launch pricing will be significantly higher."

market:
  mode: "B"  # New product launch — app exists (free 7-day trial on site) but no paid founders offer live yet
  industry: "Golf Improvement Technology — App / Coaching / AI"
```

---

## SECTION 2: EXISTING ASSETS [REQUIRED FOR MODE A]

```yaml
assets:
  sales_page: "https://shop.performancegolf.com/pages/pg1-app"  # Placeholder page — NOT founders-positioned. Good images and app screenshots for reference.
  other_urls:
    - ""  # No founders page live yet
  documents:
    - "~/Downloads/PG1 Founders Keynote Script - Root Flaw Angle (2).md"  # Full VSL/keynote script (Brixton presenting to PG team — "leaked" to customer as insider access)
    - "~/Downloads/PG1 Founders Docu-Series Assets.md"  # 6-piece content series building up to keynote launch
    - "_performance-golf/_pg-pg1/pg1-app-notes.md"  # App UX architecture, homescreen, video end-cards, practice intent, course routine
    - "_performance-golf/_pg-pg1/pg1-founders-launch/pg1-keynote.md"  # Earlier keynote draft
    - "_performance-golf/_pg-pg1/pg1-founders-launch/PAGE-BUILD-PROCESS.md"  # Page build process, pricing, feature list, deployment workflow
    - "_performance-golf/_pg-pg1/pg1-members-area/pg1-welcome-video-final.md"  # Welcome video copy (post-purchase)
    - "_performance-golf/_pg-pg1/pg1-members-area/pg1-vip-coaching-final.md"  # VIP coaching script (post-purchase)
    - "_performance-golf/_pg-pg1/pg1-brixton-feedback-1.md"  # Brixton feedback on app/copy
    - "_performance-golf/_pg-pg1/pg1-brixton-feedback-2.md"  # Brixton feedback round 2
    - "_performance-golf/_pg-digital-products/dqfe1/dqfe1-pg1-quiz/_dqfe1_ (PG1 Quiz) One Pager _ Jan 2026.md"  # PG1 quiz acquisition engine
    - "_performance-golf/_pg-digital-products/dqfe1/dqfe1-pg1-quiz/DQFE1-QUIZ-PRD.md"  # Quiz product requirements
    - "_performance-golf/pg-brand/pg-brand-guidelines/assets/logos/PG1-Symbol-Black.svg"  # PG1 logo (black)
    - "_performance-golf/pg-brand/pg-brand-guidelines/assets/logos/PG1-Symbol-White.svg"  # PG1 logo (white)
```

**CRITICAL NOTE ON THE "LEAKED KEYNOTE" TACTIC:** The keynote script is NOT an internal-only presentation. It is a deliberate marketing device. Brixton presents to the PG team, and the customer watches the recording as if they're getting exclusive insider access — like watching a leaked Apple keynote. The docu-series (6 content pieces released in sequence) are framed as internal videos that were "never intended for the public." This creates an insider psychology where the buyer feels they're part of something exclusive before the official launch. The entire pre-sale and launch funnel depends on this framing. The research and all downstream copy must understand and preserve this dynamic.

---

## SECTION 3: BUSINESS CONTEXT 

```yaml
context:
  why_now: >
    PG1 Pulse is Performance Golf's most significant product launch — a technology
    platform that transforms PG from a content/training/equipment company into a
    personalized coaching ecosystem. The app exists with a free 7-day trial on the
    current site, but the Founders Club launch is the first paid offer at scale.
    This launch establishes the recurring revenue foundation for PG's next era.
    The docu-series content is in production. The keynote script is structurally
    strong with minor edits incoming from Brixton. The team needs: (1) a research
    foundation to sharpen the messaging, (2) a founders launch page that converts
    after the keynote, and (3) a pre-sale/content page that houses the docu-series
    assets during the build-up. Timeline is imminent — content is being produced now.

  decisions_pending:
    - "Is 'root flaw' the strongest consumer-facing problem name, or does research surface a more resonant framing?" **NOTE: we picked 'root swing flaw' as the main problem because we have seen this angle work for 10s of millions of dollars of promotions for our in-person high ticket vip transformation academies. We believe this shift form "you have 3-5 things wrong... to you have ONE root issue and when you fix that you fix the other 3-4 issues automatically" resonates with the customer. That said, this angle MIGHT work for high ticket because it's an "IN PERSON" experience and the customer believes the worldclass coach they get ot work with in person is ABlE to identify this root swing flaw. What we WANT our PG1 customers to BELIEVE is that the ai-powered technology inside the PG1 pulse (including SwingScan AI) are too able to identify with lazor like precision the "root swing flaw" of any golfer right from the palm of their hand... or when connecting with their coach in coach chat. So we DO want to explore this root cause/problem and see if there's something even better or if what we're doing is validated by the market and truly is the strongest angle for the promo. **END NOTE** 
    - "What is the optimal proof stack hierarchy for the founders page? (Brixton's story vs. AI technology vs. coaching team vs. investment figures vs. beta results)"**NOTE: Yes, what proof is needed on a SALES PAGE... especially if someone has already watched the VSL Keynote presentation... or is the proof different if we assume someone does NOT watch the presentation... could this sales page get them over the line to buy without the video? We need to account for both scenarios on this page.END NOTE** 
    - "What emotional state is the buyer in AFTER watching the docu-series and keynote? What does the founders page need to do from that starting point?"
    - "How do we position PG1 against the competitive landscape of golf apps (Skillest, Arccos, Golfshot, Shot Scope, V1 Golf, SwingCoach, 18Birdies, etc.) without naming them?"
    - "What objections does the founders buyer have at the moment of purchase? What's the primary conversion barrier for $299 lifetime?"**NOTE: this may change to $399 and I think we should evaluate this in our offer research as well END NOTE** 
    - "How do we balance exclusivity/scarcity (1,000 spots) with the hope-forward, non-pressure tone that fits PG's brand?" **NOTE: we want SALES for this offer... so we can go more DR for this promo and don't have to be as much brand focused because this is a backend launch, not a cold traffic / paid media launch. 

  launch_architecture: >
    TWO PAGES NEEDED:
    1. PRE-SALE / CONTENT PAGE — Houses the docu-series content (6 pieces released
       in sequence over ~2 weeks leading up to the keynote). This page builds anticipation,
       establishes the "insider" framing, and creates emotional investment before the
       buyer ever sees the offer. Think: a content hub where each video drops like an
       episode.
    2. FOUNDERS LAUNCH PAGE — The conversion page. After watching the keynote (the
       culmination of the docu-series), the golfer lands here to join the Founders Club.
       This page needs to present the logical argument in a pdp / ecomm sales page format so that if someone watches the keynote, great, this pushes them over the line, but also if someone does NOT watch the keynote, this gives them everything (not too much, not too little) to buy. Meaning, the ATF (above the fold) gives the fast action takers the chance to buy asap, but for those still needing more information, the BTF (below the fold) presents the complete sales argument. 
       It needs to: recap the key proof points, present the offer clearly, handle
       objections, create urgency through the 1,000-member limit, and make the
       purchase feel like joining a movement, not buying an app.

  target_customer: >
    PRIMARY: Performance Golf's existing customer base — golfers who have already
    bought PG products (training aids, digital courses, clubs) and are on the email
    list. These golfers trust PG, know Brixton, and are predisposed to engage with
    the docu-series. They're frustrated by inconsistency in their game despite putting
    in effort. They've tried multiple tips, videos, training aids, maybe even lessons.
    They want something that WORKS — specifically for them. Age 35-65, predominantly
    male, disposable income, tech-comfortable (use apps), play 1-4x per month.

    SECONDARY: Golfers adjacent to PG's audience — reached through ads, social,
    and word-of-mouth from the docu-series. These golfers may not know PG deeply
    but are intrigued by the content. They need more proof and credibility to convert.

    FOUNDERS BUYER PSYCHOGRAPHIC: This is a specific subset — the early adopter.
    Someone who wants to be FIRST. Who sees themselves as ahead of the curve. Who
    responds to "limited to 1,000" not because of FOMO but because of identity —
    they ARE the kind of person who gets in early on something great. They value
    insider access, direct connection to the team, and being part of something
    before it goes mainstream. They're decisive once convinced — the docu-series
    and keynote provide the conviction, the founders page provides the vehicle.

  offer_architecture: >
    FOUNDERS CLUB — Limited to 1,000 members. First come, first served.

    OPTION 1: Annual — $199/year
    - Full access to every current PG1 feature
    - Every new feature released
    - Rate locked permanently (price never goes up)

    OPTION 2: Lifetime — $299 one-time payment
    - Full access to everything (current + future)
    - Early beta access to new releases before other members
    - Never pay again
    **NOTE: Brixton recommeneded $399, we should validate in the research the proper price point for THIS launch to get the most possible lifetime users.END NOTE**

    FOUNDERS-EXCLUSIVE BENEFITS (both tiers):
    - Numbered Founders badge on profile (visible to community)
    - Priority access to every new feature rollout
    - Direct line to PG1 product team (not just coaches — the builders)
    - Permanently locked pricing

    VALUE ANCHORING (from keynote):
    - Industry insiders said $2,000-3,000/yr would be fair
    - Elite coach lessons: $350-2,000/hr in person so $3,000/yr minimum
    - TrackMan Technology: $20,000 to have at home
    - Private coaching programs: $1,800-10,000 but big groups and not root flaw focused, not always world class coaches, and you get very little personalized attention with ZERO follow up or on going instruction, no chat communication or swing reviews with your coach. Plus, if the coach isn't the best coach for YOU, then you're on the cycle of spending and searching for the right coach. 
    - PG1 Founders: $199/yr or $299 lifetime

    POST-FOUNDERS PRICING: "Significantly higher" — exact public pricing not stated
    but the contrast is emphasized heavily.
```

---

## SECTION 4: HYPOTHESES TO VALIDATE 

```yaml
hypotheses:
  - statement: "'Root flaw' is a more resonant and actionable problem name than 'swing fault' or 'swing flaw' for recreational golfers"
    rationale: >
      The keynote builds the entire argument around the concept of a single 'root flaw'
      — the one domino that changes everything. This reframes golf improvement from
      'work on many things' to 'find the one thing.' Need to validate whether 'root
      flaw' language lands in real golfer conversations or if another framing
      (root cause, lead domino, missing piece, blind spot) resonates more strongly.

  - statement: "The 'combination lock' analogy is the strongest metaphor for why working on the wrong things doesn't produce results"
    rationale: >
      The keynote uses fitness vs. golf: in fitness, getting 70% right still works.
      In golf, it's a combination lock — 4 of 5 numbers right still means locked.
      This is a powerful reframe, but it needs validation against how golfers actually
      describe their frustration. Do they describe it as 'all or nothing' or as
      'incremental and slow'?

  - statement: "The primary conversion barrier for the founders offer is not price but trust — golfers have been burned by 'personalized' promises before"
    rationale: >
      At $199/yr or $299 lifetime, the price is remarkably low for what's promised.
      The bigger barrier is likely skepticism: 'Will this ACTUALLY be personalized
      to me or is it another one-size-fits-all app with a quiz on the front end?'
      Research should validate whether trust/skepticism or price is the bigger objection.

  - statement: "The intelligence layer analogy (Netflix, Spotify, Peloton → golf) is the fastest way to help golfers understand what PG1 does differently"
    rationale: >
      The keynote builds this comparison extensively. It's a strong pattern-interrupt
      because it connects an unfamiliar product (AI golf coaching) to familiar
      experiences (personalized recommendations). Need to validate whether golfers
      find this comparison aspirational or eye-roll inducing ('oh great, another
      app calling itself the Netflix of X').

  - statement: "The 'leaked insider' content framing (docu-series + keynote) creates stronger purchase intent than a traditional sales page or VSL would"
    rationale: >
      The entire funnel is built on this device — the golfer feels like they're
      getting exclusive access to internal videos and a private company presentation.
      Need to understand whether this framing creates genuine emotional investment
      or if it reads as manufactured. Research should look at how other brands have
      used 'insider access' and 'leaked content' in launches, and whether the
      golf audience specifically responds to this tactic.
```

---

## SECTION 5: ADDITIONAL QUESTIONS 

```yaml
additional_questions:
  - "How do golfers describe the experience of information overload in golf improvement? What specific language do they use when talking about too many tips, conflicting advice, and feeling stuck despite effort?"
  - "What is the current competitive landscape of golf improvement apps? How do Skillest, Arccos, V1 Golf, Golfshot, Shot Scope, and others position themselves? What do their users love and hate?"
  - "What is the golfer sentiment around AI in golf specifically? Is there appetite for AI-powered coaching or skepticism? What has been tried and what has failed?"
  - "How do golfers talk about the difference between 'personalized' coaching and generic instruction? What makes them believe something is truly personalized vs. marketing speak?"
  - "What subscription app price points do golfers consider reasonable? Is there a psychological ceiling for golf app subscriptions?"
  - "How do 'founders' or 'early access' offers perform in the golf space specifically? Are golfers responsive to scarcity and exclusivity framing?"
  - "What does the golfer's 'moment of despair' look like — the point where they almost give up on improving? What language do they use to describe that moment?"
  - "What proof elements matter most to golfers evaluating a new app: technology specs, coach credentials, user testimonials, company track record, or investment size?"
  - "How do golfers currently use their phones at the range and on the course? What's the behavioral context for app adoption?"
  - "What is the discourse around golf coaching technology on Reddit r/golf, GolfWRX, and YouTube? What are golfers excited about and tired of?"
```

---

## SECTION 6: EXPLORATION EMPHASIS 

```yaml
exploration_emphasis:
  - area: "Golfer frustration language around information overload, conflicting advice, and 'stuck despite effort'"
    why: >
      The entire PG1 argument rests on the premise that golfers are drowning in
      information but starving for personalization. This is the ROOT PROBLEM the
      product solves. Research needs to mine the exact language golfers use when
      describing this experience — the frustration of watching YouTube videos at
      midnight, trying one tip then another, taking two steps forward and three
      steps back. This language becomes the emotional fuel for the docu-series
      context, the keynote resonance, and the founders page copy. Reddit r/golf,
      GolfWRX 'Instruction' subforum, YouTube comments on lesson videos, golf
      app reviews, coaching review sites.

  - area: "Golf app competitive landscape and user sentiment"
    why: >
      PG1 is entering a crowded app space but claiming to be fundamentally different
      (personalized coaching system vs. video library or data tracker). Research
      needs to map: (1) what golf apps golfers have tried and what they think of them,
      (2) what the 'best' apps do well and where they fall short, (3) what promises
      golf apps make that they don't deliver on (the disillusionment layer), and
      (4) what specific gap golfers describe that no current app fills. This maps
      the competitive terrain and identifies the positioning white space PG1 can own.
      App Store reviews, Reddit threads about golf apps, GolfWRX app discussions,
      YouTube app review videos and their comments.

  - area: "'Insider access' and 'leaked content' launch tactics across industries"
    why: >
      The entire PG1 founders funnel is built on the device of leaked internal videos
      and an insider keynote. Research should map how other brands (tech launches,
      fitness products, DTC brands, even film/entertainment) have used this tactic.
      What makes it work? What makes it feel forced? What are the signals that
      distinguish 'authentic insider access' from 'manufactured exclusivity'?
      This informs how the pre-sale page is built and how the docu-series content
      is framed on the page. Look at Apple keynote culture, Tesla launch events,
      fitness app pre-launches, Kickstarter/crowdfunding insider dynamics.
```

---

## SECTION 7: CONSTRAINTS 

```yaml
constraints:
  budget: 50  # Flagship launch with deep competitive analysis + cross-industry research needed
  timeline: "standard"  # Full process, no shortcuts
  platform_restrictions:
    - "PRIORITIZE: Reddit r/golf, GolfWRX forums, YouTube golf instruction/app comments, App Store reviews (golf apps), Google Play reviews (golf apps)"
    - "INCLUDE: Golf app comparison sites, golf coaching review platforms, golf improvement blogs"
    - "INCLUDE: Cross-industry insider launch case studies (tech, fitness, DTC)"
    - "INCLUDE: Competitor app pages (Skillest, Arccos, V1 Golf, Golfshot, Shot Scope, Golfbreaks, 18Birdies)"
```

---

## STRATEGIC NOTES (Inferred — review carefully)

### The "Leaked Keynote" Funnel Architecture

This is NOT a traditional sales page launch. The buyer journey is:

```
DOCU-SERIES (2 weeks, 6 pieces)     →     KEYNOTE (the "leaked" presentation)     →     FOUNDERS PAGE (conversion)
       ↑                                           ↑                                          ↑
  Pre-sale content page                   Video (Apple keynote format)              Founders launch page
  houses all episodes                     Brixton presents to PG team               Recap + offer + close
  builds anticipation                     customer watches as insider               1,000 spots, 2 tiers
  establishes insider framing             the FULL argument lives here              NOT a re-sell — a capture
```

**Key implication for research:** The founders page does need to carry the full sales argument below the fold. The page needs to: (1) above the fold is so strong a fast action buyer clicks and buys and the below the fold covers the key proof points for anyone who skims or didn't watch the full founders keynote video, (2) present the offer clearly, (3) handle objections, (4) create urgency through the 1,000-member cap, and (5) make joining feel like becoming part of something — something BIG.

### Docu-Series Content Pieces (in production)

| # | Title | Who | Format | Purpose |
|---|-------|-----|--------|---------|
| Intro | "The Confession" | Brixton | Direct to camera, alone in office | Admits PG was part of the problem. Sets up the journey. |
| 1 | "The War Room" | SLT, Peter, Aaron | Fly-on-wall Zoom meeting | Shows real decision-making. Viewer eavesdrops. |
| 2 | "The $3 Million Bet" | Todd Brown, Peter, Aaron | Zoom-style call with developers | Scale of investment. Credibility through technical candor. |
| 3 | "The Coaches They Said We'd Never Get" | Donnie French | Direct to camera (simulator) | Elite coaching team assembly. Why these specific coaches. |
| 4 | "The Breakthrough on Hole 7" | JT | On-course, real context | App in action. Authenticity, not demo. |
| Final | "72 Hours" | John Hardesty | Direct to camera, urgency | Countdown to the keynote. Frames what's coming. |

**Each piece builds a specific layer of belief:**
- The Confession → honesty / vulnerability / "this company cares"
- The War Room → behind the scenes / real stakes / decision-making
- The $3 Million Bet → investment size / technical credibility
- The Coaches → coaching quality / exclusive access
- The Breakthrough → product in action / real results / authenticity
- 72 Hours → urgency / anticipation / "you don't want to miss this"

### Core Argument (from keynote — structurally strong)

1. **Personal story:** Brixton was a +3 handicap, hit a wall, instructor found his ONE root flaw, dropped 5 shots in weeks
2. **The universal problem:** Golfers are stuck because nobody identifies their root flaw — they get random prescriptions without a real diagnosis
3. **The intelligence layer:** Every major industry went from information access → personalized intelligence (Netflix, Spotify, Peloton). Golf hasn't made that leap yet.
4. **What we built:** PG1 Pulse — $5M+ investment, 2 years, three pillars:
   - Swing Scan AI (2M+ swings, 96% accuracy, 47+ flaws)
   - Six elite PGA coaches (expertise built INTO the AI, not just teaching inside it)
   - World-class UX (MyFitnessPal/Weather Channel developer)
5. **How it works:** Assessment → Swing Scan AI identifies root flaw → Personalized plan → Real-time ball flight feedback → AI coaching swing-by-swing → Post-round voice analysis → direct access to your VIP coach --> Community → Progress tracking --> users PG1 Pulse gets "smarter" the more they use the app (better, more personlaized recommendations based on their time constraints, practice location, and desired outcome for their game)
6. **The offer:** Founders Club, 1,000 members, $199/yr or $299 lifetime
7. **Emotional close:** "Love your game again"

### Key Proof Points (extracted from keynote)

| Proof Point | Type | Strength |
|-------------|------|----------|
| $5M+ invested in building PG1 | Investment | High — concrete number |
| 2M+ swings in AI training data | Technology | High — specific and large |
| 96% accuracy identifying swing flaws | Technology | High — specific metric |
| 77+ swing flaws identified | Technology | High — confirmed by Brixton (77 is the correct number) |
| 6 elite PGA coaches | Credibility | High — but individual names/credentials not listed in keynote |
| 276 team members, 15 countries | Company scale | Medium — supports "real company" credibility |
| 1.4M golfers helped to date | Track record | High — large and specific |
| MyFitnessPal / Weather Channel developer | Technology partner | High — recognized brands |
| Brixton's personal story (+3 to stuck to breakthrough) | Narrative | High — founder's lived experience |
| Beta user results (5x more likely to complete with tracking) | Social proof | Medium — no specific handicap drops cited |
| Industry insiders valued at $2,000-3,000/yr | Price anchoring | Medium-High — third-party validation |

**PROOF GAP:** The keynote lacks specific beta user results (handicap improvements, timeframes, named testimonials). If these exist, they should be sourced. If they don't, the proof inventory should flag this as a gap. **NOTE: we will have specific casestudies from PG1 users and we will need to have placeholders on the page we create, but we will not need to write full stories of users. This will be more like a UGC Carosel of first beta users testing and getting results from the process. ALSO, we have some HUGE influencers starting to use the app, Alonzo Mourning, and other big people... so we will want a "Celebrity/Influencer PG1 Users In Our Community" as a section on the page. End Note** 

**RECONCILED:** The keynote uses both 77 and 47 — Brixton confirmed **77 is the correct number.** All downstream copy should use "77+ swing flaws."

### What transfers from existing PG1 work:
- App UX architecture is documented (pg1-app-notes.md)
- DQFE1 quiz acquisition engine is designed
- Welcome video and VIP coaching scripts are finalized (members area)
- Brand assets (logos) exist
- PAGE-BUILD-PROCESS.md has deployment workflow and feature list

### What needs fresh research:
- Real golfer language around information overload and being stuck
- Golf app competitive landscape (user sentiment, not just feature lists)
- AI coaching sentiment in golf specifically
- "Insider access" / "leaked content" launch tactics — what works, what feels fake
- Founders/early-access offer psychology in golf
- Proof elements that matter most to golfers evaluating new technology
- Price sensitivity for golf app subscriptions
- The "moment of despair" — when golfers almost give up on improving

### Tone guardrails:
- **Hope-forward, not pain-driven.** This is a new opportunity framing, not an exposé of what's broken. The golfer should feel excited about what's possible, not beaten down about what's wrong.
- **Insider energy, not pressure energy.** Scarcity is real (1,000 spots) but the framing is "you're getting in early on something great" not "buy now or miss out forever."
- **Authentic, not polished.** The docu-series aesthetic is raw, behind-the-scenes, real conversations. The copy should match — conversational, personal, not overly produced.
- **Brixton is the voice.** Everything flows through his perspective as founder/CEO who is personally passionate about this.

---

*Brief Version 1.0 | Marketing-OS Deep Research v3 System*
