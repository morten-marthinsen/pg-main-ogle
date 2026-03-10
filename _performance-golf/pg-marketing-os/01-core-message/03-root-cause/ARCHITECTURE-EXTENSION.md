# 03-Root-Cause Architecture Extension

**Version:** 1.1
**Extends:** ROOT-CAUSE-AGENT.md v2.1
**Source:** Rich Call Analysis (2026-01-25)
**Arena Layer:** See [ARENA-LAYER.md](./ARENA-LAYER.md)

---

## Manager Agent Architecture

### Execution Model

```
UPSTREAM: 01-research + 02-proof-inventory outputs
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MANAGER AGENT                                │
│                    (This Document)                              │
│                                                                 │
│  Responsibilities:                                              │
│  • Load and validate upstream outputs                           │
│  • Route derivation to pattern analysts                         │
│  • Route expression to creative personas                        │
│  • ROUTE ARENA COMPETITION (Layer 2.5)                          │
│  • Route validation to skeptical evaluators                     │
│  • Aggregate and validate root cause package                    │
│  • Enforce quality thresholds                                   │
│  • Trigger feedback bus when derivation fails                   │
│  • Log learnings to continuous learning log                     │
│                                                                 │
│  NEVER performs derivation or expression directly               │
│  ALWAYS delegates to persona sub-agents                         │
└─────────────────────────────────────────────────────────────────┘
     │
     ├────────────────────────────────────────────────────────────┐
     │                                                            │
     ▼                                                            ▼
┌─────────────────────────────┐              ┌─────────────────────────────┐
│   Marcus Webster            │              │   Legendary Copywriter      │
│   Pattern Synthesis         │              │   Copy Master               │
│                             │              │                             │
│   Tasks:                    │              │   Tasks:                    │
│   • Research pattern mining │              │   • Expression selection    │
│   • False belief finding    │              │   • Reframe language        │
│   • Hidden layer discovery  │              │   • Villain dramatization   │
│   • Causal chain building   │              │   • Niche-appropriate voice │
└─────────────────────────────┘              └─────────────────────────────┘
     │                                                            │
     └────────────────────────────────────────────────────────────┤
                                                                  │
     ┌────────────────────────────────────────────────────────────┤
     │                                                            │
     ▼                                                            ▼
┌─────────────────────────────┐              ┌─────────────────────────────┐
│   Dr. Richard Stern         │              │   Alex Rivera               │
│   Skeptical Academic        │              │   Strategic Integration     │
│                             │              │                             │
│   Tasks:                    │              │   Tasks:                    │
│   • Truth validation        │              │   • Downstream alignment    │
│   • Logic checking          │              │   • Copy block assembly     │
│   • Objection anticipation  │              │   • Handoff packaging       │
│   • Resonance testing       │              │   • Integration guidance    │
└─────────────────────────────┘              └─────────────────────────────┘
```

---

## Arena Layer Integration (Layer 2.5)

The Arena Layer transforms root cause development from single-perspective to multi-perspective competition.

### Layer Position

```
Layer 0: Foundation (Upstream Loading)
Layer 1: Surface Mapping (Pattern Analysis, False Beliefs, Hidden Layers)
Layer 2: Root Discovery (Expression Methods)
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
Layer 3: Validation (Truth, Alignment, Resonance)
Layer 4: Output Packaging
```

### Arena Criteria (Root Cause Specific)

| Criterion | Weight | Definition |
|-----------|--------|------------|
| Counter-Intuitiveness | 20% | How unexpected is this root cause? |
| Externalization | 20% | Is blame clearly EXTERNAL to the reader? |
| Villain Specificity | 15% | How specific and named is the villain? |
| Failure Explanation | 15% | Does this explain ALL past failures + give hope? |
| Mechanism Setup | 10% | Does root cause lead naturally to mechanism? |
| TIER1 Pattern Match | 10% | How closely matches elite vault patterns? |
| Anchor Phrase Quality | 10% | Is anchor phrase memorable and distinctive? |

### Arena Execution Protocol

1. **Layer 2 completes** → Expression candidates ready
2. **Enter Arena Layer 2.5:**
   - 6 legendary copywriter personas generate complete root cause expressions
   - Each candidate judged against 7 criteria
   - Top 3 ranked with rationale
   - **Human selects winner (BLOCKING)**
3. **Selected candidate passes to Layer 3** for validation

**Full Arena specification:** See [ARENA-LAYER.md](./ARENA-LAYER.md)
**Persona definitions:** See [ARENA-PERSONA-PANEL.md](../../~system/protocols/ARENA-PERSONA-PANEL.md)

### Persona Deployment Matrix

| Layer | Task Type | Primary Persona | Secondary Persona |
|-------|-----------|-----------------|-------------------|
| Layer 1.1 | Research pattern analysis | Marcus Webster | Dr. James Liu |
| Layer 1.2 | Symptom convergence | Marcus Webster | — |
| Layer 1.3 | False belief identification | Marcus Webster | Dr. Richard Stern |
| Layer 1.4 | Hidden layer discovery | Marcus Webster | — |
| Layer 1.5-1.6 | Mechanism/Proof constraint checks | Dr. Richard Stern | — |
| Layer 1.7 | Derivation synthesis | Marcus Webster | Alex Rivera |
| Layer 2.1-2.5 | Expression methods | Legendary Copywriter | — |
| Layer 2.6 | Niche expression matching | Legendary Copywriter | Alex Rivera |
| Layer 2.7 | Expression synthesis | Legendary Copywriter | — |
| Layer 3.1-3.5 | Validation | Dr. Richard Stern | Dr. Alena Vasquez |
| Layer 4.1-4.4 | Output packaging | Alex Rivera | Dr. James Liu |

See [PERSONA-SYSTEM.md](../PERSONA-SYSTEM.md) for full persona specifications.

---

## Quality Threshold Constraints

### Threshold Application

| Output Type | Threshold Level | Minimum Score | Evidence Required |
|-------------|-----------------|---------------|-------------------|
| Research pattern mining | STANDARD | 70% coverage | Pattern documentation |
| Root cause derivation | ELEVATED | 85% confidence | Derivation evidence |
| Expression selection | ELEVATED | 85% niche-fit | Niche-expression match |
| Truth validation | CRITICAL | 95% truthful | Source verification |
| Mechanism alignment | CRITICAL | 95% aligned | Mechanism match proof |
| Proof availability | ELEVATED | 85% provable | Proof pathway map |
| Audience resonance | ELEVATED | 85% resonant | Resonance signals |
| Three-part completeness | CRITICAL | 95% complete | All parts populated |

### Quality Threshold Protocol

1. Every layer output receives quality score (0-100)
2. Score must meet threshold for output type
3. If score < threshold:
   - Log failure reason with specific evidence
   - Attempt remediation (max 2 iterations)
   - If still failing, trigger feedback bus OR escalate

### Validation Score Thresholds (from v2.1)

| Dimension | Minimum | Good | Excellent |
|-----------|---------|------|-----------|
| Truth | 6.0 | 7.5 | 9.0+ |
| Mechanism Alignment | 7.0 | 8.0 | 9.0+ |
| Proof Availability | 6.0 | 7.0 | 8.5+ |
| Audience Resonance | 7.0 | 8.0 | 9.0+ |
| Composite | 6.5 | 7.5 | 8.5+ |

---

## Feedback Bus

### Upstream Dependencies This Skill Can Request Re-Run

| Upstream Skill | Trigger Condition | Request Payload |
|----------------|-------------------|-----------------|
| 01-research | Insufficient customer language for expression | Request customer language database expansion |
| 01-research | Missing false belief patterns | Request belief analysis re-run |
| 02-proof-inventory | Proof ceiling blocks root cause claims | Request proof discovery for specific claims |

### Downstream Skills That Can Request Re-Run

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| 04-mechanism | Root cause doesn't lead to mechanism | Re-derive root cause with mechanism constraint |
| 05-promise | Root cause narrative doesn't support promise | Re-express root cause for promise alignment |
| 06-big-idea | Villain not compelling enough | Re-express with stronger villain dramatization |

### Feedback Request Handling

When feedback received:

1. Log request to continuous learning log
2. Identify deficiency location:
   - **Derivation issue:** Re-run Layer 1 with constraint focus
   - **Expression issue:** Re-run Layer 2 with expression method change
   - **Validation issue:** Address specific validation failure
   - **Handoff issue:** Repackage for requesting skill
3. Re-execute relevant layer(s)
4. Apply ELEVATED threshold to re-run outputs
5. Validate resolution before sending response

### Feedback Schemas

```yaml
feedback_request:
  requesting_skill: string
  target_skill: "03-root-cause"
  deficiency_type: enum[derivation_weak, expression_mismatch, validation_fail, handoff_incomplete]
  specific_issue: string
  affected_component: enum[what_they_think, what_real, why_nothing_worked, villain, countersell]
  evidence: string
  priority: enum[blocking, important, nice_to_have]

feedback_response:
  original_request_id: string
  status: enum[resolved, partial, escalated]
  changes_made:
    - layer_rerun: string
    - component_changed: string
    - new_content: string
  validation:
    threshold_met: boolean
    scores: object
```

---

## Verification Evidence Requirements

### Layer Gate Evidence

**Layer 1 Gate Evidence (Derivation):**
```yaml
layer_1_gate_evidence:
  pattern_analysis:
    claim: "Root cause derived from research patterns"
    evidence_type: trace
    evidence:
      source_patterns: [string]  # Which research patterns led here
      pattern_sources: [string]  # Source document references
      derivation_logic: string   # How patterns led to root cause

  constraint_checks:
    claim: "Mechanism and proof constraints satisfied"
    evidence_type: match
    evidence:
      mechanism_check:
        can_mechanism_solve: boolean
        mechanism_name: string
        connection_explanation: string
      proof_check:
        proof_pathway_exists: boolean
        relevant_proof_ids: [string]
        proof_ceiling_respected: boolean
```

**Layer 2 Gate Evidence (Expression):**
```yaml
layer_2_gate_evidence:
  niche_match:
    claim: "Expression method matches niche"
    evidence_type: match
    evidence:
      niche: string
      expression_method: string
      niche_expression_rule: string  # From decision tree
      override_used: boolean
      override_justification: string

  three_part_completeness:
    claim: "All three parts populated"
    evidence_type: count
    evidence:
      what_they_think:
        populated: boolean
        word_count: integer
      what_real:
        populated: boolean
        word_count: integer
      why_nothing_worked:
        populated: boolean
        word_count: integer
```

**Layer 3 Gate Evidence (Validation):**
```yaml
layer_3_gate_evidence:
  validation_scores:
    claim: "All dimensions meet minimum thresholds"
    evidence_type: score
    evidence:
      truth: float
      mechanism_alignment: float
      proof_availability: float
      audience_resonance: float
      composite: float
      all_above_minimum: boolean
      decision: enum[approved, conditional, revision, blocked]

  decision_rationale:
    claim: "Decision justified with evidence"
    evidence_type: trace
    evidence:
      decision: string
      supporting_evidence: [string]
      concerns_addressed: [string]
```

---

## Continuous Learning Log

### Log Location
`learning-log/03-root-cause-learning.json`

### What Gets Logged

**On Every Run:**
```yaml
run_entry:
  run_id: string
  timestamp: string
  niche: string
  input_summary:
    surface_problem: string
    schwartz_stage: integer
  output_summary:
    root_cause_statement: string
    expression_method: string
    reframe_technique: string
    validation_decision: string
  quality_scores:
    truth: float
    mechanism_alignment: float
    proof_availability: float
    audience_resonance: float
    composite: float
  threshold_met: boolean
```

**On Derivation Pattern:**
```yaml
derivation_pattern_entry:
  run_id: string
  niche: string
  derivation_source: enum[convergence, false_belief, hidden_layer, combination]
  pattern_elements_used: [string]
  success_rating: integer  # Post-campaign feedback
  learning: string
```

**On Expression Method:**
```yaml
expression_method_entry:
  run_id: string
  niche: string
  method_selected: string
  niche_rule_followed: boolean
  override_used: boolean
  resonance_score: float
  learning: string
```

**On Feedback Request Received:**
```yaml
feedback_received_entry:
  run_id: string
  requesting_skill: string
  deficiency_type: string
  component_affected: string
  resolution_approach: string
  new_validation_score: float
```

### Manager Responsibility

The Manager Agent:
- Logs every run automatically
- Tracks expression method success by niche
- Flags when same derivation approach fails repeatedly
- Queries log to inform expression method selection
- Surfaces validation score patterns for calibration

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-02-03 | Added Arena Layer 2.5 integration with 6-persona competition, 7 judging criteria, human selection checkpoint |
| 1.0 | 2026-01-25 | Initial architecture extension from Rich call |

