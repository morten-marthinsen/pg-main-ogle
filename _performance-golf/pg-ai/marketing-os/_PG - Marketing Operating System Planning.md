# Performance Golf Marketing Operating System (MOS) - Planning Document

**Document Type:** Intent Document (Pre-Build Planning)
**Owner:** Don French
**Last Updated:** January 3, 2026
**Status:** ACTIVE - Collaborative Planning Phase

---

## Purpose of This Document

This is the **planning and intent document** for building the Performance Golf Marketing Operating System. This is NOT the final CLAUDE.md file - this is the blueprint we are refining together before we build.

**What this document captures:**
- The architecture and hierarchy of the system we're building
- All skills that need to be evaluated, built, or rebuilt
- Context and training materials as they are gathered
- Decisions made and rationale behind them
- Open questions and items needing resolution

**How this document evolves:**
- As we provide additional training materials (E5 Method, A-Z Copywriting, etc.), this document will be updated
- New skills or steps may be identified and added
- Existing skills in `/PG - Skills/` will be evaluated and either kept, updated, or rebuilt
- Team members can collaborate on this document to refine the vision

---

## The Vision: What We're Building

### The Ultimate Outcome

A `CLAUDE.md` file that lives at the root of the Performance Golf folder. When any team member opens this folder in Claude Code (or any LLM interface), the system immediately:

1. **Understands the PG business context** - Mission, values, market position, customer avatar
2. **Knows the copywriting methodology** - Todd Brown's E5 Method + A-Z Copywriting course principles
3. **Applies the brand voice** - Brixton persona, PG voice pillars, forbidden patterns
4. **Routes intelligently** - Detects the task intent and invokes the appropriate specialized skill
5. **Maintains quality** - Every output follows the principles, regardless of which team member is using it

### The Hierarchy

```
CLAUDE.md (Master Controller)
│
├── LAYER 1: Business Context
│   └── PG mission, values, market position, customer avatar (Ari)
│
├── LAYER 2: Copywriting Methodology (Immutable Principles)
│   ├── Todd Brown E5 Method (structure, framework)
│   ├── A-Z Copywriting Course (technique, mechanics)
│   └── C-P-B Framework (Claim-Proof-Benefit)
│
├── LAYER 3: Brand Voice & Restrictions
│   ├── Brixton Voice Guidelines
│   ├── 11-Point Copy Checklist
│   ├── Forbidden Patterns
│   └── Legal/Compliance Restrictions
│
└── LAYER 4: Skill Router
    └── Intent Detection → Route to Specialized Skill
        ├── Research Skills (nested sub-skills)
        ├── Strategy Skills (Big Idea, Mechanism)
        ├── Long-Form Copy Skills (VSL, Supplement VSL)
        ├── Funnel Page Skills
        ├── Short-Form Copy Skills (Ads by platform)
        ├── Backend Skills (Emails, Upsell Scripts)
        └── Quality Control Skills (Editor)
```

---

## Skill Architecture

### Master Skill List

All skills will be evaluated against the E5 Method and A-Z Copywriting principles. Skills marked "EXISTING" will be reviewed for alignment; skills marked "NEW" will be built from scratch.

#### Research & Intelligence Skills

| Skill                       | Status | Notes                                                                          |
| --------------------------- | ------ | ------------------------------------------------------------------------------ |
| **Research Skill (Parent)** | NEW    | Master research skill that orchestrates sub-skills                             |
| ├── Psychographic Skill     | NEW    | Deep psychological profile of target market                                    |
| ├── Demographic Skill       | NEW    | Statistical/demographic market data                                            |
| ├── TAM Skill               | NEW    | Total Addressable Market analysis                                              |
| ├── Market Awareness Skill  | NEW    | Eugene Schwartz awareness levels, P.E.S. stage                                 |
| └── Competitor Skill        | NEW    | Competitive landscape, mechanism audit                                         |
| └── Social Sentiment Skill  | NEW    | Social media aggregator, scraping comments, forum reviews, community sentiment |

#### Strategy Skills

| Skill | Status | Notes |
|-------|--------|-------|
| **Big Idea Skill** | NEW | Todd Brown big idea development; references Research Skill outputs |
| **Mechanism Skill** | NEW | Unique mechanism positioning; references Research Skill outputs |

#### Long-Form Copy Skills

| Skill | Status | Notes |
|-------|--------|-------|
| **VSL Copywriter Skill** | REBUILD | Currently uses RMBC; needs E5 Method structure |
| **Supplement VSL Copywriter Skill** | NEW | Based on Ben Marcoux's interpretation of Fran Rangel's system |

#### Funnel Page Skills

| Skill | Status | Notes |
|-------|--------|-------|
| **VSL Pages Skill** | EVALUATE | Delay pages, expanded pages |
| **Checkout Pages Skill** | EXISTING | Evaluate for E5 alignment |
| **Upsell 1 Pages Skill** | EXISTING | Good foundation; evaluate for E5 alignment |
| **Upsell 2 Pages Skill** | EXISTING | Good foundation; evaluate for E5 alignment |
| **Downsell Pages Skill** | EVALUATE | May be part of Upsell skills or standalone |
| **E-commerce/Shopify Pages Skill** | NEW | Short-form e-commerce style pages |
| **Presale Pages Skill** | NEW | Pre-VSL content pages |

#### Short-Form Copy Skills

| Skill | Status | Notes |
|-------|--------|-------|
| **Facebook Ads Skill** | NEW | Platform-specific ad copy |
| **YouTube Ads Skill** | NEW | Platform-specific ad copy |
| **TikTok Ads Skill** | NEW | Platform-specific ad copy |
| **Short-Form Description Skill** | NEW | Meta post text, YouTube descriptions, etc. |

#### Backend Skills

| Skill | Status | Notes |
|-------|--------|-------|
| **Upsell 1 Script Skill** | EVALUATE | Video script for upsell 1 |
| **Upsell 2 Script Skill** | EVALUATE | Video script for upsell 2 |
| **Backend Email Skill** | REBUILD | Reference legendary-beast; needs E5 alignment |
| **Blog/Content Skill** | EVALUATE | SEO content, blog articles |
| **SMS/Text Skill** | NEW | Text message copy |
| **Direct Mail Skill** | NEW | Physical mail pieces |

#### Quality Control Skills

| Skill | Status | Notes |
|-------|--------|-------|
| **Editor Skill** | NEW | Universal quality control; applies to ALL copy formats |

---

## Skill Inheritance & Cross-Referencing

### The Inheritance Model

All skills inherit core principles from CLAUDE.md:
- E5 Method structure
- A-Z Copywriting techniques
- PG Brand Voice (Brixton)
- Forbidden patterns and restrictions

### Cross-Referencing Rules

Skills reference each other's outputs. Examples:

| When Using... | References Output From... |
|---------------|---------------------------|
| Big Idea Skill | Research Skill (all sub-skills) |
| Mechanism Skill | Research Skill, Big Idea Skill |
| VSL Copywriter Skill | Research Skill, Big Idea Skill, Mechanism Skill |
| Ads Skills | VSL Copywriter Skill (for hook/angle extraction), Research Skill |
| Editor Skill | All skills (for quality review) |
| Upsell Page Skills | VSL Copywriter Skill (for offer context) |

---

## Existing Skills to Evaluate

The following skills currently exist in `/PG - Skills/` and must be evaluated for alignment with the new system:

### PG-Specific Skills (Priority Evaluation)

- [ ] `pg-brand-guidelines/SKILL.md` - Strong foundation; likely keep with minor updates
- [ ] `pg-copy-voice.md` - Good belief framework; evaluate for E5 integration
- [ ] `pg-vsl-script-writer/SKILL.md` - Uses RMBC; needs E5 rebuild
- [ ] `pg-upsell-1-pages/SKILL.md` - Good structure; evaluate C-P-B implementation
- [ ] `pg-upsell-2-pages/SKILL.md` - Good structure; evaluate C-P-B implementation
- [ ] `pg-checkout-pages/SKILL.md` - Template-based; evaluate
- [ ] `pg-vsl-to-pages/SKILL.md` - Evaluate for integration
- [ ] `pg-backend-legendary-beast.md` - Reference for email skill rebuild
- [ ] `pg-backend-legendary-beast-references/` - Supporting files for email skill
- [ ] `golf-market-research.md` - Evaluate for Research Skill integration
- [ ] `market-psychology-analyzer.md` - Evaluate for Research Skill integration
- [ ] `anthropic-skills/competitive-sophistication-auditor.md` - Evaluate for Competitor Skill
- [ ] `direct-response-email-intelligence-skill.md` - Evaluate for Email Skill
- [ ] `RETENTION_ARCHITECT_SKILL.md` - Evaluate for backend strategy
- [ ] `mission-control.md` - Evaluate; may inform CLAUDE.md structure

### Reference Materials (Not Skills, But Valuable)

- [ ] `E5 CAMP - VSL Notes.md` - Core methodology notes; critical for skill building
- [ ] `PG-MOS-Strategic-Transformation-Roadmap.md` - Strategic context

### Third-Party Skills (Lower Priority)

- [ ] `nate-jones-skills/` - General skills; evaluate for any PG-applicable patterns

---

## Training Materials & Context

### Materials Gathered

| Material | Status | Location | Notes |
|----------|--------|----------|-------|
| E5 CAMP - VSL Notes | COMPLETE | `/PG - Skills/E5 CAMP - VSL Notes.md` | Comprehensive methodology notes |
| SSTS VSL 2024 V2 | COMPLETE | `/PG - Winning Promos/` | Winning promo example |
| SSTS VSL 2025 V3 | COMPLETE | `/PG - Winning Promos/` | Updated version showing evolution |
| PG Brand Guidelines | COMPLETE | `/PG - Skills/pg-brand-guidelines/` | Voice, visual, restrictions |
| Rich Schefren AI Architecture | COMPLETE | `/Rich Schefren/` | Reference for system design |

### Materials Needed

| Material | Priority | Notes |
|----------|----------|-------|
| **A-Z Copywriting Course Transcripts** | CRITICAL | Full Todd Brown copywriting mechanics training |
| **Additional Winning VSL Scripts** | HIGH | More examples of approved copy |
| **Ben Marcoux/Fran Rangel System** | HIGH | For Supplement VSL Skill |
| **Don's Approval Standards** | HIGH | Verbal download or marked-up drafts |
| **Current Market Intelligence** | MEDIUM | Where is the golf market NOW? |
| **Rejected Copy Examples** | MEDIUM | What failed and why |

---

## Key Design Decisions

### Decided

1. **Methodology Base:** Todd Brown E5 Method + A-Z Copywriting (not RMBC)
2. **Voice Source:** PG Brand Guidelines (Brixton persona)
3. **Architecture:** Hierarchical with CLAUDE.md as master controller
4. **Skill Inheritance:** All skills inherit from CLAUDE.md principles
5. **Cross-Referencing:** Skills reference each other's outputs (Research → Big Idea → Mechanism → Copy)
6. **Two VSL Skills:** Standard VSL (E5-based) + Supplement VSL (Fran Rangel-based)
7. **Research Skill Nesting:** Sub-skills for Psychographic, Demographic, TAM, Market Awareness, Competitor

### To Be Decided

- [ ] Folder structure for skills (flat vs. hierarchical)
- [ ] Naming conventions for skill files
- [ ] How skills signal completion/handoff to next skill
- [ ] How Editor Skill interfaces with all other skills
- [ ] Template vs. principle-based skill design
- [ ] Version control approach for skill updates

---

## Comparison: Rich Schefren's Framework vs. Our System

### What We're Adopting From Rich's Architecture

| Rich's Concept | Our Application |
|----------------|-----------------|
| Tiered Framework Organization | Core principles always on; format-specific rules per skill |
| Cascading Contextual Activation | Intent detection in CLAUDE.md routes to right skill |
| Holistic Evaluation | Editor Skill evaluates whole copy, not just checklist |
| Methodology Fidelity | E5/A-Z principles are immutable; execution adapts per format |
| Constrain Skeleton, Free Skin | Structure is locked; expression has latitude |
| Single-Agent Generation | One skill writes; Editor reviews (no committee voice) |

### What We're NOT Doing (Different Use Case)

| Rich's Approach | Why We're Different |
|-----------------|---------------------|
| Arena-based competition | We need consistent output, not experimental learning |
| Multi-methodology agents | We use ONE methodology (Todd Brown) for PG |
| Learning from losses | We're building a factory, not a laboratory |
| Cross-agent skill transfer | Our skills share principles, not compete |

---

## Next Steps

### Immediate (Before Building CLAUDE.md)

1. [ ] Obtain A-Z Copywriting course transcripts
2. [ ] Obtain Ben Marcoux/Fran Rangel system documentation
3. [ ] Don provides approval standards (verbal download or examples)
4. [ ] Team reviews this planning document and adds input
5. [ ] Finalize folder structure decision

### Phase 1: Foundation Skills

1. [ ] Build Research Skill (with nested sub-skills)
2. [ ] Build Big Idea Skill
3. [ ] Build Mechanism Skill
4. [ ] Build Editor Skill

### Phase 2: Core Copy Skills

1. [ ] Rebuild VSL Copywriter Skill (E5-based)
2. [ ] Build Supplement VSL Copywriter Skill (Fran Rangel-based)
3. [ ] Build/Rebuild Backend Email Skill

### Phase 3: Funnel & Short-Form Skills

1. [ ] Evaluate and update Upsell/Checkout page skills
2. [ ] Build Ads Skills (Facebook, YouTube, TikTok)
3. [ ] Build remaining page skills

### Phase 4: CLAUDE.md Creation

1. [ ] Write CLAUDE.md master controller
2. [ ] Implement skill routing logic
3. [ ] Test with team members
4. [ ] Refine based on usage

---

## Open Questions

1. How should the Research Skill output be formatted so other skills can easily reference it?
2. Should there be a "Project Brief" concept that persists across skill invocations?
3. How do we handle promos with multiple products (core + upsells)?
4. Should the Editor Skill be invoked automatically or manually?
5. How do we version control winning copy for future skill training?

---

## Revision Log

| Date | Author | Changes |
|------|--------|---------|
| 2026-01-03 | Don French / Claude | Initial planning document created |

---

*This document is a living plan. Update it as decisions are made, materials are gathered, and the vision evolves.*
