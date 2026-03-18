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

### No Unverified Claims

Never state anything as fact unless you have verified it in the current session. Search the internet. Read the file. Do not guess. Do not rely on training data. Do not offer to look it up — just look it up. Verify every claim, then show your proof. If verification fails, try another source. Exhaust every available tool before telling the user you could not verify.

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

## Performance Golf Brand Guidelines

### Tier 1: Visual Identity (MANDATORY)

Any skill producing visual output (HTML, CSS, page designs, ad creative, video assets, presentations) MUST load the PG brand system before generating output. These rules are non-negotiable and cannot be overridden by agent-specific instructions unless approved by the human.

**Load before any visual output:**
- Design System: `_performance-golf/pg-brand/pg-brand-guidelines/PG-DESIGN-SYSTEM.md`
- Visual Identity: `_performance-golf/pg-brand/pg-brand-guidelines/references/visual-identity.md`
- Logo Assets: `_performance-golf/pg-brand/pg-brand-guidelines/assets/logos/`

### Tier 2: Voice & Copy Defaults (DEFAULT — Agent Overrides Allowed)

Brand voice and copy guidelines apply as the DEFAULT for all PG content. Agent-specific or project-specific voice instructions (e.g., Neco's behavioral frameworks, Soul.md project overrides) take precedence within their scope. When no agent-specific voice is defined, Brixton is the default.

**Load for any customer-facing copy:**
- Brand Voice & Copy: `_performance-golf/pg-brand/pg-brand-guidelines/pg-copy-voice.md`
- Brand Skill (combined): `_performance-golf/pg-brand/pg-brand-guidelines/brand-guidelines-skill.md`

**Copy restrictions apply universally regardless of voice:** Hank Haney = "Tiger's FORMER coach". Never "USGA approved" → "conforms to the rules of golf". Never mention: Golf Fanatic, Moe Norman, Dustin Johnson, Titleist, Sir Nick Faldo. See `pg-copy-voice.md` for full list.

---

## Copywriting Heuristics (Learned From Draft → Final Edits)

These rules apply to all spoken-word scripts, voiceover copy, and video walkthroughs across any offer. They were extracted by comparing AI-generated drafts against human-edited finals.

### 1. One Thought Per Line
Break compound sentences into individual beats. Each line gets one idea the speaker can land before moving on. If a sentence has a comma followed by a new idea, it's probably two lines.

### 2. Name What They're Looking At — Immediately
Don't open with philosophy or setup. Tell the viewer what they're seeing in the first 3 seconds. Orientation before persuasion.

### 3. Break Complex Ideas Into Tiny Sequential Beats
If a concept needs explanation, break it into 3–5 short lines that build on each other. Each line is a setup for the next. The listener absorbs one piece, then the next. Dense paragraphs don't land in spoken copy.

### 4. Use Punctuation for Spoken Rhythm
Ellipses create pauses. Italics create emphasis. Dashes create beats. These aren't decorative — they're delivery instructions. Write the way a speaker breathes.

### 5. Add a Safety Net
After any action step, add one line that removes fear of getting stuck: "If you run into any issues, we'll get you sorted." Reducing anxiety is as important as the instruction itself.

### 6. Close With Emotion, Not Logistics
The last line should be the feeling, not the feature. "You're one step away from the best version of this experience" beats "Click submit and you'll receive a response within 48 hours." End on what it means, not what it does.

### 7. Shorter Sentences = More Authority
In spoken copy, short declarative sentences land harder than compound ones. "Then, give you the smartest way to fix it — FAST." has more punch than a longer version saying the same thing.

### 8. Every Element Must Earn Its Spot
The default is exclusion, not inclusion. Before including any beat — countersell, emotional close, proof stack, future pace, repetition — the piece must be worse without it. If removing it makes the copy tighter without losing anything, it didn't earn its place. This isn't about format or length. It's about whether each element is doing work that nothing else in the piece is already doing.

### 9. Complete the Proof Point — Land the Result
When you cite a credential, finish the story. Don't stop at the event — land the outcome. "The doctor who put together Tiger Woods' recovery plan after his spinal fusion" is a credential. "On his way to winning the 2019 Masters" is the proof. The credential earns attention. The result earns belief.

### 10. Close on Benefit, Not Mechanism
By the time you reach the close, the mechanism has been explained. Don't re-explain it. The close is where you land what it means for the golfer — what they get, how it feels, what changes. The reader already knows how it works. Tell them what they walk away with.

### 11. Show, Don't Tell
Never announce what the reader should feel or conclude — create the experience that makes them feel or conclude it on their own. "The first win comes fast" is telling. "Shots you couldn't hit last week start landing" is showing. Telling requires the reader to trust you. Showing lets them see it for themselves. If you can delete a sentence and the reader still gets the point from the surrounding picture language, the sentence was telling. Delete it.

### 12. Kill Clichés on Sight
"Something clicks." "Everything changes." "It all comes together." "Take your game to the next level." These are dead phrases — they've been used so many times they no longer create any image or feeling in the reader's mind. Every sentence must do real work. If a phrase could appear in any ad for any product in any industry, it's a cliché. Replace it with language that is specific to the person, the moment, and the feeling — or delete it entirely.
