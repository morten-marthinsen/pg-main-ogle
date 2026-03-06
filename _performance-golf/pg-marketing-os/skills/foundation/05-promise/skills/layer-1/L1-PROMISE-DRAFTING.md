# Layer 1: Promise Drafting

**Layer:** 1
**Type:** Generation
**Purpose:** Draft multiple promise variations using E5 methodology
**Inputs:** Validated context from Layer 0
**Outputs:** 10+ promise candidates

---

## THE E5 PROMISE PROCESS

### Step 1: Blue Sky Generation

Start with the biggest possible promise — what would they want if you could wave a magic wand?

```python
def blue_sky_promise(now_after_grid, ideal_client_success):
    """
    Generate the maximum aspiration promise.
    Don't worry about proof yet — just dream big.
    """
    # Extract the primary transformation
    primary_now = now_after_grid['now'][0]
    primary_after = now_after_grid['after'][0]

    blue_sky = {
        'transformation': f"Go from {primary_now['situation']} to {primary_after['situation']}",
        'emotional_shift': f"From {primary_now['emotion']} to {primary_after['emotion']}",
        'ideal_outcome': ideal_client_success
    }

    # Generate blue sky promise statements
    blue_sky_promises = [
        f"Complete {primary_after['relief']} — never worry about {primary_now['pain']} again",
        f"Transform your {extract_topic(primary_now)} in record time",
        f"Experience the {primary_after['emotion']} of finally having {primary_after['situation']}",
        f"Achieve {ideal_client_success} — the outcome you've always wanted"
    ]

    return blue_sky_promises
```

---

### Step 2: Specificity Enhancement

Make each promise concrete and measurable:

```python
def add_specificity(promise, proof_inventory, product_context):
    """
    Add specific numbers, timeframes, and qualifiers to make promise concrete.
    """
    specificity_elements = {
        'timeframe': extract_timeframe_proof(proof_inventory),
        # "in 30 days", "within 2 weeks", "in as little as 72 hours"

        'quantity': extract_quantity_proof(proof_inventory),
        # "8 pounds", "15%", "$500"

        'qualifier': extract_qualifier(product_context),
        # "belly fat", "blood pressure", "monthly income"
    }

    # Apply specificity patterns
    specific_promises = []

    for base_promise in promises:
        # Add timeframe version
        if specificity_elements['timeframe']:
            specific_promises.append(
                f"{base_promise} {specificity_elements['timeframe']}"
            )

        # Add quantity version
        if specificity_elements['quantity']:
            specific_promises.append(
                f"{specificity_elements['quantity']} {extract_result(base_promise)}"
            )

        # Add combined version
        if all(specificity_elements.values()):
            specific_promises.append(
                f"Achieve {specificity_elements['quantity']} {specificity_elements['qualifier']} "
                f"{specificity_elements['timeframe']}"
            )

    return specific_promises
```

---

### Step 3: Promise Type Variations

Generate promises across different psychological frames:

```python
def generate_type_variations(core_promise, root_cause, villain):
    """
    Generate promises across different promise types.
    """
    variations = {
        'transformation': [],  # What you become
        'improvement': [],     # What gets better
        'relief': [],          # What goes away
        'capability': [],      # What you can now do
        'prevention': []       # What you avoid
    }

    # TRANSFORMATION promises
    # Focus on the identity/state change
    variations['transformation'].extend([
        f"Transform from {surface_problem} to {desired_state}",
        f"Become someone who {positive_identity}",
        f"Finally be {positive_state}"
    ])

    # IMPROVEMENT promises
    # Focus on making something better
    variations['improvement'].extend([
        f"Improve your {topic} significantly",
        f"Get better {results} than ever before",
        f"Experience {topic} like you did {timeframe} ago"
    ])

    # RELIEF promises
    # Focus on removing pain/problem
    variations['relief'].extend([
        f"End your {problem} once and for all",
        f"Finally stop dealing with {pain}",
        f"Free yourself from {villain}"
    ])

    # CAPABILITY promises
    # Focus on new ability
    variations['capability'].extend([
        f"Finally be able to {desired_action}",
        f"Gain the ability to {capability}",
        f"Do what you've never been able to do: {action}"
    ])

    # PREVENTION promises
    # Focus on avoiding negative future
    variations['prevention'].extend([
        f"Prevent {negative_consequence}",
        f"Avoid the {fear} that comes from {problem}",
        f"Protect yourself from {villain}"
    ])

    return variations
```

---

### Step 4: Mechanism Connection

Connect each promise to the mechanism:

```python
def connect_to_mechanism(promises, mechanism):
    """
    Create versions that explicitly connect promise to mechanism.
    """
    mechanism_connected = []

    for promise in promises:
        # Direct connection
        mechanism_connected.append({
            'promise': promise,
            'mechanism_version': f"{promise} with the {mechanism['name']}",
            'superiority_version': f"The {mechanism['superiority_claim']} way to {promise}",
            'thesis_version': f"The [only/best/fastest] way to {promise} is with {mechanism['name']}"
        })

    return mechanism_connected
```

---

### Step 5: Emotional Framing

Add emotional resonance to technical promises:

```python
def add_emotional_frame(promise, market_psychology, customer_language):
    """
    Wrap technical promises in emotional language.
    """
    emotion_frames = {
        'hope': [
            f"Finally {promise} — just like you've always wanted",
            f"Imagine {promise} — it's finally possible",
            f"What would it mean to {promise}?"
        ],
        'frustration_relief': [
            f"After years of trying, finally {promise}",
            f"End the frustration — {promise}",
            f"Stop struggling and {promise}"
        ],
        'fear_escape': [
            f"Escape the fear of {negative} by {promise}",
            f"Before it's too late — {promise}",
            f"Don't let {fear} stop you from {promise}"
        ],
        'vindication': [
            f"Prove them wrong — {promise}",
            f"Show everyone what's possible — {promise}",
            f"Finally get the {result} you deserve"
        ]
    }

    # Select based on market psychology
    if market_psychology['hope_level'] > 7:
        primary_frame = 'hope'
    elif market_psychology['exhaustion_level'] > 7:
        primary_frame = 'frustration_relief'
    else:
        primary_frame = 'fear_escape'

    return emotion_frames[primary_frame]
```

---

## PROMISE PATTERNS

### Pattern 1: Result + Timeframe
```
[Achieve/Get/Experience] [specific result] in [timeframe]

Examples:
- "Burn 8 pounds of belly fat in 72 hours"
- "Double your email list in 30 days"
- "Sleep through the night within a week"
```

### Pattern 2: End + Problem
```
[End/Stop/Eliminate] [specific problem] [qualifier]

Examples:
- "End your sugar cravings for good"
- "Stop the afternoon energy crash"
- "Eliminate stubborn belly fat that won't respond to diets"
```

### Pattern 3: Never + Negative Again
```
Never [experience negative] again

Examples:
- "Never wake up exhausted again"
- "Never struggle with willpower again"
- "Never worry about your blood sugar again"
```

### Pattern 4: Finally + Desired State
```
Finally [achieve/experience] [desired state]

Examples:
- "Finally feel confident in your own skin"
- "Finally have the energy to play with your grandkids"
- "Finally look forward to stepping on the scale"
```

### Pattern 5: The Only Way + Mechanism
```
The [only/best/fastest] way to [promise] is [mechanism]

Examples:
- "The ONLY way to end cravings is to defeat the Bad Bugs"
- "The fastest way to real weight loss starts with fixing your gut"
- "The best way to lasting energy is through metabolic reset"
```

---

## OUTPUT: PROMISE CANDIDATES

```yaml
layer_1_output:
  promise_candidates:
    # Blue Sky (before calibration)
    blue_sky:
      - statement: "Complete transformation — lose all the weight you want"
        type: "transformation"
        excitement_score: 9
        provability_estimate: "unknown"

    # Transformation Type
    transformation_promises:
      - statement: "Transform your body by defeating the Bad Bugs controlling your cravings"
        type: "transformation"
        mechanism_connected: true
        specificity_score: 6

    # Improvement Type
    improvement_promises:
      - statement: "Finally lose the stubborn weight that won't respond to diets"
        type: "improvement"
        mechanism_connected: false
        specificity_score: 5

    # Relief Type
    relief_promises:
      - statement: "End your uncontrollable cravings in as little as 7 days"
        type: "relief"
        mechanism_connected: false
        specificity_score: 8

    # Capability Type
    capability_promises:
      - statement: "Finally be able to walk past the cookie jar without thinking twice"
        type: "capability"
        mechanism_connected: false
        specificity_score: 7

    # With Specificity
    specific_promises:
      - statement: "Lose 12 pounds of stubborn belly fat in the next 30 days"
        specificity_markers:
          quantity: "12 pounds"
          qualifier: "stubborn belly fat"
          timeframe: "30 days"
        proof_required: ["weight loss data", "timeframe evidence"]

    # Campaign Thesis Versions
    thesis_versions:
      - statement: "The ONLY way to finally end your cravings is with the Gut Reset Protocol"
        mechanism: "Gut Reset Protocol"
        superiority: "only"

  total_candidates: 15
  ready_for_calibration: true
```

---

## GATE 1 CRITERIA

**PASS if:**
- ≥10 promise candidates generated
- At least 3 different promise types represented
- At least 3 promises have specificity markers
- At least 2 campaign thesis versions created

**PASS WITH WARNINGS if:**
- PASS criteria met
- But: All promises similar OR low specificity scores

**FAIL if:**
- <10 candidates generated
- All promises are vague/general
- No mechanism connection possible

On FAIL: Review upstream inputs, may need richer customer language or clearer mechanism.
