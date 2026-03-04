# Veda - Video Editing Agent - Product Requirements Document

> **Document Version**: 1.2
> **Last Updated**: 2026-02-05
> **Owner**: Christopher Ogle
> **Status**: DRAFT
> **Companion Documents**: [VEDA-MASTER-AGENT.md](./VEDA-MASTER-AGENT.md), [VEDA-SUB-AGENTS.md](./VEDA-SUB-AGENTS.md)
> **Identity**: I'm Veda — the Video Editing Agent

---

## 1. Executive Summary

Veda is the creative execution arm of the Strategic Scaling System for Performance Golf's advertising operations. Veda's primary input flow is Tess-driven: Tess identifies expansion opportunities from data, recommends specific actions, and the human approves. Veda then executes with precision — pulling source material from the Iconik DAM, editing via assembly or AI-enhanced methods, and uploading finished assets with correct naming and metadata. Veda also accepts direct manual input from human team members.

**Primary Goal**: Transform creative direction into production-ready ad assets that comply with the 15-position naming convention (v3.3), preserve root angle integrity, and are uploaded to Iconik with correct metadata for the creative operations team to review and launch.

**Current Scope (v1)**: Veda is an automated editor. It receives direction (from Tess recommendations approved by human, or direct manual input), edits assets via assembly (FFmpeg) or AI-enhanced methods, generates 15-position Asset IDs programmatically, uploads finished assets to Iconik, and updates the SSS spreadsheet after launch. Creative Ops handles ClickUp task management and Google Doc tickets.

**Future Scope (v2+)**: AI-enhanced editing via Varg SDK, full Tess-driven pipeline (Tess recommends → human approves → Veda auto-executes batch), ClickUp task creation, Google Doc brief generation, interactive Strategic Planning Dashboard for leadership visibility.

**Relationship to Tess**: Veda is a peer agent to Tess. Tess is the brain (data intelligence, performance analysis, angle mining, expansion recommendations). Veda is the hands (creative execution, asset creation, transcript-guided editing). Tess empowers Veda — Tess identifies opportunities and provides strategic reasoning, Veda executes with precision. They share the naming convention, classification system, and SSS spreadsheet as sources of truth. Both have independent Iconik API access with shared credentials.

> **Note (Session 004)**: Scope clarified to match actual Creative Ops workflow. v1 focuses on being the editor — editing assets and generating compliant Asset IDs. ClickUp and Google Doc automation moved to v2+.
> **Note (Session 007)**: Tess-driven flow established as primary input mode. 14-position → 15-position naming convention (v3.3, Country Code added). Expansion type operational definitions refined.

---

## 2. Success Criteria

### 2.1 Primary KPIs

| Metric | Definition | Target |
|--------|------------|--------|
| **Naming Compliance** | Assets generated with valid 15-position Asset IDs | 100% |
| **Root Angle Preservation** | Expansions that maintain the source Script ID's root angle | 100% |
| **Pipeline Completion** | Assets uploaded to Iconik with correct naming and metadata. SSS spreadsheet (Ad Level Tracking) updated after launch. | 100% |
| **Human Approval Rate** | Assets approved on first review via ClickUp workflow | Track (no target in v1) |

### 2.2 Asset Quality Gates

| Gate | Requirement | Enforcement |
|------|-------------|-------------|
| **Naming Convention** | Every generated asset has a valid 15-position Asset ID | Automated validation before upload |
| **Root Angle Integrity** | Expansion preserves root angle of source Script ID | Human confirmation at intake + automated check against Column C |
| **Variation Number Uniqueness** | No duplicate variation numbers within a Script ID | Automated check against SSS spreadsheet (Ad Level Tracking tab, ID: `1IXqv6PufQ49nryatxhY6UVgJqZ-x2qId251donUgd_U`) |
| **Iconik Upload** | Asset uploaded to Veda's editor folder with correct metadata | Automated verification after upload |
| **Output Validation** | Asset meets format, resolution, and duration requirements | Automated check before upload |

### 2.3 Operational Constraints

| Constraint | Value | Rationale |
|------------|-------|-----------|
| **Budget Gate** | None (v1) | Test first, establish cost baselines before adding gates |
| **Human Approval Required** | Yes — all assets reviewed through ClickUp status workflow (IN REVIEW → FINAL REVIEW → APPROVED) | Creative Ops manages review via ClickUp |
| **Root Angle Override** | Never | Veda cannot override or modify a root angle — only humans can |
| **Net New Creation** | Human-confirmed only | Veda never autonomously creates Net New assets; always human-directed |

---

## 3. Root Angle Principle (CRITICAL)

### 3.1 Core Requirement

The Root Angle Principle is the foundational strategic concept of the entire scaling system. Violating it is the single most dangerous mistake Veda can make.

| Requirement | Description |
|-------------|-------------|
| **Script ID = Root Angle binding** | Every Script ID tests exactly one root angle. This binding is permanent and immutable. |
| **Expansions preserve root angle** | All expansions (`exv`, `exh`) MUST keep the root angle unchanged. Only production variables change (hook, duration, environment, presenter, format, copy framework). |
| **New angles = new Script IDs** | If a new angle is discovered, it MUST become a Net New (`nn` or `nnmu`) with a fresh Script ID at `v0001`. |
| **Root Angle Name** | 1-4 words, stored in Column C of Ad Level Tracking. Must come from transcript language of the original winning asset. |

### 3.2 Why This Matters

If an expansion subtly shifts the root angle, the performance data for that Script ID becomes meaningless. The scaling system's ability to answer "which expansion type works best for this angle?" depends entirely on root angle purity within a Script ID. Corrupted data = corrupted decisions = wasted ad spend.

### 3.3 Veda's Compliance Protocol

When creating any expansion:

1. **Read Root Angle Name** from Column C for the source Script ID
2. **Verify the expansion preserves it** — the root angle must remain the central persuasive thesis
3. **If Root Angle Name is missing** (legacy asset) — Veda retrieves the asset's transcript from Iconik, analyzes it for distinct persuasive theses, and presents **3 Root Angle Name suggestions** (1-4 words each, ranked by recommendation strength, grounded in transcript language). Human approves one or provides their own. Veda does NOT proceed until a Root Angle Name is assigned.
4. **If in doubt** — ask the human; never guess on root angle preservation
5. **If a new angle emerges** — route it as a Net New, not an expansion. New Script ID at `v0001`.

---

## 4. Scope Boundaries

### 4.1 Veda v1 DOES

- Operate in Strategic Planning Mode — collaborate with human on creative strategy before execution
- Receive task direction from humans (or Tess in v2)
- Validate inputs, Root Angle compliance, and variation number availability
- Reserve variation numbers and present plan for human confirmation
- Fetch source assets from Iconik
- Perform assembly edits (FFmpeg) and AI-enhanced edits (Varg SDK, v2+)
- Generate 15-position Asset IDs programmatically (eliminates human error in ID creation)
- Map human-readable Ad Format names to Asset Type codes automatically
- Upload finished assets to Iconik with correct naming and metadata
- Update SSS spreadsheet (Ad Level Tracking) with new asset entries after launch
- Notify humans when assets are ready for review

### 4.2 Veda v1 SHALL NOT

- Override or modify a root angle — only humans can
- Autonomously create Net New assets — always human-directed
- Create or update ClickUp tasks — Creative Ops responsibility
- Create Google Doc briefs — pre-existing shared document used today
- Modify or delete existing assets in Iconik — only creates new ones
- Autonomously decide which assets to expand — always directed
- Skip human confirmation before editing
- Assign Root Angle Names — only humans can (Tess can suggest in v2)
- Delete assets from Iconik — manual human action only

*All "SHALL NOT" items are candidates for v2+ automation after v1 is proven.*

> **Note (Session 004)**: Scope boundaries added to clearly delineate v1 capabilities from v2+ automation targets.

---

## 5. Input Specification

### 5.1 Tess-Driven Mode (Primary Flow)

Tess is the primary recommender. Tess analyzes SSS data (performance metrics, classification, portfolio gaps, transcript analysis) and generates expansion recommendations. In Strategic Planning Mode, Tess presents these recommendations to the human, who reviews and approves them. Upon approval, the recommendation pre-populates Veda's intake checklist (see Step 1 in Section 8.1).

Tess can identify opportunities even in v1 — she reads the SSS spreadsheet and knows every asset's classification, length tier, and what expansion types have/haven't been tested. For example: "357-0003 is a 360s+ Winner with no 30s, 60s, or 180s versions — recommend duration expansion."

**Expected Input Structure** (internal data format):
```yaml
recommendation:
  source_asset_id: "357-0003-v0029-fb-9x16-180s-nn-xx-sad-gamc-ca-co-us-20251201"
  expansion_type: "dur"             # Valid expansion type code
  reason: "No shorter versions exist. 60s Slice & Dice has 42% winner rate."
  current_roas: 1.20
  current_classification: "winner"
  target_variations: 3              # How many variations to create
  target_length_tiers: ["30s", "60s", "180s"]  # For duration expansions
  edit_method: "assembly"           # assembly | ai_enhanced | hybrid
  asset_type: "sad"                 # From source asset
  root_angle_name: "Power Coil"    # From Column C
  country_code: "us"               # From source asset
  priority: "high"
```

**Human-Readable Summary** (what the human sees during approval):
```
TESS RECOMMENDATION:
  Asset: 357-0003 ("Power Coil") — Winner, ROAS 1.20
  Recommendation: Duration expansion → create 30s, 60s, 180s versions
  Reasoning: No shorter versions exist. 60s Slice & Dice has 42% winner rate.

  Checklist (pre-filled by Tess):
  ✅ Source: 357-0003-v0029
  ✅ Expansion: dur (Duration)
  ✅ Variations: 3 (one per target tier)
  ✅ Platform: fb | Dimensions: 9x16 | Country: us
  ✅ Talent: gamc | Ad Format: sad
  ⬜ Directing Person: [human fills]
  ⬜ Special Instructions: [human fills]

  APPROVE / MODIFY / REJECT?
```

> **Note (Session 007)**: Tess-driven mode is the PRIMARY input flow, not a separate path. Tess recommends, human approves, Veda executes. The intake checklist is the unifying structure — Tess pre-fills what she can determine from data, human fills gaps and approves.

### 5.2 Manual Mode — Conversational Intake

Human specifies the task directly. Veda must gather all required information through intake questions.

**Required Information (gathered via intake)**:
| Field | Question | Example |
|-------|----------|---------|
| Source Asset ID | "What asset are we expanding?" | `357-0003-v0029-...` |
| Expansion Type | "What type of expansion?" | Hook Stack (`hs`) |
| Number of Variations | "How many variations?" | 3 |
| Edit Method | "Assembly, AI-enhanced, or hybrid?" | Assembly |
| Directing Person | "Who is directing this task?" (for Position 12) | `co` (Christopher Ogle) |
| Special Instructions | "Any specific creative direction?" | "Use the B-roll from the putting segment" |

### 5.3 Manual Mode — Ticket/Brief Format

Veda can also receive direction via the established ad ticket format from the shared Google Doc (currently Q1 Ad Requests, ID: `1yEzyga9KDyzUBSoQTNCTMg9GSjWCQJF2vXlKxUMgLHw`). Creative Ops converts these tickets into ClickUp tasks.

**Ticket Format**:
```
(STATUS SYMBOL) (FUNNEL CODE) (SCRIPT ID) (VARIATION RANGE)
Ad Title / Description (Angle): [Root Angle Name]
Copywriter: [Name]
Aspect Ratio: [e.g., 9x16 (FB)]
Ad Format: [e.g., Human VO + B-Roll, Slice & Dice, AIVO, Podcast, etc.]
Talent/Guru/Actor Name: [Name]
Other general notes/instructions: [Free text]
```

> **Note (Session 005)**: Ticket metadata is captured AFTER the creative work is done. Veda receives direction first, creates the asset, then formalizes the ticket metadata during Asset ID generation (Step 6). Veda automatically maps human-readable Ad Format names to Asset Type codes.

**Ad Format → Asset Type Code Mapping**:

| Ad Format (ticket) | Asset Type Code |
|---------------------|----------------|
| Podcast | `pod` |
| Tele/Ronin | `tlr` |
| Slice & Dice | `sad` |
| Human VO + B-Roll | `bvo` |
| AIVO | `avo` |
| Image | `img` |
| Actor/Influencer (Paid) | `aip` |
| Actor/Influencer (Organic) | `aio` |
| Guru | `gru` |
| Cutdown | `cdn` |

### 5.4 Input Validation

Before proceeding with any task, Veda must validate:

| Check | Rule | On Failure |
|-------|------|------------|
| Source asset exists | Asset ID found in SSS spreadsheet (Ad Level Tracking tab, ID: `1IXqv6PufQ49nryatxhY6UVgJqZ-x2qId251donUgd_U`) | Halt — "Source asset not found" |
| Source asset exists in Iconik | Searchable by Asset ID name | Halt — "Source asset not in Iconik" |
| Root Angle Name exists | Column C populated for this Script ID | Halt — "Root Angle Name missing, human must assign" |
| Valid expansion type | Code is one of: `hs`, `ssr`, `dur`, `env`, `sp`, `dp`, `af`, `cf` | Halt — "Invalid expansion type" |
| Net New rules | If Ad Category = `nn` or `nnmu`, Expansion Type must = `xx` | Halt — "Net New cannot have expansion type" |
| Classification eligible | Source asset is Winner (or human override) | Warn — "Source asset is not a Winner. Proceed?" |

---

## 6. Output Specification

### 6.1 Primary Output: Ad Asset

Each task produces one or more ad asset files uploaded to Iconik.

| Attribute | Requirement |
|-----------|-------------|
| **File Format** | MP4 (video), PNG/JPG (image) |
| **Naming** | 15-position Asset ID compliant |
| **Destination** | Veda's editor folder in Iconik |
| **Metadata** | All 15 positions applied as Iconik metadata fields |
| **Keyframes** | Generated via Iconik after upload |
| **Proxies** | Generated via Iconik after upload |

### 6.2 Secondary Output: Google Doc Brief

> **v2+ Feature** — Currently handled by Creative Ops via shared Google Doc (Q1 Ad Requests, ID: `1yEzyga9KDyzUBSoQTNCTMg9GSjWCQJF2vXlKxUMgLHw`).

Each task will produce an ad brief document for editor reference (when v2 is built).

| Field | Content |
|-------|---------|
| Asset ID | New 15-position name |
| Source Asset | Original asset reference + Iconik URL |
| Expansion Type | Type and rationale |
| Root Angle | Root Angle Name (must match Column C) |
| Editor Instructions | Specific creative direction |
| B-roll Directions | Timestamp-specific B-roll specifications |
| Reference Images/Timestamps | Visual references from source |

### 6.3 Tertiary Output: ClickUp Task

> **v2+ Feature** — Currently handled by Creative Ops.

Each task will produce a ClickUp task for creative operations tracking (when v2 is built).

| Field | Content |
|-------|---------|
| Task Title | Asset ID |
| Description | Root Angle Name, expansion type, rationale |
| Google Doc Link | Link to ad brief |
| Iconik URL | Editor folder URL (updated to final URL after approval) |
| Assignee | Editor responsible |
| Status | Follows ClickUp workflow statuses |

### 6.4 Tracking Output: SSS Spreadsheet

Each launched asset updates the SSS spreadsheet (ID: `1IXqv6PufQ49nryatxhY6UVgJqZ-x2qId251donUgd_U`), Ad Level Tracking tab.

| Update | Location |
|--------|----------|
| New asset entry | Ad Level Tracking tab |
| Root Angle Name | Column C (same as source Script ID) |
| All parsed fields | Columns A-N per naming convention |
| Classification | Initially "Testing" (no spend data yet) |

> **Note (Session 005)**: Only APPROVED AND LAUNCHED assets are added to the SSS spreadsheet. Assets in review, revision, or backlog do NOT appear in SSS.

---

## 7. Strategic Planning Mode

Before entering the execution pipeline, Veda can operate in Strategic Planning Mode — a collaborative phase where Veda and the human align on creative strategy before any assets are created.

**Frequency**: Weekly Monday session (aligned with existing Monday cadence — Christopher reviews Domo data, meets with copywriter Chris for digital product ideas). Can also be triggered ad-hoc.

### 7.1 Planning Workflow

```
Phase A: INSIGHTS
  ├── Veda receives data-driven insights from Tess (performance data, winner identification, expansion win rates)
  └── Veda presents insights to human with context and recommendations

Phase B: STRATEGY
  ├── Human and Veda discuss which winners to expand and why
  ├── Align on expansion types, creative approaches, priorities
  ├── Veda challenges assumptions where data suggests alternatives
  └── Human makes final creative decisions

Phase C: TICKET CREATION
  ├── Document agreed-upon tickets (asset, expansion type, creative direction)
  ├── Multiple tickets may be created in one planning session
  └── Each ticket enters the execution pipeline (Steps 1-10) independently

Phase D: BATCH EXECUTION
  ├── Once aligned on all tickets, Veda executes them
  ├── v1: One-off tests to validate Veda's output quality
  ├── Ideal state: Veda executes entire batch after alignment
  └── Human reviews completed batch
```

> **Note (Session 005)**: This mirrors Claude Code's plan mode — strategize first, align, then execute. The human is always in the loop during strategy. Veda only executes after explicit confirmation on each ticket.

---

## 8. Execution Pipeline Requirements

### 8.1 Pipeline Sequence

The pipeline is a strict sequence. Each step must complete before the next begins.

```
Step 1: RECEIVE DIRECTION
  ├── From Tess recommendation (primary) OR manual human direction
  ├── Understand the intent: what asset, what expansion type, what creative approach
  ├── ASK: "Who is directing this task?" → Record 2-4 letter code (Position 12)
  ├── Populate Required Intake Fields:
  │
  │   REQUIRED INTAKE FIELDS
  │   ┌──────────────────────┬───────────────┬─────────────────────────────────┐
  │   │ Field                │ Source        │ Notes                           │
  │   ├──────────────────────┼───────────────┼─────────────────────────────────┤
  │   │ Source Asset ID       │ Tess/Human    │ Full 15-position ID             │
  │   │ Expansion Type        │ Tess/Human    │ Code from Position 8            │
  │   │ Root Angle Name       │ Auto-Inherit  │ From Column C of source Script  │
  │   │ Target Variations     │ Tess/Human    │ Number + target tiers (dur)     │
  │   │ Platform              │ Auto-Inherit  │ From source asset               │
  │   │ Dimensions            │ Auto-Inherit  │ From source asset               │
  │   │ Country Code          │ Auto-Inherit  │ From source; default "us"       │
  │   │ Talent Code           │ Auto-Inherit  │ From source asset               │
  │   │ Asset Type            │ Auto-Inherit  │ From source asset               │
  │   │ Edit Method           │ Tess/Human    │ assembly / ai_enhanced / hybrid │
  │   │ Directing Person      │ Human         │ 2-4 letter code (Position 12)   │
  │   │ Special Instructions  │ Human         │ Optional creative direction     │
  │   └──────────────────────┴───────────────┴─────────────────────────────────┘
  │   Source: Tess = pre-filled by Tess recommendation
  │          Human = must be specified by human
  │          Auto-Inherit = derived from source asset automatically
  │
  └── Note: This is intake — receive the creative direction, not formal ticket parsing.
       Ticket metadata captured at Step 6 (GENERATE ASSET IDs).

Step 2: VALIDATE
  ├── Verify source asset exists in SSS spreadsheet (Ad Level Tracking tab)
  ├── Verify source asset exists in Iconik (search by name)
  ├── Read Root Angle Name (Column C) for source Script ID
  ├── Verify expansion preserves root angle → if missing/ambiguous, HALT
  └── Select edit method (assembly / AI / hybrid) based on asset type

Step 3: CONFIRM & RESERVE
  ├── Query SSS spreadsheet for next available variation numbers per Script ID
  ├── Reserve variation numbers (e.g., v0030, v0031, v0032)
  ├── Present plan to human: "Creating [N] [expansion_type] variations of [asset_id]"
  ├── Include: Root Angle Name, edit method, source asset reference, reserved variation numbers
  └── Human confirms before Veda proceeds

Step 4: FETCH SOURCE
  ├── Download source asset from Iconik
  └── Retrieve associated metadata

Step 5: EDIT
  ├── Assembly path: FFmpeg operations (hook stack, reassembly, B-roll insert)
  ├── AI path: Varg SDK generation (v2+)
  ├── Duration expansions: Reassemble from best segments of source (NOT linear trim).
  │   All duration variations share the EXACT same opening hook from source asset.
  │   Body content between hook and CTA is where cuts/reassembly happens.
  │   Veda can pull segments from ANYWHERE in the source ad.
  │   CTA end cards: 5-8 seconds (usually 5s), standard cards for shorter versions.
  └── DURATION FLAG: If opening hook length > 50% of target duration → flag for human
       review (do NOT block). This is informational only — human decides whether to proceed.

Step 6: GENERATE ASSET IDs
  ├── Assemble full 15-position Asset IDs using reserved variation numbers from Step 3
  ├── Set creation date = today (YYYYMMDD)
  ├── Capture formal ticket metadata (funnel, script ID, angle, ad format, talent, etc.)
  ├── Map Ad Format to Asset Type code (e.g., "Human VO + B-Roll" → bvo)
  ├── Ad Category: exv or exh (NOT legacy ver/hor)
  ├── Country Code (Position 13): from intake (auto-inherited from source, default "us")
  ├── Editor Initials (Position 11): vv
  └── Copywriter Initials (Position 12): from intake (2-4 letter code)

Step 7: UPLOAD TO ICONIK
  ├── Upload to Veda's editor folder:
  │   z_EDITORS/Ad Editing Team/Veda/(PHYSICAL|DIGITAL)/(OFFER)/(SCRIPT ID)/(DIMENSION)/
  ├── Set asset title = 15-position Asset ID
  ├── Apply metadata from naming convention
  └── Trigger keyframe + proxy generation

Step 8: NOTIFY
  ├── Notify human that asset(s) are ready for review in Iconik
  ├── Provide: Iconik location, Asset ID(s), Root Angle Name
  └── (v2+: Create/update ClickUp task)

Step 9: CHECKPOINT
  ├── Human reviews asset (follows ClickUp status workflow externally)
  ├── Approve → proceed to Step 10
  ├── Revision needed → human provides feedback → Veda revises (return to Step 5)
  └── Not proceeding → task returns to BACKLOG in ClickUp, assets remain in Iconik folder

Step 10: UPDATE TRACKING (on launch only)
  ├── Update SSS spreadsheet (Ad Level Tracking) with new asset entries
  ├── Include Root Angle Name in Column C (same as source Script ID)
  └── Classification: "Testing" (no spend data yet)
  Note: Only APPROVED AND LAUNCHED assets reach this step. Assets in backlog,
  revision, or review do NOT enter the SSS spreadsheet.
```

> **Note (Session 005)**: Pipeline corrected to match actual Creative Ops workflow. Key changes: (1) Step 1 receives direction, not formal ticket parsing — metadata captured at Step 6. (2) Variation numbers reserved at Step 3 (CONFIRM) to prevent collisions; full Asset IDs assembled at Step 6 with creation date. (3) No ClickUp/Google Doc creation in v1. (4) Iconik editor folder, not "Pending Review collection". (5) Tracking update moved to after launch (Step 10) — only launched assets enter SSS spreadsheet.

### 8.2 Failure Handling

| Error | Severity | Auto Recovery | Manual Recovery |
|-------|----------|---------------|-----------------|
| `VALIDATION_ERROR` | Error — halt | None | Fix input, resubmit |
| `ROOT_ANGLE_ERROR` | Critical — halt | Retrieve transcript from Iconik → analyze for persuasive theses → present 3 Root Angle Name suggestions ranked by recommendation strength | Human selects or provides own Root Angle Name |
| `NAMING_ERROR` | Error — halt | None | Review naming logic |
| `ICONIK_ERROR` | Error — retry | 3x exponential backoff | Check Iconik status |
| `EDIT_ERROR` | Error — halt | None | Review source asset compatibility |
| `SHEETS_ERROR` | Warning — continue | Retry 3x | Manual SSS spreadsheet update |
| `DUPLICATE_ERROR` | Error — halt | Re-query + increment | Verify in SSS spreadsheet |
| `OUTPUT_VALIDATION_ERROR` | Error — halt | None | Review edit output |

### 8.3 Output Validation Constraints

Before uploading to Iconik, Veda validates the rendered output:

| Constraint | Requirement |
|------------|-------------|
| **File format** | MP4 (video), PNG/JPG (image) |
| **File size** | Warn if >500MB or <1MB for video |
| **Duration** | Must match target length tier (±5s tolerance) |
| **Codec** | H.264 for MP4 |
| **Resolution** | Must match target dimensions (9x16 = 1080x1920, 16x9 = 1920x1080) |

### 8.4 Idempotency

If a pipeline run is interrupted and resumed:
- Do NOT re-upload assets already in Iconik (check by Asset ID name search)
- Do NOT create duplicate SSS spreadsheet entries (check by Asset ID in Ad Level Tracking)

### 8.5 Error Logging

All errors are logged with:
- Timestamp
- Error category and severity
- Pipeline step where failure occurred
- Full context (asset IDs, parameters, API responses)
- Recovery action taken (or "halted — requires human")

---

## 9. Naming Convention Compliance

### 9.1 15-Position Format

Veda generates Asset IDs following the format defined in `TESS-NAMING-CONVENTION.md` (v3.3). The naming convention document in the Tess project directory is the single source of truth.

**Format**: `[Funnel]-[ScriptID]-[VariationID]-[Platform]-[Dimensions]-[LengthTier]-[AdCategory]-[ExpansionType]-[AssetType]-[TalentCode]-[EditorInitials]-[CopywriterInitials]-[CountryCode]-[CreationDate]-[PromoName]`

**Example**: `357-0003-v0030-fb-9x16-180s-exv-hs-sad-gamc-vv-co-us-20260205`

> **Note (Session 007)**: Format expanded from 14 to 15 positions with Country Code inserted at Position 13, shifting CreationDate to Position 14 and PromoName to Position 15. PromoName = `xx` for non-promotional assets.

### 9.2 Veda-Specific Naming Rules

| Position | Veda Rule |
|----------|-----------|
| 3 (VariationID) | Reserved at Step 3, assembled into full ID at Step 6 |
| 7 (AdCategory) | `exv` or `exh` for expansions, `nn` or `nnmu` for net new. ALWAYS use new codes, NOT legacy `ver`/`hor`. |
| 11 (EditorInitials) | `vv` (Veda's editor code) |
| 12 (CopywriterInitials) | Human directing Veda at intake (2-4 letter code, e.g., `co`, `bmdf`) |
| 13 (CountryCode) | Auto-inherited from source asset for expansions; specified for net new; default `us` |
| 14 (CreationDate) | Date of asset creation (YYYYMMDD) — set at Step 6, not at planning time |
| 15 (PromoName) | `xx` for non-promotional assets; set at intake if applicable |

> **Note (Session 005)**: Variation numbers reserved at Step 3 (CONFIRM) to prevent collisions between Veda and human editors. Full 15-position Asset IDs assembled at Step 6 after editing, with creation date = day of actual creation.

### 9.3 Variation Number Assignment

1. Query SSS spreadsheet (Ad Level Tracking tab) for all existing `[Funnel]-[ScriptID]-v????-...` entries
2. Cross-reference Creative Performance spreadsheets for in-progress variation numbers (until consolidated into SSS)
3. Take the MAX variation number from all sources
4. Reserve and increment sequentially for each new variation (e.g., v0030, v0031, v0032)

> **Note (Session 005)**: The Ad ID Generator spreadsheet (ID: `1bQTgH_nNef3eNCpheHOJjXpn09RM-x41MO5kM1vCDYo`) is designed for human editors to construct Asset IDs manually. Veda generates IDs programmatically and does not use the generator. Variation number source is the SSS spreadsheet + Creative Performance sheets (goal: consolidate into SSS as single source).

### 9.4 Business Logic Validation

| Rule | Condition | Action |
|------|-----------|--------|
| Net New requires xx expansion | AdCategory = `nn` AND ExpansionType != `xx` | Reject — invalid combination |
| Mashup requires xx expansion | AdCategory = `nnmu` AND ExpansionType != `xx` | Reject — invalid combination |
| Images use xx for platform/length | ScriptID starts with `i` or `h` AND (Platform != `xx` OR LengthTier != `xx`) | Reject — invalid combination |
| FB only supports 9x16 | Platform = `fb` AND Dimensions != `9x16` | Reject — invalid combination |

---

## 10. Edit Method Selection

### 10.1 Default Method by Asset Type

| Asset Type | Code | Default Edit Method | Rationale |
|------------|------|-------------------|-----------|
| Slice & Dice | `sad` | Assembly-preferred | Existing lesson footage available for reassembly |
| Podcast | `pod` | AI-enhanced | May require voice generation, new audio |
| AIVO | `avo` | AI-required | Voice synthesis is core to the format |
| Human VO + B-Roll | `bvo` | Assembly-preferred | Existing B-roll and voiceover footage available |
| Tele/Ronin | `tlr` | Hybrid | Depends on expansion type |
| Actor/Influencer (Paid) | `aip` | Assembly-preferred | Real talent footage available |
| Actor/Influencer (Organic) | `aio` | Assembly-preferred | Real talent footage available |
| Guru | `gru` | Assembly-preferred | Instructor footage available |
| Cutdown | `cdn` | Assembly-required | Shorter edit from existing asset |

### 10.2 Method by Expansion Type

| Expansion Type | Assembly Capabilities | AI Capabilities (v2+) |
|----------------|----------------------|----------------------|
| Hook Stack (`hs`) | Prepend 3-15s hook clip from library onto full source (output is longer than source) | Generate new hooks from text prompts |
| Scroll Stopper Refresh (`ssr`) | Swap 0-3s attention-grabbing opener from clip library (aligned with Domo 3-second view rate metric) | AI-generate attention elements |
| Duration (`dur`) | Reassemble from best segments of source ad. Same opening hook across all variations (isolation principle). Body content between hook and CTA is where cuts happen. Veda can pull from anywhere in source. CTA end cards 5-8s (usually 5s). Transcript Analyzer identifies optimal cut points while preserving root angle. | N/A (pure editorial — reassembly only) |
| Environment (`env`) | Swap background from environment clip library (real footage) | AI-generated environments (v2+) |
| Similar Presenter (`sp`) | Re-edit with similar talent footage from library | Generate similar presenter via AI (v2+) |
| Different Presenter (`dp`) | Re-edit with different talent footage from library | Generate different presenter via AI (v2+) |
| Ad Format (`af`) | Restructure from one format to another | Format-specific AI enhancements |
| Copy Framework (`cf`) | Same visuals, overlay new copy/CTA using proven copywriting frameworks | Framework-guided copy generation (v2+) |

> **Note (Session 007)**: Duration expansion = reassembly, NOT linear trim. The isolation principle requires identical opening hooks across all duration variations so the only test variable is LENGTH. Copy Framework must use PROVEN frameworks (framework library to be built after API hookup). Similar/Different Presenter AI generation moved to v2+. Environment supports real footage from library AND AI generation in v2+.

### 10.3 Override

Human can override the default edit method on any task. The override is recorded in the task metadata for tracking purposes.

---

## 11. Integration Requirements

### 11.1 Iconik DAM

| Capability | API Endpoint | Purpose |
|------------|-------------|---------|
| **Search by name** | `POST /API/search/v1/search/` | Find source assets by Asset ID |
| **Download asset** | `GET /API/files/v1/assets/{id}/files/{file_id}/` | Fetch source video/image |
| **Create asset** | `POST /API/assets/v1/assets/` | Create new asset entry |
| **Upload file** | Multi-step: Create Format → File Set → Upload → Close | Upload finished asset |
| **Apply metadata** | `PUT /API/metadata/v1/assets/{id}/views/{view_id}/` | Set naming convention fields |
| **Generate keyframes** | Automatic after upload completion | Thumbnail generation |
| **Generate proxies** | Automatic after upload completion | Preview video generation |

**Authentication**: `App-ID` and `Auth-Token` headers on every request.
**Rate Limit**: 50 req/sec sustained or 1000 req/20sec burst.

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

> **Note (Session 004)**: Assets are uploaded to Veda's editor folder, not a "Pending Review collection." Creative Ops manages collection movement through the ClickUp workflow.

Reference docs: `tess-strategic-scaling-system/_reference/articles-training/iconik-rest-api/` (8 documents)

### 11.2 Varg SDK (v2+)

| Capability | Component | Purpose |
|------------|-----------|---------|
| Video generation | `<Video>` | AI-generated hooks, B-roll |
| Image generation | `<Image>` | Thumbnails, overlays |
| Text-to-speech | `<Speech>` | Voiceover generation |
| Music generation | `<Music>` | Background audio |
| Captions | `<Captions>` | Auto-generated subtitles |
| Lipsync | Lipsync tools | Mouth alignment for new audio |
| Composition | `<Render>`, `<Clip>` | Video assembly and rendering |

**Package**: `vargai` (npm/bun). Version 0.4.0-alpha49.
**Required API Keys**: FAL (primary), ElevenLabs (TTS/music), Higgsfield (characters).

### 11.3 Google Sheets

| Operation | Spreadsheet | Tab | Purpose |
|-----------|-------------|-----|---------|
| **Read** | SSS (ID: `1IXqv6PufQ49nryatxhY6UVgJqZ-x2qId251donUgd_U`) | Ad Level Tracking | Get existing asset data, classifications, Root Angle Names, variation numbers |
| **Write** | SSS | Ad Level Tracking | Add new asset entries with all parsed fields (after launch only) |

> **Note (Session 005)**: The Ad ID Generator spreadsheet (ID: `1bQTgH_nNef3eNCpheHOJjXpn09RM-x41MO5kM1vCDYo`) is for human editors. Veda queries the SSS spreadsheet directly for variation numbers. Creative Performance spreadsheets are also consulted during the transition period until variation tracking is consolidated into SSS.

### 11.4 Google Docs (v2+)

> **v2+ Feature** — Currently handled by Creative Ops via shared Google Doc.

| Operation | Purpose |
|-----------|---------|
| **Create** | Ad brief document with full specifications for editors |

**Dependency**: Requires Docs MCP server. Prompt Christopher when brief creation phase is reached.

### 11.5 ClickUp (v2+)

> **v2+ Feature** — Currently handled by Creative Ops.

| Operation | Purpose |
|-----------|---------|
| **Create task** | Track asset through creative operations pipeline |
| **Update task** | Add Google Doc link, Iconik URLs, status changes |
| **Read task** | Check for existing tasks (prevent duplicates) |

**Dependency**: ClickUp API token + workspace structure (lists, statuses, custom fields). Christopher to share when build phase reaches this integration.

### 11.6 ClickUp Status Workflow

The following ClickUp statuses govern asset lifecycle through creative operations:

| Status | Description | Who Acts | Veda's Role |
|--------|-------------|----------|-------------|
| BACKLOG | Task created, not yet prioritized | Creative Ops | None (v1) |
| READY | Prioritized, assigned to editor | Creative Ops | Receives task |
| IN PROGRESS | Editor actively working | Editor/Veda | Editing + uploading |
| IN REVIEW | Lead editor or copywriter technical review | Lead Editor/Copywriter | Responds to feedback |
| IN REVISION | Feedback received, revising | Editor/Veda | Revises asset |
| FINAL REVIEW | Copywriter or lead editor final check | Copywriter/Lead | None |
| APPROVED | Asset approved for delivery | Reviewer | None |
| DELIVERED | Handed to media buying | Creative Ops | None |
| CLOSED/LAUNCHED | Ad is live — triggers SSS tracking update | Media Buying | Update SSS spreadsheet |

> **v1**: Veda's interaction with ClickUp is informational only — it reads statuses but does not create or update tasks. Creative Ops manages all ClickUp operations.

> **Note (Session 005)**: IN REVIEW can be performed by lead editor OR copywriter for expansion assets, since expansions don't always require a technical editor review. Assets that don't proceed are returned to BACKLOG — never deleted from Iconik.

---

## 12. Error Handling

See Section 8.2 (Failure Handling), 8.3 (Output Validation Constraints), and 8.5 (Error Logging) for the integrated error handling specification.

---

## 13. Acceptance Criteria

### 13.1 Minimum Viable Product (v1)

Veda v1 is complete when:

- [ ] Can operate in Strategic Planning Mode — collaborate with human on creative strategy
- [ ] Can receive manual task input (source asset + expansion type + parameters)
- [ ] Validates source asset exists in SSS spreadsheet (Ad Level Tracking tab)
- [ ] Validates Root Angle Name exists in Column C for source Script ID
- [ ] Reserves variation numbers and presents plan for human confirmation
- [ ] Generates valid 15-position Asset IDs with correct variation numbers
- [ ] Maps human-readable Ad Format names to Asset Type codes automatically
- [ ] Can search Iconik for source assets by Asset ID name
- [ ] Can download source assets from Iconik
- [ ] Can perform basic assembly edits via FFmpeg:
  - [ ] Hook stack (prepend new 3-15 second hook onto full source)
  - [ ] Duration reassembly (same opening hook, best segments, CTA end card)
  - [ ] Scroll stopper replacement (replace first 0-3 seconds)
- [ ] Can upload finished assets to Veda's Iconik editor folder
- [ ] Applies correct metadata to Iconik assets
- [ ] Updates SSS spreadsheet (Ad Level Tracking) after asset is launched
- [ ] All generated Asset IDs pass naming convention validation

### 13.2 v2+ Goals

- [ ] Google Doc brief creation (requires Docs MCP)
- [ ] ClickUp task creation and lifecycle management
- [ ] AI-enhanced editing via Varg SDK (requires FAL API key)
- [ ] Tess-driven automated task ingestion
- [ ] Batch processing of multiple expansion recommendations

### 13.3 Quality Gates for Release

| Gate | Requirement | Test |
|------|-------------|------|
| **Naming Accuracy** | 100% of generated IDs pass `naming-parser` validation | Generate 20 Asset IDs across all expansion types |
| **Root Angle Compliance** | Root Angle check runs on every expansion task | Attempt expansion without Root Angle → must halt |
| **Iconik Round-Trip** | Fetch → edit → upload → verify metadata | Complete cycle with one test asset |
| **Variation Uniqueness** | No duplicate variation numbers generated | Create 5 variations for same Script ID |
| **Idempotency** | Interrupted pipeline resumes without duplicates | Kill pipeline mid-run, resume |
| **Output Validation** | Rendered assets pass format/resolution/duration checks | Generate assets at wrong resolution → must catch |

---

## 14. Future Enhancements (v2+)

### 14.1 AI-Enhanced Editing

- Varg SDK integration for AI-generated hooks, B-roll, voiceovers
- Requires FAL API key + ElevenLabs API key
- Lipsync capabilities for audio replacement on existing footage

### 14.2 Tess-Driven Automation

- Automated task ingestion from Tess recommendation engine (Skill 4.1)
- Priority queue based on historical expansion win rates
- Batch processing of multiple expansion recommendations

### 14.3 Full Pipeline Automation

- Google Docs brief creation with Docs MCP
- ClickUp task creation and lifecycle management
- Automated status updates as assets move through pipeline stages

### 14.4 Advanced Editing Capabilities

- B-roll insertion at specified timestamps with semantic matching
- Caption generation with brand-specific styling
- Multi-asset mashup composition (`nnmu`)
- Environment replacement with AI-generated backgrounds

### 14.5 Quality Feedback Loop

- Track human approval/rejection rates per expansion type
- Correlate edit method choices with downstream ad performance
- Surface patterns: "Assembly Hook Stacks have 60% approval rate vs 40% for AI-generated"

### 14.6 Strategic Planning Dashboard

UX trajectory for leadership visibility into the Strategic Planning Mode:

| Phase | Interface | Description |
|-------|-----------|-------------|
| **v1** | Claude Code conversation | Tess presents recommendations in conversation; human approves/rejects inline |
| **v1.5** | SSS Sheets recommendation tab | Tess writes recommendations to a dedicated tab in SSS; human reviews in Sheets with approve/reject column |
| **v2** | Interactive web dashboard | Full web UI with portfolio view, recommendation cards, approval workflows, batch execution controls, and performance tracking |

> **Note (Session 007)**: Dashboard is a future enhancement. Current priority is getting Veda creating its first expansions via conversational flow.

---

## 15. Code Tables Reference

### 15.1 Ad Category Codes (Position 7)

| Code | Meaning | Notes |
|------|---------|-------|
| `nn` | Net New | |
| `exv` | Vertical Expansion | Replaces legacy `ver` |
| `exh` | Horizontal Expansion | Replaces legacy `hor` |
| `nnmu` | Net New Mashup | |

> Legacy codes `ver` and `hor` remain valid for existing assets. All new assets MUST use `exv` and `exh`.

### 15.2 Expansion Type Codes (Position 8)

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

### 15.3 Asset Type Codes (Position 9)

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

### 15.4 Veda-Specific Codes

| Code | Position | Meaning |
|------|----------|---------|
| `vv` | 11 (EditorInitials) | Veda Video Editing Agent |

### 15.5 Country Codes (Position 13)

| Code | Country |
|------|---------|
| `us` | United States |
| `ca` | Canada |
| `uk` | United Kingdom |
| `au` | Australia |
| `nz` | New Zealand |
| `ie` | Ireland |
| `za` | South Africa |
| `in` | India |
| `sg` | Singapore |
| `ph` | Philippines |
| `de` | Germany |
| `fr` | France |
| `xx` | Not Applicable / Global |

> Default for Performance Golf: `us`. Expansions auto-inherit from source asset. Net new assets must specify at intake.

---

## 16. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-03 | Christopher Ogle + Claude (Session 004) | Initial PRD — executive summary, success criteria, Root Angle compliance, input/output specs, execution pipeline, naming convention, edit method selection, integration requirements, error handling, acceptance criteria, future enhancements |
| 1.1 | 2026-02-04 | Christopher Ogle + Claude (Session 006) | Corrected execution pipeline to match actual Creative Ops workflow. Added Strategic Planning Mode (weekly Monday + ad-hoc), ClickUp 9-status workflow, Iconik editor folder structure, scope boundaries (v1 DOES/SHALL NOT), ad ticket format with Ad Format → Asset Type mapping. Moved Google Doc/ClickUp creation to v2+. Split Asset ID generation: variation numbers reserved at Step 3, full IDs at Step 6. Tracking update moved to after launch only. Added 4 new Asset Type codes (aip, aio, gru, cdn). Updated success criteria, error handling with output validation, acceptance criteria. Session attribution added throughout. |
| 1.2 | 2026-02-05 | Christopher Ogle + Claude (Session 007) | 15-position naming convention (v3.3) with Country Code at Position 13. Tess-driven mode established as primary input flow with intake checklist (Tess pre-fills, human approves + fills gaps). Expansion type operational definitions refined: Hook Stack 3-15s, Scroll Stopper 0-3s (Domo alignment), Duration = reassembly with same opening hook (isolation principle) + Transcript Analyzer for cut points, Environment = real footage + AI (v2+), Similar/Different Presenter = AI in v2+, Copy Framework = proven frameworks. Added duration flag at 50% hook-to-target ratio. ROOT_ANGLE_ERROR now triggers transcript-based 3 suggestions. CTA end cards 5-8s. bvo renamed to "Human VO + B-Roll". Copywriter codes 2-4 letters. Added Country Codes table (15.5), Strategic Planning Dashboard roadmap (14.6). MICRO-SKILLS renamed to SUB-AGENTS. |

---

## 17. Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Owner | Christopher Ogle | PENDING | |

---

*This PRD defines "what success looks like" for Veda. The companion VEDA-MASTER-AGENT.md defines "how Veda operates." The companion VEDA-SUB-AGENTS.md defines "what each sub-agent does."*
