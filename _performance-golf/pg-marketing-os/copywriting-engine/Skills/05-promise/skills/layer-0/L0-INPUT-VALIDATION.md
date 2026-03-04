# Layer 0: Input Validation + Loading

**Layer:** 0
**Type:** Data Loading + Validation
**Purpose:** Load and validate all upstream inputs before promise development
**Inputs:** Proof inventory, root cause, mechanism, deep research outputs

---

## INPUT SOURCES

### From 02-proof-inventory

```yaml
proof_inventory_handoff:
  overall_strength_score: integer (0-100)

  promise_ceiling: enum
    # What level of promise can be credibly supported?
    # - transformation: "Complete change, dramatic results"
    # - significant_improvement: "Major measurable improvement"
    # - noticeable_improvement: "Visible/feelable difference"
    # - some_benefit: "Some positive effect"
    # - minimal: "May help, limited evidence"

  strongest_proof_categories:
    - category: string
      strength: float
      sample_elements: [proof_element]

  believability_constraints:
    - constraint: string
      reason: string
    # e.g., "Cannot claim specific timeframes without data"
    #       "Cannot claim guaranteed results"

  specific_proof_for_claims:
    - claim_supported: string
      proof_id: string
      proof_text: string
      proof_type: string
```

---

### From 03-root-cause

```yaml
root_cause_handoff:
  surface_problem: string
  # "Can't lose weight no matter what I try"

  real_root_cause: string
  # "Gut microbiome imbalance causing uncontrollable cravings"

  villain_name: string
  # "Bad Bugs"

  villain_type: string
  # "organism"

  countersell_targets: [string]
  # What solutions we're positioning against

  mechanism_link: string
  # How root cause connects to mechanism
```

---

### From 04-mechanism

```yaml
mechanism_handoff:
  mechanism_name: string
  # "Gut Reset Protocol"

  mechanism_type: string
  # "compound", "behavioral", "system", etc.

  superiority_claim: string
  # What makes this mechanism unique/better

  what_it_does: string
  # The functional explanation

  scorecard:
    image_strength: integer (1-10)
    simplicity: integer (1-10)
    proof: integer (1-10)
    differentiation: integer (1-10)
    embedded_benefits: integer (1-10)
    # ... other dimensions

  proof_elements:
    - type: string
      claim: string
      evidence: string
```

---

### From 01-research

```yaml
deep_research_handoff:
  schwartz_stage: integer (1-5)
  # Market sophistication level

  market_psychology:
    hope_level: integer (1-10)
    skepticism_level: integer (1-10)
    exhaustion_level: integer (1-10)

  competitor_analysis:
    competitor_promises: [string]
    saturated_claims: [string]
    promise_patterns: [string]

  customer_language:
    desired_outcomes: [string]
    # How they describe what they want
    how_they_describe_success: [string]
    # Their words for "it worked"
    outcome_language: [string]
    # Specific phrases about results
```

---

### Product Context (User Provided)

```yaml
product_context:
  product_name: string
  niche: string
  sub_niche: string

  now_after_grid:
    now:
      # What they're dealing with now
      - situation: string
        pain: string
        emotion: string
    after:
      # What they want to experience
      - situation: string
        relief: string
        emotion: string

  ideal_client_success_story: string
  # What does a perfect outcome look like?

  what_product_actually_delivers: string
  # Ground truth about capability
```

---

## VALIDATION PROTOCOL

### Step 1: Presence Check

```python
def validate_inputs_present(inputs):
    """
    Verify all required upstream outputs exist.
    """
    required = {
        'proof_inventory': ['promise_ceiling', 'overall_strength_score'],
        'root_cause': ['surface_problem', 'real_root_cause', 'mechanism_link'],
        'mechanism': ['mechanism_name', 'what_it_does'],
        'deep_research': ['schwartz_stage']
    }

    missing = []

    for source, fields in required.items():
        if source not in inputs:
            missing.append(f"Missing entire source: {source}")
        else:
            for field in fields:
                if field not in inputs[source]:
                    missing.append(f"Missing {source}.{field}")

    return {
        'valid': len(missing) == 0,
        'missing': missing
    }
```

---

### Step 2: Ceiling Interpretation

```python
def interpret_promise_ceiling(proof_inventory):
    """
    Translate proof ceiling into promise constraints.
    """
    ceiling = proof_inventory['promise_ceiling']

    ceiling_guidance = {
        'transformation': {
            'allowed': [
                'complete change',
                'dramatic results',
                'life-changing',
                'total transformation'
            ],
            'specificity_freedom': 'high',
            'timeframe_claims': 'allowed_with_proof',
            'quantity_claims': 'allowed_with_proof'
        },
        'significant_improvement': {
            'allowed': [
                'major improvement',
                'significant difference',
                'measurable results'
            ],
            'specificity_freedom': 'moderate',
            'timeframe_claims': 'hedge_required',
            'quantity_claims': 'hedge_required'
        },
        'noticeable_improvement': {
            'allowed': [
                'noticeable difference',
                'real improvement',
                'visible results'
            ],
            'specificity_freedom': 'limited',
            'timeframe_claims': 'vague_only',
            'quantity_claims': 'ranges_only'
        },
        'some_benefit': {
            'allowed': [
                'can help',
                'may support',
                'designed to'
            ],
            'specificity_freedom': 'low',
            'timeframe_claims': 'avoid',
            'quantity_claims': 'avoid'
        },
        'minimal': {
            'allowed': [
                'may help',
                'intended to support'
            ],
            'specificity_freedom': 'very_low',
            'timeframe_claims': 'prohibited',
            'quantity_claims': 'prohibited'
        }
    }

    return ceiling_guidance[ceiling]
```

---

### Step 3: Stage-Promise Alignment Check

```python
def check_stage_alignment(schwartz_stage, ceiling_guidance):
    """
    Verify promise approach is compatible with Schwartz stage.
    """
    stage_requirements = {
        1: {
            'promise_approach': 'bold_promise_alone',
            'needs_mechanism': False,
            'ceiling_minimum': 'noticeable_improvement'
        },
        2: {
            'promise_approach': 'bigger_promise',
            'needs_mechanism': False,
            'ceiling_minimum': 'significant_improvement'
        },
        3: {
            'promise_approach': 'promise_plus_mechanism',
            'needs_mechanism': True,
            'ceiling_minimum': 'noticeable_improvement'
        },
        4: {
            'promise_approach': 'mechanism_carries_promise',
            'needs_mechanism': True,
            'ceiling_minimum': 'some_benefit'
        },
        5: {
            'promise_approach': 'identity_wrapped_promise',
            'needs_mechanism': True,
            'ceiling_minimum': 'some_benefit'
        }
    }

    requirements = stage_requirements[schwartz_stage]

    # Check if ceiling meets minimum
    ceiling_order = ['minimal', 'some_benefit', 'noticeable_improvement', 'significant_improvement', 'transformation']
    current_ceiling_index = ceiling_order.index(ceiling_guidance['allowed'][0].replace(' ', '_').lower() if ceiling_guidance else 'minimal')
    minimum_ceiling_index = ceiling_order.index(requirements['ceiling_minimum'])

    return {
        'stage': schwartz_stage,
        'approach': requirements['promise_approach'],
        'needs_mechanism': requirements['needs_mechanism'],
        'ceiling_adequate': current_ceiling_index >= minimum_ceiling_index,
        'stage_guidance': generate_stage_guidance(schwartz_stage)
    }
```

---

### Step 4: Saturation Check

```python
def check_promise_saturation(competitor_promises, saturated_claims):
    """
    Identify promises to avoid due to market saturation.
    """
    saturation_map = {
        'saturated': [],     # Avoid completely
        'overused': [],      # Use only with strong differentiation
        'common': [],        # Acceptable with unique angle
        'available': []      # Opportunities
    }

    for promise in competitor_promises:
        frequency = count_similar_promises(promise, competitor_promises)

        if frequency >= 5 or promise in saturated_claims:
            saturation_map['saturated'].append(promise)
        elif frequency >= 3:
            saturation_map['overused'].append(promise)
        elif frequency >= 1:
            saturation_map['common'].append(promise)

    return {
        'avoid_completely': saturation_map['saturated'],
        'differentiate_if_used': saturation_map['overused'],
        'acceptable': saturation_map['common'],
        'opportunity_areas': identify_promise_gaps(competitor_promises)
    }
```

---

## OUTPUT: VALIDATED CONTEXT

```yaml
layer_0_output:
  validation_status: enum[pass, pass_with_warnings, fail]

  promise_constraints:
    ceiling: string
    ceiling_guidance:
      allowed_language: [string]
      timeframe_policy: string
      quantity_policy: string

    schwartz_context:
      stage: integer
      approach: string
      needs_mechanism: boolean

    saturation:
      avoid: [string]
      differentiate: [string]
      opportunities: [string]

    believability_constraints: [string]

  upstream_synthesis:
    # Key elements to inform promise drafting
    surface_problem: string
    root_cause: string
    mechanism_name: string
    mechanism_superiority: string
    now_after_summary:
      primary_now: string
      primary_after: string

  proof_assets:
    # Available proof for promise backing
    strongest_proof: [proof_element]
    claim_support_map:
      - potential_claim: string
        supporting_proof: string

  warnings: [string]
  blockers: [string]
```

---

## GATE 0 CRITERIA

**PASS if:**
- All required upstream outputs present
- Proof ceiling ≥ "some_benefit"
- Schwartz stage documented
- Mechanism name and function available

**PASS WITH WARNINGS if:**
- PASS criteria met
- But: Proof ceiling only "some_benefit" OR many saturated claims

**FAIL if:**
- Missing required upstream outputs
- Proof ceiling = "minimal" (cannot make credible promise)
- No mechanism available (Stage 3+ requires mechanism)

On FAIL: Return to upstream skills for remediation.
