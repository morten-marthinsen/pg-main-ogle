# MCP Setup Guide — External Tool Configuration

Marketing-OS uses **MCP (Model Context Protocol) servers** to connect AI agents to external services like web scrapers, media generators, and file storage. Not every engine needs MCP tools — most skills run entirely on AI reasoning. But certain engines require external tool access to function.

This guide walks you through setting up each MCP server you need.

---

## Which MCPs Do I Need?

Check the table below against the engines you plan to use. If you only need core message development and long-form copy (engines 00-02), you need **zero MCP servers** — the AI handles everything.

| MCP Server | Required By | What It Does | Free Tier? |
|-----------|------------|-------------|-----------|
| **Firecrawl** | Deep Research (01), Ad Intelligence (A01), Caption Writing (S09) | Web scraping, search, content extraction | 500 credits on signup |
| **Apify** | Deep Research (01), Ad Intelligence (A01), Caption Writing (S09) | Platform-specific scraping (Reddit, YouTube, Facebook Ad Library, social media) | $5/month free |
| **Exa** | Deep Research (01), Ad Intelligence (A01) | AI-native search, deep research synthesis, company intelligence, LinkedIn search | Pay-per-use |
| **Perplexity** | Deep Research (01) | AI-synthesized search with citations — returns summarized answers with source URLs | Pay-per-use |
| **Ref** | Any skill needing library/framework docs | Search and read documentation for libraries, frameworks, and APIs | Free |
| **Google Drive** | Deep Research (01) | Access source materials stored in Google Docs/Sheets | Free with Google account |
| **Gemini** | Visual Direction (A05), Visual/Video Production (A08) | Image generation (Imagen 4), video generation (Veo 3.1), image editing | Pay-per-use via Google AI Studio |
| **ElevenLabs** | Visual/Video Production (A08) | Voice-over (TTS), music generation, sound effects | Limited free tier; paid plans from $5/mo |

### Engine-to-MCP Quick Reference

| Engine | MCPs Needed | Notes |
|--------|------------|-------|
| 00 Deep Research — Brief (Skill 00) | None | |
| 00 Deep Research — Research (Skill 01) | Firecrawl, Apify, Exa, Perplexity, Google Drive | Core research engine — Firecrawl + Apify for scraping, Exa + Perplexity for synthesized research |
| 00 Deep Research — Proof Inventory (Skill 02) | None | Works from Skill 01 output |
| 01 Core Message (Skills 03-09) | None | Pure strategy — no external tools |
| 02 Long-Form VSL (Skills 10-20) | None | Copy generation from internal context |
| 03 E-Commerce (EC-00 to EC-06) | None | |
| 04 Page Builder | None | |
| 05 Upsells (U0-U5) | None | |
| 06 Checkout (CK-00 to CK-03) | None | |
| 07 Emails (E0-E4) | None | |
| 08 Ads — Intelligence (A01) | Firecrawl, Apify, Exa | Competitive ad scraping + company intelligence |
| 08 Ads — Visual Direction (A05) | Gemini | Image generation for visual briefs |
| 08 Ads — Production (A08) | Gemini, ElevenLabs | Full media production |
| 08 Ads — All Other Skills | None | Strategy, copy, arena skills |
| 09 Advertorials (ADV-00 to ADV-05) | None | |
| 10 Organic — Caption Writing (S09) | Firecrawl, Apify | Competitor caption research |
| 10 Organic — All Other Skills | None | |

---

## Setup Instructions

### Prerequisites

- **Claude Code CLI** — `npm install -g @anthropic-ai/claude-code`
  - Or **Claude Desktop App** with MCP support
- **Node.js** 18+ (for MCP server installation)

---

### 1. Firecrawl (Web Scraping)

**Used by:** Skill 01 (Deep Research), A01 (Ad Intelligence), S09 (Caption Writing)

**What it does:** Scrapes web pages, searches the web, extracts structured data, crawls multi-page sites, and discovers URLs. This is the primary web research tool.

**Setup:**

1. **Create account:** Go to [https://firecrawl.dev](https://firecrawl.dev) and sign up
2. **Get API key:** Dashboard → API Keys → Create new key
3. **Pricing:** 500 free credits on signup. After that, plans start at $19/month (Hobby) for 3,000 credits. A typical research project uses 250-500 credits (~$10-15).

**Install the MCP server:**

```bash
npm install -g firecrawl-mcp
```

**Add to Claude Code config** (`~/.claude/settings.json` or use `/mcp add` command):

```json
{
  "mcpServers": {
    "firecrawl-mcp": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "your-firecrawl-api-key"
      }
    }
  }
}
```

**Verify:** Run Claude Code and ask "Can you scrape https://example.com?" — it should return page content.

---

### 2. Apify (Platform-Specific Scraping)

**Used by:** Skill 01 (Deep Research), A01 (Ad Intelligence), S09 (Caption Writing)

**What it does:** Runs specialized scraping "Actors" for platforms that block generic scrapers — Reddit, YouTube, Facebook Ad Library, Amazon reviews, social media profiles. Also provides a general-purpose RAG web browser.

**Setup:**

1. **Create account:** Go to [https://apify.com](https://apify.com) and sign up
2. **Get API token:** Settings → Integrations → API token
3. **Pricing:** $5 free credits/month on the free plan. Paid plans start at $49/month for $49 in platform credits. A typical research project uses $3-8 in Apify credits.

**Install the MCP server:**

```bash
npm install -g @anthropic-ai/mcp-server-apify
```

**Add to Claude Code config:**

```json
{
  "mcpServers": {
    "apify": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-apify"],
      "env": {
        "APIFY_API_TOKEN": "your-apify-token"
      }
    }
  }
}
```

**Verify:** Ask Claude "Search the Apify store for Reddit scraper" — it should return actor listings.

---

### 3. Exa (AI-Native Search + Deep Research)

**Used by:** Skill 01 (Deep Research), A01 (Ad Intelligence)

**What it does:** AI-native search engine that understands meaning, not just keywords. Returns high-relevance results for nuanced queries. Includes a Deep Researcher mode that runs autonomous multi-step research and returns synthesized reports with citations. Also provides company intelligence (funding, tech stack, competitors) and LinkedIn search.

**Why use it alongside Firecrawl/Apify:** Firecrawl and Apify are raw scrapers — they extract content from URLs you point them at. Exa is a synthesized research layer — it finds the most relevant sources across the entire web for a given concept, then lets you crawl those specific URLs. Use Exa to discover WHAT to scrape, then Firecrawl/Apify to extract the full content.

**Setup:**

1. **Create account:** Go to [https://exa.ai](https://exa.ai) and sign up
2. **Get API key:** Dashboard → API Keys
3. **Pricing:** Pay-per-use. Search queries ~$0.001-0.003 each. Deep Researcher runs ~$0.10-0.50 depending on depth. A typical research project uses $2-5.

**Add to Claude Code (user scope — available in all projects):**

```bash
claude mcp add exa -s user --env EXA_API_KEY="your-exa-api-key" -- npx -y exa-mcp-server
```

**Tools available:**
- `web_search_exa` — Semantic search across the web
- `crawling_exa` — Crawl and extract content from discovered URLs
- `deep_researcher_start` — Launch autonomous deep research on a topic
- `deep_researcher_check` — Check status and retrieve deep research results
- `company_research_exa` — Company intelligence (funding, tech stack, employees)
- `linkedin_search_exa` — Search LinkedIn profiles and companies
- `get_code_context_exa` — Search code repositories and technical docs

**Verify:** Ask Claude "Use Exa to search for 'premium putter technology reviews'" — it should return relevant results with URLs.

---

### 4. Perplexity (AI-Synthesized Search)

**Used by:** Skill 01 (Deep Research)

**What it does:** AI-powered search that returns synthesized answers with citations. Unlike raw search engines, Perplexity reads multiple sources, synthesizes the information, and returns a coherent answer with links to every claim. Excellent for competitor research, market landscape questions, and technical fact-checking.

**Why use it alongside Exa:** Exa excels at finding specific sources and running multi-step autonomous research. Perplexity excels at quick synthesized answers to specific questions. Use Perplexity for targeted Q&A ("What are common complaints about LAB Golf putters?") and Exa for broad exploratory research.

**Setup:**

1. **Create account:** Go to [https://perplexity.ai](https://perplexity.ai) and sign up
2. **Get API key:** Settings → API → Generate key (requires Perplexity Pro subscription)
3. **Pricing:** Included with Perplexity Pro ($20/month). API calls are pay-per-use on top of subscription.

**Add to Claude Code (user scope — available in all projects):**

```bash
claude mcp add perplexity -s user --env PERPLEXITY_API_KEY="your-perplexity-api-key" -- npx -y @perplexity-ai/mcp-server
```

**Verify:** Ask Claude "Use Perplexity to search for 'LAB Golf putter reviews 2025'" — it should return a synthesized answer with citations.

---

### 5. Ref (Documentation Search)

**Used by:** Any skill needing to reference library, framework, or API documentation

**What it does:** Searches and reads official documentation for libraries, frameworks, and APIs. Useful when building tools, debugging integrations, or referencing technical specs during development.

**Setup:**

1. **Get API key:** Go to [https://ref.tools](https://ref.tools) and create an account
2. **Pricing:** Free tier available.

**Add to Claude Code (user scope):**

```json
{
  "mcpServers": {
    "Ref": {
      "type": "http",
      "url": "https://api.ref.tools/mcp",
      "headers": {
        "x-ref-api-key": "your-ref-api-key"
      }
    }
  }
}
```

**Tools available:**
- `ref_search_documentation` — Search docs for a library or framework
- `ref_read_url` — Read a specific documentation URL

**Verify:** Ask Claude "Use Ref to search the Next.js documentation for 'server components'" — it should return relevant doc sections.

---

### 6. Google Drive (Source Material Access)

**Used by:** Skill 01 (Deep Research) — for accessing source documents, sales pages, and brand materials stored in Google Drive

**What it does:** Reads Google Docs, Google Sheets, searches Drive files, and downloads documents. Useful when research source materials are stored in Drive.

**Setup:**

1. **Google Cloud Console:** Go to [https://console.cloud.google.com](https://console.cloud.google.com)
2. **Create a project** (or use an existing one)
3. **Enable APIs:** Google Drive API + Google Docs API + Google Sheets API
4. **Create OAuth credentials:** APIs & Services → Credentials → Create OAuth Client ID → Desktop App
5. **Download credentials:** Save the JSON file
6. **Pricing:** Free with any Google account. No usage limits for personal Drive access.

**Install the MCP server:**

```bash
npm install -g @anthropic-ai/mcp-server-google-drive
```

**Add to Claude Code config:**

```json
{
  "mcpServers": {
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-google-drive"],
      "env": {
        "GOOGLE_CREDENTIALS_PATH": "/path/to/your/credentials.json"
      }
    }
  }
}
```

**First run:** Claude will open a browser window for OAuth consent. Authorize access to your Drive.

**Verify:** Ask Claude "List my Google Drive files" — it should return your Drive contents.

---

### 7. Gemini (Image + Video Generation)

**Used by:** A05 (Visual Direction), A08 (Visual/Video Production)

**What it does:** Generates images via Imagen 4, generates video via Veo 3.1, analyzes images, and provides iterative image editing. Used for ad creative production.

**Setup:**

1. **Google AI Studio:** Go to [https://aistudio.google.com](https://aistudio.google.com) and sign in with your Google account
2. **Get API key:** Click "Get API Key" → Create API key
3. **Pricing:** Pay-per-use. Image generation ~$0.02-0.04/image. Video generation ~$0.10-0.35/clip. Check [Google AI pricing](https://ai.google.dev/pricing) for current rates.

**Install the MCP server:**

```bash
npm install -g gemini-mcp
```

**Add to Claude Code config:**

```json
{
  "mcpServers": {
    "gemini": {
      "command": "npx",
      "args": ["-y", "gemini-mcp"],
      "env": {
        "GEMINI_API_KEY": "your-gemini-api-key"
      }
    }
  }
}
```

**Verify:** Ask Claude "Generate a test image of a sunset" — it should produce an image file.

---

### 8. ElevenLabs (Audio Production)

**Used by:** A08 (Visual/Video Production)

**What it does:** Text-to-speech (voice-over generation), text-to-music, and text-to-sound-effects. Used for ad audio production.

**Setup:**

1. **Create account:** Go to [https://elevenlabs.io](https://elevenlabs.io) and sign up
2. **Get API key:** Profile → API Keys
3. **Pricing:** Free tier includes limited characters/month. Starter plan is $5/month for 30,000 characters. Pro plan is $22/month for 100,000 characters. Ad production typically needs Starter or above.

**Install the MCP server:**

```bash
npm install -g elevenlabs-mcp
```

**Add to Claude Code config:**

```json
{
  "mcpServers": {
    "elevenlabs": {
      "command": "npx",
      "args": ["-y", "elevenlabs-mcp"],
      "env": {
        "ELEVENLABS_API_KEY": "your-elevenlabs-api-key"
      }
    }
  }
}
```

**Verify:** Ask Claude "Generate a test voice clip saying 'Hello world'" — it should produce an audio file.

---

## Combined Configuration

If you need all MCP servers, here is the complete config block. **Recommended approach:** Add research MCPs at user scope (available everywhere) and project-specific MCPs at project scope.

**User scope** (run these commands — adds to `~/.claude.json`):

```bash
# Research + scraping stack (available in all projects)
claude mcp add firecrawl -s user --env FIRECRAWL_API_KEY="your-key" -- npx -y firecrawl-mcp
claude mcp add apify -s user  # Use HTTP config below for Apify
claude mcp add exa -s user --env EXA_API_KEY="your-key" -- npx -y exa-mcp-server
claude mcp add perplexity -s user --env PERPLEXITY_API_KEY="your-key" -- npx -y @perplexity-ai/mcp-server
```

For Apify (HTTP-based) and Ref, add directly to `~/.claude.json` under `mcpServers`:

```json
{
  "apify": {
    "type": "http",
    "url": "https://mcp.apify.com",
    "headers": {
      "Authorization": "Bearer your-apify-token"
    }
  },
  "Ref": {
    "type": "http",
    "url": "https://api.ref.tools/mcp",
    "headers": {
      "x-ref-api-key": "your-ref-api-key"
    }
  }
}
```

**Project scope** (add to `.claude/mcp.json` in the project — no API keys):

```json
{
  "mcpServers": {
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-google-drive"],
      "env": {
        "GOOGLE_CREDENTIALS_PATH": "/path/to/credentials.json"
      }
    },
    "gemini": {
      "command": "npx",
      "args": ["-y", "gemini-mcp"],
      "env": {
        "GEMINI_API_KEY": "your-gemini-api-key"
      }
    },
    "elevenlabs": {
      "command": "npx",
      "args": ["-y", "elevenlabs-mcp"],
      "env": {
        "ELEVENLABS_API_KEY": "your-elevenlabs-api-key"
      }
    }
  }
}
```

---

## Budget Estimates Per Project

| Activity | Firecrawl | Apify | Exa | Perplexity | Gemini | ElevenLabs | Total |
|----------|-----------|-------|-----|------------|--------|------------|-------|
| Full Research (Skill 01) | $10-15 | $3-8 | $2-5 | $1-3 | — | — | **$16-31** |
| Ad Intelligence (A01) | $5-10 | $2-5 | $1-3 | — | — | — | **$8-18** |
| Ad Production (A05+A08) | — | — | — | — | $5-20 | $3-10 | **$8-30** |
| Organic Caption Research (S09) | $2-5 | $1-3 | — | — | — | — | **$3-8** |

Most engines (core message, long-form copy, emails, upsells, checkout, e-commerce, advertorials, page builder) cost **$0** in external tool fees — they run entirely on AI reasoning.

---

## Troubleshooting

### "Tool not found" errors
MCP servers may not be running. Restart Claude Code after config changes. Check that `npx` can access the package (try `npx -y firecrawl-mcp --help`).

### Rate limiting
Firecrawl and Apify have rate limits on free tiers. The system has built-in fallback chains — if one tool hits limits, it tries alternatives. Upgrade to paid plans for production use.

### OAuth errors (Google Drive)
Re-run the OAuth flow by deleting the cached token file and restarting Claude Code. The consent screen will reappear.

### Empty scrape results
Some platforms block generic scraping. Apify Actors are specifically designed for blocked platforms (Reddit, YouTube, social media). If Firecrawl returns empty, the system falls back to Apify automatically.

---

## Further Reference

- **MCP Tool Registry:** `~system/MCP-TOOL-REGISTRY.md` — Maps which skills use which tools
- **Protocol Manifest:** `~system/PROTOCOL-MANIFEST.md` — Controls when MCP tools are loaded (priority 98)
- **Skill 01 Installation Guide:** `00-deep-research/01-research/INSTALLATION.md` — Detailed setup for the research engine specifically
