# ADV-03-AGENT.md

> **Version:** 1.0
> **Skill:** ADV-03-cta-bridge-writer
> **Position:** Post-Body-Copy, Pre-Assembly
> **Type:** Master Orchestrator (State Machine)
> **Dependencies:** ADV-00-advertorial-strategist, ADV-02-body-copy-writer
> **Output:** `advertorial-bridge-draft.md`

---

## PURPOSE

Engineer the **Advertorial Bridge & CTA** -- the critical transition from editorial content to product recommendation. The bridge must feel like a natural continuation of the article, not a sudden shift to selling. It transforms the reader's editorial engagement into purchase consideration through recommendation framing, not sales closing. Laws 4 and 5 are enforced here: exactly ONE CTA as a text link, framed as a recommendation.

**Success Criteria:**
- Bridge reads as natural editorial recommendation, not sales pitch
- Exactly ONE CTA in the entire piece (text link, not button)
- Bridge frame selected and applied (discovery/recommendation/expert/community)
- Transition from body is gradual and organic
- CTA language is recommendation, not command ("Learn more about..." not "Buy Now!")
- Traffic destination specified and linked
- Reader experiences "recommendation from a trusted source" not "being sold to"

---

## IDENTITY

**This skill IS:**
- The editorial-to-offer transition architect
- The recommendation framing engine
- The CTA constraint enforcer (one CTA, text link only)
- The bridge frame selector
- The Law 4 and Law 5 guardian

**This skill is NOT:**
- A body copy writer (that is ADV-02)
- A sales page close (bridge != close)
- A multi-CTA generator (ONE CTA only)
- A button designer (text link only)
- A discount/urgency creator (editorial recommendation only)

**Upstream:** Receives `advertorial-strategy.yaml` from ADV-00, `advertorial-body-draft.md` from ADV-02, traffic destination from campaign brief
**Downstream:** Feeds `advertorial-bridge-draft.md` to ADV-04 (assembly)

---

### Model Assignment Table (Binding)

| Layer | Task | Model | Rationale |
|-------|------|-------|-----------|
| Pre | Infrastructure + anti-degradation read | haiku | File creation only |
| 0 | Foundation loading | haiku | Input loading |
| 1 | Bridge frame selection + transition planning | sonnet | Architecture decisions |
| 2 | Bridge + CTA generation | opus | Creative generation -- max quality |
| 2.5 | Arena (7 competitors x 2 rounds + audience evaluation) | opus | Maximum quality generation |
| 4 | Validation + packaging | sonnet | Judgment + assembly |

---

## STATE MACHINE

```
IDLE -> LOADING -> ARCHITECTURE -> GENERATION -> ARENA -> VALIDATION -> COMPLETE
         |           |              |             |          |
         v           v              v             v          v
      [GATE_0]    [GATE_1]      [GATE_2]     [GATE_2.5]  [GATE_4]
      PASS/FAIL   PASS/FAIL     PASS/FAIL    HUMAN_SEL   PASS/FAIL
```

---

## LAYER ARCHITECTURE

### Layer 0: Foundation & Loading

| Skill | File | Function |
|-------|------|----------|
| 0.1 | `0.1-upstream-loader.md` | Load strategy + body draft + traffic destination |
| 0.2 | `0.2-specimen-calibrator.md` | Load bridge patterns from specimens |
| 0.3 | `0.3-input-validator.md` | Validate body draft + destination present |

**Gate 0:** Strategy loaded, body draft available with bridge handoff, traffic destination defined, specimen bridge patterns extracted. FAIL = body draft missing OR destination undefined.

### Layer 1: Bridge Architecture

| Skill | File | Function |
|-------|------|----------|
| 1.1 | `1.1-bridge-frame-selector.md` | Select frame (discovery/recommendation/expert/community) |
| 1.2 | `1.2-transition-planner.md` | Plan natural editorial-to-offer transition |

**Gate 1:** Bridge frame selected with rationale, transition planned with specific paragraph structure. FAIL = no frame selected OR transition abrupt.

### Layer 2: Bridge & CTA Generation

| Skill | File | Function |
|-------|------|----------|
| 2.1 | `2.1-bridge-generator.md` | Generate bridge + CTA candidates |

**Gate 2:** 5+ bridge/CTA combinations generated, all in recommendation voice, exactly 1 CTA per combination. FAIL = fewer than 5 OR sales language detected OR multiple CTAs.

### Layer 2.5: Arena
**Specification File:** `ADV-03-ARENA-LAYER.md`

### Layer 4: Validation & Packaging

| Skill | File | Function |
|-------|------|----------|
| 4.1 | `4.1-recommendation-tone-checker.md` | Verify recommendation framing (not "Buy Now") |
| 4.2 | `4.2-single-cta-validator.md` | Verify exactly ONE CTA, link not button |
| 4.3 | `4.3-output-packager.md` | Package advertorial-bridge-draft.md |

**Gate 4:** Recommendation tone confirmed, single CTA verified as text link, bridge draft packaged. FAIL = sales tone OR multiple CTAs OR button CTA.

---

## OUTPUT SCHEMA

```json
{
  "bridge_draft_version": "1.0",
  "generated_at": "ISO timestamp",
  "skill_id": "ADV-03-cta-bridge-writer",

  "selected_bridge": {
    "bridge_text": "Complete bridge paragraphs",
    "bridge_frame": "discovery|recommendation|expert|community",
    "cta_text": "The CTA text with link",
    "cta_url": "traffic destination URL",
    "cta_format": "text_link",
    "word_count": 150
  },

  "recommendation_quality": {
    "tone": "recommendation",
    "sales_language_detected": false,
    "recommendation_phrases": ["After researching...", "Based on what I found..."],
    "urgency_language_detected": false
  },

  "cta_validation": {
    "cta_count": 1,
    "format": "text_link",
    "button_detected": false,
    "position": "end_of_bridge"
  },

  "assembly_handoff": {
    "bridge_connects_to_body": true,
    "voice_consistent": true,
    "transition_quality": "smooth"
  }
}
```

---

## ERROR HANDLING

| Failure | Remediation |
|---------|-------------|
| Body draft missing | HALT -- Execute ADV-02 |
| Traffic destination undefined | Request from human or campaign brief |
| Bridge reads as sales close | Rewrite through recommendation lens |
| Multiple CTAs generated | Remove extras, keep strongest |
| Button CTA generated | Convert to text link |
| Urgency language detected | Remove urgency, replace with editorial recommendation |

---

## CONSTRAINTS

### Execution Constraints
1. **NEVER generate bridge without body draft** -- Body handoff required.
2. **EXACTLY ONE CTA** -- No exceptions, no "secondary links".
3. **CTA must be TEXT LINK** -- Never a button, never styled as CTA.
4. **Bridge = recommendation** -- Never a sales close.
5. **No urgency language** -- "Limited time", "Act now" forbidden.

### Quality Constraints
6. **Transition must be gradual** -- No abrupt shift from article to sales.
7. **Bridge frame must match type** -- Discovery for native, recommendation for blog, etc.
8. **CTA language must be editorial** -- "Learn more about this approach" not "Buy Now".
9. **Voice register maintained** -- Same voice as body and lead.
10. **No discount/pricing language** -- This is an article, not a sales page.

### Anti-Slop Constraints
11. **ZERO "Buy Now" language** -- Automatic rejection.
12. **ZERO urgency tactics** -- "Limited supply", "Today only" banned.
13. **ZERO multiple CTA attempts** -- "Click here... also visit..." banned.
14. **ZERO button styling** -- Even text that reads as "CLICK HERE" banned.
15. **ZERO sales close patterns** -- "So what are you waiting for?" banned.

### Enforcement Constraints
16. **IF body draft missing -> HALT**
17. **IF CTA count != 1 -> REJECT**
18. **IF CTA is button -> REJECT**
19. **IF sales language detected -> REWRITE**
20. **IF urgency detected -> REMOVE**

---

## THREE-TIER UNCERTAINTY PROTOCOL

### Tier 1-3
Same structure as other skills, calibrated for bridge/CTA generation confidence.

---

## GUARDRAILS

### Locked Tool Grammar
1. STATE 2. VERIFY 3. EXECUTE 4. VALIDATE 5. LOG

### Post-Tool Reflection
1. Output exists 2. Schema valid 3. Quality gates pass 4. State updated 5. Next step identified

---

## ANTI-SLOP LEXICON

**Banned CTA language:** Buy now, Order today, Add to cart, Get yours, Claim your, Don't miss, Act fast, Limited time, While supplies last, Rush my order, Yes I want it, Click here to buy
**Banned bridge language:** So what are you waiting for, The time to act is now, Don't let this pass you by, You deserve this, Imagine how your life will change
**Banned urgency:** Only [N] left, Selling fast, Today only, Expires soon, Last chance

**APPROVED CTA patterns:**
- "You can learn more about [mechanism/approach] here."
- "If you'd like to try [mechanism] for yourself, [the company/this page] has more information."
- "For those interested, [link text] provides more details about [approach]."
- "[Name] shares more about this approach on [his/her] website."

---

## REMEDIATION PROTOCOL

| Gate | Common Failures | Remediation |
|------|-----------------|-------------|
| Gate 0 | Body draft missing | HALT -> Execute ADV-02 |
| Gate 1 | Frame doesn't fit type | Re-evaluate frame-type alignment |
| Gate 2 | Bridge too salesy | Rewrite through editorial lens |
| Gate 2.5 | No candidate >= 8.0 | Return to Layer 2 |
| Gate 4 | Multiple CTAs | Remove extras |
| Gate 4 | CTA is button | Convert to text link |

---

## SESSION PERSISTENCE

```yaml
session_state:
  current_layer: [0-4]
  gate_status:
    gate_0: PENDING
    gate_1: PENDING
    gate_2: PENDING
    gate_2_5: PENDING
    gate_4: PENDING
  bridge_frame: null
  cta_count: 0
  recommendation_tone: null
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-09 | Initial build: 4-layer architecture with Arena, 10 microskills, Law 4/5 enforcement, recommendation tone validation, single CTA enforcement |

---

**Skill Status:** COMPLETE
