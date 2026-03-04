# ZenithPro Copy Arsenal - Arena Competition Flow

## How a Competition Works

```mermaid
flowchart TD
START((Brief)) --> PHASE1[Phase 1: Draft]
PHASE1 --> PHASE2[Phase 2: Critique]
PHASE2 --> PHASE3[Phase 3: Revise]
PHASE3 --> PHASE4[Phase 4: Judge]
PHASE4 --> WINNER((Winner))
```

---

## Phase 1: Drafting

```mermaid
flowchart TD
BRIEF[Your Brief] --> CLAY[Clayton Drafts]
CLAY --> CARL[Carlton Drafts]
CARL --> DEUT[Deutsch Drafts]
DEUT --> EVAL[Evaldo Drafts]
EVAL --> SYNTH[Synthesis Drafts]
SYNTH --> FIVE[5 Entries Ready]
```

All four masters plus one synthesis entry draft simultaneously.

---

## Phase 2: Critique

```mermaid
flowchart TD
ENTRIES[5 Entries] --> CLAYC[Clayton Critic]
CLAYC --> CARLC[Carlton Critic]
CARLC --> DEUTC[Deutsch Critic]
DEUTC --> EVALC[Evaldo Critic]
EVALC --> SYNTHC[Synthesis Critic]
SYNTHC --> FEEDBACK[All Feedback Ready]
```

Each entry gets evaluated by its methodology critic.

---

## Phase 3: Revision

```mermaid
flowchart TD
FEEDBACK[Critic Feedback] --> REV1[Clayton Revises]
REV1 --> REV2[Carlton Revises]
REV2 --> REV3[Deutsch Revises]
REV3 --> REV4[Evaldo Revises]
REV4 --> REV5[Synthesis Revises]
REV5 --> REVISED[5 Revised Entries]
```

Each entry incorporates critic feedback.

---

## Phase 4: Judgment

```mermaid
flowchart TD
REVISED[5 Revised Entries] --> JUDGE[Marketplace Judge]
JUDGE --> COMPARE[Compare All]
COMPARE --> PREDICT[Predict Marketplace Winner]
PREDICT --> DECLARE[Declare Winner]
```

The Marketplace Judge evaluates based on:
- Buyer psychology
- Direct response fundamentals
- Conversion probability

---

## After Judgment

```mermaid
flowchart TD
WINNER[Winner Declared] --> RECORD[Record Win]
RECORD --> USER{User Override?}
USER -->|Yes| OVERRIDE[New Winner Recorded]
USER -->|No| LEARN[Learning Integrated]
OVERRIDE --> LEARN
LEARN --> NEXT{More Rounds?}
NEXT -->|Yes| PHASE1[Next Round]
NEXT -->|No| FINAL[Final Winner]
```

---

## Multi-Round Competition

```mermaid
flowchart TD
R1[Round 1] --> W1[Winner 1]
W1 --> IMPROVE1[All Improve]
IMPROVE1 --> R2[Round 2]
R2 --> W2[Winner 2]
W2 --> IMPROVE2[All Improve]
IMPROVE2 --> R3[Round 3]
R3 --> FINAL[Final Winner]
```

Each round, entries improve based on previous feedback.

---

## Running an Arena

**Command:** `/arena [project-name] [rounds]`

**Example:** `/arena landing-page 3`

This runs a 3-round competition for a landing page.

---

## What You Get

```mermaid
flowchart TD
ARENA[Arena Run] --> OUTPUT1[Winning Entry]
OUTPUT1 --> OUTPUT2[All 5 Versions]
OUTPUT2 --> OUTPUT3[Critic Feedback]
OUTPUT3 --> OUTPUT4[Judge Reasoning]
OUTPUT4 --> OUTPUT5[Learning for Future]
```

---

*Part of the ZenithPro Copy Arsenal Diagram Set*
