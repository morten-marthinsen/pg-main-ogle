# DQFE1 Quiz Builder - Micro-Skills Reference

> **Document Version**: 1.0
> **Last Updated**: 2026-01-27
> **Owner**: Christopher Ogle
> **Status**: DRAFT
> **Companion Documents**: [DQFE1-QUIZ-PRD.md](./DQFE1-QUIZ-PRD.md), [DQFE1-QUIZ-MASTER-AGENT.md](./DQFE1-QUIZ-MASTER-AGENT.md)

---

## Purpose

This document defines **what each micro-skill does** in the DQFE1 Quiz Builder system. Each skill is a discrete, testable unit of functionality that the Master Agent orchestrates.

---

## Skill Architecture

### Skill Layers

Skills are organized into 4 layers, executed in order:

```
┌────────────────────────────────────────────────────────┐
│ LAYER 0: CONFIGURATION                                  │
│   └── content-extractor                                 │
├────────────────────────────────────────────────────────┤
│ LAYER 1: CORE COMPONENTS                                │
│   ├── slide-renderer                                    │
│   ├── state-manager                                     │
│   └── branching-engine                                  │
├────────────────────────────────────────────────────────┤
│ LAYER 2: UI & STYLING                                   │
│   ├── progress-tracker                                  │
│   ├── style-applier                                     │
│   ├── validator                                         │
│   ├── personalization-engine                            │
│   └── integration-mocker                                │
├────────────────────────────────────────────────────────┤
│ LAYER 3: BUILD & DEPLOY                                 │
│   ├── build-compiler                                    │
│   └── deploy-manager                                    │
└────────────────────────────────────────────────────────┘
```

### Skill Dependencies

| Skill | Depends On | Must Complete Before |
|-------|------------|---------------------|
| `content-extractor` | None | All other skills |
| `slide-renderer` | `content-extractor` | `style-applier` |
| `state-manager` | `content-extractor` | `branching-engine` |
| `branching-engine` | `state-manager` | `build-compiler` |
| `progress-tracker` | `state-manager` | `style-applier` |
| `style-applier` | `slide-renderer`, `progress-tracker` | `build-compiler` |
| `validator` | `slide-renderer` | `build-compiler` |
| `personalization-engine` | `state-manager` | `build-compiler` |
| `integration-mocker` | `slide-renderer` | `build-compiler` |
| `build-compiler` | All Layer 0-2 skills | `deploy-manager` |
| `deploy-manager` | `build-compiler` | None |

---

## Layer 0: Configuration Skills

### `content-extractor`

**Purpose**: Read wireframe screenshots and extract slide content into structured configuration files.

**Trigger**: Human provides wireframe file paths

**Input**:
```yaml
wireframes_path: /dqfe1-wireframe-screenshots/
slides_to_extract: [1, 2, 4, 5, 7, 19, 22, 23, 24, 26]
```

**Process**:
1. Read each wireframe image using the Read tool
2. Analyze visual layout to determine slide type
3. Extract text content (questions, options, labels)
4. Identify interactive elements (buttons, inputs)
5. Note any images or icons needed
6. Generate slides-config.ts and branching-logic.ts

**Output**:
```typescript
// lib/slides-config.ts
export const slidesConfig = {
  slide1: {
    id: 'slide1',
    type: 'multi-select',
    question: 'What motivates you to play golf?',
    required: true,
    options: [
      { id: 'fun-friends', label: 'Have fun with friends', icon: '👥' },
      { id: 'challenge', label: 'Challenge myself mentally', icon: '🎯' },
      // ... more options
    ],
  },
  // ... more slides
};
```

**Validation**:
- All requested slides must have extracted content
- Each slide must have a type, question, and options (where applicable)
- Warnings generated for unclear or placeholder content

---

## Layer 1: Core Component Skills

### `slide-renderer`

**Purpose**: Generate React components for each slide type.

**Trigger**: `content-extractor` completes

**Input**: `slides-config.ts`

**Process**:
1. Read slide type from config
2. Generate appropriate component structure
3. Map options to interactive elements
4. Add accessibility attributes
5. Include responsive styling hooks

**Output Files**:
```
components/slides/
├── SingleSelectSlide.tsx
├── MultiSelectSlide.tsx
├── ImageGridSlide.tsx
├── FormSlide.tsx
├── LoadingSlide.tsx
├── TestimonialSlide.tsx
└── CheckoutSlide.tsx
```

**Component Template (SingleSelectSlide)**:
```typescript
interface SingleSelectSlideProps {
  slide: SlideConfig;
  selectedValue: string | null;
  onSelect: (value: string) => void;
}

export function SingleSelectSlide({
  slide,
  selectedValue,
  onSelect
}: SingleSelectSlideProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center">
        {slide.question}
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {slide.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`p-4 rounded-lg border-2 transition-all
              ${selectedValue === option.id
                ? 'border-primary bg-primary/10'
                : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

**Validation**:
- Each component must compile without TypeScript errors
- Props interface must be defined
- Accessibility attributes (aria-*) must be included

---

### `state-manager`

**Purpose**: Implement quiz state management using React hooks.

**Trigger**: `content-extractor` completes

**Input**: `slides-config.ts`

**Process**:
1. Define QuizState interface
2. Create useQuizState hook
3. Implement answer storage
4. Implement slide navigation
5. Add localStorage persistence

**Output File**: `hooks/useQuizState.ts`

**Implementation**:
```typescript
interface QuizState {
  currentSlide: number;
  answers: Record<string, string | string[]>;
  completedSlides: number[];
  startedAt: Date;
  completedAt: Date | null;
}

export function useQuizState() {
  const [state, setState] = useState<QuizState>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('quizState');
    if (saved) return JSON.parse(saved);
    return {
      currentSlide: 0,
      answers: {},
      completedSlides: [],
      startedAt: new Date(),
      completedAt: null,
    };
  });

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem('quizState', JSON.stringify(state));
  }, [state]);

  const setAnswer = (slideId: string, value: string | string[]) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [slideId]: value },
    }));
  };

  const goToNextSlide = () => {
    setState(prev => ({
      ...prev,
      currentSlide: prev.currentSlide + 1,
      completedSlides: [...prev.completedSlides, prev.currentSlide],
    }));
  };

  const goToPreviousSlide = () => {
    setState(prev => ({
      ...prev,
      currentSlide: prev.currentSlide - 1,
    }));
  };

  return {
    ...state,
    setAnswer,
    goToNextSlide,
    goToPreviousSlide,
  };
}
```

**Validation**:
- State persists across page refreshes
- Back navigation preserves answers
- All answer types (string, string[]) handled correctly

---

### `branching-engine`

**Purpose**: Determine the next slide based on user answers and branching rules.

**Trigger**: `state-manager` completes

**Input**:
- `branching-logic.ts` (rules from content-extractor)
- Current quiz state

**Process**:
1. Read branching rules
2. Evaluate conditions against current answers
3. Return correct next slide ID
4. Handle edge cases (no match, end of quiz)

**Output File**: `lib/branching-logic.ts`

**Implementation**:
```typescript
interface BranchRule {
  fromSlide: string;
  conditions: {
    answerId: string;
    value: string;
  }[];
  toSlide: string;
}

const branchRules: BranchRule[] = [
  {
    fromSlide: 'slide2',
    conditions: [{ answerId: 'age', value: '18-35' }],
    toSlide: 'slide4a',
  },
  {
    fromSlide: 'slide2',
    conditions: [{ answerId: 'age', value: '36-50' }],
    toSlide: 'slide4b',
  },
  {
    fromSlide: 'slide2',
    conditions: [{ answerId: 'age', value: '51-64' }],
    toSlide: 'slide4c',
  },
  {
    fromSlide: 'slide2',
    conditions: [{ answerId: 'age', value: '65+' }],
    toSlide: 'slide4d',
  },
];

const defaultFlow = ['slide1', 'slide2', 'slide4', 'slide5', 'slide7',
                     'slide19', 'slide22', 'slide23', 'slide24', 'slide26'];

export function getNextSlide(
  currentSlide: string,
  answers: Record<string, string | string[]>
): string | null {
  // Check branch rules first
  const matchingRule = branchRules.find(rule => {
    if (rule.fromSlide !== currentSlide) return false;
    return rule.conditions.every(cond => answers[cond.answerId] === cond.value);
  });

  if (matchingRule) return matchingRule.toSlide;

  // Fall back to default flow
  const currentIndex = defaultFlow.indexOf(currentSlide);
  if (currentIndex === -1 || currentIndex === defaultFlow.length - 1) {
    return null; // End of quiz or not found
  }
  return defaultFlow[currentIndex + 1];
}
```

**Validation**:
- All branch conditions produce correct results
- Default flow works when no branch matches
- End of quiz handled gracefully

---

## Layer 2: UI & Styling Skills

### `progress-tracker`

**Purpose**: Display visual progress through the quiz.

**Trigger**: `state-manager` completes

**Input**: Current slide index, total slides

**Output File**: `components/ui/ProgressBar.tsx`

**Implementation**:
```typescript
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
```

---

### `style-applier`

**Purpose**: Apply consistent Tailwind CSS styling matching PG1 brand.

**Trigger**: `slide-renderer` and `progress-tracker` complete

**Input**: All component files

**Process**:
1. Define brand color palette
2. Apply consistent typography
3. Ensure responsive breakpoints
4. Add hover/focus states
5. Verify touch targets

**Output**: Updated component files + `tailwind.config.ts`

**Brand Configuration**:
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D97706', // PG1 orange/gold
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#D97706',
          600: '#B45309',
          700: '#92400E',
        },
        secondary: {
          DEFAULT: '#1F2937', // Dark gray
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

---

### `validator`

**Purpose**: Add input validation to form slides.

**Trigger**: `slide-renderer` completes

**Input**: Form slide components

**Process**:
1. Identify validation rules from slide config
2. Add email format validation
3. Add required field validation
4. Create error message display
5. Integrate with form submission

**Output**: Updated FormSlide.tsx with validation

**Validation Rules**:
```typescript
const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  firstName: {
    required: true,
    minLength: 2,
    message: 'Please enter your first name',
  },
};
```

---

### `personalization-engine`

**Purpose**: Generate personalized content on Slide 19 based on collected answers.

**Trigger**: `state-manager` completes

**Input**: Quiz answers

**Process**:
1. Read selected options from state
2. Map answer IDs to display labels
3. Create personalized messaging
4. Animate progress indicators

**Output**: `LoadingSlide.tsx` with dynamic content

**Implementation**:
```typescript
export function LoadingSlide({ answers }: { answers: QuizAnswers }) {
  const personalizationItems = [
    {
      label: 'Aligning with your goals',
      value: formatAnswers(answers.motivation),
      icon: '🎯',
    },
    {
      label: 'Personalizing your lessons',
      value: formatAnswers(answers.interests),
      icon: '📚',
    },
    {
      label: 'Adjusting your content level',
      value: getAgeLabel(answers.age),
      icon: '📊',
    },
    {
      label: 'Building your practice plan',
      value: `${answers.focusArea} focus`,
      icon: '📋',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-center">
        Based on your answers, we're creating your personalized practice plan
      </h2>
      <p className="text-gray-600 text-center">
        You can tweak it anytime in the app
      </p>
      <div className="space-y-4">
        {personalizationItems.map((item, index) => (
          <PersonalizationRow
            key={index}
            {...item}
            delay={index * 500}
          />
        ))}
      </div>
    </div>
  );
}
```

---

### `integration-mocker`

**Purpose**: Create mock versions of Klaviyo and Checkout integrations for the MVP demo.

**Trigger**: `slide-renderer` completes

**Input**: Integration requirements from PRD

**Process**:
1. Create mock email submission function
2. Create mock checkout function
3. Add simulated success/loading states
4. Store data in localStorage (for demo purposes)

**Output**: Mock integration functions

**Implementation**:
```typescript
// lib/integrations-mock.ts

export async function mockSubmitEmail(email: string, firstName: string) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Store in localStorage for demo
  const leads = JSON.parse(localStorage.getItem('mockLeads') || '[]');
  leads.push({ email, firstName, timestamp: new Date().toISOString() });
  localStorage.setItem('mockLeads', JSON.stringify(leads));

  console.log('[MOCK] Email captured:', { email, firstName });
  return { success: true, message: 'Email captured successfully' };
}

export async function mockInitiateCheckout(quizData: QuizState) {
  // Simulate checkout initialization
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log('[MOCK] Checkout initiated with quiz data:', quizData);
  return { success: true, checkoutUrl: '#mock-checkout' };
}
```

---

## Layer 3: Build & Deploy Skills

### `build-compiler`

**Purpose**: Compile the Next.js application into a production-ready bundle.

**Trigger**: All Layer 0-2 skills complete

**Input**: Complete Next.js project

**Process**:
1. Run `npm install` (if needed)
2. Run `npm run build`
3. Capture and analyze any errors
4. Attempt auto-fix for common issues
5. Retry build (max 3 times)
6. Report success or escalate to human

**Error Handling**:
```typescript
const commonFixes = {
  'Module not found': async (error) => {
    // Extract missing module name and install it
    const module = extractModuleName(error);
    await runCommand(`npm install ${module}`);
  },
  'Type error': async (error) => {
    // Analyze and fix type errors
    const fix = analyzTypeError(error);
    await applyFix(fix);
  },
  'Import error': async (error) => {
    // Fix import path issues
    const fix = analyzeImportError(error);
    await applyFix(fix);
  },
};
```

**Output**:
```yaml
build_result:
  status: SUCCESS | FAILED
  build_time: "45 seconds"
  bundle_size: "250KB"
  errors_fixed: 2
  remaining_errors: 0
```

---

### `deploy-manager`

**Purpose**: Deploy the built application to a shareable preview URL.

**Trigger**: `build-compiler` succeeds

**Input**: Built Next.js application

**Process**:
1. Determine deployment target (Vercel, Netlify, local)
2. Authenticate with deployment service
3. Deploy application
4. Wait for deployment to complete
5. Return preview URL

**Deployment Methods**:
```typescript
const deploymentMethods = {
  vercel: async () => {
    // Deploy to Vercel
    const result = await runCommand('vercel --yes');
    return extractUrl(result);
  },
  netlify: async () => {
    // Deploy to Netlify
    const result = await runCommand('netlify deploy --prod');
    return extractUrl(result);
  },
  local: async () => {
    // Start local server with ngrok
    await runCommand('npm run start', { background: true });
    const result = await runCommand('ngrok http 3000');
    return extractUrl(result);
  },
};
```

**Output**:
```yaml
deploy_result:
  status: SUCCESS | FAILED
  method: "vercel"
  preview_url: "https://dqfe1-quiz-abc123.vercel.app"
  deployment_time: "30 seconds"
```

---

## Skill Execution Order

For the MVP build, skills execute in this order:

```
1. content-extractor (LAYER 0)
   ↓
   [CHECKPOINT 1: Content Review]
   ↓
2. slide-renderer (LAYER 1)
3. state-manager (LAYER 1)
4. branching-engine (LAYER 1)
5. progress-tracker (LAYER 2)
6. style-applier (LAYER 2)
7. validator (LAYER 2)
8. personalization-engine (LAYER 2)
9. integration-mocker (LAYER 2)
   ↓
   [CHECKPOINT 2: Component Review]
   ↓
10. build-compiler (LAYER 3)
    ↓
    [CHECKPOINT 3: Deployment Review]
    ↓
11. deploy-manager (LAYER 3)
```

---

## Testing Each Skill

### Unit Tests

| Skill | Test | Pass Criteria |
|-------|------|---------------|
| `content-extractor` | Extract content from 10 wireframes | All slides have question + options |
| `slide-renderer` | Render each component type | No TypeScript errors |
| `state-manager` | Set/get answers, navigate | State persists correctly |
| `branching-engine` | Test all 4 age branches | Correct testimonial returned |
| `progress-tracker` | Display at various stages | Shows correct step count |
| `validator` | Test valid/invalid inputs | Errors display correctly |
| `personalization-engine` | Generate with sample data | Displays collected answers |
| `integration-mocker` | Submit mock email | Data stored in localStorage |
| `build-compiler` | Build complete project | No build errors |
| `deploy-manager` | Deploy to Vercel | Returns valid URL |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-27 | Christopher Ogle + Claude | Initial micro-skills specification |

---

*This document defines "what each skill does" in the DQFE1 Quiz Builder. Together with DQFE1-QUIZ-PRD.md ("what success looks like") and DQFE1-QUIZ-MASTER-AGENT.md ("how they work together"), it forms the complete specification.*
