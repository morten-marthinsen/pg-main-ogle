# Layer 1: Surface Problem Mapping

**Layer:** 1
**Type:** Analysis
**Purpose:** Map what the prospect believes is wrong — their surface-level understanding
**Inputs:** Validated context from Layer 0
**Outputs:** Complete surface problem map

---

## PURPOSE

Before we can REFRAME the prospect's understanding, we must first UNDERSTAND their current frame. This layer maps:

1. **What they think the problem is**
2. **What they blame for the problem**
3. **What they've tried that didn't work**
4. **How they emotionally relate to the problem**
5. **What language they use to describe it**

---

## SURFACE PROBLEM ANALYSIS

### Step 1: Problem Statement Extraction

From customer language database, extract and cluster problem statements:

```python
def extract_problem_statements(customer_language):
    """
    Extract how prospects describe their core problem.
    """
    problem_clusters = {
        'symptom_focused': [],    # "I can't sleep", "My energy is low"
        'outcome_focused': [],    # "I can't lose weight", "I can't get results"
        'cause_focused': [],      # "My metabolism is slow", "My hormones are off"
        'blame_focused': []       # "Diets don't work", "I've tried everything"
    }

    for statement in customer_language['problem_descriptions']:
        cluster = classify_problem_statement(statement)
        problem_clusters[cluster].append(statement)

    return {
        'clusters': problem_clusters,
        'dominant_cluster': max(problem_clusters, key=lambda k: len(problem_clusters[k])),
        'primary_problem_language': extract_most_common_phrases(problem_clusters)
    }


def classify_problem_statement(statement):
    """
    Classify a problem statement by its focus.
    """
    # Symptom indicators
    if any(phrase in statement.lower() for phrase in ['feel', 'can\'t sleep', 'tired', 'pain', 'bloated']):
        return 'symptom_focused'

    # Outcome indicators
    if any(phrase in statement.lower() for phrase in ['can\'t lose', 'won\'t go away', 'stuck', 'plateau']):
        return 'outcome_focused'

    # Cause indicators
    if any(phrase in statement.lower() for phrase in ['metabolism', 'hormones', 'genetics', 'age']):
        return 'cause_focused'

    # Blame indicators
    if any(phrase in statement.lower() for phrase in ['tried', 'doesn\'t work', 'nothing works', 'diet']):
        return 'blame_focused'

    return 'outcome_focused'  # Default
```

---

### Step 2: Self-Attribution Analysis

Map what the prospect blames — internal vs external attribution:

```python
def analyze_attribution(customer_language):
    """
    Understand what prospects attribute their problem to.
    """
    self_blame = []      # "I don't have willpower", "I can't stick to it"
    external_blame = []  # "Nothing works", "These products are scams"
    body_blame = []      # "My body doesn't work right", "My metabolism"
    circumstance_blame = []  # "I'm too busy", "I don't have time"

    for statement in customer_language.get('self_diagnoses', []):
        attribution = classify_attribution(statement)
        if attribution == 'self':
            self_blame.append(statement)
        elif attribution == 'external':
            external_blame.append(statement)
        elif attribution == 'body':
            body_blame.append(statement)
        else:
            circumstance_blame.append(statement)

    total = len(self_blame) + len(external_blame) + len(body_blame) + len(circumstance_blame)

    return {
        'attribution_breakdown': {
            'self_blame': len(self_blame) / total if total > 0 else 0,
            'external_blame': len(external_blame) / total if total > 0 else 0,
            'body_blame': len(body_blame) / total if total > 0 else 0,
            'circumstance_blame': len(circumstance_blame) / total if total > 0 else 0
        },
        'dominant_attribution': determine_dominant_attribution(
            self_blame, external_blame, body_blame, circumstance_blame
        ),
        'sample_statements': {
            'self_blame': self_blame[:3],
            'external_blame': external_blame[:3],
            'body_blame': body_blame[:3],
            'circumstance_blame': circumstance_blame[:3]
        }
    }
```

---

### Step 3: Failed Solutions Mapping

Map what they've already tried:

```python
def map_failed_solutions(customer_language, competitive_landscape):
    """
    Understand what solutions they've tried and why they failed (in their view).
    """
    tried_solutions = customer_language.get('what_they_ve_tried', [])
    common_solutions = competitive_landscape.get('common_solutions', [])

    solution_categories = {
        'dietary': [],        # Diets, meal plans, calorie counting
        'supplemental': [],   # Pills, supplements, shakes
        'behavioral': [],     # Exercise, habits, routines
        'medical': [],        # Doctors, prescriptions, procedures
        'alternative': []     # Natural remedies, wellness approaches
    }

    for solution in tried_solutions:
        category = classify_solution(solution)
        solution_categories[category].append(solution)

    # Analyze why they think these failed
    failure_reasons = extract_failure_reasons(customer_language)

    return {
        'tried_solutions': solution_categories,
        'most_tried_category': max(solution_categories, key=lambda k: len(solution_categories[k])),
        'failure_reasons': failure_reasons,
        'exhaustion_level': calculate_exhaustion_level(tried_solutions)
    }


def calculate_exhaustion_level(tried_solutions):
    """
    How exhausted are they with trying solutions?
    """
    count = len(tried_solutions)

    if count >= 5:
        return 'highly_exhausted'  # Tried many things
    elif count >= 3:
        return 'moderately_exhausted'
    elif count >= 1:
        return 'somewhat_exhausted'
    else:
        return 'not_exhausted'  # New to seeking solutions
```

---

### Step 4: Emotional State Mapping

Map the emotional context around the problem:

```python
def map_emotional_state(market_psychology, customer_language):
    """
    Understand the emotional landscape around the problem.
    """
    emotional_profile = {
        'fear': {
            'level': market_psychology['fear_dimension']['level'],
            'objects': market_psychology['fear_dimension']['fear_objects'],
            'expressions': extract_fear_language(customer_language)
        },
        'frustration': {
            'level': market_psychology['frustration_dimension']['level'],
            'targets': market_psychology['frustration_dimension']['blame_targets'],
            'expressions': extract_frustration_language(customer_language)
        },
        'hope': {
            'level': market_psychology['hope_dimension']['level'],
            'desired_outcomes': market_psychology['hope_dimension']['desired_outcomes'],
            'belief_remaining': market_psychology['hope_dimension']['belief_in_solution']
        },
        'shame': {
            'level': infer_shame_level(customer_language),
            'expressions': extract_shame_language(customer_language)
        }
    }

    # Determine dominant emotion
    emotions = ['fear', 'frustration', 'hope', 'shame']
    dominant = max(emotions, key=lambda e: emotional_profile[e]['level'])

    return {
        'emotional_profile': emotional_profile,
        'dominant_emotion': dominant,
        'emotional_intensity': sum(emotional_profile[e]['level'] for e in emotions) / len(emotions)
    }
```

---

### Step 5: Surface Problem Synthesis

Combine all analyses into a coherent surface problem statement:

```python
def synthesize_surface_problem(problem_statements, attribution, failed_solutions, emotional_state):
    """
    Synthesize all surface analysis into a clear picture.
    """
    return {
        'surface_problem_statement': generate_surface_statement(
            problem_statements['primary_problem_language'],
            attribution['dominant_attribution']
        ),

        'their_current_understanding': {
            'what_they_think_is_wrong': problem_statements['dominant_cluster'],
            'what_they_blame': attribution['dominant_attribution'],
            'what_they_think_would_fix_it': infer_desired_fix(problem_statements, failed_solutions)
        },

        'emotional_context': {
            'dominant_emotion': emotional_state['dominant_emotion'],
            'emotional_intensity': emotional_state['emotional_intensity'],
            'hope_level': emotional_state['emotional_profile']['hope']['level']
        },

        'exhaustion_context': {
            'solutions_tried': len(failed_solutions['tried_solutions']),
            'exhaustion_level': failed_solutions['exhaustion_level'],
            'belief_remaining': emotional_state['emotional_profile']['hope']['belief_remaining']
        },

        'language_capture': {
            'how_they_describe_problem': problem_statements['primary_problem_language'][:5],
            'how_they_express_frustration': emotional_state['emotional_profile']['frustration']['expressions'][:3],
            'their_self_diagnosis': attribution['sample_statements'].get(attribution['dominant_attribution'], [])[:3]
        }
    }
```

---

## OUTPUT: SURFACE PROBLEM MAP

```yaml
layer_1_output:
  surface_problem_map:
    # Core Understanding
    surface_problem_statement: "I can't lose weight no matter what I try"

    their_current_understanding:
      what_they_think_is_wrong: "outcome_focused"  # They focus on the result, not the cause
      what_they_blame: "body_blame"                # They blame their body
      what_they_think_would_fix_it: "Finding the right diet/supplement"

    # Problem Language
    problem_language:
      dominant_phrases: ["can't lose weight", "nothing works", "stuck"]
      self_diagnosis_phrases: ["slow metabolism", "bad genetics"]
      frustration_phrases: ["tried everything", "so frustrating"]

    # Attribution Profile
    attribution:
      breakdown:
        self_blame: 0.3
        external_blame: 0.2
        body_blame: 0.4
        circumstance_blame: 0.1
      dominant_attribution: "body_blame"
      implications: "Reframe should shift from body-as-problem to body-as-victim"

    # Solution History
    failed_solutions:
      tried_categories: ["dietary", "supplemental", "behavioral"]
      most_tried: "dietary"
      exhaustion_level: "highly_exhausted"
      failure_narrative: "Diets work temporarily then stop"

    # Emotional Context
    emotional_state:
      dominant_emotion: "frustration"
      intensity: 7.5
      hope_remaining: 4
      shame_level: 6
      fear_level: 5

    # Implications for Root Cause
    root_cause_implications:
      reframe_opportunity: "Shift from 'your body is broken' to 'your body is being sabotaged'"
      villain_opportunity: "External villain that's doing the sabotaging"
      countersell_target: "Diets and exercise (most tried solutions)"
      emotional_lever: "Frustration (dominant) + relief from shame (secondary)"
```

---

## GATE 1 CRITERIA

**PASS if:**
- Surface problem statement clearly articulated
- Attribution analysis complete
- ≥3 failed solutions mapped
- Emotional state characterized
- Root cause implications identified

**PASS WITH WARNINGS if:**
- PASS criteria met
- But: Emotional intensity < 5 OR hope remaining < 3

**FAIL if:**
- Cannot articulate surface problem
- No failed solutions to countersell
- Insufficient customer language data

On FAIL: Return to Layer 0, request additional customer research.
