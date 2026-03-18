# Anti-Slop Lexicon
**Quality Engine v4** | Component: Protocol
**Purpose:** Banned AI-sounding words, phrases, and structural patterns with replacement suggestions — organized by category for systematic detection and elimination
**System-Agnostic:** Works with any AI model or agent framework

---

## WHY THIS EXISTS

AI models produce characteristic language patterns that signal inauthenticity to experienced readers. These patterns reduce credibility, damage conversion, and make output feel generic. "Slop" is the collective term for these AI-generated patterns.

This lexicon is the word-level enforcement layer (Layer 1 of the 3-Layer Humanization Model). It complements the structural pattern detection in HUMANIZATION-PROTOCOL.md (Layer 2) and the voice calibration in SPECIMEN-GUIDE.md (Layer 3).

**Acceptable slop density:** < 2 instances per 1,000 words. Anything above this triggers revision.

---

## CATEGORY 1: AI TELLS — Overused Transitions

Words and phrases that AI uses far more frequently than human writers.

| Banned Pattern | Why It's Slop | Replacement Strategy |
|---------------|---------------|---------------------|
| "Moreover" | Almost never used in natural speech or persuasive writing | Cut entirely, or use "And" / "Plus" / restructure as new sentence |
| "Furthermore" | Academic tone, signals AI | Cut entirely, or use "What's more" / "On top of that" |
| "In addition" | Robotic connector | Cut entirely, or use "Also" / "And" / just start the next point |
| "It's worth noting" | AI throat-clearing | Delete — just state the thing |
| "It's important to remember" | Condescending + AI pattern | Delete — just state the thing |
| "Interestingly" | AI editorializing | Delete, or replace with a specific reaction: "This surprised researchers" |
| "Notably" | Academic AI tell | Delete, or replace with "Here's what stands out" |
| "Significantly" | Vague intensifier | Replace with specific magnitude: "by 40%" / "three times more" |

---

## CATEGORY 2: AI TELLS — Hedging Language

Qualifiers that weaken claims and signal AI caution.

| Banned Pattern | Why It's Slop | Replacement Strategy |
|---------------|---------------|---------------------|
| "might" | Weakens proven claims | If proven: state directly. If uncertain: acknowledge uncertainty honestly. |
| "could potentially" | Double-hedge | Pick one: "could" or "potentially" — never both |
| "may help" | Classic AI safety hedge | If evidence supports it: "helps" / "improves" |
| "it's possible that" | Extreme hedge | State what the evidence shows, directly |
| "tends to" | Vague frequency | Replace with specific: "in 7 of 10 cases" / "most of the time" |
| "in many cases" | Unquantified | Replace with specific: "in 73% of tests" / "for most users" |
| "generally speaking" | Filler + hedge | Delete entirely — just make the statement |

---

## CATEGORY 3: AI TELLS — Robotic Phrasing

Stock phrases that no human would write in natural copy.

| Banned Pattern | Why It's Slop | Replacement Strategy |
|---------------|---------------|---------------------|
| "In today's world" | Meaningless setup | Delete — start with the actual point |
| "In this day and age" | Cliche + AI pattern | Delete — start with the actual point |
| "When it comes to" | Throat-clearing | Delete — name the topic directly |
| "In terms of" | Filler | Replace with "for" / "with" / restructure |
| "At the end of the day" | Cliche | Delete, or use a specific timeframe |
| "The fact of the matter is" | Pompous filler | Delete — just state the fact |
| "It goes without saying" | If it goes without saying, don't say it | Delete entirely |

---

## CATEGORY 4: EXCESSIVE QUALIFIERS

Intensifiers that add noise without meaning.

| Banned Pattern | Why It's Slop | Replacement Strategy |
|---------------|---------------|---------------------|
| "very" | Almost always deletable | Delete, or replace with a stronger base word: "very tired" -> "exhausted" |
| "really" | Filler intensifier | Delete, or replace with specific: "really fast" -> "in 3 seconds" |
| "extremely" | Hyperbolic + vague | Replace with specific magnitude |
| "incredibly" | Overused AI superlative | Replace with specific evidence or delete |
| "absolutely" | Empty emphasis | Delete — the statement should stand without it |
| "truly" | AI sincerity marker | Delete — sounds performative |
| "literally" | Almost always misused | Delete unless something is actually literal |

---

## CATEGORY 5: FILLER CONTENT — Stating the Obvious

Sentences that add no information.

| Banned Pattern | Why It's Slop | Replacement Strategy |
|---------------|---------------|---------------------|
| "As you know..." | Condescending + filler | Delete — just state the information |
| "It's no secret that..." | Setup for something everyone already knows | Delete — get to the point |
| "Everyone knows..." | Assumes consensus, often false | Delete, or cite specific evidence |
| "Obviously..." | If it's obvious, don't flag it | Delete entirely |

---

## CATEGORY 6: FILLER CONTENT — Throat-Clearing

Sentences that announce what's coming instead of delivering it.

| Banned Pattern | Why It's Slop | Replacement Strategy |
|---------------|---------------|---------------------|
| "Let me explain..." | Just explain | Delete — start explaining |
| "Here's the thing..." | Overused setup | Delete, or replace with the actual thing |
| "The truth is..." | Implies everything else was false | Delete — just state the truth |
| "What you need to understand is..." | Condescending + filler | Delete — just state the information |
| "Let me tell you something..." | Empty drama | Delete — just tell them |

---

## CATEGORY 7: FILLER CONTENT — Padding Phrases

Multi-word phrases replaceable by one word or deletable entirely.

| Banned Pattern | Replacement |
|---------------|-------------|
| "needless to say" | Delete entirely |
| "as a matter of fact" | "In fact" or delete |
| "for all intents and purposes" | "Effectively" or delete |
| "in order to" | "to" |
| "due to the fact that" | "because" |
| "at this point in time" | "now" |
| "each and every" | "every" |
| "first and foremost" | "first" |
| "any and all" | "all" |
| "one and only" | "only" |

---

## CATEGORY 8: GENERIC CLAIMS — Unquantified Language

Vague quantity words that should be replaced with specifics.

| Banned Pattern | Why It's Slop | Replacement Strategy |
|---------------|---------------|---------------------|
| "many people" | How many? | Replace with specific: "2,400 customers" / "73% of users" |
| "countless" | Lazy quantifier | Replace with actual count or "more than [N]" |
| "numerous" | Academic vagueness | Replace with specific number |
| "a lot of" | Informal + vague | Replace with specific quantity |
| "significant results" | What results? How significant? | Replace with specific metrics |
| "proven effective" | By whom? In what study? | Cite the specific proof |

---

## CATEGORY 9: GENERIC CLAIMS — Empty Benefits

Benefits that could apply to anything and therefore mean nothing.

| Banned Pattern | Why It's Slop | Replacement Strategy |
|---------------|---------------|---------------------|
| "improve your life" | Applies to anything | Name the SPECIFIC improvement |
| "feel better" | Vague | Name the SPECIFIC feeling |
| "achieve your goals" | What goals? | Name the SPECIFIC goal |
| "unlock your potential" | Meaningless | Name the SPECIFIC capability |
| "transform your life" | Hyperbolic + vague | Name the SPECIFIC transformation |
| "take it to the next level" | What level? | Name the SPECIFIC outcome |

---

## CATEGORY 10: EMPTY SUPERLATIVES

Unsupported claims of superiority.

| Banned Pattern | Why It's Slop | Replacement Strategy |
|---------------|---------------|---------------------|
| "the best" | Prove it or don't claim it | Replace with specific evidence or comparative |
| "the most effective" | By what measure? | Cite the measure |
| "revolutionary" | Almost never true | Replace with specific innovation |
| "game-changing" | Overused to meaninglessness | Replace with specific change |
| "breakthrough" | Requires actual breakthrough evidence | Replace with specific advance |
| "cutting-edge" | Cliche | Replace with specific technology or method |

---

## CATEGORY 11: COPYWRITING CLICHES

Worn-out persuasion patterns.

| Banned Pattern | Replacement Strategy |
|---------------|---------------------|
| "discover the secret" | Name the specific thing being discovered |
| "unlock the power" | Name the specific capability |
| "journey to success" | Name the specific destination |
| "imagine if you could" | Use a more specific conditional or just state the benefit |
| "what if I told you" | Just tell them |
| "the shocking truth" | State the truth — let the reader decide if it's shocking |
| "think outside the box" | Delete — cliche |
| "move the needle" | Name the specific metric |
| "low-hanging fruit" | Name the specific easy win |
| "synergy" | Name the specific combined effect |

---

## CATEGORY 12: DOMAIN CONTAMINATION

Words and phrases from other domains that leak into your copy. Customize this section for your domain.

**Health/supplement contamination in non-health copy:**
- "revolutionary breakthrough," "hidden toxin," "ancient secret," "miracle cure," "doctor-recommended," "clinical studies show," "your body's natural"

**Finance contamination in non-finance copy:**
- "wealth secret," "financial freedom," "market crash," "retire early," "passive income"

**Personal development contamination:**
- "unlock your potential," "manifest your destiny," "inner transformation," "spiritual awakening," "mindset shift"

**Generic direct-response contamination:**
- "what they don't want you to know," "the establishment is hiding," "one weird trick"

---

## CATEGORY 13: STRUCTURAL SLOP

Patterns in how sentences and paragraphs are constructed, not specific words.

| Pattern | Detection | Fix |
|---------|-----------|-----|
| **Sentence starter repetition** | Same word starts 3+ consecutive sentences | Vary starters |
| **Paragraph structure monotony** | All paragraphs follow same structure (e.g., all start with question) | Mix structures |
| **Bullet point overuse** | More than 3 bulleted sections in a single piece | Convert some to prose |
| **Rhetorical question overuse** | More than 3 rhetorical questions in 500 words | Convert some to statements |

---

## DETECTION AND SCORING

### Anti-Slop Pass Procedure

```yaml
anti_slop_pass:
  # For each category, scan the output
  for_each_category:
    scan: "[full output text]"
    log_each_instance:
      pattern: "[matched pattern]"
      location: "[section/paragraph]"
      replacement: "[suggested fix]"

  # Calculate density
  slop_score:
    pre_pass:
      total_instances: "[count]"
      density_per_1000_words: "[number]"
    post_pass:
      total_instances: "[count remaining]"
      density_per_1000_words: "[number]"
    reduction_percentage: "[%]"

  # Assess
  assessment:
    threshold: "< 2 per 1000 words"
    status: "[CLEAN | ACCEPTABLE | NEEDS WORK]"
```

### Integration Points

- **Pre-generation:** Load the top 10 most common patterns as avoidance priming (~100 tokens)
- **Post-generation:** Run the full anti-slop pass as a dedicated step
- **Competition scoring:** Anti-slop compliance is a scored criterion (part of anti-pattern enforcement)
- **Revision protocol:** Anti-slop check runs at ALL revision severity levels

---

## BUILDING YOUR DOMAIN LEXICON

This lexicon provides a universal foundation. To customize for your domain:

1. **Start with these categories** — they apply to all AI-generated text
2. **Add domain contamination patterns** (Category 12) specific to your vertical
3. **Add domain-specific cliches** that are overused in your industry
4. **Track new patterns** — when human reviewers flag AI-sounding language, add it to the lexicon
5. **Remove false positives** — if a "banned" word is actually natural in your domain, whitelist it with annotation

The lexicon is a living document. It grows with every project through the Human Edit Extraction procedure (HUMANIZATION-PROTOCOL.md) and the Self-Learning Promotion Protocol.
