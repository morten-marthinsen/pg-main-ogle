# Analyst Protocol — Causal Analysis Between Arena Rounds

**Version:** 1.0
**Created:** 2026-03-14
**Source:** ASI-Arch Enhancement 1 (arXiv:2507.18074) — Analyst Module
**Purpose:** Structured causal analysis of Arena competition results. Replaces the Learning Brief with a deeper Analytical Brief that explains WHY outputs scored differently.

**Authority:** Referenced by `ARENA-CORE-PROTOCOL.md` (Step 1E.5). Loads during Arena execution only.

---

## PURPOSE

The Analyst runs after each Arena round scoring. It produces a structured Analytical Brief that isolates WHY specific outputs scored higher than others by comparing closely related outputs that performed differently.

**What the current Learning Brief tells you:** "Makepeace won with score 9.1. Winning technique: embedded proof within narrative paragraph."

**What the Analytical Brief tells you:**
- "Makepeace modified proof deployment from 'separate proof block after claim' to 'proof embedded within narrative paragraph.' This modification improved Flow Enhancement from 7.8 to 8.6 (+0.8) and Voice Preservation from 8.2 to 8.5 (+0.3)."
- "Halbert attempted a similar modification but applied it to the wrong section (mechanism instead of lead), decreasing Clarity by 0.4."
- "Bencivenga's proof-first architecture scored highest on Threading Preservation (9.2) but lowest on Flow (6.8) — the proof density broke narrative momentum."

The current Learning Brief tells WHAT won. The Analytical Brief tells WHY it won, what the delta was, what the comparison reveals, and what didn't work and why.

**Key finding from ASI-Arch paper:** SOTA results rely 44.8% on self-generated analytical insights (vs. 37.7% for non-SOTA). The Analyst is the mechanism that generates these insights.

---

## WHEN TO RUN

After Step 1E (Ranking) and before Step 1F (Analytical Brief distribution). Runs once per round (3 times total in a Full tier Arena).

```
Step 1D: Scoring
Step 1E: Ranking
Step 1E.5: ANALYST PHASE  ← HERE
Step 1F: Analytical Brief Distributed
```

---

## ANALYST SUBAGENT CONFIGURATION

```yaml
analyst_config:
  model: Opus 4.6           # Strategy cognitive role (see MODEL-ROUTING.md)
  tools: [Read, Glob, Grep]  # Analysis ONLY — no generation, no file modification
  message_history: null       # Fresh context — no contamination from generation
  effort: high                # Deep analytical reasoning required
```

**Why fresh context:** The Analyst has no memory of the creative choices that led to each output. It sees only the finished outputs and scores — this prevents rationalization bias ("I wrote it this way because...") and forces genuine causal analysis.

**Why read-only tools:** The Analyst reads outputs and writes the Analytical Brief. No generation, no modification of outputs. It is an observer and analyst, not a participant.

---

## ANALYST INPUT

The Analyst receives:

| Input | Size (est.) | Source |
|-------|-------------|--------|
| ALL 7 scored outputs (full text) | ~21-35KB | Round N persona outputs |
| ALL 7 critiques from the Critic (full text) | ~3.5KB | Round N critique phase |
| scores.yaml — all scores across all 7 criteria | ~2KB | Round N scoring phase |
| Previous round's analytical-brief.md (Rounds 2-3 only) | ~3-5KB | Round N-1 Analyst output |
| This protocol (instructions) | ~2KB | This file |
| **Total** | **~32-48KB** | Well within any model's context window |

---

## ANALYST COMPARISON FRAMEWORK

The Analyst applies 4 comparison frameworks in sequence. Each framework reveals a different type of insight.

### Comparison 1: Winner vs. Runner-Up (Closest Pair)

These two scored most similarly — the smallest deltas reveal the most actionable technique differences.

**Procedure:**
1. Identify the #1 and #2 ranked competitors
2. For EACH criterion where they differ by >0.5:
   - Quote the specific passage from each that drove the score difference
   - Name the technique used (e.g., "proof embedding within narrative" vs. "standalone proof block after claim")
   - Quantify the impact: `[criterion]: winner [X.X] vs. runner-up [X.X] (+/- delta)`
3. Synthesize: what is the ONE technique modification that most separated them?

**Why this matters:** Small deltas between strong competitors isolate the precise technique that tips the balance. These are the most transferable insights.

### Comparison 2: Winner vs. Lowest Scorer (Maximum Delta Pair)

These two scored most differently — the largest deltas reveal the most impactful structural differences.

**Procedure:**
1. Identify the #1 and #7 ranked competitors
2. Identify the 2-3 criteria with the largest deltas
3. For each: what structural choice caused the gap?
4. Distinguish between technique gaps (fixable) and fundamental approach gaps (may require rethinking)

**Why this matters:** Large deltas reveal structural choices that create outsized score differences. These are the highest-leverage changes for the weakest performers.

### Comparison 3: Sibling Pairs (Same-Lens Personas)

Compare personas with similar lenses. When siblings score differently on the SAME criterion, the difference isolates the technique variant — same goal, different execution.

**Defined Sibling Pairs:**

| Pair | Shared Focus | What Difference Reveals |
|------|-------------|------------------------|
| Ogilvy vs. Bencivenga | Credibility/proof-focused | Which credibility architecture works better |
| Makepeace vs. Halbert | Entertainment/flow-focused | Which engagement approach produces better flow |
| Clemens vs. Schwartz | Clarity/sophistication-focused | Which clarity strategy preserves voice better |

**Procedure:**
1. For each sibling pair, find criteria where they diverge by >0.5
2. Both share the same strategic intent — so the delta isolates the technique variant
3. Name the lesson: "For [shared focus area], [technique A] outperforms [technique B] because [causal explanation]"

**Why this matters:** Sibling analysis controls for strategic intent and isolates pure technique differences.

### Comparison 4: Round-over-Round (Rounds 2-3 Only)

Compare each persona's current output to their previous round output. This tracks learning effectiveness and technique evolution.

**Procedure:**
1. For each persona that improved: what specifically changed?
2. For each persona that declined: what technique was lost?
3. For the winner: was the winning approach a refinement of a previous approach or a fundamentally new approach?
4. Flag any persona that degraded on a previously-strong criterion (regression signal)

**Why this matters:** Round-over-round analysis catches technique regression (improving one criterion by sacrificing another) and validates which Learning Brief recommendations were successfully absorbed.

---

## ANALYTICAL BRIEF OUTPUT FORMAT

```yaml
analytical_brief:
  round: [1|2|3]
  skill: "[skill name]"
  arena_mode: "[strategic|generative_full_draft|editorial_revision]"

  executive_summary: "[3-5 sentences: what differentiated the winner, what the
    key technique insight is, what the implications are for the next round]"

  winner_analysis:
    persona: "[name]"
    score: [X.X]
    defining_technique:
      name: "[specific, named technique]"
      description: "[what it is and how it works]"
      example_passage: "[quoted from output]"
      criteria_impact:
        - criterion: "[name]"
          score_with: [X.X]
          score_without: [X.X]  # From runner-up or previous round
          delta: [+X.X]

  closest_pair_analysis:
    winner: "[name]"
    runner_up: "[name]"
    score_delta: [X.X]
    differentiating_modifications:
      - modification: "[what the winner did differently]"
        criterion_affected: "[name]"
        impact: "[+X.X]"
        evidence_winner: "[quote from winner's output]"
        evidence_runner_up: "[quote from runner-up's output]"

  maximum_delta_analysis:
    winner: "[name]"
    lowest: "[name]"
    score_delta: [X.X]
    structural_gaps:
      - gap: "[what structural choice caused the gap]"
        criteria_affected: ["[criterion1]", "[criterion2]"]
        total_impact: "[+X.X combined]"

  sibling_analysis:
    - pair: ["[persona1]", "[persona2]"]
      lens: "[shared focus area]"
      differentiator: "[what technique variant separated them]"
      lesson: "[what this reveals about the optimal approach for this lens]"

  round_over_round:  # Rounds 2-3 only; omit for Round 1
    improvements:
      - persona: "[name]"
        criterion_improved: "[name]"
        before: [X.X]
        after: [X.X]
        what_changed: "[specific technique modification]"
    regressions:
      - persona: "[name]"
        criterion_regressed: "[name]"
        before: [X.X]
        after: [X.X]
        what_was_lost: "[specific technique or quality that degraded]"
    winner_evolution: "[refinement of previous approach | fundamentally new approach]"

  technique_transfer_recommendations:
    # What each non-winner should absorb — with SPECIFICITY
    - persona: "[name]"
      absorb_technique: "[named technique from winner analysis]"
      how_to_integrate: "[specific guidance for this persona's voice]"
      voice_preservation_note: "[what NOT to change]"
      expected_impact: "[which criteria should improve, by how much]"

  danger_signals:
    # Techniques that HURT scores — avoid in next round
    - technique: "[what was tried]"
      by_persona: "[who tried it]"
      negative_impact: "[which criterion, how much]"
      why_it_failed: "[causal explanation]"
```

---

## INTEGRATION WITH LEARNING BRIEF

The Analytical Brief REPLACES the current Learning Brief structure. It is a superset — it contains everything the Learning Brief had plus the causal analysis layer.

| Learning Brief Field | Analytical Brief Equivalent |
|---------------------|---------------------------|
| `winner.winning_techniques` | `winner_analysis.defining_technique` (with causal evidence) |
| `per_competitor_feedback` | `technique_transfer_recommendations` (with expected impact quantification) |
| `scoring_gaps` | Implicit in `closest_pair_analysis` and `maximum_delta_analysis` |
| `voice_preservation_note` | Retained in `technique_transfer_recommendations.voice_preservation_note` |

**Backward compatibility:** Any system component that reads the Learning Brief should read the Analytical Brief instead. The fields are richer but structurally compatible — `winner_analysis.persona` replaces `winner.competitor`, `technique_transfer_recommendations` replaces `per_competitor_feedback`.

---

## ANALYST VS. OTHER ARENA ROLES

| Role | What It Does | When | Model |
|------|-------------|------|-------|
| **Persona Generators** | Create competitive outputs per persona voice | Steps 1A, 2B, 3B | Sonnet/Opus |
| **Critic** | Identifies ONE weakest element per output | Steps 1B, 2C, 3C | Opus 4.6 |
| **Judge** | Scores outputs against 7 criteria. Produces rankings. | Steps 1D, 2E, 3E | Opus 4.6 |
| **Analyst** | Compares outputs to explain WHY scores differ. Isolates techniques. Produces Analytical Brief. | Steps 1E.5, 2E.5, 3E.5 | Opus 4.6 |

The Judge tells you WHO won. The Analyst tells you WHY they won and what EVERYONE can learn from the comparison.

---

## ANALYST SUBAGENT PROMPT TEMPLATE

```
You are the Arena Analyst for marketing-os Skill [SKILL_NAME], Round [N].

Your job: analyze WHY outputs scored differently by comparing closely related
outputs that performed differently.

You are NOT a judge. The scoring is already done. You are a causal analyst —
you explain the mechanisms behind the scores.

## Your Inputs

1. All 7 scored outputs (attached)
2. All 7 critiques from the Critic (attached)
3. Scores (attached as scores.yaml)
[ROUND 2-3 ONLY: 4. Previous round's analytical-brief.md (attached)]

## Your Task

Apply the 4 comparison frameworks in sequence:

1. CLOSEST PAIR — Winner (#[N]) vs. Runner-Up (#[N]): What tiny technique
   difference separated the top two? Quote specific passages.

2. MAXIMUM DELTA — Winner (#[N]) vs. Lowest (#[N]): What structural choice
   created the biggest gap? Distinguish fixable technique gaps from
   fundamental approach gaps.

3. SIBLING PAIRS:
   - Ogilvy vs. Bencivenga (credibility lens)
   - Makepeace vs. Halbert (engagement lens)
   - Clemens vs. Schwartz (clarity lens)
   For each pair: where did they diverge on the same criterion?

[ROUND 2-3 ONLY:
4. ROUND-OVER-ROUND — For each persona: what improved, what regressed,
   what technique was gained or lost? Was the winner's approach a refinement
   or a new direction?]

Then synthesize:
- Executive summary (3-5 sentences)
- Technique transfer recommendations per non-winning persona
  (what to absorb + how to integrate without losing voice)
- Danger signals (techniques that hurt scores — avoid next round)

## Output Format

Write the Analytical Brief in YAML format per ANALYST-PROTOCOL.md schema.

## Constraints

- Quote SPECIFIC passages as evidence — no vague claims
- Name techniques precisely — "proof embedding within narrative" not "better proof"
- Quantify impact with score deltas — "[criterion]: [X.X] vs [X.X] (+X.X)"
- Preserve persona identity in transfer recommendations — absorb TECHNIQUES not VOICE
- Be brutally honest about what didn't work and why
```

---

## TOKEN BUDGET

| Component | Tokens (est.) | Notes |
|-----------|---------------|-------|
| 7 outputs × ~3-5KB | ~10-15K tokens | Full text of all outputs |
| 7 critiques × ~500B | ~1.5K tokens | Critic evaluations |
| scores.yaml | ~800 tokens | All scores |
| Previous analytical brief (R2-R3) | ~2-3K tokens | Prior round analysis |
| Protocol instructions | ~1K tokens | This file (condensed) |
| **Total input** | **~15-21K tokens** | Well within context window |
| **Expected output** | **~3-5K tokens** | Analytical Brief |

**Cost per Arena:**
- One Opus 4.6 subagent call per round x 3 rounds = 3 calls
- Each call: ~20K input + ~5K output = ~25K tokens
- Total per Arena: ~75K tokens on Opus
- Estimated cost: ~$1-4 per Arena depending on caching

---

## TIER APPLICATION

| Tier | Analyst Runs? | Rounds | Notes |
|------|--------------|--------|-------|
| **Full** | YES — all 3 rounds | 3 | Full causal analysis every round |
| **Standard** | YES — 1 round | 1 | Single-round analysis. If Round 3 skipped via convergence governor, Analyst still runs on final round. |
| **Quick** | N/A | 0 | No Arena = no Analyst |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-14 | Initial creation. 4 comparison frameworks (closest pair, maximum delta, sibling pairs, round-over-round). Analytical Brief YAML schema. Subagent prompt template. Token budget and tier application. From ASI-Arch Enhancement 1 spec. |
