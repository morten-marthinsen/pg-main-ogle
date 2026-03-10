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

**Skills that use it:** A01 (Ad Intelligence — Facebook Ad Library), S09 (Caption Writing)

**Tools:**
- `search-actors` — Find relevant actors in Apify Store
- `call-actor` — Execute an actor
- `get-actor-output` — Retrieve actor results
- `fetch-actor-details` — Get actor input schema

**Load via:** `ToolSearch("apify")` at Layer 0

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
| Foundation (00-09) | 01 (Research) | 00, 02-09 |
| Long-form (10-20) | None | 10-20 |
| E-Commerce (EC-00-06) | None | EC-00 to EC-06 |
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
