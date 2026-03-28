# Intake Auto-ID Generator — Implementation Record

## What This Does

When someone submits the Ad Backlog Intake Form in ClickUp, a new task is created. This automation detects new tasks without valid Ad IDs, reads the correct Creative Performance (CP) spreadsheet to find the highest existing ID, generates the next sequential one, and updates the ClickUp task name.

## Architecture

Python polling script via launchd (every 2 min):
```
ClickUp Form → Task created → Script polls → Reads CP sheet → Generates next ID → Updates task name
```

## Data Source

**Creative Performance (CP) spreadsheets** (16 per-product sheets, read-only):
- Digital: PGB, DQFE1, DQFE, PGF, HTKT, OSSF, PG1, SSTS (+ WPSS shares DQFE sheet)
- Physical: 357, CLST, DF1, SF1, SF2, SPD, SSP, WDG1
- Products without CP sheets flagged for manual ID

**NOT the SSS Asset Registry** — CP sheets are the current source of truth. SSS consolidation is future work.

## Files

| File | Purpose |
|------|---------|
| `config.yaml` | Funnel-to-spreadsheet mapping (34 entries), ClickUp field names, tab names |
| `intake_id_generator.py` | Main script — `IntakeIDGenerator` class with CP reader + ClickUp client |
| `run-intake-id.sh` | Shell wrapper (loads .env, runs Python via Orion venv, logs) |
| `.env` | Symlink → `../../orion-chief-of-staff/_ops/daily-briefing/.env` |
| `logs/` | Runtime logs (gitignored) |
| `~/Library/LaunchAgents/com.performancegolf.intake-id.plist` | Launchd job (120s interval) |

## ClickUp Integration (Verified via API)

- **List**: Ad Backlog (`901413749270`) in Creative > Advertising
- **Form**: `https://performancegolf.clickup.com/forms/9014714949/f/8cn38j5-62614/NNYCH9IZES3FXZNI0T`

### Custom Fields Used

| Field | Type | Purpose |
|-------|------|---------|
| Product Funnel(s) | labels (multi-select) | Funnel code — UUID resolved to label (e.g., "OSSF (One Shot Slice Fix)" → `ossf`) |
| Ad Category | dropdown | NN, NNMU, EXV, EXH, PRM, EVG |
| Expansion AD ID | short_text | Parent ID for expansions (e.g., "ossf-0466 v0322") |
| Ad Format | dropdown | Video, Static, HTML5 |
| Full Ad ID | — | Does not exist as a custom field yet. Script updates task name instead. |

## ID Format

Positions 1-3 of the 15-position naming convention: `{funnel}-{root_angle_id}-v{variation}`

| Type | Root Angle Format | Example |
|------|------------------|---------|
| Video | 4-digit numeric | `sf2-0008-v0001` |
| Static | `i` + 3-digit | `sf2-i004-v0001` |
| HTML5 | `h` + 3-digit | `sf2-h002-v0001` |

## ID Generation Logic

**Net New** (Ad Category = NN/NNMU):
1. Parse funnel code from Product Funnel(s) label
2. Read CP sheet → find max root angle ID for that funnel + asset type
3. Increment → assign with `v0001`

**Expansion** (Ad Category = EXV/EXH/etc.):
1. Parse parent root angle from Expansion AD ID field
2. Read CP sheet → find max variation for that root angle
3. Increment variation number

## Already-Processed Detection

A task is skipped if:
- Full Ad ID field has a valid `{funnel}-{root_angle}-v{NNNN}` value, OR
- Task name starts with an ID pattern (handles periods, spaces, ranges)

## CLI

```bash
# Scan all CP sheets and report max IDs
python3 intake_id_generator.py --config config.yaml --test-sheets

# Dry run — show what would be assigned without writing
python3 intake_id_generator.py --config config.yaml --dry-run

# Process one task (live test)
python3 intake_id_generator.py --config config.yaml --limit 1

# Full run (what launchd executes)
python3 intake_id_generator.py --config config.yaml
```

## Test Results (2026-03-26)

- `--test-sheets`: All 16 CP sheets scanned. Max IDs correctly identified (SF2: 0007, OSSF: 0741, SSTS: 0765, etc.)
- `--dry-run`: 56 existing tasks in Ad Backlog, all 56 correctly detected as already-processed. 0 false positives.

## Dependencies

- Orion's `.venv` (Python 3.12 + requests, google-api-python-client, pyyaml)
- Orion's `.env` (CLICKUP_API_TOKEN, SHEETS_CREDENTIALS_PATH, SHEETS_TOKEN_PATH)
- Orion's `auth/` directory (sheets_token.json)

## CP Spreadsheet Write (Added S127 — 2026-03-26)

After assigning an ID, the script appends rows to the relevant CP spreadsheet's "Video Ads" (or "Static Image Ads" / "HTML5 Ads") tab to reserve the IDs immediately. This prevents race conditions where someone else could reuse the same root angle ID.

**Columns written:** A (Full Variation ID), B (Root Angle ID), C (Root Angle Name from form), D (Ad Category)

**Example:** For a 5-variation Net New submission:
| A | B | C | D |
|---|---|---|---|
| dqfe1-0014-v0001 | dqfe1-0014 | DQFE1 v3.0 RSF Trailer | NN |
| dqfe1-0014-v0002 | dqfe1-0014 | DQFE1 v3.0 RSF Trailer | NN |
| ... | ... | ... | ... |

**Sheets OAuth scope:** Upgraded from `spreadsheets.readonly` to `spreadsheets` (full read/write). Token re-authed 2026-03-26.

**Task naming:** Uses variation range format: `{funnel}-{root_angle}-v{first}-v{last}` (e.g., `dqfe1-0014-v0001-v0005`). Reads "Total # of Assets" field from ClickUp form to determine range.

## First Live Test (2026-03-26)

- **Ticket:** DQFE1 v3.0 RSF Trailer (Ad Backlog task `86b931zqp`)
- **ID assigned:** `dqfe1-0014-v0001-v0005`
- **CP sheet updated:** 5 rows appended to DQFE1 "Video Ads" tab
- **Result:** End-to-end success. Form → ClickUp task → Auto-ID → CP write.
- **Known gap:** Copywriter field not on the Ad Backlog form (Fatima to add).
- **Known gap:** "Full Ad ID" custom field doesn't exist on Ad Backlog list yet (non-blocking — ID goes in task name).

## What This Does NOT Do

- Does NOT write to SSS Asset Registry (future work)
- Does NOT change ClickUp task status
- Does NOT generate positions 4-15 of the naming convention
- Does NOT populate the Copywriter field (not on the form yet — Fatima adding)
