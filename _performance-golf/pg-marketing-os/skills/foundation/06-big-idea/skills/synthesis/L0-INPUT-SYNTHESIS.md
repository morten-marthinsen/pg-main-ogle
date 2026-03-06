# Layer 0: Input Synthesis + Coherence Check

**Layer:** 0
**Type:** Loading + Validation
**Purpose:** Load upstream packages and validate they form a coherent campaign foundation
**Inputs:** Outputs from skills 03-root-cause, 04-mechanisms, 05-promise
**Outputs:** Validated synthesis context

---

## PART 1: UPSTREAM PACKAGE LOADING

### Load Root Cause Package

```python
def load_root_cause_package(root_cause_output_path):
    """
    Load and extract key elements from root cause skill output.
    """
    rc_package = read_json(root_cause_output_path)

    return {
        'surface_problem': rc_package['summary']['surface_problem'],
        'real_root_cause': rc_package['summary']['real_root_cause'],
        'root_cause_method': rc_package['summary']['root_cause_method'],

        'villain': {
            'name': rc_package['reframe']['villain']['primary_villain']['name'],
            'type': rc_package['reframe']['villain']['primary_villain']['type'],
            'what_it_does': rc_package['reframe']['villain']['primary_villain']['what_it_does'],
            'how_it_sabotages': rc_package['reframe']['villain']['primary_villain']['how_it_sabotages'],
            'why_prevalent': rc_package['reframe']['villain']['primary_villain']['why_prevalent']
        },

        'countersells': rc_package['countersells'],

        'copy_elements': {
            'key_reframe_lines': rc_package['handoffs']['to_copy']['key_reframe_lines'],
            'villain_dramatization_lines': rc_package['handoffs']['to_copy']['villain_dramatization_lines'],
            'countersell_lines': rc_package['handoffs']['to_copy']['countersell_lines']
        },

        'scores': rc_package['scores']
    }
```

### Load Mechanism Package

```python
def load_mechanism_package(mechanism_output_path):
    """
    Load and extract key elements from mechanism skill output.
    """
    mech_package = read_json(mechanism_output_path)

    return {
        'mechanism_name': mech_package['mechanism']['name'],
        'mechanism_type': mech_package['mechanism']['type'],
        'superiority_claim': mech_package['mechanism']['superiority_claim'],
        'what_it_does': mech_package['mechanism']['what_it_does'],
        'how_it_works': mech_package['mechanism']['how_it_works'],

        'villain_connection': {
            'villain_it_defeats': mech_package['mechanism'].get('villain_it_defeats'),
            'defeat_action': mech_package['mechanism'].get('defeat_action')
        },

        'scorecard': mech_package['scorecard'],

        'creative_elements': {
            'naming_hooks': mech_package.get('naming_elements', []),
            'metaphor_options': mech_package.get('metaphors', []),
            'simplification': mech_package.get('simplified_explanation')
        }
    }
```

### Load Promise Package

```python
def load_promise_package(promise_output_path):
    """
    Load and extract key elements from promise skill output.
    """
    promise_package = read_json(promise_output_path)

    return {
        'primary_promise': {
            'statement': promise_package['primary_promise']['statement'],
            'type': promise_package['primary_promise']['promise_type'],
            'specificity_markers': promise_package['primary_promise']['components']['specificity_markers']
        },

        'campaign_thesis': promise_package['campaign_thesis'],

        'variations': {
            'bold': promise_package['variations']['bold_version'],
            'safe': promise_package['variations']['safe_version'],
            'question': promise_package['variations']['question_version']
        },

        'quality_gates': promise_package['quality_gates'],
        'scores': promise_package['scores']
    }
```

### Load Market Context

```python
def load_market_context(deep_research_path):
    """
    Load market context from deep research for Big Idea positioning.
    """
    dr = read_json(deep_research_path)

    return {
        'schwartz_stage': dr['market_context']['schwartz_stage'],

        'market_psychology': {
            'dominant_emotion': dr['market_psychology']['dominant_emotion'],
            'hope_level': dr['market_psychology']['hope_level'],
            'skepticism_level': dr['market_psychology']['skepticism_level']
        },

        'competitive_landscape': {
            'saturated_big_ideas': dr['competitive_landscape'].get('saturated_concepts', []),
            'saturated_mechanisms': dr['competitive_landscape'].get('common_mechanisms', []),
            'whitespace_opportunities': dr['competitive_landscape'].get('opportunities', [])
        },

        'customer_language': {
            'problem_descriptions': dr['customer_language']['how_they_describe_problem'],
            'success_descriptions': dr['customer_language']['how_they_describe_success']
        }
    }
```

---

## PART 2: COHERENCE VALIDATION

The three upstream packages MUST form a coherent campaign. Validate the connections:

### Check 1: Villain → Mechanism Connection

```python
def validate_villain_mechanism_connection(root_cause, mechanism):
    """
    Verify the villain from root cause is addressed by the mechanism.
    """
    villain_name = root_cause['villain']['name']
    mechanism_target = mechanism['villain_connection'].get('villain_it_defeats')

    # Direct match
    if mechanism_target and villain_name.lower() in mechanism_target.lower():
        return {
            'pass': True,
            'connection_type': 'direct',
            'note': f"Mechanism directly defeats '{villain_name}'"
        }

    # Implicit connection - mechanism addresses what villain does
    villain_action = root_cause['villain']['what_it_does']
    mechanism_action = mechanism['what_it_does']

    if counters_action(mechanism_action, villain_action):
        return {
            'pass': True,
            'connection_type': 'implicit',
            'note': f"Mechanism counters villain's action"
        }

    return {
        'pass': False,
        'issue': f"Mechanism '{mechanism['mechanism_name']}' doesn't clearly address villain '{villain_name}'"
    }
```

### Check 2: Mechanism → Promise Connection

```python
def validate_mechanism_promise_connection(mechanism, promise):
    """
    Verify the mechanism can deliver the promise.
    """
    mechanism_outcome = mechanism['what_it_does']
    promise_outcome = extract_outcome(promise['primary_promise']['statement'])

    # Check logical connection
    if outcome_alignment(mechanism_outcome, promise_outcome):
        return {
            'pass': True,
            'connection_type': 'direct',
            'note': f"Mechanism delivers promised outcome"
        }

    return {
        'pass': False,
        'issue': f"Mechanism outcome '{mechanism_outcome}' doesn't deliver promise '{promise_outcome}'"
    }
```

### Check 3: Promise → Thesis Alignment

```python
def validate_thesis_alignment(promise, mechanism):
    """
    Verify campaign thesis connects promise and mechanism correctly.
    """
    thesis = promise['campaign_thesis']

    # Thesis should contain promise + mechanism
    has_promise = contains_promise_concept(thesis, promise['primary_promise']['statement'])
    has_mechanism = contains_mechanism_name(thesis, mechanism['mechanism_name'])

    if has_promise and has_mechanism:
        return {
            'pass': True,
            'note': "Campaign thesis properly connects promise and mechanism"
        }

    return {
        'pass': False,
        'issue': f"Thesis missing {'promise' if not has_promise else 'mechanism'}"
    }
```

### Check 4: Root Cause Method Compatibility

```python
def validate_root_cause_compatibility(root_cause, mechanism):
    """
    Verify root cause method aligns with mechanism type.
    """
    rc_method = root_cause['root_cause_method']
    mech_type = mechanism['mechanism_type']

    compatibility_matrix = {
        'new_syndrome': ['protocol', 'system', 'method'],
        'new_reality': ['protocol', 'formula', 'principle'],
        'biology_metaphor': ['compound', 'ingredient', 'protocol'],
        'hidden_layer': ['system', 'method', 'protocol'],
        'problem_villain_validation': ['protocol', 'compound', 'system'],
        'big_juxtaposition': ['method', 'principle', 'formula']
    }

    compatible_types = compatibility_matrix.get(rc_method, [])

    if mech_type in compatible_types:
        return {'pass': True, 'compatibility': 'optimal'}
    else:
        return {
            'pass': True,  # Not a hard fail, just suboptimal
            'compatibility': 'suboptimal',
            'note': f"Root cause method '{rc_method}' works better with {compatible_types}, not '{mech_type}'"
        }
```

---

## PART 3: SYNTHESIS CONTEXT ASSEMBLY

```python
def assemble_synthesis_context(root_cause, mechanism, promise, market_context):
    """
    Combine validated inputs into synthesis context for Big Idea generation.
    """
    return {
        'strategic_foundation': {
            'villain': root_cause['villain'],
            'root_cause': root_cause['real_root_cause'],
            'mechanism': mechanism['mechanism_name'],
            'promise': promise['primary_promise']['statement'],
            'campaign_thesis': promise['campaign_thesis']
        },

        'creative_assets': {
            'reframe_lines': root_cause['copy_elements']['key_reframe_lines'],
            'villain_lines': root_cause['copy_elements']['villain_dramatization_lines'],
            'countersell_lines': root_cause['copy_elements']['countersell_lines'],
            'mechanism_metaphors': mechanism['creative_elements']['metaphor_options'],
            'promise_variations': promise['variations']
        },

        'positioning_constraints': {
            'schwartz_stage': market_context['schwartz_stage'],
            'saturated_concepts': market_context['competitive_landscape']['saturated_big_ideas'],
            'whitespace': market_context['competitive_landscape']['whitespace_opportunities'],
            'customer_language': market_context['customer_language']
        },

        'quality_baselines': {
            'root_cause_score': root_cause['scores']['composite'],
            'mechanism_score': mechanism['scorecard']['composite'],
            'promise_score': promise['scores']['composite']
        }
    }
```

---

## OUTPUT: LAYER 0 OUTPUT

```yaml
layer_0_output:
  validation_status: enum[pass, pass_with_warnings, fail]

  upstream_packages:
    root_cause:
      loaded: true
      villain: "Bad Bugs"
      root_cause: "Gut microbiome imbalance"
      score: 8.3
    mechanism:
      loaded: true
      name: "Gut Reset Protocol"
      type: "protocol"
      score: 8.5
    promise:
      loaded: true
      statement: "End your uncontrollable cravings in as little as 7 days"
      score: 8.7

  coherence_checks:
    villain_to_mechanism:
      pass: true
      connection_type: "direct"
    mechanism_to_promise:
      pass: true
      connection_type: "direct"
    thesis_alignment:
      pass: true
    root_cause_compatibility:
      pass: true
      compatibility: "optimal"
    all_pass: true

  synthesis_context:
    strategic_foundation: {...}
    creative_assets: {...}
    positioning_constraints: {...}
    quality_baselines: {...}

  warnings: []
  blockers: []

  ready_for_layer_1: true
```

---

## GATE 0 CRITERIA

**PASS if:**
- All three upstream packages loaded successfully
- All coherence checks pass
- No blockers identified
- Synthesis context assembled

**PASS WITH WARNINGS if:**
- PASS criteria met
- But: root_cause_compatibility is "suboptimal"
- Or: One upstream score < 7.5

**FAIL if:**
- Any upstream package missing or invalid
- villain_to_mechanism check fails
- mechanism_to_promise check fails
- thesis_alignment fails

On FAIL: Return to the upstream skill indicated by the failing check.
