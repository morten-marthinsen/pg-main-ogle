# Static Ad Delivery Automation

Automates the static image delivery process: generates PG naming convention filenames from ClickUp, renames downloaded NLC files, uploads to Iconik, and updates ClickUp — all in one command.

**Time savings:** ~45-60 min manual process → ~5 min automated.

---

## Quick Reference (Daily Use)

After one-time setup is complete, this is all you need:

```bash
# 1. Open Terminal and navigate to the script folder
cd ~/pg-main-ogle/_performance-golf/pg-creative-os/orion-chief-of-staff/_ops/static-delivery

# 2. Activate the virtual environment
source .venv/bin/activate

# 3. Run the pipeline (replace TASK_ID and path to your downloaded files)
python deliver.py --task TASK_ID --source ~/Downloads/YOUR_NLC_FOLDER/
```

That's it. The script handles naming, uploading to Iconik, and updating ClickUp.

---

## What This Does

This tool takes a ClickUp task ID for an approved static ad delivery, reads the task's custom fields (offer, angle, dimensions, editor, copywriter, country), generates properly formatted PG filenames using the 15-position naming convention, renames the downloaded NLC files to match, uploads them to the correct Iconik subcollection, writes the Iconik URL back to ClickUp, and moves the ticket to "Delivered."

---

## Your New Workflow

| Step | What You Do | Time |
|------|------------|------|
| 1 | Check ClickUp for approved static ad tasks | 1 min |
| 2 | Download the image zip from the NLC/Blackfish portal to your Downloads folder | 2-3 min |
| 3 | Open Terminal, run one command (see Quick Reference above) | 30 sec |
| 4 | Review the output — it shows every file renamed and uploaded | 1 min |
| 5 | Done. ClickUp is updated, Iconik has the files. | - |

---

## One-Time Setup

Follow these steps once on your computer. After setup, you only use the Quick Reference above.

### Step 1: Check Python

Open the **Terminal** app (on Mac: search "Terminal" in Spotlight).

Type this and press Enter:

```bash
python3 --version
```

You should see something like `Python 3.10.12` or higher. Any version 3.9+ works.

**If you get "command not found":** Download Python from https://www.python.org/downloads/ and install it. Then try the command again.

### Step 2: Get the Code

If you already have the `pg-main-ogle` repository on your computer, pull the latest:

```bash
cd ~/pg-main-ogle
git pull
```

If you don't have it yet, clone it:

```bash
cd ~
git clone https://github.com/christophero90/pg-main-ogle.git
```

Then navigate to the static delivery folder:

```bash
cd ~/pg-main-ogle/_performance-golf/pg-creative-os/orion-chief-of-staff/_ops/static-delivery
```

### Step 3: Create a Virtual Environment

A virtual environment is a private folder that holds the packages this tool needs, separate from the rest of your system. This keeps things clean.

```bash
python3 -m venv .venv
```

Then activate it:

```bash
source .venv/bin/activate
```

You'll see `(.venv)` appear at the start of your terminal prompt. This means the virtual environment is active.

**Windows users:** Use `.venv\Scripts\activate` instead.

### Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

You should see output like:

```
Successfully installed requests-2.31.0 pyyaml-6.0 python-dotenv-1.0.0
```

### Step 5: Set Up Credentials

Copy the template file to create your own credentials file:

```bash
cp env.template .env
```

Open `.env` in any text editor (TextEdit, VS Code, Notepad — anything works) and fill in each value:

| Variable | Where to Get It | What It Looks Like |
|----------|----------------|-------------------|
| `CLICKUP_API_TOKEN` | ClickUp → click your avatar (bottom-left) → Settings → Apps → API Token → copy your Personal Token | Starts with `pk_` followed by numbers and letters |
| `ICONIK_APP_ID` | Ask Christopher | A UUID like `23b3a9c0-0418-11f1-a783-063fe90e46a1` |
| `ICONIK_AUTH_TOKEN` | Ask Christopher | A long string starting with `eyJ...` |
| `ICONIK_METADATA_VIEW_ID` | Ask Christopher | A UUID |
| `NLC_PARENT_COLLECTION_ID` | Ask Christopher | A UUID like `dab6996a-6d74-11f0-97f0-1aa414ffab38` |

Save the file. **Do not share your .env file or commit it to git.**

### Step 6: Verify Setup

Run a quick test to make sure everything works:

```bash
python deliver.py --task 86b8qem80 --names-only
```

You should see a list of generated filenames. If you see an error, check the Troubleshooting section below.

---

## Running the Pipeline

### Preview Names Only

See what filenames the script will generate, without touching any files:

```bash
python deliver.py --task TASK_ID --names-only
```

### Dry Run (Preview Rename Mapping)

See which NLC files will be renamed to what, without actually renaming:

```bash
python deliver.py --task TASK_ID --source ~/Downloads/YOUR_NLC_FOLDER/ --dry-run
```

Review the mapping carefully before running the full pipeline.

### Full Pipeline

Rename files + upload to Iconik + update ClickUp:

```bash
python deliver.py --task TASK_ID --source ~/Downloads/YOUR_NLC_FOLDER/
```

### Rename Only (Skip Upload)

Rename files locally but don't upload to Iconik:

```bash
python deliver.py --task TASK_ID --source ~/Downloads/YOUR_NLC_FOLDER/ --skip-upload
```

### Using a Zip File

You can pass the zip file directly instead of extracting it first:

```bash
python deliver.py --task TASK_ID --source ~/Downloads/delivery.zip
```

The script will extract the zip automatically.

### Additional Options

| Flag | What It Does |
|------|-------------|
| `--date YYYYMMDD` | Override the delivery date (default: today) |
| `--skip-status` | Skip moving the ClickUp ticket to "Delivered" |
| `--skip-upload` | Rename files but don't upload to Iconik |
| `--dry-run` | Preview the rename mapping without changing anything |
| `--names-only` | Preview generated filenames without renaming or uploading |

---

## Where to Find the ClickUp Task ID

1. Open the approved static ad task in ClickUp
2. Look at the URL in your browser. It looks like: `https://app.clickup.com/t/86b8qem80`
3. The task ID is the part after `/t/` — in this example: `86b8qem80`
4. Alternatively: click the three dots (...) on the task → "Copy task ID"

---

## Understanding the Output

When you run the full pipeline, you'll see 6 phases:

```
[1/6] Fetching ClickUp task 86b8qem80...
      Shows task name, offer, angle, dimensions, and generated filenames.

[2/6] Building rename mapping...
      Shows each NLC file and what it will be renamed to.

[3/6] Renaming 35 files...
      Each renamed file shows "OK" with the new filename.

[4/6] Creating Iconik subcollection...
      Creates a folder in Iconik and shows the collection URL.

[5/6] Uploading 35 files to Iconik...
      Each uploaded file shows "OK" with the Iconik asset ID.
      If a file fails, it retries up to 3 times automatically.

[6/6] Writing Iconik URL back to ClickUp...
      Updates the "Final Assets" field and moves status to "Delivered."

DELIVERY COMPLETE
      Summary with total files uploaded and the Iconik collection URL.
```

---

## How the Naming Works

The script generates filenames using PG's 15-position naming convention:

```
sf2-i003-v0001-xx-1080x1350-xx-nn-xx-img-xxxx-nlc-cf-us-20260324.png
```

| Position | Field | Example | Source |
|----------|-------|---------|--------|
| 1 | Offer/Funnel | `sf2` | ClickUp task name |
| 2 | Root Angle ID | `i003` | ClickUp task name |
| 3 | Variation | `v0001` | NLC file (C1=v0001, C2=v0002, etc.) |
| 4 | Platform | `xx` | Always `xx` for images |
| 5 | Dimensions | `1080x1350` | NLC file + ClickUp "Ad Dimensions" |
| 6 | Length Tier | `xx` | Always `xx` for images |
| 7 | Ad Category | `nn` | ClickUp "Ad Category" field |
| 8 | Expansion Type | `xx` | ClickUp (or `xx` for Net New) |
| 9 | Asset Type | `img` | Always `img` for images |
| 10 | Talent Code | `xxxx` | Always `xxxx` for images |
| 11 | Editor Code | `nlc` | ClickUp assignee / team-codes.yaml |
| 12 | Copywriter Code | `cf` | ClickUp "Copywriter" field / team-codes.yaml |
| 13 | Country | `us` | ClickUp "Country Code" field |
| 14 | Delivery Date | `20260324` | Today's date (or --date override) |
| 15 | Promo Name | (optional) | Only for Promo category ads |

---

## Safe to Re-Run

The script is safe to run multiple times on the same task:

- **Already renamed files** are detected automatically — they won't be renamed again
- **Already uploaded files** are skipped in Iconik — duplicates are not created
- **ClickUp fields** are overwritten with the same URL — no harm done

If an upload fails partway through (internet issue, Iconik timeout), just run the same command again. It will pick up where it left off.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `CLICKUP_API_TOKEN not set in .env` | Make sure you created the `.env` file (Step 5) and it has your ClickUp token |
| `Task name doesn't match expected pattern` | The ClickUp task name must follow the format: `funnel-angleId-vStart-vEnd` (e.g., `sf2-i003-v0001-v0005`) |
| `No dimensions found in Ad Dimensions field` | The "Ad Dimensions" field in the ClickUp task is empty — fill it in first |
| `WARNING: X NLC files could not be matched` | Some NLC filenames don't match the expected pattern `C1 - 300x250 - v2 - JT - Agency - ID.png`. Check the file naming |
| `Iconik upload failed after 3 attempts` | Check your internet connection, then run the command again. Already-uploaded files will be skipped automatically |
| `python3: command not found` | Python is not installed. See Step 1 |
| `ModuleNotFoundError: No module named 'requests'` | You forgot to activate the virtual environment. Run: `source .venv/bin/activate` |
| `Failed to update ClickUp field` | The "Final Assets" custom field might be named differently. Copy the Iconik URL from the output and paste it manually |
| `Failed to update status` | The "Delivered" status might be named differently in this ClickUp space. Update it manually |

---

## Updating Team Codes

When a new editor or copywriter joins (or leaves), edit the `team-codes.yaml` file:

```yaml
copywriters:
  Chris Fleeks: cf
  New Person Name: np    # <-- add a line like this

editors:
  No Limit Creative (Agency): nlc
  New Editor Name: ne    # <-- add a line like this
```

The code matches ClickUp usernames/group names to these entries. The 2-3 letter code becomes part of the filename.

---

## Files in This Folder

| File | What It Does |
|------|-------------|
| `deliver.py` | Main script — the one you run |
| `name_generator.py` | Generates filenames from ClickUp data |
| `iconik_helper.py` | Handles Iconik uploads |
| `team-codes.yaml` | Editor and copywriter code lookup (editable) |
| `.env` | Your credentials (not shared, not in git) |
| `env.template` | Template for creating your `.env` file |
| `requirements.txt` | Python packages needed |
| `PLAN.md` | Architecture documentation |
