# AI WriterOps

*Turn any conversation into project knowledge memory (no code required)*

**Source:** https://alexmcfarland.substack.com/p/30-second-memory-hack-for-claude
**Date:** 2025-06-19T16:06:06.429Z

---

[![](https://substackcdn.com/image/fetch/$s_!4o0w!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2bbd8481-ea0b-4b2d-b858-5c44cb7fd1f5_2800x2000.png)](https://substackcdn.com/image/fetch/$s_!4o0w!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2bbd8481-ea0b-4b2d-b858-5c44cb7fd1f5_2800x2000.png)

Claude is brilliant. But it has a memory problem.

Meanwhile, ChatGPT remembers everything—sometimes too much ([see last newsletter](https://aidisruptor.ai/p/5-chatgpt-projects-to-build-today)).

Yes, there are more technical solutions out there. Many of them are actually pretty simple. We'll explore those soon. 

But today? I'm giving you a quick 30-second fix that works for many people.

* * *

## **The memory system**

I built a simple prompt that extracts conversation memory on demand.

Paste it. Fill in what you want remembered. Claude creates a structured memory artifact. Save these artifacts. Upload to your project.

Here's the exact prompt:
    
    
    You are tasked with creating a comprehensive note based on the current conversation or work in progress. This note will serve as a memory artifact for the project and will be saved in a running document called "MEMORY" in the project files.
    
    Here is the context of the current conversation or work:
    <context>
    {{CONVERSATION_CONTEXT}}
    </context>
    
    Analyze the provided context and identify the main topic or focus of the conversation or work. Then, create a comprehensive note that captures the essential information, key points, and any important details discussed or worked on.
    
    Format the note as follows:
    1. Start with today's exact date
    2. Include a clear, concise topic or title for the note.
    3. Organize the content of the note in a structured manner, using bullet points or numbered lists where appropriate.
    4. Summarize any conclusions, decisions, or action items if applicable.
    
    Ensure that the note is detailed enough to serve as a useful reference for the project's memory, but also well-organized for easy reading and future retrieval of information.

### **How to use it**

#### **Step 1: Copy the prompt above**

Save it somewhere handy. I like to use a /command tool like TextBlaze for quick pasting.

#### **Step 2: When you want to save memory**

Paste the prompt into your Claude conversation

#### **Step 3: Replace {{CONVERSATION_CONTEXT}}**

Type or use voice dictation to speak what you want remembered:

  * "Save everything we discussed about the marketing strategy"

  * "Document all of the different content ideas we came up and include details”

  * "Capture the client requirements and decisions made"




#### **Step 4: Claude generates your memory artifact**

You'll get a structured note with:

  * Date

  * Clear topic/title

  * Organized bullet points

  * Key decisions and action items




#### **Step 5: Copy to your memory document**

Keep a running document called "MEMORY.” You can do this in a simple Google Doc, a Notion database, etc. Keep a separate one for each project.

* * *

## **The maintenance system**

#### **Daily option (thorough):**

  * End of each day, run the prompt on important conversations

  * Add all artifacts to your memory document

  * Upload updated document to project knowledge




#### **Weekly option (minimal):**

  * Friday afternoon memory dump

  * Extract only crucial conversations

  * Batch upload to relevant projects




#### **As-needed option (flexible):**

  * After breakthrough conversations

  * Before closing complex discussions

  * When switching between projects




This isn't perfect. It's a hack. But it works.

And unlike waiting for Anthropic to ship memory features, you can start using it in the next 30 seconds.

* * *

## **When to upgrade**

This system is perfect if you:

  * Want memory NOW

  * Prefer simple solutions

  * Don't want to deal with technical setup




Consider technical solutions (MCP, etc.) if you:

  * Need automatic memory capture

  * Want real-time memory updates

  * Have high-volume Claude usage

  * Enjoy tinkering with tools




[](https://alexmcfarland.substack.com/p/30-second-memory-hack-for-claude#poll-334309)

Loading...

* * *

That's it. 30 seconds to setup. 30 seconds per memory save. 

Alex  
 _Founder of AI Disruptor_
