# What You Get

Understanding the outputs from an Arena run.

---

## Your Complete Output

```mermaid
flowchart TD
ARENA[Arena Run] --> VERS[7 Webinar Versions]
VERS --> RANK[Rankings with Scores]
RANK --> REASON[Judge Reasoning]
REASON --> LEARN[Learning Briefs]
LEARN --> DATA[Win Record Updates]
```

---

## The 7 Webinar Versions

Each expert produces a complete webinar structure.

```mermaid
flowchart TD
VERSIONS[7 Versions] --> V1[Fladlien Version]
V1 --> V2[Cage Version]
V2 --> V3[Brunson Version]
V3 --> V4[Kern Version]
V4 --> V5[Joon Version]
V5 --> V6[Kennedy Version]
V6 --> V7[Synthesis Version]
```

Each includes:
- Complete webinar structure
- Opening through close
- Specific frameworks used
- Why they made their choices

---

## The Rankings

```mermaid
flowchart TD
JUDGE[Judge Evaluates] --> FIRST[1st Place: Winner]
FIRST --> SECOND[2nd Place]
SECOND --> THIRD[3rd Place]
THIRD --> REST[4th through 7th]
REST --> SCORES[All with Scores]
```

| Rank | What It Means |
|------|---------------|
| 1st | Predicted marketplace winner |
| 2nd-3rd | Strong alternatives |
| 4th-7th | Different approaches that could work |

---

## The Score Breakdown

```mermaid
flowchart TD
SCORE[Total Score] --> S1[Stopping Power: 20%]
S1 --> S2[Believability: 15%]
S2 --> S3[Desire Activation: 20%]
S3 --> S4[Objection Handling: 15%]
S4 --> S5[Offer Clarity: 10%]
S5 --> S6[Risk Reversal: 10%]
S6 --> S7[Creative Strategy: 10%]
```

---

## Judge Reasoning

```mermaid
flowchart TD
REASON[Judge Explains] --> WHY[Why Winner Won]
WHY --> DIFF[What Made Difference]
DIFF --> COMPARE[How Others Compared]
COMPARE --> PREDICT[Conversion Predictions]
```

Not just a score - an explanation you can learn from.

---

## Learning Briefs

Each competitor receives feedback.

```mermaid
flowchart TD
BRIEF[Learning Brief] --> WELL[What They Did Well]
WELL --> HURT[What Hurt Them]
HURT --> STEAL[What to Steal from Winner]
```

This is how the system learns and improves.

---

## How To Use Your Outputs

### Option 1: Use The Winner

```mermaid
flowchart TD
WINNER[Take Winner] --> USE[Use As-Is]
USE --> REFINE[Refine for Your Voice]
REFINE --> LAUNCH[Launch Webinar]
```

### Option 2: Pick A Different One

```mermaid
flowchart TD
PREFER[Prefer Different Version] --> PICK[Pick It]
PICK --> OVERRIDE[Override Recorded]
OVERRIDE --> CALIBRATE[System Learns Your Taste]
```

### Option 3: Combine Elements

```mermaid
flowchart TD
MULTIPLE[Like Parts of Several] --> TAKE[Take Best Elements]
TAKE --> COMBINE[Combine Them]
COMBINE --> CUSTOM[Custom Version]
```

---

## Where Outputs Are Saved

```mermaid
flowchart TD
SAVE[Saved To] --> PROJ[Project Folder]
PROJ --> LED[Ledger Updated]
LED --> WIN[Win Records Updated]
WIN --> SYNTH[Synthesis Registry]
```

Location: ~/.claude/webinar-arena/projects/

---

## Quick Reference

| Output | What It Contains |
|--------|------------------|
| 7 Versions | Complete webinar structures |
| Rankings | 1st through 7th with scores |
| Judge Reasoning | Why winner won |
| Learning Briefs | Feedback for each expert |
| Win Records | Historical performance data |

---

*Next: [[06-How-Judgment-Works]] - The scoring system explained*
