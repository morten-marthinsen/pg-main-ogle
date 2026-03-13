# Skill Registry — Master Index

**Last Updated:** March 12, 2026
**Total Skills:** See the skill tables below for current counts. Deprecated skills are in `skills/deprecated/`.
**Library ID:** e4188d75-61a4-4728-8f3e-7c8094505c76
**Purpose:** Complete inventory of every custom skill — what it does, why it was created, what gap it fills, version, dependencies, when last audited, and quality gate status. If someone asks "what skills are you using and why?" — hand them this file.

---

## How to Read This Registry

Each skill entry contains:
- **Purpose** — One sentence describing what it does
- **Origin** — What problem or incident triggered its creation
- **Architecture role** — Which layer (1/2/3), which gap it fills, which rule it implements
- **Dependencies** — What other skills it references or defers to
- **Load triggers** — When it should be loaded
- **Last audited** — Date and result of most recent audit

---

## Layer 1: Master Framework (1 skill)

### 1. marc-ops-framework
| Field | Value |
|-------|-------|
| Version | 3.3 |
| Purpose | Master operating system — directives, preventive rules, 12 accelerator rules, standing commands, standing preferences. Routes to all other skills. See the framework file itself for current counts. |
| Origin | Evolved from persistent-rules.md (March 2026). Marc needed a single authoritative source for all rules and behavioral governance that could survive across threads and be loaded once per session. Created to stop re-explaining rules every session. |
| Architecture role | Layer 1 (Behavioral Governance). The "Constitution" — always-on, governs every interaction. Contains the routing table that dispatches to all other skills. |
| Dependencies | None (root skill — all others depend on it) |
| Load triggers | Every session at initialization. First skill loaded. |
| Last audited | 2026-03-12 — v3.3 (creative-bypass promoted to Tier 1, export frontmatter guard). Multiple audit passes. |
| Quality gate | 9+ audits passed. v3.3 current. |

---

## Layer 2: Quality Engine Pipeline (4 skills)

These implement the production pipeline (Understand → Plan → Draft → Verify → Stress → Ship). Built March 6, 2026 in an overnight session. Originally proposed as 16 separate skills, consolidated to 4 parent skills to reduce loading overhead while preserving all pipeline phases. The consolidation decision was Marc's — "I like option B because we get a complete system in place now, and we can export it to others."

### 2. qe-strategic-reasoning
| Field | Value |
|-------|-------|
| Version | 1.0 |
| Purpose | Phase 1 (Understand and Lock) — task triage, safety screening, context anchoring |
| Origin | Consolidation of QE Skills 1-3 from the 16-skill Forensic Synthesis document. Built to give the production pipeline a formal "understand the problem before solving it" phase. |
| Architecture role | Layer 2 (Production Pipeline). First phase of the QE pipeline. Covers task classification, injection guard (detecting prompt injection), and context anchor assembly. |
| Dependencies | Defers to `prompt-optimizer` when Skill 0 is active |
| Load triggers | Executing an approved prompt through the QE pipeline; performing strategic analysis; when understanding and locking the problem space is the primary need |
| Last audited | 2026-03-06 — PASSED (built and validated overnight) |
| Quality gate | Initial build validated against Forensic Synthesis source + Reconciliation document |

### 3. qe-reasoning-engine
| Field | Value |
|-------|-------|
| Version | 1.0 |
| Purpose | Phases 2-3 (Plan, Reason, Draft) — decomposition, structured reasoning (CoT/ToT/ReAct), draft composition |
| Origin | Consolidation of QE Skills 4-6. Integrates Q1 ThoughtPad, Q5 risk planning, Q6 first-principles into the reasoning phase. |
| Architecture role | Layer 2 (Production Pipeline). Core reasoning phase. Where the AI breaks down problems, selects reasoning strategies, and produces the initial draft. |
| Dependencies | Integrates Q1, Q5, Q6 accelerators |
| Load triggers | Executing the reasoning phase of any QE pipeline run; complex multi-step analysis; decomposing hard problems |
| Last audited | 2026-03-06 — PASSED (built and validated overnight) |
| Quality gate | Initial build validated against source material |

### 4. qe-quality-assurance
| Field | Value |
|-------|-------|
| Version | 1.0 |
| Purpose | Phases 4-6 (Verify, Stress-Test, Ship) — verification (CoVe), adversarial critique, pre-mortem, uncertainty calibration, convergence, output contracts |
| Origin | Consolidation of QE Skills 7-12. Includes Q5 Klein/FMEA unified with Skill 9, Q3 visual formatting verification. |
| Architecture role | Layer 2 (Production Pipeline). Quality verification phase. Where the draft gets stress-tested before delivery. |
| Dependencies | Defers to `audit` when Marc says "audit" or any check variant |
| Load triggers | Verifying draft output quality within the QE pipeline; running verification or stress-testing on any deliverable |
| Last audited | 2026-03-06 — PASSED (built and validated overnight) |
| Quality gate | Initial build validated against source material |

### 5. qe-system-maintenance
| Field | Value |
|-------|-------|
| Version | 1.0 |
| Purpose | Conditional and maintenance — long-context hygiene, knowledge grounding, prompt maintenance, output evaluation, L3/L4/L5 integration |
| Origin | Consolidation of QE Skills 13-16. Handles the ongoing system health operations that run conditionally based on session state. |
| Architecture role | Layer 2 (Production Pipeline). Maintenance and conditional extensions. Fires when long conversations exceed thresholds, when external sources need grounding, or when system health operations are needed. |
| Dependencies | Defers to `session-bootstrap` for the initialize command; integrates L3, L4, L5 accelerators |
| Load triggers | Long conversations (>7 turns or large context); external source material; prompt maintenance; output evaluation |
| Last audited | 2026-03-06 — PASSED (built and validated overnight) |
| Quality gate | Initial build validated against source material |

---

## Layer 3: Operational Skills (13 skills)

These handle Marc's direct commands, session management, quality enforcement, and specialized operational needs. They are "The Weapons" — loaded based on context.

### 6. audit
| Field | Value |
|-------|-------|
| Version | 3.4 |
| Purpose | Convergence-loop quality gate with Learning Ledger and mandatory 3-part chat output. The unified "audit" command — loops Passes 1-4 (Verify → Adversarial → Pre-Mortem → Revise) until zero material changes, then runs system learning + Learning Ledger, then shares with mandatory Post-Audit Chat Output (summary, Learning Ledger, attention items). Pass 5 learning scope covers the entire audit execution including setup-phase problems. |
| Origin | Originally two separate skills: "self-audit" (single comprehensive pass) and "audit" (undefined looping behavior in marc-ops-framework). Unified March 6, 2026 after Marc's observation: "The fact that you had to do three more passes before you got to zero was frustrating." Marc decided: "We don't need to talk about self-audit anymore. It'll just be audit." |
| Architecture role | Layer 3 (Post-Delivery Learning). The convergence-loop quality gate. Implements R-10, R-13. Produces the Learning Ledger (Learned / Memorialized / Activated) that makes self-learning visible. |
| Dependencies | None (self-contained protocol). Uses `issue-logger` format for Pass 5 findings. |
| Load triggers | Marc says "audit", "self audit", "check", "check yourself", "run a check", or "checkpoint" |
| Last audited | 2026-03-11 — PASSED (v3.4: Pass 5 scope expansion for setup-phase findings) |
| Quality gate | 8 audits passed. Major versions: v2.0 (initial), v3.0 (unified check+audit, PF-0), v3.1 (tempo adjustment, class-c threshold), v3.2 (Learning Ledger, Pass 5/6 reorder), v3.3 (mandatory 3-part chat output), v3.4 (Pass 5 scope expansion) |

### 7. session-bootstrap
| Field | Value |
|-------|-------|
| Version | 2.4 |
| Purpose | Session initialization and recovery protocol with tiered skill loading. "Initialize" command — reads all operational files, loads Tier 1 skills (marc-ops-framework + event-driven-reminders), defers Tier 2 skills (audit, structural-gates, issue-logger, milestone-persistence, prompt-optimizer, objective-intake, session-auth-api-access) to on-demand loading. Also handles "re-initialize" for delta refreshes. |
| Origin | Created to replace the ad-hoc session setup process where the AI would forget to load skills, miss operational files, or fail to detect context compaction. v2.4: Tiered loading implemented per Reflect Proposal #6 — reduces init token load from ~20,500 to ~10,600 tokens (~48% reduction). |
| Architecture role | Layer 3 (Operational). Session lifecycle management. Implements L4 (Context Continuity). |
| Dependencies | Loads `marc-ops-framework` and `event-driven-reminders` as Tier 1. References all operational files (session-state.md, commitment-registry.md, etc.) |
| Load triggers | Marc says "initialize", "re-initialize", "reinitialize", or "refresh" |
| Last audited | 2026-03-11 — PASSED (v2.4: Tiered loading. 2 loops. Trigger list alignment fix. Convergence reached.) |
| Quality gate | 4 audits passed. v2.4 current (tiered loading). |

### 8. prompt-optimizer
| Field | Value |
|-------|-------|
| Version | Current |
| Purpose | Skill 0 — prompt optimization engine. Classifies task difficulty, extracts true intent, builds self-contained problem statements with success criteria, presents optimized prompts at three tiers (silent/light/full). |
| Origin | Created to solve the problem of Marc spending multiple rounds revising AI output because the initial prompt wasn't structured well. Automates the "think before you act" step. |
| Architecture role | Layer 3 (Operational). Pre-execution optimization. Fires before the QE pipeline on complex/multi-step tasks. |
| Dependencies | Referenced by `objective-intake` which hands off to it. `qe-strategic-reasoning` defers to it when Skill 0 is active. |
| Load triggers | Auto-loads on complex/multi-step tasks |
| Last audited | Not formally audited — validated through daily operational use |
| Quality gate | Maintained through operational use |

### 9. source-verification
| Field | Value |
|-------|-------|
| Version | Current |
| Purpose | R-20 protocol — Level 2 verification for Tier 1 claims from primary vendor sources. Forces the AI to fetch the vendor's actual page and confirm pricing/features/specs live. |
| Origin | Born from the "Zine pricing screwup" — the AI cited pricing from stale training data instead of checking the vendor's website. Marc's reaction drove the creation of a formal verification protocol. |
| Architecture role | Layer 3 (Operational). Implements R-20 (Source Verification Protocol). Auto-loads on research, analysis, and document creation tasks. |
| Dependencies | None (self-contained protocol) |
| Load triggers | Auto-loads on research, analysis, document creation |
| Last audited | Not formally audited — validated through operational use |
| Quality gate | Maintained through operational use |

### 10. issue-logger
| Field | Value |
|-------|-------|
| Version | 1.2 |
| Skill ID | 491953a7 |
| Purpose | Structured capture of issues, mistakes, and corrections. The system's learning intake mechanism. Captures what/why/fix/rule for every issue, classifies (a/b/c/d), and hands PROMOTE recommendations to `qe-system-maintenance` for L2 processing. |
| Origin | Created to formalize the self-learning loop. Without structured issue capture, lessons were being learned but not promoted to permanent rules — the same mistakes repeated across sessions. Implements R-06 (Issue Log). |
| Architecture role | Layer 3 (Post-Delivery Learning). Implements R-06, feeds D-12 (Self-Learning Environment). Auto-triggers on Marc corrections, audit findings, regression FAILs, and self-caught errors. |
| Dependencies | PROMOTE recommendations hand off to `qe-system-maintenance` for L2 processing |
| Load triggers | Auto-triggers on any correction Marc makes, any problem Marc reveals via question, any mistake caught during audit, any regression FAIL, any self-caught error, R-24 Correction Checkpoint |
| Last audited | 2026-03-06 — PASSED |
| Quality gate | Built and validated March 6, 2026 |

### 11. deliverable-regression-check
| Field | Value |
|-------|-------|
| Version | 1.0 |
| Skill ID | 6e93ae74 |
| Purpose | Feature regression prevention across 8 dimensions. Compares new vs. prior version of any rich artifact before sharing. Implements R-17. |
| Origin | Born from the "v1.5→v1.6 incident" — a 31MB PDF became 158KB during an update, losing all content. Marc's frustration drove the creation of a formal regression check that runs before any file is re-shared. |
| Architecture role | Layer 3 (Operational). Implements R-17 (Feature Regression Prevention). Runs BEFORE share_file on any updated file. If a FAIL is found, feeds into `issue-logger`. |
| Dependencies | Feeds `issue-logger` on FAIL |
| Load triggers | Auto-loads when revising/updating/regenerating any existing file (PDF, PPTX, DOCX, XLSX, images, diagrams, HTML) |
| Last audited | 2026-03-06 — PASSED |
| Quality gate | Built and validated March 6, 2026 |

### 12. foundational-finding-protocol
| Field | Value |
|-------|-------|
| Version | Current |
| Purpose | Triple-save protocol for cross-thread discoveries. Ensures foundational findings survive thread death by persisting to memory, file, and skill simultaneously. |
| Origin | Created after the recognition that workspace files die with threads. Critical discoveries (like the Excel model QE validation or Rich's context isolation insight) needed persistence beyond any single thread. |
| Architecture role | Layer 3 (Post-Delivery Learning). Implements L6 (Domain Knowledge Accumulation). The L6 response to the orchestrator-script-loss incident of March 10, 2026. |
| Dependencies | None (self-contained protocol) |
| Load triggers | Auto-triggers when a foundational finding is identified (technical breakthrough, validated constraint, architectural decision, working implementation). Also triggers on Marc saying "capture finding" or "save this discovery". |
| Last audited | Not formally audited — validated through operational use |
| Quality gate | Maintained through operational use |

### 13. marc-diagram-style
| Field | Value |
|-------|-------|
| Version | Current |
| Skill ID | af9b06ae-fab4-43f0-8b42-7ace669802b4 |
| Purpose | 15 rendering rules for technical diagrams — font sizes, brand colors, layout, alignment, storytelling, content-first layout planning, ground-then-build workflow. Includes mandatory post-render self-audit. |
| Origin | Created to stop the cycle of 5+ revision rounds on diagrams. Marc's preferences for large fonts, Perplexity brand colors, left alignment, full-width banners, and layered backgrounds were being violated every time. Codified into a skill so diagrams come out right on the first try. |
| Architecture role | Layer 3 (Operational). Visual formatting standard. |
| Dependencies | None |
| Load triggers | When creating diagrams or visual assets |
| Last audited | Not formally audited — validated through operational use |
| Quality gate | Maintained through operational use |

### 14. thread-resuscitation
| Field | Value |
|-------|-------|
| Version | 1.0 |
| Skill ID | 9451d1e0 |
| Purpose | 6-step recovery protocol for dead or compacted threads. Includes 5 recovery patterns (Confident Ghost, Detail Fade, Orphaned Script, Credential Gap, Decision Drift). |
| Origin | Created March 10, 2026 after repeated thread death/compaction events caused loss of context, decisions, and working implementations. Systematic approach to recovering what survived and identifying what was lost. |
| Architecture role | Layer 3 (Operational). Thread lifecycle management. |
| Dependencies | References all operational files for state recovery |
| Load triggers | Marc provides context from a dead thread and needs to continue that work. Triggers on pasted conversation content, dead thread links, or explicit "recover/resuscitate" requests. |
| Last audited | 2026-03-10 — built and validated |
| Quality gate | Built March 10, 2026 |

### 15. reflect
| Field | Value |
|-------|-------|
| Version | 1.1 |
| Purpose | 7-dimension strategic system review — Problem-Solution Fit, Complexity Audit, Context-Load Pragmatism, Blind Spot Scan, Hardening Assessment, Effectiveness Check, Simplification Pass. Produces an 11-column proposals table with Blast Radius, Ripple Risk, Reversibility, and Sequencing analysis. |
| Origin | Created to provide a "zoom out" mechanism. After building 18 skills and 26 rules, Marc needed a way to evaluate whether the forest was still visible through the trees — whether the system as a whole still made sense. |
| Architecture role | Layer 3 (Operational). System-level strategic review. |
| Dependencies | None |
| Load triggers | Marc says "reflect". Also suggest proactively after every 3-5 significant system changes. |
| Last audited | Not formally audited — validated through operational use |
| Quality gate | Maintained through operational use |

---

## Orchestration and Context Skills (3 skills)

These handle objective framing, persona selection, and domain-specific context. They sit between session initialization and execution.

### 16. objective-intake
| Field | Value |
|-------|-------|
| Version | 2.0 |
| Purpose | Pre-Skill 0 orchestration — 5-step protocol: Outcome Framing, Persona Selection, Skill Routing, Agent/Model Routing (using model-catalog), Execution Mode. D-08 (budget not a constraint) applied to model selection. |
| Origin | Created to bridge the gap between Marc stating an objective and Skill 0 optimizing the prompt. Without it, the AI would jump straight to prompt optimization without framing the outcome, selecting the right persona, or routing to the right skills. |
| Architecture role | Orchestration layer. Runs AFTER `session-bootstrap`, BEFORE `prompt-optimizer`. |
| Dependencies | Defers to `session-bootstrap` for the initialize sequence; hands off to `prompt-optimizer` for Skill 0 execution |
| Load triggers | After `session-bootstrap` completes, before `prompt-optimizer`. When Marc states a new objective. |
| Last audited | 2026-03-10 — PASSED (v2.0 upgrade) |
| Quality gate | v2.0 validated March 10, 2026 |

### 17. persona-ai-infrastructure-strategist
| Field | Value |
|-------|-------|
| Version | Current |
| Skill ID | 4b7ee6b1 |
| Purpose | Identity persona for AI Life Brain architecture work — architecture strategy and implementation reality. |
| Origin | Created to give the AI a specific identity when working on AI Life Brain projects. Sets the role as an infrastructure strategist rather than a generic assistant. |
| Architecture role | Orchestration (persona). Scoped to AI Life Brain sessions only. |
| Dependencies | Selected by `objective-intake` Step 2 (Persona Selection) |
| Load triggers | When `objective-intake` selects this persona, or when Marc is working on AI Life Brain architecture, tool evaluation, or knowledge infrastructure |
| Last audited | Not formally audited — loaded and used operationally |
| Quality gate | Maintained through operational use |

### 18. persona-ai-productivity-architect
| Field | Value |
|-------|-------|
| Version | Current |
| Skill ID | 9b4f51f1-c83a-4307-be6f-61be5045e6dd |
| Purpose | Identity persona for technical setup, learning, and AI productivity optimization. Four phases: A (Technical Foundation), B (Guided Mastery), C (Force Multiplication), D (Intelligence Feed — monitoring releases/betas/rumors). |
| Origin | Created to provide structured guidance for Marc's Mac/tool setup and productivity optimization. Covers the full lifecycle from foundation to staying current. |
| Architecture role | Orchestration (persona). Covers Mac/tool setup, configuration, integration, learning workflows, AI productivity. |
| Dependencies | Selected by `objective-intake` Step 2 (Persona Selection) |
| Load triggers | When `objective-intake` selects this persona, or when Marc is working on Mac/tool setup, configuration, integration, learning workflows, or AI productivity optimization |
| Last audited | Not formally audited — loaded and used operationally |
| Quality gate | Maintained through operational use |

---

## Phase 1 QE Operational Skills (3 skills — NEW March 11, 2026)

These implement the Phase 1 QE upgrades: structural enforcement, event-driven detection, and context-isolated verification. They are Operational (Layer 3) skills.

### 16a. structural-gates
| Field | Value |
|-------|-------|
| Version | 1.5 |
| Skill ID | 7b640031-2626-4710-9925-9fc05ba44b3b |
| Purpose | Structural enforcement gate framework. Converts behavioral rules to mechanically-enforced checks that fire at specific trigger points. Contains the 5-component gate pattern, 10 active gates (R-25 ×2, R-17 ×3, R-24 ×2, R-11, R-07, R-26), 4 enforcement tiers, conversion procedure, monitoring queue, and Gate 6 downstream trace. |
| Origin | QE Phase 1, Upgrade 3 (March 11, 2026). Built after the R-17 load_skill overwrite incident proved that behavioral enforcement alone is insufficient. The pattern was already emerging (R-24 File Freshness Gate, R-17 Load Skill Guard) — this skill codifies it as a reusable framework. |
| Architecture role | Layer 3 (Operational). Enforcement infrastructure. Referenced when converting rules or building new gates. |
| Dependencies | `marc-ops-framework` (rule definitions) |
| Load triggers | When converting a behavioral rule to structural enforcement, when class-c threshold hit, when building new gates |
| Last audited | 2026-03-12 — v1.5. Gate 10 (R-25 Export Frontmatter Guard) added. Gate 9 added (v1.4, March 11). Content Substance tier added (v1.3, March 11). |
| Quality gate | 5 audits passed. v1.5 current. |

### 16b. event-driven-reminders
| Field | Value |
|-------|-------|
| Version | 1.0 |
| Skill ID | e4aa5f3b-f104-47af-b23b-70b93fbdfd17 |
| Purpose | Event-driven system reminders. 8 detectors that fire at natural decision points, injecting targeted guidance at the moment of failure. Replaces the polling model (AI must remember) with injection (system detects and surfaces). |
| Origin | QE Phase 1, Upgrade 2 (March 11, 2026). Built to address attention decay: research shows rules are reliably violated after 30+ tool calls. The OpenDev framework measured this and built 8 event detectors + 24 named reminders. |
| Architecture role | Layer 3 (Operational). Detection and guidance injection. Loaded at session start. |
| Dependencies | `marc-ops-framework` (rule definitions), `structural-gates` (linked gates) |
| Load triggers | Auto-loads at session start. Sweep protocol fires at 3 checkpoints. |
| Last audited | 2026-03-11 — R-26 acceptance tests: 7/7 PASS. Phase 1 audit in progress. |
| Quality gate | Pending formal convergence audit |

### 16c. context-isolated-checks
| Field | Value |
|-------|-------|
| Version | 1.0 |
| Skill ID | 684b30f3-5b81-4fa9-a703-1c5e879ef848 |
| Purpose | Context-isolated quality verification. Spawns subagent verifiers with fresh context windows so quality checks aren't contaminated by the reasoning that produced the work. 4-step protocol with convergence. |
| Origin | QE Phase 1, Upgrade 1 (March 11, 2026). Rich Schefren's foundational insight: "80% of the difference between agents and skills is that a skill is contaminated by the current context." Validated by Tony's Arena system, OpenDev's subagent orchestration, and the "Agents of Chaos" paper. |
| Architecture role | Layer 2/3 bridge. Quality verification infrastructure. Integrates with audit and qe-quality-assurance. |
| Dependencies | None (self-contained protocol). References `source-verification` for R-20 checks. |
| Load triggers | When verifying important deliverables (reports, permanent files, external-facing documents) |
| Last audited | 2026-03-11 — R-26 acceptance tests: 8/8 PASS. Phase 1 audit in progress. |
| Quality gate | Pending formal convergence audit |

### 16d. milestone-persistence
| Field | Value |
|-------|-------|
| Version | 1.0 |
| Skill ID | Pending (new — not yet saved to library) |
| Purpose | R-24 enforcement protocol. Contains 7 sub-features extracted from R-24: compaction self-detection, milestone persistence, Milestone Checkpoint Gate, R-26 Enforcement Sub-Gate, File Freshness Gate, 60-Minute Staleness Alarm, and Correction Checkpoint. Each sub-feature is independently described and checkable. |
| Origin | Extracted from marc-ops-framework R-24 per Reflect Proposal #1 (March 11, 2026). R-24 had grown to 814 tokens — the longest rule by 2x — containing 7 sub-features competing for attention in a single table cell. |
| Architecture role | Layer 3 (Operational). Enforcement protocol for session continuity and file currency. |
| Dependencies | `marc-ops-framework` (R-24 summary points here), `structural-gates` (Gates 3, 6), `issue-logger` (Correction Checkpoint), `event-driven-reminders` (detectors #1, #3) |
| Load triggers | When R-24 enforcement details are needed. Auto-referenced by audit Pre-Flight and event-driven-reminders. |
| Last audited | 2026-03-11 — Initial build, pending audit. |
| Quality gate | Pending convergence audit |

---

## Utility Skills (3 skills — not counted in the 22 core skills)

These serve specialized utility functions and are loaded on demand.

### 19. session-auth-api-access
| Field | Value |
|-------|-------|
| Version | Current |
| Skill ID | 579fc495-90b7-4464-aa52-a405d420725c |
| Purpose | Access web apps programmatically using session cookies as Bearer tokens. Covers cookie export, token exchange, Cloudflare bypass via curl_cffi, and endpoint discovery. |
| Origin | Created when Marc needed to interact with web apps (Claude, ChatGPT, etc.) that have no official API or charge extra for API access. |
| Architecture role | Utility. Loaded on demand for web API automation tasks. |
| Dependencies | Works with `creative-bypass` for obstacle resolution |
| Load triggers | When facing web API automation tasks or needing to interact with apps via session cookies |
| Last audited | Not formally audited — validated through operational use |
| Quality gate | Maintained through operational use |

### 20. creative-bypass
| Field | Value |
|-------|-------|
| Version | 2.0 |
| Skill ID | 62cfcb63-eb2e-4c07-baf0-7b82564c6ccf |
| Purpose | Relentless problem-solving disposition with operational protocols. Forces creative, exhaustive, forensic approach to every obstacle. Includes community intelligence gathering, solution space enumeration, assumption testing, and refusal to accept partial results. |
| Origin | Created after repeated instances where the AI gave up too easily on technical obstacles, accepting "good enough" instead of pushing for the actual solution. Marc's standard: "Good enough is not good enough." |
| Architecture role | Utility. Operational personality for problem-solving. |
| Dependencies | None |
| Load triggers | Any multi-step technical task, any obstacle encountered, any situation where "good enough" might be accepted prematurely |
| Last audited | Not formally audited — v2.0 validated with 6-step replication pattern |
| Quality gate | v2.0 validated with 6-step replication pattern |

### 21. perplexity-capabilities
| Field | Value |
|-------|-------|
| Version | Current |
| Skill ID | 6b099d63-c3aa-46e4-b10d-9ce4ad45e49f |
| Purpose | Authoritative inventory of Perplexity Computer capabilities and enforcement protocol against false "I can't" claims. Consulted before any capability claim or denial. |
| Origin | Created March 6, 2026 after the AI repeatedly claimed it couldn't do things that Perplexity Computer actually supports. The skill serves as the ground truth for what the platform can and cannot do. |
| Architecture role | Utility. Consulted before any capability claim or denial. |
| Dependencies | None |
| Load triggers | Before any capability claim or denial about Perplexity Computer |
| Last audited | 2026-03-06 — PASSED (2-loop convergence) |
| Quality gate | Built and audited March 6, 2026 |

---

## Deprecated Skills

### check-protocol (DEPRECATED)
| Field | Value |
|-------|-------|
| Status | DEPRECATED — merged into `audit` v3.0 |
| Purpose | Was the "check" command protocol. Now all check trigger words route to `audit`. |
| Reason for deprecation | Marc decided: "We don't need to talk about self-audit anymore. It'll just be audit." Unified March 6, 2026. |

### self-audit (DEPRECATED)
| Field | Value |
|-------|-------|
| Status | DEPRECATED — merged into `audit` v3.0 |
| Purpose | Was the 7-stage single-pass quality loop (orient, verify, adversarial test, pre-mortem, revise, share, system learning). Now subsumed by the unified convergence-loop audit. |
| Reason for deprecation | Marc decided: "We don't need to talk about self-audit anymore. It'll just be audit." The old single-pass approach was replaced by the convergence loop + Learning Ledger. March 10, 2026. |

---

## Architecture Summary

| Category | Count | Skills |
|----------|:-----:|--------|
| Master Framework | 1 | marc-ops-framework |
| QE Pipeline (Layer 2) | 4 | qe-strategic-reasoning, qe-reasoning-engine, qe-quality-assurance, qe-system-maintenance |
| Operational (Layer 3) | 13 | audit, session-bootstrap, prompt-optimizer, source-verification, issue-logger, deliverable-regression-check, foundational-finding-protocol, marc-diagram-style, thread-resuscitation, reflect, structural-gates, event-driven-reminders, context-isolated-checks |
| Orchestration | 3 | objective-intake, persona-ai-infrastructure-strategist, persona-ai-productivity-architect |
| Utility | 3 | session-auth-api-access, creative-bypass, perplexity-capabilities |
| Deprecated | 2 | check-protocol, self-audit |
| In development | 1 | multi-llm-research-orchestration (orchestrator skill not yet saved — all 4 platforms functional, end-to-end testing pending) |
| **Total active** | **25** | (22 core + 3 utility) |

---

## Dependency Map (Defer-To Chains)

```
marc-ops-framework (root)
├── audit ← (marc says "audit"/"check")
├── session-bootstrap ← (marc says "initialize")
├── prompt-optimizer ← (complex tasks)
├── reflect ← (marc says "reflect")
├── objective-intake → prompt-optimizer (hands off to Skill 0)
│   ├── persona-ai-infrastructure-strategist
│   └── persona-ai-productivity-architect
├── qe-strategic-reasoning → defers to prompt-optimizer (when Skill 0 active)
├── qe-quality-assurance → defers to audit (when marc says "audit")
├── qe-system-maintenance → defers to session-bootstrap (for initialize)
├── issue-logger → hands PROMOTE to qe-system-maintenance (for L2)
├── deliverable-regression-check → feeds issue-logger (on FAIL)
├── structural-gates (enforcement infrastructure, Phase 1 QE)
├── event-driven-reminders (detection + guidance injection, Phase 1 QE)
├── context-isolated-checks (subagent verification, Phase 1 QE)
├── source-verification (standalone, R-20)
├── foundational-finding-protocol (standalone, L6)
├── marc-diagram-style (standalone, visual)
└── thread-resuscitation (standalone, recovery)
```

---

## Update Protocol

This file must be updated when:
- Any skill is created, modified, saved, or deprecated
- Any audit is run on a skill (update "Last audited" field)
- Any version number changes
- Any new dependency or defer-to relationship is established

After updating, re-share to Files tab with the same name ("Skill-Registry") to maintain version history.

---

*This file is the single source of truth for Marc's skill system inventory. For the current rule text and enforcement details, see `marc-ops-framework`. For the architectural philosophy, see `AI-Brain-Architecture.md`. For the legislative history of rules, see `Rules-and-Decisions-Log.md`.*
