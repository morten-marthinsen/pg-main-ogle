# CAMPAIGN-BRIEF-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-02-05
**Purpose:** STRUCTURAL enforcement to prevent campaign brief skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI produces brief without loading all upstream packages (7 required)
- AI skips synthesis of key decisions into unified document
- AI produces brief without voice/tone direction
- AI skips threading element documentation
- AI produces incomplete handoff for narrative skills

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Upstream Loading Requirements

**Campaign Brief CANNOT execute unless ALL 7 upstream packages exist:**

```
[project]/01-research/FINAL_HANDOFF.md
[project]/02-proof-inventory/proof-inventory-output.json
[project]/03-root-cause/root-cause-package.yaml
[project]/04-mechanism/mechanism-package.json
[project]/05-promise/promise-package.json
[project]/06-big-idea/big-idea-package.json
[project]/07-offer/offer-package.json
```

### Checkpoint File Format

```yaml
# CAMPAIGN_BRIEF_COMPLETE.yaml
skill: "09-campaign-brief"
status: COMPLETE
timestamp: "[ISO 8601]"

upstream_verification:
  research_loaded: true
  proof_inventory_loaded: true
  root_cause_loaded: true
  mechanism_loaded: true
  promise_loaded: true
  big_idea_loaded: true
  offer_loaded: true
  all_7_packages: true

brief_components:
  core_thesis_documented: true
  voice_tone_defined: true
  threading_elements_listed: true
  narrative_sequence_specified: true

completeness:
  all_sections_populated: true
  no_placeholder_text: true
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Upstream packages loaded** | 7/7 | HALT — Load all packages |
| **Threading elements documented** | All required | HALT — Document threading |
| **Voice/tone direction** | Specified | HALT — Define voice |
| **Narrative sequence** | Defined | HALT — Specify sequence |
| **Key decisions synthesized** | All major | HALT — Complete synthesis |

### Required Brief Sections

Every Campaign Brief MUST contain:

| Section | Content Required |
|---------|-----------------|
| Campaign Thesis | The central argument synthesized |
| Target Avatar | From research, crystallized |
| Root Cause Anchor | Phrase to repeat throughout |
| Mechanism Name | Exact name to use |
| Primary Promise | Exact promise language |
| Big Idea Expression | How it manifests in copy |
| Offer Summary | Core offer + bonuses |
| Voice/Tone Direction | Specific guidance |
| Threading Elements | What repeats throughout |
| Narrative Sequence | Order of story → RC → Mech → etc. |

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "I can work from summaries" | Must load ACTUAL packages | HALT — Load packages |
| "voice will emerge" | Voice must be DEFINED upfront | HALT — Define voice |
| "threading is obvious" | Threading must be DOCUMENTED | HALT — Document threading |
| "narrative writers know the sequence" | Sequence must be SPECIFIED | HALT — Specify sequence |
| "6 packages is enough" | All 7 required | HALT — Load missing package |

---

## STRUCTURAL FIX 4: THREADING DOCUMENTATION GATE

### Mandatory Threading Elements

```yaml
threading_elements:
  mechanism_name:
    exact_text: "[mechanism name]"
    minimum_occurrences_in_copy: 8
    sections_where_required: [lead, story, mechanism, product, close]

  root_cause_anchor:
    exact_text: "[anchor phrase]"
    minimum_occurrences_in_copy: 5
    sections_where_required: [lead, root_cause, mechanism, close]

  framework_name:
    exact_text: "[system/method name if any]"
    minimum_occurrences_in_copy: 4

  primary_promise:
    exact_text: "[promise language]"
    variations_allowed: [list acceptable variations]
    minimum_occurrences_in_copy: 6

  IF any_element_undefined:
    HALT — "All threading elements must be documented"
```

---

## STRUCTURAL FIX 5: CAMPAIGN-BRIEF-SPECIFIC MC-CHECK

```yaml
BRIEF-MC-CHECK:
  timestamp: "[current time]"

  upstream_verification:
    packages_loaded: [number]
    if_under_7: "STOP — All 7 upstream packages required"

  content_verification:
    thesis_documented: [Y/N]
    voice_defined: [Y/N]
    threading_documented: [Y/N]
    sequence_specified: [Y/N]
    if_any_no: "STOP — Complete all required sections"

  placeholder_check:
    contains_TBD: [Y/N]
    contains_placeholder: [Y/N]
    if_any_yes: "STOP — No placeholder text allowed"

  result: [CONTINUE | HALT_UPSTREAM | HALT_CONTENT | HALT_PLACEHOLDER]
```

---

## IMPLEMENTATION CHECKLIST

```
LOADING:
[ ] Research FINAL_HANDOFF.md loaded
[ ] Proof inventory loaded
[ ] Root cause package loaded
[ ] Mechanism package loaded
[ ] Promise package loaded
[ ] Big idea package loaded
[ ] Offer package loaded
[ ] All 7 packages verified

SYNTHESIS:
[ ] Campaign thesis synthesized from all inputs
[ ] Target avatar crystallized
[ ] Key decisions documented
[ ] Voice/tone direction specified
[ ] Threading elements listed with exact text
[ ] Narrative sequence defined
[ ] No placeholder text anywhere

OUTPUT:
[ ] Campaign brief document created
[ ] All sections populated
[ ] CAMPAIGN_BRIEF_COMPLETE.yaml created
[ ] Handoff ready for narrative skills
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |
