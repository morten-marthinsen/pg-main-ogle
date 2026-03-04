# Veda — Creative Ops Workflow Integration

> **Document Version**: 1.0
> **Last Updated**: 2026-02-04
> **Purpose**: Mapping current creative operations workflow, where Veda fits, and proposed improvements
> **Audience**: Christopher Ogle, Liv (Creative Ops)

---

## 1. Current Workflow (How Things Work Today)

### 1.1 Weekly Cadence

| When | What | Who |
|------|------|-----|
| **Monday** | Review Domo data, identify expansion opportunities | Christopher |
| **Monday** | Meet with copywriter Chris for digital product ideas | Christopher + Chris H |
| **Monday** | Prioritize ClickUp backlog, assign tasks to editors | Liv / Creative Ops |
| **During week** | Create tickets in shared Google Doc (physical = Christopher, digital = Chris H) | Christopher, Chris H |
| **Friday** | All tickets due for submission | Everyone |
| **After Friday** | Convert tickets → ClickUp tasks with Root Angle Name + Script ID | Liv / Creative Ops |
| **Weekly call** | Media buying team shares performance insights | Team |

### 1.2 Ad Ticket Format (Current)

Tickets live in a shared Google Doc (currently Q1 Ad Requests, ID: `1yEzyga9KDyzUBSoQTNCTMg9GSjWCQJF2vXlKxUMgLHw`):

```
(STATUS SYMBOL) (FUNNEL CODE) (SCRIPT ID) (VARIATION RANGE)
Ad Title / Description (Angle): [Root Angle Name]
Copywriter: [Name]
Aspect Ratio: [e.g., 9x16 (FB)]
Ad Format: [e.g., B-Roll + VO, Slice & Dice, AIVO, Podcast, etc.]
Talent/Guru/Actor Name: [Name]
Other general notes/instructions: [Free text]
```

### 1.3 ClickUp Status Workflow

```
BACKLOG → READY → IN PROGRESS → IN REVIEW → IN REVISION → FINAL REVIEW → APPROVED → DELIVERED → CLOSED/LAUNCHED
```

| Status | Description | Who Acts |
|--------|-------------|----------|
| BACKLOG | Task created by Creative Ops, not yet prioritized | Creative Ops |
| READY | Prioritized on Monday, assigned to editors | Creative Ops |
| IN PROGRESS | Editor working (pulls source from Iconik, edits) | Editor |
| IN REVIEW | Lead editor or copywriter technical review | Lead Editor / Copywriter |
| IN REVISION | Feedback given, editor revises | Editor |
| FINAL REVIEW | Copywriter or lead editor final check | Copywriter / Lead |
| APPROVED | Asset approved for delivery | Reviewer |
| DELIVERED | Handed to media buying team | Creative Ops |
| CLOSED/LAUNCHED | Ad is live | Media Buying |

### 1.4 Asset ID Generation (Current)

After editing is complete, editors:
1. Finish editing and upload to Iconik (editor-specific folder)
2. Use the Ad ID Generator spreadsheet to manually construct 14-position Asset IDs
3. Paste each Asset ID as the title of the asset in Iconik

### 1.5 Iconik Folder Structure

```
Performance Golf/
└── z_EDITORS/
    └── Ad Editing Team/
        └── (EDITOR NAME)/
            └── (PHYSICAL or DIGITAL)/
                └── (OFFER NAME)/
                    └── (SCRIPT ID)/
                        └── assets divided by dimension (9x16, 16x9, etc.)
```

---

## 2. Where Veda Fits (v1)

### 2.1 What Veda Does

Veda is an automated editor. It receives creative direction, performs the edit, generates Asset IDs, and uploads to Iconik. Think of it as adding a new team member to the editing roster — one that never makes naming convention errors and can work around the clock.

**Veda v1 capabilities:**
- Receives direction from Christopher or the team (same as any editor)
- Fetches source assets from Iconik
- Performs assembly edits (FFmpeg: hook stacks, duration trims, scroll stopper replacements)
- Generates 15-position Asset IDs programmatically — 100% naming convention compliant
- Uploads finished assets to its own Iconik editor folder with correct metadata
- Updates SSS spreadsheet (Ad Level Tracking) after an asset is launched

### 2.2 What Veda Does NOT Do (v1)

- Does NOT create or manage ClickUp tasks — that stays with Creative Ops
- Does NOT create Google Doc tickets — uses the existing shared doc
- Does NOT assign Root Angle Names — only humans can
- Does NOT autonomously decide what to create — always human-directed
- Does NOT delete assets from Iconik

### 2.3 What Changes for Creative Ops

| Current (Human Editors) | With Veda |
|------------------------|-----------|
| Editor manually constructs Asset IDs via generator spreadsheet | Veda generates IDs programmatically — eliminates typos, wrong codes, wrong variation numbers |
| Editor uploads to their personal Iconik folder | Veda uploads to its own folder (same structure as human editors) |
| Editor tracks variation numbers across Creative Performance sheets | Veda queries SSS spreadsheet directly for next available variation |
| ClickUp task created and managed by Creative Ops | Same — Creative Ops still manages ClickUp tasks for Veda's work |
| Review via ClickUp status workflow | Same — no change to review process |

### 2.4 Veda's Iconik Folder

```
Performance Golf/
└── z_EDITORS/
    └── Ad Editing Team/
        └── Veda/
            ├── PHYSICAL/
            │   └── (OFFER NAME)/
            │       └── (SCRIPT ID)/
            │           ├── 9x16/
            │           └── 16x9/
            └── DIGITAL/
                └── (OFFER NAME)/
                    └── (SCRIPT ID)/
                        ├── 9x16/
                        └── 16x9/
```

---

## 3. Addressing Creative Performance Spreadsheet Redundancy

### 3.1 Liv's Question

> "The only questions I still have revolve around the CP spreadsheets and what information is needed in those — since the info is in the script doc and CU, I'd love to not triplicate it in the CP spreadsheets."

### 3.2 Analysis: What's in the CP Spreadsheets Today

| Data | Also in Script Doc? | Also in ClickUp? | Also in SSS? |
|------|---------------------|-------------------|---------------|
| **Variation numbers per Script ID** | Partially (variation range in ticket) | Partially (task title) | Yes (Ad Level Tracking) — but only for LAUNCHED assets |
| **Asset performance data** | No | No | Yes (Domo imports) |
| **Editor assignments** | No | Yes (assignee) | No |
| **Creative notes/instructions** | Yes (ticket text) | Yes (description) | No |
| **Ad format/type** | Yes (ticket) | Yes (custom field) | Yes (parsed from Asset ID) |
| **Root Angle Name** | Yes (ticket angle) | Yes (custom field) | Yes (Column C) |

### 3.3 The Verdict

**CP spreadsheets have ONE unique function**: tracking which variation numbers are assigned per Script ID, including in-progress assets that haven't launched yet.

Everything else is duplicated:
- Performance data → SSS spreadsheet (better source, Domo-imported)
- Creative notes → Script Doc + ClickUp
- Editor assignments → ClickUp
- Ad format/type → Script Doc + ClickUp + SSS

### 3.4 Why CP Sheets Still Exist

The SSS spreadsheet only tracks LAUNCHED assets. If an editor is working on v0033, v0034, and v0035 right now but none have launched, those variation numbers exist in CP but NOT in SSS. Without CP, Veda (or a new human editor) could accidentally assign v0033 again — a collision.

### 3.5 The Path to Eliminating CP Spreadsheets

**Proposed solution**: Consolidate variation number tracking into the SSS spreadsheet.

Two approaches to discuss:

**Option A — Status column in Ad Level Tracking:**
Add a "Status" column to SSS's Ad Level Tracking tab. Assets get a row when a variation number is RESERVED (not just when launched). Status values: `Reserved` → `In Progress` → `Launched`. This way SSS has ALL variations — reserved, in-progress, and launched — and CP sheets become fully redundant.

**Option B — Query ClickUp as secondary source:**
Keep SSS for launched assets. Use ClickUp task queries to catch in-progress variations (ClickUp tasks contain Asset IDs in titles). Veda checks both SSS + ClickUp before assigning a new variation number.

**Recommendation**: Option A is cleaner — one source of truth. Option B works but adds a ClickUp API dependency.

### 3.6 Transition Plan

1. **Now**: CP spreadsheets remain active. Veda queries SSS + CP for variation numbers.
2. **After alignment**: Add Reserved/In Progress status tracking to SSS.
3. **Validation period**: Run both systems in parallel, verify SSS catches everything CP has.
4. **Retire CP sheets**: Once validated, CP spreadsheets become read-only archives.

---

## 4. Variation Number Consolidation — Technical Details

### 4.1 Proposed Structure: Single Tab in SSS

**Why single tab (not per-offer):**
- Veda queries programmatically — it filters by `Funnel + ScriptID` regardless of how many rows exist
- Humans use Sheets filter views to see one offer at a time (same visual experience as separate tabs)
- Single tab = single source of truth, no risk of misplacing an asset in the wrong tab
- Cross-offer queries stay simple (total assets, total variations, etc.)

**For Liv/Creative Ops**: Create saved filter views per offer (e.g., "357 Only", "DQFE Only") so the visual experience of browsing one offer at a time is preserved.

### 4.2 How Veda Finds Next Available Variation

```
1. Read all rows from Ad Level Tracking where Asset ID starts with "[Funnel]-[ScriptID]-v"
2. Extract variation numbers from each matching row
3. Find the MAX variation number
4. Increment: next available = MAX + 1
5. Reserve the number(s) before starting work
```

This takes milliseconds via the Sheets API. Works identically whether there are 100 rows or 10,000.

### 4.3 How Human Editors Would Use It

No change to their workflow. They either:
- Use the existing Ad ID Generator spreadsheet (which could be updated to pull variation numbers from SSS)
- Ask Veda to generate Asset IDs for them (Veda generates the ID, human does the edit)
- Check the SSS filter view for their offer to see what variation numbers are taken

---

## 5. Asset ID Generator — Evolution Options

### 5.1 Current State

Human editors use the Ad ID Generator spreadsheet (ID: `1bQTgH_nNef3eNCpheHOJjXpn09RM-x41MO5kM1vCDYo`) to manually construct 14-position Asset IDs after editing. This works but introduces human error risk — wrong codes, typos, wrong variation numbers.

### 5.2 Options

| Option | Description | Effort | Risk Reduction |
|--------|-------------|--------|---------------|
| **A: Update generator source** | Generator pulls variation numbers from consolidated SSS instead of CP sheets | Low | Medium — still free-text entry for codes |
| **B: Validation tool** | Build a lightweight Sheets add-on with dropdowns for each position — no free-text entry | Medium | High — eliminates typos and wrong codes |
| **C: Veda generates for humans** | Human edits the video, asks Veda to generate the Asset ID. Veda ensures 100% compliance. | Low | Highest — Veda's naming logic is automated |

**Recommendation**: Start with Option C (zero effort, immediate benefit). Option B is the long-term ideal for editors who don't use Veda.

---

## 6. ClickUp Brain Integration Opportunities

ClickUp Brain is already in use by Creative Ops. Potential integration points:

| Opportunity | Description | Impact |
|-------------|-------------|--------|
| **Auto-create tasks from tickets** | Brain reads Google Doc ticket submissions, creates ClickUp tasks automatically | Eliminates manual ticket → task conversion |
| **Auto-assign by priority** | Brain assigns tasks to editors based on current workload and priority | Faster assignment, better load balancing |
| **Root Angle suggestion** | Brain suggests Root Angle Name from task descriptions | Faster naming, fewer omissions |
| **Status automation** | Rules-based status transitions (e.g., auto-move to DELIVERED when all assets approved) | Reduces manual status management |
| **Naming convention validation** | Brain flags tasks where Asset ID doesn't match naming convention | Catches errors before media buying |

These are independent of Veda — they improve Creative Ops workflow regardless of whether Veda is involved.

---

## 7. Visual Workflow Map

### Current Workflow

```
Christopher/Chris H          Creative Ops (Liv)           Editors              Media Buying
      |                           |                          |                     |
 Review Domo data                 |                          |                     |
      |                           |                          |                     |
 Decide expansions                |                          |                     |
      |                           |                          |                     |
 Write tickets in                 |                          |                     |
 shared Google Doc                |                          |                     |
      |                           |                          |                     |
      └──── Tickets Due ─────────▶ Convert to ClickUp tasks  |                     |
                                  |                          |                     |
                                  Assign Root Angle + ID     |                     |
                                  |                          |                     |
                                  Prioritize + Assign ──────▶ Edit in Iconik       |
                                  |                          |                     |
                                  |                          Generate Asset IDs    |
                                  |                          (Ad ID Generator)     |
                                  |                          |                     |
                                  |                          Upload to Iconik      |
                                  |                          |                     |
                                  IN REVIEW ◄────────────────┘                     |
                                  |                                                |
                                  APPROVED                                         |
                                  |                                                |
                                  DELIVERED ──────────────────────────────────────▶ Launch
                                  |                                                |
                                  Update tracking                                  |
```

### With Veda (v1)

```
Christopher/Chris H          Creative Ops (Liv)           Veda                 Editors           Media Buying
      |                           |                          |                     |                  |
 Review Domo data                 |                          |                     |                  |
      |                           |                          |                     |                  |
 Strategic Planning               |                          |                     |                  |
 Mode with Veda ────────────────────────────────────────────▶ Analyze insights     |                  |
      |                           |                          |                     |                  |
 Align on tickets                 |                          |                     |                  |
      |                           |                          |                     |                  |
      └──── Direction ───────────────────────────────────────▶ Execute:            |                  |
                                  |                          ├─ Fetch source       |                  |
                                  |                          ├─ Edit (FFmpeg)      |                  |
                                  |                          ├─ Generate Asset IDs |                  |
                                  |                          ├─ Upload to Iconik   |                  |
                                  |                          └─ Notify human       |                  |
                                  |                          |                     |                  |
                                  Create ClickUp task ◄──────┘                     |                  |
                                  |                                                |                  |
                                  IN REVIEW ──────────────────────────────────────▶ (if needed)      |
                                  |                                                |                  |
                                  APPROVED                                         |                  |
                                  |                                                |                  |
                                  DELIVERED ────────────────────────────────────────────────────────▶ Launch
                                  |                                                                   |
                                  Veda updates SSS ◄──────────────────────────────────────────────────┘
```

**Key differences:**
- Veda replaces the editor for applicable tasks (assembly expansions)
- Asset ID generation is automated (no Ad ID Generator needed)
- Human editors still handle tasks that require creative judgment beyond Veda's v1 capabilities
- Creative Ops workflow is unchanged — ClickUp, review, delivery all stay the same

---

## 8. Discussion Items for Call

1. **CP Spreadsheet retirement plan** — Is the proposed consolidation into SSS (Section 3) acceptable? What other data in CP sheets would be missed?
2. **Variation number transition** — During the overlap period, which source takes priority if SSS and CP disagree?
3. **ClickUp Brain priorities** — Which integration (Section 6) would save the most time for Creative Ops?
4. **Veda Asset ID generation for human editors** — Would editors use Option C (ask Veda to generate IDs for them)?
5. **Review process for Veda's output** — Should Veda's assets follow the same IN REVIEW → FINAL REVIEW path, or a simplified path since they're programmatically generated?

---

*Document prepared for Christopher Ogle and Liv — Creative Ops workflow alignment call, February 2026.*
