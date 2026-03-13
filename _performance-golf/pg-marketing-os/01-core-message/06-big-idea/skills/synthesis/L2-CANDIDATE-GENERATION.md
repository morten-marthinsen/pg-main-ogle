# Layer 2: Big Idea Candidate Generation (Synthesis Mode)

**Layer:** 2
**Type:** Creative Synthesis + Generation
**Purpose:** Generate 5+ Big Idea candidates by synthesizing upstream inputs with creative wrappers
**Inputs:** Selected types from Layer 1, Synthesis context from Layer 0
**Outputs:** 5+ complete Big Idea candidates with headlines and leads

---

## THE SYNTHESIS FORMULA

Each Big Idea candidate is built by combining:

```
BIG IDEA = [Root Cause Element] + [Mechanism Element] + [Promise Element] + [Creative Wrapper]
```

The creative wrapper is the ONLY new element — everything else comes from upstream skills.

---

## CANDIDATE GENERATION PROCESS

### Step 1: Instantiate Candidates Per Selected Type

```python
def generate_candidates(selected_types, synthesis_context):
    """
    Generate Big Idea candidates using synthesis.
    """
    candidates = []

    for type_info in selected_types:
        # Generate 2 candidates per selected type (minimum)
        for i in range(2):
            candidate = synthesize_candidate(
                big_idea_type=type_info['type'],
                strategy=type_info['strategy'],
                context=synthesis_context,
                variation=i
            )
            candidates.append(candidate)

    # Ensure minimum 5 candidates
    while len(candidates) < 5:
        # Generate hybrid candidate
        hybrid = create_hybrid_candidate(selected_types, synthesis_context)
        candidates.append(hybrid)

    return candidates
```

### Step 2: Synthesize Each Candidate

```python
def synthesize_candidate(big_idea_type, strategy, context, variation):
    """
    Synthesize a single Big Idea candidate from upstream inputs.
    """
    # Extract strategic foundation
    villain = context['strategic_foundation']['villain']
    mechanism = context['strategic_foundation']['mechanism']
    promise = context['strategic_foundation']['promise']
    thesis = context['strategic_foundation']['campaign_thesis']

    # Select creative wrapper based on type
    wrapper = select_creative_wrapper(big_idea_type, context, variation)

    # Build the Big Idea statement
    big_idea_statement = construct_big_idea_statement(
        big_idea_type, villain, mechanism, promise, wrapper
    )

    return {
        'id': generate_candidate_id(big_idea_type, variation),
        'big_idea_type': big_idea_type,
        'big_idea_statement': big_idea_statement,

        'components': {
            'root_cause_angle': extract_root_cause_angle(context, big_idea_type),
            'mechanism_angle': extract_mechanism_angle(context, big_idea_type),
            'promise_angle': extract_promise_angle(context, big_idea_type),
            'creative_wrapper': wrapper
        },

        'strategy': strategy,
        'variation': variation
    }
```

---

## BIG IDEA STATEMENT CONSTRUCTION

### Type: ENEMY

```python
def construct_enemy_big_idea(villain, mechanism, promise, wrapper):
    """
    Construct Big Idea statement for ENEMY type.
    """
    patterns = [
        # Pattern 1: Villain reveal
        f"The {villain['name']} {wrapper['verb']} your {wrapper['target']}",

        # Pattern 2: Villain + defeat
        f"How {mechanism} defeats the {villain['name']} that's {villain['what_it_does']}",

        # Pattern 3: Problem caused by villain
        f"The real reason you can't {extract_goal(promise)}: {villain['name']}",

        # Pattern 4: Villain sabotage
        f"Why {villain['name']} won't let you {extract_goal(promise)} — and how to fight back"
    ]

    return patterns[wrapper.get('pattern_index', 0)]
```

### Type: MECHANISM

```python
def construct_mechanism_big_idea(villain, mechanism, promise, wrapper):
    """
    Construct Big Idea statement for MECHANISM type.
    """
    patterns = [
        # Pattern 1: Mechanism as solution
        f"The {mechanism} {wrapper['superiority']} to {extract_goal(promise)}",

        # Pattern 2: Mechanism uniqueness
        f"Why {mechanism} is the {wrapper['superiority']} way to finally {extract_goal(promise)}",

        # Pattern 3: Mechanism + villain defeat
        f"How the {mechanism} defeats {villain['name']} to {extract_goal(promise)}",

        # Pattern 4: Mechanism discovery
        f"The {mechanism}: The {wrapper['descriptor']} way to {extract_goal(promise)}"
    ]

    return patterns[wrapper.get('pattern_index', 0)]
```

### Type: DISCOVERY

```python
def construct_discovery_big_idea(villain, mechanism, promise, wrapper):
    """
    Construct Big Idea statement for DISCOVERY type.
    """
    patterns = [
        # Pattern 1: Researcher discovers
        f"{wrapper['authority']} discover the {wrapper['secret']} to {extract_goal(promise)}",

        # Pattern 2: Hidden truth revealed
        f"The hidden {wrapper['discovery_type']} that finally explains why you can't {extract_goal(promise)}",

        # Pattern 3: Science reveals
        f"New research reveals why {villain['name']} is the real cause of {wrapper['problem']}",

        # Pattern 4: Secret uncovered
        f"The {wrapper['descriptor']} secret to {extract_goal(promise)} — and why it's been hidden"
    ]

    return patterns[wrapper.get('pattern_index', 0)]
```

---

## HEADLINE GENERATION

Generate 10+ headlines per candidate:

```python
def generate_headlines(candidate, synthesis_context, vault_patterns):
    """
    Generate headlines for a Big Idea candidate.
    """
    headlines = []

    # Get headline patterns from vault that match this Big Idea type
    relevant_patterns = filter_vault_patterns(
        vault_patterns,
        candidate['big_idea_type']
    )

    # Generate headlines using different approaches
    headline_approaches = [
        'direct_promise',      # 2 headlines
        'curiosity_hook',      # 2 headlines
        'problem_agitation',   # 2 headlines
        'mechanism_forward',   # 2 headlines
        'villain_reveal',      # 2 headlines
        'specific_result'      # 2 headlines
    ]

    for approach in headline_approaches:
        headlines.extend(
            generate_headlines_for_approach(
                approach,
                candidate,
                synthesis_context,
                relevant_patterns
            )
        )

    return headlines[:12]  # Top 12


def generate_headlines_for_approach(approach, candidate, context, patterns):
    """
    Generate headlines for a specific approach.
    """
    headlines = []

    if approach == 'direct_promise':
        # Lead with promise
        promise = context['strategic_foundation']['promise']
        headlines.append({
            'headline': f"{promise}",
            'type': 'direct_promise',
            'vault_inspiration': find_similar_pattern(patterns, 'promise_led')
        })
        headlines.append({
            'headline': f"Finally: {promise}",
            'type': 'direct_promise_emphatic',
            'vault_inspiration': find_similar_pattern(patterns, 'promise_emphatic')
        })

    elif approach == 'villain_reveal':
        # Lead with villain
        villain = context['strategic_foundation']['villain']
        headlines.append({
            'headline': f"The {villain['name']} That's {villain['what_it_does']}",
            'type': 'villain_reveal',
            'vault_inspiration': find_similar_pattern(patterns, 'enemy_headline')
        })
        headlines.append({
            'headline': f"Why {villain['name']} Won't Let You {extract_goal(context)}",
            'type': 'villain_sabotage',
            'vault_inspiration': find_similar_pattern(patterns, 'enemy_headline')
        })

    elif approach == 'mechanism_forward':
        # Lead with mechanism
        mechanism = context['strategic_foundation']['mechanism']
        headlines.append({
            'headline': f"The {mechanism} Secret to {extract_goal(context)}",
            'type': 'mechanism_secret',
            'vault_inspiration': find_similar_pattern(patterns, 'mechanism_headline')
        })
        headlines.append({
            'headline': f"How the {mechanism} Finally Solves {extract_problem(context)}",
            'type': 'mechanism_solution',
            'vault_inspiration': find_similar_pattern(patterns, 'mechanism_headline')
        })

    elif approach == 'curiosity_hook':
        headlines.append({
            'headline': f"What If {extract_promise_question(context)}?",
            'type': 'curiosity_what_if',
            'vault_inspiration': find_similar_pattern(patterns, 'curiosity_headline')
        })
        headlines.append({
            'headline': f"The Surprising Reason {extract_failure_statement(context)}",
            'type': 'curiosity_surprising',
            'vault_inspiration': find_similar_pattern(patterns, 'curiosity_headline')
        })

    return headlines
```

---

## LEAD GENERATION

Generate 3+ full leads per candidate:

```python
def generate_leads(candidate, synthesis_context):
    """
    Generate fully-written leads for a Big Idea candidate.
    """
    leads = []

    # Lead Type 1: Problem Agitation
    leads.append(generate_problem_agitation_lead(candidate, synthesis_context))

    # Lead Type 2: Story
    leads.append(generate_story_lead(candidate, synthesis_context))

    # Lead Type 3: Revelation
    leads.append(generate_revelation_lead(candidate, synthesis_context))

    return leads


def generate_revelation_lead(candidate, context):
    """
    Generate a revelation-style lead.
    """
    villain = context['strategic_foundation']['villain']
    mechanism = context['strategic_foundation']['mechanism']
    promise = context['strategic_foundation']['promise']
    reframe_lines = context['creative_assets']['reframe_lines']

    lead = f"""
{reframe_lines['revelation']}

For years, you've been told that {context['creative_assets']['countersell_lines']['diet']}

But here's what nobody told you about your {extract_problem(context)}...

{reframe_lines['blame_shift']}

There are trillions of {villain['name']} living inside you right now. And they're {villain['what_it_does']}.

{reframe_lines['aha_moment']}

The good news? Once you understand what's really happening, the solution becomes obvious.

{context['creative_assets']['countersell_lines']['only_solution']}

In the next few minutes, I'm going to show you exactly how {mechanism} works to {promise}...
"""

    return {
        'lead_type': 'revelation',
        'full_lead': lead.strip(),
        'hook_sentence': reframe_lines['revelation'],
        'word_count': len(lead.split()),
        'elements_used': ['reframe', 'villain', 'countersell', 'mechanism_bridge']
    }
```

---

## PROOF ARCHITECTURE

```python
def design_proof_architecture(candidate, synthesis_context):
    """
    Design the proof architecture for this Big Idea.
    """
    return {
        'lead_proof': {
            'type': 'credibility_establishment',
            'elements': ['authority_proof', 'social_proof_preview']
        },
        'mechanism_proof': {
            'type': 'mechanism_validation',
            'elements': ['scientific_proof', 'expert_quotes', 'mechanism_demonstration']
        },
        'body_proof_sequence': [
            {'position': 'early_body', 'type': 'testimonial_cluster', 'count': '3-5'},
            {'position': 'mid_body', 'type': 'data_proof', 'focus': 'results'},
            {'position': 'late_body', 'type': 'comparison_proof', 'focus': 'vs_alternatives'}
        ],
        'close_proof': {
            'type': 'risk_reversal',
            'elements': ['guarantee', 'testimonial_reinforcement']
        }
    }
```

---

## OUTPUT: LAYER 2 OUTPUT

```yaml
layer_2_output:
  candidates:
    - id: "enemy_v1"
      big_idea_type: "enemy"
      big_idea_statement: "The Bad Bugs hijacking your brain's craving signals"

      components:
        root_cause_angle: "Gut microbiome imbalance causes cravings"
        mechanism_angle: "Gut Reset Protocol defeats Bad Bugs"
        promise_angle: "End uncontrollable cravings in 7 days"
        creative_wrapper: "Hijacking brain signals - sci-fi/thriller framing"

      headlines:
        - headline: "The Bad Bugs That Won't Let You Stop Eating"
          type: "villain_reveal"
          vault_inspiration: "dmhealth_prebio_001"
        - headline: "Why Your Cravings Aren't Your Fault (And How to Finally Stop Them)"
          type: "blame_shift"
          vault_inspiration: "creme_resurge_001"
        # ... 10+ headlines

      leads:
        - lead_type: "revelation"
          full_lead: "[300+ word fully-written lead...]"
          hook_sentence: "Here's what nobody told you about your cravings..."
        - lead_type: "problem_agitation"
          full_lead: "[300+ word fully-written lead...]"
          hook_sentence: "You know that feeling when you've had a long day..."
        - lead_type: "story"
          full_lead: "[300+ word fully-written lead...]"
          hook_sentence: "Sarah had tried everything..."

      proof_architecture:
        lead_proof: {type: "credibility", elements: ["UCSF study", "Dr. Maley quote"]}
        mechanism_proof: {type: "scientific", elements: ["gut-brain connection research"]}
        body_proof_sequence: [...]
        close_proof: {type: "risk_reversal", elements: ["guarantee"]}

    # ... 4+ more candidates

  generation_stats:
    candidates_generated: 5
    total_headlines: 60
    total_leads: 15
    types_covered: ["enemy", "mechanism", "discovery"]

  ready_for_validation: true
```

---

## GATE 2 CRITERIA

**PASS if:**
- 5+ candidates generated
- Each candidate has 10+ headlines
- Each candidate has 3+ fully-written leads (300+ words each)
- All candidates use upstream inputs (no fabricated elements)
- Proof architecture designed for each candidate

**PASS WITH WARNINGS if:**
- PASS criteria met
- But: Some headlines feel similar across candidates
- Or: Lead word counts at minimum threshold

**FAIL if:**
- Fewer than 5 candidates
- Any candidate with <10 headlines
- Any candidate with <3 leads
- Leads are outlines/placeholders, not fully written
- Elements invented that don't come from upstream

On FAIL: Re-execute generation with specific guidance on missing elements.
