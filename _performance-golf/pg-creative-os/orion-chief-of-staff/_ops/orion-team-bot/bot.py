#!/usr/bin/env python3
"""Orion (Team) — PG Creative Intelligence Bot.

Socket Mode Slack Bolt app for the entire PG team.
Any team member can DM the bot to ask about creative performance,
pipeline status, and strategic recommendations.

Data allowlist enforced — no access to Christopher's private data
(tasks, KB, stakeholder map, working relationships).

Usage:
    python3 bot.py
"""

import logging
import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

load_dotenv(Path(__file__).parent / ".env")

from agent import process_message

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(name)s] %(levelname)s: %(message)s",
)
logger = logging.getLogger("orion-team")

# ── App Setup ──────────────────────────────────────────────────────────────

app = App(token=os.environ.get("SLACK_BOT_TOKEN"))


def _get_user_name(client, user_id: str) -> str:
    """Look up a Slack user's display name."""
    try:
        result = client.users_info(user=user_id)
        profile = result["user"]["profile"]
        return profile.get("display_name") or profile.get("real_name") or user_id
    except Exception:
        return user_id


# ── DM Handler ─────────────────────────────────────────────────────────────


@app.event("message")
def handle_dm(event, say, client):
    """Handle direct messages from any team member."""
    user_id = event.get("user", "")
    text = event.get("text", "").strip()
    thread_ts = event.get("thread_ts") or event.get("ts", "")

    # Ignore bot's own messages and empty text
    if event.get("bot_id") or event.get("subtype") == "bot_message":
        return
    if not text:
        return

    user_name = _get_user_name(client, user_id)
    logger.info(f"DM from {user_name} ({user_id}): {text[:80]}...")

    try:
        reply = process_message(text, thread_ts, user_name=user_name)
        if reply:
            say(text=reply, thread_ts=thread_ts)
    except Exception as e:
        logger.error(f"Agent error: {e}", exc_info=True)
        say(
            text="Something went wrong. Try rephrasing your question?",
            thread_ts=thread_ts,
        )


# ── @mention Handler ───────────────────────────────────────────────────────


@app.event("app_mention")
def handle_mention(event, say, client):
    """Handle @Orion mentions in channels."""
    user_id = event.get("user", "")
    text = event.get("text", "").strip()
    thread_ts = event.get("thread_ts") or event.get("ts", "")

    if not text:
        return

    # Strip the bot mention from the text
    # Format: <@BOTID> actual question
    import re
    text = re.sub(r"<@[A-Z0-9]+>\s*", "", text).strip()
    if not text:
        say(
            text="Hey! Ask me anything about creative performance, pipeline status, or what's working in ads.",
            thread_ts=thread_ts,
        )
        return

    user_name = _get_user_name(client, user_id)
    logger.info(f"Mention from {user_name} ({user_id}): {text[:80]}...")

    try:
        reply = process_message(text, thread_ts, user_name=user_name)
        if reply:
            say(text=reply, thread_ts=thread_ts)
    except Exception as e:
        logger.error(f"Agent error: {e}", exc_info=True)
        say(
            text="Something went wrong. Try rephrasing your question?",
            thread_ts=thread_ts,
        )


# ── Main ───────────────────────────────────────────────────────────────────


if __name__ == "__main__":
    app_token = os.environ.get("SLACK_APP_TOKEN")
    if not app_token:
        logger.error("SLACK_APP_TOKEN not set — cannot start Socket Mode")
        sys.exit(1)

    logger.info("Starting Orion (Team) bot in Socket Mode...")
    handler = SocketModeHandler(app, app_token)
    handler.start()
