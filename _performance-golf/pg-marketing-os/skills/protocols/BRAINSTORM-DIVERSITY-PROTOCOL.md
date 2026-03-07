# BRAINSTORM-DIVERSITY-PROTOCOL.md

**Version:** 1.0
**Created:** 2026-03-06
**Purpose:** Enforce category diversity in brainstorming skills to prevent homogeneous candidate pools. Ensures generation covers multiple approaches, frames, and specimen anchors.
**Authority:** This protocol has EQUAL authority to CLAUDE-CORE.md.
**Research basis:** Artificial Hivemind (NeurIPS 2025) — LLM creative output homogeneity

---

## TABLE OF CONTENTS

- [When This Protocol Applies](#when-this-protocol-applies)
- [1. Minimum Category Spread Requirements](#1-minimum-category-spread-requirements)
- [2. Similarity De-duplication Check](#2-similarity-de-duplication-check)
- [3. Specimen-Anchored Divergence](#3-specimen-anchored-divergence)

---

## When This Protocol Applies

This protocol applies to **any skill that generates multiple candidates for selection**, specifically:

| Skill | Status | Notes |
|-------|--------|-------|
| Skill 10 Headlines | **New enforcement** | Category spread added |
| Skill 05 Promise | **New enforcement** | Category spread + diversity added |
| Skill 06 Big Idea | Existing enforcement | 3x3 matrix already enforces category spread |
| A02 Ad Hooks | Existing enforcement | 8+ types from 32-type taxonomy already required |
| E2 Subject Lines | Existing enforcement | 5+ formula categories already required |

Skills with existing enforcement (06, A02, E2) already meet the spirit of this protocol. Skills 10 and 05 are the primary targets.

---

## 1. Minimum Category Spread Requirements

### Per-Skill Table

| Skill | Total Minimum | Category Minimum | Category Source |
|-------|--------------|-----------------|-----------------|
| **Skill 10 Headlines** | 8-12 candidates | 4+ headline archetypes | Formula-based, vault-inspired, schema-violation, format-adapted |
| **Skill 05 Promise** | 15 candidates | 4+ promise types | Transformation, improvement, relief, capability, prevention, identity, emotional, speed/ease |
| **Skill 06 Big Idea** | 9 (3x3 matrix) | 3+ strategy types | Per existing matrix enforcement |
| **A02 Hooks** | 50 | 8+ hook types | AD-HOOK-TAXONOMY.md (32 types) |
| **E2 Subject Lines** | 20 | 5+ formula categories | 18-category taxonomy |

### Enforcement

```yaml
category_spread_check:
  skill: "[skill name]"
  total_candidates: [number]
  categories_represented: [number]
  category_breakdown:
    - category: "[name]"
      count: [number]
    - category: "[name]"
      count: [number]

  IF categories_represented < minimum:
    HALT — "Category spread insufficient. Need [minimum] categories, have [actual]. Generate candidates in missing categories: [list]"
```

### Skill 10 Headlines: Category Definitions

| Archetype | Source | What It Means |
|-----------|--------|--------------|
| **Formula-based** | Microskill 2.1 | Headlines derived from proven formula patterns (How-to, Number, Question, etc.) |
| **Vault-inspired** | Microskill 2.2 | Headlines modeled on specific gold specimen patterns from vault |
| **Schema-violation** | Microskill 2.3 | Headlines that deliberately break category expectations |
| **Format-adapted** | Microskill 2.4 | Headlines adapted for specific formats (email subject, social, VSL, etc.) |

### Skill 05 Promise: Category Definitions

| Type | What It Means |
|------|--------------|
| **Transformation** | Who they'll become (identity shift) |
| **Improvement** | What gets measurably better (specific metric) |
| **Relief** | What pain/problem disappears |
| **Capability** | What new ability they gain |
| **Prevention** | What future problem they avoid |
| **Identity** | How others will perceive them differently |
| **Emotional** | How they'll feel (internal state change) |
| **Speed/ease** | How quickly/easily they'll see results |

---

## 2. Similarity De-duplication Check

**Trigger:** After candidate generation, BEFORE scoring or Arena entry.

### Procedure

1. Group all candidates by dominant frame/approach
2. Calculate the percentage of total candidates in each group
3. If any single group contains >40% of total candidates: flag as "cluster-heavy"

```yaml
similarity_check:
  skill: "[skill name]"
  total_candidates: [number]
  clusters:
    - frame: "[dominant frame/approach]"
      count: [number]
      percentage: [number]%
      candidates: ["[ID1]", "[ID2]", ...]
  cluster_heavy: [Y/N]
  overrepresented_frame: "[frame name or N/A]"
```

### When Cluster-Heavy Is Triggered

This is **additive, not subtractive** — it generates MORE candidates, it does not delete existing ones.

1. Identify the overrepresented frame explicitly: "62% of candidates use a fear-based problem-solution frame"
2. Generate 3-5 additional candidates explicitly OUTSIDE that frame
3. The generation constraint is specific: "Generate candidates that do NOT use [overrepresented frame]. Instead, explore [list 2-3 alternative frames]."
4. Add the new candidates to the pool before scoring

### What Counts as a "Frame"

- **Emotional frame:** Fear, curiosity, aspiration, urgency, relief, outrage, empowerment
- **Structural frame:** Problem-solution, story-first, question-driven, contrast/before-after, list/steps, bold-claim
- **Angle frame:** Personal experience, scientific authority, social proof, contrarian, insider knowledge

Candidates sharing the same emotional AND structural frame are in the same cluster.

---

## 3. Specimen-Anchored Divergence

**Applies when:** A skill uses specimen injection (gold specimens from vault) to guide generation.

### The Problem

When all generation passes anchor to the SAME specimen, all candidates end up as variations of one pattern. The gold specimen becomes a ceiling instead of a launchpad.

### The Fix

Each generation pass must anchor to a DIFFERENT specimen.

```yaml
specimen_anchoring:
  skill: "[skill name]"
  generation_passes:
    - pass: 1
      specimen_anchor: "[specimen ID/name]"
      specimen_era: "[era/period]"
      specimen_vertical: "[vertical]"
      specimen_approach: "[key approach]"
    - pass: 2
      specimen_anchor: "[different specimen]"
      specimen_era: "[different era preferred]"
      specimen_vertical: "[different vertical preferred]"
      specimen_approach: "[different approach]"

  anchor_diversity_check:
    all_passes_use_different_specimens: [Y/N]
    IF_no: "HALT — Each generation pass must anchor to a different specimen"
```

### Selection Criteria for Diverse Specimens

When choosing specimens for multi-pass generation, maximize diversity across:

1. **Era** — Mix classic (pre-2000) and modern specimens
2. **Vertical** — Mix health, golf, finance, personal-dev specimens where available
3. **Approach** — Mix storytelling, direct-response, mechanism-led, emotion-led specimens

The goal is NOT to find the "best" specimen for every pass — it is to find DIFFERENT specimens that pull generation in different directions.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-06 | Initial creation. Category Spread Requirements (Skills 10, 05 primary targets), Similarity De-duplication Check (40% cluster threshold), Specimen-Anchored Divergence. Research basis: Artificial Hivemind (NeurIPS 2025). |
