# Layer 0: Input Loading + Validation

**Layer:** 0
**Type:** Data Loading + Validation
**Purpose:** Load and validate all upstream inputs before root cause development begins
**Inputs:** Deep research outputs, proof inventory, product context

---

## INPUT SOURCES

### From 01-research

```yaml
market_psychology_snapshot:
  fear_dimension:
    level: integer (1-10)
    primary_fears: [string]
    fear_objects: [string]      # What specifically they fear
  frustration_dimension:
    level: integer (1-10)
    failed_solutions: [string]  # What they've tried
    blame_targets: [string]     # Who/what they blame
  hope_dimension:
    level: integer (1-10)
    desired_outcomes: [string]
    belief_in_solution: integer

customer_language_database:
  problem_descriptions: [string]
  self_diagnoses: [string]      # How they explain their problem
  solution_descriptions: [string]
  emotional_expressions: [string]

competitive_landscape:
  dominant_explanations: [string]  # How competitors explain the problem
  common_mechanisms: [string]
  saturated_claims: [string]
  market_sophistication: integer (1-5)
```

---

### From 02-proof-inventory

```yaml
proof_inventory_summary:
  overall_strength_score: integer (0-100)
  promise_ceiling: string

  mechanism_proof:
    count: integer
    strength: float
    top_elements: [proof_element]

  authority_proof:
    count: integer
    strength: float
    top_elements: [proof_element]

  data_proof:
    count: integer
    strength: float
    top_elements: [proof_element]

  # Studies that could support root cause claims
  root_cause_relevant_proof:
    - proof_id: string
      type: string
      claim: string
      source: string
      relevance_to_root_cause: string
```

---

### Product Context (User Provided)

```yaml
product_context:
  product_name: string
  niche: enum[health, wealth, relationships, self_improvement]
  sub_niche: string            # e.g., "weight loss", "ED", "energy"

  product_function:
    what_it_actually_does: string
    active_components: [string]  # Ingredients, features, etc.
    delivery_method: string      # Pill, program, device, etc.

  scientific_foundation:
    scientific_principles: [string]
    supporting_studies: [string]
    mechanism_of_action: string  # How it actually works scientifically
```

---

## VALIDATION PROTOCOL

### Step 1: Presence Check

```python
def validate_inputs_present(inputs):
    """
    Verify all required inputs exist.
    """
    required = {
        'deep_research': ['market_psychology_snapshot', 'customer_language_database'],
        'proof_inventory': ['overall_strength_score', 'promise_ceiling'],
        'product_context': ['product_name', 'niche', 'product_function']
    }

    missing = []

    for category, fields in required.items():
        if category not in inputs:
            missing.append(f"Missing entire category: {category}")
        else:
            for field in fields:
                if field not in inputs[category]:
                    missing.append(f"Missing {category}.{field}")

    if missing:
        return {
            'valid': False,
            'missing': missing,
            'action': 'Request missing inputs before proceeding'
        }

    return {'valid': True}
```

---

### Step 2: Quality Check

```python
def validate_input_quality(inputs):
    """
    Check that inputs have sufficient depth for root cause development.
    """
    issues = []

    # Customer language must have problem descriptions
    if len(inputs['customer_language_database']['problem_descriptions']) < 3:
        issues.append("Insufficient customer problem descriptions (need ≥3)")

    # Proof inventory must have mechanism or authority proof
    proof = inputs['proof_inventory']
    if proof.get('mechanism_proof', {}).get('count', 0) == 0 and \
       proof.get('authority_proof', {}).get('count', 0) == 0:
        issues.append("No mechanism or authority proof available - root cause claims unsupportable")

    # Product must have scientific foundation
    product = inputs['product_context']
    if not product.get('scientific_foundation', {}).get('mechanism_of_action'):
        issues.append("Product mechanism of action not specified")

    if issues:
        return {
            'valid': False,
            'issues': issues,
            'severity': 'high' if 'unsupportable' in str(issues) else 'medium'
        }

    return {'valid': True}
```

---

### Step 3: Schwartz Stage Determination

```python
def determine_schwartz_stage(inputs):
    """
    Infer Schwartz sophistication stage from inputs.
    """
    competitive = inputs.get('competitive_landscape', {})
    market_sophistication = competitive.get('market_sophistication', 3)

    # Adjust based on available proof
    proof_strength = inputs['proof_inventory']['overall_strength_score']

    # Higher proof allows more sophisticated positioning
    if proof_strength >= 75:
        effective_stage = min(market_sophistication + 1, 5)
    elif proof_strength < 50:
        effective_stage = max(market_sophistication - 1, 1)
    else:
        effective_stage = market_sophistication

    return {
        'market_stage': market_sophistication,
        'effective_stage': effective_stage,
        'rationale': determine_stage_rationale(market_sophistication, proof_strength)
    }
```

---

### Step 4: Root Cause Method Pre-Selection

Based on inputs, recommend which of the 6 root cause methods are viable:

```python
def preselect_viable_methods(inputs):
    """
    Determine which root cause methods can be supported by available inputs.
    """
    viable_methods = []

    proof = inputs['proof_inventory']
    product = inputs['product_context']

    # Method 1: New/Rebranded Syndrome
    # Requires: Strong authority proof, scientific backing
    if proof.get('authority_proof', {}).get('strength', 0) >= 6:
        viable_methods.append({
            'method': 'new_syndrome',
            'viability': 'high',
            'rationale': 'Authority proof supports syndrome claims'
        })

    # Method 2: New Reality Introduction
    # Requires: Novel scientific concept, proof of the reality
    if product.get('scientific_foundation', {}).get('scientific_principles'):
        viable_methods.append({
            'method': 'new_reality',
            'viability': 'high',
            'rationale': 'Scientific principles available for new reality'
        })

    # Method 3: Biology As Metaphor
    # Requires: Clear biological process that can be anthropomorphized
    if product.get('scientific_foundation', {}).get('mechanism_of_action'):
        viable_methods.append({
            'method': 'biology_metaphor',
            'viability': 'medium',
            'rationale': 'Mechanism of action can potentially be metaphorized'
        })

    # Method 4: Known Problem, Hidden Layer
    # Requires: Market has established understanding to build upon
    competitive = inputs.get('competitive_landscape', {})
    if competitive.get('dominant_explanations'):
        viable_methods.append({
            'method': 'hidden_layer',
            'viability': 'high',
            'rationale': 'Existing market explanations to build upon'
        })

    # Method 5: Problem-Villain-Validation
    # Requires: Named antagonist, third-party validation
    if proof.get('authority_proof', {}).get('top_elements'):
        viable_methods.append({
            'method': 'problem_villain_validation',
            'viability': 'high',
            'rationale': 'Authority proof can validate villain claims'
        })

    # Method 6: Big Juxtaposition
    # Requires: Clear contrast available (two types, two paths)
    if product.get('scientific_foundation', {}).get('scientific_principles'):
        viable_methods.append({
            'method': 'big_juxtaposition',
            'viability': 'medium',
            'rationale': 'Scientific contrast may be constructable'
        })

    return viable_methods
```

---

## OUTPUT: VALIDATED CONTEXT

```yaml
layer_0_output:
  validation_status: enum[pass, pass_with_warnings, fail]

  validated_inputs:
    market_psychology: {...}
    customer_language: {...}
    competitive_landscape: {...}
    proof_inventory: {...}
    product_context: {...}

  strategic_context:
    schwartz_stage:
      market_stage: integer
      effective_stage: integer
      rationale: string
    proof_ceiling: string
    available_proof_strength: integer

  method_viability:
    - method: string
      viability: enum[high, medium, low]
      rationale: string

  warnings: [string]
  blockers: [string]
```

---

## GATE 0 CRITERIA

**PASS if:**
- All required inputs present
- Proof inventory has overall strength ≥ 40
- At least 2 root cause methods viable at "high" or "medium"
- Product mechanism of action specified

**PASS WITH WARNINGS if:**
- PASS criteria met
- But: proof strength 40-60 OR only 2 methods viable

**FAIL if:**
- Missing required inputs
- Proof strength < 40 (root cause claims unsupportable)
- No viable root cause methods
- Product mechanism of action not specified

On FAIL: Return to upstream skills for remediation.
