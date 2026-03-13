# Meta-Prompt Refinement Protocol — Systematic Skill Prompt Improvement

**Version:** 1.0
**Created:** 2026-03-07
**Purpose:** Systematize skill prompt improvement based on observed outputs, integrated with the learning promotion loop
**Sources:** Marc Stockman Quality Engine gap analysis, Self-Learning Promotion Protocol (1.6)

---

## Overview

Meta-prompt refinement is the process of improving skill AGENT.md files and microskill specifications based on promoted learnings. When a learning reaches L4 (promoted rule) or L5 (embedded in skill), this protocol guides HOW to modify the skill prompts.

---

## When It Fires

A learning reaches L4 or L5 in the Self-Learning Promotion Protocol, and the modification targets a prompt (AGENT.md, microskill spec, or ANTI-DEGRADATION.md).

---

## The Refinement Process

### Step 1: Identify the Target Prompt

The promotion loop identifies WHICH file to modify. This protocol defines HOW:

| Learning Target | Files to Modify |
|----------------|----------------|
| Execution behavior | Microskill `.md` spec (the generation instructions) |
| Scoring criteria | Skill's ARENA-LAYER scoring rubric |
| Loading behavior | AGENT.md upstream loader section |
| Constraint behavior | ANTI-DEGRADATION.md forbidden rationalizations or thresholds |
| Voice/tone | Soul.md or ~system/SPECIMEN-GUIDE.md persona spec |

### Step 2: Draft the Modification

Generate a proposed modification with rationale:

```yaml
meta_prompt_refinement:
  learning_id: "L42"
  target_file: "skills/04-mechanism/microskills/4.2.3-naming-candidates.md"
  current_text: "[exact text being replaced]"
  proposed_text: "[new text]"
  rationale: "Shorter mechanism names (1-2 syllables) tested more natural in narrative prose across 3 campaigns"
  risk_assessment: "Low — naming preferences, not structural change"
```

### Step 3: Human Review

Present the before/after to human:
- Show the exact text being replaced
- Show the proposed replacement
- Explain the rationale (what learning drove this, what evidence exists)
- Flag the risk level (low/medium/high)

**Human approves or rejects.**

### Step 4: Apply and Version

If approved:
1. Edit the target file
2. Add a version note to the file's version history
3. Update the learning log entry to L5 (embedded in skill)
4. Commit with reference to the learning ID

```bash
git commit -m "meta-prompt: L42 — prefer 1-2 syllable mechanism names in 4.2.3"
```

---

## Refinement Categories

### Category 1: Instruction Strengthening

Adding specificity to vague instructions.

**Before:** "Generate mechanism name candidates"
**After:** "Generate mechanism name candidates. Prefer 1-2 syllable names that translate naturally into narrative prose (tested: shorter names integrate more smoothly in Skills 13-14)."

### Category 2: Example Addition

Adding a concrete example to illustrate desired behavior.

**Before:** "The mechanism should be memorable and clear"
**After:** "The mechanism should be memorable and clear. Example of effective: 'Fascia Rebound' (2 syllables, visual, specific). Example of ineffective: 'Myofascial Regenerative Pathway' (complex, clinical, hard to embed in narrative)."

### Category 3: Constraint Addition

Adding a new constraint based on observed failure modes.

**Before:** [no constraint exists]
**After:** "CONSTRAINT: If the mechanism name exceeds 3 words, provide a shortened alias for use in narrative sections. The full name appears in the mechanism package; the alias is used in copy."

### Category 4: Threshold Adjustment

Adjusting scoring thresholds based on calibration data.

**Before:** "visual_metaphor minimum: 6.0"
**After:** "visual_metaphor minimum: 7.0 (elevated from 6.0 based on calibration: mechanisms scoring 6.0-6.9 consistently produced weak narrative in Skills 13-14)"

---

## Guardrails

1. **One change per refinement.** Don't bundle multiple modifications. Each learning = one change.
2. **Always show before/after.** The human must see exactly what's changing.
3. **Version everything.** Every modification is committed with a learning ID reference.
4. **Revertible.** If a refinement degrades output quality in a future campaign, revert the specific commit.
5. **Never modify core architecture.** Meta-prompt refinement touches instructions and thresholds, NOT structural enforcement mechanisms (gates, checkpoints, handoff schemas).

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-07 | Initial creation — meta-prompt refinement process for L4/L5 learning promotion |
