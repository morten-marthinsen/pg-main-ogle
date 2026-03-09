# Context Optimization Audit — Creative OS

**Date**: 2026-02-09
**Auditor**: Context Optimizer Agent
**Scope**: All session logs, MEMORY.md, CLAUDE.md files across Creative OS

---

## 1. Inventory & Measurements

### 1.1 Session Log Sizes

| Agent | File | Lines | Bytes | Sessions Logged | Lines/Session | Archive |
|-------|------|------:|------:|----------------:|--------------:|---------|
| Root COS | `SESSION-LOG.md` | 146 | 6.3 KB | 2 | 73 | None |
| Orion | `orion-chief-of-staff/SESSION-LOG.md` | 1,005 | 58 KB | 10 | 100 | None |
| Tess | `tess-strategic-scaling-system/SESSION-LOG.md` | 2,422 | 119 KB | 9 (active, S099-S118) | 269 | `SESSION-LOG-ARCHIVE.md` (196 lines, 8.5 KB, S001-S075) |
| Veda | `veda-video-editing-agent/SESSION-LOG.md` | 4,416 | 285 KB | 36 (S001-S036) | 123 | None |
| Neco | `neco-neurocopy-agent/SESSION-LOG.md` | 1,262 | 82 KB | 13 | 97 | None |
| **TOTAL** | | **9,251** | **550 KB** | **~178** (incl. Tess archive) | | |

**Key Finding**: Veda's session log is the single largest context file at 285 KB (~71K tokens). Tess is second at 119 KB. Together they account for 73% of all session log volume.

### 1.2 CLAUDE.md Sizes

| File | Lines | Bytes |
|------|------:|------:|
| `~/.claude/CLAUDE.md` (global) | 62 | 3.6 KB |
| Root COS `CLAUDE.md` | 127 | 6.1 KB |
| Orion `CLAUDE.md` | 147 | 7.8 KB |
| Tess `CLAUDE.md` | 114 | 4.5 KB |
| Veda `CLAUDE.md` | 124 | 6.0 KB |
| Neco `CLAUDE.md` | 166 | 8.4 KB |
| **TOTAL** | **740** | **36.4 KB** |

### 1.3 Memory Files

| File | Lines | Bytes |
|------|------:|------:|
| `MEMORY.md` (global) | 93 | 11 KB |
| `veda-patterns.md` | 47 | 3.0 KB |
| `stakeholder-map.md` | 134 | 8.1 KB |
| **TOTAL** | **274** | **22.1 KB** |

**Note**: MEMORY.md has a 200-line truncation limit. At 93 lines currently, it has ~107 lines of headroom. However, it is growing: each new session adds status updates and key references. At the current growth rate, it will hit the 200-line ceiling within 5-10 sessions.

### 1.4 Total Context Budget

| Category | Lines | Bytes | Est. Tokens |
|----------|------:|------:|------------:|
| Session Logs (all 5 + archive) | 9,447 | 558 KB | ~140K |
| CLAUDE.md files (all 6) | 740 | 36 KB | ~9K |
| Memory files (3) | 274 | 22 KB | ~5.5K |
| **TOTAL** | **10,461** | **616 KB** | **~154K** |

Not all of this is loaded simultaneously (the "context budget rules" in each CLAUDE.md instruct agents to read selectively), but session logs in particular are read fully at session start — and Veda's 4,416-line log is becoming unmanageable.

---

## 2. Information Density Analysis

### 2.1 Session Log Content Taxonomy

After sampling all 5 session logs (first 100 + last 100 + mid-sections), I identified 6 categories of content:

| Category | Description | Typical % of Session Entry |
|----------|-------------|---------------------------:|
| **Build State YAML** | Top-of-file machine-readable state block | 5-15% (once per file) |
| **Strategic Context** | Decisions made, architectural choices, scope changes | 15-25% |
| **Operational Detail** | Orionct commands run, file paths, error messages, retries | 30-40% |
| **File Manifests** | Tables listing files created/modified with line counts | 10-15% |
| **Handoff Prompts** | Next-session resume blocks (duplicates "Next" section) | 5-10% |
| **Changelogs** | Bottom-of-file tables summarizing all sessions | 5-10% |

### 2.2 Agent-by-Agent Density

**Root COS** (146 lines, 2 sessions): HIGH density. Well-structured. Each session entry has: Focus, Completed, Files Created, Decisions Made, Next. Minimal operational noise. This is already close to optimal.

**Orion** (1,005 lines, 10 sessions): MODERATE density. The Build State YAML (79 lines) is excellent — machine-readable, compact, comprehensive. Session entries are moderately detailed. The "What Happened" sections include strategic reasoning alongside operational detail. The handoff prompts at the end of each session duplicate ~80% of the "Next Session Priorities" section.

**Tess** (2,422 lines, 9 active sessions): LOW density. The Session State YAML is massive (100+ lines) and accumulates historical annotations that should live in the archive. The Changelog at the bottom (lines 2396-2421) compresses ~20 sessions into 26 lines — proving that compression works. Session entries include pipeline commands, formula fixes, and cell-level debugging detail. The CSV Upload Runbook (lines 2374-2394) is operational documentation that belongs in a separate file, not in the session log.

**Veda** (4,416 lines, 36 sessions): LOWEST density. This is the biggest problem. Key issues:
1. **Build State YAML is 89 lines** and contains credentials, reference paths, and confirmed decisions that belong in a separate reference doc
2. **Sessions include full sub-agent descriptions** — e.g., Session 011 documents every test case name, every exported function, and every pipeline step for 6 sub-agents (~220 lines of session entry for one session)
3. **"Priorities" sections** appear as separate `## Session N -> N+1 Priorities` entries, doubling the session boundary content
4. **The Changelog** (lines 4386-4416) compresses 36 sessions into 31 lines — a 142:1 compression ratio, proving the data can be compressed dramatically

**Neco** (1,262 lines, 13 sessions): MODERATE density. The Build State YAML (98 lines) contains confirmed decisions from every session, accumulating forever. Session entries use nested YAML blocks inside the session log, which is verbose but structured. The Changelog at bottom is compact and useful.

### 2.3 Redundancy Between Session Logs and MEMORY.md

MEMORY.md duplicates the following from session logs:

| Duplicated Information | In MEMORY.md | Also In Session Log |
|------------------------|:------------:|:-------------------:|
| Current session count | Yes | Yes (YAML header) |
| API credentials configured | Yes | Yes (Veda Build State) |
| Git commit count/hash | Yes | Yes (Veda Build State) |
| Phase completion status | Yes | Yes (multiple session entries) |
| Confirmed decisions (key ones) | Yes | Yes (every session) |
| Blocker status | Yes | Yes (latest session) |
| Test counts | Yes | Yes (latest session) |
| Next session priorities | Yes | Yes (latest session) |

**Estimated redundancy**: ~40% of MEMORY.md's agent-specific content is duplicated from session log headers. This is intentional (MEMORY.md is always loaded, session logs are optional), but it means MEMORY.md grows linearly with session count.

### 2.4 Information Never Referenced Again

Based on session log patterns, the following categories of information are written but rarely or never referenced in subsequent sessions:

1. **Individual test names/descriptions** (e.g., "parseTimestamp (5), formatTimestamp (6), getTranscriptDuration (2)...") — these are in the test files themselves
2. **Orionct file line counts** at time of creation — files change; original counts become stale
3. **Error messages and debugging traces** — once resolved, these are noise
4. **Step-by-step "What Happened" narrative** — the decisions matter, the play-by-play does not
5. **Handoff prompts** that restate the "Next" section — pure duplication
6. **Intermediate pipeline outputs** (e.g., "24,360 rows ingested -> 1,058 unique assets") — one-time data

---

## 3. Two-Tier System Proposal

### 3.1 Architecture

```
SESSION-LOG.md (Tier 1: Summary)
├── Build State YAML (compact, ~30-50 lines)
├── Session N (most recent — ~15-20 lines each)
├── Session N-1
├── ...last 5-10 sessions...
├── Changelog (all sessions, 1-2 lines each)
└── Pointer: "Full session detail: SESSION-LOG-FULL.md"

SESSION-LOG-FULL.md (Tier 2: Full Detail)
├── All session entries with full operational detail
├── File manifests, test results, error traces
├── Handoff prompts
└── Historical Build State snapshots
```

**Tier 1 (SESSION-LOG.md)** is the default file read at session start. It is optimized for LLM context: compact, high-signal, decision-focused. Target: **15-20 lines per session**, with only the last 5-10 sessions in detail. Older sessions live only as changelog entries.

**Tier 2 (SESSION-LOG-FULL.md)** is the archival log. It preserves the current level of detail for deep reference. It is NEVER read at session start — only accessed when a specific session's operational detail is needed (e.g., "What exact error did we hit in Session 022?").

### 3.2 Tier 1 Session Entry Format

```markdown
## Session NNN — YYYY-MM-DD

**Focus**: [One sentence describing the session goal]
**Status**: [COMPLETE | PARTIAL | HANDOFF]

### Accomplished
- [Bullet 1: What was built/changed — with file names but not line counts]
- [Bullet 2: Key integration or verification result]
- [Bullet 3: ...]

### Decisions
- [Decision 1 — what was chosen and why, one line]
- [Decision 2 — ...]

### Blockers
- [Any blockers, or "None"]

### Next
- [Priority 1]
- [Priority 2]
```

Target: **15-20 lines per session**. No test case names, no function signatures, no error traces, no handoff prompts (the "Next" section IS the handoff).

### 3.3 Concrete Example: Converting Veda Session 011

**BEFORE (Tier 2 — Current format, Session 011):**
~220 lines including full sub-agent descriptions, every test name, function signatures, pipeline coverage tables, 91 decisions referenced, "MASSIVE BUILD SESSION" narrative, etc.

**AFTER (Tier 1 — Compressed):**

```markdown
## Session 011 — 2026-02-06

**Focus**: Build 6 remaining sub-agents + orchestrator + /veda-validate slash command
**Status**: COMPLETE

### Accomplished
- Built 6 sub-agents: export_manager (24t), assembly_editor (31t), template_renderer (62t), transcript_analyzer (51t), root_angle_verifier (27t), ai_editor placeholder
- Built pipeline orchestrator (23t) wiring all 9 sub-agents through 10-step pipeline with DI and human pauses
- Created /veda-validate slash command
- Git init + 4 commits. 337/337 tests, 11 files.
- All non-blocked sub-agents complete.

### Decisions
- DI pattern for all sub-agents (CommandRunner, FileProber, SheetsReader/Writer)
- Human checkpoints at Steps 3, 5, 9 (not configurable)
- Skippable external steps (Iconik fetch/upload) for dry-run mode

### Blockers
- asset_fetcher, asset_uploader, metadata_manager blocked on Iconik credentials

### Next
- FFmpeg integration testing (real file operations)
- AI editor API integration (FAL.ai key setup)
- Phase 2 planning
```

**Compression: 220 lines -> 22 lines (10:1 ratio)**

### 3.4 Build State YAML Optimization

The Build State YAML should also be compressed for Tier 1:

**Current Veda Build State**: 89 lines (credentials, references, all confirmed decisions, integration status)

**Proposed Tier 1 Build State**: ~30 lines

```yaml
session_id: VEDA-2026-02-09-v0.30
session_number: 036
version: "0.30"
status: Phase 5 demo attempted. DQFE donors lack Iconik transcriptions.
tests: 620 passing, 10 skipped, 24 test files
git: 28 commits on main (f488c0f), clean working tree
skills_built: 13 (naming_generator, tess_connector, state_manager, parse-asset-id, sheets_updater, transcript_analyzer, root_angle_verifier, export_manager, assembly_editor, template_renderer, ai_editor, cli, pipeline_resume)
skills_pending: 3 (asset_fetcher, asset_uploader, metadata_manager — Iconik blocked)
integrations_live: [fal_ai, elevenlabs, google_sheets, iconik]
integrations_planned: [clickup, google_docs, varg_sdk]
blocker: DQFE winner videos need Iconik transcriptions triggered
```

**Compression: 89 lines -> 12 lines (7:1 ratio)**

All confirmed decisions, reference paths, API credentials details, and key references move to Tier 2 or to dedicated reference files.

---

## 4. Optimization Opportunities

### 4.1 MEMORY.md Management

**Current state**: 93 lines, 11 KB. Limit is 200 lines (truncation after line 200).

**Problem**: MEMORY.md grows with each session because agent status updates are appended. At the current format, each agent entry is 20-40 lines. Five agents x 30 lines = 150 lines of agent status alone, leaving only 50 lines for patterns, lessons, and cross-cutting concerns.

**Recommendation**:
1. **Compress agent entries to 5-8 lines each** — just path, session count, current status, and blocker. Move all historical detail to session logs.
2. **Remove information that duplicates session log headers** — specifically: API credential lists, test counts, git commit hashes, confirmed decision counts
3. **Add explicit "last updated" dates** to each entry so stale entries can be identified
4. **Target**: Keep MEMORY.md under 120 lines (60% of budget), leaving 80 lines for growth

**Example compressed Veda entry** (current: ~40 lines -> proposed: 8 lines):
```markdown
### Veda (Video Editing Agent)
- **Path**: `pg-creative-os/veda-video-editing-agent/`
- **Runtime**: Node.js + TypeScript | 620 tests | 28 commits
- **Status**: Phases 1-4 COMPLETE. 13/16 sub-agents built. Phase 5 demo blocked.
- **Blocker**: DQFE winner videos need Iconik transcriptions before hook selector works.
- **Next**: Trigger transcriptions -> retry Phase 5 demo.
- **Key rule**: `hs` = Hook Stack = PREPEND (not replace). Root angles from SSS Column C only.
- **Updated**: 2026-02-09
```

### 4.2 CLAUDE.md Bloat Risks

All CLAUDE.md files are currently well-managed (62-166 lines each, total 740 lines). However:

1. **Neco's CLAUDE.md** (166 lines) is the largest and growing. The 14 non-negotiables are verbose. Consider grouping related rules.
2. **"Common Mistakes to Avoid"** sections will grow organically per design. These need periodic pruning (monthly, as documented). Currently only Veda (4 rules) and Neco (1 rule) have entries. Monitor these.
3. **Root COS CLAUDE.md** (127 lines) includes a full agent routing table that duplicates MEMORY.md agent descriptions. Keep only one canonical source.

### 4.3 Session Log Sections That Could Be Pruned

| Content Type | Where Found | Recommendation |
|-------------|-------------|----------------|
| **Individual test case names** | Veda S010, S011, S012, S013 | Remove from Tier 1. Test files are the source of truth. |
| **Exported function lists** | Veda S010, S011 | Remove from Tier 1. Code is the source of truth. |
| **Handoff prompts** | Orion (all sessions), Veda (intermittent) | Eliminate entirely. "Next" section IS the handoff. |
| **CSV Upload Runbook** | Tess (lines 2374-2394) | Move to separate ops doc (e.g., `_ops/csv-runbook.md`) |
| **Duplicate "Priorities" sections** | Veda (`Session N -> N+1 Priorities` as separate headings) | Merge into "Next" section of the session entry. |
| **Historical confirmed decisions in Build State** | Neco (accumulates forever), Veda (89 lines) | Move to Tier 2 or dedicated reference file. |
| **Session State YAML historical annotations** | Tess (`session_110_completed:` block inline) | Only keep current state in Tier 1 YAML. Archive historical state blocks. |
| **Full "What Happened" narrative** | Orion (detailed numbered lists) | Compress to accomplishment bullets for Tier 1. |

### 4.4 Tess Already Proved Archiving Works

Tess archived Sessions 1-75 into `SESSION-LOG-ARCHIVE.md` at Session 079. The result:
- Archive: 196 lines, 8.5 KB (75 sessions in ~2.6 lines/session average)
- Active log: 2,422 lines for ~43 sessions (S076-S118)

This proves the pattern works but was applied too coarsely. The archive is essentially a changelog. The active log still contains too much operational detail. The two-tier proposal extends this pattern to ALL agents with a more granular split.

---

## 5. Context Savings Estimate

### 5.1 Per-Agent Savings with Two-Tier System

| Agent | Current Lines | Tier 1 Target | Reduction | Savings |
|-------|-------------:|-------------:|-----------:|--------:|
| Root COS | 146 | 100 | 32% | 46 lines |
| Orion | 1,005 | 300 | 70% | 705 lines |
| Tess | 2,422 | 400 | 83% | 2,022 lines |
| Veda | 4,416 | 500 | 89% | 3,916 lines |
| Neco | 1,262 | 300 | 76% | 962 lines |
| **TOTAL** | **9,251** | **1,600** | **83%** | **7,651 lines** |

### 5.2 Token Savings

| Category | Current Est. Tokens | After Optimization | Savings |
|----------|-------------------:|------------------:|--------:|
| Session Logs | ~140K | ~24K | ~116K (83%) |
| MEMORY.md | ~5.5K | ~3K | ~2.5K (45%) |
| CLAUDE.md files | ~9K | ~9K (no change) | 0 |
| **TOTAL** | **~154K** | **~36K** | **~118K (77%)** |

**Net effect**: ~118K tokens freed from the context budget. This is roughly equivalent to the entire context window of a 128K-token model. Even with selective loading (agents only read their own logs), the per-agent improvement is dramatic — Veda goes from ~71K tokens to ~8K tokens for its session log.

### 5.3 MEMORY.md Savings

| Content | Current Lines | Compressed Lines | Savings |
|---------|-------------:|-----------------:|--------:|
| Veda entry | ~40 | 8 | 32 |
| Orion entry | ~20 | 8 | 12 |
| Tess entry | ~10 | 7 | 3 |
| Neco entry | ~15 | 8 | 7 |
| Root COS entry | ~5 | 5 | 0 |
| Anti-Degradation | ~10 | 5 | 5 |
| Patterns & Lessons | ~3 | 3 | 0 |
| **TOTAL** | **~93** | **~44** | **~49 (53%)** |

This gives MEMORY.md ~156 lines of headroom (vs. current ~107), supporting ~20+ more sessions of growth before hitting the 200-line ceiling.

---

## 6. Implementation Plan

### Phase 1: Veda (Highest Impact, ~89% reduction)

Veda's log is the largest and most verbose. Implement first.

1. **Create `SESSION-LOG-FULL.md`** — copy current `SESSION-LOG.md` entirely
2. **Rewrite `SESSION-LOG.md`** as Tier 1:
   - Compact Build State YAML (~30 lines)
   - Last 5 sessions in Tier 1 format (~20 lines each = ~100 lines)
   - Full changelog (all 36 sessions, 1-2 lines each = ~40 lines)
   - File pointer to Tier 2
   - Target: ~200 lines total
3. **Update `CLAUDE.md`** — add context budget rule: "Read SESSION-LOG.md for current state. Only read SESSION-LOG-FULL.md when investigating specific past session details."

### Phase 2: Tess (Second highest impact, ~83% reduction)

1. **Merge existing archive** — combine `SESSION-LOG-ARCHIVE.md` + current detail into `SESSION-LOG-FULL.md`
2. **Rewrite `SESSION-LOG.md`** as Tier 1:
   - Compact Session State YAML (remove historical annotations, ~40 lines)
   - Last 5 sessions in Tier 1 format (~100 lines)
   - Changelog covering all 118 sessions (~60 lines)
   - Move CSV Upload Runbook to `_ops/csv-runbook.md`
   - Target: ~250 lines total
3. **Update `CLAUDE.md`** context budget rules

### Phase 3: Orion & Neco (Moderate impact)

1. **Create Tier 2 files** for each
2. **Compress Tier 1** — last 5 sessions + changelog
3. **Eliminate handoff prompts** from both (use "Next" as the handoff)
4. **Move confirmed decisions** from Neco Build State to Tier 2 or reference doc

### Phase 4: MEMORY.md Compression

1. **Compress all agent entries** to 5-8 lines per the format in Section 4.1
2. **Remove duplicated information** (API creds, test counts, git hashes)
3. **Add "Updated" timestamps** to each entry
4. **Target**: ~50 lines total, leaving 150 lines for future growth

### Phase 5: Governance

1. **Add "Two-Tier Session Log Protocol"** to `CREATIVE-OS-ANTI-DEGRADATION.md`:
   - At session end: write Tier 1 entry to `SESSION-LOG.md`, write full detail to `SESSION-LOG-FULL.md`
   - At session start: read only `SESSION-LOG.md` (Tier 1)
   - Tier 2 access: only when investigating specific past session operational detail
2. **Add archival trigger**: When Tier 1 exceeds 500 lines, archive oldest sessions to changelog-only format
3. **Add MEMORY.md pruning schedule**: Monthly review, remove stale entries, compress verbose ones

---

## 7. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|:----------:|:------:|------------|
| Information loss during compression | Low | Medium | Tier 2 preserves all detail. Compression is additive, not destructive. |
| Agent can't find detail it needs | Low | Low | Tier 2 pointer in every Tier 1 file. Agents know to check Tier 2 for operational detail. |
| New session entries revert to verbose format | Medium | Medium | Anti-degradation protocol update + CLAUDE.md context budget rules enforce Tier 1 format. |
| MEMORY.md hits 200-line limit before Phase 4 | Low | Medium | Current headroom is ~107 lines. Phase 4 can be prioritized if growth accelerates. |

---

## 8. Summary

The Creative OS context footprint is **~616 KB / ~154K tokens** across session logs, CLAUDE.md files, and memory files. Session logs account for **91%** of this budget.

The two-tier system would reduce the actively-loaded context to **~36K tokens** — a **77% reduction** — while preserving all historical detail in Tier 2 archives. The largest gains come from Veda (89% reduction) and Tess (83% reduction).

Implementation is non-destructive: Tier 2 files are created by copying existing content, then Tier 1 files are rewritten as compressed summaries. No information is deleted.

**Priority order**: Veda (highest impact) -> Tess -> Orion/Neco -> MEMORY.md -> Governance update.

---

## Appendix: CopywritingEngine Cross-Reference

After reviewing Tony's CopywritingEngine `AGENT-TEAMS-UPGRADE-ANALYSIS.md`, four additional context optimization insights emerged that reframe some of this audit's recommendations in light of the Agent Teams architecture.

### 1. Agent Teams Eliminates Context Pressure by Design

Tony's analysis identifies context pressure as a root cause of degradation (Constraint 3: "Context Pressure Causes the Degradation We Built Defenses Against"). His conclusion: "We've been treating symptoms, not the cause."

Agent Teams solves this structurally -- each teammate gets its own 200K context window. When Neco runs 7 creative lenses as separate agents, none of them experience context pressure from the others. When Veda's pipeline orchestrator delegates to sub-agents, each sub-agent operates in clean context.

This is a more fundamental fix than two-tier session logs. Two-tier logs reduce what gets loaded into a single context. Agent Teams eliminates the single-context constraint entirely. The implication for Creative OS: context optimization (this audit's focus) remains valuable for single-agent sessions, but the long-term architecture should assume Agent Teams as the primary context management strategy.

### 2. Two-Tier Logs + Agent Teams Synergy

The two-tier system proposed in this audit becomes even more valuable with Agent Teams. Each agent teammate loads only its own Tier 1 session log into its context -- it never sees other agents' logs. Compressed logs mean more headroom for actual work materials (specimens, frameworks, upstream packages, reference files).

The combination of two-tier logs + Agent Teams could reduce effective context load from ~154K tokens (current, single-agent, all logs) to under 10K per agent:

| Scenario | Estimated Context per Agent |
|----------|---------------------------|
| Current (single-agent, full logs) | ~71K (Veda) / ~30K (Tess) |
| Two-tier logs only | ~8K (Veda) / ~6K (Tess) |
| Agent Teams only (full logs, own context) | ~71K (Veda solo) but isolated |
| **Two-tier + Agent Teams** | **~8K per agent, fully isolated** |

The two-tier system is not redundant with Agent Teams -- it is complementary. Agent Teams provides isolation; two-tier provides compression. Together, they maximize available context for actual work.

### 3. Token Cost Acknowledgment

Agent Teams uses significantly more tokens than single-agent mode. Each teammate is a separate Claude instance. Tony's analysis of a 3-round arena with 7 personas + Critic + Judge explicitly acknowledges "9x the inference is the correct tradeoff" for quality.

For Creative OS, the math works: Performance Golf spends millions on ad campaigns annually. If Agent Teams produces 10% better hooks (Neco), 10% more effective video variations (Veda), or 10% sharper data insights (Tess), that improvement is worth the token cost many times over. The ROI of better creative output dwarfs the incremental cost of parallel Claude instances.

This framing should be included in any cost discussion when presenting the Agent Teams upgrade to stakeholders. The question is not "can we afford more tokens?" but "can we afford NOT to maximize creative quality?"

### 4. 1M Context Window as Fallback

Opus 4.6 supports 1M tokens (5x the previous 200K limit). Tony recommends Agent Teams as the primary strategy and 1M context as fallback for situations where Agent Teams adds overhead without quality benefit.

For Creative OS, this means:

| Use Case | Recommended Approach | Rationale |
|----------|---------------------|-----------|
| Neco creative generation (7 lenses) | Agent Teams | True creative independence between lenses -- the core quality win |
| Veda pipeline execution | Agent Teams | Sub-agents operate in clean context, parallel execution |
| Tess deep data analysis (single long session) | 1M context | Single-agent analysis benefits from holding all data in one context |
| Veda debugging (tracing a pipeline failure) | 1M context | Need full execution trace in one window to identify root cause |
| Orion strategic synthesis | 1M context | Advisory agent benefits from seeing everything at once |

The two strategies are not mutually exclusive. Agent Teams is the default for creative and production work. 1M context is the fallback for deep single-agent analysis where splitting context would lose the holistic view.
