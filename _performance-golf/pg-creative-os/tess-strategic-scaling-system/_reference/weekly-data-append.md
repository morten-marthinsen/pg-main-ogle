# Strategic Scaling System - Weekly Data Append Process

## Overview

This document describes the process for appending new weekly Domo data to the Strategic Scaling System (SSS) Google Spreadsheet. The system is designed to accumulate daily ad performance data over time, enabling longitudinal analysis of creative performance across 60, 90, 180+ day periods.

---

## Architecture

```
Layer 1: Raw_Daily_Data (Google Sheets tab)
    - One row per ad per day
    - Source of truth for all daily metrics
    - Grows over time as new data is appended

Layer 2: Aggregated_View (Google Sheets tab)
    - QUERY formula that summarizes Raw_Daily_Data
    - Automatically updates when raw data changes
    - Shows: Ad Name, Days Active, Total Spend, Total Net Revenue, Net ROAS

Layer 3: Ad Level Tracking (Google Sheets tab)
    - Strategic decision-making layer
    - Pulls from Aggregated_View
    - Includes manual inputs (Expansion Type, Asset Type, Notes, etc.)
```

---

## Weekly Append Process

### Step 1: Export New Data from Domo

1. Log into Domo
2. Export the ad performance data for the new time period
3. Save the CSV file to: `Documents/The Sauce Vault/_Performance Golf/PG - Scaling Acquisition/Strategic Scaling System/DOMO Ad Performance CSVs/`
4. Use naming convention: `Ad Performance MM-DD-YYYY-MM-DD-YYYY.csv`

### Step 2: Run the Append Script

Run the following Python script to process the new CSV and identify new rows to append:

```python
import pandas as pd
from datetime import datetime

# === CONFIGURATION ===
# Update these paths for each weekly run
NEW_CSV_PATH = "/path/to/new/domo/export.csv"
EXISTING_DATA_PATH = "/path/to/exported/Raw_Daily_Data.csv"  # Export from Google Sheets first
OUTPUT_PATH = "/path/to/New_Rows_To_Append.csv"

# === LOAD DATA ===
print("Loading new CSV...")
new_df = pd.read_csv(NEW_CSV_PATH)

print("Loading existing data...")
existing_df = pd.read_csv(EXISTING_DATA_PATH)

# === STANDARDIZE COLUMN NAMES ===
# The Domo export may have <BR> in column names (line breaks)
new_df.columns = [col.replace('<BR>', ' ').replace('\n', ' ').strip() for col in new_df.columns]
existing_df.columns = [col.replace('<BR>', ' ').replace('\n', ' ').strip() for col in existing_df.columns]

# === IDENTIFY THE KEY COLUMNS ===
ad_col = 'Ad'  # Column containing ad name
date_col = 'Day'  # Column containing date

# === CREATE COMPOSITE KEY ===
# Unique identifier = Ad Name + Date
new_df['_key'] = new_df[ad_col].astype(str) + '|' + new_df[date_col].astype(str)
existing_df['_key'] = existing_df[ad_col].astype(str) + '|' + existing_df[date_col].astype(str)

# === FIND NEW ROWS (not in existing data) ===
existing_keys = set(existing_df['_key'].values)
new_rows_mask = ~new_df['_key'].isin(existing_keys)
new_rows_df = new_df[new_rows_mask].copy()

# === REMOVE THE HELPER KEY COLUMN ===
new_rows_df = new_rows_df.drop(columns=['_key'])

# === REPORT RESULTS ===
print(f"\n=== APPEND SUMMARY ===")
print(f"New CSV total rows: {len(new_df)}")
print(f"Existing data rows: {len(existing_df)}")
print(f"New rows to append: {len(new_rows_df)}")
print(f"Duplicate rows skipped: {len(new_df) - len(new_rows_df)}")

if len(new_rows_df) > 0:
    # === SAVE NEW ROWS TO CSV ===
    new_rows_df.to_csv(OUTPUT_PATH, index=False)
    print(f"\nNew rows saved to: {OUTPUT_PATH}")

    # === SHOW SAMPLE OF NEW DATA ===
    print(f"\nDate range of new data:")
    print(f"  From: {new_rows_df[date_col].min()}")
    print(f"  To: {new_rows_df[date_col].max()}")

    print(f"\nUnique ads in new data: {new_rows_df[ad_col].nunique()}")
else:
    print("\nNo new rows to append - all data already exists.")
```

### Step 3: Import New Rows to Google Sheets

1. Open the SSS Google Spreadsheet
2. Go to the `Raw_Daily_Data` tab
3. File > Import
4. Select the `New_Rows_To_Append.csv` file
5. Choose **"Append to current sheet"** as the import location
6. Click "Import data"

### Step 4: Verify the Import

1. Check that the `Aggregated_View` tab has updated automatically
2. Verify row counts increased appropriately
3. Spot-check a few ads to ensure data looks correct

---

## Handling Edge Cases

### Overlapping Date Ranges

If your Domo exports overlap (e.g., Jan 1-21, then Jan 15-28), the append script automatically handles this by:
- Creating a unique key from Ad Name + Date
- Only appending rows where that combination doesn't already exist
- Duplicate rows are skipped, not duplicated

### Non-Standard Ad Names

The following ad types are excluded from the Aggregated_View (but kept in Raw_Daily_Data):
- `pmax` (Performance Max campaigns)
- `microsoft ads` (Bing)
- `search ad`
- `shopping ad`

These are platform-level aggregates, not creative-level data.

### Missing Data

If an ad has no data for certain days (e.g., it was paused), those days simply won't have rows. The "Days Active" count in Aggregated_View reflects only days with actual data.

---

## Google Sheets Row Limits

**Current Capacity:**
- Google Sheets limit: ~10 million cells per spreadsheet
- Raw_Daily_Data has ~32 columns
- Maximum rows: ~312,500 rows
- At ~2,000 new rows/week: ~3 years of capacity

**When Approaching Limits:**
1. Archive older data to a separate spreadsheet
2. Or migrate to Domo API integration (planned future enhancement)

---

## Troubleshooting

### "Column not found" Error
The Domo export may have different column names. Check the actual column names in your CSV and update the script's `ad_col` and `date_col` variables.

### Import Creates New Sheet Instead of Appending
Make sure to select "Append to current sheet" in the import dialog, not "Insert new sheet(s)".

### Aggregated_View Shows Error
If the QUERY formula breaks, it's likely due to:
1. Column letters shifting (if columns were added/removed from Raw_Daily_Data)
2. Data type issues in a column

---

## Future Enhancements

1. **Domo API Integration** - Automate the entire process
2. **Net Loss Per Trial** - Add weighted average NLPT calculation (pending methodology confirmation)
3. **Automated Alerts** - Notify when ads hit performance thresholds

---

## File Locations

| File | Location |
|------|----------|
| SSS Spreadsheet | [Google Sheets Link](https://docs.google.com/spreadsheets/d/1IXqv6PufQ49nryatxhY6UVgJqZ-x2qId251donUgd_U/edit) |
| Domo CSV Exports | `Documents/The Sauce Vault/_Performance Golf/PG - Scaling Acquisition/Strategic Scaling System/DOMO Ad Performance CSVs/` |
| This Documentation | `Documents/The Sauce Vault/_Performance Golf/PG - Scaling Acquisition/Strategic Scaling System/Weekly_Data_Append_Process.md` |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-01-21 | Initial documentation created |
| 2026-01-21 | Imported first dataset (Jan 1-21, 2026): 14,885 daily rows |

