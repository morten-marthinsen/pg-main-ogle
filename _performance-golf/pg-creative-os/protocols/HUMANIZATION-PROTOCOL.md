# Creative OS — Humanization Protocol

**Version:** 1.0
**Created:** 2026-03-18
**Purpose:** Detect and eliminate structural AI patterns that survive word-level anti-slop enforcement. Three layers: word-level, structural, voice.
**Adapted from:** Marketing OS Humanization Protocol v1.0 (12 founding patterns)

---

## THE 3-LAYER MODEL

### Layer 1: Word-Level (Anti-Slop Lexicon)

Reference: `protocols/ANTI-SLOP-LEXICON.md`

Catches individual words and phrases that signal AI-generated copy. This is the easiest layer — find and replace. But word-level fixes are NOT sufficient. An AI can avoid every banned word and still sound robotic through structural patterns.

### Layer 2: Structural (Pattern Library)

Catches sentence construction, rhythm, and argument patterns that signal AI even when individual words are fine. These are harder to detect because each instance looks reasonable in isolation — the pattern only becomes visible across paragraphs.

### Layer 3: Voice (Persona Fidelity)

Catches register drift, tone inconsistency, and persona breaks. The copy may be clean at word and structural levels but sound like a different person than who started the piece.

---

## LAYER 2: STRUCTURAL PATTERN LIBRARY

### 12 Founding Patterns

Adapted from Marketing OS's pattern library. Each pattern includes a detection signal and a fix.

**1. Overloaded Compound Sentences**
- **Signal:** Sentences with 3+ clauses joined by commas, semicolons, or dashes
- **Fix:** Split into separate sentences. One thought per line. See WORKSPACE.md Rule 1.
- **Ad copy version:** If a hook has a comma followed by a new idea, it's two hooks.

**2. Tricolon Over-Signposting**
- **Signal:** "First... Second... Third..." or "Not only X, but also Y, and even Z"
- **Fix:** Remove the signposts. Let the ideas stand on their own. Readers can count.

**3. Over-Explaining After Punchlines**
- **Signal:** A strong statement followed by 1-2 sentences that explain what you just said
- **Fix:** Delete the explanation. The punchline landed. Trust it.

**4. Missing Spoken Emphasis Markers**
- **Signal:** Flat prose with no italics, ellipses, dashes, or caps for emphasis
- **Fix:** Add delivery instructions. Ellipses = pauses. Dashes = beats. Italics = emphasis. See WORKSPACE.md Rule 4.

**5. Missing Causal Connectors**
- **Signal:** Ideas presented in sequence without "because," "so," "which means," "that's why"
- **Fix:** Add the causal link. Readers need to know WHY each idea follows from the previous one.

**6. Sanitized Language**
- **Signal:** Softened or clinical phrasing where the audience would use blunt/emotional language
- **Fix:** Use their words. If they say "my drive sucks," don't write "suboptimal driving performance."

**7. Vague Referents**
- **Signal:** "This approach," "these results," "that method" — without naming what "this/these/that" refers to
- **Fix:** Name the specific thing. "This approach" → "The Fascia Reset Protocol" or "this 3-minute stretch"

**8. Speaker Emotion Over Audience Emotion**
- **Signal:** "We're excited to share..." / "I'm passionate about..." — the writer's feelings, not the reader's
- **Fix:** Write about THEIR emotion. "You're about to discover..." not "We're thrilled to announce..."

**9. Redundant Re-Teaching**
- **Signal:** Concepts explained in one section are re-explained in a later section
- **Fix:** ASSUME the reader absorbed previous sections. Reference, don't re-teach. See WORKSPACE.md Rule 8.

**10. Unnecessary Forward-Promises**
- **Signal:** "In a moment, I'll show you..." / "Coming up, you'll learn..."
- **Fix:** Just show them. Don't promise to show them and then show them. Cut the promise.

**11. Missed Callbacks**
- **Signal:** An open loop planted early (a teased reveal, a referenced story) that's never closed
- **Fix:** Track every open loop. Close them all. An unclosed loop is worse than no loop.

**12. Register/Metaphor Mixing**
- **Signal:** Switching between casual and formal tone within the same section, or mixing metaphor domains (medical + military + cooking)
- **Fix:** Pick one register. Pick one metaphor domain. Stay consistent within each section.

### Ad-Specific Patterns (Creative OS additions)

**13. Hook Fatigue**
- **Signal:** Multiple hooks that use the same structural template (e.g., all start with a question, all use "What if...")
- **Fix:** Vary hook structures: question, statement, statistic, command, story opener, pattern interrupt

**14. Generic CTA Language**
- **Signal:** "Click below," "Get started today," "Don't miss out" — copy-paste CTAs
- **Fix:** Make the CTA specific to what they're getting: "See your swing analysis" / "Watch the 3-minute demo"

**15. Benefit Stacking Without Proof**
- **Signal:** 3+ benefits listed in sequence with no evidence for any of them
- **Fix:** Pair each benefit with a specific proof point. One proof per benefit minimum.

---

## HUMAN EDIT EXTRACTION

When a human edits Neco's output, the system should learn. This 6-step procedure captures what the human changed and why.

### Procedure

1. **DIFF:** Compare the AI draft against the human-edited version. Identify every change.
2. **CLASSIFY:** For each change, classify as:
   - Word-level (anti-slop fix) → add to `ANTI-SLOP-LEXICON.md`
   - Structural (pattern fix) → check against the 15 patterns above
   - Voice (register/tone fix) → note the specific register adjustment
   - Content (factual/strategic change) → not a humanization issue, skip
3. **PATTERN ANALYSIS:** For structural changes, identify which pattern(s) they fix. If a change doesn't match any existing pattern, it's a candidate for a new pattern.
4. **CROSS-EDIT PATTERN DETECTION:** After 3+ edit cycles, look for recurring patterns. If the same pattern appears in 2+ edit cycles, it's confirmed (L2 on the learning scale).
5. **LIBRARY UPDATE:** For confirmed patterns (L2+), add to the Pattern Library above with a concrete example from the actual edit.
6. **OUTPUT:** Log the extraction in the agent's `_learning/patterns.md` with the edit details.

---

## ENFORCEMENT

### During Generation
- Before generating copy, prime with the top 5 most relevant patterns for the current format (hooks vs. scripts vs. briefs)
- After generating, scan for patterns before delivering

### Quality Gate
- Neco: Run pattern scan before Checkpoint 3 (verification review)
- If 2+ patterns detected per 500 words, flag for revision before delivery

### Learning Loop
- When human edits Neco output, run the Human Edit Extraction procedure
- Log findings in `_learning/patterns.md`
- Promote confirmed patterns (L2+) to this file

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial creation. 12 Marketing OS patterns + 3 ad-specific additions. Human Edit Extraction procedure. Enforcement rules. |
