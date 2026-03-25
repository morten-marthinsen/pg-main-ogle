---
name: btf-section-copy-and-design-writer
description: >-
  Write ALL below-the-fold (BTF) section copy AND design notes for every section that
  PDP-04 sequenced. This is the LARGEST and MOST CRITICAL PDP writing skill — unified
  copy + design for 16+ BTF section types. Every section output includes: copy (scan-
  optimized, standalone, proof-required), design notes (layout, mobile, visuals), and
  feature name enforcement from PDP-02. Loads long-form crossover patterns from VSL
  skills (13-16, 18) for section-matched content. Arena: generative_full_draft with
  audience evaluation — 7 competitors generate ALL BTF sections as a package, audience
  agents evaluate the full simulated page scroll experience. Replaces LP-07 Type B
  path + portions of LP-09, LP-10, LP-11. Does NOT handle: Reviews (PDP-05), FAQ
  (LP-12), UGC Videos (PDP-05). Trigger when PDP section sequence is complete.
---

# PDP-07 — BTF Section Writer (Copy + Design Unified)

**Pipeline Position:** After PDP-01 (Strategy), PDP-02 (Feature Naming), PDP-03 (Hero), PDP-04 (Section Sequence). Parallel with PDP-05, PDP-06, LP-08, LP-09, LP-12, LP-13. Feeds PDP-08 (Micro-Scripts), LP-15 (Assembly), PDP-17 (Editorial), PDP-16 (Audit).

---

## PURPOSE

Write ALL PDP below-fold section copy AND design specifications across 16+ section types. Every section is self-contained, scan-optimized, proof-dense, and includes actionable design notes for the page builder. Copy and design are generated together — not separately.

**Success Criteria:**
- All BTF sections from PDP-04 sequence written with type-specific formatting
- Each section includes: copy + design notes (layout, mobile behavior, visual elements)
- Each section passes standalone test (works if read in isolation)
- Each section has at least 1 proof element (not optional)
- All PDP-02 feature names used exactly (zero paraphrasing)
- Long-form crossover patterns loaded and adapted (condensed, not pasted) from Skills 13-16, 18
- Arena: generative_full_draft with 7 competitors + audience evaluation (2 rounds mandatory)
- pdp-btf-sections.json + section-copy-assembled.md produced

---

## REFERENCE FILES

- `PDP-07-AGENT.md` — Complete orchestration specification
- `PDP-07-ANTI-DEGRADATION.md` — Quality enforcement rules
- `PDP-07-ARENA-LAYER.md` — Section copy arena criteria (scan optimization, section independence, proof density, feature consistency, word budget, design note quality, crossover pattern usage)
- `04-page-builder/PDP-ENGINE.md` — 10 PDP Laws, 6 Degradation Patterns, NLS 19-Section Framework, Long-Form Crossover Map
- `04-page-builder/reference/PDP-BEST-PRACTICES-REFERENCE.md` — BTF section templates
- `04-page-builder/reference/design-tokens-reference.md` — Design tokens (loaded during copy generation)
- `04-page-builder/reference/component-pattern-library.md` — Component templates for design notes
- `specimens/section-copy/section-type-specimens.md` — NLS + real product section specimens

---

## UPSTREAM DEPENDENCIES

- `PDP-02 feature-package.json` — Feature names, hierarchy, micro-scripts (LOCKED — use exactly)
- `PDP-04 section-sequence.json` — Section order, word budgets, section types
- `PDP-01 ecomm-strategy.yaml` — Strategic context, section priority
- `PDP-03 pdp-above-fold-blueprint.json` — Hero context for feature threading

---

## LONG-FORM CROSSOVER PATTERNS

| Section Type | Long-Form Skill | What to Adapt |
|-------------|----------------|--------------|
| Problem/Solution | Skill 13 (Root Cause) | Condense root cause narrative into scan-optimized section |
| Why It Works / Mechanism | Skill 14 (Mechanism) | Simplify mechanism to 3-5 step visual flow |
| Product Highlights | Skill 15 (Product Intro) | Extract feature highlights, caveman-benefit format |
| Offer/Pricing | Skill 16 (Offer Copy) | Value stack → scan-optimized price display |
| Reviews / Social Proof | Skill 18 (Proof Weaving) | Proof cascade → structured review section |

**Crossover Rule:** Adapt, don't paste. Long-form patterns must be CONDENSED for ecom scan behavior. A 500-word root cause narrative becomes a 150-word problem/solution section.

---

## OUTPUT

**Primary:** `pdp-btf-sections.json` + `section-copy-assembled.md` + `PDP-BTF-SECTIONS-SUMMARY.md`
**Location:** `~outputs/[project-name]/landing-page/PDP-07-btf-section-writer/`
