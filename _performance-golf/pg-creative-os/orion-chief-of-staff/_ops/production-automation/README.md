# Production Calendar Automation

Monitors the ClickUp Production Calendar and posts Slack notifications when footage is ready for tagging.

## How It Works

1. Polls ClickUp Production Calendar every 5 minutes
2. Detects when an "Ingest" subtask is marked complete
3. Checks for an Iconik URL (URL gate — won't notify without it)
4. Posts a formatted notification to the Production Calendar Slack channel

## Notification Format

```
:white_check_mark: SF2 | Brixton Product Demo
:calendar: 03/26/2026 · Product · SF2 (SF2 Driver)

{Task description with Iconik URLs and shoot notes}

Ready for tagging.
View task in ClickUp
```

## Setup

### Prerequisites
- Orion venv (`../daily-briefing/.venv/`) with `requests`, `slack_sdk`, `pyyaml`
- ClickUp API token
- Slack Bot token (Orion - PG Creative Intel bot, `chat:write` scope)

### 1. Create `.env`
Copy tokens from sibling services:
```bash
cp .env.example .env
# Edit .env with actual CLICKUP_API_TOKEN and SLACK_BOT_TOKEN
```

### 2. Update Slack channel in `config.yaml`
Replace `REPLACE_WITH_CHANNEL_ID` with the actual Production Calendar Slack channel ID.

### 3. Test with dry-run
```bash
cd _ops/production-automation
source .env  # or use the run script's env loading
python3 production_notifier.py --config config.yaml --dry-run
```

### 4. Activate launchd (when ready)
```bash
cp com.performancegolf.production-notifier.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.performancegolf.production-notifier.plist
```

## Files

| File | Purpose |
|------|---------|
| `production_notifier.py` | Main script — polls ClickUp, posts to Slack |
| `config.yaml` | Configuration — list IDs, Slack channels, field names |
| `run-production-notifier.sh` | Launcher — loads .env, runs script, manages logs |
| `com.performancegolf.production-notifier.plist` | launchd plist (5-min interval) |
| `SETUP-PHASE0.md` | ClickUp form + automation setup instructions |
| `.production-notifier-state.json` | Local state tracking (gitignored) |
| `.env` | Secrets (gitignored) |
| `logs/` | Runtime logs (gitignored, 7-day rotation) |

## Safety

- **Read-only ClickUp access** — never modifies tasks, only reads
- **URL gate** — won't notify unless Iconik URL is present
- **State tracking** — prevents duplicate notifications
- **File lock** — prevents overlapping runs
- **Dry-run mode** — test without posting to Slack
