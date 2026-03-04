# Mechanism Ideator v1.0

**Generates fully researched, copy-ready marketing mechanisms from any program content. Produces 3-5 named mechanisms with academic backing, case studies, statistics, visual metaphors, 13-dimension scoring, and sales copy drafts.**

---

## What This Does

Feed this skill your program content (course modules, coaching call transcripts, training material, product specs) and it runs an 8-phase process to extract and develop marketing mechanisms ready for sales letters, VSLs, or webinars.

### The 8 Phases

1. **Market Context** - Establish who you're selling to and what they believe
2. **Content Ingestion** - Deep-read all program files looking for hidden root causes
3. **Mechanism Mining** - Extract candidates, run 5 quality tests, cut failures
4. **Research Sprint** - Run the Deep Research orchestrator + parallel agents to find academic backing, case studies, statistics, visual metaphors
5. **Development** - Build full UMP/UMS/UMD structure with research integrated
6. **Layering** - Determine how mechanisms work together in sales copy
7. **Scoring** - Run 13-dimension V3 Scorecard evaluation on each mechanism
8. **Output** - Create folder structure with all deliverables

---

## Prerequisites

1. **Claude Code** installed and working
2. **Deep Research Skill** installed (strongly recommended for Phase 3)
   - If you haven't installed it yet, install that package first
   - The Mechanism Ideator uses Deep Research to gather academic evidence, case studies, and statistics for each mechanism

---

## Installation

### Mac (Terminal)

```bash
cd ~/Downloads/Mechanism-Ideator
chmod +x install.sh
./install.sh
```

### Windows (PowerShell)

```powershell
cd ~/Downloads/Mechanism-Ideator
.\install.ps1
```

The installer will check for the Deep Research prerequisite and warn you if it's missing.

---

## How to Use

After installation, tell Claude Code:

```
/mechanism-ideator-package Review my course modules and create mechanisms
```

Or:

```
/mechanism-ideator-package Analyze these coaching call transcripts for mechanism opportunities
```

### What You Need to Provide

1. **Program content files** - Course modules, transcripts, coaching calls, product specs. The more content, the better.
2. **Target market** - Who you're selling to (health, business, finance, IM, etc.)
3. **What your prospect believes** - Their current explanation for why they're failing
4. **What they've tried** - Previous solutions that didn't work

---

## What You Get Back

### Per Mechanism:
- Named mechanism that passes 5 quality tests
- Full UMP/UMS/UMD structure
- Sales letter sentence draft
- Academic citations with verified sources
- 3-5 case studies with specific numbers
- 5+ statistics with sources
- Visual metaphor with copy angle
- 13-dimension score out of 130

### Overall:
- Mechanism rankings table
- Narrative layering strategy (which mechanism goes where in copy)
- Cross-mechanism analysis
- Research folder with all supporting evidence
- Individual evaluation files per mechanism

---

## The 13-Dimension V3 Scorecard

Every mechanism is scored on:

| # | Dimension | What It Measures |
|---|-----------|-----------------|
| 1 | Novelty | Fresh perspective they haven't heard |
| 2 | Specificity | Named, concrete, not generic |
| 3 | Scientific Credibility | Research/evidence backing |
| 4 | Visual Clarity | Can picture it with eyes closed |
| 5 | Emotional Resonance | Creates emotional response |
| 6 | Enemy Clarity | Clear, hateable villain |
| 7 | Inevitability | Urgency (accumulating/recurring) |
| 8 | Solution Elegance | Simple, direct, "of course" feeling |
| 9 | Unique Ownership | Only you can claim this |
| 10 | Paradigm Shift Power | Changes how they see the problem |
| 11 | False Solution Destruction | Explains why everything else fails |
| 12 | Market Sophistication Calibration | Right level for audience |
| 13 | Proof Integration | Evidence woven throughout |

**Scoring:** 0-49 Weak | 50-69 Below Average | 70-89 Average | 90-109 Strong | 110-119 Excellent | 120-130 Elite

---

## What's Installed

```
~/.claude/skills/mechanism-ideator-package/
├── SKILL.md                              (the complete 8-phase process)
└── references/
    ├── mechanism-taxonomy.md              (UMP/UMS/UMD structure, classification)
    ├── e-level-guide.md                   (E1-E5 sophistication levels)
    ├── naming-patterns.md                 (6 naming formulas + phonetics)
    ├── visual-metaphors.md               (8 metaphor categories + scoring)
    ├── villain-frameworks.md             (10 archetypes + 7 attack patterns)
    ├── extraction-patterns.md            (content mining checklist)
    └── evaluator-rubrics.md              (13-dimension scoring rubrics)
```

---

## Troubleshooting

**"Deep Research skill not found" warning:**
Install the Deep Research Skill package first. The Mechanism Ideator uses it in Phase 3 to gather evidence. Without it, you'll fall back to WebSearch which provides less thorough results.

**Mechanisms sound too generic:**
This usually means Phase 0 (Market Context) wasn't specific enough. Be exhaustive about what the prospect has tried and what they believe.

**Low scores on Scientific Credibility / Proof Integration:**
Run the Deep Research orchestrator again with more specific queries targeting the weak mechanisms.

---

## Example Output

When run on an AI training program, this package produced:

| Rank | Mechanism | Score | Best For |
|------|-----------|-------|----------|
| #1 | The Motor Swap | 102/130 | Cold traffic lead |
| #2 | The Complexity Inversion | 101/130 | Paradigm shift, competitive moat |
| #3 | Trained Incapacity | 100/130 | Personal diagnosis |
| #4 | The Advantage Window | 96/130 | Urgency/FOMO |
| #5 | The Phase 1 Ceiling | 94/130 | Why courses don't help |

Each mechanism included verified academic citations, 20+ case studies with specific numbers, statistical proof tables, and visual metaphors.

---

*Packaged by Rich Schefren - Strategic Profits*

*Based on frameworks from: Stefan Georgi (RMBC), Todd Brown (E5), Evaldo Albuquerque (One Belief), David Deutsch (4C's+2H's), Eugene Schwartz (Market Sophistication), Clayton Makepeace, Gary Halbert, John Carlton*
