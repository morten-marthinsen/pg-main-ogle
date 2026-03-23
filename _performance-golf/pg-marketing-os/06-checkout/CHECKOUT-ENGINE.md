# Checkout Engine — CHECKOUT-ENGINE.md

**Version:** 1.0
**Created:** 2026-03-09
**Purpose:** Institutional memory and execution constraints for Checkout Engine sessions. This is the master instruction file for the Checkout Engine subsystem of Marketing-OS.

---

## TABLE OF CONTENTS

- [THE 5 LAWS (Never Scroll Past This)](#the-5-laws-never-scroll-past-this)
- [CRITICAL: READ THIS FIRST](#critical-read-this-first)
- [THE CORE PROBLEM: CHECKOUT-SPECIFIC DEGRADATION PATTERNS](#the-core-problem-checkout-specific-degradation-patterns)
- [ARCHITECTURE OVERVIEW](#architecture-overview)
- [TRUST & SECURITY ARCHITECTURE (CK-01)](#trust--security-architecture-ck-01)
- [FORM & MICRO-COPY ARCHITECTURE (CK-02)](#form--micro-copy-architecture-ck-02)
- [CHECKOUT FLOW PATTERNS](#checkout-flow-patterns)
- [SKILL BUILD STATUS](#skill-build-status)
- [VERSION HISTORY](#version-history)

---

## THE 5 LAWS (Never Scroll Past This)

1. **Every word is friction.** Checkout copy must be the shortest in the entire funnel. If you can cut a word without losing meaning, cut it.
2. **Trust beats persuasion.** The buyer has already decided. Your job is to prevent abandonment, not create desire. Security signals, guarantees, and social proof matter more than benefits.
3. **Error messages are copy.** A bad error message ("Invalid input") creates abandonment. A good one ("Please enter your 5-digit zip code") keeps momentum.
4. **The order bump is the only sell.** Checkout has exactly one persuasion moment: the order bump. Everything else is trust and flow. Order bump follows U1 constraints (50-150 words, 3 elements).
5. **Mobile-first, always.** 70%+ of checkouts happen on mobile. Every copy element must specify mobile behavior.

---

## CRITICAL: READ THIS FIRST

This file exists because **checkout copy has its own degradation patterns** distinct from all other marketing copy. Checkout is primarily UX/decision-flow optimization — not heavy copy. It is the shortest engine in Marketing-OS for good reason: the buyer has already decided. Your only job is to not lose them.

**This file is the fix.** Before executing ANY Checkout Engine skill, read the relevant sections below.

---

## THE CORE PROBLEM: CHECKOUT-SPECIFIC DEGRADATION PATTERNS

### Pattern 1: The Sales Page Checkout
The model writes checkout copy with benefits, features, and persuasion language. The buyer has already decided. Checkout copy is trust + flow + friction reduction. **The fix:** CK-00 (Strategist) defines the checkout as a trust environment, not a persuasion environment. CK-01 (Trust & Security) focuses exclusively on reducing abandonment anxiety.

### Pattern 2: The Missing Trust Signals
The model writes clean form copy but forgets trust badges, security language, and guarantee reminders. On checkout, trust signals prevent abandonment more than good copy. **The fix:** CK-01 (Trust & Security) requires minimum trust density — at least 3 trust signals visible at all times on checkout.

### Pattern 3: The Hostile Error Message
The model writes error messages that blame the user — "Invalid card number" instead of "Please check your card number — it should be 16 digits." Bad error messages are the #1 cause of fixable checkout abandonment. **The fix:** CK-02 (Form & Micro-Copy) writes every error message with guidance, not blame.

### Pattern 4: The Desktop-First Checkout
The model writes checkout copy optimized for desktop layout — long field labels, verbose help text, wide form layouts. 70%+ of checkouts happen on mobile. **The fix:** CK-03 (Editorial) runs a mobile-first audit. Every element must have mobile behavior specified.

### Anti-Degradation Protocol (Checkout-Specific)

```
WHEN YOU NOTICE YOURSELF:
- Writing benefit language on checkout → STOP. Checkout is trust, not persuasion.
- Missing trust signals → STOP. Minimum 3 trust signals visible at all times.
- Writing "Invalid [field]" error messages → STOP. Guide, don't blame.
- Designing for desktop-first → STOP. Mobile behavior must be specified for every element.
- Adding multiple CTAs or offers → STOP. Order bump is the ONLY sell. Everything else is flow.

IF CONTEXT IS LARGE:
- This does NOT excuse persuasion language on checkout
- This does NOT excuse missing trust signals
- This does NOT excuse hostile error messages
- Request continuation rather than compressing quality
```

---

## ARCHITECTURE OVERVIEW

The Checkout Engine is a 4-skill pipeline that generates checkout flow copy — downstream from the Campaign Brief (Skill 09), Offer Package (Skill 07), and optionally from E-Comm outputs.

### Skill Pipeline

```
CK-00: Checkout Strategist
  → Analyze funnel type, map checkout flow, identify friction points
  → Plan trust architecture, payment options, order summary structure
  → Outputs: checkout-strategy.yaml

CK-01: Trust & Security Copy
  → Write trust badges, security language, guarantee copy, risk reversal micro-copy
  → No Arena (too short for competitive generation)
  → Outputs: trust-copy-package.json

CK-02: Form & Micro-Copy Writer
  → Field labels, helper text, error messages, progress indicators, order summary copy
  → Includes order bump integration point (bridges to U1 constraints: 50-150 words)
  → No Arena (too short)
  → Outputs: checkout-microcopy-package.json

CK-03: Checkout Editorial
  → Review complete checkout flow, friction audit, trust signal density
  → Mobile optimization notes (70%+ checkouts on mobile)
  → No Arena
  → Outputs: checkout-copy-final.md + checkout-audit-report.md
```

### Dependency Chain

```
Skill 09 (Campaign Brief) ──→ CK-00 (Strategy) ──→ CK-01 (Trust & Security)
Skill 07 (Offer Package)  ─┘                   ──→ CK-02 (Form & Micro-Copy)
                                  CK-01 + CK-02 ──→ CK-03 (Editorial)
                                  CK-00 ──→ U1 (Order Bump — Upsell Engine)
```

### Integration Points

| From | To | What Passes |
|------|-----|------------|
| Skill 09 (Campaign Brief) | CK-00 | campaign-brief.json (audience, voice, product details) |
| Skill 07 (Offer Package) | CK-00 | offer-package.json (pricing, guarantee, payment options, value stack) |
| CK-00 (Strategist) | U1 (Order Bump) | Checkout flow context, order bump placement spec |
| E-Comm outputs (optional) | CK-00 | Product context if checkout follows ecom flow |

---

## TRUST & SECURITY ARCHITECTURE (CK-01)

### Trust Signal Categories

| Category | Examples | Minimum Per Checkout |
|----------|---------|---------------------|
| Security | SSL badge, "256-bit encryption", lock icon | 2 |
| Payment | Visa/MC/Amex logos, PayPal, Apple Pay | Show all accepted |
| Guarantee | "60-Day Money-Back Guarantee" with icon | 1 (prominent) |
| Social Proof | "Join 47,000+ customers" or review stars | 1 |
| Contact | "Questions? Call 1-800-XXX-XXXX" | 1 (visible) |

### Trust Density Rule
At least 3 trust signals must be visible at any point during checkout without scrolling. On mobile, this means trust signals must be in the viewport at every step.

### Guarantee Copy Templates

| Type | Template | Length |
|------|----------|--------|
| Money-Back | "[X]-Day Money-Back Guarantee. Try it risk-free." | 8-12 words |
| Satisfaction | "100% Satisfaction Guaranteed or your money back." | 8-10 words |
| Performance | "See results in [X] days or get a full refund." | 10-14 words |

---

## FORM & MICRO-COPY ARCHITECTURE (CK-02)

### Field Labels (Mobile-First)

| Field | Label | Helper Text | Error Message |
|-------|-------|-------------|---------------|
| Email | Email address | "For order confirmation and receipt" | "Please enter a valid email address" |
| Name | Full name | "As it appears on your card" | "Please enter your first and last name" |
| Card Number | Card number | [Card type icon auto-detects] | "Please check your card number — should be 16 digits" |
| Expiry | MM / YY | — | "Please enter a future date (MM/YY)" |
| CVV | CVV | "3 digits on back of card" | "Please enter the 3-digit code on the back of your card" |
| Zip | Zip code | — | "Please enter your 5-digit zip code" |

### Error Message Rules
1. **Never blame.** "Invalid input" → "Please enter your 5-digit zip code"
2. **Be specific.** Tell the user exactly what to fix and how.
3. **Be immediate.** Validate inline, not on submit.
4. **Be forgiving.** Accept common formats (spaces in card numbers, dashes in phone).

### Order Summary Copy

| Element | Purpose | Word Budget |
|---------|---------|-------------|
| Product Name | What they're buying | Product name as-is |
| Product Description | Quick reminder | 5-10 words |
| Price | Clear pricing | Number + currency |
| Savings | Value reinforcement | "You save $XX" or "XX% off" |
| Total | Final amount | Bold, prominent |
| Order Bump | Single persuasion moment | 50-150 words (U1 constraints) |

### Progress Indicators
For multi-step checkouts:
- Step labels must be 1-2 words: "Shipping" → "Payment" → "Confirm"
- Current step must be visually distinct
- Completed steps must show checkmarks

---

## CHECKOUT FLOW PATTERNS

### Single-Page Checkout (Most Common)

```
┌──────────────────────────────┐
│ ORDER SUMMARY                │ ← Product + price + savings
│ [Trust badges row]           │ ← 3+ trust signals
├──────────────────────────────┤
│ CONTACT                      │ ← Email
│ SHIPPING                     │ ← Name, address
│ PAYMENT                      │ ← Card details
│ [Order Bump checkbox]        │ ← ONLY persuasion moment (50-150w)
│ [Guarantee reminder]         │ ← Trust reinforcement
│ [COMPLETE ORDER button]      │ ← Clear CTA
│ [Security + payment icons]   │ ← Trust footer
└──────────────────────────────┘
```

### Multi-Step Checkout

```
Step 1: Contact → Step 2: Shipping → Step 3: Payment
[Progress bar with step indicators]
```

### Funnel-Specific Checkout

| Funnel Type | Checkout Pattern | Key Difference |
|-------------|-----------------|---------------|
| Direct Sale | Single-page, standard fields | Full checkout |
| Supplement/Physical | Single-page + shipping options | Subscription option |
| Digital Product | Simplified (no shipping) | Fewer fields = faster |
| Free + Shipping | Shipping form, card for S&H | Price emphasis on "free" |
| Trial | Trial terms prominent | Billing schedule clarity |

---

## SKILL BUILD STATUS

| Skill | Status | Files | Built |
|-------|--------|-------|-------|
| CK-00 — Checkout Strategist | COMPLETE | SKILL.md, CK-00-AGENT.md, CK-00-ANTI-DEGRADATION.md, 7 microskills | 2026-03-09 |
| CK-01 — Trust & Security Copy | COMPLETE | SKILL.md, CK-01-AGENT.md, CK-01-ANTI-DEGRADATION.md, 5 microskills | 2026-03-09 |
| CK-02 — Form & Micro-Copy Writer | COMPLETE | SKILL.md, CK-02-AGENT.md, CK-02-ANTI-DEGRADATION.md, 5 microskills | 2026-03-09 |
| CK-03 — Checkout Editorial | COMPLETE | SKILL.md, CK-03-AGENT.md, CK-03-ANTI-DEGRADATION.md, 6 microskills | 2026-03-09 |

**All 4 skills fully built with AGENT.md (orchestrator), ANTI-DEGRADATION.md (structural enforcement), and complete microskill architecture (31 microskills total across 4 skills).**

**Note:** This engine will be refined with PG checkout flow captures once the user clicks through products to provide patterns.

---

### SSR Pre-Screen Validation

After CK-03 (Editorial) completes, SSR pre-screening runs per `~system/protocols/SSR-PRESCREEN-PROTOCOL.md`. A synthetic consumer panel (75-100 personas) evaluates the final output and produces a GO / REVISE / KILL recommendation with segment-stratified diagnostics. The SSR report is included in the output package. Trigger microskill: `CK-03-checkout-editorial/skills/layer-4/4.3-ssr-prescreen-trigger.md`

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.2 | 2026-03-20 | Added SSR pre-screen validation reference (CK-03 (Editorial) terminal gate) |
| 1.1 | 2026-03-09 | FULL BUILD: All 4 skills complete with AGENT.md, ANTI-DEGRADATION.md, and 31 microskills. CK-00 (9 microskills), CK-01 (7 microskills), CK-02 (7 microskills), CK-03 (8 microskills). |
| 1.0 | 2026-03-09 | Initial creation — architecture, 5 Laws, 4 degradation patterns, skill pipeline, trust architecture, form micro-copy templates, checkout flow patterns, 4 v1 skill scaffolds. |
