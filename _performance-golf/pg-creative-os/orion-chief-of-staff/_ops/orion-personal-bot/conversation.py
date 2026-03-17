"""Conversation State Machine — multi-turn thread tracking for Orion Personal Bot.

DEPRECATED: This module is no longer used by the bot. All conversation routing now goes
through the Claude agent (agent.py) which handles multi-turn context natively.
Kept for reference only — safe to remove in a future cleanup.

In-memory state keyed by thread_ts. Only 1 user (Christopher), no persistence needed.
States expire after 10 minutes.
"""

import time
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class ConversationState:
    """Tracks a single multi-turn conversation thread."""
    flow: str  # "create" or "complete"
    step: str  # Flow-specific step name
    thread_ts: str
    created_at: float = field(default_factory=time.time)
    task_data: dict = field(default_factory=dict)

    @property
    def is_expired(self) -> bool:
        return (time.time() - self.created_at) > 600  # 10 minutes


class ConversationManager:
    """Manages conversation state across threads."""

    def __init__(self):
        self._states: dict[str, ConversationState] = {}

    def get(self, thread_ts: str) -> Optional[ConversationState]:
        """Get active conversation state for a thread, or None if expired/missing."""
        state = self._states.get(thread_ts)
        if state is None:
            return None
        if state.is_expired:
            del self._states[thread_ts]
            return None
        return state

    def start(self, thread_ts: str, flow: str, step: str, task_data: dict = None) -> ConversationState:
        """Start a new conversation in a thread."""
        state = ConversationState(
            flow=flow,
            step=step,
            thread_ts=thread_ts,
            task_data=task_data or {},
        )
        self._states[thread_ts] = state
        return state

    def update(self, thread_ts: str, step: str, **kwargs) -> Optional[ConversationState]:
        """Update conversation step and merge additional task_data."""
        state = self.get(thread_ts)
        if state is None:
            return None
        state.step = step
        state.task_data.update(kwargs)
        return state

    def end(self, thread_ts: str) -> None:
        """End a conversation (remove state)."""
        self._states.pop(thread_ts, None)

    def cleanup_expired(self) -> int:
        """Remove all expired states. Returns count removed."""
        expired = [ts for ts, s in self._states.items() if s.is_expired]
        for ts in expired:
            del self._states[ts]
        return len(expired)
