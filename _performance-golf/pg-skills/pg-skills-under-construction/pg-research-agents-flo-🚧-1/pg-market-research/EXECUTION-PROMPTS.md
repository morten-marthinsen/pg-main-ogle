# PERFORMANCE GOLF RESEARCH: EXECUTION PROMPTS
## Copy-Paste Prompts for Claude Code

**Version:** 5.0 — ACE Enhanced Edition
**Last Updated:** January 2025

---

# ⚠️ CRITICAL: ULTRA RICH + ACE INTEGRATED

Every prompt in this file includes Ultra Rich anti-mediocrity checks AND ACE (Agentic Context Engineering) integration. The standard is A-list output that learns from campaign outcomes.

**v5.0 Enhancements:**
- **Signal Quality Scoring (SQS)** — Every quote rated 1-10 for authenticity
- **Aspect-Based Sentiment Analysis** — New Agent 2B decomposes quotes into aspects
- **Knowledge Graph Building** — New Agent 8B creates relational structure
- **Living Playbook** — PLAYBOOK.json evolves from campaign feedback
- **Post-Campaign Learning Loop** — Reflector + Curator agents
- Pre-Pipeline interrogation is REQUIRED before Agent 1
- Every agent includes a Satisficing Check before declaring complete
- Every gate includes an Impact Landing Check
- B-list output (competent but unremarkable) is not acceptable

---

# HOW TO USE

1. **START with Pre-Pipeline Prompt** (Ultra Rich Pre-Task Interrogation)
2. Run each agent prompt in sequence
3. Apply Satisficing Check before declaring any agent complete
4. Do NOT proceed to next agent until current gate passes (including Impact Landing Check)
5. Save outputs to designated files
6. Use Firecrawl MCP tools for data collection when available

**Execution Modes:**
- **Standard Mode:** Manual web research (original prompts below)
- **Firecrawl Mode:** Accelerated data collection (~55% time savings)

For Firecrawl Mode, use the **FIRECRAWL-ENHANCED** prompts marked with 🔥

---

# ⚡ PRE-PIPELINE PROMPT (REQUIRED — RUN FIRST)

```
## ULTRA RICH PRE-TASK INTERROGATION

Before beginning the research pipeline, complete this interrogation:

### SITUATION ASSESSMENT

1. What TYPE of promotion is this research supporting?
   [Answer: VSL / Sales Page / Email Sequence / Backend Offer / etc.]

2. What would A-LIST research output look like for this project?
   - Identity portraits so vivid I can SEE the person
   - Quotes so authentic prospects say "that's exactly what I've said"
   - Big Ideas that are SURPRISING yet INEVITABLE
   - Insights that make a copywriter say "now I know exactly what to write"

3. What are Claude's typical shortcuts on market research that I must AVOID?
   - Generic demographic segments instead of vivid portraits
   - Surface desires without 3-layer digs
   - Technique accumulation without integration
   - Completing agents without verifying IMPACT

4. Where are the HIGH-LEVERAGE points in this research?
   - Agent 2 (Language): Quality of verbatims determines everything downstream
   - Agent 3 (Emotional): Depth of digs determines copy resonance
   - Agent 8 (Synthesis): Integration quality determines Big Idea potential

### FAILURE PRE-MORTEM

If this research disappoints, what's the most likely reason?
   - Quotes aren't truly verbatim (paraphrased)
   - Identity mapping is demographic, not HUMAN
   - Big Ideas are headlines without frameworks
   - Insights are stated, not demonstrated

What would make an expert copywriter say "this research is amateur"?
   - Can't quote specific language for headlines
   - Don't know what the buyer is AFRAID of (only what they want)
   - Competitive analysis lists features, doesn't capture VOICE
   - No "I know EXACTLY who this person is" feeling

### COMMITMENT

I commit to:
□ Running Satisficing Check before declaring any agent complete
□ Running Impact Landing Check at every gate
□ Not proceeding until output would make an expert nod in recognition
□ Revising any "hollow technique" (present but doesn't land) before moving on

Save this completed interrogation to: verification-logs/pre-pipeline-interrogation.md

Now proceed to Agent 1.
```

---

# 🔮 SATISFICING CHECK (RUN AT EVERY AGENT COMPLETION)

```
## SATISFICING CHECK — Before Declaring Agent [X] Complete

Answer honestly:

□ Am I taking the path of least resistance right now?
□ Did I just produce something "good enough" instead of excellent?
□ Would I be proud to show this to the best person I know in this field?
□ Am I rationalizing mediocrity as "appropriate for the context"?

□ Have I gone one level deeper than my first instinct?
□ Did I consider the non-obvious interpretation?
□ Am I pattern-matching to something I've seen before, or actually thinking?

If ANY answer reveals satisficing → REVISE before proceeding
```

---

# AGENT 1 PROMPT

## Standard Mode
```
## AGENT 1: Market Intelligence Scout — Performance Golf

Read the research system in this folder, specifically the Agent 1 section.

Your mission: Map all living data sources where amateur golfers discuss their game.

Execute these tasks:

1. REDDIT MAPPING
   - Identify top threads in r/golf, r/GolfSwing, r/AskGolf with 50+ comments
   - Document thread URLs, comment counts, and relevance
   - Target: 15+ high-value threads

2. TIKTOK MAPPING
   - Search these hashtags: #golftok #golfswing #golftips #golffail #golfprogress
   - Identify 10+ accounts with high engagement and active comments
   - Note which videos have the most emotional comments

3. INSTAGRAM MAPPING
   - Identify 10+ golf instruction/meme accounts with active Reels
   - Check for Story polls about golf struggles (screenshot if found)
   - Note accounts that share DM screenshots (market research gold)

4. YOUTUBE MAPPING
   - Identify 5+ channels with active comment sections
   - Find specific videos about fixing problems (slice, consistency, etc.)
   - Note videos with transformation content

5. FORUM MAPPING
   - Check GolfWRX forums — identify best sections
   - Check The Sand Trap — identify best threads
   - Note registration requirements

6. COMPETITOR MAPPING
   - List all direct competitors with URLs
   - Note which have active Facebook ads (check Ad Library)

Save output to: agent-outputs/01-sources-map.md

Run VERIFICATION GATE 1 before proceeding.
```

## 🔥 FIRECRAWL-ENHANCED Agent 1 Prompt
```
## AGENT 1: Market Intelligence Scout — Firecrawl Enhanced

Use Firecrawl MCP tools to systematically discover and map data sources.

### STEP 1: FORUM DISCOVERY
Use firecrawl_map to discover forum structure:

firecrawl_map({
  url: "https://forums.golfwrx.com",
  limit: 200,
  search: "instruction"
})

firecrawl_map({
  url: "https://thesandtrap.com/forums",
  limit: 200
})

Document all section URLs discovered.

### STEP 2: HIGH-VALUE THREAD DISCOVERY
Use firecrawl_search with these queries (include scrapeOptions for content preview):

Pain/Frustration threads:
- "golf improvement frustrated site:golfwrx.com"
- "tried everything golf swing site:golfwrx.com"
- "want to quit golf site:golfwrx.com"

Breakthrough threads:
- "finally figured out golf site:golfwrx.com"
- "finally broke 80 OR finally broke 90 golf"

Reddit references (URLs only — cannot scrape directly):
- "golf improvement frustrated site:reddit.com/r/golf"
- "embarrassing golf playing partners site:reddit.com"

Collect top 30 threads by relevance across all queries.

### STEP 3: COMPETITOR DISCOVERY
Use firecrawl_search:
- "online golf instruction subscription"
- "golf improvement course online"
- "golf coaching membership"

List all competitors found with URLs.

### STEP 4: COMPILE SOURCE MAP
Create structured output with:
- Forum sections (with thread counts)
- High-value thread URLs (categorized by emotional content)
- Competitor list with URLs
- Reddit thread references (for manual review)

Save structured output to: agent-outputs/01-sources-map.md

Run VERIFICATION GATE 1 before proceeding.

**Note:** Reddit direct scraping is blocked. Use search results for discovery,
then reference threads manually or find cross-posts on forums.
```

---

# AGENT 1B PROMPT

## Standard Mode
```
## AGENT 1B: Demographic Profiler — Performance Golf

Read agents/AGENT-1B-DEMOGRAPHICS.md for full instructions.

Your mission: Compile comprehensive demographic profile of amateur golfers.

Execute these research tasks:

1. POPULATION DATA
   - Search for National Golf Foundation participation reports
   - Find total US golfer population (on-course and off-course)
   - Document year-over-year and 5-year trends
   - Search: "golf participation statistics 2024" "NGF golfer population"

2. AGE DISTRIBUTION
   - Find age breakdown of golfers by percentage
   - Identify median age and trends
   - Document which age groups are growing/shrinking
   - Search: "golfer age demographics" "golf participation by age"

3. INCOME & SPENDING
   - Find golfer household income distribution
   - Find average annual spend on golf instruction
   - Find % who purchase online instruction
   - Search: "golfer income statistics" "golf spending per capita"

4. GEOGRAPHIC DATA
   - Find top 10 states by golfer population
   - Find top metros for golf
   - Note seasonality implications
   - Search: "golf participation by state" "golf market by region"

5. TECHNOLOGY ADOPTION
   - Find % using golf apps
   - Find % consuming online golf content
   - Document platform preferences (YouTube, TikTok, Instagram)
   - Search: "golf app usage statistics" "golf content consumption"

6. IDEAL CUSTOMER PROFILE
   - Synthesize data into clear ICP
   - Estimate total addressable within ICP

Sources to check:
- National Golf Foundation (ngf.org)
- Golf Datatech
- Statista golf section
- PGA of America reports

Save output to: agent-outputs/01b-demographics.md

Run VERIFICATION GATE 1B before proceeding.
```

## 🔥 FIRECRAWL-ENHANCED Agent 1B Prompt
```
## AGENT 1B: Demographic Profiler — Firecrawl Enhanced

Use firecrawl_agent for autonomous research. This completes in ~15 seconds.

### STEP 1: AUTONOMOUS DEMOGRAPHICS RESEARCH
Execute this firecrawl_agent call:

firecrawl_agent({
  prompt: `Find the latest US golf participation statistics from 2024-2025. I need:
    1. Total number of US golfers (on-course and off-course)
    2. Age distribution breakdown by percentage for each major age group
    3. Gender breakdown (percentage male/female)
    4. Average household income of golfers
    5. Year-over-year participation trends (2023 vs 2024, and vs 2019 baseline)
    6. Geographic concentration (top states)
    7. Technology adoption rates (golf apps, online content consumption)

    Look for data from National Golf Foundation, Golf Datatech, USGA, or similar industry sources.
    Provide specific numbers with source citations for each data point.`
})

### STEP 2: SUPPLEMENTAL SEARCHES (if needed)
If firecrawl_agent misses any data points, use targeted searches:

firecrawl_search({
  query: "National Golf Foundation 2024 participation report golfer demographics",
  limit: 5,
  scrapeOptions: { formats: ["markdown"], onlyMainContent: true }
})

firecrawl_search({
  query: "golfer household income average 2024 statistics",
  limit: 5,
  scrapeOptions: { formats: ["markdown"], onlyMainContent: true }
})

### STEP 3: SYNTHESIZE ICP
Based on collected data, define the Ideal Customer Profile:
- Primary demographic characteristics
- Behavioral indicators
- Total addressable population within ICP

### EXPECTED OUTPUT (Based on validated testing)
Your output should include data similar to:
- Total US Golfers: ~47 million
- On-Course Golfers: ~28 million
- Average Age: ~43-44 years
- Female Golfers: ~25-28%
- Average HH Income: $100,000+
- 18-34 Age Group: Largest/fastest growing segment

Save output to: agent-outputs/01b-demographics.md

Run VERIFICATION GATE 1B before proceeding.
```

---

# AGENT 1C PROMPT

## Standard Mode
```
## AGENT 1C: TAM Analyst — Performance Golf

Read agents/AGENT-1C-TAM.md for full instructions.

Your mission: Calculate TAM, SAM, SOM and quantify the market opportunity.

Execute these tasks:

1. TAM CALCULATION — TOP-DOWN
   - Start with total golfer population (from Agent 1B)
   - Estimate % actively seeking improvement
   - Estimate % who pay for instruction
   - Find average annual instruction spend
   - Calculate: Golfers × % Improvement × % Pay × Avg Spend

2. TAM CALCULATION — BOTTOM-UP
   - Research market size of each segment:
     * In-person lessons market
     * Online courses/video instruction
     * Golf apps/subscriptions
     * Training aids
     * Books/media
   - Sum all segments

3. INDUSTRY REPORT VALIDATION
   - Search for existing golf instruction market size estimates
   - Cross-reference IBISWorld, Statista, industry reports
   - Reconcile our calculations with published figures
   - Search: "golf instruction market size" "golf coaching industry revenue"

4. SAM CALCULATION
   - Apply filters to TAM:
     * % accessible via online delivery
     * % in PG price range
     * % matching target demographics
   - Document each filter with rationale

5. SOM CALCULATION
   - Factor competitive intensity
   - Estimate realistic market capture (1yr, 3yr, 5yr)
   - Document assumptions

6. MARKET ECONOMICS
   - Research pricing benchmarks across categories
   - Estimate customer LTV
   - Find market growth rate (CAGR)
   - Search: "online golf course pricing" "golf subscription pricing"

7. COMPETITIVE MARKET SHARE
   - Estimate revenue/share for top competitors
   - Assess market concentration

Save output to: agent-outputs/01c-tam-analysis.md

Run VERIFICATION GATE 1C before proceeding.
```

## 🔥 FIRECRAWL-ENHANCED Agent 1C Prompt
```
## AGENT 1C: TAM Analyst — Firecrawl Enhanced

Use firecrawl_agent for autonomous market size research.

### STEP 1: AUTONOMOUS TAM RESEARCH
Execute this firecrawl_agent call:

firecrawl_agent({
  prompt: `Research the golf instruction and improvement market size for 2024-2025:
    1. Total golf instruction market size (all categories combined)
    2. Online golf instruction/courses market size specifically
    3. Golf app and subscription market size
    4. Training aids market size
    5. In-person lessons market size
    6. Growth rates (CAGR) for each segment
    7. Major players and their estimated market share
    8. Pricing benchmarks across categories (monthly/annual subscriptions, course prices)

    Look for data from IBISWorld, Statista, Golf Datatech, and industry reports.
    Include specific dollar figures with source citations.`
})

### STEP 2: COMPETITIVE PRICING RESEARCH
Use firecrawl_scrape to capture competitor pricing:

firecrawl_scrape({
  url: "https://meandmygolf.com/pricing",
  formats: ["markdown"]
})

firecrawl_scrape({
  url: "https://athleticmotiongolf.com",
  formats: ["markdown"]
})

Document all pricing tiers found.

### STEP 3: CALCULATE TAM/SAM/SOM
Using Agent 1B demographics + market research:

TAM = Total Golfers × % Seeking Improvement × % Who Pay × Avg Spend
SAM = TAM × Online Delivery Fit × Price Point Fit × Demographic Fit
SOM = SAM × Realistic Market Capture (factoring competition)

Document all assumptions and calculations.

### STEP 4: MARKET ECONOMICS
Compile:
- Pricing benchmarks by category
- Estimated customer LTV
- Target CAC ratios
- Market growth projections

Save output to: agent-outputs/01c-tam-analysis.md

Run VERIFICATION GATE 1C before proceeding.
```

---

# AGENT 2 PROMPT (Run in multiple sessions)

## Standard Mode
```
## AGENT 2: Language Archaeologist — Performance Golf

Read the Agent 2 section of the research system.

Your mission: Extract 300+ VERBATIM quotes from golfers. NO PARAPHRASING.

This session, focus on [CATEGORY] language:

### SESSION 2A: PAIN LANGUAGE (Target: 100 quotes)

Search and extract exact quotes expressing:
- Performance pain (slice, contact, consistency, distance)
- Emotional pain (frustration, embarrassment, self-doubt)
- Social pain (playing partners, being worst in group)
- Investment pain (failed lessons, wasted money)

Use these search queries:
site:reddit.com/r/golf "I can't" OR "so frustrated"
site:reddit.com/r/golf "embarrassing" OR "humiliating"
site:reddit.com/r/golf "tried everything"
site:reddit.com/r/golf "waste of money"

For TikTok/Instagram, search comments under videos about:
- Fixing the slice
- Golf fails
- "Why you're not improving"

FORMAT EACH QUOTE:
"[EXACT QUOTE]"
- Source: [URL or Platform/Account]
- Category: [Performance/Emotional/Social/Investment Pain]
- Intensity: [1-5]

Save to: agent-outputs/02-language-database.md under PAIN LANGUAGE section
```

## 🔥 FIRECRAWL-ENHANCED Agent 2 Prompt
```
## AGENT 2: Language Archaeologist — Firecrawl Enhanced

Use Firecrawl to extract verbatim quotes at scale. This is the BIGGEST time saver.

**CRITICAL:** All quotes must be VERBATIM. No paraphrasing. No AI summarization.

### PHASE 1: PAIN LANGUAGE MINING (Target: 100 quotes)

Execute these firecrawl_search calls with scrapeOptions:

firecrawl_search({
  query: `"tried everything" golf improvement site:golfwrx.com`,
  limit: 15,
  scrapeOptions: { formats: ["markdown"], onlyMainContent: true }
})

firecrawl_search({
  query: `"so frustrated" OR "frustrating" golf swing site:golfwrx.com`,
  limit: 15,
  scrapeOptions: { formats: ["markdown"], onlyMainContent: true }
})

firecrawl_search({
  query: `"embarrassing" OR "embarrassed" golf site:golfwrx.com`,
  limit: 15,
  scrapeOptions: { formats: ["markdown"], onlyMainContent: true }
})

firecrawl_search({
  query: `"want to quit" golf site:golfwrx.com`,
  limit: 10,
  scrapeOptions: { formats: ["markdown"], onlyMainContent: true }
})

firecrawl_search({
  query: `"waste of money" golf lessons instruction`,
  limit: 10,
  scrapeOptions: { formats: ["markdown"], onlyMainContent: true }
})

### PHASE 2: DESIRE LANGUAGE MINING (Target: 90 quotes)

firecrawl_search({
  query: `"finally broke 80" OR "finally broke 90" golf`,
  limit: 15,
  scrapeOptions: { formats: ["markdown"], onlyMainContent: true }
})

firecrawl_search({
  query: `"finally figured out" golf swing`,
  limit: 15,
  scrapeOptions: { formats: ["markdown"], onlyMainContent: true }
})

firecrawl_search({
  query: `"clicked" golf swing breakthrough`,
  limit: 10,
  scrapeOptions: { formats: ["markdown"], onlyMainContent: true }
})

firecrawl_search({
  query: `"consistent golf" OR "enjoying golf again"`,
  limit: 10,
  scrapeOptions: { formats: ["markdown"], onlyMainContent: true }
})

### PHASE 3: FRUSTRATION LANGUAGE MINING (Target: 80 quotes)

firecrawl_search({
  query: `"YouTube ruined" golf swing`,
  limit: 15,
  scrapeOptions: { formats: ["markdown"], onlyMainContent: true }
})

firecrawl_search({
  query: `"too many tips" golf confusing`,
  limit: 10,
  scrapeOptions: { formats: ["markdown"], onlyMainContent: true }
})

firecrawl_search({
  query: `"conflicting advice" golf instruction`,
  limit: 10,
  scrapeOptions: { formats: ["markdown"], onlyMainContent: true }
})

firecrawl_search({
  query: `"lessons didn't help" golf`,
  limit: 10,
  scrapeOptions: { formats: ["markdown"], onlyMainContent: true }
})

### PHASE 4: SKEPTICISM + HOPE LANGUAGE (Target: 105 quotes)

firecrawl_search({
  query: `"gurus just want" golf money`,
  limit: 10,
  scrapeOptions: { formats: ["markdown"], onlyMainContent: true }
})

firecrawl_search({
  query: `"online instruction worth it" golf`,
  limit: 10,
  scrapeOptions: { formats: ["markdown"], onlyMainContent: true }
})

firecrawl_search({
  query: `"different golfer now" OR "transformed my game"`,
  limit: 10,
  scrapeOptions: { formats: ["markdown"], onlyMainContent: true }
})

### PHASE 5: DIRECT THREAD SCRAPING

Scrape high-value threads discovered in searches:

firecrawl_scrape({
  url: "https://forums.golfwrx.com/topic/757316-bad-case-of-the-shanks-frustration/",
  formats: ["markdown"],
  onlyMainContent: true
})

firecrawl_scrape({
  url: "https://forums.golfwrx.com/topic/1748032-i-want-to-quit/",
  formats: ["markdown"],
  onlyMainContent: true
})

firecrawl_scrape({
  url: "https://forums.golfwrx.com/topic/1823957-nothing-i-do-fixes-my-sliceplease-help/",
  formats: ["markdown"],
  onlyMainContent: true
})

[Add 10-15 more high-value threads discovered in Phase 1-4]

### PHASE 6: COMPILE AND CATEGORIZE

From all scraped content, extract verbatim quotes into this format:

| Quote | Category | Intensity | Source URL |
|-------|----------|-----------|------------|
| "[EXACT QUOTE]" | [Category] | [1-5] | [URL] |

Categories:
- performance_pain, emotional_pain, social_pain, investment_pain
- performance_desire, emotional_desire, social_desire, identity_desire
- method_frustration, lesson_frustration, equipment_frustration, time_frustration
- instruction_skepticism, method_skepticism, self_skepticism
- breakthrough, success, transformation

### PHASE 7: FREQUENCY ANALYSIS

Identify phrases appearing 3+ times across sources.
Create HIGH-FREQUENCY PHRASES table.
Identify "master expressions" (most resonant versions).

Save to: agent-outputs/02-language-database.md

Run VERIFICATION GATE 2 before proceeding.

**Gate 2 Firecrawl Additions:**
□ All quotes are VERBATIM (spot-check 10 against source)
□ Source URLs documented for each quote
□ Quotes from multiple platforms (not just one forum)
□ 20+ high-frequency phrases identified
```

---

# AGENT 3 PROMPT

```
## AGENT 3: Emotional Depth Diver — Performance Golf

Read Agent 3 section of research system.
Review the language database from Agent 2.

Your mission: Transform verbatim language into deep emotional understanding.

### TASK 1: TEN DESIRE DIGS

Take the 10 most common/intense desires from the language database.

For each, perform the complete dig:

DESIRE: "[Surface desire from database]"

LAYER 1 → 2: Why do they want this?
DEEPER WANT: [Benefit behind benefit]
Evidence: [Supporting quotes]

LAYER 2 → 3: What does this mean about who they are?
DEEPEST WANT: [Identity/existential level]
Evidence: [Supporting quotes]

IDENTITY ASPIRATION: Who they want to become
IDENTITY AVOIDANCE: Who they don't want to be
CORE FEAR: Root fear driving this

COPYWRITING IMPLICATIONS: [How to use in copy]

### TASK 2: DOMINANT EMOTION HIERARCHY

Gather evidence for each emotion type:
- FEAR (wasted investment, embarrassment, decline, incapability)
- FRUSTRATION (advice, fixes, inconsistency)
- DESIRE (click moment, respect, enjoyment)
- SHAME (partners, ability vs investment)

Rate each: Intensity [1-5] × Prevalence [1-5]
Rank by score.

### TASK 3: EMOTIONAL COCKTAIL

Write 100-150 word first-person paragraph AS an amateur golfer.
Use their exact language from the database.
Goal: A golfer reads this and says "Are you in my head?"

Save to: agent-outputs/03-emotional-archaeology.md

Run VERIFICATION GATE 3.
```

---

# AGENT 4 PROMPT

```
## AGENT 4: Awareness & Sophistication Mapper — Performance Golf

Read Agent 4 section.
Use all previous agent outputs as context.

### TASK 1: AWARENESS MAPPING

For each awareness level, gather evidence and estimate percentage:

UNAWARE: [Evidence] — Est. ____%
PROBLEM-AWARE: [Evidence] — Est. ____%
SOLUTION-AWARE: [Evidence] — Est. ____%
PRODUCT-AWARE: [Evidence] — Est. ____%
MOST AWARE: [Evidence] — Est. ____%

Identify PRIMARY TARGET with justification.

### TASK 2: SOPHISTICATION INVENTORY

Document claims at each stage with status [Fresh/Tired/Dead]:

STAGE 1: Basic promises
STAGE 2: Enlarged claims (bigger, faster)
STAGE 3: Mechanism claims (lag, ground forces, etc.)
STAGE 4: Unique mechanisms (Tour Striker, etc.)
STAGE 5: Identity claims

### TASK 3: FRESH TERRITORY

Based on inventory:
- What claims are EXHAUSTED (avoid these)
- What claims are FRESH (opportunity)
- What's the current sophistication stage

Save to: agent-outputs/04-awareness-sophistication.md

Run VERIFICATION GATE 4.
```

---

# AGENT 5 PROMPT

```
## AGENT 5: Belief System Analyst — Performance Golf

Read Agent 5 section.

### TASK 1: BELIEF INVENTORY

Document beliefs in each category with evidence:

A. PROBLEM CAUSATION BELIEFS
"What do they believe causes their struggles?"
[List with evidence, prevalence, truth assessment]

B. SOLUTION BELIEFS
"What works / doesn't work?"
[List with evidence]

C. SELF-LIMITING BELIEFS (CRITICAL)
"What do they believe about themselves?"
[List with evidence, intensity, inversion potential]

D. PROVIDER BELIEFS
"What do they believe about instructors/companies?"
[List with evidence]

### TASK 2: INVERSION RANKING

For each belief with inversion potential:
- State the inversion
- Explain why it's true
- Rate Big Idea potential [1-10]

Rank all inversions. Identify Tier 1 (could power campaign).

### TASK 3: OBJECTION INVENTORY

Document objections with:
- Exact verbatim expression
- Frequency rating
- Intensity rating
- Root concern
- Counter approach

Rank by priority (Frequency × Intensity).

Save to: agent-outputs/05-belief-system.md

Run VERIFICATION GATE 5.
```

---

# AGENT 6 PROMPT

## Standard Mode
```
## AGENT 6: Competitive Intelligence Officer — Performance Golf

Read Agent 6 section.

### TASK 1: COMPETITOR PROFILES

Create deep profile for each competitor:

1. Me and My Golf
2. Athletic Motion Golf
3. Top Speed Golf
4. Scratch Golf Academy
5. Rotary Swing
6. GolfPass
7. Skillest
8. Golftec

For each, document:
- Exact headlines (verbatim)
- Core promise
- Mechanism claim
- Proof elements
- Pricing
- Voice characteristics
- Weaknesses/gaps

### TASK 2: FACEBOOK AD LIBRARY

Search Facebook Ad Library for:
- "golf swing"
- "improve golf"
- "golf tips"
- "break 80"

Document active ads, hooks, mechanisms, offers.

### TASK 3: WHITE SPACE ANALYSIS

Based on competitive scan:
- SATURATED: What everyone says
- UNDER-UTILIZED: What few say
- VIRGIN: What no one says
- DIFFERENTIATION OPPORTUNITY: Our path

Save to: agent-outputs/06-competitive-intel.md

Run VERIFICATION GATE 6.
```

## 🔥 FIRECRAWL-ENHANCED Agent 6 Prompt
```
## AGENT 6: Competitive Intelligence Officer — Firecrawl Enhanced

Use firecrawl_scrape with branding format to capture competitor voice and positioning.

### STEP 1: COMPETITOR HOMEPAGE SCRAPING

Execute for each competitor:

firecrawl_scrape({
  url: "https://meandmygolf.com",
  formats: ["markdown", "branding"]
})

firecrawl_scrape({
  url: "https://athleticmotiongolf.com",
  formats: ["markdown", "branding"]
})

firecrawl_scrape({
  url: "https://topspeedgolf.com",
  formats: ["markdown", "branding"]
})

firecrawl_scrape({
  url: "https://scratchgolfacademy.com",
  formats: ["markdown", "branding"]
})

firecrawl_scrape({
  url: "https://rotaryswing.com",
  formats: ["markdown", "branding"]
})

firecrawl_scrape({
  url: "https://www.golfpass.com",
  formats: ["markdown", "branding"]
})

### STEP 2: EXTRACT FROM BRANDING DATA

From each scrape, document:

**Content (from markdown):**
- Exact headlines (verbatim — do not paraphrase)
- Core promise statement
- Mechanism claims
- Testimonials captured
- Social proof elements
- CTA language

**Branding (from branding format):**
- Primary colors (hex codes)
- Fonts used
- Pricing captured
- Voice tone indicators

### STEP 3: SAMPLE OUTPUT FORMAT (Me and My Golf - Actual Data)

```yaml
COMPETITOR: Me and My Golf
URL: https://meandmygolf.com

HEADLINES (Verbatim):
- "play consistent, enjoyable golf"
- "Online golf coaching that just works"
- "real people, real results"

CORE PROMISE: Consistent, enjoyable golf through world-class online coaching

MECHANISM CLAIM: Step-by-step video lessons + live practice tool + personal swing analysis

PROOF ELEMENTS:
- "4.6 out of 5 based on 544 reviews" (Trustpilot)
- "1,000,000 golfers around the world"
- PGA Tour connection (Aaron Rai)

PRICING:
- Core Monthly: $27/month
- Core Annual: $199/year ($16.58/mo effective)
- VIP Monthly: $138.75/month
- VIP Annual: $999/year ($83.25/mo effective)

VOICE CHARACTERISTICS:
- Tone: Friendly, encouraging, professional
- Colors: Orange (#F2633D), Navy (#022147)
- Fonts: Museo Sans, Specter

TESTIMONIALS:
- "I learned more in two days than I did in the last year of golf"
- "I took 9 lessons last year and got nowhere. I made more progress with the one swing analysis"
- "The best decision I've made in the 20 years I've played golf"

WEAKNESSES/GAPS:
- [Identify from analysis]

WHAT THEY'RE NOT SAYING:
- [Opportunity area]
```

### STEP 4: WHITE SPACE ANALYSIS

After profiling all competitors:

SATURATED (Everyone says):
- [List common claims across all competitors]

UNDER-UTILIZED (Few say):
- [List claims only 1-2 competitors make]

VIRGIN TERRITORY (No one says):
- [List opportunities not being claimed]

DIFFERENTIATION OPPORTUNITY:
- [PG positioning recommendation]

Save to: agent-outputs/06-competitive-intel.md

Run VERIFICATION GATE 6.

**Gate 6 Firecrawl Additions:**
□ Branding data captured for all 5+ competitors
□ Exact pricing verified from scrape data
□ Headlines captured verbatim (not summarized)
□ Voice characteristics noted from branding format
```

---

# AGENT 7 PROMPT

```
## AGENT 7: Identity Cartographer — Performance Golf

Read Agent 7 section.

### TASK 1: CURRENT IDENTITY

Document how amateur golfers see themselves:
- Self-descriptions (verbatim)
- Group memberships
- Status indicators

### TASK 2: ASPIRATIONAL IDENTITY

Document who they want to become:
- Desired future self (verbatim)
- Role models
- Status they seek

### TASK 3: ANTI-IDENTITY (CRITICAL)

Document who they DON'T want to be:
- Negative identities (verbatim)
- Who they look down on
- What would be embarrassing

### TASK 4: TRIBAL MARKERS

Document:
- Insider language
- Shared enemies
- Shared heroes
- Shared beliefs

### TASK 5: IDENTITY MESSAGING

Create messaging angles:
- Aspirational: "Become the golfer who..."
- Anti-identity: "Stop being the golfer who..."
- Tribal: "Join the golfers who..."

Save to: agent-outputs/07-identity-map.md

Run VERIFICATION GATE 7.
```

---

# AGENT 8 PROMPT (WITH FULL ULTRA RICH VERIFICATION)

```
## AGENT 8: Synthesis Architect — Performance Golf
## 🔮 ULTRA RICH A-LIST STANDARD REQUIRED

Read Agent 8 section.
Review ALL previous agent outputs.

### A-LIST REQUIREMENTS (Non-Negotiable)

Before synthesizing, understand what A-list output looks like:

1. Identity portraits are PEOPLE (name, age, specific story), not segments
   ❌ "The Frustrated Investor (45%): Age 50-70, Handicap 12-25"
   ✅ "Meet Frank. 62 years old, retired airline pilot. Hit mandatory retirement at 65..."

2. Big Ideas have FULL FRAMEWORKS, not just headlines
   ❌ "The Only Golf School That Doesn't End When You Go Home"
   ✅ Hook + Problem articulation + Mechanism steps + Competitive contrast + Proof structure

3. VSL structures are TAILORED to this buyer's psychology, not templated
   ❌ "Section 1: Opening (2 min) → Section 2: Problem (6 min)..."
   ✅ Structure engineered for THIS buyer: opens with logistics (because 63.8% objections), validates skepticism before mechanism, emphasizes long-term testimonials

4. Copy examples DEMONSTRATE the insight, not just describe it
   ❌ "Logistics-first positioning required"
   ✅ Actual sales call script, actual VSL opening, actual email copy showing the approach

### CREATE THE A-LIST SYNTHESIS PACKAGE

1. MARKET PSYCHOLOGY SNAPSHOT (500 words)
   Write in first person AS the golfer.
   Use their exact language.
   Make a golfer say "Are you in my head?"

2. DOMINANT EMOTIONAL EQUATION
   Primary + Secondary + Underlying = Cocktail
   Must identify the TURNING POINTS, not just emotions

3. EXACT LANGUAGE GOLD
   Top 20 verbatim phrases with recommended use
   Each phrase must be HEADLINE-WORTHY

4. KEY BELIEF TO INVERT
   The belief → The inversion → The mechanism
   Must be SURPRISING AND PROVABLE

5. AWARENESS POSITIONING
   Target level + Lead type + What opening must establish
   Must include SPECIFIC copy examples

6. SOPHISTICATION POSITIONING
   Current stage + Fresh territory + What to avoid
   Fresh territory must be VERIFIED as unused

7. PRIMARY OBJECTION TO ADDRESS
   Objection + Root concern + Counter + Proof needed
   Must include ACTUAL LANGUAGE for handling

8. COMPETITIVE DIFFERENTIATION
   Everyone says → No one says → We should say
   Must create UNIQUE positioning, not just comparison

9. IDENTITY PORTRAITS (Dramatized)
   Create 3 VIVID portraits with:
   - Name, age, profession
   - Specific backstory
   - Golf journey and turning points
   - Exact language they use
   - What keeps them up at night about golf
   - What success looks like for them

10. BIG IDEA SEEDS (5 total)
    For each, provide FULL FRAMEWORK:
    - The angle type (Enemy, Belief Inversion, Identity, Secret, Mechanism)
    - The hook (one sentence that creates curiosity)
    - The problem articulation (in buyer's language)
    - The mechanism (step by step)
    - The competitive contrast (why this, not alternatives)
    - The proof structure (what evidence supports this)
    - The landing (where this naturally leads)
    - Probability of success with reasoning

Save to: agent-outputs/08-synthesis.md
Also save to: FINAL-RESEARCH-PACKAGE.md

### RUN ULTRA RICH POST-TASK VERIFICATION

Before declaring complete, run full verification:

THE IMPACT AUDIT — For each major element:
| Element | Present? | Lands? | Action Needed? |
|---------|----------|--------|----------------|
| Identity Portraits | | | |
| Emotional Digs | | | |
| Big Idea Seeds | | | |
| VSL Structure | | | |
| Competitive Positioning | | | |
| Key Belief Inversion | | | |

If Present but doesn't Land = "Hollow Technique" = REVISE

THE CALIBRATION CHECK
If best-in-class is 10, where does this honestly sit? ___/10
Minimum acceptable: 8/10
If below 8 → Apply Revision Protocol

THE HONESTY CHECK
□ Am I claiming this is done because it IS done, or because I want to be done?
□ What am I hoping the user won't notice?
□ If I were the user, would I be delighted or merely satisfied?

Run VERIFICATION GATE 8.

If PASS: Research complete. A-LIST package ready for Big Idea Generator.
If FAIL: Apply Revision Protocol before proceeding.
```

---

# VERIFICATION PROMPTS

After each agent, run the corresponding verification:

```
## VERIFICATION GATE [X]

Check the output from Agent [X].
Apply the verification checklist from the research system.

For each check:
- Mark PASS or FAIL
- If FAIL, identify what's missing
- Do NOT proceed until all checks pass

Document verification results in: verification-logs/gate-status.md
```

---

# FIRECRAWL QUICK REFERENCE

## Tools Available
| Tool | Use Case |
|------|----------|
| `firecrawl_search` | Find content, discover threads |
| `firecrawl_scrape` | Extract page content + branding |
| `firecrawl_map` | Discover all URLs on domain |
| `firecrawl_agent` | Autonomous multi-source research |

## Platform Status
| Platform | Status |
|----------|--------|
| GolfWRX Forums | ✅ Works |
| TheSandTrap | ✅ Works |
| Competitor Sites | ✅ Works |
| Reddit | ❌ Blocked (use search only) |
| TikTok/Instagram | ❌ Blocked |

## Time Savings with Firecrawl
| Agent | Standard | Firecrawl | Savings |
|-------|----------|-----------|---------|
| 1 | 2-3 hrs | 30-45 min | 75% |
| 1B | 2-3 hrs | 15-20 min | 90% |
| 1C | 2-3 hrs | 15-20 min | 90% |
| 2 | 6-8 hrs | 1.5-2.5 hrs | 70% |
| 6 | 3-4 hrs | 45-60 min | 80% |

---

*Execution Prompts v5.0 — ACE + Ultra Rich Integrated*
*Run in sequence. Do not skip gates. A-list is the standard.*
*Good enough is not acceptable. If it doesn't LAND, revise.*
*After campaign completion: Run Reflector + Curator for playbook evolution.*
