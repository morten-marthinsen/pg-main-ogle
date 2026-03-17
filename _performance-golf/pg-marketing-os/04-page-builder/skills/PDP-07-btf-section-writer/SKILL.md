---
name: btf-section-writer
description: >-
  Write actual copy for every below-the-fold (BTF) section that PDP-04 sequenced.
  This is the LARGEST PDP skill handling all BTF content types — from Product
  Highlights tiles to comparison charts to ingredient cards to identity-matching
  grids. 16 PDP BTF section types each with own structure, formatting, and
  persuasion function. Replaces LP-07 Type B path + portions of LP-09, LP-10,
  LP-11 for Type B/Hybrid. Does NOT handle: Reviews (PDP-05), FAQ (LP-12), UGC
  Videos (PDP-05). Trigger when PDP section sequence is complete and you need all
  BTF section copy.
---

# PDP-07 — BTF Section Writer

**Pipeline Position:** After LP-00 (Brief), LP-01 (Intelligence), PDP-04 (Section Sequence). Feeds LP-15, PDP-16.

---

## PURPOSE

Write all PDP below-fold section copy across 16 section types. Each section is self-contained and optimized for hunt-and-peck scanning behavior.

**Success Criteria:**
- All BTF sections from PDP-04 sequence written with type-specific formatting
- Product Highlights tiles, comparison charts, ingredient cards, identity grids completed
- Each section passes standalone test (works if read in isolation)
- pdp-btf-sections.json produced with all section copy and formatting specs

---

## REFERENCE FILES

- `PDP-07-AGENT.md` — Complete orchestration specification
- `PDP-07-ANTI-DEGRADATION.md` — Quality enforcement rules
- `04-page-builder/PDP-ENGINE.md` — PDP Laws (scannability, hunt-and-peck)
- `04-page-builder/reference/PDP-BEST-PRACTICES-REFERENCE.md` — BTF section templates

---

## OUTPUT

**Primary:** `pdp-btf-sections.json` + `PDP-BTF-SECTIONS-SUMMARY.md`
**Location:** `~outputs/[project-name]/landing-page/PDP-07-btf-section-writer/`
