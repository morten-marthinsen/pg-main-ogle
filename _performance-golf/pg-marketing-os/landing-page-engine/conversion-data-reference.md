# Conversion Data Reference — Landing Page Engine

**Version:** 1.1
**Created:** 2026-02-24
**Updated:** 2026-03-05 — PDP Enhancement Layer Baymard/NN-g data
**Data Sources:** Unbounce Q4 2024, VWO, KlientBoost, SeedProd, Shopify, CreativeThirst, HubSpot, Baymard Institute, Nielsen Norman Group

---

## BENCHMARK DATA (PRIMARY)

### Unbounce Q4 2024 — Primary Research
**Dataset:** 41,000 landing pages | 464 million visitors | 57 million conversions

| Metric | Value |
|--------|-------|
| Median conversion rate (all industries) | 6.6% |
| "Good" conversion rate threshold | 10%+ |
| Top 10% of pages capture | ~80% of all traffic |
| Low baseline (Wordstream/BloggingWizard) | 2.35% |
| Ecommerce typical range (Shopify) | 2.5–3% |
| Events/entertainment top rate | 12.6% |
| SeedProd/HubSpot mid benchmark | 5.89% |

### Industry-Specific Rates

| Industry | Typical Range | Top Performers |
|----------|-------------|----------------|
| Health/Supplements (cold traffic) | 2–4% | 8–15% |
| Health/Supplements (warm) | 5–8% | 15–25% |
| Info Products | 3–6% | 10–20% |
| Financial/Investing | 1–3% | 5–10% |
| Ecommerce (DTC supplements) | 2–5% | 8–15% |
| B2B Products | 2.9% (First Page Sage) | 6–8% |
| B2B Services | 2.7% (First Page Sage) | 5–7% |

---

## ELEMENT-LEVEL IMPACT DATA

### Conversion Lifts by Element

| Element / Change | Lift | Confidence | Source |
|-----------------|------|------------|--------|
| Personalized CTAs vs generic | +202% | High | HubSpot |
| Video on landing pages | +86% | High | VWO |
| Long-form vs short-form (leads) | +220% more leads | High | KlientBoost |
| Multiple offers vs single | -266% penalty | High | KlientBoost |
| Mobile-responsive vs static | +25.2% mobile conversions | High | VWO |
| 1-second load delay | -7% conversions | High | Google |
| 5th–7th grade reading vs complex | +56% | High | VWO |
| Social proof early placement | Significant | Medium | CXL |
| Guarantee visibility | Significant | Medium | Multiple |
| CTA button above fold | High | High | Industry |
| Long-form over short-form | +220% leads | High | KlientBoost |
| Personalized headline | 15-30%+ | Medium | Multiple |
| 10% page load improvement | +7% sessions | Medium | Google |

### Bounce Rate Context

| Bounce Rate | Status | Interpretation |
|-------------|--------|----------------|
| < 40% | Exceptional | Strong engagement |
| 40–60% | Good | Normal for sales pages |
| 60–80% | Average | Room for improvement |
| 80–90% | Below average | Above-fold issues likely |
| > 90% | Critical | Traffic mismatch or page failure |

---

## THE MOST IMPORTANT RULES (Data-Backed)

### Rule 1: One Offer Per Page (-266% for Multiple Offers)
Multiple CTAs pointing to different offers, or multiple competing offers, cuts conversions by up to 266%. Every element on every page must serve ONE conversion goal.

### Rule 2: Long-Form Generates More Leads (+220%)
Despite conventional wisdom about short attention spans, longer pages generate significantly more leads — provided the content is engaging and the offer is strong. This applies primarily to lead generation and high-ticket offers.

### Rule 3: Personalized CTAs Outperform Generic (+202%)
"Get Started" → "Get My 60-Day Supply" (+202%). The more specific the CTA to the visitor's specific situation, the higher the conversion rate.

### Rule 4: Video Lifts Conversion (+86%)
Landing pages with video embedded see up to 86% higher conversion rates. Effect is strongest for products requiring explanation or demonstration.

### Rule 5: Speed Is Non-Negotiable (-7% per second)
Every 1-second delay in load time costs 7% of conversions. At 3-second delay: -21%. At 5-second delay: -35%. Speed is a revenue issue, not just a UX issue.

### Rule 6: Simple Copy Converts Better (+56%)
Pages written at 5th–7th grade reading level outperform complex copy by 56%. This is counterintuitive but consistent across studies. Clarity beats sophistication every time.

### Rule 7: Mobile Responsiveness Is Table Stakes (+25.2%)
Mobile-responsive pages convert 25.2% more mobile visitors. With 60%+ of traffic from mobile devices, non-responsive pages leave massive revenue on the table.

---

## OFFER HIERARCHY (CreativeThirst / Bobby Hewitt Data)

### The 3-Element Hierarchy
Most marketers waste time on copywriting when the bigger leverage points are untouched:

**Priority 1: List (Audience)**
The right audience makes everything else easier. Wrong audience = no amount of copy/offer fixes it.

**Priority 2: Offer (What You're Actually Selling)**
The offer has an INVERSE relationship to copy:
- Strong offer → Copy can be weaker
- Weak offer → Copy must be significantly stronger
- Testing offers typically outperforms testing headlines

**Priority 3: Copy (The Words)**
Copy is third, not first. Most marketers over-invest in copy and under-invest in offer testing.

### 7 Offer Types (Combination Creates Unexplored Territory)

| Type | Definition | Lift Potential |
|------|-----------|---------------|
| **Hard Offer** | Standard: here's product, here's price, pay now | Baseline |
| **Soft Offer** | Pay later, installments, try first | +20–50% vs hard |
| **Free + Shipping** | Product free, collect shipping only | Highest trial rate |
| **Limited Offer** | Genuine scarcity (legitimate reason required) | +15–30% |
| **Limited-Time** | Deadline-driven with justified reason | +15–25% |
| **One-Time Offer** | Seen once, never repeated (OTO/upsell) | +30–60% AOV |
| **Combination** | Mix of 2+ types above | Highest ceiling |

---

## PAGE SPEED TARGETS

| Page Type | Target Load Time | Maximum Acceptable |
|-----------|-----------------|-------------------|
| Type B Ecomm/PDP | < 2 seconds | 3 seconds |
| Type A Long-Form | < 3 seconds | 4 seconds |
| Mobile (all types) | < 2 seconds | 3 seconds |

### Speed Optimization Priority

1. Image optimization (WebP format, lazy loading) — biggest impact
2. Remove third-party scripts (tracking, chat, pop-ups) that block render
3. CDN delivery for global audiences
4. Core Web Vitals compliance (LCP, FID, CLS)

---

## CTA DATA

### CTA Placement Data

| Placement | Conversion Impact | Notes |
|-----------|------------------|-------|
| Above fold | High | Captures ready-to-buy visitors |
| After social proof block | High | Capitalizes on credibility |
| After guarantee | Medium-High | Risk removed = buy |
| End of page | Required | Final conversion capture |
| Sticky (mobile) | High | Always-visible increases mobile CVR |

### CTA Copy Performance Patterns

| Pattern | Example | Performance |
|---------|---------|-------------|
| Specific benefit | "Get My 60-Day Supply" | High |
| Risk-reversed | "Try Risk-Free for 60 Days" | High |
| Urgency-specific | "Claim My Discount — Expires Tonight" | High (if justified) |
| Generic action | "Buy Now" | Low |
| Generic urgency | "Act Now!" | Low |
| Vague benefit | "Get Started" | Low |

---

## SOCIAL PROOF THRESHOLDS

### Minimum Social Proof to Display Publicly

| Proof Type | Minimum Threshold | Recommended |
|-----------|------------------|-------------|
| Star rating display | 10+ reviews | 50+ reviews |
| Review section on PDP | 25+ reviews | 100+ reviews |
| Social proof counter ("X customers") | 500+ | 5,000+ |
| Before/after gallery | 5+ transformations | 20+ |
| Case studies (long-form) | 2–3 detailed | 5+ |

### Social Proof Placement Timing (Awareness-Based)

| Visitor Awareness | Proof Priority | Proof Type |
|------------------|---------------|------------|
| Problem-Aware | Early placement critical | Authority/expert (not testimonials) |
| Solution-Aware | Mid-page | Mix of testimonials + clinical |
| Product-Aware | Any position | Volume social proof + specific results |
| Most Aware | Near close | Objection-specific testimonials |

---

## GUARANTEE DATA

### Guarantee Length vs. Returns

Counter-intuitive: Longer guarantee periods typically reduce returns.
- 30-day guarantee: ~10–15% return rate in supplement industry
- 60-day guarantee: ~8–12% return rate
- 90-day guarantee: ~7–10% return rate
- 365-day guarantee: ~5–8% return rate

**Reason:** Customers feel less pressure to "test it immediately" and often forget to return. The conversion lift from longer guarantee more than offsets the marginal increase in returns.

### Guarantee Display Best Practices

1. Give it a branded name — NOT "money-back guarantee" ever
2. Make it specific: "60 days from the date of purchase"
3. Make claiming easy: "Call, email, or chat — no questions asked"
4. Visual treatment: Badge/certificate design, not just text
5. Placement: Near pricing AND at close minimum

---

## MOBILE-SPECIFIC DATA

### Mobile vs. Desktop Behavior Differences

| Behavior | Mobile | Desktop | Implication |
|---------|--------|---------|-------------|
| Attention span | Shorter | Longer | Above-fold more critical |
| Scroll depth | Lower | Higher | Key info must appear higher |
| Purchase intent | Lower | Higher | Nurture > hard sell on mobile |
| Video completion | Lower | Higher | Short-form video for mobile |
| Form completion | Lower | Higher | Minimize fields on mobile |
| Image processing | Similar | Similar | Optimize images for mobile |

### Mobile-Specific Optimization Priorities

1. **Sticky ATC bar** — always-visible CTA on mobile is highest-impact single change
2. **Tap target size** — minimum 44x44px for all buttons
3. **Text size** — minimum 16px body copy (prevents iOS auto-zoom)
4. **Image compression** — mobile networks slower
5. **Above-fold CTA** — must be visible on 375px (iPhone SE) width
6. **Eliminate pop-ups** — Google penalizes intrusive interstitials on mobile

---

## A/B TEST PRIORITY DATA

### Highest-Impact Elements to Test (By Expected Variance)

| Element | Variance | Test Priority | Notes |
|---------|----------|--------------|-------|
| Headline | Very high | P1 | 5–500% variance documented |
| Hero image | High | P1 | Product vs. lifestyle vs. person |
| Above-fold layout | High | P1 | VSL vs. text vs. hybrid |
| CTA button color | Medium-High | P2 | High contrast always wins |
| Price display format | Medium-High | P2 | Anchoring strategies |
| Guarantee placement | Medium | P2 | Early vs. near close |
| Social proof type | Medium | P2 | Volume vs. specific results |
| FAQ position | Medium | P3 | Before vs. after offer |
| Page length | Medium | P3 | Long-form vs. medium |
| Trust badge design | Low-Medium | P3 | Professional vs. none |

### Testing Timeline Guidelines

| Traffic Level | Minimum Test Duration | Minimum Conversions/Variant |
|--------------|----------------------|----------------------------|
| Low (<100/day) | 4+ weeks | 100 minimum |
| Medium (100–500/day) | 2–3 weeks | 200 minimum |
| High (500–2,000/day) | 1–2 weeks | 300 minimum |
| Very High (2,000+/day) | 1 week | 500+ minimum |

---

## VERTICAL-SPECIFIC BENCHMARKS

### Health/Supplement Pages

| Metric | Benchmark | Top Performer |
|--------|-----------|--------------|
| Cold traffic CVR (email opt-in/trial) | 2–4% | 8–12% |
| Cold traffic CVR (direct sale) | 1–3% | 5–10% |
| Warm traffic CVR (email list) | 5–10% | 15–25% |
| Hot traffic CVR (abandon cart) | 15–30% | 40%+ |
| AOV increase from bundle offer | +35–60% | +100%+ |
| Guarantee claim rate (60-day) | 8–12% | <5% |
| Review rating to display | 4.4+ stars | 4.7+ |

### Info Product Pages

| Metric | Benchmark | Top Performer |
|--------|-----------|--------------|
| Webinar/VSL opt-in | 15–35% | 40–60% |
| Challenge page | 20–40% | 50–70% |
| Book funnel page | 5–15% | 20–35% |
| Paid product page (cold) | 2–6% | 10–20% |
| High-ticket application | 3–8% | 15–25% |

---

## PDP-SPECIFIC CONVERSION DATA (Baymard Institute / NN-g)

### Image Gallery UX

| Finding | Stat | Impact | Source |
|---------|------|--------|--------|
| Thumbnails vs dots navigation | **50–80% of users** overlook additional images when only dots are shown | High — lost engagement = lost conversion | Baymard |
| Pinch-to-zoom support | **40% of mobile sites** fail to support pinch-to-zoom properly | Medium-High — users can't inspect product detail | Baymard |
| Vertical thumbnail layout vs horizontal | Vertical layout **27% higher interaction** vs horizontal-only (8%) | High — thumbnails tease content, drive deeper engagement | Baymard |
| Video in carousel | Users expect product-in-motion content | High — product video in slide 1–2 increases dwell time | NN/g |
| Back-button trap on overlay | Users hit browser back → exits PDP entirely | High — must hijack back button to close overlay only | Baymard |
| In-scale images | Users lose size context on 6-inch screens | Medium — include at least one everyday-object scale shot | Baymard |

### Buy Box UX

| Finding | Stat | Impact | Source |
|---------|------|--------|--------|
| Title truncation | **46% of users** rely on full title to confirm correct variation | High — truncated titles create anxiety, increase bounces | Baymard |
| Dropdowns vs exposed chips (variants) | Dropdowns require 3+ taps → **60% more friction** than exposed chips | High — chips show all options, reduce interaction cost | Baymard |
| Quantity selector | **90% of users** want quantity "1" — dropdowns add unnecessary friction | Medium — use stepper (+/−) with 44x44px touch targets | Baymard |
| Pre-selected subscriptions | Top cause of cart abandonment and chargebacks | Critical — use honest selectable tiles, show "Cancel anytime" | Baymard |
| Savings display format | Users don't do mental math on mobile | Medium-High — show savings as BOTH % AND dollar amount | Baymard |
| Shipping proximity to price | Users combine Price + Shipping to determine value | High — if shipping cost isn't near price, users assume expensive | Baymard |
| Post-ATC redirect to cart page | Interrupts shopping flow, prevents browsing or review reading | High — use slide-out mini-cart, stay on PDP | Baymard |
| Last-second ATC anxiety | Users hesitate right before tapping Add to Cart | Medium-High — 3–4 micro-trust signals in small gray text below button | Baymard |

### BTF Section UX

| Finding | Stat | Impact | Source |
|---------|------|--------|--------|
| Vertical stacking vs horizontal carousels | Vertical layout **27% engagement** vs **8% for horizontal** in primary decision areas | High — vertical accordions for ingredients, specs, comparisons | Baymard |
| Accordion FAQ item count | Users won't sift through 20+ questions on mobile | High — curate **top 5–7 product-specific questions only** | Baymard |
| Marketing-disguised-as-FAQ | Users identify marketing questions immediately | High — lowers credibility of entire section. Stick to functional Qs | Baymard |
| Review histogram (star distribution) | Users need distribution, not just average — "safe 4.5" vs "controversial 4.5" | High — **mandatory** tappable bar chart at top of review section | Baymard |
| Review keyword filter chips | Scrolling 500+ reviews impossible on mobile | High — expose 5–8 keyword chips: "Taste," "Shipping," "Result," etc. | Baymard |
| Review loading pattern | Pagination forces page reloads; infinite scroll loses position | Medium — **"Load More" button** (15–30 reviews per batch) | Baymard |
| Verified Buyer badge | Users are skeptical of fake reviews | High — **mandatory** on every review card | Baymard |
| Dense paragraphs on mobile | Scanner's fatigue → users skip entire sections | High — "snackable" chunks: short paragraphs, bullets, headers | NN/g |
| Images of text | Unreadable on mobile without pinching, bad for SEO | Medium — always use HTML text + label images, never image-only | Baymard |

### Mobile PDP UX

| Finding | Stat | Impact | Source |
|---------|------|--------|--------|
| Sticky ATC bar | Mobile PDPs are **4–10x longer** than desktop | Critical — sticky footer bar when main ATC scrolls out of view | Baymard |
| Touch target minimum | Mobile tap precision is low | High — **minimum 44x44px** for all buttons, chips, steppers | Baymard |
| Swipe gesture support | Users expect horizontal swipe on image galleries | High — support swipe + visible arrows on both sides | Baymard |
| Mini-cart vs cart redirect | Cart redirect interrupts shopping, kills cross-sell | High — slide-out mini-cart overlay, user stays on PDP | Baymard |
| Express payment buttons | Too many colorful buttons compete with main ATC | Medium — ONE row below ATC with "OR" divider | Baymard |
| iOS auto-zoom prevention | Inputs/text below 16px trigger iOS auto-zoom | Medium — minimum 16px body copy on all PDP elements | NN/g |

### PDP Conversion Benchmarks

| Metric | Benchmark | Top Performer | Source |
|--------|-----------|--------------|--------|
| PDP Add-to-Cart rate (DTC supplements) | 8–12% | 15–20% | Industry composite |
| PDP bounce rate (paid traffic) | 45–65% | <40% | Shopify / Baymard |
| PDP bounce rate (organic/brand) | 30–45% | <25% | Shopify / Baymard |
| Review section engagement (% who scroll to reviews) | 30–40% | 50–60% | Baymard |
| Review section CVR lift (engaged vs non-engaged) | +15–25% | +35–50% | Spiegel Research |
| Mobile vs desktop PDP CVR gap | Mobile **40–60% lower** than desktop | Gap narrows to **15–25%** with optimized mobile PDP | Baymard |
| Image gallery interaction rate (with thumbnails) | 40–60% | 70%+ | Baymard |
| Image gallery interaction rate (dots only) | 15–25% | — | Baymard |
| Sticky ATC impact on mobile CVR | +8–15% lift | +20%+ | Industry composite |
| Subscription opt-in rate (honest tiles vs pre-selected) | 25–35% | 40–50% | Baymard |

---

## QUICK REFERENCE: THE 20 MOST IMPORTANT STATS

1. Median CVR all industries (2024): **6.6%** (Unbounce)
2. "Good" CVR threshold: **10%+**
3. Top 10% of pages capture: **~80% of conversions** (SeedProd)
4. Personalized CTAs vs generic: **+202%** (HubSpot)
5. Video on landing pages: **+86% lift** (VWO)
6. Long-form vs short-form leads: **+220%** (KlientBoost)
7. Multiple offers vs single: **-266% penalty** (KlientBoost)
8. Mobile-responsive vs static: **+25.2% mobile CVR** (VWO)
9. 1-second load delay: **-7% conversions** (Google)
10. Simple copy (grade 5-7): **+56%** (VWO)
11. Bounce rate benchmark: **60–90%** typical
12. Ecomm typical CVR: **2.5–3%** (Shopify)
13. Events/entertainment CVR: **12.6%** (Shopify)
14. 60-day guarantee claim rate: **8–12%** (industry)
15. 90-day guarantee claim rate: **7–10%** (industry — fewer than 60-day)
16. Bundle offer AOV increase: **+35–60%** (industry)
17. Sticky ATC bar impact (mobile): High
18. Offer testing vs headline testing: Offer wins more often
19. Above-fold decision window: **5–8 seconds** max
20. Video completion rate mobile vs desktop: Mobile significantly lower — use short-form
