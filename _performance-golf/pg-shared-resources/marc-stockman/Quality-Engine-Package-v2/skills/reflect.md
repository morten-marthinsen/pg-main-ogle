---
name: reflect
description: "Strategic system review command. 7-dimension assessment of the operating system itself with proposals table including Blast Radius, Ripple Risk, Reversibility."
---

# Reflect Command Protocol

**Version:** 1.1 | March 10, 2026
**Trigger:** Marc says "reflect"

---

## Purpose

Audit looks at trees. Reflect looks at the forest.

This command steps back from individual deliverables and evaluates the operating system itself — the rules, skills, operational files, and workflows that govern every session. The goal is to ensure the system remains fit for purpose, appropriately sized, and practically usable as it evolves.

**When to use:**
- On-demand: Marc says "reflect" when he wants a strategic system review
- Proactive suggestion: AI suggests reflect after every 3-5 significant system changes (new skills, merged skills, new rules, architectural decisions)

**Output format:** Structured conversation through each dimension, followed by a brief summary document capturing conclusions and action items.

---

## The 7 Dimensions

Work through each dimension in order. For each one: state the finding, cite specific evidence, and propose any action. Marc participates throughout — this is a dialogue, not a report.

### Dimension 1: Problem-Solution Fit

**Question:** Are the rules and skills actually solving the recurring problems they were created for?

- For each preventive rule (R-01 through R-current): What specific incident created this rule? Has that class of problem recurred since the rule was added? If it hasn't recurred, is that because the rule is working or because the situation hasn't come up?
- For each skill: Is it being loaded and applied, or is it sitting unused in the library?
- Flag any rule or skill that appears to be solving a problem that no longer exists (feeds G-6: Rule Obsolescence Detection)

**Evidence sources:** Memory (past session patterns), session-learning-log.md, issue-logger entries

---

### Dimension 2: Complexity Audit

**Question:** Has the system grown beyond what's justifiable?

Produce a current inventory count:
- Directives (D-series): count
- Preventive rules (R-series): count
- Accelerator rules (Q+L series): count
- Custom skills: count
- Operational files: count
- Standing commands: count

For each category, ask: "Could we get 90% of the value with half the items?" If yes, identify candidates for merging or retirement.

**Specific checks:**
- Are any two rules saying the same thing in different words?
- Are any skills overlapping in scope?
- Could operational files be consolidated?
- Is the Accelerator framework (Q1-Q6, L1-L6) still the right granularity, or could it be simplified?

---

### Dimension 3: Context-Load Pragmatism

**Question:** Is the system's own weight degrading the AI's ability to do actual work?

This is the empathy-to-the-LLM dimension. LLMs have finite context windows and suffer attention degradation — the more tokens consumed by system instructions, the less capacity remains for the task at hand. Research shows models are worst at following instructions that appear in the middle of long contexts ("lost in the middle" effect).

**Assess:**
- **Initialize load:** Estimate the total token count consumed by a full initialize sequence (framework + skills + operational files). Is it growing unsustainably?
- **Per-task overhead:** How many rules and checks fire on a typical task? Is the quality infrastructure consuming more effort than the actual work? (R-04: 70%+ substance ratio)
- **Skill modularity:** Are skills appropriately scoped for load-on-demand, or are too many loading by default?
- **Operational file bloat:** Are operational files (reasoning log, staleness map, commitment registry) earning their keep, or have they become empty ritual?
- **Rule density:** When a rule is very long and detailed, does the AI reliably follow all parts, or do the specifics get lost? Would shorter rules with skill-level detail be more effective?

**Propose concrete reductions** if the load is too high: which items to trim, consolidate, or make conditional.

---

### Dimension 4: Blind Spot Scan

**Question:** What failure modes have we NOT experienced yet but could?

- What's the system's worst-case scenario? (Not a single task failing — a cascading system failure)
- What happens if the skill library becomes unavailable?
- What happens if memory search returns incorrect or outdated information?
- What happens if two threads modify the same skill simultaneously?
- What new platform capabilities or limitations could invalidate current assumptions?
- Review the Known Gaps table in the framework — are any gaps now more urgent than when they were logged?

---

### Dimension 5: Hardening Assessment

**Question:** Where is the system fragile?

For each rule and workflow, classify its enforcement:
- **Structural:** Platform-enforced or mechanically verified (e.g., YAML frontmatter check via bash)
- **Behavioral:** Depends on AI following the rule (e.g., most R-series rules)
- **Manual:** Depends on Marc noticing and requesting (e.g., re-initialize after compaction)

Flag anything important that's purely behavioral — those are the fragile points. For each, ask: "Can this be made structural?"

---

### Dimension 6: Effectiveness Check

**Question:** Is Marc's experience actually getting better?

This is the ultimate test. All the plumbing exists to serve one outcome: Marc gets better results from the AI, session over session.

- What frustrations has Marc expressed recently? Are they the same frustrations that existed before the rules were created?
- Is the AI making fewer mistakes, or the same mistakes with more documentation around them?
- Has the system created any NEW friction that didn't exist before? (Overhead, false positives, unnecessary ceremony)
- Honest self-assessment: on a scale of 1-5, how well is the system performing on its own terms?

---

### Dimension 7: Simplification Pass

**Question:** For every rule, skill, and operational file — if this didn't exist, what would actually go wrong?

This is the most important dimension. Complexity is the enemy of usability, and systems naturally accumulate complexity over time.

- Walk through each rule: "If I deleted this rule, would something bad happen on the next task?" If the answer is "probably not," flag it for potential retirement.
- Walk through each skill: "Is this pulling its weight?" Load frequency, last time it was applied, whether its content could be folded into another skill.
- Walk through each operational file: "Is this being maintained and used, or is it empty scaffolding?"

**The simplification standard:** If removing something would cause no observable degradation in Marc's experience, it should be removed. Theoretical value is not sufficient justification for keeping something in a token-constrained environment.

---

## Output Phase 1: Proposals Table

When the 7-dimension conversation produces proposals, present them in an 11-column analysis table. This format is mandatory — it was proven to change proposals before implementation (4 of 9 proposals changed in the first use).

**Format:** Excel spreadsheet (wide table). One row per proposal.

| Column | Format | Purpose |
|--------|--------|---------|
| # | Number | Sequential proposal ID |
| Problem | **BOLD WORDS** — description | What's wrong. 2-3 bold caveman words, then dash, then full description. |
| Solution | **BOLD WORDS** — description | What to do about it. Same format. |
| Benefit | **BOLD WORDS** — description | Why it's worth doing. Same format. |
| Risk | **BOLD WORDS** — description | What could go wrong. Same format. |
| Blast Radius | **BOLD WORDS** — description | Known, direct areas that will be modified. The explicit change map — which files, skills, and rules get touched. |
| Ripple Risk | **BOLD WORDS** — description | Hidden dependencies and downstream areas that could break. The "what else could be affected that we're not thinking about" analysis. |
| Reversibility | Easy / Moderate / Hard | Can we undo this if it doesn't work? Easy = trivial to revert. Moderate = requires cross-ref updates. Hard = cascading changes difficult to unwind. |
| Sequencing | DO FIRST / AFTER #N / INDEPENDENT / DO LAST | Execution order. Some proposals depend on others or should happen in a specific order. |
| Priority | High / Medium / Low / Deferred / Ongoing | Urgency. High = this session. Medium = next 1-2 sessions. Low = backlog. Deferred = waiting for evidence. Ongoing = continuous monitoring. |
| Dim | Number(s) | Which reflect dimension(s) surfaced this proposal. |

**Blast Radius vs. Ripple Risk distinction:**
- Blast Radius = known scope of change (effort assessment)
- Ripple Risk = hidden dependencies that could break (danger assessment)

Both earn their place because they serve different decision-making needs.

**After building the table, run a reflect-on-reflect:** Review all proposals through the lens of the new analysis columns. Do the Blast Radius or Ripple Risk columns reveal issues that change any proposal's solution, priority, or sequencing? Apply corrections before presenting to Marc.

Save as `/workspace/reflect-proposals.xlsx` and share via share_file.

---

## Output Phase 2: Conclusions Document

After Marc makes decisions on proposals, produce a summary document capturing:

```markdown
# System Reflect — [Date]

## Inventory
- [X] directives, [Y] preventive rules, [Z] accelerator rules
- [N] custom skills, [M] operational files, [P] standing commands

## Key Findings
- [Finding 1]: [action / no action needed]
- [Finding 2]: [action / no action needed]
...

## Actions Approved
| # | Action | Priority | Status |
|---|--------|----------|--------|
| 1 | [description] | [high/medium/low] | [approved / deferred / rejected] |
...

## Reflect-on-Reflect Corrections
[List any proposals that were changed by the additional analysis columns]

## Recommended Execution Order
[Based on sequencing analysis from the proposals table]

## Context-Load Status
- Estimated initialize token load: [count]
- Substance ratio assessment: [healthy / concerning / critical]
- Items flagged for reduction: [list]

## Next Reflect
- Suggested: after [condition or milestone]
```

Save as `/workspace/reflect-[date].md` and share via share_file.

---

## Proactive Trigger

After every 3-5 significant system changes (new skills created, skills merged/retired, new rules added, architectural decisions), the AI should suggest:

> "We've made [N] system changes since the last reflect. Want to run a reflect to make sure everything still holds together?"

Marc decides whether to accept. Never auto-run.

---

## Registration in marc-ops-framework

This skill adds the `reflect` command to the Standing Commands table:

| Command | Trigger | Action |
|---------|---------|--------|
| `reflect` | Marc says "reflect" | Load skill `reflect`. Execute 7-dimension strategic system review: Problem-Solution Fit, Complexity Audit, Context-Load Pragmatism, Blind Spot Scan, Hardening Assessment, Effectiveness Check, Simplification Pass. Conversation format, then summary document. |

---

*This is the canonical definition of the reflect command. It evaluates the system itself, not individual deliverables.*

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Audit | PASSED | 2026-03-10 | AI | v1.0: Loop 1: 0 findings. Convergence immediate. R-26 acceptance test: 5/5 tests passed. |
| Audit | PASSED | 2026-03-10 | AI | v1.1: Added 11-column proposals table format (Blast Radius, Ripple Risk, Reversibility, Sequencing), reflect-on-reflect step, two-phase output. Proven in first use: 4 of 9 proposals changed by additional analysis. |