# Performance Golf <> TMG Weekly Check In

**Date:** 2025-08-14T18:00:00Z
**Duration:** 1913.857854 seconds
**Organizer:** margarita@themoderategenius.com

**Attendees:**
- David Testawich (david@performancegolfzone.com)
- test (margarita@themoderategenius.com)
- Assal Moradian (assal@performancegolfzone.com)
- John Cruz (john@performancegolfzone.com)
- Jared Harris (jared@performancegolfzone.com)

---

## Transcript


**Speaker 0** `[00:40]`

Hey.


**Speaker 1** `[00:41]`

Hi. Welcome.


**Speaker 0** `[00:45]`

Thank you. How's your week been? I know it's been hectic for for everything.


**Speaker 1** `[00:50]`

It's been crazy. Like, we've been checking tickets, things, data. It's been crazy, but it's good. We have a process for that now. We know what the mistakes are, what is happening, when it's happening. So we we were able to prevent some of those with automations, So we track everything, see how that will react. I already reached out to Kelsey, I believe it was the name Yep to have a weekly checking in so that we're not missing anything. Yeah, and let's hope that that will work. I really want to work because the data you see there is just, like, real things that happen here and there, and that actually, like you know?


**Speaker 0** `[01:38]`

Yeah, and I'm gonna. I don't know. I feel like there just has to be a better way to integrate something somewhere, whether we need to, like, build something on our own and have our dev team looking. I don't know. Like, I just feel like there's a better way to do this than have all this manual error and manual entry and worry about us not having enough people on John Cruz's team to, like, handle the amount of billing that we have. Like, there's just so many things that are going on that I. I really wish. Like, that's a goal for me over the winter is, like, find a way to get all of this to a point where we just remove as many people from the process as possible.


**Speaker 1** `[02:17]`

Yeah. I mean, at this at this point, like, as the next step in here practically will be to kinda connect the payments to a contact and to a deal and to all of that that we talked about. There still will be there still need to be some kind of manual work because, you know, when you're going to supermarket, there is a person that is counting how many products you have bought or is scanning them. So there needs to be some things that will do that, someone that will do that. But. I agree that maybe with the payment can be connected to a contact or to a deal and how connect all that so that they can check and not write the data, but they will still need to put the labels on the schools because we recheck the the data with the team, and yes, there were suggestions that we need to kinda find a way to pull the data for the payments.

But everything else be based on the process that you guys have, we need to connect the school to the deal, and then those are the tickets that are coming from from another department that they need to see a specific ticket view. So, yeah, it's a little bit a complicated process, I guess. But when I was, like, rechecking the data and I pulled back, I was like, oh, okay. That's why in the Voom, I was like, this is what this is doing. This is what this is doing, and this is for this department because I was doing that to get myself a clarity as well so I can see clearly the whole function. I was like, oh, okay.

So practically, the tickets are just for Juan and the team so that they can actually see the data from their perspective, and the deals are actually just for the sales team and the billing team. So now the billing team, I think, is suffering the most, and we will need to find a way for them now.


**Speaker 0** `[04:11]`

Yep. A 100%.


**Speaker 1** `[04:12]`

Yep. Okay. Cool. We will get there.


**Speaker 0** `[04:16]`

Awesome. Yeah. I appreciate all the hard work and the urgency. I know III just like, it's tough when I'm in the middle of my day and I have all those things going on, and then I'm getting hit from Firaz and Juan Carlos and Kelsey, and then Asal is hitting me up about data, and it's like, oh gosh. Like, I need more of me to help differentiate these things and prioritize.


**Speaker 1** `[04:39]`

Yeah. I I understand that, and especially because your your guys' team is a huge team, and every department has its own needs. I know it's sometimes difficult to prioritize some of those things. But, yeah, we're trying our best to handle everything that you'll push through to us. Some things are, like, getting more time that's expected just because of how we're labeling thing, how we need to label, start relabeling and rechecking. So some of those things, but I think we are polishing and we are getting there.


**Speaker 0** `[05:13]`

Yeah. 100%. I guess this brings me to the next topic and really what I'm I'm also working on. So I know I mentioned this a little bit ago is we are. I wanna see if I can find the document here. So we are creating our own data lake, and then what we're trying to do is pass all of that data through to different systems. So we're taking Alloware transcriptions, Ovoma transcriptions, and trying to take the most recent, the most accurate data around the important fields that we need to and pass them through to different systems. So and then same thing with form submissions. So if someone submits a form that leads to an answer that goes into Checkout Champ, all of that just kinda leads back into one main system, and then that main system will kind of distribute any data wherever it needs to from there.

So, for example, if one of our phone team reps from Denver's team has a call with someone and they say, hey. My goal is I wanna shoot 85. I currently shoot 95. My biggest miss is my slice with my driver. Those would get input into fields based on the transcription. They would populate in Checkout Champ, and they would populate in Hubspot for that contact.

As, like, a as a field that really doesn't get edited in the data lake anyway. So that's something that they're working on right now. But what we're also trying to do is take data from Hubspot, the form submissions, the notes that we have, and pass that all back into the same data lake. The issue that we have is we have 5 different fields for are you willing to invest, 4 different fields for are you willing to travel, 1,000,000 different fields of what is your biggest miss and what are you struggling with and so on that it's very hard for us to then give that data to Jeff because then he has to hook in a 150 different fields.

So what I wanna do is get really, what are the most important fields? Write down what are all the questions. This is something I'll do. But, like, if if I say what is someone's biggest miss or biggest problem, I basically just create a field that's called biggest problem, and we figure out which fields would lead to that, and then moving forward, all of our form submissions like, maybe we delete or hide all of the other answers that we have. Because, really, it seems like we just base the answers off of the actual question. So if we add a new question into a form, we just copy and paste that question, make it a field in the contact and in the deal, and just add the the answers there. Whereas, ideally, we'd have a field. So if someone says, are you open to invest? We just have a category that says open to invest, and anything that has to do with investing just goes into that field.


**Speaker 1** `[08:21]`

Yeah. I mean, we can consolidate all of those into one. I think we had multiple because there was, like, multiple.


**Speaker 0** `[08:29]`

In Zoho, there was a lot too.


**Speaker 1** `[08:31]`

Yeah. Yeah. Maybe and we and we exported those and we imported those. But, yeah, we can we can definitely have only one and push everything into one, and we can do that moving forward for sure, and also, like, if we we can do, like we can create a new field, as you mentioned, that will be, like, a new field that will represent the data that you want to push to the the data link that you're creating the database, and then everything that is that filled with that other questions, we can have an automation that will push the data into that field so that we can have the past data and moving forward the new data. Yep. Yeah. We can do that. So just send me what the the questions that you need, and we can create that.


**Speaker 0** `[09:21]`

Okay. Cool. Yeah. So that's that's number one. Number two is. I need us to create, like, an onboarding checklist for, like, the tech side because I I asked, like, a week or two ago. I was like, hey. Like, I have a few closures we need to onboard. Is there anything from a tech perspective that needs to be done, and then I think Robert was like, no. All you have to do is just, like, add them as a user. So I added them as a user, and then when they started getting bookings in Onesub, they weren't getting.


**Speaker 1** `[09:50]`

The SMS.


**Speaker 0** `[09:51]`

Firing and stuff like that. So I think just having that checklist so we can just have a an onboarding checklist so that getting missed. Because those I'm the other issue that I'm running into is I I have to do a lot of things reactively, and that takes up a lot of my time and your guys' time. Yeah. When we can have things done a little bit more proactively.


**Speaker 1** `[10:15]`

Yeah. I agree. We will send you an SOP on that. What needs to happen for closure, what needs to happen for setters so we can have but not just Hubspot, I guess. One's hub. Right, or no. One's hub is handled.


**Speaker 0** `[10:28]`

Well, we can like, I add someone or we can add someone into Oneshop, like, whatever it is, whoever it is. But it's just whenever we have a new closure, we just need to know, like, what are what are the things that you guys need to connect from a tech perspective, whether it's through a workflow, a Zap, or whatever, that might involve this person. Because I think that like, there's some custom code that's going in, and Robert has to put in the email into the custom code. So at least having that stuff that we know has to happen would be awesome.


**Speaker 1** `[11:02]`

Okay. Cool. Yeah. We can definitely do that. I can definitely give you SOPs and then how to create it. I guess it's it was kinda missed from our side as well that we need to put them in there to get the booking. SMS. But, yeah, with SOP, it won't be missed. Okay. Cool. We can do that for sure.


**Speaker 0** `[11:27]`

Yeah. I think those are, like, the biggest things that I wanna talk about. I feel like I had more, but. I have to get the ideas laid out a little bit better before I I bring those up, I think, just based on priority. Do you have anything that you wanna ask around the reporting for us all?


**Speaker 1** `[11:48]`

No. From what I'm seeing in here, we have most of these metrics. So, practically, overall t metrics, front end bookings, you said. So how many front end bookings? They were, like, just numbers. Showing just numbers, then closers metrics total. So all these show shows closed revenue, that to show up per closer, and then we have per source breakdown, practically what we have currently. Booking shows closed oh, show plus show rate closed, but okay. There is something more, but that's fine, and then the trickiest part into this is just going to be this repeat school rate. I will need to set up a system to track the lead and not a lead, and then make sure that we have a data that says, okay. I mean, we have the data. I need to make sure a specific field is created that will say how many tickets were closed. Let me see how that was. I don't think I understood it. Let me re reread it.

The repeat ones.

Over the last, how many regular sales were there versus how many alumni second tickets? Okay. Cool. So regular, when you say versus, should I divide that, or should just present as as numbers?


**Speaker 0** `[13:19]`

No. I want a percentage. So we wanna go to see it'll ultimately be the the smaller number divided by the bigger number.


**Speaker 1** `[13:28]`

Okay. Alumni second ticket. Second ticket purchases. What is the second ticket purchase?


**Speaker 0** `[13:36]`

So whether it's elite, like, whether someone purchases two tickets in one sale, or whether their email itself has purchased another deal in this month. So let's say they purchased one and they had a deal created, you know, in April and we migrated everything, and then they also, you know, purchased another one, okay. Great. We count that as a second ticket or third ticket or whatever the number is.


**Speaker 1** `[14:01]`

Okay. So alumni, that's fine. Second, if they purchased before and they're purchasing now as well. Repeat first.


**Speaker 0** `[14:09]`

Yes. Like, or second purchase rate. So, really, anytime anyone has purchased a second school or greater at any point, whether it was a part of their first purchase, if they had a second one, or whether it was just, like, an alumni call.


**Speaker 1** `[14:29]`

Okay, and then happily so should these these be presented, like, regular versus alumni, regular versus second purchases, regular versus. I'm just we don't even need to put the numbers behind it. May I mean, maybe we do, but.


**Speaker 0** `[14:45]`

I would just say first purchase versus second purchase plus or repeat purchase. So it'd be first purchase versus repeat purchase and then like, repeat purchase rate.


**Speaker 1** `[15:11]`

So in the repeat purchase, you are calculate you're adding the alumni alumni plus second purchases plus elite?


**Speaker 0** `[15:24]`

Yeah. Repeat.

Equals alumni. Second purchases of any sort. So here's where it might get confusing is, like, the second purchases when I say this is someone might have purchased a golf school in 2024, but then they got a VIP tiger experience email and were like, oh, I also wanna go to this school and see Hank Haney. But it's not like an alumni call, but they're technically an alumni. But it happens in the sales pipeline, not the backend or retention. So that's what I mean. It's like, if there's an email with two deals and two tickets anywhere, that needs to be the second purchase. Right?

Or elite, which means someone purchased two tickets for themselves only in their purchase.


**Speaker 1** `[16:25]`

Alumni second purchase, Venice Ford, or lead purchase purchase to tickets for themselves only in their purchase. Okay. These lead purchases can also be first purchases as well. Right?


**Speaker 0** `[16:36]`

Yes.


**Speaker 1** `[16:38]`

Okay. So first purchase will represent because it says regular purchasing there, we represent only those new people that came in and made a purchase this month, but they only purchased one ticket for themself.


**Speaker 0** `[16:51]`

Yeah, and I would say the last 30 days. Like, if we can have a rolling last 30 days, if that's pass yeah. And.


**Speaker 1** `[16:58]`

Then the report page purchase will practically include the and lead purchase that can also be people who just came in this month, but they purchased two tickets. Yep. Cool. Okay. You're clear on this one. Awesome. We. I'll try to make it.


**Speaker 0** `[17:17]`

Okay. Okay.


**Speaker 1** `[17:19]`

Cool.


**Speaker 0** `[17:19]`

And then here's my thought is, like, honestly, even if we just duplicate the sales dashboard and make, like, a a Brixton dashboard or something and here's the reason I say this, because there's so much going on in here. I'm gonna ask us all, can we have this broken down monthly instead of daily. There is too much going on with all these different tables showing today and then this month. Personally, I think it's just way too much. I would just rather say, like, this month, and then if he wants to quick filter by today, he can quick filter by today. That would be my suggestion because yeah. Like, meetings today, meetings yesterday, so far this month. Like, I don't know.

I'll I'll see what Assal says, but I think just having, like, a monthly view is fine, and then we can, like, drill down into today or yesterday if we wanted to based on, like, this. That would be my personal suggestion so that the actual fields themselves are super clear. But right now, it's like, I have 3 different meeting fields, 3 different confirmed calls fields, show percentage today and month to date, and then like, some of these are staggered. So I just feel like I'm lost with looking at this. It's been a lot.


**Speaker 1** `[19:01]`

Question. For the bookings.

For the bookings, when you say bookings, do you mean how many calls were created, or how many calls are on the calendar?


**Speaker 0** `[19:14]`

I mean, let's just do on the calendar. I don't think it really matters. They're they're relatively close, like, fairly close. So I'm not, like yeah. Most recent meeting meeting date and time. Yeah. The way we have it is fine.


**Speaker 1** `[19:30]`

Okay. Cool. Awesome.


**Speaker 0** `[19:33]`

I mean, yeah, they're enough where I don't think it matters.


**Speaker 1** `[19:39]`

Okay. That's fine. That works. Perfect. I don't know. I don't have any other questions. Do you have anything else to add?


**Speaker 0** `[19:49]`

Let's see. Because he also wants the breakdown by, like, a I don't know if we've done this, but, like, the breakdown by and maybe we do this too. It's, like, maybe we just create a separate dashboard that's, like, source breakdown per closer or something or source breakdowns. So, like, we have a dashboard that shows, like, overall totals and like, closer metrics, and then if we wanna break it down by source because I know we're we're probably running out of the amount of cards that we can put here soon. But I think that's what he also needs is, like I saw this message me and was like, can I just see close rates? I wanna see a breakdown by rep.

I'm trying to track performance for, like, the alumni people. Right? So, like, he wants to be able to break it down by, like, covert coaching, Tiger Academy, Senior Swing Academy. Like, he wants to be able to break these things down. Just in general, like, what is the close rate for all of these different sources? What's the revenue for all the sources? But then can we also have a table that shows the comparison between different closers?


**Speaker 1** `[20:54]`

Okay. So now let's let's go back a bit. So if you go like, the total metrics, we will take it from here. That's fine. Per closer will come from here. That's fine. Now if you open the overview dashboard.


**Speaker 0** `[21:09]`

Is it called overview? Oh, I see.


**Speaker 1** `[21:12]`

So this one is what we were looking last week. So in here, we have first sources.

There's some barely doubts. So I need to see what happening there. But then if you click. I forgot the word. Scroll down a bit. You can see in here per ads, like, and divided by closer. Is this what you're looking for to get?


**Speaker 0** `[21:40]`

Yes. This works. Are we able to maybe keep a list of who the closers are so that we can, like anything that says David Testowich or anything that says Ras, like Andy, those Mark Mauer, he's not no longer on the team. Like, that type of stuff, I think we need to unassign. Like, just all of those, would just like to have removed from here, like, and excluded.


**Speaker 1** `[22:02]`

Okay. We can we can do that. So practically, for the sources and all of that, we can use this. I can see we have all the metrics. Maybe I need to to add the show rate as well, not just the close rate, but that's fine. We can still have this, and here we have convert convert coaching, email, Tiger, Miger, alumni.


**Speaker 0** `[22:31]`

Yeah. Hear me. I might I might just go through each of these a little bit, but tiger experience. I just oh gosh. Maggie.


**Speaker 1** `[22:45]`

Oh, I just copied everything with okay. We'll check.


**Speaker 0** `[22:54]`

Shows this month what is what is this? Show show this month? What is, like, this.


**Speaker 1** `[22:59]`

Last month. Oh, last month.


**Speaker 0** `[23:01]`

I see. I see.

This month. Last month. So show percentage.


**Speaker 1** `[23:11]`

So we have show and we have close percentage because you guys want to see the close percentage and wanted to see the volume of the shows for that percentage.


**Speaker 0** `[23:21]`

Okay.

Email does email exclude specific campaigns like the Tiger experience, let's say? The Tiger experience.


**Speaker 1** `[23:35]`

It's by itself.


**Speaker 0** `[23:37]`

K. Can we get another one for the senior Swing Academy? It should only have one UTM right now, which is this.


**Speaker 1** `[23:51]`

Okay.


**Speaker 0** `[23:53]`

But if we can just kinda duplicate the 4 and honestly, I could actually even do this myself, and I can work with these. But, yeah, I mean, that would be great, and then I would say let's move covert coaching to the bottom with alumni because they're basically like, alumni and covert coaching are alumni deals. I'd like them to be, like, together. But.

How does let me just send this to you. How does.

Okay. I will I'll get with Asol on this, and I I didn't really know that this one existed. I think we went over it, and then I just forgot about it. So and.

Then what I also wanna do, I think I mentioned this a few times, is. I really just like, I need this source field for anything that says, like like, even in in in the past, in all honesty, I'm just getting kind of annoyed trying to pull up data and having to be, like, medium form, long form, like, all of those in source because we were never capturing UTM medium at that point anyway. If we could find every single paid ad deal and just update UTM medium and source to just say paid, that would make my life so much easier.


**Speaker 1** `[25:43]`

Yeah. We implemented two new fields, which is original source field and latest booking source that also represents that. But I I understand that. I mean, we initially started with beta with to have paid, then you were like, I don't need to to know which form really is, so then we changed it.


**Speaker 0** `[25:59]`

Yeah. I know. Like, I it it was like that because of the way that, like, we weren't tracking all the UTMs, and then now we are. So it's like, I would rather capture that data through UTM and then the source. It's just easy to to filter by. Yeah. I think that's the easiest way to do it. Number two, can we consolidate this closer deal owner and booking owner into, like, one field?


**Speaker 1** `[26:25]`

Yeah, and have the.


**Speaker 0** `[26:26]`

Like because the issue is if I move CMO or if I move this deal from CMO to another closer, I have to go in here and change CMO here to, like then I have to go and like, change it to Trig here, change it to Trig here, change it to Trig here. It's just, like it seems like a lot.


**Speaker 1** `[26:45]`

Yeah. I mean, the the idea was to change some of these because there you guys are changing the I don't know. There was this use case, but I forgot.


**Speaker 0** `[26:55]`

Yeah. I mean, even if you, like I just don't see a world where these 3 are not all the same. So even if we, like, we wanna have the fields and you just hide them, and every time we change closer to be see from CMO to Mickey, it just triggers workflow. Scenario. Yeah. That's fine.


**Speaker 1** `[27:12]`

There was a scenario by by that's the why we had a booking owner and a closer, but I don't remember right now. But since if you don't remember as well, it's irrelevant, so we don't need to have it.


**Speaker 0** `[27:24]`

Yeah. Okay. Okay.


**Speaker 1** `[27:27]`

What. Now originally, lead source and latest booking source, that is that is why I needed so much time to create those dashboards with the sources because I needed to kinda create two fields that will have the source that I would know that all those forms are actually paid. This is an email. This is this. This is that. So that's why we had all that things. Yeah, and there are 83. I need to see why that happened in there.


**Speaker 0** `[27:53]`

I'm a phone rep here. There's no reason I should be a phone rep for Yuri. Unless I set that guy a long time ago, I might have actually. This is under SMS.

So source is SMS. I mean.


**Speaker 1** `[28:10]`

Do you want to put it as a source SMS?


**Speaker 0** `[28:13]`

Yeah. We could just do that. Okay. Honestly, like, I would actually just amalgamate just for the sake of this report, I would amalgamate anything that says SMS into email. Okay. Cool. Oh, wait. Actually, that that isn't right. There are some rules here that I have to create. Because email is great, but it depends on the kind of email. The. SMS because we could have an SMS for VIP Tiger experience. We could also have an SMS for.

I mean, none of these, but paid ads.


**Speaker 1** `[28:57]`

But for some other campaign, I understand. But in that case, the campaign will will come first, and if it's, a specific campaign that you're running, we can push the campaign name to to come as a source and not the SMS unless you guys want.


**Speaker 0** `[29:12]`

Because on.


**Speaker 1** `[29:13]`

In the UTM, we will still see that that it that it came from SMS. We'll still have that data as a second source, But, initially, it's actually coming from that specific campaign so that you can present it. So we can present it in a dashboard, and you can have a summary of the of the numbers.


**Speaker 0** `[29:32]`

Well, what I might do is give.

I might give you which sources that I want to see in here.


**Speaker 1** `[29:43]`

That's fine.


**Speaker 0** `[29:44]`

And then give you the rules of how they work. Because a lot of it's complicated. Like, even when I was doing this with with my rep and we were just trying to get everything listed out, like, there are so many ******* UTMs that, like, I had to go through and say, these are all CCA. These are all PGTA. These are upsells. These are abandoned to no shows. These are just regular email, and we did all of that together. So that was an adventure.


**Speaker 1** `[30:14]`

Amazing. So we can have this. I mean, like, I mean, we already have the 4 SCCYA. We already have that. But for the others, for the emails, it will be useful, I guess.


**Speaker 0** `[30:26]`

Yeah. I can I can help get that over to you? Sweet. Well, yeah, I think this looks nice in all honesty. I think this is pretty well what we need minus the the things that we went over at the beginning, and then.


**Speaker 1** `[30:43]`

Yeah. So we just need the another dashboard that will present the metrics, the total metrics, practically what you have in sales, but just a little bit polished, and also the repeat schools, and I will need to polish this one, this one.


**Speaker 0** `[30:57]`

Cool. Yeah. That'll work. That's perfect.


**Speaker 1** `[31:01]`

Cool. Awesome. Awesome. Perfect, then if there's something else, I would just jump into it because I have dashboards to do.


**Speaker 0** `[31:11]`

Yeah. As Al said, monthly is fine. So even if we just wanna, like maybe just, have that dashboard or duplicate the dashboard once you're done and like, remove today and like, yesterday and all that kind of stuff comparisons, I think, really, all that Brixton is looking for is, like, a month like, how is this month doing, and how is this month doing compared to last month? I think that's really, like, all he's ever looking at.


**Speaker 1** `[31:34]`

So Do we want the this and last month?


**Speaker 0** `[31:38]`

Yeah. Sure. Why not just do that and kinda split everything side by side. Okay. Cool. Possible. Perfect. Thank you.


**Speaker 1** `[31:46]`

Thank you for your time today. We'll talk in Slack.


**Speaker 0** `[31:50]`

Yeah. Sounds good. Appreciate you. Bye.


---

## Metadata

- **Meeting UUID:** `428d2726-08d7-4991-b39e-888b4e4e3cc5`
- **Transcription UUID:** `f4c80aca-ee5b-4409-b24f-6b52c6a0c581`
- **Recording UUID:** `fcbbc76b-f01c-42f1-8842-26eae8d445de`
- **Processing Status:** notes_available
- **Avoma URL:** https://app.avoma.com/meetings/428d2726-08d7-4991-b39e-888b4e4e3cc5