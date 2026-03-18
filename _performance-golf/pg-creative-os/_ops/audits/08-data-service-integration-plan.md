# 08 — PG Data Service Integration Plan

**Date:** 2026-03-17 (updated 2026-03-17 post-Patrick's v2 simplification)
**Call:** Wednesday 2026-03-19
**Participants:** Donnie, Christopher, Patrick
**PR:** #13 (closed — will reopen after alignment)
**Goal:** Connect Patrick's Domo API data service to Christopher's Creative OS agents so we can eliminate manual CSV exports permanently

---

## Context

Patrick built a standalone data service (`_performance-golf/pg-data-service/`) that pulls ad performance data from Domo via API, computes Beast Mode metrics, and strips PII.

**v2 Update (2026-03-17):** Patrick simplified the architecture significantly after our PR review. The service is now an **API-first data access layer** — Christopher imports it in Python and gets DataFrames back. No more file generation, no more formatters, no more consumer-side business logic in the service.

**What changed from v1 to v2:**
- CLI with formatters → Python API returning DataFrames
- `get_raw()` and `get_enriched()` are the two entry points
- Neco markdown brief formatter → **removed** (data, not reports)
- Tess CSV formatter → **removed** (Tess calls the API directly)
- Classification (Winner/Potential/etc.) → **removed** from service, moved to consumer-side. Thresholds documented in Data Dictionary.
- Angle analysis → **removed** (can add back later)
- Contracts directory → replaced by `catalog/DATA_DICTIONARY.md`
- Facebook-only filter → **removed** (all platforms now)
- Dataset allowlist (`datasets.yaml`) → **new** governance layer
- Data Dictionary (`catalog/DATA_DICTIONARY.md`) → **new** — every metric formula, gotchas, "do not reinvent" rules
- `email_address_hash` → **new** — SHA-256 anonymized customer ID for cohort analysis
- 100k row default with warning if limit hit

This is a much cleaner architecture. The "pipe not connected to the wall" problem from v1 is largely resolved — Christopher calls `get_enriched()` in his pipeline and gets a DataFrame with Beast Modes computed, PII stripped, all platforms included.

---

## Pre-Call: Remaining Items to Verify Wednesday

Most of the original pre-call fixes are addressed in v2. These remain to verify:

- [ ] **Date validation** — `date_from` and `date_to` are interpolated into SQL. Confirm `datetime.strptime` validation is in place to prevent injection.
- [ ] **`get_raw()` date filtering** — v1 ignored dates in raw queries. Confirm this is fixed in v2.
- [ ] **Hardcoded machine path** — v1 had `/Users/patrickhayes/Development/domo` as default. Confirm removed in v2.
- [ ] **NLPT label** — v1 said "Net Loss Per Trial" instead of "Net Revenue Per Trial." Confirm corrected in Data Dictionary.
- [ ] **Gross Profit formula** — intentional Domo match that double-subtracts refunds. Confirm inline comment added.
- [ ] **PII completeness** — "PII always stripped, no escape hatch" is the right policy. Verify all 252 columns are covered, not just the original 8.

---

## Decision 1: Output Destination — RESOLVED

**Patrick's v2 resolves this.** The service is now an API that returns DataFrames. Christopher calls `get_enriched(date_from, date_to)` in his pipeline and gets data back. No intermediate files.

This is effectively **Option C (Hybrid)** from our original plan:
- Patrick owns data extraction + Beast Mode computation + PII stripping
- Christopher owns Sheet writing + Root Angle resolution + naming parsing + agent-specific formatting

**The boundary is clean:** Patrick's service returns a DataFrame. Christopher's pipeline transforms it for the SSS Sheet.

**Still need to confirm Wednesday:** Does the DataFrame schema include everything Christopher's pipeline needs? Walk through the columns together.

---

## Decision 2: DataFrame Schema (replaces Intermediate Format)

The intermediate format is now a pandas DataFrame from `get_enriched()`. Need to confirm these columns exist:

**Patrick's service provides (from `get_enriched()`):**

| Field | Source | Notes |
|-------|--------|-------|
| Ad Name (full 15-position string) | Domo `Ad` column | Raw naming string |
| Day | Domo `Day` column | YYYY-MM-DD |
| Platform | Domo `Ad Platform` | All platforms |
| Spend | Domo | Must be >= 0 |
| Gross Revenue | Domo | |
| COGS | Domo | |
| Refunds | Domo | Already negative |
| Net Revenue | Computed | Beast Mode |
| Gross ROAS | Computed | Beast Mode |
| Net ROAS | Computed | Beast Mode |
| NC Net Revenue | Computed | New customer only |
| NC Net ROAS | Computed | New customer only, total spend |
| CPA | Computed | Beast Mode |
| NLPT | Computed | Beast Mode |
| SC Trials | Domo | |
| Orders | Domo | |
| email_address_hash | Computed | SHA-256, not reversible — for cohort analysis |

**Christopher's pipeline still adds (not in Patrick's service):**

| Field | Source | Notes |
|-------|--------|-------|
| Root Angle Name | ClickUp API (149 mappings) + reference JSON (1,838 entries) | **Still the critical gap** |
| Parsed naming positions 1-15 | `naming_parser.py` | Funnel, Root Angle ID, Variation ID, Platform, etc. |
| Format Type | `naming_parser.py` | NEW/OLD/INCOMPLETE/MALFORMED |
| Status | Pipeline logic | Active/Inactive |
| Days Active | Aggregation | Count of distinct days with spend |
| Asset Registry cross-reference | `registry_sync.py` | 776+ registered assets |
| Root Angle saturation flags | `populate_root_angles.py` | 3+ variations = saturated |
| Classification | Consumer-side | Winner/Potential/Underperformer/Testing (thresholds in Data Dictionary) |

**Action Wednesday:** Patrick demos the DataFrame schema in his Jupyter notebook. Christopher confirms it has everything his pipeline needs, or identifies gaps.

---

## Decision 3: Root Angle Name Resolution — STILL OPEN

**Not addressed in v2.** Patrick's service returns `script_id` codes but not human-readable Root Angle Names. All four agents still require them:

- Neco: angle selection and saturation tracking
- Veda: root angle preservation verification (orchestrator HALTs on empty)
- Orion: daily briefings from SSS Column C
- Tess: Column C in Ad Level Tracking

**Recommendation unchanged:** Christopher's pipeline handles resolution (Option B). The 2-tier ClickUp API + JSON fallback is Christopher's domain. Patrick's DataFrame provides the `script_id`; Christopher's pipeline resolves it to a name.

---

## Decision 4: Neco Brief — RESOLVED

**Patrick removed the Neco formatter.** Correct call. The Tess→Neco data protocol (TC-003) is a separate problem owned by Christopher. Patrick provides the data; how it gets to Neco is a Creative OS integration question, not a data service question.

---

## Decision 5: Platform Filtering — RESOLVED

**Patrick's v2 pulls all platforms.** `get_raw()` returns "all platforms, PII stripped." Christopher's pipeline handles downstream filtering (excluding pmax, search ads, shopping ads, Microsoft ads per Tess's existing logic).

---

## Decision 6: Data Governance (NEW in v2)

Patrick added three governance mechanisms that need Wednesday review:

1. **Dataset allowlist (`datasets.yaml`)** — Controls what datasets are queryable. Christopher gets access to what data team enables. Need to walk through what's in the allowlist.
2. **Data Dictionary (`catalog/DATA_DICTIONARY.md`)** — Every metric formula, gotchas, "do not reinvent" rules. Agents read this before touching data. Need to verify it matches Tess's existing Beast Mode definitions.
3. **PII stripping with no escape hatch** — Always on. Plus anonymized email hash for cohort analysis. Verify completeness.

---

## Code-Level Fixes (Verify Wednesday)

Updated from original list — some items removed (addressed in v2), some remain:

| # | Item | Status in v2 | Severity |
|---|------|-------------|----------|
| 1 | PII manifest completeness — all 252 columns covered? | Verify — policy is right ("no escape hatch"), need to confirm coverage | Must verify |
| 2 | Angle analysis cross-funnel bleed | Removed from service — no longer applies | Resolved |
| 3 | Gross Profit formula sign — inline comment needed | Verify | Should fix |
| 4 | Error handling for Domo unreachable | Verify | Should fix |
| 5 | NaN handling consistency | Verify — may be simplified in v2 | Should fix |
| 6 | Dependencies pinned in `requirements.txt` | Verify | Should fix |
| 7 | Date validation (SQL injection prevention) | Verify | Must fix |
| 8 | NC Net ROAS inline comment | Verify | Should fix |
| 9 | Neco brief formula duplication | Removed — Neco brief no longer exists | Resolved |

---

## Column Name Mapping

With v2's API-first approach, column mapping happens in Christopher's pipeline code, not in file formats. The key question Wednesday: **what are the exact column names in the DataFrame returned by `get_enriched()`?**

Christopher needs to map these to the SSS schema:

| SSS Column | Position | What Christopher Needs from Patrick's DataFrame |
|-----------|----------|------------------------------------------------|
| Asset ID (Column D) | Full 15-position string | Ad Name column |
| Column B (Root Angle ID) | Position 2 | Parsed from Ad Name (Christopher's parser) |
| Column C (Root Angle Name) | Resolved | Christopher's 2-tier resolution — not in DataFrame |
| Column I (Expansion Type) | Position 8 code | Parsed from Ad Name (Christopher's parser) |
| Column ~18 (Net ROAS) | Computed | From DataFrame `net_roas` column |
| Column ~19 (Classification) | Computed | Christopher applies thresholds from Data Dictionary |
| Column P (Status) | Derived | Christopher's logic |
| Column Q (Spend) | Metric | From DataFrame `spend` column |
| Column U (Format Type) | Parsed | Christopher's naming parser |

**Action Wednesday:** Patrick shows DataFrame columns. Christopher confirms mapping.

---

## Wednesday Call Agenda (Updated)

| # | Topic | Time | Decision |
|---|-------|------|----------|
| 1 | **Patrick demos v2** — Jupyter notebook, three lines of code, DataFrame output | 10 min | See it working |
| 2 | **DataFrame schema review** — walk through columns, confirm Christopher has everything he needs | 15 min | Lock schema |
| 3 | **Root Angle resolution** (Decision 3) — confirm Christopher's pipeline handles it | 5 min | Lock |
| 4 | **Column name mapping** — Patrick's DataFrame columns → Christopher's SSS columns | 10 min | Lock |
| 5 | **Data governance** (Decision 6) — dataset allowlist, Data Dictionary, PII completeness | 10 min | Lock |
| 6 | **Code-level verification** — date validation, GP formula comment, error handling, NaN | 10 min | Assign |
| 7 | **Integration test** — Christopher calls `get_enriched()` live, feeds into his pipeline | 10 min | Verify |
| 8 | **Next steps** — Patrick reopens PR, timeline for merge | 5 min | Agree |

**Total estimated time: 75 minutes**

---

## Success Criteria

After Wednesday, we should have:

1. A locked DataFrame schema that both Patrick and Christopher agree on
2. Root Angle Name resolution confirmed as Christopher's pipeline responsibility
3. All platform data flowing through `get_enriched()`
4. PII completeness verified
5. Data Dictionary reviewed against Tess's existing Beast Mode definitions
6. Christopher successfully calls the API and gets data into his pipeline
7. Patrick reopens PR #13 with any remaining fixes, ready for merge review
8. A clear timeline for when the data service replaces manual CSV exports

---

## Reference Files

| File | Location | What It Contains |
|------|----------|-----------------|
| Tess Naming Convention | `pg-creative-os/tess-strategic-scaling-system/TESS-NAMING-CONVENTION.md` | 15-position format, all code tables, valid values |
| Tess PRD | `pg-creative-os/tess-strategic-scaling-system/TESS-PRD.md` | Classification thresholds, validation constraints |
| Tess Sub-Agents | `pg-creative-os/tess-strategic-scaling-system/TESS-SUB-AGENTS.md` | CSV ingestion requirements, column aliases |
| Root Angle Lookup | `pg-creative-os/tess-strategic-scaling-system/_reference/root_angle_lookup_cleaned.json` | 1,838 root angle ID → name mappings |
| Orion data_sources.py | `pg-creative-os/orion-chief-of-staff/_ops/orion-team-bot/data_sources.py` | How Orion reads SSS (column indices, tab names) |
| Neco Master Agent | `pg-creative-os/neco-neurocopy-agent/NECO-MASTER-AGENT.md` | What data Neco expects from Tess |
| Veda Intake | `pg-creative-os/veda-video-editing-agent/veda_intake/README.md` | Intake Queue format, Root Angle requirements |
| Patrick's Data Dictionary | `pg-data-service/catalog/DATA_DICTIONARY.md` | Every metric formula, gotchas, "do not reinvent" rules |
| Patrick's CLAUDE.md | `pg-data-service/CLAUDE.md` | Formula definitions, known Domo bugs, column mappings |
| PR #13 Review | GitHub PR #13 comments | Full review findings + Patrick's self-review |
