# 04-Mechanism Architecture Extension

**Version:** 1.1
**Extends:** MECHANISM-AGENT.md v2.1
**Source:** Rich Call Analysis (2026-01-25)
**Arena Layer:** See [ARENA-LAYER.md](./ARENA-LAYER.md)

---

## Manager Agent Architecture

### Execution Model

```
UPSTREAM: 00, 01, 02 outputs
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MANAGER AGENT                                │
│                    (This Document)                              │
│                                                                 │
│  Responsibilities:                                              │
│  • Load and validate all upstream outputs                       │
│  • Activate CREATIVITY MODE for Layer 1 naming                  │
│  • Route ideation to creative personas                          │
│  • Route scoring to evaluation personas                         │
│  • ROUTE ARENA COMPETITION (Layer 2.5)                          │
│  • Route validation to skeptical personas                       │
│  • Enforce 13-dimension scorecard thresholds                    │
│  • Trigger feedback bus when mechanism fails validation         │
│  • Log learnings to continuous learning log                     │
│                                                                 │
│  NEVER performs ideation, scoring, or validation directly       │
│  ALWAYS delegates to persona sub-agents                         │
└─────────────────────────────────────────────────────────────────┘
     │
     ├────────────────────────────────────────────────────────────┐
     │                                                            │
     ▼                                                            ▼
┌─────────────────────────────┐              ┌─────────────────────────────┐
│   Legendary Copywriter      │              │   Jake Torres               │
│   Copy Master               │              │   Viral Content Architect   │
│                             │              │                             │
│   Tasks:                    │              │   Tasks:                    │
│   • Mechanism naming (E5)   │              │   • Pattern-breaking names  │
│   • Explanation architecture│              │   • Unconventional angles   │
│   • Analogy development     │              │   • Fresh framing           │
│   • Proof integration       │              │   • Scroll-stopping hooks   │
└─────────────────────────────┘              └─────────────────────────────┘
     │                                                            │
     └────────────────────────────────────────────────────────────┤
                                                                  │
     ┌────────────────────────────────────────────────────────────┤
     │                                                            │
     ▼                                                            ▼
┌─────────────────────────────┐              ┌─────────────────────────────┐
│   Marcus Webster            │              │   Dr. Richard Stern         │
│   Pattern Synthesis         │              │   Skeptical Academic        │
│                             │              │                             │
│   Tasks:                    │              │   Tasks:                    │
│   • Pattern recognition     │              │   • Believability check     │
│   • Vault comparison        │              │   • Simplicity validation   │
│   • Connection mapping      │              │   • Proof sufficiency       │
│   • Mechanism type fit      │              │   • Anti-slop validation    │
└─────────────────────────────┘              └─────────────────────────────┘
```

### Persona Deployment Matrix

| Layer | Task Type | Primary Persona | Secondary Persona |
|-------|-----------|-----------------|-------------------|
| Layer 0 (Loading) | Upstream loading | Dr. James Liu | — |
| Layer 1.0 | Emphasis strategy | Marcus Webster | Legendary Copywriter |
| Layer 1.1 | Mechanism type selection | Marcus Webster | — |
| Layer 1.2 | **Naming generation** | **Legendary Copywriter** | **Jake Torres** |
| Layer 1.3 | Explanation architecture | Legendary Copywriter | Marcus Webster |
| Layer 1.4 | Analogy development | Legendary Copywriter | Jake Torres |
| Layer 1.5 | Proof mapping | Dr. James Liu | Dr. Alena Vasquez |
| Layer 2.1-2.13 | Scorecard optimization | Dr. Alena Vasquez | Legendary Copywriter |
| Layer 3.1-3.4 | Validation | Dr. Richard Stern | Dr. Alena Vasquez |
| Layer 3.5 | Selection | Alex Rivera | Dr. Richard Stern |
| Layer 4.1-4.3 | Package assembly | Alex Rivera | Dr. James Liu |

**CREATIVITY MODE REQUIRED:** Layer 1.2 (naming-generator) MUST activate creativity mode.

See [PERSONA-SYSTEM.md](../PERSONA-SYSTEM.md) for full persona specifications.

---

## Arena Layer Integration (Layer 2.5)

The Arena Layer transforms mechanism development from single-perspective to multi-perspective competition.

### Layer Position

```
Layer 0: Foundation (Upstream Loading)
Layer 1: Ideation (Emphasis Strategy, Type Selection, Naming, Explanation, Analogy, Proof Mapping)
Layer 2: Scorecard Optimization (13 Dimensions)
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
Layer 3: Validation (Minimum Threshold, Vault Comparison, Anti-Slop, Selection)
Layer 4: Output Packaging
```

### Arena Criteria (Mechanism Specific)

| Criterion | Weight | Definition |
|-----------|--------|------------|
| Scientific Credibility | 20% | Does mechanism feel scientifically legitimate? |
| Simplicity | 20% | Can a 12-year-old understand the core concept? |
| Name Memorability | 15% | Is name memorable, distinctive, repeatable? |
| Root Cause Resolution | 15% | Does mechanism naturally solve root cause? |
| Proof Supportability | 10% | Can claims be supported with proof? |
| TIER1 Pattern Match | 10% | How closely matches elite patterns? |
| Differentiation | 10% | Is this distinct from competitors? |

### Arena Execution Protocol

1. **Layer 2 completes** → Scorecard-optimized candidates ready
2. **Enter Arena Layer 2.5:**
   - 6 legendary copywriter personas generate complete mechanism packages
   - Each candidate judged against 7 criteria
   - Top 3 ranked with rationale
   - **Human selects winner (BLOCKING)**
3. **Selected candidate passes to Layer 3** for validation

**Full Arena specification:** See [ARENA-LAYER.md](./ARENA-LAYER.md)
**Persona definitions:** See [ARENA-PERSONA-PANEL.md](../../~system/protocols/ARENA-PERSONA-PANEL.md)

---

## Creativity Mode Protocol

### When Activated

Creativity mode is MANDATORY for:
- **Layer 1.2 (naming-generator):** 15+ naming candidates required
- **Layer 1.3 (explanation-architect):** Core explanatory logic
- **Layer 1.4 (analogy-developer):** Simplifying analogies

### Creativity Protocol Steps

**For Mechanism Naming (Layer 1.2):**

```
1. ACKNOWLEDGE LIMITATION
   - LLMs default to common naming patterns
   - First names will be "Deep Sleep Protocol", "Gut Reset System", etc.
   - True novelty requires explicit forcing

2. VERBALIZED SAMPLING (4 PASSES MINIMUM)
   Pass 1: Generate 5 names using E5 actual emphasis
   Pass 2: Generate 5 names using E5 unspoken emphasis
   Pass 3: Generate 5 names using unexpected domain combinations
   Pass 4: Generate 5 names using constraint relaxation

3. LOW-PROBABILITY COMBINATION FORCING
   For each pass:
   a. Identify "expected" names → REJECT these
   b. Force unusual element combinations:
      - Take naming element from unexpected industry
      - Combine with mechanism type from target niche
      - Validate combination still works
   c. Rate novelty explicitly (1-10)
   d. REJECT candidates with novelty < 6

4. CONSTRAINT RELAXATION CYCLES
   Cycle 1: Generate within all constraints
   Cycle 2: Relax clinical-naming constraint, generate branded names
   Cycle 3: Relax format constraint, generate metaphor-based names
   Cycle 4: Recombine best elements from cycles 1-3
   Cycle 5: Reapply all constraints to recombined candidates

5. ANTI-OBVIOUS FILTER
   Before finalizing candidates, explicitly check:
   - "Would a generic AI produce this name?" → If yes, REJECT
   - "Has this naming pattern been used in last 50 swipes?" → If yes, REJECT
   - "Does this feel surprising yet believable?" → If no, REJECT
```

### Creativity Mode Output Requirements

```yaml
creativity_output:
  task: "mechanism_naming"
  candidates: [object]
  generation_method:
    verbalized_passes: integer  # Must be ≥4
    constraint_relaxation_used: boolean
    combination_forcing_used: boolean
  novelty_scores: [integer]  # Per candidate
  expected_outputs_rejected:
    - name: string
      reason: "too common" | "pattern overused" | "AI-obvious"
  constraint_relaxation_log:
    - cycle: integer
      constraint_relaxed: string
      candidates_generated: [string]
```

---

## Quality Threshold Constraints

### Threshold Application

| Output Type | Threshold Level | Minimum Score | Evidence Required |
|-------------|-----------------|---------------|-------------------|
| Upstream loading | STANDARD | 70% complete | Presence check |
| Emphasis strategy | ELEVATED | 85% aligned | Strategy justification |
| Naming candidates | ELEVATED | 85% novel | Novelty scores + rejection log |
| 13-dimension scoring | CRITICAL | 95% accurate | Per-dimension evidence |
| Weighted average | CRITICAL | ≥7.0 | Calculation verification |
| Primary dimensions | CRITICAL | ≥7 each | Individual scores |
| Supporting dimensions | STANDARD | ≥5 each | Individual scores |
| Anti-slop validation | CRITICAL | ≤2.0 density | Slop audit |
| Vault comparison | ELEVATED | 85% differentiated | Comparison evidence |

### Quality Threshold Protocol

1. Every layer output receives quality score
2. Scorecard dimensions are the primary quality measure
3. If any PRIMARY dimension < 7: BLOCK and remediate
4. If any SUPPORTING dimension < 5: FLAG and remediate
5. If weighted average < 7.0: BLOCK and return to Layer 1
6. If slop density > 2.0: BLOCK and return to Layer 3

---

## Feedback Bus

### Upstream Dependencies This Skill Can Request Re-Run

| Upstream Skill | Trigger Condition | Request Payload |
|----------------|-------------------|-----------------|
| 03-root-cause | Root cause doesn't lead to mechanism | Request root cause re-derivation with mechanism alignment |
| 02-proof-inventory | Insufficient mechanism proof | Request proof discovery for mechanism claims |
| 01-research | Missing competitor mechanism patterns | Request competitive mechanism analysis |

### Downstream Skills That Can Request Re-Run

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| 05-promise | Mechanism doesn't deliver promise | Re-develop mechanism with promise constraint |
| 06-big-idea | Mechanism not differentiating enough | Re-run with differentiation emphasis |

### Feedback Request Handling

When feedback received:

1. Log request to continuous learning log
2. Identify deficiency layer:
   - **Naming issue:** Re-run Layer 1.2 with creativity mode and additional constraints
   - **Scoring issue:** Re-run Layer 2 with focus on weak dimension
   - **Differentiation issue:** Re-run with vault comparison focus
   - **Alignment issue:** Re-run with upstream constraint focus
3. Re-execute relevant layer(s)
4. Apply ELEVATED threshold to re-run outputs
5. Validate resolution before sending response

### Feedback Schemas

```yaml
feedback_request:
  requesting_skill: string
  target_skill: "04-mechanism"
  deficiency_type: enum[naming_weak, dimension_low, undifferentiated, misaligned, slop_detected]
  specific_issue: string
  affected_dimension: string  # If scorecard related
  evidence: string
  priority: enum[blocking, important, nice_to_have]

feedback_response:
  original_request_id: string
  status: enum[resolved, partial, escalated]
  changes_made:
    - layer_rerun: string
    - mechanism_name_changed: boolean
    - new_name: string
    - scores_changed: object
  validation:
    weighted_average: float
    all_thresholds_met: boolean
```

---

## Verification Evidence Requirements

### Layer Gate Evidence

**Layer 1 Gate Evidence (Ideation):**
```yaml
layer_1_gate_evidence:
  emphasis_strategy:
    claim: "Emphasis strategy defined"
    evidence_type: match
    evidence:
      primary_emphasis: string
      bandwidth_allocation: object
      primary_dimensions: [string]

  naming_candidates:
    claim: "≥15 naming candidates with novelty scores"
    evidence_type: count
    evidence:
      total_candidates: integer
      creativity_mode_used: boolean
      verbalized_passes: integer
      novelty_scores: [integer]
      rejected_as_obvious: [string]
      minimum_novelty_met: boolean  # All ≥6

  candidate_completeness:
    claim: "≥5 viable candidates with full components"
    evidence_type: match
    evidence:
      viable_count: integer
      per_candidate:
        - name: string
          has_explanation: boolean
          has_analogy: boolean
          has_proof_map: boolean
```

**Layer 2 Gate Evidence (Scoring):**
```yaml
layer_2_gate_evidence:
  dimension_coverage:
    claim: "All 13 dimensions scored for all candidates"
    evidence_type: count
    evidence:
      candidates_scored: integer
      dimensions_per_candidate: 13
      any_missing: boolean

  threshold_compliance:
    claim: "Primary ≥7, Supporting ≥5"
    evidence_type: score
    evidence:
      per_candidate:
        - name: string
          primary_dimensions:
            - dimension: string
              score: integer
              meets_threshold: boolean
          supporting_dimensions:
            - dimension: string
              score: integer
              meets_threshold: boolean
          weighted_average: float
```

**Layer 3 Gate Evidence (Validation):**
```yaml
layer_3_gate_evidence:
  winner_selection:
    claim: "Winner selected with rationale"
    evidence_type: trace
    evidence:
      winner_name: string
      winner_weighted_average: float
      runner_up_name: string
      runner_up_weighted_average: float
      selection_rationale: string

  anti_slop:
    claim: "Slop density ≤2.0"
    evidence_type: score
    evidence:
      winner_slop_density: float
      slop_instances_found: [string]
      remediation_applied: boolean

  vault_comparison:
    claim: "Differentiated from vault exemplars"
    evidence_type: match
    evidence:
      most_similar_exemplar: string
      similarity_score: float
      differentiation_points: [string]
```

---

## Continuous Learning Log

### Log Location
`learning-log/04-mechanism-learning.json`

### What Gets Logged

**On Every Run:**
```yaml
run_entry:
  run_id: string
  timestamp: string
  root_cause_input: string
  output_summary:
    winner_name: string
    mechanism_type: string
    weighted_average: float
    primary_emphasis: string
  creativity_mode:
    passes_used: integer
    candidates_rejected_as_obvious: integer
    final_novelty_score: integer
  quality_scores:
    all_dimensions: object
    slop_density: float
  threshold_met: boolean
```

**On Naming Pattern:**
```yaml
naming_pattern_entry:
  run_id: string
  niche: string
  mechanism_type: string
  naming_pattern_used: string
  novelty_score: integer
  differentiation_score: integer
  success_rating: integer  # Post-campaign feedback
  learning: string
```

**On Creativity Mode:**
```yaml
creativity_mode_entry:
  run_id: string
  task: "mechanism_naming"
  verbalized_passes: integer
  constraint_relaxation_cycles: integer
  obvious_names_rejected: [string]
  winning_name: string
  what_made_it_novel: string
  learning: string
```

**On Feedback Request Received:**
```yaml
feedback_received_entry:
  run_id: string
  requesting_skill: string
  deficiency_type: string
  dimension_affected: string
  resolution_approach: string
  new_weighted_average: float
```

### Manager Responsibility

The Manager Agent:
- Logs every run automatically
- Tracks naming patterns that score well by niche
- Flags when same naming patterns repeatedly rejected as obvious
- Queries log to inform creativity mode constraints
- Surfaces dimension patterns for scorecard calibration

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-02-03 | Added Arena Layer 2.5 integration with 6-persona competition, 7 judging criteria (Scientific Credibility, Simplicity, Name Memorability, Root Cause Resolution, Proof Supportability, TIER1 Match, Differentiation), human selection checkpoint |
| 1.0 | 2026-01-25 | Initial architecture extension from Rich call |

