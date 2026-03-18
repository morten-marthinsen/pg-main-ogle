# Implementation Guide

**Quality Engine v4**
**Purpose:** Phased walkthrough for upgrading any agentic AI system using Quality Engine v4 components.

---

## Before You Start

1. Run the audit: `SYSTEM-AUDIT-CHECKLIST.md` — score every item
2. Note your MISSING and PARTIAL items — those are your implementation targets
3. Follow the phases below in order — each phase builds on the previous

**Rule:** One phase at a time. Complete a phase, review all outputs, confirm before moving to the next. Do NOT let your AI combine phases.

---

## Phase 0 — Foundation (Do First)

**Goal:** Establish the governance backbone that everything else connects to.

### 0.1 Create Your System Core

**File:** `core/SYSTEM-CORE.md`

**Prompt for your AI:**

> Read `core/SYSTEM-CORE.md` from the Quality Engine v4 package. This defines universal execution constraints for any agentic system.
>
> Adapt it for our system. Create a SYSTEM-CORE.md that:
> 1. Defines our universal execution rules (adapt "The 7 Laws" for our domain)
> 2. Includes the MC-CHECK protocol (confidence scoring, rushing detection)
> 3. Includes context zone management (GREEN through CRITICAL with thresholds)
> 4. Includes session continuity rules (handoff protocol, state verification)
> 5. Lists forbidden behaviors specific to our system
> 6. States its authority: EQUAL to all skill/agent-level files
>
> Show me the draft before writing. One phase, one stop.

**Done when:** A SYSTEM-CORE.md exists that every skill/agent in your system references.

### 0.2 Create Your Anti-Degradation System

**File:** `core/ANTI-DEGRADATION-CORE.md`

**Prompt for your AI:**

> Read `core/ANTI-DEGRADATION-CORE.md` from the Quality Engine v4 package. This defines structural enforcement that prevents execution breakdown.
>
> Create a core anti-degradation file for our system, then create adapter files for each of our [skills/agents]. The core file defines universal enforcement. Each adapter adds domain-specific gates.
>
> The core must include: session resume verification, phase-stop enforcement, forbidden rationalizations, context load management, MC-CHECK integration, handoff verification.
>
> Show me the draft. One phase, one stop.

**Done when:** Core anti-degradation file exists + one adapter per skill/agent.

### 0.3 Set Up Your Gate System

**File:** `core/GATE-SYSTEM.md`

**Prompt for your AI:**

> Read `core/GATE-SYSTEM.md` from the Quality Engine v4 package.
>
> Define gates for our system:
> - GATE_0: Read declaration (proves anti-degradation file was read)
> - Layer/phase gates between major execution stages
> - Skill/agent completion gates
> - All gates are PASS/FAIL only. Include the forbidden statuses list.
> - Gates require file existence on disk — not just instruction compliance.
>
> Show me the draft. One phase, one stop.

**Done when:** Gates defined, forbidden statuses banned, GATE_0 template ready.

---

## Phase 1 — Pipeline Integrity

**Goal:** Ensure data flows correctly between skills/agents.

### 1.1 Create Pipeline Handoff Registry

**File:** `protocols/PIPELINE-HANDOFF-REGISTRY.md`

**Prompt:** Read the QE v4 pipeline handoff registry. Document every handoff in our system with required fields, validation rules, and HALT behavior on failure.

### 1.2 Create Constraint Ledger

**File:** `protocols/CONSTRAINT-LEDGER-PROTOCOL.md`

**Prompt:** Read the QE v4 constraint ledger protocol. Create a YAML-based decision tracking system for our strategic decisions. Include ID, rationale, downstream impacts, supersede chains.

### 1.3 Create Fact Change Propagation

**File:** `protocols/FACT-CHANGE-PROPAGATION.md`

**Prompt:** Read the QE v4 fact change propagation protocol. Adapt the 6-step process for our system's fact change scenarios. Create the fact-changes.yaml format.

**Done when:** Every handoff documented, constraint tracking active, change propagation protocol defined.

---

## Phase 2 — Context Management

**Goal:** Prevent context loss across sessions.

### 2.1 Create Session Architecture

**File:** `templates/SESSION-ARCHITECTURE.md`

**Prompt:** Read the QE v4 session architecture template. Document which models run which tasks in our system and why. Define session structure and context loading order. Keep it system-agnostic.

### 2.2 Set Up Compaction Detection

**Source:** `core/SYSTEM-CORE.md` (compaction section) + `hooks/validators/token_estimator.py`

**Prompt:** Add compaction self-detection to our system. If re-reading returns less content than expected, ALERT and re-read from source. Set up the token estimator hook if using Claude Code.

### 2.3 Create Adaptive Compaction Protocol

**File:** `protocols/ADAPTIVE-COMPACTION-PROTOCOL.md`

**Prompt:** Read the QE v4 adaptive compaction protocol. Define 5 stages of progressive compression for our system. Specify what's ALWAYS kept full per skill/agent.

**Done when:** Session architecture documented, compaction detection active, compression strategy defined.

---

## Phase 3 — Automated Enforcement

**Goal:** Move enforcement from instructions (can be ignored) to hooks (cannot be bypassed).

### 3.1 Set Up Hook System

**Files:** `hooks/` directory

**Prompt:** Read the QE v4 hooks README. Set up the dispatch validator, token estimator, and session reset hook for our system. Register in settings.

### 3.2 Add Domain-Specific Validators

**Prompt:** Based on our pipeline handoff registry and gate system, create validators for: schema compliance (required fields), forbidden gate statuses, and fact change staleness.

**Done when:** Hooks fire on file writes, validators catch violations, session resets on start.

---

## Phase 4 — Documentation & Onboarding

**Goal:** Make the system usable by anyone, not just the person who built it.

### 4.1 Create Operations Manual

**File:** `templates/OPERATIONS-MANUAL.md`

**Prompt:** Read the QE v4 operations manual template. Create an operator-facing manual with: system overview, directory structure, pipeline diagram, execution workflow, role-based entry points, common workflows.

### 4.2 Create Tool Registry

**File:** `templates/MCP-TOOL-REGISTRY.md`

**Prompt:** Read the QE v4 tool registry template. Map every external tool to every skill/agent in our system. Include setup verification, critical vs optional flags, and cost estimates.

### 4.3 Create Protocol Manifest

**File:** `templates/PROTOCOL-MANIFEST.md`

**Prompt:** Read the QE v4 protocol manifest template. Create priority-banded conditional loading so each skill/agent only loads what it needs.

### 4.4 Standardize Output Structure

**File:** `templates/OUTPUT-STRUCTURE.md`

**Prompt:** Read the QE v4 output structure template. Define our canonical output directory with constraint-ledger, fact-changes, issue-log, and learning-log at known locations.

**Done when:** New operator can start from the operations manual and be productive.

---

## Phase 5 — Learning & Improvement

**Goal:** Make the system compound over time.

### 5.1 Set Up Learning System

**File:** `templates/LEARNING-SYSTEM.md`

**Prompt:** Read the QE v4 learning system template. Create `_learning/` directories for each skill/agent with failure-fixes.md and patterns.md. Include 10 issue classes and L1-L6 promotion scale.

### 5.2 Create Feedback/Revision Protocol

**File:** `protocols/FEEDBACK-REVISION-PROTOCOL.md`

**Prompt:** Read the QE v4 feedback/revision protocol. Define 3 severity levels for our system with appropriate re-load requirements at each level.

**Done when:** Every skill/agent has a learning directory, mistakes get captured and promoted.

---

## Phase 6 — Creative Quality (If Generating Content)

**Goal:** Systematic AI pattern elimination for any content generation.

### 6.1 Create Anti-Slop Lexicon

**File:** `protocols/ANTI-SLOP-LEXICON.md`

**Prompt:** Read the QE v4 anti-slop lexicon. Create a banned words list adapted for our domain. Include replacements and enforcement rules.

### 6.2 Create Humanization Protocol

**File:** `protocols/HUMANIZATION-PROTOCOL.md`

**Prompt:** Read the QE v4 humanization protocol. Implement the 3-layer model (word, structural, voice) with the 12 AI anti-patterns adapted for our content type.

### 6.3 Set Up Specimen Guide

**File:** `protocols/SPECIMEN-GUIDE.md`

**Prompt:** Read the QE v4 specimen guide. Create a golden examples library with admission criteria. Index by pattern type.

### 6.4 Evaluate Arena

**File:** `protocols/ARENA-CORE-PROTOCOL.md`

**Prompt:** Read the QE v4 arena protocol. Evaluate whether competitive generation would improve our content quality. This is a decision — don't implement automatically.

**Done when:** Content generation has systematic quality enforcement.

---

## Phase 7 — System-Agnostic Hardening

**Goal:** Ensure the system works with any AI tool, not just the one you built it on.

### 7.1 Verify Model-Agnosticism

**Prompt:** Review all files we've created. Flag anything that uses platform-specific syntax (Claude-specific, GPT-specific, etc.). Replace with model-agnostic alternatives.

### 7.2 Create Loading Profiles

**File:** `templates/SKILL-LOADING-PROFILE.yaml`

**Prompt:** Read the QE v4 loading profile template. Create YAML profiles for each skill/agent declaring: tools needed, protocols required, reference files, pre-session checks.

**Done when:** Any AI tool can consume your system by reading the YAML profiles.

---

## Progress Tracker

| Phase | Items | Status |
|-------|-------|--------|
| 0 — Foundation | 3 items | [ ] Not Started |
| 1 — Pipeline Integrity | 3 items | [ ] Not Started |
| 2 — Context Management | 3 items | [ ] Not Started |
| 3 — Automated Enforcement | 2 items | [ ] Not Started |
| 4 — Documentation | 4 items | [ ] Not Started |
| 5 — Learning | 2 items | [ ] Not Started |
| 6 — Creative Quality | 4 items | [ ] Not Started |
| 7 — System-Agnostic | 2 items | [ ] Not Started |

---

## Tips

- **Start with Phase 0.** Everything builds on the governance backbone.
- **Don't skip the audit.** Running `SYSTEM-AUDIT-CHECKLIST.md` first tells you which phases matter most for YOUR system.
- **Adapt, don't copy.** The QE v4 files are generic. Your system has domain-specific needs.
- **Phase-stop discipline applies to YOU.** Complete one phase, review, confirm, then next.
- **The learning system is the most important long-term investment.** Everything else is one-time setup. The learning system compounds.
