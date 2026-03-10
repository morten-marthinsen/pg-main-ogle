---
name: checkout-editorial
description: >-
  Review the complete checkout flow for friction, trust signal density,
  and mobile optimization. Performs a friction audit (every word is
  friction — can any be cut?), trust density check (3+ signals visible
  at all times), error message quality review, and mobile-first audit
  (70%+ checkouts on mobile). No Arena. Trigger when users mention
  checkout review, checkout quality check, checkout friction audit, or
  checkout mobile optimization. Requires CK-01 and CK-02 outputs.
---

# CK-03 — Checkout Editorial

**Pipeline Position:** Final skill in Checkout Engine pipeline. Executes after CK-01 (Trust & Security) and CK-02 (Form & Micro-Copy). Produces the final checkout copy deliverable.

---

## PURPOSE

Review the complete checkout flow copy. Performs a friction audit (every word is friction — if you can cut a word without losing meaning, cut it), trust signal density check, error message quality review, and mobile-first audit. Produces the final checkout copy and an audit report documenting findings.

**Success Criteria:**
- Friction audit complete — no unnecessary words remain
- Trust density verified — 3+ trust signals visible at every scroll position
- Error messages all guide, never blame
- Mobile-first audit complete — every element has mobile behavior specified
- No persuasion language on checkout (trust only, except order bump)
- Order bump follows U1 constraints (50-150 words, 3 elements)
- Checkout copy is the shortest in the entire funnel

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + all checkout copy elements | TBD (v2) |
| 1 | Friction audit + word reduction pass | TBD (v2) |
| 2 | Trust density check + error message review + mobile audit | TBD (v2) |
| 4 | Final output packaging + audit report | TBD (v2) |

---

## REFERENCE FILES

v1 scaffold — full execution specs will be built in subsequent iterations:
- `CK-03-AGENT.md` — Complete orchestration specification (planned)
- `CK-03-ANTI-DEGRADATION.md` — Quality enforcement rules (planned)
- `06-checkout/CHECKOUT-ENGINE.md` — Engine-level constraints and 5 Laws

---

## OUTPUT

**Primary:** `checkout-copy-final.md` + `checkout-audit-report.md`
**Location:** `~outputs/[project-code]/checkout/`
