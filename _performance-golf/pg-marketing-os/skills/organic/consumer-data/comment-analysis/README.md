# Comment Analysis — Engagement Pattern Mining

## Purpose
Analyze comments on high-performing content (ours and competitors) to understand what drives engagement, what language resonates, and what topics generate conversation.

## Data Sources
1. **Own content comments** — After publishing, capture comment themes
2. **Competitor comments** — Top comments on competitor viral posts
3. **Specimen comments** — Comments on specimen content from our collection

## Analysis Framework

### Comment Taxonomy
| Type | Signal | Value |
|------|--------|-------|
| Agreement/Validation | Resonance | Content hit a nerve |
| Personal Story | Deep engagement | Triggered self-reflection |
| Tag/Share | Distribution | Shareworthy content |
| Question | Curiosity | Topic needs expansion |
| Disagreement | Controversy | Hot take potential |
| Save/Bookmark intent | Utility | Reference-worthy |
| "How do I..." | Conversion intent | Lead potential |

### File Format
```json
{
  "source_post": {
    "platform": "instagram",
    "url": "...",
    "creator": "...",
    "engagement": {"likes": 0, "comments": 0}
  },
  "analysis_date": "2026-03-04",
  "comment_count_analyzed": 100,
  "comment_themes": [
    {
      "theme": "...",
      "frequency": 0,
      "example_comments": ["..."],
      "sentiment": "positive|negative|neutral",
      "engagement_signal": "..."
    }
  ],
  "language_patterns": {
    "most_used_words": ["..."],
    "emotional_words": ["..."],
    "questions_asked": ["..."],
    "objections_raised": ["..."]
  },
  "content_insights": {
    "what_resonated": "...",
    "what_missed": "...",
    "follow_up_content_ideas": ["..."]
  }
}
```

### Naming Convention
`{platform}_{creator}_{date}_{topic}.json`

## Teaching Alignment
- Baer Talk Triggers → Which comments indicate word-of-mouth potential
- Berger STEPPS → Which emotional triggers drove sharing comments
- Flynn Superfans → Which comments indicate superfan behavior
- Eyal Hook Model → Which comments show habit formation

## Usage
Feed analysis into:
- S19: Performance Analysis → Comment quality as engagement metric
- S20: Learning Capture → What comment patterns predict virality
- S04: Content Architecture → Topic selection based on comment demand
