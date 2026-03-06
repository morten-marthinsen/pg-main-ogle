# Big Idea Arena Layer (Layer 2.5)

**Version:** 2.1
**Created:** 2026-02-03
**Updated:** 2026-02-05
**Position:** Between Layer 2 (Candidate Generation) and Layer 3 (Validation)
**Personas:** See [ARENA-PERSONA-PANEL.md](../../protocols/ARENA-PERSONA-PANEL.md)

> **Arena Mode:** `strategic` — Competitors generate complete strategic packages. See `ARENA-CORE-PROTOCOL.md` for 3-round execution protocol.

---

## PURPOSE

The Arena Layer transforms Big Idea development from a single-perspective process into a multi-perspective competition. Seven competitors (6 personas + The Architect) each generate their version of the Big Idea, which are then judged against skill-specific criteria—including the Resonance/Surprise Framework—to surface the strongest candidate.

**The Problem It Solves:**
- Big Ideas that lack emotional resonance with market
- Ideas with poor schema distance (too familiar OR too foreign)
- Missing "explains past failures + gives hope" element
- Generic Big Idea synthesis (mechanism + promise without true novelty)
- Insufficient differentiation from market aggregate

---

## THE RESONANCE/SURPRISE FRAMEWORK

**Critical Distinction:**
- **Resonance** = Emotional/psychological resonance with dominant market emotion
- **Surprise** = Expectation inversion + Schema distance from market aggregate

### Resonance Score

Measures how well the Big Idea taps the **dominant yet under-articulated emotion** in the market.

**What to measure against:**
- Customer conversations (forums, reviews, comments)
- Competitor claims and ads
- Market research patterns
- Emotional language in testimonials
- **Dominant Core Wounds** (from emotional_mapping.json) — The deeper psychological drivers beneath surface emotions

**Key question:** "Does this Big Idea crystallize an emotion the market FEELS but hasn't been able to articulate?"

**Core Wound Enhancement (v1.1):**
Core Wounds (from Parris Lampropoulos's Schema Therapy teaching) are childhood emotional injuries that drive adult purchasing behavior. They operate BENEATH surface emotions. Big Ideas that resonate with dominant Core Wounds achieve deeper psychological connection.

**When evaluating resonance, check:**
- Does the Big Idea touch the identified dominant wound(s)?
- Does the hope/worldview element address the wound implicitly?
- Does the villain externalize blame appropriately for the wound?

*Note: Core Wound alignment is INFORMATIONAL, not gating. Following Parris's methodology: "Learn it, internalize it, then forget it and write naturally."*

**Reference:** References/CORE-WOUNDS-FRAMEWORK.md

### Surprise Score (Schema Distance)

Measures how far the Big Idea's articulation sits from the **aggregate market conversation**.

**What to measure against:**
- The chatter: What customers are saying
- Competitor claims: What's already being promised
- Ad messaging: What the market is hearing
- Content themes: What's being published

**The Sweet Spot:**
```
TOO CLOSE (Low Surprise):        TOO FAR (Low Relevance):
├─────────────────────────────────────────────────────────────────┤
│ Sounds like everyone else  │ SWEET SPOT │ Sounds irrelevant    │
│ "Another weight loss..."   │ ATTENTION  │ "What does this have │
│ No attention break         │ + RELEVANT │  to do with me?"     │
└─────────────────────────────────────────────────────────────────┘
```

**Key question:** "Is this Big Idea different enough to break attention patterns, but relevant enough to maintain connection?"

---

## EXECUTION PROTOCOL

**See `ARENA-CORE-PROTOCOL.md` for the complete 3-round execution protocol.**

> **Effort Level:** All generation phases use `effort: max`. Critique uses `effort: high`. See CLAUDE.md v3.1 Effort Protocol.
> **Agent Team Mode:** When Agent Teams enabled, each persona runs as a separate teammate agent. See `ARENA-CORE-PROTOCOL.md` v2.0 Agent Team Execution Mode.

This skill uses `arena_mode: strategic` — competitors generate COMPLETE strategic packages (no behavioral change from current generation approach). The Arena adds:
- **7 competitors** (6 personas + The Architect) generating independently
- **Adversarial critique** before scoring (The Critic identifies ONE weakest element per output)
- **Targeted revision** (each competitor fixes their identified weakness)
- **3 rounds** of competition with learning briefs between rounds
- **Post-arena synthesis** (Layer 2.6) creating 2-3 phrase-level hybrids
- **Human selection** from 9-10 candidates (7 pure + 2-3 hybrids)

### What Stays Skill-Specific (Below)
- 7 judging criteria with weights (used by both The Critic and the Judge)
- Persona generation instructions for this skill
- Critique-specific guidance for this skill
- Quality thresholds
- Anti-slop enforcement
- Input/output requirements

---

### Big Idea Judging Criteria

| Criterion | Weight | Definition |
|-----------|--------|------------|
| **Emotional Resonance** | 20% | Does this tap the dominant under-articulated emotion? Does the market FEEL this? |
| **Schema Distance (Surprise)** | 20% | Is this in the sweet spot—different enough for attention, relevant enough for connection? |
| **Failure Explanation + Hope** | 15% | Does this explain ALL past failures AND give a hopeful new worldview? |
| **Specificity** | 10% | Is this Big Idea specific, not vague? Concrete claims? |
| **Defensibility** | 10% | Can this Big Idea be defended with proof? |
| **TIER1 Pattern Match** | 10% | How closely does this match elite TIER1 Big Idea patterns? |
| **Campaign Coherence** | 15% | Does this Big Idea unify RC + Mechanism + Promise coherently? |

### Resonance Scoring Deep Dive

**Measuring Emotional Resonance:**

```
1. Identify dominant market emotion from research:
   - What are customers FEELING but not articulating well?
   - What frustration/hope/fear appears across forums, reviews, testimonials?
   - What emotional language repeats?

2. Identify dominant Core Wounds from emotional_mapping.json:
   - What deeper psychological drivers underlie the surface emotions?
   - What childhood wounds show up in the language patterns?
   - Reference: References/CORE-WOUNDS-FRAMEWORK.md

3. Score how well Big Idea crystallizes this emotion:
   - 9-10: Big Idea IS the articulation of their unstated feeling; taps dominant wound
   - 7-8: Big Idea connects strongly to the emotion; wound-aware
   - 5-6: Big Idea touches the emotion tangentially
   - 3-4: Big Idea misses the dominant emotion
   - 1-2: Big Idea addresses wrong emotional territory

4. Optional Core Wound alignment check (informational):
   - Does the Big Idea implicitly address the dominant wound?
   - Example: If FAILURE wound dominant → Does Big Idea explain why past failures weren't their fault?
   - Example: If EXCLUSION wound dominant → Does Big Idea offer belonging to an insider group?
```

### Schema Distance Scoring Deep Dive

**Measuring Schema Distance:**

```
1. Summarize market aggregate:
   - What are competitors claiming?
   - What messaging is the market saturated with?
   - What angles have been burned?
   - What's the "usual" framing in this niche?

2. Map Big Idea's distance from aggregate:

   SCORE 1-3 (Too Close):
   - Sounds like existing competitor messaging
   - Uses burned angles or claims
   - No attention-breaking element

   SCORE 4-6 (Optimal Sweet Spot):
   - Different enough to break pattern
   - Fresh angle on familiar territory
   - Attention + relevance balanced

   SCORE 7-10 (Too Far):
   - So different it loses relevance
   - Prospect doesn't see connection to their problem
   - Attention without relevance

   IDEAL SCORE: 4-6 (sweet spot for both attention and relevance)
```

**Note:** Unlike other criteria where higher = better, Schema Distance has an OPTIMAL RANGE. Score 4-6 is ideal; 1-3 and 7-10 both indicate problems.

### Scoring Protocol

```
FOR each candidate:
  FOR each criterion:
    Score 1-10 (with schema distance sweet spot awareness)
    Provide evidence for score
    Flag if below minimum (6.0) OR outside sweet spot (schema distance)

  Calculate weighted_total = sum(score * weight)

  Document:
    - Strongest elements
    - Weakest elements
    - Critical gaps (any criterion below 6.0)
    - Schema distance position (too close / optimal / too far)
```

### Scoring Rubric

**Emotional Resonance (20%)**
- 9-10: Crystallizes the exact unstated emotion; market feels SEEN
- 7-8: Strong emotional connection to dominant feeling
- 5-6: Some emotional resonance; generic territory
- 3-4: Weak connection; misses primary emotion
- 1-2: Wrong emotional territory entirely

**Schema Distance / Surprise (20%)**
- **1-3: Too Close** — Sounds like everyone else; no attention break
- **4-6: Sweet Spot** — Different enough for attention, relevant enough for connection
- **7-10: Too Far** — So different it loses relevance; "what does this have to do with me?"

**Failure Explanation + Hope (15%)**
- 9-10: Explains ALL past failures; creates genuine hope for new worldview
- 7-8: Explains most failures; provides reason for hope
- 5-6: Explains some failures; partial hope
- 3-4: Weak explanation; doesn't create hope
- 1-2: Doesn't explain failures; no worldview shift

**Specificity (10%)**
- 9-10: Highly specific claims; concrete elements
- 7-8: Good specificity; mostly concrete
- 5-6: Moderate specificity
- 3-4: Vague; generic claims
- 1-2: Completely abstract

**Defensibility (10%)**
- 9-10: Every element provable; proof pathway clear
- 7-8: Most elements defensible
- 5-6: Some elements defensible
- 3-4: Difficult to defend
- 1-2: Indefensible claims

**TIER1 Pattern Match (10%)**
- 9-10: Matches elite TIER1 Big Idea patterns exactly
- 7-8: Strong similarity to successful Big Ideas
- 5-6: Some TIER1 elements present
- 3-4: Generic; not TIER1-aligned
- 1-2: No TIER1 pattern recognition

**Campaign Coherence (15%)**
- 9-10: Perfect unification of RC + Mechanism + Promise; feels like singular truth
- 7-8: Strong coherence; elements clearly connected
- 5-6: Functional coherence; some gaps
- 3-4: Weak coherence; elements feel separate
- 1-2: Incoherent; elements don't fit together

### Output Format

```yaml
arena_judging_output:
  layer: "2.5.2"
  scored_candidates:
    - persona: string
      criterion_scores:
        emotional_resonance:
          score: integer
          evidence: string
          dominant_emotion_identified: string
          core_wound_alignment: string  # Optional: How Big Idea touches identified wound(s)
        schema_distance:
          score: integer
          evidence: string
          position: enum[too_close, optimal, too_far]
          market_aggregate_comparison: string
        failure_explanation_hope:
          score: integer
          evidence: string
          failures_explained: string
          hope_created: string
        specificity:
          score: integer
          evidence: string
        defensibility:
          score: integer
          evidence: string
        tier1_pattern_match:
          score: integer
          evidence: string
        campaign_coherence:
          score: integer
          evidence: string
      weighted_total: float
      resonance_surprise_combined: float  # Special combined metric
      strongest_elements: [string]
      weakest_elements: [string]
      critical_gaps: [string]
```

### Critique-Specific Guidance

**What The Critic should particularly target in Big Idea Arena:**
- Schema distance outside optimal range (too close = boring, too far = unbelievable)
- Big idea that doesn't integrate villain/hope elements
- Headline expression that doesn't capture the big idea's core
- Missing failure explanation or hope component
- Campaign coherence gaps (big idea doesn't unify downstream elements)

---

## QUALITY GATES

### Gate 2.5 Requirements

| Check | Minimum | Evidence |
|-------|---------|----------|
| Candidates generated | 7 | One per competitor (6 personas + The Architect) |
| All criteria scored | 7 per candidate | 7 × 7 = 49 scores |
| Top candidate score | ≥ 7.0 | Weighted total |
| Schema distance | 4-6 range | Position check |
| Villain present | All candidates | Villain trace |
| Human selection received | Yes | Selection recorded |

### Gate Failure Protocol

```
IF candidates < 7:
  Re-run generation for missing competitors

IF any criterion unscored:
  Complete judging before proceeding

IF top candidate < 7.0:
  Option A: Return to Layer 2 for re-generation
  Option B: Present to human with warning

IF schema distance outside 4-6:
  Flag in presentation
  Human decides: accept with risk OR iterate for better distance

IF villain missing:
  BLOCK - villain integration is mandatory

IF no human selection:
  BLOCK - cannot proceed without human input
```

---

## SCHEMA DISTANCE MEASUREMENT PROTOCOL

### Step 1: Establish Market Aggregate

Before judging, compile the market aggregate:

```yaml
market_aggregate:
  customer_conversations:
    - theme: string
    - frequency: high/medium/low
    - emotional_tone: string
  competitor_claims:
    - claim: string
    - competitor: string
    - saturation_level: burned/common/fresh
  ad_messaging:
    - angle: string
    - prevalence: widespread/common/rare
  content_themes:
    - theme: string
    - treatment: string
```

### Step 2: Map Big Idea Distance

For each Big Idea candidate:

```yaml
schema_distance_map:
  candidate: string
  comparison_to_aggregate:
    customer_conversation_alignment: enum[identical, similar, different, opposite]
    competitor_claim_overlap: enum[high, moderate, low, none]
    ad_messaging_freshness: enum[burned, familiar, fresh, novel]
    content_theme_positioning: enum[within, adjacent, outside]
  overall_distance: integer  # 1-10
  distance_position: enum[too_close, optimal, too_far]
```

### Step 3: Calibrate for Sophistication

Schema distance thresholds shift based on market sophistication:

| Market Stage | Ideal Schema Distance | Rationale |
|--------------|----------------------|-----------|
| Stage 1-2 (Less Sophisticated) | 3-5 | Can be closer to aggregate; direct claims work |
| Stage 3 (Moderate) | 4-6 | Need some novelty to stand out |
| Stage 4-5 (Highly Sophisticated) | 5-7 | Need more distance; familiar angles are burned |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | 2026-02-05 | AGENT TEAMS + EFFORT PROTOCOL: Added effort level and Agent Team mode references to execution protocol. See ARENA-CORE-PROTOCOL.md v2.0 and CLAUDE.md v3.1. |
| 2.0 | 2026-02-05 | ARENA SYSTEM UPGRADE v3.0: Added arena_mode: strategic. Replaced Phase 1-4 execution protocol with reference to ARENA-CORE-PROTOCOL.md (3-round mandatory competition, adversarial critique-revise, 7 competitors including The Architect, learning briefs). Added critique-specific guidance. Updated all competitor counts from 6 to 7. Version bump. |
| 1.1 | 2026-02-04 | Added Core Wound awareness to Emotional Resonance criterion (informational, non-blocking per Parris methodology). Reference to Skills/foundation/00-core-wounds/CORE-WOUNDS-FRAMEWORK.md |
| 1.0 | 2026-02-03 | Initial Arena Layer creation with 6-persona generation, Resonance/Surprise framework, schema distance measurement, human checkpoint |
