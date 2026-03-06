# Layer 3: Promise Validation

**Layer:** 3
**Type:** Quality Assurance + Testing
**Purpose:** Validate promises against E5 quality criteria and anti-slop standards
**Inputs:** Calibrated promises from Layer 2
**Outputs:** Validated promise set with pass/fail status

---

## THE E5 PROMISE QUALITY CRITERIA

Every promise must pass 5 validation tests:

### Test 1: Is It SPECIFIC?

```python
def validate_specificity(promise):
    """
    Check if promise has concrete, measurable elements.
    Vague promises fail. Specific promises pass.
    """
    specificity_markers = {
        'has_number': bool(re.search(r'\d+', promise)),
        'has_timeframe': any(t in promise.lower() for t in [
            'day', 'week', 'month', 'hour', 'minute',
            'within', 'by', 'in as little as'
        ]),
        'has_qualifier': check_qualifier_presence(promise),
        'has_measurable_outcome': check_measurable_outcome(promise)
    }

    # Scoring
    markers_present = sum(specificity_markers.values())

    result = {
        'test': 'specificity',
        'markers': specificity_markers,
        'markers_count': markers_present,
        'pass': markers_present >= 2,
        'score': markers_present * 2.5  # Max 10
    }

    # Generate improvement suggestions if failed
    if not result['pass']:
        result['improvement_suggestions'] = []
        if not specificity_markers['has_number']:
            result['improvement_suggestions'].append(
                "Add a specific number (e.g., '12 pounds', '30%', '7 days')"
            )
        if not specificity_markers['has_timeframe']:
            result['improvement_suggestions'].append(
                "Add a timeframe (e.g., 'in 30 days', 'within 2 weeks')"
            )
        if not specificity_markers['has_qualifier']:
            result['improvement_suggestions'].append(
                "Add a qualifier (e.g., 'stubborn belly fat' not just 'weight')"
            )

    return result


def check_qualifier_presence(promise):
    """
    Check for specific qualifiers vs generic terms.
    """
    generic_terms = ['weight', 'fat', 'pain', 'energy', 'health', 'results']
    specific_qualifiers = [
        'belly fat', 'stubborn fat', 'joint pain', 'back pain',
        'morning energy', 'afternoon crash', 'blood sugar',
        'sleep quality', 'mental clarity'
    ]

    has_generic = any(g in promise.lower() for g in generic_terms)
    has_specific = any(s in promise.lower() for s in specific_qualifiers)

    # Specific qualifier present = pass
    # Only generic = fail
    return has_specific or not has_generic
```

---

### Test 2: Is It BELIEVABLE?

```python
def validate_believability(promise, market_context, proof_context):
    """
    Check if promise is believable to the target market.
    Over-the-top promises fail. Grounded promises pass.
    """
    believability_checks = {
        'no_miracle_language': not contains_miracle_language(promise),
        'within_market_norms': is_within_market_norms(promise, market_context),
        'has_plausible_mechanism': has_mechanism_support(promise, proof_context),
        'matches_proof_level': matches_proof_level(promise, proof_context),
        'no_guarantee_without_backing': check_guarantee_backing(promise, proof_context)
    }

    result = {
        'test': 'believability',
        'checks': believability_checks,
        'pass': all(believability_checks.values()),
        'score': sum(believability_checks.values()) * 2  # Max 10
    }

    # Flag specific issues
    if not result['pass']:
        result['issues'] = []
        if not believability_checks['no_miracle_language']:
            result['issues'].append("Contains miracle/hype language")
        if not believability_checks['within_market_norms']:
            result['issues'].append("Exceeds typical claims in this market")
        if not believability_checks['matches_proof_level']:
            result['issues'].append("Proof insufficient for this claim level")

    return result


def contains_miracle_language(promise):
    """
    Check for hype words that reduce believability.
    """
    miracle_words = [
        'miracle', 'magic', 'secret', 'ancient secret',
        'guaranteed', 'always', 'never fail', '100%',
        'instant', 'overnight', 'effortless', 'without trying'
    ]
    return any(m in promise.lower() for m in miracle_words)


def is_within_market_norms(promise, market_context):
    """
    Check if claim is within range of what market accepts.
    """
    # Extract the claim magnitude
    claim_magnitude = extract_claim_magnitude(promise)

    # Compare to market norms
    market_max = market_context.get('typical_claim_ceiling', {})

    if claim_magnitude.get('weight_loss'):
        market_ceiling = market_max.get('weight_loss_per_month', 12)
        if claim_magnitude['weight_loss'] > market_ceiling:
            return False

    if claim_magnitude.get('timeframe_days'):
        market_min_time = market_max.get('minimum_believable_days', 7)
        if claim_magnitude['timeframe_days'] < market_min_time:
            return False

    return True
```

---

### Test 3: Is It PROVABLE?

```python
def validate_provability(promise, proof_inventory):
    """
    Check if promise can be supported with available proof.
    Unprovable promises fail.
    """
    # Extract the core claim from promise
    core_claim = extract_core_claim(promise)

    # Find supporting proof
    supporting_proof = find_proof_for_claim(core_claim, proof_inventory)

    provability_checks = {
        'has_direct_proof': len(supporting_proof['direct']) > 0,
        'has_indirect_proof': len(supporting_proof['indirect']) > 0,
        'proof_strength_adequate': supporting_proof['strength_score'] >= 6,
        'no_unprovable_specifics': check_specific_claims_provable(promise, proof_inventory)
    }

    result = {
        'test': 'provability',
        'checks': provability_checks,
        'supporting_proof': supporting_proof,
        'pass': provability_checks['has_direct_proof'] or (
            provability_checks['has_indirect_proof'] and
            provability_checks['proof_strength_adequate']
        ),
        'score': calculate_provability_score(provability_checks)
    }

    if not result['pass']:
        result['proof_gap'] = identify_proof_gap(promise, proof_inventory)
        result['recommendations'] = generate_proof_recommendations(result['proof_gap'])

    return result


def check_specific_claims_provable(promise, proof_inventory):
    """
    If promise contains specific numbers, verify they're provable.
    """
    # Extract specific claims
    specific_numbers = re.findall(r'(\d+)\s*(pounds?|lbs?|%|days?|weeks?|hours?)', promise.lower())

    for number, unit in specific_numbers:
        # Check if this specific claim is supported
        if not find_proof_for_specific(number, unit, proof_inventory):
            return False

    return True
```

---

### Test 4: Is It MECHANISM-ALIGNED?

```python
def validate_mechanism_alignment(promise, mechanism_package):
    """
    Check if promise aligns with what mechanism can deliver.
    Misaligned promises fail.
    """
    mechanism_capabilities = mechanism_package.get('capabilities', {})
    mechanism_outcomes = mechanism_capabilities.get('direct_outcomes', []) + \
                         mechanism_capabilities.get('indirect_outcomes', [])

    # Extract promised outcome
    promised_outcome = extract_outcome(promise)

    alignment_checks = {
        'outcome_in_capabilities': promised_outcome in mechanism_outcomes,
        'logical_connection': check_logical_connection(promise, mechanism_package),
        'not_contradicting': not contradicts_mechanism(promise, mechanism_package),
        'villain_aligned': check_villain_alignment(promise, mechanism_package)
    }

    result = {
        'test': 'mechanism_alignment',
        'checks': alignment_checks,
        'promised_outcome': promised_outcome,
        'mechanism_outcomes': mechanism_outcomes,
        'pass': alignment_checks['outcome_in_capabilities'] and
                alignment_checks['not_contradicting'],
        'score': sum(alignment_checks.values()) * 2.5  # Max 10
    }

    if not result['pass']:
        result['misalignment_details'] = describe_misalignment(
            promised_outcome,
            mechanism_outcomes,
            mechanism_package
        )

    return result
```

---

### Test 5: Is It STAGE-APPROPRIATE?

```python
def validate_stage_appropriateness(promise, schwartz_stage, market_context):
    """
    Check if promise framing matches market sophistication.
    Wrong framing for stage fails.
    """
    stage_requirements = {
        1: {
            'should_have': ['direct_claim'],
            'should_not_have': ['mechanism_heavy', 'proof_heavy'],
            'framing': 'simple_direct'
        },
        2: {
            'should_have': ['bigger_claim', 'comparative'],
            'should_not_have': ['mechanism_only'],
            'framing': 'amplified'
        },
        3: {
            'should_have': ['mechanism_mention', 'how_it_works'],
            'should_not_have': ['bare_promise'],
            'framing': 'mechanism_led'
        },
        4: {
            'should_have': ['unique_mechanism', 'differentiation'],
            'should_not_have': ['generic_mechanism'],
            'framing': 'unique_angle'
        },
        5: {
            'should_have': ['identity_markers', 'empathy'],
            'should_not_have': ['hard_sell', 'aggressive_claims'],
            'framing': 'identification_first'
        }
    }

    requirements = stage_requirements[schwartz_stage]

    stage_checks = {
        'has_required_elements': check_elements_present(
            promise, requirements['should_have']
        ),
        'avoids_wrong_elements': check_elements_absent(
            promise, requirements['should_not_have']
        ),
        'correct_framing': check_framing_match(
            promise, requirements['framing']
        )
    }

    result = {
        'test': 'stage_appropriateness',
        'target_stage': schwartz_stage,
        'requirements': requirements,
        'checks': stage_checks,
        'pass': all(stage_checks.values()),
        'score': sum(stage_checks.values()) * 3.33  # Max 10
    }

    if not result['pass']:
        result['stage_adjustments_needed'] = recommend_stage_adjustments(
            promise, schwartz_stage, stage_checks
        )

    return result
```

---

## ANTI-SLOP VALIDATION

Additional validation layer to catch generic/AI-sounding copy:

```python
def validate_anti_slop(promise):
    """
    Check for slop indicators in promise copy.
    """
    slop_patterns = {
        'filler_phrases': [
            'simply put', 'in other words', 'basically',
            'at the end of the day', 'when all is said and done',
            'needless to say', 'it goes without saying'
        ],
        'hype_words': [
            'revolutionary', 'groundbreaking', 'game-changing',
            'life-changing', 'incredible', 'amazing', 'unbelievable',
            'secret', 'ancient secret', 'weird trick'
        ],
        'vague_intensifiers': [
            'very', 'really', 'extremely', 'incredibly',
            'absolutely', 'totally', 'completely'
        ],
        'ai_tells': [
            'cutting-edge', 'state-of-the-art', 'next-generation',
            'holistic approach', 'comprehensive solution',
            'seamlessly', 'effortlessly'
        ]
    }

    slop_found = []

    for category, patterns in slop_patterns.items():
        for pattern in patterns:
            if pattern.lower() in promise.lower():
                slop_found.append({
                    'category': category,
                    'pattern': pattern,
                    'severity': get_slop_severity(category)
                })

    result = {
        'test': 'anti_slop',
        'slop_instances': slop_found,
        'slop_count': len(slop_found),
        'pass': len(slop_found) == 0,
        'score': max(0, 10 - len(slop_found) * 2)
    }

    if slop_found:
        result['cleanup_recommendations'] = generate_slop_replacements(slop_found)

    return result
```

---

## VALIDATION COMPOSITE SCORING

```python
def calculate_validation_composite(validation_results):
    """
    Calculate overall validation score and status.
    """
    tests = ['specificity', 'believability', 'provability',
             'mechanism_alignment', 'stage_appropriateness', 'anti_slop']

    weights = {
        'specificity': 0.15,
        'believability': 0.20,
        'provability': 0.25,  # Most important
        'mechanism_alignment': 0.20,
        'stage_appropriateness': 0.10,
        'anti_slop': 0.10
    }

    # Calculate weighted composite
    composite = 0
    for test in tests:
        if test in validation_results:
            composite += validation_results[test]['score'] * weights[test]

    # Determine status
    failed_tests = [t for t in tests if t in validation_results and not validation_results[t]['pass']]

    if len(failed_tests) == 0:
        status = 'VALIDATED'
    elif len(failed_tests) == 1 and 'anti_slop' in failed_tests:
        status = 'VALIDATED_WITH_CLEANUP'
    elif len(failed_tests) <= 2:
        status = 'NEEDS_REVISION'
    else:
        status = 'FAILED'

    return {
        'composite_score': round(composite, 1),
        'status': status,
        'failed_tests': failed_tests,
        'all_results': validation_results
    }
```

---

## OUTPUT: VALIDATION REPORT

```yaml
layer_3_output:
  validation_summary:
    promises_validated: 10
    promises_passed: 6
    promises_failed: 2
    promises_need_revision: 2

  validated_promises:
    - id: "promise_002"
      statement: "End your uncontrollable cravings in as little as 7 days"
      validation:
        specificity:
          pass: true
          score: 7.5
          markers: {has_number: true, has_timeframe: true, has_qualifier: true}
        believability:
          pass: true
          score: 8
          checks: {no_miracle_language: true, within_market_norms: true}
        provability:
          pass: true
          score: 9
          supporting_proof: ["Duke study on gut cravings", "Testimonial batch A"]
        mechanism_alignment:
          pass: true
          score: 10
          alignment_type: "direct"
        stage_appropriateness:
          pass: true
          score: 8
          framing: "mechanism_led"
        anti_slop:
          pass: true
          score: 10
          slop_count: 0
      composite_score: 8.7
      status: "VALIDATED"

    - id: "promise_003"
      statement: "Revolutionary way to transform your body completely"
      validation:
        specificity:
          pass: false
          score: 2.5
          issues: ["No number", "No timeframe", "Vague outcome"]
        believability:
          pass: false
          score: 4
          issues: ["Contains miracle language: 'revolutionary'"]
        provability:
          pass: false
          score: 3
          proof_gap: "No transformation proof available"
        mechanism_alignment:
          pass: true
          score: 6
        stage_appropriateness:
          pass: false
          score: 4
        anti_slop:
          pass: false
          score: 6
          slop_instances: ["revolutionary"]
      composite_score: 4.2
      status: "FAILED"

  failed_promise_remediation:
    - id: "promise_003"
      issues:
        - "Remove 'revolutionary' (slop)"
        - "Add specificity markers"
        - "Downgrade from transformation claim"
      suggested_revision: "Experience noticeable improvement in your energy and cravings within 14 days"

  top_validated_promises:
    - rank: 1
      id: "promise_002"
      statement: "End your uncontrollable cravings in as little as 7 days"
      composite_score: 8.7
    - rank: 2
      id: "promise_005"
      statement: "Finally lose the stubborn weight that won't respond to diets"
      composite_score: 8.3
    - rank: 3
      id: "promise_001"
      statement: "Transform your body by defeating the Bad Bugs controlling your cravings"
      composite_score: 8.1

  ready_for_packaging: true
```

---

## GATE 3 CRITERIA

**PASS if:**
- At least 3 promises pass all 5 validation tests
- Top promise scores ≥8.0 composite
- Zero promises with "FAILED" status in final set
- All slop instances identified and either cleaned or flagged

**PASS WITH WARNINGS if:**
- PASS criteria met
- But: 1-2 promises need revision OR slop cleanup required

**FAIL if:**
- Fewer than 3 promises pass validation
- Top promise <8.0
- Critical tests (provability, believability) fail for all promises
- Excessive slop in top promises

On FAIL: Return to Layer 1-2 for redrafting with specific guidance from validation failures.
