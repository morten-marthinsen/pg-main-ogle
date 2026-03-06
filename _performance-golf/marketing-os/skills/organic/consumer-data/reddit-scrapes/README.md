# Reddit Scrapes — Consumer Language Mining

## Purpose
Mine authentic consumer language from relevant subreddits to feed S01 (Audience Intelligence) and ensure all content uses real audience vocabulary, not marketing-speak.

## Target Subreddits
Populate based on brand/niche. Examples for common verticals:

### Creator Economy / Marketing
- r/Entrepreneur
- r/socialmedia
- r/content_marketing
- r/smallbusiness
- r/marketing
- r/juststart
- r/SideProject

### Personal Development
- r/selfimprovement
- r/getdisciplined
- r/productivity
- r/DecidingToBeBetter

### AI / Technology
- r/artificial
- r/ChatGPT
- r/LocalLLaMA
- r/singularity

## Data Collection Protocol

### What to Capture
1. **Pain language** — How people describe their problems (exact words)
2. **Desire language** — How they describe what they want
3. **Objections** — Why they haven't solved it yet
4. **Tribal markers** — Insider terms, slang, references
5. **Emotional temperature** — Frustration level, urgency, hope

### File Format
```json
{
  "subreddit": "r/Entrepreneur",
  "scrape_date": "2026-03-04",
  "post_count": 50,
  "comment_count": 500,
  "language_patterns": {
    "pain_phrases": ["..."],
    "desire_phrases": ["..."],
    "objection_phrases": ["..."],
    "tribal_markers": ["..."],
    "emotional_themes": ["..."]
  },
  "high_engagement_posts": [
    {
      "title": "...",
      "upvotes": 0,
      "comments": 0,
      "key_language": ["..."]
    }
  ]
}
```

### Naming Convention
`{subreddit}_{date}_{focus}.json`
Example: `entrepreneur_2026-03-04_pain-language.json`

## Teaching Alignment
- Schwartz awareness levels → Map language to awareness stages
- Godin permission marketing → Identify what audience gives permission to discuss
- Cialdini influence → Identify social proof patterns in comments

## Usage
Feed scraped language directly into:
- S01: Audience Intelligence → `language_mining` section
- S05: Hook Library → Use exact phrases as hook starters
- S09: Caption Writing → Mirror audience vocabulary
