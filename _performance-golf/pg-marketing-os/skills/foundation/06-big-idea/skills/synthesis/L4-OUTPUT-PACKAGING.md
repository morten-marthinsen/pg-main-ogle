# Layer 4: Output Packaging + Handoffs

**Layer:** 4
**Type:** Assembly + Delivery
**Purpose:** Package validated Big Idea candidates for downstream skills
**Inputs:** Ranked, validated candidates from Layer 3
**Outputs:** big-idea-output.json + BIG-IDEA-BRIEF.md

---

## PART 1: FINAL SELECTION

```python
def select_final_candidates(ranked_candidates, selection_rules):
    """
    Select candidates for output based on ranking and business rules.
    """
    selected = {
        'primary': None,
        'backup': None,
        'test_variants': []
    }

    viable = [c for c in ranked_candidates if c['scores']['composite'] >= 7.0]

    if not viable:
        return {'error': 'No viable candidates', 'action': 'return_to_layer_2'}

    # Primary = top ranked
    selected['primary'] = viable[0]

    # Backup = second ranked with different type (for A/B testing variety)
    for candidate in viable[1:]:
        if candidate['big_idea_type'] != selected['primary']['big_idea_type']:
            selected['backup'] = candidate
            break

    if not selected['backup'] and len(viable) > 1:
        selected['backup'] = viable[1]

    # Test variants = remaining viable candidates
    selected['test_variants'] = [
        c for c in viable[2:] if c['scores']['composite'] >= 7.0
    ][:2]  # Max 2 test variants

    return selected
```

---

## PART 2: DOWNSTREAM HANDOFFS

### Handoff to Headlines Skill (06)

```yaml
handoff_to_headlines:
  primary_big_idea:
    statement: "The Bad Bugs hijacking your brain's craving signals"
    type: "enemy"

  recommended_headlines:
    - headline: "The Bad Bugs That Won't Let You Stop Eating"
      type: "villain_reveal"
      performance_prediction: "high"
      vault_source: "dmhealth_prebio_001"
    - headline: "Why Your Cravings Aren't Your Fault"
      type: "blame_shift"
      performance_prediction: "high"
      vault_source: "creme_resurge_001"
    # Top 5 headlines from primary candidate

  headline_strategies:
    primary_strategy: "villain_reveal"
    secondary_strategy: "mechanism_solution"
    avoid: ["generic_promise", "oversaturated_patterns"]

  headline_elements:
    villain_name: "Bad Bugs"
    mechanism_name: "Gut Reset Protocol"
    promise_core: "end cravings"
    specificity_markers:
      timeframe: "7 days"
      qualifier: "uncontrollable cravings"

  constraints:
    must_include: ["villain OR mechanism reference"]
    must_avoid: ["competitor headline patterns"]
    schwartz_stage: 3
```

### Handoff to Leads Skill (07)

```yaml
handoff_to_leads:
  primary_big_idea:
    statement: "The Bad Bugs hijacking your brain's craving signals"
    hook_sentence: "Here's what nobody told you about your cravings..."

  recommended_leads:
    - lead_type: "revelation"
      full_lead: "[Complete 300+ word lead...]"
      hook_sentence: "Here's what nobody told you..."
      performance_prediction: "high"

    - lead_type: "problem_agitation"
      full_lead: "[Complete 300+ word lead...]"
      hook_sentence: "You know that feeling..."
      performance_prediction: "medium_high"

  lead_approach: "villain_revelation"

  lead_elements:
    opening_hook: "Reframe revelation"
    problem_amplification: "Use countersell lines"
    villain_introduction: "Bad Bugs reveal"
    mechanism_bridge: "Only solution narrative"
    promise_preview: "End cravings in 7 days"

  assets_to_use:
    reframe_lines:
      - "Here's what nobody told you about your cravings..."
      - "It's not that you lack willpower..."
    villain_lines:
      - "There are trillions of 'bad bugs' in your gut..."
      - "They hijack your vagus nerve..."
    countersell_lines:
      - "Dieting with bad bugs is like trying to quit smoking while..."
```

### Handoff to VSL Structure (08)

```yaml
handoff_to_vsl:
  big_idea_for_vsl: "The Bad Bugs hijacking your brain's craving signals"

  vsl_architecture:
    hook_section:
      big_idea_reveal: "villain_reveal"
      duration: "0-2 minutes"

    problem_section:
      villain_dramatization: true
      countersell_integration: true
      duration: "2-8 minutes"

    mechanism_section:
      mechanism_reveal: "Gut Reset Protocol"
      villain_defeat_narrative: true
      duration: "8-15 minutes"

    proof_section:
      proof_sequence: ["authority", "testimonial", "data", "testimonial"]
      duration: "15-25 minutes"

    offer_section:
      promise_reinforcement: true
      duration: "25-35 minutes"

  proof_sequence:
    - position: "early"
      type: "authority_proof"
      element: "UCSF study on gut-brain connection"
    - position: "mid"
      type: "testimonial_cluster"
      focus: "craving elimination results"
    - position: "late"
      type: "comparison_proof"
      focus: "vs. dieting, vs. supplements"

  mechanism_reveal_strategy:
    setup: "Countersell why nothing else works"
    reveal: "Introduce Gut Reset Protocol"
    validation: "Scientific backing + expert quotes"
    demonstration: "How to defeat Bad Bugs"
```

### Handoff to Proof Demonstration (10)

```yaml
handoff_to_proof_demonstration:
  claims_requiring_proof:
    - claim: "Bad Bugs control cravings"
      proof_type: "mechanism_proof"
      available_proof: ["UCSF study", "Dr. Maley quote"]

    - claim: "End cravings in 7 days"
      proof_type: "results_proof"
      available_proof: ["Testimonial batch A", "User data summary"]

    - claim: "Gut Reset Protocol works"
      proof_type: "demonstration_proof"
      available_proof: ["Scientific mechanism", "Before/after testimonials"]

  proof_sequence_recommendation:
    1: "Establish credibility (authority proof)"
    2: "Prove villain exists (scientific proof)"
    3: "Show mechanism defeats villain (mechanism proof)"
    4: "Demonstrate results (testimonial + data proof)"
    5: "Remove risk (guarantee)"

  proof_density_guidance:
    lead: "Light - 1-2 proof elements"
    body: "Heavy - proof cluster every 300-500 words"
    close: "Medium - testimonial reinforcement + guarantee"
```

---

## PART 3: BIG-IDEA-BRIEF.MD GENERATION

```python
def generate_big_idea_brief(selected_candidates, handoffs, synthesis_context):
    """
    Generate the human-readable BIG-IDEA-BRIEF.md
    """
    primary = selected_candidates['primary']

    brief = f"""# Big Idea Brief

## Campaign: {synthesis_context.get('campaign_name', 'Untitled Campaign')}
## Generated: {datetime.now().strftime('%Y-%m-%d')}
## Status: VALIDATED

---

## PRIMARY BIG IDEA

**Statement:** {primary['big_idea_statement']}

**Type:** {primary['big_idea_type'].upper()}

**Score:** {primary['scores']['composite']}/10

---

## CAMPAIGN FOUNDATION

### Root Cause
{synthesis_context['strategic_foundation']['root_cause']}

### Villain
**Name:** {synthesis_context['strategic_foundation']['villain']['name']}
**What It Does:** {synthesis_context['strategic_foundation']['villain']['what_it_does']}

### Mechanism
**Name:** {synthesis_context['strategic_foundation']['mechanism']}

### Promise
{synthesis_context['strategic_foundation']['promise']}

### Campaign Thesis
{synthesis_context['strategic_foundation']['campaign_thesis']}

---

## TOP HEADLINES

{format_top_headlines(primary['headlines'][:10])}

---

## RECOMMENDED LEADS

{format_recommended_leads(primary['leads'])}

---

## PROOF ARCHITECTURE

{format_proof_architecture(primary['proof_architecture'])}

---

## BACKUP CANDIDATE

**Statement:** {selected_candidates['backup']['big_idea_statement'] if selected_candidates.get('backup') else 'N/A'}
**Type:** {selected_candidates['backup']['big_idea_type'].upper() if selected_candidates.get('backup') else 'N/A'}
**Score:** {selected_candidates['backup']['scores']['composite'] if selected_candidates.get('backup') else 'N/A'}

---

## DOWNSTREAM HANDOFFS

- **Headlines (06):** Ready - {len(handoffs['to_headlines']['recommended_headlines'])} headlines provided
- **Leads (07):** Ready - {len(handoffs['to_leads']['recommended_leads'])} leads provided
- **VSL Structure (08):** Ready - Architecture defined
- **Proof Demo (10):** Ready - Sequence mapped

---

## SCORES

| Dimension | Score |
|-----------|-------|
| Novelty | {primary['scores']['novelty']}/10 |
| Coherence | {primary['scores']['coherence']}/10 |
| Emotional Impact | {primary['scores']['emotional_impact']}/10 |
| Differentiation | {primary['scores']['differentiation']}/10 |
| **Composite** | **{primary['scores']['composite']}/10** |

---

*Generated by Big Idea Skill v3.0 (Synthesis Mode)*
"""
    return brief
```

---

## PART 4: FINAL OUTPUT SCHEMA

```yaml
big_idea_output:
  # Summary
  summary:
    primary_candidate_id: "enemy_v1"
    primary_big_idea: "The Bad Bugs hijacking your brain's craving signals"
    big_idea_type: "enemy"
    composite_score: 8.41
    campaign_coherence_score: 9.2
    total_candidates_generated: 5
    viable_candidates: 4

  # Primary Big Idea Package
  primary:
    id: "enemy_v1"
    big_idea_statement: "The Bad Bugs hijacking your brain's craving signals"
    big_idea_type: "enemy"

    components:
      root_cause_angle: "Gut microbiome imbalance causes uncontrollable cravings"
      mechanism_angle: "Gut Reset Protocol defeats the Bad Bugs"
      promise_angle: "End cravings in as little as 7 days"
      creative_wrapper: "Hijacking/sci-fi framing - bugs controlling brain"

    headlines: [...]  # Top 12
    leads: [...]      # 3+ fully written
    proof_architecture: {...}

    scores:
      novelty: 8.0
      coherence: 9.2
      emotional_impact: 8.5
      differentiation: 7.8
      composite: 8.41

  # Backup Candidate
  backup:
    id: "mechanism_v1"
    big_idea_statement: "The Gut Reset Protocol: The only way to end cravings at the source"
    scores:
      composite: 7.42

  # Test Variants
  test_variants:
    - id: "discovery_v1"
      big_idea_statement: "UCSF researchers discover the hidden trigger behind uncontrollable cravings"
      scores:
        composite: 7.18

  # Handoffs
  handoffs:
    to_headlines: {...}
    to_leads: {...}
    to_vsl: {...}
    to_proof: {...}

  # Validation
  validation:
    all_checks_passed: true
    anti_slop_clean: true
    campaign_coherent: true
```

---

## GATE 4 CRITERIA

**PASS if:**
- Primary candidate selected with score ≥7.5
- All handoff packages complete
- BIG-IDEA-BRIEF.md generated
- No placeholders in any output
- Campaign coherence validated

**PASS WITH WARNINGS if:**
- PASS criteria met
- But: No backup candidate OR primary score 7.5-8.0

**FAIL if:**
- No primary candidate meets threshold
- Handoffs incomplete
- Brief generation fails
- Placeholders remain in output

On FAIL: Return to Layer 3 for review or escalate to human review.

---

## VALIDATION CHECKLIST

Before output, validate:

- [ ] Primary Big Idea statement complete and compelling
- [ ] All components (RC, Mech, Promise) represented in Big Idea
- [ ] 10+ headlines, fully written, no placeholders
- [ ] 3+ leads, 300+ words each, no outlines
- [ ] Proof architecture complete
- [ ] All handoff packages complete
- [ ] BIG-IDEA-BRIEF.md generated
- [ ] Composite score ≥7.5
- [ ] Anti-slop clean
- [ ] Campaign coherence validated

If any check fails, return to appropriate layer for remediation.
