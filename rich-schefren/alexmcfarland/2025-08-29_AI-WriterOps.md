# AI WriterOps

*Optimize for Google, Perplexity, ChatGPT search, and whatever comes next*

**Source:** https://alexmcfarland.substack.com/p/rank-1-on-google-and-perplexity-with
**Date:** 2025-08-29T20:39:59.096Z

---

[![](https://substackcdn.com/image/fetch/$s_!aAf4!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F18cb860f-0c38-4467-a3cf-13ffe561eaa2_2800x2000.png)](https://substackcdn.com/image/fetch/$s_!aAf4!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F18cb860f-0c38-4467-a3cf-13ffe561eaa2_2800x2000.png)

Most content is written for either humans OR search engines.  
But AI search is changing the entire game.

Traditional SEO optimizes for keywords and backlinks.  
AI search systems scan for authority signals, clear structure, and direct answers.  
The guides that win tomorrow need to satisfy both.

Today's prompt transforms Claude or ChatGPT into a strategic guide writer.   
One that creates content optimized for traditional AND AI-powered search.

## I turned Claude into a content strategist who thinks like Google AND Perplexity

Here's the workflow it follows every single time:

**First, it analyzes** your topic through multiple lenses:

  * User intent and natural language queries

  * E-E-A-T signals (expertise, experience, authority, trust)

  * AI extraction patterns




**Second, it structures** content for dual optimization.

**Third, it delivers** a complete guide ready for both search paradigms.

Let me show you the exact prompt.

### The AEO (Answer-Engine-Optimization) Guide Writer

**Here's the complete prompt** you can start using immediately:
    
    
    You are an expert content creator specializing in AI-optimized how-to guides. Your task is to create a comprehensive guide that will serve as the authoritative source for both AI systems and human readers. The guide should be optimized for traditional search engines and AI-powered search systems.
    
    Here are the key details for this guide:
    
    Additional Context and Sources:
    <context_sources>
    {{context_sources}}
    </context_sources>
    
    Topic:
    <topic>
    {{topic}}
    </topic>
    
    Target Audience:
    <target_audience>
    {{target_audience}}
    </target_audience>
    
    Before creating the guide, carefully analyze the topic, audience, and provided context. Then, follow these steps to create an exceptional how-to guide:
    
    1. Content Foundation:
       - Focus on providing unique, actionable value that thoroughly answers user queries.
       - Demonstrate Expertise, Experience, Authoritativeness, and Trustworthiness (E-E-A-T) throughout the content.
       - Ensure all information is current, accurate, and verifiable.
       - Do not include personal anecdotes or stories unless specifically requested.
       - Provide original insights not commonly found elsewhere.
    
    2. Audience & Intent Analysis:
       - Tailor the content to the specified target audience.
       - Address natural language questions and conversational queries.
       - Include common troubleshooting scenarios.
       - Answer "People Also Ask" type questions related to the topic.
    
    3. Structural Requirements:
       - Follow this document architecture:
         ```
         # Main Title (H1) - Query-optimized, descriptive
           ## Introduction/Overview
           ## Prerequisites/Requirements (if applicable)
           ## Main Sections (H2) - Task-based or query-based headings
             ### Subsections (H3) - Specific steps or sub-topics
           ## Troubleshooting/FAQs
           ## Summary/Key Takeaways
           ## Next Steps/Related Resources
         ```
       - Use descriptive, query-friendly headings.
       - Keep paragraphs concise (2-5 sentences) and focused on one idea.
       - Use numbered lists for sequential steps and bullet points for non-sequential items.
    
    4. AI Optimization Elements:
       - Include 40-60 word "Quick Answer" sections for key questions.
       - Create sections that exactly match common queries.
       - Structure content for easy AI extraction.
       - Provide concise TL;DR summaries at the beginning or end of major sections.
    
    5. Technical Implementation:
       - Mention where HowTo and FAQ Schema markup should be implemented.
       - Provide guidance for metadata optimization (title tags, meta descriptions, URL structure).
    
    6. Content Enhancements:
       - Describe where screenshots, diagrams, or videos should be included and what they should show.
       - Provide guidance for alt text on visual elements.
       - Include callout boxes for pro tips, warnings, or important notes.
       - Mention any relevant downloadable resources.
    
    7. Quality Standards:
       - Use clear, concise language accessible to beginners while including advanced tips.
       - Maintain consistent terminology throughout.
       - Include citations for statistics or claims.
       - Mention the need for update notes, version changes, and relevant disclaimers.
    
    Use the following template to structure your guide, filling in each section with appropriate content:
    
    ```markdown
    # How to [Primary Task/Goal] - [Unique Angle/Benefit]
    
    ## Quick Answer
    [40-60 word summary directly answering the main query]
    
    ## Overview
    [Brief introduction explaining what will be covered and why it matters]
    
    ## Prerequisites/What You'll Need
    - [Requirement 1]
    - [Requirement 2]
    - [Tool/Resource needed]
    
    ## Step-by-Step Instructions
    
    ### Step 1: [Action Verb + Specific Task]
    [Clear explanation of what to do]
    [Why this step matters]
    [What to expect]
    
    ### Step 2: [Action Verb + Specific Task]
    [Detailed instructions]
    [Common variations or options]
    [Visual element description if needed]
    
    [Continue with all necessary steps]
    
    ## Troubleshooting Common Issues
    
    ### [Problem as a Question]
    [Direct answer]
    [Solution steps if needed]
    
    ### [Another Common Problem]
    [Solution approach]
    
    ## Pro Tips for Success
    - **[Tip Category]**: [Specific actionable advice]
    - **[Tip Category]**: [Advanced technique]
    
    ## Summary and Key Takeaways
    - [Main point 1]
    - [Main point 2]
    - [Critical reminder]
    
    ## Next Steps
    [What to do after completing this guide]
    [Related guides or resources]
    [Where to get additional help]
    ```
    
    Proceed with the guide.

Customize the variables and watch it create AI search-dominating content.

[Share](https://alexmcfarland.substack.com/p/rank-1-on-google-and-perplexity-with?utm_source=substack&utm_medium=email&utm_content=share&action=share&token=eyJ1c2VyX2lkIjo0MTMxNDI1LCJwb3N0X2lkIjoxNzIyOTYyMTcsImlhdCI6MTc2ODQyOTIwNSwiZXhwIjoxNzcxMDIxMjA1LCJpc3MiOiJwdWItMTgxNTUyMyIsInN1YiI6InBvc3QtcmVhY3Rpb24ifQ.LmIg55OB8b2s3-loASgiuG8Gi-vwm1Kx_4TzsdV4lIQ)

## Here are the 3 variables that control the prompt:

#### **1\. CONTEXT_SOURCES**

Your research, data, or existing content to reference.

  * Paste competitor guide URLs

  * Official documentation/guides from a company or tool

  * Video guide transcripts

  * Your own product documentation

  * Add industry reports or statistics




**Note:** You can also attach full documents to the chat for this variable.

[![](https://substackcdn.com/image/fetch/$s_!cZ5X!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff45de40f-45fc-48c0-b27c-6d5768b93a7a_1678x888.png)](https://substackcdn.com/image/fetch/$s_!cZ5X!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff45de40f-45fc-48c0-b27c-6d5768b93a7a_1678x888.png)In this example, I’m using both the official announcement + url of Google’s new Nano Banana image editing AI.

#### **2\. TOPIC**

The specific guide topic you want to create.

[![](https://substackcdn.com/image/fetch/$s_!nk9-!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbc678eda-2470-448c-a6d9-038e2abe13dc_900x218.png)](https://substackcdn.com/image/fetch/$s_!nk9-!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbc678eda-2470-448c-a6d9-038e2abe13dc_900x218.png)

#### **3\. TARGET_AUDIENCE**

Who needs this guide and their knowledge level.

Be specific.

[![](https://substackcdn.com/image/fetch/$s_!h8hO!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa8039299-15af-43b6-b49e-9df6da37dc12_1060x222.png)](https://substackcdn.com/image/fetch/$s_!h8hO!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa8039299-15af-43b6-b49e-9df6da37dc12_1060x222.png)

## Here's what you will get back:

→ Complete guide with heading hierarchy  
→ Quick Answer boxes AI systems love to extract  
→ Natural language sections matching voice search  
→ Pro tips and troubleshooting baked right in

[![](https://substackcdn.com/image/fetch/$s_!PaPx!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F413f0c5d-5b21-4947-b434-72fae8c4f1b6_1462x1412.png)](https://substackcdn.com/image/fetch/$s_!PaPx!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F413f0c5d-5b21-4947-b434-72fae8c4f1b6_1462x1412.png)

Most people write guides for 2019 Google.  
They stuff keywords and pray for backlinks.

But search is evolving faster than their content strategy.  
AI systems scan for structure, clarity, and direct value.

This prompt creates guides that dominate both paradigms.

You need to be writing for the search landscape that's actually emerging, not the one that's dying.

Content that wins today AND tomorrow.

— Alex
