# Neco Specimen Vault

> Proven winners for statistical attraction. VERBATIM text only — never summarized.

## Core Principle

From CopywritingEngine Learning #41: "Statistical attraction requires VERBATIM text." Specimens in this vault are exact copies of winning creative — never paraphrased, never summarized, never "inspired by." Sub-agents load type-matched specimens before generation to calibrate quality and style.

## Directory Structure

```
_vault/
  hooks/
    by-style/       # Organized by style from style library
    by-product/     # Organized by PG product
    by-format/      # Organized by format (Education, etc.)
  scripts/
    by-format/      # Organized by script format (15s, 30s, 60s+, VSL)
    by-angle-type/  # Organized by angle type (wound, desire, mechanism)
  angles/
    by-product/     # Organized by PG product
    by-framework/   # Organized by behavioral framework used
```

## Specimen Schema

Each specimen file contains:

```yaml
specimen_id: "VAULT-[type]-[seq]"
source: "Where this came from (ad ID, campaign name, date)"
product: "[PG product]"
format: "[Format type]"
style: "[Style from style library]"
framework: "[Behavioral framework]"
angle_type: "wound | desire | mechanism"
performance_data:
  spend: "$X"
  cpa: "$X"
  roas: "X.Xx"
  status: "winner | scale | test"
date_added: YYYY-MM-DD
promoted_from: "Neco-YYYY-MM-DD-[type]-[seq]"  # Output archive ID
```

### Annotation (2-3 sentences)

Why this specimen works. What makes it specifically effective — not generic praise but structural analysis. What sub-agents should learn from it.

### Verbatim Text

[EXACT copy — never edited, summarized, or "improved"]

---

## Loading Protocol

Sub-agents load type-matched specimens before generation:

| Sub-Agent | Loads From |
|-----------|-----------|
| #3 Ad Angle Ideation | `angles/by-product/`, `angles/by-framework/` |
| #4 Ad Hook Generation | `hooks/by-style/`, `hooks/by-product/` |
| #5 Ad Script Generation | `scripts/by-format/`, `scripts/by-angle-type/` |
| #8 Quality Validator | All (for calibration during scoring) |

**Context budget**: Load 2-3 relevant specimens max per generation task. Do not load the entire vault.

## Admission Gate

**Minimum $50,000 ad spend required for vault admission.** This vault is a reference library of proven winners at scale — not flash-in-the-pan performers that might die in a month. The $50K threshold ensures specimens have been validated by real market pressure over sustained spend, matching the quality bar of multi-million dollar reference promos.

| Criterion | Threshold | Why |
|-----------|-----------|-----|
| Ad spend | $50,000+ | Proves the ad scales, not just converts |
| Performance status | "scale" or "winner" | Must have moved past test phase |
| Data completeness | CPA + ROAS required | No specimens without real performance data |

Ads below the $50K threshold belong in `_output/` as archived deliverables, not in the vault.

## Population

This vault is populated **organically** — winners from `_output/` are promoted here when they meet the admission gate above. No pre-population required. The vault will grow as Neco produces and tests creative at PG.
