# How the Mechanism Ideator Works

> **Note:** This document contains Mermaid diagrams. For best results, view in Obsidian, VS Code, or GitHub.

## Overview

The Mechanism Ideator runs an 8-phase process to transform program content into copy-ready marketing mechanisms.

```mermaid
flowchart TD
C[Your Program Content] --> P0[Phase 0: Market Context]
P0 --> P1[Phase 1: Content Ingestion]
P1 --> P2[Phase 2: Mechanism Mining]
P2 --> P3[Phase 3: Research Sprint]
P3 --> P4[Phase 4: Development]
P4 --> P5[Phase 5: Layering]
P5 --> P6[Phase 6: Scoring]
P6 --> P7[Phase 7: Output]
P7 --> F[(Mechanism Work Folder)]
```

## Phase 3: Research Sprint (Where Deep Research Fits)

This is where the Deep Research skill integrates. For each mechanism concept, the orchestrator runs all 4 API sources in parallel:

```mermaid
flowchart TD
M[Mechanism Concept] --> O[Deep Research Orchestrator]
O --> P[Perplexity]
O --> G[Gemini]
O --> T[Tavily]
O --> E[Exa.ai]
P & G & T & E --> RS[(research-staging)]
RS --> A1[Agent 1: Academic Foundations]
RS --> A2[Agent 2: Case Studies]
RS --> A3[Agent 3: Visual Metaphors]
RS --> A4[Agent 4: Statistics]
RS --> A5[Agent 5-7: Topic-Specific]
A1 & A2 & A3 & A4 & A5 --> RP[Research Package per Mechanism]
```

## What Makes a Good Mechanism

Every mechanism must pass 5 tests before development:

```mermaid
flowchart TD
C[Candidate Mechanism] --> T1{Sales Letter Test}
T1 -->|PASS| T2{Domain Test}
T1 -->|FAIL| CUT[Cut or Rework]
T2 -->|PASS| T3{Blame Shift Test}
T2 -->|FAIL| CUT
T3 -->|PASS| T4{Demand Test}
T3 -->|FAIL| CUT
T4 -->|PASS| T5{Discovery Test}
T4 -->|FAIL| CUT
T5 -->|PASS| DEV[Develop Full Mechanism]
T5 -->|FAIL| CUT
```

## Output Structure

```mermaid
flowchart TD
F[(Mechanism Work Folder)] --> S[00 Summary.md]
F --> M[Mechanisms.md - Master Doc]
F --> R[Research/]
R --> AF[Academic-Foundations.md]
R --> CS[Case-Studies.md]
R --> VM[Visual-Metaphors.md]
R --> ST[Statistics.md]
F --> M1[01 Mechanism Name/]
M1 --> E1[Evaluation.md - 13-dim score]
M1 --> RP1[Research-Package.md]
```

---

*Generated for Mechanism Ideator documentation*
