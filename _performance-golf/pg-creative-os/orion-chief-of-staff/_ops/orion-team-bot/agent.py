"""Orion Team Agent — Claude-powered creative intelligence assistant.

Serves the entire PG team with read-only access to performance data,
pipeline status, and strategic recommendations. No access to Christopher's
private data (tasks, KB, stakeholder map, working relationships).

Architecture:
    Slack message → agent.process_message(text, thread_ts) → Claude API
    Claude sees: system prompt + thread history + data tools
    Claude responds: natural language + optional tool calls
"""

from __future__ import annotations

import json
import logging
import os
import time
from datetime import date
from typing import Optional

import anthropic
from pathlib import Path

from data_sources import (
    create_google_doc,
    fetch_agent_status,
    fetch_clickup_pipeline,
    fetch_sss_by_funnel,
    fetch_sss_performance_summary,
    fetch_sss_strategy,
    fetch_sss_top_ads,
    fetch_winning_angles,
    read_google_doc,
    write_to_google_doc,
)

logger = logging.getLogger(__name__)

# ── Context Loading ───────────────────────────────────────────────────────

CONTEXT_DIR = Path(__file__).parent / "context"
USERS_DIR = CONTEXT_DIR / "users"


def _load_context_files() -> str:
    """Load all .md files from context/ (product catalog, frameworks, etc.)."""
    if not CONTEXT_DIR.exists():
        return ""
    parts = []
    for f in sorted(CONTEXT_DIR.glob("*.md")):
        parts.append(f.read_text(encoding="utf-8"))
    return "\n\n---\n\n".join(parts)


def _load_user_profile(name: str) -> str | None:
    """Load a user profile by name (case-insensitive filename match)."""
    if not USERS_DIR.exists():
        return None
    for f in USERS_DIR.glob("*.md"):
        if f.stem.lower() == name.lower():
            return f.read_text(encoding="utf-8")
    return None


CONTEXT_KNOWLEDGE = _load_context_files()


def _search_product_context(product: str) -> str:
    """Search loaded context knowledge for a specific product section."""
    if not CONTEXT_KNOWLEDGE:
        return "No product catalog loaded."

    product_lower = product.lower().strip()
    lines = CONTEXT_KNOWLEDGE.split("\n")

    # Find the matching product section (### heading that contains the query)
    result_lines = []
    capturing = False
    for line in lines:
        if line.startswith("### ") and product_lower in line.lower():
            capturing = True
            result_lines.append(line)
            continue
        if capturing:
            if line.startswith("### "):
                break  # Next product section
            if line.startswith("## ") and result_lines:
                break  # Next major section
            result_lines.append(line)

    if result_lines:
        return "\n".join(result_lines).strip()

    # Fallback: search for product name/code anywhere in context
    matches = []
    for i, line in enumerate(lines):
        if product_lower in line.lower():
            start = max(0, i - 1)
            end = min(len(lines), i + 4)
            matches.append("\n".join(lines[start:end]))

    if matches:
        return (
            f"*Partial matches for '{product}':*\n\n"
            + "\n---\n".join(matches[:3])
        )

    return (
        f"No product info found for '{product}'. "
        f"Try the full product name (e.g., 'SF2', 'ONE.1', 'PGF') "
        f"or a keyword like 'anti-slice' or 'putter'."
    )


def _build_copy_review_context(copy_text: str, fmt: str, product: str) -> str:
    """Build context for Claude to evaluate copy against PG frameworks."""
    parts = [
        f"*Copy to Review* ({fmt})\n",
        f"```\n{copy_text}\n```\n",
    ]

    if product:
        product_info = _search_product_context(product)
        parts.append(f"*Product Context:*\n{product_info}\n")

    parts.append(
        "*Evaluate this copy against these PG frameworks:*\n"
        "1. *Six-Axis Model* — Which axes does it elevate? (Focus, Suggestibility, Compliance are priority for paid ads)\n"
        "2. *Golf Suggestibility Principle* — Does it teach something new? Pass the 'I didn't know that' test?\n"
        "3. *8 Laws of Ad Angle Ideation* — Which laws does it leverage?\n"
        "4. *Buyer Persona fit* — Which P1-P9 persona(s) does it target?\n\n"
        "*Return:*\n"
        "- Grade (A/B/C/D) with one-line justification\n"
        "- Top 2-3 strengths (reference specific frameworks)\n"
        "- Top 2-3 weaknesses (reference specific frameworks)\n"
        "- 2-3 specific improvement suggestions\n"
        "- If product context is available, check mechanism/claim accuracy"
    )

    return "\n".join(parts)


def _build_angle_suggestion_context(product: str, count: int) -> str:
    """Build context for Claude to suggest angles, grounded in real data."""
    parts = []

    # Get product context
    product_info = _search_product_context(product)
    parts.append(f"*Product Context:*\n{product_info}\n")

    # Get real performance data for this product's funnel
    try:
        angle_data = fetch_winning_angles(funnel=product)
        parts.append(f"*Current SSS Performance Data:*\n{angle_data}\n")
    except Exception:
        parts.append("_(Could not fetch SSS data — suggest angles from product context + frameworks only)_\n")

    parts.append(
        f"*Generate {count} new angle suggestions* grounded in:\n"
        "1. The performance data above (what's already winning, gaps to exploit)\n"
        "2. The product's mechanism and USP\n"
        "3. PG creative frameworks (8 Laws, Six-Axis, Golf Suggestibility)\n"
        "4. Buyer personas P1-P9\n\n"
        "*For each angle:*\n"
        "- Angle name (2-5 words)\n"
        "- Which Law/framework it leverages\n"
        "- Target persona(s)\n"
        "- Sample hook (one line)\n"
        "- Why it should work (data-grounded reasoning)"
    )

    return "\n".join(parts)


WEEKDAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

# ── Tools ──────────────────────────────────────────────────────────────────

TOOLS = [
    {
        "name": "get_performance_summary",
        "description": (
            "Get the SSS Performance Dashboard — key metrics including ROAS, "
            "spend, revenue, and performance trends across campaigns."
        ),
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": [],
        },
    },
    {
        "name": "get_top_ads",
        "description": (
            "Get the top-performing ads ranked by ROAS or spend. "
            "Shows ad names, metrics, and which angles are winning."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "limit": {
                    "type": "integer",
                    "description": "Number of top ads to return (default 10)",
                },
            },
            "required": [],
        },
    },
    {
        "name": "get_pipeline_status",
        "description": (
            "Get the ClickUp creative pipeline — active tasks, their status, "
            "assignees, and due dates. Shows what's in progress and what's coming."
        ),
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": [],
        },
    },
    {
        "name": "get_by_funnel",
        "description": (
            "Get performance breakdown by funnel (product) — assets, spend, "
            "ROAS, win rate for each funnel (e.g., 357, SF2, HTKT)."
        ),
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": [],
        },
    },
    {
        "name": "get_strategy_recommendations",
        "description": (
            "Get Tess-generated creative strategy recommendations — which ads "
            "to expand, what expansion types to try, and priority rankings."
        ),
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": [],
        },
    },
    {
        "name": "get_agent_status",
        "description": (
            "Get the Creative OS agent status — which AI agents (Orion, Tess, "
            "Veda, Neco) are operational and their current build state."
        ),
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": [],
        },
    },
    {
        "name": "get_user_profile",
        "description": (
            "Load a team member's creative profile — voice, preferences, "
            "active projects, reference docs. Use at the start of creative work "
            "to match their writing style and understand their context."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Person's name (e.g., 'Brixton')",
                },
            },
            "required": ["name"],
        },
    },
    {
        "name": "get_winning_angles",
        "description": (
            "Get root angles from SSS with win rates, spend, and ROAS. "
            "Shows which creative angles are performing best. "
            "Optional funnel filter (e.g., 'SF2', '357')."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "funnel": {
                    "type": "string",
                    "description": "Optional funnel code to filter by (e.g., 'SF2', '357', 'HTKT')",
                },
            },
            "required": [],
        },
    },
    {
        "name": "get_product_context",
        "description": (
            "Get detailed product information from the PG catalog — "
            "mechanism, USP, target personas, funnel code. Use when writing "
            "copy or giving feedback about a specific product."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "product": {
                    "type": "string",
                    "description": "Product name or code (e.g., 'SF2', 'ONE.1', 'PGF', 'anti-slice')",
                },
            },
            "required": ["product"],
        },
    },
    {
        "name": "review_copy",
        "description": (
            "Evaluate ad copy against PG creative frameworks (Six-Axis, "
            "Golf Suggestibility, 8 Laws). Returns the copy with evaluation "
            "framework for grading. Use when someone shares copy for feedback."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "copy_text": {
                    "type": "string",
                    "description": "The ad copy text to review",
                },
                "format": {
                    "type": "string",
                    "description": "Copy format (e.g., 'hook', 'headline', 'script', 'social post')",
                },
                "product": {
                    "type": "string",
                    "description": "Product the copy is for (optional)",
                },
            },
            "required": ["copy_text"],
        },
    },
    {
        "name": "suggest_angles",
        "description": (
            "Generate data-grounded angle suggestions for a product. "
            "Combines real SSS performance data with product context and "
            "creative frameworks. Use when someone asks 'what angles should we try?'"
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "product": {
                    "type": "string",
                    "description": "Product name or code (e.g., 'SF2', 'ONE.1')",
                },
                "count": {
                    "type": "integer",
                    "description": "Number of angles to suggest (default 5)",
                },
            },
            "required": ["product"],
        },
    },
    {
        "name": "read_google_doc",
        "description": (
            "Read a Google Doc's content. Accepts a doc ID or full URL. "
            "Use when someone shares a Google Doc link for review or reference."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "doc_id": {
                    "type": "string",
                    "description": "Google Doc ID or full URL",
                },
            },
            "required": ["doc_id"],
        },
    },
    {
        "name": "write_google_doc",
        "description": (
            "Write text to an existing Google Doc (append by default). "
            "Use when the user asks to add content, revisions, or notes to a doc."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "doc_id": {
                    "type": "string",
                    "description": "Google Doc ID or full URL",
                },
                "text": {
                    "type": "string",
                    "description": "Text to write to the document",
                },
                "append": {
                    "type": "boolean",
                    "description": "Append to end (true, default) or insert at beginning (false)",
                },
            },
            "required": ["doc_id", "text"],
        },
    },
    {
        "name": "create_google_doc",
        "description": (
            "Create a new Google Doc with optional initial content. "
            "Returns the document ID and link."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string",
                    "description": "Document title",
                },
                "content": {
                    "type": "string",
                    "description": "Optional initial content for the document",
                },
            },
            "required": ["title"],
        },
    },
]


# ── Tool Execution ─────────────────────────────────────────────────────────


def execute_tool(tool_name: str, tool_input: dict) -> str:
    """Execute a tool call and return the result as a string."""
    try:
        if tool_name == "get_performance_summary":
            return fetch_sss_performance_summary()

        elif tool_name == "get_top_ads":
            limit = tool_input.get("limit", 10)
            return fetch_sss_top_ads(limit=limit)

        elif tool_name == "get_pipeline_status":
            return fetch_clickup_pipeline()

        elif tool_name == "get_by_funnel":
            return fetch_sss_by_funnel()

        elif tool_name == "get_strategy_recommendations":
            return fetch_sss_strategy()

        elif tool_name == "get_agent_status":
            return fetch_agent_status()

        elif tool_name == "get_user_profile":
            name = tool_input.get("name", "")
            profile = _load_user_profile(name)
            if profile:
                return f"*Profile loaded for {name}*\n\n{profile}"
            # List available profiles
            available = []
            if USERS_DIR.exists():
                available = [f.stem.title() for f in USERS_DIR.glob("*.md")]
            if available:
                return (
                    f"No profile found for '{name}'. "
                    f"Available profiles: {', '.join(available)}. "
                    f"You can still help — just note you don't have voice/style "
                    f"preferences for this person yet."
                )
            return (
                f"No profile found for '{name}' and no profiles exist yet. "
                f"Proceed without voice matching — learn their preferences as you go."
            )

        elif tool_name == "get_winning_angles":
            funnel = tool_input.get("funnel")
            return fetch_winning_angles(funnel=funnel)

        elif tool_name == "get_product_context":
            product = tool_input.get("product", "")
            return _search_product_context(product)

        elif tool_name == "review_copy":
            copy_text = tool_input.get("copy_text", "")
            fmt = tool_input.get("format", "ad copy")
            product = tool_input.get("product", "")
            return _build_copy_review_context(copy_text, fmt, product)

        elif tool_name == "suggest_angles":
            product = tool_input.get("product", "")
            count = tool_input.get("count", 5)
            return _build_angle_suggestion_context(product, count)

        elif tool_name == "read_google_doc":
            doc_id = tool_input.get("doc_id", "")
            return read_google_doc(doc_id)

        elif tool_name == "write_google_doc":
            doc_id = tool_input.get("doc_id", "")
            text = tool_input.get("text", "")
            append = tool_input.get("append", True)
            return write_to_google_doc(doc_id, text, append=append)

        elif tool_name == "create_google_doc":
            title = tool_input.get("title", "Untitled")
            content = tool_input.get("content", "")
            return create_google_doc(title, content=content)

        else:
            return f"Unknown tool: {tool_name}"

    except Exception as e:
        logger.error(f"Tool execution error ({tool_name}): {e}")
        return f"Error executing {tool_name}: {e}"


# ── System Prompt ──────────────────────────────────────────────────────────


SYSTEM_PROMPT = """\
You are Orion, Performance Golf's Creative Intelligence system. You combine \
real performance data with creative strategy frameworks to help the PG team \
write better copy, find winning angles, and make smarter creative decisions.

Today is {day_name}, {date_str}.

{user_context}

## Data Tools
- *get_performance_summary* — SSS metrics: ROAS, spend, revenue, win rate, top root angles
- *get_top_ads* — best-performing ads by spend, with ROAS and classification
- *get_by_funnel* — performance breakdown per product funnel (357, SF2, HTKT, etc.)
- *get_strategy_recommendations* — Tess-generated expansion recommendations
- *get_pipeline_status* — ClickUp creative tasks, status, assignees, due dates
- *get_agent_status* — Creative OS AI system operational status

## Creative Tools
- *get_user_profile* — load a team member's voice, preferences, active projects
- *get_winning_angles* — root angles from SSS with win rates and spend (optional funnel filter)
- *get_product_context* — detailed product info from PG catalog (mechanism, USP, personas)
- *review_copy* — evaluate copy against PG creative frameworks (Six-Axis, Suggestibility, 8 Laws)
- *suggest_angles* — generate data-grounded angle suggestions for a product

## Google Docs Tools
- *read_google_doc* — read a Google Doc by ID or URL (use when someone shares a doc for review)
- *write_google_doc* — append or insert text into an existing Google Doc
- *create_google_doc* — create a new Google Doc with optional initial content

## Google Docs Rules
- *Formatting*: Always use proper formatting — *bold* for headings/subheadings, _italics_ for shooting notes/directions, and clean visual hierarchy with line breaks.
- *Revisions*: When revising copy in a Google Doc, replace the original version. Do NOT append a "revised" section below it — overwrite the original with the improved version.

## Creative Knowledge

{context_knowledge}

## Creative Workflow (MANDATORY for copy/feedback requests)

### Step 1: Identify the user
If this is a new thread and the user hasn't been identified yet, ask:
"Hey! Who am I helping today?"
Use the `get_user_profile` tool to load their voice, preferences, and active projects.
If no profile exists, note that and proceed — you'll learn their preferences as you go.

### Step 2: Understand the project
When asked for copy feedback, writing, or creative work:
- If they share a Google Doc link, read it first with `read_google_doc`
- Ask what the project is if not obvious from context (format, audience, channel, constraints)
- Check their active projects list — this might be an existing project

### Step 3: Confirm understanding
Before producing ANY copy or detailed feedback, write back:
- Your understanding of their intent
- What format/constraints you see
- What voice/style you'll use
Wait for their confirmation. "Yes" = proceed. Corrections = adjust.

### Step 4: Produce
- Write in THEIR voice (from profile), not generic PG copy voice
- Ground in real performance data and PG frameworks
- For feedback: grade + specific improvements, referencing frameworks
- For new copy: draft in their style, explain your creative choices

## Rules
- Be concise. This is Slack — tight responses, not essays.
- Use Slack mrkdwn formatting (*bold*, _italic_, `code`).
- When asked about performance, fetch real data — never guess or make up numbers.
- Never fabricate product names, mechanisms, or claims. Use the product catalog.
- Draw on creative frameworks (Six-Axis, Golf Suggestibility, 8 Laws) for copy advice.
- Evaluate copy against frameworks with specific, actionable feedback.
- Write in the user's voice when producing copy (load from their profile).
- If you don't have the data to answer, say so clearly and suggest who might.
- Do NOT discuss internal task management, delegation decisions, or IC workflows.
- Do NOT share information about Christopher's personal schedule, tasks, \
or strategic planning. Those are private.
- If asked about something outside your data (HR, finance, etc.), redirect \
to the appropriate person.
"""


def _build_system_prompt(user_name: str, user_profile: str | None = None) -> str:
    today = date.today()

    if user_profile:
        user_context = f"## Current User: {user_name}\n\n{user_profile}"
    else:
        user_context = (
            f"Current user: {user_name} (no profile loaded yet — "
            f"use get_user_profile when they identify themselves)"
        )

    return SYSTEM_PROMPT.format(
        day_name=WEEKDAY_NAMES[today.weekday()],
        date_str=today.strftime("%B %d, %Y"),
        user_context=user_context,
        context_knowledge=CONTEXT_KNOWLEDGE or "(No context files loaded)",
    )


# ── Thread History ─────────────────────────────────────────────────────────


class ThreadHistory:
    """In-memory thread history for multi-turn conversations."""

    def __init__(self, max_messages: int = 20, ttl_seconds: int = 3600):
        self._threads: dict[str, list] = {}
        self._timestamps: dict[str, float] = {}
        self._max_messages = max_messages
        self._ttl = ttl_seconds

    def add_user_message(self, thread_ts: str, text: str):
        self._ensure_thread(thread_ts)
        self._threads[thread_ts].append({"role": "user", "content": text})
        self._trim(thread_ts)

    def add_assistant_message(self, thread_ts: str, text: str):
        self._ensure_thread(thread_ts)
        self._threads[thread_ts].append({"role": "assistant", "content": text})
        self._trim(thread_ts)

    def get_messages(self, thread_ts: str) -> list:
        self._cleanup_expired()
        return list(self._threads.get(thread_ts, []))

    def _ensure_thread(self, thread_ts: str):
        if thread_ts not in self._threads:
            self._threads[thread_ts] = []
        self._timestamps[thread_ts] = time.time()

    def _trim(self, thread_ts: str):
        if len(self._threads[thread_ts]) > self._max_messages:
            self._threads[thread_ts] = self._threads[thread_ts][-self._max_messages:]

    def _cleanup_expired(self):
        now = time.time()
        expired = [ts for ts, t in self._timestamps.items() if now - t > self._ttl]
        for ts in expired:
            self._threads.pop(ts, None)
            self._timestamps.pop(ts, None)


# ── Agent Core ─────────────────────────────────────────────────────────────

_client: Optional[anthropic.Anthropic] = None
thread_history = ThreadHistory()


def _get_client() -> anthropic.Anthropic:
    global _client
    if _client is None:
        api_key = os.environ.get("ANTHROPIC_API_KEY")
        if not api_key:
            raise RuntimeError("ANTHROPIC_API_KEY not set")
        _client = anthropic.Anthropic(api_key=api_key)
    return _client


def process_message(
    text: str,
    thread_ts: str,
    user_name: str = "team member",
) -> str:
    """Process a message through the Claude agent.

    Args:
        text: The message text from the team member
        thread_ts: Slack thread timestamp for conversation tracking
        user_name: Display name of the person asking

    Returns:
        The agent's response text for Slack
    """
    client = _get_client()
    system_prompt = _build_system_prompt(user_name)

    thread_history.add_user_message(thread_ts, text)
    messages = thread_history.get_messages(thread_ts)

    max_turns = 5
    for _ in range(max_turns):
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system=system_prompt,
            messages=messages,
            tools=TOOLS,
        )

        tool_calls = [b for b in response.content if b.type == "tool_use"]

        if not tool_calls:
            text_parts = [b.text for b in response.content if b.type == "text"]
            reply = "\n".join(text_parts).strip()
            thread_history.add_assistant_message(thread_ts, reply)
            return reply

        # Process tool calls
        messages.append({"role": "assistant", "content": response.content})

        tool_results = []
        for tc in tool_calls:
            logger.info(f"Tool call: {tc.name}({tc.input})")
            result = execute_tool(tc.name, tc.input)
            tool_results.append({
                "type": "tool_result",
                "tool_use_id": tc.id,
                "content": result,
            })

        messages.append({"role": "user", "content": tool_results})

    # Max turns reached
    text_parts = [b.text for b in response.content if b.type == "text"]
    reply = "\n".join(text_parts).strip() or "I had trouble processing that. Could you try again?"
    thread_history.add_assistant_message(thread_ts, reply)
    return reply
