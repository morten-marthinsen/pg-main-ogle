# 07 — Creative OS Audit Fix List

**Date:** 2026-03-17
**For:** Christopher Ogle
**Source:** `06-bilateral-quality-audit.md` (full analysis)
**Purpose:** Load this doc into your Claude session. Work through each phase in order. Each item has a prompt you can give Claude directly. Complete a phase, review, then move to the next.

---

## How to Use This Document

1. Open a Claude session inside `pg-creative-os/`
2. Tell Claude: "Read `_performance-golf/pg-creative-os/_ops/audits/07-CREATIVE-OS-AUDIT-FIX-LIST.md` — this is my implementation playbook. We're working through it phase by phase."
3. For each item, give Claude the prompt provided. Claude will read the Marketing OS source file, then create or update the Creative OS equivalent.
4. **Phase-Stop:** Complete one phase. Review all outputs. Confirm before moving to the next phase. Do NOT let Claude combine phases.
5. Check off items as you complete them.

---

## PHASE 0 — Critical Infrastructure (Do First)

These are non-negotiable prerequisites. Everything else builds on these.

---

### P0-1: Push Veda to Remote Git

**Why:** 28 commits exist only on your local machine. If your machine fails, the entire Veda codebase is gone. This is a P0 continuity risk.

**Action:** This is a manual step — no Claude prompt needed.

```
cd _performance-golf/pg-creative-os/veda-video-editing-agent
# Create a private repo on GitHub (or GitLab), then:
git remote add origin <your-repo-url>
git push -u origin main
```

- [ ] Remote repo created
- [ ] All branches pushed
- [ ] Verified clone works from a different location

---

### P0-2: Create SYSTEM-CORE.md for Creative OS

**Why:** Marketing OS has a single file (`SYSTEM-CORE.md`) that governs ALL skills with universal execution constraints — The 7 Laws, metacognitive protocol, context zones, forbidden behaviors. Creative OS has no equivalent. Each agent has its own CLAUDE.md but there's no shared authority file. The current `CREATIVE-OS-ANTI-DEGRADATION.md` covers some ground but is enforcement-focused, not a complete execution framework.

**Marketing OS source to model:**
`_performance-golf/pg-marketing-os/~system/SYSTEM-CORE.md`

**Prompt for Claude:**

> Read the Marketing OS SYSTEM-CORE.md at `_performance-golf/pg-marketing-os/~system/SYSTEM-CORE.md`. This is the universal execution constraint file that governs all skills in Marketing OS.
>
> Now read the current Creative OS anti-degradation file at `_performance-golf/pg-creative-os/CREATIVE-OS-ANTI-DEGRADATION.md` and the root CLAUDE.md at `_performance-golf/pg-creative-os/CLAUDE.md`.
>
> Create a new file: `_performance-golf/pg-creative-os/SYSTEM-CORE.md`
>
> This file must:
> 1. Be the single top-level authority for ALL Creative OS agents (Orion, Tess, Veda, Neco)
> 2. Define universal execution rules equivalent to Marketing OS's "7 Laws" — adapted for Creative OS's domain (data intelligence, video production, copywriting, strategy — not long-form VSL copy)
> 3. Include the metacognitive protocol (MC-CHECK) — pull from what's already in CREATIVE-OS-ANTI-DEGRADATION.md and strengthen it to match Marketing OS's format
> 4. Include context zone management (Creative OS already has GREEN/YELLOW/RED/CRITICAL — formalize it here with token thresholds and zone-specific response protocols)
> 5. Include session continuity rules (handoff protocol, Build State verification, 500-line archive threshold — these already exist across agents but need to be unified here)
> 6. Include forbidden behaviors (consolidate from all agent CLAUDE.md files + anti-degradation)
> 7. Include the effort protocol mapping — reference CREATIVE-OS-EFFORT-PROTOCOL.md
> 8. Be system-agnostic — nothing Claude-specific. This must work if loaded into Gemini CLI, OpenAI, or any other model
> 9. State its authority: "This file has EQUAL authority to every agent's CLAUDE.md and CREATIVE-OS-ANTI-DEGRADATION.md"
>
> Do NOT duplicate what's already well-handled in CREATIVE-OS-ANTI-DEGRADATION.md. Reference it. SYSTEM-CORE is the execution framework; Anti-Degradation is the enforcement system. They work together.
>
> Show me the draft before writing the file. One phase, one stop.

- [ ] SYSTEM-CORE.md created
- [ ] References Anti-Degradation (doesn't duplicate)
- [ ] References Effort Protocol
- [ ] System-agnostic (no Claude-specific syntax)
- [ ] All 4 agents acknowledged

---

### P0-3: Create MCP-TOOL-REGISTRY.md

**Why:** Marketing OS maps every external tool to every skill, with setup verification and cost estimates. Creative OS's SETUP.md lists dependencies per agent but doesn't tell operators "before you run this specific task on this agent, you need THIS tool configured." This is the prerequisite checklist that ensures people get properly set up before they start using the system.

**Marketing OS source to model:**
`_performance-golf/pg-marketing-os/~system/MCP-TOOL-REGISTRY.md`

**Prompt for Claude:**

> Read the Marketing OS MCP-TOOL-REGISTRY at `_performance-golf/pg-marketing-os/~system/MCP-TOOL-REGISTRY.md`.
>
> Now read Creative OS's current SETUP.md at `_performance-golf/pg-creative-os/SETUP.md` and the root CLAUDE.md to understand what tools each agent needs.
>
> Also read each agent's CLAUDE.md to identify all external tool dependencies:
> - `_performance-golf/pg-creative-os/orion-chief-of-staff/CLAUDE.md`
> - `_performance-golf/pg-creative-os/tess-strategic-scaling-system/CLAUDE.md`
> - `_performance-golf/pg-creative-os/veda-video-editing-agent/CLAUDE.md`
> - `_performance-golf/pg-creative-os/neco-neurocopy-agent/CLAUDE.md`
>
> Create: `_performance-golf/pg-creative-os/MCP-TOOL-REGISTRY.md`
>
> This file must include:
> 1. **Tool-to-Agent-to-Task matrix** — Which tools each agent needs, and for which specific tasks
> 2. **MCP servers section** — Google Sheets, Google Docs, ClickUp, Figma, Slack, Gmail, Fathom, Google Calendar. For each: what it does, which agents use it, portable vs non-portable flag, setup verification command
> 3. **External APIs section** — Iconik, FAL.ai, ElevenLabs, Higgsfield, Anthropic API. For each: what it does, which agent, env var name, how to verify it's working
> 4. **Local tools section** — FFmpeg, Node.js, Python, Google Apps Script
> 5. **Cost estimates per agent run** (where applicable — especially Veda's API calls)
> 6. **"Can I run this agent without X?" matrix** — Show which tools are CRITICAL vs OPTIONAL per agent. Neco needs nothing external. Tess needs Google Sheets. Veda needs Iconik + FAL.ai. Orion needs Anthropic API + Google Sheets + ClickUp.
> 7. **Setup verification checklist** — A numbered list operators can run through to confirm everything is configured before starting
>
> Show me the draft before writing. One phase, one stop.

- [ ] MCP-TOOL-REGISTRY.md created
- [ ] All 4 agents covered
- [ ] Critical vs optional flags per tool
- [ ] Setup verification checklist included
- [ ] Cost estimates where applicable

---

## PHASE 1 — Structural Quality (Foundation)

**Prerequisite:** Phase 0 complete. SYSTEM-CORE.md exists.

---

### P1-1: Upgrade Mandatory Read Declaration Format

**Why:** Marketing OS requires operators to write a specific declaration proving they read the Anti-Degradation file — including the file version and 3 specific "I WILL NOT" behaviors from that file. Creative OS's declarations are less rigorous.

**Marketing OS source to model:**
`_performance-golf/pg-marketing-os/~system/protocols/EXECUTION-GUARDRAILS.md` (search for "Mandatory Read Declaration")

**Prompt for Claude:**

> Read the Marketing OS Execution Guardrails at `_performance-golf/pg-marketing-os/~system/protocols/EXECUTION-GUARDRAILS.md` — focus on the "Mandatory Read Declaration" template and "GATE_0 Proof Standard."
>
> Now read Creative OS's anti-degradation file at `_performance-golf/pg-creative-os/CREATIVE-OS-ANTI-DEGRADATION.md`.
>
> Update the Creative OS anti-degradation file to:
> 1. Add a formal "Mandatory Read Declaration Template" section matching Marketing OS's format — filename + version + "I WILL NOT" behaviors from the specific anti-degradation file being read
> 2. Require the declaration be written to the FIRST output file of any session
> 3. Add a GATE_0 equivalent — declaration must exist before any substantive work begins
> 4. Add "Missing declaration = file not read = outputs suspect" as explicit rule
>
> Also update each agent-specific adapter to include agent-specific declaration items:
> - `_performance-golf/pg-creative-os/tess-strategic-scaling-system/TESS-ANTI-DEGRADATION.md`
> - `_performance-golf/pg-creative-os/veda-video-editing-agent/VEDA-ANTI-DEGRADATION.md`
> - `_performance-golf/pg-creative-os/neco-neurocopy-agent/NECO-ANTI-DEGRADATION.md`
>
> Show me the changes before applying. One phase, one stop.

- [ ] Core anti-degradation updated with declaration template
- [ ] GATE_0 equivalent added
- [ ] Tess adapter updated
- [ ] Veda adapter updated
- [ ] Neco adapter updated

---

### P1-2: Create Pipeline Handoff Registry

**Why:** Marketing OS formally documents every handoff between skills — required fields, validation rules, minimum file sizes. Creative OS has inter-agent bridges (Tess→Veda, Tess→Neco) but no formal registry with field-level validation. When a handoff fails silently, you get garbage downstream.

**Marketing OS source to model:**
`_performance-golf/pg-marketing-os/~system/pipeline-handoff-registry.md`

**Prompt for Claude:**

> Read the Marketing OS Pipeline Handoff Registry at `_performance-golf/pg-marketing-os/~system/pipeline-handoff-registry.md`.
>
> Now read the Creative OS inter-agent bridge definitions:
> - Tess→Veda: Read `_performance-golf/pg-creative-os/tess-strategic-scaling-system/TESS-MASTER-AGENT.md` and `_performance-golf/pg-creative-os/veda-video-editing-agent/VEDA-MASTER-AGENT.md` — look for intake queue specs, naming convention handoff, bridge gates
> - Tess→Neco: Read `_performance-golf/pg-creative-os/neco-neurocopy-agent/NECO-MASTER-AGENT.md` — look for data protocol definition
> - Neco→Veda (future): Same files — look for planned copy handoff format
> - Orion→All: Read `_performance-golf/pg-creative-os/orion-chief-of-staff/CLAUDE.md` — look for strategic direction handoffs
>
> Create: `_performance-golf/pg-creative-os/protocols/PIPELINE-HANDOFF-REGISTRY.md`
>
> For EACH handoff, document:
> 1. Source agent → Target agent
> 2. Handoff mechanism (intake queue tab, data protocol, YAML file, etc.)
> 3. Required fields (every field that MUST be present)
> 4. Validation rules (naming convention compliance, root angle from SSS Column C, etc.)
> 5. Minimum thresholds (file sizes, row counts, etc.)
> 6. What happens on failure (HALT with specific missing field name)
> 7. Status: LIVE / DEFINED / PLANNED
>
> Include a "Layer 0 Input Validation" section: before any agent consumes a handoff, it must check field PRESENCE, not just file existence. If a required field is missing → HALT with the specific field name.
>
> Show me the draft. One phase, one stop.

- [ ] Pipeline Handoff Registry created
- [ ] All 4 bridges documented (Tess→Veda, Tess→Neco, Neco→Veda, Orion→All)
- [ ] Required fields listed per handoff
- [ ] Validation rules defined
- [ ] HALT behavior on failure specified

---

### P1-3: Add Forbidden Gate Statuses to Anti-Degradation

**Why:** LLMs will invent middle-ground statuses to avoid halting — "conditional pass," "partial pass," "sufficient for analysis," "good enough for now." Marketing OS pre-bans these. Creative OS's anti-degradation has "Forbidden Rationalizations" but doesn't specifically ban these status names.

**Prompt for Claude:**

> Read `_performance-golf/pg-creative-os/CREATIVE-OS-ANTI-DEGRADATION.md`.
>
> Find the "Forbidden Rationalizations" section. Add a new subsection called "Forbidden Gate Statuses" with this content:
>
> The following status values DO NOT EXIST in this system. Any agent that produces one of these has failed the gate:
> - "conditional pass"
> - "partial pass"
> - "sufficient for analysis"
> - "good enough for now"
> - "quality over quantity" (as rationalization for missing thresholds)
> - "close enough"
> - "effectively complete"
>
> Gates are PASS or FAIL. There is no middle ground. If a gate cannot pass, the agent must HALT and report the specific failure — not invent a status that lets it continue.
>
> Apply the edit. One phase, one stop.

- [ ] Forbidden Gate Statuses added to Anti-Degradation

---

### P1-4: Create Constraint Ledger Protocol

**Why:** Marketing OS tracks every strategic decision that constrains downstream execution — in a structured YAML format with IDs, rationale, downstream impacts, and supersede chains. Creative OS has no equivalent. When a naming convention changes, or a root angle is assigned, or a brand thread decision is made, there's no structured record of what was decided, why, and what it constrains.

**Marketing OS source to model:**
`_performance-golf/pg-marketing-os/~system/protocols/CONSTRAINT-LEDGER-PROTOCOL.md`

**Prompt for Claude:**

> Read the Marketing OS Constraint Ledger Protocol at `_performance-golf/pg-marketing-os/~system/protocols/CONSTRAINT-LEDGER-PROTOCOL.md`.
>
> Now consider what decisions in Creative OS constrain downstream execution:
> - Naming convention version changes (v3.4 → v3.5)
> - Root angle assignments (Script ID → root angle binding)
> - Brand thread decisions (which initiative maps to which thread)
> - Strategic pivots from Orion (30/60/90 scorecard changes)
> - Expansion type classifications
> - Tool/API changes (Iconik endpoints, SSS schema changes)
> - Neco angle approvals (human-confirmed angles that constrain script generation)
>
> Create: `_performance-golf/pg-creative-os/protocols/CONSTRAINT-LEDGER-PROTOCOL.md`
>
> Model after Marketing OS but adapt for Creative OS's domain. Include:
> 1. What gets logged (the decision types listed above)
> 2. YAML ledger format (ID, agent, decision, rationale, constraints, downstream agents, status)
> 3. Lifecycle rules (created at decision point, updated on change, marked superseded never deleted)
> 4. Where the ledger lives per project
> 5. When agents must consult it (at session start, before any handoff)
>
> Show me the draft. One phase, one stop.

- [ ] Constraint Ledger Protocol created
- [ ] Creative OS-specific decision types listed
- [ ] YAML format defined
- [ ] Lifecycle rules included

---

### P1-5: Create Fact Change Propagation Protocol

**Why:** Marketing OS learned this the hard way — when a human changes a factual value mid-pipeline (credential years, guarantee terms, feature names), upstream files become stale but aren't updated. Creative OS has no propagation system. If the naming convention changes from v3.4 to v3.5, or a root angle gets renamed, there's no protocol to find and update all references.

**Marketing OS source to model:**
`_performance-golf/pg-marketing-os/~system/protocols/FACT-CHANGE-PROPAGATION-PROTOCOL.md`

**Prompt for Claude:**

> Read the Marketing OS Fact Change Propagation Protocol at `_performance-golf/pg-marketing-os/~system/protocols/FACT-CHANGE-PROPAGATION-PROTOCOL.md`.
>
> Now consider Creative OS's fact change scenarios:
> - Naming convention version updates (position definitions change)
> - Root angle renames
> - SSS schema changes (new columns, renamed fields)
> - Tool endpoint changes (Iconik API, Google Sheets ID)
> - Credential/API key rotations
> - Scorecard metric changes (Orion 30/60/90 targets)
> - Brand thread definitions evolve
> - Team roster changes (who has access to what)
>
> Create: `_performance-golf/pg-creative-os/protocols/FACT-CHANGE-PROPAGATION-PROTOCOL.md`
>
> Adapt Marketing OS's 6-step protocol:
> 1. Identify the change + source of authority
> 2. Search all agent directories for instances of old value
> 3. Propagate or mark (update / mark superseded / defer)
> 4. Log the change (fact-changes.yaml with old/new values, files updated, status)
> 5. Update Constraint Ledger
> 6. Gate check — don't proceed until propagation complete or explicitly deferred
>
> Include Creative OS-specific examples for each step. Reference the real scenarios above.
>
> Show me the draft. One phase, one stop.

- [ ] Fact Change Propagation Protocol created
- [ ] Creative OS-specific scenarios covered
- [ ] 6-step process adapted
- [ ] fact-changes.yaml format defined

---

## PHASE 2 — Context & Session Management

**Prerequisite:** Phase 1 complete. SYSTEM-CORE.md and protocols exist.

---

### P2-1: Create SESSION-ARCHITECTURE.md

**Why:** Marketing OS documents which model runs which skills and why (Opus for strategy, Sonnet for copy), plus the session structure and context loading order. Creative OS has no model assignment strategy documented anywhere.

**Marketing OS source to model:**
`_performance-golf/pg-marketing-os/~system/SESSION-ARCHITECTURE.md`

**Prompt for Claude:**

> Read the Marketing OS Session Architecture at `_performance-golf/pg-marketing-os/~system/SESSION-ARCHITECTURE.md`.
>
> Now consider Creative OS's agent roster and their computational needs:
> - **Orion** (strategic, advisory) — needs deep reasoning for strategic analysis, wise reply, challenger
> - **Tess** (data pipeline) — needs precision for data processing, classification, recommendations
> - **Veda** (video production) — needs code generation quality for TypeScript, plus creative judgment for hook selection
> - **Neco** (copywriting) — needs creative depth for hooks/scripts, plus analytical rigor for audience intelligence
>
> Create: `_performance-golf/pg-creative-os/SESSION-ARCHITECTURE.md`
>
> Include:
> 1. Model assignment recommendations per agent and task type (which model for which tasks, and why)
> 2. Session structure per agent type (Tess pipeline sessions vs Neco creative sessions vs Orion strategic sessions)
> 3. Context loading order (what gets loaded first, what can be deferred)
> 4. Make it system-agnostic — express model needs as capability levels (deep reasoning, code generation, creative writing, data processing) rather than specific model names, then map those to current best options across Claude, Gemini, OpenAI
>
> Show me the draft. One phase, one stop.

- [ ] SESSION-ARCHITECTURE.md created
- [ ] Model recommendations per agent
- [ ] System-agnostic capability mapping
- [ ] Session structure per agent type

---

### P2-2: Add Compaction Self-Detection

**Why:** When Claude (or any model) compresses conversation context, content gets lost silently. Marketing OS has a hook that monitors for >30% content loss on re-read and alerts. Creative OS has context zones but no automated detection of when compression has occurred.

**Prompt for Claude:**

> Read the SYSTEM-CORE.md we just created at `_performance-golf/pg-creative-os/SYSTEM-CORE.md`.
>
> Add a "Compaction Self-Detection" section (or add to the relevant context management section) with these rules:
>
> 1. If re-reading a file returns significantly less content than expected (based on known file size or previous read), ALERT immediately
> 2. On alert: re-read the file from source (not from conversation memory)
> 3. Never proceed with degraded context — if compaction is detected, surface it to the operator
> 4. Signs of compaction: file content appears truncated, sections are missing, details have been replaced with summaries
> 5. If in YELLOW or higher context zone and about to read a critical file, note its expected size BEFORE reading so you can detect truncation
>
> Apply the edit. One phase, one stop.

- [ ] Compaction self-detection added to SYSTEM-CORE.md

---

### P2-3: Create Adaptive Compaction Protocol

**Why:** Marketing OS has a 5-stage progressive compression strategy for when agents hit context limits mid-session. Creative OS has session compression (500-line archive) but no structured approach to mid-session context pressure.

**Marketing OS source to model:**
`_performance-golf/pg-marketing-os/~system/protocols/ADAPTIVE-COMPACTION-PROTOCOL.md`

**Prompt for Claude:**

> Read the Marketing OS Adaptive Compaction Protocol at `_performance-golf/pg-marketing-os/~system/protocols/ADAPTIVE-COMPACTION-PROTOCOL.md`.
>
> Create: `_performance-golf/pg-creative-os/protocols/ADAPTIVE-COMPACTION-PROTOCOL.md`
>
> Adapt for Creative OS. When an agent hits context pressure mid-session, what gets kept and what gets compressed? Define 5 stages of progressive compression:
> - Stage 1: Compress completed phase outputs to summaries (keep current phase full)
> - Stage 2: Compress session history to Build State only
> - Stage 3: Compress reference material to key decisions only
> - Stage 4: Generate session handoff and recommend session break
> - Stage 5: Emergency — save current state to file and HALT
>
> For each agent, note what's ALWAYS kept full (never compressed):
> - **Orion:** Current scorecard, active BLOCK items, standing orders
> - **Tess:** Current pipeline stage data, naming convention, classification rules
> - **Veda:** Current edit state, asset IDs in progress, test results
> - **Neco:** Current audience context, active angle, behavioral frameworks in use
>
> Show me the draft. One phase, one stop.

- [ ] Adaptive Compaction Protocol created
- [ ] 5 stages defined
- [ ] Per-agent "always keep" items specified

---

### P2-4: Create Context Reservoir Pattern

**Why:** Marketing OS creates a human-curated bridge document between Foundation and Copy sessions — distilled intelligence that the human reviews and decides what to emphasize. For Creative OS agents that run multi-session workflows (Neco developing a full angle library, Orion running multi-week strategic planning), a similar bridge pattern prevents context loss.

**Prompt for Claude:**

> Read about the Context Reservoir pattern in Marketing OS's Session Architecture at `_performance-golf/pg-marketing-os/~system/SESSION-ARCHITECTURE.md` — search for "Context Reservoir."
>
> Consider which Creative OS workflows would benefit from a human-curated bridge document:
> - **Neco:** Multi-session angle development (audience research → angle ideation → hook generation → script writing)
> - **Orion:** Multi-week strategic planning (30→60→90 day progression)
> - **Tess→Neco:** When Tess intelligence feeds a Neco creative session (data context needs to bridge)
>
> Add a "Context Reservoir Pattern" section to the SYSTEM-CORE.md at `_performance-golf/pg-creative-os/SYSTEM-CORE.md`.
>
> Define:
> 1. When to create a context reservoir (after multi-session foundation work, before creative execution)
> 2. Who curates it (human reviews and decides emphasis)
> 3. What goes in it (distilled decisions, not raw session logs)
> 4. Where it lives (per-project output directory)
> 5. How agents consume it (loaded at session start for downstream work)
>
> Apply the edit. One phase, one stop.

- [ ] Context Reservoir pattern added to SYSTEM-CORE.md

---

## PHASE 3 — Quality Enforcement Automation

**Prerequisite:** Phases 0-2 complete. Core governance docs exist.

---

### P3-1: Create Hook-Based Validation System

**Why:** Marketing OS has 12+ automated validators that fire on file writes — schema compliance, naming convention, forbidden gate statuses, fact change staleness, feature regression. Creative OS has zero hooks. All quality enforcement is instruction-based (except Veda's code gates). Instructions can be ignored. Hooks cannot.

**Marketing OS source to model:**
- `_performance-golf/pg-marketing-os/.hooks/` (directory structure)
- Look at `dispatch-validator.sh` and the `validators/` subdirectory

**Prompt for Claude:**

> Read the Marketing OS hook system. Start with the directory structure:
> ```
> ls _performance-golf/pg-marketing-os/.hooks/
> ls _performance-golf/pg-marketing-os/.hooks/validators/
> ```
>
> Read the dispatch validator at `_performance-golf/pg-marketing-os/.hooks/dispatch-validator.sh` and 2-3 representative validators from the `validators/` directory.
>
> Now create an equivalent hook system for Creative OS. Start with the foundation:
>
> 1. Create `_performance-golf/pg-creative-os/.hooks/dispatch-validator.sh` — main dispatcher that routes to specialized validators
> 2. Create `_performance-golf/pg-creative-os/.hooks/validators/` directory
> 3. Create these initial validators:
>    - `naming_convention_validator` — checks Asset IDs against 15-position convention (TESS-NAMING-CONVENTION.md)
>    - `forbidden_gate_status_validator` — catches "conditional pass," "partial pass," etc.
>    - `handoff_field_validator` — checks required fields per PIPELINE-HANDOFF-REGISTRY.md
> 4. Register hooks in Claude Code settings (or document how to register for other tools)
>
> Show me the plan before creating any files. One phase, one stop.

- [ ] Dispatch validator created
- [ ] Naming convention validator created
- [ ] Forbidden gate status validator created
- [ ] Handoff field validator created
- [ ] Hooks registered

---

### P3-2: Add Token Estimator Hook

**Why:** Marketing OS has an automated hook that tracks cumulative token usage per session, manages zone transitions, and injects warnings. Creative OS has context zones defined in Anti-Degradation but they're self-monitored (instruction-based). Automating this removes the chance of an agent ignoring its own context pressure.

**Marketing OS source to model:**
`_performance-golf/pg-marketing-os/.hooks/validators/token_estimator.py`

**Prompt for Claude:**

> Read the Marketing OS token estimator at `_performance-golf/pg-marketing-os/.hooks/validators/token_estimator.py`.
>
> Create an equivalent for Creative OS at `_performance-golf/pg-creative-os/.hooks/validators/token_estimator.py`.
>
> It should:
> 1. Track cumulative token usage per session (estimate based on file reads/writes)
> 2. Map to Creative OS's context zones (GREEN/YELLOW/RED/CRITICAL)
> 3. Inject zone warnings into agent context when thresholds are crossed
> 4. Detect potential compaction artifacts (content loss on re-read)
> 5. Store state in `.token-estimator-state.json`
>
> Adapt thresholds for Creative OS's typical session sizes. Show me the plan first. One phase, one stop.

- [ ] Token estimator hook created
- [ ] Zone thresholds configured
- [ ] State file defined

---

### P3-3: Add Session-End Stop Hook

**Why:** Marketing OS scans the entire project output tree on session end and blocks completion if critical validation failures exist. Creative OS has nothing — sessions end without any automated check.

**Prompt for Claude:**

> Read the Marketing OS stop hook pattern (look for stop-related hooks in `_performance-golf/pg-marketing-os/.hooks/`).
>
> Create a session-end stop hook for Creative OS at `_performance-golf/pg-creative-os/.hooks/stop-hook.sh` (or `.py`).
>
> On session end, check for:
> 1. Unclosed phases (phase started but no "PHASE COMPLETE" in session log)
> 2. Missing handoff files (if a handoff was expected this session)
> 3. Uncommitted code changes (Veda — check `git status`)
> 4. Unverified spreadsheet writes (Tess/Veda — check if plan mode was used)
> 5. Build State not updated (SESSION-LOG.md Build State older than session's changes)
>
> If critical issues found → warn (don't block — this is advisory for now). Log findings.
>
> Show me the plan first. One phase, one stop.

- [ ] Stop hook created
- [ ] Checks defined per agent
- [ ] Advisory warnings working

---

## PHASE 4 — Operational Documentation

**Prerequisite:** Phases 0-3 complete. Core systems built.

---

### P4-1: Create OPERATIONS-MANUAL.md

**Why:** Marketing OS has a single operations reference covering skill directory structure, layer architecture, and execution workflow. Creative OS has no equivalent — new operators have to piece together understanding from 4 different agent CLAUDE.md files.

**Marketing OS source to model:**
`_performance-golf/pg-marketing-os/~system/OPERATIONS-MANUAL.md`

**Prompt for Claude:**

> Read the Marketing OS Operations Manual at `_performance-golf/pg-marketing-os/~system/OPERATIONS-MANUAL.md`.
>
> Read the Creative OS root CLAUDE.md, SETUP.md, SYSTEM-CORE.md, and each agent's CLAUDE.md.
>
> Create: `_performance-golf/pg-creative-os/OPERATIONS-MANUAL.md`
>
> This is the single reference for how Creative OS works. Include:
> 1. **System overview** — What Creative OS is, the 4 agents, how they relate (pipeline diagram)
> 2. **Agent directory structure** — Standard layout per agent
> 3. **Inter-agent pipeline** — Full flow from Tess intelligence → Veda production + Neco copy, with Orion oversight
> 4. **Execution workflow** — How to start a session, what to load, phase-stop rules
> 5. **Role-based entry points** — New Operator → this file, Developer → README, MCP Setup → MCP-TOOL-REGISTRY, Active Session → agent CLAUDE.md
> 6. **Session protocols** — Build State, 500-line archive, handoff prompts
> 7. **Quality systems** — Anti-Degradation, gates, hooks (reference files, don't duplicate)
> 8. **Common workflows** — "I want to process new ad data" (Tess), "I want to create a new ad" (Neco→Veda), "I want to review strategy" (Orion)
>
> Keep it practical. This is an operator manual, not an architecture document.
>
> Show me the draft. One phase, one stop.

- [ ] OPERATIONS-MANUAL.md created
- [ ] Pipeline diagram included
- [ ] Role-based entry points defined
- [ ] Common workflows documented

---

### P4-2: Add Role-Based Entry Points to Root CLAUDE.md

**Prompt for Claude:**

> Read `_performance-golf/pg-creative-os/CLAUDE.md`.
>
> Add a "Getting Started" section near the top (after any existing preamble) with role-based entry points:
>
> - **New to Creative OS?** → Start with `OPERATIONS-MANUAL.md`
> - **Setting up tools?** → Start with `MCP-TOOL-REGISTRY.md`
> - **Starting a session?** → Go to your agent's directory and read its `CLAUDE.md`
> - **Understanding quality rules?** → Read `SYSTEM-CORE.md` then `CREATIVE-OS-ANTI-DEGRADATION.md`
>
> Keep it concise — 4-5 lines. Apply the edit. One phase, one stop.

- [ ] Role-based entry points added to root CLAUDE.md

---

### P4-3: Create PROTOCOL-MANIFEST.md

**Why:** Marketing OS has priority-banded conditional protocol loading — each skill only loads the protocols it needs, sorted by priority. This prevents token waste. Creative OS loads everything in CLAUDE.md every time.

**Marketing OS source to model:**
`_performance-golf/pg-marketing-os/~system/PROTOCOL-MANIFEST.md`

**Prompt for Claude:**

> Read the Marketing OS Protocol Manifest at `_performance-golf/pg-marketing-os/~system/PROTOCOL-MANIFEST.md`.
>
> Now list all protocols that exist in Creative OS (from `protocols/` directory, Anti-Degradation, Effort Protocol, agent-specific docs).
>
> Create: `_performance-golf/pg-creative-os/PROTOCOL-MANIFEST.md`
>
> Include:
> 1. **Master protocol list** with priority bands (10 = always load, 50 = conditional, 90 = reference only)
> 2. **Per-agent loading profiles** — which protocols each agent needs
> 3. **Loading algorithm** — "Read this manifest. Load only protocols where Load Condition = TRUE for your current agent and task. Sort by priority."
>
> This prevents every agent from loading every protocol every time.
>
> Show me the draft. One phase, one stop.

- [ ] PROTOCOL-MANIFEST.md created
- [ ] Priority bands assigned
- [ ] Per-agent loading profiles defined

---

### P4-4: Upgrade SETUP.md to Full Startup Guide

**Why:** Current SETUP.md lists prerequisites and dependencies but lacks step-by-step configuration with verification, troubleshooting, and a "confirm setup complete" checklist.

**Prompt for Claude:**

> Read the current SETUP.md at `_performance-golf/pg-creative-os/SETUP.md`.
> Also read the MCP-TOOL-REGISTRY.md we created.
>
> Upgrade SETUP.md to a full startup guide. Add:
> 1. **Step-by-step instructions** for each MCP server configuration (not just "you need Google Sheets" — HOW to configure it, what env vars to set, what to test)
> 2. **Verification commands** — after each setup step, a command to confirm it worked
> 3. **Troubleshooting section** — common issues (Fathom not portable: how to fix path, ClickUp API key: where to get it, Iconik credentials: who to ask)
> 4. **"Setup Complete" checklist** — a final numbered list to run through and confirm everything works
> 5. **"I don't have X" guidance** — for each tool, what happens if you DON'T have it configured. Can you still run the agent? Which features are disabled?
>
> Show me the changes. One phase, one stop.

- [ ] SETUP.md upgraded
- [ ] Step-by-step instructions per tool
- [ ] Verification commands included
- [ ] Troubleshooting section added
- [ ] Setup Complete checklist at bottom

---

### P4-5: Update Veda MASTER-AGENT to v1.0

**Why:** Veda's code is the most mature (Phases 1-4 complete, 620/630 tests passing), but the MASTER-AGENT doc is v0.5 DRAFT. The doc doesn't reflect reality. New operators will be misled.

**Prompt for Claude:**

> Read the current Veda Master Agent at `_performance-golf/pg-creative-os/veda-video-editing-agent/VEDA-MASTER-AGENT.md`.
>
> Now read the Veda CLAUDE.md (Build State), SESSION-LOG.md (recent sessions), and PRD to understand current implemented state.
>
> Also scan the Veda `src/` directory to understand the actual codebase structure.
>
> Update VEDA-MASTER-AGENT.md to v1.0:
> 1. Remove DRAFT designation
> 2. Update all phase descriptions to reflect actual implemented state (Phases 1-4 COMPLETE)
> 3. Update test count and coverage
> 4. Update integration status (Iconik, FAL.ai, Google Sheets — what's working vs blocked)
> 5. Update pipeline description to match actual code flow
> 6. Note Phase 5 status (demo blocked on Iconik transcriptions)
> 7. Keep any forward-looking items clearly marked as PLANNED
>
> Show me a diff of changes. One phase, one stop.

- [ ] VEDA-MASTER-AGENT.md updated to v1.0
- [ ] DRAFT removed
- [ ] Actual state reflected

---

### P4-6: Specify Remaining Orion Sub-Agents (4-8)

**Why:** Only 3 of 8 Orion sub-agents are formally specified. Modes 3-5 (Delegation, Prep, Launch Tracking) lack specs. This creates fragility — if a team member needs to use these modes, there's no documentation.

**Prompt for Claude:**

> Read Orion's full reference at `_performance-golf/pg-creative-os/orion-chief-of-staff/ORION-REFERENCE.md`.
> Also read the CLAUDE.md and SESSION-LOG.md for context on how Orion actually operates.
>
> The following sub-agents need formal specifications:
> - **delegation_engine** (Mode 3) — Triage, assign, track delegated tasks
> - **launch_tracker** (Mode 5) — Track launches against scorecard
> - **prep_generator** (Mode 4) — Meeting prep
> - **hiring_advisor** — Team evaluation and hiring support
> - **operating_rhythm** — Weekly/monthly cadence management
>
> For each, write a sub-agent specification following the same format as the existing specified sub-agents (strategic_tracker, challenger, communications_strategist). Include:
> - Identity and role
> - Input requirements
> - Output format
> - Routing rules (when to activate)
> - Quality gates
>
> Add them to ORION-REFERENCE.md. Show me the draft. One phase, one stop.

- [ ] delegation_engine specified
- [ ] launch_tracker specified
- [ ] prep_generator specified
- [ ] hiring_advisor specified
- [ ] operating_rhythm specified

---

## PHASE 5 — Learning & Improvement Systems

**Prerequisite:** Phases 0-4 complete.

---

### P5-1: Extend Neco's Learning System to All Agents

**Why:** Neco is the only agent with a formal learning system (failure-fixes.md + patterns.md). Marketing OS has a 10-class issue logger and L1-L6 learning promotion protocol. Every agent should learn from its mistakes, not just Neco.

**Marketing OS sources to model:**
- `protocols/SELF-LEARNING-PROMOTION-PROTOCOL.md` (search in Marketing OS `~system/protocols/`)

**Neco's existing system to model:**
- `_performance-golf/pg-creative-os/neco-neurocopy-agent/_learning/`

**Prompt for Claude:**

> Read Neco's learning system at `_performance-golf/pg-creative-os/neco-neurocopy-agent/_learning/failure-fixes.md` and `_performance-golf/pg-creative-os/neco-neurocopy-agent/_learning/patterns.md`.
>
> Read the Marketing OS Self-Learning Promotion Protocol — search for it in `_performance-golf/pg-marketing-os/~system/protocols/`.
>
> Now create `_learning/` directories with starter templates for the other 3 agents:
> - `_performance-golf/pg-creative-os/orion-chief-of-staff/_learning/failure-fixes.md`
> - `_performance-golf/pg-creative-os/orion-chief-of-staff/_learning/patterns.md`
> - `_performance-golf/pg-creative-os/tess-strategic-scaling-system/_learning/failure-fixes.md`
> - `_performance-golf/pg-creative-os/tess-strategic-scaling-system/_learning/patterns.md`
> - `_performance-golf/pg-creative-os/veda-video-editing-agent/_learning/failure-fixes.md`
> - `_performance-golf/pg-creative-os/veda-video-editing-agent/_learning/patterns.md`
>
> Each file should:
> 1. Use Neco's template format (entry template with date, issue, fix, structural change)
> 2. Add Marketing OS's 10 issue classes (factual-error, voice-drift, structural-regression, missing-input, scope-creep, specification-gap, context-loss, hallucination, threading-failure, other)
> 3. Include L1-L6 promotion scale from Marketing OS (observation → validated → actionable → promoted → cross-campaign → systemic)
> 4. Be pre-populated with relevant headers/sections but empty entries (agents fill them as they work)
>
> Also update each agent's CLAUDE.md to reference the new `_learning/` directory.
>
> Show me the plan. One phase, one stop.

- [ ] Orion `_learning/` created
- [ ] Tess `_learning/` created
- [ ] Veda `_learning/` created
- [ ] 10 issue classes included
- [ ] L1-L6 scale included
- [ ] Agent CLAUDE.md files updated

---

### P5-2: Create Feedback/Revision Protocol

**Why:** Marketing OS has a 3-level severity system for handling revisions (Light Edit / Structural / Full Regen). Each level specifies what gets re-loaded. Without this, agents "drift to raw model" on revisions — they lose structural integrity because the skill infrastructure isn't re-engaged.

**Marketing OS source to model:**
`_performance-golf/pg-marketing-os/~system/protocols/FEEDBACK-REVISION-PROTOCOL.md`

**Prompt for Claude:**

> Read the Marketing OS Feedback/Revision Protocol at `_performance-golf/pg-marketing-os/~system/protocols/FEEDBACK-REVISION-PROTOCOL.md`.
>
> Create: `_performance-golf/pg-creative-os/protocols/FEEDBACK-REVISION-PROTOCOL.md`
>
> Adapt for Creative OS with 3 severity levels:
>
> **Level 1: Light Edit** — Word/value changes. Examples: "Change this root angle name," "Fix this Asset ID," "Update this metric."
> - Re-load: Anti-degradation + naming convention (if applicable)
> - No re-run of upstream
>
> **Level 2: Structural** — Section/approach changes. Examples: "Rewrite this Neco angle with different framing," "Restructure Orion's weekly update format," "Change Tess classification thresholds."
> - Re-load: Agent CLAUDE.md + relevant sub-agent specs + constraint ledger
> - Consider re-running affected downstream handoffs
>
> **Level 3: Full Regen** — Fundamental strategy changes. Examples: "New brand thread," "Different scorecard metrics," "Change the naming convention structure."
> - Full re-load of all agent docs + full context
> - Mandatory constraint ledger update
> - Mandatory fact change propagation
>
> Include per-agent examples for each level. Include non-negotiables that apply at ALL levels.
>
> Show me the draft. One phase, one stop.

- [ ] Feedback/Revision Protocol created
- [ ] 3 severity levels defined
- [ ] Per-agent examples included
- [ ] Non-negotiables listed

---

### P5-3: Create OUTPUT-STRUCTURE.md

**Why:** Marketing OS has a canonical output standard — every project follows the same tree structure with constraint-ledger, fact-changes, issue-log, and learning-log at known locations. Creative OS agents each have their own output conventions but no unified standard.

**Marketing OS source to model:**
`_performance-golf/pg-marketing-os/~system/OUTPUT-STRUCTURE.md`

**Prompt for Claude:**

> Read the Marketing OS Output Structure at `_performance-golf/pg-marketing-os/~system/OUTPUT-STRUCTURE.md`.
>
> Now review each Creative OS agent's current output conventions:
> - Tess: `output/` directory with timestamped folders
> - Veda: per-asset directories with full Asset ID naming
> - Neco: `_output/` per-project with versioned deliverables
> - Orion: `_ops/` with dated operational outputs
>
> Create: `_performance-golf/pg-creative-os/OUTPUT-STRUCTURE.md`
>
> Define a unified output standard that:
> 1. Respects existing agent conventions (don't break what works)
> 2. Adds system-level output files at project level: constraint-ledger.yaml, fact-changes.yaml, issue-log.md, learning-log.md
> 3. Standardizes project code naming (how to name a project across agents)
> 4. Shows the canonical tree structure
> 5. Defines which files are required vs optional per project type
>
> Show me the draft. One phase, one stop.

- [ ] OUTPUT-STRUCTURE.md created
- [ ] Existing conventions preserved
- [ ] System-level files added
- [ ] Canonical tree defined

---

## PHASE 6 — Copy Quality (For Neco)

**Prerequisite:** Phases 0-5 complete. Only needed if Neco is generating copy.

---

### P6-1: Create Anti-Slop Lexicon

**Why:** Marketing OS has a banned words/phrases list that prevents AI-generated copy from sounding robotic. Neco generates hooks, scripts, and briefs but has no lexicon filter.

**Marketing OS source to model:**
Search for anti-slop references in `_performance-golf/pg-marketing-os/` — look in the editorial skill (Skill 20) and humanization protocol.

**Prompt for Claude:**

> Search for "anti-slop" or "banned words" in the Marketing OS directory `_performance-golf/pg-marketing-os/`. Read the relevant file(s).
>
> Create: `_performance-golf/pg-creative-os/protocols/ANTI-SLOP-LEXICON.md`
>
> Start with Marketing OS's banned words list and adapt for ad/social copy context. Add categories:
> 1. **Universal bans** — words that sound AI-generated in any context (e.g., "delve," "leverage," "utilize," "landscape," "robust")
> 2. **Ad copy bans** — phrases that are overused in ads (adapt for golf/DTC context)
> 3. **Replacements** — for each banned word, suggest a natural alternative
> 4. **How to enforce** — agents must check final output against this lexicon before delivery
>
> Reference Neco's existing copy constraints at `_performance-golf/pg-creative-os/neco-neurocopy-agent/_reference/` (look for copy constraints file).
>
> Show me the draft. One phase, one stop.

- [ ] Anti-Slop Lexicon created
- [ ] Universal bans + ad-specific bans
- [ ] Replacements provided
- [ ] Enforcement rules defined

---

### P6-2: Create Humanization Protocol

**Why:** Marketing OS has a 3-layer humanization model (word-level, structural, voice) with a living pattern library of 12 AI anti-patterns. Neco has quality validation but no systematic AI-pattern elimination system.

**Marketing OS sources to model:**
- `protocols/HUMANIZATION-PROTOCOL.md` (search in Marketing OS)
- The Humanization Pattern Library (in the editorial skill area)

**Prompt for Claude:**

> Search for "humanization" in `_performance-golf/pg-marketing-os/`. Read the Humanization Protocol and the Pattern Library.
>
> Create: `_performance-golf/pg-creative-os/protocols/HUMANIZATION-PROTOCOL.md`
>
> Adapt Marketing OS's 3-layer model for Creative OS:
>
> **Layer 1: Word-Level** — Anti-Slop Lexicon (reference the file we just created), filler word detection, cliche elimination
>
> **Layer 2: Structural** — Sentence construction patterns that signal AI. Start with Marketing OS's 12 patterns, adapt for ad copy:
> 1. Overloaded compound sentences
> 2. Tricolon over-signposting
> 3. Over-explaining after punchlines
> 4. Missing spoken emphasis markers
> 5. Missing causal connectors
> 6. Sanitized language
> 7. Vague referents
> 8. Speaker emotion over audience emotion
> 9. Redundant re-teaching
> 10. Unnecessary forward-promises
> 11. Missed callbacks
> 12. Register/metaphor mixing
>
> Add ad-specific patterns if applicable (hook fatigue, generic CTA language, etc.)
>
> **Layer 3: Voice** — Register consistency, persona fidelity. Reference Neco's behavioral frameworks as the voice standard.
>
> Include the Human Edit Extraction procedure (6 steps from Marketing OS) — so when you or the copywriter edits Neco's output, the system learns.
>
> Show me the draft. One phase, one stop.

- [ ] Humanization Protocol created
- [ ] 3 layers defined
- [ ] 12+ patterns listed
- [ ] Human Edit Extraction included

---

### P6-3: Evaluate Arena for Neco

**Why:** Marketing OS uses a 7-competitor Arena for creative generation. Neco uses behavioral frameworks + sub-agent pipeline. This isn't automatically a gap — different approaches for different domains. But it's worth evaluating.

**This is a decision item, not an implementation item.**

**Prompt for Claude:**

> Read the Marketing OS Arena Core Protocol at `_performance-golf/pg-marketing-os/~system/protocols/ARENA-CORE-PROTOCOL.md`.
>
> Now read Neco's current creative generation approach:
> - `_performance-golf/pg-creative-os/neco-neurocopy-agent/NECO-SUB-AGENTS.md` (focus on Sub-Agents #3-#5: Angle Ideation, Hook Generation, Script Generation)
>
> Write a brief comparison (1 page max):
> 1. How Marketing OS Arena generates creative (7 competitors, 3 rounds, dedicated critic)
> 2. How Neco generates creative (behavioral frameworks, layered sub-agents, human checkpoints)
> 3. Where Arena would add value to Neco (e.g., hook generation with multiple competing approaches)
> 4. Where Arena would NOT add value (e.g., audience intelligence is analytical, not creative)
> 5. Recommendation: adopt Arena for specific Neco tasks, or keep current approach, or hybrid
>
> This is a DECISION DOCUMENT — do not implement anything. Present analysis for Don and Christopher to decide.
>
> One phase, one stop.

- [ ] Arena evaluation complete
- [ ] Decision documented
- [ ] If adopting: implementation plan created separately

---

## PHASE 7 — System-Agnostic Hardening

**Prerequisite:** Phases 0-6 complete (or at least 0-5).

---

### P7-1: Document Model-Agnostic Design

**Prompt for Claude:**

> Read the SESSION-ARCHITECTURE.md we created at `_performance-golf/pg-creative-os/SESSION-ARCHITECTURE.md`.
>
> Add a section called "System-Agnostic Design Principles" that states:
>
> 1. All Creative OS protocols work with any AI model (Claude, Gemini, OpenAI, etc.)
> 2. Nothing in the protocol stack uses Claude-specific syntax or features
> 3. Gate system is structural (file existence, not model-specific validation)
> 4. Specimens and frameworks are plain text/markdown (any model can consume them)
> 5. Hook system uses standard shell scripts (not model-specific APIs)
> 6. When recommending models, use capability descriptions (deep reasoning, code generation, creative writing) with current model mappings that can be updated
>
> Also verify that the SYSTEM-CORE.md, Anti-Degradation, and all protocols we've created contain no Claude-specific syntax. Flag any that do.
>
> Apply the edit. One phase, one stop.

- [ ] System-agnostic principles documented
- [ ] All files verified Claude-agnostic

---

### P7-2: Create Agent Loading Profiles (YAML)

**Why:** Marketing OS has YAML-based loading profiles per skill — declaring what each skill needs to load (arena Y/N, MCP tools, protocols). This enables ANY AI tool to know what to load without reading the full system. Creative OS doesn't have this.

**Marketing OS source to model:**
`_performance-golf/pg-marketing-os/~system/skill-loading-profiles/` (look at a few YAML files)

**Prompt for Claude:**

> Read 2-3 skill loading profiles from Marketing OS at `_performance-golf/pg-marketing-os/~system/skill-loading-profiles/`.
>
> Create loading profiles for each Creative OS agent:
> - `_performance-golf/pg-creative-os/_shared/agent-loading-profiles/orion.yaml`
> - `_performance-golf/pg-creative-os/_shared/agent-loading-profiles/tess.yaml`
> - `_performance-golf/pg-creative-os/_shared/agent-loading-profiles/veda.yaml`
> - `_performance-golf/pg-creative-os/_shared/agent-loading-profiles/neco.yaml`
>
> Each YAML file should declare:
> 1. `agent_name` and `version`
> 2. `mcp_tools_required` — list of required MCP servers
> 3. `mcp_tools_optional` — nice-to-have tools
> 4. `external_apis` — API dependencies
> 5. `protocols_required` — which protocol files to load
> 6. `reference_files` — which reference docs to load
> 7. `generates_code` — boolean
> 8. `generates_copy` — boolean
> 9. `requires_human_checkpoints` — boolean + list of checkpoints
> 10. `pre_session_checks` — commands to run before starting
>
> Show me the drafts. One phase, one stop.

- [ ] Orion loading profile created
- [ ] Tess loading profile created
- [ ] Veda loading profile created
- [ ] Neco loading profile created

---

## PHASE 8 — Reverse Findings (Marketing OS Upgrades)

> **NOTE:** These are items where Creative OS does something BETTER than Marketing OS. Christopher, review these with Don. They go the other direction — improvements for Marketing OS to adopt from Creative OS.

---

### R1: Anti-Degradation Core + Adapter Pattern

**What Creative OS does better:** A single `CREATIVE-OS-ANTI-DEGRADATION.md` core file defines universal enforcement, then each agent adds domain-specific gates via adapters. Marketing OS has per-skill anti-degradation files with duplicated universal rules.

**Recommendation for Marketing OS:** Extract a shared `ANTI-DEGRADATION-CORE.md` from the duplicated rules across all per-skill files. Keep per-skill files as adapters that ADD skill-specific rules.

---

### R2: Standalone Effort Protocol

**What Creative OS does better:** Dedicated `CREATIVE-OS-EFFORT-PROTOCOL.md` maps thinking depth to execution phases per agent. Marketing OS embeds effort in SYSTEM-CORE but doesn't give it standalone treatment.

**Recommendation for Marketing OS:** Extract effort protocol into its own file with per-skill mappings.

---

### R3: Challenger Protocol (Orion)

**What Creative OS does better:** FLAG/BLOCK/CONVINCE ME with multi-session persistence. Marketing OS has Arena Critic but no strategic-level challenger during Foundation skills.

**Recommendation for Marketing OS:** Add a strategic challenger role during Skills 03-06 (Root Cause, Mechanism, Promise, Big Idea) — the most consequential decisions.

---

### R4: Specimen Vault Admission Gate (Neco)

**What Creative OS does better:** $50K quality threshold for specimens. Only the best examples enter the vault. Marketing OS's Specimen Guide doesn't have explicit admission criteria.

**Recommendation for Marketing OS:** Add admission criteria to Specimen Guide. Prevents mediocre examples from lowering the quality floor.

---

### R5: Concrete Failure-to-Rule Learning (Neco)

**What Creative OS does better:** Neco's workflow: mistake → correction → record in failure-fixes.md → structural fix → CLAUDE.md rule. Direct and actionable. Marketing OS's L1-L6 scale is more theoretical.

**Recommendation for Marketing OS:** Supplement L1-L6 with Neco's concrete failure→fix→rule workflow for the lower levels (L1-L3).

---

### R6: Agent Provisioning Template

**What Creative OS does better:** `_shared/agent-provisioning-template.md` is a 5-phase checklist for standing up a new agent.

**Recommendation for Marketing OS:** Create a skill/engine provisioning template for adding new skills or engines to the system.

---

### R7: iCloud Git Guard

**What Creative OS does better:** Checks for `.git/index 2` before/after git operations. Prevents iCloud sync corruption.

**Recommendation for Marketing OS:** Add to pre-commit gates if any operators use iCloud-synced directories.

---

### R8: Non-Linear Pipeline Documentation

**What Creative OS does better:** Explicit diagram showing parallel flows (Tess→Neco AND Tess→Veda simultaneously). Marketing OS presents as purely sequential (01→02→...→20→engines).

**Recommendation for Marketing OS:** Document which skills can run in parallel and which engine branches can execute concurrently.

---

### R9: Behavioral Psychology Frameworks

**What Creative OS does better:** Neco's 11 behavioral frameworks (FATE, Six-Axis, Behavior Compass, etc.) give copy generation real psychological depth.

**Recommendation for Marketing OS:** Consider adding behavioral frameworks to Foundation skills (audience analysis) and long-form copy generation.

---

### R10: Hub-and-Spoke Orchestration

**What Creative OS does better:** Neco's 3-layer architecture (Foundation → Creative Execution → Quality) with flexible routing by task type. Marketing OS skills are more linear.

**Recommendation for Marketing OS:** For skills with multiple output types (e.g., Skill 10 Headlines could produce various formats), consider hub-and-spoke routing.

---

## PROGRESS TRACKER

| Phase | Items | Status |
|-------|-------|--------|
| Phase 0 — Critical Infrastructure | 3 items | [ ] Not Started |
| Phase 1 — Structural Quality | 5 items | [ ] Not Started |
| Phase 2 — Context Management | 4 items | [ ] Not Started |
| Phase 3 — Quality Automation | 3 items | [ ] Not Started |
| Phase 4 — Operational Docs | 6 items | [ ] Not Started |
| Phase 5 — Learning Systems | 3 items | [ ] Not Started |
| Phase 6 — Copy Quality | 3 items | [ ] Not Started |
| Phase 7 — System-Agnostic | 2 items | [ ] Not Started |
| Phase 8 — Reverse Findings | 10 items (for Don) | [ ] Not Started |

**Total: 39 items across 9 phases**

---

## RULES FOR CHRISTOPHER'S CLAUDE SESSION

When working through this fix list:

1. **One phase at a time.** Do not jump ahead.
2. **One item at a time within a phase.** Complete, review, confirm, then next.
3. **Always read the Marketing OS source file BEFORE creating the Creative OS equivalent.** The prompt tells you which file to read.
4. **Adapt, don't copy.** Creative OS has a different domain (data intelligence, video production, ad copy, strategy) than Marketing OS (long-form VSL copywriting). The PATTERNS transfer; the specifics must be adapted.
5. **Don't break what works.** Creative OS has strong patterns already (Anti-Degradation, Root Angle Principle, Naming Convention, Session Compression). Build on them; don't replace them.
6. **Check off items as you go.** Update this file directly.
7. **If stuck on an item, skip it and note why.** Come back to it. Don't let one blocker stall the whole phase.
8. **Phase 8 (Reverse Findings) is for Don.** Christopher reviews with Don, then Don implements in Marketing OS.
