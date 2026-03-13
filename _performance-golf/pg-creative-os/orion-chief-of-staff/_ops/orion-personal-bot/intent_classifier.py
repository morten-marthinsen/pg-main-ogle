"""Intent Classifier — Claude-powered message routing for Orion Personal Bot.

Replaces rigid regex patterns with natural language understanding.
Classifies every incoming DM into one of:
  - complete_task: user wants to mark a task as done
  - create_task: user wants to create/add a new task
  - query: user wants to see tasks (today, list, status)
  - reschedule: user wants to move a task to a different day
  - unclear: can't determine intent — ask for clarification

Also extracts:
  - task_reference: tier/position (e.g., "A1", "B2"), task ID (e.g., "mi-041"), or title fragment
  - query_type: "today", "list", or None
  - reschedule_target: day string if reschedule intent
"""

import json
import logging
import os
import re

import anthropic

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """\
You classify Slack messages from Christopher (your only user) into intents for \
a personal task management bot called Orion.

Christopher manages tasks with an ABC priority system:
- A-tasks (A1, A2, A3): Top 3 needle-movers for the day
- B-tasks (B1, B2, B3): Important but secondary
- C-tasks: Everything else

He often refers to tasks by their tier+position (e.g., "B1 is done", "finished A2") \
or by partial title (e.g., "done with the quiz concept").

Classify the message into exactly ONE intent:

1. "complete_task" — user says a task is done/finished/completed/checked off
   - "B1 task today is finished"
   - "done with the quiz concept"
   - "Hey Orion, I finished A2"
   - "mark mi-041 as done"
   - "checked off the naming convention task"

2. "create_task" — user wants to add a NEW task
   - "add task: Review the brief"
   - "I need to remember to follow up with Romeo"
   - "Can you track this: send Brixton the scorecard"
   - Forwarded messages (user forwards a Slack message to create a task from it)

3. "query" — user wants to see their tasks or status
   - "today" / "what's on today" / "show me today's tasks"
   - "list" / "what's open" / "show all tasks"
   - "what's my A1?"

4. "reschedule" — user wants to move a task to a different day
   - "reschedule mi-041 to wednesday"
   - "move B2 to tomorrow"
   - "push the quiz concept to friday"

5. "unclear" — genuinely can't tell what the user wants
   - Use sparingly. Most messages have a clear intent.

Respond with JSON only:
{
  "intent": "complete_task" | "create_task" | "query" | "reschedule" | "unclear",
  "task_reference": "B1" | "A2" | "mi-041" | "quiz concept" | null,
  "query_type": "today" | "list" | null,
  "reschedule_target": "wednesday" | "tomorrow" | "2026-03-12" | null,
  "confidence": 0.0-1.0
}

Rules:
- Strip greetings ("Hey Orion", "Hi", "Yo") — focus on the actual request
- "finished", "done", "completed", "checked off" → complete_task (not create_task)
- When in doubt between complete_task and create_task, lean toward complete_task \
  if ANY completion language is present
- Forwarded messages without completion language → create_task
- Single words like "today" or "list" → query
"""


def classify_intent(message_text: str) -> dict:
    """Classify a message into an intent using Claude API.

    Returns: {
        "intent": str,
        "task_reference": str | None,
        "query_type": str | None,
        "reschedule_target": str | None,
        "confidence": float,
    }
    """
    # Quick shortcuts for exact matches (save API calls)
    text_lower = message_text.lower().strip()
    if text_lower in ("today", "list"):
        return {
            "intent": "query",
            "task_reference": None,
            "query_type": text_lower,
            "reschedule_target": None,
            "confidence": 1.0,
        }

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        logger.warning("No ANTHROPIC_API_KEY — falling back to regex classification")
        return _regex_fallback(message_text)

    client = anthropic.Anthropic(api_key=api_key)

    try:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=200,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": message_text}],
        )
        raw = response.content[0].text.strip()
        # Strip markdown code fences if present
        if raw.startswith("```"):
            raw = re.sub(r"^```(?:json)?\s*", "", raw)
            raw = re.sub(r"\s*```$", "", raw)
        result = json.loads(raw)
        return {
            "intent": result.get("intent", "unclear"),
            "task_reference": result.get("task_reference"),
            "query_type": result.get("query_type"),
            "reschedule_target": result.get("reschedule_target"),
            "confidence": result.get("confidence", 0.5),
        }
    except Exception as e:
        logger.error(f"Intent classification failed: {e}")
        return _regex_fallback(message_text)


def _regex_fallback(message_text: str) -> dict:
    """Fallback regex classification if Claude API is unavailable."""
    import re

    text = message_text.lower().strip()

    # Strip common greetings
    text = re.sub(r"^(hey\s+orion|hi\s+orion|orion|hey|hi|yo)\s*[,!.]?\s*", "", text)

    # Completion patterns (anywhere in message)
    if re.search(r"\b(done|finished|completed|checked off|mark done|i finished)\b", text):
        # Try to extract tier reference
        tier_match = re.search(r"\b([ABC]\d)\b", text, re.IGNORECASE)
        id_match = re.search(r"\b(mi-\d+|ai-\w+)\b", text)
        ref = None
        if tier_match:
            ref = tier_match.group(1).upper()
        elif id_match:
            ref = id_match.group(1)
        return {
            "intent": "complete_task",
            "task_reference": ref,
            "query_type": None,
            "reschedule_target": None,
            "confidence": 0.7,
        }

    # Query patterns
    if re.search(r"^(today|what'?s on today|show.*today|my tasks)", text):
        return {
            "intent": "query",
            "task_reference": None,
            "query_type": "today",
            "reschedule_target": None,
            "confidence": 0.8,
        }
    if re.search(r"^(list|what'?s open|show all|open tasks)", text):
        return {
            "intent": "query",
            "task_reference": None,
            "query_type": "list",
            "reschedule_target": None,
            "confidence": 0.8,
        }

    # Reschedule patterns
    reschedule_match = re.search(
        r"(reschedule|move|push)\s+(mi-\d+|ai-\w+|[ABC]\d)\s+(?:to\s+)?(\w+)", text
    )
    if reschedule_match:
        return {
            "intent": "reschedule",
            "task_reference": reschedule_match.group(2),
            "query_type": None,
            "reschedule_target": reschedule_match.group(3),
            "confidence": 0.7,
        }

    # Create patterns
    if re.search(r"^(add task|create task|track this|new task|remember to)\b", text):
        return {
            "intent": "create_task",
            "task_reference": None,
            "query_type": None,
            "reschedule_target": None,
            "confidence": 0.7,
        }

    # Default: unclear (NOT create_task)
    return {
        "intent": "unclear",
        "task_reference": None,
        "query_type": None,
        "reschedule_target": None,
        "confidence": 0.3,
    }
