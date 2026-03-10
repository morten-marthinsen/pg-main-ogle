---
name: ecomm-assembly
description: >-
  Assemble all e-commerce copy sections with UX/design notes for page
  builder handoff. Performs cross-section consistency validation, feature
  thread verification, and includes section-by-section design spec notes
  per the PG sf2 pattern. No Arena — this is an assembly and validation
  skill. Produces the primary handoff to the Page Builder engine (LP-00).
  Trigger when users mention ecom assembly, assembling product page copy,
  or page builder handoff. Requires EC-01, EC-02, EC-03, and EC-04 outputs.
---

# EC-05 — E-Comm Assembly

**Pipeline Position:** Sixth skill in E-Commerce Copy Engine pipeline. Executes after EC-01 (Feature Naming), EC-02 (Hero & Value Prop), EC-03 (Section Copy), and EC-04 (Micro-Scripts). Feeds EC-06 (Editorial) and LP-00 (Page Builder).

---

## PURPOSE

Assemble all e-commerce copy sections into a complete page document with UX/design notes for page builder handoff. Validates cross-section consistency (feature name usage, proof density, voice), verifies the feature thread (hero feature carried through all sections), and includes section-by-section design spec notes.

**This skill does NOT generate new copy.** It assembles, validates, and prepares the handoff.

**Success Criteria:**
- All sections assembled in priority order from EC-00 strategy
- Feature names from EC-01 used consistently across all sections
- Cross-section voice consistency validated
- Every section has at least one proof element verified
- UX/design notes included per section (layout hints, image specs, mobile behavior)
- Micro-scripts mapped to correct sections
- Page builder handoff YAML produced with section specs

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + all section outputs | TBD (v2) |
| 1 | Assembly + cross-section validation + feature thread check | TBD (v2) |
| 2 | UX/design notes per section + micro-script mapping | TBD (v2) |
| 4 | Output packaging + page builder handoff YAML | TBD (v2) |

---

## REFERENCE FILES

v1 scaffold — full execution specs will be built in subsequent iterations:
- `EC-05-AGENT.md` — Complete orchestration specification (planned)
- `EC-05-ANTI-DEGRADATION.md` — Quality enforcement rules (planned)
- `03-e-comm/E-COMM-ENGINE.md` — Engine-level constraints and 5 Laws

---

## OUTPUT

**Primary:** `ecomm-copy-assembled.md` + `page-builder-handoff.yaml`
**Location:** `~outputs/[project-code]/e-comm/`
