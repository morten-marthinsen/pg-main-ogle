# PG Backend Split Testing Plan

**Philosophy:** Work backwards from money. Diagnose the constraint. Test what matters.

**Team Capacity:** 8-10 tests/month (diagnostic-driven, not arbitrary)

---

## The One Rule: Always Know Why You're Testing

**Bad:** "Let's test subject lines because we haven't in a while"

**Good:** "Cart Abandon conversion rate is 8 points below baseline. Conversion is our constraint. We're testing offer mechanics."

**Before every test, ask:** "Why are we testing this?"

If you can't articulate which constraint you're fixing, don't test it.

---

## The Weakest Link Framework (Work Backwards from Money)

**Check metrics in this order:**

```
1. Conversion Rate ← Start here (closest to money)
   Below baseline? → Test: Offers, landing pages, objection handling
   ↓

2. Conversion OK? Check Click Rate
   Below baseline? → Test: CTAs, hooks, email copy
   ↓

3. Clicks OK? Check Open Rate
   Below baseline? → Test: Subject lines, timing, from name
   ↓

4. Opens OK? Check Delivery Rate
   Below baseline? → Fix: List quality, spam triggers
```

**Critical Rule:** Don't test opens if conversions are broken. Fix closest to money FIRST.

---

## Monthly Diagnostic Process (First Monday)

### Step 1: Pull Last 30 Days Metrics
For each flow, get:
- Conversion Rate (or primary revenue metric)
- Click Rate
- Open Rate

### Step 2: Mark Status
- 🔴 RED = 10%+ below baseline
- 🟡 YELLOW = 5-10% below baseline
- 🟢 GREEN = at/above baseline

### Step 3: Find Constraints (RED/YELLOW flows only)
For each RED/YELLOW flow, run Weakest Link diagnostic:
- Which metric is below baseline first? (Conversion → Clicks → Opens)
- That's your constraint
- That's what you test

### Step 4: Queue Tests
- Prioritize: RED + High Volume = Test First
- Allocate 8-10 tests across constraints
- Don't test GREEN flows (they're working)

**Example:**
- Cart Abandon: 🔴 Conversion 8pts below → Queue offer test
- Browse Abandon: 🟢 At baseline → No test
- Exit Pop: 🟡 Clicks 6pts below → Queue CTA test

**Result:** 2 tests queued, both addressing diagnosed constraints

---

## Flow Ownership

**Katarina - Ecom Lifecycle Email:**
- Cart Abandon
- Browse Abandon
- Post-Purchase Welcome

**Erik/Team - Exit Pop & SMS:**
- Exit Pop
- Cart Abandon SMS
- Browse Abandon SMS
- Post-Purchase SMS

**Tim - High-Ticket Lifecycle:**
- Booking Abandon
- Call Confirmation
- Hot Followup
- Assessment/Nurture

---

## Decision Tree: What to Test Based on Constraint

### If CONVERSION RATE is constraint:
- Test offer mechanics (discount %, free shipping, progressive offers)
- Test landing page experience (direct to cart vs product page)
- Test objection handling (add social proof, urgency, guarantees)

### If CLICK RATE is constraint:
- Test CTA copy and placement
- Test email hook strength (urgency vs value vs social proof)
- Test email structure (short vs long, text vs image)

### If OPEN RATE is constraint:
- Test subject lines (urgency vs curiosity vs benefit)
- Test send timing (1hr vs 2hr vs 4hr)
- Test from name (brand vs person)

### If DELIVERY RATE is constraint:
- Fix list quality (remove hard bounces)
- Check spam triggers
- Review sender reputation

---

## Baseline Metrics (Fill These In)

**Each owner needs to establish baseline for their flows:**

### Katarina - Ecom Email
- **Cart Abandon:** ___% conv, ___% clicks, ___% opens
- **Browse Abandon:** ___% conv, ___% clicks, ___% opens
- **Post-Purchase:** ___% repeat purchase, ___% clicks, ___% opens

### Erik - Exit Pop & SMS
- **Exit Pop:** ___% opt-in, ___% click-through
- **Cart SMS:** ___% conv, ___% clicks
- **Post-Purchase SMS:** ___% repeat purchase, ___% clicks

### Tim - High-Ticket
- **Booking Abandon:** ___% booking completion, ___% clicks, ___% opens
- **Call Confirmation:** ___% show rate, ___% opens
- **Hot Followup:** ___% booking rate, ___% clicks, ___% opens

**Pull last 90 days average to establish these baselines.**

---

## Weekly Rhythm (30 min total)

### Monday (10 min)
- Review queued tests
- Verify: "Why are we testing this?" for each test
- Launch 2-3 tests

### Wednesday (5 min)
- Are tests running correctly?
- Any issues?

### Friday (15 min)
- Analyze completed tests
- Check: Did constraint get fixed? (back to baseline?)
- Implement winners immediately
- Queue next week's tests based on remaining constraints

### First Monday of Month (Additional 20 min)
- Run full diagnostic (all 9 flows)
- Mark RED/YELLOW/GREEN
- Create constraint map for next 30 days
- Queue tests that fix identified constraints

---

## Test Launch Checklist

**Before Launch:**
- [ ] Constraint identified ("Why are we testing this?")
- [ ] Hypothesis written ("If [change], then [result], because [reason]")
- [ ] Copy ready
- [ ] Tracking confirmed
- [ ] Test added to tracker (Status: 💡 Queued)

**When Test Completes:**
- [ ] Results documented (control vs test, lift %)
- [ ] Winner implemented immediately
- [ ] Constraint status checked (fixed or not?)
- [ ] Next test queued based on remaining constraints

---

## Campaign → Flow Strategy (High Leverage)

**The compounding play:**
1. Test offers in **campaigns** first (fast feedback, 7-14 days)
2. Winners become **flow tests** (replace existing flow offers)
3. Implement in **flows** (compounds 24/7)

**Example:**
- Campaign: New product offer does $50K in 7 days
- Flow Test: Replace cart abandon offer with winner
- Result: $200K annual impact (compounds monthly vs one-time campaign)

**Priority:** Campaign winners → Flow replacements = Highest ROI tests

---

## Test Templates (3 Types)

### Campaign Test
- **Name:** `Email-Subject-[Description]` or `Email-Offer-[Description]`
- **Duration:** 7-14 days
- **KPIs:** Opens, Clicks, Revenue
- **Use for:** Fast feedback on offers, subject lines, new products

### Lifecycle Flow Test
- **Name:** `Lifecycle-[Flow]-[Description]`
- **Duration:** 14-30 days
- **KPIs:** Opens, Clicks, Revenue, Conversions
- **Must calculate:** Monthly revenue projection if winner implemented
- **Use for:** Testing elements within existing flows

### Campaign → Flow Test
- **Name:** `Lifecycle-[Flow]-OfferSwap-[NewOffer]`
- **Test:** Replace current flow offer with campaign winner
- **KPIs:** Click Rate, Conversion Rate, Revenue per Entrant
- **Must calculate:** Monthly incremental revenue projection
- **Use for:** Graduating campaign winners to flows for compounding gains

---

## What to Test (80/20 Priority)

### High Priority (Focus Here):
- **Campaign winners → Flow replacements** - Graduate hot offers to flows
- **Flow offer swaps** - Replace existing flow offers with new products
- **Flow structure changes** - Email count, timing, from-name
- **High-volume campaign elements** - Subject lines, CTAs for recurring sends

### Skip (Low ROI):
- One-off campaign tweaks with no repeatability
- Tests on tiny segments (<1,000 people)
- Minor copy changes without clear hypothesis
- Testing what's already GREEN (at/above baseline)

---

## The Airtable Tracker (Keep It Simple)

**4 Views:**
1. **💡 Pipeline** - Tests queued (constraint-based)
2. **🚀 Live Tests** - Currently running
3. **📊 Ready to Analyze** - Completed, need results
4. **✅ Recent Winners** - Implemented, tracking impact

**Core Fields:**
| Field | Purpose |
|-------|---------|
| Test Name | `[Flow]-[Element]-[Description]` |
| Test Type | Campaign / Lifecycle Flow / Campaign→Flow |
| Constraint Addressed | Conversion / Clicks / Opens / Delivery |
| Status | 💡 Queued → 🚀 Live → 📊 Analyzing → ✅ Complete |
| Hypothesis | "If [change], then [result], because [reason]" |
| Control Result | Baseline metric |
| Test Result | Variant metric |
| Lift % | % improvement |
| Winner | Control / Test / Tie |
| Constraint Fixed? | Yes / No / Partially |
| Revenue Impact | Monthly $ impact if implemented |
| Next Actions | What gets implemented? What's next? |

---

## Monthly Report (Last Friday)

### Quick Stats
```
MONTH: [Month]
TESTS COMPLETED: [X]/10
WINNERS: [X] ([X]% win rate)
```

### Constraint Analysis
```
FLOWS ANALYZED: 9

STATUS:
🔴 RED: [X] flows - [List constraints]
🟡 YELLOW: [X] flows - [List constraints]
🟢 GREEN: [X] flows

CONSTRAINTS FIXED THIS MONTH:
- [Flow]: [Constraint] → [Test] → [Result]
```

### Top Performer
```
- Test: [Name]
- Constraint Fixed: [Conversion/Clicks/Opens]
- Lift: +[X]%
- Impact: $[X]K/month
```

### Next Month Priorities
```
1. [Flow] - [Constraint] (Why: [Revenue impact / High volume / Easy win])
2. [Flow] - [Constraint] (Why: [Rationale])
3. [Flow] - [Constraint] (Why: [Rationale])
```

---

## Core Principles (The Rules)

### 1. Work Backwards From Money
Fix conversion before clicks. Fix clicks before opens. Don't test opens if conversions are broken.

### 2. Fix ONE Thing at a Time
Don't change subject line AND copy in same test. Change one thing → measure → implement → move on.

### 3. Always Know Why
Every test must answer: "What constraint am I fixing?" If you can't answer, don't test.

### 4. Implement Fast
Winner identified Friday = implemented by Monday. Every day a winner sits unimplemented is lost revenue.

### 5. Verify the Fix
After implementing winner, check: Is metric back at baseline or above? If yes, move to next constraint. If no, diagnose why.

### 6. Prioritize by Impact
Impact = Lift × Volume. High volume + RED constraint = test first. Low volume + GREEN (working) = don't test.

### 7. Don't Test What's Working
GREEN flows are at/above baseline. Don't test them. Focus on RED/YELLOW flows.

---

## Success Metrics

**Per Test:**
- ✅ Test traces to diagnosed constraint
- ✅ 90%+ confidence in results
- ✅ Winner implemented within 3 days
- ✅ Constraint status verified (fixed or not)

**Monthly:**
- 8-10 tests running (all constraint-based)
- 100% of tests can answer "Why are we testing this?"
- Monthly diagnostic completed
- 60%+ of identified constraints fixed

**Quarterly:**
- % of flows at/above baseline increasing
- Win rate trending up
- Team can diagnose constraints independently

---

## Next Steps to Get Started

### This Week:
1. **Fill in baselines** - Each owner pulls last 90 days average for their flows
2. **Run first diagnostic** - Mark all flows RED/YELLOW/GREEN
3. **Create constraint map** - Which flows have which constraints?

### Next Monday:
1. **Queue first tests** - Based on constraint map (prioritize RED + high volume)
2. **Launch 2-3 tests** - Verify each addresses a diagnosed constraint
3. **Start weekly rhythm** - Monday/Wednesday/Friday check-ins

### Key Question for Every Test:
**"Why are we testing this?"**

If the answer isn't "Because [specific metric] is [X] points below baseline and that's our constraint," don't test it.