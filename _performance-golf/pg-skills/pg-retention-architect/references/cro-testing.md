# CRO & Split Testing Reference

Complete framework for conversion rate optimization across all retention channels.

---

## Table of Contents
1. Split Testing Methodology
2. Statistical Foundations
3. Email CRO
4. SMS CRO
5. Direct Mail CRO
6. Popup/On-site CRO
7. Testing Velocity & Documentation
8. Channel-Specific Benchmarks

---

## 1. Split Testing Methodology

### Hierarchy of Impact (Test These First)
1. **Headlines/Subject Lines** — 20-40% open rate lifts possible
2. **Offers** — 25-40% AOV increases possible
3. **CTAs** — 15-30% click rate lifts possible
4. **Body Copy** — 10-20% engagement improvement
5. **Design/Layout** — 5-15% incremental gains

The hierarchy matters. Don't waste testing cycles on button colors when the subject line is killing the email before anyone opens it.

### Test Design Rules
- **One variable per test.** If you change subject line AND CTA, you don't know which moved the needle.
- **Control always runs.** Never test two new variants without a control.
- **Full business cycle minimum.** 2-4 weeks depending on send volume.
- **Segment-level analysis.** A test that wins overall might lose with Champions. Always cut results by RFM segment.
- **Document everything.** Every test goes in the learning library, win or lose.

### Test Prioritization Framework (ICE Score)
Rate each potential test 1-10 on:
- **I**mpact: How much revenue if this wins?
- **C**onfidence: How sure are we it'll improve?
- **E**ase: How fast can we implement and run it?

**Score = (I + C + E) / 3** — Run highest scores first.

---

## 2. Statistical Foundations

### Sample Size Calculation
To detect a meaningful difference, you need:

| Baseline Rate | Minimum Detectable Effect | Required Sample Per Variant |
|--------------|--------------------------|---------------------------|
| 2% | 25% lift (→ 2.5%) | ~12,000 |
| 5% | 20% lift (→ 6%) | ~6,200 |
| 10% | 15% lift (→ 11.5%) | ~4,800 |
| 20% | 10% lift (→ 22%) | ~3,900 |

**Standards:** 95% confidence level, 80% statistical power.

### When to Call a Winner
- **Minimum 95% confidence** (p-value < 0.05)
- **Minimum 2 weeks of data** even if significance is reached earlier
- **Check for segment-level contradictions** before declaring
- **No peeking.** Decide the runtime upfront. Looking at partial data inflates false positives.

### Multiple Testing Correction
If running 3+ tests simultaneously on same audience, apply Bonferroni correction:
- Adjusted significance = 0.05 / number of tests
- Example: 3 simultaneous tests → need p < 0.017 per test

### Chi-Squared Test for Conversion Rates
```python
from scipy.stats import chi2_contingency

# Example: Control 5% vs Variant 6.25%
data = [[310, 5890],   # control: conversions, non-conversions
        [388, 5812]]   # variant: conversions, non-conversions

chi2, p_value, dof, expected = chi2_contingency(data)

if p_value < 0.05:
    print(f"Significant! p={p_value:.4f}")
    lift = (388/6200 - 310/6200) / (310/6200) * 100
    print(f"Lift: {lift:.1f}%")
```

---

## 3. Email CRO

### Subject Line Testing
**Variables to test:**
| Variable | Control Example | Test A | Test B |
|----------|----------------|--------|--------|
| Length | "Your cart is waiting" | "⛳ Your [Product] is waiting - only 3 left" | "[Name], 2hrs left" |
| Personalization | Generic | First name | Product name |
| Urgency | None | Time-based ("expires in 2hrs") | Scarcity ("3 left") |
| Curiosity | Benefit-led | Question-led ("Did you forget?") | Pattern interrupt ("This is unusual...") |
| Emoji | None | Relevant emoji at start | Emoji in middle |

**Expected lifts:** 15-40% open rate improvement from subject line optimization alone.

### Preview Text Optimization
- **Complementary:** Subject = benefit, Preview = proof ("437 sold this week")
- **Contradictory:** Subject = question, Preview = unexpected answer
- **Extension:** Preview continues the subject line thought
- **Never leave default.** Blank preview text = wasted real estate

### Above-the-Fold Optimization
Critical elements that must appear before scroll:
1. Product image (for cart/browse abandonment)
2. Clear value proposition or offer
3. Primary CTA button
4. Social proof element (reviews, sold count)

**Test:** Product image vs lifestyle image — product typically wins for transactional emails, lifestyle for brand/VIP.

### CTA Design & Copy
| Variable | Options to Test |
|----------|----------------|
| Copy | "Complete Purchase" vs "Get Yours Now" vs "Claim Your [Product]" |
| Color | Brand color vs high-contrast (red, orange) |
| Size | Standard vs oversized (48px+ height) |
| Placement | After first paragraph vs end of email vs both |
| Quantity | Single CTA vs multiple (same destination) |

**Best practice:** "Secure Checkout" and "Claim" language outperforms "Buy" and "Purchase" in recovery flows.

### Social Proof Elements
- **Specificity wins:** "437 sold this week" beats "Best seller"
- **Recency wins:** "Sarah from Austin bought this 2 hours ago" beats generic testimonials
- **Star ratings:** Include the number of reviews, not just the rating
- **Placement:** Immediately before or after CTA

### Post-Purchase Email CRO
The post-purchase window is the highest-engagement moment. Test:
- **Cross-sell timing:** Immediately vs 24hrs vs 3 days post-purchase
- **Offer type:** Complementary product vs discount on next order vs VIP upgrade
- **Urgency:** "Add to your order within 1 hour" (order bump style)
- **Expected conversion:** 25-40% when timed correctly

### Win-Back Email CRO
Progressive incentive structure:
- **Email 1 (Day 30-45):** No discount — just reminder + what's new
- **Email 2 (Day 45-60):** Free shipping or small gift
- **Email 3 (Day 60-75):** 10-15% discount — "final chance" framing
- **Email 4 (Day 75-90):** Sunset — "We're removing you from updates unless..."

---

## 4. SMS CRO

### Hook Speed
The first 20 characters determine whether the message gets read. Get to value FAST.

| Weak Hook | Strong Hook |
|-----------|-------------|
| "Hi [Name], hope you're having a great day..." | "⛳ [Name], your tee time discount expires at midnight" |
| "We wanted to let you know about..." | "Flash: 30% off [Their Category] - 2hrs only" |
| "Check out our latest..." | "Your [Previous Purchase] restock is ready" |

### SMS Testing Variables
| Variable | Options | Expected Impact |
|----------|---------|----------------|
| **Message length** | Short (< 80 chars) vs detailed (160 chars) | 15-25% CTR difference |
| **Emoji usage** | None vs relevant emoji at start vs mid-message | 10-20% engagement lift |
| **Urgency framing** | Gentle reminder vs hard deadline vs scarcity | 30-60% CTR difference |
| **Link placement** | After first sentence vs end | 20-30% click difference |
| **Time of day** | Morning (8-10am) vs lunch (12-1pm) vs evening (6-8pm) | 15-25% engagement |
| **Personalization** | Name only vs purchase history vs behavior-based | 25-40% CTR lift |

### Segment-Specific SMS
- **Champions:** Exclusive early access, no links needed sometimes — just FYI messages build affinity
- **At-Risk:** "We miss you - special welcome back" with direct offer link
- **Big Spenders:** VIP concierge availability, personal tone
- **Promising:** Product tips, "how to get the most from your [purchase]"

### SMS Compliance Essentials
- Clear opt-out mechanism in every message
- Sender identification
- Respect quiet hours (generally 8am-9pm recipient's time zone)
- Maximum frequency: 4-8 SMS/month for most segments, 2-4 for lower engagement

---

## 5. Direct Mail CRO

### Envelope Optimization
| Variable | Options | Expected Impact |
|----------|---------|----------------|
| **Teaser copy** | None vs benefit vs urgency vs curiosity | 30-50% open lift |
| **Personalization** | Standard label vs handwritten font vs actual handwriting | 25-40% open lift |
| **Size/format** | Standard #10 vs oversized vs lumpy/dimensional | 50-200% open lift |
| **Color** | White vs kraft vs colored | 15-25% open lift |

### Johnson Box (Above-the-Letter Summary)
Add a box at the top of the letter with:
- The offer in one sentence
- Scarcity/urgency element
- Deadline date
- Expected lift: 20-30% response increase

### Response Mechanism
- **QR code** for mobile response (essential for modern direct mail)
- **Pre-filled response card** — reduce friction
- **Dedicated phone line** with tracking number
- **Personalized URL** (PURL) for digital response tracking
- Test all response mechanisms — ease of response = conversion

### Dimensional Mail for High-Ticket
For VIP experience offers ($5K-$25K):
- Include a physical item (golf ball with message, logo item)
- "Your game transformation starts here" — creates curiosity
- Can't be ignored like a flat envelope
- 2-3x response rate vs flat mail (justifies 5-10x cost)
- ROI at $15K price point = massive even with $15-25 per piece cost

### Direct Mail ROI Calculation
```
Response Rate × Conversion Rate × Price Point = Revenue per Piece
Revenue per Piece - Cost per Piece = Profit per Piece

Example:
2% response × 30% close × $15,000 = $90 revenue per piece
$90 - $3.50 cost = $86.50 profit per piece
```

---

## 6. Popup/On-site CRO

### Trigger Testing
| Trigger Type | When | Best For |
|-------------|------|----------|
| **Time-based** | After 5-15 seconds | New visitors, general offers |
| **Scroll-based** | After 50-75% scroll | Engaged readers, content upgrades |
| **Exit intent** | Mouse moves to close/back | Cart savers, lead capture |
| **Behavior-based** | After viewing 2+ products | Cross-sell, personalized offers |

### Popup Offer Types
- **Discount** (10-15% off first order) — highest conversion, trains discount behavior
- **Free shipping** — high conversion without devaluing product
- **Value-add** (free guide, bonus content) — builds list without discount expectation
- **Quiz/assessment** — highest quality leads, lower volume

### Form Field Optimization
- **Email only:** Highest conversion (3-5%+)
- **Email + name:** Slightly lower, enables personalization
- **Email + phone:** Much lower, but captures SMS consent
- **Progressive disclosure:** Email first → show name field → show phone

### Mobile-Specific
- Full-screen overlays on mobile (Google allows with delay)
- **Minimum 48px tap targets** for buttons
- Bottom-sheet style (slides up from bottom) outperforms centered modals on mobile
- Thumb-friendly CTA placement

---

## 7. Testing Velocity & Documentation

### Target Velocity
- **3-5 tests running simultaneously** across different channels
- **New tests launched weekly** (replace completed tests)
- **Monthly test reviews** with full team
- **Quarterly compound optimization** (stack winning elements)

### Test Documentation Template
```
TEST ID: [Channel]-[Date]-[Variable]
HYPOTHESIS: Changing [X] will increase [metric] by [Y]% because [reason]
CONTROL: [Description]
VARIANT(S): [Description]
SEGMENT: [Which RFM segments included]
SAMPLE SIZE: [Required per variant]
DURATION: [Planned runtime]
PRIMARY METRIC: [What we're measuring]
SECONDARY METRICS: [Other things to watch]
RESULT: [Win/Lose/Inconclusive]
LIFT: [Percentage change]
CONFIDENCE: [P-value]
LEARNING: [What we now know]
NEXT TEST: [What this result suggests we test next]
```

### Building the Learning Library
Every test result feeds institutional knowledge:
- **Subject line insights:** What hooks work for which segments
- **Offer insights:** Which incentive types drive action without margin erosion
- **Timing insights:** When each segment is most responsive
- **Copy insights:** Voice, urgency level, proof type preferences by segment
- **Design insights:** Layout, CTA, image preferences by device and segment

---

## 8. Channel-Specific Benchmarks

### Email Performance Benchmarks
| Metric | Minimum | Good | Excellent |
|--------|---------|------|-----------|
| Open Rate | 20% | 30% | 40%+ |
| Click Rate | 2% | 4% | 7%+ |
| Click-to-Open | 10% | 15% | 20%+ |
| Conversion Rate | 1% | 3% | 5%+ |
| Unsubscribe Rate | < 0.5% | < 0.3% | < 0.1% |
| Revenue per Recipient (RPR) | $0.05 | $0.15 | $0.30+ |

### SMS Performance Benchmarks
| Metric | Minimum | Good | Excellent |
|--------|---------|------|-----------|
| Click Rate | 8% | 12% | 20%+ |
| Conversion Rate | 2% | 5% | 10%+ |
| Opt-out Rate | < 2% | < 1% | < 0.5% |
| Revenue per Message | $0.10 | $0.30 | $0.50+ |

### Popup Performance Benchmarks
| Metric | Minimum | Good | Excellent |
|--------|---------|------|-----------|
| Conversion Rate | 3% | 5% | 10%+ |
| Email Capture | 2% | 4% | 8%+ |
| SMS Capture | 0.5% | 1.5% | 3%+ |

### Direct Mail Benchmarks
| Metric | Minimum | Good | Excellent |
|--------|---------|------|-----------|
| Response Rate | 0.5% | 2% | 5%+ |
| Conversion Rate | 10% | 20% | 35%+ |
| Cost per Response | $50 | $20 | $10 |

### Win-Back Benchmarks
| Metric | Minimum | Good | Excellent |
|--------|---------|------|-----------|
| Reactivation Rate | 5% | 10% | 15%+ |
| Time to Reactivation | 45+ days | 30 days | 14 days |
| Reactivated LTV vs Original | 50% | 75% | 100%+ |
