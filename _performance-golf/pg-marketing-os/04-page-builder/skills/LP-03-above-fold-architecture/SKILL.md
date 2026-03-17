---
name: above-fold-architecture
description: >-
  Engineer the critical first screen — the above-fold section that 70-80% of
  visitors use to decide stay vs. leave within 5 seconds. For Type A: determines
  headline territory, deck copy direction, hero image strategy, trust signal
  selection. For Type B: determines product title, rating strip, hero image, price
  display, ATC button, trust badges. Must answer three questions: What is this?
  Who is this for? Why should I care right now? Trigger when page brief and
  intelligence are ready and you need to architect the above-fold experience.
---

# LP-03 — Above-Fold Architecture

**Pipeline Position:** After LP-00 (Brief), LP-01 (Intelligence). Feeds LP-04, LP-05, LP-06, LP-07, LP-14, LP-15, LP-17.

---

## PURPOSE

Engineer the most conversion-critical real estate on the page — the above-fold section. This is the 5-second decision point. Architecture differs fundamentally between Type A (story-driven) and Type B (scan-optimized).

**Success Criteria:**
- Three questions answered: What is this? Who is this for? Why should I care?
- Type-appropriate component architecture defined (headline territory, hero strategy, trust signals)
- Visual density and proof density targets set for above-fold
- above-fold-blueprint.json produced with component specs

---

## REFERENCE FILES

- `LP-03-AGENT.md` — Complete orchestration specification
- `LP-03-ANTI-DEGRADATION.md` — Quality enforcement rules
- `04-page-builder/LANDING-PAGE-ENGINE.md` — Engine-level constraints
- `04-page-builder/landing-page-engine-master-blueprint.md` — Section flows and Type A/B templates
- `04-page-builder/reference/visual-hierarchy.md` — 5 above-fold patterns
- `04-page-builder/reference/design-principles.md` — 10 conversion design principles

---

## OUTPUT

**Primary:** `above-fold-blueprint.json`
**Location:** `~outputs/[project-name]/landing-page/LP-03-above-fold-architecture/`
