# Plan: ClickUp Intake Form -> Asset Registry Auto-Sync with Auto-ID Generation

## Context

When someone submits the Ad Backlog Intake Form in ClickUp, a new task is created in the intake list. Currently, the submitter must manually look up the next available Asset ID from spreadsheets and type it into the form -- error-prone and slow. This automation will:
1. Detect new form submissions (tasks without valid Asset IDs)
2. Auto-generate the next available Asset ID by reading the Asset Registry
3. Update the ClickUp task name with the generated ID
4. Write the asset row to the Google Sheets Asset Registry tab

## Approach: Python Polling Script (launchd, every 2 min)

**Why polling over webhook**: Reuses existing `registry_sync.py` Python code directly (no porting to JavaScript), follows the established launchd pattern (Orion daily, Tess weekly), and is easy to debug. Form submissions are low-frequency (a few/day), so a 2-minute delay is acceptable. Upgrade path to real-time Apps Script webhook exists if needed later.

## Existing Code to Reuse

| Function / Class | File | What it does |
|---|---|---|
| `get_next_root_angle_id(offer)` | `registry_sync.py:534` | Reads Asset Registry, returns next 4-digit root angle ID |
| `get_next_variation_id(offer, root_angle_id)` | `registry_sync.py:571` | Returns next variation ID (e.g., "v0010") |
| `_build_sheets_creds()` | `registry_sync.py:74` | Google Sheets OAuth via MCP token |
| `RegistryRow` dataclass | `registry_sync.py:134` | 18-column row model (A-R) |
| `_write_rows()` | `registry_sync.py:438` | Appends rows to Asset Registry tab |
| `_read_existing_ids()` | `registry_sync.py:413` | Reads Column D for dedup |
| Custom field helpers | `registry_sync.py:473-526` | Extract text, dropdown, URL, users fields from tasks |

**All source files at**: `_performance-golf/pg-creative-os/tess-strategic-scaling-system/` (relative to repo root)

## ID Generation Logic

### Net New (Ad Category = "NN")
1. Read **Offer/Funnel** dropdown -> e.g., "dqfe"
2. Call `get_next_root_angle_id("dqfe")` -> e.g., "0037"
3. Variation is always `v0001` for new angles
4. Asset ID = `dqfe-0037-v0001`
5. Task name updated to `dqfe-0037-v0001`

### Expansion (Ad Category = "EXV", "EXH", etc.)
1. Read **"Ad ID for Expansion"** field -> e.g., "DQFE-0036-v0003"
2. Parse: offer = "dqfe", root_angle_id = "0036"
3. Call `get_next_variation_id("dqfe", "0036")` -> e.g., "v0010"
4. Asset ID = `dqfe-0036-v0010`
5. Task name updated to `dqfe-0036-v0010`

### Detection of Unprocessed Tasks
- Task name does NOT match `{offer}-{root_angle_id}-v{NNNN}` regex patterns
- Once processed, the task name IS the Asset ID (self-documenting)

## Form Fields (Confirmed Available)

| Field | Type | Used For |
|---|---|---|
| Offer/Funnel | Dropdown | Offer code for ID generation |
| Ad Category | Dropdown | Determines NN vs. expansion type (EXV, EXH, etc.) |
| Ad ID for Expansion | Text | Parent asset ID for expansions (e.g., "DQFE-0036-v0003") |
| Ad Root Angle Name | Text | Root angle name (Col F) |
| Ad Format | Dropdown | Media type (Col E) |
| Hypothesis | Text | Notes/Description (Col H) |
| Copywriter | People | Copywriter (Col I) |
| Script Doc (URL) | URL | Script Doc (Col K) |
| Ad Category | Dropdown | Ad Category (Col Q) |

## Implementation Phases

### Phase 1: Resolve Intake List ID + Validate Fields
- Use ClickUp API to resolve list ID from URL `8cn38j5-33374`
- Fetch the list's custom fields via API to confirm exact field names
- Verify "Ad ID for Expansion" field exists and get its field ID
- **Output**: Confirmed list ID + complete field name mapping

### Phase 2: Create `intake_id_generator.py`
**New file**: `tess_micro_skills/ingestion/intake_id_generator.py`

```
class IntakeIDGenerator:
    __init__(api_token, intake_list_id, dry_run)
    run() -> summary dict
    _fetch_unprocessed_tasks() -> list of tasks without valid Asset ID names
    _determine_id_type(task) -> "new" or "expansion" based on Ad Category
    _generate_asset_id(task) -> (offer, root_angle_id, variation_id, asset_id)
    _parse_expansion_parent(field_value) -> (offer, root_angle_id)
    _update_task_name(task_id, asset_id) -> PUT /task/{id}
    _write_registry_row(task, asset_id_parts) -> append to Asset Registry
```

Imports from `registry_sync`:
- `get_next_root_angle_id`, `get_next_variation_id`
- `_build_sheets_creds`, `RegistryRow`, `SPREADSHEET_ID`, `REGISTRY_TAB`
- Custom field extraction helpers

Includes:
- `--dry-run` flag for safe testing
- File lock (`/tmp/intake_id_generator.lock`) to prevent overlapping runs
- Logging with timestamps
- CLI: `python -m tess_micro_skills.ingestion.intake_id_generator [--dry-run]`

### Phase 3: Shell Wrapper + launchd Job
- `run-intake-id.sh` -- loads `.env`, runs script, logs output (pattern from `run-orion-daily.sh`)
- `com.performancegolf.intake-id.plist` -- `StartInterval: 120` (2 min), same PATH/env as existing plists
- Logs to `logs/intake-id-stdout.log` and `logs/intake-id-stderr.log`

### Phase 4: Test End-to-End
1. `--dry-run` against real intake list tasks
2. Single live test on a test task -- verify task name updates + registry row appears
3. Install launchd: `launchctl load ~/Library/LaunchAgents/com.performancegolf.intake-id.plist`
4. Submit a real form and watch it flow through within ~2 min

## Race Condition Handling
- File lock prevents overlapping script runs
- launchd ensures single instance
- The polling script is the ONLY writer for intake-generated IDs
- Existing `RegistryWebhook.gs` writes for delivered tasks (different lifecycle stage) -- no conflict

## Verification
1. `python intake_id_generator.py --dry-run` -- shows what would be generated without changing anything
2. Check Asset Registry tab for new row after live test
3. Check ClickUp task name was updated correctly
4. Monitor `logs/intake-id-*.log` for errors over first few days
5. Use Google Sheets MCP to read Asset Registry and confirm row data matches expectations

## Resume Prompt for Next Session
```
Resume Tess intake automation build. Read the plan at:
_performance-golf/pg-creative-os/tess-strategic-scaling-system/intake-automation/PLAN.md
Start at Phase 1: Resolve Intake List ID from ClickUp URL 8cn38j5-33374.
ClickUp form URL: https://performancegolf.clickup.com/forms/9014714949/f/8cn38j5-62614/NNYCH9IZES3FXZNI0T
Intake list URL: https://app.clickup.com/9014714949/v/l/8cn38j5-33374?pr=90144281236
Asset Registry: https://docs.google.com/spreadsheets/d/1IXqv6PufQ49nryatxhY6UVgJqZ-x2qId251donUgd_U/edit?gid=846884983
```
