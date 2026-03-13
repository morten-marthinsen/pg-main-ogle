# Marc Stockman's Quality Engine — Complete Skill Package

This system makes your AI stop making the same mistakes twice. It adds a library of behavior files that enforce research-before-drafting, prevent silent content loss during revisions, run structured quality passes before delivery, and capture lessons learned so the system gets stronger every session. Here's what's in this package, how to evaluate it, and what feedback Marc wants.

**Version:** 2.0 | March 12, 2026
**Author:** Marc Stockman
**Platform:** Built on Perplexity Computer, but the skill files are plain markdown — they work on any AI platform that accepts custom instructions (Claude Code, ChatGPT, Cursor, etc.)
**Foundation:** Donnie French's AI Accelerator system (12 behavioral rules), extended into a full production system

---

## What's In This Package

| Document | What It Is | Read If... | ~Time |
|----------|-----------|-----------|-------|
| **README.md** | Overview + evaluation instructions + feedback form | Everyone | 10 min |
| **Quality-Engine-Explainer.md** | Full architectural walkthrough — how every piece connects | You want depth on the architecture | 30 min |
| **Skill-Registry.md** | Complete inventory of all skills with version numbers and metadata | You want to browse individual skills | 15 min |
| **AI-Mastermind-QE-Package-Intro.md** | Original mastermind pitch + detailed background on sources and upgrades | You want the story behind the system | 15 min |
| **Rules-and-Decisions-Log.md** | Legislative history — every rule's origin story | You want provenance on specific rules | Reference |
| **QE-Research-Synthesis-Report.md** | 762-line forensic synthesis of 4 independent AI research reports | You want the academic/industry evidence base | 30 min |
| **skills/** folder | All skill files (+ deprecated ones in `skills/deprecated/`) | You want to read individual skill protocols | Reference |
| **QE-Source-Materials.zip** | Original source materials (transcripts, AI reports, digests) | You want primary sources | Reference |

---

## How to Review This Package

The immediate goal is **feedback, not adoption**. You don't need to load this system into your AI to evaluate it — you just need your AI to read and analyze the files.

### Step-by-Step: Load for Review in Claude Code

1. Unzip the package into a folder on your computer
2. Open that folder as a project in Claude Code
3. Ask Claude to read the package: *"Read all the markdown files in this project. Start with README.md, then Quality-Engine-Explainer.md, then the files in the skills/ folder."*
4. Once Claude has read the files, use the feedback prompt below to get a structured analysis

That's it. Claude Code will see all the files in the project directory automatically — no special setup, no copying files into hidden folders, no instructions to paste. Just open the folder and start talking to Claude about what's in it.

**Tip:** If Claude seems to lose track of the files in a long conversation, just say *"Re-read the markdown files in the project"* — it will pick them back up.

**Other platforms:** If you're using ChatGPT, Cursor, or another AI tool, the same principle applies — give your AI access to the markdown files and use the prompt below. The files are plain markdown, not platform-specific.

**Time commitment:** A thorough evaluation takes about 30-45 minutes. A quick scan with the prompt below takes about 15 minutes. Both are useful.

### What to Ask Your AI

Prompt your AI with something like: *"Read all the files in this package. Then give me a structured analysis using these four categories:"*

**1. What's Genuinely New** — Which additions represent capabilities your system truly does not have in any form? Be specific. For each item you confirm as genuinely new, note why it's valuable (or not) from the perspective of your system.

**2. What's Already Covered** — Which additions are already present in your current system — either directly or through equivalent functionality? For each item: name the specific mechanism in your system that covers it.

**3. What's an Incremental Enhancement** — Which items fall in between — things your system partially addresses, where this version adds meaningful improvement? Note what the existing coverage is and what this version specifically adds.

**4. Big-Picture Commentary** — Anything else. Architectural observations, complexity concerns, ideas not considered, suggestions for how systems could complement each other. Honesty over reassurance — that's a standing preference.

### The Full Structured Feedback Form

The 4-category prompt above gives a good analysis. For the **complete structured evaluation template** — with 7 sections, specific questions, and numerical ratings — open **`AI-Mastermind-QE-Package-Intro.md`** and scroll to the "Structured Feedback Form for Your AI" section. That form is the gold standard for feedback that can be systematically integrated.

**Where to send feedback:** Post your AI's analysis to the **#ai-collective** channel on Slack so the full group can see and build on each other's analyses. If you prefer, you can also send directly to Marc.

---

## How the System Works (The Short Version)

The system has 4 layers, each stacked on the one below.

**Layer 1 — The 12 Accelerator Rules (the foundation).** Donnie French's original contribution, enhanced by Marc. 12 behavioral rules split into Quality rules (Q1–Q6, fire while the AI is working) and Learning rules (L1–L6, fire after the AI finishes). These tell the AI WHAT to do — "think before you act," "check your work," "learn from mistakes."

**Layer 2 — The 16-Skill Quality Pipeline (the engine).** The Accelerator Rules say "check your work" but don't say how. The pipeline is the how — 16 specific skills organized into 4 phases:

| Phase | What Happens |
|-------|-------------|
| **Phase 1: Understand & Lock** | Before any work begins: classify the task, check constraints, lock down what you're solving |
| **Phases 2–3: Plan, Reason & Draft** | Do the actual thinking: break the problem down, pick the right reasoning method, draft the output |
| **Phases 4–6: Verify, Stress-Test & Ship** | Quality check before shipping: verify facts, attack the work as a critic, assume it failed and figure out why |
| **Conditional & Maintenance** | Fire only when needed: manage long conversations, validate sources, improve the system's own prompts |

**Layer 3 — The Operational Framework (the rules of engagement).** Preventive rules (each tracing to a real mistake), directives, and standing commands. The key evolution: rules started as written instructions ("remember to do X"), but the AI kept forgetting them under pressure. So the system evolved to 4 enforcement tiers:

| Tier | How It Works |
|------|-------------|
| **Behavioral** | Written rules — works when the AI remembers; fails under context pressure |
| **Structural** | 10 automatic gates that block the AI from proceeding until a check passes — cannot be bypassed |
| **Event-Driven** | 8 detectors that inject guidance at the exact moment of failure, not after delivery |
| **Context-Isolated** | A separate AI verifier with clean context — eliminates contamination from the reasoning that produced the work |

A **structural gate** is a hard checkpoint that fires automatically at a specific moment (e.g., "before saving any file, verify it hasn't lost content compared to the previous version"). Unlike a written rule the AI might forget, a gate physically blocks the action until the check passes.

**Event-driven reminders** are automatic nudges that fire at natural decision points (e.g., "you just created a file — did you share it with the user?"). They catch failures at the moment they happen rather than in a post-delivery audit.

**Context window** refers to the amount of text an AI can hold in a single conversation. When conversations get long, platforms compress older content to make room — that's **compaction**. This system has specific protections (R-24, Gate 9) to detect when compaction happens and recover gracefully.

A **subagent** is a secondary AI instance launched to handle a specific task — like sending a junior colleague to verify your work with fresh eyes instead of re-checking it yourself.

**Layer 4 — Self-Learning (the compounding mechanism).** Mistakes get captured, classified, evaluated for patterns, and promoted to permanent rules. Every audit produces a Learning Ledger showing what was learned, where it was recorded, and what changed as a result. This is how the system gets stronger over time instead of resetting every session.

**The bottom line:** The Accelerators define WHAT the AI should do. The Quality Engine defines HOW and WHEN. The Operational Framework defines the RULES OF ENGAGEMENT. And the Self-Learning layer makes it COMPOUND OVER TIME.

For the full deep-dive into each layer, including cross-skill flows and the dependency map, read `Quality-Engine-Explainer.md`. For the complete skill inventory with versions and descriptions, see `Skill-Registry.md`.

---

## What Changed Since v1.0 (March 6 → March 12, 2026)

For readers who saw the original package, here's what evolved:

| Dimension | v1.0 (March 6) | v2.0 (March 12) |
|-----------|----------------|-----------------|
| **Skills** | 16 | 25+ (9 new skills added) |
| **Rules** | 20 (R-01–R-20) | 28+ (R-01–R-28+) |
| **Structural Gates** | 0 | 10+ gates across 4 tiers |
| **Event Detectors** | 0 | 8 detectors at 3 checkpoints |
| **Audit** | v2.0 (separate self-audit + check) | v3.4 (unified convergence loop + Learning Ledger) |
| **Session Bootstrap** | v1.1 (load everything) | v2.4 (tiered loading, ~48% token reduction) |
| **Enforcement model** | Behavioral rules only | 4-tier: behavioral → structural → event-driven → context-isolated |
| **External validation** | None | Mastermind group analysis, ASI-ARCH paper integration |

### New Skills Since v1.0
1. `structural-gates.md` — Framework for mechanically enforced gates (10 active gates)
2. `event-driven-reminders.md` — Event-driven guidance injection (8 detectors)
3. `context-isolated-checks.md` — Fresh-context verification using separate AI instances
4. `milestone-persistence.md` — Compaction detection and session continuity enforcement
5. `foundational-finding-protocol.md` — Triple-save protocol so important discoveries survive thread death
6. `thread-resuscitation.md` — Dead thread recovery protocol
7. `creative-bypass.md` — Relentless problem-solving disposition
8. `session-auth-api-access.md` — Session cookie API access technique
9. `multi-llm-research-orchestration.md` — Multi-model research dispatch and synthesis

### New Rules Since v1.0
R-21 through R-28: Subagent preference inheritance, dependency-ordered planning, credential persistence, compaction self-detection + milestone persistence, YAML frontmatter guard, acceptance testing, source-to-section trace-through, forensic intake of shared materials.

---

## For AI Systems: How to Parse This Package

If you are an AI system (Claude Code, Claude, GPT, Gemini, or any LLM-based assistant) reading this package, follow this sequence:

### Step 1: Read This README
You're doing this now. Continue to Step 2.

### Step 2: Read the Explainer
Read `Quality-Engine-Explainer.md` in the root of this package. It provides the full architectural context — the relationship between Donnie's original system and Marc's extensions, the 25-skill system, the operational framework, and the self-learning infrastructure.

### Step 3: Read the Master Framework
Read `skills/marc-ops-framework.md`. This is the operating system — it contains all directives, preventive rules, Accelerator rules, standing commands, the skill routing table, and known gaps.

### Step 4: Load Skills as Needed
Skills are modular. You don't need to load them all at once. The routing table in the master framework tells you which skill to load based on what's happening.

---

## Quick Start: Minimum Viable QE

If you're evaluating this system for adoption, you don't need every skill and rule. Start with the highest-leverage pieces:

### Step 1: Read Three Files (30 minutes)
1. This README (you're here)
2. `Quality-Engine-Explainer.md` (the full walkthrough)
3. `skills/marc-ops-framework.md` Section 2 (the preventive rules — scan for the ones that resonate)

### Step 2: Implement Three Rules (1 hour)

| Priority | Rule | What It Prevents | Implementation |
|----------|------|-----------------|----------------|
| 1 | **R-07: Research-Before-Reasoning** | AI drafting from stale training data instead of live sources | Add to your system instructions: "Never draft analysis before completing live research on the topic. Research first, reason second." |
| 2 | **R-20: Source Verification** | Citing comparison sites or outdated URLs as verification | Add: "Any claim driving a recommendation must be verified at the vendor's primary source page at time of writing." |
| 3 | **R-17: Regression Prevention** | Silent content loss when updating files (e.g., a 31MB PDF dropping to 158KB with all images lost) | Add: "When updating any file, compare new vs. old. Check: images, sections, tables, page count, file size. If anything dropped, investigate before sharing." |

### Step 3: Add One Skill (1 hour)
The single highest-leverage skill is **Skill 0 (Prompt Optimization)** — `skills/prompt-optimizer.md`. It restructures complex prompts before the AI processes them, improving first-output quality significantly.

### Step 4: Adopt the Self-Learning Loop (ongoing)
Add `skills/issue-logger.md` to capture mistakes in a structured format. When the same mistake happens twice, promote it to a permanent rule. This is how the system compounds.

### Step 5: Go Deeper (when ready)
Explore the 4 QE pipeline skills, the structural gates, and the audit protocol. Each addresses progressively more sophisticated failure modes.

**Estimated time to Minimum Viable QE:** 2-3 hours for Steps 1-4.

### Verify It's Working (3 Smoke Tests)

After loading the master framework and your chosen rules:

**Test 1: Research Gate (R-07)** — Ask your AI to "analyze the competitive landscape for [any product]." If R-07 is working, the AI should perform web searches BEFORE writing any analysis. If it starts drafting from its own knowledge, R-07 isn't firing.

**Test 2: Context Anchor (R-18)** — Give your AI a multi-part question, then ask a follow-up. The response should open with a one-line reminder of what you originally asked. If it dives straight in, R-18 isn't active.

**Test 3: Audit Command** — After the AI produces any deliverable, say "audit." If loaded correctly, it should run a structured multi-pass review — verification, adversarial testing, pre-mortem — followed by a Learning Ledger table. If it just says "looks good," the audit protocol isn't fully loaded.

If any test fails, the most likely cause is that the instructions weren't loaded into the right place — revisit the adoption section below.

---

## If You Want to Adopt This System

If after reviewing the package you decide to implement parts of it (or all of it), here's how to load the skills as persistent instructions.

### Claude Code

Claude Code uses a file called `CLAUDE.md` and a `.claude/rules/` directory to give the AI persistent instructions. ([Claude Code docs](https://code.claude.com/docs/en/memory))

1. Open your project folder in Claude Code
2. Create `CLAUDE.md` in the project root — paste the contents of `marc-ops-framework.md` here
3. Create `.claude/rules/` inside your project
4. Copy individual skill files (e.g., `audit.md`, `prompt-optimizer.md`) into `.claude/rules/`
5. Claude Code automatically loads `CLAUDE.md` at the start of every session and reads rules from `.claude/rules/`

```
your-project/
├── CLAUDE.md                           ← Paste marc-ops-framework.md here
└── .claude/
    └── rules/
        ├── audit.md
        ├── prompt-optimizer.md
        ├── source-verification.md
        ├── issue-logger.md
        └── (other skills as needed)
```

**You don't need to load all skills at once.** Start with the master framework, then add skills as you need them.

**Tip:** Claude Code also supports a personal `~/.claude/CLAUDE.md` file that applies across all projects.

**Note on length:** The master framework is ~400 lines. If Claude seems to skim parts, put only the highest-value sections in `CLAUDE.md` (Section 2: Preventive Rules + Section 4: Accelerator Rules) and move the rest into `.claude/rules/`.

### ChatGPT (Projects)

1. Create a new Project in ChatGPT
2. Open Project Settings → Instructions
3. Paste the contents of `marc-ops-framework.md` into the instructions field
4. Upload individual skill files as project files — ChatGPT will reference them when relevant
5. For best results, tell ChatGPT at the start of a conversation: *"Follow the instructions in my project settings and reference the uploaded skill files when applicable."*

### Cursor

1. Create a `.cursorrules` file in your project root
2. Paste the contents of `marc-ops-framework.md` into this file
3. For additional skills, create a `.cursor/rules/` directory and add skill files there
4. Cursor reads these files automatically at session start

### Other Platforms

The skill files are plain markdown. Any AI platform that accepts custom instructions or knowledge files can use them. The protocols and rules are platform-agnostic — only the loading mechanism varies. If your platform isn't listed above, look for its equivalent of "custom instructions," "system prompt," or "project instructions" and paste the framework there.

---

## Known Gaps

The system tracks what it doesn't solve yet:

| ID | Gap | Description |
|----|-----|-------------|
| G-4 | Crisis/Chaos Protocol | No defined behavior for cascading session failures. Informed by an AI architecture search paper: circuit breaker pattern with anomaly thresholds. |
| G-6 | Rule Obsolescence Detection | No proactive process to retire outdated rules |
| G-7 | Knowledge Architecture | No retrieval design for accumulated domain knowledge at scale |
| G-8 | Multi-Operator Knowledge Transfer | No reconciliation process when two operators work the same system (this package is a step toward closing G-8) |

*Every rule in this system traces to a specific failure that was caught, analyzed, and promoted to permanent prevention. The system has been through 20+ audits, multiple reflects, and integration of external research. It is battle-tested against real work across 10+ days of intensive development.*
