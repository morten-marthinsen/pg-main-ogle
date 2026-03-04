# Review Vidalytics Data  - 10/28/2025

**Date:** October 28, 2025
**Source:** ClickUp AI Notetaker

---

**Attendees:** Christopher Ogle, Patrick Hayes, Katherine Green, Danielle Schwolow
[https://t9014714949.p.clickup-attachments.com/t9014714949/25972139-3953-42fa-87d3-fcf67094930c/25972139-3953-42fa-87d3-fcf67094930c.mp4?view=open&filename=Review%20Vidalytics%20Data%20%20-%2010-28-2025.mp4](https://t9014714949.p.clickup-attachments.com/t9014714949/25972139-3953-42fa-87d3-fcf67094930c/25972139-3953-42fa-87d3-fcf67094930c.mp4?view=open&filename=Review%20Vidalytics%20Data%20%20-%2010-28-2025.mp4)
### Overview

The meeting focused on analyzing the digital conversion funnel for various video sales letter (VSL) pages and identifying the biggest drop-offs from impressions to checkout. The team reviewed performance data, discussed integration challenges among Vitalytics, Checkout Champ, and Mixpanel, and explored opportunities for enhancing overall conversion rates.

### Key Takeaways

*   The team decided that the data spreadsheet should be updated to include detailed video titles and durations, which will help distinguish between different VSL versions and track performance accurately.
*   It was agreed to further investigate linking Vitalytics data with Checkout Champ and Mixpanel to achieve a holistic view of the digital funnel.
*   Patrick was tasked with documenting technical integration requests in ClickUp to improve granular event tracking across platforms.
*   The group recognized that refining play rates and clarifying checkout funnel data are critical to identifying the main lever for improving conversion rates.

### Next Steps

- [ ] **Katherine Green**: Update the data spreadsheet by adding comprehensive video titles, durations, and resolving any missing video data (e.g., the OSSF video with high impressions).
- [ ] **Patrick Hayes**: Document and submit technical integration requests into ClickUp, focusing on linking Vitalytics data with Mixpanel and Checkout Champ.
- [ ] **Christopher Ogle**: Confirm a follow-up meeting to review the updated funnel analytics, especially checkout step metrics, and discuss potential VSL improvements.
- [ ] **Danielle Schwolow**: Coordinate with Todd to prepare for the next phase of funnel analytics review based on the updated data.
### Key Topics
*   **Meeting Introduction and Purpose**
    *   Christopher Ogle introduced the meeting by emphasizing the importance of improving the digital conversion rate for the VSL funnel.
    *   He acknowledged previous discussions with Danielle and Catherine and welcomed Patrick for visibility and insights.
    *   The overall focus was on analyzing the digital funnel—from impressions, video plays (or unmute events), to CTA pop-ups and checkout steps—to identify drop-off points.
    
*   **Analysis of Digital Funnel Data** Update
    *   Catherine presented a detailed spreadsheet containing data on impressions, play/unmute rates, CTA pop timing, and viewer progression through the funnel stages.
    *   She explained the approach of selecting the lower value between play and unmute events to account for autoplay inconsistencies.
    *   Data was organized by different video categories (SSTS, OSSF, WPSS) over various time periods (2023, 2024, and 2025), with emphasis on the performance differences observed across these periods.
    *   Discussion included how increased traffic correlated with higher retention and CTA visibility, and clarified measurement stages such as impressions, play rate, one-minute view, four-minute view, and CTA pop.
    
*   **Challenges with Data Integration and Consistency** Problem
    *   The team discussed difficulties in linking Vitalytics video data with Checkout Champ metrics, which hindered a clear view of how video performance translated to checkout funnel behavior.
    *   Issues included mismatches in tracking, such as different tagging methods (e.g., mobile vs desktop) and missing data points (notably an OSSF video with high impressions).
    *   Patrick and Catherine raised concerns about the reliability of Mixpanel’s CTA pop event data and the inability to filter by device due to inconsistent tagging.
    
*   **Improving Video Metadata and Tracking** Idea
    *   Catherine proposed adding detailed metadata to the dataset, including video titles, embed codes, and duration times, to better contextualize performance differences among video variants (e.g., original control vs mechanism rewrite).
    *   Christopher emphasized the need to know which video version (identified by title/ID) was being used to accurately interpret the results.
    *   Patrick suggested transitioning from URL-based reference to an event-driven tracking system to pass granular details (embed codes, titles, etc.) into Mixpanel for more precise analytics.
    
*   **Determining the Primary Opportunity for Funnel Improvement** Decision
    *   The discussion focused on identifying whether the main lever for improvement should be increasing impressions, improving play rate/engagement, or optimizing the checkout funnel (i.e., Checkout 1 and Checkout 2 stages).
    *   Danielle and Christopher weighed the benefits of a higher play rate as it could drive engagement, but noted the need to confirm with checkout conversion metrics.
    *   Christopher highlighted that understanding the biggest drop-off point was crucial for determining whether the current focus should be on enhancing the VSL itself or on downstream conversion processes.
    
*   **Action Items and Next Steps** Decision
    *   Catherine agreed to update the spreadsheet to include video titles, durations, and to revisit missing data (especially for an OSSF video with over 14,000 impressions).
    *   Patrick committed to documenting technical requests for improved data integration in ClickUp, including the possibility of passing granular event data from Vitalytics to Mixpanel.
    *   Christopher planned to use these insights to guide further work on the VSL improvements over the next three days and to reconvene for a follow-up meeting to discuss checkout funnel data.
    *   Danielle indicated that updated data would be used to further analyze the funnel, particularly focusing on checkout metrics for alignment with overall conversion improvements.
    

*   Transcript
    
    **Christopher Ogle:** Anyway, it is what it is. So let's, let's jump in. I want to make sure we maximize the time that we've got here. So thank you very much, first of all, you guys, for joining this call and taking some time out to talk about this super important overarching project that we're working on here. As Danielle and Catherine, we talked about this last week. Patrick, you're just jumping in kind of halfway through. Great to have you here. Just really mostly for visibility. Would love your insights as well. The topic of discussion is digital conversion rate. Okay. So obviously a really important part for the business that needs to be improved. Digital sales, obviously at this time of year naturally go down. But overall we're looking to improve that conversion rate not just in the off season, but also next year as well. So what I'm looking to do is work on a new BSL for digital. But also we need to get very clear understanding of where there is a breakdown in the funnel for digital for conversion rate. So is that the button clicks on the vsl? Is it checkout one? Is it check out too? ET so Catherine has been doing some research, pulling some data. I see you've got a spreadsheet there. After that you put inside the chat, which is great. Would love for you to walk us through that so we can just have get a high level view of whatever data we have available to us so that we can make some clear decisions on what to do next. And then Patrick, as a part of this process, as you go through, you'll start to see a. Okay, how can this whole process of data pulling and gleaning insights be improved? And then we can go ahead and add any tickets to your process that are necessary.
    
    **Patrick Hayes:** This is good because it's just giving me more and more breadcrumbs on painting the picture for what we want to have in the end state. So thanks for including me. I didn't know we had our hat swag.
    
    **Christopher Ogle:** Oh, I just got this last, last week, so. Yeah, I think so. Yeah. Feel free to reach out to Joanna for that and she can send you. Okay. Catherine, over to you.
    
    **Katherine Green:** Yes. Cool. Can you guys see this? Can you see my screen? Okay, cool. It's giving me a weird, a weird little message here. So what I've got here, this is just the. Everything. So this is all of the data that I had shown to Chris and Danielle like last week. But this tab here is our new data. Hold on. The controls are covering up my other controls. Okay, so I've kind of gone through this a couple different ways. Just as far as, like the way to view the percentages as people are moving through these different steps that we were looking at. So what I've got is the impressions, which is the number of people who land on the page. And then I've got a column in most of these tabs, what I've got titled Play and Unmute. That is because some of these videos were autoplay with or without unmute. So sometimes the play numbers are actually more like the. The impression numbers because of the autoplay. Right. So what I did is I just grabbed whichever of those percentages was the lowest because I like we know if it's, you know, 98%, that that's probably an autoplay video. And so that's what you've got here. It's going to be. And all of these sheets have all of the numbers somewhere in. In that sheet. So here's the plays and unmute rate over here, right. And then this column is just using whichever one of those is the smallest. So and I'll explain. And that doesn't always make sense, but I'll get to that. So by looking here, the breakdown that we've got, I'm comparing the numbers between, like each column. So the grading here is for these numbers, highest to lowest and then these and on. Right. So we can see which ones have the at which step, which videos have the most remaining of the people who had initially landed on that page. And one of the things that I gleaned from this data, from this view that I found the most interesting is that the performance of the video is like very closely related to the number of people who actually land there. So the amount of traffic that's being driven to the page increases the performance of that page. If we have more people being sent there, people tend to stay in the video longer. They're more likely to see the CTA rate. So, like, our percentage watched ends up going up. You can kind of see that. Let's do this this way. See here we have, you know, highest to lowest number of people landing on the page. And you'll see that the percentage watched tends to go up. The CTA rate doesn't necessarily change as much though. But that's because we've got the CTA rate. I'm sorry, the CTA pop at a different time in each of these videos. So it's not going to be quite the same way. But the actual amount that people watch is related, like, does tend to be somewhat related to whether or not there was enough traffic going to that page. Does that make sense?
    
    **Christopher Ogle:** Yes, it does. I'm just curious that. So SSTs 1, 2 and 3. So what are they exactly? The one, I'm guessing, obviously one is like, what, three?
    
    **Katherine Green:** I forgot
    
    **Christopher Ogle:** to explain.
    
    **Katherine Green:** Yeah,
    
    **Christopher Ogle:** that's important.
    
    **Katherine Green:** Okay. Yeah. So remember when we talked about this last week, one of the issues that we had is that we have a bunch of different videos inside of vitalytics and that those different videos have been on our different pages at different times. So in order for me to grab data across the same date ranges, rather than trying to figure out which video was on, you know, the SSTS page, at whatever point it was, I just went through the top three SSTs, the top three OSSF and the top three WPSS videos by the number of people who had watched the video in vidalytics. So I just went to vitalytics and went to each of those folders and picked the top three by play rate or by play count, and then pulled the data from each of those top three videos for April through July of 2023, 2024 and 20. Let me put this back in order and that'll kind of make a bit more sense. So this is the top OSSF1 video. And this is the data from 2023, 2024 and 2025. And I've hidden these columns in. In most of these sheets, but you can see we don't really need these right here. Yeah, so you can, you can sort or filter or whatever by the year by if it's the top video, whatever that is. So. Yeah, this is just. Yeah. Oh, it tells you if it's ossf, if it's the top video, the second top video, third top video. And then I have the data from all of these from 2023, 2024 and 2025. And I will point out that for WPSS, we weren't able to get as much data because that's a new thing. Right. So we only have 2025 data for the top three videos and it also only goes back to August because that's when we lost launched wpss. Does that all. Does that all follow?
    
    **Christopher Ogle:** Yeah, it helps. I just. It hasn't quite landed with me fully how these. Hang on a sec. So just go back to that spreadsheet. Sorry. Because what I'm trying to do is see whether it's necessary to gain insights to have all three of those videos or if we can get enough insights from just one, and whether you can just filter out the two and the three to see just the one version for SSTS. That's why like for example, SSTS 1 has 2, 2 and a half, 2 point almost 3 million impressions versus SSTS 2 versus SSTS 3. So I'm just trying to figure out like whether we can start with just one, one at a time, or whether it makes sense to look at all three of these together to gain the insights that we need to. That. That's
    
    **Katherine Green:** all right. And that's why I have these other columns still left. That's why I just had hidden them. But that way we can do that, right? We
    
    **Christopher Ogle:** can just look
    
    **Katherine Green:** at the ones or we could just look at an ossf, that sort of thing.
    
    **Christopher Ogle:** I think what would be helpful, and you don't have to do this now, is that the video has an id. It would be great to know what that test was exactly. Like, for example, was the SSTs first control from the very beginning and then the new mechanism rewrite. Like I know that off the top of my head, but we rewrote the mechanism and that became the new control. But that would be good to know which one that was. Does that make sense?
    
    **Katherine Green:** Yeah. So I've got the embed codes. That's where we can quickly just go on and grab these and go to vitalytics and find that exact video. But what I can do is I can go through and grab all of the video titles and if that's, if that's the part that would be helpful
    
    **Christopher Ogle:** for you, the video titles would just. Would be helpful at a glance. And again, you don't have to do that now. This is going to be an ongoing process. I get it. But just being able to see that at a glance and being like, oh, okay, cool. SSTS 2 is the mechanism rewrite, for example. That way I have context of what happened in that VSL and what was different. Yes. So that when I'm reviewing this data, I just have that additional context. That's kind of what I was trying to communicate that I couldn't communicate properly.
    
    **Katherine Green:** Yes. I will go back and I will add the video titles for all of these. Something else that had popped into my head that I wish I'd started doing when I jumped into this initially was to also grab the length of each video because I do have the CTA pop time, which is helpful. But it's also, I think it would be, it would be nice to know how long each of these videos are, which we could also then use to know the percentage watched. We would know approximately how long that actually is. So I will go through and I'll get those video titles and I'll also grab the video length or duration time.
    
    **Christopher Ogle:** Okay, awesome.
    
    **Patrick Hayes:** Cool.
    
    **Christopher Ogle:** And so. Yeah, go
    
    **Patrick Hayes:** ahead. Yeah. So CTA rate or is that just progressing through to the next checkout step or what is that?
    
    **Katherine Green:** So we don't have a great way to link the Vitalytics data with our checkout Champ data, which is what that that add to cart would be. So I can't one to one and see, this is what I was speaking to when I mentioned that that we. So each of the different funnels on the VSL pages that we're looking at for ssts, ossf, wpss, we've had different actual videos on those pages across time. So rather than trying to keep it one to one, like watching this by the URL so we know it's the SSTs open, close, BSL and going through it that way because we actually are changing the literal video on those pages. I can't connect knowing which video it was with who ends up in the checkout champ funnel without going and doing like a whole bunch of digging and trying to like, I don't know, maybe using like the, the Wayback Machine to, to go back in time and see what videos were on the pages then. Yeah.
    
    **Patrick Hayes:** Does
    
    **Katherine Green:** that make
    
    **Patrick Hayes:** sense? Yeah. And then yeah, because that was going to be one of my next thoughts too of like what of Vitalytics data Can we just pass to Mixpanel, if any at all? Because in my mind that's probably going to be the best medium to get all the data we want. So then we can then tie it together with checkout Champ, Shopify, whatever.
    
    **Katherine Green:** We do get some of the Vitalytics data in Mixpanel already. And what we get there is like obviously impressions, which is just who lands on the page play rate and then CTA pop rate. But I will say that in my experience because I do use those numbers in some of my mixed panel reports for our testing, it's not all. It's not always accurate and it's, it's usually pretty close. But occasionally it's just something totally random. Right. Like is that it's not a consistent way to know for sure that our data is coming through that the data we're looking at in Mixpanel we could rely on it probably like 75% of the time. But those other times, yeah, you would still have to go back to Vitalytics to confirm whether or not it was correct. So it's possible, but it's not the most useful.
    
    **Patrick Hayes:** Okay, so it sounds like there's Hope,
    
    **Katherine Green:** actually there is hope and there's also, I know not in Vitalix and Mixpanel, there is also a like percentage watched. It's not quite the same way that Vitalytics presents that data, but the same issue remains there is that I'm not like 100 certain that that data is always correct.
    
    **Patrick Hayes:** Okay, yeah, all right. Yeah, that'll be something I want to dig in on further down the line.
    
    **Katherine Green:** Yeah. So when I say CTA rate or you know, CTA pop, whatever in this data sheet, what I'm using is like I just straight up went into each one of these videos and I found what time the CTA popped. And so this is the number of people who are still watching the video at the time when the CTA popped. So it's not actually an add to cart. I can't say for sure who actually clicked on, on the cta, but this is the number of people who would have seen the cta.
    
    **Patrick Hayes:** Cool.
    
    **Katherine Green:** Okay. So yeah, having more traffic to any page seems to improve the overall performance of that page. I don't know if that's just, you know, the way that the data, that the traffic's being qualified, it just ends up working out better in the algorithm side, I'm not sure. But it does show that the more people who watch it, the more they watch and like the longer into the video, the more likely it is that they end up seeing the cta.
    
    **Christopher Ogle:** Is that not just specific to the year? If you look at 2023, you look at those high impression rates on those VSLs, the CTA rate is higher. But then if you go to 2025, there is a high impression rate on just 2025.
    
    **Katherine Green:** Oops,
    
    **Christopher Ogle:** there's only really one VSL, which is if you scroll back to the left a little bit. Seems like there's some OSSF data missing here because OSSF, there's definitely a VSL in 2025 that has had more than 14,000 impressions. Without a doubt. I don't know where that one is.
    
    **Katherine Green:** I am not sure either. Well, there's this one. Oh, that's what you said. It's more than 14. 14,000,
    
    **Christopher Ogle:** yep. There's got to be another one in there missing.
    
    **Katherine Green:** Oops, sorry. My trackpad is fighting me this morning.
    
    **Christopher Ogle:** So just for the sake of if you can find it. Yeah, right now then great. If not, then just for the sake of time, I just want to move on to the next point and maybe you can go back and find this. Catherine, if you can't find it, just let Danielle know because We've got to be able to figure out where that's gone. But, yeah, I can see there's one.
    
    **Katherine Green:** Yeah, no, I'm seeing this right here. I'm not sure. I'm not sure what's happened to that data. Yeah,
    
    **Christopher Ogle:** it should be the lead one. It should be the lead one. No drills. That was the one that we originally went with. And then I think there was another one that we updated. I don't know. I'll leave that with you. Just because it's important to make sure we have that BSL mix. I know that there's got to be a lot of impressions for that one. And then I would be curious to see if your hypothesis about having more impressions leads to more CTA pops in 2023 versus 2025. Because my theory is that in the beginning, in 2022, 2023, we had more people watching the VSL who'd never seen the VSL before, and so they were more likely to reach the end, whereas 2025, I'm guessing that that CTA would have dropped a little bit because more people are seeing the BSL and saying, hey, this is the same BSL I've seen before and therefore not watching to the end. So I'd like to validate that. So. So, yeah, if you could fill in that data for next time we speak, that would be great.
    
    **Katherine Green:** Yeah. Okay. Yeah, I was gonna see. It's just unique views. I was hoping there was a number in here or that vitalytics had a number for who was a new visitor, but it doesn't look like they do. I can dig and see if I can. If I can parse that out too, as well. So, yeah, let me. Let me take back. Go back to this oss, these OSSF numbers, because I am not sure you're like, yeah, you're right. Immediately when I jumped in there, that. That didn't. That didn't line up. So.
    
    **Patrick Hayes:** Yeah. Question two, I just had. Are we able to look by device?
    
    **Katherine Green:** No, unfortunately not. I tried to do that, but I could not find a way to do that. There. There kind of is a way to do it in bitalytics, but I don't remember off the top of my head why I ended up deciding that it wasn't a very useful. I think it was because when I started using those filters, it was obvious that not everybody had actually gotten tagged with either mobile or desktop. There's a lot of, like, not set sort of data in there. Yeah. So when you start filtering that way, all of a sudden the Numbers just drop really drastically and you're like, I know there's way more people who watch this.
    
    **Christopher Ogle:** Cool, sure. So just before we move on Patrick, you're obviously gaining some insights here into what pieces are missing. But Catherine, could you just quickly share with Patrick what, during this process, what you would love in an ideal state from Patrick in the future to make a process like this easier and more efficient and effective for you.
    
    **Katherine Green:** Obviously we would like to be able to connect the Vitalytics data to the Checkout Champ data. And so and or Domo, whether that ends up going into mixed panel. The issue is just that, like I said, it doesn't match up. So it makes it hard. Like, so when I'm, when I'm reporting for any of our ongoing tests, I'm having to get the numbers from vitalytics, then I'm having to get them from Checkout Champ. And I've already gone through the whole, like, it's difficult to match up those things. So I would say A, being able to get those things linked together and B, this might be the more complicated part. And we've kind of sort of talked about this. Danielle, I know that you've talked about this a little bit, but working on making sure that every time we like do a video update that we're keeping track of which videos are actually on the pages, especially after we have a test variant that wins. And so we end up deciding to go with that new, that treatment variation, being able to like whether that's just keeping track of it in some sort of spreadsheet or perhaps there's some way in Vitalytics that we can like send a, like you can mark a video as being for a particular page, if that makes sense, like a page type. So like, if there's a page type, like ssts, closed vsl, whatever, being able to like consistently know which video was on that page, does that make sense? And I'm not sure the best way if it's just literally manually tracking it or if there's some way that we can send some token through somehow that like stays true to the video and the page itself. It connects those two things so that when we update the video we don't just like lose all that data or have to go back through and look at like a bajillion different videos inside
    
    **Patrick Hayes:** of the way that I'm viewing a lot of this is that down the line we get away from using URLs for any sort of reference and we try to do everything via event. And this example here, you could be passing like the embed for that video particularly. So you could even pass in, like, title and whatever other links we want. That way we have it from a granular standpoint, like, okay, we landed on the page. How long did they watch? And we could see whatever video based on URL in there instead of having to track things in a spreadsheet. So that's where my mind is at as far as future state for being able to, like, slice and dice from that perspective. So I will. I'm gonna keep doing some discovery to see if it's feasible.
    
    **Katherine Green:** Yeah. And one of the other things. This isn't so much like something I want changed, but one thing that I'm kind of confused about and that I've wondered about is in Mixpanel, when we have that CTA POP event happening, how it knows that, because vitalytics doesn't even seem to know that. So I'm not sure if it's maybe, just maybe that only implies, like, if. If it's a closed VSL and it has that. That console change whatever happening, maybe that's the event. But if that's the case, then we don't know for. For the open VSL ones, we wouldn't have that event firing. So it might not be as easy to know if they're actually seeing the CTA pop. So I don't know. Just clarification on what that event is in Mixpanel, that CTA POP event or whatever. Because as far, like, I have no idea where that number comes from since, like
    
    **Patrick Hayes:** I said, it's not
    
    **Katherine Green:** in the middle of this.
    
    **Patrick Hayes:** Yeah, yeah. This is stuff that I want to get to the bottom. Ideally, we're able to look at these different rates and you can see based on, like. All right, of those who watched a minute, what was their conversion rate to the next step and
    
    **Katherine Green:** so on. Exactly, exactly. That would be the bigger piece of information because. Yeah, not being able to track this with the funnel performance or the checkout funnel performance makes it a little bit less useful, I guess. Okay. Anything else, or should I jump into one of these other tabs that I've got?
    
    **Christopher Ogle:** Yeah, if you could just make sure that. If you could go back on the recording of this and Patrick, if you need it, to put these requests into Patrick's form, the new form and ClickUp, just so that Patrick has that documented. Yes, I just use the recording for that, to figure out what those requests were and make things a bit easier. So that's just helpful for Patrick. So mindful. We've got five minutes. How much more information is there to go through in terms of these views? And do you think it will help me to answer the question of what is the next best logical step for. Let's say it's specifically ssts, because that is the VSL that I'm going to be working on the next three days. So do you think that, that the next few tabs will have that information in it or do you think we could glean the insights from what we're looking at here in this
    
    **Katherine Green:** view? I will. I could just very quickly. It's the same data. I just have the
    
    **Christopher Ogle:** colors done
    
    **Katherine Green:** differently so I can just like speak to what they are. So this, this is the progression rates from one step to the next step. So you can see and I wish I'd done this and just this green or whatever. But each of these is by, by line here. And so it's, it's whichever is the, the highest to lowest of the percentage of people who got to this step from the previous step, if that makes sense. And so then, so I have that. Where each of these lines, it shows you which ones. High, low. And then this is the same, the same exact data, but instead I have the scale going per column to show. So like which was the high. Yeah. Does that
    
    **Christopher Ogle:** make sense from which step to which step? I don't know what the 0 to 1, 1 to
    
    **Katherine Green:** 2 is. 0 to 1 is. So this needs to be here. Wait, no, it's not. It's an impression. So it's page land to play and then play to one minute and then one minute to four minute and then four minute to cta.
    
    **Christopher Ogle:** Oh, I see. Okay, that would, yeah, that would probably be helpful just to have that in that top manner. Okay. Full context. Just a small
    
    **Katherine Green:** thing,
    
    **Christopher Ogle:** but I didn't really know what 0 to 11 to 2 meant, but. Sorry. Yeah, okay, cool. No, that's all right. No worries. I know there's a lot of, there's a lot of stuff here. So
    
    **Katherine Green:** just. And so then I. Yeah, I'll go on and add that so that when you come back to this, you can know which one it is. Because this one said like even the tabs are kind of similar sounding. New data by step progress and the new data by funnel progress. So this is kind of the same idea, but instead of it being step over step, it's the amount of the rate of people from impressions, so it's their actual progress through the funnel going there. And so again, I have it done like by row showing where, where the people are Like, I don't know, you can get like, you know what I'm saying?
    
    **Christopher Ogle:** I do, yep. And a question that we, we talked about, the checkout pages, where did we land on getting the checkout page data in there for these particular funnels? Check out 1, checkout 2 to see where the breakdowns are.
    
    **Katherine Green:** That's where the problem comes in with not knowing which video is actually leading
    
    **Christopher Ogle:** to the checkout.
    
    **Katherine Green:** Because yeah, that's where. Because yeah, when it, when it goes into Checkout Champ, it doesn't, it doesn't push through that vitalytics embed information at all. It's just who ends up on the page.
    
    **Christopher Ogle:** Is it possible though for us to have the Checkout 1 and Checkout 2 data regardless of the video, to have a general high level overview of the checkout one to checkout two over the years?
    
    **Katherine Green:** Yes, I can do that. That's going to be a little bit like I'm going to have to sit here and do some like addition and stuff because the way that Checkout Champ displays it, it's URL. So I'll have to go through and separate like the open and closed VSL numbers from one another and then also put all the open, like if we had tests or whatever, I, but I can get that data for you.
    
    **Christopher Ogle:** I'll just need to. Okay,
    
    **Katherine Green:** yeah. Do some math with it, moving
    
    **Christopher Ogle:** things around. If, if you're able to get that data, I don't know what is feasible by sort of this time next week or towards the end of next week we can reconvene again and have another conversation and keep going. That would be great just because I'm trying to get a high level view of also the checkout 1 data and 2. And I know that would be helpful for Danielle as well for the CRO test side of things. But for now, in the last minute that we've got, can we answer the question and if not right now, then I would love if you could give me your best answer on this. That. Where. What do you see as the biggest difference between the vsl, the biggest needle moving opportunity in the VSL right now based on the data from its inception back in 2022 to where it is currently right now? Is it improving impressions? Is it getting more people to the button? Is it getting more people to click on the button? What, what is the biggest needle moving opportunity for SSTs right now based on this data?
    
    **Katherine Green:** So that's kind of difficult for me to speak to you because like, like you mentioned, like, well, you just hear the, the video title and know what's different, what's going on, the changes that have been made. So it's hard for me to like glean that, not, not having that context. So
    
    **Danielle Schwolow:** I think it's always play rate. If we can get more people to play it, more people interested. If that hook in the first minute catches them, then we're getting them right. So it's, it's almost like it's play rate and 1 minute are equally as important.
    
    **Christopher Ogle:** I'd say. Yeah. I just don't know if we. Without the checkout data, I don't know if this, if we can really make those conclusions or not.
    
    **Danielle Schwolow:** It's
    
    **Christopher Ogle:** too hard for me to make a conclusion that improving play rate means that that's going to be the biggest needed mover. Because if people are getting to check out one and check out two and less people are converting in 2025 than they are in 2022, then trying to increase more people down that, down that pipeline when they're not converting is just going to add unnecessary fuel to a fire that's burning out on the other end, if that makes sense. So it's. So when you say
    
    **Danielle Schwolow:** you mean CVR and actual completions,
    
    **Christopher Ogle:** I am talking about. Because that's where I need to figure out like I'm going to look and we can end this here. I'm going to continue working on the next PGVSL regardless. Because I strongly believe intuitively that that is what we need. We need more engagement, we need more people watching it. People who've seen our VSLs need to see a new VSL. We need to appeal to a younger audience, all that stuff. So I'm going to work on that regardless. But what I want to be able to figure out is, wow, our checkout1 and checkout2 data has dropped significantly in the last two or three years. Or you know what, our checkout1 and checkout2 Data is exactly the same pretty much the entire last three years. Which means that the clear indicator of the biggest opportunity is the vsl. Let's not even touch checkout one and checkout two because it's fantastic. We can tweak it, we can do tests, we can do all that sort of stuff, but the highest priority is vsl. That's just the answers that I need to have full clarity on and discuss that
    
    **Danielle Schwolow:** with Todd. So we can look that at that in funnel analytics. We don't even need some poll in Nick's panel. We can just do some period through the end of July because that's when we started international traffic. And look at checkout one and checkout two.
    
    **Christopher Ogle:** Okay, perfect. Well, then let's end. Let's end the call now because I know we're going to jump to your next call as well. Catherine, if you can work on those things, you can jump Danielle. Thank you. I'll see you over there.