---
name: repurpose-multiplication
description: >-
  Content atomization — transform one piece of content into 10+ platform-native
  variants. Use after content assembly (S14) when you need to maximize distribution
  value from existing content. The best creators do not create more — they distribute
  what they create in more ways. Every piece of content contains multiple pieces
  waiting to be extracted. Produces the Repurpose Multiplication Plan (RMP) with
  platform-native variants, format transformations, and derivative content maps.
  Trigger when users mention repurposing, content atomization, content multiplication,
  reformatting content, or getting more mileage from existing content.
  Requires S14 Content Assembly output.
---

# S18: REPURPOSE MULTIPLICATION
## One Piece of Content into 10+ Platform-Native Variants
## Gate: G10 (Requires S14 Content Assembly) | Output: Repurpose Multiplication Plan (RMP)

---

## PURPOSE

This skill transforms a single piece of content into maximum distribution value. The best creators don't create more — they distribute what they create in more ways. Every piece of content contains multiple pieces waiting to be extracted.

**Output:** Repurpose Multiplication Plan (RMP) + Platform-Native Variants
**Requires:** S14 Content Assembly output (original content)
**Connects to:** Full pipeline for variant production (S08-S14 for each variant)

**Success Criteria:**
- Repurposing matrix maps each piece to derivative formats
- Platform-specific adaptations maintain native feel
- Voice consistency preserved across all variants
- Output: repurposed content variants

---

## ANTI-DEGRADATION

- Read `S18-ANTI-DEGRADATION.md` before execution — structural enforcement rules
- See `~system/protocols/EXECUTION-GUARDRAILS.md` for universal enforcement protocol

---

## SKILL IDENTITY

```yaml
skill_id: S18
skill_name: Repurpose Multiplication
category: Distribution
position_in_pipeline: Fourth distribution skill (multiplication layer)
dependencies:
  hard:
    - S14 Content Assembly (original content to repurpose)
  soft:
    - S15 Scheduling Choreography (timing for variants)
    - S02 Platform Strategy (platform requirements)
    - S03 Brand Voice (voice adaptation)
outputs_to:
  - S08-S14 (Variants may need production skills)
  - S15 Scheduling Choreography (scheduling variants)
  - S19 Performance Analysis (which variants performed)
```

---

## PREREQUISITES (Gate Requirements)

### Gate Validation

```yaml
gate_check:
  required_files:
    content_package:
      path: "skills/production/S14-content-assembly/outputs/[content-id]-package.yaml"
      exists: [Yes/No]
      performance_data: [If published, include results]

  required_context:
    platform_strategy:
      path: "core-message/S02-platform-strategy/outputs/[campaign]-PSF.yaml"
      exists: [Yes/No]
      note: "Needed for platform adaptation requirements"

    brand_voice:
      path: "core-message/S03-brand-voice/outputs/[campaign]-BVF.yaml"
      exists: [Yes/No]
      note: "Needed for voice consistency across variants"

gate_decision: [PROCEED / BLOCKED]
block_reason: [if blocked, why]
```

---

## INPUT REQUIREMENTS

### From S14 Content Assembly

```yaml
original_content:
  content_id: [ID]
  content_title: [Title]
  platform: [Original platform]
  content_type: [Format]
  content_function: [Awareness/Engagement/Conversion/Community]

  content_elements:
    full_script: |
    key_quotes: []
    main_points: []
    stories_told: []
    data_cited: []
    visual_elements: []

  performance_data:
    views: [If published]
    engagement_rate: [If published]
    best_performing_moment: [If analytics available]
    top_comments: [If published]
```

### From S02 Platform Strategy

```yaml
platform_requirements:
  platforms_active: []

  per_platform_specs:
    instagram:
      formats: ["Reel", "Carousel", "Story", "Feed Post"]
      length_requirements: {}
      aspect_ratios: {}

    tiktok:
      formats: ["Video"]
      length_requirements: {}
      optimal_length: "15-60 seconds"

    youtube:
      formats: ["Short", "Long-form"]
      length_requirements: {}

    linkedin:
      formats: ["Text", "Carousel", "Video", "Article"]
      length_requirements: {}

    x_twitter:
      formats: ["Tweet", "Thread", "Video"]
      length_requirements: {}

    podcast:
      formats: ["Full episode", "Clip", "Audiogram"]
```

---

## PROCESS

### Phase 1: Content Atomization Analysis

Break down original content into atomic units.

```yaml
content_atomization:

  atomic_units:
    description: "The smallest valuable pieces within the original content"

    unit_types:
      hook:
        definition: "The opening that stops the scroll"
        standalone_potential: "High — can be used as tease or separate content"
        extraction: "First 3-10 seconds / first 1-2 sentences"

      key_insight:
        definition: "A single valuable idea or revelation"
        standalone_potential: "High — each insight can be its own piece"
        extraction: "Identify 3-7 distinct insights within content"

      memorable_quote:
        definition: "A statement worth sharing/saving"
        standalone_potential: "High — quote graphics, tweetable moments"
        extraction: "Statements under 280 characters with punch"

      story_beat:
        definition: "A story or anecdote within the content"
        standalone_potential: "Medium-High — stories work standalone"
        extraction: "Complete story arcs, beginning/middle/end"

      data_point:
        definition: "Statistics, numbers, or research citations"
        standalone_potential: "Medium — needs context but valuable"
        extraction: "Specific numbers with source if available"

      framework:
        definition: "A process, system, or mental model"
        standalone_potential: "High — frameworks are highly shareable"
        extraction: "Step-by-step processes, numbered lists"

      controversial_take:
        definition: "Opinion that could generate discussion"
        standalone_potential: "High — controversy drives engagement"
        extraction: "Statements that invite disagreement"

      visual_moment:
        definition: "A particularly visual or demonstrative moment"
        standalone_potential: "High — especially for video clips"
        extraction: "Moments that work without audio context"

  atomization_worksheet:
    content_id: "[ID]"
    content_title: "[Title]"

    atomic_inventory:
      hooks:
        - text: |
          timestamp: "[If video]"
          standalone_strength: [1-10]

      key_insights:
        - insight: |
          timestamp: "[If video]"
          single_idea: [Yes/No]
          standalone_strength: [1-10]

      memorable_quotes:
        - quote: |
          character_count: [Count]
          tweetable: [Yes/No]
          visual_potential: [High/Medium/Low]

      story_beats:
        - story_summary: |
          timestamp: "[If video]"
          duration: "[If video]"
          standalone_complete: [Yes/No]

      data_points:
        - data: |
          source: "[If available]"
          visualization_potential: [High/Medium/Low]

      frameworks:
        - framework_name: |
          steps: [Count]
          carousel_potential: [Yes/No]
          thread_potential: [Yes/No]

      controversial_takes:
        - take: |
          engagement_potential: [High/Medium/Low]
          risk_level: [High/Medium/Low]

      visual_moments:
        - description: |
          timestamp: "[Start-End]"
          works_without_audio: [Yes/No]
```

### Phase 2: Long-Form to Short-Form Extraction

Transform longer content into short-form clips.

```yaml
long_to_short_extraction:

  video_extraction:
    source_types: ["YouTube Long-form", "Podcast Video", "Webinar", "Live Stream"]

    extraction_targets:
      tiktok_clips:
        ideal_length: "15-60 seconds"
        aspect_ratio: "9:16"
        extraction_criteria:
          - "Complete thought/point"
          - "Strong opening hook"
          - "Natural ending (or loop potential)"
          - "Works without broader context"

      instagram_reels:
        ideal_length: "15-90 seconds"
        aspect_ratio: "9:16"
        extraction_criteria:
          - "Same as TikTok"
          - "Caption-friendly (text overlay space)"
          - "Save-worthy value"

      youtube_shorts:
        ideal_length: "30-60 seconds"
        aspect_ratio: "9:16"
        extraction_criteria:
          - "Same as TikTok"
          - "Can reference full video"
          - "Subscribe CTA opportunity"

      linkedin_video:
        ideal_length: "30-90 seconds"
        aspect_ratio: "1:1 or 9:16"
        extraction_criteria:
          - "Professional context"
          - "Business insight focus"
          - "Thought leadership angle"

    extraction_workflow:
      step_1_scan:
        action: "Watch/review full content"
        identify:
          - "High-energy moments"
          - "Key insight deliveries"
          - "Story climaxes"
          - "Memorable quotes"
          - "Visual highlights"

      step_2_timestamp:
        action: "Document exact timestamps for each clip"
        format: "[Start MM:SS] - [End MM:SS] | [Description] | [Platform fit]"

      step_3_hook_check:
        action: "Verify each clip has strong opening"
        if_weak: "Find alternate start point or add new hook"

      step_4_context_check:
        action: "Verify clip works standalone"
        if_needs_context: "Add intro text/voiceover or skip clip"

      step_5_format:
        action: "Crop, add captions, optimize for platform"
        requirements:
          - "Auto-captions or manual subtitles"
          - "Correct aspect ratio"
          - "Platform-native text styling"

  podcast_extraction:
    source_types: ["Audio Podcast", "Video Podcast"]

    extraction_targets:
      audiograms:
        ideal_length: "30-60 seconds"
        format: "Audio + waveform + captions"
        platforms: ["Instagram", "LinkedIn", "X/Twitter"]

      video_clips:
        ideal_length: "30-90 seconds"
        format: "Video with captions"
        platforms: ["TikTok", "Instagram", "YouTube Shorts"]

      quote_graphics:
        format: "Static image with quote"
        platforms: ["Instagram Feed", "LinkedIn", "X/Twitter"]

      thread_transcripts:
        format: "Key segment transcribed + formatted"
        platforms: ["X/Twitter", "LinkedIn"]

    extraction_workflow:
      step_1_listen:
        action: "Listen for standout moments"
        identify:
          - "Quotable statements"
          - "Story highlights"
          - "Key insights"
          - "Emotional peaks"

      step_2_extract:
        action: "Cut audio/video segments"
        verify: "Clean start and end points"

      step_3_enhance:
        action: "Add visual elements"
        options:
          - "Audiogram with waveform"
          - "B-roll with voiceover"
          - "Quote card with audio"
          - "Video clip with captions"
```

### Phase 3: Platform Adaptation Frameworks

Transform content to be native to each platform.

```yaml
platform_adaptation:

  instagram_adaptations:

    reel_from_any:
      source: "Any video content"
      transformation:
        hook: "Re-cut for first 0.5-1 second impact"
        pacing: "Faster cuts, more visual variety"
        captions: "Instagram native text style"
        music: "Trending or original audio"
        cta: "Follow for more / Save this / Link in bio"
      output_length: "7-90 seconds"

    carousel_from_thread:
      source: "X/Twitter thread or LinkedIn post"
      transformation:
        slide_1: "Hook slide (question or bold statement)"
        slides_2_to_9: "One point per slide, visual hierarchy"
        final_slide: "CTA + summary"
        design: "Consistent brand styling"
        caption: "Expands on carousel, asks engagement question"
      output_slides: "5-10 slides"

    carousel_from_video:
      source: "Any video content"
      transformation:
        extract: "3-7 key points from video"
        visualize: "Each point becomes a slide"
        add: "Original visuals, data viz, or text-based design"
        caption: "Reference original video, drive engagement"
      output_slides: "5-10 slides"

    story_from_any:
      source: "Any content"
      transformation:
        format: "Behind-the-scenes angle"
        content: "Teaser, reaction, or additional context"
        interactive: "Add poll, question, or quiz sticker"
        link: "Swipe up/link if applicable"
      output_length: "1-5 story frames"

  tiktok_adaptations:

    native_restyle:
      source: "Any video content"
      transformation:
        energy: "Match TikTok energy (usually higher)"
        hook: "First 0.5 seconds critical"
        format: "Native text styling"
        trends: "Incorporate trending sounds if relevant"
        raw: "Can be less polished than Instagram"
      output_length: "15-60 seconds"

    stitch_response:
      source: "Your own previous content"
      transformation:
        format: "React to or expand on previous post"
        hook: "Why you're revisiting this"
        value: "New angle or update"
      output_length: "30-60 seconds"

    series_episode:
      source: "Long-form content"
      transformation:
        break: "Into 3-7 part series"
        hook: "Each part needs standalone hook"
        continuity: "Part 1/5 format"
        cta: "Follow for next part"
      output_per_episode: "30-60 seconds"

  youtube_adaptations:

    shorts_from_long:
      source: "YouTube long-form"
      transformation:
        extract: "Best 30-60 second moments"
        hook: "Front-load the value"
        cta: "Watch full video (link in description)"
        vertical: "Crop or re-record for 9:16"
      output_length: "30-60 seconds"

    community_post:
      source: "Any content"
      transformation:
        format: "Poll, question, or update"
        content: "Engage subscribers between videos"
        purpose: "Keep community warm"
      output_format: "Text + optional image"

    premiere_clip:
      source: "Upcoming content"
      transformation:
        format: "Teaser for upcoming video"
        hook: "Best moment as preview"
        cta: "Set reminder for premiere"
      output_length: "15-30 seconds"

  linkedin_adaptations:

    text_post_from_video:
      source: "Any video content"
      transformation:
        extract: "Key insight or story"
        format: "Text with line breaks"
        hook: "First 2 lines must hook (preview cut-off)"
        structure: "Problem → Insight → Lesson → Question"
        hashtags: "3-5 relevant hashtags"
      output_length: "150-300 words"

    carousel_from_any:
      source: "Any educational content"
      transformation:
        format: "PDF carousel"
        design: "Professional, clean, readable"
        slides: "One clear point per slide"
        cta: "Final slide with action"
      output_slides: "5-12 slides"

    article_from_video:
      source: "Long-form video or podcast"
      transformation:
        transcribe: "Full transcript"
        edit: "Clean up for reading"
        structure: "Add headers, formatting"
        enhance: "Add context and links"
      output_length: "800-2000 words"

  x_twitter_adaptations:

    thread_from_any:
      source: "Any long-form content"
      transformation:
        tweet_1: "Hook + promise"
        tweets_2_to_n: "One point per tweet"
        final_tweet: "Summary + CTA"
        formatting: "Short paragraphs, emojis for visual breaks"
      output_tweets: "5-15 tweets"

    single_tweet_from_any:
      source: "Any content"
      transformation:
        extract: "Single most tweetable insight"
        format: "Under 280 characters"
        hook: "Standalone value"
      output_length: "1 tweet"

    quote_tweet_expansion:
      source: "Your own previous tweet/thread"
      transformation:
        format: "Quote previous tweet, add context"
        value: "Update, expansion, or new angle"
      output_length: "1-2 tweets"

  podcast_adaptations:

    audiogram:
      source: "Podcast episode"
      transformation:
        clip: "30-60 second highlight"
        visual: "Waveform or static image"
        captions: "Full transcription"
        branding: "Podcast name, episode info"
      output_length: "30-60 seconds"

    episode_summary:
      source: "Full podcast episode"
      transformation:
        format: "Blog post or LinkedIn article"
        structure: "Key takeaways with timestamps"
        cta: "Link to full episode"
      output_length: "500-1000 words"

    micro_episode:
      source: "Long podcast episode"
      transformation:
        extract: "Single topic segment"
        format: "Standalone mini-episode"
        distribution: "Podcast feed or social"
      output_length: "3-10 minutes"
```

### Phase 4: Content Atomization Strategies

Systematic approaches to content multiplication.

```yaml
atomization_strategies:

  podcast_atomization:
    input: "1 podcast episode (30-60 minutes)"
    outputs:
      - type: "3-5 video clips"
        length: "30-60 seconds each"
        platforms: ["TikTok", "Instagram Reels", "YouTube Shorts"]

      - type: "3-5 audiograms"
        length: "30-60 seconds each"
        platforms: ["Instagram", "LinkedIn", "X/Twitter"]

      - type: "5-10 quote graphics"
        format: "Static image"
        platforms: ["Instagram Feed", "LinkedIn", "X/Twitter"]

      - type: "1-2 X/Twitter threads"
        length: "5-12 tweets each"
        platforms: ["X/Twitter", "LinkedIn (adapted)"]

      - type: "1 LinkedIn article"
        length: "800-1500 words"
        platforms: ["LinkedIn"]

      - type: "1 blog post"
        length: "1000-2000 words"
        platforms: ["Website", "Medium"]

      - type: "5-10 Instagram Stories"
        format: "Behind-the-scenes, quotes, polls"
        platforms: ["Instagram"]

      - type: "1 YouTube video"
        length: "Full episode or condensed"
        platforms: ["YouTube"]

    total_output: "25-40 pieces from 1 episode"

  youtube_video_atomization:
    input: "1 YouTube video (10-20 minutes)"
    outputs:
      - type: "5-8 YouTube Shorts"
        length: "30-60 seconds each"
        extraction: "Best standalone moments"

      - type: "5-8 TikTok/Reels"
        length: "15-60 seconds each"
        adaptation: "Platform-native styling"

      - type: "1-2 Instagram Carousels"
        slides: "5-10 slides each"
        extraction: "Key frameworks or lists"

      - type: "1-2 X/Twitter threads"
        length: "5-12 tweets"
        extraction: "Main points as thread"

      - type: "3-5 LinkedIn posts"
        format: "Text posts with insights"
        extraction: "Key professional takeaways"

      - type: "5-10 quote graphics"
        format: "Static images"
        platforms: ["All"]

      - type: "1 blog post"
        length: "1000-2000 words"
        format: "Transcript-based article"

    total_output: "25-35 pieces from 1 video"

  carousel_atomization:
    input: "1 Instagram Carousel (10 slides)"
    outputs:
      - type: "1 X/Twitter thread"
        adaptation: "One slide = one tweet"

      - type: "1 LinkedIn carousel"
        adaptation: "PDF format, professional styling"

      - type: "1 LinkedIn text post"
        adaptation: "Narrative version of content"

      - type: "10 individual stories"
        adaptation: "One slide per story"

      - type: "5-10 quote graphics"
        extraction: "Key statements as images"

      - type: "1 video version"
        format: "Slide show with voiceover"
        platforms: ["TikTok", "Reels", "Shorts"]

    total_output: "15-25 pieces from 1 carousel"

  thread_atomization:
    input: "1 X/Twitter thread (10 tweets)"
    outputs:
      - type: "1 Instagram Carousel"
        adaptation: "One tweet = one slide"

      - type: "1 LinkedIn text post"
        adaptation: "Combined into one post"

      - type: "1 LinkedIn carousel"
        adaptation: "Designed slides"

      - type: "5-10 individual tweets"
        extraction: "Best tweets as standalones"

      - type: "1 video script"
        adaptation: "Thread as video talking points"
        platforms: ["TikTok", "Reels", "YouTube"]

      - type: "1 blog post"
        adaptation: "Expanded long-form version"

    total_output: "10-15 pieces from 1 thread"
```

### Phase 5: Format Translation Matrices

Specific translation rules for format conversion.

```yaml
format_translation_matrix:

  video_to_text:
    process:
      1: "Transcribe video (auto or manual)"
      2: "Edit transcript for readability"
      3: "Add structure (headers, bullets)"
      4: "Remove filler words and repetition"
      5: "Add context lost from visual"
      6: "Optimize for platform (length, formatting)"

    output_formats:
      blog_post:
        length: "1000-2000 words"
        structure: "Intro, body sections, conclusion"
        add: "Links, images, related content"

      linkedin_post:
        length: "150-300 words"
        structure: "Hook, insight, takeaway, question"
        formatting: "Short paragraphs, line breaks"

      twitter_thread:
        length: "5-15 tweets"
        structure: "Hook tweet, content tweets, CTA tweet"
        formatting: "Numbered or emoji bullets"

      email_newsletter:
        length: "500-1000 words"
        structure: "Personal intro, value, CTA"
        tone: "More personal than blog"

  text_to_video:
    process:
      1: "Identify key points (3-7 max)"
      2: "Write video script from points"
      3: "Add hook (different from text opening)"
      4: "Plan visuals for each point"
      5: "Record or create video"
      6: "Add captions and platform optimization"

    output_formats:
      talking_head:
        style: "Person on camera delivering content"
        best_for: "Personal brand, authority content"

      voiceover_broll:
        style: "Voice over relevant footage"
        best_for: "Educational, story-based"

      text_on_screen:
        style: "Animated text with background"
        best_for: "Quotes, data, quick tips"

      slide_video:
        style: "Carousel slides as video"
        best_for: "Repurposing carousels, tutorials"

  audio_to_visual:
    process:
      1: "Select audio segment (30-90 seconds)"
      2: "Transcribe segment"
      3: "Choose visual format"
      4: "Create visual elements"
      5: "Sync audio with visuals"
      6: "Add captions"

    output_formats:
      audiogram:
        visual: "Waveform + static background + captions"
        best_for: "Podcast clips, quotes"

      video_with_broll:
        visual: "Audio over relevant footage"
        best_for: "Story segments, narratives"

      animated_quotes:
        visual: "Key words animate on screen"
        best_for: "Impactful statements"

  image_to_video:
    process:
      1: "Gather images (5-15)"
      2: "Write script/voiceover"
      3: "Create Ken Burns or animation"
      4: "Add transitions and timing"
      5: "Add audio (voice or music)"
      6: "Add captions"

    output_formats:
      slideshow_video:
        format: "Images with transitions + voiceover"
        best_for: "Carousel to video conversion"

      before_after:
        format: "Transformation reveal"
        best_for: "Results, makeovers, progress"

      photo_story:
        format: "Images with text overlay narrative"
        best_for: "Behind-the-scenes, journey content"
```

### Phase 6: Repurpose Workflow by Original Format

Complete workflows for each original content type.

```yaml
repurpose_workflows:

  podcast_episode_workflow:
    original: "Podcast Episode (30-60 min)"

    immediate_outputs:
      day_0_to_1:
        - output: "Full episode to YouTube"
          format: "Video or audiogram full length"
          effort: "Low"

        - output: "Episode summary thread"
          format: "X/Twitter thread"
          effort: "Medium"

        - output: "3 quote graphics"
          format: "Static images"
          effort: "Low"

      day_1_to_3:
        - output: "5 video clips"
          format: "TikTok/Reels/Shorts"
          effort: "Medium"

        - output: "5 audiograms"
          format: "30-60 sec clips"
          effort: "Medium"

        - output: "LinkedIn article"
          format: "Long-form post"
          effort: "Medium"

      day_3_to_7:
        - output: "Blog post"
          format: "SEO-optimized article"
          effort: "High"

        - output: "Instagram Carousel"
          format: "Key frameworks visualized"
          effort: "Medium"

        - output: "Email newsletter"
          format: "Episode highlights"
          effort: "Low"

    total_timeline: "7 days"
    total_outputs: "15-20 pieces"

  youtube_video_workflow:
    original: "YouTube Video (10-20 min)"

    immediate_outputs:
      day_0:
        - output: "YouTube Shorts (3-5)"
          format: "Best clips vertical"
          effort: "Medium"

        - output: "TikTok clips (3-5)"
          format: "Platform-native adaptation"
          effort: "Medium"

      day_1_to_2:
        - output: "Instagram Reels (3-5)"
          format: "IG-optimized clips"
          effort: "Medium"

        - output: "Twitter thread"
          format: "Video key points"
          effort: "Medium"

        - output: "LinkedIn post"
          format: "Professional takeaways"
          effort: "Low"

      day_2_to_5:
        - output: "Instagram Carousel"
          format: "Framework visualization"
          effort: "Medium"

        - output: "Quote graphics (5-7)"
          format: "Best statements"
          effort: "Low"

        - output: "Blog post"
          format: "Transcript + expansion"
          effort: "High"

    total_timeline: "5 days"
    total_outputs: "20-30 pieces"

  carousel_workflow:
    original: "Instagram Carousel (10 slides)"

    immediate_outputs:
      day_0:
        - output: "Twitter thread"
          format: "Direct adaptation"
          effort: "Low"

        - output: "LinkedIn carousel"
          format: "PDF format"
          effort: "Low"

      day_1:
        - output: "LinkedIn text post"
          format: "Narrative version"
          effort: "Low"

        - output: "Instagram Stories (10)"
          format: "One slide per story"
          effort: "Low"

        - output: "TikTok/Reel video"
          format: "Slideshow with voiceover"
          effort: "Medium"

      day_2_to_3:
        - output: "Quote graphics (5)"
          format: "Key statements"
          effort: "Low"

        - output: "Blog post"
          format: "Expanded version"
          effort: "Medium"

    total_timeline: "3 days"
    total_outputs: "10-15 pieces"

  thread_workflow:
    original: "X/Twitter Thread (10+ tweets)"

    immediate_outputs:
      day_0:
        - output: "Individual tweets"
          format: "Best tweets standalone"
          effort: "Low"

        - output: "LinkedIn post"
          format: "Combined narrative"
          effort: "Low"

      day_1:
        - output: "Instagram Carousel"
          format: "Tweet per slide"
          effort: "Medium"

        - output: "TikTok script"
          format: "Thread as video points"
          effort: "Medium"

      day_2_to_3:
        - output: "Blog post"
          format: "Expanded article"
          effort: "High"

        - output: "Quote graphics"
          format: "Key tweets visualized"
          effort: "Low"

    total_timeline: "3 days"
    total_outputs: "8-12 pieces"
```

---

## OUTPUT SPECIFICATION

### Repurpose Multiplication Plan (RMP)

```yaml
# REPURPOSE MULTIPLICATION PLAN (RMP)
# Campaign: [Name]
# Original Content: [Content ID]
# Created: [Date]
# Version: 1.0

rmp_metadata:
  campaign_name:
  original_content_id:
  original_content_title:
  original_platform:
  original_format:
  original_publish_date:
  original_performance:
    views:
    engagement_rate:
    top_performing_element:
  prepared_by:
  date_prepared:
  version: "1.0"

## SECTION 1: ATOMIZATION INVENTORY
atomization:
  hooks:
    - text: |
      timestamp: "[If video]"
      variant_potential: []

  key_insights:
    - insight: |
      timestamp: "[If video]"
      variant_potential: []

  memorable_quotes:
    - quote: |
      character_count:
      variant_potential: []

  story_beats:
    - story: |
      timestamp: "[If video]"
      variant_potential: []

  frameworks:
    - framework: |
      steps:
      variant_potential: []

  data_points:
    - data: |
      variant_potential: []

## SECTION 2: VARIANT PLAN
variants:
  - variant_id: "[Original-ID]-V01"
    variant_type: "[TikTok Clip]"
    source_element: "[Which atomic unit]"
    platform: "[Target platform]"
    format: "[Specific format]"
    length: "[Duration or count]"
    production_needs:
      editing: "[Yes/No/Minimal]"
      new_recording: "[Yes/No]"
      design: "[Yes/No]"
    priority: "[High/Medium/Low]"
    timeline: "[Day X]"
    status: "[Planned/In Production/Ready/Published]"

  # [Continue for all variants]

## SECTION 3: PRODUCTION QUEUE
production_queue:
  immediate:
    day_0:
      - variant_id:
        assignee:
        status:

  short_term:
    day_1_to_3:
      - variant_id:
        assignee:
        status:

  extended:
    day_3_plus:
      - variant_id:
        assignee:
        status:

## SECTION 4: PLATFORM DISTRIBUTION
distribution:
  per_platform:
    instagram:
      variants: []
      scheduling_notes:

    tiktok:
      variants: []
      scheduling_notes:

    youtube:
      variants: []
      scheduling_notes:

    linkedin:
      variants: []
      scheduling_notes:

    x_twitter:
      variants: []
      scheduling_notes:

## SECTION 5: CROSS-REFERENCE STRATEGY
cross_reference:
  internal_linking:
    - variant_id:
      references: "[Original or other variants]"
      method: "[Link in bio, comment, caption, etc.]"

  content_callbacks:
    - variant: "[Which variant]"
      callback_to: "[Which original/variant]"
      callback_method: "[How referenced]"

## SECTION 6: TRACKING
tracking:
  metrics_per_variant:
    - variant_id:
      platform:
      views:
      engagement:
      compared_to_average:
      learnings:

  aggregate_metrics:
    total_variants_created:
    total_additional_reach:
    best_performing_variant:
    best_performing_platform:

## SOURCE FILES
source_files:
  original_content: "[path]"
  platform_strategy: "[path]"
  brand_voice: "[path]"
```

---

## QUALITY GATES

### Anti-Degradation Checks

```yaml
rmp_quality_gates:

  atomization_validation:
    - check: "Content fully atomized (all unit types checked)"
      status: [Pass/Fail]

    - check: "Each atomic unit has variant potential assessed"
      status: [Pass/Fail]

  variant_validation:
    - check: "Minimum 10 variants identified"
      status: [Pass/Fail]
      actual_count: [Number]

    - check: "Variants cover 3+ platforms"
      status: [Pass/Fail]
      platforms_covered: []

    - check: "Each variant has clear source element"
      status: [Pass/Fail]

    - check: "Each variant has production needs defined"
      status: [Pass/Fail]

  quality_validation:
    - check: "Variants maintain brand voice"
      status: [Pass/Fail]

    - check: "Variants are platform-native (not cross-posted)"
      status: [Pass/Fail]

    - check: "Each variant adds value (not just reformatting)"
      status: [Pass/Fail]

  timeline_validation:
    - check: "Production timeline is realistic"
      status: [Pass/Fail]

    - check: "Scheduling coordinates with S15"
      status: [Pass/Fail]

quality_gate_decision: [APPROVED / REVISION REQUIRED]
revision_notes: "[If required, what needs fixing]"
```

---

## TEMPLATES

### Atomization Worksheet Template

```yaml
atomization_worksheet:
  content_id:
  content_title:
  content_type:
  content_length:

  hooks_identified:
    - hook_id: "H1"
      text: |
      timestamp:
      strength: [1-10]
      standalone: [Yes/No]
      best_platforms: []

  insights_identified:
    - insight_id: "I1"
      insight: |
      timestamp:
      single_idea: [Yes/No]
      standalone: [Yes/No]
      best_platforms: []

  quotes_identified:
    - quote_id: "Q1"
      quote: |
      character_count:
      tweetable: [Yes/No]
      visual_potential: [High/Medium/Low]

  stories_identified:
    - story_id: "S1"
      summary: |
      timestamp:
      complete: [Yes/No]
      emotional_impact: [High/Medium/Low]

  frameworks_identified:
    - framework_id: "F1"
      name: |
      steps:
      carousel_ready: [Yes/No]

  data_identified:
    - data_id: "D1"
      data_point: |
      source:
      visual_potential: [High/Medium/Low]

  controversial_takes:
    - take_id: "T1"
      take: |
      engagement_potential: [High/Medium/Low]
      risk: [High/Medium/Low]
```

### Variant Production Brief Template

```yaml
variant_production_brief:
  variant_id:
  source_content_id:
  variant_type:
  target_platform:
  target_format:

  source_element:
    atomic_unit_id:
    description: |
    timestamp: "[If applicable]"

  transformation_required:
    editing: |
    new_content_needed: |
    design_needed: |
    caption_needed: |

  platform_requirements:
    aspect_ratio:
    length:
    caption_length:
    hashtags:

  brand_alignment:
    voice_notes: |
    visual_style: |
    cta:

  production_checklist:
    - [ ] Source element extracted
    - [ ] Platform requirements met
    - [ ] Hook optimized for platform
    - [ ] Captions/subtitles added
    - [ ] Brand elements included
    - [ ] CTA clear
    - [ ] Quality check passed

  assignee:
  due_date:
  status: [Planned/In Production/Review/Ready]
```

### Repurpose Calendar Template

```yaml
repurpose_calendar:
  original_content:
    id:
    title:
    publish_date:

  day_0:
    - time:
      platform:
      variant_id:
      variant_type:
      status:

  day_1:
    - time:
      platform:
      variant_id:
      variant_type:
      status:

  day_2:
    # [Continue pattern]

  day_3:
    # [Continue pattern]

  day_7:
    # [Continue pattern]

  day_14:
    # [Evergreen repurpose opportunities]

  day_30:
    # [Long-term repurpose opportunities]
```

---

## EXAMPLES

### Example 1: Podcast Episode Full Multiplication

```yaml
example_podcast_multiplication:
  original:
    content_id: "POD-2026-EP042"
    title: "The Future of AI in Creative Work"
    platform: "Podcast (Audio + Video)"
    length: "45 minutes"
    publish_date: "2026-03-10"

  atomization:
    hooks:
      - "The moment I realized AI was going to change everything"
      - "Here's the skill that AI will never replace"
      - "My controversial prediction for 2027"

    key_insights:
      - "AI as a creative amplifier, not replacement"
      - "The 3-tier framework for AI adoption"
      - "Why most creators are using AI wrong"
      - "The human element that becomes more valuable"

    memorable_quotes:
      - "AI doesn't replace creativity — it reveals who was never really creative"
      - "The prompt is the new skill, but taste is still the superpower"
      - "In 5 years, not using AI will be like not using email in 2005"

    stories:
      - "The first time I used AI and was scared"
      - "Client story: how AI saved a failing campaign"
      - "The mistake that taught me AI's limitations"

    frameworks:
      - "3-Tier AI Adoption Framework"
      - "The Human-AI Collaboration Model"

  variant_plan:
    day_0:
      - variant_id: "POD-042-V01"
        type: "Full episode to YouTube"
        platform: "YouTube"
        format: "Video (full length)"
        effort: "Low"
        status: "Ready"

      - variant_id: "POD-042-V02"
        type: "Twitter thread summary"
        platform: "X/Twitter"
        format: "10-tweet thread"
        source: "Key insights compiled"
        effort: "Medium"
        status: "Ready"

      - variant_id: "POD-042-V03"
        type: "Quote graphic 1"
        platform: "Instagram/LinkedIn"
        format: "Static image"
        source: "Quote: 'AI doesn't replace creativity...'"
        effort: "Low"
        status: "Ready"

    day_1:
      - variant_id: "POD-042-V04"
        type: "TikTok clip 1"
        platform: "TikTok"
        format: "45-sec video"
        source: "Hook: 'The skill AI will never replace'"
        timestamp: "12:30-13:15"
        effort: "Medium"

      - variant_id: "POD-042-V05"
        type: "Instagram Reel 1"
        platform: "Instagram"
        format: "60-sec video"
        source: "Story: First time scared of AI"
        timestamp: "08:45-09:45"
        effort: "Medium"

      - variant_id: "POD-042-V06"
        type: "LinkedIn post"
        platform: "LinkedIn"
        format: "Text post"
        source: "3-Tier Framework summary"
        effort: "Low"

    day_2:
      - variant_id: "POD-042-V07"
        type: "YouTube Short 1"
        platform: "YouTube"
        format: "50-sec vertical"
        source: "Controversial prediction"
        timestamp: "32:00-32:50"

      - variant_id: "POD-042-V08"
        type: "Audiogram 1"
        platform: "Instagram/LinkedIn"
        format: "Audio + waveform"
        source: "Quote moment"
        timestamp: "18:20-19:00"

      - variant_id: "POD-042-V09"
        type: "Quote graphic 2"
        platform: "All"
        format: "Static image"
        source: "Prompt is new skill quote"

    day_3:
      - variant_id: "POD-042-V10"
        type: "Instagram Carousel"
        platform: "Instagram"
        format: "8-slide carousel"
        source: "3-Tier Framework visualized"
        effort: "High"

      - variant_id: "POD-042-V11"
        type: "TikTok clip 2"
        platform: "TikTok"
        format: "35-sec video"
        source: "Client story highlight"

    day_5:
      - variant_id: "POD-042-V12"
        type: "Blog post"
        platform: "Website"
        format: "1500-word article"
        source: "Full transcript + expansion"
        effort: "High"

      - variant_id: "POD-042-V13"
        type: "LinkedIn article"
        platform: "LinkedIn"
        format: "Long-form article"
        source: "Blog adapted for LinkedIn"

    day_7:
      - variant_id: "POD-042-V14"
        type: "Email newsletter"
        platform: "Email"
        format: "Episode summary + insights"
        source: "Key takeaways curated"

  total_variants: 14
  total_reach_multiplier: "10x+ original episode reach"
```

### Example 2: Instagram Reel Multiplication

```yaml
example_reel_multiplication:
  original:
    content_id: "OME-2026-Q1-042"
    title: "The 5-Second Rule That Changed My Business"
    platform: "Instagram"
    format: "Reel (60 seconds)"
    performance:
      views: 125,000
      engagement_rate: "8.2%"
      saves: 4,500

  atomization:
    hooks:
      - "The 5-second rule changed everything"

    key_insights:
      - insight_1: "Act before your brain talks you out of it"
      - insight_2: "Momentum beats motivation"
      - insight_3: "Small decisions compound"
      - insight_4: "Fear has a 5-second window"
      - insight_5: "Action creates clarity"

    quotes:
      - "5 seconds is all it takes to change your trajectory"
      - "Your brain will always find reasons not to act"

  variant_plan:
    immediate:
      - variant_id: "OME-042-V01"
        type: "TikTok version"
        platform: "TikTok"
        format: "Same content, TikTok native styling"
        adaptation: "More casual energy, trending sound consideration"

      - variant_id: "OME-042-V02"
        type: "YouTube Short"
        platform: "YouTube"
        format: "Same content, YouTube styling"
        adaptation: "Subscribe CTA, channel reference"

      - variant_id: "OME-042-V03"
        type: "Twitter thread"
        platform: "X/Twitter"
        format: "6-tweet thread"
        source: "5 insights as tweets"

    day_1:
      - variant_id: "OME-042-V04"
        type: "Instagram Carousel"
        platform: "Instagram"
        format: "7-slide carousel"
        source: "5 rules visualized + hook + CTA"

      - variant_id: "OME-042-V05"
        type: "LinkedIn post"
        platform: "LinkedIn"
        format: "Text post"
        source: "Professional angle on 5-second rule"

      - variant_id: "OME-042-V06"
        type: "Quote graphic"
        platform: "All"
        format: "Static image"
        source: "Best quote from video"

    day_2_to_3:
      - variant_id: "OME-042-V07"
        type: "Part 2 video"
        platform: "Instagram/TikTok"
        format: "60-sec video"
        source: "Deeper dive on most-commented point"

      - variant_id: "OME-042-V08"
        type: "Behind-the-scenes"
        platform: "Stories/TikTok"
        format: "Raw footage, process"

      - variant_id: "OME-042-V09"
        type: "Response to top comment"
        platform: "Same platforms"
        format: "Video responding to top question"

  total_variants: 9
  multiplier_effect: "Original reach 125K → Total reach 400K+"
```

---

## VALIDATION REQUIREMENTS

RMP passes when:

- [ ] Content fully atomized with all unit types checked
- [ ] Minimum 10 variants identified
- [ ] Variants cover 3+ platforms
- [ ] Each variant has clear source element
- [ ] Each variant has production needs defined
- [ ] Each variant is platform-native (not cross-posted)
- [ ] Production timeline is realistic
- [ ] Scheduling coordinates with S15
- [ ] Cross-reference strategy defined
- [ ] Tracking metrics identified

---

## OUTPUT LOCATION

Save RMP to:
```
skills/distribution/S18-repurpose-multiplication/outputs/[original-content-id]-RMP.yaml
```

Save individual variants to:
```
skills/distribution/S18-repurpose-multiplication/outputs/variants/[variant-id].yaml
```

---

## NEXT SKILL

Upon completion, variants enter the production pipeline (S08-S14) as needed, then flow through S15-S17 for distribution.

---

*One piece of content is a seed. Multiplication is the garden. The difference between a creator who struggles and one who dominates is not the quality of seeds — it is the system of multiplication.*
