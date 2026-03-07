# Agent Provisioning Template

> **Version**: 1.0
> **Created**: 2026-02-08 (Creative OS S002)
> **Purpose**: Standardized checklist for bootstrapping a new agent within the PG Creative OS. Based on the Orion S001 bootstrap pattern.

---

## Phase 0 — Pre-Bootstrap (Gather Before Starting)

### 0.1 Person & Role

| Field | Value |
|-------|-------|
| **Person** | _Who is this agent for?_ |
| **Role at PG** | _Their title and scope_ |
| **Reporting to** | _Direct manager_ |
| **Key relationships** | _Who do they work with daily?_ |
| **Role definition doc** | _File path to any doc that defines their responsibilities (e.g., CMO agenda, job description)_ |

### 0.2 Strategic Context

| Field | Value |
|-------|-------|
| **Top 3 priorities (90-day)** | _What must this person accomplish?_ |
| **Brand Thread alignment** | _Thread 1 (Smarter Journey) / Thread 2 (Innovation) / Both_ |
| **Scorecard metrics** | _What does "success" look like? Leading + lagging indicators._ |
| **Known blockers** | _What's in the way right now?_ |

### 0.3 Reference Materials to Provide

Gather these BEFORE the first session. The agent bootstraps by analyzing these:

| Material | File Path | Notes |
|----------|-----------|-------|
| Role definition / meeting agenda | | _The doc that defines what this person does_ |
| Strategic vision doc (Spark Book, etc.) | | _What the CEO/CMO expects_ |
| Meeting transcripts (if any) | | _Recent 1:1s, syncs, planning sessions_ |
| Existing agent specs to learn from | _Orion, Veda, Neco patterns_ | _Always include — establishes Creative OS conventions_ |
| Brand guidelines | `pg-skills/pg-brand-guidelines/` | _Standard for all agents_ |
| Quality standards | `pg-skills/QUALITY-STANDARDS.md` | _Standard for all agents_ |

### 0.4 API & Credentials

| Service | Needed? | Credential Location | Notes |
|---------|---------|---------------------|-------|
| Google Sheets (SSS) | Y/N | | _Read-only or read-write?_ |
| Iconik (DAM) | Y/N | | _App-ID + user_ |
| FAL.ai (AI generation) | Y/N | | _API key_ |
| ElevenLabs (voice) | Y/N | | _API key_ |
| ClickUp (project mgmt) | Y/N | | _API key + workspace_ |
| Google Docs (MCP) | Y/N | | _OAuth scope_ |
| Slack (MCP) | Y/N | | _Bot token + channels_ |
| Other: __________ | Y/N | | |

### 0.5 Governance Decisions (Answer Before Bootstrap)

| Decision | Options | Choice |
|----------|---------|--------|
| **Instance model** | Independent agent / Shared agent with permissions | |
| **Data boundaries** | What data is shared vs. private to this person? | |
| **SSS access** | Full spreadsheet / Specific tabs only / Read-only | |
| **Strategic docs** | Own copies / Shared with Christopher / Read-only access | |
| **Inter-agent bridges** | Which existing agents does this person's agent talk to? | |
| **Communication boundary** | Agent drafts only (person sends) / Agent can send directly | |

---

## Phase 1 — Agent Identity & Architecture

Define these in discussion with the person (intent alignment session):

| Field | Value |
|-------|-------|
| **Agent name** | _Short, memorable (e.g., "Orion", "Veda", "Neco")_ |
| **Agent role** | _One sentence: what does this agent DO?_ |
| **Agent metaphor** | _"the strategist", "the brain", "the hands", "the voice"_ |
| **Folder name** | _`{name}-{role-slug}/` (e.g., `orion-chief-of-staff/`)_ |
| **Runtime** | _Advisory (docs only) / Python / Node.js+TypeScript / Other_ |
| **Core principle** | _The one rule that governs all decisions (e.g., Strategic Leverage Principle, Root Angle Principle, Six-Axis Discipline)_ |
| **Execution modes** | _List the modes this agent operates in (e.g., Strategic Review, Prep Mode, etc.)_ |
| **Sub-agent count** | _How many sub-agents? What layers?_ |

### Gap Alignment Process

Run an intent alignment session (modeled on Orion S001's 11-gap process):

1. Start with the role definition doc — identify what the agent IS and IS NOT
2. Surface gaps between what the person needs and what the doc says
3. For each gap, discuss and decide
4. Log decisions in SESSION-LOG.md
5. Continue until both sides agree on scope, boundaries, and deliverables

---

## Phase 2 — Foundation Documents (Create in This Order)

Each file follows the "document trinity" pattern established by Veda:

| # | Document | Purpose | Template Source |
|---|----------|---------|----------------|
| 1 | `CLAUDE.md` | Auto-loaded agent config — identity, phase-stop, non-negotiables, session protocol, context budget | Any existing agent's `CLAUDE.md` |
| 2 | `{AGENT}-PRD.md` | Full product requirements — scope, architecture, scorecard, protocols, constraints | `ORION-REFERENCE.md` or `VEDA-PHASE-2-PLAN.md` |
| 3 | `{AGENT}-MASTER-AGENT.md` | Master agent spec — execution modes, sub-agent architecture, decision protocols | `ORION-REFERENCE.md` or `VEDA-MASTER-AGENT.md` |
| 4 | `{AGENT}-SUB-AGENTS.md` | Sub-agent specifications — each sub-agent's scope, inputs, outputs, backstory | `NECO-SUB-AGENTS.md` (most detailed) |
| 5 | `{AGENT}-ANTI-DEGRADATION.md` | Agent-specific structural gates (adapter to core system) | `ORION-ANTI-DEGRADATION.md` |
| 6 | `SESSION-LOG.md` | YAML build state + session history | Any existing `SESSION-LOG.md` |

### Mandatory CLAUDE.md Sections

Every agent CLAUDE.md must include:

- [ ] Identity paragraph (who am I, what's my mission)
- [ ] Anti-degradation reference (link to core + adapter)
- [ ] Phase-Stop Discipline (copy from root CLAUDE.md, customize what counts as a phase)
- [ ] Non-negotiables (agent-specific rules that cannot be broken)
- [ ] Execution modes table
- [ ] Context budget rules (what to read, what to skip)
- [ ] Key references table (all docs this agent needs)
- [ ] Common mistakes section (grows organically)
- [ ] Session handoff protocol

---

## Phase 3 — Directory Structure

```
{agent-folder}/
├── CLAUDE.md                      # Auto-loaded config
├── {AGENT}-PRD.md                 # Product requirements
├── {AGENT}-MASTER-AGENT.md        # Master agent spec
├── {AGENT}-SUB-AGENTS.md          # Sub-agent specs
├── {AGENT}-ANTI-DEGRADATION.md    # Anti-degradation adapter
├── SESSION-LOG.md                 # Session history
├── _reference/                    # Input docs (person provides)
│   ├── {role-definition}.md
│   ├── {strategic-docs}.md
│   └── {derived-analyses}.md
├── _ops/                          # Operational outputs
│   ├── meetings/
│   ├── weekly-updates/
│   ├── decision-log/
│   └── {agent-specific-dirs}/
└── _output/                       # Generated deliverables (optional)
```

---

## Phase 4 — Integration

### 4.1 Root CLAUDE.md Updates

After the agent is bootstrapped, update the root Creative OS `CLAUDE.md`:

- [ ] Add agent to the Architecture diagram
- [ ] Add agent to the Agent Map table
- [ ] Add routing rules for this agent's request types
- [ ] Add inter-agent bridges (if any)
- [ ] Add anti-degradation adapter to the adapter table

### 4.2 Anti-Degradation

- [ ] Create `{AGENT}-ANTI-DEGRADATION.md` adapter (use existing adapter as template)
- [ ] Reference core system (`CREATIVE-OS-ANTI-DEGRADATION.md`)
- [ ] Add agent-specific structural gates

### 4.3 Inter-Agent Bridges

Define how this agent communicates with existing agents:

| Bridge | Direction | Mechanism | Status |
|--------|-----------|-----------|--------|
| {Agent} → Tess | | _What data flows?_ | |
| {Agent} → Veda | | _What production requests?_ | |
| {Agent} → Neco | | _What copy requests?_ | |
| {Agent} → Orion | | _What strategic inputs?_ | |
| Orion → {Agent} | | _What directives?_ | |

### 4.4 MEMORY.md Update

- [ ] Add new agent section to `~/.claude/projects/-Users-christopherogle/memory/MEMORY.md`
- [ ] Include: path, runtime, status, key files, next steps

---

## Phase 5 — Verification Checklist

Run after bootstrap is complete:

- [ ] Agent folder exists with all foundation documents
- [ ] `CLAUDE.md` loads correctly (test by starting a session in that folder)
- [ ] SESSION-LOG.md has correct YAML build state
- [ ] Anti-degradation adapter references core system
- [ ] Root CLAUDE.md routing rules include this agent
- [ ] All API credentials verified (if applicable)
- [ ] Inter-agent bridges documented and tested (if applicable)
- [ ] MEMORY.md updated with agent summary
- [ ] First session completed successfully (intent alignment + foundation docs)

---

## Appendix: Orion S001 Bootstrap Timeline (Reference)

The Orion agent was bootstrapped in this sequence:

1. **S001** — Research (analyzed Veda/Tess/Nate/Boris patterns) → 11-gap intent alignment → PRD v1.0 + CLAUDE.md + SESSION-LOG.md + spark-book-launch-map
2. **S002** — _ops/ structure + meeting prep + transcript analysis + Master Agent v1.0
3. **S003** — PRD v1.1 (Two Brand Threads, scorecard revision)
4. **S004-S005** — Meeting analysis, agenda prep, recruiting plan
5. **S006** — Master Agent v1.1 (6/6 edits)
6. **S007** — Sub-Agents spec started (2/7 complete)

**Total bootstrap to operational: ~3 sessions. Full maturity: ~7 sessions.**

---

## Appendix: Multi-User Governance Model (DRAFT)

> These decisions must be made before provisioning John's agent.

### Option A: Independent Agents

Each person gets their own agent instances. Agents share the Creative OS infrastructure (anti-degradation, routing, standards) but have separate:
- SESSION-LOG.md files
- Strategic docs
- _ops/ directories
- Scorecards

**Shared**: SSS data (read), brand guidelines, quality standards, anti-degradation core
**Private**: Strategic docs, meeting prep, personal scorecards, delegation tracking

### Option B: Shared Agents with Permissions

Same agent instances, but with role-based views:
- John sees CMO-level dashboards
- Christopher sees IC-to-VP execution view
- Shared Orion instance with different execution modes per person

### Open Questions for John Discussion

1. Does John want his own Orion equivalent, or does he want to interact with Christopher's Orion?
2. What data should John see that Christopher generates? (Weekly updates? Scorecards? Raw session logs?)
3. Should John's agent have write access to SSS, or read-only?
4. Does John need Tess access (data), Neco access (copy), or just strategic oversight?
5. Communication flow: Does John prefer Google Docs → agent, or direct Claude Code sessions?
