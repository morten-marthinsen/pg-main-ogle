# Context Reservoir Template

**Version:** 1.0
**Created:** 2026-03-06
**Purpose:** Preserve the most valuable analytical intelligence across session boundaries
**Status:** ACTIVE

---

## TABLE OF CONTENTS

- [Why This Exists](#why-this-exists)
- [When to Create](#when-to-create)
- [Part 1: Raw Material Arsenal](#part-1-raw-material-arsenal)
- [Part 2: Strategic Intelligence](#part-2-strategic-intelligence)
- [Creation Protocol](#creation-protocol)
- [Loading Protocol](#loading-protocol)
- [Size Guidelines](#size-guidelines)

---

## WHY THIS EXISTS

The marketing-os pipeline generates deep analytical intelligence during foundation skills (00-09) that gets compressed or lost during handoff packaging. Handoff packages preserve OUTPUTS (the selected mechanism, the winning root cause) but discard the REASONING (why it won, what it beat, what patterns were detected).

When copy skills (10-20) run in separate sessions, they lose access to:
- The 1,000+ classified research quotes (compressed to summary stats)
- FSSIT candidate rankings with resonance scores
- Expectation schema mapping (what the audience is numb to)
- Expression anchoring evidence (which phrases penetrate)
- Arena selection reasoning (why the winner beat 6 competitors)
- The campaign brief's strategic anchors

The context reservoir is a human-curated document that captures the most valuable intelligence for copy generation. It is created ONCE after foundation skills complete and loaded into EVERY copy session.

---

## WHEN TO CREATE

Create the context reservoir after ALL of these are complete:
- Skill 01 (Research)
- Skill 02 (Proof Inventory)
- Skill 03 (Root Cause)
- Skill 04 (Mechanism)
- Skill 05 (Big Idea / Promise)
- Skill 06 (Offer Architecture)
- Skill 07 (Persona)
- Skill 08 (Structure)
- Skill 09 (Campaign Brief)

The reservoir is generated using extended thinking (max tokens) to ensure the deepest reasoning is captured, not just surface-level summaries.

---

## PART 1: RAW MATERIAL ARSENAL

**Target Size:** ~8KB
**Purpose:** Preserve the raw ingredients that copy skills need to write authentically

### 1.1 Voice-of-Customer Quotes (25-40 quotes)

Select quotes that are emotionally charged, linguistically distinctive, or strategically important. These are the audience's ACTUAL WORDS that copy should echo.

```yaml
voc_quotes:

  pain_quotes:
    # 8-12 quotes showing the audience's deepest frustrations
    # Prioritize: specific language, emotional intensity, identity-level pain
    - quote: "[exact quote]"
      source: "[forum/survey/interview]"
      why_selected: "[what makes this quote valuable for copy]"

  desire_quotes:
    # 5-8 quotes showing what the audience secretly wants
    # Prioritize: unspoken desires, aspirational language, identity shifts
    - quote: "[exact quote]"
      source: "[source]"
      why_selected: "[value for copy]"

  failed_solutions_quotes:
    # 5-8 quotes showing frustration with what they've already tried
    # Prioritize: specific solutions named, emotional exhaustion, skepticism
    - quote: "[exact quote]"
      source: "[source]"
      why_selected: "[value for copy]"

  villain_quotes:
    # 3-5 quotes showing who/what the audience blames
    # Prioritize: anger, betrayal, specific targets
    - quote: "[exact quote]"
      source: "[source]"
      why_selected: "[value for copy]"

  language_patterns:
    # 3-5 distinctive phrases or speech patterns the audience uses
    # These become "voice anchors" — copy should sound like these people
    - pattern: "[phrase or construction]"
      frequency: "[how common]"
      usage_context: "[when they say this]"
```

### 1.2 Top Proof Elements (10-15 elements)

The strongest proof assets with FULL DETAILS — not summary scores.

```yaml
proof_elements:

  knockout_proof:
    # The single strongest proof element
    - type: "[study/testimonial/credential/data]"
      content: "[full proof statement with specifics]"
      strength: "[score]"
      best_used_in: "[which section — lead, mechanism, close, etc.]"

  clinical_and_research:
    # 3-5 strongest research-backed proof elements
    - type: "[study type]"
      institution: "[name]"
      finding: "[specific finding with numbers]"
      citation: "[how to reference it]"

  testimonials:
    # 3-5 strongest testimonials with FULL stories
    - name: "[name]"
      before: "[situation before]"
      transformation: "[what changed]"
      after: "[result with specifics]"
      quote: "[best direct quote from testimonial]"

  authority_proof:
    # 2-3 strongest credibility elements
    - type: "[credential/endorsement/media mention]"
      detail: "[full detail]"
      credibility_value: "[why this matters to the audience]"
```

### 1.3 Customer Language Patterns

```yaml
customer_language:

  how_they_describe_the_problem:
    # The exact words/phrases the audience uses for their problem
    - "[phrase 1]"
    - "[phrase 2]"

  how_they_describe_desired_outcome:
    # The exact words/phrases for what they want
    - "[phrase 1]"
    - "[phrase 2]"

  sophistication_markers:
    # What reveals their awareness level
    - "[marker — e.g., 'I've tried everything']"

  skepticism_triggers:
    # What language makes them tune out
    - "[trigger — e.g., 'breakthrough discovery']"

  trust_signals:
    # What language makes them lean in
    - "[signal — e.g., specific numbers, named studies]"
```

---

## PART 2: STRATEGIC INTELLIGENCE

**Target Size:** ~8KB
**Purpose:** Preserve the analytical reasoning that shaped strategic decisions

### 2.1 FSSIT Intelligence

The top FSSIT candidates with their resonance data — the audience's unspoken feelings that copy should crystallize.

```yaml
fssit_intelligence:

  top_candidates:
    # 5-8 highest-scoring FSSIT statements
    - statement: "[the FSSIT statement]"
      dimension: "[F/S/S/I/T]"
      recognition_strength: [score]
      narrative_reorganization_potential: [score]
      temporal_relevance: [score]
      composite_score: [score]
      why_it_resonates: "[what makes this psychologically powerful]"

  identity_tensions:
    # 2-3 identity tensions the audience experiences
    - tension: "[e.g., 'I should be able to figure this out' vs 'nothing works']"
      copy_implication: "[how this tension should surface in copy]"

  emotional_undercurrent:
    # The dominant unspoken emotional state
    summary: "[1-2 sentences describing the emotional reality beneath the surface]"
```

### 2.2 Expectation Schema

What the audience expects to see — and where surprise potential exists.

```yaml
expectation_schema:

  highest_staleness_zones:
    # Top 3-5 most exhausted patterns in this market
    - pattern: "[what's stale]"
      staleness_score: [1-10]
      audience_response: "[numb/skeptical/hostile]"

  whitespace_zones:
    # Top 3-5 areas of untapped messaging potential
    - zone: "[what's unexploited]"
      surprise_potential: [1-10]
      risk_level: "[low/medium/high]"

  schema_summary: "[3-5 sentence narrative: 'This audience expects to see...']"
```

### 2.3 Expression Anchoring Evidence

Which phrases and expression patterns penetrate with this audience.

```yaml
expression_anchoring:

  highest_penetration_expressions:
    # 5-8 expressions that scored highest in anchoring analysis
    - expression: "[the phrase or construction]"
      penetration_score: [score]
      tier1_pattern_match: "[which TIER1 pattern it matches]"
      fssit_echo: "[which FSSIT statement it echoes]"

  expression_style_that_works:
    # Summary of what style of expression resonates
    summary: "[e.g., 'Direct, specific, slightly aggressive phrasing outperforms
              academic or gentle framing. Numbers beat generalities. Named villains
              beat abstract problems.']"
```

### 2.4 Arena Selection Intelligence

Why the winners won — the reasoning behind strategic selections.

```yaml
arena_intelligence:

  mechanism_selection:
    winner: "[mechanism name]"
    runner_up: "[second place]"
    why_winner_won: "[specific reasoning — what dimension differentiated]"
    what_runner_up_lacked: "[key weakness]"
    key_scorecard_differentiators:
      - dimension: "[e.g., visual_metaphor]"
        winner_score: [score]
        runner_up_score: [score]
        significance: "[why this mattered]"

  root_cause_selection:
    winner: "[root cause expression]"
    why_selected: "[what made this root cause the most powerful]"
    reframe_technique: "[not_your_fault/conspiracy/hidden_truth/etc.]"

  big_idea_selection:
    winner: "[big idea / promise]"
    schema_distance: [score]
    rsf_scores:
      resonance: [score]
      surprise: [score]
      fascination: [score]
    why_it_won: "[specific reasoning]"
```

### 2.5 Counter-Intuitive Core

The central surprising truth that drives the campaign.

```yaml
counter_intuitive_core:

  the_insight: "[1-2 sentence statement of the counter-intuitive truth]"

  what_audience_currently_believes: "[the conventional wisdom]"

  why_the_truth_is_surprising: "[what makes this genuinely unexpected]"

  proof_that_supports_it: "[the strongest evidence for this counter-intuitive claim]"

  emotional_impact: "[how learning this truth makes the audience FEEL]"
```

### 2.6 Campaign Brief Strategic Anchors

The key strategic decisions from the campaign brief that every copy section must honor.

```yaml
campaign_brief_anchors:

  campaign_thesis: "[the central argument the campaign makes]"

  tone_direction: "[clinical/emotional/urgent/conversational]"

  avatar_summary: "[2-3 sentences about who we're writing for]"

  market_sophistication: [1-5]

  proof_approach: "[how proof should be deployed]"

  key_constraints:
    # Any strategic constraints from the brief
    - "[constraint 1]"
    - "[constraint 2]"

  promise_ceiling: "[maximum defensible promise level]"
```

---

## CREATION PROTOCOL

### Who Creates It

The human operator creates the context reservoir after reviewing all foundation skill outputs. Claude assists by extracting and organizing, but the HUMAN decides what's most valuable.

### Step-by-Step Process

```
1. COMPLETE all foundation skills (00-09)

2. REVIEW all handoff packages with Claude using extended thinking

3. EXTRACT raw material arsenal:
   a. Pull 25-40 best quotes from classified_quotes.json
   b. Pull top 10-15 proof elements with full details from proof-inventory-output.json
   c. Pull customer language patterns from research outputs

4. EXTRACT strategic intelligence:
   a. Pull top FSSIT candidates from FSSIT-RANKING.md
   b. Pull expectation schema summary from expectation_schema.json
   c. Pull expression anchoring top performers from expression-anchoring output
   d. Pull arena selection reasoning from arena decision logs
   e. Synthesize counter-intuitive core from root cause + big idea
   f. Pull campaign brief anchors from campaign-brief-package.json

5. REVIEW the assembled reservoir for completeness:
   - Does it contain enough raw material to write authentic copy?
   - Does it preserve the strategic reasoning that matters most?
   - Is it under the ~15-17KB target?

6. SAVE as: ~outputs/[project-code]/context-reservoir.md
```

### Quality Checklist

- [ ] 25+ voice-of-customer quotes with source attribution
- [ ] 10+ proof elements with FULL details (not just scores)
- [ ] Customer language patterns documented
- [ ] Top 5+ FSSIT candidates with scores and reasoning
- [ ] Expectation schema summary present
- [ ] Expression anchoring top performers listed
- [ ] Arena selection reasoning captured for mechanism, root cause, and big idea
- [ ] Counter-intuitive core clearly stated
- [ ] Campaign brief anchors present
- [ ] Total size under 17KB

---

## LOADING PROTOCOL

### When to Load

Load the context reservoir at the START of every copy session (Skills 10-20).

### How to Load

```
1. Read: ~outputs/[project-code]/context-reservoir.md
2. Hold in active context alongside the skill's upstream packages
3. Reference during generation — the reservoir provides:
   - Authentic voice (quotes and language patterns)
   - Proof details (for natural weaving)
   - Strategic guardrails (FSSIT, schema, anchoring)
   - Decision rationale (why these choices were made)
```

### What It Does NOT Replace

The context reservoir supplements — it does not replace — the upstream loader packages. Each copy skill still loads its specific upstream packages for structural data (section sequence, word budgets, handoff metadata). The reservoir adds the DEPTH that handoff packages compress away.

---

## SIZE GUIDELINES

| Section | Target Size | Minimum | Maximum |
|---------|-------------|---------|---------|
| Part 1: Raw Material Arsenal | ~8KB | 5KB | 10KB |
| Part 2: Strategic Intelligence | ~8KB | 5KB | 10KB |
| **Total** | **~15-17KB** | **10KB** | **20KB** |

If the reservoir exceeds 20KB, trim lower-priority quotes and proof elements first. The strategic intelligence section should not be compressed — that reasoning is irreplaceable.

---

## OUTPUT LOCATION

Save to: `~outputs/[project-code]/context-reservoir.md`

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-06 | Initial creation. Two-part architecture (Raw Material Arsenal + Strategic Intelligence) designed to preserve analytical reasoning across session boundaries. |

---

## KEY INSIGHT

> **"Handoff packages tell you WHAT was decided. The context reservoir tells you WHY it was decided and gives you the raw material to write copy that sounds like the audience, not like a summary of the audience."**
