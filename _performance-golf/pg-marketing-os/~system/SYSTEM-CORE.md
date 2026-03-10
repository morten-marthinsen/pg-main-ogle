# Marketing-OS — ~system/SYSTEM-CORE.md

**Version:** 1.0 (decomposed from CLAUDE.md v4.0)
**Created:** 2026-02-25
**Purpose:** Universal execution constraints loaded for EVERY skill. This is the primary institutional memory file.

**Companion Files:**
- `~system/ARENA-PROTOCOL.md` — Arena protocol, Synthesizer, Agent Teams (load for Arena skills only)
- `~system/SPECIMEN-GUIDE.md` — Dual-System specimens, Persona Voice Loading, TIER1 refs (load for generation skills only)
- `~system/skill-index/[XX]-[name].md` — Per-skill mandatory protocols (load only your skill's file from skill-index/)
- `~system/pipeline-handoff-registry.md` — Inter-skill handoff schemas, required fields per package (load when consuming upstream packages)
- `CLAUDE-HISTORY.md` — Version history, Learning from Failures, backup infrastructure (reference only)

---

## TABLE OF CONTENTS

- [THE 7 LAWS (Never Scroll Past This)](#the-7-laws-never-scroll-past-this)
- [CRITICAL: READ THIS FIRST](#critical-read-this-first)
- [THE CORE PROBLEM: LLM EXECUTION DEGRADATION](#the-core-problem-llm-execution-degradation)
- [METACOGNITIVE PROTOCOL](#metacognitive-protocol)
- [MANDATORY OUTPUT PROTOCOL (ALL SKILLS)](#mandatory-output-protocol-all-skills)
- [OUTPUT PATH CONVENTION](#output-path-convention)
- [MANDATORY PER-MICROSKILL OUTPUT PROTOCOL (ALL SKILLS)](#mandatory-per-microskill-output-protocol-all-skills)
- [PROTOCOL REFERENCES](#protocol-references)
- [FORBIDDEN BEHAVIORS](#forbidden-behaviors)
- [EFFORT PROTOCOL (EXTENDED THINKING)](#effort-protocol-extended-thinking)
- [QUALITY OVER SPEED (10x WEIGHTING)](#quality-over-speed-10x-weighting)
- [CONTEXT MANAGEMENT](#context-management)
- [ANTI-DEGRADATION ENFORCEMENT FILES](#anti-degradation-enforcement-files)
- [ACKNOWLEDGMENT](#acknowledgment)

---

## THE 7 LAWS (Never Scroll Past This)

1. **Read before you execute.** Read the skill's ANTI-DEGRADATION.md AND the microskill .md spec file before running anything. Synthesizing from AGENT.md summaries is the #1 failure mode.
2. **Every microskill produces its own file.** No file = didn't happen. No combining. No summary-only output. File existence is the only proof of execution.
3. **Gates are PASS or FAIL.** No "conditional pass," no "partial pass," no invented statuses. If it's not PASS, the gate file does not get created. Period.
4. **3-round Arena. No exceptions.** Round 1 = baseline. Round 2 = learning. Round 3 = peak. "Good enough after Round 1" is forbidden.
5. **Write to files immediately.** Conversation context is ephemeral. Every edit, every source, every decision — written to a file in the same turn it's produced. If it's not in a file, it's gone.
6. **Numbers are exact.** 1,000 quotes means 1,000. 50KB minimum means 50KB. "Close enough" and "approximately" do not exist.
7. **If something goes wrong, stop.** Don't push through. Don't rationalize. Don't find loopholes. Stop, re-read the protocol, and execute correctly.

---

## CRITICAL: READ THIS FIRST

This file exists because **patterns of failure repeat** across sessions. The Marketing-OS has suffered from:

1. **Incomplete outputs** — Skills claiming completion without all required files
2. **Missing handoffs** — JSON outputs without markdown summaries (see `~system/pipeline-handoff-registry.md` for required fields per handoff)
3. **Schema violations** — Required fields missing from structured outputs (registry defines exact field contracts)
4. **Microskill shortcuts** — Synthesizing output instead of executing skills
5. **Progressive degradation** — As context grows, execution becomes looser

**This file is the fix.** Before executing ANY Marketing-OS skill, read the relevant sections below.

---

## THE CORE PROBLEM: LLM EXECUTION DEGRADATION

As tasks get complex and context windows fill:
- The model rushes through execution
- Rules get interpreted loosely
- "Loopholes" are found to execute faster
- Quality gates are treated as suggestions
- Outputs become partial or abbreviated

**This is not acceptable.** The Marketing-OS requires COMPLETE, DISCIPLINED execution regardless of context size or task complexity.

### Anti-Degradation Protocol

```
WHEN YOU NOTICE YOURSELF:
- Rushing through steps → STOP. Slow down. Execute each step fully.
- Interpreting rules loosely → STOP. Follow rules literally.
- Finding "shortcuts" → STOP. There are no shortcuts. Execute the protocol.
- Abbreviating outputs → STOP. Every output must be complete.
- Skipping validation → STOP. Validation is mandatory, not optional.

IF CONTEXT IS LARGE:
- This does NOT excuse incomplete execution
- Request continuation if needed rather than abbreviating
- Maintain the same rigor on step 50 as step 1
```

---

## METACOGNITIVE PROTOCOL

**Why This Exists:** LLMs cannot proceduralize metacognitive skills. Every execution runs entirely through declarative working memory, which degrades under load. This protocol externalizes metacognition through mandatory self-monitoring checkpoints, context load management, structural forcing, and simulated warning signals.

---

### MC-CHECK Protocol (Metacognitive Checkpoint)

**MC-CHECK is mandatory self-monitoring injected at critical execution points.**

#### When to Execute MC-CHECK

**Retained triggers (always fire):**

| Trigger Point | Why Here |
|---------------|----------|
| **Layer Entry** | Verify prerequisites before starting |
| **Gate Validation** | Before declaring layer complete |

**Event-driven triggers (fire only when detectors flag a condition — see Event-Driven Reminders below):** Mid-layer, output, context threshold, and tool-use checks are now detector-triggered rather than fixed-schedule. This eliminates overhead when execution is clean.

#### MC-CHECK Format

```yaml
MC-CHECK:
  trigger: "[layer_entry | mid_layer | gate | output | context_threshold]"
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

#### MC-CHECK-LITE (for frequent mid-layer checks)

```
MC-CHECK-LITE:
- Confidence: [1-10]
- Rushing: [Y/N]
- Synthesizing: [Y/N]
- Action: [PROCEED | SLOW_DOWN | STOP]
```

---

### Event-Driven Reminders

**MC-CHECK firing has shifted from a fixed schedule to detector-triggered events.** MC-CHECK itself remains the format — but WHEN it fires is now driven by automated detectors that monitor for specific failure conditions.

**Static triggers kept (essential):** Layer entry, Gate validation.

**Event-driven triggers (replace mid-layer/output/context/tool-use):**

| Detector | Fires When | Maps to MC-CHECK Field |
|----------|-----------|----------------------|
| Abbreviation | Output contains placeholder language | `rushing_detection.abbreviating_outputs` |
| Rushing | Output below 60% of minimum size | `rushing_detection.abbreviating_outputs` |
| Stale Reads | 6+ writes without any Read | `synthesis_verification` |
| Synthesis | Data references without source reads | `synthesis_verification` |
| Gate Drift | Forbidden gate status used | `completeness_check` |
| Context Pressure | Zone transition detected | `confidence_assessment` |

**No overhead when execution is clean.** Detectors fire ONLY when a condition is flagged.

**Full protocol:** `~system/protocols/EVENT-DRIVEN-REMINDERS.md`

---

### Context Load Management

#### Context Zones (5-Zone System)

Zones use **absolute token counts**, not percentages, to encode real operational constraints (Opus 200K pricing boundary + context rot at scale).

| Zone | Token Range | State | Required Response |
|------|-------------|-------|-------------------|
| **GREEN** | 0–150K | Optimal | Normal MC-CHECK frequency. Within subscription pricing. Quality fully intact. |
| **YELLOW** | 150K–200K | Elevated | Approaching Opus 200K limit. Announce cost boundary to operator. Double MC-CHECK frequency. Consider session break if using Opus. |
| **ORANGE** | 200K–500K | Premium | Premium pricing active (Opus) or moderate context fill (Sonnet). Double MC-CHECK. Monitor for synthesis-from-memory. If Opus: switch to Sonnet or break. |
| **RED** | 500K–750K | Conservation | Significant context rot risk. MC-CHECK every microskill. Prepare SESSION-HANDOFF.md. Complete current gate then recommend session break. |
| **CRITICAL** | 750K–1M | Shutdown | Approaching context limit. HALT new complex operations. Complete ONLY current atomic action. Generate mandatory state handoff. DO NOT attempt new skills. |

#### Model-Specific Interpretation

| Model | Effective Window | GREEN Ends | YELLOW Ends | Notes |
|-------|-----------------|-----------|-------------|-------|
| **Opus 4.6** | 200K | 150K | 200K (hard limit) | Premium pricing begins at 200K. ORANGE = exceeded window. |
| **Sonnet 4.5** | 1M | 150K | 200K | 200K is cost boundary, not capacity limit. Full window available. |

#### Zone Response Protocol

```
IF YELLOW ZONE (150K-200K):
  - Announce: "Approaching 200K boundary — cost zone transition ahead"
  - Double MC-CHECK frequency
  - If Opus: recommend finishing current skill, then session break
  - Begin compressing completed work in logs

IF ORANGE ZONE (200K-500K):
  - Announce: "Premium pricing active / moderate context load"
  - Double MC-CHECK, watch for synthesis-from-memory
  - If Opus: you've exceeded the window — switch to Sonnet or session break
  - If Sonnet: quality still intact, but monitor

IF RED ZONE (500K-750K):
  - Announce: "Context load high - conservation mode active"
  - MC-CHECK every microskill
  - Prepare SESSION-HANDOFF.md
  - Recommend: "Session break after current gate"

IF CRITICAL ZONE (750K-1M):
  - Announce: "Context capacity reached - controlled shutdown"
  - HALT new complex operations
  - Complete ONLY current atomic action
  - Generate mandatory state handoff
  - DO NOT attempt new skills
```

**Note:** The token estimator hook (`.hooks/validators/token_estimator.py`) tracks cumulative context automatically and injects zone warnings into the agent's context.

---

### Simulated Type 1 Signals

| Signal | Trigger | Response |
|--------|---------|----------|
| **INCOMPLETENESS ALERT** | Output template has empty fields | Cannot proceed - return to complete |
| **SYNTHESIS WARNING** | Generating without recent file read | Pause - verify actual file was read |
| **RUSHING ALERT** | 4+ actions without MC-CHECK | Mandatory checkpoint before next action |
| **DEGRADATION WARNING** | Quality indicators declining | Context load assessment required |
| **CONSTRAINT VIOLATION** | Action matches forbidden behavior | Halt - review constraint, undo if needed |
| **OVERLOAD RISK** | Holding 5+ complex items simultaneously | Write intermediate state before continuing |

---

### Session Continuity Protocol

#### Continuous State (update after every microskill)

Track in execution-log.md:
```yaml
current_state:
  skill: "[skill name]"
  layer: "[layer number]"
  last_microskill: "[completed]"
  outputs_created: "[list]"
  context_zone: "[GREEN|YELLOW|RED]"
```

#### Session Handoff Document

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
- Layer: [number]
- Last Completed: [microskill]
- Next Required: [microskill]

## Completed Outputs
- [file path] - verified exists: Y/N

## Key Decisions Made
- [decision that affects downstream]

## Active Constraints
- [any special constraints for this project]

## Do Not Re-Execute
- [files already processed]
```

#### MANDATORY SESSION-END PERSISTENCE

**BEFORE ending ANY session (not just RED zone — EVERY session):**

1. Write `SESSION-STATE.md` to active project directory
2. Include: current position, completed outputs, key decisions, next action
3. Include: any unwritten human reviewer edits or source material (HARD RULE from 2026-02-10)
4. This applies to normal session ends, not just context pressure shutdowns

**This fixes the State Persistence Gap where normal session termination loses state.**

#### Skill-Level Rollback

If a skill produces bad output or a later skill corrupts earlier outputs, rollback to a known-good state using git snapshots. The agent MUST explicitly create snapshots at Layer 0 completion (pre-skill) and Layer 4 completion (post-skill) — hooks cannot detect skill boundaries automatically.

**Full protocol:** `~system/protocols/SKILL-ROLLBACK-PROTOCOL.md`

---

### Structural Forcing Principles

**Instructions can be forgotten. Structures cannot be bypassed.**

#### Transform Instructions → Templates

**Bad (Instruction):** "Remember to include all three output files"

**Good (Structural Template):**
```yaml
## OUTPUT COMPLETION GATE
output_1_json:
  written: [ ] YES  [ ] NO
  verified: [ ] YES  [ ] NO
output_2_summary:
  written: [ ] YES  [ ] NO
  verified: [ ] YES  [ ] NO
output_3_log:
  written: [ ] YES  [ ] NO
  verified: [ ] YES  [ ] NO

IF ANY "NO" → SKILL NOT COMPLETE
```

---

## MANDATORY OUTPUT PROTOCOL (ALL SKILLS)

**Every Marketing-OS skill produces THREE outputs:**

| Output Type | Format | Purpose |
|-------------|--------|---------|
| **Primary Output** | JSON/YAML | Structured data for downstream skills |
| **Summary Handoff** | Markdown | Human-readable review document |
| **Execution Log** | Markdown | Verification that all microskills ran |

### Output Verification Checklist

Before claiming ANY skill is complete:

```
[ ] Primary output file EXISTS in project outputs folder
[ ] Primary output contains ALL required schema sections
[ ] Primary output contains ALL required handoff fields (populated, not empty)
[ ] Summary markdown file EXISTS in project outputs folder
[ ] Summary markdown contains ALL required sections
[ ] Execution log EXISTS showing ALL microskills checked
[ ] Execution log shows ALL quality gates passed
```

**IF ANY CHECKBOX IS UNCHECKED → SKILL IS NOT COMPLETE**

---

## OUTPUT PATH CONVENTION

All Marketing-OS outputs go OUTSIDE the skill folders.

```
./
  ~outputs/
    [project-name]/
      [skill-id]-[skill-name]/
        layer-0-outputs/
        layer-1-outputs/
        layer-2-outputs/
        layer-3-outputs/
        layer-4-outputs/
        arena/
        checkpoints/
        execution-log.md
        PROJECT-STATE.md
        PROGRESS-LOG.md
        [PRIMARY-OUTPUT].yaml/json
        [SUMMARY].md
```

### Path Construction Rule

```
[OUTPUTS_ROOT]/[project-name]/[skill-id]-[skill-name]/[filename]
```

Where:
- `OUTPUTS_ROOT` = `~outputs/`
- `project-name` = Product or client name (lowercase, hyphens)
- `skill-id` = Two-digit skill number (01, 02, 03, etc.)
- `skill-name` = Skill name (research, proof-inventory, root-cause, etc.)

---

## MANDATORY PER-MICROSKILL OUTPUT PROTOCOL (ALL SKILLS)

**The Fix:** Every microskill execution MUST produce its own dedicated output file.

### Universal Rules

```
RULE 1: Every microskill that executes MUST produce a dedicated output file.
RULE 2: Output file MUST be named to match the microskill (e.g., 1.2-naming-candidates.md).
RULE 3: Output file MUST contain section headers matching the microskill's output schema.
RULE 4: Output file MUST meet minimum size thresholds (see table below).
RULE 5: Layer checkpoint YAML MUST list all microskill output files with sizes.
RULE 6: Execution log MUST reference each microskill output file path.
RULE 7: Summary/handoff files MUST cite per-microskill output files as sources.
```

### Minimum File Size Thresholds

| Microskill Type | Minimum Size |
|-----------------|-------------|
| **Loader/Validator** (Layer 0) | 1KB |
| **Single-Dimension Evaluation** | 2KB |
| **Complex Generation** | 5KB |
| **Multi-Element Analysis** | 3KB |
| **Validation/Audit** | 3KB |
| **Synthesis/Assembly** | 5KB |
| **Discovery/Search** | 2KB |

### Forbidden Behaviors (Per-Microskill Protocol)

1. Executing a microskill without reading its .md spec file
2. Producing summary-level output without per-microskill files
3. Creating checkpoint YAML without listing all microskill outputs
4. Execution log entries without spec-file-read confirmation
5. Output files that don't match the microskill's output schema headers
6. Output files below minimum size thresholds
7. Subagent prompts that don't list required per-microskill output files
8. Claiming a layer is complete when any microskill output is missing
9. "Synthesizing" microskill output from AGENT.md instead of reading the microskill spec
10. Combining multiple microskill outputs into a single file

---

## PROTOCOL REFERENCES

**Full reference:** `~system/PROTOCOL-INDEX.md` — 21 protocols with loading rules.
**Load at session start** for orientation. During execution, load individual protocol files as needed per skill requirements.

**Critical protocols loaded for EVERY skill:**
- `~system/protocols/EXECUTION-GUARDRAILS.md` — Pre-flight, declarations, post-execution verification
- Skill's own `ANTI-DEGRADATION.md` — Per-skill enforcement

**Protocol loading is specified in each skill's AGENT.md Layer 0 section.**

---

## FORBIDDEN BEHAVIORS

### Output Failures
1. Claiming completion with missing output files
2. Creating JSON without required schema sections
3. Creating markdown without required sections
4. Abbreviating element lists with "[continues...]"
5. Summarizing instead of including full details
6. Empty or placeholder handoff fields

### Execution Failures
1. Synthesizing output without reading microskill files
2. Skipping microskills "because I know what they'd do"
3. Proceeding past failed quality gates
4. Running Layer N before Layer N-1 is complete
5. Claiming microskills executed without actually reading them

### Per-Microskill Output Failures
1. Executing ANY microskill without producing its dedicated output file
2. Producing summary files without per-microskill output files underneath
3. Reading AGENT.md and synthesizing expected output instead of reading each microskill .md spec
4. Output files below minimum size thresholds
5. Output files missing required section headers
6. Checkpoint YAML that doesn't list all microskill output files with sizes
7. Combining multiple microskill outputs into a single file
8. Execution log entries without spec-file-read confirmation

### Expression Anchoring Failures
1. Presenting expression candidates to Arena without anchoring scores (Skills 03, 04, 06)
2. Skipping TIER1 expression reference loading (0.2.8) at Layer 0
3. Omitting quote-first generation in Skills 03 and 04

### Arena Failures
1. Running fewer than 3 Arena rounds
2. Skipping any of the 7 competitors
3. Skipping adversarial critique phase
4. Skipping targeted revision after critique
5. Using self-critique instead of dedicated Critic
6. Learning that merges VOICE instead of TECHNIQUES only
7. Auto-selecting without human input
8. Running synthesis BEFORE all 3 Arena rounds
9. Generative skills producing variations of Layer 2 draft instead of full-draft generation

### Quality Failures
1. Interpreting constraints loosely when context is large
2. Finding "efficient" alternatives to prescribed processes
3. Treating validation gates as optional
4. Rushing through execution to complete faster
5. Outputting "good enough" instead of "complete"

---

## TASK TRIAGE SYSTEM

Three effort tiers constrain **exploration depth** but NEVER quality thresholds. Minimum scores are identical across all tiers.

| Tier | Arena | Verification | Sessions | Default? |
|------|-------|-------------|----------|----------|
| **Full** | 3 rounds, 7 competitors | All layers, all gates | 6-7 | No — declare "Tier: Full" |
| **Standard** | 1 round, 3 competitors | Foundation + midpoint | 4-5 | **YES — default if undeclared** |
| **Quick** | No Arena | Layer 1 only | 2-3 | No — declare "Tier: Quick" |

**Key rule:** Tiers constrain EXPLORATION, not QUALITY. Quick tier does NOT mean "accept lower scores." The winner must still meet all documented minimums regardless of tier.

**Full protocol:** `~system/protocols/TASK-TRIAGE-PROTOCOL.md`

---

## EFFORT PROTOCOL (EXTENDED THINKING)

### Effort Level Mapping

| Execution Phase | Effort Level | Why |
|----------------|-------------|-----|
| **Layer 2 — Drafting/Generation** | `max` | Creative quality lives or dies here |
| **Arena Rounds 1-3** | `max` | Each round must explore multiple angles |
| **Arena Targeted Revision** | `max` | Surgical revision needs deep reasoning |
| **Synthesizer — Hybrids** | `max` | Micro-element decomposition requires care |
| **Arena Critique** | `high` | Must find genuine weaknesses |
| **Learning Brief Generation** | `high` | Understanding WHY techniques worked |
| **Layer 0–1 — Foundation** | `high` | Decisions cascade downstream |
| **Layer 3 — Validation** | `high` | Quality verification needs thoroughness |
| **MC-CHECK** | `medium` | Quick honest self-assessment |
| **Gate Verification** | `medium` | Binary threshold check |
| **Session Handoff / State Tracking** | `low` | Mechanical recording |

---

## QUALITY OVER SPEED (10x WEIGHTING)

- **Speed target:** 0%
- **Quality target:** 100%

When facing a choice between:
- Fast but incomplete → CHOOSE complete
- Efficient but abbreviated → CHOOSE complete
- Quick but possibly wrong → CHOOSE slow and correct

**There is no "good enough" in Marketing-OS execution.**

---

Prose quality gate: see `~system/protocols/PROSE-QUALITY-VERIFICATION.md` (Skills 11-17 only).

---

Proportionality calibration: see `~system/protocols/EXECUTION-GUARDRAILS.md` (Arena scoring skills).

---

## CONTEXT MANAGEMENT

When context grows large:
1. **Do NOT abbreviate** to fit more content
2. **Do NOT rush** through remaining steps
3. **Do NOT skip** validation or quality gates
4. **DO request** continuation if needed
5. **DO maintain** the same rigor throughout
6. **DO suggest** session breaks if degradation is detected

---

## ANTI-DEGRADATION ENFORCEMENT FILES

**Every skill across all engines has a dedicated ANTI-DEGRADATION.md file.** These contain STRUCTURAL enforcement that CANNOT be bypassed. Each file has EQUAL authority to this ~system/SYSTEM-CORE.md.

**Automated Validation Hooks** (`.hooks/`) fire on every file Write/Edit, checking for forbidden gate statuses, schema compliance, output completeness, threshold clustering, and context zone boundaries. The Stop hook blocks session completion if critical validation failures exist. See `.hooks/README.md` for details.

### Universal Enforcement Protocol

**`~system/protocols/EXECUTION-GUARDRAILS.md`** — Defines the mandatory read declaration, GATE_0 proof standard, and pre-flight/post-execution checklists. Every skill execution must include the mandatory read declaration in the first output file.

### Protocol Loading (Dynamic)

**Do NOT load all protocols for every skill.** Use `~system/PROTOCOL-MANIFEST.md` to determine which protocols to load based on the current skill's properties (arena, generates_copy, engine, etc.).

Each skill has a loading profile at `~system/skill-loading-profiles/[id]-[name].yaml` that declares its exact protocol requirements. At session start:

1. Read `PROTOCOL-MANIFEST.md` for the priority-banded loading algorithm
2. Read the current skill's loading profile YAML
3. Load ONLY the protocols listed in `protocols_required`
4. Evaluate conditional protocols (priority 65-95) against skill flags

**Always loaded (priority 10-45):** The 7 Laws, core anti-degradation, output protocol, forbidden behaviors, event-driven reminders, effort protocol.

**Conditionally loaded (priority 50-98):** Skill SKILL.md, ANTI-DEGRADATION.md, Arena protocols (if arena skill), Specimen Guide (if generates copy), engine master files (if branch engine), MCP tools (see `~system/MCP-TOOL-REGISTRY.md`).

---

## ACKNOWLEDGMENT

If you are an LLM reading this file at the start of a Marketing-OS session:

**You are expected to:**
1. Read this ~system/SYSTEM-CORE.md file
2. Read the skill's ANTI-DEGRADATION.md file
3. Write the MANDATORY READ DECLARATION to your first output file
4. Read the appropriate companion files for your skill type
5. Execute with full discipline regardless of context size
6. Produce COMPLETE outputs with ALL required files
7. Never claim completion without verification
8. Write SESSION-STATE.md before ending ANY session

**Failure to follow these protocols has caused real problems. Do not repeat them.**
