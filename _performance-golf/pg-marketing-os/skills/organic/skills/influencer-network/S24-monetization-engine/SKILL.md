---
name: influencer-monetization
description: >-
  Revenue extraction from the AI influencer network through UGC deals, affiliate
  marketing, product promotion, brand partnerships, and strategic cross-network
  monetization. Use when influencer accounts have sufficient audience size and
  engagement to begin monetization while maintaining authentic audience relationships.
  Produces monetization strategies with revenue stream mapping, deal structure
  templates, pricing models, and partner outreach playbooks. Trigger when users
  mention monetization, influencer revenue, brand deals, affiliate marketing,
  UGC partnerships, or making money from influencer accounts. Requires outputs
  from S21-S23.
---

# S24: MONETIZATION ENGINE

## SKILL IDENTITY

**Skill ID:** S24-monetization-engine
**Name:** Monetization Engine
**Version:** 1.0.0
**Purpose:** Extract maximum revenue from the AI influencer network through UGC deals, affiliate marketing, product promotion, brand partnerships, and strategic cross-network monetization while maintaining authentic audience relationships
**Position in Pipeline:** Fourth skill in Influencer Network cluster (S21 → S22 → S23 → S24)
**Upstream Dependencies:** S21-Persona Architect, S22-Account Strategy, S23-Network Coordination
**Downstream Consumers:** Finance/Revenue Tracking, Master Brand Strategy, Campaign Execution

---

## PREREQUISITES (Gate Requirements)

### Required Before Execution

| Gate | Requirement | Validation Method |
|------|-------------|-------------------|
| G1 | Minimum 10K followers per persona | Platform verification |
| G2 | Engagement rate above 3% average | Analytics verification |
| G3 | 90+ days of consistent posting | Content history check |
| G4 | Persona voice firmly established | Voice consistency audit |
| G5 | Network coordination protocols active | S23 implementation verified |
| G6 | Payment infrastructure ready | Bank/payment processor setup |
| G7 | Legal/tax structure confirmed | Business entity documentation |

### Soft Prerequisites (Recommended)

- Media kit created per persona
- Rate card drafted
- Previous brand interaction history documented
- Affiliate program accounts created
- Master brand product catalog ready
- Content licensing agreements prepared

---

## INPUT REQUIREMENTS

### Required Inputs

```yaml
network_state:
  personas:
    - persona_id: string
      follower_count: integer
      engagement_rate: number
      platform_breakdown: object
      content_niche: string
      audience_demographics: object
      monetization_readiness_score: number

  network_totals:
    total_followers: integer
    average_engagement: number
    platforms_covered: array

master_brand_products:
  - product_id: string
    name: string
    type: enum [digital, physical, service]
    price: number
    commission_structure: object
    promotion_priority: enum [high, medium, low]

monetization_parameters:
  revenue_target_monthly: number
  revenue_target_annual: number
  brand_deal_acceptance_criteria: object
  affiliate_program_list: array
  promotion_frequency_limits: object
```

### Optional Inputs

```yaml
existing_brand_relationships: array
competitor_monetization_intel: object
seasonal_revenue_patterns: object
high_value_brand_target_list: array
exclusivity_considerations: object
```

---

## PROCESS (Step-by-Step Execution Protocol)

### Phase 1: Revenue Model Architecture

**Duration:** 60-90 minutes

**Step 1.1: Revenue Stream Mapping**

Map all potential revenue streams per persona:

```yaml
revenue_streams:
  ugc_brand_deals:
    description: "Creating content for brands to use on their channels"
    revenue_potential: "High ($500-$10,000+ per deal)"
    frequency: "2-8 deals per month"
    personas_eligible: ["All with 10K+ followers"]

  sponsored_content:
    description: "Posting sponsored content on persona's channels"
    revenue_potential: "Medium-High ($200-$5,000+ per post)"
    frequency: "2-4 posts per month max"
    personas_eligible: ["All with engaged audiences"]

  affiliate_marketing:
    description: "Commission-based product recommendations"
    revenue_potential: "Medium (5-50% commission)"
    frequency: "Ongoing, integrated into content"
    personas_eligible: ["Curator and Educator archetypes especially"]

  master_brand_promotion:
    description: "Promoting master brand products/services"
    revenue_potential: "Varies by product"
    frequency: "Strategic, campaign-based"
    personas_eligible: ["All, coordinated"]

  digital_products:
    description: "Persona-specific digital products (guides, templates)"
    revenue_potential: "Medium ($10-$500 per sale)"
    frequency: "Evergreen with launch spikes"
    personas_eligible: ["Educator archetype primarily"]

  community_membership:
    description: "Paid community access"
    revenue_potential: "Recurring ($10-$100/month)"
    frequency: "Monthly recurring"
    personas_eligible: ["Connector archetype primarily"]

  consulting_coaching:
    description: "1:1 or group coaching/consulting"
    revenue_potential: "High ($100-$500+/hour)"
    frequency: "Limited capacity"
    personas_eligible: ["Authority personas"]
```

**Step 1.2: Persona Revenue Fit Analysis**

Match revenue streams to persona archetypes:

```
PERSONA-REVENUE FIT MATRIX

                    | Educator | Curator | Storyteller | Provocateur | Entertainer | Connector | Analyst |
--------------------|----------|---------|-------------|-------------|-------------|-----------|---------|
UGC Brand Deals     |   High   |  High   |    High     |   Medium    |    High     |   Medium  |   Low   |
Sponsored Content   |   High   |  High   |    High     |    Low      |    High     |   High    |  Medium |
Affiliate Marketing |   High   |  V.High |   Medium    |    Low      |   Medium    |   High    |   High  |
Master Brand Promo  |   High   |  High   |    High     |   Medium    |    High     |   High    |   High  |
Digital Products    |  V.High  |  High   |   Medium    |   Medium    |    Low      |   Medium  |   High  |
Community/Member    |  Medium  |  Medium |    High     |    High     |   Medium    |   V.High  |  Medium |
Consulting/Coaching |  V.High  |  Medium |   Medium    |    High     |    Low      |   High    |  V.High |

V.High = Primary revenue stream
High = Strong fit
Medium = Viable secondary
Low = Occasional/limited
```

**Step 1.3: Revenue Target Distribution**

Allocate revenue targets across personas and streams:

```yaml
revenue_allocation:
  network_annual_target: 500000

  persona_targets:
    persona_001:
      annual_target: 180000
      monthly_target: 15000
      stream_breakdown:
        ugc_brand_deals: 40%  # $72,000/year
        sponsored_content: 20%  # $36,000/year
        affiliate: 15%  # $27,000/year
        master_brand: 15%  # $27,000/year
        digital_products: 10%  # $18,000/year

    persona_002:
      annual_target: 150000
      monthly_target: 12500
      stream_breakdown:
        sponsored_content: 30%
        affiliate: 35%
        master_brand: 20%
        consulting: 15%

    persona_003:
      annual_target: 120000
      monthly_target: 10000
      stream_breakdown:
        ugc_brand_deals: 50%
        affiliate: 30%
        master_brand: 20%
```

---

### Phase 2: UGC Brand Deal Framework

**Duration:** 60-90 minutes

**Step 2.1: UGC Service Packaging**

Define UGC offerings per persona:

```yaml
ugc_service_packages:
  persona_001:
    basic_ugc:
      name: "Single Video UGC"
      deliverables:
        - "One 30-60 second video"
        - "Vertical format (9:16)"
        - "One round of revisions"
        - "Raw footage included"
      price: 750
      turnaround: "5 business days"
      usage_rights: "Paid ads for 3 months"

    standard_ugc:
      name: "Content Bundle"
      deliverables:
        - "3 videos (30-60 seconds each)"
        - "3 static images"
        - "One round of revisions each"
        - "All raw footage"
      price: 2000
      turnaround: "7 business days"
      usage_rights: "Paid ads for 6 months"

    premium_ugc:
      name: "Campaign Package"
      deliverables:
        - "5 videos with variations"
        - "5 static images"
        - "Hook variations (3 per video)"
        - "Unlimited revisions"
        - "Strategy call included"
      price: 5000
      turnaround: "10 business days"
      usage_rights: "Paid ads for 12 months"

    custom_ugc:
      name: "Custom Campaign"
      description: "Tailored to brand needs"
      starting_price: 3000
      pricing_factors:
        - "Volume of content"
        - "Complexity of production"
        - "Usage rights duration"
        - "Exclusivity requirements"
```

**Step 2.2: Brand Deal Qualification Criteria**

```yaml
brand_qualification:
  must_have:
    - "Product/service aligns with persona niche"
    - "Brand values don't conflict with persona values"
    - "Budget meets minimum threshold"
    - "Clear creative brief provided"
    - "Reasonable timeline"

  nice_to_have:
    - "Previous positive brand reputation"
    - "Potential for ongoing relationship"
    - "Product persona would genuinely use"
    - "Aligned target audience"

  deal_breakers:
    - "Competitors to master brand"
    - "Unethical products/services"
    - "Unrealistic demands"
    - "Exclusivity that limits other opportunities"
    - "Payment terms longer than Net 30"

  minimum_thresholds:
    ugc_minimum_per_video: 500
    sponsored_post_minimum: 200
    campaign_minimum: 1500
```

**Step 2.3: UGC Pitch Templates**

```yaml
pitch_templates:
  inbound_response:
    subject: "Re: Partnership Opportunity"
    template: |
      Hi [Brand Name],

      Thanks for reaching out! I love what [Brand] is doing with [specific product/initiative].

      I'd be happy to create UGC content for your brand. Here's what I can offer:

      **Package Options:**
      [Insert relevant packages]

      **My UGC Style:**
      [Link to portfolio/examples]

      **Typical Results:**
      [Include any performance data if available]

      Let me know which package interests you, or if you have specific needs
      I can put together a custom proposal.

      Looking forward to potentially working together!

      [Persona Name]

  outbound_pitch:
    subject: "UGC Creator for [Brand Name]"
    template: |
      Hi [Contact Name],

      I'm [Persona Name], a content creator in the [niche] space with [X] followers
      across [platforms].

      I noticed [Brand] is [specific observation about their marketing/content needs]
      and wanted to reach out about potentially creating UGC content for your paid campaigns.

      **Why me:**
      - [Relevant credential 1]
      - [Relevant credential 2]
      - [Relevant credential 3]

      **Recent work:**
      [Link to portfolio]

      **Brands I've worked with:**
      [List if applicable]

      I'd love to chat about how I can help [Brand] [specific goal].

      Would you be open to a quick call this week?

      [Persona Name]
```

**Step 2.4: UGC Rate Card**

```markdown
# [PERSONA NAME] UGC RATE CARD

## Video Content

| Format | Duration | Price | Usage |
|--------|----------|-------|-------|
| Single UGC Video | 15-30s | $500 | 3 months |
| Single UGC Video | 30-60s | $750 | 3 months |
| Single UGC Video | 60-90s | $1,000 | 3 months |

## Hook Variations
| Add-On | Price |
|--------|-------|
| Additional hook (per video) | $150 |
| B-roll package | $200 |

## Static Content

| Format | Quantity | Price | Usage |
|--------|----------|-------|-------|
| Product Photos | 3 | $400 | 6 months |
| Product Photos | 5 | $600 | 6 months |
| Lifestyle Photos | 5 | $750 | 6 months |

## Packages

| Package | Includes | Price | Savings |
|---------|----------|-------|---------|
| Starter | 2 videos + 3 photos | $1,500 | 15% |
| Standard | 3 videos + 5 photos | $2,500 | 20% |
| Premium | 5 videos + 10 photos | $4,000 | 25% |

## Usage Rights Extensions

| Duration | Additional Cost |
|----------|-----------------|
| 6 months | +25% |
| 12 months | +50% |
| Perpetual | +100% |

## Rush Fees

| Turnaround | Additional Cost |
|------------|-----------------|
| 48 hours | +50% |
| 72 hours | +25% |

## Notes
- All prices in USD
- 50% deposit required to begin
- Net 15 payment terms
- Revisions included as specified per package
```

---

### Phase 3: Affiliate Marketing Integration

**Duration:** 45-60 minutes

**Step 3.1: Affiliate Program Selection**

```yaml
affiliate_programs:
  primary_programs:
    - program: "Amazon Associates"
      commission: "1-10% depending on category"
      cookie: "24 hours"
      fit: "Product recommendations, tool reviews"
      personas: ["Curator", "Educator"]

    - program: "[Niche-specific program 1]"
      commission: "20-40%"
      cookie: "30 days"
      fit: "Direct niche alignment"
      personas: ["All relevant personas"]

    - program: "[SaaS affiliate program]"
      commission: "30% recurring"
      cookie: "60 days"
      fit: "Tool recommendations"
      personas: ["Educator", "Analyst"]

  secondary_programs:
    - program: "[Program name]"
      commission: "[Rate]"
      use_case: "[When to use]"

  master_brand_affiliate:
    program: "[Master brand program]"
    commission: "Custom - internal tracking"
    priority: "Highest"
    integration: "All personas"
```

**Step 3.2: Affiliate Content Strategy**

```yaml
affiliate_content_strategy:
  content_types:
    review_content:
      description: "In-depth product/tool reviews"
      affiliate_integration: "Direct links with disclosure"
      frequency: "2-4 per month"
      best_for: ["Curator", "Analyst"]

    comparison_content:
      description: "Tool/product comparisons"
      affiliate_integration: "Multiple links, recommendation"
      frequency: "1-2 per month"
      best_for: ["Curator"]

    tutorial_content:
      description: "How-to using affiliate products"
      affiliate_integration: "Natural integration, link in bio"
      frequency: "Ongoing"
      best_for: ["Educator"]

    roundup_content:
      description: "Best of lists, tool stacks"
      affiliate_integration: "Multiple links"
      frequency: "Monthly"
      best_for: ["Curator", "Analyst"]

    story_mention:
      description: "Casual product mentions in stories"
      affiliate_integration: "Swipe up/link sticker"
      frequency: "2-3 per week"
      best_for: ["All personas"]

  disclosure_requirements:
    instagram: "#ad or #affiliate in caption, visible"
    tiktok: "Verbal disclosure + caption"
    youtube: "Verbal disclosure + description"
    twitter: "#ad or #affiliate"
    linkedin: "Professional disclosure in post"

  link_management:
    tool: "[Link management tool - e.g., Geniuslink, Pretty Links]"
    tracking: "UTM parameters per persona"
    format: "[persona]-[product]-[platform]"
```

**Step 3.3: Affiliate Revenue Projections**

```yaml
affiliate_projections:
  persona_001:
    monthly_reach: 500000
    click_rate: 0.02  # 2%
    conversion_rate: 0.05  # 5% of clicks
    average_order: 50
    commission_rate: 0.10  # 10%
    monthly_projection: 2500  # 500K * 2% * 5% * $50 * 10%

  persona_002:
    monthly_reach: 300000
    click_rate: 0.03
    conversion_rate: 0.08
    average_order: 100
    commission_rate: 0.20
    monthly_projection: 14400

  network_total:
    monthly_projection: 20000
    annual_projection: 240000
```

---

### Phase 4: Master Brand Promotion System

**Duration:** 45-60 minutes

**Step 4.1: Product-Persona Mapping**

```yaml
product_persona_mapping:
  product_1:
    name: "[Product Name]"
    type: "Digital Course"
    price: 497
    target_audience: "[Audience description]"

    persona_assignments:
      primary_promoter: "Persona 001 (Educator)"
      promotion_angle: "How-to and implementation"
      content_types: ["Tutorial", "Success stories", "Module previews"]

      secondary_promoters:
        - persona: "Persona 002"
          angle: "Strategic value proposition"
          content_types: ["Thought leadership", "Why content"]
        - persona: "Persona 003"
          angle: "Comparison and value"
          content_types: ["Reviews", "Alternative comparison"]

    promotion_schedule:
      evergreen: "Weekly mentions, soft CTAs"
      launch: "Coordinated campaign per S23"
      frequency_cap: "Max 20% of content"

  product_2:
    name: "[Product Name]"
    type: "Membership"
    price: "47/month"
    [Continue mapping...]
```

**Step 4.2: Promotion Authenticity Framework**

```yaml
promotion_authenticity:
  principles:
    - "Only promote what persona would genuinely use"
    - "Integrate naturally into content flow"
    - "Share real results and experiences"
    - "Acknowledge limitations honestly"
    - "Don't over-promote (content quality first)"

  promotion_types:
    organic_mention:
      description: "Natural reference in relevant content"
      frequency: "As naturally occurs"
      example: "I used [product] for this, link in bio"

    dedicated_content:
      description: "Content specifically about product"
      frequency: "1-2 per month max"
      example: "Full review/tutorial of [product]"

    story_integration:
      description: "Behind-the-scenes use of product"
      frequency: "2-3 per week max"
      example: "Working on [task] using [product]"

    testimonial:
      description: "Sharing transformation/results"
      frequency: "As results occur"
      example: "Since using [product], I've [result]"

  red_flags_to_avoid:
    - "Every post mentions product"
    - "Unrealistic claims"
    - "Ignoring audience questions about alternatives"
    - "Sounding like an ad"
    - "Promoting without personal experience"
```

**Step 4.3: Cross-Network Product Promotion**

```yaml
cross_network_promotion:
  coordinated_launch:
    product: "[Product]"
    network_roles:
      persona_001:
        role: "Primary launcher"
        content_volume: "5 pieces over launch"

      persona_002:
        role: "Validator/endorser"
        content_volume: "3 pieces supporting"

      persona_003:
        role: "Alternative perspective"
        content_volume: "2 pieces + engagement"

    timeline:
      pre_launch: "Persona 001 teases, others engage"
      launch_day: "Persona 001 announces, others comment/share"
      launch_week: "Rotating perspectives"
      post_launch: "Evergreen integration"

  evergreen_distribution:
    rule: "Rotate which persona promotes when"
    schedule:
      week_1: "Persona 001 featured mention"
      week_2: "Persona 002 soft mention"
      week_3: "Persona 003 comparison mention"
      week_4: "Persona 001 testimonial/update"
```

---

### Phase 5: Brand Partnership Framework

**Duration:** 45-60 minutes

**Step 5.1: Sponsored Content Pricing**

```yaml
sponsored_content_pricing:
  pricing_factors:
    follower_count:
      10000-25000: "base"
      25000-50000: "1.5x base"
      50000-100000: "2.5x base"
      100000-250000: "4x base"
      250000+: "Custom"

    engagement_rate:
      below_3%: "-20%"
      3-5%: "base"
      5-8%: "+20%"
      above_8%: "+40%"

    content_type:
      feed_post: "1x"
      carousel: "1.5x"
      reel_short_video: "2x"
      long_form_video: "3-5x"
      story_only: "0.5x"

    exclusivity:
      none: "base"
      category_30_days: "+25%"
      category_90_days: "+50%"
      full_30_days: "+50%"
      full_90_days: "+100%"

  base_rates_by_platform:
    instagram:
      feed_post: 300
      reel: 500
      story_set: 150

    tiktok:
      video: 400
      series: 1000

    youtube:
      integration: 750
      dedicated: 2000
      shorts: 300

    twitter:
      tweet: 100
      thread: 250

    linkedin:
      post: 200
      article: 500
```

**Step 5.2: Brand Partnership Templates**

```yaml
partnership_templates:
  media_kit:
    sections:
      - "Persona introduction"
      - "Audience demographics"
      - "Platform statistics"
      - "Engagement metrics"
      - "Content examples"
      - "Past partnerships"
      - "Pricing overview"
      - "Contact information"

  partnership_proposal:
    template: |
      # Partnership Proposal: [Persona Name] x [Brand Name]

      ## Overview
      [Brief description of proposed partnership]

      ## Proposed Deliverables
      | Content | Platform | Timeline | Investment |
      |---------|----------|----------|------------|
      | [Content 1] | [Platform] | [Date] | $[Amount] |
      | [Content 2] | [Platform] | [Date] | $[Amount] |

      ## Creative Approach
      [How persona will integrate brand authentically]

      ## Expected Performance
      - Estimated reach: [X]
      - Estimated engagement: [X]
      - Historical performance: [Data]

      ## Investment Summary
      | Item | Cost |
      |------|------|
      | Content creation | $[X] |
      | Usage rights | $[X] |
      | **Total** | **$[X]** |

      ## Terms
      - Payment: [Terms]
      - Timeline: [Timeline]
      - Revisions: [Number included]

  contract_essentials:
    must_include:
      - "Scope of work"
      - "Deliverables and deadlines"
      - "Payment terms"
      - "Usage rights"
      - "Approval process"
      - "Revision limits"
      - "Exclusivity terms"
      - "Cancellation policy"
      - "FTC compliance requirements"
```

**Step 5.3: Partnership Outreach System**

```yaml
partnership_outreach:
  target_identification:
    criteria:
      - "Brand alignment with persona niche"
      - "Budget indicators (funded, advertising)"
      - "Previous influencer partnerships"
      - "Product quality and reputation"

    research_sources:
      - "Brand social media (sponsorship posts)"
      - "Influencer marketing platforms"
      - "Industry news"
      - "Competitor partnerships"

  outreach_cadence:
    cold_outreach:
      frequency: "5-10 brands per persona per month"
      channels: ["Email", "LinkedIn", "Instagram DM"]

    warm_outreach:
      triggers: ["Brand engages with content", "Brand mentioned by audience"]
      response_time: "Within 24 hours"

  follow_up_sequence:
    day_0: "Initial outreach"
    day_5: "Follow-up if no response"
    day_12: "Final follow-up"
    day_30: "Archive, retry in 3 months"
```

---

### Phase 6: Cross-Promotion Pricing Models

**Duration:** 30-45 minutes

**Step 6.1: Network Package Pricing**

```yaml
network_packages:
  network_awareness:
    name: "Network Awareness Package"
    description: "Reach across entire influencer network"
    includes:
      - "1 sponsored post per persona ([X] total)"
      - "Story mentions from all personas"
      - "Coordinated timing for maximum impact"
    pricing:
      total: "Sum of individual rates - 20% network discount"
      example: "5 personas x $500 avg = $2,500 - 20% = $2,000"
    value_add: "Coordinated amplification per S23 protocols"

  network_campaign:
    name: "Network Campaign Package"
    description: "Full campaign execution across network"
    duration: "2 weeks"
    includes:
      - "3 posts per persona"
      - "Daily story integration"
      - "Coordinated launch sequence"
      - "Cross-engagement amplification"
    pricing:
      total: "Individual rates x content volume - 25%"
      example: "$15,000 value at $11,250"

  network_takeover:
    name: "Network Takeover"
    description: "Dominant presence across entire network"
    duration: "1 month"
    includes:
      - "Weekly content per persona"
      - "Story mentions multiple times per week"
      - "Exclusive category partnership"
      - "Performance reporting"
    pricing:
      total: "Custom, typically $20,000+"
```

**Step 6.2: Internal Cross-Promotion Value**

```yaml
internal_cross_promotion:
  value_tracking:
    description: "Track value of network cross-promotion"
    method: "Assign shadow value to internal promotions"

    shadow_pricing:
      internal_comment: 25  # Value of engagement
      internal_share: 100  # Value of amplification
      internal_collaboration: 500  # Value of collab content

  attribution:
    method: "Track which persona drives conversions"
    tools: ["UTM parameters", "Unique discount codes", "Tracking links"]

  internal_roi:
    tracking: "Monthly internal promotion value vs external revenue"
    target: "Internal promotions should drive 3x value in conversions"
```

---

### Phase 7: Revenue Tracking and Reporting

**Duration:** 30-45 minutes

**Step 7.1: Per-Account Revenue Tracking**

```yaml
revenue_tracking:
  tracking_categories:
    ugc_deals:
      fields: ["Brand", "Deal value", "Content delivered", "Payment status", "Date"]

    sponsored_content:
      fields: ["Brand", "Platform", "Content type", "Rate", "Performance", "Date"]

    affiliate:
      fields: ["Program", "Clicks", "Conversions", "Commission", "Date"]

    master_brand:
      fields: ["Product", "Promotion type", "Conversions attributed", "Revenue", "Date"]

    other:
      fields: ["Source", "Type", "Amount", "Date"]

  tracking_schedule:
    daily: "Affiliate dashboard check"
    weekly: "Revenue summary update"
    monthly: "Full reconciliation and reporting"
    quarterly: "Trend analysis and strategy adjustment"
```

**Step 7.2: Revenue Dashboard Template**

```markdown
# NETWORK REVENUE DASHBOARD: [Month Year]

## EXECUTIVE SUMMARY

| Metric | This Month | Last Month | YTD | Annual Target | % to Target |
|--------|------------|------------|-----|---------------|-------------|
| **Total Revenue** | $[X] | $[X] | $[X] | $[X] | [X]% |
| **Per Persona Avg** | $[X] | $[X] | $[X] | $[X] | [X]% |
| **Best Performer** | [Persona] | [Persona] | [Persona] | - | - |

---

## REVENUE BY PERSONA

### [Persona 001 Name]

| Stream | Month | YTD | Target | Status |
|--------|-------|-----|--------|--------|
| UGC Deals | $[X] | $[X] | $[X] | 🟢/🟡/🔴 |
| Sponsored | $[X] | $[X] | $[X] | 🟢/🟡/🔴 |
| Affiliate | $[X] | $[X] | $[X] | 🟢/🟡/🔴 |
| Master Brand | $[X] | $[X] | $[X] | 🟢/🟡/🔴 |
| Other | $[X] | $[X] | $[X] | 🟢/🟡/🔴 |
| **TOTAL** | **$[X]** | **$[X]** | **$[X]** | 🟢/🟡/🔴 |

[Repeat for each persona]

---

## REVENUE BY STREAM (Network Total)

| Stream | Month | % of Total | YTD | Trend |
|--------|-------|------------|-----|-------|
| UGC Deals | $[X] | [X]% | $[X] | ↑/↓/→ |
| Sponsored | $[X] | [X]% | $[X] | ↑/↓/→ |
| Affiliate | $[X] | [X]% | $[X] | ↑/↓/→ |
| Master Brand | $[X] | [X]% | $[X] | ↑/↓/→ |
| Other | $[X] | [X]% | $[X] | ↑/↓/→ |

---

## BRAND PARTNERSHIPS

### Active Partnerships

| Brand | Persona | Type | Value | Status | End Date |
|-------|---------|------|-------|--------|----------|
| [Brand] | [Persona] | [Type] | $[X] | Active | [Date] |

### Pipeline

| Brand | Persona | Type | Est. Value | Stage | Next Step |
|-------|---------|------|------------|-------|-----------|
| [Brand] | [Persona] | [Type] | $[X] | [Stage] | [Action] |

---

## TOP AFFILIATE PERFORMERS

| Product | Persona | Clicks | Conversions | Revenue |
|---------|---------|--------|-------------|---------|
| [Product] | [Persona] | [X] | [X] | $[X] |

---

## MASTER BRAND ATTRIBUTION

| Product | Conversions | Revenue | Top Persona | Top Content |
|---------|-------------|---------|-------------|-------------|
| [Product] | [X] | $[X] | [Persona] | [Content] |

---

## INSIGHTS & ACTIONS

### What Worked
- [Insight 1]
- [Insight 2]

### What Didn't
- [Issue 1]
- [Issue 2]

### Next Month Priorities
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]
```

**Step 7.3: Revenue Projections Model**

```yaml
revenue_projections:
  methodology:
    ugc_projection:
      formula: "Average deal value x Expected deals per month"
      variables:
        avg_deal_value: 1500
        deals_per_month: 3
        growth_rate: 0.10  # 10% month-over-month

    sponsored_projection:
      formula: "Rate x Posts x Acceptance rate"
      variables:
        average_rate: 500
        posts_available: 4
        acceptance_rate: 0.60

    affiliate_projection:
      formula: "Reach x CTR x Conversion x AOV x Commission"
      variables:
        monthly_reach: 500000
        click_through_rate: 0.02
        conversion_rate: 0.05
        average_order_value: 75
        commission_rate: 0.15

    master_brand_projection:
      formula: "Traffic driven x Conversion x Product value x Attribution"
      variables:
        monthly_traffic: 5000
        conversion_rate: 0.03
        average_value: 200
        attribution_rate: 0.50

  projection_template:
    | Month | UGC | Sponsored | Affiliate | Master Brand | Total |
    |-------|-----|-----------|-----------|--------------|-------|
    | Month 1 | $[X] | $[X] | $[X] | $[X] | $[X] |
    | Month 2 | $[X] | $[X] | $[X] | $[X] | $[X] |
    | [Continue...] |
    | **Year Total** | $[X] | $[X] | $[X] | $[X] | $[X] |
```

---

### Phase 8: Revenue Model Template Assembly

**Duration:** 20-30 minutes

Compile all monetization elements into the Revenue Model for each account.

---

## OUTPUT SPECIFICATION

### Primary Deliverable: Revenue Model Per Account

One Revenue Model document per persona:

```
REVENUE MODEL: [PERSONA NAME]
Version: 1.0
Created: [Date]
Last Updated: [Date]
Review Cadence: Monthly

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1: REVENUE OVERVIEW
├── Target Summary
├── Stream Breakdown
├── Archetype Fit Analysis
└── Competitive Positioning

SECTION 2: UGC BRAND DEALS
├── Service Packages
├── Rate Card
├── Qualification Criteria
└── Pipeline Management

SECTION 3: SPONSORED CONTENT
├── Pricing Model
├── Media Kit
├── Partnership Approach
└── Active Partnerships

SECTION 4: AFFILIATE MARKETING
├── Program Portfolio
├── Content Strategy
├── Link Management
└── Performance Tracking

SECTION 5: MASTER BRAND PROMOTION
├── Product Assignments
├── Promotion Strategy
├── Authenticity Guidelines
└── Attribution Tracking

SECTION 6: OTHER STREAMS
├── Digital Products
├── Consulting/Coaching
├── Community/Membership
└── Future Opportunities

SECTION 7: TRACKING & REPORTING
├── KPIs
├── Dashboard
├── Review Process
└── Optimization Protocol

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Secondary Deliverables

1. **Network Revenue Playbook**
   - Combined network monetization strategy
   - Cross-promotion pricing
   - Aggregate projections

2. **Media Kit Per Persona**
   - Brand partnership materials
   - Statistics and demographics
   - Pricing overview

3. **Revenue Tracking Templates**
   - Spreadsheet templates
   - Dashboard configurations
   - Reporting schedules

---

## OUTPUT SCHEMAS

### Revenue Model Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "RevenueModel",
  "type": "object",
  "required": ["persona_id", "targets", "revenue_streams", "tracking"],
  "properties": {
    "persona_id": {"type": "string"},
    "version": {"type": "string"},
    "last_updated": {"type": "string", "format": "date"},
    "targets": {
      "type": "object",
      "required": ["annual", "monthly"],
      "properties": {
        "annual": {"type": "number"},
        "monthly": {"type": "number"},
        "quarterly_breakdown": {
          "type": "array",
          "items": {"type": "number"},
          "minItems": 4,
          "maxItems": 4
        }
      }
    },
    "revenue_streams": {
      "type": "object",
      "properties": {
        "ugc_brand_deals": {
          "type": "object",
          "properties": {
            "enabled": {"type": "boolean"},
            "target_percentage": {"type": "number"},
            "packages": {"type": "array"},
            "rate_card": {"type": "object"},
            "qualification_criteria": {"type": "object"}
          }
        },
        "sponsored_content": {
          "type": "object",
          "properties": {
            "enabled": {"type": "boolean"},
            "target_percentage": {"type": "number"},
            "pricing_model": {"type": "object"},
            "monthly_cap": {"type": "integer"}
          }
        },
        "affiliate_marketing": {
          "type": "object",
          "properties": {
            "enabled": {"type": "boolean"},
            "target_percentage": {"type": "number"},
            "programs": {"type": "array"},
            "content_strategy": {"type": "object"}
          }
        },
        "master_brand": {
          "type": "object",
          "properties": {
            "enabled": {"type": "boolean"},
            "target_percentage": {"type": "number"},
            "product_assignments": {"type": "array"},
            "promotion_strategy": {"type": "object"}
          }
        },
        "other_streams": {
          "type": "object",
          "additionalProperties": {
            "type": "object",
            "properties": {
              "enabled": {"type": "boolean"},
              "target_percentage": {"type": "number"},
              "details": {"type": "object"}
            }
          }
        }
      }
    },
    "tracking": {
      "type": "object",
      "properties": {
        "kpis": {"type": "array", "items": {"type": "object"}},
        "reporting_schedule": {"type": "string"},
        "tools": {"type": "array", "items": {"type": "string"}}
      }
    },
    "projections": {
      "type": "object",
      "properties": {
        "monthly": {"type": "array"},
        "assumptions": {"type": "object"},
        "scenarios": {"type": "object"}
      }
    }
  }
}
```

### Brand Deal Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "BrandDeal",
  "type": "object",
  "required": ["deal_id", "brand", "persona_id", "type", "value", "status"],
  "properties": {
    "deal_id": {"type": "string"},
    "brand": {
      "type": "object",
      "required": ["name"],
      "properties": {
        "name": {"type": "string"},
        "industry": {"type": "string"},
        "contact": {"type": "string"},
        "website": {"type": "string"}
      }
    },
    "persona_id": {"type": "string"},
    "type": {
      "type": "string",
      "enum": ["ugc", "sponsored_post", "campaign", "ambassador", "affiliate_custom"]
    },
    "value": {"type": "number"},
    "deliverables": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": {"type": "string"},
          "quantity": {"type": "integer"},
          "platform": {"type": "string"},
          "due_date": {"type": "string", "format": "date"},
          "status": {"type": "string", "enum": ["pending", "in_progress", "delivered", "approved"]}
        }
      }
    },
    "timeline": {
      "type": "object",
      "properties": {
        "start_date": {"type": "string", "format": "date"},
        "end_date": {"type": "string", "format": "date"},
        "milestones": {"type": "array"}
      }
    },
    "payment": {
      "type": "object",
      "properties": {
        "total": {"type": "number"},
        "structure": {"type": "string"},
        "status": {"type": "string", "enum": ["pending", "partial", "complete"]},
        "received": {"type": "number"}
      }
    },
    "usage_rights": {
      "type": "object",
      "properties": {
        "duration": {"type": "string"},
        "platforms": {"type": "array", "items": {"type": "string"}},
        "exclusivity": {"type": "string"}
      }
    },
    "status": {
      "type": "string",
      "enum": ["prospect", "negotiating", "contracted", "in_progress", "delivered", "complete", "cancelled"]
    },
    "notes": {"type": "string"}
  }
}
```

### Network Revenue Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "NetworkRevenue",
  "type": "object",
  "required": ["network_id", "period", "personas", "totals"],
  "properties": {
    "network_id": {"type": "string"},
    "period": {
      "type": "object",
      "properties": {
        "type": {"type": "string", "enum": ["monthly", "quarterly", "annual"]},
        "start_date": {"type": "string", "format": "date"},
        "end_date": {"type": "string", "format": "date"}
      }
    },
    "personas": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["persona_id", "revenue"],
        "properties": {
          "persona_id": {"type": "string"},
          "revenue": {
            "type": "object",
            "properties": {
              "ugc": {"type": "number"},
              "sponsored": {"type": "number"},
              "affiliate": {"type": "number"},
              "master_brand": {"type": "number"},
              "other": {"type": "number"},
              "total": {"type": "number"}
            }
          },
          "vs_target": {"type": "number"},
          "vs_previous": {"type": "number"}
        }
      }
    },
    "totals": {
      "type": "object",
      "properties": {
        "gross_revenue": {"type": "number"},
        "by_stream": {
          "type": "object",
          "additionalProperties": {"type": "number"}
        },
        "vs_target": {"type": "number"},
        "vs_previous": {"type": "number"}
      }
    },
    "top_performers": {
      "type": "object",
      "properties": {
        "top_persona": {"type": "string"},
        "top_brand_deal": {"type": "object"},
        "top_affiliate_product": {"type": "object"}
      }
    }
  }
}
```

---

## QUALITY GATES (Anti-Degradation Checks)

### Gate 1: Revenue Realism

```
REVENUE REALISM CHECKLIST:

□ Targets based on comparable accounts at similar size
□ UGC rates align with market rates for niche
□ Sponsored content caps don't compromise content quality
□ Affiliate projections use conservative conversion rates
□ Master brand promotion doesn't overwhelm content
□ Total promotional content under 30% of output
□ Pipeline assumptions are defensible
```

### Gate 2: Authenticity Preservation

```
AUTHENTICITY CHECKLIST:

□ All promoted products align with persona values
□ Promotional content maintains persona voice
□ Audience trust indicators monitored
□ Disclosure compliance verified
□ Negative feedback addressed promptly
□ Product claims are truthful and defensible
□ Persona wouldn't promote anything they don't use
```

### Gate 3: Operational Viability

```
OPERATIONAL CHECKLIST:

□ Content production capacity supports monetization
□ Brand deal turnaround times are achievable
□ Affiliate link management system in place
□ Payment tracking and invoicing functional
□ Tax and legal compliance verified
□ Pipeline management system functional
□ Reporting cadence is sustainable
```

### Gate 4: Network Balance

```
NETWORK BALANCE CHECKLIST:

□ Revenue distribution across personas is appropriate
□ No single persona overwhelmed with deals
□ Cross-promotion doesn't feel forced
□ Network packages priced competitively
□ Master brand promotion distributed fairly
□ Competitive conflicts identified and managed
□ Network revenue > sum of individual potential
```

---

## TEMPLATES

### Template 1: Per-Account Revenue Model (Full Document)

```markdown
# REVENUE MODEL: [PERSONA NAME]

**Version:** 1.0
**Created:** [Date]
**Last Updated:** [Date]
**Persona ID:** [P001]
**Review Cadence:** Monthly

---

## QUICK REFERENCE

| Metric | Monthly Target | Annual Target | YTD Actual |
|--------|----------------|---------------|------------|
| **Total Revenue** | $[X] | $[X] | $[X] |
| **Primary Stream** | [Stream]: $[X] | $[X] | $[X] |
| **Secondary Stream** | [Stream]: $[X] | $[X] | $[X] |

---

## 1. REVENUE OVERVIEW

### Target Summary

| Period | Target | Stretch Target |
|--------|--------|----------------|
| Monthly | $[X] | $[X] |
| Quarterly | $[X] | $[X] |
| Annual | $[X] | $[X] |

### Stream Breakdown

| Stream | Target % | Monthly $ | Annual $ | Fit Score |
|--------|----------|-----------|----------|-----------|
| UGC Brand Deals | [X]% | $[X] | $[X] | [High/Med/Low] |
| Sponsored Content | [X]% | $[X] | $[X] | [High/Med/Low] |
| Affiliate Marketing | [X]% | $[X] | $[X] | [High/Med/Low] |
| Master Brand | [X]% | $[X] | $[X] | [High/Med/Low] |
| Other | [X]% | $[X] | $[X] | [High/Med/Low] |

### Archetype Fit Analysis

**Archetype:** [Archetype]

**Primary Revenue Strengths:**
- [Strength 1]
- [Strength 2]

**Secondary Opportunities:**
- [Opportunity 1]
- [Opportunity 2]

**Avoid/Limited:**
- [Stream to limit and why]

---

## 2. UGC BRAND DEALS

### Service Packages

#### Basic UGC
| Element | Details |
|---------|---------|
| **Name** | [Package name] |
| **Price** | $[X] |
| **Includes** | [Deliverables] |
| **Turnaround** | [X] days |
| **Usage Rights** | [Terms] |

#### Standard UGC
[Same format]

#### Premium UGC
[Same format]

### Rate Card Summary

| Content Type | Base Rate | Rush Rate | Extended Usage |
|--------------|-----------|-----------|----------------|
| Video (30s) | $[X] | +50% | +25%/+50%/+100% |
| Video (60s) | $[X] | +50% | +25%/+50%/+100% |
| Static (3) | $[X] | +50% | +25%/+50%/+100% |

### Brand Qualification

**Must Have:**
- [Criteria 1]
- [Criteria 2]
- [Criteria 3]

**Deal Breakers:**
- [Criteria 1]
- [Criteria 2]

### Active Deals & Pipeline

| Brand | Type | Value | Status | Next Step |
|-------|------|-------|--------|-----------|
| [Brand] | [Type] | $[X] | [Status] | [Action] |

---

## 3. SPONSORED CONTENT

### Pricing Model

**Base Rate Calculation:**
- Follower count: [X] = [Multiplier]
- Engagement rate: [X]% = [Adjustment]
- **Base rate:** $[X]

**Content Type Rates:**
| Type | Rate | Notes |
|------|------|-------|
| Feed Post | $[X] | [Notes] |
| Carousel | $[X] | [Notes] |
| Reel/Video | $[X] | [Notes] |
| Story Set | $[X] | [Notes] |

**Add-Ons:**
| Add-On | Rate |
|--------|------|
| Exclusivity (30 days) | +25% |
| Usage rights extension | +25-100% |
| Rush (48hr) | +50% |

### Media Kit Highlights

[Summary of media kit - full kit attached separately]

- Followers: [X] across [platforms]
- Engagement: [X]%
- Audience: [Demographics summary]
- Past partners: [List]

### Active Partnerships

| Brand | Type | Value | Duration | Status |
|-------|------|-------|----------|--------|
| [Brand] | [Type] | $[X] | [Dates] | Active |

---

## 4. AFFILIATE MARKETING

### Program Portfolio

| Program | Commission | Cookie | Primary Use |
|---------|------------|--------|-------------|
| [Program 1] | [X]% | [X] days | [Use case] |
| [Program 2] | [X]% | [X] days | [Use case] |
| [Program 3] | [X]% | [X] days | [Use case] |

### Content Strategy

**Affiliate Content Types:**
| Type | Frequency | Approach |
|------|-----------|----------|
| Reviews | [X]/month | [Approach] |
| Comparisons | [X]/month | [Approach] |
| Tutorials | [X]/month | [Approach] |
| Stories | [X]/week | [Approach] |

### Link Management

- **Tool:** [Tool name]
- **UTM Format:** [Format]
- **Tracking:** [Method]

### Performance Tracking

| Month | Clicks | Conversions | Revenue |
|-------|--------|-------------|---------|
| [Month] | [X] | [X] | $[X] |

**Top Performers:**
1. [Product] - $[X]
2. [Product] - $[X]
3. [Product] - $[X]

---

## 5. MASTER BRAND PROMOTION

### Product Assignments

| Product | Role | Content Types | Frequency |
|---------|------|---------------|-----------|
| [Product 1] | Primary | [Types] | [Freq] |
| [Product 2] | Secondary | [Types] | [Freq] |

### Promotion Strategy

**Evergreen Approach:**
- [How product is integrated naturally]
- [Frequency guidelines]
- [Content types]

**Launch Support:**
- [Role during launches]
- [Content commitment]
- [Coordination with network]

### Authenticity Guidelines

**Do:**
- [Guideline 1]
- [Guideline 2]

**Don't:**
- [Guideline 1]
- [Guideline 2]

### Attribution

**Tracking Method:** [Method]
**Unique Code:** [Code if applicable]
**Link Format:** [Format]

---

## 6. OTHER REVENUE STREAMS

### Digital Products

| Product | Price | Status | Monthly Sales Target |
|---------|-------|--------|---------------------|
| [Product] | $[X] | [Status] | [X] |

### Consulting/Coaching

| Offering | Rate | Availability |
|----------|------|--------------|
| [Offering] | $[X]/hr | [Hours/month] |

### Future Opportunities

- [Opportunity 1]
- [Opportunity 2]

---

## 7. TRACKING & REPORTING

### Key Performance Indicators

| KPI | Target | Current | Tracking |
|-----|--------|---------|----------|
| Monthly Revenue | $[X] | $[X] | Weekly |
| UGC Deals Closed | [X]/month | [X] | Weekly |
| Affiliate Conversion | [X]% | [X]% | Monthly |
| Brand Pipeline Value | $[X] | $[X] | Weekly |

### Reporting Schedule

| Report | Frequency | Owner | Due |
|--------|-----------|-------|-----|
| Revenue Summary | Weekly | [Who] | [Day] |
| Full Dashboard | Monthly | [Who] | [Day] |
| Strategic Review | Quarterly | [Who] | [Day] |

### Review Process

**Weekly (15 min):**
- Check revenue against targets
- Update pipeline
- Note any issues

**Monthly (60 min):**
- Full dashboard review
- Performance analysis
- Strategy adjustments

---

## APPENDICES

### A. Full Rate Card
[Detailed rate card]

### B. Media Kit
[Full media kit]

### C. Contract Templates
[Standard agreements]

### D. Pitch Templates
[Outreach templates]

---

*This Revenue Model is reviewed monthly and updated as metrics and strategies evolve.*
```

### Template 2: Network Revenue Projections

```markdown
# NETWORK REVENUE PROJECTIONS: [Year]

## Annual Summary

| Persona | Annual Target | Q1 | Q2 | Q3 | Q4 |
|---------|---------------|-----|-----|-----|-----|
| P001 | $[X] | $[X] | $[X] | $[X] | $[X] |
| P002 | $[X] | $[X] | $[X] | $[X] | $[X] |
| P003 | $[X] | $[X] | $[X] | $[X] | $[X] |
| **TOTAL** | **$[X]** | **$[X]** | **$[X]** | **$[X]** | **$[X]** |

## By Revenue Stream

| Stream | Annual | % of Total |
|--------|--------|------------|
| UGC Brand Deals | $[X] | [X]% |
| Sponsored Content | $[X] | [X]% |
| Affiliate Marketing | $[X] | [X]% |
| Master Brand | $[X] | [X]% |
| Other | $[X] | [X]% |
| **TOTAL** | **$[X]** | 100% |

## Monthly Projection

| Month | UGC | Sponsored | Affiliate | Master | Other | Total |
|-------|-----|-----------|-----------|--------|-------|-------|
| Jan | $[X] | $[X] | $[X] | $[X] | $[X] | $[X] |
| Feb | $[X] | $[X] | $[X] | $[X] | $[X] | $[X] |
| Mar | $[X] | $[X] | $[X] | $[X] | $[X] | $[X] |
| Apr | $[X] | $[X] | $[X] | $[X] | $[X] | $[X] |
| May | $[X] | $[X] | $[X] | $[X] | $[X] | $[X] |
| Jun | $[X] | $[X] | $[X] | $[X] | $[X] | $[X] |
| Jul | $[X] | $[X] | $[X] | $[X] | $[X] | $[X] |
| Aug | $[X] | $[X] | $[X] | $[X] | $[X] | $[X] |
| Sep | $[X] | $[X] | $[X] | $[X] | $[X] | $[X] |
| Oct | $[X] | $[X] | $[X] | $[X] | $[X] | $[X] |
| Nov | $[X] | $[X] | $[X] | $[X] | $[X] | $[X] |
| Dec | $[X] | $[X] | $[X] | $[X] | $[X] | $[X] |

## Assumptions

**UGC:**
- Average deal value: $[X]
- Deals per persona/month: [X]
- Growth rate: [X]%/month

**Sponsored:**
- Average rate: $[X]
- Posts available/persona/month: [X]
- Fill rate: [X]%

**Affiliate:**
- Network reach: [X]
- CTR: [X]%
- Conversion: [X]%
- AOV: $[X]
- Commission: [X]%

**Master Brand:**
- Monthly traffic driven: [X]
- Conversion: [X]%
- Average value: $[X]
- Attribution: [X]%

## Scenarios

| Scenario | Annual Revenue | Variance |
|----------|----------------|----------|
| Conservative | $[X] | -20% |
| Base | $[X] | - |
| Optimistic | $[X] | +30% |

---

*Projections updated monthly based on actuals.*
```

---

## EXAMPLES

### Example 1: UGC Rate Card - Maya Chen (Educator)

```markdown
# MAYA CHEN UGC RATE CARD

## Video Content

| Format | Duration | Price | Usage |
|--------|----------|-------|-------|
| Tutorial UGC | 30-45s | $650 | 3 months |
| Tutorial UGC | 45-60s | $850 | 3 months |
| Tutorial UGC | 60-90s | $1,100 | 3 months |
| Talking Head | 30-45s | $500 | 3 months |
| Talking Head | 45-60s | $700 | 3 months |

## Add-Ons

| Add-On | Price |
|--------|-------|
| Additional hook variation | $175 |
| Screen recording integration | $150 |
| Custom graphics/overlays | $200 |
| B-roll package | $250 |

## Static Content

| Format | Quantity | Price |
|--------|----------|-------|
| Tutorial screenshots | 3 | $350 |
| Product lifestyle | 5 | $600 |
| Before/after graphics | 3 | $450 |

## Packages

| Package | Includes | Price | Savings |
|---------|----------|-------|---------|
| Starter | 2 tutorial videos + 3 statics | $1,600 | 15% |
| Standard | 3 videos + 5 statics + hooks | $2,800 | 20% |
| Premium | 5 videos + 10 statics + strategy | $4,500 | 25% |

## Usage Rights Extensions

| Duration | Cost |
|----------|------|
| 6 months | +30% |
| 12 months | +60% |
| Perpetual | +120% |

## Rush Delivery

| Turnaround | Additional |
|------------|------------|
| 48 hours | +60% |
| 72 hours | +35% |

## Notes
- Educator archetype = premium rates for tutorial content
- All content includes one round of revisions
- 50% deposit required, Net 15 on balance
- Scheduling priority for returning brands
```

### Example 2: Affiliate Revenue Projection

```
AFFILIATE REVENUE PROJECTION: Sam Torres (Curator)

MONTHLY METRICS:
├── Monthly reach: 350,000
├── Affiliate content pieces: 12 (3/week)
├── Click-through rate: 3.5% (curator = higher trust)
├── Monthly clicks: 12,250
├── Conversion rate: 7% (reviews drive intent)
├── Monthly conversions: 858
├── Average order value: $85
├── Average commission: 18%
└── Monthly affiliate revenue: $13,127

PROGRAM BREAKDOWN:
├── Amazon Associates (30% of clicks)
│   ├── Clicks: 3,675
│   ├── Conversion: 5%
│   ├── AOV: $65
│   ├── Commission: 6%
│   └── Revenue: $716
│
├── AI Tool Affiliate (40% of clicks)
│   ├── Clicks: 4,900
│   ├── Conversion: 8%
│   ├── AOV: $50/month
│   ├── Commission: 30%
│   └── Revenue: $5,880
│
├── Course Affiliates (20% of clicks)
│   ├── Clicks: 2,450
│   ├── Conversion: 4%
│   ├── AOV: $297
│   ├── Commission: 25%
│   └── Revenue: $7,277
│
└── Other (10% of clicks)
    ├── Clicks: 1,225
    ├── Conversion: 6%
    ├── AOV: $75
    ├── Commission: 15%
    └── Revenue: $827

ANNUAL PROJECTION: $157,524
```

### Example 3: Network Cross-Promotion Pricing

```
NETWORK PACKAGE PRICING: AI Creator Tools Network

INDIVIDUAL RATES (Full Price):
├── Maya Chen (Educator)
│   ├── Instagram Reel: $600
│   └── TikTok Video: $500
│
├── Jordan Rivers (Provocateur)
│   ├── Instagram Reel: $500
│   └── Twitter Thread: $300
│
└── Sam Torres (Curator)
    ├── Instagram Reel: $450
    └── TikTok Video: $400

NETWORK AWARENESS PACKAGE:
├── Includes:
│   ├── 1 Reel per persona (3 total)
│   ├── Story mentions from all (3 total)
│   ├── Coordinated posting over 5 days
│   └── Cross-engagement amplification
├── Individual value: $1,550 + stories ($300) = $1,850
├── Network price: $1,480 (20% discount)
└── Added value: Coordination, amplification, reach synergy

NETWORK CAMPAIGN PACKAGE:
├── Duration: 2 weeks
├── Includes:
│   ├── 3 posts per persona (9 total)
│   ├── Daily story integration (42 stories)
│   ├── Coordinated launch sequence
│   └── Cross-engagement support
├── Individual value: $5,550
├── Network price: $4,160 (25% discount)
└── Added value: Campaign strategy, message coordination, amplification

NETWORK TAKEOVER (MONTHLY):
├── Duration: 1 month
├── Includes:
│   ├── 4 posts per persona (12 total)
│   ├── 3x/week story mentions (36 stories)
│   ├── Category exclusivity
│   ├── Performance reporting
│   └── Strategy consultation
├── Individual value: $8,000+
├── Network price: $6,000 (25%+ discount)
└── Added value: Full network domination, exclusivity, data
```

---

## CHANGELOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | [Date] | Initial release |

---

## RELATED SKILLS

- **S21-persona-architect:** Defines archetypes that inform monetization fit
- **S22-account-strategy:** Establishes audience and content that enables monetization
- **S23-network-coordination:** Orchestrates cross-promotion for revenue campaigns

---

*S24-monetization-engine: Extracting maximum revenue while maintaining authentic audience relationships.*
