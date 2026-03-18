# Arena Core Protocol
**Quality Engine v4** | Component: Protocol
**Purpose:** Multi-perspective competitive generation with adversarial critique, learning briefs, and synthesis — producing 9-10 candidates for human selection
**System-Agnostic:** Works with any AI model or agent framework

---

## CRITICAL: THIS PROTOCOL IS MANDATORY

Every Arena execution — strategic, generative, or editorial — follows this protocol. No exceptions. No shortcuts. No "simplified" runs.

**What stays in each task-specific Arena configuration:**
- 7 task-specific judging criteria (unique weights and rubrics)
- Perspective generation instructions specific to that task
- Arena mode designation (`strategic` | `generative_full_draft` | `editorial_revision`)
- Critique-specific guidance (what the adversarial critic targets)
- Input requirements from upstream stages
- Output format to downstream stages
- Task-specific quality thresholds

---

## THE 7 PERSPECTIVES

Every Arena round features **7 perspectives** generating independently:

| # | Perspective | Role | Approach |
|---|------------|------|----------|
| 1 | **The Structuralist** | Flow & Architecture | Persuasion flow, elegance, structural mastery |
| 2 | **The Provocateur** | Entertainment & Hook | Raw personality, entertainment value, hook power |
| 3 | **The Strategist** | Market Calibration | Awareness stages, market positioning, audience sophistication |
| 4 | **The Scholar** | Credibility & Clarity | Research-backed credibility, elegant clarity |
| 5 | **The Specialist** | Domain Mechanism | Domain-specific credibility, scientific/technical precision |
| 6 | **The Analyst** | Proof-First Persuasion | Evidence architecture, proof sequencing |
| 7 | **The Architect** | Synthesizer-as-Competitor | Integration of multiple lenses into one coherent output |

### The Architect (7th Perspective) — Dual Role

The Architect plays TWO distinct roles:

| Role | When | What |
|------|------|------|
| **In-Arena Competitor** | Rounds 1-3 | Generates ONE integrated output competing head-to-head against all 6 perspectives |
| **Post-Arena Hybrid Creator** | After Round 3 | Creates 2-3 phrase-level hybrids from all 7 Round 3 outputs |

**In-Arena behavior:** The Architect generates a COMPLETE output — not a synthesis of what others wrote. It approaches the task by integrating multiple editorial lenses simultaneously: flow, entertainment, market calibration, credibility, mechanism clarity, and proof architecture.

**Round 2-3 advantage:** The Architect sees ALL other outputs from the previous round + the Learning Brief, giving it natural synthesis intelligence.

---

## THE CRITIC — Dedicated Adversarial Role

**Role:** Adversarial quality enforcement
**NOT self-critique** (weak — perspectives defend their own work)
**NOT cross-perspective critique** (biased — each perspective critiques from their own lens)

### How The Critic Works

The Critic is a DEDICATED adversarial role that uses the SAME task-specific criteria as the judge. For each output:

1. **Evaluate against all task-specific criteria**
2. **Identify the ONE weakest element** — forces prioritization, not a laundry list
3. **Map weakness to a specific criterion** — must name which criterion is underperforming
4. **Provide actionable fix direction** — concrete, specific, implementable guidance
5. **Score the weakness severity** — 1-10 (10 = catastrophic, 1 = minor)

### Critique Output Format (Per Competitor)

```yaml
critique:
  competitor: "[perspective name]"
  weakest_criterion: "[specific criterion from task's judging set]"
  weakness_description: "[what specifically fails]"
  severity: [1-10]
  evidence: "[quote from output that demonstrates weakness]"
  fix_direction: "[specific, actionable fix — not vague 'make it better']"
```

### Critique Constraints

- **ONE weakness per output** — forces the Critic to prioritize the most impactful issue
- **Must cite evidence** — quote the specific passage that demonstrates the weakness
- **Must be actionable** — "improve flow" is rejected; "add a bridge sentence between paragraph 3 and 4 to maintain momentum after the mechanism reveal" is accepted
- **Cannot contradict task criteria** — the Critic uses the SAME criteria the judge uses

---

## 3-ROUND MANDATORY COMPETITION

**This is NOT optional. NOT a flag. 3 rounds DEFAULT. Every Arena runs 3 rounds.**

### Round 1: Initial Generation + Diversity Audit + Critique + Revision

```
ROUND 1:
  1A: 7 Perspectives Generate independently
      - All 7 produce complete outputs per task requirements
      - The Architect generates an integrated output (not synthesis of others)
      - Load reference specimens per task's specimen injection protocol

  1A.1: Variant Diversity Audit
      - Classify all 7 outputs by: emotional frame, structural approach,
        entry angle, differentiating phrase
      - Pairwise convergence check (21 pairs)
      - If >3 convergent pairs: trigger Divergence Protocol
        (3 most-similar regenerate with differentiation constraint)

  1B: Adversarial Critique
      - The Critic evaluates ALL 7 outputs
      - Identifies ONE weakest element per output
      - Maps to specific criterion, provides fix direction

  1C: Targeted Revision
      - Each perspective receives their critique
      - Each perspective revises ONLY the identified weakness
      - Revision must address the specific fix direction
      - Perspective voice MUST be maintained during revision
      - Maximum scope: targeted fix, not full rewrite

  1D: Scoring
      - Revised outputs scored against task-specific criteria + 2 diversity dimensions
      - Competitive Distance (10% weight): How different from what competitors produced?
      - Pattern Break Bonus (5% weight): Does it violate category conventions?
      - Scores 1-10 per criterion with evidence
      - Weighted total calculated per task's weights

  1D.1: Memorability Test
      - Recall one phrase per variant WITHOUT re-reading
      - Flag variants where no phrase is recalled as "forgettable" (informational)

  1E: Ranking
      - All 7 ranked by weighted score
      - Strengths and weaknesses documented per perspective

  1F: Learning Brief Generated
      - Winner's techniques extracted
      - What the winner did that others didn't
      - Perspective-specific feedback for each non-winner
      - Scoring gaps identified (which criteria need improvement)
```

### Context Compression: Round 1 to Round 2

```
KEEP:
  - Winner output (VERBATIM — full text)
  - Learning Brief (full)
  - All 7 critique-revision summaries (what was criticized, what was fixed)
  - All 7 scores

COMPRESS (to summaries):
  - Non-winning outputs -> 2-3 sentence summary each
  - Generation rationale -> key decisions only
```

### Round 2: Learning-Informed Regeneration + Diversity Audit + Critique + Revision

```
ROUND 2:
  2A: Learning Brief Distributed
      - All 7 perspectives receive the Learning Brief
      - Key rule: Absorb TECHNIQUES, not VOICE
      - Perspective A learning Perspective B's technique doesn't make A sound like B
      - Each perspective notes which techniques they'll integrate

  2B: 7 Perspectives Re-generate
      - Fresh generation incorporating learnings
      - NOT revision of Round 1 output — NEW generation
      - Perspective voice MAINTAINED while integrating winner techniques

  2B.1: Variant Diversity Audit
      - Re-classify all 7 outputs (learning integration can cause convergence)
      - Pairwise convergence check
      - If >3 convergent pairs: trigger Divergence Protocol

  2C-2F: Same protocol as Round 1 (Critique, Revision, Scoring, Cumulative Learning Brief)
```

### Context Compression: Round 2 to Round 3

```
KEEP:
  - Round 1 winner output (VERBATIM)
  - Round 2 winner output (VERBATIM)
  - Cumulative Learning Brief (full)
  - All Round 2 scores

COMPRESS:
  - Round 1 non-winners -> already compressed
  - Round 2 non-winners -> 2-3 sentence summaries
  - Round 1 scores -> keep totals only
```

### Round 3: FINAL Generation + Diversity Audit + Critique + Revision

```
ROUND 3:
  3A: Cumulative Learning Brief Distributed
  3B: 7 Perspectives Generate FINAL Versions
  3B.1: Variant Diversity Audit (FINAL — most critical for convergence risk)
  3C: Adversarial Critique (highest standard — final check)
  3D: Targeted Revision (precision fixes only)
  3E: FINAL Scoring (definitive scoring against all criteria)
  3F: FINAL Ranking
      - All 7 ranked definitively
      - ALL 7 Round 3 outputs kept in FULL (these go to human selection)
```

---

## ADAPTIVE CONVERGENCE GOVERNOR

**Purpose:** Allow Round 3 to be skippable when Round 2 produces a clear winner with no meaningful differentiation remaining. Saves token spend without sacrificing quality.

### After Round 2 Scoring: Convergence Assessment

```
CASE 1 — CLEAR WINNER (early exit eligible):
  IF Round 2 winner scores 9.0+ across ALL dimensions
  AND Round 2 winner leads Round 1 winner by 2+ points overall
  -> OFFER early exit to human
  -> Human decides. If human says N, Round 3 proceeds normally.

CASE 2 — CONVERGENCE WARNING:
  IF Round 2 scores are within 0.5 points of Round 1 across all dimensions
  -> FLAG: "Perspectives may be converging on similar output."
  -> Recommend: Inject additional diversity constraints before Round 3

CASE 3 — NORMAL:
  -> Proceed to Round 3 normally
```

### Tier Constraints

| Tier | Round 3 Skippable? | Early Exit Offer? |
|------|-------------------|-------------------|
| **Full** | **NEVER** — 3 rounds mandatory regardless of scores | No |
| **Standard** | Yes — if Case 1 conditions met AND human approves | Yes |
| **Quick** | N/A — no Arena | N/A |

---

## CONTROLLED INTER-ROUND DIVERSITY

**Purpose:** Prevent self-few-shotting — where Round 1 patterns lock in the structural approach for Rounds 2 and 3.

### Inter-Round Diversity Mechanisms

Between Arena rounds, the Arena Coordinator MUST:

1. **Vary presentation order** — Do NOT present Round N outputs in the same order to Round N+1 perspectives. Shuffle to prevent positional bias.

2. **Vary emphasized dimension** — The Learning Brief for each round should emphasize a DIFFERENT scoring dimension as the primary improvement target.

3. **Introduce structural constraints** — Each round after Round 1 must include at least ONE structural constraint that differs from the previous round.

4. **Cross-round convergence tracking** — After Round 2, compare Round 1 and Round 2 winners for structural similarity.

---

## LEARNING BRIEF SPECIFICATION

### What a Learning Brief Contains

```yaml
learning_brief:
  round: [1|2|3]
  type: [round_learning | cumulative_learning]

  winner:
    competitor: "[name]"
    score: [float]
    winning_techniques:
      - technique: "[specific technique used]"
        criterion_impact: "[which criterion this boosted]"
        example: "[quote from output demonstrating technique]"

  per_competitor_feedback:
    - competitor: "[name]"
      score: [float]
      rank: [1-7]
      biggest_gap_criterion: "[criterion name]"
      gap_score: [float]
      recommended_technique: "[from winner — what to absorb]"
      voice_preservation_note: "[how to integrate without losing perspective voice]"

  scoring_gaps:
    - criterion: "[name]"
      average_score: [float]
      winner_score: [float]
      gap: [float]
      improvement_direction: "[what would raise this across all perspectives]"
```

### Perspective Identity Preservation Rule

**CRITICAL:** When losers learn from winners, they absorb TECHNIQUES, not VOICE.

The Learning Brief MUST include `voice_preservation_note` for each perspective — explicit guidance on how to integrate the winner's technique without losing perspective identity.

---

## POST-ARENA: SYNTHESIS LAYER

After Round 3 completes, the Synthesis Layer activates:

```
POST-ARENA:
  1. The Architect decomposes ALL 7 Round 3 outputs into micro-elements
  2. Function tagging (what each phrase accomplishes)
  3. Cross-perspective scoring of each micro-element
  4. Best-element matrix construction
  5. Hybrid reconstruction: 2-3 phrase-level hybrids
  6. Coherence validation (all checks must pass)
  7. Score hybrids against task-specific criteria
```

### Human Selection (BLOCKING)

After synthesis, human sees:

| Candidate Type | Count | Source |
|----------------|-------|--------|
| Pure Round 3 outputs | 7 | One from each perspective |
| Phrase-level hybrids | 2-3 | From Synthesizer |
| **Total** | **9-10** | All presented for selection |

```
HUMAN SELECTION (BLOCKING):
  - Present all 9-10 candidates with scores
  - Rationale for top-ranked
  - Recommendation with reasoning
  - NO auto-selection permitted
  - NO timeout selection
  - Human MUST explicitly select
  - Options: select, request modification, request regeneration, custom direction
```

---

## ARENA MODES

### `strategic`

Strategic tasks generate complete packages (analysis frameworks, positioning statements, etc.). The Arena adds 3-round competition + critique-revise.

### `generative_full_draft`

Generative tasks write COMPLETE pieces from scratch. Any prior draft output is reference material, NOT a template. Each perspective generates their OWN version from the upstream strategic packages.

### `editorial_revision`

Editorial stays revision-based. Per-issue competition with priority-based round rules:
- P1 issues (critical): MANDATORY 3 rounds
- P2 issues (important): MANDATORY 3 rounds
- P3+ issues (minor): CAN bypass with human confirmation

---

## CHECKPOINT INTEGRATION

**8 checkpoints across 3 rounds:**

| # | Checkpoint | Trigger | What to Check |
|---|-----------|---------|---------------|
| 1 | Pre-Arena | Before Round 1 | All upstream packages loaded? Specimens loaded? Task config read? |
| 2 | Post-R1-Generation | After generation | All 7 outputs complete? No abbreviations? Perspective voices distinct? |
| 3 | Post-R1-Critique | After critique | All 7 critiques have evidence? Fix directions actionable? |
| 4 | Post-R1-Scoring | After scoring | All 7 scored on all criteria? Learning Brief generated? |
| 5 | Post-R2-Generation | After R2 generation | Learning Brief techniques integrated? Perspective voices preserved? |
| 6 | Post-R2-Scoring | After R2 scoring | Improvement from R1? Cumulative Learning Brief complete? |
| 7 | Post-R3-Scoring | After R3 scoring | All 7 final outputs complete? Ready for synthesis? |
| 8 | Pre-Human-Selection | Before presenting | All 9-10 candidates ready? Scores documented? Rationale clear? |

---

## EMERGENCY / FAILURE PROTOCOLS

### Context Limit Mid-Arena

If context reaches critical zone during an Arena:

```
1. Complete current round (do NOT abandon mid-round)
2. Generate state handoff document:
   - Current round number
   - All scores from completed rounds
   - Learning Briefs generated so far
   - Winner outputs (verbatim)
   - Remaining rounds needed
3. Request session break
4. On resume: pick up at next round start with state handoff
```

### All-Below-Threshold

If ALL 7 perspectives score below the task's minimum threshold after Round 3:

```
1. Identify the HIGHEST scoring output (even if below threshold)
2. Identify the 2-3 criteria dragging scores down
3. Generate diagnostic report:
   - Which criteria are consistently weak
   - Whether upstream packages might be the issue
   - Whether specimens need different type matching
4. Present to human with options:
   a. Accept highest scorer despite below-threshold
   b. Request full regeneration with adjusted approach
   c. Request upstream package review
   d. Request manual intervention
5. Human decides — BLOCKING
```

### Tied Scores

```
1. Present tied candidates equally (no artificial tiebreaker)
2. Show per-criterion breakdown to highlight differences
3. Let human select based on preference
```

---

## SINGLE-CONTEXT HARDENING

**Purpose:** When running all perspectives in a single AI context (rather than separate agent instances), apply these mechanisms to reduce cross-contamination.

### Reduced Perspective Count

In single-context mode, reduce from 7 to **4 perspectives** per round:

| # | Perspective | Why Retained |
|---|------------|-------------|
| 1 | **The Structuralist** | Flow architecture — unique structural lens |
| 2 | **The Provocateur** | Entertainment/hook — most distinctive voice |
| 3 | **The Specialist** | Domain mechanism — critical for technical credibility |
| 4 | **The Architect** | Synthesizer role is essential |

### Fresh Voice Sample Loading

Before each perspective generates (in sequential single-context execution), load a **fresh voice sample** immediately before generation to prime the correct perspective voice.

### Programmatic Similarity Check

After all perspectives generate in a round, run an n-gram overlap check:

```
For each pair of outputs:
  1. Compute 3-gram and 5-gram overlap percentage
  2. If any pair has 5-gram overlap > 40%: FLAG convergence
  3. If any pair has 3-gram overlap > 60%: Trigger Divergence Protocol
```

---

## MULTI-AGENT EXECUTION MODE

When agent orchestration is available, each role gets its own independent context:

```
COORDINATOR (Arena Manager)
|
+-- 7 PERSPECTIVE AGENTS (generate in parallel, each with own context)
+-- CRITIC AGENT (adversarial — receives outputs BLIND, no generation context)
+-- JUDGE AGENT (scoring — separate from Critic, generates Learning Briefs)
```

**Why:** Eliminates persona contamination, enables genuine adversarial critique, removes context pressure from accumulated outputs.

Context compression rules become OPTIONAL in multi-agent mode. They remain MANDATORY for single-context fallback.

---

## OUTPUT SCHEMAS

### Per-Round Output

```yaml
round_output:
  round: [1|2|3]
  competitors:
    - name: "[perspective]"
      output: "[full text or compressed summary per keep/compress rules]"
      critique:
        weakest_criterion: "[name]"
        weakness: "[description]"
        fix_direction: "[direction]"
      revised_output: "[post-revision text]"
      scores:
        criterion_1: [float]
        # ... all criteria
        weighted_total: [float]
      rank: [1-7]
  learning_brief: { ... }
```

### Final Arena Output

```yaml
arena_final_output:
  task: "[task name]"
  arena_mode: "[strategic|generative_full_draft|editorial_revision]"
  rounds_completed: 3
  timestamp: "[ISO]"

  round_3_results:
    competitors:
      - name: "[perspective]"
        final_output: "[FULL TEXT — all 7 kept complete]"
        final_scores: { ... }
        final_rank: [1-7]
        round_progression: [R1_score, R2_score, R3_score]

  synthesis_results:
    hybrids:
      - hybrid_id: "[a|b|c]"
        output: "[full text]"
        composition: "[perspective contributions]"
        scores: { ... }
        coherence_passed: [true/false]

  human_selection:
    candidates_presented: [9-10]
    selected: "[perspective name or hybrid_id]"
    selection_type: "[pure|hybrid]"
    selection_method: "[human_direct|human_modified|regenerated]"
```

---

## FORBIDDEN BEHAVIORS

### Arena Execution
1. Skipping rounds without convergence governor approval
2. Skipping perspectives — all must generate every round
3. Skipping critique — every output gets adversarial critique every round
4. Skipping revision — every perspective must address their critique
5. Self-critique substitution — the Critic is a DEDICATED role
6. Cross-perspective critique — the Critic uses TASK criteria, not perspective lenses
7. Auto-selection — human selection is BLOCKING
8. Voice merging — learning absorbs TECHNIQUES not VOICE
9. Abbreviating outputs — "similar to above" or "variation of X" is FORBIDDEN
10. Single-round runs — minimum 2 rounds (Standard tier with convergence governor), 3 rounds (Full tier)
11. Same structural constraint across rounds

### Context Management
12. Keeping all outputs verbatim across rounds — follow compression protocol
13. Discarding winner outputs — winners are ALWAYS kept verbatim
14. Discarding Learning Briefs — always retained in full
15. Continuing past context limit — complete current round, then break

### Quality
16. Accepting below-threshold — must follow all-below-threshold protocol
17. Vague critiques — must be specific with evidence
18. Non-actionable fix directions — must provide concrete implementation guidance
19. Laundry-list critiques — ONE weakness per output, forces prioritization
