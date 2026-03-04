# Continuous Learning Log Schema

**Version:** 1.0
**Purpose:** Accumulate successes and failures for system improvement over time
**Source:** Rich Call Analysis (2026-01-25)

---

## Overview

The Continuous Learning Log is a persistent storage system that captures patterns across skill executions. Each skill maintains its own log file, and a master aggregation process surfaces cross-skill patterns.

---

## Directory Structure

```
CopywritingEngine/LearningLog/
├── SCHEMA.md                        ← This file
├── 01-research-learning.json
├── 02-proof-inventory-learning.json
├── 03-root-cause-learning.json
├── 04-mechanism-learning.json
├── 05-promise-learning.json
├── 06-big-idea-learning.json
└── cross-skill-patterns.json        ← Aggregated patterns
```

---

## Common Entry Types

### 1. Run Entry (Every Execution)

Every skill execution logs a run entry.

```yaml
run_entry:
  run_id: string         # Unique identifier: "skill_XX_YYYYMMDD_HHMMSS"
  timestamp: string      # ISO 8601 format
  skill_id: string       # e.g., "01-research"
  skill_version: string  # e.g., "4.0"

  input_summary:
    # Skill-specific input fields
    # See individual skill schemas

  output_summary:
    # Skill-specific output fields
    # See individual skill schemas

  quality_scores:
    # Per-layer or per-dimension scores
    overall: integer (0-100)

  threshold_met: boolean

  execution_metadata:
    duration_seconds: integer
    tokens_consumed: integer
    personas_used: [string]
    layers_executed: [string]
```

---

### 2. Failure Entry (On Threshold Failure)

Logged when any quality threshold is not met.

```yaml
failure_entry:
  run_id: string
  failure_type: enum[threshold_fail, validation_fail, gate_fail, escalation]

  failure_details:
    layer: string              # Which layer failed
    threshold_type: string     # standard/elevated/critical
    expected_score: integer
    actual_score: integer
    specific_dimension: string # If dimension-specific

  remediation:
    attempts: integer
    approaches_tried: [string]
    successful: boolean
    final_score: integer

  root_cause_analysis:
    identified_cause: string
    upstream_dependency: string  # If failure traced to upstream

  learning: string  # What should be done differently
```

---

### 3. Feedback Bus Entry (On Feedback Request)

Logged when feedback bus is triggered.

```yaml
feedback_entry:
  run_id: string

  request:
    requesting_skill: string
    target_skill: string
    deficiency_type: string
    specific_issue: string
    priority: string

  resolution:
    status: enum[resolved, partial, escalated]
    layers_rerun: [string]
    changes_made: [string]
    time_to_resolution_minutes: integer

  pattern_flag:
    is_recurring: boolean      # Has this request type happened before?
    occurrence_count: integer  # How many times?

  learning: string
```

---

### 4. Success Entry (On CRITICAL Threshold Success)

Logged when CRITICAL threshold outputs succeed on first attempt.

```yaml
success_entry:
  run_id: string

  success_details:
    layer: string
    threshold_type: "critical"
    score_achieved: integer

  success_factors:
    - factor: string
      contribution: string

  patterns_to_replicate:
    - pattern: string
      context: string

  # For creative skills only:
  creative_approaches_that_worked:
    - approach: string
      novelty_score: integer
```

---

### 5. Pattern Entry (Skill-Specific)

Skill-specific patterns logged for future reference.

See individual skill ARCHITECTURE-EXTENSION.md files for pattern entry schemas:
- Derivation patterns (03-root-cause)
- Naming patterns (04-mechanism)
- Promise patterns (05-promise)
- Big Idea patterns (06-big-idea)

---

## Cross-Skill Patterns File

The `cross-skill-patterns.json` aggregates patterns across all skills.

```yaml
cross_skill_patterns:
  last_updated: string

  feedback_bus_patterns:
    - pattern:
        source_skill: string
        target_skill: string
        deficiency_type: string
      occurrence_count: integer
      typical_resolution: string
      prevention_recommendation: string

  quality_trends:
    by_skill:
      - skill_id: string
        average_score_30_day: float
        threshold_fail_rate: float
        trend: enum[improving, stable, declining]

    by_niche:
      - niche: string
        skills_with_issues: [string]
        common_failure_modes: [string]

  creativity_patterns:
    successful_approaches:
      - approach: string
        skills_used_in: [string]
        average_novelty_score: float
    approaches_to_avoid:
      - approach: string
        reason: string

  system_recommendations:
    - recommendation: string
      based_on: string
      priority: enum[high, medium, low]
```

---

## Manager Agent Responsibilities

Each skill's Manager Agent is responsible for:

1. **Automatic Logging**
   - Create run entry at execution start
   - Update run entry at completion
   - Log failure entries when thresholds not met
   - Log success entries when CRITICAL thresholds met first try

2. **Pattern Detection**
   - Query log before execution to check for recurring issues
   - Flag patterns for human review when threshold exceeded
   - Reference successful patterns when relevant

3. **Feedback Bus Integration**
   - Log all feedback requests sent and received
   - Track resolution success rates
   - Flag recurring feedback patterns

---

## Query Interface

Manager Agents can query the learning log with these patterns:

```yaml
# Check if this failure type has occurred before
query_failure_pattern:
  skill_id: string
  failure_type: string
  lookback_days: integer

# Check what worked for similar inputs
query_success_pattern:
  skill_id: string
  input_similarity:
    niche: string
    schwartz_stage: integer
  lookback_days: integer

# Check feedback bus history
query_feedback_history:
  target_skill: string
  requesting_skill: string
  lookback_days: integer

# Get cross-skill recommendations
query_system_recommendations:
  skill_id: string
  niche: string
```

---

## Retention Policy

- **Run entries:** Retained 90 days, then summarized
- **Failure entries:** Retained 180 days (learning value)
- **Success entries (CRITICAL):** Retained 180 days (pattern value)
- **Feedback entries:** Retained 180 days (system improvement)
- **Cross-skill patterns:** Retained indefinitely, updated daily

---

## Human Review Triggers

The system flags for human review when:

1. **Failure rate > 20%** for any skill in 7-day window
2. **Same feedback request** occurs 3+ times between same skill pair
3. **Quality trend = declining** for any skill over 14 days
4. **Creativity novelty scores** consistently < 6 across runs
5. **Escalation rate > 10%** for any skill

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-25 | Initial schema from Rich call analysis |

