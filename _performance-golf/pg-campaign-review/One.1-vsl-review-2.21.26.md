# Wedge V2 VSL Performance Analysis
**Date:** February 21, 2026
**Campaign:** Wedge V2 Launch
**Traffic Source:** Email/SMS (Internal)

---

## Executive Summary

Two VSLs tested against different audiences:
- **Problem Angle** → Past customers (V1 buyers) → **5.46% impression CVR**
- **Autocorrect Angle** → Broad audience (cold) → **2.53% impression CVR**

**Bottom Line:** Problem angle is 2.16x more efficient, but it's going to warm traffic (past customers). Autocorrect is handling cold traffic at solid performance.

---

## Full Performance Breakdown

### Problem Angle (Past Customers - V1 Buyers)

| Metric | Value |
|--------|-------|
| **Impressions** | 1,906 |
| **Plays** | 1,436 |
| **Play Rate** | 75.34% |
| **Unique Viewers** | 1,231 |
| **Avg % Watched** | 40.55% |
| **Bounce Rate** | 8.57% |
| **Unmute Rate** | 94.50% |
| **Orders** | 104 |
| **Viewer → Order CVR** | 8.45% |
| **Impression → Order CVR** | 5.46% |

### Autocorrect Angle (Broad - Cold Traffic)

| Metric | Value |
|--------|-------|
| **Impressions** | 6,825 |
| **Plays** | 4,774 |
| **Play Rate** | 69.95% |
| **Unique Viewers** | 4,272 |
| **Avg % Watched** | 36.67% |
| **Bounce Rate** | 5.99% |
| **Unmute Rate** | 97.88% |
| **Orders** | 173 |
| **Viewer → Order CVR** | 4.05% |
| **Impression → Order CVR** | 2.53% |

---

## Key Insights

### 1. Problem Angle is Crushing (But It's Warm Traffic)

**Why it's working:**
- Audience already bought Wedge V1 (proven buyers)
- Lower barrier to entry (upgrade vs first purchase)
- Higher trust (already got results from V1)
- Message: "You loved V1, here's improved V2"

**Result:** 8.45% of viewers convert (5.46% of total impressions)

### 2. Autocorrect Angle is Solid for Cold

**Challenge:**
- Has to teach the problem exists
- Prove the solution works
- Build trust from zero
- Overcome first-purchase friction

**Result:** 4.05% of viewers convert (2.53% of total impressions)

**Note:** 173 total orders with 3.6x more scale than problem angle

### 3. The Old Wedge Drop-Off Issue

**Observation from retention data:**
- Autocorrect starts strong (97.88% unmute rate)
- Drops at ~13% mark when old wedge is shown
- Bleeds viewers who are non-buyers but were interested
- Ends at 36.67% avg watch vs 40.55% for problem angle

**Hypothesis:** Showing the old wedge kills interest for people who:
- Don't have context on old offer
- See it as "used car salesman" move
- Aren't past customers

---

## Recommendations

### ✅ Keep Running As-Is

**Problem Angle → Past Customers**
- 5.46% impression CVR is excellent for upgrade offer
- Don't mess with what's working
- Continue 100% of V1 customer traffic here

**Autocorrect Angle → Broad**
- 2.53% impression CVR is solid for cold traffic
- 173 orders with good scale (3.6x more impressions)
- If hitting revenue targets, leave it alone

### 🔧 Optional Optimization (If Bandwidth Exists)

**Test Modified Autocorrect VSL:**
- Remove or modify the "old wedge" section at ~13% mark
- Hypothesis: Could lift viewer CVR from 4.05% to 4.5-5%
- Test as 50/50 split on broad traffic

**Decision Criteria:**
- **Run if:** You have creative bandwidth and want to optimize
- **Skip if:** You're in "scale what's working" mode

---

## Decision Framework

### Keep As-Is If:
- ✅ Hitting revenue targets with current performance
- ✅ Don't have capacity to recut/retest VSLs
- ✅ 173 orders from broad is meeting goals

### Optimize Autocorrect If:
- ✅ Have creative bandwidth for recut
- ✅ Want to squeeze more from broad traffic
- ✅ The 13% viewer drop bugs you
- ✅ Think 4.5-5% viewer CVR is achievable

---

## Conversion Rate Definitions

**Two ways to measure (both are valid):**

1. **Viewer → Order CVR**
   - Orders ÷ Unique Viewers
   - Measures: Of people who WATCHED, how many bought?
   - Good for: Comparing VSL quality in isolation

2. **Impression → Order CVR**
   - Orders ÷ Total Impressions
   - Measures: Of people who LANDED on page, how many bought?
   - Good for: Total funnel efficiency (includes play rate)

**For this analysis, we used impression → order because:**
- Accounts for different play rates (75% vs 70%)
- Measures total funnel performance
- Better for scaling decisions

---

## Raw Data Source

- **Platform:** Vidalytics (video analytics)
- **Conversion Tracking:** Domo
- **Traffic Source:** Email/SMS campaigns
- **Offer:** Same offer, same price (Wedge V2)
- **Data File:** `wdg1-stats-2.21.26.csv`
