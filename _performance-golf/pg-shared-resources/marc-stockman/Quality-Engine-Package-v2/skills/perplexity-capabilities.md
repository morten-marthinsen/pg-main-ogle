---
name: perplexity-capabilities
description: "Authoritative inventory of Perplexity Computer capabilities and enforcement protocol against incorrect inability claims."
---

# Perplexity Computer — Capabilities Inventory

**Version:** 1.2 | March 7, 2026
**Scope:** Always-active reference. Consulted before any claim of inability.
**Activation:** This skill must be loaded to take effect. Add to `marc-ops-framework` routing table with trigger: "Auto-loads when the AI encounters a capability question or is about to claim inability." The enforcement protocol in Section 5 also works as a behavioral principle even without the skill loaded — the system prompt already instructs the AI to call `list_external_tools` before claiming inability. This skill provides the comprehensive inventory and structured protocol on top of that baseline.
**Upstream source:** The `about-computer` built-in skill contains detailed reference files for each capability category. This skill is the structured inventory and enforcement layer on top of that.

---

## Purpose

Across multiple sessions, Marc has encountered a recurring failure pattern: the AI claims "I can't do that" when the capability actually exists. This wastes time and erodes trust. Examples:

- **Custom MCP connectors (March 4, 2026):** The AI twice stated Perplexity Computer cannot add custom MCP servers. Marc showed the UI dialog proving it can — name, URL, auth method (OAuth, API Key, None), transport protocol (Streamable HTTP or SSE). The AI was wrong because its training data didn't reflect the feature.
- **Model identity (March 6, 2026):** The AI asserted it was running GPT-5.1 when the UI clearly showed GPT-5.4. It stated an internal "fact" it couldn't verify.

**The fix:** A memorialized inventory the AI checks BEFORE claiming inability, combined with an enforcement protocol that requires tool-based verification for any capability claim.

---

## Section 1: Core Tool Inventory

These are the tools available in every Perplexity Computer session. Cataloged from the live session environment.

### Research & Search

| Tool | What It Does |
|------|-------------|
| `search_web` | Searches the live web for current information. Multiple queries run in parallel. Returns titles, URLs, and content snippets. |
| `search_vertical` | Specialized searches: `academic` (research papers, DOIs), `people` (LinkedIn profiles), `image` (photos/illustrations), `video` (video content), `shopping` (product listings with prices). |
| `search_social` | Searches X (x.com) for posts, replies, threads. Supports operators: from:, to:, hashtags, post type filters. |
| `fetch_url` | Reads any public URL's full content. Optionally extracts specific information via LLM prompt. Cached by default; `force_fetch=True` for fresh content. |

### Browser Automation

| Tool | What It Does |
|------|-------------|
| `browser_task` | Launches a full cloud browser for interactive web tasks: clicking, form filling, navigation, login flows, data extraction from JavaScript-rendered pages. Supports model selection (Gemini 3 Flash, Gemini 3.1 Pro, Claude Sonnet 4.5, Claude Sonnet 4.6, Claude Haiku 4.5). |
| `screenshot_page` | Captures a high-fidelity screenshot of any webpage. Saves to workspace. |
| `wide_browse` | Batch browser automation across many URLs in parallel. Visits each URL, extracts structured data per a prompt template, collects results into CSV. |

### Code Execution & File System

| Tool | What It Does |
|------|-------------|
| `bash` | Executes shell commands in a sandboxed Linux VM (2 vCPUs, 8 GB RAM, ~20 GB disk). Python, Node.js, ffmpeg, yt-dlp, mat2 pre-installed. Can install additional packages. |
| `write` | Creates files in the workspace. Does NOT send to user. |
| `read` | Reads files from workspace. Supports text files, images (visual analysis), PDFs (text extraction + page rendering), PPTX (slide rendering). |
| `edit` | Performs exact string replacements in files. Multiple edits applied sequentially. |
| `glob` | Fast file pattern matching (e.g., `**/*.py`). |
| `grep` | Regex search across file contents. |

### Document & Asset Creation

| Tool | What It Does |
|------|-------------|
| `share_file` | Sends a file to the user. The ONLY way to deliver files — users cannot see workspace files until this is called. |
| `generate_image` | AI image generation from text prompts. Supports aspect ratios (1:1, 3:4, 4:3, 9:16, 16:9). Models: Nano Banana 2, Nano Banana Pro. Supports img2img with reference images. |
| `generate_video` | AI video generation from text prompts. 4–12 second clips. Models: Sora 2, Sora 2 Pro, Veo 3.1, Veo 3.1 Fast. Supports image-to-video animation. |
| `text_to_speech` | Converts text to speech audio (MP3). Single-speaker or multi-speaker dialogue. Models: Gemini 2.5 Pro TTS (default), ElevenLabs TTS v3. |
| `transcribe_audio` | Transcribes audio/video files to text. Speaker diarization (up to 32 speakers), word/character timestamps, 99 languages. Formats: mp3, wav, mp4, webm, m4a, ogg, flac. |
| `save_image` | Downloads an image from a URL and saves to workspace. |

### Website Deployment

| Tool | What It Does |
|------|-------------|
| `deploy_website` | Bundles a static website from workspace and deploys to a public URL. Re-deploying same path updates the existing site. Supports HTML/CSS/JS with backend via CGI-bin scripts. |

### Orchestration & Parallel Processing

| Tool | What It Does |
|------|-------------|
| `run_subagent` | Spawns autonomous subagents for complex tasks. Types: `asset` (documents), `research`, `website_building`, `general_purpose`. Subagents share the workspace filesystem. Model selection available (Claude Sonnet 4.6, Claude Opus 4.6, Gemini 3.1 Pro, GPT 5.3 Codex, GPT 5.4). |
| `reply_to_subagent` | Sends follow-up messages to completed subagents. Retains previous context. |
| `wide_research` | Batch web research across many entities in parallel. One entity per line in a file. Results collected into CSV. |
| `wide_browse` | (Listed above under Browser.) Batch browser automation across many URLs. |

**Architecture: Sub-Agent Model (Hub-and-Spoke), NOT Agent Teams**

Perplexity Computer uses a **sub-agent** architecture, not an **agent team** architecture. This is a meaningful distinction:

| Dimension | Sub-Agent (What We Have) | Agent Team (What Claude Code/Codex Have) |
|-----------|-------------------------|------------------------------------------|
| Topology | Hub-and-spoke — orchestrator spawns and manages all agents | Peer-to-peer — agents communicate laterally and hand off to each other |
| Communication | All information flows through the orchestrator | Agents can message each other directly without orchestrator involvement |
| Coordination | Orchestrator holds all state and makes all routing decisions | Distributed — agents adapt the plan as they learn, without re-planning from the orchestrator |
| Shared state | Workspace filesystem only (files) — no real-time shared memory or message bus | Persistent coordination layer (shared memory, task boards, message bus) |
| Autonomy | Subagents execute one objective and return — no autonomous loops between agents | Agents can loop (e.g., generator ↔ verifier) without orchestrator stepping in each iteration |
| Context bottleneck | Orchestrator's context grows with every subagent result it reads | No single context bottleneck — coordination is distributed |

**What this means in practice:**
- The orchestrator (main agent) is the bottleneck for all coordination. Every subagent result flows back through it.
- Subagents don't know about each other and can't coordinate. Multi-agent workflows require the orchestrator to manually chain outputs.
- Team-model patterns like autonomous generator↔verifier loops require the orchestrator to manage each iteration step — it can't "set it and forget it."
- For current workloads (strategy, analysis, single-deliverable tasks), this is sufficient. For large autonomous pipelines (e.g., 232-unit batch processing with inter-agent handoffs), this is a scaling bottleneck.

**Workaround:** Subagents can coordinate indirectly through workspace files — Agent A writes output, orchestrator reads it and spawns Agent B pointing at that file. Functional but manual at every hop.

*Discovered: March 7, 2026 — during AI Mastermind analysis of Verification Architecture document. The fresh-context verification pattern (spawn a scoped subagent for quality verification in a clean context) is viable under this model. Autonomous multi-agent loops are not.*

### Scheduling & Automation

| Tool | What It Does |
|------|-------------|
| `schedule_cron` | Creates, updates, lists, or deletes recurring scheduled tasks. Minimum frequency: 1 hour. Maximum: 15 recurring tasks per session. Tasks persist until deleted. Each run has full access to all Computer capabilities. |
| `pause_and_wait` | Pauses the workflow for a specified duration (minutes). Resumes with full conversation context. Use for one-time delayed actions, rate limit cooldowns, waiting for external events. |
| `send_notification` | Sends an in-app notification when a scheduled task finds noteworthy information. Terminal action — ends the current run. |

### Memory & Personalization

| Tool | What It Does |
|------|-------------|
| `memory_search` | Searches persistent memory for user facts, preferences, and past conversation entries. Multiple queries run in parallel. Returns verbatim excerpts and details from prior sessions. |
| `memory_update` | Stores durable facts about the user for future recall. Persists across all sessions and threads. |

### External Integrations

| Tool | What It Does |
|------|-------------|
| `list_external_tools` | Discovers available external connectors and their tools. Search by keyword. Returns connection status. |
| `describe_external_tools` | Gets full input schemas for specific connector tools. |
| `call_external_tool` | Executes a tool on a connected external service. |

### Skills & Knowledge

| Tool | What It Does |
|------|-------------|
| `load_skill` | Loads detailed instructions for a specific skill from the skill library (built-in or user-created). |
| `save_custom_skill` | Saves a skill file to the user's personal skill library. Supports create (new) and update (existing skill_id). |

### Task Management

| Tool | What It Does |
|------|-------------|
| `update_todo_list` | Creates or revises a task checklist visible to the user in the UI. Tracks progress on complex multi-step requests. |
| `update_todo_status` | Marks individual tasks as pending, in_progress, or completed. |
| `get_todo_list` | Retrieves the current todo list state (useful after context compaction). |

### User Interaction

| Tool | What It Does |
|------|-------------|
| `ask_user_question` | Presents multiple-choice questions to the user (1–4 questions, 2–4 options each). |
| `confirm_action` | Requests user confirmation before irreversible actions. |
| `submit_answer` | Delivers the final response to the user. Supports markdown. Can attach file/site assets. |
| `system_diagnostic` | Flags high-signal issues to the Perplexity engineering team for product improvement. |

### Finance (Connected)

| Tool | What It Does |
|------|-------------|
| `finance_*` (30+ tools) | Real-time quotes, historical OHLCV, earnings transcripts, financial statements, analyst estimates, company profiles, peer comparisons, macro indicators, market sentiment, politician holdings/trades, and more. Full programmatic access to financial data. |

---

## Section 1b: User Interface & Platform Features

These are not tools the AI calls, but features the user interacts with directly. The AI should know they exist to avoid incorrectly denying platform capabilities.

### Web Interface Features

| Feature | Description |
|---------|------------|
| Voice Mode | Users can interact with Computer via voice commands. Works across tasks and retains context. (Model and features may evolve — check Perplexity changelog for current details.) |
| Model Selector | Users can choose which AI model to use for a thread (e.g., GPT-5.4, Sonar, Claude). Available in the UI header. |
| Connectors Panel | Users manage connected apps via Computer panel → Connectors. Enable, install, disconnect services. |
| Custom Connectors | Users can add custom remote MCP connectors via Account Settings → Connectors → + Custom connector. See Section 3 for details. |
| Project/Task View | Computer organizes work into tasks visible in the left panel. Tasks run asynchronously and persist. |
| Credit Management | Users view and manage credits at perplexity.ai/account/credits. Auto-refill available. Tasks pause (not cancel) if credits run out. |
| File Downloads | Users can download any shared file from the conversation. Deployed websites can be exported as HTML. |
| **Files Tab (Persistent Cross-Thread Storage)** | The left-nav Files tab stores all files shared via `share_file` persistently across threads. Files appear here after being shared in any thread and remain accessible from any other thread. This is the platform's cross-thread file persistence mechanism. The AI can rely on `share_file` to make files available beyond the originating thread. *(Confirmed by Marc, March 7, 2026 — this capability is not documented in the platform's public docs but is verified via user screenshot.)* |
| Ask Anything Toggle | Users switch between Computer mode and standard Perplexity search via the Perplexity icon. |

### Credits

Max subscribers receive credits monthly for Computer tasks (10,000 base + a launch bonus as of February 2026 — verify current allocation at perplexity.ai/account/credits). Credits are consumed by Computer tasks only — standard Perplexity searches are unlimited. Computer cannot see credit balance, consumption per task, or remaining credits. For cost-related questions, offer cheaper model alternatives and direct the user to perplexity.ai/account/credits.

### Perplexity API Platform

Perplexity offers a separate developer API platform (not part of Computer) for programmatic access to Perplexity's search and AI capabilities. This is a separate product from the Computer workspace. The AI should not conflate Computer capabilities with API platform capabilities.

---

## Section 2: File Format Support

### Can Create From Scratch

| Format | Capabilities |
|--------|-------------|
| PDF | Create, merge, split, rotate, watermark, fill form fields, encrypt/password-protect, OCR |
| DOCX | Word documents with TOC, styled headings, page numbers, letterheads, custom formatting |
| PPTX | Slide decks with layouts, speaker notes, charts, data visualizations |
| XLSX | Spreadsheets with formulas, conditional formatting, charts, multi-sheet workbooks |
| HTML/CSS/JS | Full websites deployable to public URLs |
| Markdown | Native format for text content |
| CSV/JSON | Data files for analysis and export |
| PNG/JPEG/WebP | AI-generated images or programmatic image creation via Python |
| MP4 | AI-generated video clips (4–12 seconds) |
| MP3 | AI-generated speech audio |
| Python/Node.js scripts | Executable code files |

### Can Read & Process

This table covers common formats. Any format with Python library support can also be processed via `bash` — this list is representative, not exhaustive.

| Format | How |
|--------|-----|
| PDF | Text extraction + page image rendering (default 20 pages, paginated for longer) |
| DOCX, XLSX | Read via Python libraries (python-docx, openpyxl) |
| PPTX | Native rendering as slide images via `read` tool (default 20 slides, paginated for longer) |
| Images (PNG, JPEG, WebP) | Direct visual analysis — can describe, interpret, and extract information from images |
| Audio (mp3, wav, m4a, ogg, flac) | Transcription with speaker diarization and timestamps |
| Video (mp4, webm) | Transcription of audio track; frame extraction via ffmpeg |
| CSV, JSON, XML, YAML | Native text parsing and data processing |
| Text files (.txt, .md, .log, etc.) | Direct reading up to 2000 lines per call |

### Cannot Natively Handle

| Format | Limitation |
|--------|-----------|
| .exe, .dmg, .app | Cannot run native executables |
| Proprietary binary formats | Cannot read formats without Python library support (e.g., .sketch, .fig) |
| Very large files | VM has ~20 GB disk and 8 GB RAM — files exceeding these limits will fail |

---

## Section 3: External Connector Ecosystem

### How Connectors Work

- **400+ managed connectors** available through Perplexity's connector framework
- Users authenticate once via OAuth; Computer uses tokens securely
- Connectors support both reading AND writing (not just data retrieval — can take actions)
- Discovered dynamically via `list_external_tools`
- If a connector is DISCONNECTED, the AI can call its `connect` tool to present an OAuth link

### Custom MCP Connectors

**This is a capability the AI has previously denied exists. It does exist.**

Marc can add custom remote MCP connectors via:
1. Account Settings → Connectors → + Custom connector → Remote
2. Provide: Name, HTTPS MCP Server URL, auth method, transport protocol
3. Auth methods available: OAuth (Client ID + Client Secret), API Key, None
4. Transport protocols: Streamable HTTP, SSE

Once connected, the custom connector's tools become available through `list_external_tools` and `call_external_tool` like any managed connector. Marc has previously configured the Dossium connector using this method.

### Marc's Currently Connected Services (as of March 6, 2026)

| Service | Source ID | Key Capabilities |
|---------|-----------|-----------------|
| Outlook | `outlook` | Search email, draft/send email, search calendar, create/update calendar events |
| Microsoft Teams | `microsoft_teams_mcp_merge` | 50+ tools: channels, messages, meetings, transcripts, files, members, DMs, presence, search |
| Slack | `slack_direct` | Send messages, search public/private channels, read channels/threads, create canvases, search users |
| Realtime Finance Data | `finance` | 30+ tools: quotes, OHLCV, earnings, financials, analyst data, macro indicators, politician trades |
| SharePoint/OneDrive | `files` | Search files across SharePoint and OneDrive |

### Available But Not Connected (representative categories)

| Category | Examples |
|----------|---------|
| Communication | Gmail |
| Documents | Notion, Dropbox |
| Project Management | Jira, Linear, Asana, Trello |
| CRM | HubSpot, Salesforce, Zoho CRM, Agile CRM, NetHunt CRM |
| Development | GitHub |
| E-commerce | Shopify |
| Payments | Stripe |
| Databases | Airtable, Azure SQL, Nile Database |
| Analytics | Google Analytics, YouTube Analytics |
| Signatures | Dropbox Sign (HelloSign) |
| Email Marketing | Elastic Email |
| Messaging | Discord, WhatsApp Business |
| SMS | Twilio, SMSTools, SMSAPI, SMS Messages |

**Note:** The full catalog contains 400+ connectors. Use `list_external_tools` with specific queries to discover connectors for any service.

---

## Section 4: Known Hard Limitations

These are things Computer genuinely cannot do. Only claim inability after checking this list AND running `list_external_tools`.

### Platform Constraints

| Limitation | Detail |
|-----------|--------|
| No access to user's local machine | Cannot read local files, run local commands, or interact with local applications. Exception: Desktop Comet browser sessions can use the user's local browser with logged-in sessions. |
| No persistent server | The sandbox VM is ephemeral per session. During a session, full backend servers (FastAPI, Express, Flask) can run and connect to deployed frontends via port forwarding. Deployed websites use CGI-bin scripts for transactional server logic. After the session ends, all server processes stop — only static files persist at the deployed URL. |
| No real-time streaming to user | Cannot stream audio/video in real-time. Generates files that the user downloads. |
| No account/billing visibility | Cannot see credit balance, subscription tier, credit consumption per query, or account settings. |
| No model identity visibility | Cannot verify which specific model is processing the current message. Do not assert model identity as fact. |
| No push notifications to device | `send_notification` creates in-app notifications only, per the tool definition. (Note: Perplexity's product documentation references "push notifications" — this may reflect planned or partially rolled-out functionality. The tool as implemented is in-app only.) |
| No global settings modification | Cannot modify platform-level settings, preferences, or configurations on the user's behalf. |
| Web desktop only | Computer is not available on mobile apps. |
| Max subscription required | Available only to Perplexity Max subscribers ($200/month). |
| 15 recurring tasks max per session | `schedule_cron` supports a maximum of 15 concurrent recurring tasks. |

### Execution Constraints

| Limitation | Detail |
|-----------|--------|
| No login-gated browsing without credentials | The cloud browser has no saved sessions or cookies. Cannot access sites requiring login unless the user provides credentials or uses Desktop Comet's local browser. |
| No native app interaction | Cannot interact with desktop applications (Obsidian, VS Code, etc.) — only web interfaces. |
| No outbound phone calls or SMS (natively) | No built-in tool for calls or SMS. However, connectors exist for Twilio, SMSTools, SMSAPI, and SMS Messages that can enable SMS sending if connected. Check `list_external_tools` before claiming this is impossible. |
| No physical-world actions | Cannot make purchases with the user's payment methods, physically mail items, or interact with hardware. |
| No real-time collaboration | Cannot co-edit documents simultaneously with the user in real-time. |
| Sandbox resource limits | 2 vCPUs, 8 GB RAM, ~20 GB disk. Large ML models, massive datasets, or memory-intensive operations may fail. |
| Video clip length | AI-generated video clips max at 4–12 seconds per generation (model-dependent). Longer videos require stitching multiple clips. |
| Image generation: no precise text | AI image generation cannot reliably render specific text, numbers, or data in images. Use programmatic rendering (Python/PIL) for text-heavy visuals. |
| Sub-agent model, not agent teams | Orchestration is hub-and-spoke (sub-agents), not peer-to-peer (agent teams). Subagents cannot communicate laterally, cannot autonomously loop with each other, and all coordination flows through the main orchestrator's context window. See Section 1 Orchestration notes for full comparison. This is a platform-level constraint, not something addressable through skill design. |

### Knowledge Constraints

| Limitation | Detail |
|-----------|--------|
| Training data cutoff | Knowledge has a cutoff date. Always use live web search for current information. |
| No visibility into internal routing | Cannot see which model handled a previous message, what internal processes ran, or how the platform routed a query. Do not state these as facts. |
| Memory is not guaranteed complete | Memory search returns relevant matches, not exhaustive history. Some past details may not be retrievable. |

---

## Section 5: Enforcement Protocol

**Rule: Before claiming "I can't do X" OR "the platform doesn't do X" OR any negative statement about platform behavior/capabilities, the AI MUST execute this checklist.**

This applies to ALL capability-adjacent claims, not just explicit inability statements. Examples that trigger this protocol:
- "I can't access X" (obvious trigger)
- "Files are per-thread only" (negative architectural claim — ALSO triggers this)
- "The platform doesn't support X" (negative capability claim — ALSO triggers this)
- "That feature doesn't exist" (negative existence claim — ALSO triggers this)

If you cannot ground the claim in a verifiable source AND this inventory doesn't cover it, the correct response is "I'm not certain — I'd need to verify that" rather than stating the negative as fact.

**Practical note:** Most capability questions resolve at Step 1 (internal scan of this inventory — no tool call needed). The full 5-step sequence is for genuinely uncertain cases. Do not treat this as a mandatory 5-tool-call sequence for every response.

### Step 1: Check This Inventory
Scan Sections 1–3 of this skill. Is the capability listed? If yes, proceed to do it. If uncertain, continue to Step 2.

### Step 2: Check `list_external_tools`
If the request involves ANY external service, data source, or integration:
- Call `list_external_tools` with relevant keywords
- If a connector exists but is DISCONNECTED, offer to connect it (call its `connect` tool)
- If a connector exists and is CONNECTED, use it

### Step 3: Check `about-computer` Reference Files
Load and read the relevant `about-computer` reference file for the capability category in question. These files are maintained by Perplexity and may contain capabilities not yet reflected in this inventory.

### Step 4: Check If Solvable Indirectly
Many capabilities that don't have a dedicated tool can be achieved through composition:
- Can `bash` with Python accomplish it?
- Can `browser_task` interact with a web interface to accomplish it?
- Can a combination of tools chain together to accomplish it?

### Step 5: Only Then, Explain Inability With Specificity
If Steps 1–4 all fail, explain WHY it can't be done:
- "Computer cannot do X because [specific technical reason]"
- NOT "I don't have access to that" (vague)
- NOT "I can't do that" (unverified)
- Reference the specific limitation from Section 4 if applicable
- **Critical:** Section 4 limitations assume no indirect workaround exists. If Step 4 found a viable indirect approach, use it — do not cite a Section 4 limitation as a reason to refuse.

### Standing Rule: No Unverifiable Internal Claims
Per Marc's standing directive (committed to memory March 6, 2026):
- Never state internal implementation details (model identity, routing decisions, behind-the-scenes processes) as facts
- If the information cannot be grounded in a verifiable source, say "I don't know from here"
- Clearly separate facts (cited) from inferences (labeled as such)

---

## Section 6: Correction History

Documented instances where the AI incorrectly claimed inability or stated unverifiable facts. These inform the enforcement protocol and serve as regression tests.

| Date | What Happened | Root Cause | Fix |
|------|--------------|------------|-----|
| March 4, 2026 | AI stated twice that Perplexity Computer cannot add custom MCP servers. Marc showed the UI dialog proving it can (name, URL, auth method, transport protocol). | Training data did not reflect this feature. AI relied on training knowledge instead of checking live sources or the UI. | Added custom MCP connectors to Section 3. Enforcement protocol Step 4 now requires checking indirect approaches. |
| March 6, 2026 | AI asserted it was running GPT-5.1 when the UI showed GPT-5.4. Stated an internal fact it couldn't verify. | No verification mechanism for model identity claims. AI filled an information gap with a plausible guess. | Added "No model identity visibility" to Section 4 limitations. Standing rule: no unverifiable internal claims. |
| March 6, 2026 | Marc required the AI to formalize a "no uncited facts" rule across all Perplexity interactions (Search and Computer) after repeated instances of ungrounded claims. | Pattern of stating plausible-sounding facts without verification. Not limited to one incident. | Standing directive committed to memory. Enforcement protocol Step 5 requires specificity. Section 5 codifies the standing rule. |
| March 7, 2026 | AI stated that workspace files are per-thread and not accessible cross-thread. Marc showed a screenshot of the Files tab (left nav) proving that files shared via `share_file` persist across threads and are accessible from any thread. | AI relied on training data / system prompt interpretation instead of verifiable evidence. The system prompt says "users cannot see files until share_file is called" but doesn't explicitly address cross-thread persistence — the AI extrapolated incorrectly. | Added "Files Tab (Persistent Cross-Thread Storage)" to Section 1b (Web Interface Features). Updated understanding: `share_file` publishes files to a persistent cross-thread Files tab, not just the current conversation. |

---

## Section 7: Update Mechanism

### When to Update This Skill

1. **After any capability correction:** When Marc (or a self-audit) identifies a capability the AI incorrectly denied or incorrectly claimed — add to Section 6 and update the relevant inventory section.

2. **After new connectors are added:** When Marc connects a new service, update Section 3 (Marc's Currently Connected Services table).

3. **After platform updates:** When the automated monitoring task (see below) detects new capabilities — update relevant sections.

4. **Periodic review:** During CHECK protocol (Step 1, Rules Compliance), verify this inventory against the live tool set.

### How to Update

1. Load this skill: `load_skill(name="perplexity-capabilities")`
2. Make edits to the workspace copy
3. Save back to library: `save_custom_skill(file_path="...", skill_id="6b099d63-c3aa-46e4-b10d-9ce4ad45e49f")`
4. Always use this exact `skill_id` to avoid creating orphan duplicates

### Automated Monitoring

A recurring scheduled task monitors for new Perplexity Computer capabilities. See the setup instructions in the thread where this skill was created. The monitoring task:
- Checks Perplexity's blog, changelog, and help center for updates
- Searches for new capability announcements
- Alerts Marc via notification when something new is detected
- Runs on a defined cadence (configured at setup)

---

## Integration with Marc's System

- **Load-to-activate:** This skill must be loaded (`load_skill`) to take effect. Add to `marc-ops-framework` routing table with auto-load trigger on capability questions or inability claims
- **Referenced in:** `marc-ops-framework` routing table (add after first save)
- **Depends on:** `about-computer` (upstream source of truth for detailed descriptions)
- **Interacts with:** `issue-logger` (capability corrections become logged issues)
- **Standing rule alignment:** Enforces D-05 (Ground Claims), R-02 (Live Source Claims), R-07 (Research-Before-Reasoning Gate), and the March 6, 2026 "no uncited facts" standing directive

---

## Quality Gate

| Protocol | Status | Date | Auditor | Notes |
|----------|--------|------|---------|-------|
| Self Audit | PASSED | 2026-03-06 | AI | 9 findings, 8 changes (round 1) |
| Audit Loop 1 | PASSED | 2026-03-06 | AI | 8 findings, 7 changes (browser models, voice mode staleness, credits staleness, notification discrepancy, PPTX read method, structural separation of UI features, practical note on enforcement, read table caveat) |
| Audit Loop 2 | PASSED | 2026-03-06 | AI | 2 material findings, 2 changes (fixed "Always active" → "Load-to-activate" in Integration section for consistency with Activation block; expanded No Persistent Server limitation to describe full backend server capability during sessions) |
| Audit Loop 3 | PASSED | 2026-03-06 | AI | 0 material findings. Clean pass across verification, adversarial, and pre-mortem. Audit convergence reached. |
| CHECK | NOT RUN | — | — | — |