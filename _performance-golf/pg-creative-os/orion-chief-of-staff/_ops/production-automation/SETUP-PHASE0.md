# Phase 0: ClickUp Form + Native Automations

Setup instructions for the Production Calendar intake form and subtask automations.
These are all configured in the ClickUp web UI — no code required.

---

## Step 1: Create Form View on Production Calendar

1. Go to **Creative > Photo + Video Shoots > Production Calendar**
   - List ID: `901413170440`
2. Click **+ View** → **Form**
3. Name the form: **"New Shoot Intake"**

### Form Fields (use existing custom fields)

| Field | Type | Already Exists | Required | Notes |
|-------|------|---------------|----------|-------|
| Task Name | text | built-in | Yes | Will become shoot name. Instruct: use format `{PRODUCT} \| {Shoot Name}` e.g. "SF2 \| Brixton Product Demo" |
| Product Funnel(s) | labels | Yes (id: `ec01ece6`) | Yes | Multi-select with all funnel codes |
| Shoot Type | labels | Yes (id: `79454e90`) | Yes | Organic, VSL, Product, Live Event, Ads/Hooks, Influencer Ads |
| Due Date | date | built-in | Yes | This is the shoot date |
| Talent | labels | Yes (id: `65193af8`) | No | Multi-select with all talent codes |
| Location | location | Yes (id: `670d6c9d`) | No | |
| Script/Copy Doc (URL) | url | Yes (id: `85b59022`) | No | Link to scripts/planning doc |
| Shot List (URL) | url | Yes (id: `fefbe0ea`) | No | |
| Description | text area | built-in | No | For notes, multi-offer details, etc. |

### Fields NOT on the form (populated later)

- **Raw Footage (URL)** — Shawne adds after upload to Iconik
- **Edited/Final Asset(s) (URL)** — Added after editing
- **Google Doc/Sheet (URL)** — For shoot planning docs
- **Delivery Type** — Rarely used for shoots

## Step 2: Configure Form Settings

1. Set default status for new tasks: **"Open"**
2. Set default assignee: **JoJo Phillips** (primary shoot coordinator)
3. Enable "Show ClickUp branding" = OFF (if available on plan)
4. Copy the form URL and bookmark it for the team

## Step 3: Create ClickUp Automations (3 total)

Go to **Automations** tab on the Production Calendar list.

### Automation 1: Create "Upload + DIT" subtask
- **Trigger:** When task is created
- **Action:** Create subtask with name "Upload + DIT", assign to **Shawne Lozano**

### Automation 2: Create "Ingest" subtask
- **Trigger:** When task is created
- **Action:** Create subtask with name "Ingest", assign to **Jessi Casebeer**

### Automation 3: Create "Tag" subtask
- **Trigger:** When task is created
- **Action:** Create subtask with name "Tag", assign to **Jessi Casebeer**

> **Note:** ClickUp automations for subtask creation on "when task is created"
> may require the **Business** plan. If not available, subtasks can be created
> via a task template instead (Step 4 alternative).

## Step 4 (Alternative): Task Template with Subtasks

If ClickUp automations aren't available for subtask creation:

1. Create a new task in Production Calendar with the three subtasks manually
2. Save as template: **"Shoot Template"**
3. When creating from the form, apply the template after creation
4. Or: the Phase 1 `production_notifier.py` script can auto-create subtasks via API

## Step 5: Distribute Form URL

Share the bookmarkable form URL with:
- JoJo Phillips (primary)
- Shawne Lozano
- Jessi Casebeer
- Donnie French (for ad-hoc footage)

## Step 6: Backfill

JoJo should manually add any recent untracked shoots to the Production Calendar
(per meeting action item). Use the form for each one.

---

## Current List State (verified via API 2026-03-27)

**Statuses:** Open → backlog → ready → in progress → pre-production → production → blocked → upload + ingest + tag → Closed

**Existing Custom Fields (all already on the list):**
- Product Funnel(s) — 31 options
- Shoot Type — 6 options (Organic, VSL, Product, Live Event, Ads/Hooks, Influencer Ads)
- Talent — 47 talent options with codes
- Location — location type
- Raw Footage (URL) — url
- Edited/Final Asset(s) (URL) — url
- Google Doc/Sheet (URL) — url
- Script/Copy Doc (URL) — url
- Shot List (URL) — url
- Delivery Type — dropdown (30 options)
- Weekly Sprint — short_text

**Task count:** 22 existing tasks (as of 2026-03-27)
**Subtasks:** Current tasks have no subtasks — the old Liv automation is no longer active.
