# Creative OS — Session Architecture

**Version:** 1.0
**Created:** 2026-03-18
**Purpose:** Define session structure, model recommendations, and context loading order per agent. System-agnostic — expresses needs as capability levels, then maps to current best options.

---

## MODEL ASSIGNMENT BY CAPABILITY

Creative OS agents have different computational needs. Rather than hardcoding model names, we define capability requirements and map them to current best options.

### Capability Levels

| Level | Description | Current Best Options |
|-------|-------------|---------------------|
| **Deep Reasoning** | Strategic analysis, multi-factor scoring, challenger protocol, stakeholder analysis | Claude Opus 4.6, GPT-o3, Gemini 2.5 Pro |
| **Code Generation** | TypeScript, Python, test writing, pipeline debugging | Claude Opus 4.6, Claude Sonnet 4.6, GPT-o3 |
| **Creative Writing** | Ad copy, hooks, scripts, audience psychology, behavioral frameworks | Claude Opus 4.6, Claude Sonnet 4.6 |
| **Data Processing** | Classification, spreadsheet operations, naming convention parsing | Claude Sonnet 4.6, Claude Haiku 4.5, GPT-4.1-mini |
| **Simple Extraction** | Task parsing, intent classification, JSON extraction | Claude Haiku 4.5, GPT-4.1-mini |

### Per-Agent Recommendations

| Agent | Primary Capability Need | Recommended Level | Why |
|-------|------------------------|-------------------|-----|
| **Orion** | Deep Reasoning | Deep Reasoning | Strategic decisions cascade to all agents. Wise Reply needs political nuance. Challenger protocol needs analytical rigor. |
| **Orion** (daily briefing modules) | Simple Extraction | Simple Extraction | Task parsing, intent classification, draft responses — speed and cost matter more than depth. |
| **Orion** (personal bot) | Simple Extraction + Deep Reasoning | Mixed | Intent classification = Simple. Agent conversations = Deep Reasoning. |
| **Tess** | Data Processing + Deep Reasoning | Data Processing (pipeline), Deep Reasoning (analysis) | Pipeline operations need accuracy. Trend analysis and expansion recommendations need analytical depth. |
| **Tess** (dashboard) | Code Generation | Code Generation | TypeScript/React development with type safety. |
| **Veda** | Code Generation | Code Generation | TypeScript pipeline, test writing, FFmpeg command construction. |
| **Veda** (creative decisions) | Deep Reasoning | Deep Reasoning | Hook selection, assembly editing — creative judgment determines output quality. |
| **Neco** | Creative Writing + Deep Reasoning | Deep Reasoning | Copy generation IS the product. Every word matters. Behavioral framework application needs depth. |

---

## SESSION STRUCTURE BY AGENT TYPE

### Orion Sessions (Strategic / Advisory)

**Typical session:** 1-3 phases, advisory output (drafts, briefs, reports)
**Context loading order:**
1. `CLAUDE.md` Build State (~25 lines)
2. Relevant reference files (scorecard, stakeholder map, weekly cadence — only what the task needs)
3. SESSION-LOG.md recent entries (if resuming ongoing work)

**Session structure:**
- Strategic Review: Load scorecard → analyze → output assessment
- Triage: Load daily report → classify → output action items
- Wise Reply: Load stakeholder map + working relationship → analyze → output drafts
- Meeting Prep: Load relevant context → output brief

**Context pressure:** LOW. Orion sessions are typically short and focused. Rarely hits YELLOW.

### Tess Sessions (Data Pipeline)

**Typical session:** 3-8 phases, pipeline operations + analysis output
**Context loading order:**
1. `CLAUDE.md` Build State (~25 lines)
2. `TESS-NAMING-CONVENTION.md` (if data parsing involved)
3. Spreadsheet data (loaded per-phase, not all at once)
4. Pipeline code (only the module being modified)

**Session structure:**
- Pipeline run: Ingest → Process → Classify → Persist (each is a phase)
- Dashboard work: Read → Implement → TypeScript check → Visual verify → Commit
- Analysis: Load data → Analyze → Generate recommendations

**Context pressure:** MEDIUM-HIGH. Large spreadsheet reads and pipeline code can push into YELLOW quickly. Use phase-level data loading — don't pre-load the entire spreadsheet.

### Veda Sessions (Engineering / Production)

**Typical session:** 3-6 phases, code + test + build cycles
**Context loading order:**
1. `CLAUDE.md` Build State (~25 lines)
2. Relevant source files (only the module being modified)
3. Test files for the module being modified
4. Intake queue row (if processing a production job)

**Session structure:**
- Feature development: Plan → Implement → Test → Build → Verify
- Bug fix: Reproduce → Fix → Test → Build
- Production run: Load intake row → Download source → Process → Upload → Verify

**Context pressure:** MEDIUM. TypeScript files are large but sessions are focused. Test suites can push context if loading many test files. Load only the test file for the module you're modifying.

### Neco Sessions (Creative)

**Typical session:** 3-5 phases, creative output with human checkpoints
**Context loading order:**
1. `CLAUDE.md` Build State (~25 lines)
2. Product brief or project context
3. Relevant behavioral frameworks (only the ones needed — not all 11)
4. Specimen vault entries (only relevant specimens)
5. Tess data protocol output (if data-driven creative)

**Session structure:**
- Angle development: Load context → Audience analysis (Checkpoint 1) → Angle ideation (Checkpoint 2) → Hook/script generation → Quality validation (Checkpoint 3)
- Brief creation: Load context → Draft → Review → Finalize

**Context pressure:** MEDIUM. Behavioral frameworks and specimens can be large. Load only the frameworks relevant to the current audience/angle, not all 11.

---

## CONTEXT RESERVOIR PATTERN

### When to Create a Context Reservoir

A context reservoir is a human-curated bridge document that distills multi-session intelligence into a focused reference. Create one when:

1. **Multi-session foundation work precedes creative execution** — e.g., Tess runs 3 sessions of data analysis, then Neco needs that intelligence for angle development
2. **Multi-week strategic planning spans session boundaries** — e.g., Orion's 30→60→90 day progression
3. **Cross-agent handoff requires distilled context** — e.g., Tess intelligence feeds a Neco creative session

### Who Curates It

The **human operator** reviews and decides what to emphasize. The reservoir is not an auto-generated summary — it's a deliberate selection of decisions, insights, and constraints that should survive into the next phase.

### What Goes In It

- **Decisions made** (not the deliberation — the conclusion)
- **Key data points** (specific metrics, not "strong performance")
- **Constraints established** (from Constraint Ledger)
- **Open questions** (what hasn't been decided yet)
- **Angle direction** (for Neco — which angles are approved, which are rejected and why)

### What Does NOT Go In It

- Full session transcripts
- Raw data dumps
- Step-by-step process narrative
- Intermediate drafts that were superseded

### Where It Lives

```
[project-directory]/context-reservoir.md
```

### How Agents Consume It

Loaded at session start for downstream work, after the agent's CLAUDE.md and before task-specific files. The reservoir replaces the need to re-read all upstream session logs.

---

## CROSS-SESSION CONTINUITY

### What Travels Between Sessions

Between any two sessions on the same agent, the following persist via files:
1. **Build State** in CLAUDE.md — current snapshot
2. **SESSION-LOG.md** — append-only history
3. **Output files** — deliverables, data, reports
4. **Constraint Ledger** — active decisions and their downstream implications
5. **Fact Changes log** — propagation status for changed values

### What Does NOT Travel

- Conversation context (session memory is ephemeral)
- Extended thinking chains
- Intermediate drafts revised within a session
- Real-time human feedback given during a session

**This is why Build State and Session Logs matter:** they capture the state and decisions that would otherwise be lost when sessions end. And why the Context Reservoir matters for cross-agent handoffs — it captures reasoning that no single file preserves.

---

## MULTI-AGENT SESSION RULES

1. **One agent per session.** Never interleave work across agents in a single session.
2. **Complete work in one agent before switching.** If a task spans agents, finish the current agent's work, generate its handoff, then start a new session for the next agent.
3. **Cross-agent context goes through files, not memory.** Don't assume the next agent's session will "remember" what this session decided. Write it to a file (constraint ledger, context reservoir, or output file).

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial creation. Per-agent session structure, capability-based model recommendations, Context Reservoir pattern, cross-session continuity rules. |
