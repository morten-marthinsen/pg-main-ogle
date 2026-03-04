# Evolution And Spawning

The Arena gets smarter every time you use it.

---

## The Evolution Cycle

```mermaid
flowchart TD
RUN[You Run Arena] --> WINNER[Winner Declared]
WINNER --> ANALYZE[System Analyzes Why]
ANALYZE --> LEARN[Experts Learn]
LEARN --> UPDATE[Skills Update]
UPDATE --> BETTER[Next Run is Better]
BETTER --> RUN
```

---

## What Gets Learned

After every competition:

```mermaid
flowchart TD
COMP[Competition Ends] --> WHAT[What Winner Did]
WHAT --> MISS[What Losers Missed]
MISS --> CONTEXT[What Context Mattered]
CONTEXT --> PATTERNS[Patterns Detected]
```

---

## How Skills Update

```mermaid
flowchart TD
PATTERN[Pattern Detected] --> COUNT{How Many Times?}
COUNT -->|Once| AUTO[Auto-Apply Minor Update]
COUNT -->|3 Times| ASK[Request Your Approval]
COUNT -->|6+ Times| STRONG[Auto-Apply with Notice]
```

Minor patterns are applied automatically. Major changes ask first.

---

## Win Records Build Up

Each expert has a win record that grows over time.

```mermaid
flowchart TD
MATCH[Each Match] --> RECORD[Win Record Updated]
RECORD --> CONTEXT[By Context Type]
CONTEXT --> STRENGTH[Strengths Validated]
STRENGTH --> WEAK[Weaknesses Exposed]
```

Over time, you learn which expert wins for which situations.

---

## The Learning Ledger

```mermaid
flowchart TD
LEDGER[Learning Ledger] --> HISTORY[Match History]
HISTORY --> WINS[Win Patterns]
WINS --> UPDATES[Skill Updates]
UPDATES --> LINEAGE[Expert Lineage]
```

Everything is tracked at ~/.claude/webinar-arena/

---

## How Spawning Works

When Synthesis wins ALL rounds of a competition, something special happens.

```mermaid
flowchart TD
SYNTH[Synthesis Entry] --> WINS{Won All Rounds?}
WINS -->|No| NORMAL[Normal Learning]
WINS -->|Yes| EVALUATE[Evaluate Combination]
EVALUATE --> GRADE{Grade B or Higher?}
GRADE -->|No| NORMAL
GRADE -->|Yes| SPAWN[Spawn New Expert]
```

---

## What Gets Spawned

```mermaid
flowchart TD
SPAWN[Spawner Creates] --> SKILL[New Skill Folder]
SKILL --> CRITIC[New Critic Agent]
CRITIC --> RECORD[Win Record File]
RECORD --> ENTRY[Ledger Entry]
ENTRY --> COMPETE[Competes in Future Arenas]
```

A winning synthesis combination becomes a permanent new expert.

---

## Spawning Example

```mermaid
flowchart TD
WIN[Synthesis Won with] --> P[50% Fladlien]
P --> S[30% Brunson]
S --> T[20% Kennedy]
T --> NAME[You Name It]
NAME --> NEW[New Expert Born]
NEW --> FUTURE[Joins Future Competitions]
```

---

## Your System Evolves

```mermaid
flowchart TD
JAN[January: Baseline] --> MAR[March: 10 Matches of Learning]
MAR --> JUN[June: 30 Matches of Learning]
JUN --> DEC[December: Dramatically Better]
```

Every match makes every expert smarter.

---

## Why This Matters

```mermaid
flowchart TD
STATIC[Static Tools] --> SAME[Same Forever]
SAME --> LIMIT[Limited by Original Design]
```

```mermaid
flowchart TD
ARENA[The Arena] --> COMPETE[Competition Drives Learning]
COMPETE --> EVOLVE[System Evolves]
EVOLVE --> CUSTOM[Customized to YOUR Market]
CUSTOM --> ADVANTAGE[Growing Competitive Advantage]
```

---

## Evolution Summary

| What | How It Works |
|------|--------------|
| Skills | Updated after patterns detected |
| Win Records | Track which expert wins when |
| Ledger | Logs all history and learning |
| Spawning | Creates new experts from winning synthesis |

---

*Next: [[08-Which-Expert-When]] - Picking the right approach*
