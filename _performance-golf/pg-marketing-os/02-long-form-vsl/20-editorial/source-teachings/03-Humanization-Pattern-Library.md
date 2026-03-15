# Humanization Pattern Library

**Version:** 1.0
**Created:** 2026-03-14
**Source:** Human edit extraction — HTKT Transformation Academy v5 → v6 (108 edits cataloged)
**Editor:** Anthony Flores
**Purpose:** Detect and eliminate structural AI patterns that survive word-level anti-slop passes. These patterns operate at the sentence, paragraph, and section level — not the word level. They are invisible to the existing 4.3 Anti-Slop Final Pass and represent the next layer of humanization enforcement.
**Authority:** Supplementary teaching for Skill 20 (Editorial). Load via 0.3-teachings-loader alongside Master Reference Document.

---

## WHY THIS DOCUMENT EXISTS

The existing anti-slop system catches **word-level** AI tells: "unlock," "harness," "revolutionary," "dive deep." It works. But after a full editorial pass — including Arena competition, six expert lenses, and anti-slop final pass — the Transformation Academy v5 script still sounded AI-generated to experienced human reviewers.

The problem was not in the words. It was in the **structures.** Sentence construction patterns, rhythmic habits, emotional pacing choices, and transition behaviors that are invisible at the word level but immediately recognizable to a human ear reading aloud.

This document codifies the 12 structural AI anti-patterns extracted from 108 human edits. Each pattern includes detection criteria, before/after examples from the actual edit, a codified rule, and severity ratings.

**Key principle:** The anti-slop lexicon catches what AI *says.* This library catches how AI *builds sentences and paragraphs.*

---

## HOW TO USE THIS DOCUMENT

### For the Editorial Skill (Skill 20)

**Layer 0 (Loading):** The 0.3-teachings-loader should load this document alongside the Master Reference Document. The 12 patterns become active criteria for all subsequent layers.

**Layer 1 (Blind Read):** During the first-read capture (1.1), flag any section that triggers 2+ patterns from this library. Mark for structural revision, not just word-level polish.

**Layer 2 (Multi-Expert Critique):** Each expert lens should evaluate against these patterns in addition to their primary criteria:
- **Makepeace lens:** Patterns 1 (overloaded sentences), 3 (over-explaining after punchlines), 5 (missing causal connectors)
- **Halbert lens:** Patterns 6 (sanitized language), 7 (vague referents), 8 (speaker emotion over audience emotion)
- **Schwartz lens:** Pattern 12 (register/metaphor mixing)
- **All lenses:** Pattern 2 (tricolon), Pattern 4 (missing emphasis markers), Pattern 9 (redundant re-teaching)

**Layer 2.5 (Arena):** Add "Structural Humanization" as an 8th judging criterion (weight: 10%, sourced from Slop Elimination's current 10% — split to 5%/5%). Minimum threshold: 7.0. Any revision package scoring below 7.0 on structural humanization is disqualified.

**Layer 4 (Fix Application):** After 4.3 Anti-Slop Final Pass handles word-level slop, apply a structural humanization pass using the 12 patterns below. This is a **separate cognitive operation** — do not combine it with word-level detection.

---

## THE 12 STRUCTURAL AI ANTI-PATTERNS

---

### PATTERN 1: OVERLOADED COMPOUND SENTENCES

**Severity:** CRITICAL
**Frequency in source edit:** 14 instances (most common pattern)
**Detection difficulty:** Easy — look for sentences with 2+ em-dashes, 2+ comma-separated clauses, or 30+ words

**Description:**
AI consistently crams 2-3 distinct ideas into a single sentence using em-dash appositives, subordinate clauses, and comma chains. Each idea deserves its own sentence or paragraph. In spoken copy (VSL), compound sentences create listener fatigue because the audience cannot rewind.

**Detection Criteria:**
- Sentence contains 2+ em-dash parentheticals
- Sentence contains 3+ comma-separated independent clauses
- Sentence exceeds 30 words AND contains a logical pivot (but, however, so, which means)
- A single sentence spans what should be 2 emotional beats (setup + payoff, problem + solution, claim + evidence)

**Before/After Examples:**

*Example 1:*
> **V5:** "a brand new process I've been developing -- a process built around over $500,000 in AI swing analysis technology and a method for identifying and fixing a golfer's single root swing flaw."
>
> **V6:** "a brand new process I'd been developing." [paragraph break] "This process was built around a new $500,000 AI swing analysis technology, combined with a coaching method for identifying and fixing a golfer's single root swing flaw."

*Example 2:*
> **V5:** "come through elite Performance Golf VIP Academies, have the best two to three days of their golf lives, and while many kept their gains because our process is so deep... a meaningful percentage of students would fall right back to square one."
>
> **V6:** "come through elite Performance Golf VIP Academies and finish on cloud nine, because they'd just had THE best two to three days of their golf lives." [paragraph break] "And sure, many kept their gains because our process is so deep... a meaningful percentage of our students would fall right back to square one."

*Example 3:*
> **V5:** "I invested over $500,000 of R&D capital into pioneering Swingfix AI -- a revolutionary system that analyzes golfers' swings with a level of precision that didn't exist before -- so we could isolate every variable in our transformation model."
>
> **V6:** "I invested over $500,000 of R&D capital into pioneering Swingfix AI -- a revolutionary system that analyzes golfers' swings with a level of precision that didn't exist before." [paragraph break] "All so we could isolate EVERY variable in our transformation model."

**Codified Rule:**
If a sentence contains more than one emotional beat, conceptual shift, or logical step — split it. Each idea should breathe. Especially in spoken copy, one thought per sentence. One beat per paragraph. The listener cannot rewind.

**Replacement Strategy:**
1. Identify the logical pivot point in the sentence (the word where the idea shifts)
2. Split at that point
3. Give the second idea its own paragraph if it deserves its own beat
4. Add a spoken connector ("And," "Because," "So") to the second sentence if it needs flow

---

### PATTERN 2: TRICOLON OVER-SIGNPOSTING ("Not X. Not Y. Z.")

**Severity:** CRITICAL
**Frequency in source edit:** 7 instances
**Detection difficulty:** Medium — appears in different surface forms but always has the same underlying structure

**Description:**
AI defaults to a three-beat parallel structure to create emphasis: "Not X. Not Y. Z." or "It's not A. It's not B. It's not C." This is the single most recognizable AI rhythm in the document. It appears in seven different forms and was killed by the human editor every time. The pattern broadcasts "I am being deliberately rhetorical," which breaks trust in conversational copy.

**Detection Criteria:**
- Three consecutive short sentences or fragments with parallel grammatical structure
- Sentences beginning with "Not" followed by a contrasting positive
- Four-part "It's not a X problem" lists
- Any three-beat negation-then-resolution structure
- Echo repetition of the same word/number for emphasis ("Seventy percent.")

**Before/After Examples:**

*Example 1 — Classic tricolon:*
> **V5:** "Not temporarily. Not for a 'hot' week. Permanently."
>
> **V6:** "And the results were PERMANENT."

*Example 2 — Four-beat parallel:*
> **V5:** "It's not a talent problem. It's not an age problem. It's not a discipline problem. And it is definitely not a you problem."
>
> **V6:** "Contrary to popular belief, it's not lack of talent, age or even discipline causing this problem."

*Example 3 — Negation tricolon:*
> **V5:** "Not a guess. Not a theory. A precise identification backed by years of accumulated data and technical analytics."
>
> **V6:** Replaced entirely with a Phase 1/Phase 2 continuity bridge.

*Example 4 — Echo repetition:*
> **V5:** "He said 70% of golfers don't improve with traditional instruction. Seventy percent."
>
> **V6:** "He said 70% of golfers don't improve with traditional instruction." [paragraph break] "Yes, that's nearly 3 out of every 4 golfers seeing no real change to their game."

**Codified Rule:**
Never use the "Not X. Not Y. Z." tricolon more than once per piece — and even that one usage should be earned, not reflexive. Better: replace with a single declarative statement or a reframe. If three negations are genuinely needed, collapse them into one sentence with escalation ("not lack of talent, age, or even discipline"). Echo repetition (repeating the same number or word for emphasis) should be replaced by reframing the information into relatable terms.

**Replacement Strategy:**
1. Delete the tricolon entirely
2. Write one strong declarative sentence with the key word capitalized or italicized
3. If the tricolon was emphasizing a statistic, reframe the stat in human terms instead of repeating it
4. Use spoken emphasis (CAPS, italics) instead of structural repetition to create weight

---

### PATTERN 3: OVER-EXPLAINING AFTER THE PUNCHLINE

**Severity:** HIGH
**Frequency in source edit:** 5 instances
**Detection difficulty:** Medium — requires judgment about whether the punchline was strong enough to stand alone

**Description:**
AI delivers a strong, punchy line — then adds 1-3 additional sentences that restate, elaborate, or summarize what was just said clearly enough. The additions dilute the impact of the original line. This pattern reveals AI's lack of confidence in its own best writing.

**Detection Criteria:**
- A strong line (short, rhythmic, high-impact) followed by a longer explanatory sentence that restates the same idea
- Sentences beginning with "In other words," "Meaning," "That means," or "Put simply" after an already-clear statement
- Summary sentences appearing at the end of a section that repeat the section's main point
- 2+ sentences after a natural stopping point within a single section

**Before/After Examples:**

*Example 1:*
> **V5:** "Show up, get fixed, go home, good luck. One-time events. Hope it sticks. Months of slow, incremental progress with no real reinforcement."
>
> **V6:** "Show up, get fixed, go home, good luck."
>
> [The four-beat summary was devastating. Everything after it was redundant narration. Human stopped.]

*Example 2:*
> **V5:** Six paragraphs in the Permanence Reinforcement section re-explaining the science of short-term vs. long-term memory — material already covered in the Solution section — plus a tricolon, a rhetorical question ("who's willing to build the infrastructure?"), and a self-congratulatory founder line ("I'd rather go broke building something that works than get rich selling something that doesn't").
>
> **V6:** Two sentences that reference the system and move to the close.

*Example 3:*
> **V5:** "Events fade. Systems make it stick. The school is where the fix happens. Phase 3 is where the fix becomes who you are. Without Phase 3, you're renting a better swing. With Phase 3, you own it. For good."
>
> **V6:** "Without Phase 3, you're renting a better swing." [paragraph break] "With Phase 3, you own it -- for life."

**Codified Rule:**
After a strong punchline, stop. Do not add explanation, restatement, or summary. The punchline IS the point. Read the line, ask: "Does the audience need anything else here?" If the answer is no, move on. Every sentence after a punchline must earn its place by adding NEW information, not restating old information.

**Replacement Strategy:**
1. Identify the strongest line in the section
2. Delete everything after it that restates its point
3. If the section feels too short, that's fine — short sections create pace
4. The next paragraph should advance the argument, not summarize the previous one

---

### PATTERN 4: MISSING SPOKEN EMPHASIS MARKERS

**Severity:** HIGH (VSL-specific)
**Frequency in source edit:** 6 instances
**Detection difficulty:** Easy — scan for paragraphs with no CAPS, italics, or bold

**Description:**
AI writes flat prose without capitalization, italics, or formatting that signals vocal stress. VSL scripts are spoken aloud — emphasis markers are delivery instructions for the speaker. Without them, every word has equal weight, which is the opposite of how humans naturally speak.

**Detection Criteria:**
- Paragraph with 3+ sentences and no emphasis markers (CAPS, italics, bold)
- Key claim or emotional word buried in a neutral clause without emphasis
- Contrast pairs ("not X, but Y") where neither X nor Y is emphasized
- Phase/feature headers written as document headers rather than spoken sentences

**Before/After Examples:**

*Example 1:*
> **V5:** "the most elite academies"
> **V6:** "the MOST elite academies"

*Example 2:*
> **V5:** "You also need to activate your body's LONG-TERM memory"
> **V6:** "Because you ALSO need to activate your body's LONG-TERM memory"

*Example 3:*
> **V5:** "what, specifically, needs to happen to make the fix stick?"
> **V6:** "What MUST happen *technically* to make the fix stick?"

*Example 4:*
> **V5:** "**Phase 1: PREPARE.**"
> **V6:** "**Phase 1 is PREPARE.**" (spoken sentence, not document header)

**Codified Rule:**
In VSL and spoken copy, every paragraph should have at least one word that signals "this is where the speaker leans in." Use ALL-CAPS for words that require vocal stress. Use italics for words with tonal emphasis. Phase/feature headers should be written as speakable sentences, not document formatting. AI writes for the eye; spoken copy must write for the ear.

**Replacement Strategy:**
1. Read each paragraph aloud
2. Notice which words you naturally stress — those get CAPS or italics
3. Convert document-style headers to spoken sentences ("Phase 1 is PREPARE" not "Phase 1: PREPARE")
4. Ensure every key claim has at least one emphasized word

---

### PATTERN 5: MISSING CAUSAL CONNECTORS

**Severity:** HIGH
**Frequency in source edit:** 6 instances
**Detection difficulty:** Easy — look for sentences that state facts without "because," "so," or "and yet"

**Description:**
AI drops logical connectors (because, so, therefore, and yet) between sentences that have a cause-effect relationship. This creates a list of assertions rather than a flowing argument. The audience experiences a sequence of facts but doesn't feel the logic chain that connects them.

**Detection Criteria:**
- Two consecutive sentences where B is caused by or follows from A, but no connector word links them
- Sentences starting with "And" where "Because" or "So" would be more precise
- Sections that read as lists of independent claims rather than building arguments
- Missing "again" or "as we discussed" callbacks to earlier points

**Before/After Examples:**

*Example 1:*
> **V5:** "That's what we built."
> **V6:** "So that's exactly what we built."

*Example 2:*
> **V5:** "And you're not doing this alone."
> **V6:** "Because you're not doing this alone."

*Example 3:*
> **V5:** "After you leave the immersive, your coaching team doesn't disappear."
> **V6:** "Because after you leave the immersive, your coaching team doesn't disappear."

*Example 4:*
> **V5:** "So the fix is necessary but NOT sufficient."
> **V6:** "So again, the fix is necessary but NOT sufficient."

**Codified Rule:**
When sentence B is caused by, follows from, or contrasts with sentence A — include the connector. "Because" for cause. "So" for consequence. "And yet" for surprise. "Again" for callback. Arguments build through connective tissue. Without connectors, copy reads as a list of assertions rather than a logical chain the audience can follow.

**Replacement Strategy:**
1. Read two consecutive sentences
2. Ask: "Is B a consequence of A? Is B the reason for A? Does B contrast with A?"
3. If yes, add the appropriate connector
4. For callbacks to earlier points, add "again" or "as I mentioned"

---

### PATTERN 6: SANITIZED LANGUAGE WHERE RAW LANGUAGE BELONGS

**Severity:** HIGH
**Frequency in source edit:** 5 instances
**Detection difficulty:** Requires character/audience awareness — must know the speaker's register

**Description:**
AI chooses polished, safe, corporate-neutral language where the speaker's character demands rawness, humor, frustration, or edge. This is different from slop — the words aren't banned, they're just wrong for the speaker. A passionate founder talking to frustrated golfers should sound like a passionate founder, not a press release.

**Detection Criteria:**
- Verbs that are corporate-safe where visceral verbs would fit ("rethink" vs. "burn it to the ground")
- Missing mild profanity or slang that the target audience uses naturally
- Adjectives that are technically accurate but emotionally flat ("outstanding" vs. "literally the best in the world")
- Formal conjunctions ("because") where conversational interjections ("and trust me") would build rapport
- Clinical descriptions of emotional moments

**Before/After Examples:**

*Example 1:*
> **V5:** "a foreign object in your hands"
> **V6:** "a foreign freaking object in your hands"

*Example 2:*
> **V5:** "I decided to rethink the whole approach."
> **V6:** "I decided to burn almost everything to the ground."

*Example 3:*
> **V5:** "The instruction was outstanding."
> **V6:** "The instruction was literally the best in the world."

*Example 4:*
> **V5:** "because they WILL fight back"
> **V6:** "and trust me, they WILL fight back"

*Example 5:*
> **V5:** "Not tweak it. Not add another video series."
> **V6:** "No minor cosmetic changes or so-called upgrades."

**Codified Rule:**
Match the language register to the speaker and audience. If the speaker is a passionate founder talking to frustrated golfers, use words that frustrated golfers use. Add mild profanity where it would be natural. Use visceral verbs over corporate verbs. Replace formal conjunctions with conversational interjections where rapport matters more than precision. The question for every verb and adjective: "Would this person actually say this word out loud?"

**Replacement Strategy:**
1. Identify the speaker's emotional state in each section (frustrated, excited, defiant, empathetic)
2. For each verb, ask: "Is there a more visceral version of this?"
3. For each adjective, ask: "Is there a bolder claim that's still true?"
4. For transitions, ask: "Would this person say 'because' or 'and trust me' here?"

---

### PATTERN 7: VAGUE REFERENTS AND GENERIC FRAMING

**Severity:** MEDIUM-HIGH
**Frequency in source edit:** 6 instances
**Detection difficulty:** Easy — search for "what," "it," "things," "that" used as subjects

**Description:**
AI uses generic pronouns and vague nouns ("what," "it," "things," "that") where a specific noun, concept, or framing would be stronger. Specificity builds credibility; vagueness erodes it.

**Detection Criteria:**
- Sentences starting with "What I..." or "Here's what..." where the specific noun is available
- "It" or "that" referring to a concept named earlier but not re-named here
- "Things" used as a noun when specific items could be listed
- Transition phrases that promise content without delivering it ("What I can say is this:")
- Technical concepts replaced with vague labels ("the fade" instead of "lack of long-term memory encoding")

**Before/After Examples:**

*Example 1:*
> **V5:** "experiencing what I'm about to share with you today"
> **V6:** "experiencing the process I'm about to share with you today"

*Example 2:*
> **V5:** "the fade would eat your improvement alive"
> **V6:** "this lack of long-term memory encoding would eat your improvement alive"

*Example 3:*
> **V5:** "What I can say is this:"
> **V6:** "Here's the best assurance I can give you:"

*Example 4:*
> **V5:** "Here's what I mean."
> **V6:** "See,"

**Codified Rule:**
Replace every instance of "what," "it," "things," or "that" with the specific noun it refers to. If the noun doesn't exist yet, create it. When referencing a technical concept established earlier, use its full name — don't abbreviate to a vague pronoun. Vague transitions ("What I can say is this") should be replaced with specific framing ("Here's the best assurance I can give you") or eliminated entirely.

**Replacement Strategy:**
1. Circle every "it," "what," "that," and "things" in the draft
2. For each one, write the specific noun it refers to
3. Replace the pronoun with the noun (or a shortened version if it's been established)
4. For vague transition phrases, either replace with specific framing or delete

---

### PATTERN 8: SPEAKER EMOTION OVER AUDIENCE EMOTION

**Severity:** HIGH
**Frequency in source edit:** 4 instances
**Detection difficulty:** Requires empathy analysis — must recognize when the writer is projecting vs. connecting

**Description:**
AI defaults to first-person emotional declarations ("I'm excited," "that gets me fired up," "this is what drives me") instead of engaging the audience's perspective, experience, or emotions. In persuasion copy, the audience's emotion almost always matters more than the speaker's.

**Detection Criteria:**
- First-person emotional statements ("I'm excited about," "what gets me fired up") that could be reframed as audience-facing
- Narrator summaries of a situation that could be converted to direct audience questions
- Opening statements that talk ABOUT the audience instead of TO the audience
- Sections where the speaker describes their feelings instead of evoking the audience's feelings

**Before/After Examples:**

*Example 1:*
> **V5:** "that get me really excited about the future of game improvement."
> **V6:** "that seem almost too good to be true:"
>
> [Shifted from speaker's excitement to audience's likely reaction — meets skepticism instead of projecting enthusiasm]

*Example 2:*
> **V5:** "Years. Multiple instructors." [paragraph break] "Same result -- improvement that vanished the moment he walked off the range."
> **V6:** "Seriously, can you imagine spending years with multiple instructors -- and then having your improvement VANISH the moment you walk off the range?"
>
> [Converted narrator summary into direct audience question — pulls viewer INTO the experience]

*Example 3:*
> **V5:** "When you're serious about improving your game. You try everything."
> **V6:** "Look, you wouldn't be here watching this if you weren't serious about your game."
>
> [Shifted from generic statement about the audience to direct acknowledgment of their specific behavior]

**Codified Rule:**
Before writing an emotional beat, ask: "Whose emotion matters here — the speaker's or the audience's?" In persuasion copy, the audience's emotion almost always wins. Convert speaker declarations into audience questions, acknowledgments, or reflections. Don't tell the audience how YOU feel. Show them you understand how THEY feel. When summarizing a story or situation, convert the summary into a direct question that pulls the audience into the experience.

**Replacement Strategy:**
1. Identify every first-person emotional statement
2. Ask: "Could this be reframed as an audience emotion, question, or acknowledgment?"
3. If yes, rewrite from the audience's perspective
4. Use direct questions ("Can you imagine...?"), acknowledgments ("You wouldn't be here if..."), or empathy statements ("You've felt this")

---

### PATTERN 9: REDUNDANT RE-TEACHING

**Severity:** HIGH (highest impact per instance)
**Frequency in source edit:** 4 instances
**Detection difficulty:** Hard — requires tracking which concepts have already been taught across the full piece

**Description:**
AI re-explains concepts that were already taught earlier in the piece, often in slightly different words. This is the "let me make sure you got that" habit. It signals that the writer doesn't trust the audience to have absorbed the argument. In the Transformation Academy edit, the human deleted six full paragraphs of re-explained science from the Permanence Reinforcement section — the single largest deletion.

**Detection Criteria:**
- A scientific or mechanical concept explained in full for the second time
- Phrases like "as I mentioned," "remember," or "to put it simply" followed by a re-explanation (vs. a brief reference)
- Sections that could be summarized as "the same argument from the Solution section, said differently"
- Rhetorical questions that re-ask a question already answered ("who's willing to build...?" when the answer was already given)
- Self-congratulatory lines that restate the founder's commitment already established earlier

**Before/After Examples:**

*Example 1 (largest single deletion):*
> **V5:** Six paragraphs re-explaining short-term vs. long-term memory encoding, plus "Distributed practice. Not massed practice. Not a 2-to-3-day cram session." Plus "So the question becomes -- who's willing to build the infrastructure for what actually works?" Plus "I was willing. And yes, it cost me a fortune. But I'd rather go broke building something that works than get rich selling something that doesn't."
>
> **V6:** "Encoding that requires a VERY specific process that we've now perfected in our 3-phase system."
>
> [Two sentences replace six paragraphs. The science was already taught. The founder's commitment was already established. The audience doesn't need a refresher.]

*Example 2:*
> **V5:** "Events fade. Systems make it stick." [paragraph break] "The school is where the fix happens. Phase 3 is where the fix becomes who you are."
>
> **V6:** Deleted — already said in the Phase 3 section.

**Codified Rule:**
Trust the argument. If a concept was taught once clearly, do not re-teach it. Reference it briefly ("that encoding process," "the system we built") but do not re-explain it. Every re-explanation signals that the writer doesn't trust the audience to follow along. In long-form copy, the audience has already internalized the concept — repetition reads as padding, not reinforcement.

**Replacement Strategy:**
1. After completing a draft, map every concept to its FIRST full explanation
2. For every subsequent mention, check: "Am I re-explaining or just referencing?"
3. If re-explaining, cut to a one-sentence reference
4. If the section feels too short after cuts, that means it was padding — leave it short

---

### PATTERN 10: UNNECESSARY FORWARD-PROMISES AND TRANSITION PADDING

**Severity:** MEDIUM
**Frequency in source edit:** 3 instances
**Detection difficulty:** Easy — look for sentences that promise upcoming content without delivering information

**Description:**
AI adds "stay tuned" or "here's what I mean" transitional phrases that promise upcoming content without delivering any value. These are conversational filler that interrupt the argument's momentum.

**Detection Criteria:**
- Sentences like "You'll understand why in just a second"
- "Here's what I mean" or "Let me explain" before an explanation that doesn't need introduction
- "Here's the thing" or "Now here's where it gets interesting" as section openers
- Any sentence whose only function is to announce that content is coming

**Before/After Examples:**

*Example 1:*
> **V5:** "You'll understand why in just a second."
> **V6:** Deleted entirely.

*Example 2:*
> **V5:** "Here's what I mean."
> **V6:** "See,"

**Codified Rule:**
Cut forward-promises that don't carry information. If the next section delivers on the promise, the transition is unnecessary — just deliver. "Here's what I mean" can almost always be replaced with a one-word conversational particle ("See,") or deleted entirely. The audience doesn't need to be told that you're about to explain something. They're already listening.

**Replacement Strategy:**
1. Search for "here's," "let me," "you'll see," "in just a second/moment"
2. For each one, ask: "Does this sentence carry information, or just promise it?"
3. If it only promises: delete, or replace with a one-word bridge ("See," "Look," "Now—")

---

### PATTERN 11: MISSED CALLBACKS AND CREDIBILITY LOOPS

**Severity:** MEDIUM
**Frequency in source edit:** 3 instances
**Detection difficulty:** Requires full-piece awareness — must track credibility elements across sections

**Description:**
AI introduces credibility elements (authority figures, technology names, proof points) in the first half of the piece but fails to reference them again in the second half. Callbacks create the feeling of a cohesive argument rather than a sequence of disconnected claims. Missing callbacks leave credibility assets stranded.

**Detection Criteria:**
- A named authority (Dr. Troy, Scottie Scheffler) introduced early but not referenced in the close
- A technology name (Swingfix AI) used with full description once but referenced generically later ("the diagnostics" instead of "the AI diagnostics")
- Testimonials that could be called back in the close but aren't
- Proof points established in the middle that would strengthen the final CTA if referenced

**Before/After Examples:**

*Example 1:*
> **V5 close:** "because you're enjoying the game so much more."
> **V6 close:** "because your body will be tuned up by Dr. Troy just like he does for Scottie -- and because you're enjoying the game so much more."
>
> [Dr. Troy and Scottie Scheffler were introduced in Phase 1 but never mentioned again. Human loops them back in the close.]

*Example 2:*
> **V5:** "The diagnostics, the coaching, the concentrated reps"
> **V6:** "The AI diagnostics, the coaching, the concentrated reps"
>
> [Re-inserts "AI" to maintain the Swingfix AI callback throughout.]

**Codified Rule:**
Every major credibility element introduced in the first half should appear at least once more in the second half. After completing a draft, map all credibility assets (named authorities, technology names, testimonial names, proof statistics) and ensure each one appears at least twice. The close should reference the strongest proof points from the body — never introduce new proof in the close, but always call back to established proof.

**Replacement Strategy:**
1. After drafting, list every credibility asset: named people, technologies, statistics, testimonials
2. For each, find its first mention and check for a callback later
3. If no callback exists, find the strongest place in the second half to reference it
4. The close section should callback 2-3 of the strongest credibility elements from the body

---

### PATTERN 12: INCONSISTENT REGISTER / METAPHOR MIXING

**Severity:** MEDIUM
**Frequency in source edit:** 3 instances
**Detection difficulty:** Hard — requires tracking the conceptual register established for each technical idea

**Description:**
AI switches between scientific and metaphorical framing for the same technical concept within a single argument. Once the audience builds a mental model in one register ("short-term vs. long-term memory encoding"), switching to a different register ("playing brain runs the old software") forces them to rebuild their understanding. This creates cognitive friction.

**Detection Criteria:**
- A technical concept explained scientifically in one section and metaphorically in another
- "Playing brain" / "learning brain" used interchangeably with "short-term memory" / "long-term memory"
- Mixing personification ("the old pattern fights back") with clinical language ("motor patterns reassert") for the same phenomenon
- Different names for the same concept across sections

**Before/After Examples:**

*Example 1:*
> **V5:** "your playing brain takes the wheel. And the playing brain runs the old software. Every time."
> **V6:** "this is where your deeper, longer-term memory must be active."
>
> [The scientific register (short-term/long-term memory encoding) was established earlier. Human keeps it consistent rather than switching to a "playing brain" metaphor.]

*Example 2:*
> **V5:** "bridges the gap between learning brain and playing brain"
> **V6:** "bridging the gap between short and long-term memory"
>
> [Same concept, same register choice — stay scientific.]

**Codified Rule:**
Once you establish the register for a technical concept (scientific vs. metaphorical), maintain it throughout the piece. Do not switch between "short-term memory encoding" and "playing brain runs the old software" for the same phenomenon. The audience built their mental model in one register; switching forces cognitive rebuilding. Pick one and commit.

**Replacement Strategy:**
1. Identify every technical concept in the piece (e.g., "why gains don't stick")
2. Find the first full explanation — note the register (scientific or metaphorical)
3. Search all subsequent references to the same concept
4. Standardize to the register used in the first explanation

---

## QUICK-REFERENCE DETECTION CHECKLIST

Run this checklist after the word-level anti-slop pass (Layer 4.3) and before final validation (Layer 5):

```
STRUCTURAL HUMANIZATION PASS

CRITICAL (must fix):
[ ] No sentences with 2+ distinct ideas crammed together (Pattern 1)
[ ] No tricolon "Not X. Not Y. Z." structures — maximum 1 per piece (Pattern 2)

HIGH (should fix):
[ ] No sections that re-explain concepts already taught earlier (Pattern 9)
[ ] No sentences after a strong punchline that restate the same point (Pattern 3)
[ ] Every paragraph has at least one spoken emphasis marker (Pattern 4)
[ ] Causal connections between sentences use explicit connectors (Pattern 5)
[ ] Language matches the speaker's register and audience (Pattern 6)
[ ] Emotional beats serve the audience, not the speaker (Pattern 8)

MEDIUM (review):
[ ] No vague referents where specific nouns are available (Pattern 7)
[ ] No forward-promise transitions that carry no information (Pattern 10)
[ ] All credibility elements callback at least once (Pattern 11)
[ ] Technical concepts maintain consistent register throughout (Pattern 12)
```

---

## HUMANIZATION SCORING RUBRIC

For use in Arena Layer 2.5 judging and Layer 3 evaluation:

| Score | Meaning | Criteria |
|-------|---------|----------|
| 9-10 | Human-native | Zero structural AI patterns detected. Reads as if a skilled human wrote it from scratch. Natural rhythm, varied cadence, raw where appropriate. |
| 7-8 | Lightly AI | 1-3 minor structural patterns (P7, P10, P11). No critical patterns (P1, P2). Overall reads naturally with occasional polish. |
| 5-6 | Detectably AI | 2+ critical patterns (P1 or P2) present. Some sections read naturally, others feel constructed. Mixed cadence. |
| 3-4 | Obviously AI | Multiple critical and high patterns. Tricolons, compound sentences, sanitized language throughout. Reads like a well-prompted LLM. |
| 1-2 | Raw AI | All 12 patterns present. No human editing evident. |

**Minimum threshold for editorial pass:** 7.0
**Target for final output:** 8.0+

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-14 | Initial creation from HTKT Transformation Academy v5→v6 human edit extraction. 12 patterns, 108 edits cataloged. Source: Anthony Flores human edit with feedback from Donnie and Ben. |
