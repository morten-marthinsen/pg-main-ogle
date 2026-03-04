# AI WriterOps

*And it had nothing to do with better prompts*

**Source:** https://alexmcfarland.substack.com/p/this-one-change-made-my-ai-outputs
**Date:** 2025-07-16T17:12:44.859Z

---

[![](https://substackcdn.com/image/fetch/$s_!HSwf!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa5d4a5f9-b0f6-4dc5-a9c8-91f50b4e048a_2800x2000.png)](https://substackcdn.com/image/fetch/$s_!HSwf!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa5d4a5f9-b0f6-4dc5-a9c8-91f50b4e048a_2800x2000.png)

Most people are solving the wrong AI problem.

They're collecting prompts. Building complex templates. Adding XML tags and variable placeholders. I've seen prompt libraries that look like they need a computer science degree to understand.

But here's the thing: prompting isn't your problem. Your input architecture is.

* * *

## **Your prompts are fine. Your inputs aren’t.**

I've written thousands of AI-generated assets for actual clients and my own stuff.

You know what I discovered? Whether you're brand new or crafting elite-level prompts, most people are still missing this one critical piece. They haven't separated their **prompt logic** from their **context inputs**.

And that's the real moat now.

### **Even my 50-line prompt template was still amateur hour**

Look at this prompt template I used to use for newsletters:
    
    
    You are an experienced newsletter creator with a proven track record of achieving 50%+ open rates and hundreds of thousands of subscribers. Your task is to create a new edition for a newsletter about the following niche:
    
    <newsletter_niche>
    {{NEWSLETTER_NICHE}}
    </newsletter_niche>
    
    The specific topic for this edition is:
    
    <topic>
    {{TOPIC}}
    </topic>
    
    Before we begin, please review the following notes for additional context:
    
    <notes>
    {{NOTES}}
    </notes>
    
    Start by analyzing the project knowledge, notes, and topic. Conduct your analysis inside <newsletter_analysis> tags:
    
    1. Key themes from the newsletter niche:
       [List at least 3 key themes]
    
    2. Relevant information from the notes:
       [Summarize at least 3 relevant points]
    
    3. Potential angles for the newsletter:
       [List at least 5 potential angles]
    
    4. Target audience and their interests:
       [Describe target audience demographics and at least 3 primary interests]
    
    5. Potential reader pain points or desires related to the topic:
       [List at least 3 pain points and 3 desires]
    
    6. Content ideas based on the analysis:
       [Brainstorm at least 5 specific content ideas]
    
    7. Appropriate tone and style for the target audience:
       [Describe the tone and style, with at least 3 specific characteristics]
    
    8. Summary of findings:
       [Provide a brief summary of your analysis, highlighting the most important insights]
    
    Based on your analysis, complete the following tasks:
    
    1. Create 7 highly engaging hook/title options
    2. Create 7 subtitle options
    3. Write an engaging outline for this newsletter
    
    When creating hooks, titles, and subtitles, apply the following effective strategies:
    
    1. Subject Line Importance:
       - Subject lines determine whether an email gets opened.
       - A strong subject line hints at a benefit and/or sparks curiosity.
    
    2. Seven Effective Subject Line Styles:
       a) Curiosity
       b) Pain
       c) Benefit
       d) Story
       e) Question
       f) Contrarian
       g) Proof
    
    3. What to Avoid:
       - Generic labels (e.g., "Newsletter #3")
       - Boring yes/no questions
       - Over-clever wording
    
    4. Pro Tip: Use the word "THIS" for curiosity.
    
    5. Remember: Readers skim—give them something that stops the scroll.
    
    Present your work in the following format:
    
    <hook_titles>
    1. [Hook/Title 1]
    2. [Hook/Title 2]
    3. [Hook/Title 3]
    4. [Hook/Title 4]
    5. [Hook/Title 5]
    6. [Hook/Title 6]
    7. [Hook/Title 7]
    </hook_titles>
    
    <subtitles>
    1. [Subtitle 1]
    2. [Subtitle 2]
    3. [Subtitle 3]
    4. [Subtitle 4]
    5. [Subtitle 5]
    6. [Subtitle 6]
    7. [Subtitle 7]
    </subtitles>
    
    <newsletter_outline>
    I. [Main Section 1]
       A. [Subsection 1]
       B. [Subsection 2]
    II. [Main Section 2]
       A. [Subsection 1]
       B. [Subsection 2]
    III. [Main Section 3]
       A. [Subsection 1]
       B. [Subsection 2]
    </newsletter_outline>
    
    After presenting the outline, ask for my confirmation before writing the full newsletter. Ask if I would like any changes to the outline.
    

It’s a solid prompt.

But here's the catch:

  * I still have to manually swap in new context every damn time

  * I have to adjust instructions when switching between content types

  * I’m basically rebuilding the system for each use




That's not scaling. That's straight-up dependency.

* * *

## **The system that actually makes AI outputs not suck**

LLMs don't "understand" like we do.

They parse structure, match patterns, and hunt for relationships. So if you want reliable outputs—especially across clients, voices, and formats—you can't just throw in a few sentences and hope the model gets it right.

You need to format your inputs in a way the model can interpret consistently, every single time. I like to put these all under the umbrella term: **structured AI input (SAI).** In most cases, this SAI will be JSON for those familiar.

### **Don’t feed your AI word soup. Do this instead**

Let's say you're writing for a startup CEO who wants to publish thought leadership.

**Before (Unstructured Input):**
    
    
    Client: Dana Kim, CEO of Clarity Ops. She's into async systems and burnout prevention. Wants to stand out in the remote-first leadership space. Audience is mostly startup execs. Sound should be sharp but grounded.

**After (SAI):**
    
    
    {
      "client_name": "Dana Kim",
      "client_role": "CEO of Clarity Ops",
      "area_of_expertise": "Remote team operations and async leadership",
      "audience": "Startup founders, COOs, and team leads",
      "communication_goal": "Build thought leadership credibility",
      "voice_tone": ["sharp", "grounded", "pragmatic"],
      "core_messaging": "Smart async systems enable sustainable growth"
    }
    

See the difference? 

(This is a very basic example, but it demonstrates the point.)

[Share](https://alexmcfarland.substack.com/p/this-one-change-made-my-ai-outputs?utm_source=substack&utm_medium=email&utm_content=share&action=share&token=eyJ1c2VyX2lkIjo0MTMxNDI1LCJwb3N0X2lkIjoxNjg0ODc2NjMsImlhdCI6MTc2ODQyOTI1MCwiZXhwIjoxNzcxMDIxMjUwLCJpc3MiOiJwdWItMTgxNTUyMyIsInN1YiI6InBvc3QtcmVhY3Rpb24ifQ.5vlAevpEXS9dL7BP3vQ8vKlAbbNWWVjGDOdk-7chUYk)

* * *

## **This is your actual competitive advantage (not prompts)**

With SAI, you're giving AI clear keys and values.

Structured. Predictable. Easily pluggable into any prompt format or project knowledge.

This means:

  * Your prompts become simple orchestration commands

  * Your context becomes reusable intellectual property

  * Your outputs become consistently on-brand

  * Your systems become actually scalable




Anyone can copy a prompt. No one can copy your structured context architecture.

* * *

## **Stop hoarding prompts like a digital packrat**

Stop collecting prompts. Start building context systems.

The future belongs to those who understand that AI success isn't about better prompts—it's about better input architecture. And now you know the secret that 99% of AI users are still missing.

Ready to build your own SAI system?

**☑️ Next step:** Take one piece of content you create regularly. Map out all the context variables. Structure them in JSON format. Save somewhere safe.

This is how you begin to build a real competitive advantage with AI.

### **Want me to show you exactly how to build these systems?**

Join the waitlist for my upcoming training program and community. We're going deep on building actual writing systems that scale.

#### **→[Click here to join the waitlist](https://aidisruptor.kit.com/f14a3944e9)**

— Alex

 _Founder of AI Disruptor_

**PS:** Over 100 people are already on the list. We're launching soon, and I'm only taking a limited group through the first cohort.
