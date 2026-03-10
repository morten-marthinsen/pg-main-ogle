# Layer 3: Validation + Scoring

**Layer:** 3
**Type:** Quality Assurance + Ranking
**Purpose:** Validate Big Idea candidates, score on multiple dimensions, rank for selection
**Inputs:** Candidates from Layer 2
**Outputs:** Validated, scored, ranked candidates

---

## VALIDATION CHECKS

### Check 1: Campaign Coherence

```python
def validate_campaign_coherence(candidate, upstream_inputs):
    """
    Verify the Big Idea maintains coherence with upstream elements.
    """
    checks = {
        'villain_present': False,
        'mechanism_present': False,
        'promise_aligned': False,
        'thesis_consistent': False
    }

    big_idea = candidate['big_idea_statement'].lower()
    components = candidate['components']

    # Check villain presence
    villain_name = upstream_inputs['root_cause']['villain']['name'].lower()
    if villain_name in big_idea or villain_name in components['root_cause_angle'].lower():
        checks['villain_present'] = True

    # Check mechanism presence
    mechanism_name = upstream_inputs['mechanism']['mechanism_name'].lower()
    if mechanism_name in big_idea or mechanism_name in components['mechanism_angle'].lower():
        checks['mechanism_present'] = True

    # Check promise alignment
    promise_core = extract_core_promise(upstream_inputs['promise']['primary_promise']['statement'])
    if promise_core.lower() in components['promise_angle'].lower():
        checks['promise_aligned'] = True

    # Check thesis consistency
    thesis = upstream_inputs['promise']['campaign_thesis']
    if maintains_thesis_direction(candidate, thesis):
        checks['thesis_consistent'] = True

    return {
        'checks': checks,
        'pass': all(checks.values()),
        'missing': [k for k, v in checks.items() if not v]
    }
```

### Check 2: Headline Quality

```python
def validate_headlines(candidate):
    """
    Validate headline quality and completeness.
    """
    headlines = candidate['headlines']
    issues = []

    # Check count
    if len(headlines) < 10:
        issues.append(f"Only {len(headlines)} headlines, need 10+")

    # Check variety
    types_used = set(h['type'] for h in headlines)
    if len(types_used) < 4:
        issues.append(f"Only {len(types_used)} headline types, need 4+")

    # Check for placeholders
    for h in headlines:
        if '[' in h['headline'] or ']' in h['headline']:
            issues.append(f"Placeholder brackets in headline: {h['headline'][:50]}")
        if len(h['headline']) < 20:
            issues.append(f"Headline too short: {h['headline']}")

    # Check vault traceability
    untraced = [h for h in headlines if not h.get('vault_inspiration')]
    if len(untraced) > len(headlines) * 0.3:
        issues.append(f"{len(untraced)} headlines missing vault inspiration")

    return {
        'headline_count': len(headlines),
        'type_variety': len(types_used),
        'issues': issues,
        'pass': len(issues) == 0
    }
```

### Check 3: Lead Quality

```python
def validate_leads(candidate):
    """
    Validate leads are fully written and complete.
    """
    leads = candidate['leads']
    issues = []

    # Check count
    if len(leads) < 3:
        issues.append(f"Only {len(leads)} leads, need 3+")

    # Check each lead
    for lead in leads:
        text = lead.get('full_lead', '')

        # Check length
        word_count = len(text.split())
        if word_count < 200:
            issues.append(f"{lead['lead_type']} lead only {word_count} words, need 200+")

        # Check for placeholders
        if '[' in text and ']' in text:
            issues.append(f"{lead['lead_type']} lead contains placeholder brackets")

        # Check for incomplete sentences
        if text.strip().endswith('...') and '...' == text.strip()[-3:]:
            # Trailing ellipsis that looks incomplete
            if not is_intentional_open_loop(text):
                issues.append(f"{lead['lead_type']} lead appears incomplete")

        # Check hook sentence
        if not lead.get('hook_sentence'):
            issues.append(f"{lead['lead_type']} lead missing hook sentence")

    # Check variety
    types_used = set(l['lead_type'] for l in leads)
    if len(types_used) < 2:
        issues.append("Insufficient lead type variety")

    return {
        'lead_count': len(leads),
        'type_variety': len(types_used),
        'issues': issues,
        'pass': len(issues) == 0
    }
```

### Check 4: Anti-Slop Validation

```python
def validate_anti_slop(candidate):
    """
    Check for AI-generated telltale patterns.
    """
    slop_patterns = {
        'filler_phrases': [
            'simply put', 'in other words', 'basically',
            'at the end of the day', 'needless to say'
        ],
        'hype_words': [
            'revolutionary', 'groundbreaking', 'game-changing',
            'life-changing', 'incredible', 'amazing'
        ],
        'vague_qualifiers': [
            'many', 'most', 'some', 'several', 'various',
            'numerous', 'countless', 'a lot of'
        ],
        'ai_tells': [
            'cutting-edge', 'state-of-the-art', 'next-generation',
            'holistic approach', 'comprehensive solution',
            'seamlessly', 'effortlessly', 'unlock your'
        ]
    }

    # Collect all text to check
    all_text = (
        candidate['big_idea_statement'] + ' ' +
        ' '.join(h['headline'] for h in candidate['headlines']) + ' ' +
        ' '.join(l['full_lead'] for l in candidate['leads'])
    ).lower()

    slop_found = []

    for category, patterns in slop_patterns.items():
        for pattern in patterns:
            if pattern.lower() in all_text:
                slop_found.append({
                    'category': category,
                    'pattern': pattern
                })

    return {
        'slop_count': len(slop_found),
        'slop_instances': slop_found,
        'pass': len(slop_found) == 0
    }
```

---

## SCORING DIMENSIONS

### Dimension 1: Novelty (1-10)

```python
def score_novelty(candidate, market_context):
    """
    How fresh is this Big Idea vs. the market?
    """
    score = 10  # Start at max

    saturated = market_context['competitive_landscape']['saturated_big_ideas']

    # Penalty for saturated type
    if candidate['big_idea_type'] in get_saturated_types(saturated):
        score -= 2

    # Penalty for similar concepts
    for saturated_concept in saturated:
        similarity = calculate_similarity(
            candidate['big_idea_statement'],
            saturated_concept
        )
        if similarity > 0.7:
            score -= 3
        elif similarity > 0.5:
            score -= 1

    # Bonus for whitespace
    whitespace = market_context['competitive_landscape']['whitespace_opportunities']
    if candidate['big_idea_type'] in whitespace:
        score += 1

    # Bonus for creative wrapper originality
    if is_original_wrapper(candidate['components']['creative_wrapper']):
        score += 1

    return max(1, min(10, score))
```

### Dimension 2: Coherence (1-10)

```python
def score_coherence(candidate, upstream_inputs):
    """
    How well do all components fit together?
    """
    coherence_checks = validate_campaign_coherence(candidate, upstream_inputs)

    # Base score from checks
    checks_passed = sum(coherence_checks['checks'].values())
    base_score = (checks_passed / 4) * 10

    # Flow check: Does the Big Idea naturally lead from root cause to promise?
    flow_score = assess_logical_flow(candidate, upstream_inputs)

    # Unity check: Does the creative wrapper enhance or confuse?
    unity_score = assess_creative_unity(candidate)

    composite = (base_score * 0.5) + (flow_score * 0.3) + (unity_score * 0.2)

    return round(composite, 1)
```

### Dimension 3: Emotional Impact (1-10)

```python
def score_emotional_impact(candidate, market_psychology):
    """
    How emotionally compelling is this Big Idea?
    """
    score = 5  # Base

    # Check for emotional resonance in headlines
    emotional_headlines = count_emotional_headlines(candidate['headlines'])
    score += min(2, emotional_headlines / 3)

    # Check for emotional hooks in leads
    for lead in candidate['leads']:
        if has_emotional_hook(lead['hook_sentence']):
            score += 0.5

    # Check alignment with dominant market emotion
    dominant_emotion = market_psychology.get('dominant_emotion', 'frustration')
    if targets_emotion(candidate['big_idea_statement'], dominant_emotion):
        score += 1

    # Villain emotional impact
    if has_strong_villain_emotion(candidate):
        score += 1

    return min(10, round(score, 1))
```

### Dimension 4: Differentiation (1-10)

```python
def score_differentiation(candidate, market_context, upstream_inputs):
    """
    How differentiated is this from competitors?
    """
    score = 5  # Base

    # Mechanism differentiation
    mech_score = upstream_inputs['mechanism']['scorecard'].get('differentiation', 5)
    score += (mech_score - 5) * 0.5  # Adjust based on mechanism

    # Villain uniqueness
    villain = upstream_inputs['root_cause']['villain']
    if is_unique_villain(villain, market_context):
        score += 2

    # Big Idea statement uniqueness
    if not resembles_competitors(candidate['big_idea_statement'], market_context):
        score += 2

    # Creative wrapper differentiation
    if original_creative_wrapper(candidate['components']['creative_wrapper']):
        score += 1

    return min(10, round(score, 1))
```

---

## COMPOSITE SCORING

```python
def calculate_composite_score(candidate, scores, validations):
    """
    Calculate overall candidate score.
    """
    # Dimension weights
    weights = {
        'novelty': 0.20,
        'coherence': 0.30,  # Most important
        'emotional_impact': 0.25,
        'differentiation': 0.25
    }

    # Calculate weighted composite
    composite = sum(scores[dim] * weights[dim] for dim in weights)

    # Apply validation penalties
    if not validations['coherence']['pass']:
        composite *= 0.7  # Heavy penalty
    if not validations['headlines']['pass']:
        composite *= 0.9
    if not validations['leads']['pass']:
        composite *= 0.9
    if not validations['anti_slop']['pass']:
        composite *= 0.85

    return round(composite, 2)
```

---

## CANDIDATE RANKING

```python
def rank_candidates(candidates):
    """
    Rank candidates by composite score and select top performers.
    """
    # Sort by composite score
    ranked = sorted(
        candidates,
        key=lambda c: c['scores']['composite'],
        reverse=True
    )

    # Assign rankings
    for i, candidate in enumerate(ranked):
        candidate['rank'] = i + 1
        candidate['recommendation'] = get_recommendation(i, candidate)

    return {
        'ranked_candidates': ranked,
        'top_candidate': ranked[0] if ranked else None,
        'runner_up': ranked[1] if len(ranked) > 1 else None,
        'viable_count': len([c for c in ranked if c['scores']['composite'] >= 7.0])
    }


def get_recommendation(rank, candidate):
    """
    Generate recommendation based on rank and scores.
    """
    composite = candidate['scores']['composite']

    if rank == 0 and composite >= 8.0:
        return "RECOMMENDED: Strong lead candidate"
    elif rank == 0:
        return "TOP CANDIDATE: Lead option but room for improvement"
    elif rank == 1 and composite >= 7.5:
        return "STRONG BACKUP: Viable alternative"
    elif composite >= 7.0:
        return "VIABLE: Consider for testing"
    else:
        return "WEAK: Needs revision or elimination"
```

---

## OUTPUT: LAYER 3 OUTPUT

```yaml
layer_3_output:
  validation_results:
    - candidate_id: "enemy_v1"
      coherence:
        pass: true
        checks: {villain_present: true, mechanism_present: true, promise_aligned: true, thesis_consistent: true}
      headlines:
        pass: true
        headline_count: 12
        type_variety: 5
      leads:
        pass: true
        lead_count: 3
        average_word_count: 340
      anti_slop:
        pass: true
        slop_count: 0
      overall_pass: true

  scored_candidates:
    - candidate_id: "enemy_v1"
      scores:
        novelty: 8.0
        coherence: 9.2
        emotional_impact: 8.5
        differentiation: 7.8
        composite: 8.41
      rank: 1
      recommendation: "RECOMMENDED: Strong lead candidate"

    - candidate_id: "mechanism_v1"
      scores:
        novelty: 6.5
        coherence: 8.8
        emotional_impact: 7.5
        differentiation: 7.0
        composite: 7.42
      rank: 2
      recommendation: "STRONG BACKUP: Viable alternative"

  ranking_summary:
    top_candidate: "enemy_v1"
    top_score: 8.41
    viable_candidates: 4
    eliminated_candidates: 1

  ready_for_packaging: true
```

---

## GATE 3 CRITERIA

**PASS if:**
- At least 3 candidates pass all validation checks
- Top candidate scores ≥7.5 composite
- No anti-slop failures in top 3 candidates
- All candidates have complete headlines and leads

**PASS WITH WARNINGS if:**
- PASS criteria met
- But: Top candidate 7.5-8.0 OR only 3 viable candidates

**FAIL if:**
- Fewer than 3 candidates pass validation
- Top candidate <7.5
- Anti-slop failures in top candidates
- Critical coherence failures

On FAIL: Return to Layer 2 for regeneration with specific guidance.
