# 06-Big-Ideas Architecture Extension

**Version:** 1.1
**Extends:** BIG-IDEA-AGENT.md v3.1
**Source:** Rich Call Analysis (2026-01-25)
**Arena Layer:** See [ARENA-LAYER.md](./ARENA-LAYER.md)

---

## Manager Agent Architecture

### Execution Model

```
UPSTREAM: 02, 03, 04 outputs (+ 00 for market context)
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MANAGER AGENT                                │
│                    (This Document)                              │
│                                                                 │
│  Responsibilities:                                              │
│  • Load and validate all upstream outputs                       │
│  • Verify campaign coherence BEFORE generation                  │
│  • Activate CREATIVITY MODE for all layers                      │
│  • Route type selection to analytical personas                  │
│  • Route generation to creative personas                        │
│  • ROUTE ARENA COMPETITION (Layer 2.5)                          │
│  • Route validation to skeptical personas                       │
│  • Enforce coherence and differentiation thresholds             │
│  • Trigger feedback bus when synthesis fails                    │
│  • Log learnings to continuous learning log                     │
│                                                                 │
│  NEVER performs synthesis or creative generation directly       │
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
│   • Big Idea synthesis      │              │   • Pattern-breaking angles │
│   • Creative wrapper dev    │              │   • Unconventional combos   │
│   • Headline generation     │              │   • Fresh creative frames   │
│   • Lead writing            │              │   • Scroll-stopping hooks   │
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
│   • Type selection          │              │   • Coherence validation    │
│   • Vault pattern matching  │              │   • Differentiation check   │
│   • Saturation analysis     │              │   • Plausibility testing    │
│   • Connection synthesis    │              │   • Anti-slop validation    │
└─────────────────────────────┘              └─────────────────────────────┘
                                                      │
                                                      ▼
                              ┌─────────────────────────────┐
                              │   Alex Rivera               │
                              │   Strategic Integration     │
                              │                             │
                              │   Tasks:                    │
                              │   • Final selection         │
                              │   • Handoff packaging       │
                              │   • Integration guidance    │
                              └─────────────────────────────┘
```

### Persona Deployment Matrix

| Layer | Task Type | Primary Persona | Secondary Persona |
|-------|-----------|-----------------|-------------------|
| Layer 0 | Input synthesis | Dr. James Liu | — |
| Layer 0 | Coherence pre-check | Dr. Richard Stern | — |
| Layer 1 | Type strategy | Marcus Webster | Sarah Chen |
| Layer 1 | Saturation check | Sarah Chen | Marcus Webster |
| Layer 2 | **Candidate generation** | **Legendary Copywriter** | **Jake Torres** |
| Layer 2 | **Headline generation** | **Legendary Copywriter** | **Jake Torres** |
| Layer 2 | **Lead writing** | **Legendary Copywriter** | **Jake Torres** |
| Layer 3 | Coherence validation | Dr. Richard Stern | Marcus Webster |
| Layer 3 | Differentiation scoring | Marcus Webster | Sarah Chen |
| Layer 3 | Anti-slop validation | Dr. Richard Stern | — |
| Layer 4 | Selection | Alex Rivera | Dr. Richard Stern |
| Layer 4 | Handoff packaging | Alex Rivera | Dr. James Liu |

**CREATIVITY MODE REQUIRED:** ALL of Layer 2 MUST activate creativity mode.

See [PERSONA-SYSTEM.md](../PERSONA-SYSTEM.md) for full persona specifications.

---

## Arena Layer Integration (Layer 2.5)

The Arena Layer transforms Big Idea development from single-perspective to multi-perspective competition, using the Resonance/Surprise Framework.

### Layer Position

```
Layer 0: Foundation (Upstream Loading, Coherence Pre-Check)
Layer 1: Type Strategy (Pattern Analysis, Saturation Mapping, Gap Identification)
Layer 2: Candidate Generation (Big Ideas, Headlines, Leads)
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LAYER 2.5: ARENA                             │
│                                                                 │
│  2.5.1: Multi-Perspective Generation (6 Personas)               │
│  2.5.2: Judging Round (Resonance/Surprise + 7 Criteria)         │
│  2.5.3: Ranking & Rationale                                     │
│  2.5.4: Human Selection Checkpoint (BLOCKING)                   │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
Layer 3: Validation (Coherence, Differentiation, Anti-Slop)
Layer 4: Output Packaging
```

### Arena Criteria (Big Idea Specific)

| Criterion | Weight | Definition |
|-----------|--------|------------|
| Emotional Resonance | 20% | Does this tap the dominant under-articulated emotion? Does market FEEL this? |
| Schema Distance (Surprise) | 20% | Is this in the sweet spot (4-6)? Different enough for attention, relevant enough for connection? |
| Failure Explanation + Hope | 15% | Does this explain ALL past failures AND give a hopeful new worldview? |
| Specificity | 10% | Is this Big Idea specific, not vague? Concrete claims? |
| Defensibility | 10% | Can this Big Idea be defended with proof? |
| TIER1 Pattern Match | 10% | How closely does this match elite TIER1 Big Idea patterns? |
| Campaign Coherence | 15% | Does this Big Idea unify RC + Mechanism + Promise coherently? |

**Note on Schema Distance:** Unlike other criteria where higher = better, Schema Distance has an OPTIMAL RANGE. Score 4-6 is ideal; 1-3 (too close) and 7-10 (too far) both indicate problems.

### Arena Execution Protocol

1. **Layer 2 completes** → Big Idea candidates ready
2. **Enter Arena Layer 2.5:**
   - 6 legendary copywriter personas generate complete Big Idea packages
   - Each candidate judged against 7 criteria (with Resonance/Surprise Framework)
   - Schema distance calibrated to market aggregate
   - Top 3 ranked with rationale
   - **Human selects winner (BLOCKING)**
3. **Selected candidate passes to Layer 3** for validation

**Full Arena specification:** See [ARENA-LAYER.md](./ARENA-LAYER.md)
**Persona definitions:** See [ARENA-PERSONA-PANEL.md](../../~system/protocols/ARENA-PERSONA-PANEL.md)

---

## Creativity Mode Protocol

### When Activated

Creativity mode is MANDATORY for ALL creative tasks in Layer 2:
- Big Idea candidate generation (5+ candidates)
- Headline generation (10+ per candidate)
- Lead writing (3+ per candidate, 200-500 words each)
- Creative wrapper development

### Creativity Protocol Steps

**For Big Idea Synthesis (Layer 2):**

```
1. ACKNOWLEDGE LIMITATION
   - LLMs default to obvious combinations of upstream inputs
   - First Big Ideas will be "The [mechanism] secret to [promise]"
   - True novelty requires explicit forcing AND synthesis creativity

2. SYNTHESIS FORCING
   For each candidate:
   a. Identify the "obvious" Big Idea → DOCUMENT IT
   b. Force alternative synthesis:
      - Different entry point (villain-first vs promise-first vs mechanism-first)
      - Different frame (discovery vs enemy vs transformation)
      - Different emotional angle
   c. Rate synthesis novelty (1-10)
   d. REJECT candidates with synthesis novelty < 6

3. HEADLINE GENERATION PROTOCOL
   For each Big Idea candidate:
   Pass 1: Generate 3 headlines using vault inspiration (cite swipe_id)
   Pass 2: Generate 3 headlines using pattern inversion
   Pass 3: Generate 3 headlines forcing specificity
   Pass 4: Generate 3 headlines using unexpected emotional angle
   Anti-obvious filter: REJECT any headline a generic AI would produce

4. LEAD WRITING PROTOCOL
   For each Big Idea candidate:
   a. Generate story lead (200-500 words) → Must have specific protagonist
   b. Generate problem agitation lead → Must escalate tension
   c. Generate revelation lead → Must have genuine insight moment
   Each lead MUST:
   - Include villain from root cause
   - Connect to mechanism
   - Anchor the promise
   - Feel fresh (not template-following)

5. ANTI-TEMPLATE FILTER
   Before finalizing any creative output:
   - "Does this follow an obvious template?" → If yes, REJECT and regenerate
   - "Would I scroll past this?" → If yes, strengthen
   - "Is the villain actually present?" → If no, revise
   - "Does this FEEL like a Big Idea or just a mechanism + promise?" → If latter, revise
```

### Creativity Mode Output Requirements

```yaml
creativity_output:
  task: "big_idea_synthesis"
  candidates:
    - id: string
      big_idea_statement: string
      synthesis_novelty_score: integer
      obvious_version_rejected: string
  headlines_per_candidate:
    - candidate_id: string
      headlines:
        - headline: string
          generation_method: string
          vault_inspiration: string
          novelty_score: integer
      obvious_rejected: [string]
  leads_per_candidate:
    - candidate_id: string
      leads:
        - lead_type: string
          full_text: string
          word_count: integer
          villain_present: boolean
          mechanism_connected: boolean
          template_check: boolean  # False means passed anti-template
```

---

## Quality Threshold Constraints

### Threshold Application

| Output Type | Threshold Level | Minimum Score | Evidence Required |
|-------------|-----------------|---------------|-------------------|
| Upstream coherence pre-check | CRITICAL | All pass | Coherence evidence |
| Type selection | ELEVATED | 85% justified | Selection rationale |
| Candidate count | STANDARD | ≥5 | Count verification |
| Headlines per candidate | STANDARD | ≥10 | Count + vault references |
| Leads per candidate | STANDARD | ≥3 | Count + length verification |
| Coherence score | CRITICAL | ≥7 | Coherence validation |
| Differentiation score | ELEVATED | ≥5 | Comparison evidence |
| Villain consistency | CRITICAL | Present in all | Villain trace |
| Anti-slop | CRITICAL | All pass | Slop audit |

### Quality Threshold Protocol

1. Every layer output receives quality score
2. If coherence pre-check fails: BLOCK and trigger feedback bus
3. If coherence validation < 7: Return to Layer 2
4. If differentiation < 5: Return to Layer 2 with competition data
5. If villain missing: BLOCK until villain integrated
6. If any candidate missing headlines/leads: Regenerate for that candidate

---

## Feedback Bus

### Upstream Dependencies This Skill Can Request Re-Run

| Upstream Skill | Trigger Condition | Request Payload |
|----------------|-------------------|-----------------|
| 03-root-cause | Villain not compelling enough for Big Idea | Request stronger villain dramatization |
| 04-mechanism | Mechanism not differentiating in Big Idea | Request mechanism with differentiation focus |
| 05-promise | Campaign thesis doesn't support Big Idea type | Request thesis aligned to Big Idea direction |

### Downstream Skills That Can Request Re-Run

| Downstream Skill | Trigger Condition | Expected Response |
|------------------|-------------------|-------------------|
| 07-offer | Big Idea doesn't support offer framing | Provide alternative Big Idea candidate |
| 08-structure | Big Idea doesn't map to VSL structure | Provide proof architecture guidance |

### Feedback Request Handling

When feedback received:

1. Log request to continuous learning log
2. Identify deficiency:
   - **Coherence issue:** Re-validate upstream, potentially trigger feedback to 02/03/04
   - **Differentiation issue:** Re-run Layer 1 type selection + Layer 2 with differentiation focus
   - **Creative weakness:** Re-run Layer 2 with creativity mode at higher intensity
   - **Handoff issue:** Repackage for requesting skill
3. Re-execute relevant layer(s)
4. Apply ELEVATED threshold to re-run outputs
5. Validate resolution before sending response

### Feedback Schemas

```yaml
feedback_request:
  requesting_skill: string
  target_skill: "06-big-idea"
  deficiency_type: enum[coherence_fail, undifferentiated, creative_weak, villain_missing, handoff_incomplete]
  specific_issue: string
  affected_candidate: string
  evidence: string
  priority: enum[blocking, important, nice_to_have]

feedback_response:
  original_request_id: string
  status: enum[resolved, partial, escalated]
  changes_made:
    - layer_rerun: string
    - candidates_changed: [string]
    - new_recommended: string
  validation:
    coherence_score: integer
    differentiation_score: integer
    villain_present: boolean
```

---

## Verification Evidence Requirements

### Layer Gate Evidence

**Layer 0 Gate Evidence (Input Synthesis):**
```yaml
layer_0_gate_evidence:
  upstream_loaded:
    claim: "All upstream packages loaded"
    evidence_type: match
    evidence:
      root_cause_loaded: boolean
      mechanism_loaded: boolean
      promise_loaded: boolean
      market_context_loaded: boolean

  coherence_pre_check:
    claim: "Upstream outputs cohere"
    evidence_type: match
    evidence:
      rc_to_mechanism: boolean
      mechanism_to_promise: boolean
      villain_consistent: boolean
      thesis_aligned: boolean
      all_pass: boolean
```

**Layer 1 Gate Evidence (Type Strategy):**
```yaml
layer_1_gate_evidence:
  type_selection:
    claim: "≥2 Big Idea types selected with rationale"
    evidence_type: match
    evidence:
      types_selected: [string]
      rationale_per_type: object
      saturation_check: object

  saturation_avoidance:
    claim: "Selected types not saturated"
    evidence_type: match
    evidence:
      saturated_types: [string]
      selected_types: [string]
      overlap: [string]  # Should be empty
```

**Layer 2 Gate Evidence (Candidate Generation):**
```yaml
layer_2_gate_evidence:
  candidate_count:
    claim: "≥5 Big Idea candidates generated"
    evidence_type: count
    evidence:
      count: integer
      candidate_ids: [string]

  creativity_mode:
    claim: "Creativity mode applied with synthesis forcing"
    evidence_type: trace
    evidence:
      obvious_versions_rejected: [string]
      synthesis_novelty_scores: [integer]
      all_above_minimum: boolean

  headlines:
    claim: "≥10 headlines per candidate with vault references"
    evidence_type: match
    evidence:
      per_candidate:
        - candidate_id: string
          headline_count: integer
          vault_references: [string]

  leads:
    claim: "≥3 leads per candidate (200-500 words)"
    evidence_type: match
    evidence:
      per_candidate:
        - candidate_id: string
          lead_count: integer
          word_counts: [integer]
          all_in_range: boolean
```

**Layer 3 Gate Evidence (Validation):**
```yaml
layer_3_gate_evidence:
  coherence_validation:
    claim: "All candidates pass coherence (≥7)"
    evidence_type: score
    evidence:
      per_candidate:
        - candidate_id: string
          coherence_score: integer
          checks:
            rc_to_mechanism: boolean
            mechanism_to_promise: boolean
            villain_present: boolean
            thesis_aligned: boolean

  differentiation:
    claim: "Top candidate differentiation ≥5"
    evidence_type: score
    evidence:
      top_candidate_id: string
      differentiation_score: integer
      comparison_evidence:
        most_similar_competitor: string
        differentiation_points: [string]

  villain_consistency:
    claim: "Villain present in all candidates"
    evidence_type: match
    evidence:
      villain_from_root_cause: string
      per_candidate:
        - candidate_id: string
          villain_present: boolean
          villain_reference: string
```

---

## Continuous Learning Log

### Log Location
`learning-log/06-big-idea-learning.json`

### What Gets Logged

**On Every Run:**
```yaml
run_entry:
  run_id: string
  timestamp: string
  input_summary:
    root_cause_statement: string
    mechanism_name: string
    campaign_thesis: string
    schwartz_stage: integer
  output_summary:
    recommended_candidate: string
    big_idea_type: string
    coherence_score: integer
    differentiation_score: integer
  creativity_mode:
    obvious_rejected_count: integer
    synthesis_novelty_average: float
    headline_novelty_average: float
  quality_scores:
    all_candidates_scores: object
  threshold_met: boolean
```

**On Big Idea Pattern:**
```yaml
big_idea_pattern_entry:
  run_id: string
  niche: string
  schwartz_stage: integer
  big_idea_type: string
  synthesis_approach: string  # How RC/Mech/Promise were combined
  coherence_score: integer
  differentiation_score: integer
  success_rating: integer  # Post-campaign feedback
  learning: string
```

**On Creativity Mode:**
```yaml
creativity_mode_entry:
  run_id: string
  task: "big_idea_synthesis"
  obvious_big_ideas_rejected: [string]
  winning_synthesis_approach: string
  headline_patterns_that_worked: [string]
  lead_types_that_resonated: [string]
  learning: string
```

**On Coherence Failure:**
```yaml
coherence_failure_entry:
  run_id: string
  failing_check: string
  upstream_skill_responsible: string
  feedback_sent: boolean
  resolution: string
```

### Manager Responsibility

The Manager Agent:
- Logs every run automatically
- Tracks Big Idea types that score well by niche/stage
- Flags when coherence failures repeatedly trace to same upstream skill
- Queries log to inform type selection
- Surfaces creative patterns that generate high scores

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-02-03 | Added Arena Layer 2.5 integration with 6-persona competition, Resonance/Surprise Framework, 7 judging criteria (Emotional Resonance, Schema Distance, Failure Explanation + Hope, Specificity, Defensibility, TIER1 Match, Campaign Coherence), schema distance sweet spot (4-6), human selection checkpoint |
| 1.0 | 2026-01-25 | Initial architecture extension from Rich call |

