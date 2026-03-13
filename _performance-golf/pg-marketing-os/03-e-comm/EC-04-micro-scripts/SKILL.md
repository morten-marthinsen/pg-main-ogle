---
name: micro-script-writer
description: >-
  Write product micro-scripts for video, carousel, and GIF elements on
  e-commerce pages. Short-form scripts (15-60 seconds) mapped to specific
  page sections per the PG sf2 pattern. Types include hero video, feature
  explainer, UGC script framework, how-to demo, and comparison scripts.
  No Arena (short-form). Trigger when users mention ecom video scripts,
  product micro-scripts, carousel scripts, or section-mapped video content.
  Requires EC-00 (Strategy) and EC-01 (Feature Package).
---

# EC-04 — Micro-Script Writer

**Pipeline Position:** Fifth skill in E-Commerce Copy Engine pipeline. Executes after EC-00 (Strategist) and EC-01 (Feature Naming). Feeds EC-05 (Assembly).

---

## PURPOSE

Write product micro-scripts for video, carousel, and GIF elements. Each script is 15-60 seconds and maps to a specific page section. Per the PG sf2 pattern, micro-scripts are integral to PDP architecture — they're not afterthoughts but planned content elements per section.

**Script Types:**
- Hero Video (30-60s) — Product overview/demo for ATF hero carousel
- Feature Explainer (15-30s) — Single feature deep-dive for feature sections
- UGC Script Framework (15-30s) — Customer testimonial framework for UGC carousel
- How-To (30-60s) — Usage demonstration for How to Use section
- Comparison (15-30s) — Side-by-side demo for comparison section

**Success Criteria:**
- Every section with video/carousel potential has a mapped micro-script
- Scripts use feature names from EC-01 consistently
- Duration specified per script (15-60s range)
- Section mapping included (which page section each script appears in)
- Scripts are scannable — bullet-point format with visual direction notes

---

## LAYER ARCHITECTURE

| Layer | Task | Key Microskills |
|-------|------|-----------------|
| 0 | Input loading + strategy map + feature package | TBD (v2) |
| 1 | Script type mapping per section + script drafting | TBD (v2) |
| 2 | Feature name consistency check + duration validation | TBD (v2) |
| 4 | Output packaging with section mapping | TBD (v2) |

---

## REFERENCE FILES

v1 scaffold — full execution specs will be built in subsequent iterations:
- `EC-04-AGENT.md` — Complete orchestration specification (planned)
- `EC-04-ANTI-DEGRADATION.md` — Quality enforcement rules (planned)
- `03-e-comm/E-COMM-ENGINE.md` — Engine-level constraints and 5 Laws

---

## OUTPUT

**Primary:** `micro-scripts.json`
**Location:** `~outputs/[project-code]/e-comm/`
