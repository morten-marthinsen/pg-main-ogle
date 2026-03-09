# Marketing-OS — Recommendations Handoff

**Date:** 2026-03-07
**For:** Tony Flo / Marketing-OS maintainers
**From:** Donnie French + Claude Opus 4.6 analysis session
**Scope:** Recommendations for the Marketing-OS ONLY (67-skill copywriting pipeline at `_performance-golf/pg-marketing-os/`)
**Sources:** Manus "Context Engineering for AI Agents" (July 2025), Rich Schefren "Project Operations Protocol — The Missing Layer" (Feb 2026), "Agents of Chaos" red-teaming study (arXiv:2602.20021, March 2026), Marc Stockman Quality Engine gap analysis

---

## What Marketing-OS Already Gets Right

These areas are validated by external research:

- **Arena system (Agent Teams mode)** — Isolated contexts per persona. Manus confirms: isolated contexts prevent cross-agent contamination. Agents of Chaos confirms: shared context causes behavior propagation between agents.
- **Context Reservoir (human-curated)** — The single strongest architectural feature. Agents of Chaos says human gates that break the automation chain are the most resilient components. The context reservoir forces human verification at the Foundation → Copy boundary.
- **Claim Verification Protocol** — TIER 1 zero-tolerance with proof_id tracing. Marc's R-20 (Source Verification) is the same principle. Both systems independently arrived at the same solution.
- **Per-microskill output files** — File existence proves execution happened. Manus says "use the file system as context." Your per-microskill output protocol is this principle applied to every step.
- **Anti-Degradation checkpoint files** (LAYER_N_COMPLETE.yaml) — Structural enforcement that cannot be bypassed. Manus validates: append-only, file-based state is the correct architecture.

---

## Recommendation 1: Break the Cascading Prose Single Point of Failure

**Source:** Agents of Chaos — False Completion Propagation

**The problem:** Skills 11-17 each read the previous skill's actual prose. If Skill 11 (Lead) produces weak output and reports completion, Skills 12-17 build on degraded prose. The handoff registry checks field presence and file size but NOT prose quality. A 650-word lead that hits the size threshold but uses weak language, misses the FSSIT anchor, or drifts from the mechanism passes every gate.

The Agents of Chaos study proved this exact pattern: agents building on other agents' false reports, with degradation compounding through every layer.

**What to change:**

**File: `CLAUDE-CORE.md`** — Add a prose quality checkpoint:

> **Prose Quality Gate (Skills 11-17):** Before any copy skill reads the previous skill's assembled prose, verify prose quality — not just file existence and size. Check: Does the prose serve the confirmed root angle? Does it use language from the expression anchoring top performers? Does it maintain the voice established in Soul.md? If any dimension scores below threshold, FLAG before the downstream skill builds on it.

**File: `pipeline-handoff-registry.md`** — Add prose quality fields to handoffs 11-17:

> For each copy skill handoff, add:
> - `prose_quality_verified: true|false`
> - `voice_consistency_with_upstream: [score]`
> - `root_angle_drift_check: PASS|FLAG`

**The ideal fix (higher effort):** Run a lightweight verification of prose quality in a FRESH context at the midpoint (after Skills 11-13, before 14-17). A fresh context cannot inherit the generating session's degraded patterns. This catches Foundation-level problems before they propagate through the entire second half of copy generation.

---

## Recommendation 2: Add Adaptive Convergence to the Arena

**Source:** Manus — Lesson 1 (Resource Exhaustion) + Agents of Chaos — Resource Exhaustion finding

**The problem:** The Arena always runs exactly 3 rounds. Manus documented agents looping for 9 days consuming 60,000+ tokens without self-detecting diminishing returns. The Agents of Chaos study confirmed agents don't self-detect when they're stuck. Your Arena has no mechanism to detect when Round 3 isn't producing meaningful improvement over Round 2.

**What to change:**

**File: `skills/ARENA-CORE-PROTOCOL.md`** — Add convergence assessment:

> **Adaptive Convergence Check (after Round 2):**
> Compare Round 2 winner scores against Round 1 winner scores across all scoring dimensions.
> - If Round 2 winner scores 9.0+ across ALL dimensions AND leads Round 1 by 2+ points → offer early exit to human (Round 3 likely produces marginal improvement)
> - If Round 2 scores are within 0.5 points of Round 1 across all dimensions → FLAG: competitors may be converging on similar output. Consider injecting diversity before Round 3.
>
> **Post-Round 3 Quality Floor:**
> - If Round 3 winner scores below 7.0 on ANY dimension → FLAG for human review before shipping
> - Keep 3 rounds as default. Early exit and late extension are human decisions, not automated.

---

## Recommendation 3: Add Injection Screening to Skill Loading

**Source:** Agents of Chaos — Markdown File Injection finding

**The problem:** The entire system is markdown files in a shared GitHub repo. The Agents of Chaos study proved that agents referencing externally-editable markdown "constitutions" execute planted instructions without question. In Marketing-OS, this isn't about malicious attack — it's about accidental drift. Someone resolves a merge conflict and accidentally deletes a forbidden rationalization. Someone updates a microskill spec and changes a threshold. The system has no mechanism to detect that its own enforcement files have changed.

**What to change:**

**File: `CLAUDE-CORE.md`** — Add a file integrity rule:

> **Configuration Integrity Check:** At session start, verify that core enforcement files have not been modified since last known-good state:
> - Count the 7 Laws — must be exactly 7
> - Count forbidden behaviors — must match expected count
> - Verify ANTI-DEGRADATION.md files exist for all active skills
> - If any CLAUDE-CORE.md, LLM-ANTI-DEGRADATION-SYSTEM.md, or ARENA-CORE-PROTOCOL.md has a different git hash than expected, FLAG before proceeding

**Practical approach:** Add a simple check to session start: `git diff --name-only HEAD~5 -- CLAUDE-CORE.md LLM-ANTI-DEGRADATION-SYSTEM.md skills/ARENA-CORE-PROTOCOL.md`. If any of these files changed in recent commits, report the changes before starting work.

---

## Recommendation 4: Address the Proportionality Problem in Enforcement

**Source:** Agents of Chaos — Proportionality finding

**The problem:** Aggressive HALT triggers (< 1000 quotes = HALT, forbidden rationalization lists, gate failures) cause the model to optimize for gate-passing rather than quality. The AI produces safe, generic, surface-level output to avoid triggering a violation. The enforcement itself suppresses bold creative choices.

This is documented in Marketing-OS's own history: the model produces 1000 quotes that technically pass the count but include duplicates, thin entries, and miscategorized items. It satisfied the KEYWORD (1000 items) while violating the CONCEPT (deep, emotionally rich research).

**What to change:**

**File: `CLAUDE-CORE.md`** — Add an enforcement calibration principle:

> **Enforcement Calibration:** Enforcement gates exist to catch genuine failures, not to constrain creative range. During GENERATION phases (Skills 10-17 copy production, Arena competitor generation), the model should generate boldly without self-censoring to avoid gate triggers. During VERIFICATION phases (gate checks, Arena scoring, editorial), apply full enforcement rigor. The sequence is: generate freely → verify strictly. Not: constrain generation → verify what's left.

**File: `LLM-ANTI-DEGRADATION-SYSTEM.md`** — Add a note about proportionality:

> **Proportionality Principle:** HALT triggers are for genuine failures (skipped layers, fabricated data, missing files), not for creative boldness. A mechanism name that is provocative but accurately describes the science should NOT trigger HALT. A root cause framing that challenges conventional wisdom should NOT trigger HALT. If the model is producing safe, generic output, consider whether enforcement is suppressing creativity rather than catching errors.

---

## Recommendation 5: Add Active Recitation to Long Copy Sessions

**Source:** Manus — Lesson 4 (Manipulate Attention Through Recitation)

**The problem:** Copy sessions (Sessions 4-6) run Skills 10-17 sequentially, with context growing at every step. By Skill 17 (Close), the model is working with a massive context. The model's attention to early instructions (CLAUDE-CORE.md rules, Soul.md voice, Campaign Brief strategic anchors) degrades as context grows — the "lost in the middle" problem.

**What to change:**

**File: `SESSION-ARCHITECTURE.md`** — Add recitation guidance:

> **Mid-Session Recitation (Copy Sessions 4-6):** At the midpoint of each copy session (after completing 2 of 4 skills), restate:
> 1. The root angle (1-4 words)
> 2. The mechanism name
> 3. The Soul.md voice register and energy signature
> 4. The top 3 FSSIT candidates
>
> This is not a status check — it's an attention manipulation technique. By restating strategic anchors at the END of the current context, you push them into the model's recent attention span, preventing drift from the campaign's core identity.

---

## Recommendation 6: Controlled Diversity in Arena Rounds

**Source:** Manus — Lesson 6 (Don't Few-Shot Yourself)

**The problem:** If Arena Round 1 produces 7 outputs with similar structure, the model falls into that pattern for Rounds 2 and 3 — mimicking its own output format rather than genuinely exploring different approaches. The context becomes a trap where the AI few-shots itself into convergent behavior.

**What to change:**

**File: `skills/protocols/ARENA-DIVERSITY-PROTOCOL.md`** (already exists — validate it covers this):

> Verify that the protocol includes: between Arena rounds, vary the presentation order of competitors, vary which dimension is emphasized in the learning brief, and introduce at least one structural constraint that differs from the previous round (e.g., Round 2 requires a different opening structure than Round 1, Round 3 requires a different proof placement strategy). The goal is to prevent pattern mimicry across rounds.

**Note:** The newly merged ARENA-DIVERSITY-PROTOCOL.md and BRAINSTORM-DIVERSITY-PROTOCOL.md may already cover this. Verify and strengthen if needed.

---

## Recommendation 7: Isolated Verification for Self-Audit

**Source:** Agents of Chaos — Cross-Agent Propagation

**The problem:** When the Editorial skill (Skill 20) runs its six-lens review in the same session that generated the copy, it shares context with the generation process. The Agents of Chaos study proved that verification agents in the same context inherit the generation agent's degraded patterns. The editor is contaminated by the same context that produced the problems.

**What to change:**

**File: `SESSION-ARCHITECTURE.md`** — Add a recommendation for Session 6 (Assembly & Editorial):

> **Fresh Context for Editorial:** Where possible, run Skill 20 (Editorial) in a new session rather than the same session that ran Skills 18-19 (Proof Weaving, Assembly). Load: the assembled draft, the Campaign Brief, the Context Reservoir, and Soul.md. Do NOT load the generation session's conversation history. A fresh editorial context catches problems that an in-session editorial misses because it hasn't inherited the generation session's assumptions.

---

## Recommendation 8: Downstream-to-Foundation Feedback Signal

**Source:** Agents of Chaos — Single Point of Failure finding

**The problem:** Foundation skills (00-09) run once per product. Everything downstream builds on Foundation decisions. If the mechanism doesn't translate to persuasive prose, or the root cause framing doesn't resonate when written as narrative, there's no mechanism to flag this. Foundation decisions are permanent by design — but they shouldn't be immune to evidence from downstream execution.

**What to change:**

**File: `CLAUDE-CORE.md` or `SESSION-ARCHITECTURE.md`** — Add a Foundation Integrity Check:

> **Foundation Integrity Check (after Session 4, before Session 5):** After completing Skills 10-13 (first half of copy), perform a lightweight check:
> 1. Does the mechanism name translate naturally into prose? (If the mechanism narrative required extensive explanation that didn't exist in the mechanism package, FLAG)
> 2. Does the root cause framing resonate in narrative form? (If the root cause narrative felt forced or required significant reframing, FLAG)
> 3. Does the expression anchoring hold up in full prose? (If the winning expressions feel different embedded in paragraphs vs. standalone, FLAG)
>
> If any FLAG: document in the Context Reservoir update and consider whether Foundation decisions need human review before continuing to Skills 14-17.

---

## Summary: Priority Order

| # | Recommendation | Effort | Impact | Source |
|---|---|---|---|---|
| 1 | Break cascading prose single point of failure | High | **Critical** | Agents of Chaos |
| 2 | Adaptive Arena convergence | Medium | **High** | Manus + Agents of Chaos |
| 3 | Injection screening / file integrity | Low | Medium | Agents of Chaos |
| 4 | Proportionality calibration | Medium | **High** | Agents of Chaos |
| 5 | Active recitation in copy sessions | Low | Medium | Manus |
| 6 | Controlled diversity in Arena rounds | Low | Medium | Manus |
| 7 | Isolated verification for editorial | Medium | **High** | Agents of Chaos |
| 8 | Downstream-to-Foundation feedback | Medium | **High** | Agents of Chaos |

**Start with:** #1 (cascading prose is the highest-risk architectural feature), then #4, #7, #8 (all high-impact). Then #2, #3, #5, #6 (hardening and efficiency).

---

*Analysis based on: Manus "Context Engineering for AI Agents" (July 2025), Rich Schefren "Project Operations Protocol — The Missing Layer" (Feb 2026), "Agents of Chaos" (arXiv:2602.20021), and direct filesystem review of Marketing-OS v4.1.*
