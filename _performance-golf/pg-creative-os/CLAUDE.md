# PG Creative OS

> **Owner**: Christopher Ogle — Interim Creative Lead, Performance Golf
> **Path**: `/Users/christopherogle/Documents/The Sauce Vault/_performance-golf/pg-creative-os/`
> **Purpose**: Unified operating system for PG's creative department — four agents coordinating data intelligence, copy, video production, and strategic oversight under one roof.

---

## Architecture

The pipeline is **non-linear**. Tess feeds Veda directly AND feeds Neco in parallel. They are NOT a linear chain.

```
Exa (strategic orchestration — sits above all)
├── Tess (intelligence — what's working, what to make next)
│   ├──→ Veda (production — creates the assets)  [via intake queue]
│   └──→ Neco (copy & briefs — how to say it)    [via data protocol]
└── Neco ──→ Veda  [future: copy scripts feed production]
```

---

## Agent Map

| Agent | Role | Folder | Runtime |
|-------|------|--------|---------|
| **Exa** | Strategic Chief of Staff ("the strategist") | `exa-chief-of-staff/` | Advisory (docs + operational outputs) |
| **Tess** | Strategic Scaling System ("the brain") | `tess-strategic-scaling-system/` | Python (micro-skills pipeline + Google Sheets) |
| **Veda** | Video Editing Agent ("the hands") | `veda-video-editing-agent/` | Node.js + TypeScript (ESM, vitest) |
| **Neco** | NeuroCopy Agent ("the voice") | `neco-neurocopy-agent/` | Advisory (docs + reference files) |

Each agent has its own `CLAUDE.md` with full session protocols, non-negotiables, and context budget rules. **Always `cd` into the agent folder and read its CLAUDE.md before starting work on that agent.**

---

## Routing Rules

| User Request | Route To | Why |
|-------------|----------|-----|
| "Where do I stand?" / strategic review / 30-60-90 | **Exa** | Strategic oversight and scorecard tracking |
| Meeting prep / delegation / weekly update | **Exa** | Chief of Staff operations |
| Data analysis / what's working / performance trends | **Tess** | Data intelligence and classification |
| Spreadsheet operations / naming convention / asset tracking | **Tess** | Pipeline and data management |
| Create a video / expand an ad / hook stack | **Veda** | Video production and asset creation |
| Build pipeline / fix tests / TypeScript work (in Veda) | **Veda** | Engineering work on video system |
| Write ad copy / hooks / scripts / angle ideation | **Neco** | Copy generation and audience psychology |
| "Create a static image brief" / "image brief" / "ad brief" | **Neco** Sub-Agent #7 | Static image brief generation |
| "Wise reply" / "help me respond" / Slack response help | **Exa** Mode 8 | Communications advisory with stakeholder awareness |
| Recruiting / team evaluation / hiring framework | **Exa** | People strategy |
| "What should we make next?" | **Tess** → then **Neco** or **Veda** | Tess recommends, others execute |
| "Ingest video" / "video transcript" / "summarize YouTube" | **Skill** `/ingest-video` | YouTube → education intelligence pipeline (saves to `_shared/education/`) |

---

## Universal Governance

Each agent has Phase-Stop, Session Log, and Anti-Degradation rules in its own CLAUDE.md. Read the agent's file — these protocols are not duplicated here.

### Data Integrity

**NEVER fabricate names, codes, metrics, or product claims.** If data is not found in source systems (SSS spreadsheet, ClickUp, Iconik), state "UNKNOWN" with a plan to obtain. Root angles come from SSS Column C. Product names come from PG's catalog. No exceptions.

### iCloud Drive Safety (MANDATORY — ALL AGENTS)

This project lives inside iCloud Drive. Terminal-based file operations can corrupt iCloud's sync metadata, causing folders to become invisible in Finder (`hidden` flag) and triggering "data tree not found" errors.

**Rules:**
1. **NEVER rename or move directories** via terminal (`mv`) inside this project. If folder restructuring is needed, propose the plan and let the user execute it in Finder.
2. **NEVER create directories that reuse names iCloud has previously tracked.** iCloud caches directory metadata indefinitely — reusing old names triggers sync conflict loops.
3. **New files are safe** — creating or editing files via terminal is fine. Only directory-level restructuring (rename, move, delete+recreate) causes problems.
4. **If you must restructure**, use completely fresh directory names iCloud has never seen, and verify afterwards with `ls -lO` that no `hidden` flags appeared.
5. **Recovery pattern**: If files become invisible in Finder, run `chflags -R nohidden <path>` and check for iCloud conflict copies (files with ` <number>` appended before the extension).
6. **`.nosync` pattern for heavy-write directories (MANDATORY).** Any directory used for rapid/bulk file writes (pipeline output, downloaded media, build artifacts, test caches) MUST use the `.nosync` rename + symlink pattern: rename to `<dir>.nosync/`, create symlink `<dir>` → `<dir>.nosync`. iCloud skips `.nosync` directories entirely. Without this, rapid writes cause iCloud to create hundreds of conflict copies (e.g., `file 2`, `file 3`, ...). Veda has a code-level guard (`ensureICloudSafeDir()` in `src/utils/icloud-safe-dir.ts`) that enforces this automatically. Other agents should apply the pattern manually to their output directories.

**Known `.nosync`-protected directories:**
| Agent | Directory | Status |
|-------|-----------|--------|
| Veda | `output/` → `output.nosync/` | PROTECTED (code-enforced) |
| Veda | `source-videos/` → `source-videos.nosync/` | PROTECTED (code-enforced) |
| Tess | `output/` → `output.nosync/` | PROTECTED (symlink) |
| Tess | `.pytest_cache/` → `.pytest_cache.nosync/` | PROTECTED (symlink) |
| Tess | `tess-dashboard/node_modules/` → `node_modules.nosync/` | PROTECTED (symlink) |
| Neco | `_output/` | NEEDS PROTECTION — apply `.nosync` on next Neco session |

---

## Inter-Agent Bridges

| Bridge | Mechanism | Status |
|--------|-----------|--------|
| **Tess → Veda** | Intake Queue tab in SSS (18 cols). Veda reads via `--from-sheets` CLI. | LIVE |
| **Tess → Neco** | Data protocol — Tess provides performance data, audience segments, winning angles. Neco uses as context for copy generation. | DEFINED |
| **Neco → Veda** | Future copy handoff — Neco-generated scripts feed Veda production pipeline. | PLANNED |
| **Exa → All** | Strategic direction, scorecard alignment, Brand Thread assignments. Exa sits above all agents as consolidation layer. | LIVE |

---

## Shared Resources

| Resource | Path | Contents |
|----------|------|----------|
| LOMS Library | `_shared/loms-library/` | Look Over My Shoulder session captures |
| Ads Creative | `_shared/ads-creative/` | Ad angle library, templates, creative assets |
| Archive | `_archive/` | Deprecated or empty folders |

---

## Session Protocol

1. Identify which agent the user's request routes to (see Routing Rules)
2. Navigate to that agent's folder
3. Read that agent's `CLAUDE.md` — it contains the full session start protocol
4. Follow the agent's session protocol (each agent manages its own SESSION-LOG.md)
5. At session end, follow the agent's handoff protocol

**If a request spans multiple agents**, complete work in one agent fully before switching to the next. Never interleave agent work within a single phase.

**LOMS (`/loms-run`) is an end-of-day routine, not part of session handoff.** Runs automatically nightly via launchd (`com.performancegolf.loms-nightly`). Can also be run manually in a fresh session when needed.

---

## Session Log Management (ALL AGENTS)

### Two-Tier Compression Pattern

Each agent maintains two session files:

| File | Purpose | Updated |
|------|---------|---------|
| `SESSION-LOG.md` | Build State block (current snapshot) + recent sessions (detailed entries). Read FIRST on session start. | Every session end |
| `SESSION-LOG-ARCHIVE.md` | Compressed historical sessions (index + critical decisions + changelog). | When threshold triggers |

> **Note:** CHECKPOINT.yaml files were removed across all agents. The Build State block at the top of SESSION-LOG.md is the single source of truth.

### Auto-Archive Threshold (MANDATORY)

**If `SESSION-LOG.md` exceeds 500 lines, the FIRST phase of the next session is to compress.**

1. Move all but the **last 3 sessions** into `SESSION-LOG-ARCHIVE.md`
2. Preserve in the archive: session index (one-line per session), critical decisions (verbatim), changelog, git milestones
3. Remove verbose step-by-step narrative (recoverable from git history if needed)
4. Report the compression as a phase: lines before → lines after, sessions archived

**This is not optional.** If the threshold is hit, compression happens before any other work. The user has approved this as a standing protocol.

### Build State Verification (MANDATORY)

Before generating the handoff prompt at session end:
1. Re-read the Build State block at the top of `SESSION-LOG.md`
2. Verify it reflects ALL changes from the current session (session number, test counts, blockers, next steps)
3. If stale or missing updates, fix it BEFORE the handoff prompt
4. The handoff prompt must reference the Build State, not memory

### What Gets Preserved vs. Compressed

| Preserved (in archive) | Compressed (removed) |
|------------------------|---------------------|
| Critical architectural/design decisions | Step-by-step narrative ("I read this file, then...") |
| Session index with one-line summaries | Verbose debugging logs |
| Git milestones (commit → session → description) | Intermediate failed attempts |
| Key metrics changes | File read/write play-by-play |
| Inter-agent protocol decisions | Routine operations |
