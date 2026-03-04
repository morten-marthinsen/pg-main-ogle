# CopywritingEngine Full System OPTIMIZE Audit Report

**Audit Date:** 2026-01-28
**Mode:** OPTIMIZE (Layer 1 Diagnostic → Layer 2 Prescriptions → Layer 3 Delivery)
**Target:** CopywritingEngine/Skills/ — 18 domains, 438 files (420 skills + 18 AGENT.md)
**Auditor:** Nate Jones Prompt Architect v1.0
**Authority Documents:** ARCHITECTURE-PRD.md, QUALITY-STANDARDS.md, SKILL-TEMPLATE.md

---

## Executive Summary

The CopywritingEngine is a structurally sound 18-domain direct-response copywriting pipeline with **420 skill files across 5 layers** and **18 AGENT.md orchestrators**. The system demonstrates strong architectural patterns — particularly in Layers 2-4 where specimen-grounded writing, chain-of-refinement, and locked validation grammar are well-established.

**However, the audit identified 7 systemic issues that affect virtually every file in the system**, plus 2 files requiring major intervention (16-Campaign-Assembly: REWRITE, 17-Editorial-Review: REBUILD).

### System Health Rating: FAIR → targeting GOOD

| Category | Score |
|----------|-------|
| Structural Integrity | **GOOD** (avg Four-Block: 18.1/20) |
| Constraint Density | **POOR** (avg ratio: 0.42 for orchestrators) |
| Specificity | **GOOD** (avg: 87%) |
| Guardrail Coverage | **FAIR** (avg: 4.2/7 for orchestrators) |
| Production Readiness | **GOOD** (avg principles: 5.0/6) |
| Anti-Slop Compliance | **GOOD** (avg density: 0.4/100 lines) |
| Validation Architecture | **EXCELLENT** (Layer 4 is the strongest layer) |
| Session Persistence | **POOR** (1/18 orchestrators have it — only domain 00) |

---

## Part 1: AGENT.md Orchestrator Diagnostics (18 files)

### Full Scoring Matrix

| Domain | Four-Block | Constraint Ratio | Specificity | Guardrails | Prod Principles | Slop Density | Verdict |
|--------|-----------|-----------------|------------|-----------|----------------|-------------|---------|
| **00-deep-research** | 19/20 | **0.20** | 88% | **6/7** | 6/6 | 0.36 | OPTIMIZE |
| **01-proof-inventory** | 19/20 | **0.38** | 88% | **4/7** | 5/6 | 0.5 | OPTIMIZE |
| **02-root-cause** | 20/20 | **0.52** | 90% | **4/7** | 6/6 | 0.2 | OPTIMIZE |
| **03-mechanism** | 20/20 | 0.64 | 92% | **4/7** | 6/6 | 0.3 | OPTIMIZE |
| **04-promise** | 20/20 | **0.42** | 85% | **4/7** | 5/6 | 0.8 | OPTIMIZE |
| **05-big-ideas** | 20/20 | **0.47** | 85% | **4/7** | 5/6 | 1.1 | OPTIMIZE |
| **06-offer** | 19/20 | **0.13** | **72%** | **1/7** | **4/6** | 0.9 | OPTIMIZE |
| **07-structure** | 20/20 | **0.36** | 92% | **4/7** | 6/6 | 0.4 | PASS |
| **08-campaign-brief** | 20/20 | **0.05** | 85% | **5/7** | 5/6 | 0.5 | OPTIMIZE |
| **09-lead** | 20/20 | **0.38** | 94% | **4/7** | 6/6 | 0.3 | PASS |
| **10-story** | 20/20 | **0.34** | 91% | **4/7** | 6/6 | 0.4 | PASS |
| **11-root-cause-narr** | 18/20 | 0.71 | 92% | **5/7** | 5/6 | 0.3 | PASS |
| **12-mechanism-narr** | 18/20 | 0.71 | 91% | **5/7** | 5/6 | 0.3 | OPTIMIZE |
| **13-product-intro** | 18/20 | 0.70 | 93% | **5/7** | 5/6 | 0.3 | OPTIMIZE |
| **14-offer-copy** | 18/20 | 0.70 | 94% | **5/7** | 5/6 | 0.4 | OPTIMIZE |
| **15-close** | 19/20 | 0.69 | 95% | **5/7** | 5/6 | 0.3 | OPTIMIZE |
| **16-campaign-assembly** | **15/20** | **0.43** | **82%** | **3/7** | **3/6** | 0.8 | **REWRITE** |
| **17-editorial-review** | **10/20** | **0.00** | **35%** | **0/7** | **1/6** | 3.2 | **REBUILD** |

**Bold** = below threshold. Thresholds: Four-Block ≥16, Constraint Ratio ≥0.60, Specificity ≥80%, Guardrails ≥6 (orchestrator), Prod Principles ≥5.

### Verdict Distribution

| Rating | Count | Domains |
|--------|-------|---------|
| **PASS** | 4 | 07-Structure, 09-Lead, 10-Story, 11-Root-Cause-Narrative |
| **OPTIMIZE** | 12 | 00, 01, 02, 03, 04, 05, 06, 08, 12, 13, 14, 15 |
| **REWRITE** | 1 | 16-Campaign-Assembly |
| **REBUILD** | 1 | 17-Editorial-Review |

### Reference Models (Strongest Files)

1. **03-MECHANISM-AGENT.md** — Highest constraint ratio among early domains (0.64), strong specificity (92%), 6/6 production principles
2. **09-LEAD-AGENT.md** — Highest specificity (94% in domains 06-10), comprehensive execution protocol
3. **11-ROOT-CAUSE-NARRATIVE-AGENT.md** — Highest constraint ratio overall (0.71), 5/7 guardrails, includes Three-Tier Uncertainty
4. **00-DEEP-RESEARCH-AGENT.md** — Only orchestrator with session persistence, 6/7 guardrails, 6/6 production principles

### Critical Domain-Specific Findings

**Domain 00 (Deep Research):**
- CRITICAL: Micro-Skill Registry references OLD Layer 3 architecture (Big Idea Generator, Mechanism Developer) while execution sequence uses NEW architecture (Opportunity Scorer, Evidence Compiler). This will cause routing failures.
- CRITICAL: Layer 2.5 skills (2.5-A through 2.5-G) completely missing from the Micro-Skill Registry despite being fully defined in execution sequence.
- Composability below threshold (3/5) — file is 2,239 lines, non-composable as callable component.

**Domains 11-15 (Narrative Execution):**
- CRITICAL: 13 skill-number cross-reference errors. AGENT.md files reference wrong upstream skill numbers (off-by-one). Example: Skill 13 references "Skill 11" when it should reference "Skill 12".

**Domain 06 (Offer):**
- Weakest file in the system: 1/7 guardrails, 72% specificity, 0.13 constraint ratio. Only has Identity Invariants guardrail pattern.

**Domain 08 (Campaign Brief):**
- Lowest constraint ratio (0.05) but unique positive: only file besides Domain 00 with Three-Tier Uncertainty guardrail pattern.

---

## Part 2: Representative Skill File Diagnostics (21 files sampled)

### Layer-0 (Foundation) — 6 files sampled from 71 total

| File | Domain | Lines | Four-Block | Constraint Ratio | Guardrails | Verdict |
|------|--------|-------|-----------|-----------------|-----------|---------|
| 0.1-upstream-loader | 09-lead | 142 | 17 | **0.45** | **2** | OPTIMIZE |
| 0.2-vault-intelligence-loader | 09-lead | 226 | 18 | **0.55** | 4 | OPTIMIZE |
| 0.4-input-validator | 09-lead | 104 | 16 | 0.62 | 3 | **REWRITE** |
| 0.1-upstream-loader | 10-story | 332 | 19 | 0.68 | 5 | PASS |
| 0.1-deep-research-loader | 05-big-ideas | 178 | 18 | 0.72 | 4 | PASS |
| 0.2-vault-intelligence-loader | 03-mechanism | 290 | 18 | 0.60 | 4 | OPTIMIZE |

**Extrapolation across 71 files:** ~20 PASS, ~35 OPTIMIZE, ~12 REWRITE, ~4 REBUILD

**Gold Standard:** `10-story/0.1-upstream-loader.md` — required/optional distinction, FATAL error handling, domain-specific extraction rationale, narrative obligation derivation. Use as template for all Layer-0 rewrites.

### Layer-1 (Analysis/Classification) — 6 files sampled from 98 total

| File | Domain | Lines | Four-Block | Constraint Ratio | Anti-Slop | Exemplars | Verdict |
|------|--------|-------|-----------|-----------------|-----------|-----------|---------|
| 1.1-lead-type-classifier | 09-lead | 397 | 18 | 0.72 | **7** | ABSENT | OPTIMIZE |
| 1.2-hook-engineer | 09-lead | 409 | 19 | 0.75 | 8 | ABSENT | OPTIMIZE |
| 1.1-story-type-classifier | 10-story | 639 | 19 | 0.78 | **7** | ABSENT | OPTIMIZE |
| 1.1-communication-type-classifier | 11-root-cause | 504 | 19 | 0.73 | **6** | PARTIAL | OPTIMIZE |
| 1.1-pattern-analyzer | 05-big-ideas | 182 | **14** | **0.55** | **5** | ABSENT | **REWRITE** |
| 1.1-campaign-thesis-crystallizer | 07-structure | 183 | 16 | 0.62 | **7** | ABSENT | OPTIMIZE |

**Extrapolation across 98 files:** ~0 PASS, ~70 OPTIMIZE, ~20 REWRITE, ~8 REBUILD

### Layers 2-4 (Generation, Validation, Assembly) — 9 files sampled from 242 total

| File | Layer | Domain | Lines | Verdict |
|------|-------|--------|-------|---------|
| 2.1-problem-callout-builder | L2 | 11-root-cause | 299 | PASS |
| 2.2-discovery-sequence-builder | L2 | 10-story | 608 | PASS |
| 2.2-root-cause-revelation-writer | L2 | 11-root-cause | 502 | PASS |
| 3.1-vagueness-calibrator | L3 | 11-root-cause | 516 | PASS |
| 3.2-suspense-pacing-optimizer | L3 | 10-story | 716 | PASS |
| 3.1-chunk-sequencer | L3 | 07-structure | 258 | OPTIMIZE |
| 4.1-four-element-completeness-validator | L4 | 09-lead | 324 | PASS |
| 4.3-anti-slop-validator | L4 | 09-lead | 444 | PASS |
| 4.5-final-story-assembler | L4 | 10-story | 895 | PASS |

**Extrapolation across 242 files:** ~180 PASS, ~50 OPTIMIZE, ~10 REWRITE, ~2 REBUILD

### Layer Health Summary

| Layer | Files | Sample Size | Est. PASS Rate | Key Strength | Key Gap |
|-------|-------|-------------|---------------|-------------|---------|
| **Layer 0** | 71 | 6 | ~28% | Composability | Passive quality gates, no error handling |
| **Layer 1** | 98 | 6 | ~0% | Scoring rigor | No chain-of-refinement, no exemplars |
| **Layer 2** | 98 | 3 | ~85% | Specimen-grounded writing | No lexicon ban lists, inconsistent failure mode tables |
| **Layer 3** | 79 | 3 | ~70% | Validation depth | Sequencing skills lack locked tool grammar |
| **Layer 4** | 65 | 3 | ~90% | Locked tool grammar, explicit decision logic | File length (assemblers > 800 lines) |

---

## Part 3: Systemic Issues (ranked by severity)

### SYSTEMIC ISSUE 1: Guardrail Coverage Below Threshold (ALL 18 orchestrators)
**Severity: CRITICAL**
**Affected:** Every AGENT.md file
**Finding:** No orchestrator achieves the 7/7 guardrail threshold. Maximum is 6/7 (domain 00 only). The three consistently missing patterns are:

| Guardrail | Present In | Missing From |
|-----------|-----------|-------------|
| Three-Tier Uncertainty | 00, 08 (2 files) | 16 others |
| Locked Tool Grammar | 00 (1 file) | 17 others |
| Post-Tool Reflection | 00 (1 file) | 17 others |

**Root cause:** These three guardrail patterns were only introduced in the latest architectural revision. Domain 00 was rewritten to v4.0; all other domains remain at earlier versions.

### SYSTEMIC ISSUE 2: Constraint Ratio Below Threshold (16/18 orchestrators)
**Severity: CRITICAL**
**Affected:** Every AGENT.md except 03-Mechanism and 11-15 (narrative execution domains)
**Finding:** System-wide average constraint ratio is 0.42 for orchestrators (threshold: 0.60). Only domains 03 and 11-15 pass. The worst offenders:

| Domain | Ratio | Gap to Threshold |
|--------|-------|-----------------|
| 17-editorial-review | 0.00 | -0.60 |
| 08-campaign-brief | 0.05 | -0.55 |
| 06-offer | 0.13 | -0.47 |
| 00-deep-research | 0.20 | -0.40 |

**Root cause:** Authors wrote procedurally (describing WHAT to do) rather than prescriptively (constraining HOW). Self-reported constraint ratios are inflated by 15-25% across the board — authors counted only the CONSTRAINTS section, not the full document instruction surface.

### SYSTEMIC ISSUE 3: No Session Persistence (17/18 orchestrators)
**Severity: HIGH**
**Affected:** Every AGENT.md except domain 00
**Finding:** Only the Deep Research orchestrator (domain 00) implements session persistence via context.yaml checkpointing. All other domains have no mechanism for resuming interrupted sessions, tracking completed steps, or maintaining state across tool calls.

### SYSTEMIC ISSUE 4: Chain-of-Refinement Absent from Layer 1 (universal)
**Severity: HIGH**
**Affected:** All ~98 Layer-1 skill files
**Finding:** Every Layer-1 skill operates as a single-pass pipeline: generate/classify → score → select. None implements a refinement loop (if output fails threshold → diagnose → adjust → re-execute). Weak first-pass outputs cascade errors through every downstream layer.

### SYSTEMIC ISSUE 5: Failure Mode Tables Absent (system-wide)
**Severity: HIGH**
**Affected:** ~85% of all skill files across all layers
**Finding:** Only 2 of 21 sampled files include formal failure mode tables with severity/detection/handling columns. All others handle errors inline or through anti-patterns, which is insufficient for production reliability.

### SYSTEMIC ISSUE 6: Skill-Number Cross-Reference Errors (domains 11-15)
**Severity: HIGH**
**Affected:** 13 specific cross-references across 5 AGENT.md files
**Finding:** Domains 11-15 reference upstream skill numbers that are off by one. This causes the orchestrator to route to the wrong skill. Example: Domain 13 references "Skill 11 output" when it should reference "Skill 12 output."

### SYSTEMIC ISSUE 7: Anti-Slop Enforcement is Structural, Not Lexical (universal)
**Severity: MEDIUM**
**Affected:** All skill files that produce text output
**Finding:** Anti-slop patterns catch structural errors (wrong classification, wrong type selection) but no file includes a locked lexicon ban list (explicit banned words/phrases). File `05-big-ideas/1.1-pattern-analyzer.md` bans "many, often, most, some, several, usually, typically, around, approximately" — this is the only lexical ban in the system and should be propagated everywhere.

---

## Part 4: File Cleanup Inventory

**Total files scanned:** 562 (543 .md, 14 .json, 3 .yaml, 1 .py, 1 .DS_Store)

### Definite Deletes (12 items)

| # | Item | Reason |
|---|------|--------|
| 1 | `09-lead/source-teachings/Copy of Week 14 - Leads + Open Loops.md` | Orphaned Google Drive copy |
| 2 | `10-story/source-teachings/Copy of Week 14 - Leads + Open Loops.md` | Byte-identical duplicate of #1 |
| 3 | `05-big-ideas/source-teachings/E5AA_-M2C_-Primary-Promise.md` | Byte-identical duplicate (keep in 04-promise) |
| 4 | `05-big-ideas/skills/BIG-IDEA-AGENT.md` | Superseded v2.0 (v3.1 exists at domain root) |
| 5 | `00-deep-research/projects/.DS_Store` | macOS system file |
| 6 | `00-deep-research/integrations/` (empty dir) | Abandoned empty directory |
| 7 | `00-deep-research/templates/` (empty dir) | Abandoned empty directory |
| 8-12 | `17-editorial-review/skills/layer-0/` through `layer-4/` | 5 empty layer directories (no skills exist) |

### Recommended Moves

| # | File | From | To | Reason |
|---|------|------|----|--------|
| 1 | `rebuild_product_introduction.py` | `13-product-introduction/vault-intelligence/` | `CopywritingEngine/scripts/` | Python script doesn't belong in vault-intelligence |

### Requires Human Review

| # | Item | Question |
|---|------|----------|
| 1 | `05-big-ideas/GenerativeEngine/` (2 files, 110 KB) | Legacy v1 engine — superseded by microskill architecture? |
| 2 | `05-big-ideas/ReferenceSkills/core-agent-operations.md` | Still referenced or superseded? |
| 3 | `05-big-ideas/skills/synthesis/` (5 files using L0-L4 naming) | Parallel system or legacy? |
| 4 | `03-mechanism/source-teachings/Mechanism-Scorecard.md` vs `Mechanism-Scorecard-Flo-Edition.md` | Both needed or one supersedes? |
| 5 | `00-deep-research/projects/home-title-lock/` (2.2 MB, 25 files) | Archive completed project data outside Skills tree? |
| 6 | Empty `references/` dirs in 01-proof-inventory, 04-promise, 06-offer | Will these be populated or abandoned? |

### Structural Notes (No Cleanup Needed)

- **Zero empty files** (0-byte) anywhere in the tree
- **All 14 vault-intelligence JSON files** are legitimate
- **Root-level .md files** (ARCHITECTURE-UPDATES.md, PERSONA-SYSTEM.md, SKILL-SEQUENCE.md) are substantive documentation
- **Empty `outputs/` directories** (12 total) are structural scaffolding — keep

---

## Part 5: Prescriptions

### PRESCRIPTION SET A: System-Wide (apply to ALL files)

#### A1: Three Missing Guardrail Patterns
**Add to all 18 AGENT.md files:**

**Three-Tier Uncertainty:**
```markdown
### Three-Tier Uncertainty Protocol
- HIGH CONFIDENCE (>90%): Proceed with execution
- MEDIUM CONFIDENCE (60-90%): Flag assumption, proceed with caveat in output
- LOW CONFIDENCE (<60%): HALT. Log uncertainty. Request human input before proceeding.
```

**Locked Tool Grammar:**
```markdown
### Locked Tool Grammar
All tool invocations MUST follow this exact pattern:
1. STATE the tool being called and WHY
2. EXECUTE the tool with explicit parameters
3. VALIDATE the response before proceeding
NEVER invoke a tool without stating its purpose first.
NEVER proceed past a failed tool call without logging the failure.
```

**Post-Tool Reflection:**
```markdown
### Post-Tool Reflection
AFTER EVERY SKILL EXECUTION, verify:
1. Output exists and is non-empty
2. Output schema matches expected contract
3. No quality gate violations in the output
4. State is updated to reflect completion
5. Next step is identified and logged
```

#### A2: Constraint Ratio Boost Protocol
**For each AGENT.md file below 0.60 ratio:**
1. Add MUST/NEVER/ONLY directives within each procedural section (not just the CONSTRAINTS block)
2. Convert passive quality gates (checkboxes) to active enforcement gates (IF fails → HALT/WARN)
3. Add "MUST NOT deviate from this schema" to every template/schema section
4. Target: minimum 15 additional constraint statements per file

#### A3: Session Persistence Template
**Add to all 17 AGENT.md files currently lacking it:**
```markdown
### Session Persistence
After each skill execution, update context state:
- current_step: [skill ID just completed]
- completed_steps: [append to list]
- output_status: [PASS/FAIL/PENDING]
- next_action: [next skill to execute]

On session resume, read context state and continue from last completed step.
NEVER re-execute a completed step unless explicitly instructed.
```

#### A4: Anti-Slop Lexicon Ban List
**Add to all skill files that produce text output:**
```markdown
### Anti-Slop Lexicon
NEVER use these words/phrases in generated output:
- Vague qualifiers: many, often, most, some, several, usually, typically, around, approximately
- AI telltales: revolutionary, game-changing, unlock, harness, leverage, dive deep, journey, empower
- Corporate filler: comprehensive, robust, innovative, cutting-edge, state-of-the-art, synergy
- Hedge words: might, could potentially, should consider, may want to, it would be, perhaps, arguably
```

#### A5: Failure Mode Table Template
**Add to all skill files currently lacking one:**
```markdown
### Failure Modes
| Mode | Severity | Detection | Handling |
|------|----------|-----------|----------|
| [upstream field missing] | HIGH | Input validation check | HALT with specific field name + remediation path |
| [all candidates below threshold] | MEDIUM | Score comparison | Trigger chain-of-refinement loop |
| [vault intelligence empty] | HIGH | Load status check | HALT with fallback instruction |
```

### PRESCRIPTION SET B: Layer-Specific

#### B1: Layer-0 — Active Quality Gates
Convert all passive checkbox quality gates to active enforcement:
```markdown
### Quality Gate Enforcement
IF quality_gate_N fails:
  LOG: "[Gate name] FAILED: [specific condition]"
  ACTION: HALT | WARN | DEGRADE
  REMEDIATION: [specific steps to fix]
```
Template from: `10-story/0.1-upstream-loader.md` (gold standard)

#### B2: Layer-1 — Chain-of-Refinement Template
Add to all 98 Layer-1 files:
```markdown
### Chain-of-Refinement Protocol
IF selected_output.score < threshold:
  1. DIAGNOSE: Identify which scoring dimension(s) failed
  2. ADJUST: Modify parameters based on diagnosis
  3. RE-EXECUTE: Generate new candidates with adjusted parameters
  4. RE-SCORE: Evaluate new candidates
  5. MAX_ITERATIONS: 3. If still below threshold after 3 iterations, escalate to AGENT.
```

#### B3: Layer-1 — Worked Exemplars
Add minimum 2 positive + 1 negative worked exemplar to all Layer-1 files showing the complete protocol executing end-to-end.

#### B4: Layer-3 — Locked Tool Grammar for Sequencing Skills
All Layer-3 sequencing/ordering/flow-type skills must convert natural language validation instructions to locked FOR/IF/SCAN procedural grammar. No "use judgment" or "read through and check" formulations.

### PRESCRIPTION SET C: Domain-Specific

#### C1: Domain 00 — Registry Reconciliation
- Update Micro-Skill Registry Layer 3 section to match v4.0 execution sequence
- Add Layer 2.5 section to registry (skills 2.5-A through 2.5-G)
- Update Version History table to include v4.0 changes

#### C2: Domains 11-15 — Cross-Reference Error Fixes
Fix all 13 skill-number cross-reference errors. Each AGENT.md must reference the correct upstream skill numbers.

#### C3: Domain 06 (Offer) — Major Optimization
Weakest AGENT.md in the system. Needs:
- Add 6 missing guardrail patterns (currently has only Identity Invariants)
- Raise specificity from 72% to ≥80% (add concrete schemas, scoring rubrics)
- Raise constraint ratio from 0.13 to ≥0.60 (add ~50 constraint statements)
- Add 2 missing production principles

#### C4: Domain 16 (Campaign Assembly) — Full Rewrite
File fails 5 thresholds: Four-Block (15), Constraint Ratio (0.43), Guardrails (3/7), Prod Principles (3/6), no state machine. Requires complete rewrite to match the standard established by domains 07-10.

#### C5: Domain 17 (Editorial Review) — Full Rebuild
File is an acknowledged placeholder (10/20 Four-Block, 0.00 constraint ratio, 35% specificity, 0/7 guardrails). Requires complete build from scratch using SKILL-TEMPLATE.md as the structural foundation.

---

## Part 6: Priority Implementation Order

### Phase 1 — Immediate (Highest Impact)
1. **Execute definite deletes** (12 items from cleanup inventory)
2. **Fix cross-reference errors** in domains 11-15 (13 fixes)
3. **Fix registry mismatch** in domain 00 (Layer 3 + Layer 2.5)
4. **Add Three-Tier Uncertainty, Locked Tool Grammar, Post-Tool Reflection** to all 18 AGENT.md files

### Phase 2 — High Priority
5. **Boost constraint ratios** across all 18 AGENT.md files
6. **Add session persistence** to 17 AGENT.md files
7. **Add anti-slop lexicon ban list** to all text-generating skill files
8. **Add failure mode tables** to all skill files lacking them

### Phase 3 — Structural Improvements
9. **Rewrite domain 06 (Offer) AGENT.md**
10. **Rewrite domain 16 (Campaign Assembly) AGENT.md**
11. **Rebuild domain 17 (Editorial Review) AGENT.md**
12. **Add chain-of-refinement** to all Layer-1 files
13. **Convert passive quality gates** to active enforcement in Layer-0 files

### Phase 4 — Polish
14. **Add worked exemplars** to all Layer-1 files
15. **Standardize section naming** across all files
16. **Add metadata headers** to all files
17. **Add version history** to all files
18. **Address human-review cleanup items** (6 items)

---

## Appendix A: Files Audited

### AGENT.md Orchestrators (18/18 — complete coverage)
All 18 AGENT.md files were audited in full.

### Representative Skill Files (21 files — sample-then-extrapolate)

**Layer 0 (6 of 71):**
- 09-lead/0.1-upstream-loader.md
- 09-lead/0.2-vault-intelligence-loader.md
- 09-lead/0.4-input-validator.md
- 10-story/0.1-upstream-loader.md
- 05-big-ideas/0.1-deep-research-loader.md
- 03-mechanism/0.2-vault-intelligence-loader.md

**Layer 1 (6 of 98):**
- 09-lead/1.1-lead-type-classifier.md
- 09-lead/1.2-hook-engineer.md
- 10-story/1.1-story-type-classifier.md
- 11-root-cause-narrative/1.1-communication-type-classifier.md
- 05-big-ideas/1.1-pattern-analyzer.md
- 07-structure/1.1-campaign-thesis-crystallizer.md

**Layer 2 (3 of 98):**
- 11-root-cause-narrative/2.1-problem-callout-builder.md
- 10-story/2.2-discovery-sequence-builder.md
- 11-root-cause-narrative/2.2-root-cause-revelation-writer.md

**Layer 3 (3 of 79):**
- 11-root-cause-narrative/3.1-vagueness-calibrator.md
- 10-story/3.2-suspense-pacing-optimizer.md
- 07-structure/3.1-chunk-sequencer.md

**Layer 4 (3 of 65):**
- 09-lead/4.1-four-element-completeness-validator.md
- 09-lead/4.3-anti-slop-validator.md
- 10-story/4.5-final-story-assembler.md

---

## Appendix B: Scoring Rubric Reference

All scores use the thresholds defined in QUALITY-STANDARDS.md:

| Dimension | Scale | Pass Threshold | Type Modifier |
|-----------|-------|---------------|---------------|
| Four-Block Compliance | 0-20 | ≥16 | All types |
| Constraint Ratio | 0.0-1.0 | ≥0.60 | Orchestrators |
| Specificity | 0-100% | ≥80% | All types |
| Guardrail Coverage | 0-7 | ≥6 (orchestrator), ≥3 (leaf) | By type |
| Production Principles | 0-6 | ≥5 | Orchestrators |
| Slop Density | per 100 lines | ≤2 | All types |
| Anti-Slop Compliance | 0-9 | ≥8 | Generation skills |
| Validation Presence | binary | Required | All types |

### Health Rating Mapping
- **PASS** = ≤1 dimension below threshold
- **OPTIMIZE** = 2-3 dimensions below threshold
- **REWRITE** = 4-5 dimensions below threshold
- **REBUILD** = 6+ dimensions below threshold
