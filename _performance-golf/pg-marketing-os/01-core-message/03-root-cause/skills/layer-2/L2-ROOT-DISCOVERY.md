# Layer 2: Root Cause Discovery

**Layer:** 2
**Type:** Ideation + Analysis
**Purpose:** Apply the 6 root cause methods to discover and develop root cause candidates
**Inputs:** Surface problem map from Layer 1, validated context from Layer 0
**Outputs:** Ranked root cause candidates with full development

---

## PURPOSE

Transform the surface problem understanding into a ROOT CAUSE REFRAME — the strategic insight that:
1. Shifts blame away from the prospect
2. Introduces a new understanding
3. Creates an "aha moment"
4. Sets up the mechanism as the solution

---

## THE SIX ROOT CAUSE METHODS

### Method 1: New/Rebranded Syndrome

**When to use:** Strong authority proof, scientific backing, sophisticated market

**Development Process:**
```python
def develop_new_syndrome(surface_map, product_context, proof_inventory):
    """
    Develop a named condition/syndrome as the root cause.
    """
    syndrome_candidate = {
        'syndrome_name': generate_syndrome_name(
            product_context['sub_niche'],
            surface_map['problem_language']
        ),

        'what_it_is': describe_syndrome(product_context['scientific_foundation']),

        'symptoms': map_syndrome_symptoms(surface_map['their_current_understanding']),

        'why_they_have_it': develop_causation_narrative(
            product_context,
            proof_inventory
        ),

        'consequences': {
            'high_level': extract_broad_consequences(proof_inventory),
            'specific': extract_specific_consequences(product_context)
        },

        'epidemic_factors': develop_epidemic_narrative(
            # Why is this so prevalent today?
            ['age', 'stress', 'technology', 'diet', 'environment']
        ),

        'proof_backing': {
            'primary_study': find_supporting_study(proof_inventory),
            'authority_quote': find_authority_quote(proof_inventory)
        }
    }

    return syndrome_candidate


def generate_syndrome_name(niche, problem_language):
    """
    Generate potential syndrome names.
    Examples:
    - Shallow Sleep Syndrome
    - Metabolic Resistance Syndrome
    - Cellular Fatigue Syndrome
    """
    naming_patterns = [
        "{adjective} {noun} Syndrome",
        "{adjective} {noun} Condition",
        "{adjective} {noun} Response",
        "{noun} {verb} Disorder"
    ]

    # Generate 5-7 candidates
    candidates = []
    for pattern in naming_patterns:
        candidates.append(apply_naming_pattern(pattern, niche, problem_language))

    return candidates
```

**Output Structure:**
```yaml
new_syndrome:
  name: "Shallow Sleep Syndrome"
  definition: "A condition where you're not getting enough deep, restorative sleep"
  symptoms:
    - "Feeling tired even after sleeping 8 hours"
    - "Difficulty losing weight despite dieting"
    - "Low energy throughout the day"
  why_prevalent:
    - age: "Deep sleep naturally declines after 40"
    - stress: "Modern stress hormones disrupt sleep cycles"
    - technology: "Blue light destroys sleep hormone production"
  proof_support:
    study: "University of Chicago sleep study, 2019"
    stat: "90% of Americans over 40 are deep-sleep deficient"
```

---

### Method 2: New Reality Introduction

**When to use:** Novel scientific concept available, prospect doesn't know something important about their body/situation

**Development Process:**
```python
def develop_new_reality(surface_map, product_context, proof_inventory):
    """
    Introduce a reality the prospect doesn't know exists.
    """
    reality_candidate = {
        'the_revelation': craft_reality_statement(
            # What they don't know that changes everything
            product_context['scientific_foundation']['scientific_principles']
        ),

        'the_analogy': develop_simplifying_analogy(
            # Make abstract reality tangible
            # e.g., "like a rain forest", "like a vault"
        ),

        'why_it_matters': connect_reality_to_problem(
            surface_map['surface_problem_statement']
        ),

        'the_villain_in_this_reality': identify_reality_villain(
            product_context,
            proof_inventory
        ),

        'proof_of_reality': {
            'primary_proof': extract_reality_proof(proof_inventory),
            'quote': find_expert_quote(proof_inventory)
        }
    }

    return reality_candidate
```

**Example Revelations by Niche:**
```yaml
weight_loss:
  - "25 trillion organisms live inside you and control your cravings"
  - "Your fat cells can talk to each other"
  - "You have two types of fat — and one burns the other"

energy:
  - "Your cells have their own battery system that's running low"
  - "An enzyme in every cell controls whether you feel tired or energized"

sexual_health:
  - "Your penis has its own nervous system"
  - "Two nerves control everything about your performance"
```

---

### Method 3: Biology As Metaphor

**When to use:** Complex biological process needs simplification, want memorable hook

**Development Process:**
```python
def develop_biology_metaphor(surface_map, product_context, proof_inventory):
    """
    Turn a biological process into a relatable metaphor.
    """
    metaphor_candidate = {
        'the_metaphor': craft_biology_metaphor(
            product_context['scientific_foundation']['mechanism_of_action']
        ),

        'how_it_normally_works': explain_normal_function(
            # When working correctly, what happens?
        ),

        'what_went_wrong': explain_dysfunction(
            # Why isn't it working for them?
            surface_map['their_current_understanding']
        ),

        'countersell_setup': craft_countersell_from_metaphor(
            # Why common solutions miss this
            surface_map['failed_solutions']
        ),

        'mechanism_bridge': create_mechanism_bridge(
            # How does this lead to the mechanism?
        )
    }

    return metaphor_candidate
```

**Example Metaphors:**
```yaml
cellular:
  - "Fat Cells Talk" — fat cells communicate, yours aren't getting the message
  - "Your Metabolism is a Furnace" — furnace efficiency vs speed
  - "Fat Cells Like a Vault" — locked, won't release what's inside

organ:
  - "Your Penis Has A Brain" — nerve signals control function
  - "Your Gut is a Rain Forest" — ecosystem balance

process:
  - "Your Body Has an On-Off Switch" — AMPK activation
  - "A One-Way Valve on Your Fat" — HSL controls release
```

---

### Method 4: Known Problem, Hidden Layer

**When to use:** Market has existing understanding, you can go one level deeper

**Development Process:**
```python
def develop_hidden_layer(surface_map, product_context, competitive_landscape):
    """
    Build on what they know, reveal what they don't.
    """
    hidden_layer_candidate = {
        'the_known': identify_existing_understanding(
            competitive_landscape['dominant_explanations']
        ),

        'the_reveal': craft_hidden_layer(
            # What they don't know that's just as/more important
            product_context['scientific_foundation']
        ),

        'the_connection': connect_layers(
            # How hidden layer affects the known problem
        ),

        'the_villain': identify_hidden_layer_villain(
            # What in the hidden layer is sabotaging them
        ),

        'why_this_matters': articulate_importance(
            # Why addressing both layers is necessary
        )
    }

    return hidden_layer_candidate
```

**Example Hidden Layers:**
```yaml
thyroid_metabolism:
  known: "Your thyroid controls your metabolism"
  hidden: "Your adrenal glands affect your thyroid"
  villain: "Cortisol (from adrenals) blocks thyroid function"
  importance: "You can't fix thyroid without fixing adrenals first"

metabolism_speed:
  known: "A fast metabolism burns more fat"
  hidden: "Efficiency matters more than speed"
  villain: "Inefficient metabolism wastes energy, stores fat"
  importance: "Most diets slow your metabolism; they don't make it efficient"
```

---

### Method 5: Problem-Villain-Validation

**When to use:** Clear antagonist available, strong third-party validation

**Development Process:**
```python
def develop_problem_villain_validation(surface_map, product_context, proof_inventory):
    """
    Simple three-part structure: Problem → Villain → Validation.
    """
    pvv_candidate = {
        'the_problem': restate_problem_clearly(
            surface_map['surface_problem_statement']
        ),

        'the_villain': develop_villain(
            name=extract_villain_name(product_context),
            type=classify_villain_type(product_context),
            what_it_does=explain_villain_action(product_context),
            how_it_sabotages=explain_sabotage_mechanism(product_context)
        ),

        'the_validation': package_validation(
            proof_inventory['authority_proof']['top_elements'],
            # "According to [Source], [Villain Claim]"
        ),

        'optional_analogy': develop_clarifying_analogy(
            # Make villain action tangible
        )
    }

    return pvv_candidate
```

**Example Problem-Villain-Validation:**
```yaml
weight_loss:
  problem: "Your fat cells aren't releasing stored fat"
  villain:
    name: "HSL (Hormone-Sensitive Lipase)"
    type: "enzyme"
    action: "Controls the 'valve' on your fat cells"
    sabotage: "When HSL is 'off', fat can't escape no matter what you do"
  validation:
    source: "Dr. Jane Vanderkooi, Perelman School of Medicine"
    quote: "Unless you're in long-term starvation, your body won't activate HSL"
  analogy: "Think of it like a one-way valve — fat goes in, but it can't come out"
```

---

### Method 6: The Big Juxtaposition

**When to use:** Clear contrast available (two types, two paths), want dramatic framing

**Development Process:**
```python
def develop_big_juxtaposition(surface_map, product_context, proof_inventory):
    """
    Frame as two paths, two types, or two realities.
    """
    juxtaposition_candidate = {
        'the_contrast': develop_contrast(
            # Two types, two paths, two possibilities
            product_context['scientific_foundation']
        ),

        'the_good_path': paint_good_path(
            # What life looks like on the good side
        ),

        'the_bad_path': paint_bad_path(
            # What life looks like on the bad side
            surface_map['surface_problem_statement']
        ),

        'the_study_as_thesis': package_study_as_proof(
            # Study that proves the contrast
            proof_inventory
        ),

        'mechanism_as_bridge': position_mechanism(
            # How to get from bad path to good path
            product_context
        )
    }

    return juxtaposition_candidate
```

**Example Big Juxtapositions:**
```yaml
fat_types:
  contrast:
    good: "Brown fat — burns calories 24/7, keeps you lean"
    bad: "White fat — stores calories, makes you gain weight"
  thesis: "Study of 50,000 people: Those with more brown fat = lean. Less brown fat = overweight."
  bridge: "The mechanism activates brown fat production"

metabolism_types:
  contrast:
    good: "Hunter's metabolism — efficient, burns everything"
    bad: "Farmer's metabolism — stores everything for winter"
  thesis: "75-80% of us inherited the wrong metabolism type"
  bridge: "You can switch your metabolism type"
```

---

## CANDIDATE GENERATION PROTOCOL

### Step 1: Generate Candidates for Each Viable Method

```python
def generate_all_candidates(surface_map, product_context, proof_inventory, viable_methods):
    """
    Generate root cause candidates using all viable methods.
    """
    candidates = []

    for method_info in viable_methods:
        method = method_info['method']

        if method == 'new_syndrome':
            candidate = develop_new_syndrome(surface_map, product_context, proof_inventory)
        elif method == 'new_reality':
            candidate = develop_new_reality(surface_map, product_context, proof_inventory)
        elif method == 'biology_metaphor':
            candidate = develop_biology_metaphor(surface_map, product_context, proof_inventory)
        elif method == 'hidden_layer':
            candidate = develop_hidden_layer(surface_map, product_context, competitive_landscape)
        elif method == 'problem_villain_validation':
            candidate = develop_problem_villain_validation(surface_map, product_context, proof_inventory)
        elif method == 'big_juxtaposition':
            candidate = develop_big_juxtaposition(surface_map, product_context, proof_inventory)

        candidate['method'] = method
        candidate['viability'] = method_info['viability']
        candidates.append(candidate)

    return candidates
```

### Step 2: Score Each Candidate

```python
def score_candidate(candidate, surface_map, proof_inventory):
    """
    Score each root cause candidate on key dimensions.
    """
    scores = {
        'clarity': score_clarity(candidate),
        # Is the reframe clear and understandable?
        # Can a 12-year-old get it?

        'believability': score_believability(candidate, proof_inventory),
        # Will the prospect accept this?
        # Does it align with their existing beliefs?

        'blame_shift': score_blame_shift(candidate, surface_map),
        # Does it effectively shift blame away from prospect?
        # Is there a clear external villain?

        'emotional_impact': score_emotional_impact(candidate, surface_map),
        # Does it create an "aha moment"?
        # Does it resonate with their frustration?

        'mechanism_setup': score_mechanism_setup(candidate),
        # Does it naturally lead to a mechanism solution?
        # Is the "bridge" clear?

        'proof_backing': score_proof_backing(candidate, proof_inventory)
        # Is the root cause supportable with available proof?
        # Are claims hedged appropriately?
    }

    scores['composite'] = calculate_composite_score(scores)

    return scores
```

### Step 3: Rank Candidates

```python
def rank_candidates(candidates):
    """
    Rank candidates by composite score, with tiebreakers.
    """
    # Primary sort: Composite score
    # Tiebreaker 1: Mechanism setup score (critical for downstream)
    # Tiebreaker 2: Believability score (won't work if they don't believe it)

    ranked = sorted(candidates, key=lambda c: (
        c['scores']['composite'],
        c['scores']['mechanism_setup'],
        c['scores']['believability']
    ), reverse=True)

    return ranked
```

---

## OUTPUT: ROOT CAUSE CANDIDATES

```yaml
layer_2_output:
  candidates:
    - method: "new_reality"
      root_cause_statement: "25 trillion microbes in your gut control your food cravings and whether you gain or lose weight"
      villain:
        name: "Bad Bugs"
        type: "microorganisms"
        what_it_does: "Hijacks your vagus nerve to make you crave junk food"
      key_insight: "Your cravings aren't your fault — they're messages from bad bacteria"
      analogy: "Your gut is like a rain forest — when the ecosystem is damaged, bad bugs take over"
      mechanism_bridge: "The mechanism restores the good microbes that control your cravings"
      proof_backing:
        primary: "UCSF study: Bad bugs manipulate human eating behavior"
        secondary: "Duke study: Splenda kills 50% of gut microbes"
      scores:
        clarity: 8
        believability: 8
        blame_shift: 9
        emotional_impact: 8
        mechanism_setup: 9
        proof_backing: 8
        composite: 8.3

    - method: "problem_villain_validation"
      root_cause_statement: "Your fat cells have a one-way valve that's stuck closed"
      villain:
        name: "HSL (Hormone-Sensitive Lipase)"
        type: "enzyme"
        what_it_does: "Controls whether fat can leave your fat cells"
      key_insight: "Diet and exercise can't open this valve — it requires a specific activation"
      analogy: "Like a vault door that only opens with the right combination"
      mechanism_bridge: "The mechanism activates HSL to unlock your fat cells"
      proof_backing:
        primary: "Dr. Vanderkooi, Perelman School of Medicine quote"
        secondary: null
      scores:
        clarity: 9
        believability: 7
        blame_shift: 8
        emotional_impact: 7
        mechanism_setup: 8
        proof_backing: 7
        composite: 7.7

  winner:
    rank: 1
    method: "new_reality"
    selection_rationale: "Highest composite score, strong mechanism bridge, excellent blame shift"

  runner_up:
    rank: 2
    method: "problem_villain_validation"
    why_not_winner: "Lower believability and emotional impact scores"
```

---

## GATE 2 CRITERIA

**PASS if:**
- ≥2 root cause candidates developed
- Winning candidate composite score ≥ 7.0
- All six scoring dimensions ≥ 5 for winner
- Mechanism bridge clearly articulated
- Villain identified and developed

**PASS WITH WARNINGS if:**
- PASS criteria met
- But: Only 2 candidates OR proof backing < 6

**FAIL if:**
- No candidates developed
- All candidates score < 7.0 composite
- No clear mechanism bridge
- Proof insufficient to support root cause claims

On FAIL: Return to Layer 1, consider alternative surface framing or request additional proof.
