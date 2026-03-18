# Session Architecture — Template
**Quality Engine v4** | Component: Template
**Purpose:** Define how your pipeline splits across sessions and which model capability tier runs each phase
**Instructions:** Copy this file into your system and fill in the [PLACEHOLDERS]

---

## TABLE OF CONTENTS

- [Model Split](#model-split)
- [Session Groups](#session-groups)
- [Context Loading by Session](#context-loading-by-session)
- [Session Transitions](#session-transitions)
- [Tier-Adjusted Session Architecture](#tier-adjusted-session-architecture)
- [Future State](#future-state)

---

## MODEL SPLIT

Assign model capability tiers based on the cognitive demands of each phase. Use capability levels instead of specific model names so the architecture survives model upgrades.

### Capability Tiers

| Tier | Cognitive Profile | Typical Assignment |
|------|------------------|--------------------|
| **Tier 1 — Deep Reasoning** | Analytical precision, strategic synthesis, multi-dimensional scoring | [YOUR_REASONING_MODEL] |
| **Tier 2 — Generation** | Fluid generation, large context capacity, fast output | [YOUR_GENERATION_MODEL] |
| **Either** | Tasks that don't strongly favor one profile | Default to Tier 2 unless primarily analytical |

### [PIPELINE_NAME] — Tier 1 (Deep Reasoning)

**Context Window:** [SIZE]
**Use For:**
- [SKILL/PHASE]: [WHY IT NEEDS DEEP REASONING]
- [SKILL/PHASE]: [WHY IT NEEDS DEEP REASONING]
- [SKILL/PHASE]: [WHY IT NEEDS DEEP REASONING]

**Why Tier 1:** [EXPLAIN — e.g., "Foundation skills require deep analytical reasoning — scoring N candidates across M dimensions, calculating schema distances, evaluating resonance. These are REASONING tasks, not generation tasks."]

### [PIPELINE_NAME] — Tier 2 (Generation)

**Context Window:** [SIZE]
**Use For:**
- [SKILL/PHASE]: [WHY IT NEEDS GENERATION CAPACITY]
- [SKILL/PHASE]: [WHY IT NEEDS GENERATION CAPACITY]

**Why Tier 2:** [EXPLAIN — e.g., "Copy generation benefits from the larger context window. The writer sees all upstream data, prior output, and full instructions simultaneously. No compression needed."]

---

## SESSION GROUPS

Define each session: what runs, what loads, what it produces, and where the human stops to review.

### Session 1: [NAME]
**Model Tier:** [Tier 1 / Tier 2]
**Skills/Phases:** [LIST]
**Duration:** [GUIDANCE]
**Outputs:** [LIST OF OUTPUT FILES]
**Human Checkpoint:** [WHAT THE HUMAN REVIEWS BEFORE PROCEEDING]

### Session 2: [NAME]
**Model Tier:** [Tier 1 / Tier 2]
**Skills/Phases:** [LIST]
**Load:** [UPSTREAM OUTPUTS FROM PRIOR SESSIONS]
**Outputs:** [LIST OF OUTPUT FILES]
**Human Checkpoints:**
- After [PHASE]: [WHAT TO REVIEW]
- After [PHASE]: [WHAT TO REVIEW]

### Between Sessions [N] and [N+1]: [BRIDGE ACTIVITY]
**Model Tier:** [ANY]
**Action:** [DESCRIBE — e.g., "Build context reservoir from all foundation outputs"]
**Output:** [FILE]
**Human Review:** [WHY THIS IS THE MOST IMPORTANT HUMAN TOUCHPOINT]

<!-- Copy and extend for as many sessions as your pipeline needs -->

---

## CONTEXT LOADING BY SESSION

### What Each Session Loads

| Session | Upstream Packages | Context Reservoir | Prior Output | Est. Token Load | Zone |
|---------|------------------|-------------------|--------------|-----------------|------|
| 1 | None | No | No | ~[N]K | GREEN |
| 2 | Session 1 outputs | No | No | ~[N]K | GREEN |
| [N] | Everything | Yes | Everything | ~[N]K | [ZONE] |

**Zone Definitions:**

| Zone | Token Range | Meaning |
|------|------------|---------|
| GREEN | 0 — [THRESHOLD_1] | Within budget, optimal quality |
| YELLOW | [THRESHOLD_1] — [THRESHOLD_2] | Approaching cost/quality boundary |
| ORANGE | [THRESHOLD_2] — [THRESHOLD_3] | Premium pricing or quality risk |
| RED | [THRESHOLD_3] — [THRESHOLD_4] | Significant risk, prepare session break |
| CRITICAL | [THRESHOLD_4]+ | Approaching limit, halt recommended |

### The Cascading Output Pattern

When sessions generate sequential output, each phase loads the output from its predecessor to maintain continuity:

```
Phase A → produces output-A → saves output-A.md
Phase B → loads output-A → produces output-B → saves output-B.md
Phase C → loads output-B → produces output-C → saves output-C.md
```

This ensures each phase reads what came before and maintains voice/logic continuity.

---

## SESSION TRANSITIONS

### What Travels Between Sessions

Between any two sessions, the following persist via the output folder:
1. **Structured packages** (`.json` / `.yaml`) — metadata, scores, handoff data
2. **Assembled output** (`.md`) — actual generated content
3. **Context reservoir** (if applicable) — curated analytical intelligence
4. **Reasoning captures** — selection rationale from competitive evaluation phases
5. **Issue log** — cumulative incident record across all sessions
6. **Learning log** — captured learnings with severity classification

### What Does NOT Travel

- The full conversation context (session memory)
- Extended thinking chains
- Intermediate drafts revised within a session
- Real-time human feedback given during a session

### Session Start Protocol

At the start of each session:
1. Load the skill/phase instruction file(s) for the session
2. Load all required upstream packages per the loading table above
3. Load the context reservoir (if applicable)
4. Load prior output files (for sequential phases)
5. Check the issue log for prior issues affecting current phases
6. Confirm all required inputs are present before generating

---

## TIER-ADJUSTED SESSION ARCHITECTURE

The session architecture adapts based on the declared effort tier. Quality thresholds remain the same across all tiers.

### Full Tier ([N] Sessions)

Uses the standard session architecture documented above, plus optional extension sessions.

### Standard Tier ([N] Sessions — DEFAULT)

| Session | Skills/Phases | Notes |
|---------|--------------|-------|
| 1 | [PHASES] | [NOTES] |
| 2 | [PHASES] | [COMBINED OR STREAMLINED NOTES] |
| [N] | [PHASES] | [NOTES] |

### Quick Tier ([N] Sessions)

| Session | Skills/Phases | Notes |
|---------|--------------|-------|
| 1 | [ALL FOUNDATION PHASES] | Compressed, no competitive evaluation |
| 2 | [ALL GENERATION PHASES] | Direct generation |

---

## FUTURE STATE

### When Context Windows Expand

As model context windows grow, the session architecture can simplify:

- **Near-term:** Adjacent sessions can merge when context capacity allows loading all upstream data
- **Medium-term:** The entire pipeline could run in a single session with no information loss
- **The context reservoir is designed to be obsoleted.** When context windows hold everything, the reservoir becomes unnecessary

### Cross-Pipeline Learning Extraction

After completing a full pipeline run, the issue log and learning log contain a complete record. This data feeds improvement cycles:

1. **Immediate fixes** (judgment-free learnings) — tested and promoted directly
2. **Taste validation** (judgment-required learnings) — human-reviewed changes
3. **Systematic improvement** — when enough learnings accumulate, run a structured improvement cycle

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | [DATE] | Initial creation from Quality Engine v4 template. |
