# Layer 4: Scoring + Packaging

**Layer:** 4
**Type:** Validation + Output Assembly
**Purpose:** Score the complete root cause package and format for downstream consumption
**Inputs:** Root cause candidate + villain profile + countersells from Layers 2-3
**Outputs:** Final scored root-cause-package.json

---

## PART 1: FINAL SCORING

### Scoring Dimensions

Score the complete root cause package on 7 dimensions (1-10 each):

```python
def score_root_cause_package(root_cause, villain, countersells, proof_inventory):
    """
    Score the complete root cause package.
    """
    scores = {}

    # 1. CLARITY
    # Is the reframe clear and understandable?
    scores['clarity'] = score_clarity(
        root_cause_statement=root_cause['root_cause_statement'],
        analogy=root_cause.get('analogy'),
        villain_explanation=villain['behavior']['what_it_does']
    )

    # 2. BELIEVABILITY
    # Will the prospect accept this?
    scores['believability'] = score_believability(
        proof_backing=villain['proof'],
        alignment_with_beliefs=check_belief_alignment(root_cause),
        hedging_appropriate=check_hedging(root_cause)
    )

    # 3. BLAME SHIFT
    # Does it effectively remove blame from prospect?
    scores['blame_shift'] = score_blame_shift(
        villain_clarity=villain['identity'],
        sympathy_statements=countersells,
        prospect_as_victim=check_victim_framing(root_cause)
    )

    # 4. EMOTIONAL IMPACT
    # Does it create an "aha moment"?
    scores['emotional_impact'] = score_emotional_impact(
        revelation_strength=root_cause.get('key_insight'),
        countersell_resonance=countersells.get('willpower'),
        hope_creation=check_hope_creation(root_cause)
    )

    # 5. MECHANISM SETUP
    # Does it naturally lead to the mechanism?
    scores['mechanism_setup'] = score_mechanism_setup(
        bridge_clarity=root_cause.get('mechanism_bridge'),
        defeat_path=villain['defeat_path'],
        only_solution=countersells.get('only_solution')
    )

    # 6. PROOF BACKING
    # Is it adequately supported by evidence?
    scores['proof_backing'] = score_proof_backing(
        proof_inventory=proof_inventory,
        villain_proof=villain['proof'],
        claims_supportable=check_claim_support(root_cause, proof_inventory)
    )

    # 7. SCHWARTZ CALIBRATION
    # Is it calibrated for market sophistication?
    scores['schwartz_calibration'] = score_schwartz_calibration(
        root_cause_depth=measure_depth(root_cause),
        villain_complexity=measure_complexity(villain),
        target_stage=root_cause.get('schwartz_stage', 3)
    )

    # Calculate composite
    weights = {
        'clarity': 0.15,
        'believability': 0.20,
        'blame_shift': 0.10,
        'emotional_impact': 0.15,
        'mechanism_setup': 0.20,
        'proof_backing': 0.15,
        'schwartz_calibration': 0.05
    }

    scores['composite'] = sum(
        scores[dim] * weights[dim] for dim in weights
    )

    return scores
```

---

### Scoring Rubrics

#### Clarity (1-10)

```yaml
clarity_rubric:
  10: "12-year-old instantly understands; single sentence explains it"
  9: "Very clear; minimal explanation needed"
  8: "Clear with simple analogy"
  7: "Clear but requires brief explanation"
  6: "Understandable but takes thought"
  5: "Somewhat complex; needs unpacking"
  4: "Confusing terminology or logic"
  3: "Requires significant explanation"
  2: "Very confusing; multiple read-throughs needed"
  1: "Incomprehensible"

clarity_boosters:
  - Strong analogy (+1-2)
  - Named villain (+1)
  - Visual metaphor (+1)

clarity_penalties:
  - Jargon without explanation (-1-2)
  - Multiple simultaneous concepts (-1)
  - Abstract without concrete (-1)
```

#### Believability (1-10)

```yaml
believability_rubric:
  10: "Irrefutable; multiple authoritative sources; aligns with experience"
  9: "Highly believable; strong proof; familiar concepts"
  8: "Believable; good proof support"
  7: "Reasonable; adequate proof"
  6: "Plausible but proof could be stronger"
  5: "Requires suspension of disbelief"
  4: "Questionable; proof gaps"
  3: "Hard to believe; weak proof"
  2: "Implausible; contradicts experience"
  1: "Unbelievable"

believability_boosters:
  - Peer-reviewed study (+2)
  - Named expert quote (+1-2)
  - Aligns with prospect's existing beliefs (+1)
  - Explains their past experience (+1)

believability_penalties:
  - No proof (-2)
  - Contradicts common knowledge (-1-2)
  - Overstated claims (-1)
  - Missing hedging on uncertain claims (-1)
```

#### Blame Shift (1-10)

```yaml
blame_shift_rubric:
  10: "Complete exoneration; clear external villain; prospect as victim"
  9: "Strong blame shift; villain clearly responsible"
  8: "Good blame shift; some prospect agency retained"
  7: "Decent blame shift; villain identified"
  6: "Partial blame shift"
  5: "Ambiguous responsibility"
  4: "Weak blame shift; prospect still implicated"
  3: "Little blame shift"
  2: "Prospect mostly blamed"
  1: "No blame shift; prospect responsible"

blame_shift_boosters:
  - Named, tangible villain (+1-2)
  - "Not your fault" language (+1)
  - External factors emphasized (+1)
  - Past failures explained (+1)

blame_shift_penalties:
  - Blame on prospect habits (-1-2)
  - "You should have" language (-1)
  - Willpower mentioned as factor (-1)
```

#### Mechanism Setup (1-10)

```yaml
mechanism_setup_rubric:
  10: "Mechanism is obvious, inevitable solution; bridge crystal clear"
  9: "Mechanism follows logically; strong bridge"
  8: "Clear path to mechanism; good bridge"
  7: "Mechanism makes sense as solution"
  6: "Connection to mechanism visible"
  5: "Bridge exists but weak"
  4: "Tenuous connection to mechanism"
  3: "Mechanism solution not obvious"
  2: "Gap between root cause and mechanism"
  1: "No logical path to mechanism"

mechanism_setup_boosters:
  - "Only solution" narrative developed (+1-2)
  - Villain defeat path clear (+1)
  - Countersells explain why alternatives fail (+1)

mechanism_setup_penalties:
  - Multiple possible solutions (-1-2)
  - Mechanism not directly connected (-1)
  - Competing narratives possible (-1)
```

---

### Minimum Score Requirements

```yaml
minimum_requirements:
  overall:
    composite: 7.0  # Must score ≥ 7.0 overall

  critical_dimensions:
    mechanism_setup: 7  # Critical for downstream
    believability: 6    # Won't work if not believed
    clarity: 6          # Must be understandable

  supporting_dimensions:
    blame_shift: 5
    emotional_impact: 5
    proof_backing: 5
    schwartz_calibration: 5
```

---

## PART 2: QUALITY VALIDATION

### Anti-Slop Validation

```python
def validate_anti_slop(root_cause_package):
    """
    Check root cause copy for slop.
    """
    slop_indicators = [
        'revolutionary', 'groundbreaking', 'miracle',
        'game-changing', 'unbelievable', 'incredible',
        'simply put', 'in other words', 'basically'
    ]

    copy_elements = [
        root_cause_package['root_cause_statement'],
        root_cause_package['key_insight'],
        root_cause_package['villain']['behavior']['what_it_does'],
        # ... all text elements
    ]

    slop_found = []
    for element in copy_elements:
        for indicator in slop_indicators:
            if indicator.lower() in element.lower():
                slop_found.append({
                    'indicator': indicator,
                    'location': element[:50]
                })

    return {
        'pass': len(slop_found) == 0,
        'slop_instances': slop_found
    }
```

### Claim Support Validation

```python
def validate_claim_support(root_cause_package, proof_inventory):
    """
    Verify all claims have proof backing.
    """
    claims = extract_all_claims(root_cause_package)
    unsupported = []

    for claim in claims:
        support = find_supporting_proof(claim, proof_inventory)
        if not support:
            unsupported.append(claim)

    return {
        'pass': len(unsupported) == 0,
        'unsupported_claims': unsupported,
        'recommendation': 'Add hedging or remove claim' if unsupported else None
    }
```

### Schwartz Stage Validation

```python
def validate_schwartz_alignment(root_cause_package, target_stage):
    """
    Verify root cause complexity matches target Schwartz stage.
    """
    depth_level = measure_root_cause_depth(root_cause_package)

    alignment = {
        1: depth_level <= 3,  # Stage 1: Simple root cause
        2: depth_level <= 4,  # Stage 2: Slightly deeper
        3: depth_level <= 6,  # Stage 3: New perspective
        4: depth_level <= 8,  # Stage 4: Novel reframe
        5: depth_level >= 6   # Stage 5: Identity-level
    }

    return {
        'pass': alignment.get(target_stage, False),
        'current_depth': depth_level,
        'target_stage': target_stage,
        'recommendation': generate_depth_recommendation(depth_level, target_stage)
    }
```

---

## PART 3: OUTPUT PACKAGING

### For 03-Mechanism Skill

```yaml
handoff_to_mechanism:
  root_cause_for_mechanism:
    statement: "25 trillion gut microbes control your food cravings"
    villain_to_defeat: "Bad Bugs (pathogenic gut microbiota)"
    problem_mechanism_must_solve: "Restore good bacteria to overpower bad bugs"

  mechanism_constraints:
    must_address: "Gut microbiome imbalance"
    must_defeat: "Bad Bugs"
    proof_available: ["UCSF study", "Duke study", "Dr. Maley quote"]

  mechanism_opportunities:
    naming_hooks: ["gut", "microbiome", "bacteria", "bugs", "prebiotics"]
    metaphor_hooks: ["rain forest", "army", "ecosystem"]
    contrast_hooks: ["good vs bad bacteria", "feed vs starve"]
```

### For 04-Promise Skill

```yaml
handoff_to_promise:
  limitation_on_promise:
    proof_ceiling: "moderate"
    max_claim_level: "significant_improvement"
    must_hedge: ["specific timeframes", "guaranteed results"]

  what_can_be_claimed:
    supported_claims:
      - "Reduced cravings"
      - "Better digestion"
      - "More energy"
    unsupported_claims:
      - "Lose X pounds in Y days"
      - "Guaranteed transformation"

  root_cause_tie_in:
    promise_must_connect_to: "Defeating the bad bugs"
    benefit_logic: "When bad bugs are gone → cravings stop → weight loss follows"
```

### For Copy Skills

```yaml
handoff_to_copy:
  key_reframe_lines:
    revelation: "Here's what nobody told you about your cravings..."
    blame_shift: "It's not that you lack willpower..."
    villain_intro: "There are trillions of 'bad bugs' in your gut..."
    aha_moment: "Your cravings aren't weakness — they're chemical signals"

  villain_dramatization_lines:
    naming: "I call them the 'bad bugs'..."
    action: "They hijack your vagus nerve..."
    prevalence: "If you've ever taken antibiotics..."
    consequences: "The more you feed them, the more they breed..."

  countersell_lines:
    diet: "Dieting with bad bugs is like trying to quit smoking while someone blows smoke in your face..."
    supplements: "Taking probiotics without prebiotics is like planting seeds without water..."
    willpower: "Like the plant in Little Shop of Horrors: 'Feed me, Seymour'..."

  copy_positioning:
    lead_hook: "What if I told you your cravings aren't your fault?"
    mechanism_bridge: "The only way to end the cravings is to feed the good bacteria..."
    close_reinforcement: "Remember — this isn't about willpower. It's about biology."
```

---

## FINAL OUTPUT: ROOT-CAUSE-PACKAGE.JSON

```yaml
root_cause_package:
  # Summary
  summary:
    surface_problem: "Can't lose weight no matter what I try"
    real_root_cause: "Gut microbiome imbalance — bad bugs controlling cravings"
    root_cause_method: "new_reality"
    villain_name: "Bad Bugs"
    villain_type: "organism"
    reframe_strength: 8
    proof_backing_score: 8

  # The Full Reframe
  reframe:
    surface_problem:
      what_they_think: "I don't have willpower / my metabolism is slow"
      why_they_think_it: "Diets and exercise haven't worked"
      emotional_state: "Frustrated, hopeless, self-blaming"

    root_cause:
      what_it_actually_is: "Trillions of pathogenic gut bacteria sending craving signals"
      root_cause_name: null  # No syndrome name for this method
      why_this_is_happening:
        - "Antibiotics destroyed good bacteria"
        - "Artificial sweeteners kill gut microbes"
        - "Processed food feeds bad bacteria"
      mechanism_link: "Prebiotics feed good bacteria to overpower bad bugs"

    new_reality:
      revelation: "25 trillion organisms live in your gut and control your cravings"
      analogy: "Your gut is like a rain forest — when the ecosystem is damaged, bad bugs take over"
      proof_of_reality:
        - "UCSF study: Microbes influence human eating behavior"
        - "Dr. Maley: 'Bacteria within the gut are manipulative'"

    villain:
      primary_villain:
        name: "Bad Bugs"
        type: "organism"
        what_it_does: "Hijack vagus nerve to control food cravings"
        how_it_sabotages: "Send signals demanding sugar and junk food"
        why_prevalent: "Antibiotics, Splenda, processed food destroy the good bacteria"
      secondary_villains:
        - name: "Ghrelin (unregulated)"
          type: "hormone"
          relationship: "Uncontrolled when H. pylori absent"

  # Counterselling
  countersells:
    why_dieting_fails: "Bad bugs MAKE you crave the wrong foods regardless of diet"
    why_exercise_alone_fails: "Exercise can't overcome chemical craving signals"
    why_competitor_approaches_fail: "Probiotics alone don't work without prebiotics"
    common_solutions_limitation: "None address the root cause — gut bacteria"
    only_solution_narrative: "The ONLY way is to feed good bacteria so they outcompete bad bugs"

  # Proof Integration
  proof_elements:
    problem_exists_proof:
      - type: "study"
        source: "UCSF, Arizona State, University of New Mexico (2014)"
        claim: "Microbes influence human eating behavior"
        quote: "Rather than simply living off nutrients we send their way"
      - type: "study"
        source: "Duke University (2008)"
        claim: "Splenda destroys gut microbes"
        quote: "One packet kills 50% of gut microbes"
    villain_real_proof:
      - type: "expert_quote"
        source: "Dr. Carlo Maley, UCSF"
        claim: "Bacteria are manipulative"
        quote: "There is a diversity of interests... some aligned with your goals, others not"
    societal_factors:
      - factor: "Antibiotic overuse"
        proof: "Children receive multiple rounds by age 15"
      - factor: "Artificial sweeteners"
        proof: "Duke study on Splenda"

  # Scoring
  scores:
    clarity: 8
    believability: 8
    blame_shift: 9
    emotional_impact: 8
    mechanism_setup: 9
    proof_backing: 8
    schwartz_calibration: 8
    composite: 8.3

  # Handoffs
  handoffs:
    to_mechanism:
      root_cause_for_mechanism: "Gut microbiome imbalance causing uncontrollable cravings"
      villain_to_defeat: "Bad Bugs (pathogenic gut bacteria)"
      problem_mechanism_must_solve: "Restore beneficial bacteria to control craving signals"
    to_promise:
      limitation_on_promise: "Cannot claim specific weight loss amounts without data"
      what_can_be_claimed: "Reduced cravings, better digestion, more energy, weight management"
    to_copy:
      key_reframe_lines: [...]
      villain_dramatization_lines: [...]
      countersell_lines: [...]
```

---

## GATE 4 CRITERIA

**PASS if:**
- Composite score ≥ 7.0
- All critical dimensions ≥ required minimum
- Anti-slop validation passed
- Claim support validation passed
- All handoffs complete and schema-valid

**PASS WITH WARNINGS if:**
- PASS criteria met
- But: Proof backing < 7 OR 1-2 minor slop instances

**FAIL if:**
- Composite score < 7.0
- Critical dimension below minimum
- Unsupported major claims
- Handoffs incomplete

On FAIL: Return to Layer 2 or 3 for remediation.

---

## VALIDATION CHECKLIST

Before output, validate:

- [ ] Root cause statement clear and specific
- [ ] Villain fully developed with proof backing
- [ ] Countersells address all major failed solutions
- [ ] "Only solution" narrative leads to mechanism
- [ ] All claims supported by proof inventory
- [ ] No slop in copy elements
- [ ] Schwartz stage calibrated appropriately
- [ ] All handoff packages complete
- [ ] Composite score ≥ 7.0
- [ ] All critical dimensions ≥ minimum

If any check fails, return to appropriate layer for remediation.
