# Layer 1: Big Idea Type Strategy + Selection

**Layer:** 1
**Type:** Analysis + Strategy
**Purpose:** Select optimal Big Idea types based on vault patterns and market positioning
**Inputs:** Synthesis context from Layer 0, Vault pattern data
**Outputs:** Selected Big Idea types with strategic rationale

---

## THE SIX BIG IDEA TYPES

### Type 1: MECHANISM
**Pattern:** "The [mechanism] way to [promise]"
**Core:** The HOW is the star of the show

**Best when:**
- Mechanism has high differentiation score (8+)
- Schwartz Stage 3-4
- Market saturated with similar promises
- Mechanism name is memorable/visual

**Example:** "The Gut Reset Protocol that ends cravings at the source"

---

### Type 2: ENEMY
**Pattern:** "The real reason you can't [goal] is [villain]"
**Core:** A villain is sabotaging the prospect

**Best when:**
- Strong villain from root cause (named, tangible)
- High frustration in market psychology
- Blame shift is compelling
- Villain has "aha" revelation quality

**Example:** "The Bad Bugs hijacking your brain's craving signals"

---

### Type 3: DISCOVERY
**Pattern:** "[Authority] discovers the [secret] to [promise]"
**Core:** Something new was found/revealed

**Best when:**
- Strong authority proof available
- Mechanism has an origin story
- Market ready for "new" (not exhausted)
- Scientific backing strong

**Example:** "UCSF researchers discover the hidden cause of uncontrollable cravings"

---

### Type 4: TRANSFORMATION
**Pattern:** "How [person] went from [now] to [after]"
**Core:** A dramatic before/after journey

**Best when:**
- Strong testimonial proof
- Relatable avatar available
- Promise is tangible/visual
- Story elements compelling

**Example:** "How a 52-year-old mom finally broke free from her nightly sugar binges"

---

### Type 5: PROPHECY
**Pattern:** "The coming [event] that will [consequence]"
**Core:** A prediction about the future

**Best when:**
- Urgency angle works for market
- Trend-based mechanism
- External factors support timing
- Fear motivation appropriate

**Example:** "Why your cravings will only get worse — unless you address this hidden trigger"

---

### Type 6: IDENTITY
**Pattern:** "For [specific identity] who [specific struggle]"
**Core:** You belong to a special group

**Best when:**
- Schwartz Stage 5 (exhausted market)
- Strong tribal element possible
- Niche identity clear
- Promise needs soft entry

**Example:** "For anyone who's ever felt controlled by food — not because you lack willpower"

---

## TYPE SELECTION ALGORITHM

```python
def select_big_idea_types(synthesis_context, vault_analysis):
    """
    Select 2-3 Big Idea types to develop based on strategic fit.
    """
    scores = {}

    # Score each type based on context fit
    for big_idea_type in ['mechanism', 'enemy', 'discovery', 'transformation', 'prophecy', 'identity']:
        scores[big_idea_type] = calculate_type_fit(
            big_idea_type,
            synthesis_context,
            vault_analysis
        )

    # Apply Schwartz stage weighting
    schwartz_stage = synthesis_context['positioning_constraints']['schwartz_stage']
    scores = apply_schwartz_weighting(scores, schwartz_stage)

    # Apply saturation penalty
    saturated = synthesis_context['positioning_constraints']['saturated_concepts']
    scores = apply_saturation_penalty(scores, saturated, vault_analysis)

    # Apply whitespace bonus
    whitespace = synthesis_context['positioning_constraints']['whitespace']
    scores = apply_whitespace_bonus(scores, whitespace)

    # Select top 2-3 types
    ranked = sorted(scores.items(), key=lambda x: x[1], reverse=True)

    selected = []
    for type_name, score in ranked[:3]:
        if score >= 6.0:  # Minimum viability threshold
            selected.append({
                'type': type_name,
                'fit_score': score,
                'rationale': generate_selection_rationale(
                    type_name, score, synthesis_context
                )
            })

    return selected


def calculate_type_fit(big_idea_type, context, vault):
    """
    Calculate how well this Big Idea type fits the strategic context.
    """
    fit_scores = {
        'mechanism': calculate_mechanism_fit(context),
        'enemy': calculate_enemy_fit(context),
        'discovery': calculate_discovery_fit(context),
        'transformation': calculate_transformation_fit(context),
        'prophecy': calculate_prophecy_fit(context),
        'identity': calculate_identity_fit(context)
    }

    return fit_scores.get(big_idea_type, 5.0)


def calculate_mechanism_fit(context):
    """Score fit for MECHANISM Big Idea type."""
    score = 5.0  # Base

    # Mechanism differentiation bonus
    mech_score = context['quality_baselines']['mechanism_score']
    if mech_score >= 8.5:
        score += 2.0
    elif mech_score >= 7.5:
        score += 1.0

    # Schwartz stage alignment
    stage = context['positioning_constraints']['schwartz_stage']
    if stage in [3, 4]:
        score += 2.0
    elif stage == 2:
        score += 1.0

    # Mechanism name quality
    mech_name = context['strategic_foundation']['mechanism']
    if is_memorable_name(mech_name):
        score += 1.0

    return min(10, score)


def calculate_enemy_fit(context):
    """Score fit for ENEMY Big Idea type."""
    score = 5.0  # Base

    # Villain quality
    villain = context['strategic_foundation']['villain']
    if villain.get('name') and villain.get('what_it_does'):
        score += 2.0
    if is_tangible_villain(villain):
        score += 1.0

    # Root cause score bonus
    rc_score = context['quality_baselines']['root_cause_score']
    if rc_score >= 8.0:
        score += 1.5

    # Market frustration bonus
    # (would check market psychology if available)
    score += 1.0  # Assume moderate frustration

    return min(10, score)


def calculate_identity_fit(context):
    """Score fit for IDENTITY Big Idea type."""
    score = 5.0  # Base

    # Stage 5 alignment (identity works best in exhausted markets)
    stage = context['positioning_constraints']['schwartz_stage']
    if stage == 5:
        score += 3.0
    elif stage == 4:
        score += 1.0
    elif stage <= 2:
        score -= 2.0  # Identity less effective in early markets

    # Blame shift quality (identity appeals need strong exoneration)
    if 'not your fault' in str(context.get('creative_assets', {})).lower():
        score += 1.0

    return min(10, score)
```

---

## SCHWARTZ STAGE WEIGHTING

```yaml
schwartz_stage_weights:
  stage_1:
    mechanism: 0.7
    enemy: 0.8
    discovery: 0.9
    transformation: 1.0  # Highest - simple proof works
    prophecy: 0.8
    identity: 0.5

  stage_2:
    mechanism: 0.8
    enemy: 0.9
    discovery: 1.0  # Highest - "new" still works
    transformation: 0.9
    prophecy: 0.9
    identity: 0.6

  stage_3:
    mechanism: 1.0  # Highest - mechanism differentiation needed
    enemy: 0.9
    discovery: 0.8
    transformation: 0.7
    prophecy: 0.8
    identity: 0.7

  stage_4:
    mechanism: 1.0  # Still high
    enemy: 1.0     # Also high - unique angle needed
    discovery: 0.7
    transformation: 0.6
    prophecy: 0.9
    identity: 0.8

  stage_5:
    mechanism: 0.6
    enemy: 0.7
    discovery: 0.5
    transformation: 0.7
    prophecy: 0.6
    identity: 1.0  # Highest - exhausted markets need identity
```

---

## SATURATION ANALYSIS

```python
def analyze_saturation(vault_analysis, synthesis_context):
    """
    Identify saturated vs. whitespace Big Idea types in this market.
    """
    niche = synthesis_context.get('niche', 'health')

    # Count Big Idea types in vault for this niche
    type_counts = count_big_idea_types(vault_analysis, niche)

    # Calculate saturation levels
    total_swipes = sum(type_counts.values())
    saturation = {}

    for type_name, count in type_counts.items():
        percentage = (count / total_swipes) * 100 if total_swipes > 0 else 0

        if percentage >= 30:
            saturation[type_name] = 'oversaturated'
        elif percentage >= 20:
            saturation[type_name] = 'saturated'
        elif percentage >= 10:
            saturation[type_name] = 'moderate'
        elif percentage >= 5:
            saturation[type_name] = 'underutilized'
        else:
            saturation[type_name] = 'whitespace'

    return {
        'counts': type_counts,
        'saturation_levels': saturation,
        'whitespace_opportunities': [t for t, s in saturation.items() if s == 'whitespace'],
        'avoid': [t for t, s in saturation.items() if s == 'oversaturated']
    }
```

---

## OUTPUT: LAYER 1 OUTPUT

```yaml
layer_1_output:
  selected_types:
    - type: "enemy"
      fit_score: 8.5
      rationale: "Strong villain (Bad Bugs), high root cause score, moderate market frustration"
      strategy: "Lead with villain reveal, mechanism defeats villain"

    - type: "mechanism"
      fit_score: 8.2
      rationale: "High mechanism differentiation, Stage 3 market, memorable name"
      strategy: "Lead with mechanism uniqueness, promise follows"

    - type: "discovery"
      fit_score: 7.1
      rationale: "Good authority proof, origin story available"
      strategy: "Lead with researcher/study, mechanism as discovery"

  saturation_analysis:
    type_distribution:
      mechanism: 28%
      enemy: 18%
      discovery: 22%
      transformation: 20%
      prophecy: 7%
      identity: 5%
    saturation_levels:
      mechanism: "saturated"
      enemy: "moderate"
      discovery: "saturated"
      transformation: "moderate"
      prophecy: "underutilized"
      identity: "whitespace"
    recommendation: "Prioritize ENEMY and consider IDENTITY angle"

  type_strategies:
    enemy:
      primary_angle: "Villain revelation + defeat mechanism"
      headline_direction: "The hidden saboteur behind your cravings"
      lead_direction: "Problem agitation → villain reveal → mechanism solution"

    mechanism:
      primary_angle: "Unique mechanism solves what others can't"
      headline_direction: "The only protocol that targets the real cause"
      lead_direction: "Countersell failures → mechanism introduction → promise"

    discovery:
      primary_angle: "Scientists found the real cause"
      headline_direction: "UCSF researchers discover..."
      lead_direction: "Authority credentialing → discovery narrative → mechanism"

  ready_for_layer_2: true
```

---

## GATE 1 CRITERIA

**PASS if:**
- At least 2 Big Idea types selected with fit score ≥ 6.0
- Saturation analysis complete
- Strategy defined for each selected type
- No selected type is "oversaturated"

**PASS WITH WARNINGS if:**
- PASS criteria met
- But: Only 2 types viable OR one type is "saturated"

**FAIL if:**
- Fewer than 2 types with fit score ≥ 6.0
- All high-fit types are oversaturated
- Cannot define strategy for selected types

On FAIL: Return to Layer 0 to verify synthesis context, or escalate to upstream skills if strategic foundation is weak.
