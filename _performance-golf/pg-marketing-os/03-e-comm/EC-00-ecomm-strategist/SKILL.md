---
name: ecomm-strategist
description: >-
  Analyze product and determine page type (PDP, collection, bundle),
  map section architecture using the NLS PDP framework (19 section types),
  and identify which sections apply to this product. Sets word budgets
  and section priority. Operates in Mode A (downstream from Skills 01-09
  with full context) or Mode B (standalone brief). This skill does NOT
  write copy — it produces the strategic blueprint that EC-01 through
  EC-04 execute against. Trigger when users mention e-commerce strategy,
  PDP planning, product page architecture, or section mapping. Requires
  Campaign Brief (Skill 09) or standalone product brief.
---

# EC-00 — E-Comm Strategist

**Pipeline Position:** First skill in E-Commerce Copy Engine pipeline. Executes after Skill 09 (Campaign Brief) or from standalone brief. Feeds EC-01 (Feature Naming), EC-02 (Hero & Value Prop), EC-03 (Section Copy), EC-04 (Micro-Scripts).

---

## PURPOSE

Analyze the product and determine the page type (PDP, collection page, bundle page), then map the section architecture using the NLS PDP framework. Identifies which of the 19 section types apply to this product, sets word budgets per section, and defines section priority order.

**This skill does NOT write copy.** It produces the strategic blueprint that EC-01 through EC-04 execute against.

**Success Criteria:**
- Page type determined (PDP, collection, bundle) with rationale
- Section map produced — which of the 19 NLS sections apply to this product
- Section priority ranked (which sections are most critical for this product)
- Word budgets set per section
- Feature research scope defined for EC-01
- Cross-reference to long-form crossover skills identified (13, 14, 15, 16, 18)
- Design framework notes for page builder handoff

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + brief parsing + NLS framework loading | TBD (v2) |
| 1 | Page type determination + section mapping | TBD (v2) |
| 2 | Section priority + word budgets + feature scope | TBD (v2) |
| 4 | Strategy validation + output packaging | TBD (v2) |

---

## REFERENCE FILES

v1 scaffold — full execution specs will be built in subsequent iterations:
- `EC-00-AGENT.md` — Complete orchestration specification (planned)
- `EC-00-ANTI-DEGRADATION.md` — Quality enforcement rules (planned)
- `03-e-comm/E-COMM-ENGINE.md` — Engine-level constraints and 5 Laws
- `~brain/nls-pdp-best-practices.md` — NLS PDP framework (19 section types)

---

## OUTPUT

**Primary:** `ecomm-strategy.yaml` (section map + priority + word budgets)
**Location:** `~outputs/[project-code]/e-comm/`
