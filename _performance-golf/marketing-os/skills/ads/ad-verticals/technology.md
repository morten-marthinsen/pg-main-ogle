# Ad Vertical Profile — Technology / SaaS

**Version:** 1.0
**Created:** 2026-02-23
**Vertical:** technology
**Display Name:** Technology / SaaS Ads

---

## Ad Persona Panel Configuration

The Ad Arena uses these 7 competitors for technology ad projects. Tech advertising operates on a single principle: show the product solving a real problem in context. Features bore people. Workflows convince them. The best tech ads make the viewer feel the pain of their current process and immediately see how the product eliminates it.

| Slot | Persona | Why This Persona for Tech Ads |
|------|---------|-------------------------------|
| 1 | **DR Strategist** | Designs conversion paths calibrated to tech buying cycles — free trials, freemium, demo requests, ROI calculators. Tech CTAs must match where the buyer is in evaluation, not push premature commitment. |
| 2 | **Scroll Stopper** | Creates pain-elimination hooks that interrupt workflow-focused professionals. "Still doing X manually?" and "Old Way vs New Way" hooks work because they trigger immediate recognition of wasted time. |
| 3 | **UGC Native** | Tech UGC means screen recordings, workflow walkthroughs, and "day in my life" content showing the product in actual use. Authentic product-in-context demos from real users outperform polished brand videos. |
| 4 | **Brand Builder** | Establishes product positioning in a crowded market. Tech buyers compare 3-5 solutions — Brand Builder ensures differentiation is clear and memorable across touchpoints. |
| 5 | **Data Scientist** | Tech audiences respond to quantified outcomes — time saved, money recovered, productivity gained. Data Scientist ensures claims are specific, verifiable, and strategically positioned for maximum impact. |
| 6 | **Visual Storyteller** | Crafts workflow narratives — the frustrating "before" (manual processes, multiple tools, context switching) vs. the elegant "after" (unified workflow, automation, clarity). Product as protagonist in a workflow story. |
| 7 | **The Architect** | Integration & Synthesis — always present. |

### Critic & Judge
- **Critic:** Standard adversarial role (unchanged)
- **Judge:** Standard scoring role (unchanged)

### Panel Overrides (if any)
No overrides — standard panel. Tech's emphasis on product demonstration, workflow storytelling, data-driven claims, and role-based positioning maps directly to the default 7-persona strengths.

---

## Specimen Directories

```yaml
ad_specimens: "ad-persona-specimens/technology/"
ad_persona_registry: "ad-persona-registry/"
```

---

## Dominant Hook Types

| Hook Type | Description | Why It Works for Tech |
|-----------|-------------|----------------------|
| Time Save | "This Tool Saves Our Team 12 Hours Every Week" | Time is the universal pain point for tech buyers. Specific time savings with role context ("Our marketing team...") create immediate recognition. |
| Pain Elimination | "Stop Copy-Pasting Data Between 5 Different Tools" | Names the specific workflow pain the audience experiences daily. Recognition is the hook — "that's exactly what I do." |
| ROI Proof | "How We Cut Our Customer Acquisition Cost by 40% in 90 Days" | Quantified business outcomes speak directly to decision-makers. Specific percentages + timeframes + context = credible. |
| Role-Based Targeting | "If You're a Product Manager Still Using Spreadsheets for Roadmaps..." | Calls out a specific role and a specific pain. Targeting + relevance in one hook. Extremely effective on LinkedIn. |
| Old Way vs New Way | "We Used to Spend 3 Hours on Reports. Now It Takes 10 Minutes." | Side-by-side comparison of the painful process vs. the product-enabled process. The visual gap does the selling. |

---

## Script Structure Preferences

| Structure | Duration | When to Use |
|-----------|----------|-------------|
| Workflow Problem-Solution | 30-90s | The workhorse format. Show the painful current workflow (3-5 steps of friction), then show the product eliminating that friction. Screen recording or animation. |
| "Old Way vs. New Way" | 15-60s | Split-screen or sequential comparison. Before the product = painful. After the product = elegant. Extremely effective for retargeting and mid-funnel. |
| Product Demo Walkthrough | 90-180s | YouTube and LinkedIn. Full walkthrough of a real use case. Not a feature tour — a workflow solution from problem to resolution. |
| Customer Story / Case Study | 60-120s | Real company, real problem, real results with the product. Specific metrics and timeframes. The most trusted format for B2B decision-makers. |
| "Day in the Life" UGC | 30-60s | TikTok and Reels. Real user showing how the product fits into their actual workday. Authentic, unscripted, product-in-context. |

---

## Platform Preferences

| Platform | Strength for Tech | Format Notes |
|----------|-------------------|--------------|
| YouTube | Product demos, workflow walkthroughs, customer stories. High-intent platform where tech buyers actively research solutions. | 90s-5min. Tech audiences will watch detailed demos if the content addresses their specific pain point. Pre-roll targeting by job title/industry. |
| LinkedIn | Role-based targeting for B2B SaaS. The only platform where you can target by job title, company size, industry, and seniority. | 30-90s. Professional tone. Benefits > features. "For [role] who [pain point]" framing. Thought leadership + product positioning hybrid. |
| Meta (FB/IG) | Retargeting and awareness for B2C tech products. Less effective for enterprise B2B but strong for prosumer tools, apps, and productivity software. | 30-60s. Short, visual, benefit-focused. Old Way vs New Way format works well. Consumer-facing tech products perform best here. |
| TikTok | "Day in the life" UGC, productivity tips featuring the product, quick workflow hacks. Younger demographic, prosumer/individual user. | 15-30s. Raw screen recordings, creator-style content. "Here's how I [task] in half the time" format. Product as supporting character, not protagonist. |
| Google/Search | Intent-based capture for buyers actively searching for solutions. Not creative-driven — keyword and landing page optimization. | Text ads + landing pages. Complementary to video/social campaigns. Captures demand generated by other channels. |

---

## Vertical-Specific Taste Defaults

```yaml
taste_defaults:
  voice_register: "smart colleague who found a better way to do something — sharing a tool recommendation, not delivering a sales pitch"
  emotional_range:
    floor: "calm demonstration of a better workflow"
    ceiling: "genuine excitement about time/effort dramatically reduced — the 'why didn't I find this sooner' moment"
  anti_voice:
    - "enterprise corporate jargon — 'leverage synergies to optimize holistic workflows'"
    - "empty superlatives — 'revolutionary,' 'game-changing,' 'disruptive' are meaningless in tech"
    - "feature dumps without workflow context — nobody cares about features, they care about outcomes"
    - "manufactured urgency — tech products don't expire, fake scarcity is transparent"
    - "health/wellness language — no 'transformation journeys' for a SaaS product"
  energy_signature: "practical, demonstration-driven, benefit-specific, workflow-native"
  proof_style: "product-in-context demonstration — show the workflow, show the result, quantify the improvement. Screen recordings > stock footage."
  pacing: "show the pain quickly (5-10s) → demonstrate the solution (20-40s) → quantify the result (5-10s) → CTA. Tech audiences have low patience for preamble — get to the product fast."
```

---

## Vertical-Specific Ad Anti-Slop

```yaml
ad_anti_slop:
  empty_tech_buzzwords:
    - "revolutionary"
    - "game-changing"
    - "disruptive"
    - "cutting-edge"
    - "next-generation"
    - "state-of-the-art"
    - "best-in-class"
    - "world-class"
  corporate_jargon:
    - "leverage"
    - "synergy"
    - "holistic"
    - "robust"
    - "comprehensive solution"
    - "end-to-end"
    - "seamlessly integrate"
  fake_urgency:
    - "limited time offer" (on a SaaS subscription)
    - "act now before the price increases" (without a real price change)
    - "only X spots left" (on software with unlimited seats)
  cross_vertical_contamination:
    - "ancient secret"
    - "doctor reveals"
    - "hidden toxin"
    - "financial freedom"
    - "manifest your destiny"
  false_performance_claims:
    - "10x your productivity" (without substantiation)
    - "the only tool you'll ever need"
    - "replaces your entire tech stack"
```

---

## Compliance Constraints

Technology advertising has relatively light compliance requirements compared to health or finance, but several areas require attention:

- **Data privacy claims must be accurate.** If you claim SOC 2 compliance, GDPR readiness, or HIPAA compliance, it must be verifiable. False security claims carry serious legal risk.
- **No false performance metrics.** "10x faster" needs a benchmark. "Save 12 hours per week" needs methodology. Quantified claims must be substantiated.
- **Competitor comparison claims** must be factually accurate and defensible. "Better than [Competitor]" needs specific, verifiable dimensions. Vague superiority claims invite legal challenges.
- **Free trial/freemium terms** must be transparent. Hidden costs, automatic billing after trial, and restrictive cancellation policies are FTC targets.
- **User data in demos.** Screen recordings and product demos must not expose real user data (names, emails, financial info) unless explicitly permitted. Use demo/test data.
- **Platform review:** Tech ads face minimal platform scrutiny compared to health or finance. The main risk is competitor trademark issues in ad copy.

---

## Ad Market Context

### Audience Profile
- Professional users (25-55) evaluating tools for their role or team
- Range from individual contributors (prosumer tools) to C-suite decision-makers (enterprise SaaS)
- Technically literate — they understand products and can evaluate functionality
- Actively comparing alternatives — 70%+ of B2B tech buyers research 3-5 solutions before purchase
- Price-sensitive for individual tools, ROI-focused for team/enterprise purchases
- Heavy consumers of product reviews, comparison content, and peer recommendations

### Ad Market Dynamics
- **Saturation level: MODERATE to HIGH.** Tech ad spend is concentrated on a few platforms (Google, LinkedIn, YouTube). Creative differentiation matters but targeting precision matters more.
- **What works:** Product-in-context demos showing real workflows, "Old Way vs New Way" comparisons, customer stories with specific metrics, role-based targeting with role-specific pain, and free trial CTAs.
- **What doesn't work:** Feature lists without workflow context, empty buzzwords ("revolutionary platform"), aggressive urgency tactics, and polished brand videos without product demonstration.
- **Creative refresh cadence:** Every 4-6 weeks. Tech creatives have longer lifespan than health or personal dev. Feature updates and case studies create natural refresh moments.
- **The demo is the ad.** In tech, showing the product working is more persuasive than any copywriting. The best tech ads are product demos with good framing and a clear CTA.

### Proof Architecture (Ad-Specific)
- **Product demonstration** — Screen recording showing the actual product solving a real workflow problem. The #1 proof format for tech ads. Must show real UI, not mockups.
- **Customer case studies** — Named company, specific problem, quantified result, timeline. "Acme Corp reduced report generation time from 3 hours to 10 minutes using [Product]."
- **Integration logos** — "Works with Salesforce, HubSpot, Slack, Notion..." Integration compatibility is a trust signal and a practical consideration.
- **User count / social proof** — "Trusted by 50,000+ teams" or "10M+ users worldwide." Scale signals product maturity and reliability.
- **Third-party reviews** — G2, Capterra, TrustRadius ratings. "Rated 4.8/5 on G2 with 500+ reviews." External validation carries more weight than self-claims.
- **ROI calculators** — Interactive tools that let prospects estimate their own savings. "See how much time your team could save" personalizes the proof.
- **Security certifications** — SOC 2, GDPR, HIPAA badges. For enterprise buyers, compliance certifications are table stakes, not differentiators.

---

## Meta Ad Spy Brand Database

Brands from the Meta Ad Spy tool mapped to this vertical. Used by A01 microskill 0.6 (Brand Database Matcher) to determine which brands can use Tool-Assisted Scan mode.

```yaml
meta_ad_spy_brands:
  # Technology/SaaS DTC brands (populate from tool's brand list)
  - brand_name: "Notion"
    meta_ad_spy_id: "TBD"
    scrape_frequency: weekly
    impression_data: true

  - brand_name: "Monday.com"
    meta_ad_spy_id: "TBD"
    scrape_frequency: weekly
    impression_data: true

  - brand_name: "ClickUp"
    meta_ad_spy_id: "TBD"
    scrape_frequency: weekly
    impression_data: true

  # PLACEHOLDER: Add remaining tech/SaaS brands from Meta Ad Spy tool

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
