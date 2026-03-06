# Affiliate Promotion Campaign Template

**Version:** 1.0
**Created:** 2026-02-21

---

## Campaign Type Description

The Affiliate Promotion is a 5-email campaign over 3 days for promoting a partner's product to your list. It is intentionally lighter than an own-product launch — fewer emails, shorter duration, less urgency. The relationship with the subscriber matters more than any single affiliate commission. Overpromoting affiliate products erodes list trust faster than almost anything else.

The core challenge of affiliate copy is authenticity. The subscriber knows (or should know) that you're earning a commission. The strategy is radical transparency: disclose the affiliate relationship early, explain WHY you're promoting this specific product, and bridge from your worldview to the partner's product. The "buck nekid affiliate link" approach — putting the raw affiliate link in the email with zero cloaking — signals confidence and honesty.

This template assumes the affiliate product has a genuine deadline (launch window, limited enrollment, price increase). If there is no real deadline, use only Days 1-2 (4 emails) and skip the Day 3 urgency stack.

---

## Campaign Structure

- **Total Emails:** 5-7 (5 core + optional 2 resends on Day 3)
- **Duration:** 3 calendar days
- **Urgency:** Low on Day 1, Medium on Day 2, High on Day 3 (only if deadline is real)
- **Disclosure Requirement:** Affiliate relationship MUST be disclosed in every email. FTC compliance is non-negotiable.

---

## Email-by-Email Blueprint

```yaml
affiliate_promotion:

  day_1:
    label: "The Introduction"
    email_count: 2
    emails:
      - position: 1
        body_type: ST
        function: AL
        content_focus: >
          Origin story of the partner product as YOU experienced it. Not
          the partner's marketing copy — YOUR story of discovering, using,
          or being affected by this product. "A few months ago, [partner]
          showed me something..." or "I've been using [product] since
          [timeframe] and here's what happened..." The story must be TRUE
          and specific. Generic endorsements fail.
        urgency_level: low
        target_length: "500-700 words"
        disclosure: >
          Affiliate disclosure within first 3 paragraphs: "Full disclosure:
          I'm an affiliate for [product], which means I earn a commission
          if you buy through my link. I'm promoting it because [genuine
          reason], not because of the commission."
        affiliate_link_style: >
          "buck nekid" — raw affiliate link, not cloaked. Example: "Here's
          my affiliate link: [full URL]. No pretty redirects, no hiding it.
          That's my link. If you use it, I get paid. If you don't, no hard
          feelings."
        notes: >
          The origin story is the hardest email to write because it must be
          genuinely personal. If you don't have a real story with the product,
          you shouldn't be promoting it. "I haven't used it but I trust the
          creator" is acceptable ONLY if the trust story is compelling.

      - position: 2
        body_type: QO
        function: AL
        content_focus: >
          Quote from the product creator, an industry authority, or a
          notable customer — then bridge to why this quote matters for
          YOUR audience. The quote should illuminate the product's core
          philosophy or mechanism. This email deepens the intellectual
          case beyond your personal story.
        urgency_level: low
        target_length: "400-500 words"
        disclosure: "Brief reminder: 'As I mentioned, this is an affiliate link.'"
        notes: >
          If the product creator has said something genuinely insightful
          publicly (podcast, interview, book), quote that. It positions
          the creator as a thinker, not just a seller.

  day_2:
    label: "The Case"
    email_count: 2
    emails:
      - position: 3
        body_type: CT
        function: AL
        content_focus: >
          Contrarian angle on why this product is different from alternatives.
          NOT a comparison chart. A genuine argument for why the conventional
          approach to this problem is wrong and why this product's approach
          is better. "Most [solutions in this space] do [common approach].
          Here's why that doesn't work, and what [product] does instead."
        urgency_level: medium
        target_length: "500-700 words"
        disclosure: "Standard affiliate disclosure in PS or early body."
        notes: >
          The contrarian angle should come from YOUR expertise, not the
          partner's marketing. You're lending your credibility to explain
          why this product makes sense. If you can't articulate a genuine
          contrarian reason, the promotion is weak.

      - position: 4
        body_type: TM
        function: AL
        content_focus: >
          Testimonial email featuring results from people who've used the
          product. Ideally YOUR customers or readers who've also used
          the partner product (overlap audience). Second best: testimonials
          from the partner's customers that you've verified or that come
          from credible, named sources. Worst: anonymous testimonials
          from the partner's sales page (don't use these).
        urgency_level: medium
        target_length: "400-600 words"
        disclosure: "Standard affiliate disclosure."
        notes: >
          If you can feature a testimonial from someone your audience
          already knows (a previous guest, a community member, a public
          figure), that's 10x more powerful than an anonymous result.

  day_3:
    label: "The Close"
    email_count: "3 (1 core + 2 urgency/last call)"
    emails:
      - position: 5
        body_type: LB
        function: AL
        content_focus: >
          List of reasons to get it. "7 reasons I think [product] is
          worth it." Each reason is a compact argument — not a feature,
          but a benefit with context. This email is for the analytical
          reader who needs a structured summary before deciding. Include
          price, guarantee, and what they get — all in scannable format.
        urgency_level: high
        target_length: "500-700 words"
        disclosure: "Standard affiliate disclosure."
        notes: >
          This is the most "sales page-like" email in the sequence.
          Make it scannable. Bold the key points. Readers should be able
          to skim the bolded text and get the full argument.

      - position: 6
        body_type: QA
        function: DU
        content_focus: >
          Urgency stack. "The deadline is tonight. Before you decide,
          here are the 3 questions I keep getting..." Combines final
          objection handling with deadline awareness. Answers should be
          brief and direct. The email assumes the reader is on the fence,
          not unaware.
        urgency_level: maximum
        target_length: "300-400 words"
        disclosure: "Brief disclosure reminder."
        notes: >
          Only send this email if the deadline is REAL. If you're promoting
          an evergreen product with no actual deadline, skip this email.
          Manufactured urgency for affiliate products destroys trust
          twice as fast as for your own products.

      - position: 7
        body_type: any
        function: DU
        content_focus: >
          Last call. Under 150 words. "[Product] closes tonight at midnight.
          My affiliate link: [link]. If you have questions, reply to this
          email and I'll answer before the deadline." Short, direct, helpful.
        urgency_level: maximum
        target_length: "80-150 words"
        disclosure: "Link itself is the disclosure (buck nekid)."
        notes: >
          Send 2-3 hours before actual deadline. No story, no argument.
          Just the link and the deadline. Respect the reader's intelligence —
          if 6 emails haven't made the case, a 7th long email won't help.
```

---

## Affiliate-Specific Rules

```yaml
affiliate_rules:

  disclosure:
    requirement: "FTC-compliant affiliate disclosure in EVERY email"
    placement: "Within first 3 paragraphs of Email 1. Top or PS of all subsequent emails."
    language_examples:
      - "Full disclosure: this is an affiliate link. I earn a commission if you buy."
      - "Affiliate link below — I get paid if you use it."
      - "I'm an affiliate for [product]. Transparency matters to me."
    forbidden:
      - "Burying disclosure in a footer no one reads"
      - "Using tiny font or gray text for disclosure"
      - "Omitting disclosure in any email"

  buck_nekid_link:
    description: >
      The affiliate link is displayed in its raw, uncloaked form. No
      pretty redirects, no link shorteners, no "click here" masking.
      The subscriber sees the full URL including any affiliate tracking
      parameters. This radical transparency signals confidence.
    example: >
      "Here's my affiliate link — it's ugly but it's honest:
      https://partner.com/product?ref=yourname&aff=12345"
    when_to_use: "At least once per campaign (typically Email 1 or Email 5)"
    notes: >
      Some affiliates prohibit displaying raw links. In that case,
      acknowledge the cloaked link: "This link goes through my affiliate
      tracking — just so you know."

  product_selection_criteria:
    - "You have personal experience with the product (used it, seen results)"
    - "The product genuinely serves your audience's needs"
    - "The product creator is someone you'd recommend even without commission"
    - "The product has a real guarantee / refund policy"
    - "You would NOT be embarrassed if the product underdelivered"

  frequency_limits:
    - "Maximum 1 affiliate promotion per month to the full list"
    - "Maximum 2 affiliate promotions per month to segments"
    - "Never run an affiliate promotion within 7 days of your own product launch"
    - "Never stack two affiliate promotions back-to-back"
```

---

## Body Type Variety Rules

- ST (Story) appears 1 time — the origin story carries the authenticity
- QO (Quote-Opener) appears 1 time — borrowed authority from the partner or industry
- CT (Contrarian) appears 1 time — intellectual differentiation
- TM (Testimonial) appears 1 time — social proof
- LB (List-Based) appears 1 time — structured summary for analytical readers
- QA appears 1 time — final objection handling under urgency
- NR (Negative Response) does NOT appear — too heavy for a 3-day affiliate campaign
- No same body type appears twice (each email is a different type)
- 6 of 7 body types used across 5-7 emails — maximum variety for a short campaign

---

## Emotional Arc

```
Email 1 (Day 1 AM): Trust + Personal Story ........ (0% urgency)
Email 2 (Day 1 PM): Authority + Context ............ (0% urgency)
Email 3 (Day 2 AM): Intellectual Differentiation ... (20% urgency)
Email 4 (Day 2 PM): Social Proof ................... (30% urgency)
Email 5 (Day 3 AM): Structured Case ................ (60% urgency)
Email 6 (Day 3 PM): Final Objections + Deadline .... (90% urgency)
Email 7 (Day 3 EVE): Last Call ...................... (100% urgency)
```

The arc for affiliate is compressed but follows the same psychological sequence as a launch: story -> authority -> differentiation -> proof -> summary -> urgency -> close. The key difference is that trust is front-loaded even more heavily because you're asking subscribers to trust your recommendation, not just your product.

---

## CTA Escalation Pattern

| Position | CTA Style | Example |
|----------|-----------|---------|
| 1 | Soft introduction | "Check it out if you're curious: [affiliate link]" |
| 2 | Authority-framed | "See what [creator] built: [link]" |
| 3 | Differentiation-framed | "This is why it's different: [link]" |
| 4 | Proof-framed | "See the results for yourself: [link]" |
| 5 | Summary CTA | "Get it here before [deadline]: [link]" |
| 6 | Urgency CTA | "Last few hours: [link]" |
| 7 | Final CTA | "[link]. Midnight tonight." |

- Links appear 1-2 times per email (less than own-product launches)
- Buck nekid link format used at least once
- Never use "buy now" — use "check it out," "take a look," "see if it's right for you"
- The softer language reflects the lower-commitment relationship (you're recommending, not selling)

---

## Subject Line Strategy

- **Email 1:** Personal story hook — "Why I started using [product]" / "Something I've been meaning to tell you about"
- **Email 2:** Authority angle — "[Creator name] nailed it" / "A quote that changed how I think about [topic]"
- **Email 3:** Contrarian hook — "Why [common approach] doesn't work" / "The [topic] advice I disagree with"
- **Email 4:** Proof hook — "[Name]'s results with [product]" / "This stopped me in my tracks"
- **Email 5:** List hook — "7 reasons I'm recommending [product]" / "Why [product] (the full case)"
- **Email 6:** Urgency — "Closing tonight + your questions answered"
- **Email 7:** Blunt — "Last call for [product]" / "Tonight at midnight"

**Rules:**
- Never use "URGENT" or "DON'T MISS" — that's the partner's job, not yours
- Your subject lines should sound like YOU, not like the partner's swipe copy
- If the partner provides swipe subject lines, rewrite them in your voice entirely
- The subscriber should not be able to tell from the subject line alone that this is an affiliate email
