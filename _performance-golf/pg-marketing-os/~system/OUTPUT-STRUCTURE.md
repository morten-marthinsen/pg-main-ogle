# Output Folder Structure

**Version:** 1.0
**Created:** 2026-03-06
**Purpose:** Standardize how project outputs are organized across campaigns

---

## STRUCTURE

All skill outputs for a project are stored under a project-code directory:

```
~outputs/
  [project-code]/
    # Foundation Skill Outputs (Skills 00-09)
    research-package.json
    classified-quotes.json
    proof-inventory-output.json
    root-cause-package.yaml
    mechanism-package.json
    promise-package.json
    offer-package.json
    persona-package.json
    structure-package.json
    campaign-brief-package.json

    # Reasoning Captures (from Analytical Reasoning Capture Protocol)
    reasoning-captures/
      01-research-reasoning.yaml
      01-fssit-reasoning.yaml
      01-expectation-schema-reasoning.yaml
      03-root-cause-arena-reasoning.yaml
      04-mechanism-arena-reasoning.yaml
      05-big-idea-arena-reasoning.yaml

    # Context Reservoir (human-curated, created after foundation)
    context-reservoir.md

    # Long-Form Copy Outputs (Skills 10-20)
    headline-package.json
    lead-package.json
    lead-assembled-prose.md
    story-package.json
    story-assembled-prose.md
    root-cause-narrative-package.json
    root-cause-narrative-assembled-prose.md
    mechanism-narrative-package.json
    mechanism-narrative-assembled-prose.md
    product-introduction-package.json
    product-introduction-assembled-prose.md
    offer-copy-package.json
    offer-copy-assembled-prose.md
    close-package.json
    close-assembled-prose.md
    proof-weaving-package.json
    assembled-draft.md
    campaign-assembly-package.json
    editorial-report.json

    # Ad Engine Outputs (Skills A01-A12)
    ads/
      ad-concepts.json
      ad-copy-variants.json
      ad-creative-briefs.json

    # Email Engine Outputs (Skills E0-E4)
    email/
      email-sequence.json
      email-copy/

    # Organic Engine Outputs (Skills S01-S24)
    organic/
      social-copy/
      content-calendar.json

    # Upsell Engine Outputs (Skills U0-U5)
    upsell/
      upsell-sequence.json
      upsell-copy/

    # PDP Pipeline Outputs (Skills PDP-01–PDP-17, via 04-page-builder)
    pdp/
      pdp-strategy.yaml
      feature-package.json
      pdp-copy/
        hero-copy-draft.md
        section-copy-package.json
        section-copy-assembled.md
        micro-scripts.json
      pdp-copy-assembled.md
      pdp-copy-final.md

    # Advertorial Engine Outputs (Skills ADV-00–ADV-05)
    advertorial/
      advertorial-strategy.yaml
      advertorial-copy/
        advertorial-lead-draft.md
        advertorial-body-draft.md
        advertorial-bridge-draft.md
      advertorial-assembled.md
      advertorial-final.md

    # Checkout Engine Outputs (Skills CK-00–CK-03)
    checkout/
      checkout-strategy.yaml
      checkout-copy/
        trust-copy-package.json
        checkout-microcopy-package.json
      checkout-copy-final.md
      checkout-audit-report.md
```

---

## PROJECT CODES

Project codes are short identifiers that uniquely name a campaign. They are assigned by the team when a project starts.

**Format:** 2-4 uppercase letters + optional number

**Examples:**
- `RS1` — Roger's Swing (campaign 1)
- `SPD` — Speed Distance
- `SF2` — Straight Flight (campaign 2)
- `NRG` — Energy Formula
- `FCS` — Focus Supplement
- `GHF` — Gut Health Formula
- `DTX` — Detox Program
- `VCE` — Voice Course (campaign 1)

**Rules:**
- Use the project code consistently across ALL outputs
- The project code appears in the folder path: `~outputs/RS1/`
- Use the same code when referencing outputs in handoff packages
- If a campaign has multiple versions, append a number: `RS1`, `RS2`

---

## ASSEMBLED PROSE FILES

A key addition to the output structure is the **assembled prose** files. These are the ACTUAL WRITTEN COPY from each section, saved as markdown:

| File | Source Skill | Purpose |
|------|-------------|---------|
| `lead-assembled-prose.md` | Skill 11 | Full lead text as written |
| `story-assembled-prose.md` | Skill 12 | Full story text as written |
| `root-cause-narrative-assembled-prose.md` | Skill 13 | Full root cause narrative as written |
| `mechanism-narrative-assembled-prose.md` | Skill 14 | Full mechanism narrative as written |
| `product-introduction-assembled-prose.md` | Skill 15 | Full product intro as written |
| `offer-copy-assembled-prose.md` | Skill 16 | Full offer copy as written |
| `close-assembled-prose.md` | Skill 17 | Full close as written |

These files are loaded by the NEXT skill in sequence to maintain voice continuity and prevent content repetition. They are distinct from the `-package.json` files, which contain structured metadata.

**Each copy skill (11-17) must output BOTH:**
1. A structured package (`.json`) with metadata, handoff data, and scores
2. An assembled prose file (`.md`) with the actual written copy

---

## MIGRATION NOTE

Previously, outputs were saved to skill-specific directories like `04-mechanism/outputs/`. The new structure consolidates everything under `~outputs/[project-code]/`. During the transition, upstream loaders should check BOTH the legacy path and the new path:

```
PRIMARY PATH: ~outputs/[project-code]/mechanism-package.json
FALLBACK PATH: 04-mechanism/outputs/mechanism-package.json
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-06 | Initial creation. Standardized output folder structure with project codes, assembled prose files, and reasoning captures directory. |
