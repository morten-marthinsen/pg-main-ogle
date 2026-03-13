# Skill Index: Ad Engine (A01-A12)
**Source:** Extracted from CLAUDE-SKILL-INDEX.md. Load ONLY this file for Ad Engine skills.

---

## Ad Engine (A01-A12)

**Master Document:** `08-ads/AD-ENGINE.md` (v1.5 — READ THAT FILE for full protocol)

### 12-Skill Architecture

| Skill | Name | Arena? |
|-------|------|--------|
| A01 | Ad Intelligence & Competitive Scan | No |
| A02 | Hook & Angle Discovery | Yes (scoring) |
| A03 | Format Strategy & Platform Mapping | No |
| A04 | Script Architecture | No |
| A05 | Visual Direction | No |
| A06 | Ad Arena | Yes (`ad_concept`) |
| A07 | Copy Production | No |
| A08 | Visual/Video Production | No |
| A09 | Assembly & Variant Matrix | No |
| A10 | Pre-Launch Scoring | No |
| A11 | Launch Package | No |
| A12 | Performance Learning Loop | No |

### A01 Ad Intelligence & Competitive Scan

- **31 microskills** (v1.5 — up from 26)
- **3 operating modes:**
  - **Initial Scan** — New project, 500+ competitor ads scraped across platforms
  - **Continuous Monitor** — Scheduled weekly delta scans
  - **Tool-Assisted Scan** (v1.5) — Import pre-scraped, impression-sorted data from Meta Ad Spy tool
- **Tool-Assisted Scan:** Dual-signal performance scoring (40% run duration + 60% impressions) for more accurate winner identification
- **5 new microskills (v1.5):** 0.5 (JSON Import Loader), 0.6 (Brand Database Matcher), 1.6 (Meta Ad Spy Ingester), 2.7 (Impression Scorer), 3.8 (Impression-Weighted Analysis)
- **Integration protocol:** `meta-ad-spy-integration.md` (shared protocol for Tool-Assisted mode)
- **Downstream enrichment:** A02 (impression-validated hooks), A10 (impression-weighted scoring), A12 (impression baselines)

### 5 Ad Laws

1. The hook is NOT the big idea
2. The output is a test matrix, not an ad
3. Ads are modular, not monolithic
4. Platform-native or die
5. Intelligence is continuous, not one-time

### When Executing

1. READ `08-ads/AD-ENGINE.md`
2. READ the skill's ANTI-DEGRADATION.md
3. READ the skill's AGENT.md
4. READ each microskill .md spec BEFORE executing
5. FOLLOW all gates exactly
6. For A06: Also READ ~system/ARENA-PROTOCOL.md
