# Vertical Profile — Health / Supplements / Wellness

**Version:** 1.0
**Created:** 2026-02-20
**Vertical:** health
**Primary Clients:** (per-project — health/supplements/wellness verticals)
**Display Name:** Health / Supplements / Wellness

---

## Persona Panel Configuration

Health uses the STANDARD persona panel. All 6 existing personas have health-relevant specimens, and Clemens is specifically health-native.

| Slot | Persona | Why This Persona for Health |
|------|---------|----------------------------|
| 1 | **makepeace** | Flow & Architecture — Shameless Sobs and 17-Cent Life Saver are health controls. |
| 2 | **halbert** | Entertainment & Hook — personality-driven health copy breaks through skepticism. |
| 3 | **schwartz** | Market Sophistication — health market varies widely by sub-niche (Stage 3-5). |
| 4 | **ogilvy** | Credibility & Clarity — health claims REQUIRE credibility architecture. Ogilvy's research-first approach is essential. |
| 5 | **clemens** | Scientific Mechanism — Clemens IS the health persona. Golden Hippo's mechanism-first approach dominates supplements. |
| 6 | **bencivenga** | Proof-First Persuasion — health audiences need proof stacking (studies, testimonials, doctor endorsements). |
| 7 | **architect** | Integration & Synthesis — always present. |

---

## Specimen Directories

```yaml
system_1_override: "vertical-specimens/health/system-1/"
system_2_override: "vertical-specimens/health/system-2/"
```

### System 1 Specimen Status
Health-specific System 1 specimens to be curated. Until populated, falls back to universal 0.2.6 files (which already skew health-heavy).

### System 2 Specimen Status
Current persona specimens already have strong health coverage:
- Makepeace: Shameless Sobs, 17-Cent Life Saver (2 health controls)
- Clemens: All 3 Gundry VSLs (Bio Complete 3, Total Restore, Vital Reds)
- Schwartz: burn-disease, miracle-diet-arthritis, swedish-miracle, british-miracle, models-stay-young, miracle-drug-reverses-aging
- Ogilvy: Dove (body care)
- Bencivenga: Kurobuta Ham, Olive Oil Club (food/wellness adjacent)

---

## Vertical-Specific Taste Defaults

```yaml
taste_defaults:
  voice_register: "trusted health advisor — knowledgeable friend who's done the research, not a doctor giving orders"
  emotional_range:
    floor: "empathetic understanding of health frustration"
    ceiling: "urgent conviction about a real solution"
  anti_voice:
    - "snake oil salesman — never hype unproven claims"
    - "fear-mongering without solution — always provide the path forward"
    - "condescending medical tone — reader is intelligent, not a patient"
    - "MLM enthusiasm — no 'life-changing opportunity' energy"
  energy_signature: "caring, informed, evidence-backed, hopeful"
  proof_style: "study-first with human testimonials — clinical evidence + real people's stories"
  pacing: "build concern → reveal mechanism → offer hope → prove it works"
```

---

## Vertical-Specific Anti-Slop

```yaml
vertical_anti_slop:
  finance_contamination:
    - "wealth secret"
    - "market opportunity"
    - "financial freedom"
    - "retire early"
  golf_contamination:
    - "shave strokes"
    - "on the range"
    - "handicap"
  personal_dev_contamination:
    - "manifest your destiny"
    - "spiritual awakening"
    - "mindset shift"
  compliance_sensitive:
    - "cure"           # Use "support" or "help with" instead
    - "treat"          # Use "address" or "target"
    - "guaranteed results"  # Must qualify
    - "proven to"      # Must cite specific study
```

---

## Health Market Context

### Audience Profile
- Adults 35-70, both genders (skews female for beauty/wellness, male for vitality/energy)
- Frustrated with conventional medicine OR looking for supplementary support
- Have tried multiple supplements — sophisticated buyers in saturated categories
- Skeptical of miracle claims but desperate for something that actually works
- Price-sensitive but willing to pay premium for quality/proof

### Market Sophistication
- Varies by sub-niche:
  - Gut health: Stage 4-5 (highly saturated, mechanism-stage)
  - Anti-aging: Stage 4-5 (identification-stage for premium)
  - Energy/vitality: Stage 3-4 (mechanism differentiators still work)
  - Niche supplements (e.g., EMF protection): Stage 2-3 (still education-stage)

### Proof Architecture (Health-Specific)
- Clinical studies (randomized, peer-reviewed preferred)
- Doctor/expert endorsements with credentials
- Before/after testimonials with specifics
- Ingredient research and mechanism of action
- Third-party testing / certifications
- Compliance considerations (FTC, FDA disclaimer requirements)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-20 | Initial creation |
