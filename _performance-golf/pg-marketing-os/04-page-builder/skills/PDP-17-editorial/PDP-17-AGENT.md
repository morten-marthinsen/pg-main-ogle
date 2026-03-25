# PDP-17-AGENT.md

> **Version:** 1.0
> **Skill:** PDP-17-ecomm-editorial
> **Position:** Final skill in E-Commerce Copy Engine pipeline
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** LP-15-ecomm-assembly
> **Output:** `ecomm-copy-final.md`

---

## PURPOSE

Perform editorial review and revision of the assembled e-commerce copy. This is the quality gate before the page goes to the page builder. The editorial pass focuses on scan optimization, proof density, feature naming consistency, and design note actionability -- the ecom-specific quality criteria.

**Success Criteria:**
- Every section works when scanned in 3-5 seconds
- Every section has at least 1 specific proof element
- Feature names from PDP-02 used consistently across entire page
- Design notes actionable for page builder (not vague)
- Copy quality scored against ecom editorial criteria
- Final copy package ready for page builder handoff

This agent is a **workflow orchestrator**. It edits and refines -- it does not rewrite from scratch.

---

## IDENTITY

**This skill IS:**
- The scan-optimization auditor
- The proof density reviewer
- The editorial revision engine
- The design note completeness verifier
- The final quality scorer
- The feature consistency enforcer

**This skill is NOT:**
- A first-draft writer (that is PDP-03/PDP-07)
- A page builder (that is LP-00)
- A strategist (that is PDP-01)
- A feature namer (that is PDP-02)
- A complete rewrite engine (it edits, not replaces)

**Upstream:** Receives `ecomm-copy-assembled.md` from LP-15
**Downstream:** Feeds `ecomm-copy-final.md` to LP-00 (Page Builder)

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation |
| 0 | Loading assembled copy + specimens + strategy | haiku | Input loading |
| 1 | Scan optimization audit + proof density review | sonnet | Analytical judgment |
| 2 | Editorial revision + design note completeness | opus | Quality-focused revision |
| 2.5 | Arena (7 competitors x 2 rounds + audience evaluation) | opus | Maximum quality editorial |
| 4 | Quality scoring + feature consistency + packaging | sonnet | Final evaluation |

### Layer 2.5: Arena (MANDATORY FILE READS)

**BEFORE generating ANY Arena competitor output, READ these files:**

1. `04-page-builder/skills/PDP-17-editorial/ARENA-LAYER.md` — skill-specific criteria and weights
2. `~system/protocols/ARENA-CORE-PROTOCOL.md` — execution protocol
3. `~system/protocols/ARENA-PERSONA-PANEL.md` — persona specifications

**VERIFY personas match protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect**

**If personas don't match → HALT — FABRICATION DETECTED**

---

## STATE MACHINE

```
IDLE -> LOADING -> AUDITING -> REVISION -> ARENA -> SCORING -> COMPLETE
         |           |           |          |         |
         v           v           v          v         v
      [GATE_0]    [GATE_1]   [GATE_2]  [GATE_2.5] [GATE_4]
      PASS/FAIL   PASS/FAIL  PASS/FAIL HUMAN_SEL  PASS/FAIL
```

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load assembled ecom copy |
| 0.2 | `0.2-specimen-calibrator.md` | Load scan-optimization reference patterns |
| 0.3 | `0.3-strategy-loader.md` | Load strategy for constraint checking |

**Gate 0:** Assembled copy loaded, reference patterns loaded, strategy constraints available.

### Layer 1: Audit

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-scan-optimization-auditor.md` | Does every section work when scanned in 3-5s? |
| 1.2 | `1.2-proof-density-reviewer.md` | At least 1 proof element per section? |
| 1.3 | `1.3-feature-naming-consistency-auditor.md` | PDP-02 feature names used exactly? |
| 1.4 | `1.4-dr-principles-auditor.md` | DR principles adapted for PDP? |
| 1.5 | `1.5-design-copy-integration-auditor.md` | Design notes present and actionable? |
| 1.6 | `1.6-mobile-first-auditor.md` | Mobile viewport readability? |
| 1.7 | `1.7-brand-compliance-loader.md` | **CONDITIONAL** — workspace brand compliance |

**1.7 Brand Compliance (CONDITIONAL — Workspace-Loaded)**

```
IF workspace has brand guidelines directory:
  → LOAD brand copy restrictions from workspace brand guidelines
  → LOAD brand design compliance from workspace brand guidelines
  → ACTIVATE brand compliance gates (minimum 8.0/10 each)
  → Brand-specific checks loaded at runtime, not hardcoded

IF NO workspace brand guidelines:
  → SKIP brand compliance gates entirely
  → Editorial proceeds with 6 standard lenses only
```

When brand guidelines ARE loaded, verify:
- Copy restrictions per workspace `brand-copy-voice` file (forbidden claims, required disclaimers, naming rules)
- Design compliance per workspace `brand-design-system` file (colors, typography, logo usage, design principles)
- No fabricated claims: all product specs, stats, and credentials traceable to source

**Gate 1:** Scan audit complete, proof density reviewed, feature naming verified, DR principles checked, design-copy integration verified, mobile-first verified, brand compliance verified (if applicable).

### Layer 2: Revision

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-editorial-revision-generator.md` | Generate revised sections addressing issues |
| 2.2 | `2.2-design-note-completeness.md` | Ensure design notes actionable for page builder |

**Gate 2:** All flagged sections revised, design notes complete and actionable.

### Layer 2.5: Arena
**Specification File:** `PDP-17-ARENA-LAYER.md`
**Gate 2.5:** Human selects winning editorial revision package.

### Layer 4: Scoring & Packaging

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-quality-scorer.md` | Score against ecom editorial criteria |
| 4.2 | `4.2-feature-consistency-final.md` | Final feature naming consistency pass |
| 4.3 | `4.3-output-packager.md` | Package ecomm-copy-final.md |
| 4.4 | `4.4-ssr-prescreen-trigger.md` | SSR pre-screen validation (synthetic consumer panel) |
| 4.5 | `4.5-distinctiveness-pass.md` | Voice fingerprint, rhythm signature, anti-convergence |
| 4.6 | `4.6-brand-compliance-scorer.md` | **CONDITIONAL** — Brand compliance score (if brand loaded) |

**4.6 Brand Compliance Scorer (CONDITIONAL)** — Only runs if brand guidelines were loaded in Layer 0:
- `brand_copy_restrictions`: score 1-10 (minimum 8.0 to pass)
- `brand_design_compliance`: score 1-10 (minimum 8.0 to pass)
- If either brand gate fails, HALT and revise before packaging
- If no brand guidelines loaded, this microskill is SKIPPED

**Gate 4:** Quality score meets threshold, feature consistency confirmed, SSR pre-screen complete, distinctiveness verified, brand compliance verified (if applicable), final copy packaged.

---

## OUTPUT SCHEMA

```json
{
  "editorial_version": "1.0",
  "generated_at": "ISO timestamp",
  "skill_id": "PDP-17-ecomm-editorial",
  "quality_scores": {
    "scan_optimization": 9.0,
    "proof_density": 8.5,
    "feature_consistency": 10.0,
    "design_note_quality": 8.0,
    "word_budget_compliance": 9.5,
    "brand_copy_restrictions": 9.0,
    "brand_design_compliance": 9.0,
    "overall": 9.0
  },
  "revisions_made": 4,
  "sections_revised": [4, 9, 11, 14],
  "feature_consistency_status": "PASS",
  "output_file": "ecomm-copy-final.md"
}
```

---

## HUMAN CHECKPOINTS

### Required: Editorial Package Selection (Arena Gate 2.5)
**When:** After Arena editorial competition
**Presented:** 7+ editorial revision packages
**Decision Required:** Select winning revision set

---

## ERROR HANDLING

| Failure | Remediation |
|---------|-------------|
| Section fails scan optimization | Revise with shorter paragraphs, bolded key phrases, bullets |
| Section lacks proof | Add proof element (may require client input) |
| Feature name inconsistency | Correct to exact PDP-02 name |
| Design notes vague | Add specific layout, mobile, visual direction |
| Quality score below threshold | Additional revision pass |

---

## CONSTRAINTS

### Execution Constraints
1. **EDIT, not rewrite** -- Editorial revises existing copy, does not replace wholesale.
2. **Preserve structure** -- Section order and architecture from LP-15 is maintained.
3. **Feature names locked** -- PDP-02 names are final; editorial cannot rename features.
4. **Word budgets apply** -- Revisions must stay within section word budgets.

### Quality Constraints
5. **Scan optimization minimum: 7.0** per section.
6. **Proof density: 1+ proof per section** -- no exceptions.
7. **Design note completeness: 100%** -- every section has layout, mobile, visuals.
8. **Feature consistency: 100%** -- zero deviations from PDP-02 names.
9. **Brand copy restrictions minimum: 8.0** -- forbidden names, attribution rules, fabrication check.
10. **Brand design compliance minimum: 8.0** -- colors, typography, logos per PG-DESIGN-SYSTEM.md.

### Anti-Slop Constraints
9. **Same anti-slop lexicon as all EC skills** -- editorial removes any slop that survived.
10. **No AI telltales introduced during revision** -- edits must be cleaner, not AI-flavored.

---

## ANTI-SLOP LEXICON

**Banned:** unlock, harness, leverage, journey, empower, transform, revolutionary, game-changing, cutting-edge, next-level, dive deep, holistic, synergy, paradigm, elevate, curated, seamless, robust, comprehensive (without specific meaning)

---

## SESSION PERSISTENCE

```yaml
session_state:
  current_layer: [0-4]
  sections_audited: [count]
  sections_revised: [count]
  quality_score: [overall]
  gate_status: { gate_0-4: P/F }
  human_selection_received: [Y/N]
  next_action: [next skill]
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial build: 5-layer architecture with 11 microskills, Arena for editorial revision, scan optimization audit, proof density review, design note completeness, quality scoring, feature consistency final pass. |

---

**Skill Status:** COMPLETE
