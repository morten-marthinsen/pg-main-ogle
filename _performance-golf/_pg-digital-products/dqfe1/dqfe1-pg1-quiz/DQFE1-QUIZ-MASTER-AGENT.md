# DQFE1 Quiz Builder - Master Agent

> **Document Version**: 1.0
> **Last Updated**: 2026-01-27
> **Owner**: Christopher Ogle
> **Status**: DRAFT - Pending Approval
> **Companion Documents**: [DQFE1-QUIZ-PRD.md](./DQFE1-QUIZ-PRD.md), [DQFE1-QUIZ-MICRO-SKILLS.md](./DQFE1-QUIZ-MICRO-SKILLS.md)

---

## Purpose

This document defines **how the DQFE1 Quiz Builder Master Agent executes** - the orchestration layer that chains micro-skills together into a coherent workflow. While the PRD defines "what success looks like" and the Micro-Skills doc defines "what each skill does," this document defines "how they work together."

**This document is designed to be understood by both:**
- The AI agent (to execute the build correctly)
- Any human reader (to verify, troubleshoot, and improve the system)

---

## Agent Identity

```yaml
agent_name: DQFE1 Quiz Builder Master Agent
version: 1.0
scope: Build personalization quiz for Performance Golf PG1 acquisition
trigger: Human request to build/update quiz
output: Functional Next.js quiz application deployable to preview URL
human_checkpoints: 3 (slide content review, component review, deployment review)
```

---

## Skill Quick Reference

### What This Section Is

This table provides a one-line description of each skill the Quiz Builder Master Agent uses. Read this before the Execution Workflow to understand what each component does.

| Skill | What It Does |
|-------|--------------|
| `content-extractor` | Reads wireframe screenshots and extracts slide content (questions, options, copy) |
| `slide-renderer` | Generates React components for each slide type (single-select, multi-select, image-grid, etc.) |
| `state-manager` | Handles quiz state (current slide, answers, progress) using React hooks |
| `branching-engine` | Determines next slide based on user answers and branching rules |
| `progress-tracker` | Displays visual progress through the quiz (progress bar, step counter) |
| `style-applier` | Applies Tailwind CSS styling consistent with PG1 brand guidelines |
| `validator` | Validates user inputs (required fields, email format) before allowing progression |
| `personalization-engine` | Generates personalized content on Slide 19 based on collected answers |
| `integration-mocker` | Creates mock versions of Klaviyo and Checkout integrations for demo |
| `build-compiler` | Compiles Next.js application for deployment |
| `deploy-manager` | Deploys built application to preview URL (Vercel, local server, etc.) |

---

## Execution Workflow

### High-Level Flow

The Quiz Builder Master Agent processes through 5 phases, with 3 human checkpoints to ensure content accuracy and quality.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    DQFE1 QUIZ BUILDER MASTER AGENT                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  TRIGGER: Human requests quiz build/update                               │
│     │                                                                    │
│     ▼                                                                    │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ PHASE 1: EXTRACT                                                   │  │
│  │   • content-extractor: Reads wireframes, extracts slide content   │  │
│  │   • Creates slides-config.ts with all slide definitions           │  │
│  │   • Creates branching-logic.ts with navigation rules              │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│     │                                                                    │
│     ▼                                                                    │
│  ╔═══════════════════════════════════════════════════════════════════╗  │
│  ║ CHECKPOINT 1: Content Review                                       ║  │
│  ║ Human reviews extracted slide content and branching logic, then:   ║  │
│  ║ APPROVE (continue), EDIT (modify content), RESTART (re-extract)    ║  │
│  ╚═══════════════════════════════════════════════════════════════════╝  │
│     │                                                                    │
│     ▼                                                                    │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ PHASE 2: GENERATE                                                  │  │
│  │   • slide-renderer: Creates React components for each slide type  │  │
│  │   • state-manager: Implements useQuizState hook                   │  │
│  │   • branching-engine: Implements getNextSlide function            │  │
│  │   • progress-tracker: Creates ProgressBar component               │  │
│  │   • style-applier: Applies Tailwind styling to all components     │  │
│  │   • validator: Adds input validation to form slides               │  │
│  │   • personalization-engine: Creates LoadingSlide with dynamic data│  │
│  │   • integration-mocker: Creates mock email capture & checkout     │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│     │                                                                    │
│     ▼                                                                    │
│  ╔═══════════════════════════════════════════════════════════════════╗  │
│  ║ CHECKPOINT 2: Component Review                                     ║  │
│  ║ Human reviews generated components and styling, then:              ║  │
│  ║ APPROVE (continue), MODIFY (request changes), REGENERATE          ║  │
│  ╚═══════════════════════════════════════════════════════════════════╝  │
│     │                                                                    │
│     ▼                                                                    │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ PHASE 3: BUILD                                                     │  │
│  │   • build-compiler: Runs `npm run build` to compile Next.js app   │  │
│  │   • Fixes any TypeScript or build errors                          │  │
│  │   • Optimizes bundle for production                               │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│     │                                                                    │
│     ▼                                                                    │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ PHASE 4: TEST                                                      │  │
│  │   • Runs quiz in local dev mode (npm run dev)                     │  │
│  │   • Verifies all slides render without errors                     │  │
│  │   • Tests branching logic (age → testimonial)                     │  │
│  │   • Tests form validation                                         │  │
│  │   • Tests mobile responsiveness                                   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│     │                                                                    │
│     ▼                                                                    │
│  ╔═══════════════════════════════════════════════════════════════════╗  │
│  ║ CHECKPOINT 3: Deployment Review                                    ║  │
│  ║ Human tests the quiz locally or on preview URL, then:              ║  │
│  ║ APPROVE (ship it), FIX (address issues), DELAY (needs more work)  ║  │
│  ╚═══════════════════════════════════════════════════════════════════╝  │
│     │                                                                    │
│     ▼                                                                    │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ PHASE 5: DEPLOY                                                    │  │
│  │   • deploy-manager: Deploys to Vercel or starts local server      │  │
│  │   • Generates shareable preview URL                               │  │
│  │   • Creates demo script for CEO presentation                      │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│     │                                                                    │
│     ▼                                                                    │
│  OUTPUT: Live quiz at preview URL + demo script                          │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## State Machine

### What This Section Is

The state machine defines every possible "state" the agent can be in during the build process, and what transitions are allowed between states.

### Valid States

| State | Description | What Happens Next |
|-------|-------------|-------------------|
| `IDLE` | Agent is not running. Waiting for human to initiate build. | Human says "build quiz" → transitions to `EXTRACTING` |
| `EXTRACTING` | Reading wireframes and extracting slide content. | Success → `AWAITING_CONTENT_REVIEW`. Error → `ERROR` |
| `AWAITING_CONTENT_REVIEW` | **Checkpoint 1.** Human must review extracted content. | Human approves → `GENERATING`. Human edits → stays in review. |
| `GENERATING` | Building React components, hooks, and styling. | Success → `AWAITING_COMPONENT_REVIEW`. Error → `ERROR` |
| `AWAITING_COMPONENT_REVIEW` | **Checkpoint 2.** Human must review generated components. | Human approves → `BUILDING`. Human requests changes → `MODIFYING` |
| `MODIFYING` | Applying human-requested changes to components. | Changes complete → `AWAITING_COMPONENT_REVIEW` |
| `BUILDING` | Compiling Next.js application. | Success → `TESTING`. Error → `BUILD_ERROR` |
| `BUILD_ERROR` | Build failed. Agent attempts to fix errors. | Fix successful → `BUILDING`. Cannot fix → `ERROR` |
| `TESTING` | Running local dev server and verifying functionality. | All tests pass → `AWAITING_DEPLOYMENT_REVIEW`. Tests fail → `FIXING` |
| `FIXING` | Addressing test failures. | Fix complete → `TESTING` |
| `AWAITING_DEPLOYMENT_REVIEW` | **Checkpoint 3.** Human tests quiz before deployment. | Human approves → `DEPLOYING`. Human finds issues → `FIXING` |
| `DEPLOYING` | Deploying to preview URL. | Success → `COMPLETE`. Error → `ERROR` |
| `COMPLETE` | Quiz is live and ready for demo. | Returns to `IDLE` |
| `ERROR` | Unrecoverable error occurred. | Human intervention required |

### State Transition Diagram

```
                    ┌──────────────┐
                    │     IDLE     │◄─────────────────────────────┐
                    └──────┬───────┘                              │
                           │ human initiates build                │
                           ▼                                      │
                    ┌──────────────┐                              │
            ┌───────│  EXTRACTING  │───────┐                      │
            │       └──────────────┘       │                      │
            │ success                 error│                      │
            ▼                              ▼                      │
    ┌─────────────────────┐          ┌──────────┐               │
    │AWAITING_CONTENT_    │          │  ERROR   │───────────────┤
    │       REVIEW        │          └──────────┘               │
    └─────────┬───────────┘                                      │
              │ human approves                                   │
              ▼                                                  │
       ┌──────────────┐                                         │
       │  GENERATING  │───────────┐                             │
       └──────┬───────┘           │ error                       │
              │ success           ▼                             │
              │            ┌──────────┐                         │
              │            │  ERROR   │─────────────────────────┤
              ▼            └──────────┘                         │
    ┌─────────────────────┐                                     │
    │AWAITING_COMPONENT_  │◄───────────────────────┐            │
    │       REVIEW        │                        │            │
    └─────────┬───────────┘                        │            │
              │ human approves       ┌──────────────┴───┐       │
              │                      │    MODIFYING     │       │
              │                      └──────────────────┘       │
              ▼                                                 │
       ┌──────────────┐                                         │
       │   BUILDING   │◄─────────────┐                          │
       └──────┬───────┘              │                          │
              │ success    ┌─────────┴──────┐                   │
              │            │  BUILD_ERROR   │                   │
              │            └────────────────┘                   │
              ▼                                                 │
       ┌──────────────┐                                         │
       │   TESTING    │◄─────────────┐                          │
       └──────┬───────┘              │                          │
              │ tests pass ┌─────────┴──────┐                   │
              │            │    FIXING      │                   │
              │            └────────────────┘                   │
              ▼                                                 │
    ┌─────────────────────┐                                     │
    │AWAITING_DEPLOYMENT_ │                                     │
    │       REVIEW        │                                     │
    └─────────┬───────────┘                                     │
              │ human approves                                  │
              ▼                                                 │
       ┌──────────────┐                                         │
       │  DEPLOYING   │──────────┐                              │
       └──────┬───────┘          │ error                        │
              │ success          ▼                              │
              │           ┌──────────┐                          │
              │           │  ERROR   │──────────────────────────┘
              ▼           └──────────┘
       ┌──────────────┐
       │   COMPLETE   │─────────────────────────────────────────┘
       └──────────────┘
```

---

## Phase Specifications

### Phase 1: EXTRACT

**Objective**: Read wireframe screenshots and extract slide content INTO structured configuration files, creating the foundation FOR component generation.

**Skills Invoked**:
| Skill | Function |
|-------|----------|
| `content-extractor` | Reads each wireframe image and extracts: question text, option labels, button text, layout type |

**Input**:
```yaml
trigger:
  type: human_request
  wireframes_path: /dqfe1-wireframe-screenshots/
  slides_to_extract: [1, 2, 4, 5, 7, 19, 22, 23, 24, 26]  # MVP slides
```

**Output**:
```yaml
extract_result:
  status: SUCCESS | ERROR
  slides_extracted: 10
  files_created:
    - lib/slides-config.ts      # Slide definitions with content
    - lib/branching-logic.ts    # Navigation rules
  warnings:
    - "Slide 5: Question text unclear in wireframe, used placeholder"
```

**Checkpoint 1 Trigger**: After EXTRACT completes, agent pauses for human review.

---

### Checkpoint 1: Content Review

**What the Human Must Do**: Review the extracted slide content and branching logic to ensure accuracy.

**Presented Information**:
```
╔══════════════════════════════════════════════════════════════════╗
║                    CONTENT EXTRACTION SUMMARY                     ║
╠══════════════════════════════════════════════════════════════════╣
║  Slides Extracted: 10 (of 10 requested)                          ║
║                                                                   ║
║  SLIDE CONTENT PREVIEW:                                           ║
║                                                                   ║
║  Slide 1: "What motivates you to play golf?"                      ║
║  Type: Multi-select (6 options)                                   ║
║  Options: Have fun with friends, Challenge myself mentally, ...   ║
║                                                                   ║
║  Slide 2: "What's your age range?"                                ║
║  Type: Single-select (4 options)                                  ║
║  Options: 18-35, 36-50, 51-64, 65+                                ║
║  [BRANCH POINT] → Determines Slide 4 variant                      ║
║                                                                   ║
║  Slide 4a: Testimonial (Age 18-35)                                ║
║  Quote: "[Placeholder - needs young golfer testimonial]"          ║
║  ⚠️ WARNING: Using placeholder - please provide actual copy       ║
║                                                                   ║
║  [... 7 more slides ...]                                          ║
║                                                                   ║
║  BRANCHING LOGIC:                                                 ║
║  • Slide 2 → Slide 4a (if age = 18-35)                            ║
║  • Slide 2 → Slide 4b (if age = 36-50)                            ║
║  • Slide 2 → Slide 4c (if age = 51-64)                            ║
║  • Slide 2 → Slide 4d (if age = 65+)                              ║
║                                                                   ║
║  WARNINGS: 1                                                      ║
║  └── Slide 4a: Using placeholder testimonial copy                 ║
╠══════════════════════════════════════════════════════════════════╣
║  [APPROVE] Content looks good, proceed to component generation    ║
║  [EDIT] I need to modify some slide content                       ║
║  [RESTART] Re-extract from wireframes with different approach     ║
╚══════════════════════════════════════════════════════════════════╝
```

**Human Actions**:
| Action | What Happens |
|--------|--------------|
| APPROVE | Proceed to Phase 2 (component generation) with current content |
| EDIT | Human provides corrections, agent updates config files, re-presents for review |
| RESTART | Agent re-runs extraction with modified approach |

---

### Phase 2: GENERATE

**Objective**: Create React components, hooks, and styling FOR each slide type, implementing the quiz UI and logic.

**Skills Invoked**:
| Skill | Function |
|-------|----------|
| `slide-renderer` | Creates React components for each slide type (SingleSelectSlide, MultiSelectSlide, etc.) |
| `state-manager` | Implements useQuizState hook for tracking answers and progress |
| `branching-engine` | Implements getNextSlide function that checks answers and returns correct next slide |
| `progress-tracker` | Creates ProgressBar component showing current position |
| `style-applier` | Applies Tailwind CSS classes matching PG1 brand |
| `validator` | Adds validation logic to form inputs |
| `personalization-engine` | Creates LoadingSlide that displays collected answers dynamically |
| `integration-mocker` | Creates mock versions of email capture and checkout |

**Input**: Approved slides-config.ts and branching-logic.ts from Phase 1

**Output**:
```yaml
generate_result:
  status: SUCCESS | ERROR
  components_created:
    - components/slides/SingleSelectSlide.tsx
    - components/slides/MultiSelectSlide.tsx
    - components/slides/ImageGridSlide.tsx
    - components/slides/FormSlide.tsx
    - components/slides/LoadingSlide.tsx
    - components/slides/TestimonialSlide.tsx
    - components/slides/CheckoutSlide.tsx
    - components/ui/ProgressBar.tsx
    - components/ui/NavigationButtons.tsx
    - components/ui/Header.tsx
    - components/QuizContainer.tsx
    - hooks/useQuizState.ts
    - lib/branching-logic.ts
  total_lines_of_code: 1500  # (example)
```

**Checkpoint 2 Trigger**: After GENERATE completes, agent pauses for human review.

---

### Checkpoint 2: Component Review

**What the Human Must Do**: Review the generated components and styling to ensure quality.

**Presented Information**:
```
╔══════════════════════════════════════════════════════════════════╗
║                    COMPONENT GENERATION SUMMARY                   ║
╠══════════════════════════════════════════════════════════════════╣
║  Components Created: 12                                           ║
║  Total Lines of Code: 1,500                                       ║
║                                                                   ║
║  SLIDE COMPONENTS:                                                ║
║  ✓ SingleSelectSlide.tsx - Radio button selection                 ║
║  ✓ MultiSelectSlide.tsx - Checkbox selection                      ║
║  ✓ ImageGridSlide.tsx - 2x3 clickable image grid                  ║
║  ✓ FormSlide.tsx - Email + name inputs with validation            ║
║  ✓ LoadingSlide.tsx - Progress animation with personalization     ║
║  ✓ TestimonialSlide.tsx - Photo + quote + name                    ║
║  ✓ CheckoutSlide.tsx - Pricing + CTA button                       ║
║                                                                   ║
║  UI COMPONENTS:                                                   ║
║  ✓ ProgressBar.tsx - Shows "Step X of 10"                         ║
║  ✓ NavigationButtons.tsx - Back/Continue buttons                  ║
║  ✓ Header.tsx - PG1 logo                                          ║
║                                                                   ║
║  HOOKS & LOGIC:                                                   ║
║  ✓ useQuizState.ts - Manages answers, current slide, progress     ║
║  ✓ branching-logic.ts - Age → Testimonial routing                 ║
║                                                                   ║
║  STYLING:                                                         ║
║  ✓ Tailwind CSS applied to all components                         ║
║  ✓ Mobile-first responsive design                                 ║
║  ✓ Touch targets ≥44px for mobile                                 ║
╠══════════════════════════════════════════════════════════════════╣
║  [APPROVE] Components look good, proceed to build                 ║
║  [MODIFY] I need changes to specific components                   ║
║  [REGENERATE] Start over with different approach                  ║
╚══════════════════════════════════════════════════════════════════╝
```

---

### Phase 3: BUILD

**Objective**: Compile the Next.js application INTO a production-ready bundle, fixing any build errors.

**Skills Invoked**:
| Skill | Function |
|-------|----------|
| `build-compiler` | Runs `npm run build` and captures output |

**Build Process**:
1. Run `npm run build`
2. If errors occur, analyze error messages
3. Fix TypeScript errors, missing imports, or configuration issues
4. Re-run build until successful
5. Max 3 retry attempts before escalating to human

**Output**:
```yaml
build_result:
  status: SUCCESS | BUILD_ERROR
  build_time: "45 seconds"  # (example)
  bundle_size: "250KB"  # (example)
  errors_fixed: 2  # (example)
  warnings: 1  # (example)
```

---

### Phase 4: TEST

**Objective**: Verify the quiz functions correctly by running local tests and manual inspection.

**Test Cases**:
| Test | What We're Testing | Pass Criteria |
|------|-------------------|---------------|
| Slides render | All 10 slides display without JS errors | No console errors |
| Navigation | Forward/back buttons work | Can reach all slides |
| Branching | Age selection routes to correct testimonial | 18-35 → Slide 4a, etc. |
| State persistence | Answers saved when navigating back | Selections preserved |
| Validation | Email field rejects invalid input | Shows error message |
| Mobile layout | Quiz usable on 375px viewport | No horizontal scroll |
| Progress bar | Shows correct step count | "Step 5 of 10" accurate |

**Output**:
```yaml
test_result:
  status: ALL_PASS | SOME_FAILED
  tests_run: 7
  tests_passed: 7
  tests_failed: 0
  issues_found: []
```

---

### Checkpoint 3: Deployment Review

**What the Human Must Do**: Test the quiz yourself to verify it's ready for the CEO demo.

**Test Instructions**:
```
╔══════════════════════════════════════════════════════════════════╗
║                    DEPLOYMENT REVIEW                              ║
╠══════════════════════════════════════════════════════════════════╣
║  Quiz is running at: http://localhost:3000                        ║
║                                                                   ║
║  PLEASE TEST THE FOLLOWING:                                       ║
║                                                                   ║
║  □ Complete the quiz from start to finish                         ║
║  □ Test the age → testimonial branching:                          ║
║    - Select "18-35" → should see young golfer testimonial         ║
║    - Go back, select "65+" → should see senior testimonial        ║
║  □ Test navigation:                                               ║
║    - Back button preserves your previous answers                  ║
║    - Continue button disabled until required selection made       ║
║  □ Test on mobile (or browser dev tools mobile view):             ║
║    - Quiz is usable without horizontal scrolling                  ║
║    - Buttons are easy to tap                                      ║
║  □ Test email capture:                                            ║
║    - Invalid email shows error message                            ║
║    - Valid email + name proceeds to checkout                      ║
║  □ Verify Slide 19 shows your selected options                    ║
║                                                                   ║
║  AUTOMATED TEST RESULTS:                                          ║
║  ✓ All slides render without errors                               ║
║  ✓ Navigation works correctly                                     ║
║  ✓ Branching logic verified                                       ║
║  ✓ Mobile responsive verified                                     ║
╠══════════════════════════════════════════════════════════════════╣
║  [APPROVE] Ship it! Deploy to preview URL for CEO demo            ║
║  [FIX] I found issues that need to be addressed                   ║
║  [DELAY] Not ready for demo - needs more work                     ║
╚══════════════════════════════════════════════════════════════════╝
```

---

### Phase 5: DEPLOY

**Objective**: Deploy the quiz to a shareable URL FOR the CEO demo.

**Skills Invoked**:
| Skill | Function |
|-------|----------|
| `deploy-manager` | Deploys to Vercel, Netlify, or starts persistent local server |

**Deployment Options**:
| Option | How It Works | When to Use |
|--------|--------------|-------------|
| Vercel | `vercel --prod` or GitHub push | Best for shareable URL |
| Local server | `npm run start` with ngrok tunnel | Quick testing |
| Netlify | `netlify deploy --prod` | Alternative to Vercel |

**Output**:
```yaml
deploy_result:
  status: SUCCESS | ERROR
  preview_url: "https://dqfe1-quiz-abc123.vercel.app"  # (example)
  deployment_time: "30 seconds"  # (example)
  demo_script_generated: true
```

---

## Error Handling

### What This Section Is

This section defines how the agent handles problems during the build process.

### Error Categories

| Category | What It Means | Example | Recovery |
|----------|---------------|---------|----------|
| **EXTRACT_ERROR** | Cannot read or parse wireframe | Image file missing | Ask human to provide file |
| **GENERATE_ERROR** | Cannot create component | Invalid configuration | Fix config and regenerate |
| **BUILD_ERROR** | TypeScript or Next.js build failed | Missing import | Auto-fix up to 3 times, then escalate |
| **TEST_ERROR** | Quiz doesn't pass functional tests | Button not working | Identify root cause, fix, retest |
| **DEPLOY_ERROR** | Cannot deploy to preview URL | Vercel auth failed | Try alternative deployment method |

### Error Recovery Matrix

| Error Type | When It Happens | What the Agent Does |
|------------|-----------------|---------------------|
| Missing wireframe | EXTRACT phase | Notifies human, lists missing files, waits for input |
| Build failure | BUILD phase | Analyzes error, attempts fix, retries up to 3 times |
| Test failure | TEST phase | Identifies failing test, proposes fix, implements after human approval |
| Deploy failure | DEPLOY phase | Tries alternative deployment method (Vercel → local → Netlify) |

---

## Guardrails

### What This Section Is

Guardrails prevent the agent from making mistakes that could produce incorrect output.

### Code Quality Guardrails

| Guardrail (The Rule) | Why It Matters | Enforcement |
|---------------------|----------------|-------------|
| No TypeScript errors | Ensures code compiles | Build fails if any TS errors exist |
| No ESLint warnings | Maintains code quality | Lint runs before build |
| All components must have types | Prevents runtime errors | TypeScript strict mode enabled |
| Tailwind classes must be valid | Prevents styling issues | Tailwind compile-time checks |

### UX Quality Guardrails

| Guardrail (The Rule) | Why It Matters | Enforcement |
|---------------------|----------------|-------------|
| All buttons must be ≥44px touch target | Mobile usability | CSS checked during review |
| Progress bar must be accurate | User trust | Calculation verified in tests |
| Back button must preserve state | User experience | Functional test required |
| Form validation must show clear errors | User guidance | Validation logic reviewed |

### Content Guardrails

| Guardrail (The Rule) | Why It Matters | Enforcement |
|---------------------|----------------|-------------|
| No placeholder content in production | Professional appearance | Human review at Checkpoint 1 |
| All images must have alt text | Accessibility | Component template includes alt |
| Brand colors must match PG1 | Brand consistency | Color values in config, reviewed |

---

## Output Specification

### What This Section Is

This section defines exactly what the agent produces.

### Primary Output: Next.js Application

```
quiz-app/
├── app/
│   ├── layout.tsx              # Root layout with fonts, metadata
│   ├── page.tsx                # Main quiz page
│   └── globals.css             # Global Tailwind styles
├── components/
│   ├── slides/
│   │   ├── SingleSelectSlide.tsx
│   │   ├── MultiSelectSlide.tsx
│   │   ├── ImageGridSlide.tsx
│   │   ├── FormSlide.tsx
│   │   ├── LoadingSlide.tsx
│   │   ├── TestimonialSlide.tsx
│   │   └── CheckoutSlide.tsx
│   ├── ui/
│   │   ├── ProgressBar.tsx
│   │   ├── NavigationButtons.tsx
│   │   └── Header.tsx
│   └── QuizContainer.tsx       # Main quiz orchestrator
├── hooks/
│   └── useQuizState.ts         # Quiz state management
├── lib/
│   ├── slides-config.ts        # Slide definitions
│   └── branching-logic.ts      # Navigation rules
├── types/
│   └── quiz.ts                 # TypeScript interfaces
├── public/
│   └── images/                 # Slide assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

### Secondary Output: Demo Materials

| Output | Purpose |
|--------|---------|
| Preview URL | Shareable link for CEO demo |
| Demo Script | Talking points for presentation |
| Test Results | Evidence that quiz works correctly |

---

## Testing Requirements

### What This Section Is

This section defines the tests that must pass before deployment.

### Functional Tests

| Test | Description | Pass Criteria |
|------|-------------|---------------|
| Slide rendering | All 10 slides display | No console errors |
| Navigation | Forward/back buttons work | Can reach all slides |
| Branching | Age → testimonial routing | Correct variant displays |
| State persistence | Answers saved on back | Selections preserved |
| Form validation | Email validation works | Error message shows |
| Mobile responsive | 375px viewport usable | No horizontal scroll |

### Visual Tests

| Test | Description | Pass Criteria |
|------|-------------|---------------|
| Brand consistency | Colors match PG1 | Visual inspection |
| Typography | Fonts render correctly | Visual inspection |
| Layout | Elements properly aligned | Visual inspection |
| Touch targets | Buttons easily tappable | ≥44px verified |

### Integration Tests

| Test | Description | Pass Criteria |
|------|-------------|---------------|
| Full flow | Complete quiz start to finish | No errors |
| All branches | Test each age → testimonial | All 4 variants work |
| Edge cases | Empty selections, back at start | Handled gracefully |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-27 | Christopher Ogle + Claude | Initial master agent specification |

---

## Future Enhancements (Post-Demo)

| Enhancement | Description | Priority |
|-------------|-------------|----------|
| Real Klaviyo integration | Connect to actual Klaviyo API | High |
| Real checkout integration | Connect to Checkout Champ/Shopify | High |
| Full 26 slides | Build remaining slide variants | High |
| All branching logic | Implement all 11 branch points | High |
| WordPress deployment | Embed or integrate with WordPress | Medium |
| Analytics tracking | Fire events for quiz progress | Medium |
| A/B testing | Test different copy/designs | Low |

---

*This document defines "how the DQFE1 Quiz Builder Master Agent executes." Together with DQFE1-QUIZ-PRD.md ("what success looks like") and DQFE1-QUIZ-MICRO-SKILLS.md ("what each skill does"), it forms the complete specification for the Quiz Builder.*
