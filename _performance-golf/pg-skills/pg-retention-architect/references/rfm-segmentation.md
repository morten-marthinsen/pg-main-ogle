# RFM Segmentation Reference

Complete framework for customer segmentation, targeting, and lifecycle management.

---

## Table of Contents
1. Core RFM Dimensions
2. RFM Tier Structure & Actions
3. Advanced Segmentation Beyond RFM
4. Predictive Scoring Models
5. Segment-Based Campaign Strategy
6. RFM-Based Promo Calendar Logic
7. Qualification & Economics

---

## 1. Core RFM Dimensions

### Recency (R): Days Since Last Purchase/Engagement
- **Signals:** Interest decay, reactivation opportunity window
- **Actions:** Win-back campaigns, urgency offers, "we miss you" sequences
- **Scoring:** 5 = purchased within 30 days → 1 = 180+ days ago

### Frequency (F): Purchase/Engagement Intervals
- **Signals:** Loyalty level, habit formation, subscription readiness
- **Actions:** Subscription offers, loyalty programs, insider access
- **Scoring:** 5 = 10+ purchases → 1 = single purchase

### Monetary (M): Total and Average Order Values
- **Signals:** Revenue concentration, VIP potential, price sensitivity
- **Actions:** High-ticket offers, premium experiences, consultative upsells
- **Scoring:** 5 = top 20% spenders → 1 = bottom 20%

---

## 2. RFM Tier Structure & Actions

### Champions (555) — Top-tier: High R, F, M
- **Profile:** Recent, frequent, high-spending customers — your best people
- **% of Revenue:** Typically 60-70% from top 20% of customers
- **Strategy:** VIP treatment, referral programs, early access, brand advocacy
- **Campaign Tone:** Exclusive, insider, "you earned this"
- **Never:** Discount. They buy at full price. Discounting devalues the relationship.
- **Flows:** VIP welcome, new product early access, referral program, exclusive experiences
- **KPI:** Referral rate, advocacy score, share of wallet

### Loyalists (X5X) — High Frequency
- **Profile:** Buy often but may not spend as much per order
- **Strategy:** Subscription conversion, bundle offers, AOV expansion
- **Campaign Tone:** Appreciation, "valued member," consistency rewards
- **Flows:** Subscription pitch, bundle recommendations, loyalty milestone celebrations
- **KPI:** Subscription conversion rate, AOV trend

### Big Spenders (XX5) — High Monetary
- **Profile:** Spend big but may not buy often
- **Strategy:** Consultative upsells, premium/VIP experiences, high-ticket invitations
- **Campaign Tone:** Premium, "designed for serious players," personalized
- **Flows:** High-ticket experience invitations, premium product launches, concierge offers
- **KPI:** Purchase frequency trend, VIP conversion rate

### At Risk (1-2 on Recency, any F/M)
- **Profile:** Haven't purchased recently — clock is ticking
- **Strategy:** Urgent win-back sequences with progressive incentives
- **Campaign Tone:** "We noticed you've been away," urgency without desperation
- **Flows:** 3-step win-back (reminder → incentive → final chance), survey for feedback
- **KPI:** Win-back conversion rate, time to reactivation

### Can't Lose (4-5 on F/M, 1-2 on R)
- **Profile:** Used to be your best — now going dark. Highest urgency segment.
- **Strategy:** Personal outreach, phone calls, VIP recovery offers
- **Campaign Tone:** Personal, "we want to understand what happened"
- **Flows:** Personal email from leadership, phone outreach, exclusive comeback offer
- **KPI:** Recovery rate, feedback collection rate

### Hibernating (111) — Low Everything
- **Profile:** Haven't engaged in a long time, low historical value
- **Strategy:** Final reactivation attempt → list cleaning
- **Campaign Tone:** "Last chance" or sunset sequence
- **Flows:** Sunset series (3 emails), then suppress for deliverability
- **KPI:** Reactivation rate, list hygiene improvement

### Promising (Recent, Low F/M)
- **Profile:** New customers with one purchase — critical conversion window
- **Strategy:** Second purchase activation within 30 days (this is THE most important retention moment)
- **Campaign Tone:** Onboarding, education, "here's what to do next"
- **Flows:** Welcome series, second purchase nudge, product education, cross-sell
- **KPI:** 2nd purchase rate within 30/60/90 days

---

## 3. Advanced Segmentation Beyond RFM

### Behavioral Segmentation Layers
Layer these ON TOP of RFM for surgical targeting:

| Layer | Data Points | Use Case |
|-------|------------|----------|
| **Browse Behavior** | Category affinity, session depth, cart abandoners | Product recommendations, retargeting |
| **Email Engagement** | Opens, clicks, conversion patterns | Send frequency optimization, re-engagement |
| **Product Affinity** | Equipment vs consumable vs service vs digital | Cross-sell paths, bundle design |
| **Channel Preference** | Email-only, SMS-preferred, omnichannel | Channel-specific campaigns |
| **Seasonal Patterns** | Fair-weather vs year-round | Seasonal activation, off-season nurture |
| **Acquisition Source** | Paid, organic, referral, event | Source-specific onboarding paths |

### Customer Lifecycle Stages (Golf Context)
| Stage | Signals | Strategy |
|-------|---------|----------|
| **Beginner** | First purchase, low-ticket, educational content consumed | Education focus, starter sets, confidence building |
| **Enthusiast** | Repeat purchases, mid-ticket, engaging with improvement content | Skill development, equipment upgrades, community |
| **Serious** | High-ticket, frequent, consuming advanced content | Performance optimization, premium products, VIP access |
| **Lifetime** | Multi-year, high LTV, advocates | Brand loyalty, referral programs, legacy experiences |

---

## 4. Predictive Scoring Models

### Churn Risk Score
Build from: Engagement decay rate, support ticket frequency, return rate, email disengagement, purchase interval stretching
- **High Risk (80-100):** Immediate intervention needed
- **Medium Risk (50-79):** Proactive nurture required
- **Low Risk (0-49):** Maintain current engagement

### VIP Potential Score
Build from: First purchase value, early engagement depth, content consumption velocity, multi-category browsing
- Use to identify Champions-in-the-making BEFORE they reach full Champion status
- Route high-potential customers to accelerated VIP paths

### Next Purchase Timing
Build from: Historical purchase intervals by segment, category replenishment cycles, seasonal patterns
- Use to time campaigns precisely — don't send too early (annoy) or too late (lost)

### Cross-sell Propensity
Build from: Category expansion history, browse-but-didn't-buy patterns, complementary purchase rates
- Use for product recommendation engines and bundle design

---

## 5. Segment-Based Campaign Strategy

### The Segment-Offer Matrix
| Segment | Offer Type | Discount? | Urgency Level | Channel Priority |
|---------|-----------|-----------|---------------|-----------------|
| Champions | Exclusive access, referral rewards | Never | Low (they're loyal) | Email + personal |
| Loyalists | Subscription, bundles | Rarely | Medium | Email + SMS |
| Big Spenders | Premium experiences, VIP | Never | Low-Medium | Email + direct mail |
| At Risk | Win-back incentive | Progressive | High | Email + SMS + retargeting |
| Can't Lose | Personal recovery | If needed | Critical | Phone + email + direct mail |
| Hibernating | Final chance / sunset | Deep if at all | Final | Email only |
| Promising | 2nd purchase nudge | Strategic | Medium-High | Email + SMS |

### Dynamic Pricing Rules
- **75%+ capacity:** Full price only — no incentives needed
- **50-74% capacity:** Value-adds (free shipping, bonus gift) — no discounts
- **Below 50%:** Strategic incentives to targeted segments only
- **Never discount for Champions or Big Spenders** — it trains the wrong behavior

---

## 6. RFM-Based Promo Calendar Logic

### Seasonal Strategy (Golf Business)
| Month | Primary Segment Focus | Promo Type | Goal |
|-------|----------------------|-----------|------|
| Jan-Feb | Hibernating, At Risk | "New Year, New Game" reactivation | Clear dormant, rebuild engagement |
| Mar-Apr | Champions, Promising | Premium positioning, 2nd purchase | Capture peak season at full price |
| May-Jun | All segments | Seasonal peak — segment-specific offers | Maximum revenue, protected margins |
| Jul-Aug | Loyalists, Big Spenders | VIP experiences, subscription push | LTV expansion during peak engagement |
| Sep-Oct | At Risk (summer buyers) | Early win-back before hibernation | Prevent seasonal churn |
| Nov-Dec | All segments | Holiday gifting, year-end VIP | Revenue spike + annual recap |

### Promo Conflict Prevention
- **Rule:** Never run more than 2 promos simultaneously
- **Rule:** Champions and Big Spenders are excluded from discount promos
- **Rule:** Minimum 10-day gap between promos to same segment
- **Rule:** VIP experiences NEVER discounted — add value instead

---

## 7. Qualification & Economics

### Client Qualification Formula
**List Size (thousands) × Offer Price (thousands) ≥ 25**

Examples:
- 10K list × $2,500 offer = 25 ✓
- 5K list × $5,000 offer = 25 ✓
- 2K list × $10,000 offer = 20 ✗ (need bigger list or higher price)

### The Money Diagnostic (Three Core Numbers)
Instead of complex LTV:CAC ratios, focus on three numbers busy operators can calculate:

1. **Buyer Rate:** % of audience that becomes a customer
   - Formula: Total Customers / Total List Size
   - Benchmark: 2-5% for cold, 10-20% for warm

2. **Client Rate:** % of customers that buy again (or upgrade)
   - Formula: Repeat Buyers / Total Customers
   - Benchmark: 20-30% minimum, 40%+ excellent

3. **Repeat Rate:** Average purchases per customer
   - Formula: Total Orders / Total Customers
   - Benchmark: 1.8 = struggling, 3.0+ = healthy, 4.0+ = excellent

### Revenue Impact Calculator
**Repeat Rate improvement example:**
- Current: 100K customers × 1.8 repeat rate × $100 AOV = $18M
- Target: 100K customers × 3.0 repeat rate × $100 AOV = $30M
- **Gap = $12M in trapped revenue**

This is the pitch: your backend has $12M sitting in it waiting to be unlocked. The customers already exist. Reaching them costs nothing. Every percentage point of improvement is virtually free profit.
