# Skill Architecture Updates v2.0

**Source:** Rich Call Analysis (2026-01-25)
**Applies To:** Skills 00-05 (Research & Strategy Phase)
**Implementation Priority:** CRITICAL

---

## Overview

This document defines the architectural enhancements being applied to all skills 00-05. Each enhancement section includes the exact template to add to skill documents.

---

## 1. Dispatcher/Manager Architecture

### Purpose
Replace direct skill execution with a three-tier model:
```
USER ↔ MANAGER AGENT ↔ PERSONA SUB-AGENTS
```

### Template Section (Add after "Identity Boundaries")

```markdown
---

## Manager Agent Architecture

### Execution Model

```
USER REQUEST
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MANAGER AGENT                                │
│                                                                 │
│  Responsibilities:                                              │
│  • Parse task requirements from user/upstream                   │
│  • Select optimal persona(s) for each subtask                   │
│  • Route work to persona sub-agents                             │
│  • Aggregate and validate outputs                               │
│  • Enforce quality thresholds                                   │
│  • Trigger feedback bus when quality fails                      │
│  • Log learnings to continuous learning log                     │
│                                                                 │
│  NEVER performs analysis or generation directly                 │
│  ALWAYS delegates to persona sub-agents                         │
└─────────────────────────────────────────────────────────────────┘
     │
     ├─────────────────────────────────────────────┐
     │                                             │
     ▼                                             ▼
┌─────────────────────────┐         ┌─────────────────────────┐
│   PERSONA SUB-AGENT 1   │         │   PERSONA SUB-AGENT N   │
│                         │         │                         │
│  • Specific expertise   │         │  • Different expertise  │
│  • Distinct voice       │         │  • Distinct voice       │
│  • Quality signature    │         │  • Quality signature    │
└─────────────────────────┘         └─────────────────────────┘
```

### Persona Deployment for This Skill

| Task Type | Primary Persona | Secondary Persona |
|-----------|-----------------|-------------------|
| [TASK_1]  | [PERSONA_1]     | [PERSONA_2]       |
| [TASK_2]  | [PERSONA_3]     | [PERSONA_4]       |

See [PERSONA-SYSTEM.md](../PERSONA-SYSTEM.md) for full persona specifications.
```

---

## 2. Quality Threshold System

### Purpose
Solve the "appearing helpful" problem by enforcing explicit thresholds with evidence.

### Threshold Levels

| Level | Threshold | When Triggered | Action on Failure |
|-------|-----------|----------------|-------------------|
| **STANDARD** | 70% | Default for all outputs | Flag for review |
| **ELEVATED** | 85% | Key strategic decisions | Require justification |
| **CRITICAL** | 95% | Gate-passing outputs | Block and remediate |

### Template Section (Add in "Constraints" section)

```markdown
### Quality Threshold Constraints

**Quality Threshold Enforcement:**
- STANDARD (70%): Applied to all intermediate outputs
- ELEVATED (85%): Applied to [SPECIFY_OUTPUTS]
- CRITICAL (95%): Applied to [SPECIFY_OUTPUTS]

**Quality Threshold Protocol:**
1. Every output receives quality score (0-100)
2. Score must meet threshold for task type
3. If score < threshold:
   - Log failure reason with specific evidence
   - Attempt remediation (max 2 iterations)
   - If still failing, trigger feedback bus or escalate

**Evidence Requirements:**
- ELEVATED outputs require quality_evidence block
- CRITICAL outputs require quality_evidence + peer_validation

```yaml
quality_evidence:
  score: integer (0-100)
  threshold_type: enum[standard, elevated, critical]
  threshold_met: boolean
  scoring_dimensions:
    - dimension: string
      score: integer
      evidence: string  # Specific proof of score
  remediation_attempts: integer
  peer_validation: object  # Required for CRITICAL only
```
```

---

## 3. Creativity Mode Protocol

### Purpose
Enable LLM creative generation while acknowledging inherent limitations.

### When to Apply
- Skills 03-05 (Mechanism, Promise, Big Ideas)
- Any task requiring novel ideation or combination
- Naming, headline, lead generation

### Template Section (Add new section for creative skills)

```markdown
---

## Creativity Mode Protocol

### When Activated
Creativity mode engages for tasks requiring:
- Novel naming generation
- Headline ideation
- Lead writing
- Creative wrapper development
- Unique angle discovery

### Creativity Protocol Steps

1. **Acknowledge Limitation**
   - LLMs have distribution bias toward common outputs
   - First outputs are rarely the most creative
   - Novelty requires explicit forcing

2. **Low-Probability Combination Forcing**
   ```
   For each creative task:
   1. Generate initial candidates (will be distribution-biased)
   2. Identify the "expected" outputs
   3. Explicitly request ALTERNATIVES to expected outputs
   4. Force unusual combinations:
      - Take element A from unexpected domain
      - Combine with element B from target domain
      - Validate the combination still works
   5. Rate novelty explicitly (1-10)
   6. Reject candidates with novelty < 6
   ```

3. **Constraint Relaxation Cycles**
   ```
   Cycle 1: Generate within all constraints
   Cycle 2: Relax [specificity] constraint, generate
   Cycle 3: Relax [format] constraint, generate
   Cycle 4: Recombine best elements from cycles 1-3
   Cycle 5: Reapply all constraints to recombined candidates
   ```

4. **Verbalized Sampling** (Already in skills)
   - Minimum 4 distribution-level prompts
   - Each prompt explores different creative direction

### Creativity Mode Output Requirements

```yaml
creative_output:
  candidates: [object]
  generation_method: string  # Which protocol steps used
  novelty_scores: [integer]  # Per candidate
  expected_outputs_rejected: [string]  # What was discarded as too obvious
  constraint_relaxation_log: [object]  # What was relaxed when
```

### Manager Responsibility
The Manager Agent:
- Activates creativity mode for appropriate tasks
- Routes to Jake Torres (viral) or Legendary Copywriter (direct response) persona
- Validates novelty scores meet minimum threshold
- Logs successful creative patterns to continuous learning log
```

---

## 4. Feedback Bus Architecture

### Purpose
Allow downstream skills to request upstream re-runs when outputs don't meet needs.

### Template Section (Add after "Handoffs" section)

```markdown
---

## Feedback Bus

### Upstream Dependencies This Skill Can Request Re-Run

| Upstream Skill | Trigger Condition | Request Payload |
|----------------|-------------------|-----------------|
| [SKILL_XX]     | [CONDITION]       | [WHAT_TO_FIX]   |

### Downstream Skills That Can Request This Skill Re-Run

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| [SKILL_XX]       | [CONDITION]       | [WHAT_TO_PROVIDE] |

### Feedback Bus Protocol

**When Downstream Requests Re-Run:**
1. Receive feedback_request from downstream skill
2. Log request to continuous learning log
3. Identify specific deficiency cited
4. Re-execute relevant layer(s) with deficiency focus
5. Validate new output addresses feedback
6. Send updated output to downstream skill
7. If still failing after 2 re-runs → escalate to human

**Feedback Request Schema:**
```yaml
feedback_request:
  requesting_skill: string
  target_skill: string
  deficiency_type: enum[missing_data, insufficient_quality, wrong_format, logical_gap, proof_gap]
  specific_issue: string
  evidence: string
  suggested_remedy: string
  priority: enum[blocking, important, nice_to_have]
```

**Feedback Response Schema:**
```yaml
feedback_response:
  original_request_id: string
  status: enum[resolved, partial, escalated]
  changes_made: [string]
  new_output_section: string  # Which part was updated
  validation: object  # Proof that issue is addressed
```
```

---

## 5. Verification Evidence System

### Purpose
Require proof of constraint compliance, not just claims of compliance.

### Template Section (Add to "Post-Processing Checkpoint")

```markdown
### Verification Evidence Requirements

Every checkpoint item requires EVIDENCE, not just assertion.

**Evidence Types:**
- **COUNT:** Numeric verification (e.g., "15 candidates generated" → list the 15)
- **MATCH:** Pattern matching (e.g., "all proof paired" → show each pairing)
- **SCORE:** Calculated value (e.g., "composite ≥7.0" → show calculation)
- **TRACE:** Source tracing (e.g., "derived from research" → cite source)

**Post-Processing Evidence Block:**
```yaml
verification_evidence:
  checkpoint_1:
    claim: string
    evidence_type: enum[count, match, score, trace]
    evidence: object
    verified: boolean
  checkpoint_2:
    # ...
  all_verified: boolean
```

**Example:**
```yaml
verification_evidence:
  checkpoint_1:
    claim: "≥15 raw candidates generated"
    evidence_type: count
    evidence:
      count: 17
      ids: ["PROM_001", "PROM_002", ..., "PROM_017"]
    verified: true
  checkpoint_2:
    claim: "All 5 promise types represented"
    evidence_type: match
    evidence:
      transformation: ["PROM_001", "PROM_005", "PROM_012"]
      improvement: ["PROM_002", "PROM_008"]
      relief: ["PROM_003", "PROM_009", "PROM_014"]
      capability: ["PROM_004", "PROM_011"]
      prevention: ["PROM_006", "PROM_015"]
    verified: true
```
```

---

## 6. Continuous Learning Log

### Purpose
Accumulate successes and failures for system improvement over time.

### Template Section (Add new section at end of skill)

```markdown
---

## Continuous Learning Log

### Log Location
`CopywritingEngine/LearningLog/[SKILL_ID]-learning.json`

### What Gets Logged

**On Every Run:**
```yaml
run_entry:
  run_id: string
  timestamp: string
  input_summary: object
  output_summary: object
  quality_scores: object
  threshold_met: boolean
```

**On Failure:**
```yaml
failure_entry:
  run_id: string
  failure_type: enum[threshold_fail, validation_fail, feedback_request, escalation]
  failure_point: string  # Which layer/microskill
  root_cause: string
  remediation_attempted: [string]
  remediation_successful: boolean
  learning: string  # What should be done differently
```

**On Success (CRITICAL threshold):**
```yaml
success_entry:
  run_id: string
  success_factors: [string]  # What contributed to high score
  patterns_to_replicate: [string]
  creative_approaches_that_worked: [string]  # For creativity mode
```

**On Feedback Bus Request:**
```yaml
feedback_entry:
  request_id: string
  requesting_skill: string
  deficiency_cited: string
  resolved: boolean
  resolution_approach: string
  time_to_resolution: string
```

### Manager Responsibility
The Manager Agent:
- Logs every run automatically
- Flags patterns for human review when failure rate > 20%
- Surfaces successful patterns for replication
- Queries log before creative tasks to avoid repeated failures
```

---

## Integration Checklist

For each skill (00-05), add the following sections:

- [ ] Manager Agent Architecture section
- [ ] Persona Deployment table (skill-specific)
- [ ] Quality Threshold Constraints
- [ ] Creativity Mode Protocol (for skills 03-05)
- [ ] Feedback Bus section with upstream/downstream tables
- [ ] Verification Evidence Requirements
- [ ] Continuous Learning Log section
- [ ] Update version number to X.2

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | 2026-01-25 | Initial architecture updates from Rich call |

