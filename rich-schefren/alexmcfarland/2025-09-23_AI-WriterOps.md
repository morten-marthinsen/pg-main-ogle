# AI WriterOps

*My method for creating repeatable writing systems*

**Source:** https://alexmcfarland.substack.com/p/how-to-get-claude-to-write-its-own
**Date:** 2025-09-23T20:23:33.010Z

---

AI struggles to maintain consistency across sessions without clear structural guidelines.

You find yourself explaining the same format requirements over and over. Each new chat means starting from scratch with your preferences.

Today's technique changes that by converting any example into reusable project instructions.

[![](https://substackcdn.com/image/fetch/$s_!Kl4a!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F903894b3-1d2a-445d-8226-193646c7e80f_1550x1040.png)](https://substackcdn.com/image/fetch/$s_!Kl4a!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F903894b3-1d2a-445d-8226-193646c7e80f_1550x1040.png)

> **Project Instructions** = The permanent blueprint for how AI structures your content. Think formatting rules, section order, and output requirements that live in your AI project forever. Write once, use infinitely. You can also think of it as the system prompt vs the user message.

## Here’s how you can get Claude to write its own project instructions

There are two ways to create project instructions for your AI projects.

You can write them manually from scratch. Or you can have Claude generate the first draft for you.

My approach is to start with Claude-generated instructions as my foundation.

Then dig into the details myself. Add sections that matter to my use case or brand. Remove what doesn't fit. Test and iterate until it's perfect.

This prompt gives you that critical first draft to build from.

The generated version often gets you 70% there instantly.

Your customization makes it 100% yours. This combination beats starting from scratch every time.

### The prompt that builds your instructions

The technique I created will draft you multi-page instructions instantly.

Here's the complete prompt:
    
    
    You are an expert AI-writing systems architect.
    
    Your task is to generate highly detailed **Project Instructions** for a specific type of content based on attached examples, templates, tactics or frameworks. These instructions will be reused across multiple AI sessions to guide the structure, purpose, and stylistic expectations of the output.
    
    ---
    
    GOAL  
    Create clear, structured, detailed (sometimes multi-page) and reusable Project Instructions that explain to the AI *how* to write this type of content. These instructions should be general-purpose and focused on execution, not targeting. They should not focus on tone/voice, that is what our Voice DNA is for. The instructions should clearly communicate to the LLM that no personal stories, anecdotes, or experiences should be created without the user explicitly saying so.
    
    ---
    
    CONTEXT  
    The user has attached one or more of the following:
    - Sample content pieces they’ve written or admire
    - Frameworks or tactics for structuring this content
    - Formatting preferences for this specific type of asset
    
    The target output is: {{INSERT TYPE OF CONTENT}}
    
    ---
    
    FORMAT  
    Return extremely detailed project instructions for this task. Format with markdown. Name them something very clear to the task.

Customize the variable for your specific content type.

[Share](https://alexmcfarland.substack.com/p/how-to-get-claude-to-write-its-own?utm_source=substack&utm_medium=email&utm_content=share&action=share&token=eyJ1c2VyX2lkIjo0MTMxNDI1LCJwb3N0X2lkIjoxNzQzNjc1NDMsImlhdCI6MTc2ODQyOTE3OSwiZXhwIjoxNzcxMDIxMTc5LCJpc3MiOiJwdWItMTgxNTUyMyIsInN1YiI6InBvc3QtcmVhY3Rpb24ifQ.4s4Ori_wtkbb1Ep8ipabO0vPxj7_ezGYH4P9R1bF7TU)

## Here's the one variable that controls the prompt:

**1\. {{INSERT TYPE OF CONTENT}}**

You just need to insert your example content into this variable. Explain what it is that you are creating. Include any helpful notes for the AI.

Then you can either paste the actual example at the end of the prompt or attach it to the chat. This can be anything.

Examples that work:

  * Newsletters or white papers

  * Entire ebooks

  * Social media posts

  * About pages

  * LinkedIn profiles




The point here is recreating the structure and execution, not the actual content.

That's where your other project knowledge, follow-up prompting, and context comes into play.

This repeatable system creates permanent, reusable instructions. You build once and deploy across unlimited projects.

### After you run the prompt, you’ll get back:

→ Multi-page detailed instructions in markdown  
→ Clear section-by-section breakdowns  
→ Execution-focused guidelines (not tone)  
→ Format specifications AI can follow consistently

Feed it your best examples to extract maximum pattern detail.

Include multiple samples if you want comprehensive coverage. The more examples you provide, the more nuanced your instructions become.

Save these instructions directly in your Claude or ChatGPT projects.

## Most people write prompts for single outputs, but you’ll be building infrastructure

These project instructions become permanent assets that compound value over time.

Each content type gets its own blueprint.

— Alex  
Founder: [AI WriterOps](https://writerops.ai/) | [AI Disruptor](https://aidisruptor.ai/)

Btw: this project instruction prompt is part of my AI WriterOps program.
