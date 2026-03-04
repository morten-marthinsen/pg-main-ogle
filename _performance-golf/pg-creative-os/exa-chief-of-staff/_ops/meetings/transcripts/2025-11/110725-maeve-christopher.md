# Maeve / Christopher - 11/07/2025

**Date:** November 07, 2025
**Source:** ClickUp AI Notetaker

---

**Attendees:** Christopher Ogle, Maeve Ferguson
[https://t9014714949.p.clickup-attachments.com/t9014714949/a0a30290-6cbd-4766-a2e5-6a21e61ac3bd/a0a30290-6cbd-4766-a2e5-6a21e61ac3bd.mp4?view=open&filename=Maeve%20-%20Christopher%20-%2011-07-2025.mp4](https://t9014714949.p.clickup-attachments.com/t9014714949/a0a30290-6cbd-4766-a2e5-6a21e61ac3bd/a0a30290-6cbd-4766-a2e5-6a21e61ac3bd.mp4?view=open&filename=Maeve%20-%20Christopher%20-%2011-07-2025.mp4)
### Overview

The meeting focused on transitioning from the current Quiz Funnel 2 to the new PG1 funnel (Quiz 1) while ensuring the capture of clean, day-zero data. The team discussed technical integration steps, tracking configurations across multiple analytics platforms, and scheduling adjustments to support a smooth switch-over.

### Key Takeaways

*   The team decided to transition using the existing URL instead of duplicating the funnel to avoid the complexities of re-embedding and re-testing backend integrations.
*   A data snapshot of Quiz Funnel 2 will be captured up to the switch-over point to establish a clear baseline for comparison.
*   The brief testing window (approximately 20 minutes) during the switch was accepted, with minimal errors considered tolerable.
*   It was emphasized that Gabe must confirm with Bill that the new SKU tracking in Domo is correctly set up, with proper integrations in Mixpanel, vitalytics, and Apps Flyer.
*   The meeting resolved to adjust weekly call timings and share call recordings via ClickUp to ensure all team members stay aligned.

### Next Steps

- [ ] **Maeve Ferguson**: Capture the data snapshot from Quiz Funnel 2 up to the switch-over and prepare the reporting framework for the new PG1 funnel.
- [ ] **Christopher Ogle**: Send a message summary to Gabe detailing the plan, URL, and tracking requirements.
- [ ] **Gabe**: Confirm with Bill that the new SKU's tracking in Domo is correctly set up and complete the dummy payment tests.
- [ ] **Christopher Ogle**: Ensure Maeve gains ClickUp access by adding her email to the workspace for call recordings and task updates.
- [ ] **Christopher Ogle**: Update the weekly meeting calendar invite by moving it 30 minutes forward and note Maeve's unavailability on December 4th.
### Key Topics
*   **PG1 Quiz Funnel Transition Strategy** Decision
    *   Maeve raised the need to determine whether to duplicate the current quiz funnel or switch the existing URL to the new PG1 version, emphasizing the workload implications of re-hooking backend integrations if duplicated.
    *   Christopher and Maeve discussed the benefits of a direct switch to ensure a clean data capture (day zero) and maintain continuity in tracking and backend processes.
    *   The team agreed that transitioning on the existing URL was preferable to avoid additional complexities in embedding and testing.
    
*   **Tracking and Analytics Integration** Update
    *   The team reviewed various tracking systems, including Domo, Apps Flyer, Mixpanel, and vitalytics, clarifying each tool's role in capturing key metrics.
    *   Christopher explained that the checkout funnel for the PG1 subscription was set up through Checkout Champ, meaning day-one revenue data would be available in Domo without needing Apps Flyer tracking immediately.
    *   There was consensus that Gabe must confirm with Bill that the new SKU's revenue numbers are tracking correctly in Domo, and that dummy payment tests must be run for each iteration.
    
*   **Data Snapshot and Reporting Plan** Update
    *   Maeve outlined a plan to take a data snapshot from the existing quiz funnel (Quiz 2) up to the moment of switchover, then initiate fresh 'day zero' data capture for the new PG1 funnel.
    *   The approach was discussed to facilitate accurate before-and-after comparisons for key performance metrics such as quiz start rates and completion rates.
    *   Reporting strategy was aimed at combining the old quiz data with new data over transitional weeks to build a unified view of performance.
    
*   **Results Pages and SKU Configuration** Update
    *   The discussion included technical details of the results pages, such as adjustments for content videos and differentiating between male and female versions.
    *   It was noted that while the current videos are built and ready, they are only visible to relevant segments based on embedded visibility settings (using an 'eye' icon to hide or display content).
    *   There was clarity on SKU differentiation in Domo, with the new PG1 campaigns expected to be launched under a new SKU (DQFE1) to segregate them from previous campaigns.
    
*   **Ad Campaign Timing and Operational Considerations** Decision
    *   The team debated whether to pause all ad campaigns during the switchover, with consensus leaning towards accepting minimal error pages for a short period instead of shutting down campaigns completely.
    *   The technical switch was expected to take about 20 minutes, with an acceptable temporary risk of some users encountering errors.
    *   Operational coordination was highlighted, including scheduling retests and ensuring proper timing of the funnel switch-over to avoid data inconsistency.
    
*   **Follow-up Actions and Communication**
    *   Christopher planned to send Gabe a concise message summarizing the proposed game plan, including the URL to be used and confirming the approach for the transition.
    *   It was agreed that Gabe and Bill needed to align on tracking configurations to ensure correct revenue reporting and proper integration with Domo.
    *   The team discussed sharing recordings via ClickUp and adjusting calendar invites to reflect new meeting times and availability (e.g., moving the weekly call 30 minutes forward, and noting unavailability on December 4th).
    
*   **Clarification on Analytics Tools Roles** Update
    *   The roles of Mixpanel and vitalytics were clarified: Mixpanel was designated to track interactions on the VSL and checkout funnel, while vitalytics was set to measure video engagement metrics.
    *   A discussion emerged regarding Apps Flyer’s importance for long-term metrics like LTV and behavior tracking, although immediate day-one revenue capture was fully supported by Domo.
    *   Maeve planned to integrate vitalytics data with Domo and Mixpanel analyses for a comprehensive view of campaign performance moving forward.
    

*   Transcript
    
    **Maeve Ferguson:** Because there's. That's pointing to the old thing. That's one analysis. And then we'll have to start with clean data. And like I can do the, the songs and that in the back end, but it's just knowing what day we point over to the new one. The only if, if you guys are wanting another like, like a duplicate of that quiz funnel to point to the new one, there's just a lot of things we have to hook up in the back end to make sure that, you know, just from the data, like pushing data to the sheet and all of that sort of stuff. If it's a new, if it's a new quiz for them, even if it's, even if the duplicates, all of that has to be reconnected again. So that was just last night. I was just like, right, I need to find out, like, both are fine, but I just need to know so that we can plan for the work. The workload
    
    **Christopher Ogle:** involved
    
    **Maeve Ferguson:** in the new
    
    **Christopher Ogle:** integration. Yeah, for sure. So let me just give you first of all the context of why
    
    **Maeve Ferguson:** this happened
    
    **Christopher Ogle:** all
    
    **Maeve Ferguson:** of a sudden.
    
    **Christopher Ogle:** Because when we were, when we were on our call yesterday, we were talking about the updates with this essentially, this is Quiz
    
    **Maeve Ferguson:** 1\. This
    
    **Christopher Ogle:** was the highest priority, selling the PG1. Now originally what was going to happen was. Or the issue was that there was Apps Flyer tracking. That had to happen. Okay,
    
    **Maeve Ferguson:** now
    
    **Christopher Ogle:** that was a misunderstanding on my part and Gabe's part because our Funnel for the PG1 subscription purchase is set up through Checkout Champ. So day one data is going to be inside Domo. We don't need Apps Flyer Tracker. We both misunderstood that. That means that the funnel itself is actually technically ready to launch. We don't need the Apps Flyer tracking, which has actually been delayed until the 2nd 17th of November. So that's what we triggered that conversation Be like, oh, do we have to wait till the 17th of November? And then Donnie said, well, hang on, why are we waiting? Because this funnel's ready. So that's where Gabe and I said, okay, well let's go ahead and launch it because then we can start to actually
    
    **Maeve Ferguson:** get some, some tracking. We're late with Quiz two, but whenever we come back to do Quiz
    
    **Christopher Ogle:** one. Yeah. Yes, exactly. So now we're going back to doing Quiz 1. Now, to your point, I think we can just switch over to this new PG1 funnel without duplicating the funnel because the current flow is showing positive signs on the score app
    
    **Maeve Ferguson:** side
    
    **Christopher Ogle:** and quiz completion rates. Obviously start rates needs to be improved, but we're Working on that.
    
    **Maeve Ferguson:** That's what we. Yesterday. So I'm going to do a data point up to yesterday and then do a data point from whenever I get the notification from the team to say this is live. Remember when you did the. You tweak the copy that then it's like again like day zero of
    
    **Christopher Ogle:** that version.
    
    **Maeve Ferguson:** Yep. Yeah. So I can kind of cross compare
    
    **Christopher Ogle:** them. Yes, for sure. And so that's. Hopefully we'll have an increase in start
    
    **Maeve Ferguson:** rates.
    
    **Christopher Ogle:** Yeah. And then quiz completion rates was hovering around, I don't know,
    
    **Maeve Ferguson:** 80
    
    **Christopher Ogle:** something. Yeah, it was pretty high. 80s
    
    **Maeve Ferguson:** 90s,
    
    **Christopher Ogle:** which is great. Shows that there were no issues
    
    **Maeve Ferguson:** there.
    
    **Christopher Ogle:** And then obviously there was the issue of the results pages, but now that's going to change because we're going
    
    **Maeve Ferguson:** to
    
    **Christopher Ogle:** add the content videos on the results pages. Okay.
    
    **Maeve Ferguson:** So the results pages, the issue was, remember the timer was just going around and then people were staying on there too long. So now that new video, that's another change that was laid yesterday and that's a new data point to then see how that piece goes. And then going to the new results pages is almost like what I'm calling. Like that's one to quiz one.
    
    **Christopher Ogle:** So now those results pages. What the. And this is why I need to clarify and discuss with you is do you know the swing circle videos? I'm talking about the content videos.
    
    **Maeve Ferguson:** Yes. Is that the ones we have on the current results page?
    
    **Christopher Ogle:** So no, they're not on the current. These videos aren't on the current results pages. These videos aren't on the current results pages. Let me find here. Okay. Hey, so we noticed that you said you're a little on the silver side. I get it. Completely normal. So let
    
    **Maeve Ferguson:** me just. Oh my goodness. Google Meet drives me crazy. Okay, so just let me just pull this up one second and I'll share. So in the what we call current results pages are actually inside questions. So these are the results pages that are sitting ready, but nobody can see these yet. So is the video that you just showed me the same as.
    
    **Christopher Ogle:** Okay, so these
    
    **Maeve Ferguson:** are what I had built
    
    **Christopher Ogle:** for, right?
    
    **Maeve Ferguson:** Yes. This is. These
    
    **Christopher Ogle:** videos. Yeah.
    
    **Maeve Ferguson:** Yes. Yeah. So they're all sitting ready to go, but nobody can see them yet because we're redirecting them off to
    
    **Christopher Ogle:** the old.
    
    **Maeve Ferguson:** Perfect. What we're going quiz two. Okay, so we have here. This is just in. Because otherwise you don't know what you're seeing. So that's like this will obviously come out before we go live. So that's the flat. That's the flat button. This Will come out before we go live. That's the end plane and play button. We'll remove that before we go live. Real vertical. Okay. And then we. We don't have the female version of those yet,
    
    **Christopher Ogle:** correct? We don't have the female versions and won't have the female versions
    
    **Maeve Ferguson:** until. Yeah. So what we'll be able to. What we'll be able to do then is if it's just a switch, what we can do then is in the female. So in the female questions, we can still go to these three. And for the men, we can redirect to each of those or we can go to the results page and then they. The eye basically hides what they're not meant to see or shows them what they're meant to see. So there's. On the results pages, there's like a. Basically a little eye that hides. So you can see in here, see this little
    
    **Christopher Ogle:** eye.
    
    **Maeve Ferguson:** Right. So you basically only people, if they get the mail flat, they're going to see this page. So if they're anything else, they won't see it. So even though these, all
    
    **Christopher Ogle:** of these are stacked,
    
    **Maeve Ferguson:** they only see their bit. Okay. So all of that was tested prior to the other go live. But I can retest
    
    **Christopher Ogle:** them again.
    
    **Maeve Ferguson:** That's one option. Then the answer we gave is that it's still the same URL. All I want to do is grab a snapshot of the data up to the switchover point. Then that's one analysis that we're doing. Then start over as though this is like day zero. My question would be, is, are we stopping the ads as I do the flick over? It should only take like 20 minutes to do. Are we going to turn off all the ads? Are we just going to accept that some people could like land on the quiz, like right at the minute that I'm changing it and they might get like an error code or something like that. It's like, because everything's built, it shouldn't take a lot of retest. So like, let's like give me an hour of a window to switch it all over, retest it and then go like, right,
    
    **Christopher Ogle:** we're
    
    **Maeve Ferguson:** good to go. Yeah. We want to turn off an entire ad campaign just for that. So then the. If the answer is yes, then we would be better to duplicate. But then that means we have to rehook all of this. You know, all of this would have to be re hooked up to look at this. Either it's fine. All of this has to get re hooked up to another
    
    **Christopher Ogle:** sheet. So I don't see any issues with having a few people hit some form of error page or whatever that would be.
    
    **Maeve Ferguson:** I,
    
    **Christopher Ogle:** I think what's most important is us being able to. To get this version live as soon as we can. But the, the only other thing to mention is that before we even do this, Gabe still needs to have the tracking confirmed with Bill in Domo, so he still needs to do
    
    **Maeve Ferguson:** that part as well. Yeah, this is not just my pca. He has to see a transaction. And you do, you do dummy payment, and every, every iteration of everything you roll out, you do like a dummy payment the whole way through.
    
    **Christopher Ogle:** No, I'm not sure. You'll have to check that with Gabe. But
    
    **Maeve Ferguson:** what I.
    
    **Christopher Ogle:** Yeah, all I need, all I need, all he needs to confirm, I believe, is that the, the, the revenue numbers are showing up correctly inside Domo because it's a new sku. It's a completely new SKU that hasn't made its way into Domo before. And so it'll still be appearing under the same DQFE code
    
    **Maeve Ferguson:** in
    
    **Christopher Ogle:** Domo. And there's no real way to separate that inside Domo at the offer level, only at the ad campaign level. That. That's the thing that Gabe needs to figure
    
    **Maeve Ferguson:** out. So
    
    **Christopher Ogle:** my point with saying that is there's no way rush to get this done today. Like, if we said, okay, here's the game plan you and I met today, here's what needs to happen. Put together a little bullet point summary of what happened. Then we would say Gabe needs the URL essentially, so that he can track it. And then you just basically say, okay, Gabe, the URL is
    
    **Maeve Ferguson:** the same,
    
    **Christopher Ogle:** but now the mail flows are going to go through this
    
    **Maeve Ferguson:** way when we're going to go this way to the
    
    **Christopher Ogle:** old. Yep. And then I would send him this. This is the URL that's going to be embedded within all of the buttons. Okay. Because this is the PG1 VSL. This is the internal page that all people are going to see, because when they get to the results pages, they either get the incline, the flat, or the vertical swing circle, but then they have the button, I think it was get my custom fix. Is
    
    **Maeve Ferguson:** that correct?
    
    **Christopher Ogle:** Yeah. And then they all go to this VSL and then they're all into the PG1 funnel.
    
    **Maeve Ferguson:** Okay. So you said all people, so that's including women.
    
    **Christopher Ogle:** No, sorry,
    
    **Maeve Ferguson:** all men.
    
    **Christopher Ogle:** Only on the male results
    
    **Maeve Ferguson:** pages. Yeah. Okay. I'm trying to think how that Domo thing is going to work. Is it not cleaner for them just to start a new campaign then, which then allows Us to have that downtime, fix it all, test it all and go live. You know, it's only going to be a couple of hours of a window. I think everything's starting clean. I've got a. Do
    
    **Christopher Ogle:** you know what I mean? Yes. I think that is probably the best way to do it. Yep. And there's no issues in turning the ads off and turning them on again. I mean, it's not as if the campaigns were scaling, so it's not a massive issue if we
    
    **Maeve Ferguson:** turn them off
    
    **Christopher Ogle:** and do it properly. Okay.
    
    **Maeve Ferguson:** Do you have a replay of yesterday's call that I
    
    **Christopher Ogle:** could watch? Yes,
    
    **Maeve Ferguson:** I do, Yep. Yeah. Could I get onto some sort of list that's where that replay is sent
    
    **Christopher Ogle:** to,
    
    **Maeve Ferguson:** just in case, in the off chance that. And then also just if you put the invite in my calendar, because my calendar gets booked fast. Yes. Next few weeks should be good for. It's December 4th, I'm not in the country, so I won't. That's the only week between now and Christmas. Well, December 25th, I won't be there, obviously, but yeah. So there's only one week, one week, three, nine. Christmas that I'm. My calendar's empty. So if I get that booked out, it means that nobody else can get over the top
    
    **Christopher Ogle:** of it.
    
    **Maeve Ferguson:** Sure. And then once we know that, if Gabe's able to move it forward, and if not, then I'm sure we'll see what we can figure
    
    **Christopher Ogle:** out. Yeah, I'll put a note question about that in the chat. Right straight after this call.
    
    **Maeve Ferguson:** I'm
    
    **Christopher Ogle:** just trying to figure out how to share because we've just moved over to ClickUp from Asana and so I'm not using my regular Fathom recorder anymore. But
    
    **Maeve Ferguson:** there's. There's
    
    **Christopher Ogle:** recordings here in. Hang on. Sharing and permissions Share link with anyone. Okay.
    
    **Maeve Ferguson:** And that. Was there anything else in prior week's calls, apart from yesterday, that's kind of like things that are on the horizon, things that are coming at us that I need to be mindful of?
    
    **Christopher Ogle:** No, not that I. Not that I can
    
    **Maeve Ferguson:** think of.
    
    **Christopher Ogle:** No, because this, this is really the main. The main key priority is just to get this PG1 funnel live as quickly as possible. So as, as. As long as we just make sure we have this. These campaigns paused and testing done again and then relaunched. Yeah,
    
    **Maeve Ferguson:** go to where they're going to. The man's going to go to the results page that were built
    
    **Christopher Ogle:** before
    
    **Maeve Ferguson:** and we're going to start the data at day zero. What's the. The view or what Was the chat around, the ad performance, like the overall kind of like, here's how this quiz is going. What's
    
    **Christopher Ogle:** that, babe? The overall. Yeah, I mean that you'll see in the recording that the overall sentiment is that the quiz is doing very well. And it's. There's a lot of interest because,
    
    **Maeve Ferguson:** yeah, the click through rate was insane, but it was. The start rate was diabolical. Yeah, yeah,
    
    **Christopher Ogle:** the start rate. Yeah, the start rate for sure is something that we need to improve. But I think that having it this way with this first question going straight into it will help with
    
    **Maeve Ferguson:** that a lot.
    
    **Christopher Ogle:** Yeah. Can you do me a favor? Just because I've been trying to do this in the background,
    
    **Maeve Ferguson:** can
    
    **Christopher Ogle:** you just click on the link that I just messaged you in Slack with and see if that opens
    
    **Maeve Ferguson:** for you. Welcome back to ClickUp. So this. Just me. This just had me log into my ClickUp. Let me go back and click it again. No, this page is unavailable. You don't have access to this workspace. So you must have to add [supporterson.com](http://supporterson.com) to get. I think that was what was wrong with Asana as well. It was like, I'm for that ticket yesterday. Like I searched for it for half an hour and Greg. So it must be like I'm not. Because I'm not pg. It mustn't be on your actual asana.
    
    **Christopher Ogle:** Okay.
    
    **Maeve Ferguson:** As a team
    
    **Christopher Ogle:** member, you know. All right, so let me, let me do this. Let me do this. Let me go digital quiz cold traffic. And I'm going to go into the channel here and I'm going to go. Can you please add. It's [supportaveferguson.com](http://supportaveferguson.com)
    
    **Maeve Ferguson:** isn't it? That's me.
    
    **Christopher Ogle:** To click up so she can start accessing our call recordings and task updates.
    
    **Maeve Ferguson:** So is everything moving? Yes. That's going to be like a nice hot mess. Some stuff's on the sauna and some
    
    **Christopher Ogle:** stuff's over there.
    
    **Maeve Ferguson:** Is it in play
    
    **Christopher Ogle:** or is it. It's in play right now. It's
    
    **Maeve Ferguson:** getting there. Okay.
    
    **Christopher Ogle:** But it's a process and then I'm just going to put this one here as Maeve for once. You have access. Here is yesterday's recording. Just so you've got it in that thread there. Okay. So I think I actually need to put this link. Actually, can you. Can you click on the link that I just put in the thread? So if you go to the digital quiz cold
    
    **Maeve Ferguson:** traffic,
    
    **Christopher Ogle:** does that ask you to log in as well? Because
    
    **Maeve Ferguson:** it's an attachment. This is not me.
    
    **Christopher Ogle:** There you go. Interesting. So I can share the attachment of the actual video, but I can't share the task. But regardless, LIVE will get you set up in there today and you can start watching those and then watching that one and then you'll see all the other task updates and you can watch this one in the meantime and just get a general understanding
    
    **Maeve Ferguson:** of
    
    **Christopher Ogle:** what's going on from yesterday. And then I'm also going to put a message in here to Gabe to say. Gabe.
    
    **Maeve Ferguson:** Yeah, okay. Is your. Did your gut tell you the same thing? There's. It's probably better to stop and restart than it is to start duplicating funnels. Do you know, just to start to. Because all needs to be like. Once you duplicate it, then you have to re. Embed everything. Then you have to retest
    
    **Christopher Ogle:** everything.
    
    **Maeve Ferguson:** Yeah. Do you know what I mean? Does it make more sense?
    
    **Christopher Ogle:** Oh, yeah, for sure. This message that I'm putting in here is about the call. Moving
    
    **Maeve Ferguson:** the call forward 30.
    
    **Christopher Ogle:** Would you. Would you mind putting like
    
    **Maeve Ferguson:** a quick little. Yeah, I
    
    **Christopher Ogle:** do the message summary thing to him and then say this is what we think is best to do and then he can reply to
    
    **Maeve Ferguson:** that thread.
    
    **Christopher Ogle:** Absolutely, that'd be great. I'm just trying to get this call moved forward. So Gabe and I gave. Maeve and I met this morning and think it's best for her to join our weekly calls as much as she can for context. For context and clarity. That said,
    
    **Maeve Ferguson:** does it make Clasher Hill
    
    **Christopher Ogle:** still runs? Yeah. Is
    
    **Maeve Ferguson:** it
    
    **Christopher Ogle:** to.
    
    **Maeve Ferguson:** Yeah.
    
    **Christopher Ogle:** To move our weekly call forward 30 minutes to. Are they still in the same time as us right now? As in the same.
    
    **Maeve Ferguson:** Yeah, 9 o', clock, 5 o'. Clock. Because I've got a call today with the Pacific, so they're. They're
    
    **Christopher Ogle:** switched back. It's still 9am
    
    **Maeve Ferguson:** there's like two weeks where it's weird. And
    
    **Christopher Ogle:** then now they're their box light hours difference to 9:00am Pacific Time.
    
    **Maeve Ferguson:** I'm just thinking the, the way you're saying about the SKU and Domo, I need to get clarity then from the analytics perspective. I need to see like what was the old. What were the old ads, the old sku. And then what are we not, you know, what are we filtering for for the new one? Because otherwise the. I'm going to screw up the data analysis.
    
    **Christopher Ogle:** But if you're not sure of anything, just put that in that little message
    
    **Maeve Ferguson:** there. And Gabe, just. Whenever you mentioned this new ski, it's so. Yeah, that's fine. That's. It's just a. It's a game question and don't know, just to make sure that I'm pulling the accurate data because otherwise the analysis is pointless.
    
    **Christopher Ogle:** From my understanding, you'll pull the data at the ad campaign level. So the ad campaigns. Let me just give you a quick. So basically what will happen here if I go to Domo. Let's see. All right, so if I go to add performance. But okay, so if I go to add camp. So add performance. So I think I shared a video with you and Gabe also shared a video to say not to use the funnel part,
    
    **Maeve Ferguson:** right?
    
    **Christopher Ogle:** Yes. So you go to add campaign. Yeah. Now when you go to add campaign, if I type in the funnel code, which is dqfe, you'll see all these ad campaigns
    
    **Maeve Ferguson:** here.
    
    **Christopher Ogle:** Yeah. Right. So if I click select all, that's going to bring up all of those ad campaigns. Now you'll see the ad campaigns for the quiz for however many days back. So you can do
    
    **Maeve Ferguson:** your reporting
    
    **Christopher Ogle:** on these particular ad campaigns. Now moving forwards, when we launch a new campaign for this
    
    **Maeve Ferguson:** new
    
    **Christopher Ogle:** DQFE, PG1
    
    **Maeve Ferguson:** funnel.
    
    **Christopher Ogle:** Yeah, I'm almost certain that these campaigns are going to be launched as DQFE1.
    
    **Maeve Ferguson:** Oh, brilliant. That's easy there.
    
    **Christopher Ogle:** Cool. Okay, that doesn't change the funnel
    
    **Maeve Ferguson:** code. Yeah, but I.
    
    **Christopher Ogle:** But the campaigns are DQFE1 because it's going to
    
    **Maeve Ferguson:** PG1. Right, that's easy then. So as long as I'm just at that differentiation, then that's
    
    **Christopher Ogle:** cool. Yeah.
    
    **Maeve Ferguson:** Okay. That's Grant. Yeah. So the way, the way I'm thinking of doing is like, how can we get this data? So Today's report is 31st October at midnight through to last night at midnight. You're not going to include today's data. So that's going to be through the last night. Then we're going to have this weird period where we have a few days of Quiz 2 and then we'll have the separate pieces, like here's the. You know, because over probably the next seven days, we're going to move to the new one. Yeah. So like next week's report is going to be half of the old one and half of the new one. And then we'll get in every week then into just like here's, you know, a single version of the truth type thing for the new PG1. Yeah, yeah. Two things that I'm still not 100 on mix panel and your. The app. What do we call that app thing earlier? Apps Flyer. So what's the. Whenever you said there was a misunderstanding, Right. Apps, Flyers. What's. What is the Apps Flyer, what's a track and what's the point of that from a performance
    
    **Christopher Ogle:** point of view? So I believe the Apps Flyer tracking is really more to do with tracking the ongoing subscription revenue from the, from the app. And I also think it's some behavioral data from the app side,
    
    **Maeve Ferguson:** but it's also going to be LTP calculations.
    
    **Christopher Ogle:** Then it possibly is going to be LTV calculations because and this is a really important point to clarify with Gabe
    
    **Maeve Ferguson:** today
    
    **Christopher Ogle:** in, in that message is what specifically is the importance of the Apps Flyer tracking? Because I don't know for sure if Domo is going to track the second payments forwards of the subscription. I think Domo is only going to be tracking day one revenue. Yeah. Okay.
    
    **Maeve Ferguson:** Okay. So then from an analysis point of view, then we're pulling from Domo and this other thing to
    
    **Christopher Ogle:** get our picture eventually. But I'm not sure and I don't
    
    **Maeve Ferguson:** want to. Yeah,
    
    **Christopher Ogle:** okay. Something. I'm not, I'm not sure. It may be that they're going to work then with Apps Flyer to get that data back into domain.
    
    **Maeve Ferguson:** Okay, right. Let me, I'll ask Gabe
    
    **Christopher Ogle:** then. Yeah, Gabe will know for sure. And that was where the confusion came. Is that. Oh, well, well, although Apps Flyer sounds like it's important, it's not necessary for day one revenue to be able to launch it and get the data that we need to see if people are actually even purchasing the app and downloading
    
    **Maeve Ferguson:** it. Yeah. Okay, Grant, and then Mix panel. I've been in there and had a look around. What's the. Are you involved in that at all?
    
    **Christopher Ogle:** Mixpanel in the data side is Catherine is the one who's doing it and. And Danielle is the one who oversees Catherine.
    
    **Maeve Ferguson:** The purpose of it is
    
    **Christopher Ogle:** what from. Oh,
    
    **Maeve Ferguson:** sorry.
    
    **Christopher Ogle:** Your purpose of it is to see the vsl, the
    
    **Maeve Ferguson:** video
    
    **Christopher Ogle:** metrics and the interaction on the actual VSL side of things.
    
    **Maeve Ferguson:** Okay, so then that's going
    
    **Christopher Ogle:** to be. Sorry, the checkout channel data. Sorry, the checkout funnels as well, like the flows, the pages. So for example, like if I go to this URL here. Just a sec. So when, when someone lands from the quiz onto
    
    **Maeve Ferguson:** this page,
    
    **Christopher Ogle:** we're tracking the video through vitalytics so that, that vitalytics data is going to be important to see. Okay. How far through the VSL are people getting? Because the button
    
    **Maeve Ferguson:** does not
    
    **Christopher Ogle:** pop until. I believe this VSL is like 11 minutes. I think the button pops somewhere around 8
    
    **Maeve Ferguson:** minutes.
    
    **Christopher Ogle:** I go PGZ, show all that one. So it pops at about 8 minutes and then when it click when they click on this
    
    **Maeve Ferguson:** button,
    
    **Christopher Ogle:** they'll go to this page here, which is for them to purchase their subscription. Now, now this is mix panel
    
    **Maeve Ferguson:** data.
    
    **Christopher Ogle:** How many people are getting through checkout one? And then once I go through checkout
    
    **Maeve Ferguson:** one
    
    **Christopher Ogle:** [testmail.com](http://testmail.com) 415 and then when I get to this next step, this is the current selection of $39 a
    
    **Maeve Ferguson:** month.
    
    **Christopher Ogle:** Yeah, a new SKU. And then there's this SKU here, which is 299. So if I click on this one here and I select it now, I'm paying for a yearly
    
    **Maeve Ferguson:** membership.
    
    **Christopher Ogle:** And then as I go down and I fill in the rest of the information, this is all the mixpanel data that, that's that you're going to need for tracking the actual interactions on the checkout
    
    **Maeve Ferguson:** pages. Okay. And then this analysis document. So obviously we've got the ad performance side, we've got the Quiz Funnel performance side. You guys want an analysis then on the vetalytic side and the max panel
    
    **Christopher Ogle:** side as well? Ideally, yes, because for me to make correct decisions, I need to be able to see the interactions and engagements and drop offs at every single point
    
    **Maeve Ferguson:** of the funnel. Yeah. Okay. And then so is this worth it to do for a week of data even though everything's shifting, or is that next week's report?
    
    **Christopher Ogle:** I would say it's really only important for. Oh, so sorry, say again. Are you talking for once we launch this new PG1 funnel, or are you talking
    
    **Maeve Ferguson:** from before? Yes, today's report is all based on Quiz Funnel 2, which points to the old stuff. Okay. So we can build that as a template to pull from all of these sources to say, here's what your reporting is going to look like going forward, but next week's report is going to be half quiz funnel 2, half quiz funnel 1. And then the following week will actually be here's Quiz Funnel one performance. And that's the stuff that actually matters. So what I'm trying to ascertain is, is it worth going down the rabbit hole for all of these things for one week's worth of data, or do we focus on the quiz funnel 1 1? Does
    
    **Christopher Ogle:** that make sense? Yeah.
    
    **Maeve Ferguson:** Either of us? Fine. I'll need to get whoever your vitalytics person is, so I'll need that data too.
    
    **Christopher Ogle:** Yeah, that would be Danielle for the vitalytics
    
    **Maeve Ferguson:** data.
    
    **Christopher Ogle:** Now, I don't think that the vitalytics data is important for the Quiz 2 that we've just
    
    **Maeve Ferguson:** done.
    
    **Christopher Ogle:** I also don't think that the mix panel data is important for Quiz 2 either because the sales were low. And I think that despite the fact that some people actually made it through to the vessel, for me it's pretty clear based on the fact that every single purchase so far has been $47, that people are not taking any upsells because they're not aligned with. It's not aligned with the swing circle angle. It doesn't set up for the swing
    
    **Maeve Ferguson:** circle.
    
    **Christopher Ogle:** That being said, like, that's a pretty easy conclusion to come to. And I don't like normally making assumptions, but I think the point I'm trying to make is that we don't need to. You don't need to go spending time putting together a whole report for
    
    **Maeve Ferguson:** us to come
    
    **Christopher Ogle:** to a conclusion that I think we've already come
    
    **Maeve Ferguson:** to. Yeah. So say this week it's just like, right, here's the ad performance, here's the quiz performance. We're not looking at the vitalytics and the sales performance in this week's report because it's Quiz 2, but going forward we're going to look at all, every single
    
    **Christopher Ogle:** angle.
    
    **Maeve Ferguson:** Yes.
    
    **Christopher Ogle:** Yeah. Yes. And look, the data of. Here's the change that we made to question one on quiz. On the Quiz two, those few days of data is important because we want to see that. Hey, quiz start rates, boom,
    
    **Maeve Ferguson:** they went up.
    
    **Christopher Ogle:** Like that was
    
    **Maeve Ferguson:** important.
    
    **Christopher Ogle:** And then we want to see that. Okay, on the results pages, we implemented the
    
    **Maeve Ferguson:** new video and we saw 71
    
    **Christopher Ogle:** seconds. 71 seconds went down to 5 seconds. Bang. That was a really important. Like that, that those two key data points that we do want to see. But then as soon as we get into the pg, PG
    
    **Maeve Ferguson:** one.
    
    **Christopher Ogle:** The
    
    **Maeve Ferguson:** problem today, because those two changes were only implemented yesterday, there's. There's going to be a bit of data, but it's going to be physically insignificant for one day's worth of data to say what difference those two shifts made. So it'll be next week's half report
    
    **Christopher Ogle:** that will. That's what I mean. That's what I mean. It'll be next week's half report that that data
    
    **Maeve Ferguson:** comes
    
    **Christopher Ogle:** in. But then the other half of the report is going to be, okay, halfway through whether it's Tuesday or whatever day we do
    
    **Maeve Ferguson:** next
    
    **Christopher Ogle:** week, we switched over to PG1 and we noticed that quiz start rates maintain the same, quiz completion rates maintain
    
    **Maeve Ferguson:** the same.
    
    **Christopher Ogle:** And now people are actually starting to watch the content videos. And that's where that little wheel thing doesn't really matter anymore. It's more like the engagement and interaction on those content videos which is going to be a vitalytics
    
    **Maeve Ferguson:** thing. Yes. Okay, cool. And then I have next panel already. Okay.
    
    **Christopher Ogle:** Yep.
    
    **Maeve Ferguson:** Okay, cool. Right, I'm clear. Right. I'll send a summary to Gabe then. Plan of attack. And there's no reason why we couldn't do it on Monday if
    
    **Christopher Ogle:** not the switch
    
    **Maeve Ferguson:** over. Yeah.
    
    **Christopher Ogle:** Oh, no, no, yeah, sure. Definitely. Yeah. I just want to make sure that like he's got time to get everything done his end. You've time to do everything.
    
    **Maeve Ferguson:** You're
    
    **Christopher Ogle:** in. Absolutely. Monday
    
    **Maeve Ferguson:** for us. I can do it today, but I know there's, there's things he has to do as well, so. Like if he can do
    
    **Christopher Ogle:** it today. If, if he can do it today. My only concern is that there's going to potentially, potentially be communication coming your way at like 10 or 11 o' clock your time at night, just based on time zone differences. But if, if he's able to get to this at 9am his time and there's within that window of four to five
    
    **Maeve Ferguson:** hours.
    
    **Christopher Ogle:** Yeah, he says, yeah, we've got everything done. We're tested. Check with Bill. Bill's all aligned. Everything's tracking in Domo correctly. No, no, we're. No worries. Then we can just get the media team to switch off the campaigns and start new ones
    
    **Maeve Ferguson:** under df. That means I get seven days of data for the old one and then seven with
    
    **Christopher Ogle:** a new
    
    **Maeve Ferguson:** one. Yes. I'm, I'm about tonight,
    
    **Christopher Ogle:** so it doesn't matter.
    
    **Maeve Ferguson:** Okay. Like as long as it's not like midnight or one in the
    
    **Christopher Ogle:** morning, like I should be
    
    **Maeve Ferguson:** awake.
    
    **Christopher Ogle:** Yeah,
    
    **Maeve Ferguson:** yeah.
    
    **Christopher Ogle:** If you could just put that in your message then that would be great. Just to see if it's possible that we can get it done today. If Bill responds
    
    **Maeve Ferguson:** and gets everything done until 11:30pm Type thing. Yeah, I haven't called until 11, so. Still be awake
    
    **Christopher Ogle:** anyway. Yeah, for sure. Because Gabe wants to get
    
    **Maeve Ferguson:** this done. Yeah. Okay,
    
    **Christopher Ogle:** cool. Just as much as everyone else, so
    
    **Maeve Ferguson:** for sure. Okay. Right, brilliant. I will summarize all that. And I haven't captured anything correctly, just corrected, but it should. I'm clear now what we're doing, so that's perfect.
    
    **Christopher Ogle:** Okay, awesome. I'll send you, I'll send you the URL for this recording in case you need it for
    
    **Maeve Ferguson:** whatever reason. Yeah, that would be good. Yeah, that would be great. Right, brilliant. And then once we hear back from Game about the call, we'll get that onto my calendar as soon as possible. Because if it's not my calendar, then somebody else books in over the
    
    **Christopher Ogle:** top of it and then yeah, Maybe if you could just put a little placeholder for
    
    **Maeve Ferguson:** now, that'd be.
    
    **Christopher Ogle:** That'd be awesome because. Yeah, this would be great to have
    
    **Maeve Ferguson:** you there. Yeah, I could have been on it yesterday if it had been in my calendar type thing.
    
    **Christopher Ogle:** Do you mean.
    
    **Maeve Ferguson:** So I could have squeezed it in. So I'll just. I'll put it in here now. I just lock 5, 2, 6, and then hopefully it's at 5
    
    **Christopher Ogle:** o'. Clock. Okay. No, it's only 30
    
    **Maeve Ferguson:** minutes. Yeah, but I'll hold because it's either going to be half
    
    **Christopher Ogle:** five to six. Oh, I see, I see,
    
    **Maeve Ferguson:** I see. Y. If it ends up being half five to six, the best I can do is, like, I'll go to as many as I'm able to if my husband can go get the baby, but if he can't, I have to go lift her because I can't just leave there. So I'll try my best to. And then I repeat that every week. Okay, cool. And the only one I definitely can't do is December 4th,
    
    **Christopher Ogle:** so. Okay,
    
    **Maeve Ferguson:** that's fine.
    
    **Christopher Ogle:** When I put you on the new calendar invite, you just reject the December 4th.
    
    **Maeve Ferguson:** So we know. Yeah, People
    
    **Christopher Ogle:** know them. Yeah. That I didn't.
    
    **Maeve Ferguson:** Yeah, Right. Brilliant. Thanks million. I'm gonna get cracking on all this, then. I'm working on PG stop most of
    
    **Christopher Ogle:** today, so.
    
    **Maeve Ferguson:** Okay. Get
    
    **Christopher Ogle:** done. All right. Awesome. Thank you. Speak soon. Cheers.