# Protocol Manifest — Template
**Quality Engine v4** | Component: Template
**Purpose:** Priority-banded conditional protocol loading to minimize token overhead per skill/agent execution
**Instructions:** Copy this file into your system and fill in the [PLACEHOLDERS]. Define your priority bands, then create per-skill loading profiles.

---

## HOW TO USE THIS MANIFEST

At session start:
1. Read this manifest
2. Identify: current skill(s), engine, tier, context zone
3. Load all protocols where **Load Condition** evaluates TRUE
4. Sort by priority (lower number = loaded first)
5. Track total estimated tokens loaded

At skill transition (within session):
1. Unload protocols specific to the previous skill (priority 50-60)
2. Load protocols for the new skill
3. Re-evaluate conditional protocols (65-95)

**Do NOT load the entire manifest into context.** Use it as a lookup table.

---

## Priority Bands

| Priority | Category | Load Condition | Est. Tokens |
|----------|----------|----------------|-------------|
| 10 | Core Rules (non-negotiables) | ALWAYS | ~[N] |
| 15 | Anti-Degradation (structural enforcement) | ALWAYS | ~[N] |
| 20 | Mandatory Output Protocol | ALWAYS | ~[N] |
| 25 | Per-Phase Output Protocol | ALWAYS | ~[N] |
| 30 | Forbidden Behaviors (core subset) | ALWAYS | ~[N] |
| 35 | Event-Driven Reminders (detector awareness) | ALWAYS | ~[N] |
| 40 | Task Triage (tier identification) | SESSION START ONLY | ~[N] |
| 45 | Effort Protocol (thinking depth) | ALWAYS | ~[N] |
| 50 | Current Skill instruction file | PER SKILL | varies |
| 55 | Current Skill anti-degradation rules | PER SKILL | varies |
| 60 | Skill index/reference file | PER SKILL (if exists) | varies |
| 65 | [CONDITIONAL_PROTOCOL_1] | IF [CONDITION] | ~[N] |
| 70 | [CONDITIONAL_PROTOCOL_2] | IF [CONDITION] | ~[N] |
| 75 | [CONDITIONAL_PROTOCOL_3] | IF [CONDITION] | ~[N] |
| 80 | Engine master file | IF engine != default | varies |
| 85 | [CONDITIONAL_PROTOCOL_4] | IF [CONDITION] | ~[N] |
| 90 | [CONDITIONAL_PROTOCOL_5] | IF [CONDITION] | ~[N] |
| 95 | Context Zone Reminders | IF zone != GREEN | ~[N] |
| 98 | External Tool Discovery | IF skill.tools != empty | ~[N] |

### How to Define Priority Bands

- **10-35 (Always Load):** Core rules that every skill needs. Keep these lean — they load in every session.
- **40-45 (Session Start):** One-time setup that does not need to persist after initial configuration.
- **50-60 (Per-Skill):** Swap these when transitioning between skills within a session.
- **65-95 (Conditional):** Only load when the condition is true. This is where the biggest token savings come from.
- **98 (Tools):** External tool schemas are expensive (500-2K tokens each). Load only when needed.

---

## Per-Skill Loading Profiles

Each skill has a loading profile declaring its protocol requirements. Store these at:
```
system/skill-loading-profiles/[id]-[name].yaml
```

See `SKILL-LOADING-PROFILE.yaml` template for the file format.

### Per-Skill Loading Table

| Skill | ID | [FLAG_1] | [FLAG_2] | [FLAG_3] | Engine | External Tools |
|-------|----|----------|----------|----------|--------|----------------|
| [SKILL_1] | [ID] | [yes/no] | [yes/no] | [yes/no] | [ENGINE] | [LIST or none] |
| [SKILL_2] | [ID] | [yes/no] | [yes/no] | [yes/no] | [ENGINE] | [LIST or none] |

**Common flags to track per skill:**
- `arena` / `competitive_evaluation` — Does this skill run a competitive evaluation process?
- `generates_output` — Does this skill produce content/copy?
- `consumes_upstream` — Does this skill load outputs from prior skills?
- `expression_testing` — Does this skill test language variants?
- `quality_verification` — Does this skill include quality checks?

---

## Token Savings Estimate

| Scenario | Current Load | With Manifest | Savings |
|----------|-------------|---------------|---------|
| Minimal skill (no conditionals) | ~[N]K (full system) | ~[N]K (priority 10-45 only) | ~[N]K |
| Evaluation skill (arena/competition) | ~[N]K | ~[N]K | ~[N]K |
| Generation skill (full stack) | ~[N]K | ~[N]K | ~[N]K |
| Branch engine skill | ~[N]K | ~[N]K | ~[N]K |

Biggest savings: branch engine skills and early foundation skills that currently load the full system core.

---

## Engine Master File Mapping

| Engine | Master File | Applies To |
|--------|------------|------------|
| [DEFAULT_ENGINE] | (none — core system is sufficient) | [SKILL_RANGE] |
| [ENGINE_2] | `[PATH]` | [SKILL_RANGE] |
| [ENGINE_3] | `[PATH]` | [SKILL_RANGE] |

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | [DATE] | Initial creation from Quality Engine v4 template. |
