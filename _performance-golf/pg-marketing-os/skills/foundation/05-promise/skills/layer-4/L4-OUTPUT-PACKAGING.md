# Layer 4: Output Packaging

**Layer:** 4
**Type:** Assembly + Handoff
**Purpose:** Package validated promises for downstream consumption (Big Ideas, Copy Skills)
**Inputs:** Validated promises from Layer 3
**Outputs:** Final promise-output.json with all handoffs

---

## PART 1: PRIMARY PROMISE SELECTION

Select the single best promise from validated set:

```python
def select_primary_promise(validated_promises):
    """
    Select the primary promise for the campaign.
    """
    # Sort by composite score
    ranked = sorted(
        validated_promises,
        key=lambda p: p['composite_score'],
        reverse=True
    )

    top_candidates = ranked[:3]

    # Apply tiebreaker criteria if needed
    if len(top_candidates) > 1 and \
       top_candidates[0]['composite_score'] - top_candidates[1]['composite_score'] < 0.5:
        # Close scores - apply additional criteria
        primary = select_with_tiebreakers(top_candidates)
    else:
        primary = top_candidates[0]

    return {
        'primary_promise': primary,
        'runners_up': top_candidates[1:],
        'selection_rationale': generate_selection_rationale(primary, top_candidates)
    }


def select_with_tiebreakers(candidates):
    """
    Apply tiebreaker criteria when scores are close.
    """
    tiebreaker_scores = []

    for candidate in candidates:
        score = 0

        # Tiebreaker 1: Mechanism alignment (direct > indirect)
        if candidate['validation']['mechanism_alignment'].get('alignment_type') == 'direct':
            score += 3

        # Tiebreaker 2: Higher specificity
        score += candidate['validation']['specificity']['score'] * 0.2

        # Tiebreaker 3: Emotional resonance (if captured)
        if 'emotional_resonance' in candidate.get('calibration_scores', {}):
            score += candidate['calibration_scores']['emotional_resonance'] * 0.1

        # Tiebreaker 4: Proof backing strength
        if candidate['validation']['provability'].get('supporting_proof', {}).get('direct'):
            score += 2

        tiebreaker_scores.append({
            'candidate': candidate,
            'tiebreaker_score': score
        })

    return max(tiebreaker_scores, key=lambda x: x['tiebreaker_score'])['candidate']
```

---

## PART 2: PROMISE VARIATIONS ASSEMBLY

Generate variations for different contexts:

```python
def assemble_promise_variations(primary_promise, validated_promises, context):
    """
    Create promise variations for different use cases.
    """
    variations = {}

    # 1. BOLD VERSION
    # Maximum impact, for headlines and hooks
    variations['bold'] = create_bold_version(primary_promise)

    # 2. SAFE VERSION
    # Conservative, for regulated contexts or skeptical audiences
    variations['safe'] = create_safe_version(primary_promise)

    # 3. QUESTION VERSION
    # For leads and curiosity hooks
    variations['question'] = create_question_version(primary_promise)

    # 4. NICHE-SPECIFIC VERSIONS
    # Tailored for specific sub-audiences
    if context.get('sub_audiences'):
        variations['niche_specific'] = {}
        for audience in context['sub_audiences']:
            variations['niche_specific'][audience['id']] = create_niche_version(
                primary_promise, audience
            )

    # 5. MECHANISM-FORWARD VERSION
    # For Stage 3-4 markets
    variations['mechanism_forward'] = create_mechanism_forward_version(
        primary_promise, context.get('mechanism')
    )

    # 6. IDENTIFICATION VERSION
    # For Stage 5 markets
    variations['identification'] = create_identification_version(
        primary_promise, context.get('ideal_customer')
    )

    return variations


def create_bold_version(promise):
    """
    Maximum impact version - for headlines.
    """
    statement = promise['statement']

    # Add emphasis markers
    bold_patterns = [
        f"Finally: {statement}",
        f"{statement.upper()}",
        f"Yes, You Can {statement}",
        f"The Truth: {statement}"
    ]

    return {
        'statement': bold_patterns[0],
        'alternatives': bold_patterns[1:],
        'use_case': 'Headlines, hero sections, bold claims'
    }


def create_safe_version(promise):
    """
    Conservative version - hedged for compliance.
    """
    statement = promise['statement']

    # Add hedging
    safe_patterns = [
        f"May help you {extract_core_benefit(statement)}",
        f"Designed to support your {extract_topic(statement)}",
        f"Can contribute to {extract_outcome(statement)}",
        f"Many users report {extract_result(statement)}"
    ]

    return {
        'statement': safe_patterns[0],
        'alternatives': safe_patterns[1:],
        'use_case': 'Regulated contexts, skeptical audiences, disclaimers'
    }


def create_question_version(promise):
    """
    Question format - for curiosity and engagement.
    """
    statement = promise['statement']
    core_desire = extract_core_desire(statement)

    question_patterns = [
        f"What if you could finally {core_desire}?",
        f"Would you like to {core_desire}?",
        f"Have you ever wished you could {core_desire}?",
        f"What would it mean to {core_desire}?"
    ]

    return {
        'statement': question_patterns[0],
        'alternatives': question_patterns[1:],
        'use_case': 'Lead hooks, subject lines, curiosity openers'
    }
```

---

## PART 3: CAMPAIGN THESIS FINALIZATION

```python
def finalize_campaign_thesis(primary_promise, mechanism, context):
    """
    Finalize the campaign thesis that ties everything together.
    """
    # Standard thesis formula: The [superiority] way to [promise] is [mechanism]

    thesis_components = {
        'superiority_claim': determine_superiority(context['schwartz_stage']),
        'promise_statement': primary_promise['core_promise'],
        'mechanism_name': mechanism['name']
    }

    # Generate thesis variations
    thesis_variations = []

    # Primary: Standard formula
    thesis_variations.append({
        'type': 'primary',
        'thesis': f"The {thesis_components['superiority_claim']} way to "
                  f"{thesis_components['promise_statement']} is with the "
                  f"{thesis_components['mechanism_name']}",
        'use_case': 'Core positioning statement'
    })

    # Inverted: Mechanism first
    thesis_variations.append({
        'type': 'inverted',
        'thesis': f"The {thesis_components['mechanism_name']} is the "
                  f"{thesis_components['superiority_claim']} way to "
                  f"{thesis_components['promise_statement']}",
        'use_case': 'Mechanism-led positioning'
    })

    # Villain-inclusive
    if mechanism.get('villain'):
        thesis_variations.append({
            'type': 'villain_inclusive',
            'thesis': f"The {thesis_components['superiority_claim']} way to "
                      f"{thesis_components['promise_statement']} is to defeat "
                      f"{mechanism['villain']['name']}",
            'use_case': 'Enemy-focused positioning'
        })

    # Question format
    thesis_variations.append({
        'type': 'question',
        'thesis': f"What if the {thesis_components['superiority_claim']} way to "
                  f"{thesis_components['promise_statement']} was simply using the "
                  f"{thesis_components['mechanism_name']}?",
        'use_case': 'Curiosity-led positioning'
    })

    # Discovery format
    thesis_variations.append({
        'type': 'discovery',
        'thesis': f"Scientists have discovered the {thesis_components['superiority_claim']} "
                  f"way to {thesis_components['promise_statement']}: "
                  f"The {thesis_components['mechanism_name']}",
        'use_case': 'Authority-led positioning'
    })

    return {
        'primary_thesis': thesis_variations[0]['thesis'],
        'components': thesis_components,
        'variations': thesis_variations
    }
```

---

## PART 4: DOWNSTREAM HANDOFFS

### Handoff to 05-Big-Ideas

```yaml
handoff_to_big_ideas:
  primary_promise:
    statement: "End your uncontrollable cravings in as little as 7 days"
    promise_type: "relief"
    core_transformation: "craving elimination"
    specificity_level: "high"

  campaign_thesis:
    statement: "The ONLY way to finally end your cravings is with the Gut Reset Protocol"
    components:
      superiority: "only"
      promise: "end your cravings"
      mechanism: "Gut Reset Protocol"

  promise_variations:
    bold: "Finally End Your Cravings — In Just 7 Days"
    safe: "May help reduce food cravings significantly"
    question: "What if you could finally end those uncontrollable cravings?"

  constraints_for_big_idea:
    must_deliver: "craving elimination"
    must_connect_to: "Gut Reset Protocol"
    must_not_exceed: "significant_improvement"  # Proof ceiling
    must_use_villain: "Bad Bugs"

  emotional_hooks:
    primary_emotion: "relief"
    secondary_emotion: "hope"
    fear_to_address: "fear of failure, losing control"

  schwartz_stage: 3
  mechanism_sophistication: "unique"
```

### Handoff to Copy Skills

```yaml
handoff_to_copy:
  # For Headlines (Skill 11)
  headline_inputs:
    primary_promise: "End your uncontrollable cravings in as little as 7 days"
    bold_version: "Finally End Your Cravings — In Just 7 Days"
    question_version: "What if you could finally end those uncontrollable cravings?"
    promise_keywords: ["cravings", "7 days", "end", "finally"]

  # For Leads (Skill 11)
  lead_inputs:
    promise_as_hook: "Imagine finally being able to walk past the cookie jar without a second thought..."
    promise_as_revelation: "There's a reason your cravings feel uncontrollable — and it has nothing to do with willpower"
    promise_connection_to_mechanism: "The only way to end cravings is to address what's causing them: the bad bacteria in your gut"

  # For Body Copy
  body_inputs:
    promise_amplification_lines:
      - "This isn't about losing a few pounds temporarily..."
      - "This is about ending the cravings that have controlled you for years..."
      - "Imagine what life would be like without constant food thoughts..."
    promise_proof_bridges:
      - "And this isn't just wishful thinking — there's now scientific proof..."
      - "In a moment, I'll show you exactly how this works..."
    promise_callback_lines:
      - "Remember — this isn't about willpower. It's about biology."
      - "Once you understand what's really causing your cravings..."

  # For Close (Skill 17)
  close_inputs:
    promise_reinforcement: "You deserve to finally be free from uncontrollable cravings"
    promise_future_pacing: "Imagine 7 days from now, walking past your trigger foods without even thinking about them"
    promise_urgency: "Every day you wait is another day those bad bugs control your eating"
```

### Handoff to Proof Demonstration (Skill 16)

```yaml
handoff_to_proof_demonstration:
  claims_requiring_proof:
    - claim: "End cravings in 7 days"
      proof_needed: "timeframe_proof"
      proof_available: ["Testimonial batch showing 7-day results", "Study on gut-craving timeline"]

    - claim: "Uncontrollable cravings"
      proof_needed: "mechanism_proof"
      proof_available: ["UCSF study on gut-brain connection", "Dr. Maley quote"]

    - claim: "Bad bugs cause cravings"
      proof_needed: "villain_proof"
      proof_available: ["Duke study", "Microbiome research summary"]

  proof_sequence_recommendation:
    1: "Establish the problem (cravings are real, biological)"
    2: "Introduce the villain (bad bugs control cravings)"
    3: "Prove the villain exists (studies, quotes)"
    4: "Show the solution works (testimonials, results)"
    5: "Reinforce the promise (callback)"
```

---

## PART 5: FINAL OUTPUT SCHEMA

```yaml
promise_output:
  # Summary
  summary:
    primary_promise: "End your uncontrollable cravings in as little as 7 days"
    promise_type: "relief"
    composite_score: 8.7
    campaign_thesis: "The ONLY way to finally end your cravings is with the Gut Reset Protocol"
    validation_status: "VALIDATED"

  # Primary Promise Package
  primary_promise:
    statement: "End your uncontrollable cravings in as little as 7 days"
    promise_type: "relief"
    components:
      transformation: "From uncontrollable cravings to freedom from food thoughts"
      specificity_markers:
        timeframe: "7 days"
        qualifier: "uncontrollable cravings"
        quantity: null  # No specific quantity in this promise
    mechanism_connection: "Gut Reset Protocol defeats the bad bugs causing cravings"
    villain_connection: "Bad Bugs hijacking the vagus nerve"

  # Campaign Thesis
  campaign_thesis:
    primary: "The ONLY way to finally end your cravings is with the Gut Reset Protocol"
    variations:
      - type: "inverted"
        thesis: "The Gut Reset Protocol is the ONLY way to finally end your cravings"
      - type: "villain_inclusive"
        thesis: "The ONLY way to end your cravings is to defeat the Bad Bugs"
      - type: "question"
        thesis: "What if the ONLY way to end your cravings was to feed the right bacteria?"

  # Promise Variations
  variations:
    bold_version: "Finally End Your Cravings — In Just 7 Days"
    safe_version: "May help reduce food cravings significantly"
    question_version: "What if you could finally end those uncontrollable cravings?"
    mechanism_forward: "The Gut Reset Protocol ends cravings in as little as 7 days"
    identification_version: "For anyone who's ever felt controlled by food cravings..."

  # Supporting Promises (runners-up)
  supporting_promises:
    - statement: "Finally lose the stubborn weight that won't respond to diets"
      type: "transformation"
      score: 8.3
      use_case: "Weight-focused audience segment"

    - statement: "Transform your body by defeating the Bad Bugs controlling your cravings"
      type: "transformation"
      score: 8.1
      use_case: "Villain-focused messaging"

  # Quality Validation
  quality_gates:
    is_specific: true
    is_believable: true
    is_provable: true
    is_mechanism_aligned: true
    is_stage_appropriate: true
    anti_slop_clean: true

  # Scores
  scores:
    specificity: 7.5
    believability: 8.0
    provability: 9.0
    mechanism_alignment: 10.0
    stage_appropriateness: 8.0
    anti_slop: 10.0
    composite: 8.7

  # Handoffs
  handoffs:
    to_big_ideas: {...}  # Full handoff package
    to_copy: {...}       # Full handoff package
    to_proof: {...}      # Full handoff package
```

---

## GATE 4 CRITERIA

**PASS if:**
- Primary promise selected with score ≥8.0
- Campaign thesis generated with all components
- At least 3 promise variations created
- All handoff packages complete and schema-valid
- Quality gates all TRUE

**PASS WITH WARNINGS if:**
- PASS criteria met
- But: Primary promise score 8.0-8.5 OR single variation missing

**FAIL if:**
- Primary promise score <8.0
- Campaign thesis incomplete (missing component)
- Handoffs incomplete
- Critical quality gate FALSE (provability, mechanism_alignment)

On FAIL: Return to Layer 3 or escalate to upstream skill review.

---

## VALIDATION CHECKLIST

Before output, validate:

- [ ] Primary promise selected and documented
- [ ] Campaign thesis has all three components (superiority, promise, mechanism)
- [ ] All promise variations generated (bold, safe, question, mechanism-forward)
- [ ] Handoff to Big Ideas complete with constraints
- [ ] Handoff to Copy complete with all sections
- [ ] Handoff to Proof complete with claims mapped
- [ ] All quality gates passed
- [ ] Composite score ≥8.0
- [ ] No slop in any output text
- [ ] Schema validates against promise_output specification

If any check fails, return to appropriate layer for remediation.
