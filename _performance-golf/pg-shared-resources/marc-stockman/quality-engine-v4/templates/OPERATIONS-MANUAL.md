# Operations Manual — Template
**Quality Engine v4** | Component: Template
**Purpose:** Complete reference for anyone running work through your system — no prior system knowledge required
**Instructions:** Copy this file into your system and fill in the [PLACEHOLDERS]

---

## TABLE OF CONTENTS

- [Part 1: System Overview](#part-1-system-overview)
- [Part 2: Starting a Project](#part-2-starting-a-project)
- [Part 3: Running Foundation Phases](#part-3-running-foundation-phases)
- [Part 4: Building the Context Reservoir](#part-4-building-the-context-reservoir)
- [Part 5: Running Generation Phases](#part-5-running-generation-phases)
- [Part 6: Branching to Other Engines](#part-6-branching-to-other-engines)
- [Part 7: Session Management](#part-7-session-management)
- [Part 8: Specific Scenarios](#part-8-specific-scenarios)
- [Part 9: Edge Cases & Troubleshooting](#part-9-edge-cases--troubleshooting)
- [Part 10: Quick Reference](#part-10-quick-reference)
- [Part 11: Verification Architecture](#part-11-verification-architecture)
- [Part 12: Automated Validation System](#part-12-automated-validation-system)

---

## PART 1: SYSTEM OVERVIEW

### What [SYSTEM_NAME] Is

[SYSTEM_NAME] is a system of [N] specialized skills/phases that guide AI through every step of [WHAT IT PRODUCES]. Each skill has precise instructions, quality gates, and handoff protocols.

### The Engines

| Engine | Skills/Phases | What It Produces |
|--------|--------------|-----------------|
| **[ENGINE_1]** | [SKILL_RANGE] | [OUTPUTS] |
| **[ENGINE_2]** | [SKILL_RANGE] | [OUTPUTS] |
| **[ENGINE_3]** | [SKILL_RANGE] | [OUTPUTS] |

### The Pipeline Flow

```
[ENGINE_1] ([SKILL_RANGE]) — runs ONCE per [UNIT_OF_WORK]
    |
    Creates: [LIST OF FOUNDATION OUTPUTS]
    |
    Human creates CONTEXT RESERVOIR (optional)
    |
[ENGINE_2] ([SKILL_RANGE]) — produces [PRIMARY OUTPUT]
    |
BRANCH -> [ENGINE_3] — uses foundation outputs for [PURPOSE]
BRANCH -> [ENGINE_4] — uses foundation outputs for [PURPOSE]
```

**Key insight:** [ENGINE_1] runs ONCE. Everything branches from it. If you are working on [BRANCH_WORK] for an existing project that already has foundation work done, you start from the branch — not from scratch.

### The Model Tiers

| Tier | Used For | Why |
|------|----------|-----|
| **Tier 1 (Deep Reasoning)** | [PHASES] | [REASON — e.g., Deep analytical reasoning, scoring, evaluating] |
| **Tier 2 (Generation)** | [PHASES] | [REASON — e.g., Fluid writing, large context window] |

---

## PART 1.5: CHOOSING YOUR EFFORT TIER

Before starting a project, decide which effort tier to use. The tier controls exploration depth — quality thresholds are the same across all tiers.

### The Three Tiers

| Tier | Best For | Competitive Evaluation | Sessions | Est. Cost |
|------|----------|----------------------|----------|-----------|
| **Full** | Flagship work, high-stakes projects | [FULL_SPEC] | [N] | [RANGE] |
| **Standard** | Regular work (DEFAULT) | [STANDARD_SPEC] | [N] | [RANGE] |
| **Quick** | Internal drafts, explorations | None | [N] | [RANGE] |

### How to Set the Tier

Tell the agent at session start: `"Tier: Full"` or `"Tier: Quick"`. Default is Standard.

---

## PART 2: STARTING A PROJECT

### Step 1: Assign a Project Code

Every project gets a short code. Format: 2-4 uppercase letters + optional number.

**Examples:** `[CODE_1]`, `[CODE_2]`, `[CODE_3]`

### Step 2: Create the Output Folder

```
outputs/[project-code]/
```

All skill outputs go here. Structure documented in `OUTPUT-STRUCTURE.md`.

### Step 3: Gather Raw Inputs

Before running any skills, collect:
- [INPUT_TYPE_1] — [DESCRIPTION]
- [INPUT_TYPE_2] — [DESCRIPTION]
- [INPUT_TYPE_3] — [DESCRIPTION]
- [INPUT_TYPE_4] — [DESCRIPTION]

### Step 4: Determine Your Starting Point

| If you have... | Start at... |
|----------------|-------------|
| Nothing — new project, no prior work | [FIRST_SKILL] |
| Foundation done, need generation | [FIRST_GENERATION_SKILL] — load foundation outputs |
| Foundation done, need [BRANCH] | [BRANCH_ENTRY_SKILL] — load foundation outputs |
| Everything done | Final human review |

---

## PART 3: RUNNING FOUNDATION PHASES

### Session 1: [NAME]
**Model Tier:** [TIER]
**Skills:** [LIST]
**Input:** [RAW_INPUTS]

**What happens:**
1. [STEP_1]
2. [STEP_2]
3. [STEP_3]

**Human checkpoint:** [WHAT_TO_REVIEW]
**Output:** [FILES]

<!-- Repeat for each foundation session -->

---

## PART 4: BUILDING THE CONTEXT RESERVOIR

### What It Is

The context reservoir is a human-curated document that captures the most valuable intelligence from foundation phases. It preserves raw material and analytical reasoning that handoff packages compress away.

### When to Build It

After ALL foundation phases are complete. Before any generation phases start.

### How to Build It

1. Open a new session with your reasoning model
2. Load all foundation outputs
3. Extract and organize:
   - [CATEGORY_1] — [WHAT_TO_EXTRACT]
   - [CATEGORY_2] — [WHAT_TO_EXTRACT]
   - [CATEGORY_3] — [WHAT_TO_EXTRACT]
   - [CATEGORY_4] — [WHAT_TO_EXTRACT]
4. Review and curate — remove anything that doesn't directly help generation
5. Save as `outputs/[project-code]/context-reservoir.md`

---

## PART 5: RUNNING GENERATION PHASES

### Session [N]: [NAME]
**Model Tier:** [TIER]
**Skills:** [LIST]

At the start of this session, load:
- All foundation packages from `outputs/[project-code]/`
- The context reservoir
- The skill instruction files

**Important:** Each skill saves TWO files:
1. `[section]-package.json` — structured metadata and handoff data
2. `[section]-assembled-output.md` — the actual generated content

The output file is what the NEXT skill reads for continuity.

<!-- Repeat for each generation session -->

---

## PART 6: BRANCHING TO OTHER ENGINES

### The Branch Point

After foundation phases are complete, you can branch to ANY engine — not just the primary. Foundation outputs feed all engines equally.

```
Foundation
    +-- [ENGINE_A] — [PURPOSE]
    +-- [ENGINE_B] — [PURPOSE]
    +-- [ENGINE_C] — [PURPOSE]
```

### Running Multiple Branches in Parallel

You can run branches simultaneously — they all draw from the same foundation outputs. Each branch has its own session and loads foundation packages independently.

---

## PART 7: SESSION MANAGEMENT

### Key Principles

1. **Each session starts fresh.** The model does not remember previous sessions. Everything must be loaded explicitly via files.
2. **Output files are the connective tissue.** What travels between sessions is what is saved in `outputs/[project-code]/`.
3. **The context reservoir bridges the gap.** It carries the analytical intelligence that would otherwise be lost.
4. **Prior output prevents the "stitched" feeling.** Each generation skill reads actual output from its predecessor.

### Starting a New Session

```
1. Identify which skills you are running
2. Determine which model tier to use (see SESSION-ARCHITECTURE.md)
3. Load the skill instruction files
4. Load all required upstream packages
5. Load the context reservoir (for generation sessions)
6. Load prior output (if continuing generation)
7. Confirm all inputs are present
8. Run the skill(s)
9. Save outputs
```

### When Sessions End Mid-Skill

If a session runs out of context or needs to be interrupted:
1. Save whatever outputs have been generated so far
2. Note where you stopped (which skill, which phase)
3. Start a new session
4. Load all the same inputs plus any outputs from the interrupted session
5. Tell the model where you left off and what still needs to be done

---

## PART 8: SPECIFIC SCENARIOS

### Scenario 1: [PERSONA] Joins Mid-Stream

**Context:** [PERSONA] is joining a project mid-stream with no prior context.

**Steps:**
1. Find the project code
2. Open the output folder: `outputs/[code]/`
3. Read these files IN ORDER:
   - `[STRATEGIC_SUMMARY]` — what we are doing and why
   - `context-reservoir.md` — curated intelligence
   - `[ASSEMBLED_OUTPUT]` — generated content (if it exists)
4. Determine what needs to happen next based on which outputs exist

### Scenario 2: Running a Full Pipeline

**Steps:**
1. Assign project code
2. Create output folder
3. Gather raw inputs
4. **Session 1** ([TIER]): Run [FOUNDATION_SKILLS_1]
5. **Session 2** ([TIER]): Run [FOUNDATION_SKILLS_2]
6. **Build context reservoir**
7. **Session 3** ([TIER]): Run [GENERATION_SKILLS_1]
8. **Session 4** ([TIER]): Run [GENERATION_SKILLS_2]
9. Final human review

<!-- Add scenarios specific to your system -->

---

## PART 9: EDGE CASES & TROUBLESHOOTING

### "The output feels like separate documents stitched together"

**Cause:** Generation skills did not load prior section output. Each section was produced in isolation.
**Fix:** Ensure each skill loads the assembled output from its predecessor.

### "The same concept is explained multiple times"

**Cause:** Sequential phases each independently explain the same concept.
**Fix:** Each skill loads prior output and is instructed to ASSUME the reader absorbed previous sections.

### "I cannot find the outputs"

**Check:** Are they in `outputs/[project-code]/`? If the project predates the standardized structure, they may be in skill-specific directories.

---

## PART 10: QUICK REFERENCE

### File Reference

| File | What It Is | When to Read |
|------|-----------|--------------|
| `SESSION-ARCHITECTURE.md` | Session groups, model assignments, context loading | When planning session structure |
| `OUTPUT-STRUCTURE.md` | Folder structure and project codes | When saving or finding outputs |
| `OPERATIONS-MANUAL.md` | This file — complete guide | When starting or onboarding |
| `PROTOCOL-MANIFEST.md` | What loads when | When debugging protocol loading |

### Skill Quick Reference

| Skill | Name | What It Produces | Required Before |
|-------|------|-----------------|-----------------|
| [ID] | [NAME] | [OUTPUTS] | [DEPENDENCIES] |

<!-- Fill in your full skill/phase table -->

---

## PART 11: VERIFICATION ARCHITECTURE

### Layer 2: Scoped Verification (Meaning-Level Checks)

In addition to automated validation hooks (Layer 1), include a Layer 2 verification system that checks **meaning**, not just structure. At critical handoff points, a fresh-context verification step loads only the output and 3-5 specific criteria, then answers binary questions with evidence.

**Key verification points:**
- [VERIFICATION_POINT_1] — [WHAT_IT_CHECKS]
- [VERIFICATION_POINT_2] — [WHAT_IT_CHECKS]
- [VERIFICATION_POINT_3] — [WHAT_IT_CHECKS]

**Tier depth:** Full = all checks. Standard = [SUBSET]. Quick = Layer 1 hooks only.

---

## PART 12: AUTOMATED VALIDATION SYSTEM (Layer 1)

### What It Is

[SYSTEM_NAME] includes an automated validation system built on AI tool hooks. When the agent writes any file, validators fire automatically and inject feedback into the agent's context. **No human action is required.**

### What Gets Validated

| Validator | Checks | Fires When |
|-----------|--------|-----------|
| **Gate Validator** | Forbidden checkpoint statuses | Checkpoint file written |
| **Schema Validator** | Required fields per handoff registry | Package file written |
| **Token Estimator** | Cumulative context load, cost zone | Any file written |
| **Fact Change Validator** | Stale upstream values | Output file written |
| **Forbidden Status Validator** | Invented pass/fail variants | Any status file written |

### How It Works

1. Agent writes a file
2. PostToolUse hook fires the dispatcher
3. Dispatcher routes to appropriate validator(s) based on file path patterns
4. Validator returns structured feedback
5. Agent sees the feedback and can self-correct

### The Stop Hook

When the agent tries to finish, a final comprehensive validation runs. If critical failures are found, the Stop hook **blocks the agent from completing** (exit code 2). The agent must fix the issues before it can stop.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | [DATE] | Initial creation from Quality Engine v4 template. |
