---
name: competitive-page-audit
description: >-
  Analyze 3-5 competitor or reference landing pages in the vertical. Map element
  order, proof strategy, CTA architecture, and offer framing. Identify what is
  saturated (table stakes) vs. differentiated (opportunity). Uses Firecrawl MCP
  for live competitor page scraping during execution. Trigger when page brief and
  conversion intelligence exist and you need competitive context before architecture
  decisions. Requires competitor URLs from user or LP-01 sourcing.
---

# LP-02 — Competitive Page Audit

**Pipeline Position:** After LP-01 (Intelligence). Informs all downstream architecture and writing skills.

---

## PURPOSE

Scrape and analyze competitor landing pages to identify saturated elements (table stakes) vs. differentiated opportunities. Provides competitive context that prevents building pages that look like everything else in the market.

**Success Criteria:**
- 3-5 competitor pages scraped and analyzed via Firecrawl MCP
- Element order, proof strategy, CTA architecture, and offer framing mapped per page
- Saturation vs. differentiation matrix produced
- competitive-audit.json produced with page-by-page analysis and opportunity gaps

---

## REFERENCE FILES

- `LP-02-AGENT.md` — Complete orchestration specification
- `LP-02-ANTI-DEGRADATION.md` — Quality enforcement rules
- `04-page-builder/LANDING-PAGE-ENGINE.md` — Engine-level constraints
- `04-page-builder/element-taxonomy.md` — 64 element types for classification

---

## OUTPUT

**Primary:** `competitive-audit.json` + `COMPETITIVE-AUDIT-SUMMARY.md`
**Location:** `~outputs/[project-name]/landing-page/LP-02-competitive-audit/`
