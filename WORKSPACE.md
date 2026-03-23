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

### Who the User Is

Not a developer. Uses Claude Code, Codex, and Gemini CLI for marketing copywriting, sales funnel creation, and building tools for his businesses. Keep explanations simple — no unnecessary technical jargon. Direct communicator, zero tolerance for fluff or hedging.

### Date/Time Rule — ET Is the Only Timezone That Matters

The user is in Eastern time. The system clock runs UTC, which can be 4-5 hours ahead — meaning UTC may show a different date than what the user is actually living. Any time a request involves "today," a date, or a day of the week, run `TZ=America/New_York date` first. Use that output as the ground truth. Every time. No exceptions.

### Only Change What You're Told to Change

Never delete, remove, or restructure content unless the user explicitly tells you to. "Update" means correct in place. "Out of date" means fix it, not delete it. If you're about to remove something the user didn't mention removing — stop, and ask first.

### Know Before You Speak

**NEVER** tell the user to do something, ask if something needs doing, or state something as a fact without verifying it first. Always check the actual state (git status, file contents, etc.) before making any claim.

### Working Style

- Make edits and commit locally. Only push when the user says to, or when a stop hook requires it.
- Be direct. No filler, no fluff.
- When the user asks for a change, make it. Don't ask for confirmation unless there's genuine ambiguity.
- The user prefers autonomous execution — interview upfront, then execute everything without interruption.
- Always call out what's being committed before pushing to GitHub. Don't silently commit and push during iterative work.

### File & Folder Naming

- All lowercase
- No spaces — use hyphens (`-`) instead

### Bash Permissions

**NEVER use `Bash(*)` wildcard.** Always use the granular curated Bash permission list so destructive commands (`rm`, `git reset --hard`, `git checkout --`, etc.) require user approval. The comprehensive list of non-destructive commands is in `.claude/settings.json`.

### Continuous Improvement

After any exchange where there's a significant learning, mistake, user correction, or breakthrough that would improve future sessions — update the relevant instruction file with a new rule or refinement. Don't wait to be asked.

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

## Copywriting Principles — Persuasion Craft

These principles govern how to write copy that persuades. They are grounded in how humans process information, form beliefs, and make decisions. They apply to any persuasion deliverable — sales pages, e-comm, VSLs, emails, ads, scripts — and are not specific to any tool, LLM, or workflow.

Principles are extracted from real draft-to-final editing sessions. Each one traces back to a psychological mechanism — not a surface-level rule about word choice or sentence structure.

### How Readers Process Information

**Every word the reader has to parse is a word they're not feeling.** Ambiguous pronouns, unclear antecedents, and vague references create cognitive friction. In persuasion, friction kills momentum. When a reader backtracks to figure out what "it" refers to, they've left the emotional flow and entered analytical mode. Name the thing. Resolve one idea before introducing the next.

**Effort without payoff is a demand — effort with payoff is an invitation.** When you describe what the reader will do ("the one thing to work on right now"), you're asking for effort. If you state effort without payoff, the reader's unconscious response is resistance. Pair it with the payoff ("the one thing to work on right now to get better faster") and effort becomes a path, not a cost. This applies everywhere — including pricing sections. "Add up what you've spent" is math homework. Lead with the feeling of wasted money first, then let the numbers validate what they already feel.

**Either zoom out or zoom in — never split the difference.** When presenting multiple components, features, or benefits, you have two clean choices: describe the group's purpose at a high level, or give each item its own dedicated space. Cramming multiple items into a single clause ("matches you with a coach, and adapts the more you use it") creates a blur where nothing lands. The reader processes it as a list they're skimming past, not as distinct value.

**Passive voice kills momentum — unless the reader is the object.** "Your root swing flaw is found" is dead — no subject, no agency, no momentum. "The Smart System finds your root swing flaw" has someone doing something. But "You've been treated your whole golf life" is passive and powerful — because the reader is the victim, and the passivity reinforces that something was done TO them without their knowledge. Use active voice when you want momentum. Use passive voice when you want the reader to feel acted upon.

**Don't use jargon the reader hasn't been taught.** "Compensations dissolve" assumes the reader understands compensation patterns. They don't. Internal mechanism language belongs in internal docs. On the page, translate every concept into the experience the reader already knows. "The other problems in your swing start fixing themselves" says the same thing — in language a golfer at the range would actually use. The exception: when the frame claim has deliberately installed vocabulary (like "symptom" in quotes), that word is now earned and can be used throughout the page. Jargon the frame claim taught is no longer jargon — it's shared language.

### How Belief Forms

**The problem section must define the root cause, not describe the symptoms.** The purpose of a problem section is to name the ONE thing the product addresses and make the reader feel it. Symptoms and patterns are supporting evidence — they validate the reader's experience. But they are not the problem itself. Define the root cause first. Then use symptoms to prove it's been operating in their life all along. The root cause is the star.

**Analogies earn their place by transferring emotional certainty.** The best analogies transfer the emotional weight of something the reader already believes onto something they don't yet believe. "You would never let a doctor prescribe treatment without first running a diagnostic" maps onto a conviction the reader already holds. That certainty transfers onto the new claim. But placement matters: an analogy that arrives before the reader understands the problem is abstract. An analogy that arrives AFTER the counter-sells have shown every method failing becomes a gut punch. Set up first, then analogize.

**A binary frame's length should match its structural weight.** A binary frame presents two mutually exclusive outcomes. When the binary is the foundational claim of the entire piece, it can afford to be expansive — each "no matter how much..." drives a nail deeper. When the binary is supporting a point already made, compress it. The question isn't "shorter is better" — it's "how much weight does this idea need to carry from here forward?"

**A binary frame must show both sides — and the positive side must reflect the reader's own aspiration.** The negative side names consequences the reader already feels. The positive side must be the reader's own words for what they want — not a product claim. A claim they can argue with ("you will never improve") loses to something they already know is true ("you struggle to consistently improve"). A promise they've heard before ("you're guaranteed to get better") loses to the sentence already running in their head ("you start playing the golf you know you're capable of"). Mirror their aspiration, don't invent one.

**A consequence without a reason is a claim. A consequence with a reason is an insight.** "You will never improve" is a claim the reader can reject. "You will struggle to improve, because every fix you try is treating a symptom, not the cause" is an insight — the reader can't reject it because the mechanism is self-evident. Every negative consequence in a binary frame needs its "because." The because transforms a threat into an explanation.

**Recognition beats proclamation.** "You will never improve" is an absolute the reader can argue with — they've improved before, even if slightly. "You will struggle to consistently improve" describes what they already feel. Absolutes trigger skepticism because the reader searches for the exception. Experiential language triggers recognition because the reader is already living it. Frame claims built on recognition feel true. Frame claims built on proclamation feel like marketing.

**Social proof connects through shared experience, not aspirational distance.** Founder stories, testimonials, case studies, endorsements — they all work the same way. If the subject's story leads with extraordinary achievement, the reader disconnects — "that's not me." The relatable part is the shared frustration: hitting a wall, trying everything, nothing working. Lead with the experience the reader recognizes. The achievement is context, not the hook.

**Match the frame to the market's dominant emotional state.** A pain-focused market needs the problem to sit in consequences — money wasted, effort with nothing to show. The mechanism solves a problem. Hope comes after, and it should be shorter. A hope-focused market needs the solution to lead. The mechanism enables a possibility. The problem section is shorter because the reader doesn't need to be convinced something is wrong — they need to be shown something better exists. The mistake is leading with hope in a pain market (the reader hasn't arrived there yet) or leading with pain in a hope market (the reader resists being told they're broken when they don't feel broken).

### How Persuasion Sequences

**The reader can only feel a problem through the lens they're currently holding.** When the product addresses a root cause the reader doesn't yet know exists, the problem will land as ordinary frustration rather than devastating revelation — unless you give them the lens first. A frame claim plants a new belief that transforms how the reader evaluates their own experience. The frame is educational — it introduces a new idea. The problem is experiential — it applies that idea to the reader's life. When the idea is significant enough, it needs its own room to breathe before you put it to work. The frame claim also installs vocabulary — words like "symptom" in quotes teach the reader a new category. By the time they hit the problem section, they're already fluent in the language the rest of the page depends on.

**An idea's real estate should match its weight in the argument.** The more important an idea is to the case being built, the more space it gets — its own section, its own headline, its own visual treatment. A binary frame that carries the entire argument deserves an expansive standalone section. A supporting proof point earns a sentence. Burying a load-bearing idea inside another section as a paragraph signals to the reader that it's supporting detail, not a foundational claim. If the piece would collapse without the idea, give it the real estate that signals: this matters, pay attention, everything that follows depends on this.

**Each section's job is partially to set up the next section.** Sections don't exist in isolation. The ATF creates curiosity that the frame claim satisfies. The frame claim creates a worldview that makes the problem devastating. The problem creates tension that the solution releases. When writing a section, ask: "What does the reader need to believe or feel BEFORE they hit the next section?"

**Headlines must work twice — for the reader and the scanner.** A scanner who reads only headlines should get the argument's skeleton. A reader going top to bottom should feel momentum. The best headlines do both — they make sense in isolation AND feel like the next logical step.

**Throat-clearing copy is an exit ramp.** Readers are actively looking for a reason to scroll away — and throat-clearing gives them one. "What I am about to share with you is the reason nothing you have tried has worked" is dead air that gives the reader permission to leave. Every line must either advance the argument or deepen the stakes. If a line announces what's coming instead of delivering it, cut it.

**Clarity over clever. Always.** When clarity and cleverness compete, clarity wins. This mirrors the Schley framework: DSI first (the clear difference), micro-script second (the catchy expression of it). Catchy without clear is a clever phrase with nothing behind it. Earn the micro-script by first stating what it is, what it does, and what the outcome is. The crystallizing line lands at the end of a section — at the beginning, it's a riddle.

**Don't reveal price before establishing value.** Price without context triggers comparison shopping ("Is $399 a lot for a golf app?") rather than desire ("I need this — what does it cost?"). The reader must first understand what they'd lose by NOT having the product. Only after the problem, solution, and proof have done their work does price become meaningful.

**Every milestone must deliver a payoff before introducing the next challenge.** Don't rush past the reward. If the promise is "fix your root swing flaw," the reader needs to FEEL what that fix delivers — lower scores, confident swings, enjoyment — before caring about what comes next. A timeline that jumps from problem to problem without landing the win trains the reader to expect effort without reward.

**Never introduce doubt anywhere on the page.** Guarantees, FAQ questions, objection handling — none of them should make the reader imagine failure. "If you're not satisfied" plants doubt. "The Smart System will change your game. If it doesn't — one email, every penny back" reinforces confidence. "What if I don't improve?" forces the reader to picture not improving. "How fast will I see results?" addresses the same concern while assuming success. Every element that touches risk should frame the product as inevitable, not uncertain.

**Counter-sells create the gap — outposition, don't trash.** The goal isn't to say alternatives are bad. It's to show they're incomplete in a specific way only your product addresses. "YouTube — great coaches giving great advice... that may or may not apply to your swing" acknowledges value while making the gap self-evident. The reader should finish thinking "none of these are wrong, but none solve my actual problem." That's persuasive because the reader knows the alternatives aren't scams and will resist being told they are.

### How Copy Lands (Sentence and Paragraph Level)

**One thought per line.** If a line has a comma followed by a new idea, it's two lines. Compound sentences split attention between two concepts and neither lands with full force. In spoken copy this is non-negotiable. In written copy it's nearly as important — readers scan, and a compound sentence forces them to process two things in the space they budgeted for one.

**Shorter sentences carry more authority.** Short declarative sentences land harder because they mimic the rhythm of conviction. People who are certain speak in short sentences. People who are hedging speak in long ones. The copy should sound certain.

**Lead with the thing, not the approach to the thing.** First drafts almost always open with a setup paragraph the reader doesn't need — the writer needed it to find their way in. Lead with the thing itself. In video and walkthroughs, this means naming what the viewer is looking at in the first 3 seconds — orientation before persuasion.

**Punctuation is delivery instruction.** Ellipses create pauses. Dashes create beats. Italics create emphasis. These aren't decorative — they tell the reader (or speaker) how to experience the rhythm of the sentence. Write the way a speaker breathes.

**Close on benefit and feeling, not mechanism and logistics.** The last line of any section should be the emotion, not the feature. By the close, the mechanism has been explained — don't re-explain it. Land what it means for the reader: what they get, how it feels, what changes. "You're one step away from the best version of this experience" beats "Click submit and you'll receive a response within 48 hours."

**Break complex ideas into tiny sequential beats.** If a concept needs explanation, break it into 3-5 short lines where each sets up the next. The reader absorbs one piece, then the next. Dense paragraphs that attempt a complex idea in a single pass don't land — the reader either skims or re-reads, and both break flow.

**Repetition is critical — redundancy is unacceptable.** Repetition is the golden thread: a core message reappearing across sections, in different contexts, doing different work each time. "Root swing flaw" in the problem section is the thing never identified; in the solution, the thing the system finds; in the proof, the thing competitors ignore; in the close, the thing that makes improvement inevitable. Same phrase, different job. That's essential. Redundancy is when two elements say the same thing the same way — a subhead and a paragraph restating the same claim. Pick the stronger version, kill the other.

**Every element must earn its spot.** The default is exclusion, not inclusion. Before including any beat, the piece must be worse without it. If removing it makes the copy tighter without losing anything, it didn't earn its place. This isn't about length — it's about whether each element is doing work nothing else is already doing.

**Show, don't tell.** Never announce what the reader should feel — create the experience. "The first win comes fast" is telling. "Shots you couldn't hit last week start landing" is showing. Telling requires trust. Showing lets them see it. Test: if you can delete a sentence and the reader still gets the point from the surrounding picture language, the sentence was telling. Delete it.

**A sequence of points needs a final punch to land.** When you build a case through a series of points — counter-sells, proof elements, examples — each one adds weight. Without a final line that drives it home, the sequence dissipates like a sentence that stops mid-thought. One sharp line after the sequence completes the thought and gives the reader something definitive to carry forward.

**Make the reader the subject of the analogy's second half.** "That is the equivalent of a doctor prescribing treatment without ever running a diagnostic" is the analogy. "When it comes to your health, you would NEVER do that" turns the reader into the protagonist. "But that's the approach you're taking every single day with your golf game" makes the contradiction personal. An analogy that stays abstract informs. An analogy that turns personal motivates.

**Vague action language sounds like work, not value.** "Builds everything around fixing it." "Creates a comprehensive solution." These describe what the SYSTEM does without telling the reader what THEY get. Replace vague action language with concrete outcome language. "Shows you step by step exactly how to fix it" tells the reader what their experience will be. "Builds everything around fixing it" tells them the system is busy. This applies at every scale — individual phrases, feature descriptions, multi-part systems, and scale claims. Six steps can feel like six chores. "$5M invested" is about the company. "$5M invested to solve one problem with your golf game" is about the reader. Position the reader as the beneficiary, not the operator. If a number, investment, or system description doesn't connect to the reader's life, it's a vanity metric.

**Kill cliches on sight.** "Something clicks." "Everything changes." "It all comes together." "Take your game to the next level." Dead phrases — they create no image or feeling. If a phrase could appear in any ad for any product in any industry, it's a cliche. Replace with language specific to the person, the moment, and the feeling — or delete entirely.

**Complete the proof point — land the result.** When you cite a credential, finish the story. "The doctor who put together Tiger Woods' recovery plan after his spinal fusion" is a credential. "On his way to winning the 2019 Masters" is the proof. The credential earns attention. The result earns belief.

**Data proves a point by its scale, not just its accuracy.** A 5-year stat is a data point. A 40-year stat is a verdict. "Handicaps haven't moved from 2020 to 2025" is true but feels like a blip. "3 strokes of improvement in 40 years" encompasses entire generations of effort and still shows almost nothing changed. Larger-scale data carries exponentially more emotional weight — but only up to the reader's believability ceiling. If a claim stretches too far beyond what the reader already believes, they dismiss it regardless of the evidence. The exception: when the reader WANTS to believe (pain-market golfers who already feel stuck), their ceiling is higher because the data validates their desire. Match the scale to what the reader is ready to accept — and to how badly they want it to be true.

**Data cards show the delta, not the baseline.** "14.2 average handicap" requires the reader to know if 14.2 is good or bad — it's a number without context. "3 strokes in 40 years" is self-contextualizing — the reader instantly knows 3 is almost nothing and 40 years is forever. "1%" is self-contextualizing — the reader knows 1% is negligible. The change is the story. The baseline is supporting context. Always lead with the delta.

> **How this section grows:** After each draft-to-final editing session, trace each correction back to the psychological mechanism behind it. If the principle already exists here, the correction is a signal the principle wasn't followed. If the principle doesn't exist, write it: name the mechanism, explain why it works, and make it concrete enough that any writer could apply it without further instruction. Principles must be rooted in human psychology and persuasion — NOT rigid "always do Y instead of X" substitution rules. A writer with 20 deep principles makes better judgment calls than one with 500 brittle rules. Structure as two tiers: (1) deep principles grounded in how humans process information, make decisions, and respond to persuasion — universal across all deliverables; (2) deliverable-specific patterns showing how those principles manifest in a particular format. The system must be tool/LLM-agnostic — written as craft knowledge any writer (human or AI) could apply.
