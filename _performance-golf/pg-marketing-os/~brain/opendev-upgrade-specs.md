# OpenDev Architecture Upgrades — Implementation Specs

**Version:** 1.0
**Created:** 2026-03-09
**Source Paper:** "OpenDev: Building Effective AI Coding Agents for the Terminal" (Bui, March 2026, arXiv:2603.05344v2)
**Purpose:** Nine architectural enhancements transplanted from OpenDev's compound AI agent framework to marketing-os
**Implementation Priority:** Numbered 1-9, implement in order (dependencies cascade)

---

## TABLE OF CONTENTS

1. [Enhancement 1: Event-Driven System Reminders](#enhancement-1-event-driven-system-reminders)
2. [Enhancement 2: Dynamic Protocol Loading](#enhancement-2-dynamic-protocol-loading)
3. [Enhancement 3: Subagent Arena](#enhancement-3-subagent-arena)
4. [Enhancement 4: Adaptive Context Compaction](#enhancement-4-adaptive-context-compaction)
5. [Enhancement 5: Workload-Specialized Model Routing](#enhancement-5-workload-specialized-model-routing)
6. [Enhancement 6: Dual-Agent Planning/Execution Separation](#enhancement-6-dual-agent-planningexecution-separation)
7. [Enhancement 7: Doom-Loop and Convergence Detection](#enhancement-7-doom-loop-and-convergence-detection)
8. [Enhancement 8: Skill-Level Rollback via Shadow Snapshots](#enhancement-8-skill-level-rollback-via-shadow-snapshots)
9. [Enhancement 9: Lazy MCP Tool Discovery](#enhancement-9-lazy-mcp-tool-discovery)
10. [Dependency Map](#dependency-map)
11. [Implementation Sequence](#implementation-sequence)

---

## Enhancement 1: Event-Driven System Reminders

### OpenDev Concept

OpenDev uses *event-driven detectors* that monitor for specific failure conditions (repeated errors, tool misuse patterns, context pressure) and inject targeted reminders as user-role messages *only when the condition is detected*. This replaces static instruction repetition with reactive behavioral steering.

Key insight: "Static prompts fade; dynamic reminders sustain alignment."

### Current State in Marketing-OS

MC-CHECK fires on a fixed schedule:
- Layer entry
- Every 3-4 microskills (mid-layer)
- Gate validation
- Before output generation
- Context threshold 75%
- After major tool use

This is structural but wasteful — it fires even when execution is clean, adding token overhead. Worse, it doesn't fire when degradation occurs *between* scheduled checkpoints.

The existing hook infrastructure (`dispatch-validator.sh` + 6 Python validators) fires on PostToolUse and Stop events but only validates *outputs*, not *execution behavior*.

### What Changes

Replace scheduled MC-CHECKs with detector-triggered reminders. MC-CHECK itself stays as a format — but WHEN it fires changes from "every N microskills" to "when a detector flags a condition."

### Files to Create

#### `~system/protocols/EVENT-DRIVEN-REMINDERS.md`

```markdown
# Event-Driven Reminder Protocol

## Detector Definitions

### Detector 1: Synthesis Detector
**Trigger:** Agent references content from an upstream file it has NOT read in the current session
**Signal:** Uses specific data (quote, score, mechanism name) without a preceding Read tool call for that file
**Detection Method:** Track file reads via hook; compare against data references in output
**Reminder Template:**
> SYNTHESIS WARNING: You referenced data from [file] without reading it in this session.
> You may be generating from cached memory, not from source files.
> ACTION: Read [file] now before continuing. Quote the specific line you need.

### Detector 2: Rushing Detector
**Trigger:** Output file size falls below 60% of the microskill's minimum threshold
**Signal:** File written by Write/Edit tool is undersized
**Detection Method:** output_validator.py already tracks file sizes — extend with percentage comparison
**Reminder Template:**
> RUSHING ALERT: [filename] is [X]KB — the minimum for [microskill-type] is [Y]KB.
> This suggests abbreviated output. Re-read the microskill spec: [spec-path]
> ACTION: Re-execute this microskill with full output. Do not proceed.

### Detector 3: Voice Drift / Convergence Detector
**Trigger:** During Arena rounds, 3+ persona outputs share >40% 5-gram overlap
**Signal:** Structural similarity across outputs that should be distinct
**Detection Method:** New validator (see convergence_detector.py below)
**Reminder Template:**
> CONVERGENCE WARNING: Personas [X], [Y], and [Z] share [N]% 5-gram overlap.
> This indicates persona contamination — the model is generating variations, not independent voices.
> ACTION: Re-read each persona's specimen file before regenerating. Use Sequential Isolation Protocol.

### Detector 4: Abbreviation Detector
**Trigger:** Output contains summary markers instead of concrete specifics
**Signal:** Phrases like "continues with...", "similar pattern for...", "[additional examples]", "etc.", "and so on"
**Detection Method:** Regex scan on PostToolUse Write/Edit
**Reminder Template:**
> ABBREVIATION ALERT: Output contains summary placeholder language: "[matched phrase]"
> Full output is required. "Close enough" does not exist (Law 6).
> ACTION: Replace the abbreviated section with complete, specific content.

### Detector 5: Gate Drift Detector
**Trigger:** Gate status uses any word other than PASS, FAIL, or COMPLETE
**Signal:** "CONDITIONAL_PASS", "PARTIAL_PASS", "PASS_WITH_NOTES", or any variant
**Detection Method:** gate_validator.py already catches this — extend to inject reminder into context
**Reminder Template:**
> GATE VIOLATION: Status "[status]" is forbidden. Gates are PASS or FAIL (Law 3).
> There is no conditional pass, no partial pass, no invented statuses.
> ACTION: Either fix the issue and write PASS, or write FAIL and halt.

### Detector 6: Context Pressure Detector
**Trigger:** Token estimator reports zone transition (GREEN→YELLOW, YELLOW→ORANGE, etc.)
**Signal:** Cumulative context crosses zone boundary
**Detection Method:** token_estimator.py already tracks this — extend to inject zone-appropriate reminder
**Reminder Template:** (varies by zone, see SYSTEM-CORE.md Zone Response Protocol)

### Detector 7: Stale Read Detector
**Trigger:** Agent executes 6+ consecutive Write/Edit actions without any Read action
**Signal:** Extended generation without consulting source files
**Detection Method:** Track action sequence in hook state file
**Reminder Template:**
> STALE READ WARNING: You have written [N] files without reading any source files.
> Extended generation without source consultation risks drift from foundation decisions.
> ACTION: Re-read the context reservoir and current skill's upstream packages before continuing.
```

#### `.hooks/validators/reminder_detector.py`

New Python validator that implements Detectors 1, 2, 4, 5, 7. Detectors 3 and 6 extend existing validators.

```python
# Structure (implement in session):
#
# class ReminderDetector:
#     def __init__(self, state_file=".hooks/.reminder-state.json"):
#         self.state = self._load_state(state_file)
#
#     def detect_abbreviation(self, content: str) -> Optional[str]:
#         """Scan for summary placeholder patterns"""
#         ABBREVIATION_PATTERNS = [
#             r'\[continues?\s*(with|for|in)\b',
#             r'\[additional\s+\w+\]',
#             r'similar pattern for',
#             r'\betc\.\b',
#             r'and so on\b',
#             r'\[more\s+\w+\]',
#             r'repeats? (the|this) pattern',
#         ]
#         # Return matched pattern or None
#
#     def detect_stale_reads(self) -> Optional[str]:
#         """Track read/write action ratio"""
#         # Increment write_count on Write/Edit
#         # Reset on Read
#         # Fire if write_count >= 6
#
#     def detect_rushing(self, filepath: str, content: str) -> Optional[str]:
#         """Compare file size against microskill minimum thresholds"""
#         # Map microskill type from filepath
#         # Compare len(content) against MINIMUM_THRESHOLDS
#         # Fire if below 60% of minimum
#
#     def detect_synthesis(self, content: str) -> Optional[str]:
#         """Check for data references without corresponding reads"""
#         # Track files read in current session from state
#         # Scan content for specific data patterns (scores, quote IDs, mechanism names)
#         # Flag if referenced data doesn't match a read file
#
# Integration: dispatch-validator.sh routes ALL writes through reminder_detector
# in addition to existing validators. Reminder output format:
#
# {
#   "type": "reminder",
#   "detector": "abbreviation",
#   "severity": "warning",
#   "message": "...",
#   "action_required": "..."
# }
```

### Files to Modify

| File | Change |
|------|--------|
| `~system/SYSTEM-CORE.md` | Add "Event-Driven Reminders" section after MC-CHECK. Keep MC-CHECK as format but update "When to Execute" to say "triggered by detectors, not on fixed schedule." Add detector reference table. |
| `~system/protocols/EXECUTION-GUARDRAILS.md` | Add detector list to Pre-Flight Checklist awareness. Operators should know reminders may fire. |
| `.hooks/dispatch-validator.sh` | Add routing for `reminder_detector.py` on ALL Write/Edit events (runs alongside existing validators). |
| `.hooks/validators/token_estimator.py` | Extend zone transition detection to emit reminder-format JSON (Detector 6). |
| `.hooks/validators/gate_validator.py` | Extend forbidden status detection to emit reminder-format JSON (Detector 5). |
| `.hooks/README.md` | Document new reminder_detector.py and updated validator behaviors. |

### MC-CHECK Schedule Change

**Before (static):**
```
Layer entry → Mid-layer (every 3-4) → Gate → Output → Context 75% → After tool use
```

**After (event-driven + reduced static):**
```
STATIC (kept, reduced frequency):
  - Layer entry (still fires — verify prerequisites)
  - Gate validation (still fires — binary check)

EVENT-DRIVEN (replaces mid-layer, output, context, tool-use triggers):
  - Fires ONLY when a detector flags a condition
  - Each detector maps to the relevant MC-CHECK fields
  - No overhead when execution is clean
```

### Effort Estimate

- New protocol file: ~1 hour
- New Python detector: ~2-3 hours
- Modify 5 existing files: ~1 hour
- Testing across 2-3 skills: ~1 hour
- **Total: ~5-6 hours**

### Dependencies

None — this is the foundation enhancement. All others benefit from it.

---

## Enhancement 2: Dynamic Protocol Loading

### OpenDev Concept

OpenDev uses priority-ordered (1-100) conditional system prompt sections. Only sections matching the current mode, provider, and context are included. This keeps prompts lean and focused per-task.

Key insight: "Lazy loading prevents token bloat; on-demand discovery maintains efficiency."

### Current State in Marketing-OS

`SYSTEM-CORE.md` is loaded wholesale for every skill (~589 lines, ~15KB). `ARENA-PROTOCOL.md` (267 lines, ~8KB) is supposed to load "for Arena skills ONLY" but the boundary is manually enforced. `SPECIMEN-GUIDE.md` loads "for generation skills only" — again, manual.

The Pre-Flight Checklist in `EXECUTION-GUARDRAILS.md` lists 7 files with "When to Load" guidance, but this is advisory, not structural.

The 29 protocol files in `~system/protocols/` are loaded ad-hoc based on skill requirements. No priority system. No conditional composition.

### What Changes

Create a protocol manifest that defines priority bands, conditional loading rules, and per-skill/per-engine/per-tier inclusion logic. The agent reads the manifest at session start and loads only the protocols needed for the current execution context.

### Files to Create

#### `~system/PROTOCOL-MANIFEST.md`

```markdown
# Protocol Manifest — Conditional Loading Rules

## Priority Bands

| Priority | Category | Load Condition | Est. Tokens |
|----------|----------|----------------|-------------|
| 10 | The 7 Laws | ALWAYS | ~500 |
| 15 | Core Anti-Degradation (SYSTEM-CORE §1-3) | ALWAYS | ~1,500 |
| 20 | Mandatory Output Protocol | ALWAYS | ~800 |
| 25 | Per-Microskill Output Protocol | ALWAYS | ~600 |
| 30 | Forbidden Behaviors (core subset) | ALWAYS | ~400 |
| 35 | Event-Driven Reminders (detector awareness) | ALWAYS | ~300 |
| 40 | Task Triage (tier identification) | SESSION START ONLY | ~400 |
| 45 | Effort Protocol (extended thinking) | ALWAYS | ~500 |
| 50 | Current Skill SKILL.md | PER SKILL | varies |
| 55 | Current Skill ANTI-DEGRADATION.md | PER SKILL | varies |
| 60 | Skill-Index file (skill-index/XX-name.md) | PER SKILL | varies |
| 65 | ARENA-PROTOCOL.md | IF skill.arena == true | ~8,000 |
| 68 | ARENA-CORE-PROTOCOL.md | IF skill.arena == true | ~5,000 |
| 70 | SPECIMEN-GUIDE.md | IF skill.generates_copy == true | ~4,000 |
| 72 | PERSONA-VOICE-LOADING-PROTOCOL.md | IF skill.generates_copy == true | ~2,000 |
| 75 | Vertical profile (verticals/[vertical].md) | IF vertical != null | ~2,000 |
| 78 | CONTEXT-RESERVOIR-TEMPLATE.md | IF skill_number >= 10 | ~3,000 |
| 80 | ENGINE master file (AD-ENGINE.md, etc.) | IF engine != "main-pipeline" | varies |
| 82 | Pipeline Handoff Registry | IF skill.consumes_upstream == true | ~3,000 |
| 85 | Expression Anchoring Protocol | IF skill in [03, 04, 05, 06] | ~2,000 |
| 88 | Prose Quality Verification | IF skill in [11-17] | ~1,500 |
| 90 | Active Recitation Protocol | IF tier in [Full, Standard] AND skill in [12, 15] | ~1,000 |
| 92 | Foundation Integrity Check | IF between Session 4-5 AND tier != Quick | ~1,500 |
| 95 | Context Zone Reminders | IF zone != GREEN | ~500 |

## Loading Algorithm

At session start:
1. Read this manifest
2. Identify: current skill(s), engine, tier, vertical, zone
3. Load all protocols where Load Condition evaluates TRUE
4. Sort by priority (lower number = loaded first)
5. Track total estimated tokens loaded

At skill transition (within session):
1. Unload protocols specific to the previous skill (priority 50-60)
2. Load protocols for the new skill
3. Re-evaluate conditional protocols (65-95)

## Per-Skill Loading Table

[Generate from existing skill YAML frontmatter — each skill declares:
  arena: true/false
  generates_copy: true/false
  consumes_upstream: true/false
  expression_anchoring: true/false
  engine: main-pipeline/ads/email/organic/upsell
]
```

#### `~system/skill-loading-profiles/`

One YAML file per skill declaring its protocol requirements:

```yaml
# Example: ~system/skill-loading-profiles/11-lead.yaml
skill_id: 11
skill_name: lead
engine: main-pipeline
arena: true
arena_mode: generative_full_draft
generates_copy: true
consumes_upstream: true
expression_anchoring: false
protocols_required:
  - ARENA-PROTOCOL.md
  - ARENA-CORE-PROTOCOL.md
  - SPECIMEN-GUIDE.md
  - PERSONA-VOICE-LOADING-PROTOCOL.md
  - CONTEXT-RESERVOIR-TEMPLATE.md
  - pipeline-handoff-registry.md
  - PROSE-QUALITY-VERIFICATION.md
protocols_optional:
  - ACTIVE-RECITATION-PROTOCOL.md  # Only at tier Full/Standard after Skill 12
estimated_protocol_tokens: ~22,000
```

### Files to Modify

| File | Change |
|------|--------|
| `~system/SYSTEM-CORE.md` | Add "Protocol Loading" section referencing PROTOCOL-MANIFEST.md. Replace the current "Quick Reference: When to Read Which File" table with a pointer to the manifest. Keep The 7 Laws and core anti-degradation inline (priority 10-30 content stays in SYSTEM-CORE). |
| `~system/protocols/EXECUTION-GUARDRAILS.md` | Update Pre-Flight Checklist to reference manifest-driven loading instead of the current static table. |
| Every SKILL.md frontmatter | Add `protocols_required` list to YAML frontmatter (or create loading profile files). |

### Token Savings Estimate

| Scenario | Current Load | With Manifest | Savings |
|----------|-------------|---------------|---------|
| Non-Arena, non-copy skill (e.g., Skill 00) | ~15KB (SYSTEM-CORE) | ~5KB (priority 10-40 only) | ~10KB |
| Arena strategy skill (e.g., Skill 04) | ~23KB (SYSTEM-CORE + ARENA) | ~18KB (+ expression anchoring) | ~5KB |
| Copy generation skill (e.g., Skill 12) | ~30KB (SYSTEM-CORE + ARENA + SPECIMEN + protocols) | ~27KB (all needed, but no expression anchoring, no integrity check) | ~3KB |
| Ad engine skill (e.g., A05) | ~25KB (SYSTEM-CORE + AD-ENGINE + ARENA) | ~15KB (no main pipeline protocols) | ~10KB |

Biggest savings: branch engine skills and early foundation skills that currently load the full SYSTEM-CORE.

### Effort Estimate

- Protocol Manifest: ~2 hours
- Skill loading profiles (71 skills): ~3 hours (bulk-generate from frontmatter)
- Modify SYSTEM-CORE.md: ~1 hour
- Modify EXECUTION-GUARDRAILS.md: ~30 min
- Testing: ~1 hour
- **Total: ~7-8 hours**

### Dependencies

None, but pairs powerfully with Enhancement 4 (Adaptive Compaction).

---

## Enhancement 3: Subagent Arena

### OpenDev Concept

OpenDev uses subagent orchestration with:
- `message_history=None` — fresh context per invocation (no contamination)
- Filtered tool schemas — subagent only sees tools relevant to its task
- Specialized system prompts — per-subagent customization
- Parallel execution — multiple subagents run concurrently

### Current State in Marketing-OS

The Arena already identifies the architecture needed (`ARENA-PROTOCOL.md` §Agent Team Arena Execution) but labels it as future work. Current "Single-Context Mode" caps at B+ quality (A- with hardening). The Sequential Isolation Protocol uses file I/O as a contamination barrier, but the same model still generates all 7 voices sequentially in one context.

### What Changes

Implement the Agent Team structure using Claude Code's `Task` tool with `subagent_type` agents. Each persona becomes a subagent with fresh context, persona-specific instructions, and parallel execution.

### Architecture

```
ORCHESTRATOR (main Claude Code session)
│
├── Round 1:
│   ├── Task(Makepeace)  ─┐
│   ├── Task(Halbert)     │
│   ├── Task(Schwartz)    │── 7 subagents, parallel
│   ├── Task(Ogilvy)      │
│   ├── Task(Clemens)     │
│   ├── Task(Bencivenga)  │
│   └── Task(Architect)  ─┘
│   │
│   ├── Task(Critic) ← reads all 7 output files
│   │
│   ├── 7 Revision subagents (parallel, each gets their critique)
│   │
│   └── Task(Judge) ← scores all 7 revised outputs, produces Analytical Brief
│
├── Round 2: Same structure with Analytical Brief distributed
│
├── Task(Synthesizer) ← produces 2-3 hybrids from Round 2 (FINAL) outputs
│
└── HUMAN SELECTION (blocking)
```

### Files to Create

#### `~system/protocols/SUBAGENT-ARENA-PROTOCOL.md`

```markdown
# Subagent Arena Protocol

## Subagent Prompt Template (per persona)

Each persona subagent receives a prompt constructed from these components:

### 1. Identity Block (~500 tokens)
You are [PERSONA_NAME], one of 7 legendary copywriter personas competing in the
marketing-os Arena. You are generating [SKILL_NAME] for [PROJECT_NAME].

Your lens: [PERSONA_LENS from ARENA-PROTOCOL.md]
Your generation focus: [PERSONA_FOCUS from ARENA-PROTOCOL.md]

### 2. Voice Specimens (~2,000 tokens)
[Load from ~system/persona-specimens/[persona-name]/ — 3-5 specimens]

### 3. Upstream Context (~varies)
[All upstream packages required for this skill]
[Context reservoir if skill >= 10]
[Prior assembled prose if cascading]

### 4. Task Instructions (~1,000 tokens)
Read the skill spec: [skill path]
Generate a COMPLETE [output type] from the upstream packages.
This is NOT a variation of another persona's work.
This is YOUR independent generation from source material.

Write your output to: [output path]

### 5. Analytical Brief (Round 2 only, ~1,500 tokens)
[Analytical Brief from previous round]
Absorb the winner's TECHNIQUES but maintain YOUR voice.
Your voice_preservation_note: [from Analytical Brief]

### 6. Anti-Degradation (~500 tokens)
Minimum output size: [threshold]
Your output must be a COMPLETE [section/concept], not notes or an outline.
Quality minimum: 8.5 overall weighted score.

## File I/O Contract

### Persona Subagent Writes:
~outputs/[project]/[skill]/arena/round-[N]/[persona-name]-output.md

### Critic Subagent Reads:
~outputs/[project]/[skill]/arena/round-[N]/*.md (all 7 outputs)

### Critic Subagent Writes:
~outputs/[project]/[skill]/arena/round-[N]/critiques/[persona-name]-critique.md

### Judge Subagent Reads:
~outputs/[project]/[skill]/arena/round-[N]/*.md (revised outputs)
~outputs/[project]/[skill]/arena/round-[N]/critiques/*.md

### Judge Subagent Writes:
~outputs/[project]/[skill]/arena/round-[N]/scores.yaml
~outputs/[project]/[skill]/arena/round-[N]/learning-brief.md

## Orchestrator Pseudocode

```python
for round_num in [1, 2, 3]:

    # 1. Build persona prompts
    prompts = {}
    for persona in PERSONAS:
        prompts[persona] = build_prompt(
            persona=persona,
            skill=current_skill,
            upstream=upstream_packages,
            reservoir=context_reservoir,
            learning_brief=learning_brief if round_num > 1 else None,
            round_num=round_num
        )

    # 2. Launch 7 persona subagents IN PARALLEL
    #    Use Task tool with 7 concurrent calls
    persona_tasks = []
    for persona, prompt in prompts.items():
        task = Task(
            subagent_type="general-purpose",
            description=f"Arena {persona} Round {round_num}",
            prompt=prompt,
            model="sonnet"  # or opus for strategic skills
        )
        persona_tasks.append(task)

    # 3. Wait for all 7 to complete
    # 4. Launch Critic subagent
    critic_task = Task(
        subagent_type="general-purpose",
        description=f"Arena Critic Round {round_num}",
        prompt=build_critic_prompt(round_num),
        model="opus"  # Critic benefits from analytical depth
    )

    # 5. Distribute critiques, launch 7 revision subagents IN PARALLEL
    # 6. Launch Judge subagent
    judge_task = Task(
        subagent_type="general-purpose",
        description=f"Arena Judge Round {round_num}",
        prompt=build_judge_prompt(round_num),
        model="opus"
    )

    # 7. Extract Analytical Brief for next round
    learning_brief = read_file(f"arena/round-{round_num}/learning-brief.md")

# Post-Arena: Synthesizer
synthesizer_task = Task(
    subagent_type="general-purpose",
    description="Arena Synthesizer",
    prompt=build_synthesizer_prompt(),
    model="opus"
)

# Present 9-10 candidates to human
```

## Subagent Tool Restrictions

| Subagent Role | Allowed Tools | Denied Tools |
|---------------|---------------|--------------|
| Persona | Read, Write, Glob | Bash, WebSearch, WebFetch, Task |
| Critic | Read, Write, Glob, Grep | Bash, WebSearch, WebFetch, Task |
| Judge | Read, Write, Glob | Bash, WebSearch, WebFetch, Task |
| Synthesizer | Read, Write, Glob, Grep | Bash, WebSearch, WebFetch, Task |

## Parallel Execution Limits

- Maximum concurrent persona subagents: 7 (one per persona)
- Maximum concurrent revision subagents: 7
- Critic and Judge run sequentially (depend on persona outputs)
- Rounds run sequentially (Round 2 depends on Round 1 Analytical Brief)

## Contamination Prevention

Each subagent gets `message_history=None` — completely fresh context.
No subagent can read another persona's output until the Critic/Judge phase.
File paths are persona-specific — no accidental cross-reads during generation.

## Fallback: Single-Context Hardened Mode

If subagent infrastructure is unavailable or the operator prefers single-context:
- Revert to Sequential Isolation Protocol
- Apply Single-Context Hardening (4 personas, fresh voice samples, 5-gram overlap check)
- Quality ceiling: A- (vs. A+ with subagents)

## Token Budget Per Subagent

| Component | Tokens |
|-----------|--------|
| Identity + voice specimens | ~2,500 |
| Upstream packages | ~10,000-30,000 |
| Context reservoir | ~5,000 |
| Prior prose (if cascading) | ~5,000-15,000 |
| Skill spec + task instructions | ~2,000 |
| Analytical Brief (R2-R3) | ~1,500 |
| Anti-degradation | ~500 |
| **Total per subagent** | **~25,000-55,000** |

Well within any model's context window. Each persona gets FULL context without competing for space.
```

### Files to Modify

| File | Change |
|------|--------|
| `~system/ARENA-PROTOCOL.md` | Update "Agent Team Arena Execution" section from "future state" to "active protocol." Add reference to SUBAGENT-ARENA-PROTOCOL.md. Keep Single-Context Hardened Mode as fallback. |
| `~system/SESSION-ARCHITECTURE.md` | Update session duration estimates — subagent Arena is faster (parallel) but uses more total tokens. Add note about API cost implications. |
| `~system/SYSTEM-CORE.md` | Update Arena references to acknowledge subagent mode as primary. |

### Key Implementation Decisions

1. **Model choice for persona subagents:** Use Sonnet for generative skills (10-18) and Opus for strategic skills (03-08). Match the model to the cognitive task per Enhancement 5.

2. **Subagent type:** Use `general-purpose` with detailed prompts rather than specialized agent types. The prompt itself provides specialization.

3. **File-based communication:** All inter-subagent communication happens through files in `~outputs/[project]/[skill]/arena/`. No message passing between subagents.

4. **Human checkpoints:** The orchestrator (main session) presents candidates after all rounds + synthesis. Human selects as before.

### Effort Estimate

- Protocol file: ~2 hours
- Orchestrator prompt templates: ~3 hours
- Persona prompt builders (7 personas): ~3 hours
- Critic/Judge/Synthesizer prompt builders: ~2 hours
- Modify 3 existing files: ~1 hour
- Testing with 1 strategic + 1 generative skill: ~3 hours
- **Total: ~14-16 hours**

### Dependencies

Enhancement 5 (Model Routing) informs which model each subagent uses, but this can be implemented with a simple Opus/Sonnet split first and refined later.

---

## Enhancement 4: Adaptive Context Compaction

### OpenDev Concept

Five-stage progressive reduction as context fills:
1. Tool result summarization
2. Message deduplication
3. Observation truncation
4. History sampling
5. Last-resort episodic memory summarization

Key insight: Progressive degradation rather than abrupt cutoff. The system functions gracefully as resources exhaust.

### Current State in Marketing-OS

Hard zone boundaries (GREEN → YELLOW → ORANGE → RED → CRITICAL) with binary responses: "double MC-CHECK frequency" or "prepare session handoff." No progressive compaction within a zone. The context reservoir is a human-curated bridge between sessions — excellent but expensive to create.

The cascading prose pattern loads ALL prior prose, which grows linearly. By Skill 17, the model loads 7 prior prose files plus all upstream packages plus the context reservoir.

### What Changes

Add a 5-stage compaction protocol that progressively reduces context load as token count increases, applied within sessions to extend useful working range before a session break is needed.

### Files to Create

#### `~system/protocols/ADAPTIVE-COMPACTION-PROTOCOL.md`

```markdown
# Adaptive Context Compaction Protocol

## When to Apply

Compaction triggers based on context zone:
- GREEN (0-150K): No compaction. Full context.
- YELLOW (150K-200K): Stage 1 compaction.
- ORANGE (200K-500K): Stage 1-2 compaction.
- RED (500K-750K): Stage 1-3 compaction.
- CRITICAL (750K-1M): Stage 1-4 compaction. Stage 5 if still over budget.

## The 5 Stages

### Stage 1: Upstream Package Summarization (saves ~30-40%)
**Trigger:** YELLOW zone entry
**Action:** For upstream packages that have ALREADY been fully processed by Layer 0-1:
- Replace full packages with their Summary Handoff markdown equivalents
- Keep ONLY the fields actively referenced by the current skill
- Retain full packages for skills not yet executed

**What stays full:**
- Context reservoir (never compress — it's already curated)
- Current skill's immediate upstream package
- Campaign brief (small, high-value)

**What gets summarized:**
- Research package → executive summary + top quotes only
- Proof inventory → Tier 1 blocks only (drop Tier 2-3)
- Prior skill packages → summary handoff versions

**Implementation:**
```
IF token_zone >= YELLOW:
  FOR EACH upstream_package IN loaded_packages:
    IF current_skill does NOT directly consume this package:
      REPLACE with summary_handoff version
    ELIF current_skill.layer > 1 AND package already processed in Layer 0:
      REPLACE with summary_handoff version
```

### Stage 2: Prior Prose Windowing (saves ~20-30%)
**Trigger:** ORANGE zone entry
**Action:** For cascading prose files, apply a "window" that keeps:
- Full text of the immediately prior section (for voice continuity)
- Opening paragraph + closing paragraph of earlier sections
- Drop middle paragraphs of sections 3+ back

**Example at Skill 15 (Product Introduction):**
- Skill 14 prose (mechanism narrative): FULL (immediately prior)
- Skill 13 prose (root cause narrative): Opening ¶ + closing ¶
- Skill 12 prose (story): Opening ¶ + closing ¶
- Skill 11 prose (lead): Opening ¶ + closing ¶

**Implementation:**
```
IF token_zone >= ORANGE:
  sorted_prose = sort_by_skill_number(loaded_prose_files)
  FOR i, prose IN enumerate(sorted_prose):
    IF i == len(sorted_prose) - 1:  # Immediately prior
      KEEP full
    ELSE:
      KEEP first_paragraph(prose) + last_paragraph(prose)
      DROP middle paragraphs
```

### Stage 3: Context Reservoir Triage (saves ~15-20%)
**Trigger:** RED zone entry
**Action:** Reduce context reservoir to highest-value elements:
- Keep: Top 10 VOC quotes (from 25-40), Top 5 proof elements (from 10-15)
- Keep: All of Part 2 (Strategic Intelligence) — this is irreplaceable
- Drop: Lower-ranked quotes, Tier 2-3 proof elements, language pattern examples

**Implementation:**
```
IF token_zone >= RED:
  reservoir.voc_quotes = reservoir.voc_quotes[:10]  # Keep top 10
  reservoir.proof_elements = reservoir.proof_elements[:5]  # Keep top 5
  reservoir.language_patterns = reservoir.language_patterns[:3]  # Keep top 3
  # Part 2 stays FULL — never compress strategic intelligence
```

### Stage 4: Execution History Pruning (saves ~10-15%)
**Trigger:** RED zone (continued)
**Action:** Drop completed microskill execution logs from active context:
- Keep only the current layer's execution log
- Write prior layers' logs to files (already done per protocol)
- Remove checkpoint YAML content from context (it's in files)

**Implementation:**
```
IF token_zone >= RED:
  FOR EACH completed_layer IN [0, 1, ..., current_layer - 1]:
    VERIFY layer outputs exist as files
    DROP layer execution log from active context
    DROP layer checkpoint YAML from active context
```

### Stage 5: Emergency Micro-Reservoir (last resort)
**Trigger:** CRITICAL zone
**Action:** Replace the full context reservoir with a micro-version:
- 5 highest-resonance quotes
- Campaign thesis (1 sentence)
- Mechanism name + statement (2 sentences)
- Root cause expression (1 sentence)
- Counter-intuitive core (2 sentences)
- Total: ~1,500 tokens (from ~5,000)

**This stage should almost never fire.** If it does, a session break is strongly recommended immediately after the current skill completes.

## Compaction Verification

After each compaction stage, verify:
- [ ] Context reservoir Part 2 (Strategic Intelligence) is INTACT
- [ ] Current skill's upstream package is INTACT
- [ ] Immediately prior prose file is INTACT
- [ ] Campaign brief is INTACT
- [ ] No data needed for the CURRENT microskill was compacted

## Integration with Token Estimator

The token_estimator.py hook already tracks cumulative context.
Extend it to:
1. Detect zone transitions
2. Recommend specific compaction stage
3. Output compaction instructions as structured JSON:
   ```json
   {
     "type": "compaction_recommendation",
     "zone": "YELLOW",
     "stage": 1,
     "action": "Summarize upstream packages not directly consumed by current skill",
     "estimated_savings_tokens": 15000
   }
   ```

## Tier-Specific Compaction Rules

| Tier | Compaction Allowed? | Notes |
|------|-------------------|-------|
| Full | Stages 1-3 only | Stage 4-5 = mandatory session break instead |
| Standard | Stages 1-4 | Stage 5 = session break instead |
| Quick | All stages | Maximize single-session coverage |
```

### Files to Modify

| File | Change |
|------|--------|
| `~system/SYSTEM-CORE.md` | Update Context Zone Management to reference compaction stages per zone. Current zone responses say "double MC-CHECK" — add "apply Stage N compaction." |
| `~system/SESSION-ARCHITECTURE.md` | Update Context Loading table with "After Compaction" column showing reduced token estimates. Update Future State section — compaction partially addresses what larger windows would solve. |
| `~system/protocols/CONTEXT-RESERVOIR-TEMPLATE.md` | Add "Compaction Profiles" section defining Stage 3 (triage) and Stage 5 (micro-reservoir) versions. |
| `.hooks/validators/token_estimator.py` | Extend to output compaction recommendations at zone transitions. |

### Session Impact Estimate

| Session | Current Tokens | After Compaction (Stage 1-2) | Savings |
|---------|---------------|------------------------------|---------|
| 4 (Skills 10-13) | ~80-120K | ~65-95K | ~15-25K |
| 5 (Skills 14-17) | ~120-180K | ~85-130K | ~35-50K |
| 6 (Skills 18-20) | ~150-250K | ~100-170K | ~50-80K |

Session 5 is the biggest beneficiary — compaction could keep it in GREEN zone on Sonnet, eliminating the YELLOW→ORANGE transition.

### Effort Estimate

- Compaction protocol file: ~2 hours
- Token estimator extension: ~2 hours
- Modify 4 existing files: ~2 hours
- Testing with Session 5 simulation: ~2 hours
- **Total: ~8 hours**

### Dependencies

Enhancement 2 (Dynamic Protocol Loading) compounds savings — loading fewer protocols means less to compact.

---

## Enhancement 5: Workload-Specialized Model Routing

### OpenDev Concept

Five model roles — Normal, Thinking, Critique, Planning, VLM — each bound to the optimal model for that cognitive workflow. Configuration-driven, not code-driven. Cost optimization (fast tasks use cheaper models) and capability matching (complex reasoning uses premium models).

### Current State in Marketing-OS

Binary Opus/Sonnet split:
- Opus 4.6 for strategy (Skills 00-09)
- Sonnet 4.5 for copy (Skills 10-20)
- Branch engines: "default to Sonnet unless primarily analytical"

No per-layer or per-role routing within a skill.

### What Changes

Define 6 cognitive roles with model assignments. Each microskill, Arena role, and validation step maps to a role. This enables finer-grained cost/capability optimization.

### Files to Create

#### `~system/MODEL-ROUTING.md`

```markdown
# Model Routing — Workload-Specialized Assignment

## The 6 Cognitive Roles

| Role | Default Model | Fallback | Characteristics |
|------|---------------|----------|-----------------|
| **Strategy** | Opus 4.6 | — | Deep reasoning, analytical precision, scoring, classification |
| **Generation** | Sonnet 4.5 | — | Fluid writing, large context, fast copy production |
| **Critique** | Opus 4.6 | Sonnet 4.5 | Adversarial evaluation, weakness identification |
| **Validation** | Haiku 4.5 | Sonnet 4.5 | Schema checks, gate verification, threshold validation |
| **Planning** | Haiku 4.5 | Sonnet 4.5 | Upstream loading, file discovery, triage |
| **Visual** | Gemini (via MCP) | — | Image/video analysis, visual creative review |

## Role-to-Layer Mapping

| Layer | Cognitive Role | Model |
|-------|---------------|-------|
| Layer 0 (Foundation/Loading) | Planning | Haiku 4.5 |
| Layer 1 (Classification/Analysis) | Strategy | Opus 4.6 |
| Layer 2 (Generation/Drafting) | Generation | Sonnet 4.5 |
| Layer 2.5 (Arena - Competitors) | Generation (copy) / Strategy (strategic) | Sonnet / Opus |
| Layer 2.5 (Arena - Critic) | Critique | Opus 4.6 |
| Layer 2.5 (Arena - Judge) | Strategy | Opus 4.6 |
| Layer 2.6 (Synthesizer) | Strategy | Opus 4.6 |
| Layer 3 (Validation) | Validation | Haiku 4.5 |
| Layer 4 (Output Packaging) | Planning | Haiku 4.5 |

## Per-Skill Override Table

Some skills deviate from the default layer mapping:

| Skill | Layer | Override | Reason |
|-------|-------|----------|--------|
| 01 (Research) | Layer 2 | Strategy (Opus) | Research classification is analytical, not generative |
| 02 (Proof Inventory) | Layer 2 | Strategy (Opus) | Scoring and gap analysis is analytical |
| 09 (Campaign Brief) | Layer 2 | Strategy (Opus) | Synthesis of all foundation outputs requires deep reasoning |
| 10 (Headlines) | Layer 2 | Generation (Sonnet) | Creative generation |
| 19 (Assembly) | Layer 2 | Validation (Haiku) | Assembly is mostly mechanical — concatenation with coherence checks |
| 20 (Editorial) | All | Critique (Opus) | Fresh-context editorial benefits from analytical depth |
| A01 (Ad Intelligence) | Layer 2 | Strategy (Opus) | Competitive analysis is analytical |
| A10 (Pre-Launch Scoring) | Layer 2 | Strategy (Opus) | Predictive scoring |

## Arena Role Routing

| Arena Role | Model | Why |
|------------|-------|-----|
| Persona generators (strategic skills 03-08) | Opus 4.6 | Strategic concept generation needs depth |
| Persona generators (copy skills 10-18) | Sonnet 4.5 | Copy generation needs fluidity + large context |
| Critic | Opus 4.6 | Genuine weakness identification needs analytical depth |
| Judge / Scorer | Opus 4.6 | Precise multi-dimensional scoring |
| Synthesizer | Opus 4.6 | Micro-element decomposition needs precision |

KEY INSIGHT: The Critic and Judge should run on a DIFFERENT model than the generators
when possible. A Sonnet generator evaluated by an Opus critic produces better results
than Sonnet evaluating its own Sonnet output. Cross-model evaluation reduces
self-congratulatory scoring.

## Cost Optimization

| Role | Cost per 1M tokens (est.) | Usage Frequency |
|------|---------------------------|-----------------|
| Strategy (Opus) | $$$ | Medium (foundation + arena critic/judge) |
| Generation (Sonnet) | $$ | High (all copy generation) |
| Validation (Haiku) | $ | High (every gate, every layer transition) |
| Planning (Haiku) | $ | Medium (layer 0 and 4 per skill) |

Estimated savings vs. current Opus-for-everything-strategic approach:
- Layer 0 (Haiku vs. Opus): ~80% cost reduction on loading/validation
- Layer 3 (Haiku vs. Sonnet): ~70% cost reduction on gates
- Arena Critic (Opus vs. Sonnet): quality improvement, not cost savings

## Implementation Notes

- In Claude Code, model routing happens via the `model` parameter on Task tool calls
- For subagent Arena (Enhancement 3), each subagent specifies its model
- For single-context mode, model routing applies at session level (cannot switch mid-session)
- Haiku routing requires subagent delegation — main session stays on its assigned model
```

### Files to Modify

| File | Change |
|------|--------|
| `~system/SESSION-ARCHITECTURE.md` | Update Model Split section from binary (Opus/Sonnet) to 6-role routing table. Keep the session-level model assignments but add per-layer notes. |
| `~system/ARENA-PROTOCOL.md` | Add model assignment to each Arena role. Note cross-model evaluation benefit. |

### Effort Estimate

- MODEL-ROUTING.md: ~2 hours
- Modify 2 existing files: ~1 hour
- **Total: ~3 hours** (this is primarily a documentation/configuration change — actual routing happens through Enhancement 3's subagent calls)

### Dependencies

Enhancement 3 (Subagent Arena) enables per-role model routing. Without subagents, model routing is limited to session-level (current state).

---

## Enhancement 6: Dual-Agent Planning/Execution Separation

### OpenDev Concept

Dual-mode operation: Plan Mode uses read-only tools via a Planner subagent (no write operations); Normal Mode gets full read-write access. Triggered by explicit command or heuristic detection.

Key insight: Planning and execution are different cognitive tasks that benefit from different toolsets and reasoning modes.

### Current State in Marketing-OS

No planning/execution separation within a skill. Layer 0 (Foundation) does upstream loading and validation, which is planning-adjacent, but it runs in the same context as Layer 2 (Generation). The model loads upstream packages, reads them, and then immediately starts generating — no intermediate "here's what matters most" distillation.

### What Changes

Add a "Pre-Flight Planning" phase between Layer 0 and Layer 1 for copy generation skills (10-17). A planning subagent reads all upstream context and produces a focused "Execution Brief" — a compressed, prioritized version of what matters for this specific skill.

### Files to Create

#### `~system/protocols/SKILL-PREFLIGHT-PROTOCOL.md`

```markdown
# Skill Pre-Flight Planning Protocol

## When to Use

Pre-flight planning runs before Layer 1 for:
- Copy generation skills (10-17) — where upstream context is large
- Skills loading 4+ upstream packages
- Sessions in YELLOW zone or above

Pre-flight planning is OPTIONAL for:
- Foundation skills (00-09) — upstream context is small
- Quick tier — skip pre-flight to save time
- Skills loading fewer than 4 upstream packages

## The Pre-Flight Subagent

### Role
Read all upstream packages, context reservoir, and prior prose.
Produce an "Execution Brief" that distills what matters most for THIS specific skill.

### Tools Allowed
Read, Glob, Grep ONLY. No Write, no Edit, no Bash.
The planner READS. The executor WRITES.

### Subagent Prompt Template

```
You are a Pre-Flight Planner for marketing-os Skill [XX] ([SKILL_NAME]).

Your job: Read all upstream context and produce an Execution Brief that tells
the copy generator exactly what to focus on for this section.

## Read These Files (in order):
1. [skill]/SKILL.md — understand what this skill produces
2. Campaign brief: [path]
3. Context reservoir: [path]
4. Prior assembled prose: [paths — all prior sections]
5. Upstream packages: [paths — all consumed packages]

## Produce an Execution Brief with these sections:

### 1. Section Mission (2-3 sentences)
What this section must accomplish within the larger promotion.
What the reader has already experienced (from prior prose).
What emotional state they should be in when this section ends.

### 2. Top 5 Proof Elements for This Section
From the proof inventory and context reservoir, identify the 5 most
relevant proof elements for THIS section specifically. Include full details.

### 3. Voice Anchors (5-8 quotes)
From the context reservoir VOC quotes, select the 5-8 most relevant
for this section's emotional territory. These are the voice targets.

### 4. Threading Requirements
- Mechanism name: must appear [N] times naturally
- Root cause anchor: reference in [specific way]
- Prior section callbacks: [specific threads to continue]

### 5. Danger Zones
- What this section commonly gets wrong
- Which FSSIT candidates are most relevant here
- Which staleness zones to avoid (from expectation schema)

### 6. Token Budget Recommendation
Based on the upstream context size, recommend:
- Which upstream packages can be loaded in summary form
- Which must be loaded in full
- Estimated total token load for the executor

Output the Execution Brief to:
[output-path]/preflight-brief.md
```

## How the Executor Uses the Brief

The copy generation model receives:
1. The Execution Brief (focused, ~3-5KB)
2. Full text of immediately prior prose (for voice continuity)
3. Context reservoir (full — never compressed for the executor)
4. Current skill spec + microskill specs

The executor does NOT load raw upstream packages if the Pre-Flight Brief covers them.
This reduces the executor's context load by ~30-50%.

## Pre-Flight Output Validation

The Execution Brief must contain:
- [ ] All 6 sections present
- [ ] At least 5 proof elements with full details (not just names)
- [ ] At least 5 VOC quotes (exact text, not paraphrased)
- [ ] Mechanism name appears in Threading Requirements
- [ ] At least 2 danger zones identified
- [ ] Token budget recommendation present

If any section is missing, the executor loads raw upstream packages instead (fallback).

## Cost-Benefit

| Metric | Without Pre-Flight | With Pre-Flight |
|--------|-------------------|-----------------|
| Executor context load | ~80-120K | ~40-70K |
| Time to first generation | Faster (no planning phase) | +2-3 min (planning subagent) |
| Generation quality | Good (but executor may miss key proof) | Better (proof pre-selected for relevance) |
| Session break risk | Higher (fills context faster) | Lower (executor context is smaller) |

Pre-flight is most valuable for Skills 14-17 where upstream context is largest.
```

### Files to Modify

| File | Change |
|------|--------|
| Every copy skill SKILL.md (10-17) | Add optional Layer 0.5 "Pre-Flight Planning" between Layer 0 and Layer 1. Reference SKILL-PREFLIGHT-PROTOCOL.md. |
| `~system/SESSION-ARCHITECTURE.md` | Update Session 4/5 descriptions to include optional pre-flight phase. |

### Effort Estimate

- Protocol file: ~2 hours
- Modify 8 SKILL.md files: ~1 hour
- Modify SESSION-ARCHITECTURE.md: ~30 min
- Testing with 1 skill: ~1 hour
- **Total: ~4-5 hours**

### Dependencies

Enhancement 4 (Adaptive Compaction) compounds — pre-flight reduces context before compaction needs to kick in. Enhancement 5 (Model Routing) — use Haiku for the planner subagent.

---

## Enhancement 7: Doom-Loop and Convergence Detection

### OpenDev Concept

If the agent repeatedly calls the same tool with the same arguments, escalate to the user rather than loop. Iteration cap prevents runaway execution.

### Current State in Marketing-OS

No convergence detection. The Arena protocol mandates 2 rounds + audience evaluation, but doesn't detect when rounds stop producing value. The proportionality_check.py validator catches *score* clustering (>50% at minimums = gate-passing optimization) but not *output* convergence.

### What Changes

Add convergence detection at three levels: Arena persona convergence, round-over-round stagnation, and output repetition within a generation.

### Files to Create

#### `.hooks/validators/convergence_detector.py`

```python
# Convergence Detector — Three Detection Modes
#
# Mode 1: Persona Convergence
# - Compare 5-gram overlap between all persona pairs within a round
# - Flag if any 3+ personas share >40% 5-gram overlap
# - This indicates the model is generating variations, not independent voices
#
# Mode 2: Round Stagnation
# - Compare winner's score across rounds
# - Flag if Round N winner score - Round N-1 winner score < 0.2
# - AND if winning persona is the same across 2+ rounds
# - This indicates the third round isn't adding value
#
# Mode 3: Output Repetition
# - Within a single generation, detect paragraph-level repetition
# - Flag if any 3-sentence block appears twice (normalized, ignoring articles)
# - This indicates the model is looping within a single output
#
# Integration:
# - Fires on Write/Edit of arena output files
# - dispatch-validator.sh routes arena/ paths to this validator
# - Output format matches reminder_detector.py (structured JSON)
#
# Detection Thresholds:
PERSONA_OVERLAP_THRESHOLD = 0.40  # 40% 5-gram overlap
ROUND_IMPROVEMENT_MINIMUM = 0.2   # Minimum score improvement per round
REPETITION_BLOCK_SIZE = 3         # Sentences in a repetition block
#
# Response Actions:
# - Persona convergence → inject divergence reminder + re-read persona specimens
# - Round stagnation → notify human, offer to skip Round 2 (FINAL) for this skill
# - Output repetition → halt generation, re-read skill spec

def calculate_ngram_overlap(text_a: str, text_b: str, n: int = 5) -> float:
    """Calculate percentage of shared n-grams between two texts."""
    pass  # Implement: tokenize, build n-gram sets, calculate Jaccard similarity

def detect_persona_convergence(round_dir: str) -> list[dict]:
    """Read all persona outputs in a round dir, compare pairwise."""
    pass  # Implement: read all *-output.md files, run pairwise overlap

def detect_round_stagnation(arena_dir: str) -> Optional[dict]:
    """Compare scores across round dirs."""
    pass  # Implement: read scores.yaml from each round, compare winners

def detect_output_repetition(content: str) -> list[dict]:
    """Find repeated sentence blocks within a single output."""
    pass  # Implement: sliding window of 3-sentence blocks, hash comparison
```

#### `~system/protocols/CONVERGENCE-INTERVENTION-PROTOCOL.md`

```markdown
# Convergence Intervention Protocol

## Persona Convergence Intervention

When 3+ personas share >40% 5-gram overlap:

1. STOP the current round
2. Identify which personas converged
3. For each converged persona:
   a. Re-read their persona specimen files (fresh voice loading)
   b. Add a DIVERGENCE DIRECTIVE to their prompt:
      "Your output was too similar to [other persona].
       You are [PERSONA_NAME]. Your lens is [LENS].
       Generate from YOUR perspective, not a variation of someone else's."
4. Regenerate ONLY the converged personas
5. Re-run overlap check

If convergence persists after retry:
- In subagent mode: kill converged subagents, spawn fresh ones with stronger persona prompts
- In single-context mode: reduce to non-converging personas + Architect (minimum 4 unique voices)

## Round Stagnation Intervention

When Round N+1 winner score improves by less than 0.2:

1. Log the stagnation
2. Present to human:
   "Round [N+1] did not meaningfully improve on Round [N].
    Winner score: [N] = [X], [N+1] = [Y] (delta: [Z])
    Same winner: [Yes/No]
    Option A: Continue to Round [N+1] anyway (protocol requires 2 rounds + audience evaluation)
    Option B: Accept Round [N+1] results as final (human override)
    Option C: Inject a new constraint to force divergence"
3. If Option C: add a constraint like "the winning approach from Round [N] is now BANNED —
   all personas must find a fundamentally different approach"

## Output Repetition Intervention

When a 3-sentence block repeats within a single output:

1. HALT generation immediately
2. Flag the repeated block
3. Re-read the skill spec for output structure requirements
4. Regenerate from the point where repetition began
5. This is a degradation signal — trigger MC-CHECK
```

### Files to Modify

| File | Change |
|------|--------|
| `~system/ARENA-PROTOCOL.md` | Add "Convergence Detection" section after "Arena Context Management." Reference both new files. |
| `.hooks/dispatch-validator.sh` | Add routing for `convergence_detector.py` on writes to `arena/` paths. |
| `.hooks/README.md` | Document convergence_detector.py. |

### Effort Estimate

- convergence_detector.py: ~3 hours (5-gram overlap calculation, file parsing)
- Protocol file: ~1 hour
- Modify 3 existing files: ~1 hour
- Testing with Arena outputs: ~1 hour
- **Total: ~6 hours**

### Dependencies

Enhancement 1 (Event-Driven Reminders) — convergence detection is a specific type of event-driven reminder. Use the same JSON output format.

---

## Enhancement 8: Skill-Level Rollback via Shadow Snapshots

### OpenDev Concept

Per-operation shadow git snapshots enable rollback without disrupting main repository history. Every operation creates a checkpoint; rolling back restores the workspace to the pre-operation state.

### Current State in Marketing-OS

No rollback mechanism. If a skill produces bad output:
- Human manually identifies which files to delete
- Re-runs the skill from scratch
- Risk of orphaned outputs from the bad run contaminating downstream skills
- No way to know "what was the state before this skill ran?"

The vault uses git for versioning, but commits are manual and infrequent. There's no per-skill snapshot discipline.

### What Changes

Add automatic git snapshots of the `~outputs/[project]/` directory at two points: (1) before each skill starts (pre-skill snapshot) and (2) after each skill completes successfully (post-skill snapshot). Rollback to any snapshot via a simple command.

### Files to Create

#### `~system/protocols/SKILL-ROLLBACK-PROTOCOL.md`

```markdown
# Skill-Level Rollback Protocol

## Snapshot Points

### Pre-Skill Snapshot
**When:** After Layer 0 completes (upstream loaded, validated) but BEFORE Layer 1 begins
**What:** git stash-like snapshot of ~outputs/[project]/
**Label:** `pre-skill-[XX]-[name]`
**Purpose:** Enables clean rollback to "before this skill touched anything"

### Post-Skill Snapshot
**When:** After Layer 4 completes (all outputs written, execution log closed)
**What:** Commit of ~outputs/[project]/ with descriptive message
**Label:** `post-skill-[XX]-[name]`
**Purpose:** Marks a known-good state to return to

## Implementation via Git Tags

Use lightweight git tags on the outputs directory. Since the vault is already a git repo,
this integrates naturally.

### Snapshot Command
```bash
# Pre-skill snapshot
git add ~outputs/[project]/
git commit -m "snapshot: pre-skill-[XX]-[name] — [project]" --allow-empty
git tag "snapshot/[project]/pre-[XX]-[name]"

# Post-skill snapshot
git add ~outputs/[project]/
git commit -m "snapshot: post-skill-[XX]-[name] — [project]" --allow-empty
git tag "snapshot/[project]/post-[XX]-[name]"
```

### Rollback Command
```bash
# Rollback to before skill XX ran
git checkout "snapshot/[project]/pre-[XX]-[name]" -- ~outputs/[project]/

# Rollback to after skill XX completed (revert a later skill's damage)
git checkout "snapshot/[project]/post-[XX]-[name]" -- ~outputs/[project]/
```

## When to Use Rollback

| Scenario | Rollback To |
|----------|-------------|
| Skill produced bad output, want to re-run | pre-skill-[XX] |
| Later skill corrupted earlier outputs | post-skill-[XX] (the last good state) |
| Arena produced contaminated results | pre-skill-[XX] (re-run entire skill) |
| Human rejects skill output at checkpoint | pre-skill-[XX] |
| Foundation Integrity Check flags drift | post-skill-[last-good] |

## Automated Snapshot Hook

Add to `.hooks/` a hook that fires on skill boundaries:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": ".hooks/dispatch-validator.sh"
      }
    ],
    "Stop": [
      {
        "command": ".hooks/dispatch-validator.sh --final-check"
      }
    ]
  }
}
```

Since hooks can't detect "skill start" vs. "skill end" automatically, the AGENT must
explicitly call the snapshot at Layer 0 completion and Layer 4 completion.

Add to EXECUTION-GUARDRAILS.md Pre-Flight Checklist:
- [ ] Pre-skill snapshot created (tag: snapshot/[project]/pre-[XX]-[name])

Add to Post-Execution Verification:
- [ ] Post-skill snapshot created (tag: snapshot/[project]/post-[XX]-[name])

## Cleanup

Snapshot tags accumulate. Clean up completed projects:
```bash
# List all snapshots for a project
git tag -l "snapshot/[project]/*"

# Delete all snapshots for a completed project
git tag -l "snapshot/[project]/*" | xargs git tag -d
```

## Interaction with Vault Git

Snapshots use the vault's existing git repo. They create small commits and lightweight tags.
This does NOT interfere with normal vault commits — snapshot commits are just additional
history entries that can be ignored or cleaned up.

If the vault has uncommitted changes outside ~outputs/, the snapshot commits only stage
files within ~outputs/[project]/. Use `git add ~outputs/[project]/` (specific path),
never `git add -A`.
```

### Files to Modify

| File | Change |
|------|--------|
| `~system/protocols/EXECUTION-GUARDRAILS.md` | Add snapshot checkpoints to Pre-Flight and Post-Execution checklists. |
| `~system/SYSTEM-CORE.md` | Add brief mention of rollback capability in Session Continuity Protocol. |

### Effort Estimate

- Protocol file: ~1.5 hours
- Modify 2 existing files: ~30 min
- Testing with 2 skills: ~1 hour
- **Total: ~3 hours**

### Dependencies

None — uses existing git infrastructure.

---

## Enhancement 9: Lazy MCP Tool Discovery

### OpenDev Concept

Tools from MCP servers are discovered only when explicitly needed via a `search_tools` call. This prevents prompt bloat from enumerating all possible external tools at session start. "Self-healing indexes tolerate stale metadata."

### Current State in Marketing-OS

MCP tools (Gemini media generation, Firecrawl scraping, Apify actors, ElevenLabs audio) are available to all sessions. When Claude Code loads, it includes schemas for ALL configured MCP servers in the system prompt — regardless of whether the current skill uses them.

This means Skill 03 (Root Cause) carries the schema definitions for Gemini image generation, ElevenLabs TTS, and Firecrawl scraping — none of which it uses.

### What Changes

Document which skills use which MCP tools and add loading guidance to the Protocol Manifest (Enhancement 2). In Claude Code, this is implemented via the `ToolSearch` tool — deferred tools are only loaded when discovered via search.

### Files to Create

#### `~system/MCP-TOOL-REGISTRY.md`

```markdown
# MCP Tool Registry — Per-Skill Tool Requirements

## Tool-to-Skill Mapping

### Gemini Media (Image/Video Generation)
**Skills that use it:** A05 (Visual Direction), A08 (Visual/Video Production)
**Tools:**
- gemini-generate-image (Nano Banana 2 / gemini-3.1-flash-image-preview)
- gemini-generate-video (Veo 3.1)
- gemini-analyze-image (visual review)
- gemini-start-image-edit, gemini-continue-image-edit, gemini-end-image-edit
**Load via:** `ToolSearch("gemini image")` or `ToolSearch("gemini video")` at A05/A08 Layer 0

### ElevenLabs Audio
**Skills that use it:** A08 (Visual/Video Production)
**Tools:**
- ElevenLabs Voice (TTS, voice cloning)
- ElevenLabs Music (text-to-music)
- ElevenLabs SFX (text-to-SFX)
**Load via:** `ToolSearch("elevenlabs")` at A08 Layer 0

### Firecrawl (Web Scraping)
**Skills that use it:** A01 (Ad Intelligence), S09 (Organic Intelligence), 01 (Research)
**Tools:**
- firecrawl_scrape (single page)
- firecrawl_crawl (multi-page)
- firecrawl_search (search + scrape)
- firecrawl_extract (structured extraction)
**Load via:** `ToolSearch("firecrawl")` at A01/S09/01 Layer 0

### Apify Actors
**Skills that use it:** A01 (Ad Intelligence — Facebook Ad Library), S09 (Organic Intelligence)
**Tools:**
- search-actors (find relevant actors)
- call-actor (run an actor)
- get-actor-output (retrieve results)
**Load via:** `ToolSearch("apify")` at A01/S09 Layer 0

### Notion Integration
**Skills that use it:** None in pipeline (COO agent only)
**Tools:** notion-* tools
**Load via:** Never load during marketing-os pipeline execution

### Google Drive
**Skills that use it:** Research (01) for source material access
**Tools:** readGoogleDoc, getGoogleSheetContent, search
**Load via:** `ToolSearch("google drive read")` at Skill 01 Layer 0

## Skills That Need NO MCP Tools

The majority of skills (03-09, 10-20, E0-E4, U0-U5) use NO MCP tools.
These skills should NOT trigger any ToolSearch calls.

| Engine | Skills with MCP Tools | Skills WITHOUT |
|--------|----------------------|----------------|
| Foundation (00-09) | 01 (Research) | 00, 02-09 |
| Long-form (10-20) | None | 10-20 |
| Ads (A01-A12) | A01, A05, A08 | A02-A04, A06-A07, A09-A12 |
| Email (E0-E4) | None | E0-E4 |
| Organic (S01-S24) | S09 | S01-S08, S10-S24 |
| Upsell (U0-U5) | None | U0-U5 |

## Token Savings

MCP tool schemas are typically 500-2000 tokens each.
With 20+ MCP tools configured, that's ~10-40K tokens of schema in every session.

For the 60+ skills that don't use MCP tools, this is pure waste.

## Implementation

This is primarily a DOCUMENTATION enhancement for marketing-os.
The actual lazy loading mechanism is Claude Code's built-in ToolSearch tool.

The implementation is:
1. Add "MCP Tools Required" field to each skill's loading profile (Enhancement 2)
2. In skill Layer 0, ONLY call ToolSearch if the skill's profile lists required MCP tools
3. Skills without MCP tool requirements skip ToolSearch entirely
```

### Files to Modify

| File | Change |
|------|--------|
| `~system/PROTOCOL-MANIFEST.md` (from Enhancement 2) | Add MCP tool loading as a conditional section at priority 98 (loaded last, only when needed). |
| Ad Engine SKILL.md files (A01, A05, A08) | Add Layer 0 step: "Load required MCP tools via ToolSearch" |
| Skill 01 SKILL.md | Add Layer 0 step for Firecrawl/Google Drive if using web research |
| Organic S09 SKILL.md | Add Layer 0 step for Firecrawl/Apify |

### Effort Estimate

- MCP-TOOL-REGISTRY.md: ~1 hour
- Modify 5-6 SKILL.md files: ~1 hour
- Update PROTOCOL-MANIFEST.md: ~30 min
- **Total: ~2.5 hours**

### Dependencies

Enhancement 2 (Dynamic Protocol Loading) — the MCP tool registry integrates into the Protocol Manifest.

---

## Dependency Map

```
Enhancement 1 (Event-Driven Reminders)
    └── Enhancement 7 (Convergence Detection) depends on reminder format

Enhancement 2 (Dynamic Protocol Loading)
    ├── Enhancement 9 (Lazy MCP) integrates into Protocol Manifest
    └── Enhancement 4 (Adaptive Compaction) compounds savings

Enhancement 3 (Subagent Arena)
    ├── Enhancement 5 (Model Routing) informs subagent model selection
    └── Enhancement 7 (Convergence Detection) validates subagent outputs

Enhancement 4 (Adaptive Compaction)
    └── Enhancement 6 (Pre-Flight Planning) compounds by reducing executor context

Enhancement 5 (Model Routing)
    └── Enhancement 3 (Subagent Arena) enables per-role routing

Enhancement 6 (Pre-Flight Planning)
    └── Enhancement 5 (Model Routing) assigns Haiku to planner

Enhancement 7 (Convergence Detection)
    └── Enhancement 1 (Event-Driven Reminders) uses same format

Enhancement 8 (Skill Rollback)
    └── No dependencies

Enhancement 9 (Lazy MCP)
    └── Enhancement 2 (Dynamic Protocol Loading) provides manifest
```

---

## Implementation Sequence

### Phase 1: Foundation (Implement First)
| # | Enhancement | Effort | Impact |
|---|-------------|--------|--------|
| 1 | Event-Driven System Reminders | ~5-6h | High — immediate quality improvement |
| 8 | Skill-Level Rollback | ~3h | Medium — safety net for all subsequent work |

### Phase 2: Optimization
| # | Enhancement | Effort | Impact |
|---|-------------|--------|--------|
| 2 | Dynamic Protocol Loading | ~7-8h | High — reduces token overhead across all skills |
| 9 | Lazy MCP Tool Discovery | ~2.5h | Medium — saves tokens in non-MCP skills |

### Phase 3: Quality Ceiling
| # | Enhancement | Effort | Impact |
|---|-------------|--------|--------|
| 5 | Model Routing | ~3h | Medium — cost optimization + quality matching |
| 3 | Subagent Arena | ~14-16h | Very High — the biggest quality unlock |
| 7 | Convergence Detection | ~6h | High — validates Arena output quality |

### Phase 4: Session Extension
| # | Enhancement | Effort | Impact |
|---|-------------|--------|--------|
| 4 | Adaptive Context Compaction | ~8h | High — extends session working range |
| 6 | Pre-Flight Planning | ~4-5h | Medium — reduces executor context load |

### Total Estimated Effort: ~53-58 hours

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial creation. Nine enhancements from OpenDev paper (arXiv:2603.05344v2) mapped to marketing-os architecture. |
