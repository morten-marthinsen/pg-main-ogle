# Active Recitation Protocol
**Quality Engine v4** | Component: Protocol
**Purpose:** Mid-pipeline strategic anchor refresh — force the model to externalize critical decisions to a file at defined checkpoints, preventing strategic drift during long generation sequences
**System-Agnostic:** Works with any AI model or agent framework

---

## WHY THIS EXISTS

As generation progresses through multiple stages, strategic drift occurs. The model gradually loses connection to the project's core strategic decisions — the root problem framing, mechanism name, voice register, key research insights, and emotional anchor selected during foundation work.

Active Recitation forces the model to **externalize** these anchors to a file at critical midpoints. This:
1. Refreshes strategic memory through the act of verbatim copying from source files
2. Creates a drift-detection artifact (recitation vs. source comparison)
3. Provides a structural checkpoint in the generation pipeline

---

## THE STRATEGIC ANCHORS

At each recitation point, the following anchors are restated **verbatim** from their source packages. Adapt the specific anchors to your pipeline — these 5 represent the most common strategic drift points:

### Anchor 1: Problem Framing (Root Cause / Core Argument)
**Source:** Strategy package
- Root cause statement (verbatim)
- Villain / blame target identification (verbatim)
- Reframe technique (verbatim)

### Anchor 2: Mechanism / Solution Name
**Source:** Mechanism package
- Mechanism name (exact string)
- Primary analogy or metaphor (exact string)
- Classification level (exact)

### Anchor 3: Voice Register
**Source:** Voice/soul/tone file
- Voice register description (verbatim)
- Anti-voice patterns — what to AVOID (verbatim list)
- Pacing signature (verbatim)

### Anchor 4: Top Research Insights
**Source:** Context reservoir or research package
- Top insight #1: statement + relevance score (verbatim)
- Top insight #2: statement + relevance score (verbatim)
- Top insight #3: statement + relevance score (verbatim)

### Anchor 5: Selected Headline / Emotional Anchor
**Source:** Headline package or equivalent
- Selected headline (verbatim)
- Emotional anchor identified during selection (verbatim)
- Why this headline won (verbatim from competition reasoning)

---

## TIER-BASED FREQUENCY

| Tier | Recitation Points | When |
|------|------------------|------|
| **Full** | Midpoint + 75% | After the midpoint generation stage AND after the 75% stage |
| **Standard** | Midpoint only | After the midpoint generation stage |
| **Quick** | None | No recitation — direct generation |

---

## TRIGGER POINTS

### Midpoint Recitation

**Why here:** The midpoint is where strategic drift most commonly begins. The model has been generating narrative content and may have shifted voice, introduced new metaphors, or drifted from the core argument.

**Timing:** After midpoint stage outputs are saved, before the next stage begins.

### 75% Recitation (Full Tier Only)

**Why here:** The later stages often involve a pivot (e.g., from "problem world" to "solution world"). The mechanism name, promise, and voice register must carry through this transition accurately.

**Timing:** After 75% stage outputs are saved, before the next stage begins.

---

## RECITATION FORMAT

Save recitation to: `outputs/[project-code]/recitation-[point].md`

Where `[point]` is `midpoint` or `75pct`.

```markdown
# Active Recitation — [Midpoint / 75%]
**Project:** [project-code]
**Generated:** [timestamp]
**Trigger:** After Stage [N]

## Anchor 1: Problem Framing
**Root Cause:** [VERBATIM from strategy package]
**Villain:** [VERBATIM from strategy package]
**Reframe:** [VERBATIM from strategy package]

## Anchor 2: Mechanism
**Name:** [VERBATIM from mechanism package]
**Analogy:** [VERBATIM from mechanism package]
**Classification:** [VERBATIM from mechanism package]

## Anchor 3: Voice Register
**Register:** [VERBATIM from voice/soul file]
**Anti-Voice:** [VERBATIM from voice/soul file]
**Pacing:** [VERBATIM from voice/soul file]

## Anchor 4: Top 3 Research Insights
1. [VERBATIM] — Relevance: [score]
2. [VERBATIM] — Relevance: [score]
3. [VERBATIM] — Relevance: [score]

## Anchor 5: Headline / Emotional Anchor
**Headline:** [VERBATIM from headline package]
**Emotional Anchor:** [VERBATIM from selection reasoning]
**Why It Won:** [VERBATIM from competition reasoning]
```

---

## POST-RECITATION DRIFT CHECK

After writing the recitation file, perform a drift check against the most recent generated output:

```
DRIFT CHECK:
  problem_framing_present_in_recent_output: [Y/N]
  mechanism_name_used_correctly: [Y/N]
  voice_register_maintained: [Y/N]
  research_insight_themes_visible: [Y/N]
  headline_anchor_threaded: [Y/N]

  IF ANY "N":
    Flag drift area
    Note specific deviation
    Recommend correction in next stage
```

Write the drift check results to the same recitation file.

---

## KEY RULES

1. **Recitation is OUTPUT.** It is written to a file, not "mentally noted" or held in working memory. File existence proves recitation happened.

2. **Values are VERBATIM.** Copy exact strings from source packages. No paraphrasing, no summarizing, no "the gist of." If the mechanism name is "The Neural Reset Protocol," write "The Neural Reset Protocol" — not "the neural reset mechanism."

3. **Source packages must be RE-READ.** Do not recite from memory. Open the actual source files and copy from them. This is the anti-synthesis principle — the model must read, not recall.

4. **Drift check is mandatory.** Writing the recitation without checking for drift defeats the purpose. The drift check identifies WHERE correction is needed before the next stage.

5. **Recitation files persist.** They become part of the project output and can be audited later to verify strategic consistency throughout the pipeline.

---

## RELATIONSHIP TO CONSTRAINT LEDGER

The Active Recitation Protocol restates a fixed set of strategic anchors at defined checkpoints. The Constraint Ledger (see CONSTRAINT-LEDGER-PROTOCOL.md) is broader — it tracks ALL constraint-creating decisions continuously.

| Feature | Active Recitation | Constraint Ledger |
|---|---|---|
| **What** | 5 fixed strategic anchors | All constraint-creating decisions |
| **When** | Midpoint + 75% checkpoints | Continuous — loaded at every stage |
| **Format** | Verbatim restatement file | Structured YAML with rationale |
| **Purpose** | Attention refresh via externalization | Decision traceability + downstream enforcement |

They complement each other. Recitation keeps the most critical anchors alive through the act of verbatim copying. The ledger provides comprehensive decision traceability.

---

## CUSTOMIZING ANCHORS

The 5 anchors above represent the most common strategic drift points in content generation pipelines. For other pipeline types, adapt the anchors to your critical decision points:

**For a product development pipeline:**
- Anchor 1: User problem statement
- Anchor 2: Solution approach / architecture decision
- Anchor 3: Design principles / constraints
- Anchor 4: Top user research insights
- Anchor 5: Success metrics / acceptance criteria

**For a data analysis pipeline:**
- Anchor 1: Research question / hypothesis
- Anchor 2: Methodology choice and rationale
- Anchor 3: Data quality constraints
- Anchor 4: Key preliminary findings
- Anchor 5: Stakeholder requirements

The principle is the same: identify the decisions most likely to drift under context pressure, and force verbatim externalization at defined checkpoints.
