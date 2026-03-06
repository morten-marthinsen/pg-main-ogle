# S15: Scheduling Choreography — Master Agent

**Version:** 1.0
**Skill:** S15-scheduling-choreography
**Position:** Distribution — First Skill
**Type:** Strategy + Planning
**Dependencies:** S14 Content Assembly (hard), S02 Platform Strategy (soft), S07 Campaign Brief (soft)
**Output:** Scheduling Choreography File (SCF)

---

## Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Input validation + upstream loading | haiku | Simple validation |
| 1 | Timing strategy + cascade design | sonnet | Strategic scheduling logic |
| 4 | SCF assembly + validation | sonnet | Assembly from existing content |

---

## Purpose

Transform assembled content into a precisely timed, cross-platform distribution sequence. Timing is leverage — the same content posted at the wrong time dies; posted at the right time, it explodes. This is not "scheduling" — it is choreography.

**Success Criteria:**
- All content from S14 has assigned posting times
- All posting times fall within optimal platform windows
- Minimum gaps between posts respected per platform
- All cascade sequences fully defined
- Momentum stacking rules documented

---

## Identity Boundaries

**This skill IS:**
- Platform-specific timing intelligence
- Content type-to-time mapping
- Cross-platform cascade sequencing
- Momentum stacking protocol design
- Holiday & event calendar integration
- Posting choreography

**This skill is NOT:**
- Engagement strategy (that's S16)
- Network amplification (that's S17)
- Content creation (that's S08-S13)
- Performance analysis (that's S19)

---

## Layer Map

> **Critical Constraints Reminder (Layer 0)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - Gates are PASS or FAIL only
> - All upstream files must be loaded

### Layer 0: Foundation (Loading & Validation)

| Microskill | Purpose | Document |
|------------|---------|----------|
| 0.1 | Input Validator | [0.1-input-validator.md](skills/layer-0/0.1-input-validator.md) |
| 0.2 | Teaching Loader | [0.2-teaching-loader.md](skills/layer-0/0.2-teaching-loader.md) |
| 0.3 | Upstream Package Loader | [0.3-upstream-loader.md](skills/layer-0/0.3-upstream-loader.md) |

> **Critical Constraints Reminder (Layer 1)**
> - Read ANTI-DEGRADATION.md before executing
> - Every microskill produces its own output file
> - NO ARENA for distribution skills

### Layer 1: Strategy (Scheduling Strategy)

| Microskill | Purpose | Document |
|------------|---------|----------|
| 1.1 | Platform Timing Intelligence | [1.1-platform-timing.md](skills/layer-1/1.1-platform-timing.md) |
| 1.2 | Content Type Timing Matrix | [1.2-content-type-timing.md](skills/layer-1/1.2-content-type-timing.md) |
| 1.3 | Cross-Platform Cascade Design | [1.3-cascade-design.md](skills/layer-1/1.3-cascade-design.md) |
| 1.4 | Momentum Stacking Protocol | [1.4-momentum-stacking.md](skills/layer-1/1.4-momentum-stacking.md) |
| 1.5 | Calendar Integration | [1.5-calendar-integration.md](skills/layer-1/1.5-calendar-integration.md) |

> **Critical Constraints Reminder (Layer 4)**
> - Read ANTI-DEGRADATION.md before executing
> - All validation requirements must pass
> - SCF schema must be complete

### Layer 4: Output Packaging

| Microskill | Purpose | Document |
|------------|---------|----------|
| 4.1 | Output Assembler | [4.1-output-assembler.md](skills/layer-4/4.1-output-assembler.md) |
| 4.2 | Execution Log | [4.2-execution-log.md](skills/layer-4/4.2-execution-log.md) |

---

## Execution Flow

```
                    INPUT: S14 Content Packages + S02 PSF + S07 CBF
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 0: FOUNDATION (haiku)                           │
│   Input Validation → Teaching Loading → Upstream Package Loading         │
│                    GATE: LAYER_0_COMPLETE.yaml                           │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 1: STRATEGY (sonnet)                            │
│                                                                           │
│   Platform Timing → Content Type Timing → Cascade Design →              │
│   Momentum Stacking → Calendar Integration                               │
│                    GATE: LAYER_1_COMPLETE.yaml                           │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     LAYER 4: OUTPUT (sonnet)                              │
│   SCF Assembly → Validation → Execution Log                             │
│                    OUTPUT: SCF.yaml                                       │
└───────────────────────────────────┴───────────────────────────────────────┘
                                    │
                                    ▼
                    HANDOFF: S16 Engagement Protocol (via Gate G10)
```

---

## Output Schema

```yaml
# SCHEDULING CHOREOGRAPHY FILE (SCF)
campaign_name:
date_range:
  start:
  end:
total_content_pieces:
platforms:
timezone:
version: "1.0"

platform_timing:
  primary_platform:
    name:
    optimal_windows: {}
    format_timing: {}
    posting_frequency:
    algorithm_notes:

content_schedule:
  week_1:
    date_range:
    posts:
      - date:
        time:
        platform:
        content_id:
        content_type:
        function:
        cascade_position:
        engagement_window_start:
        engagement_window_end:

cascade_sequences:
  - sequence_id:
    content_id:
    sequence_type: [Hero/Standard/Rapid]
    steps: []

momentum_rules:
  viral_threshold: {}
  viral_response_sequence: {}

calendar_events:
  - date:
    event:
    content_strategy:

contingencies:
  underperformance_protocol: {}
  overperformance_protocol: {}

engagement_triggers:
  - content_id:
    platform:
    post_time:
    engagement_window_start:
    engagement_window_end:
    priority:
```

---

## Validation Requirements (Gate G10)

- [ ] All content from S14 has assigned posting times
- [ ] All posting times fall within optimal platform windows (from PSF)
- [ ] Minimum gaps between posts respected per platform
- [ ] All cascade sequences fully defined
- [ ] Momentum stacking rules documented
- [ ] Calendar events integrated and content adjusted
- [ ] Contingency protocols defined
- [ ] Engagement windows specified for S16 handoff
- [ ] Network amplification flags set for S17
- [ ] No blackout date violations

---

## Constraints

### MUST

- **MUST** use platform-specific optimal posting windows from PSF
- **MUST** respect minimum posting gaps per platform (avoid spam penalties)
- **MUST** define cascade sequences for cross-platform coordination
- **MUST** integrate campaign calendar events and holidays
- **MUST** define engagement windows for S16 handoff
- **MUST** set network amplification flags for high-priority content
- **MUST** include contingency protocols for under/overperformance

### NEVER

- **NEVER** schedule content simultaneously across all platforms (cross-platform spam)
- **NEVER** ignore platform-specific algorithm velocity windows (first hour critical)
- **NEVER** schedule during blackout dates without explicit override
- **NEVER** schedule content without defining engagement windows
- **NEVER** violate minimum posting gaps (damages algorithm relationship)
- **NEVER** schedule hero content during low-engagement windows
- **NEVER** skip calendar integration (holidays, events, trending moments)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-05 | Initial decomposition from monolithic SKILL.md |
