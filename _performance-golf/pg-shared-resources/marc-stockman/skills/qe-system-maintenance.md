---
name: qe-system-maintenance
version: 1.1
updated: 2026-03-06
author: Marc Stockman
description: Quality Engine Conditional Extensions and System Maintenance — Long-Context Hygiene, Knowledge Grounding, Meta-Prompt Refiner, LLM-as-Judge, L3/L4/L5 integration
scope: Conditional pipeline extensions and system health operations
trigger: Long conversations, external sources, prompt maintenance, quality evaluation, system optimization
---

# Quality Engine — Conditional Extensions & System Maintenance

**Version:** 1.1 | March 6, 2026
**Category:** Quality Engine — Tiers 2-3
**QE Skills Covered:** Skill 13 (Long-Context Hygiene & Drift Control), Skill 14 (Knowledge Grounding & Source Discipline), Skill 15 (Meta-Prompt Refiner), Skill 16 (LLM-as-Judge Evaluator)
**Accelerator Integration:** L3 (Staleness Detection), L4 (Context Continuity), L5 (System Optimization)
**Pipeline Position:** Skills 13-14 augment the per-query pipeline when triggered. Skills 15-16 operate outside the pipeline for system health.

---

## Purpose

The core Quality Engine (Skills 1-12 in qe-strategic-reasoning, qe-reasoning-engine, qe-quality-assurance) runs on every query. This skill covers the specialists that only activate under specific conditions:

- **Tier 2 (Conditional Extensions):** Skills that join the pipeline for specific queries when their trigger condition is met, but don't add overhead to every query.
- **Tier 3 (System Maintenance):** Skills that operate on the system itself — tuning prompts, running regression tests, evaluating quality across batches. They improve the machinery between production runs.
- **Accelerator L3/L4/L5 Integration:** Operational procedures for session-level system health that complement the per-query pipeline.

---

## Relationship to Existing Skills

**DEFER TO `session-bootstrap`** for the initialize command. session-bootstrap handles session start (reading operational files, searching memory, checking for interrupted audits, presenting status). This skill's L4 integration provides the detailed context continuity procedures that session-bootstrap's protocol references.

**DEFER TO `marc-ops-framework`** for standing rules and Accelerator summaries. This skill provides the detailed implementation procedures for L3, L4, and L5 that marc-ops-framework summarizes.

**DEFER TO `source-verification`** for R-20 Level 2 verification procedures. Skill 14 (Knowledge Grounding) references source-verification's protocol when external sources are present.

**DEFER TO `self-audit`** for post-delivery quality loops. Skill 16 (LLM-as-Judge) is a maintenance tool; self-audit is the user-triggered quality protocol.

---

## Tier 2: Conditional Extension Skills

### Skill 13: Long-Context Hygiene & Drift Control

#### Cognitive Job

Compress context into stable summary artifacts, maintain a constraint ledger across turns, detect and correct drift.

#### Provenance

GPT Skill 18 (Long-Context Hygiene). Claude's re-injection heuristic (every 5-7 turns) informed the activation trigger. Only GPT addressed long-context scenarios with a dedicated skill.

#### When It Fires

Conditional — activates when EITHER:
- Input context exceeds ~4,000 tokens (LONG_CONTEXT_THRESHOLD), OR
- Conversation exceeds ~7 turns (LONG_CONVERSATION_THRESHOLD)

When triggered, runs early — before Phase 2 (Plan & Reason) — to produce working-memory artifacts.

#### Procedure

**1. Context Compression:**
Compress the full context into a Stable Summary:
- Max 200 words
- Facts only — no speculation, no interpretation
- Structured as: Objective, Key Facts, Open Constraints, Decisions Already Made

**2. Constraint Ledger Update:**
Maintain a running constraint ledger (max 12 bullets):
- What has been agreed/decided
- What constraints are still active
- What has changed since the last check

**3. Open Questions Tracker:**
Maintain an open questions list (max 7):
- Unresolved ambiguities
- Items deferred for later
- Dependencies on external information

**4. Drift Detection:**
At each activation, compare current context against the Stable Summary:
- Has the objective shifted without explicit acknowledgment?
- Have any constraints been silently dropped?
- Is the conversation drifting from the anchored objective?

If drift detected: surface to Marc ("I notice we've moved from [original objective] to [current direction]. Is that intentional?")

**5. Re-injection:**
Downstream skills use the Stable Summary, Constraint Ledger, and Open Questions as their context input instead of the raw full conversation. This prevents the "lost in the middle" phenomenon.

#### Effort Scaling

- **Fast:** Lightweight — Stable Summary only, no drift detection
- **Standard:** Full procedure — summary + ledger + open questions + drift detection
- **Thorough:** Full procedure + explicit comparison of current vs. prior summary + deep drift analysis

---

### Skill 14: Knowledge Grounding & Source Discipline

#### Cognitive Job

Enforce strict retrieval discipline when external sources are present. Map claims to specific sources, distinguish knowledge types, prevent fabricated citations.

#### Provenance

Claude Skill 8, Gemini Skill 1 (chunk IDs), GPT Skills 6 + 17, Perplexity Skill 7.

#### When It Fires

Conditional — activates when external sources, RAG chunks, or retrieved documents are provided as context for the query.

Does NOT fire for internal-knowledge-only queries (adds unnecessary overhead for simple questions).

#### Procedure

**1. Source Boundary Enforcement:**
When grounding context is provided, the answer must be based on that context. Flag any claim that goes beyond provided sources.

**2. Knowledge Classification:**
For every factual claim in the output, classify:

| Type | Meaning | Citation Required |
|------|---------|-------------------|
| **SOURCED** | Directly stated in provided sources | Yes — cite source ID |
| **INFERRED** | Logical inference from provided sources | Yes — prefix with "Based on [source], it follows that..." |
| **EXTERNAL** | From the model's own knowledge, not in sources | Flag explicitly — "Note: this is not from the provided sources" |

**3. Citation Enforcement:**
- Every SOURCED claim must cite a specific source identifier
- Tier 1 claims (per source-verification / R-20) must be Level 2 verified
- No fabricated citations — if a source doesn't support a claim, don't cite it

**4. Information Gaps:**
Produce a gaps list: what questions does the source material NOT answer that the query requires?

#### Effort Scaling

- **Fast:** Source boundary enforcement only — flag claims outside provided sources
- **Standard:** Full procedure — classification, citation enforcement, gaps list
- **Thorough:** Full procedure + explicit claims-to-sources table + exhaustive gaps analysis

---

## Tier 3: System Maintenance Skills

### Skill 15: Meta-Prompt Refiner

#### Cognitive Job

Diagnose prompt failures, propose targeted fixes, produce revised prompt, predict improvements and regressions.

#### Provenance

All four source reports include meta-prompting. Gemini Skill 8 (OPRO/STaR), GPT Skills 21 + 22 (consolidated), Claude Skill 11, Perplexity Skill 8.

#### When It Fires

Outside the per-query pipeline. Triggers:
- Marc says "audit this" (prompt-level audit, not deliverable-level)
- Systematic failures detected (same error pattern 2+ times)
- Periodic prompt maintenance
- L5 (System Optimization) identifies prompt-level issues

#### Procedure

**1. Diagnose the failure:**
- What went wrong? (specific failure, not vague "wasn't good enough")
- Root cause classification: ambiguity, missing constraints, wrong framing, conflicting instructions, scope creep, or wrong audience assumptions

**2. Propose targeted fixes (max 3 changes per iteration):**

Per minimal-change principle — optimize for robustness, not cleverness:
- Each fix must address a diagnosed root cause
- Each fix must predict what it improves AND what could regress
- Limit to 3 changes to prevent cascading unintended effects

**3. Produce revised prompt:**
Complete rewrite incorporating the 3 fixes. Not a diff — the full revised version.

**4. Generate regression test cases:**
For each fix: 2-3 test scenarios that would detect if the fix caused a regression elsewhere.

**5. Expected improvement assessment:**
- What should get better (specific, testable)
- What could get worse (specific risks)
- Recommended monitoring period before considering the fix permanent

#### Integration with L2 (Same-Turn Lesson Promotion)

If the meta-prompt revision surfaces a pattern that should become a permanent rule:
- Document it per L2's bounded trial mechanism
- Present to Marc for approval — never auto-apply rule changes
- If approved: promote to permanent rule in persistent-rules.md

---

### Skill 16: LLM-as-Judge Evaluator

#### Cognitive Job

Score an answer against a structured rubric. Mitigate known judge biases. Support quality measurement across batches.

#### Provenance

All four source reports. Gemini Skill 9 (G-Eval/Prometheus), GPT Skills 19 + 20, Claude Skill 13, Perplexity Skill 9.

#### When It Fires

Outside the per-query pipeline. Triggers:
- A/B testing (comparing two response approaches)
- Regression testing (verifying skill changes didn't degrade quality)
- Quality audit (systematic evaluation of outputs)
- Thorough mode self-evaluation before delivery (optional inline use)

#### Procedure

**1. Apply structured rubric (5 dimensions, 1-5 scale):**

| Dimension | 1 (Poor) | 3 (Adequate) | 5 (Excellent) |
|-----------|----------|-------------|---------------|
| **Accuracy** | Multiple factual errors | Generally accurate, minor issues | All claims verified and correct |
| **Completeness** | Major gaps in coverage | Covers main points, some gaps | Comprehensive, no significant gaps |
| **Relevance** | Addresses wrong problem | Mostly on-target | Precisely addresses the objective |
| **Reasoning Quality** | Logical errors, unsupported claims | Sound reasoning, some leaps | Rigorous, well-supported throughout |
| **Calibration** | Confident about wrong things | Mostly appropriate confidence | Confidence precisely matches evidence |

**2. Generate reasoning before scoring** (G-Eval pattern):
For each dimension, write the reasoning BEFORE assigning the score. This prevents score-first-justify-later bias.

**3. Mitigate known biases:**
- **Position bias:** When comparing two responses, evaluate each independently before comparing
- **Verbosity bias:** Do not favor longer answers. Score on substance per word, not total output.
- **Self-enhancement bias:** Be especially critical of outputs that sound confident but lack evidence

**4. Produce verdict:**
- Dimension scores (1-5 each)
- Justifications (1-2 sentences each)
- Composite score (average)
- Verdict: PASS (composite ≥ 3.5) / MARGINAL (2.5-3.4) / FAIL (< 2.5)
- Top improvement recommendation

---

## Accelerator L3/L4/L5 Integration

### L3: Mid-Session Staleness Detection

**Per marc-ops-framework:** After any change, check if you just made something else stale.

**Detailed procedure (from Accelerator L3):**

1. After every file creation or modification, run a cascade check:
   - Does any other file reference the file I just changed?
   - Are there version numbers, dates, or counts that need updating?
   - Did I just make a decision that invalidates an earlier artifact?

2. **Staleness triggers:**
   - Any artifact not updated in 2+ hours
   - Any artifact not updated after 3+ major actions
   - Any file path reference that points to moved or deleted files

3. **If staleness detected:** Flag immediately. Update or note in staleness-map.md.

### L4: Context Continuity

**DEFERS TO `session-bootstrap`** for the initialize command itself.

**Detailed procedure (from Accelerator L4, 15 steps across 4 sections):**

**Section A — Session Start (handled by session-bootstrap):**
- Read operational files
- Search memory for context
- Check for interrupted audits
- Present session status

**Section B — During Session:**
- Maintain reasoning log currency (update after every major action)
- Check constraint ledger against active work
- Verify commitment registry accuracy

**Section C — Before Compaction (when context window pressure detected):**
- Write comprehensive summary to workspace
- Include: active tasks, open decisions, key context, file locations
- Ensure all critical state is persisted outside the context window

**Section D — After Resume (after context reload or new thread):**
- Read the summary from Section C
- Verify all referenced files still exist
- Identify any gaps between saved state and current reality
- Surface gaps to Marc

### L5: Periodic System Optimization

**Detailed procedure (from Accelerator L5):**

**Rule Integrity Audit:**
1. Review all rules (D-01–D-13, R-01–R-20, Q1–Q6, L1–L6) against recent session learnings
2. For each rule: Is it still relevant? Has it been superseded? Is it being followed consistently?
3. Classify issues per check-protocol Step 7 taxonomy: (a) missing, (b) incomplete, (c) not followed, (d) net-new gap

**System-Wide Optimization Sweep:**
1. Are there operational files that have gone stale?
2. Are there rules that conflict with each other?
3. Are there skills that overlap without clear defer-to clauses?
4. Are there recurring patterns in self-audit/CHECK findings that indicate a systemic gap?

**Meta-Framework Benchmarking:**
Periodically compare the skill system against external best practices and emerging patterns:
1. Have new reasoning frameworks or prompting techniques emerged that could strengthen the QE pipeline?
2. Are there documented failure modes in LLM-based systems that the current rules don't address?
3. Does the skill system architecture still reflect the best understanding of how to structure AI operating systems?
4. Present findings to Marc as an optimization proposal — never auto-apply changes to the framework.

This step prevents the system from becoming a closed loop that only optimizes against its own history.

**Output:** Optimization report with specific, actionable recommendations. Present to Marc for approval before any changes.

---

## Conditional Skill Activation Summary

| Skill | Trigger | Pipeline Position | Default State |
|-------|---------|-------------------|---------------|
| 13 (Long-Context) | Input > 4,000 tokens OR conversation > 7 turns | Before Phase 2 | Dormant |
| 14 (Knowledge Grounding) | External sources / RAG context provided | After Phase 4 (post-verification) | Dormant |
| 15 (Meta-Prompt) | "audit this" / systematic failures / periodic maintenance | Outside pipeline | On-demand |
| 16 (LLM-as-Judge) | A/B testing / regression testing / quality audit | Outside pipeline | On-demand |

---

## System Health Quick Reference

| Health Check | Frequency | Procedure | Owner |
|-------------|-----------|-----------|-------|
| Staleness detection (L3) | After every change | Cascade check on related artifacts | This skill |
| Reasoning log currency | Continuous | Flag after 2hrs or 3 major actions | This skill + check-protocol |
| Context continuity (L4) | Session start + before compaction | 15-step protocol across 4 sections | session-bootstrap (start) + this skill (ongoing) |
| System optimization (L5) | Periodic / when patterns detected | Rule integrity audit + sweep | This skill |
| Prompt maintenance (Skill 15) | On systematic failures or request | Diagnose → fix → test → monitor | This skill |
| Quality evaluation (Skill 16) | On request / A/B tests | Rubric scoring + bias mitigation | This skill |

---

*Quality Engine Tiers 2-3. Conditional extensions augment the per-query pipeline (qe-strategic-reasoning → qe-reasoning-engine → qe-quality-assurance). Maintenance skills operate on the system between production runs.*

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Self Audit | NOT RUN | — | — | — |
| CHECK | NOT RUN | — | — | — |