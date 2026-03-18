# System Audit Checklist

**Quality Engine v4**
**Purpose:** Score any agentic AI system against 58 best practices. For each item: HAS (well-implemented), PARTIAL (exists but incomplete), or MISSING. The "Implement With" column tells you which QE v4 file to use.

---

## How to Run This Audit

1. Open your system's codebase/documentation
2. For each item below, search your system for the equivalent
3. Score: HAS / PARTIAL / MISSING
4. Count your totals at the bottom
5. Use the "Implement With" column to find the QE v4 file that closes each gap
6. Follow `IMPLEMENTATION-GUIDE.md` for the phased upgrade plan

---

## A. System Core & Governance

| # | Best Practice | What to Look For | Implement With | Score |
|---|--------------|-----------------|----------------|-------|
| A1 | **Universal execution constraints** — Single file governing ALL skills/agents with execution rules, forbidden behaviors, session protocol | A top-level rules file that every skill/agent references | `core/SYSTEM-CORE.md` | |
| A2 | **Session architecture** — Documented model assignment strategy (which model for which tasks) + session structure | A doc showing which AI model runs which skills and why | `templates/SESSION-ARCHITECTURE.md` | |
| A3 | **Conditional protocol loading** — Priority-banded system that loads only needed protocols per skill/agent | Protocol manifest with per-skill loading profiles | `templates/PROTOCOL-MANIFEST.md` | |
| A4 | **Operations manual** — Single reference for directory structure, pipeline, execution workflow | An operator-facing manual (not architecture docs) | `templates/OPERATIONS-MANUAL.md` | |
| A5 | **Tool/MCP registry** — Maps which external tools each skill/agent needs, with setup verification + cost estimates | A registry showing tool → skill → task mapping | `templates/MCP-TOOL-REGISTRY.md` | |
| A6 | **Canonical output structure** — Standardized output directory with constraint-ledger, fact-changes, issue-log, learning-log | Consistent output tree across all projects | `templates/OUTPUT-STRUCTURE.md` | |
| A7 | **Per-skill index files** — Lightweight files extracting critical enforcement per skill/agent | Quick-reference files with thresholds and gates | (Create from your anti-degradation files) | |
| A8 | **Skill/agent loading profiles** — YAML files declaring what each skill/agent needs to load | YAML profiles with MCP tools, protocols, reference files | `templates/SKILL-LOADING-PROFILE.yaml` | |

## B. Quality Gates & Enforcement

| # | Best Practice | What to Look For | Implement With | Score |
|---|--------------|-----------------|----------------|-------|
| B1 | **PASS/FAIL gate system** — Structural gates between layers. File must exist on disk for downstream to proceed. | Gate YAML files, file-existence checks | `core/GATE-SYSTEM.md` | |
| B2 | **Per-skill anti-degradation files** — Every skill/agent has its own enforcement file with EQUAL authority to system core | Per-skill files with failure modes, forbidden behaviors, thresholds | `core/ANTI-DEGRADATION-CORE.md` | |
| B3 | **Mandatory read declaration** — Before execution, write a declaration proving enforcement file was read (filename + version + specific "I WILL NOT" behaviors) | Declaration template with version matching | `core/EXECUTION-GUARDRAILS.md` | |
| B4 | **Per-microskill output protocol** — Every microskill that executes MUST produce a dedicated output file | Named output files matching microskill, with size thresholds | `core/GATE-SYSTEM.md` | |
| B5 | **Forbidden gate statuses** — "conditional pass," "partial pass," "sufficient for analysis" are structurally banned | Explicit list of banned status values | `core/GATE-SYSTEM.md` | |
| B6 | **Non-negotiable numeric thresholds** — Exact numbers, not ranges. "Close enough" does not exist. | Hard minimums that cannot be rationalized away | `core/ANTI-DEGRADATION-CORE.md` | |

## C. Pipeline & Handoffs

| # | Best Practice | What to Look For | Implement With | Score |
|---|--------------|-----------------|----------------|-------|
| C1 | **Pipeline handoff registry** — Formal data contracts between skills/agents with required fields and validation rules | Registry doc with per-handoff field requirements | `protocols/PIPELINE-HANDOFF-REGISTRY.md` | |
| C2 | **Input validators** — Check field PRESENCE, not just file existence. Missing field = HALT with field name. | Automated or documented field-presence checks | `protocols/PIPELINE-HANDOFF-REGISTRY.md` | |
| C3 | **Arena-dependent field verification** — Outputs from competitive generation require verification flags | `arena_selection_verified: true` or equivalent | `protocols/ARENA-CORE-PROTOCOL.md` | |
| C4 | **Context reservoir** — Human-curated bridge document between foundation and execution sessions | Distilled intelligence doc reviewed by human | `core/SYSTEM-CORE.md` (Context Reservoir section) | |

## D. Metacognition & Self-Monitoring

| # | Best Practice | What to Look For | Implement With | Score |
|---|--------------|-----------------|----------------|-------|
| D1 | **MC-CHECK protocol** — Mandatory metacognitive checkpoint with confidence scoring and rushing detection | Structured self-assessment at decision points | `core/SYSTEM-CORE.md` | |
| D2 | **MC-CHECK-LITE** — Lightweight version for frequent checks | Quick confidence/rushing check | `core/SYSTEM-CORE.md` | |
| D3 | **Context zone management** — GREEN/YELLOW/ORANGE/RED/CRITICAL with token thresholds and zone-specific response protocols | Zone system with automated or manual tracking | `core/SYSTEM-CORE.md` | |
| D4 | **Compaction self-detection** — Detects >30% content loss on re-read and alerts | Hook or instruction to detect context compression | `hooks/validators/token_estimator.py` | |
| D5 | **Adaptive compaction protocol** — 5-stage progressive compression strategy for context pressure | Structured approach to what to keep/compress/discard | `protocols/ADAPTIVE-COMPACTION-PROTOCOL.md` | |

## E. Creative Competition System

| # | Best Practice | What to Look For | Implement With | Score |
|---|--------------|-----------------|----------------|-------|
| E1 | **Multi-competitor generation** — Multiple distinct perspectives generate independently | 3-7 competitors with different approaches | `protocols/ARENA-CORE-PROTOCOL.md` | |
| E2 | **Dedicated critic role** — Adversarial quality control separate from generation | Critic that identifies weaknesses with evidence | `protocols/ARENA-CORE-PROTOCOL.md` | |
| E3 | **Diversity audit** — Pairwise convergence check to prevent homogeneous outputs | Check for convergent outputs, divergence protocol | `protocols/ARENA-CORE-PROTOCOL.md` | |
| E4 | **Learning briefs** — Transfers techniques (not voice) between rounds | Round-over-round improvement without merging | `protocols/ARENA-CORE-PROTOCOL.md` | |
| E5 | **Tier system** — Adjusts exploration depth WITHOUT lowering quality thresholds | Full/Standard/Quick with identical minimum scores | `protocols/ARENA-CORE-PROTOCOL.md` | |
| E6 | **Strategic challenger** — FLAG/BLOCK/CONVINCE ME for consequential decisions | Persistent adversarial role at strategic level | `protocols/CHALLENGER-PROTOCOL.md` | |

## F. Change Management & Tracking

| # | Best Practice | What to Look For | Implement With | Score |
|---|--------------|-----------------|----------------|-------|
| F1 | **Constraint ledger** — YAML-based decision tracking with IDs, rationale, downstream impacts, supersede chains | Structured decision log (not just session notes) | `protocols/CONSTRAINT-LEDGER-PROTOCOL.md` | |
| F2 | **Fact change propagation** — 6-step protocol when factual values change mid-pipeline | Search → propagate → log → gate check | `protocols/FACT-CHANGE-PROPAGATION.md` | |
| F3 | **Feedback/revision protocol** — 3 severity levels (Light Edit / Structural / Full Regen) with re-load requirements | Defined revision handling that prevents "drift to raw model" | `protocols/FEEDBACK-REVISION-PROTOCOL.md` | |
| F4 | **Material change taxonomy** — Classification of what constitutes a material change | Categories determining propagation tier | `protocols/FACT-CHANGE-PROPAGATION.md` | |

## G. Voice, Specimens & Humanization

| # | Best Practice | What to Look For | Implement With | Score |
|---|--------------|-----------------|----------------|-------|
| G1 | **Specimen guide** — Golden examples indexed by pattern type, injected at generation time | Type-indexed examples loaded during generation | `protocols/SPECIMEN-GUIDE.md` | |
| G2 | **Humanization protocol** — 3-layer model (word-level, structural, voice) for AI pattern elimination | Systematic approach to making AI output sound human | `protocols/HUMANIZATION-PROTOCOL.md` | |
| G3 | **Humanization pattern library** — Living library that grows with every human edit | 12+ documented AI anti-patterns | `protocols/HUMANIZATION-PROTOCOL.md` | |
| G4 | **Human edit extraction** — Systematic process to learn from human edits | DIFF → CLASSIFY → PATTERN → LIBRARY UPDATE | `protocols/HUMANIZATION-PROTOCOL.md` | |
| G5 | **Anti-slop lexicon** — Banned words/phrases that signal AI-generated output | Banned word list with replacements | `protocols/ANTI-SLOP-LEXICON.md` | |

## H. Verification & Integrity

| # | Best Practice | What to Look For | Implement With | Score |
|---|--------------|-----------------|----------------|-------|
| H1 | **Active recitation** — Mid-pipeline strategic anchor refresh to combat context loss | Restates key decisions at pipeline midpoint | `protocols/ACTIVE-RECITATION-PROTOCOL.md` | |
| H2 | **Foundation integrity check** — Cross-session verification that foundation decisions match actual outputs | Verification between foundation and execution | `protocols/SCOPED-VERIFICATION-PROTOCOL.md` | |
| H3 | **Scoped verification points** — Staged verification at 4+ points across pipeline | Foundation boundary, midpoint, quality, coherence | `protocols/SCOPED-VERIFICATION-PROTOCOL.md` | |

## I. Learning & Continuous Improvement

| # | Best Practice | What to Look For | Implement With | Score |
|---|--------------|-----------------|----------------|-------|
| I1 | **Issue logger** — Structured incident capture with 10 issue classes | Categorized issue log (not free-text notes) | `templates/LEARNING-SYSTEM.md` | |
| I2 | **Self-learning promotion** — L1-L6 learning levels with promotion path to system changes | Observations → validated → actionable → promoted | `protocols/SELF-LEARNING-PROMOTION.md` | |
| I3 | **Learning log** — L-level classified learnings | Structured learning entries with level classification | `templates/LEARNING-SYSTEM.md` | |
| I4 | **Skill rollback protocol** — Snapshots at key completion points for rollback | Tag/snapshot system for reverting degraded output | `core/GATE-SYSTEM.md` | |

## J. Automated Enforcement (Hooks)

| # | Best Practice | What to Look For | Implement With | Score |
|---|--------------|-----------------|----------------|-------|
| J1 | **Dispatch validator** — Main hook dispatcher routing to specialized checks on file write | Hook system that fires on Write/Edit operations | `hooks/dispatch-validator.sh` | |
| J2 | **Schema compliance validator** — Checks required fields in output files | Automated field-presence checking | `hooks/validators/schema_validator.py` | |
| J3 | **Fact change validator** — Detects stale values from incomplete propagations | Automated old-value detection | `hooks/validators/fact_change_validator.py` | |
| J4 | **Token estimator hook** — Tracks cumulative token usage and zone transitions | Automated context zone tracking | `hooks/validators/token_estimator.py` | |
| J5 | **Session-end stop hook** — Scans for critical issues before session completion | End-of-session validation | `hooks/dispatch-validator.sh` (--final-check) | |
| J6 | **Forbidden status validator** — Catches "conditional pass" and similar banned statuses | Automated gate status checking | `hooks/validators/forbidden_status_validator.py` | |

## K. Startup & Onboarding

| # | Best Practice | What to Look For | Implement With | Score |
|---|--------------|-----------------|----------------|-------|
| K1 | **Role-based entry points** — Different starting files for operators vs developers vs tool setup | "Start here" routing by role | `templates/OPERATIONS-MANUAL.md` | |
| K2 | **MCP/tool setup guide** — Step-by-step configuration with verification commands | Setup guide with "confirm it works" steps | `templates/MCP-TOOL-REGISTRY.md` | |
| K3 | **Reference knowledge base** — Non-operational reference material separated from operational docs | Brain/reference directory NOT loaded during execution | (Organizational practice) | |

## L. System-Agnostic Design

| # | Best Practice | What to Look For | Implement With | Score |
|---|--------------|-----------------|----------------|-------|
| L1 | **Structures over instructions** — File-existence gates, not instruction compliance | Gates that require physical files, not just rules | `core/GATE-SYSTEM.md` | |
| L2 | **Model-agnostic protocols** — Nothing platform-specific in protocol stack | All protocols work with any AI model | (Design principle — verify all files) | |
| L3 | **Template-based injection** — Specimens/examples in plain text, not model-specific prompts | Any model can consume the examples | `protocols/SPECIMEN-GUIDE.md` | |
| L4 | **Human-readable formats** — YAML/Markdown over code for protocols and constraints | No Python/JS required to understand the system | (Design principle) | |

---

## Scoring Summary

| Category | Items | HAS | PARTIAL | MISSING |
|----------|-------|-----|---------|---------|
| A. System Core | 8 | | | |
| B. Quality Gates | 6 | | | |
| C. Pipeline | 4 | | | |
| D. Metacognition | 5 | | | |
| E. Creative Competition | 6 | | | |
| F. Change Management | 4 | | | |
| G. Voice/Humanization | 5 | | | |
| H. Verification | 3 | | | |
| I. Learning | 4 | | | |
| J. Hooks/Automation | 6 | | | |
| K. Onboarding | 3 | | | |
| L. System-Agnostic | 4 | | | |
| **TOTALS** | **58** | | | |

**Scoring Guide:**
- **45+ HAS:** Mature system. Focus on PARTIAL items.
- **30-44 HAS:** Solid foundation. Prioritize B (Gates), D (Metacognition), F (Change Management).
- **15-29 HAS:** Early stage. Start with core/ files, then protocols/.
- **<15 HAS:** Greenfield. Follow IMPLEMENTATION-GUIDE.md from Phase 0.
