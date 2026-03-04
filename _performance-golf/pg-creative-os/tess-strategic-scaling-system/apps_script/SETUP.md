# Asset Registry Webhook — Setup Guide

## Overview

This Google Apps Script receives ClickUp webhook events when a task moves to "delivered" or "closed/launched" in the Ad Delivery list, and automatically adds the asset(s) to the Asset Registry tab in the SSS spreadsheet.

## Setup Steps

### Step 1: Open Apps Script Editor

1. Open the SSS spreadsheet: https://docs.google.com/spreadsheets/d/1IXqv6PufQ49nryatxhY6UVgJqZ-x2qId251donUgd_U
2. Go to **Extensions > Apps Script**
3. Delete any existing code in `Code.gs`
4. Copy the entire contents of `RegistryWebhook.gs` and paste it into the editor
5. Save (Ctrl+S / Cmd+S)

### Step 2: Set Script Properties

1. In the Apps Script editor, click the **gear icon** (Project Settings) in the left sidebar
2. Scroll to **Script Properties** and click **Add script property**
3. Add:
   - Property: `CLICKUP_API_TOKEN` | Value: `pk_88456385_ILCQYKFVA5PZ9OMWYMVIPEKTHVUOUHP3`

### Step 3: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Set:
   - Description: "Asset Registry Webhook v1"
   - Execute as: **Me** (christopher@performancegolfzone.com)
   - Who has access: **Anyone**
4. Click **Deploy**
5. **Authorize** when prompted (review permissions, allow)
6. **Copy the Web app URL** — it looks like: `https://script.google.com/macros/s/AKfycb.../exec`
7. Go back to **Project Settings > Script Properties** and add:
   - Property: `WEBHOOK_URL` | Value: `[paste the URL you just copied]`

### Step 4: Register the ClickUp Webhook

1. In the Apps Script editor, click on `registerWebhook` in the function dropdown (top toolbar)
2. Click **Run**
3. Check the **Execution log** for "Webhook registered successfully!"

### Step 5: Test

1. In ClickUp, find a test task in the Ad Delivery list
2. Move it to "Closed/Launched" status
3. Wait ~5-10 seconds
4. Check the Asset Registry tab — new rows should appear
5. Check Apps Script **Executions** (left sidebar) for logs

## Troubleshooting

### Check existing webhooks
Run `listWebhooks()` from the Apps Script editor to see all registered webhooks.

### Delete a webhook
Run `deleteWebhook()` — it will use the saved webhook ID from Script Properties.

### Manual sync a single task
Edit `testSyncTask()` with the task ID you want to test, then run it.

### Webhook not firing
- Verify the webhook is registered: run `listWebhooks()`
- Check the Ad Delivery list ID matches: `901413749222`
- Ensure the task status matches exactly: "delivered" or "closed/launched"
- Check Apps Script **Executions** for error logs

### Duplicate rows
The script deduplicates by checking Column D (Asset ID) before writing. If duplicates appear, check for whitespace differences in asset IDs.

## Architecture

```
ClickUp Ad Delivery List
  │ task status → "closed/launched"
  ↓
ClickUp Webhook (taskStatusUpdated event)
  │ POST to Apps Script URL
  ↓
Google Apps Script (doPost)
  │ 1. Parse webhook payload
  │ 2. Check if status is "delivered" or "closed/launched"
  │ 3. Fetch full task from ClickUp API
  │ 4. Parse task name (offer-rootAngleId-vSTART[-vEND])
  │ 5. Expand variation ranges
  │ 6. Deduplicate against existing Column D
  ↓
Asset Registry Tab (append new rows)
```

## Files

| File | Purpose |
|------|---------|
| `RegistryWebhook.gs` | The Apps Script code (copy into Google Apps Script editor) |
| `SETUP.md` | This file |
| `../tess_micro_skills/ingestion/registry_sync.py` | Python fallback for bulk sync and next-ID lookups |
