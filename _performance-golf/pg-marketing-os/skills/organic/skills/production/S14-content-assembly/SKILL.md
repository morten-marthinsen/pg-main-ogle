---
name: content-assembly
description: >-
  Final content package assembly for organic social media publishing.
  Use when all production elements (scripts, captions, visual direction,
  Arena-tested content) are complete and need to be integrated into a single
  deployable asset. Produces ready-to-publish content packages with all
  components unified — copy, visuals, distribution notes, and platform-specific
  adaptations. Validates virality scores meet minimum thresholds before
  assembly. Trigger when users mention content assembly, final package,
  ready to publish, content compilation, or assembling production elements.
  Requires Campaign Brief File (CBF) plus relevant production skill outputs.
---

# S14: CONTENT ASSEMBLY
## Final Content Package Assembly
## Gate: G07 (Requires S07 CBF) | Output: Ready-to-Publish Package

---

## PURPOSE

This skill assembles all production elements into a final, ready-to-publish content package. It integrates script, caption, visual direction, and distribution notes into a single deployable asset.

**Output:** Complete content package ready for publishing
**Prerequisite:** Campaign Brief File (CBF) + relevant production skill outputs

---

## REQUIRED CONTEXT

### Load Before Execution
- `CLAUDE-CORE.md` — Inviolable laws
- Campaign Brief File (CBF) from S07
- All relevant production outputs (S08-S13)
- Anti-degradation protocols

### Quality Gates to Verify
- Content has passed through Arena (S13)
- Virality Score meets threshold from VSF
- Voice alignment verified against BVF
- Anti-slop check passed

---

## INPUT REQUIREMENTS

```yaml
assembly_inputs:
  content_id: [Unique identifier for this piece]
  content_title: [Working title]
  platform: [Primary platform]
  secondary_platforms: [For adaptation]
  content_type: [Reel/carousel/thread/long-form/etc]
  content_function: [Awareness/Engagement/Conversion/Community]
  pillar: [From CAF]

  production_outputs:
    script: [From S08, if applicable]
    caption: [From S09]
    carousel_slides: [From S10, if applicable]
    thread: [From S11, if applicable]
    visual_direction: [From S12]
    arena_synthesis: [From S13]

  scheduling_context:
    target_date: [When to publish]
    target_time: [Optimal time from PSF]
    campaign: [Campaign name]
    sequence_position: [If part of series]
```

---

## PROCESS

### Phase 1: Component Verification

Verify all required components exist:

```yaml
verification_checklist:
  strategy_layer:
    - [ ] CBF exists and is valid
    - [ ] Content aligns with CBF objectives
    - [ ] Pillar assignment correct
    - [ ] Function assignment correct

  production_layer:
    video_content:
      - [ ] Script complete (S08)
      - [ ] Visual direction provided (S12)
      - [ ] Arena synthesis complete (S13)

    carousel_content:
      - [ ] All slides defined (S10)
      - [ ] Visual direction per slide (S12)
      - [ ] Arena synthesis complete (S13)

    thread_content:
      - [ ] All tweets/posts complete (S11)
      - [ ] Arena synthesis complete (S13)

    all_content:
      - [ ] Caption written (S09)
      - [ ] Hashtag strategy applied
      - [ ] CTA defined
      - [ ] Visual assets directed

  quality_layer:
    - [ ] Virality Score meets minimum (from VSF)
    - [ ] Voice check passed (from BVF)
    - [ ] Anti-slop check passed
    - [ ] Platform specs verified
```

### Phase 2: Quality Score Compilation

Compile and verify quality metrics:

```yaml
quality_compilation:
  virality_score:
    hook_strength: [0-10]
    emotional_resonance: [0-10]
    practical_value: [0-10]
    social_currency: [0-10]
    story_structure: [0-10]
    platform_fit: [0-10]
    specificity: [0-10]
    voice_alignment: [0-10]
    overall_score: [0-100]
    threshold_met: [Yes/No]

  arena_synthesis:
    personas_used: [List]
    winning_elements: [From each persona]
    synthesis_notes: |

  quality_gates:
    minimum_score: 60
    target_score: 75
    actual_score: [Number]
    decision: [Publish/Revise/Kill]

  revision_notes:
    if_below_threshold: |
      [What needs improvement]
    improvement_priority: [Which dimensions to focus on]
```

### Phase 3: Content Package Assembly

Assemble all elements into unified package:

```yaml
content_package:
  ## METADATA
  metadata:
    content_id:
    title:
    platform:
    content_type:
    content_function:
    pillar:
    campaign:
    created_date:
    target_publish_date:
    status: [Draft/Ready/Published]

  ## CONTENT ELEMENTS
  primary_content:
    # For video content
    script:
      hook: |
      body: |
      cta: |
      full_script: |

    # For carousel content
    slides:
      - slide_number:
        headline:
        body:
        visual_direction:

    # For thread content
    tweets:
      - tweet_number:
        content:
        media_notes:

  ## CAPTION
  caption:
    platform:
    hook: |
    body: |
    cta: |
    hashtags: []
    full_caption: |

  ## VISUAL DIRECTION
  visuals:
    thumbnail:
      concept:
      composition:
      text_elements:
      technical_specs:

    additional_visuals:
      - asset_type:
        direction:

  ## DISTRIBUTION
  distribution:
    primary_platform:
      platform:
      post_time:
      post_type:
      hashtags: []

    secondary_platforms:
      - platform:
        adaptation_notes:
        post_time:

    engagement_protocol:
      first_hour_actions: []
      response_guidelines: |

  ## QUALITY
  quality_verification:
    virality_score:
    arena_passed:
    voice_check:
    anti_slop_check:
    final_approval:

  ## PRODUCTION NOTES
  production_notes:
    filming_requirements: |
    editing_notes: |
    design_requirements: |
    special_instructions: |
```

### Phase 4: Platform Adaptation

Create platform-specific versions:

```yaml
platform_adaptations:
  primary_version:
    platform:
    format:
    all_assets_ready: [Yes/No]

  adaptations:
    - platform:
      adaptation_type: [Repurpose/Resize/Reformat]
      changes_required:
        format_change: |
        caption_adjustment: |
        hashtag_adjustment: |
        visual_adjustment: |
      post_timing:

  repurpose_cascade:
    original_format:
    repurpose_1:
      format:
      platform:
      adaptation_notes:

    repurpose_2:
      format:
      platform:
      adaptation_notes:
```

### Phase 5: Distribution Checklist

Pre-flight check before scheduling:

```yaml
pre_publish_checklist:
  content_verification:
    - [ ] All copy proofread
    - [ ] No placeholder text remaining
    - [ ] Links verified working
    - [ ] Mentions/tags correct
    - [ ] Hashtags appropriate

  visual_verification:
    - [ ] All visuals match direction
    - [ ] Correct dimensions
    - [ ] Text readable at small size
    - [ ] Brand consistent
    - [ ] No watermarks or errors

  platform_verification:
    - [ ] Meets platform specs
    - [ ] Appropriate for platform culture
    - [ ] Caption within character limits
    - [ ] Media properly formatted

  strategic_verification:
    - [ ] Aligns with campaign objectives
    - [ ] Posted at optimal time
    - [ ] Part of content calendar
    - [ ] Engagement protocol ready

  quality_verification:
    - [ ] Virality score meets threshold
    - [ ] Arena synthesis complete
    - [ ] Voice alignment confirmed
    - [ ] Anti-slop check passed
```

### Phase 6: Handoff Documentation

Create handoff package for execution:

```yaml
handoff_package:
  summary:
    content_id:
    title:
    platform:
    publish_date:
    publish_time:

  files_required:
    - file_type:
      description:
      status: [Ready/Needs creation]
      responsible:

  copy_to_post:
    caption: |
      [Ready-to-paste caption]

    hashtags: |
      [Ready-to-paste hashtags]

  visual_assets:
    - asset:
      specs:
      status:
      file_location:

  post_publish_actions:
    first_hour:
      - action:
        timing:
    ongoing:
      - action:
        frequency:

  tracking:
    metrics_to_track: []
    reporting_schedule:
    success_criteria:
```

---

## OUTPUT FORMAT

```yaml
assembled_content:
  ## OVERVIEW
  content_id:
  title:
  platform:
  content_type:
  publish_date:
  publish_time:
  status:

  ## CONTENT
  full_content:
    script_or_copy: |
    caption: |
    hashtags: []

  ## VISUALS
  visual_direction:
    primary_visual: |
    supporting_visuals: []

  ## DISTRIBUTION
  distribution_plan:
    primary_platform:
    secondary_platforms: []
    engagement_protocol: |

  ## QUALITY
  quality_scores:
    virality_score:
    arena_passed: [Yes/No]
    quality_gate: [Pass/Fail]

  ## PRODUCTION
  production_requirements:
    filming: |
    editing: |
    design: |

  ## CHECKLISTS
  pre_publish_checklist: []
  post_publish_actions: []

  ## TRACKING
  metrics_to_track: []
  success_criteria: |
```

---

## VALIDATION REQUIREMENTS

Package must pass:
- [ ] All required components present
- [ ] Virality Score meets threshold
- [ ] Arena synthesis complete
- [ ] Voice check passed
- [ ] Anti-slop check passed
- [ ] Platform specs verified
- [ ] Distribution plan complete
- [ ] Pre-publish checklist complete

---

## PACKAGE STATUSES

```yaml
status_definitions:
  draft:
    description: "In production, not ready"
    allowed_actions: ["Edit", "Delete"]

  review:
    description: "Ready for quality review"
    allowed_actions: ["Approve", "Revise", "Delete"]

  ready:
    description: "Approved, ready to publish"
    allowed_actions: ["Schedule", "Publish", "Revise"]

  scheduled:
    description: "Scheduled for future publish"
    allowed_actions: ["Reschedule", "Unschedule", "Edit"]

  published:
    description: "Live on platform"
    allowed_actions: ["Track", "Repurpose", "Archive"]

  archived:
    description: "No longer active"
    allowed_actions: ["Restore", "Delete"]
```

---

*Assembly is where strategy meets execution. Every piece must be deployment-ready.*
