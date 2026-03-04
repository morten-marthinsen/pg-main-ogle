# YOUTUBE DEEP MINING INTEGRATION
## Transcripts + Comments = Market Research Gold

**Version:** 1.1 — Search Term Expansion Edition
**Last Updated:** January 2025
**For:** Performance Golf Market Research System v5.2+

---

## ⛔ WHY THIS MATTERS

YouTube is the **#1 source of golf instruction content** with:
- Millions of golfers actively watching and commenting
- Long-form content revealing EXACTLY what instructors promise
- Comments revealing REAL reactions, frustrations, and breakthroughs
- View counts showing what resonates with the market

**We were barely touching this goldmine. That ends now.**

---

## THE YOUTUBE MINING STACK

| Step | Actor | Purpose | Minimum |
|------|-------|---------|---------|
| 1 | `grow_media/youtube-search-api` | Find top videos by views | 100 videos |
| 2 | `karamelo/youtube-transcripts` | Extract full transcripts | 30 videos |
| 3 | `streamers/youtube-comments-scraper` | Extract comments | 500+ comments per video |

---

## ⛔ SEARCH TERM EXPANSION PROTOCOL (MANDATORY)

**A superficial search of 2-3 terms will MISS critical content. This protocol ensures comprehensive coverage.**

### Why This Matters

- A search for "golf chipping tips" will find instructional content
- But it will MISS the emotional content found via "can't stop chunking" or "chipping yips ruining my game"
- The highest-SQS content often lives in searches for PROBLEMS, not solutions

### Minimum Search Term Requirements

```
⛔ MANDATORY: 15+ UNIQUE SEARCH QUERIES
───────────────────────────────────────
You MUST run searches across ALL 5 categories below.
DO NOT proceed to transcript extraction until search diversity is verified.
```

### The 5 Required Search Term Categories

**For EVERY product, build search terms across these 5 categories:**

| Category | What It Captures | Example Pattern |
|----------|------------------|-----------------|
| **1. DIRECT TERMS** | Obvious product/topic searches | "[product] tips", "[product] tutorial" |
| **2. PROBLEM TERMS** | How people describe their struggle | "can't stop [problem]", "[problem] ruining my game" |
| **3. SYMPTOM TERMS** | Specific manifestations they search | "fat shots", "thin chips", "skulling wedges" |
| **4. EMOTIONAL TERMS** | Frustration/desire searches | "[topic] frustrated", "finally fixed my [problem]" |
| **5. SOLUTION-SEEKING TERMS** | Active fix searches | "how to fix [problem]", "cure for [problem]", "stop [problem] forever" |

---

### Search Term Expansion Template

**Use this template for EVERY product. Fill in ALL cells.**

```
PRODUCT: [e.g., ONE.1 Wedge / Short Game Training]

CATEGORY 1: DIRECT TERMS (minimum 3)
────────────────────────────────────
□ "[product category] tips" → "golf chipping tips"
□ "[product category] tutorial" → "chipping tutorial"
□ "[product category] lesson" → "short game lesson"
□ "[product category] drill" → "chipping drills"

CATEGORY 2: PROBLEM TERMS (minimum 3)
─────────────────────────────────────
□ "can't stop [problem]" → "can't stop chunking chips"
□ "[problem] every time" → "fat chip shots every time"
□ "why do I [problem]" → "why do I chunk my chips"
□ "[problem] ruining my game" → "chipping ruining my round"

CATEGORY 3: SYMPTOM TERMS (minimum 3)
─────────────────────────────────────
□ "[specific symptom] golf" → "fat shots golf"
□ "[symptom variation]" → "thin chip shots"
□ "[symptom slang]" → "skulling wedges"
□ "[symptom + club]" → "chunking with sand wedge"

CATEGORY 4: EMOTIONAL TERMS (minimum 3)
───────────────────────────────────────
□ "[topic] frustrated" → "chipping frustrated"
□ "[topic] embarrassing" → "embarrassing short game"
□ "finally fixed [problem]" → "finally fixed my chipping"
□ "[topic] yips" → "chipping yips"
□ "I quit [topic]" → "I quit golf chipping"

CATEGORY 5: SOLUTION-SEEKING TERMS (minimum 3)
──────────────────────────────────────────────
□ "how to fix [problem]" → "how to fix chunking"
□ "cure [problem]" → "cure chipping yips"
□ "stop [problem] forever" → "stop fat chips forever"
□ "best drill for [problem]" → "best drill for chunking"
□ "[problem] quick fix" → "chunking quick fix"

TOTAL UNIQUE SEARCHES: [Must be 15+]
```

---

### Search Term Expansion Examples by Product Type

**WEDGE/SHORT GAME PRODUCTS:**

| Category | Search Terms |
|----------|--------------|
| **DIRECT** | "golf chipping tips", "pitching technique golf", "short game tutorial", "wedge lesson", "around the green tips" |
| **PROBLEM** | "can't stop chunking chips", "hitting behind the ball wedges", "fat chip shots", "blading wedges", "inconsistent chipping" |
| **SYMPTOM** | "fat shots golf", "thin chips", "skulling wedges", "duffing chips", "hitting it heavy", "catching it thin" |
| **EMOTIONAL** | "chipping yips", "short game embarrassing", "chipping frustration", "scared to chip", "finally fixed chipping" |
| **SOLUTION** | "how to stop chunking", "cure chipping yips", "fix fat chips", "never chunk again", "simple chipping method" |

**DRIVER/DISTANCE PRODUCTS:**

| Category | Search Terms |
|----------|--------------|
| **DIRECT** | "golf driver tips", "driver tutorial", "tee shot lesson", "driving range tips", "driver swing" |
| **PROBLEM** | "can't hit driver straight", "slicing driver every time", "hooking driver", "driver going right", "topping driver" |
| **SYMPTOM** | "golf slice", "banana ball driver", "push slice", "snap hook", "sky ball driver", "pop up driver" |
| **EMOTIONAL** | "driver frustration", "embarrassing tee shots", "driver yips", "scared to hit driver", "finally fixed slice" |
| **SOLUTION** | "how to fix slice", "cure driver slice", "stop slicing forever", "hit driver straighter", "add distance driver" |

**FULL SWING/GENERAL PRODUCTS:**

| Category | Search Terms |
|----------|--------------|
| **DIRECT** | "golf swing tips", "golf lesson", "swing tutorial", "golf improvement", "golf basics" |
| **PROBLEM** | "inconsistent golf swing", "can't repeat swing", "different shot every time", "no consistency golf" |
| **SYMPTOM** | "casting golf swing", "over the top", "early extension", "swaying golf", "chicken wing golf" |
| **EMOTIONAL** | "golf swing frustrated", "golf embarrassing", "almost quit golf", "hate my swing", "finally clicked golf" |
| **SOLUTION** | "fix golf swing", "simple swing thought", "one thing golf swing", "effortless golf swing", "consistent swing drill" |

---

### Cross-Reference with Agent 2 Language Database

**If Agent 2 has already extracted quotes, mine them for search terms:**

1. Pull top 20 highest-frequency phrases from Agent 2
2. Test each as a YouTube search query
3. Add any that return 10+ videos to your search list

**Example:** If Agent 2 found "tried everything" appears 47 times, search:
- "tried everything golf"
- "tried everything chipping"
- "golf tried everything still can't"

---

### Search Term Verification Gate

```
⛔ SEARCH TERM DIVERSITY CHECK (MANDATORY)
──────────────────────────────────────────
Before proceeding to transcript extraction, verify:

□ Minimum 15 unique search queries executed
□ All 5 categories represented (DIRECT, PROBLEM, SYMPTOM, EMOTIONAL, SOLUTION)
□ At least 3 searches per category
□ Queries include both "[topic] tips" AND "[problem] fix" patterns
□ At least 2 searches use emotional language (frustrated, embarrassing, yips)
□ If Agent 2 data exists: Top 5 high-frequency phrases tested as searches

If ANY check fails: ⛔ EXPAND SEARCH TERMS BEFORE PROCEEDING
```

---

## STEP 1: VIDEO DISCOVERY

**Actor:** `grow_media/youtube-search-api`

Find the most-viewed videos on your topic to identify what content resonates.

```javascript
// Find top golf instruction videos by view count
// Run this for EACH of your 15+ search terms
call-actor({
  actor: "grow_media/youtube-search-api",
  step: "call",
  input: {
    q: "golf chipping tips",  // Cycle through all 15+ terms
    maxResults: 100,          // Get top 100 videos per search
    order: "viewCount",       // CRITICAL: Sort by views to find what resonates
    videoDuration: "medium",  // 4-20 minutes (instruction content)
    regionCode: "US"
  }
})
```

### Search Query Execution Workflow

```
1. Execute ALL 15+ search queries from your expansion template
2. Collect top 100 videos per query (deduplicate across queries)
3. Rank combined results by view count
4. Select top 50-100 unique videos for transcript/comment mining
5. Document which search terms yielded highest-view content
```

### Sample Search Terms by Product Type

**For Wedge/Short Game Products (15+ required):**
```
DIRECT:        "golf chipping tips", "pitching technique", "short game tutorial"
PROBLEM:       "can't stop chunking", "fat chip shots", "hitting behind ball"
SYMPTOM:       "thin chips", "skulling wedges", "duffing chips"
EMOTIONAL:     "chipping yips", "chipping frustrated", "scared to chip"
SOLUTION:      "fix chunking", "cure chipping yips", "stop fat chips"
```

**For Driver/Distance Products (15+ required):**
```
DIRECT:        "golf driver tips", "driver tutorial", "tee shot lesson"
PROBLEM:       "slicing driver", "can't hit driver straight", "driver going right"
SYMPTOM:       "banana ball", "push slice", "snap hook driver"
EMOTIONAL:     "driver frustration", "tee shot yips", "embarrassing drives"
SOLUTION:      "fix slice driver", "stop slicing", "hit driver straighter"
```

**For General Instruction Products (15+ required):**
```
DIRECT:        "golf swing fix", "consistent golf swing", "golf improvement tips"
PROBLEM:       "inconsistent swing", "different shot every time", "can't repeat"
SYMPTOM:       "over the top golf", "casting swing", "early extension"
EMOTIONAL:     "golf frustrated", "almost quit golf", "finally clicked"
SOLUTION:      "simple swing fix", "one thing golf", "effortless swing"
```

### Output Fields to Capture

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

### Video Selection Criteria

**HIGH PRIORITY (Must Mine):**
- Views > 500,000
- Comments > 1,000
- From known golf channels (Rick Shiels, Me and My Golf, etc.)
- Published within last 2 years

**MEDIUM PRIORITY:**
- Views 100,000-500,000
- Comments 200-1,000
- Published within last 3 years

**Why View Count Matters:**
High views = high resonance. These videos struck a chord. The titles, promises, and mechanisms that got millions of views are PROVEN to attract attention.

---

## STEP 2: TRANSCRIPT EXTRACTION

**Actor:** `karamelo/youtube-transcripts`

Extract the full spoken content from top videos.

```javascript
// Extract transcripts from top videos
call-actor({
  actor: "karamelo/youtube-transcripts",
  step: "call",
  input: {
    urls: [
      "https://www.youtube.com/watch?v=VIDEO_ID_1",
      "https://www.youtube.com/watch?v=VIDEO_ID_2",
      // Add 20-50 video URLs from Step 1
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

### What to Extract from Transcripts

**1. MECHANISM LANGUAGE**
- What do instructors call their technique?
- "The hinge and hold method"
- "The bump and run technique"
- "The anti-chunk motion"

**2. PROMISE LANGUAGE**
- What do they promise viewers?
- "Never chunk another chip"
- "Add 30 yards to your drive"
- "Fix your slice in 5 minutes"

**3. PROBLEM ACKNOWLEDGMENT**
- How do they describe the viewer's pain?
- "I know you've been struggling with..."
- "If you're like most golfers..."
- "The frustration of hitting it fat..."

**4. AUTHORITY SIGNALS**
- How do they establish credibility?
- "I've taught thousands of students..."
- "Tour players use this exact technique..."
- "After 20 years of teaching..."

**5. OBJECTION HANDLING**
- What concerns do they preemptively address?
- "You might think this won't work for you..."
- "I know you've tried other methods..."
- "This works even if you're not flexible..."

### Transcript Analysis Template

For each transcript, extract:

```markdown
## [Video Title] - [View Count] views

### The Promise
[What does the instructor promise in the first 60 seconds?]

### The Mechanism
[What do they call their technique/method?]

### Pain Points Acknowledged
[What problems do they say this solves?]

### Key Phrases (copy-worthy)
- "[Exact phrase 1]"
- "[Exact phrase 2]"
- "[Exact phrase 3]"

### Objections Addressed
[What doubts do they preemptively handle?]
```

---

## STEP 3: COMMENT EXTRACTION

**Actor:** `streamers/youtube-comments-scraper`

Extract viewer reactions, questions, and testimonials.

```javascript
// Extract comments from high-performing videos
call-actor({
  actor: "streamers/youtube-comments-scraper",
  step: "call",
  input: {
    startUrls: [
      { "url": "https://www.youtube.com/watch?v=VIDEO_ID_1" },
      { "url": "https://www.youtube.com/watch?v=VIDEO_ID_2" }
      // Add 10-20 video URLs
    ],
    maxComments: 500,           // MINIMUM 500 per video
    commentsSortBy: "1"         // Sort by relevance (most engaged)
  }
})
```

### Comment Types to Flag

**HIGH SQS (8-10) - Personal Stories:**
```
- "I've been struggling with this for 3 years and finally..."
- "Tried this at the range yesterday and immediately..."
- "This is exactly what my instructor told me but..."
- Comments with specific numbers (years, lessons, money spent)
- Comments with emotional language (frustrated, embarrassed, finally)
```

**MEDIUM SQS (5-7) - Reactions:**
```
- "This makes so much sense"
- "Why didn't anyone tell me this before?"
- "Simple but effective"
- "Game changer"
```

**LOW SQS (1-4) - Skip:**
```
- "Great video!" (no substance)
- Spam/promotional comments
- Comments under 10 words
```

### Comment Mining Patterns

**BEFORE/AFTER Language:**
```regex
Pattern: "before.*after|used to.*now|finally|breakthrough"
Signal: Transformation stories - highest value for testimonials
```

**FRUSTRATION Language:**
```regex
Pattern: "years|tried everything|frustrated|embarrassed|quit"
Signal: Pain language for agitation copy
```

**SKEPTICISM Language:**
```regex
Pattern: "thought.*wouldn't|didn't believe|skeptical|but"
Signal: Objection patterns to address
```

**SUCCESS Language:**
```regex
Pattern: "worked|fixed|solved|cured|finally|helped"
Signal: What promises resonate
```

---

## COMPLETE WORKFLOW

### Phase 1: Discovery (Agent 1 Enhancement)

```
1. Build search term expansion template (ALL 5 CATEGORIES)
2. Execute 15+ search queries via youtube-search-api
3. Collect top 100 videos per search term
4. Deduplicate and rank combined results by view count
5. Select top 50-100 unique videos for deep mining
6. Document search terms used and which yielded best results
7. Document in sources map with URLs
```

### Phase 2: Content Mining (Agent 2 Enhancement)

```
1. Run youtube-transcripts on top 30 videos
2. Analyze transcripts for mechanism/promise language
3. Run youtube-comments-scraper on top 20 videos
4. Extract 500+ comments per video (10,000+ total)
5. Apply SQS scoring to all comments
6. Add high-SQS comments to verbatim quotes database
```

### Phase 3: Synthesis (Agent 8 Enhancement)

```
1. Identify winning mechanisms from transcripts
2. Map promise language that drives views
3. Cross-reference comment reactions to promises
4. Identify gaps between promises and complaints
5. Document competitor positioning from transcripts
```

---

## MANDATORY DEPTH REQUIREMENTS

```
⛔ SEARCH TERM EXPANSION (MUST COMPLETE FIRST)
──────────────────────────────────────────────
□ 15+ unique search queries built
□ All 5 categories covered (DIRECT, PROBLEM, SYMPTOM, EMOTIONAL, SOLUTION)
□ At least 3 searches per category
□ Emotional language searches included (frustrated, yips, embarrassing)
□ Search term template documented in output

⛔ YOUTUBE MINING MINIMUMS (DO NOT PROCEED IF ANY FAIL)
──────────────────────────────────────────────────────
□ 15+ search queries executed (from expansion template)
□ 100+ unique videos discovered across all searches
□ 30+ transcripts extracted
□ 10,000+ comments scraped
□ 50+ high-SQS (8-10) comments from YouTube
□ Top 5 channels documented with positioning
□ Top 10 "winning" videos analyzed (1M+ views)
□ Which search terms yielded highest-view content documented

If ANY of the above fail: ⛔ EXPAND TERMS / MINE DEEPER
```

---

## INTEGRATION WITH EXISTING AGENTS

### Agent 1 (Scout) Addition

Add to source categories:
```markdown
### YouTube Deep Mining (MANDATORY)

#### Search Term Expansion (15+ required)
| Category | Search Terms Used |
|----------|-------------------|
| DIRECT | [term 1], [term 2], [term 3] |
| PROBLEM | [term 4], [term 5], [term 6] |
| SYMPTOM | [term 7], [term 8], [term 9] |
| EMOTIONAL | [term 10], [term 11], [term 12] |
| SOLUTION | [term 13], [term 14], [term 15] |

#### Search Results by Term
| Search Term | Videos Found | Top Channel | Top Video Views |
|-------------|--------------|-------------|-----------------|
| [term 1] | 100 | [channel] | [views] |
| [term 2] | 100 | [channel] | [views] |
| ... | ... | ... | ... |

**Highest-Yield Search Terms:** [Which terms found the most-viewed content]
**Videos Selected for Transcript Mining:** [List of 30 URLs]
**Videos Selected for Comment Mining:** [List of 20 URLs]
```

### Agent 2 (Language) Addition

Add to quote sources:
```markdown
### YouTube Comments (SQS-rated)

| Quote ID | Verbatim | SQS | Video Source | Likes |
|----------|----------|-----|--------------|-------|
| yt-001 | "[quote]" | 9 | [video title] | 234 |
```

### Agent 6 (Competitive) Addition

Add to competitor analysis:
```markdown
### YouTube Competitor Positioning

| Channel | Subscribers | Top Video | Promise | Mechanism |
|---------|-------------|-----------|---------|-----------|
| Rick Shiels | 2.5M | "[title]" | "[promise]" | "[mechanism]" |
```

---

## COST ESTIMATES (INFORMATIONAL ONLY)

**DO NOT let these influence mining depth.**

| Step | Volume | Est. Cost |
|------|--------|-----------|
| Video Search | 500 videos | ~$0.50 |
| Transcript Extraction | 30 videos | ~$0.21 |
| Comment Extraction | 10,000 comments | ~$4-24 |
| **Total per project** | | **~$5-25** |

This is negligible compared to the value of the insights.

---

## YOUTUBE-SPECIFIC SQS MODIFIERS

**Boost SQS by +1 for:**
- Comments with 50+ likes (social proof of resonance)
- Comments with replies (sparked discussion)
- Comments from verified accounts
- Comments with specific numbers

**Reduce SQS by -1 for:**
- Comments under 20 words
- Comments that are just emoji
- Comments that are clearly promotional
- Comments in non-English (unless targeting that market)

---

## RELATED DOCUMENTATION

- **Agent 1:** See [AGENT-1-SCOUT.md](AGENT-1-SCOUT.md)
- **Agent 2:** See [AGENT-2-LANGUAGE.md](AGENT-2-LANGUAGE.md)
- **Apify Integration:** See [APIFY-INTEGRATION.md](APIFY-INTEGRATION.md)
- **SQS Scoring:** See [AGENT-2-LANGUAGE.md](AGENT-2-LANGUAGE.md#signal-quality-scoring-sqs)

---

*YouTube Deep Mining Integration v1.1 — Search Term Expansion Edition*
*"The market is telling you what it wants. You just have to listen."*
*Last Updated: January 2025*
