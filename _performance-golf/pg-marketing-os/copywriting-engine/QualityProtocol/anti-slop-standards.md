# Anti-Slop Standards

**Source:** NateJones-PromptArchitect ARCHITECTURE-PRD.md §6.1
**Purpose:** Enforce writing quality across all CopywritingEngine outputs

---

## Nine Principles of Anti-Slop Writing

| # | Principle | Implementation |
|---|-----------|----------------|
| 1 | **Every sentence earns its place** | If a sentence can be removed without loss, remove it. |
| 2 | **Specifics over generalities** | "37% increase in Q4" not "significant improvement" |
| 3 | **Active voice by default** | "We shipped the feature" not "The feature was shipped" |
| 4 | **No hedge words without genuine uncertainty** | Ban: "perhaps", "it seems", "one might argue" unless truly uncertain |
| 5 | **No filler phrases** | Ban: "It's worth noting", "At the end of the day", "In today's fast-paced world" |
| 6 | **Concrete nouns over abstract ones** | "The dashboard shows three errors" not "The system indicates issues" |
| 7 | **One idea per paragraph** | If a paragraph has two ideas, it's two paragraphs |
| 8 | **Forward momentum in every section** | Each paragraph should make the reader want the next one |
| 9 | **The taste test** | Read it aloud. If it sounds like "AI wrote this," rewrite it. |

---

## Slop Density Metric

**Definition:** Count of slop violations per 500 words of output.

| Score | Rating | Action |
|-------|--------|--------|
| 0.0–1.0 | Excellent | Ship as-is |
| 1.1–2.0 | Acceptable | Minor revision pass |
| 2.1–3.0 | Weak | Full rewrite of flagged sections |
| 3.1+ | Failing | Restart from scratch |

---

## Banned Phrases (Immediate Flags)

### Filler Openers
- "It's important to note that..."
- "In today's fast-paced world..."
- "At the end of the day..."
- "It goes without saying..."
- "As we all know..."
- "In the realm of..."

### Hedge Words (Unless Genuinely Uncertain)
- "perhaps"
- "it seems"
- "one might argue"
- "arguably"
- "it could be said"
- "in some ways"

### Empty Intensifiers
- "very" (replace with specific word)
- "really" (delete or dimensionalize)
- "extremely" (quantify instead)
- "incredibly" (show, don't tell)
- "absolutely" (let the fact speak)

### AI Telltales
- "Let's dive in..."
- "Without further ado..."
- "In conclusion..."
- "Moving forward..."
- "It's worth mentioning..."
- "Needless to say..."

---

## Application Protocol

### BEFORE Writing
- Set constraint: "Zero tolerance for filler"
- Specify word count ceiling (forces density)

### DURING Writing
- One idea per paragraph (no compound thoughts)
- Every sentence must advance the reader's understanding or desire
- If you catch yourself hedging, commit or delete

### AFTER Writing
- Read aloud: Does it sound human or algorithmic?
- Delete test: Remove each sentence — does meaning survive? If yes, cut it.
- Specificity audit: Circle every abstract noun. Replace with concrete.

---

## Quality Gate Integration

All CopywritingEngine outputs MUST:
1. Score ≤ 2.0 slop density before shipping
2. Pass the "read aloud" test (Principle 9)
3. Contain zero banned phrases from the lists above
4. Use active voice in ≥ 80% of sentences
5. Have at least one specific/concrete detail per paragraph

---

*Extracted from NateJones-PromptArchitect/ARCHITECTURE-PRD.md*
*Applied across all Skills/ outputs in the CopywritingEngine system*
