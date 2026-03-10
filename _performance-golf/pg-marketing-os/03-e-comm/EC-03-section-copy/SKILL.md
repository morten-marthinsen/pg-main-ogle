---
name: section-copy-writer
description: >-
  Write all below-the-fold page sections from the EC-00 strategy map:
  problem/agitation, mechanism/technology, what-to-expect timeline,
  ingredients, comparison chart, cost savings, expert credibility, use
  cases, offer/pricing, guarantee, FAQ, and more. Each section must work
  standalone (ecom is scanned, not read). Loads crossover patterns from
  long-form skills (13, 14, 15, 16, 18). Arena mode: generative_full_draft
  per major section. Trigger when users mention ecom section copy, PDP
  sections, product page body copy, or BTF copy. Requires EC-00 (Strategy)
  and EC-01 (Feature Package).
---

# EC-03 — Section Copy Writer

**Pipeline Position:** Fourth skill in E-Commerce Copy Engine pipeline. Executes after EC-00 (Strategist) and EC-01 (Feature Naming). Feeds EC-05 (Assembly).

---

## PURPOSE

Write all below-the-fold (BTF) page sections based on the section map from EC-00. Iterates per section, producing standalone copy for each. Every section must work independently — if a reader lands on any section without context, they should understand what the product does and why they should care.

Loads crossover patterns from long-form VSL skills where applicable:
- Skill 13 (Root Cause Narrative) → Problem/agitation sections
- Skill 14 (Mechanism Narrative) → Technology/how-it-works sections
- Skill 15 (Product Introduction) → Product highlights, features
- Skill 16 (Offer Copy) → Offer/pricing/value stack sections
- Skill 18 (Proof Weaving) → UGC, reviews, social proof sections

**Success Criteria:**
- Every section from EC-00 strategy map has copy written
- Each section passes the standalone test (shuffle sections — each still makes sense)
- At least one proof element per section (review, UGC, stat, award, before/after)
- Feature names from EC-01 used consistently across sections
- Word budgets from EC-00 respected
- Design/UX notes included per section for page builder handoff

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + strategy map + feature package + crossover patterns | TBD (v2) |
| 1 | Section drafting (iterate per section from strategy map) | TBD (v2) |
| 2 | Proof embedding + standalone validation per section | TBD (v2) |
| 3 | Arena: generative_full_draft per major section | TBD (v2) |
| 4 | Selection + output packaging | TBD (v2) |

---

## REFERENCE FILES

v1 scaffold — full execution specs will be built in subsequent iterations:
- `EC-03-AGENT.md` — Complete orchestration specification (planned)
- `EC-03-ANTI-DEGRADATION.md` — Quality enforcement rules (planned)
- `03-e-comm/E-COMM-ENGINE.md` — Engine-level constraints and 5 Laws
- `~brain/nls-pdp-best-practices.md` — NLS PDP section framework

---

## OUTPUT

**Primary:** `section-copy-package.json` + `section-copy-assembled.md`
**Location:** `~outputs/[project-code]/e-comm/ecomm-copy/`
