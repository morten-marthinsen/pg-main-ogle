# AI WriterOps

*Plus: ChatGPT is trying to become your entire workflow hub*

**Source:** https://alexmcfarland.substack.com/p/openai-just-made-building-ai-agents
**Date:** 2025-10-07T13:39:50.342Z

---

[![](https://substackcdn.com/image/fetch/$s_!FaqF!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6e3142b9-133d-4332-9e3a-2621016e33b6_2800x2000.png)](https://substackcdn.com/image/fetch/$s_!FaqF!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6e3142b9-133d-4332-9e3a-2621016e33b6_2800x2000.png)

OpenAI just made building AI agents stupid simple.

Yesterday at DevDay, they dropped a bunch of announcements. New models, new features, new integrations. There’s a lot to unpack. But if you’re building with AI, two things stand out to me: building agents just got 10x easier, and ChatGPT is becoming the platform that connects everything.

So today, I’m breaking down the 2 biggest announcements for AI operators—and why they’re a big deal for anyone building AI systems.

Let’s walk through each one.

Subscribed

### **OpenAI launched AgentKit—and it’s the easiest way to build agents**

If you’ve ever tried building an agent, agentic workflow, or even some automations, you know it’s a pain. You need to wire up tools and nodes, handle orchestration, and pray nothing breaks. It’s a lot of work before you even know if your idea will work.

AgentKit solves this. It’s a complete set of building blocks inside the OpenAI platform designed to take agents from prototype to production fast. And I mean _fast_. They demo’d building and deploying a working agent in under 8 minutes live on stage. I wouldn't recommend building an agent in 8 minutes, obviously, but it is impressive.

Here’s what’s included:

  * **Agent Builder:** A visual workflow builder where you drag and drop nodes to design agent logic. No code required to start. You can test flows, add tools, create guardrails, and ship ideas without writing a single line of code.

  * **ChatKit:** An embeddable chat interface you can drop into your own apps. Bring your brand, build your workflows, and focus on what makes your product unique instead of reinventing chat UI.

  * **Evals for Agents:** New features for measuring agent performance. You get trace grading to understand agent decisions step-by-step, datasets to assess individual nodes, automated prompt optimization, and the ability to run evals on external models.

  * **Connector Registry:** Securely connect agents to your internal tools and third-party systems through an admin control panel. Everything stays safe and under your control.




And the best part? It’s all visual. 

You can wire up nodes, add guardrails, attach tools (like file search), customize outputs with widgets, preview everything, and then publish with a single click.

### **AgentKit matters if you’ve been using N8N or other no-code tools**

I’ve been using N8N for a while. It’s powerful, flexible, and lets you connect anything to anything. But it’s also clunky. You’re piecing together different nodes, troubleshooting connections, dealing with API quirks, and spending hours debugging before you get a working flow. 

AgentKit is different. Everything is locked into OpenAI’s ecosystem—which is, in many ways, a downside (not able to use other models like Claude), but it’s also an advantage for many of you. Because everything is unified, you don’t have to worry about compatibility issues, API limits, or broken integrations. You just build.

The interface is smooth. Vector stores are built-in, so connecting your context and data is seamless. Guardrails are pre-built, so you can protect against hallucinations, moderate content, and mask PII with one click. And because it’s all inside OpenAI’s platform, you get the full power of GPT-5 and GPT-5 Pro without extra setup.

This is especially huge for beginners. If you’ve been intimidated by agent building, this lowers the barrier dramatically. You can now go from idea to working agent in an afternoon instead of spending weeks learning frameworks.

[![](https://substackcdn.com/image/fetch/$s_!_H_E!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fef60e752-7e58-43a1-adfc-5db08e44c907_3834x1976.png)](https://substackcdn.com/image/fetch/$s_!_H_E!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fef60e752-7e58-43a1-adfc-5db08e44c907_3834x1976.png)

### **OpenAI launched the Apps SDK—and ChatGPT is becoming your workflow hub**

The second big announcement was the Apps SDK. This is what makes ChatGPT more than just a chatbot. It's becoming the place where you can complete entire workflows without ever leaving the conversation.

**Here’s what this looks like in practice:**

Let’s say you’re working in ChatGPT with your writing system loaded up. You’ve got your Voice DNA, your ICP, all your context assets ready to go. You write your weekly newsletter. It’s solid. Ready to publish.

But you’re not done yet. You need visuals.

Instead of opening Canva in a new tab, copying your newsletter title, switching contexts, and manually creating graphics, you just say: “Canva, create a thumbnail for this newsletter. Make it colorful and attention-grabbing.”

Canva appears right there in ChatGPT. It generates a thumbnail based on your newsletter content. You can preview it, request edits, adjust the style—all inside the conversation.

Then you say: “Now turn this into a LinkedIn carousel. 5 slides. Pull the main points from the newsletter.”

[![](https://substackcdn.com/image/fetch/$s_!yW7Z!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9cd21a84-b2d2-4c1f-acd6-60c35b15821b_1962x848.png)](https://substackcdn.com/image/fetch/$s_!yW7Z!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9cd21a84-b2d2-4c1f-acd6-60c35b15821b_1962x848.png)

[![](https://substackcdn.com/image/fetch/$s_!8iRj!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdf2cd6cc-4598-4ced-83d7-49eadec35743_2144x1288.png)](https://substackcdn.com/image/fetch/$s_!8iRj!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdf2cd6cc-4598-4ced-83d7-49eadec35743_2144x1288.png)

Done. Canva creates the carousel. You can review each slide, make tweaks, and when you’re ready, open it in Canva to finalize. But you never had to leave ChatGPT. You never had to switch contexts. You never had to copy-paste content between apps.

[![](https://substackcdn.com/image/fetch/$s_!PbFy!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe986f4b1-9966-4d86-abb6-297ffe1e0e57_2100x1170.png)](https://substackcdn.com/image/fetch/$s_!PbFy!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe986f4b1-9966-4d86-abb6-297ffe1e0e57_2100x1170.png)

You wrote your newsletter, created your thumbnail, designed your carousel, and prepped your entire content distribution—all in one place.

[Share](https://alexmcfarland.substack.com/p/openai-just-made-building-ai-agents?utm_source=substack&utm_medium=email&utm_content=share&action=share&token=eyJ1c2VyX2lkIjo0MTMxNDI1LCJwb3N0X2lkIjoxNzU1MjMxOTEsImlhdCI6MTc2ODQyOTE2OSwiZXhwIjoxNzcxMDIxMTY5LCJpc3MiOiJwdWItMTgxNTUyMyIsInN1YiI6InBvc3QtcmVhY3Rpb24ifQ.Gq4mqfvaPkD38f_Q2IFvSKXzNi3Hk1v9C3GtR1PPRfQ)

### **Why this matters for your workflows**

ChatGPT is becoming the Apple of AI. It’s the consumer product. It’s integrated everywhere. And now, it’s becoming the central hub where all your tools connect.

Think about how you work right now. You’re probably switching between 10-15 apps throughout the day. ChatGPT for brainstorming. Google Docs for writing. Canva for design. Spotify for focus music. Notion for task management. And on and on.

With the Apps SDK, that workflow collapses. You can brainstorm in ChatGPT, create a design in Canva without leaving, generate a playlist in Spotify, organize tasks in your project management tool—all without switching tabs or breaking your flow.

ChatGPT has over 800 million weekly users. And now, it’s becoming the place where you can complete entire workflows start to finish. The apps come to you, not the other way around.

Subscribed

### **What this means for you as an AI operator**

If you’ve been thinking about building agents but felt overwhelmed by the complexity, AgentKit just removed a huge barrier. You can now build production-ready agents with a visual builder, guardrails, evals, and deployment.

And if you’re using ChatGPT in your workflows, the Apps SDK changes everything. You’ll be able to complete entire projects without leaving the conversation. Learning, designing, planning, researching all together.

The gap between idea and execution is collapsing fast. What are you going to build?

— Alex  
 _Founder of[AI WriterOps](https://writerops.ai/)_  
 _Founder of[AI Disruptor](https://alexmcfarland.substack.com/publish/home?utm_source=menu)_

**PS:** If you are interested in learning how to really use these new drops from OpenAI, consider becoming a paid member of AI Disruptor for my weekly workshops. I will be covering all of this.
