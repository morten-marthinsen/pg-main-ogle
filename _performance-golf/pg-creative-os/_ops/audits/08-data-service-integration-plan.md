# 08 — PG Data Service Integration Plan

**Date:** 2026-03-17
**Call:** Wednesday 2026-03-19
**Participants:** Donnie, Christopher, Patrick
**PR:** #13 (closed — will reopen after alignment)
**Goal:** Connect Patrick's Domo API data service to Christopher's Creative OS agents so we can eliminate manual CSV exports permanently

---

## Context

Patrick built a standalone data service (`_performance-golf/pg-data-service/`) that pulls ad performance data from Domo via API, computes Beast Mode metrics, classifies ads, detects angle saturation, and formats output for each agent. The engineering is solid — adapter pattern, PII handling, classification logic all match what Tess uses.

The problem: the service was built in isolation. It outputs to flat files, but every Creative OS agent reads from the SSS Google Sheet. The column names don't match. Root Angle Names are missing. The Tess→Neco protocol doesn't exist yet. And it only pulls Facebook data when the agents need all platforms.

This document lays out every decision and implementation step so we can move through Wednesday fast and get Patrick's service connected properly.

---

## Pre-Call: Patrick Fixes Before Wednesday

These must be done before the call so we're working with clean code:

- [ ] **Remove Facebook-only filter** — Both `_fetch_ad_metrics()` and `_fetch_orders()` in `adapters/domo.py` hardcode `AND platform = 'facebook'`. Remove the filter so the API pulls all platforms. If Patrick's API key/dataset access is limited to Facebook, escalate the access issue NOW.
- [ ] **Remove hardcoded machine path** — `domo.py` line 20-23 defaults `DOMO_CLIENT_PATH` to `/Users/patrickhayes/Development/domo`. Replace with empty string default + clear error if not set.
- [ ] **Fix NLPT label** — `tess_enrichment.py` labels NLPT as "Net Loss Per Trial." Should be "Net Revenue Per Trial" per the CLAUDE.md formula definition.
- [ ] **Add date validation** — `date_from` and `date_to` are interpolated directly into SQL via f-strings. Add `datetime.strptime` validation to prevent injection. Domo doesn't support parameterized queries, so input validation is the only defense.
- [ ] **Fix `fetch_raw()` date filtering** — The raw export query ignores `date_from`/`date_to` entirely. Dates are passed by callers but silently discarded.
- [ ] **Fix order/ad platform mismatch** — `_fetch_orders()` has no platform filter while `_fetch_ad_metrics()` does. When we go all-platform, both queries must use the same platform scope or the join inflates revenue.

---

## Decision 1: Output Destination

**The question:** Does Patrick's service write directly to the SSS Google Sheet, or does it feed into Christopher's existing pipeline?

**Current state:**
- Patrick's service outputs to flat files: `outputs/tess/`, `outputs/neco/`, `outputs/orion/`
- Christopher's pipeline (`weekly_incremental_pipeline.py`, `naming_parser.py`, `naming_codes.py`, `registry_sync.py`, `sheets_writer.py`) processes CSVs and writes to the SSS Sheet
- The SSS Sheet (`1IXqv6PufQ49nryatxhY6UVgJqZ-x2qId251donUgd_U`) is the single source of truth for all 4 agents

**Options:**

| Option | What Changes | Pros | Cons |
|--------|-------------|------|------|
| **A. Patrick feeds Christopher's pipeline** | Patrick's service replaces the manual CSV export. Output goes to a standardized CSV that Christopher's pipeline ingests. Christopher's pipeline continues to write to the Sheet. | Minimal disruption. Christopher's pipeline already handles Sheet writing, Root Angle resolution, naming parsing. | Two-hop: Domo API → CSV → pipeline → Sheet. Patrick's Beast Mode calcs may duplicate Christopher's pipeline calcs. |
| **B. Patrick writes to Sheet directly** | Patrick's service adds a `sheets` output format that writes directly to Raw_Daily_Data and Ad Level Tracking tabs. Christopher's pipeline is retired. | Single service, one hop. Cleaner long-term. | Patrick needs to learn the 3-layer Sheet architecture, Root Angle resolution, naming convention parsing. More work upfront. |
| **C. Hybrid** | Patrick's service replaces the Domo pull + Beast Mode calcs. Christopher's pipeline handles Sheet writing + Root Angle resolution + naming parsing. Patrick outputs a standardized intermediate format that Christopher's pipeline consumes. | Each person owns what they built. Clean boundary. | Need to define the intermediate format precisely. |

**Recommendation:** Option C. Patrick owns the data extraction and computation. Christopher owns the Sheet integration and agent-specific formatting. The intermediate format is the contract between them.

---

## Decision 2: Intermediate Format Schema

If we go with Option C, we need to define exactly what Patrick outputs and Christopher consumes. The schema must include everything Christopher's pipeline needs that Patrick's service currently computes, plus the fields Christopher's pipeline adds.

**Patrick's service provides (computed from Domo):**

| Field | Source | Notes |
|-------|--------|-------|
| Ad Name (full 15-position string) | Domo `Ad` column | This is the raw naming string |
| Day | Domo `Day` column | YYYY-MM-DD |
| Platform | Domo `Ad Platform` | All platforms, not just Facebook |
| Spend | Domo | Must be >= 0 |
| Gross Revenue | Domo | |
| COGS | Domo | |
| Refunds | Domo | Already negative |
| Net Revenue | Computed | `gr - cogs + refunds - agency - cc - spend` |
| Gross ROAS | Computed | `gross_revenue / spend` |
| Net ROAS | Computed | `(net_revenue / spend) + 1` |
| NC Net Revenue | Computed | New customer only |
| NC Net ROAS | Computed | New customer only, total spend |
| CPA | Computed | `spend / orders` |
| NLPT | Computed | `net_revenue / SC_trials` |
| SC Trials | Domo | |
| Orders | Domo | |
| Classification | Computed | Winner/Potential/Underperformer/Testing |

**Christopher's pipeline adds (not in Patrick's service):**

| Field | Source | Notes |
|-------|--------|-------|
| Root Angle Name | ClickUp API (149 mappings) + reference JSON (1,838 entries) | **Critical gap — Patrick doesn't have this** |
| Parsed naming positions 1-15 | `naming_parser.py` | Funnel, Root Angle ID, Variation ID, Platform, Dimensions, etc. |
| Format Type | `naming_parser.py` | NEW/OLD/INCOMPLETE/MALFORMED |
| Status | Pipeline logic | Active/Inactive |
| Days Active | Aggregation | Count of distinct days with spend |
| Asset Registry cross-reference | `registry_sync.py` | 776+ registered assets |
| Root Angle saturation flags | `populate_root_angles.py` | 3+ variations = saturated |

**Action:** Define a CSV/YAML contract for the intermediate format. Patrick produces it, Christopher consumes it. Both sign off on the schema Wednesday.

---

## Decision 3: Root Angle Name Resolution

**The problem:** Patrick's service outputs `script_id` (e.g., `i081`) but not the human-readable Root Angle Name (e.g., "Spine Mobility Reset"). All four agents require Root Angle Names:

- Neco: angle selection and saturation tracking
- Veda: root angle preservation verification (orchestrator HALTs on empty)
- Orion: daily briefings from SSS Column C
- Tess: Column C in Ad Level Tracking

**Christopher's current 2-tier resolution:**
1. **ClickUp API** (primary) — "Ad Delivery" list, custom field "Ad Root Angle Name" (149 mappings)
2. **Reference JSON** (fallback) — `_reference/root_angle_lookup_cleaned.json` (1,838 entries)
3. 421 assets currently have no Root Angle Name (funnels not in ClickUp)

**Options:**

| Option | Implementation |
|--------|---------------|
| **A. Patrick adds resolution to his service** | Patrick integrates the ClickUp API + JSON fallback into the data service. Root Angle Names appear in his output. |
| **B. Christopher's pipeline handles resolution** | Patrick outputs `script_id` only. Christopher's pipeline adds Root Angle Names during Sheet writing (current behavior). |
| **C. Shared resolution module** | Extract the resolution logic into a shared Python module both can import. |

**Recommendation:** Option B for now (least disruption), Option C as a follow-up. The resolution logic is Christopher's domain knowledge — the ClickUp field IDs, the fallback JSON, the 421 unresolved assets. Moving it to Patrick's service without that context risks breaking it.

---

## Decision 4: Neco Brief Integration (TC-003)

**The problem:** Patrick built a Neco markdown brief formatter, but there's no code in Neco that reads from `outputs/neco/`. The Tess→Neco data protocol has been open since Session 110.

**Current Neco intake:** Human provides product brief + performance context manually. Neco does not read structured data files.

**Options:**

| Option | What Changes |
|--------|-------------|
| **A. Human-readable reference** | Patrick's Neco brief is a formatted doc that a human (or Orion) reads and passes to Neco as context. No automated integration. |
| **B. Neco context loading** | Add a Layer 0 step to Neco that reads the latest brief from `outputs/neco/` before starting a copywriting session. |
| **C. Orion orchestrates** | Orion reads the Neco brief and includes relevant data when tasking Neco. Orion already reads SSS data. |

**Recommendation:** Option A for Wednesday (immediate value, zero integration work). Option B as a follow-up once we validate the brief format matches what Neco actually needs. Christopher decides — he knows Neco's intake best.

---

## Decision 5: Platform Filtering Strategy

**The problem:** Patrick hardcoded Facebook-only. Tess processes all platforms but filters out: pmax, search ads, shopping ads, Microsoft ads.

**What needs to happen:**
1. Patrick removes the `platform = 'facebook'` filter from both SQL queries
2. Patrick adds a configurable platform exclusion list to `config.yaml`
3. The exclusion list matches Tess's current filtering: exclude `pmax`, `search ad`, `shopping ad`, `microsoft ads`
4. Valid funnel codes (31 in `naming_codes.py`) should be the primary filter — ads without valid funnel codes are non-funnel traffic

**Reference:** Tess's `naming_codes.py` → `FUNNEL_LOOKUP` (31 codes). Anything not matching a valid funnel code is excluded.

---

## Code-Level Fixes (Can Be Done Before or During Wednesday)

These are from the PR review and Patrick's self-review. All should be addressed in the updated PR:

| # | Item | Owner | Severity |
|---|------|-------|----------|
| 1 | PII manifest — only 8 of 252 columns audited. Missing shipping/billing address fields. Raw export leaks anything not in manifest. | Patrick + Christopher (Christopher knows the columns) | Must fix |
| 2 | Angle analysis groups by `script_id` alone — should be `["funnel", "script_id"]` to prevent cross-funnel bleed | Patrick | Must fix |
| 3 | Gross Profit formula double-subtracts refunds (intentional Domo match) — needs inline comment | Patrick | Should fix |
| 4 | `service.py` no top-level error handling — raw tracebacks if Domo unreachable | Patrick | Should fix |
| 5 | NaN handling inconsistent across pipeline — some fills with 0, some doesn't | Patrick | Should fix |
| 6 | Dependencies unpinned in `requirements.txt` | Patrick | Should fix |
| 7 | Dead `pii_columns` key in config.yaml — code only reads `pii_manifest.yaml` | Patrick | Cleanup |
| 8 | NC Net ROAS uses total spend for NC-only revenue — needs inline comment explaining why | Patrick | Should fix |
| 9 | Portfolio Net ROAS in Neco brief re-derives formula — should reuse | Patrick | Minor |

---

## Column Name Mapping

Patrick's output needs to align with the SSS schema. Here's the current mismatch and proposed resolution:

| Patrick's Column | SSS Column | Position | Action |
|-----------------|-----------|----------|--------|
| `Ad Name` | `Asset ID` (Column D) | Full 15-position string | Rename to `Asset ID` |
| `Root Angle ID` | Column B | Position 2 | Keep — but add Root Angle Name (Column C) via Christopher's resolver |
| `Expansion Type` (human-readable) | Column I | Position 8 code | Output the code, not the name. Christopher's pipeline maps codes. |
| `Classification` | Column ~19 | Computed | Keep — thresholds already match |
| `Net ROAS` | Column ~18 | Computed | Keep — formula matches |
| `Spend` | Column Q | Metric | Keep |
| `Net Revenue` | Aggregated_View | Metric | Keep |
| Root Angle Name | Column C | Resolved | **Add** — Christopher's 2-tier resolution |
| Format Type | Column U | Parsed | **Add** — NEW/OLD/INCOMPLETE/MALFORMED from naming parser |
| Days Active | Aggregated_View | Computed | **Add** — count of distinct days with spend |
| Status | Column P | Derived | **Add** — Active/Inactive logic |

---

## Wednesday Call Agenda (Recommended Order)

| # | Topic | Time | Decision |
|---|-------|------|----------|
| 1 | **Patrick's pre-call fixes** — confirm all 6 items from the pre-call list are done | 5 min | Verify |
| 2 | **Output destination** (Decision 1) — Option A, B, or C? | 10 min | Lock |
| 3 | **Intermediate format schema** (Decision 2) — define the contract | 15 min | Lock |
| 4 | **Root Angle resolution** (Decision 3) — who owns it? | 5 min | Lock |
| 5 | **Column name alignment** — walk through the mapping table | 10 min | Lock |
| 6 | **Platform filtering** (Decision 5) — confirm exclusion list | 5 min | Lock |
| 7 | **PII manifest audit** — Christopher walks through the 252 columns | 10 min | Complete |
| 8 | **Neco brief** (Decision 4) — how does it get consumed? | 5 min | Lock |
| 9 | **Code-level fixes** — assign remaining items | 5 min | Assign |
| 10 | **Next steps** — Patrick updates PR, timeline for merge | 5 min | Agree |

**Total estimated time: 75 minutes**

---

## Success Criteria

After Wednesday, we should have:

1. A locked intermediate format schema that both Patrick and Christopher agree on
2. Root Angle Name resolution ownership decided
3. All platform data flowing (not just Facebook)
4. PII manifest complete (all 252 columns audited)
5. Patrick reopens PR #13 with fixes, ready for merge review
6. A clear timeline for when the data service replaces manual CSV exports

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
| Patrick's Architecture Doc | `pg-data-service/PG-DATA-SERVICE.md` | 905-line doc covering Beast Modes, data quirks, reconciliation |
| Patrick's CLAUDE.md | `pg-data-service/CLAUDE.md` | Formula definitions, known Domo bugs, column mappings |
| PR #13 Review | GitHub PR #13 comments | Full review findings + Patrick's self-review |
