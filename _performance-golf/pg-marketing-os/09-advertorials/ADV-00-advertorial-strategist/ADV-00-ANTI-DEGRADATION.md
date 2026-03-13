# ADV-00-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-09
**Updated:** 2026-03-09
**Purpose:** STRUCTURAL enforcement to prevent advertorial strategy process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: ADV-00-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Skip type selection rationale, bypass 5 Laws validation, or package incomplete strategies.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI selects advertorial type WITHOUT analyzing campaign brief objectives
- AI defines editorial angle that reads as promotional pitch
- AI skips platform compliance mapping ("can be added later")
- AI produces strategy without addressing all 5 Laws of Advertorials
- AI packages strategy with vague downstream instructions
- AI plans proof stacking (3+ proof elements in sequence)
- AI accepts promotional voice register in editorial strategy
- AI skips proof inventory cataloguing

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY BRIEF ANALYSIS BEFORE TYPE SELECTION

### The Problem
AI selects advertorial type based on general preference rather than campaign brief analysis. Type selection disconnected from campaign objectives produces misaligned strategies.

### The Fix

**Type selection CANNOT execute unless brief parser output exists:**
```
[project]/ADV-00/checkpoints/BRIEF_PARSED.yaml
```

**BRIEF_PARSED.yaml must contain:**
```yaml
mechanism_extracted: true
mechanism_name: "[exact name]"
story_elements_found: [count]
proof_elements_found: [count]
audience_defined: true
campaign_objectives: "[list]"
```

**IF brief not parsed -> HALT type selection entirely.**

---

## STRUCTURAL FIX 2: 5 LAWS ENFORCEMENT GATE

### The Problem
AI produces strategy documents that address format and angle but ignore the 5 Laws of Advertorials. Without explicit Law compliance mapping, downstream skills produce ad-smelling content.

### The Fix

**Strategy assembly CANNOT complete unless all 5 Laws are addressed:**

```yaml
five_laws_check:
  law_1_content_appearance:
    addressed: [Y/N]
    strategy_element: "[how strategy ensures this]"
  law_2_article_reading:
    addressed: [Y/N]
    strategy_element: "[how strategy ensures this]"
  law_3_editorial_smell_test:
    addressed: [Y/N]
    strategy_element: "[how strategy ensures this]"
  law_4_single_cta_text_link:
    addressed: [Y/N]
    strategy_element: "[how strategy ensures this]"
  law_5_recommendation_bridge:
    addressed: [Y/N]
    strategy_element: "[how strategy ensures this]"

  IF any_law_not_addressed:
    HALT: "Strategy incomplete -- Law [N] not addressed"
```

---

## STRUCTURAL FIX 3: EDITORIAL VOICE GATE

### The Problem
AI defaults to promotional voice in strategy documents, which propagates promotional tone to all downstream skills.

### The Fix

**Strategy document must pass editorial voice check:**

```yaml
editorial_voice_check:
  promotional_phrases_found: [count]
  ad_smell_triggers_found: [count]
  voice_register: "[journalistic|conversational|expert|peer]"

  IF promotional_phrases_found > 0:
    HALT: "Promotional language in strategy -- revise"
  IF ad_smell_triggers_found > 0:
    HALT: "Ad-smell triggers in strategy -- revise"
  IF voice_register in [promotional, salesy, infomercial]:
    HALT: "Invalid voice register -- must be editorial"
```

---

## STRUCTURAL FIX 4: PROOF DENSITY ENFORCEMENT

### The Problem
AI plans proof-heavy advertorial sections that stack 3+ proof elements in sequence, triggering "ad smell" in readers.

### The Fix

**Strategy proof planning must enforce density rules:**

```yaml
proof_density_check:
  max_per_paragraph: 1
  max_consecutive_proof_paragraphs: 2
  stacking_planned: [Y/N]

  IF stacking_planned == Y:
    HALT: "Proof stacking planned -- max 1 per paragraph, max 2 consecutive"
  IF max_per_paragraph > 1:
    HALT: "Proof density exceeds 1 per paragraph"
```

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "Type selection is intuitive" | Type must flow from campaign brief analysis | HALT -- Parse brief first |
| "Compliance can be added later" | Compliance shapes word count, structure, everything | HALT -- Map compliance now |
| "5 Laws are implicit" | Implicit = forgotten downstream | HALT -- Make explicit |
| "Proof stacking adds credibility" | 3+ proof in sequence = ad smell = reader bounce | HALT -- Enforce density rules |
| "Promotional tone shows enthusiasm" | Promotional tone in strategy = promotional copy downstream | HALT -- Revise to editorial |
| "One type works for everything" | Each type has unique structure, constraints, strengths | HALT -- Analyze campaign fit |
| "Downstream skills will figure it out" | Vague instructions = vague copy | HALT -- Specify instructions |

---

## BINARY GATE ENFORCEMENT

**Gate statuses are BINARY: PASS or FAIL. Decision statuses are explicit.**

```
VALID GATE STATUSES (checkpoint files):
  COMPLETE (layer checkpoint)
  PASS (gate evaluation)

VALID DECISION STATUSES (validation layer):
  approved
  revision (return to previous layer)
  blocked (return to earlier layer)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  approved_with_concerns / conditional_approval
  PROCEED_WITH_CONCERNS / WARNING
  "good enough" / "acceptable for now"

IF any forbidden status is generated:
  1. HALT immediately
  2. DELETE any output files created under the false status
  3. RETURN to the failing layer
  4. Re-evaluate with valid statuses only
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-brief-parser | layer-0-outputs/0.2-brief-parser.md | 2KB |
| 0 | 0.3-input-validator | layer-0-outputs/0.3-input-validator.md | 1KB |
| 1 | 1.1-advertorial-type-selector | layer-1-outputs/1.1-type-selector.md | 3KB |
| 1 | 1.2-angle-definer | layer-1-outputs/1.2-angle-definer.md | 2KB |
| 1 | 1.3-platform-compliance-mapper | layer-1-outputs/1.3-compliance-mapper.md | 2KB |
| 2 | 2.1-strategy-assembler | layer-2-outputs/2.1-strategy-assembler.md | 5KB |
| 4 | 4.1-strategy-validator | layer-4-outputs/4.1-strategy-validator.md | 2KB |
| 4 | 4.2-output-packager | layer-4-outputs/4.2-output-packager.md | 1KB |

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION:
[ ] ADV-00-ANTI-DEGRADATION.md read (THIS FILE)
[ ] ADV-00-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Input files validated (campaign-brief-package)

LAYER 0 (FOUNDATION):
[ ] Campaign brief loaded
[ ] Brief parsed -- mechanism, story, proof, audience extracted
[ ] Input validation passed
[ ] LAYER_0_COMPLETE.yaml created

LAYER 1 (ARCHITECTURE):
[ ] Advertorial type selected with rationale
[ ] Editorial angle defined with hook direction
[ ] Platform compliance mapped
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (ASSEMBLY):
[ ] Full strategy assembled
[ ] 5 Laws addressed
[ ] Downstream instructions specified
[ ] LAYER_2_COMPLETE.yaml created

LAYER 4 (VALIDATION):
[ ] Strategy validated against checklist
[ ] advertorial-strategy.yaml packaged
[ ] LAYER_4_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified
[ ] advertorial-strategy.yaml passed to downstream skills

ON CONTEXT RESUME:
[ ] VERIFY brief was parsed (check execution log)
[ ] VERIFY type selection has rationale
[ ] VERIFY 5 Laws addressed
[ ] If brief not parsed, RETURN to Layer 0
```

---

## KEY INSIGHT

> **"An advertorial strategy without 5 Laws enforcement produces ads disguised as articles -- which readers detect instantly. The strategy IS the 5 Laws implementation plan."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial creation: 4 structural fixes, editorial voice gate, proof density enforcement, 5 Laws gate, per-microskill output protocol |
