# Mechanism Ideator Enhanced

## What This Is

A complete AI skill package that generates copy-ready marketing mechanisms from any program content - powered by a 121-file research library of mechanism knowledge from the world's best copywriters.

**This is the enhanced version.** The base package (`mechanism-ideator-package`) uses the AI's general knowledge + web search. This version reads from a curated research library at every phase of the process.

---

## What's Different From the Base Package

| Capability | Base Package | Enhanced |
|-----------|-------------|----------|
| Process instructions | 8-phase workflow | Same 9-phase workflow (Phase 0-8) |
| Reference files | 7 condensed files (~1,400 lines) | 7 condensed + 121 research library files (~1.6MB) |
| Historical examples | AI's general knowledge | 30 documented mechanisms with full UMP/UMS/UMD breakdowns |
| Creation frameworks | General process | 12 specific frameworks (Georgi RMBC, Brown E5, Evaldo One Belief, Deutsch 4C's, Schwartz, Makepeace, etc.) |
| Psychology | General knowledge | 15 specific foundations (Cialdini, cognitive biases, ELM, narrative transportation, loss aversion, etc.) |
| Naming | 6 condensed patterns | 9 naming system files with 40+ examples, 12 formulas, sound analysis |
| Market knowledge | General awareness | 10 market-specific playbooks (health, finance, biz-op, weight loss, dating, etc.) |
| Villain construction | 10 archetypes listed | Full villain library with attack patterns, origin story templates, naming guidelines |
| Proof strategy | General approach | Proof Architecture Guide with 5 dimensions, distribution targets, 40+ element inventory |
| Story structure | Basic layering | Story Architecture Guide with 8 narrative beats, emotional arc maps |

---

## Setup

### For Claude Code Users

1. Copy the `mechanism-ideator-enhanced/` folder to `~/.claude/skills/`
2. Invoke with: `/mechanism-ideator-enhanced [path to your program files]`

### For ChatGPT / Claude.ai / Other AI Users

1. Open `SKILL.md` and paste as system prompt or conversation start
2. The skill references files in `references/research-library/` - paste the contents of referenced files when the process calls for them
3. Note: Due to context limits, you may need to paste files phase by phase rather than all at once

---

## What You Need to Provide

1. **Program content files** - Course modules, transcripts, coaching calls, product specs
2. **Target market** - Who you're selling to
3. **What your prospect believes** - Their current explanation for failure
4. **What they've tried** - Previous solutions that didn't work

---

## What You Get Back

The skill produces three output documents (plus per-mechanism research packages):

| Document | Contents |
|----------|----------|
| **Mechanisms.md** | Top 5 mechanisms with full narrative prose, Five Tests with draft copy, research citations, visual metaphors, score breakdowns, and a narrative layering strategy |
| **Mechanism-Candidates.md** | The complete candidate pool (all 8-12 ideas mined), showing what was selected, what was cut, why each decision was made, and strategic value of cut candidates |
| **Additional-Mechanisms.md** | Full narrative treatment for mechanisms #6+ that scored above viability but didn't make the top 5, with specific use-case guidance (email, webinar, social, retargeting) |

---

## Package Contents

```
mechanism-ideator-enhanced/
├── README.md                    (this file)
├── SKILL.md                     (the complete 9-phase process with library integration)
└── references/
    ├── extraction-patterns.md   (content mining checklist)
    ├── evaluator-rubrics.md     (13-dimension scoring rubrics)
    └── research-library/        (121 files - the knowledge base)
        ├── 01-Examples/         (30 documented mechanisms + 15 swipe analyses)
        ├── 02-Frameworks/       (12 creation systems)
        ├── 03-Psychology/       (15 psychological foundations)
        ├── 04-Naming/           (9 naming systems)
        ├── 05-Markets/          (10 market playbooks)
        ├── 06-Sources/          (raw research - books, prompts, stories, metaphors)
        └── 07-Synthesis/        (12 master guides including 1,800-line taxonomy)
```

**Total:** 121 research library files + SKILL.md + README.md + 2 reference files = 125 files

---

## Credits

Created by Rich Schefren / Strategic Profits
Research library frameworks from: Georgi, Brown, Schwartz, Deutsch, Makepeace, Halbert, Carlton, Albuquerque, Sugarman, Hopkins, Kennedy, Lampropoulos, Cialdini, and others.
