# 05-Promise Architecture Extension

**Version:** 1.1
**Extends:** PROMISE-AGENT.md v2.1
**Source:** Rich Call Analysis (2026-01-25)
**Arena Layer:** See [ARENA-LAYER.md](./ARENA-LAYER.md)

---

## Manager Agent Architecture

### Execution Model

```
UPSTREAM: 00, 01, 02, 03 outputs
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MANAGER AGENT                                │
│                    (This Document)                              │
│                                                                 │
│  Responsibilities:                                              │
│  • Load and validate all upstream outputs                       │
│  • Activate CREATIVITY MODE for Layer 1 generation              │
│  • Route generation to creative personas                        │
│  • Route calibration to analytical personas                     │
│  • ROUTE ARENA COMPETITION (Layer 2.5)                          │
│  • Route validation to skeptical personas                       │
│  • Enforce proof ceiling constraints                            │
│  • Trigger feedback bus when calibration fails                  │
│  • Log learnings to continuous learning log                     │
│                                                                 │
│  NEVER performs generation or calibration directly              │
│  ALWAYS delegates to persona sub-agents                         │
└─────────────────────────────────────────────────────────────────┘
     │
     ├────────────────────────────────────────────────────────────┐
     │                                                            │
     ▼                                                            ▼
┌─────────────────────────────┐              ┌─────────────────────────────┐
│   Legendary Copywriter      │              │   Dr. Alena Vasquez         │
│   Copy Master               │              │   Evidence Evaluation       │
│                             │              │                             │
│   Tasks:                    │              │   Tasks:                    │
│   • Blue sky generation     │              │   • Proof ceiling check     │
│   • Promise language        │              │   • Calibration scoring     │
│   • Emotional framing       │              │   • Mechanism fit verify    │
│   • Specificity enhancement │              │   • Believability testing   │
└─────────────────────────────┘              └─────────────────────────────┘
     │                                                            │
     └────────────────────────────────────────────────────────────┤
                                                                  │
     ┌────────────────────────────────────────────────────────────┤
     │                                                            │
     ▼                                                            ▼
┌─────────────────────────────┐              ┌─────────────────────────────┐
│   Sarah Chen                │              │   Dr. Richard Stern         │
│   Competitive Intelligence  │              │   Skeptical Academic        │
│                             │              │                             │
│   Tasks:                    │              │   Tasks:                    │
│   • Competitor comparison   │              │   • Objection resilience    │
│   • Differentiation check   │              │   • Compliance check        │
│   • Market calibration      │              │   • Story coherence         │
│   • Saturation avoidance    │              │   • Proof verification      │
└─────────────────────────────┘              └─────────────────────────────┘
```

### Persona Deployment Matrix

| Layer | Task Type | Primary Persona | Secondary Persona |
|-------|-----------|-----------------|-------------------|
| Layer 1.1 | Blue sky generation | Legendary Copywriter | Jake Torres |
| Layer 1.2 | Promise type classification | Legendary Copywriter | — |
| Layer 1.3 | Emotional frame mapping | Legendary Copywriter | — |
| Layer 1.4 | Specificity enhancement | Legendary Copywriter | Dr. Alena Vasquez |
| Layer 1.5 | Mechanism connection | Legendary Copywriter | Marcus Webster |
| Layer 1.6 | Customer language | Dr. James Liu | Legendary Copywriter |
| Layer 2.1 | Proof ceiling application | Dr. Alena Vasquez | — |
| Layer 2.2 | Schwartz stage calibration | Sarah Chen | — |
| Layer 2.3 | Mechanism fit verification | Dr. Alena Vasquez | Marcus Webster |
| Layer 2.4 | Competitor differentiation | Sarah Chen | — |
| Layer 2.5 | Campaign thesis generation | Legendary Copywriter | Alex Rivera |
| Layer 3.1-3.6 | Validation | Dr. Richard Stern | Dr. Alena Vasquez |
| Layer 3.4 | Compliance check | Sarah A. Conco | Dr. Richard Stern |
| Layer 4.1-4.7 | Output packaging | Alex Rivera | Legendary Copywriter |

**CREATIVITY MODE REQUIRED:** Layer 1.1 (blue-sky-promise-generation) MUST activate creativity mode.

See [PERSONA-SYSTEM.md](../PERSONA-SYSTEM.md) for full persona specifications.

---

## Arena Layer Integration (Layer 2.5)

The Arena Layer transforms promise development from single-perspective to multi-perspective competition.

### Layer Position

```
Layer 0: Foundation (Upstream Loading)
Layer 1: Promise Drafting (Blue Sky, Types, Frames, Specificity, Mechanism Connection)
Layer 2: Calibration (Proof Ceiling, Schwartz Stage, Mechanism Fit, Differentiation, Thesis)
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LAYER 2.5: ARENA                             │
│                                                                 │
│  2.5.1: Multi-Perspective Generation (6 Personas)               │
│  2.5.2: Judging Round (7 Criteria)                              │
│  2.5.3: Ranking & Rationale                                     │
│  2.5.4: Human Selection Checkpoint (BLOCKING)                   │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
Layer 3: Validation (Proof Verification, Objection Resilience, Believability, Compliance)
Layer 4: Output Packaging
```

### Arena Criteria (Promise Specific)

| Criterion | Weight | Definition |
|-----------|--------|------------|
| Emotional Resonance | 20% | Does this promise tap the dominant emotion in the market? |
| Specificity | 20% | Is this promise specific enough to be believable? Timeframe? Quantity? |
| Mechanism Delivery | 15% | Does the mechanism clearly and inevitably deliver this promise? |
| Proof Ceiling Respect | 15% | Is this promise within the provable ceiling? No overclaims? |
| Differentiation | 10% | Is this promise distinct from competitors? Fresh in the market? |
| TIER1 Pattern Match | 10% | How closely does this match elite TIER1 promise patterns? |
| Campaign Thesis Strength | 10% | Does the thesis unify superiority + mechanism + promise powerfully? |

### Arena Execution Protocol

1. **Layer 2 completes** → Calibration candidates ready
2. **Enter Arena Layer 2.5:**
   - 6 legendary copywriter personas generate complete promise packages
   - Each candidate judged against 7 criteria
   - Top 3 ranked with rationale
   - **Human selects winner (BLOCKING)**
3. **Selected candidate passes to Layer 3** for validation

**Full Arena specification:** See [ARENA-LAYER.md](./ARENA-LAYER.md)
**Persona definitions:** See [ARENA-PERSONA-PANEL.md](../ARENA-PERSONA-PANEL.md)

---

## Creativity Mode Protocol

### When Activated

Creativity mode is MANDATORY for:
- **Layer 1.1 (blue-sky-promise-generation):** 15-25 raw candidates required
- **Layer 2.5 (campaign-thesis-generation):** Thesis variations
- **Layer 4.3 (promise-variations):** Copy-ready variations

### Creativity Protocol Steps

**For Promise Generation (Layer 1.1):**

```
1. ACKNOWLEDGE LIMITATION
   - LLMs default to vague, generic promises
   - First promises will be "lose weight fast", "make more money", etc.
   - Specificity and novelty require explicit forcing

2. VERBALIZED SAMPLING (4 PASSES MINIMUM)
   Pass 1: Generate promises using transformation framing
   Pass 2: Generate promises using relief framing
   Pass 3: Generate promises using capability framing
   Pass 4: Generate promises using unexpected specificity

3. SPECIFICITY FORCING
   For each candidate:
   a. Add timeframe if missing → REJECT vague timing
   b. Add quantity if possible → REJECT "more", "better", "improved"
   c. Add sensory detail → REJECT abstract promises
   d. Add customer language → REJECT marketing speak

4. CONSTRAINT RELAXATION CYCLES
   Cycle 1: Generate within proof ceiling constraints
   Cycle 2: Relax ceiling, generate blue-sky maximum promises
   Cycle 3: Identify most compelling from cycle 2
   Cycle 4: Back down cycle 2 promises to provable versions
   Cycle 5: Compare cycle 1 vs cycle 4, select best of each

5. ANTI-GENERIC FILTER
   Before finalizing candidates, explicitly check:
   - "Could this apply to any product in this niche?" → If yes, make more specific
   - "Does this sound like every other weight loss/golf/health promise?" → If yes, REJECT
   - "Would a prospect stop scrolling for this?" → If no, strengthen
```

### Creativity Mode Output Requirements

```yaml
creativity_output:
  task: "promise_generation"
  candidates: [object]
  generation_method:
    verbalized_passes: integer  # Must be ≥4
    specificity_forcing_applied: boolean
    constraint_relaxation_used: boolean
  specificity_scores: [integer]  # Per candidate
  generic_promises_rejected:
    - promise: string
      reason: "too vague" | "niche generic" | "not scroll-stopping"
  blue_sky_to_provable_mapping:
    - blue_sky: string
      provable_version: string
      ceiling_applied: string
```

---

## Quality Threshold Constraints

### Threshold Application

| Output Type | Threshold Level | Minimum Score | Evidence Required |
|-------------|-----------------|---------------|-------------------|
| Raw candidate count | STANDARD | ≥15 | Count verification |
| Promise specificity | ELEVATED | 85% specific | Specificity markers |
| Proof ceiling respect | CRITICAL | 100% compliant | Ceiling trace |
| Primary promise score | CRITICAL | ≥8.0 | Calibration scoring |
| Supporting promise score | ELEVATED | ≥6.5 | Calibration scoring |
| Campaign thesis score | ELEVATED | ≥7.5 | Thesis scoring |
| Mechanism alignment | CRITICAL | 100% aligned | Alignment verification |
| Validation status | CRITICAL | Not FAILED | Validation evidence |
| Compliance | CRITICAL | No blockers | Compliance audit |

### Quality Threshold Protocol

1. Every layer output receives quality score
2. If proof ceiling violated: BLOCK immediately, no override
3. If primary promise < 8.0: Return to Layer 1 for regeneration
4. If compliance blocker: BLOCK until resolved
5. If validation FAILED: Return to relevant layer

---

## Feedback Bus

### Upstream Dependencies This Skill Can Request Re-Run

| Upstream Skill | Trigger Condition | Request Payload |
|----------------|-------------------|-----------------|
| 02-proof-inventory | Proof ceiling too restrictive | Request proof discovery for specific claims |
| 03-root-cause | Root cause narrative doesn't support promise | Request root cause re-expression |
| 04-mechanism | Mechanism doesn't deliver promise | Request mechanism re-development with promise constraint |

### Downstream Skills That Can Request Re-Run

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| 06-big-idea | Campaign thesis doesn't support Big Idea | Re-generate thesis with Big Idea direction |
| 06-big-idea | Promise variations insufficient | Generate additional variations |

### Feedback Request Handling

When feedback received:

1. Log request to continuous learning log
2. Identify deficiency:
   - **Ceiling issue:** Cannot resolve without upstream re-run → Trigger 01
   - **Alignment issue:** Re-calibrate with mechanism constraint
   - **Differentiation issue:** Re-run Layer 2.4 with saturation data
   - **Thesis issue:** Re-run Layer 2.5 with Big Idea direction
3. Re-execute relevant layer(s)
4. Apply ELEVATED threshold to re-run outputs
5. Validate resolution before sending response

### Feedback Schemas

```yaml
feedback_request:
  requesting_skill: string
  target_skill: "05-promise"
  deficiency_type: enum[ceiling_conflict, alignment_fail, undifferentiated, thesis_weak, variations_insufficient]
  specific_issue: string
  affected_promise: string
  evidence: string
  priority: enum[blocking, important, nice_to_have]

feedback_response:
  original_request_id: string
  status: enum[resolved, partial, escalated]
  changes_made:
    - layer_rerun: string
    - promises_changed: [string]
    - thesis_changed: boolean
  validation:
    primary_score: float
    ceiling_respected: boolean
    mechanism_aligned: boolean
```

---

## Verification Evidence Requirements

### Layer Gate Evidence

**Layer 1 Gate Evidence (Generation):**
```yaml
layer_1_gate_evidence:
  candidate_count:
    claim: "≥15 raw candidates generated"
    evidence_type: count
    evidence:
      total_candidates: integer
      candidate_ids: [string]

  type_coverage:
    claim: "All 5 promise types represented"
    evidence_type: match
    evidence:
      transformation: [string]
      improvement: [string]
      relief: [string]
      capability: [string]
      prevention: [string]

  frame_coverage:
    claim: "≥3 emotional frames used"
    evidence_type: count
    evidence:
      frames_used: [string]
      count: integer

  creativity_mode:
    claim: "Creativity mode applied"
    evidence_type: trace
    evidence:
      verbalized_passes: integer
      specificity_forcing: boolean
      generic_rejected: [string]
```

**Layer 2 Gate Evidence (Calibration):**
```yaml
layer_2_gate_evidence:
  primary_selection:
    claim: "Primary promise selected with score ≥8.0"
    evidence_type: score
    evidence:
      primary_promise: string
      score: float
      scoring_dimensions: object

  ceiling_compliance:
    claim: "All promises within proof ceiling"
    evidence_type: match
    evidence:
      proof_ceiling: string
      promises_checked: integer
      all_compliant: boolean
      violations: [string]  # Should be empty

  mechanism_alignment:
    claim: "All promises deliverable by mechanism"
    evidence_type: match
    evidence:
      mechanism_name: string
      promises_checked: integer
      all_aligned: boolean
      misalignments: [string]  # Should be empty

  thesis_generation:
    claim: "Campaign thesis generated with score ≥7.5"
    evidence_type: score
    evidence:
      thesis_statement: string
      score: float
      components:
        superiority: string
        promise: string
        mechanism: string
```

**Layer 3 Gate Evidence (Validation):**
```yaml
layer_3_gate_evidence:
  validation_status:
    claim: "Primary promise validated (not FAILED)"
    evidence_type: match
    evidence:
      status: string
      dimension_scores: object
      any_high_severity_issues: boolean

  compliance:
    claim: "No compliance blockers"
    evidence_type: match
    evidence:
      ftc_compliant: boolean
      health_claims_checked: boolean
      platform_restrictions: [string]
      blockers: [string]  # Should be empty

  proof_pairings:
    claim: "All promises have proof pairings"
    evidence_type: match
    evidence:
      promises_count: integer
      all_paired: boolean
      unpaired: [string]  # Should be empty
```

---

## Continuous Learning Log

### Log Location
`CopywritingEngine/LearningLog/05-promise-learning.json`

### What Gets Logged

**On Every Run:**
```yaml
run_entry:
  run_id: string
  timestamp: string
  input_summary:
    proof_ceiling: string
    mechanism_name: string
    schwartz_stage: integer
  output_summary:
    primary_promise: string
    primary_score: float
    supporting_count: integer
    campaign_thesis: string
  creativity_mode:
    passes_used: integer
    candidates_rejected_as_generic: integer
    blue_sky_to_provable_conversions: integer
  quality_scores:
    calibration_scores: object
    validation_status: string
  threshold_met: boolean
```

**On Promise Pattern:**
```yaml
promise_pattern_entry:
  run_id: string
  niche: string
  schwartz_stage: integer
  promise_type: string
  emotional_frame: string
  primary_score: float
  success_rating: integer  # Post-campaign feedback
  learning: string
```

**On Ceiling Conflict:**
```yaml
ceiling_conflict_entry:
  run_id: string
  desired_promise: string
  proof_ceiling: string
  backed_down_to: string
  ceiling_constraint_applied: string
  resolution: string
```

**On Feedback Request Received:**
```yaml
feedback_received_entry:
  run_id: string
  requesting_skill: string
  deficiency_type: string
  promise_affected: string
  resolution_approach: string
  new_score: float
```

### Manager Responsibility

The Manager Agent:
- Logs every run automatically
- Tracks promise patterns that score well by niche/stage
- Flags when ceiling conflicts repeatedly occur
- Queries log to inform blue-sky vs provable balance
- Surfaces calibration score patterns for threshold adjustment

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-02-03 | Added Arena Layer 2.5 integration with 6-persona competition, 7 judging criteria (Emotional Resonance, Specificity, Mechanism Delivery, Proof Ceiling Respect, Differentiation, TIER1 Match, Campaign Thesis Strength), human selection checkpoint |
| 1.0 | 2026-01-25 | Initial architecture extension from Rich call |

