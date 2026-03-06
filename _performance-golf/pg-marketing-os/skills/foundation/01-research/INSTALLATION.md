# Deep Research System v4.0 - Installation Guide

**For: Rich**
**Packaged: January 25, 2026**

---

## Overview

This is a comprehensive deep market research system designed for copywriters. It orchestrates a multi-layer research pipeline to extract authentic customer language, pain points, desires, beliefs, and competitive intelligence from across the web.

---

## Prerequisites

### 1. Claude Code CLI or Claude Desktop App

This system runs as a skill/agent system within Claude. You need either:
- **Claude Code** (CLI) - `npm install -g @anthropic-ai/claude-code`
- **Claude Desktop App** with MCP support

### 2. Required MCP Servers

The system requires these MCP (Model Context Protocol) servers for web scraping:

#### A. Firecrawl MCP Server (Primary Scraper)
```bash
# Install
npm install -g firecrawl-mcp

# Get API key from: https://firecrawl.dev
# Add to your Claude config (see MCP Configuration below)
```

#### B. Apify MCP Server (Social/Reddit/YouTube)
```bash
# Install
npm install -g @anthropic-ai/mcp-server-apify

# Get API key from: https://apify.com
# Free tier includes 5 USD credits/month
```

#### C. Perplexity MCP Server (Research Fallback)
```bash
# Install
npm install -g @anthropic-ai/mcp-server-perplexity

# Get API key from: https://perplexity.ai/api
```

---

## MCP Configuration

### For Claude Desktop (macOS)

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "firecrawl-mcp": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "your-firecrawl-api-key"
      }
    },
    "apify": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-apify"],
      "env": {
        "APIFY_API_TOKEN": "your-apify-token"
      }
    },
    "perplexity": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-perplexity"],
      "env": {
        "PERPLEXITY_API_KEY": "your-perplexity-key"
      }
    }
  }
}
```

### For Claude Code CLI

Create `~/.claude/settings.json` or use the `/mcp` command in Claude Code to add servers.

---

## Folder Structure

```
01-research/
├── MASTER-AGENT.md          # Main orchestration agent (start here)
├── RESEARCH-PRD.md          # Requirements & quality standards
├── QUALITY-STANDARDS.md     # Detailed quality criteria
├── SKILL-OPTIMIZATION-TEMPLATE.md
├── AUDIT-REPORT.md
├── TECHNICAL-AUDIT-REPORT.md
│
├── skills/
│   ├── core/                # Always-active infrastructure skills
│   │   ├── 0.1-state-manager.md
│   │   ├── 0.2-tool-resilience.md
│   │   ├── 0.3-authenticity-validator.md
│   │   ├── 0.4-technical-audit.md
│   │   └── 0.5-chunking-manager.md
│   │
│   ├── layer-1/            # Data collection skills
│   │   ├── 0.0-A-market-configurator.md
│   │   ├── 1.0-A-context-expander.md
│   │   ├── 1.1-B-query-generator.md
│   │   ├── 1.4-A-forum-scraper.md
│   │   ├── 1.4-C-reddit-scraper.md
│   │   ├── 1.4-D-social-scraper.md
│   │   └── ... (22 total skills)
│   │
│   ├── layer-2/            # Intelligence analysis skills
│   │   ├── 2.1-A-pattern-analyzer.md
│   │   ├── 2.2-B-belief-excavator.md
│   │   ├── 2.3-A-competitor-analyzer.md
│   │   └── ... (15 total skills)
│   │
│   ├── layer-2-5/          # Synthesis skills (CRITICAL)
│   │   ├── 2.5-A-transformation-synthesizer.md
│   │   ├── 2.5-B-educational-synthesizer.md
│   │   ├── 2.5-C-web-synthesizer.md
│   │   ├── 2.5-D-transformation-grid.md
│   │   ├── 2.5-E-language-extractor.md
│   │   ├── 2.5-F-categorization-finalizer.md
│   │   └── 2.5-G-validation-generator.md
│   │
│   └── layer-3/            # Opportunity & output skills
│       ├── 3.1-A-opportunity-scorer.md
│       ├── 3.2-A-handoff-packager.md
│       └── ... (8 total skills)
│
├── market-configs/          # Market configuration templates
├── templates/              # Output templates
├── projects/               # Your research projects go here
└── audit/                  # Audit reports
```

---

## How to Use

### 1. Install & Configure MCPs (above)

### 2. Add the Skill to Claude

Copy this entire `01-research` folder to your Claude skills directory or reference it directly.

### 3. Start a Research Project

Invoke the Master Agent with a research brief:

```
@deep-research Run deep research for:

product:
  name: "Example Product"
  category: "Trading System"
  description: "An automated trading system for forex"
  known_benefits:
    - Automated entries and exits
    - Works on any timeframe
  price_point: "$997"

market:
  mode: A  # A = existing product, B = new product
  industry: "Finance"
  existing_marketing: ["https://example.com/sales-page"]
  target_customer: "Forex traders seeking consistent profits"

constraints:
  budget: $25
  timeline: standard
  focus_areas: []

context:
  why_now: "Launching new version"
  known_gaps: ["Don't know main objections"]
```

### 4. The System Will:

1. Configure itself for your specific market
2. Execute Layer 1: Source identification & quote extraction
3. Execute Layer 2: Intelligence analysis
4. Execute Layer 2.5: Synthesis (human checkpoint)
5. Execute Layer 3: Opportunity mapping & final handoff

---

## Tool Fallback Chain

The system automatically handles tool failures:

| Platform | Primary Tool | Fallback 1 | Fallback 2 |
|----------|-------------|------------|------------|
| General Web | Firecrawl | Apify | WebFetch |
| Reddit | Apify | Firecrawl | WebFetch |
| YouTube | Apify | Firecrawl | WebFetch |
| Social Media | Apify | - | WebFetch |
| Forums | Firecrawl | Apify | WebFetch |
| Reviews | Apify | Firecrawl | WebFetch |

---

## Budget Considerations

Estimated costs per research project (~$15-30):
- **Firecrawl**: ~$10-15 (250-500 pages)
- **Apify**: ~$3-8 (Reddit, YouTube, social scraping)
- **Perplexity**: ~$2-5 (research queries as fallback)

Get free trial credits:
- Firecrawl: 500 free credits on signup
- Apify: $5 free monthly
- Perplexity: Limited free tier

---

## Troubleshooting

### "Tool not found" errors
Ensure MCP servers are properly configured and running. Restart Claude after config changes.

### Rate limiting
The system has built-in backoff. If hitting limits frequently, increase time between research projects.

### Empty results
Check if the target platform blocks scraping. The system will auto-fallback but some platforms (Instagram, TikTok) require Apify actors.

---

## Questions?

This system was built by Anthony. Reach out if you have questions about setup or usage.

---

**Happy researching!**
