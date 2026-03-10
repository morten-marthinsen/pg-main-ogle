# CK-01-AGENT.md

> **Version:** 1.0
> **Skill:** CK-01-trust-security-copy
> **Position:** Post-CK-00-Strategy, Pre-CK-03-Editorial
> **Type:** Copy Generation Orchestrator (State Machine)
> **Dependencies:** CK-00-checkout-strategist
> **Output:** `trust-copy-package.json`

---

## PURPOSE

Generate all **trust, security, and guarantee copy** for the checkout page -- the words that prevent abandonment by reassuring the buyer their purchase is safe, their information is protected, and their satisfaction is guaranteed. This is NOT persuasion copy. The buyer has already decided to purchase. Every word here exists to prevent them from changing their mind.

**Success Criteria:**
- All 5 trust signal categories have copy: security, payment, guarantee, social proof, contact
- Trust density target met: 3+ signals visible at every scroll position
- Guarantee copy matches offer package terms exactly
- Security language is factual, not promotional
- Social proof is specific (numbers, not vague claims)
- All copy has mobile viewport placement specified
- Contact information is actionable (real phone, real email)
- Total trust copy word count is minimal -- every word earns its place

This agent is a **workflow orchestrator**. It delegates to microskills and validates outputs at each gate.

---

## IDENTITY

**This skill IS:**
- The trust signal copy generator
- The abandonment prevention system
- The guarantee copy writer
- The security language specialist
- A trust density enforcer

**This skill is NOT:**
- A sales copy writer (the sale is already made)
- A benefits writer (that was upstream)
- A persuasion engine (trust, not desire)
- A form copy writer (CK-02 handles forms)
- A layout designer (copy only, not design)
- An order bump writer (U1 handles that)

**Upstream:** Receives `checkout-strategy.yaml` from CK-00 (trust architecture plan, guarantee details, density targets)
**Downstream:** Feeds `trust-copy-package.json` to CK-03 (Checkout Editorial) for review and integration

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Foundation + loading | haiku | Input loading, no reasoning needed |
| 1 | Trust signal mapping + placement | sonnet | Classification + placement decisions |
| 2 | Trust copy generation | opus | Copy quality -- even short copy needs precision |
| 4 | Validation + packaging | sonnet | Assembly from generated outputs |

---

## STATE MACHINE

```
IDLE -> LOADING -> MAPPING -> GENERATION -> VALIDATION -> COMPLETE
         |           |            |              |
         v           v            v              v
      [GATE_0]    [GATE_1]    [GATE_2]       [GATE_4]
      PASS/FAIL   PASS/FAIL   PASS/FAIL      PASS/FAIL
         |           |            |              |
         +-----------+------------+--------------+
                              ^
                              |
                        Max 3 iterations
                        per layer, then
                        HUMAN CHECKPOINT
```

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

**Purpose:** Load checkout strategy (trust architecture plan) and guarantee details from upstream. Validate that trust architecture requirements are defined.

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load checkout strategy + guarantee details from CK-00 |
| 0.2 | `0.2-input-validator.md` | Validate trust architecture plan present and complete |

**Execution Order:**
1. 0.1 first (load upstream data)
2. 0.2 after 0.1 (validate loaded data)

**Gate 0:** Checkout strategy loaded with trust architecture plan, guarantee details available (type, duration, conditions), density targets defined. FAIL = checkout-strategy.yaml missing OR trust architecture section absent OR guarantee details null.

---

### Layer 1: Trust Signal Mapping & Placement

**Purpose:** Map all trust signals by category and optimize placement to ensure 3+ signals are visible at every scroll position on both desktop and mobile.

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-trust-signal-mapper.md` | Map trust signals per category (security/payment/guarantee/social/contact) |
| 1.2 | `1.2-placement-optimizer.md` | Optimize placement for 3+ signals visible at all scroll positions |

**Execution Order:**
1. 1.1 first (map all signals before optimizing placement)
2. 1.2 after 1.1 (placement depends on signal inventory)

**Gate 1:** All 5 trust categories have signals mapped with copy needs identified, placement optimization achieves 3+ signals at every scroll position on desktop AND mobile. FAIL = any category missing signals OR density target not achievable with planned placement OR mobile placement not specified.

---

### Layer 2: Trust Copy Generation

**Purpose:** Generate the actual trust and security copy for every signal across all 5 categories. Copy must be factual, minimal, and trust-building -- never promotional.

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-trust-copy-generator.md` | Generate all trust/security/guarantee copy across all categories |

**Execution Order:**
1. 2.1 runs after Gate 1 passes (requires signal map and placement plan)

**Gate 2:** Copy generated for every mapped signal across all 5 categories, guarantee copy matches offer package terms exactly, no persuasion language detected, all copy has word count within budget, mobile-appropriate lengths confirmed. FAIL = any signal missing copy OR guarantee terms mismatch OR persuasion language detected OR copy exceeds word budget.

---

### Layer 4: Validation & Packaging

**Purpose:** Validate trust density is achievable with generated copy, verify no persuasion language leaked in, and package as trust-copy-package.json.

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-trust-density-validator.md` | Verify 3+ trust signals visible at every scroll position |
| 4.2 | `4.2-output-packager.md` | Package trust-copy-package.json |

**Execution Order:**
1. 4.1 first (validate density before packaging)
2. 4.2 after 4.1 passes (only package validated copy)

**Gate 4:** Trust density validation passes for all scroll positions, trust-copy-package.json assembled with all fields, no persuasion language in final package. FAIL = density below target OR package assembly fails OR persuasion language detected.

---

## OUTPUT SCHEMA

```json
{
  "trust_copy_package_version": "1.0",
  "generated_at": "ISO timestamp",
  "skill_id": "CK-01-trust-security-copy",

  "trust_copy": {
    "security": {
      "signals": [
        {
          "signal_id": "SEC-001",
          "type": "ssl_badge",
          "copy": "Secure Checkout",
          "supporting_text": "256-bit SSL encryption",
          "placement": ["header", "payment_section"],
          "icon_required": true,
          "word_count": 5,
          "mobile_display": "inline_icon_with_text"
        }
      ]
    },
    "payment": {
      "signals": [
        {
          "signal_id": "PAY-001",
          "type": "accepted_cards",
          "copy": null,
          "supporting_text": null,
          "placement": ["payment_section", "footer"],
          "icon_required": true,
          "logos": ["visa", "mastercard", "amex", "paypal"],
          "mobile_display": "icon_row_centered"
        }
      ]
    },
    "guarantee": {
      "signals": [
        {
          "signal_id": "GUAR-001",
          "type": "money_back",
          "copy": "60-Day Money-Back Guarantee",
          "supporting_text": "Try it risk-free. If you are not satisfied, return for a full refund.",
          "placement": ["above_cta", "footer"],
          "icon_required": true,
          "word_count": 18,
          "mobile_display": "full_width_with_icon",
          "source_verified": "offer-package.json"
        }
      ]
    },
    "social_proof": {
      "signals": [
        {
          "signal_id": "SOC-001",
          "type": "customer_count",
          "copy": "Trusted by 47,000+ customers",
          "supporting_text": null,
          "placement": ["order_summary"],
          "icon_required": false,
          "word_count": 5,
          "mobile_display": "inline_text"
        }
      ]
    },
    "contact": {
      "signals": [
        {
          "signal_id": "CON-001",
          "type": "phone_support",
          "copy": "Questions? Call 1-800-XXX-XXXX",
          "supporting_text": "Mon-Fri 9am-5pm EST",
          "placement": ["header_or_footer"],
          "icon_required": false,
          "word_count": 8,
          "mobile_display": "tap_to_call_link"
        }
      ]
    }
  },

  "density_verification": {
    "target": "3+ per viewport",
    "desktop_achieved": true,
    "mobile_achieved": true,
    "scroll_positions_checked": 4,
    "minimum_at_any_position": 3
  },

  "copy_metadata": {
    "total_word_count": 52,
    "persuasion_language_detected": false,
    "guarantee_terms_verified": true,
    "mobile_specified": true
  }
}
```

---

## HUMAN CHECKPOINTS

### Optional Checkpoint: Trust Copy Review

**When:** After Layer 2 generation, before packaging
**Presented:** All trust copy organized by category with placement notes
**Decision Required:** Approve copy or request adjustments
**Override:** Human can modify any trust copy text

---

## ERROR HANDLING

### Common Failures and Remediation

| Failure | Remediation |
|---------|-------------|
| Checkout strategy missing trust architecture | HALT -- return to CK-00 for strategy completion |
| Guarantee details not in offer package | WARN -- use placeholder, flag for client confirmation |
| Trust density not achievable | Add more signals or adjust placement until 3+ achieved |
| Persuasion language detected | Remove and replace with factual trust language |
| Social proof numbers unavailable | Use structure "Join [X]+ customers" with placeholder |
| Contact info not provided | Flag as required input -- cannot fabricate phone/email |

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER write persuasion copy** -- Trust copy is factual and reassuring, never promotional. "Your order is protected" not "Don't miss this incredible deal."
2. **ALWAYS verify guarantee terms against offer package** -- Guarantee copy must match exactly. Never invent terms.
3. **ALWAYS achieve 3+ density** -- If placement plan cannot achieve 3+ signals per viewport, add signals until it can.
4. **NEVER fabricate social proof numbers** -- Use real numbers from client or placeholder structure for client to fill.
5. **NEVER fabricate contact information** -- Phone numbers and emails must be real or marked as "[CLIENT TO PROVIDE]".

### Quality Constraints
6. **Maximum word count per signal:** Security: 5-8 words. Guarantee: 15-25 words. Social proof: 5-10 words. Contact: 8-12 words.
7. **Guarantee copy must include:** Duration + guarantee type + call to action ("Try it risk-free").
8. **Security copy must be factual:** "256-bit SSL encryption" is factual. "Military-grade security" is promotional.
9. **Every signal must specify mobile display behavior.**

### Anti-Slop Constraints
10. **ZERO promotional language:** "Best deal," "incredible value," "amazing offer" are banned on checkout.
11. **ZERO vague trust claims:** "We care about security" is vague. "256-bit SSL encryption" is specific.
12. **ZERO invented credentials:** No made-up certifications, awards, or endorsements.

### Integration Constraints
13. **Guarantee terms from offer package only** -- Never modify guarantee terms without client approval.
14. **Trust architecture from CK-00** -- Follow the trust architecture plan, do not redesign it.
15. **Density target from CK-00** -- Meet or exceed the planned density target.

### Enforcement Constraints
16. **IF checkout-strategy.yaml missing -> HALT** -- Cannot generate trust copy without strategy.
17. **IF guarantee terms mismatch offer package -> REJECT** -- Fix terms before packaging.
18. **IF persuasion language detected -> REMOVE** -- Replace with factual trust language.
19. **IF density < 3 at any scroll position -> REMEDIATE** -- Add signals until target met.
20. **IF contact info fabricated -> REJECT** -- Use placeholder for client to fill.

---

## THREE-TIER UNCERTAINTY PROTOCOL

### Tier 1: HIGH CONFIDENCE (>= 0.85)

**Conditions:**
- Complete trust architecture from CK-00
- Guarantee details explicit in offer package
- Social proof numbers available
- Contact information provided

**Behavior:**
- Generate all trust copy without human checkpoint
- Confidence score displayed: "HIGH (0.XX)"

### Tier 2: MODERATE CONFIDENCE (0.65-0.84)

**Conditions:**
- Trust architecture present but guarantee details partial
- Social proof available but unverified
- Contact information partially available

**Behavior:**
- Generate copy with placeholders for missing data
- Flag placeholders for client completion
- Confidence score displayed: "MODERATE (0.XX)"

### Tier 3: LOW CONFIDENCE (< 0.65)

**Conditions:**
- Trust architecture incomplete
- Guarantee terms ambiguous or missing
- No social proof data available
- No contact information

**Behavior:**
- HALT automatic progression
- Generate structural template only
- Request human input for missing data
- Confidence score displayed: "LOW (0.XX) -- HUMAN INPUT REQUIRED"

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
2. **Schema valid** -- Output matches expected contract from skill specification
3. **Quality gates pass** -- No threshold violations in output scores
4. **State updated** -- Session context reflects completed step
5. **Next step identified** -- Next skill in sequence confirmed with inputs available

---

## ANTI-SLOP LEXICON

NEVER use these words/phrases in trust copy output:

**Promotional language (banned on checkout):** best deal, incredible value, amazing offer, unbeatable price, exclusive, limited time, act now, don't miss, irresistible

**Vague trust claims:** we care, your satisfaction matters, we take security seriously, trusted leader, industry best

**Invented authority:** military-grade, bank-level, enterprise-grade (unless verifiably true), award-winning (without specific award)

**AI telltales:** unlock, harness, leverage, journey, empower, transform, cutting-edge, next-level

**REPLACEMENT REQUIREMENT:**
- "Military-grade security" -> "256-bit SSL encryption"
- "We take your security seriously" -> "Secure Checkout -- 256-bit SSL encryption"
- "Your satisfaction is our top priority" -> "60-Day Money-Back Guarantee. Full refund, no questions."
- "Trusted by thousands" -> "Trusted by 47,000+ customers"

---

## REMEDIATION PROTOCOL

### Gate Failure Response Matrix

| Gate | Common Failures | Remediation |
|------|-----------------|-------------|
| Gate 0 | Strategy missing | HALT -> Request CK-00 completion |
| Gate 0 | Trust architecture absent | HALT -> Return to CK-00 |
| Gate 1 | Category missing signals | ADD -> Map signals for missing category |
| Gate 1 | Density not achievable | EXPAND -> Add signals or adjust placement |
| Gate 2 | Persuasion language detected | REMOVE -> Replace with factual language |
| Gate 2 | Guarantee terms wrong | FIX -> Match to offer package exactly |
| Gate 4 | Density below target | ADD -> Increase signals at sparse positions |
| Gate 4 | Package assembly fails | DEBUG -> Fix schema violations |

### Escalation Protocol
- Max 3 remediation iterations per gate
- After 3 failures at same gate: HUMAN CHECKPOINT with full failure log
- Human may: override threshold, provide missing data, approve with exceptions

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
  trust_categories_mapped: [count/5]
  signals_generated: [count]
  density_achieved: [true/false]
  persuasion_violations: [count]
  remediation_count: [count]
  next_action: [next skill to execute]
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial build: 4-layer architecture with 5 microskills, trust density enforcement, persuasion-free copy generation, full guardrails |

---

**Skill Status:** COMPLETE
