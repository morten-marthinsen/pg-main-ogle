# Analytical Reasoning Capture Protocol

**Version:** 1.0
**Created:** 2026-03-06
**Purpose:** Preserve selection reasoning at every arena exit and competitive gate
**Status:** ACTIVE

---

## TABLE OF CONTENTS

- [Why This Exists](#why-this-exists)
- [The Pattern It Solves](#the-pattern-it-solves)
- [Capture Points](#capture-points)
- [Capture Format](#capture-format)
- [Integration with Context Reservoir](#integration-with-context-reservoir)

---

## WHY THIS EXISTS

Throughout the marketing-os pipeline, analytical reasoning is used to SELECT outputs — then the reasoning itself is discarded. The winning mechanism is packaged; the arena scorecard that explains WHY it won is dropped. The top FSSIT candidates are ranked; the composite scoring that reveals audience psychology is compressed to a list.

This creates a "game of telephone" effect: downstream skills receive conclusions without justifications, making it impossible to write copy that leverages the DEPTH of the analysis.

---

## THE PATTERN IT SOLVES

**Before this protocol:**

```
Arena Input: 7 mechanism candidates with detailed analysis
Arena Process: 3-round tournament with scoring across 9 dimensions
Arena Output: Winner name + explanation
→ All scoring rationale LOST
→ All runner-up insights LOST
→ Copy skill receives: "The mechanism is called X"
```

**After this protocol:**

```
Arena Input: 7 mechanism candidates with detailed analysis
Arena Process: 3-round tournament with scoring across 9 dimensions
Arena Output: Winner name + explanation + REASONING CAPTURE
→ Why winner won (specific dimensions that differentiated)
→ What runner-up offered (alternative angles available)
→ What the scoring revealed about market positioning
→ Copy skill receives: "The mechanism is called X, and here's WHY
   it's the strongest choice and what dimensions to emphasize"
```

---

## CAPTURE POINTS

### Capture Point 1: Research Quote Classification Exit

**Where:** After Skill 01 classifies 1,000+ quotes into buckets
**What Dies Without Capture:**
- Which quotes had the strongest emotional charge
- Which pain points appeared with highest frequency
- What language patterns emerged across multiple sources
- Which quotes revealed UNSPOKEN feelings (FSSIT seeds)

**Capture Requirement:**

```yaml
research_reasoning_capture:
  quote_volume: [total classified]
  top_quotes_by_category:
    pain: [top 10 with reasoning for selection]
    desire: [top 8 with reasoning]
    failed_solutions: [top 8 with reasoning]
    villain: [top 5 with reasoning]
  frequency_patterns:
    - pattern: "[what kept appearing]"
      count: [times seen]
      significance: "[why this matters]"
  language_discoveries:
    - discovery: "[unexpected phrase or construction]"
      implications: "[what this reveals about the audience]"
  fssit_seeds:
    - seed: "[unspoken feeling detected in quotes]"
      evidence: "[which quotes suggest this]"
```

### Capture Point 2: FSSIT Ranking Exit

**Where:** After Research Skill 2.8-B generates and scores FSSIT candidates
**What Dies Without Capture:**
- Full composite scoring breakdown
- Identity tensions with copy implications
- Which FSSIT statements echo which quotes (evidence chains)
- Temporal relevance scoring (what's timely RIGHT NOW)

**Capture Requirement:**

```yaml
fssit_reasoning_capture:
  total_candidates_generated: [count]
  scoring_method: "[recognition × narrative_potential × temporal]"
  top_candidates:
    - statement: "[FSSIT statement]"
      dimension: "[F/S/S/I/T]"
      scores:
        recognition_strength: [score]
        narrative_reorganization_potential: [score]
        temporal_relevance: [score]
        composite: [score]
      evidence_chain: "[which VOC quotes support this]"
      copy_applications: "[how this could surface in copy]"
  identity_tensions:
    - tension: "[the opposing beliefs]"
      prevalence: "[how common]"
      resolution_direction: "[how copy should resolve this]"
  temporal_factors:
    - factor: "[what's happening NOW that makes certain statements more relevant]"
      affected_candidates: "[which FSSIT statements this amplifies]"
```

### Capture Point 3: Expectation Schema Exit

**Where:** After Research Skill 2.8-B maps the expectation schema
**What Dies Without Capture:**
- Specific staleness scores with evidence
- Whitespace zones with surprise potential ratings
- Schema violation opportunities
- The narrative summary of audience expectations

**Capture Requirement:**

```yaml
expectation_schema_reasoning_capture:
  schema_summary: "[full narrative summary]"
  highest_staleness:
    - pattern: "[exhausted pattern]"
      score: [1-10]
      evidence: "[audience quotes/competitor data]"
  whitespace_zones:
    - zone: "[unexploited territory]"
      surprise_potential: [1-10]
      risk: "[low/medium/high]"
      opportunity: "[how to leverage]"
  violation_opportunities:
    - opportunity: "[specific schema violation]"
      violates: "[which expectation]"
      potential: [1-10]
```

### Capture Point 4: Root Cause Arena Exit

**Where:** After Skill 03 arena selects the winning root cause
**What Dies Without Capture:**
- Expression anchoring evidence (quote penetration scores)
- Why the winner's reframe technique was strongest
- What alternative root causes offered (backup angles)
- Villain characterization depth

**Capture Requirement:**

```yaml
root_cause_reasoning_capture:
  candidates_evaluated: [count]
  winner:
    expression: "[the root cause]"
    reframe_technique: "[type]"
    why_selected: "[specific reasoning]"
  runner_up:
    expression: "[second place]"
    why_not_selected: "[what it lacked]"
    value_preserved: "[what insights from runner-up are still useful]"
  expression_anchoring:
    top_expressions:
      - expression: "[phrase]"
        penetration_score: [score]
        tier1_match: "[pattern]"
        fssit_echo: "[which FSSIT statement]"
    style_insight: "[what expression style works with this audience]"
  villain_depth:
    - villain_name: "[name]"
      characterization_evidence: "[what makes this villain resonate]"
      audience_anger_level: "[from VOC quotes]"
```

### Capture Point 5: Mechanism Arena Exit

**Where:** After Skill 04 arena selects the winning mechanism
**What Dies Without Capture:**
- Full 9-dimension scorecard comparison across candidates
- Which dimensions differentiated winner from runner-up
- E-level classification reasoning
- Metaphor/analogy quality comparisons

**Capture Requirement:**

```yaml
mechanism_reasoning_capture:
  candidates_evaluated: [count]
  winner:
    name: "[mechanism name]"
    e_level: "[E2-E5]"
    average_score: [score]
    why_selected: "[specific reasoning]"
  runner_up:
    name: "[mechanism name]"
    average_score: [score]
    why_not_selected: "[key weakness]"
  key_differentiators:
    - dimension: "[scorecard dimension]"
      winner_score: [score]
      runner_up_score: [score]
      significance: "[why this dimension mattered most]"
  analogy_quality:
    winner_analogy: "[the selected analogy]"
    why_it_works: "[what makes it effective]"
    rejected_analogies: "[others considered and why they lost]"
```

### Capture Point 6: Big Idea / Promise Arena Exit

**Where:** After Skill 05 arena selects the winning Big Idea
**What Dies Without Capture:**
- RSF (Resonance, Surprise, Fascination) scoring rationale
- Schema distance calculation (how far from audience expectations)
- Why the winning idea violates expectations effectively
- Counter-intuitive core identification

**Capture Requirement:**

```yaml
big_idea_reasoning_capture:
  candidates_evaluated: [count]
  winner:
    idea: "[the Big Idea]"
    rsf_scores:
      resonance: [score]
      surprise: [score]
      fascination: [score]
    schema_distance: [score]
    why_selected: "[specific reasoning — what made this the most powerful]"
  counter_intuitive_core:
    insight: "[the surprising truth]"
    conventional_wisdom: "[what audience currently believes]"
    surprise_mechanism: "[why the truth is unexpected]"
    proof_support: "[strongest evidence]"
    emotional_impact: "[how learning this feels]"
  rejected_ideas:
    - idea: "[rejected Big Idea]"
      weakness: "[why it lost]"
      salvageable_element: "[any element worth preserving for copy]"
```

---

## CAPTURE FORMAT

### Standard Capture Block

Every capture point produces a YAML block that is:
1. Appended to the skill's output package (alongside the existing handoff data)
2. Tagged with `_reasoning_capture` suffix for easy identification
3. Consumed by the context reservoir creation process

### Where Captures Are Stored

```
~outputs/[project-code]/reasoning-captures/
  01-research-reasoning.yaml
  01-fssit-reasoning.yaml
  01-expectation-schema-reasoning.yaml
  03-root-cause-arena-reasoning.yaml
  04-mechanism-arena-reasoning.yaml
  05-big-idea-arena-reasoning.yaml
```

### When Captures Are Generated

Captures are generated AUTOMATICALLY at each gate exit using extended thinking. The protocol is:

```
1. Arena/selection process completes normally
2. BEFORE packaging the winner for handoff:
   a. Use extended thinking to articulate WHY the winner won
   b. Capture the specific scoring dimensions that differentiated
   c. Note what the runner-up offered (alternative angles)
   d. Record any evidence chains (VOC quotes → FSSIT → expression anchoring)
3. Write the reasoning capture to the captures directory
4. Package the winner for handoff as normal
```

---

## INTEGRATION WITH CONTEXT RESERVOIR

The reasoning captures feed directly into Part 2 (Strategic Intelligence) of the context reservoir:

```
Research reasoning → VOC quotes (Part 1) + FSSIT intelligence (Part 2)
FSSIT reasoning → FSSIT intelligence section
Expectation schema reasoning → Expectation schema section
Root cause arena reasoning → Arena selection intelligence
Mechanism arena reasoning → Arena selection intelligence
Big idea arena reasoning → Arena selection intelligence + Counter-intuitive core
```

The human operator reviews all reasoning captures when building the context reservoir, selecting the most valuable insights for preservation across session boundaries.

---

## IMPLEMENTATION NOTES

### For Skill Authors

Add this gate check to every arena or selection process:

```
AFTER winner_selected:
  GENERATE reasoning_capture using extended thinking:
    - WHY did this candidate win?
    - WHAT specific dimensions differentiated it?
    - WHAT did the runner-up offer that's still valuable?
    - WHAT evidence chains support the selection?
  WRITE to: ~outputs/[project-code]/reasoning-captures/[skill]-reasoning.yaml
  CONTINUE with normal handoff packaging
```

### For Session Operators

When starting a copy session (Skills 10-20):
1. Load the context reservoir (created from reasoning captures)
2. The reservoir already distills the most important reasoning
3. No need to load individual reasoning capture files — the reservoir is the curated summary

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-06 | Initial creation. Six capture points covering Research, FSSIT, Expectation Schema, Root Cause Arena, Mechanism Arena, and Big Idea Arena exits. |

---

## KEY INSIGHT

> **"The winning mechanism's NAME travels downstream. But WHY it won — which dimension differentiated it, what analogy resonated, what the runner-up lacked — that reasoning is what lets copy writers emphasize the right qualities. Preserve the reasoning, not just the result."**
