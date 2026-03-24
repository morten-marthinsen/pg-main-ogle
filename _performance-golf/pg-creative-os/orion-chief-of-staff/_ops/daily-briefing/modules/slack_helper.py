"""Shared Slack helper for daily briefing modules.

Handles authentication and Slack API calls. Read-only — NO chat:write (Gate 3).
"""

import json
from datetime import datetime, timedelta
from pathlib import Path

from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

SCRIPT_DIR = Path(__file__).resolve().parent.parent
DEFAULT_TOKEN_PATH = SCRIPT_DIR / "auth" / "slack_token.json"


def get_slack_client(env: dict) -> WebClient:
    """Build and return an authenticated Slack WebClient (read-only)."""
    token_path = env.get("SLACK_TOKEN_PATH", "")
    if not token_path:
        token_path = str(DEFAULT_TOKEN_PATH)
    else:
        token_path = str(Path(token_path).expanduser())
        if not Path(token_path).is_absolute():
            token_path = str(SCRIPT_DIR / token_path)

    if not Path(token_path).exists():
        raise RuntimeError(
            f"Slack token not found at {token_path}. "
            "Run: python3 auth/slack_auth.py"
        )

    with open(token_path) as f:
        data = json.load(f)
    token = data.get("access_token", "")
    if not token:
        raise RuntimeError(
            f"Invalid Slack token file at {token_path}. "
            "Re-run: python3 auth/slack_auth.py"
        )

    return WebClient(token=token)


def fetch_unanswered_dms(client: WebClient, logger=None, lookback_hours: int = 24, exclude_names: list = None) -> list:
    """
    Fetch DM conversations where the last message is from someone else
    (awaiting user's reply) within the lookback window.
    Returns list of dicts: {channel_id, user_id, user_name, last_message, ts, thread_ts}.
    """
    try:
        auth = client.auth_test()
        my_user_id = auth["user_id"]
    except SlackApiError as e:
        if logger:
            logger.error(f"[slack] auth_test failed: {e}")
        return []

    since_ts = str(int((datetime.now() - timedelta(hours=lookback_hours)).timestamp()))

    try:
        convos = client.conversations_list(
            types="im",
            limit=50,
            exclude_archived=True,
        )
    except SlackApiError as e:
        if logger:
            logger.error(f"[slack] conversations_list failed: {e}")
        return []

    results = []
    im_channels = convos.get("channels", [])

    for ch in im_channels:
        ch_id = ch["id"]
        user_id = ch.get("user")  # DM partner
        if not user_id or user_id == my_user_id:
            continue

        try:
            hist = client.conversations_history(
                channel=ch_id,
                limit=10,
                oldest=since_ts,
            )
        except SlackApiError:
            continue

        messages = hist.get("messages", [])
        if not messages:
            continue

        # Sort by ts descending; first is most recent
        messages.sort(key=lambda m: float(m.get("ts", 0) or 0), reverse=True)
        latest = messages[0]

        # Only include if latest message is from the other person (awaiting reply)
        if latest.get("user") != my_user_id:
            # Get user info
            user_name = user_id
            try:
                user_info = client.users_info(user=user_id)
                profile = user_info.get("user", {}).get("profile", {})
                user_name = profile.get("real_name") or profile.get("display_name") or user_id
            except SlackApiError:
                pass

            # Exclude messages from specified senders (e.g., Orion bot)
            if exclude_names:
                if any(excl.lower() in user_name.lower() for excl in exclude_names):
                    continue

            # Get thread replies if it's a thread
            thread_ts = latest.get("ts")
            thread_replies = []
            if latest.get("thread_ts") and latest.get("thread_ts") != latest.get("ts"):
                thread_ts = latest["thread_ts"]
                try:
                    replies = client.conversations_replies(channel=ch_id, ts=thread_ts)
                    thread_replies = replies.get("messages", [])[1:]  # Skip parent
                except SlackApiError:
                    pass

            text = latest.get("text", "")
            # Build thread context for AI (parent + replies)
            thread_texts = [text]
            for m in thread_replies:
                thread_texts.append(m.get("text", ""))
            thread_context = "\n".join(thread_texts) if len(thread_texts) > 1 else text

            results.append({
                "channel_id": ch_id,
                "channel_type": "im",
                "user_id": user_id,
                "user_name": user_name,
                "last_message": text,
                "thread_context": thread_context,
                "ts": latest.get("ts"),
                "thread_ts": thread_ts if latest.get("thread_ts") else None,
                "thread_replies": thread_replies,
                "raw_message": latest,
            })

    # Sort by ts descending (most recent first)
    results.sort(key=lambda r: float(r["ts"] or 0), reverse=True)

    if logger:
        logger.info(f"[slack] Found {len(results)} DM(s) awaiting reply in last {lookback_hours}h")

    return results
