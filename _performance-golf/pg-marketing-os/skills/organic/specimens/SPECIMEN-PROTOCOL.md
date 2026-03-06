# CLAUDE-SPECIMENS.md — SPECIMEN LOADING SYSTEM
## Dual-System Specimen Architecture for OrganicMarketingEngine
## Version 1.0 — March 2026

---

## WHAT SPECIMENS ARE

Specimens are curated examples of WHAT GREAT LOOKS LIKE. They are not templates to copy — they are patterns to understand.

**The Specimen Hierarchy:**
1. **Platform Specimens:** Viral content organized by platform
2. **Format Specimens:** Content organized by format type
3. **Function Specimens:** Content organized by strategic purpose
4. **Hook Specimens:** Opening patterns that capture attention
5. **Persona Specimens:** Content that exemplifies each Arena persona

---

## SPECIMEN LOADING PROTOCOL

### Mandatory Specimen Loading by Skill

| Skill | Required Specimens |
|-------|-------------------|
| S01: Audience Intelligence | Growth trajectory case studies (5+) |
| S02: Platform Strategy | Platform-specific viral content (5+ per platform) |
| S03: Brand Voice | Voice specimens from similar-positioned brands (3+) |
| S04: Content Architecture | Series/pillar structure examples (3+) |
| S05: Hook Library | All hooks from `specimens/hooks/` |
| S06: Virality Scoring | High-score specimens for calibration (10+) |
| S08: Script Writing | Platform-specific script specimens (5+) |
| S09: Caption Writing | High-engagement captions (10+) |
| S10: Carousel Design | High-save carousels (5+) |
| S11: Thread Writing | Viral threads (5+) |
| S12: Visual Direction | High-CTR thumbnails (10+) |
| S13: Arena Generation | Persona-specific specimens (2+ per persona) |
| S14: Content Assembly | Fully produced content examples (3+) |

### Loading Commands

```
/specimens platform:instagram format:reels count:5
/specimens function:awareness count:10
/specimens hooks type:curiosity-gap count:5
/specimens persona:value-architect count:3
```

---

## SPECIMEN DECONSTRUCTION PROTOCOL

Every specimen must be analyzed, not just viewed. Use this framework:

### Deconstruction Template
```yaml
specimen_id: [unique identifier]
source_url: [original source]
platform: [where it was posted]
creator: [who made it]
date_captured: [when we captured it]
performance_data:
  views: [if known]
  likes: [if known]
  comments: [if known]
  shares: [if known]
  saves: [if known]

# STRUCTURAL ANALYSIS
format:
  type: [talking-head, text-overlay, etc.]
  length: [seconds or slides]
  pacing: [slow/medium/fast]

hook:
  type: [from hook taxonomy]
  first_words: [exact opening text]
  visual_hook: [what the eye sees first]
  time_to_value: [seconds before value delivered]

structure:
  opening: [what happens in first 3 seconds]
  body: [main content structure]
  cta: [call to action type]

# PSYCHOLOGICAL ANALYSIS
emotion_triggered:
  primary: [main emotion]
  secondary: [supporting emotion]
  arousal_level: [high/medium/low]

social_currency:
  makes_sharer_look: [smart/generous/connected/etc.]
  identity_signal: [what sharing this says about you]

pattern_interrupt:
  what_stops_scroll: [specific element]
  unexpected_element: [what defies expectations]

# VIRALITY SCORE
ea_score: [1-10]
sc_score: [1-10]
pi_score: [1-10]
pf_score: [1-10]
sh_score: [1-10]
total_score: [calculated]

# LEARNING EXTRACTION
why_this_works: |
  [Paragraph explanation of core insight]

what_to_steal: |
  [Specific elements that can be adapted]

what_to_avoid: |
  [Elements that wouldn't translate]

tags: [searchable tags]
```

---

## SPECIMEN CATEGORIES

### By Platform

#### Instagram (`specimens/by-platform/instagram/`)
- **reels-viral/**: Short-form video specimens (50+ target)
- **carousels-high-save/**: High-save rate carousels (30+ target)
- **stories-engagement/**: High-engagement story sequences (20+ target)
- **growth-trajectories/**: Account growth case studies (10+ target)

#### TikTok (`specimens/by-platform/tiktok/`)
- **viral-formats/**: Format patterns that consistently perform (50+ target)
- **series-hooks/**: Recurring series that built audiences (20+ target)
- **growth-trajectories/**: Account growth case studies (10+ target)

#### YouTube (`specimens/by-platform/youtube/`)
- **thumbnails-high-ctr/**: Thumbnail patterns that drive clicks (30+ target)
- **titles-high-ctr/**: Title formulas that drive clicks (50+ target)
- **intro-hooks/**: First-30-second patterns that retain (30+ target)
- **growth-trajectories/**: Channel growth case studies (10+ target)

#### LinkedIn (`specimens/by-platform/linkedin/`)
- **viral-posts/**: High-engagement post patterns (30+ target)
- **growth-trajectories/**: Account growth case studies (5+ target)

#### X/Twitter (`specimens/by-platform/x-twitter/`)
- **viral-threads/**: Thread structures that spread (30+ target)
- **growth-trajectories/**: Account growth case studies (5+ target)

---

### By Format (`specimens/by-format/`)

| Format | Description | Key Specimens |
|--------|-------------|---------------|
| talking-head/ | Face-to-camera content | Scripts, energy levels, framing |
| text-overlay/ | Text on video/image | Font, placement, pacing |
| split-screen/ | Reaction, duet, commentary | Format structures |
| carousel/ | Multi-slide content | Slide design, flow, CTA placement |
| long-form-video/ | 8+ minute content | Retention structures, chapter patterns |
| live-stream/ | Real-time content | Engagement tactics, Q&A flow |
| ugc-style/ | User-generated aesthetic | Authentic production patterns |

---

### By Function (`specimens/by-function/`)

| Function | Purpose | Specimen Focus |
|----------|---------|----------------|
| awareness/ | Reach new audiences | Maximum shareability, trend-riding |
| engagement/ | Drive comments/saves/shares | Discussion triggers, save-worthy value |
| conversion/ | Drive action | CTAs, urgency, value stacking |
| community/ | Build belonging | Inside references, participation |

---

### Hook Library (`specimens/hooks/`)

**Core Files:**
- `hook-taxonomy.json`: Master taxonomy of 30+ hook types
- `hooks-by-emotion.json`: Hooks organized by emotional trigger
- `hooks-by-platform.json`: Platform-native hook formats
- `hooks-proven-performers.json`: Top 100 hooks with performance data

**Hook Type Categories:**

1. **Curiosity Gap Hooks**
   - Open loop that must be closed
   - "The reason most people fail at X is..."

2. **Controversy Hooks**
   - Challenges belief or creates tension
   - "Unpopular opinion: X is actually..."

3. **Secret/Insider Hooks**
   - Promises exclusive information
   - "What no one tells you about..."

4. **Story Hooks**
   - Begins a narrative
   - "I was about to quit when..."

5. **Shock/Surprise Hooks**
   - Defies expectations immediately
   - "[Extreme claim that demands attention]"

6. **Question Hooks**
   - Engages viewer in answering
   - "Have you ever wondered why...?"

7. **Pain Point Hooks**
   - Addresses known struggle
   - "If you're struggling with X..."

8. **Transformation Hooks**
   - Shows before/after
   - "30 days ago I couldn't... now..."

9. **Authority Hooks**
   - Establishes credibility fast
   - "After [credential], I learned..."

10. **Timeliness Hooks**
    - Creates urgency
    - "Right now, there's a window for..."

---

## SPECIMEN CURATION PROTOCOL

### Who Curates
The client provides the TASTE. They identify what "great" looks like. The engine deconstructs and catalogs.

### Curation Workflow
1. The client encounters great content
2. The client saves/screenshots/copies URL
3. The client drops into `specimens/_incoming/`
4. Engine runs deconstruction protocol
5. Engine files into correct category
6. Engine updates specimen index

### Quality Bar
Not everything is a specimen. Specimens must:
- Demonstrate clearly superior performance
- Contain learnable, transferable patterns
- Represent current (not outdated) best practices
- Be deconstructable — we can explain WHY it works

### Specimen Freshness
Specimens decay in relevance. Platform algorithms change. What worked in 2024 may not work in 2026.

**Freshness Protocol:**
- Review specimens quarterly
- Mark specimens with capture date
- Prioritize recent specimens (last 6 months)
- Archive (don't delete) outdated specimens

---

## SPECIMEN SEARCH

### Search Parameters
```
platform: [instagram|tiktok|youtube|linkedin|x-twitter]
format: [talking-head|text-overlay|split-screen|carousel|long-form|live|ugc]
function: [awareness|engagement|conversion|community]
hook_type: [from taxonomy]
emotion: [awe|anger|surprise|inspiration|fear|joy|curiosity]
virality_score_min: [0-100]
persona: [volume-machine|value-architect|virality-engineer|community-builder|brand-purist|algorithm-hacker|storyteller]
tags: [any tags]
date_after: [YYYY-MM-DD]
```

### Example Searches
```
# Find high-performing Instagram Reels with curiosity gap hooks
platform:instagram format:reels hook_type:curiosity-gap virality_score_min:70

# Find Value Architect-style educational content
persona:value-architect function:engagement

# Find recent (2026) YouTube thumbnails
platform:youtube format:thumbnails-high-ctr date_after:2026-01-01
```

---

## SPECIMEN ANTI-PATTERNS

1. **The Copycat Trap:** Specimens are for understanding, not copying. If your content looks like a specimen, you've missed the point.

2. **The Nostalgia Trap:** Specimens from 2 years ago may be outdated. Always weight recent specimens higher.

3. **The Single-Specimen Syndrome:** Never base strategy on one specimen. Patterns emerge from multiple specimens.

4. **The Cross-Platform Fallacy:** Instagram specimens don't apply to TikTok without translation. Platform context matters.

5. **The Vanity Metric Trap:** Views alone don't make a specimen. Saves, shares, and comments matter more for understanding value.

---

*Specimens are the raw material of great content. Collect with taste. Deconstruct with rigor.*
