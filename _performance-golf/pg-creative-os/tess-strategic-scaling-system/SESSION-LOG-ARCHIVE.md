# Tess - Strategic Scaling System Intelligence - Session Archive

> **PURPOSE**: Condensed archive of Sessions 001-152. For active work, see `SESSION-LOG.md`.
> **Last archived**: 2026-02-15 (Session 156 compression)
> **Original size**: ~2,400 lines across 44 sessions (076-119) + prior archive (001-075) + 10 sessions (120-129) + 12 sessions (130-141) + 11 sessions (142-152)

---

## Archive Index

| Session Range | Focus | Key Outcome |
|---------------|-------|-------------|
| 001-008 | Foundation & MCP Setup | PRD v1.0, Micro-Skills defined, Google Sheets MCP working |
| 009-015 | Column Structure & Data Pipeline | 14-column Section 9 format, dual-output system |
| 016-025 | Lookup Tables & Code Resolution | 333 talent codes, all display name lookups |
| 026-035 | OLD Format Support & Data Integrity | OLD format detection, Session 032 decision (H-M blank) |
| 036-050 | Demo Data & Tab Architecture | 1,000 demo assets, 5-tab restructure |
| 051-060 | Folder Cleanup & Protocols | File reorganization, handoff protocols |
| 061-070 | Documentation Updates & Imports | NAMING-CONVENTION v2.3, 1,020 assets imported |
| 071-075 | Root Cause Analysis | Identified parsing bugs, lookup table extraction |
| 076-079 | Pipeline Fix & Log Condensation | Official micro_skills pipeline enforced, first archive created |
| 080-087 | Production Data & Root Angles | ClickUp integration, 909 Root Angles from CSVs, MASTER-AGENT v2.0 |
| 088-098 | Naming Convention v2.4→v3.5 + Google Doc Sync | exv/exh codes, Google Docs API, v3.3 (15-pos, country codes), talent 333→40, Lookup Tables overhaul |
| 099-101 | ROAS Fix & Sub-Agent Restructure | Net ROAS formula corrected, comparison tabs updated, tess_sub_agents package (14 modules), Creative Strategist |
| 102-109 | Dashboard Build & Anti-Degradation | CLAUDE.md created, tess-dashboard (Next.js + Tremor, 4 commits), TESS-ANTI-DEGRADATION.md |
| 110-117 | Naming Convention v3.7 + Google Doc Sync Phases 1-4 | 6 colleague comments addressed, v3.7 in markdown, Google Doc sync (replaceAllText, table rows, text blocks, full audit, 7 fix actions) |
| 118-119 | Challenger Cleanup + Asset Registry Phase 1 | 5 Challenger items resolved, 18-column Asset Registry tab created, 5-phase plan approved |
| 120-129 | Asset Registry Build + CSV Import + P0 Fix | registry_sync.py LIVE (672 rows), full CSV import (27,851 rows), P0 column misalignment found+fixed |
| 130-141 | Parser Overhaul + Recognition Scanning + Context Optimization | S128 over-correction fixed, recognition-based parsing (replace translation tables), context window 97% reduction, 969 rows with correct cols E-O, 5 parser tweaks (CF/AF/CO/col-O/old-lengths) |
| 142-152 | Pipeline Fixes + v3.8 Audit + Lookup Restructure + v3.9 Rollout (Phases 1-7) | Col O typed-columns fix, non-funnel filter, root angle 2-tier fallback, active-wins status, status preservation on writes, v3.8 dropdown audit+sync, Lookup Tables horizontal restructure for Domo, v3.9 rename script_id→root_angle_id (code+docs+sheets) |

---

## Critical Decisions (Must Preserve)

### Sessions 001-075 (Original Archive)

#### Session 001: PRD-First Approach
**Decision**: Cannot build agent without defined success criteria
**Outcome**: SSS-PRD.md created defining what "winning asset" means

#### Session 010: Script ID Apostrophe Prefix
**Decision**: Prefix Script IDs with apostrophe (`'0021`) to preserve leading zeros in Google Sheets
**Implementation**: `sheets_writer.py` lines 878-880

#### Session 025: Code-to-Display-Name Resolution
**Decision**: All code columns (H-M) resolve to full display names, not raw codes
**Implementation**: `sheets_writer.py` lookup dictionaries (AD_CATEGORY, EXPANSION_TYPE, ASSET_TYPE, TALENT, EDITOR, COPYWRITER)

#### Session 027: Cumulative Data Tracking
**Decision**: Raw_Daily_Data APPENDS historical data; aggregation/classification uses ALL-TIME cumulative metrics

#### Session 032: OLD Format Field Handling
**Decision**: OLD format (12-position) assets leave columns H-M BLANK - do NOT guess values
**Implementation**: `naming_parser.py` → `_parse_old_format()` returns None for positions 5-12

#### Session 054: Classification Thresholds
**Decision**: Final classification rules:
- Winner: Spend >= $2,500 AND ROAS >= 1.0 (100%)
- Potential: Spend >= $2,500 AND ROAS 0.8-0.99
- Underperformer: Spend >= $2,500 AND ROAS <= 0.79
- Testing: Spend < $2,500 (any ROAS)

### Sessions 076-119 (New Archive)

#### Session 077: No Ad-Hoc Scripts
**Decision**: NEVER write ad-hoc aggregator scripts. ALWAYS use official `tess_micro_skills` pipeline.
**Root cause**: Ad-hoc script truncated Script IDs, used raw codes instead of display names, guessed OLD format fields.

#### Session 082: Correct Pipeline (Skip Aggregator with Deduplicator)
**Decision**: When using Deduplicator, skip Aggregator (Deduplicator already aggregates and preserves status).
**Pipeline**: CSVIngester → Deduplicator → NamingParser → Classifier → SheetsWriter

#### Session 088: Ad Category Code Change
**Decision**: `ver` → `exv` (Vertical Expansion), `hor` → `exh` (Horizontal Expansion). Old codes still accepted for backward compat.

#### Session 092-093: 15-Position Naming Convention (v3.3)
**Decision**: Position 13 = Country Code (13 codes incl. `us`). Format shifts from 14 to 15 positions. Date moves to Position 14, Promo to 15.
**Backward compat**: 14-position assets detected by YYYYMMDD pattern at index 12.
**Implementation**: naming_parser.py, sheets_writer.py, comparison_analyzer.py, test_micro_skills.py all updated.

#### Session 094: Talent Table Overhaul + Data Integrity Rule
**Decision**: Talent codes reduced from 333 to 40 active. Fabrication corrections: `bvo` = "Human VO + B-Roll" (not "B-Roll + VO"), `gru` = "Guru" (not "Graphic/illustration"), `vv` = "Veda" (not "Victor Villarreal").
**Rule added**: "NEVER fabricate names, codes, or definitions. If not found in docs/code, ASK." (TESS-MASTER-AGENT.md)

#### Session 099: Net ROAS Formula Fix (Critical)
**Decision**: Formula changed from `net_revenue / spend` to `(spend + net_revenue) / spend`. Domo's Net Revenue already has Spend subtracted, so dividing by spend alone gave wrong results.
**Verified**: Matches Domo exactly after fix.

#### Session 101: Sub-Agent Architecture Restructure
**Decision**: Migrated from flat `tess_micro_skills/` to `tess_sub_agents/` package (Boris Cherny methodology). 14 modules with universal SubAgentResult type system. Stayed in Python (Tess↔Veda integration is YAML serialization boundary).
**New agent**: Creative Strategist — 127 recommendations, 50 written to "Creative Strategy" tab.

#### Session 102: CLAUDE.md + Phase-Stop Discipline
**Decision**: Created CLAUDE.md for Tess (first time). Added Phase-Stop Discipline to all 3 agents (Tess, Veda, Exa).

#### Session 105: Dashboard Location + "Stay Dark, Add PG Colors"
**Decision**: tess-dashboard lives under `tess-strategic-scaling-system/tess-dashboard/` (not top-level). Dark theme kept, PG Orange (#FD3300) as accent color.

#### Session 109: Anti-Degradation System
**Decision**: Created TESS-ANTI-DEGRADATION.md (v1.0, ~300 lines). Adapted from TonyFlo's CopywritingEngine framework. Wired into CLAUDE.md with equal authority.

#### Session 110: Naming Convention v3.7
**Decision**: 6 colleague comments addressed. Key changes: Section 3.2 Script ID added, `int` (International) Expansion Type added, `xx` Length Tier includes HTML5, Creation Date → Delivery Date (Position 14), v3.6→v3.7.

#### Session 119: Asset Registry Design
**Decision**: 18-column unified Asset Registry (videos + images in one tab). Columns A-R: Offer, Script ID, Variation ID, Asset ID, Media Type, Root Angle, Asset Type, Notes, Copywriter, Editor, Script Doc, Iconik Link, Approval Date, ClickUp Task ID, Registration Source, Registered At, Ad Category, Full Asset ID.
**Architecture**: 5-phase plan — Tab+Schema → Sync Script → Next-ID Logic → Webhook → Backfill.

## Critical Decisions (Sessions 130-141)

#### Session 130: S128 Over-Correction Identified
**Finding**: S128 P0 fix blanked positions 5-12 too aggressively — 97% of rows had empty E-O. OLD positions 5-12 map to known lookup tables. S032 decision = no fabrication, not "no extraction."

#### Session 134: CHECKPOINT.yaml Deleted
**Decision**: CHECKPOINT.yaml removed across all agents. SESSION-LOG.md Build State block is the sole state source.

#### Session 136: Context Window Optimization
**Decisions** (D136-1 through D136-4): Inline anti-degradation critical rules into CLAUDE.md Structural Gates (saves 472 lines/session). Challenger active items in Build State (saves 250 lines). MASTER-AGENT Session Operations → pointer to CLAUDE.md (saves 118 lines). Build State block renamed for cross-agent consistency.

#### Session 137: Recognition-Based Parsing Architecture
**Decision** (D137-1): Replace translation-based parsing with recognition-based scanning. OLD codes (EXP, VD, GARYMC) are unreliable when translated → only write recognized NEW format codes. Unrecognized → blank. `ver`/`hor` remain recognized as legacy Ad Category codes. Country Code blank for OLD format (don't guess "us").

#### Session 138: Recognition Scan Implementation
**Decisions** (D138-1 through D138-4): Unified `_recognition_scan()` for both OLD and INCOMPLETE formats. `ca` in recognition scan: prefer editor over country code (OLD format never had country codes). Raw_Daily_Data dedup key = (asset_id, date); new data takes priority. Dropdown `strict=False` for both Country Code and Status.

#### Session 139: Country Code + Date Formatting
**Decisions** (D139-1 through D139-3): Country Code cells show 2-letter code, not full name (matches dropdowns). Apostrophe prefix for dates (prevents Sheets auto-conversion). `--max-rows` as runtime CLI arg for test runs.

#### Session 140: Parser Tweak Decisions
**Decisions** (D140-1 through D140-4): 2min→180s tier. AF = "Anthony Flores" (Tony is nickname). CF cutoff = Jan 1, 2026. AF default = copywriter unless another copywriter already claimed.

#### Session 141: Typed Columns Pattern
**Finding**: Google Sheets "typed columns" feature silently blocks API-based `setDataValidation` clearing. Workaround: delete entire column via `deleteDimension`, insert fresh blank column via `insertDimension`, rewrite data as RAW text.

## Critical Decisions (Sessions 142-152)

#### Session 142: Col O Delete+Reinsert Fix
**Decision**: Delete entire column via `deleteDimension`, insert fresh blank via `insertDimension`, rewrite as RAW text. Bypasses "typed columns" silent blocking.
**Also**: Non-funnel filter plan approved — root angle 2-tier fallback (ClickUp + reference JSON).

#### Session 143: Non-Funnel Filter + Root Angle Fallback + Status Normalization
**Decisions**: (1) Non-funnel ads (pmax, search, shopping, microsoft) filtered in `phase_3_generate()` before view generation — 21 excluded ($336K spend). (2) Root angle 2-tier: ClickUp API (140) → `root_angle_lookup_cleaned.json` (3,389 fallback). Dual-key storage handles zero-padding (`ssts|761` → both `("ssts","761")` and `("ssts","0761")`). (3) Status normalization: only "Active" → Active; all others (Inactive, AD_STATUS_CAMPAIGN_DISABLE, Pending) → Inactive.

#### Session 144: Active-Wins Tie-Break Rule
**Decision**: If any row on the most recent date says "Active", the asset IS Active. An ad running in even one campaign is a live ad. Guarantees deterministic status regardless of processing order or historical data inclusion.
**Implementation**: `dedup.py:_aggregate_row()` + `main.py` cumulative merge — both updated.

#### Session 145: Status Preservation on Replacement Writes
**Decision**: When `append=False`, `_write_ad_level_data()` reads existing Asset ID + Status via `batchGet` before clearing, builds `prior_status` dict, overlays after write. Manual status edits survive pipeline replacement writes.
**Also**: Deleted dead `tess_micro_skills/output/sheets_writer.py` (2,128 lines).

#### Session 146: updateTable API for Table Column Dropdowns
**Decision**: Google Sheets Tables `updateTable` batchUpdate is the correct API for modifying table column dropdown definitions. Cell-level `setDataValidation` conflicts with table-level dropdowns.
**Also**: Full v3.8 sync — naming_codes.py + writer.py synced (prm/evg/int/gamc/mult/cf codes, jm=JD Miranda, jd removed). 8 table column dropdowns updated. Status conditional formatting added.

#### Session 147: Lookup Tables Horizontal Restructure for Domo
**Decision**: Restructured from 4-band vertical layout to 12 horizontal tables in dedicated column pairs with gap columns. Registry Dashboard (N-T) removed. Enables reliable Domo column extraction. Change management rules in A50:A60.

#### Session 148: Naming Convention v3.9 — Full Rename
**Decisions**: (1) "Script ID" → "Root Angle ID" as full Python rename (not just labels). (2) `xxxx` (No Talent) overrides offer-guru mapping for images. (3) B-roll talent rule: if 1 talent use their code, if 3+ use `mult`. (4) Section 9 OLD FORMAT preserved, NEW FORMAT updated to `[RootAngleID]`. Version history keeps original terminology.

#### Session 152: Table Dropdown ≠ Lookup Tables
**Finding**: Talent column dropdown is a hardcoded `ONE_OF_LIST` at table column level, NOT a range reference to Lookup Tables. Both must be updated independently.

---

## Error Patterns & Fixes

### Pattern 1: Ad-hoc Scripts Bypass Official Code
**Sessions**: 077 (identified), 078 (fixed)
**Fix**: ALWAYS use official `tess_micro_skills` pipeline

### Pattern 2: Column Position Mismatch
**Sessions**: 068, 074
**Fix**: Value-based parsing using lookup tables, not position-based

### Pattern 3: Platform Data Contamination
**Sessions**: 031
**Fix**: Cleared Raw_Daily_Data, re-ran with Meta API only

### Pattern 4: Net ROAS Formula Error
**Sessions**: 099 (identified + fixed)
**Fix**: `(spend + net_revenue) / spend` — Domo's Net Revenue already subtracts Spend

### Pattern 5: iCloud Git Index Corruption
**Sessions**: 108, 109 (recurrent)
**Fix**: `mv ".git/index 2" .git/index` after every git write. Root cause: project in `~/Documents/` syncs with iCloud.

### Pattern 6: Google Docs API Insertion Gotchas
**Sessions**: 112-114
**Lessons**: Paragraphs near HEADING_3 inherit that style (must explicitly set NORMAL_TEXT). insertTableRow before replaceAllText in same batch. Bottom-up ordering for multi-table insertions.

### Pattern 7: Google Sheets "Typed Columns" Block API Changes
**Sessions**: 141 (identified), 142 (fixed)
**Fix**: Delete column via `deleteDimension` + reinsert fresh via `insertDimension` + rewrite as RAW text. `setDataValidation` and `repeatCell` return success but "typed columns" silently blocks the actual change.

---

## Key File Evolution

### Core Documents
| Version | File | Changes |
|---------|------|---------|
| v1.0→v2.2 | TESS-MASTER-AGENT.md | Root Angle Population (S086), ClickUp Integration (S082), Data Integrity Rule (S094) |
| v2.0→v3.9 | TESS-NAMING-CONVENTION.md | 15-pos (S093), exv/exh (S088), talent 333→40 (S094), country codes (S093), v3.5 all positions (S096), v3.7 colleague feedback (S110), v3.8 audit+sync (S146), v3.9 Script ID→Root Angle ID rename (S148-152) |
| v1.0→current | sheets_writer.py | COUNTRY_CODE_LOOKUP, FUNNEL_LOOKUP, ROAS formula fix, header formatting |
| v1.0→current | naming_parser.py | 15-position support, backward compat, 3-char editor codes |

### Pipeline Components (as of S101 restructure)
Package: `tess_sub_agents/` (14 sub-agents with SubAgentResult type system)
- CSVIngester (Gatekeeper), NamingParser (Decoder), Deduplicator (Consolidator), DataValidator (Inspector)
- Aggregator (Accountant), Classifier (Judge), MetricCalculator (Actuary)
- ViewGenerator (Architect), ComparisonAnalyzer (Analyst), SheetsWriter (Scribe)
- RecommendationEngine (Scout), ThresholdAlerter (Sentinel), StateManager (Librarian)
- CreativeStrategist (Strategist) — NEW in S101

---

## Spreadsheet Structure (as of S155)

**Spreadsheet ID**: `1IXqv6PufQ49nryatxhY6UVgJqZ-x2qId251donUgd_U`

### Tabs (15 total)
1. Ad Level Tracking (Current State) — 969 rows, live production data
2. Ad Level Tracking (Future State) — Demo/testing
3. By Content — Funnel + Ad Category leaderboards
4. By Creative — Expansion Type + Asset Type leaderboards
5. By Team — Talent, Editor, Copywriter leaderboards
6. Root Angle Tracker — 83 root angles, test coverage matrix
7. Lookup Tables — 12 horizontal tables in dedicated column pairs (restructured S147 for Domo). Change management rules in A50:A60.
8. Aggregated_View
9. Error Log
10. Insights — Summary + 8 leaderboard sections, ROAS as percentage
11. Raw_Daily_Data — 24,701 daily rows (APPEND only)
12. Creative Strategy — 127 recommendations (50 rows)
13. Veda Intake Queue — 18 columns, Tess→Veda bridge
14. Asset Registry — 776 rows (672 existing + 104 synced S155), 18 columns, 14 offers
15. (various utility tabs)

---

## Changelog (Sessions 076-119)

| Date | Session | Summary |
|------|---------|---------|
| 2026-02-02 | 076 | Context handoff from S075 |
| 2026-02-02 | 077 | Root cause: ad-hoc scripts bypass official pipeline |
| 2026-02-02 | 078 | Fixed data using official micro_skills. 1,128 assets written. |
| 2026-02-02 | 079 | SESSION-LOG condensed (archived S001-075). CSV Upload Runbook created. |
| 2026-02-02 | 080 | Full import (1,005 assets). ClickUp integration (588 Root Angles). Weekly incremental pipeline. |
| 2026-02-02 | 081 | Status bug fixed in deduplicator.py. ClickUp field name fixed. 10 gaps identified. |
| 2026-02-02 | 082 | Re-import with fixed pipeline. MASTER-AGENT v1.8. PRD v1.2. 4 gaps closed. |
| 2026-02-02 | 083 | Handoff protocol improved. 24 creative performance CSVs added. |
| 2026-02-02 | 084 | Root angle lookup from 24 CSVs (2,972 entries). 909/1,005 matched. |
| 2026-02-02 | 085 | 909 Root Angles written to spreadsheet Column C. |
| 2026-02-02 | 086 | MASTER-AGENT v2.0 — Section 12: Root Angle Population documented. |
| 2026-02-02 | 087 | Root Angle names cleaned (suffixes stripped, non-angles blanked). 746 clean values. |
| 2026-02-03 | 088 | Ad Category codes ver→exv, hor→exh across 7 files. Google Docs MCP auth started. |
| 2026-02-03 | 089 | Google Docs MCP auth fixed (async bug workaround). OAuth token generated. |
| 2026-02-03 | 090 | Google Doc updated with exv/exh. Docs API enabled. MCP registered. |
| 2026-02-03 | 091 | Google Doc synced with markdown — 8 gaps fixed (27/27 verified). |
| 2026-02-04 | 092 | Naming Convention v3.3 scoped — 4 change categories, all files mapped. |
| 2026-02-04 | 093 | v3.3 IMPLEMENTED — 15-position, country codes, 5 files updated, 8/8 tests pass. |
| 2026-02-04 | 094 | Google Doc synced to v3.3 (60/60 verified). Talent 333→40. bvo/gru/vv fixed. Data Integrity Rule. |
| 2026-02-05 | 095 | Full Google Doc ↔ Markdown discrepancy analysis (27 items, 49/49 verified). |
| 2026-02-05 | 096 | v3.5 — All 15 positions documented. FUNNEL_LOOKUP (31 offers). Google Doc synced. |
| 2026-02-05 | 097 | 7 markdown reverse-sync changes. Editor table reordered. Lookup Tables audit. |
| 2026-02-05 | 098 | kgo→kgj. nlc added. Lookup Tables overhaul (336→120 rows, 6→11 sections). |
| 2026-02-05 | 099 | Net ROAS formula FIXED. Pipeline output fixed (correct tab, %, sorted, formatted). 1,058 assets. |
| 2026-02-06 | 100 | Comparison tabs + Insights + Root Angle Tracker updated. 97% data sparsity noted. |
| 2026-02-06 | 101 | Sub-agent restructure (tess_micro_skills → tess_sub_agents, 14 modules). Creative Strategist built. 48/48 tests. |
| 2026-02-07 | 102 | CLAUDE.md created for Tess. Phase-Stop Discipline added to Tess/Veda/Exa. |
| 2026-02-07 | 103 | EPIPE error diagnosed (transient). Dashboard Phases 1-4 verified live. |
| 2026-02-07 | 104 | Dashboard Phase 5 (Performance page, 8 dimension tabs). |
| 2026-02-07 | 105 | Dashboard moved to correct location. CLAUDE.md created for dashboard. Phase 1+2 committed. Phase A-D plan created. |
| 2026-02-07 | 106 | Phase A (PG brand colors) COMPLETE. Phase B (By-tabs data) code done but unverified. |
| 2026-02-07 | 107 | Phase B verified. Phase A+B committed. Phase C (rationale truncation) COMPLETE. |
| 2026-02-08 | 108 | Phase C committed. Phase D partial (5 files, loading skeletons + error states + CSV export). |
| 2026-02-08 | 109 | TESS-ANTI-DEGRADATION.md created (v1.0, ~300 lines). iCloud index bug fixed 2x. |
| 2026-02-08 | 110 | Naming Convention v3.7 — 6 colleague comments addressed in markdown. Google Doc sync deferred. |
| 2026-02-08 | 111 | Google Doc sync Phase 1 — 24 replaceAllText ops (41 replacements). |
| 2026-02-08 | 112 | Phase 2 COMPLETE (table rows + cells). af/cf copywriters added to markdown. Phase 3 insertion points mapped. |
| 2026-02-08 | 113 | Phase 3 partial — Changelog + OpDef table inserted. |
| 2026-02-08 | 114 | Phase 3 COMPLETE — all 4 text blocks inserted. Doc grew to 213 elements. |
| 2026-02-08 | 115 | Phase 4 full audit — 16 pass, 5 discrepancies, 7 fix actions queued. |
| 2026-02-08 | 116 | Fix actions 1-6 done (gamc talent, jd/jm cleanup, Offer-Guru section, v3.6 examples, Automation Rule, SP/DP energy). |
| 2026-02-08 | 117 | Action 7 confirmed done by user. All 7 fix actions complete. |
| 2026-02-09 | 118 | Challenger cleanup — 5 items resolved/suspended. Asset Registry deferred to S119. |
| 2026-02-09 | 119 | Asset Registry Phase 1 — 18-column tab created. 5-phase plan approved. ClickUp webhook architecture chosen. |

---

## Sessions 001-075 Summary Log

### Phase 1: Foundation (Sessions 001-008)
- Created PRD defining success criteria
- Defined 13 micro-skills across 5 layers
- Built master agent orchestration, Google Sheets MCP working

### Phase 2: Data Pipeline (Sessions 009-020)
- Fixed column structure to match Section 9 spec
- Added 333 talent codes + all lookup tables
- Implemented code-to-display-name resolution + Script ID apostrophe prefix

### Phase 3: Format Support (Sessions 021-035)
- OLD naming format detection + Session 032 decision (H-M blank)
- Fixed platform data contamination. Cumulative data tracking.

### Phase 4: Demo & Tabs (Sessions 036-055)
- 1,000 demo assets, 5-tab architecture, Emerging Winner classification

### Phase 5: Production Import (Sessions 056-070)
- NAMING-CONVENTION v2.3, 1,020 assets imported

### Phase 6: Root Cause Analysis (Sessions 071-075)
- 3 bugs in ad-hoc aggregator, lookup table extraction, prepared for S078 fix

## Sessions 076-119 Summary Log

### Phase 7: Pipeline Fix & Production Data (Sessions 076-087)
- Official pipeline enforced, first archive created (S079)
- ClickUp integration LIVE. 909 Root Angles from CSVs. MASTER-AGENT v2.0.
- Root Angle names cleaned (suffixes stripped, non-angles blanked)

### Phase 8: Naming Convention Evolution (Sessions 088-098)
- ver→exv/hor→exh (S088). Google Docs MCP auth (S089).
- v3.3: 15-position format with country codes (S093). Talent 333→40 (S094).
- Data Integrity Rule added. v3.5 all positions documented (S096).
- Google Doc sync via Docs API. Lookup Tables overhaul 336→120 rows (S098).

### Phase 9: ROAS Fix & Architecture (Sessions 099-101)
- Critical Net ROAS formula fix (S099). Comparison tabs updated (S100).
- Sub-agent restructure to tess_sub_agents (14 modules). Creative Strategist built (S101).

### Phase 10: Dashboard & Governance (Sessions 102-109)
- CLAUDE.md + Phase-Stop Discipline created (S102).
- tess-dashboard built: Next.js 14 + Tremor + Tailwind. 4 commits. PG brand colors.
- TESS-ANTI-DEGRADATION.md created (S109).

### Phase 11: v3.7 & Google Doc Sync (Sessions 110-117)
- 6 colleague comments → v3.7 in markdown (S110).
- 5-phase Google Doc sync: replaceAllText → table rows → text blocks → full audit → fix actions.
- All 7 fix actions complete by S117.

### Phase 12: Asset Registry Foundation (Sessions 118-119)
- Challenger cleanup (S118). Asset Registry Phase 1: 18-column tab created (S119).
- 5-phase plan: Tab+Schema → Sync Script → Next-ID Logic → Webhook → Backfill.

### Phase 13: Asset Registry Build + CSV Import (Sessions 120-129)
- Registry sync script built (S120): `registry_sync.py` ~610 lines, 672 rows across 14 offers, ClickUp→Registry auto-sync.
- Filter view "By Offer" + ARRAYFORMULA dashboard on Lookup Tables N-T (S122).
- Python `get_next_script_id()` + `get_next_variation_id()` + CLI (S123).
- Full CSV import pipeline: 27,851 daily rows, 1,247 unique ads, Jan 1 - Feb 9, 2026 (S124-S126).
- P0 Bug: Aggregator column misalignment — naive positional parsing → wrong cols E-O for 97% of rows (S126-S127).
- P0 Fix: NamingParser improved — NNMU/VD OLD detection, conservative INCOMPLETE handling (S128). Re-aggregated + re-wrote + verified (S129).
- Format reclassification: 59 INCOMPLETE→OLD due to better detection. Final: 687 INCOMPLETE, 522 OLD, 38 NEW.

### Phase 14: Parser Overhaul + Recognition Scanning (Sessions 130-141)
- S128 over-correction diagnosed: positions 5-12 blanked too aggressively (S130). 5-phase fix planned.
- OLD format extraction via lookup tables implemented (S131). Content-detection algorithm for INCOMPLETE format designed (S132) and applied (S133).
- Full re-aggregation + sheet write: 990 assets (S134). CHECKPOINT.yaml deleted — Build State is sole state source.
- 3 bugs diagnosed (Country Code empty, Creation→Delivery Date rename, Status all-Active) in S135.
- Context window optimization (S136): anti-degradation inlined, Challenger in Build State, MASTER-AGENT trimmed. 97% read reduction.
- Recognition-based parsing designed (S137) and implemented (S138): unified `_recognition_scan()`, Raw_Daily_Data dedup fix.
- Bug fixes + 100-row test verified (S139). 5 parser tweaks planned (S140) and implemented (S141): CF date-aware, AF positional, CO backward scan, old length codes. 4/5 verified; col O "typed columns" issue persists.

---

## Critical Decisions (Sessions 120-129)

#### Session 120: Registry Sync Architecture
**Decision**: Reuse MCP OAuth token from Sheets API for registry writes. Intra-batch dedup to catch overlapping ClickUp variations.
**Implementation**: `registry_sync.py` extends `clickup_ingester.py` patterns.

#### Session 122: Dashboard Formula Pattern
**Decision**: Use `TEXT(Nx,0)` for type-safe offer matching in ARRAYFORMULA dashboard (fixes "357" number-vs-text mismatch).
**Implementation**: `LET+ISNUMBER(IFERROR(VALUE()))` pattern for zero-case handling in Next-ID formulas.

#### Session 124: Full Replacement Import Strategy
**Decision**: CSV imports use FULL REPLACEMENT (not incremental). Domo CSV is complete refresh covering all dates.
**Implementation**: Read→backup root angles→clear→write→restore angles→verify.

#### Session 126: Column Misalignment Bug (P0)
**Finding**: Aggregator's naming parser maps parts[3]→Platform, parts[4]→Dimensions regardless of format. Only 38 NEW rows (3%) had correct cols E-O.
**Impact**: 1,209 rows (97%) had wrong data in columns E-O.

#### Session 128: S032 Decision Refinement
**Decision**: Session 032's "don't guess" applies to FABRICATION, not EXTRACTION. Data IS extractable from asset names using format-aware lookup tables. OLD positions 5-12 map to known lookup tables. INCOMPLETE 8+ part IDs have recognizable content patterns.
**Fix**: `_parse_old_format` extracts via lookups (S131). `_parse_incomplete` content-detection algorithm designed (S132).

---

## Changelog (Sessions 120-129)

| Date | Session | Summary |
|------|---------|---------|
| 2026-02-09 | 120 | registry_sync.py built. 672 rows across 14 offers. |
| 2026-02-09 | 121 | Handoff only (context limit). Challenger verified. |
| 2026-02-09 | 122 | Filter view "By Offer" + ARRAYFORMULA dashboard (Lookup Tables N-T). |
| 2026-02-09 | 123 | Python next-ID functions + CLI. 6/6 verification pass. |
| 2026-02-10 | 124 | CSV analyzed: 27,851 rows, 40 days, 1,247 ads. Full replacement decided. |
| 2026-02-10 | 125 | Import Phases 1-2: root angle backup (620) + aggregation (1,247 rows). |
| 2026-02-10 | 126 | Import Phases 3-5: 27,851 daily rows + 1,247 ad-level rows. P0 bug found. |
| 2026-02-10 | 127 | P0 bug analysis: 3 failure patterns in NamingParser positional mapping. |
| 2026-02-10 | 128 | P0 fix Phase 1: NNMU lookup, AdFormat check, conservative _parse_incomplete. |
| 2026-02-10 | 129 | P0 fix Phases 2-4: re-aggregated, re-wrote sheet, 7/7 verification pass. |

## Changelog (Sessions 130-141)

| Date | Session | Summary |
|------|---------|---------|
| 2026-02-10 | 130 | S128 over-correction found. 97% rows empty E-O. 5-phase fix plan approved. |
| 2026-02-10 | 131 | Phase 1/5: OLD format extraction via lookup tables. 48/48 tests. |
| 2026-02-10 | 132 | Phase 2 analysis: content-detection algorithm designed for INCOMPLETE format. |
| 2026-02-10 | 133 | Compression (S120-129 archived). Phase 2/5 applied: 9/9 tests, 41 assertions. |
| 2026-02-11 | 134 | Phases 3-4: re-aggregated 990 assets, wrote 991 rows. CHECKPOINT.yaml deleted. Raw_Daily_Data doubling bug found. |
| 2026-02-11 | 135 | Investigation: 3 bugs (Country Code empty, header rename, Status all-Active). |
| 2026-02-11 | 136 | Context window optimization: Build State compacted, anti-degradation inlined, Challenger optimized. |
| 2026-02-11 | 137 | Recognition-based parsing audit. Plan: replace translation tables with recognition scanning. |
| 2026-02-11 | 138 | Recognition scan implemented: 5 phases, unified _recognition_scan(), Raw_Daily_Data dedup fix. |
| 2026-02-11 | 139 | Bug fixes (country_code, date format, --max-rows). 100-row test verified. |
| 2026-02-11 | 140 | Plan: 5 parser/writer tweaks (CF/AF/CO/col-O/old-lengths). 4 decisions confirmed. |
| 2026-02-11 | 141 | 5 fixes implemented, 4/5 verified. Col O "typed columns" issue persists. |

### Phase 15: Pipeline Fixes + v3.8/v3.9 + Lookup Restructure (Sessions 142-152)
- Col O typed-columns workaround applied (S142). Non-funnel filter + root angle 2-tier fallback + status normalization (S143).
- Active-wins tie-break: deterministic status regardless of processing order (S144). Status preservation on replacement writes (S145).
- Full v3.8 audit + sync: 8 missing codes added, 8 table column dropdowns updated via `updateTable` API, status conditional formatting (S146).
- Lookup Tables horizontal restructure for Domo: 4-band vertical → 12 dedicated column pairs (S147).
- Naming Convention v3.9 rollout (S148-S152): 9-phase plan. Phase 1: NAMING-CONVENTION.md updated (Script ID → Root Angle ID, tobr, xxxx, speaking-roles-only). Phases 2-3: source-of-truth + core pipeline code renamed. Phase 4: supporting code (10 files, ~133 occurrences). Phases 5-6: tests (9/9 pass) + docs (5 MD files). Phase 7: Google Sheets (header + talent dropdown + Lookup Tables).

---

## Changelog (Sessions 142-152)

| Date | Session | Summary |
|------|---------|---------|
| 2026-02-11 | 142 | Col O delete+reinsert fix. Non-funnel filter + root angle fallback plan approved. |
| 2026-02-11 | 143 | Non-funnel filter (21 ads excluded), root angle 2-tier fallback, status normalization. 969-row write. |
| 2026-02-12 | 144 | Active-wins tie-break (0 flipped assets, 31 recovered). Full 969-row write. |
| 2026-02-12 | 145 | Compression (S130-141 archived). Status preservation on writes. Stale file cleanup (2,128 lines deleted). |
| 2026-02-12 | 146 | v3.8 audit: 8 codes added, 8 table dropdowns updated (updateTable API), status formatting. |
| 2026-02-12 | 147 | Lookup Tables restructure: 4-band vertical → 12 horizontal tables for Domo. |
| 2026-02-13 | 148 | v3.9 Phase 1: NAMING-CONVENTION.md — Script ID → Root Angle ID, tobr, xxxx, speaking-roles-only. |
| 2026-02-13 | 149 | v3.9 Phases 2-3: naming_codes.py, pipeline.py types, 5 core pipeline files renamed. |
| 2026-02-13 | 150 | v3.9 Phase 4: 10 supporting code files renamed (~133 occurrences). |
| 2026-02-13 | 151 | v3.9 Phases 5-6: tests (9/9 pass) + 5 MD docs renamed. Zero script_id remaining. |
| 2026-02-13 | 152 | v3.9 Phase 7: Google Sheets — header B1, Lookup Tables AH44:AI46, talent dropdown (42→44). |

---

**Archive Created**: 2026-02-02 (Session 079), expanded 2026-02-09 (S076-119), 2026-02-10 (S120-129), 2026-02-12 (S130-141), 2026-02-15 (S142-152)
**Active Log**: See `SESSION-LOG.md` for Sessions 153-current
