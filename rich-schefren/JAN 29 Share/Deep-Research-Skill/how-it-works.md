# How Deep Research Works

> **Note:** This document contains Mermaid diagrams. For best results, view in Obsidian, VS Code, or GitHub.

## Overview

The Deep Research skill runs parallel queries across 4 AI research APIs, then synthesizes the results into a comprehensive report.

```mermaid
flowchart TD
Q[Your Research Query] --> O[Orchestrator]
O --> P[Perplexity API]
O --> G[Gemini API]
O --> T[Tavily API]
O --> E[Exa.ai API]
P & G & T & E --> S[Synthesis]
S --> R[Final Report]
R --> F[(research-staging folder)]
```

## Detailed Flow

### Step 1: Query Input

```mermaid
flowchart TD
U((You)) --> C[Claude Code]
C --> Q[Parse Query]
Q --> O[orchestrator.py]
```

### Step 2: Parallel API Calls

Each API runs independently and saves its own result file:

```mermaid
flowchart TD
O[Orchestrator] --> P[perplexity_research.py]
P --> PF[(perplexity-result.md)]
```

```mermaid
flowchart TD
O[Orchestrator] --> G[gemini_research.py]
G --> GF[(gemini-result.md)]
```

```mermaid
flowchart TD
O[Orchestrator] --> T[tavily_research.py]
T --> TF[(tavily-result.md)]
```

```mermaid
flowchart TD
O[Orchestrator] --> E[exa_research.py]
E --> EF[(exa-result.md)]
```

### Step 3: Synthesis

```mermaid
flowchart TD
PF[(Perplexity Result)] --> SYN[Claude Synthesizes]
GF[(Gemini Result)] --> SYN
TF[(Tavily Result)] --> SYN
EF[(Exa Result)] --> SYN
SYN --> FINAL[final-synthesis.md]
FINAL --> U((You))
```

## Output Structure

```mermaid
flowchart TD
RS[(research-staging)] --> QF[query-folder]
QF --> P[perplexity-result.md]
QF --> G[gemini-result.md]
QF --> T[tavily-result.md]
QF --> E[exa-result.md]
QF --> F[final-synthesis.md]
```

## Why Parallel?

Running all 4 APIs simultaneously means:
- **Faster results** - Don't wait for each to finish
- **Diverse perspectives** - Each API has different strengths
- **Redundancy** - If one fails, you still get 3 results

---

## Tier 2: Browser Deep Research (Optional)

For topics needing more depth, browser automation sources provide 5-15 minute deep research via the Claude in Chrome MCP server.

```mermaid
flowchart TD
Q[Your Research Query] --> B[Browser Automation]
B --> CDR[Claude Deep Research]
B --> GDR[Gemini Deep Research]
B --> MAN[Manus]
CDR & GDR & MAN --> S2[Combined with Tier 1 Results]
S2 --> R2[Enhanced Report]
```

These platforms perform multi-step research autonomously, producing much more thorough results than API calls. See `references/browser-automation.md` for setup instructions.

---

## Tier 3: Native Claude Tools (Always Available)

These require no setup and complement the API and browser sources:

```mermaid
flowchart TD
Q[Your Research Query] --> WS[WebSearch - Multiple queries in parallel]
Q --> WF[WebFetch - Analyze specific URLs]
WS & WF --> S3[Additional Coverage]
```

---

*Generated for Deep Research Skill documentation*
