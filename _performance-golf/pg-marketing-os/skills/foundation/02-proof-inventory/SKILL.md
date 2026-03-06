---
name: proof-inventory
description: >-
  Catalog, classify, and score all available proof elements for a product or offer.
  Use after research (Skill 01) is complete and you need to build a comprehensive
  inventory of testimonials, clinical studies, data points, credentials, awards,
  media mentions, and other proof assets. Produces a scored proof inventory with
  gap analysis and promise ceiling calculation. The proof inventory determines
  what claims you can credibly make — without it, copy makes promises the proof
  can't support. Trigger when users mention proof inventory, testimonials,
  evidence audit, social proof, clinical proof, proof scoring, or promise ceiling.
  Requires research handoff from Skill 01.
---

# 02: PROOF INVENTORY

## Catalog, Classify, and Score All Available Proof

---

## PURPOSE

Build a comprehensive inventory of every proof element available for a product,
score each element's persuasive power, identify gaps, and calculate the maximum
promise level the proof can support.

**Output:** `proof-inventory-output.json`
**Unlocks:** Skill 03 (Root Cause), Skill 18 (Proof Weaving)

---

## LAYER ARCHITECTURE

- **Layer 0:** Vault intelligence loading, specimen decomposer
- **Layer 1:** Source parsing, testimonial extraction, promotion mining, study document extraction, category classification, sub-type matching, element scoring
- **Layer 2:** Composite scoring, Schwartz stage adjustment, category strength scoring, overall strength calculation, gap detection, gap severity scoring, promise ceiling calculation
- **Layer 3:** Discovery routing, study discovery, data discovery, testimonial discovery, expert discovery, certification discovery, mechanism proof discovery
- **Layer 4:** Inventory assembly, gap report generation, promise ceiling report, handoff packager

---

## OUTPUT LOCATION

Save to: `outputs/[project-name]/proof-inventory-output.json`
