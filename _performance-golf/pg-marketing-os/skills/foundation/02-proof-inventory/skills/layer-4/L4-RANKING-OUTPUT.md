# Layer 4: Ranking + Output

**Layer:** 4
**Type:** Prioritization + Packaging
**Purpose:** Rank proof for copy positioning and package for downstream skills
**Inputs:** Complete inventory with scores from Layer 2, discoveries from Layer 3

---

## RANKING ALGORITHMS

### Knockout Proof Selection

Identify the single most powerful proof element:

```python
def select_knockout_proof(elements, schwartz_stage, mechanism):
    """
    Find the one proof element that could single-handedly sell the product.
    """

    # Score all elements for "knockout potential"
    knockout_scores = []

    for element in elements:
        score = element.stage_adjusted_score

        # Bonus for high emotional impact
        if element.scores.emotional_impact >= 8:
            score *= 1.2

        # Bonus for specificity
        if element.scores.specificity >= 8:
            score *= 1.15

        # Bonus for proving mechanism (at Stage 3+)
        if schwartz_stage >= 3 and element.category == 'mechanism':
            score *= 1.25

        # Bonus for transformation testimonials
        if element.sub_type == 'testimonial_transformation':
            score *= 1.2

        knockout_scores.append({
            'element': element,
            'knockout_score': score
        })

    # Sort by knockout score
    knockout_scores.sort(key=lambda x: x['knockout_score'], reverse=True)

    winner = knockout_scores[0]

    return {
        'element': winner['element'],
        'knockout_score': winner['knockout_score'],
        'rationale': generate_knockout_rationale(winner['element'], schwartz_stage)
    }
```

---

### Proof by Copy Position

Map proof to where it belongs in copy:

```python
def rank_by_position(elements, schwartz_stage, lead_type, copy_format):
    """
    Recommend top proof for each copy section.
    """

    positions = {
        'lead': [],       # Opening/hook
        'mechanism': [],  # Mechanism explanation section
        'body': [],       # General body proof
        'close': []       # Final push before CTA
    }

    for element in elements:
        best_position = determine_best_position(element, schwartz_stage, lead_type)
        positions[best_position].append(element)

    # Sort each position by stage-adjusted score
    for position in positions:
        positions[position].sort(
            key=lambda e: e.stage_adjusted_score,
            reverse=True
        )
        # Keep top 3-5 for each position
        positions[position] = positions[position][:5]

    return positions


def determine_best_position(element, schwartz_stage, lead_type):
    """
    Determine where a proof element fits best in copy.
    """

    # Lead position preferences
    lead_preferences = {
        'testimonial_transformation': 'lead',  # Story leads
        'testimonial_specific_result': 'lead',
        'data_exact_statistic': 'lead',        # Shocking stat leads
        'demo_before_after_photo': 'lead',     # Visual proof leads
    }

    # Mechanism position preferences
    mechanism_preferences = {
        'mechanism_study': 'mechanism',
        'mechanism_scientific_principle': 'mechanism',
        'mechanism_expert_explanation': 'mechanism',
        'study_peer_reviewed': 'mechanism',
        'study_clinical_trial': 'mechanism',
    }

    # Close position preferences
    close_preferences = {
        'guarantee_double': 'close',
        'guarantee_unconditional': 'close',
        'trial_free': 'close',
        'testimonial_transformation': 'close',  # Also good for close
        'data_success_rate': 'close',
    }

    sub_type = element.sub_type

    if sub_type in lead_preferences:
        return lead_preferences[sub_type]
    elif sub_type in mechanism_preferences:
        return mechanism_preferences[sub_type]
    elif sub_type in close_preferences:
        return close_preferences[sub_type]
    else:
        return 'body'  # Default to body
```

---

### Proof by Objection

Map proof to specific objections:

```python
def rank_by_objection(elements, objections):
    """
    Match proof elements to objections they can overcome.
    """

    objection_mapping = {}

    # Common objection → proof category matches
    objection_category_map = {
        'does_it_work': ['demonstration', 'social', 'data'],
        'why_does_it_work': ['mechanism', 'authority'],
        'is_it_safe': ['authority', 'data', 'social'],
        'is_it_right_for_me': ['social', 'demonstration'],
        'can_i_trust_them': ['authority', 'risk_reversal'],
        'is_it_worth_the_money': ['data', 'social', 'risk_reversal'],
        'what_if_it_doesnt_work': ['risk_reversal', 'social'],
    }

    for objection in objections:
        # Normalize objection to match map
        objection_key = normalize_objection(objection)

        if objection_key in objection_category_map:
            preferred_categories = objection_category_map[objection_key]

            # Filter elements to preferred categories
            relevant_elements = [
                e for e in elements
                if e.category in preferred_categories
            ]

            # Sort by stage-adjusted score
            relevant_elements.sort(
                key=lambda e: e.stage_adjusted_score,
                reverse=True
            )

            objection_mapping[objection] = {
                'elements': relevant_elements[:3],
                'recommended_sequence': build_objection_sequence(relevant_elements[:3])
            }

    return objection_mapping
```

---

### Gradualization Sequence

Build "stream of acceptances" proof sequence:

```python
def build_proof_sequence(elements, schwartz_stage):
    """
    Order proof for gradualization — easy accepts first, strong claims last.
    """

    # Sort by believability (credibility + how "safe" the claim is)
    def believability_score(e):
        # Higher credibility = more believable
        base = e.scores.credibility

        # Lower emotional impact = "safer" claim
        if e.scores.emotional_impact <= 5:
            base += 2

        # Data tends to be "safer" than testimonials
        if e.category == 'data':
            base += 1

        # Authority is inherently more believable
        if e.category == 'authority':
            base += 2

        return base

    # Sort: most believable first (build trust), most impactful last (payoff)
    sorted_for_graduation = sorted(elements, key=believability_score, reverse=True)

    # Identify "payoff" elements (high impact)
    payoff_elements = [e for e in elements if e.scores.emotional_impact >= 8]

    # Remove payoff elements from middle, add to end
    sequence = [e for e in sorted_for_graduation if e not in payoff_elements]
    sequence.extend(payoff_elements)

    return sequence
```

---

## OUTPUT PACKAGING

### For 04-Promise Skill

```yaml
proof_to_promise:
  promise_ceiling:
    level: "noticeable_improvement"
    constraints:
      - "Cannot claim transformation without MECHANISM proof"
      - "Cannot claim specific timeframes without DATA support"

  believability_markers:
    strongest_categories: ["social", "authority"]
    weakest_categories: ["mechanism", "data"]

  specific_proof_for_promise:
    - proof_id: "PROOF-007"
      supports_claim: "Weight loss results"
      specific_proof: "Average of 12 lbs in first month (n=347)"

  recommended_promise_language:
    supported: ["noticeable improvement", "real results", "proven approach"]
    unsupported: ["guaranteed transformation", "revolutionary", "miracle"]
```

---

### For 05-Big-Ideas Skill

```yaml
proof_to_big_idea:
  overall_strength_score: 64

  knockout_proof:
    element_id: "PROOF-023"
    raw_text: "Lost 47 pounds and kept it off for 3 years"
    category: "social"
    knockout_potential: 9.2

  proof_themes:
    # Clusters of proof that tell a story
    - theme: "Real people, real results"
      supporting_proof: ["PROOF-001", "PROOF-007", "PROOF-012"]
    - theme: "Backed by science"
      supporting_proof: ["PROOF-018", "PROOF-024"]

  big_idea_constraints:
    - "Big Idea must be provable with available proof"
    - "Mechanism claims require building additional proof"
```

---

### For 11-Proof-Demonstration Skill (Tactical)

```yaml
proof_to_copy:
  by_position:
    lead:
      recommended: ["PROOF-023", "PROOF-007"]
      rationale: "Transformation testimonial + specific stat for hook"

    mechanism:
      recommended: ["PROOF-018", "PROOF-024"]
      rationale: "Study citations for mechanism credibility"

    body:
      recommended: ["PROOF-001", "PROOF-012", "PROOF-015"]
      rationale: "Supporting testimonials for proof stack"

    close:
      recommended: ["PROOF-031", "PROOF-023"]
      rationale: "Guarantee + transformation testimonial for final push"

  by_objection:
    "Does it really work?":
      sequence: ["PROOF-007", "PROOF-012", "PROOF-023"]
      rationale: "Data → testimonials → transformation story"

    "Is it safe?":
      sequence: ["PROOF-018", "PROOF-024"]
      rationale: "Studies proving safety and efficacy"

  gradualization_sequence:
    # Full ordered list for copy development
    sequence: [
      {position: 1, proof_id: "PROOF-007", rationale: "Safe data claim to build trust"},
      {position: 2, proof_id: "PROOF-018", rationale: "Authority backing"},
      {position: 3, proof_id: "PROOF-001", rationale: "First testimonial"},
      # ...continues...
      {position: 12, proof_id: "PROOF-023", rationale: "Knockout proof for payoff"}
    ]
```

---

## FINAL OUTPUT: COMPLETE INVENTORY

```yaml
proof_inventory_output:
  # Summary
  summary:
    total_elements: 47
    overall_strength_score: 64
    promise_ceiling: "noticeable_improvement"
    schwartz_stage_used: 3

  # By Category
  by_category:
    social:
      count: 18
      strength: 7.2
      status: "robust"
      top_elements: [...]
    authority:
      count: 12
      strength: 6.1
      status: "adequate"
      top_elements: [...]
    demonstration:
      count: 6
      strength: 5.4
      status: "adequate"
      top_elements: [...]
    mechanism:
      count: 4
      strength: 4.2
      status: "weak"
      top_elements: [...]
    data:
      count: 5
      strength: 4.8
      status: "weak"
      top_elements: [...]
    risk_reversal:
      count: 2
      strength: 6.5
      status: "adequate"
      top_elements: [...]

  # Gaps
  gaps:
    missing_categories: []
    weak_categories: ["mechanism", "data"]
    recommendations: [...]

  # Rankings
  rankings:
    knockout_proof:
      element_id: "PROOF-023"
      rationale: "..."

    by_position:
      lead: [...]
      mechanism: [...]
      body: [...]
      close: [...]

    by_objection: {...}

    gradualization_sequence: [...]

  # For Downstream Skills
  handoffs:
    to_promise: {...}
    to_big_idea: {...}
    to_proof_demonstration: {...}

  # All Elements (full detail)
  elements: [
    {proof element 1...},
    {proof element 2...},
    ...
  ]
```

---

## VALIDATION GATES

Before output, validate:

- [ ] All elements have category + sub_type assigned
- [ ] All elements have 5-dimension scores
- [ ] Stage adjustments applied
- [ ] Gaps analysis complete
- [ ] Promise ceiling calculated
- [ ] Rankings generated for all positions
- [ ] Downstream handoffs packaged

If any gate fails, return to appropriate layer for remediation.
