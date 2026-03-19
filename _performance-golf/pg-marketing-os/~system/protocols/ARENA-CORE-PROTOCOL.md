# ~system/protocols/ARENA-CORE-PROTOCOL.md — Shared Execution Protocol

**Version:** 2.0
**Created:** 2026-02-05
**Updated:** 2026-02-05
**Purpose:** Shared execution protocol for ALL 16 Arena Layers. Defines 2-round + audience evaluation multi-round competition, adversarial critique-revise phase, Synthesizer-as-Competitor (7th competitor), analytical briefs, context management, MC-CHECK integration, emergency protocols, Agent Team execution mode, and Effort Protocol integration.

**Authority:** This file has EQUAL authority to ~system/SYSTEM-CORE.md. All Arena-Layer files reference this protocol.

---

## CRITICAL: THIS PROTOCOL IS MANDATORY

Every Arena execution — strategic (03-08), generative (10-18), or editorial (20) — follows this protocol. No exceptions. No shortcuts. No "simplified" runs.

**What stays in each skill-specific ARENA-LAYER.md:**
- 7 skill-specific judging criteria (unique weights and rubrics)
- Persona generation instructions specific to that skill
- `arena_mode` field (`strategic` | `generative_full_draft` | `editorial_revision`)
- Critique-specific guidance (what the adversarial critic targets for THAT skill)
- Input requirements from upstream layers
- Output format to downstream layers
- Skill-specific quality thresholds
- Skill-specific anti-slop additions

---

## THE 7 COMPETITORS

Every Arena round features **7 competitors** generating independently:

| # | Competitor | Role | Approach |
|---|-----------|------|----------|
| 1 | **Makepeace** | Flow & Architecture | Persuasion flow, elegance, structural mastery |
| 2 | **Halbert** | Entertainment & Hook | Raw personality, entertainment value, hook power |
| 3 | **Schwartz** | Market Sophistication | Awareness stages, market positioning, evolution |
| 4 | **Ogilvy** | Credibility & Clarity | Research-backed credibility, elegant clarity |
| 5 | **Clemens** | Scientific Mechanism | Health/supplement positioning, scientific credibility |
| 6 | **Bencivenga** | Proof-First Persuasion | Evidence architecture, The Persuasion Equation |
| 7 | **The Architect** | Synthesizer-as-Competitor | Integration of multiple lenses into one coherent output |

**Reference:** See `ARENA-PERSONA-PANEL.md` for full persona specifications.

### The Architect (7th Competitor) — Dual Role

The Architect plays TWO distinct roles:

| Role | When | What |
|------|------|------|
| **In-Arena Competitor** | Rounds 1-2 | Generates ONE integrated output competing head-to-head against all 6 personas |
| **Post-Arena Hybrid Creator** | After Round 2 (FINAL) | Creates 2-3 phrase-level hybrids from all 7 Round 2 (FINAL) outputs |

**In-Arena behavior:** The Architect generates a COMPLETE output — not a synthesis of what others wrote. It approaches the task by integrating multiple editorial lenses simultaneously. It draws on flow (Makepeace), entertainment (Halbert), market calibration (Schwartz), credibility (Ogilvy), mechanism clarity (Clemens), and proof architecture (Bencivenga) to produce a single integrated output.

**Round 2 advantage:** The Architect sees ALL other outputs from the previous round + the Analytical Brief, giving it natural synthesis intelligence. This is the Architect's competitive edge — it learns what works from each persona and integrates those techniques.

---

## THE CRITIC — Dedicated Adversarial Role

**Name:** The Critic
**Role:** Adversarial quality enforcement
**NOT self-critique** (weak — personas defend their own work)
**NOT cross-persona critique** (biased — each persona critiques from their own lens)

### How The Critic Works

The Critic is a DEDICATED adversarial role that uses the SAME 7 skill-specific criteria as the judge. For each output:

1. **Evaluate against all 7 skill-specific criteria** (from the skill's ARENA-LAYER.md)
2. **Identify the ONE weakest element** — forces prioritization, not a laundry list
3. **Map weakness to a specific criterion** — must name which criterion is underperforming
4. **Provide actionable fix direction** — concrete, specific, implementable guidance
5. **Score the weakness severity** — 1-10 (10 = catastrophic, 1 = minor)

### Critique Output Format (Per Competitor)

```yaml
critique:
  competitor: "[persona name]"
  weakest_criterion: "[specific criterion from skill's 7]"
  weakness_description: "[what specifically fails]"
  severity: [1-10]
  evidence: "[quote from output that demonstrates weakness]"
  fix_direction: "[specific, actionable fix — not vague 'make it better']"
```

### Critique Constraints

- **ONE weakness per output** — forces the Critic to prioritize the most impactful issue
- **Must cite evidence** — quote the specific passage that demonstrates the weakness
- **Must be actionable** — "improve flow" is rejected; "add a bridge sentence between paragraph 3 and 4 to maintain momentum after the mechanism reveal" is accepted
- **Cannot contradict skill criteria** — the Critic uses the SAME criteria the judge uses

---

## 2-ROUND + AUDIENCE EVALUATION MANDATORY COMPETITION

**This is NOT optional. NOT a flag. 2 rounds + audience evaluation DEFAULT. Every Arena runs 2 rounds + audience evaluation.**

### Round 1: Initial Generation + Diversity Audit + Critique + Revision

```
ROUND 1:
  1A: 7 Competitors Generate independently
      - All 7 produce complete outputs per skill requirements
      - The Architect generates an integrated output (not synthesis of others)
      - Load specimens per skill's specimen injection protocol

  1A.1: Variant Diversity Audit (ARENA-DIVERSITY-PROTOCOL.md)
      - Classify all 7 outputs by: emotional frame, structural approach, entry angle, differentiating phrase
      - Pairwise convergence check (21 pairs)
      - If >3 convergent pairs: trigger Divergence Protocol (3 most-similar regenerate with differentiation constraint)

  1B: Adversarial Critique
      - The Critic evaluates ALL 7 outputs
      - Identifies ONE weakest element per output
      - Maps to specific criterion, provides fix direction

  1C: Targeted Revision
      - Each competitor receives their critique
      - Each competitor revises ONLY the identified weakness
      - Revision must address the specific fix direction
      - Persona voice MUST be maintained during revision
      - Maximum scope: targeted fix, not full rewrite

  1D: Scoring
      - Revised outputs scored against 7 skill-specific criteria + 2 diversity dimensions
      - Competitive Distance (10% weight): How different from what competitors run?
      - Pattern Break Bonus (5% weight): Does it violate category conventions?
      - Scores 1-10 per criterion with evidence
      - Weighted total calculated per skill's weights (existing weights redistributed proportionally)

  1D.1: Memorability Test
      - Recall one phrase per variant WITHOUT re-reading
      - Flag variants where no phrase is recalled as "forgettable" (informational)

  1E: Ranking
      - All 7 ranked by weighted score
      - Strengths and weaknesses documented per competitor

  1F: Analytical Brief Generated (includes diversity and memorability notes)
      - Winner's techniques extracted
      - What the winner did that others didn't
      - Persona-specific feedback for each non-winner
      - Scoring gaps identified (which criteria need improvement)
```

### Context Compression: Round 1 → Round 2

```
KEEP:
  - Winner output (VERBATIM — full text)
  - Analytical Brief (full)
  - All 7 critique-revision summaries (what was criticized, what was fixed)
  - All 7 scores

COMPRESS (to summaries):
  - Non-winning outputs → 2-3 sentence summary each
  - Persona generation rationale → key decisions only
```

### Round 2: Learning-Informed Regeneration + Diversity Audit + Critique + Revision

```
ROUND 2:
  2A: Analytical Brief Distributed
      - All 7 competitors receive the Analytical Brief
      - Key rule: Absorb TECHNIQUES, not VOICE
      - Halbert learning Ogilvy's credibility technique doesn't make Halbert sound like Ogilvy
      - Each competitor notes which techniques they'll integrate

  2B: 7 Competitors Re-generate
      - Fresh generation incorporating learnings
      - NOT revision of Round 1 output — NEW generation
      - Persona voice MAINTAINED while integrating winner techniques
      - The Architect has additional advantage: saw all 7 Round 1 outputs

  2B.1: Variant Diversity Audit (ARENA-DIVERSITY-PROTOCOL.md)
      - Re-classify all 7 outputs (learning integration can cause convergence)
      - Pairwise convergence check
      - If >3 convergent pairs: trigger Divergence Protocol

  2C: Adversarial Critique
      - Same protocol as Round 1
      - Critic checks if previous-round weaknesses were addressed
      - Identifies NEW weakest element (may differ from Round 1)

  2D: Targeted Revision
      - Same protocol as Round 1

  2E: Scoring & Ranking
      - Same criteria, same weights
      - Track improvement from Round 1 → Round 2

  2F: Cumulative Analytical Brief
      - Combines Round 1 + Round 2 learnings
      - Identifies persistent strengths across rounds
      - Identifies persistent weaknesses across rounds
      - Notes techniques that produced the biggest improvements
```

### Context Compression: Round 1 → Round 2 (FINAL)

```
KEEP:
  - Round 1 winner output (VERBATIM)
  - Round 2 winner output (VERBATIM)
  - Cumulative Analytical Brief (full)
  - All Round 2 scores

COMPRESS:
  - Round 1 non-winners → already compressed
  - Round 2 non-winners → 2-3 sentence summaries
  - Round 1 scores → keep totals only
```

### Round 2 (FINAL): FINAL Generation + Diversity Audit + Critique + Revision

```
ROUND 2 (FINAL):
  3A: Cumulative Analytical Brief Distributed
      - All techniques from Rounds 1+2 available
      - Persistent patterns highlighted
      - Each competitor knows their specific improvement areas

  3B: 7 Competitors Generate FINAL Versions
      - Best possible output incorporating all learnings
      - Full persona voice with integrated techniques
      - This is the FINAL competitive output

  3B.1: Variant Diversity Audit (ARENA-DIVERSITY-PROTOCOL.md)
      - FINAL diversity check — most critical round for convergence risk
      - Pairwise convergence check
      - If >3 convergent pairs: trigger Divergence Protocol (even in final round)

  3C: Adversarial Critique
      - Highest standard — this is the final check
      - Focus on remaining weaknesses that survived 2 rounds

  3D: Targeted Revision
      - Final revision opportunity
      - Precision fixes only

  3E: FINAL Scoring
      - Definitive scoring against all 7 criteria
      - All 7 final outputs scored

  3F: FINAL Ranking
      - All 7 ranked definitively
      - Complete scoring breakdown retained
      - ALL 7 Round 2 (FINAL) outputs kept in FULL (these go to human selection)
```

---

## ADAPTIVE CONVERGENCE GOVERNOR (Upgrade 2.2)

**Purpose:** Allow Round 2 (FINAL) to be skippable when Round 2 produces a clear winner with no meaningful differentiation remaining. Saves token spend without sacrificing quality.

### After Round 2 Scoring: Convergence Assessment

```
AFTER ROUND 2 SCORING:

CASE 1 — CLEAR WINNER (early exit eligible):
  IF Round 2 winner scores 9.0+ across ALL dimensions
  AND Round 2 winner leads Round 1 winner by 2+ points overall
  → OFFER early exit to human
  → Present: "Round 2 winner [persona] scores 9.0+ across all dimensions and
    leads Round 1 by [N] points. Round 2 (FINAL) may produce marginal improvement.
    Skip Round 2 (FINAL)? [Y/N]"
  → Human decides. If human says N, Round 2 (FINAL) proceeds normally.

CASE 2 — CONVERGENCE WARNING:
  IF Round 2 scores are within 0.5 points of Round 1 across all dimensions
  → FLAG: "Competitors may be converging on similar output."
  → Recommend: Inject additional diversity constraints before Round 2 (FINAL)
  → Reference ARENA-DIVERSITY-PROTOCOL.md Divergence Protocol

CASE 3 — NORMAL:
  IF neither Case 1 nor Case 2
  → Proceed to Round 2 (FINAL) normally
```

### Post-Round 2 (FINAL) Quality Floor

```
AFTER ROUND 2 (FINAL) SCORING:
  IF Round 2 (FINAL) winner scores below 7.0 on ANY dimension
  → FLAG for human review: "[dimension] scored [score], below 7.0 floor"
  → Human decides: proceed, request targeted revision, or re-run Arena
```

### Tier Constraints

| Tier | Round 2 (FINAL) Skippable? | Early Exit Offer? |
|------|-------------------|-------------------|
| **Full** | **NEVER** — 2 rounds + audience evaluation mandatory regardless of scores | No |
| **Standard** | Yes — if Case 1 conditions met AND human approves | Yes |
| **Quick** | N/A — no Arena | N/A |

### Cost Consideration

Each Arena round at 1M context (Full tier) or 200K (Standard) consumes significant tokens. Skipping an unnecessary Round 2 (FINAL) for Standard-tier tasks saves premium-priced tokens. This makes the convergence governor a cost optimization tool as well as a quality tool.

---

## CONTROLLED INTER-ROUND DIVERSITY (Upgrade 2.3)

**Purpose:** Prevent self-few-shotting — where Round 1 patterns lock in the structural approach for Round 2. Source: Manus "Context Engineering" Lesson 6: "Don't few-shot yourself."

### The Problem

If Round 1 produces 7 outputs with similar structure, the model mimics that format in Rounds 2-3 rather than genuinely exploring different approaches. The ARENA-DIVERSITY-PROTOCOL.md handles WITHIN-round diversity (pairwise convergence checks). This section handles BETWEEN-round diversity.

### Inter-Round Diversity Mechanisms

Between Arena rounds, the Arena Coordinator MUST:

1. **Vary presentation order** — Do NOT present Round N outputs in the same order to Round N+1 competitors. Shuffle the order to prevent positional bias.

2. **Vary emphasized dimension** — The Analytical Brief for each round should emphasize a DIFFERENT scoring dimension as the primary improvement target:
   - Round 1→2: Emphasize the lowest-scoring dimension across all competitors
   - Pre-Round 2 (FINAL): Emphasize a different dimension (even if the same one is still lowest)

3. **Introduce structural constraints** — Each round after Round 1 must include at least ONE structural constraint that differs from the previous round:
   - Round 2: "Your output MUST use a different opening structure than your Round 1 output"
   - Round 2 (FINAL): "Your output MUST use a different proof placement strategy than your Round 2 output"

4. **Cross-round convergence tracking** — After Round 2, compare Round 1 and Round 2 winners:
   - If both rounds produced the same persona as winner: note this but don't intervene
   - If the structural approach of the Round 2 winner is similar to Round 1 winner: flag for Divergence Protocol consideration before Round 2 (FINAL)

### Integration with ARENA-DIVERSITY-PROTOCOL.md

The existing protocol handles per-round diversity. This section adds the cross-round layer:

```
Round 1:
  → ARENA-DIVERSITY-PROTOCOL.md runs (within-round checks)

Round 1→2 transition:
  → Shuffle presentation order
  → Emphasize different dimension in Analytical Brief
  → Add structural constraint for Round 2

Round 2:
  → ARENA-DIVERSITY-PROTOCOL.md runs (within-round checks)
  → Cross-round convergence tracking (compare R1 vs R2 winners)

Pre-Round 2 (FINAL):
  → Shuffle presentation order again
  → Emphasize different dimension
  → Add different structural constraint for Round 2 (FINAL)
  → If convergence detected: additional divergence constraint

Round 2 (FINAL):
  → ARENA-DIVERSITY-PROTOCOL.md runs (within-round, FINAL check)
```

---

## ANALYTICAL BRIEF SPECIFICATION

### What a Analytical Brief Contains

```yaml
learning_brief:
  round: [1|2]
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
      voice_preservation_note: "[how to integrate without losing persona voice]"

  scoring_gaps:
    - criterion: "[name]"
      average_score: [float]
      winner_score: [float]
      gap: [float]
      improvement_direction: "[what would raise this across all competitors]"
```

### Persona Identity Preservation Rule

**CRITICAL:** When losers learn from winners, they absorb TECHNIQUES, not VOICE.

| Right | Wrong |
|-------|-------|
| Halbert integrates Ogilvy's credibility technique INTO entertainment-first voice | Halbert starts sounding like Ogilvy |
| Bencivenga uses Makepeace's flow transitions while maintaining proof-first architecture | Bencivenga abandons proof focus for flow |
| Schwartz uses Halbert's hook power while maintaining sophistication calibration | Schwartz drops sophistication to be "entertaining" |

**The Analytical Brief MUST include `voice_preservation_note`** for each competitor — explicit guidance on how to integrate the winner's technique without losing persona identity.

---

## POST-ARENA: SYNTHESIZER LAYER (2.6)

After Round 2 (FINAL) completes, the Synthesizer Layer activates:

```
POST-ARENA (Layer 2.6):
  1. The Architect decomposes ALL 7 Round 2 (FINAL) outputs into micro-elements
  2. Function tagging (what each phrase accomplishes)
  3. Cross-persona scoring of each micro-element
  4. Best-element matrix construction
  5. Hybrid reconstruction: 2-3 phrase-level hybrids
  6. Coherence validation (all 6 checks must pass)
  7. Score hybrids against 7 skill-specific criteria
```

**Reference:** See `skills/SYNTHESIZER-LAYER.md` for full synthesis protocol.

### Human Selection (BLOCKING)

After synthesis, human sees:

| Candidate Type | Count | Source |
|----------------|-------|--------|
| Pure Round 2 (FINAL) outputs | 7 | One from each competitor |
| Phrase-level hybrids | 2-3 | From Synthesizer (Layer 2.6) |
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

### `strategic` (Skills 03-08)

Strategic skills already generate complete packages (root cause expressions, mechanism packages, promise statements, etc.). The Arena adds 2-round + audience evaluation competition + critique-revise.

```
strategic mode:
  - Competitors generate COMPLETE strategic packages
  - No behavioral change from current generation approach
  - 2 rounds + audience evaluation of competition with critique-revise
  - Analytical briefs between rounds
  - Human selects winning package
```

### `generative_full_draft` (Skills 10-18)

Generative skills write COMPLETE pieces from scratch. Layer 2 draft output is reference material, NOT a template.

```
generative_full_draft mode:
  - Competitors write COMPLETE pieces from upstream strategic packages
  - Layer 2 draft = reference material and structural guide, NOT a template to vary
  - Each competitor generates their OWN version from scratch
  - Upstream packages (root cause, mechanism, promise, big idea, structure) are the input
  - Competitors are NOT constrained to follow the Layer 2 draft's approach
  - 2 rounds + audience evaluation of competition with critique-revise
  - Analytical briefs between rounds
  - Human selects winning piece
```

### `editorial_revision` (Skill 20)

Editorial stays revision-based. Per-issue competition with priority-based round rules.

```
editorial_revision mode:
  - Competitors generate REVISIONS of existing copy (per critique issues)
  - P1 issues (critical): MANDATORY 2 rounds + audience evaluation
  - P2 issues (important): MANDATORY 2 rounds + audience evaluation
  - P3+ issues (minor): CAN bypass with human confirmation
    - Human asked: "P3 issues detected. Run 2-round + audience evaluation arena or apply quick fixes?"
    - If human confirms bypass: apply fixes without full arena
    - If human requests arena: run full 2 rounds + audience evaluation
  - Each issue gets its own competition
  - Analytical briefs between rounds
  - Human selects winning revision per issue
```

---

## MC-CHECK INTEGRATION SCHEDULE

**8 MC-CHECK checkpoints across 2 rounds + audience evaluation:**

| # | Checkpoint | Trigger | What to Check |
|---|-----------|---------|---------------|
| 1 | **Pre-Arena** | Before Round 1 starts | All upstream packages loaded? Specimens loaded? Skill ARENA-LAYER.md read? |
| 2 | **Post-R1-Generation** | After 7 competitors generate in Round 1 | All 7 outputs complete? No abbreviations? Persona voices distinct? |
| 3 | **Post-R1-Critique** | After critique phase | All 7 critiques have evidence? Fix directions actionable? |
| 4 | **Post-R1-Scoring** | After Round 1 scoring | All 7 scored on all 7 criteria? Analytical Brief generated? |
| 5 | **Post-R2-Generation** | After Round 2 generation | Analytical Brief techniques integrated? Persona voices preserved? |
| 6 | **Post-R2-Scoring** | After Round 2 scoring | Improvement from R1? Cumulative Analytical Brief complete? |
| 7 | **Post-R2-Final-Scoring** | After Round 2 (FINAL) scoring | All 7 final outputs complete? Ready for synthesis? |
| 8 | **Pre-Human-Selection** | Before presenting to human | All 9-10 candidates ready? Scores documented? Rationale clear? |

### Arena MC-CHECK Format

```yaml
ARENA-MC-CHECK:
  checkpoint: "[1-8]"
  round: [1|2|post]
  phase: "[generation|critique|revision|scoring|synthesis|selection]"

  completeness:
    all_7_competitors_generated: [Y/N]
    all_outputs_complete_no_abbreviation: [Y/N]
    persona_voices_distinct: [Y/N]

  critique_quality:
    all_critiques_have_evidence: [Y/N]
    fix_directions_actionable: [Y/N]
    one_weakness_per_output: [Y/N]

  learning_integration:
    techniques_absorbed_not_voice: [Y/N]
    learning_brief_distributed: [Y/N]

  context_zone: "[GREEN|YELLOW|RED|CRITICAL]"

  result: "[PROCEED | PAUSE | HALT | SESSION_BREAK]"
```

---

## EMERGENCY / FAILURE PROTOCOLS

### RED Zone Mid-Arena

If context reaches RED zone during an Arena:

```
RED ZONE PROTOCOL:
  1. Complete current round (do NOT abandon mid-round)
  2. Generate state handoff document:
     - Current round number
     - All scores from completed rounds
     - Analytical Briefs generated so far
     - Winner outputs (verbatim)
     - Remaining rounds needed
  3. Request session break
  4. On resume: pick up at next round start with state handoff
```

### All-Below-Threshold

If ALL 7 competitors score below the skill's minimum threshold after Round 2 (FINAL):

```
ALL-BELOW-THRESHOLD PROTOCOL:
  1. Identify the HIGHEST scoring output (even if below threshold)
  2. Identify the 2-3 criteria dragging scores down
  3. Generate diagnostic report:
     - Which criteria are consistently weak
     - Whether upstream packages might be the issue
     - Whether specimens need different type matching
  4. Present to human with options:
     a. Accept highest scorer despite below-threshold (with acknowledgment)
     b. Request full regeneration with adjusted approach
     c. Request upstream package review
     d. Request manual intervention
  5. Human decides — BLOCKING
```

### Tied Scores

If two or more competitors are tied after Round 2 (FINAL):

```
TIED SCORE PROTOCOL:
  1. Present tied candidates equally (no artificial tiebreaker)
  2. Show per-criterion breakdown to highlight differences
  3. Let human select based on preference
  4. Note: Ties often mean the competitors excelled at DIFFERENT criteria
     — this is valuable information for the human
```

### Single-Round Exception

**There is NO single-round exception.** All arenas run 2 rounds + audience evaluation. Period.

The only bypass is `editorial_revision` mode for P3+ issues, where human can confirm quick-fix instead of full arena. Even then, the human must explicitly confirm — it's not automatic.

---

## OUTPUT SCHEMAS

### Per-Round Output

```yaml
round_output:
  round: [1|2]
  competitors:
    - name: "[persona]"
      output: "[full text or compressed summary depending on keep/compress rules]"
      critique:
        weakest_criterion: "[name]"
        weakness: "[description]"
        fix_direction: "[direction]"
      revised_output: "[post-revision text]"
      scores:
        criterion_1: [float]
        criterion_2: [float]
        criterion_3: [float]
        criterion_4: [float]
        criterion_5: [float]
        criterion_6: [float]
        criterion_7: [float]
        weighted_total: [float]
      rank: [1-7]

  learning_brief:
    winner: "[name]"
    winning_techniques: [list]
    per_competitor_feedback: [list]
    scoring_gaps: [list]
```

### Final Arena Output (Post-Round 2 FINAL)

```yaml
arena_final_output:
  skill: "[skill name]"
  arena_mode: "[strategic|generative_full_draft|editorial_revision]"
  rounds_completed: 2
  timestamp: "[ISO]"

  round_2_final_results:
    competitors:
      - name: "[persona]"
        final_output: "[FULL TEXT — all 7 kept complete]"
        final_scores:
          criterion_1: [float]
          # ... all 7
          weighted_total: [float]
        final_rank: [1-7]
        round_progression: [R1_score, R2_score]

  synthesis_results:
    hybrids:
      - hybrid_id: "[a|b|c]"
        output: "[full text]"
        composition: "[persona contributions]"
        scores:
          # ... all 7 criteria
          weighted_total: [float]
        coherence_passed: [true/false]

  human_selection:
    candidates_presented: [9-10]
    selected: "[persona name or hybrid_id]"
    selection_type: "[pure|hybrid]"
    selection_method: "[human_direct|human_modified|regenerated]"
    notes: "[human's notes if any]"
```

---

## FORBIDDEN BEHAVIORS

### Arena Execution

1. **Skipping rounds without convergence governor** — 2 rounds + audience evaluation mandatory for Full tier. Standard tier may skip Round 2 (FINAL) ONLY via the Adaptive Convergence Governor (9.0+ all dims, 2+ point lead, human approval). No "the output is good enough after Round 1"
2. **Skipping competitors** — All 7 must generate every round
3. **Skipping critique** — Every output gets adversarial critique every round
4. **Skipping revision** — Every competitor must address their critique
5. **Self-critique substitution** — The Critic is a DEDICATED role, not self-assessment
6. **Cross-persona critique** — The Critic uses SKILL criteria, not persona lenses
7. **Auto-selection** — Human selection is BLOCKING. No timeouts, no defaults
8. **Voice merging** — Learning absorbs TECHNIQUES not VOICE
9. **Abbreviating outputs** — "Similar to above" or "variation of X" is FORBIDDEN
10. **Single-round runs** — There is NO exception for fewer than 2 rounds (Standard tier: Round 2 (FINAL) skip via convergence governor is a 2-round minimum, not 1)
19. **Skipping inter-round diversity mechanisms** — Presentation order, emphasized dimension, and structural constraints MUST vary between rounds per Controlled Inter-Round Diversity protocol
20. **Same structural constraint across rounds** — Each round after Round 1 must have a DIFFERENT structural constraint

### Context Management

11. **Keeping all outputs verbatim across rounds** — Follow compression protocol
12. **Discarding winner outputs** — Winners are ALWAYS kept verbatim
13. **Discarding Analytical Briefs** — Always retained in full
14. **Continuing past RED zone** — Complete current round, then break

### Quality

15. **Accepting below-threshold** — Must follow all-below-threshold protocol
16. **Vague critiques** — "Needs improvement" is rejected; must be specific with evidence
17. **Non-actionable fix directions** — Must provide concrete implementation guidance
18. **Laundry-list critiques** — ONE weakness per output, forces prioritization

---

## AGENT TEAM EXECUTION MODE

**Why This Exists:** In single-context mode, all 7 competitors + Critic + Judge run in one Claude instance — causing persona contamination, self-critique weakness, and context pressure. Agent Teams gives each role its own independent context window, eliminating all three problems.

**Prerequisite:** Agent Teams must be enabled in Claude Code settings. See ~system/SYSTEM-CORE.md for setup.

### Team Architecture

```
TEAM LEAD (Arena Coordinator)
│
│   Context: Upstream packages + skill ARENA-LAYER.md + this protocol
│   Role: Orchestrate rounds, distribute inputs, collect outputs, coordinate handoffs
│
├── 7 PERSONA TEAMMATES (generate in parallel):
│   │
│   ├── Makepeace Agent ─── Own 200K context
│   ├── Halbert Agent ───── Own 200K context
│   ├── Schwartz Agent ──── Own 200K context
│   ├── Ogilvy Agent ────── Own 200K context
│   ├── Clemens Agent ───── Own 200K context
│   ├── Bencivenga Agent ── Own 200K context
│   └── Architect Agent ─── Own 200K context
│
├── CRITIC AGENT (adversarial — receives outputs BLIND):
│   │   Own 200K context: skill criteria + 7 outputs (NO generation context)
│   └── Genuinely adversarial — didn't create any of the work
│
└── JUDGE AGENT (scoring — separate from Critic):
    │   Own 200K context: skill criteria + 7 outputs + critiques + revisions
    └── No stake in any output. Generates Analytical Briefs.
```

### Persona Agent Prompt Package

Each persona teammate receives a **self-contained prompt package** containing:

```yaml
persona_agent_package:
  # 1. Identity
  persona_name: "[from ARENA-PERSONA-PANEL.md]"
  persona_specification: "[full persona spec — philosophy, approach, questions, judging lens]"

  # 2. Task
  skill_name: "[e.g., 11-lead, 12-story]"
  arena_mode: "[strategic | generative_full_draft | editorial_revision]"
  skill_instructions: "[what to generate — from skill's ARENA-LAYER.md]"
  judging_criteria: "[7 criteria with weights — from skill's ARENA-LAYER.md]"

  # 3. Inputs
  upstream_packages: "[root cause, mechanism, promise, big idea, structure — whatever exists]"
  specimens: "[type-matched patterns from skill's 0.2.6 file]"
  market_research: "[relevant quotes, proof points from research outputs]"

  # 4. Round Context (Round 2 only)
  round_number: [1|2]
  analytical_brief: "[from previous round — if Round 2]"
  previous_critique: "[what weakness was identified in previous round]"

  # 5. Constraints
  effort_level: "max"
  anti_slop_rules: "[from skill's ARENA-LAYER.md]"
  forbidden_behaviors: "[from this protocol]"
```

### Agent Team Round Flow

```
ROUND 1:
  Team Lead:
    1. Load upstream packages, specimens, skill instructions
    2. Construct 7 persona agent prompt packages
    3. Spawn all 7 persona teammates IN PARALLEL
    4. Wait for all 7 to complete generation
    5. Collect 7 outputs
    6. Send 7 outputs to Critic Agent (BLIND — no generation context)
    7. Collect 7 critiques from Critic
    8. Distribute each critique to corresponding persona teammate
    9. All 7 revise IN PARALLEL
    10. Collect 7 revised outputs
    11. Send all to Judge Agent
    12. Judge scores, ranks, generates Analytical Brief
    13. Team Lead receives Analytical Brief

ROUND 2:
  Team Lead:
    1. Distribute Analytical Brief to all 7 persona teammates
    2. Each teammate receives: Analytical Brief + their previous critique
    3. All 7 RE-GENERATE fresh IN PARALLEL (effort: max)
    4. [Steps 5-13 same as Round 1, cumulative Analytical Brief]

ROUND 2 (FINAL):
  Team Lead:
    1. Distribute Cumulative Analytical Brief to all 7
    2. All 7 generate FINAL versions IN PARALLEL (effort: max)
    3. [Steps 5-13 same, FINAL scoring]
    4. Send all 7 Round 2 (FINAL) outputs to Architect Agent for synthesis

POST-ARENA:
  Architect Agent:
    1. Receives all 7 Round 2 (FINAL) outputs (effort: max)
    2. Executes Synthesizer protocol (SYNTHESIZER-LAYER.md)
    3. Returns 2-3 phrase-level hybrids

  Team Lead:
    1. Assembles 9-10 candidates (7 pure + 2-3 hybrids)
    2. Presents to human with scores and recommendation
```

### Why Agent Teams Eliminates Context Compression

In single-context mode, outputs must be compressed between rounds because context fills up. With Agent Teams:

- Each persona agent starts each round with a **fresh context** containing only what it needs
- No compression required — all relevant material fits in 200K
- The Team Lead maintains the coordination state (scores, Analytical Briefs, rankings)
- Round 2 (FINAL) outputs are kept in FULL because each exists in its own agent's context

**Context compression rules (from earlier in this protocol) become OPTIONAL in Agent Team mode.** They remain MANDATORY for single-context fallback.

### Fallback: Single-Context Mode

If Agent Teams is unavailable:
- Execute the Arena in single-context mode per the standard protocol above
- Apply all context compression rules
- Use `effort: max` for generation phases
- Be aware of contamination and self-critique limitations
- This is the legacy mode — it works, but produces lower quality than Agent Teams
- Apply Single-Context Hardening (below) to reduce contamination

---

## SINGLE-CONTEXT ARENA HARDENING (Upgrade 3.6)

**Purpose:** Improve single-context Arena fallback to reduce cross-contamination between personas. Pushes single-context from B+ ceiling toward A- quality.

**Source:** Agents of Chaos proved cross-agent propagation through shared context. This section adds structural barriers within the single-context mode.

### Reduced Persona Count

In single-context mode, reduce from 7 to **4 personas** per round:

| # | Persona | Why Retained |
|---|---------|-------------|
| 1 | **Makepeace** | Flow architecture — unique structural lens |
| 2 | **Halbert** | Entertainment/hook — most distinctive voice |
| 3 | **Clemens** | Scientific mechanism — critical for health/supplement |
| 4 | **The Architect** | Synthesizer role is essential |

**Dropped in single-context:** Schwartz (overlaps with Architect's market calibration), Ogilvy (overlaps with Clemens' credibility), Bencivenga (overlaps with Clemens' proof focus).

**Why:** Fewer personas = more context space per persona = less contamination surface. 7 personas in one context means each gets ~1/7 of the generation attention. 4 personas each get ~1/4 — meaningfully more space for voice differentiation.

**Important:** This reduction applies ONLY to single-context mode. Agent Teams mode always uses all 7 personas.

### Fresh Voice Sample Loading

Before each persona generates (in sequential single-context execution), load a **fresh voice sample** immediately before generation:

```
FOR EACH PERSONA IN SEQUENCE:
  1. Write previous persona's output to file
  2. Clear conversation of previous generation content
  3. Load: upstream packages + specimens + Analytical Brief
  4. Load: FRESH VOICE SAMPLE for this persona
     → 500-1000 words of this persona's characteristic writing style
     → From ARENA-PERSONA-PANEL.md persona specification
     → This is the LAST thing loaded before generation
  5. Generate with persona voice primed by the fresh sample
  6. Write output to file immediately
```

**Why:** In single-context sequential generation, the most recent content in context has the strongest influence on generation style. Loading a voice sample last primes the model with the correct persona voice, counteracting contamination from the previous persona's output.

### Programmatic Similarity Check

After all personas generate in a round, run an n-gram overlap check:

```
SIMILARITY CHECK (post-round):
  For each pair of outputs:
    1. Compute 3-gram overlap percentage
    2. Compute 5-gram overlap percentage
    3. If any pair has 5-gram overlap > 40%:
       → FLAG: "[Persona A] and [Persona B] show [N]% 5-gram overlap"
       → Recommend: regenerate the lower-scoring persona with
          additional differentiation constraint
    4. If any pair has 3-gram overlap > 60%:
       → FLAG: convergence detected
       → Trigger Divergence Protocol from ARENA-DIVERSITY-PROTOCOL.md
```

**Integration with hooks:** The similarity check can be implemented as a programmatic validator (Layer 1 verification). See `.hooks/validators/` for the hook architecture.

### Single-Context Hardening Summary

| Mechanism | What It Does | Why It Helps |
|---|---|---|
| Reduced personas (7→4) | More context space per persona | Less contamination surface |
| Fresh voice sample | Prime persona voice before generation | Counteracts sequential contamination |
| Similarity check | Detect convergence programmatically | Catches contamination after the fact |
| File I/O isolation | Write/clear/re-read between personas | Structural barrier (existing protocol) |

These mechanisms stack with the existing Sequential Isolation Protocol (file I/O as contamination barrier).

---

## EFFORT PROTOCOL INTEGRATION

**Reference:** Full Effort Protocol in ~system/SYSTEM-CORE.md.

### Arena-Specific Effort Mapping

| Arena Phase | Effort | Applies To |
|-------------|--------|-----------|
| Pre-Arena setup (loading inputs) | `medium` | Team Lead only |
| Generation (all rounds) | `max` | All 7 persona agents |
| Adversarial Critique | `high` | Critic Agent |
| Targeted Revision | `max` | All 7 persona agents |
| Scoring & Ranking | `high` | Judge Agent |
| Analytical Brief Generation | `high` | Judge Agent |
| Synthesis (Layer 2.6) | `max` | Architect Agent |
| MC-CHECK | `medium` | Team Lead |
| Human Selection Presentation | `medium` | Team Lead |

### What `effort: max` Means for Arena Generation

Before producing ANY output token, persona agents must use extended thinking to:

1. **Re-read upstream packages** — not skim, DEEPLY analyze root cause + mechanism + promise + big idea
2. **Cross-reference specimens** — find the RIGHT structural pattern for THIS situation, not just the first match
3. **Reason about persona voice** — "What would [persona] ACTUALLY do with this material?" Deep character reasoning
4. **Explore 3+ creative angles** — consider multiple directions before committing to one
5. **Pre-check against criteria** — mentally score against the 7 skill-specific criteria BEFORE writing
6. **Integrate Analytical Brief** (Round 2) — deeply reason about HOW to absorb techniques without losing voice

**The model should spend MORE time thinking than writing.** The thinking IS the quality.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.2 | 2026-03-07 | SINGLE-CONTEXT HARDENING (Upgrade 3.6): Added Single-Context Arena Hardening section — reduced personas (7→4 in single-context), fresh voice sample loading before each persona, programmatic n-gram similarity check post-round. Raises single-context ceiling from B+ toward A-. |
| 2.1 | 2026-03-06 | DIVERSITY ENFORCEMENT: Added Variant Diversity Audit step (1A.1/2B.1/3B.1) between generation and critique in each round — classifies outputs, pairwise convergence check, Divergence Protocol if >3 convergent pairs. Added Competitive Distance (10% weight) and Pattern Break Bonus (5% weight) as new evaluation dimensions. Added Memorability Test (1D.1) post-scoring. Reference: `~system/protocols/ARENA-DIVERSITY-PROTOCOL.md`. |
| 2.0 | 2026-02-05 | AGENT TEAMS + EFFORT PROTOCOL: Added Agent Team Execution Mode (team architecture with 7 persona teammates + Critic + Judge as separate agents, persona agent prompt package spec, agent team round flow, context compression elimination in team mode, single-context fallback). Added Effort Protocol Integration (arena-specific effort mapping, what max effort means for generation with 6-point pre-generation checklist). Addresses three root quality constraints: persona contamination, no extended reasoning during generation, context pressure degradation. |
| 1.0 | 2026-02-05 | Initial creation: 2-round + audience evaluation mandatory competition, adversarial critique-revise protocol, Synthesizer-as-Competitor (7th competitor), analytical brief specification, persona identity preservation rule, context compression protocol, MC-CHECK integration (8 checkpoints), arena modes (strategic/generative_full_draft/editorial_revision), emergency protocols, output schemas, forbidden behaviors |

---

## ACKNOWLEDGMENT

This protocol exists because **single-round, 6-competitor arenas without critique produced good but not great outputs**. The 4 upgrades — critique-before-scoring, 2-round + audience evaluation competition, Synthesizer-as-Competitor, and full-draft mode — systematically address the gaps. Critique catches weaknesses that scoring alone misses. Multiple rounds allow losers to learn from winners. The Synthesizer competing head-to-head proves that integration can beat specialization. Full-draft mode lets generative skills reach their potential instead of being constrained by a single Layer 2 draft.
