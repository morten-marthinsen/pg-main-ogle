# Layer 2: Gap Analysis + Scoring Algorithms

**Layer:** 2
**Type:** Analysis + Computation
**Purpose:** Analyze proof gaps and compute strength scores
**Inputs:** Classified elements from Layer 1

---

## SCORING ALGORITHMS

### Element Composite Score

Each proof element has 5 dimension scores (1-10). Compute composite:

```
composite_score = (
    specificity * 0.25 +
    credibility * 0.25 +
    relevance * 0.20 +
    novelty * 0.15 +
    emotional_impact * 0.15
)
```

**Rationale:**
- Specificity and Credibility weighted highest (0.25 each) — these determine believability
- Relevance weighted 0.20 — must connect to the claim
- Novelty and Emotional Impact weighted 0.15 each — differentiation and engagement

---

### Schwartz Stage Adjustments

Adjust element scores based on market sophistication stage:

```python
def adjust_for_schwartz_stage(element, stage):
    category = element.category
    base_score = element.composite_score

    # Stage-specific multipliers
    multipliers = {
        1: {  # First in market - simple proof works
            'social': 1.1,
            'authority': 1.0,
            'demonstration': 1.2,  # Show it works
            'mechanism': 0.9,
            'data': 1.0,
            'risk_reversal': 1.0
        },
        2: {  # Second in market - bigger claims
            'social': 1.2,  # More testimonials
            'authority': 1.0,
            'demonstration': 1.1,
            'mechanism': 1.0,
            'data': 1.1,
            'risk_reversal': 1.0
        },
        3: {  # Crowded - mechanism matters most
            'social': 1.0,
            'authority': 1.1,
            'demonstration': 1.0,
            'mechanism': 1.3,  # Why it works
            'data': 1.1,
            'risk_reversal': 1.0
        },
        4: {  # Sophisticated - unique proof
            'social': 1.0,
            'authority': 1.2,  # Credibility critical
            'demonstration': 1.1,
            'mechanism': 1.2,
            'data': 1.2,
            'risk_reversal': 1.1
        },
        5: {  # Exhausted - identification
            'social': 1.3,  # Identity/belonging
            'authority': 1.0,
            'demonstration': 1.0,
            'mechanism': 1.0,
            'data': 0.9,
            'risk_reversal': 1.2
        }
    }

    multiplier = multipliers[stage][category]
    adjusted_score = base_score * multiplier

    return min(adjusted_score, 10)  # Cap at 10
```

---

### Category Strength Score

Calculate strength per category:

```python
def calculate_category_strength(elements, category):
    category_elements = [e for e in elements if e.category == category]

    if len(category_elements) == 0:
        return {
            'count': 0,
            'strength': 0,
            'quality_distribution': {'strong': 0, 'medium': 0, 'weak': 0},
            'status': 'missing'
        }

    scores = [e.stage_adjusted_score for e in category_elements]

    # Quality distribution
    strong = len([s for s in scores if s >= 7])
    medium = len([s for s in scores if 4 <= s < 7])
    weak = len([s for s in scores if s < 4])

    # Category strength = weighted average favoring strong elements
    weighted_sum = (strong * 10 + medium * 6 + weak * 2)
    weighted_count = (strong * 3 + medium * 2 + weak * 1)
    strength = weighted_sum / weighted_count if weighted_count > 0 else 0

    # Determine status
    if strong >= 3:
        status = 'robust'
    elif strong >= 1 and medium >= 2:
        status = 'adequate'
    elif len(category_elements) > 0:
        status = 'weak'
    else:
        status = 'missing'

    return {
        'count': len(category_elements),
        'strength': round(strength, 1),
        'quality_distribution': {'strong': strong, 'medium': medium, 'weak': weak},
        'status': status
    }
```

---

### Overall Strength Score (0-100)

```python
def calculate_overall_strength(category_scores, schwartz_stage):
    # Category weights by Schwartz stage
    weights = {
        1: {'social': 0.25, 'authority': 0.15, 'demonstration': 0.25, 'mechanism': 0.10, 'data': 0.15, 'risk_reversal': 0.10},
        2: {'social': 0.25, 'authority': 0.15, 'demonstration': 0.20, 'mechanism': 0.10, 'data': 0.20, 'risk_reversal': 0.10},
        3: {'social': 0.15, 'authority': 0.20, 'demonstration': 0.15, 'mechanism': 0.25, 'data': 0.15, 'risk_reversal': 0.10},
        4: {'social': 0.15, 'authority': 0.20, 'demonstration': 0.15, 'mechanism': 0.20, 'data': 0.20, 'risk_reversal': 0.10},
        5: {'social': 0.30, 'authority': 0.15, 'demonstration': 0.10, 'mechanism': 0.10, 'data': 0.10, 'risk_reversal': 0.25}
    }

    stage_weights = weights[schwartz_stage]

    weighted_sum = sum(
        category_scores[cat]['strength'] * stage_weights[cat]
        for cat in stage_weights.keys()
    )

    # Scale to 0-100
    overall = weighted_sum * 10

    # Penalty for missing categories
    missing_count = sum(1 for cat in category_scores if category_scores[cat]['status'] == 'missing')
    penalty = missing_count * 10

    final_score = max(0, overall - penalty)

    return round(final_score, 0)
```

---

## GAP ANALYSIS

### Gap Detection

```python
def analyze_gaps(category_scores, elements):
    gaps = {
        'missing_categories': [],
        'weak_categories': [],
        'under_represented': [],
        'claim_gaps': []
    }

    # Missing: 0 elements
    for cat, scores in category_scores.items():
        if scores['count'] == 0:
            gaps['missing_categories'].append(cat)

    # Weak: All elements score < 4
    for cat, scores in category_scores.items():
        if scores['count'] > 0 and scores['quality_distribution']['strong'] == 0 and scores['quality_distribution']['medium'] == 0:
            gaps['weak_categories'].append(cat)

    # Under-represented: < 3 elements
    for cat, scores in category_scores.items():
        if 0 < scores['count'] < 3:
            gaps['under_represented'].append(cat)

    return gaps
```

### Gap Severity Scoring

```python
def score_gap_severity(gap, schwartz_stage):
    """
    Score how critical a gap is (0-10)
    Higher = more urgent to fill
    """
    category = gap['category']

    # Base severity by category (how important is having this proof?)
    base_severity = {
        'social': 7,       # Almost always important
        'authority': 6,    # Important for credibility
        'demonstration': 7, # "Show don't tell"
        'mechanism': 5,    # Critical at Stage 3+
        'data': 5,         # Supporting role usually
        'risk_reversal': 4 # Can write without proof
    }

    severity = base_severity[category]

    # Stage adjustments (same multipliers as scoring)
    stage_multipliers = {
        1: {'social': 1.0, 'authority': 0.8, 'demonstration': 1.2, 'mechanism': 0.7, 'data': 0.9, 'risk_reversal': 0.8},
        2: {'social': 1.1, 'authority': 0.9, 'demonstration': 1.1, 'mechanism': 0.8, 'data': 1.0, 'risk_reversal': 0.9},
        3: {'social': 0.9, 'authority': 1.1, 'demonstration': 0.9, 'mechanism': 1.4, 'data': 1.0, 'risk_reversal': 0.9},
        4: {'social': 0.9, 'authority': 1.2, 'demonstration': 1.0, 'mechanism': 1.3, 'data': 1.1, 'risk_reversal': 1.0},
        5: {'social': 1.3, 'authority': 0.9, 'demonstration': 0.8, 'mechanism': 0.8, 'data': 0.8, 'risk_reversal': 1.2}
    }

    adjusted_severity = severity * stage_multipliers[schwartz_stage][category]

    # Cap at 10
    return min(round(adjusted_severity, 1), 10)
```

---

## PROMISE CEILING CALCULATION

Determine maximum credible claim based on proof strength:

```python
def calculate_promise_ceiling(category_scores, overall_strength):
    """
    Returns the maximum promise level that proof can support.

    Promise levels:
    - 'transformation': Complete life change (requires 80+ strength)
    - 'significant_improvement': Major measurable improvement (60-79)
    - 'noticeable_improvement': Clear but modest improvement (40-59)
    - 'some_benefit': Mild benefit claims only (20-39)
    - 'minimal': Can barely claim anything (<20)
    """

    if overall_strength >= 80:
        return {
            'level': 'transformation',
            'description': 'Proof supports bold transformation claims',
            'examples': ['Complete life change', 'Total freedom from problem', 'Dramatic before/after']
        }
    elif overall_strength >= 60:
        return {
            'level': 'significant_improvement',
            'description': 'Proof supports strong improvement claims',
            'examples': ['Major measurable improvement', 'Significant results', 'Real change']
        }
    elif overall_strength >= 40:
        return {
            'level': 'noticeable_improvement',
            'description': 'Proof supports moderate claims',
            'examples': ['Noticeable improvement', 'Meaningful difference', 'Real benefits']
        }
    elif overall_strength >= 20:
        return {
            'level': 'some_benefit',
            'description': 'Proof supports only mild claims',
            'examples': ['May help with', 'Could support', 'Some users report']
        }
    else:
        return {
            'level': 'minimal',
            'description': 'Proof is too weak for strong claims',
            'examples': ['Consider building proof before making claims']
        }
```

---

## OUTPUT FORMAT

```yaml
gap_analysis_output:
  category_scores:
    social:
      count: 18
      strength: 7.2
      status: "robust"
      quality_distribution: {strong: 5, medium: 8, weak: 5}
    authority:
      count: 12
      strength: 6.1
      status: "adequate"
      quality_distribution: {strong: 3, medium: 6, weak: 3}
    demonstration:
      count: 6
      strength: 5.4
      status: "adequate"
      quality_distribution: {strong: 1, medium: 4, weak: 1}
    mechanism:
      count: 0
      strength: 0
      status: "missing"
      quality_distribution: {strong: 0, medium: 0, weak: 0}
    data:
      count: 5
      strength: 4.8
      status: "weak"
      quality_distribution: {strong: 0, medium: 3, weak: 2}
    risk_reversal:
      count: 2
      strength: 6.5
      status: "adequate"
      quality_distribution: {strong: 1, medium: 1, weak: 0}

  overall_strength_score: 52

  gaps:
    missing_categories: ["mechanism"]
    weak_categories: ["data"]
    under_represented: ["risk_reversal"]

  gap_priorities:
    - category: "mechanism"
      severity: 8.4
      reason: "Stage 3 market requires mechanism proof"
    - category: "data"
      severity: 5.2
      reason: "Current data proof is weak quality"

  promise_ceiling:
    level: "noticeable_improvement"
    description: "Proof supports moderate claims"
    constraint: "Cannot make transformation claims without MECHANISM proof"

  recommendations:
    discovery: ["Search for mechanism studies", "Find ingredient research"]
    generation: ["Create mechanism demonstration", "Collect specific result testimonials"]
```

---

## HANDOFF TO LAYER 3

Pass to Layer 3 (Generation Recommendations) if gaps exist:

1. **Gap priorities** — Ordered by severity
2. **Promise ceiling** — What we can currently claim
3. **Category deficiencies** — What's missing or weak
4. **Stage context** — Schwartz stage for targeting recommendations

Or pass to Layer 4 (Ranking) if no Discovery/Generation needed.
