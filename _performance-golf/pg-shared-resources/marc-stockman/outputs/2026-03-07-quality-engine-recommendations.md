# Quality Engine — Recommendations Handoff

**Date:** 2026-03-07
**For:** Marc Stockman
**From:** Donnie French + Claude Opus 4.6 analysis session
**Scope:** Recommendations for Marc's Quality Engine ONLY (16 QE skills + 12 Accelerators + Ops Framework)
**Sources:** Manus "Context Engineering for AI Agents" (July 2025), Rich Schefren "Project Operations Protocol — The Missing Layer" (Feb 2026), "Agents of Chaos" red-teaming study (arXiv:2602.20021, March 2026)

---

## What Your System Already Gets Right

Before the gaps — your system is strong in these areas and the external research validates your design:

- **File-based persistence** (reasoning-log.md, session-learning-log.md, commitment-registry.md) — Manus independently arrived at the same conclusion: "the file system is the ultimate context." Your architecture is validated.
- **Issue Logger with J1/J2 classification** — Manus says "keep the wrong stuff in" because erasing failure removes evidence. Your system captures errors structurally. This is correct.
- **R-07 Research-Before-Reasoning Gate** — Identified as the single highest-value rule. External research confirms this prevents the #1 AI failure mode.
- **Session Bootstrap (initialize)** — Rich Schefren's biggest finding was that protocols exist but aren't loaded. Your `initialize` command solves exactly this problem.
- **Convergence Governor (Skill 11)** — Manus documents agents looping for 9 days without self-detecting. Your hard iteration caps (Fast: 0, Standard: 1, Thorough: 3) prevent this structurally.

---

## Recommendation 1: Add Cache-Aware Context Design Guidance

**Source:** Manus Article — Lesson 1 (KV-Cache)

**What it is:** When the AI processes your rules, it builds an internal memory shortcut (KV-cache) for everything it's already read. If ANYTHING changes at the beginning of the context — even one token — the entire cache breaks and the AI re-processes everything from scratch. This makes it 10x more expensive and slower.

**What to change in your system:**

**File: `marc-ops-framework.md`** — Add a new directive or standing preference:

> **Context Structure Rule:** System instructions (directives, rules, accelerators) must remain stable across turns. Do not inject dynamic content (timestamps, session-specific data, changing file lists) into the operational framework. Dynamic content belongs at the END of context (in reasoning-log.md, session-learning-log.md), not at the beginning (in operational rules).

**File: `session-bootstrap.md`** — Add guidance to Step 1:

> When loading operational files, load them in the SAME order every session. Do not reorder based on task type. The stable prefix ensures the AI's internal cache remains valid across turns, reducing latency and cost.

**Why this matters:** Your `initialize` command reads 11 files. If those files change between sessions (someone updates a rule, adds a preference), every subsequent turn in the session loses the cache benefit. This is an efficiency concern, not a quality concern — but at scale, it compounds.

---

## Recommendation 2: Move Quantifiable Checks Outside Self-Monitoring

**Source:** Agents of Chaos — MC-CHECK finding

**The problem:** Your MC-CHECK protocol asks the AI to self-report: "Am I rushing? Am I synthesizing from memory?" The Agents of Chaos study proved empirically that **the same context pressure that causes rushing also degrades self-monitoring.** The AI reports `rushing_detection: N` while rushing because it can't reliably evaluate its own state under load.

**What to change in your system:**

**File: `qe-quality-assurance.md`** — Add a note to Skill 10 (Uncertainty Calibrator):

> **Adversarial Hardening Note:** Self-reported confidence is unreliable under context pressure (documented in "Agents of Chaos" study — agents self-reported inaccurately under load). Where possible, anchor confidence to EXTERNAL evidence: count of sources found, percentage of claims with Level 2 verification, number of counterarguments addressed. Self-assessed confidence should be a SECONDARY signal, not the primary one.

**File: `marc-ops-framework.md`** — Add a note to Accelerator L3 (Staleness Detection):

> **Implementation Note:** Do not rely solely on the AI noticing its own artifacts are stale. Where possible, use file timestamps (ls -la) or programmatic checks rather than self-assessment. Self-monitoring degrades under the same conditions that cause staleness.

**File: `check-protocol.md`** — Strengthen Step 4 (Staleness Sweep):

> When checking staleness, prefer file system evidence (modification timestamps, file sizes) over self-reported assessment. If the staleness-map.md was last updated 3+ hours ago, it is stale BY DEFINITION regardless of what the AI believes about its currency.

---

## Recommendation 3: Add Concept-Level Gate Checking (Beyond Keywords)

**Source:** Agents of Chaos — Semantic Reframing finding

**The problem:** Your forbidden rationalization lists block specific phrases. The study showed models coin NEW rationalizations not on the list. Your R-07 says "complete research before analysis" — the AI satisfies the keyword ("research complete") while violating the concept (surface-level research). Gates that check keywords are always one step behind the model's ability to generate novel justifications.

**What to change in your system:**

**File: `qe-quality-assurance.md`** — Add to Skill 7 (Verification Operator):

> **Concept-Level Verification:** When verifying claims, do not check only whether the claim EXISTS in a source. Verify that the claim MEANS what it's being used to mean. A statistic that's technically accurate but taken out of context, applied to a different population, or cited from a superseded study fails concept-level verification even if it passes keyword-level verification.

**File: `marc-ops-framework.md`** — Add a meta-rule about forbidden rationalizations:

> **R-21 (proposed): Rationalization Evolution.** The forbidden rationalization lists in anti-degradation files block known phrases. Models generate novel rationalizations not on the list. When a NEW rationalization is detected (during self-audit, check, or human correction), add it to the list AND evaluate whether the existing list items share an underlying PATTERN that can be blocked at the concept level rather than the phrase level. Prefer concept-level blocks ("do not justify skipping a required step for any reason") over phrase-level blocks ("do not say 'close enough'").

---

## Recommendation 4: Add Active Recitation Protocol

**Source:** Manus Article — Lesson 4 (Manipulate Attention Through Recitation)

**The problem:** Your L3 (Staleness Detection) flags artifacts that haven't been updated. But it's reactive — it detects drift after it happens. Manus discovered that proactively REWRITING the current objective at the end of context keeps it in the AI's freshest attention zone, preventing drift before it starts. They call this "recitation."

**What to change in your system:**

**File: `qe-system-maintenance.md`** — Add to Skill 13 (Long-Context Hygiene):

> **Recitation Protocol:** In sessions exceeding 7 turns or 4K tokens, periodically restate the current objective and active constraints at the END of the context (not just check for staleness). This pushes the global plan into the model's recent attention span, avoiding the "lost-in-the-middle" problem where information in the middle of long contexts receives less attention than information at the beginning or end.
>
> Implementation: After every 5th tool call or major phase transition, append a brief restatement: "Current objective: [X]. Active constraints: [Y]. Next action: [Z]." This is not a status report — it's an attention manipulation technique.

---

## Recommendation 5: Add Controlled Diversity for Repetitive Operations

**Source:** Manus Article — Lesson 6 (Don't Few-Shot Yourself)

**The problem:** When the AI processes multiple similar items (reviewing 5 documents, evaluating 3 options, scoring 4 candidates), it falls into a pattern — copying its own format and approach from item to item, even when the next item requires a different approach. The context becomes a trap where the AI few-shots itself into repetitive behavior.

**What to change in your system:**

**File: `qe-quality-assurance.md`** — Add to Skill 8 (Adversarial Critic):

> **Anti-Mimicry Protocol:** When running adversarial critique on multiple deliverables in the same session, vary the attack approach between items. Do not reuse the same 5 dimensions in the same order. Rotate which dimension leads. This prevents the AI from falling into a pattern where each critique mimics the structure of the previous one rather than genuinely attacking the specific deliverable.

**File: `marc-ops-framework.md`** — Add a standing preference or new rule:

> **R-22 (proposed): Batch Diversity.** When processing 3+ similar items in sequence (scoring, evaluating, reviewing), introduce controlled variation between items: vary the evaluation order, lead with a different dimension, or reframe the question. Uniform processing of similar items causes pattern mimicry where the AI copies its own approach rather than evaluating each item independently.

---

## Recommendation 6: Add File Integrity Verification to Session Bootstrap

**Source:** Agents of Chaos — Markdown File Injection finding

**The problem:** Your `initialize` command reads 11 operational files and trusts their contents. In a shared environment (or even across your own sessions), files can be accidentally modified — a merge conflict resolution deletes a rule, a threshold gets changed, a new version introduces a gap. The system has no mechanism to detect that its own enforcement files have changed.

**What to change in your system:**

**File: `session-bootstrap.md`** — Add to Step 1 (Read Operational Files):

> **File Integrity Check:** After reading all operational files, verify expected rule counts: 13 directives (D-01 through D-13), 20 preventive rules (R-01 through R-20), 12 accelerators (Q1-Q6, L1-L6). If any count doesn't match, FLAG before proceeding — a rule may have been accidentally deleted or modified.
>
> For critical files (marc-ops-framework.md, source-verification.md), check that the version number matches the expected version. If it has changed since last session, report the change before proceeding.

**Note:** Your session-bootstrap.md already reports rule counts (33 expected) in Step 6. Strengthen this from a STATUS REPORT to a GATE — if the count doesn't match, it's a FLAG, not just information.

---

## Recommendation 7: Add Proportionality Calibration for Creative Tasks

**Source:** Agents of Chaos — Proportionality finding

**The problem:** Your system is enforcement-heavy: 13 directives, 20 preventive rules, 12 accelerators, forbidden rationalization lists. The Agents of Chaos study found that aggressive enforcement (HALT triggers, forbidden lists) causes the AI to optimize for gate-passing rather than quality. It produces safe, generic output to avoid triggering a violation — suppressing bold creative choices.

**What to change in your system:**

**File: `qe-strategic-reasoning.md`** — Add to Skill 1 (Task Triage):

> **Enforcement Calibration by Task Type:** When the task is classified as CREATIVE (brainstorming, ideation, concept generation, drafting), reduce enforcement weight during the generation phase. Apply full enforcement AFTER generation (during verification, Skills 7-12), not DURING generation (Skills 4-6). Creative tasks benefit from unconstrained generation followed by rigorous verification, not from constrained generation.
>
> Specifically: During creative generation, suppress forbidden rationalization scanning and HALT triggers. Re-enable them during verification. This prevents the model from self-censoring bold ideas to avoid triggering enforcement.

---

## Recommendation 8: Isolated Verification Context

**Source:** Agents of Chaos — Cross-Agent Propagation finding

**The problem:** Your `self-audit` and `check` commands run in the same session context as the work being audited. The Agents of Chaos study proved that verification agents in the same context as the generation agent INHERIT the generation agent's degraded behavior patterns. The verifier is contaminated by the same context that caused the problem.

**What to change in your system:**

**File: `self-audit.md`** — Add an implementation note:

> **Fresh Context Preference:** When possible, run the self-audit in a NEW session rather than the same session that produced the deliverable. A fresh context cannot inherit the generating session's degraded patterns, anchoring biases, or rationalization momentum. If a fresh session isn't possible, at minimum insert a context break (restate the audit objective from scratch) before beginning the audit.

**File: `check-protocol.md`** — Add the same note:

> **Fresh Context Preference:** The CHECK command is most effective when run in a session that did NOT produce the work being checked. If run in the same session, the checking context is contaminated by the same pressures that caused any compliance failures.

---

## Summary: Priority Order

| # | Recommendation | Effort | Impact | Source |
|---|---|---|---|---|
| 1 | Cache-aware context design | Low | Medium | Manus |
| 2 | External evidence over self-monitoring | Medium | **High** | Agents of Chaos |
| 3 | Concept-level gates (beyond keywords) | Medium | **High** | Agents of Chaos |
| 4 | Active recitation protocol | Low | Medium | Manus |
| 5 | Controlled diversity for batches | Low | Medium | Manus |
| 6 | File integrity verification | Low | Medium | Agents of Chaos |
| 7 | Proportionality calibration for creative tasks | Medium | **High** | Agents of Chaos |
| 8 | Isolated verification context | Low | **High** | Agents of Chaos |

**Start with:** #2, #3, #7, #8 (highest impact). Then #1, #4, #5, #6 (efficiency and hardening).

---

*Analysis based on: Manus "Context Engineering for AI Agents" (July 2025), Rich Schefren "Project Operations Protocol — The Missing Layer" (Feb 2026), "Agents of Chaos" (arXiv:2602.20021), and direct filesystem review of all 16 QE skills + ops framework.*
