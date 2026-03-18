# Creative OS — Anti-Slop Lexicon

**Version:** 1.0
**Created:** 2026-03-18
**Purpose:** Banned words and phrases that signal AI-generated copy. Check all Neco output against this lexicon before delivery.
**Sources:** Marketing OS golf vertical anti-slop list, Neco copy-constraints.md, WORKSPACE.md copywriting heuristics

---

## HOW TO USE

1. Before delivering any copy (hooks, scripts, briefs), scan for banned words/phrases
2. If found, replace with the natural alternative
3. If no natural alternative exists, rewrite the sentence — the banned phrase is a symptom of lazy construction

---

## UNIVERSAL BANS

Words/phrases that sound AI-generated in ANY context. Replace or rewrite.

| Banned | Why | Replace With |
|--------|-----|-------------|
| delve | Nobody says this in conversation | dig into, look at, explore |
| leverage | Corporate jargon | use, apply, take advantage of |
| utilize | Pretentious synonym for "use" | use |
| landscape | Vague abstraction | market, situation, field |
| robust | Meaningless filler | strong, solid, reliable |
| paradigm | Academic jargon | approach, method, way |
| synergy | Corporate buzzword | connection, combination |
| holistic | Vague and overused | complete, full, total |
| facilitate | Bureaucratic | help, enable, make possible |
| endeavor | Stuffy | effort, work, attempt |
| multifaceted | Padding | complex, layered |
| comprehensive | Often filler | complete, full, thorough |
| innovative | Means nothing without specifics | [describe what's actually new] |
| cutting-edge | Cliché | [describe what's actually new] |
| game-changer | Overused to meaninglessness | [describe the specific change] |
| unlock | AI loves this word | release, access, discover |
| empower | Vague motivation-speak | give you, let you, enable |
| transform | Overused in AI copy | change, improve, fix |
| journey | Unless describing actual travel | process, experience, path |
| elevate | Vague upward metaphor | improve, strengthen, raise |

---

## GOLF/DTC AD BANS

Phrases overused in golf and direct-response advertising. These trigger skepticism in sophisticated buyers (Schwartz Stage 4-5).

### Health Contamination
These phrases leak in from health supplement copy and sound wrong in golf context:
- "revolutionary breakthrough"
- "hidden toxin"
- "ancient secret"
- "miracle cure"
- "doctor-recommended"
- "clinical studies show"
- "your body's natural"

### Finance Contamination
These leak in from financial copy:
- "wealth secret"
- "financial freedom"
- "market crash"
- "retire early"
- "passive income"

### Personal Dev Contamination
These leak in from self-help copy:
- "unlock your potential"
- "manifest your destiny"
- "inner transformation"
- "spiritual awakening"
- "mindset shift"

### Generic DR Contamination
Overused direct-response patterns that educated buyers see through:
- "what they don't want you to know"
- "the establishment is hiding"
- "one weird trick"
- "doctors hate this"
- "this one simple trick"
- "you won't believe what happened next"

---

## NECO-SPECIFIC BANS

From Neco's learned patterns (`_learning/failure-fixes.md` and CLAUDE.md Common Mistakes):

| Banned Pattern | Why | Replace With |
|---------------|-----|-------------|
| "Until Now" (as hook opener) | Blind/vague — no concrete element | Reference a specific number, verb, or concept |
| "But Here's The Thing" | Generic transition | Specific causal connector |
| "What Nobody Tells You" | Vague conspiracy framing | Name the specific thing |
| "Something Changed Everything" | No specificity | Name what changed |
| Single-paragraph problem statements | Don't land in spoken copy | Build in layers: statement → concept → consequences → reframe → failed solutions |
| "Learn something new" framing | Creates effort barrier | "Release what you already have" framing |
| Credentials-first expert intro | Boring — mission comes first | "Refuses to accept..." / "Made it his life's mission to end X..." |

---

## ENFORCEMENT

1. **Neco:** Scan all hooks, scripts, and briefs against this lexicon before Checkpoint 3 (verification review)
2. **Veda:** If copy overlay text is provided, scan before rendering into video
3. **Automated:** The forbidden_gate_status_validator pattern can be extended to scan for these terms (future hook enhancement)

---

## GROWING THIS LEXICON

After each draft → final edit cycle where a human removes AI-sounding language:
1. Identify the specific word/phrase that was removed
2. Note what it was replaced with
3. Add to the appropriate section above
4. If the pattern is structural (not just a word), add to HUMANIZATION-PROTOCOL.md instead

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-18 | Initial creation. 20 universal bans, golf/DTC vertical bans (4 contamination categories), Neco-specific bans from learned patterns. |
