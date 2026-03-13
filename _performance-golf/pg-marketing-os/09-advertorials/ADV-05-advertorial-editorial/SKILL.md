---
name: advertorial-editorial
description: >-
  Quality review and editorial polish for assembled advertorials. The
  primary test is the "editorial smell" test — does the advertorial read
  like genuine content or does it smell like an ad? Reviews editorial
  voice, proof weaving, bridge naturalness, and platform compliance.
  Arena mode: editorial_revision. Trigger when users mention advertorial
  review, advertorial quality check, or editorial polish for advertorials.
  Requires ADV-04 (Assembled Advertorial).
---

# ADV-05 — Advertorial Editorial

**Pipeline Position:** Final skill in Advertorial Engine pipeline. Executes after ADV-04 (Assembly). Produces the final advertorial deliverable.

---

## PURPOSE

Perform quality review and editorial polish on the assembled advertorial. The primary evaluation is the "editorial smell" test: does this read like genuine editorial content, or does it smell like advertising? Reviews editorial voice consistency, proof weaving quality, bridge naturalness, and platform compliance.

**Success Criteria:**
- Passes the "editorial smell" test — reads like content, not an ad
- Hook strength validated (scroll-stop quality maintained)
- Proof woven naturally throughout — no proof blocks
- Bridge transition feels earned and natural
- Platform compliance confirmed (no flagged claims)
- Word count within type specification bounds
- Voice and tone consistent throughout

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + assembled advertorial review | TBD (v2) |
| 1 | Editorial smell test + voice consistency audit | TBD (v2) |
| 2 | Proof weaving quality + bridge naturalness review | TBD (v2) |
| 3 | Arena: editorial_revision (editorial candidates compete) | TBD (v2) |
| 4 | Final output packaging | TBD (v2) |

---

## REFERENCE FILES

v1 scaffold — full execution specs will be built in subsequent iterations:
- `ADV-05-AGENT.md` — Complete orchestration specification (planned)
- `ADV-05-ANTI-DEGRADATION.md` — Quality enforcement rules (planned)
- `09-advertorials/ADVERTORIAL-ENGINE.md` — Engine-level constraints and 5 Laws

---

## OUTPUT

**Primary:** `advertorial-final.md`
**Location:** `~outputs/[project-code]/advertorial/`
