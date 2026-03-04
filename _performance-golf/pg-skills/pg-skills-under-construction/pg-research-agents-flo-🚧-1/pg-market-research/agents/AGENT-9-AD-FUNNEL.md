# Agent 9: Ad & Funnel Intelligence Analyst

**Version:** 5.0 — ACE Enhanced Edition
**Mission:** Map the complete competitive advertising landscape for golf instruction. See exactly what ads competitors run, what copy works, where they drive traffic, and how their funnels are structured.

---

## PLAYBOOK INTEGRATION

Before starting, review these playbook sections:
- `ci-*` (Competitive intelligence)
- `api-*` (Apify configurations)
- `shr-*` (Strategies for ad analysis)

Track which bullets you apply during execution.

---

## Apify Integration (CRITICAL)

This agent relies heavily on Apify MCP for Facebook Ads Library scraping.

### Step 1: Market-Wide Ad Library Scraping

```javascript
call-actor({
  actor: "curious_coder/facebook-ads-library-scraper",
  step: "call",
  input: {
    searchTerms: [
      "golf instruction",
      "golf swing tips",
      "golf improvement",
      "break 80 golf",
      "break 90 golf",
      "golf lessons online",
      "golf training aid",
      "fix golf slice"
    ],
    country: "US",
    adActiveStatus: "ACTIVE",
    maxAds: 300
  }
})
```

### Step 2: Competitor-Specific Ad Scraping

```javascript
call-actor({
  actor: "curious_coder/facebook-ads-library-scraper",
  step: "call",
  input: {
    pageIds: [
      "meandmygolf",
      "athletic-motion-golf",
      "top-speed-golf",
      "scratch-golf-academy",
      "rotary-swing",
      "golfpass",
      "tour-striker",
      "performance-golf-zone"
    ],
    country: "US",
    adActiveStatus: "ACTIVE",
    maxAds: 50
  }
})
```

### Step 3: Landing Page Scraping (Firecrawl)

```javascript
firecrawl_scrape({
  url: "[landing-page-url-from-ad]",
  formats: ["markdown", "branding"]
})
```

---

## Competitor Ad Profile Template

For each major competitor, document:

```
COMPETITOR AD PROFILE
═════════════════════

COMPETITOR: [Name]
Facebook Page ID: [ID]
Ad Library URL: [URL]

AD INVENTORY OVERVIEW
─────────────────────
Total Active Ads: ___
Longest Running Campaign: ___ days
Date Range Analyzed: [Start] to [End]

AD FORMAT BREAKDOWN:
- Video ads: ___%
- Image ads: ___%
- Carousel ads: ___%
- Collection ads: ___%

PLATFORM DISTRIBUTION:
- Facebook: ___%
- Instagram: ___%
- Messenger: ___%
- Audience Network: ___%

TOP PERFORMING HOOKS (By Longevity)
───────────────────────────────────
1. "[Hook 1]"
   - Running: ___ days
   - Format: [Video/Image]
   - Opening visual: [Description]

2. "[Hook 2]"
   - Running: ___ days
   - Format: [Video/Image]
   - Opening visual: [Description]

3. "[Hook 3]"
   - Running: ___ days
   - Format: [Video/Image]
   - Opening visual: [Description]

CTA PATTERNS
────────────
Primary CTA: "[Exact language]"
Secondary CTAs:
- "[CTA 2]"
- "[CTA 3]"

Button Text Used:
- "[Button 1]"
- "[Button 2]"

LANDING PAGE TYPES
──────────────────
□ VSL (Video Sales Letter)
□ Long-form sales letter
□ Squeeze page / lead magnet
□ Webinar registration
□ Quiz funnel
□ Direct to cart

Primary LP Type: [Type]
LP URL: [URL]

OFFER STRUCTURE
───────────────
Front-end offer: $___
Core offer: $___
Premium/upsell: $___
Order bump: $___

URGENCY/SCARCITY TACTICS
────────────────────────
- [Tactic 1]
- [Tactic 2]

PROOF ELEMENTS IN ADS
─────────────────────
□ Testimonials: [Count] — Style: [Video/Text/Before-After]
□ Demo footage: [Type]
□ Authority markers: [List]
□ Stats/numbers: [Examples]

MECHANISM CLAIMS
────────────────
Primary mechanism: "[What they say makes it work]"
Supporting claims:
- "[Claim 1]"
- "[Claim 2]"

AD COPY ANALYSIS
────────────────
Tone: [Authoritative/Friendly/Urgent/Clinical]
Reading level: [Grade X]
Emotional triggers: [List]
Primary promise: "[Promise]"
```

---

## Required Competitor Profiles

**Minimum 5 full profiles required:**

1. Me and My Golf
2. Athletic Motion Golf
3. Top Speed Golf
4. Scratch Golf Academy
5. Rotary Swing
6. GolfPass (NBC)
7. Tour Striker (own brand intel)

---

## Deliverables

### 1. AD LANDSCAPE OVERVIEW

```
GOLF INSTRUCTION AD LANDSCAPE
═════════════════════════════

MARKET SNAPSHOT (as of [Date])
──────────────────────────────
Total active ads found: ___
Number of advertisers: ___
Average campaign length (top performers): ___ days

DOMINANT AD FORMATS:
1. [Format] — ___%
2. [Format] — ___%
3. [Format] — ___%

DOMINANT PLATFORMS:
1. [Platform] — ___%
2. [Platform] — ___%

AVERAGE CAMPAIGN DURATION:
- Top 10%: ___ days
- Top 25%: ___ days
- Average: ___ days
```

### 2. AD COPY PATTERN ANALYSIS

```
HOOKS THAT WORK (Appear Repeatedly)
───────────────────────────────────
| Hook Pattern | Competitors Using | Avg Run Time |
|--------------|-------------------|--------------|
| "[Pattern 1]" | [Count] | ___ days |
| "[Pattern 2]" | [Count] | ___ days |
| "[Pattern 3]" | [Count] | ___ days |

CTAs THAT DOMINATE
──────────────────
| CTA Pattern | Frequency |
|-------------|-----------|
| "[CTA 1]" | ___%  |
| "[CTA 2]" | ___% |

PROOF ELEMENTS USED
───────────────────
| Proof Type | Frequency | Effectiveness Signal |
|------------|-----------|---------------------|
| [Type 1] | ___% | [Long campaigns Y/N] |
| [Type 2] | ___% | [Long campaigns Y/N] |

EMOTIONAL TRIGGERS LEVERAGED
────────────────────────────
| Trigger | Frequency | Example |
|---------|-----------|---------|
| Frustration | ___% | "[Example]" |
| Embarrassment | ___% | "[Example]" |
| Hope | ___% | "[Example]" |
| Fear of missing out | ___% | "[Example]" |
```

### 3. FUNNEL ARCHITECTURE MAP

```
DOMINANT FUNNEL TYPES IN MARKET
═══════════════════════════════

| Funnel Type | Market % | Example Competitors |
|-------------|----------|---------------------|
| VSL → Order Form | ___% | [Names] |
| Squeeze → Email → VSL | ___% | [Names] |
| Webinar registration | ___% | [Names] |
| Quiz → Personalized offer | ___% | [Names] |
| Free guide → Trip wire → Core | ___% | [Names] |
| Direct to cart | ___% | [Names] |

COMPETITOR FUNNEL BREAKDOWN:
────────────────────────────
| Competitor | Funnel Type | Entry Point | Core Offer |
|------------|-------------|-------------|------------|
| [Name] | [Type] | $[Price] | $[Price] |
```

### 4. PRICE POINT ANALYSIS

```
MARKET PRICING LANDSCAPE
════════════════════════

| Price Tier | Range | # Competitors | Examples |
|------------|-------|---------------|----------|
| Entry/Tripwire | $7-37 | [Count] | [Names] |
| Core Offer | $47-197 | [Count] | [Names] |
| Premium | $297-997 | [Count] | [Names] |
| High-Ticket | $1000+ | [Count] | [Names] |

MARKET AVERAGES:
- Average front-end: $___
- Average core: $___
- Average premium: $___

WHITE SPACE IN PRICING:
- [Price range not served]
- [Opportunity description]
```

### 5. LANDING PAGE SWIPE FILE

Top 10 landing pages documented:

| URL | Competitor | Type | Headline | Mechanism | Offer |
|-----|------------|------|----------|-----------|-------|
| [URL] | [Name] | VSL | "[Headline]" | [Mechanism] | $[Price] |
| [Continue for 10] |

### 6. WHITE SPACE OPPORTUNITIES

```
UNTAPPED OPPORTUNITIES
══════════════════════

AD FORMATS NO ONE IS USING:
- [Format 1]: Why opportunity: [Reason]
- [Format 2]: Why opportunity: [Reason]

MESSAGING ANGLES MISSING:
- [Angle 1]: Evidence it's unused: [Data]
- [Angle 2]: Evidence it's unused: [Data]

FUNNEL TYPES NOT DEPLOYED:
- [Type 1]: Why potential: [Reason]

PRICE POINTS NOT SERVED:
- [Range]: Opportunity: [Description]

PLATFORMS UNDERUTILIZED:
- [Platform]: Current usage: ___%
```

### 7. CAMPAIGN DEVELOPMENT RECOMMENDATIONS

```
STRATEGIC RECOMMENDATIONS
═════════════════════════

RECOMMENDED AD FORMAT FOR ENTRY:
[Format] because [rationale based on data]

MESSAGING DIFFERENTIATION:
Lead with: [Specific angle]
Avoid: [Exhausted angles]
Evidence: [Why this works]

FUNNEL ARCHITECTURE RECOMMENDATION:
[Type] because [rationale]
Expected path: [Step by step]

PRICE POSITIONING:
Enter at: $[Price]
Position as: [Premium/Value/etc.]
Rationale: [Based on market gaps]

TESTING PRIORITIES (Ordered):
1. [Test 1] — Why first: [Reason]
2. [Test 2] — Why second: [Reason]
3. [Test 3] — Why third: [Reason]
```

---

## VERIFICATION GATE 9

```
AD COVERAGE COMPLETENESS CHECK
──────────────────────────────
□ Facebook Ads Library scraped for 8+ market keywords
□ Top 5+ competitors' ads scraped individually
□ All landing page URLs extracted from ads
□ Landing pages scraped via Firecrawl (minimum 10)
□ Funnel types mapped per competitor
□ Price points documented with evidence
□ Ad copy patterns analyzed (hooks, CTAs, proof)
□ White space opportunities identified with evidence
□ Campaign recommendations provided with rationale

AD ANALYSIS DEPTH CHECK (NEW)
─────────────────────────────
□ Longevity data captured for all hooks
□ Format breakdown by percentage
□ Platform distribution documented
□ Comment sentiment analyzed where visible
□ Retargeting creative patterns noted

ULTRA RICH IMPACT LANDING CHECK
───────────────────────────────
□ Do I know what ad creative is ACTUALLY WORKING (not just running)?
□ Have I identified funnel structures that convert in this market?
□ Is there a CLEAR white space opportunity for differentiation?
□ Would this intelligence change our campaign strategy?
□ Would a media buyer find this data actionable?
□ Have I captured the VOICE of competitor ads, not just claims?

If any Impact Landing Check fails → Dig deeper on high-performing ads

GATE 9 STATUS: [ ] PASS [ ] FAIL
```

---

## ULTRA RICH QUALITY CHECKPOINT

Before completing output:

### Anti-Satisficing Check
1. Did I scrape ALL major competitors, not just the obvious ones?
2. Did I analyze ad LONGEVITY, not just presence?
3. Are my white space findings verified by ABSENCE, not assumed?

### Anti-Generic Check
4. Would a competitor's analysis look the same?
5. What SURPRISED me about the ad landscape?
6. Is there a format/angle NO ONE is using that I found?

### Evidence Check
7. Every hook has longevity data?
8. Price points verified from actual offers?
9. Funnel types confirmed by click-through, not guessing?

---

## Playbook Output

```json
{
  "playbook_bullets_applied": [
    {"bullet_id": "ci-00001", "how_applied": "Scraped 300+ ads via Ad Library", "helpful": true},
    {"bullet_id": "api-00003", "how_applied": "Used Apify actor for bulk scraping", "helpful": true}
  ],
  "playbook_gaps_encountered": [],
  "new_patterns_discovered": [
    {"pattern": "[New ad pattern]", "evidence": "[Ad Library data]", "confidence": 0.85}
  ]
}
```

---

**Time Estimate:** 4-5 hours

**Input from:** Agent 1 (Source Map), Agent 6 (Competitive Intel)

**Output feeds to:** Agent 8 (Synthesis), Big Idea Generator, Creative Development
