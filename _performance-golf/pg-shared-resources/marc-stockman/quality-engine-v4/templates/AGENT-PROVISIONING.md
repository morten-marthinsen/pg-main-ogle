# Agent Provisioning — Template
**Quality Engine v4** | Component: Template
**Purpose:** 5-phase checklist for standing up a new agent or skill in any AI system
**Instructions:** Copy this file into your system and fill in the [PLACEHOLDERS]. Follow phases in order.

---

## Phase 0 — Pre-Bootstrap (Gather Before Starting)

### 0.1 Person & Role

| Field | Value |
|-------|-------|
| **Person/Team** | [WHO IS THIS AGENT FOR?] |
| **Role** | [THEIR TITLE AND SCOPE] |
| **Reporting to** | [DIRECT MANAGER] |
| **Key relationships** | [WHO DO THEY WORK WITH DAILY?] |
| **Role definition doc** | [FILE PATH TO ANY DOC THAT DEFINES RESPONSIBILITIES] |

### 0.2 Strategic Context

| Field | Value |
|-------|-------|
| **Top 3 priorities (90-day)** | [WHAT MUST THIS PERSON/TEAM ACCOMPLISH?] |
| **Success metrics** | [WHAT DOES "SUCCESS" LOOK LIKE? LEADING + LAGGING INDICATORS] |
| **Known blockers** | [WHAT IS IN THE WAY RIGHT NOW?] |

### 0.3 Reference Materials to Provide

Gather these BEFORE the first session. The agent bootstraps by analyzing these:

| Material | File Path | Notes |
|----------|-----------|-------|
| Role definition / scope doc | | [THE DOC THAT DEFINES WHAT THIS AGENT DOES] |
| Strategic vision doc | | [WHAT LEADERSHIP EXPECTS] |
| Existing agent specs to learn from | | [ALWAYS INCLUDE — ESTABLISHES SYSTEM CONVENTIONS] |
| Quality standards | | [STANDARD FOR ALL AGENTS] |
| Brand/style guidelines | | [IF APPLICABLE] |

### 0.4 Tool & API Requirements

| Service | Needed? | Credential Location | Notes |
|---------|---------|---------------------|-------|
| [SERVICE_1] | Y/N | | [READ-ONLY OR READ-WRITE?] |
| [SERVICE_2] | Y/N | | [API KEY / OAUTH?] |
| [SERVICE_3] | Y/N | | [SCOPE NEEDED?] |

### 0.5 Governance Decisions (Answer Before Bootstrap)

| Decision | Options | Choice |
|----------|---------|--------|
| **Instance model** | Independent agent / Shared agent with permissions | |
| **Data boundaries** | What data is shared vs. private? | |
| **Inter-agent bridges** | Which existing agents does this one talk to? | |
| **Communication boundary** | Agent drafts only (person sends) / Agent can act directly | |

---

## Phase 1 — Agent Identity & Architecture

Define these in discussion with the stakeholder (intent alignment session):

| Field | Value |
|-------|-------|
| **Agent name** | [SHORT, MEMORABLE] |
| **Agent role** | [ONE SENTENCE: WHAT DOES THIS AGENT DO?] |
| **Agent metaphor** | [e.g., "the strategist", "the brain", "the hands", "the voice"] |
| **Folder name** | `[name]-[role-slug]/` |
| **Runtime** | [Advisory (docs only) / Python / Node.js / Other] |
| **Core principle** | [THE ONE RULE THAT GOVERNS ALL DECISIONS] |
| **Execution modes** | [LIST THE MODES THIS AGENT OPERATES IN] |
| **Sub-agent count** | [HOW MANY SUB-AGENTS? WHAT LAYERS?] |

### Gap Alignment Process

Run an intent alignment session:

1. Start with the role definition doc — identify what the agent IS and IS NOT
2. Surface gaps between what the person needs and what the doc says
3. For each gap, discuss and decide
4. Log decisions in the session log
5. Continue until both sides agree on scope, boundaries, and deliverables

---

## Phase 2 — Foundation Documents (Create in This Order)

| # | Document | Purpose | Template Source |
|---|----------|---------|----------------|
| 1 | `CLAUDE.md` / config file | Auto-loaded agent config — identity, phase-stop, non-negotiables, session protocol, context budget | Any existing agent's config |
| 2 | `[AGENT]-PRD.md` | Full product requirements — scope, architecture, scorecard, protocols, constraints | Existing agent PRD |
| 3 | `[AGENT]-MASTER-AGENT.md` | Master agent spec — execution modes, sub-agent architecture, decision protocols | Existing master agent spec |
| 4 | `[AGENT]-SUB-AGENTS.md` | Sub-agent specifications — each sub-agent's scope, inputs, outputs | Existing sub-agent spec |
| 5 | `[AGENT]-ANTI-DEGRADATION.md` | Agent-specific structural gates (adapter to core system) | Existing anti-degradation adapter |
| 6 | `SESSION-LOG.md` | Build state block + session history | Any existing session log |

### Mandatory Config Sections

Every agent config file must include:

- [ ] Identity paragraph (who am I, what is my mission)
- [ ] Anti-degradation reference (link to core + adapter)
- [ ] Phase-Stop Discipline (one phase, one stop, no exceptions)
- [ ] Non-negotiables (agent-specific rules that cannot be broken)
- [ ] Execution modes table
- [ ] Context budget rules (what to read, what to skip)
- [ ] Key references table (all docs this agent needs)
- [ ] Common mistakes section (grows organically)
- [ ] Session handoff protocol

---

## Phase 3 — Directory Structure

```
[agent-folder]/
+-- [CONFIG_FILE]                   # Auto-loaded config
+-- [AGENT]-PRD.md                  # Product requirements
+-- [AGENT]-MASTER-AGENT.md         # Master agent spec
+-- [AGENT]-SUB-AGENTS.md           # Sub-agent specs
+-- [AGENT]-ANTI-DEGRADATION.md     # Anti-degradation adapter
+-- SESSION-LOG.md                  # Session history
+-- _reference/                     # Input docs (stakeholder provides)
|   +-- [role-definition].md
|   +-- [strategic-docs].md
|   +-- [derived-analyses].md
+-- _ops/                           # Operational outputs
|   +-- [agent-specific-dirs]/
+-- _output/                        # Generated deliverables
+-- _learning/                      # Learning capture
    +-- failure-fixes.md
    +-- patterns.md
```

---

## Phase 4 — Integration

### 4.1 System-Level Updates

After the agent is bootstrapped, update the system-level config:

- [ ] Add agent to the architecture diagram
- [ ] Add agent to the agent map / routing table
- [ ] Add routing rules for this agent's request types
- [ ] Add inter-agent bridges (if any)
- [ ] Add anti-degradation adapter to the adapter table

### 4.2 Anti-Degradation

- [ ] Create `[AGENT]-ANTI-DEGRADATION.md` adapter
- [ ] Reference core system anti-degradation rules
- [ ] Add agent-specific structural gates

### 4.3 Inter-Agent Bridges

Define how this agent communicates with existing agents:

| Bridge | Direction | Mechanism | Status |
|--------|-----------|-----------|--------|
| [Agent] -> [Agent_A] | [DIRECTION] | [WHAT DATA FLOWS?] | |
| [Agent] -> [Agent_B] | [DIRECTION] | [WHAT REQUESTS?] | |
| [Agent_C] -> [Agent] | [DIRECTION] | [WHAT DIRECTIVES?] | |

---

## Phase 5 — Verification Checklist

Run after bootstrap is complete:

- [ ] Agent folder exists with all foundation documents
- [ ] Config file loads correctly (test by starting a session in that folder)
- [ ] Session log has correct build state block
- [ ] Anti-degradation adapter references core system
- [ ] System-level routing rules include this agent
- [ ] All API credentials verified (if applicable)
- [ ] Inter-agent bridges documented and tested (if applicable)
- [ ] First session completed successfully (intent alignment + foundation docs)

---

## Appendix: Bootstrap Timeline Reference

A typical agent bootstrap follows this sequence:

1. **Session 1** — Research (analyze existing agent patterns) + intent alignment + PRD v1.0 + config + session log
2. **Session 2** — Operational structure + Master Agent v1.0
3. **Session 3** — PRD refinement + scorecard revision
4. **Sessions 4-5** — Operational work + sub-agent specs
5. **Session 6+** — Full maturity + sub-agent completion

**Total bootstrap to operational: ~3 sessions. Full maturity: ~7 sessions.**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | [DATE] | Initial creation from Quality Engine v4 template. |
