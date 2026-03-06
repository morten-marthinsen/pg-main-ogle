# Ad Vertical Profile — Finance / Trading

**Version:** 1.0
**Created:** 2026-02-23
**Vertical:** finance
**Display Name:** Finance / Trading Ads

---

## Ad Persona Panel Configuration

The Ad Arena uses these 7 competitors for finance ad projects. Finance advertising operates under a paradox: the audience is driven by fear and greed, but trust is the gating factor. Every creative must balance urgency with credibility — too aggressive and you lose trust, too conservative and you lose attention.

| Slot | Persona | Why This Persona for Finance Ads |
|------|---------|----------------------------------|
| 1 | **DR Strategist** | Designs low-friction conversion paths for a high-skepticism audience. Finance CTAs must feel like information access ("See your rate," "Get the free report"), not purchase commitments. |
| 2 | **Scroll Stopper** | Creates crisis-warning and prediction hooks that stop the scroll without crossing into compliance violations. Financial fear is the strongest emotion in advertising — channeling it responsibly is the skill. |
| 3 | **UGC Native** | Financial testimonials require careful framing — income disclaimers, risk disclosures, "not financial advice." UGC Native understands how to present results authentically within regulatory guardrails. |
| 4 | **Brand Builder** | Trust signals are mandatory in finance. Institutional credibility, track record, media mentions, regulatory status — Brand Builder constructs the trust architecture that makes conversion possible. |
| 5 | **Data Scientist** | Finance audiences respond to data — specific numbers, returns, percentages, timelines. Data Scientist ensures quantified claims are accurate, compliant, and strategically deployed for maximum impact. |
| 6 | **Visual Storyteller** | Crafts scenario-specific pain narratives — the retirement that runs out, the portfolio that crashes, the opportunity that slips away. Financial storytelling makes abstract risk feel personal and immediate. |
| 7 | **The Architect** | Integration & Synthesis — always present. |

### Critic & Judge
- **Critic:** Standard adversarial role (unchanged)
- **Judge:** Standard scoring role (unchanged)

### Panel Overrides (if any)
No overrides — standard panel. Finance's need for trust architecture, data precision, low-friction CTAs, and scenario storytelling aligns with the default 7-persona panel.

---

## Specimen Directories

```yaml
ad_specimens: "ad-persona-specimens/finance/"
ad_persona_registry: "ad-persona-registry/"
```

---

## Dominant Hook Types

| Hook Type | Description | Why It Works for Finance |
|-----------|-------------|-----------------------|
| Crisis Warning | "The 2026 Market Signal That Preceded Every Major Crash" | Fear of loss is the strongest financial motivator. Crisis hooks create urgency without promising returns. |
| Prediction Lead | "3 Stocks Positioned to Benefit From the AI Infrastructure Boom" | Specific, timely predictions demonstrate expertise. Must avoid "guaranteed returns" language. |
| Scenario Pain | "What Happens to Your Retirement If Interest Rates Stay Above 5% for 3 More Years?" | Makes abstract financial risk personal. Scenario framing bypasses rational defenses. |
| ROI Proof | "How One Trade Returned 47% in 6 Weeks (Full Breakdown)" | Specific, documented results with full transparency. Must include risk disclosures. |
| Authority/Insider | "Former Goldman Analyst: Here's What Wall Street Isn't Telling Retail Investors" | Institutional credibility combined with insider knowledge framing. Authority is the trust shortcut. |

---

## Script Structure Preferences

| Structure | Duration | When to Use |
|-----------|----------|-------------|
| Quantified Pain - Simplify - Low-Friction CTA | 60-90s | The workhorse format. Establish specific financial pain, simplify the solution, offer frictionless next step. |
| Crisis Analysis / Prediction | 2-5min | YouTube and long-form Meta. Expert walks through data, identifies risk, presents framework. Educational positioning. |
| Scenario Narrative | 60-120s | "Meet John" style storytelling. Specific person, specific financial situation, specific outcome. Emotional engagement. |
| Data Walkthrough | 90-180s | Chart/screen share format. Walk through actual market data to build analytical credibility. YouTube-native. |
| Testimonial with Disclaimers | 30-60s | Real user results with full risk disclosure. Shorter format because disclaimers eat runtime. |

---

## Platform Preferences

| Platform | Strength for Finance | Format Notes |
|----------|----------------------|--------------|
| Meta (FB/IG) | Scenario pain and crisis warning hooks. Broadest reach for retail investor audience. | 60-90s. Pain-lead creatives outperform opportunity-lead. Low-friction CTA mandatory ("Learn more" not "Buy now"). |
| YouTube | Prediction/analysis content, data walkthroughs, expert authority. Highest intent platform for finance. | 2-5min pre-roll and organic. Finance audiences will watch long analytical content. Premium CPMs justified by lead quality. |
| LinkedIn | Professional targeting for B2B financial services, wealth management, institutional products. | 30-60s. Professional tone required. Thought leadership format outperforms hard sell. Role-based targeting is the advantage. |
| X/Twitter | Financial news, market commentary, real-time analysis. Organic + promoted content. | Short-form text + chart images. Finance Twitter is a genuine community. Ads that look like native content perform best. |

---

## Vertical-Specific Taste Defaults

```yaml
taste_defaults:
  voice_register: "seasoned analyst sharing a perspective — authoritative but accessible, data-driven but not dry"
  emotional_range:
    floor: "measured concern about real financial risk"
    ceiling: "controlled urgency about a time-sensitive opportunity — never panic, never hype"
  anti_voice:
    - "get-rich-quick enthusiasm — destroys all credibility instantly"
    - "casual/UGC tone in compliance sections — risk disclosures must be clear and professional"
    - "health supplement language — no 'ancient secrets' or 'weird tricks' for finance"
    - "guru/lifestyle flex — showing wealth as proof is a compliance minefield"
    - "vague optimism — 'secure your financial future' means nothing without specifics"
  energy_signature: "authoritative, data-grounded, measured urgency, institutional credibility"
  proof_style: "documented results with full transparency — specific trades/returns with timeframes, risk disclosures, and track record context"
  pacing: "hook with specific scenario or data point → build analytical case → low-friction CTA. Trust builds slowly in finance — never rush to the ask."
```

---

## Vertical-Specific Ad Anti-Slop

```yaml
ad_anti_slop:
  compliance_violations:
    - "risk-free"
    - "guaranteed returns"
    - "sure thing"
    - "can't lose"
    - "safe investment"
    - "no-risk opportunity"
    - "passive income guaranteed"
  generic_finance_slop:
    - "financial freedom" (without specific definition)
    - "wealth secret"
    - "money machine"
    - "set it and forget it"
    - "retire early" (without substantiated path)
  cross_vertical_contamination:
    - "hidden toxin"
    - "ancient secret"
    - "doctor reveals"
    - "miracle"
    - "unlock your potential"
    - "game-changing"
  tone_violations:
    - casual/UGC tone in compliance sections
    - lifestyle flex as proof (showing cars, houses, watches)
    - "I quit my job" narratives without income disclaimers
```

---

## Compliance Constraints

Finance advertising has significant regulatory constraints that vary by product type:

- **Regulatory compliance language mandatory.** SEC, FINRA, FTC, and state-level regulations apply depending on product type. When in doubt, consult compliance.
- **No "guaranteed returns."** Any implication of guaranteed investment performance is a regulatory violation. Past performance disclaimers required.
- **Risk disclosures required.** Every ad featuring specific returns or investment performance must include risk disclosure language. "Past performance does not guarantee future results."
- **Income claims require substantiation.** Any claim about income, returns, or financial outcomes must be documentable and representative. Atypical results need "results not typical" disclosure.
- **"Not financial advice" disclaimer.** Educational content that could be construed as financial advice needs this disclaimer. Especially important for social media content.
- **Crypto/alternative assets** face additional restrictions on most platforms. Meta and Google have specific policies. Check current platform policies before creative production.
- **Platform-specific review:** Meta's automated review flags financial language aggressively. LinkedIn is more permissive for B2B financial services. YouTube allows longer disclaimers in video description.

---

## Ad Market Context

### Audience Profile
- Retail investors and active traders, age 30-65, majority male (65-70%)
- Range from first-time investors to experienced traders — sophistication varies widely
- Driven by fear of loss AND desire for gain — both motivators are active simultaneously
- Highly skeptical of "gurus" but responsive to institutional credibility and documented track records
- Heavy consumers of financial media (CNBC, Bloomberg, financial YouTube, finance Twitter)

### Ad Market Dynamics
- **Saturation level: HIGH.** Financial advertising is expensive (high CPMs) and competitive. Creative differentiation is critical.
- **What works:** Scenario-specific pain (not generic "are you worried about retirement?"), data-backed analysis, authority positioning, low-friction CTAs, and educational content that demonstrates expertise.
- **What doesn't work:** Get-rich-quick framing, lifestyle flex without substance, vague promises of "financial freedom," aggressive hard-sell CTAs ("Buy now!"), and anything that feels like a late-night infomercial.
- **Creative refresh cadence:** Every 3-4 weeks. Finance creatives have longer life than health but shorter than technology. Market events create natural refresh opportunities.
- **CPA reality:** Finance leads are expensive ($20-100+ depending on product). Quality of creative directly impacts lead quality and downstream conversion.

### Proof Architecture (Ad-Specific)
- **Documented trade history** — Specific entries, exits, returns with dates. Full transparency builds trust.
- **Media mentions** — "As seen on CNBC/Bloomberg/Forbes" carries institutional weight.
- **Track record statistics** — Win rate, average return, max drawdown — presented with risk context.
- **Client testimonials with disclaimers** — Real results, full names when possible, "results not typical" when required.
- **Analyst credentials** — CFA, CPA, former institutional experience, years in markets. Credential stacking builds authority.
- **Third-party verification** — Audited returns, regulatory registrations, industry awards. External validation > self-claims.

---

## Meta Ad Spy Brand Database

Brands from the Meta Ad Spy tool mapped to this vertical. Used by A01 microskill 0.6 (Brand Database Matcher) to determine which brands can use Tool-Assisted Scan mode.

```yaml
meta_ad_spy_brands:
  # Finance/trading DTC brands (populate from tool's brand list)
  - brand_name: "Motley Fool"
    meta_ad_spy_id: "TBD"
    scrape_frequency: weekly
    impression_data: true

  - brand_name: "Oxford Club"
    meta_ad_spy_id: "TBD"
    scrape_frequency: weekly
    impression_data: true

  - brand_name: "Stansberry Research"
    meta_ad_spy_id: "TBD"
    scrape_frequency: weekly
    impression_data: true

  # PLACEHOLDER: Add remaining finance/trading brands from Meta Ad Spy tool

brand_mapping_status: "PLACEHOLDER — awaiting tool brand list export"
last_updated: "2026-02-27"
```

**Reference:** `skills/ads/meta-ad-spy-integration.md` for mapping rules and dual-signal scoring protocol.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2026-02-27 | Added Meta Ad Spy Brand Database section with placeholder brand mappings for Tool-Assisted Scan mode |
| 1.0 | 2026-02-23 | Initial creation |
