# Static Ad Delivery Automation Plan

## Context

Fatima recorded a Loom walkthrough of the full static ad delivery process — from approved ads in ClickUp through final delivery to the media team. The process is manual, repetitive, and error-prone (Iconik upload failures, naming convention copy-paste, QA by visual inspection). Goal: identify automation opportunities to compress this workflow.

**Roles clarified:**
- **Chris Fleeks** — briefing + approval of images within No Limit Creative platform (upstream)
- **Fatima** — all delivery steps after ClickUp ticket is approved (downstream)
- **Trigger model** — ClickUp status change to "Approved" should kick off automation

## Current Process (18 Steps, ~45-60 min per ad set)

| Step | Action | System | Automate? |
|------|--------|--------|-----------|
| 1 | Check ClickUp for approved static ads | ClickUp | YES — webhook trigger |
| 2 | Open No Limit Creative portal | NLC Portal | MANUAL (portal only) |
| 3 | Download all files (5 variants x 7 sizes = 35) | NLC Portal | MANUAL (portal only) |
| 4 | Download PSDs as zip | NLC Portal | MANUAL (portal only) |
| 5 | Open Naming Convention Generator | Google Sheets | YES — auto-generate |
| 6 | Cross-reference ClickUp fields for naming inputs | ClickUp + Sheets | YES — API read |
| 7 | Generate names (change variant #, dimension per file) | Google Sheets | YES — programmatic |
| 8 | Rename all 35+ downloaded files | Local filesystem | YES — batch rename |
| 9 | Open Iconik, navigate to NLC collection | Iconik DAM | YES — API |
| 10 | Create subcollection with Ad ID | Iconik DAM | YES — API |
| 11 | Upload 35 files + PSD zip | Iconik DAM | YES — API |
| 12 | QA uploads (check variants/sizes present) | Iconik DAM | YES — programmatic count verify |
| 13 | Re-upload failed files | Iconik DAM | YES — API retry logic |
| 14 | Copy Iconik collection link | Iconik DAM | YES — API returns URL |
| 15 | Paste Iconik link into ClickUp "Final Assets" | ClickUp | YES — API write |
| 16 | Update Creative Performance Sheet | Google Sheets | YES — API write |
| 17 | Move ticket to "Delivered" | ClickUp | YES — API status update |
| 18 | Media team gets pinged | ClickUp | Already auto |

**Of 18 steps, 14 can be automated. Steps 2-4 (NLC download) remain manual for now.**

## Existing Infrastructure

| System | Status | Reusable Code |
|--------|--------|---------------|
| ClickUp API | LIVE | `_ops/daily-briefing/modules/clickup_helper.py` — task reads, status filters, pagination |
| Google Sheets | LIVE | MCP integration + Tess native client. Naming Convention Sheet: `1bQTgH_nNef3eNCpheHOJjXpn09RM-x41MO5kM1vCDYo` |
| Naming Convention | DOCUMENTED | `tess-strategic-scaling-system/TESS-NAMING-CONVENTION.md` — 15-position format, all codes |
| Asset Registry | LIVE | `tess-strategic-scaling-system/apps_script/RegistryWebhook.gs` — ClickUp<->Registry sync |
| Iconik API | EXISTS (credentials available) | No code built yet — needs new module |
| NLC Portal | Portal only (no API) | Manual download; will ask NLC about API/webhook access |

## Recommended Automation Architecture

### Trigger: ClickUp Webhook

When a static ad ticket moves to "Approved" status in ClickUp:
1. ClickUp webhook fires (or polling job detects status change)
2. Automation pipeline begins

### Phase 1: Name Generation (automated)
- Read ClickUp task custom fields: platform, ad category, asset type, copywriter (Chris Fleeks = `cf`), editor (NLC = `nlc`), country, promo name
- Apply naming convention rules from `TESS-NAMING-CONVENTION.md`
- Generate all 35 filenames (5 variants x 7 dimensions)
- Output: mapping file (original NLC filename -> PG naming convention filename)

### Phase 2: Manual Download + Auto-Rename
- **Fatima downloads** files from NLC portal to a designated local folder (e.g., `~/Downloads/static-delivery/`)
- Script watches folder or Fatima triggers it after download
- Script auto-renames all files using the mapping from Phase 1
- Script renames PSD zip with Ad ID + "PSD" suffix

### Phase 3: Iconik Upload (automated)
- Create subcollection under `Performance Golf > Ad Agency > No Limit Creative > {Ad ID}`
- Upload all 35 renamed files + PSD zip via Iconik API
- Verify upload count (expected: 36 total = 35 images + 1 PSD zip)
- Retry any failed uploads automatically (addresses Fatima's #1 pain point)
- Return collection URL

### Phase 4: Close the Loop (automated)
- Write Iconik collection URL to ClickUp "Final Assets" custom field
- Write Ad ID + Iconik link + delivery date to Creative Performance Sheet
- Move ClickUp ticket to "Delivered" status
- Media team gets auto-pinged by ClickUp

### Fatima's New Workflow (Post-Automation)

| Step | Action | Time |
|------|--------|------|
| 1 | Get notification: "Ad set XYZ approved — names generated" | 0 min |
| 2 | Download files from NLC portal to delivery folder | 3-5 min |
| 3 | Trigger delivery script (or it auto-detects new files) | 1 min |
| 4 | Confirm: "36 files uploaded to Iconik, ClickUp updated, sheet updated" | 1 min |

**Total: ~5-7 min per ad set (down from 45-60 min)**

## Implementation Phases

### Build Phase 1: Iconik API Module
- Research Iconik API docs (collection CRUD, file upload, asset management)
- Build `iconik_helper.py` following the pattern of `clickup_helper.py`
- Test: create subcollection, upload a test file, verify, get URL

### Build Phase 2: Name Generator Script
- Parse naming convention rules into code
- Read ClickUp custom fields for a given task ID
- Generate filename mapping (original -> renamed)
- Test: run against a real approved ticket, verify names match what Fatima would produce

### Build Phase 3: Delivery Pipeline Script
- Orchestrate: watch folder -> rename -> upload -> update ClickUp -> update Sheets
- Add verification/QA step (count check, dimension check from filename)
- Add error handling + retry logic for Iconik uploads

### Build Phase 4: ClickUp Trigger
- Option A: ClickUp webhook (real-time, needs endpoint)
- Option B: Polling job (simpler, runs every N minutes, checks for newly approved tickets)
- Option C: Manual trigger (Fatima runs script with task ID after downloading)
- **Recommendation: Start with Option C (manual trigger), upgrade to B or A later**

## Key Files to Create/Modify

| File | Action |
|------|--------|
| `_ops/static-delivery/deliver.py` | NEW — main orchestration script |
| `_ops/static-delivery/iconik_helper.py` | NEW — Iconik API wrapper |
| `_ops/static-delivery/name_generator.py` | NEW — naming convention engine |
| `_ops/daily-briefing/modules/clickup_helper.py` | EXTEND — add custom field write + status update |
| Google Sheets (Creative Performance) | WRITE via existing MCP integration |

## Verification

1. **Unit test**: name generator produces correct 15-position names for known inputs
2. **Integration test**: upload a small batch (1 variant, 1 size) to Iconik test collection
3. **End-to-end test**: run full pipeline on one real approved ad set, verify:
   - Files renamed correctly
   - Iconik subcollection created with correct path
   - All 36 files uploaded (35 images + 1 PSD zip)
   - ClickUp "Final Assets" field populated
   - Creative Performance Sheet row updated
   - ClickUp status moved to "Delivered"
4. **Fatima validates**: compare automated output to her manual process for same ad set

## Pre-Build Requirements (Before Starting Implementation)

1. **Iconik API credentials** — need app ID + auth token + base URL
2. **Iconik collection ID** — the parent collection for "No Limit Creative"
3. **ClickUp custom field IDs** — for "Final Assets" field and the naming convention input fields
4. **Sample approved ticket** — a real ClickUp task ID to test against
5. **NLC file naming pattern** — what NLC names files by default (to build the rename mapping)

## Future Enhancements (Not in Scope Now)

- NLC API integration if/when they offer it
- In-house team delivery path (similar but skips NLC portal)
- Slack notification to Fatima when automation completes
- Dashboard view of delivery pipeline status
