# Creative OS — Pipeline Handoff Registry

**Version:** 1.0
**Created:** 2026-03-18
**Purpose:** Define required fields, validation rules, and failure behavior for all inter-agent handoffs. Layer 0 input validators MUST verify field PRESENCE — not just file existence — against this registry.

---

## WHY THIS EXISTS

Creative OS agents hand off to each other. A degraded or incomplete output from one agent cascades into failures in another. Previously, handoffs were validated by file existence only — "does the intake queue row exist?" — without checking that required fields are populated.

**Specific failure this prevents:** Tess writes an intake queue entry with a valid Asset ID but leaves the expansion_type field blank. Veda's pipeline reads the row, hits an empty field mid-execution, and fails with an opaque error. If Tess had validated field presence before writing, this could not happen.

---

## VALIDATION PROTOCOL

```
FOR EACH handoff consumed by a receiving agent:
  1. CHECK: Data source exists (file, spreadsheet row, etc.) → if not, HALT
  2. CHECK: All REQUIRED fields present (per this registry) → if not, HALT with specific missing field
  3. CHECK: REQUIRED fields are non-empty → if not, HALT with specific empty field
  4. CHECK: Field values match expected formats (Asset ID = 15-position, dates = ISO 8601, etc.)
  5. OPTIONAL fields: log if missing, do not HALT

  ON FAILURE: Report the specific field name, expected format, and which agent should fix it.
  DO NOT proceed with partial data and "fill in later."
```

---

## BRIDGE 1: Tess → Veda (Intake Queue)

**Status:** LIVE
**Mechanism:** Intake Queue tab in SSS spreadsheet (18 columns). Veda reads via `--from-sheets` CLI flag.
**Direction:** Tess writes rows → Veda consumes rows

### Required Fields (Per Row)

| # | Column | Field | Format | Validation Rule |
|---|--------|-------|--------|-----------------|
| 1 | A | Asset ID | 15-position naming convention | Must pass TESS-NAMING-CONVENTION.md validator |
| 2 | B | Root Angle | Text | Must match SSS Column C exactly — never fabricated |
| 3 | C | Root Angle ID | e.g., `i223` | Must reference an existing root angle in Asset Registry |
| 4 | D | Expansion Type | Code (exv, exh, nn, nnmu, prm) | Must be valid code from TESS-NAMING-CONVENTION.md |
| 5 | E | Source Asset ID | 15-position | Must reference a real asset in the spreadsheet |
| 6 | F | Funnel | Code (e.g., clst, dqfe) | Must be valid funnel code |
| 7 | G | Ad Category | Code (nn, nnmu, exv, exh, prm) | Must match position 7 of Asset ID |
| 8 | H | Platform | Code (fb, yt, ig, xx) | Must be valid platform code |
| 9 | I | Dimensions | e.g., `1080x1920` | Must match `NNNNxNNNN` format |
| 10 | J | Length Tier | Code (15s, 30s, 60s, xx) | Must be valid length tier |
| 11 | K | Talent | Code | Must be valid talent code or `xxxx` |
| 12 | L | Editor | Code | Must be valid editor code from team roster |
| 13 | M | Copywriter | Code | Must be valid copywriter code from team roster |
| 14 | N | Country | Code (us, au, ca, etc.) | Must be valid country code |
| 15 | O | Status | Text (pending, in_progress, completed, failed) | Must be one of the 4 valid statuses |
| 16 | P | Priority | Number (1-5) | Lower = higher priority |
| 17 | Q | Special Instructions | Text | Optional — AI params, background prompts, etc. |
| 18 | R | Delivery Date | YYYYMMDD | Must be valid date format |

### Field Validation Rules

```
REQUIRED: Asset ID passes 15-position naming convention validation
REQUIRED: Root Angle is non-empty AND matches SSS Column C
REQUIRED: Expansion Type is a valid code
REQUIRED: Source Asset ID references a real asset (for expansions)
REQUIRED: Status is one of: pending, in_progress, completed, failed
REQUIRED: For Net New (nn): Source Asset ID may be empty
REQUIRED: For Expansions (exv, exh): Source Asset ID MUST be non-empty
```

### On Failure

```
IF Asset ID fails naming convention → HALT: "Row [N] Asset ID '[value]' does not match 15-position convention. Check positions [X, Y]."
IF Root Angle is empty → HALT: "Row [N] Root Angle is empty. Tess must populate from SSS Column C before Veda can process."
IF Root Angle not found in SSS → HALT: "Row [N] Root Angle '[value]' not found in SSS Column C. Verify spelling."
IF Expansion Type invalid → HALT: "Row [N] Expansion Type '[value]' is not a valid code. Expected: exv, exh, nn, nnmu, prm."
```

---

## BRIDGE 2: Tess → Neco (Data Protocol)

**Status:** DEFINED (protocol documented, not yet automated)
**Mechanism:** Tess provides performance data, audience segments, and winning angles as structured context for Neco creative sessions.
**Direction:** Tess produces data → Neco consumes as creative input

### Required Fields

| # | Field | Format | Validation Rule |
|---|-------|--------|-----------------|
| 1 | Root Angle Name | Text | Must match SSS Column C exactly |
| 2 | Root Angle Performance | Structured (ROAS, spend, impressions, classification) | All metrics must be actual values, not summaries |
| 3 | Asset Classification | W/P/U/T | Must be based on verified ROAS thresholds from Tess classification rules |
| 4 | Audience Segments | Structured list | Must be data-backed (not assumed) — sourced from ad performance data |
| 5 | Winning Angle Patterns | Structured list | Must reference specific asset IDs that demonstrate the pattern |
| 6 | Brand Thread | Thread 1 or Thread 2 | Must be assigned |

### Optional Fields

| # | Field | Format | Notes |
|---|-------|--------|-------|
| 7 | Competitor Landscape | Text | If available from Tess analysis |
| 8 | Historical Trend | Structured | Performance over time for the root angle |
| 9 | Expansion Opportunities | List | Tess-recommended expansion directions |

### Field Validation Rules

```
REQUIRED: Root Angle Name matches SSS Column C (never fabricated)
REQUIRED: Performance metrics are actual values (not "strong performer" or "good ROAS")
REQUIRED: Classification is one of: W (Winner), P (Potential), U (Underperformer), T (Testing)
REQUIRED: Audience segments cite data source (ad targeting data, not guesses)
REQUIRED: Brand Thread is assigned (Thread 1 or Thread 2)
```

### On Failure

```
IF Root Angle not in SSS → HALT: "Root Angle '[value]' not found in SSS Column C. Cannot proceed with creative brief."
IF Metrics are summaries → HALT: "Performance data contains qualitative descriptions instead of actual values. Tess must provide specific ROAS, spend, and impression data."
IF Classification missing → HALT: "Asset classification not provided. Neco needs W/P/U/T classification to calibrate creative direction."
```

---

## BRIDGE 3: Neco → Veda (Copy Handoff)

**Status:** PLANNED (not yet implemented)
**Mechanism:** Neco-generated scripts feed Veda production pipeline as copy overlay or voiceover input.
**Direction:** Neco produces scripts → Veda consumes for video production

### Required Fields (When Implemented)

| # | Field | Format | Validation Rule |
|---|-------|--------|-----------------|
| 1 | Script Text | Markdown | Non-empty, production-ready (copy-paste, no cleanup) |
| 2 | Root Angle | Text | Must match the intake queue entry's root angle |
| 3 | Target Asset ID | 15-position | Must match Veda's current production target |
| 4 | Script Type | voiceover / overlay / caption | Must be one of the 3 valid types |
| 5 | Brand Thread | Thread 1 or Thread 2 | Must be assigned |
| 6 | Verification Status | all_claims_verified / has_verify_markers | If `has_verify_markers`, human must review before production |
| 7 | Framework Attribution | Text | Framework + Audience + Angle + Style |

### Field Validation Rules

```
REQUIRED: Script text is non-empty and production-ready
REQUIRED: All [VERIFY] markers resolved OR escalated to human before Veda production
REQUIRED: Root Angle matches the intake queue entry
REQUIRED: Brand Thread is assigned
REQUIRED: Framework attribution is present
```

### On Failure

```
IF [VERIFY] markers remain → HALT: "Script contains [N] unresolved [VERIFY] markers. Human must review claims before Veda production."
IF Root Angle mismatch → HALT: "Script root angle '[neco_value]' does not match intake queue root angle '[veda_value]'. Realign before production."
```

---

## BRIDGE 4: Orion → All (Strategic Direction)

**Status:** LIVE
**Mechanism:** Orion provides strategic direction, scorecard alignment, and Brand Thread assignments that constrain all agents.
**Direction:** Orion produces directives → All agents consume as constraints

### Required Fields (Per Directive)

| # | Field | Format | Validation Rule |
|---|-------|--------|-----------------|
| 1 | Directive Type | scorecard_update / brand_thread / priority_shift / delegation | Must be one of the 4 types |
| 2 | Affected Agents | List of agent names | Must be valid agent names (Orion, Tess, Veda, Neco) |
| 3 | Effective Date | ISO 8601 | Must be a valid date |
| 4 | Description | Text | Non-empty, specific and actionable |
| 5 | Scorecard Alignment | Text | Which 30/60/90 scorecard item this advances |

### Optional Fields

| # | Field | Format | Notes |
|---|-------|--------|-------|
| 6 | Supersedes | Directive ID | If this replaces a previous directive |
| 7 | Expiry Date | ISO 8601 | If the directive is time-bounded |

### Validation Rules

```
REQUIRED: Description is specific and actionable (not "improve performance")
REQUIRED: Affected Agents lists at least one agent
REQUIRED: Scorecard Alignment references a real 30/60/90 item
```

### On Failure

```
IF no scorecard alignment → FLAG: "Directive does not align to any 30/60/90 scorecard item. Orion Challenger Protocol: is this worth doing?"
IF affected agents empty → HALT: "Directive has no target agents. Who should act on this?"
```

---

## CROSS-REFERENCE MAP

### What Each Agent Produces and Who Consumes It

| Producer | Output | Consumer(s) | Status |
|----------|--------|-------------|--------|
| **Tess** | Intake Queue rows (18 cols) | Veda | LIVE |
| **Tess** | Performance data + audience segments | Neco | DEFINED |
| **Neco** | Production-ready scripts | Veda | PLANNED |
| **Orion** | Strategic directives | Tess, Veda, Neco | LIVE |

### What Each Agent Consumes

| Consumer | Upstream Required | Source |
|----------|-------------------|--------|
| **Veda** | Intake Queue rows | Tess (via SSS spreadsheet) |
| **Veda** | Scripts (future) | Neco (copy handoff) |
| **Neco** | Performance data + audience segments | Tess (data protocol) |
| **Neco** | Strategic direction | Orion (directives) |
| **Tess** | Strategic priorities | Orion (directives) |

---

## LAYER 0 INPUT VALIDATION

Every agent, before consuming a handoff, MUST run Layer 0 input validation:

```
LAYER 0 INPUT VALIDATION (MANDATORY):

1. IDENTIFY which bridge(s) this task consumes (check this registry)
2. For each bridge:
   a. CHECK: Data source exists (spreadsheet row, file, directive)
   b. CHECK: All REQUIRED fields are present (per this registry)
   c. CHECK: All REQUIRED fields are non-empty
   d. CHECK: Field values match expected formats
3. IF any required field is missing or empty:
   → HALT with: "Bridge [X→Y] field '[field_name]' is [missing/empty].
     Expected: [format]. Fix in [source agent/location] before proceeding."
4. LOG: "Layer 0 validation PASS — all [N] required fields verified for Bridge [X→Y]"

DO NOT proceed with partial data.
DO NOT fill in missing fields with guesses.
DO NOT say "I'll check this later."
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial creation. Documents all 4 inter-agent bridges with required fields, validation rules, failure behavior, and Layer 0 input validation protocol. |
