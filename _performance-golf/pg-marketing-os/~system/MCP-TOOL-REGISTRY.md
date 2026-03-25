# MCP Tool Registry — Per-Skill Tool Requirements

**Version:** 1.0
**Created:** 2026-03-10
**Purpose:** Document which skills require which MCP tools, enabling lazy tool discovery via ToolSearch
**Integration:** Referenced by PROTOCOL-MANIFEST.md at priority 98

---

## HOW TO USE

1. At skill Layer 0, check this registry for the current skill
2. If the skill has MCP tool requirements, call `ToolSearch("[tool-group]")` to load tool schemas
3. If the skill has NO MCP tool requirements, skip ToolSearch entirely — saves 10-40K tokens

**Most skills (60+) need NO MCP tools.** Only call ToolSearch when this registry says to.

---

## Research Tool Strategy (Skill 01 / Deep Research)

Deep Research uses a **4-tool stack** — each tool has a distinct role:

| Tool | Role | Best For |
|------|------|----------|
| **Exa** | Discovery + synthesis | "Find the most relevant sources about X" — semantic search finds high-quality URLs, Deep Researcher runs autonomous multi-step exploration |
| **Perplexity** | Targeted Q&A | "What are common complaints about X?" — fast synthesized answers with citations for specific questions |
| **Firecrawl** | Raw extraction | "Scrape this URL / search + scrape" — extracts full page content from known URLs, crawls multi-page sites |
| **Apify** | Platform scraping | "Scrape Reddit / YouTube / Amazon reviews" — specialized actors for platforms that block generic scrapers |

**Workflow:** Use Exa + Perplexity to discover and synthesize → then Firecrawl + Apify to extract verbatim quotes from the best sources.

---

## Tool-to-Skill Mapping

### Firecrawl (Web Scraping)

**Skills that use it:** 01 (Deep Research), A01 (Ad Intelligence), S09 (Caption Writing)

**Tools:**
- `firecrawl_scrape` — Single page content extraction
- `firecrawl_crawl` — Multi-page crawling
- `firecrawl_search` — Web search + scrape
- `firecrawl_extract` — Structured data extraction
- `firecrawl_map` — URL discovery

**Load via:** `ToolSearch("firecrawl")` at Layer 0

---

### Apify Actors

**Skills that use it:** 01 (Deep Research), A01 (Ad Intelligence — Facebook Ad Library), S09 (Caption Writing)

**Tools:**
- `search-actors` — Find relevant actors in Apify Store
- `call-actor` — Execute an actor
- `get-actor-output` — Retrieve actor results
- `fetch-actor-details` — Get actor input schema

**Load via:** `ToolSearch("apify")` at Layer 0

---

### Exa (AI-Native Search + Deep Research)

**Skills that use it:** 01 (Deep Research), A01 (Ad Intelligence)

**Tools:**
- `web_search_exa` — Semantic search across the web (meaning-based, not just keywords)
- `crawling_exa` — Crawl and extract content from discovered URLs
- `deep_researcher_start` — Launch autonomous multi-step deep research on a topic
- `deep_researcher_check` — Check status / retrieve deep research results
- `company_research_exa` — Company intelligence (funding, tech stack, competitors)
- `linkedin_search_exa` — Search LinkedIn profiles and companies
- `get_code_context_exa` — Search code repositories and technical documentation

**When to use:** Use Exa to DISCOVER what to scrape (semantic search finds high-relevance sources), then Firecrawl/Apify to extract full content. Use Deep Researcher for broad synthesis tasks that benefit from autonomous multi-step exploration.

**Load via:** `ToolSearch("exa")` at Layer 0

---

### Perplexity (AI-Synthesized Search)

**Skills that use it:** 01 (Deep Research)

**Tools:**
- Perplexity search tools — Returns synthesized answers with source citations

**When to use:** Use Perplexity for targeted Q&A where you need a synthesized answer fast ("What are common complaints about LAB Golf putters?", "How does lie angle balance work in putters?"). Returns a coherent answer with linked citations. Complements Exa (broad exploration) and Firecrawl/Apify (raw extraction).

**Load via:** `ToolSearch("perplexity")` at Layer 0

---

### Ref (Documentation Search)

**Skills that use it:** Any skill needing library/framework/API documentation

**Tools:**
- `ref_search_documentation` — Search docs for a library or framework
- `ref_read_url` — Read a specific documentation URL

**When to use:** Reference tool for development tasks. Not typically used during marketing pipeline execution, but available when building or debugging tools/agents.

**Load via:** `ToolSearch("ref")` at Layer 0

---

### Google Drive

**Skills that use it:** 01 (Deep Research) — for source material access

**Tools:**
- `readGoogleDoc` — Read Google Docs
- `getGoogleSheetContent` — Read Google Sheets
- `search` — Search Drive files
- `downloadFile` — Download files

**Load via:** `ToolSearch("google drive")` at Layer 0

---

### Gemini Media (Image/Video Generation)

**Skills that use it:** A05 (Visual Direction), A08 (Visual/Video Production)

**Tools:**
- `gemini-generate-image` — Image generation (Imagen 4 / Nano Banana 2)
- `gemini-generate-video` — Video generation (Veo 3.1)
- `gemini-analyze-image` — Visual review and analysis
- `gemini-start-image-edit`, `gemini-continue-image-edit`, `gemini-end-image-edit` — Iterative image editing

**Load via:** `ToolSearch("gemini image")` or `ToolSearch("gemini video")` at Layer 0

---

### ElevenLabs Audio

**Skills that use it:** A08 (Visual/Video Production)

**Tools:**
- ElevenLabs Voice (TTS, voice cloning)
- ElevenLabs Music (text-to-music)
- ElevenLabs SFX (text-to-SFX)

**Load via:** `ToolSearch("elevenlabs")` at Layer 0

---

### Notion Integration

**Skills that use it:** None in pipeline (COO agent only)

**Tools:** `notion-*` tools

**Load via:** Never load during marketing-os pipeline execution

---

## Skills That Need NO MCP Tools

The majority of skills use NO external MCP tools. These skills should NOT trigger any ToolSearch calls.

| Engine | Skills WITH MCP Tools | Skills WITHOUT |
|--------|----------------------|----------------|
| Foundation (00-09) | 01 (Research: Firecrawl, Apify, Exa, Perplexity) | 00, 02-09 |
| Long-form (10-20) | None | 10-20 |
| PDP Pipeline (PDP-01-17) | None | PDP-01 to PDP-17 |
| Upsell (U0-U5) | None | U0-U5 |
| Checkout (CK-00-03) | None | CK-00 to CK-03 |
| Email (E0-E4) | None | E0-E4 |
| Ads (A01-A12) | A01, A05, A08 | A02-A04, A06-A07, A09-A12 |
| Advertorial (ADV-00-05) | None | ADV-00 to ADV-05 |
| Organic (S01-S24) | S09 | S01-S08, S10-S24 |

---

## Token Savings

MCP tool schemas are typically 500-2,000 tokens each. With 20+ MCP tools configured, that is ~10-40K tokens of schema in every session.

For the 80+ skills that do not use MCP tools, skipping ToolSearch eliminates this overhead entirely.

| Session Type | Current MCP Overhead | With Lazy Discovery | Savings |
|-------------|---------------------|--------------------|---------|
| Non-MCP skill (majority) | ~10-40K (all schemas loaded) | 0 (no ToolSearch) | ~10-40K |
| MCP skill (A01, A05, etc.) | ~10-40K (all schemas) | ~2-5K (only needed schemas) | ~5-35K |
