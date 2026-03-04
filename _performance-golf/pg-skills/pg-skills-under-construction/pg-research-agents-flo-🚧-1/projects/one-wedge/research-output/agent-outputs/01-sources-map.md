# Agent 1: Market Intelligence Scout
## Source Map for ONE.1 Wedge Research

**Product:** ONE.1 Wedge by Performance Golf
**Date:** January 2025
**Status:** COMPLETE

---

## PRIMARY SOURCE CATEGORIES

### 1. GOLF FORUMS (Highest SQS Potential: 8-10)

#### GolfWRX Forums
- **URL:** forums.golfwrx.com
- **Key Threads Identified:**
  - "Chunking less than 100% shots" - 50+ replies on partial swing fat shots
  - "Chipping yips and utterly wrecked confidence" - Raw emotional language
  - "Why is chipping and pitching so hard" - Technique frustration
  - "I cured my life-long chipping yips" - Solution-seeking language
  - "Chipping Yips" (2024) - Recent discussion with modern terminology
- **Scrapability:** HIGH (Firecrawl compatible)
- **Language Richness:** EXCEPTIONAL - Multi-year golfers sharing real struggles

#### TheSandTrap Forums
- **URL:** thesandtrap.com/forums
- **Key Threads Identified:**
  - "Need help with Fat/Thin shots with wedges" - Technical + emotional blend
  - "Chunking everything lately, HELP" - Crisis language, time pressure
- **Scrapability:** HIGH
- **Language Richness:** HIGH - Detailed swing analysis + frustration

#### MyGolfSpy Forums
- **URL:** forum.mygolfspy.com
- **Key Threads Identified:**
  - "Desperate help with yips" - Desperation language
  - Equipment review discussions with user experience
- **Scrapability:** HIGH
- **Language Richness:** MODERATE-HIGH

#### Golf Monthly Forums
- **URL:** forums.golfmonthly.com
- **Key Thread:** "Chipping yips!!" - Former scratch golfer struggles
- **Scrapability:** HIGH
- **Language Richness:** HIGH - Performance regression narrative

#### Toronto Golf Nuts
- **URL:** torontogolfnuts.com/forum
- **Key Thread:** "Chipping yips finally cured!!" - Solution language
- **Scrapability:** MODERATE
- **Language Richness:** MODERATE

### 2. INSTRUCTION/CONTENT SITES (SQS: 5-7)

| Source | URL | Content Type | Value |
|--------|-----|--------------|-------|
| Golf.com Instruction | golf.com/instruction | Pro tips, reader questions | Belief identification |
| Golf Digest | golfdigest.com | Equipment reviews, technique | Sophistication mapping |
| HackMotion | hackmotion.com | Technical analysis | Problem articulation |
| GoingLow | goinglow.com | Instruction articles | Common fixes attempted |

### 3. VIDEO CONTENT (SQS: 4-6 for comments)

| Platform | Search Terms | Expected Yield |
|----------|--------------|----------------|
| YouTube | "stop chunking wedges" | Comment mining potential |
| YouTube | "chipping yips cure" | Desperation keywords |
| YouTube | "fat shots around green" | Before/after language |

### 4. COMPETITOR PRODUCT PAGES (For Agent 6)

| Brand | Wedge Line | URL | Positioning |
|-------|-----------|-----|-------------|
| Cleveland | CBX 4 ZipCore | clevelandgolf.com | Forgiveness, cavity-back |
| Cleveland | RTX ZipCore | clevelandgolf.com | Tour performance, spin |
| Titleist | Vokey SM10 | titleist.com | Tour-dominant, precision |
| Callaway | Opus / Opus Platinum | callawaygolf.com | "Where Art Meets Science" |
| TaylorMade | Hi-Toe 4 | taylormadegolf.com | Full-face grooves, versatility |
| TaylorMade | Milled Grind 4 | taylormadegolf.com | Precision milling |
| PING | s159 | ping.com | Grind variety, forgiveness |

### 5. MARKET DATA SOURCES (For Agent 1C)

| Source | Data Type | Reliability |
|--------|-----------|-------------|
| NGF (National Golf Foundation) | Participation stats | HIGH |
| USGA Handicap Data | Skill distribution | HIGH |
| Statista | Market sizing | MODERATE |
| Credence Research | Equipment market | MODERATE |
| Cognitive Market Research | Golf equipment forecast | MODERATE |

### 6. REVIEW AGGREGATORS

| Site | Value | Notes |
|------|-------|-------|
| Plugged In Golf | In-depth reviews | Technical detail |
| Golf Alot | Multiple wedge comparisons | Feature matrices |
| The Hackers Paradise | Player perspective | Authenticity |
| Golfshake | UK perspective | International view |

---

## SOURCE PRIORITY MATRIX

| Priority | Source Type | Why | SQS Range |
|----------|-------------|-----|-----------|
| 1 | GolfWRX Forums | Authentic emotional language, long posts | 7-10 |
| 2 | TheSandTrap Forums | Technical + emotional blend | 7-9 |
| 3 | MyGolfSpy Forums | Equipment-focused discussion | 6-8 |
| 4 | YouTube Comments | Quick wins, volume | 4-7 |
| 5 | Instruction Articles | Belief identification | 5-7 |
| 6 | Product Reviews | Competitor positioning | 5-7 |

---

## SCRAPING STATUS

| Source | Status | Method | Notes |
|--------|--------|--------|-------|
| GolfWRX | COMPLETE | Firecrawl | 3 threads scraped |
| TheSandTrap | COMPLETE | Firecrawl | 2 threads scraped |
| MyGolfSpy | COMPLETE | Firecrawl | 1 thread scraped |
| Reddit | ✅ COMPLETE | Apify | 13,642 items via `fatihtahta/reddit-scraper-search-fast` |
| Instagram | ✅ COMPLETE | Apify | 149 items via `apify/instagram-hashtag-scraper` |
| TikTok | ✅ COMPLETE | Apify | 148 items via `clockworks/tiktok-scraper` |
| Competitor Sites | PARTIAL | Exa Search | Mix of 403/success |

### Social Media Scraping Details (January 2025 Update)

**Reddit r/golf:**
- Actor: `fatihtahta/reddit-scraper-search-fast`
- Queries: "chunking wedge golf", "fat shots short game", "chunk chip shot", "wedge yips golf"
- Dataset ID: `7KdYAi9eKoJc49kn7`
- Items: 13,642 posts and comments
- Quality: HIGH - Long-form narratives, detailed frustration stories

**Instagram:**
- Actor: `apify/instagram-hashtag-scraper`
- Hashtags: #golfstruggle, #chunkshot, #shortgamefail, #golffrustration, #amateursgolf, #weekendgolfer
- Dataset ID: `lCWPe85EcCQs5N4O3`
- Items: 149 posts
- Quality: MODERATE-HIGH - Short captions, hashtag identity language

**TikTok:**
- Actor: `clockworks/tiktok-scraper`
- Hashtags: #golffail, #golfstruggles, #chunkingit, #golffrustration, #shortgame
- Dataset ID: `0J98gC5J7bB2l6Qel`
- Items: 148 videos
- Quality: HIGH - Viral content, engagement metrics as social proof

**Why Firecrawl Failed on Reddit:**
Firecrawl blocks Reddit at the platform level (enterprise-only access). Error: "This website is not currently supported." Solution: Use Apify actors which are specifically designed to handle social media authentication and rate limiting.

---

## ULTRA RICH CHECK

**Pre-Task Interrogation Complete:**
- A-list output = Sources that reveal EMOTIONAL TRUTH, not just demographic data
- Typical shortcuts to avoid = Surface-level product pages without user discussion
- High-leverage points = Forum threads with 20+ replies (indicates resonance)

**Impact Landing Assessment:**
- [x] Sources represent RICHEST veins of language? YES - Forum threads prioritized
- [x] Includes multiple perspectives (struggling, solved, giving up)? YES
- [x] Enables three-layer emotional digs? YES - Threads have progression

---

## NEXT STEPS FOR AGENT 2

1. Extract verbatim quotes from scraped forum content
2. Assign SQS scores (prioritize 7+ for primary evidence)
3. Categorize by:
   - Pain language (chunking, fat, skull, blade)
   - Embarrassment language (in front of, partners, playing partners)
   - Solution attempts (tried, lessons, watched, read)
   - Desire language (just want, if only, wish I could)
   - Identity language (I am, I'm a, golfer who)

---

*Agent 1 Complete - Verified by Ultra Rich Impact Landing Check*
