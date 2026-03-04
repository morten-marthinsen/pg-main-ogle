# Digital Quiz Cold Traffic - Next Steps - 10/23/2025

**Date:** October 23, 2025
**Source:** ClickUp AI Notetaker

---

**Attendees:** Danielle Schwolow, Jesus Rodriguez, Gabe Medeiros, Todd Brown, Christopher Ogle, Katherine Green, Omer Shvarz
[https://t9014714949.p.clickup-attachments.com/t9014714949/73f81684-dd6a-4ce9-8435-3efb8718a188/73f81684-dd6a-4ce9-8435-3efb8718a188.mp4?view=open&filename=Digital%20Quiz%20Cold%20Traffic%20-%20Next%20Steps%20-%2010-23-2025.mp4](https://t9014714949.p.clickup-attachments.com/t9014714949/73f81684-dd6a-4ce9-8435-3efb8718a188/73f81684-dd6a-4ce9-8435-3efb8718a188.mp4?view=open&filename=Digital%20Quiz%20Cold%20Traffic%20-%20Next%20Steps%20-%2010-23-2025.mp4)
### Overview

The meeting focused on reviewing progress for the Swing Circle Quiz funnel launch, including updates on QA for multiple pages, tracking setup, and technical challenges such as QR code integration. The team aligned on next steps, provisional launch timelines, and campaign naming conventions while also considering external factors like Black Friday that may impact performance.

### Key Takeaways

*   The team agreed to proceed with the launch of the Swing Circle Quiz funnels—with a primary go-live target of November 4th for the PG1 version and an earlier date for digital variants—pending final QA and tracking confirmation.
*   The team decided to adopt a differentiated campaign naming convention (e.g., DQFE-PG1 versus DQFE-SST) to ensure accurate performance tracking.
*   The team recognized key technical blockers, including the need for additional dev work on QR code integration and finalizing the thank you page setup.
*   The team acknowledged the influence of pricing, free trial alternatives, and external factors like Black Friday promotions on campaign performance and supported ongoing data collection to guide adjustments.

### Next Steps

- [ ] **Gabe Medeiros**: Follow up with the dev team regarding QR code integration and ensure receipt of necessary feedback.
- [ ] **Sarah**: Validate the status of the thank you page and confirm if November 4th remains the optimal launch date. _(Due: 11/04)_
- [ ] **Brandon**: Build the additional results pages using the provided template and ensure proper URL routing for the quiz funnels.
- [ ] **Christopher Ogle**: Collaborate with Maeve to confirm and test the final quiz URL, including reconnecting the branching logic.
- [ ] **Gabe Medeiros**: Create a ClickUp ticket to formalize tracking and campaign naming requirements with Bill and Patrick.
- [ ] **Christopher Ogle**: Schedule a follow-up review and walkthrough call with the dev team and other key stakeholders to finalize launch details.
### Key Topics
*   **Swing Circle Quiz Funnel Status Update** Update
    *   Christopher presented an update on the Swing Circle Quiz funnel, outlining that the ads for the PG1 selling version were ready.
    *   The delay page was in final QA with Lauren, the checkout page required final edits with Miro and Brandon, and the upsell page was also in final QA.
    *   It was noted that the expanded variant was closed out as it was linked to the upsell page.
    
*   **QR Code Integration and Developer Involvement** Problem
    *   Gabe explained that generating a QR code via AppsFlyer required developer intervention; he attempted to assist but encountered steps needing dev support.
    *   He sent the necessary link and instructions and is awaiting a response from the dev team.
    *   Although this is still pending, the team was not overly concerned since the app’s current integration limitations meant the QR code functionality had a limited immediate impact.
    
*   **Pricing, Free Trial, and Data-Driven Launch Considerations** Update
    *   Gabe expressed concerns regarding the high current price and lack of a free trial, suggesting these factors may negatively impact user conversion.
    *   Christopher agreed on the importance of testing a free trial option to improve acquisition and conversion rates, noting previous successes with the free trial approach.
    *   The team planned to launch the funnel to gather detailed data on user behavior (quiz completions, video views, upsell actions) to evaluate pricing effectiveness and overall funnel performance.
    
*   **Campaign Naming and Tracking Differentiation** Decision
    *   A detailed discussion took place regarding how to name and differentiate the campaign funnels for effective tracking.
    *   Proposals included using identifiers such as DQFE-PG1 and DQFE-SST (or alternatives like DQFE-VSL or digital) to clearly separate the PG1 selling funnel from digital product funnels.
    *   There was consideration of keeping campaign names generic at the top level, while detailed tracking data (such as offer codes) would later indicate the specific product purchased.
    *   Alternative naming suggestions like DQFE1 and DQFED were also mentioned to avoid conflicts with existing campaign data.
    
*   **Launch Timeline and Final QA Requirements** Update
    *   The team discussed the go-live timeline, with the PG1 version scheduled for a potential launch around November 4th/5th, while other variants were expected to be ready earlier (around the 27th to 30th).
    *   Todd confirmed specific date details, and Christopher emphasized that the launch date was contingent on final QA of pages including the thank you page and proper tracking integrations.
    *   It was noted that a delay in any critical piece (such as the tracking via AppsFlyer or quiz URL finalization) might necessitate adjusting the planned launch date.
    
*   **Coordination on URL Testing and Tracking Ticket Updates** Decision
    *   Christopher addressed the need to finalize the quiz URL, noting that a test URL was being used but had issues with the percentage bar due to recent changes in question order and branching logic.
    *   Maeve was expected to retest the quiz and resolve these issues, while Gabe planned to reach out to Sarah for further context on the thank you page integration.
    *   There was mention of creating a ClickUp tracking ticket (in coordination with Bill and Patrick) to ensure all funnel tracking data is correctly captured once the URLs and pages are finalized.
    
*   **Future Launch Plan and Post-Launch Review** Idea
    *   Christopher proposed developing a structured launch plan to detail the various phases of the launch and to set clear data collection expectations.
    *   The team agreed to schedule a follow-up review or walkthrough call (potentially involving dev team members) to verify that all tracking, QA, and funnel elements were in place before fully launching the campaign.
    *   This plan was seen as critical for ensuring that the early data (even with lower conversions) provided actionable insights to optimize the funnel thereafter.
    

*   Transcript
    
    **Gabe Medeiros:** It didn't work like that before.
    
    **Danielle Schwolow:** There's a universal setting. Like, if you're not here, you can open the meeting. Anyone, and then it should just let everyone in.
    
    **Gabe Medeiros:** Okay, I'll look for that.
    
    **Christopher Ogle:** Hey, everyone.
    
    **Gabe Medeiros:** Hey, Chris.
    
    **Christopher Ogle:** Ready to rock?
    
    **Todd Brown:** What's up, guys?
    
    **Gabe Medeiros:** Let's do it. All right,
    
    **Christopher Ogle:** so did everyone get a chance to read the update message that I put in the channel earlier today?
    
    **Gabe Medeiros:** I did not.
    
    **Christopher Ogle:** I did not either. Failures, Total failures.
    
    **Gabe Medeiros:** I wanted to give you
    
    **Christopher Ogle:** the opportunity to.
    
    **Gabe Medeiros:** No worries.
    
    **Christopher Ogle:** No worries, guys. I'm
    
    **Todd Brown:** only joking. Gabe told me I didn't have to read it, and
    
    **Gabe Medeiros:** so that's it.
    
    **Christopher Ogle:** Depending on him. All right, I'm just trying to find now the actual channel. I should know this, but with all these new editions of Channels, I'm having trouble finding with it. Where is it? Why can't I find this? Okay, here it is.
    
    **Gabe Medeiros:** Just improvise.
    
    **Christopher Ogle:** Yeah, improvise. All right, so let me just quickly. Just go through here. Whoops. Here, window. I'll just show everyone here what I've got put together. Okay. Can everyone see my screen?
    
    **Gabe Medeiros:** Yep.
    
    **Christopher Ogle:** All right, so basically, here's an update on the swing circle quiz. All right, so we've got the launch one selling PG1. These are the ads that are ready to go. The delay page is in final QA with Lauren. The checkout page has got some final edits with Miro and Brandon, so they shouldn't be too far away either. This upsell is also in final qa. The expanded is closed out because it's connected to this one. And then we've got this, which is a talking point for today, which is there were some comments made yesterday. Looks as if there's still some dev work required to set up the QR code. So, Gabe, do you want to share a bit of context on this one? What's going on here?
    
    **Gabe Medeiros:** Yeah, so the QR code needs dev work. I was trying to help and see, like, how we could generate a QR code. Went inside Apps flyer, but I got stuck with the steps that require dev, so I send them the link with instructions and haven't heard back yet.
    
    **Christopher Ogle:** Okay, haven't heard back yet. All right, so now I see that the due date on this one was changed to. Oh, where did I see that? Here was changed to November 4, six days ago.
    
    **Gabe Medeiros:** So, yeah, I'm not too concerned about this because we don't have the app integration with appsfire. We don't have the data. Like, we can't launch this without the data. Right. And honestly, with the app, the Way it is now, chances are our campaign is not going to perform regardless of how good the quiz is.
    
    **Christopher Ogle:** So when you say the way the app is now, you're saying in the in app experience, the camp will affect the how the campaign performs.
    
    **Gabe Medeiros:** Yeah, this is my opinion. I think the price is too high and we don't offer free trial. So that's a big commitment for people to not experience the app and say, oh, I'm going to trust them. This is really good. Then if they don't like the app, they're going to have to go through a cancellation process. Regardless if we have the data, we're going to launch it and see what happens. I'm just not super optimistic about performance with the price where it is today and not offering free trial.
    
    **Christopher Ogle:** And I understand that and I agree that price testing is definitely something we're going to have to do. And a free trial, if we can make that work, like I've always said to you with the numbers, then that for me becomes a huge priority because we've tested doing the free trial before and it worked. In terms of the acquisition side, I just feel like it wasn't successful overall because of how we weren't able to convert people inside the app. So if we're able to do that better towards the end of this year, then I think that that will help and that will also be very powerful for the acquisition side too. So the last comment that I wanted to make on this particular funnel selling PG1 is that I wanted to at least launch this and run traffic to see where the breakdown is. I want us to make sure we have all these data points correct and set up so we can see that, okay, people are completing or not completing the quiz. People are watching the content videos or not watching the content videos. They're clicking on the button to watch the VSL or they're not clicking on the button. Where are they getting to in the vsl? All of these different steps. Are they taking the upsell? They're not taking the upsell. I really want us to be able to see these, the breakdown of this so that we can see that, hey, you know what? People are actually getting all the way through. They're purchasing maybe the monthly, but they're not buying the yearly. But enough people are buying the monthly that they like the offer, but they just don't like the pricing. And that way we can have a very clear understanding the offer is good. They like Swing Circle. They like the idea of being able to get in and get Swing Circle specific golf Instruction, but they're just not willing to risk 300 bucks up front. That's very valuable data in my opinion. So that's kind of what I want us to still get towards. Yeah. So if that, that being said, if we, if we don't. If the thank you page is what's the one thing that's going to stop, like hold us up from. From launching? It is
    
    **Gabe Medeiros:** what it is. No, it's. It's not a thank you page right now. It's apps flyer and getting the attribution, which I don't think is going to be ready before the end of next week. So I think the thank you page shouldn't take that long. Change it to November 4th is not. It doesn't make a lot
    
    **Christopher Ogle:** of sense.
    
    **Gabe Medeiros:** Right. We can discuss this on the engineers call
    
    **Christopher Ogle:** tomorrow. Okay, great. Perfect. Well, that's the one thing that I wanted to get out of that and just Clarify is if November 4th was going to be the launch date. Because that's kind of what I put inside my message that based on the date here, November 4th is a due date of 0.6 task above. So this is the best go live date I can give at this point. So hopefully that is actually earlier, but we can talk about that on
    
    **Gabe Medeiros:** the call.
    
    **Christopher Ogle:** Sorry,
    
    **Gabe Medeiros:** this is the Basco live data I can give at this point. This is your note based on that? Yes.
    
    **Christopher Ogle:** Yes. Okay. Yeah. When I see November 4th on the thank you page, that's the best due date that I can give
    
    **Gabe Medeiros:** because
    
    **Christopher Ogle:** that's one page. That's. The others are in qa. Yeah, the others could be done today, they could be done tomorrow, could be early next week, but it's definitely before.
    
    **Gabe Medeiros:** Before the end. Yeah. I'm gonna ask Sarah inside the channel. This comment is inside the Chris channel,
    
    **Christopher Ogle:** right? Yep.
    
    **Gabe Medeiros:** Tag her there. She see if she has more context about this thank you page.
    
    **Christopher Ogle:** Cool. Awesome. You let me know when you finish your message and then I'll go into the next one.
    
    **Gabe Medeiros:** Yeah, go ahead.
    
    **Christopher Ogle:** Okay. So then we have Quiz Launch 2, which is DQFE into selling SSTs and WPSs. Excuse me. So essentially it's the same ads. I do have to get some women's specific ones for Erica, but some of these can still run to that quiz. And if women do interact, then they're still going to make it through to WPSS anyway. And then we have this ticket here, which is essentially the. I don't know the term, but it's the first ticket that needed to be finished so that Brandon could then go and do the same thing for. For all the other ones in the list, if that makes sense. Okay. Because this is a. You can think about this as the closed VSL page for vertical results onto SSTs. Okay. So this is the close VSL page that someone arrives on. When they have the vertical result, they have the. Let me show you what this actually looks like real quick. So you can see here it's your results. And then they have the thumbnail. Okay. And so it has a very short lead. And then it goes onto the existing SSTS vsl. Okay.
    
    **Gabe Medeiros:** On the same video.
    
    **Christopher Ogle:** Same video. It transitions straight into the existing SSTS VSL on the same video. Cool. So. So this ticket here, we had to get everything right so that Brandon could then go and do it for the results two page, which is the incline swing circle, and then the SSTs flat swing circle, which all three separate VSLs that have all been created that are now on those pages. Danielle's got all the Wistia links done. The thumbnails already, all that stuff's done. Brandon just needs to create those pages and those specific URLs which are listed inside each of these tickets. Okay. As you can see here, the URL for this, for each of these basically looks like that simple strike sequence, dash or forward slash, video dash, SC dash, quiz dash, incline, and then dash, flat or dash, vertical. So they're the three URLs that Maeve can route the traffic out to that come into the PG ecosystem. The question here is, and I'm skipping ahead slightly, but this is an important question is. Oh, it's actually not really skipping ahead that. That much because it's. It's the last question that I had here, I think. Where am I? One second. Oh, I'm in the wrong one. Here it is. Okay, so Danielle and I talked briefly about this. We said we're going to speak on this call. This point here. Is there anything else important we need for tracking to differentiate this dqfe funnel selling SSTs from the DQFE funnel that's selling PG1 that we just talked about? Does that question make sense? They're all going to be listed under DQFE, but some are selling PG1 and some are selling SSTs, but they're all going to be under DQFE. So how do we differentiate those from each other when we run these campaigns?
    
    **Gabe Medeiros:** That makes sense. I think we need to have the campaign level so it's super easy for us to measure. For anyone like copywriters, creative team and media buyers, I say we. We could add maybe a dash DQFE dash BG1 and then DQFE dash VSL maybe
    
    **Christopher Ogle:** or dash SSTS or dash WPSS.
    
    **Gabe Medeiros:** But then people can go to SSTS or WPSS automatically based on their answer. So it's a
    
    **Christopher Ogle:** correct. We want to. But don't you want to be able to get the data on which product they're buying?
    
    **Gabe Medeiros:** Yeah, we will get that in domo in the back end. But I'm talking about name.
    
    **Omer Shvarz:** Like
    
    **Gabe Medeiros:** we're gonna, we're gonna have two quiz. Two quizzes. Like one sending people to the app PG1, another one trying to sell digital product as the first action. So in the, in the campaign name I would use DQFE-PG1, DQFE-Something Else. It could be VSL or Digital
    
    **Omer Shvarz:** I think something unique. So we don't have any problems when you search name or anything like
    
    **Gabe Medeiros:** notice
    
    **Omer Shvarz:** no SDS or wgs. But also VSL can be. Or digital can be a bit a problem. We can even type one say I don't know, just throwing ideas. But something unique that it won't mess up with another data of other campaigns.
    
    **Gabe Medeiros:** We won't know what product they bought by the campaign name. Chris. Like we need to use a more generic name on the campaign at the campaign level and at the back end. Like once people go through the following purchase then we know what product they bought.
    
    **Christopher Ogle:** Okay, so is this when we're talking at this level, just so I understand, are we talking like acquisition 5 offer code level?
    
    **Gabe Medeiros:** Yeah, and at performance as well. This
    
    **Christopher Ogle:** offer
    
    **Gabe Medeiros:** of course code is going to be there. Yeah. But we're going to have both of these here. I can ask Bill to add to this list of offer or funnels. We just have
    
    **Christopher Ogle:** to agree to the name. We could do, we could do DQFE1 and DQFED.
    
    **Gabe Medeiros:** I guess we can do that. Yeah. If you want to keep it simple.
    
    **Christopher Ogle:** Okay. Okay.
    
    **Gabe Medeiros:** Yep.
    
    **Christopher Ogle:** All right. I think so. So look, I'll, I'll, I'll leave that with you guys. In terms of what you, what you want to call it, I don't really mind. I just want to make sure that you guys like have all of this tracked and you, you know what you're doing and if what you need from me basically like do what would. Is there anything I need to put here in this, in this ticket for you guys to be able to do that track? That
    
    **Gabe Medeiros:** is. I can talk to Bill about that. He might ask me to create a click up ticket because he's. Him and Patrick who are now the data team are using ClickUp, not asana. Yep. So I. I can handle that. Don't worry about it.
    
    **Christopher Ogle:** Okay. Do you need me to write you a message about it in this. In this comment or you're okay. Okay. Yep. All right, cool. Just wanted to triple check so nothing gets lost in the ether. I know you've got a lot on your plate, so.
    
    **Gabe Medeiros:** All right,
    
    **Christopher Ogle:** so that was a really important point regarding this. Launch 2. I call it Launch 2. But I don't say that those numbers are sequential, because this could end up being the first of the launches that we do is. It's just that this was originally the primary focus, but this may be the first that we launch. So once we get these codes in place and Brandon's able to make the additional pages, and we check that all the funnels are running correctly and tracking correctly and all that, then we will be able to launch the ads onto these specific results funnels, these results links. And it's the same for the WPSS here as well. You have the WPSS funnel that is exactly the same as what I just said for ssts, except the URL. Is that okay? And it's the same thing with the BSL being this.
    
    **Gabe Medeiros:** So after all these VSLs are ready, Maeve still needs to connect to the quiz. Correct. There's a last step here.
    
    **Christopher Ogle:** Yeah. So once all these URLs are ready, then I need to send all these URLs to Maeve. Yes.
    
    **Gabe Medeiros:** Okay. We already have the URL for the quiz. Right?
    
    **Christopher Ogle:** The URL for the quiz. I only have a test URL.
    
    **Gabe Medeiros:** Okay. So she hasn't produced a URL that is going to be used yet?
    
    **Christopher Ogle:** Not that I know of. So, basically what happened was when I went through and did a QA on the. On the quiz today, I. I used this test link that she gave me and I noticed there was some issues with it, and so I filmed the loom for Maeve on that and she responded to say the custom subdomain is hooked up. So it's not the Christopher link, that one there. But the percentage, which is the issue that I saw in the percentage bar, wasn't adding up correctly. We moved the flexibility question to the end last week, and I need to reconnect the question in the right order again, as there's lots of branching logic. Leave it with me and I'll sort it, then req and retest.
    
    **Gabe Medeiros:** Okay,
    
    **Christopher Ogle:** so she's in an event this week. She says she's doing her best to respond as quick as she can. She's copied in Nicole on this stuff. So once the she's retested and req, then I'll ask her for a URL. I don't know if the URL that she's going to the final URL is dependent upon our URLs also being complete, if that makes sense because she would need to test the entire funnel all the way through in its entirety potentially before publishing the main URL. I don't know.
    
    **Gabe Medeiros:** Yeah, I imagine that this is like, once she has all the VSLs, I think it's going to be a quick processor process on her end, so not to worry about that.
    
    **Christopher Ogle:** Yes. And she did say on the call that I had with her and her team that that would be the case is that once we have all those URLs, whether it's that one delay page for the PG1 experience or the three close BSL pages, delay pages for each of the results which we just talked about, it would be a pretty quick process for her to go through and do all that testing. Yes.
    
    **Gabe Medeiros:** Okay. All right,
    
    **Christopher Ogle:** so then coming back to the main message, I think that's pretty much it. I wanted to just go and check. Anything else? Yeah. So Brown Brandon now has the template from results page one above so he can build results page two and all the rest of those ones below today. Now his, his due date on these tasks was today, so there's a chance that he may get to those today, if not tomorrow. And I did put here that if the Go Live data for questions are answered today and Brandon's able to complete additional results pages, then we should be able to launch tomorrow. But I didn't realize there were all these, these other pieces that need to, to happen first regarding tracking and everything. So I might update this to be, you know. Yeah, early next week. Yep.
    
    **Gabe Medeiros:** Yep.
    
    **Christopher Ogle:** Okay. So, yes, in answer to your question earlier today about when, what's the Go Live date? It's all really dependent on all these other final pieces that come into play. And as I've said before, this was not a project that was tracked in Asana the same way as a lot of other projects have been. It was a pretty, pretty messy on the fly type of getting all the tickets done and connected and everything. But yeah, I think now we're getting pretty close to getting the first version of it
    
    **Gabe Medeiros:** ready to go. Yeah.
    
    **Todd Brown:** Is there a Christopher, is there a date range for when you're thinking it'll go live?
    
    **Christopher Ogle:** So this is what we just talked about a few minutes ago. With version 1. My date range is anywhere between. For version 1 would be anywhere from what's middle to end of next week, like 25th of October to November 4th. Because I don't know if this due date on this task is going to get pulled forwards or not. This was the, this is the end due date for the final task for the final page in the funnel. So until this is ready, nothing's ready. So if I see November 4th, that for me is the final date and I put November 5th.
    
    **Todd Brown:** Got it. Okay. Thank
    
    **Christopher Ogle:** you, man. So in answer to your question, the date range is like middle of next week to November 4th for the selling PG1 version. And then for this other version I would say early to mid next week. So what would that be in terms of days? Maybe that's better I write that and be more specific. Someone want to give me Wednesday's date?
    
    **Todd Brown:** It is the 29th. 29th.
    
    **Christopher Ogle:** So let's say 27th, 28th to 30th. Okay.
    
    **Omer Shvarz:** Another point that I want just has to think about it. We're going to launch it close to all the Black Friday sale that we're going to have. So basically we're going to have those offers if we talk about SSTF says with 25% additional off. So this is one and second we're going to have assets running talking about Black Friday. So in the environment of the media buying the quiz ads, let's say going to competing in ads that have sales of Black Friday and 25 off. So when we dive to the data we need to understand also the environment in this specific time. I mean because it can be challenging in terms of performance conversion rate and this kind what we will see. So just to have it in mind for all of us that it can impact the performance. So be aware of that.
    
    **Gabe Medeiros:** Yep, it's a good point.
    
    **Christopher Ogle:** I don't know if there's anything else to be said about that if we,
    
    **Gabe Medeiros:** we just launch
    
    **Christopher Ogle:** it and see how it goes. But
    
    **Gabe Medeiros:** yeah, we're going to keep the, the original plan to grab data. Yeah. But it's an important variable to keep in mind. Like we might, we might have something extra against us during Black Friday. So I'm gonna ask Sarah to validate this data. This date of November 4th, I don't think this we need to go that far,
    
    **Christopher Ogle:** but
    
    **Gabe Medeiros:** we'll understand it more. And then I'm going to create the ticket for Patrick and Bill in terms of tracking and I think that's all the next steps from our end.
    
    **Christopher Ogle:** And you know what I would love to talk about on a future call, Gabe with you as well is setting up some form of launch plan to talk about the different phases that we would go through with the launch so that we all have very concrete expectations, data points going into the specific phases. Because to Amira's point, it might be that in the first week or two weeks we are really just trying to get data on who is coming through the quiz based on the questions that we have and their experience levels like that. For us, we could see the value in that even if we're paying for it and there's not as many conversions as we want, what value are we getting from that data? So we don't see a lack of conversions as a complete failure. We don't pull a plug on it too quickly, that we all understand what it is that we're trying to get out of the first week, two weeks, month, et cetera. So I would certainly like to discuss that with you and potentially Todd, if Todd needs to be involved in that so that we can just get very clear on, on expectations heading into it.
    
    **Gabe Medeiros:** Yeah, just high level. I, I'm not against. Continue to run traffic to it. As long as we're buying data, we're collecting information, we're taking action. We have good questions and answers based on this data and then we make it durations based on what we're learning and retest again. So it's, it's a, it's a, it's a continuous circle until we make it work. I'm not stopping until we make the quiz work. So we will have to figure this out.
    
    **Christopher Ogle:** Fantastic. Well, I'm all on board with that. Let's just keep in very close communication and make sure we get all that data set up and ready so that we track it correctly and we make as clear decisions as quickly as possible.
    
    **Gabe Medeiros:** Perfect.
    
    **Christopher Ogle:** Sounds
    
    **Gabe Medeiros:** good, man. Thanks for all the updates.
    
    **Christopher Ogle:** All right, thanks everyone for joining and next week I'll, I'll obviously give updates before then, but I'm going to hopefully be able to get everyone together so including some dev team members and, and everyone else on kind of like hopefully a final review and walkthrough call. Could be next week, but I'll keep everyone posted.
    
    **Gabe Medeiros:** Thanks,
    
    **Christopher Ogle:** Chris.
    
    **Omer Shvarz:** All right, thanks,
    
    **Christopher Ogle:** Chris. Thanks all.