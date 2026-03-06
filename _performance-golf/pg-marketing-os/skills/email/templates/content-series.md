# Content Series Campaign Template

**Version:** 1.0
**Created:** 2026-02-21

---

## Campaign Type Description

The Content Series is a 7-email educational sequence delivered daily over one week. Each email teaches a single concept related to the sender's area of expertise. The pitch is minimal — present only as context, never as the focus. This campaign type is designed for top-of-funnel trust building: new subscribers, cold traffic, post-lead-magnet sequences, or audiences that need education before they're ready for a pitch.

The fundamental principle is radical generosity. Each email should be valuable enough to stand alone as a blog post, mini-lesson, or shareable insight. The subscriber should finish the series thinking "if the free content is this good, the paid product must be exceptional" — but that thought should arrive unprompted, never engineered.

Function splits: the first 5 emails are CP (Content/Podcast) — pure educational content. The last 2 emails shift to DR (Daily Relationship) — the teaching concludes and the ongoing relationship begins. This transition prevents the awkward cliff where an educational series ends and the subscriber hears nothing until a pitch arrives.

---

## Campaign Structure

- **Total Emails:** 7
- **Duration:** 7 days (1 email per day)
- **Function Split:** Emails 1-5 = CP (Content/Podcast), Emails 6-7 = DR (Daily Relationship)
- **Urgency:** None. Zero pitch pressure. Zero deadlines.
- **Pitch Density:** < 5%. Product/service mentioned only as context for the teaching. No CTA to buy in Emails 1-5. Soft mention in Emails 6-7.

---

## Email-by-Email Blueprint

```yaml
content_series:

  email_1:
    day: 1
    body_type: ST
    function: CP
    concept: "The Foundation — Why This Matters"
    content_focus: >
      Story-led introduction to the overarching theme of the series.
      Establishes WHY this topic matters through a narrative (personal
      experience, client story, historical example). Ends with a preview
      of the 7 concepts they'll learn: "Over the next week, I'm going
      to walk you through [framework/system/approach]. Today is the
      foundation. Tomorrow we go deeper."
    urgency_level: none
    target_length: "500-700 words"
    teaching_ratio: "70% story, 30% concept introduction"
    product_mention: none
    notes: >
      The story must create emotional stakes for the topic. If the
      subscriber doesn't care about the topic after Email 1, they
      won't open Email 2. The story is the hook, not the concept.
      Name the series explicitly: "This is Part 1 of 7."

  email_2:
    day: 2
    body_type: LB
    function: CP
    concept: "The Framework — Core Principles"
    content_focus: >
      List-based breakdown of the core principles or framework
      underlying the topic. "The 5 principles behind [topic]" or
      "The framework I use for [topic]." Each principle gets 2-3
      sentences of explanation with a concrete example. Scannable,
      practical, immediately useful.
    urgency_level: none
    target_length: "500-700 words"
    teaching_ratio: "90% concept, 10% context"
    product_mention: none
    notes: >
      This email is the structural backbone. It gives the subscriber
      a mental model they'll use to understand everything that follows.
      Reference back to Email 1's story: "Remember [story detail]?
      Here's the framework behind why that happened..."

  email_3:
    day: 3
    body_type: QO
    function: CP
    concept: "The Authority — What the Experts Know"
    content_focus: >
      Quote from a recognized authority that illuminates a deeper
      dimension of the topic. The quote opens the email, then the
      body unpacks it with original analysis. Shows that the sender's
      thinking aligns with (or challenges) established experts. Adds
      credibility through association while demonstrating independent thought.
    urgency_level: none
    target_length: "400-600 words"
    teaching_ratio: "85% concept, 15% authority framing"
    product_mention: none
    notes: >
      The quote should introduce an idea that HASN'T been covered
      yet — not reinforce what's already been said. It should expand
      the subscriber's understanding in a new direction. "Part 3 of 7."

  email_4:
    day: 4
    body_type: QA
    function: CP
    concept: "The Objections — What Most People Get Wrong"
    content_focus: >
      Q&A format addressing the most common misconceptions, mistakes,
      or objections people have about the topic. "After teaching this
      for [X years], here are the 3 questions I always get — and why
      the answers surprise people." Each question reveals a non-obvious
      truth that deepens understanding.
    urgency_level: none
    target_length: "500-700 words"
    teaching_ratio: "90% concept, 10% experience framing"
    product_mention: none
    notes: >
      The questions should be ones the subscriber likely has RIGHT NOW
      after reading 3 days of content. Anticipate their mental state
      and address it directly. This email clears objections to the
      TEACHING, not to a product.

  email_5:
    day: 5
    body_type: CT
    function: CP
    concept: "The Breakthrough — The Counterintuitive Truth"
    content_focus: >
      Contrarian teaching that challenges the conventional wisdom
      about the topic. "Everything I've taught you this week leads to
      one counterintuitive conclusion..." This is the intellectual
      climax of the series — the insight that makes the subscriber
      feel like they've learned something genuinely new and valuable.
    urgency_level: none
    target_length: "500-700 words"
    teaching_ratio: "95% concept, 5% framing"
    product_mention: >
      First allowable mention — but only as context: "This is exactly
      the principle behind [product/service] — but whether you ever use
      [product] or not, this insight will change how you [outcome]."
    notes: >
      This is the most important email in the series. The contrarian
      insight must be genuinely surprising AND logically airtight given
      everything taught in Emails 1-4. If it doesn't land, the series
      was just "nice content." If it lands, the subscriber is transformed.

  email_6:
    day: 6
    body_type: ST
    function: DR
    concept: "The Application — Putting It Together"
    content_focus: >
      Story of someone (you or a client) who applied these concepts
      and what happened. The story demonstrates the teaching in action.
      Bridges from theory to practice. Shifts tone from teacher to
      peer: "Now that you know this, here's what it looks like in
      the real world..."
    urgency_level: none
    target_length: "400-600 words"
    teaching_ratio: "60% application story, 40% relationship bridge"
    product_mention: >
      Soft contextual mention: "[Product/service] was built around
      these exact principles. If you want to go deeper, it's here:
      [link]. But honestly, what I've shared this week gives you
      enough to start."
    notes: >
      The function shifts to DR here because the teaching is complete.
      This email begins the transition from "educational series" to
      "ongoing relationship." The tone should warm — less professor,
      more friend.

  email_7:
    day: 7
    body_type: LB
    function: DR
    concept: "The Summary + What's Next"
    content_focus: >
      Recap list of the 7 key concepts taught across the series.
      Each item is 1-2 sentences summarizing the insight from that
      day's email. Then a transition: "This series is done, but I'm
      not going anywhere. Starting tomorrow, you'll get my regular
      [daily/weekly] email where I cover [topics]. Here's what to
      expect..." Sets expectations for ongoing communication.
    urgency_level: none
    target_length: "400-600 words"
    teaching_ratio: "50% recap, 30% relationship transition, 20% soft pitch"
    product_mention: >
      Slightly more direct than Email 6: "If this series resonated,
      [product/service] takes everything you've learned and [specific
      benefit]. Here's the link: [link]. No pressure, no deadline.
      It'll be there whenever you're ready."
    notes: >
      End with warmth and an invitation to reply: "Hit reply and tell
      me what resonated most from this series. I read every email."
      This generates replies (engagement signal) and provides content
      ideas for future emails.
```

---

## Body Type Variety Rules

- ST (Story) appears 2 times — opens the series (Day 1) and demonstrates application (Day 6)
- LB (List-Based) appears 2 times — provides framework (Day 2) and summarizes (Day 7)
- QO (Quote-Opener) appears 1 time — borrowed authority in the middle (Day 3)
- QA (Q&A) appears 1 time — objection clearing (Day 4)
- CT (Contrarian) appears 1 time — the intellectual climax (Day 5)
- TM (Testimonial) does NOT appear — this is teaching, not selling
- NR (Negative Response) does NOT appear — no pitch to respond negatively to
- Body type sequence: ST, LB, QO, QA, CT, ST, LB
- No consecutive same body types (ST on Day 1 and 6 are separated by 4 days)

---

## Emotional Arc

```
Day 1: Curiosity + Emotional Stakes .... "Why should I care?"
Day 2: Structure + Clarity ............. "Now I have a framework"
Day 3: Authority + Depth ............... "Smart people agree"
Day 4: Relief + Correction ............. "I was doing it wrong — now I know"
Day 5: Breakthrough + Excitement ....... "I never thought of it that way"
Day 6: Inspiration + Connection ........ "This actually works in the real world"
Day 7: Completion + Belonging .......... "I learned something real — I want more"
```

The arc follows the natural learning curve: engagement -> understanding -> depth -> correction -> breakthrough -> application -> integration. Each email builds on the previous one. Unlike launch sequences (which build urgency), content series build UNDERSTANDING. The subscriber should feel smarter by Day 7, not more pressured.

---

## CTA Escalation Pattern

| Day | CTA Approach | Example |
|-----|-------------|---------|
| 1 | None | "See you tomorrow for Part 2" |
| 2 | None | "Tomorrow: what the experts know. Part 3 of 7." |
| 3 | None | "Part 4 tomorrow — the questions that always come up" |
| 4 | None | "Tomorrow's the big one. Part 5 of 7." |
| 5 | Contextual mention only | "This is what [product] is built around — [link] if curious" |
| 6 | Soft with permission | "[Product] goes deeper on all of this: [link]. No rush." |
| 7 | Clear but unpressured | "Ready to go deeper? [link]. It'll be there whenever you're ready." |

- Days 1-4: ZERO links to any sales page. Pure content. No exceptions.
- Day 5: Maximum 1 link, buried in context, positioned as optional
- Day 6: Maximum 1 link, positioned with explicit "no pressure" framing
- Day 7: Maximum 2 links (mid-email and PS), positioned with "no deadline" framing
- The subscriber should NEVER feel like the education was a funnel in disguise

---

## Subject Line Strategy

```yaml
subject_line_approach:
  pattern: "Part X: [Concept Teaser]"
  examples:
    day_1: "Part 1: The story that started everything"
    day_2: "Part 2: The 5-principle framework"
    day_3: "Part 3: What [authority] figured out"
    day_4: "Part 4: The 3 questions everyone asks"
    day_5: "Part 5: The counterintuitive truth"
    day_6: "Part 6: What happened when [name] tried it"
    day_7: "Part 7: Everything you've learned (and what's next)"

  rules:
    - "Always include 'Part X' — it creates continuity and completeness drive"
    - "The colon format (Part X: [teaser]) is consistently high-performing for series"
    - "Each teaser should create curiosity about THAT email's specific concept"
    - "Never use urgency language — there's nothing to miss"
    - "Never use product names in subject lines (this is content, not promotion)"
    - "No first name personalization (it implies a sales relationship)"

  alternative_format: >
    If the audience responds better to non-numbered subjects, use
    thematic titles: "The Foundation" / "The Framework" / "The Authority" /
    "The Objections" / "The Breakthrough" / "The Application" / "The Summary"
```

---

## Series Design Principles

```yaml
design_principles:

  single_concept_per_email:
    rule: "Each email teaches exactly ONE concept. Not two. Not one-and-a-half."
    reason: >
      Subscribers absorb and remember single concepts. Two concepts in
      one email means neither gets retained. If you have 10 concepts,
      build a 10-email series, don't cram them into 7.

  build_on_previous:
    rule: "Each email must reference at least one concept from a previous email."
    reason: >
      Callbacks create the feeling of a coherent curriculum rather than
      disconnected tips. "Remember the framework from Day 2? Today's
      insight plugs directly into Principle 3..."

  standalone_value:
    rule: "Each email must be valuable even if the subscriber reads ONLY that email."
    reason: >
      Not everyone reads every email. A subscriber who only opens Day 5
      should still get a complete, useful insight — just a deeper one
      if they've read Days 1-4.

  teach_dont_tease:
    rule: "Give the full insight. Never 'for the rest of this, check out [product].'"
    reason: >
      Gated content in an educational series destroys trust instantly.
      The teaching must be complete. The product enhances or implements —
      it should never be required to finish understanding the concept.

  show_your_work:
    rule: "Include the reasoning, not just the conclusion."
    reason: >
      Subscribers who understand WHY something is true are more likely to
      trust the teacher. "X is true because [reasoning]" beats "X is true,
      trust me" every time.
```

---

## Transition to Ongoing Communication

```yaml
post_series_transition:
  timing: "Day 8 (the day after the series ends)"
  approach: >
    The subscriber should receive their first "regular" email on Day 8.
    This email should reference the series: "Yesterday was Part 7 of
    the [Series Name]. Starting today, you'll hear from me [daily/weekly]
    with more on [topic area]." This prevents the jarring silence that
    often follows educational sequences and keeps the engagement momentum.
  if_autoresponder_follows: >
    If the content series feeds into an autoresponder, Day 8 = Autoresponder
    Day 1. The autoresponder's welcome email should acknowledge the series:
    "Now that you've got the foundation from [Series Name], let's go deeper."
  if_daily_email_follows: >
    If the subscriber joins the daily email list, the first daily email
    should feel continuous with the series tone — not like a jarring shift
    to a different voice or intensity level.
```
