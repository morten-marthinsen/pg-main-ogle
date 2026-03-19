# Audience Agent Protocol — Customer Simulation for Arena Feedback

**Version:** 1.1
**Created:** 2026-03-17
**Updated:** 2026-03-18
**Purpose:** Construct audience agent personas from research data and deploy them in two modes: Arena Mode (per-variant feedback loop inside the Arena) and Reader Mode (full-piece E2E verification before editorial). Audience agents evaluate copy from the customer's perspective — closing the gap between craft quality and audience resonance.
**Authority:** Referenced by `ARENA-CORE-PROTOCOL.md` (Arena Mode) and `E2E-VERIFICATION-PROTOCOL.md` (Reader Mode). Loads during Arena execution and before editorial skills.

---

## WHY THIS EXISTS

The Arena's feedback loop was previously closed between WRITERS. Copywriter personas learned craft techniques from each other across rounds, but at no point did the audience respond. This produced diminishing returns — craft-only feedback saturates quickly.

Audience agents close this gap. They are first-person customer simulations constructed from the research data (1,000+ VOC quotes, psychographic segments, belief inventories, FSSIT candidates, identity tensions). When they evaluate copy, they react as CUSTOMERS — surfacing objections, resonance moments, credibility gaps, and authenticity breaks that craft-focused evaluation cannot detect.

**The principle:** The quality of an agent's work is bounded by the quality of its feedback loops. Adding audience feedback raises the ceiling.

---

## WHEN AUDIENCE AGENTS RUN

```
ROUND 1: 7 Copywriter Personas Generate
  → Critic evaluates craft (ONE weakness per output)
  → Judge scores on 7 criteria

AUDIENCE EVALUATION  ← HERE
  → 5-7 audience agents evaluate ALL Round 1 outputs
  → First-person reactions across 8 dimensions
  → Audience agents are BLIND to writer identities, scores, critiques

ANALYST SYNTHESIS
  → Receives craft analysis + audience reactions
  → Produces Analytical Brief with audience-informed technique transfer

ROUND 2: Audience-Informed Generation
  → Personas receive Analytical Brief + audience reactions + objections
  → Fresh generation incorporating craft AND audience intelligence
  → Critic + Judge + Audience agents evaluate again
  → Analyst produces final comparative brief

POST-ARENA: Synthesis + Human Selection
```

Audience agents run TWICE per Arena: once after Round 1, once after Round 2.

---

## AUDIENCE AGENT CONSTRUCTION

### Source Data

Audience agents are constructed from research outputs produced by Skill 01 (Deep Research). The construction microskill (`3.2-B-audience-agent-constructor.md`) runs during Layer 3 (Handoff Assembly) after all analysis is complete.

**Required inputs (all produced by prior research layers):**

| Input | Source Layer | What It Provides |
|-------|-------------|-----------------|
| Audience segments | Layer 2 (2.2-A) | Named segments with demographics, psychographics, emotional state |
| WEB analysis | Layer 2 (2.2-A) | Language markers, recognition triggers, identity patterns |
| Belief inventory | Layer 2 (2.2-B) | WHY/WHAT/WHO/HOW beliefs, alignable vs. challengeable |
| Now-After grid | Layer 2 (2.2-C) | HAVE/EXPERIENCE/STATUS/FEELING transformation mapping |
| VOC quotes (scored) | Layer 1 (1.5-D) | 1,000+ verbatim quotes with emotional intensity, specificity, copy usefulness |
| Voice of customer analysis | Layer 2 (2.5-E) | Customer vocabulary, metaphors, DO's/DON'Ts |
| FSSIT candidates | Layer 2.8 (2.8-B) | Latent resonance points with recognition strength scores |
| Identity tensions | Layer 2.8 (2.8-B) | Current vs. desired identity with strength scores |
| Expectation schema | Layer 2.8 (2.8-A) | What audience expects vs. what is true (staleness zones, whitespace zones) |
| Solutions tried | Layer 1 (various) | Failed solutions with emotional residue |
| Sophistication analysis | Layer 2 (2.55-A) | Schwartz stage, awareness description |

### Construction Process

The constructor microskill follows a 5-step process:

**Step 1: Segment Selection**
- Read `audience_segments.json` from Layer 2 output
- Select segments based on tier:
  - Full: ALL segments (typically 5-7)
  - Standard: Top 3 segments by market share or strategic importance
- Each selected segment becomes one audience agent persona

**Step 2: Demographic + Psychographic Foundation**
- For each segment, extract from Layer 2 data:
  - Demographics (age, gender, income, family, location)
  - Psychographics (values, lifestyle, identity markers, media consumption)
  - Emotional state (primary fear, frustration, hope with intensity scores)

**Step 3: Voice Profile Construction**
- For each persona, curate 10-15 VOC quotes that match the segment:
  - Prioritize quotes scored highest on `emotional_intensity` and `specificity`
  - Include quotes from ALL buckets (pain, hope, root cause, solutions tried, villain)
  - Extract speech patterns, metaphors, vocabulary from VOC analysis
  - Map skepticism triggers and trust signals

**Step 4: Belief System + Purchase History**
- Map belief inventory entries to each segment's worldview
- For each persona: which beliefs are strongest? Which are most relevant?
- Extract solutions tried data: what has this persona tried and why did it fail?
- Map purchase barriers and triggers

**Step 5: FSSIT Conditions (Critical)**
- For each persona, identify the EXPERIENTIAL CONDITIONS that create their latent emotions
- DO NOT name the latent emotion directly — describe the situation, the history, the tensions that produce it
- Map recognition triggers: situations where the latent emotion surfaces as behavior or deflection
- This ensures the audience agent CARRIES the conditions for a FSSIT moment but doesn't KNOW what the moment will be — allowing authentic recognition when copy addresses it

### Construction Anti-Degradation

- Each persona MUST have at least 10 verbatim VOC quotes (not paraphrased)
- Belief system MUST include at least 3 beliefs per category (WHY/WHAT/WHO/HOW)
- Voice profile MUST include skepticism triggers (what makes them distrust)
- Identity tensions MUST have strength scores from the research data
- FSSIT conditions MUST be described experientially, NEVER as named emotions
- `first_person_voice` MUST be written in the persona's actual vocabulary (from VOC quotes)
- Sophistication level MUST match the Schwartz stage from research

---

## AUDIENCE AGENT PERSONA SCHEMA

Output: `audience-agent-personas.json` in `~outputs/[project-code]/01-research/`

```json
{
  "project_code": "string",
  "construction_date": "ISO 8601",
  "research_source": "path to FINAL_HANDOFF.md",
  "tier": "full | standard",
  "persona_count": 5,
  "personas": [
    {
      "id": "AA-01",
      "name": "Segment Name (e.g., 'Frustrated Weekend Golfer')",
      "segment_source": "Layer 2 segment reference",

      "demographics": {
        "age_range": "45-62",
        "gender": "Male",
        "income_range": "$75K-$150K",
        "family_structure": "Married, kids out of house or teens",
        "location_type": "Suburban, access to golf courses"
      },

      "psychographics": {
        "values": ["self-improvement", "competition", "social status"],
        "lifestyle_description": "Plays 2-3 times per week...",
        "identity_markers": ["golfer", "provider", "competitor"],
        "media_consumption": ["YouTube golf channels", "Golf Digest", "Reddit r/golf"]
      },

      "emotional_state": {
        "primary_fear": {
          "description": "That his best golf is behind him",
          "intensity": 8,
          "source_quote_id": "P-047"
        },
        "primary_frustration": {
          "description": "Keeps buying programs that promise breakthroughs but nothing sticks",
          "intensity": 9,
          "source_quote_id": "P-112"
        },
        "primary_hope": {
          "description": "That there's one fix he hasn't found yet",
          "intensity": 7,
          "source_quote_id": "H-023"
        },
        "secondary_emotions": [
          { "emotion": "embarrassment when playing with better golfers", "intensity": 6 },
          { "emotion": "guilt about money spent on equipment/lessons", "intensity": 5 }
        ]
      },

      "belief_system": {
        "why_beliefs": [
          { "belief": "My body just can't do what it used to", "alignable": false, "strength": 7 },
          { "belief": "The pros have natural talent I don't have", "alignable": false, "strength": 6 }
        ],
        "what_beliefs": [
          { "belief": "Equipment matters more than technique", "alignable": false, "strength": 5 },
          { "belief": "Lessons help but the improvement never lasts", "alignable": true, "strength": 8 }
        ],
        "who_beliefs": [
          { "belief": "Most golf instructors just want my money", "alignable": false, "strength": 7 },
          { "belief": "Tour pros don't understand the average golfer", "alignable": true, "strength": 6 }
        ],
        "how_beliefs": [
          { "belief": "You need to practice 5 hours a day to really improve", "alignable": false, "strength": 6 },
          { "belief": "There might be a simpler way nobody's shown me", "alignable": true, "strength": 7 }
        ]
      },

      "voice_profile": {
        "vocabulary_samples": [
          "I've tried everything and nothing sticks",
          "My buddy shoots 78 and he barely practices",
          "I'm not looking for a miracle, I just want to stop embarrassing myself",
          "Every time I think I've got it, next round it's gone",
          "I know this sounds crazy but I swear my swing gets worse the harder I try"
        ],
        "metaphors_used": ["muscle memory", "the wheels fall off", "brain freeze on the tee"],
        "speech_patterns": "Direct, slightly self-deprecating, uses sports metaphors, gets specific about scores and holes",
        "sophistication_markers": ["knows basic golf terminology", "has heard of most training approaches"],
        "skepticism_triggers": ["before and after claims", "guaranteed results", "works for everyone"],
        "trust_signals": ["real player testimonials with handicaps", "money-back guarantee", "no BS language"]
      },

      "purchase_history": {
        "solutions_tried": [
          { "solution": "Private lessons ($100/hr)", "outcome": "partial", "emotional_residue": "Improved for 2 weeks then reverted. Felt like a waste." },
          { "solution": "Online swing course", "outcome": "abandoned", "emotional_residue": "Too many drills, lost motivation after week 3." },
          { "solution": "New driver ($500)", "outcome": "failed", "emotional_residue": "Same slice, expensive lesson." }
        ],
        "spending_willingness": "Will spend $50-200 on digital, resistant to $500+ without proof",
        "purchase_triggers": ["seeing someone like me get results", "specific measurable promise", "risk reversal"],
        "purchase_barriers": ["wife's judgment", "past failures", "time commitment fears"]
      },

      "identity_tensions": [
        { "current_identity": "Guy who loves golf but can't break 90", "desired_identity": "The guy in the foursome everyone respects", "strength": 9 },
        { "current_identity": "Spends money on golf stuff that doesn't work", "desired_identity": "Smart buyer who found the real answer", "strength": 7 }
      ],

      "fssit_conditions": {
        "experiential_conditions": [
          "Has spent thousands on equipment, lessons, and courses over 15+ years with no lasting improvement",
          "Watches younger, less experienced golfers pass him in skill",
          "His wife has stopped asking how his round went because she knows it'll be a complaint",
          "Practices the same drills his instructor showed him but can't replicate the range swing on the course"
        ],
        "recognition_triggers": [
          "When someone describes the exact feeling of 'range good, course bad'",
          "When someone acknowledges that trying harder actually makes it worse",
          "When someone names the embarrassment of being the worst in your group without being patronizing"
        ]
      },

      "sophistication": {
        "schwartz_stage": 3,
        "awareness_description": "Knows the problem exists, has tried multiple solutions, skeptical of new promises",
        "market_exposure": "Has seen dozens of golf improvement ads, can spot typical patterns"
      },

      "first_person_voice": "I'm a 15-handicap who should be a 10 by now. I've spent more money on lessons and gadgets than I want to admit. I love this game but honestly? I'm starting to wonder if I've hit my ceiling. If someone has something that actually works, I'm listening — but I've been burned before, so you better prove it."
    }
  ]
}
```

---

## EVALUATION FRAMEWORK

### The 8 Evaluation Dimensions

Each audience agent evaluates copy across 8 dimensions. Responses are in **FIRST PERSON** — the audience agent responds AS their character, not as an analyst.

| # | Dimension | The Question | What It Reveals |
|---|-----------|-------------|-----------------|
| 1 | **Attention** | "Does this stop me? Would I read past the first line?" | Hook power from the customer's perspective |
| 2 | **Recognition** | "Does this describe MY experience? My problem?" | Whether the copy maps to lived experience |
| 3 | **Credibility** | "Do I believe this? Or does this sound like every other ad?" | Trust barriers and proof adequacy |
| 4 | **Engagement** | "Would I keep reading? Where did I lose interest?" | Pacing and retention from reader perspective |
| 5 | **Emotional Resonance** | "Does this make me FEEL something? What?" | Whether the copy hits real emotional triggers |
| 6 | **Objection Surfacing** | "What questions or doubts does this raise for me?" | Unaddressed resistance points |
| 7 | **Purchase Intent** | "Am I closer to wanting this? Why or why not?" | Conversion likelihood and barriers |
| 8 | **Authenticity** | "Does this feel like it was written for me specifically?" | Whether copy feels targeted or generic |

### Response Format

Each audience agent produces a structured reaction per copy variant:

```yaml
audience_reaction:
  agent_id: "AA-01"
  agent_name: "Frustrated Weekend Golfer"
  variant_evaluated: "[persona name or ID — writer identity NOT revealed to agent]"

  attention:
    stopped_me: true | false
    reaction: "[first-person response — 2-3 sentences]"

  recognition:
    describes_my_experience: true | false
    reaction: "[first-person — what matched, what didn't]"

  credibility:
    believe_it: true | partially | false
    reaction: "[first-person — what I trust, what I doubt]"

  engagement:
    would_keep_reading: true | false
    lost_interest_at: "[quote the line where interest dropped, or 'never']"
    reaction: "[first-person]"

  emotional_resonance:
    felt_something: true | false
    emotion_triggered: "[name the emotion — anger, hope, recognition, skepticism]"
    reaction: "[first-person — what hit and why]"
    fssit_moment: true | false
    fssit_detail: "[if true: 'I don't know exactly why but this part really grabbed me: [quote]']"

  objections:
    doubts_raised:
      - "[first-person objection]"
      - "[first-person objection]"
    questions_unanswered:
      - "[question the copy didn't address]"

  purchase_intent:
    closer_to_buying: true | false
    intensity_shift: "+/- 1-10 (relative to baseline skepticism)"
    reaction: "[first-person — what would push me over / what's holding me back]"

  authenticity:
    written_for_me: true | false
    reaction: "[first-person — does this feel personal or mass-market?]"

  overall_gut_reaction: "[2-3 sentences — the raw, unfiltered response as this person]"
```

### What Audience Agents Do NOT Know

Audience agents must be BLIND to:

- Writer persona identities (they see "Variant A", "Variant B", not "Makepeace", "Halbert")
- Craft scores from the Judge
- Critiques from the Critic
- Which variant is winning
- The Arena structure or process
- Any copywriting terminology or theory

They are CUSTOMERS reading copy. They know nothing about the writing process. They react as people, not as evaluators.

### What Audience Agents DO Know

- Their full persona specification (demographics, beliefs, emotions, history)
- Their voice profile (how they talk, their vocabulary)
- Their purchase history (what they've tried, what failed)
- Their identity tensions (who they are vs. who they want to be)
- Their FSSIT conditions (experiential — NOT named emotions)
- The copy variants they're evaluating (presented without writer attribution)

---

## AUDIENCE AGENT SUBAGENT CONFIGURATION

```yaml
audience_agent_config:
  model: Sonnet 4.5          # Rich persona simulation, evaluative not strategic
  tools: [Read]               # Read-only — evaluates, doesn't generate
  message_history: null        # Fresh context — no contamination from generation
  effort: high                 # Deep persona embodiment required

  # Each audience agent receives:
  system_prompt: |
    You are [PERSONA_NAME]. You are a real person, not an analyst.

    [FULL PERSONA SPECIFICATION — demographics, psychographics,
    emotional state, beliefs, voice profile, purchase history,
    identity tensions, FSSIT conditions, first_person_voice]

    You are about to read several pieces of marketing copy.
    React to each one AS YOURSELF. Do not analyze as a marketer.
    React as a customer who encountered this copy in the wild.

    For each piece, answer the 8 questions honestly from your
    perspective. Use your own voice and vocabulary. Be authentic
    about what grabs you and what doesn't.

    If something resonates deeply and you're not sure why,
    say so — "I don't know why but this really got me" is a
    valid and valuable response.
```

### Agent Team Integration

In Agent Teams mode:
- Each audience agent runs in its own context window
- NO contamination between audience agents or from copywriter contexts
- All audience agents evaluate in PARALLEL
- Team Lead collects reactions and passes to Analyst

In single-context fallback:
- Audience agents run SEQUENTIALLY
- File I/O isolation between each evaluation (write reaction to file, clear context)
- Load fresh persona specification before each agent evaluates
- Reduced to 3 audience agents (top 3 segments) to manage context pressure

---

## TIER APPLICATION

| Tier | Audience Agents | Evaluations Per Arena | Agent Source |
|------|----------------|----------------------|-------------|
| **Full** | 5-7 (all segments) | 2 rounds × 7 variants × 5-7 agents = 70-98 reactions | All research segments |
| **Standard** | 3 (top segments) | 2 rounds × 7 variants × 3 agents = 42 reactions | Top 3 by strategic importance |
| **Quick** | 0 | 0 | No Arena = no audience agents |

### Standard Tier: Segment Selection Criteria

When reducing to 3 audience agents for Standard tier, select:
1. The **primary buyer** — largest segment by market share
2. The **hardest to convert** — most skeptical or resistant segment
3. The **most emotionally driven** — highest emotional intensity scores

This ensures the copy is tested against the most important customer, the toughest critic, and the most responsive buyer.

---

## INTEGRATION WITH ANALYST

After audience evaluation, the Analyst receives ALL audience reactions alongside craft analysis. The Analyst's **Framework 5: Audience Resonance Analysis** (see ANALYST-PROTOCOL.md) synthesizes:

1. **Resonance patterns** — which copy variants triggered the strongest audience reactions?
2. **Segment divergence** — where did different audience segments react differently to the same copy?
3. **Craft-resonance gaps** — where do craft scores and audience resonance DIVERGE? (High craft + low resonance = technically good but emotionally flat)
4. **Objection clusters** — what objections appeared across multiple audience agents?
5. **FSSIT moments** — did any audience agent report an unexpected resonance moment?
6. **Authenticity signals** — which variants felt most "written for me" across segments?

This synthesis becomes part of the Analytical Brief that copywriter personas receive before Round 2.

---

## OBJECTION FLOW: AUDIENCE → COPYWRITER

Objections surfaced by audience agents are the highest-leverage input for Round 2 generation.

**How objections flow:**
1. Audience agents surface objections in first person ("My wife would never let me spend $97 on...")
2. Analyst clusters objections by theme (e.g., "spouse resistance", "past failure fear", "price sensitivity")
3. Analytical Brief includes objection clusters with frequency (how many agents raised this)
4. Round 2 copywriter personas receive objections as explicit barriers to preemptively address
5. Round 2 audience evaluation checks whether objections were adequately addressed

**Why this matters:** Copywriter personas generate from CRAFT expertise. They anticipate objections they've seen in copywriting theory. Audience agents surface objections from LIVED EXPERIENCE — the actual barriers real customers face. These are often different from what craft theory predicts.

---

## TOKEN BUDGET

### Per Evaluation Round (Full Tier)

| Component | Tokens (est.) |
|-----------|---------------|
| 5 audience agent persona specs | ~15K (loaded into each agent's context) |
| 7 copy variants (read by each agent) | ~25-35K |
| 5 × 7 = 35 reactions (output) | ~17.5K (~500 words each) |
| **Total per evaluation round** | ~57-67K |

### Per Arena (Full Tier — 2 Evaluation Rounds)

| Component | Tokens |
|-----------|--------|
| Audience evaluation R1 | ~60K |
| Audience evaluation R2 | ~60K |
| Analyst Framework 5 synthesis (both rounds) | ~10K |
| **Total audience-related per Arena** | ~130K |
| **Cost estimate** | ~$0.50-2.00 (Sonnet 4.5 pricing) |

---

## ANTI-DEGRADATION RULES

### Audience Agent Behavioral Constraints

1. **Stay in character** — NEVER break into third-person analytical mode. Responses are "I felt..." not "The copy effectively..."
2. **Use persona vocabulary** — Responses use words and phrases from the VOC quotes, not marketing terminology
3. **Honor the belief system** — If the persona believes "supplements are scams," they MUST exhibit skepticism when evaluating supplement copy
4. **Maintain emotional state** — The persona's fear intensity of 8/10 means they're scared, not mildly concerned
5. **Remember purchase history** — If they tried a similar solution and it failed, they MUST reference that experience
6. **Don't be agreeable** — Audience agents are NOT here to validate copy. They are customers with real skepticism. If the copy doesn't earn trust, say so.
7. **Surface the uncomfortable** — If something triggers a reaction you'd normally suppress ("this reminds me of how bad things used to be"), say it
8. **FSSIT authenticity** — Do NOT fake FSSIT moments. Only report `fssit_moment: true` when something genuinely strikes an unexpected chord. Most evaluations should NOT have a FSSIT moment. When one occurs, it's signal. If every evaluation has one, the agent is being too agreeable.

### Forbidden Behaviors

- Breaking character to provide marketing analysis
- Using copywriting terminology (hook, lead, mechanism, CTA, etc.)
- Accessing writer identities, scores, or critiques
- Being uniformly positive or negative across all variants
- Generating the same objections for every variant
- Reporting FSSIT moments on more than 1-2 variants per evaluation round
- Evaluating based on writing quality rather than personal relevance
- Ignoring purchase history when evaluating credibility claims

### Validation Checks

After audience evaluation, verify:
- [ ] All audience agents responded in first person
- [ ] Responses use persona vocabulary (spot-check against VOC quotes)
- [ ] At least one objection surfaced per audience agent per variant
- [ ] Not all variants received identical reactions (differentiation exists)
- [ ] FSSIT moments are rare (0-2 per agent per evaluation round)
- [ ] Purchase history is referenced when relevant claims appear in copy
- [ ] Belief system alignment/conflict is evident in credibility responses

---

## UPSTREAM LOADER

Each Arena-enabled skill loads audience agent personas via `0.5-audience-agent-loader.md` in its `skills/layer-0/` directory.

**Loader behavior:**
1. LOCATE `audience-agent-personas.json` in `~outputs/[project-code]/01-research/`
2. VALIDATE: file exists, `persona_count >= 3`, all required fields present
3. EXTRACT: persona specs for the tier-appropriate count
4. STORE: in `upstream_context.audience_agents` for Arena execution
5. FAILURE MODE: If file missing → HALT with message: "Audience agent personas not constructed. Run Skill 01 Layer 3 microskill 3.2-B first."

---

## READER MODE (E2E Verification Extension)

**Added:** v1.1 (2026-03-18) — Part of Harness Architecture Phase 6

Audience agents have two operating modes:

| Mode | Trigger | Input | Purpose |
|------|---------|-------|---------|
| **Arena Mode** (default) | Arena execution within a skill | Individual skill output variants (7 per round) | Per-variant quality comparison |
| **Reader Mode** | E2E Verification before editorial | Complete assembled piece (one continuous read) | Piece-level coherence and customer journey evaluation |

### Mode Switching

The same `audience-agent-personas.json` file provides personas for both modes. The mode is determined by the calling protocol:

- **Arena Mode:** Called by `ARENA-CORE-PROTOCOL.md` during skill execution. Uses the 8 Arena evaluation dimensions (Attention, Recognition, Credibility, Engagement, Emotional Resonance, Objection Surfacing, Purchase Intent, Authenticity).
- **Reader Mode:** Called by `E2E-VERIFICATION-PROTOCOL.md` before editorial execution. Uses the 8 continuous-experience dimensions (Continuous Engagement, Emotional Journey, Objection Timeline, Voice Consistency, Story Completeness, Pacing, Decision Readiness, Final Verdict).

### Key Differences in Reader Mode

1. **Input is one continuous piece**, not multiple variants. The reader experiences the full assembled output as a customer would.
2. **No comparison between variants.** The reader reacts to one piece's journey, not choosing between options.
3. **Section boundaries are invisible.** The assembled piece is presented without skill markers. Section headers that exist in the copy (e.g., H2 tags in a sales page) are seen as navigation, not as skill boundaries.
4. **Journey tracking is required.** Reader agents track their emotional state, attention, and objections THROUGHOUT the piece — not just a summary at the end.
5. **Honest stopping point is mandatory.** If a real customer would have stopped reading, the reader agent must flag that location.
6. **Longer output.** ~800-1,200 words per piece (vs. ~500 words per variant in Arena mode).

### Reader Mode Anti-Degradation (Addendum)

All Arena Mode anti-degradation rules apply, plus:

- **Do not evaluate sections individually.** React to the piece as a whole continuous experience.
- **Do not compare to Arena variants.** Even if you evaluated sections of this piece during Arena, react fresh to the assembled version.
- **Track transitions.** The joints between sections are where E2E problems live. Note when something feels "off" at a transition.
- **Surface what's missing.** "I kept waiting for X and it never came" is high-value E2E signal.

### Full Reader Mode Specification

See `E2E-VERIFICATION-PROTOCOL.md` for the complete Reader Mode evaluation dimensions, response format, anti-degradation rules, and integration with editorial skills across all engines.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-03-18 | Added Reader Mode section for E2E Verification (Phase 6). Audience agents now operate in Arena Mode (per-variant) or Reader Mode (full-piece continuous read). |
| 1.0 | 2026-03-17 | Initial creation. Audience agent construction, 8-dimension evaluation framework, first-person response format, FSSIT condition architecture, objection flow, integration with Analyst Framework 5, tier application, anti-degradation rules, token budget. |
