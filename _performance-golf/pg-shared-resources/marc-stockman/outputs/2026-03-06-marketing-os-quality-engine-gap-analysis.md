# Marketing-OS vs. Marc Stockman Quality Engine — Gap Analysis & Integration Proposal

**Date:** 2026-03-06
**Analyst:** Claude Opus 4.6 (per Part 6 instructions in Quality-Engine-Explainer-For-Donnie.md)
**Target System:** PG Marketing-OS (67-skill copywriting pipeline at `_performance-golf/pg-marketing-os/`)
**Reference System:** Marc Stockman Quality Engine (16-skill QE + 12 Accelerators + Ops Framework)
**Confidence:** High on structural mapping, medium on runtime impact (no live pipeline execution performed)

---

## Executive Summary

Marketing-OS is a **domain-specialized production system** — 67 skills, 7 engines, Arena competition, specimen libraries, expression anchoring, and deep anti-degradation enforcement. Marc's Quality Engine is a **domain-agnostic meta-quality layer** — task triage, structured reasoning, adversarial testing, uncertainty calibration, and self-learning infrastructure.

**The two systems are complementary, not competitive.** Marketing-OS excels at *what* to produce and *how* to produce it (copywriting pipeline). Marc's QE excels at *how to think before producing* and *how to verify after producing* (cognitive discipline pipeline).

**Net assessment:** Marketing-OS already covers ~60% of Marc's capabilities through its own mechanisms (Anti-Degradation, Arena, claim verification, expression anchoring). The remaining ~40% represents genuine gaps — particularly in pre-execution reasoning, uncertainty quantification, convergence governance, and structured self-learning.

---

## Part 1: Mapping Marc's 12 Accelerator Rules Against Marketing-OS

| Rule | Marc's Capability | Marketing-OS Equivalent | Verdict |
|------|------------------|------------------------|---------|
| **Q1** Structured Pre-Action Reasoning (enhanced ThoughtPad) | Domain classification (Cynefin), tempo calibration, pre-mortem, rollback planning | **Partial.** MC-CHECK protocol provides metacognitive checkpoints. Anti-Degradation enforces "read before execute." But no explicit domain classification, tempo calibration, or rollback planning before each action. | GAP |
| **Q2** Runbook Execution | Follow known playbooks instead of reinventing | **Strong coverage.** The entire 67-skill pipeline IS a runbook system. SKILL.md files are detailed playbooks. CLAUDE-SKILL-INDEX.md routes to the right one. | COVERED |
| **Q3** Multi-Pass Quality Audit | Visual formatting verification, Cascade Share Gate | **Partial.** Arena system provides multi-pass quality via 3 rounds + adversarial critic. Claim verification protocol covers factual accuracy. But no visual formatting verification or file-share tracking (Cascade Share Gate). | PARTIAL |
| **Q4** Scalability Checkpoint | Vertical, horizontal, and extraction tests for repeatability | **Partial.** The Vertical Profile System (5 verticals) shows scalability thinking. But no per-deliverable scalability checkpoint asking "could this be repeated or scaled?" | MINOR GAP |
| **Q5** Risk Anticipation & Mitigation | Klein pre-mortem + FMEA scoring + Amazon doors | **Not present.** No structured pre-mortem, no FMEA scoring, no one-way/two-way door classification. The Arena's adversarial critic catches weaknesses in *copy quality* but not *process/decision risk*. | GAP |
| **Q6** First-Principles Design & Validation | Decompose to ground truths before building | **Partial.** The concept/naming separation in Skills 03-04 forces decomposition (concept first, then expression). Expression anchoring grounds candidates in audience data. But this is domain-specific, not a universal first-principles protocol. | PARTIAL |
| **L1** Post-Action Reflection | J1/J2 classification (judgment vs. error) | **Partial.** Learning Capture Protocol captures explicit ratings + implicit sentiment + structured extraction. But no J1/J2 distinction — all feedback is treated equally rather than separating defensible judgment calls from actual errors. | GAP |
| **L2** Same-Turn Lesson Promotion | Pattern detection (2+ occurrences) → bounded trial → permanent rule | **Not present.** Learning Capture has a pattern lifecycle (single → emerging → promoted) in the Taste Capture Protocol, but this only applies to taste/voice edits, not to operational rules or process improvements. | GAP |
| **L3** Mid-Session Staleness Detection | Flag artifacts not updated in 2+ hours or after 3+ actions | **Partial.** Anti-Degradation has context zone monitoring (GREEN/YELLOW/RED/CRITICAL) and RUSHING ALERT (4+ actions without MC-CHECK). But no staleness detection for specific artifacts or time-based flagging. | PARTIAL |
| **L4** Context Continuity | Reasoning log currency checks, session-start orientation | **Strong coverage.** SESSION-ARCHITECTURE.md defines the 6-session model with explicit context loading per session. Context Reservoir bridges sessions. Anti-Degradation Layer 3 (Context Resume Protection) enforces "never trust summary claims, re-verify from actual files." | COVERED |
| **L5** Periodic System Optimization | Rule Integrity Audit classifying issues as missing/incomplete/not-followed/net-new | **Partial.** ROADMAP.md shows iterative improvement. Boris Cherny audit shows forensic review capability. But no structured classification taxonomy for system issues (missing vs. incomplete vs. not-followed vs. net-new gap). | PARTIAL |
| **L6** Domain Knowledge Accumulation | Central vault role for domain knowledge | **Strong coverage.** TIER1 extraction library (395+ files), specimen library (101 files across 6 personas), Soul.md protocol, and the entire foundation skill output chain serve as accumulated domain knowledge. This is actually more sophisticated than Marc's L6. | COVERED (EXCEEDS) |

### Accelerator Scorecard

| Category | Count |
|----------|-------|
| Fully Covered by Marketing-OS | 3 (Q2, L4, L6) |
| Partially Covered | 5 (Q3, Q4, Q6, L3, L5) |
| Genuine Gaps | 4 (Q1, Q5, L1, L2) |

---

## Part 2: Evaluating Marc's 16-Skill QE Pipeline Against Marketing-OS

### Phase 1: Strategic Reasoning (Skills 1-3)

| QE Skill | Marc's Capability | Marketing-OS Coverage | Verdict |
|----------|------------------|----------------------|---------|
| **Skill 1: Task Triage & Effort Router** | Classify task type, assign effort level — not every question needs full pipeline | **Not present.** Marketing-OS treats every skill execution with full rigor (the 7 Laws apply universally). There's no effort-scaling mechanism — a quick question gets the same pipeline weight as a full campaign build. | GAP |
| **Skill 2: Injection Guard** | Screen for prompt injection in pasted content | **Not present.** No injection defense anywhere in the system. When operators paste external content (competitor copy, research data, customer quotes), nothing screens for instruction manipulation. | GAP |
| **Skill 3: Context Anchor & Constraint Ledger** | Explicitly document what we're solving, assumptions, constraints | **Partial.** Soul.md captures voice constraints. Campaign Brief (Skill 09) synthesizes strategic constraints. But there's no per-task constraint ledger that locks assumptions with sensitivity ratings before execution begins. | PARTIAL |

### Phases 2-3: Reasoning Engine (Skills 4-6)

| QE Skill | Marc's Capability | Marketing-OS Coverage | Verdict |
|----------|------------------|----------------------|---------|
| **Skill 4: Decomposition & Evidence Plan** | Break into sub-goals with evidence requirements | **Strong coverage.** Every skill is already decomposed into layers with microskills. Each microskill has defined inputs, outputs, and evidence requirements. The layer/microskill architecture IS a decomposition system. | COVERED |
| **Skill 5: Structured Reasoning Engine** | Select reasoning method (CoT, ToT, ReAct) by problem type | **Partial.** The Arena system uses competitive generation (similar to ToT — multiple branches explored). But reasoning method selection isn't explicit. The system doesn't distinguish between linear problems (use CoT) vs. branching decisions (use ToT) vs. research-dependent problems (use ReAct). | PARTIAL |
| **Skill 6: Draft Composer** | Produce first output following all prior constraints | **Strong coverage.** Every skill's production layers (typically Layer 2-3) are the draft composition step, constrained by all upstream loading (Layer 0) and analysis (Layer 1). | COVERED |

### Phases 4-6: Quality Assurance (Skills 7-12)

| QE Skill | Marc's Capability | Marketing-OS Coverage | Verdict |
|----------|------------------|----------------------|---------|
| **Skill 7: Verification Operator** | Cross-check factual claims using CoVe methodology | **Strong coverage.** Claim Verification Protocol is a dedicated system — TIER 1 claims (statistics, studies, expert attributions) require proof_id tracing. HALT triggers on unverified claims. This is arguably MORE rigorous than Marc's Skill 7 for the copywriting domain. | COVERED (EXCEEDS) |
| **Skill 8: Adversarial Critic** | Attack output from hostile skeptic perspective | **Strong coverage.** The Arena system has a dedicated Adversarial Critic (not a competitor) who identifies the weakest element per output across all 3 rounds. This is structurally more sophisticated than a single adversarial pass. | COVERED (EXCEEDS) |
| **Skill 9: Pre-Mortem & Risk Analyst** | Assume failure, work backward — Klein + FMEA + Amazon doors | **Not present.** The Arena critic attacks *copy quality*, not *process risk*. No pre-mortem on "what if this campaign fails in market?" No FMEA scoring. No one-way/two-way door classification for strategic decisions. | GAP |
| **Skill 10: Uncertainty Calibrator** | Quantify confidence, flag unknowns | **Not present.** The system enforces exactness (Law 6: "Numbers are exact") but doesn't quantify *confidence in its own outputs*. No mechanism to say "I'm 60% confident in this root cause framing because the research data was thin in this area." | GAP |
| **Skill 11: Convergence Governor** | Know when to stop refining vs. ship | **Not present.** The Arena has a fixed structure (3 rounds, always) but no adaptive convergence. If Round 2 produces a clearly superior output, the system still runs Round 3. If Round 3 is still weak, there's no mechanism to request Round 4. The fixed structure prevents infinite loops but also prevents adaptive quality targeting. | GAP |
| **Skill 12: Output Contract & Quality Gate** | Final gate verifying all success criteria | **Strong coverage.** Every skill has gate verification (PASS/FAIL only, no invented statuses). Checkpoint files (LAYER_N_COMPLETE.yaml) must exist. Anti-Degradation enforces minimum thresholds. This is deeply embedded in the system. | COVERED |

### Conditional & Maintenance (Skills 13-16)

| QE Skill | Marc's Capability | Marketing-OS Coverage | Verdict |
|----------|------------------|----------------------|---------|
| **Skill 13: Long-Context Hygiene** | Manage context window degradation in long sessions | **Strong coverage.** Anti-Degradation has explicit context zone monitoring (GREEN/YELLOW/RED/CRITICAL) with escalating responses. SESSION-ARCHITECTURE.md splits work across 6 sessions specifically to manage context limits. The Opus/Sonnet model split (200K vs. 1M context) is a deliberate architectural decision for context management. | COVERED |
| **Skill 14: Knowledge Grounding** | Validate external sources before integration | **Strong coverage.** Claim Verification Protocol + Expression Anchoring Protocol + TIER1 extraction library. External sources are scored, validated, and traced. The expression anchoring protocol specifically scores candidates against audience data (40%), TIER1 patterns (30%), and FSSIT echo (30%). | COVERED |
| **Skill 15: Meta-Prompt Refiner** | Periodically evaluate and improve prompts/instructions | **Partial.** ROADMAP.md and implementation plans show iterative improvement. The system has gone through multiple versions (v3.0 → v3.7). But there's no automated mechanism — improvements happen through human-driven audits and version updates, not systematic prompt evaluation. | PARTIAL |
| **Skill 16: LLM-as-Judge Evaluator** | Structured self-evaluation against rubrics | **Strong coverage.** The Arena scoring system IS an LLM-as-Judge implementation — 7 competitors scored across defined dimensions. Expression anchoring scores candidates on a 1-10 scale across 3 dimensions. The system has multiple rubric-based evaluation mechanisms built into its core pipeline. | COVERED |

### QE Pipeline Scorecard

| Category | Count |
|----------|-------|
| Covered by Marketing-OS | 7 (Skills 4, 6, 7, 8, 12, 13, 14) |
| Covered and Exceeded | 4 (Skills 7, 8, 14, 16) |
| Partially Covered | 3 (Skills 3, 5, 15) |
| Genuine Gaps | 5 (Skills 1, 2, 9, 10, 11) |

---

## Part 3: Assessing Marc's Self-Learning Infrastructure

### What Marc Has

| Component | Description |
|-----------|-------------|
| **Issue Logger** | Structured capture: what happened, why, fix, preventive rule, promotion recommendation |
| **J1/J2 Classification** | Separates judgment calls (defensible) from actual errors (need correction) |
| **Same-Turn Lesson Promotion (L2)** | Pattern detected (2+ occurrences) → bounded trial → permanent rule |
| **Session Learning Log** | Persistent record across sessions |
| **Bounded Trial Mechanism** | New rules get trial period with success criteria before becoming permanent |

### What Marketing-OS Has

| Component | Description |
|-----------|-------------|
| **Learning Capture Protocol** | 3-channel system: explicit ratings (1-10), implicit sentiment (edit count), structured extraction |
| **Taste Capture Protocol** | Edit capture with pattern lifecycle: single → emerging (2x) → promoted (3x+) → active constraint |
| **Anti-Degradation History** | Documented failure patterns with structural fixes (e.g., Skill 01 delivering 121/1000 quotes) |
| **Learning Log** | 70+ learnings captured in system |
| **ROADMAP.md** | Tracks 5 root problems with solution status |

### Gap Assessment

Marketing-OS has **domain-specific learning** (taste capture, copy quality feedback) but lacks **operational learning** (process mistakes, reasoning errors, system-level improvements).

| Capability | Marc | Marketing-OS | Gap? |
|-----------|------|-------------|------|
| Structured mistake capture | Issue Logger with severity classification | Anti-Degradation documents past failures, but reactively (after major breakdowns), not as a continuous capture mechanism | YES |
| Judgment vs. error separation | J1/J2 classification | Not present — all feedback treated equally | YES |
| Real-time rule promotion | L2 bounded trial (same-turn) | Taste Capture has promotion lifecycle, but only for voice/style — not for operational rules | YES |
| Persistent learning log | session-learning-log.md read at session start | Learning Log exists (70+ entries) but isn't loaded at session start as a mandatory read | PARTIAL |
| Pattern detection | 2+ occurrences triggers promotion consideration | Taste Capture requires 3+ instances — reasonable but slower feedback loop | MINOR |

**Verdict:** The self-learning infrastructure is the **single largest gap** in Marketing-OS relative to Marc's system. Marketing-OS learns about *taste and voice* but not about *its own operational failures* in a structured, compounding way.

---

## Part 4: Prioritized Integration Recommendations

Ranked by impact, considering what Marketing-OS already has and where Marc's additions would create the most value.

### Tier 1: High Impact, Integrate Now

#### 1. Operational Self-Learning Loop (Marc's Issue Logger + L2 + Bounded Trial)
**Why:** Marketing-OS already has anti-degradation documentation for past failures, but it's reactive — someone has to manually update Anti-Degradation files after a breakdown. Marc's system captures issues *as they happen*, classifies them, and promotes patterns to permanent rules automatically.

**Integration approach:** Create a new protocol file at `skills/protocols/OPERATIONAL-LEARNING-PROTOCOL.md` that:
- Defines an issue capture format (adapted from Marc's Issue Logger) for operational failures (not taste/voice)
- Implements J1/J2 classification so the system stops treating all feedback equally
- Adds a bounded trial mechanism for new operational rules
- Creates a `session-operational-log.md` that gets read at session start alongside other mandatory reads

**Estimated effort:** Medium — one new protocol file + updates to CLAUDE-CORE.md mandatory reads

#### 2. Task Triage & Effort Router (Marc's Skill 1)
**Why:** Marketing-OS applies maximum rigor to everything. When an operator asks a quick question mid-session ("what's the word count target for the lead?"), the system has no mechanism to recognize this as a low-effort lookup vs. a full skill execution. This wastes context and operator time.

**Integration approach:** Add an effort classification section to CLAUDE-CORE.md:
- **Quick** (lookup/clarification): Answer directly, no pipeline
- **Standard** (single skill execution): Normal pipeline with MC-CHECK
- **Thorough** (multi-skill or strategic): Full pipeline with all gates

**Estimated effort:** Low — section addition to CLAUDE-CORE.md

#### 3. Uncertainty Calibrator (Marc's Skill 10)
**Why:** The system enforces exactness for *data* (Law 6) but never quantifies confidence in *strategic decisions*. When Skill 03 selects a root cause, or Skill 04 names a mechanism, or Skill 05 frames a Big Idea — the system presents these as definitive. Adding confidence quantification would help operators know where to focus human review.

**Integration approach:** Add confidence reporting to Arena output format:
- After 3-round Arena completion, report confidence level with rationale
- Flag areas where research data was thin or competitor scores were clustered (suggesting no clear winner)
- Add to handoff packages: `confidence: high|medium|low` with `confidence_rationale`

**Estimated effort:** Medium — updates to Arena protocol + handoff registry

### Tier 2: Medium Impact, Integrate Next

#### 4. Pre-Mortem Protocol (Marc's Q5 / Skill 9)
**Why:** The Arena critic attacks copy quality ("this headline is weak because...") but nobody asks "what if this entire campaign strategy fails in market?" Adding a pre-mortem at the Campaign Brief stage (Skill 09) would catch strategic risks before committing to copy production.

**Integration approach:** Add a pre-mortem layer to Skill 09 (Campaign Brief):
- After brief synthesis, assume the campaign failed — why?
- Classify risks as one-way doors (can't undo) vs. two-way doors (can adjust)
- Flag the top 3 risks in the Campaign Brief handoff package

**Estimated effort:** Medium — new microskill layer in Skill 09

#### 5. Injection Guard (Marc's Skill 2)
**Why:** When operators paste competitor copy, research data, or customer quotes into the system, nothing screens for instruction manipulation. In a shared team environment, this is a real attack surface.

**Integration approach:** Add an instruction integrity check to Layer 0 (upstream loading) of all skills:
- Separate trusted instructions (skill files, protocol files) from untrusted content (pasted research, competitor copy)
- Flag any content that contains instruction-like patterns in untrusted input
- Simple heuristic: scan for imperative commands, system prompt patterns, or role-override language in pasted content

**Estimated effort:** Low-Medium — pattern addition to upstream loaders

#### 6. Convergence Governor (Marc's Skill 11)
**Why:** The Arena always runs exactly 3 rounds. This is safe (prevents infinite loops) but inflexible. Sometimes Round 2 is clearly optimal and Round 3 is wasted effort. Sometimes Round 3 still hasn't converged and the system ships anyway.

**Integration approach:** Add convergence assessment after each Arena round:
- If Round 2 winner scores 9.0+ across all dimensions AND leads Round 1 winner by 2+ points → offer early exit
- If Round 3 winner scores below 7.0 on any dimension → flag for human review before shipping
- Keep 3 rounds as default, but allow adaptive early-exit and late-extension

**Estimated effort:** Medium — updates to ARENA-CORE-PROTOCOL.md

### Tier 3: Lower Impact or Already Partially Covered

#### 7. Structured Reasoning Method Selection (Marc's Skill 5)
**Why:** The system could benefit from explicitly selecting reasoning approaches by problem type. But the Arena system already provides multi-perspective reasoning (similar to Tree-of-Thought), and the domain-specific nature of Marketing-OS means most problems follow predictable reasoning patterns.

**Integration approach:** Document the implicit reasoning methods already in use per skill type. Make explicit what's currently implicit. No major structural change needed.

#### 8. Prompt Optimization (Marc's Skill 0)
**Why:** Marc reports this as his highest single-quality-improvement. But Marketing-OS already has a 67-skill pipeline where each skill IS an optimized prompt. The value of Skill 0 is highest for ad-hoc queries, not for pipeline-driven execution.

**Integration approach:** Could be useful as a pre-processing step for operator requests that don't map cleanly to an existing skill. Add as an optional routing layer, not a mandatory pipeline stage.

#### 9. Research-Before-Reasoning Gate (Marc's R-07)
**Why:** Marc identifies this as eliminating the #1 AI failure mode. In Marketing-OS, Skill 01 (Research) already runs BEFORE any strategy or copy work. The upstream-loader pattern enforces data loading before execution. However, for *ad-hoc questions* outside the main pipeline, this gate doesn't exist.

**Integration approach:** Already structurally covered for pipeline work. Add as a general principle in CLAUDE-CORE.md for non-pipeline queries: "For any question requiring factual grounding, complete research before analysis."

#### 10. Source Verification Protocol (Marc's R-20)
**Why:** Marketing-OS already has the Claim Verification Protocol with TIER 1 zero-tolerance enforcement. Marc's R-20 adds the specific requirement of "primary vendor source at time of writing" — meaning comparison sites and cached data don't count. This is a refinement, not a new capability.

**Integration approach:** Strengthen the existing Claim Verification Protocol by adding Marc's "primary source" requirement explicitly.

---

## Part 5: Proposed Integration Plan

### Phase 1: Quick Wins (1-2 sessions)
1. Add effort classification to CLAUDE-CORE.md (Tier 1, Item 2)
2. Add "primary source" requirement to Claim Verification Protocol (Tier 3, Item 10)
3. Add R-07 principle to CLAUDE-CORE.md for non-pipeline queries (Tier 3, Item 9)

### Phase 2: Core Infrastructure (2-3 sessions)
4. Create OPERATIONAL-LEARNING-PROTOCOL.md with issue logger + J1/J2 + bounded trial (Tier 1, Item 1)
5. Add confidence reporting to Arena output format and handoff packages (Tier 1, Item 3)
6. Add injection guard to upstream loaders (Tier 2, Item 5)

### Phase 3: Strategic Enhancements (2-3 sessions)
7. Add pre-mortem layer to Skill 09 Campaign Brief (Tier 2, Item 4)
8. Add convergence assessment to Arena protocol (Tier 2, Item 6)
9. Document implicit reasoning methods per skill type (Tier 3, Item 7)

### Phase 4: Optional
10. Add Skill 0 as optional routing layer for non-pipeline queries (Tier 3, Item 8)

---

## Scorecard Summary

| Dimension | Score (1-5) | Rationale |
|-----------|------------:|-----------|
| Pre-execution reasoning discipline | 2.5 | No task triage, no explicit reasoning method selection, no constraint ledger per task |
| Production pipeline rigor | 5.0 | 67 skills, layered microskills, checkpoint files, binary gates — this is elite |
| Adversarial quality testing | 4.5 | Arena system with dedicated critic is sophisticated; lacks pre-mortem on strategic risk |
| Claim/source verification | 5.0 | Claim Verification Protocol + TIER1 library + expression anchoring — exceeds Marc's system |
| Uncertainty & confidence management | 1.5 | System enforces exactness for data but never quantifies confidence in strategic decisions |
| Convergence governance | 2.0 | Fixed 3-round Arena is safe but inflexible; no adaptive exit or extension |
| Self-learning infrastructure | 3.0 | Strong on taste/voice learning; weak on operational/process learning |
| Context management | 4.5 | 6-session architecture + context zones + model split — well-designed |
| Injection defense | 1.0 | No injection screening anywhere in the system |
| Domain knowledge depth | 5.0 | 395+ TIER1 extractions, 101 specimens, 70+ learnings — this is the system's crown jewel |

**Composite: 3.4 / 5.0**
**With Tier 1 integrations applied (estimated): 4.0 / 5.0**

---

## Closing Notes

Marketing-OS is a **production masterpiece** for copywriting. Its domain depth (TIER1 library, specimen system, expression anchoring, Arena competition) is genuinely world-class — Marc's system has nothing comparable in domain knowledge infrastructure.

Marc's Quality Engine fills a different role: **cognitive discipline infrastructure**. The highest-value additions are the ones that add *thinking discipline* around the production pipeline — task triage so the system scales its effort, uncertainty calibration so operators know where to focus review, operational self-learning so the system compounds improvements beyond just taste/voice, and injection defense so the system stays secure in a shared environment.

The recommended approach is **Option 3 from Marc's explainer (Hybrid)** — cherry-pick the highest-value additions and integrate them into Marketing-OS's existing architecture. The system's layered structure (CLAUDE-CORE.md → SKILL-INDEX → ANTI-DEGRADATION → microskills) makes this straightforward. New capabilities slot into existing layers rather than requiring architectural restructuring.

---

*Analysis performed following Marc Stockman's Quality Engine methodology (Part 6 instructions). All claims grounded in direct filesystem inspection of both systems. No runtime execution performed — structural analysis only.*
