# Search Intent Data — Content Demand Mapping

## Purpose
Capture what your target audience is actively searching for to align content production with proven demand. Search intent = content ideas with built-in audience.

## Data Sources
1. **Google Trends** — Trending topics, seasonal patterns
2. **YouTube Search Suggest** — Video content demand
3. **TikTok Search** — Short-form content demand
4. **Reddit search** — Community discussion demand
5. **AnswerThePublic / AlsoAsked** — Question clusters
6. **Google Search Console** — What people find you for

## Intent Classification

### Search Intent Types
| Intent | Signal | Content Type |
|--------|--------|-------------|
| Informational | "how to", "what is", "guide" | Educational content |
| Navigational | Brand names, specific topics | Authority content |
| Commercial | "best", "review", "vs" | Comparison content |
| Transactional | "buy", "download", "sign up" | Conversion content |

### Schwartz Awareness Mapping
| Search Pattern | Awareness Level | Content Strategy |
|----------------|----------------|-----------------|
| Problem-describing searches | Problem Aware | Agitate + educate |
| Solution-seeking searches | Solution Aware | Position your approach |
| Brand/product searches | Product Aware | Social proof + demos |
| Comparison searches | Most Aware | Close the deal |

## File Format
```json
{
  "data_source": "google_trends|youtube_suggest|tiktok_search|reddit",
  "collection_date": "2026-03-04",
  "niche": "...",
  "keywords": [
    {
      "keyword": "...",
      "search_volume": 0,
      "trend": "rising|stable|declining",
      "intent": "informational|navigational|commercial|transactional",
      "awareness_level": "unaware|problem|solution|product|most",
      "content_ideas": ["..."],
      "competition": "low|medium|high"
    }
  ],
  "question_clusters": [
    {
      "seed": "...",
      "questions": ["..."],
      "content_opportunity": "..."
    }
  ],
  "seasonal_patterns": {
    "peak_months": ["..."],
    "low_months": ["..."],
    "upcoming_trends": ["..."]
  }
}
```

### Naming Convention
`{source}_{niche}_{date}.json`
Example: `youtube-suggest_ai-tools_2026-03-04.json`

## Teaching Alignment
- Schwartz awareness levels → Map keywords to awareness stages
- Brunson Traffic Secrets → Search as "traffic you don't control" → convert to owned
- Pulizzi Content Inc → Content tilt discovery through search gaps
- Holiday Perennial Seller → Evergreen vs trending keyword balance

## Usage
Feed data into:
- S04: Content Architecture → Topic selection and pillar validation
- S05: Hook Library → Search phrases as hook starters
- S07: Campaign Brief → Data-backed content calendar
- S15: Scheduling Choreography → Seasonal timing optimization
