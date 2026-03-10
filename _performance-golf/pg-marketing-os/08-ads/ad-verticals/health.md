# Ad Vertical Profile — Health / Supplements

**Version:** 1.0
**Created:** 2026-02-23
**Vertical:** health
**Display Name:** Health / Supplement Ads

---

## Ad Persona Panel Configuration

The Ad Arena uses these 7 competitors for health ad projects. Health advertising is defined by a single constraint: compliance. Every creative decision — hook, script, CTA, visual — must pass platform and regulatory review. The personas optimize within that boundary.

| Slot | Persona | Why This Persona for Health Ads |
|------|---------|--------------------------------|
| 1 | **DR Strategist** | Navigates the compliance-to-conversion balance. Health offers need aggressive direct response strategy wrapped in compliant language — this is the hardest optimization problem in advertising. |
| 2 | **Scroll Stopper** | Creates curiosity hooks that survive platform review. "Weird Food" and "Doctor Reveals" hooks must stop the scroll without triggering ad disapprovals. |
| 3 | **UGC Native** | UGC testimonials dominate health advertising. Real people sharing real results in authentic, unpolished formats outperform every other creative type. Platform-native authenticity is the competitive advantage. |
| 4 | **Brand Builder** | Builds trust in a vertical where trust is the scarcest resource. Doctor positioning, clinical backing, brand consistency — these compound over time to reduce CPA. |
| 5 | **Data Scientist** | Health campaigns live and die on metrics — hook-through rates on mechanism explainers, hold rates on doctor authority content, CVR on landing pages with different compliance angles. |
| 6 | **Visual Storyteller** | Crafts mechanism explainer narratives — the "here's what's actually happening inside your body" visual story that makes abstract health concepts tangible and believable. |
| 7 | **The Architect** | Integration & Synthesis — always present. |

### Critic & Judge
- **Critic:** Standard adversarial role (unchanged)
- **Judge:** Standard scoring role (unchanged)

### Panel Overrides (if any)
No overrides — standard panel. Health's emphasis on UGC, compliance navigation, and mechanism education maps directly to the default 7-persona strengths.

---

## Specimen Directories

```yaml
ad_specimens: "ad-persona-specimens/health/"
ad_persona_registry: "ad-persona-registry/"
```

---

## Dominant Hook Types

| Hook Type | Description | Why It Works for Health |
|-----------|-------------|-----------------------|
| Weird Food | "This Strange Purple Root Is Why Japanese Women Stay Slim After 60" | Curiosity-driven, compliance-friendly (describes a food, not a drug), and shareable. The dominant health ad hook format. |
| Doctor Reveals | "Harvard MD: Stop Taking This Common Supplement Immediately" | Authority + contrarian creates irresistible curiosity. Must use real, named physicians. |
| Ancient Secret | "2,000-Year-Old Remedy Modern Medicine Forgot" | Historical framing sidesteps compliance issues while maintaining intrigue. Works best for herbal/natural products. |
| Unique Mechanism | "The Real Reason Your Metabolism Slows Down After 40 (It's Not What You Think)" | Mechanism hooks position the product as the logical solution. The linchpin format for health DTC. |
| Testimonial Lead | "I Lost 47 Pounds After My Doctor Told Me to Quit Dieting" | Real person, specific result, counter-intuitive angle. UGC format. Must include "results may vary." |

---

## Script Structure Preferences

| Structure | Duration | When to Use |
|-----------|----------|-------------|
| Doctor Reveals | 2-5min | YouTube and Meta. Authority figure explains mechanism, reveals solution. Highest trust format. Needs real physician. |
| Testimonial Compilation | 60-120s | Meta and TikTok. Multiple real users sharing results in rapid sequence. Social proof through volume. |
| "Did You Know?" Educational | 60-180s | Mid-funnel mechanism education. Teaches something genuinely useful, then bridges to product. Value-first approach. |
| UGC Unboxing/First Impression | 30-60s | TikTok and Reels. Creator receives product, tries it, shares initial reaction. Authenticity is the entire selling point. |
| Mechanism Explainer | 90-180s | The workhorse format. Explains WHY the product works at a biological level using simple metaphors and visuals. |

---

## Platform Preferences

| Platform | Strength for Health | Format Notes |
|----------|-----------------------|--------------|
| TikTok | UGC testimonials and creator content dominate. Lowest CPA for awareness and TOF. | 30-90s. Raw, unpolished, authentic. Creator-first content. Compliance review is strict — plan for rejections. |
| Meta (FB/IG) | Longest-running health ad platform. Mechanism explainers, doctor authority, testimonial compilations. | 60-180s. Most health DTC brands allocate 50-70% of spend here. Compliance automation is mature. |
| YouTube | Doctor Reveals, long-form mechanism education, VSL-style ads. Premium CPMs but highest intent. | 2-5min pre-roll. Health audiences will watch long ads if the content is genuinely educational. |
| Connected TV | Brand awareness and retargeting for established health brands. | 30-60s. Repurposed from Meta/YouTube winners. Not a primary testing platform. |

---

## Vertical-Specific Taste Defaults

```yaml
taste_defaults:
  voice_register: "informed friend who has done the research — not a doctor, not a salesman, but someone who genuinely found something that helped"
  emotional_range:
    floor: "empathetic understanding of health frustration"
    ceiling: "genuine excitement about a mechanism discovery — tempered by compliance reality"
  anti_voice:
    - "clinical detachment — health ads need warmth and empathy"
    - "miracle-cure enthusiasm — compliance will kill it and audiences distrust it"
    - "fear-mongering without resolution — must lead to a hopeful solution"
    - "corporate pharma tone — DTC health lives in the alternative/natural space"
    - "vague wellness-speak — 'boost your wellness' means nothing"
  energy_signature: "empathetic, mechanism-curious, grounded optimism, compliance-aware"
  proof_style: "UGC testimonials + clinical backing. Personal stories with specific results, supported by named studies or physician endorsement."
  pacing: "hook with curiosity → educate on mechanism → social proof → soft CTA. Never rush to the sell — health audiences need to be educated before they buy."
```

---

## Vertical-Specific Ad Anti-Slop

```yaml
ad_anti_slop:
  compliance_violations:
    - "cure"
    - "treat"
    - "clinically proven" (without actual clinical trial data)
    - "doctor-approved" (without a specific, named doctor)
    - "FDA approved" (supplements are not FDA approved)
    - "guaranteed results"
    - "permanent weight loss"
  generic_health_slop:
    - "revolutionary breakthrough"
    - "miracle ingredient"
    - "secret doctors don't want you to know"
    - "Big Pharma doesn't want you to see this"
    - "one simple trick"
  cross_vertical_contamination:
    - "financial freedom"
    - "wealth secret"
    - "unlock your potential"
    - "game-changing"
    - "disruptive"
```

---

## Compliance Constraints

Health advertising has the strictest compliance environment of any vertical. These are hard constraints:

- **No disease claims.** Cannot claim to cure, treat, mitigate, or prevent any disease. Structure/function claims only ("supports healthy digestion" not "treats IBS").
- **Weight loss before/after restricted on Meta.** Close-up body comparison images may be rejected. Use lifestyle imagery and verbal testimonials instead.
- **"Results may vary" required.** Every testimonial with specific results needs this disclaimer — visually and/or verbally.
- **No FDA-unapproved claims.** Supplements are not FDA-approved products. Never imply FDA endorsement.
- **Substantiation required.** Any clinical claim must be backed by actual published research. "Studies show" without a real study is a compliance violation.
- **TikTok health review is aggressive.** Expect 30-40% rejection rates on first submission. Build creative variations for resubmission.
- **Meta Advantage+ campaigns** flag health language automatically. Mechanism-first framing survives review better than symptom-first framing.

---

## Ad Market Context

### Audience Profile
- Adults 35-65 experiencing age-related health concerns (energy, weight, joint pain, cognitive decline, sleep)
- Female-skewed for supplements (60-65%), though male health is growing rapidly
- Have tried multiple solutions — cynical about "the next miracle pill" but still searching
- Respond to education over hype — mechanism explainers earn trust where claims create skepticism
- Heavy social media consumers, especially Facebook and TikTok

### Ad Market Dynamics
- **Saturation level: EXTREME.** Health/supplement is the most competitive DTC ad vertical. Creative fatigue is brutal — winning creatives last 7-14 days on Meta.
- **What works:** UGC testimonials from relatable creators, mechanism explainer videos, doctor authority content, "weird food/ingredient" curiosity hooks.
- **What doesn't work:** Polished corporate production, aggressive fear-based messaging without resolution, vague wellness claims without mechanism specificity.
- **Creative refresh cadence:** Weekly. Health brands need 10-20+ new creatives per month to maintain performance.
- **Compliance tax:** 20-30% of creative effort goes to compliance navigation. Build compliance into the creative process, not as an afterthought.

### Proof Architecture (Ad-Specific)
- **UGC testimonials** — Real people, real results, real footage. The #1 proof format for health ads. Multiple testimonials stacked (3-5 in 60-90s) create volume credibility.
- **Clinical study citations** — Named institution, specific findings, published source. "A Johns Hopkins study found..." carries weight.
- **Physician endorsement** — Named, credentialed doctor on camera. Must be a real physician willing to stand behind the product.
- **Before/after with disclaimers** — Specific numbers, timeframes, and "results may vary." Verbal testimonials with B-roll often survive compliance better than visual comparison.
- **Ingredient research** — Published research on individual ingredients (not the final product). Safer compliance path than product-level claims.
- **User count/social proof** — "Over 500,000 bottles sold" or "Trusted by 100,000+ customers" provides scale validation.

---

## Meta Ad Spy Brand Database

Brands from the Meta Ad Spy tool mapped to this vertical. Used by A01 microskill 0.6 (Brand Database Matcher) to determine which brands can use Tool-Assisted Scan mode.

```yaml
meta_ad_spy_brands:
  # Health/supplement DTC brands (populate from tool's brand list)
  - brand_name: "Gundry MD"
    meta_ad_spy_id: "TBD"
    scrape_frequency: weekly
    impression_data: true

  - brand_name: "Athletic Greens"
    meta_ad_spy_id: "TBD"
    scrape_frequency: weekly
    impression_data: true

  - brand_name: "Organifi"
    meta_ad_spy_id: "TBD"
    scrape_frequency: weekly
    impression_data: true

  - brand_name: "BioTRUST"
    meta_ad_spy_id: "TBD"
    scrape_frequency: weekly
    impression_data: true

  - brand_name: "Seed"
    meta_ad_spy_id: "TBD"
    scrape_frequency: weekly
    impression_data: true

  # PLACEHOLDER: Add remaining health/supplement brands from Meta Ad Spy tool
  # Health is the highest-volume DTC ad vertical — expect 15-25+ brands

brand_mapping_status: "PLACEHOLDER — awaiting tool brand list export"
last_updated: "2026-02-27"
```

**Reference:** `ads/meta-ad-spy-integration.md` for mapping rules and dual-signal scoring protocol.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-02-27 | Added Meta Ad Spy Brand Database section with placeholder brand mappings for Tool-Assisted Scan mode |
| 1.0 | 2026-02-23 | Initial creation |
