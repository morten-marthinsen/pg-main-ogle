# Firecrawl Integration for PG Research Agents
## Enhanced Data Collection via MCP

**Version:** 2.0 — Validated with Live Testing
**Last Updated:** January 2025

---

## Overview

This document outlines how to leverage Firecrawl MCP tools to dramatically accelerate and improve data collection for the 10-agent research pipeline.

**Key Benefits:**
- **Agent 2 time reduction:** 6-8 hours → 1-2 hours for quote extraction
- **Structured data extraction:** Verbatim quotes with automatic categorization
- **Competitor intelligence:** Exact headlines, copy, pricing, and branding elements
- **Autonomous research:** Complex queries handled by Firecrawl's AI agent with citations

---

## CRITICAL: Platform Availability

Based on live testing (January 2025):

| Platform | Status | Notes |
|----------|--------|-------|
| **GolfWRX Forums** | ✅ WORKS | Full thread scraping with all comments |
| **TheSandTrap** | ✅ WORKS | Full forum access |
| **Competitor Sites** | ✅ WORKS | Full scraping with branding data |
| **Reddit** | ❌ BLOCKED | Enterprise restriction — use search only |
| **TikTok/Instagram** | ❌ BLOCKED | Use manual observation |
| **YouTube** | ⚠️ LIMITED | Page content works, comments may require wait |

**Workaround for Reddit:** Use `firecrawl_search` to find Reddit thread URLs and metadata, then reference threads manually or use Reddit discussions that get cross-posted to forums.

---

## Firecrawl Tools Reference

| Tool | Best Use Case | Speed |
|------|---------------|-------|
| `firecrawl_search` | Find content across the web, discover threads | 2-5 sec |
| `firecrawl_scrape` | Extract full page content + branding | 3-8 sec |
| `firecrawl_map` | Discover all URLs on a domain | 5-10 sec |
| `firecrawl_extract` | Pull structured data with schema | 5-15 sec |
| `firecrawl_agent` | Autonomous multi-source research | 15-45 sec |

---

## Agent-by-Agent Integration

### AGENT 1: Market Intelligence Scout

**Tools:** `firecrawl_search` + `firecrawl_map`

#### Step 1: Discover Forum Structure
```javascript
// Map GolfWRX forum sections
firecrawl_map({
  url: "https://forums.golfwrx.com",
  limit: 200,
  search: "instruction"
})

// Map TheSandTrap
firecrawl_map({
  url: "https://thesandtrap.com/forums",
  limit: 200
})
```

#### Step 2: Find High-Value Discussion Threads
```javascript
// Search for frustration/pain language
firecrawl_search({
  query: "golf improvement frustrated \"tried everything\" site:golfwrx.com",
  limit: 10,
  scrapeOptions: {
    formats: ["markdown"],
    onlyMainContent: true
  }
})

// Search for breakthrough language
firecrawl_search({
  query: "\"finally figured out\" golf swing site:golfwrx.com",
  limit: 10,
  scrapeOptions: {
    formats: ["markdown"],
    onlyMainContent: true
  }
})

// Find Reddit thread references (URLs only — don't scrape)
firecrawl_search({
  query: "golf improvement frustrated site:reddit.com/r/golf",
  limit: 20
})
```

#### Step 3: Competitor Discovery
```javascript
firecrawl_search({
  query: "online golf instruction subscription course",
  limit: 20
})
```

**Output:** `agent-outputs/01-sources-map.md` with verified URLs and content previews.

---

### AGENT 1B: Demographic Profiler

**Tool:** `firecrawl_agent` (autonomous research)

This is the **fastest win**. The autonomous agent compiles demographics in ~15 seconds with full citations.

#### Validated Prompt (Tested January 2025)
```javascript
firecrawl_agent({
  prompt: `Find the latest US golf participation statistics from 2024-2025. I need:
    1. Total number of US golfers (on-course and off-course)
    2. Age distribution breakdown by percentage
    3. Gender breakdown
    4. Average household income of golfers
    5. Year-over-year participation trends

    Look for data from National Golf Foundation, Golf Datatech, USGA, or similar industry sources.
    Provide specific numbers with source citations.`
})
```

#### Sample Output (Actual Results from Testing)
```
Total US Golfers: 47.2 million (2024)
On-Course Golfers: 28.1 million (highest since 2008)
Average Age: 43.5 years (down from 44.6 in 2018-2019)
Female Golfers: 28% on-course (all-time high)
18-34 Age Group: 6.8 million (largest segment)
Average HH Income: $103,000+
Rounds Played 2024: 545 million (record)
YoY Growth: +5% from 2023, +38% from 2019

Sources: National Golf Foundation, USGA, Keiser University College of Golf
```

---

### AGENT 1C: TAM Analyst

**Tool:** `firecrawl_agent`

#### TAM Research Prompt
```javascript
firecrawl_agent({
  prompt: `Research the golf instruction and improvement market size for 2024-2025:
    1. Total golf instruction market size (in-person lessons, online courses, apps, training aids)
    2. Online golf instruction market specifically
    3. Golf app/subscription market size
    4. Training aids market size
    5. Growth rates (CAGR) for each segment
    6. Major players and estimated market share
    7. Pricing benchmarks across categories

    Look for IBISWorld, Statista, Golf Datatech, and industry reports.
    Include specific dollar figures with sources.`
})
```

---

### AGENT 2: Language Archaeologist (BIGGEST WIN)

**Tools:** `firecrawl_search` + `firecrawl_scrape`

This is where Firecrawl delivers the most value. Instead of 6-8 hours manually reading threads, extract hundreds of quotes in under an hour.

#### Step 1: Search-Based Quote Mining
```javascript
// Pain language
firecrawl_search({
  query: `"tried everything" golf improvement site:golfwrx.com`,
  limit: 15,
  scrapeOptions: {
    formats: ["markdown"],
    onlyMainContent: true
  }
})

firecrawl_search({
  query: `"so frustrated" OR "embarrassing" golf site:golfwrx.com`,
  limit: 15,
  scrapeOptions: {
    formats: ["markdown"],
    onlyMainContent: true
  }
})

// Desire language
firecrawl_search({
  query: `"finally broke 80" OR "finally broke 90" golf`,
  limit: 15,
  scrapeOptions: {
    formats: ["markdown"],
    onlyMainContent: true
  }
})

// Frustration language
firecrawl_search({
  query: `"YouTube ruined" OR "too many tips" golf swing`,
  limit: 15,
  scrapeOptions: {
    formats: ["markdown"],
    onlyMainContent: true
  }
})

// Skepticism language
firecrawl_search({
  query: `"waste of money" golf lessons site:golfwrx.com`,
  limit: 15,
  scrapeOptions: {
    formats: ["markdown"],
    onlyMainContent: true
  }
})
```

#### Step 2: Direct Forum Thread Scraping
```javascript
// Scrape specific high-value threads discovered in searches
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
```

#### Sample Verbatim Quotes Extracted (Actual Results)

| Quote | Category | Source |
|-------|----------|--------|
| *"i recently went through this....its frustrating and embarassing at the same time"* | Emotional Pain | GolfWRX Shanks Thread |
| *"Things have gotten rather bleak this season and I'm considering quitting golf altogether. I don't know how to enjoy the game anymore."* | Emotional Pain | GolfWRX "I want to quit" |
| *"I took a lesson, and what the pro said was I was 'dragging the handle through the shot'"* | Method Frustration | GolfWRX Shanks Thread |
| *"There is about an 87% chance you'll pick up a terminal mechanical mind virus that destroys your love of the game entirely."* | Skepticism | GolfWRX Swing Overhaul |
| *"Golf takes allot from you and gives very very very little."* | Emotional Pain | GolfWRX "I want to quit" |

---

### AGENT 6: Competitive Intelligence Officer

**Tool:** `firecrawl_scrape` with `branding` format

#### Comprehensive Competitor Scraping
```javascript
// Me and My Golf — VALIDATED
firecrawl_scrape({
  url: "https://meandmygolf.com",
  formats: ["markdown", "branding"]
})

// Other competitors
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
```

#### Sample Branding Output (Actual Results — Me and My Golf)

```yaml
Colors:
  Primary: "#F2633D" (orange)
  Accent: "#022147" (dark navy)
  Background: "#FAFAFA"
  Text: "#022147"

Typography:
  Primary Font: "Museo Sans"
  Heading Font: "Specter"
  Body Size: 18px

Pricing Captured:
  Core Monthly: $27/month
  Core Annual: $199/year ($16.58/mo)
  VIP Monthly: $138.75/month
  VIP Annual: $999/year ($83.25/mo)

Key Headlines:
  - "play consistent, enjoyable golf"
  - "Online golf coaching that just works"
  - "real people, real results"

Social Proof:
  - "4.6 out of 5 based on 544 reviews" (Trustpilot)
  - "1,000,000 golfers around the world"

Testimonials:
  - "I learned more in two days, working with Andy and Piers, than I did in the last year of golf."
  - "I took 9 lessons last year and got nowhere. I made more progress with the one swing analysis you gave me."
  - "The best decision I've made in the 20 years I've played golf."
```

---

### AGENTS 3, 4, 5, 7, 8: Analysis Agents

These agents primarily **analyze** data rather than collect it. They benefit from:
- Higher quality input data from Firecrawl-enhanced Agents 1, 2, and 6
- Structured quote databases that are easier to process
- More comprehensive competitive intelligence
- Pre-categorized emotional language

No Firecrawl tools needed for these agents — they work with the enhanced outputs from earlier agents.

---

## Execution Workflow with Firecrawl

### Phase 1: Discovery & Demographics (2-3 hours)
```
1. firecrawl_agent → Autonomous demographics research (Agent 1B)
2. firecrawl_agent → Autonomous TAM research (Agent 1C)
3. firecrawl_map → Map forum structures
4. firecrawl_search → Find high-value threads
5. firecrawl_search → Discover competitors
```

### Phase 2: Quote Extraction (2-3 hours)
```
1. firecrawl_search → Pain language mining (5 queries)
2. firecrawl_search → Desire language mining (5 queries)
3. firecrawl_search → Frustration language mining (5 queries)
4. firecrawl_search → Skepticism/breakthrough mining (5 queries)
5. firecrawl_scrape → Direct scrape of top 20 forum threads
6. Compile and categorize all quotes
```

### Phase 3: Competitive Intel (1-2 hours)
```
1. firecrawl_scrape → All competitor homepages with branding
2. firecrawl_scrape → Competitor pricing pages
3. Compile competitive matrix
```

### Phase 4: Analysis (6-8 hours)
```
Run Agents 3-8 with enhanced data from Firecrawl collection
```

---

## Updated Time Estimates

| Agent | Original | With Firecrawl | Savings |
|-------|----------|----------------|---------|
| Agent 1 | 2-3 hrs | 30-45 min | 75% |
| Agent 1B | 2-3 hrs | **15-20 min** | **90%** |
| Agent 1C | 2-3 hrs | **15-20 min** | **90%** |
| Agent 2 | 6-8 hrs | 1.5-2.5 hrs | 70% |
| Agent 6 | 3-4 hrs | 45-60 min | 80% |
| Agents 3-5, 7-8 | 10-14 hrs | 8-10 hrs | 25% |
| **TOTAL** | **26-36 hrs** | **11-15 hrs** | **~55%** |

---

## Firecrawl Query Templates

### Pain Language Queries
```
"tried everything" golf improvement site:golfwrx.com
"so frustrated" golf swing site:golfwrx.com
"embarrassing" OR "embarrassed" golf site:golfwrx.com
"want to quit" golf site:golfwrx.com
"can't improve" golf lessons
"waste of money" golf instruction
"years of lessons" no improvement golf
```

### Desire Language Queries
```
"finally broke 80" OR "finally broke 90" golf
"finally figured out" golf swing
"clicked" golf swing breakthrough
"consistent golf" finally
"enjoying golf again"
```

### Frustration Language Queries
```
"YouTube ruined" golf swing
"too many tips" golf confusing
"information overload" golf instruction
"conflicting advice" golf
"lessons didn't help" golf
```

### Skepticism Language Queries
```
"gurus just want" golf money
"online instruction" worth it golf
"another golf tip" doesn't work
"magic fix" golf skeptical
```

---

## Quality Assurance for Firecrawl Outputs

### Gate 2 Additions for Firecrawl
```
□ All Firecrawl extractions capture VERBATIM text (verify no AI paraphrasing)
□ Source URLs documented for each quote
□ Manual spot-check: 10 random quotes verified against source page
□ Quotes from multiple platforms represented (not just one forum)
□ 20+ high-frequency phrases identified from extracted content
```

### Gate 6 Additions for Firecrawl
```
□ Branding data captured for all 5+ competitors
□ Exact pricing verified against live sites
□ Headlines captured verbatim (not summarized)
□ Voice characteristics noted from actual copy
```

---

## Troubleshooting

### "Website not currently supported" Error
- Reddit direct scraping is blocked. Use `firecrawl_search` for discovery only.
- Some sites require enterprise access. Check with Firecrawl support.

### Results Too Large
- Add `onlyMainContent: true` to scrape options
- Use `limit` parameter to reduce number of results
- Process in batches of 5-10 threads

### Missing Comments on Forums
- Some forums load comments dynamically
- Try adding `waitFor: 3000` to allow JavaScript loading
- Scrape individual thread pages, not listing pages

---

## Integration Checklist

- [x] Validated Firecrawl works with GolfWRX forums
- [x] Validated firecrawl_agent for demographics (NGF data)
- [x] Validated competitor scraping with branding format
- [x] Documented Reddit blocking workaround
- [ ] Test all competitor URLs before full run
- [ ] Create saved query templates file
- [ ] Train team on Firecrawl execution

---

*Firecrawl Integration v2.0 — Validated January 2025*
