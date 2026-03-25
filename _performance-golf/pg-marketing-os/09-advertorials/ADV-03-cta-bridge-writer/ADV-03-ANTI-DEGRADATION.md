# ADV-03-ANTI-DEGRADATION.md

**Version:** 1.0
**Created:** 2026-03-09
**Updated:** 2026-03-09
**Purpose:** STRUCTURAL enforcement to prevent advertorial bridge/CTA process breakdown
**Authority:** This document has EQUAL authority to ENFORCEMENT-GATES.md and ~system/SYSTEM-CORE.md

---

## MANDATORY READ DECLARATION

```
I HAVE READ THIS FILE: ADV-03-ANTI-DEGRADATION.md v1.0
I UNDERSTAND: All failure modes, forbidden rationalizations, and gate enforcement rules below.
I WILL: Enforce exactly one CTA as text link, use recommendation framing only.
I WILL NOT: Generate multiple CTAs, use button formatting, use sales close language, or add urgency.
```

---

## WHY THIS DOCUMENT EXISTS

**Anticipated Failure Patterns:**
- AI generates 2-3 CTAs throughout the bridge ("just in case")
- AI formats CTA as a button or styled link rather than inline text
- AI writes bridge as sales close ("So what are you waiting for?")
- AI adds urgency language ("Limited time offer")
- AI transitions abruptly from editorial to sales pitch
- AI uses "Buy Now" or equivalent direct purchase language
- AI creates discount/pricing language in the bridge
- AI generates bridge that breaks editorial voice established in body

---

## STRUCTURAL FIX 1: SINGLE CTA ENFORCEMENT

### The Problem
AI naturally wants to provide multiple purchase pathways. "Click here to learn more... Or visit [URL]... You can also call..." Each additional CTA signals "advertisement" more loudly.

### The Fix

```yaml
cta_enforcement:
  AFTER bridge generation:
    count_cta_elements: [count all links, buttons, and call-to-action phrases]

    IF count > 1:
      HALT: "Multiple CTAs detected ([count]). Exactly 1 required."
      ACTION: Remove all but the strongest CTA

    IF count == 0:
      HALT: "No CTA found. Exactly 1 required."
      ACTION: Add single CTA in recommendation framing

  CTA FORMAT check:
    IF cta_is_button: HALT: "CTA must be text link, not button"
    IF cta_is_styled_link: HALT: "CTA must be plain text link"
    IF cta_text_is_all_caps: HALT: "CTA text cannot be ALL CAPS"

  VALID CTA format:
    "[anchor text](URL)" -- plain markdown link in text
    "You can learn more at [site name]." -- natural text reference
```

---

## STRUCTURAL FIX 2: RECOMMENDATION TONE GATE

### The Problem
AI defaults to direct-response copywriting patterns in the bridge. "Buy now", "Don't miss this", "Act fast" are deeply trained patterns that surface when the AI knows it's writing toward a purchase.

### The Fix

```yaml
recommendation_tone_check:
  SCAN bridge text for:
    sales_language: ["buy now", "order today", "add to cart", "get yours",
                     "claim your", "act fast", "limited time"]
    urgency_language: ["while supplies last", "only [N] left",
                       "expires", "today only", "last chance"]
    close_language: ["what are you waiting for", "you deserve this",
                     "imagine how", "the time to act is now"]

    IF any found:
      HALT: "Sales/urgency/close language detected: [phrase]"
      ACTION: Rewrite in recommendation framing

  REQUIRED recommendation markers (at least 1):
    - "If you're interested in learning more..."
    - "For those who want to explore this further..."
    - "Based on my research, I'd suggest looking into..."
    - "[Expert name] recommends..."
```

---

## STRUCTURAL FIX 3: TRANSITION GRADUALNESS ENFORCEMENT

### The Problem
AI makes an abrupt transition: body paragraph about research findings, then immediately "Click here to buy!" This seam is the most common point where readers detect the ad.

### The Fix

```yaml
transition_check:
  MEASURE transition gradient:
    body_last_paragraph_tone: [editorial score 1-10]
    bridge_first_paragraph_tone: [editorial score 1-10]
    gap: abs(body_tone - bridge_tone)

    IF gap > 3:
      HALT: "Transition too abrupt (gap = [N]). Must be gradual."
      ACTION: Add transitional paragraph between body and bridge

  REQUIRED transition pattern:
    body_last_paragraph -> transitional_thought -> recommendation -> CTA
    NOT: body_last_paragraph -> CTA
```

---

## FORBIDDEN RATIONALIZATIONS

| Rationalization | Why It's Invalid | Required Response |
|-----------------|------------------|-------------------|
| "Multiple CTAs increase conversion" | Multiple CTAs = ad signal = trust loss | HALT -- Single CTA |
| "A button is more clickable" | Button = ad design = editorial violation | HALT -- Text link |
| "Urgency drives action" | Urgency = sales tactic = editorial violation | HALT -- Remove |
| "This is how sales pages work" | This is NOT a sales page, it's an advertorial | HALT -- Recommendation frame |
| "The client wants aggressive CTAs" | Client wants conversions; editorial CTAs convert better long-term | HALT -- Explain to client |
| "Arena is optional for bridge" | Arena is mandatory per system protocol | HALT -- Execute Arena |

---

## BINARY GATE ENFORCEMENT

```
VALID: COMPLETE, PASS
FORBIDDEN: PARTIAL_PASS, CONDITIONAL_PASS, SOFT_PASS
IF forbidden status: HALT -> DELETE -> RETURN -> Re-evaluate
```

---

## PER-MICROSKILL OUTPUT PROTOCOL

| Layer | Microskill | Output File | Min Size |
|-------|-----------|-------------|----------|
| 0 | 0.1-upstream-loader | layer-0-outputs/0.1-upstream-loader.md | 1KB |
| 0 | 0.2-specimen-calibrator | layer-0-outputs/0.2-specimen-calibrator.md | 2KB |
| 0 | 0.3-input-validator | layer-0-outputs/0.3-input-validator.md | 1KB |
| 1 | 1.1-bridge-frame-selector | layer-1-outputs/1.1-bridge-frame-selector.md | 2KB |
| 1 | 1.2-transition-planner | layer-1-outputs/1.2-transition-planner.md | 2KB |
| 2 | 2.1-bridge-generator | layer-2-outputs/2.1-bridge-generator.md | 4KB |
| 4 | 4.1-recommendation-tone-checker | layer-4-outputs/4.1-tone-checker.md | 2KB |
| 4 | 4.2-single-cta-validator | layer-4-outputs/4.2-cta-validator.md | 1KB |
| 4 | 4.3-output-packager | layer-4-outputs/4.3-output-packager.md | 1KB |

---

## IMPLEMENTATION CHECKLIST

```
PRE-EXECUTION:
[ ] ADV-03-ANTI-DEGRADATION.md read
[ ] ADV-03-AGENT.md read
[ ] Body draft and strategy validated as inputs

LAYER 0: Body draft + strategy + specimens loaded
LAYER 1: Bridge frame selected, transition planned
LAYER 2: Bridge + CTA combinations generated (5+)
LAYER 2.5 (ARENA):
[ ] ARENA-LAYER.md READ (MANDATORY — contains skill-specific judging criteria)
[ ] ARENA-CORE-PROTOCOL.md READ (path: ~system/protocols/ARENA-CORE-PROTOCOL.md)
[ ] ARENA-PERSONA-PANEL.md READ (path: ~system/protocols/ARENA-PERSONA-PANEL.md)
[ ] Persona names VERIFIED against protocol: Makepeace, Halbert, Schwartz, Ogilvy, Clemens, Bencivenga, The Architect
[ ] All 7 competitors generated
[ ] Arena completed, human selected
LAYER 4: Recommendation tone verified, single CTA verified, packaged

POST-EXECUTION:
[ ] CTA count confirmed = 1
[ ] CTA format confirmed = text link
[ ] Zero sales/urgency language
[ ] Transition gradient <= 3
```

---

## KEY INSIGHT

> **"The bridge is where advertorials die. The shift from 'article I trust' to 'ad selling me something' destroys all the goodwill the hook, lead, and body built. The bridge must feel like a friend saying 'I found something you might like' -- never like a salesperson saying 'Buy this now.'"**

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial creation: single CTA enforcement, recommendation tone gate, transition gradualness enforcement, Law 4/5 structural fixes |
