# Tess Weekly Workflow SOP

> **Purpose**: Step-by-step guide for running the Tess pipeline each week.

---

## Operator Context

> **IMPORTANT:** Before starting the weekly workflow, Tess identifies who's running the pipeline.

### Tess Opens With:

> "Welcome to the **Strategic Scaling System**.
>
> I'm **Tess** — the intelligence within the Strategic Scaling System. We're currently operating **Version 3.0, the Black Merc EQS**.
>
> My purpose today is to accompany us to our desired destination: in-depth ad performance tracking, identifying what's working, and recommending what to test next. I learn, I adapt, and I'm here to help us find and scale winners faster.
>
> Who's in the driver's seat today?"

### Operator Modes:

| Operator | Mode | Behavior |
|----------|------|----------|
| **Christopher** (exact match only) | High-Knowledge | Move at pace, minimal explanations, focus on results |
| **Anyone else** (including "Chris") | Discovery | Calibrate with 1-5 questions, adapt depth accordingly |

> **NOTE:** Only "Christopher" triggers high-knowledge mode. Any other name requires calibration.

### Calibration for New Operators (1-5 Scale):

If anyone other than "Christopher" is running the pipeline, Tess asks:

1. "On a scale of 1 to 5, how familiar are you with the SSS?" (1=never heard of it, 5=use it regularly)
2. "On a scale of 1 to 5, how comfortable are you with our naming convention?" (1=what's that?, 5=I could write valid IDs from memory)
3. "What's your role on the team?" (Media buyer / Creative / Leadership)

**Depth scales with scores:**
- **1-2** → Full explanations, step-by-step guidance
- **3** → Guided walkthrough with checkpoints
- **4-5** → Refresher mode, focus on what's new

### Knowledge Persistence:

Tess remembers returning operators and their preferences:
- **Christopher** → Skip explanations, show results
- **Media buyers** → Emphasize classifications and scaling decisions
- **Creative team** → Emphasize asset type and talent performance
- **Leadership** → Emphasize ROI, automation, strategic recommendations

---

## Quick Start (TL;DR)

```bash
# 1. Export CSV from Domo (manual step)
# 2. Run pipeline:
cd "/Users/christopherogle/Documents/The Sauce Vault/_performance-golf/pg-creative-os/strategic-scaling-system"
python3 main.py /path/to/domo-export.csv --output sheets --skip-checkpoints
```

---

## Prerequisites

- [ ] Python 3.9+ installed
- [ ] Google Sheets MCP authenticated (OAuth token valid)
- [ ] Access to Domo (Viewer role)

---

## Weekly Process

### Step 1: Export Data from Domo

**When**: Every Monday (or your preferred day)

1. Log into Domo
2. Navigate to the ad performance dataset
3. Export as CSV with these columns:
   - `asset_id` (required)
   - `spend` (required)
   - `net_revenue` (required)
   - `trials` (optional)
   - `date` (optional - for daily granularity)
4. Save to: `~/Downloads/domo-export-YYYY-MM-DD.csv`

**Tip**: Use consistent naming for easy tracking.

---

### Step 2: Run the Pipeline

**Option A: Direct to Google Sheets (Recommended)**

```bash
cd "/Users/christopherogle/Documents/The Sauce Vault/_performance-golf/pg-creative-os/strategic-scaling-system"

python3 main.py ~/Downloads/domo-export-2026-01-27.csv --output sheets
```

**Option B: CSV Output Only**

```bash
python3 main.py ~/Downloads/domo-export-2026-01-27.csv --output csv
```

**Option C: Skip Checkpoints (Faster)**

```bash
python3 main.py ~/Downloads/domo-export-2026-01-27.csv --output sheets --skip-checkpoints
```

---

### Step 3: Review Outputs

**Google Sheets** (if using `--output sheets`):
- Open: https://docs.google.com/spreadsheets/d/1IXqv6PufQ49nryatxhY6UVgJqZ-x2qId251donUgd_U

**Sheets to Review**:

| Sheet | What to Check |
|-------|---------------|
| **Ad Level Tracking** | New rows added, classifications correct |
| **By Expansion Type** | Which expansion strategies winning |
| **By Asset Type** | Podcast vs Slice & Dice vs Tele/Ronin performance |
| **By Ad Category** | Net New vs Expansion vs Promo vs Evergreen |
| **By Funnel** | Performance by offer/funnel |

**Key Metrics**:
- **Winners**: ROAS >= 1.0 AND Spend >= $2,500
- **Potential**: ROAS >= 1.0 AND Spend < $2,500
- **Testing**: Spend < $2,500 (regardless of ROAS)
- **Underperformer**: ROAS < 1.0 AND Spend >= $2,500

---

### Step 4: Take Action

Based on the comparison views:

1. **Scale winners** - Increase budget on ROAS >= 1.0 assets
2. **Test potentials** - Give more spend to high-ROAS / low-spend assets
3. **Kill underperformers** - Pause assets with ROAS < 0.8 and Spend > $5,000
4. **Plan next tests** - Use winning patterns to inform new creative briefs

---

## CLI Reference

```
usage: main.py [-h] [--output {csv,sheets,auto}] [--spreadsheet-id ID]
               [--skip-checkpoints] [--verbose] csv_file

positional arguments:
  csv_file              Path to Domo CSV export

options:
  --output {csv,sheets,auto}
                        Output mode (default: csv)
  --spreadsheet-id ID   Target Google Spreadsheet ID
  --skip-checkpoints    Skip human approval checkpoints
  --verbose             Show detailed processing output
```

---

## Troubleshooting

### "Google Sheets API not available"

Re-authenticate:
```bash
rm ~/.config/mcp-google-sheets/token.json
# Restart Claude Code, it will prompt for OAuth
```

### "No data to process"

Check CSV has required columns: `asset_id`, `spend`, `net_revenue`

### Pipeline exits with errors

Check `sss_state.json` for error details:
```bash
cat sss_state.json | python3 -m json.tool
```

---

## Automation (Optional)

### Shell Script

Create `run-sss.sh`:

```bash
#!/bin/bash
# SSS Weekly Pipeline Runner

CSV_FILE="$1"
if [ -z "$CSV_FILE" ]; then
    echo "Usage: ./run-sss.sh /path/to/domo-export.csv"
    exit 1
fi

cd "/Users/christopherogle/Documents/The Sauce Vault/_performance-golf/pg-creative-os/strategic-scaling-system"
python3 main.py "$CSV_FILE" --output sheets --skip-checkpoints
```

Make executable:
```bash
chmod +x run-sss.sh
```

### Cron Job (if Domo API becomes available)

```bash
# Edit crontab
crontab -e

# Run every Monday at 9am
0 9 * * 1 /path/to/run-sss.sh /path/to/auto-exported.csv >> /var/log/sss.log 2>&1
```

**Note**: Currently requires manual Domo export (Viewer-only access). Automation is only possible once API access is granted.

---

## Version History

| Date | Change |
|------|--------|
| 2026-01-27 | Added Operator Context section with calibration questions |
| 2026-01-26 | Initial SOP created |
