# DQFE1 Quiz Builder - Product Requirements Document

> **Document Version**: 1.0
> **Last Updated**: 2026-01-27
> **Owner**: Christopher Ogle
> **Status**: DRAFT - Pending Approval
> **CEO Demo**: 2 days

---

## 1. Executive Summary

The DQFE1 Quiz is a **universal personalization and commitment engine** designed to onboard golfers and transition them from **uncertainty → clarity → momentum → paid commitment** in a single, coherent flow.

**Primary Goal**: Create voluntary engagement in the first 60 days where 70% of LTV is captured by installing belief before selling, making PG1 the only logical next step for improvement.

**Current Scope (MVP)**: 10-slide prototype with basic branching, mocked integrations, deployed for CEO demo.

**Full Scope (v1)**: 26-slide complete quiz with all branching logic, real Klaviyo integration, real checkout integration, WordPress deployment.

---

## 2. Success Criteria

### 2.1 MVP Success Criteria (CEO Demo)

| Criteria | Target | Measurement |
|----------|--------|-------------|
| Quiz loads in browser | 100% | No console errors, all elements render |
| Navigation works | 100% | Forward/back buttons function correctly |
| Branching works | 1+ branches | Age → Testimonial branch triggers correctly |
| Personalization displays | Yes | Slide 19 shows selected inputs |
| Mobile responsive | Yes | Usable on iPhone without horizontal scroll |
| CEO can complete flow | Yes | Can click through all 10 slides to end |

### 2.2 Full Product Success Criteria (v1)

| Criteria | Target | Measurement |
|----------|--------|-------------|
| Quiz completion rate | ≥70% | Users who start reach checkout slide |
| Email capture rate | ≥80% | Users at Slide 24 who submit email |
| Checkout conversion rate | TBD | Users who complete checkout |
| Load time | ≤3 seconds | Time to interactive |
| Mobile usability | 100% | All slides usable on mobile |
| Klaviyo integration | Working | Leads appear in Klaviyo list |
| Checkout integration | Working | Payments process successfully |

### 2.3 User Experience Quality Gates

| Gate | Pass Condition |
|------|----------------|
| **Visual Consistency** | All slides match PG1 brand (logo, colors, typography) |
| **Progress Visibility** | User always knows how far they are in the quiz |
| **Answer Persistence** | Answers persist if user navigates back |
| **Error Recovery** | Clear error messages if validation fails |
| **Loading States** | No blank screens; show loading indicators |

---

## 3. Quiz Architecture

### 3.1 Slide Types

| Type | Description | Component |
|------|-------------|-----------|
| **Single-Select** | Radio buttons, one answer required | `<SingleSelectSlide />` |
| **Multi-Select** | Checkboxes, multiple answers allowed | `<MultiSelectSlide />` |
| **Image Grid** | Clickable image tiles (6 per grid) | `<ImageGridSlide />` |
| **Form** | Text inputs for data capture | `<FormSlide />` |
| **Loading** | Progress animation with personalization | `<LoadingSlide />` |
| **Testimonial** | Social proof with photo + quote | `<TestimonialSlide />` |
| **Checkout** | Pricing + CTA | `<CheckoutSlide />` |

### 3.2 State Management

User answers must be tracked throughout the quiz flow:

```typescript
interface QuizState {
  currentSlide: number;
  answers: {
    motivation: string[];      // Slide 1: multi-select
    age: string;               // Slide 2: single-select (triggers branching)
    golfQuestion: string;      // Slide 5: single-select
    interests: string[];       // Slide 7: multi-select
    focusArea: string;         // Slide 22: image grid
    topic: string;             // Slide 23: image grid
    email: string;             // Slide 24: form
    firstName: string;         // Slide 24: form
  };
  completedSlides: number[];
  startedAt: Date;
  completedAt: Date | null;
}
```

### 3.3 Branching Logic

| Branch Point | Trigger Slide | Condition | Target Slide |
|--------------|---------------|-----------|--------------|
| Age → Testimonial | Slide 2 | age = "18-35" | Slide 4a (Young golfer testimonial) |
| Age → Testimonial | Slide 2 | age = "36-50" | Slide 4b (Mid-career testimonial) |
| Age → Testimonial | Slide 2 | age = "51-64" | Slide 4c (Senior testimonial) |
| Age → Testimonial | Slide 2 | age = "65+" | Slide 4d (Retirement golfer testimonial) |

**MVP Implementation**: Only the Age → Testimonial branch is required for the CEO demo. All other branching is deferred to v1.

### 3.4 MVP Slide Flow

```
[Slide 1] ─→ [Slide 2] ─→ [Slide 4*] ─→ [Slide 5] ─→ [Slide 7]
                              │
                    (Branch by age)
                              │
                              ↓
[Slide 19] ←─ [Slide 7]
     │
     ↓
[Slide 22] ─→ [Slide 23] ─→ [Slide 24] ─→ [Slide 26]
                                              │
                                         (END - Checkout)
```

---

## 4. Slide Specifications (MVP)

### 4.1 Slide 1: Motivation

| Field | Value |
|-------|-------|
| **Type** | Multi-select (allow multiple) |
| **Question** | "What motivates you to play golf?" |
| **Required** | At least 1 selection |
| **Options** | 6 options with icons |

**Options:**
1. Have fun with friends
2. Challenge myself mentally
3. Have fun on my own
4. Keep in physical shape
5. Compete against others
6. Try out something new

### 4.2 Slide 2: Age

| Field | Value |
|-------|-------|
| **Type** | Single-select (one answer) |
| **Question** | "What's your age range?" |
| **Required** | Yes |
| **Options** | 4 options |
| **Triggers** | Branching to Slide 4 variant |

**Options:**
1. 18-35
2. 36-50
3. 51-64
4. 65+

### 4.3 Slide 4: Testimonial (BRANCHED)

| Variant | Age Range | Testimonial Focus |
|---------|-----------|-------------------|
| 4a | 18-35 | Young golfer improving quickly |
| 4b | 36-50 | Busy professional finding time |
| 4c | 51-64 | Senior golfer regaining distance |
| 4d | 65+ | Retiree enjoying the game again |

### 4.4 Slide 5: Golf Question

| Field | Value |
|-------|-------|
| **Type** | Single-select |
| **Question** | TBD (extract from wireframe) |
| **Required** | Yes |
| **Options** | 4-6 options |

### 4.5 Slide 7: Interests

| Field | Value |
|-------|-------|
| **Type** | Multi-select |
| **Question** | "What do you want to improve?" |
| **Required** | At least 1 selection |
| **Options** | 6+ options |

### 4.6 Slide 19: Creating Your Plan

| Field | Value |
|-------|-------|
| **Type** | Loading/Progress |
| **Purpose** | Show personalization happening |
| **Duration** | 3-5 seconds animated |
| **Displays** | Goals selected, interests, experience level, practice plan |

### 4.7 Slide 22: Focus Area Selection

| Field | Value |
|-------|-------|
| **Type** | Image grid (6 tiles) |
| **Question** | "What area do you want to focus on first?" |
| **Required** | Yes |
| **Options** | 6 video thumbnail images |

### 4.8 Slide 23: Topic Selection

| Field | Value |
|-------|-------|
| **Type** | Image grid (6 tiles) |
| **Question** | "Choose a topic to start with" |
| **Required** | Yes |
| **Options** | 6 topic images |

### 4.9 Slide 24: Email Capture

| Field | Value |
|-------|-------|
| **Type** | Form |
| **Fields** | Email (required), First Name (required) |
| **Validation** | Email format, non-empty name |
| **Integration** | Klaviyo (MOCKED for MVP) |

### 4.10 Slide 26: Checkout

| Field | Value |
|-------|-------|
| **Type** | Checkout |
| **Purpose** | Final CTA + pricing |
| **Integration** | Checkout Champ/Shopify (MOCKED for MVP) |

---

## 5. UI/UX Requirements

### 5.1 Brand Consistency

| Element | Specification |
|---------|---------------|
| **Logo** | PG1 logo top-center |
| **Primary Color** | Performance Golf brand orange/gold |
| **Typography** | Clean sans-serif (match PG1 app) |
| **Button Style** | Full-width, high contrast |
| **Background** | White or light gray |

### 5.2 Navigation

| Element | Behavior |
|---------|----------|
| **Progress Bar** | Shows current position in quiz (e.g., "Step 3 of 10") |
| **Back Button** | Returns to previous slide, preserves answers |
| **Continue Button** | Advances to next slide (disabled until required answers selected) |
| **Skip** | NOT allowed - all slides required |

### 5.3 Mobile-First Design

| Breakpoint | Target |
|------------|--------|
| **Mobile** | 375px - 768px (PRIMARY) |
| **Tablet** | 768px - 1024px |
| **Desktop** | 1024px+ |

### 5.4 Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **Touch Targets** | Minimum 44x44px |
| **Color Contrast** | WCAG AA compliant |
| **Keyboard Navigation** | Tab through options, Enter to select |
| **Screen Reader** | Proper ARIA labels on interactive elements |

---

## 6. Integration Requirements

### 6.1 Klaviyo (Email Capture)

**MVP (MOCKED):**
- Show success message on form submit
- Store email in local state
- No actual API call

**v1 (REAL):**
- POST to Klaviyo API on Slide 24 submit
- Include: email, firstName, quiz answers
- Handle API errors gracefully

### 6.2 Checkout (Checkout Champ/Shopify)

**MVP (MOCKED):**
- Display pricing and CTA
- Show "Processing..." on click
- Show success confirmation

**v1 (REAL):**
- Redirect to checkout page with prefilled data
- OR embed checkout form
- Handle payment success/failure

### 6.3 Analytics (Optional for MVP)

| Event | When Fired |
|-------|------------|
| `quiz_started` | User lands on Slide 1 |
| `slide_completed` | User advances from any slide |
| `quiz_completed` | User reaches Slide 26 |
| `email_captured` | User submits Slide 24 |
| `checkout_initiated` | User clicks checkout CTA |

---

## 7. Error Handling

### 7.1 Validation Errors

| Error | User Message | Behavior |
|-------|--------------|----------|
| No selection made | "Please select at least one option" | Disable Continue button |
| Invalid email | "Please enter a valid email address" | Show inline error |
| Empty required field | "This field is required" | Show inline error |
| API failure (v1) | "Something went wrong. Please try again." | Retry button |

### 7.2 Edge Cases

| Scenario | Handling |
|----------|----------|
| User refreshes mid-quiz | Restore state from localStorage |
| User navigates back | Preserve all previous answers |
| User closes and returns | Offer "Continue where you left off?" |
| Slow network | Show loading spinner, timeout after 10s |

---

## 8. Acceptance Criteria

### 8.1 MVP (CEO Demo)

The MVP is complete when:

- [ ] Quiz renders in browser without JavaScript errors
- [ ] All 10 slides display correctly
- [ ] User can navigate forward through all slides
- [ ] User can navigate backward without losing answers
- [ ] Age selection triggers correct testimonial variant
- [ ] Slide 19 displays at least 2 pieces of personalized content
- [ ] Email form validates input format
- [ ] Checkout slide displays pricing
- [ ] Quiz is responsive on iPhone (no horizontal scroll)
- [ ] Progress bar shows correct position

### 8.2 Full Product (v1)

The v1 is complete when:

- [ ] All 26 slides render correctly
- [ ] All 11 branch points function correctly
- [ ] Personalized plan generation uses all 4 inputs
- [ ] Klaviyo receives lead data within 30 seconds of submit
- [ ] Checkout completes successfully (test transaction)
- [ ] Analytics events fire correctly
- [ ] Cross-browser testing passes (Safari, Chrome, Firefox)
- [ ] Load time ≤3 seconds on 4G connection
- [ ] Nate Jones Prompt Architecture Audit passes (A+)

### 8.3 Quality Gates

| Gate | Pass Condition |
|------|----------------|
| **Code Quality** | No TypeScript errors, no ESLint warnings |
| **Visual Match** | Matches wireframe design ≥90% |
| **Performance** | Lighthouse score ≥80 |
| **Accessibility** | No critical accessibility violations |
| **Mobile UX** | Usable without pinch-zoom |

---

## 9. Technical Stack

### 9.1 Core Technologies

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with app router |
| **React 18** | UI components |
| **Tailwind CSS** | Styling |
| **TypeScript** | Type safety |
| **localStorage** | Answer persistence |

### 9.2 File Structure (quiz-app/)

```
quiz-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
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
│   └── QuizContainer.tsx
├── hooks/
│   └── useQuizState.ts
├── lib/
│   ├── slides-config.ts
│   └── branching-logic.ts
├── types/
│   └── quiz.ts
└── public/
    └── images/
        └── (slide assets)
```

---

## 10. Timeline

### Phase 0-2: Documentation (TODAY)
- SESSION-LOG.md ✓
- DQFE1-QUIZ-PRD.md (this file)
- DQFE1-QUIZ-MASTER-AGENT.md
- DQFE1-QUIZ-MICRO-SKILLS.md

### Phase 3: MVP Build (TOMORROW)
- Initialize Next.js project
- Build slide components
- Implement 10 slides
- Implement branching
- Test locally

### Phase 4: CEO Demo (DAY 2 EVENING)
- Deploy to preview URL
- Final testing
- Demo preparation

### Phase 5+: Full Build (POST-DEMO)
- Remaining 16 slides
- All branching logic
- Real integrations
- WordPress deployment
- Audit and polish

---

## 11. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Assets not available | Medium | High | Use placeholder images, request from Christopher |
| Integration complexity | Low (mocked for MVP) | Low | Defer real integrations to v1 |
| Time constraint | High | High | Strict scope to 10 slides for MVP |
| Design mismatch | Medium | Medium | Reference wireframes frequently |
| Mobile issues | Medium | High | Test on real device early |

---

## 12. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-27 | Christopher Ogle + Claude | Initial PRD draft |

---

## 13. Approval

| Role | Name | Status | Date |
|------|------|--------|------|
| Owner | Christopher Ogle | PENDING | |

---

*This PRD defines "what success looks like" for the DQFE1 Quiz. The companion MASTER-AGENT.md document will define "how we execute" the build.*
