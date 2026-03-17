"""Task Parser — extracts task title from forwarded Slack messages using Claude API.

Also handles direct "add task: ..." shortcuts without API calls.
"""

import logging
import os
import re

import anthropic

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """\
You extract task titles from Slack messages. Given a message (often forwarded from \
someone else), produce a concise task title under 60 characters.

Rules:
- Start with a verb (Review, Send, Create, Follow up, Schedule, etc.)
- Include the key subject/deliverable
- If urgency signals exist (ASAP, deadline, launch), note them in urgency_signals
- If people are mentioned, list them in people
- Do NOT include dates, times, or "by end of day" in the title

Respond with JSON only:
{"title": "...", "description": "...", "urgency_signals": [...], "people": [...]}
"""


def extract_task_from_message(message_text: str, sender_name: str = None) -> dict:
    """Extract a structured task from a Slack message using Claude API.

    Returns: {"title": str, "description": str, "urgency_signals": list, "people": list}
    """
    # Quick shortcut: "add task: Review the brief" — skip API call
    add_match = re.match(r"^add\s+task:\s*(.+)$", message_text, re.IGNORECASE)
    if add_match:
        title = add_match.group(1).strip()[:60]
        return {
            "title": title,
            "description": message_text,
            "urgency_signals": [],
            "people": [],
        }

    # Call Claude API for extraction
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        # Fallback: use first 60 chars as title
        logger.warning("No ANTHROPIC_API_KEY — using raw message as title")
        return {
            "title": message_text[:60].strip(),
            "description": message_text,
            "urgency_signals": [],
            "people": [],
        }

    client = anthropic.Anthropic(api_key=api_key)
    user_msg = f"Sender: {sender_name or 'Unknown'}\nMessage: {message_text}"

    try:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=300,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_msg}],
        )
        import json
        result = json.loads(response.content[0].text)
        return {
            "title": result.get("title", message_text[:60])[:60],
            "description": result.get("description", message_text),
            "urgency_signals": result.get("urgency_signals", []),
            "people": result.get("people", []),
        }
    except Exception as e:
        logger.error(f"Claude API extraction failed: {e}")
        return {
            "title": message_text[:60].strip(),
            "description": message_text,
            "urgency_signals": [],
            "people": [],
        }
