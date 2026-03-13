# Technical Design Document Template

Use this for systems that must run reliably for months without oversight.

```markdown
# [System Name] - Technical Design Document

## Overview
[One paragraph: what it does, why it exists, what's in/out of scope]

## Architecture
[Diagram or description of components and connections]

## Dependencies

| Dependency | Purpose | If Unavailable |
|------------|---------|----------------|
| [Service]  | [Why needed] | [What happens, how to recover] |

## Data Flow
[Input → Processing steps → Output]

## Failure Modes

| Failure | Detection | Impact | Auto-Response | Manual Recovery |
|---------|-----------|--------|---------------|-----------------|
| [What breaks] | [How you'd know] | [Severity] | [System does what] | [Human does what] |

## Observability
- **Logging:** [What/Where/Format]
- **Alerting:** [Conditions/Delivery method]
- **Health checks:** [Method/Frequency]
- **Status:** [Where to look for current state]

## Testing
- **Pre-deployment:** [What tests to run]
- **Ongoing:** [Self-tests, frequency]
- **Manual verification:** [How a human checks it's working]

## Operations
- **Start:** [Command or procedure]
- **Stop:** [Command or procedure]
- **Update:** [Deployment procedure]
- **Rollback:** [How to revert]

## Recovery Procedures

### [Scenario 1: e.g., API token expired]
1. [Step]
2. [Step]

### [Scenario 2: e.g., Database connection lost]
1. [Step]
2. [Step]
```
