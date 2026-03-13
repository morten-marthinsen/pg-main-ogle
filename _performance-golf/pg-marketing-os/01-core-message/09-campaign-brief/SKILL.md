---
name: campaign-brief
description: >-
  Synthesize all foundation work (Skills 01-08) into a single actionable campaign
  brief with coherence auditing and creative direction. Use after all foundation
  skills are complete and you need the master document that unlocks long-form
  writing. The Campaign Brief is the most complex foundation skill — it loads all
  8 upstream packages, audits coherence across dimensions, detects weaknesses,
  recommends lead type, story type, and emotional arc, and produces threading
  guides for downstream skills. Produces the campaign brief with coherence scores,
  creative direction, and execution guidance. Trigger when users mention campaign
  brief, final brief, writing brief, or are ready to start writing copy. Requires
  all Skills 01-08 outputs.
---

# 09: CAMPAIGN BRIEF

## The Master Key That Unlocks All Writing Skills

---

## PURPOSE

Audit and synthesize all foundation outputs into one executable brief. The Campaign
Brief ensures every downstream writing skill has a single, coherent source of truth.

**Output:** Campaign Brief package
**Unlocks:** Skills 10-20 (all long-form writing skills)

---

## ARCHITECTURE

This skill has 16 microskills across 5 layers:

- **Layer 0:** Upstream loader, vault intelligence, teachings, input validation
- **Layer 1:** Campaign summary, element relationship mapper, thesis validation
- **Layer 2:** Coherence dimension scorer, weakness detector, coherence narrative
- **Layer 3:** Lead type recommender, story type recommender, emotional arc designer
- **Layer 4:** Brief assembler, threading guide generator, human review interface

---

## ANTI-DEGRADATION

- Read `CAMPAIGN-BRIEF-ANTI-DEGRADATION.md` before execution — structural enforcement rules

---

## UPSTREAM REQUIREMENTS (All Required)

| Skill | Output File |
|-------|-------------|
| 01-Research | `deep-research-outputs/` |
| 02-Proof Inventory | `proof-inventory-output.json` |
| 03-Root Cause | `root-cause-package.yaml` |
| 04-Mechanism | `mechanism-package.json` |
| 05-Promise | `promise-output.json` |
| 06-Big Idea | `big-idea-output.json` |
| 07-Offer | `offer-package.json` |
| 08-Structure | `structure-package.json` |
