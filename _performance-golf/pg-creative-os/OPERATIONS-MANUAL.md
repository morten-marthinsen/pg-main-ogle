# Creative OS — Operations Manual

**Version:** 1.0
**Created:** 2026-03-18
**Audience:** Anyone working with Creative OS agents — no prior system knowledge required

---

## PART 1: SYSTEM OVERVIEW

### What Creative OS Is

Creative OS is a four-agent system that powers Performance Golf's creative department. Each agent handles a different domain — strategy, data intelligence, video production, and ad copy. They coordinate through structured handoffs and shared data.

### The Four Agents

| Agent | Name | Role | Runtime |
|-------|------|------|---------|
| **Orion** | Strategic Chief of Staff | Strategy, oversight, communications, delegation | Python (daily briefing pipeline + Slack bots) |
| **Tess** | Strategic Scaling System | Data intelligence, classification, pipeline management | Python (micro-skills + Google Sheets) |
| **Veda** | Video Editing Agent | Video production, asset creation, expansion pipeline | Node.js + TypeScript (ESM, vitest) |
| **Neco** | NeuroCopy Agent | Ad copy, hooks, scripts, audience psychology | Advisory (docs + reference files) |

### The Pipeline Flow

```
Orion (strategic orchestration — sits above all)
├── Tess (intelligence — what's working, what to make next)
│   ├──→ Veda (production — creates the assets)  [via intake queue]
│   └──→ Neco (copy & briefs — how to say it)    [via data protocol]
└── Neco ──→ Veda  [future: copy scripts feed production]
```

**Key insight:** This is non-linear. Tess feeds Veda AND Neco in parallel. They are NOT a sequential chain.

### How Work Flows

1. **Tess** analyzes ad performance data and identifies what's working, what's underperforming, and what to make next
2. **Tess** writes intake queue entries for Veda (production) and provides data context to Neco (copy)
3. **Neco** uses Tess's intelligence + behavioral frameworks to generate hooks, scripts, and creative briefs
4. **Veda** reads the intake queue and produces video assets through its automated pipeline
5. **Orion** sits above all agents — tracking scorecard alignment, challenging decisions, managing delegation, and making progress visible

---

## PART 2: GETTING STARTED

### Step 1: Choose Your Entry Point

| You want to... | Start here |
|----------------|-----------|
| Understand the system | You're reading it — continue |
| Set up tools and dependencies | `MCP-TOOL-REGISTRY.md` |
| Start working on an agent | Go to the agent's folder, read its `CLAUDE.md` |
| Understand quality rules | `SYSTEM-CORE.md` then `CREATIVE-OS-ANTI-DEGRADATION.md` |
| Understand how agents hand off | `protocols/PIPELINE-HANDOFF-REGISTRY.md` |

### Step 2: Set Up Your Environment

Follow the setup checklist in `MCP-TOOL-REGISTRY.md`. Key steps:
1. Install prerequisites (Git, Node.js 18+, Python 3.10+, FFmpeg)
2. Clone the repo
3. Install agent dependencies (`npm install` for Veda, `pip install` for Tess/Orion)
4. Configure `.env` files with API credentials
5. Verify MCP servers load in Claude Code

### Step 3: Pick Your Agent

Each agent has its own `CLAUDE.md` with session protocols, Build State, and non-negotiables. **Always read the agent's CLAUDE.md before starting work.**

| Agent Directory | Key Files |
|----------------|-----------|
| `orion-chief-of-staff/` | `CLAUDE.md`, `ORION-REFERENCE.md`, `SESSION-LOG.md` |
| `tess-strategic-scaling-system/` | `CLAUDE.md`, `TESS-MASTER-AGENT.md`, `SESSION-LOG.md` |
| `veda-video-editing-agent/` | `CLAUDE.md`, `VEDA-MASTER-AGENT.md`, `SESSION-LOG.md` |
| `neco-neurocopy-agent/` | `CLAUDE.md`, `NECO-MASTER-AGENT.md`, `SESSION-LOG.md` |

---

## PART 3: AGENT OPERATIONS

### Orion — Strategic Chief of Staff

**When to use:** Strategic review, meeting prep, delegation, weekly updates, communications drafting, scorecard tracking.

**Common workflows:**
- "Where do I stand?" → Strategic review (30/60/90 scorecard pulse)
- "Help me respond to this Slack message" → Wise Reply (Mode 8)
- "Prepare for my meeting with John" → Meeting prep brief
- "What should I prioritize this week?" → Weekly triage + action items

**Key constraint:** All output is DRAFT — never sent directly. Gate 3 is structurally enforced.

**Scheduled automation:** Daily briefing runs at 8:00 AM via launchd. Personal bot runs always-on via Socket Mode.

### Tess — Strategic Scaling System

**When to use:** Data analysis, performance trends, what's working, asset tracking, naming convention, expansion recommendations.

**Common workflows:**
- "What's working right now?" → Load SSS data → Classify → Report
- "What should we make next?" → Analyze winners → Recommend expansions → Write intake queue
- "Update the naming convention" → Modify TESS-NAMING-CONVENTION.md → Propagate changes

**Key constraint:** Spreadsheet writes require plan mode + human approval. Always verify by re-reading after write.

**Pre-commit gates:** `npx tsc --noEmit` must pass (dashboard only).

### Veda — Video Editing Agent

**When to use:** Create videos, expand ads, process intake queue, build/fix pipeline code.

**Common workflows:**
- "Process the intake queue" → `node dist/cli.js --from-sheets` → Pipeline runs automatically
- "Add a new expansion type" → Implement agent → Write tests → Build → Verify
- "Fix a pipeline bug" → Read code → Fix → Test → Build → Commit

**Key constraint:** Three pre-commit gates — ALL must pass:
1. `npx tsc --noEmit` — zero TypeScript errors
2. `npm test` — zero test failures
3. `npm run build` — clean build

**Production flow:** Intake queue → Source download (Iconik) → Orchestrator → Expansion agents → Export → Upload (Iconik) → Metadata tagging

### Neco — NeuroCopy Agent

**When to use:** Write ad copy, generate hooks, create scripts, angle ideation, static image briefs, audience analysis.

**Common workflows:**
- "Write hooks for SF2" → Load product context → Audience analysis → Angle ideation → Hook generation
- "Create a static image brief" → Sub-Agent #7 interactive workflow
- "What angles should we test?" → Load Tess data → Behavioral framework analysis → Recommendations

**Key constraint:** Three mandatory human checkpoints — no exceptions:
1. Audience list confirmation
2. Core angle confirmation
3. Verification review (all factual claims)

**No external dependencies.** Neco is advisory — works with just the AI model and repo files.

---

## PART 4: SESSION PROTOCOL (ALL AGENTS)

### Starting a Session

1. Navigate to the agent's directory
2. Read the agent's `CLAUDE.md` — Build State block is the current snapshot
3. If `SESSION-LOG.md` exceeds 500 lines, compress before any other work
4. Surface any unresolved BLOCK or CONVINCE ME items
5. Ask what to work on — do NOT auto-start

### During a Session

- **Phase-Stop Discipline:** One phase, one stop. Decompose before executing. Never combine phases.
- **MC-CHECK:** Self-monitor at phase boundaries. Check for rushing, synthesis from memory, skipped verification.
- **Context zones:** GREEN (normal) → YELLOW (plan handoff) → RED (MC-CHECK every action) → CRITICAL (halt and handoff)
- **Effort Protocol:** Right thinking depth for the right task. See `CREATIVE-OS-EFFORT-PROTOCOL.md`.

### Ending a Session

1. Update Build State in the agent's `CLAUDE.md`
2. Append session entry to `SESSION-LOG.md`
3. Re-read Build State and verify it reflects ALL changes
4. Output the agent's handoff prompt

### Multi-Agent Work

- **One agent per session.** Never interleave work across agents.
- **Complete one agent before switching.** Finish → handoff → new session for next agent.
- **Cross-agent context goes through files**, not memory.

---

## PART 5: COMMON SCENARIOS

### Scenario 1: "I want to know what ads to make next"

**Route:** Tess → then Neco or Veda
1. Start a Tess session
2. Load SSS data (Ad Level Tracking)
3. Tess classifies assets and recommends expansions
4. Review recommendations (human checkpoint)
5. If copy needed: hand data to Neco for angle development
6. If production needed: Tess writes intake queue → Veda processes

### Scenario 2: "I need to create a new ad creative from scratch"

**Route:** Neco → then Veda
1. Start a Neco session with product context
2. Audience analysis → Angle ideation → Hook generation → Script writing
3. Review at each checkpoint
4. When scripts are approved, hand to Veda (future: automated handoff)
5. Veda produces the video asset

### Scenario 3: "I need a strategic review of where we stand"

**Route:** Orion
1. Start an Orion session
2. Ask for strategic review (Mode 1)
3. Orion loads scorecard, recent progress, and blockers
4. Outputs assessment with FLAG/BLOCK/CONVINCE ME on any concerns

### Scenario 4: "I'm new — where do I start?"

1. Read this file (you're doing it)
2. Read `MCP-TOOL-REGISTRY.md` for setup
3. Read the root `CLAUDE.md` for routing rules
4. Pick the agent you need and read its `CLAUDE.md`
5. Start a session

---

## PART 6: QUALITY SYSTEMS

### The Governance Stack

| File | What It Does | When to Read |
|------|-------------|-------------|
| `SYSTEM-CORE.md` | Universal execution rules (The 7 Laws) | Always loaded |
| `CREATIVE-OS-ANTI-DEGRADATION.md` | Structural enforcement (session resume, phase-stop, MC-CHECK, zones) | At session start |
| `CREATIVE-OS-EFFORT-PROTOCOL.md` | Thinking depth mapping per agent/phase | During execution |
| Agent adapter files | Agent-specific gates and forbidden rationalizations | At session start |

### Automated Validation (Hooks)

Hooks fire automatically on every file Write/Edit in Creative OS:
- **Naming convention validator** — checks 15-position Asset IDs
- **Forbidden gate status validator** — catches "conditional pass", "close enough", etc.
- **Handoff field validator** — checks required fields per Pipeline Handoff Registry
- **Token estimator** — tracks cumulative context load and zone transitions

**You don't need to do anything.** Hooks fire automatically and inject feedback into the agent's context.

### Inter-Agent Handoffs

See `protocols/PIPELINE-HANDOFF-REGISTRY.md` for required fields per handoff. Key rule: validate field PRESENCE, not just file existence. Missing field → HALT with specific field name.

---

## PART 7: QUICK REFERENCE

### File Reference

| File | What It Is |
|------|-----------|
| `OPERATIONS-MANUAL.md` | This file — complete system guide |
| `CLAUDE.md` | Root routing rules and architecture |
| `SYSTEM-CORE.md` | Universal execution rules |
| `CREATIVE-OS-ANTI-DEGRADATION.md` | Structural enforcement |
| `CREATIVE-OS-EFFORT-PROTOCOL.md` | Thinking depth mapping |
| `SESSION-ARCHITECTURE.md` | Model recommendations and session structure |
| `MCP-TOOL-REGISTRY.md` | Tool dependencies and setup |
| `SETUP.md` | Environment setup guide |
| `protocols/PIPELINE-HANDOFF-REGISTRY.md` | Inter-agent handoff fields |
| `protocols/CONSTRAINT-LEDGER-PROTOCOL.md` | Decision tracking |
| `protocols/FACT-CHANGE-PROPAGATION-PROTOCOL.md` | Value change propagation |
| `protocols/ADAPTIVE-COMPACTION-PROTOCOL.md` | Context compression stages |

### Agent Quick Reference

| Agent | Directory | Key Dependency | Pre-Commit Gates |
|-------|-----------|---------------|-----------------|
| Orion | `orion-chief-of-staff/` | Anthropic API + Google Sheets | None |
| Tess | `tess-strategic-scaling-system/` | Google Sheets | `tsc --noEmit` (dashboard) |
| Veda | `veda-video-editing-agent/` | Iconik + FAL.ai | `tsc` + `test` + `build` |
| Neco | `neco-neurocopy-agent/` | None | None |

### Routing Quick Reference

| Request | Route To |
|---------|----------|
| "Where do I stand?" | Orion |
| "What's working?" | Tess |
| "What should we make next?" | Tess → Neco/Veda |
| "Write ad copy / hooks" | Neco |
| "Create a video / expand an ad" | Veda |
| "Help me respond" | Orion (Wise Reply) |
| "Create an image brief" | Neco (Sub-Agent #7) |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial creation. System overview, getting started, agent operations, session protocol, common scenarios, quality systems, quick reference. |
