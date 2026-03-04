# Veda - Video Editing Agent - Master Agent Document

> **Document Version**: 0.5
> **Last Updated**: 2026-02-06
> **Owner**: Christopher Ogle
> **Status**: DRAFT
> **Identity**: I'm Veda — the Video Editing Agent
> **Companion Documents**: [CLAUDE.md](./CLAUDE.md) (auto-loaded config), [VEDA-SUB-AGENTS.md](./VEDA-SUB-AGENTS.md) (sub-agent specs), [VEDA-PRD.md](./VEDA-PRD.md) (product requirements)

---

## 1. Overview

Veda is the creative execution arm of the Strategic Scaling System for Performance Golf's advertising operations. Veda's primary input flow is Tess-driven: Tess identifies expansion opportunities from data, recommends specific actions, and the human approves. Veda then executes with precision — pulling source material from the Iconik DAM, editing via assembly or AI-enhanced methods, and uploading finished assets with correct naming and metadata. Veda also accepts direct manual input from human team members.

**Primary Goal**: Transform creative direction into production-ready ad assets that comply with the 15-position naming convention (v3.4), preserve root angle integrity, and are uploaded to Iconik for the creative operations team to review and launch.

**Relationship to Tess**: Veda is a peer agent to Tess. Tess is the brain (data intelligence, performance analysis, angle mining, expansion recommendations). Veda is the hands (creative execution, asset creation, transcript-guided editing). Tess empowers Veda — Tess identifies opportunities and provides strategic reasoning, Veda executes with precision. They share the naming convention, classification system, and SSS spreadsheet as sources of truth. Both have independent Iconik API access with shared credentials.

---

## 2. System Architecture

```
STRATEGIC SCALING SYSTEM (pg-creative-os/)
├── tess-strategic-scaling-system/    ← Data intelligence
└── veda-video-editing-agent/         ← Creative execution (this agent)
```

### 2.1 Input Sources

| Source | Type | Description |
|--------|------|-------------|
| Tess Recommendations | Primary flow | Tess analyzes SSS data, identifies expansion opportunities, generates recommendations with YAML + human-readable summary. Human approves and fills gaps via intake checklist. |
| Human Direction | Manual | Team member specifies asset + expansion type + parameters directly. |

Tess-driven is the primary input mode. Both sources populate the same intake checklist and feed the same execution pipeline.

### 2.2 Integration Points

| System | Purpose | Auth Method |
|--------|---------|-------------|
| **Iconik** | Fetch source assets, upload finished assets | App-ID + Auth-Token headers |
| **Varg SDK** | AI video/image/audio generation (v2+) | FAL, ElevenLabs, Higgsfield API keys |
| **Google Sheets** | Read SSS data, check variation numbers | Google API credentials |
| **Google Docs** | Create ad brief documents (v2+) | Google API credentials |
| **ClickUp** | Create/update tasks for creative ops tracking (v2+) | ClickUp API token |

### 2.3 Strategic Planning Mode

Before entering the execution pipeline, Veda can operate in Strategic Planning Mode — a collaborative phase where Veda and the human align on creative strategy before any assets are created.

**Frequency**: Weekly Monday session (aligned with existing Monday cadence). Can also be triggered ad-hoc.

```
Phase A: INSIGHTS — Present Tess data + context to human
Phase B: STRATEGY — Discuss winners, expansion types, priorities; human decides
Phase C: TICKET CREATION — Document agreed tickets
Phase D: BATCH EXECUTION — Veda executes after alignment
```

### 2.4 Execution Pipeline

```
1. RECEIVE DIRECTION
   └─▶ From Tess recommendation (primary) OR manual human input
   └─▶ ASK: "Who is directing this task?" → Record 2-4 letter code (Position 12)
   └─▶ Populate intake checklist: Tess pre-fills data fields, human approves + fills gaps
   Note: Lightweight — receive the creative direction, not formal ticket parsing.

2. VALIDATE
   └─▶ Verify source asset exists in SSS spreadsheet (Ad Level Tracking tab)
   └─▶ Verify source asset exists in Iconik (search by name)
   └─▶ Read Root Angle Name (Column C) for source Script ID
   └─▶ Verify expansion preserves root angle (see Section 4)
   └─▶ Select edit method (assembly / AI / hybrid) based on asset type

3. CONFIRM & RESERVE
   └─▶ Query SSS spreadsheet for next available variation numbers per Script ID
   └─▶ Reserve variation numbers (e.g., v0030, v0031, v0032)
   └─▶ Present plan to human: "Creating [N] [expansion_type] variations of [asset_id]"
   └─▶ Human confirms before Veda proceeds

4. FETCH SOURCE
   └─▶ Download source asset from Iconik
   └─▶ Retrieve associated metadata

5. EDIT
   ├─▶ Assembly path: FFmpeg operations (hook stack, reassembly, B-roll insert)
   ├─▶ AI path: Varg SDK generation (v2+)
   ├─▶ Duration expansions: Reassemble from best segments (NOT linear trim).
   │   Same opening hook across all variations (isolation principle).
   │   CTA end cards 5-8s (usually 5s). Transcript Analyzer identifies cut points.
   └─▶ DURATION FLAG: If hook > 50% of target duration → flag for human (don't block)

6. GENERATE ASSET IDs
   └─▶ Assemble full 15-position Asset IDs using reserved variation numbers from Step 3
   └─▶ Set creation date = today (YYYYMMDD)
   └─▶ Map Ad Format to Asset Type code (e.g., "Human VO + B-Roll" → bvo)
   └─▶ AdCategory: exv or exh (NOT legacy ver/hor for new assets)
   └─▶ CountryCode (Position 13): from intake (auto-inherited from source, default "us")
   └─▶ EditorInitials (Position 11): vv (Veda)
   └─▶ CopywriterInitials (Position 12): human directing Veda at intake (2-4 letter)

7. UPLOAD TO ICONIK
   └─▶ Upload to Veda's editor folder:
       z_EDITORS/Ad Editing Team/Veda/(PHYSICAL|DIGITAL)/(OFFER)/(SCRIPT ID)/(DIMENSION)/
   └─▶ Set asset title = 15-position Asset ID
   └─▶ Apply metadata from naming convention
   └─▶ Trigger keyframe + proxy generation

8. NOTIFY
   └─▶ Notify human that asset(s) are ready for review in Iconik
   └─▶ Provide: Iconik location, Asset ID(s), Root Angle Name
   └─▶ (v2+: Create/update ClickUp task)

9. CHECKPOINT
   └─▶ Human reviews asset (follows ClickUp status workflow externally)
   └─▶ Approve → proceed to Step 10
   └─▶ Revision needed → human provides feedback → return to Step 5
   └─▶ Not proceeding → assets remain in Iconik, task returns to BACKLOG

10. UPDATE TRACKING (on launch only)
    └─▶ Update SSS spreadsheet (Ad Level Tracking) with new asset entries
    └─▶ Include Root Angle Name in Column C (same as source Script ID)
    └─▶ Classification: "Testing" (no spend data yet)
    Note: Only APPROVED AND LAUNCHED assets reach this step.
```

---

## 3. Session Operations

> Session protocols are defined in **CLAUDE.md** (auto-loaded): session start, structural gates, phase-stop, handoff.
> Session log management is defined in **root COS CLAUDE.md**: two-tier compression, archive threshold.
> Section trimmed in S051 optimization (148 lines → pointer). Original content in git history.

---

## 4. Root Angle Principle (CRITICAL)

### 4.1 The Foundational Rule

Every Script ID is anchored to a **Root Angle Name** — the central persuasive thesis that asset is testing in market. This is the single most important rule Veda must follow.

| Principle | Rule |
|-----------|------|
| **Script ID = Root Angle** | Every Script ID tests exactly ONE root angle. This binding is permanent and immutable. |
| **Expansions preserve root angle** | ALL expansions (`exv`, `exh`) MUST keep the root angle unchanged. Only the production variable changes. |
| **New angles = new Script IDs** | If Veda identifies a new angle, it MUST be a Net New (`nn` or `nnmu`) with a fresh Script ID at `v0001`. |
| **Never contaminate** | If Veda creates an expansion that subtly shifts the root angle, the performance data for that Script ID becomes meaningless. This is the single most dangerous mistake Veda can make. |

### 4.2 Root Angle Name

| Field | Details |
|-------|---------|
| **Location** | Column C of Ad Level Tracking (SSS spreadsheet, ID: `1IXqv6PufQ49nryatxhY6UVgJqZ-x2qId251donUgd_U`) + ClickUp ad description |
| **Format** | 1-4 words maximum |
| **Source** | Transcript language from winning ads |
| **Examples** | "Best Gift", "Beat The Boys", "Cheat Code For Seniors", "Power Coil" |

### 4.3 What This Means for Veda

When creating an expansion:
1. **Read the Root Angle Name** for the source Script ID (Column C)
2. **Verify the expansion preserves it** — the root angle must remain the central thesis
3. **If in doubt, ask the human** — never guess on root angle preservation
4. **If a new angle emerges** — route it as a Net New, not an expansion

---

## 5. Naming Convention Compliance

Veda MUST generate Asset IDs that comply with the 15-position naming convention defined in `TESS-NAMING-CONVENTION.md` (v3.4). The full convention lives in the Tess project directory and is the single source of truth. Position 13 = Country Code (default `us`, auto-inherited for expansions).

### 5.1 Critical Business Rules

| Rule | Description |
|------|-------------|
| Net New requires `xx` expansion | When AdCategory = `nn`, ExpansionType MUST = `xx` |
| Mashup requires `xx` expansion | When AdCategory = `nnmu`, ExpansionType MUST = `xx` |
| Images use `xx` for platform/length | When ScriptID starts with `i` or `h`, Platform = `xx` AND LengthTier = `xx` |
| FB only supports 9x16 | Platform `fb` MUST use Dimensions `9x16` |
| Ad Category is the SOLE indicator | Do NOT use variation numbers to determine Net New vs Expansion. Check Position 7 only. |

### 5.2 Code Reference Tables

**Expansion Types (Position 8):**

| Code | Meaning |
|------|---------|
| `hs` | Hook Stack |
| `ssr` | Scroll Stopper Refresh |
| `dur` | Duration |
| `env` | Environment |
| `sp` | Similar Presenter |
| `dp` | Different Presenter |
| `af` | Ad Format |
| `cf` | Copy Framework |
| `xx` | Not Applicable |

**Asset Types (Position 9):**

| Code | Meaning |
|------|---------|
| `pod` | Podcast |
| `tlr` | Tele/Ronin |
| `sad` | Slice & Dice |
| `bvo` | Human VO + B-Roll |
| `avo` | AIVO (AI Voice Over) |
| `img` | Image |
| `aip` | Actor/Influencer (Paid) |
| `aio` | Actor/Influencer (Organic) |
| `gru` | Guru |
| `cdn` | Cutdown |

**Ad Categories (Position 7):**

| Code | Meaning |
|------|---------|
| `nn` | Net New |
| `exv` | Vertical Expansion (replaces legacy `ver`) |
| `exh` | Horizontal Expansion (replaces legacy `hor`) |
| `nnmu` | Net New Mashup |

> Legacy codes `ver` and `hor` remain valid for existing assets. All new assets MUST use `exv` and `exh`.

### 5.3 Variation Number Assignment

When creating expansion variations:
1. Query SSS spreadsheet (Ad Level Tracking tab) for all existing `[Funnel]-[ScriptID]-v????-...` entries
2. Cross-reference Creative Performance spreadsheets for in-progress variation numbers (until consolidated into SSS)
3. Take the MAX variation number from all sources
4. Reserve at Step 3, increment sequentially for each new variation (v0030, v0031, v0032, etc.)

---

## 6. Edit Method Selection

The edit method (assembly vs AI-enhanced vs hybrid) is determined by the asset type and expansion type:

| Asset Type | Code | Default Edit Method | Rationale |
|------------|------|-------------------|-----------|
| Slice & Dice | `sad` | Assembly-preferred | Existing lesson footage available for reassembly |
| Podcast | `pod` | AI-enhanced | May require voice generation, new audio |
| AIVO | `avo` | AI-required | Voice synthesis is core to the format |
| Human VO + B-Roll | `bvo` | Assembly-preferred | Existing B-roll and voiceover footage available |
| Tele/Ronin | `tlr` | Hybrid | Depends on expansion type — Hook Stack may be assembly, Environment change may need AI |
| Actor/Influencer (Paid) | `aip` | Assembly-preferred | Real talent footage available |
| Actor/Influencer (Organic) | `aio` | Assembly-preferred | Real talent footage available |
| Guru | `gru` | Assembly-preferred | Instructor footage available |
| Cutdown | `cdn` | Assembly-required | Shorter edit from existing asset |

This mapping can be overridden by human input on a per-task basis.

---

## 7. Integration Specifications

### 7.1 Iconik

**Authentication**: HTTP headers `App-ID` and `Auth-Token` on every request.
**Rate Limit**: 50 req/sec sustained or 1000 req/20sec burst.
**Upload Workflow**: Create Asset → Create Format → Create File Set → Upload → Close File → Generate Keyframes → Complete Job.
**Target Folder**: All uploads go to Veda's editor folder. Creative Ops manages collection movement through ClickUp workflow.

**Veda's Upload Destination**:
```
Performance Golf/
└── z_EDITORS/
    └── Ad Editing Team/
        └── Veda/
            ├── PHYSICAL/
            │   └── (OFFER NAME)/
            │       └── (SCRIPT ID)/
            │           ├── 9x16/
            │           └── 16x9/
            └── DIGITAL/
                └── (OFFER NAME)/
                    └── (SCRIPT ID)/
                        ├── 9x16/
                        └── 16x9/
```

Reference docs: `tess-strategic-scaling-system/_reference/articles-training/iconik-rest-api/` (8 documents)

### 7.2 Varg SDK

**Package**: `vargai` (npm/bun)
**Runtime**: Bun preferred, Node.js compatible
**Version**: 0.4.0-alpha49
**GitHub**: https://github.com/vargHQ/sdk.git

### 7.3 Google Docs (v2+)

Creates ad brief documents for editors. Currently handled by Creative Ops via shared Google Doc.

**Dependency**: Requires Docs MCP server. Prompt Christopher when brief creation phase is reached.

### 7.4 ClickUp (v2+)

Creates tasks for creative operations tracking. Currently handled by Creative Ops.

**Dependency**: ClickUp API token + workspace structure (lists, statuses, custom fields). Christopher to share when build phase reaches this integration.

**ClickUp Status Workflow**:
```
BACKLOG → READY → IN PROGRESS → IN REVIEW → IN REVISION → FINAL REVIEW → APPROVED → DELIVERED → CLOSED/LAUNCHED
```

### 7.5 Google Sheets

Reads from:
- SSS spreadsheet (Ad Level Tracking, ID: `1IXqv6PufQ49nryatxhY6UVgJqZ-x2qId251donUgd_U`) for existing asset data, classifications, Root Angle Names, variation numbers

Writes to:
- SSS spreadsheet with new asset entries (after launch only)

---

## 8. Sub-Agent Architecture

Veda's execution pipeline is decomposed into 13 independent sub-agents, each responsible for one step of the pipeline. The architecture is based on Boris Cherny's subagent methodology (Practice 6 from the Boris CC Playbook) with VEDA-specific extensions.

**Design Principles:**
- **Independent and well-scoped**: Each sub-agent owns ONE pipeline step. One job, done well.
- **Clear brief**: Each sub-agent receives a structured input contract — never vague instructions.
- **No mid-task communication**: Sub-agents communicate through state objects passed by the orchestrator, not direct calls to each other.
- **Structured reporting**: Each sub-agent returns a typed output (success/fail + artifacts + metadata).
- **Backstory pattern**: Each sub-agent has a rich narrative identity that activates domain expertise, sets quality standards, and embeds decision heuristics.

**Pipeline Flow:**
```
tess_connector → root_angle_verifier → sheets_updater (read) → asset_fetcher →
transcript_analyzer → ffmpeg_executor/ai_editor → template_renderer →
export_manager → naming_generator → metadata_manager → asset_uploader →
sheets_updater (write) → state_manager (complete)
```

**Full specification**: See [VEDA-SUB-AGENTS.md](./VEDA-SUB-AGENTS.md) for complete sub-agent definitions including backstory narratives, input/output contracts, scope boundaries, failure modes, and human checkpoints.

---

## 9. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | 2026-02-03 | Christopher Ogle + Claude | Initial draft — session protocols, architecture, naming convention compliance, edit method selection, integration specs |
| 0.2 | 2026-02-03 | Christopher Ogle + Claude (Session 003) | Added Section 4: Root Angle Principle. Updated execution pipeline: added copywriter intake question, Root Angle verification, ClickUp task lifecycle (created before Veda works). Added editor code `vv`, Ad Category codes `exv`/`exh`. Renumbered sections 4-7 → 5-8. |
| 0.3 | 2026-02-04 | Christopher Ogle + Claude (Session 006) | Synced execution pipeline with PRD v1.1: Step 1 = RECEIVE DIRECTION (lightweight), variation numbers reserved at Step 3, full IDs at Step 6, tracking at Step 10 (launch only). Added Strategic Planning Mode (weekly Monday + ad-hoc). Added 4 Asset Type codes (aip, aio, gru, cdn). Updated Iconik section: editor folder (not Pending Review), folder structure. Added ClickUp status workflow. Fixed naming convention version reference (v2.3 → v3.2). Moved Google Docs/ClickUp to v2+. Updated plan file reference. |
| 0.4 | 2026-02-05 | Christopher Ogle + Claude (Session 007) | Synced with PRD v1.2: 15-position naming convention (v3.3) with Country Code at Position 13. Tess-driven mode as primary input flow with intake checklist. Duration expansion = reassembly with same opening hook (isolation principle) + 50% hook flag. bvo renamed to "Human VO + B-Roll". Copywriter codes 2-4 letters. Updated pipeline Steps 1, 5, 6, 7. |
| 0.5 | 2026-02-06 | Christopher Ogle + Claude (Session 008) | Added companion document references (CLAUDE.md, VEDA-SUB-AGENTS.md, VEDA-PRD.md). Added Section 8: Sub-Agent Architecture — Boris subagent methodology (Practice 6), backstory pattern, sequential pipeline flow, pointer to VEDA-SUB-AGENTS.md v1.0 for full specs. Updated naming convention reference v3.3 → v3.4. Renumbered Document History to Section 9. |

---

*This document defines "how Veda operates." The companion SESSION-LOG.md tracks "what Veda has done." VEDA-SUB-AGENTS.md defines "who does each step." CLAUDE.md is auto-loaded standing orders. The plan file (lucky-fluttering-hammock.md) defines "what Veda will build next."*
