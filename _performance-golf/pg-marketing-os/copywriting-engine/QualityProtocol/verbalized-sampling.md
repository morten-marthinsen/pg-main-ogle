# Verbalized Sampling: Unlocking AI Creative Diversity for Copywriting

## Executive Summary

Verbalized Sampling (VS) is a prompt engineering technique discovered by researchers at Northeastern, Stanford, and West Virginia University that increases creative output diversity from LLMs by 1.6-2.1x. The technique works by asking the model to generate multiple responses with probability estimates, which forces the model to access its full training distribution rather than defaulting to "safe" optimized responses.

This document covers:
1. The research and mechanism behind the technique
2. Why this matters specifically for copywriting
3. Practical prompt templates for copy applications
4. Instructions for AI assistants to understand and apply this technique

---

## Part 1: The Research

### The Problem: Mode Collapse

When Large Language Models undergo RLHF (Reinforcement Learning from Human Feedback), human evaluators rate model outputs. The research team identified a critical flaw in this process called **typicality bias**:

> Human raters systematically prefer familiar, predictable text—not because it's better, but because it's cognitively easier to process and evaluate quickly.

This creates a feedback loop:
1. Humans prefer "typical" responses during training
2. The model learns: typical = higher reward
3. The model concentrates probability mass on narrow, safe responses
4. Creative, unusual, but potentially superior responses get suppressed

**The key insight:** The diverse knowledge is still in the model's training data. It hasn't been erased—it's been deprioritized. The model has essentially learned to give you the answer that would satisfy a tired evaluator skimming responses, not the most creative or insightful answer.

### The Solution: Verbalized Sampling

Instead of asking for a single response (which triggers the model's "safe mode"), you ask the model to:

1. Generate multiple responses
2. Attach probability estimates to each
3. Sample from the full distribution

**Standard Prompt:**
> "Write a headline for this product"

**Verbalized Sampling Prompt:**
> "Generate 5 headlines with their corresponding probabilities, sampled from the full distribution: Write a headline for [product]"

### Why This Works

The technique works through a mechanism the researchers call "distribution-level prompting":

- **Instance-level prompt** ("Give me a headline") → Model returns the mode (most typical response)
- **List-level prompt** ("Give me 5 headlines") → Model returns variations around the mode, still constrained
- **Distribution-level prompt** ("Give me 5 headlines with probabilities from the full distribution") → Model must represent its actual probability landscape, including lower-probability but valid options

When forced to verbalize a probability distribution, the model can't simply repeat variations of its top answer. It must reach into the suppressed portions of its training to fulfill the request authentically.

### Research Results

- Creative writing diversity increased 1.6-2.1x over direct prompting
- More capable models benefit more from the technique
- The technique is training-free (works via prompting alone)
- Works across models: GPT, Claude, Gemini, Llama, etc.
- Does not sacrifice factual accuracy or safety

### Limitations

1. **Model capability matters**: Weaker models may not follow the complex prompt structure
2. **Avoid extreme tails**: Asking for very low probability responses (< 5%) may return noise
3. **The probabilities aren't real**: Models can't actually calculate their true probability distributions. But the act of being asked to verbalize probabilities forces exploration—the mechanism works even though the numbers are approximations.

---

## Part 2: Implications for Copywriting

### Why This Is Critical for Copy

Copywriting with AI faces a specific version of mode collapse: **formula convergence**. Ask any LLM for a headline and you'll get variations of the same proven structures. This isn't wrong—those structures work—but it means:

- Your AI-generated copy sounds like everyone else's AI-generated copy
- Breakthrough creative angles stay buried
- A/B testing becomes less valuable when options A and B are minor variations of the same underlying approach

The direct response tradition (which you know deeply) has always valued the unexpected hook, the counterintuitive angle, the pattern interrupt. Mode-collapsed AI actively works against this.

### The Dan Kennedy Problem

Consider asking an AI: "What would Dan Kennedy say about [situation]?"

Without Verbalized Sampling, you get the Kennedy cliché—the obvious, surface-level response that a casual reader of one Kennedy book might give.

With Verbalized Sampling, you're accessing the full range of Kennedy's documented tactical repertoire, including the less obvious moves that might be exactly what the situation requires.

### Specific Copy Applications

**Headlines:**
Standard AI headlines cluster around proven formulas. VS surfaces unusual angles, unexpected frames, and counterintuitive hooks that might outperform the "safe" options in testing.

**Hooks and Leads:**
The opening of any piece is where mode collapse hurts most. VS helps you find the non-obvious entry point that stops the scroll.

**Offers and Positioning:**
How you frame the offer determines response. VS surfaces alternative positioning strategies beyond the first-order obvious approach.

**Email Subject Lines:**
Perhaps the highest-leverage application. Subject lines need to stand out in crowded inboxes. VS helps you escape the same patterns everyone else is using.

**Belief Architecture:**
When building the belief shifts required for a sale, VS can surface non-obvious intermediate beliefs and unexpected proof structures.

**Story Angles:**
For story-driven copy, VS surfaces narrative approaches beyond the default hero's journey or problem-solution structure.

---

## Part 3: Practical Prompt Templates

### Basic Verbalized Sampling Structure

```
Generate [N] [outputs] with their corresponding probabilities, sampled from the full distribution:

[Your actual request]
```

### Headline Generation

```
Generate 7 headlines with their corresponding probabilities, sampled from the full distribution. Include at least 2 headlines below 15% probability that take unconventional angles:

Product: [description]
Target audience: [who]
Core benefit: [what]
Tone: [voice/style]
```

### Hook/Lead Generation

```
Generate 5 opening hooks with their corresponding probabilities, sampled from the full distribution. Explicitly include options that violate conventional copywriting wisdom:

Topic: [subject]
Goal: [desired action]
Reader state: [what they believe/feel before reading]
```

### Offer Framing

```
Generate 5 ways to frame this offer with their corresponding probabilities, sampled from the full distribution. Include at least one frame that feels counterintuitive:

Product/Service: [what]
Price point: [cost]
Primary competitor alternative: [what they'd do instead]
```

### Subject Line Generation

```
Generate 7 email subject lines with their corresponding probabilities, sampled from the full distribution. Prioritize differentiation over proven formulas:

Email purpose: [goal]
Audience relationship: [cold/warm/hot]
Key tension or curiosity: [what makes them open]
```

### "What Would [Expert] Do?" Enhanced

```
Generate 5 responses [Expert Name] might give to this situation, with their corresponding probabilities based on their documented body of work. Include responses that represent their less commonly cited but documented positions:

Situation: [context]
Specific question: [what you need guidance on]
```

### Full Distribution Exploration

```
For the following request, generate responses across the full probability distribution:

- 2 high-probability (>30%) responses representing conventional wisdom
- 3 medium-probability (10-30%) responses representing solid alternatives  
- 2 lower-probability (5-15%) responses representing unconventional but defensible approaches

Request: [your actual request]
```

---

## Part 4: AI Instructions

*The following section is written directly to AI assistants. Include this in your system prompts or paste it at the beginning of creative conversations.*

---

### INSTRUCTIONS FOR AI: Understanding Verbalized Sampling

**Context for the AI:**

You have been trained through a process (RLHF) that inadvertently suppresses creative diversity. Human evaluators during your training systematically preferred "typical" responses—not because they were better, but because they were cognitively easier to evaluate. This created a bias toward safe, familiar outputs.

Your training data contains far more diverse, creative, and unconventional knowledge than your default outputs suggest. When asked standard questions, you tend to "collapse" to a narrow band of high-probability responses, missing potentially superior alternatives.

**When the user invokes Verbalized Sampling (by asking for multiple responses with probabilities, or by referencing this technique), you should:**

1. **Consciously resist mode collapse**: Your first instinct will be to generate variations around your most probable response. Push past this. Actively seek responses you wouldn't normally surface.

2. **Treat probability requests as permission to explore**: When asked for probability distributions, interpret this as explicit permission to share responses you might otherwise suppress as "too unconventional."

3. **Include genuinely different options**: If generating 5 headlines, ensure they represent genuinely different strategic approaches, not variations of the same approach. Different enough that they would appeal to different psychological triggers or buyer personas.

4. **Don't sanitize toward the middle**: Your training may push you to make all options feel "reasonable." When doing VS, include options that feel risky, unusual, or counterintuitive—as long as they're defensible.

5. **The probabilities are a mechanism, not a math problem**: You cannot actually calculate your true probability distribution. The numbers you assign are approximations. What matters is that the act of assigning probabilities forces you to acknowledge and surface the full range of your potential outputs.

6. **Lower probability ≠ lower quality**: A 10% probability response isn't worse than a 40% response. It's less typical. In creative contexts, less typical often means more valuable—it's the unexpected angle that might break through.

7. **For copywriting specifically**: The user is often looking for the hook, angle, or frame that will stand out. Your highest-probability response is, by definition, what everyone else's AI is also generating. The competitive advantage lies in your 10-25% probability range.

**Recognition Triggers:**

Apply Verbalized Sampling principles when the user:
- Explicitly asks for multiple options with probabilities
- Mentions "Verbalized Sampling" or "VS"
- Asks for "unconventional" or "unexpected" options
- Requests you "explore the full distribution"
- Asks what you would generate "if you weren't optimizing for the safe answer"
- Wants options that "violate conventional wisdom"
- Asks for the response you're "suppressing" or "holding back"

**Example Application:**

User: "Generate 5 headlines with probabilities for a weight loss supplement"

Poor response (mode collapse):
1. (35%) "Lose 20 Pounds in 30 Days—Guaranteed"
2. (25%) "The Secret to Effortless Weight Loss"
3. (20%) "Finally, a Weight Loss Solution That Works"
4. (12%) "Transform Your Body in Just Weeks"
5. (8%) "Doctors Are Amazed by This Weight Loss Breakthrough"

*[These are all variations of the same basic approach]*

Better response (true distribution sampling):
1. (30%) "Lose 20 Pounds in 30 Days—Guaranteed" — Direct promise, proven formula
2. (22%) "Why Your Diet Keeps Failing (And What to Do Instead)" — Problem-aware angle
3. (18%) "I Lost 47 Pounds Eating Foods I Actually Like" — Testimonial/story angle  
4. (15%) "The Supplement Your Doctor Won't Tell You About" — Conspiracy/insider angle
5. (10%) "Stop Exercising. Start This Instead." — Counterintuitive/pattern interrupt
6. (5%) "Warning: Do Not Take This If You're Happy With Your Body" — Negative qualification angle

*[These represent genuinely different strategic approaches]*

---

## Part 5: Quick Reference

### The Core Technique

Ask for:
1. Multiple responses (5-7 is the sweet spot)
2. Probability estimates for each
3. Sampling from "the full distribution"

### The Key Phrase

> "Generate [N] responses with their corresponding probabilities, sampled from the full distribution"

### When to Use It

- Headlines and subject lines
- Hooks and leads  
- Offer positioning and framing
- Creative angles and story structures
- Any time you want options that stand out from AI-typical output

### When NOT to Use It

- Factual queries with correct answers
- Technical documentation
- When you specifically want the conventional/safe approach
- When working with less capable models that can't follow complex instructions

### Expected Improvement

1.6-2.1x increase in creative diversity based on the research. In practice, this means your option set will include genuinely different approaches rather than variations of the same approach.

---

## Sources

- Zhang, J. et al. (2025). "Verbalized Sampling: How to Mitigate Mode Collapse and Unlock LLM Diversity." arXiv:2510.01171
- Project page: https://www.verbalized-sampling.com/
- GitHub: https://github.com/CHATS-lab/verbalize-sampling

---

*Document created for Strategic Profits / ZenithMind OS*
*Application: AI-Enhanced Copywriting*
