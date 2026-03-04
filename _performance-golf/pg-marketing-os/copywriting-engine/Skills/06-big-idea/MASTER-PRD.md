# Big Idea Master - Product Requirements Document

**Version:** 2.0
**Created:** 2026-01-21
**Updated:** 2026-01-22 (Optimized by NateJones-PromptArchitect)
**Status:** Active
**Location:** `/CopywritingEngine/Skills/06-big-idea/MASTER-PRD.md`

---

## EXECUTIVE SUMMARY

Big Idea Master is a comprehensive system for extracting, analyzing, and generating Big Ideas from proven direct response advertising. The system operates in two major phases:

1. **Swipe Extraction Phase** — Extract and score 1,500+ proven controls using the 24-Dimension Scoring Framework
2. **Generative Engine Phase** — Use the extracted intelligence to generate Big Idea candidates from Deep Research inputs

**Schema Authority:** `SwipeExtractionMaster/SCHEMA/unified-extraction-schema.json`
**Orchestrator:** `GenerativeEngine/GENERATIVE-ENGINE-AGENT.md`

---

## CONSTRAINTS

- NEVER use scoring formulas other than the canonical formula defined in this document
- NEVER reference field paths other than those defined in `unified-extraction-schema.json`
- NEVER modify the schema without updating all downstream files (AGENT-INSTRUCTIONS, Layer1-INSTRUCTIONS, GENERATION-PRD)
- NEVER generate a BIG-IDEA-BRIEF.md without Layer 4 validation showing 4/4 gates PASS
- NEVER produce output with vague qualifiers ("many", "often", "most", "some", "several")
- ALWAYS use exact integer counts for all scoring and evidence claims
- ALWAYS trace recommendations to specific swipe IDs from the vault
- ALWAYS validate trigger conditions before starting the Generative Engine
- MUST maintain a single source of truth for scoring formula, schema, and field paths (this document)
- MUST require minimum 100+ relevant swipes, 500+ quotes, 15+ mechanisms before generation

---

## SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BIG IDEA MASTER SYSTEM                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────────┐    ┌───────────────────┐    ┌───────────────────────┐
│  SWIPE EXTRACTION │    │  CASE CONVERSION  │    │  GENERATIVE ENGINE    │
│   (Phase 1)       │    │   (Phase 1b)      │    │   (Phase 2)           │
└───────────────────┘    └───────────────────┘    └───────────────────────┘
        │                           │                           │
        └───────────────┬───────────┘                           │
                        ▼                                       │
        ┌───────────────────────────────────────┐              │
        │        PREMIUM SWIPE VAULT            │              │
        │    (24-Dimension Scored Extracts)     │◄─────────────┘
        └───────────────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────────────┐
        │         BIG-IDEA-BRIEF.md             │
        │        (Final Deliverable)            │
        └───────────────────────────────────────┘
```

---

## PHASE 1: SWIPE EXTRACTION

### Purpose
Transform raw swipe file content into structured, scored, searchable intelligence using the 24-Dimension Scoring Framework.

### The 24-Dimension Scoring Framework

Every swipe is analyzed and scored across three dimension categories:

#### DIMENSION 1: ELEMENTS (7 Copy Elements) — Max 70 Points

| Element | Definition |
|---------|------------|
| PERFECT_PROMISE | The core transformation/outcome promise |
| MECHANISM | The proprietary method/system/formula |
| ENEMY | The villain/antagonist force |
| IDENTITY | The tribe/belonging component |
| AUTHORITY | The credibility/expert component |
| DEMONSTRATION | The proof/show-don't-tell component |
| DISRUPTION | The category-breaking/contrarian component |

#### DIMENSION 2: DRIVERS (9 Emotional Drivers) — Max 90 Points

| Driver | Definition |
|--------|------------|
| FEAR_PROTECTION | Fear of loss/harm, desire for safety |
| FRUSTRATION_ANGER | Irritation with status quo, feeling stuck |
| REVENGE_VINDICATION | Desire to prove doubters wrong |
| SHAME_DIGNITY | Embarrassment/desire to restore self-respect |
| HOPE_POSSIBILITY | Optimism, belief in positive outcome |
| BELONGING_TRIBE | Desire to be part of special group |
| LIBERATION_FREEDOM | Escape from constraints/limitations |
| GREED_OPPORTUNITY | Desire for gain/profit/more |
| CURIOSITY | Need to know, open loops |

#### DIMENSION 3: STRUCTURES (8 Narrative Structures) — Max 80 Points

| Structure | Definition |
|-----------|------------|
| ORIGIN_DISCOVERY | How something was found/invented |
| TRANSFORMATION | Before/after journey |
| REVELATION_INTERVIEW | Insider reveals truth format |
| PROPHECY_WARNING | Prediction of future event |
| EXPOSE_INVESTIGATION | Uncovering hidden truth |
| COMPILATION_DOSSIER | Collection of evidence/facts |
| CHALLENGE_INVITATION | Dare/call to action format |
| SOCIAL_PROOF_BANDWAGON | Everyone's doing it |

#### Root Cause Analysis Integration

The MECHANISM element includes Root Cause Analysis — the diagnosis of the "real problem" that reframes the prospect's understanding:

- **Root Cause Element**: The diagnosed real problem (what they think vs. what it really is, why nothing worked)
- **Science/Conceptual Element**: How the solution works (mechanism framework)
- **Delivery/Tangible Element**: The action that delivers the benefit

**Market Sophistication & Root Cause Emphasis:**
- Stage 5 Markets (Health, Golf): Heavy root cause emphasis
- Stage 3 Markets (Finance): Light root cause, heavy mechanism focus
- Stage 1-2 Markets: Minimal root cause, direct benefit

### Canonical Scoring Formula

```
Elements Total = Sum of 7 element scores (max 70)
Drivers Total = Sum of 9 driver scores (max 90)
Structures Total = Sum of 8 structure scores (max 80)
Raw Total = Elements + Drivers + Structures (max 240)

Source Weight:
- Proven multi-year control: 1.5
- Known winner: 1.25
- Standard swipe: 1.0

Quality Score = min(round((Raw Total / 240) × 100 × Source Weight), 100)
```

**This formula is the single source of truth.** All files in the system (AGENT-INSTRUCTIONS, Layer instructions, GENERATION-PRD) must use this exact formula. No other calculation method is valid.

### Extraction Output Schema

All extractions conform to `unified-extraction-schema.json`. The canonical field paths are:

| Data | Canonical Path |
|------|---------------|
| Element scores | `configuration.elements.ELEMENT_NAME` |
| Driver scores | `configuration.drivers.DRIVER_NAME` |
| Structure scores | `configuration.structures.STRUCTURE_NAME` |
| Lead element | `configuration.lead_element` |
| Lead driver | `configuration.lead_driver` |
| Lead structure | `configuration.lead_structure` |
| Headline text | `components.headline.main_headline` |
| Headline type | `components.headline.pattern_type` |
| Lead text | `components.lead.full_text` |
| Hook sentence | `components.lead.hook_sentence` |
| Mechanism name | `components.mechanism.name` |
| Root cause | `components.mechanism.root_cause` |
| Proof types | `components.proof.types_used` |
| Offer | `components.offer.main_product` |
| Close CTA | `components.close.cta_text` |
| Source collection | `metadata.source_collection` |
| Niche | `metadata.niche` |
| Format | `metadata.format` |
| Big Idea type | `metadata.big_idea_type` |
| Central concept | `metadata.central_concept` |
| Quality score | `metadata.quality_score` |
| Extraction confidence | `metadata.extraction_confidence` |

### Source Collections

| Collection | Files | Status |
|------------|-------|--------|
| Crème de la Crème | 112 | Complete |
| 107 GREATEST Arsenal | ~100 | Complete |
| DM Health Motherlode | ~394 | In progress |
| CA Pro Control List | 64 | Complete (curated) |
| Performance Golf | 12 | Complete |
| DM Financial | ~244 | Pending |
| 298 Legacy Cases | 298 | Needs conversion |
| Billion Dollar Boys | ~15 | Pending |

**Total Extractions Completed:** ~658 files in PremiumSwipeVault/Processed/
**Total Target:** 1,500+ scored extractions

**Note:** File counts are approximate. Always verify actual counts by reading source directories at session start.

---

## PHASE 2: GENERATIVE ENGINE

### Purpose
Use the Premium Swipe Vault intelligence + Deep Research inputs to generate Big Idea candidates.

### Architecture
The Generative Engine is a 4-layer sequential pipeline coordinated by `GENERATIVE-ENGINE-AGENT.md`:

| Layer | Name | Purpose | Output |
|-------|------|---------|--------|
| 1 | Data Foundation | Load, validate, build component pools | `layer1-output.json` |
| 2 | Intelligence | Pattern/saturation/gap/emotion analysis | `layer2-output.json` |
| 3 | Generation | 5+ candidates with headlines/leads/proof | `layer3-output.json` |
| 4 | Validation | Volume/quantification/defensibility/actionability gates | `layer4-output.json` |

**Final Output:** `BIG-IDEA-BRIEF.md`

### Trigger Conditions

The Generative Engine activates ONLY when ALL conditions are met:
1. Deep Research Layer 2 checkpoint passed
2. `classified_quotes.json` has 500+ quotes
3. `mechanism_analysis.json` has 15+ mechanisms
4. `desire_language.json` has complete WEB analysis
5. `opportunity_synthesis.json` exists with strategic positioning
6. `market_config.yaml` has Schwartz stage defined
7. Premium Swipe Vault has 100+ relevant swipes for market category

### Deep Research Integration

The Generative Engine consumes these Deep Research outputs:
- `classified_quotes.json` — Pain, Hope, Root Cause, Solutions Tried
- `mechanism_analysis.json` — Competitor mechanisms (30+ target)
- `desire_language.json` — WEB analysis (Wants, Enemies, Beliefs)
- `opportunity_synthesis.json` — Strategic positioning
- `market_config.yaml` — Schwartz stage, competitive density

### Execution

For complete layer specifications, see:
- `GenerativeEngine/GENERATIVE-ENGINE-AGENT.md` — Pipeline orchestrator
- `GenerativeEngine/GENERATION-PRD.md` — Detailed architecture
- `GenerativeEngine/Layer1-DataFoundation/Layer1-INSTRUCTIONS.md`
- `GenerativeEngine/Layer2-Intelligence/Layer2-INSTRUCTIONS.md`
- `GenerativeEngine/Layer3-Generation/Layer3-INSTRUCTIONS.md`
- `GenerativeEngine/Layer4-Validation/Layer4-INSTRUCTIONS.md`

---

## FOLDER STRUCTURE

```
BigIdeaMaster/
├── MASTER-PRD.md                    ← This file (single source of truth)
├── AUDIT-REPORT.md                  ← System audit report
├── SESSION-LOG.md                   ← Progress tracking across sessions
│
├── SwipeExtractionMaster/           ← Phase 1 resources
│   ├── AGENT-INSTRUCTIONS.md        ← Extraction agent operations
│   ├── SCHEMA/
│   │   └── unified-extraction-schema.json  ← Canonical schema
│   └── SESSION-LOGS/
│
├── PremiumSwipeVault/               ← Extraction output
│   └── Processed/                   ← Individual JSON extractions
│       ├── dmhealth_*.json
│       ├── creme_*.json
│       ├── arsenal_*.json
│       └── ...
│
├── CasesConverted/                  ← 298 legacy cases in new format
│
└── GenerativeEngine/                ← Phase 2 resources
    ├── GENERATIVE-ENGINE-AGENT.md   ← Pipeline orchestrator
    ├── GENERATION-PRD.md            ← Detailed architecture spec
    ├── Layer1-DataFoundation/
    │   └── Layer1-INSTRUCTIONS.md
    ├── Layer2-Intelligence/
    │   └── Layer2-INSTRUCTIONS.md
    ├── Layer3-Generation/
    │   └── Layer3-INSTRUCTIONS.md
    └── Layer4-Validation/
        └── Layer4-INSTRUCTIONS.md
```

---

## QUALITY STANDARDS

### Evidence Requirements
- Every score above 0 must cite specific evidence from the source
- Every recommendation must cite 3+ swipe sources
- All counts must be exact integers (no ranges, no vague qualifiers)
- All claims must be traceable to source material

### Extraction Quality Checklist
- All 24 dimensions scored with evidence
- Root Cause Analysis captured (`emphasis_level`, `reframe_technique`)
- `configuration.lead_element/lead_driver/lead_structure` match highest scores
- Headline and lead captured verbatim
- Quality score calculated using canonical formula
- Filename follows naming convention

### Volume Gates (Generative Engine)
- Minimum 100+ swipes analyzed per run
- Minimum 500+ quotes from Deep Research
- Minimum 15+ competitor mechanisms
- Minimum 3+ swipe examples per Big Idea type
- Minimum 5+ swipe examples per mechanism pattern

---

## SUCCESS METRICS

### Phase 1 (Extraction)
| Metric | Target |
|--------|--------|
| Total extractions | 1,500+ |
| Schema compliance | 100% (all files match unified-extraction-schema.json) |
| Collections completed | 8/8 |
| Cases converted | 298/298 |

### Phase 2 (Generation)
| Metric | Target |
|--------|--------|
| Big Idea candidates per run | 5+ |
| Headlines per Big Idea | 10+ |
| Validation gate pass rate | 4/4 (100%) |
| Evidence traceability | 100% of recommendations sourced |
| Vague qualifiers | 0 |

---

## RELATED DOCUMENTS

- [AGENT-INSTRUCTIONS.md](./SwipeExtractionMaster/AGENT-INSTRUCTIONS.md) — Extraction agent operations
- [unified-extraction-schema.json](./SwipeExtractionMaster/SCHEMA/unified-extraction-schema.json) — Canonical JSON schema
- [GENERATIVE-ENGINE-AGENT.md](./GenerativeEngine/GENERATIVE-ENGINE-AGENT.md) — Pipeline orchestrator
- [GENERATION-PRD.md](./GenerativeEngine/GENERATION-PRD.md) — Generative Engine architecture
- [SESSION-LOG.md](./SESSION-LOG.md) — Progress tracking
- [AUDIT-REPORT.md](./AUDIT-REPORT.md) — System health audit

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-21 | Initial creation |
| 1.1 | 2026-01-22 AM | Added Root Cause Analysis framework |
| 1.2 | 2026-01-22 PM | CA Pro + Performance Golf complete, 658 total |
| 2.0 | 2026-01-22 | NateJones-PromptArchitect optimization: Fixed scoring formula, aligned schema paths to canonical, added CONSTRAINTS section, removed GENERATION-PRD duplication, added orchestrator reference |

---

*This is the single source of truth for the Big Idea Master system. All other documents reference this PRD for scoring formula, schema paths, and quality standards.*
