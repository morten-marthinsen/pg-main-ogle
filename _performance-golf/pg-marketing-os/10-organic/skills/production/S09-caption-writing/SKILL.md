---
name: caption-writing
description: >-
  Platform-optimized caption and post copy production for organic social content.
  Use when writing captions for Instagram posts, LinkedIn updates, Facebook posts,
  or any social platform text layer that accompanies visual content. Produces
  scroll-stopping, engagement-driving captions calibrated to platform character
  limits, hashtag strategy, and CTA placement. All captions run through the
  Arena before finalization. Trigger when users mention captions, post copy,
  social media text, Instagram captions, LinkedIn posts, or writing the text
  that accompanies content. Requires the Campaign Brief File (CBF) from S07.
---

# S09: CAPTION WRITING
## Platform-Optimized Copy That Converts
## Gate: G07 (Requires S07 CBF) | Output: Production Asset

---

## PURPOSE

This skill produces scroll-stopping, engagement-driving captions for any platform. Captions are the text layer that works WITH visual content to maximize impact.

**Output:** Platform-ready captions
**Prerequisite:** Campaign Brief File (CBF) required

## ANTI-DEGRADATION

- Read `S09-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `~system/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## MCP TOOL DISCOVERY

This skill may require Firecrawl and Apify tools for competitive caption research and trend analysis. At Layer 0, call:
- `ToolSearch("firecrawl")` for scraping competitor captions and trending content
- `ToolSearch("apify")` for platform-specific content collection

See `~system/MCP-TOOL-REGISTRY.md` for the complete tool-to-skill mapping.

---

## REQUIRED CONTEXT

### Load Before Execution
- `~system/SYSTEM-CORE.md` — Inviolable laws
- `ORGANIC-ARENA.md` — All captions run through Arena
- Campaign Brief File (CBF) from S07

### Teachings to Reference
- `teachings/virality/berger-stepps-framework.yaml`
- `teachings/audience-psychology/cialdini-influence-principles.yaml`
- `teachings/content-strategy/miller-storybrand.yaml`

### Specimens to Load
- High-performing captions from target platform
- Competitor caption analysis

---

## INPUT REQUIREMENTS

```yaml
caption_brief:
  content_title: [What is this caption for]
  platform: [Instagram/TikTok/YouTube/LinkedIn/X]
  content_type: [Reel/carousel/photo/video/etc]
  content_function: [Awareness/Engagement/Conversion/Community]

  content_summary: |
    [Brief description of the visual/video content]

  key_message: |
    [The core point this caption must convey]

  cta_type: [None/Soft/Medium/Hard]
  cta_specific: [If applicable, exact action wanted]

  tone_override: [If different from CBF default]

  constraints:
    character_limit: [Platform-specific]
    hashtag_strategy: [From PSF]
    link_allowed: [Yes/No]
```

---

## PROCESS

### Phase 1: Platform Analysis

Understand platform-specific caption mechanics:

```yaml
platform_specs:
  instagram:
    display_length: "First 125 characters before 'more'"
    max_length: 2200 characters
    hashtag_approach: "In caption or first comment"
    optimal_length: "150-300 or 1000+ (no middle)"
    format_notes:
      - Hook in first line (before 'more')
      - Line breaks for readability
      - Emoji punctuation (sparingly)
      - Strong CTA or question

  tiktok:
    display_length: "First ~70 characters"
    max_length: 4000 characters (2024+)
    hashtag_approach: "Integrated in caption"
    optimal_length: "50-150 characters"
    format_notes:
      - Ultra-concise
      - Adds context video doesn't
      - Hashtags for discovery
      - Trend hooks work well

  youtube:
    description_fold: "First 100 characters in results"
    max_length: 5000 characters
    format_notes:
      - Front-load keywords
      - Timestamps for long-form
      - Links and resources
      - CTAs for subscribe/watch

  linkedin:
    display_length: "First ~140 characters before 'see more'"
    max_length: 3000 characters
    format_notes:
      - Bold hook in first line
      - Single sentences with line breaks
      - No hashtags in body (end only)
      - Professional but personal

  x_twitter:
    max_length: 280 characters
    format_notes:
      - Must hook immediately
      - No "See more" — it's all visible
      - Thread for long content
      - Media captions can extend
```

### Phase 2: Hook Creation

The first line is everything:

```yaml
hook_requirements:
  instagram:
    - Must work before "...more"
    - Pattern interrupt or curiosity gap
    - Question or bold statement
    - Avoid starting with "I"

  tiktok:
    - Complement video hook (don't repeat)
    - Add context or tease
    - Keyword-rich for search

  linkedin:
    - Must earn the "see more" click
    - Contrarian or personal
    - Numbers and specifics
    - Avoid corporate speak

  x_twitter:
    - Entire caption is the hook
    - Density over explanation
    - Hot take or clear value

hook_templates:
  curiosity: "[Unexpected truth] about [topic]."
  challenge: "Stop [common behavior]. Here's why."
  story: "[Time reference], [situation]. [Cliffhanger]."
  value: "The [number] [things] that [result]:"
  social_proof: "[Authority/number] [verified this]."
```

### Phase 3: Body Construction

Build the middle based on content function:

```yaml
body_structures:
  awareness_caption:
    structure:
      - Hook (pattern interrupt)
      - Value point 1
      - Value point 2
      - Value point 3
      - Shareability line
      - Soft CTA
    example: |
      Stop posting content every day.

      Here's what actually grows accounts:

      1. One piece of genuinely valuable content
      2. Posted at peak engagement time
      3. With 30 minutes of engagement afterward

      The algorithm rewards quality engagement, not quantity.

      Tag someone who needs to hear this.

  engagement_caption:
    structure:
      - Hook (relatable or question)
      - Personal story/context
      - Question or poll
      - Community invitation
    example: |
      I used to think posting daily was the answer.

      After 6 months of burnout and zero growth, I finally got it.

      Quality > Quantity. Every. Single. Time.

      What's the biggest lesson you've learned about content?

  conversion_caption:
    structure:
      - Hook (result-focused)
      - Social proof/credibility
      - Clear value proposition
      - Specific CTA
    example: |
      $47,000 in 30 days with organic content.

      No ads. No paid promotion. Just strategic posting.

      After helping 200+ creators scale, I've distilled it into one framework.

      Link in bio to get it free.

  community_caption:
    structure:
      - Hook (inclusive)
      - Celebration or shoutout
      - Inside reference
      - Community engagement
    example: |
      POV: You're in this community and you get it.

      We don't chase vanity metrics.
      We build real businesses.

      Drop a [fire emoji] if you're building something real.
```

### Phase 4: CTA Integration

Match CTA to content function:

```yaml
cta_types:
  soft:
    purpose: "Build engagement habits"
    examples:
      - "Save this for later"
      - "Follow for more"
      - "Drop a [emoji] if you agree"
      - "Tag someone who needs this"
    frequency: "Most content"

  medium:
    purpose: "Generate leads/action"
    examples:
      - "Link in bio"
      - "DM me [keyword]"
      - "Comment [word] for the free guide"
      - "Check my story"
    frequency: "1 in 5-10 posts"

  hard:
    purpose: "Drive conversion"
    examples:
      - "Book your call now"
      - "Join before [deadline]"
      - "Limited spots available"
      - "Enroll at [link]"
    frequency: "Campaign-specific"

cta_placement:
  instagram: "Final line or second-to-last"
  tiktok: "Brief or in video"
  linkedin: "After value, before sign-off"
  x_twitter: "Thread end or main tweet"
```

### Phase 5: Voice Application

Apply BVF voice guidelines:

```yaml
voice_check:
  vocabulary:
    - Use signature words from BVF
    - Avoid banned words/phrases
    - Use audience language from AIF

  tone:
    - Match tone variation for platform
    - Match tone variation for function
    - Maintain energy level from BVF

  syntax:
    - Follow sentence length preference
    - Apply punctuation style
    - Use rhetorical devices appropriately

  anti_slop:
    - No banned phrases from anti-degradation system
    - No generic filler
    - No forced enthusiasm
    - Authentic over polished
```

### Phase 6: Platform Optimization

Final optimization for platform:

```yaml
optimization:
  instagram:
    - [ ] Hook works in 125 characters
    - [ ] Line breaks for readability
    - [ ] Hashtag strategy applied
    - [ ] Emoji use is strategic (not excessive)
    - [ ] CTA is clear

  tiktok:
    - [ ] Complements video (doesn't repeat)
    - [ ] Under 150 characters
    - [ ] Relevant hashtags included
    - [ ] Keyword-rich for search

  linkedin:
    - [ ] First line earns "see more"
    - [ ] Single sentence paragraphs
    - [ ] Professional but personal
    - [ ] Hashtags at end (3-5 max)
    - [ ] No external links in first post (comment instead)

  x_twitter:
    - [ ] Complete thought in 280
    - [ ] No wasted words
    - [ ] Media utilizes caption extension
    - [ ] Thread structure if needed
```

---

## OUTPUT FORMAT

```yaml
caption_output:
  platform:
  content_title:
  content_function:

  hook: |
    [First line that appears before 'more']

  body: |
    [Full caption body]

  cta:
    type: [Soft/Medium/Hard]
    text: |

  hashtags: []

  full_caption: |
    [Complete caption ready to post]

  character_count:
  voice_check: [Pass/Fail]
  virality_score_contribution:
    hook_strength: [0-10]
    platform_fit: [0-10]
    voice_alignment: [0-10]
```

---

## VALIDATION REQUIREMENTS

Caption must pass:
- [ ] Platform character limits
- [ ] Hook appears before fold/truncation
- [ ] Voice check against BVF
- [ ] Anti-slop check (no banned phrases)
- [ ] CTA matches content function
- [ ] Hashtag strategy from PSF applied

---

## ARENA INTEGRATION

All captions must run through Arena competition:
1. Generate caption using this skill
2. Pass to S13: Arena Generation
3. 7 personas evaluate and compete
4. Synthesize best version
5. Final caption produced

---

*The caption is the copy that converts. Make every character count.*
