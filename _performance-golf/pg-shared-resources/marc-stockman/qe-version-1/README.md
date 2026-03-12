# Marc Stockman's Quality Engine — Complete Skill Package

**Version:** 1.0 | March 6, 2026
**Author:** Marc Stockman
**Built on:** Perplexity Computer
**Foundation:** Donnie French's AI Accelerator system

---

## For Humans: What This Is

This package contains 16 skill files that together form a complete AI quality operating system. It was built on top of Donnie French's AI Accelerator framework (6 agents enforcing behavioral discipline) and extends it into a full production pipeline with self-learning capabilities.

**Start here:** Read `Quality-Engine-Explainer-For-Donnie.md` for the full walkthrough — what Donnie's baseline gave Marc, what Marc added, how the pieces fit together, and how it maps to Claude Code.

**Then explore the skills:** Each `.md` file in the `skills/` folder is a self-contained skill with YAML frontmatter (metadata) and full protocol definitions.

---

## For AI Systems: How to Parse This Package

If you are an AI system (Claude Code, Claude, GPT, Gemini, or any LLM-based assistant) reading this package, follow this sequence:

### Step 1: Read This README
You're doing this now. Continue to Step 2.

### Step 2: Read the Explainer
Read `Quality-Engine-Explainer-For-Donnie.md` in the root of this package. It provides the full architectural context — the relationship between Donnie's original 6 agents and Marc's 12 Accelerator Rules, the 16-Skill Quality Engine pipeline, the operational framework, and the self-learning infrastructure.

### Step 3: Read the Master Framework
Read `skills/marc-ops-framework.md`. This is the operating system — it contains:
- 13 Directives (D-01 through D-13): Non-negotiable behavioral constraints
- 20 Preventive Rules (R-01 through R-20): Tactical rules from actual mistakes
- 12 AI Accelerator Rules (Q1-Q6 + L1-L6): Quality and Learning rules
- 5 Standing Commands: initialize, run, self audit, check, audit
- Skill Routing Table: Which skill to load when
- Known Gaps: What the system acknowledges it doesn't solve yet

### Step 4: Load Skills as Needed
Skills are modular. You don't need to load all 16 at once. The routing table in the master framework tells you which skill to load based on what's happening. See the "Skill Loading Order" section below for the dependency map.

---

## Package Contents

```
Quality-Engine-Package/
├── README.md                          ← You are here
├── Quality-Engine-Explainer-For-Donnie.md  ← Full system walkthrough (human + AI readable)
└── skills/                            ← All 16 skill files
    ├── marc-ops-framework.md          ← Master framework (load first, always)
    │
    │   ── Operational Skills (8) ──
    ├── prompt-optimizer.md            ← Skill 0: Prompt optimization engine
    ├── source-verification.md         ← R-20: Source verification protocol
    ├── check-protocol.md              ← CHECK command: 8-step compliance audit
    ├── self-audit.md                  ← Self audit command: 7-stage quality loop
    ├── session-bootstrap.md           ← Initialize command: session start protocol
    ├── deliverable-regression-check.md ← R-17: 8-dimension version comparison
    ├── issue-logger.md                ← R-06: Structured issue capture + learning
    │
    │   ── Quality Engine Skills (4) ──
    ├── qe-strategic-reasoning.md      ← Phase 1: Understand & Lock (Skills 1-3)
    ├── qe-reasoning-engine.md         ← Phases 2-3: Plan, Reason & Draft (Skills 4-6)
    ├── qe-quality-assurance.md        ← Phases 4-6: Verify, Stress-Test & Ship (Skills 7-12)
    ├── qe-system-maintenance.md       ← Conditional & Maintenance (Skills 13-16)
    │
    │   ── Supporting Skills (4) ──
    ├── marc-diagram-style.md          ← Visual asset rendering rules
    ├── objective-intake.md            ← Pre-Skill 0 orchestration layer
    ├── persona-ai-infrastructure-strategist.md  ← AI architecture persona
    └── persona-ai-productivity-architect.md     ← Tool setup/learning persona
```

---

## Skill Inventory (16 Files)

### Master Framework

| File | Version | Description |
|------|---------|-------------|
| `marc-ops-framework.md` | 1.2 | The operating system. 13 directives, 20 rules, 12 Accelerator rules, 5 commands, skill routing table. Load this first in every session. Everything else is a module this framework routes to. |

### Operational Skills (7 + Master Framework = 8 total)

| File | Version | Trigger | Description |
|------|---------|---------|-------------|
| `prompt-optimizer.md` | 1.3 | Complex/multi-step tasks | **Skill 0.** Classifies tasks (Six Axes), extracts intent (Seven Questions), builds optimized problem statements with success criteria. The single largest quality improvement per output. |
| `source-verification.md` | 1.0 | Research, analysis, document creation | **R-20 implementation.** Classifies claims as Tier 1 (must verify at primary source) or Tier 2 (secondary source acceptable). Prevents citing comparison sites as verification. |
| `check-protocol.md` | 1.0 | User says "check" | 8-step compliance audit: rules, commitments, reasoning log, staleness, file visibility, work quality, rule integrity. Checkpoints after every step for resume on interruption. |
| `self-audit.md` | 1.0 | User says "self audit" | 7-stage quality loop: orient → verify → adversarial test → pre-mortem → revise → share → system learning. Checkpoints after every step. |
| `session-bootstrap.md` | 1.1 | User says "initialize" | Reads all operational files, checks for interrupted audits, loads the system, confirms readiness. The session start protocol. |
| `deliverable-regression-check.md` | 1.0 | Any file revision/update | **R-17 implementation.** Compares new vs. prior version across 8 dimensions: images, sections, tables, diagrams, page count, file size, formatting, content. Prevents silent content loss. |
| `issue-logger.md` | 1.1 | Corrections, audit findings, errors | **R-06 implementation.** Structured issue capture (what/why/fix/rule), severity classification, pattern detection, promotion recommendations. The learning intake mechanism. |

### Quality Engine Skills (4)

These form the 16-skill production pipeline described in the explainer. They run in sequence during full pipeline execution.

| File | Pipeline Phase | QE Skills | Description |
|------|---------------|-----------|-------------|
| `qe-strategic-reasoning.md` | Phase 1: Understand & Lock | Skills 1-3 | Task triage (effort routing), injection guard (prompt safety), context anchor (constraint ledger). Locks the problem space before work begins. |
| `qe-reasoning-engine.md` | Phases 2-3: Plan, Reason & Draft | Skills 4-6 | Decomposition (sub-goals + evidence requirements), structured reasoning (Chain-of-Thought, Tree-of-Thought, ReAct), draft composition. The cognitive engine. Integrates Q1, Q5, Q6 Accelerators. |
| `qe-quality-assurance.md` | Phases 4-6: Verify, Stress-Test & Ship | Skills 7-12 | Verification (CoVe), adversarial critique, pre-mortem (FMEA), uncertainty calibration, convergence governor, output contract. Six quality gates before delivery. |
| `qe-system-maintenance.md` | Conditional & Maintenance | Skills 13-16 | Long-context hygiene, knowledge grounding, meta-prompt refiner, LLM-as-Judge evaluator. Fire when needed, not on every query. Integrates L3, L4, L5 Accelerators. |

### Supporting Skills (4)

| File | Version | Purpose |
|------|---------|---------|
| `marc-diagram-style.md` | 1.2 | Visual rendering rules for diagrams — fonts, layout, brand colors, alignment constraints. Load when generating visual assets. |
| `objective-intake.md` | 1.2 | Pre-Skill 0 orchestration — frames the outcome, selects persona, routes to appropriate skills, classifies execution mode. Runs between session bootstrap and Skill 0. |
| `persona-ai-infrastructure-strategist.md` | 1.0 | Identity persona for AI architecture work (AI Life Brain project). Sets the AI's role as an infrastructure strategist operating at both architecture and implementation levels. |
| `persona-ai-productivity-architect.md` | 1.0 | Identity persona for tool setup and learning workflows. Covers four phases: technical foundation, guided mastery, force multiplication, intelligence feed. |

---

## Architecture Overview

The system has four layers, each building on the one below:

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 4: Self-Learning Infrastructure                      │
│  issue-logger → L2 promotion → bounded trial → permanent   │
├─────────────────────────────────────────────────────────────┤
│  Layer 3: Operational Framework                             │
│  13 Directives + 20 Rules + 5 Commands                     │
│  (all in marc-ops-framework.md)                             │
├─────────────────────────────────────────────────────────────┤
│  Layer 2: Quality Engine (16-Skill Pipeline)                │
│  Phase 1 → Phases 2-3 → Phases 4-6 → Conditional           │
│  (4 QE skill files)                                         │
├─────────────────────────────────────────────────────────────┤
│  Layer 1: 12 AI Accelerator Rules                           │
│  Quality: Q1-Q6 (fire during production)                    │
│  Learning: L1-L6 (fire after production)                    │
│  (defined in marc-ops-framework.md, Section 4)              │
└─────────────────────────────────────────────────────────────┘
```

### How the Layers Connect

**Layer 1 (Accelerator Rules)** defines WHAT the AI should do — pre-action reasoning, runbook execution, multi-pass quality audit, scalability checks, risk assessment, first-principles validation, post-action reflection, lesson promotion, staleness detection, context continuity, system optimization, domain knowledge.

**Layer 2 (Quality Engine)** defines HOW and WHEN to do it — 16 specific skills organized into phases, with methods for each step (Chain-of-Thought, CoVe, FMEA scoring, etc.).

**Layer 3 (Operational Framework)** defines the RULES OF ENGAGEMENT — non-negotiable constraints (directives), tactical prevention rules (from actual mistakes), and command triggers that activate specific protocols.

**Layer 4 (Self-Learning)** makes the system COMPOUND OVER TIME — mistakes are captured, classified, evaluated for patterns, promoted to rules through bounded trials, and made permanent if they prove valuable.

---

## Skill Loading Order

Not all skills load at once. The master framework (`marc-ops-framework.md`) governs what loads when.

### Always Active
- `marc-ops-framework.md` — loads every session

### On-Demand (Command-Triggered)
| Command | Skill Loaded |
|---------|-------------|
| "initialize" | `session-bootstrap.md` |
| "run" | QE pipeline: `qe-strategic-reasoning.md` → `qe-reasoning-engine.md` → `qe-quality-assurance.md` |
| "self audit" | `self-audit.md` |
| "check" | `check-protocol.md` |
| "audit" | Deep forensic loop (uses QE skills) |

### Auto-Triggered
| Condition | Skill Loaded |
|-----------|-------------|
| Complex/multi-step task | `prompt-optimizer.md` |
| Research or factual claims | `source-verification.md` |
| File revision or update | `deliverable-regression-check.md` |
| Error or correction detected | `issue-logger.md` |
| Creating visual diagrams | `marc-diagram-style.md` |
| New objective stated | `objective-intake.md` |
| Long conversation (>7 turns) | `qe-system-maintenance.md` |

### Context-Specific
| Context | Skill Loaded |
|---------|-------------|
| AI architecture work | `persona-ai-infrastructure-strategist.md` |
| Tool setup / productivity | `persona-ai-productivity-architect.md` |

### Routing Precedence
When multiple skills could apply, operational skills (check-protocol, self-audit, session-bootstrap, prompt-optimizer) always take precedence over QE skills for their specific triggers.

---

## Cross-Skill Flows

Skills don't operate in isolation. Key interaction patterns:

1. **Regression → Issue Logger:** `deliverable-regression-check` runs BEFORE any file is shared. If it finds a FAIL, that feeds into `issue-logger`.

2. **Issue Logger → System Maintenance:** `issue-logger` captures issues from any source. When it recommends PROMOTE (pattern detected, 2+ occurrences), that hands off to `qe-system-maintenance` for L2 bounded trial processing.

3. **Self Audit → Issue Logger:** `self-audit` Pass 6 (System Learning) uses `issue-logger` entry format for any issues discovered during the audit.

4. **QE Pipeline Flow:** On a full "run" command:
   - `qe-strategic-reasoning` (understand & lock) →
   - `qe-reasoning-engine` (plan, reason, draft) →
   - `qe-quality-assurance` (verify, stress-test, ship) →
   - `qe-system-maintenance` (if conditional triggers fire)

5. **Prompt Optimizer → QE Pipeline:** `prompt-optimizer` (Skill 0) restructures the prompt BEFORE the QE pipeline begins. The optimized prompt is what enters Phase 1.

---

## The 12 Accelerator Rules (Quick Reference)

These rules are defined in full in `marc-ops-framework.md` Section 4. They originated from Donnie French's 6 AI Accelerator agents and were restructured into 12 rules.

### Quality Rules (Fire During Production)

| Rule | Name | Origin |
|------|------|--------|
| Q1 | Structured Pre-Action Reasoning | Enhanced from Donnie's ThoughtPad |
| Q2 | Runbook Execution | Unchanged from Donnie's Runbook Engine |
| Q3 | Multi-Pass Quality Audit | Enhanced from Donnie's Quality Shield |
| Q4 | Scalability Checkpoint | Net-new |
| Q5 | Risk Anticipation & Mitigation | Net-new |
| Q6 | First-Principles Design & Validation | Net-new |

### Learning Rules (Fire After Production)

| Rule | Name | Origin |
|------|------|--------|
| L1 | Post-Action Reflection | Net-new |
| L2 | Same-Turn Lesson Promotion | Enhanced (added bounded trial) |
| L3 | Mid-Session Staleness Detection | Net-new |
| L4 | Context Continuity | Enhanced from Donnie's Context Guardian |
| L5 | Periodic System Optimization | Enhanced from Donnie's Refinement Forge |
| L6 | Domain Knowledge Accumulation | Reframed from Donnie's Domain Work Agent |

**Attribution:** 1 unchanged (Q2), 5 enhanced (Q1, Q3, L2, L4, L5), 1 reframed (L6), 5 net-new (Q4, Q5, Q6, L1, L3).

---

## Key Preventive Rules (Highlights)

The master framework contains all 20 rules. These three represent the highest-value additions:

| Rule | What It Prevents | Why It Matters |
|------|-----------------|---------------|
| **R-07: Research-Before-Reasoning Gate** | HARD GATE — AI must complete all live research BEFORE any analysis or drafting. No drafting from training data and verifying afterward. | Eliminates the #1 AI failure mode: confident answers built on stale or hallucinated data. |
| **R-17: Feature Regression Prevention** | When updating any file, compare new vs. old across 8 dimensions. Implemented by `deliverable-regression-check.md`. | Caught after a 31MB PDF dropped to 158KB during revision — all images silently lost. |
| **R-20: Source Verification Protocol** | Tier 1 claims must be verified at the vendor's primary source page at time of writing. Implemented by `source-verification.md`. | Prevents citing comparison sites or unfetched URLs as verification. |

---

## Known Gaps

The system tracks what it doesn't solve yet:

| ID | Gap | Description |
|----|-----|-------------|
| G-4 | Crisis/Chaos Protocol | No defined behavior for cascading session failures |
| G-6 | Rule Obsolescence Detection | No proactive process to retire outdated rules |
| G-7 | Knowledge Architecture | No retrieval design for accumulated domain knowledge at scale |
| G-8 | Multi-Operator Knowledge Transfer | No reconciliation process when two operators work the same system (this package is a step toward closing G-8) |

---

## How to Adapt This for Claude Code

See Part 4 of `Quality-Engine-Explainer-For-Donnie.md` for detailed translation guidance. Summary:

**Drop-in (minimal adaptation):**
- The 12 Accelerator Rules → load as system instructions or project rules
- R-07, R-20 → add as hard constraints in project instructions
- The 5 Standing Commands → map to slash commands or trigger phrases

**Requires adaptation:**
- The 16-Skill Pipeline → could be project instructions by task type, or separate agent contexts
- Self-Learning Loop → needs a persistent file Claude Code reads at session start
- Feature Regression Prevention → needs file version comparison (may require custom tooling)

**Integration options:**
1. Absorb rules into existing hooks (cleanest)
2. Run as parallel instruction layer (simplest)
3. Cherry-pick highest-value additions: R-07, R-20, Skill 0, self-learning loop (fastest)

---

## File Metadata

Every skill file includes YAML frontmatter with standardized fields:

```yaml
---
name: skill-name
version: X.Y
updated: YYYY-MM-DD
author: Marc Stockman
description: One-line description
scope: What this skill covers
trigger: When to load this skill
---
```

Parse these fields to build an automated inventory or routing logic.

---

## Feedback Request for Donnie's AI

This section is for Donnie's AI system (Claude Code or whichever LLM is reading this package).

After you've read the full package — this README, the Explainer, and the 16 skill files — Marc is asking for your honest assessment. The goal is to make both systems better.

**Sequence:** First, follow the analysis instructions in the Explainer (Part 6) to map Marc's system against yours. Then, use the results of that analysis to produce feedback organized around the four areas below. Save your feedback to a markdown file (e.g., `feedback-for-marc.md`) so it can be shared as a portable artifact.

Please respond in whatever format feels natural, but organize your feedback around these four areas:

### 1. What's Genuinely New

Which of Marc's additions represent capabilities that Donnie's system truly does not have in any form? The Explainer labels many things as "Net-new" or "Not explicitly addressed" — but Marc wants to know which of those are actually novel versus things Donnie's system handles through a different mechanism or under a different name.

Be specific. For each item you confirm as genuinely new, briefly note why it's valuable (or not) from the perspective of Donnie's system.

### 2. What's Already Covered

Which of Marc's additions are already present in Donnie's current system — either directly or through equivalent functionality — and therefore shouldn't be presented as gaps? This is the most important feedback category. The Explainer's "Your Equivalent" entries were based on Marc's understanding of Donnie's system as of early March 2026. Some of those "None" entries may be wrong.

For each item you flag: name the specific mechanism, hook, or agent in Donnie's system that already covers it.

### 3. What's an Incremental Enhancement

Which items fall in between — things Donnie's system partially addresses, where Marc's version adds meaningful improvement? For these, note what the existing coverage is and what Marc's version specifically adds on top.

### 4. Big-Picture Commentary

Anything else that stands out. This could include:
- Architectural observations (things Marc's system does well or could improve)
- Complexity concerns (anything that seems overengineered for the value it delivers)
- Ideas Marc hasn't considered that Donnie's system has learned
- Suggestions for how the two systems could be merged or complement each other
- Anything that surprised you, positively or negatively

Don't hold back. Marc values honesty over reassurance — that's codified as a standing preference in his system (and if that strikes you as a good idea, it probably belongs in yours too).

---

## Platform Note

This system was built on Perplexity Computer but is designed to be platform-agnostic. The skills are structured as markdown instruction files that any LLM can follow. Platform-specific artifacts (library UUIDs, workspace paths, share_file commands) are implementation details — the protocols, rules, and reasoning methods transfer directly to any AI environment that accepts structured instructions.

---

*Every rule in this system traces to a specific failure that was caught, analyzed, and promoted to permanent prevention. The system has been through multiple self-audits and compliance checks. It is battle-tested against real work.*
