# Autoresponder Series Campaign Template

**Version:** 1.0
**Created:** 2026-02-21

---

## Campaign Type Description

The Autoresponder Series is a 21-email evergreen sequence triggered by opt-in. It runs daily for 3 weeks and serves as the foundational trust-building infrastructure for any list. Unlike launch sequences, this campaign has no external deadline, no time-specific references, and no urgency mechanics. Its job is singular: transform a cold subscriber into someone who opens every email, trusts the sender's perspective, and is pre-sold on the worldview behind the product before they ever see a pitch.

The architecture follows a 3-phase emotional arc: Phase 1 (Days 1-7) is heavy content that establishes expertise and earns the right to be heard. Phase 2 (Days 8-14) blends content with product education, letting the reader see how the product fits into the worldview they've been absorbing. Phase 3 (Days 15-21) shifts to soft-sell mode where the reader has enough context to make a decision without pressure.

Every 7th email is a "blatant pitch" meta-email — it breaks the pattern, openly acknowledges the commercial relationship, and pitches directly. This paradoxical transparency increases trust rather than eroding it.

---

## Campaign Structure

- **Total Emails:** 21
- **Duration:** 21 days (1 email per day)
- **Urgency:** None. Zero deadline language. Zero scarcity mechanics.
- **Evergreen Requirement:** No dates, no "this week," no seasonal references, no current event hooks. Every email must read identically whether received today or 18 months from now.
- **Trigger:** Opt-in event (lead magnet download, webinar registration, purchase, etc.)

---

## Email-by-Email Blueprint

```yaml
autoresponder_series:

  # === PHASE 1: CONTENT DOMINANCE (Days 1-7) ===
  # Job: Establish expertise. Earn the right to be heard. Create "who IS this person?" moments.
  # Pitch density: 0% (except Day 7 blatant pitch)

  phase_1:
    label: "Content Dominance"
    days: "1-7"
    pitch_density: "0% content, 100% relationship (except Day 7)"

    emails:
      - position: 1
        day: 1
        body_type: ST
        function: AR
        content_focus: >
          Welcome + origin story. Who you are, why you started this, what
          happened that made you obsessed with this topic. This is NOT a
          bio — it's the moment of transformation that gives you the right
          to teach. Sets the tone for the entire sequence. Ends with a
          preview of what they'll learn over the next 3 weeks.
        urgency_level: none
        target_length: "500-700 words"
        notes: >
          Deliver any promised lead magnet in the first 2 lines, THEN tell
          the story. Don't make them scroll past 500 words to get what they
          opted in for.

      - position: 2
        day: 2
        body_type: CT
        function: AR
        content_focus: >
          First contrarian teaching. Challenge the #1 assumption new
          subscribers likely hold about the topic. "Most people think
          [common belief]. Here's what I've found after [experience]."
          Pure education — no product mention. Establish intellectual
          authority through a genuinely surprising insight.
        urgency_level: none
        target_length: "400-600 words"
        notes: >
          This email determines whether the subscriber decides to keep
          reading. It must deliver a genuine "I never thought of it that
          way" moment. Weak contrarian takes lose people here.

      - position: 3
        day: 3
        body_type: LB
        function: AR
        content_focus: >
          Actionable list. "5 things you can do today to [result]" or
          "The 7 mistakes I see every [audience type] make." Each item
          is genuinely useful — the reader could implement these without
          buying anything. Generosity earns trust.
        urgency_level: none
        target_length: "500-700 words"
        notes: >
          Lists break up the visual density of story/contrarian emails.
          Each item needs 2-3 sentences of context, not just a bullet point.

      - position: 4
        day: 4
        body_type: QO
        function: AR
        content_focus: >
          Authority quote + deeper teaching. Open with a quote from a
          recognized figure in the field, then use it as a springboard to
          teach a concept the subscriber needs. Shows that your worldview
          aligns with respected thinkers.
        urgency_level: none
        target_length: "400-500 words"
        notes: >
          Quote must be from someone the target audience actually respects.
          If in doubt, use a surprising quote from an unexpected source
          rather than an obvious one from an expected source.

      - position: 5
        day: 5
        body_type: ST
        function: AR
        content_focus: >
          Client/customer story (anonymized if needed). A narrative about
          someone who was in the same situation as the subscriber and what
          changed for them. NOT a testimonial — a story with tension,
          struggle, and resolution. The product can be the mechanism of
          change but should not be the focus.
        urgency_level: none
        target_length: "500-700 words"
        notes: >
          The subscriber should see themselves in this story. Match the
          demographics, situation, and emotional state of your core audience
          as closely as possible.

      - position: 6
        day: 6
        body_type: QA
        function: AR
        content_focus: >
          FAQ teaching email. "I get asked [question] all the time. Here's
          what most people miss..." Takes a common question and gives a
          thorough, generous answer. Positions you as the person who gives
          away what others charge for.
        urgency_level: none
        target_length: "400-600 words"
        notes: >
          The question should be one that naturally leads toward
          understanding why the product exists — but don't force the
          connection. Let the reader make it themselves.

      - position: 7
        day: 7
        body_type: BP_META
        function: BP
        content_focus: >
          BLATANT PITCH #1. Meta-awareness opening: "For the last 6 days
          I've been sending you [content]. Today I'm going to do something
          different — I'm going to pitch you." Then pitch the core product
          directly, honestly, without shame. Explain what it is, who it's
          for, what it costs, and why you believe in it.
        urgency_level: none
        target_length: "400-600 words"
        notes: >
          The meta-awareness IS the strategy. By naming what you're doing,
          you disarm resistance. No fake urgency. No limited-time anything.
          Just: "Here's what I sell. Here's why it's good. If you want it,
          here's the link. If not, more great content tomorrow."

  # === PHASE 2: CONTENT + PRODUCT EDUCATION (Days 8-14) ===
  # Job: Bridge content worldview to product. Reader begins to see product as natural extension.
  # Pitch density: ~20% (product woven into educational content)

  phase_2:
    label: "Content + Product Education"
    days: "8-14"
    pitch_density: "80% content, 20% product education"

    emails:
      - position: 8
        day: 8
        body_type: CT
        function: AR
        content_focus: >
          Contrarian teaching #2. Deeper cut than Day 2. Challenges a
          more entrenched belief. Now that trust is established, you can
          push harder on assumptions. This naturally introduces the
          product's mechanism as the logical alternative.
        urgency_level: none
        target_length: "500-700 words"
        notes: >
          First email where the product's approach is mentioned as part
          of the educational argument. Not pitched — referenced. "This is
          exactly why we built [product] the way we did..."

      - position: 9
        day: 9
        body_type: TM
        function: AR
        content_focus: >
          Featured testimonial with teaching wrapper. Open with a customer
          result, then extract the LESSON from that result. "What [name]
          figured out that most people miss is..." The testimonial serves
          the teaching, not the other way around.
        urgency_level: none
        target_length: "400-600 words"
        notes: >
          This is the first time the reader sees concrete results from the
          product. Frame it as evidence for the worldview, not as a sales
          proof point.

      - position: 10
        day: 10
        body_type: ST
        function: AR
        content_focus: >
          Behind-the-scenes story. How the product was developed, what
          problems were solved during creation, what was tried and failed.
          Vulnerability + expertise. Shows the depth of thinking behind
          the product without making it a feature list.
        urgency_level: none
        target_length: "500-700 words"
        notes: >
          R&D stories, formulation stories, "we tested 47 versions" stories.
          The reader should think "they really thought this through."

      - position: 11
        day: 11
        body_type: LB
        function: AR
        content_focus: >
          "What's inside" educational list. Walks through 5-7 components
          or features of the product, but each one is framed as a teaching
          moment. "Component 3: [Name] — Most people don't realize that
          [insight]..." Education first, feature second.
        urgency_level: none
        target_length: "500-700 words"
        notes: >
          This email is the most product-forward of the non-pitch emails.
          Keep the teaching ratio high. Each item should deliver value
          even to someone who never buys.

      - position: 12
        day: 12
        body_type: QO
        function: AR
        content_focus: >
          Expert/authority quote that validates the product's approach.
          "When [authority] said [quote], they were describing exactly
          what [product] does." Borrowed credibility applied specifically
          to the product's mechanism or philosophy.
        urgency_level: none
        target_length: "400-500 words"
        notes: >
          The quote should come from outside the company. Industry expert,
          researcher, respected practitioner. Adds third-party validation
          without being a testimonial.

      - position: 13
        day: 13
        body_type: QA
        function: AR
        content_focus: >
          Product-specific Q&A. "People ask me: 'Is [product] right for
          someone in my situation?' Here's how I think about it..."
          Addresses qualification questions honestly. Tells some people
          it might NOT be right for them — which makes the "yes" more
          credible for the people it IS right for.
        urgency_level: none
        target_length: "400-600 words"
        notes: >
          Disqualifying some readers is powerful. "If you're [situation],
          honestly this probably isn't the best fit. But if you're
          [situation], this was built specifically for you."

      - position: 14
        day: 14
        body_type: BP_META
        function: BP
        content_focus: >
          BLATANT PITCH #2. "Two weeks ago I started sending you daily
          emails. Last week I pitched you for the first time. Today I'm
          doing it again." Recap of what they've learned over 2 weeks,
          then direct pitch. Can include a soft incentive (bonus, extended
          guarantee) but NO deadline.
        urgency_level: none
        target_length: "500-700 words"
        notes: >
          Longer pitch than Day 7 because you have more credibility to
          spend. Can be more detailed about the offer. Still no urgency.
          "Whenever you're ready" energy.

  # === PHASE 3: SOFT SELL (Days 15-21) ===
  # Job: Decision facilitation. Reader has all the information. Help them decide.
  # Pitch density: ~40% (product naturally woven into every email)

  phase_3:
    label: "Soft Sell"
    days: "15-21"
    pitch_density: "60% content, 40% product integration"

    emails:
      - position: 15
        day: 15
        body_type: NR
        function: AR
        content_focus: >
          Negative response / "it's okay to say no" email. "I've been
          emailing you for 2 weeks. If this isn't for you, I genuinely
          understand. Here's what I'd suggest instead..." Offers alternative
          resources (free ones). Paradoxically, giving permission to leave
          pulls fence-sitters closer.
        urgency_level: none
        target_length: "300-400 words"
        notes: >
          This email often gets the highest conversion rate of any non-pitch
          email. The honesty is disarming. Keep it short and genuine.

      - position: 16
        day: 16
        body_type: ST
        function: AR
        content_focus: >
          "The person who almost didn't" story. A customer who was skeptical,
          almost didn't buy, and is glad they did. Speaks to the subscriber's
          current emotional state (they've been reading for 16 days and
          haven't bought yet — that IS the person in this story).
        urgency_level: none
        target_length: "400-600 words"
        notes: >
          The story must feel authentic, not engineered. The skepticism
          in the story should mirror real objections the subscriber likely has.

      - position: 17
        day: 17
        body_type: CT
        function: AR
        content_focus: >
          Final contrarian teaching. The deepest, most challenging idea
          in the sequence. By Day 17, only engaged readers remain. Reward
          them with your best thinking. This naturally positions the product
          as the implementation vehicle for this advanced insight.
        urgency_level: none
        target_length: "500-700 words"
        notes: >
          This email can reference previous emails: "Remember on Day 2
          when I told you [insight]? There's a deeper layer..."
          Continuity rewards loyal readers.

      - position: 18
        day: 18
        body_type: TM
        function: AR
        content_focus: >
          Multi-testimonial compilation. 3-5 short testimonials with a
          unifying theme. "I've been sharing individual stories. Today I
          want to show you the pattern." The pattern IS the product's
          core promise, demonstrated through multiple independent sources.
        urgency_level: none
        target_length: "400-600 words"
        notes: >
          Diverse testimonials (different demographics, different starting
          points, same positive outcome) are more persuasive than multiple
          testimonials from similar people.

      - position: 19
        day: 19
        body_type: LB
        function: AR
        content_focus: >
          "Everything you've learned" recap list. Synthesizes the key
          insights from the entire 19-day sequence. Each item links back
          to a specific email. Functions as both a content summary and a
          demonstration of how much value has been delivered for free.
        urgency_level: none
        target_length: "500-700 words"
        notes: >
          The implicit argument: "If the free emails were this valuable,
          imagine what the paid product delivers." Never make this argument
          explicitly — let the reader arrive there.

      - position: 20
        day: 20
        body_type: QA
        function: AR
        content_focus: >
          Final objection handling. Addresses the 2-3 deepest objections
          that only surface after extended consideration. Price objection,
          "will it work for ME" objection, timing objection. Empathetic,
          thorough, honest. Includes the guarantee as a risk-reversal.
        urgency_level: none
        target_length: "400-600 words"
        notes: >
          Tone is peer-to-peer, not salesperson-to-prospect. "Here's how
          I'd think about this decision if I were in your position..."

      - position: 21
        day: 21
        body_type: BP_META
        function: BP
        content_focus: >
          BLATANT PITCH #3 — the closer. "For 3 weeks I've been showing
          up in your inbox. Today's the last email in this series." Full
          pitch with offer recap, guarantee, and clear CTA. Transition
          message: after today, they move to the regular email list
          (daily/weekly). The relationship continues regardless.
        urgency_level: none
        target_length: "600-800 words"
        notes: >
          This is the longest pitch email because it's the last structured
          opportunity. Still NO deadline. The "last email in this series"
          creates soft natural urgency without manufactured scarcity.
          End with warmth: "Either way, I'm glad you've been here."
```

---

## Body Type Variety Rules

- ST (Story) appears 4 times — backbone of the emotional connection
- CT (Contrarian) appears 3 times — one per phase, escalating in depth
- LB (List-Based) appears 3 times — structural variety, scannable
- QA (Q&A) appears 3 times — one per phase, evolving from general to product-specific to objection-focused
- QO (Quote-Opener) appears 2 times — borrowed authority, used sparingly
- TM (Testimonial) appears 2 times — proof without pressure
- NR (Negative Response) appears 1 time — Phase 3 only, permission to leave
- BP_META appears 3 times — every 7th email, transparent pitch
- No same body type in consecutive emails
- No body type appears more than twice in any 7-email phase (except ST which gets 2 in Phase 1)

---

## Emotional Arc

```
Phase 1 (Days 1-7):   Generosity -> Surprise -> Trust
Phase 2 (Days 8-14):  Understanding -> Connection -> Consideration
Phase 3 (Days 15-21): Permission -> Clarity -> Decision
```

The arc is NOT desire -> urgency -> action (that's for launches). The autoresponder arc is ignorance -> education -> trust -> decision-readiness. The reader should arrive at Day 21 feeling INFORMED, not pressured. The best outcome is a subscriber who buys because they understand, not because they're afraid of missing out.

---

## CTA Escalation Pattern

| Phase | CTA Style | Example |
|-------|-----------|---------|
| Phase 1 (Days 1-6) | No CTA (pure content) | N/A |
| Day 7 (Blatant Pitch) | Transparent direct pitch | "Here's the link if you're interested: [link]" |
| Phase 2 (Days 8-13) | Contextual mention | "This is what [product] was built for — [link] if you're curious" |
| Day 14 (Blatant Pitch) | Direct pitch with recap | "Ready to get started? [link]" |
| Phase 3 (Days 15-20) | Soft embedded | "You can learn more about it here: [link]" |
| Day 21 (Final Pitch) | Clear, warm close | "If you're ready, start here: [link]. If not, I'll see you tomorrow." |

- Phase 1 emails have ZERO links to sales pages (except Day 7)
- Phase 2 emails have 1 link maximum, always contextual, never the focus
- Phase 3 emails have 1-2 links, naturally placed
- Blatant Pitch emails have 2-3 links (top, middle, bottom)

---

## Subject Line Strategy

- **Phase 1:** Pure curiosity/value hooks — "The [topic] mistake I see every day" / "5 things I wish someone told me about [topic]"
- **Phase 2:** Deeper intrigue — "Why [product] works the way it does" / "A question I get asked every week"
- **Phase 3:** Relationship-forward — "Can I be honest with you?" / "What 3 weeks of emails taught me about you"
- **Blatant Pitch days:** Transparent — "I'm going to pitch you today" / "The email where I sell you something"

**Rules:**
- Never use urgency language (limited, last chance, hurry, etc.)
- Never reference specific dates, seasons, or current events
- Subject lines should work identically 6 months from now
- First name personalization used sparingly (Days 1, 15, 21 only)
- No ALL CAPS ever in autoresponder subjects
