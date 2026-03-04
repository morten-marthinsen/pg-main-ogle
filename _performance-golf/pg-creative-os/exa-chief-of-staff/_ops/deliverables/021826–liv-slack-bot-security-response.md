# Draft Response to Liv — Slack Bot Security Questions

> **Status**: DRAFT — Christopher reviews and sends
> **Context**: Liv asked about data access, scopes, external transmission, token storage, and flagged the Slack Pro audit trail gap. Christopher wants to frame Exa as a proactive assistant that reduces workload.
> **Date**: 2026-02-18

---

## Response (copy/paste-ready)

Hey Liv — really appreciate you asking these questions. This is exactly the kind of scrutiny this should get before anything goes live. Here's the full picture:

**What it does**: The bot would scan Slack channels I'm in and DMs sent to me once a day, then summarize what needs my attention and draft response options for me to review. Nothing gets sent automatically — I review everything and decide what to send myself. The goal is to help me stay on top of messages without things falling through the cracks.

**Your questions:**

**1. What data is accessed?**
Channel messages and DMs (text only). No files, reactions, user profiles beyond display names, or private channels I'm not already a member of.

**2. What scopes/permissions?**
Three read-only scopes:
- `channels:history` — read messages in channels I'm in
- `im:history` — read DMs sent to me
- `users:read` — resolve user IDs to display names

Zero write scopes. The bot structurally cannot post, edit, or delete messages. This isn't a policy decision — it's a technical constraint built into the permissions.

**3. Does data get transmitted externally?**
Yes — message text is sent to Anthropic's Claude API for summarization. Important context on that:
- Anthropic does not use API data to train their models (per their [API data policy](https://www.anthropic.com/policies/privacy))
- Summaries are stored locally on my machine only — not in any cloud service, database, or shared drive
- Raw message text is not stored after processing

**4. Token storage?**
The bot token lives in a `.env` file on my local machine, excluded from version control (git-ignored). Only I have access to the machine and the token.

**Things I want to flag proactively (gaps you may be thinking about):**

- **Employee awareness**: Should the team know a bot reads channel messages? I think transparency is the right call here. Happy to discuss what that communication looks like.
- **Slack Pro audit trail**: You're right that Pro doesn't give us the audit log that Business+ does. The mitigation is that the bot has zero write permissions — there's nothing to audit on the action side. On the read side, we can track what the bot processes through its own local logs.
- **Token rotation**: There's no automatic rotation. If the token were ever compromised, manual regeneration is the recovery path. I can set a calendar reminder to rotate it periodically if that's something we want as a policy.
- **Scope creep**: The bot is scoped to the PG workspace only and can't be extended to other workspaces without creating a new integration from scratch.

Happy to hop on a quick call or walk through the Slack app configuration together if you want to see the actual permission settings before I set anything up. Want me to grab 15 minutes?

---

## Exa Notes (not for Liv)

**Framing rationale**: Led with what the bot *does* for Christopher (reduces workload, catches dropped threads) rather than technical architecture. Answered her 4 questions directly, then proactively surfaced 4 additional considerations to build trust and show Christopher is thinking about this responsibly.

**What's NOT in the response** (intentionally):
- No mention of timing/schedule (5 AM runs)
- No mention of the broader Creative OS architecture
- No mention of other integrations (ClickUp, Gmail, etc.)
- No mention of AI model names or technical stack

**Follow-up**: If Liv becomes a recurring contact, consider creating a working-relationship file after this exchange resolves.
