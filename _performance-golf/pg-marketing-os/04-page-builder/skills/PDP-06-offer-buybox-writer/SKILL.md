---
name: offer-buybox-writer
description: >-
  Write actual copy for every buy box component that PDP-03 architected as
  blueprints. PDP-03 is the architect (blueprint); PDP-06 is the copywriter
  (words). Replaces three LP skills for Type B/Hybrid: LP-06 (architecture),
  LP-11 (pricing copy), LP-14 (CTA copy). Writes price displays, variant labels,
  subscription tiles, ATC button states, micro-trust signals, mini-cart elements.
  Every copy must be specific, benefit-forward, free of generic AI language.
  Trigger when PDP above-fold blueprint is complete and you need buy box copy.
---

# PDP-06 — Offer/Buy Box Writer

**Pipeline Position:** After LP-00 (Brief), PDP-03 (Above-Fold Blueprint). Replaces LP-06 + LP-11 + LP-14 for Type B. Feeds LP-15, PDP-16.

---

## PURPOSE

Write the copy for every buy box component — the interactive purchasing UI that handles the transaction. Price displays, variant labels, subscription savings, ATC button states, and micro-trust signals.

**Success Criteria:**
- Price display copy written with value anchoring and savings callouts
- Variant labels written with benefit-forward naming
- Subscription tile copy with savings framing
- ATC button states (default, hover, loading, success) copywritten
- Micro-trust signals written (shipping, returns, guarantee badges)
- pdp-offer-buy-box.json produced with all buy box copy

---

## REFERENCE FILES

- `PDP-06-AGENT.md` — Complete orchestration specification
- `PDP-06-ANTI-DEGRADATION.md` — Quality enforcement rules
- `04-page-builder/PDP-ENGINE.md` — PDP Laws
- `04-page-builder/reference/PDP-BEST-PRACTICES-REFERENCE.md` — Buy box best practices

---

## OUTPUT

**Primary:** `pdp-offer-buy-box.json` + `PDP-OFFER-BUYBOX-SUMMARY.md`
**Location:** `~outputs/[project-name]/landing-page/PDP-06-offer-buybox-writer/`
