# Analytics & Operations Reference

Complete framework for cohort analysis, SQL queries, dashboards, attribution, and team operations.

---

## Table of Contents
1. Cohort Analysis Framework
2. SQL Query Templates
3. Multi-Touch Attribution
4. Dashboard Architecture
5. Team Structure & Delegation
6. Klaviyo Technical Mastery

---

## 1. Cohort Analysis Framework

### Daily Cohort Tracking
Track customer behavior by acquisition date to identify trends:

| Metric | What It Shows | Action If Declining |
|--------|--------------|-------------------|
| **D7 Retention** | 7-day repurchase rate | Welcome series broken, check email 3-5 |
| **D30 Retention** | 30-day engagement | Post-purchase flow needs work |
| **D60 Retention** | Mid-term loyalty signal | Cross-sell/loyalty program gap |
| **D90 Retention** | Long-term retention | Win-back triggering too late |
| **D180 Retention** | Lifecycle health | Structural retention problem |

**Benchmarks:**
- D7 Retention: 25-30% (industry), 35%+ (excellent)
- D30 Retention: 15-20% (industry), 25%+ (excellent)
- D90 Retention: 8-12% (industry), 15%+ (excellent)

### Revenue Retention by Cohort
Track not just whether customers return, but whether their SPEND retains:
- **Gross Revenue Retention:** Are they spending the same amount?
- **Net Revenue Retention:** Are they spending MORE? (expansion revenue)
- **Target:** Net Revenue Retention > 110% (customers spend more over time)

### Behavioral Cohorts
Beyond acquisition date, segment cohorts by:
- **First product purchased:** Different entry points create different LTV curves
- **Acquisition channel:** Paid vs organic vs referral retention differences
- **First promo exposure:** Did they enter on a discount? (typically lower retention)
- **Seasonality:** Spring buyers vs winter buyers behave differently

---

## 2. SQL Query Templates

### Cohort Retention Query
```sql
WITH cohorts AS (
  SELECT 
    customer_id,
    DATE_TRUNC('month', MIN(order_date)) AS cohort_month,
    order_date,
    revenue
  FROM orders
  GROUP BY customer_id, order_date, revenue
),
cohort_sizes AS (
  SELECT 
    cohort_month,
    COUNT(DISTINCT customer_id) AS cohort_size
  FROM (
    SELECT customer_id, MIN(cohort_month) AS cohort_month
    FROM cohorts
    GROUP BY customer_id
  ) first_orders
  GROUP BY cohort_month
)
SELECT 
  c.cohort_month,
  DATEDIFF('month', c.cohort_month, c.order_date) AS months_since_first,
  COUNT(DISTINCT c.customer_id) AS active_customers,
  SUM(c.revenue) AS cohort_revenue,
  ROUND(COUNT(DISTINCT c.customer_id)::FLOAT / cs.cohort_size * 100, 1) AS retention_pct
FROM cohorts c
JOIN cohort_sizes cs ON DATE_TRUNC('month', (
  SELECT MIN(order_date) FROM orders WHERE customer_id = c.customer_id
)) = cs.cohort_month
GROUP BY c.cohort_month, months_since_first, cs.cohort_size
ORDER BY c.cohort_month, months_since_first;
```

### RFM Segmentation Query
```sql
WITH rfm_scores AS (
  SELECT 
    customer_id,
    DATEDIFF('day', MAX(order_date), CURRENT_DATE) AS recency_days,
    COUNT(DISTINCT order_id) AS frequency,
    SUM(revenue) AS monetary,
    NTILE(5) OVER (ORDER BY DATEDIFF('day', MAX(order_date), CURRENT_DATE) DESC) AS r_score,
    NTILE(5) OVER (ORDER BY COUNT(DISTINCT order_id)) AS f_score,
    NTILE(5) OVER (ORDER BY SUM(revenue)) AS m_score
  FROM orders
  WHERE order_date >= CURRENT_DATE - INTERVAL '365 days'
  GROUP BY customer_id
)
SELECT 
  customer_id,
  recency_days,
  frequency,
  monetary,
  r_score, f_score, m_score,
  CONCAT(r_score, f_score, m_score) AS rfm_segment,
  CASE 
    WHEN r_score >= 4 AND f_score >= 4 AND m_score >= 4 THEN 'Champions'
    WHEN f_score >= 4 THEN 'Loyalists'
    WHEN m_score >= 4 THEN 'Big Spenders'
    WHEN r_score <= 2 AND f_score >= 3 AND m_score >= 3 THEN 'Cant Lose'
    WHEN r_score <= 2 THEN 'At Risk'
    WHEN r_score >= 4 AND f_score <= 2 THEN 'Promising'
    ELSE 'Need Attention'
  END AS segment_name
FROM rfm_scores;
```

### Email Flow Performance Query
```sql
SELECT 
  flow_name,
  COUNT(DISTINCT recipient_email) AS recipients,
  SUM(CASE WHEN opened THEN 1 ELSE 0 END) AS opens,
  SUM(CASE WHEN clicked THEN 1 ELSE 0 END) AS clicks,
  SUM(CASE WHEN converted THEN 1 ELSE 0 END) AS conversions,
  SUM(attributed_revenue) AS revenue,
  ROUND(SUM(attributed_revenue) / NULLIF(COUNT(DISTINCT recipient_email), 0), 2) AS revenue_per_recipient,
  ROUND(SUM(CASE WHEN opened THEN 1 ELSE 0 END)::FLOAT / NULLIF(COUNT(*), 0) * 100, 1) AS open_rate,
  ROUND(SUM(CASE WHEN clicked THEN 1 ELSE 0 END)::FLOAT / NULLIF(COUNT(*), 0) * 100, 1) AS click_rate,
  ROUND(SUM(CASE WHEN converted THEN 1 ELSE 0 END)::FLOAT / NULLIF(SUM(CASE WHEN clicked THEN 1 ELSE 0 END), 0) * 100, 1) AS click_to_conversion
FROM email_sends
WHERE sent_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY flow_name
ORDER BY revenue DESC;
```

### Revenue Attribution Query
```sql
SELECT 
  attribution_source,
  attribution_channel,
  COUNT(DISTINCT order_id) AS orders,
  COUNT(DISTINCT customer_id) AS customers,
  SUM(revenue) AS total_revenue,
  ROUND(AVG(revenue), 2) AS avg_order_value,
  ROUND(SUM(revenue) / NULLIF(COUNT(DISTINCT customer_id), 0), 2) AS revenue_per_customer
FROM orders o
JOIN attribution a ON o.order_id = a.order_id
WHERE o.order_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY attribution_source, attribution_channel
ORDER BY total_revenue DESC;
```

### Churn Prediction Signals Query
```sql
SELECT 
  customer_id,
  DATEDIFF('day', MAX(order_date), CURRENT_DATE) AS days_since_last_order,
  DATEDIFF('day', MAX(email_open_date), CURRENT_DATE) AS days_since_last_open,
  COUNT(DISTINCT order_id) AS total_orders,
  SUM(revenue) AS total_revenue,
  AVG(DATEDIFF('day', prev_order_date, order_date)) AS avg_purchase_interval,
  COUNT(support_tickets) AS recent_support_tickets,
  COUNT(returns) AS recent_returns,
  CASE 
    WHEN DATEDIFF('day', MAX(order_date), CURRENT_DATE) > 2 * AVG(purchase_interval) THEN 'HIGH_RISK'
    WHEN DATEDIFF('day', MAX(order_date), CURRENT_DATE) > 1.5 * AVG(purchase_interval) THEN 'MEDIUM_RISK'
    ELSE 'LOW_RISK'
  END AS churn_risk
FROM customer_360
WHERE last_order_date >= CURRENT_DATE - INTERVAL '365 days'
GROUP BY customer_id;
```

---

## 3. Multi-Touch Attribution

### Attribution Models
| Model | How It Works | Best For |
|-------|-------------|----------|
| **First Touch** | 100% credit to first interaction | Understanding acquisition sources |
| **Last Touch** | 100% credit to final interaction | Understanding conversion triggers |
| **Linear** | Equal credit across all touches | General understanding of full journey |
| **Time Decay** | Recent touches weighted higher | Backend optimization (what pushed them over) |
| **Data-Driven** | Custom model based on your data | Most accurate, requires volume |

### Backend-Specific Attribution
For retention channels, time decay is usually most useful because:
- The most recent email/SMS that drove the purchase is most actionable
- But previous touches built the trust and intent
- Weight: 40% last touch, 25% second-to-last, 20% third, 15% everything else

### What to Track
- **Flow-attributed revenue:** Revenue driven by automated flows
- **Campaign-attributed revenue:** Revenue from manual campaigns/broadcasts
- **SMS-attributed revenue:** Track separately from email
- **Multi-channel attribution:** Customers who received email AND SMS before purchasing

---

## 4. Dashboard Architecture

### North Star Dashboard (Weekly Review)
| Metric | Last Week | This Week | Trend | Target |
|--------|-----------|-----------|-------|--------|
| Repeat Rate | | | ↑↓ | 3.0+ |
| Customer LTV | | | ↑↓ | Growing |
| Email Flow RPM | | | ↑↓ | $0.15+ |
| Email Campaign RPM | | | ↑↓ | $0.10+ |
| SMS Flow RPM | | | ↑↓ | $0.30+ |
| Champions % | | | ↑↓ | 20%+ |
| List Growth % | | | ↑↓ | 2%+/week |
| 2nd Purchase Rate | | | ↑↓ | 35%+ |
| Win-back Rate | | | ↑↓ | 10%+ |

### Segment Performance Dashboard (Monthly)
| Segment | Count | % Customers | Revenue | % Revenue | AOV | Trend |
|---------|-------|-------------|---------|-----------|-----|-------|
| Champions | | | | | | |
| Loyalists | | | | | | |
| Big Spenders | | | | | | |
| Promising | | | | | | |
| At Risk | | | | | | |
| Can't Lose | | | | | | |
| Hibernating | | | | | | |

### Flow Performance Dashboard (Weekly)
| Flow | Sent | Open % | CTR % | RPM | Revenue | Unsub % |
|------|------|--------|-------|-----|---------|---------|
| Welcome | | | | | | |
| Abandoned Cart | | | | | | |
| Browse Abandon | | | | | | |
| Post-Purchase | | | | | | |
| Win-Back | | | | | | |
| VIP | | | | | | |
| Replenishment | | | | | | |

### Campaign Performance Dashboard (Per Send)
| Campaign | Date | Segment | Sent | Open % | CTR % | RPM | Revenue | Unsub % |
|----------|------|---------|------|--------|-------|-----|---------|---------|

---

## 5. Team Structure & Delegation

### Backend Team Roles

**VP of Backend / Retention (Strategic)**
- Revenue optimization strategy and cross-department alignment
- RFM architecture decisions and segment strategy
- High-ticket funnel oversight
- Dashboard review and strategic adjustments
- Team development and capacity planning

**Campaign Strategy Lead**
- Campaign calendar management and planning
- Promo matrix oversight and conflict prevention
- A/B test strategy and prioritization
- Performance analysis and optimization recommendations
- Content direction and messaging strategy

**Email Technical Manager**
- Klaviyo flow building and optimization
- Advanced segmentation implementation
- RFM segment documentation and maintenance
- Technical troubleshooting and deliverability
- Dashboard/reporting tool management (DOMO)

**Campaign Execution Specialist**
- Email builds and sends per schedule
- List management and subscriber hygiene
- Basic reporting and performance tracking
- Quality assurance on all sends
- Process documentation maintenance

### Decision Rights Framework
| Decision Type | Who Decides | Who Reviews |
|--------------|------------|------------|
| Standard flow changes | Technical Manager | Strategy Lead |
| Campaign scheduling | Execution Specialist | Strategy Lead |
| New segment creation | Technical Manager | VP Backend |
| Promo pricing | Strategy Lead | VP Backend |
| VIP application approval | Team (with scoring matrix) | VP (exceptions only) |
| Test design and launch | Strategy Lead | VP Backend (major tests) |
| Budget allocation | VP Backend | — |
| Tool/vendor changes | VP Backend | — |

### Weekly Rhythm
- **Monday:** Dashboard review, weekly priorities set
- **Wednesday:** Test results review, mid-week adjustments
- **Friday:** Campaign performance review, next week planning
- **Monthly:** Full RFM segment review, promo calendar update, test learning library review

---

## 6. Klaviyo Technical Mastery

### Flow Optimization Checklist
For every flow, verify:
- [ ] Trigger conditions are correct and not overlapping with other flows
- [ ] Conditional splits based on RFM segment (minimum: Champions vs Everyone Else)
- [ ] A/B test running on at least one element
- [ ] SMS touchpoints added where appropriate
- [ ] Time delays match customer behavior patterns
- [ ] Exit conditions prevent over-messaging
- [ ] Revenue attribution properly configured

### Segmentation Best Practices in Klaviyo
- **Use predictive analytics:** Klaviyo's predicted LTV, churn risk, next order date
- **Custom properties:** Store RFM scores as profile properties for flow triggers
- **Behavioral triggers:** Cart value, browse frequency, email engagement score
- **Engagement tiers:** Create Hot (opened in 30 days), Warm (30-90), Cold (90+), Dead (180+)
- **Suppression lists:** Always suppress recent purchasers from discount campaigns

### Deliverability Management
- **Warm IP/domain properly** when scaling send volume
- **Engagement-based sending:** Send to most engaged first, expand to less engaged
- **List hygiene:** Suppress bounces, complaints, 180+ day non-openers
- **Authentication:** SPF, DKIM, DMARC all configured
- **Monitor:** Inbox placement rate, complaint rate, bounce rate weekly

### Klaviyo-Specific A/B Testing
- **Built-in A/B:** Use Klaviyo's native A/B for subject lines in flows
- **Manual A/B:** Create conditional splits for more complex tests (offer type, timing)
- **Smart Send Time:** Test Klaviyo's AI send time vs fixed times
- **Segmented performance:** Always check how tests perform across engagement tiers
