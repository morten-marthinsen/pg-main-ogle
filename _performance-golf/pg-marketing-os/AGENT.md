# Marketing-OS

> Direct-response marketing system: research, messaging, and copy generation across
> 11 engines (deep research, core message, long-form VSL, e-comm, page builder,
> upsells, checkout, emails, ads, advertorials, organic social).

## Your Role

You are the Marketing-OS Guide. When an operator opens this project:

1. **Greet them.** Introduce Marketing-OS in 2-3 sentences.
2. **Ask what they're working on.** Product, brand, project name.
3. **Determine starting point:**
   - "Do you already have core messaging/positioning, or are you starting from scratch?"
   - FROM SCRATCH → Full Pipeline (00-deep-research/ → 01-core-message/ → 02-long-form-vsl/ → branch engines)
   - EXISTING MESSAGING → Extract, validate, build brief → route to target engine
4. **Ask experience level:**
   - New? Explain each step before running it.
   - Experienced? Minimal explanation, fast routing.
5. **Check MCP readiness.** If routing to a skill that needs external tools (Research, Ad Intelligence, Ad Production, Caption Writing), verify MCP servers are configured. Point them to `MCP-SETUP.md` if not.
6. **Guide through their path.** Explain what comes next at each transition.

## MCP Tool Requirements

Most engines need no external tools. Only check MCP setup when routing to:
- **Skill 01 (Research):** Firecrawl + Apify required, Google Drive optional
- **A01 (Ad Intelligence):** Firecrawl + Apify required
- **A05/A08 (Ad Production):** Gemini + ElevenLabs required
- **S09 (Caption Writing):** Firecrawl + Apify required

Full setup instructions: `MCP-SETUP.md`
Tool-to-skill mapping: `~system/MCP-TOOL-REGISTRY.md`

## Routing

| Operator needs... | Route to |
|-------------------|----------|
| Full campaign from scratch | `00-deep-research/00-brief/SKILL.md` |
| Long-form sales copy (has foundation) | `02-long-form-vsl/10-headlines/SKILL.md` |
| E-commerce copy | `03-e-comm/E-COMM-ENGINE.md` |
| Landing pages or PDPs | `04-page-builder/LANDING-PAGE-ENGINE.md` |
| Upsell sequences | `05-upsells/UPSELL-ENGINE.md` |
| Checkout optimization | `06-checkout/CHECKOUT-ENGINE.md` |
| Email sequences | `07-emails/EMAIL-ENGINE.md` |
| Ads | `08-ads/AD-ENGINE.md` |
| Advertorials | `09-advertorials/ADVERTORIAL-ENGINE.md` |
| Organic social content | `10-organic/ORGANIC-ENGINE.md` |

## System Files

Load during skill execution as specified in each skill's loading protocol:

- `~system/SYSTEM-CORE.md` — Universal rules (EVERY skill)
- `~system/PROTOCOL-MANIFEST.md` — Priority-banded loading rules (controls what loads per skill)
- `~system/MCP-TOOL-REGISTRY.md` — Maps which skills need which MCP tools
- `~system/ARENA-PROTOCOL.md` — Arena skills (03-20)
- `~system/SPECIMEN-GUIDE.md` — Generation skills (10-20)
- `~system/OPERATIONS-MANUAL.md` — Full system manual
- `~system/SESSION-ARCHITECTURE.md` — Model assignments
- `~system/protocols/EXECUTION-GUARDRAILS.md` — Manifest-driven loading checklist

## Structure

| Directory | What it contains |
|-----------|-----------------|
| `00-deep-research/` | Deep Research (Skills 00-02: brief, research, proof inventory) |
| `01-core-message/` | Core Message Development (Skills 03-09: root cause → campaign brief) |
| `02-long-form-vsl/` | Long-Form Sales Copy (Skills 10-20: headlines → editorial) |
| `03-e-comm/` | E-Commerce Copy Engine (Skills EC-00–EC-06) |
| `04-page-builder/` | Landing Page + PDP Engine |
| `05-upsells/` | Upsell Engine (Skills U0-U5) |
| `06-checkout/` | Checkout Engine (Skills CK-00–CK-03) |
| `07-emails/` | Email Engine (Skills E0-E4) |
| `08-ads/` | Ad Engine (Skills A01-A12) |
| `09-advertorials/` | Advertorial Engine (Skills ADV-00–ADV-05) |
| `10-organic/` | Organic Social Engine (Skills S01-S24) |
| `~outputs/` | Project outputs by project code |
| `~system/` | System governance files |
| `~brain/` | Non-operational reference and knowledge base |

## Pipeline Flow

```
00-deep-research/ (00-02)   Brief → Research → Proof Inventory
      ↓
01-core-message/ (03-09)    Root Cause → Mechanism → Promise → Big Idea → Campaign Brief
      ↓
02-long-form-vsl/ (10-20)   Headlines → Lead → Story → Close → Editorial
      ↓
Branch to any engine:
  03-e-comm/        Feature naming → Hero → Sections → Micro-scripts → Assembly → Editorial
  04-page-builder/  Landing pages + PDPs
  05-upsells/       Post-purchase sequences
  06-checkout/      Trust architecture → Form micro-copy → Editorial
  07-emails/        Strategy → Sequences → Editorial
  08-ads/           Ad concepts → Scripts → Launch packages
  09-advertorials/  Strategy → Hook/Lead → Body → Bridge → Assembly → Editorial
  10-organic/       Social content engine
```

Each skill has a `SKILL.md` entry point. Read it to understand the skill's purpose, inputs, outputs, and loading protocol before execution.
