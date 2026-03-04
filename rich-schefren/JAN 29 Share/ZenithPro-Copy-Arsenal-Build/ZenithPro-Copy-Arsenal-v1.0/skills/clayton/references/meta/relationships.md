# Framework Relationship Map

> **Purpose**: Document parent-child, sibling, and pairing relationships between Clayton Makepeace frameworks.

---

## Summary

- **514 total frameworks**
- **45 Tier 1 Master Systems** (parent frameworks)
- **14 category families**
- **5 documented pairing patterns**

---

## Tier 1 Master Systems and Their Sub-Techniques

### Headlines (9 Master Systems)
| Master System | Sub-Techniques |
|---------------|----------------|
| 10 Proven Headline Templates | Six Maxims, 40 Starters, Direct Benefit Paradox, Emotional Echo |
| Six Headline Maxims | Power Functions, Job Definition, Profit Multiplication |

### Body Copy (18 Master Systems)
| Master System | Sub-Techniques |
|---------------|----------------|
| Makepeace 12-Step Long Copy System | Copy Rhythm, Momentum Sequence, Crosshead System |
| Conversational Copy System | Rhythm & Cadence, Sentence Variation, Pacing Amplitude |

### Events (11 Master Systems)
| Master System | Sub-Techniques |
|---------------|----------------|
| Grassroots Excitement Creation | Social Proof Cascade, Registration Momentum, FOMO Amplification |
| Pre-Event Planning System | 5 Pillars, Event Driver Questions, Theme Selection |
| Post-Event Follow-Up Formula | Segmentation, Recording Scarcity, Deadline Countdown |

### Proof (3 Master Systems)
| Master System | Sub-Techniques |
|---------------|----------------|
| Social Proof Stacking System | Testimonial Strategy, Authority Building, Case Study Writing |

### Testing (2 Master Systems)
| Master System | Sub-Techniques |
|---------------|----------------|
| Traffic vs Copy Diagnostic | A/B Testing, Landing Page Benchmarks, ROI Formula |

---

## Category Families (Sibling Relationships)

### Psychology (86 frameworks)
- **Tier 1**: Emotional appeals, persuasion patterns
- **Tier 2-3**: Specific triggers, psychological techniques
- **Relationship**: All psychology frameworks support other categories

### Process (68 frameworks)
- **Tier 1**: Writing systems, editing protocols
- **Tier 2-3**: Specific techniques (naming, metaphors, word power)
- **Relationship**: Process frameworks enable execution across all categories

### Structure (60 frameworks)
- **Tier 1**: Letter architectures, format systems
- **Tier 2-3**: Specific format techniques (sidebars, typography)
- **Relationship**: Structure frameworks provide containers for other content

### Business (49 frameworks)
- **Tier 1**: Economics formulas, partnership systems
- **Tier 2-3**: Specific business tactics
- **Relationship**: Business frameworks inform strategy decisions

### Email (36 frameworks)
- **Tier 1**: Campaign architecture, sequence formulas
- **Tier 2-3**: Specific email techniques
- **Relationship**: Email frameworks often pair with event frameworks

---

## Common Pairing Patterns

### 1. Headlines ↔ Leads ↔ Psychology
```
FLOW: Headlines create curiosity → Leads maintain it → Psychology deepens engagement

Recommended pairs:
  headlines/headlines-10-proven-templates.yml
    ↔ leads/leads-24-strategies.yml
    ↔ psychology/psychology-curiosity-creation.yml
```

### 2. Body Copy ↔ Proof ↔ Psychology
```
FLOW: Body copy makes claims → Proof validates them → Psychology makes them stick

Recommended pairs:
  body-copy/body-copy-12-step-system.yml
    ↔ proof/proof-social-stack.yml
    ↔ psychology/psychology-belief-chain.yml
```

### 3. Offers ↔ Closes ↔ Psychology
```
FLOW: Offers present value → Closes drive action → Psychology handles resistance

Recommended pairs:
  offers/offers-architecture-system.yml
    ↔ closes/closes-guarantee-power.yml
    ↔ psychology/psychology-loss-aversion.yml
```

### 4. Events ↔ Email ↔ Psychology
```
FLOW: Events create experiences → Email drives attendance → Psychology maintains momentum

Recommended pairs:
  events/events-grassroots-excitement.yml
    ↔ email/email-invitation-sequence.yml
    ↔ psychology/psychology-fomo.yml
```

### 5. Email ↔ Headlines ↔ Structure
```
FLOW: Email delivers message → Headlines get opens → Structure maintains readability

Recommended pairs:
  email/email-subject-line-templates.yml
    ↔ headlines/headlines-direct-benefit.yml
    ↔ structure/structure-format-mobile.yml
```

---

## Prerequisite Chains

### For Headlines
```
Learn first: psychology/psychology-curiosity-creation.yml
Then: headlines/headlines-six-maxims.yml
Then: headlines/headlines-10-proven-templates.yml
```

### For Body Copy
```
Learn first: psychology/psychology-dominant-emotion.yml
Then: structure/structure-seven-section.yml
Then: body-copy/body-copy-12-step-system.yml
```

### For Events
```
Learn first: psychology/psychology-grassroots-momentum.yml
Then: events/events-driver-questions.yml
Then: events/events-pre-planning-system.yml
```

---

## Framework Dependencies Graph

```
                    ┌─────────────────────┐
                    │    PSYCHOLOGY       │
                    │   (Foundation)      │
                    └─────────┬───────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
    ┌───────────┐       ┌───────────┐       ┌───────────┐
    │ HEADLINES │       │ BODY COPY │       │  EVENTS   │
    └─────┬─────┘       └─────┬─────┘       └─────┬─────┘
          │                   │                   │
          ▼                   ▼                   ▼
    ┌───────────┐       ┌───────────┐       ┌───────────┐
    │   LEADS   │       │   PROOF   │       │   EMAIL   │
    └─────┬─────┘       └─────┬─────┘       └─────┬─────┘
          │                   │                   │
          └───────────────────┼───────────────────┘
                              ▼
                    ┌─────────────────────┐
                    │  OFFERS + CLOSES    │
                    │   (Conversion)      │
                    └─────────────────────┘
```

---

## Using Relationships for Learning Paths

### Beginner Path
1. Start with **psychology** foundations
2. Learn **headlines** and **leads**
3. Add **body copy** basics
4. Progress to **proof** integration

### Intermediate Path
1. Master **offers** and **closes**
2. Learn **email** sequences
3. Study **events** systems
4. Integrate **testing** frameworks

### Advanced Path
1. Combine multiple categories per project
2. Use **Tier 1** master systems as orchestrators
3. Pull **Tier 3** techniques as needed
4. Test and optimize with **testing** frameworks

---

## Technical Reference

For programmatic access, see `meta/relationships.json` containing:
- `tier_1_master_systems`: Array of master systems with sub-techniques
- `category_families`: Object of categories with tiered framework lists
- `common_pairings`: Array of documented pairing patterns

---

*Relationship map for 514 Clayton Makepeace frameworks - December 2024*
