---
name: email-sequence-assembler
description: >-
  Assemble individually generated emails and selected subject lines into a complete,
  sequenced email campaign with timing, cross-email callbacks, P.S. strategy, and
  campaign-level validation. Use after E1 has written all emails and E2 has generated
  subject lines. Takes discrete pieces and builds the cohesive whole — placing emails
  in blueprint-specified order, matching subject lines, setting send timing, verifying
  body type variety, and adding cross-email narrative threading. Trigger when users
  mention assembling emails, building the sequence, campaign assembly, email sequencing,
  or compiling the campaign. Requires E0 blueprint, E1 drafts, and E2 subject lines.
---

# E3 — Email Sequence Assembler

**Pipeline Position:** After E1 (Email Writer) and E2 (Subject Lines). Before E4 (Editorial).

---

## PURPOSE

Assemble individually generated emails and selected subject lines into a complete, sequenced email campaign. Places emails in order, matches subject lines, sets timing, verifies body type variety, and adds cross-email narrative threading.

**Success Criteria:**
- All emails placed in blueprint-specified order
- Subject lines matched to correct emails
- Send timing set per blueprint
- Body type variety verified
- Cross-email callbacks and narrative threading added
- P.S. strategy applied

---

## LAYER ARCHITECTURE

| Layer | Task |
|-------|------|
| 0 | Input loading from E0, E1, E2 |
| 1 | Sequence ordering + timing + threading |
| 2 | Narrative threading + P.S. strategy |
| 3 | Campaign-level validation (C1-C5) |

---

## REFERENCE FILES

For full execution specs, microskill details, and anti-degradation protocols:
- `SEQUENCE-ASSEMBLER-AGENT.md` — Complete orchestration specification
- `SEQUENCE-ASSEMBLER-ANTI-DEGRADATION.md` — Quality enforcement rules

---

## OUTPUT

**Primary:** `assembled-sequence.yaml` + assembled email campaign
**Location:** `outputs/[project-code]/email/`
