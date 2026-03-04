# Veda Phase 2 Plan — From Library to Tool

> **Created**: 2026-02-06 (Session 014)
> **Status**: DRAFT — Awaiting Christopher review
> **Prerequisite**: Phase 1 complete (10/13 sub-agents, 418 tests, 8 commits)

---

## The Gap

Phase 1 built Veda as a **tested library** — 10 sub-agents, a pipeline orchestrator, AI clients, and 418 tests. Everything works in isolation.

But there is no way to actually **use** Veda. No CLI. No real Google Sheets connection. No Iconik. Every external dependency is a mock interface.

Phase 2 bridges: **library → runnable tool → production pipeline**.

---

## Phase 2 Architecture

```
Phase 2A: MAKE IT RUN          Phase 2B: COMPLETE PIPELINE     Phase 2C: AUTOMATE
(can run locally)               (can produce real assets)        (can run unattended)
─────────────────               ─────────────────────────        ────────────────────
CLI entry point                 Iconik sub-agents (3/3)          ClickUp integration
Google Sheets adapter           Real asset editing               Tess recommendation intake
Interactive human prompts       File → Asset ID renaming         Batch execution mode
Pipeline resume from pause      Upload + metadata                Strategic Planning Dashboard
Dry-run with real SSS data      Production pipeline run
```

Each phase is independently useful. 2A alone makes Veda a working local tool.

---

## Phase 2A: Make It Run

**Goal**: `npx veda run --source DQFE-SC01-v0001 --expansion hook_stack --variations 3`

### 2A.1 — CLI Entry Point

| Item | Detail |
|------|--------|
| What | `src/cli.ts` — parses args, loads .env, wires real deps, calls `runPipeline()` |
| Interface | `npx veda run` with flags for intake fields, or interactive prompts for missing fields |
| Output | Console output showing step-by-step progress, final Asset IDs, output file paths |
| Complexity | Low — orchestrator already exists, just needs a front door |

### 2A.2 — Google Sheets Adapter

| Item | Detail |
|------|--------|
| What | Real `SheetsReader` + `SheetsWriter` implementations using `googleapis` package |
| Reads | SSS spreadsheet `1IXqv6PufQ49nryatxhY6UVgJqZ-x2qId251donUgd_U`, Ad Level Tracking tab |
| Writes | New asset entries to same sheet (Step 10) |
| Auth | Google service account JSON key (Christopher to provide) |
| Complexity | Medium — need to handle sheet column mapping, row appending |
| Dependency | **New package**: `googleapis` (Google APIs client) |

### 2A.3 — Interactive Human Checkpoints

| Item | Detail |
|------|--------|
| What | Terminal prompts at pipeline pause points (Steps 3 and 9) |
| Step 3 | "Creating 3 hook_stack variations of SC01. Reserved: v0030-v0032. Confirm? [Y/n]" |
| Step 9 | "Assets ready for review. Files at /output/... Approve? [Y/n/r for revision notes]" |
| Complexity | Low — `readline` or simple `process.stdin` |

### 2A.4 — Pipeline Resume

| Item | Detail |
|------|--------|
| What | `resumePipeline(state, deps)` function that continues from a paused PipelineState |
| Why | Currently `runPipeline()` starts fresh every time. When it pauses at Step 3 or 9, there's no way to continue. |
| Design | Save PipelineState to JSON file. Resume loads state and re-enters at the paused step. |
| Complexity | Medium — need step re-entry logic in orchestrator |

### 2A.5 — Dry-Run with Real SSS Data

| Item | Detail |
|------|--------|
| What | End-to-end run using real spreadsheet data, real FFmpeg, but NO external writes |
| Config | `--dry-run` flag: Iconik fetch/upload skipped, Sheets write skipped, notifications skipped |
| Proves | Full chain works: intake → validate → reserve → edit → name → export |
| Needs | A real source video file + a real script ID from the SSS |

### 2A Deliverables

- [ ] `src/cli.ts` — CLI entry point
- [ ] `src/utils/sheets-adapter.ts` — Real Google Sheets implementation
- [ ] Interactive prompts at human checkpoints
- [ ] `resumePipeline()` in orchestrator
- [ ] `--dry-run` mode
- [ ] Tests for sheets adapter + CLI arg parsing
- [ ] Documentation: how to run Veda locally

### 2A Prerequisites from Christopher

| Item | Why | How to get it |
|------|-----|---------------|
| **Google Sheets credentials** | Real SheetsReader/Writer | Create a Google Cloud service account, download JSON key, share SSS spreadsheet with the service account email |
| **A real source video** | Dry-run test | Export any existing asset from Iconik (any format, any length) |
| **A real script ID** | Dry-run test | Pick any active Script ID from the SSS (e.g., "SC01" from DQFE) |

---

## Phase 2B: Complete the Pipeline

**Goal**: Veda produces real assets, renames them, uploads to Iconik.

### 2B.1 — Iconik Sub-Agents (Blocked)

| Sub-Agent | What | Status |
|-----------|------|--------|
| `asset_fetcher` | Download source asset from Iconik by name/ID | Blocked — needs Application Token |
| `asset_uploader` | Upload finished asset to correct editor folder | Blocked — needs Application Token |
| `metadata_manager` | Set title, metadata fields on uploaded assets | Blocked — needs Application Token |

**Prerequisite**: Iconik Application Token (Admin > Application Tokens in Iconik).

### 2B.2 — File Renaming

| Item | Detail |
|------|--------|
| What | After editing, rename output files from temp names to 15-position Asset IDs |
| Example | `hook_stack_v1.mp4` → `DQFE-SC01-v0030-mt-vt-m-exv-hs-bvo-gamc-vv-co-us-20260206-none.mp4` |
| When | Between Step 6 (naming) and Step 7 (upload) |

### 2B.3 — Production Pipeline Run

| Item | Detail |
|------|--------|
| What | Full pipeline: fetch from Iconik → edit → name → upload → notify → update spreadsheet |
| Test | Run against a real editing ticket (Christopher provides) |
| Gate | Human approval required at every checkpoint (no auto-approve in production) |

### 2B Prerequisites from Christopher

| Item | Why | How to get it |
|------|-----|---------------|
| **Iconik Application Token** | All 3 blocked sub-agents | Admin > Application Tokens in Iconik |
| **Real editing ticket** | End-to-end production test | Pick a low-stakes expansion from the pipeline |

---

## Phase 2C: Automate (v2 scope)

**Goal**: Veda runs as part of the weekly cadence with minimal human touchpoints.

| Feature | Description | Dependency |
|---------|-------------|------------|
| ClickUp integration | Create tasks on pipeline start, update statuses at each checkpoint | ClickUp API token |
| Tess recommendation intake | Tess outputs YAML recommendation → Veda auto-populates intake | Tess agent operational |
| Batch execution | Process multiple expansion tickets in sequence | 2A + 2B complete |
| Strategic Planning Dashboard | Leadership visibility into pipeline status, costs, throughput | Significant UI work |

**2C is not scoped in detail here** — it depends on 2A and 2B being proven in production first.

---

## Recommended Build Order

```
SESSION 015:  2A.1 (CLI) + 2A.3 (interactive prompts) + 2A.4 (resume)
              → Veda becomes a runnable local tool

SESSION 016:  2A.2 (Sheets adapter) — if Google credentials provided
              2A.5 (dry-run) — with real source video + script ID
              → Veda reads/writes real SSS data

SESSION 017+: 2B.1 (Iconik) — if Application Token provided
              2B.2 (file renaming)
              2B.3 (production run)
              → Veda produces real assets end-to-end

LATER:        2C (ClickUp, Tess intake, batch mode)
```

---

## What Christopher Needs to Provide

| Priority | Item | Effort | Impact |
|----------|------|--------|--------|
| **P0** | Google Sheets service account JSON key | 15 min | Unlocks 2A.2 |
| **P0** | A real source video (any asset from Iconik) | 5 min | Unlocks 2A.5 dry-run |
| **P0** | A real Script ID to test against | 2 min | Unlocks 2A.5 dry-run |
| **P1** | Iconik Application Token | 5 min | Unlocks 2B.1 (3 sub-agents) |
| **P2** | ClickUp API token | 10 min | Unlocks 2C |
| **P2** | NeuroCopy bot link + angle examples | 10 min | Unlocks angle quality improvements |

---

## Success Criteria

| Phase | "Done" means |
|-------|-------------|
| **2A** | `npx veda run --dry-run` completes all 10 steps with real SSS data, produces valid output files with correct Asset IDs |
| **2B** | Full pipeline run: Iconik fetch → edit → name → upload. Asset appears in correct Iconik folder with correct metadata. SSS spreadsheet updated. |
| **2C** | Tess recommendation → human approve → Veda executes → ClickUp task updated → asset live. Minimal human touchpoints. |
