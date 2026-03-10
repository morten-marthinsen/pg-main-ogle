# S02-PLATFORM-STRATEGY-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-04
**Purpose:** STRUCTURAL enforcement to prevent S02 process breakdown

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: S02-PLATFORM-STRATEGY-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Select platform based on creator preference instead of audience data from AIF. Accept fewer than 3 algorithm positive signals. Skip north star metric definition or treat all metrics as equal.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI selects platform based on creator preference, not audience data
- AI skips algorithm mechanics documentation
- AI produces posting schedule without time optimization
- AI proceeds to S03 without north star metric defined
- AI skips Gate G02 validation

---

## MANDATORY CHECKPOINT FILES

**Layer 1 CANNOT execute unless:**
```
[project]/S02-platform-strategy/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 4 CANNOT execute unless:**
```
[project]/S02-platform-strategy/checkpoints/LAYER_1_COMPLETE.yaml
```

---

## MINIMUM THRESHOLDS

| Section | Minimum Requirement | Gate |
|---------|-------------------|------|
| Algorithm positive signals | 3 documented | Layer 1 |
| Weekly posts | 3 posts minimum | Layer 1 |
| Optimal time windows | 2 windows | Layer 1 |
| PSF validation fields | 8/8 passing | Gate G02 |

---

## FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|--------------|-----------|----------|------------|
| Platform selection without AIF | No AIF loaded | HALT. Load S01 AIF first | Cannot proceed |
| Algorithm mechanics shallow | <3 positive signals | HALT 1.2. Research platform algorithm | Re-execute with depth |
| Posting schedule unoptimized | No time windows | HALT 1.5. Analyze audience active times | Cannot pass Gate G02 |
| North star metric undefined | Empty metric field | HALT 1.6. Define single most important KPI | Blocking for Gate G02 |

---

## FORBIDDEN RATIONALIZATIONS

1. "Creator prefers Instagram so we'll use that."
   - NO. Platform must match audience behavior from AIF.

2. "Algorithm details aren't critical."
   - NO. Minimum 3 positive ranking signals required.

3. "We can optimize posting times later."
   - NO. Schedule optimization is mandatory in this skill.

4. "All metrics matter equally."
   - NO. Must define single north star metric.

---

## BINARY GATE ENFORCEMENT

Gate G02 status can ONLY be:
- **PASS** — All 8 validation requirements met
- **FAIL** — Any requirement missing

NEVER create: "PARTIAL_PASS", "CONDITIONAL_PASS", etc.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-04 | Initial creation for organic marketing S02 |
