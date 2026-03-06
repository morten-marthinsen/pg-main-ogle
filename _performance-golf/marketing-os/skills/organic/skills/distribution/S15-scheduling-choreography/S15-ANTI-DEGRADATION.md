# S15-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-05
**Purpose:** STRUCTURAL enforcement to prevent scheduling choreography process breakdown
**Authority:** This document has EQUAL authority to ORGANIC-ENGINE-CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI schedules content at random times ignoring platform optimal windows
- AI posts same content simultaneously across all platforms (spam pattern)
- AI ignores minimum posting gaps causing algorithm penalties
- AI skips cascade sequencing (no cross-platform coordination)
- AI schedules during blackout dates (holidays, low-engagement windows)
- AI fails to define engagement windows for S16 handoff
- AI produces scheduling file without data-driven timing strategy

**Instructions can be ignored. Structures cannot be bypassed.**

This document creates STRUCTURAL BARRIERS that make bypass physically impossible.

---

## STRUCTURAL FIX 1: FORBIDDEN RATIONALIZATIONS

**NEVER accept these justifications:**

| Forbidden Phrase | Why It's Forbidden | Correct Response |
|-----------------|-------------------|------------------|
| "Posting times don't matter that much" | Timing is algorithmic leverage | Stop. Load PSF optimal windows. |
| "We can cross-post everywhere at once" | Identical timing = spam signal | Stop. Design cascade with delays. |
| "Engagement windows aren't critical" | S16 requires precise timing | Stop. Define windows for all posts. |
| "Holiday scheduling is fine" | Low engagement = wasted content | Stop. Adjust calendar or reschedule. |
| "Random scheduling is good enough" | Random = no strategy | Stop. Map content type to optimal time. |

---

## STRUCTURAL FIX 2: FAILURE MODE TABLE

| Failure Mode | Detection | Response | Escalation |
|--------------|-----------|----------|------------|
| Content scheduled outside optimal windows | Check all post times against PSF optimal windows | REJECT schedule, require PSF-aligned times | Human review if 3+ violations |
| Simultaneous cross-platform posting | Check for identical timestamps across platforms | REJECT cascade, require minimum 30min delays | Immediate halt if pattern persists |
| Minimum gap violations | Check gaps between posts on same platform | REJECT schedule, enforce minimum gaps | Human review if platform flagged |
| Missing engagement windows | Check all posts have engagement_window_start/end | REJECT schedule, require S16 handoff data | Immediate halt if missing |
| Blackout date violations | Check all post dates against calendar blackouts | REJECT schedule, move content or override | Human review for all blackout posts |
| No cascade sequences | Check cascade_sequences section has ≥1 sequence | REJECT schedule, require cascade design | Human review if hero content has no cascade |

---

## STRUCTURAL FIX 3: BINARY GATE ENFORCEMENT

**Gates can ONLY have these statuses:**
- `PASS` — all criteria met, proceed
- `FAIL` — criteria not met, stop and remediate

**NEVER use:**
- "conditional pass"
- "partial pass"
- "pass with warnings" (unless explicitly defined in gate criteria)
- "provisionally approved"

**If a gate file exists, it MUST say PASS. Any other content means DELETE THE FILE.**

---

## STRUCTURAL FIX 4: MANDATORY READ BEFORE EXECUTION

**The agent MUST read these files BEFORE starting S15:**

1. `S15-AGENT.md` — master agent protocol
2. `S15-ANTI-DEGRADATION.md` — THIS FILE
3. `skills/layer-0/0.1-input-validator.md` — input validation protocol
4. `[project]/S14-content-assembly/outputs/[campaign]-content-packages.yaml` — content to schedule
5. `[project]/S02-platform-strategy/outputs/[campaign]-PSF.yaml` — platform timing data
6. `[project]/S07-campaign-brief/outputs/[campaign]-CBF.yaml` — campaign calendar

**Execution without reading = automatic FAIL**

---

## STRUCTURAL FIX 5: PER-MICROSKILL OUTPUT PROTOCOL

**Every microskill produces its own file. No exceptions.**

**Layer 1 Required Files (5 files):**
```
1.1-platform-timing.yaml
1.2-content-type-timing.yaml
1.3-cascade-sequences.yaml
1.4-momentum-rules.yaml
1.5-calendar-integration.yaml
```

**If a microskill is marked "complete" but its output file doesn't exist → it didn't happen.**

---

## STRUCTURAL FIX 6: MINIMUM THRESHOLDS

**SCF cannot be marked COMPLETE unless:**

| Element | Minimum | Actual | Verified |
|---------|---------|--------|----------|
| Content pieces scheduled | All from S14 | ___ | ☐ |
| Posts with optimal timing | 100% | ___ | ☐ |
| Cascade sequences defined | 1 | ___ | ☐ |
| Engagement windows defined | All posts | ___ | ☐ |
| Calendar events integrated | All relevant | ___ | ☐ |
| Momentum rules documented | 1 | ___ | ☐ |

**If any minimum not met → status = INCOMPLETE, NOT "conditional pass" or "partial pass"**

---

## STRUCTURAL FIX 7: PROJECT INFRASTRUCTURE REQUIREMENTS

**Before ANY S15 execution, these MUST exist:**

```
[project]/S15-scheduling-choreography/
├── PROJECT-STATE.md (tracks current phase, blockers, decisions)
├── PROGRESS-LOG.md (timestamped log of all actions)
├── checkpoints/ (LAYER_0_COMPLETE.yaml, LAYER_1_COMPLETE.yaml)
└── outputs/ (final SCF.yaml destination)
```

**Missing infrastructure = execution cannot proceed**

---

## STRUCTURAL FIX 8: STALE ARTIFACT CLEANUP

**Before starting Layer 1, DELETE these if they exist from previous failed attempts:**

```
[project]/S15-scheduling-choreography/outputs/[campaign]-SCF.yaml
[project]/S15-scheduling-choreography/checkpoints/LAYER_0_COMPLETE.yaml
[project]/S15-scheduling-choreography/checkpoints/LAYER_1_COMPLETE.yaml
```

**Stale checkpoints create false progression signals.**

---

## Per-Microskill Output Requirements

| Microskill | Output File | Minimum Content | Verified |
|------------|-------------|-----------------|----------|
| 1.1 | platform-timing.yaml | Platform optimal windows for all platforms in campaign | ☐ |
| 1.2 | content-type-timing.yaml | Content function-to-time mapping for all 4 functions | ☐ |
| 1.3 | cascade-sequences.yaml | 1+ cascade with defined steps and delays | ☐ |
| 1.4 | momentum-rules.yaml | Viral threshold + response sequences | ☐ |
| 1.5 | calendar-integration.yaml | All relevant holidays/events with content adjustments | ☐ |
| 4.1 | [campaign]-SCF.yaml | Complete SCF with all sections | ☐ |
| 4.2 | execution-log.md | Timestamped decisions and rationale | ☐ |

---

*Degradation is prevented through structure, not instructions.*
