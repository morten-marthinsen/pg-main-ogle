# AI WriterOps

*News reports are just systematic information processing*

**Source:** https://alexmcfarland.substack.com/p/turn-any-source-into-professional
**Date:** 2025-08-27T17:01:01.440Z

---

[![](https://substackcdn.com/image/fetch/$s_!Sl9m!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0729b58a-72c0-4434-909e-d4e99921896d_2800x2000.png)](https://substackcdn.com/image/fetch/$s_!Sl9m!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0729b58a-72c0-4434-909e-d4e99921896d_2800x2000.png)

I’ve been using AI to write news-style content for a long time. One of my first jobs in this industry was covering news stories for various publications. It was the first time I began experimenting with AI writing systems.

Professional news writing follows a specific structure. There's a reason journalists write the way they do - it works. And when you teach AI that structure? You get content that can be published in the best publications.

Today’s prompt will help you write professional news reports with ChatGPT or Claude.

It forces AI to analyze sources properly, develop real angles, and follow actual journalistic standards.

## I turned Claude into a journalist

This prompt makes AI think through the entire editorial process.

First, it analyzes all your source material and identifies what actually matters. Then it develops multiple headline options and explains why each one works. Finally, it structures everything using real journalistic standards - inverted pyramid, proper attribution, balanced perspectives.

It's basically an entire newsroom workflow compressed into one prompt.

#### Now, here’s the prompt you can use to write news reports:
    
    
    You are a professional journalist tasked with creating a high-quality news report based on provided information. Your goal is to produce an accurate, fair, and engaging news article that adheres to the highest journalistic standards.
    
    First, review the following materials:
    
    1. Source Material:
    <source_material>
    {{SOURCE_MATERIAL}}
    </source_material>
    
    2. Additional Context:
    <additional_context>
    {{ADDITIONAL_CONTEXT}}
    </additional_context>
    
    3. Story Focus:
    <story_focus>
    {{STORY_FOCUS}}
    </story_focus>
    
    4. Target Audience:
    <target_audience>
    {{TARGET_AUDIENCE}}
    </target_audience>
    
    Now, follow these steps to create your news article:
    
    1. Analyze the Information:
    Wrap your analysis inside <information_analysis> tags in your thinking block:
    a) Identify at least 5 key facts from the source material.
    b) Note important context and background information.
    c) Identify potential angles and assess newsworthiness.
    d) Flag any gaps or unclear information.
    e) Determine the most newsworthy element for the lead.
    f) Rank supporting facts by importance.
    g) Identify relevant stakeholders and perspectives.
    h) Separate facts from opinions or analysis.
    i) List and evaluate potential sources for quotes.
    j) Consider potential ethical concerns or conflicts of interest.
    k) Assess the reliability and potential biases of the source material.
    
    2. Develop Article Structure:
    a) Create a table with 5 potential headlines (5-10 words each) using active voice and present tense. Include a brief explanation for each headline choice.
    b) Construct a lead paragraph (25-35 words) answering Who, What, When, Where, Why, and How.
    c) Develop a nut graph explaining why the story matters and providing essential context.
    d) Plan 3-5 subheadings for the article that effectively organize the content.
    
    3. Write the Article:
    Apply these journalistic standards and writing guidelines:
    - Ensure accuracy by using only information from provided sources.
    - Present multiple perspectives when available and use neutral, unbiased language.
    - Clearly attribute all information sources.
    - Use clear, direct language and avoid jargon unless necessary (then explain).
    - Keep sentences under 25-30 words and paragraphs short (1-3 sentences).
    - Use active voice and maintain an objective, professional tone.
    - Follow the inverted pyramid structure: Lead, Supporting Details, Additional Context, Future Implications.
    - Include the planned subheadings to organize longer sections.
    - Verify all facts, figures, quotes, names, titles, dates, and locations against the source material.
    - Balance public interest with privacy concerns.
    - Avoid sensationalism, false balance, and mixing fact with opinion.
    
    4. Format your output as follows:
    
    [Table of 5 Headline Options with Explanations]
    
    [Chosen Headline]
    
    [Lead paragraph]
    
    [Nut graph]
    
    [Subheading 1]
    [Supporting details in order of importance, with clear attribution]
    
    [Subheading 2]
    [Additional context and background information]
    
    [Subheading 3]
    [More supporting details or related information]
    
    [Subheading 4 (if needed)]
    [Further context or analysis]
    
    [Subheading 5 (if needed)]
    [Future implications or next steps, if applicable]
    
    5. Quality Assurance:
    Before submitting, review your article to ensure it:
    - Adheres to the provided structure
    - Includes all required elements (headline options, lead, nut graph, subheadings)
    - Maintains accuracy and fairness
    - Uses clear and engaging language
    - Properly attributes all information
    - Avoids ethical concerns or biases
    
    Your final output should include only the formatted news article as described above. Ensure your article adheres to the highest journalistic standards of accuracy, fairness, and public service. Do not duplicate or rehash any of the work you did in the information analysis section.
    

[Share](https://alexmcfarland.substack.com/p/turn-any-source-into-professional?utm_source=substack&utm_medium=email&utm_content=share&action=share&token=eyJ1c2VyX2lkIjo0MTMxNDI1LCJwb3N0X2lkIjoxNzIwOTkwNTMsImlhdCI6MTc2ODQyOTIwNywiZXhwIjoxNzcxMDIxMjA3LCJpc3MiOiJwdWItMTgxNTUyMyIsInN1YiI6InBvc3QtcmVhY3Rpb24ifQ.gV2nR2QapJQoUsrwDU1SfkJ5-1h3rV0qSGvbg0EyxqU)

## Here are the 4 variables that control the prompt:

The prompt uses four variables that control what kind of article you get:

### 1\. SOURCE_MATERIAL

[![](https://substackcdn.com/image/fetch/$s_!gUdB!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3dcb4d5a-1d83-4b1d-b49b-f934149a93d7_454x208.png)](https://substackcdn.com/image/fetch/$s_!gUdB!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3dcb4d5a-1d83-4b1d-b49b-f934149a93d7_454x208.png)

Your raw information. Articles, reports, data, press releases - whatever you're working from.

Three ways to input this:

  * Paste the full text directly

  * Drop in URLs

  * Attach documents




[![](https://substackcdn.com/image/fetch/$s_!XWyW!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6a1ae142-fc17-442e-86e0-5332b7d948d9_1384x1246.png)](https://substackcdn.com/image/fetch/$s_!XWyW!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6a1ae142-fc17-442e-86e0-5332b7d948d9_1384x1246.png)

### 2\. ADDITIONAL_CONTEXT

[![](https://substackcdn.com/image/fetch/$s_!5YK1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe4655f56-fae5-4909-85d0-8a03a47f9ca9_490x208.png)](https://substackcdn.com/image/fetch/$s_!5YK1!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe4655f56-fae5-4909-85d0-8a03a47f9ca9_490x208.png)

Background that matters but isn't the main story.

Like if you're writing about a company's new product, the context might be their recent layoffs or industry trends. Stuff that adds depth without taking over the narrative.

### 3\. STORY_FOCUS

[![](https://substackcdn.com/image/fetch/$s_!ujsN!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F801b7790-9690-4e94-bff6-90fd78193ce6_374x210.png)](https://substackcdn.com/image/fetch/$s_!ujsN!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F801b7790-9690-4e94-bff6-90fd78193ce6_374x210.png)

This is your angle. What specifically are you covering?

### 4\. TARGET_AUDIENCE

[![](https://substackcdn.com/image/fetch/$s_!jqnY!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F265a63e3-4863-4bed-90b7-6c769c9e5c63_446x206.png)](https://substackcdn.com/image/fetch/$s_!jqnY!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F265a63e3-4863-4bed-90b7-6c769c9e5c63_446x206.png)

Who reads this and why do they care?

Don't just say "business readers." Say "CTOs evaluating AI infrastructure" or "investors tracking sustainability metrics." Specific audiences get specific content.

### Here’s what you will get back:

→ 5 different headlines with strategic reasoning for each

[![](https://substackcdn.com/image/fetch/$s_!g9dg!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe26d4331-1501-4135-bd21-cb8339f2ff89_1486x602.png)](https://substackcdn.com/image/fetch/$s_!g9dg!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe26d4331-1501-4135-bd21-cb8339f2ff89_1486x602.png)

→ Lead paragraph with all essential facts

[![](https://substackcdn.com/image/fetch/$s_!-bdA!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6cd89183-ad03-4a12-9f41-55c73785d01c_1396x464.png)](https://substackcdn.com/image/fetch/$s_!-bdA!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6cd89183-ad03-4a12-9f41-55c73785d01c_1396x464.png)

→ Clear story structure with logical flow

[![](https://substackcdn.com/image/fetch/$s_!FbX8!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc3df6602-c16a-460e-96bb-5dd6b43e729d_1486x1272.png)](https://substackcdn.com/image/fetch/$s_!FbX8!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc3df6602-c16a-460e-96bb-5dd6b43e729d_1486x1272.png)

It should go without saying that you need to fact-check your news reports.

## News reports are just systematic information processing

News-style content drives crazy engagement when done right. It's informative, scannable, and builds authority.

But most people can't write it properly. They ramble, bury the lead, forget attribution. This prompt handles all that structure automatically.

You focus on finding good stories and angles. AI handles the formatting and journalistic standards. That's how you scale quality content.

— Alex 

_Founder:[AI WriterOps](https://writerops.ai/) | [AI Disruptor](https://aidisruptor.ai/)_
