# Creative OS — Effort Protocol

**Version:** 1.0
**Created:** 2026-02-09
**Purpose:** Map thinking depth to execution phases so the right amount of compute is applied to the right task
**Authority:** This document has EQUAL authority to every agent's CLAUDE.md and the Anti-Degradation System
**Source pattern:** TonyFlo's CopywritingEngine Effort Protocol (AGENT-TEAMS-UPGRADE-ANALYSIS.md, Feature 2)

---

## WHY THIS EXISTS

Standard inference doesn't spend enough compute on complex creative and analytical reasoning. The model produces a strategic recommendation the same way it answers a factual question — one token at a time without deliberate extended reasoning.

The Effort Protocol maps thinking depth to execution phases so the right amount of compute is applied to the right task. This complements the Anti-Degradation System:

- **Anti-Degradation** prevents rushing (don't skip steps)
- **Effort Protocol** ensures depth (don't just go through the motions)

Together: every step executed AND executed with appropriate cognitive depth.

---

## GLOBAL EFFORT MAPPING

| Effort Level | Behavior | Use Cases |
|---|---|---|
| `max` | Maximum reasoning depth. Explore multiple angles before committing. Deeply integrate all inputs before producing output. | Creative generation, data analysis, strategic decisions |
| `high` | Thorough reasoning. Consider alternatives. Verify against multiple criteria. | Evaluation, critique, validation, planning |
| `medium` | Balanced speed and depth. Follow established patterns with care. | MC-CHECK, gate verification, routine operations |
| `low` | Fast, minimal reasoning. Mechanical execution of known formats. | Status checks, file operations, session handoff |

---

## PER-AGENT EFFORT MAPPING

### Exa (Strategic Chief of Staff)

| Phase | Effort | Rationale |
|---|---|---|
| Strategic analysis / scorecard review | `max` | Decisions cascade to all agents |
| Wise Reply / communications drafting | `max` | Political nuance requires deep reasoning |
| Meeting prep / delegation planning | `high` | Needs thoroughness for stakeholder nuance |
| Weekly update generation | `high` | Represents Christopher to CMO |
| Status checks / session resume | `medium` | Quick verification |
| Session handoff | `low` | Mechanical recording |

### Tess (Strategic Scaling System)

| Phase | Effort | Rationale |
|---|---|---|
| Data analysis / trend identification | `max` | Root angle insights drive all creative |
| Expansion recommendations | `max` | Directly determines what gets made |
| Pipeline operations (sync, ingest) | `high` | Data integrity matters |
| Spreadsheet formatting / cleanup | `medium` | Routine but needs accuracy |
| Naming convention application | `medium` | Pattern-matching, not creative |
| Session handoff | `low` | Mechanical recording |

### Veda (Video Editing Agent)

| Phase | Effort | Rationale |
|---|---|---|
| Hook selection (choosing donor hooks) | `max` | Creative judgment determines output quality |
| Assembly editing decisions | `max` | Creative assembly is the core product |
| Pipeline orchestration | `high` | Sequencing matters, errors cascade |
| FFmpeg command construction | `high` | Wrong commands = wasted processing |
| Test writing | `high` | Test quality determines code quality |
| File operations / build | `medium` | Routine but needs correctness |
| Session handoff | `low` | Mechanical recording |

### Neco (NeuroCopy Agent)

| Phase | Effort | Rationale |
|---|---|---|
| Hook generation / script writing | `max` | This IS the product. Every word matters. |
| Audience analysis / behavioral framework | `max` | Psychological depth drives copy quality |
| Multi-perspective generation | `max` | Each lens needs deep independent reasoning |
| Claim verification | `high` | Factual accuracy protects the brand |
| HSP/SSP scoring | `high` | Quality evaluation needs thoroughness |
| Context gathering (Tess data) | `medium` | Data loading, not creative |
| Session handoff | `low` | Mechanical recording |

---

## INTEGRATION WITH ANTI-DEGRADATION SYSTEM

The Effort Protocol has **EQUAL** authority to the Anti-Degradation System. They reinforce each other.

- When MC-CHECK detects rushing, check: is the effort level appropriate for the current phase?
- Context zones may require effort level adjustment:
  - **YELLOW**: Consider raising effort to compensate for degradation pressure
  - **RED**: Maintain effort level but reduce scope (fewer items, not shallower thinking)
  - **CRITICAL**: Halt — effort level is irrelevant, session break required

---

## ENFORCEMENT

- Each agent's CLAUDE.md should reference this document
- Session logs should note effort level at phase boundaries
- If an agent produces output that feels shallow or rushed, check: was the effort level appropriate?
- Dropping to `low` effort during a `max`-effort phase is a **forbidden rationalization**

---

## KEY INSIGHT

> "The anti-degradation system fights the SYMPTOM (rushed, shallow output). Extended thinking addresses the CAUSE — the model doesn't spend enough compute on creative reasoning before producing tokens."
>
> *— Adapted from TonyFlo's CopywritingEngine Upgrade Analysis*
