---
name: mobile-speed-audit
description: >-
  Review assembled landing page against mobile-first principles and page speed
  benchmarks. Identify every element hurting mobile UX — excessive text blocks, bad
  CTA placement, missing sticky bars, undersized touch targets, unoptimized media.
  Produces scored audit with specific actionable fixes ranked by conversion impact.
  Mobile is default: 60%+ of traffic arrives on mobile. A page great on desktop but
  broken on mobile loses the majority of visitors. Trigger when page assembly is
  complete and you need mobile UX validation before launch.
---

# LP-16 — Mobile/Speed Audit

**Pipeline Position:** After LP-15 (Page Assembly). Feeds LP-18.

---

## PURPOSE

Audit the assembled page against mobile-first principles. Every fix is ranked by expected conversion impact, producing a prioritized action list for mobile optimization.

**Success Criteria:**
- Mobile UX scored across 7 dimensions
- Every issue identified with specific actionable fix
- Fixes ranked by expected conversion impact
- mobile-audit.json produced with scored dimensions and prioritized fix list

---

## REFERENCE FILES

- `LP-16-AGENT.md` — Complete orchestration specification
- `LP-16-ANTI-DEGRADATION.md` — Quality enforcement rules
- `04-page-builder/LANDING-PAGE-ENGINE.md` — Engine-level constraints

---

## OUTPUT

**Primary:** `mobile-audit.json` + `MOBILE-AUDIT-SUMMARY.md`
**Location:** `~outputs/[project-name]/landing-page/LP-16-mobile-audit/`
