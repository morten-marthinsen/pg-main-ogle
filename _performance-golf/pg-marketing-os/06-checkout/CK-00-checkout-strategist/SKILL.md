---
name: checkout-strategist
description: >-
  Analyze funnel type and map the complete checkout flow. Identify friction
  points, plan trust architecture, define payment options, and structure
  the order summary. Determines checkout pattern (single-page, multi-step,
  funnel-specific) and maps the order bump integration point for the
  Upsell Engine (U1). This skill does NOT write copy — it produces the
  strategic blueprint that CK-01 and CK-02 execute against. Trigger when
  users mention checkout strategy, checkout flow planning, or checkout
  optimization. Requires Campaign Brief (Skill 09) and Offer Package
  (Skill 07).
---

# CK-00 — Checkout Strategist

**Pipeline Position:** First skill in Checkout Engine pipeline. Executes after Skill 09 (Campaign Brief) and Skill 07 (Offer Package). Feeds CK-01 (Trust & Security), CK-02 (Form & Micro-Copy), and U1 (Order Bump — Upsell Engine).

---

## PURPOSE

Analyze the funnel type and map the complete checkout flow. Identify friction points, plan trust architecture (which trust signals appear where), define payment options, and structure the order summary. Determines the checkout pattern and maps the order bump integration point for the Upsell Engine.

**This skill does NOT write copy.** It produces the strategic blueprint that CK-01 and CK-02 execute against.

**Success Criteria:**
- Checkout pattern selected (single-page, multi-step, funnel-specific) with rationale
- Trust architecture planned (minimum 3 trust signals visible at all times)
- Payment options defined (card types, PayPal, Apple Pay, etc.)
- Order summary structure defined (product, description, price, savings, total)
- Order bump placement spec produced for U1 (Upsell Engine)
- Friction points identified with mitigation strategies
- Mobile behavior specified for every element

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + brief parsing + offer package review | TBD (v2) |
| 1 | Checkout pattern selection + flow mapping | TBD (v2) |
| 2 | Trust architecture + friction analysis + mobile specs | TBD (v2) |
| 4 | Strategy validation + output packaging | TBD (v2) |

---

## REFERENCE FILES

v1 scaffold — full execution specs will be built in subsequent iterations:
- `CK-00-AGENT.md` — Complete orchestration specification (planned)
- `CK-00-ANTI-DEGRADATION.md` — Quality enforcement rules (planned)
- `06-checkout/CHECKOUT-ENGINE.md` — Engine-level constraints and 5 Laws

---

## OUTPUT

**Primary:** `checkout-strategy.yaml`
**Location:** `~outputs/[project-code]/checkout/`
