---
name: advertorial-body-copy-writer
description: >-
  Write the main body of an advertorial using type-specific structure
  (listicle, native, blog, review, PAS, sponsored, or editorial). Body
  copy must read as editorial content with proof woven into narrative —
  not stacked in blocks. Enforces the "editorial smell" test throughout.
  Arena mode: generative_full_draft. Trigger when users mention
  advertorial body copy, advertorial main content, or native ad content
  writing. Requires ADV-00 (Strategy) and ADV-01 (Hook & Lead).
---

# ADV-02 — Body Copy Writer

**Pipeline Position:** Third skill in Advertorial Engine pipeline. Executes after ADV-00 (Strategist) and alongside ADV-01. Feeds ADV-04 (Assembly).

---

## PURPOSE

Write the main body of the advertorial following the type-specific structure defined by ADV-00. The body must read as genuine editorial content — story, problem, mechanism, and social proof woven into narrative. If the body reads like marketing copy, the advertorial fails.

**Success Criteria:**
- Body follows type-specific structure (listicle, native, blog, review, PAS, sponsored, editorial)
- Proof is woven into narrative — no proof blocks or testimonial stacks
- Maximum 1 proof element per paragraph
- Editorial voice maintained throughout (remove product name test: does it still read like an article?)
- Word count matches type specification from ADV-00 strategy

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + strategy parsing + type structure loading | TBD (v2) |
| 1 | Body section drafting (type-specific structure) | TBD (v2) |
| 2 | Proof weaving + editorial voice enforcement | TBD (v2) |
| 3 | Arena: generative_full_draft (body candidates compete) | TBD (v2) |
| 4 | Selection + output packaging | TBD (v2) |

---

## REFERENCE FILES

v1 scaffold — full execution specs will be built in subsequent iterations:
- `ADV-02-AGENT.md` — Complete orchestration specification (planned)
- `ADV-02-ANTI-DEGRADATION.md` — Quality enforcement rules (planned)
- `09-advertorials/ADVERTORIAL-ENGINE.md` — Engine-level constraints and 5 Laws

---

## OUTPUT

**Primary:** `advertorial-body-draft.md`
**Location:** `~outputs/[project-code]/advertorial/advertorial-copy/`
