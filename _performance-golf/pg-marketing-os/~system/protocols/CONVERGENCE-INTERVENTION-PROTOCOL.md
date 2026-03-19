# Convergence Intervention Protocol

**Version:** 1.0
**Created:** 2026-03-11
**Source:** OpenDev Enhancement 7 — Doom-Loop and Convergence Detection (arXiv:2603.05344) + ASI-Arch Convergence Paradox (arXiv:2507.18074)
**Purpose:** Define detection thresholds and intervention procedures for three types of convergence in the Arena

---

## TABLE OF CONTENTS

- [Why This Exists](#why-this-exists)
- [The Three Detection Modes](#the-three-detection-modes)
- [Mode 1: Persona Convergence](#mode-1-persona-convergence)
- [Mode 2: Round Stagnation](#mode-2-round-stagnation)
- [Mode 3: Output Repetition](#mode-3-output-repetition)
- [The Convergence Paradox: When Convergence Is Good](#the-convergence-paradox-when-convergence-is-good)
- [Integration Points](#integration-points)
- [Thresholds Summary](#thresholds-summary)

---

## WHY THIS EXISTS

The Arena protocol mandates 2 rounds + audience evaluation of competition across 7 personas. Without convergence detection, three failure modes go undetected:

1. **Persona contamination** — Personas start sounding alike, producing variations rather than independent voices. This defeats the purpose of 7 competitors.

2. **Round stagnation** — Rounds 2-3 stop producing meaningful improvement. The system burns tokens without quality gain.

3. **Output repetition** — Within a single generation, the model loops — repeating sentence blocks as context fills. This is a degradation signal.

The Arena Protocol (ARENA-PROTOCOL.md) and the Adaptive Convergence Governor in ARENA-CORE-PROTOCOL.md define the WHAT. This protocol defines the intervention procedures — the HOW and WHEN.

---

## THE THREE DETECTION MODES

| Mode | What It Detects | Trigger | Response |
|------|----------------|---------|----------|
| **Persona Convergence** | 3+ personas share >40% 5-gram overlap | Within a round, across persona outputs | Divergence intervention |
| **Round Stagnation** | Winner score improves by <0.2 between rounds | Between rounds, across winner scores | Human decision: continue, accept, or constrain |
| **Output Repetition** | 3-sentence block appears twice in one output | Within a single generation | Halt, re-read spec, regenerate from repetition point |

---

## MODE 1: PERSONA CONVERGENCE

### Detection

Compare 5-gram overlap between all persona pairs within a round. A 5-gram is a sequence of 5 consecutive words, normalized (lowercased, articles removed, punctuation stripped).

**Threshold:** Flag if ANY 3+ personas share >40% 5-gram overlap with each other.

**Pairwise comparison matrix (7 personas = 21 pairs):**

```
          Makepeace  Halbert  Schwartz  Ogilvy  Clemens  Bencivenga  Architect
Makepeace     —       [%]      [%]      [%]     [%]      [%]         [%]
Halbert       —        —       [%]      [%]     [%]      [%]         [%]
Schwartz      —        —        —       [%]     [%]      [%]         [%]
Ogilvy        —        —        —        —      [%]      [%]         [%]
Clemens       —        —        —        —       —       [%]         [%]
Bencivenga    —        —        —        —       —        —          [%]
Architect     —        —        —        —       —        —           —
```

**Flagging logic:** For each persona, count how many other personas it exceeds 40% overlap with. If 3+ personas form a cluster above 40%, flag the cluster.

### Intervention: Divergence Protocol

When 3+ personas converge:

**Step 1: STOP the current round** (do not generate remaining personas if any are pending)

**Step 2: Identify converged cluster**
- Which personas converged
- What content they share (extract the overlapping 5-grams)
- Why they converged (likely: weak persona differentiation, shared template structure, or prior round's Analytical Brief was too specific)

**Step 3: Re-read persona specimens** (fresh voice loading for each converged persona)
- Load 3-5 fresh specimens from `~system/persona-specimens/[persona-name]/`
- Focus on specimens that demonstrate the persona's DISTINCTIVE qualities

**Step 4: Add DIVERGENCE DIRECTIVE to each converged persona's prompt:**

```markdown
DIVERGENCE DIRECTIVE:
Your output was too similar to [other persona names].
You are [PERSONA_NAME]. Your lens is [LENS].
Your generation focus is [FOCUS].

You must generate from YOUR unique perspective, not a variation
of someone else's approach. Specifically:
- [Persona-specific instruction based on their lens]
- Do NOT use the same structure as [converged personas]
- Your opening, proof deployment, and closing must all reflect
  YOUR distinctive approach to [skill task]
```

**Step 5: Regenerate ONLY the converged personas** (non-converged outputs stay)

**Step 6: Re-run overlap check**

**If convergence PERSISTS after retry:**
- **Subagent mode:** Kill converged subagents, spawn fresh ones with stronger persona prompts and extended persona specimen loading (5 specimens instead of 3)
- **Single-context mode:** Reduce to non-converging personas + The Architect (minimum 4 unique voices). Log the reduction in execution-log.md.

---

## MODE 2: ROUND STAGNATION

### Detection

Compare winner's overall weighted score across rounds.

**Threshold:** Flag if ALL of:
- Round N+1 winner score minus Round N winner score < 0.2
- AND winning persona is the same across both rounds (same voice won without competition pressure producing improvement)

**Score tracking:**

```yaml
round_scores:
  round_1:
    winner: "[persona]"
    score: [X.X]
  round_2:
    winner: "[persona]"
    score: [X.X]
    delta_from_r1: [X.X]
  round_3:
    winner: "[persona]"
    score: [X.X]
    delta_from_r2: [X.X]
```

### Intervention: Human Decision

When round stagnation is detected (typically between Round 1 and Round 2 FINAL):

**Present to human:**

```markdown
## Round Stagnation Detected

Round [N+1] did not meaningfully improve on Round [N].

| Metric | Round [N] | Round [N+1] | Delta |
|--------|----------|-------------|-------|
| Winner | [persona] | [persona] | [same/different] |
| Winner Score | [X.X] | [X.X] | [+X.X] |
| Second Place Score | [X.X] | [X.X] | [+X.X] |
| Mean Score | [X.X] | [X.X] | [+X.X] |

### Options:

**A: Continue to Round [N+1] anyway** (protocol requires 2 rounds + audience evaluation)
- Pro: Honors the mandatory 2-round + audience evaluation protocol
- Con: May burn tokens without quality gain

**B: Accept Round [N+1] results as final** (human override of 2-round + audience evaluation rule)
- Pro: Saves time and tokens
- Con: Bypasses mandatory protocol — must be explicitly approved

**C: Inject constraint to force divergence**
- Action: "The winning approach from Round [N] is now BANNED — all
  personas must find a fundamentally different approach"
- Pro: Forces genuine exploration instead of incremental refinement
- Con: May sacrifice the best approach for novelty
```

**The human decides.** The system does NOT auto-skip rounds — Law 4 says "2-round + audience evaluation Arena, no exceptions." Only an explicit human override can reduce rounds.

---

## MODE 3: OUTPUT REPETITION

### Detection

Within a single generation, detect paragraph-level repetition using a sliding window of 3 consecutive sentences.

**Threshold:** Flag if any 3-sentence block appears twice in the same output (normalized: lowercased, articles removed, minor word variations ignored).

**Implementation:**

```
1. Split output into sentences
2. Create sliding window of 3-sentence blocks
3. Hash each block (after normalization)
4. If any hash appears twice → flag with:
   - The repeated block
   - First occurrence line number
   - Second occurrence line number
```

### Intervention: Halt and Regenerate

When output repetition is detected:

**Step 1: HALT generation immediately** — the model is looping

**Step 2: Flag the repeated block** — show the agent exactly what repeated

**Step 3: Trigger MC-CHECK** — output repetition is a degradation signal

```yaml
MC-CHECK:
  trigger: "output_repetition"
  rushing_detection:
    abbreviating_outputs: "Y"
  result: "HALT"
```

**Step 4: Re-read the skill spec** — the agent may have lost track of the output structure

**Step 5: Regenerate from the point where repetition began** — don't restart the entire generation, just the section that looped

**Step 6: If repetition persists:**
- This is a strong context pressure signal
- Check context zone — if ORANGE or above, apply Adaptive Compaction Protocol first
- Then retry generation with compacted context
- If still failing → session break

---

## THE CONVERGENCE PARADOX: WHEN CONVERGENCE IS GOOD

**From ASI-Arch:** SOTA results converge on proven techniques. Component preference analysis shows SOTA models exhibit a LESS pronounced long-tail — they converge on a core set of validated approaches.

**Applied to Arena:**

| Round | Convergence Signal | Interpretation |
|-------|-------------------|----------------|
| **Round 1** | 3+ personas >40% overlap | **BAD** — insufficient exploration. Personas aren't differentiated. Intervene. |
| **Round 2** | Winner's techniques adopted by 3+ personas | **NEUTRAL** — expected learning behavior. The Analytical Brief is working. Monitor but don't intervene unless scores stagnate. |
| **Round 2 (FINAL)** | Convergence toward winning approach | **GOOD** — natural refinement. The competition found its best approach and personas are polishing it. Allow. |

**Convergence detector thresholds by round:**

| Round | Overlap Threshold to Flag | Rationale |
|-------|--------------------------|-----------|
| 1 | 40% | Strict — Round 1 should show maximum diversity |
| 2 | 50% | Relaxed — some convergence expected from Analytical Brief |
| 3 | 60% | Permissive — refinement convergence is healthy |

The convergence detector uses round-aware thresholds. The same overlap percentage that triggers intervention in Round 1 is acceptable in Round 2 (FINAL).

---

## INTEGRATION POINTS

### With dispatch-validator.sh

Add routing for `convergence_detector.py` on writes to `arena/` paths:

```bash
# 6. Arena output files → convergence detector
if [[ "$FILE_PATH" == *"arena/"* ]] && [[ "$FILE_PATH" == *"-output.md"* || "$FILE_PATH" == *"-revised.md"* ]]; then
    RESULT=$(python3 "$VALIDATORS_DIR/convergence_detector.py" "$FILE_PATH" 2>/dev/null || true)
    if [[ -n "$RESULT" && "$RESULT" != "{}" ]]; then
        FEEDBACK="${FEEDBACK}${RESULT}\n"
    fi
fi
```

### With reminder_detector.py

Convergence detection uses the same JSON output format as reminder_detector.py:

```json
{
  "type": "reminder",
  "detector": "convergence",
  "severity": "warning",
  "message": "CONVERGENCE WARNING: Personas [X], [Y], and [Z] share [N]% 5-gram overlap.",
  "action_required": "Apply Divergence Protocol — re-read persona specimens, add divergence directive."
}
```

### With ARENA-CORE-PROTOCOL.md

The Adaptive Convergence Governor (Upgrade 2.2 in ARENA-CORE-PROTOCOL.md) defines the pairwise checks. This protocol defines the interventions. Both reference the same thresholds.

### With EVENT-DRIVEN-REMINDERS.md

Convergence detection IS Detector 3 from the Event-Driven Reminders protocol. This protocol provides the full implementation that was deferred during Phase 1.

---

## THRESHOLDS SUMMARY

| Parameter | Value | Source |
|-----------|-------|--------|
| Persona convergence: 5-gram overlap threshold (Round 1) | 40% | OpenDev convergence detection |
| Persona convergence: 5-gram overlap threshold (Round 2) | 50% | ASI-Arch convergence paradox |
| Persona convergence: 5-gram overlap threshold (Round 2 FINAL) | 60% | ASI-Arch convergence paradox |
| Persona convergence: minimum cluster size | 3 personas | OpenDev convergence detection |
| Round stagnation: minimum score improvement | 0.2 | OpenDev doom-loop detection |
| Round stagnation: same winner required | Yes | Additional signal |
| Output repetition: block size | 3 sentences | OpenDev iteration cap |
| Output repetition: threshold | 1 repeat | Zero tolerance for loops |
| Divergence intervention: max retries | 1 | After retry, reduce personas |
| Minimum unique voices (after reduction) | 4 | Preserve competition viability |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-11 | Initial creation. Three detection modes, round-aware convergence thresholds, divergence protocol, human decision for stagnation. From OpenDev Enhancement 7 + ASI-Arch convergence paradox finding. |
