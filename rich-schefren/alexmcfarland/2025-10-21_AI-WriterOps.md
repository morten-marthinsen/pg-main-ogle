# AI WriterOps

*Step-by-step, zero code required*

**Source:** https://alexmcfarland.substack.com/p/your-first-ai-agent-in-under-10-min
**Date:** 2025-10-21T13:58:37.280Z

---

[![](https://substackcdn.com/image/fetch/$s_!b7qe!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F26a0f176-778a-4e07-b8f6-adedcbbc4a79_2800x2000.png)](https://substackcdn.com/image/fetch/$s_!b7qe!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F26a0f176-778a-4e07-b8f6-adedcbbc4a79_2800x2000.png)

OpenAI recently dropped Agent Builder, which changes everything for non-technical people who want to build AI agents.

This is the tool that finally removes the barriers.

You don’t need to know code. You don’t need to mess with APIs. You don’t need to spend hours watching tutorials on workflow automation platforms that feel like learning a second language.

You can build a working AI agent—one that answers questions, searches your files, and does real work—in 10 minutes.

I know that sounds too good to be true.

But I’m going to show you exactly how.

* * *

## **Why you’ve been stuck before**

Here’s the thing: Building AI agents used to be gatekept.

Platforms like N8N are super powerful (all of my advanced workflows live there), but they’re overwhelming if you’re not already deep in automation. You’d spend hours just figuring out how to connect a model, set up a vector database, manage API keys, and pray it all worked.

Most people give up before they even start.

OpenAI Agent Builder changes that.

It’s clean.  
It’s chat-based.  
It’s drag-and-drop simple.  
It's perfect for beginners.

And it’s built directly into OpenAI’s platform, so everything—your models, your vector stores, your tools—lives in one place.

* * *

## **Here's what to build right now**

Let’s build your first agent together.

We’re going to create a **Q &A agent** that searches through your own knowledge base (like a newsletter archive, company FAQs, or product docs) and answers questions instantly.

Think of it like having yourself—or your business—on call 24/7.

Here’s the step-by-step:

* * *

### **Step 1: Go to platform.openai.com**

This is NOT the regular ChatGPT site.

Head to **[platform.openai.com](https://platform.openai.com/)** and click **Agent Builder** in the left menu.

[![](https://substackcdn.com/image/fetch/$s_!99tt!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa287bc25-61bb-4d5e-8d23-2d0ba1dbba41_3826x1988.png)](https://substackcdn.com/image/fetch/$s_!99tt!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa287bc25-61bb-4d5e-8d23-2d0ba1dbba41_3826x1988.png)

You’ll land on a clean dashboard with templates and drafts. Ignore those for now.

Click **“Create a new workflow.”**

[![](https://substackcdn.com/image/fetch/$s_!vdPu!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1ac96375-5668-4fd4-be17-4ed4f33ba857_3286x1848.png)](https://substackcdn.com/image/fetch/$s_!vdPu!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1ac96375-5668-4fd4-be17-4ed4f33ba857_3286x1848.png) caption...

* * *

### **Step 2: Set up your Start and Agent nodes**

You’ll see two things on your canvas:

  * A **Start node** (this is where your workflow begins—triggered by you typing into the chat)

  * An **Agent node** (this is your AI brain)




[![](https://substackcdn.com/image/fetch/$s_!e8uc!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4ab71a0e-7565-4413-b5a2-0916fa2c0da0_3830x1980.png)](https://substackcdn.com/image/fetch/$s_!e8uc!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4ab71a0e-7565-4413-b5a2-0916fa2c0da0_3830x1980.png)

Now click on the Agent node to open its settings.

[![](https://substackcdn.com/image/fetch/$s_!mIdP!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F41ec2c65-cb2a-4a13-8154-b57a7bf28e04_954x1378.png)](https://substackcdn.com/image/fetch/$s_!mIdP!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F41ec2c65-cb2a-4a13-8154-b57a7bf28e04_954x1378.png)

* * *

### **Step 3: Write your agent instructions**

This is where you tell your agent what to do.

You can write this yourself, or—and this is cool—you can **use voice command** and let OpenAI’s optimizer write it for you.

Here’s what I said (you can copy this):

_“When I type a question to this agent, I want you to search your vector store throughout the entire [YOUR KNOWLEDGE BASE NAME] to best answer the question from the user.”_

[![](https://substackcdn.com/image/fetch/$s_!kH46!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff9106385-790e-4b7c-9134-b03f2644eaf9_1048x464.png)](https://substackcdn.com/image/fetch/$s_!kH46!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff9106385-790e-4b7c-9134-b03f2644eaf9_1048x464.png)

For my example, I'll use my AI Disruptor archive.

Click **“Create”** and OpenAI will expand that into full system instructions, like this:

[![](https://substackcdn.com/image/fetch/$s_!Agzu!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F03ec8d29-ffdf-42a5-a5ed-73e5efc54c1a_1770x700.png)](https://substackcdn.com/image/fetch/$s_!Agzu!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F03ec8d29-ffdf-42a5-a5ed-73e5efc54c1a_1770x700.png)

That’s it.

Your agent now knows its job.

* * *

### **Step 4: Connect your vector store (your knowledge base)**

This is the magic part.

In the Agent settings, scroll down to **Tools** and select **File Search**.

[![](https://substackcdn.com/image/fetch/$s_!CsES!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0b2ebd92-31c5-4738-89e7-8973dbc1fd64_940x1350.png)](https://substackcdn.com/image/fetch/$s_!CsES!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0b2ebd92-31c5-4738-89e7-8973dbc1fd64_940x1350.png)

Now click **“Vector Stores”** and you’ll see OpenAI’s vector database interface.

[![](https://substackcdn.com/image/fetch/$s_!Ktgz!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F61cf838a-5177-4300-b84d-410d28ca4faa_1350x1432.png)](https://substackcdn.com/image/fetch/$s_!Ktgz!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F61cf838a-5177-4300-b84d-410d28ca4faa_1350x1432.png)

**If you don’t have a vector store yet:**

  * Click **“Create a new vector store”**

[![](https://substackcdn.com/image/fetch/$s_!vtHl!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F26dcd6fe-a7f0-494d-a107-018f318c3572_3294x1854.png)](https://substackcdn.com/image/fetch/$s_!vtHl!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F26dcd6fe-a7f0-494d-a107-018f318c3572_3294x1854.png)

  * Name it (e.g., “Newsletter Archive” or “Company FAQs”)

  * Upload your files (PDFs, TXT files, JSON—whatever you want your agent to search through)




**When you have your vector store:**

  * Copy the Vector Store ID

  * Paste it into the Agent Builder




[![](https://substackcdn.com/image/fetch/$s_!bTKG!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb0437c51-af2d-45ad-b582-551d39492bd2_1398x1114.png)](https://substackcdn.com/image/fetch/$s_!bTKG!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb0437c51-af2d-45ad-b582-551d39492bd2_1398x1114.png)

Done.

Your agent now has access to your entire knowledge base.

* * *

### **Step 5: Test it**

Click **“Preview”** in the top right.

Type a question into the chat—something your knowledge base should know the answer to.

For example, I asked mine:

_“What has AI Disruptor taught about context engineering? Can you explain that to me?”_

And it searched my archive, pulled the relevant newsletters, and gave me a clean, detailed answer with citations.

**That’s a working AI agent.**

In 10 minutes.

[![](https://substackcdn.com/image/fetch/$s_!9Ywn!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F97939d6f-4368-4a6f-91ad-4497256605cb_1926x993.png)](https://substackcdn.com/image/fetch/$s_!9Ywn!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F97939d6f-4368-4a6f-91ad-4497256605cb_1926x993.png)

* * *

## **What you can do next**

This isn’t just a toy.

This is the foundation.

Once you understand how these nodes work—**Start → Agent → Tools → End** —you can build way more sophisticated agents:

  * **Newsletter agents** that pull notes from Airtable and write drafts in your voice

  * **SEO blog agents** that research, write, generate FAQs, and upload to your CMS

  * **Customer service agents** that search your docs and respond to tickets

  * **Research agents** that gather data, synthesize insights, and save outputs for later steps




I’ve already built agents for my newsletters and SEO workflows.

They save me hours every week.

And they started with this exact process.

* * *

## **Why OpenAI Agent Builder is the future**

Here’s what I think: Platforms like N8N are powerful, but they’re not going to bring agents to the masses.

OpenAI will.

That’s the unlock.

AI agents are no longer the domain of developers and automation nerds.

They’re for everyone.

And if you can build one in 10 minutes, you can build 10 more by the end of the week.

— Alex  

