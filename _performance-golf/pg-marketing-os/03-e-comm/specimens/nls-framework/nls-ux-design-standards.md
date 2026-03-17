# NLS UX Design Standards — Baymard/NN/g Research Extract

**Source:** `~brain/nls-pdp-best-practices.md` (Best Practices Research section)
**Purpose:** Mobile PDP UX standards for EC-06 editorial calibration (Mobile-First Lens + Design-Copy Integration Lens)
**Extracted:** 2026-03-13

---

## Foundational Mandate: "Verticality & Discovery"

Mobile users "hunt and scroll" — they don't "browse." Architecture must:
- Minimize interaction cost (swiping/tapping)
- Maximize "Information Scent" (if they can't see it or scroll to it, it doesn't exist)
- Combat "banner blindness"
- Reduce cognitive load
- Guide discovery → purchase without friction

**Key stat:** Users overlooked content in **horizontal tabs 27% of the time** vs. only **8% in vertical collapsed sections**. Vertical scrolling is the primary natural interaction on mobile.

---

## Section 1: Product Image Carousel

**Primary Role:** Bridge the gap between digital and physical. Simulates the physical examination experience.

### 1.1 Thumbnails vs. Dots
- **Mistake:** Using only pagination dots (• o o o o)
- **Finding:** **50-80% of users** overlook additional images when only dots are used
- **Gold Standard:** Display thumbnails directly below the main image
- **Alternative ("The Peek"):** Allow the edge of the next image to peek out from the right side — creates irresistible swipe affordance

### 1.2 Pinch-to-Zoom Mandate
- **Mistake:** Disabling pinch-to-zoom or relying on "tap to zoom" icon
- **Finding:** **40% of mobile sites** fail to support pinch-to-zoom
- **Standard:** Support Double-Tap AND Pinch; dynamically swap for higher-res on pinch (pixelated zoom = conversion drop)

### 1.3 "In Scale" & Lifestyle Requirement
- **Mistake:** Only "cut out" images (product on white background)
- **Standard:** Include at least one "In Scale" image (product next to common object or in hand)
- **Why:** Reduces returns and "hesitation" caused by scale uncertainty

### 1.4 Gallery Overlay
- **Standard:** Tapping main image opens Full-Screen Gallery Overlay with dark background, left/right swiping, deep zoom (2x-4x)
- **Critical:** Must hijack browser "Back" button while overlay is open (otherwise users accidentally navigate away from PDP)

### 1.5 Video Integration
- **Mistake:** Hiding video in a separate section lower down
- **Standard:** Mix video directly into image carousel (usually slide 1 or 2); must have prominent Play icon overlay on thumbnail

---

## Section 2: Product Overview ("Buy Box")

**Primary Role:** Confirmation Zone — reduce anxiety, confirm relevance, verify correct variant.

### 2.1 Full Title Visibility
- **Mistake:** Truncating product title with "..."
- **Standard:** **Always display the full product title.** If it takes 3 lines, let it take 3 lines. Clarity > vertical space.

### 2.2 Review Stars as Anchor Link
- **Mistake:** Static stars (visual only) or stars that open pop-up modal
- **Standard:** Stars + "(1,240 Reviews)" must be a **Page Anchor Link** that smooth-scrolls to Reviews section

### 2.3 Price & Savings — "Do the Math"
- **Mistake:** Showing only sale price, or just strikethrough without savings calculation
- **Standard:** Current price significantly larger (font size) than old price; explicitly state **"Save $10"** or **"20% Off"** next to price
- **Why:** "Calculated savings" triggers loss-aversion faster than two raw numbers

### 2.4 Exposed Variant Selectors
- **Mistake:** Drop-down menus for size/color/flavor (3+ taps required)
- **Standard:** Use **"Exposed" Buttons (Chips)** — visible, tappable tiles laid out on page
- **Rule:** If fewer than 10 options, lay them out as visible buttons
- **Out of Stock:** Show but grey out — do NOT hide (users think you never carried it)
- **Finding:** Reduces friction by **60%**

### 2.5 "Auxiliary" Description (Short Bullets)
- **Mistake:** Full paragraph description pushing Buy button too far down
- **Standard:** 3-4 short bullet points max — "Value Props" not "Specs" (e.g., "Clinically dosed," "Zero Sugar," "Made in USA")

### 2.6 Shipping Proximity Rule
- **Mistake:** Shipping info in site-wide banner or footer
- **Finding:** Users determine "value" by combining **Price + Shipping** — invisible shipping = assumed expensive
- **Standard:** Place concise shipping summary directly below price or below ATC button (e.g., "$49.00 - Free 2-Day Shipping")

---

## Section 3: CTA & Checkout

**Primary Role:** Friction Zone — facilitate action by removing cognitive load and risk.

### 3.1 Subscription vs. One-Time Purchase
- **Mistake:** Pre-selecting Subscribe & Save without making it visually obvious
- **Finding:** "Sneaking" subscription = top cause of abandonment and chargebacks
- **Standard:** Use **"Selectable Tiles"** (large, tappable radio-button tiles stacked vertically)
- **Subscription tile:** Highlighted with different background/border; includes "Cancel anytime" text and explicit dollar savings

### 3.2 Quantity Selector: Stepper Not Dropdown
- **Standard:** Use **Stepper** ([ - ] [ 1 ] [ + ]) not dropdown
- **Hit Area:** Min 44x44 pixels for + and - buttons

### 3.3 "Add to Cart" Button
- **Width:** Full width of container
- **Label:** Standard terminology only — **"Add to Cart"** or **"Add to Bag"** (creative labels increase cognitive load)
- **State Change:** Must visually react when tapped (color change or depress)

### 3.4 Post-Click Behavior: Stay on PDP
- **Mistake:** Redirecting to Cart Page immediately
- **Standard:** Use **Slide-Out Cart** (preferred) or **Toast Notification** — user stays on PDP background
- **Why:** Redirecting interrupts shopping flow if user wanted to add more or read reviews

### 3.5 Third-Party Payments
- **Mistake:** Cluttering CTA area with 5 payment buttons (Decision Paralysis)
- **Standard:** Primary ATC button first (prominent); single "More Payment Options" link or simplified logo row below; Express Checkout under main ATC with "OR" divider

### 3.6 Micro-Copy Anxiety Reducers
- **Mistake:** Leaving space around ATC button empty
- **Standard:** Add **Micro-Trust Signals** immediately below button: "Secure Checkout • Ships Tomorrow • 30-Day Returns" (small font, neutral gray, centered)

---

## Section 4: Product Details & Information

**Primary Role:** Logic Zone — rational proof to justify the emotional hook. "Information Scent" is critical.

### 4.1 Accordion vs. Long Scroll
- **Mistake:** Full description, ingredients, how-to-use as open text blocks in sequence ("Endless Scroll")
- **Standard:** Use **Vertically Stacked Accordions** (expandable sections)
  - Description: Open by default (or partially with "Read More")
  - Ingredients & Nutrition: Collapsed
  - How to Use: Collapsed
  - FAQs: Collapsed
- **Why:** Gives user a "Table of Contents" view — see all topics at a glance, tap only what they need

### 4.2 "Snackable" Description Text
- **Mistake:** Wall of text (single 10-line paragraph)
- **Standard:** Break into chunks with **bold subheaders every 2-3 sentences**, bullet points for features, icons paired with key benefits

### 4.3 Truncation ("Preview" Approach) for Ingredients
- **Standard:** Show first 5-10 ingredients followed by "View Full List" link
- **Why it tests better:**
  1. Maintains Scent (user sees "Vitamin C, Zinc..." confirming content type)
  2. Saves Vertical Space
  3. Reduces Interaction Cost (dealbreaker scanning without tap)

### 4.4 Ingredients: HTML Text + Label Image
- **Mistake:** Low-res image of Supplement Facts panel (unreadable on mobile, not accessible)
- **Standard:** Primary = real selectable HTML text (truncation method); Secondary = high-res facts panel image as tap-to-expand
- **Allergen Callout:** Distinctly separate at top or bottom in bold

### 4.5 Cross-Sell Placement
- **Mistake:** "You May Also Like" interrupting product description
- **Standard:** Place cross-sells **below Product Details** but **above Reviews**
- **Logic:** After reading details, user has decided to buy or not — THAT moment to offer alternatives
- **Bundling:** "One-Click Bundle" button for routine products (e.g., Shampoo + Conditioner)

### 4.6 Vertical vs. Horizontal: The Verdict
- **Stat:** Horizontal tabs = 27% content overlooked; Vertical accordions = only 8%
- **Rule:** Do NOT use horizontal carousels for primary decision-making content. Use vertical stacking or vertical accordions.

---

## Section 5: FAQ Strategy

**Primary Role:** Objection Handling — pre-emptively resolve top 5 barriers to purchase.

### 5.1 The "Top 5" Rule (Curated Not Dump)
- **Mistake:** Dumping 20+ site-wide questions onto product page
- **Standard:** Curate **Top 5-7 product-specific questions** (source: CS team — "top 5 reasons people hesitate to buy THIS item")
- **Overflow:** "View all FAQs" link to modal or new page

### 5.2 "No Marketing" Mandate
- **Mistake:** Disguising sales pitches as questions ("Why is this the world's best formula?")
- **Finding:** Users identify this immediately as disingenuous — lowers credibility of entire section
- **Standard:** Strictly functional and defensive questions ("Does this contain caffeine?", "Will this break my fast?")

### 5.3 Accordion Stack
- **State:** All closed initially
- **Visuals:** High-contrast borders between items; clear + icon on right side
- **Hit Areas:** Clear touch targets

### 5.4 Contextual Linking
- **Standard:** Give "Headline Answer" (1 sentence) + link to full policy
- **Example:** "Yes, we offer free returns within 30 days. [Read our full Return Policy]."

---

## Section 6: Social Proof & Reviews

**Primary Role:** Truth Serum — users trust other users more than brand. At this scroll depth, users seek reasons NOT to buy.

### 6.1 Review Histogram is Mandatory
- **Mistake:** Only average star rating without distribution
- **Standard:** Display **Review Histogram** (bar chart) prominently; bars must be **tappable** to filter reviews
- **Key interaction:** Tapping "1-Star" bar filters to negative reviews — #1 user want: "Show me why people hate this"

### 6.2 UGC Customer Photo Strip
- **Mistake:** Burying user photos inside individual text reviews
- **Standard:** Create **Customer Photo Strip** or Grid immediately above text reviews
- **Overlay Rule:** Tapping one photo opens Full-Screen Gallery Overlay with ALL customer photos from ALL reviews (not just that single user)

### 6.3 Review Filtering
- **Mistake:** Only "Sort by Date"
- **Standard:**
  - **Keyword Filters:** Tappable chips for common topics ("Taste," "Shipping," "Texture," "Result")
  - **Attribute Filters:** Filter by user type ("Age: 50+," "Golfer," "Sensitive Stomach")

### 6.4 Loading: "Load More" Button
- **Mistake:** Infinite scroll (blocks footer) or pagination (hard to tap)
- **Standard:** Large **"Load More" Button** loading 15-30 reviews at a time

### 6.5 "Write a Review" De-emphasis
- **Standard:** Secondary ghost button or text link, placed under histogram (NOT next to Price/Title)
- **Why:** You're selling to buyers, not recruiting writers

### 6.6 Reviewer Badges
- **Verified Buyer:** Non-negotiable
- **"Time Owned":** Show "Used for 3 months" when possible (massive credibility vs. day-1 reviews)

### 6.7 Individual Review Card Template
**Hierarchy:**
1. **Row 1 (Hook):** Star Rating + Bold Headline (e.g., ★★★★★ "Best sleep I've had in years")
2. **Row 2 (Context):** Reviewer Attributes in gray (Age: 45-54 | Concern: Insomnia | Verified Buyer)
3. **Row 3 (Data):** Pros/Cons Bullets — green checks for Pros, red Xs for Cons (3x more readable than paragraph)
4. **Row 4 (Body):** Full text review
- **"Was this helpful?"** Thumb Up/Down toggle (crowdsources quality control)
- **Merchant Response:** If 3 stars or less, display "Response from the Brand" box — apologetic and solution-oriented tone

---

## Section 7: User-Generated Q&A

**Primary Role:** Safety Net — resolves specific outlier blockers ("Can I take this while fasting?").

### 7.1 "Search First" Interface
- **Standard:** Prominent keyword search field at top of section, filtering results instantly as user types

### 7.2 Brand vs. Community Distinction
- **Brand Answers:** Visually distinct (specific background color, "Official Team" badge, logo)
- **Community Answers:** Standard text styling

### 7.3 "2-Click" Exposure
- **Default State:** Question + Top Answer (truncated to 2 lines)
- **Interaction:** Tap to expand full thread

### 7.4 Zero-Result Handling
- **If 0 questions:** Hide section entirely or replace with "Ask a Question" link to private support (NOT public empty board — creates negative social proof)

---

## Section 8: Persistent Navigation

**Primary Role:** Prevent Scroll Fatigue and Disorientation on long mobile pages.

### 8.1 Sticky ATC Footer
- **Standard:** When main ATC button scrolls out of view, compact bar slides up from bottom with product title, price, and prominent "Add to Cart" button
- **Stat:** Mobile pages are **4-10x longer** than desktop pages — don't make users scroll back up

### 8.2 Breadcrumbs are Mandatory
- **Location:** Top of page (e.g., Home > Men > Shoes > Running)
- **Function:** #1 way mobile users "back out" from wrong product landing; without breadcrumbs, they hit browser Back and leave site entirely
- **Scope Awareness:** If user searched "Red Shoes" then clicked a product, "back" must return to search results at exact scroll position

---

## EC-06 Calibration Summary

These standards map directly to EC-06's editorial audit lenses:

| UX Standard | EC-06 Audit Lens | Key Metric |
|-------------|------------------|------------|
| Verticality & Discovery | Mobile-First (1.6) | No horizontal tabs for decision content |
| Thumbnails > Dots | Design-Copy Integration (1.5) | Visible thumbnails below hero |
| Pinch-to-Zoom | Mobile-First (1.6) | Zoom specified in design notes |
| Full Title | Mobile-First (1.6) | No truncation in copy |
| Exposed Selectors | Design-Copy Integration (1.5) | Chips not dropdowns |
| Price + Savings | DR Principles (1.4) | Explicit savings displayed |
| Micro-Trust Signals | DR Principles (1.4) | Security + shipping + returns below CTA |
| Accordion Layout | Mobile-First (1.6) | Expandable sections for details |
| FAQ Curated | DR Principles (1.4) | 5-7 product-specific, no marketing disguise |
| Review Histogram | Design-Copy Integration (1.5) | Tappable distribution bars |
| Sticky ATC | Mobile-First (1.6) | Compact footer CTA on scroll |
| Shipping Proximity | DR Principles (1.4) | Shipping summary near price |
