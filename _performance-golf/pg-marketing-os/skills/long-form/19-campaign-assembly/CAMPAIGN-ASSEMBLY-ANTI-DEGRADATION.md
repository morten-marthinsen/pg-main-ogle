# CAMPAIGN-ASSEMBLY-ANTI-DEGRADATION.md

**Version:** 2.0
**Created:** 2026-02-05
**Updated:** 2026-02-14
**Purpose:** STRUCTURAL enforcement to prevent campaign assembly skill process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and CLAUDE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: CAMPAIGN-ASSEMBLY-ANTI-DEGRADATION.md v2.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Produce per-microskill output files for every microskill executed.
I WILL NOT: Assemble with fewer than 11 upstream packages, generate original content instead of assembling skill outputs, or skip TIER1 transition techniques.
```

**Write this declaration to your first output file before executing any microskill.**

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI assembles copy WITHOUT loading all 11 upstream packages
- AI creates abrupt section-to-section transitions (not using TIER1 techniques)
- AI fails threading audit (mechanism name, root cause anchor, framework, promise below minimums)
- AI skips callbacks (Lead-to-Close, Proof-to-Close, Story-to-Product, Root-Cause-to-Mechanism)
- AI produces section proportions wildly off benchmark (±10% tolerance exceeded)
- AI generates original content instead of assembling existing skill outputs
- AI creates franken-copy that doesn't flow together
- AI skips transition technique specimen loading

**Instructions can be ignored. Structures cannot be bypassed.**

---

## STRUCTURAL FIX 1: MANDATORY CHECKPOINT FILES

### Layer Progression Requirements

```
[project]/19-campaign-assembly/checkpoints/LAYER_0_COMPLETE.yaml  # All 11 packages verified
[project]/19-campaign-assembly/checkpoints/LAYER_1_COMPLETE.yaml
[project]/19-campaign-assembly/checkpoints/LAYER_2_COMPLETE.yaml
[project]/19-campaign-assembly/checkpoints/LAYER_3_COMPLETE.yaml
[project]/19-campaign-assembly/checkpoints/LAYER_4_COMPLETE.yaml
```

### LAYER 0 PACKAGE VERIFICATION (BLOCKING)

```yaml
# LAYER_0_COMPLETE.yaml

upstream_verification:
  all_packages_loaded: true
  timestamp: "[ISO 8601]"

  packages:
    skill_07_structure: [loaded | missing]
    skill_08_campaign_brief: [loaded | missing]
    skill_09_headline: [loaded | missing]
    skill_10_lead: [loaded | missing]
    skill_11_story: [loaded | missing]
    skill_12_root_cause_narrative: [loaded | missing]
    skill_13_mechanism_narrative: [loaded | missing]
    skill_14_product_introduction: [loaded | missing]
    skill_15_offer_copy: [loaded | missing]
    skill_16_close: [loaded | missing]
    skill_17_proof_weaving: [loaded | missing]

  missing_packages: [list]

  IF any_package == missing:
    HALT — "Cannot assemble without ALL 11 upstream packages"
```

---

## STRUCTURAL FIX 2: MINIMUM THRESHOLDS

### Non-Negotiable Minimums

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Upstream packages** | 11/11 loaded | HALT — Load missing packages |
| **Specimens loaded** | Transition techniques | HALT — Load specimens |
| **Section proportions** | Within ±10% of benchmark | HALT — Rebalance |
| **Mechanism name** | 8+ occurrences | HALT — Add instances |
| **Root cause anchor** | 5+ occurrences | HALT — Add instances |
| **Framework name** | 4+ occurrences | HALT — Add instances |
| **Primary promise** | 6+ occurrences | HALT — Add instances |
| **Callbacks** | 4/4 types present | HALT — Add callbacks |
| **Transitions** | TIER1 techniques | HALT — Use specimens |

### Threading Requirements (MINIMUM OCCURRENCES)

```yaml
threading_audit:
  mechanism_name:
    minimum: 8
    actual: [number]
    distribution: "[list sections where it appears]"
    passes: [Y/N]

  root_cause_anchor:
    minimum: 5
    actual: [number]
    distribution: "[list sections]"
    passes: [Y/N]

  framework_system_name:
    minimum: 4
    actual: [number]
    distribution: "[list sections]"
    passes: [Y/N]

  primary_promise:
    minimum: 6
    actual: [number]
    distribution: "[list sections]"
    passes: [Y/N]

  all_threading_passes: [Y/N]

  IF all_threading_passes == N:
    HALT — "Threading audit failed"
    failures: [list which elements below minimum]
```

### Callback Requirements (ALL 4 MUST BE PRESENT)

```yaml
callback_audit:
  lead_to_close:
    present: [Y/N]
    description: "Close references specific language from lead"
    quote_from_lead: "[text]"
    callback_in_close: "[text]"

  proof_to_close:
    present: [Y/N]
    description: "Transformation reminder callbacks to earlier testimonials"
    earlier_proof: "[reference]"
    callback_in_close: "[text]"

  story_to_product:
    present: [Y/N]
    description: "Product revelation connects to story elements"
    story_element: "[reference]"
    product_connection: "[text]"

  root_cause_to_mechanism:
    present: [Y/N]
    description: "Mechanism explicitly solves root cause"
    root_cause_statement: "[text]"
    mechanism_solution: "[text]"

  all_callbacks_present: [Y/N]

  IF all_callbacks_present == N:
    HALT — "All 4 callback types required"
    missing: [list missing callbacks]
```

---

## STRUCTURAL FIX 3: FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "I can work with available packages" | ALL 11 packages REQUIRED | HALT — Load missing |
| "specimens are reference only" | TIER1 transition techniques REQUIRED | HALT — Load verbatim |
| "transitions are smooth enough" | Must use TIER1 techniques | HALT — Apply techniques |
| "6 mechanism mentions is close" | 8+ is NON-NEGOTIABLE | HALT — Add instances |
| "callbacks will be added later" | Callbacks MUST be present NOW | HALT — Add callbacks |
| "proportion is approximately right" | ±10% tolerance is EXACT | HALT — Rebalance |
| "I'll write better transitions" | ASSEMBLE, don't GENERATE | HALT — Use skill outputs |
| "this section needs original content" | Assembly, not creation | HALT — Use upstream |

---

## STRUCTURAL FIX 4: TRANSITION TECHNIQUE GATE

### The Problem
AI creates abrupt section-to-section transitions instead of using TIER1 techniques.

### The Fix

**TRANSITION TECHNIQUE VALIDATION:**

```yaml
transition_validation:
  transitions_mapped:
    - transition: "Lead → Story"
      technique_used: "[Question-to-Validation | Credibility-to-Claim]"
      specimen_based: [Y/N]

    - transition: "Story → Root Cause"
      technique_used: "[Personal-to-Urgency | Historical-to-Prediction]"
      specimen_based: [Y/N]

    - transition: "Root Cause → Mechanism"
      technique_used: "[Data-to-Rhetorical | Expert-to-Reframe]"
      specimen_based: [Y/N]

    - transition: "Mechanism → Product"
      technique_used: "[Elite-to-Blueprint | Statistics-to-Visualization]"
      specimen_based: [Y/N]

    - transition: "Product → Offer"
      technique_used: "[Credibility-to-Claim | Question-to-Validation]"
      specimen_based: [Y/N]

    - transition: "Offer → Close"
      technique_used: "[Personal-to-Urgency | Historical-to-Prediction]"
      specimen_based: [Y/N]

  TIER1_techniques:
    - "Question-to-Validation"
    - "Credibility-to-Claim"
    - "Data-to-Rhetorical"
    - "Statistics-to-Visualization"
    - "Historical-to-Prediction"
    - "Expert-to-Reframe"
    - "Elite-to-Blueprint"
    - "Personal-to-Urgency"

  all_transitions_use_TIER1: [Y/N]

  IF all_transitions_use_TIER1 == N:
    HALT — "All transitions must use TIER1 techniques from specimens"
```

---

## STRUCTURAL FIX 5: SECTION PROPORTION GATE

### The Problem
AI produces sections wildly off benchmark proportions.

### The Fix

**PROPORTION VALIDATION:**

```yaml
proportion_validation:
  format: "[VSL | Magalog | Sales_Letter]"

  benchmarks:
    VSL:
      lead: "8-12%"
      story: "10-15%"
      root_cause: "8-12%"
      mechanism: "12-18%"
      proof: "15-20%"
      product: "10-15%"
      offer: "12-18%"
      close: "8-12%"

  actual_proportions:
    lead: "[%]"
    story: "[%]"
    root_cause: "[%]"
    mechanism: "[%]"
    proof: "[%]"
    product: "[%]"
    offer: "[%]"
    close: "[%]"

  tolerance: "±10%"

  out_of_range_sections: [list]

  IF any_section_out_of_range:
    HALT — "Section proportions must be within ±10% of benchmark"
    sections_to_adjust: [list with target ranges]
```

---

## STRUCTURAL FIX 6: ASSEMBLY-SPECIFIC MC-CHECK

```yaml
ASSEMBLY-MC-CHECK:
  timestamp: "[current time]"

  package_verification:
    packages_loaded: [number]
    if_under_11: "STOP — ALL 11 upstream packages required"
    missing_packages: [list]

  specimen_verification:
    transition_specimens_loaded: [Y/N]
    if_no: "STOP — Load TIER1 transition technique specimens"

  transition_verification:
    all_use_TIER1: [Y/N]
    if_no: "STOP — All transitions must use TIER1 techniques"

  threading_verification:
    mechanism_name_count: [number]
    if_under_8: "STOP — Minimum 8 mechanism name occurrences"

    root_cause_count: [number]
    if_under_5: "STOP — Minimum 5 root cause anchor occurrences"

    framework_count: [number]
    if_under_4: "STOP — Minimum 4 framework name occurrences"

    promise_count: [number]
    if_under_6: "STOP — Minimum 6 promise occurrences"

  callback_verification:
    lead_to_close: [Y/N]
    proof_to_close: [Y/N]
    story_to_product: [Y/N]
    root_cause_to_mechanism: [Y/N]
    if_any_no: "STOP — All 4 callback types required"

  proportion_verification:
    all_within_tolerance: [Y/N]
    if_no: "STOP — Section proportions must be within ±10%"

  generation_check:
    am_i_generating_instead_of_assembling: [Y/N]
    if_yes: "🛑 HALT — Assembly skill ASSEMBLES, does not GENERATE"

  result: [CONTINUE | HALT_PACKAGES | HALT_SPECIMENS | HALT_TRANSITIONS | HALT_THREADING | HALT_CALLBACKS | HALT_PROPORTIONS | HALT_GENERATION]
```

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION (Fixes 12, 15):
[ ] CAMPAIGN-ASSEMBLY-ANTI-DEGRADATION.md read (THIS FILE)
[ ] CAMPAIGN-ASSEMBLY-AGENT.md read
[ ] PROJECT-STATE.md created with all mandatory fields
[ ] PROGRESS-LOG.md created with header row
[ ] checkpoints/ directory created
[ ] Stale artifacts from previous attempts searched and deleted (Fix 14)
[ ] Input files validated (all 11 upstream skill packages)

LAYER 0 (FOUNDATION & LOADING):
[ ] ALL 11 upstream packages loaded and verified
[ ] 0.2.6-curated-gold-specimens.md READ
[ ] TIER1 transition technique specimens loaded VERBATIM
[ ] LAYER_0_COMPLETE.yaml created (with package verification)

LAYER 1 (SEQUENCING & PROPORTION):
[ ] Section order validated against structure-package
[ ] Proportions calculated against format benchmarks
[ ] All proportions within ±10% tolerance
[ ] LAYER_1_COMPLETE.yaml created

LAYER 2 (ASSEMBLY & TRANSITIONS):
[ ] All sections assembled from upstream skill outputs
[ ] All transitions written using TIER1 techniques
[ ] Sections flow naturally (no abrupt breaks)
[ ] LAYER_2_COMPLETE.yaml created

LAYER 3 (THREADING & CALLBACKS):
[ ] Threading audit passes (mechanism 8+, root cause 5+, framework 4+, promise 6+)
[ ] All 4 callback types present
[ ] Terms used CONSISTENTLY (no name variations)
[ ] LAYER_3_COMPLETE.yaml created

LAYER 4 (VALIDATION & PACKAGING):
[ ] Full read-through coherence check completed
[ ] Anti-slop validation passes
[ ] Editorial handoff prepared with revision flags
[ ] LAYER_4_COMPLETE.yaml created

OUTPUT:
[ ] assembled-draft-package.json created
[ ] ASSEMBLED-DRAFT-SUMMARY.md created

POST-EXECUTION:
[ ] PROJECT-STATE.md updated to COMPLETE
[ ] PROGRESS-LOG.md has full execution timeline
[ ] All output files verified (assembled-draft-package.json, ASSEMBLED-DRAFT-SUMMARY.md, execution-log.md)
[ ] All downstream handoffs populated
[ ] Learning log updated with any catches/fixes

ON CONTEXT RESUME:
[ ] VERIFY all 11 packages loaded
[ ] VERIFY specimens loaded
[ ] VERIFY threading counts
[ ] VERIFY all 4 callbacks present
[ ] VERIFY proportions within tolerance
```

---

## KEY INSIGHT

> **"Assembly is integration, not generation. Franken-copy happens when sections are stitched without transitions, threading, and callbacks. 11 packages in, 1 unified draft out."**

---

## STRUCTURAL FIX 7: DEDUPLICATION GATE (CRITICAL — ADDED 2026-02-06)

### The Problem (Ultra Liver Failure 2026-02-05)

AI assembled copy that passed all existing gates but contained MASSIVE content duplication:
- Three phases of liver detox explained THREE TIMES (Story, Root Cause, Mechanism)
- Car wash metaphor used TWICE (Story + Mechanism)
- "Sticky bile" explained FOUR TIMES
- Tri-Phase Flow ingredients explained THREE TIMES

**Root cause:** Upstream skills (11-17) each draft their section independently. Each tries to be "complete" — explaining the mechanism, root cause, etc. Assembly concatenated without detecting overlap.

### The Fix

**NEW MICROSKILL:** `layer-3/3.5-deduplication-audit.md`

```yaml
deduplication_gate:
  scan_scope: "All assembled sections"

  detection:
    critical_duplications:
      definition: "Same concept explained 2+ times with >50% semantic overlap"
      examples:
        - "Mechanism explained in Story AND Root Cause AND Mechanism sections"
        - "Same metaphor used in multiple sections"
        - "Same numbered list appears 2+ times"
      action: "BLOCKING — Must resolve before Layer 4"

    moderate_duplications:
      definition: "Same concept touched 2+ times with 30-50% overlap"
      action: "Human review required"

    acceptable_threading:
      definition: "Same PHRASE in different contexts (this is threading, not duplication)"
      action: "OK — This is intentional repetition for belief"

  resolution_options:
    CONSOLIDATE: "Keep in one section, remove from others"
    RESTRUCTURE: "Move content to appropriate section only"
    BRIDGE: "Turn repetition into callback"
    APPROVE_AS_IS: "Accept with documented reason (requires human approval)"

  human_checkpoint:
    required: true
    blocking: true
    trigger: "ANY critical duplication detected"

  gate_pass_criteria:
    critical_duplications_resolved: "100%"
    moderate_duplications_reviewed: "100%"
    human_decisions_documented: "100%"
```

### Updated Minimum Thresholds

| Metric | Minimum | If Not Met |
|--------|---------|------------|
| **Critical duplications** | 0 unresolved | HALT — Resolve all |
| **Moderate duplications** | All reviewed | HALT — Review all |
| **Human checkpoint (if critical)** | BLOCKING | HALT — Get decision |

### Updated ASSEMBLY-MC-CHECK

```yaml
ASSEMBLY-MC-CHECK:
  # ... existing checks ...

  deduplication_verification:  # NEW
    critical_duplications_found: [number]
    critical_duplications_resolved: [number]
    if_unresolved_critical: "🛑 HALT — Critical duplications must be resolved"

    moderate_duplications_found: [number]
    moderate_duplications_reviewed: [number]
    if_unreviewed_moderate: "STOP — All moderate duplications require review"

    human_checkpoint_completed: [Y/N]
    if_critical_and_no_human: "STOP — Human decision required for deduplication"
```

---

## DOCUMENTED FAILURE: ULTRA LIVER 2026-02-05

### Failure Summary

```yaml
failure_record:
  id: "FAIL_ASSEMBLY_001"
  date: "2026-02-05"
  campaign: "Ultra Liver"
  grade_assigned: "8.9/10 (passed)"
  actual_quality: "FAIL — Massive content duplication"

  duplications_found:
    - concept: "Three phases of liver detox"
      locations: ["Story lines 112-128", "Root Cause lines 230-246", "Mechanism lines 305-312"]
      overlap_percentage: ">80%"

    - concept: "Car wash metaphor"
      locations: ["Story lines 124-128", "Mechanism lines 334-339"]
      overlap_percentage: ">90%"

    - concept: "Sticky bile explanation"
      locations: ["Lead line 58", "Story lines 136-143", "Root Cause lines 252-256", "Mechanism lines 315-319"]
      count: 4

  why_existing_gates_missed_it:
    - "Threading audit counted repetition as positive (more mentions = better)"
    - "Transition audit evaluated smoothness, not content overlap"
    - "Callback verification didn't detect excessive callback-like repetition"
    - "No cross-section content comparison existed"

  fix_implemented:
    - "Added 3.5-deduplication-audit.md to Layer 3"
    - "Added deduplication verification to MC-CHECK"
    - "Made human checkpoint BLOCKING for critical duplications"

  lessons_learned:
    - "Upstream skills drafting independently creates natural overlap"
    - "Threading ≠ Duplication — threading is same PHRASE, duplication is same EXPLANATION"
    - "Assembly must CONSOLIDATE, not just CONCATENATE"
```

---

---

## Per-Microskill Output Protocol (v3.2)

**Added:** 2026-02-12
**Reference:** CLAUDE-CORE.md § MANDATORY PER-MICROSKILL OUTPUT PROTOCOL

Every microskill execution MUST produce a dedicated output file. This prevents the Synthesis Trap where agents read AGENT.md and synthesize output without reading/executing individual microskill specs.

### Required Output Files

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-vault-intelligence-loader | layer-0-outputs/0.2-vault-intelligence-loader.md | 1KB |
| 0 | 0.2.6-curated-gold-specimens | layer-0-outputs/0.2.6-specimen-loading.md | 2KB |
| 0 | 0.3-teachings-loader | layer-0-outputs/0.3-teachings-loader.md | 1KB |
| 0 | 0.4-input-validator | layer-0-outputs/0.4-input-validator.md | 1KB |
| 0 | 0.5-human-checkpoint-curator | layer-0-outputs/0.5-human-checkpoint.md | 1KB |
| 1 | 1.1-section-sequencer | layer-1-outputs/1.1-section-sequencer.md | 3KB |
| 1 | 1.2-proportion-calculator | layer-1-outputs/1.2-proportion-calculator.md | 3KB |
| 1 | 1.3-golden-thread-mapper | layer-1-outputs/1.3-golden-thread-mapper.md | 3KB |
| 1 | 1.4-pacing-planner | layer-1-outputs/1.4-pacing-planner.md | 3KB |
| 2 | 2.1-section-assembler | layer-2-outputs/2.1-section-assembly.md | 5KB |
| 2 | 2.2-transition-writer | layer-2-outputs/2.2-transitions.md | 5KB |
| 2 | 2.3-proof-block-inserter | layer-2-outputs/2.3-proof-block-insertions.md | 5KB |
| 2 | 2.4-callback-weaver | layer-2-outputs/2.4-callbacks.md | 3KB |
| 2 | 2.5-attention-maintenance | layer-2-outputs/2.5-attention-maintenance.md | 3KB |
| 3 | 3.1-golden-thread-auditor | layer-3-outputs/3.1-golden-thread-audit.md | 3KB |
| 3 | 3.2-terminology-consistency | layer-3-outputs/3.2-terminology-consistency.md | 3KB |
| 3 | 3.3-callback-verification | layer-3-outputs/3.3-callback-verification.md | 2KB |
| 3 | 3.4-pacing-verification | layer-3-outputs/3.4-pacing-verification.md | 2KB |
| 3 | 3.5-deduplication-audit | layer-3-outputs/3.5-deduplication-audit.md | 3KB |
| 4 | 4.1-full-read-through | layer-4-outputs/4.1-full-read-through.md | 3KB |
| 4 | 4.2-attention-audit | layer-4-outputs/4.2-attention-audit.md | 3KB |
| 4 | 4.3-anti-slop-validation | layer-4-outputs/4.3-anti-slop-validation.md | 3KB |
| 4 | 4.4-output-assembly | layer-4-outputs/4.4-output-assembly.md | 5KB |

### Layer Gate Enhancement

Each LAYER_N_COMPLETE.yaml checkpoint MUST list all microskill output files with sizes. If ANY output file is missing, the checkpoint CANNOT be created.

### Execution Log Enhancement

Each microskill entry in execution-log.md MUST include:
- Spec file read: [Y/N] with path
- Output file created: [Y/N] with path
- Output file size: [X]KB
- Schema compliance: [Y/N]

### Forbidden Behaviors

1. ❌ Executing microskills without reading their .md spec files
2. ❌ Producing summary output without per-microskill files
3. ❌ Checkpoint YAML without microskill output file listing
4. ❌ Output files below minimum size thresholds
5. ❌ Output files missing required section headers from spec

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | 2026-02-14 | STRUCTURAL FIXES 12-15: Added 4 structural fixes propagated from Skills 01-04. Fix 12: Mandatory Project Infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md, checkpoints/ — with all 11 upstream packages tracked). Fix 13: Binary Gate Enforcement (forbidden statuses — PARTIAL_PASS, CONDITIONAL_PASS, etc. trigger IMMEDIATE HALT). Fix 14: Stale Artifact Cleanup (search and delete before writing replacement output). Fix 15: Anti-Degradation Mandatory Read (session startup protocol — read this file + CAMPAIGN-ASSEMBLY-AGENT.md before execution). Added PRE-EXECUTION and POST-EXECUTION sections to implementation checklist. |
| 1.2 | 2026-02-12 | PER-MICROSKILL OUTPUT PROTOCOL (v3.2): Added per-microskill output table with 24 required output files across Layers 0-4. Enhanced layer gate, execution log, and forbidden behaviors for per-microskill enforcement. |
| 1.1 | 2026-02-06 | CRITICAL UPDATE: Added Structural Fix 7 (Deduplication Gate) after Ultra Liver failure. Added 3.5-deduplication-audit.md requirement. Added failure documentation. Threading inflation now distinguished from duplication. |
| 1.0 | 2026-02-05 | Initial creation as part of systematic anti-degradation rollout |

---

## STRUCTURAL FIX 8: PROOF USAGE REGISTRY (CRITICAL — ADDED 2026-02-06)

### The Problem (Ultra Liver Failure 2026-02-06)

Same proof points appeared MULTIPLE times with full citation:
- 61% taurine bile flow increase: appeared 4 TIMES
- NAC AASLD recommendation: appeared 4 TIMES
- Each appearance treated as "good threading" but was actually lazy repetition

**Root cause:** No tracking of which proof_ids have been used and where.

### The Fix

**MANDATORY PROOF USAGE REGISTRY:**

```yaml
proof_usage_registry:
  purpose: "Track every proof_id used and limit full citations to ONE"

  registry_format:
    proof_001:
      proof_id: "[from proof inventory]"
      content: "[the claim/statistic]"
      usages:
        - section: "[section name]"
          line: "[approximate line number]"
          usage_type: "[FULL_CITATION | BRIEF_REFERENCE | NAME_ONLY]"
        - section: "[another section]"
          line: "[line]"
          usage_type: "[type]"
      full_citation_count: [number]
      maximum_full_citations: 1

  validation:
    scan_for:
      - "Same percentage appearing with explanation"
      - "Same institution/study appearing with full context"
      - "Same specific claim with supporting detail"

    for_each_proof_id:
      full_citation_count: [number]
      IF full_citation_count > 1:
        HALT — "Proof [proof_id] has [count] full citations — maximum is 1"
        locations: [list where it appears]
        recommended_action: "Keep full citation in [best section], convert others to brief references"

  acceptable_patterns:
    FULL_CITATION: "Research published in [Journal] found that [ingredient] [specific result with number]"
    BRIEF_REFERENCE: "taurine (which improves bile flow)"
    NAME_ONLY: "taurine"

  example_violation:
    proof: "Taurine 61% bile flow increase"
    appearances:
      - "Research published in Clinical and Experimental Pharmacology..." (FULL - Line 240)
      - "Remember the 61% bile flow increase? That's taurine..." (FULL - Line 336)
      - "Remember: taurine...61% in clinical research" (FULL - Line 385)
      - "taurine for up to 61% increased bile flow" (FULL - Line 523)
    verdict: "4 full citations — VIOLATION"
    fix: "Keep Line 240, convert others to brief or remove"
```

---

## STRUCTURAL FIX 9: MANDATORY SECTION PRESENCE (CRITICAL — ADDED 2026-02-06)

### The Problem (Ultra Liver Failure 2026-02-06)

Draft was missing REQUIRED sections:
- No dedicated DAMAGE ESCALATION section (Harvard JAMA stat buried in close)
- No dedicated PROMISE/BENEFITS section (benefits assumed, not stated)
- Authority was weak (one sentence, should be full section)

### The Fix

**MANDATORY SECTION CHECKLIST:**

```yaml
mandatory_section_presence:
  format: "VSL / Long-form Sales Letter"

  required_sections:
    lead:
      present: [Y/N]
      contains_authority: [Y/N]
      authority_word_count: [number]
      minimum_authority_words: 50
      IF authority_word_count < 50:
        FLAG — "Authority too thin — consider dedicated Authority section"

    countersell:
      present: [Y/N]
      alternatives_addressed: [number]
      minimum_alternatives: 2
      IF alternatives < 2:
        HALT — "Countersell must address at least 2 alternatives"

    mechanism_education:
      present: [Y/N]
      teaches_before_revealing: [Y/N]
      IF teaches_before_revealing == N:
        FLAG — "Mechanism should include educational foundation"

    damage_escalation:
      present: [Y/N]
      shows_consequences: [Y/N]
      includes_urgency_proof: [Y/N]
      IF present == N:
        HALT — "DAMAGE ESCALATION section required — shows what happens if problem continues"
      note: "This is where urgency proofs (disease progression, organ damage) belong"

    promise_benefits:
      present: [Y/N]
      benefits_explicit: [Y/N]
      benefit_count: [number]
      minimum_benefits: 3
      IF present == N:
        HALT — "PROMISE/BENEFITS section required — explicit statement of what life becomes"
      IF buried_in_offer:
        FLAG — "Benefits should have dedicated section, not just offer 'if all it did was...'"

    proof_testimonials:
      present: [Y/N]
      placement: "[before product | after product]"
      recommended: "after product introduction"

    product_introduction:
      present: [Y/N]

    ingredients:
      present: [Y/N]
      IF present AND product_not_yet_introduced:
        HALT — "Ingredients cannot appear before product introduction"

    offer:
      present: [Y/N]

    guarantee:
      present: [Y/N]
      explained_once: [Y/N]
      IF explained multiple times:
        FLAG — "Guarantee should be explained ONCE with depth, not repeated"

    close:
      present: [Y/N]

  total_required: 11
  total_present: [number]

  IF total_present < total_required:
    HALT — "Missing required sections"
    missing: [list]
```

---

## STRUCTURAL FIX 10: PROOF PLACEMENT RULES (CRITICAL — ADDED 2026-02-06)

### The Problem (Ultra Liver Failure 2026-02-06)

Harvard JAMA stat about liver transplants was in the CLOSE instead of DAMAGE ESCALATION section where it would create urgency.

### The Fix

**PROOF PLACEMENT VALIDATION:**

```yaml
proof_placement_rules:
  purpose: "Ensure proof types appear in sections where they have maximum impact"

  placement_rules:
    urgency_proofs:
      definition: "Disease progression, organ damage, mortality, transplants"
      required_section: "DAMAGE ESCALATION"
      NOT_in: ["Close", "Offer"]
      examples:
        - "Harvard JAMA liver transplant finding"
        - "Disease progression statistics"
        - "Long-term consequence data"

    mechanism_proofs:
      definition: "How the mechanism works, ingredient studies"
      required_section: "MECHANISM or PROOF"
      examples:
        - "61% bile flow increase"
        - "Ingredient efficacy studies"

    credibility_proofs:
      definition: "Credentials, institutional backing"
      required_section: "LEAD (authority) or dedicated AUTHORITY section"
      examples:
        - "AASLD recommendation"
        - "Yale training"
        - "Published research"

    social_proofs:
      definition: "Testimonials, user numbers"
      required_section: "After PRODUCT INTRODUCTION"
      NOT_before: "Product is introduced"

  validation:
    for_each_proof_element:
      proof_type: "[urgency | mechanism | credibility | social]"
      current_section: "[where it is]"
      required_section: "[where it should be]"
      correctly_placed: [Y/N]

      IF correctly_placed == N:
        FLAG — "Proof [proof_id] is in [current] but belongs in [required]"
        recommended_action: "Move to [required_section]"

  example_violation:
    proof: "Harvard JAMA liver transplants"
    type: "urgency"
    was_in: "Close (line 587)"
    should_be_in: "Damage Escalation"
    fix: "Move to Damage Escalation section where it creates urgency to act"
```

---

## STRUCTURAL FIX 11: CLAIM TRACKING REGISTRY (ADDED 2026-02-06)

### The Problem

Same specific claims appeared multiple times:
- "18 months" mentioned TWICE
- "Phase 3" mentioned many times (some threading, some repetition)

### The Fix

**CLAIM TRACKING REGISTRY:**

```yaml
claim_tracking_registry:
  purpose: "Track specific claims to prevent redundant repetition"

  claim_types:
    timeframes:
      examples: ["18 months", "5 years", "28 days"]
      maximum_uses: 1 (with additional BRIEF references acceptable)

    statistics:
      examples: ["85 million", "61%", "2 out of 3"]
      maximum_full_citations: 1
      threading_as_phrase: acceptable

    proper_nouns:
      examples: ["Harvard", "Yale", "JAMA"]
      rule: "Full context once, name-only thereafter"

    product_mechanism_names:
      examples: ["Tri-Phase Flow", "Phase 3", "sticky bile"]
      rule: "THREADING (name repeated) is GOOD; EXPLANATION repeated is BAD"

  registry_format:
    claim: "[the specific claim]"
    type: "[timeframe | statistic | proper_noun | mechanism_name]"
    appearances:
      - section: "[name]"
        context: "[EXPLANATION | MENTION | REFERENCE]"
    explanation_count: [number]

    IF explanation_count > 1:
      FLAG — "Claim [claim] explained [count] times — should be 1"

  example:
    claim: "18 months"
    type: "timeframe"
    appearances:
      - section: "Lead"
        context: "EXPLANATION (For 18 months, I made it my mission...)"
      - section: "Product Formulation"
        context: "EXPLANATION (I spent the next 18 months...)"
    explanation_count: 2
    verdict: "VIOLATION — same timeframe explained twice"
    fix: "Keep in Lead, remove from Product Formulation"
```

---

## Updated ASSEMBLY-MC-CHECK Additions

```yaml
ASSEMBLY-MC-CHECK:
  # ... existing checks ...

  proof_usage_verification:  # NEW
    proof_ids_tracked: [number]
    proofs_with_multiple_full_citations: [list]
    IF any_proof_has_multiple_full_citations:
      HALT — "Proof appears with full citation multiple times"
      violations: [list with proof_id and locations]

  mandatory_section_verification:  # NEW
    required_sections:
      lead_with_authority: [Y/N]
      countersell: [Y/N]
      mechanism_education: [Y/N]
      damage_escalation: [Y/N]  # NEW REQUIREMENT
      promise_benefits: [Y/N]   # NEW REQUIREMENT
      proof_testimonials: [Y/N]
      product_introduction: [Y/N]
      offer: [Y/N]
      guarantee: [Y/N]
      close: [Y/N]

    missing_sections: [list]
    IF any_required_missing:
      HALT — "Missing required sections: [list]"

  proof_placement_verification:  # NEW
    urgency_proofs_in_damage_section: [Y/N]
    IF urgency_proofs_elsewhere:
      FLAG — "Urgency proofs belong in Damage Escalation section"
      misplaced_proofs: [list]

  claim_tracking_verification:  # NEW
    claims_with_multiple_explanations: [list]
    IF any:
      FLAG — "Same claim explained multiple times"
      violations: [list]
```

---

## STRUCTURAL FIX 12: MANDATORY PROJECT INFRASTRUCTURE

### The Problem
Multi-session projects lose continuity without persistent state files. Without PROJECT-STATE.md, which layers completed and what candidates were selected is forgotten between sessions.

### The Fix

**BEFORE any execution begins, create project infrastructure:**

```
[project]/19-campaign-assembly/
├── PROJECT-STATE.md          # Living document — updated after every layer
├── PROGRESS-LOG.md           # Append-only timeline of all actions
├── checkpoints/              # Gate checkpoint files
├── execution-log.md          # Detailed execution record
├── assembled-draft-package.json # PRIMARY OUTPUT
└── ASSEMBLED-DRAFT-SUMMARY.md   # Human-readable handoff
```

**PROJECT-STATE.md Mandatory Fields:**

```yaml
project: "[name]"
skill: "19-campaign-assembly"
created: "[date]"
last_updated: "[date]"
current_layer: [0-4]
status: "[INITIALIZING | IN_PROGRESS | COMPLETE]"
inputs_validated:
  skill_07_structure: [Y/N]
  skill_08_campaign_brief: [Y/N]
  skill_09_headline: [Y/N]
  skill_10_lead: [Y/N]
  skill_11_story: [Y/N]
  skill_12_root_cause_narrative: [Y/N]
  skill_13_mechanism_narrative: [Y/N]
  skill_14_product_introduction: [Y/N]
  skill_15_offer_copy: [Y/N]
  skill_16_close: [Y/N]
  skill_17_proof_weaving: [Y/N]
```

**Enforcement:** If PROJECT-STATE.md does not exist at session start, CREATE IT before any other action.

---

## STRUCTURAL FIX 13: BINARY GATE ENFORCEMENT (FORBIDDEN STATUSES)

### The Problem
Previous skills had models invent gate statuses like "PARTIAL_PASS" and "CONDITIONAL_PASS" — statuses that don't exist.

### The Fix

**Gate statuses are BINARY: PASS or FAIL. Decision statuses are explicit.**

```
VALID GATE STATUSES (checkpoint files):
  COMPLETE (layer checkpoint)
  PASS (gate evaluation)

VALID DECISION STATUSES (validation layer):
  approved
  revision (return to previous layer)
  blocked (return to earlier layer)

FORBIDDEN STATUSES (trigger IMMEDIATE HALT):
  PARTIAL_PASS / CONDITIONAL_PASS / SOFT_PASS
  approved_with_concerns / conditional_approval
  PROCEED_WITH_CONCERNS / WARNING
  "good enough" / "acceptable for now"

IF any forbidden status is generated:
  1. HALT immediately
  2. DELETE any output files created under the false status
  3. RETURN to the failing layer
  4. Re-evaluate with valid statuses only
```

---

## STRUCTURAL FIX 14: STALE ARTIFACT CLEANUP

### The Fix

**Before writing ANY replacement output file, VERIFY and DELETE stale artifacts:**

```
STALE ARTIFACT PROTOCOL:

BEFORE writing assembled-draft-package.json or ASSEMBLED-DRAFT-SUMMARY.md:
  1. SEARCH for existing files at ALL possible locations:
     - [project]/assembled-draft-package.json (root — from failed attempts)
     - [project]/19-campaign-assembly/assembled-draft-package.json (correct location)
     - [project]/outputs/assembled-draft-package.json (wrong path)
  2. IF stale file exists at wrong location:
     - DELETE it
     - LOG deletion in PROGRESS-LOG.md
  3. ONLY THEN write the new output files

AFTER any FAILED attempt:
  1. DELETE all output artifacts from the failed attempt
  2. LOG the failure and cleanup in PROGRESS-LOG.md
```

---

## STRUCTURAL FIX 15: ANTI-DEGRADATION MANDATORY READ

### The Fix

**Session startup protocol — BEFORE any Campaign Assembly execution:**

```
SESSION STARTUP:
  1. READ this file (CAMPAIGN-ASSEMBLY-ANTI-DEGRADATION.md) — MANDATORY
  2. READ CAMPAIGN-ASSEMBLY-AGENT.md — agent architecture and constraints
  3. IF resuming: READ PROJECT-STATE.md for current position
  4. IF resuming: READ checkpoint files to verify layer completion
  5. CREATE infrastructure (PROJECT-STATE.md, PROGRESS-LOG.md) if not exists
  6. ONLY THEN begin execution

NEVER begin Campaign Assembly execution without reading this anti-degradation file first.
```
