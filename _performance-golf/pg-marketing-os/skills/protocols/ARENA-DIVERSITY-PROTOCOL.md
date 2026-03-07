# ARENA-DIVERSITY-PROTOCOL.md

**Version:** 1.0
**Created:** 2026-03-06
**Purpose:** Prevent Arena output homogeneity and judge consensus bias. Ensures variant diversity, competitive differentiation, and memorable distinctiveness across all Arena executions.
**Authority:** This protocol has EQUAL authority to ARENA-CORE-PROTOCOL.md and CLAUDE-CORE.md.
**Research basis:** Artificial Hivemind (NeurIPS 2025) — LLM creative output homogeneity

---

## TABLE OF CONTENTS

- [When This Protocol Applies](#when-this-protocol-applies)
- [1. Variant Diversity Audit](#1-variant-diversity-audit)
- [2. Competitive Distance Scoring](#2-competitive-distance-scoring)
- [3. Pattern Break Bonus](#3-pattern-break-bonus)
- [4. Memorability Test](#4-memorability-test)

---

## When This Protocol Applies

This protocol activates during **every Arena execution** — strategic (03-08), generative (10-18), and editorial (20). It adds steps between generation and scoring in each round.

---

## 1. Variant Diversity Audit

**Trigger:** After all 7 personas generate in each round, BEFORE scoring.

### Classification Step

After all 7 persona outputs are collected, classify each variant by:

1. **Dominant emotional frame** — What primary emotion does this variant leverage? (fear, curiosity, aspiration, urgency, empathy, outrage, etc.)
2. **Structural approach** — How is the argument/piece organized? (problem-solution, narrative, listicle, contrast, question-driven, etc.)
3. **Entry angle** — What hook or opening strategy does it use? (statistic, story, question, bold claim, analogy, scene-setting, etc.)
4. **Key differentiating phrase** — What single phrase or concept makes this variant unique?

### Pairwise Convergence Check

Compare all 21 possible pairs (7 choose 2). Flag any pair sharing 3 or more of the 4 classification dimensions as "convergent."

```yaml
diversity_audit:
  round: [1|2|3]
  classifications:
    - persona: "[name]"
      emotional_frame: "[frame]"
      structural_approach: "[approach]"
      entry_angle: "[angle]"
      differentiating_phrase: "[phrase]"
  convergent_pairs:
    - pair: ["[persona_a]", "[persona_b]"]
      shared_dimensions: ["[dim1]", "[dim2]", "[dim3]"]
  convergent_pair_count: [number]
  threshold: 3
  divergence_protocol_triggered: [Y/N]
```

### Divergence Protocol

**Threshold:** If >3 convergent pairs (out of 21 possible), the round triggers DIVERGENCE PROTOCOL.

When triggered:
1. Critic identifies the convergence pattern and names it explicitly (e.g., "5 of 7 personas used fear-based problem-solution openings")
2. The 3 most-similar personas MUST regenerate with an explicit differentiation constraint
3. The differentiation constraint specifies: "Your output MUST use a different [dimension] than your Round N output. Specifically, you cannot use [the converged pattern]."
4. Regenerated outputs replace the originals for that round

**This is additive quality enforcement, not punitive.** Convergence is a natural LLM tendency — the protocol corrects it structurally.

---

## 2. Competitive Distance Scoring

**New Arena evaluation dimension — added to all skill-specific criteria.**

Score each variant against competitive intelligence:
- For Ad Engine: A01 competitive data
- For Organic Engine: S01 competitive data
- For Foundation/Long-Form: Skill 01 research competitive landscape

### Scoring Rubric

| Score | Meaning |
|-------|---------|
| 1-2 | Identical to what competitors are already running |
| 3-4 | Minor variation on existing market approaches |
| 5-6 | Recognizably different angle or framing |
| 7-8 | Substantially different — would stand out in competitive set |
| 9-10 | Nothing like it exists in the current market |

**Weight:** 10% of total evaluation score (redistribute existing weights proportionally to accommodate).

### Evidence Requirement

Competitive Distance scores MUST cite specific competitive examples:
- "This variant scores 3 because [Competitor X] is running a nearly identical hook: '[quote]'"
- "This variant scores 8 because no competitor in the landscape analysis uses [specific approach]"

Scores without competitive evidence are INVALID.

---

## 3. Pattern Break Bonus

**New Arena evaluation dimension — paired with Competitive Distance.**

Does this variant violate expected category conventions in a way that creates attention?

### Scoring Rubric

| Score | Meaning |
|-------|---------|
| 1-2 | Completely expected for this category — follows every convention |
| 3-4 | Minor deviation from category norms |
| 5-6 | Notable convention violation that creates surprise |
| 7-8 | Major pattern break — audience would notice this is different |
| 9-10 | Category-defying — redefines what this type of content looks like |

**Weight:** 5% of total evaluation score (redistribute existing weights proportionally).

**Combined differentiation allocation:** Competitive Distance (10%) + Pattern Break (5%) = 15% of total score allocated to differentiation.

### Category Convention Reference

The evaluator MUST name the convention being broken:
- "Health supplement ads typically lead with ingredients — this leads with a personal story (score: 7)"
- "Golf instruction promos always promise lower scores — this promises a feeling (score: 8)"
- "This follows every DTC health convention exactly (score: 2)"

---

## 4. Memorability Test

**Trigger:** After scoring all 7 variants in each round, BEFORE generating Learning Brief.

### Procedure

1. After scoring is complete, the evaluator must recall ONE specific phrase from each variant WITHOUT re-reading the outputs
2. For each variant, record:
   - `recalled_phrase`: The specific phrase remembered (or "NONE")
   - `recall_confidence`: How easily it came to mind (immediate / with effort / could not recall)

```yaml
memorability_test:
  round: [1|2|3]
  results:
    - persona: "[name]"
      recalled_phrase: "[phrase or NONE]"
      recall_confidence: "[immediate | with_effort | not_recalled]"
  forgettable_variants: ["[persona names where not_recalled]"]
  forgettable_count: [number]
```

### How Memorability Results Are Used

- **Informational, not gate-blocking.** Memorability flags do NOT prevent advancement.
- Forgettable variants are noted in the Learning Brief as "flagged as forgettable — consider adding a distinctive phrase or concept anchor"
- If ALL 7 variants are forgettable: escalate to human as a quality signal — "No variant produced a memorable phrase. This may indicate the upstream strategic packages lack distinctive language."

---

## Integration with ARENA-CORE-PROTOCOL.md

### Updated Round Flow

Each round now includes the Diversity Audit between generation and critique:

```
ROUND [N]:
  [N]A: 7 Competitors Generate
  [N]A.1: Variant Diversity Audit (THIS PROTOCOL)
    - Classify all 7 outputs
    - Pairwise convergence check
    - If >3 convergent pairs: trigger Divergence Protocol
  [N]B: Adversarial Critique
    - Existing critique protocol
    - Competitive Distance and Pattern Break included in evaluation
  [N]C: Targeted Revision
  [N]D: Scoring (now includes Competitive Distance + Pattern Break dimensions)
  [N]D.1: Memorability Test
  [N]E: Ranking
  [N]F: Learning Brief (includes diversity and memorability notes)
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-06 | Initial creation. Variant Diversity Audit, Competitive Distance Scoring (10%), Pattern Break Bonus (5%), Memorability Test. Research basis: Artificial Hivemind (NeurIPS 2025). |
