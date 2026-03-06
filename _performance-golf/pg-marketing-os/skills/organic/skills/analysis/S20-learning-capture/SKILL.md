---
name: learning-capture
description: >-
  Meta-learning system that makes the Organic Engine smarter over time. Use after
  performance analysis (S19) is complete and insights need to be propagated into
  the engine's knowledge bases. This skill does not just record what happened — it
  updates teachings, calibrates prediction models, promotes winning patterns into
  specimen libraries, and refines skill parameters. Produces system-level updates
  to YAML files, specimen libraries, hook databases, and timing matrices. Trigger
  when users mention capturing learnings, updating the system, feeding insights
  back, improving predictions, or making the engine smarter. Requires S19
  Performance Analysis output with learning flags.
---

# S20: Learning Capture

## SKILL IDENTITY

**Skill ID:** S20-learning-capture
**Name:** Learning Capture
**Version:** 1.0.0
**Category:** Analysis
**Position in Pipeline:** Post-Performance Analysis → Learning Capture → System Update Loop

**Purpose:**
Transform individual performance insights into system-level intelligence. This is the meta-learning layer that makes the Organic Marketing Engine smarter over time. Learning Capture doesn't just record what happened—it updates the engine's knowledge bases, calibrates prediction models, and promotes winning patterns into teachable assets.

**Core Function:**
Systematically capture, categorize, validate, and propagate learnings across the engine's knowledge infrastructure, ensuring every piece of content makes the system smarter.

**Integration Points:**
- **Upstream:** Receives learning flags and insights from S19-performance-analysis
- **Downstream:** Updates to YAML files, specimen libraries, hook databases, timing matrices
- **Lateral:** Feeds calibration data back to S05-virality-scoring; updates templates for S07-S16

**The Learning Loop:**
```
Content Published → Performance Analyzed (S19) → Learning Captured (S20) →
System Updated → Better Predictions → Better Content → [Repeat]
```

---

## PREREQUISITES

### Gate Requirements

**Data Prerequisites:**
- [ ] S19 Performance Analysis Report completed for content
- [ ] Performance data meets minimum sample requirements
- [ ] Learning flags set by S19 analysis
- [ ] Current system baselines accessible for comparison

**Access Prerequisites:**
- [ ] Write access to YAML teaching files
- [ ] Write access to specimen library
- [ ] Write access to hook database
- [ ] Write access to timing matrices
- [ ] Write access to learning log

**Validation Prerequisites:**
- [ ] Learning has sufficient evidence (not single-instance)
- [ ] Learning is actionable (changes something in the system)
- [ ] Learning is falsifiable (can be disproven with future data)

---

## INPUT REQUIREMENTS

### Primary Input: S19 Learning Flags

```yaml
learning_capture_input:
  source_report:
    report_id: string
    content_id: string
    analysis_date: date
    platform: string

  learning_flags:
    promote_to_specimen: boolean
    update_hook_data: boolean
    update_timing_data: boolean
    update_format_data: boolean
    calibration_adjustment_needed: boolean
    failure_mode_detected: boolean
    pattern_discovery: boolean

  performance_summary:
    performance_grade: string
    view_index: float
    engagement_index: float
    virality_predicted: float
    virality_actual: float
    calibration_deviation: float

  insights:
    what_worked: list
    what_didnt_work: list
    why: list

  content_metadata:
    hook_used: string
    hook_category: string
    format_type: string
    content_pillar: string
    posting_time: datetime
    platform: string
```

### Secondary Input: Historical Context

```yaml
historical_context:
  similar_learnings:
    - learning_id: string
      date: date
      insight: string
      action_taken: string
      result: string

  current_baselines:
    hook_category_baselines:
      [category]:
        avg_performance: float
        sample_size: integer
        last_updated: date
    format_baselines:
      [format]:
        avg_performance: float
        sample_size: integer
        last_updated: date
    timing_baselines:
      [time_slot]:
        avg_performance: float
        sample_size: integer
        last_updated: date

  active_hypotheses:
    - hypothesis_id: string
      statement: string
      evidence_for: integer
      evidence_against: integer
      status: string
```

---

## PROCESS

### Phase 1: Learning Categorization

**Step 1.1: Classify Learning Type**

Every learning must be categorized into one of these types:

```yaml
learning_categories:
  hook_insights:
    description: "Learnings about what hooks work and why"
    update_targets:
      - hook_database
      - hook_category_baselines
      - virality_scoring_weights
    examples:
      - "Specificity in numbers increases hook effectiveness"
      - "Exclusivity triggers outperform listicle openings"
      - "Question hooks underperform on TikTok vs Instagram"

  format_insights:
    description: "Learnings about content formats and structures"
    update_targets:
      - format_baselines
      - format_templates
      - platform_preferences
    examples:
      - "Carousels with 7 slides outperform 10-slide carousels"
      - "Face-on-screen first frame increases retention"
      - "Text overlay in first 0.5s improves scroll-stop"

  timing_insights:
    description: "Learnings about when to post"
    update_targets:
      - timing_matrices
      - scheduling_defaults
      - platform_timing_data
    examples:
      - "Tuesday 10am outperforming all other slots by 40%"
      - "Weekend posts declining in engagement"
      - "LinkedIn best before 8am or after 6pm"

  audience_insights:
    description: "Learnings about who responds and why"
    update_targets:
      - audience_personas
      - content_pillar_assignments
      - messaging_frameworks
    examples:
      - "AI content attracts but doesn't convert to follows"
      - "Personal story content has highest follow rate"
      - "Controversial takes get engagement but negative sentiment"

  platform_insights:
    description: "Learnings about platform-specific behavior"
    update_targets:
      - platform_playbooks
      - cross_posting_rules
      - algorithm_assumptions
    examples:
      - "TikTok now favoring longer watch time over completion"
      - "Instagram deprioritizing reels with TikTok watermark"
      - "LinkedIn algorithm boosted posts with documents"

  calibration_insights:
    description: "Learnings about prediction accuracy"
    update_targets:
      - virality_scoring_model
      - prediction_confidence_levels
      - baseline_calculations
    examples:
      - "Model consistently over-predicting listicle content"
      - "Controversy hooks have high variance—widen confidence interval"
      - "Baseline needs recalculation after 50+ sample threshold"

  failure_modes:
    description: "Documented patterns of what doesn't work"
    update_targets:
      - anti_patterns_database
      - quality_gate_checks
      - warning_triggers
    examples:
      - "Generic hook + oversaturated topic = guaranteed underperformance"
      - "Cross-posting without native optimization fails consistently"
      - "Posting during major news events suppresses all content"
```

**Step 1.2: Assess Learning Strength**

Rate the strength of each learning:

```yaml
learning_strength_assessment:
  evidence_level:
    single_instance:
      strength: "weak"
      action: "log and monitor"
      confidence: 0.3

    multiple_instances_same_pattern:
      strength: "moderate"
      action: "flag for potential update"
      confidence: 0.6
      threshold: "3+ instances"

    statistically_significant:
      strength: "strong"
      action: "implement system update"
      confidence: 0.85
      threshold: "p < 0.05 or 10+ instances"

    proven_pattern:
      strength: "definitive"
      action: "update as system truth"
      confidence: 0.95
      threshold: "consistent across 30+ instances, no contradictions"
```

**Step 1.3: Validate Against Existing Knowledge**

Check if learning confirms, contradicts, or extends existing system knowledge:

```yaml
knowledge_validation:
  confirms_existing:
    action: "strengthen confidence in existing knowledge"
    update: "increment evidence counter"

  contradicts_existing:
    action: "investigate discrepancy"
    options:
      - "New learning is anomaly (discard)"
      - "Context changed (update with conditions)"
      - "Previous knowledge was wrong (replace)"
    requires: "additional evidence before action"

  extends_existing:
    action: "add nuance to existing knowledge"
    update: "append conditional or contextual layer"
    example: "Hook type X works, but only on Platform Y"

  novel:
    action: "add as new knowledge with appropriate confidence"
    update: "create new entry in relevant database"
```

### Phase 2: Calibration Tracking

**Step 2.1: Log Prediction vs Reality**

Every content piece with a Virality Score prediction must be tracked:

```yaml
calibration_log_entry:
  content_id: string
  date: date

  prediction:
    score: float
    range: string
    confidence: float
    key_factors: list

  reality:
    actual_equivalent_score: float
    actual_range: string

  deviation:
    points: float
    percentage: float
    direction: string  # "over" or "under"

  contributing_factors:
    - factor: string
      impact: string
```

**Step 2.2: Calculate Rolling Calibration Metrics**

```yaml
calibration_metrics:
  overall:
    mean_absolute_error: float
    mean_signed_error: float  # Positive = over-predicting
    accuracy_rate: float      # % within acceptable range

  by_hook_category:
    [category]:
      sample_size: integer
      mean_error: float
      bias_direction: string

  by_format:
    [format]:
      sample_size: integer
      mean_error: float
      bias_direction: string

  by_content_pillar:
    [pillar]:
      sample_size: integer
      mean_error: float
      bias_direction: string
```

**Step 2.3: Trigger Calibration Updates**

When calibration metrics cross thresholds, flag for model update:

```yaml
calibration_triggers:
  systematic_bias:
    threshold: "Mean signed error > 10 points over 20+ samples"
    action: "Adjust baseline multiplier for affected category"

  high_variance:
    threshold: "Standard deviation > 25 points for category"
    action: "Widen confidence interval, flag as unpredictable"

  accuracy_decline:
    threshold: "Accuracy rate drops below 60%"
    action: "Full model review required"

  category_shift:
    threshold: "Category performance changed > 30% from historical"
    action: "Update category weights in scoring model"
```

### Phase 3: Teaching Updates

**Step 3.1: Determine Update Necessity**

Not every learning warrants a system update. Apply this decision tree:

```
Is learning statistically significant?
├── No → Log only, continue monitoring
└── Yes →
    Is learning actionable (changes a system component)?
    ├── No → Log as insight, no system update
    └── Yes →
        Does learning contradict existing knowledge?
        ├── Yes → Requires additional evidence + review
        └── No →
            What type of update is needed?
            ├── YAML baseline update
            ├── Template modification
            ├── Specimen library addition
            ├── Anti-pattern documentation
            └── Process adjustment
```

**Step 3.2: YAML File Update Protocol**

When a learning should update a YAML teaching file:

```yaml
yaml_update_protocol:
  identify_target_file:
    hook_learnings: "teachings/hooks.yaml"
    format_learnings: "teachings/formats.yaml"
    timing_learnings: "teachings/timing.yaml"
    platform_learnings: "teachings/platforms.yaml"

  update_structure:
    locate_section: "Find relevant section in YAML"
    backup_current: "Create timestamped backup"
    apply_update: "Modify values or add entries"
    document_change: "Add change log entry"
    validate_yaml: "Ensure file parses correctly"

  change_log_entry:
    date: date
    learning_id: string
    change_made: string
    evidence_basis: string
    previous_value: any
    new_value: any

  rollback_protocol:
    trigger: "If subsequent performance declines > 20%"
    action: "Revert to backup, investigate"
```

**Step 3.3: Template Update Protocol**

When a learning should modify a content template:

```yaml
template_update_protocol:
  identify_template:
    path: string
    template_type: string

  modification_types:
    structure_change:
      description: "Changing the fundamental template structure"
      approval_required: true
      evidence_threshold: "statistically_significant"

    default_change:
      description: "Changing default values or suggestions"
      approval_required: false
      evidence_threshold: "moderate"

    example_update:
      description: "Adding or updating examples"
      approval_required: false
      evidence_threshold: "single strong performer"

    guidance_addition:
      description: "Adding notes or warnings"
      approval_required: false
      evidence_threshold: "documented failure mode"
```

### Phase 4: Specimen Promotion

**Step 4.1: Specimen Qualification Criteria**

Content earns specimen status when it demonstrates exceptional, replicable success:

```yaml
specimen_criteria:
  quantitative_threshold:
    view_index: ">= 3.0 (3x baseline)"
    engagement_index: ">= 2.5 (2.5x baseline)"
    OR:
      any_metric_exceptional: ">= 4.0 index in any metric"

  qualitative_requirements:
    - replicable: "Success factors are identifiable and copyable"
    - no_external_boost: "No paid promotion or external factors"
    - on_brand: "Aligns with brand voice and strategy"
    - legal_clear: "No copyright or compliance issues"

  disqualifiers:
    - one_time_event: "Success due to unrepeatable circumstance"
    - controversy_driven: "Success from negative attention"
    - trend_dependent: "Success from fleeting trend, not evergreen"
    - platform_glitch: "Success from algorithm anomaly"
```

**Step 4.2: Specimen Documentation**

When content qualifies as specimen:

```yaml
specimen_documentation:
  specimen_id: string
  original_content_id: string
  promotion_date: date

  content_archive:
    original_file: string        # Path to original content file
    performance_report: string   # Path to S19 report
    screenshots: list            # Visual captures

  success_analysis:
    primary_success_factor: string
    secondary_factors: list
    hook_analysis: string
    format_analysis: string
    timing_analysis: string

  replication_guide:
    hook_template: string        # Abstracted hook formula
    structure_template: string   # Abstracted content structure
    key_elements: list           # Must-have elements
    avoid: list                  # What not to copy

  teaching_points:
    - point_1: string
    - point_2: string
    - point_3: string

  category_tags:
    - hook_category: string
    - format: string
    - content_pillar: string
    - platform: string
```

**Step 4.3: Specimen Library Organization**

```yaml
specimen_library_structure:
  organization:
    by_platform:
      instagram/
      tiktok/
      linkedin/
      youtube/
      twitter/

    by_format:
      reels/
      carousels/
      threads/
      long_form/

    by_hook_category:
      curiosity/
      controversy/
      authority/
      exclusivity/
      social_proof/

    by_content_pillar:
      [pillar_name]/

  specimen_file_format:
    filename: "SPECIMEN-[YYYY-MM-DD]-[ID].md"
    contents:
      - metadata
      - content_link_or_embed
      - success_metrics
      - success_analysis
      - replication_guide
      - teaching_points
```

### Phase 5: Failure Mode Documentation

**Step 5.1: Failure Mode Identification**

When content significantly underperforms, document the failure pattern:

```yaml
failure_mode_criteria:
  quantitative:
    view_index: "<= 0.3 (70% below baseline)"
    OR:
      calibration_miss: ">= 40% over-prediction"

  qualitative:
    - identifiable_cause: "Specific reason can be determined"
    - pattern_potential: "Could happen again if not avoided"
    - preventable: "Could have been caught with better process"
```

**Step 5.2: Failure Mode Documentation**

```yaml
failure_mode_documentation:
  failure_id: string
  content_id: string
  date: date

  failure_classification:
    type: string
    category: string
    severity: string   # "minor", "moderate", "severe"

  failure_analysis:
    what_failed: string
    why_it_failed: string
    warning_signs: list      # What should have flagged this

  prevention_protocol:
    quality_gate_addition: string
    checklist_item: string
    template_warning: string

  anti_pattern_definition:
    name: string
    description: string
    triggers: list           # Conditions that indicate this pattern
    remedy: string           # How to avoid or fix
```

**Step 5.3: Anti-Pattern Database**

Maintain searchable database of failure modes:

```yaml
anti_patterns_database:
  anti_patterns:
    - id: "AP001"
      name: "Generic Hook Syndrome"
      description: "Using overused hook formulas without differentiation"
      triggers:
        - "Hook contains 'X tips for Y' without specificity"
        - "Hook uses cliche phrases: 'game-changer', 'life-changing'"
        - "Hook is indistinguishable from competitor content"
      consequences: "70%+ underperformance vs baseline"
      remedy: "Add specificity, exclusivity, or controversy element"
      instances: 12
      last_seen: "2026-03-15"

    - id: "AP002"
      name: "Watermark Penalty"
      description: "Cross-posting with visible platform watermarks"
      triggers:
        - "TikTok watermark visible on Instagram Reel"
        - "Any third-party watermark present"
      consequences: "Algorithm suppression, 50-80% reach reduction"
      remedy: "Always download clean versions or recreate natively"
      instances: 5
      last_seen: "2026-03-01"

    # Additional anti-patterns...
```

### Phase 6: Pattern Recognition Protocols

**Step 6.1: Cross-Content Pattern Detection**

Look for patterns that emerge across multiple pieces of content:

```yaml
pattern_detection_protocols:
  time_pattern_analysis:
    method: "Aggregate performance by posting time over 30+ posts"
    signal: "Statistical deviation from expected distribution"
    action: "Update timing matrices if pattern holds"

  hook_pattern_analysis:
    method: "Cluster hooks by similarity, compare performance"
    signal: "Consistent over/underperformance by cluster"
    action: "Update hook category weights and guidance"

  format_pattern_analysis:
    method: "Track format performance over time"
    signal: "Trend direction change (rising or declining)"
    action: "Update format recommendations and frequency"

  topic_pattern_analysis:
    method: "Tag content by topic, compare performance"
    signal: "Topic fatigue or topic momentum"
    action: "Adjust content calendar weighting"

  combination_pattern_analysis:
    method: "Look for interaction effects (hook + format + time)"
    signal: "Combinations that outperform individual factors"
    action: "Document winning combinations, prioritize in scheduling"
```

**Step 6.2: Hypothesis Generation**

When patterns emerge, formalize as testable hypotheses:

```yaml
hypothesis_framework:
  hypothesis_structure:
    id: string
    statement: string          # "If [condition], then [outcome]"
    category: string           # hook/format/timing/audience/platform
    evidence_for: integer      # Count of supporting instances
    evidence_against: integer  # Count of contradicting instances
    confidence: float          # Calculated confidence level
    status: string             # "testing", "supported", "refuted", "established"

  example_hypotheses:
    - id: "H001"
      statement: "If a hook contains a specific number (not rounded), then engagement will be 25%+ higher than hooks with no numbers"
      category: "hook"
      evidence_for: 18
      evidence_against: 3
      confidence: 0.85
      status: "supported"

    - id: "H002"
      statement: "If content is posted between 10-11am on Tuesday, it will outperform other time slots by 30%+"
      category: "timing"
      evidence_for: 12
      evidence_against: 2
      confidence: 0.78
      status: "testing"
```

**Step 6.3: Hypothesis Lifecycle**

```
New Pattern Observed → Hypothesis Generated (status: testing)
↓
Evidence Collected (ongoing)
↓
Threshold Reached?
├── No → Continue testing
└── Yes →
    Preponderance of Evidence?
    ├── Supports hypothesis → status: supported → Implement learning
    └── Refutes hypothesis → status: refuted → Document why
```

### Phase 7: Cross-Campaign Learning Synthesis

**Step 7.1: Campaign-Level Analysis**

When a campaign concludes, synthesize learnings across all content:

```yaml
campaign_learning_synthesis:
  campaign_id: string
  campaign_name: string
  duration: string
  total_posts: integer

  aggregate_performance:
    total_reach: integer
    total_engagement: integer
    avg_view_index: float
    avg_engagement_index: float
    follows_gained: integer

  campaign_insights:
    what_worked_across_campaign:
      - insight_1: string
      - insight_2: string
    what_didnt_work:
      - insight_1: string
    unexpected_findings:
      - finding_1: string

  best_performers:
    - content_id: string
      why: string

  worst_performers:
    - content_id: string
      why: string

  strategic_learnings:
    - learning_1: string  # Higher-level than individual content
    - learning_2: string

  next_campaign_recommendations:
    - recommendation_1: string
    - recommendation_2: string
```

**Step 7.2: Quarterly Learning Review**

Every quarter, synthesize learnings into strategic insights:

```yaml
quarterly_learning_review:
  quarter: string
  period: string

  summary_statistics:
    total_content_analyzed: integer
    learnings_captured: integer
    system_updates_made: integer
    specimens_added: integer
    failure_modes_documented: integer

  major_learnings:
    - learning_1:
        insight: string
        impact: string
        system_change: string
    - learning_2:
        insight: string
        impact: string
        system_change: string

  calibration_health:
    model_accuracy: float
    bias_direction: string
    adjustments_made: list

  hypothesis_status:
    tested: integer
    supported: integer
    refuted: integer
    outstanding: integer

  strategic_recommendations:
    - recommendation_1: string
    - recommendation_2: string

  next_quarter_priorities:
    - priority_1: string
    - priority_2: string
```

---

## OUTPUT SPECIFICATION

### Primary Output: Learning Log Entry

```yaml
learning_log_entry:
  metadata:
    learning_id: string
    date: date
    source_content: string
    source_report: string

  learning:
    category: string
    strength: string
    statement: string         # Clear, concise learning statement

  evidence:
    supporting_instances: list
    contradicting_instances: list
    confidence_level: float

  context:
    platform: string
    format: string
    content_pillar: string
    hook_category: string

  action:
    action_type: string       # "log_only", "system_update", "specimen_promotion", "failure_documentation"
    target: string            # What was updated
    change_made: string       # Description of change
    rollback_trigger: string  # When to revert

  follow_up:
    monitoring_required: boolean
    next_review_date: date
    related_hypotheses: list
```

### Secondary Output: System Update Record

```yaml
system_update_record:
  update_id: string
  date: date
  learning_id: string

  update_type: string         # "yaml_update", "template_update", "specimen_addition", "anti_pattern_addition"

  target:
    file_path: string
    section: string

  change:
    previous_state: any
    new_state: any
    rationale: string

  validation:
    pre_update_baseline: any
    post_update_tracking: string
    success_criteria: string

  rollback:
    backup_path: string
    rollback_trigger: string
    rollback_instructions: string
```

### Tertiary Output: Calibration Update Record

```yaml
calibration_update_record:
  date: date
  trigger: string

  previous_calibration:
    category: string
    baseline: float
    confidence: float

  new_calibration:
    baseline: float
    confidence: float
    adjustment: float

  evidence:
    sample_size: integer
    mean_error: float
    instances: list

  expected_impact:
    prediction_improvement: string
```

---

## QUALITY GATES

### Anti-Degradation Checks

**Gate 1: Evidence Threshold**
- [ ] Learning is based on sufficient sample size
- [ ] Single instances flagged, not acted upon
- [ ] Confidence levels explicitly stated
- [ ] Contradicting evidence acknowledged

**Gate 2: Actionability**
- [ ] Learning is specific and actionable
- [ ] Clear connection to system component
- [ ] Implementation path defined
- [ ] Success metric identified

**Gate 3: Reversibility**
- [ ] System updates have rollback plan
- [ ] Backups created before changes
- [ ] Monitoring plan in place
- [ ] Rollback triggers defined

**Gate 4: Consistency**
- [ ] Learning doesn't contradict established patterns without explanation
- [ ] If contradiction exists, requires additional evidence before action
- [ ] Change logged for audit trail

**Gate 5: Knowledge Integrity**
- [ ] No orphan updates (every change linked to learning)
- [ ] No duplicate or conflicting entries
- [ ] All updates dated and attributed
- [ ] Learning log comprehensive

---

## LEARNING LOG FORMAT

### Master Learning Log Structure

```yaml
learning_log:
  metadata:
    log_version: string
    last_updated: datetime
    total_entries: integer

  entries:
    - learning_id: "L001"
      date: "2026-03-15"
      # ... full learning_log_entry structure

    - learning_id: "L002"
      date: "2026-03-16"
      # ... full learning_log_entry structure
```

### Learning Log File Organization

```
learnings/
├── learning_log.yaml           # Master log (last 90 days active)
├── archive/
│   ├── 2026-Q1-learnings.yaml
│   ├── 2025-Q4-learnings.yaml
│   └── ...
├── hypotheses/
│   └── active_hypotheses.yaml
├── calibration/
│   └── calibration_log.yaml
└── reviews/
    ├── 2026-Q1-review.md
    └── ...
```

---

## TEMPLATES

### Template 1: Learning Capture Form

```markdown
# Learning Capture

**Date:** [YYYY-MM-DD]
**Source Content:** [Content ID]
**Source Report:** [S19 Report ID]

---

## Learning Statement

**Category:** [hook/format/timing/audience/platform/calibration/failure]

**Statement:**
[Clear, concise statement of what was learned. One sentence if possible.]

**Confidence Level:** [weak/moderate/strong/definitive]

---

## Evidence

**Supporting Instances:**
1. [Content ID]: [Brief description of support]
2. [Content ID]: [Brief description of support]

**Contradicting Instances:**
- [None / List any contradictions]

**Sample Size:** [Number]

---

## Context

- **Platform:** [Platform]
- **Format:** [Format type]
- **Content Pillar:** [Pillar]
- **Hook Category:** [Hook category]

---

## Action Required

**Action Type:** [Log Only / System Update / Specimen Promotion / Failure Documentation]

**If System Update:**
- **Target File:** [Path]
- **Change:** [Description]
- **Rollback Trigger:** [When to revert]

**If Specimen Promotion:**
- **Specimen ID:** [ID]
- **Teaching Points:** [Key replication factors]

**If Failure Documentation:**
- **Anti-Pattern ID:** [ID]
- **Prevention Protocol:** [How to avoid]

---

## Follow-Up

- [ ] Monitoring required: [Yes/No]
- **Next Review Date:** [Date]
- **Related Hypotheses:** [IDs]

---

*Captured by S20-learning-capture*
```

### Template 2: Specimen Documentation

```markdown
# Specimen: [SPECIMEN-YYYY-MM-DD-ID]

**Promotion Date:** [Date]
**Original Content:** [Content ID]
**Platform:** [Platform]
**Format:** [Format]

---

## Performance Metrics

| Metric | Value | vs Baseline |
|--------|-------|-------------|
| Views | [X] | [X]x |
| Engagement Rate | [X]% | [X]x |
| Saves | [X] | [X]x |
| Shares | [X] | [X]x |
| New Follows | [X] | [X]x |

**Performance Grade:** [A+]

---

## Content

[Link to original content or embed]

**Hook Used:**
> "[Exact hook text]"

**Hook Category:** [Category]

---

## Success Analysis

### Primary Success Factor
[What made this work more than anything else]

### Secondary Factors
1. [Factor 1]
2. [Factor 2]

### Timing Factor
[Was timing significant? Why?]

### Format Factor
[Was format significant? Why?]

---

## Replication Guide

### Hook Template
```
[Abstracted hook formula that can be reused]
Example: "[Exclusivity signal] + [Specific number] + [Curiosity gap]"
```

### Structure Template
```
1. [Opening element]
2. [Body element]
3. [Closing element]
```

### Key Elements (Must Have)
- [Element 1]
- [Element 2]
- [Element 3]

### Avoid
- [What NOT to copy]
- [What was specific to this instance]

---

## Teaching Points

1. **[Point 1 Title]:** [Explanation]
2. **[Point 2 Title]:** [Explanation]
3. **[Point 3 Title]:** [Explanation]

---

## Category Tags

- Hook Category: [Category]
- Format: [Format]
- Content Pillar: [Pillar]
- Platform: [Platform]

---

*Documented by S20-learning-capture*
```

### Template 3: Anti-Pattern Documentation

```markdown
# Anti-Pattern: [AP-XXX] [Name]

**Documented:** [Date]
**Severity:** [Minor/Moderate/Severe]
**Category:** [hook/format/timing/audience/platform/execution]

---

## Description

[Clear description of what this anti-pattern is]

---

## Triggers

This anti-pattern is present when:
- [ ] [Trigger condition 1]
- [ ] [Trigger condition 2]
- [ ] [Trigger condition 3]

---

## Consequences

**Expected Underperformance:** [X]% below baseline

**Additional Consequences:**
- [Consequence 1]
- [Consequence 2]

---

## Examples

**Instance 1:** [Content ID]
- What happened: [Description]
- Result: [Performance]

**Instance 2:** [Content ID]
- What happened: [Description]
- Result: [Performance]

---

## Remedy

**How to Avoid:**
[Step-by-step prevention]

**If Already Present:**
[How to fix if caught before publishing]

---

## Quality Gate Addition

**Checklist Item:**
- [ ] [Specific check to add to QA process]

**Warning Trigger:**
[Automated or manual flag that should catch this]

---

## Instances

- **Total Documented:** [X]
- **Last Seen:** [Date]

---

*Documented by S20-learning-capture*
```

### Template 4: Hypothesis Tracking

```markdown
# Hypothesis: [H-XXX]

**Created:** [Date]
**Status:** [Testing/Supported/Refuted/Established]
**Category:** [hook/format/timing/audience/platform]

---

## Statement

> If [condition], then [outcome].

---

## Evidence

### Supporting Evidence
| Content ID | Date | Outcome | Notes |
|------------|------|---------|-------|
| [ID] | [Date] | [Result] | [Notes] |

**Total Supporting:** [X]

### Contradicting Evidence
| Content ID | Date | Outcome | Notes |
|------------|------|---------|-------|
| [ID] | [Date] | [Result] | [Notes] |

**Total Contradicting:** [X]

---

## Confidence Calculation

**Confidence Level:** [X]%

**Calculation:**
- Supporting: [X] / Total: [X] = [X]%
- Weighted by recency: [Adjustment]
- Final confidence: [X]%

---

## Status

**Current Status:** [Status]

**Status History:**
- [Date]: Created (Testing)
- [Date]: [Status change + reason]

---

## Action If Supported

[What system change will be implemented if hypothesis is confirmed]

---

## Action If Refuted

[What this tells us if hypothesis is proven wrong]

---

*Tracked by S20-learning-capture*
```

### Template 5: Quarterly Learning Review

```markdown
# Quarterly Learning Review: [Q# YYYY]

**Period:** [Start Date] - [End Date]
**Prepared:** [Date]

---

## Executive Summary

[2-3 sentences summarizing the quarter's learning highlights]

---

## Statistics

| Metric | Count |
|--------|-------|
| Total Content Analyzed | [X] |
| Learnings Captured | [X] |
| System Updates Made | [X] |
| Specimens Added | [X] |
| Failure Modes Documented | [X] |
| Hypotheses Tested | [X] |
| Hypotheses Confirmed | [X] |
| Hypotheses Refuted | [X] |

---

## Major Learnings

### Learning 1: [Title]

**Insight:** [Description]

**Impact:** [How this affected performance]

**System Change:** [What was updated]

### Learning 2: [Title]

**Insight:** [Description]

**Impact:** [How this affected performance]

**System Change:** [What was updated]

### Learning 3: [Title]

**Insight:** [Description]

**Impact:** [How this affected performance]

**System Change:** [What was updated]

---

## Calibration Health

**Model Accuracy:** [X]%
**Bias Direction:** [Over-predicting/Under-predicting/Neutral]
**Mean Absolute Error:** [X] points

**Adjustments Made:**
1. [Adjustment 1]
2. [Adjustment 2]

---

## Hypothesis Status

**Tested This Quarter:** [X]

**Confirmed:**
- [H-XXX]: [Brief statement]

**Refuted:**
- [H-XXX]: [Brief statement + why]

**Still Testing:**
- [H-XXX]: [Brief statement]

---

## Notable Specimens

### [SPECIMEN-XXX]
[One sentence on why it's notable]

### [SPECIMEN-XXX]
[One sentence on why it's notable]

---

## Key Failure Modes Identified

### [AP-XXX]: [Name]
[One sentence on impact]

---

## Strategic Recommendations

1. **[Recommendation 1]:** [Explanation]
2. **[Recommendation 2]:** [Explanation]
3. **[Recommendation 3]:** [Explanation]

---

## Next Quarter Priorities

1. [Priority 1]
2. [Priority 2]
3. [Priority 3]

---

*Review conducted by S20-learning-capture*
```

---

## EXAMPLES

### Example 1: Hook Learning Capture

```yaml
learning_log_entry:
  metadata:
    learning_id: "L-2026-03-15-001"
    date: "2026-03-15"
    source_content: "REEL-2026-03-10-003"
    source_report: "RPT-2026-03-15-001"

  learning:
    category: "hook_insights"
    strength: "strong"
    statement: "Hooks containing specific non-round numbers ('4 hours' vs '5 hours') generate 35% higher engagement than hooks with round numbers"

  evidence:
    supporting_instances:
      - content_id: "REEL-2026-03-10-003"
        hook: "The AI tool that replaced 4 hours of my day"
        engagement_index: 3.2
      - content_id: "REEL-2026-02-28-007"
        hook: "I made $47,000 in 23 days with this system"
        engagement_index: 2.8
      - content_id: "REEL-2026-02-15-002"
        hook: "7 minutes changed my entire business"
        engagement_index: 2.5
      - content_id: "REEL-2026-03-05-001"
        hook: "The 3-step system behind my 1.1 billion streams"
        engagement_index: 2.9
    contradicting_instances: []
    confidence_level: 0.88

  context:
    platform: "instagram"
    format: "reel"
    content_pillar: "authority"
    hook_category: "specificity"

  action:
    action_type: "system_update"
    target: "teachings/hooks.yaml"
    change_made: "Added weight modifier of 1.35 for hooks containing specific non-round numbers. Added guidance note to hook templates."
    rollback_trigger: "If next 10 specific-number hooks underperform baseline by >20%"

  follow_up:
    monitoring_required: true
    next_review_date: "2026-04-15"
    related_hypotheses:
      - "H-007"
```

### Example 2: Calibration Update

```yaml
calibration_update_record:
  date: "2026-03-18"
  trigger: "Systematic over-prediction for listicle hooks (mean error +18 points over 25 samples)"

  previous_calibration:
    category: "listicle_hooks"
    baseline: 1.0
    confidence: 0.75

  new_calibration:
    baseline: 0.82
    confidence: 0.80
    adjustment: -0.18

  evidence:
    sample_size: 25
    mean_error: 18.2
    instances:
      - content_id: "CAROUSEL-2026-03-01-002"
        predicted: 52
        actual: 31
      - content_id: "CAROUSEL-2026-03-05-004"
        predicted: 48
        actual: 28
      # ... additional instances

  expected_impact:
    prediction_improvement: "Reduce mean absolute error for listicle content from 18.2 to ~7 points"
```

### Example 3: Specimen Promotion

```yaml
specimen_documentation:
  specimen_id: "SPECIMEN-2026-03-20-001"
  original_content_id: "REEL-2026-03-15-001"
  promotion_date: "2026-03-20"

  content_archive:
    original_file: "/content/reels/2026-03/REEL-2026-03-15-001.mp4"
    performance_report: "/reports/RPT-2026-03-20-001.yaml"
    screenshots:
      - "/specimens/screenshots/SPEC-001-thumbnail.png"
      - "/specimens/screenshots/SPEC-001-metrics.png"

  success_analysis:
    primary_success_factor: "Perfect combination of exclusivity trigger ('nobody's talking about') with specific benefit ('replaced 4 hours')"
    secondary_factors:
      - "Direct-to-camera format with high energy"
      - "Tutorial delivery style (high value density)"
      - "Tuesday 10:30 AM posting (optimal slot)"
    hook_analysis: "Exclusivity + Specificity hook combination outperformed single-element hooks by 280%"
    format_analysis: "Talking head with quick cuts and text overlays maintained attention throughout"
    timing_analysis: "Tuesday morning professional audience highly receptive to productivity content"

  replication_guide:
    hook_template: "[Exclusivity signal] + [Specific non-round benefit] + [Curiosity gap]"
    structure_template:
      - "Hook with exclusivity claim (0-3 seconds)"
      - "Immediate value delivery (3-15 seconds)"
      - "Demonstration/proof (15-45 seconds)"
      - "CTA with scarcity element (45-60 seconds)"
    key_elements:
      - "Exclusivity trigger in hook"
      - "Specific number (non-round)"
      - "Direct camera address"
      - "Value delivered within first 10 seconds"
      - "Text overlays reinforcing key points"
    avoid:
      - "Don't copy the specific tool mentioned (circumstantial)"
      - "Don't replicate exact phrasing (will feel derivative)"
      - "The specific day's timing may have benefited from external factors"

  teaching_points:
    - "Exclusivity + Specificity is a high-performing hook combination"
    - "Non-round numbers signal authenticity and specificity"
    - "Value-first delivery (not tease-first) works for tutorial content"

  category_tags:
    hook_category: "exclusivity"
    format: "talking_head_reel"
    content_pillar: "authority"
    platform: "instagram"
```

### Example 4: Failure Mode Documentation

```yaml
failure_mode_documentation:
  failure_id: "FM-2026-03-18-001"
  content_id: "CAROUSEL-2026-03-18-002"
  date: "2026-03-18"

  failure_classification:
    type: "hook_failure"
    category: "generic_hook_syndrome"
    severity: "severe"

  failure_analysis:
    what_failed: "Hook '5 productivity tips for busy entrepreneurs' generated 85% fewer views than baseline"
    why_it_failed:
      - "Zero differentiation from millions of identical posts"
      - "No curiosity gap—reader thinks they know what's coming"
      - "No specificity—could be anyone's content"
      - "No exclusivity—promises widely available information"
    warning_signs:
      - "Hook matched 'X tips for Y' template exactly"
      - "No specific numbers or unique angle"
      - "Topic is in top 10 most oversaturated on platform"

  prevention_protocol:
    quality_gate_addition: "Hook must pass differentiation check: Would this hook stop YOUR scroll if you saw it from a stranger?"
    checklist_item: "Verify hook contains at least one of: specific number, exclusivity element, controversy element, unique personal angle"
    template_warning: "WARNING: 'X tips for Y' format requires strong differentiation element. Generic versions underperform by 70%+"
```

### Example 5: Cross-Campaign Learning Synthesis

```yaml
campaign_learning_synthesis:
  campaign_id: "CAMP-2026-Q1-AI-AUTHORITY"
  campaign_name: "AI Authority Building Campaign"
  duration: "2026-01-15 to 2026-03-15"
  total_posts: 45

  aggregate_performance:
    total_reach: 2.4M
    total_engagement: 189000
    avg_view_index: 1.8
    avg_engagement_index: 2.1
    follows_gained: 4200

  campaign_insights:
    what_worked_across_campaign:
      - "Exclusivity hooks consistently outperformed (avg 2.5x baseline)"
      - "Tutorial/how-to format maintained engagement throughout campaign"
      - "AI + Personal Story combination highest follow rate"
    what_didnt_work:
      - "Listicle formats declined over campaign (fatigue)"
      - "Generic 'tips' content never exceeded baseline"
    unexpected_findings:
      - "Controversial AI takes got engagement but lower follow rate"
      - "Cross-platform posting same day cannibalized reach"

  best_performers:
    - content_id: "REEL-2026-03-15-001"
      why: "Perfect exclusivity + specificity hook combination"
    - content_id: "REEL-2026-02-10-003"
      why: "Personal story + AI transformation narrative"

  worst_performers:
    - content_id: "CAROUSEL-2026-03-18-002"
      why: "Generic hook syndrome"
    - content_id: "REEL-2026-01-25-005"
      why: "Cross-posted with watermark, algorithm suppressed"

  strategic_learnings:
    - "AI authority content has ceiling without personal narrative integration"
    - "Campaign fatigue sets in around week 6 for same-format content"
    - "Follow rate inversely correlated with controversy level"

  next_campaign_recommendations:
    - "Integrate more personal story content (1 per week minimum)"
    - "Rotate format every 2-3 posts to prevent fatigue"
    - "Avoid cross-platform same-day posting"
    - "Prioritize exclusivity hooks over listicle formats"
```

---

## INTEGRATION NOTES

### Upstream Dependencies
- **S19-performance-analysis:** Primary input source for all learnings
- **S05-virality-scoring:** Reference for calibration comparisons
- **All content creation skills (S07-S16):** Source of templates to update

### Downstream Outputs
- **YAML Teaching Files:** Hook weights, format guidance, timing matrices
- **Specimen Library:** Documented winning patterns
- **Anti-Pattern Database:** Failure mode prevention
- **S05-virality-scoring:** Calibration updates
- **All content creation skills:** Template updates and guidance

### Data Storage Architecture
```
learnings/
├── learning_log.yaml              # Active learnings (90 days)
├── archive/                       # Historical learnings
├── hypotheses/                    # Active hypothesis tracking
├── calibration/                   # Prediction calibration data
└── reviews/                       # Quarterly reviews

specimens/
├── by_platform/                   # Organized by platform
├── by_format/                     # Organized by format
├── by_hook_category/              # Organized by hook type
└── index.yaml                     # Searchable index

anti_patterns/
├── database.yaml                  # All documented anti-patterns
└── prevention_checklist.md        # Generated prevention checklist

teachings/
├── hooks.yaml                     # Hook performance data
├── formats.yaml                   # Format performance data
├── timing.yaml                    # Timing optimization data
├── platforms.yaml                 # Platform-specific data
└── changelog.yaml                 # All teaching file changes
```

### Automation Opportunities
- Automatic learning flag processing from S19 reports
- Scheduled calibration metric calculation
- Automated YAML backup before updates
- Learning pattern detection algorithms
- Quarterly review report generation

---

## THE LEARNING FLYWHEEL

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    Content Created (S07-S16)                                │
│         ↓                                                   │
│    Content Distributed (S17-S18)                            │
│         ↓                                                   │
│    Performance Analyzed (S19)                               │
│         ↓                                                   │
│    ┌─────────────────────────────────────────┐              │
│    │         LEARNING CAPTURED (S20)         │              │
│    │                                         │              │
│    │  • Categorize learning                  │              │
│    │  • Validate against existing knowledge  │              │
│    │  • Update calibration models            │              │
│    │  • Promote specimens                    │              │
│    │  • Document failure modes               │              │
│    │  • Update teaching files                │              │
│    │  • Track hypotheses                     │              │
│    │  • Synthesize cross-campaign insights   │              │
│    │                                         │              │
│    └─────────────────────────────────────────┘              │
│         ↓                                                   │
│    System Knowledge Updated                                 │
│         ↓                                                   │
│    Better Predictions (S05)                                 │
│         ↓                                                   │
│    Better Content Decisions                                 │
│         ↓                                                   │
│    [Loop continues - each cycle smarter than the last]      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

*S20-learning-capture is the evolutionary engine of the Organic Marketing Engine. Every piece of content teaches the system. Every failure prevents future failures. Every success becomes replicable. This skill ensures the engine gets smarter with every iteration—not through hope, but through systematic capture and application of validated learnings.*
