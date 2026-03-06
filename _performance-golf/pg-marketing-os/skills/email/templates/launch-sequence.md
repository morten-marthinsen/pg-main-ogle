# Launch Sequence Campaign Template

**Version:** 1.0
**Created:** 2026-02-21

---

## Campaign Type Description

The Launch Sequence is a high-intensity product launch campaign spanning 5 days with a 1-day pre-launch warning. Volume escalates from a single anticipation email to 5+ emails on close day, creating a pressure curve that mirrors the psychological arc of a buying decision. The sequence assumes a hard deadline (cart close, enrollment end, price increase) and builds urgency accordingly.

This is the primary revenue-generating campaign format. Every email in the sequence has a specific job. Early emails establish the anchor story and create desire. Middle emails address objections and provide social proof. Late emails compress the decision window until the only remaining question is "am I in or not?"

---

## Campaign Structure

- **Total Emails:** 15+ (12 unique + resends on close day)
- **Duration:** 6 calendar days (Day -1 through Day 5)
- **Volume Escalation:** 1 -> 2 -> 2 -> 2 -> 3 -> 5+
- **Deadline Required:** Yes (hard close at end of Day 5)

---

## Email-by-Email Blueprint

```yaml
launch_sequence:
  day_minus_1:
    label: "Pre-Launch Warning"
    email_count: 1
    emails:
      - position: 1
        body_type: ST
        function: DR
        content_focus: >
          Anticipation builder. Tells a story that frames WHY something is coming
          without revealing WHAT it is. Seeds curiosity. Establishes the problem
          or opportunity that the launch will address. No link to sales page.
          Ends with "tomorrow I'm going to share something..."
        urgency_level: none
        target_length: "400-600 words"
        notes: >
          This email should feel like a normal daily email that happens to
          mention something upcoming. NOT a hype-filled "get ready" email.
          The story carries 90% of the weight.

  day_1:
    label: "The Open"
    email_count: 2
    emails:
      - position: 2
        body_type: ST
        function: PL
        content_focus: >
          The anchor story. This is the origin email — the foundational narrative
          that frames the entire launch. It answers "why does this exist?" and
          "why now?" through story, not argument. Introduces the product/offer
          naturally as the resolution to the story's tension. First link to
          sales page appears here.
        urgency_level: low
        target_length: "600-900 words"
        notes: >
          This email gets referenced in later emails ("remember when I told
          you about..."). It must be memorable. The story must be TRUE and
          specific — dates, places, names. Generic origin stories fail.

      - position: 3
        body_type: QA
        function: PL
        content_focus: >
          Anticipatory objection handling disguised as Q&A. "I've been getting
          emails since this morning asking..." — addresses the 3-4 biggest
          questions/objections before they calcify. Reframes the offer through
          the lens of real questions.
        urgency_level: low
        target_length: "400-600 words"
        notes: >
          Q&A format breaks up the visual monotony after the long story email.
          Questions should be arranged from most common to most skeptical.

  day_2:
    label: "The Reframe"
    email_count: 2
    emails:
      - position: 4
        body_type: CT
        function: PL
        content_focus: >
          Contrarian angle. Challenges the conventional approach to the problem
          the product solves. "Everyone tells you to [common advice]. Here's
          why that's backwards." This email creates intellectual differentiation —
          the reader starts to see the product as the ONLY logical choice given
          this new framing.
        urgency_level: low
        target_length: "500-700 words"
        notes: >
          The contrarian claim must be genuinely surprising AND defensible.
          Weak contrarian takes ("most people don't know...") damage credibility.
          Strong ones create "I never thought of it that way" moments.

      - position: 5
        body_type: QO
        function: PL
        content_focus: >
          Quote-led authority email. Opens with a compelling quote from a
          recognized authority, industry figure, or customer — then unpacks
          why that quote matters in the context of this offer. Borrows
          credibility from the quoted source.
        urgency_level: low
        target_length: "400-600 words"
        notes: >
          Quote must be genuinely relevant, not shoehorned. The analysis of
          the quote should reveal something non-obvious about the product's
          value proposition.

  day_3:
    label: "The Proof"
    email_count: 2
    emails:
      - position: 6
        body_type: TM
        function: PL
        content_focus: >
          Testimonial-led email. Features 1-3 detailed customer results with
          specific outcomes (numbers, timeframes, before/after). NOT a wall
          of short testimonials. Each testimonial gets context: who this person
          is, what they tried before, what changed. The reader should see
          themselves in at least one story.
        urgency_level: medium
        target_length: "500-700 words"
        notes: >
          First mention of deadline can appear naturally here: "These results
          came from the last time we opened this..." implies scarcity without
          screaming it.

      - position: 7
        body_type: LB
        function: PL
        content_focus: >
          List-based value stack. "7 things you get when you join" or
          "5 reasons this works when nothing else has." Each item is a
          mini-argument, not just a feature. Lists are scannable — this email
          catches skimmers who haven't read the long emails.
        urgency_level: medium
        target_length: "400-600 words"
        notes: >
          Bold or number each item clearly. Each list item should be
          benefit-led with a 1-2 sentence proof or example underneath.

  day_4:
    label: "The Squeeze"
    email_count: 3
    emails:
      - position: 8
        body_type: ST
        function: DU
        content_focus: >
          Urgency story. A narrative about what happens when people wait —
          told through a real example. "Last time we opened this, I got an
          email the day AFTER we closed from someone who..." Cost of inaction
          made tangible through story. First explicit deadline mention.
        urgency_level: high
        target_length: "400-600 words"
        notes: >
          This is the pivot point. From here forward, every email carries
          urgency. The story must make procrastination feel genuinely costly,
          not just annoying.

      - position: 9
        body_type: CT
        function: DU
        content_focus: >
          Contrarian urgency. Challenges the "I'll think about it" mindset.
          "The worst thing you can do right now is 'think about it' — here's
          why." Reframes delay as a decision (to stay where you are), not
          as neutral postponement.
        urgency_level: high
        target_length: "400-500 words"
        notes: >
          This email pairs intellectual argument with emotional stakes.
          It should make the reader uncomfortable with inaction.

      - position: 10
        body_type: QA
        function: DU
        content_focus: >
          Final objection sweep. "Before the deadline tomorrow, I want to
          address the 3 things still holding some of you back." Targets the
          hardest objections — price, time, "is this really for me?" — with
          direct, empathetic responses.
        urgency_level: high
        target_length: "400-600 words"
        notes: >
          Tone is empathetic, not pushy. Acknowledge that these are
          legitimate concerns. Then dismantle them with logic and proof.

  day_5_close:
    label: "The Close"
    email_count: "5+ (includes resends)"
    emails:
      - position: 11
        body_type: ST
        function: DU
        content_focus: >
          Morning open. Fresh story — short, punchy, direct. "Today's the
          last day." Stakes are clear. Link is prominent. Story is brief
          and points to what's at stake.
        urgency_level: maximum
        target_length: "300-400 words"
        notes: >
          Sent early morning. Sets the tone for close day.

      - position: 12
        body_type: TM
        function: DU
        content_focus: >
          Midday proof burst. 1-2 fresh testimonials or a screenshot of
          results. Minimal framing. "Just got this email from [name]..."
          Let the proof speak.
        urgency_level: maximum
        target_length: "200-300 words"
        notes: >
          Shorter format. Close-day emails get progressively shorter.
          The decision has been made or hasn't — long arguments won't help.

      - position: 13
        body_type: NR
        function: DU
        content_focus: >
          Negative response / "not for everyone" email. "If you've decided
          this isn't for you, I respect that. But if the only thing stopping
          you is [common excuse], let me be straight with you..." Permission
          to leave paradoxically pulls fence-sitters in.
        urgency_level: maximum
        target_length: "200-300 words"
        notes: >
          The meta-awareness of "I know you're getting a lot of emails today"
          disarms resistance. Honesty IS the strategy.

      - position: 14
        body_type: CT
        function: DU
        content_focus: >
          Resend of Position 4 (Day 2 contrarian) with new subject line to
          non-openers. Same body, fresh subject line targeting a different
          curiosity angle.
        urgency_level: maximum
        target_length: "same as original"
        notes: >
          Resend only to non-openers of original. Subject line must be
          completely different — not a variation, a different angle entirely.

      - position: 15
        body_type: any
        function: DU
        content_focus: >
          Last call. Under 120 words. "This is it. [Link]. Doors close at
          midnight. [1-2 sentences of what they'll miss]. [Link]." No story,
          no argument, no proof. Pure deadline compression.
        urgency_level: maximum
        target_length: "80-120 words"
        notes: >
          Sent 1-2 hours before actual close. Subject line: "Last call"
          or "[Name], this is it" — no cleverness. Blunt and final.

      - position: "15+"
        body_type: any
        function: DU
        content_focus: >
          Optional additional resends to engaged non-buyers (opened but
          didn't click, clicked but didn't buy). Segment-specific. Very
          short. "I noticed you looked at [product] but didn't grab it.
          You have [X hours] left."
        urgency_level: maximum
        target_length: "50-120 words"
        notes: >
          Only if list size and engagement data support micro-segmentation.
          Never send more than 6 total emails on close day.
```

---

## Body Type Variety Rules

- No same body type in consecutive emails (except close day, where rules relax)
- ST (Story) appears at least 3 times across the sequence — it carries the emotional weight
- CT (Contrarian) appears exactly 2 times — overuse dilutes intellectual impact
- TM (Testimonial) appears exactly 2 times — once in proof phase, once on close day
- QA appears exactly 2 times — once early (anticipatory), once late (objection sweep)
- LB appears exactly 1 time — it's a structural palate cleanser
- NR appears exactly 1 time — on close day only
- QO appears exactly 1 time — borrowed authority, used once for maximum effect

---

## Emotional Arc

```
Day -1:  Curiosity ............ (0% urgency)
Day 1:   Desire + Hope ........ (5% urgency)
Day 2:   Intellectual buy-in ... (10% urgency)
Day 3:   Social proof ......... (25% urgency)
Day 4:   Fear of missing out ... (60% urgency)
Day 5:   Now or never ......... (100% urgency)
```

The arc mirrors the stages of a buying decision: awareness -> interest -> desire -> anxiety -> action. Early emails create pull (desire). Late emails create push (deadline pressure). The transition point is Day 4, Position 8 — the "urgency story" that makes the shift feel earned rather than manufactured.

---

## CTA Escalation Pattern

| Day | CTA Style | Example |
|-----|-----------|---------|
| -1 | No CTA (anticipation only) | "More tomorrow..." |
| 1 | Soft invitation | "Check it out here [link]" |
| 2 | Benefit-framed | "See why this changes everything [link]" |
| 3 | Social proof-framed | "Join [X] people who already [result] [link]" |
| 4 | Urgency-framed | "Get in before [deadline] [link]" |
| 5 (early) | Direct command | "Grab your spot now [link]" |
| 5 (late) | Final deadline | "[Link]. Midnight tonight. That's it." |

- Links appear 1-2 times in early emails, 2-3 times in middle emails, 3+ times on close day
- Close-day emails lead with the link (above the fold) AND end with the link
- Never bury the link below a wall of text on Day 4+

---

## Subject Line Strategy

- **Day -1:** Curiosity/tease — "Something's been on my mind" / "Quick heads up"
- **Day 1, Email 1:** Story hook — "The day everything changed" / "[Specific detail from story]"
- **Day 1, Email 2:** Question format — "Got questions? I've got answers"
- **Day 2:** Intellectual hooks — "Why [common advice] is wrong" / "[Authority] said it best"
- **Day 3:** Proof hooks — "[Name] went from [before] to [after]" / "7 reasons this works"
- **Day 4:** Urgency + substance — "Tomorrow it's gone (+ why waiting costs more)" / "The 3 things still holding you back"
- **Day 5:** Blunt deadline — "Last day" / "Closing tonight" / "This is it, [Name]"

**Rules:**
- Never use ALL CAPS in subject lines (except close day, sparingly)
- First name personalization on Day 4+ only — overuse numbs the effect
- Close-day subjects are SHORT (under 5 words)
- Never use fake urgency language before Day 4
- Subject lines for resends must be completely different angles, not variations
