# ZenithPro Copy Arsenal - System Architecture

## Complete System Overview

```mermaid
flowchart TD
INPUT((Your Brief)) --> ARSENAL[Copy Arsenal]
ARSENAL --> LAYER1[Skills Layer]
LAYER1 --> LAYER2[Agents Layer]
LAYER2 --> LAYER3[Arena Layer]
LAYER3 --> LAYER4[Evolution Layer]
LAYER4 --> OUTPUT((Better Copy))
```

---

## The Four Layers

### Layer 1: Skills (51 Total)

```mermaid
flowchart TD
SKILLS[51 Skills] --> CLAYTON[Clayton: 15 skills]
CLAYTON --> CARLTON[Carlton: 16 skills]
CARLTON --> DEUTSCH[Deutsch: 10 skills]
DEUTSCH --> EVALDO[Evaldo: 9 skills]
EVALDO --> ARENA[Arena: 1 skill]
```

---

### Layer 2: Agents (9 Total)

```mermaid
flowchart TD
AGENTS[9 Agents] --> CRITICS[4 Critics]
CRITICS --> JUDGE[1 Judge]
JUDGE --> SYNTH[1 Synthesist]
SYNTH --> SYCRIT[1 Synthesis Critic]
SYCRIT --> EVOLVE[1 Skill Evolver]
EVOLVE --> SPAWN[1 Spawner]
```

---

### Layer 3: Arena System

```mermaid
flowchart TD
ARENA[Arena] --> COMPETE[Competition]
COMPETE --> EVALUATE[Evaluation]
EVALUATE --> WINNER[Winner Selection]
WINNER --> RECORD[Win Recording]
```

---

### Layer 4: Evolution

```mermaid
flowchart TD
WINS[Win Data] --> PATTERNS[Pattern Analysis]
PATTERNS --> UPDATES[Skill Updates]
UPDATES --> BETTER[Better Skills]
BETTER --> WINS
```

---

## Installation Locations

```mermaid
flowchart TD
INSTALL[Install Script] --> SK[Skills]
SK --> AG[Agents]
AG --> AR[Arena]
AR --> DOC[Docs]
```

| Component | Location |
|-----------|----------|
| Skills | ~/.claude/skills/ |
| Agents | ~/.claude/agents/ |
| Arena | ~/.claude/arena/ |
| Docs | ~/.claude/docs/copy-arsenal/ |

---

## Data Flow

```mermaid
flowchart TD
BRIEF[Copy Brief] --> MASTER[Master Skills]
MASTER --> DRAFT[Draft Copy]
DRAFT --> CRITIC[Critic Agent]
CRITIC --> REVISE[Revision]
REVISE --> FINAL[Final Copy]
```

---

*Part of the ZenithPro Copy Arsenal Diagram Set*
