# HTKT Pod-small groups

**Date:** 2025-06-03T17:30:00Z
**Duration:** 2888.896 seconds
**Organizer:** rebecca@performancegolfzone.com

**Attendees:**
- David Testawich (david@performancegolfzone.com)
- Brixton Albert (brixton@performancegolfzone.com)
- Assal Moradian (assal@performancegolfzone.com)
- TESTING Rebecca (rebecca@performancegolfzone.com)
- Faraaz Jamal (faraaz@performancegolfzone.com)
- Gabe Medeiros (gmedeiros@performancegolfzone.com)

---

## Transcript


**Speaker 0** `[00:00]`

They set them for the golf school, and they closed from the golf school. So that's technically considered a backend sale in Firaz's eyes, not a media buy sale. So I can do that, and that's why I said if there's a 30 day buffer, that's probably what gave them the. Okay. Like, the the push and the nudge to start looking into the golf school. But it's the same type of logic when we were thinking of the the checkout and the upsells a few months ago is there's just so many different areas that lead to the same place in our company that we just decided to do last click, or again, we say, if the if there's a media buy UTM and let's say they bought through an email 20 days later, we can still attribute it back to Mediabuy. I'm open to that. Okay.


**Speaker 1** `[00:53]`

Alright. Sounds good.


**Speaker 2** `[00:57]`

Cool. Moving on. So when I was building this Excel sheet to essentially centralize our data, I noticed that there was a lot of fields missing, and it seems what's happening is that there's fields getting overwritten in in both Zoho and Hubspot. So specifically, Gabe, what I brought up to you was when someone gets a refund and then the amounts goes away, the initial billing date goes away. So. I got connected with John this morning. I haven't met with him yet, but I'm just gonna try to understand what his process is there, if there's a reason for that. Based on my understanding, I don't think we want to erase any historical data in our CRM, especially if that's our source of truth, and then the way that I was thinking about things is, you know, if we're trying to get an accurate understanding of refunds in any given period and then going back to attribute those refunds to the proper time period, now we're not getting that view of those necessary data points. So I just I guess my main question here is is John the correct person? Is he in charge of our CRM? Do we have someone on our team that is establishing these processes and best practices?


**Speaker 0** `[02:18]`

It's so yeah. It's really John. John Cruz, Jackie Romo, and Kester. They are under Assal, and they fill out all the billing data for for the CRM, and that's what they've been doing for quite some time. I'm I'm pretty sure since the beginning.


**Speaker 2** `[02:38]`

Okay. John and what were the other two?


**Speaker 0** `[02:41]`

You can just put Jackie and Kester. I can just connect you with them. But John Cruz. I don't know. Correct me if I'm wrong with Saul, but he kinda seems to be more of, like, a team for them and like No.


**Speaker 3** `[02:51]`

He's he like, you don't wanna be talking to Jackie and Kester. You just need to talk to John, and he'll give you all the answers you're looking for. So he just said, like, the reason for it is because, like, closers are not really good at implement like, putting in information, and we just found a lot of errors in the past. So we just would prefer John and his team to be doing all of that. But he'll get you all the answers you're looking for. He's in yeah. He has it all.


**Speaker 2** `[03:15]`

Yeah. Okay. So I'll get those answers. I guess the only thing to note here is that when we are going back and pulling historical data, which I'm trying to piece together as much as possible I I know ads only started August, like, 10th of last year. So it's gonna be a bit difficult, and there's gonna be pieces missing, but I want to start as far back as I can, and that's just something to note is that the the numbers might be a bit off. My main question around this too, and maybe I need to ask Bill, but, David, I'm not sure if you know is. Bill so you said Bill's getting his his revenue data directly from Checkout Champ?


**Speaker 0** `[03:51]`

Yeah. Directly from payments and refunds and merchant fees. Like he gets all of that from Checkout Champ.


**Speaker 2** `[03:56]`

Okay. Got it. So technically we could probably piece this story together with the data points that we do have in Hubspot and in Checkout Champ.


**Speaker 0** `[04:07]`

Yeah. Another thing to note is we're not gonna be able to filter by any UTM data prior to really you guys coming on. There's some UTM data that we started tracking maybe a month before Gabe came on. Other than that, everything's only in Zoho attributed to source equals something like f b lead form v one or any of those other ones. So I have this doc, and I'll send it to you. This is all the historical data that I was manually putting in. I shared this with you at the very beginning. So this is about as close to historical data as you're gonna be able to get bar when I stopped doing it, which is around the time that you started putting in the data yourself.

Huh. But this will give us data just based on kind of form source of, like, the long form versus the short form, Segmenta versus the lead form that we've used. Other than that, there's just not enough UTM data for us to say which campaign, like, creates that lead or which ad or ad set or so on.


**Speaker 2** `[05:15]`

Okay. Sounds good. Moving on, I guess yeah. So we made a lot of progress on all of the CRM stuff today. I think most of these are answered. Okay. So my next main question, going back to revenue and profit calculations. I mean, I know there's been a lot of discussion on this, but I kinda just wanna level set because if I am building this report, of course, I wanna make sure these calculations are correct.

The main thing, I guess, is is automating the data. So first, I mean, I wanna understand these fees a little bit more because we are doing manual calculations right now, and as we've just uncovered, the manual reporting is not working when I do the exports every day because now we're going back and erasing data due to certain fields getting overwritten.


**Speaker 0** `[06:09]`

So we can stop overwriting those fields. That's fine. Like, that doesn't need to be an issue moving forward. We can get with John and just make sure that nothing's getting overwritten. So June, moving forward, we should be fine. Historical might be a little bit of an issue, but moving forward, we can make it a priority to make sure that's not an issue and base our decisions off of that assumption.


**Speaker 2** `[06:32]`

Okay. Got it, and then let's see. So in terms of automating these cost inputs, right, which is really going to help us. I mean, I can automate all of these other KPIs. But, ultimately, if what we're wanting to get is our our profit, we would need to automate these different variables. So the tickets sold, refunds, merchant fees, commissions, and coach payouts. So tickets sold, David, do you know if this is something that can be automated in Hubspot?


**Speaker 0** `[07:02]`

Yep. Yep. Per deal, and this is manual that John inputs, is there's a ticket sold field that we can do, and what we can we can also do the same thing of that you're doing is take an estimate based on our average ticket price that month and just divide, you know, our revenue by average ticket price, and then we can also do tickets sold field, and then that can be our data validation. So if there's, for any reason, a difference or John forgot to put two tickets sold instead of one, whatever, then like, we at least have data validation there as well.


**Speaker 2** `[07:41]`

Okay. When can we implement this?


**Speaker 0** `[07:44]`

I mean, that's already being done. We just have to create a report for it.


**Speaker 2** `[07:48]`

Got it, and so the name of the fields where the the number of tickets go is called tickets sold?


**Speaker 0** `[07:54]`

I wanna say it's number of tickets sold. I think it's like that in Hubspot on the deal level.


**Speaker 2** `[08:07]`

Okay. I'll take a look. Yeah, then so refunds. So the way that this is working, correct me if I'm wrong, is Hubspot is getting fed information from Checkout Champ for the financial side of things. Correct?


**Speaker 0** `[08:24]`

Hubspot or Domo? Sorry. I missed that. Oh, Hubspot.


**Speaker 2** `[08:27]`

So how is Hubspot getting the revenue date? Hubspot manual.


**Speaker 0** `[08:31]`

So we will put in like, John will manually say, this ticket was $5,500. We don't have the cash collected versus planned perfectly in, like, a a great spot. That might just need to be something we create.


**Speaker 2** `[08:46]`

Interesting, and so then when it comes to refunds, then what is the process? So going back into Hubspot and they're manually putting in this person refunded on this date for this amount?

They're.


**Speaker 0** `[09:06]`

They just say refunded is yes, and then they remove the amount and remove the initial billing date. They don't they don't really have a refunded date or anything. So that's what we can create.


**Speaker 2** `[09:16]`

I understand why that's happening now. Okay. So then so nothing is automated between Hubspot and Checkout Champ. That answers my question. Because, ultimately, if I'm using Hubspot as my, let's say, source of truth for this master sheet that will serve as the backend data source of a report, then Hubspot the the answer is no. We won't be able to automate any of these variable costs associated with the purchase because Hubspot's not getting that. Right? Yeah. So it would have to come check out champ, the the fees, the commissions.


**Speaker 0** `[09:51]`

Yeah, and we're no longer using checkout champ either. We're using fan bases, which lacks API capabilities. So, again, it's Oh, wow. Part of it's manual. I'm not gonna go into that. But another thing I just thought of is we're not calculating the number of refunded tickets in our profit calculation. So let's say 20 people refund from paid ads. We've counted our profit calculation that we've spent $2,200 times 20 tickets. But Can you just.


**Speaker 2** `[10:29]`

Go over.


**Speaker 0** `[10:31]`

So let's say we have 100 sales total. We're we're saying our coach payout is $2,200 times 100 tickets sold.


**Speaker 2** `[10:42]`

Right? But.


**Speaker 0** `[10:44]`

If 20 of those 100 people refund, we need to say we need to add back into that equation the the payouts that aren't happening anymore. So we're actually also double we're really calculating a huge hedge on these refunds because if the coach is no longer paid out, the revenue might not be there. But same with the revenue, the tickets are also aren't there, the coach payout.


**Speaker 2** `[11:20]`

Yeah. Yeah. So we're I mean, the this is what I thought. The calculations all around the the profit are kind of a mess, and so can I understand when did we switch from Checkout Champ to fan bases? Because I didn't know that that happens.


**Speaker 0** `[11:38]`

Like, middle of last month.


**Speaker 2** `[11:43]`

Middle last month, and so.


**Speaker 0** `[11:46]`

John and John and his team are still manually doing the exact same things that they were doing in Checkout Champ. So nothing has really changed in a Hubspot sense. They just no longer process the payments through Checkout Champ.

Okay.


**Speaker 2** `[12:05]`

And so let me ask you this. Checkout Champ is going away entirely. Like, will we are we gonna lose access to Checkout Champ in any given moment in the near future?


**Speaker 0** `[12:17]`

I don't think so. Probably not. Yeah. But we we still use it for a lot. It's just more of a processing fees or merchant fees. We have about a percent and a bit less with fan bases.


**Speaker 2** `[12:38]`

Makes sense. I was more so just curious because I assumed well, it was more just to make sure we had all the data that we needed from that before we lose access if we were. So at this point, it doesn't seem like there's any way for us to accurately automate the merchant fees or the commissions from Fandasis to Hubspot or to Domo.


**Speaker 0** `[13:08]`

Potentially in the future, this is a battle that I think Firaz is having right now. Okay. I'm. I'm not fully in the loop or fully understanding of where we're at with that. That can be something that we can ask and tag for us in in our pods chat.


**Speaker 2** `[13:27]`

Okay. Makes sense. So then in terms of what we can do right now because I'm just thinking about how I'm gonna build this report and make it functional.

To to accurately or at least as close as we can to calculate profit let me think about this. So we can do the number of tickets sold from this this field, the number of tickets sold. We could subtract.

Well, once amounts are not erased from each deal that has been refunded, theoretically, we can subtract. Like, we can do a filter of, let's say, refund is yes, and then minus amounts, and then we'll continue to manually do the calculations for merchant fees and commissions.

Right, and then do we wanna just go ahead and say that we'll do commissions calculated on the net revenue. It's a lot it's hard for me to think out loud, but I I think I understand, and then the coach payout, we would just wanna make sure that if the refund is yes, we add that back into our earnings calculation. Yes.


**Speaker 0** `[15:00]`

So revenue minus. Okay. So what I'm gonna do is I'm just gonna get John I think this is a short term solution until we get potentially back on Domo, and if we don't, we can do something a little bit more long term and have all cash collected be fully in. Hubspot and tracked in Hubspot. But short terms, I think revenue minus ad spends minus merchant fees minus refunds 10% minus net commissions.

Equals profit. Actually, wait.

And then what we'll do is we'll we can either add it into that same equation, or we can just say refunded.


**Speaker 2** `[16:11]`

Oh, wait. Yeah. So.


**Speaker 0** `[16:14]`

Net coach payout equals 2,200 times tickets sold minus 2,200 times refunded tickets, and then we can add net coach payout into that equation in the chat.


**Speaker 2** `[16:44]`

Okay. Let me copy this.


**Speaker 0** `[16:58]`

And then put net coach payout in that revenue equation on the top. I forgot to to do that.


**Speaker 2** `[17:06]`

Sorry. Where revenue am I talking with?

Okay. So I'll think of this a little bit more after our call, but I guess this answers some of my questions.

Right. So then theoretically, I don't know if you know the answer to this, but in in Domo, I mean, there's, like, different ad views. But in terms of the ad performance, I don't see like, does anyone know in Domo, is is revenue the only thing being reported? Because I didn't really see. I think in Frost's sandbox view, I saw profit, but it's unclear to me how that profit is being calculated, and here's my second question is, ultimately, every data point, like, it needs to have a reference point, and the purpose of me having these two separate views of our reporting is because each view uses a different reference point. So I'm unclear how they're viewing profit. Is it from, you know, like, leads generated in this amount of time period, or is it just profit in any given time period? These are questions that I'm I've been wondering. I don't know if you know.


**Speaker 0** `[18:30]`

I don't. My biggest guess would be activity view. So how much money did we spend today and how much money did we collect today? For us, from what I know, every time I've spoken to him, he's very cash in versus cash out versus any other type of view. So how much cash in did we get today, and how much did we spend today?


**Speaker 1** `[18:50]`

Yeah. But the the the profit on for our sandbox is for the entire high ticket program, not for cold traffic only.


**Speaker 2** `[19:01]`

Right. Makes sense. Okay. Let me see.

Alright. Well, I guess that's kind of what I was just talking about. So, ultimately, with reporting, I mean, what I'm trying to accomplish is many different reports. You know, we'll have a high level, overview, and and it really the way I'm building this report is meant to scale. So as we introduce new channels, you know, those will flow into our high level, and then each will kinda get their own breakdown. So we'll have this cohort based view or waterfall view, which is what we've already been tracking, but it'll it'll be a little bit more straightforward. So this will allow us to really understand our ad performance and the impacts that our changes have had on those lower funnel metrics.

So, I mean, not too different than what we're doing now. Same with the activity view. My concern around the activity view and actually, David, after you got off the call this morning, Margarita was bringing up the fact that, I don't know, she was a little bit worried with that activity view because she asked me, how are you calculating profit, and I mentioned, well, it's it's the revenue minus these fee or cost and then the ad spend, and she pointed out, well, the ad spend doesn't impact, you know, the performance of that day, and she's right, and that's why I was a little bit worried about the activity view, because it doesn't make total sense unless we're really only only using it to judge, like, day to day kind of what's our our benchmark, and then is it covering these other costs associated with running the program? So I assume that that is what we're using it as, but I don't think it's an accurate way to to.


**Speaker 0** `[20:53]`

Ads. I yes, and I I agree. I the activity view is set up more again just to make sure that we're making back what we're spending. That's Okay. Yeah. Like, every time that Brixton would message Hanan and I when we part of this is he would say, hey. Like, we've spent this much and we've only made this much. Like, we need to get above that the actual ad performance per campaign and having that granular view, I I think, was less of a priority and more of a now that we have the ability to do that, we'll be great to scale.


**Speaker 2** `[21:27]`

Okay. Cool. Makes sense. So then yeah, we'll work towards building these different dashboards out, and then I mean, we've pretty much already covered these. Right? So Hubspot is getting worked on, and then once we kind of nail down these gaps, then our report will will work. So for now, I mean, I'm still building the backend of the report, but it will just take a little bit of time for the API to get the, you know, accurate data and fields pulled through, and then for Domo, I mean so I I had emailed Bill back, I think, yesterday, and I'm not sure if I've had a response. But I guess I just would like some clarification, Gabe, maybe if do you know you know, is the end goal here for us to build out Domo so that it is functioning properly for high ticket? Because I assume that is the goal. Right?


**Speaker 1** `[22:22]`

Yeah. It won't have all the metrics that are important to you guys. That's why I think it's gonna be a combination of Domo and and super metrics. But Domo should have ad spend, revenue, and profit for core traffic.


**Speaker 2** `[22:40]`

Oh, yeah. That's the goal.


**Speaker 1** `[22:42]`

I don't know when we're gonna get to it. Okay.


**Speaker 2** `[22:44]`

Yeah. No worries. I just wanted to kind of understand if if if we were still trying to work towards that or if it was gonna end up getting abandoned or what. But. Okay. The goal.


**Speaker 1** `[22:59]`

It's just the bandwidth and and a lot of stuff getting prioritized. K.


**Speaker 0** `[23:05]`

Asul, are you still here, by the way? I'm here. Are you cool if we move our one on one? Bill said that he can meet with me today to start getting the the boot or the the mall Hubspot. So. I'll move it. Okay. I'll message him. More priority.


**Speaker 3** `[23:20]`

So. I thought that we could just maybe, like, on these calls, just at the tail end of it, maybe just look at the the numbers for ads for the like, this I guess, for this week or this week so far just so we can, like, really just make sure we're monitoring the pro like, we're obviously off to a really good start what it looks like, but I'm not sure what it looks like for just ads. So maybe we can pull that up, have a look, and see where we can improve.


**Speaker 2** `[23:47]`

Yeah. That sounds good. So. I guess, the problem with these manual reports that I'm pulling, one second, is that so this well, we discovered a few problems. For one, this export that's in this current report is being pulled from Zoho, and the main reason for this was just because, I I couldn't figure out the proper fields to pull through to get an accurate view of my ticket. So we've uncovered a little bit of that this morning with Margarita. But just keep in mind, this is from Zoho, and Zoho, I don't know when it quit doing this, but it quit reporting on the day previous. So the last 7 days, you know, isn't totally accurate. But I did try to go through Hubspot and manually add in some of these fields like revenue and tickets sold.

So I guess we can start with the waterfall view and look at some of these lower funnel metrics. Just as an FYI, I can delete this because I did this yesterday morning. But I did increase spend yesterday, and we should be at 10 k per day now. So just as an FYI. In terms of our CPL, I was monitoring it when I increased ad spend. I don't even know what day it is. I guess it was last maybe Thursday or Friday. I tried to get us, as you can see what's this? The first. Nonetheless, I started increasing a bit last week and moving the budget around, and I was monitoring our CPL. It looks like our CPL is staying low, which is good, and I'm gonna go to this view.

We even have some campaigns that have CPLs as low as $11.11 bucks. Now one thing that I want to note on this is that this probably will increase a tad, especially as the frequency increases because this is coming from our middle of funnel campaign, and the audience buckets are still quite small there. But as we increase budget in the top funnel and users flow in, hopefully, it does, in fact, stay low. Because our cost per booking here is also the lowest that we've seen. This is.


**Speaker 3** `[26:15]`

Sorry to interrupt. This is May. Right? You're looking at May's numbers?


**Speaker 2** `[26:19]`

Yeah, and I just need to change this to the 31st Okay.


**Speaker 3** `[26:22]`

I just wanna, are we also able to look at the June number so far? Do you have that?


**Speaker 2** `[26:31]`

No. I I June one, and then I I started doing this yesterday morning, but, obviously, the day wasn't complete yet. So.


**Speaker 3** `[26:40]`

No worries. When you have the numbers in, or maybe this this is something that we do, like, you know, may maybe we move this meeting to, like, maybe the tail end of the weeks. Because, like, I think what would be nice is for us to kinda look at, like, what this week looks like, where we can improve, and like, have a head start for next week. So maybe we do this meeting on Thursdays or Fridays rather than Tuesdays, and that way, we can really have a look at how we're doing this. Because I really think, like, a weekly goal and like, a weekly target to help us get ready for the following week is kind of what we should be focusing on.


**Speaker 2** `[27:14]`

Like, Tuesday mornings has been a little bit difficult for me to just pull all the data through and yeah, kind of.


**Speaker 3** `[27:21]`

Like, maybe it's, like, a Friday morning or like, a Thursday afternoon type of thing where we can just get together quickly and look at what the weeks look like so far and have a good plan. Because, like, if we don't have the numb like, right now, we're looking at May data, but we've also changed a lot, and I feel like we're in the first month, and I would love to know what the numbers are trending towards right now and like, whether it's, you know, David's team that needs to level up or maybe it's my close rate. But if I don't have the information, then I can monitor it. So I guess another thing is, like, how often do you fill this out? Because we're already two days behind on the sheet. Are you doing it, like, at the end of, like, each morning, or are you doing it every couple of days? What who's filling this out here?


**Speaker 2** `[27:58]`

I mean, I try to do it every day. So I did it yesterday, which would put the last day of data the first, and so this morning, obviously, would show us yesterday's data. I I just haven't had a chance to do it today. No worries. So I think I do agree with you. I I don't know what your guys' schedules are. I mean, I'm pretty open Thursday or Friday if anyone has a preference or time. But, yes, I'm on the same page as you for sure.


**Speaker 0** `[28:30]`

I'd say let's do a Thursday. It's typically. I'd say more efficient, especially if there's, like, a holiday or someone's taking a long weekend. Okay.


**Speaker 2** `[28:40]`

Is there any time that you guys aren't available? We take a look.


**Speaker 3** `[28:46]`

First we talking about Thursdays? Yep. Yeah. So I think a good time on Thursdays. How do you guys feel about, you know, either 03:00 or 04:00, or is that too late?


**Speaker 2** `[28:59]`

What's what time zone? Sorry. Eastern.


**Speaker 3** `[29:01]`

Are you on Eastern time zone, Rebecca?


**Speaker 2** `[29:04]`

I'm in Central.


**Speaker 3** `[29:05]`

Oh, okay. We're on I'm on Pacific, so we're all all over the place here. Yeah. Like, I think maybe we could do 12:00 or 01:00 Pacific time, whatever time that is for you guys. I think it's maybe two or 03:00. I'm open. Like, whatever works better for you guys.


**Speaker 2** `[29:24]`

Okay. I'm just gonna mark a placeholder right now, and then I'll fill it out later. But Yeah. My Thursday.


**Speaker 3** `[29:29]`

So it shouldn't have I shouldn't have an issue. Okay. Perfect.


**Speaker 2** `[29:33]`

Yeah. That sounds like a good plan because I agree with you. I mean, right now, it's a little bit difficult, and of course, hopefully, once the automatic reporting is done, we'll be able to, you know, pull that up and look at our current rates and everything. But as of now, you know, the first is the last day of data that I have, and I believe if I'm pretty sure I pulled this from Hubspot. So it looks like we only had one ticket sold on the first, which was. A Sunday.


**Speaker 3** `[30:03]`

Yep.


**Speaker 2** `[30:04]`

Huh. Mondays are generally not great. Makes sense. Let me.


**Speaker 3** `[30:11]`

What were our numbers yesterday, David? I mean, just quickly, like, I don't need everything, but just what was our revenue collected for ads yesterday? Because it was such a big day, and how many tickets did we sell?


**Speaker 0** `[30:20]`

Yeah. I had a dashboard set up for this. For some reason, none of the numbers are showing me anything. So let me find the other.


**Speaker 3** `[30:27]`

Because I think we had okay. One, two, 3, 4, 5, 6. I think we had 7 ad sales yesterday. I was counting what the what the closers have put here in. The.


**Speaker 0** `[30:47]`

Closers are really wrong. Don't even look at Slack. I go through them all the time and like, I don't know where they're getting this ad sale half the time.


**Speaker 3** `[30:56]`

So they're going off of they're going off of what the booking says on their calendar. So, like, if it says, Guelph Camp, they're that they.


**Speaker 0** `[31:04]`

I don't know if they have the wrong, like, the wrong thing. It might have been.


**Speaker 3** `[31:08]`

The booking the wrong booking link, I guess, or something. Like, for example, Don Price, yesterday, JV, is that not ads? Looks like ads.


**Speaker 0** `[31:16]`

I think it is. The no. The reason I say that is, like, we create so many booking links. I think sometimes they just, like, think that something is ads and it isn't. I don't know. But what they can do is they can go into any deal, and let me find one here. All deals, pipeline. We've already sold two.


**Speaker 2** `[31:33]`

No. Okay. Actually, I'm gonna share my screen.


**Speaker 0** `[31:39]`

I do believe that.


**Speaker 3** `[31:41]`

Here. Can I share my screen real quick?


**Speaker 0** `[31:44]`

Just Sure. I guess. Yeah. I'm just gonna show just for you to know, Esal, the best way that I would tell the the closers to do this is, like, going into the like, in here under the Hubspot, you'll be able to see if it's like a survey campaign is is typically h t k t, Facebook.


**Speaker 3** `[32:05]`

Yeah. I mean sure.


**Speaker 0** `[32:07]`

I can do that.


**Speaker 3** `[32:08]`

Yeah. I can tell them to do that, but, like.


**Speaker 0** `[32:10]`

But this is where I get all my data from. So what they put in the chat, I don't really use it as, like, an end all be all. I'll double check just to make sure sometimes. But, realistically, I've set up all my reporting to show.


**Speaker 3** `[32:25]`

It's showing 7. So, I mean, that's a really good day. So I just wanna make sure, and this is why.


**Speaker 2** `[32:35]`

Yeah. But one of them was day. So.


**Speaker 0** `[32:38]`

I don't know why this isn't.


**Speaker 2** `[32:40]`

I thought it's 8. What. I'm noticing, I so I'm in my, like, as reporting view, and I filtered by initial billing date, like, most recent, and so day, for instance, the third line, it shows that someone got billed today, but there's no amount.


**Speaker 0** `[33:01]`

So the second line.


**Speaker 3** `[33:03]`

What is a source forms? What is that?


**Speaker 0** `[33:09]`

Can you give me the example of that?


**Speaker 3** `[33:11]`

Yeah. Here. Because this is something that on the calendar, they're using a cold traffic link, but it's it says record forms. No idea what the hell that is. Let me see here. Okay. I just put the link in here for UK.

In.


**Speaker 0** `[33:35]`

Where?


**Speaker 3** `[33:36]`

Right here. See, it says forms. What is that?


**Speaker 0** `[33:39]`

I wouldn't worry about that. I would come down here. This is where data is. That is that.


**Speaker 3** `[33:44]`

Is is Cooltraffic. Right?


**Speaker 0** `[33:46]`

Yeah. So forms, just so you know, every time there's a booking, it automatically fills out a Hubspot form, and the Hubspot form is what inputs all the data in here. So that's what you're seeing. But you can see here that the most recent opt in funnel is, you know, long form, sources, long form b 3, which is an ad. Medium is paid. Sources, Facebook. All of these, we can just see that it's Facebook ad.


**Speaker 3** `[34:15]`

Actually, there's more. It looks like 8 yesterday because Rucha or 9 if you count it because it's two for one. Because Rucha have.


**Speaker 0** `[34:22]`

I have right here count of 8 deals here yesterday, and then I can take a look in here and see. Steve Yoder, Steven Fire, and Oh.


**Speaker 3** `[34:30]`

Another thing sorry to interrupt. Another thing is, for example, Rucha's deal, Steve Johnson, that does that count as, like, one deal or two deals? Because. I think that only counts as one deal in Hubspot. But it's two. Right? Because, technically, it's two even though that one didn't come through ads, I guess. I don't know. I have to.


**Speaker 0** `[34:51]`

What am I doing here? There is a I'll I'll add another field in here, and I can share this with you guys as a report, but I'll have count of deals, sum of company currency, like amount, and then I'll add count of number of tickets sold. So, yep, here we can see that there is one, two, 3, 4, 5, 6, 7, 8, 9 tickets sold, but only 8 deals.


**Speaker 3** `[35:14]`

Oh, okay. But so at least if we know how many tickets were sold, but the total revenue will also say.

It will like, what I'm saying is would you count Rucha's deal as one ad lead sold or two?


**Speaker 0** `[35:31]`

If it's two tickets, then it's two sales. That's how we want to count it. It is two tickets.


**Speaker 3** `[35:36]`

But what I'm trying to tell you is I think your data is only because then it should be 9 tickets yesterday.


**Speaker 0** `[35:41]`

That's what I'm saying is I need to add the number of tickets in here. I have to define some properties and get that in here. So if I say number of tickets sold so I'll have to get that in here. How many tickets? Oh, there we go. That's what it's called. So how many tickets, and then I can add the property in here and say how many tickets sold, and we have 9 tickets sold.


**Speaker 3** `[36:10]`

Okay. I think we have more than that. I think we had 10 because I just found another one. So.


**Speaker 0** `[36:15]`

These are the only deals. Like, I can look through all of them. Here are all of the deals. Here's how many tickets sold. So if there's one that's missing. Yeah. What I noticed and this is with the initial billing date of the second. So if you check the initial billing date, make sure it doesn't say the first or the third. But it first or the third.


**Speaker 3** `[36:33]`

Oh, because, like, for example, if the most recent opt in date are you talking about that date? Because that's in May.


**Speaker 0** `[36:40]`

No. Talking about initial billing date. That's what I have it grouped by here. Initial billing date equals the June two. Okay.


**Speaker 3** `[36:46]`

Hold on. Let me check that because sometimes okay. Hold on a minute here. Where are you looking at that again?


**Speaker 0** `[36:54]`

If you go way down to the bottom here in the billing info on the left, it goes to the initial billing date.


**Speaker 3** `[37:06]`

You know what's weird is I don't even see that. Like, what am I oh, I'm on contact level. Okay. That makes sense. Yeah. Okay. So let me just look at this really quick. The initial billing date is June one. So why is it June one is the question?


**Speaker 0** `[37:22]`

Did they get sold on June one? That's what that's what John puts in manually. That's like, him, Kester, Jackie, they are the ones who update this field every time. So Kester put it in for this lead, for John Dunn. We have. Jackie put it in. So that's their job is they're putting in the initial billing date in here every time.


**Speaker 3** `[37:43]`

I believe that sometimes it's an open ticket. So the initial billing date would have been the first, but then it should really be on the date that they complete the purchase now or the enrollment date.


**Speaker 0** `[37:57]`

That's what they should be doing. That's what my standing was when I talked to John last. Okay.


**Speaker 3** `[38:01]`

We'll have to reassign with John because, yeah, the initial billing date actually was June two. That's the date that let me see here. Yeah. Like, he put this in. Jordan put this in billing yesterday, so I'm confused why the initial billing date is the first. Initial billing date actually is the first second. Which lead is it?


**Speaker 0** `[38:23]`

What's his name?


**Speaker 3** `[38:25]`

Donald Mcclack. Okay. This is this is actually correct, I think. This is fine. This is fine. But let's just double check with John if for the open ticket thing. K. Because I believe that the way that they do it is the initial billing date is the date that we receive the first payment, but it should really be the date that the sale is completed because that is the day that the deal goes through. Okay. Yeah. Just so that it's a lot you know, it's aligned. Okay. So I'll make sure the I mean, not that it really matters. I'll make sure the closers are are inputting the right information, and then if you could just get that final number did you say your final number for yesterday is 8, or did you say oh, you said it's 9. Right? It's 9.


**Speaker 0** `[39:06]`

Yep. 9 for yesterday.


**Speaker 3** `[39:08]`

That's a pretty solid day. So I would actually do, like, a small post, Rebecca, maybe, to just, like, keep up on the loop that we had 9 out of one, two, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12. We had 14 sales yesterday, and 9 of them were ads. That's an important that's an important thing to post so that everybody can see progress. Oh.


**Speaker 2** `[39:31]`

Go ahead.


**Speaker 3** `[39:33]`

I think we're actually, by the way, at 10 if you count Rucha's because it's two for one. But.


**Speaker 0** `[39:37]`

I'll I'll That that was counting the two for one. It was 8 total sales, one two for one, so 9 total.


**Speaker 3** `[39:45]`

Might ask.


**Speaker 2** `[39:46]`

So if we are in this view and I filtered by initial billing dates. So here we can see that there's 4 today from ads. Another already good start because two of these are 10. Why is this amount missing? Is there a reason for that?


**Speaker 0** `[40:01]`

That could have been can you scroll over to the names where the the name of the leads are? John Huber. Sometimes That is.


**Speaker 3** `[40:14]`

Yeah. I mean, that one went through.


**Speaker 0** `[40:16]`

Yeah. So sometimes they will do it at end of day. They'll go back through John, Kester, and Jackie, and they'll add in all of that info. So I I wouldn't look, like, a today date. I'll look at it tomorrow. Yesterday is typically gonna be accurate.


**Speaker 2** `[40:31]`

That makes sense. I I forgot that it wasn't automated. Okay. Okay. So well, I mean, anyways, it looks good yesterday and today so far. So it's good.


**Speaker 0** `[40:45]`

Yep. Alright. Well Another here on the ad spend is for this week, I'm gonna let you know how the ads the the volume is. 10 k might be a little bit much for what my setters can handle and what we can handle from a grading perspective to put for closers, and I wanna make sure that we keep lead efficiency high, and we're not wasting so we might have Is.


**Speaker 2** `[41:14]`

The lead scoring, like, helping that process? Or.


**Speaker 3** `[41:17]`

Yeah. That's the question I had actually. How many of the leads that were posted yesterday and today actually didn't even get touched by a setter? That would be great to know.


**Speaker 0** `[41:27]`

All all of them work so far. So I have a dashboard for this. I will next time that we meet, I'll get let you guys know, and I'll give you guys a quick summary of it. But, yeah, my goal is to get as many off of the setter's plate as possible, but that's that's not always gonna be the case, and if we're getting 400 some leads a day, I also Brixton is having me move another 3, 4, 5 setters to just calling members and not even doing paid ads. Yeah. So what I'm saying is, like like.


**Speaker 3** `[42:02]`

Okay. I do see a few orange labels here on the calendar. So but today, we have leads on the calendar that are from ads that haven't been touched that have been graded a 4. Is that correct?


**Speaker 0** `[42:14]`

Yeah. We should.


**Speaker 3** `[42:15]`

Yeah. We have 3, it looks like, today. So I'm just saying let's monitor that closely. Yeah. I think that that we'll see how it performs, but I do think that's such a good direction to move towards.


**Speaker 0** `[42:27]`

Yep. So.


**Speaker 3** `[42:29]`

From the 10 k that that you're saying, is that is that what you're saying you wanna change spend to, or what is the 10 about? Sorry. I wasn't.


**Speaker 2** `[42:37]`

I changed I changed spent to 10 k yesterday, and I'm gonna monitor it. So yesterday, it looks like we did a total of 347 leads and spent. Let me just add this up quickly. I don't think it was quite 10 k. So, like, 3,000 in this account, and so we were, like, 8,000. It's, like, 8,060 yesterday, and we got.


**Speaker 3** `[43:09]`

Yeah. So I'm just curious, like because I've got a lot of closers here, a lot of calendars to fill. So if we're going towards the grading process, why don't we just open the floodgates and let it all pull or pour through and go from there?


**Speaker 0** `[43:21]`

I can do that. Like, we could do all of the 4 grades, and we could do let me let me show some of the numbers here. Yeah. Because I I haven't had a chance today to actually go through them, but.


**Speaker 2** `[43:33]`

I have dashboards in here for the different.


**Speaker 0** `[43:37]`

Forms. So if we go the long form route, I can see date range being, let's just say.

This month so far. Apply.

Let me do the other one. I don't think this one's set up fully. Reading.

So for the instant form, I have is Margarita moving these? What are my filters here? This month, this month, this month, this month. Okay. Margarita isn't playing around with this. So let me I'll get you the forms. Let me connect with Margarita because I know she's because.


**Speaker 3** `[44:23]`

You know, obviously, right now, this month is, like, so critical for us to be able to prove that this thing works, and so we just can't have any bottlenecks, and so I think, like, I'm like, my closers all want, like, these appointments. I feel like if, like, we're gonna open the floodgates, let's just open it, and let's just, like, be a little more lenient on the grading, like, get the leads and at least let's test it for a week and see how it goes, and if it's bad, then we can Yeah. Let's just do that.


**Speaker 0** `[44:48]`

Yeah. I agree. So what I'll do is I'll let you know the amount of numbers of how many leads do we get that are graded at 4 and out of those, how many booked that were graded a 4, how many goes ended up actually showing for a closer, how many closed, and we can actually report on Okay.


**Speaker 3** `[45:04]`

That sounds good. We can do that. That's no problem. But, yeah, I've got, like, 10 closers here. So, like, we're ready to go. K. Cool. Yeah. Half inch.


**Speaker 2** `[45:12]`

That just came to mind. So our instant form campaign, our cost per booking has gone up a bit, which means people just aren't booking. But our cost per lead is still very low. It's $20. So my question here is, ideally, what we would be doing is we would be targeting these leads who have not booked. The only way to really do this dynamically is automate a list because it's happening every day. Right? Like, the the list is changing. So going back to automating our custom audience list, no one has an answer, which is fine. But I tried to go into Hubspot, David, and in the ad section, I connected Facebook. The problem is that our plan for Hubspot, I don't know what plan that is, it doesn't include that portion of the platform, and that's the only way we would be able to automate this to my knowledge because Domo was just the solution. That doesn't seem accurate. What do you think?


**Speaker 0** `[46:11]`

I think this is a v two thing, so we'll have to create a business case for it. I think we have to prove that we can get to 10 k a day. Yeah to keep it to begin with, and then we can start asking about spending more money for a better plan on Hubspot. That's that's my issue. I just wanna keep asking and asking and asking when, like, we're kind of under the gun to at least just get results.


**Speaker 2** `[46:32]`

No. You're right. It's the only reason why I was asking is because that could be impactful. Because if you think about it, yesterday alone, we we generated a 34 leads from the Instant Form campaign. Each lead cost us $20. So let's say if the booking rate was 13%. I mean, I can **** at math, so don't make me do it. But let's say that's 10 bookings. So that's a 20 other leads just in one day that didn't book, and if we were to retarget those people, I mean, think about because our retargeting campaigns right now, I have two going, that's where that $50 booking cost is coming from. So if we get a $50 booking cost just from retargeting those leads, I think it could help our numbers this month improve our case. But I just don't know how to do that with manual list. It would be me doing that every day.


**Speaker 0** `[47:22]`

Yeah. I don't know if that's the answer. We are working on getting those automation set up internally for email and SMS follow up automated, but it obviously wouldn't be on on Facebook. But that's another lever that we can pull, I think, at a later date. I just think for now, focusing on optimizing what we we can control and then Yeah. Think how to control something new moving forward.


**Speaker 2** `[47:43]`

Sounds good. Cool. Okay. Cool. Well, seems like things are making progress. Yes.


**Speaker 0** `[47:53]`

I'm just about to jump on with Bill. So I'll Okay. We have some answers from you guys and some k. Sounds good. Yeah. Appreciate it. See.


**Speaker 3** `[48:02]`

You guys on Thursday. Thanks, everyone. Cheers. Bye.


---

## Metadata

- **Meeting UUID:** `c8cc8755-ede4-4450-8566-c323b3860a54`
- **Transcription UUID:** `0f700d13-dbe2-4ce2-b7b0-1b839ab0470f`
- **Recording UUID:** `d66b20a1-83c0-4748-8fc4-0eed08e261fd`
- **Processing Status:** notes_available
- **Avoma URL:** https://app.avoma.com/meetings/c8cc8755-ede4-4450-8566-c323b3860a54