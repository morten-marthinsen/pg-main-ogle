# PDP-08-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-09
**Updated:** 2026-03-09
**Purpose:** STRUCTURAL enforcement to prevent Micro-Script process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: PDP-08-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes and enforcement rules below.
I WILL: Write scripts within duration limits, include visual direction, map to sections.
I WILL NOT: Write long-form scripts, skip visual direction, or use wrong feature names.
```

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI writes 3-minute scripts when the limit is 60 seconds
- AI produces narration without visual direction notes
- AI forgets to map scripts to specific page sections
- AI paraphrases feature names instead of using exact PDP-02 names
- AI writes scripts that could apply to any product (not specific enough)
- AI skips duration budgeting and produces variable-length scripts

---

## STRUCTURAL FIX 1: DURATION HARD LIMITS

```yaml
duration_limits:
  minimum: 15 seconds
  maximum: 60 seconds
  word_rate: 2.5 words per second (150 words/minute)

  IF script narration > (duration * 2.5 * 1.1): REJECT
    "Script narration too long for [X]s duration. Max [Y] words."
  IF script narration < (duration * 2.5 * 0.5): WARN
    "Script narration may be too short for [X]s duration."
```

---

## STRUCTURAL FIX 2: VISUAL DIRECTION MANDATORY

```yaml
visual_direction_check:
  FOR each script:
    [ ] Has timestamped visual direction
    [ ] Each timestamp has shot description
    [ ] Visuals align with narration timing
    [ ] At least 3 visual cues per 30-second script

  IF visual direction missing: HALT
```

---

## STRUCTURAL FIX 3: SECTION MAPPING REQUIRED

```yaml
section_mapping_check:
  FOR each script:
    [ ] Maps to specific page section number
    [ ] Section exists in PDP-01 strategy
    [ ] Script content matches section purpose

  IF unmapped script: HALT -- "Every script must map to a page section"
```

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "This needs 90 seconds" | 60s max. Split into two scripts. | SPLIT or COMPRESS |
| "Visual direction is the production team's job" | Scripts must include direction for page builder | ADD visual direction |
| "The script works for any section" | Scripts must map to specific sections | MAP to section |
| "Close enough on the feature name" | Exact PDP-02 match required | USE exact name |

---

## BINARY GATE ENFORCEMENT

```
VALID STATUSES: PASS, FAIL
FORBIDDEN: "close to budget", "approximately 60 seconds"
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-section-mapping-loader | layer-0-outputs/0.2-section-mapping-loader.md | 1KB |
| 1 | 1.1-script-type-router | layer-1-outputs/1.1-script-type-router.md | 2KB |
| 1 | 1.2-duration-budget-setter | layer-1-outputs/1.2-duration-budget-setter.md | 1KB |
| 2 | 2.1-script-generator | layer-2-outputs/2.1-script-generator.md | 5KB |
| 2 | 2.2-visual-direction-writer | layer-2-outputs/2.2-visual-direction-writer.md | 3KB |
| 4 | 4.1-script-validator | layer-4-outputs/4.1-script-validator.md | 2KB |
| 4 | 4.2-output-packager | layer-4-outputs/4.2-output-packager.md | 1KB |

---

## KEY INSIGHT

> "Micro-scripts are not mini sales pages. They're 15-60 second visual stories mapped to specific page sections. Narration + visual direction = complete script. One without the other is useless."

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial creation: 3 structural fixes (duration limits, visual direction mandatory, section mapping required). |
