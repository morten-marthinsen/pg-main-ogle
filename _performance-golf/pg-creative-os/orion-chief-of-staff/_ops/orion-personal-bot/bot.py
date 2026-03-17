#!/usr/bin/env python3
"""Orion (Personal) — Private Slack Task Bot.

Socket Mode Slack Bolt app for Christopher's personal task management.
Hard-coded user ID gate: only OWNER_SLACK_ID can interact.

Architecture: Every message routes through the Claude agent (agent.py),
which has natural conversation ability, thread memory, and KB tool access.

Usage:
    python3 bot.py
"""

import io
import logging
import os
import re
import sys
import time
import urllib.request
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

# ── File Attachment Limits ────────────────────────────────────────────────

FILE_AUTO_PROCESS_PAGES = 20
FILE_AUTO_PROCESS_CHARS = 50_000
FILE_HARD_REJECT_PAGES = 100

SUPPORTED_FILE_MIMETYPES = {
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}

# Pending file confirmations for oversized files (keyed by thread_ts)
_pending_file_confirmations: dict[str, dict] = {}
_PENDING_TTL_SECONDS = 600  # 10 minutes

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

    # Extract the message from the shortcut payload (simplified — may omit files)
    message = shortcut.get("message", {})
    msg_text = message.get("text", "").strip()
    msg_ts = message.get("ts", "")

    # Get channel info early — needed for message re-fetch
    channel_info = shortcut.get("channel", {})
    channel_id = channel_info.get("id", "")

    # Re-fetch the full message via Slack API to get files, attachments, blocks.
    # The shortcut payload's message object is sometimes simplified and omits files.
    # Only re-fetch if the shortcut payload is missing files (avoid unnecessary API call).
    if channel_id and msg_ts and not message.get("files"):
        try:
            history = client.conversations_history(
                channel=channel_id, latest=msg_ts, inclusive=True, limit=1
            )
            msgs = history.get("messages", [])
            if msgs:
                message = msgs[0]
                msg_text = message.get("text", "").strip()
                logger.info(
                    f"Re-fetched message: {len(message.get('files', []))} file(s), "
                    f"{len(msg_text)} chars text"
                )
        except Exception as e:
            logger.warning(f"Could not re-fetch message (using shortcut payload): {e}")
    else:
        logger.info(
            f"Shortcut payload has {len(message.get('files', []))} file(s) — "
            "skipping re-fetch"
        )

    if not msg_text and not message.get("files"):
        client.chat_postMessage(
            channel=OWNER_SLACK_ID,
            text="Couldn't extract text or files from that message. Try a text message or one with an attachment.",
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

    # Get channel name
    channel_label = ""
    if channel_id:
        try:
            conv_info = client.conversations_info(channel=channel_id)
            channel_label = conv_info["channel"].get("name", channel_id)
        except Exception:
            channel_label = channel_id

    # Extract Google Doc URLs from the full message
    gdoc_urls = _extract_google_doc_urls(message)

    # Extract supported file attachments (PDF, Word)
    file_attachments = _extract_file_attachments(message)
    bot_token = os.environ.get("SLACK_BOT_TOKEN", "")

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
    if msg_text:
        context_parts.append(f'Message: "{msg_text}"')

    # Warn about unsupported .doc files
    for f in message.get("files", []):
        name = f.get("name", "")
        mimetype = f.get("mimetype", "")
        if mimetype == "application/msword" or (name.endswith(".doc") and not name.endswith(".docx")):
            context_parts.append(
                f"\n:warning: File `{name}` is in old .doc format (not supported). "
                "Please convert to .docx or PDF and try again."
            )

    logger.info(
        f"Save Context shortcut: {len(file_attachments)} file(s), "
        f"{len(gdoc_urls)} gdoc(s), text: {(msg_text or '[none]')[:60]}..."
    )

    try:
        # Post a placeholder to start the thread
        initial = client.chat_postMessage(
            channel=OWNER_SLACK_ID,
            text=":file_folder: Processing Save Context shortcut...",
        )
        dm_channel = initial["channel"]
        thread_ts = initial["ts"]

        # Process file attachments if present
        if file_attachments:
            extracted_texts = []
            for fa in file_attachments:
                download_url = fa["url_private_download"]
                if not download_url:
                    logger.warning(f"No download URL for file: {fa['name']}")
                    continue

                try:
                    file_bytes = _download_slack_file(download_url, bot_token)
                except Exception as e:
                    logger.error(f"Failed to download {fa['name']}: {e}")
                    context_parts.append(
                        f"\n:warning: Could not download file `{fa['name']}` — proposing metadata from text only."
                    )
                    continue

                result = _extract_text_from_file(file_bytes, fa["mimetype"], fa["name"])

                # Hard reject: over 100 pages
                if result["page_count"] is not None and result["page_count"] > FILE_HARD_REJECT_PAGES:
                    client.chat_update(
                        channel=dm_channel,
                        ts=thread_ts,
                        text=(
                            f":no_entry: `{fa['name']}` is {result['page_count']} pages — "
                            f"too large for context saving (limit: {FILE_HARD_REJECT_PAGES} pages). "
                            "Please extract the relevant section and try again."
                        ),
                    )
                    return

                # Confirmation needed: over auto-process threshold
                needs_confirm = (
                    (result["page_count"] is not None and result["page_count"] > FILE_AUTO_PROCESS_PAGES)
                    or result["char_count"] > FILE_AUTO_PROCESS_CHARS
                )
                if needs_confirm:
                    page_info = f"{result['page_count']} pages, " if result["page_count"] else ""
                    _pending_file_confirmations[thread_ts] = {
                        "created_at": time.time(),
                        "file_results": [result],
                        "remaining_files": file_attachments[file_attachments.index(fa) + 1:],
                        "file_bytes_cache": {fa["name"]: file_bytes},
                        "context_parts": context_parts,
                        "gdoc_urls": gdoc_urls,
                        "dm_channel": dm_channel,
                    }
                    client.chat_update(
                        channel=dm_channel,
                        ts=thread_ts,
                        text=(
                            f":page_facing_up: `{fa['name']}` is large ({page_info}"
                            f"{result['char_count']:,} chars of text). "
                            "Do you want me to process it? Reply *yes* to proceed or *skip* to save context from message text only."
                        ),
                    )
                    return

                extracted_texts.append(result)

            # Inject extracted file content into the prompt
            for ft in extracted_texts:
                page_info = f", {ft['page_count']} pages" if ft["page_count"] else ""
                context_parts.append(
                    f"\n--- ATTACHED FILE: {ft['filename']} ({ft['char_count']:,} chars{page_info}) ---\n"
                    f"{ft['text']}\n"
                    "--- END FILE ---\n"
                    "Use this file content alongside any Google Doc content and message text to propose metadata."
                )

        prompt = "\n".join(context_parts)

        reply = process_message(prompt, thread_ts)
        logger.info(f"Save Context agent reply ({len(reply)} chars): {reply[:300]}")
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


def _extract_file_attachments(message: dict) -> list[dict]:
    """Extract supported file attachments (PDF, Word) from a Slack message.

    Returns list of dicts with keys: name, mimetype, size, url_private_download.
    Logs a warning for unsupported .doc (old Word format) files.
    """
    files = []
    for f in message.get("files", []):
        mimetype = f.get("mimetype", "")
        name = f.get("name", "unknown")
        if mimetype in SUPPORTED_FILE_MIMETYPES:
            files.append({
                "name": name,
                "mimetype": mimetype,
                "size": f.get("size", 0),
                "url_private_download": f.get("url_private_download", ""),
            })
        elif mimetype == "application/msword" or name.endswith(".doc"):
            logger.warning(f"Unsupported old .doc format: {name}")
    return files


def _download_slack_file(url: str, bot_token: str) -> bytes:
    """Download a file from Slack using bot token authentication."""
    req = urllib.request.Request(
        url, headers={"Authorization": f"Bearer {bot_token}"}
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read()


def _extract_text_from_file(file_bytes: bytes, mimetype: str, filename: str) -> dict:
    """Extract text content from PDF or Word doc bytes.

    Returns dict with keys: text, page_count (int or None), char_count, filename.
    For image-based PDFs with no extractable text, returns a warning in the text field.
    """
    text = ""
    page_count = None

    if mimetype == "application/pdf":
        import fitz  # pymupdf

        doc = fitz.open(stream=file_bytes, filetype="pdf")
        page_count = doc.page_count

        # Strategy 1: Standard text extraction
        pages_text = []
        for page in doc:
            pages_text.append(page.get_text())
        text = "\n\n".join(pages_text)

        # Strategy 2: If standard extraction yields little, try "text" with sort flag
        if len(text.strip()) < 100 and page_count > 0:
            logger.info(f"PDF standard extraction low ({len(text.strip())} chars), trying sort=True")
            pages_text = []
            for page in doc:
                pages_text.append(page.get_text(sort=True))
            alt_text = "\n\n".join(pages_text)
            if len(alt_text.strip()) > len(text.strip()):
                text = alt_text

        # Strategy 3: Try extracting from annotations/widgets
        if len(text.strip()) < 100 and page_count > 0:
            logger.info("Trying annotation/widget text extraction")
            annot_texts = []
            for page in doc:
                for annot in page.annots() or []:
                    info = annot.info
                    if info.get("content"):
                        annot_texts.append(info["content"])
                for widget in page.widgets() or []:
                    if widget.field_value:
                        annot_texts.append(widget.field_value)
            if annot_texts:
                text = text + "\n\n" + "\n".join(annot_texts)

        logger.info(f"PDF extraction: {page_count} pages, {len(text.strip())} chars extracted")
        doc.close()

        # Fallback: send raw PDF to Claude for native document reading
        if page_count > 0 and len(text.strip()) < 50:
            logger.info(f"PDF text extraction failed ({len(text.strip())} chars) — trying Claude native PDF reading")
            pdf_text = _read_pdf_with_claude(file_bytes, page_count)
            if pdf_text and len(pdf_text.strip()) > len(text.strip()):
                text = pdf_text
                logger.info(f"Claude PDF reading extracted {len(text)} chars")
            else:
                text = (
                    f"[WARNING: This PDF ({page_count} pages) could not be read. "
                    "Neither text extraction nor Claude PDF reading returned content. "
                    "Try re-sharing as a Google Doc or text-based PDF.]"
                )

    elif mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        from docx import Document

        doc = Document(io.BytesIO(file_bytes))
        paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
        text = "\n\n".join(paragraphs)

    return {
        "text": text,
        "page_count": page_count,
        "char_count": len(text),
        "filename": filename,
    }


def _read_pdf_with_claude(file_bytes: bytes, page_count: int) -> str:
    """Send raw PDF bytes to Claude for native document reading.

    Uses the Claude API's native PDF/document support — sends the actual PDF
    file rather than rendering pages to images. This handles PDFs that PyMuPDF
    can't render (Canva exports, flattened vectors, non-standard encodings).
    """
    import base64

    try:
        api_key = os.environ.get("ANTHROPIC_API_KEY")
        if not api_key:
            logger.error("No ANTHROPIC_API_KEY for PDF reading")
            return ""

        import anthropic
        client = anthropic.Anthropic(api_key=api_key)

        # Save raw PDF for debugging
        debug_pdf_path = Path("/tmp/orion-pdf-debug.pdf")
        debug_pdf_path.write_bytes(file_bytes)
        logger.info(f"Debug PDF saved to {debug_pdf_path} ({len(file_bytes)} bytes)")
        logger.info(f"PDF header (first 20 bytes): {file_bytes[:20]}")

        pdf_b64 = base64.b64encode(file_bytes).decode("utf-8")
        pdf_size_kb = len(file_bytes) / 1024
        logger.info(f"Sending PDF to Claude: {page_count} pages, {pdf_size_kb:.1f} KB, b64 len: {len(pdf_b64)}")

        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4000,
            messages=[{
                "role": "user",
                "content": [
                    {
                        "type": "document",
                        "source": {
                            "type": "base64",
                            "media_type": "application/pdf",
                            "data": pdf_b64,
                        },
                    },
                    {
                        "type": "text",
                        "text": (
                            "Extract ALL text content from this PDF document. "
                            "Preserve the original structure (headings, paragraphs, bullet points, tables). "
                            "Return only the extracted text, no commentary or preamble."
                        ),
                    },
                ],
            }],
        )
        result_text = response.content[0].text if response.content else ""
        logger.info(f"Claude PDF reading output ({len(result_text)} chars): {result_text[:300]}")
        return result_text

    except Exception as e:
        logger.error(f"Claude PDF reading failed: {e}", exc_info=True)
        return ""


def _cleanup_stale_pending_confirmations():
    """Remove pending file confirmations older than TTL."""
    now = time.time()
    expired = [
        ts for ts, data in _pending_file_confirmations.items()
        if now - data.get("created_at", 0) > _PENDING_TTL_SECONDS
    ]
    for ts in expired:
        del _pending_file_confirmations[ts]
        logger.info(f"Cleaned up stale pending file confirmation: {ts}")


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

    # Cleanup stale pending file confirmations
    _cleanup_stale_pending_confirmations()

    # Check for pending file confirmation responses
    if thread_ts in _pending_file_confirmations:
        response = text.lower().strip()
        pending = _pending_file_confirmations.pop(thread_ts)
        dm_channel = pending["dm_channel"]
        context_parts = pending["context_parts"]

        if response in ("yes", "y", "proceed"):
            logger.info("File confirmation accepted — processing files")
            try:
                # Include already-extracted file results
                for ft in pending.get("file_results", []):
                    page_info = f", {ft['page_count']} pages" if ft["page_count"] else ""
                    context_parts.append(
                        f"\n--- ATTACHED FILE: {ft['filename']} ({ft['char_count']:,} chars{page_info}) ---\n"
                        f"{ft['text']}\n"
                        "--- END FILE ---\n"
                        "Use this file content alongside any Google Doc content and message text to propose metadata."
                    )

                prompt = "\n".join(context_parts)
                reply = process_message(prompt, thread_ts)
                if reply:
                    say(text=reply, thread_ts=thread_ts)
            except Exception as e:
                logger.error(f"File confirmation processing error: {e}", exc_info=True)
                say(text="Something went wrong processing the file. Try again?", thread_ts=thread_ts)
            return

        elif response in ("skip", "no", "n"):
            logger.info("File confirmation skipped — proceeding with text only")
            try:
                prompt = "\n".join(context_parts)
                reply = process_message(prompt, thread_ts)
                if reply:
                    say(text=reply, thread_ts=thread_ts)
            except Exception as e:
                logger.error(f"Skip-file processing error: {e}", exc_info=True)
                say(text="Something went wrong processing that. Try again?", thread_ts=thread_ts)
            return

        else:
            # Unrecognized response — re-store and prompt again
            pending["created_at"] = time.time()  # refresh TTL
            _pending_file_confirmations[thread_ts] = pending
            say(
                text="Reply *yes* to process the file, or *skip* to save context from message text only.",
                thread_ts=thread_ts,
            )
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
