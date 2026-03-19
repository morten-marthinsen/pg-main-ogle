# ASI-Arch Architecture Upgrades — Implementation Specs

**Version:** 1.0
**Created:** 2026-03-11
**Source Paper:** "AlphaGo Moment for Model Architecture Discovery" (Liu et al., July 2025, arXiv:2507.18074)
**Purpose:** Seven architectural enhancements transplanted from ASI-Arch's closed-loop evolutionary framework to marketing-os Arena and pipeline
**Implementation Priority:** Numbered 1-7, implement in order (dependencies cascade)

---

## TABLE OF CONTENTS

1. [Enhancement 1: Analyst Agent in Arena](#enhancement-1-analyst-agent-in-arena)
2. [Enhancement 2: Sigmoid-Capped Scoring](#enhancement-2-sigmoid-capped-scoring)
3. [Enhancement 3: Self-Revision Protocol](#enhancement-3-self-revision-protocol)
4. [Enhancement 4: Dynamic Context Framing](#enhancement-4-dynamic-context-framing)
5. [Enhancement 5: Problem-Aware Specimen Retrieval](#enhancement-5-problem-aware-specimen-retrieval)
6. [Enhancement 6: Campaign Phylogeny](#enhancement-6-campaign-phylogeny)
7. [Enhancement 7: Convergence Paradox Round-Aware Thresholds](#enhancement-7-convergence-paradox-round-aware-thresholds)
8. [Dependency Map](#dependency-map)
9. [Implementation Sequence](#implementation-sequence)

---

## Enhancement 1: Analyst Agent in Arena

### ASI-Arch Concept

ASI-Arch's four-agent loop includes an Analyst module that runs AFTER every experiment. The Analyst receives the current experiment's results, the parent architecture's results, and sibling architectures' results. By comparing closely related designs that performed differently, it isolates WHICH specific modifications caused the improvement. This is empirical ablation through structural proximity.

The Analyst's output serves a dual function:
1. Archived analysis that informs subsequent design cycles
2. A structured summary of shortcomings that serves as a retrieval query against the Cognition Base

Key finding from the paper: SOTA results rely 44.8% on self-generated analytical insights (vs. 37.7% for non-SOTA). The Analyst is the mechanism that generates these insights.

### Current State in Marketing-OS

The Analytical Brief generated after each Arena round contains:
- Winner persona and score
- `winning_techniques` (list of techniques with criterion impact and example)
- Per-competitor feedback with biggest gap criterion
- `voice_preservation_note` per competitor
- Scoring gaps with improvement direction

**What's missing:** The Analytical Brief says "Makepeace won with score 9.1" and "winning technique: embedded proof within narrative paragraph." It does NOT say:
- "Makepeace modified proof deployment from 'separate proof block after claim' to 'proof embedded within narrative paragraph.' This modification improved Flow Enhancement from 7.8 to 8.6 (+0.8) and Voice Preservation from 8.2 to 8.5 (+0.3)."
- "Halbert attempted a similar modification but applied it to the wrong section (mechanism instead of lead), decreasing Clarity by 0.4."
- "Bencivenga's proof-first architecture scored highest on Threading Preservation (9.2) but lowest on Flow (6.8) — the proof density broke narrative momentum."

The current Analytical Brief tells WHAT won. The Analyst tells WHY it won, what the delta was, what the comparison reveals, and what didn't work and why.

### What Changes

Add an Analyst phase between Arena Scoring (Step 1E) and Analytical Brief Generation (Step 1F). The Analyst produces a structured "Analytical Brief" that replaces the current Analytical Brief with a deeper causal analysis.

### Architecture

```
ROUND 1:
  1A: 7 Competitors Generate
  1A.1: Variant Diversity Audit
  1B: Adversarial Critique
  1C: Targeted Revision
  1D: Scoring
  1E: Ranking
  ─── NEW ───
  1E.5: ANALYST PHASE
    - Reads ALL 7 scored outputs + all critiques + all scores
    - Compares winner vs. runner-up (closest pair)
    - Compares winner vs. lowest scorer (maximum delta pair)
    - Compares sibling pairs (same-lens personas)
    - Isolates WHICH modifications caused WHICH score changes
    - Outputs: analytical-brief.md (replaces learning-brief.md)
  ─────────
  1F: Analytical Brief Distributed (enhanced Analytical Brief)
```

### Files to Create

#### `~system/protocols/ANALYST-PROTOCOL.md`

```markdown
# Analyst Protocol — Causal Analysis Between Arena Rounds

## Purpose

The Analyst runs after each Arena round scoring. It produces a structured
analytical brief that isolates WHY specific outputs scored higher than others
by comparing closely related outputs that performed differently.

## When to Run

After Step 1E (Ranking) and before Step 1F (Analytical Brief distribution).
Runs once per round (3 times total in a Full tier Arena).

## Analyst Subagent Configuration

Model: Opus 4.6 (Strategy cognitive role — see MODEL-ROUTING.md)
Tools: Read, Glob, Grep ONLY (analysis, not generation)
Fresh context: message_history=None (no contamination from generation)

## Analyst Input

The Analyst receives:
1. ALL 7 scored outputs (full text)
2. ALL 7 critiques from the Critic (full text)
3. scores.yaml — all scores across all 7 criteria
4. Previous round's analytical-brief.md (Round 2 only)

## Analyst Comparison Framework

### Comparison 1: Winner vs. Runner-Up (Closest Pair)
- These two scored most similarly — the smallest deltas reveal the
  most actionable technique differences
- For EACH criterion where they differ by >0.5:
  - Quote the specific passage from each that drove the score difference
  - Name the technique used (e.g., "proof embedding within narrative" vs.
    "standalone proof block after claim")
  - Quantify the impact: "[criterion]: winner [X.X] vs. runner-up [X.X] (+/- delta)"

### Comparison 2: Winner vs. Lowest Scorer (Maximum Delta Pair)
- These two scored most differently — the largest deltas reveal the
  most impactful structural differences
- Identify the 2-3 criteria with the largest deltas
- For each: what structural choice caused the gap?

### Comparison 3: Sibling Pairs (Same-Lens Personas)
- Compare personas with similar lenses:
  - Ogilvy vs. Bencivenga (both credibility-focused)
  - Makepeace vs. Halbert (both entertainment/flow-focused)
  - Clemens vs. Schwartz (both clarity/sophistication-focused)
- When siblings score differently on the SAME criterion, the difference
  isolates the technique variant — same goal, different execution

### Comparison 4: Round-over-Round (Round 2 only)
- Compare each persona's current output to their previous round output
- For each persona that improved: what specifically changed?
- For each persona that declined: what technique was lost?
- For the winner: was the winning approach a refinement of a previous
  approach or a fundamentally new approach?

## Analytical Brief Output Format

```yaml
analytical_brief:
  round: [1|2|3]

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

## Integration with Analytical Brief

The Analytical Brief REPLACES the current Analytical Brief structure.
The current `winning_techniques` field becomes the `winner_analysis.defining_technique`.
The current `per_competitor_feedback` becomes the more specific
`technique_transfer_recommendations` with expected impact quantification.

The Analytical Brief is a superset of the Analytical Brief — it contains
everything the Analytical Brief had plus the causal analysis.

## Analyst vs. Judge

| Role | What It Does | When |
|------|-------------|------|
| Judge | Scores outputs against 7 criteria. Produces rankings. | Step 1D |
| Analyst | Compares outputs to explain WHY scores differ. Isolates techniques. | Step 1E.5 |

The Judge tells you WHO won. The Analyst tells you WHY they won and
what EVERYONE can learn from the comparison.

## Token Budget

The Analyst subagent receives:
- 7 outputs × ~3-5KB each = ~21-35KB
- 7 critiques × ~500B each = ~3.5KB
- scores.yaml = ~2KB
- Previous analytical brief (R2-R3) = ~3-5KB
- Analyst protocol instructions = ~2KB
- **Total: ~32-48KB** — well within any model's context window

## Cost

One Opus 4.6 subagent call per round × 2 rounds + audience evaluation = 3 calls.
Each call: ~50K input + ~5K output = ~55K tokens.
Total per Arena: ~165K tokens on Opus.
At Opus pricing (~$15-75/M tokens depending on caching): ~$2.50-$12 per Arena.
```

### Files to Modify

| File | Change |
|------|--------|
| `~system/protocols/ARENA-CORE-PROTOCOL.md` | Add Step 1E.5 (Analyst Phase) between Ranking and Analytical Brief. Update Analytical Brief section to reference Analytical Brief format. Update Round 1/2/3 execution flows. |
| `~system/ARENA-PROTOCOL.md` | Add Analyst role to Agent Team Structure. Note that Analyst runs on Opus (Strategy role). |
| `~system/protocols/SUBAGENT-ARENA-PROTOCOL.md` (if created from OpenDev Enhancement 3) | Add Analyst subagent to orchestration flow. Place between Judge and Analytical Brief distribution. |
| `~system/MODEL-ROUTING.md` | Add Analyst to Arena Role Routing table (Opus 4.6, Strategy role). |

### Key Implementation Decisions

1. **Analyst model:** Opus 4.6 (Strategy role). The Analyst performs causal reasoning — understanding WHY scores differ requires deep analytical capability. This is not a Generation or Validation task.

2. **Fresh context:** The Analyst gets `message_history=None` — no contamination from the generation or critique sessions. It sees only the outputs and scores, not the reasoning that produced them.

3. **Read-only:** The Analyst reads outputs and writes the analytical brief. No generation, no modification of outputs.

4. **The Analytical Brief replaces the Analytical Brief** — it's a superset. The current Analytical Brief fields all exist within the Analytical Brief format, plus the causal analysis layer.

5. **Round-over-round analysis (Round 2):** The Analyst receives the previous round's brief, enabling cumulative learning. "In Round 1, persona X tried technique A and it failed. In Round 2, they modified it to technique A' and it improved by 0.4. This suggests the modification [description] is the operative change."

### Effort Estimate

- ANALYST-PROTOCOL.md: ~3 hours
- Modify ARENA-CORE-PROTOCOL.md (add Step 1E.5 to both rounds + audience evaluation): ~2 hours
- Modify ARENA-PROTOCOL.md (add Analyst to Agent Team): ~30 min
- Modify MODEL-ROUTING.md (add Analyst routing): ~15 min
- Build Analyst subagent prompt template: ~2 hours
- Testing with 1 strategic + 1 generative skill: ~3 hours
- **Total: ~10-12 hours**

### Dependencies

Enhancement 2 (Sigmoid Scoring) feeds better-differentiated scores to the Analyst. Enhancement 7 (Convergence Paradox) informs when convergence is acceptable vs. problematic. But the Analyst can be implemented independently with the current linear scoring system.

---

## Enhancement 2: Sigmoid-Capped Scoring

### ASI-Arch Concept

ASI-Arch's fitness function applies a sigmoid transformation to performance differences:

```
Fitness = (1/3) × [σ(Δ_loss) + σ(Δ_benchmark) + LLM_judge]
```

The sigmoid:
- Amplifies small but potentially significant improvements near the baseline
- Caps extreme values that could dominate
- Focuses differentiation within 10% of baseline
- Prevents reward hacking by limiting any single metric's contribution

The paper explicitly identifies sole reliance on quantitative metrics as "a critical flaw in past approaches" that "inevitably leads to reward hacking."

### Current State in Marketing-OS

Arena scoring uses a linear 1-10 scale across 7 criteria with fixed weights:

| Criterion | Weight |
|-----------|--------|
| Issue Resolution / Goal Achievement | 20% |
| Voice Preservation | 20% |
| Flow Enhancement | 15% |
| Clarity Improvement | 15% |
| Slop Elimination | 10% |
| Brevity | 10% |
| Threading Preservation | 10% |

Plus 2 diversity dimensions from ARENA-DIVERSITY-PROTOCOL.md:
- Competitive Distance (10% weight, redistributed proportionally)
- Pattern Break Bonus (5% weight, redistributed proportionally)

**Problem:** LLMs tend to cluster scores at 8-9. The `proportionality_check.py` validator detects clustering (>50% of scores at minimums = gate-passing optimization) but doesn't prevent it structurally. The difference between 7.0 and 8.0 is the same as the difference between 9.0 and 10.0 on a linear scale — but in quality terms, going from good to great (7→8) is far more meaningful than going from excellent to perfect (9→10).

### What Changes

Apply a sigmoid transformation to raw Arena scores before computing weighted totals. This structurally prevents score inflation, forces genuine differentiation between outputs, and aligns the scoring scale with actual quality differences.

### Files to Create

#### `~system/protocols/SIGMOID-SCORING-PROTOCOL.md`

```markdown
# Sigmoid-Capped Scoring Protocol

## Purpose

Transform raw linear Arena scores (1-10) through a sigmoid function
that amplifies meaningful quality differences and caps extreme values.
This prevents score inflation and forces the Judge to genuinely
differentiate between outputs.

## The Transformation

### Raw Score → Sigmoid Score

The sigmoid transformation is applied per-criterion, per-output:

```
sigmoid_score = 10 / (1 + exp(-k × (raw_score - midpoint)))
```

Where:
- `raw_score` = the Judge's raw assessment (1-10)
- `midpoint` = 7.0 (the center of the meaningful quality range)
- `k` = 1.5 (steepness — controls how sharply the curve transitions)
- Output: sigmoid_score (0-10 scale, but compressed at extremes)

### Effect on Score Distribution

| Raw Score | Sigmoid Score | What Changes |
|-----------|--------------|-------------|
| 5.0 | 2.4 | Low scores spread out more (5 vs 6 = 2.4 vs 3.8 = 1.4 gap) |
| 6.0 | 3.8 | Moderate scores gain differentiation |
| 7.0 | 5.0 | Midpoint — sigmoid center |
| 7.5 | 6.0 | The meaningful improvement zone — differences AMPLIFIED |
| 8.0 | 6.9 | |
| 8.5 | 7.7 | |
| 9.0 | 8.3 | High scores compress — diminishing returns |
| 9.5 | 8.8 | |
| 10.0 | 9.2 | Perfect raw score only gives 9.2 sigmoid — prevents ceiling |

### Key Properties

1. **Differences between 6-8 are AMPLIFIED** — this is where quality
   actually varies most between outputs

2. **Differences between 9-10 are COMPRESSED** — going from "excellent"
   to "perfect" produces a small score gain, preventing score inflation
   from making all outputs look equally great

3. **The 7.0 minimum threshold maps to sigmoid 5.0** — below the
   midpoint, outputs are clearly below standard

4. **No single criterion can dominate** — even a perfect 10 only
   contributes sigmoid 9.2, capping any criterion's influence

## Calibration Anchors

To maintain scoring consistency, establish calibration anchors
(inspired by ASI-Arch's DeltaNet=5/10, Gated DeltaNet=10/10):

| Raw Score | Calibration Anchor |
|-----------|-------------------|
| 4.0 | AI-generated first draft with no refinement |
| 5.0 | Competent but generic copy that could be any brand |
| 6.0 | Solid copy that hits brief requirements but lacks distinctiveness |
| 7.0 | Good copy — meets quality thresholds, maintains voice, threads properly |
| 8.0 | Strong copy — notably better than generic, persona voice evident |
| 9.0 | Excellent copy — would be selected by a top direct response team |
| 10.0 | TIER1-specimen-quality — indistinguishable from the best human-written DR copy |

These anchors should be included in the Judge's prompt for every
scoring session. They prevent grade drift across rounds and skills.

## Integration with Arena Scoring Flow

```
Step 1D: Scoring
  1. Judge assigns RAW scores (1-10) per criterion per output
  2. Apply sigmoid transformation to each raw score
  3. Compute weighted total using sigmoid scores (not raw)
  4. Rank by sigmoid-weighted totals
  5. BOTH raw and sigmoid scores stored in scores.yaml
```

### scores.yaml Format Update

```yaml
scores:
  - persona: "makepeace"
    criteria:
      issue_resolution:
        raw: 8.5
        sigmoid: 7.7
        weight: 0.20
      voice_preservation:
        raw: 9.0
        sigmoid: 8.3
        weight: 0.20
      flow_enhancement:
        raw: 8.0
        sigmoid: 6.9
        weight: 0.15
      # ... etc
    weighted_total_raw: 8.4
    weighted_total_sigmoid: 7.5
    rank_by_sigmoid: 1
```

## Proportionality Check Integration

The existing `proportionality_check.py` detects score clustering.
With sigmoid scoring:
- Raw score clustering at 8-9 becomes sigmoid scores of 6.9-8.3
  — a wider spread that makes clustering less likely
- If sigmoid scores STILL cluster, the problem is genuine output
  similarity, not scoring inflation
- Update proportionality thresholds from raw to sigmoid scale

## Tier Application

| Tier | Sigmoid Scoring? |
|------|-----------------|
| Full | YES — both rounds + audience evaluation |
| Standard | YES — 1 round |
| Quick | N/A — no Arena |

## When NOT to Apply Sigmoid

- Gate validation (Layer 3) — gates use binary PASS/FAIL, not scored
- Non-Arena quality checks — these use different scales
- Human-facing score presentation — show BOTH raw and sigmoid,
  but rank by sigmoid
```

### Files to Modify

| File | Change |
|------|--------|
| `~system/protocols/ARENA-CORE-PROTOCOL.md` | Update Step 1D (Scoring) to include sigmoid transformation. Add calibration anchors to Judge prompt template. Note: raw scores still captured, sigmoid used for ranking. |
| `~system/ARENA-PROTOCOL.md` | Update "The 7 Default Judging Criteria" section to note sigmoid transformation. Update "Quality Thresholds" to note that thresholds apply to RAW scores, not sigmoid. |
| `.hooks/validators/proportionality_check.py` | Update clustering detection thresholds to work with sigmoid scores (wider expected range, different clustering patterns). |

### Effort Estimate

- SIGMOID-SCORING-PROTOCOL.md: ~2 hours
- Modify ARENA-CORE-PROTOCOL.md scoring sections: ~1.5 hours
- Modify ARENA-PROTOCOL.md thresholds: ~30 min
- Update proportionality_check.py: ~1 hour
- Testing sigmoid transformation with sample Arena data: ~1.5 hours
- **Total: ~6-7 hours**

### Dependencies

None — can be implemented independently. Enhancement 1 (Analyst) benefits from better-differentiated scores but doesn't require them.

---

## Enhancement 3: Self-Revision Protocol

### ASI-Arch Concept

When an architecture fails training in ASI-Arch, the system captures the full error log and returns it to the Engineer agent. The Engineer MUST analyze the feedback and revise the code. The paper explicitly contrasts this with AlphaEvolve (Google DeepMind, 2025), which discards any architecture that fails — "a good idea with a bug is still a good idea."

Key constraints from ASI-Arch's Debugger prompt:
- "Never change the class name, never delete decorators"
- "Preserve design intent"
- "Make MINIMAL changes only"

The Checker module enforces strict vs. flexible checks:
- **Strict (must fix):** Mask correctness, complexity verification, batch size independence
- **Flexible (preserve innovation):** Logic validation accepts unconventional but theoretically plausible designs. "Fix technical issues, not creative choices."

### Current State in Marketing-OS

When an Arena output fails a quality gate or scores below minimum thresholds:
- The Critic identifies ONE weakness and provides fix direction
- The persona revises the weakness
- But if the REVISED output also fails (e.g., the fix broke Voice Preservation while improving Flow), there's no structured protocol for how to handle the cascading failure

When a non-Arena output fails a gate:
- The agent re-reads the spec and regenerates
- But there's no structured failure report that specifies WHAT failed, by how much, and what to preserve while fixing

### What Changes

Add a structured Self-Revision Protocol that transforms gate failures into specific failure reports and guides targeted revision that preserves what's working while fixing what's broken.

### Files to Create

#### `~system/protocols/SELF-REVISION-PROTOCOL.md`

```markdown
# Self-Revision Protocol — Gate Failure → Targeted Revision

## Purpose

When an output fails a quality gate or scores below minimum thresholds,
this protocol transforms the failure into a specific revision task
that preserves working elements while fixing failing ones.

Core principle from ASI-Arch: "A good idea with a bug is still a good
idea." Fix the specific failure. Don't discard and regenerate.

## When to Apply

| Trigger | What Failed | Protocol |
|---------|-------------|----------|
| Arena criterion below 7.0 | Specific criterion on a scored output | Arena Targeted Revision (existing) |
| Arena overall below 8.5 | Weighted total on a scored output | Arena Full Revision (new) |
| Layer 3 gate FAIL | Quality gate on skill output | Gate Failure Revision (new) |
| Prose Quality Verification FAIL | Voice, threading, or flow check | PQV Revision (new) |

## Gate Failure Report Format

When a gate fails, the agent MUST produce a structured failure report
before any revision attempt:

```yaml
gate_failure_report:
  skill: "[skill name]"
  layer: "[layer number]"
  gate_name: "[gate identifier]"
  failure_type: "[criterion_below_minimum | overall_below_threshold | missing_output | schema_violation]"

  what_failed:
    - criterion: "[name]"
      score: [X.X]
      minimum: [X.X]
      delta: [-X.X]
      evidence: "[quote from output that demonstrates the failure]"
      diagnosis: "[WHY it failed — root cause, not just the symptom]"

  what_passed:
    - criterion: "[name]"
      score: [X.X]
      note: "PRESERVE — this element is working correctly"

  revision_scope:
    fix_these: ["[criterion1]", "[criterion2]"]
    preserve_these: ["[criterion3]", "[criterion4]", "[criterion5]"]
    max_revision_scope: "[specific — e.g., 'paragraphs 3-5 of the mechanism section']"
```

## Strict vs. Flexible Checks (from ASI-Arch)

### Strict Checks (MUST fix — no exceptions)

| Check | What It Validates | Fix Required |
|-------|------------------|-------------|
| Voice Preservation ≥ 7.0 | Persona voice intact | Rewrite sections that lost voice |
| Threading Preservation ≥ 7.0 | Mechanism name, root cause anchor present | Add missing threading elements |
| Schema compliance | All required fields present | Add missing fields |
| Minimum file sizes | Output meets minimum thresholds | Expand abbreviated sections |
| Gate status format | PASS or FAIL only | Fix forbidden statuses |

### Flexible Checks (preserve creative intent)

| Check | What It Validates | Revision Guidance |
|-------|------------------|------------------|
| Flow Enhancement | Prose momentum and transitions | Fix specific flow breaks without restructuring |
| Clarity Improvement | Reader comprehension | Simplify flagged sentences, don't rewrite approach |
| Brevity | Economy of expression | Trim flagged sections, don't cut substance |
| Slop Elimination | AI telltale absence | Replace flagged words, preserve surrounding prose |
| Issue Resolution | Accomplishes the objective | Address specific gap, don't change strategy |

"Fix technical issues, not creative choices." A fix for low Flow should
adjust transitions, not abandon the narrative structure. A fix for low
Clarity should simplify specific sentences, not rewrite the approach.

## Revision Agent Configuration

### Arena Revision (Existing — Enhanced)

```
Model: Same as original generator (Sonnet for copy, Opus for strategy)
Context: Original output + gate_failure_report + ANTI-DEGRADATION.md
Tools: Read, Write, Edit only
Constraint: "Preserve design intent. Fix ONLY the failing criteria.
  Do NOT rewrite sections that score above threshold."
```

### Non-Arena Revision (New)

```
Model: Same as original generator
Context: Original output + gate_failure_report + skill spec + upstream packages
Tools: Read, Write, Edit only
Constraint: Same preservation rules as Arena revision
Max retries: 2 (after 2 failed revisions, escalate to human)
```

## Revision Verification

After revision, re-score ONLY:
1. The failing criteria (must now meet minimum)
2. The "preserve" criteria (must not have degraded)

```yaml
revision_verification:
  fixed_criteria:
    - criterion: "[name]"
      before: [X.X]
      after: [X.X]
      meets_minimum: [true/false]

  preserved_criteria:
    - criterion: "[name]"
      before: [X.X]
      after: [X.X]
      degraded: [true/false]  # Flag if score dropped by >0.3

  revision_accepted: [true/false]
  # True ONLY if ALL fixed criteria meet minimum AND no preserved criteria degraded
```

### Regression Protection

If a revision fixes the target criterion but degrades a previously-passing
criterion by >0.3:
- The revision is REJECTED
- The original output is restored
- A new failure report is generated that includes BOTH the original failure
  AND the regression, constraining the next revision attempt further

Maximum regression iterations: 2. After 2 regression cycles, escalate
to human with full history.

## Escalation Protocol

After 2 failed revision attempts:

```markdown
## Revision Escalation — Human Decision Required

Skill: [skill name]
Gate: [gate identifier]
Original failure: [what failed, score, minimum]
Revision 1: [what was changed, what happened]
Revision 2: [what was changed, what happened]

The system has failed to fix [criterion] without degrading [other criterion].

Options:
A: Accept the best scoring version (Revision [N] with score [X.X])
B: Provide specific human guidance for revision
C: Regenerate the entire skill from scratch
D: Adjust minimum thresholds for this specific instance (human override)
```
```

### Files to Modify

| File | Change |
|------|--------|
| `~system/protocols/ARENA-CORE-PROTOCOL.md` | Update Step 1C (Targeted Revision) to reference gate_failure_report format. Add regression protection rule. |
| `~system/protocols/EXECUTION-GUARDRAILS.md` | Add Self-Revision Protocol to Gate Failure section. Reference SELF-REVISION-PROTOCOL.md. |
| `~system/SYSTEM-CORE.md` | Add brief reference to self-revision protocol under Anti-Degradation. Note: "When a gate fails, don't discard — diagnose and revise." |
| `.hooks/validators/gate_validator.py` | Extend to output structured gate_failure_report JSON when a gate fails (currently only outputs a warning message). |

### Effort Estimate

- SELF-REVISION-PROTOCOL.md: ~3 hours
- Modify ARENA-CORE-PROTOCOL.md revision sections: ~1.5 hours
- Modify EXECUTION-GUARDRAILS.md: ~30 min
- Modify SYSTEM-CORE.md: ~15 min
- Extend gate_validator.py for structured reports: ~2 hours
- Testing with gate failure scenarios: ~2 hours
- **Total: ~9-10 hours**

### Dependencies

Enhancement 2 (Sigmoid Scoring) provides better-differentiated scores for the failure reports. Enhancement 1 (Analyst) provides causal analysis that makes revision guidance more specific. But the Self-Revision Protocol works independently with the current scoring system.

---

## Enhancement 4: Dynamic Context Framing

### ASI-Arch Concept

Before each design cycle, ASI-Arch generates fresh summaries of historical architectures using a low-temperature LLM. These summaries are "generated on the fly for each cycle and NOT stored." Subtle variations in presentation prevent the Researcher from receiving a static, repetitive context that leads to stagnation.

### Current State in Marketing-OS

The context reservoir is created once (after Session 3) and loaded unchanged into every copy session (Sessions 4-6, Skills 10-20). Every skill sees the same reservoir — the same quotes in the same order, the same proof elements with the same emphasis, the same strategic intelligence with the same framing.

This static loading contributes to voice uniformity across sections: every section's writer starts from identical context, leading to homogeneous proof deployment, quote selection, and emotional register.

### What Changes

Generate a skill-specific variant of the context reservoir at the start of each copy skill. The reservoir's CONTENT stays the same (same quotes, same proof, same strategic intelligence), but the EMPHASIS and ORDERING change based on the section's specific needs.

### Files to Create

#### `~system/protocols/DYNAMIC-CONTEXT-FRAMING-PROTOCOL.md`

```markdown
# Dynamic Context Framing Protocol

## Purpose

Generate a skill-specific context reservoir variant before each copy
skill (10-17). The reservoir content stays the same — the emphasis
and ordering change to match the section's emotional territory and
proof requirements.

## The Framing Matrix

Each copy skill has a different emotional territory and proof need.
The framing agent re-orders and re-emphasizes reservoir elements
to match:

| Skill | Primary Emotional Territory | Proof Emphasis | Quote Priority |
|-------|---------------------------|----------------|---------------|
| 10 (Headlines) | Curiosity, shock, intrigue | Knockout proof for fascination | Counter-intuitive quotes, identity tension quotes |
| 11 (Lead) | Pain recognition, identity crisis | Social proof (they're not alone) | Pain quotes, failed solutions quotes |
| 12 (Story) | Empathy, identification | Transformation testimonials | Desire quotes, language patterns |
| 13 (Root Cause Narrative) | Anger, betrayal, revelation | Villain evidence, conspiracy proof | Villain quotes, failed solutions quotes |
| 14 (Mechanism Narrative) | Hope, scientific credibility | Clinical/research proof, authority | Trust signals, sophistication markers |
| 15 (Product Introduction) | Desire, possibility | Feature-to-benefit proof, credibility | Desire quotes, authority proof |
| 16 (Offer Copy) | Urgency, fear of missing | Social proof density, risk reversal | Skepticism triggers (to preempt), trust signals |
| 17 (Close) | Decision pressure, identity shift | Knockout proof (final push), transformation | Identity tension quotes, desire quotes |

## Framing Agent Configuration

Model: Haiku 4.5 (Planning cognitive role)
Tools: Read only
Input: Full context reservoir + skill emotional territory table
Output: Framed reservoir variant saved to
  ~outputs/[project]/[skill-id]-[skill-name]/framed-reservoir.md

## Framing Rules

1. **Content is NEVER modified** — same quotes, same proof, same data
2. **Ordering changes** — quotes most relevant to THIS section come first
3. **Emphasis markers added** — `>>> HIGH RELEVANCE <<<` flags for this section
4. **Irrelevant elements de-emphasized** — moved to bottom, not removed
5. **Section-specific header** — "This reservoir has been framed for [SKILL NAME].
   Elements most relevant to [emotional territory] are prioritized."

## Framing Agent Prompt Template

```
You are a Context Framing Agent for marketing-os Skill [XX] ([SKILL_NAME]).

Read the full context reservoir at:
  ~outputs/[project]/context-reservoir.md

This skill's emotional territory is: [territory from matrix]
This skill's proof emphasis is: [emphasis from matrix]
This skill's quote priority is: [priority from matrix]

Re-order and annotate the reservoir:
1. Move the 5 most relevant VOC quotes to the top of Part 1.1
2. Move the 3 most relevant proof elements to the top of Part 1.2
3. Add ">>> HIGH RELEVANCE for [SKILL_NAME] <<<" markers to priority elements
4. Move less relevant elements to the bottom of their sections
5. Add a 2-sentence "Section Focus" header noting the emotional territory

Do NOT modify any content. Do NOT remove any elements. Do NOT paraphrase.
Only REORDER and ANNOTATE.

Save to: ~outputs/[project]/[skill-id]-[skill-name]/framed-reservoir.md
```

## When to Skip

- Quick tier — uses raw reservoir, no framing
- Skills 18-20 (Assembly/Editorial) — need the full reservoir without section bias
- If Pre-Flight Planning (SKILL-PREFLIGHT-PROTOCOL.md) is active,
  the Execution Brief already provides section-specific prioritization.
  Dynamic Context Framing and Pre-Flight Planning are ALTERNATIVES —
  use one or the other, not both.

## Relationship to Pre-Flight Planning

| Feature | Dynamic Context Framing | Pre-Flight Planning |
|---------|----------------------|-------------------|
| What it produces | Re-ordered reservoir | Execution Brief (distilled intelligence) |
| Content fidelity | 100% — same content, different order | ~60% — compressed, prioritized |
| Token savings | None — same size | 30-50% reduction |
| Cost | Cheap (Haiku, small output) | Cheap (Haiku, small output) |
| Best for | Skills 10-13 (where context is manageable) | Skills 14-17 (where context is large) |

Recommendation: Use Dynamic Context Framing for Skills 10-13 (smaller upstream context,
framing adds section-specificity without losing content). Use Pre-Flight Planning for
Skills 14-17 (larger upstream context, compression is more valuable than reordering).
```

### Files to Modify

| File | Change |
|------|--------|
| `~system/protocols/CONTEXT-RESERVOIR-TEMPLATE.md` | Add "Dynamic Framing" section describing skill-specific variant generation. Reference the framing matrix. |
| `~system/SESSION-ARCHITECTURE.md` | Update Session 4 description to note framed reservoir loading for Skills 10-13. |
| `~system/protocols/SKILL-PREFLIGHT-PROTOCOL.md` | Add note about mutual exclusivity with Dynamic Context Framing — use framing for 10-13, pre-flight for 14-17. |

### Effort Estimate

- DYNAMIC-CONTEXT-FRAMING-PROTOCOL.md: ~2 hours
- Framing agent prompt template: ~1 hour
- Modify 3 existing files: ~1 hour
- Testing with 2 skills: ~1.5 hours
- **Total: ~5-6 hours**

### Dependencies

Enhancement 6 (Pre-Flight Planning from OpenDev) — these two features are alternatives. Design the mutual exclusivity before implementing.

---

## Enhancement 5: Problem-Aware Specimen Retrieval

### ASI-Arch Concept

ASI-Arch's Cognition Module stores ~100 papers as structured cognition entries with three elements: applicable scenario, proposed algorithm, and historical context. The extraction prompt is engineered so "experiment triggers" align semantically with "problem analyses." When the Analyst identifies a shortcoming, that shortcoming description is used as an embedding-based search query against the scenario fields. The 3 most similar cognition entries are retrieved.

Key insight: The retrieval is **problem-driven**, not identity-driven. It asks "what knowledge helps solve THIS problem?" not "what knowledge belongs to THIS persona?"

### Current State in Marketing-OS

Persona specimens are loaded by persona identity:
- Before Makepeace generates, load specimens from `~system/persona-specimens/makepeace/`
- Before Halbert generates, load specimens from `~system/persona-specimens/halbert/`

The specimens are curated TIER1 extractions showing each persona's writing at its best. They serve as voice anchors — the model reads Makepeace specimens to generate in Makepeace's voice.

**What's missing:** When the Critic identifies a weakness — say "Flow is weak in paragraphs 3-5, transitions are abrupt" — the system doesn't search for specimens that demonstrate excellent flow. It just sends the critique back and hopes the persona can fix it from their existing context.

### What Changes

Tag each specimen with the problems it solves and the scoring criteria it excels at. When the Critic identifies a weakness, use that weakness as a retrieval query to find specimens from ANY persona that demonstrate solving the specific problem.

### Files to Create

#### `~system/protocols/PROBLEM-AWARE-RETRIEVAL-PROTOCOL.md`

```markdown
# Problem-Aware Specimen Retrieval Protocol

## Purpose

When the Critic identifies a weakness in an Arena output, retrieve
specimens from ANY persona that demonstrate excellence in the failing
criterion — not just the generating persona's own specimens.

## Specimen Tagging Schema

Each specimen in ~system/persona-specimens/ should be tagged with:

```yaml
specimen_tags:
  persona: "[original persona]"
  source: "[TIER1 reference, page/section]"

  problems_solved:
    # What challenges does this specimen demonstrate mastery of?
    - "flow — seamless transition between proof and narrative"
    - "clarity — complex mechanism explained in simple language"
    - "hook — opening that creates immediate curiosity"

  criteria_excellence:
    # Which Arena scoring criteria does this specimen score highest on?
    - criterion: "flow_enhancement"
      strength: "exceptional"
      evidence: "[specific technique demonstrated]"
    - criterion: "voice_preservation"
      strength: "high"
      evidence: "[how persona voice is maintained]"

  techniques_demonstrated:
    # Named techniques visible in this specimen
    - "proof-within-narrative embedding"
    - "identity-tension opening"
    - "nested story structure"

  section_type: "[lead | story | mechanism | proof | close | offer | headline]"
```

## Retrieval Flow

### Step 1: Critic Identifies Weakness

```yaml
critique:
  weakest_criterion: "flow_enhancement"
  weakness_description: "Transition between proof block and emotional appeal
    is jarring. Reader loses momentum at paragraph 4."
  fix_direction: "Bridge the proof back to the narrative thread before
    shifting to emotional appeal."
```

### Step 2: Build Retrieval Query

From the critique, extract:
- Failing criterion: `flow_enhancement`
- Problem keywords: "transition", "proof block", "narrative", "bridge", "momentum"
- Section type: inferred from skill (e.g., Skill 14 = "mechanism")

### Step 3: Search Specimens

Search ALL persona specimens (not just the generating persona's) for:
1. `criteria_excellence` matching the failing criterion
2. `problems_solved` matching the problem keywords
3. `section_type` matching the current skill's section type

### Step 4: Retrieve Top 3 Specimens

Select the 3 specimens with the highest relevance:
- Primary match: criterion + section type (best fit)
- Secondary match: criterion only (good fit)
- Tertiary match: problem keywords only (partial fit)

### Step 5: Inject into Revision Prompt

Add the retrieved specimens to the revision agent's context:

```markdown
## Relevant Specimens (Problem-Aware Retrieval)

The Critic identified [failing criterion] as the weakest element.
These specimens demonstrate excellence in that criterion:

### Specimen 1 (from [persona] — [source])
[specimen text]
TECHNIQUE DEMONSTRATED: [technique name]
RELEVANCE: [why this helps solve the identified problem]

### Specimen 2 (from [persona] — [source])
[specimen text]
TECHNIQUE DEMONSTRATED: [technique name]
RELEVANCE: [why this helps solve the identified problem]

### Specimen 3 (from [persona] — [source])
[specimen text]
TECHNIQUE DEMONSTRATED: [technique name]
RELEVANCE: [why this helps solve the identified problem]

IMPORTANT: Absorb the TECHNIQUE demonstrated in these specimens,
not the VOICE. You are [GENERATING_PERSONA]. Maintain your voice
while applying the technique shown above.
```

## Implementation Phases

### Phase 1: Tag Existing Specimens (manual curation)

Review all specimens in ~system/persona-specimens/ and add tags to each.
This is a one-time human + AI curation task.

Estimated: 11 personas × ~5 specimens each = ~55 specimens to tag.
Each takes ~5 minutes. Total: ~4-5 hours.

### Phase 2: Build Retrieval Index

Create a specimen index file that maps criteria → specimens:

```yaml
# ~system/persona-specimens/specimen-index.yaml
flow_enhancement:
  - path: "makepeace/specimen-03.md"
    strength: "exceptional"
    technique: "momentum cascade"
  - path: "halbert/specimen-01.md"
    strength: "high"
    technique: "story hook chain"
  # ...

voice_preservation:
  - path: "bencivenga/specimen-02.md"
    strength: "exceptional"
    technique: "proof-first voice"
  # ...

# ... (one section per Arena criterion)
```

### Phase 3: Integrate with Arena Revision Flow

Update Step 1C (Targeted Revision) to include problem-aware retrieval.
The revision agent receives its critique + 3 relevant specimens.

## Relationship to SPECIMEN-GUIDE.md

The existing SPECIMEN-GUIDE.md governs IDENTITY-BASED specimen loading
(load your persona's specimens before generating). This protocol adds
PROBLEM-BASED specimen loading during REVISION (load any persona's
specimens that solve your specific problem).

| Loading Type | When | What | Purpose |
|-------------|------|------|---------|
| Identity-based | Before generation | Persona's own specimens | Voice anchoring |
| Problem-based | During revision | Any persona's relevant specimens | Technique transfer |

Both coexist. Identity loading anchors the voice. Problem loading provides
targeted techniques for fixing weaknesses.
```

### Files to Modify

| File | Change |
|------|--------|
| `~system/SPECIMEN-GUIDE.md` | Add "Problem-Aware Retrieval" section noting the dual loading pattern (identity for generation, problem for revision). |
| `~system/protocols/ARENA-CORE-PROTOCOL.md` | Update Step 1C (Targeted Revision) to include problem-aware specimen retrieval before revision. Add specimens to revision agent context. |
| `~system/persona-specimens/` (all specimen files) | Add YAML frontmatter with specimen tags. This is a bulk curation task. |

### Effort Estimate

- PROBLEM-AWARE-RETRIEVAL-PROTOCOL.md: ~2 hours
- Tag 55 existing specimens (frontmatter + tags): ~5 hours
- Build specimen-index.yaml: ~1 hour
- Modify SPECIMEN-GUIDE.md: ~30 min
- Modify ARENA-CORE-PROTOCOL.md revision section: ~1 hour
- Testing with 1 Arena skill: ~2 hours
- **Total: ~11-12 hours** (bulk of time is specimen tagging)

### Dependencies

Enhancement 1 (Analyst) provides richer weakness descriptions for retrieval queries. Enhancement 3 (Self-Revision) provides the structured revision framework that retrieval feeds into. But the retrieval protocol works independently with the current Critic output format.

---

## Enhancement 6: Campaign Phylogeny

### ASI-Arch Concept

ASI-Arch maintains a candidate pool of the top-50 architectures from ALL previous experiments. Over 1,773 experiments, the system progressively shifted from relying on human literature (51.7% for all architectures) to self-generated analytical insights (44.8% for SOTA architectures). The system learned from its own experiments more effectively than from external references.

The paper's key finding: "For breakthrough results, the AI cannot merely reuse past successes (a reliance on cognition). Instead, it must engage in a process of exploration, summary, and discovery (a reliance on analysis)."

### Current State in Marketing-OS

Each campaign runs independently. Campaign A's outputs don't inform Campaign B's decisions. The persona specimens and TIER1 references are static — curated once from published copy, not updated with marketing-os's own successful outputs.

There is no mechanism to answer: "In 3 previous golf supplement campaigns, what root cause approach scored highest in the Arena? What mechanism analogy resonated best with the 55+ male health audience? Which headline structures produced the highest recall in memorability tests?"

### What Changes

Create a persistent campaign learning database that tracks strategic decisions and outcomes across all completed campaigns. Over time, this database becomes a marketing-os-generated "Cognition Base" that supplements the human-curated TIER1 specimens.

### Files to Create

#### `~system/campaign-learning-db/README.md`

```markdown
# Campaign Learning Database

## Purpose

Persistent database tracking strategic decisions → outcomes across all
completed campaigns. Over time, this becomes marketing-os's self-generated
knowledge base — the equivalent of ASI-Arch's candidate pool.

## Directory Structure

```
~system/campaign-learning-db/
├── README.md                  ← This file
├── campaign-index.yaml        ← Index of all completed campaigns
├── campaigns/
│   ├── [campaign-code].yaml   ← One file per completed campaign
│   └── ...
├── patterns/
│   ├── by-vertical.yaml       ← Cross-campaign patterns by vertical
│   ├── by-audience.yaml       ← Cross-campaign patterns by audience segment
│   └── by-technique.yaml      ← Cross-campaign patterns by technique type
└── specimen-candidates/       ← Arena winners promoted to specimen candidate status
    └── [campaign]-[skill]-winner.md
```

## Campaign Entry Format

```yaml
# campaigns/[campaign-code].yaml
campaign:
  code: "[project-code]"
  client: "[client name]"
  vertical: "[health | golf | finance | etc.]"
  audience:
    segment: "[demographic/psychographic]"
    sophistication: [1-5]
    age_range: "[range]"
    gender: "[M/F/mixed]"
  date_completed: "[YYYY-MM-DD]"
  tier: "[Full | Standard | Quick]"

  strategic_decisions:
    root_cause:
      winner: "[root cause expression]"
      reframe_technique: "[not_your_fault | conspiracy | hidden_truth | etc.]"
      arena_score: [X.X]
      runner_up: "[runner_up root cause]"
      differentiator: "[what separated winner from runner-up]"

    mechanism:
      winner: "[mechanism name]"
      e_level: "[E1-E5]"
      analogy_type: "[visual | process | systemic]"
      arena_score: [X.X]
      runner_up: "[runner_up mechanism]"
      differentiator: "[key differentiator]"

    big_idea:
      winner: "[big idea / promise]"
      schema_distance: [X.X]
      rsf_scores:
        resonance: [X.X]
        surprise: [X.X]
        fascination: [X.X]
      differentiator: "[what made this big idea win]"

    offer:
      structure: "[offer architecture description]"
      price_point: "[price]"
      guarantee_type: "[guarantee structure]"

  copy_outcomes:
    # Per-section Arena results
    sections:
      - skill: "[skill name]"
        winning_persona: "[persona]"
        winning_score: [X.X]
        winning_technique: "[named technique]"
        analyst_insight: "[from Analytical Brief — WHY this won]"

  campaign_result:
    # Post-launch metrics (added when available)
    conversion_rate: [X.X%]
    revenue: "[amount]"
    control_beat: [true/false]
    margin_of_victory: "[X%]"
    audience_response: "[qualitative notes]"

  key_learnings:
    # What this campaign revealed
    - "[learning 1]"
    - "[learning 2]"
    - "[learning 3]"
```

## How to Query the Database

### Before Campaign Foundation (Skills 00-05)

Query the database for campaigns in the same vertical with similar audiences:

```
QUERY: "golf supplement campaigns, male 55+, sophistication 3-4"
RETURN: root_cause approaches that scored highest, mechanism analogies
  that resonated, big idea schema distances that worked
```

This informs the Researcher and strategic skills with precedent data.

### During Arena (Skills 03-08, 10-18)

Query the database for winning techniques in similar sections:

```
QUERY: "mechanism narrative winners, health vertical"
RETURN: winning techniques, persona that won, analyst insights
```

This supplements the Analytical Brief with cross-campaign evidence.

### After Campaign Completion

Add the campaign entry to the database. The Analyst's insights from
each Arena round are the primary input.

## Specimen Promotion

When an Arena winner scores 9.5+ on a specific criterion, it becomes
a **specimen candidate** — eligible for promotion to the
~system/persona-specimens/ collection after human review.

This is how marketing-os generates its own specimens over time,
supplementing the human-curated TIER1 collection.

## Database Maintenance

- **Human review required** for specimen promotion (no auto-promotion)
- **Campaign results added retroactively** when post-launch data is available
- **Pattern files regenerated quarterly** from the full campaign set
- **Database is git-versioned** with the rest of marketing-os

## Cold Start

For the first 5-10 campaigns, the database provides limited value.
The system relies on TIER1 specimens and human knowledge.

After 10+ campaigns, cross-campaign patterns emerge.
After 50+ campaigns, the database becomes a strategic differentiator.

This mirrors ASI-Arch's cold start policy: first 200 experiments run
WITHOUT database updates to prevent premature convergence.
```

#### `~system/campaign-learning-db/campaign-index.yaml`

```yaml
# Campaign Index — All Completed Campaigns
# Updated after each campaign completion

campaigns: []
# As campaigns complete, entries are added:
# - code: "[project-code]"
#   client: "[client name]"
#   vertical: "[vertical]"
#   date_completed: "[YYYY-MM-DD]"
#   file: "campaigns/[campaign-code].yaml"
```

### Files to Modify

| File | Change |
|------|--------|
| `~system/SYSTEM-CORE.md` | Add brief reference to campaign learning database under Session Continuity Protocol. Note: "After campaign completion, add entry to ~system/campaign-learning-db/." |
| `~system/protocols/EXECUTION-GUARDRAILS.md` | Add post-campaign step: "Record campaign results in campaign learning database." |
| AGENT.md (root entry point) | Add campaign learning database to the "What the system includes" section. |

### Effort Estimate

- README.md + campaign-index.yaml: ~2 hours
- Design campaign entry schema: ~2 hours
- Create campaigns/ and patterns/ directory structure: ~30 min
- Modify 3 existing files: ~1 hour
- Create first campaign entry from existing client work (pilot): ~2 hours
- **Total: ~7-8 hours** (initial setup)
- **Ongoing:** ~1-2 hours per completed campaign to add entry

### Dependencies

Enhancement 1 (Analyst) provides the `analyst_insight` field that goes into each section's campaign record. Without the Analyst, the campaign entry captures WHAT won but not WHY — still valuable, but less actionable.

---

## Enhancement 7: Convergence Paradox Round-Aware Thresholds

### ASI-Arch Concept

Component preference analysis across ~5,000 component instances shows:
- SOTA models exhibit a LESS pronounced long-tail — they converge on a core set of validated techniques
- Non-SOTA models show broader exploration of novel components, which is less effective
- The paper concludes: achieving SOTA by "iterating on proven technologies, not pursuing novelty for its own sake"

### Current State in Marketing-OS

The convergence detector (implemented in OpenDev Enhancement 7) uses a single convergence threshold applied uniformly across all rounds. But the ASI-Arch finding suggests Round 1 convergence and Round 2 (FINAL) convergence mean different things.

**Already partially implemented:** The CONVERGENCE-INTERVENTION-PROTOCOL.md (created in this session) includes round-aware thresholds: 40% for Round 1, 50% for Round 2, 60% for Round 2 (FINAL). The `convergence_detector.py` implements the `PERSONA_OVERLAP_THRESHOLDS` dictionary with these values.

### What Changes

This enhancement is ALREADY IMPLEMENTED in the OpenDev Enhancement 7 files created in this session. What remains is updating the cross-references and documentation.

### Files to Modify

| File | Change |
|------|--------|
| `~system/protocols/ARENA-CORE-PROTOCOL.md` | Update "Adaptive Convergence Governor" (Upgrade 2.2) to reference round-aware thresholds from CONVERGENCE-INTERVENTION-PROTOCOL.md. Explicitly state that Round 2 (FINAL) convergence toward the winner is expected and allowed. |
| `~system/protocols/ARENA-DIVERSITY-PROTOCOL.md` | Add note: "Round 2 (FINAL) convergence thresholds are relaxed (60%) because convergence toward proven approaches is a feature of high-quality output, not a flaw." |
| `~brain/research-compilation.md` | Update Enhancement 7 status from "Planned" to "Implemented" with reference to CONVERGENCE-INTERVENTION-PROTOCOL.md and convergence_detector.py. |

### Effort Estimate

- Modify 3 existing files: ~1 hour
- **Total: ~1 hour** (mostly cross-referencing, since the core implementation already exists)

### Dependencies

OpenDev Enhancement 7 (Convergence Detection) — already implemented. This enhancement adds the ASI-Arch-informed round-aware dimension to the existing detector.

---

## Dependency Map

```
Enhancement 1 (Analyst Agent)
    ├── Enhancement 2 (Sigmoid Scoring) — feeds better-differentiated scores
    ├── Enhancement 5 (Problem-Aware Retrieval) — uses Analyst's weakness descriptions
    └── Enhancement 6 (Campaign Phylogeny) — Analyst insights populate campaign DB

Enhancement 2 (Sigmoid Scoring)
    └── Enhancement 1 (Analyst) — benefits from but doesn't require
    └── Enhancement 3 (Self-Revision) — benefits from but doesn't require

Enhancement 3 (Self-Revision)
    ├── Enhancement 2 (Sigmoid Scoring) — better-differentiated failure reports
    └── Enhancement 5 (Problem-Aware Retrieval) — retrieves specimens for revision

Enhancement 4 (Dynamic Context Framing)
    └── No dependencies (standalone optimization)
    └── Mutually exclusive with Pre-Flight Planning for Skills 10-13

Enhancement 5 (Problem-Aware Retrieval)
    └── Enhancement 1 (Analyst) — richer weakness descriptions for queries
    └── Enhancement 3 (Self-Revision) — structured revision framework

Enhancement 6 (Campaign Phylogeny)
    └── Enhancement 1 (Analyst) — provides analytical insights for campaign records
    └── Long-term value — grows with each completed campaign

Enhancement 7 (Convergence Paradox)
    └── OpenDev Enhancement 7 — already implemented, this adds ASI-Arch context
```

---

## Implementation Sequence

### Phase 1: Scoring & Analysis Foundation (Implement First)

| # | Enhancement | Effort | Impact | Why First |
|---|-------------|--------|--------|-----------|
| 2 | Sigmoid-Capped Scoring | ~6-7h | High | Better scores feed everything else |
| 7 | Convergence Paradox Update | ~1h | Medium | Quick cross-reference update, already implemented |

### Phase 2: Arena Intelligence

| # | Enhancement | Effort | Impact | Why Here |
|---|-------------|--------|--------|----------|
| 1 | Analyst Agent | ~10-12h | Very High | The biggest Arena quality unlock |
| 3 | Self-Revision Protocol | ~9-10h | High | Structured gate failure → targeted revision |

### Phase 3: Context & Retrieval Optimization

| # | Enhancement | Effort | Impact | Why Here |
|---|-------------|--------|--------|----------|
| 4 | Dynamic Context Framing | ~5-6h | Medium-High | Section-specific reservoir variants |
| 5 | Problem-Aware Specimen Retrieval | ~11-12h | High | Technique transfer during revision (bulk of time is specimen tagging) |

### Phase 4: Long-Term Infrastructure

| # | Enhancement | Effort | Impact | Why Last |
|---|-------------|--------|--------|----------|
| 6 | Campaign Phylogeny | ~7-8h | Very High (long-term) | Value grows with each campaign; setup now, benefit later |

### Total Estimated Effort: ~50-57 hours

---

## Cross-Reference: OpenDev + ASI-Arch Combined Upgrade Map

| # | Enhancement | Source | Status | Effort |
|---|-------------|--------|--------|--------|
| OD-1 | Event-Driven Reminders | OpenDev | ✅ Implemented | — |
| OD-2 | Dynamic Protocol Loading | OpenDev | ✅ Implemented | — |
| OD-3 | Subagent Arena | OpenDev | ✅ Implemented | — |
| OD-4 | Adaptive Context Compaction | OpenDev | ✅ Implemented (this session) | — |
| OD-5 | Model Routing | OpenDev | ✅ Implemented (this session) | — |
| OD-6 | Pre-Flight Planning | OpenDev | ✅ Implemented (this session) | — |
| OD-7 | Convergence Detection | OpenDev | ✅ Implemented (this session) | — |
| OD-8 | Skill Rollback | OpenDev | ✅ Implemented | — |
| OD-9 | Lazy MCP Tool Discovery | OpenDev | ✅ Implemented | — |
| ASI-1 | Analyst Agent | ASI-Arch | ❌ Planned | ~10-12h |
| ASI-2 | Sigmoid Scoring | ASI-Arch | ❌ Planned | ~6-7h |
| ASI-3 | Self-Revision Protocol | ASI-Arch | ❌ Planned | ~9-10h |
| ASI-4 | Dynamic Context Framing | ASI-Arch | ❌ Planned | ~5-6h |
| ASI-5 | Problem-Aware Retrieval | ASI-Arch | ❌ Planned | ~11-12h |
| ASI-6 | Campaign Phylogeny | ASI-Arch | ❌ Planned | ~7-8h |
| ASI-7 | Convergence Paradox Update | ASI-Arch | ⚠️ Partially done | ~1h |

**OpenDev: 9/9 complete.** All enhancements implemented with protocol files, Python validators, and system integration.

**ASI-Arch: 0.5/7 complete.** Enhancement 7 is partially done (round-aware thresholds exist in code). Remaining 6.5 enhancements have detailed specs (this document) but no implementation yet.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-11 | Initial creation. Seven enhancements from ASI-Arch paper (arXiv:2507.18074) mapped to marketing-os architecture. Detailed implementation specs with files to create/modify, effort estimates, dependencies, and phased sequence. |
