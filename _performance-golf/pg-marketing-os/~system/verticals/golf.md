# Vertical Profile — Golf / Sports Instruction

**Version:** 1.0
**Created:** 2026-02-20
**Vertical:** golf
**Primary Client:** Performance Golf
**Display Name:** Golf / Sports Instruction

---

## Persona Panel Configuration

The Arena uses these 7 competitors for golf projects. Slot 4 (Ogilvy) is replaced by Donnie French — a golf-native copywriter whose voice, proof patterns, and audience instincts are calibrated for golf instruction buyers.

| Slot | Persona | Why This Persona for Golf |
|------|---------|--------------------------|
| 1 | **makepeace** | Flow & Architecture — universal. Persuasion momentum works in every niche. |
| 2 | **halbert** | Entertainment & Hook — universal. Golf audiences respond strongly to personality-driven copy. |
| 3 | **schwartz** | Market Sophistication — essential. Golf instruction market is highly sophisticated (Stage 4-5). |
| 4 | **donnie-french** | Golf-native DTC voice. REPLACES Ogilvy. Conversational authority, golfer-to-golfer relatability. |
| 5 | **clemens** | Scientific Mechanism — valuable for golf. Swing mechanics, training science, body movement explanations. |
| 6 | **bencivenga** | Proof-First Persuasion — universal. Score improvements, handicap drops, tournament results = proof architecture. |
| 7 | **architect** | Integration & Synthesis — always present. |

### Critic & Judge
- **Critic:** Standard adversarial role (unchanged)
- **Judge:** Standard scoring role (unchanged)

---

## Specimen Directories

```yaml
system_1_override: "vertical-specimens/golf/system-1/"
system_2_override: "vertical-specimens/golf/system-2/"
```

### System 1 (Per-Skill Gold Specimens)
When a golf-specific System 1 file exists for a skill, it REPLACES the universal 0.2.6 file as the primary statistical attractor. Universal specimens may supplement if context allows.

### System 2 (Persona Voice Specimens)
For Donnie French: load from `vertical-specimens/golf/system-2/donnie-french/`
For other personas: use universal `persona-specimens/` with golf-relevant selection priority.

---

## Vertical-Specific Taste Defaults

These merge into the project's Soul.md at load time, providing golf-specific defaults that the human can override.

```yaml
taste_defaults:
  voice_register: "coaching conversation on the range — instructor to serious golfer who wants real improvement"
  emotional_range:
    floor: "quiet confidence, knowing patience"
    ceiling: "fired-up conviction about a breakthrough technique"
  anti_voice:
    - "clinical/medical tone — golf is not a health condition"
    - "financial urgency — no scarcity manipulation around tee times"
    - "guru/enlightened tone — golf instruction is practical, not spiritual"
    - "infomercial hype — golfers are skeptical, educated buyers"
    - "corporate jargon — this is one golfer talking to another"
    - "health supplement language — no 'ancient secrets' or 'hidden toxins'"
  energy_signature: "confident, knowledgeable, fellow-golfer, results-focused"
  proof_style: "results-first — handicap drops, stroke reductions, round scores, tour-level stats, student transformations"
  pacing: "conversational with technical precision — like explaining a drill on the range, not lecturing from a podium"
```

---

## Vertical-Specific Anti-Slop

Words and patterns that leak in from other verticals and contaminate golf copy:

```yaml
vertical_anti_slop:
  health_contamination:
    - "revolutionary breakthrough"
    - "hidden toxin"
    - "ancient secret"
    - "miracle cure"
    - "doctor-recommended"
    - "clinical studies show"
    - "your body's natural"
  finance_contamination:
    - "wealth secret"
    - "financial freedom"
    - "market crash"
    - "retire early"
    - "passive income"
  personal_dev_contamination:
    - "unlock your potential"
    - "manifest your destiny"
    - "inner transformation"
    - "spiritual awakening"
    - "mindset shift"
  generic_dr_contamination:
    - "what they don't want you to know"
    - "the establishment is hiding"
    - "one weird trick"
    - "doctors hate this"
```

---

## Golf Market Context

### Audience Profile
- Serious recreational golfers (10-25 handicap typical)
- Male-skewed (75%+), age 35-65
- Disposable income for instruction, equipment, experiences
- Have tried multiple instruction methods — sophisticated buyers
- Skeptical of "magic fix" claims but hungry for genuine improvement
- Identity tied to their golf game — handicap is personal

### Market Sophistication
- **Schwartz Stage 4-5** — highly sophisticated market
- Claims are burned: "add 30 yards," "fix your slice forever," "secret the pros use"
- Mechanism-stage: need to explain WHY this approach works differently
- Identification-stage for premium: "for the golfer who's tried everything"

### Proof Architecture (Golf-Specific)
- Stroke/score improvements (before/after with specifics)
- Handicap drops (most credible single metric)
- Student testimonials with specifics (name, location, handicap change)
- Tour player endorsements or usage
- Instructor credentials (PGA status, years teaching, notable students)
- Video demonstrations (visible technique change)

---

## Niche Matching Guide (Golf Vertical)

When selecting specimens for golf projects, prioritize:

| Persona | Best Golf-Relevant Specimens | Why |
|---------|------------------------------|-----|
| **Makepeace** | Info-product controls (Speed Profits structure) | Golf instruction = info product. Makepeace's proof-story-mechanism flow maps perfectly. |
| **Halbert** | Boron Letters (personality, directness) + newsletter hooks | Halbert's raw personality translates to the "buddy at the range" voice. |
| **Schwartz** | Process essay + any info-product-adjacent ad | Schwartz's sophistication calibration is critical for Stage 4-5 golf market. |
| **Donnie French** | ALL specimens (golf-native) | Every Donnie specimen is directly relevant. |
| **Clemens** | Bio Complete 3 (mechanism architecture) | Clemens' mechanism simplification technique transfers to explaining swing mechanics. |
| **Bencivenga** | 100-seminar-letter (high-ticket info) + Persuasion Equation (maxim-12) | Golf instruction is high-ticket info product. Bencivenga's proof architecture maps directly. |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-20 | Initial creation |
