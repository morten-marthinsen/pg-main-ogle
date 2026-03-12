# Rules and Decisions Log — Legislative History

**Last Updated:** March 11, 2026
**Purpose:** Every rule and directive that exists, why it was created, what incident triggered it, and every major architectural decision with its rationale. This is the "legislative history" of the operating system — not just what the rules are, but why they exist. For the current rule text, see `marc-ops-framework`.

---

## How to Read This File

- **Provenance** = the specific incident, frustration, or discovery that caused the rule to be created
- **Patches** = subsequent modifications with dates and reasons
- **Classification** = Original (from first skill system build), Enhanced (modified after creation), Net-new (added after initial system)

Where provenance is not fully documented (rules from earliest sessions before systematic logging), this is noted honestly. Future sessions should backfill provenance as it surfaces in conversation.

---

## Part 1: Directives (D-01 through D-13)

Directives govern core operating principles. They are more permanent than rules — rules address specific failure modes, directives define how the system should behave.

### D-01: No Autonomous Messages
**Provenance:** Established early in the system design. Marc's fundamental requirement that the AI never sends communications (email, Slack, etc.) without explicit approval.
**Patches:** None.
**Classification:** Original.

### D-02: Present Options, Don't Decide
**Provenance:** Marc's leadership style — he wants to see trade-offs and make strategic decisions himself, not have the AI make them. Applied consistently across all roadmap, architecture, and tool evaluation work.
**Patches:** None.
**Classification:** Original.

### D-03: No Illegal/Immoral/Unethical
**Provenance:** Foundational ethical constraint. Standard safety boundary.
**Patches:** None.
**Classification:** Original.

### D-04: Durable Architecture
**Provenance:** Marc's frustration with quick-fix solutions that needed to be rebuilt. Preference for building systems that last rather than patches that hold temporarily.
**Patches:** None.
**Classification:** Original.

### D-05: Ground Claims
**Provenance:** Early instances where the AI made factual claims from training data that turned out to be wrong. Established the requirement for all claims to be grounded in web searches or verifiable sources. Predates R-02 and R-07 which are more specific implementations.
**Patches:** None.
**Classification:** Original.

### D-06: Donnie French
**Provenance:** Repeated misspelling of "Donnie" in deliverables. Marc's correction promoted to a standing directive. Also establishes that Donnie is not a developer and does not write code — he is Marc's AI mentor.
**Patches:** None.
**Classification:** Original.

### D-07: No PG-Specific References
**Provenance:** Donnie works at PG (his employer). Deliverables should not include references specific to PG since they are Marc's documents, not PG's.
**Patches:** None.
**Classification:** Original.

### D-08: Budget Not a Constraint
**Provenance:** Marc's explicit instruction: optimize for capability, not cost. This applies to tool selection, model selection, and subscription decisions.
**Patches:** Applied to `objective-intake` v2.0 (March 10, 2026) — model selection step now explicitly applies D-08.
**Classification:** Original.

### D-09: Portable and Teachable
**Provenance:** The mastermind group operates across multiple AI platforms (Perplexity Computer, Claude Code, Cursor, etc.). Everything must work regardless of platform and be teachable to non-developers (Marc, Jeff, Donnie).
**Patches:** None. Reinforced by the "building code, not construction manual" philosophy adopted in the QE thread (March 10-11, 2026).
**Classification:** Original.

### D-10: No Execution Without Approval
**Provenance:** Early incident where the AI began executing a plan before Marc had reviewed and approved it. Marc's control requirement: present the plan, get the "go," then build.
**Patches:** None.
**Classification:** Original.

### D-11: Donnie's Capabilities Solved For
**Provenance:** Recognition that Donnie's system capabilities (Marketing-OS, Creative OS) need to be accounted for in Marc's architecture to avoid building redundant functionality or missing integration points.
**Patches:** None.
**Classification:** Original.

### D-12: Self-Learning Environment
**Provenance:** Marc's vision for the AI operating system: it should learn from every mistake, capture lessons, promote them to permanent rules, and verify in subsequent actions. The entire self-learning loop (issue-logger, Learning Ledger, class-c escalation) implements this directive.
**Patches:** None. Implementation expanded significantly over time through L1-L6 accelerators, issue-logger skill, and audit Pass 5.
**Classification:** Original.

### D-13: Describe Roles, Not People
**Provenance:** Implementation documents were hardcoding specific people as requirements. Marc's correction: describe what needs doing and skills needed, with a separate candidates column. Never hardcode people as requirements.
**Patches:** None.
**Classification:** Net-new (added after initial system).

---

## Part 2: Preventive Rules (R-01 through R-27)

Each rule was triggered by a specific incident — a mistake caught and promoted to a permanent rule via the self-learning loop.

### R-01: Dedicated Research Files
**Provenance:** Research findings were being mixed across files without clear organization. Established the practice of dedicating research to specific files per tool/topic.
**Patches:** None.
**Classification:** Original.

### R-02: Live Source Claims
**Provenance:** Early incidents where the AI cited factual claims from training data that were outdated or incorrect. Requires all factual claims to be sourced from live web searches.
**Patches:** None. R-07 and R-20 extend this principle.
**Classification:** Original.

### R-03: Apply Skills, Don't Reference
**Provenance:** The AI was referencing skill files in responses ("see the audit skill for details") instead of actually applying the skills to its own work. Marc's correction: when a skill exists, apply it — don't just point to it.
**Patches:** None.
**Classification:** Original.

### R-04: Substance Ratio
**Provenance:** Sessions where the AI spent more effort on meta-commentary, quality theater, and process overhead than on actual substance. Marc's 70% rule: at least 70% of effort must be on substance, not ceremony.
**Patches:** None.
**Classification:** Original.

### R-05: Success Criteria
**Provenance:** Deliverables were being produced without clear definition of what "done" looks like, leading to revision cycles. Requires defining success criteria before starting and verifying each one individually at the end.
**Patches:** Enhanced March 2026 — added requirement that operational documents must have explicit owner (WHO) and timing (WHEN) for every step. If TBD, say so explicitly.
**Classification:** Original, Enhanced.

### R-06: Issue Log
**Provenance:** Mistakes were being fixed but not systematically captured, leading to the same mistakes repeating. Requires maintaining an issue log with what happened, why, fix, and preventive rule.
**Patches:** Implemented as `issue-logger` skill (v1.2, March 6, 2026).
**Classification:** Original.

### R-07: Research-Before-Reasoning Gate (HARD GATE)
**Provenance:** Repeated pattern where the AI would draft from training data first and then do web searches to verify afterward. This produced confident but potentially wrong first drafts. Marc's requirement: complete all live research BEFORE any analysis or synthesis. Retrieve live sources first, then reason from them.
**Patches:** R-07 Implementation Note added to marc-ops-framework v2.2 — documents how R-07 materializes in different contexts (Skill 0, execution, audit, ad-hoc responses, R-20).
**Classification:** Original, Enhanced with implementation note.

### R-08: Build Don't Describe
**Provenance:** The AI was producing descriptions of what it would build instead of actually building it. "Every commitment must produce an artifact, not a promise."
**Patches:** None.
**Classification:** Original.

### R-09: Infrastructure Before Execution
**Provenance:** Work was starting before operational infrastructure (tracking files, skill loading, session setup) was in place, leading to gaps in logging and state management.
**Patches:** None.
**Classification:** Original.

### R-10: Convergence Gate
**Provenance:** Phases were being marked complete without verification that all items were resolved. Requires running a convergence gate before marking any phase complete.
**Patches:** Now primarily implemented through the `audit` skill convergence loop.
**Classification:** Original.

### R-11: Share Files Immediately
**Provenance:** Files were being created in the workspace but not shared to Marc's Files tab, making them invisible until the AI remembered to share. Recurring frustration.
**Patches:** None. Enforced in audit Pre-Flight (PF-4: File Visibility check).
**Classification:** Original. Candidate for structural enforcement (Phase 1, Upgrade 3).

### R-12: Proof and Pause
**Provenance:** Originally two separate rules: R-12 (Proof of Work — convergence report must appear in conversation before marking complete) and R-14 (Phase Pause — pause with summary at phase boundaries). Merged March 10, 2026 during reflect session.
**Patches:** Merged R-12 + R-14 into single rule (March 10, 2026). R-14 slot now reserved for future use.
**Classification:** Enhanced (merged).

### R-13: Unified Audit Trigger
**Provenance:** Confusion between "check" and "audit" commands leading to inconsistent behavior. Marc's decision: "We don't need to talk about self-audit anymore. It'll just be audit." Unified March 6, 2026.
**Patches:** Updated to route all check/audit variants to the unified `audit` skill.
**Classification:** Enhanced (unified).

### R-14: (Reserved)
**Provenance:** Previously "Phase Pause" — merged into R-12 (Proof and Pause) on March 10, 2026 during reflect session. Slot reserved for future rule.

### R-15: Internal Self-Check
**Provenance:** Deliverables were being presented to Marc with issues that the AI should have caught before presenting. Requires running an internal self-check against the audit protocol before presenting results.
**Patches:** None.
**Classification:** Original.

### R-16: Reasoning Log Currency
**Provenance:** Reasoning log entries were being left incomplete — post-action columns (outcome, delta, lesson, promote?) left as TBD. Requires completing post-action columns BEFORE convergence gate.
**Patches:** Flag as stale after 2 hours or 3 major actions. File maintenance deferred to R-24 (Milestone Persistence).
**Classification:** Original, Enhanced.

### R-17: Feature Regression Prevention
**Provenance:** The "v1.5→v1.6 incident" — a 31MB PDF became 158KB during an update, losing all content. Marc's frustration drove the creation of the `deliverable-regression-check` skill.
**Patches:**
- March 10, 2026: Added Load Skill Guard (behavioral): when `load_skill` is called on a skill modified during the current session, re-apply local modifications after loading.
- March 11, 2026 v2.4: **Structural enforcement conversion.** Load Skill Guard upgraded from behavioral to structural. Added: (1) Pre-load snapshot backup before every `load_skill`, (2) Dirty-file registry (`/workspace/.dirty-skills.json`) that blocks `load_skill` from overwriting modified workspace copies, (3) Recovery protocol for post-compaction scenarios where dirty-state awareness is lost. Provenance: `load_skill` overwrote v3.3/v2.3 workspace files with v3.2/v2.2 library versions during audit recovery on March 11, 2026. Manual reconstruction was required. Marc identified the gap: the system should have caught and proposed this fix automatically. Root cause: audit Pass 5 scoped findings only to the convergence loop, missing setup-phase problems. Two gaps closed simultaneously.
- March 11, 2026 v2.6: **Write-side structural gate (Gate 7) + Post-load verification (Gate 8).** Repeat incident same day: v2.5 overwritten by v2.4 during context recovery because `.dirty-skills.json` was empty — the WRITE side (updating registry after edit) was still behavioral. Two new structural gates added: Gate 7 (fires after every skill file edit, verifies registry was updated) and Gate 8 (fires after every `load_skill`, compares loaded version against pre-load backup, restores if backup is newer). Defense in depth: Gate 7 feeds Gate 2 (write → read), Gate 8 catches library propagation failures. R-17 now has three structural gates (2, 7, 8) covering read-side, write-side, and post-load verification. Root cause analysis also surfaced R-26 test battery gap.
**Classification:** Original, Heavily Enhanced. Three structural gates (Gates 2, 7, 8). Defense-in-depth pattern applied.

### R-18: Context Anchor
**Provenance:** Responses were losing track of what Marc originally asked, especially after long work sessions. Requires every final answer to open with a one-line reminder of what Marc originally asked.
**Patches:** None.
**Classification:** Original.

### R-19: Next Step Anchor
**Provenance:** Responses were ending without a clear indication of what to do next, requiring Marc to prompt for next steps. Requires every substantive response to end with a "What's Next" section.
**Patches:** None.
**Classification:** Original.

### R-20: Source Verification Protocol
**Provenance:** The "Zine pricing screwup" — the AI cited pricing from stale training data instead of checking the vendor's website. Created the formal verification protocol requiring Tier 1 claims to be Level 2 verified (fetch vendor's primary page at time of writing).
**Patches:** Attribution Precision sub-rule added March 11, 2026: when citing quotes or claims that passed through intermediate analysis layers (digests, AI commentary), always attribute to the actual originator, not the intermediate layer. Surfaced by audit F1.1 — Claude analysis paraphrase was presented as direct paper quote because the digest mixed both layers. Marc approved March 11, 2026.
**Classification:** Original, Enhanced.

### R-21: Subagent Preference Inheritance
**Provenance:** Subagents were producing deliverables that violated Marc's standing preferences (no "bottom line:" opening, wrong formatting, missing success criteria). Standing preferences do not auto-transfer to subagents — they must be explicitly passed.
**Patches:** None.
**Classification:** Net-new.

### R-22: Dependency-Ordered Planning
**Provenance:** Next-step lists were being presented in flat, arbitrary order when items had logical dependencies. Item B's design depended on Item A's answer, but they were presented as equals. Created March 10, 2026.
**Patches:** None.
**Classification:** Net-new (March 10, 2026).

### R-23: Credential Persistence
**Provenance:** Credentials provided by Marc (cookies, API tokens, session tokens) were stored only in conversation text, which is lost on compaction or thread death. Requires saving to `/workspace/credentials/` immediately.
**Patches:** None.
**Classification:** Net-new.

### R-24: Compaction Self-Detection + Milestone Persistence (HARD GATE)
**Provenance:** Multiple incidents of context compaction causing the AI to lose track of current task, loaded skills, and active todo list — then proceeding with work in a degraded state. The most-patched rule in the system.
**Patches:**
- Original: Pre-action gate (verify task awareness before every action)
- v2.0: Added milestone persistence (update ALL operational files after every milestone)
- v2.1: Added Milestone Checkpoint Gate (file-update sweep on task completion or skill save)
- v2.1: Added 60-Minute Staleness Alarm (check timestamps before new major action)
- v2.1: Added Correction Checkpoint (log issue after any Marc-surfaced fix before moving on)
- v2.2: Added R-26 Enforcement Sub-Gate (verify acceptance tests run before marking feature complete)
- March 10, 2026 reflect: Consolidated all R-24 authority into one rule instead of scattered across multiple.
- v2.3 (March 11, 2026): **File Freshness Gate (STRUCTURAL ENFORCEMENT).** Before calling `share_file` or marking a todo task "completed," verify session-state.md has been updated since last major action. Converts behavioral requirement to structural check. Provenance: 3+ class-c violations in single session triggered escalation threshold per audit protocol.
- v2.7 (March 11, 2026): **Extracted to dedicated skill `milestone-persistence` v1.0.** R-24 had grown to 814 tokens (3,319 chars) — the longest rule by 2x. The R-24 table entry in marc-ops-framework is now a 2-line summary pointing to the skill. Content unchanged — restructured into 7 independently-checkable sub-features. Per Reflect Proposal #1.
**Classification:** Original, Heavily Enhanced. 3 class-c violations in current session — escalation triggered, structural enforcement applied. Extracted to skill March 11, 2026.

### R-25: YAML Frontmatter Guard (HARD GATE)
**Provenance:** Repeated failures where skills were saved to the library without required YAML frontmatter, causing platform errors. The platform strips frontmatter on `load_skill`, so workspace copies always need it re-added before `save_custom_skill`.
**Patches:** None.
**Classification:** Net-new. Candidate for structural enforcement (Phase 1, Upgrade 3).

### R-26: Acceptance Testing
**Provenance:** New features and rules were being marked complete without any verification that they actually worked. Established that every new or enhanced feature must be tested before marking complete — define what "working" looks like, execute the test, document the result.
**Patches:**
- R-26 Enforcement Sub-Gate added to R-24's Milestone Checkpoint Gate (March 10, 2026) — makes R-26 structurally attached rather than purely behavioral.
- March 11, 2026 v2.6: **Minimum test categories (HARD GATE).** Every test suite must include all three categories: (a) happy-path, (b) adversarial/failure-mode, and (c) recovery. Provenance: R-17 repeat incident caused by an all-happy-path test suite (10/10 tests assumed the write-side had already succeeded). No adversarial test asked "what if the registry write was lost?" — which was the exact failure mode. The test battery tested the gate but not the pipeline that feeds the gate.
**Classification:** Net-new (March 10, 2026), Enhanced (March 11, 2026).

### R-27: Source-to-Section Trace-Through
**Provenance:** Audit finding (March 11, 2026) — new paper insights (AutoGen actor model for G3, MCP for G-7) were added to source entries in the morning report but not traced through to the roadmap upgrades in Part 5. The chat response promised these insights but the report body didn't contain them.
**Patches:** None.
**Classification:** Net-new (March 11, 2026).

---

## Part 3: Major Architectural Decisions

### Decision: 3-Layer Architecture (March 2, 2026)
**What was decided:** Organize the system into 3 layers: Layer 1 (Behavioral Governance — "The Constitution"), Layer 2 (Production Pipeline — "The Laws"), Layer 3 (Post-Delivery Learning — "The Learning Loop").
**Alternatives considered:** Flat rule system, 2-layer (rules + pipeline), 5-layer fine-grained separation.
**Why this option:** Clean separation of always-on governance from task-specific pipeline from post-delivery learning. Resolved the confusion between Accelerators and QE skills.
**Who was involved:** Marc, AI.
**Provenance:** 5 overlaps identified between Accelerators and QE, causing confusion about which system controlled what. Resolution principle: Accelerators = always-on behavioral governance (Layer 1), QE skills = production pipeline (Layer 2) with defer-to clauses for overlapping concerns.

### Decision: 4-Skill QE Consolidation (March 6, 2026)
**What was decided:** Consolidate 16 proposed QE sub-skills into 4 parent skills: qe-strategic-reasoning, qe-reasoning-engine, qe-quality-assurance, qe-system-maintenance.
**Alternatives considered:**
- Option A: Build only 2 new skills (pipeline-in, pipeline-out) with all logic in existing skills
- Option B: Build 4 comprehensive QE skills with defer-to clauses (selected)
**Why this option:** Marc chose Option B: "we get a complete system in place now, and we can export it to others, get their opinion on it, we can test it."
**Who was involved:** Marc, AI.

### Decision: Unified Audit Command (March 6, 2026)
**What was decided:** Merge "self-audit" (single comprehensive pass) and "audit" (undefined looping behavior) into a single "audit" command that loops until zero material changes.
**Alternatives considered:**
- Option A: Separate audit-protocol skill alongside self-audit
- Option B: Merge looping behavior into self-audit with two modes
- Option C: Just patch the audit command in marc-ops-framework
**Why this option:** Marc: "We don't need to talk about self-audit anymore. It'll just be audit." One trigger, one behavior — loop until clean.
**Who was involved:** Marc, AI.

### Decision: Building Code Philosophy (March 10, 2026)
**What was decided:** Express the QE as platform-agnostic principles and patterns ("building code"), not platform-specific implementations ("construction manual"). The QE defines the "what" and "why." Each platform describes the "how."
**Why this option:** The mastermind group uses different AI platforms. A platform-specific QE would only work for Marc's Perplexity Computer. A building code works everywhere.
**Who was involved:** Marc (originated the metaphor in HANDOFF v1.1), AI.

### Decision: Permanent Files Architecture (March 11, 2026)
**What was decided:** 7 permanent files living in Marc's Files tab, always accessible regardless of thread: QE-State-File, Skill-Registry, AI-Brain-Architecture, Tech-Stack, Mastermind-Discoveries, Rules-and-Decisions-Log, QE-Research-Synthesis-Morning-Report.
**Alternatives considered:** Session-state.md as permanent (rejected — thread-scoped by design), individual audit logs as permanent (rejected — too granular), digest files as permanent (rejected — source material, not durable artifacts).
**Why this option:** Marc's requirement: "I want to make sure that there's zero risk that we can't find it. I can always access it via the files tab in case I need to export it to a different system for analysis."
**Who was involved:** Marc, AI.
**Audited:** 2 loops, converged clean before building.

---

## Part 4: Reconciliation History

### Accelerators vs. QE Overlap Resolution (March 2, 2026)

5 overlaps were identified and resolved:

| Overlap | Resolution | Rationale |
|---------|-----------|-----------|
| Q1 (Structured Reasoning) vs. QE Phase 2 (Decomposition) | Q1 won — always-on behavioral rule; QE Phase 2 defers to Q1 | Q1 is universal; QE Phase 2 is pipeline-specific |
| Q3 (Multi-Pass Audit) vs. QE Phase 4 (Verification) | `audit` skill won — command-triggered protocol; QE Phase 4 defers to `audit` when Marc says "audit" | Audit is Marc's direct command; QE verification is pipeline procedure |
| L1 (Post-Action Reflection) vs. QE Phase 6 (Output Evaluation) | L1 won — QE Phase 6 integrates L1's J1/J2 classification | L1 is the classification engine; Phase 6 is the integration point |
| L2 (Lesson Promotion) vs. QE Maintenance (Knowledge Grounding) | L2 won — QE Maintenance defers to `issue-logger` for promotion | L2 is the promotion pipeline; issue-logger is the implementation |
| L4 (Context Continuity) vs. QE Maintenance (Long-Context Hygiene) | L4 won — `session-bootstrap` implements continuity | L4 is the principle; session-bootstrap is the implementation |

**Resolution principle:** Accelerators are always-on behavioral governance (Layer 1). QE skills implement the production pipeline (Layer 2) and defer to operational skills for overlapping concerns.

---

## Part 5: Provenance Gaps

The following rules have incomplete provenance — the specific triggering incident is not documented in memory or session logs. Future sessions should backfill these when the context surfaces:

| Rule | What's Missing |
|------|---------------|
| R-01 | Specific incident that triggered dedicated research files requirement |
| R-03 | Specific instance of referencing rather than applying a skill |
| R-08 | Specific instance of describing rather than building |
| R-09 | Specific incident of starting execution before infrastructure was ready |
| R-15 | Specific incident of presenting results with catchable issues |
| D-01 | Whether this was preventive or triggered by an incident |
| D-03 | Whether this was preventive or triggered by an incident |
| D-04 | Specific incident of a quick fix that needed rebuilding |

These gaps are honest acknowledgments, not deficiencies. The system was built iteratively before systematic provenance logging was established.

---

## Update Protocol

This file must be updated when:
- Any rule is created, modified, or patched (same action must also update `marc-ops-framework`)
- Any major architectural decision is made
- Any provenance gap is filled through conversation
- Any class-c violation tracking leads to a structural enforcement proposal

After updating, re-share to Files tab with the same name ("Rules-and-Decisions-Log") to maintain version history.

---

*This file is the legislative history of Marc's AI operating system. For the current rule text, see `marc-ops-framework`. For the system architecture, see `AI-Brain-Architecture.md`. For the skill inventory, see `Skill-Registry.md`.*
