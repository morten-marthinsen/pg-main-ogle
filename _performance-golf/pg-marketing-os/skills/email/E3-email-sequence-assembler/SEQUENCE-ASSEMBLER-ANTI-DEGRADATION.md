# SEQUENCE-ASSEMBLER-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-21
**Purpose:** STRUCTURAL enforcement to prevent email sequence assembly process breakdown
**Authority:** This document has EQUAL authority to EMAIL-ENGINE-CLAUDE.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI assembles sequence without loading ALL email drafts (some missing)
- AI assembles without loading subject lines (attaches placeholder or generates new ones)
- AI modifies email body text during assembly (crosses into E4 territory)
- AI ignores blueprint sequence order and reorders emails
- AI adds P.S. lines to every email (exceeds 60% cap)
- AI writes vague cross-email connectors that don't reference actual content
- AI skips variety verification (assumes E0 handled it)
- AI generates new content instead of assembling existing pieces
- AI reassigns body types when variety violations are detected instead of HALTing

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

**Layer 1 CANNOT execute unless this file exists:**
```
[project]/E3-email-sequence-assembler/checkpoints/LAYER_0_COMPLETE.yaml
```

**Layer 2 CANNOT execute unless this file exists:**
```
[project]/E3-email-sequence-assembler/checkpoints/LAYER_1_COMPLETE.yaml
```

**Layer 3 CANNOT execute unless this file exists:**
```
[project]/E3-email-sequence-assembler/checkpoints/LAYER_2_COMPLETE.yaml
```

### Checkpoint File Format

```yaml
# LAYER_[N]_COMPLETE.yaml
layer: [N]
skill: "E3-email-sequence-assembler"
status: COMPLETE
timestamp: "[ISO 8601]"

verification:
  emails_loaded: [integer]
  subject_lines_loaded: [integer]
  blueprint_loaded: [true|false]

completeness:
  all_microskills_executed: true
  minimum_thresholds_met: true
  quality_gates_passed: true
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Email drafts loaded** | Must match blueprint total_emails exactly | HALT — Request E1 for missing emails |
| **Subject lines loaded** | 1 per email minimum | HALT — Request E2 for missing SLs |
| **Blueprint loaded** | Must be present | HALT — Request E0 execution |
| **Body type variety** | No consecutive same type | HALT — Flag blueprint error to human |
| **Body type window diversity** | 3+ types per 5-email window | HALT — Flag blueprint error to human |
| **P.S. frequency** | <= 60% of emails | Remove P.S. from lowest-priority emails |
| **Connector accuracy** | Must reference actual content | Rewrite connector with specific reference |
| **C1-C5 campaign criteria** | All must PASS | HALT — Flag failing criteria |

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "I can fix this email body text while assembling" | E3 NEVER modifies body text — that's E4 | HALT — Note issue for E4 |
| "This subject line doesn't fit, let me generate a better one" | E3 NEVER generates SLs — that's E2 | HALT — Request E2 revision |
| "The sequence order would be better if I moved email 5 to position 3" | E3 NEVER reorders — E0 designed the sequence | HALT — Flag to human |
| "Every email needs a P.S." | 60% cap is non-negotiable | Remove excess P.S. lines |
| "I'll write a general callback reference" | Connectors must cite specific content | Rewrite with actual reference |
| "Variety violation is minor, I can swap the body types" | E3 verifies, does NOT enforce — flag and HALT | HALT — Report to human |
| "I don't need to load all drafts to start assembling" | ALL drafts must be loaded before any assembly | HALT — Complete loading first |
| "The blueprint is outdated but I know the right sequence" | Blueprint is authoritative | HALT — Request updated blueprint |

---

## STRUCTURAL FIX 4: BODY TEXT MODIFICATION PROHIBITION

```yaml
body_text_protection:
  rule: "E3 NEVER modifies email body text from E1 output"
  allowed_additions:
    - "Cross-email connector (1-2 sentences at opening)"
    - "P.S. line (at end of email, after sign-off)"
  forbidden_modifications:
    - "Rewording any sentence in the body"
    - "Removing any sentence from the body"
    - "Changing the CTA text"
    - "Modifying the bridge/transition"
    - "Editing the opening hook"
    - "Changing the sign-off"
  if_modification_detected: "HALT — This is an E4 (editorial) responsibility"

  verification_method: |
    FOR each email in assembled sequence:
      original_body = E1_output[position].body_text
      assembled_body = assembled_sequence.emails[position].body_text
      REMOVE connector_text from assembled_body (if present at start)
      REMOVE ps_text from assembled_body (if present at end)
      ASSERT remaining_body == original_body
      IF NOT EQUAL: "HALT — Body text was modified during assembly"
```

---

## STRUCTURAL FIX 5: COMPLETE LOADING BEFORE ASSEMBLY

```yaml
loading_gate:
  rule: "ALL inputs must be fully loaded before ANY assembly begins"

  pre_assembly_checklist:
    all_email_drafts_loaded:
      required: true
      count_matches_blueprint: true
      each_has_body_text: true
      each_has_body_type: true
    all_subject_lines_loaded:
      required: true
      one_per_email_minimum: true
      each_has_formula_category: true
    blueprint_loaded:
      required: true
      has_sequence_order: true
      has_body_type_assignments: true
      has_emotional_arc: true
      has_urgency_plan: true

  if_any_false: "HALT — Cannot begin assembly with incomplete inputs"
```

---

## STRUCTURAL FIX 6: P.S. FREQUENCY ENFORCEMENT

```yaml
ps_frequency_check:
  rule: "P.S. lines in maximum 60% of emails"

  calculation: |
    ps_count = count(emails WHERE ps_added == true)
    total_emails = len(emails)
    ps_frequency = ps_count / total_emails

    IF ps_frequency > 0.60:
      HALT — Remove P.S. from lowest-priority emails
      Priority removal order:
        1. Content-forward emails (CP function) — least need for P.S.
        2. Mid-sequence emails (positions 3-5 in a 10-email sequence)
        3. Emails that already have strong CTAs
      NEVER remove P.S. from:
        - Last 2 emails of launch/affiliate sequences
        - Emails where P.S. is the primary urgency vehicle
```

---

## STRUCTURAL FIX 7: CONNECTOR ACCURACY ENFORCEMENT

```yaml
connector_accuracy_check:
  rule: "Every connector must reference specific content from a cited email"

  bad_examples:
    - "As I mentioned before..."  # What did you mention? Where?
    - "Remember what I shared recently..."  # Vague
    - "Building on my last email..."  # Which email? What content?

  good_examples:
    - "Yesterday I shared Dr. Smith's study on [specific finding]. Today..."
    - "Remember the story about [character name] who [specific event]? Well..."
    - "I mentioned the [deadline/offer detail] two days ago. We're now..."

  verification: |
    FOR each connector in assembled sequence:
      referenced_email = connector.references_email_position
      referenced_content = emails[referenced_email].body_text
      VERIFY connector_text contains specific detail from referenced_content
      IF vague_reference: "HALT — Rewrite connector with specific content reference"
```

---

## STRUCTURAL FIX 8: E3-SPECIFIC MC-CHECK

```yaml
E3-MC-CHECK:
  timestamp: "[current time]"

  loading_verification:
    all_drafts_loaded: [Y/N]
    draft_count_matches_blueprint: [Y/N]
    all_sls_loaded: [Y/N]
    blueprint_loaded: [Y/N]
    if_any_no: "STOP — Complete loading before proceeding"

  assembly_verification:
    emails_in_blueprint_order: [Y/N]
    sls_matched_to_correct_emails: [Y/N]
    body_text_unmodified: [Y/N]
    connectors_reference_actual_content: [Y/N]
    ps_frequency_within_cap: [Y/N]
    if_any_no: "STOP — Fix assembly violation"

  validation_verification:
    c1_variety_passes: [Y/N]
    c2_emotional_arc_passes: [Y/N]
    c3_continuity_passes: [Y/N]
    c4_escalation_passes: [Y/N]
    c5_sl_diversity_passes: [Y/N]
    if_any_no: "STOP — Address failing criterion"

  rationalization_check:
    am_i_modifying_body_text: [Y/N]
    am_i_generating_new_sls: [Y/N]
    am_i_reordering_emails: [Y/N]
    am_i_reassigning_body_types: [Y/N]
    am_i_skipping_loading: [Y/N]
    if_any_yes: "HALT — Rationalization detected"

  result: [CONTINUE | HALT]
```

---

## STRUCTURAL FIX 9: MANDATORY PROJECT INFRASTRUCTURE

**BEFORE any execution begins, create:**

```
[project]/E3-email-sequence-assembler/
├── PROJECT-STATE.md
├── PROGRESS-LOG.md
├── checkpoints/
├── execution-log.md
├── assembled-sequence.yaml     # PRIMARY OUTPUT
└── SEQUENCE-SUMMARY.md         # Human-readable handoff
```

---

## STRUCTURAL FIX 10: BINARY GATE ENFORCEMENT

```
VALID GATE STATUSES:
  COMPLETE (layer checkpoint)
  PASS (gate evaluation)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  approved_with_concerns / conditional_approval
  "good enough" / "acceptable for now"
  "close to passing" / "minor violations only"
```

---

## STRUCTURAL FIX 11: STALE ARTIFACT CLEANUP

```
BEFORE writing assembled-sequence.yaml:
  1. SEARCH for existing files at ALL possible locations
  2. DELETE stale artifacts from previous attempts
  3. LOG deletion in PROGRESS-LOG.md
  4. ONLY THEN write new output files
```

---

## STRUCTURAL FIX 12: ANTI-DEGRADATION MANDATORY READ

```
SESSION STARTUP:
  1. READ this file (SEQUENCE-ASSEMBLER-ANTI-DEGRADATION.md) — MANDATORY
  2. READ SEQUENCE-ASSEMBLER-AGENT.md
  3. IF resuming: READ PROJECT-STATE.md
  4. IF resuming: READ checkpoint files
  5. CREATE infrastructure if not exists
  6. ONLY THEN begin execution
```

---

## Per-Microskill Output Protocol

Every microskill execution MUST produce a dedicated output file.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-email-draft-loader | layer-0-outputs/0.1-email-draft-loader.md | 1KB |
| 0 | 0.2-subject-line-loader | layer-0-outputs/0.2-subject-line-loader.md | 1KB |
| 0 | 0.3-blueprint-loader | layer-0-outputs/0.3-blueprint-loader.md | 1KB |
| 1 | 1.1-timing-planner | layer-1-outputs/1.1-timing-planner.md | 2KB |
| 1 | 1.2-variety-checker | layer-1-outputs/1.2-variety-checker.md | 2KB |
| 1 | 1.3-escalation-mapper | layer-1-outputs/1.3-escalation-mapper.md | 2KB |
| 2 | 2.1-sequence-compiler | layer-2-outputs/2.1-sequence-compiler.md | 5KB |
| 2 | 2.2-connector-writer | layer-2-outputs/2.2-connector-writer.md | 3KB |
| 2 | 2.3-ps-strategy | layer-2-outputs/2.3-ps-strategy.md | 3KB |
| 3 | 3.1-sequence-validator | layer-3-outputs/3.1-sequence-validator.md | 3KB |
| 3 | 3.2-output-packager | layer-3-outputs/3.2-output-packager.md | 5KB |

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION:
[ ] SEQUENCE-ASSEMBLER-ANTI-DEGRADATION.md read (THIS FILE)
[ ] SEQUENCE-ASSEMBLER-AGENT.md read
[ ] PROJECT-STATE.md created
[ ] PROGRESS-LOG.md created
[ ] checkpoints/ directory created

LAYER 0 (LOADING):
[ ] All email drafts loaded from E1 output
[ ] Draft count matches blueprint total_emails
[ ] All subject lines loaded from E2 output
[ ] One SL per email minimum
[ ] Blueprint loaded with sequence order + body types + emotional arc
[ ] LAYER_0_COMPLETE.yaml created

LAYER 1 (SEQUENCE LOGIC):
[ ] Timing plan complete for all emails
[ ] Variety check passes (no consecutive, 3+ per 5-window)
[ ] Escalation map complete with urgency levels
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (ASSEMBLY):
[ ] All emails compiled in blueprint order
[ ] Subject lines attached to correct emails
[ ] Cross-email connectors written (reference actual content)
[ ] P.S. lines added (within 60% cap)
[ ] Body text unmodified (verified)
[ ] LAYER_2_COMPLETE.yaml created

LAYER 3 (VALIDATION + OUTPUT):
[ ] C1 Body Type Variety: PASS
[ ] C2 Emotional Arc: PASS
[ ] C3 Cross-Email Continuity: PASS
[ ] C4 Urgency Escalation: PASS
[ ] C5 Subject Line Diversity: PASS
[ ] assembled-sequence.yaml created
[ ] SEQUENCE-SUMMARY.md created
[ ] LAYER_3_COMPLETE.yaml created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full timeline
[ ] All output files verified
```

---

## KEY INSIGHT

> **"The assembler compiles. It does not create. If the pieces are wrong, the solution is upstream — not a secret fix during assembly."**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-21 | Initial creation — full structural enforcement |

---

**Status:** COMPLETE

---

## FAILURE MODE TABLE

| Failure Mode | Detection Signal | Automated Response | Human Escalation Threshold |
|-------------|-----------------|-------------------|---------------------------|
| Body text modification | Assembled email body differs from writer output | HALT — revert to original body text | Immediately |
| P.S. overuse | P.S. present in > 60% of emails | HALT — remove excess P.S. sections | If campaign strategy requires more |
| Connector inaccuracy | Cross-email references don't match content | HALT — verify and fix connector accuracy | Never — always fixable |
| C1-C5 criteria failure | Any campaign-level criterion fails | HALT — identify and fix failing criterion | After 2 fix rounds on same criterion |
| Timing conflicts | Emails scheduled with inadequate spacing | HALT — adjust timing per template | If business requires specific dates |
