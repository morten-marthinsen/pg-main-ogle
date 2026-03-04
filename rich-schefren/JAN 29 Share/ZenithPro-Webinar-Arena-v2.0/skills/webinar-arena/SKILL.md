---
name: webinar-arena
description: Orchestrates competitive webinar creation where 6 expert methodologies (Fladlien, Cage, Brunson, Kern, Joon, Kennedy) plus strategic synthesis compete head-to-head. Produces multiple expert versions, declares winners, and evolves skills through learning.
version: 2.0.0
author: Rich Schefren
trigger: /webinar-arena
---

# Webinar Arena

## What This Skill Does

The Webinar Arena runs structured competitions where 6 webinar methodologies compete on the same brief. Each competition:

1. Produces 7 complete webinar versions (6 experts + 1 synthesis)
2. Has each version critiqued by its methodology's critic
3. Revises based on critique
4. Judges all entries for marketplace effectiveness
5. Declares a winner and produces learning
6. Integrates learning into permanent skill improvements
7. Spawns new methodologies when synthesis wins consistently

---

## ⛔ NON-NEGOTIABLE RULES

**These rules are ABSOLUTE. No exceptions. No shortcuts. No "good enough."**

| Rule | Consequence of Violation |
|------|--------------------------|
| EVERY expert MUST be invoked via Skill tool, NOT generated from prompts | Output lacks methodology depth |
| Critics MUST be invoked via Task tool with specific agent type | Critique lacks framework enforcement |
| ALL 7 entries MUST be produced before ANY judgment | Incomplete competition |
| Ledger MUST be saved after EVERY phase | Progress cannot be recovered |
| User override ALWAYS takes precedence over judge | Arena serves user, not algorithm |
| Drafts use SKILL tool; Critics use TASK tool | Mixing tools breaks enforcement |

---

## 🔒 MANDATORY EXECUTION SEQUENCE

**Claude MUST follow this exact sequence. Skipping steps invalidates the competition.**

### PHASE 1: SETUP (Gate: Cannot proceed without project folder + ledger entry)

| Step | Action | Tool | Validation |
|------|--------|------|------------|
| 1.1 | Create project folder structure | Bash | Folder exists |
| 1.2 | Parse brief and extract all context variables | N/A | All variables populated |
| 1.3 | Initialize ledger entry | Write | Entry visible in ledger.md |
| 1.4 | Detect active experts (check for spawned experts) | Glob | Expert list confirmed |
| 1.5 | Configure round count | N/A | Round count set |

**GATE CHECK:** Project folder created? Ledger initialized? → Proceed to Phase 2

### PHASE 2: PARALLEL DRAFTING (Gate: All 7 drafts collected and saved)

| Step | Action | Tool | Validation |
|------|--------|------|------------|
| 2.1 | Invoke webinar-fladlien skill | **Skill** | Draft contains Fladlien signature elements |
| 2.2 | Invoke webinar-cage skill | **Skill** | Draft contains Cage signature elements |
| 2.3 | Invoke webinar-brunson skill | **Skill** | Draft contains Brunson signature elements |
| 2.4 | Invoke webinar-kern skill | **Skill** | Draft contains Kern signature elements |
| 2.5 | Invoke webinar-joon skill | **Skill** | Draft contains Joon signature elements |
| 2.6 | Invoke webinar-kennedy skill | **Skill** | Draft contains Kennedy signature elements |
| 2.7 | Invoke webinar-synthesist skill | **Skill** | Draft contains synthesis rationale |
| 2.8 | Save all drafts to project folder | Write | 7 files in drafts/ |
| 2.9 | Update ledger | Write | Drafting complete logged |

**GATE CHECK:** All 7 drafts saved? Each contains methodology signature? → Proceed to Phase 3

### PHASE 3: PARALLEL CRITIQUE (Gate: All 7 critiques collected and saved)

| Step | Action | Tool | Validation |
|------|--------|------|------------|
| 3.1 | Invoke webinar-fladlien-critic agent | **Task** (agent) | Critique uses Fladlien frameworks |
| 3.2 | Invoke webinar-cage-critic agent | **Task** (agent) | Critique uses Cage frameworks |
| 3.3 | Invoke webinar-brunson-critic agent | **Task** (agent) | Critique uses Brunson frameworks |
| 3.4 | Invoke webinar-kern-critic agent | **Task** (agent) | Critique uses Kern frameworks |
| 3.5 | Invoke webinar-joon-critic agent | **Task** (agent) | Critique uses Joon frameworks |
| 3.6 | Invoke webinar-kennedy-critic agent | **Task** (agent) | Critique uses Kennedy frameworks |
| 3.7 | Invoke webinar-synthesis-critic agent | **Task** (agent) | Critique evaluates combination quality |
| 3.8 | Save all critiques to project folder | Write | 7 files in critiques/ |
| 3.9 | Update ledger with grades | Write | Grades logged |

**GATE CHECK:** All 7 critiques saved? Each contains framework-based evaluation? → Proceed to Phase 4

### PHASE 4: PARALLEL REVISION (Gate: All 7 revisions collected and saved)

| Step | Action | Tool | Validation |
|------|--------|------|------------|
| 4.1 | Invoke webinar-fladlien with draft + critique | **Skill** | Revision addresses critique |
| 4.2 | Invoke webinar-cage with draft + critique | **Skill** | Revision addresses critique |
| 4.3 | Invoke webinar-brunson with draft + critique | **Skill** | Revision addresses critique |
| 4.4 | Invoke webinar-kern with draft + critique | **Skill** | Revision addresses critique |
| 4.5 | Invoke webinar-joon with draft + critique | **Skill** | Revision addresses critique |
| 4.6 | Invoke webinar-kennedy with draft + critique | **Skill** | Revision addresses critique |
| 4.7 | Invoke webinar-synthesist with draft + critique | **Skill** | Revision addresses critique |
| 4.8 | Save all revisions to project folder | Write | 7 files in revisions/ |
| 4.9 | Update ledger | Write | Revisions complete logged |

**GATE CHECK:** All 7 revisions saved? Each addresses its critique? → Proceed to Phase 5

### PHASE 5: JUDGMENT (Gate: Winner declared + user presented)

| Step | Action | Tool | Validation |
|------|--------|------|------------|
| 5.1 | Anonymize all 7 revisions (remove expert names) | N/A | Entries labeled A-G |
| 5.2 | Invoke webinar-marketplace-judge agent | **Task** (agent) | Rankings + rationale received |
| 5.3 | De-anonymize results | N/A | Expert names restored |
| 5.4 | Present results to user | Output | User sees rankings |
| 5.5 | Check for user override | Wait | Override or confirmation |
| 5.6 | Record final winner | Write | Winner logged |
| 5.7 | Update ledger | Write | Judgment complete logged |

**GATE CHECK:** Winner declared? User presented? Override handled? → Proceed to Phase 6

### PHASE 6: LEARNING INTEGRATION (Gate: Win records updated)

| Step | Action | Tool | Validation |
|------|--------|------|------------|
| 6.1 | Collect learning briefs from judge | N/A | Briefs received |
| 6.2 | Save learning briefs to project folder | Write | Files in learning/ |
| 6.3 | Update win records for each expert | Write | Records updated |
| 6.4 | Update learning-feed.md | Write | Feed updated |
| 6.5 | Check for more rounds | N/A | Decision made |
| 6.6 | Update ledger | Write | Learning logged |

**GATE CHECK:** Win records updated? Learning feed updated? → If more rounds: Phase 2. Else: Phase 7

### PHASE 7: POST-ARENA PROCESSING (Gate: Final report delivered)

| Step | Action | Tool | Validation |
|------|--------|------|------------|
| 7.1 | Compile all round results | N/A | Summary complete |
| 7.2 | Invoke webinar-skill-evolver agent | **Task** (agent) | Evolution proposals received |
| 7.3 | Check spawn condition (synthesis won ALL rounds?) | N/A | Spawn decision made |
| 7.4 | If spawn: Invoke webinar-expert-spawner agent | **Task** (agent) | New expert created |
| 7.5 | Finalize ledger entry | Write | Status: COMPLETE |
| 7.6 | Present final report to user | Output | Report delivered |

**GATE CHECK:** Final report delivered? Ledger finalized? → Competition complete

---

## 🔧 TOOL USAGE MATRIX

| Component | Tool Type | Why |
|-----------|-----------|-----|
| webinar-fladlien | **Skill tool** | Generates content with 64 frameworks |
| webinar-cage | **Skill tool** | Generates content with 12 frameworks |
| webinar-brunson | **Skill tool** | Generates content with 120 frameworks |
| webinar-kern | **Skill tool** | Generates content with 265 frameworks |
| webinar-joon | **Skill tool** | Generates content with 56 frameworks |
| webinar-kennedy | **Skill tool** | Generates content with 87 frameworks |
| webinar-synthesist | **Skill tool** | Generates strategic combinations |
| webinar-fladlien-critic | **Task tool** (agent) | Evaluates against Fladlien standards |
| webinar-cage-critic | **Task tool** (agent) | Evaluates against Cage standards |
| webinar-brunson-critic | **Task tool** (agent) | Evaluates against Brunson standards |
| webinar-kern-critic | **Task tool** (agent) | Evaluates against Kern standards |
| webinar-joon-critic | **Task tool** (agent) | Evaluates against Joon standards |
| webinar-kennedy-critic | **Task tool** (agent) | Evaluates against Kennedy standards |
| webinar-synthesis-critic | **Task tool** (agent) | Evaluates combination quality |
| webinar-marketplace-judge | **Task tool** (agent) | Predicts marketplace winner |
| webinar-skill-evolver | **Task tool** (agent) | Proposes skill improvements |
| webinar-expert-spawner | **Task tool** (agent) | Creates new experts |

**NEVER use Task tool with general-purpose agent for drafting.** The skills have 50-265 frameworks each. A general-purpose agent cannot replicate this depth.

---

## Quick Start

```
/webinar-arena

Brief: [Your webinar challenge]
Price: $[X]
Market sophistication: [1-5]
Format: [Live/Automated/Hybrid]
Rounds: [1-5, default 3]
```

---

## The Competition Flow

```
PHASE 1: SETUP
    │
    ▼
PHASE 2: PARALLEL DRAFTING (7 versions via SKILL tool)
    │
    ▼
PHASE 3: PARALLEL CRITIQUE (7 critiques via TASK tool)
    │
    ▼
PHASE 4: PARALLEL REVISION (7 revised versions via SKILL tool)
    │
    ▼
PHASE 5: JUDGMENT (winner declared via TASK tool)
    │
    ├──► User Override? (optional)
    │
    ▼
PHASE 6: LEARNING INTEGRATION
    │
    ├──► More Rounds? ──► Return to Phase 2
    │
    ▼
PHASE 7: POST-ARENA PROCESSING
    │
    ├──► Skill Evolution (TASK tool)
    │
    └──► Expert Spawning (if synthesis won all rounds)
```

---

## Folder Structure

```
~/.claude/webinar-arena/
├── ledger.md                    # Master competition log
├── win-records/                 # Performance by expert
│   ├── fladlien.md
│   ├── cage.md
│   ├── brunson.md
│   ├── kern.md
│   ├── joon.md
│   ├── kennedy.md
│   └── synthesis.md
├── learning-feed.md             # Accumulated learnings
└── projects/
    └── [project-name]/
        ├── brief.md
        ├── round-1/
        │   ├── drafts/
        │   ├── critiques/
        │   ├── revisions/
        │   └── learning/
        ├── round-2/
        ├── round-3/
        └── results/
            ├── final-report.md
            └── evolution-recommendations.md
```

---

## Incremental Save Protocol

**CRITICAL:** The ledger MUST be updated after EVERY phase completion.

```
Phase 1 Complete → Save Ledger → Verify saved
Phase 2 Complete → Save Ledger → Verify saved
Phase 3 Complete → Save Ledger → Verify saved
Phase 4 Complete → Save Ledger → Verify saved
Phase 5 Complete → Save Ledger → Verify saved
Phase 6 Complete → Save Ledger → Verify saved
Phase 7 Complete → Save Ledger → Verify saved
```

This ensures:
- Recovery from context window limits
- Audit trail of all activity
- No lost progress

---

## Context Variables Reference

| Variable | Options | Effect |
|----------|---------|--------|
| Price | <$500, $500-$2K, $2K-$10K, >$10K | Affects expert biases |
| Sophistication | 1-5 | Affects complexity level |
| Format | Live, Automated, Hybrid | Affects expert selection |
| Product Type | Info, Transformation, Service, Physical | Affects approach |
| Goal | Conversion, Relationship, Both | Affects evaluation weights |

---

## 📋 ARENA COMPLIANCE SUMMARY

**This section MUST appear in every arena execution summary.**

### Competition Integrity Checklist

| Requirement | Status | Evidence |
|-------------|--------|----------|
| All 7 experts invoked via SKILL tool | ☐ | |
| All 7 critics invoked via TASK tool | ☐ | |
| All drafts contain methodology signatures | ☐ | |
| All critiques reference methodology frameworks | ☐ | |
| Marketplace judge used for winner (not arbitrary) | ☐ | |
| User presented with results + override option | ☐ | |
| Ledger updated after every phase | ☐ | |
| Win records updated | ☐ | |
| Learning feed updated | ☐ | |

### Expert Signature Verification

| Expert | Signature Element | Present in Draft? |
|--------|-------------------|-------------------|
| Fladlien | 100+ commitment count OR price cascade | ☐ |
| Cage | 8-Question X-Ray OR Desire Tap language | ☐ |
| Brunson | ONE THING focus OR The Stack structure | ☐ |
| Kern | Pre-webinar system OR 5-phase structure | ☐ |
| Joon | 5 Pillars OR transformation teaching | ☐ |
| Kennedy | Time Box Architecture OR 10 E-Factors | ☐ |
| Synthesis | Combination rationale documented | ☐ |

---

*Webinar Arena v2.0.0*
*"Six masters compete. One wins. All improve."*
