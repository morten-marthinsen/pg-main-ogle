---
name: webinar-arena-wildcard
description: Wild Card Methodology Generator for Webinar Arena v2.0. Creates competing webinar methodologies from external source files to inject outside thinking into Arena competitions.
version: 1.0.0
author: Rich Schefren
triggers:
  - /arena-wildcard
  - create wild card
  - wild card from
---

# Wild Card Methodology Generator

## Purpose

Import thinking from outside the webinar domain to challenge established experts. Transform book notes, framework summaries, and other source materials into temporary competing methodologies.

## Command

### `/arena-wildcard [filepath]`

Create a Wild Card competitor from a source file.

**Options:**
- `--focus=[principle]` - Emphasize specific principle from source
- `--name=[name]` - Override auto-generated name
- `--preview` - Show extraction without creating Wild Card

## Quality Gates

Before proceeding with Wild Card creation, the system validates:

### Gate 1: Source Readability
- File exists and is readable
- Contains >100 words of extractable content
- **Fail message:** "Source file is empty or unreadable"

### Gate 2: Principle Extraction
- At least 3 distinct principles can be identified
- Principles are substantive (not just keywords)
- **Fail message:** "Could not extract enough principles from source"

### Gate 3: Relevance
- Principles relate to persuasion, conversion, or influence
- **Warning if not:** "Source may not be relevant to webinar creation. Proceed anyway?"
- User can override

### Gate 4: Novelty
- Approach differs meaningfully from existing 6 experts
- Not a restatement of existing methodology
- **Fail message:** "This approach overlaps too heavily with [Expert]. Consider using that expert instead."

### Gate 5: Coherence
- Extracted principles can form a complete webinar methodology
- Coverage: intro → content → proof → offer → close
- **Fail message:** "Cannot form complete methodology. Consider supplementing with additional source material."

### Gate Failure Options

When a gate fails:
1. **Adjust** - Modify extraction focus
2. **Override** - Proceed anyway (user takes responsibility)
3. **Abort** - Cancel Wild Card creation

## Extraction Process

### Step 1: Read Source File

```
Analyzing source file...

Found: "Influence: The Psychology of Persuasion" notes
Length: 2,847 words
Format: Markdown with bullet points
```

### Step 2: Extract Principles

```
Extracting principles...

Identified 6 core principles:
1. Reciprocity - Give before asking
2. Social Proof - Others are doing it
3. Authority - Expert positioning
4. Scarcity - Limited availability
5. Consistency - Small commitments first
6. Liking - Build rapport

Quality Gate: PASSED (6 principles, all relevant)
```

### Step 3: User Focus Selection

```
Would you like me to:
1. Use all 6 principles (balanced approach)
2. Focus on specific principles (you choose)
3. Let me emphasize what seems most relevant to [current brief]

>
```

### Step 4: Methodology Translation

Transform principles into webinar structure:

| Webinar Element | Question Answered |
|-----------------|-------------------|
| Introduction | How would this source suggest we open? |
| Content | How would it structure the teaching? |
| Proof | What does it say about credibility? |
| Offer | How would it present the offer? |
| Close | What techniques apply to commitment? |
| Energy | What does it imply about delivery? |

### Step 5: Generate Wild Card

```
Creating Wild Card methodology...

## Wild Card: "Cialdini Sequence"

This Wild Card structures the entire webinar around the six
principles of influence in sequential order:

1. OPEN with reciprocity (give massive value upfront)
2. BUILD with social proof (others succeeding)
3. ESTABLISH authority (credentials, expertise)
4. TEACH using consistency (small yeses throughout)
5. CREATE liking (relatability, shared values)
6. CLOSE with scarcity (genuine limitation)

This differs from traditional webinars that lead with authority
and save value for the pitch. Here, value comes first.

Differentiator: "Unlike Brunson's energy-driven approach, I use
calm authority built through demonstrated value."

Wild Card is ready to compete. Add to current Arena?
```

## Wild Card Methodology Structure

```markdown
---
type: wild-card
id: wildcard-[timestamp]-[source-hash]
source: [filepath]
created: [timestamp]
status: active
---

# Wild Card Methodology: [Name]

## Source Analysis

### Extracted Principles
1. **[Principle Name]:** [Description]
   - Core idea: [What this is about]
   - Application: [How it applies to webinars]

[Continue for all principles]

### Underlying Philosophy
[Summary of source's overall approach]

### Key Differentiator
[How this differs from existing experts]

---

## Webinar Methodology Translation

### Introduction Approach
[How to open based on source principles]

### Content Structure
[How to organize teaching]

### Proof Strategy
[How to build credibility]

### Offer Architecture
[How to present the offer]

### Close Strategy
[How to close]

### Energy/Delivery Guidance
[How to deliver]

---

## Self-Description

*"I am a Wild Card methodology based on [Source]. Unlike traditional
webinar approaches that [common pattern], I [key difference]. My
approach centers on [core principle] and structures the entire
presentation around [organizing principle]. Expect the unexpected."*

---

## Competition Record

| Competition | Result | Key Learning |
|-------------|--------|--------------|
| [Pending first competition] | | |

---

*Wild Card ID: wildcard-[id]*
*Created: [date]*
```

## Storage

Wild Cards stored at: `~/.claude/webinar-arena/wild-cards/[id].md`

## Wild Card Log

Maintained at: `~/.claude/webinar-arena/wild-cards/log.md`

```markdown
# Wild Card Experiment Log

## Summary
- **Total Experiments:** [N]
- **Wins:** [N]
- **Win Rate:** [X]%
- **Breakthroughs Extracted:** [N]

## Experiment History

### [ID]
- **Source:** [File path]
- **Competition:** [Project name]
- **Result:** Won | Lost (Xth of Y)
- **Breakthrough:** Yes/No
- **Key Learning:** [One sentence]

[Continue for all experiments]
```

## Competition Integration

When Wild Card enters Arena:
1. Competes alongside 6 experts + synthesis
2. Judge evaluates without bias toward established methods
3. Performance tracked separately in Wild Card log
4. If wins, triggers Breakthrough Extraction (PRD-13)

## Edge Cases

| Scenario | Handling |
|----------|----------|
| Empty/unreadable file | Gate 1 fails, clear error |
| Irrelevant source | Gate 3 warns, user can override |
| Same source used twice | Check log, offer reuse or fresh interpretation |
| Source is webinar methodology | Suggest using as synthesis component instead |
| Vague principles | Ask user for clarification on emphasis |

## Preserving Experiments

All Wild Cards are preserved:
- Winners → May trigger Breakthrough Extraction
- Losers → Still valuable (what didn't work and why)
- Pattern tracking → Which source types tend to win?

---

*Part of Webinar Arena v2.0*
*PRD-12: Wild Card Methodology Generator*
