---
name: trust-security-copy
description: >-
  Write trust badges, security language, guarantee copy, and risk reversal
  micro-copy for checkout pages. Trust signals prevent abandonment more
  than good copy — the buyer has already decided, your job is to not lose
  them. Enforces minimum trust density (3+ signals visible at all times).
  No Arena (too short for competitive generation). Trigger when users
  mention checkout trust copy, security badges, guarantee copy, or risk
  reversal language. Requires CK-00 (Checkout Strategy).
---

# CK-01 — Trust & Security Copy

**Pipeline Position:** Second skill in Checkout Engine pipeline. Executes after CK-00 (Strategist). Feeds CK-03 (Editorial).

---

## PURPOSE

Write all trust and security copy elements for the checkout page: trust badges, security language, guarantee copy, and risk reversal micro-copy. On checkout, trust signals prevent abandonment more than persuasive copy — the buyer has already decided. Your job is to prevent anxiety, not create desire.

**Success Criteria:**
- Minimum 3 trust signals always visible without scrolling
- Security copy present (SSL, encryption, lock icon language)
- All accepted payment methods displayed with copy
- Guarantee copy written (matches or extends front-end guarantee)
- Contact/support option visible ("Questions? Call...")
- Social proof element present ("Join XX,XXX+ customers")
- Mobile behavior specified for every trust element

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + strategy review + guarantee details | TBD (v2) |
| 1 | Trust signal copy per category (security, payment, guarantee, social proof, contact) | TBD (v2) |
| 2 | Trust density validation + mobile placement specs | TBD (v2) |
| 4 | Output packaging | TBD (v2) |

---

## REFERENCE FILES

v1 scaffold — full execution specs will be built in subsequent iterations:
- `CK-01-AGENT.md` — Complete orchestration specification (planned)
- `CK-01-ANTI-DEGRADATION.md` — Quality enforcement rules (planned)
- `06-checkout/CHECKOUT-ENGINE.md` — Engine-level constraints and 5 Laws

---

## OUTPUT

**Primary:** `trust-copy-package.json`
**Location:** `~outputs/[project-code]/checkout/checkout-copy/`
