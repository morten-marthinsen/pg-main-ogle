---
name: webinar-arena
description: Orchestrates competitive webinar creation where 6 expert methodologies (Fladlien, Cage, Brunson, Kern, Joon, Kennedy) plus strategic synthesis compete head-to-head. Produces multiple expert versions, declares winners, and evolves skills through learning.
version: 1.0.0
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
PHASE 2: PARALLEL DRAFTING (7 versions)
    │
    ▼
PHASE 3: PARALLEL CRITIQUE (7 critiques)
    │
    ▼
PHASE 4: PARALLEL REVISION (7 revised versions)
    │
    ▼
PHASE 5: JUDGMENT (winner declared)
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
    ├──► Skill Evolution
    │
    └──► Expert Spawning (if synthesis won all rounds)
```

---

## Phase 1: Setup

### Execution Checklist

| # | Requirement | Status | Evidence |
|---|-------------|--------|----------|
| 1 | Create project folder | ☐ | |
| 2 | Parse brief and context | ☐ | |
| 3 | Initialize ledger entry | ☐ | |
| 4 | Detect active experts | ☐ | |
| 5 | Configure round count | ☐ | |

### Actions

1. **Create Project Folder**
   ```
   ~/.claude/webinar-arena/projects/[project-name]/
   ├── brief.md
   ├── round-1/
   │   ├── drafts/
   │   ├── critiques/
   │   └── revisions/
   ├── round-2/
   ├── round-3/
   └── results/
   ```

2. **Parse Brief**
   Extract:
   - Problem statement
   - Price point
   - Market sophistication (1-5)
   - Delivery format
   - Product type
   - Success metrics

3. **Initialize Ledger Entry**
   Add to `~/.claude/webinar-arena/ledger.md`:
   ```markdown
   ## Arena: [Project Name]
   **Started:** [Date]
   **Brief:** [Summary]
   **Rounds:** [N]
   **Status:** In Progress
   ```

4. **Detect Active Experts**
   Check for:
   - webinar-fladlien
   - webinar-cage
   - webinar-brunson
   - webinar-kern
   - webinar-joon
   - webinar-kennedy
   - Any spawned experts from previous arenas

5. **Save Ledger** (CRITICAL - after every phase)

---

## Phase 2: Parallel Drafting

### Execution Checklist

| # | Requirement | Status | Evidence |
|---|-------------|--------|----------|
| 1 | Dispatch all 6 experts in parallel | ☐ | |
| 2 | Dispatch synthesist in parallel | ☐ | |
| 3 | Collect all 7 drafts | ☐ | |
| 4 | Save drafts to project folder | ☐ | |
| 5 | Update ledger | ☐ | |

### Actions

1. **Invoke All Experts in Parallel**

   Each expert receives:
   ```
   Brief: [Full brief]
   Context:
   - Price: $[X]
   - Market sophistication: [1-5]
   - Format: [Live/Automated/Hybrid]
   - Product type: [Type]
   - Goal: [Primary goal]

   Task: Create a complete webinar following your methodology.
   ```

2. **Invoke Synthesist**

   Synthesist receives same brief plus:
   ```
   Available methodologies: [List of active experts]

   Task: Create a strategic combination that might outperform
   any single methodology for this specific context.
   ```

3. **Save All Drafts**
   ```
   projects/[name]/round-[N]/drafts/
   ├── fladlien-draft.md
   ├── cage-draft.md
   ├── brunson-draft.md
   ├── kern-draft.md
   ├── joon-draft.md
   ├── kennedy-draft.md
   └── synthesis-draft.md
   ```

4. **Update Ledger**
   ```markdown
   ### Round [N] - Drafting
   **Completed:** [Timestamp]
   **Drafts produced:** 7
   ```

---

## Phase 3: Parallel Critique

### Execution Checklist

| # | Requirement | Status | Evidence |
|---|-------------|--------|----------|
| 1 | Dispatch all 6 expert critics in parallel | ☐ | |
| 2 | Dispatch synthesis-critic in parallel | ☐ | |
| 3 | Collect all 7 critiques | ☐ | |
| 4 | Save critiques to project folder | ☐ | |
| 5 | Update ledger | ☐ | |

### Actions

1. **Invoke Expert Critics in Parallel**

   Each critic receives its methodology's draft:
   - webinar-fladlien-critic evaluates fladlien-draft.md
   - webinar-cage-critic evaluates cage-draft.md
   - webinar-brunson-critic evaluates brunson-draft.md
   - webinar-kern-critic evaluates kern-draft.md
   - webinar-joon-critic evaluates joon-draft.md
   - webinar-kennedy-critic evaluates kennedy-draft.md

2. **Invoke Synthesis Critic**

   webinar-synthesis-critic evaluates synthesis-draft.md

3. **Save All Critiques**
   ```
   projects/[name]/round-[N]/critiques/
   ├── fladlien-critique.md
   ├── cage-critique.md
   ├── brunson-critique.md
   ├── kern-critique.md
   ├── joon-critique.md
   ├── kennedy-critique.md
   └── synthesis-critique.md
   ```

4. **Update Ledger**
   ```markdown
   ### Round [N] - Critique
   **Completed:** [Timestamp]
   **Grades:** Fladlien [X], Cage [X], Brunson [X], Kern [X], Joon [X], Kennedy [X], Synthesis [X]
   ```

---

## Phase 4: Parallel Revision

### Execution Checklist

| # | Requirement | Status | Evidence |
|---|-------------|--------|----------|
| 1 | Dispatch all 6 experts with critiques | ☐ | |
| 2 | Dispatch synthesist with critique | ☐ | |
| 3 | Collect all 7 revisions | ☐ | |
| 4 | Save revisions to project folder | ☐ | |
| 5 | Update ledger | ☐ | |

### Actions

1. **Invoke All Experts with Critiques**

   Each expert receives:
   ```
   Original draft: [Their draft]
   Critique: [Their critique]

   Task: Revise your draft to address all issues identified
   in the critique while maintaining your methodology's integrity.
   ```

2. **Save All Revisions**
   ```
   projects/[name]/round-[N]/revisions/
   ├── fladlien-revision.md
   ├── cage-revision.md
   ├── brunson-revision.md
   ├── kern-revision.md
   ├── joon-revision.md
   ├── kennedy-revision.md
   └── synthesis-revision.md
   ```

3. **Update Ledger**
   ```markdown
   ### Round [N] - Revision
   **Completed:** [Timestamp]
   **All revisions complete:** Yes
   ```

---

## Phase 5: Judgment

### Execution Checklist

| # | Requirement | Status | Evidence |
|---|-------------|--------|----------|
| 1 | Invoke marketplace-judge with all 7 revisions | ☐ | |
| 2 | Receive rankings and winner | ☐ | |
| 3 | Receive learning briefs | ☐ | |
| 4 | Present to user | ☐ | |
| 5 | Check for user override | ☐ | |
| 6 | Update ledger with result | ☐ | |

### Actions

1. **Invoke Marketplace Judge**

   Judge receives all 7 revisions (anonymized for blind read):
   ```
   Entry A: [Revision content]
   Entry B: [Revision content]
   ...
   Entry G: [Revision content]

   Context:
   - Price: $[X]
   - Market sophistication: [1-5]
   - Format: [Type]

   Task: Evaluate all entries and predict which would win
   in the real marketplace.
   ```

2. **Present Results to User**
   ```markdown
   ## Round [N] Results

   ### Winner: [Expert Name]
   **Score:** [X/100]
   **Why:** [Marketplace rationale]

   ### Full Rankings
   1. [Expert] - [Score] - [Key strength]
   2. [Expert] - [Score] - [Key strength]
   ...

   ### Override?
   Do you disagree with this judgment?
   Reply with your choice and reasoning to override.
   ```

3. **Handle User Override (if any)**

   If user overrides:
   - Record original judgment
   - Record user's choice
   - Record user's reasoning
   - Use user's choice as official result

4. **Update Ledger**
   ```markdown
   ### Round [N] - Judgment
   **Winner:** [Expert]
   **User Override:** [Yes/No]
   **Override Reason:** [If applicable]
   ```

---

## Phase 6: Learning Integration

### Execution Checklist

| # | Requirement | Status | Evidence |
|---|-------------|--------|----------|
| 1 | Collect learning briefs | ☐ | |
| 2 | Save to project folder | ☐ | |
| 3 | Update win records | ☐ | |
| 4 | Check for more rounds | ☐ | |
| 5 | Update ledger | ☐ | |

### Actions

1. **Save Learning Briefs**
   ```
   projects/[name]/round-[N]/
   ├── learning-brief-overall.md
   ├── learning-brief-fladlien.md
   ├── learning-brief-cage.md
   ...
   └── learning-brief-synthesis.md
   ```

2. **Update Win Records**

   For each expert, update `~/.claude/webinar-arena/win-records/[expert].md`:
   - Add competition entry
   - Update win/loss count
   - Update head-to-head records

3. **Check for More Rounds**

   If rounds remaining:
   - Return to Phase 2 with learning context
   - Include previous round insights in new brief

   If no rounds remaining:
   - Proceed to Phase 7

4. **Update Ledger**
   ```markdown
   ### Round [N] - Learning
   **Completed:** [Timestamp]
   **Win records updated:** Yes
   **Proceeding to:** [Round N+1 / Post-Arena]
   ```

---

## Phase 7: Post-Arena Processing

### Execution Checklist

| # | Requirement | Status | Evidence |
|---|-------------|--------|----------|
| 1 | Compile all round results | ☐ | |
| 2 | Invoke skill-evolver | ☐ | |
| 3 | Check spawn condition | ☐ | |
| 4 | Invoke expert-spawner (if applicable) | ☐ | |
| 5 | Finalize ledger entry | ☐ | |
| 6 | Present final report | ☐ | |

### Actions

1. **Compile Results**
   ```
   projects/[name]/results/
   ├── final-report.md
   ├── all-learning-briefs.md
   └── evolution-recommendations.md
   ```

2. **Invoke Skill Evolver**

   Skill evolver receives:
   - All round results
   - All learning briefs
   - All critiques
   - Winner declarations
   - User overrides (if any)

3. **Check Spawn Condition**

   If synthesis won ALL rounds:
   - Invoke webinar-expert-spawner
   - Prompt user for methodology name
   - Create new expert skill + critic

4. **Finalize Ledger**
   ```markdown
   ## Arena: [Project Name] - COMPLETE
   **Completed:** [Date]
   **Overall Winner:** [Expert]
   **Rounds Won:** Fladlien [X], Cage [X], Brunson [X], Kern [X], Joon [X], Kennedy [X], Synthesis [X]
   **Skills Updated:** [List]
   **Expert Spawned:** [Yes/No - Name if yes]
   ```

5. **Present Final Report**
   ```markdown
   # WEBINAR ARENA COMPLETE

   ## Project: [Name]

   ### Overall Winner: [Expert]

   **Why they won:** [Summary of marketplace strengths]

   ### Round-by-Round Results
   | Round | Winner | Key Insight |
   |-------|--------|-------------|
   | 1 | [Expert] | [Insight] |
   | 2 | [Expert] | [Insight] |
   | 3 | [Expert] | [Insight] |

   ### Recommended Webinar
   [Link to winning entry]

   ### Skills Evolved
   - [Expert]: [What changed]
   - [Expert]: [What changed]

   ### Spawn Status
   [New expert created / No spawn triggered]

   ---

   *Webinar Arena v1.0.0*
   ```

---

## Incremental Save Protocol

**CRITICAL:** The ledger MUST be updated after EVERY phase completion.

```
Phase 1 Complete → Save Ledger
Phase 2 Complete → Save Ledger
Phase 3 Complete → Save Ledger
Phase 4 Complete → Save Ledger
Phase 5 Complete → Save Ledger
Phase 6 Complete → Save Ledger
Phase 7 Complete → Save Ledger
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

## Files Modified

| File | When | What |
|------|------|------|
| ledger.md | Every phase | Competition state |
| win-records/[expert].md | Phase 6 | Performance tracking |
| synthesis-registry/ | Phase 7 | Combination tracking |
| skills/[expert]/ | Phase 7 | Skill evolution |

---

## Related Components

| Component | Role | Invoked |
|-----------|------|---------|
| webinar-fladlien | Expert methodology | Phase 2, 4 |
| webinar-cage | Expert methodology | Phase 2, 4 |
| webinar-brunson | Expert methodology | Phase 2, 4 |
| webinar-kern | Expert methodology | Phase 2, 4 |
| webinar-joon | Expert methodology | Phase 2, 4 |
| webinar-kennedy | Expert methodology | Phase 2, 4 |
| webinar-fladlien-critic | Methodology evaluation | Phase 3 |
| webinar-cage-critic | Methodology evaluation | Phase 3 |
| webinar-brunson-critic | Methodology evaluation | Phase 3 |
| webinar-kern-critic | Methodology evaluation | Phase 3 |
| webinar-joon-critic | Methodology evaluation | Phase 3 |
| webinar-kennedy-critic | Methodology evaluation | Phase 3 |
| webinar-synthesist | Combination creation | Phase 2, 4 |
| webinar-synthesis-critic | Combination evaluation | Phase 3 |
| webinar-marketplace-judge | Winner prediction | Phase 5 |
| webinar-skill-evolver | Skill improvement | Phase 7 |
| webinar-expert-spawner | New expert creation | Phase 7 |

---

*Webinar Arena v1.0.0*
*"Six masters compete. One wins. All improve."*
