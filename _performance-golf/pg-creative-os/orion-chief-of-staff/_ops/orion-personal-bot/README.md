# Orion Personal Bot

Private Slack bot for personal task management. Runs in your DMs — only you can interact with it.

## What It Does

- **DM task management** — create, complete, reschedule, and query tasks via natural conversation
- **Task shortcut** — right-click any Slack message → "Create Orion task" to capture it as a task
- **Context shortcut** — right-click any Slack message → "Save Context" to capture it as searchable knowledge in `_shared/context-library/`
- **ABC priority** — tasks are scored and ranked into A/B/C tiers matching your daily report
- **Auto report refresh** — after any task change, the daily briefing re-renders in ~2-4 seconds

## Prerequisites

- Python 3.9+
- A working [daily-briefing pipeline](../daily-briefing/) (the bot reads/writes its KB files and calls `quick_refresh.py`)
- An [Anthropic API key](https://console.anthropic.com/) (uses Claude Haiku for the conversation agent)
- Slack workspace with permission to create apps
- macOS (for launchd auto-start — optional, the bot can run manually on any OS)

## Architecture

```
Slack DM → bot.py (Slack Bolt, Socket Mode)
              ↓
           agent.py (Claude Haiku conversation engine)
              ↓ (tool calls)
           kb_ops.py → daily-briefing KB files (.kb-manual-items.json, .kb-schedule.json, etc.)
              ↓ (after task changes)
           quick_refresh.py → patches today's daily report (M00a, M0b, M0 sections)
```

| File | Role |
|------|------|
| `bot.py` | Slack Bolt app — message handler, message shortcut handler, owner gate |
| `agent.py` | Claude conversation engine — system prompt, 7 tools, thread history, report parsing |
| `kb_ops.py` | KB operations — task CRUD, context saving, fuzzy search, schedule suggestion, priority scoring |
| `intent_classifier.py` | Legacy intent classifier (unused — kept for regex fallback reference) |
| `conversation.py` | Legacy conversation module (unused) |
| `priority_explainer.py` | Priority explanation utility |
| `task_parser.py` | Task text parsing utility |
| `env.template` | Environment variable template |
| `com.performancegolf.orion-personal.plist` | macOS launchd plist for auto-start |

## Setup

### Step 1: Create a Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps) → **Create New App** → **From scratch**
2. Name it anything (e.g., "Orion Personal") and select your workspace

**Enable Socket Mode:**
1. Settings → **Socket Mode** → toggle ON
2. Generate an **App-Level Token** with `connections:write` scope
3. Save the token (`xapp-...`) — this is your `SLACK_APP_TOKEN`

**Set Bot Token Scopes** (OAuth & Permissions → Bot Token Scopes):
- `chat:write`
- `im:history`
- `im:read`
- `im:write`
- `users:read`
- `channels:read`
- `commands`

**Subscribe to Events** (Event Subscriptions → Subscribe to bot events):
- `message.im`

**Create Message Shortcuts** (Interactivity & Shortcuts → Create New Shortcut):

Shortcut 1:
- Type: **On messages** (not global)
- Name: `Create Orion task`
- Callback ID: `create_orion_task`

Shortcut 2:
- Type: **On messages** (not global)
- Name: `Save Context`
- Callback ID: `save_orion_context`

**Install to Workspace:**
1. OAuth & Permissions → **Install to Workspace** → Authorize
2. Copy the **Bot User OAuth Token** (`xoxb-...`) — this is your `SLACK_BOT_TOKEN`

**Get Your Slack User ID:**
1. Click your profile picture → **Profile** → three dots (**⋮**) → **Copy member ID**
2. This is your `OWNER_SLACK_ID` (format: `U0XXXXXXXX`)

**Enable App Home Messages Tab:**
1. App Home → toggle **Messages Tab** ON
2. Check **Allow users to send Slash commands and messages from the messages tab**

### Step 2: Configure Environment

```bash
cd _ops/orion-personal-bot
cp env.template .env
```

Fill in the 4 values in `.env`:

| Variable | Where to Get It |
|----------|----------------|
| `SLACK_BOT_TOKEN` | OAuth & Permissions → Bot User OAuth Token (`xoxb-...`) |
| `SLACK_APP_TOKEN` | Basic Information → App-Level Tokens (`xapp-...`) |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com/) → API Keys |
| `OWNER_SLACK_ID` | Your Slack profile → Copy member ID (`U0...`) |

### Step 3: Install Dependencies

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Step 4: Verify Daily Briefing Pipeline

The bot depends on the daily-briefing pipeline's KB files and venv. Verify:

```bash
# Check daily-briefing venv exists
ls ../daily-briefing/.venv/bin/python3

# Check KB files exist (these are created by the pipeline)
ls ../daily-briefing/.kb-manual-items.json
ls ../daily-briefing/.kb-schedule.json
ls ../daily-briefing/.kb-priorities.json
```

If starting fresh (no existing KB files), create empty seed files:

```bash
echo '{"action_items": []}' > ../daily-briefing/.kb-manual-items.json
echo '{}' > ../daily-briefing/.kb-schedule.json
echo '{"priorities": {}}' > ../daily-briefing/.kb-priorities.json
```

The bot also needs `PYTHONPATH` to include the daily-briefing directory so it can import modules. The plist handles this automatically; for manual runs:

```bash
export PYTHONPATH="../daily-briefing:$PYTHONPATH"
```

### Step 5: Run the Bot

```bash
source .venv/bin/activate
export PYTHONPATH="../daily-briefing:$PYTHONPATH"
python3 bot.py
```

Expected output:
```
INFO: Starting Orion (Personal) bot in Socket Mode...
INFO: ⚡ Bolt app is running!
```

Test by DMing your bot in Slack. Try: "What's on my plate today?"

### Step 6: Test the Message Shortcuts

Both shortcuts surface through Slack's "Connect to apps" menu:

1. Find any message in Slack
2. Hover over it → click the three dots (**⋮**)
3. Click **Connect to apps** (near the bottom of the menu)
4. Search for your app name (e.g., "Orion")

**Create Orion task:**
5. Click **Create Orion task**
6. Bot sends a DM with a proposed task (title, day, A/B/C tier)
7. Reply to confirm → task created + daily report refreshed

**Save Context:**
5. Click **Save Context**
6. Bot sends a DM with proposed metadata (product, tags, summary, filename)
7. Correct any fields or confirm → context file saved to `_shared/context-library/`
8. Verify: `grep -rl "product: sf2" _shared/context-library/` returns the file

## The 7 Tools

| Tool | What It Does | Confirmation Required? |
|------|-------------|----------------------|
| `get_today_tasks` | Returns today's ranked task list (matches daily report) | No |
| `complete_task` | Marks a task as done in the KB | Yes |
| `create_task` | Creates a new task with auto-scheduling and priority scoring | Yes |
| `reschedule_task` | Moves a task to a different day | Yes |
| `list_open_tasks` | Searches/lists all open tasks with optional fuzzy matching | No |
| `regenerate_report` | Quick-refreshes the daily report (~2-4s) | No (auto-called after mutations) |
| `save_context` | Saves a Slack message as tagged knowledge in `_shared/context-library/` | Yes |

## Auto-Start with launchd (macOS)

The included plist keeps the bot running across reboots.

1. **Edit paths in the plist.** Open `com.performancegolf.orion-personal.plist` and update:
   - `ProgramArguments` → your `.venv/bin/python3` and `bot.py` absolute paths
   - `WorkingDirectory` → your `orion-personal-bot/` absolute path
   - `PYTHONPATH` → your `daily-briefing/` absolute path

2. **Copy to LaunchAgents:**
   ```bash
   cp com.performancegolf.orion-personal.plist ~/Library/LaunchAgents/
   ```

3. **Load and start:**
   ```bash
   launchctl load ~/Library/LaunchAgents/com.performancegolf.orion-personal.plist
   ```

4. **Verify:**
   ```bash
   launchctl list | grep orion-personal
   ```

Key behaviors:
- `RunAtLoad: true` — starts on login
- `KeepAlive: true` — restarts if the process exits
- `ThrottleInterval: 10` — waits 10 seconds before restarting after a crash
- Logs: `/tmp/orion-personal-bot.log` and `/tmp/orion-personal-bot.err`

To stop: `launchctl unload ~/Library/LaunchAgents/com.performancegolf.orion-personal.plist`

## Private vs Shared Files

| Type | Files | Shared? |
|------|-------|---------|
| **Code** | `bot.py`, `agent.py`, `kb_ops.py`, etc. | Yes (committed) |
| **Config templates** | `env.template`, `com.performancegolf.orion-personal.plist` | Yes (committed) |
| **Secrets** | `.env` | No (gitignored) |
| **KB files** | `.kb-manual-items.json`, `.kb-schedule.json`, etc. | No (gitignored, in daily-briefing/) |
| **Daily reports** | `daily-reports.nosync/` | No (gitignored) |

## Troubleshooting

**Bot won't start / "SLACK_APP_TOKEN not set"**
- Check `.env` exists and has all 4 values filled in
- Check you're running from the `orion-personal-bot/` directory (dotenv loads relative to script)

**"Socket Mode not enabled"**
- Go to api.slack.com/apps → your app → Settings → Socket Mode → toggle ON
- Ensure your app-level token has `connections:write` scope

**Bot ignores your messages**
- Check `OWNER_SLACK_ID` matches your actual Slack user ID
- Check the App Home → Messages Tab is ON with "Allow users to send messages" checked

**"daily-briefing venv not found"**
- Run `cd ../daily-briefing && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt`
- Check the `PYTHONPATH` environment variable includes the daily-briefing directory

**Message shortcut doesn't appear**
- Shortcut won't show in the native "Shortcuts" menu — use **Connect to apps** instead (three dots on any message → Connect to apps → search your app name)
- Verify callback IDs are exactly `create_orion_task` and `save_orion_context` (Interactivity & Shortcuts in app config)

**"message_not_found" on shortcut**
- This was fixed in v3.3. The bot now uses the DM channel ID from `chat_postMessage` response instead of the user ID for `chat_update`. If you see this, ensure you have the latest `bot.py`.

**Tasks don't appear in daily report**
- The bot calls `quick_refresh.py` automatically after task changes
- Check that `../daily-briefing/quick_refresh.py` exists
- Check logs at `/tmp/orion-personal-bot.log` for refresh errors
