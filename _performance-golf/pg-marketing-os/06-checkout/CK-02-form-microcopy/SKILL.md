---
name: form-microcopy-writer
description: >-
  Write all checkout form micro-copy: field labels, helper text, error
  messages, progress indicators, and order summary copy. Error messages
  are copy — a bad error message creates abandonment, a good one keeps
  momentum. Includes order bump integration point bridging to U1
  constraints (50-150 words, 3 elements). No Arena (too short for
  competitive generation). Trigger when users mention checkout form copy,
  error messages, field labels, order summary copy, or checkout micro-copy.
  Requires CK-00 (Checkout Strategy).
---

# CK-02 — Form & Micro-Copy Writer

**Pipeline Position:** Third skill in Checkout Engine pipeline. Executes after CK-00 (Strategist). Feeds CK-03 (Editorial).

---

## PURPOSE

Write all checkout form micro-copy: field labels (mobile-first), helper text, error messages (guidance, not blame), progress indicators, and order summary copy. Includes the order bump integration point — the ONLY persuasion moment on checkout — bridging to U1 constraints (50-150 words, 3 elements: what it is, why now, price).

**Success Criteria:**
- Every field has a label, helper text (where needed), and error message
- Error messages guide ("Please enter your 5-digit zip code") not blame ("Invalid input")
- Inline validation specified (validate on blur, not on submit)
- Common format tolerance noted (spaces in card numbers, dashes in phone)
- Order summary copy written (product name, description, price, savings, total)
- Order bump integration point specified with U1 constraints
- Progress indicators for multi-step checkouts (1-2 word step labels)
- Mobile behavior specified for all form elements

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + strategy review + checkout flow map | TBD (v2) |
| 1 | Field label + helper text + error message writing | TBD (v2) |
| 2 | Order summary copy + order bump integration + progress indicators | TBD (v2) |
| 4 | Output packaging | TBD (v2) |

---

## REFERENCE FILES

v1 scaffold — full execution specs will be built in subsequent iterations:
- `CK-02-AGENT.md` — Complete orchestration specification (planned)
- `CK-02-ANTI-DEGRADATION.md` — Quality enforcement rules (planned)
- `06-checkout/CHECKOUT-ENGINE.md` — Engine-level constraints and 5 Laws

---

## OUTPUT

**Primary:** `checkout-microcopy-package.json`
**Location:** `~outputs/[project-code]/checkout/checkout-copy/`
