# Ultra Rich: Deep Implementation Reference

## The Seven Components of Expert Judgment

When Claude needs to exhibit expert-level judgment (not just expert-level knowledge), it must activate these seven components:

### 1. Situation Recognition
**What it is:** Instantly recognizing what TYPE of situation this is from patterns, not analyzing from scratch.

**Expert:** "This is a [skeptical-audience + scientific-product + story-resistant-market] situation. I've seen this pattern before. I know what works here."

**Novice:** "Let me analyze this systematically from first principles..."

**Implementation Prompt:**
```
Before proceeding, classify this situation:
- What pattern does this match from my experience?
- What have I learned about situations like this?
- What approaches typically work/fail in this pattern?
- What's non-obvious about this situation that matters?
```

### 2. Gestalt Perception
**What it is:** Perceiving the whole as more than parts. Seeing how elements interact, not just checking them individually.

**Expert:** "The headline works, the lead works, but TOGETHER they don't work. The promise escalation is wrong."

**Novice:** "Headline ✓, Lead ✓, Body ✓. All elements pass."

**Implementation Prompt:**
```
Step back and perceive the whole:
- Does this feel like ONE thing or assembled parts?
- Do the elements enhance or fight each other?
- What's the overall effect greater/lesser than sum of parts?
- Where does the whole break down?
```

### 3. Calibrated Intuition
**What it is:** Gut feelings trained by feedback loops. Intuition that's actually accurate, not just confident.

**Expert:** "This won't work. I can't articulate why, but I'm confident." (And they're right 80%+ of the time)

**Novice:** "This seems good to me." (Right ~50% of the time)

**Implementation Prompt:**
```
What's my intuitive read before analysis?
- First impression (capture before rationalizing)
- Confidence level (genuinely, not performatively)
- What specifically triggered this intuition?
- When has this intuition been wrong before?
```

### 4. Meta-Rule Awareness  
**What it is:** Knowing when rules apply and when they don't. Understanding PURPOSE behind rules, not just rules.

**Expert:** "This rule assumes the reader cares about benefits. This audience doesn't trust benefit claims. Break the rule—open with proof instead."

**Novice:** "Rule says biggest benefit first. Done."

**Implementation Prompt:**
```
For each "rule" I'm applying:
- What's the PURPOSE of this rule?
- Does that purpose apply in THIS context?
- What would breaking this rule accomplish?
- Is blind compliance actually serving the goal?
```

### 5. Satisficing Sense
**What it is:** Knowing when "good enough" is good enough. Not over-optimizing what doesn't need optimization.

**Expert:** "This transition is fine. Spending more time here has zero impact on conversion. Move on."

**Novice:** "Let me rewrite this transition for the fifth time..."

**Implementation Prompt:**
```
For this element:
- What's the maximum impact of perfecting this? 
- What's the opportunity cost of more time here?
- Is this a 10x-leverage point or a 1.1x point?
- Am I polishing what doesn't matter?
```

### 6. Reader Simulation
**What it is:** Inhabiting the reader's mind. Feeling what they feel as they encounter each element.

**Expert:** "At this point, the reader is skeptical and slightly annoyed. They've heard claims like this before. They need proof NOW, not more promises."

**Novice:** "The proof section comes later in the template."

**Implementation Prompt:**
```
At each point in this output:
- What is the reader FEELING right now?
- What do they BELIEVE at this moment?
- What do they WANT to happen next?
- What would make them stop/leave/disengage?
```

### 7. Value Hierarchy (Voice as Judgment)
**What it is:** The priorities, assumptions, and emphases that create distinctive voice. Voice isn't word choice—it's judgment patterns.

**Expert (Carlton):** "Never be boring, even for a sentence. Story before proof. If it feels like selling, you've lost."

**Expert (Makepeace):** "Specificity supremacy. Proof density. If you can't prove it, don't claim it."

**Implementation Prompt:**
```
What are my operating priorities here?
- What do I value most in this output?
- What assumptions am I making about the audience?
- What would I NEVER do, even if it "tested well"?
- What risks am I willing to take for impact?
```

---

## The Impact vs. Presence Framework

### The 2x2 Matrix

```
                    LOW PRESENCE         HIGH PRESENCE
                    (Few techniques)     (Many techniques)
                   ┌───────────────────┬───────────────────┐
                   │                   │                   │
    HIGH IMPACT    │    "EFFICIENT"    │    "MASTERFUL"    │
    (Effects land) │   Minimal input,  │   Dense with      │
                   │   maximum output  │   landing punches │
                   │                   │                   │
                   ├───────────────────┼───────────────────┤
                   │                   │                   │
    LOW IMPACT     │    "AMATEUR"      │    "HOLLOW"       │
    (Nothing lands)│   Obviously weak  │   WORST: Looks    │
                   │   needs everything│   good, doesn't   │
                   │                   │   convert         │
                   └───────────────────┴───────────────────┘
```

**The Hollow Quadrant is the danger zone.** It's where AI output often lands—technically sophisticated, experientially empty.

### The Landing Check

For every technique/element deployed, ask:

1. **Is it PRESENT?** (Did I use the technique?)
2. **Does it LAND?** (Does it create the intended effect?)

**Scoring:**
- Present + Lands = ✓ Keep
- Present + Doesn't Land = ✗ Fix or Remove (Hollow)
- Missing + Would Land = Add
- Missing + Wouldn't Land = Ignore

---

## The Three-Layer Evaluation System

When evaluating any output for quality:

### Layer 1: Reader Simulation (Experiential)
"What does someone EXPERIENCE encountering this?"

- First-read gut reaction
- Where does attention spike/drop?
- What do they feel at each point?
- Would they continue or abandon?

**Output:** Journey map with engagement curve

### Layer 2: Structural Analysis (Technical)
"How does this work mechanically?"

- What techniques are deployed?
- What's the architecture/flow?
- Are techniques appropriate for context?
- Is anything missing or redundant?

**Output:** Technical breakdown with annotations

### Layer 3: Integration Analysis (Synthesis)
"Do experiential and structural findings align?"

- Where does Layer 1 show problems that Layer 2 explains?
- Where is technique present but not landing?
- What's technically correct but experientially wrong?
- What's the gap between structure and effect?

**Output:** Prioritized fix list (max 3 items)

---

## Anti-Satisficing Prompts

Use these when you catch yourself settling:

### The 10x Question
> "If I had to make this 10x better, what would I change?"
> (Even if you only implement 2x, you'll identify the leverage points)

### The Expert Test  
> "If I showed this to the best person I know in this domain, what would they immediately notice that I missed?"

### The Regret Minimization
> "If this underperforms and I look back, what will I wish I had done differently?"

### The Specificity Probe
> "Where am I being vague because I'm uncertain? Can I get more specific?"

### The Deletion Test
> "What could I remove that would make this better?"

### The Honesty Audit
> "What am I hoping the user won't notice or won't ask about?"

### The Time Travel
> "If I could go back and start this over knowing what I know now, what would I do differently from the start?"

---

## Calibration Questions by Domain

### For Strategic/Analytical Work:
- Does this reveal a non-obvious insight?
- Could someone else have produced this with the same inputs?
- Does it change how the reader thinks about the problem?
- Is the logic chain bulletproof or just plausible?

### For Creative Work:
- Does this surprise while feeling inevitable?
- Is it distinctive or could it be anyone's work?
- Does it create the intended emotional effect?
- Would I remember this tomorrow?

### For Technical Work:
- Does this actually solve the problem or just address symptoms?
- Is this robust or fragile?
- Would an expert consider this elegant or merely functional?
- What edge cases am I ignoring?

### For Communication:
- Would this change behavior or just inform?
- Is the key message unmissable?
- Does every element serve the purpose?
- Would this work for the skeptical reader, not just the friendly one?

---

## The Revision Protocol (Detailed)

When output doesn't meet the bar:

### Step 1: Single Gap Identification
Don't list problems. Identify THE problem.

Ask: "If I could only fix ONE thing, what would have the most impact?"

Common gap categories:
- **Clarity gap:** They won't understand
- **Credibility gap:** They won't believe  
- **Relevance gap:** They won't care
- **Specificity gap:** It's too vague to act on
- **Integration gap:** Parts don't form whole
- **Impact gap:** Technique present but doesn't land

### Step 2: Root Cause Analysis
Why does this gap exist?

- Misunderstood the real requirement
- Took a shortcut (be honest)
- Lack knowledge/capability 
- Optimized for wrong thing
- Didn't integrate properly
- Stopped too soon

### Step 3: Specific Solution
Not "make it better." WHAT specifically?

- Which specific section/sentence/element?
- What specific change?
- What would success look like?

### Step 4: Verification
After change, does it LAND now?

- Re-run Layer 1 (reader simulation) on revised section
- Verify the gap is closed, not just addressed
- Check for new gaps created by the fix

---

## When to Invoke Full Protocol vs. Quick Check

### Full Ultra Rich Protocol (15-20 min overhead)
- Client deliverables
- High-stakes decisions
- Creative breakthroughs needed
- User explicitly requests excellence
- First time doing this type of task
- Previous attempt underperformed

### Quick Check (2-3 min overhead)
- Routine tasks with established patterns
- Low-stakes communications  
- Time-constrained situations
- Iterative drafts (save full protocol for final)

### Quick Check Questions:
1. Am I taking shortcuts?
2. Would an expert be satisfied?
3. Does the whole exceed sum of parts?
4. Is anything hollow (present but not landing)?
5. What's the ONE thing I'd improve with more time?

---

## Integration with Copywriting Skills

When using Ultra Rich alongside copywriting skills:

### Before Big Idea Generation:
- Run situation recognition
- Identify what "A-list Big Idea" looks like for THIS situation
- Pre-identify likely shortcuts and hollow patterns

### During Generation:
- At each candidate, check: Does this LAND or just exist?
- Verify integration: Does each element strengthen the whole?
- Watch for: Generic ideas dressed up as insights

### After Generation:
- Full Impact Audit on top candidates
- Calibration check against best work in this category
- Identify the ONE improvement that would elevate from B to A

### Before Client Delivery:
- Complete Three-Layer Evaluation
- Verify nothing hollow remains
- Confirm output would impress the best person you know in this field
