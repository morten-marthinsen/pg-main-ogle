# WORKSPACE.md

This is the single source of truth for all AI coding tools working in this repository. Tool-specific files (CLAUDE.md, AGENTS.md, GEMINI.md) reference this file for shared rules and context.

## Repository Overview

This is the **Performance Golf (PG) main repository** — a multi-project monorepo containing marketing content, AI agent systems, copywriting assets, and creative operations for Performance Golf, a direct-response golf brand.

There are two top-level directories:
- **`_performance-golf/`** — PG's operational hub: marketing OS, AI agent systems, creative OS, skills/prompts, swipe files, brand assets
- **`rich-schefren/`** — AI training content, agent frameworks, and methodology shared by Rich Schefren (advisor/partner)

## Key Areas

| Directory | Contents |
|-----------|----------|
| `_performance-golf/pg-marketing-os/` | Multi-layer copywriting engine — core message, VSLs, e-comm, pages, upsells, checkout, emails, ads, advertorials, organic |
| `_performance-golf/pg-creative-os/` | Four-agent system (Orion, Tess, Veda, Neco) — strategy, data intelligence, video production, ad copy |
| `_performance-golf/_pg-digital-products/` | Product marketing funnels (VSLs, sales pages, quizzes) |
| `_performance-golf/_pg-physical-products/` | Physical product launches (SF2, SPD, ONE.1, etc.) |
| `_performance-golf/_pg-guru-content/` | Instructor content (Hank Haney, Andrew Rice) |
| `_performance-golf/pg-skills/` | AI prompt skills, brand guidelines, quality standards |
| `_performance-golf/pg-swipes/` | Swipe file library organized by funnel page type |
| `_performance-golf/pg-shared-resources/` | Legacy swipe files, Todd Brown training materials |
| `_performance-golf/pg-marketing-os/copywriting-engine/` | Multi-layer copywriting skill system with quality gates |
| `rich-schefren/` | Agent frameworks, ZenithPro systems, methodology docs |

**Each system has its own documentation and instructions. Always read the system-level docs before starting work in that area.**

## Universal Rules

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

Apply these gates only when the relevant runnable project files are present in the current checkout. No `--no-verify`. If any gate fails, halt and fix first.

## Copywriting Heuristics (Learned From Draft → Final Edits)

These rules apply to all spoken-word scripts, voiceover copy, and video walkthroughs across any offer. They were extracted by comparing AI-generated drafts against human-edited finals.

### 1. One Thought Per Line
Break compound sentences into individual beats. Each line gets one idea the speaker can land before moving on. If a sentence has a comma followed by a new idea, it's probably two lines.

### 2. Name What They're Looking At — Immediately
Don't open with philosophy or setup. Tell the viewer what they're seeing in the first 3 seconds. Orientation before persuasion.

### 3. Kill Stage Directions
Don't lean on `[brackets]` as a crutch. The script should read as speakable copy, not a screenplay. Only include a visual note when referencing a specific asset (a link, a file, a demo). Transitions should BE the copy: "Let me show you how this works" — not `[Transition to screen share]`.

### 4. Break Complex Ideas Into Tiny Sequential Beats
If a concept needs explanation, break it into 3–5 short lines that build on each other. Each line is a setup for the next. The listener absorbs one piece, then the next. Dense paragraphs don't land in spoken copy.

### 5. Use Punctuation for Spoken Rhythm
Ellipses create pauses. Italics create emphasis. Dashes create beats. These aren't decorative — they're delivery instructions. Write the way a speaker breathes.

### 6. Branch for the Viewer
If the viewer could be in two different situations, address both: "If you've already done X... / If you need to do X..." This is especially critical for less tech-savvy audiences who freeze when instructions don't match their exact state.

### 7. Add a Safety Net
After any action step, add one line that removes fear of getting stuck: "If you run into any issues, we'll get you sorted." Reducing anxiety is as important as the instruction itself.

### 8. Close With Emotion, Not Logistics
The last line should be the feeling, not the feature. "You're one step away from the best version of this experience" beats "Click submit and you'll receive a response within 48 hours." End on what it means, not what it does.

### 9. Shorter Sentences = More Authority
In spoken copy, short declarative sentences land harder than compound ones. "Then, give you the smartest way to fix it — FAST." has more punch than a longer version saying the same thing.

### 10. Conversational Connectors Over Structural Headers
"And here's the cool part" beats `**NEXT SECTION**`. In a walkthrough, the speaker's voice IS the structure. Use natural transitions that a person would actually say while showing someone a screen.
