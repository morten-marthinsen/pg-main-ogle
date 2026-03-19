# Material Change Taxonomy

**Version:** 1.0
**Created:** 2026-03-18
**Purpose:** Classification of what constitutes a material change in the Marketing-OS pipeline. Determines whether a modification triggers the FACT-CHANGE-PROPAGATION-PROTOCOL.
**Authority:** Referenced by SYSTEM-CORE.md and PROTOCOL-MANIFEST.md. Companion to FACT-CHANGE-PROPAGATION-PROTOCOL.md.

---

## DEFINITION

A **material change** is any modification to a source value, strategic decision, or structural element that could alter the meaning, accuracy, or compliance of downstream outputs.

Material changes require propagation. Non-material changes do not.

---

## CHANGE CATEGORIES

### 1. Factual Changes
Modifications to verifiable data consumed by downstream skills.

- Product specifications (dimensions, weight, materials, compatibility)
- Pricing (retail price, discount tiers, shipping costs, subscription terms)
- Ingredients or formulation (active ingredients, dosages, sourcing)
- Clinical or scientific data (study results, sample sizes, statistical significance)
- Regulatory status (FDA classification, certifications, country-specific approvals)

### 2. Strategic Changes
Modifications to foundation-layer decisions that shape all downstream copy.

- Root cause pivot (Skill 03 conclusion changes)
- Mechanism reframe (Skill 04 concept or naming changes)
- Promise shift (Skill 05 core promise changes)
- Big Idea evolution (Skill 06 concept or expression changes)
- Offer stack modification (Skill 07 components, bonuses, or pricing architecture)

### 3. Structural Changes
Modifications to pipeline configuration or output architecture.

- Engine activation or deactivation (adding/removing e-comm, email, ads, etc.)
- Funnel restructure (page sequence, upsell flow, checkout configuration)
- Section architecture change (Skill 08 structural decisions revised)
- Campaign brief scope change (Skill 09 deliverables altered)

### 4. Voice/Tone Changes
Modifications to how copy sounds, not what it says.

- Persona adjustment (soul.md voice register shift)
- Formality shift (conversational to clinical, or reverse)
- Audience pivot (demographic or psychographic target change)
- Brand voice evolution (new brand guidelines received mid-pipeline)

### 5. Legal/Compliance Changes
Modifications driven by regulatory or legal requirements.

- Claim substantiation update (proof no longer supports a claim)
- Disclaimer requirement added or modified
- FTC guidance change affecting testimonials, earnings claims, or health claims
- Competitor cease-and-desist affecting comparative language
- Terms and conditions revision affecting guarantee or refund language

---

## THE MATERIALITY TEST

When a change is identified, ask these three questions:

**Question 1:** Does this change affect any claim, promise, or proof in downstream copy?
- If the changed value appears in or supports any customer-facing statement, YES.

**Question 2:** Does this change alter the strategic foundation (root cause, mechanism, promise, Big Idea)?
- If the change invalidates or shifts any Skill 03-06 output, YES.

**Question 3:** Could this change create a legal or compliance risk if not propagated?
- If leaving the old value in published copy could mislead, misrepresent, or violate regulations, YES.

```
IF ANY answer is YES:
  → MATERIAL CHANGE
  → Trigger FACT-CHANGE-PROPAGATION-PROTOCOL
  → Classify severity (S1 / S2 / S3) per that protocol

IF ALL answers are NO:
  → NON-MATERIAL CHANGE
  → No propagation required
  → Log in session notes for traceability
```

---

## NON-MATERIAL CHANGES (No Propagation Required)

These modifications do NOT trigger the propagation protocol:

- Typo fixes in internal notes or learning logs
- Formatting adjustments (markdown structure, heading levels, whitespace)
- Comment updates in YAML/JSON configuration files
- Learning log entries or session notes
- Internal process documentation edits
- Reordering of internal lists that do not affect output content
- Adding internal annotations or reminders

**Caution:** If a "typo fix" changes a number, name, or claim, it is NOT a typo fix — it is a factual change. Apply the materiality test.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial creation: 5 change categories, 3-question materiality test, non-material change exclusions. |
