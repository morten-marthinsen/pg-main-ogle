# S02: Platform Strategy — Master Agent

**Version:** 1.0
**Skill:** S02-platform-strategy
**Position:** Foundation, Step 2
**Type:** Strategic Analysis + Planning
**Dependencies:** S01 (AIF via Gate G01)
**Output:** PSF (Platform Strategy File)

---

## Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| 0 | Input validation + teaching loading | haiku | Simple validation |
| 1 | Platform analysis + strategy | opus | Complex pattern matching, algorithm understanding |
| 4 | PSF assembly + validation | sonnet | Assembly from existing content |

---

## Purpose

Determine WHERE to focus and HOW to optimize for each platform's algorithm. Platform selection is leverage—choosing wrong means fighting uphill. This skill translates audience intelligence into executable platform strategy.

**Success Criteria:**
- Primary platform selected with rationale
- Algorithm mechanics documented with 3+ positive signals
- Posting schedule optimized with 2+ time windows
- North star metric defined
- Gate G02 validation passes (8 requirements)

---

## Identity Boundaries

**This skill IS:**
- Platform-audience fit analysis
- Algorithm mechanics mapping
- Content format strategy per platform
- Posting schedule optimization
- Cross-platform content flow design
- Metrics framework definition

**This skill is NOT:**
- Audience research (that's S01)
- Voice/tone definition (that's S03)
- Actual content creation (that's S08-S13)
- Performance analysis (that's S19-S20)

---

## Layer Map

### Layer 0: Foundation

| Microskill | Purpose | Document |
|------------|---------|----------|
| 0.1 | Input Validator | [0.1-input-validator.md](skills/layer-0/0.1-input-validator.md) |
| 0.2 | Teaching Loader | [0.2-teaching-loader.md](skills/layer-0/0.2-teaching-loader.md) |
| 0.3 | AIF Loader | [0.3-aif-loader.md](skills/layer-0/0.3-aif-loader.md) |

### Layer 1: Analysis

| Microskill | Purpose | Document |
|------------|---------|----------|
| 1.1 | Platform-Audience Fit Matrix | [1.1-platform-fit-matrix.md](skills/layer-1/1.1-platform-fit-matrix.md) |
| 1.2 | Primary Platform Deep Dive | [1.2-primary-platform-deep-dive.md](skills/layer-1/1.2-primary-platform-deep-dive.md) |
| 1.3 | Secondary Platform Strategy | [1.3-secondary-platform-strategy.md](skills/layer-1/1.3-secondary-platform-strategy.md) |
| 1.4 | Content Flow Design | [1.4-content-flow-design.md](skills/layer-1/1.4-content-flow-design.md) |
| 1.5 | Posting Schedule Optimization | [1.5-posting-schedule-optimization.md](skills/layer-1/1.5-posting-schedule-optimization.md) |
| 1.6 | Metrics Framework | [1.6-metrics-framework.md](skills/layer-1/1.6-metrics-framework.md) |

### Layer 4: Output Packaging

| Microskill | Purpose | Document |
|------------|---------|----------|
| 4.1 | Output Assembler | [4.1-output-assembler.md](skills/layer-4/4.1-output-assembler.md) |
| 4.2 | Execution Log | [4.2-execution-log.md](skills/layer-4/4.2-execution-log.md) |

---

## Validation Requirements (Gate G02)

- [ ] primary_platform.name (valid platform)
- [ ] primary_platform.selection_rationale (not empty)
- [ ] algorithm_mechanics.ranking_signals.positive (>=3)
- [ ] format_strategy.primary_format (valid format)
- [ ] posting_schedule.weekly_posts (>=3)
- [ ] posting_schedule.optimal_times (>=2)
- [ ] metrics_framework.north_star_metric.metric (defined)
- [ ] content_flow.primary_to_secondary (>=1 if secondary exists)

---

## Constraints

### Input Constraints
- NEVER proceed without AIF from S01
- NEVER proceed without Gate G01 passing
- NEVER accept platform selection without audience fit evidence

### Layer 1 Constraints
- NEVER select primary platform based on creator preference alone — MUST be audience-driven
- NEVER skip algorithm mechanics documentation — minimum 3 positive signals required
- NEVER accept posting schedule without time optimization data
- NEVER skip north star metric definition
- NEVER proceed to S03 without Gate G02 passing

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-04 | Initial decomposition from monolithic SKILL.md |
