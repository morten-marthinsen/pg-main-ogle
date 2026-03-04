# Synthesizer Layer (Layer 2.6) — Master Architecture

**Version:** 2.1
**Created:** 2026-02-05
**Updated:** 2026-02-05
**Purpose:** Dual-role Synthesizer architecture (single-context AND Agent Team modes) — The Architect competes as 7th Arena competitor (Rounds 1-3) AND creates phrase-level hybrids post-Arena

---

## CRITICAL INSIGHT

**The Problem:** In Arena Layer (2.5), 7 competitors each generate complete outputs across 3 rounds. Even after critique-revise cycles and learning briefs, no single competitor typically "nails it" — each optimizes for their editorial lens at the expense of others. The BEST output often combines:
- A killer phrase from Halbert
- A mechanism hint from Clemens
- A credibility signal from Ogilvy
- Flow structure from Makepeace
- Balanced integration from The Architect

**The Solution:** The Synthesizer Layer performs **phrase-level extraction and reconstruction** — identifying the strongest micro-elements from each competitor's Round 3 output and writing new hybrid outputs that combine them coherently.

**Key Distinction:** The Synthesizer doesn't swap whole sections. It extracts the best **phrases, words, and sentence fragments** from within each competitor's output and reconstructs new unified outputs.

---

## POSITION IN EXECUTION FLOW

```
Layer 2: Drafting/Generation
    ↓
ROUND 1: 7 Competitors Generate → Critique → Revise → Score → Learn
    ↓
ROUND 2: 7 Competitors Re-generate → Critique → Revise → Score → Learn
    ↓
ROUND 3: 7 Competitors Generate FINAL → Critique → Revise → FINAL Score
    ↓
Layer 2.6: SYNTHESIZER (Phrase-Level Hybrid Creation from 7 Round 3 outputs)
    ↓
HUMAN SELECTION (7 Pure + 2-3 Hybrids = 9-10 Options)
    ↓
Layer 3: Validation
    ↓
Layer 4: Output
```

The Synthesizer operates AFTER all 3 Arena rounds complete but BEFORE human selection.

**Reference:** See `Skills/ARENA-CORE-PROTOCOL.md` for the full 3-round Arena execution protocol.

---

## THE ARCHITECT — DUAL ROLE SPECIFICATION

### Identity

**Name:** The Architect
**Role:** Dual — In-Arena Competitor (Rounds 1-3) + Post-Arena Synthesizer

### The Dual Role

| Role | When | What | How |
|------|------|------|-----|
| **In-Arena Competitor** | Rounds 1-3 | Generates ONE integrated output competing head-to-head | Approaches task with multi-lens integration — simultaneously considers flow, entertainment, market calibration, credibility, mechanism clarity, and proof architecture |
| **Post-Arena Hybrid Creator** | After Round 3 | Creates 2-3 phrase-level hybrids from all 7 Round 3 outputs | Decomposes, scores micro-elements, reconstructs coherent hybrids |

### In-Arena Competitor Behavior

When competing in Rounds 1-3, The Architect:
- Generates a COMPLETE output from scratch (not synthesis of others)
- Integrates multiple editorial lenses simultaneously
- Targets the highest TOTAL score across all 7 criteria (balanced optimization)
- In Rounds 2-3: Has unique advantage — saw ALL other outputs from previous round + Learning Brief
- Maintains consistent "integration voice" — clear, balanced, no single persona dominating

### Post-Arena Synthesizer Behavior

After Round 3, The Architect switches to Synthesizer mode:
- No longer generates original output
- Decomposes all 7 Round 3 outputs into micro-elements
- Creates 2-3 phrase-level hybrids from the best elements
- These hybrids compete alongside the 7 pure outputs for human selection

### What Makes The Architect Different

| Regular Persona | The Architect (In-Arena) | The Architect (Post-Arena) |
|-----------------|-------------------------|---------------------------|
| Optimizes for specific lens | Optimizes for COMBINATION of strengths | Extracts and combines best micro-elements |
| Generates from one perspective | Generates from integrated perspective | Does NOT generate from scratch |
| Creates one complete output | Creates one integrated output | Creates 2-3 hybrid outputs from existing material |
| Competes with other personas | Competes with other personas | Curates and combines all competitors' work |

### Core Capabilities

1. **Multi-Lens Integration** — Simultaneously apply flow, entertainment, market calibration, credibility, mechanism clarity, and proof architecture
2. **Balanced Optimization** — Find the output that scores highest across ALL criteria, not just a few
3. **Micro-Element Decomposition** — Break outputs into smallest meaningful units
4. **Function Tagging** — Identify what each phrase accomplishes
5. **Cross-Persona Scoring** — Score each micro-element on its function
6. **Best-Element Identification** — Find highest-scoring phrase for each function across all 7 competitors
7. **Hybrid Reconstruction** — WRITE new outputs using best phrases as ingredients
8. **Coherence Preservation** — Ensure hybrids read as unified, not Frankensteined
9. **Attribution Tracking** — Record which competitor contributed each element

---

## THE SYNTHESIS PROCESS

### Phase 1: Micro-Element Decomposition

Break each persona's output into the smallest meaningful units.

**For Headlines (single sentence):**
```yaml
decomposition_level: word_phrase
micro_elements:
  - specificity_hook      # "The 3-Second", "The 47-Day"
  - mechanism_hint        # "Biomechanical Switch", "Neural Reset"
  - outcome_promise       # "Adds 30 Yards", "Eliminates Pain"
  - ease_qualifier        # "Without Changing Your Swing"
  - curiosity_device      # "Your Doctor Doesn't Know"
  - authority_signal      # "Stanford Study", "Nobel Prize"
  - social_proof_hint     # "47,000 Golfers", "Millions Have"
  - emotional_trigger     # "Finally", "At Last", "Never Again"
```

**For Leads (3-5 paragraphs):**
```yaml
decomposition_level: sentence_phrase
micro_elements:
  - opening_hook_sentence
  - problem_amplification_phrases
  - mechanism_tease_sentence
  - credibility_signal_phrase
  - emotional_peak_sentence
  - curiosity_gap_phrase
  - transition_sentence
```

**For Stories (full narrative):**
```yaml
decomposition_level: sentence_within_beat
micro_elements:
  - beat_opening_sentence
  - emotional_detail_phrases
  - dialogue_lines
  - sensory_description_phrases
  - mechanism_revelation_sentence
  - transition_to_next_beat
```

### Phase 2: Function Tagging

Tag each micro-element with its persuasive function:

```yaml
function_taxonomy:
  # Attention Functions
  - pattern_interrupt      # Stops the scroll
  - curiosity_gap          # Creates information gap
  - specificity_anchor     # Concrete numbers/details

  # Credibility Functions
  - authority_signal       # Expert/institution reference
  - social_proof_hint      # Numbers of people
  - credential_marker      # Titles, achievements

  # Mechanism Functions
  - mechanism_name         # The named system/method
  - mechanism_hint         # Scientific/technical language
  - mechanism_metaphor     # Graspable analogy

  # Promise Functions
  - outcome_promise        # What they'll achieve
  - timeframe_promise      # How fast
  - ease_qualifier         # Without sacrifice
  - transformation_marker  # Before/after implication

  # Emotional Functions
  - pain_amplification     # Problem intensification
  - hope_injection         # Possibility feeling
  - vindication_signal     # "Finally" / "At last"
  - fear_trigger           # Risk/loss language

  # Flow Functions
  - transition_phrase      # Connects ideas
  - rhythm_element         # Sentence cadence
  - callback_reference     # Links to earlier content
```

### Phase 3: Cross-Persona Scoring

Score each micro-element against these criteria:

| Criterion | Weight | What It Measures |
|-----------|--------|------------------|
| Function Strength | 30% | How well does it accomplish its function? |
| Specificity | 20% | Concrete vs. vague |
| Originality | 15% | Fresh vs. clichéd |
| Emotional Impact | 15% | Feeling it evokes |
| Voice Quality | 10% | Sounds human, not AI |
| Brevity | 10% | Achieves impact with fewer words |

**Scoring Scale:** 1-10

**Example Scoring:**
```yaml
micro_element_scores:
  function: specificity_hook

  persona_phrases:
    halbert:
      phrase: "The 3-Second"
      scores:
        function_strength: 9
        specificity: 10
        originality: 7
        emotional_impact: 8
        voice_quality: 9
        brevity: 10
      weighted_total: 8.75

    makepeace:
      phrase: "The Simple"
      scores:
        function_strength: 5
        specificity: 3
        originality: 4
        emotional_impact: 5
        voice_quality: 8
        brevity: 9
      weighted_total: 5.15

    clemens:
      phrase: "The Biomechanical"
      scores:
        function_strength: 8
        specificity: 8
        originality: 8
        emotional_impact: 7
        voice_quality: 8
        brevity: 7
      weighted_total: 7.75

  winner: halbert ("The 3-Second") @ 8.75
```

### Phase 4: Best-Element Matrix

Build a matrix of winning phrases by function:

```yaml
best_element_matrix:
  # Headlines Example
  headline_functions:
    specificity_hook:
      winner: "The 3-Second"
      source: halbert
      score: 8.75

    mechanism_hint:
      winner: "Biomechanical Switch"
      source: clemens
      score: 9.0

    outcome_promise:
      winner: "Adds 30 Yards"
      source: clemens
      score: 9.5

    ease_qualifier:
      winner: "Without Changing Your Swing"
      source: clemens
      score: 9.0

    authority_signal:
      winner: "Stanford Study Reveals"
      source: ogilvy
      score: 8.5

    social_proof_hint:
      winner: "47,000 Golfers Have Used"
      source: bencivenga
      score: 8.8
```

### Phase 5: Hybrid Reconstruction

**CRITICAL:** The Synthesizer WRITES new outputs — it doesn't just splice phrases together.

**Process:**
1. Select 3-4 winning phrases that can logically combine
2. Write a new unified output incorporating those phrases
3. Add connector words/transitions as needed
4. Ensure grammatical correctness
5. Verify the hybrid reads naturally

**Example:**
```yaml
hybrid_construction:
  hybrid_a:
    selected_ingredients:
      - "The 3-Second" (halbert) - specificity_hook
      - "Biomechanical Switch" (clemens) - mechanism_hint
      - "Adds 30 Yards" (clemens) - outcome_promise
      - "Without Changing Your Swing" (clemens) - ease_qualifier

    # Synthesizer WRITES (not splices):
    output: "The 3-Second Biomechanical Switch That Adds 30 Yards Without Changing Your Swing"

    attribution:
      halbert_contribution: 15%  # "The 3-Second"
      clemens_contribution: 85%  # Rest of headline

  hybrid_b:
    selected_ingredients:
      - "Stanford Study Reveals" (ogilvy) - authority_signal
      - "The 3-Second" (halbert) - specificity_hook
      - "Switch" (clemens) - mechanism_hint
      - "47,000 Golfers" (bencivenga) - social_proof_hint

    output: "Stanford Study Reveals the 3-Second Switch 47,000 Golfers Are Using to Add 30 Yards"

    attribution:
      ogilvy_contribution: 25%
      halbert_contribution: 20%
      clemens_contribution: 25%
      bencivenga_contribution: 30%

  hybrid_c:
    selected_ingredients:
      - "Why" (schwartz) - curiosity_frame
      - "Weekend Golfers" (schwartz) - audience_call
      - "Biomechanical Switch" (clemens) - mechanism_hint
      - "Out-Driving Scratch Players" (schwartz) - aspirational_outcome

    output: "Why Weekend Golfers Are Using This Biomechanical Switch to Out-Drive Scratch Players"

    attribution:
      schwartz_contribution: 70%
      clemens_contribution: 30%
```

### Phase 6: Coherence Validation

Every hybrid MUST pass coherence checks:

```yaml
coherence_checklist:
  - grammatically_correct: [YES/NO]
  - reads_naturally: [YES/NO]      # No awkward transitions
  - consistent_voice: [YES/NO]     # Doesn't shift tone mid-sentence
  - logical_flow: [YES/NO]         # Ideas connect sensibly
  - no_redundancy: [YES/NO]        # Doesn't repeat concepts
  - appropriate_length: [YES/NO]   # Within expected range for format

  IF ANY "NO" → Rewrite hybrid until all pass
```

**Coherence Red Flags:**
- Jarring tone shifts ("The AMAZING 3-Second biomechanical methodology")
- Redundant concepts ("The 3-Second quick fast switch")
- Awkward grammar ("The switch that biomechanical adds yards")
- Mixed register (formal + casual in same phrase)

### Phase 7: Final Candidate Assembly

Present to human:
- 7 Pure competitor outputs (unchanged Round 3 finals)
- 2-3 Hybrid outputs (from Synthesizer)
- **Total: 9-10 candidates**

```yaml
final_candidates:
  pure_outputs:
    - makepeace_output: "[full text]"
    - halbert_output: "[full text]"
    - schwartz_output: "[full text]"
    - ogilvy_output: "[full text]"
    - clemens_output: "[full text]"
    - bencivenga_output: "[full text]"
    - architect_output: "[full text]"

  hybrid_outputs:
    - hybrid_a:
        output: "[full text]"
        composition: "halbert(15%) + clemens(85%)"
        rationale: "Combines Halbert's specificity hook with Clemens' mechanism clarity"

    - hybrid_b:
        output: "[full text]"
        composition: "ogilvy(25%) + halbert(20%) + clemens(25%) + bencivenga(30%)"
        rationale: "Authority + specificity + mechanism + social proof blend"

    - hybrid_c:
        output: "[full text]"
        composition: "schwartz(70%) + clemens(30%)"
        rationale: "Market-calibrated framing with mechanism clarity"
```

---

## SKILL-SPECIFIC DECOMPOSITION GUIDES

### 10-Headlines

**Output Length:** 1 sentence (8-15 words typical)
**Decomposition Level:** Word/phrase
**Typical Micro-Elements:** 3-5

```yaml
headline_micro_elements:
  required:
    - primary_hook          # The attention-grabbing opening
    - core_promise          # What they'll get

  optional:
    - mechanism_hint        # Named system/method
    - specificity_anchor    # Number, timeframe
    - ease_qualifier        # "Without", "Even if"
    - authority_signal      # Expert/institution
    - curiosity_device      # Question, intrigue
    - audience_call         # Who this is for
```

**Example Decomposition:**
```
"The 3-Second Biomechanical Switch That Adds 30 Yards Without Changing Your Swing"

├── "The 3-Second" → specificity_anchor
├── "Biomechanical Switch" → mechanism_hint
├── "That Adds 30 Yards" → core_promise
└── "Without Changing Your Swing" → ease_qualifier
```

### 11-Lead

**Output Length:** 3-5 paragraphs (200-400 words typical)
**Decomposition Level:** Sentence/phrase within paragraph
**Typical Micro-Elements:** 8-12

```yaml
lead_micro_elements:
  paragraph_1_opening:
    - hook_sentence         # First sentence that stops them
    - curiosity_amplifier   # Deepens the intrigue

  paragraph_2_problem:
    - pain_statement        # The problem they face
    - agitation_phrase      # Makes it worse
    - false_solution_hint   # What hasn't worked

  paragraph_3_pivot:
    - discovery_tease       # Something new exists
    - mechanism_hint        # What it is (vague)
    - credibility_phrase    # Why believe this

  paragraph_4_promise:
    - outcome_preview       # What's possible
    - specificity_detail    # Concrete result

  paragraph_5_transition:
    - curiosity_bridge      # "Here's what I discovered..."
    - open_loop             # Unresolved tension
```

**Synthesis Strategy:**
- Score each paragraph's key sentences
- Identify strongest hook sentence (often Halbert)
- Identify strongest credibility phrase (often Ogilvy)
- Identify strongest mechanism tease (often Clemens)
- Reconstruct lead using best sentences with smooth transitions

### 12-Story

**Output Length:** Full narrative (500-1500 words typical)
**Decomposition Level:** Sentence within beat
**Typical Micro-Elements:** 15-25 (varies by story length)

```yaml
story_micro_elements:
  per_beat:
    - beat_opening          # First sentence of beat
    - emotional_peak        # Highest emotion moment
    - sensory_detail        # Vivid description
    - dialogue_line         # If applicable
    - transition_out        # Bridge to next beat

  story_level:
    - hook_sentence         # Very first sentence
    - vulnerability_moment  # Cry for help
    - revelation_sentence   # Mechanism discovery
    - transformation_marker # Change happened
    - callback_to_opening   # Ties back
```

**Synthesis Strategy:**
- Score beat-by-beat, not whole story
- Identify strongest opening hook (often Halbert)
- Identify strongest vulnerability moment (often Halbert)
- Identify strongest mechanism revelation (often Clemens)
- Identify strongest flow/transitions (often Makepeace)
- Reconstruct story beat by beat using best sentences

### 13-Root-Cause-Narrative

**Output Length:** 3-7 phases (400-800 words typical)
**Decomposition Level:** Sentence/phrase within phase
**Typical Micro-Elements:** 12-18

```yaml
root_cause_micro_elements:
  phase_1_authority:
    - credibility_opener    # Establishes right to speak
    - authority_marker      # Credentials/experience

  phase_2_empathy:
    - pain_acknowledgment   # "I know you've tried..."
    - frustration_echo      # Mirrors their feelings

  phase_3_reveal:
    - pivot_sentence        # "But here's the thing..."
    - root_cause_statement  # The actual root cause
    - blame_removal         # "It's not your fault"

  phase_4_explanation:
    - villain_introduction  # Who/what is to blame
    - mechanism_preview     # How the villain works

  phase_5_bridge:
    - hope_injection        # "But now there's a way..."
    - curiosity_forward     # Leads to mechanism
```

### 14-Mechanism-Narrative

**Output Length:** 4-6 phases (300-600 words typical)
**Decomposition Level:** Sentence/phrase within phase
**Typical Micro-Elements:** 10-15

```yaml
mechanism_micro_elements:
  naming_moment:
    - buildup_sentence      # Creates anticipation
    - reveal_sentence       # The name itself
    - anchor_phrase         # Memorable description

  explanation:
    - metaphor_sentence     # Graspable analogy
    - science_sentence      # Technical backing
    - simplification        # "Think about it this way..."

  proof_integration:
    - study_reference       # Research backing
    - result_statement      # What it achieves
```

### 16-Offer-Copy

**Output Length:** Multiple sections (800-1500 words typical)
**Decomposition Level:** Sentence within section
**Typical Micro-Elements:** 20-30

```yaml
offer_micro_elements:
  deliverable_block:
    - deliverable_name      # What it's called
    - feature_statement     # What it is
    - why_statement         # Why it matters
    - benefit_statement     # What they get
    - proof_statement       # Why believe it

  value_demonstration:
    - if_all_sentence       # "If all it did was..."
    - reason_statement      # Why that's worth it

  price_reveal:
    - anchor_statement      # Higher value reference
    - price_statement       # Actual price
    - justification         # Why it's worth it

  cta:
    - action_phrase         # What to do
    - urgency_phrase        # Why now
    - confidence_phrase     # Remove fear
```

### 17-Close

**Output Length:** Multiple paragraphs (400-800 words typical)
**Decomposition Level:** Sentence/phrase
**Typical Micro-Elements:** 15-20

```yaml
close_micro_elements:
  benefit_summary:
    - you_get_statements    # List of what's included

  future_pacing:
    - vision_sentence       # What life looks like
    - contrast_sentence     # Vs. doing nothing

  guarantee:
    - promise_statement     # What you guarantee
    - confidence_phrase     # Why you can promise it

  cta_variations:
    - confidence_cta        # "Join thousands who..."
    - consequence_cta       # "Don't let another day..."
    - urgency_cta           # "Supplies are limited..."

  ps_section:
    - bonus_reminder        # Extra value
    - testimonial_tease     # Social proof
    - final_urgency         # Last push
```

### 20-Editorial (Revisions)

**Output Length:** Varies by issue being fixed
**Decomposition Level:** Depends on issue type
**Typical Micro-Elements:** 3-10 per revision

```yaml
editorial_micro_elements:
  flow_revision:
    - transition_phrase     # Connecting sentence
    - rhythm_adjustment     # Sentence length variety

  clarity_revision:
    - simplified_phrase     # Clearer version
    - concrete_detail       # Added specificity

  voice_revision:
    - tone_phrase           # Voice-consistent language
    - personality_marker    # Human touch
```

---

## HYBRID GENERATION RULES

### Rule 1: Minimum Ingredient Diversity

Each hybrid must draw from **at least 2 different competitors**.
- Hybrid with 100% from one persona = just that persona's output (redundant)
- Target: 2-4 competitor contributions per hybrid

### Rule 2: Function Coverage

Hybrids should cover the key functions for that output type:
- Headlines: Must have hook + promise (minimum)
- Leads: Must have hook + problem + pivot (minimum)
- Stories: Must have opening + vulnerability + revelation (minimum)

### Rule 3: Coherence Over Optimization

A slightly lower-scoring hybrid that reads naturally beats a higher-scoring hybrid that feels stitched together.

```
PRIORITIZE:
Coherent 8.5 hybrid > Awkward 9.0 hybrid
```

### Rule 4: Diversity of Hybrids

The 2-3 hybrids should offer meaningfully different approaches:
- Hybrid A: Hook-optimized (Halbert-heavy)
- Hybrid B: Credibility-optimized (Ogilvy/Bencivenga-heavy)
- Hybrid C: Market-calibrated (Schwartz-heavy)

Don't create 3 hybrids that are minor variations of each other.

### Rule 5: Attribution Transparency

Always track and report which persona contributed what:
```yaml
attribution:
  hybrid_a:
    halbert: 40%    # Hook, emotional phrases
    clemens: 35%    # Mechanism language
    ogilvy: 25%     # Credibility phrases
```

This enables learning about which persona combinations work best.

---

## QUALITY THRESHOLDS

### Minimum Hybrid Quality

Hybrids must score **>= 8.0 weighted average** to be presented to human.

If a hybrid scores below 8.0 after coherence adjustments:
1. Try different phrase combinations
2. If still below threshold, drop that hybrid
3. Present fewer hybrids rather than weak hybrids

### Coherence Threshold

All coherence checklist items must pass (6/6).

### Diversity Threshold

At least 2 meaningfully different hybrids should be presented.
- If only 1 quality hybrid possible → present 1
- If 0 quality hybrids possible → present only 6 pure outputs

---

## INTEGRATION WITH ARENA LAYER

### Updated Arena Flow (v3.0 — 3-Round + 7 Competitors)

```yaml
arena_execution:
  round_1:
    generation:
      - makepeace_generates → output_1
      - halbert_generates → output_2
      - schwartz_generates → output_3
      - ogilvy_generates → output_4
      - clemens_generates → output_5
      - bencivenga_generates → output_6
      - architect_generates → output_7  # 7th competitor
    critique: adversarial_critic evaluates all 7
    revision: each competitor fixes their identified weakness
    scoring: score all 7 against 7 criteria, rank 1-7
    learning_brief: extract winner techniques

  round_2:
    learning_distributed: all 7 receive Learning Brief
    generation: 7 competitors re-generate incorporating learnings
    critique: adversarial_critic evaluates all 7
    revision: each competitor fixes their identified weakness
    scoring: score all 7, rank 1-7
    cumulative_learning_brief: rounds 1+2 learnings combined

  round_3:
    cumulative_learning_distributed: all 7 receive Cumulative Learning Brief
    generation: 7 competitors generate FINAL versions
    critique: final adversarial check
    revision: precision fixes
    final_scoring: definitive scoring
    final_ranking: all 7 ranked definitively

  post_arena_synthesis:
    - The Architect switches to Synthesizer mode
    - decompose all 7 Round 3 outputs into micro-elements
    - score each micro-element
    - build best-element matrix
    - construct 2-3 hybrids
    - validate coherence
    - score hybrids against 7 criteria

  human_selection:
    - present 7 pure outputs (ranked)
    - present 2-3 hybrids (ranked)
    - human selects winner
    - BLOCKING — no auto-selection

  proceed:
    - selected output → Layer 3 validation
```

**Reference:** See `Skills/ARENA-CORE-PROTOCOL.md` for complete 3-round execution protocol.

---

## AGENT TEAM EXECUTION MODE

When running in **Agent Team mode** (Claude Code Agent Teams enabled), the Synthesizer Layer operates differently from single-context execution. The Architect runs as a **separate teammate agent** with its own dedicated 200K context window, fundamentally changing how synthesis is performed.

### The Architect Agent — Dual-Phase Operation

In Agent Team mode, The Architect Agent operates in two distinct phases:

**Phase 1: Competition (Rounds 1-3)**
- The Architect Agent generates as a **competitor**, exactly like the other 6 persona agents (Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga)
- Generates complete outputs from its integrated multi-lens perspective
- Participates in critique-revise cycles
- Receives and incorporates Learning Briefs between rounds
- Uses `effort: max` for all generation and revision

**Phase 2: Synthesis (Post-Round 3)**
- After Round 3 completes, the Architect Agent **switches to Synthesizer role**
- The Team Lead sends ALL 7 Round 3 outputs (full text) to the Architect Agent
- The Architect Agent performs phrase-level decomposition, scoring, and hybrid reconstruction
- Uses `effort: max` for all synthesis operations

### What the Architect Agent Receives for Synthesis

The Architect Agent's synthesis context includes a complete, self-contained package:

```yaml
architect_synthesis_package:
  # All 7 Round 3 outputs — FULL TEXT, not summaries
  round_3_outputs:
    - makepeace_output: "[complete Round 3 final text]"
    - halbert_output: "[complete Round 3 final text]"
    - schwartz_output: "[complete Round 3 final text]"
    - ogilvy_output: "[complete Round 3 final text]"
    - clemens_output: "[complete Round 3 final text]"
    - bencivenga_output: "[complete Round 3 final text]"
    - architect_output: "[complete Round 3 final text]"

  # Skill criteria for scoring micro-elements
  skill_criteria: "[7 skill-specific judging criteria with weights]"

  # Upstream packages for context
  upstream_packages: "[root cause, mechanism, promise, big idea, structure — as needed]"

  # Type-matched specimens for quality reference
  specimens: "[loaded from skill's 0.2.6-curated-gold-specimens.md]"

  # Synthesis instructions
  instructions: "[full Synthesizer Layer protocol — this document]"
```

### Why Agent Team Mode Transforms Synthesis Quality

| Single-Context Limitation | Agent Team Advantage |
|--------------------------|---------------------|
| By synthesis time, context is heavily loaded from 3 rounds of 7 competitors | Architect Agent receives synthesis package in a **fresh 200K context** — no accumulated load |
| Non-winning outputs compressed to summaries between rounds — synthesis works with partial information | ALL 7 Round 3 outputs delivered as **full text** — synthesis works with complete information |
| Context pressure causes rushed decomposition and shallow scoring | `effort: max` with clean context enables **deep analytical reasoning** for every micro-element |
| Architect's own Round 3 output may bias hybrid construction | Fresh context with all 7 outputs as equal inputs reduces **self-output bias** |

### Context Compression NOT Needed for Synthesis

In single-context mode, aggressive context compression between rounds is necessary to stay within window limits. This means the Synthesizer often works with compressed summaries of non-winning outputs rather than full text.

**In Agent Team mode, context compression is NOT needed for synthesis.** The Architect Agent receives all 7 Round 3 outputs fresh in its own 200K context window. No information is lost. No summaries substitute for full text. The Synthesizer has access to every word, every phrase, every micro-element from every competitor's final output.

This is the single biggest quality improvement Agent Team mode provides to the Synthesizer Layer — the difference between decomposing compressed summaries and decomposing complete outputs.

### Effort Configuration

| Phase | Effort Level | Reasoning |
|-------|-------------|-----------|
| Competition (Rounds 1-3) | `max` | The Architect must generate elite integrated outputs to compete credibly |
| Synthesis — Decomposition | `max` | Breaking 7 complete outputs into micro-elements requires meticulous analytical reasoning |
| Synthesis — Cross-Scoring | `max` | Scoring each micro-element across all 7 competitors demands careful comparative judgment |
| Synthesis — Hybrid Reconstruction | `max` | Writing coherent hybrids from best elements is the highest-skill creative task |
| Synthesis — Coherence Validation | `max` | Final quality gate — hybrids must read naturally, not Frankensteined |

### Round Coordination with Team Lead

```yaml
agent_team_synthesis_flow:
  # After Round 3 completes:
  step_1:
    actor: team_lead
    action: "Collect all 7 Round 3 final outputs (full text)"

  step_2:
    actor: team_lead
    action: "Package synthesis context (7 outputs + criteria + upstream + specimens + instructions)"

  step_3:
    actor: team_lead
    action: "Send synthesis package to Architect Agent with role switch instruction"

  step_4:
    actor: architect_agent
    action: "Execute full Synthesizer Layer protocol (Phases 1-7) with effort: max"

  step_5:
    actor: architect_agent
    action: "Return 2-3 hybrid outputs with attribution, scoring, and coherence validation"

  step_6:
    actor: team_lead
    action: "Present 9-10 candidates (7 pure + 2-3 hybrids) to human for selection"
```

### Fallback: Single-Context Synthesis

If Agent Teams is not available or not practical:
- Revert to single-context synthesis as documented in the rest of this file
- Apply context compression between rounds as specified in Arena Context Management
- Be aware that synthesis quality may be reduced due to compressed inputs and context pressure
- Use `effort: max` for synthesis phase regardless of execution mode

**Reference:** See `Skills/ARENA-CORE-PROTOCOL.md` v2.0 for the full Agent Team protocol, including Team Lead coordination, persona teammate specifications, and round management.

---

## OUTPUT SCHEMA

### Synthesizer Output Format

```yaml
synthesizer_output:
  skill: "[skill name]"
  timestamp: "[ISO timestamp]"

  decomposition:
    outputs_analyzed: 7
    micro_elements_extracted: [count]
    functions_tagged: [list]

  best_element_matrix:
    - function: "[function name]"
      winner_phrase: "[phrase]"
      winner_source: "[persona]"
      winner_score: [float]
    # ... for each function

  hybrids:
    - hybrid_id: "hybrid_a"
      output_text: "[full text]"
      composition:
        - persona: "[name]"
          contribution_percent: [int]
          elements_used: ["[phrase 1]", "[phrase 2]"]
      coherence_scores:
        grammatically_correct: true
        reads_naturally: true
        consistent_voice: true
        logical_flow: true
        no_redundancy: true
        appropriate_length: true
      arena_scores:
        issue_resolution: [float]
        voice_preservation: [float]
        flow_enhancement: [float]
        clarity_improvement: [float]
        slop_elimination: [float]
        brevity: [float]
        threading_preservation: [float]
        weighted_total: [float]
      rationale: "[why this combination]"

  # Repeat for hybrid_b, hybrid_c

  final_presentation:
    pure_outputs:
      - rank: 1
        competitor: "[name]"
        score: [float]
      # ... for all 7
    hybrid_outputs:
      - rank: 1
        hybrid_id: "[id]"
        score: [float]
        composition_summary: "[personas + %]"
      # ... for 2-3 hybrids
```

---

## LEARNING INTEGRATION

### What to Track

After human selection, log:

```yaml
learning_entry:
  skill: "[skill]"
  project: "[project]"
  timestamp: "[timestamp]"

  selection:
    winner_type: "[pure/hybrid]"
    winner_id: "[persona or hybrid_id]"
    winner_score: [float]

  if_hybrid:
    composition:
      - persona: "[name]"
        contribution: [percent]
        elements_used: ["[phrases]"]

  insights:
    - "[which persona combinations worked]"
    - "[which functions were strongest from which persona]"

  pattern_flags:
    - "halbert_hooks_preferred"
    - "clemens_mechanism_preferred"
    - "makepeace_flow_preferred"
```

### Cross-Session Learning

Over time, this data reveals:
- Which persona combinations consistently win
- Which persona is strongest for which function
- Which skills benefit most from synthesis
- Optimal hybrid composition patterns by niche/market

---

## FORBIDDEN BEHAVIORS

1. **Splice without rewrite** — Never just concatenate phrases; always write a coherent output
2. **Skip coherence check** — Every hybrid must pass all 6 coherence checks
3. **Present weak hybrids** — If hybrid < 8.0, don't present it
4. **Create redundant hybrids** — Each hybrid must be meaningfully different
5. **Ignore attribution** — Always track which persona contributed what
6. **Override human selection** — Hybrids are OPTIONS, not mandates
7. **Synthesize before Arena** — Synthesis happens AFTER all 3 rounds of 7-competitor Arena
8. **Decompose at wrong granularity** — Match decomposition level to output type

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | 2026-02-05 | AGENT TEAM EXECUTION MODE: Added dedicated section documenting how the Synthesizer Layer operates in Agent Team mode. The Architect runs as a separate teammate agent with its own 200K context — competing in Rounds 1-3 (same as other 6 persona agents) then switching to Synthesizer role post-Round 3. Key improvement: Architect Agent receives ALL 7 Round 3 outputs as full text in a fresh context window, eliminating context compression losses. Synthesis context includes: all 7 outputs (complete), skill criteria, upstream packages, specimens, full instructions. All synthesis operations use `effort: max`. Context compression NOT needed for synthesis in Agent Team mode. Added round coordination flow with Team Lead, effort configuration table, single-context fallback documentation. Reference to ARENA-CORE-PROTOCOL.md v2.0 for full agent team protocol. Updated acknowledgment to cover both execution modes. |
| 2.0 | 2026-02-05 | ARENA SYSTEM UPGRADE v3.0: Redesigned Synthesizer as DUAL-ROLE — The Architect now competes as 7th Arena competitor in Rounds 1-3 (generating integrated outputs) AND performs post-Arena phrase-level synthesis. Updated all counts from 6 to 7 competitors. Updated execution flow for 3-round Arena (critique-revise phases, learning briefs). Added reference to ARENA-CORE-PROTOCOL.md. Updated output schemas and candidate counts (9-10 total: 7 pure + 2-3 hybrids). |
| 1.0 | 2026-02-05 | Initial creation: Full Synthesizer Layer architecture with phrase-level decomposition, function taxonomy, hybrid reconstruction protocol, skill-specific guides, quality thresholds, Arena integration, output schema, learning integration |

---

## ACKNOWLEDGMENT

The Synthesizer Layer exists because **the optimal output is often a hybrid of multiple competitors' strengths**. No single editorial lens captures all dimensions of excellent copy. The Architect's dual role — competing head-to-head in Rounds 1-3 AND creating phrase-level hybrids post-Arena — maximizes the value of integration. By competing, The Architect proves that balanced integration can beat specialization. By synthesizing, it extracts the best phrases from all 7 Round 3 outputs and reconstructs coherent hybrids that capture combinations no single competitor could achieve.

In **single-context mode**, this synthesis operates within the same context window that executed 3 rounds of 7-competitor Arena — requiring careful context compression and working with partial information for non-winning outputs. In **Agent Team mode**, the Architect Agent receives all 7 Round 3 outputs as complete text in a fresh 200K context window — enabling deeper decomposition, more accurate micro-element scoring, and higher-quality hybrid reconstruction with zero information loss. Agent Team mode represents the full realization of the Synthesizer Layer's design intent: phrase-level hybrid creation with complete access to every competitor's best work.

