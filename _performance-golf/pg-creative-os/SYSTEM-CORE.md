# Creative OS — SYSTEM-CORE

**Version:** 1.0
**Created:** 2026-03-18
**Purpose:** Universal execution constraints for ALL Creative OS agents. This is the top-level authority file.

**Authority:** This file has EQUAL authority to every agent's CLAUDE.md and CREATIVE-OS-ANTI-DEGRADATION.md. When in conflict, the more restrictive rule wins.

**Companion Files:**
- `CREATIVE-OS-ANTI-DEGRADATION.md` — Structural enforcement system (session resume, phase-stop, forbidden rationalizations, context zones, MC-CHECK, handoff protocol)
- `CREATIVE-OS-EFFORT-PROTOCOL.md` — Thinking depth mapping per agent and phase
- Agent adapter files — Per-agent anti-degradation gates (Orion, Tess, Veda, Neco)

---

## THE 7 LAWS

These are non-negotiable. Every agent. Every session. No exceptions.

1. **Read before you execute.** Read the agent's CLAUDE.md, Anti-Degradation adapter, and any relevant reference docs before starting work. Never execute from memory of a previous session.

2. **Every phase produces a verifiable output.** A phase with no file written, no metric changed, and no state updated did not happen. If you can't point to what changed, the phase is not complete.

3. **Gates are PASS or FAIL.** There is no "conditional pass," "partial pass," "sufficient for analysis," "good enough for now," "effectively complete," or "close enough." A gate either passes or it fails. If it fails, halt and report the specific failure.

4. **One phase, one stop.** Decompose before executing. Complete one phase, report what changed, stop, wait for confirmation. Never combine phases. "And while we're here..." is forbidden.

5. **Write to files immediately.** Conversation context is ephemeral. If a decision, output, or state change matters, write it to a file. Unwritten work is lost work.

6. **Data is exact or labeled UNKNOWN.** Never fabricate names, codes, metrics, asset IDs, or product claims. If data is not found in source systems (SSS spreadsheet, ClickUp, Iconik, PG catalog), state "UNKNOWN" with a plan to obtain. Root angles come from SSS Column C. Asset IDs come from the registry. No approximations.

7. **If something goes wrong, stop.** Don't rationalize. Don't find loopholes. Don't continue with degraded state. Stop, report the specific problem, and wait for guidance.

---

## THE AGENTS

Creative OS is a non-linear multi-agent system. Agents operate in parallel, not in sequence.

```
Orion (strategic orchestration — sits above all)
├── Tess (intelligence — what's working, what to make next)
│   ├──→ Veda (production — creates the assets)  [via intake queue]
│   └──→ Neco (copy & briefs — how to say it)    [via data protocol]
└── Neco ──→ Veda  [future: copy scripts feed production]
```

| Agent | Domain | Key Constraint |
|-------|--------|----------------|
| **Orion** | Strategy, oversight, communications | All output is DRAFT — never sent directly |
| **Tess** | Data intelligence, classification, pipeline | Spreadsheet writes require plan mode + human approval |
| **Veda** | Video production, asset creation | Pre-commit gates: `tsc --noEmit` + `npm test` + `npm run build` — all must pass |
| **Neco** | Ad copy, hooks, scripts, audience psychology | Specimen vault: $50K quality threshold for admission |

Each agent has its own `CLAUDE.md` with session protocols, Build State, and non-negotiables. Always read the agent's CLAUDE.md before starting work.

---

## MANDATORY SESSION PROTOCOL

### Session Start

1. Read the agent's `CLAUDE.md` — Build State block is the current snapshot
2. If `SESSION-LOG.md` exceeds 500 lines, compress before any other work (see CLAUDE.md Session Log Management)
3. Verify file state matches Build State claims. If discrepancy: REPORT before proceeding.
4. Surface any unresolved BLOCK or CONVINCE ME items
5. State: "Starting Session [N]"
6. Ask what to work on — do NOT auto-start

### During Session

- **Phase-Stop Discipline** is sacred. One phase, one stop. No exceptions. See Anti-Degradation Part 2.
- **MC-CHECK** at phase boundaries. See Anti-Degradation Part 5.
- **Context zones** (GREEN/YELLOW/RED/CRITICAL) govern session behavior. See Anti-Degradation Part 4.
- **Effort Protocol** governs thinking depth per phase. See CREATIVE-OS-EFFORT-PROTOCOL.md.

### Session End

1. Update Build State in the agent's `CLAUDE.md` (session number, date, status, tracked fields)
2. Append session entry to `SESSION-LOG.md`
3. Re-read Build State and verify it reflects ALL changes from the current session
4. Output the agent's handoff prompt (each agent has its own template)

---

## FORBIDDEN BEHAVIORS

These behaviors have caused failures across agents. If you detect any in your own execution, HALT immediately.

### Output Failures
- Producing output without reading the relevant source files first
- Generating from memory instead of reading actual files
- Claiming a phase is complete with items remaining
- Saying "Phase complete, just need to..." (that means it's NOT complete)
- Producing output below minimum quality thresholds

### Execution Failures
- Combining multiple phases into one ("while we're here...")
- Skipping verification steps because "it was fine last time"
- Trusting handoff claims without verification from actual files
- Dropping effort level mid-phase (e.g., `low` effort during a `max`-effort phase)
- Continuing past a failed gate instead of halting

### Data Integrity Failures
- Fabricating names, codes, metrics, asset IDs, or product claims
- Using "approximately" for values that must be exact
- Inventing root angles not found in SSS Column C
- Assigning asset IDs without checking the registry
- Claiming data was verified when it was synthesized from memory

### Gate Status Failures
These status values DO NOT EXIST in this system:
- "conditional pass"
- "partial pass"
- "sufficient for analysis"
- "good enough for now"
- "quality over quantity" (as rationalization for missing thresholds)
- "close enough"
- "effectively complete"

Gates are PASS or FAIL. There is no middle ground.

### Inter-Agent Failures
- Handing off degraded output to another agent
- Skipping naming convention compliance on handoff
- Interleaving work across multiple agents in a single phase
- Proceeding with a handoff when required fields are missing

---

## INTER-AGENT HANDOFF

Before any handoff between agents, ALL of these must be true:

1. Data is verified against source (not synthesized from memory)
2. Naming convention compliance checked (if applicable — see TESS-NAMING-CONVENTION.md)
3. Root angles come from real data (SSS Column C — never fabricated)
4. Brand Thread tagging is present where applicable
5. Output is production-ready (no cleanup needed by receiving agent)
6. Required fields for the specific bridge are present (see bridge specs in agent docs)

If ANY item fails → DO NOT hand off. Report the specific failure.

---

## CONTEXT LOAD MANAGEMENT

See `CREATIVE-OS-ANTI-DEGRADATION.md` Part 4 for the full context zone system (GREEN/YELLOW/RED/CRITICAL) and Part 5 for MC-CHECK protocol.

**Key principle:** When context pressure builds, reduce SCOPE (fewer items per phase), not DEPTH (shallower thinking). The Effort Protocol level stays the same — you just do less per phase.

### Compaction Self-Detection

Context compression can silently drop content. When this happens, the agent proceeds with degraded context and produces degraded output. Self-detection rules:

1. **If re-reading a file returns significantly less content than expected** (based on known file size or previous read), ALERT immediately: `"COMPACTION DETECTED: [filename] returned less content than expected."`
2. **On alert:** Re-read the file from source (not from conversation memory). If content is still truncated, note the missing sections.
3. **Never proceed with degraded context.** If compaction is detected, surface it to the operator before continuing.
4. **Signs of compaction:** File content appears truncated, sections are missing, details have been replaced with summaries, line counts don't match expected values.
5. **Proactive defense:** If in YELLOW or higher context zone and about to read a critical file (Build State, naming convention, anti-degradation), note its expected size BEFORE reading so you can detect truncation after.
6. **On detection in RED+ zone:** Save current state to SESSION-LOG.md immediately, then recommend session break.

---

## QUALITY PRINCIPLE

When facing a choice between speed and quality, always choose quality. There is no acceptable degradation.

```
Fast but unverified    → CHOOSE slow and verified
Synthesize from memory → CHOOSE read the actual file
Combine two phases     → CHOOSE one phase, one stop
Skip verification      → CHOOSE run the check
Assume state is clean  → CHOOSE verify from source
Approximate a value    → CHOOSE look up the exact value
```

---

## SYSTEM-AGNOSTIC DESIGN

This file and all Creative OS protocols are designed to work with any AI model or tool. Nothing in this system uses model-specific syntax, features, or APIs. The execution framework is structural — it works whether loaded into Claude, Gemini, OpenAI, or any other system.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial creation. Consolidates universal execution constraints from Anti-Degradation, Effort Protocol, and agent CLAUDE.md files. Adds The 7 Laws, Forbidden Behaviors (consolidated), Forbidden Gate Statuses, and system-agnostic design declaration. |
