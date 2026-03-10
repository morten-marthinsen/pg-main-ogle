# CK-02-AGENT.md

> **Version:** 1.0
> **Skill:** CK-02-form-microcopy
> **Position:** Post-CK-00-Strategy, Pre-CK-03-Editorial
> **Type:** Copy Generation Orchestrator (State Machine)
> **Dependencies:** CK-00-checkout-strategist
> **Output:** `checkout-microcopy-package.json`

---

## PURPOSE

Generate all **form copy and micro-copy** for the checkout page -- field labels, helper text, placeholder text, error messages, progress indicators, order summary copy, button text, and the order bump integration point. This is precision UX copy. Every label must be instantly clear. Every error message must guide, not blame. Every progress indicator must orient, not confuse.

**Success Criteria:**
- All form fields have: label, helper text (if needed), placeholder (if needed), error message
- Error messages guide the user to fix the problem (never blame)
- Order summary includes: product name, description, price, savings, total
- Order bump integration point defined (bridges to U1 for copy generation)
- Progress indicators present for multi-step checkouts (1-2 word labels)
- Button text is specific and action-oriented ("Complete Order" not "Submit")
- All copy specifies mobile behavior (field sizing, keyboard type, stacking)
- Total micro-copy word count is minimal -- checkout is the shortest copy in the funnel

This agent is a **workflow orchestrator**. It delegates to microskills and validates outputs at each gate.

---

## IDENTITY

**This skill IS:**
- The form label writer
- The error message engineer
- The helper text specialist
- The order summary copy writer
- The progress indicator designer
- The button text optimizer
- The order bump integration planner

**This skill is NOT:**
- A trust copy writer (CK-01 handles trust)
- A sales copy writer (the sale is already made)
- An order bump copy writer (U1 handles that)
- A page layout designer (copy only)
- An editorial reviewer (CK-03 handles review)
- A persuasion engine (micro-copy is functional, not persuasive)

**Upstream:** Receives `checkout-strategy.yaml` from CK-00 (checkout pattern, flow map, field requirements)
**Downstream:** Feeds `checkout-microcopy-package.json` to CK-03 (Checkout Editorial) for review

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Foundation + loading | haiku | Input loading, no reasoning needed |
| 1 | Field mapping + order summary planning | sonnet | Structural planning + classification |
| 2 | Micro-copy generation | opus | Copy precision -- error messages need expertise |
| 4 | Validation + packaging | sonnet | Assembly from generated outputs |

---

## STATE MACHINE

```
IDLE -> LOADING -> FIELD_MAPPING -> GENERATION -> VALIDATION -> COMPLETE
         |             |                |              |
         v             v                v              v
      [GATE_0]      [GATE_1]        [GATE_2]       [GATE_4]
      PASS/FAIL     PASS/FAIL       PASS/FAIL      PASS/FAIL
         |             |                |              |
         +-----------+-----------------+--------------+
                              ^
                              |
                        Max 3 iterations
                        per layer, then
                        HUMAN CHECKPOINT
```

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

**Purpose:** Load checkout strategy (checkout pattern, flow map, field requirements) and validate that the checkout structure is defined.

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load checkout strategy + checkout flow map from CK-00 |
| 0.2 | `0.2-input-validator.md` | Validate checkout pattern and field requirements present |

**Execution Order:**
1. 0.1 first (load upstream data)
2. 0.2 after 0.1 (validate loaded data)

**Gate 0:** Checkout strategy loaded with checkout pattern (single-page or multi-step), flow map available with section sequence, field requirements defined per section. FAIL = checkout-strategy.yaml missing OR checkout pattern undefined OR flow map absent.

---

### Layer 1: Field Mapping & Order Summary Planning

**Purpose:** Map all form fields needed for this checkout type and plan the order summary structure including order bump integration.

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-field-mapper.md` | Map all form fields needed for this checkout type |
| 1.2 | `1.2-order-summary-planner.md` | Plan order summary structure + order bump integration |

**Execution Order:**
1. 1.1 and 1.2 run in parallel (independent planning tasks)

**Gate 1:** All form fields mapped with field type, validation rules, and mobile keyboard type. Order summary structure defined with all elements (product name, description, price, savings, total, order bump placement). FAIL = form fields not mapped OR order summary incomplete OR order bump integration undefined.

---

### Layer 2: Micro-Copy Generation

**Purpose:** Generate all micro-copy: field labels, helper text, error messages, progress indicators, order summary copy, and button text.

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-microcopy-generator.md` | Generate labels + helper text + error messages + progress indicators + button text |

**Execution Order:**
1. 2.1 runs after Gate 1 passes (requires field map and order summary plan)

**Gate 2:** Every mapped field has: label, error message, helper text (if applicable). Error messages are guiding (not blaming). Order summary copy is complete. Progress indicators defined for multi-step. Button text is specific. All copy has mobile behavior specified. FAIL = any field missing error message OR blaming error message detected OR order summary incomplete OR button text vague.

---

### Layer 4: Validation & Packaging

**Purpose:** Validate error message tone, verify completeness, and package as checkout-microcopy-package.json.

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-error-message-tone-checker.md` | Verify error messages guide (not blame) |
| 4.2 | `4.2-output-packager.md` | Package checkout-microcopy-package.json |

**Execution Order:**
1. 4.1 first (validate error tone before packaging)
2. 4.2 after 4.1 passes (only package validated copy)

**Gate 4:** All error messages pass tone check (guiding, not blaming), checkout-microcopy-package.json assembled with all fields, no vague button text. FAIL = blaming error message found OR package assembly fails OR button text is "Submit" or similarly vague.

---

## OUTPUT SCHEMA

```json
{
  "microcopy_package_version": "1.0",
  "generated_at": "ISO timestamp",
  "skill_id": "CK-02-form-microcopy",

  "form_fields": [
    {
      "field_id": "email",
      "section": "contact",
      "label": "Email address",
      "placeholder": "you@example.com",
      "helper_text": "For order confirmation and receipt",
      "error_message": "Please enter a valid email address",
      "required": true,
      "field_type": "email",
      "mobile_keyboard": "email",
      "mobile_width": "full",
      "auto_fill": "email",
      "validation_rule": "valid email format"
    }
  ],

  "order_summary": {
    "product_name": "[Product name from offer package]",
    "product_description": "Brief reminder, 5-10 words",
    "price_display": "$49.95",
    "compare_at_display": "$99.95",
    "savings_display": "You save $50.00",
    "total_label": "Total",
    "total_display": "$49.95",
    "shipping_label": "Shipping",
    "shipping_display": "FREE" ,
    "order_bump": {
      "placement": "After line items, before total",
      "format": "Checkbox with copy block",
      "word_budget": "50-150 words",
      "integration": "U1 generates copy, CK-02 provides placement and format only",
      "checkbox_label": "Yes, add [bump product] to my order"
    }
  },

  "progress_indicators": {
    "applicable": true,
    "steps": [
      { "step": 1, "label": "Contact", "aria_label": "Step 1: Contact information" },
      { "step": 2, "label": "Shipping", "aria_label": "Step 2: Shipping address" },
      { "step": 3, "label": "Payment", "aria_label": "Step 3: Payment details" }
    ],
    "format": "numbered_steps_with_labels"
  },

  "buttons": {
    "primary_cta": {
      "text": "Complete Order",
      "mobile_text": "Complete Order",
      "aria_label": "Complete your order and process payment"
    },
    "secondary_actions": [
      {
        "action": "back",
        "text": "Back",
        "context": "Multi-step navigation"
      }
    ]
  },

  "success_confirmation": {
    "heading": "Order Confirmed",
    "message": "Thank you for your purchase. Check your email for order details.",
    "next_step": "Continue to access your purchase"
  },

  "copy_metadata": {
    "total_fields": 6,
    "total_error_messages": 6,
    "blaming_messages_found": 0,
    "mobile_specified": true,
    "total_word_count": 120
  }
}
```

---

## HUMAN CHECKPOINTS

### Optional Checkpoint: Micro-Copy Review

**When:** After Layer 2 generation, before packaging
**Presented:** All form labels, error messages, and order summary copy
**Decision Required:** Approve copy or request adjustments
**Override:** Human can modify any micro-copy text

---

## ERROR HANDLING

### Common Failures and Remediation

| Failure | Remediation |
|---------|-------------|
| Checkout strategy missing | HALT -- return to CK-00 for strategy completion |
| Field requirements not defined | HALT -- strategy must specify fields |
| Blaming error message generated | REWRITE -- change from blame to guidance |
| Button text vague ("Submit") | REWRITE -- use specific action ("Complete Order") |
| Order bump integration unclear | HALT -- define placement and format, bridge to U1 |
| Mobile behavior unspecified | ADD -- every field needs mobile spec |

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER write blaming error messages** -- "Invalid input" is blame. "Please enter your 5-digit zip code" is guidance. Every error message must tell the user exactly what to do.
2. **ALWAYS specify mobile keyboard type** -- Email fields trigger email keyboard, phone fields trigger numpad, zip fields trigger numpad.
3. **ALWAYS use specific button text** -- "Complete Order" or "Place Order" not "Submit" or "Continue" or "Go."
4. **NEVER write order bump copy** -- CK-02 defines the integration point (placement, format, word budget). U1 writes the actual copy.
5. **ALWAYS include auto-fill hints** -- Every standard field should specify which auto-fill attribute to use.

### Quality Constraints
6. **Field labels: 1-3 words** -- "Email address" not "Please enter your email address below."
7. **Helper text: only when needed** -- If the label is self-explanatory, skip helper text.
8. **Error messages: specific remedy** -- Tell the user the format, the length, or the fix. Not just "invalid."
9. **Progress step labels: 1-2 words** -- "Shipping" not "Enter your shipping address."
10. **Order summary: minimal copy** -- Product name + brief description + price. No benefits re-selling.

### Anti-Slop Constraints
11. **ZERO persuasion in form copy** -- No "Get instant access!" or "Claim your spot!"
12. **ZERO vague errors** -- "Error" or "Invalid" alone are banned. Must specify what is wrong and how to fix.
13. **ZERO unnecessary fields** -- Every field must be justified. If it is not needed for fulfillment or payment, flag for removal.

### Integration Constraints
14. **Checkout pattern from CK-00** -- Follow the pattern (single-page vs. multi-step). Do not redesign.
15. **Flow map from CK-00** -- Follow section ordering. Do not re-sequence.
16. **Order bump bridges to U1** -- Placement and format only. Copy generation is U1's job.

### Enforcement Constraints
17. **IF checkout-strategy.yaml missing -> HALT** -- Cannot generate micro-copy without strategy.
18. **IF blaming error message detected -> REWRITE** -- Change to guiding message before proceeding.
19. **IF button text is "Submit" -> REJECT** -- Replace with specific action text.
20. **IF field has no error message -> REJECT** -- Every field needs an error message.
21. **IF mobile keyboard unspecified -> REJECT** -- Every field needs mobile keyboard type.
22. **IF order summary has persuasion language -> REMOVE** -- Order summary is informational only.

---

## THREE-TIER UNCERTAINTY PROTOCOL

### Tier 1: HIGH CONFIDENCE (>= 0.85)

**Conditions:**
- Checkout pattern clearly defined
- Field list is standard (email, name, card, address)
- Product type is common (supplement, digital, etc.)
- Order summary elements are straightforward

**Behavior:**
- Generate all micro-copy without human checkpoint
- Confidence score displayed: "HIGH (0.XX)"

### Tier 2: MODERATE CONFIDENCE (0.65-0.84)

**Conditions:**
- Non-standard fields required (company name, tax ID, etc.)
- Order summary has complex pricing (tiers, bundles, trials)
- Multi-step checkout with non-standard progression

**Behavior:**
- Generate copy with flagged assumptions
- Request human review of non-standard elements
- Confidence score displayed: "MODERATE (0.XX)"

### Tier 3: LOW CONFIDENCE (< 0.65)

**Conditions:**
- Checkout structure is novel or undefined
- Field requirements ambiguous
- Pricing structure unclear
- No pattern from CHECKOUT-ENGINE.md matches

**Behavior:**
- HALT automatic progression
- Present structural template for human direction
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
2. **Schema valid** -- Output matches expected contract
3. **Quality gates pass** -- No threshold violations
4. **State updated** -- Session context reflects completed step
5. **Next step identified** -- Next skill confirmed with inputs available

---

## ANTI-SLOP LEXICON

NEVER use these words/phrases in micro-copy output:

**Blaming error language:** invalid, wrong, incorrect, bad, error (alone), failed, rejected, denied

**Persuasion language (banned on checkout):** exclusive, limited, act now, don't miss, claim, unlock, get instant access

**Vague button text:** submit, go, continue (without context), click here, proceed, next (alone)

**Unnecessary verbosity:** please note that, in order to, at this time, we would like to inform you

**REPLACEMENT REQUIREMENT:**
- "Invalid email" -> "Please enter a valid email address"
- "Wrong card number" -> "Please check your card number -- it should be 16 digits"
- "Submit" -> "Complete Order"
- "Continue" -> "Continue to Payment" (with context)
- "Error" -> "Please check the highlighted fields"

---

## REMEDIATION PROTOCOL

### Gate Failure Response Matrix

| Gate | Common Failures | Remediation |
|------|-----------------|-------------|
| Gate 0 | Strategy missing | HALT -> Request CK-00 completion |
| Gate 0 | Field requirements absent | HALT -> Return to CK-00 |
| Gate 1 | Field map incomplete | ADD -> Map all fields for checkout type |
| Gate 1 | Order summary missing elements | ADD -> Complete all elements |
| Gate 2 | Blaming error messages | REWRITE -> Change to guiding language |
| Gate 2 | Vague button text | REWRITE -> Use specific action text |
| Gate 4 | Error tone check fails | FIX -> Rewrite failing messages |
| Gate 4 | Package assembly fails | DEBUG -> Fix schema violations |

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
  fields_mapped: [count]
  error_messages_generated: [count]
  blaming_violations: [count]
  mobile_specified: [true/false]
  remediation_count: [count]
  next_action: [next skill to execute]
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial build: 4-layer architecture with 5 microskills, error tone enforcement, order bump integration, full guardrails |

---

**Skill Status:** COMPLETE
