# Skill Architecture Patterns -- What To Adopt

> **These are all patterns I should consider incorporating into how we build skills.** Sourced from comparing the short-form-copy skill (built externally by Benjamin Marcoux for Performance Golf, adapted for SP) against our existing skill library. The external skill does several things none of our skills do. Our best skills also have patterns the external skill lacks. The hybrid is what we want.

---

## Patterns From the External Skill That None of Our Skills Have

### 1. Deliverable Specs With Hard Limits

The short-form-copy skill specifies exact output constraints per platform: Facebook headlines must be 40 characters, YouTube descriptions 90, tweets 280, etc. No other skill in our library specifies measurable output constraints.

**Why it matters:** Without hard limits, the agent produces output that "feels right" but doesn't fit the container. Character limits are the obvious case, but the principle applies everywhere -- word count caps on teaching unit sections, maximum number of bullet points, required number of variations.

**Where to adopt:**
- Distinction Expander already has C9 (250-350 lines total) and C1 (Flash <= Gap length) -- these are the same pattern
- Every skill that produces deliverables should specify the container size
- Webinar skills could specify section durations (intro: 5-7 min, not "keep it short")

### 2. Mandatory Validation Tooling

A Python script runs against all output before delivery. Must pass 100%. Not optional, not honor-system -- the script either passes or you fix and re-run.

**Why it matters:** Self-audit checklists (like distinction-expander's 11-item list) rely on the agent honestly evaluating its own work. A validation script is machine-enforced. The agent can't "feel like" it passed -- it either did or didn't.

**Where to adopt:**
- Any skill with measurable constraints should have a validation script
- Distinction Expander: script that checks line counts (C1, C9), section presence, borrowed terminology (C10)
- Webinar skills: script that counts commitment points, checks section order, validates timing estimates
- Copywriting skills: readability score checker, "you" density counter (Benson requires 10%)

### 3. Dual Delivery Formats

Working format (labeled, grouped by unit) during revision vs. final format (raw copy in code blocks, one line per Google Sheets cell) for delivery. Two different formats for two different jobs.

**Why it matters:** The format you need for reviewing and editing is different from the format you need for importing into another system. Most of our skills produce one format and hope it works for both.

**Where to adopt:**
- Any skill whose output gets imported somewhere (Google Sheets, Whop, WordPress, presentation software)
- Distinction system: working format for review vs. clean format for curriculum documents
- Daily briefing: already does this (narrative + JSON + dashboard JS) -- good model to follow

### 4. Pre-Mapped Quick-Reference Data

Stats table, mechanisms table, hook formulas -- all pre-adapted to the specific product line and ready to grab. Not "go research this" but "here are the 12 stats you'll use, with sources."

**Why it matters:** Every time an agent has to research something that's already known, it wastes time and risks getting it wrong. Pre-mapping the data that gets used repeatedly eliminates both problems.

**Where to adopt:**
- Every product-specific skill should have a quick-reference table of: key stats, core mechanisms, proof elements, testimonial snippets, price points
- Webinar skills: pre-mapped commitment points, stack elements, bonus descriptions per product
- Copywriting skills: pre-mapped authority elements, social proof, pain points per ICP

---

## Patterns From Our Best Skills That the External Skill Lacks

### 5. Gate Checks Between Workflow Phases

**Best examples:** webinar-fladlien (gate check after every step), copywriting-arena (9 phases with gates), distinction-expander (self-audit before submission)

The short-form-copy skill has a workflow but no enforcement. It suggests steps; it doesn't prevent skipping them.

**The pattern:** Before moving from Phase N to Phase N+1, verify that Phase N actually passed. Can't deliver until validation runs. Can't show output until quality checklist completes. Can't proceed to expansion until extraction passes the critic.

**How to write it:**
```
GATE CHECK — Phase 2 → Phase 3
- [ ] All extractions scored by Finder Critic
- [ ] 85%+ approval rate achieved
- [ ] Failed extractions logged with reasons
- [ ] PROGRESS-LOG updated
→ If all checked: proceed to Phase 3
→ If any unchecked: STOP. Do not proceed.
```

### 6. Silent Critique Before User Sees Output

**Best example:** Benson skill runs benson-critic automatically before showing output to the user. User sees polished output, not first draft.

**Why it matters:** The user shouldn't be the quality filter. If we have a critic agent, run it before delivery -- not after the user spots the problem.

**Where to adopt:**
- Any skill with a matching critic agent should run it silently
- Short-form-copy: could add a voice-check critic (does this sound like Rich? are there hype words?)
- Distinction Expander: already has Expander Critic, but it's invoked separately -- could be built into the workflow

### 7. Hard Constraints With Consequences

**Best example:** Distinction Expander's C1-C10 -- numbered constraints where any violation means automatic REVISE regardless of score.

The short-form-copy skill has "Words Rich AVOIDS" but no consequences for violating them. The distinction-expander has "C3: No five-example cascades in Flash" with an automatic fail if violated.

**The pattern:** Convert suggestions into numbered constraints. Each constraint has a clear test (pass/fail, not subjective) and a clear consequence (reject, revise, flag).

**Template:**
```
HARD CONSTRAINTS
- C1: [Constraint] → Test: [how to check] → Consequence: [what happens on violation]
- C2: [Constraint] → Test: [how to check] → Consequence: [what happens on violation]
```

### 8. Anti-Patterns Section With Examples

**Best examples:** Carlton skill shows what Carlton copy should NOT sound like. Benson lists specific anti-patterns (corporate pitch, presumptuous language). Copywriting-arena has non-negotiable rules with consequences.

**Why it matters:** Telling the agent what TO do is necessary but insufficient. Showing what NOT to do with concrete examples catches the failure modes that positive instructions miss.

**Template:**
```
ANTI-PATTERNS (What [Skill] Output Should NEVER Sound Like)

BAD: "We are pleased to announce our revolutionary new..."
WHY: Corporate voice. Rich never talks like this.
FIX: "Here's what we built and why it matters."

BAD: "This amazing system will transform your business..."
WHY: Hype without specifics. Empty calories.
FIX: "This system produced 54% revenue growth in 2025. Here's how."
```

### 9. Evolution Log / Arena Learning

**Best examples:** Carlton skill has Arena Evolution Log (match-by-match learnings). webinar-fladlien has Arena Learning updates from Round 3C. Copywriting-arena tracks win/loss patterns across competitions.

**Why it matters:** Skills that don't learn from usage stay static. Skills that incorporate competition results and real-world feedback improve over time.

**Where to adopt:**
- Any skill that produces testable output should track what worked and what didn't
- Short-form-copy: track which hook formulas convert best per platform
- Distinction Expander: already evolving via critic feedback (C1-C10 came from critic evaluations)
- Version the skill (v1.0, v1.1) so changes are traceable

### 10. Explicit Failure Reporting

**Best example:** Daily-briefing skill requires explicit failure reporting -- never say "complete" when a source failed. Report what failed, why, impact, and fix.

**Why it matters:** Silent failures compound. If a validation script breaks, if a sub-agent times out, if an API returns bad data -- the user needs to know immediately, not discover it downstream.

**Template:**
```
FAILURE REPORTING PROTOCOL
When ANY component fails:
1. WHAT failed (specific component)
2. WHY it failed (error message or condition)
3. IMPACT (what output is missing or degraded)
4. FIX (retry? workaround? escalate?)

NEVER: Mark a task complete when a component failed
NEVER: Summarize partial results without flagging gaps
```

---

## The Architecture We Should Build Toward

The best skill combines ALL of these patterns:

| Layer | What It Does | Example |
|-------|-------------|---------|
| Identity | Who the agent is, what it produces | Short-form-copy: "world-class short-form copywriter for SP" |
| Specs | Measurable output constraints | Character limits, line counts, section requirements |
| Quick Reference | Pre-mapped data for this product/context | Stats, mechanisms, hook formulas, proof elements |
| Workflow | Step-by-step with gates | Phase 1 → Gate → Phase 2 → Gate → Delivery |
| Constraints | Numbered hard rules with consequences | C1-C10 pattern from distinction-expander |
| Anti-Patterns | What NOT to do, with examples | Bad/Why/Fix format |
| Validation | Machine-enforced checks before delivery | Python script, critic agent, or both |
| Delivery | Dual format (review vs. import) | Working format + final format |
| Evolution | Learns from usage and competition | Arena log, version history |
| Failure Protocol | What to do when things break | Explicit reporting template |

**Current skill coverage:**

| Skill | Ident | Specs | QRef | Workflow | Constr | Anti | Valid | Dual Del | Evol | Fail |
|-------|-------|-------|------|----------|--------|------|-------|----------|------|------|
| short-form-copy | Y | Y | Y | Partial | Partial | Partial | Y | Y | - | - |
| distinction-expander | Y | Y | - | Y | Y | Partial | Partial | - | Y | - |
| benson | Y | Partial | - | Y | Y | Y | Y (critic) | - | Y | - |
| webinar-fladlien | Y | Partial | - | Y | Y | Y | Partial | - | Y | - |
| copywriting-arena | Y | - | - | Y | Y | Y | Y (critics) | - | Y | - |
| daily-briefing | Y | - | Y | Y | - | - | - | Y | - | Y |

No single skill has all 10 layers. The goal: every skill that produces deliverables should eventually have all 10.

---

## Priority Order for Adoption

1. **Validation tooling** -- Highest leverage. Machine-enforced quality beats honor-system checklists every time. Start adding validation scripts to distinction-expander, then webinar skills.

2. **Pre-mapped quick reference** -- Second highest. Eliminates repeated research and wrong data. Add product-specific stat/mechanism/proof tables to every product-facing skill.

3. **Hard constraints with consequences** -- Already working in distinction-expander. Extend the C1-C10 pattern to other skills that have soft suggestions that should be hard rules.

4. **Anti-patterns with examples** -- High leverage per effort. One section with 5-6 bad/why/fix examples prevents the most common failure modes.

5. **Dual delivery formats** -- Important for any skill whose output gets imported elsewhere. Low effort to add.

6. **Gate checks** -- Important for multi-phase skills. Already exist in our best skills, just need to be standardized.

7. **Silent critique** -- Valuable but requires a matching critic agent. Only add where critics already exist.

8. **Evolution log** -- Already happening organically in arena-connected skills. Formalize it.

9. **Explicit failure reporting** -- Add to any skill that calls APIs or spawns sub-agents.

10. **Deliverable specs** -- Add measurable constraints to skills that currently have vague output descriptions.

---

*Created: February 12, 2026*
*Source: Comparative analysis of short-form-copy skill (external, adapted from Benjamin Marcoux/Performance Golf) vs. 9 existing SP skills*
*Purpose: Document architectural patterns worth adopting across the skill library*
