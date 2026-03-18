# Quality Engine v4

**Version:** 4.0 | March 17, 2026
**Origin:** Donnie French's AI Accelerator + Marc Stockman's Quality Engine + PG Marketing OS + PG Creative OS
**Platform:** System-agnostic. Works with Claude Code, Gemini CLI, OpenAI, Cursor, or any AI platform that accepts markdown instructions.

---

## What Is This?

The Quality Engine v4 is the complete guardrail and governance system for AI-powered agent workflows. It prevents the failure modes that kill AI projects: context loss, hallucinated outputs, silent quality degradation, change propagation failures, and "drift to raw model" on revisions.

Hand this folder to anyone building or operating an agentic AI system. It will:
1. **Audit** their system against every best practice we've discovered
2. **Provide** the actual protocol files they need to implement
3. **Walk them through** upgrading their system phase by phase

## What's New in v4

| Version | Focus | Key Additions |
|---------|-------|---------------|
| **v1** | Foundation | 16 skills, 20 rules, behavioral enforcement |
| **v2** | Engine | 25+ skills, 28 rules, 4-tier enforcement (behavioral → structural → event-driven → context-isolated), 10 gates, 8 detectors |
| **v3** | Evaluation | Single-document system map, evaluation protocol, cross-reviewer synthesis |
| **v4** | Implementation | Full implementable package: core governance, 13 protocols, 8 templates, hook system, audit checklist, implementation guide. Incorporates all Marketing OS improvements + Creative OS reverse findings |

### What v4 Adds Beyond v3

1. **Core governance files** — SYSTEM-CORE, Anti-Degradation with adapter pattern, Gate System, Effort Protocol, Execution Guardrails
2. **13 protocols** — Arena, Pipeline Handoff, Constraint Ledger, Fact Change Propagation, Feedback/Revision, Adaptive Compaction, Humanization, Anti-Slop Lexicon, Self-Learning Promotion, Challenger, Specimen Guide, Scoped Verification, Active Recitation
3. **8 templates** — Session Architecture, Operations Manual, MCP Tool Registry, Output Structure, Protocol Manifest, Agent Provisioning, Skill Loading Profile, Learning System
4. **Hook system** — Automated validators (dispatch, token estimator, gate validator, schema validator, fact change validator, forbidden status validator) with session reset
5. **System Audit Checklist** — 58-item master checklist for auditing any agentic system
6. **Implementation Guide** — Phased walkthrough from audit to full implementation

---

## What's In This Package

```
Quality-Engine-v4/
├── README.md                          # You are here
├── IMPLEMENTATION-GUIDE.md            # Step-by-step upgrade walkthrough
├── SYSTEM-AUDIT-CHECKLIST.md          # 58-item audit checklist
├── changelog.md                       # v1 → v2 → v3 → v4 evolution
│
├── core/                              # Foundation — read these first
│   ├── SYSTEM-CORE.md                 # Universal execution constraints (The 7 Laws)
│   ├── ANTI-DEGRADATION-CORE.md       # Structural enforcement + adapter pattern
│   ├── GATE-SYSTEM.md                 # PASS/FAIL gates, forbidden statuses
│   ├── EFFORT-PROTOCOL.md             # Thinking depth mapping (max/high/medium/low)
│   └── EXECUTION-GUARDRAILS.md        # Read declarations, GATE_0, pre-flight
│
├── protocols/                         # Specialized protocols — load as needed
│   ├── ARENA-CORE-PROTOCOL.md         # 7-competitor creative competition
│   ├── PIPELINE-HANDOFF-REGISTRY.md   # Inter-skill/agent data contracts
│   ├── CONSTRAINT-LEDGER-PROTOCOL.md  # Decision tracking (YAML)
│   ├── FACT-CHANGE-PROPAGATION.md     # Mid-pipeline change management
│   ├── FEEDBACK-REVISION-PROTOCOL.md  # 3-level revision handling
│   ├── ADAPTIVE-COMPACTION-PROTOCOL.md# Context pressure management
│   ├── HUMANIZATION-PROTOCOL.md       # AI pattern elimination (3-layer)
│   ├── ANTI-SLOP-LEXICON.md           # Banned AI-sounding words
│   ├── SELF-LEARNING-PROMOTION.md     # L1-L6 learning + failure-to-rule
│   ├── CHALLENGER-PROTOCOL.md         # FLAG/BLOCK/CONVINCE ME
│   ├── SPECIMEN-GUIDE.md              # Golden examples + admission criteria
│   ├── SCOPED-VERIFICATION-PROTOCOL.md# Staged verification points
│   └── ACTIVE-RECITATION-PROTOCOL.md  # Mid-pipeline anchor refresh
│
├── templates/                         # Copy and customize for your system
│   ├── SESSION-ARCHITECTURE.md        # Model assignment template
│   ├── OPERATIONS-MANUAL.md           # System operations template
│   ├── MCP-TOOL-REGISTRY.md           # Tool dependency mapping
│   ├── OUTPUT-STRUCTURE.md            # Canonical output directory
│   ├── PROTOCOL-MANIFEST.md           # Conditional protocol loading
│   ├── AGENT-PROVISIONING.md          # New agent/skill setup checklist
│   ├── SKILL-LOADING-PROFILE.yaml     # YAML loading profile
│   └── LEARNING-SYSTEM.md            # Failure-to-rule learning template
│
└── hooks/                             # Automated enforcement
    ├── README.md                      # Hook setup guide
    ├── dispatch-validator.sh          # Main dispatcher
    ├── reset-token-state.sh           # Session start reset
    └── validators/
        ├── token_estimator.py         # Context zone tracking
        ├── gate_validator.py          # Gate PASS/FAIL enforcement
        ├── schema_validator.py        # Schema compliance
        ├── fact_change_validator.py   # Stale value detection
        └── forbidden_status_validator.py # Banned gate statuses
```

---

## How to Use This Package

### Path 1: Audit Your Existing System (2-3 hours)

1. Read `SYSTEM-AUDIT-CHECKLIST.md`
2. Score your system against all 58 items: HAS / PARTIAL / MISSING
3. The checklist tells you which `core/`, `protocols/`, or `templates/` files to implement for each gap
4. Use `IMPLEMENTATION-GUIDE.md` for the phased upgrade plan

### Path 2: Build a New System From Scratch (1-2 days)

1. Start with `core/SYSTEM-CORE.md` — load it as your top-level governance
2. Add `core/ANTI-DEGRADATION-CORE.md` — create adapters for each skill/agent
3. Add `core/GATE-SYSTEM.md` — define your gates
4. Copy `templates/` files and fill in the `[PLACEHOLDERS]` for your system
5. Add protocols as needed from `protocols/`
6. Set up hooks from `hooks/`

### Path 3: Quick Start — Minimum Viable QE (2-3 hours)

If you want the highest-leverage pieces first:

| Priority | What | File | Why |
|----------|------|------|-----|
| 1 | Universal execution rules | `core/SYSTEM-CORE.md` | Prevents the most common failure modes |
| 2 | Anti-degradation enforcement | `core/ANTI-DEGRADATION-CORE.md` | Structural barriers that can't be bypassed |
| 3 | Gate system | `core/GATE-SYSTEM.md` | PASS/FAIL gates stop bad outputs from propagating |
| 4 | Learning system | `templates/LEARNING-SYSTEM.md` | Captures mistakes so the system improves over time |
| 5 | Fact change propagation | `protocols/FACT-CHANGE-PROPAGATION.md` | Prevents stale values from poisoning downstream |

### For AI Systems: How to Parse This Package

If you are an AI system reading this package:
1. Read this README
2. Read `core/SYSTEM-CORE.md` — understand the universal rules
3. Read `core/ANTI-DEGRADATION-CORE.md` — understand the enforcement model
4. Read `SYSTEM-AUDIT-CHECKLIST.md` if auditing an existing system
5. Read `IMPLEMENTATION-GUIDE.md` if implementing upgrades
6. Load protocols from `protocols/` as needed based on the audit results
7. All files are plain markdown — no platform-specific syntax

---

## Design Principles

1. **Structures over instructions** — A gate that requires a file to exist cannot be bypassed. An instruction to "remember to check" can be ignored.
2. **Defaults enforce quality** — The default state is HALT. If a threshold isn't met, the system stops. Quality is opt-out, not opt-in.
3. **System-agnostic** — Nothing in this package uses platform-specific syntax. Every file is plain markdown or standard Python/Bash. Works with any AI tool.
4. **Adapters over duplication** — Core rules are defined once. Per-skill/agent adapters ADD domain-specific rules without duplicating the universal ones.
5. **Human-in-the-loop calibration** — The system enforces structure but humans make strategic decisions. Gates halt execution; humans decide next steps.
6. **Living system** — The learning protocol, humanization library, and issue logger grow with every campaign. The system gets better because real failures drive real improvements.

---

## Lineage

This system stands on the shoulders of:
- **Donnie French** — Original AI Accelerator (12 behavioral rules), PG Marketing OS (40+ protocols, 85 skills, 11 engines), PG Creative OS governance
- **Marc Stockman** — Quality Engine v1-v3 (25+ skills, 28 rules, 4-tier enforcement, evaluation protocol)
- **Christopher Ogle** — PG Creative OS agent architecture (Orion, Tess, Veda, Neco), anti-degradation adapter pattern, effort protocol, challenger protocol
- **Battle-tested** across 200+ sessions, multiple campaigns, real failure events that drove every protocol in this package
