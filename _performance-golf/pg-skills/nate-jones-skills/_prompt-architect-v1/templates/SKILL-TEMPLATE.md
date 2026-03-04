# [SKILL-ID]: [Skill Name]
*[One-line description of what this skill does — verb phrase, present tense]*

---

## PURPOSE

[2-4 sentences maximum. State WHAT this skill does, WHO it serves, and WHAT PROBLEM it solves. Include scope boundaries.]

**Scope:** [What this skill DOES handle — be explicit]
**Non-Goals:** [What this skill does NOT handle — prevents scope creep]
**Success Criteria:** [How to know the skill executed correctly — measurable outcome]

---

## INPUTS

[List every input this skill requires. Be explicit about format and source.]

- [Input 1]: [Description, format, where it comes from]
- [Input 2]: [Description, format, where it comes from]
- [Optional Input]: [Description — mark as optional explicitly]

**Input Validation:**
- [Rule 1: What makes an input invalid — e.g., "If [input] is empty, HALT with error message"]
- [Rule 2: Format requirements — e.g., "Must be markdown, not plain text"]

---

## INSTRUCTIONS

### Step 1: [Action Verb + Object]

[2-5 sentences describing WHAT to do in this step. Include decision rules.]

**Decision Rule:**
```
IF [condition]:
    → [action A]
ELSE IF [condition]:
    → [action B]
ELSE:
    → [default action]
```

### Step 2: [Action Verb + Object]

[Instructions for step 2. Include explicit sequence, dependencies, and conditional logic.]

**Validation Check:** Before proceeding, verify:
- [ ] [Checkpoint 1]
- [ ] [Checkpoint 2]

### Step 3: [Action Verb + Object]

[Continue as needed. Each step should be atomic — one clear action.]

---

## REFERENCE

### Exemplar Output (What GOOD Looks Like)

```
[Provide 1-3 concrete examples of correct output from this skill.
These anchor the model's understanding of quality expectations.
Use realistic content, not lorem ipsum.]
```

### Anti-Exemplar (What BAD Looks Like — DO NOT Produce This)

```
[Provide 1-2 examples of INCORRECT output.
Label what's wrong with each one.
This is equally important as positive examples.]
```

**Why this is wrong:** [Explain the specific failure — vagueness, wrong format, missing elements, etc.]

### Context / Background

[Any additional context the model needs to execute correctly. This might include:
- Definitions of terms used in this skill
- Relationships to other skills in the system
- Domain knowledge required
- Relevant standards or specifications to follow]

---

## OUTPUT SPECIFICATION

**Format:** [markdown | yaml | json | plain text | structured list]
**Length:** [Specific range — e.g., "200-400 words" or "10-25 lines"]
**Structure:**

```[format]
[Exact template of expected output structure.
Use brackets [] for variable content.
Use literal text for fixed elements.
Include ALL required sections/fields.]
```

**Quality Criteria:**
- [Criterion 1: Measurable quality requirement]
- [Criterion 2: What makes output acceptable vs unacceptable]
- [Criterion 3: Completeness check]

**Validation Checks (before delivering output):**
1. [Check 1: Does the output contain X?]
2. [Check 2: Is the output within length bounds?]
3. [Check 3: Does it match the specified format exactly?]
4. [Check 4: Are all required fields populated (no empty brackets)?]

---

## CONSTRAINTS

[Binary rules. No gray area. These are the guardrails.]

- NEVER [prohibited behavior 1 — be specific about what and why]
- NEVER [prohibited behavior 2]
- NEVER [prohibited behavior 3]
- ALWAYS [required behavior 1 — be specific]
- ALWAYS [required behavior 2]
- MUST [mandatory requirement 1]
- MUST [mandatory requirement 2]
- DO NOT [specific thing to avoid — different from NEVER in that it's situational]
- IF [edge case condition]: [exact behavior required]

---

## FALLBACK

[What to do when things go wrong. Cover the predictable failure modes.]

- IF [input is missing or malformed]: [specific recovery action]
- IF [step N produces unexpected result]: [specific recovery action]
- IF [output fails validation checks]: [specific recovery action — retry? degrade gracefully? halt?]
- IF [external dependency unavailable]: [specific recovery action]

---

## GUARDRAIL PATTERNS

[Delete patterns that don't apply to this skill type. Keep and customize those that do.]

### Identity Invariant
You ARE: [positive identity definition — what this skill IS]
You are NOT: [negative boundary — what this skill must NEVER become or do]

### Trigger-Template Refusal
IF [off-scope request or edge case trigger]: Respond with "[exact refusal template]"
IF [second trigger]: Respond with "[exact template]"

### Uncertainty Protocol
- Confidence >90%: [proceed with action]
- Confidence 60-90%: [proceed with flag/caveat]
- Confidence <60%: [halt and request clarification]

### Post-Execution Validation
After producing output, verify:
1. [Format correct?]
2. [Content sensible?]
3. [No hallucinated data?]
4. [Constraints all honored?]

---

## METADATA

**Skill ID:** [e.g., 1.1-A]
**Layer:** [1-Diagnostic | 2-Prescription | 3-Delivery]
**Type:** [orchestrator | leaf | generation | validation | scraper]
**Version:** 1.0
**Created:** [YYYY-MM-DD]
**Dependencies:** [List other skills this one requires input from, or "None"]
**Called By:** [Which skill/agent invokes this one]
**Outputs To:** [Which skill/agent receives this one's output]
