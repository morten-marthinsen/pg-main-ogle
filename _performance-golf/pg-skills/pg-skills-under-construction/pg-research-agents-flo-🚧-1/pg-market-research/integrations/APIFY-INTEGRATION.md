# APIFY MCP INTEGRATION
## Social Platform Intelligence + Ad Intelligence for Performance Golf Research

**Version:** 2.2 — YOUTUBE DEEP MINING Edition
**Last Updated:** January 2025
**For:** Performance Golf Market Research System v5.2+

---

## ⛔ NEW: YOUTUBE DEEP MINING (MANDATORY)

**YouTube is the #1 source of golf instruction content. Three actors form the complete YouTube mining stack.**

See [YOUTUBE-DEEP-MINING.md](YOUTUBE-DEEP-MINING.md) for full protocol.

### YouTube Tool Matrix

| Step | Actor | Purpose | Minimum |
|------|-------|---------|---------|
| 1 | `grow_media/youtube-search-api` | Find top videos by views | 100 videos |
| 2 | `karamelo/youtube-transcripts` | Extract full transcripts | 30 videos |
| 3 | `streamers/youtube-comments-scraper` | Extract comments | 500/video |

---

## ⛔ CRITICAL: REDDIT = APIFY ONLY

**Firecrawl is PERMANENTLY BLOCKED for Reddit at the platform level.**

This is not a temporary issue. Firecrawl will return ZERO results for any Reddit query. DO NOT attempt to use Firecrawl for Reddit under any circumstances.

### Reddit Tool Matrix

| Tool | Status | Use Case |
|------|--------|----------|
| **Apify `fatihtahta/reddit-scraper-search-fast`** | ✅ **PRIMARY & ONLY** | All Reddit scraping |
| Firecrawl site:reddit.com | ❌ **BLOCKED** | NEVER use |
| Firecrawl for Reddit thread URLs | ❌ **BLOCKED** | NEVER use |
| Archive.org | ⚠️ Fallback only | If Apify fails |

---

## ⛔ NO SHORTCUTS PROTOCOL

**READ THIS BEFORE PROCEEDING:**

1. **API costs must NEVER limit research depth.** This research is too valuable to shortcut.
2. **DO NOT self-limit** due to perceived efficiency or cost concerns.
3. **The cost estimates below are INFORMATIONAL ONLY** — they should not influence extraction volume decisions.
4. **Scrape MORE not less.** Better to have too much data than miss critical insights.

---

## PLAYBOOK INTEGRATION

Before using Apify, review these playbook sections:
- `api-*` (API configurations and best practices)
- `sqi-*` (Source quality insights for social platforms)
- `ci-*` (Competitive intelligence patterns)
- **`ts-00001`** (Reddit = Apify ONLY, mandatory)
- **`ts-00001b`** (No shortcuts protocol)

Track which bullets you apply during execution.

---

## Overview

Apify MCP enables access to social platforms and ad intelligence that Firecrawl cannot reach. This is CRITICAL for golf research because:

1. **TikTok Golf Content** — Massive volume of raw, emotional golf content and comments
2. **Instagram Golf Community** — Instructor content, engagement data, raw comment language
3. **Facebook Golf Pages** — Community discussion, competitor content
4. **Facebook Ads Library** — See EXACTLY what ads competitors are running NOW
5. **Reddit Golf Communities** — Deep discussion threads with authentic language
6. **YouTube Comments** — Long-form responses to instruction content

**Combined with Firecrawl**, you now have complete market coverage.

---

## Tool Strategy: Firecrawl + Apify

| Data Type | Primary Tool | Fallback | Notes |
|-----------|--------------|----------|-------|
| GolfWRX Forums | **Firecrawl** | Apify | |
| TheSandTrap Forums | **Firecrawl** | Apify | |
| Competitor Websites | **Firecrawl** (with branding) | Apify | |
| Landing Pages | **Firecrawl** | Apify | |
| Instagram Posts/Comments | **Apify** | Manual observation | |
| TikTok Posts/Comments | **Apify** | Manual observation | |
| Facebook Pages/Comments | **Apify** | Manual observation | |
| **Facebook Ads Library** | **Apify** | Manual Ad Library research | |
| **Reddit Threads** | **Apify ONLY** | Archive.org | ⛔ **Firecrawl BLOCKED** |
| YouTube Comments | **Apify** | Manual extraction | |
| Demographics/TAM | Firecrawl agent | Web search | |

**⚠️ IMPORTANT:** Reddit row shows Apify as ONLY option. Firecrawl is permanently blocked for Reddit at platform level.

---

## ENHANCED Extraction Configurations

### TikTok Deep Extraction

**Actor:** `clockworks/free-tiktok-scraper`
- **Rating:** 4.75 (98.9% success rate)
- **Use:** Scrape golf content from TikTok

```javascript
// ENHANCED TikTok Configuration
const tiktokConfig = {
  // Search parameters - GOLF SPECIFIC
  searchQueries: [
    "golf swing tips",
    "beginner golf",
    "golf frustration",
    "golf transformation",
    "I quit golf",
    "golf lesson fail",
    "golftok",
    "golf progress",
    "golf struggle"
  ],

  // Content filters
  filters: {
    minComments: 100,
    minDuration: 30,  // seconds - skip ultra-short
    excludeVerified: true,  // Remove brand accounts
    dateRange: "last_90_days"
  },

  // Comment extraction - DEPTH
  commentConfig: {
    maxComments: 500,  // NOT 100
    includeReplies: true,  // CRITICAL
    sortBy: "relevance",

    // Reply thread priority
    prioritizeThreads: {
      minReplies: 5,  // Debates/controversies
      creatorReplied: true  // Instructor engagement
    }
  },

  // Content filtering
  contentFilters: {
    minCharacters: 50,
    mustContainAny: ["I", "my", "finally", "years", "months", "tried", "help"],
    excludePatterns: ["link in bio", "DM me", "check out my"]
  },

  // Output fields
  outputFields: [
    "text",
    "likes",
    "replies",
    "authorUsername",
    "isCreatorReply",
    "parentCommentId"
  ]
};

// TikTok content scraping call
call-actor({
  actor: "clockworks/free-tiktok-scraper",
  step: "call",
  input: {
    hashtags: ["golftok", "golftips", "golfswing", "golffail", "golfprogress"],
    maxItems: 100
  }
})
```

**TikTok Comment Deep Extraction:**

**Actor:** `scraptik/tiktok-comments-scraper-api`
- **Rating:** 5.0
- **Use:** Deep comment extraction from viral golf videos

```javascript
// TikTok comment extraction for high-engagement videos
call-actor({
  actor: "scraptik/tiktok-comments-scraper-api",
  step: "call",
  input: {
    postUrls: ["https://tiktok.com/@user/video/123"],
    maxComments: 500,
    includeReplies: true
  }
})
```

---

### Instagram Deep Extraction

**Actor:** `apidojo/instagram-hashtag-scraper`
- **Rating:** 5.0 (99.9% success rate)
- **Use:** Scrape posts and comments from golf hashtags

```javascript
// ENHANCED Instagram Configuration
const instagramConfig = {
  // Target accounts for golf
  targetAccounts: [
    "meandmygolf",
    "gaborlabella",
    "rickshielsgolf",
    "ganaboreal",
    "paboreal",
    "george.gankas",
    "tourstriker",
    "golf_gods"
  ],

  // Content types
  contentTypes: {
    reels: {
      enabled: true,
      minComments: 500,
      extractComments: true,
      maxCommentsPerReel: 1000
    },
    highlights: {
      enabled: true,  // CRITICAL - poll data lives here
      targetHighlights: ["polls", "q&a", "questions", "feedback"]
    },
    posts: {
      enabled: true,
      minComments: 100
    }
  },

  // Comment filtering
  commentFilters: {
    minLength: 50,
    excludeEmoji: true,  // Skip emoji-only
    prioritizeLongForm: true
  }
};

// Golf hashtag scraping
call-actor({
  actor: "apidojo/instagram-hashtag-scraper",
  step: "call",
  input: {
    hashtags: [
      "golftips",
      "golfswing",
      "golftok",
      "golfinstruction",
      "golfprogress",
      "golferproblems",
      "golfstruggle",
      "weekendgolfer",
      "amateurgoler"
    ],
    resultsLimit: 100,
    includeComments: true
  }
})
```

**Competitor Profile Scraping:**

**Actor:** `instagram-scraper/fast-instagram-post-scraper`
- **Use:** Scrape specific competitor profiles
- **Cost:** FREE

```javascript
// Competitor profile scraping
call-actor({
  actor: "instagram-scraper/fast-instagram-post-scraper",
  step: "call",
  input: {
    usernames: [
      "rickshielsgolf",
      "meandmygolf",
      "tourstriker",
      "golf_gods",
      "gaborlabella",
      "george.gankas"
    ],
    resultsLimit: 50
  }
})
```

---

### Reddit Extraction (⛔ APIFY ONLY - Firecrawl Blocked)

**⚠️ CRITICAL: Firecrawl is PERMANENTLY BLOCKED for Reddit. DO NOT attempt Firecrawl for any Reddit URL or search.**

**Actor:** `fatihtahta/reddit-scraper-search-fast`
- **Use:** ALL Reddit scraping - this is the PRIMARY and ONLY method
- **Note:** Alternative actors like `trudax/reddit-scraper-lite` can be used as backup

```javascript
// ⛔ MANDATORY Reddit extraction configuration
// DO NOT use Firecrawl for Reddit under ANY circumstances

// PRIMARY Reddit scraping call (REQUIRED)
call-actor({
  actor: "fatihtahta/reddit-scraper-search-fast",
  step: "call",
  input: {
    searchTerms: [
      "golf frustrated",
      "golf embarrassing",
      "golf tried everything",
      "golf finally figured out",
      "chipping yips",
      "chunking chip",
      "fat shot golf",
      "golf yips",
      "golf lesson fail",
      "golf youtube confusing"
    ],
    subreddit: "golf",  // Can also use "GolfSwing", "golfinstruction"
    sort: "relevance",
    postLimit: 500,  // MINIMUM 500 - DO NOT REDUCE
    commentLimit: 100
  }
})

// Run additional searches for different subreddits
call-actor({
  actor: "fatihtahta/reddit-scraper-search-fast",
  step: "call",
  input: {
    searchTerms: ["swing help", "what am I doing wrong", "finally clicked"],
    subreddit: "GolfSwing",
    sort: "relevance",
    postLimit: 500,
    commentLimit: 100
  }
})
```

**Reddit Search Terms to Cover (run separate queries):**
- "frustrated" + golf
- "embarrassing" OR "embarrassed" + golf
- "tried everything" + golf
- "finally figured out" + golf
- "clicked" + swing
- "YouTube ruined" + golf
- "consistency problem" + golf
- "chunk" OR "fat shot" OR "thin" OR "skull"
- "yips" + golf
- "chipping yips"
- "give up" + golf
- "help me" + golf
- "what am I doing wrong" + golf

**Target Subreddits:**
- r/golf (PRIMARY - 800K+ subscribers)
- r/GolfSwing (PRIMARY - 100K+ subscribers)
- r/golfinstruction
- r/AskGolf

**Archive Fallback (ONLY if Apify fails):**
```javascript
// Use ONLY if Apify actor fails
const archiveFallback = {
  enabled: true,
  archiveUrl: "https://web.archive.org/web/",
  note: "Check archive.org for cached Reddit threads"
}
```

---

### YouTube Deep Mining (⛔ MANDATORY THREE-STEP PROCESS)

**YouTube is the #1 source of golf instruction content. This three-step process is MANDATORY.**

See [YOUTUBE-DEEP-MINING.md](YOUTUBE-DEEP-MINING.md) for full protocol.

---

#### Step 1: Video Discovery

**Actor:** `grow_media/youtube-search-api`
- **Rating:** 4.83 (100% success rate)
- **Use:** Find top videos by view count to identify what content resonates
- **Cost:** ~$0.60-$1 per 1,000 results

```javascript
// Find top golf instruction videos by view count
call-actor({
  actor: "grow_media/youtube-search-api",
  step: "call",
  input: {
    q: "golf chipping tips",      // Primary search term
    maxResults: 100,              // Get top 100 videos
    order: "viewCount",           // CRITICAL: Sort by views to find what resonates
    videoDuration: "medium",      // 4-20 minutes (instruction content)
    regionCode: "US"
  }
})
```

**Search Terms by Product Type:**

**Wedge/Short Game Products:**
```
- "golf chipping tips"
- "stop chunking chips"
- "golf pitching technique"
- "chipping yips cure"
- "short game golf"
- "fat chip shots fix"
```

**Driver/Distance Products:**
```
- "golf driver tips"
- "stop slicing driver"
- "golf swing speed"
- "hit driver straighter"
- "golf distance gains"
```

**General Instruction:**
```
- "golf swing fix"
- "consistent golf swing"
- "golf improvement tips"
- "fix golf slice"
```

**Output Fields to Capture:**
```json
{
  "title": "Video title",
  "url": "https://www.youtube.com/watch?v=VIDEO_ID",
  "viewCount": 1500000,
  "likes": 45000,
  "commentsCount": 2300,
  "channelName": "Rick Shiels Golf",
  "date": "2024-03-15",
  "duration": 720,
  "text": "Description text...",
  "hashtags": ["golftips", "chipping"]
}
```

**Video Selection Criteria:**
- **HIGH PRIORITY:** Views > 500K, Comments > 1K
- **MEDIUM PRIORITY:** Views 100K-500K, Comments 200-1K

---

#### Step 2: Transcript Extraction

**Actor:** `karamelo/youtube-transcripts`
- **Rating:** 4.7 (100% success rate)
- **Use:** Extract full spoken content from top videos
- **Cost:** ~$5-7 per 1,000 videos

```javascript
// Extract transcripts from top videos identified in Step 1
call-actor({
  actor: "karamelo/youtube-transcripts",
  step: "call",
  input: {
    urls: [
      "https://www.youtube.com/watch?v=VIDEO_ID_1",
      "https://www.youtube.com/watch?v=VIDEO_ID_2"
      // Add 20-50 video URLs from Step 1 (minimum 30)
    ],
    outputFormat: "captions",          // Clean text array
    maxRetries: 8,                      // Ensure success
    channelNameBoolean: true,
    datePublishedBoolean: true,
    viewCountBoolean: true,
    likesBoolean: true,
    commentsBoolean: true,
    descriptionBoolean: true
  }
})
```

**What to Extract from Transcripts:**

| Category | What to Look For | Example Phrases |
|----------|------------------|-----------------|
| **MECHANISM** | What they call their technique | "The hinge and hold method", "The anti-chunk motion" |
| **PROMISE** | What they promise viewers | "Never chunk another chip", "Add 30 yards" |
| **PROBLEM** | How they describe viewer's pain | "I know you've been struggling with..." |
| **AUTHORITY** | How they establish credibility | "I've taught thousands of students..." |
| **OBJECTION** | Concerns they preemptively address | "You might think this won't work..." |

---

#### Step 3: Comment Extraction

**Actor:** `streamers/youtube-comments-scraper`
- **Rating:** 4.63 (98.7% success rate)
- **Use:** Extract viewer reactions, questions, and testimonials
- **Cost:** Tiered ($0.50-4 per 1K based on volume)

```javascript
// Extract comments from high-performing videos
call-actor({
  actor: "streamers/youtube-comments-scraper",
  step: "call",
  input: {
    startUrls: [
      { "url": "https://www.youtube.com/watch?v=VIDEO_ID_1" },
      { "url": "https://www.youtube.com/watch?v=VIDEO_ID_2" }
      // Add 10-20 video URLs from Step 1
    ],
    maxComments: 500,           // MINIMUM 500 per video
    commentsSortBy: "1"         // Sort by relevance (most engaged)
  }
})
```

**Comment Types to Flag (SQS Scoring):**

| SQS Level | Pattern | Examples |
|-----------|---------|----------|
| **HIGH (8-10)** | Personal transformation stories | "I've been struggling with this for 3 years and finally..." |
| **HIGH (8-10)** | Specific numbers | "After 47 lessons over 5 years, this is the first thing that..." |
| **MEDIUM (5-7)** | General reactions | "This makes so much sense", "Why didn't anyone tell me before?" |
| **LOW (1-4)** | No substance | "Great video!", emoji-only, spam |

**Comment Mining Regex Patterns:**

```javascript
const commentPatterns = {
  TRANSFORMATION: /before.*after|used to.*now|finally|breakthrough/i,
  FRUSTRATION: /years|tried everything|frustrated|embarrassed|quit/i,
  SKEPTICISM: /thought.*wouldn't|didn't believe|skeptical|but/i,
  SUCCESS: /worked|fixed|solved|cured|finally|helped/i
};
```

**YouTube-Specific SQS Modifiers:**
- **+1 SQS** for: Comments with 50+ likes, comments with replies, specific numbers
- **-1 SQS** for: Comments under 20 words, emoji-only, promotional

---

#### Complete YouTube Workflow Summary

```
⛔ YOUTUBE MINING MINIMUMS (MANDATORY)
──────────────────────────────────────
□ Step 1: 100+ videos discovered via grow_media/youtube-search-api
□ Step 2: 30+ transcripts extracted via karamelo/youtube-transcripts
□ Step 3: 10,000+ comments scraped via streamers/youtube-comments-scraper
□ 50+ high-SQS (8-10) comments from YouTube
□ Top 5 channels documented with positioning
□ Top 10 "winning" videos analyzed (1M+ views)

If ANY fail: ⛔ MINE DEEPER
```

**Target Channels:**
- Rick Shiels (2.5M+ subscribers)
- Me and My Golf
- Athletic Motion Golf
- Good Good
- Bob Does Sports

---

## Facebook Ads Library Intelligence (CRITICAL)

**Actor:** `curious_coder/facebook-ads-library-scraper`
- **Rating:** 4.57 (99.8% success rate)
- **Monthly Users:** 1,297
- **Use:** Scrape ALL active ads from competitors

### Why This Matters

The Facebook Ads Library shows you:
- **What ads competitors are actually running** (not what they claim works)
- **How long campaigns have been running** (duration = proof it converts)
- **Ad creative types** (video, image, carousel)
- **Landing page URLs** (where they drive traffic)
- **Ad copy patterns** (hooks, CTAs that work)

### Market-Wide Ad Library Scraping

```javascript
// Search by market keywords
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
      "fix golf slice",
      "golf consistency"
    ],
    country: "US",
    adActiveStatus: "ACTIVE",
    maxAds: 300
  }
})
```

### Competitor-Specific Ad Scraping

```javascript
// Search by advertiser name/page
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
    maxAds: 50  // per competitor
  }
})
```

### Ad Intelligence Output

For each ad, you'll get:
- **Ad ID** — Unique identifier
- **Page Name** — Advertiser
- **Ad Creative** — Text, images, video URLs
- **Landing Page URL** — Where it drives traffic
- **Start Date** — When campaign launched (CRITICAL for longevity analysis)
- **Platforms** — FB, IG, Messenger, Audience Network
- **Impressions** — Estimated reach (if available)

---

## Facebook Page Scraping

**Actor:** `thedoor/facebook-page-scraper`
- **Rating:** 5.0
- **Use:** Scrape competitor Facebook pages and community pages

```javascript
// Facebook page scraping
call-actor({
  actor: "thedoor/facebook-page-scraper",
  step: "call",
  input: {
    pageUrls: [
      "https://facebook.com/meandmygolf",
      "https://facebook.com/performancegolf",
      "https://facebook.com/athleticmotiongolf",
      "https://facebook.com/topspeedgolf"
    ],
    maxPosts: 50,
    includeComments: true
  }
})
```

---

## Agent Integration Points

### Agent 1: Market Intelligence Scout

**Add social platform source mapping:**

```
SOCIAL PLATFORM SOURCES
───────────────────────
INSTAGRAM (via Apify):
- @rickshielsgolf (followers, engagement rate)
- @meandmygolf
- @tourstriker (Martin Chuck - competitor intel)
- @gaborlabella
- @golf_gods (memes = frustrations revealed)

TIKTOK (via Apify):
- Top accounts in #golftok
- High-engagement instruction clips
- Viral fail compilations (pain language gold)

REDDIT (via Apify):
- r/golf (main community)
- r/GolfSwing (swing-specific frustrations)
- r/golfinstruction (learning journeys)

YOUTUBE (via Apify):
- Transformation video comments
- "I quit golf" video responses
- Instructor debate threads
```

### Agent 2: Language Archaeologist

**Social platform comment mining workflow:**

```javascript
// Step 1: Instagram comment mining
// Use apidojo/instagram-hashtag-scraper to get posts from golf hashtags
// Extract comments from high-engagement posts
// Filter for emotional language (frustration, desire, pain)

// Step 2: TikTok comment mining
// Use clockworks/free-tiktok-scraper to find viral golf content
// Use scraptik/tiktok-comments-scraper-api for deep comment extraction
// TikTok comments are often MORE raw than forum posts

// Step 3: Apply Signal Quality Scoring (SQS) to all extracted quotes
// Add to verbatim quote database with source attribution
```

**Social Platform Quote Categories:**
- Pain expressions ("I've been working on this for months and still...")
- Desire expressions ("I just want to...")
- Frustration with instruction ("Every video says something different")
- Breakthrough moments ("Finally figured out...")
- Self-doubt ("Maybe I'm just not meant to...")

### Agent 6: Competitive Intelligence Officer

**Social presence analysis template:**

```
COMPETITOR SOCIAL ANALYSIS
──────────────────────────
COMPETITOR: [Name]

INSTAGRAM:
- Followers: ___
- Avg Engagement Rate: ___%
- Top Content Themes: [List]
- Comment Sentiment: [Positive/Mixed/Negative]

TIKTOK:
- Followers: ___
- Avg Views: ___
- Top Content Types: [List]
- Comment Sentiment: [Analysis]

FACEBOOK:
- Page Likes: ___
- Avg Post Engagement: ___
- Group Activity: [If applicable]

CONTENT STRATEGY NOTES:
- What content performs best?
- What voice/tone do they use?
- What gaps exist in their content?
```

### Agent 9: Ad & Funnel Intelligence Analyst

**Complete workflow:**

```javascript
// Step 1: Market-wide ad scraping
call-actor({
  actor: "curious_coder/facebook-ads-library-scraper",
  step: "call",
  input: {
    searchTerms: ["golf instruction", "golf swing", "break 80"],
    country: "US",
    adActiveStatus: "ACTIVE",
    maxAds: 300
  }
})

// Step 2: Competitor-specific scraping
call-actor({
  actor: "curious_coder/facebook-ads-library-scraper",
  step: "call",
  input: {
    pageIds: ["meandmygolf", "athletic-motion-golf", "top-speed-golf"],
    country: "US",
    adActiveStatus: "ACTIVE",
    maxAds: 50
  }
})

// Step 3: Landing page scraping (via Firecrawl)
firecrawl_scrape({
  url: "[landing-page-url-from-ad]",
  formats: ["markdown", "branding"]
})
```

---

## Golf-Specific Query Templates

### Instagram Hashtags
```
#golftips #golfswing #golftok #golfinstruction
#golfprogress #golflesson #golfcoach #golflife
#golfimprovement #amateurgolf #weekendgolfer
#golferproblems #golfstruggle #golfaddict
#golffrustration #golfbreakthrough
```

### TikTok Hashtags
```
#golftok #golftips #golfswing #golffail
#golfprogress #golfstruggle #golftiktok
#golfimprovement #golflessons #golfcoach
#golfbeginner #golfjourney #golfgoals
```

### Reddit Search Terms
```
"frustrated" "give up" "finally" "breakthrough"
"lesson" "YouTube" "can't figure out" "I quit"
"help me" "what am I doing wrong" "advice needed"
"swing thoughts" "changed my game"
```

### Facebook Ad Library Search Terms
```
"golf instruction" "golf swing" "golf tips"
"break 80" "break 90" "golf improvement"
"golf lessons online" "golf training"
"golf consistency" "golf distance"
"slice fix" "hook fix" "golf power"
```

---

## Cost Estimates

### Per Research Project (Agent 1 + Agent 2 + Agent 6 + Agent 9)

| Task | Actor | Est. Cost |
|------|-------|-----------|
| Instagram hashtag scraping | apidojo/instagram-hashtag-scraper | $2-5 |
| Instagram profile scraping | instagram-scraper/fast-instagram-post-scraper | FREE |
| TikTok content scraping | clockworks/free-tiktok-scraper | $2-4 |
| TikTok comment extraction | scraptik/tiktok-comments-scraper-api | $3-5 |
| Facebook page scraping | thedoor/facebook-page-scraper | $2-4 |
| Reddit scraping | fatihtahta/reddit-scraper-search-fast | $2-3 |
| **YouTube video search** | grow_media/youtube-search-api | $0.50-1 |
| **YouTube transcripts** | karamelo/youtube-transcripts | $0.20-0.50 |
| **YouTube comments** | streamers/youtube-comments-scraper | $4-24 |
| **Facebook Ads Library** | curious_coder/facebook-ads-library-scraper | $5-10 |
| **TOTAL APIFY COST** | | **$20-60** |

**Note:** Actual costs depend on volume. YouTube comments can vary significantly based on number of videos scraped. These costs are INFORMATIONAL ONLY — do NOT let them influence extraction depth.

---

## Execution Timeline Impact

### Without Apify (Firecrawl Only)
| Agent | Time |
|-------|------|
| Agent 1: Sources | 30-45 min |
| Agent 2: Language | 1.5-2.5 hrs |
| Agent 6: Competitive | 45-60 min |
| Agent 9: Ad Intel | 3-4 hrs (manual) |

### With Firecrawl + Apify (Enhanced)
| Agent | Time | Notes |
|-------|------|-------|
| Agent 1: Sources | 45-60 min | +social platform mapping |
| Agent 2: Language + SQS | 1-1.5 hrs | Social comments faster |
| Agent 6: Competitive | 1-1.5 hrs | +social presence data |
| **Agent 9: Ad Intel** | **2-3 hrs** | Fully automated |

**Total time similar, but data quality MUCH higher with social + ad intelligence.**

---

## VERIFICATION GATE: APIFY INTEGRATION

```
⛔ MANDATORY YOUTUBE DEEP MINING (ALL THREE STEPS REQUIRED)
───────────────────────────────────────────────────────────
□ YouTube Search: 100+ videos discovered via grow_media/youtube-search-api
□ YouTube Transcripts: 30+ transcripts extracted via karamelo/youtube-transcripts
□ YouTube Comments: 10,000+ comments scraped via streamers/youtube-comments-scraper
□ Top 10 videos by views identified and documented
□ Top 5 channels documented with positioning analysis
□ 50+ high-SQS (8-10) YouTube comments added to quote database

If ANY YouTube check fails: ⛔ DO NOT PROCEED

APIFY EXTRACTION COMPLETENESS CHECK
───────────────────────────────────
□ TikTok: 500+ comments extracted with replies
□ Instagram: 5+ competitor accounts scraped
□ Reddit: 500+ posts scraped via Apify (NOT Firecrawl)
□ Facebook Ads: 300+ market ads + 50+ per competitor
□ YouTube: ALL THREE STEPS COMPLETED (see above)

QUALITY CHECK
─────────────
□ Comment filters applied (min 50 chars, personal language)
□ SQS scoring applied to all extracted quotes
□ Source attribution complete for all quotes
□ Landing page URLs captured from all ads
□ Ad longevity data (start dates) captured
□ YouTube transcript mechanism/promise language documented

TOOL VERIFICATION
─────────────────
□ Reddit scraped via Apify (NOT Firecrawl) ← MANDATORY
□ YouTube scraped via all three Apify actors ← MANDATORY
□ Did NOT reduce scrape limits due to cost concerns
□ Did NOT skip sources due to context window concerns

GATE STATUS: [ ] PASS [ ] FAIL
```

---

## Playbook Output

```json
{
  "playbook_bullets_applied": [
    {"bullet_id": "api-00001", "how_applied": "Used enhanced TikTok config", "helpful": true},
    {"bullet_id": "api-00002", "how_applied": "Applied comment filters", "helpful": true}
  ],
  "playbook_gaps_encountered": [],
  "new_patterns_discovered": [
    {"pattern": "[New extraction pattern]", "evidence": "[Data]", "confidence": 0.8}
  ]
}
```

---

## Reference

- **Main research system:** See PERFORMANCE-GOLF-RESEARCH-SYSTEM.md
- **Firecrawl integration:** See integrations/FIRECRAWL-INTEGRATION.md
- **Agent 9 protocol:** See agents/AGENT-9-AD-FUNNEL.md
- **Ultra Rich integration:** See ULTRA-RICH-INTEGRATION.md

---

*Apify Integration v2.2 — YOUTUBE DEEP MINING Edition*
*Social Platform Intelligence + Ad Intelligence + YouTube Mining Stack*
*Last Updated: January 2025*
