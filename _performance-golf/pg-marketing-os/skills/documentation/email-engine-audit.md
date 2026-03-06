# Email Engine Skills Audit

**Date:** 2026-02-25
**Auditor:** Claude (NateJones Framework)
**Skills Audited:** E0-E4 (5 skills)
**Files Analyzed:** 10 (5 AGENT.md + 5 ANTI-DEGRADATION.md)

---

## Summary Scorecard

| Skill | Four-Block | Constraint Ratio | Guardrail Coverage | Failure Mode Exposure | Avg |
|-------|-----------|-----------------|-------------------|---------------------|-----|
| E0 Email Strategist | 8/10 | 4/10 | 10/10 | 7/10 | 7.3/10 |
| E1 Email Writer | 9/10 | 4/10 | 10/10 | 8/10 | 7.8/10 |
| E2 Subject Line Engine | 9/10 | 6/10 | 10/10 | 8/10 | 8.3/10 |
| E3 Sequence Assembler | 8/10 | 6/10 | 10/10 | 8/10 | 8.0/10 |
| E4 Email Editorial | 9/10 | 6/10 | 10/10 | 9/10 | 8.5/10 |
| **Engine Average** | **8.6** | **5.2** | **10.0** | **8.0** | **7.9** |

---

## Per-Skill Analysis

---

### E0 Email Strategist

**Files:**
- `skills/email/E0-email-strategist/EMAIL-STRATEGIST-AGENT.md` (458 lines)
- `skills/email/E0-email-strategist/EMAIL-STRATEGIST-ANTI-DEGRADATION.md` (305 lines)

#### Dimension 1: Four-Block Compliance (8/10)

| Block | Present? | Quality | Notes |
|-------|----------|---------|-------|
| Block 1: Context | YES | Strong | Clear IDENTITY (IS/IS NOT), upstream/downstream, two operating modes (A/B), model assignment table |
| Block 2: Task | YES | Strong | 4-layer architecture with clear gates, state machine diagram, execution order per layer, microskill tables |
| Block 3: Reference | PARTIAL | Weak | Teaching foundations section exists (Ben Settle, Sequence Architecture) but NO specimen files, NO anti-exemplar examples, NO template references beyond campaign type names |
| Block 4: Output | YES | Strong | Full YAML output schema (campaign_blueprint), clear file naming, downstream handoff schema, human checkpoint protocol |

**Gap:** Block 3 is the weakest. Campaign type templates are referenced (launch-sequence.md, affiliate-promotion.md, etc.) but there are no specimen campaign blueprints showing what a GOOD blueprint looks like vs a BAD one. The agent has no reference material to calibrate against.

#### Dimension 2: Constraint Ratio (4/10)

- Constraint lines (MUST/NEVER/REQUIRED/HALT/ALWAYS/MANDATORY/BLOCKING/CANNOT): 24
- Total lines: 458
- Ratio: 24/458 = 5.2%
- **Score: 4/10** (5-10% band = 6, but many constraints are in prose paragraphs not enforced structurally, so docked to 4)

**Issue:** Most constraints live in the dedicated CONSTRAINTS section (lines 398-417) with 13 numbered rules. But the Layer constraint reminders are repetitive boilerplate ("Read ANTI-DEGRADATION.md before executing") rather than skill-specific enforcement. The constraints section itself is well-structured but thin for an orchestrator skill.

#### Dimension 3: Guardrail Coverage (10/10)

| Guardrail | Present? | Points |
|-----------|----------|--------|
| Failure Mode Table | YES (5 modes, line 296+) | +3 |
| Forbidden Rationalizations | YES (6 rationalizations, Fix 3) | +2 |
| Binary Gate Enforcement | YES (Fix 7, explicit forbidden statuses) | +2 |
| Mandatory Read Protocol | YES (Fix 9, session startup) | +1 |
| Per-Microskill Output Tables | YES (12 microskills mapped, Fix post-9) | +2 |

**Total: 10/10** (capped)

**Note:** Anti-degradation file is comprehensive with 9 structural fixes plus per-microskill output table and implementation checklist.

#### Dimension 4: Failure Mode Exposure (7/10)

| Likely Failure Mode | Addressed? | How? |
|---------------------|-----------|------|
| Designs campaign without sufficient upstream context | YES | Fix 2 (minimum thresholds), Gate 0, Mode A requires 5/8 packages |
| Same body type assigned consecutively | YES | Fix 4 (variety rule enforcement with pseudocode), multiple HALT triggers |
| Skips human blueprint approval | YES | Fix 1 (BLUEPRINT_APPROVED.yaml checkpoint), Fix 5 MC-CHECK |
| Campaign type mismatched to goal | PARTIAL | Decision tree exists but no guardrail if agent picks wrong branch — relies on human gate |
| Thin emails due to insufficient asset mapping | PARTIAL | Fix 2 requires 5+ assets, but no validation that assets are SUBSTANTIVE (5 weak assets pass the threshold) |

**Score: 7/10** — Core failure modes addressed, but asset quality validation is missing (only quantity checked), and campaign type mismatch relies entirely on the human gate with no automated validation.

#### Remediation Recommendations (E0)
1. **P1:** Add specimen campaign blueprints (good vs bad examples) to Block 3 reference material
2. **P2:** Add asset quality validation — not just count, but minimum depth per asset (e.g., testimonials need name + specific result, not just "Customer liked it")
3. **P3:** Add campaign type validation logic — cross-check selected type against available content volume

---

### E1 Email Writer

**Files:**
- `skills/email/E1-email-writer/EMAIL-WRITER-AGENT.md` (445 lines)
- `skills/email/E1-email-writer/EMAIL-WRITER-ANTI-DEGRADATION.md` (489 lines)

#### Dimension 1: Four-Block Compliance (9/10)

| Block | Present? | Quality | Notes |
|-------|----------|---------|-------|
| Block 1: Context | YES | Strong | Clear IS/IS NOT, upstream/downstream, 7 body type modes fully specified, model assignment table |
| Block 2: Task | YES | Strong | Full layer architecture (0-3 + Arena 2.5 + Synthesizer 2.6), microskill tables per layer, execution order, gate criteria |
| Block 3: Reference | YES | Good | Specimen Loading Protocol (System 1 + System 2), body type to specimen directory mapping (7 directories), persona voice loading reference |
| Block 4: Output | YES | Strong | Per-email draft output, downstream handoff to E2/E3, 9-criterion quality rubric scoring, >= 7.5 threshold |

**Gap:** Block 3 is good but could be stronger — specimen loading is referenced but there are no inline examples of what a GOOD CT opening looks like vs a BAD one. The agent must navigate to 7 different specimen directories. No "quick reference" anti-exemplars.

#### Dimension 2: Constraint Ratio (4/10)

- Constraint lines: 24
- Total lines: 445
- Ratio: 24/445 = 5.4%
- **Score: 4/10** (5-10% band = 6, but the anti-slop constraints (lines 414-418) are lists of banned words rather than structural enforcement, docked to 4)

**Strength:** The anti-slop constraints (16-20) are specific and actionable — they name exact words that are banned. This is better than vague "write naturally." But they lack detection/enforcement mechanism in the agent file itself.

#### Dimension 3: Guardrail Coverage (10/10)

| Guardrail | Present? | Points |
|-----------|----------|--------|
| Failure Mode Table | YES (5 modes, line 482+) | +3 |
| Forbidden Rationalizations | YES (10 rationalizations, Fix 3) | +2 |
| Binary Gate Enforcement | YES (Fix 6, explicit forbidden statuses) | +2 |
| Mandatory Read Protocol | YES (Fix 8, session startup) | +1 |
| Per-Microskill Output Tables | YES (13 microskills mapped, Fix post-8) | +2 |

**Total: 10/10** (capped)

**Highlight:** E1's anti-degradation is the second longest at 489 lines. The 10 forbidden rationalizations are the most comprehensive across all 5 skills — each one addresses a specific temptation with specific required response.

#### Dimension 4: Failure Mode Exposure (8/10)

| Likely Failure Mode | Addressed? | How? |
|---------------------|-----------|------|
| Generates without loading specimens | YES | Fix 2 (specimen loading protocol), MC-CHECK specimen verification, HALT triggers |
| Content-to-pitch ratio violated | YES | Fix 2 (70-80/20-30 threshold), MC-CHECK ratio check, Layer 2 gate |
| Bridge/transition is clumsy or missing | YES | Fix 3 (rationalization: "bridge isn't needed"), MC-CHECK bridge quality check |
| Body type changed from blueprint | YES | Fix 3 (rationalization: "body type is close enough"), checkpoint body_type field |
| Voice contamination across emails | PARTIAL | Failure Mode Table mentions it but enforcement relies on Arena + Soul.md — no E1-specific voice drift detection |

**Score: 8/10** — Strong coverage of the most likely failures. Voice contamination is the gap — it is listed in the failure mode table but the detection mechanism is vague ("email voice inconsistent with Soul.md" — how is this detected automatically?).

#### Remediation Recommendations (E1)
1. **P2:** Add voice drift detection protocol — specific checks for persona voice consistency within the MC-CHECK (e.g., "compare register of opening vs CTA")
2. **P2:** Add inline anti-exemplar specimens (1 bad example per body type) to prevent generation without context
3. **P3:** Connect anti-slop word bans to a post-generation scan protocol

---

### E2 Subject Line Engine

**Files:**
- `skills/email/E2-subject-line-engine/SUBJECT-LINE-AGENT.md` (422 lines)
- `skills/email/E2-subject-line-engine/SUBJECT-LINE-ANTI-DEGRADATION.md` (520 lines)

#### Dimension 1: Four-Block Compliance (9/10)

| Block | Present? | Quality | Notes |
|-------|----------|---------|-------|
| Block 1: Context | YES | Strong | IS/IS NOT clear, CRITICAL CONSTRAINT about E1 dependency, dual operating modes (per-email / batch), model assignment table |
| Block 2: Task | YES | Strong | Full layer architecture (0-3 + Arena 2.5), microskill tables, execution order, SL-body alignment protocol with scoring rubric |
| Block 3: Reference | YES | Good | 18 formula categories with corpus percentages, sub-formula detail, formula specimen loading protocol with 18 directory mappings |
| Block 4: Output | YES | Strong | subject-line-package.yaml output, per-microskill output table (10 files), downstream handoff to E3/E4 |

**Gap:** The per-microskill output table is in the AGENT.md rather than only in anti-degradation, which is good (dual presence). However, no inline specimen SLs are shown — the agent must navigate to 18 specimen directories. A "quick reference" of 2-3 exemplar SLs per formula category would strengthen Block 3.

#### Dimension 2: Constraint Ratio (6/10)

- Constraint lines: 27
- Total lines: 422
- Ratio: 27/422 = 6.4%
- **Score: 6/10** (5-10% band)

**Strength:** E2 has the best constraint density among the 5 skills. The constraints section (lines 349-374) covers 19 numbered rules across 4 categories (Execution, Word Count, Formula, Anti-Slop). The anti-slop constraints (15-19) name specific banned patterns.

#### Dimension 3: Guardrail Coverage (10/10)

| Guardrail | Present? | Points |
|-----------|----------|--------|
| Failure Mode Table | YES (5 modes, line 512+) | +3 |
| Forbidden Rationalizations | YES (10 rationalizations, Fix 4) | +2 |
| Binary Gate Enforcement | YES (Fix 8, explicit forbidden statuses) | +2 |
| Mandatory Read Protocol | YES (Fix 10, session startup with E1 verification) | +1 |
| Per-Microskill Output Tables | YES (10 microskills mapped, in AGENT.md) | +2 |

**Total: 10/10** (capped)

**Highlight:** E2's anti-degradation is the longest at 520 lines with 11 structural fixes — the most of any email skill. Fix 2 (email body dependency) is a domain-specific guardrail that prevents the most critical E2 failure (generating SLs before email body exists). Fix 5 (batch mode diversity) addresses a batch-specific failure mode. Fix 11 (Arena enforcement) is a standalone section dedicated to preventing Arena skipping.

#### Dimension 4: Failure Mode Exposure (8/10)

| Likely Failure Mode | Addressed? | How? |
|---------------------|-----------|------|
| SLs written before email body exists | YES | Fix 2 (email body dependency), checkpoint file requirement, MC-CHECK dependency verification |
| SL-body misalignment (SL promises something email doesn't deliver) | YES | SL-BODY ALIGNMENT PROTOCOL with scoring rubric (1-10), 7.0 minimum, Fix 3 threshold enforcement |
| Same formula category repeatedly used | YES | Fix 5 (batch mode diversity), constraint 14 (same category max 2 consecutive) |
| Too few candidates generated | YES | Fix 3 (minimum 20 candidates), MC-CHECK generation verification |
| Clickbait/AI telltale language in SLs | PARTIAL | Constraint 15-18 bans specific phrases, but no automated scan protocol post-generation to catch them |

**Score: 8/10** — Strong coverage. The SL-body alignment protocol is the standout — it is a fully specified scoring rubric with minimum thresholds. The gap is clickbait detection: banned words are listed but there is no structural enforcement mechanism (no post-generation scan, no MC-CHECK field for clickbait).

#### Remediation Recommendations (E2)
1. **P2:** Add post-generation clickbait/AI-telltale scan to MC-CHECK — automated word-list check against all candidates
2. **P3:** Add inline specimen SLs (2-3 per top formula category) as quick-reference calibration
3. **P3:** Add a "SL-body alignment verification" step to the implementation checklist for Layer 3

---

### E3 Email Sequence Assembler

**Files:**
- `skills/email/E3-email-sequence-assembler/SEQUENCE-ASSEMBLER-AGENT.md` (439 lines)
- `skills/email/E3-email-sequence-assembler/SEQUENCE-ASSEMBLER-ANTI-DEGRADATION.md` (404 lines)

#### Dimension 1: Four-Block Compliance (8/10)

| Block | Present? | Quality | Notes |
|-------|----------|---------|-------|
| Block 1: Context | YES | Strong | Clear IS/IS NOT, model assignment with rationale ("Opus NOT needed"), no Arena (assembly not generation), upstream/downstream clear |
| Block 2: Task | YES | Strong | 4-layer architecture, microskill tables, timing templates for 7 campaign types, P.S. strategy rules, connector rules with examples |
| Block 3: Reference | PARTIAL | Moderate | Connector examples (good vs bad) exist, P.S. content type examples exist, but no full specimen assembled sequences to calibrate against |
| Block 4: Output | YES | Strong | Full assembled_sequence YAML schema, campaign-level quality criteria (C1-C5), SEQUENCE-SUMMARY.md specification |

**Gap:** Block 3 has partial reference material — the connector good/bad examples (Fix 7) are the strongest reference material. But there are no specimen assembled sequences showing a complete example of a properly assembled 5-email or 10-email sequence. The agent must infer what "good assembly" looks like from rules alone.

#### Dimension 2: Constraint Ratio (6/10)

- Constraint lines: 28
- Total lines: 439
- Ratio: 28/439 = 6.4%
- **Score: 6/10** (5-10% band)

**Strength:** E3 has the highest raw constraint line count (28) and ties with E2 for best ratio. The NEVER constraints are particularly strong — 10 NEVER instances, mostly in the constraints section (lines 394-413). The constraints are well-differentiated across 3 categories (Execution, Assembly, Validation).

#### Dimension 3: Guardrail Coverage (10/10)

| Guardrail | Present? | Points |
|-----------|----------|--------|
| Failure Mode Table | YES (5 modes, line 395+) | +3 |
| Forbidden Rationalizations | YES (8 rationalizations, Fix 3) | +2 |
| Binary Gate Enforcement | YES (Fix 10, explicit forbidden statuses) | +2 |
| Mandatory Read Protocol | YES (Fix 12, session startup) | +1 |
| Per-Microskill Output Tables | YES (11 microskills mapped) | +2 |

**Total: 10/10** (capped)

**Highlight:** E3's anti-degradation has 12 structural fixes — second most after E4. Fix 4 (body text modification prohibition) is a standout domain-specific guardrail with pseudocode verification method. Fix 7 (connector accuracy enforcement) includes explicit good/bad examples — a pattern other skills should adopt.

#### Dimension 4: Failure Mode Exposure (8/10)

| Likely Failure Mode | Addressed? | How? |
|---------------------|-----------|------|
| Modifies email body text during assembly | YES | Fix 4 (body text protection with pseudocode diff), MC-CHECK body_text_unmodified field, multiple HALT triggers |
| Assembles with missing emails or SLs | YES | Fix 5 (complete loading before assembly), Gate 0 count validation |
| Vague cross-email connectors | YES | Fix 7 (connector accuracy with good/bad examples), MC-CHECK connectors_reference_actual_content |
| P.S. overuse (>60%) | YES | Fix 6 (P.S. frequency enforcement with calculation), priority removal order |
| Silently reassigns body types on variety violation | YES | Fix 3 (rationalization: "variety violation is minor, I can swap"), HALT + flag pattern |

**Score: 8/10** — Extremely strong for an assembly skill. The body text protection (Fix 4) with its verification pseudocode is best-in-class enforcement. Minor gap: no guardrail for connector OVERUSE — only underuse is checked (minimum 2 for 5+ email sequences). Excessive connectors could create repetitive "remember yesterday" fatigue.

#### Remediation Recommendations (E3)
1. **P2:** Add specimen assembled sequences (1 good 5-email example) as reference
2. **P3:** Add connector frequency cap — maximum connectors per sequence to prevent "callback fatigue"
3. **P3:** Add validation that assembled YAML email text matches E1 output exactly (automated diff beyond pseudocode)

---

### E4 Email Editorial

**Files:**
- `skills/email/E4-email-editorial/EMAIL-EDITORIAL-AGENT.md` (409 lines)
- `skills/email/E4-email-editorial/EMAIL-EDITORIAL-ANTI-DEGRADATION.md` (472 lines)

#### Dimension 1: Four-Block Compliance (9/10)

| Block | Present? | Quality | Notes |
|-------|----------|---------|-------|
| Block 1: Context | YES | Strong | Clear IS/IS NOT, severity classification system (P1-P4) with detailed tables, Arena integration rules, model assignment (all opus), teaching foundations |
| Block 2: Task | YES | Strong | 4-layer architecture, 10 microskills, Arena scope rules for clustering, execution order, clear gates with HUMAN_REVIEW blocking gate |
| Block 3: Reference | YES | Good | P1-P4 severity tables with specific examples, campaign criteria C1-C5 with pass conditions, Arena critic criteria (7 email-specific), teaching foundations referencing Skill 20 |
| Block 4: Output | YES | Excellent | Full revised_sequence YAML schema with baseline/final comparison, EDITORIAL-REPORT.md specification (6 sections), per-email revision tracking |

**Gap:** Block 3 is good but missing anti-exemplars — what does a BAD editorial revision look like? (e.g., a fix that improves one dimension but breaks another). The teaching foundations section references this principle but does not provide concrete examples.

#### Dimension 2: Constraint Ratio (6/10)

- Constraint lines: 25
- Total lines: 409
- Ratio: 25/409 = 6.1%
- **Score: 6/10** (5-10% band)

**Note:** E4 has the shortest AGENT.md (409 lines) but the constraint density is competitive. The constraints section (lines 346-365) has 13 numbered rules across 3 categories. The CANNOT instances (5) are higher than other skills, reflecting E4's role as final gatekeeper.

#### Dimension 3: Guardrail Coverage (10/10)

| Guardrail | Present? | Points |
|-----------|----------|--------|
| Failure Mode Table | YES (5 modes, line 463+) | +3 |
| Forbidden Rationalizations | YES (10 rationalizations, Fix 13) | +2 |
| Binary Gate Enforcement | YES (Fix 11, explicit forbidden statuses) | +2 |
| Mandatory Read Protocol | YES (Fix 9, session startup with rubric read) | +1 |
| Per-Microskill Output Tables | YES (10 microskills mapped) | +2 |

**Total: 10/10** (capped)

**Highlight:** E4's anti-degradation is the most comprehensive by fix count (13 structural fixes). Fixes 2-8 are domain-specific to editorial: baseline-before-revision (Fix 2), Arena mandatory for P1/P2 (Fix 3), mandatory rescoring (Fix 4), 7.5 minimum threshold (Fix 5), campaign criteria verification (Fix 6), SL-body alignment for every email (Fix 7), voice consistency across sequence (Fix 8). This is the highest quality anti-degradation file in the email engine.

#### Dimension 4: Failure Mode Exposure (9/10)

| Likely Failure Mode | Addressed? | How? |
|---------------------|-----------|------|
| Revises without baseline scores | YES | Fix 2 (hard rule, baseline MUST exist before any revision), MC-CHECK baseline verification |
| Uses direct fix for P1/P2 severity issues | YES | Fix 3 (Arena mandatory, FORBIDDEN list, severity downgrade detection), MC-CHECK revision verification |
| Declares 7.4 "close enough" to 7.5 | YES | Fix 5 (explicit forbidden rationalizations including "rounding up from 7.45"), MC-CHECK all_above_7_5 field |
| Checks voice within email but not across sequence | YES | Fix 8 (two mandatory checks: within-email AND across-sequence), MC-CHECK voice_consistency_complete |
| Score regression after revision | YES | Failure Mode Table includes "post-revision score lower than baseline" with "HALT, revert and try different approach" |

**Score: 9/10** — The most comprehensive failure mode coverage across all 5 skills. Every major editorial failure mode has a dedicated structural fix with enforcement. The only gap is a missing guardrail for EDITORIAL SCOPE CREEP — the editorial should refine, not restructure, but there is no enforcement mechanism to detect when revisions have effectively rewritten an email rather than improved it (e.g., if 60%+ of the text changes, that is no longer editorial).

#### Remediation Recommendations (E4)
1. **P2:** Add editorial scope creep detection — if revision changes >40% of email text, flag as potential scope violation (this is rewriting, not editing)
2. **P3:** Add anti-exemplar revision examples — "this fix improved X but broke Y" specimens
3. **P3:** Add severity calibration specimens — what a P1 issue LOOKS LIKE vs a P3 issue, with actual email snippets

---

## Critical Gaps (All Skills)

### Gap 1: Specimen Reference Material is Thin Across the Board
Every AGENT.md references specimen directories and loading protocols, but NONE include inline quick-reference specimens. The agent must navigate to external files, which introduces a failure mode: the agent reads the AGENT.md, understands the RULES, but has never SEEN an example of what good output looks like. This is the "rules without calibration" problem.

**Severity: HIGH**
**Affected Skills:** All 5 (E0-E4)
**Pattern:** Block 3 (Reference) is the weakest block across every skill

### Gap 2: Anti-Slop Enforcement Has No Detection Mechanism
E1 and E2 both list banned words (AI telltales, clickbait, vague qualifiers). These are good constraints. But neither skill has a POST-GENERATION automated scan to catch violations. The banned word lists exist as instructions (which can be forgotten), not as structural enforcement (which cannot be bypassed).

**Severity: MEDIUM**
**Affected Skills:** E1, E2
**Pattern:** Constraints exist as prose rules, not as MC-CHECK verification fields

### Gap 3: Constraint Ratios are Below Target Across the Board
No skill exceeds 6.4% constraint density. The 10-15% range (score 8) is not reached by any skill. This does not mean the skills lack constraints — the anti-degradation files are carrying most of the enforcement load. But the AGENT.md files themselves, which are the primary execution documents, could be tighter.

**Severity: LOW-MEDIUM**
**Affected Skills:** All 5, but E0 and E1 are lowest (5.2%, 5.4%)
**Pattern:** Constraints concentrated in dedicated CONSTRAINTS section rather than embedded in layer descriptions

### Gap 4: No Cross-Skill Dependency Validation
E1 depends on E0. E2 depends on E1. E3 depends on E0+E1+E2. E4 depends on E3. But the dependency validation is one-directional — each skill checks that its input exists, but there is no mechanism for a downstream skill to validate that the upstream output is SCHEMA-COMPLIANT, not just present. E3 could load a malformed campaign-blueprint.yaml from E0 and not detect the issue until Layer 1 or later.

**Severity: MEDIUM**
**Affected Skills:** E1, E2, E3, E4 (all downstream skills)
**Pattern:** Existence check without schema validation at Gate 0

### Gap 5: Guardrail Coverage is Perfect (10/10) But Potentially Inflated
Every skill scores 10/10 on guardrail coverage because every skill has all 5 guardrail components. This is excellent structural consistency but masks quality differences. E4's 13 fixes are materially stronger than E0's 9 fixes, but both score 10/10. The scoring rubric should potentially weight quality/depth of guardrails, not just presence.

**Severity: META (audit methodology)**
**Note:** Documented for transparency, not a skill deficiency

---

## Remediation Priority

### Tier 1: Do Now (High Impact, Addresses Systemic Gaps)

| # | Action | Skills | Gap Addressed |
|---|--------|--------|---------------|
| 1 | Add inline quick-reference specimens to each AGENT.md Block 3 (2-3 good examples + 1 bad example per key output type) | All 5 | Gap 1: Rules without calibration |
| 2 | Add post-generation anti-slop scan to E1/E2 MC-CHECK (automated word-list check field) | E1, E2 | Gap 2: No detection mechanism |
| 3 | Add schema validation at Gate 0 for all downstream skills (validate upstream YAML structure, not just file existence) | E1, E2, E3, E4 | Gap 4: Cross-skill dependency |

### Tier 2: Do Soon (Medium Impact, Skill-Specific)

| # | Action | Skills | Gap Addressed |
|---|--------|--------|---------------|
| 4 | Add editorial scope creep detection to E4 (>40% text change = flag) | E4 | E4-specific: rewriting vs editing |
| 5 | Add asset quality validation to E0 (not just count, but depth per asset) | E0 | E0-specific: thin content plans |
| 6 | Add voice drift detection protocol to E1 MC-CHECK | E1 | E1-specific: voice contamination |
| 7 | Add connector frequency cap to E3 (prevent callback fatigue) | E3 | E3-specific: connector overuse |

### Tier 3: Do When Convenient (Low Impact, Polish)

| # | Action | Skills | Gap Addressed |
|---|--------|--------|---------------|
| 8 | Embed constraints in layer descriptions (not just CONSTRAINTS section) to improve constraint ratio | E0, E1 | Gap 3: Low constraint density |
| 9 | Add severity calibration specimens to E4 (what P1 vs P3 LOOKS LIKE) | E4 | E4-specific: severity accuracy |
| 10 | Add specimen assembled sequence to E3 | E3 | Gap 1: Reference material |

---

## Methodology Notes

### Dimension 1: Four-Block Compliance
Evaluated presence and quality of each block. A block is "present" if it has a dedicated section with substantive content. "Partial" means the block exists but is thin or references external files without inline substance. Score: 10 = all 4 blocks strong, 8 = 3 strong + 1 partial, 5 = 2 blocks, 1 = unstructured.

### Dimension 2: Constraint Ratio
Counted lines containing constraint keywords (MUST, NEVER, REQUIRED, FORBIDDEN, HALT, CANNOT, ALWAYS, MANDATORY, BLOCKING, NON-NEGOTIABLE, BANNED) via automated grep. Ratio = constraint lines / total lines. Score bands: >15% = 10, 10-15% = 8, 5-10% = 6, 2-5% = 4, <2% = 2. Manual adjustment applied when constraints were prose-style (weaker enforcement) vs structural (stronger enforcement).

### Dimension 3: Guardrail Coverage
Binary checklist scoring. Each component contributes fixed points. Sum capped at 10. This means skills with all 5 components all score 10 — a known limitation documented in Gap 5.

### Dimension 4: Failure Mode Exposure
Identified 5 most likely failure modes per skill type based on domain knowledge (email marketing, AI generation patterns, assembly operations, editorial workflows). Checked whether ANTI-DEGRADATION.md addresses each with a structural fix, not just a prose instruction. Score: all 5 addressed = 10, 4 addressed = 8, 3 addressed = 6, 2 addressed = 4, 1 or fewer = 2.

---

## Final Assessment

The Email Engine (E0-E4) is architecturally sound. Every skill has a well-structured AGENT.md with clear layer architecture, every skill has a comprehensive ANTI-DEGRADATION.md with structural fixes, and the systemic patterns from the main CopywritingEngine (binary gates, per-microskill output, forbidden rationalizations, mandatory read protocol) have been consistently propagated.

**Strongest skill:** E4 Email Editorial (8.5 avg) — the most comprehensive failure mode coverage and the highest quality anti-degradation file.

**Weakest skill:** E0 Email Strategist (7.3 avg) — thin reference material and lowest constraint density. As the orchestrator that designs the campaign blueprint, E0's quality ceiling constrains every downstream skill.

**Systemic weakness:** Specimen reference material (Block 3) is the weakest block across all 5 skills. The engine has excellent RULES but limited CALIBRATION EXAMPLES. This mirrors the broader CopywritingEngine finding from the creativity-precision analysis: "The next unit of progress comes from data, not process."

**Overall engine score: 7.9/10** — Strong structural enforcement, consistent architecture, with specimen/reference gaps as the primary improvement opportunity.
