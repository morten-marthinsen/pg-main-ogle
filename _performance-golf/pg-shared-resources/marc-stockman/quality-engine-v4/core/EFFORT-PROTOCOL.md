# EFFORT-PROTOCOL
**Quality Engine v4** | Component: Core
**Purpose:** Map thinking depth to execution phases so the right amount of compute is applied to the right task
**Authority:** EQUAL to all skill/agent-level files
**System-Agnostic:** Works with Claude, Gemini, OpenAI, or any AI model

---

## TABLE OF CONTENTS

- [Why This Exists](#why-this-exists)
- [The Two Halves of Quality](#the-two-halves-of-quality)
- [Global Effort Levels](#global-effort-levels)
- [Default Effort Mapping](#default-effort-mapping)
- [Per-Skill Effort Mapping Template](#per-skill-effort-mapping-template)
- [Per-Agent Effort Mapping Template](#per-agent-effort-mapping-template)
- [Integration With Anti-Degradation](#integration-with-anti-degradation)
- [Enforcement](#enforcement)
- [Examples](#examples)

---

## Why This Exists

Standard inference doesn't spend enough compute on complex creative and analytical reasoning. The model produces a strategic recommendation the same way it answers a factual question — one token at a time without deliberate extended reasoning.

The Effort Protocol maps thinking depth to execution phases so the right amount of compute is applied to the right task. Without it, the model treats a creative generation task with the same shallow reasoning it uses for a status check.

---

## The Two Halves of Quality

| System | What It Prevents | What It Ensures |
|--------|-----------------|-----------------|
| **Anti-Degradation** | Rushing (don't skip steps) | Every step gets executed |
| **Effort Protocol** | Going through the motions | Every step gets appropriate cognitive depth |

Together: every step executed AND executed with appropriate thinking depth.

You need both. An agent that follows every step but thinks shallowly produces mediocre output. An agent that thinks deeply but skips steps produces incomplete output. The Effort Protocol and Anti-Degradation System are complementary halves of the same quality guarantee.

---

## Global Effort Levels

| Effort Level | Thinking Behavior | Duration | Use When |
|---|---|---|---|
| `max` | Maximum reasoning depth. Explore multiple angles before committing. Consider alternatives. Deeply integrate all inputs before producing output. Deliberate over trade-offs. | Longest | The output IS the product. Creative quality, strategic decisions, and deep analysis live or die on thinking depth. |
| `high` | Thorough reasoning. Consider alternatives. Verify against multiple criteria. Look for edge cases. Don't accept first answer. | Long | Decisions cascade downstream. Evaluation, critique, validation, and planning require thoroughness but not full creative exploration. |
| `medium` | Balanced speed and depth. Follow established patterns with care. Quick honest self-assessment. Verify against known criteria. | Moderate | Routine but non-trivial. MC-CHECK, gate verification, template-following operations where accuracy matters but deep reasoning doesn't. |
| `low` | Fast, minimal reasoning. Mechanical execution of known formats. Pattern-match and execute. | Shortest | Pure mechanics. Status checks, file operations, session handoff, log entries. No creative or analytical judgment needed. |

### Key Rules

1. **Effort levels constrain thinking depth, not quality thresholds.** A `medium` effort task still must meet all quality minimums. You don't lower the bar — you spend less time deliberating.
2. **Never drop effort level mid-task.** If a task starts at `max`, it stays at `max` until complete. Dropping to `low` during a `max`-effort phase is a **forbidden rationalization**.
3. **Context pressure does not reduce effort.** In YELLOW/RED zones, reduce SCOPE (fewer items, smaller batch) — not DEPTH (shallower thinking).
4. **When in doubt, go higher.** It's better to over-think a `medium` task than to under-think a `high` task.

---

## Default Effort Mapping

This mapping applies to common execution phases across any skill or agent system. Override with per-skill or per-agent mappings where needed.

| Execution Phase | Effort Level | Rationale |
|----------------|-------------|-----------|
| **Creative Generation / Drafting** | `max` | Creative quality lives or dies here. This IS the product. |
| **Strategic Analysis / Deep Research** | `max` | Decisions cascade to everything downstream. |
| **Competitive Refinement Rounds** | `max` | Each round must explore multiple angles genuinely. |
| **Targeted Revision After Critique** | `max` | Surgical revision needs deep reasoning about what to change and why. |
| **Synthesis / Hybrid Assembly** | `max` | Combining elements requires careful decomposition and recombination. |
| **Evaluation / Critique** | `high` | Must find genuine weaknesses, not rubber-stamp. |
| **Foundation / Setup / Input Verification** | `high` | Bad foundation = bad everything. Decisions here cascade. |
| **Validation / Quality Assurance** | `high` | Quality verification needs thoroughness. |
| **Planning / Scoping** | `high` | Planning errors are expensive to fix downstream. |
| **Learning Brief / Post-Mortem** | `high` | Understanding WHY something worked or failed requires genuine analysis. |
| **MC-CHECK** | `medium` | Quick honest self-assessment, not deep analysis. |
| **Gate Verification** | `medium` | Binary threshold check with evidence citation. |
| **Template Following** | `medium` | Pattern-matching with accuracy requirements. |
| **Session State Tracking** | `low` | Mechanical recording of current position. |
| **Session Handoff Generation** | `low` | Structured output from known state. |
| **File Operations / Housekeeping** | `low` | Move, rename, organize. No judgment needed. |

---

## Per-Skill Effort Mapping Template

Each skill in your system should define its own effort mapping. Use this template:

```markdown
## [Skill Name] - Effort Mapping

| Phase / Unit of Work | Effort | Rationale |
|---|---|---|
| [Phase 0: Setup] | `high` | [Why this effort level] |
| [Phase 1: Research/Analysis] | `max` | [Why this effort level] |
| [Phase 2: Generation] | `max` | [Why this effort level] |
| [Phase 3: Validation] | `high` | [Why this effort level] |
| [Phase 4: Assembly] | `max` | [Why this effort level] |
| [MC-CHECK] | `medium` | Quick self-assessment |
| [Session handoff] | `low` | Mechanical recording |
```

### Example: Research Skill

```markdown
## Research Skill - Effort Mapping

| Phase / Unit of Work | Effort | Rationale |
|---|---|---|
| Source identification | `high` | Finding the right sources determines everything |
| Deep reading / extraction | `max` | Understanding nuance in source material is the core product |
| Classification / categorization | `high` | Misclassification corrupts downstream analysis |
| Pattern identification | `max` | Finding non-obvious patterns requires deep reasoning |
| Threshold verification | `medium` | Counting against known thresholds |
| Summary generation | `high` | Must accurately represent findings without distortion |
| MC-CHECK | `medium` | Quick self-assessment |
| Session handoff | `low` | Mechanical recording |
```

### Example: Creative Generation Skill

```markdown
## Creative Generation Skill - Effort Mapping

| Phase / Unit of Work | Effort | Rationale |
|---|---|---|
| Input analysis / brief review | `high` | Misunderstanding the brief wastes all downstream work |
| Concept exploration | `max` | Creative quality depends on exploration breadth |
| Naming / expression | `max` | Every word matters in creative output |
| Competitive round generation | `max` | Each round must genuinely explore new territory |
| Critique / evaluation | `high` | Must find real weaknesses, not cosmetic issues |
| Targeted revision | `max` | Surgical revision needs deep reasoning |
| Final assembly | `max` | Combining winning elements requires precision |
| Gate verification | `medium` | Binary checks against criteria |
| Session handoff | `low` | Mechanical recording |
```

---

## Per-Agent Effort Mapping Template

Each agent in a multi-agent system should define its own effort mapping. Use this template:

```markdown
## [Agent Name] ([Agent Role]) - Effort Mapping

| Phase / Activity | Effort | Rationale |
|---|---|---|
| [Core creative/analytical work] | `max` | [Why] |
| [Secondary analytical work] | `high` | [Why] |
| [Operational tasks] | `medium` | [Why] |
| [Mechanical tasks] | `low` | [Why] |
```

### Example: Strategic Advisor Agent

```markdown
## Strategic Advisor - Effort Mapping

| Phase / Activity | Effort | Rationale |
|---|---|---|
| Strategic analysis / scorecard review | `max` | Decisions cascade to all other agents |
| Communications drafting | `max` | Political nuance requires deep reasoning |
| Meeting prep / delegation planning | `high` | Needs thoroughness for stakeholder nuance |
| Weekly update generation | `high` | Represents the team to leadership |
| Status checks / session resume | `medium` | Quick verification |
| Session handoff | `low` | Mechanical recording |
```

### Example: Data Intelligence Agent

```markdown
## Data Intelligence Agent - Effort Mapping

| Phase / Activity | Effort | Rationale |
|---|---|---|
| Data analysis / trend identification | `max` | Insights drive all downstream creative |
| Expansion recommendations | `max` | Directly determines what gets produced |
| Pipeline operations (sync, ingest) | `high` | Data integrity matters |
| Formatting / cleanup | `medium` | Routine but needs accuracy |
| Naming convention application | `medium` | Pattern-matching, not creative |
| Session handoff | `low` | Mechanical recording |
```

### Example: Production Agent

```markdown
## Production Agent - Effort Mapping

| Phase / Activity | Effort | Rationale |
|---|---|---|
| Creative selection decisions | `max` | Creative judgment determines output quality |
| Assembly / editing decisions | `max` | Assembly is the core product |
| Pipeline orchestration | `high` | Sequencing matters, errors cascade |
| Technical command construction | `high` | Wrong commands = wasted processing |
| Test writing | `high` | Test quality determines code quality |
| File operations / build | `medium` | Routine but needs correctness |
| Session handoff | `low` | Mechanical recording |
```

### Example: Copywriting Agent

```markdown
## Copywriting Agent - Effort Mapping

| Phase / Activity | Effort | Rationale |
|---|---|---|
| Script writing / hook generation | `max` | This IS the product. Every word matters. |
| Audience analysis / behavioral framework | `max` | Psychological depth drives copy quality |
| Multi-perspective generation | `max` | Each lens needs deep independent reasoning |
| Claim verification | `high` | Factual accuracy protects the brand |
| Quality scoring | `high` | Evaluation needs thoroughness |
| Context gathering (data loading) | `medium` | Data loading, not creative |
| Session handoff | `low` | Mechanical recording |
```

---

## Integration With Anti-Degradation

The Effort Protocol has **EQUAL** authority to the Anti-Degradation System. They reinforce each other:

### MC-CHECK Integration

When MC-CHECK detects rushing, add this check:
```
Is the effort level appropriate for the current phase?
If current phase is `max` effort but I'm operating at `medium` depth -> HALT
```

### Context Zone Adjustment

| Zone | Effort Adjustment |
|------|-------------------|
| **GREEN** | Normal effort levels per mapping |
| **YELLOW** | Consider RAISING effort to compensate for degradation pressure |
| **RED** | Maintain effort level but reduce SCOPE (fewer items, not shallower thinking) |
| **CRITICAL** | Halt — effort level is irrelevant, session break required |

**Critical rule:** Context pressure NEVER reduces effort level. It reduces scope.

- **Wrong:** "I'm in RED zone, so I'll do a quick version of this `max` effort task"
- **Right:** "I'm in RED zone, so I'll do fewer items at full `max` depth and break after this gate"

---

## Enforcement

1. Every skill/agent spec should reference this document or include its own effort mapping
2. Session logs should note effort level at phase boundaries
3. If output feels shallow or rushed, check: was the effort level appropriate for the phase?
4. Dropping to `low` effort during a `max`-effort phase is a **forbidden rationalization** — add it to your anti-degradation adapter
5. MC-CHECK should include effort-level verification

### Effort Audit Format

Include this in execution logs at phase boundaries:

```yaml
effort_audit:
  phase: "[phase name]"
  prescribed_effort: "[max|high|medium|low]"
  actual_effort: "[max|high|medium|low]"
  match: "[Y/N]"
  if_mismatch: "[explanation and corrective action]"
```

---

## Key Insight

> "The anti-degradation system fights the SYMPTOM (rushed, shallow output). The effort protocol addresses the CAUSE — the model doesn't spend enough compute on reasoning before producing tokens."

Both are necessary. Neither is sufficient alone. Together they form a complete quality guarantee: every step executed (anti-degradation) with appropriate depth (effort protocol).

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-17 | Initial creation for Quality Engine v4. Standalone effort protocol with global levels, default mapping, per-skill and per-agent templates with examples, anti-degradation integration, enforcement rules. |
