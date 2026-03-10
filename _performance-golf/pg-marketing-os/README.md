# Marketing-OS

A direct-response marketing system that takes you from raw product information through research, positioning, and messaging to finished sales copy across 11 engines. Designed for AI-assisted execution with human oversight at every checkpoint.

---

## Quick Route

Already know what you need? Go directly:

| I need to... | Load this file |
|-------------|----------------|
| Start a full campaign from scratch | `00-deep-research/00-brief/SKILL.md` |
| Write long-form sales copy (VSL, magalog, sales page) | `02-long-form-vsl/10-headlines/SKILL.md` |
| Create e-commerce copy | `03-e-comm/E-COMM-ENGINE.md` |
| Build landing pages or PDPs | `04-page-builder/LANDING-PAGE-ENGINE.md` |
| Write upsell/post-purchase sequences | `05-upsells/UPSELL-ENGINE.md` |
| Optimize checkout flow | `06-checkout/CHECKOUT-ENGINE.md` |
| Build email sequences | `07-emails/EMAIL-ENGINE.md` |
| Create ad campaigns | `08-ads/AD-ENGINE.md` |
| Write advertorials | `09-advertorials/ADVERTORIAL-ENGINE.md` |
| Generate organic social content | `10-organic/ORGANIC-ENGINE.md` |

If you're not sure where to start, read on.

---

## Prerequisites

### Required

- **Claude Code CLI** — `npm install -g @anthropic-ai/claude-code` (or Claude Desktop with MCP support)
- **Node.js 18+** — Required for MCP server installation

### MCP Servers (External Tools)

Some engines connect to external services for web scraping, media generation, and file access. Most engines need **zero** external tools — only 5 out of 85 skills use MCP servers.

**See [`MCP-SETUP.md`](MCP-SETUP.md) for the complete setup guide** — includes which engines need which tools, account creation links, pricing, and configuration.

Quick summary:

| If you're using... | You need... |
|-------------------|------------|
| Core Message, Long-Form Copy, Emails, Upsells, Checkout, E-Commerce, Advertorials, Page Builder | Nothing extra |
| Deep Research (Skill 01) | Firecrawl + Apify (+ optionally Google Drive) |
| Ad Intelligence (A01) | Firecrawl + Apify |
| Ad Production (A05, A08) | Gemini + ElevenLabs |
| Organic Caption Research (S09) | Firecrawl + Apify |

---

## What This System Does

Marketing-OS turns product/brand information into direct-response marketing assets through a structured pipeline:

1. **Research** — Market research, proof inventory, competitive analysis
2. **Positioning** — Root cause, mechanism, promise, big idea
3. **Strategy** — Offer architecture, structure, campaign brief
4. **Copy** — Headlines, lead, story, body copy, close, editorial review
5. **Distribution** — Ads, email, organic social, upsells, landing pages, advertorials

The foundation pipeline (steps 1-3) produces a **Campaign Brief** that feeds every downstream engine. You build the foundation once, then generate assets across any combination of engines.

---

## Three Ways to Use It

### Scenario A: Full Pipeline (Starting from Scratch)

You have a product but no existing marketing. Run the full pipeline.

**Session 1 — Brief + Research (Skills 00-01)**
- Your role: Provide product details, brand guidelines, source materials
- AI role: Runs research skill, builds proof inventory
- Output: Research package, proof inventory

**Session 2 — Positioning (Skills 02-06)**
- Your role: Review research, provide direction, approve Big Idea
- AI role: Develops root cause → mechanism → promise → Big Idea
- Output: Positioning framework, Big Idea

**Session 3 — Strategy (Skills 07-09)**
- Your role: Review offer, approve structure, approve campaign brief
- AI role: Builds offer architecture, determines structure, assembles campaign brief
- Output: Campaign Brief (this feeds ALL downstream work)

**Session 4 — Copy Generation (Skills 10-17)**
- Your role: Review each section, provide feedback
- AI role: Generates headlines → lead → story → body → close
- Output: Draft sales copy sections

**Session 5 — Assembly + Editorial (Skills 18-20)**
- Your role: Final review, approve for production
- AI role: Weaves proof, assembles full copy, editorial polish
- Output: Final sales copy document

**Session 6 — Branch Engines**
- Your role: Select which engines to activate, review output
- AI role: Generates ads, emails, social content, upsells, landing pages from Campaign Brief
- Output: Engine-specific deliverables

### Scenario B: Skip to an Engine (Existing Messaging)

You already have positioning, a Big Idea, or a Campaign Brief from previous work.

1. Load the target engine's master file (see Quick Route table above)
2. The engine will ask you to provide or paste your existing messaging
3. It validates your inputs against its requirements
4. You proceed directly to copy generation within that engine

### Scenario C: Quick Single Output

You need one specific deliverable fast (e.g., 3 ad scripts, an email sequence).

1. Load the target engine
2. Provide minimal context: product, audience, key promise, mechanism
3. The engine generates output with lighter validation
4. Best for experienced operators who know their positioning

---

## Engine Reference

### Deep Research (Skills 00-02)
**What:** Brief creation, market research, and proof inventory.
**Entry:** `00-deep-research/00-brief/SKILL.md`
**Skills:** 00-Brief → 01-Research → 02-Proof Inventory

### Core Message (Skills 03-09)
**What:** Positioning and campaign strategy development.
**Entry:** `01-core-message/03-root-cause/SKILL.md`
**Skills:** 03-Root Cause → 04-Mechanism → 05-Promise → 06-Big Idea → 07-Offer → 08-Structure → 09-Campaign Brief

### Long-Form Copy (Skills 10-20)
**What:** Full-length sales copy (VSLs, magalogs, sales pages).
**Entry:** `02-long-form-vsl/10-headlines/SKILL.md`
**Skills:** 10-Headlines → 11-Lead → 12-Story → 13-Root Cause Narrative → 14-Mechanism Narrative → 15-Product Introduction → 16-Offer Copy → 17-Close → 18-Proof Weaving → 19-Campaign Assembly → 20-Editorial

### E-Commerce (Skills EC-00–EC-06)
**What:** E-commerce copy — feature naming, section copy, micro-scripts, page builder handoff.
**Entry:** `03-e-comm/E-COMM-ENGINE.md`
**Count:** 7 skills from strategy through feature naming, hero, sections, micro-scripts, assembly, and editorial.

### Page Builder
**What:** Landing pages and product detail pages.
**Entry:** `04-page-builder/LANDING-PAGE-ENGINE.md`

### Upsells (Skills U0-U5)
**What:** Post-purchase upsell and cross-sell sequences.
**Entry:** `05-upsells/UPSELL-ENGINE.md`
**Count:** 6 skills from strategy through upsell copy.

### Checkout (Skills CK-00–CK-03)
**What:** Checkout flow optimization — trust architecture, form micro-copy, friction reduction.
**Entry:** `06-checkout/CHECKOUT-ENGINE.md`
**Count:** 4 skills from strategy through trust copy, form micro-copy, and editorial.

### Email (Skills E0-E4)
**What:** Email strategy, sequences, and editorial review.
**Entry:** `07-emails/EMAIL-ENGINE.md`
**Count:** 5 skills from strategy through sequence generation.

### Ads (Skills A01-A12)
**What:** Ad concepts, scripts, and launch packages across platforms.
**Entry:** `08-ads/AD-ENGINE.md`
**Count:** 12 skills covering concept development through production-ready scripts.

### Advertorials (Skills ADV-00–ADV-05)
**What:** Native ad advertorials — listicle, native, blog, review, PAS, sponsored, editorial types.
**Entry:** `09-advertorials/ADVERTORIAL-ENGINE.md`
**Count:** 6 skills from strategy through hook/lead, body, bridge, assembly, and editorial.

### Organic Social (Skills S01-S24)
**What:** Social media content engine across platforms.
**Entry:** `10-organic/ORGANIC-ENGINE.md`
**Count:** 24 skills covering strategy, content creation, and production.

---

## System Files

These files are loaded automatically during skill execution. You generally don't need to read them directly.

| File | Purpose |
|------|---------|
| `~system/SYSTEM-CORE.md` | Universal execution rules — loaded for every skill |
| `~system/PROTOCOL-MANIFEST.md` | Priority-banded protocol loading rules — controls what loads per skill |
| `~system/MCP-TOOL-REGISTRY.md` | Maps which skills need which MCP tools |
| `~system/ARENA-PROTOCOL.md` | Arena competition protocol — loaded for skills 03-20 |
| `~system/SPECIMEN-GUIDE.md` | Specimen loading guide — loaded for skills 10-20 |
| `~system/PROTOCOL-INDEX.md` | Protocol reference index |
| `~system/OPERATIONS-MANUAL.md` | Full system operations manual |
| `~system/SESSION-ARCHITECTURE.md` | Session structure and model assignments |
| `~system/OUTPUT-STRUCTURE.md` | Output folder structure and project codes |
| `~system/pipeline-handoff-registry.md` | Inter-skill data contracts |
| `~system/protocols/EXECUTION-GUARDRAILS.md` | Manifest-driven loading checklist — universal enforcement |

---

## Directory Structure

```
marketing-os/
├── README.md                ← You are here
├── AGENT.md                 ← AI interactive guide
├── CLAUDE.md                ← Claude Code adapter
├── MCP-SETUP.md             ← External tool setup guide
│
├── 00-deep-research/        ← Skills 00-02: Brief → Research → Proof Inventory
├── 01-core-message/         ← Skills 03-09: Root Cause → Campaign Brief
├── 02-long-form-vsl/        ← Skills 10-20: Headlines → Editorial
├── 03-e-comm/               ← Skills EC-00–EC-06: E-Commerce Copy Engine
├── 04-page-builder/         ← Landing Page + PDP Engine
├── 05-upsells/              ← Skills U0-U5: Upsell Engine
├── 06-checkout/             ← Skills CK-00–CK-03: Checkout Engine
├── 07-emails/               ← Skills E0-E4: Email Engine
├── 08-ads/                  ← Skills A01-A12: Ad Engine
├── 09-advertorials/         ← Skills ADV-00–ADV-05: Advertorial Engine
├── 10-organic/              ← Skills S01-S24: Organic Social Engine
│
├── ~outputs/                ← Project outputs by code
├── ~system/                 ← System governance files
└── ~brain/                  ← Non-operational reference
```

---

## Outputs

All project outputs are saved to `~outputs/[project-code]/` where the project code is a 2-4 letter identifier (e.g., RS1, SPD, ULV). Each project gets subdirectories for each engine used.

See `~system/OUTPUT-STRUCTURE.md` for the full specification.
