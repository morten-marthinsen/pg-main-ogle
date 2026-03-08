# Creative OS — Anti-Degradation System (Core)

**Version:** 1.0
**Created:** 2026-02-08
**Purpose:** STRUCTURAL enforcement to prevent execution breakdown across ALL Creative OS agents
**Authority:** This document has EQUAL authority to every agent's CLAUDE.md
**Adapted from:** TonyFlo's LLM-ANTI-DEGRADATION-SYSTEM.md (CopywritingEngine — READ-ONLY reference, NEVER modify original)

---

## WHY THIS EXISTS

**Core insight: Instructions can be ignored. Structures cannot be bypassed.**

As sessions grow complex and context windows fill, LLMs:
- Rush through phases to reach "completion"
- Interpret rules loosely to find efficient paths
- Find rationalization loopholes to justify shortcuts
- Treat quality gates as suggestions rather than requirements
- Claim completion without verification
- Synthesize from memory instead of reading actual files

This document converts instruction-based rules into structural barriers that cannot be bypassed. Every agent (Orion, Tess, Veda, Neco) inherits these universal patterns. Agent-specific gates live in each agent's adapter file.

---

## PART 1: SESSION RESUME VERIFICATION

### The Problem

When resuming from a previous session, handoff text may contain rationalized or stale claims. Context compaction may have distorted state.

### The Fix: Verify From Actual State, Not Handoff Claims

```
ON SESSION RESUME (MANDATORY — BEFORE ANY WORK):

STEP 1: READ SESSION-LOG.md header for claimed state
STEP 2: VERIFY against actual files:
  - Check file state matches handoff claims
  - Check git state if applicable (git status, index integrity)
STEP 3: COMPARE handoff claims vs. verified state
  - If they match → proceed
  - If they don't match → REPORT DISCREPANCY to user before proceeding
STEP 4: State verified ground truth in your first message

NEVER trust a handoff claim without verification.
NEVER skip Step 2 because "the handoff looks detailed enough."
```

---

## PART 2: PHASE-STOP ENFORCEMENT

A phase is NOT complete until ALL items pass.

```
PHASE COMPLETION CHECKLIST (UNIVERSAL):
  [ ] All planned changes implemented
  [ ] Agent-specific gates passed (see adapter file)
  [ ] Phase report output to user
  [ ] User confirmation received

  IF ANY UNCHECKED → PHASE IS NOT COMPLETE
  DO NOT say "Phase complete" with items remaining
  DO NOT say "Phase complete, just need to..." — that means it's NOT complete
```

---

## PART 3: FORBIDDEN RATIONALIZATIONS (UNIVERSAL)

These rationalizations have caused failures across agents. If you catch yourself thinking any of these, HALT immediately.

| Rationalization | Why Invalid | Required Response |
|-----------------|-------------|-------------------|
| "I already know what's in that file from the last session" | You have no memory between sessions. Read the file. | HALT — Read the actual file |
| "Close enough" | Close enough = wrong. Precision matters. | HALT — Fix to exact specification |
| "I'll clean this up next session" | Next session starts fresh. Debt accumulates. | HALT — Clean it now or log explicitly |
| "I can combine these two phases to save time" | Phase-Stop Discipline exists for a reason | HALT — One phase, one stop |
| "Let me just quickly also..." | Scope creep. Finish current phase first. | HALT — Complete current phase, report, stop |
| "The handoff summary is detailed enough, I don't need to verify" | Summaries can contain rationalized states | HALT — Verify from actual files |
| "I remember from context what the state is" | Context compaction may have distorted state | HALT — Read actual files |

Agent-specific rationalizations live in each adapter file.

---

## PART 4: CONTEXT LOAD MANAGEMENT

### Context Zones

| Zone | Indicators | Required Response |
|------|-----------|-------------------|
| GREEN | Early in session, few files read, straightforward work | Normal Phase-Stop cadence |
| YELLOW | 5+ files read, multiple phases executed, growing complexity | Announce context load. Increase verification frequency. Begin planning handoff. |
| RED | Large files loaded, complex multi-file changes, responses getting shorter | MC-CHECK every action. Prepare handoff. Recommend session break after current phase. |
| CRITICAL | Temptation to summarize instead of detail. Difficulty recalling earlier content. Synthesis behavior increasing. | HALT new work. Complete ONLY current atomic action. Generate mandatory handoff. Request session break. |

### Signs of Degradation (Self-Monitor)

If you notice ANY of these in your own behavior, announce it:

- Responses getting shorter than earlier in session
- Temptation to skip file reads ("I already know...")
- Generating from memory instead of reading existing patterns
- Phase reports getting less detailed
- Skipping verification steps
- Combining multiple changes into one phase

**Response:** `"Context load elevated — [specific sign detected]. Increasing verification cadence."`

---

## PART 5: MC-CHECK PROTOCOL

### MC-CHECK (Execute at Phase Boundaries)

```yaml
MC-CHECK:
  trigger: "[phase_start | phase_end | context_pressure]"

  rushing_detection:
    skipping_file_reads: "[Y/N]"
    synthesizing_from_memory: "[Y/N]"
    combining_phases: "[Y/N]"
    skipping_verification: "[Y/N]"
    if_any_yes: "STOP — slow down, reread CLAUDE.md Phase-Stop rules"

  context_assessment:
    files_read_this_session: "[count]"
    phases_completed: "[count]"
    estimated_zone: "[GREEN | YELLOW | RED | CRITICAL]"
    if_red_or_critical: "Prepare handoff after current phase"

  result: "[PROCEED | SLOW_DOWN | PREPARE_HANDOFF | SESSION_BREAK]"
```

### MC-CHECK-LITE (Quick check, use frequently)

```
MC-CHECK-LITE:
- Rushing: [Y/N]
- Synthesizing: [Y/N]
- Zone: [GREEN/YELLOW/RED]
- Action: [PROCEED | SLOW_DOWN | HANDOFF]
```

---

## PART 6: INTER-AGENT HANDOFF VERIFICATION

### The Problem

Orion, Tess, Veda, and Neco hand off to each other. A degraded output from one agent cascades into failures in another.

### Universal Handoff Gate

```
BEFORE ANY INTER-AGENT HANDOFF:
  [ ] Data is verified against source (not synthesized)
  [ ] Naming convention compliance checked (if applicable)
  [ ] Root angles come from real data (never fabricated)
  [ ] Brand Thread tagging is present (Thread 1 or Thread 2)
  [ ] Output is production-ready (no cleanup needed by receiving agent)

  IF ANY UNCHECKED → DO NOT HAND OFF
```

Agent-specific bridge gates live in each adapter file.

---

## PART 7: iCLOUD STRUCTURAL GUARD

### The Problem

Projects in `~/Documents/` sync with iCloud. iCloud renames `.git/index` → `.git/index 2` on every git write operation, corrupting git state.

### GIT-INDEX-GUARD (Mandatory for ALL Agents with Git Repos)

```
BEFORE any git command (status, add, commit, diff, log):
  RUN: ls -la .git/index*
  IF "index 2" exists:
    RUN: mv ".git/index 2" .git/index
    LOG: "iCloud index bug fixed"
  PROCEED with git command

AFTER any git write command (add, commit, reset, checkout):
  RUN: ls -la .git/index*
  IF "index 2" appeared:
    RUN: mv ".git/index 2" .git/index
    LOG: "iCloud index bug recurred — fixed again"

THIS CHECK IS NOT OPTIONAL.
DO NOT skip because "it was fine last time."
IT RECURS ON EVERY GIT WRITE.
```

---

## PART 8: SESSION HANDOFF PROTOCOL

### When to Generate Handoff

- User says "handoff"
- Context hits YELLOW zone or above
- Session has 3+ completed phases
- Before any session break

### Universal Handoff Template

```markdown
[AGENT]-[DATE] | Session [N]
HANDOFF

PROJECT PATH:
[full path]

SESSION [N] COMPLETED:
- [verified accomplishments]

STATE (VERIFIED):
- [agent-specific state verification — git, spreadsheet, docs, etc.]

REMAINING:
1. [specific next step]
2. [specific next step]

VERIFICATION COMMANDS (run these on resume):
- [agent-specific verification commands]

CRITICAL WARNINGS:
- [any known issues]
```

---

## PART 9: ANTI-DEGRADATION COMMITMENT

```
WHEN FACING A CHOICE:
- Fast but unverified    -> CHOOSE slow and verified
- Synthesize from memory -> CHOOSE read the actual file
- Combine two phases     -> CHOOSE one phase, one stop
- Skip verification      -> CHOOSE run the check
- Assume state is clean  -> CHOOSE verify from source

THERE IS NO ACCEPTABLE DEGRADATION.
INSTRUCTIONS CAN BE IGNORED. STRUCTURES CANNOT BE BYPASSED.
```

---

## AGENT ADAPTERS

Each agent extends this core with agent-specific structural gates:

| Agent | Adapter File | Key Agent-Specific Gates |
|-------|-------------|--------------------------|
| Orion | `orion-chief-of-staff/ORION-ANTI-DEGRADATION.md` | Scorecard alignment, delegation ratio, communication boundary |
| Tess | `tess-strategic-scaling-system/TESS-ANTI-DEGRADATION.md` | TypeScript, git, visual verification, dashboard KPIs |
| Veda | `veda-video-editing-agent/VEDA-ANTI-DEGRADATION.md` | TypeScript, test suite, root angle integrity, naming convention |
| Neco | `neco-neurocopy-agent/NECO-ANTI-DEGRADATION.md` | Context completeness, human checkpoints, factual claims |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-08 | Initial creation. Extracted universal patterns from TESS-ANTI-DEGRADATION.md v1.0. Covers: session resume, phase-stop enforcement, forbidden rationalizations, context management, MC-CHECK, inter-agent handoff, iCloud guard, handoff protocol. |
