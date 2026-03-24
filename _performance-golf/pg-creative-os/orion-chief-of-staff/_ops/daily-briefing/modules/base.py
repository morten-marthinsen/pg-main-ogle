"""
Base module for Orion Daily Briefing.
All modules extend BriefingModule and implement fetch_data() + analyze().
"""

import logging
import signal
import socket
import time
from abc import ABC, abstractmethod
from pathlib import Path
from typing import Any

MAX_RETRIES = 3
RETRY_BASE_DELAY = 65  # seconds — Anthropic rate limits reset per minute
CONNECTION_RETRY_DELAY = 10  # seconds — shorter backoff for transient network errors
ANTHROPIC_TIMEOUT = 120  # seconds — max wait per API call (prevents indefinite hangs)
MODULE_TIMEOUT = 300  # seconds — max time any single module can run (5 min)

MODULES_DIR = Path(__file__).resolve().parent


class BriefingModule(ABC):
    """Abstract base class for daily briefing modules."""

    name: str = "Base Module"
    key: str = "base"
    setup_required: str = ""

    def __init__(self, config: dict, env: dict, logger: logging.Logger, shared_state: dict = None):
        self.config = config
        self.env = env
        self.logger = logger
        self.shared_state = shared_state if shared_state is not None else {}
        self._data = None
        self._analysis = None
        self._error = None

    @abstractmethod
    def fetch_data(self) -> Any:
        """Fetch raw data from external APIs. Returns raw data."""

    @abstractmethod
    def analyze(self, data: Any) -> str:
        """Process raw data into markdown content.
        For AI-powered modules, call self.call_anthropic().
        Returns markdown string for the report section."""

    def call_anthropic(self, system_prompt: str, user_content: str,
                       max_tokens: int = 2000) -> str:
        """Shared Anthropic API call with retry on 429 rate limits."""
        try:
            import anthropic
        except ImportError:
            return "_Anthropic SDK not installed. Run: pip install anthropic_"

        api_key = self.env.get("ANTHROPIC_API_KEY", "")
        if not api_key:
            return "_ANTHROPIC_API_KEY not set in .env_"

        model = self.config.get("ai", {}).get("model", "claude-sonnet-4-20250514")
        client = anthropic.Anthropic(api_key=api_key, timeout=ANTHROPIC_TIMEOUT)

        for attempt in range(MAX_RETRIES):
            try:
                response = client.messages.create(
                    model=model,
                    max_tokens=max_tokens,
                    system=system_prompt,
                    messages=[{"role": "user", "content": user_content}],
                )
                return response.content[0].text
            except anthropic.RateLimitError as e:
                if attempt < MAX_RETRIES - 1:
                    delay = RETRY_BASE_DELAY * (attempt + 1)
                    self.logger.warning(
                        f"[{self.key}] Rate limited (attempt {attempt + 1}/{MAX_RETRIES}), "
                        f"waiting {delay}s..."
                    )
                    time.sleep(delay)
                else:
                    raise
            except anthropic.APITimeoutError as e:
                if attempt < MAX_RETRIES - 1:
                    self.logger.warning(
                        f"[{self.key}] API timeout (attempt {attempt + 1}/{MAX_RETRIES}): {e}. "
                        f"Retrying..."
                    )
                else:
                    self.logger.error(f"[{self.key}] API timeout after {MAX_RETRIES} attempts")
                    return f"_(API timeout — skipped after {MAX_RETRIES} attempts)_"
            except (ConnectionError, OSError, socket.gaierror) as e:
                if attempt < MAX_RETRIES - 1:
                    delay = CONNECTION_RETRY_DELAY * (attempt + 1)
                    self.logger.warning(
                        f"[{self.key}] Connection error (attempt {attempt + 1}/{MAX_RETRIES}): {e}. "
                        f"Retrying in {delay}s..."
                    )
                    time.sleep(delay)
                else:
                    raise

    def format_section(self) -> str:
        """Return the final markdown section for the report.

        If config has render: false, module still runs (fetch + analyze + shared_state
        side effects) but produces no visible section in the report.
        """
        # Check render flag — allows modules to run for side effects without rendering
        mod_config = self.config.get("modules", {}).get(self.key, {})
        if not mod_config.get("render", True):
            return ""

        if self._error:
            return (
                f"### {self.name}\n\n"
                f"> **MODULE ERROR**: {self._error}\n"
                f"> This module failed but others continued normally.\n"
            )
        if self._analysis:
            return f"### {self.name}\n\n{self._analysis}\n"
        return f"### {self.name}\n\n_No output produced._\n"

    def run(self) -> str:
        """Full module execution: fetch -> analyze -> format.
        Never raises — catches all exceptions for error isolation.
        Enforces MODULE_TIMEOUT to prevent any single module from hanging the pipeline."""

        def _timeout_handler(signum, frame):
            raise TimeoutError(f"Module {self.key} exceeded {MODULE_TIMEOUT}s timeout")

        try:
            self.logger.info(f"[{self.key}] Starting...")
            # Set per-module alarm (SIGALRM) — only works on Unix
            old_handler = signal.signal(signal.SIGALRM, _timeout_handler)
            signal.alarm(MODULE_TIMEOUT)
            try:
                self._data = self.fetch_data()
                self._analysis = self.analyze(self._data)
                self.logger.info(f"[{self.key}] Complete.")
            finally:
                signal.alarm(0)  # Cancel alarm
                signal.signal(signal.SIGALRM, old_handler)  # Restore handler
        except TimeoutError as e:
            self._error = f"TIMEOUT: {e}"
            self.logger.error(f"[{self.key}] {e}")
        except Exception as e:
            self._error = str(e)
            self.logger.error(f"[{self.key}] Failed: {e}")
        return self.format_section()
