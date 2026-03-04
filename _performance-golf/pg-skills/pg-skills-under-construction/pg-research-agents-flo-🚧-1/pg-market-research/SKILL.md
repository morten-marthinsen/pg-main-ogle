---
name: pg-market-research
description: Enterprise-grade market research system for Performance Golf promotions with ACE (Agentic Context Engineering) self-improvement framework. Executes 12-agent research pipeline with Signal Quality Scoring, Aspect-Based Sentiment Analysis, Knowledge Graphs, and embedded Ultra Rich anti-mediocrity protocol. Features continuous playbook evolution from campaign outcomes.
playbook_version: 5.0.0
total_bullets: 47
campaigns_processed: 0
avg_helpfulness: 0.0
last_updated: 2025-01-13
---

# Performance Golf Market Research Skill

**Version:** 5.0 — ACE Self-Improvement Edition
**Last Updated:** January 2025

## Overview

This skill executes a comprehensive **12-agent research pipeline** specifically designed for Performance Golf promotions. The system now features:

1. **Signal Quality Scoring (SQS)** — Every quote rated 1-10 for authenticity
2. **Aspect-Based Sentiment Analysis** — Decompose quotes into specific golf aspects
3. **Golf-Specific Emotion Taxonomy** — Plutchik-adapted classification
4. **Knowledge Graph Building** — Relational structure from findings
5. **ACE Self-Improvement** — Playbook evolves from campaign outcomes
6. **Embedded Ultra Rich Checkpoints** — Anti-mediocrity at every stage

**NEW IN v5.0:**
- **Agent 2B: Aspect Extractor** — Decompose quotes into golf-specific aspects with sentiment
- **Agent 8B: Knowledge Graph Builder** — Build relational structure from findings
- **Agent 9: Campaign Reflector (ACE)** — Analyze campaign outcomes to improve system
- **Agent 10: Playbook Curator (ACE)** — Integrate learnings via delta operations
- **Signal Quality Scoring** — Every quote scored 1-10 for authenticity
- **New Data Sources** — Podcasts, Amazon Q&A, secondhand marketplaces, Google Autocomplete

---

## STRATEGIES AND HARD RULES

[shr-00001] helpful=0 harmful=0 ::
When targeting beginner golfers (25+ handicap), always extract language about 'embarrassment' and 'social shame' first. These emotions have driven 7 of 9 successful campaigns. Look for: 'can't play with my boss,' 'holding up the group,' 'won't play with friends anymore.'

[shr-00002] helpful=0 harmful=0 ::
Agent 2 must assign Signal Quality Scores (SQS) to every extracted quote. HIGH SIGNAL (8-10): Long-form posts 500+ words, heated discussion replies, personal stories with vulnerability. MEDIUM (5-7): Standard forum replies. LOW (1-4): Short reactions, performative statements.

[shr-00003] helpful=0 harmful=0 ::
Never accept quotes with SQS <4 as primary evidence. These may be used for frequency analysis only. Minimum 50 quotes must be SQS 8-10. Maximum 30% of quotes can be SQS 1-4.

[shr-00004] helpful=0 harmful=0 ::
For golf instruction market, podcast transcripts (No Laying Up, Chasing Scratch, The Fried Egg) contain breakthrough language patterns not found in forums. Guest stories reveal transformation moments.

[shr-00005] helpful=0 harmful=0 ::
Amazon Q&A on training aids reveals pre-purchase objections more authentically than reviews. Extract: 'Will this work for someone who...' patterns.

[shr-00006] helpful=0 harmful=0 ::
Secondhand marketplace analysis (eBay sold listings, FB Marketplace) reveals WHAT FAILED. Products people sell quickly = methods that disappointed. Gold mine for 'exhausted mechanism' insights.

[shr-00007] helpful=0 harmful=0 ::
Google Autocomplete mining should systematically cover: 'why can't I [golf]', 'golf frustrating', 'how to finally [golf]', 'best golf tip for [problem]'. Yield 100+ autocomplete phrases minimum.

[shr-00008] helpful=0 harmful=0 ::
Always verify 'fresh territory' claims with Facebook Ad Library evidence. A claim is only fresh if NO competitor has used it in active ads for 6+ months.

[shr-00009] helpful=0 harmful=0 ::
For Agent 3 emotional digs, the THIRD layer (identity/existential) is where copy power lives. If a dig stops at layer 2, it's incomplete. Push to 'who they become/fear becoming.'

[shr-00010] helpful=0 harmful=0 ::
Competitor voice capture requires 10+ verbatim headlines PER competitor. Generic descriptions like 'they promise results' are useless. Capture EXACT language.

---

## USEFUL CODE SNIPPETS AND TEMPLATES

[code-00001] helpful=0 harmful=0 ::
SQS Distribution Output Template:
```json
{
  "total_quotes": 347,
  "sqs_distribution": {
    "high_8_10": 67,
    "medium_5_7": 198,
    "low_1_4": 82
  },
  "average_sqs": 5.8,
  "quality_threshold_met": true
}
```

[code-00002] helpful=0 harmful=0 ::
Aspect Extraction Output Template:
```json
{
  "quote_id": "q-00147",
  "quote": "I've worked on my grip forever but still can't hit a straight drive",
  "sqs": 7,
  "aspects": [
    {
      "aspect": "grip",
      "category": "mechanical",
      "sentiment": "frustrated_effort",
      "intensity": 7,
      "evidence": "worked on...forever"
    },
    {
      "aspect": "drives",
      "category": "outcome",
      "sentiment": "strong_negative",
      "intensity": 9,
      "evidence": "can't hit a straight drive"
    }
  ]
}
```

[code-00003] helpful=0 harmful=0 ::
Knowledge Graph Relationship Template:
```
SLICE (problem)
  |-- CAUSES --> EMBARRASSMENT (emotion)
  |-- TRIED_FOR <-- YouTube videos (solution)
  |     |-- RECOMMENDED_BY <-- Rick Shiels
  |     +-- RESULTED_IN --> Temporary fix (outcome)
  |-- TRIED_FOR <-- Grip change (solution)
  |     |-- FAILED_BECAUSE --> Made hook worse
  |     +-- CONTRASTS_WITH --> Stance change
  +-- LEADS_TO --> Avoiding driver (problem)
```

[code-00004] helpful=0 harmful=0 ::
Reflector Output Template:
```json
{
  "campaign_id": "PG-2025-001",
  "overall_assessment": "success|partial|failure",
  "bullet_evaluations": [
    {"bullet_id": "shr-00001", "tag": "helpful", "reason": "..."}
  ],
  "new_insight_candidates": [
    {"section": "domain_knowledge", "content": "...", "evidence": "..."}
  ],
  "playbook_refinements": [
    {"bullet_id": "dom-00002", "action": "update", "new_content": "..."}
  ]
}
```

[code-00005] helpful=0 harmful=0 ::
Curator Delta Operations Template:
```json
{"type": "ADD", "section": "domain_knowledge", "content": "...", "evidence": "..."}
{"type": "UPDATE", "bullet_id": "dom-00002", "new_content": "...", "reason": "..."}
{"type": "INCREMENT_HELPFUL", "bullet_id": "shr-00001"}
{"type": "INCREMENT_HARMFUL", "bullet_id": "dom-00002"}
```

---

## TROUBLESHOOTING AND PITFALLS

[ts-00001] helpful=0 harmful=0 ::
**CRITICAL: Reddit MUST use Apify ONLY.** Firecrawl is permanently blocked for Reddit at platform level. DO NOT attempt Firecrawl for Reddit - it will silently fail and return zero data. Use Apify `fatihtahta/reddit-scraper-search-fast` as PRIMARY and ONLY method. Firecrawl can be used for non-Reddit forum discovery only.

[ts-00001b] helpful=0 harmful=0 ::
**NO SHORTCUTS PROTOCOL:** API costs and context window concerns must NEVER limit research depth. The research process is too valuable to shortcut. When in doubt, scrape MORE not less. Better to have too much data than miss critical insights. DO NOT self-limit due to perceived cost or efficiency concerns.

[ts-00002] helpful=0 harmful=0 ::
TikTok default comment limit of 100 is INSUFFICIENT for research quality. Always set maxComments to 500 and includeReplies to true. Reply threads contain debates = high signal.

[ts-00003] helpful=0 harmful=0 ::
Verified accounts on social platforms often produce LOW SIGNAL content (promotional). Set excludeVerified: true in TikTok configs to focus on authentic user voice.

[ts-00004] helpful=0 harmful=0 ::
Large transcript files (2.5+ hours) will exceed token limits. Always chunk read in 800-line segments. Never attempt single-read on files >100KB.

[ts-00005] helpful=0 harmful=0 ::
Facebook Ads Library returns STALE data if maxAds too low. Use 300 for market-wide sweeps, 50 minimum per competitor.

[ts-00006] helpful=0 harmful=0 ::
Playbook collapse prevention: Never batch more than 10 delta operations per Curator run. Never affect more than 3 bullets per section. New content must be >50 characters with concrete details.

---

## APIS AND DATA SCHEMAS

[api-00001] helpful=0 harmful=0 ::
Facebook Ads Library Scraper (Apify) key parameters: searchTerms array, country (always 'US'), adActiveStatus ('ACTIVE'), maxAds (300 for market-wide, 50 per competitor). Actor: curious_coder/facebook-ads-library-scraper

[api-00002] helpful=0 harmful=0 ::
TikTok Deep Extraction config: minComments 100, minDuration 30 seconds, exclude short clips. Filter mustContainAny: ['I', 'my', 'finally', 'years', 'months', 'tried', 'help'].

[api-00003] helpful=0 harmful=0 ::
Instagram extraction must target Story Highlights with keywords: ['polls', 'q&a', 'questions', 'feedback']. Instructor poll data = direct market research gold.

[api-00004] helpful=0 harmful=0 ::
**Reddit extraction via Apify ONLY (MANDATORY):** Actor `fatihtahta/reddit-scraper-search-fast` is the PRIMARY and ONLY method. Config: searchTerms in array format, subreddit targeting, sort by "hot" or "relevance", postLimit minimum 500 per search term. Search queries: frustrated, give up, finally, breakthrough, lesson, YouTube, can't figure out, tried everything, embarrassing, chunk, fat shot, thin, skull, yips. **DO NOT use Firecrawl for Reddit - it is permanently blocked.**

[api-00005] helpful=0 harmful=0 ::
YouTube comment extraction priority patterns (regex): '^I ' (starts with I = personal), 'years|months|weeks' (time references), 'finally|breakthrough|clicked' (success), 'frustrated|confused|stuck' (struggle).

[api-00006] helpful=0 harmful=0 ::
**YouTube Video Search (MANDATORY):** Actor `grow_media/youtube-search-api` for discovering top videos. Config: q (search term), maxResults (100 minimum), order ('viewCount' to find what resonates), videoDuration ('medium' for instruction content), regionCode ('US'). Run multiple searches per product type.

[api-00007] helpful=0 harmful=0 ::
**YouTube Transcript Extraction (MANDATORY):** Actor `karamelo/youtube-transcripts` for extracting full transcripts. Config: urls (array of video URLs from search), outputFormat ('captions'), maxRetries (8), channelNameBoolean (true), viewCountBoolean (true), descriptionBoolean (true). Extract 30+ transcripts minimum per project.

[api-00008] helpful=0 harmful=0 ::
**YouTube Comment Extraction (MANDATORY):** Actor `streamers/youtube-comments-scraper` for mining comments. Config: startUrls (array of {url} objects), maxComments (500 minimum per video), commentsSortBy ('1' for relevance). Extract 10,000+ comments minimum per project from 20+ videos.

[api-00009] helpful=0 harmful=0 ::
**YouTube Search Term Expansion (MANDATORY):** DO NOT search with only 2-3 obvious terms. Build 15+ unique search queries across 5 REQUIRED categories: (1) DIRECT TERMS - "[topic] tips", "[topic] tutorial"; (2) PROBLEM TERMS - "can't stop [problem]", "[problem] ruining my game"; (3) SYMPTOM TERMS - specific manifestations like "fat shots", "thin chips"; (4) EMOTIONAL TERMS - "[topic] frustrated", "finally fixed [problem]", "[topic] yips"; (5) SOLUTION-SEEKING TERMS - "how to fix [problem]", "cure [problem]". Minimum 3 searches per category. Emotional searches (yips, frustrated, embarrassing) often yield highest-SQS content. Document which terms yielded highest-view content. See YOUTUBE-DEEP-MINING.md for full expansion template.

---

## DOMAIN KNOWLEDGE

[dom-00001] helpful=0 harmful=0 ::
Golf market unique characteristics: Ego-laden (tied to identity/status), endless pursuit (no golfer 'arrives'), method fatigue (hundreds of 'revolutionary' methods seen), social pressure (performance visible to partners), the elusive 'click' (belief in ONE missing thing).

[dom-00002] helpful=0 harmful=0 ::
Golf-specific aspect categories: MECHANICAL (grip, stance, posture, alignment, backswing, downswing, transition, impact, follow-through, tempo, rhythm, timing), OUTCOME (distance driver/irons/total, accuracy fairways/greens, consistency shot-to-shot variance, specific shots drives/approaches/chips/putts/bunker), EXPERIENCE (learning curve, time investment, practice requirements, retention, lesson experiences, instruction quality, equipment fitting, technology use), SOCIAL (playing partners' perception, course situations pace of play/etiquette, competition performance, family/spouse reactions), EMOTIONAL (frustration moments/triggers, confidence states building/losing, embarrassment situations, joy/satisfaction sources).

[dom-00003] helpful=0 harmful=0 ::
Golf emotion taxonomy (Plutchik-adapted): FRUSTRATION FAMILY (Exasperation: 'I've tried EVERYTHING', Confusion: 'I don't know what I'm doing wrong', Betrayal: 'YouTube ruined my swing', Self-doubt: 'Maybe I'm just not athletic enough', Method fatigue: 'I'm tired of contradictory advice'), EMBARRASSMENT FAMILY (Social shame: 'Can't play with my boss anymore', Self-judgment: 'I should be better by now', Comparison shame: 'Everyone else gets it', Performance anxiety: 'I freeze when people watch', Identity threat: 'Maybe I'm not a golfer'), HOPE FAMILY (Desperate hope: 'This HAS to work', Cautious optimism: 'Maybe this time...', Renewed belief: 'I finally understand', Transferred hope: 'If [pro] says it works...'), DESIRE FAMILY (Achievement desire: 'I just want to break 90', Identity desire: 'I want to BE a golfer', Relief desire: 'I just want to stop embarrassing myself', Mastery desire: 'I want to UNDERSTAND my swing').

[dom-00004] helpful=0 harmful=0 ::
Intensity indicators in golf language: ALL CAPS usage, multiple punctuation (!!!, ???), profanity, specific numbers ('I've taken 47 lessons'), time references ('for 3 years now'), superlatives ('the WORST', 'every single time').

[dom-00005] helpful=0 harmful=0 ::
Knowledge graph entity types: PROBLEM (slice, hook, inconsistency, distance loss), SOLUTION_TRIED (YouTube tips, lessons, training aids), OUTCOME (worked, failed, temporary, made worse), EMOTION (frustration, hope, embarrassment), INFLUENCER (instructors, YouTube channels), CONCEPT (swing plane, lag, hip turn), PRODUCT (specific products/programs).

[dom-00006] helpful=0 harmful=0 ::
Knowledge graph relationship types: CAUSES (Problem->Emotion), TRIED_FOR (Solution->Problem), RESULTED_IN (Solution->Outcome), RECOMMENDED_BY (Solution->Influencer), FAILED_BECAUSE (Solution->Reason), LEADS_TO (Problem->Problem cascading), CONTRASTS_WITH (Solution->Solution conflicting advice).

---

## VERIFICATION CHECKLIST

[vc-00000] helpful=0 harmful=0 ::
**MANDATORY DEPTH GATE (ALL AGENTS):** Research depth is NON-NEGOTIABLE. DO NOT PROCEED to next agent if minimums are not met. DO NOT reduce targets due to API costs or context concerns. If a source is blocked, immediately switch to alternative (Apify for Reddit, archive for paywalled content). Missing data = incomplete research = failed campaign.

[vc-00001] helpful=0 harmful=0 ::
Agent 2 Quality Gate: **MANDATORY** Minimum 300 total quotes, minimum 50 quotes SQS 8-10, maximum 30% quotes SQS 1-4, average SQS >5.5 across all quotes. **DO NOT PROCEED TO AGENT 3 UNTIL ALL THRESHOLDS MET.** If under 300 quotes, scrape additional sources before continuing.

[vc-00001b] helpful=0 harmful=0 ::
**YouTube Deep Mining Gate (MANDATORY):** Agent 1 must: (1) Build search term expansion template with 15+ queries across 5 categories (DIRECT, PROBLEM, SYMPTOM, EMOTIONAL, SOLUTION); (2) Execute all 15+ searches via youtube-search-api; (3) Discover 100+ unique videos; (4) Extract 30+ transcripts; (5) Document which search terms yielded best results. Agent 2 must scrape 10,000+ comments from 20+ videos, add 50+ YouTube quotes to database (15+ at SQS 8-10). **DO NOT PROCEED if search term expansion incomplete or YouTube mining incomplete.**

[vc-00002] helpful=0 harmful=0 ::
Agent 2B Aspect Coverage Gate: Minimum 200 quotes processed, all 5 aspect categories represented, at least 3 aspects with intensity >7.

[vc-00003] helpful=0 harmful=0 ::
Agent 8B Knowledge Graph Gate: Minimum 50 entities, minimum 100 relationships, all entity types represented, at least 3 query insights surfaced.

[vc-00004] helpful=0 harmful=0 ::
Agent 9 Reflector Evidence Gate: Every bullet evaluation has specific evidence, new insights have campaign data support, refinements preserve specificity.

[vc-00005] helpful=0 harmful=0 ::
Agent 10 Curator Anti-Collapse Gate: No operation removes content, UPDATE preserves or increases specificity, total operations <10 per run, no more than 3 bullets per section affected, new content >50 characters with concrete details.

---

## SOURCE QUALITY INSIGHTS

[sqi-00001] helpful=0 harmful=0 ::
GolfWRX 'Instruction & Academy' subforum produces highest SQS quotes. Members discuss specific struggles with technical detail. Better than r/golf for mechanism language.

[sqi-00002] helpful=0 harmful=0 ::
TikTok transformation video comments contain 'finally clicked' language patterns. Filter for videos with 'finally' or 'breakthrough' in title.

[sqi-00003] helpful=0 harmful=0 ::
YouTube comments on 'I almost quit golf' type videos = highest vulnerability, highest SQS. Prioritize these over standard instruction video comments.

[sqi-00004] helpful=0 harmful=0 ::
Podcast guest stories (especially amateur guests) contain breakthrough moment narratives rarely found elsewhere. Target: No Laying Up listener call-in episodes.

[sqi-00005] helpful=0 harmful=0 ::
eBay 'Sold' listings for training aids contain seller descriptions with failure narratives: 'Didn't work for my swing type,' 'Thought this would fix my slice.' Mine these for exhausted mechanism insights.

---

## EMOTION PATTERNS

[emo-00001] helpful=0 harmful=0 ::
'Method fatigue' emotion pattern: 'I'm tired of contradictory advice' + 'YouTube ruined my swing' + 'every pro says something different'. Usually paired with 'just tell me what to do' desire. High receptivity to 'one simple thing' messaging.

[emo-00002] helpful=0 harmful=0 ::
'Social shame' trigger situations: First tee with strangers, playing with boss, family golf outings, tournament first hole. Extract specific scenarios, not just feeling. Copy should name the SITUATION.

[emo-00003] helpful=0 harmful=0 ::
'Desperate hope' language pattern: 'This HAS to work' + 'last resort' + 'if this doesn't work I'm done'. High-intent buying signal. Use in urgency copy, but handle ethically.

[emo-00004] helpful=0 harmful=0 ::
'Identity threat' is DEEPER than 'frustration.' Signs: 'Maybe I'm just not a golfer,' 'Some people have it, I don't,' 'I should quit.' This is existential, not tactical. Copy must address IDENTITY, not just skill.

---

## COMPETITIVE INTELLIGENCE

[ci-00001] helpful=0 harmful=0 ::
Me and My Golf dominates 'friendly instructor' positioning. White space exists in 'no-nonsense, just give me the answer' positioning.

[ci-00002] helpful=0 harmful=0 ::
Most competitors run VSL funnels. Quiz funnels underutilized in golf market. Potential differentiation opportunity.

[ci-00003] helpful=0 harmful=0 ::
Competitor ad longevity >90 days indicates proven conversion. Document these ads verbatim for hook/mechanism analysis.

[ci-00004] helpful=0 harmful=0 ::
Athletic Motion Golf owns 'biomechanics/science' angle. Rotary Swing owns 'simple/fundamental' angle. White space: 'Fast results without complexity' or 'What ACTUALLY matters (not everything).'

---

## Ultra Rich Integration (EMBEDDED)

The Ultra Rich anti-mediocrity protocol is woven into every stage:

| Phase | Ultra Rich Component | Purpose |
|-------|---------------------|---------|
| **Pre-Pipeline** | Pre-Task Interrogation | Establish A-list standards before starting |
| **Each Agent** | Satisficing Check | Prevent shortcuts and "good enough" output |
| **Each Gate** | Impact Landing Check | Verify techniques LAND, not just exist |
| **Agent 8** | Full Post-Task Verification | Comprehensive quality audit |
| **Final** | Impact Audit | Identify and fix hollow techniques |

See: [ULTRA-RICH-INTEGRATION.md](ULTRA-RICH-INTEGRATION.md) for detailed embedded protocol.

---

## The 12-Agent Pipeline (ACE Edition)

### Pre-Pipeline
- **Ultra Rich Pre-Task Interrogation** — Establish A-list standards

### Research Agents (1-8B)
| Agent | Mission | Key Enhancement |
|-------|---------|-----------------|
| 1 | Market Intelligence Scout | +New sources (podcasts, Amazon Q&A, secondhand) |
| 1B | Demographic Profiler | Firecrawl acceleration |
| 1C | TAM Analyst | Firecrawl acceleration |
| 2 | Language Archaeologist | +Signal Quality Scoring (SQS) |
| **2B** | **Aspect Extractor (NEW)** | **Aspect-based sentiment analysis** |
| 3 | Emotional Depth Diver | +Golf-specific emotion taxonomy |
| 4 | Awareness & Sophistication Mapper | No change |
| 5 | Belief System Analyst | No change |
| 6 | Competitive Intelligence Officer | +Enhanced ad analysis |
| 7 | Identity Cartographer | Knowledge graph inputs |
| 8 | Synthesis Architect | Includes graph building |
| **8B** | **Knowledge Graph Builder (NEW)** | **Relational structure** |

### Ad Intelligence
| Agent | Mission | Enhancement |
|-------|---------|-------------|
| 9 | Ad & Funnel Intelligence | +Competitive ad depth |

### ACE Self-Improvement Agents (Post-Campaign)
| Agent | Mission | Trigger |
|-------|---------|---------|
| **Reflector** | **Analyze campaign outcomes** | **7-14 days post-campaign** |
| **Curator** | **Integrate learnings via delta ops** | **After Reflector output** |

---

## Execution Timeline (With Upgrades)

| Phase | Original | With Upgrades | Notes |
|-------|----------|---------------|-------|
| Agent 1: Sources | 2-3 hrs | 3-4 hrs | Added source categories |
| Agent 1B: Demographics | 2-3 hrs | 2-3 hrs | No change |
| Agent 1C: TAM | 2-3 hrs | 2-3 hrs | No change |
| Agent 2: Language + SQS | 6-8 hrs | 8-10 hrs | Added Signal Quality Scoring |
| **Agent 2B: Aspects** | N/A | **2-3 hrs** | **NEW** |
| Agent 3: Emotion | 2-3 hrs | 3-4 hrs | Enhanced taxonomy |
| Agent 4: Awareness | 2-3 hrs | 2-3 hrs | No change |
| Agent 5: Beliefs | 2-3 hrs | 2-3 hrs | No change |
| Agent 6: Competitive | 3-4 hrs | 4-5 hrs | Enhanced ad analysis |
| Agent 7: Identity | 2 hrs | 2-3 hrs | Knowledge graph inputs |
| Agent 8: Synthesis | 2-3 hrs | 3-4 hrs | Includes graph building |
| **Agent 8B: Knowledge Graph** | N/A | **2-3 hrs** | **NEW** |
| Agent 9: Ad & Funnel | 4-6 hrs | 4-6 hrs | Enhanced |
| **TOTAL RESEARCH** | **30-42 hrs** | **40-54 hrs** | **+35%** |
| --- | --- | --- | --- |
| **Reflector** | N/A | **2-3 hrs** | **Post-campaign** |
| **Curator** | N/A | **1-2 hrs** | **Post-campaign** |

---

## Playbook Integration

This skill uses a living playbook that evolves with each campaign.

### Before Starting Research:
1. **Load playbook** from PLAYBOOK.json
2. **Review relevant bullets** for this campaign type
3. **Apply strategies** during research
4. **Track bullet usage** for post-campaign reflection

### After Campaign Results Available:
1. Run **Reflector** to analyze outcomes
2. Run **Curator** to update playbook
3. Playbook bullets gain helpful/harmful scores over time

### Required Output Addition (All Agents):
```json
{
  "playbook_bullets_applied": [
    {"bullet_id": "shr-00001", "how_applied": "[Specific description]", "helpful": true}
  ],
  "playbook_gaps_encountered": [
    {"situation": "[What you needed guidance on]", "what_I_did": "[How you handled it]", "suggested_addition": "[What should be added]"}
  ],
  "new_patterns_discovered": [
    {"pattern": "[Description]", "evidence": "[Supporting data]", "confidence": 0.8}
  ]
}
```

---

## File Structure

```
/pg-market-research/
|-- SKILL.md                          # This file (ACE format)
|-- PLAYBOOK.json                     # Living playbook data
|-- PERFORMANCE-GOLF-RESEARCH-SYSTEM.md  # Full system docs
|-- agents/
|   |-- AGENT-1-SCOUT.md              # Enhanced with new sources
|   |-- AGENT-1B-DEMOGRAPHICS.md
|   |-- AGENT-1C-TAM.md
|   |-- AGENT-2-LANGUAGE.md           # Enhanced with SQS
|   |-- AGENT-2B-ASPECTS.md           # NEW
|   |-- AGENT-3-EMOTION.md            # Enhanced taxonomy
|   |-- AGENT-4-AWARENESS.md
|   |-- AGENT-5-BELIEFS.md
|   |-- AGENT-6-COMPETITIVE.md        # Enhanced ad analysis
|   |-- AGENT-7-IDENTITY.md
|   |-- AGENT-8-SYNTHESIS.md
|   |-- AGENT-8B-KNOWLEDGE-GRAPH.md   # NEW
|   |-- AGENT-9-AD-FUNNEL.md
|   |-- AGENT-REFLECTOR.md            # NEW (ACE)
|   +-- AGENT-CURATOR.md              # NEW (ACE)
|-- integrations/
|   |-- APIFY-INTEGRATION.md          # Enhanced configs
|   |-- FIRECRAWL-INTEGRATION.md
|   |-- PERPLEXITY-INTEGRATION.md
|   +-- YOUTUBE-DEEP-MINING.md        # YouTube 3-step protocol (MANDATORY)
|-- templates/
|   |-- PLAYBOOK-BULLET-TEMPLATE.md
|   |-- REFLECTOR-OUTPUT-TEMPLATE.json
|   +-- CURATOR-OPERATIONS-TEMPLATE.json
+-- utilities/
    |-- playbook_manager.py           # ACE playbook management
    |-- merge_delta.py                # Deterministic merge logic
    +-- collapse_detection.py         # Anti-collapse safeguards
```

---

## Reference

- **Full system documentation:** See [PERFORMANCE-GOLF-RESEARCH-SYSTEM.md](PERFORMANCE-GOLF-RESEARCH-SYSTEM.md)
- **Ultra Rich integration:** See [ULTRA-RICH-INTEGRATION.md](ULTRA-RICH-INTEGRATION.md) (REQUIRED READING)
- **YouTube Deep Mining:** See [integrations/YOUTUBE-DEEP-MINING.md](YOUTUBE-DEEP-MINING.md) (MANDATORY)
- **Agent-specific instructions:** See agents/ folder
- **Apify integration:** See [integrations/APIFY-INTEGRATION.md](APIFY-INTEGRATION.md)
- **Playbook management:** See [utilities/](./utilities/)

---

*Performance Golf Research System v5.0 — ACE Self-Improvement Edition*
*12 Agents x Signal Quality Scoring x Knowledge Graphs x Self-Evolving Playbook*
*The standard is A-list. Good enough is not acceptable.*
