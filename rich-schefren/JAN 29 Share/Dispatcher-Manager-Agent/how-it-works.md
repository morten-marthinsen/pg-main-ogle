# How Dispatcher-Manager Works

> **Note:** This document contains Mermaid diagrams. For best results, view in Obsidian, VS Code, or GitHub.

## Overview

The Dispatcher-Manager pattern transforms Claude into a project manager that delegates work to specialized sub-agents rather than doing everything itself.

```mermaid
flowchart TD
U((You)) --> M[Manager Claude]
M --> D[Decompose Task]
D --> S1[Sub-Agent 1]
D --> S2[Sub-Agent 2]
D --> S3[Sub-Agent 3]
S1 & S2 & S3 --> Q{Quality Gate}
Q -->|Pass| SYN[Synthesize Results]
Q -->|Fail| R[Retry with Feedback]
R --> S1 & S2 & S3
SYN --> M
M --> U
```

## The Three-Tier Model

### Tier 1: You (The Executive)

```mermaid
flowchart TD
U((You)) --> OBJ[State Objective]
OBJ --> CON[Set Constraints]
CON --> QL[Choose Quality Level]
QL --> M[Manager Takes Over]
```

### Tier 2: Manager (Claude as Orchestrator)

```mermaid
flowchart TD
M[Manager Claude] --> PLAN[Create Task Graph]
PLAN --> ASSIGN[Assign Personas]
ASSIGN --> SPAWN[Spawn Sub-Agents]
SPAWN --> MONITOR[Monitor Progress]
MONITOR --> GATE{Quality Gate}
GATE -->|Pass| DELIVER[Deliver Results]
GATE -->|Fail| FEEDBACK[Provide Feedback]
FEEDBACK --> SPAWN
```

### Tier 3: Sub-Agents (Specialized Workers)

```mermaid
flowchart TD
SPAWN[Manager Spawns] --> P1[Dr. Elena Vasquez]
SPAWN --> P2[Marcus Chen]
SPAWN --> P3[Sarah Okonkwo]
P1 --> W1[Analytical Work]
P2 --> W2[Creative Work]
P3 --> W3[Validation Work]
W1 & W2 & W3 --> RES[Return Results]
```

## Quality Thresholds

The manager enforces quality based on task importance:

```mermaid
flowchart TD
QL[Quality Level] --> STD[STANDARD 70%]
STD --> AUX[Auxiliary Tasks]
```

```mermaid
flowchart TD
QL[Quality Level] --> ELV[ELEVATED 85%]
ELV --> IMP[Important Work]
```

```mermaid
flowchart TD
QL[Quality Level] --> CRT[CRITICAL 95%]
CRT --> DEL[Final Deliverables]
```

## Persona Library

Each persona has specialized strengths:

| Persona | Specialty | Use For |
|---------|-----------|---------|
| Dr. Elena Vasquez | Analytical | Research, data analysis |
| Marcus Chen | Creative | Ideation, breakthroughs |
| Sarah Okonkwo | Validation | QA, finding flaws |
| Dr. James Liu | Research | Exhaustive coverage |
| Dr. Maya Patel | Synthesis | Cross-domain connections |
| Jack Morrison | Copywriting | Direct response |

## Invocation Flow

```mermaid
flowchart TD
U((You)) --> INV[Invoke Manager Mode]
INV --> OBJ[State Objective]
OBJ --> M[Manager Decomposes]
M --> AGENTS[Spawn Sub-Agents]
AGENTS --> WORK[Parallel Execution]
WORK --> SYNTH[Manager Synthesizes]
SYNTH --> DELIV[Deliver to You]
```

## Key Benefits

1. **Isolated Context** - Sub-agents don't pollute the main conversation
2. **Parallel Work** - Multiple tasks run simultaneously
3. **Quality Control** - Built-in gates prevent poor output
4. **Specialized Personas** - Right expert for each task

---

*Generated for Dispatcher-Manager Agent documentation*
