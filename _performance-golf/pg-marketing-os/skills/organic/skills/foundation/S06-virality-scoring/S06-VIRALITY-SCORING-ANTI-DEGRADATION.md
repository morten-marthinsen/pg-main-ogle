# S06-VIRALITY-SCORING-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-04
**Purpose:** STRUCTURAL enforcement to prevent virality scoring framework process breakdown
**Authority:** This document has EQUAL authority to ORGANIC-ENGINE-CLAUDE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: S06-VIRALITY-SCORING-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Fabricate scoring dimensions from memory instead of citing teaching files. Skip specimen calibration or fabricate benchmark scores. Use vague criteria instead of defined 0-10 numeric scales.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI invents scoring dimensions from memory instead of using established virality science
- AI skips specimen calibration and fabricates benchmark scores
- AI uses vague criteria (e.g., "good" vs "bad") instead of 0-10 scales
- AI omits platform modifiers or uses generic guidance
- AI sets unrealistic benchmarks disconnected from actual performance data

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 4 CANNOT execute unless this file exists:**
```
[campaign]/S06-virality-scoring/checkpoints/LAYER_1_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_1_COMPLETE.yaml
layer: 1
skill: "S06-virality-scoring"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  dimensions_defined:
    required: 8
    actual: [number]
    verified: true
  weights_sum:
    required: 100
    actual: [number]
    verified: true
  specimens_calibrated:
    required: 10
    actual: [number]
    verified: true
  platform_modifiers_defined: true
  benchmarks_established: true

completeness:
  all_microskills_executed: true
  minimum_thresholds_met: true
```

---

## STRUCTURAL FIX 2: FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|--------------|-----------|----------|------------|
| **Dimension Fabrication** | Dimensions not from teaching files | HALT → reload teachings, cite sources | Manual review |
| **Skip Calibration** | <10 specimens with scores | HALT → load specimens, score each | Cannot proceed |
| **Vague Criteria** | Criteria lack 0/2/4/6/8/10 definitions | HALT → define numeric scale | Rework dimension |
| **Generic Modifiers** | Platform modifiers not platform-specific | HALT → specify for actual platform | Consult S02 PSF |
| **Invented Benchmarks** | Benchmarks not derived from specimen scores | HALT → calculate from calibration data | Recalibrate |

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

These phrases indicate imminent failure. If you detect yourself about to use one, **STOP IMMEDIATELY**:

- ❌ "Based on best practices..." (requires teaching citation)
- ❌ "Typically content scores..." (requires specimen data)
- ❌ "Good engagement means..." (requires numeric definition)
- ❌ "Most viral content has..." (requires calibration proof)
- ❌ "Platform-optimized content should..." (requires platform-specific data)

---

## STRUCTURAL FIX 4: BINARY GATE ENFORCEMENT

Gates have TWO states: **PASS** or **FAIL**. No other status exists.

**Any file with status ≠ "PASS" should NOT exist.** If you see:
- "partial_pass"
- "conditional"
- "needs_review"
- "almost_complete"

**DELETE THE FILE. It represents failed execution.**

---

## STRUCTURAL FIX 5: PER-MICROSKILL OUTPUT PROTOCOL

EVERY microskill in Layer 1 MUST produce its own output file:

| Microskill | Output File | Minimum Size |
|------------|-------------|--------------|
| 1.1 Dimension Definition | `layer-1/1.1-dimensions.yaml` | 2KB |
| 1.2 Platform Modifiers | `layer-1/1.2-modifiers.yaml` | 1KB |
| 1.3 Specimen Calibration | `layer-1/1.3-calibration.yaml` | 3KB |
| 1.4 Benchmark Mapping | `layer-1/1.4-benchmarks.yaml` | 500B |
| 1.5 Quick-Score Builder | `layer-1/1.5-quick-score.yaml` | 1KB |

**IF FILE DOES NOT EXIST: That microskill did not execute. The work did not happen.**

---

## STRUCTURAL FIX 6: PROJECT INFRASTRUCTURE

BEFORE Layer 0, these files MUST exist:

```
[campaign]/S06-virality-scoring/
├── PROJECT-STATE.md (status, current layer, blockers)
├── PROGRESS-LOG.md (timestamped entries)
└── checkpoints/ (layer completion files)
```

**If infrastructure missing:** AI MUST create it before proceeding.

---

## STRUCTURAL FIX 7: STALE ARTIFACT CLEANUP

BEFORE starting S06, AI MUST:
1. Check for existing S06 outputs from prior failed attempts
2. If found AND incomplete: DELETE them
3. Start clean

**Partial outputs poison new attempts.** Delete before retry.

---

## MANDATORY READ

This file MUST be read at the start of EVERY S06 execution. Not optional. Not "if convenient."

The AI SHALL acknowledge reading this file by writing:
```
ANTI-DEGRADATION-READ: true
TIMESTAMP: [ISO 8601]
```

...to `PROJECT-STATE.md` before Layer 0.

---

## Enforcement

These structural fixes are BINDING. They cannot be "worked around" or "interpreted flexibly."

If you detect yourself rationalizing why a structural fix "doesn't apply in this case," you are experiencing the cognitive pattern these fixes exist to prevent.

**STOP. Re-read this file. Execute as specified.**
