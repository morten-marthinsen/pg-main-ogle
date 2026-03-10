# ACTIVE RECITATION PROTOCOL

**Version:** 1.0
**Created:** 2026-03-07
**Authority:** STRUCTURAL — recitation produces OUTPUT files, not internal notes
**Scope:** Copy generation skills (10-20), tier-dependent frequency

---

## TABLE OF CONTENTS

- [Purpose](#purpose)
- [The 5 Strategic Anchors](#the-5-strategic-anchors)
- [Tier-Based Frequency](#tier-based-frequency)
- [Trigger Points](#trigger-points)
- [Recitation Format](#recitation-format)
- [Post-Recitation Drift Check](#post-recitation-drift-check)
- [Key Rules](#key-rules)

---

## Purpose

As copy generation progresses through Skills 10-20, strategic drift occurs. The model gradually loses connection to the campaign's core strategic decisions — the root angle, mechanism name, voice register, FSSIT candidates, and emotional anchor selected during foundation work.

Active Recitation forces the model to **externalize** these anchors to a file at critical midpoints. This:
1. Refreshes strategic memory through the act of verbatim copying
2. Creates a drift-detection artifact (recitation vs source comparison)
3. Provides a structural checkpoint in the copy generation pipeline

---

## The 5 Strategic Anchors

At each recitation point, the following 5 anchors are restated **verbatim** from their source packages:

### Anchor 1: Root Angle (Three-Part Structure)
**Source:** `root-cause-package.yaml`
- Root cause statement (verbatim)
- Villain identification (verbatim)
- Reframe technique (verbatim)

### Anchor 2: Mechanism Name
**Source:** `mechanism-package.json`
- Mechanism name (exact string)
- Primary analogy/metaphor (exact string)
- E-level classification (exact)

### Anchor 3: Soul.md Voice Register
**Source:** `soul.md` (project-specific)
- Voice register description (verbatim)
- Anti-voice patterns (verbatim list)
- Pacing signature (verbatim)

### Anchor 4: Top 3 FSSIT Candidates
**Source:** `context-reservoir.md` or `research-package.json`
- FSSIT #1: statement + resonance score (verbatim)
- FSSIT #2: statement + resonance score (verbatim)
- FSSIT #3: statement + resonance score (verbatim)

### Anchor 5: Selected Headline Emotional Anchor
**Source:** `headline-package.json`
- Selected headline (verbatim)
- Emotional anchor identified during selection (verbatim)
- Why this headline won (verbatim from Arena reasoning capture)

---

## Tier-Based Frequency

| Tier | Recitation Points | When |
|------|------------------|------|
| **Full** | Midpoint + 75% | After Skill 12 (Story) AND after Skill 15 (Product Intro) |
| **Standard** | Midpoint only | After Skill 12 (Story) |
| **Quick** | None | No recitation — direct generation |

---

## Trigger Points

### Midpoint Recitation (After Skill 12 — Story)

**Why here:** The story section is where strategic drift most commonly begins. The model has been generating narrative and may have shifted voice, introduced new metaphors, or drifted from the root angle.

**Timing:** After Skill 12 outputs are saved, before Skill 13 begins.

### 75% Recitation (After Skill 15 — Product Introduction) — Full Tier Only

**Why here:** The product introduction is the pivot from "problem world" to "solution world." The mechanism name, promise, and voice register must carry through this transition accurately.

**Timing:** After Skill 15 outputs are saved, before Skill 16 begins.

---

## Recitation Format

Save recitation to: `~outputs/[project-code]/recitation-[point].md`

Where `[point]` is `midpoint` or `75pct`.

```markdown
# Active Recitation — [Midpoint / 75%]
**Project:** [project-code]
**Generated:** [timestamp]
**Trigger:** After Skill [12/15]

## Anchor 1: Root Angle
**Root Cause:** [VERBATIM from root-cause-package.yaml → root_cause]
**Villain:** [VERBATIM from root-cause-package.yaml → villain]
**Reframe:** [VERBATIM from root-cause-package.yaml → reframe]

## Anchor 2: Mechanism
**Name:** [VERBATIM from mechanism-package.json → mechanism_name]
**Analogy:** [VERBATIM from mechanism-package.json → primary_analogy]
**E-Level:** [VERBATIM from mechanism-package.json → e_level]

## Anchor 3: Voice Register
**Register:** [VERBATIM from soul.md → voice_register]
**Anti-Voice:** [VERBATIM from soul.md → anti_voice_patterns]
**Pacing:** [VERBATIM from soul.md → pacing_signature]

## Anchor 4: Top 3 FSSIT
1. [VERBATIM] — Resonance: [score]
2. [VERBATIM] — Resonance: [score]
3. [VERBATIM] — Resonance: [score]

## Anchor 5: Headline Emotional Anchor
**Headline:** [VERBATIM from headline-package.json → selected_headline]
**Emotional Anchor:** [VERBATIM from headline selection reasoning]
**Why It Won:** [VERBATIM from Arena reasoning capture]
```

---

## Post-Recitation Drift Check

After writing the recitation file, perform a drift check against the most recent prose output:

```
DRIFT CHECK:
  root_angle_present_in_recent_prose: [Y/N]
  mechanism_name_used_correctly: [Y/N]
  voice_register_maintained: [Y/N]
  fssit_themes_visible: [Y/N]
  headline_anchor_threaded: [Y/N]

  IF ANY "N":
    Flag drift area
    Note specific deviation
    Recommend correction in next skill
```

Write the drift check to the same recitation file.

---

## Key Rules

1. **Recitation is OUTPUT.** It is written to a file (`recitation-[point].md`), not "mentally noted" or held in working memory. File existence proves recitation happened.

2. **Values are VERBATIM.** Copy exact strings from source packages. No paraphrasing, no summarizing, no "the gist of." If the mechanism name is "The Neural Reset Protocol," write "The Neural Reset Protocol" — not "the neural reset mechanism."

3. **Source packages must be RE-READ.** Do not recite from memory. Open the actual source files and copy from them. This is the same anti-synthesis principle as the mandatory read declaration.

4. **Drift check is mandatory.** Writing the recitation without checking for drift defeats the purpose. The drift check identifies WHERE correction is needed before the next skill.

5. **Recitation files persist.** They become part of the project output and can be audited later to verify strategic consistency.
