# Daily Relationship Email Template

**Version:** 1.0
**Created:** 2026-02-21

---

## Campaign Type Description

The Daily Relationship template is not a fixed sequence. It is a set of rules, rotation patterns, and structural constraints for producing one email per day, every day, indefinitely. This is the backbone of a mature email operation — the ongoing conversation between sender and list that makes every other campaign type (launches, promotions, autoresponders) work better.

The daily email builds cumulative trust. Each individual email is a small deposit. Over weeks and months, these deposits compound into a relationship where the subscriber opens every email out of genuine interest rather than curiosity about a subject line. The daily email is how you become someone's "must-read" — the sender they'd actually miss if they stopped showing up.

The default function is DR (Daily Relationship). Once per month, the last day of the month shifts to DU (Deadline Urgency) for a monthly promotional push. The rest of the time, the goal is to be genuinely interesting, useful, and human.

---

## Campaign Structure

- **Total Emails:** Ongoing (no end date)
- **Frequency:** 1 email per day, 7 days per week
- **Default Function:** DR (Daily Relationship)
- **Monthly Exception:** Last day of each month = DU (Deadline Urgency), one promotional push
- **Content-to-Pitch Ratio:** 80/20 minimum (4 content emails for every 1 that pitches)

---

## Body Type Rotation Rules

```yaml
rotation_rules:

  hard_constraints:
    - "Never use the same body type two days in a row"
    - "Every body type must appear at least once per 10-day window"
    - "ST (Story) must appear minimum 2x per week — it carries the relationship"
    - "CT (Contrarian) maximum 2x per week — overuse creates combative tone"
    - "TM (Testimonial) maximum 1x per week — overuse feels like selling"
    - "NR (Negative Response) maximum 1x per month — overuse becomes a schtick"
    - "LB (List-Based) minimum 1x per week — subscribers need scannable emails"
    - "QO (Quote-Opener) minimum 1x per week — borrowed authority keeps content fresh"
    - "QA (Q&A) minimum 1x per week — reader questions drive engagement"

  recommended_weekly_mix:
    ST: "2-3 per week"
    CT: "1-2 per week"
    LB: "1-2 per week"
    QO: "1 per week"
    QA: "1 per week"
    TM: "0-1 per week"
    NR: "0-1 per month"

  content_pitch_ratio:
    minimum: "80% content / 20% pitch"
    enforcement: >
      In any rolling 5-email window, at least 4 must be pure content
      (no product link, no pitch, no CTA beyond "reply to this email").
      The 5th MAY contain a product mention, soft pitch, or CTA.
    monthly_exception: >
      Last day of month is a dedicated promotional email (DU function).
      This does not count against the 80/20 ratio — it's a known,
      expected monthly event.
```

---

## Weekly Pattern Templates

```yaml
weekly_patterns:

  monday:
    label: "Monday Energy"
    body_type: "ST or CT (alternate weeks)"
    function: DR
    content_focus: >
      High-energy start to the week. Story about a weekend realization,
      a Monday morning insight, or a contrarian take on something everyone's
      talking about. The energy should be forward-looking — "this week"
      framing. Sets the tone for the week's emails.
    tone: "Energized, purposeful, forward-looking"
    target_length: "400-600 words"
    notes: >
      Monday emails get lower open rates (inbox clutter from weekend).
      Subject line must be especially compelling. Lead with the most
      interesting sentence in the entire email.

  tuesday:
    label: "Teaching Tuesday"
    body_type: "LB or QA"
    function: DR
    content_focus: >
      Educational content. Teach something actionable. Lists and Q&As
      work well here because Tuesday readers are in "work mode" and
      appreciate structured, scannable content they can apply immediately.
    tone: "Practical, generous, knowledgeable"
    target_length: "400-700 words"
    notes: >
      Tuesday-Thursday are peak engagement days. Use them for your
      strongest content, not pitches.

  wednesday:
    label: "Midweek Depth"
    body_type: "ST or QO"
    function: DR
    content_focus: >
      Midweek deep dive. A longer story with a meaningful lesson, or a
      quote that opens into a substantial teaching. Wednesday readers are
      settled into their week and have mental bandwidth for longer reads.
    tone: "Thoughtful, nuanced, insightful"
    target_length: "500-800 words"
    notes: >
      This is your "best writing" day. The email you'd be proud to have
      someone read as their first encounter with you. Save your best
      material for Wednesday.

  thursday:
    label: "Proof / Authority Thursday"
    body_type: "TM or QO or CT"
    function: DR
    content_focus: >
      Social proof or authority-building content. Customer story,
      industry quote with analysis, or a contrarian take backed by data.
      Builds credibility heading into the weekend (when people have
      time to think about purchases).
    tone: "Confident, credible, evidence-based"
    target_length: "400-600 words"
    notes: >
      If this week's Thursday email is the designated 20% pitch email,
      TM body type works best — the testimonial IS the pitch.

  friday:
    label: "Friday Fun"
    body_type: "ST or NR (monthly)"
    function: DR
    content_focus: >
      Lighter, more personal content. A funny observation, a personal
      story that isn't directly "on topic," a confession, a behind-the-scenes
      moment. Friday readers are in wind-down mode. Meet them there.
      The relationship deepens when you show the human behind the expertise.
    tone: "Relaxed, personal, entertaining, human"
    target_length: "300-500 words"
    notes: >
      Friday emails can be shorter. The personality-to-content ratio
      shifts toward personality. This is where "voice" is built most
      effectively.

  saturday:
    label: "Weekend Lighter (Optional Send)"
    body_type: "QO or LB"
    function: DR
    content_focus: >
      Lighter weekend content. A quote that resonated this week with brief
      commentary, or a short list of resources/recommendations. Weekend
      emails should feel like a gift, not an obligation. Some operators
      skip Saturday entirely — that's valid.
    tone: "Casual, brief, generous"
    target_length: "200-400 words"
    notes: >
      If you send 7 days a week, Saturday and Sunday must be noticeably
      shorter and lighter. If engagement data shows weekend drops, reduce
      to 5-day (Mon-Fri) schedule.

  sunday:
    label: "Weekend Lighter (Optional Send)"
    body_type: "ST (personal / reflective)"
    function: DR
    content_focus: >
      Reflective personal story. Something from the weekend. A lesson
      from an unexpected source. A moment of vulnerability or insight.
      Sunday emails are relationship-builders, not content-delivery
      vehicles. The subscriber should feel like they know you as a person.
    tone: "Reflective, personal, warm"
    target_length: "200-400 words"
    notes: >
      Sunday emails often get the highest REPLY rates (people have time).
      End with a question to encourage replies: "Has that ever happened
      to you?" / "What do you think?"
```

---

## Monthly Deadline Urgency (DU) Email

```yaml
monthly_promotional:
  trigger: "Last calendar day of each month"
  function: DU
  body_type: "Any (typically CT or ST with product integration)"
  content_focus: >
    Monthly promotional push. Can be: (1) a special offer expiring at
    midnight, (2) a price increase taking effect tomorrow, (3) a bonus
    being removed, (4) a seasonal tie-in. The deadline must be REAL.
    Never manufacture fake monthly deadlines.
  urgency_level: medium
  target_length: "400-600 words"
  notes: >
    This is the only recurring urgency email. Subscribers learn to expect
    it. Some will wait for it specifically. Make it worth waiting for.
    The offer should be genuinely better than the standard offer available
    any other day.

  structure:
    - "Story or contrarian opening (60% of email)"
    - "Transition to offer (natural bridge, not abrupt pivot)"
    - "Offer details + deadline (clear, specific)"
    - "CTA with link (2-3 placements)"
    - "PS with guarantee or bonus reminder"
```

---

## Content Sourcing Framework

```yaml
content_sources:
  primary:
    - "Personal experiences and observations"
    - "Client/customer stories (anonymized as needed)"
    - "Books, articles, podcasts consumed that week"
    - "Industry news and trends (with original analysis)"
    - "Reader questions and replies (with permission)"

  secondary:
    - "Historical examples and case studies"
    - "Contrarian takes on popular advice"
    - "Behind-the-scenes business/product updates"
    - "Mistakes made and lessons learned"
    - "Recommendations (books, tools, people)"

  avoid:
    - "Rewriting other people's content without attribution"
    - "Generic motivational content without specific insight"
    - "Pure news recaps without original analysis"
    - "Content that requires context from a specific previous email (new subscribers join daily)"
    - "Anything that would read as filler — if you don't have something worth saying, write a short email, not a padded one"
```

---

## Emotional Arc (Rolling)

Unlike fixed sequences, the daily email doesn't have a predetermined emotional arc. Instead, it follows emotional variety rules:

```
- Never send 3 "heavy" emails in a row (intensity fatigue)
- Never send 3 "light" emails in a row (engagement drop)
- After a controversial/contrarian email, follow with something warm or funny
- After a pitch/promotional email, follow with pure-value content (2 days minimum)
- After a personal/vulnerable email, follow with something authoritative
- The weekly pattern template above naturally enforces this variety
```

---

## CTA Pattern

| Email Type | CTA Approach |
|------------|-------------|
| Pure content (80%) | No CTA or "Reply and tell me..." only |
| Soft pitch (15%) | Single contextual link: "this is what [product] does — [link] if curious" |
| Monthly DU (5%) | Full CTA: multiple links, deadline, clear action |

- Never use "click here" — always describe what happens after the click
- Reply CTAs build engagement metrics AND generate content (reader questions become future emails)
- Limit product links to 1 per email maximum in non-DU emails
- Monthly DU emails can have 2-3 links (top, mid, bottom)

---

## Subject Line Strategy

```yaml
subject_line_rules:
  length: "3-8 words preferred. Under 50 characters."
  personalization: "First name maximum 2x per week"
  patterns:
    high_performing:
      - "Specific curiosity: 'The 22-cent fix' / 'What I found in the data'"
      - "Incomplete thought: 'So about yesterday...' / 'I was wrong about...'"
      - "Direct address: '[Name], quick thought' / 'A question for you'"
      - "Story tease: 'The barista said something...' / 'My worst day ever'"
    avoid:
      - "ALL CAPS (ever)"
      - "Clickbait that the email doesn't deliver on"
      - "Urgency language in non-DU emails (last chance, hurry, etc.)"
      - "Emojis (test extensively before using — they can tank deliverability)"
      - "Numbers in every subject line (pattern fatigue)"
    variety: >
      Track subject line patterns weekly. If 3+ subject lines in a row
      follow the same pattern (all questions, all curiosity gaps, all
      direct address), consciously break the pattern.
```

---

## Performance Monitoring

```yaml
health_metrics:
  open_rate:
    healthy: ">25%"
    warning: "20-25%"
    critical: "<20%"
    action: "Review subject lines, check deliverability, assess list hygiene"

  reply_rate:
    healthy: ">1% of opens"
    warning: "0.5-1% of opens"
    critical: "<0.5% of opens"
    action: "Add more reply prompts, increase personal content, ask direct questions"

  unsubscribe_rate:
    healthy: "<0.1% per email"
    warning: "0.1-0.3% per email"
    critical: ">0.3% per email"
    action: "Review pitch frequency, content quality, send frequency"

  click_rate_on_pitch_emails:
    healthy: ">3% of opens"
    warning: "1-3% of opens"
    critical: "<1% of opens"
    action: "Review offer-to-audience alignment, CTA clarity, pitch integration"
```
