# Browser-Based Deep Research

## Overview

These are deep research sources (5-15+ minutes each) that provide more thorough, comprehensive research than the API-based sources. They use the "Claude in Chrome" MCP server to automate a Chrome browser, allowing Claude Code to interact with research platforms on your behalf.

## Setup: Claude in Chrome MCP

To use browser-based research, you need the Claude in Chrome MCP server installed and configured.

### Installation

1. **Install the MCP server** - Search for "Claude in Chrome MCP" for the latest installation instructions
2. **Configure it** in your Claude Code MCP settings (`~/.claude/settings.json` or project settings)
3. **Test it** by asking Claude Code: "Navigate to google.com using Claude in Chrome"

### Platform Accounts

You'll also need active accounts on the platforms you want to use:

| Platform | Requirement | Sign Up |
|----------|-------------|---------|
| Claude Deep Research | Claude Max plan | https://claude.ai |
| Gemini Deep Research | Gemini Advanced plan | https://gemini.google.com |
| Manus | Manus account | https://manus.im |

> **Note:** You don't need all three. Even one browser source adds significant depth to your research.

---

## Platform Details

### 1. Manus (manus.im)

**URL:** https://manus.im/app
**Best For:** Complex multi-step research tasks, web scraping, data gathering

**How Claude Code Uses It:**
```
1. mcp__Claude_in_Chrome__navigate -> https://manus.im/app
2. mcp__Claude_in_Chrome__find -> "task input"
3. mcp__Claude_in_Chrome__form_input -> Enter query
4. mcp__Claude_in_Chrome__computer -> left_click send button
5. Monitor sidebar for completion
6. mcp__Claude_in_Chrome__get_page_text -> Extract results
```

**Manual Steps (if browser automation unavailable):**
1. Navigate to https://manus.im/app
2. Click on input field
3. Type research query
4. Click send button (arrow icon)
5. Monitor left sidebar for task progress
6. When complete, copy results

---

### 2. Claude Deep Research (claude.ai)

**URL:** https://claude.ai/new
**Best For:** Comprehensive analysis with citations, synthesized insights

**How Claude Code Uses It:**
```
1. mcp__Claude_in_Chrome__navigate -> https://claude.ai/new
2. mcp__Claude_in_Chrome__computer -> left_click on input field
3. mcp__Claude_in_Chrome__computer -> type "Please conduct deep research on: [QUERY]"
4. mcp__Claude_in_Chrome__computer -> key "Return"
5. Wait and monitor for completion
6. mcp__Claude_in_Chrome__get_page_text -> Extract results
```

**Manual Steps (if browser automation unavailable):**
1. Navigate to https://claude.ai/new
2. Click on input field
3. Type: "Please conduct deep research on: [QUERY]"
4. Click send button
5. Wait for research to complete
6. Copy the full response

---

### 3. Gemini Deep Research (gemini.google.com)

**URL:** https://gemini.google.com/app
**Best For:** Google's knowledge graph, real-time web data, structured reports

**How Claude Code Uses It:**
```
1. mcp__Claude_in_Chrome__navigate -> https://gemini.google.com/app
2. mcp__Claude_in_Chrome__computer -> left_click "Tools" button (~617, 385)
3. mcp__Claude_in_Chrome__computer -> left_click "Deep Research" (~665, 441)
4. mcp__Claude_in_Chrome__computer -> type query
5. mcp__Claude_in_Chrome__computer -> key "Return"
6. Wait for research plan + full report
7. mcp__Claude_in_Chrome__get_page_text -> Extract results
```

**Manual Steps (if browser automation unavailable):**
1. Navigate to https://gemini.google.com/app
2. Click "Tools" button in input area
3. Select "Deep Research" from dropdown
4. Type research query in input field
5. Click send
6. Wait for research plan, then full report
7. Copy the complete research document

---

## When to Use Browser Research

- **Complex topics** requiring 15+ sources
- **Recent events** needing real-time data
- **Multi-step analysis** requiring synthesis
- **When API sources** don't provide enough depth

## Combining with API Research

1. Start with orchestrator (API sources) - get quick results in 2-3 min
2. Review findings and identify gaps
3. Run browser research for specific deep-dive topics
4. Combine all results into unified report
