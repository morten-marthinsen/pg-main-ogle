# Vertical Profile — Technology / Consumer Tech

**Version:** 1.0
**Created:** 2026-02-20
**Vertical:** technology
**Primary Clients:** Forbes Wireless, and similar
**Display Name:** Technology / Consumer Tech

---

## Persona Panel Configuration

Technology uses the STANDARD persona panel. Ogilvy is particularly strong here — his original work was for consumer products and technology (Rolls-Royce, Shell). The credibility-first, research-grounded approach maps well to tech-skeptical consumers.

| Slot | Persona | Why This Persona for Technology |
|------|---------|--------------------------------|
| 1 | **makepeace** | Flow & Architecture — complex tech benefits need clear persuasion flow. |
| 2 | **halbert** | Entertainment & Hook — tech copy can be dry. Halbert's personality prevents it. |
| 3 | **schwartz** | Market Sophistication — tech markets move fast. Sophistication calibration is critical. |
| 4 | **ogilvy** | Credibility & Clarity — Ogilvy's BEST work was consumer products/tech. Rolls-Royce, Shell. This IS his domain. |
| 5 | **clemens** | Scientific Mechanism — tech products have real mechanisms. Clemens' simplification translates well. |
| 6 | **bencivenga** | Proof-First Persuasion — tech audiences want specs, comparisons, real-world performance data. |
| 7 | **architect** | Integration & Synthesis — always present. |

---

## Specimen Directories

```yaml
system_1_override: "vertical-specimens/technology/system-1/"
system_2_override: "vertical-specimens/technology/system-2/"
```

### System 1 Specimen Status
Technology-specific System 1 specimens to be curated. This vertical has LIMITED traditional DR examples — may need to adapt format (shorter copy, comparison-heavy, spec-driven).

### System 2 Specimen Status
Current persona specimens with tech relevance:
- Ogilvy: Rolls-Royce (precision engineering), Shell (technical authority), Zippo (product demonstration) — strongest fit of any persona
- Others: limited direct tech applicability

### Important Note
Technology is the most challenging vertical for the CopywritingEngine because:
1. Traditional DR formats (long-form VSLs, magalogs) are less common for tech
2. Tech audiences consume differently (comparison shopping, spec sheets, reviews)
3. Limited specimen base in the DR canon
4. May need adapted copy formats (shorter, more visual, comparison-heavy)

---

## Vertical-Specific Taste Defaults

```yaml
taste_defaults:
  voice_register: "knowledgeable tech reviewer who's actually tested it — not a spec sheet, not an infomercial"
  emotional_range:
    floor: "clear, factual product explanation"
    ceiling: "genuine excitement about a real innovation"
  anti_voice:
    - "infomercial hype — tech audiences detect this instantly"
    - "jargon overload — accessible expertise, not engineering manual"
    - "health/supplement language — no 'natural' or 'ancient' framing"
    - "fear-mongering — tech products solve problems, not existential threats"
  energy_signature: "informed, specific, demonstration-oriented, comparison-aware"
  proof_style: "specs + real-world performance — benchmarks, comparisons, user reviews, expert testing"
  pacing: "identify pain point → demonstrate solution → prove with specifics → compare alternatives → close"
```

---

## Vertical-Specific Anti-Slop

```yaml
vertical_anti_slop:
  health_contamination:
    - "hidden toxin"
    - "ancient remedy"
    - "natural cure"
    - "clinical studies"
  finance_contamination:
    - "wealth secret"
    - "passive income"
    - "market opportunity"
  personal_dev_contamination:
    - "unlock your potential"
    - "transform your life"
    - "spiritual awakening"
  tech_cliches:
    - "game-changing technology"
    - "revolutionary innovation"
    - "disrupting the industry"
    - "next-generation solution"
    - "cutting-edge"
    - "state-of-the-art"
    - "powered by AI"  # Unless literally true and relevant
```

---

## Technology Market Context

### Audience Profile
- Broad age range (25-65) depending on product
- Tech-savvy enough to comparison shop
- Research-heavy buyers — read reviews, watch videos, compare specs
- Low tolerance for hype, high respect for specifics
- Brand loyalty exists but can be broken by clear value proposition
- Price-conscious but willing to pay for proven quality

### Market Sophistication
- Varies by product category:
  - Consumer electronics: Stage 4-5 (comparison-stage)
  - Wireless/telecom: Stage 3-4 (mechanism-stage — network technology differentiators)
  - Emerging tech (AI tools, etc.): Stage 2-3 (education-stage — still explaining what it does)
  - Accessories/peripherals: Stage 4 (mechanism/feature differentiation)

### Proof Architecture (Technology-Specific)
- Specification comparisons (benchmarks, measurements)
- Independent review scores and quotes
- Real-world performance testing (battery life, speed, coverage, etc.)
- User testimonials with specific use cases
- Expert/publication endorsements (tech reviewers, publications)
- Warranty/guarantee terms
- Price-to-value comparisons

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-20 | Initial creation |
