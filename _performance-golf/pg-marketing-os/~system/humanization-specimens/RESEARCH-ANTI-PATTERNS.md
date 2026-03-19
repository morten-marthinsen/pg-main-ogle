# Research-Backed AI Anti-Patterns — Quantified Evidence Base

**Version:** 1.0
**Created:** 2026-03-16
**Purpose:** Academic research findings that quantify HOW and WHY AI writing is detectable. Informs the Humanization Pattern Library and Loader design.
**Type:** Reference document — not loaded into skills directly. Patterns derived from this research are codified in the Pattern Library and Loader priming rules.

---

## SOURCE PAPERS

| # | Paper | Authors | Year | Key Finding |
|---|-------|---------|------|-------------|
| 1 | Do LLMs write like humans? Variation in grammatical and rhetorical styles | Reinhart et al. | 2025 | PNAS. 66 Biber categories. Participial clauses 5.3x, nominalizations 2.1x overuse. |
| 2 | How Well Do LLMs Imitate Human Writing Style? | Jemama & Kumar | 2025 | Bucknell. Few-shot = 23.5x style fidelity. Human perplexity 29.5 vs LLM 15.2. |
| 3 | LLMs' Understanding of Literary Style | Hicke & Mimno | 2025 | Cornell. Stop words / function words are the strongest authorship markers. |
| 4 | Stylometry recognizes human and LLM-generated texts in short samples | Various | 2025 | Function word unigrams + POS bigrams = most effective detection features. |
| 5 | Hedging Devices and Engagement Markers | Various | 2025 | "can" 341 vs 65 human. Questions: 22 human vs 4 AI. "we"/"our" 2-3x human. |
| 6 | Benchmarking Linguistic Diversity | Guo et al. | 2025 | TACL. Instruction tuning REDUCES syntactic diversity. Bigger models = more homogeneous. |
| 7 | Echoes in AI: Quantifying lack of plot diversity | Various | 2025 | PNAS. Narrative uniqueness gap >6.0 points. Cross-model echoing. |
| 8 | LLM-Generated Ads | Various | 2025 | AI ads 59.1% preference. Scarcity copy: 31% detection. Authority: 75% detection. |
| 9 | Adversarial Paraphrasing | Various | 2025 | 87.88% avg detection reduction. Quality preserved (87% rated 4-5/5). |
| 10 | Uncertainty in Authorship | Ganie | 2025 | Perfect AI detection is mathematically impossible as KL divergence → 0. |

---

## QUANTIFIED STRUCTURAL TELLS

### Grammatical Overuse (PNAS, Reinhart et al.)

| Feature | AI Overuse Rate | Cohen's d | Implication |
|---------|----------------|-----------|-------------|
| Present participial clauses ("-ing") | **5.3x** human rate | 1.38 | **Strongest single structural tell.** |
| Nominalizations ("-tion"/"-ment") | **2.1x** human rate | 1.23 | Noun-heavy prose. Convert back to verbs. |
| "That" clauses as subjects | **2.6x** human rate | 0.77 | "That this works is..." → Direct statement. |
| Phrasal coordination (lists + "and") | **1.9x** human rate | 0.81 | Lists of three joined by "and." |
| Agentless passive voice | **0.5x** human rate | — | AI UNDERUSES passive. Humans write more passive constructions. |

**Critical finding:** Instruction tuning (RLHF) makes output LESS human, not more. Base models approximate human grammar better.

### Vocabulary Overrepresentation (PNAS, Reinhart et al.)

| Word | Overuse vs Human | Appearance Rate in GPT-4o |
|------|-----------------|--------------------------|
| "camaraderie" | **162x** | — |
| "tapestry" | **155x** | 23% of outputs |
| "intricate" | **119x** | — |
| "amidst" | **100x** | 27% of outputs |
| "palpable" | **95x** | — |
| "delve" | **2000%+ increase** | Academic papers 2022-2024 |

Additional high-frequency AI markers: "moreover," "furthermore," "noteworthy," "pivotal," "robust," "nuanced," "multifaceted," "underscore," "highlight," "showcase," "significant," "notable," "despite."

### Hedging & Engagement (Hedging Devices study)

| Feature | AI Rate | Human Rate | Gap |
|---------|---------|------------|-----|
| "can" (modal hedge) | 341 uses | 65 uses | **5.2x overuse** |
| "may" (modal hedge) | 119 uses | 13 uses | **9.2x overuse** |
| "will" (direct assertion) | 15 uses | 55 uses | **3.7x underuse** |
| Direct questions to reader | 4 instances | 22 instances | **5.5x underuse** |
| "we" (inclusive pronoun) | 13 uses | 23 uses | **1.8x underuse** |
| "our" (inclusive pronoun) | 11 uses | 38 uses | **3.5x underuse** |
| "argue" (strong verb) | Rare | Common | AI prefers "suggest" |

### Predictability Gap (Bucknell, Jemama & Kumar)

| Metric | Human | LLM | Gap |
|--------|-------|-----|-----|
| Perplexity (word-level) | **29.5** | 15.2 | Humans 2x more unpredictable |
| Burstiness (sentence-level) | High variance | Low variance | AI produces uniform sentence lengths |
| Syntactic diversity recall | — | 35-75% | AI covers only 35-75% of human syntactic structures |

### Function Word Fingerprints (Cornell, Hicke & Mimno)

The most distinctive markers of individual writing style are NOT the content words. They are:
- **Articles:** "a" vs "the" frequency
- **Pronouns:** "I" vs "you" vs "we" patterns
- **Prepositions:** "upon" vs "on," "into" vs "in"
- **Conjunctions:** "but" vs "however" vs "yet"
- **Stop words:** High-frequency functional words that writers choose subconsciously

These features are the strongest predictors of authorship attribution AND AI detection. LLMs produce unnaturally uniform function word distributions — a "blurry average" of all training data.

---

## IMPLICATIONS FOR COPY GENERATION

### What the Loader Must Do (Pre-Generation)
1. Suppress participial stacking (Rule 6)
2. Force sentence-length variance / burstiness (Rule 7)
3. Inject audience questions (Rule 8)
4. Function word awareness lives in specimens (structural mimicry)

### What the Pattern Library Must Catch (Post-Generation)
1. P13: Participial stacking (5.3x — strongest tell)
2. P14: Nominalization chains (2.1x)
3. P15: Modal hedging imbalance (5.2-9.2x)
4. P16: Burstiness deficit (2x predictability gap)

### What the Anti-Slop Layer Must Block (Word-Level)
Extend the existing vocabulary blocklist with research-quantified terms. Priority: any word with >50x overrepresentation.

### The Deeper Insight
The research shows that style transfer (making AI sound like a specific person) and humanization (making AI sound like ANY human) are **separable problems.** Few-shot prompting solves the first (23.5x improvement). But even with perfect style transfer, the perplexity gap remains (29.5 vs 15.2). The humanization system must address both:
- Specimens handle style transfer (sound like THIS person)
- Structural rules handle humanization (sound like A person, not a machine)

---

## MARKETING-SPECIFIC FINDINGS

AI-generated ads achieved 59.1% preference over human ads on persuasion tasks. Detection rates varied dramatically by persuasion type:

| Persuasion Type | Detection Accuracy | Implication |
|-----------------|-------------------|-------------|
| Scarcity-based | **31.0%** | Hardest to detect. VSL urgency/scarcity copy is naturally protective. |
| Authority-based | **62.5%** | Easier to detect. Credential-stacking reads as formulaic. |
| Consensus-based | **75.5%** | Easiest to detect. Social proof structures are highly recognizable. |

**Takeaway:** Your VSL copy's heavy scarcity/urgency framing is inherently more human-passing than authority or consensus framing. When authority or social proof is needed, wrap it in narrative rather than listing credentials.

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-16 | Initial compilation from 10 academic sources. Quantified data for 5 structural categories. |
