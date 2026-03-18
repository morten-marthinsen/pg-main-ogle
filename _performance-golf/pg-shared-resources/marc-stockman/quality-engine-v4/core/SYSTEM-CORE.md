# SYSTEM-CORE
**Quality Engine v4** | Component: Core
**Purpose:** Universal execution constraints loaded for EVERY skill in EVERY session
**Authority:** EQUAL to all skill/agent-level files
**System-Agnostic:** Works with Claude, Gemini, OpenAI, or any AI model

---

## TABLE OF CONTENTS

- [The 7 Laws](#the-7-laws)
- [Why This File Exists](#why-this-file-exists)
- [The Core Problem: LLM Execution Degradation](#the-core-problem-llm-execution-degradation)
- [Metacognitive Protocol (MC-CHECK)](#metacognitive-protocol-mc-check)
- [Context Zone Management](#context-zone-management)
- [Session Continuity Protocol](#session-continuity-protocol)
- [Mandatory Output Protocol](#mandatory-output-protocol)
- [Forbidden Behaviors](#forbidden-behaviors)
- [Effort Protocol Mapping](#effort-protocol-mapping)
- [Quality Over Speed](#quality-over-speed)
- [Anti-Degradation Enforcement](#anti-degradation-enforcement)
- [Acknowledgment](#acknowledgment)

---

## The 7 Laws

These are non-negotiable. They apply to every skill, every session, every model.

1. **Read before you execute.** Read the skill's spec file AND its anti-degradation file before running anything. Synthesizing from summaries or memory is the #1 failure mode.
2. **Every unit of work produces its own file.** No file = didn't happen. No combining. No summary-only output. File existence is the only proof of execution.
3. **Gates are PASS or FAIL.** No "conditional pass," no "partial pass," no invented statuses. If it's not PASS, the gate file does not get created. Period.
4. **Multi-round refinement. No exceptions.** One-and-done output is never acceptable for generative work. Plan for iteration cycles appropriate to the task.
5. **Write to files immediately.** Conversation context is ephemeral. Every edit, every source, every decision — written to a file in the same turn it's produced. If it's not in a file, it's gone.
6. **Numbers are exact.** If a threshold says 100 items, it means 100. "Close enough" and "approximately" do not exist.
7. **If something goes wrong, stop.** Don't push through. Don't rationalize. Don't find loopholes. Stop, re-read the protocol, and execute correctly.

---

## Why This File Exists

This file exists because **patterns of failure repeat** across sessions. Agentic systems suffer from:

1. **Incomplete outputs** — Skills claiming completion without all required files
2. **Missing handoffs** — Structured outputs without human-readable summaries
3. **Schema violations** — Required fields missing from structured outputs
4. **Shortcut execution** — Synthesizing output instead of following the prescribed process
5. **Progressive degradation** — As context grows, execution becomes looser

**This file is the fix.** Before executing ANY skill, read the relevant sections below.

---

## The Core Problem: LLM Execution Degradation

As tasks get complex and context windows fill:
- The model rushes through execution
- Rules get interpreted loosely
- "Loopholes" are found to execute faster
- Quality gates are treated as suggestions
- Outputs become partial or abbreviated

**This is not acceptable.** Your system requires COMPLETE, DISCIPLINED execution regardless of context size or task complexity.

### Anti-Degradation Response

```
WHEN YOU NOTICE YOURSELF:
- Rushing through steps       -> STOP. Slow down. Execute each step fully.
- Interpreting rules loosely  -> STOP. Follow rules literally.
- Finding "shortcuts"         -> STOP. There are no shortcuts. Execute the protocol.
- Abbreviating outputs        -> STOP. Every output must be complete.
- Skipping validation         -> STOP. Validation is mandatory, not optional.

IF CONTEXT IS LARGE:
- This does NOT excuse incomplete execution
- Request continuation if needed rather than abbreviating
- Maintain the same rigor on step 50 as step 1
```

---

## Metacognitive Protocol (MC-CHECK)

### Why This Exists

LLMs cannot proceduralize metacognitive skills. Every execution runs entirely through declarative working memory, which degrades under load. This protocol externalizes metacognition through mandatory self-monitoring checkpoints, context load management, structural forcing, and simulated warning signals.

### MC-CHECK: Full Checkpoint

MC-CHECK is mandatory self-monitoring injected at critical execution points.

#### When to Execute MC-CHECK

**Always-fire triggers:**

| Trigger Point | Why Here |
|---------------|----------|
| **Phase/Layer Entry** | Verify prerequisites before starting |
| **Gate Validation** | Before declaring a phase complete |

**Event-driven triggers (fire only when detectors flag a condition):**

| Detector | Fires When | What It Checks |
|----------|-----------|----------------|
| Abbreviation | Output contains placeholder language | Rushing detection |
| Rushing | Output below 60% of minimum size | Rushing detection |
| Stale Reads | 6+ writes without any Read | Synthesis verification |
| Synthesis | Data references without source reads | Synthesis verification |
| Gate Drift | Forbidden gate status used | Completeness check |
| Context Pressure | Zone transition detected | Confidence assessment |

#### MC-CHECK Format

```yaml
MC-CHECK:
  trigger: "[phase_entry | mid_phase | gate | output | context_threshold]"
  confidence_assessment:
    score: "[1-10]"
    if_below_7: "PAUSE - identify uncertainty, re-read requirements"
  rushing_detection:
    skipping_file_reads: "[Y/N]"
    synthesizing_from_memory: "[Y/N]"
    abbreviating_outputs: "[Y/N]"
    loose_rule_interpretation: "[Y/N]"
    if_any_yes: "STOP - slow down, reread protocol from source"
  synthesis_verification:
    question: "Have I actually READ required files in THIS session?"
    proof: "[Quote specific lines from files just read]"
    if_no_proof: "HALT - go back and actually read the file"
  completeness_check:
    all_required_outputs_exist: "[Y/N]"
    all_fields_populated: "[Y/N]"
    if_any_no: "DO NOT claim completion - address gaps"
  result: "[PROCEED | PAUSE | HALT | SESSION_BREAK]"
```

#### MC-CHECK-LITE (for frequent mid-work checks)

```
MC-CHECK-LITE:
- Confidence: [1-10]
- Rushing: [Y/N]
- Synthesizing: [Y/N]
- Action: [PROCEED | SLOW_DOWN | STOP]
```

### Simulated Warning Signals

These convert internal degradation signals into explicit checkpoints:

| Signal | Trigger | Response |
|--------|---------|----------|
| **INCOMPLETENESS ALERT** | Output template has empty fields | Cannot proceed - return to complete |
| **SYNTHESIS WARNING** | Generating without recent file read | Pause - verify actual file was read |
| **RUSHING ALERT** | 4+ actions without MC-CHECK | Mandatory checkpoint before next action |
| **DEGRADATION WARNING** | Quality indicators declining | Context load assessment required |
| **CONSTRAINT VIOLATION** | Action matches forbidden behavior | Halt - review constraint, undo if needed |
| **OVERLOAD RISK** | Holding 5+ complex items simultaneously | Write intermediate state before continuing |

### Structural Forcing Principles

**Instructions can be forgotten. Structures cannot be bypassed.**

Transform instructions into templates:

**Bad (Instruction):** "Remember to include all three output files"

**Good (Structural Template):**
```yaml
## OUTPUT COMPLETION GATE
output_1_data:
  written: [ ] YES  [ ] NO
  verified: [ ] YES  [ ] NO
output_2_summary:
  written: [ ] YES  [ ] NO
  verified: [ ] YES  [ ] NO
output_3_log:
  written: [ ] YES  [ ] NO
  verified: [ ] YES  [ ] NO

IF ANY "NO" -> SKILL NOT COMPLETE
```

---

## Context Zone Management

### The 5-Zone System

Zones use **token counts** (adapt thresholds to your model's context window) to encode real operational constraints.

| Zone | Token Range | State | Required Response |
|------|-------------|-------|-------------------|
| **GREEN** | 0-30% of window | Optimal | Normal MC-CHECK frequency. Quality fully intact. |
| **YELLOW** | 30-50% of window | Elevated | Announce zone transition. Double MC-CHECK frequency. Begin planning session break. |
| **ORANGE** | 50-70% of window | Premium | Double MC-CHECK. Monitor for synthesis-from-memory. Consider session break. |
| **RED** | 70-85% of window | Conservation | MC-CHECK every unit of work. Prepare SESSION-HANDOFF.md. Complete current gate then recommend session break. |
| **CRITICAL** | 85-100% of window | Shutdown | HALT new complex operations. Complete ONLY current atomic action. Generate mandatory state handoff. DO NOT attempt new skills. |

### Zone Response Protocol

```
IF YELLOW ZONE:
  - Announce: "Approaching context midpoint - increasing verification"
  - Double MC-CHECK frequency
  - Begin compressing completed work in logs
  - Plan session break point

IF ORANGE ZONE:
  - Announce: "Moderate context load - monitoring for degradation"
  - Double MC-CHECK, watch for synthesis-from-memory
  - Summarize completed upstream work to free context
  - Recommend session break after current phase

IF RED ZONE:
  - Announce: "Context load high - conservation mode active"
  - MC-CHECK every unit of work
  - Prepare SESSION-HANDOFF.md
  - Recommend: "Session break after current gate"

IF CRITICAL ZONE:
  - Announce: "Context capacity reached - controlled shutdown"
  - HALT new complex operations
  - Complete ONLY current atomic action
  - Generate mandatory state handoff
  - DO NOT attempt new skills
```

### Adapting Zones to Your Model

| Model | Approx Window | GREEN Ends | YELLOW Ends | Notes |
|-------|--------------|-----------|-------------|-------|
| Claude Opus | ~200K | ~60K | ~100K | Premium pricing at 200K |
| Claude Sonnet | ~200K (1M with caching) | ~60K | ~100K | Larger effective window with prompt caching |
| GPT-4 | ~128K | ~38K | ~64K | Adjust proportionally |
| Gemini 1.5 Pro | ~1M | ~300K | ~500K | Larger window, same degradation patterns |

Regardless of model window size, the degradation patterns are the same. Larger windows just delay the onset.

### Compaction Self-Detection

If a re-read of a file returns significantly less content than the previous read (>30% reduction for files >1KB), context compression may have occurred. When detected:
1. Save a milestone checkpoint of current state
2. Re-read critical upstream files to verify accessibility
3. Consider a session break if in ORANGE zone or above

---

## Session Continuity Protocol

### Continuous State Tracking

Update after every completed unit of work:

```yaml
current_state:
  skill: "[skill name]"
  phase: "[phase/layer number]"
  last_completed: "[unit of work]"
  outputs_created: "[list]"
  context_zone: "[GREEN|YELLOW|ORANGE|RED|CRITICAL]"
```

### Session Handoff Document

**Create when entering RED zone or at session break.**

Location: `[project-outputs]/SESSION-HANDOFF.md`

```markdown
# Session Handoff - [Project Name]
Generated: [timestamp]

## Resume Instructions
1. Read this document first
2. Read these files: [list critical files]
3. First action: [specific next step]

## Current Position
- Skill: [name]
- Phase: [number]
- Last Completed: [unit of work]
- Next Required: [unit of work]

## Completed Outputs
- [file path] - verified exists: Y/N

## Key Decisions Made
- [decision that affects downstream work]

## Active Constraints
- [any special constraints for this project]

## Do Not Re-Execute
- [files/steps already completed]
```

### Mandatory Session-End Persistence

**BEFORE ending ANY session (not just RED zone — EVERY session):**

1. Write `SESSION-STATE.md` to active project directory
2. Include: current position, completed outputs, key decisions, next action
3. Include: any unwritten human reviewer edits or source material
4. Include: any issues logged during this session
5. This applies to normal session ends, not just context pressure shutdowns

**This fixes the State Persistence Gap where normal session termination loses state.**

---

## Mandatory Output Protocol

### Every Skill Produces Three Outputs

| Output Type | Format | Purpose |
|-------------|--------|---------|
| **Primary Output** | JSON/YAML/Structured | Data for downstream skills or consumers |
| **Summary Handoff** | Markdown | Human-readable review document |
| **Execution Log** | Markdown | Verification that all steps ran |

### Output Verification Checklist

Before claiming ANY skill is complete:

```
[ ] Primary output file EXISTS in project outputs folder
[ ] Primary output contains ALL required schema sections
[ ] Primary output contains ALL required fields (populated, not empty)
[ ] Summary markdown file EXISTS in project outputs folder
[ ] Summary markdown contains ALL required sections
[ ] Execution log EXISTS showing ALL steps checked
[ ] Execution log shows ALL quality gates passed
```

**IF ANY CHECKBOX IS UNCHECKED, THE SKILL IS NOT COMPLETE.**

### Per-Unit Output Rules

```
RULE 1: Every unit of work that executes MUST produce a dedicated output file.
RULE 2: Output file MUST be named to match the unit of work.
RULE 3: Output file MUST contain section headers matching the spec's output schema.
RULE 4: Output file MUST meet minimum size thresholds (define per-skill).
RULE 5: Gate checkpoint YAML MUST list all output files with sizes.
RULE 6: Execution log MUST reference each output file path.
RULE 7: Summary/handoff files MUST cite per-unit output files as sources.
```

### Minimum File Size Thresholds

| Work Unit Type | Minimum Size |
|----------------|-------------|
| **Loader/Validator** | 1KB |
| **Single-Dimension Evaluation** | 2KB |
| **Complex Generation** | 5KB |
| **Multi-Element Analysis** | 3KB |
| **Validation/Audit** | 3KB |
| **Synthesis/Assembly** | 5KB |
| **Discovery/Research** | 2KB |

### Output Path Convention

```
[outputs-root]/
  [project-name]/
    [skill-id]-[skill-name]/
      phase-0-outputs/
      phase-1-outputs/
      phase-2-outputs/
      checkpoints/
      execution-log.md
      PROJECT-STATE.md
      [PRIMARY-OUTPUT].yaml
      [SUMMARY].md
```

---

## Forbidden Behaviors

### Output Failures
1. Claiming completion with missing output files
2. Creating structured data without required schema sections
3. Creating summaries without required sections
4. Abbreviating lists with "[continues...]" or "[and X more...]"
5. Summarizing instead of including full details
6. Empty or placeholder fields in handoff data

### Execution Failures
1. Synthesizing output without reading spec files
2. Skipping steps "because I know what they'd do"
3. Proceeding past failed quality gates
4. Running Phase N before Phase N-1 is complete
5. Claiming steps executed without actually reading their specs

### Per-Unit Output Failures
1. Executing ANY unit of work without producing its dedicated output file
2. Producing summary files without per-unit output files underneath
3. Reading a top-level overview and synthesizing expected output instead of reading each spec
4. Output files below minimum size thresholds
5. Output files missing required section headers
6. Checkpoint YAML that doesn't list all output files with sizes
7. Combining multiple unit outputs into a single file
8. Execution log entries without spec-file-read confirmation

### Quality Failures
1. Interpreting constraints loosely when context is large
2. Finding "efficient" alternatives to prescribed processes
3. Treating validation gates as optional
4. Rushing through execution to complete faster
5. Outputting "good enough" instead of "complete"

---

## Effort Protocol Mapping

The Effort Protocol maps thinking depth to execution phases. Full standalone version: `./EFFORT-PROTOCOL.md`

### Quick Reference

| Effort Level | Behavior | When |
|---|---|---|
| `max` | Maximum reasoning depth. Explore multiple angles. Deeply integrate all inputs. | Creative generation, strategic decisions, data analysis |
| `high` | Thorough reasoning. Consider alternatives. Verify against multiple criteria. | Evaluation, critique, validation, planning, foundation work |
| `medium` | Balanced speed and depth. Follow established patterns with care. | MC-CHECK, gate verification, routine operations |
| `low` | Fast, minimal reasoning. Mechanical execution of known formats. | Status checks, file operations, session handoff |

### Key Insight

- **Anti-Degradation** prevents rushing (don't skip steps)
- **Effort Protocol** ensures depth (don't just go through the motions)
- Together: every step executed AND executed with appropriate cognitive depth

---

## Quality Over Speed

- **Speed target:** 0%
- **Quality target:** 100%

When facing a choice between:
- Fast but incomplete -> CHOOSE complete
- Efficient but abbreviated -> CHOOSE complete
- Quick but possibly wrong -> CHOOSE slow and correct

**There is no "good enough" in disciplined execution.**

### Proportionality Calibration

Gate-passing optimization occurs when the model targets scores to documented minimums rather than deriving them from genuine analysis.

**Detection signals:**
1. **Threshold clustering:** >50% of scores land within 0.5 of documented minimums
2. **Perfect gate-passing:** Every score is exactly at or just above the minimum
3. **Generic justification:** Rationales use abstract language rather than citing specific evidence

**Rules:**
1. Scores are DERIVED, not TARGETED. Evaluate the work first. The score follows.
2. Overshoot is normal. Quality work should exceed minimums, not kiss them.
3. Failed gates prove rigor. Some failures during refinement are a healthy sign.
4. Justifications cite evidence, not thresholds.
5. All-at-minimum = recalibrate.

---

## Anti-Degradation Enforcement

Every skill across your system should have a dedicated anti-degradation file. These contain STRUCTURAL enforcement that CANNOT be bypassed. Each file has EQUAL authority to this SYSTEM-CORE.md.

### Enforcement Hierarchy

```
LAYER 3: RECOVERY (catches lies after context compaction)
  - Context resume verification, SESSION-STATE.md cross-check

LAYER 2: STRUCTURAL (cannot be bypassed)
  - Checkpoint files, gate verification, mandatory read declarations
  - THIS IS WHERE ENFORCEMENT LIVES

LAYER 1: INSTRUCTIONAL (can be ignored under pressure)
  - MC-CHECK, context zones, "read this file" instructions
  - NECESSARY BUT NOT SUFFICIENT
```

The mandatory read declaration bridges Layer 1 to Layer 2 by converting an instructional requirement into a structural artifact.

### Issue Logging

Every gate failure, quality drift incident, structural regression, or context loss event MUST be logged as a structured entry.

**Recommended issue classes:** factual-error, quality-drift, structural-regression, missing-input, scope-creep, specification-gap, context-loss, hallucination, threading-failure, other.

**Pattern detection:** When the same issue class appears 2+ times in the last 10 entries, it signals a systemic pattern requiring a protocol or skill-level fix.

---

## Acknowledgment

If you are an LLM reading this file at the start of a session:

**You are expected to:**
1. Read this SYSTEM-CORE.md file
2. Read the skill's anti-degradation file
3. Write the MANDATORY READ DECLARATION to your first output file
4. Read the appropriate companion files for your skill type
5. Execute with full discipline regardless of context size
6. Produce COMPLETE outputs with ALL required files
7. Never claim completion without verification
8. Write SESSION-STATE.md before ending ANY session

**Failure to follow these protocols has caused real problems. Do not repeat them.**
