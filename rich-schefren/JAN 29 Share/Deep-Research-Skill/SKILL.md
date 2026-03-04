---
name: deep-research
description: Multi-source deep research orchestrator. Dispatches queries across 9 sources -- Perplexity, Gemini API, Tavily, Exa.ai, Claude Deep Research, Gemini Deep Research, Manus, WebSearch, and WebFetch -- for comprehensive research coverage.
trigger_phrases:
  - deep research
  - research this
  - find everything about
  - comprehensive research
  - multi-source research
---

# Deep Research Orchestrator

You are a research orchestration system that dispatches queries to multiple research engines and collects comprehensive results.

## Quick Start - Run All 4 APIs in Parallel

**Mac/Linux:**
```bash
source ~/.claude/skills/deep-research/venv/bin/activate && python3 ~/.claude/skills/deep-research/references/scripts/orchestrator.py "YOUR QUERY HERE"
```

**Windows (PowerShell):**
```powershell
& "$env:USERPROFILE\.claude\skills\deep-research\venv\Scripts\Activate.ps1"; python "$env:USERPROFILE\.claude\skills\deep-research\references\scripts\orchestrator.py" "YOUR QUERY HERE"
```

This runs Perplexity, Gemini, Tavily, and Exa.ai simultaneously and saves all results to the staging folder.

## Available Research Sources

### API Sources (Fast, Direct) - ALL CONFIGURED
1. **Perplexity Sonar Deep Research** - Multi-step retrieval and synthesis
2. **Gemini API** - Google's AI with web grounding
3. **Tavily** - AI-native search API
4. **Exa.ai** - Semantic/neural search

### Browser Automation Sources (Deep, Slower)
5. **Claude Deep Research** - Via Claude.ai browser automation
6. **Gemini Deep Research** - Via gemini.google.com browser automation
7. **Manus** - Via manus.im browser automation

> **Setup required:** Browser automation sources require the "Claude in Chrome" MCP server. See `references/browser-automation.md` for setup instructions. These are optional but provide the deepest research results.

### Native Sources (Always Available)
8. **WebSearch** - Built-in Claude web search
9. **WebFetch** - Direct URL fetching and analysis

## How to Use This Skill

### Option 1: Full Orchestration (Recommended)

Run all 4 API sources in parallel:

**Mac/Linux:**
```bash
source ~/.claude/skills/deep-research/venv/bin/activate && python3 ~/.claude/skills/deep-research/references/scripts/orchestrator.py "YOUR RESEARCH QUERY"
```

**Windows (PowerShell):**
```powershell
& "$env:USERPROFILE\.claude\skills\deep-research\venv\Scripts\Activate.ps1"; python "$env:USERPROFILE\.claude\skills\deep-research\references\scripts\orchestrator.py" "YOUR RESEARCH QUERY"
```

Options:
- Specify sources: `orchestrator.py "query" perplexity,gemini`
- Run sequentially: `orchestrator.py "query" --sequential`

### Option 2: Individual Sources

**Mac/Linux:**
```bash
# Activate virtual environment first
source ~/.claude/skills/deep-research/venv/bin/activate

# Perplexity Deep Research (best for comprehensive synthesis)
python3 ~/.claude/skills/deep-research/references/scripts/perplexity_research.py "YOUR QUERY"

# Gemini Research (best for Google's knowledge + web grounding)
python3 ~/.claude/skills/deep-research/references/scripts/gemini_research.py "YOUR QUERY"

# Tavily Search (best for structured search results with sources)
python3 ~/.claude/skills/deep-research/references/scripts/tavily_research.py "YOUR QUERY" [basic|advanced]

# Exa Semantic Search (best for finding conceptually related content)
python3 ~/.claude/skills/deep-research/references/scripts/exa_research.py "YOUR QUERY" [auto|neural|keyword]
```

**Windows (PowerShell):**
```powershell
# Activate virtual environment first
& "$env:USERPROFILE\.claude\skills\deep-research\venv\Scripts\Activate.ps1"

# Then run any script with python (not python3)
python "$env:USERPROFILE\.claude\skills\deep-research\references\scripts\perplexity_research.py" "YOUR QUERY"
```

### Option 3: Browser-Based Deep Research (5-15 min each)

For the most thorough research, use Chrome MCP browser automation. These provide deeper analysis than APIs.

> **Requires:** Claude in Chrome MCP server. See `references/browser-automation.md` for setup.

#### Manus (manus.im)
```
1. mcp__Claude_in_Chrome__navigate -> https://manus.im/app
2. mcp__Claude_in_Chrome__find -> "task input"
3. mcp__Claude_in_Chrome__form_input -> Enter query
4. mcp__Claude_in_Chrome__computer -> left_click send button
5. Monitor sidebar for completion
6. mcp__Claude_in_Chrome__get_page_text -> Extract results
```

#### Claude Deep Research (claude.ai)
```
1. mcp__Claude_in_Chrome__navigate -> https://claude.ai/new
2. mcp__Claude_in_Chrome__computer -> left_click on input field
3. mcp__Claude_in_Chrome__computer -> type "Please conduct deep research on: [QUERY]"
4. mcp__Claude_in_Chrome__computer -> key "Return"
5. Wait and monitor for completion
6. mcp__Claude_in_Chrome__get_page_text -> Extract results
```

#### Gemini Deep Research (gemini.google.com)
```
1. mcp__Claude_in_Chrome__navigate -> https://gemini.google.com/app
2. mcp__Claude_in_Chrome__computer -> left_click "Tools" button (~617, 385)
3. mcp__Claude_in_Chrome__computer -> left_click "Deep Research" (~665, 441)
4. mcp__Claude_in_Chrome__computer -> type query
5. mcp__Claude_in_Chrome__computer -> key "Return"
6. Wait for research plan + full report
7. mcp__Claude_in_Chrome__get_page_text -> Extract results
```

#### Run All Three Browser Sources
To run maximum depth research, launch all three browser research tasks, then collect results when each completes. Save outputs to:
`{timestamp}_browser_{platform}_{query_slug}.md`

### Option 4: Native Claude Tools (Always Available)

These require no API keys and run instantly:

**WebSearch** - Built-in web search
```
Use WebSearch tool directly with query parameter
Results include titles, URLs, and snippets
Good for: Quick facts, recent news, specific lookups
```

**WebFetch** - Fetch and analyze specific URLs
```
Use WebFetch tool with URL and prompt
Retrieves page content and processes with AI
Good for: Deep reading of specific articles, extracting data from known sources
```

**Parallel WebSearch Strategy:**
For comprehensive coverage, run multiple WebSearch queries simultaneously:
- Main query
- Query + "research" or "study"
- Query + "2026" or "latest"
- Query + specific subtopic angles

Save WebSearch results to staging folder as:
`{timestamp}_websearch_{query_slug}.md`

## Output Location

All results saved to your home directory:
```
~/research-staging/
```

Files created:
- `{timestamp}_{source}_{query_slug}.json` - Raw data
- `{timestamp}_{source}_{query_slug}.md` - Readable markdown
- `{timestamp}_ORCHESTRATOR_{query_slug}.md` - Combined summary

## Workflow Recommendation

For maximum research coverage:

1. **Start with orchestrator** - Get quick results from all 4 APIs (~2-3 min)
2. **Add browser deep research** - For topics needing more depth
3. **Run WebSearch** - Fill gaps with additional queries
4. **Combine findings** - Synthesize all results into final document

## Configuration

API keys: `~/.claude/skills/deep-research/references/api-keys.json`
Virtual env: `~/.claude/skills/deep-research/venv/`

## Cost Estimates

| Source | Cost per Query | Time |
|--------|---------------|------|
| Perplexity Deep | ~$0.15-0.50 | 2-3 min |
| Gemini API | Free tier | 10-20 sec |
| Tavily Advanced | 2 credits (~$0.016) | 2-5 sec |
| Exa.ai | ~$0.005 | 2-5 sec |
| **Full Orchestration** | **~$0.20-0.55** | **2-3 min** |
| Claude Deep Research | Included with Max plan | 5-15 min |
| Gemini Deep Research | Included with Advanced plan | 5-15 min |
| Manus | Per plan | 5-15 min |

## Example

```
User: Deep research on "AI agent architectures for autonomous task completion in 2026"

Claude: I'll run comprehensive research across all sources.

[Runs orchestrator.py with query]

Results saved to research-staging folder:
- Perplexity: Detailed analysis with 15 citations
- Gemini: Google's perspective with web grounding
- Tavily: 10 structured search results
- Exa: 10 semantically relevant articles

Would you like me to:
1. Run browser-based deep research for more depth?
2. Synthesize these results into a unified report?
3. Search for specific sub-topics?
```
