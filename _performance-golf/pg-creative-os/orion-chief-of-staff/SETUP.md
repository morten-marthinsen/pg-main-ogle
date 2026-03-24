# Setting Up Your Personal Daily Briefing System

This guide walks you through setting up your own daily briefing pipeline and personal Slack bot. The system gives you:

- A daily executive briefing generated automatically each morning
- A Slack bot in your DMs for task management (create, complete, reschedule, query)
- Message shortcuts to capture tasks and context from any Slack message
- Hourly check-ins and pre-call nudges (optional)
- Triage intelligence that learns your patterns over time

**Time required:** ~30 minutes for core setup. Optional modules add 5-10 minutes each.

**Works on:** macOS (with launchd auto-start), Linux, Windows (manual start). No AI coding tool required.

---

## Overview

The system has two main components:

```
daily-briefing/          ← Pipeline: generates your daily report (19 available modules)
orion-personal-bot/      ← Slack bot: DM-based task management + report refresh
```

The bot depends on the pipeline (reads/writes its KB files, calls `quick_refresh.py`). Set up the pipeline first, then the bot.

---

## Step 1: Prerequisites

- **Python 3.9+** — check with `python3 --version`
- **Git** — the repo must be cloned locally
- **Slack workspace** — you need permission to create apps
- **Anthropic API key** — get one at [console.anthropic.com](https://console.anthropic.com/)

---

## Step 2: Set Up the Daily Briefing Pipeline

### 2a. Create Python environment

```bash
cd _ops/daily-briefing
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 2b. Create your config

```bash
cp config.template.yaml config.yaml
```

Open `config.yaml` and fill in values marked `[SETUP]`:
- **`display_timezone`** — your local timezone (e.g., `"US/Pacific"`, `"Europe/London"`)
- **Module toggles** — set `enabled: true` for modules you want (start with core modules, add others after OAuth setup)
- **`scorecard_keywords`** — keywords relevant to your role for triage intelligence

### 2c. Create your .env

```bash
cp env.template .env
```

Fill in at minimum:
- `ANTHROPIC_API_KEY` — required for all AI-powered modules

Other keys depend on which modules you enable (see Step 5).

### 2d. Initialize empty KB files

```bash
echo '{"action_items": []}' > .kb-manual-items.json
echo '{}' > .kb-schedule.json
echo '{"priorities": {}}' > .kb-priorities.json
echo '{"approvals": []}' > .kb-approvals.json
echo '{"registry": []}' > .kb-completed-registry.json
echo '{"history": []}' > .kb-triage-history.json
```

### 2e. Test the pipeline

```bash
source .venv/bin/activate
python3 daily_briefing.py
```

Your first report appears in `../daily-reports/`. If modules fail because OAuth isn't set up yet, that's expected — they'll show a "setup required" message and skip.

---

## Step 3: Set Up Google APIs (Optional — for Calendar, Gmail, Sheets, Docs modules)

Each person needs their own Google Cloud project. This is a one-time setup.

### 3a. Create a GCP project

1. Go to [console.cloud.google.com](https://console.cloud.google.com/)
2. Create a new project (e.g., "My Daily Briefing")
3. Enable these APIs (APIs & Services > Library):
   - **Gmail API** — for M2 (industry intel) and M6 (newsletter digest)
   - **Google Calendar API** — for M12 (daily schedule)
   - **Google Sheets API** — for CLM sync module
   - **Google Docs API** — for docs integration
4. Only enable the APIs you plan to use.

### 3b. Create OAuth credentials

1. APIs & Services > Credentials > Create Credentials > **OAuth client ID**
2. Application type: **Desktop app**
3. Download the JSON file
4. Save it as `auth/credentials.json` in the `daily-briefing/` directory:

```bash
mkdir -p auth
# Move your downloaded file:
mv ~/Downloads/client_secret_*.json auth/credentials.json
```

### 3c. Run the auth scripts

Each script opens a browser for you to authorize. Run only the ones you need:

```bash
source .venv/bin/activate

# Gmail (for M2 industry intel, M6 newsletter digest)
python3 setup/gmail_auth.py

# Google Calendar (for M12 daily schedule)
python3 setup/calendar_auth.py

# Google Sheets (for CLM sync)
python3 setup/sheets_auth.py

# Google Docs (for docs integration)
python3 setup/docs_auth.py
```

Each script saves a token to `auth/` and runs a quick verification.

### 3d. Enable the modules

After auth succeeds, edit `config.yaml` and set `enabled: true` for the corresponding modules.

---

## Step 4: Set Up the Personal Slack Bot

### 4a. Create a Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps) > **Create New App** > **From scratch**
2. Name it anything you want (this becomes your bot's name — e.g., "Atlas", "Compass", "Jarvis")
3. Select your workspace

### 4b. Enable Socket Mode

1. Settings > **Socket Mode** > toggle ON
2. Generate an **App-Level Token** with `connections:write` scope
3. Save the token (`xapp-...`) — this is your `SLACK_APP_TOKEN`

### 4c. Set Bot Token Scopes

OAuth & Permissions > Bot Token Scopes:
- `chat:write`
- `im:history`
- `im:read`
- `im:write`
- `users:read`
- `channels:read`
- `commands`

### 4d. Subscribe to Events

Event Subscriptions > Subscribe to bot events:
- `message.im`

### 4e. Create Message Shortcuts

Interactivity & Shortcuts > Create New Shortcut (x2):

**Shortcut 1 — Task capture:**
- Type: **On messages** (not global)
- Name: `Create [YourBotName] task` (e.g., "Create Atlas task")
- Callback ID: `create_orion_task`

**Shortcut 2 — Context capture:**
- Type: **On messages** (not global)
- Name: `Save Context`
- Callback ID: `save_orion_context`

Note: The callback IDs must be exactly `create_orion_task` and `save_orion_context` — these are what the bot code listens for.

### 4f. Enable App Home Messages Tab

App Home > toggle **Messages Tab** ON > check **Allow users to send Slash commands and messages from the messages tab**

### 4g. Install to Workspace

OAuth & Permissions > **Install to Workspace** > Authorize

Copy the **Bot User OAuth Token** (`xoxb-...`) — this is your `SLACK_BOT_TOKEN`.

### 4h. Get Your Slack User ID

Click your profile picture > Profile > three dots > **Copy member ID** (format: `U0XXXXXXXX`).

### 4i. Configure the bot

```bash
cd _ops/orion-personal-bot
cp env.template .env
```

Fill in your `.env`:

| Variable | Where to Get It |
|----------|----------------|
| `SLACK_BOT_TOKEN` | OAuth & Permissions > Bot User OAuth Token (`xoxb-...`) |
| `SLACK_APP_TOKEN` | Basic Information > App-Level Tokens (`xapp-...`) |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com/) > API Keys |
| `OWNER_SLACK_ID` | Your Slack profile > Copy member ID (`U0...`) |

### 4j. Install dependencies

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 4k. Set up team roster (optional)

If you want delegation suggestions:

```bash
cp setup/team_roster.template.json team_roster.json
```

Edit `team_roster.json` with your team members' Slack IDs and delegation keywords.

### 4l. Test the bot

```bash
source .venv/bin/activate
export PYTHONPATH="../daily-briefing:$PYTHONPATH"
python3 bot.py
```

Expected output:
```
INFO: Starting bot in Socket Mode...
INFO: Bolt app is running!
```

DM your bot in Slack. Try: "What's on my plate today?"

---

## Step 5: Set Up Slack Monitor (Optional — M4/M5 modules)

This is a separate Slack app for the pipeline to read your DMs (read-only). Different from the bot app.

1. Create another Slack app at [api.slack.com/apps](https://api.slack.com/apps)
2. Add Redirect URL: `https://localhost:3119/callback`
3. Add **User Token Scopes**: `channels:read`, `channels:history`, `groups:read`, `groups:history`, `im:read`, `im:history`, `mpim:read`, `mpim:history`, `users:read`, `users:read.email`
4. Copy Client ID and Client Secret to your `daily-briefing/.env`:
   ```
   SLACK_CLIENT_ID=your_client_id
   SLACK_CLIENT_SECRET=your_client_secret
   ```
5. Run the auth script:
   ```bash
   cd _ops/daily-briefing
   source .venv/bin/activate
   python3 setup/slack_auth.py
   ```
6. Enable M4 and M5 in `config.yaml`.

---

## Step 6: Auto-Start with launchd (macOS)

Template plists are in `orion-personal-bot/setup/`. For each one you want:

1. Copy the template and replace `{{PLACEHOLDER}}` values:
   - `{{BOT_NAME}}` — your bot's name in lowercase (e.g., `atlas`)
   - `{{BOT_DIR}}` — absolute path to `orion-personal-bot/` on your machine
   - `{{DAILY_BRIEFING_DIR}}` — absolute path to `daily-briefing/` on your machine

2. Copy to LaunchAgents:
   ```bash
   cp your-bot-personal.plist ~/Library/LaunchAgents/
   cp your-bot-checkin.plist ~/Library/LaunchAgents/     # optional
   cp your-bot-precall.plist ~/Library/LaunchAgents/     # optional
   cp your-bot-briefing.plist ~/Library/LaunchAgents/    # daily pipeline
   ```

3. Load:
   ```bash
   launchctl load ~/Library/LaunchAgents/com.performancegolf.YOUR_BOT_NAME-personal.plist
   launchctl load ~/Library/LaunchAgents/com.performancegolf.YOUR_BOT_NAME-briefing.plist
   ```

4. Verify:
   ```bash
   launchctl list | grep performancegolf
   ```

**Available plists:**

| Template | Purpose | Required? |
|----------|---------|-----------|
| `personal-bot.plist.template` | Keeps the Slack bot running | Yes (if using bot) |
| `daily-briefing.plist.template` | Runs pipeline at 8am + 8:30am | Yes (if using auto-reports) |
| `checkin.plist.template` | Hourly task check-ins via Slack | Optional |
| `precall.plist.template` | Pre-meeting nudges every 5 min | Optional |

---

## Step 7: Verification Checklist

Run through this checklist to confirm everything works:

- [ ] `python3 daily_briefing.py` runs and creates a report in `../daily-reports/`
- [ ] `python3 bot.py` starts without errors
- [ ] DM your bot in Slack — it responds to "What's on my plate today?"
- [ ] Right-click a Slack message > Connect to apps > your bot name > "Create task" works
- [ ] Right-click a Slack message > Connect to apps > your bot name > "Save Context" works
- [ ] `launchctl list | grep performancegolf` shows your loaded plists (if using auto-start)

---

## Module Reference

| Module | What It Does | Requires |
|--------|-------------|----------|
| M00a | Today at a Glance (capacity, meetings, alerts) | Core (nothing) |
| M00 | Overnight summary (transcript receipts) | Core |
| M0b | Pending Review (triage staging area) | Core |
| M0 | Action Items Tracker (persistent tasks) | Core |
| M1 | Automation Scanner (delegation suggestions) | Core |
| M2 | Industry Intel (Google Alert emails) | Gmail OAuth |
| M3 | Lexicon Builder (copywriting terms from articles) | M2 |
| M4 | Slack Monitor (DM scan + response drafts) | Slack OAuth (Step 5) |
| M5 | Wise Reply Context (working-relationship updates) | M4 |
| M6 | Newsletter Digest (email newsletter summaries) | Gmail OAuth |
| M7 | ClickUp Inbox (task triage) | ClickUp API token |
| M8 | Agent Status (reads SESSION-LOG.md Build States) | Core |
| M9 | Transcript Intelligence (meeting transcript extraction) | Transcript sync |
| M10 | KB Analyzer (pattern detection + recommendations) | M9 |
| M11 | Meeting Prep (pre-meeting briefs) | M9 |
| M12 | Daily Schedule (calendar + focus blocks) | Calendar OAuth |
| M13 | CLM Sync (launch board URL automation) | Sheets OAuth |
| M14 | Production Sync (ClickUp production calendar) | ClickUp API token |
| Triage | Triage Intelligence (auto-scoring + day suggestions) | Core |

Start with core modules. Add OAuth-dependent modules as you complete the auth steps.

---

## File Reference

### What's shared (committed to git)

| Directory | Contents |
|-----------|----------|
| `daily-briefing/*.py` | Pipeline runner, quick refresh, triage writer, calendar agenda CLI |
| `daily-briefing/modules/` | All 19 pipeline modules + helpers |
| `daily-briefing/setup/` | One-time OAuth setup scripts |
| `daily-briefing/config.template.yaml` | Config template with documented placeholders |
| `daily-briefing/env.template` | Environment variable template |
| `daily-briefing/requirements.txt` | Python dependencies |
| `orion-personal-bot/*.py` | Bot code, agent, KB operations, check-in, delegation |
| `orion-personal-bot/setup/` | Plist templates, team roster template |
| `orion-personal-bot/env.template` | Bot environment variable template |
| `orion-personal-bot/requirements.txt` | Bot Python dependencies |
| `orion-personal-bot/README.md` | Bot architecture and troubleshooting |

### What's private (gitignored — unique to each person)

| File Pattern | Contents |
|-------------|----------|
| `.env` | Your API keys and secrets |
| `.kb-*` | Your personal task state, triage history, approvals |
| `.transcript-kb.*` | Your meeting transcript data |
| `auth/` | Your OAuth tokens and credentials |
| `.venv/` | Your Python virtual environment |
| `logs/` | Runtime logs |
| `daily-reports.nosync/` | Your generated reports |
| `config.yaml` | Your personal configuration |
| `team_roster.json` | Your team's Slack IDs |
| `.checkin-state.json` | Check-in runtime state |

---

## Troubleshooting

**Pipeline says "Module X: setup required"**
- That module needs OAuth or an API key. Follow the relevant setup step or disable it in `config.yaml`.

**Bot won't start / "SLACK_APP_TOKEN not set"**
- Check `.env` exists in `orion-personal-bot/` with all 4 values.

**"Socket Mode not enabled"**
- api.slack.com/apps > your app > Settings > Socket Mode > toggle ON.

**Bot ignores your messages**
- Check `OWNER_SLACK_ID` matches your actual Slack user ID.

**Message shortcut doesn't appear**
- Use **Connect to apps** (message three dots > Connect to apps > search your bot name), not the native Shortcuts menu.

**OAuth scripts fail with "Missing credentials.json"**
- Download OAuth client credentials from Google Cloud Console and save as `auth/credentials.json` (see Step 3b).

**"daily-briefing venv not found" when running bot**
- The bot needs `PYTHONPATH` to include the daily-briefing directory. Either set it in your plist or run: `export PYTHONPATH="../daily-briefing:$PYTHONPATH"`
