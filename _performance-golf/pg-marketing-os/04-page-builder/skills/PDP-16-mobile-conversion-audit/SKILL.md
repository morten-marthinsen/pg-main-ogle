---
name: pdp-mobile-conversion-audit
description: >-
  Audit fully assembled PDP page against Baymard Institute best practices across
  8 mobile UX/conversion dimensions. For PDP, mobile UX and conversion are
  INSEPARABLE. Bad carousel kills conversion. Dropdown variants kill conversion.
  Missing sticky ATC kills conversion. Replaces LP-16 + LP-17 for PDP (neither
  knows about carousel thumbnails, buy box chips, review histograms, sticky ATC
  triggers). Audits 8 Baymard sections: Image Gallery, Buy Box, Product Information,
  BTF Sections, Social Proof, Navigation/Sticky Elements, Mobile Performance,
  Conversion Flow. This is the final PDP quality gate.
---

# PDP-16 — PDP Mobile + Conversion Audit

**Pipeline Position:** Final PDP quality gate. After LP-15 (Assembly), PDP-03 through PDP-07. Replaces LP-16 + LP-17 for Type B.

---

## PURPOSE

Audit the assembled PDP against 8 Baymard Institute mobile UX/conversion dimensions. Every PDP-specific interaction pattern (carousel swipe, variant chips, sticky ATC, review filtering) is scored and validated.

**Success Criteria:**
- 8 Baymard dimensions scored with evidence-based ratings
- PDP-specific patterns audited (carousel, buy box, review system, sticky ATC)
- Every FAIL item has specific fix with expected mobile conversion impact
- Overall verdict produced (launch-ready / needs optimization / structural rebuild)
- pdp-audit-report.json produced with full Baymard checklist and verdict

---

## REFERENCE FILES

- `PDP-16-AGENT.md` — Complete orchestration specification
- `PDP-16-ANTI-DEGRADATION.md` — Quality enforcement rules
- `04-page-builder/PDP-ENGINE.md` — PDP Laws
- `04-page-builder/LANDING-PAGE-ENGINE.md` — Universal LP Laws
- `04-page-builder/reference/PDP-BEST-PRACTICES-REFERENCE.md` — Full Baymard checklist
- `04-page-builder/conversion-data-reference.md` — PDP-specific mobile benchmarks

---

## OUTPUT

**Primary:** `pdp-audit-report.json` + `PDP-AUDIT-SUMMARY.md`
**Location:** `~outputs/[project-name]/landing-page/PDP-16-mobile-conversion-audit/`
