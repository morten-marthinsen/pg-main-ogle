# S07-CAMPAIGN-BRIEF-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-04
**Purpose:** STRUCTURAL enforcement to prevent campaign brief synthesis and planning breakdown
**Authority:** This document has EQUAL authority to ORGANIC-ENGINE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: S07-CAMPAIGN-BRIEF-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Copy-paste foundation files instead of synthesizing actionable insights. Create vague calendar entries like "educational content" or "engagement post." Produce fewer than 30 days of content calendar.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI skips synthesis and copy-pastes entire foundation files into CBF
- AI creates vague content calendar ("educational post," "engagement post")
- AI produces <30 days of calendar despite requirement
- AI omits measurable metrics from objectives
- AI fails to extract actionable insights from 6 foundation files
- AI creates CBF that's too short to be usable by production team

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 4 CANNOT execute unless this file exists:**
```
[campaign]/S07-campaign-brief/checkpoints/LAYER_1_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_1_COMPLETE.yaml
layer: 1
skill: "S07-campaign-brief"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  foundation_files_synthesized:
    required: 6
    actual: [number]
    verified: true
  objective_is_measurable: true
  content_calendar_days:
    required: 30
    actual: [number]
    verified: true
  platform_cadence_defined: true
  hook_strategy_complete: true

completeness:
  all_microskills_executed: true
  minimum_thresholds_met: true
```

---

## STRUCTURAL FIX 2: FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|--------------|-----------|----------|------------|
| **Copy-Paste Synthesis** | Foundation sections >500 words each | HALT → extract KEY insights only | Rework synthesis |
| **Vague Calendar** | Calendar entries lack specificity | HALT → define content type, pillar, hook type | Replan calendar |
| **Short Calendar** | <30 days planned | HALT → continue planning to 30 days minimum | Cannot proceed |
| **Unmeasurable Objective** | No numeric targets or metrics | HALT → define baseline, target, measurement | Rewrite objective |
| **Missing Synthesis** | Any S01-S06 file not referenced | HALT → load and synthesize missing file | Incomplete brief |

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

These phrases indicate imminent failure. If you detect yourself about to use one, **STOP IMMEDIATELY**:

- ❌ "Post educational content about [topic]" (not specific enough)
- ❌ "Grow followers and engagement" (not measurable)
- ❌ "Continue with weekly posting" (need daily plan)
- ❌ "See AIF for full audience details" (must synthesize, not reference)
- ❌ "Use hooks from HLF" (must specify WHICH hooks)

---

## STRUCTURAL FIX 4: BINARY GATE ENFORCEMENT

Gates have TWO states: **PASS** or **FAIL**. No other status exists.

**Any file with status ≠ "PASS" should NOT exist.** If you see:
- "partial_pass"
- "needs_approval"
- "draft_complete"
- "pending_review"

**DELETE THE FILE. It represents failed execution.**

---

## STRUCTURAL FIX 5: PER-MICROSKILL OUTPUT PROTOCOL

EVERY microskill in Layer 1 MUST produce its own output file:

| Microskill | Output File | Minimum Size |
|------------|-------------|--------------|
| 1.1 Foundation Synthesis | `layer-1/1.1-synthesis.yaml` | 3KB |
| 1.2 Objective Crystallization | `layer-1/1.2-objectives.yaml` | 1KB |
| 1.3 Content Calendar Planner | `layer-1/1.3-calendar.yaml` | 5KB |
| 1.4 Platform Execution Plan | `layer-1/1.4-platform-plan.yaml` | 2KB |
| 1.5 Voice & Hook Strategy | `layer-1/1.5-voice-hooks.yaml` | 2KB |
| 1.6 Quality & Distribution | `layer-1/1.6-quality-distribution.yaml` | 1KB |

**IF FILE DOES NOT EXIST: That microskill did not execute. The work did not happen.**

**MINIMUM SIZE RULE:** If file is smaller than minimum, synthesis/planning was insufficient.

---

## STRUCTURAL FIX 6: CONTENT CALENDAR SPECIFICITY

Every calendar entry MUST have:

```yaml
day: "[Day of week]"
content_type: "[Specific: Reel, Carousel, Thread, etc.]"
pillar: "[From CAF]"
hook_type: "[From HLF]"
function: "[Awareness/Engagement/Conversion/Community]"
working_title: "[Specific concept, not generic]"
```

**FORBIDDEN calendar entries:**
- "Educational content" (what specifically?)
- "Engagement post" (what type, what pillar?)
- "Video about [topic]" (what hook? what function?)
- "TBD" (plan it now)

**If calendar has generic entries: CALENDAR FAILS VALIDATION.**

---

## STRUCTURAL FIX 7: PROJECT INFRASTRUCTURE

BEFORE Layer 0, these files MUST exist:

```
[campaign]/S07-campaign-brief/
├── PROJECT-STATE.md (status, current layer, blockers)
├── PROGRESS-LOG.md (timestamped entries)
└── checkpoints/ (layer completion files)
```

**If infrastructure missing:** AI MUST create it before proceeding.

---

## STRUCTURAL FIX 8: STALE ARTIFACT CLEANUP

BEFORE starting S07, AI MUST:
1. Check for existing S07 outputs from prior failed attempts
2. If found AND incomplete: DELETE them
3. Start clean

**Partial outputs poison new attempts.** Delete before retry.

---

## STRUCTURAL FIX 9: CBF MINIMUM SIZE

The final CBF file MUST be **≥5KB** to be considered complete.

If CBF <5KB:
- Synthesis was too shallow
- Calendar was too sparse
- Planning was insufficient

**5KB is the minimum to contain:**
- 30-day calendar (daily entries)
- Synthesis from 6 foundation files
- Platform execution details
- Voice strategy
- Hook strategy
- Distribution plan

**If <5KB: CBF FAILS validation. Return to Layer 1.**

---

## MANDATORY READ

This file MUST be read at the start of EVERY S07 execution. Not optional. Not "if convenient."

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
