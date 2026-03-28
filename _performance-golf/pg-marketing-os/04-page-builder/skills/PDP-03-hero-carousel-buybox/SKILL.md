---
name: hero-carousel-buybox-copy-and-design
description: >-
  Engineer AND write the PDP above-fold experience — unified copy + design for the
  hero carousel, facts panel, and buy box constituting 80% of the PDP conversion
  decision. This skill produces BOTH the architecture (layout, UX, component specs)
  AND the copy (headline, subhead, value prop, CTA, carousel copy, product highlights).
  Four components: (1) Hero Carousel — 10-thumbnail story following NLS persuasion arc
  with copy overlays; (2) Facts Panel — nutrition/supplement facts + quality icons;
  (3) Buy Box — title, rating, price, variants, subscription, quantity, ATC, express
  payments, micro-trust signals; (4) Hero Copy — headline, subhead, value prop, CTA,
  product highlights TLDR. Arena: generative_full_draft + audience evaluation.
  Trigger when LP-00 classifies page as Type B or Hybrid.
---

# PDP-03 — Hero Carousel + Buy Box (Copy + Design Unified)

**Pipeline Position:** After PDP-01 (Strategy), PDP-02 (Feature Naming), LP-00 (Brief), LP-01 (Intelligence). Replaces LP-03 for Type B/Hybrid. Feeds PDP-04, PDP-05, PDP-06, PDP-07, LP-15, PDP-16.

---

## PURPOSE

Engineer AND write the PDP above-fold as an interactive purchasing system with world-class copy. The carousel tells a 10-image product story with copy overlays; the buy box handles the transaction with persuasive copy; the facts panel provides at-a-glance credibility. Copy and design are generated together — not separately. Above-fold is 80% of the PDP conversion decision.

**Success Criteria:**
- 10-thumbnail carousel architecture designed with NLS persuasion arc + copy overlays per thumbnail
- Hero copy package: headline (5-12 words), subhead (10-20 words), value prop (15-30 words), CTA (3-5 words), product highlights TLDR (50-100 words)
- Buy box components specified with copy (title, rating, price, variants, subscription, ATC)
- Facts panel structure defined
- Arena: generative_full_draft with 7 competitors + audience evaluation (2 rounds mandatory)
- pdp-above-fold-blueprint.json produced with architecture + copy + design tokens

---

## REFERENCE FILES

- `PDP-03-AGENT.md` — Complete orchestration specification
- `PDP-03-ANTI-DEGRADATION.md` — Quality enforcement rules
- `PDP-03-ARENA-LAYER.md` — Hero copy arena criteria (scroll-stop power, value prop clarity, hero feature integration, word economy, carousel narrative, CTA strength, scan optimization)
- `04-page-builder/PDP-ENGINE.md` — PDP Laws, 10 Laws, 6 Degradation Patterns, feature naming architecture
- `04-page-builder/LANDING-PAGE-ENGINE.md` — Universal LP Laws
- `04-page-builder/reference/PDP-BEST-PRACTICES-REFERENCE.md` — 10-Thumbnail Story Architecture, Baymard findings
- `04-page-builder/reference/design-tokens-reference.md` — Design tokens for copy-in-context generation
- `04-page-builder/reference/component-pattern-library.md` — Hero + Buy Box HTML/CSS templates

---

## UPSTREAM DEPENDENCIES

- `PDP-02 feature-package.json` — Hero feature name, supporting features, micro-scripts (feature names are LOCKED — use exactly)
- `PDP-01 ecomm-strategy.yaml` — Section architecture, page type, word budgets
- `LP-00 page-brief.json` — Classification, audience, offer summary

---

## OUTPUT

**Primary:** `pdp-above-fold-blueprint.json` + `hero-copy-draft.md` + `PDP-ABOVE-FOLD-SUMMARY.md`
**Location:** `~outputs/[project-name]/landing-page/PDP-03-hero-carousel-buybox/`
