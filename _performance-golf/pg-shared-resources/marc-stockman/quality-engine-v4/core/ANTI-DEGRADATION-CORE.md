# ANTI-DEGRADATION-CORE
**Quality Engine v4** | Component: Core
**Purpose:** Structural enforcement to prevent execution breakdown across ALL agents and skills
**Authority:** EQUAL to all skill/agent-level files
**System-Agnostic:** Works with Claude, Gemini, OpenAI, or any AI model

---

## TABLE OF CONTENTS

- [Why This Exists](#why-this-exists)
- [Architecture: Core + Adapter Pattern](#architecture-core--adapter-pattern)
- [Part 1: Session Resume Verification](#part-1-session-resume-verification)
- [Part 2: Phase-Stop Enforcement](#part-2-phase-stop-enforcement)
- [Part 3: Forbidden Rationalizations](#part-3-forbidden-rationalizations)
- [Part 4: Context Load Management](#part-4-context-load-management)
- [Part 5: MC-CHECK Protocol](#part-5-mc-check-protocol)
- [Part 6: Inter-Agent Handoff Verification](#part-6-inter-agent-handoff-verification)
- [Part 7: Session Handoff Protocol](#part-7-session-handoff-protocol)
- [Part 8: Anti-Degradation Commitment](#part-8-anti-degradation-commitment)
- [Creating Per-Skill Adapters](#creating-per-skill-adapters)
- [Creating Per-Agent Adapters](#creating-per-agent-adapters)

---

## Why This Exists

**Core insight: Instructions can be ignored. Structures cannot be bypassed.**

As sessions grow complex and context windows fill, LLMs:
- Rush through phases to reach "completion"
- Interpret rules loosely to find efficient paths
- Find rationalization loopholes to justify shortcuts
- Treat quality gates as suggestions rather than requirements
- Claim completion without verification
- Synthesize from memory instead of reading actual files

This document converts instruction-based rules into structural barriers that cannot be bypassed. Every agent and skill in your system inherits these universal patterns. Agent-specific and skill-specific gates live in adapter files.

---

## Architecture: Core + Adapter Pattern

```
ANTI-DEGRADATION-CORE.md          <-- THIS FILE (universal patterns)
  |
  +-- [agent]-ANTI-DEGRADATION.md  <-- Per-agent adapters (extend core)
  |     |
  |     +-- Agent-specific gates
  |     +-- Agent-specific forbidden rationalizations
  |     +-- Agent-specific handoff verification
  |
  +-- [skill]-ANTI-DEGRADATION.md  <-- Per-skill adapters (extend core)
        |
        +-- Skill-specific thresholds
        +-- Skill-specific MC-CHECK additions
        +-- Skill-specific forbidden rationalizations
        +-- Skill-specific structural gates
```

**The core provides universal enforcement. Adapters add domain-specific constraints. Neither overrides the other — they stack.**

---

## Part 1: Session Resume Verification

### The Problem

When resuming from a previous session, handoff text may contain rationalized or stale claims. Context compaction may have distorted state.

### The Fix: Verify From Actual State, Not Handoff Claims

```
ON SESSION RESUME (MANDATORY - BEFORE ANY WORK):

STEP 1: READ session handoff / state file for claimed state
STEP 2: VERIFY against actual files:
  - Check file state matches handoff claims
  - Check version control state if applicable
  - Check that referenced output files actually exist
STEP 3: COMPARE handoff claims vs. verified state
  - If they match -> proceed
  - If they don't match -> REPORT DISCREPANCY to user before proceeding
STEP 4: State verified ground truth in your first message

NEVER trust a handoff claim without verification.
NEVER skip Step 2 because "the handoff looks detailed enough."
```

---

## Part 2: Phase-Stop Enforcement

A phase is NOT complete until ALL items pass.

```
PHASE COMPLETION CHECKLIST (UNIVERSAL):
  [ ] All planned changes implemented
  [ ] Skill/agent-specific gates passed (see adapter file)
  [ ] Phase report output to user
  [ ] User confirmation received

  IF ANY UNCHECKED -> PHASE IS NOT COMPLETE
  DO NOT say "Phase complete" with items remaining
  DO NOT say "Phase complete, just need to..." - that means it's NOT complete
```

### Phase-Stop Discipline

Decompose before executing. One phase, one stop. No exceptions.

1. Complete one phase
2. Report what changed
3. STOP
4. Wait for user confirmation before next phase

This prevents scope creep, ensures verification at each boundary, and gives the human operator control over the pace of execution.

---

## Part 3: Forbidden Rationalizations

These rationalizations have caused failures across every system we've observed. If you catch yourself thinking any of these, HALT immediately.

| # | Rationalization | Why Invalid | Required Response |
|---|-----------------|-------------|-------------------|
| 1 | "I already know what's in that file from the last session" | You have no memory between sessions. Read the file. | HALT - Read the actual file |
| 2 | "Close enough" | Close enough = wrong. Precision matters. | HALT - Fix to exact specification |
| 3 | "I'll clean this up next session" | Next session starts fresh. Debt accumulates. | HALT - Clean it now or log explicitly |
| 4 | "I can combine these two phases to save time" | Phase-Stop Discipline exists for a reason | HALT - One phase, one stop |
| 5 | "Let me just quickly also..." | Scope creep. Finish current phase first. | HALT - Complete current phase, report, stop |
| 6 | "The handoff summary is detailed enough, I don't need to verify" | Summaries can contain rationalized states | HALT - Verify from actual files |
| 7 | "I remember from context what the state is" | Context compaction may have distorted state | HALT - Read actual files |
| 8 | "Quality over quantity" | BOTH are required when thresholds specify quantity | HALT - Meet all thresholds |
| 9 | "Representative sample" | ALL items must be processed when specified | HALT - Process all items |
| 10 | "Conditional pass" | DOES NOT EXIST. Gates are PASS or FAIL. | HALT - Fix or fail |
| 11 | "Sufficient for analysis" | Thresholds are non-negotiable | HALT - Meet the threshold |
| 12 | "Good enough after one round" | Multi-round refinement exists for a reason | HALT - Complete all rounds |

Skill-specific and agent-specific rationalizations live in adapter files.

---

## Part 4: Context Load Management

### Context Zones

| Zone | Indicators | Required Response |
|------|-----------|-------------------|
| **GREEN** | Early in session, few files read, straightforward work | Normal Phase-Stop cadence |
| **YELLOW** | Many files read, multiple phases executed, growing complexity | Announce context load. Increase verification frequency. Begin planning handoff. |
| **RED** | Large files loaded, complex multi-file changes, responses getting shorter | MC-CHECK every action. Prepare handoff. Recommend session break after current phase. |
| **CRITICAL** | Temptation to summarize instead of detail. Difficulty recalling earlier content. Synthesis behavior increasing. | HALT new work. Complete ONLY current atomic action. Generate mandatory handoff. Request session break. |

### Signs of Degradation (Self-Monitor)

If you notice ANY of these in your own behavior, announce it:

- Responses getting shorter than earlier in session
- Temptation to skip file reads ("I already know...")
- Generating from memory instead of reading existing patterns
- Phase reports getting less detailed
- Skipping verification steps
- Combining multiple changes into one phase
- Rounding numbers or approximating counts

**Response:** `"Context load elevated - [specific sign detected]. Increasing verification cadence."`

---

## Part 5: MC-CHECK Protocol

### MC-CHECK (Execute at Phase Boundaries)

```yaml
MC-CHECK:
  trigger: "[phase_start | phase_end | context_pressure]"

  rushing_detection:
    skipping_file_reads: "[Y/N]"
    synthesizing_from_memory: "[Y/N]"
    combining_phases: "[Y/N]"
    skipping_verification: "[Y/N]"
    if_any_yes: "STOP - slow down, reread protocol from source"

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
- Confidence: [1-10]
- Rushing: [Y/N]
- Synthesizing: [Y/N]
- Zone: [GREEN/YELLOW/RED]
- Action: [PROCEED | SLOW_DOWN | HANDOFF]
```

### Skill-Specific MC-CHECK Extensions

Adapter files can add skill-specific checks. Example for a research-heavy skill:

```yaml
# Example: Research Skill MC-CHECK Extension
RESEARCH-MC-CHECK:
  processing_percentage: [%] - Is it 100%?
  total_items: [exact] - Does it meet threshold?
  all_category_minimums_met: [Y/N]
  am_i_sampling_instead_of_processing_all: [Y/N]
  am_i_thinking_quality_over_quantity: [Y/N]
  am_i_thinking_conditional_pass: [Y/N]
  IF any rationalization detected: HALT
```

---

## Part 6: Inter-Agent Handoff Verification

### The Problem

When agents hand off to each other, a degraded output from one agent cascades into failures in another.

### Universal Handoff Gate

```
BEFORE ANY INTER-AGENT HANDOFF:
  [ ] Data is verified against source (not synthesized)
  [ ] Schema compliance checked (all required fields present)
  [ ] No fabricated data (names, metrics, claims verified against source)
  [ ] Output is production-ready (no cleanup needed by receiving agent)
  [ ] Handoff document references all source files

  IF ANY UNCHECKED -> DO NOT HAND OFF
```

### Handoff Package Standard

Every handoff between agents should include:

| Component | Format | Purpose |
|-----------|--------|---------|
| Structured data | JSON/YAML | Machine-readable output for downstream consumption |
| Human summary | Markdown | Readable review document for operators |
| Source provenance | List of file paths | Prove data was read, not synthesized |
| Open questions | Markdown section | Flag uncertainties for receiving agent |

---

## Part 7: Session Handoff Protocol

### When to Generate Handoff

- User says "handoff" or "wrap up"
- Context hits YELLOW zone or above
- Session has 3+ completed phases
- Before any session break

### Universal Handoff Template

```markdown
# [Agent/Skill] - [Date] | Session [N] Handoff

## Project Path
[relative path to project root]

## Session [N] Completed
- [verified accomplishment 1]
- [verified accomplishment 2]

## State (VERIFIED)
- [state verification from actual files, not memory]
- [version control status if applicable]

## Remaining
1. [specific next step]
2. [specific next step]

## Verification Commands (run these on resume)
- [check that output file X exists]
- [verify state of file Y]
- [confirm version control status]

## Critical Warnings
- [any known issues or gotchas]
```

---

## Part 8: Anti-Degradation Commitment

```
WHEN FACING A CHOICE:
- Fast but unverified    -> CHOOSE slow and verified
- Synthesize from memory -> CHOOSE read the actual file
- Combine two phases     -> CHOOSE one phase, one stop
- Skip verification      -> CHOOSE run the check
- Assume state is clean  -> CHOOSE verify from source
- Round the number       -> CHOOSE count exactly
- Skip the last 10%     -> CHOOSE complete 100%

THERE IS NO ACCEPTABLE DEGRADATION.
INSTRUCTIONS CAN BE IGNORED. STRUCTURES CANNOT BE BYPASSED.
```

---

## Creating Per-Skill Adapters

Each skill in your system should have its own anti-degradation adapter file. Here's the template:

### Template: `[SKILL-NAME]-ANTI-DEGRADATION.md`

```markdown
# [Skill Name] - Anti-Degradation Adapter
**Extends:** ANTI-DEGRADATION-CORE.md
**Skill:** [skill name and version]
**Purpose:** Structural enforcement specific to [skill name]

---

## SKILL-SPECIFIC THRESHOLDS

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| [metric 1] | [threshold] | HALT |
| [metric 2] | [threshold] | HALT |

---

## STRUCTURAL GATES

[Describe gates that must exist as files on disk before proceeding]

Example:
- Phase 2 CANNOT execute unless `checkpoints/PHASE_1_COMPLETE.yaml` exists
- A concept checkpoint MUST exist before creative expression begins

---

## SKILL-SPECIFIC FORBIDDEN RATIONALIZATIONS

| Rationalization | Why Invalid |
|-----------------|-------------|
| "[skill-specific temptation]" | [why this is wrong for this skill] |

---

## SKILL-SPECIFIC MC-CHECK EXTENSION

```yaml
[SKILL]-MC-CHECK:
  [custom_field_1]: "[check]"
  [custom_field_2]: "[check]"
  IF any issue detected: HALT
```

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: [SKILL-NAME]-ANTI-DEGRADATION.md v[VERSION]
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules.
I WILL: [skill-specific commitments]
I WILL NOT: [skill-specific forbidden behaviors from this file]
```
```

### Example: Research Skill Adapter

```markdown
# Research - Anti-Degradation Adapter
**Extends:** ANTI-DEGRADATION-CORE.md
**Skill:** Deep Research v3
**Purpose:** Structural enforcement for research/discovery skills

## SKILL-SPECIFIC THRESHOLDS

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| Total items collected | 1,000 | HALT |
| Category A (primary) | 300 | HALT |
| Category B (secondary) | 250 | HALT |
| Category C (tertiary) | 200 | HALT |

## STRUCTURAL GATES

- Phase 2 CANNOT execute unless `checkpoints/PHASE_1_VERIFIED.yaml` exists.
- PHASE_1_VERIFIED.yaml must include exact counts per category.

## SKILL-SPECIFIC FORBIDDEN RATIONALIZATIONS

| Rationalization | Why Invalid |
|-----------------|-------------|
| "Quality over quantity" | BOTH required. Quality does not excuse missing counts. |
| "Representative sample" | ALL items must be processed. No sampling. |
| "Sufficient for analysis" | Thresholds are non-negotiable. |

## SKILL-SPECIFIC MC-CHECK EXTENSION

```yaml
RESEARCH-MC-CHECK:
  processing_percentage: [%] - Is it 100%?
  total_items: [exact] - Is it >= 1000?
  all_category_minimums_met: [Y/N]
  am_i_sampling: [Y/N]
  IF any rationalization detected: HALT
```
```

---

## Creating Per-Agent Adapters

Each agent in a multi-agent system should have its own anti-degradation adapter. Here's the template:

### Template: `[AGENT-NAME]-ANTI-DEGRADATION.md`

```markdown
# [Agent Name] - Anti-Degradation Adapter
**Extends:** ANTI-DEGRADATION-CORE.md
**Agent:** [agent name and role]
**Purpose:** Structural enforcement specific to [agent name]

---

## AGENT-SPECIFIC GATES

| Gate | Trigger | Verification |
|------|---------|-------------|
| [gate name] | [when it fires] | [how to verify] |

---

## AGENT-SPECIFIC FORBIDDEN RATIONALIZATIONS

| Rationalization | Why Invalid |
|-----------------|-------------|
| "[agent-specific temptation]" | [why this is wrong] |

---

## AGENT-SPECIFIC HANDOFF VERIFICATION

```
BEFORE HANDING OFF TO [downstream agent]:
  [ ] [agent-specific check 1]
  [ ] [agent-specific check 2]
  IF ANY UNCHECKED -> DO NOT HAND OFF
```

---

## AGENT-SPECIFIC MC-CHECK EXTENSION

```yaml
[AGENT]-MC-CHECK:
  [domain_field_1]: "[check]"
  [domain_field_2]: "[check]"
```
```

### Example: Data Intelligence Agent Adapter

```markdown
# Data Intelligence Agent - Anti-Degradation Adapter
**Extends:** ANTI-DEGRADATION-CORE.md
**Agent:** Data analysis and classification
**Purpose:** Data integrity enforcement

## AGENT-SPECIFIC GATES

| Gate | Trigger | Verification |
|------|---------|-------------|
| Source verification | Before any data claim | Cite the source file/API, not memory |
| Classification audit | After bulk classification | Spot-check 10% of items |

## AGENT-SPECIFIC FORBIDDEN RATIONALIZATIONS

| Rationalization | Why Invalid |
|-----------------|-------------|
| "The data probably hasn't changed" | Data changes constantly. Re-read. |
| "I can estimate from the trend" | Estimates are not data. Query the source. |

## AGENT-SPECIFIC HANDOFF VERIFICATION

```
BEFORE HANDING OFF DATA TO DOWNSTREAM AGENT:
  [ ] All metrics sourced from actual data (not estimated)
  [ ] Classification labels verified against taxonomy
  [ ] No fabricated names, codes, or identifiers
  [ ] Output format matches downstream agent's intake schema
  IF ANY UNCHECKED -> DO NOT HAND OFF
```
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-17 | Initial creation for Quality Engine v4. Extracted universal patterns, added core+adapter architecture, skill and agent adapter templates with examples. |
