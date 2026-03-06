# AGENTS.md

This file provides guidance to OpenAI Codex CLI when working in this repository.

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

Each agent has its own `CLAUDE.md` with session protocols and context rules. Read the relevant agent's CLAUDE.md before starting work on that agent.

### Agent Routing

| Request Type | Route To |
|-------------|----------|
| Strategic review / 30-60-90 / meeting prep / delegation | **Exa** |
| Data analysis / performance trends / spreadsheet ops | **Tess** |
| Create video / expand ad / hook stack | **Veda** |
| Write ad copy / hooks / scripts / angle ideation / static image briefs | **Neco** |
| "What should we make next?" | **Tess** → then Neco or Veda |

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

### Data Integrity

**NEVER fabricate names, codes, metrics, or product claims.** If data is not found in source systems (SSS spreadsheet, ClickUp, Iconik), state "UNKNOWN" with a plan to obtain. Root angles come from SSS Column C. Product names come from PG's catalog.

### Phase-Stop Discipline

Decompose before executing. One phase, one stop. No exceptions. Complete one phase → report what changed → STOP → wait for user confirmation before next phase.

## Copywriting Heuristics (Learned From Draft → Final Edits)

These rules apply to all spoken-word scripts, voiceover copy, and video walkthroughs across any offer.

1. **One Thought Per Line** — Break compound sentences into individual beats. Each line gets one idea.
2. **Name What They're Looking At — Immediately** — Tell the viewer what they're seeing in the first 3 seconds. Orientation before persuasion.
3. **Kill Stage Directions** — The script should read as speakable copy, not a screenplay. Only include visual notes when referencing a specific asset.
4. **Break Complex Ideas Into Tiny Sequential Beats** — 3-5 short lines that build on each other.
5. **Use Punctuation for Spoken Rhythm** — Ellipses create pauses. Italics create emphasis. Dashes create beats.
6. **Branch for the Viewer** — Address both situations: "If you've already done X... / If you need to do X..."
7. **Add a Safety Net** — After any action step, add one line that removes fear of getting stuck.
8. **Close With Emotion, Not Logistics** — End on what it means, not what it does.
9. **Shorter Sentences = More Authority** — Short declarative sentences land harder than compound ones.
10. **Conversational Connectors Over Structural Headers** — "And here's the cool part" beats `**NEXT SECTION**`.
