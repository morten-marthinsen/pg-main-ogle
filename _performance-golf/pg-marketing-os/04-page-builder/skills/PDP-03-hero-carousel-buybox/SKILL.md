---
name: hero-carousel-buybox-architect
description: >-
  Engineer the PDP above-fold experience — the hero carousel, facts panel, and buy
  box constituting 80% of the PDP conversion decision. Fundamentally different from
  LP-03 because PDP above-fold is an interactive purchasing system, not a reading
  experience. Three components: (1) Hero Carousel — 10-thumbnail story following NLS
  persuasion arc; (2) Facts Panel — nutrition/supplement facts + quality icons;
  (3) Buy Box — title, rating, price, variants, subscription, quantity, ATC, express
  payments, micro-trust signals. Trigger when LP-00 classifies page as Type B or
  Hybrid and you need PDP above-fold architecture.
---

# PDP-03 — Hero Carousel + Buy Box Architect

**Pipeline Position:** After LP-00 (Brief), LP-01 (Intelligence). Replaces LP-03 for Type B/Hybrid. Feeds PDP-04, PDP-05, PDP-06, LP-15, PDP-16.

---

## PURPOSE

Engineer the PDP above-fold as an interactive purchasing system. The carousel tells a 10-image product story; the buy box handles the transaction; the facts panel provides at-a-glance credibility. Above-fold is 80% of the PDP conversion decision.

**Success Criteria:**
- 10-thumbnail carousel architecture designed with NLS persuasion arc
- Buy box components specified (title, rating, price, variants, subscription, ATC)
- Facts panel structure defined
- pdp-above-fold-blueprint.json produced with all three component architectures

---

## REFERENCE FILES

- `PDP-03-AGENT.md` — Complete orchestration specification
- `PDP-03-ANTI-DEGRADATION.md` — Quality enforcement rules
- `04-page-builder/PDP-ENGINE.md` — PDP Laws and routing
- `04-page-builder/LANDING-PAGE-ENGINE.md` — Universal LP Laws
- `04-page-builder/reference/PDP-BEST-PRACTICES-REFERENCE.md` — 10-Thumbnail Story Architecture, Baymard findings

---

## OUTPUT

**Primary:** `pdp-above-fold-blueprint.json` + `PDP-ABOVE-FOLD-SUMMARY.md`
**Location:** `~outputs/[project-name]/landing-page/PDP-03-hero-carousel-buybox/`
