# Layer 2: Promise Calibration

**Layer:** 2
**Type:** Adjustment + Constraint Enforcement
**Purpose:** Calibrate promises against proof ceiling, Schwartz stage, and mechanism capability
**Inputs:** Raw promise candidates from Layer 1
**Outputs:** Calibrated promise set with scores

---

## THE THREE CALIBRATION DIMENSIONS

### Dimension 1: Proof Ceiling Calibration

The promise can NEVER exceed what proof can support:

```python
def calibrate_to_proof_ceiling(promises, proof_inventory):
    """
    Adjust promises to stay within provable bounds.
    """
    ceiling = proof_inventory['promise_ceiling']
    proof_strength = proof_inventory['overall_strength_score']

    # Define ceiling levels
    ceiling_limits = {
        'transformation': {
            'min_proof_strength': 80,
            'allowed_claims': ['complete transformation', 'total change', 'permanent results'],
            'specificity_allowed': 'high'  # Can use specific numbers
        },
        'significant_improvement': {
            'min_proof_strength': 60,
            'allowed_claims': ['significant improvement', 'major change', 'lasting results'],
            'specificity_allowed': 'moderate'  # Can use ranges
        },
        'moderate_improvement': {
            'min_proof_strength': 40,
            'allowed_claims': ['noticeable improvement', 'real change', 'meaningful results'],
            'specificity_allowed': 'low'  # General claims only
        },
        'minimal': {
            'min_proof_strength': 0,
            'allowed_claims': ['may help', 'can support', 'designed to'],
            'specificity_allowed': 'none'  # No specific numbers
        }
    }

    current_limits = ceiling_limits[ceiling]
    calibrated = []

    for promise in promises:
        calibration_result = {
            'original': promise,
            'calibrated': None,
            'adjustment_made': None,
            'ceiling_compliant': False
        }

        # Check if promise exceeds ceiling
        if exceeds_ceiling(promise, current_limits):
            # Downgrade the promise
            calibration_result['calibrated'] = downgrade_promise(
                promise,
                current_limits['allowed_claims'],
                current_limits['specificity_allowed']
            )
            calibration_result['adjustment_made'] = 'downgraded_to_ceiling'
        else:
            calibration_result['calibrated'] = promise
            calibration_result['ceiling_compliant'] = True

        calibrated.append(calibration_result)

    return calibrated


def downgrade_promise(promise, allowed_claims, specificity_level):
    """
    Reduce promise strength to meet proof ceiling.
    """
    downgrade_map = {
        # Transformation → Significant
        ('complete transformation', 'significant_improvement'): 'significant improvement',
        ('total change', 'significant_improvement'): 'major change',
        ('permanent', 'significant_improvement'): 'lasting',

        # Significant → Moderate
        ('significant improvement', 'moderate_improvement'): 'noticeable improvement',
        ('major change', 'moderate_improvement'): 'real change',
        ('lasting', 'moderate_improvement'): 'meaningful',

        # Moderate → Minimal
        ('noticeable improvement', 'minimal'): 'may help with',
        ('real change', 'minimal'): 'can support',
    }

    # Apply appropriate downgrade
    downgraded = apply_downgrade_map(promise, downgrade_map)

    # Adjust specificity
    if specificity_level == 'none':
        downgraded = remove_specific_numbers(downgraded)
    elif specificity_level == 'low':
        downgraded = convert_to_ranges(downgraded)

    return downgraded
```

---

### Dimension 2: Schwartz Stage Calibration

Promise strategy must match market sophistication:

```python
def calibrate_to_schwartz_stage(promises, schwartz_stage, market_context):
    """
    Adjust promise framing for market sophistication level.
    """
    stage_strategies = {
        1: {
            # Stage 1: First to market
            'strategy': 'direct_promise',
            'description': 'Simple, direct claim - no proof needed yet',
            'framing': 'This [product] will [promise]',
            'mechanism_emphasis': 'none',
            'proof_emphasis': 'minimal',
            'example': "Lose weight with XYZ"
        },
        2: {
            # Stage 2: Second to market
            'strategy': 'bigger_promise',
            'description': 'Enlarge the claim - more, faster, easier',
            'framing': 'Now get [bigger/faster/easier] results',
            'mechanism_emphasis': 'light',
            'proof_emphasis': 'results_focused',
            'example': "Lose weight 2X faster"
        },
        3: {
            # Stage 3: Crowded market
            'strategy': 'mechanism_promise',
            'description': 'Lead with HOW it works',
            'framing': 'The [mechanism] way to [promise]',
            'mechanism_emphasis': 'heavy',
            'proof_emphasis': 'mechanism_proof',
            'example': "The Gut Reset Protocol for lasting weight loss"
        },
        4: {
            # Stage 4: Sophisticated market
            'strategy': 'unique_mechanism_promise',
            'description': 'New mechanism, new promise angle',
            'framing': 'The ONLY way to [promise] is [unique mechanism]',
            'mechanism_emphasis': 'unique_angle',
            'proof_emphasis': 'authority_heavy',
            'example': "The ONLY way to end cravings is to defeat the Bad Bugs"
        },
        5: {
            # Stage 5: Exhausted market
            'strategy': 'identification_promise',
            'description': 'Promise becomes secondary to identification',
            'framing': 'For [specific identity] who want [specific desire]',
            'mechanism_emphasis': 'buried',
            'proof_emphasis': 'social_proof_heavy',
            'example': "For busy moms who've tried everything..."
        }
    }

    strategy = stage_strategies[schwartz_stage]
    calibrated = []

    for promise in promises:
        stage_calibration = {
            'original': promise['statement'],
            'stage_appropriate_version': None,
            'stage_framing': strategy['framing'],
            'adjustments': []
        }

        # Reframe for stage
        if schwartz_stage <= 2:
            # Direct promise, add specificity
            stage_calibration['stage_appropriate_version'] = make_direct_and_bold(
                promise['statement']
            )
        elif schwartz_stage == 3:
            # Lead with mechanism
            stage_calibration['stage_appropriate_version'] = prepend_mechanism(
                promise['statement'],
                market_context.get('mechanism_name')
            )
        elif schwartz_stage == 4:
            # Unique mechanism framing
            stage_calibration['stage_appropriate_version'] = create_only_way_framing(
                promise['statement'],
                market_context.get('mechanism_name'),
                market_context.get('mechanism_uniqueness')
            )
        else:  # Stage 5
            # Identification-first
            stage_calibration['stage_appropriate_version'] = create_identification_framing(
                promise['statement'],
                market_context.get('ideal_customer_identity')
            )

        calibrated.append(stage_calibration)

    return calibrated, strategy
```

---

### Dimension 3: Mechanism Fit Calibration

Promise must align with what the mechanism can deliver:

```python
def calibrate_to_mechanism(promises, mechanism_package):
    """
    Ensure promise aligns with mechanism capability.
    """
    mechanism_capabilities = mechanism_package['mechanism_capabilities']
    mechanism_limitations = mechanism_package['mechanism_limitations']

    calibrated = []

    for promise in promises:
        fit_analysis = {
            'promise': promise['statement'],
            'mechanism_aligned': False,
            'alignment_issues': [],
            'adjusted_promise': None
        }

        # Check capability alignment
        promise_outcome = extract_promised_outcome(promise)

        if promise_outcome in mechanism_capabilities['direct_outcomes']:
            fit_analysis['mechanism_aligned'] = True
            fit_analysis['alignment_type'] = 'direct'
        elif promise_outcome in mechanism_capabilities['indirect_outcomes']:
            fit_analysis['mechanism_aligned'] = True
            fit_analysis['alignment_type'] = 'indirect'
            fit_analysis['bridge_required'] = True
        else:
            fit_analysis['mechanism_aligned'] = False
            fit_analysis['alignment_issues'].append(
                f"Promise '{promise_outcome}' not in mechanism capabilities"
            )
            # Try to adjust
            fit_analysis['adjusted_promise'] = adjust_to_mechanism_capability(
                promise,
                mechanism_capabilities
            )

        # Check limitation conflicts
        for limitation in mechanism_limitations:
            if conflicts_with_limitation(promise, limitation):
                fit_analysis['alignment_issues'].append(
                    f"Conflicts with limitation: {limitation}"
                )
                fit_analysis['mechanism_aligned'] = False

        calibrated.append(fit_analysis)

    return calibrated
```

---

## CALIBRATION SCORING

Score each calibrated promise on 5 dimensions:

```python
def score_calibrated_promise(promise, calibrations):
    """
    Score promise after all calibrations applied.
    """
    scores = {}

    # 1. CEILING COMPLIANCE (pass/fail + margin)
    scores['ceiling_compliance'] = {
        'compliant': calibrations['proof']['ceiling_compliant'],
        'margin': calculate_ceiling_margin(promise, calibrations['proof']),
        'score': 10 if calibrations['proof']['ceiling_compliant'] else 0
    }

    # 2. STAGE APPROPRIATENESS (1-10)
    scores['stage_appropriateness'] = score_stage_fit(
        promise,
        calibrations['schwartz']['strategy']
    )

    # 3. MECHANISM ALIGNMENT (1-10)
    scores['mechanism_alignment'] = {
        'aligned': calibrations['mechanism']['mechanism_aligned'],
        'alignment_type': calibrations['mechanism'].get('alignment_type'),
        'score': calculate_alignment_score(calibrations['mechanism'])
    }

    # 4. SPECIFICITY (1-10)
    # More specific = higher score (within ceiling limits)
    scores['specificity'] = score_specificity(
        promise,
        calibrations['proof']['specificity_allowed']
    )

    # 5. EMOTIONAL RESONANCE (1-10)
    # Does it connect emotionally?
    scores['emotional_resonance'] = score_emotional_impact(
        promise,
        calibrations.get('market_psychology')
    )

    # Composite score
    weights = {
        'ceiling_compliance': 0.25,  # Must pass
        'stage_appropriateness': 0.20,
        'mechanism_alignment': 0.25,  # Critical
        'specificity': 0.15,
        'emotional_resonance': 0.15
    }

    # If ceiling not compliant, promise fails regardless
    if not scores['ceiling_compliance']['compliant']:
        scores['composite'] = 0
        scores['status'] = 'FAILED_CEILING'
    else:
        scores['composite'] = sum(
            scores[dim]['score'] * weights[dim]
            for dim in weights
            if dim in scores and 'score' in scores[dim]
        )
        scores['status'] = 'CALIBRATED'

    return scores
```

---

## SPECIFICITY SCORING RUBRIC

```yaml
specificity_rubric:
  10: "Exact number + qualifier + timeframe (e.g., '12 pounds of belly fat in 30 days')"
  9: "Two of three elements highly specific"
  8: "All three elements present, one is a range"
  7: "Two specific elements"
  6: "One highly specific element + general others"
  5: "One specific element"
  4: "Ranges only, no exact numbers"
  3: "General language with implied specificity"
  2: "Vague but directional"
  1: "Completely vague"

specificity_elements:
  quantity:
    high: "12 pounds", "8%", "$500"
    medium: "5-10 pounds", "significant", "noticeable"
    low: "weight", "results", "improvement"

  qualifier:
    high: "stubborn belly fat", "morning joint pain", "afternoon energy crash"
    medium: "body fat", "joint pain", "energy"
    low: "weight", "pain", "tiredness"

  timeframe:
    high: "in 72 hours", "within 7 days", "by next Tuesday"
    medium: "in about a month", "within weeks", "soon"
    low: "over time", "eventually", "with continued use"
```

---

## CAMPAIGN THESIS GENERATION

After calibration, generate the Campaign Thesis:

```python
def generate_campaign_thesis(best_promise, mechanism, schwartz_stage):
    """
    Create the Campaign Thesis: The thesis statement for the entire campaign.
    Formula: The [superiority] way to [promise] is with [mechanism]
    """
    superiority_options = {
        'exclusive': ['only', 'single', 'sole'],
        'comparative': ['fastest', 'easiest', 'most effective', 'best'],
        'novel': ['new', 'breakthrough', 'revolutionary'],  # Use sparingly
        'scientific': ['scientifically-proven', 'research-backed', 'clinically-tested']
    }

    # Select superiority based on stage and proof
    if schwartz_stage >= 4:
        # Need stronger differentiation
        superiority = 'only'  # or 'new'
    elif schwartz_stage == 3:
        superiority = 'fastest' or 'most effective'
    else:
        superiority = 'best'

    # Build thesis variations
    thesis_variations = []

    # Standard thesis
    thesis_variations.append({
        'type': 'standard',
        'thesis': f"The {superiority} way to {best_promise['core_promise']} is with the {mechanism['name']}"
    })

    # Inverted thesis (mechanism first)
    thesis_variations.append({
        'type': 'inverted',
        'thesis': f"The {mechanism['name']} is the {superiority} way to {best_promise['core_promise']}"
    })

    # Question thesis
    thesis_variations.append({
        'type': 'question',
        'thesis': f"What if the {superiority} way to {best_promise['core_promise']} was simply {mechanism['simplified_action']}?"
    })

    # Villain-inclusive thesis
    if mechanism.get('villain'):
        thesis_variations.append({
            'type': 'villain_inclusive',
            'thesis': f"The {superiority} way to {best_promise['core_promise']} is to {mechanism['villain_defeat_action']}"
        })

    return {
        'primary_thesis': thesis_variations[0]['thesis'],
        'variations': thesis_variations,
        'superiority_claim': superiority,
        'promise_component': best_promise['core_promise'],
        'mechanism_component': mechanism['name']
    }
```

---

## OUTPUT: CALIBRATED PROMISE SET

```yaml
layer_2_output:
  calibration_applied:
    proof_ceiling: "significant_improvement"
    schwartz_stage: 3
    mechanism: "Gut Reset Protocol"

  calibrated_promises:
    - id: "promise_001"
      original: "Lose all the weight you want permanently"
      calibrated: "Experience significant, lasting weight loss"
      calibrations:
        proof_adjustment: "Downgraded from transformation to significant_improvement"
        stage_adjustment: "Added mechanism reference"
        mechanism_fit: "Aligned - weight loss is direct outcome"
      scores:
        ceiling_compliance: 10
        stage_appropriateness: 8
        mechanism_alignment: 9
        specificity: 6
        emotional_resonance: 7
        composite: 8.1

    - id: "promise_002"
      original: "End your cravings in as little as 7 days"
      calibrated: "End your uncontrollable cravings in as little as 7 days"
      calibrations:
        proof_adjustment: "None - within ceiling"
        stage_adjustment: "Added specificity qualifier"
        mechanism_fit: "Direct outcome - cravings linked to gut"
      scores:
        ceiling_compliance: 10
        stage_appropriateness: 9
        mechanism_alignment: 10
        specificity: 9
        emotional_resonance: 8
        composite: 9.2

  campaign_thesis:
    primary: "The ONLY way to finally end your cravings is with the Gut Reset Protocol"
    variations:
      - type: "inverted"
        thesis: "The Gut Reset Protocol is the only way to finally end your cravings"
      - type: "villain_inclusive"
        thesis: "The ONLY way to end your cravings is to defeat the Bad Bugs"

  top_promise:
    id: "promise_002"
    statement: "End your uncontrollable cravings in as little as 7 days"
    composite_score: 9.2
    rationale: "High specificity, direct mechanism alignment, strong emotional hook"

  ready_for_validation: true
```

---

## GATE 2 CRITERIA

**PASS if:**
- All promises calibrated against proof ceiling
- At least 3 promises are ceiling-compliant
- At least 2 promises score ≥7.5 composite
- Campaign thesis generated with mechanism connection
- Top promise identified with score ≥8.0

**PASS WITH WARNINGS if:**
- PASS criteria met
- But: All promises required downgrade OR top promise <8.5

**FAIL if:**
- No promises ceiling-compliant
- No promise scores ≥7.5
- Campaign thesis not mechanism-connected
- Mechanism alignment fails for all promises

On FAIL: Return to Layer 1 for additional drafting or escalate to proof/mechanism review.
