# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the **Performance Golf (PG) main repository** — a multi-project monorepo containing marketing content, AI agent systems, copywriting assets, and creative operations for Performance Golf, a direct-response golf brand.

There are two top-level directories:
- **`_performance-golf/`** — PG's operational hub: product marketing, AI agent systems, creative OS, skills/prompts, swipe files, brand assets
- **`rich-schefren/`** — AI training content, agent frameworks, and methodology shared by Rich Schefren (advisor/partner)

## Architecture: PG Creative OS (Primary System)

The core system lives at `_performance-golf/pg-creative-os/`. It is a **four-agent operating system** with non-linear data flow:

```
Exa (strategic orchestration — sits above all)
├── Tess (intelligence — what's working, what to make next)
│   ├──→ Veda (production — creates video assets)  [via intake queue]
│   └──→ Neco (copy & briefs — how to say it)       [via data protocol]
└── Neco ──→ Veda  [copy scripts feed production]
```

| Agent | Role | Runtime | Folder |
|-------|------|---------|--------|
| **Exa** | Strategic Chief of Staff | Advisory (docs + pipeline) | `pg-creative-os/exa-chief-of-staff/` |
| **Tess** | Data Intelligence | Python (micro-skills + Google Sheets) | `pg-creative-os/tess-strategic-scaling-system/` |
| **Veda** | Video Production | Node.js + TypeScript (ESM, vitest) | `pg-creative-os/veda-video-editing-agent/` |
| **Neco** | NeuroCopy (ad copy) | Advisory (docs + reference files) | `pg-creative-os/neco-neurocopy-agent/` |

**Each agent has its own `CLAUDE.md` with session protocols, non-negotiables, and context budget rules. Always `cd` into the agent folder and read its CLAUDE.md before starting work on that agent.**

### Agent Routing

| Request Type | Route To |
|-------------|----------|
| Strategic review / 30-60-90 / meeting prep / delegation | **Exa** |
| Data analysis / performance trends / spreadsheet ops | **Tess** |
| Create video / expand ad / hook stack | **Veda** |
| Write ad copy / hooks / scripts / angle ideation / static image briefs | **Neco** |
| "What should we make next?" | **Tess** → then Neco or Veda |

### Tess Dashboard (Sub-project)

Next.js 14 dashboard at `pg-creative-os/tess-strategic-scaling-system/tess-dashboard/`. Read-only executive view of the Strategic Scaling System data.

```bash
cd _performance-golf/pg-creative-os/tess-strategic-scaling-system/tess-dashboard
npm run dev    # Dev server at localhost:3000
npm run build  # Production build
npm run lint   # ESLint
```

### Veda Commands

```bash
cd _performance-golf/pg-creative-os/veda-video-editing-agent
npm install    # Install deps
npm test       # Run tests (vitest)
npm run build  # Build
npx tsc --noEmit  # Type-check
```

## Other Key Areas

| Directory | Contents |
|-----------|----------|
| `_performance-golf/_pg-digital-products/` | Product marketing funnels (VSLs, sales pages, quizzes) |
| `_performance-golf/_pg-physical-products/` | Physical product launches (SF2, SPD, ONE.1, etc.) |
| `_performance-golf/_pg-guru-content/` | Instructor content (Hank Haney, Andrew Rice) |
| `_performance-golf/pg-skills/` | AI prompt skills, brand guidelines, quality standards |
| `_performance-golf/pg-swipes/` | Swipe file library organized by funnel page type |
| `_performance-golf/pg-shared-resources/` | Legacy swipe files, Todd Brown training materials |
| `_performance-golf/pg-marketing-os/copywriting-engine/` | Multi-layer copywriting skill system with quality gates |
| `rich-schefren/` | Agent frameworks, ZenithPro systems, methodology docs |

## Universal Rules

### iCloud Drive Safety (MANDATORY)

This project lives inside iCloud Drive. Terminal file operations can corrupt iCloud sync metadata.

- **NEVER rename or move directories via terminal (`mv`).** Propose the plan and let the user execute in Finder.
- **NEVER create directories that reuse names iCloud has previously tracked.** This triggers sync conflict loops.
- **Creating/editing files via terminal is safe.** Only directory-level restructuring causes problems.
- **`.nosync` pattern** for heavy-write directories: rename to `<dir>.nosync/`, create symlink `<dir>` → `<dir>.nosync`. iCloud skips `.nosync` directories entirely.
- If files become invisible in Finder: `chflags -R nohidden <path>`

### iCloud Git Guard

Before/after git write commands: `ls -la .git/index*` — if `index 2` exists, run `mv ".git/index 2" .git/index`.

### Data Integrity

**NEVER fabricate names, codes, metrics, or product claims.** If data is not found in source systems (SSS spreadsheet, ClickUp, Iconik), state "UNKNOWN" with a plan to obtain. Root angles come from SSS Column C. Product names come from PG's catalog.

### Session Protocol (All Agents)

Each agent uses a two-tier session log system:
- **SESSION-LOG.md** — Build State block (current snapshot) + recent sessions. Read the Build State FIRST on session start.
- **SESSION-LOG-ARCHIVE.md** — Compressed historical sessions.
- **Auto-archive** when SESSION-LOG.md exceeds 500 lines: compress all but the last 3 sessions before doing any other work.

### Phase-Stop Discipline (All Agents)

Decompose before executing. One phase, one stop. No exceptions. Complete one phase → report what changed → STOP → wait for user confirmation before next phase.

### Pre-Commit Gates

For Veda and Tess dashboard:
1. `npx tsc --noEmit` — zero errors
2. `npm test` — zero failures (Veda)
3. `npm run build` — clean build (Veda)

No `--no-verify`. If any gate fails, halt and fix first.
