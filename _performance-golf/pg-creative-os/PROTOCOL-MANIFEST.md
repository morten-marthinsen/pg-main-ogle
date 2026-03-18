# Creative OS — Protocol Manifest

**Version:** 1.0
**Created:** 2026-03-18
**Purpose:** Priority-banded protocol loading — each agent loads only what it needs, sorted by priority. Prevents every agent from loading every protocol every session.

---

## HOW TO USE

At session start, after reading the agent's `CLAUDE.md`:

1. Read this manifest
2. Find your agent's loading profile (below)
3. Load only protocols where **Load Condition = TRUE** for your current agent and task
4. Sort by priority (lower number = load first)

**Most sessions need only 3-4 protocols.** Don't load everything.

---

## MASTER PROTOCOL LIST

| Priority | Protocol | File | Load Condition |
|----------|----------|------|----------------|
| 10 | **SYSTEM-CORE** | `SYSTEM-CORE.md` | ALWAYS — every agent, every session |
| 10 | **Anti-Degradation (Core)** | `CREATIVE-OS-ANTI-DEGRADATION.md` | ALWAYS — every agent, every session |
| 10 | **Anti-Degradation (Adapter)** | `[AGENT]-ANTI-DEGRADATION.md` | ALWAYS — load your agent's adapter |
| 20 | **Effort Protocol** | `CREATIVE-OS-EFFORT-PROTOCOL.md` | When executing multi-phase work (not quick lookups) |
| 30 | **Pipeline Handoff Registry** | `protocols/PIPELINE-HANDOFF-REGISTRY.md` | When consuming or producing inter-agent handoffs |
| 40 | **Constraint Ledger** | `protocols/CONSTRAINT-LEDGER-PROTOCOL.md` | When making or consuming decisions that constrain downstream work |
| 40 | **Fact Change Propagation** | `protocols/FACT-CHANGE-PROPAGATION-PROTOCOL.md` | When a factual value has changed and needs propagation |
| 50 | **Adaptive Compaction** | `protocols/ADAPTIVE-COMPACTION-PROTOCOL.md` | When context zone reaches YELLOW or above |
| 50 | **Session Architecture** | `SESSION-ARCHITECTURE.md` | When planning session structure or model selection |
| 60 | **Naming Convention** | `tess-.../TESS-NAMING-CONVENTION.md` | When parsing or generating Asset IDs (Tess, Veda) |
| 70 | **Feedback/Revision Protocol** | `protocols/FEEDBACK-REVISION-PROTOCOL.md` | When revising previous output (when created) |
| 80 | **Operations Manual** | `OPERATIONS-MANUAL.md` | Onboarding only — not loaded during normal sessions |
| 80 | **MCP Tool Registry** | `MCP-TOOL-REGISTRY.md` | Setup only — not loaded during normal sessions |
| 90 | **Output Structure** | `OUTPUT-STRUCTURE.md` | Reference only — when organizing project outputs (when created) |

---

## PER-AGENT LOADING PROFILES

### Orion (Strategic Chief of Staff)

| Priority | Protocol | Load? | Notes |
|----------|----------|-------|-------|
| 10 | SYSTEM-CORE | YES | Always |
| 10 | Anti-Degradation Core | YES | Always |
| 10 | Orion Anti-Degradation | YES | Always (in CLAUDE.md inline) |
| 20 | Effort Protocol | YES | For strategic analysis, wise reply, meeting prep |
| 30 | Pipeline Handoff Registry | IF | If issuing directives to other agents |
| 40 | Constraint Ledger | IF | If making scorecard or brand thread decisions |
| 50 | Adaptive Compaction | IF | If context zone ≥ YELLOW |
| 60 | Naming Convention | NO | Orion doesn't parse Asset IDs |

### Tess (Strategic Scaling System)

| Priority | Protocol | Load? | Notes |
|----------|----------|-------|-------|
| 10 | SYSTEM-CORE | YES | Always |
| 10 | Anti-Degradation Core | YES | Always |
| 10 | Tess Anti-Degradation | YES | Always |
| 20 | Effort Protocol | YES | For data analysis and pipeline work |
| 30 | Pipeline Handoff Registry | YES | Tess produces handoffs for Veda and Neco |
| 40 | Constraint Ledger | IF | If naming convention or classification changes |
| 50 | Adaptive Compaction | IF | If context zone ≥ YELLOW (common with large data loads) |
| 60 | Naming Convention | YES | Core to Tess's data operations |

### Veda (Video Editing Agent)

| Priority | Protocol | Load? | Notes |
|----------|----------|-------|-------|
| 10 | SYSTEM-CORE | YES | Always |
| 10 | Anti-Degradation Core | YES | Always |
| 10 | Veda Anti-Degradation | YES | Always |
| 20 | Effort Protocol | YES | For pipeline work and creative decisions |
| 30 | Pipeline Handoff Registry | YES | Veda consumes intake queue from Tess |
| 40 | Constraint Ledger | IF | If root angle or naming changes affect current work |
| 50 | Adaptive Compaction | IF | If context zone ≥ YELLOW |
| 60 | Naming Convention | YES | Core to Veda's Asset ID generation |

### Neco (NeuroCopy Agent)

| Priority | Protocol | Load? | Notes |
|----------|----------|-------|-------|
| 10 | SYSTEM-CORE | YES | Always |
| 10 | Anti-Degradation Core | YES | Always |
| 10 | Neco Anti-Degradation | YES | Always |
| 20 | Effort Protocol | YES | For creative generation and audience analysis |
| 30 | Pipeline Handoff Registry | IF | If consuming Tess data or handing to Veda |
| 40 | Constraint Ledger | IF | If angle decisions constrain downstream |
| 50 | Adaptive Compaction | IF | If context zone ≥ YELLOW |
| 60 | Naming Convention | NO | Neco doesn't generate Asset IDs |

---

## TOKEN SAVINGS

Loading only what's needed saves significant context:

| Session Type | Without Manifest | With Manifest | Savings |
|-------------|-----------------|---------------|---------|
| Quick Orion lookup | ~25K (all protocols) | ~5K (SYSTEM-CORE + AD only) | ~20K |
| Tess pipeline run | ~25K (all protocols) | ~12K (core + handoff + naming) | ~13K |
| Neco creative session | ~25K (all protocols) | ~8K (core + effort) | ~17K |
| Veda bug fix | ~25K (all protocols) | ~10K (core + naming) | ~15K |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial creation. Priority-banded loading for 14 protocols across 4 agents. |
