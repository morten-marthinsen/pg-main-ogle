---
name: pdp-ecomm-editorial
description: >-
  Quality review and editorial polish for assembled e-commerce copy.
  Primary tests: scan-optimization check (ecom is scanned not read),
  feature naming consistency, micro-script quality, proof density per
  section, and design note completeness. Arena mode: editorial_revision.
  Trigger when users mention ecom editorial review, product page quality
  check, or ecom copy polish. Requires LP-15 (Assembled E-Comm Copy).
---

# PDP-17 — E-Comm Editorial

**Pipeline Position:** Final skill in E-Commerce Copy Engine pipeline. Executes after LP-15 (Assembly). Produces the final e-commerce copy deliverable.

---

## PURPOSE

Perform quality review and editorial polish on the assembled e-commerce copy. The primary evaluation is scan-optimization: does every section work when scanned in 3-5 seconds? Reviews feature naming consistency, micro-script quality, proof density per section, and design note completeness.

**Success Criteria:**
- Every section passes the scan test (scannable in 3-5 seconds, standalone meaning)
- Feature names consistent across all sections and micro-scripts
- Proof density: at least one proof element per section
- No long-form narrative bleed (no flowing paragraphs, no cross-section dependencies)
- Design notes complete and actionable for page builder
- Micro-scripts quality checked (duration, feature consistency, section mapping)
- Hero section effectively stops the scroll

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + assembled copy review | TBD (v2) |
| 1 | Scan-optimization audit + standalone section test | TBD (v2) |
| 2 | Feature consistency + proof density + design note completeness | TBD (v2) |
| 3 | Arena: editorial_revision (editorial candidates compete) | TBD (v2) |
| 4 | Final output packaging | TBD (v2) |

---

## REFERENCE FILES

v1 scaffold — full execution specs will be built in subsequent iterations:
- `PDP-17-AGENT.md` — Complete orchestration specification (planned)
- `PDP-17-ANTI-DEGRADATION.md` — Quality enforcement rules (planned)
- `04-page-builder/PDP-ENGINE.md` — Engine-level constraints and 5 Laws

---

## OUTPUT

**Primary:** `ecomm-copy-final.md`
**Location:** `~outputs/[project-code]/e-comm/`
