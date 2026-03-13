#!/usr/bin/env python3
"""Orion (Personal) — Private Slack Task Bot.

Socket Mode Slack Bolt app for Christopher's personal task management.
Hard-coded user ID gate: only OWNER_SLACK_ID can interact.

Architecture: Every message routes through the Claude agent (agent.py),
which has natural conversation ability, thread memory, and KB tool access.

Usage:
    python3 bot.py
"""

import logging
import os
import re
import sys
from pathlib import Path

from dotenv import load_dotenv
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

# Load .env from bot directory
load_dotenv(Path(__file__).parent / ".env")

from agent import process_message

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(name)s] %(levelname)s: %(message)s",
)
logger = logging.getLogger("orion-personal")

# ── Config ─────────────────────────────────────────────────────────────────

OWNER_SLACK_ID = os.environ.get("OWNER_SLACK_ID", "")
if not OWNER_SLACK_ID:
    logger.error("OWNER_SLACK_ID not set in .env — bot will reject all messages")

# ── App Setup ──────────────────────────────────────────────────────────────

app = App(token=os.environ.get("SLACK_BOT_TOKEN"))


def is_owner(user_id: str) -> bool:
    """Check if the message sender is Christopher."""
    return user_id == OWNER_SLACK_ID


# ── Message Shortcut Handler ──────────────────────────────────────────────


@app.shortcut("create_orion_task")
def handle_create_task_shortcut(ack, shortcut, client):
    """Handle 'Create Orion task' message shortcut (right-click on any message)."""
    ack()

    user_id = shortcut.get("user", {}).get("id", "")
    if not is_owner(user_id):
        logger.info(f"Rejected shortcut from non-owner: {user_id}")
        return

    # Extract the message text from the shortcut payload
    message = shortcut.get("message", {})
    msg_text = message.get("text", "").strip()

    if not msg_text:
        client.chat_postMessage(
            channel=OWNER_SLACK_ID,
            text="Couldn't extract text from that message. Try a text message.",
        )
        return

    # Get sender info for context
    msg_user_id = message.get("user", "")
    sender_label = ""
    if msg_user_id:
        try:
            user_info = client.users_info(user=msg_user_id)
            sender_label = user_info["user"].get("real_name", msg_user_id)
        except Exception:
            sender_label = msg_user_id

    # Get the channel name for context
    channel_id = shortcut.get("channel", {}).get("id", "")
    channel_label = ""
    if channel_id:
        try:
            conv_info = client.conversations_info(channel=channel_id)
            channel_label = conv_info["channel"].get("name", channel_id)
        except Exception:
            channel_label = channel_id

    # Build a prompt that enforces propose-then-confirm flow
    context_parts = [
        "I used the 'Create Orion task' shortcut on a Slack message.",
        "IMPORTANT: Do NOT create the task yet. Instead, propose a task title "
        "and ask me to confirm: (1) the title, (2) which day to schedule it, "
        "and (3) the priority tier (A, B, or C). Wait for my reply before creating.",
    ]
    if sender_label:
        context_parts.append(f"From: {sender_label}")
    if channel_label:
        context_parts.append(f"Channel: #{channel_label}")
    context_parts.append(f'Message: "{msg_text}"')

    prompt = "\n".join(context_parts)
    logger.info(f"Shortcut task from message: {msg_text[:80]}...")

    # Send the initial proposal as a DM, then capture the thread_ts so
    # follow-up replies share the same conversation context in the agent.
    try:
        # Post a placeholder to start the thread, then get its ts
        initial = client.chat_postMessage(
            channel=OWNER_SLACK_ID,
            text=":memo: Processing message shortcut...",
        )
        dm_channel = initial["channel"]  # actual DM channel ID (D0...)
        thread_ts = initial["ts"]

        # Use the DM thread_ts as the conversation key so follow-up
        # replies in this thread share context with the agent
        reply = process_message(prompt, thread_ts)
        if reply:
            client.chat_update(
                channel=dm_channel,
                ts=thread_ts,
                text=reply,
            )
    except Exception as e:
        logger.error(f"Shortcut agent error: {e}", exc_info=True)
        client.chat_postMessage(
            channel=OWNER_SLACK_ID,
            text="Something went wrong creating a task from that message. Try again?",
        )


# ── Save Context Shortcut Handler ─────────────────────────────────────────


@app.shortcut("save_orion_context")
def handle_save_context_shortcut(ack, shortcut, client):
    """Handle 'Save Context' message shortcut (right-click on any message)."""
    ack()

    user_id = shortcut.get("user", {}).get("id", "")
    if not is_owner(user_id):
        logger.info(f"Rejected context shortcut from non-owner: {user_id}")
        return

    # Extract the message text from the shortcut payload
    message = shortcut.get("message", {})
    msg_text = message.get("text", "").strip()

    if not msg_text:
        client.chat_postMessage(
            channel=OWNER_SLACK_ID,
            text="Couldn't extract text from that message. Try a text message.",
        )
        return

    # Get sender info
    msg_user_id = message.get("user", "")
    sender_label = ""
    if msg_user_id:
        try:
            user_info = client.users_info(user=msg_user_id)
            sender_label = user_info["user"].get("real_name", msg_user_id)
        except Exception:
            sender_label = msg_user_id

    # Get the channel name and ID
    channel_info = shortcut.get("channel", {})
    channel_id = channel_info.get("id", "")
    channel_label = ""
    if channel_id:
        try:
            conv_info = client.conversations_info(channel=channel_id)
            channel_label = conv_info["channel"].get("name", channel_id)
        except Exception:
            channel_label = channel_id

    # Get message timestamp
    msg_ts = message.get("ts", "")

    # Extract Google Doc URLs from message text and attachments
    gdoc_urls = _extract_google_doc_urls(message)

    # Build a prompt that enforces propose-then-confirm flow
    context_parts = [
        "I used the 'Save Context' shortcut on a Slack message.",
        "IMPORTANT: Do NOT save yet. Propose the following metadata and wait for my confirmation:",
        "  - product (slug from the allowed list)",
        "  - tags (descriptive tags as a list)",
        "  - summary (one-line summary)",
        "  - filename (YYYY-MM-DD-author-slug-topic format)",
        "I may correct any field before confirming. Only call save_context after I approve.",
    ]

    # If Google Doc URLs found, add explicit instruction to read them first
    if gdoc_urls:
        urls_str = ", ".join(gdoc_urls)
        context_parts.append(
            f"\nThis message contains Google Doc link(s): {urls_str}\n"
            "You MUST call read_google_doc for each URL BEFORE proposing metadata. "
            "Use the document content to propose better tags, summary, and product classification."
        )

    if sender_label:
        context_parts.append(f"From: {sender_label}")
    if channel_label:
        context_parts.append(f"Channel: #{channel_label}")
    if channel_id:
        context_parts.append(f"Channel ID: {channel_id}")
    if msg_ts:
        context_parts.append(f"Message timestamp: {msg_ts}")
    context_parts.append(f'Message: "{msg_text}"')

    prompt = "\n".join(context_parts)
    logger.info(f"Save Context shortcut on message: {msg_text[:80]}...")

    try:
        # Post a placeholder to start the thread
        initial = client.chat_postMessage(
            channel=OWNER_SLACK_ID,
            text=":file_folder: Processing Save Context shortcut...",
        )
        dm_channel = initial["channel"]
        thread_ts = initial["ts"]

        reply = process_message(prompt, thread_ts)
        if reply:
            client.chat_update(
                channel=dm_channel,
                ts=thread_ts,
                text=reply,
            )
    except Exception as e:
        logger.error(f"Save Context shortcut error: {e}", exc_info=True)
        client.chat_postMessage(
            channel=OWNER_SLACK_ID,
            text="Something went wrong saving context from that message. Try again?",
        )


# ── Helpers ────────────────────────────────────────────────────────────────


def _extract_google_doc_urls(message: dict) -> list[str]:
    """Extract Google Doc URLs from a Slack message (text + attachments).

    Slack formats URLs as <https://...|Label> in message text.
    Unfurled links appear in message attachments with original_url or from_url.
    """
    urls = set()
    gdoc_pattern = re.compile(r"https?://docs\.google\.com/document/d/[a-zA-Z0-9_-]+")

    # 1. Message text — Slack angle-bracket format: <URL|label> or <URL>
    text = message.get("text", "")
    for match in re.finditer(r"<(https?://[^|>]+)", text):
        url = match.group(1)
        if gdoc_pattern.search(url):
            urls.add(gdoc_pattern.search(url).group(0))

    # Also check for bare URLs in text
    for match in gdoc_pattern.finditer(text):
        urls.add(match.group(0))

    # 2. Attachments — unfurled links
    for att in message.get("attachments", []):
        for key in ("original_url", "from_url", "title_link"):
            url = att.get(key, "")
            if url and gdoc_pattern.search(url):
                urls.add(gdoc_pattern.search(url).group(0))

    # 3. Blocks — some messages use block kit with URL elements
    for block in message.get("blocks", []):
        for element in block.get("elements", []):
            for sub in element.get("elements", []):
                url = sub.get("url", "")
                if url and gdoc_pattern.search(url):
                    urls.add(gdoc_pattern.search(url).group(0))

    return sorted(urls)


# ── Message Handler ────────────────────────────────────────────────────────


@app.event("message")
def handle_message(event, say):
    """Main message handler — routes everything through the Claude agent."""
    user_id = event.get("user", "")
    text = event.get("text", "").strip()
    thread_ts = event.get("thread_ts") or event.get("ts", "")

    # Ignore bot's own messages and empty text
    if event.get("bot_id") or event.get("subtype") == "bot_message":
        return
    if not text:
        return

    # Access gate
    if not is_owner(user_id):
        logger.info(f"Rejected message from non-owner: {user_id}")
        return

    logger.info(f"Message from Christopher: {text[:80]}...")

    try:
        reply = process_message(text, thread_ts)
        if reply:
            say(text=reply, thread_ts=thread_ts)
    except Exception as e:
        logger.error(f"Agent error: {e}", exc_info=True)
        say(
            text="Something went wrong processing that. Try again?",
            thread_ts=thread_ts,
        )


# ── Main ───────────────────────────────────────────────────────────────────


if __name__ == "__main__":
    app_token = os.environ.get("SLACK_APP_TOKEN")
    if not app_token:
        logger.error("SLACK_APP_TOKEN not set — cannot start Socket Mode")
        sys.exit(1)

    logger.info("Starting Orion (Personal) bot in Socket Mode...")
    handler = SocketModeHandler(app, app_token)
    handler.start()
