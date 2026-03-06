# S16: Engagement Protocol — Master Agent

**Version:** 1.0
**Skill:** S16-engagement-protocol
**Position:** Distribution — Second Skill
**Type:** Strategy + Execution Planning
**Dependencies:** S14 Content Assembly (hard), S15 Scheduling (hard), S03 Brand Voice (soft), S01 Audience Intelligence (soft)
**Output:** Engagement Protocol File (EPF)

---

## Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Input validation + upstream loading | haiku | Simple validation |
| 1 | Engagement strategy + response templates | sonnet | Strategic planning logic |
| 4 | EPF assembly + validation | sonnet | Assembly from existing content |

---

## Purpose

Transform passive content publishing into active community building. The first 60 minutes after posting determine whether content lives or dies. Engagement is not optional — it is the difference between algorithmic death and exponential reach.

**Success Criteria:**
- First 60 minutes protocol fully specified
- Comment seeding strategy defined
- Reply hierarchy with templates
- DM triggers and opener scripts
- All templates match brand voice (BVF)
- All language mirrors audience (AIF)

---

## Identity Boundaries

**This skill IS:**
- First-hour engagement protocol design
- Comment response strategy
- DM conversation strategy
- Community building tactics
- Controversy management framework

**This skill is NOT:**
- Content creation (that's S08-S13)
- Scheduling strategy (that's S15)
- Network amplification (that's S17)
- Performance analysis (that's S19)

---

## Layer Map

> **Critical Constraints Reminder (Layer 0)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Must load BVF for voice alignment

### Layer 0: Foundation

| Microskill | Purpose | Document |
|------------|---------|----------|
| 0.1 | Input Validator | [0.1-input-validator.md](skills/layer-0/0.1-input-validator.md) |
| 0.2 | Teaching Loader | [0.2-teaching-loader.md](skills/layer-0/0.2-teaching-loader.md) |
| 0.3 | Upstream Loader | [0.3-upstream-loader.md](skills/layer-0/0.3-upstream-loader.md) |

> **Critical Constraints Reminder (Layer 1)**
> - All response templates MUST match BVF tone
> - All language MUST mirror AIF patterns

### Layer 1: Strategy

| Microskill | Purpose | Document |
|------------|---------|----------|
| 1.1 | First 60 Minutes Protocol | [1.1-first-60-protocol.md](skills/layer-1/1.1-first-60-protocol.md) |
| 1.2 | Comment Seeding Strategy | [1.2-comment-seeding.md](skills/layer-1/1.2-comment-seeding.md) |
| 1.3 | Reply Hierarchy Framework | [1.3-reply-hierarchy.md](skills/layer-1/1.3-reply-hierarchy.md) |
| 1.4 | DM Strategy Design | [1.4-dm-strategy.md](skills/layer-1/1.4-dm-strategy.md) |
| 1.5 | Controversy Management | [1.5-controversy-management.md](skills/layer-1/1.5-controversy-management.md) |

### Layer 4: Output Packaging

| Microskill | Purpose | Document |
|------------|---------|----------|
| 4.1 | Output Assembler | [4.1-output-assembler.md](skills/layer-4/4.1-output-assembler.md) |
| 4.2 | Execution Log | [4.2-execution-log.md](skills/layer-4/4.2-execution-log.md) |

---

## Execution Flow

```
                INPUT: S14 Packages + S15 SCF + S03 BVF + S01 AIF
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 0: FOUNDATION (haiku)                           │
│   Input Validation → Teaching Loading → Upstream Loading                 │
│                    GATE: LAYER_0_COMPLETE.yaml                           │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 1: STRATEGY (sonnet)                            │
│   First 60 Protocol → Comment Seeding → Reply Hierarchy →               │
│   DM Strategy → Controversy Management                                    │
│                    GATE: LAYER_1_COMPLETE.yaml                           │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 4: OUTPUT (sonnet)                              │
│   EPF Assembly → Validation → Execution Log                             │
│                    OUTPUT: EPF.yaml                                       │
└───────────────────────────────────┴───────────────────────────────────────┘
                                    │
                                    ▼
                    HANDOFF: S17 Network Amplification
```

---

## Output Schema

```yaml
# ENGAGEMENT PROTOCOL FILE (EPF)
campaign_name:
content_id:
platform:
post_time:
engagement_window:
  start:
  end:
priority: [High/Medium/Low]
version: "1.0"

first_60_minutes:
  minute_0_to_5: {}
  minute_5_to_15: {}
  minute_15_to_30: {}
  minute_30_to_60: {}

comment_seeding:
  seed_type:
  seed_comment_text:

reply_hierarchy:
  tier_1_targets: []
  tier_2_targets: []

dm_strategy:
  triggers_active: []
  sequences_active: []

controversy_prep:
  potential_criticisms: []

daily_schedule:
  morning_block: {}
  midday_block: {}
  evening_block: {}

metrics:
  engagement_rate_target:
  comment_count_target:
```

---

## Constraints

### MUST

- **MUST** define first 60 minutes protocol for every post
- **MUST** align response templates with BVF tone
- **MUST** mirror audience language from AIF
- **MUST** prepare controversy responses for likely criticisms
- **MUST** define DM triggers and openers
- **MUST** create realistic daily engagement schedule

### NEVER

- **NEVER** use generic response templates ("Nice post!", "Great content!")
- **NEVER** skip first-hour protocol (algorithmic death sentence)
- **NEVER** respond to all trolls (don't feed bad faith)
- **NEVER** delete negative comments unless harassment/spam
- **NEVER** use template DM sequences that feel automated

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-05 | Initial decomposition from monolithic SKILL.md |
