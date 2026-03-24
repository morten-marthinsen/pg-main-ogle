# Orion — Session Log Archive

> Compressed historical sessions. For recent sessions, see `SESSION-LOG.md`.
> Archive created: Session 013 (2026-02-09). Sessions 001-009 moved here.
> Last updated: Session 117 (2026-03-22). Sessions 104-112 archived.

---

## Session Index

| Session | Date | Focus | Key Output |
|---------|------|-------|------------|
| 001 | 2026-02-06 | Architecture & Foundation | EXA-PRD.md v1.0, CLAUDE.md v1.0, SESSION-LOG.md v1.0, spark-book-launch-map.md |
| 002 | 2026-02-06 | Meeting Prep + Transcript + Master Agent | EXA-MASTER-AGENT.md v1.0, _ops/ directory, john-1on1-prep v2, transcript analysis |
| 003 | 2026-02-07 | John Sync Analysis + Directory Rename | john-sync-analysis.md (5-part), transcript markdown, directory rename exa-chief-of-staff |
| 004 | 2026-02-07 | PRD v1.1 Revision | EXA-PRD.md v1.1 (12 edits: Two Brand Threads, OPEX, scorecard, hiring, CRO scope) |
| 005 | 2026-02-07 | MA v1.1 Partial (2/6 edits) | Header + system diagram (CREATIVE OS PIPELINE with Neco) |
| 006 | 2026-02-07 | MA v1.1 Complete + Monday Deliverables | MA v1.1 (6/6), Monday agenda, recruiting plan for Brixton |
| 007 | 2026-02-08 | Sub-Agents Section 1 + Layer 1 | EXA-SUB-AGENTS.md (Design Principles + Strategic Tracker + Challenger) |
| 008 | 2026-02-08 | Wise Reply Steps 1-2 | Slack MCP enabled, 6 read-only tools allowlisted, Gate 3 enforced |
| 009 | 2026-02-08 | Wise Reply Steps 3-11 | /wise-reply skill, stakeholder map, Mode 8, Communications Strategist sub-agent, all routing |
| 010 | 2026-02-08 | Russ Exit Execution Brief | 11-section exit plan with Morton eval framework (Section 8) |
| 011 | 2026-02-09 | Audit + John Call Prep + Creative OS Setup | Private file architecture, Google Doc ID, John agenda, org visual |
| 012 | 2026-02-09 | Session start + MCP diagnosis + handoff | Minimal — central John doc directive, compression flagged |
| 013 | 2026-02-09 | Two-tier compression | SESSION-LOG-ARCHIVE.md created, 82% reduction (1128→~200 lines) |
| 014 | 2026-02-10 | _ops folder reorganization + iCloud fix | Date format MMDDYY, iCloud conflict storm resolved (fresh name pattern) |
| 015a | 2026-02-10 | iCloud fix + Feb 9 transcript debrief | Google Doc updated (8 sections), Tuesday agenda, Brixton filter, Telos mapping |
| 015b | 2026-02-12 | Exa docs aligned with Creative OS PRD | Romeo hire context, angle escalation pipeline, PRD Plan hands-off |
| 016 | 2026-02-15 | ClickUp notetaker fix + transcript automation | fetch-clickup-transcripts.py, 10 transcripts downloaded |
| 017 | 2026-02-15 | Daily Executive Briefing skeleton | 7-module pipeline, launchd at 7:30am, iCloud-safe reports dir |
| 018 | 2026-02-15 | Transcript backfill + auto-sync | 46 transcripts in monthly folders, launchd every 30min, shell aliases |
| 019 | 2026-02-15 | Rolling handoff protocol (interrupted P4/5) | Exa CLAUDE.md + EXA-PRD.md + root CLAUDE.md updated (6/7 changes done) |
| 020 | 2026-02-15 | Rolling handoff complete + cross-agent analysis | loms-capture.py + launchd plist, all 7 handoff changes done |
| 021 | 2026-02-15 | Apply handoff protocol to Tess/Veda/Neco | 8 edits across 3 CLAUDE.md files (incremental writes, 5-line handoff, CHECKPOINT.yaml cleanup) |
| 022 | 2026-02-15 | Daily Briefing M1+M7 wired | ClickUp-powered modules LIVE, first report 6,225 chars, 2/7 modules |
| 023 | 2026-02-15 | Compression + AI triage activation | S010-S019 archived (63% reduction), ANTHROPIC_API_KEY added, AI triage LIVE |
| 024 | 2026-02-15 | Context threshold handoff | Minimal — context hit before work started |
| 025 | 2026-02-15 | P0 cleanup + Gmail OAuth + M2/M3/M6 | Gmail OAuth DONE, 3 modules wired, 5/7 LIVE, 10,130 chars |
| 026 | 2026-02-15 | Module refinements per user feedback | M7 due-date filter, M3 suggestion mode + CSV, M6 newsletter label. 6/8 LIVE |
| 027 | 2026-02-17 | Actionability refinements (5 changes) | prd_context.py shared module, URL extraction, due-date delegation, action steps. 16,270 chars |
| 028 | 2026-02-17 | ClickUp helper + status filtering + enriched delegation | clickup_helper.py, M1/M7/M8 filtered, structured delegation moves. 15,518 chars |
| 029 | 2026-02-17 | M1 action steps + "live" exclusion + M7 date fix | v0.7.0 — 3 targeted fixes. 16,277 chars |
| 030 | 2026-02-17 | Neco Autonomous Vision (planning only) | Architecture plan written, OPEN QUESTION raised on project state awareness |
| 031 | 2026-02-17 | Neco Autonomous Runner v1 build | 6 files created, dry-run tested (15 tasks, 2 LOCKED skipped, 13 queued) |
| 032 | 2026-02-17 | Neco Autonomous — live API test + launchd | Live test passed (quality gate worked), launchd 10pm nightly, Neco handoff protocol updated |
| 033 | 2026-02-18 | Morning ops — transcript sync fix + briefing reschedule | ClickUp sync fixed (FDA issue), briefing → 5:00 AM, Feb 18 report generated |
| 034 | 2026-02-18 | M9 Transcript PRD Recommender + Liv response | M9 LIVE (7/9 modules), 46 transcripts seeded, Liv security response drafted |
| 035 | 2026-02-19 | Session log compression + briefing automation fix | S020-031 archived (63%), StartInterval 300s + idempotency guard |
| 036 | 2026-02-20 | Exa audit & optimization (6 phases) | 4 files → EXA-REFERENCE.md, Build State in CLAUDE.md, zero-read session start |
| 037 | 2026-02-21 | Slack Monitor M4/M5 OAuth | Slack app "Exa Daily Briefing" created, OAuth via webhook.site, 9/9 modules LIVE |
| 038 | 2026-02-21 | Transcript Intelligence Layer (partial) | transcript_kb.py, scorecard_context.py, new m9_transcript_intelligence.py (3/5 files) |
| 039 | 2026-02-21 | Daily briefing enhancement (5 improvements) | M1 cross-ref, M2 email balance, M6 URLs, M7 ClickUp comments, clickup_helper comments |
| 040 | 2026-02-21 | Transcript Intelligence complete | M10 KB Analyzer + M11 Meeting Prep created, old M9 replaced, 11/11 LIVE |
| 041 | 2026-02-21 | Persistent Actions + KB delegation + Romeo onboarding | M0 created (22 manual items), KB dict overrides, Romeo checklist, Monday prep. 12/12 LIVE |
| 042 | 2026-02-21 | M9 rate limit + JSON parse fixes | base.py retry/backoff, M9 inter-call delay + JSON repair, KB bootstrapped (72 items). 12/12 LIVE |
| 043 | 2026-02-21 | Google Calendar M12 implementation | calendar_auth.py, calendar_helper.py, m12_daily_schedule.py. 13 modules registered |
| 044 | 2026-02-22 | Calendar OAuth + full pipeline verified | OAuth flow complete, 13/13 LIVE, zero failures |
| 045 | 2026-02-22 | Slack interface plan + GitHub repo scaffold | "Exa — PG Creative Intel" architecture, private repo created, project scaffolded |
| 046 | 2026-02-22 | Slack bot Phase 1 MVP code | app.py, product_resolver, knowledge_loader, AI layer, message_handler, data sync |
| 047 | 2026-02-22 | Slack app setup + workspace install | Slack app created at api.slack.com, Socket Mode, manifest, OAuth, .env configured |
| 048 | 2026-02-22 | Slack bot multi-turn + product intel | Thread history, 6 product intel cards, knowledge loader expanded |
| 049 | 2026-02-23 | PRD v1.1 batch update | Brand architecture restructured, Thread 1 renamed, persona testing, Figma card example |
| 050 | 2026-03-06 | Pipeline migration to GitHub + first triage | Pipeline moved from Obsidian to pg-main-ogle, launchd updated, 26 items triaged |
| 051 | 2026-03-06 | Compression + Daily Brief Intelligence plan | S032-S047 archived, triage intelligence architecture designed |
| 052 | 2026-03-07 | Daily Brief Intelligence Phases 3-5 + Mar 7 regen | M0b triage enrichment, decision recording, config, 6 transcripts processed |
| 053 | 2026-03-07 | Fathom transcript sync + launchd | `--since` flag, 2 transcripts downloaded, 30-min auto-sync plist |
| 054 | 2026-03-07 | Executive Assistant Intelligence Upgrade (6 phases) | capacity_engine.py, multi-factor ABC, 3 A-task cap, week-ahead, Waiting On |
| 055 | 2026-03-07 | Donny call action items — path migration | 34 hardcoded paths replaced across 13 files, Orion rename planned |
| 056 | 2026-03-07 | Exa → Orion rename (all 6 phases) | Folder/file renames, 30+ content files, launchd plist swap, private files |
| 057 | 2026-03-07 | Phase 1.5 code + live pipeline verification | Launch detection, week capacity, title rename, ghost folder discovered |
| 058 | 2026-03-07 | Ghost exa cleanup + launchd plist migration | 14 transcript folders consolidated, ghost deleted, sync plists updated |
| 059 | 2026-03-07 | Daily briefing system audit + gap analysis | 15-module audit, 8 gaps, auto_reject enabled, 5 tools recommended |
| 060 | 2026-03-07 | Slack webhook + app rename | "Orion Daily Briefing" app, webhook to DM, privacy rule established |
| 062 | 2026-03-08 | Task recovery + schedule protection | 14 items recovered (mi-025 to mi-038), add_to_registry() force guard |
| 063 | 2026-03-08 | Executive Assistant v2.0.0 (8 phases) | M00a Today at a Glance, work block allocation, conflict detection, launch countdown, auto-approve, What Changed delta, PRD tags, reconcile.py |
| 064 | 2026-03-08 | Calendar enrichment (killed) + triage + tool audit | M13 built then killed (too noisy for large meetings). OAuth scope upgraded. 6 items triaged. ClickUp MCP confirmed working |
| 065 | 2026-03-08 | M00a preview report + timezone docs | M00a v2 preview created (Today at a Glance). Christopher's Lisbon timezone documented. Triage integrated. Calendar timezone bug surfaced |
| 066 | 2026-03-08 | PR #1 creation + shareability audit | 46 files changed, PR #1 (personal fork) + PR #8 (cross-fork to PG org). Fathom MCP hardcoded path fixed |
| 067 | 2026-03-09 | Session log compression + timezone fix | S048-S063 archived. Live pipeline verified. Calendar API timezone fixed (display_timezone: Europe/Lisbon) |
| 068 | 2026-03-09 | Exa→Orion rename + Slack bot upgrade | 22 refs renamed across 12 pipeline modules. Slack app renamed. chat:write scope + slack_post_message allowlisted. Team bot plan written |
| 069 | 2026-03-09 | Pending Review bulk triage + Build State reconciliation | 35 items triaged (30 rejected, 5 kept). Pipeline re-run verified clean |
| 069b | 2026-03-09 | Google Docs MCP fix + Brixton transcript + Orion bot design | Conflicting user-level MCP config removed. Bot design: multi-turn threads, DM, auto user-ID, Slack-first output. Product audit done |
| 070 | 2026-03-09 | Orion Personal Bot — design + plan | Private Slack bot architecture: Socket Mode, forward-to-task, mark-complete, positional priority (A1-A3/B1-B3/C), PriorityScorer |
| 071 | 2026-03-10 | Orion Personal Bot — full implementation | 5 modules built (bot.py, kb_ops.py, task_parser.py, conversation.py, priority_explainer.py). Forward-to-task + mark-complete + quick commands. reconcile bug fixed |
| 072 | 2026-03-10 | Slack app creation + PR #8 merge + Google Docs MCP | PR #8 merged. Google Docs MCP verified. "Orion (Personal)" Slack app created via Playwright. 3 of 4 tokens collected |
| 073 | 2026-03-10 | Anthropic API key + .env created | All 4 tokens collected. .env created with SLACK_BOT_TOKEN, SLACK_APP_TOKEN, ANTHROPIC_API_KEY, OWNER_SLACK_ID |
| 074 | 2026-03-10 | Morning triage + B2/B3 planning | Full Mar 10 briefing triaged. SF2 brief done (mi-041 closed). A-tasks revised. 13 waiting-on items closed. DWAI/RV naming convention planned |
| 074b | 2026-03-10 | Bot launch + Slack config fix + intent gap | Venv created, import chain fixed (importlib bypass). Bot connected via Socket Mode. "Hey Orion, B1 is finished" misrouted → intent classifier needed |
| 074c | 2026-03-10 | Intent classifier — Claude NLU routing | intent_classifier.py (5 intents, regex fallback), bot.py rewired, tier ref support |
| 075 | 2026-03-10 | Claude-as-Agent rewrite | agent.py conversation engine, report-as-ground-truth, thread history, 5 tools |
| 076 | 2026-03-10 | Report refresh after task changes | quick_refresh.py (1.1-1.4s surgical re-render), regenerate_report tool added |
| 077 | 2026-03-11 | Session log compression (5th) + bot verification | S064-074b archived. Personal bot LIVE (launchd). Playwright MCP fixed. Team bot Slack app audited |
| 078 | 2026-03-11 | Triage Intelligence v2.0 | TaskClassifier (5 types), ScheduleSuggester (multi-factor), hybrid dedup, "Why" column |
| 079 | 2026-03-11 | Team bot scaffold + SSS wiring | 7 files scaffolded, 4 SSS functions + ClickUp + agent status, 6 read-only tools |
| 080 | 2026-03-11 | Team bot auth + data verification | Service account created, 5/6 data sources verified, Socket Mode conflict found |
| 081 | 2026-03-11 | Socket Mode fix + Railway prep | Second app-level token, Procfile + railway.toml, bot display name fixed |
| 082 | 2026-03-12 | Message shortcut — "Create Orion task" | @app.shortcut handler, thread continuity, enforce-proposal prompt |
| 083 | 2026-03-12 | Message shortcut E2E test + bug fix | chat_update channel ID fix (user ID → DM channel ID) |
| 084 | 2026-03-12 | Team bot Railway deployment | Railway project created, bot token mismatch fixed, Slack display name (3 layers) |
| 085 | 2026-03-12 | Personal bot E2E test + track closeout | Message shortcut full success, personal bot FEATURE-COMPLETE v3.3 |
| 086 | 2026-03-12 | Personal bot README documentation | README.md (setup guide, 8 troubleshooting items), SETUP.md updated |
| 087 | 2026-03-12 | Team bot creative advisor — planning | Product catalog mapped (14 products), 5-phase plan, user profiles + context-first workflow designed |
| 088 | 2026-03-12 | Save Context shortcut — design + plan | 5 storage layers mapped, context-library/ design locked, 4-phase plan approved |
| 089 | 2026-03-12 | Team bot creative advisor — EXECUTION | Phase 1-5 all complete. 14 tools (6 data + 5 creative + 3 Google Docs). Haiku→Sonnet. Deployed to Railway |
| 090 | 2026-03-12 | Save Context shortcut — EXECUTION | Context library + kb_ops helper + agent tool + bot shortcut handler. 7 tools. Code complete |
| 091 | 2026-03-12 | Save Context — Slack config + go live | Shortcut created in Slack, E2E test passed. Gap: bot can't read Google Doc content |
| 092 | 2026-03-12 | Personal bot Google Doc fix + Team bot Docs rules + Brixton intro | Per-message URL injection prompt. Team bot formatting/revision rules. Brixton intro sent |
| 093 | 2026-03-13 | Session log compression (6th) + Brixton intro + relationship capture | S074c-S089 archived. Working-relationship entry saved for Brixton |
| 094 | 2026-03-13 | SF2 Launch Board — Figma board design & plan | 10-section structure locked. Orion owns launch boards. 3 memory files saved |
| 095 | 2026-03-13 | SF2 Launch Board — Sections 1-3 content | Product Overview, Brand Thread Alignment, Research & VSL Messaging. Key Language table |
| 096 | 2026-03-13 | SF2 Launch Board — Sections 4-6 | Personas 9→5 consolidated. Creative Matrix. Email/Backend Alignment |
| 097 | 2026-03-13 | SF2 Launch Board — Sections 7-10 | Production, Launch Phase 1-3. All 10 sections complete |
| 098 | 2026-03-13 | Personal Bot v4.0 — PDF/Word support + git sync | 41 files committed. PyMuPDF + python-docx. files:read scope added |
| 099b | 2026-03-13 | Personal Bot — PDF E2E + Vision OCR | Image-based PDF OCR pipeline built (PyMuPDF→PNG→Haiku Vision). Agent not using extracted text |
| 100 | 2026-03-13 | Triage Intelligence P0 + daily triage | Cross-reference filter LIVE. Auto-reconcile 31 items. Registry at 367 |
| 101 | 2026-03-13 | SF2 Board — Full Figma build (Phase 6) | HTML board built, captured to Figma. John Hardesty VM feedback → 5 gaps addressed |
| 101b | 2026-03-13 | SF2 Board — CEO card, vertical Figma, Surge prep | Section 00 "Brixton Start Here". Vertical variant. Deploy dir created |
| 101c | 2026-03-13 | 30-Day Review markdown + Christopher feedback | 10 corrections applied. Brand deposit map ≠ SF2 board (key distinction) |
| 102 | 2026-03-16 | Completed registry expansion + pipeline fixes | 373 entries. B→A guard, entity-aware calendar cross-ref. M9 MAX_TRANSCRIPTS fixed to 3 |
| 104 | 2026-03-16 | PG1 Member Pricing checkout template | Digital checkout WPSS: $197 non-member / $97 member. PG1 = delivery vehicle. 3 Figma iterations |
| 105 | 2026-03-17 | PG1 Voluntary Checkout — 4-page build | WPSS + 357 checkouts (Step 1 + Step 2). $29/mo PG1. April 6 deadline. All in Figma |
| 106 | 2026-03-18 | Pipeline crash fix + 8:30am fallback + compression | check_network() logger fix. Launchd 8:00+8:30am. 7th compression (S090-S102) |
| 107 | 2026-03-18 | Triage-first daily brief | M00a task rendering removed. Triage decision log extended (6 fields, 3 queries). Two-pass workflow documented |
| 108 | 2026-03-18 | Sales page member/non-member pricing | WPSS + 357 full page clones with pricing choice CTA. Clone-don't-rebuild approach. 2 Figma frames |
| 109 | 2026-03-18 | Personal bot schedule bug fix + hourly check-in | Silent write bug fixed (JSON top-level vs nested). Post-write verification. Check-in + pre-call plists |
| 110 | 2026-03-19 | SF2 CLM v2 — full content refresh | 10→13 sections. E-com pivot (no VSL). $349 non-member pricing. Deployed pg-sf2-board-v2.surge.sh |
| 111 | 2026-03-19 | Sales page Pricing Option Structure | Two-box radio selector (Thriver-inspired). 357 + WPSS. 4 feedback rounds. 3 Figma frames |
| 112 | 2026-03-19 | RS1 CLM — full 12-section board build | 1,043-line content doc. 122KB HTML. 5 influencer themes locked with Donnie. Deployed pg-rs1-board.surge.sh |
| 101c-b | 2026-03-13 | SF2 Board — Surge deploy + John gap sections | Deployed to pg-sf2-board.surge.sh. S4 Campaign Strategy + S9 Asset Registry added. 13 sections |
| 102 | 2026-03-16 | Daily report outage fix + triage + pipeline upgrades | WiFi retry in check_network(). B→A priority guard. Entity-aware calendar cross-ref. Registry 373 |

---

## Critical Decisions

### Session 001 — Architecture Foundations
- **Agent scope**: Strategic Chief of Staff (not admin/calendar bot). CMO doc reveals strategic execution gap.
- **Challenger intensity**: Persistent three-level (FLAG/BLOCK/CONVINCE ME). Must resurface unresolved risks.
- **Hierarchy**: Exa above TESS + VEDA as consolidation layer.
- **Sub-agent count**: 7 (later expanded to 8 with Communications Strategist), 3 layers, hub-and-spoke model.
- **Scorecard timing**: Draft now, refine post-John meeting.
- **Exa visibility**: Visible to John — demonstrates operational sophistication.

### Session 002 — Transcript Intelligence
- **CEO's 3 directives** (Brixton): (1) Brand + paid visibility mapped per campaign, (2) Aggressive recruiting plan by Monday, (3) Holistic plan connecting brand/organic/paid.
- **Competition frame explicit**: External VP Creative search continues alongside Christopher's interim run.
- **Russ is a termination** (not voluntary). Confidential.
- **Hub-and-spoke model** (not pipeline): Exa is advisory, responds to needs.
- **Meeting prep framing**: CEO directives at top — they're assignments, not discussion topics.

### Session 003 — John Sync Strategic Intel
- **Two Brand Threads for 2026**: "Smarter Journey to Better Golf" + "Innovation" — John's North Stars.
- **VP Narrative** (John's framing): "(a) I know what works from being deep in it + (b) building the AI Creative OS."
- **Org chart through AI lens**: "Think through AI first" — org is OUTPUT of capability mapping, not input.
- **Senior designer/art director**: John's #1 emphatic hire. Blocked Russ's CDs for lacking visual execution.
- **Fatima**: "Could be dangerous in the role" — strategic partner, not just ops.
- **CRO scope narrowed**: "Limit to big things" — quiz and major optimizations only.
- **RS1**: First test case for fully-connected brand-performance campaign.
- **OPEX reallocation**: AI saves headcount → reinvest in brand amplification.

### Session 004 — PRD v1.1 Decisions
- **Two Brand Threads as section**: NEW Section 3.5 cross-referenced to scorecard, launch tracker, weekly update, challenger, hiring.
- **Neco proof point as Day 0**: John's positive reaction to influencer brief = concrete Creative OS evidence.
- **Thread mapping**: RS1=Innovation, PG1=Both, Love Your Game=Smarter Journey, etc.

### Session 006 — Delegation & Monday Prep
- **VP Narrative escalation**: FLAG for one half missing, BLOCK for neither half.
- **Fatima as strategic partner**: Elevated tracking in delegation engine.
- **Customer success ownership**: Christopher (framework) → Fatima (coordination) → JoJo (content).

### Session 008 — Wise Reply Architecture
- **Integration approach**: Slack MCP Plugin (not Socket Mode bot). Already available, OAuth-based, simplest.
- **Gate 3 structural enforcement**: `slack_post_message` NOT allowlisted — tool literally cannot be invoked.
- **Stakeholder map location**: PRIVATE (`~/.claude/projects/...`), not in Sauce Vault.

### Session 009 — Communications Strategist Design
- **Layer 3 placement**: On-demand, produces specific deliverables. Not always-on.
- **5 skills** (expanded from 3): situational_analysis, strategic_positioning, response_architecture, risk_assessment, timing_advisory.
- **Standalone capability**: Mode 8 works without Mode 1 startup.

### Session 010 — Russ Exit Planning
- **Morton eval placement**: Inside exit brief Section 8, not standalone (causally linked to Russ exit).
- **Filipino contractor approach**: Observe 1 week before deciding (day-1 decisions = reactive).
- **Team comms timing**: Same day, within 2 hours — no information vacuum.
- **Day 30 IC altitude flag**: Explicit in delegation matrix (Christopher absorbing Russ work is necessary but dangerous).

### Session 011 — Governance & Access
- **John gets Creative OS access**: Evolves from private to shared team OS.
- **Exa stays shared**: Transparency model (not hidden from John).
- **Centralized Google Doc**: `1TRbAh5rA2Rb_RNNTApK89_k_5Zqn3uTnmZEQFFY8Nwc` (shared with John + Brixton).
- **Private file pattern**: `~/.claude/projects/.../creative-os/{agent}/_private-ops/`.

### Session 014 — iCloud Lessons (CRITICAL)
- **Date format**: MMDDYY (020626) — user preference, shorter than YYYY-MM-DD.
- **iCloud conflict fix**: Use fresh directory names iCloud has never seen. Cloud state retains old names → conflict loop. Only fix: name with zero cloud history.
- **Never rename/move dirs via terminal in iCloud Drive**: Creates sync conflicts only breakable with a new name. Rule added to root CLAUDE.md.

### Session 015a — Brixton Filter & Telos
- **Brixton filter**: Strip Russ exit, VP framing, assessments from shared docs. Keep everything else.
- **Agent names in Google Doc**: KEEP with descriptors — Brixton will appreciate named agents.
- **Telos mapping**: Role + telos on group call; drag tasks in 1:1s later.

### Session 015b — PRD Context Integration
- **Creative OS PRD Plan hands-off**: NOT Exa's document. Christopher + John co-author on Fridays.
- **Romeo**: Video Creative AI Architect, $100K base, 3-month establishment. John handling comp/legal.
- **Angle escalation pipeline**: Ads → winning angles → Pages → Campaigns → Brand campaigns.
- **VSL-to-ad bridge**: Vlad 60% from VSL sections, editors finish 40%. Needs tagging system.
- **Team comms framework**: AI empowerment messaging. Proactive 1:1 support.

### Session 016 — ClickUp Integration
- **Pivot Fathom → ClickUp**: Notetaker now working. Root cause: calendar connected to Planner but NOT notetaker.
- **Credentials**: ClickUp API token + workspace ID `9014714949` in `_ops/meetings/scripts/.env`.

### Session 017 — Daily Briefing Architecture
- **Design**: Python orchestrator + Anthropic API hybrid. Error isolation (one module fails, others continue).
- **Module fill-in order**: M7+M1 (ClickUp) → M2/M3/M6 (Gmail OAuth) → M4/M5 (Slack bot).
- **iCloud safety**: `daily-reports.nosync/` + symlink pattern.

### Session 019 — Handoff Protocol Design
- **5-line handoff template**: Replaced verbose 15-line format.
- **Context threshold**: Tightened 80% → 65%.
- **LOMS decoupled**: End-of-day routine via launchd, not part of session handoff.
- **Incremental writes**: SESSION-LOG.md updated after each phase, not just at session end.

### Session 022 — Daily Briefing Goes Live
- **ClickUp token regeneration**: Old token went stale (401 misreported as auth failure). New token in both `.env` files.
- **Christopher's ClickUp user ID**: `88456385` (fetched from `/api/v2/team`).
- **Module architecture proven**: Error isolation works — one module failure doesn't block others.

### Session 025 — Gmail OAuth & P0 Simplification
- **P0 cleanup philosophy**: Replaced 10-item P0 list with 2 active build tasks. Everything else archived as resolved or not-Exa-deliverable.
- **Gmail OAuth reuse**: Reused existing GCP project `claude-sheets-access-485318`. Token at `auth/gmail_token.json`.
- **Shared gmail_helper.py pattern**: Centralized auth + fetch + body extraction across M2/M3/M6.

### Session 026 — User Feedback Integration
- **M3 suggestion mode**: AI proposes 10 copywriting-ranked terms; user cherry-picks. Accepted terms append to `_reference/pg-golf-lexicon.csv` (305 existing terms).
- **M7 due-date filter**: Only show tasks with due dates — undated tasks are noise.
- **M6 Gmail label**: `label:newsletters newer_than:1d` — user has a curated "newsletters" Gmail label.

### Session 027 — Actionability Mandate
- **Core feedback**: Report was informational but not actionable. Every section must push toward a concrete next step aligned with 30/60/90 scorecard.
- **Shared PRD context**: `prd_context.py` with `SCORECARD_CONTEXT` constant — DRY across AI prompts.
- **URL extraction**: Gmail helper now extracts article URLs from Google Alert HTML for hyperlinked takeaways.

### Session 028 — Shared ClickUp Infrastructure
- **clickup_helper.py pattern**: Centralized BASE_URL, filter logic, task detail fetch. Reused across M1/M7/M8.
- **Configurable status exclusion**: `clickup.exclude_statuses` in config.yaml (approved, closed, done, complete).
- **Titled handoff format**: `HANDOFF PROMPT — Exa S{N} · {Focus}` (matching Neco pattern).

### Session 032-034 — Neco Autonomous Live + Daily Briefing M9
- **Quality gate validation**: Anthropic API correctly refused vague ClickUp tasks — most need richer descriptions for autonomous generation.
- **launchd FDA issue**: `/usr/bin/python3` (Xcode) lacks Full Disk Access under launchd. Fix: bash wrapper → user python3.
- **Briefing schedule**: StartCalendarInterval unreliable (doesn't fire during sleep). S035 switched to StartInterval 300s + idempotency guard.
- **M9 state tracking**: File-based `.m9-state.json` (not timestamp). 46 pre-existing transcripts seeded. Max 3 per run.

### Session 036 — Exa Audit
- **File consolidation**: 4 governance files → single `EXA-REFERENCE.md` (464 lines, 1953 removed).
- **Zero-read session start**: Build State in CLAUDE.md auto-loads. No file reads needed on entry.
- **SESSION-LOG.md becomes append-only**: No longer contains Build State.

### Session 037 — Slack OAuth Pattern
- **webhook.site workaround**: Slack rejects localhost; Playwright can't reach user machine. OAuth code captured via webhook.site redirect, exchanged for token via Python.
- **User Token Scopes**: `channels:read`, `channels:history`, `im:read`, `im:history`, `users:read`, `users:read.email`.

### Session 038-042 — Transcript Intelligence Layer
- **Three-module architecture**: M9 (structured extraction → KB) → M10 (pattern detection + scorecard gaps) → M11 (meeting prep). Shared persistent KB (`.transcript-kb.json`).
- **KB schema**: 5 collections (action_items, decisions, topics, people, recommendations). CRUD with atomic writes, fuzzy merge, dedup, pruning.
- **Scorecard context**: `scorecard_context.py` with DAY_ONE constant, checkpoint awareness (Day X of 90).
- **Rate limit handling**: base.py retry with exponential backoff (65s/130s/195s) for Anthropic 429s.
- **M0 Persistent Actions**: Non-AI module. Reads KB + `.kb-manual-items.json`, groups by owner, overdue/stale flags.
- **KB delegation**: `apply_overrides()` supports dict-style overrides (status, delegated_to, delegated_date).

### Session 043-044 — Google Calendar Integration
- **M12 architecture**: Mirrors gmail pattern. calendar_auth.py reuses GCP project. Focus blocks (>=60min gaps), back-to-back warnings, week load bar chart, AI schedule coaching.
- **Pipeline milestone**: 13/13 modules LIVE, zero failures.

### Session 045-047 — Slack Bot Architecture
- **Identity decision**: SlackBot is Exa's Slack interface, not a new agent. One brain, two surfaces (CLI + Slack).
- **Deployment**: Railway (cloud, always-on). Socket Mode.
- **Knowledge**: Hybrid — static at startup (ad angles, influencer angles, product intel) + live Tess SSS via Google Sheets API.
- **Product resolver**: 80+ aliases mapping natural language → 12 PG product codes. Longest-match-first.
- **Private repo**: `github.com/christophero90/exa-pg-creative-intel`.

### Session 048 — Slack Bot Multi-Turn + Product Intel
- **Thread history**: `thread_history.py` fetches Slack thread context. Product resolution runs against full thread text.
- **Product intel cards**: 6 distilled cards (SF2, SPD, WDG1, CLST, 357, RS1 stub). Knowledge priority: Product Intel > Ad Angles > Influencer Angles.

### Session 049 — PRD v1.1 Brand Architecture
- **Brand hierarchy**: Love Your Game (promise) → brand themes → product → root angle → testing → personas A-E.
- **Thread 1 renamed**: "A Smarter Way to Improve Golf" → "The Smarter Way to Play Better Golf".
- **Terminology locked**: "ad sets" = Meta/YouTube test units, "campaigns" = 360-degree brand campaigns.

### Session 050 — Pipeline Migration + Triage Patterns
- **Pipeline moved from Obsidian to GitHub repo**. Secrets symlinked from old path.
- **Daily reports stay local-only** (gitignored) — GitHub for shared team work.
- **Triage format preferences**: post-triage Pending Review collapses to one-line. "Already working on" = KEEP, not remove.

### Session 052 — Triage Intelligence Integration
- **Enrichment rendering**: Two-column format (Signal + Suggestion) in M0b.
- **Decision recording**: `apply_approvals()` records to `TriageHistory` with item snapshots.
- **Pipeline resilience**: All triage integration try/except wrapped — never breaks pipeline.

### Session 054 — Executive Assistant Architecture
- **capacity_engine.py**: WorkBlock, DayCapacity, PriorityScorer, classify_day_items.
- **Multi-factor scoring**: launch 0.30, overdue 0.25, deadline 0.20, scorecard 0.15, day-type 0.10.
- **3 A-task hard cap per day**. Mon-Fri only. Friday overflow → Monday.
- **Waiting On items skip triage enrichment entirely**.

### Session 055-056 — Path Migration + Exa → Orion Rename
- **34 hardcoded paths** replaced across 13 files (user-agnostic).
- **Full Exa → Orion rename**: folder, files, 30+ content files, launchd plist, private ~/.claude/ files.
- **Historical files left as-is** — session archives retain "Exa" as record.

### Session 060 — Slack Privacy Rule (CRITICAL)
- **ALL Orion automations → Christopher's DM ONLY**. Never shared/public channels. 288-member workspace with CEO/leadership = career risk.

### Session 062 — Schedule Protection (CRITICAL)
- **Bulk triage destroyed 11 confirmed week tasks**. Root cause: no schedule protection + tasks only in session prose.
- **`add_to_registry()` force guard**: items with future scheduled dates skipped unless `force=True`.
- **Session-to-KB bridge**: confirmed tasks MUST be written to `.kb-manual-items.json` + `.kb-schedule.json` on exit.

### Session 063 — EA v2.0.0 Architecture
- **M00a "Today at a Glance"**: runs LAST (needs shared_state), renders FIRST. Day X/90, tasks with time slots, meetings, launch countdowns, What Changed delta, alerts.
- **Work block allocation**: `allocate_work_blocks()` fits A-tasks into focus block gaps between meetings.
- **Auto-approve threshold**: 0.80. Transparency list in M00.
- **reconcile.py**: end-of-day CLI (d/r/s/a/q).

### Session 064 — Calendar Enrichment Killed
- **M13 calendar enrichment explored then killed.** Built full module (attendee matching, silent writes) but large meetings (15+ attendees) caused 9-10 false positive matches. Christopher decided daily report task list is sufficient.
- **OAuth scope upgraded**: `calendar.readonly` → `calendar.events` (read+write). Kept in place.

### Session 066 — PR #1 Cross-Fork Pattern
- **Cross-fork PR created**: christophero90:pg-dev-ogle → performance-golf/pg-main:main (PR #8). Remote `pg-main` added to local git config.
- **Fathom MCP portability**: Keep in shared mcp.json, use `bash -c` wrapper so `~` expands at runtime.

### Session 067 — Timezone Fix Architecture
- **API-level timezone fix** instead of post-hoc conversion. Tell Calendar API to return times in `Europe/Lisbon` — fixes both display formatting AND capacity engine overlap calculations in one change.

### Session 068 — Slack Privacy + Team Bot Design
- **Team-wide bot, not CEO-only.** Anyone at PG can DM Orion, same data restrictions apply universally. Allowlist protects Christopher's private operational data, not who's asking.
- **Exa→Orion rename in pipeline**: 22 references across 12 module files. Only remaining "Exa" is in `.bak` file.

### Session 069b — Bot Output + Hosting Decisions
- **Google Docs MCP**: Use `@a-bonus/google-docs-mcp` (npm package), not local build. Conflicting user-level entry removed.
- **Bot hosting**: Must be server-deployed (Railway/Render) for team-facing bot — anyone in PG, anytime.
- **Slack-first output**, Google Doc write-back optional with explicit permission.

### Session 070-071 — Personal Bot Architecture
- **Local, not hosted**: KB files are local, pipeline is local, Socket Mode eliminates hosting need.
- **Separate app**: private task bot ≠ team data bot. Different Slack apps, different concerns.
- **Positional priority**: score-based ranking within tier (highest score = position 1). 3 A-task cap, 3 B-task cap, C = no position.
- **reconcile.get_today_items bug**: Schedule JSON has wrapper keys but function iterates top-level dict. Fixed with transcript_kb.load_schedule() for flat dict access.

### Session 074b — Intent Classification Gap
- **Default handler should NOT be create-task** — should ask for clarification or use Claude to classify intent.
- **Tier/position references (A1, B1, B2) must be supported** — Christopher naturally refers to tasks by daily position.

### Session 074c-075 — Personal Bot Claude-as-Agent Architecture
- **Haiku for intent classification** — fast + cheap (~200 tokens/call). "Unclear" as default instead of create-task.
- **Claude-as-Agent replaced intent→handler pipeline** — every message goes to Haiku with system prompt + thread history + 5 tool definitions. Claude decides actions naturally.
- **Report as ground truth** — daily report is what Christopher sees; bot must agree with it. Task ID map parsed from rendered M0 table.
- **Thread history**: in-memory, 1hr TTL, 20 messages max. No persistence needed for single user.

### Session 076 — Quick Refresh Architecture
- **Surgical re-render (1.1-1.4s)** instead of full pipeline (633s). Patches M00a/M0b/M0 via HTML comment markers. Only non-AI task modules run.
- **Auto-refresh after mutations** — `regenerate_report` tool fires automatically after any task-modifying operation.

### Session 078 — Triage Intelligence v2.0
- **5 learned placement rules** from Christopher's feedback: (1) scheduling→today/tomorrow, (2) someone else→remove, (3) waiting on input→don't place, (4) automated→don't place, (5) cross-reference meetings for piggyback.
- **TaskClassifier**: 5 types (scheduling 10m, quick_action 15m, deep_work 60m, strategic 30m, stale 0m).
- **Hybrid dedup**: SequenceMatcher + Jaccard word overlap at 0.52 threshold.

### Session 079-081 — Team Bot Architecture
- **Service account over OAuth** for Railway deploy. Base64-encoded JSON in env var.
- **6 tools, all read-only** — performance_summary, top_ads, by_funnel, strategy_recommendations, pipeline_status, agent_status.
- **5-minute cache** on all data sources to prevent API hammering.
- **Second app-level token** for Socket Mode conflict — personal bot keeps `exa-socket`, team bot uses `orion-team-socket`.
- **Worker process** in Procfile (not web) — Socket Mode uses outbound WebSocket.

### Session 082-085 — Message Shortcut + Personal Bot Closeout
- **"Connect to apps" is the permanent UX path** for message shortcuts in third-party Slack apps.
- **chat_update needs DM channel ID from response**, not user ID (Slack resolves user ID → DM channel).
- **Personal bot closed as FEATURE-COMPLETE v3.3** — 6 tools, 2 message shortcuts, thread memory, auto report refresh.
- **Slack has THREE name layers** for bots: App Name (Basic Info), Bot Display Name (App Home), Workspace Bot User (Configuration page).

### Session 087-089 — Team Bot Creative Advisor Upgrade
- **User profiles in `context/users/`** — deployed via Docker, auto-update with repo push.
- **Context-first creative workflow** — 4-step: identify user → understand project → confirm → produce.
- **Sonnet for all team bot messages** — creative tasks need Sonnet-level reasoning.
- **ClickUp integration KILLED** — Donnie's team building separate Brixton dashboard.
- **14 tools total** (6 data + 5 creative + 3 Google Docs).

### Session 088 — Save Context Architecture
- **Flat directory with YAML frontmatter tags** — no subdirectories, no index file. `grep -rl` on frontmatter is sufficient.
- **`_shared/context-library/`** — committed, available to all agents.
- **Same propose-then-confirm DM flow** as Create Orion Task shortcut.

### Session 092 — Prompt Injection Over Model Upgrade
- **Per-message URL injection** rather than Haiku→Sonnet upgrade for Save Context Google Doc flows. Cheaper and more reliable.
- **Replace-not-append for doc revisions** — team bot overwrites originals, doesn't create "revised" sections.

### Session 094 — SF2 Launch Board Architecture
- **Orion owns launch boards** (not Neco) — cross-functional strategic alignment is Orion's domain.
- **5 personas per launch** (not 9) — each batch 1 variation targets one persona.
- **Phase 1 expansions = hook stacks ONLY** (vertical). No horizontal environment changes.
- **Phase 2 trigger = calendar-based** (2 weeks post-launch).
- **3 launch phases**: Launch → Expansion & Optimization → Page & Funnel Optimization.

### Session 096 — Persona Selection
- **P5 Comeback Golfer > P9 Competitive Amateur** for launch persona #5. Market size, self-identification fit, emotional potency all favor Comeback Golfer.

### Session 101 — Launch Board Build Method
- **HTML → Figma Capture (via MCP)** — HTML file is portable artifact and future skill template.
- **Board is proof of concept** for reusable SOP addressing John's campaign alignment + asset visibility gaps.

### Session 101c — Brand Deposit Map Distinction
- **Brand deposit map ≠ SF2 launch board.** SF2 = campaign alignment + asset visibility. Brand deposit map (influencer program, organic content) = separate unbuilt deliverable.
- **Document framing**: Not about proving himself → about showing progress and stepping up to free John for higher-level work.

### Session 102 — Priority Guard Architecture
- **B→A boundary**: Synthetic scores must respect tier boundaries (B=0.34 < A threshold 0.35). No silent auto-promotion.
- **ClickUp due-tomorrow exception**: Only case where B auto-promotes to A, with Why column note.
- **Entity-aware calendar cross-ref**: Offer names (SF2, RS1, etc.) + keyword overlap replace character-sequence matching.

### Session 030-031 — Neco Autonomous Architecture
- **Hybrid project state approach**: `project-state.yaml` in Neco root (machine-readable). Runner reads 3 sources: ClickUp tasks + project-state.yaml + reference files.
- **Smart evaluation logic**: 5 scenarios — new work, LOCKED (skip), human_review (skip), IN_PROGRESS (continue), dependency-blocked (skip).
- **Quality gate validation**: Anthropic API correctly refused vague ClickUp tasks (e.g., "Batch 3 | CTA Copy") and flagged missing context. Most ClickUp tasks need richer descriptions for autonomous generation.
- **Directory-based queue**: pending/completed under `_ops/neco-autonomous/_output/`. `.nosync` protected.

---

## Changelog

| Session | Files Created | Files Modified |
|---------|--------------|----------------|
| 001 | EXA-PRD.md (v1.0), CLAUDE.md (v1.0), SESSION-LOG.md (v1.0), _reference/spark-book-launch-map.md | — |
| 002 | _ops/ directory structure, _ops/meetings/prep/020626–john-1on1-prep.md, EXA-MASTER-AGENT.md (v1.0) | — |
| 003 | _ops/meetings/prep/020626–ogle-x-john-sync.md, _ops/meetings/prep/020626–john-sync-analysis.md | EXA-PRD.md (path refs), EXA-MASTER-AGENT.md (path refs), MEMORY.md (path update) |
| 004 | — | EXA-PRD.md (v1.0→v1.1, 12 edits) |
| 005 | — | EXA-MASTER-AGENT.md (2/6 edits: header + system diagram) |
| 006 | _ops/meetings/prep/021026–john-followup-agenda.md, _ops/deliverables/021026–recruiting-plan-for-brixton.md | EXA-MASTER-AGENT.md (4/6 edits completing v1.1) |
| 007 | EXA-SUB-AGENTS.md (Section 1 + 2.1 + 2.2) | — |
| 008 | — | ~/.claude/settings.json (Slack plugin), ~/.claude/settings.local.json (tool allowlist) |
| 009 | ~/.claude/skills/wise-reply/SKILL.md, ~/.claude/projects/.../stakeholder-map.md | EXA-MASTER-AGENT.md (Mode 8), EXA-SUB-AGENTS.md (2.3 Comms Strategist), CLAUDE.md (exa), ~/.claude/CLAUDE.md, pg-creative-os/CLAUDE.md, EXA-PRD.md |
| 010 | _ops/deliverables/021326–russ-exit-execution-brief.md | — |
| 011 | _ops/meetings/prep/020926–john-working-session-agenda.md, _ops/deliverables/020926–creative-os-org-visual.md, _ops/deliverables/020926–google-doc-content-draft.md | — |
| 012 | — | — |
| 013 | SESSION-LOG-ARCHIVE.md | SESSION-LOG.md (compression) |
| 014 | — | SESSION-LOG.md, SESSION-LOG-ARCHIVE.md, EXA-MASTER-AGENT.md, MEMORY.md (all: path refs + date format) |
| 015a | _ops/meetings/prep/021026–john-tuesday-session-agenda.md | _ops/deliverables/020926–google-doc-content-draft.md, root CLAUDE.md (iCloud safety), Exa CLAUDE.md (common mistakes) |
| 015b | — | SESSION-LOG.md (Build State + intel), EXA-PRD.md (scorecard + pipeline), EXA-MASTER-AGENT.md (delegation + integration) |
| 016 | _ops/meetings/scripts/fetch-clickup-transcripts.py, .env, .last-fetch.json, 10 transcript files | — |
| 017 | _ops/daily-briefing/ (full pipeline), _ops/run-exa-daily.sh, com.performancegolf.exa.plist, daily-reports.nosync/ + symlink | — |
| 018 | com.performancegolf.clickup-sync.plist, _ops/meetings/scripts/logs/ | fetch-clickup-transcripts.py (subfolder + --reorganize), ~/.zshrc (3 aliases) |
| 019 | — | Exa CLAUDE.md (4 edits), EXA-PRD.md (4 edits), root CLAUDE.md (1 edit) |
| 020 | loms-capture.py, com.performancegolf.loms-nightly.plist | — |
| 021 | — | Neco CLAUDE.md (3 edits), Veda CLAUDE.md (3 edits), Tess CLAUDE.md (2 edits) |
| 022 | — | m7_clickup_inbox.py, m1_automation_scanner.py, config.yaml, 2x .env files |
| 023 | — | SESSION-LOG-ARCHIVE.md (compression), .env (ANTHROPIC_API_KEY) |
| 025 | gmail_helper.py, auth/gmail_credentials.json, auth/gmail_token.json, auth/gmail_auth.py | m2, m3, m6 modules, config.yaml, .env |
| 026 | — | m7, m3, m6 modules, config.yaml |
| 027 | modules/prd_context.py | gmail_helper.py, m1, m2, m6, m8 modules |
| 028 | modules/clickup_helper.py | config.yaml, m1, m7, m6, m8 modules, CLAUDE.md, EXA-PRD.md |
| 029 | — | m1, m7 modules, clickup_helper.py, config.yaml |
| 030 | ~/.claude/plans/delightful-stirring-stearns.md | — |
| 031 | neco project-state.yaml, _ops/neco-autonomous/ (config, context, prompts, runner, shell wrapper) | — |
| 032 | com.performancegolf.neco-autonomous.plist, live test output + morning report | neco CLAUDE.md (handoff step 3) |
| 033 | _ops/meetings/scripts/run-clickup-sync.sh | clickup-sync.plist, exa.plist (5am), run-exa-daily.sh |
| 034 | m9_transcript_prd_recommender.py, .m9-state.json, Liv security response | __init__.py, config.yaml (M9) |
| 035 | — | run-exa-daily.sh (idempotency), exa.plist (StartInterval 300), SESSION-LOG-ARCHIVE.md |
| 036 | EXA-REFERENCE.md (consolidated), _reference/key-intel.md | CLAUDE.md (full rewrite), SESSION-LOG.md (Build State removed) |
| 037 | auth/slack_token.json, localhost certs | slack_auth.py, .env (Slack vars) |
| 038 | transcript_kb.py, scorecard_context.py, m9_transcript_intelligence.py | — |
| 039 | — | clickup_helper.py, m1, m2, m6, m7 modules |
| 040 | m10_kb_analyzer.py, m11_meeting_prep.py | __init__.py, config.yaml (M9→M9/M10/M11) |
| 041 | m0_persistent_actions.py, .kb-manual-items.json, romeo checklist, monday prep | __init__.py, config.yaml, transcript_kb.py, m10 |
| 042 | — | base.py (retry/backoff), m9 (delay + JSON repair) |
| 043 | calendar_auth.py, calendar_helper.py, m12_daily_schedule.py | __init__.py, config.yaml, .env |
| 044 | auth/calendar_token.json | — |
| 045 | slack-bot/ directory structure, .gitignore, .env.example, requirements.txt | plan file |
| 046 | app.py, config.py, Procfile, ai/, handlers/, knowledge/, utils/ modules, data/sync.sh | — |
| 047 | slack-bot/.env | — |
| 048 | thread_history.py, 6 product intel cards | message_handler.py, loader.py, system_prompt.py, config.py |
| 049 | — | CREATIVE-OS-PRD-PLAN.md (v1.1) |
| 050 | _ops/daily-briefing/, daily-reports.nosync/, MEMORY.md | launchd plist, .gitignore |
| 051 | — | SESSION-LOG-ARCHIVE.md, SESSION-LOG.md (compression) |
| 052 | .kb-triage-history.json | m0b, transcript_kb.py, config.yaml |
| 053 | fathom-sync.plist, 2 transcripts | fetch-fathom-transcripts.py |
| 054 | capacity_engine.py | preferences, config, daily_briefing, triage, m0, m0b |
| 055 | — | 13 files (path migration) |
| 056 | orion.plist | 30+ files (Exa→Orion) |
| 057 | — | daily_briefing.py (Phase 1.5 + title) |
| 058 | — | fathom-sync.plist, clickup-sync.plist |
| 059 | 2026-03-07-PREVIEW.md | config.yaml |
| 060 | — | .env (webhook) |
| 062 | — | .kb-manual-items.json, .kb-schedule.json, transcript_kb.py |
| 063 | m00a_today_summary.py, reconcile.py | __init__.py, daily_briefing.py, config.yaml, 5 modules |
| 064 | — | calendar_auth.py (scope), calendar_helper.py (scope), .kb-approvals/schedule/manual-items/triage-history.json |
| 065 | 2026-03-09-PREVIEW-v2.md | MEMORY.md (Lisbon timezone) |
| 066 | — | .claude/mcp.json (Fathom path fix), SETUP.md (MCP section) |
| 067 | — | config.yaml (display_timezone), daily_briefing.py, m12, calendar_helper, m00a (timezone fix) |
| 068 | — | 12 pipeline modules (Exa→Orion), ~/.claude/settings.local.json (slack_post_message) |
| 069 | — | .kb-approvals/overrides/schedule/priorities.json, 2026-03-09.md |
| 069b | — | ~/.claude/.mcp.json (removed conflicting google-docs) |
| 070 | _ops/orion-personal-bot/ (scaffolded) | — |
| 071 | bot.py, kb_ops.py, task_parser.py, conversation.py, priority_explainer.py, requirements.txt, env.template, plist | — |
| 072 | — | — (Slack app created externally) |
| 073 | .env (4 tokens) | — |
| 074 | — | 2026-03-10.md, .kb-manual-items/schedule/completed-registry/transcript-kb.json |
| 074b | .gitignore | kb_ops.py (importlib bypass), plist (venv path) |
| 074c | intent_classifier.py | bot.py (rewired to intent classifier) |
| 075 | agent.py (conversation engine) | bot.py (slim router), kb_ops.py (priority loading) |
| 076 | quick_refresh.py | agent.py (regenerate_report tool) |
| 077 | — | SESSION-LOG-ARCHIVE.md, ~/.claude/.mcp.json (Playwright) |
| 078 | — | triage_intelligence.py (v2.0), m0b_pending_review.py |
| 079 | bot.py, agent.py, data_sources.py, Dockerfile, requirements.txt, .env.template, .gitignore (team-bot) | — |
| 080 | .env (team-bot) | data_sources.py (cos_dir path fix) |
| 081 | Procfile, railway.toml | data_sources.py (graceful degradation), .env |
| 082 | — | bot.py (@app.shortcut handler) |
| 083 | — | bot.py (chat_update channel ID fix) |
| 084 | — | .env (team-bot token fix) |
| 085 | — | bot.py (channel ID fix — duplicate of S083) |
| 086 | README.md (personal-bot) | SETUP.md |
| 087 | — | — (planning only) |
| 088 | — | — (planning only) |
| 089 | context/product-catalog.md, creative-frameworks.md, users/brixton.md (team-bot) | agent.py, data_sources.py (team-bot: creative tools + Google Docs) |
| 090 | _shared/context-library/.gitkeep | kb_ops.py (save_context_file), agent.py (save_context tool), bot.py (shortcut handler) |
| 091 | — | CLAUDE.md (Build State v9.2) |
| 092 | — | bot.py (Google Doc URL extraction), agent.py (team-bot Docs rules) |
| 093 | — | SESSION-LOG-ARCHIVE.md (compression), SESSION-LOG.md |
| 094 | _ops/launch-boards/sf2/, 3 memory files | — |
| 095 | sf2-launch-board-content.md (Sections 1-3) | CLAUDE.md (v9.4) |
| 096 | — | sf2-launch-board-content.md (Sections 4-6), CLAUDE.md (v9.5) |
| 097 | — | sf2-launch-board-content.md (Sections 7-10), CLAUDE.md (v9.6) |
| 098 | — | bot.py (PDF/Word support), agent.py (file markers), requirements.txt |
| 099b | — | bot.py (Vision OCR, message re-fetch, debug logging) |
| 100 | 2026-03-13-chris-f-call-prep.md | triage_intelligence.py (filter_already_handled), m0b_pending_review.py, .kb-completed-registry.json |
| 101 | sf2-launch-board.html | CLAUDE.md (v10.0) |
| 101b | sf2-launch-board-figma.html, deploy/ | sf2-launch-board.html (Section 00), CLAUDE.md (v10.1) |
| 101c | 031426-30-day-review-alignment-brief.md | CLAUDE.md (v10.2) |
| 101c-b | — | deploy/index.html (new sections, font bumps, renumbering), CLAUDE.md (v10.3) |
| 102 | feedback_task_placement_rules.md | daily_briefing.py (check_network retry), capacity_engine.py (B→A guard), triage_intelligence.py (entity-aware) |

---

## P0 Item History

| Item | Raised | Resolved | Notes |
|------|--------|----------|-------|
| John meeting prep | S001 | S006 | Agenda + recruiting plan delivered for Monday Feb 10 |
| PRD v1.1 revision | S003 | S004 | 12 edits incorporating John sync intel |
| MA v1.1 revision | S003 | S006 | 6 edits across S005-S006 |
| Monday agenda | S003 | S006 | _ops/meetings/prep/021026–john-followup-agenda.md |
| Recruiting plan | S002 | S006 | _ops/deliverables/021026–recruiting-plan-for-brixton.md |
| Wise Reply implementation | S008 | S009 | All 11 steps complete. Verification still pending. |
| Russ exit brief | S010 | S010 | 11-section plan with Morton eval. Exit date moved to ~Feb 19 (S015b). |
| iCloud corruption fix | S014 | S015a | chflags -R nohidden + safety rules added to root CLAUDE.md |
| Two-tier compression | S012 | S013 | SESSION-LOG-ARCHIVE.md created, 82% reduction |
| ClickUp transcript automation | S016 | S018 | fetch-clickup-transcripts.py, 46 backfilled, launchd auto-sync |
| Daily Briefing build | S017 | S022 | M1+M7 LIVE (S022). 5 modules pending (Gmail OAuth, Slack bot). |
| Rolling handoff protocol | S019 | S021 | All 7 changes complete across 4 agents (Exa, Tess, Veda, Neco). |
| Gmail OAuth | S017 | S025 | Reused GCP project, token at auth/gmail_token.json. Unlocked M2/M3/M6. |
| Daily Briefing M2/M3/M6 | S025 | S026 | All Gmail-based modules LIVE with user refinements. |
| Daily Briefing actionability | S027 | S029 | 5-change plan: PRD context, URLs, due-dates, action steps, Neco seed. v0.7.0. |
| Neco Autonomous Runner | S030 | S032 | v1.0 LIVE — launchd 10pm nightly, quality gates working, project-state.yaml pattern. |
| Session log compression (2nd) | S023 | S023 | S010-S019 archived, 559→~210 lines (63%). |
| M9 Transcript PRD Recommender | S033 | S034 | LIVE. Replaced by Transcript Intelligence Layer in S038-S040. |
| Briefing automation (sleep issue) | S033 | S035 | StartInterval 300s + idempotency guard. Self-healing on wake. |
| Exa audit & optimization | S036 | S036 | 4 files → EXA-REFERENCE.md. Build State in CLAUDE.md. Zero-read start. |
| Slack OAuth (M4/M5) | S037 | S037 | 9/9 modules LIVE. webhook.site workaround for Slack OAuth. |
| Transcript Intelligence Layer | S038 | S042 | M9+M10+M11 + persistent KB. 12/12 → 13/13 LIVE (with M12). |
| Google Calendar M12 | S043 | S044 | OAuth complete, 13/13 LIVE. |
| Slack bot Phase 1 MVP | S045 | S048 | Architecture → code → Slack app → multi-turn + product intel. Bot running. |
| Session log compression (3rd) | S051 | S051 | S032-S047 archived. |
| Daily Brief Intelligence Upgrade | S051 | S052 | Triage enrichment, decision recording, pattern learning. |
| Fathom transcript sync | S053 | S053 | --since flag, launchd 30-min auto-sync. |
| Executive Assistant Intelligence | S054 | S054 | capacity_engine.py, multi-factor ABC, 3 A-task cap, week-ahead. |
| Path migration (user-agnostic) | S055 | S055 | 34 paths → relative across 13 files. |
| Exa → Orion rename | S055 | S058 | Full rename: folder, files, content, launchd, private files, ghost cleanup. |
| Slack webhook (Tool 1) | S060 | S060 | Orion Daily Briefing app, webhook to DM only. |
| Task recovery + schedule protection | S062 | S062 | 14 items recovered, force guard on add_to_registry(). |
| EA v2.0.0 | S063 | S063 | M00a, work blocks, conflict detection, launch countdown, auto-approve, reconcile.py. |
| Session log compression (4th) | S067 | S067 | S048-S063 archived. |
| Calendar enrichment M13 | S064 | S064 | Explored then killed — too noisy for large meetings. |
| Pipeline timezone fix | S065 | S067 | Calendar API → display_timezone: Europe/Lisbon. |
| PR #8 cross-fork | S066 | S072 | Donnie approved, merged to performance-golf/pg-main:main. |
| Google Docs MCP fix | S069b | S072 | Conflicting user-level config removed. Verified working. |
| Exa→Orion pipeline rename | S068 | S068 | 22 refs across 12 modules. Slack app renamed. |
| Slack chat:write + allowlist | S068 | S068 | slack_post_message allowlisted. Gate 3 preserved for Wise Reply. |
| Orion Personal Bot v1-v3 | S070 | S085 | Design → code → intent classifier → Claude-as-Agent → report refresh → message shortcut. FEATURE-COMPLETE v3.3. |
| Session log compression (5th) | S077 | S077 | S064-S074b archived. |
| Triage Intelligence v2.0 | S078 | S078 | TaskClassifier, ScheduleSuggester, hybrid dedup, "Why" column. 5 placement rules. |
| Team bot scaffold + Railway deploy | S079 | S084 | Scaffold → auth → Socket Mode fix → Railway deploy. 6 read-only tools, SSS data. |
| Message shortcut (Create Orion Task) | S082 | S085 | Shortcut → E2E test → channel ID bug fix. "Connect to apps" UX path. |
| Personal bot README | S086 | S086 | Comprehensive setup guide + SETUP.md updates. |
| Team bot creative advisor upgrade | S087 | S089 | Product catalog, creative frameworks, user profiles, 14 tools, Sonnet, Google Docs. Railway deployed. |
| Save Context shortcut | S088 | S091 | Design → code → Slack config → LIVE. context-library/ + kb_ops + agent tool + bot handler. |
| Session log compression (6th) | S093 | S093 | S074c-S089 archived. |
| Save Context — Google Doc + E2E | S091 | S092 | Per-message URL injection. Google Doc reading gap closed. |
| SF2 Launch Board — Full build | S094 | S101c-b | 10→13 sections, HTML+Figma+Surge, John VM feedback integrated, CEO card, 30-Day Review |
| Personal Bot v4.0-4.1 | S098 | S099b | PDF/Word support, Vision OCR. Agent extraction gap remaining. |
| Triage cross-reference filter | S100 | S100 | filter_already_handled() checks tracker + calendar + ClickUp. |
| Completed task registry expansion | S102 | S102 | 373 entries. B→A guard, entity-aware calendar. |
| Session log compression (7th) | S106 | S106 | S090-S102 archived. |
| PG1 Voluntary Pricing — checkouts + sales pages | S104 | S111 | 4 checkout pages + 2 sales pages + Pricing Option Structure template. $29/mo PG1. April 6 deadline. Figma file geD8wYoIthYpFCGXbs29hk |
| Triage-first daily brief | S107 | S107 | M00a stripped of tasks. Two-pass triage workflow. Reason code taxonomy (11 codes) |
| Personal bot v5.0 — schedule verification + check-in | S109 | S109 | Silent schedule write bug fixed. Post-write verification. Hourly check-in + pre-call nudge. 13 tools total |
| SF2 CLM v2 | S110 | S110 | 10→13 sections. E-com pivot. $349 non-member. 5 Key Themes. Surge deployed |
| RS1 CLM v1 | S112 | S112 | 12 sections, 9 features, 5 influencer themes. Ecomm copy = primary source (Donnie). Surge deployed |
| Session log compression (8th) | S117 | S117 | S104-S112 archived. |
