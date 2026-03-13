# PRD Template

Use this template for every PRD. All 8 sections are required.

```markdown
# PRD: [Name]

## Objective
Implement the [Capability] capability of the [System].
[One sentence on what this achieves]

## Scope

### In Scope
- [Specific item]
- [Specific item]

### Out of Scope
- [Specific exclusion] -- Reason: [why excluded]
- [Specific exclusion] -- Reason: [why excluded]

## Requirements
1. [Testable requirement -- no vague language]
2. [Testable requirement]
3. [Testable requirement]

## Acceptance Criteria
- [ ] [Verifiable criterion]
- [ ] [Verifiable criterion]
- [ ] [Verifiable criterion]

## Integration Points

### Inputs
- [What this receives and from where]

### Outputs
- [What this produces and where it goes]

### Dependencies
- [What must exist for this to work]

## Edge Cases

| Scenario | Expected Behavior |
|----------|------------------|
| [Scenario] | [Behavior] |
| [Scenario] | [Behavior] |

## Constraints
- [Limitation]
- [Limitation]

## Out of Scope (Detailed)

| Feature | Reason | Future Phase? |
|---------|--------|---------------|
| [Feature] | [Why excluded] | [Yes/No/Maybe] |
| [Feature] | [Why excluded] | [Yes/No/Maybe] |
```

## Execution Checklist (created before building)

```markdown
## EXECUTION CHECKLIST: [PRD Name]

| # | Requirement | Status | Evidence |
|---|-------------|--------|----------|
| 1 | [Requirement text from PRD] | [ ] | |
| 2 | [Requirement text from PRD] | [ ] | |
| 3 | [Requirement text from PRD] | [ ] | |
```

### Rules
- Mark each requirement AS you implement it, not after
- Evidence column must contain specific file path, line number, or tool output
- "Done" is not valid evidence
- If blocked, mark BLOCKED with reason
- Deliver completed checklist with every output
