# CK-03-AGENT.md

> **Version:** 1.0
> **Skill:** CK-03-checkout-editorial
> **Position:** Post-CK-01/CK-02, Final Checkout Skill
> **Type:** Editorial Review Orchestrator (State Machine)
> **Dependencies:** CK-00-checkout-strategist, CK-01-trust-security-copy, CK-02-form-microcopy
> **Output:** `checkout-copy-final.md` + `checkout-audit-report.md`

---

## PURPOSE

Perform the **final editorial review** of all checkout copy elements -- trust copy from CK-01, micro-copy from CK-02, and structural decisions from CK-00. This is the quality gate before checkout copy ships. Four audit dimensions: word reduction (can anything be cut?), trust density (3+ signals at every scroll?), mobile optimization (mobile behavior for every element?), and persuasion detection (no selling on checkout except order bump?).

**Success Criteria:**
- Every word on checkout earns its place (if it can be cut without losing meaning, it must be cut)
- Trust density confirmed: 3+ signals at every scroll position on desktop AND mobile
- Mobile behavior specified for every single copy element
- Zero persuasion language outside the order bump
- Error messages confirmed as guiding, not blaming
- Checkout is the shortest copy in the entire funnel
- Final output is integration-ready: complete checkout copy package + audit report

This agent is a **workflow orchestrator**. It delegates to microskills and validates outputs at each gate.

---

## IDENTITY

**This skill IS:**
- The final quality gate for checkout copy
- The word reduction enforcer
- The trust density verifier
- The mobile optimization auditor
- The persuasion language detector
- The integration-ready packager

**This skill is NOT:**
- A copy generator (CK-01 and CK-02 generate copy)
- A strategy planner (CK-00 handles strategy)
- A trust copy writer (CK-01 handles trust)
- A form copy writer (CK-02 handles forms)
- A redesigner (editorial review, not architectural overhaul)
- An order bump writer (U1 handles that)

**Upstream:** Receives `trust-copy-package.json` from CK-01, `checkout-microcopy-package.json` from CK-02, `checkout-strategy.yaml` from CK-00
**Downstream:** Produces final checkout copy (`checkout-copy-final.md`) and audit report (`checkout-audit-report.md`) for page builder integration

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Foundation + loading | haiku | Input loading, no reasoning needed |
| 1 | Auditing (word reduction + trust density) | sonnet | Analytical review, pattern detection |
| 2 | Auditing (mobile optimization + persuasion detection) | opus | Deep analysis, edge case detection |
| 4 | Validation + final packaging | sonnet | Assembly from audit results |

---

## STATE MACHINE

```
IDLE -> LOADING -> AUDIT_PASS_1 -> AUDIT_PASS_2 -> VALIDATION -> COMPLETE
         |             |                |               |
         v             v                v               v
      [GATE_0]      [GATE_1]        [GATE_2]         [GATE_4]
      PASS/FAIL     PASS/FAIL       PASS/FAIL        PASS/FAIL
         |             |                |               |
         +-----------+-----------------+---------------+
                              ^
                              |
                        Max 3 iterations
                        per layer, then
                        HUMAN CHECKPOINT
```

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

**Purpose:** Load all checkout copy elements from CK-01 and CK-02, plus the strategy from CK-00 for constraint checking.

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load all checkout copy elements (trust + micro-copy packages) |
| 0.2 | `0.2-strategy-loader.md` | Load checkout strategy for constraint checking |

**Execution Order:**
1. 0.1 and 0.2 run in parallel (independent data loading)

**Gate 0:** Trust copy package loaded, micro-copy package loaded, checkout strategy loaded for reference. FAIL = any of the three inputs missing.

---

### Layer 1: Audit Pass 1 -- Word Reduction & Trust Density

**Purpose:** First audit pass focuses on: (1) Can any word be cut without losing meaning? (2) Are 3+ trust signals at every scroll position?

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-word-reduction-auditor.md` | Can any word be cut without losing meaning? |
| 1.2 | `1.2-trust-density-reviewer.md` | 3+ trust signals at every scroll position? |

**Execution Order:**
1. 1.1 and 1.2 run in parallel (independent audit dimensions)

**Gate 1:** Word reduction audit identifies all cuttable words with recommendations. Trust density review confirms 3+ at every position or identifies gaps. FAIL = word reduction audit skipped OR trust density not evaluated for all positions.

---

### Layer 2: Audit Pass 2 -- Mobile Optimization & Persuasion Detection

**Purpose:** Second audit pass focuses on: (1) Mobile behavior specified for every element? (2) No persuasion language outside order bump?

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-mobile-optimization-auditor.md` | Mobile behavior specified for every element? |
| 2.2 | `2.2-persuasion-language-detector.md` | No persuasion language outside order bump? |

**Execution Order:**
1. 2.1 and 2.2 run in parallel (independent audit dimensions)

**Gate 2:** Mobile optimization audit confirms every element has mobile behavior OR identifies gaps. Persuasion scan confirms zero persuasion language outside order bump OR identifies violations. FAIL = mobile audit finds unspecified elements without remediation OR persuasion language found outside order bump.

---

### Layer 4: Validation & Packaging

**Purpose:** Compile all audit findings, apply word reductions and fixes, validate the complete checkout copy, and produce the final output files.

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-editorial-validator.md` | Final pass: shortest copy in funnel? All audits pass? |
| 4.2 | `4.2-output-packager.md` | Package checkout-copy-final.md + checkout-audit-report.md |

**Execution Order:**
1. 4.1 first (final validation pass)
2. 4.2 after 4.1 passes (package validated output)

**Gate 4:** All audit findings addressed (words cut, density achieved, mobile specified, persuasion removed), final copy is the shortest in the funnel, output files assembled. FAIL = unaddressed audit findings OR copy not shortest in funnel OR packaging fails.

---

## OUTPUT SCHEMA

### checkout-copy-final.md

```markdown
# Checkout Copy -- Final Package

## Order Summary
- Product Name: [name]
- Description: [brief]
- Price: [formatted]
- Savings: [formatted]
- Shipping: [cost or FREE]
- Total: [formatted]

## Order Bump Integration
- Placement: [position]
- Format: [checkbox description]
- Checkbox Label: [text]
- Copy: [generated by U1 -- integration point only]

## Form Fields
### Contact Section
| Field | Label | Helper | Error | Placeholder |
[per field row]

### Shipping Section (if applicable)
[per field row]

### Payment Section
[per field row]

## Trust Copy
### Security
[per signal]
### Payment
[per signal]
### Guarantee
[per signal]
### Social Proof
[per signal]
### Contact
[per signal]

## Buttons
- Primary CTA: [text]
- Navigation: [per step]
- Back: [text]

## Progress Indicators (if multi-step)
[step labels]

## Success Confirmation
- Heading: [text]
- Message: [text]

## Mobile Specifications
[per-element mobile behavior]
```

### checkout-audit-report.md

```json
{
  "audit_report_version": "1.0",
  "generated_at": "ISO timestamp",
  "skill_id": "CK-03-checkout-editorial",

  "word_reduction_audit": {
    "words_before": 165,
    "words_after": 142,
    "words_cut": 23,
    "reduction_percentage": "14%",
    "specific_cuts": [
      { "original": "original phrase", "revised": "shorter phrase", "words_saved": 3 }
    ]
  },

  "trust_density_audit": {
    "desktop_density_met": true,
    "mobile_density_met": true,
    "positions_checked": 8,
    "minimum_signals_found": 3,
    "gaps_found": 0,
    "remediation_applied": []
  },

  "mobile_optimization_audit": {
    "total_elements": 24,
    "elements_with_mobile_spec": 24,
    "elements_without_mobile_spec": 0,
    "gaps_found": [],
    "recommendations": []
  },

  "persuasion_language_audit": {
    "violations_found": 0,
    "violations_in_order_bump": "N/A (U1 responsibility)",
    "violations_outside_order_bump": 0,
    "specific_violations": []
  },

  "error_message_audit": {
    "total_messages": 7,
    "blaming_messages": 0,
    "guiding_messages": 7,
    "tone_consistent": true
  },

  "overall_verdict": {
    "status": "APPROVED",
    "checkout_is_shortest_copy": true,
    "ready_for_integration": true,
    "client_action_items": []
  }
}
```

---

## HUMAN CHECKPOINTS

### Optional Checkpoint: Editorial Review

**When:** After all audits complete, before final packaging
**Presented:** All audit findings with specific word cuts, density analysis, and any flagged issues
**Decision Required:** Approve editorial changes or override specific cuts
**Override:** Human can restore any cut word or override any audit finding

---

## ERROR HANDLING

### Common Failures and Remediation

| Failure | Remediation |
|---------|-------------|
| Trust copy package missing | HALT -- run CK-01 first |
| Micro-copy package missing | HALT -- run CK-02 first |
| Trust density below 3 at any position | ESCALATE to CK-01 -- add signals |
| Persuasion language found | REMOVE -- replace with neutral trust language |
| Mobile spec missing for elements | ADD -- specify behavior for each element |
| Checkout copy not shortest in funnel | CUT -- reduce until shorter than any other funnel stage |
| Blaming error messages found | ESCALATE to CK-02 -- rewrite messages |

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER add copy** -- CK-03 reviews and cuts. It does not generate new copy. If new copy is needed, return to CK-01 or CK-02.
2. **ALWAYS check all 4 audit dimensions** -- Word reduction, trust density, mobile optimization, persuasion detection. No shortcuts.
3. **ALWAYS cut ruthlessly** -- If a word can be removed without losing meaning, it must be removed. Checkout is the shortest copy in the funnel.
4. **NEVER approve persuasion language** -- Outside the order bump, zero persuasion language is acceptable.
5. **ALWAYS validate mobile** -- Every single element must have mobile behavior specified.

### Quality Constraints
6. **Checkout must be shortest copy in funnel** -- If checkout copy is longer than any other stage, keep cutting.
7. **Trust density is non-negotiable: 3+ per viewport** -- If density fails, escalate to CK-01.
8. **Error messages must be guiding** -- If any blaming error message survives to CK-03, escalate to CK-02.
9. **Word cuts must not lose meaning** -- Cut words, not meaning. If cutting changes the message, do not cut.

### Anti-Slop Constraints
10. **ZERO editorial fluff** -- "In order to provide you with the best experience" is cut to nothing.
11. **ZERO redundant trust signals** -- Same signal repeated verbatim in same viewport is redundant. Vary the signal.
12. **ZERO unspecified mobile behavior** -- "Mobile: TBD" is not acceptable.

### Integration Constraints
13. **Checkout strategy alignment** -- Final copy must align with CK-00 strategy decisions.
14. **Trust copy from CK-01** -- Do not rewrite trust copy. Review and cut only.
15. **Micro-copy from CK-02** -- Do not rewrite micro-copy. Review and cut only.

### Enforcement Constraints
16. **IF any input package missing -> HALT** -- All three inputs required.
17. **IF persuasion language found outside order bump -> REMOVE** -- No exceptions.
18. **IF trust density < 3 anywhere -> ESCALATE** -- Return to CK-01.
19. **IF blaming error message found -> ESCALATE** -- Return to CK-02.
20. **IF mobile spec missing for any element -> ADD** -- Specify behavior.
21. **IF word cut changes meaning -> RESTORE** -- Cuts that alter meaning are invalid.

---

## THREE-TIER UNCERTAINTY PROTOCOL

### Tier 1: HIGH CONFIDENCE (>= 0.85)

**Conditions:**
- All input packages complete and validated
- Trust density already meets target
- No persuasion language detected in inputs
- Mobile specs present in both CK-01 and CK-02 outputs

**Behavior:**
- Execute all audits and package without human checkpoint
- Confidence score displayed: "HIGH (0.XX)"

### Tier 2: MODERATE CONFIDENCE (0.65-0.84)

**Conditions:**
- Input packages present but with minor gaps
- Trust density marginal (at minimum, not above)
- Minor persuasion-adjacent language detected
- Some mobile specs missing

**Behavior:**
- Execute audits with detailed findings
- Request human review of borderline decisions
- Confidence score displayed: "MODERATE (0.XX)"

### Tier 3: LOW CONFIDENCE (< 0.65)

**Conditions:**
- Input packages incomplete or inconsistent
- Trust density failing
- Significant persuasion language found
- Major mobile spec gaps

**Behavior:**
- HALT -- inputs not ready for editorial review
- Escalate to CK-01 and/or CK-02 for completion
- Confidence score displayed: "LOW (0.XX) -- INPUTS NOT READY"

---

## GUARDRAILS

### Locked Tool Grammar

All skill invocations MUST follow this exact 5-step sequence:

1. **STATE** the skill being called and its specific purpose for this execution
2. **VERIFY** all required inputs are available, valid, and match expected schema
3. **EXECUTE** the skill with explicit parameters documented
4. **VALIDATE** the output against the expected schema and quality thresholds
5. **LOG** the result (PASS/FAIL, key outputs, any warnings) before proceeding

### Post-Tool Reflection

AFTER EVERY SKILL EXECUTION, verify these 5 points:

1. **Output exists** -- File/object is non-empty and accessible
2. **Schema valid** -- Output matches expected contract
3. **Quality gates pass** -- No threshold violations
4. **State updated** -- Session context reflects completed step
5. **Next step identified** -- Next skill confirmed with inputs available

---

## ANTI-SLOP LEXICON

NEVER allow these words/phrases to survive editorial review:

**Filler phrases:** in order to, for the purpose of, at this time, please be advised, we would like to inform you that, it should be noted that

**Redundant qualifiers:** completely free, totally secure, absolutely guaranteed, 100% completely

**Persuasion language (banned outside order bump):** exclusive, limited time, act now, don't miss, irresistible, compelling, special offer, best deal

**Verbose trust language:** we take your security very seriously, your satisfaction is extremely important to us, we are fully committed to

**REPLACEMENT REQUIREMENT:**
- "In order to complete your purchase" -> "To complete your purchase" (or cut entirely if context is clear)
- "We take your security very seriously" -> "256-bit SSL encryption" (specific, not emotional)
- "Your satisfaction is extremely important" -> "60-Day Money-Back Guarantee" (concrete, not claims)
- "Completely free shipping" -> "Free shipping" (redundant qualifier removed)

---

## REMEDIATION PROTOCOL

### Gate Failure Response Matrix

| Gate | Common Failures | Remediation |
|------|-----------------|-------------|
| Gate 0 | Input package missing | HALT -> Run missing upstream skill |
| Gate 0 | Strategy missing | HALT -> Run CK-00 |
| Gate 1 | Words cannot be cut further | ACCEPT -- checkout already minimal |
| Gate 1 | Trust density fails | ESCALATE -> CK-01 adds signals |
| Gate 2 | Mobile spec gaps found | ADD -> Specify mobile behavior for each gap |
| Gate 2 | Persuasion language found | REMOVE -> Replace with neutral language |
| Gate 4 | Checkout not shortest in funnel | CUT -> More aggressive word reduction |
| Gate 4 | Packaging fails | DEBUG -> Fix schema violations |

### Escalation Protocol
- Max 3 remediation iterations per gate
- After 3 failures: HUMAN CHECKPOINT with full failure log

---

## SESSION PERSISTENCE

```yaml
session_state:
  current_layer: [0-4]
  completed_skills: []
  gate_status:
    gate_0: [PASS/FAIL/PENDING]
    gate_1: [PASS/FAIL/PENDING]
    gate_2: [PASS/FAIL/PENDING]
    gate_4: [PASS/FAIL/PENDING]
  confidence_tier: [HIGH/MODERATE/LOW]
  words_cut: [count]
  trust_density_status: [pass/fail]
  mobile_gaps: [count]
  persuasion_violations: [count]
  remediation_count: [count]
  next_action: [next skill to execute]
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial build: 4-layer architecture with 6 microskills, 4-dimension audit (word reduction, trust density, mobile, persuasion), dual output (final copy + audit report), full guardrails |

---

**Skill Status:** COMPLETE
