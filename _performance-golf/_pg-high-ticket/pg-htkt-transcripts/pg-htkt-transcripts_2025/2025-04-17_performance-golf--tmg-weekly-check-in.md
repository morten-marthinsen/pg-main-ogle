# Performance Golf <> TMG Weekly Check In

**Date:** 2025-04-17T18:00:00Z
**Duration:** 2118.14275 seconds
**Organizer:** margarita@themoderategenius.com

**Attendees:**
- test (margarita@themoderategenius.com)
- Assal Moradian (assal@performancegolfzone.com)
- David Testawich (david@performancegolfzone.com)
- Euclidcruz (euclidcruz@gmail.com)
- Markdeguzman (markdeguzman@performancegolfzone.com)

---

## Transcript


**Speaker 0** `[00:19]`

Hello? Hello?


**Speaker 1** `[00:20]`

Hi. Hello. How are you guys doing?


**Speaker 0** `[00:24]`

Doing well. How are you?


**Speaker 1** `[00:26]`

Oh, doing well. That's what I need to hear. I'm doing great. Thank you.


**Speaker 0** `[00:31]`

I'm always doing well. There's fires sometimes, but always gotta be vibing. You can't.


**Speaker 1** `[00:37]`

Yeah. I love that. Love that.


**Speaker 0** `[00:40]`

Bad vibes anywhere.


**Speaker 1** `[00:42]`

That I love that. So how is today?


**Speaker 0** `[00:49]`

Today is not bad. We're noticing a few more issues. I'm about to create some tickets. One is in our power dialer, we only want leads that have been intent based leads. So, like, people who've submitted a survey in any way, we have a lot of leads in the power dialer that are like we randomly uploaded leads from checkout champ purchases, and we would send text blast to those leads, but they weren't, like, intent based. They were just like we randomly sent, like, a vague text to them at some point, and the the teams has no way to, like, engage with them. They're just not the leads that we should be talking to, so they ended up getting funneled into, like, day one, day two, day 5:30 days, whatever. I just want those out of there. So I'll give you guys instructions on that. We're still seeing leads doubled up in power dialer. So. Double leads? Yeah. Like, we'll see their name, like, two or 3 or 4 times in a row in the power dialer.

And then lastly, there's people who were, like, booked yesterday for a closer today, and they're in someone else's power dialer, or they declined golf school with the correct call disposition 3 days ago, and they ended up in someone else's power dialer. So those are, I would say, the main things. I'm just gathering some emails right now to give you guys examples and fill out a I'll fill out. That's from Hublot so we can see.


**Speaker 1** `[02:13]`

Why those people ended up there.

Okay. Cool.

Yeah. We will definitely check those things.

Cool.


**Speaker 0** `[02:29]`

Awesome Are the closers.


**Speaker 1** `[02:32]`

Using it? Do you have any issues on the closers side?


**Speaker 0** `[02:35]`

So I. I've had a chance to maybe go through it, like, a little bit, but I haven't the thing is is I just I I don't know if. Sol has noticed issues. I haven't seen her raising much. The closures haven't said much to me, so I just wanna make sure that I'm not like, there's there's nothing lost in translation since she's not, also very busy. So let me like, I'll try and keep in the loop. I'm gonna start messaging them. One thing that I'm noticing so let me pull up this sheet.

So I need to bring this up with John as well, John Crews, and I just need to make sure that things like this, when we have the billing data, that the, total amount paid ends up in here as a custom object. I need to make sure that he's doing that correctly. So. I wanna make sure that when someone purchases, we are extracting the data correctly. We're bringing in even in the payment objects. Right? I wanna make sure that payment objects also have order ID or transaction ID on them. I'll I have a a one on one with Faraz, like, right after this. I'll get you that, but I wanna make sure there's a field in here for, transaction ID. So.


**Speaker 1** `[03:49]`

It should be. I think we created one. Let me quickly check. As for the amount paid, that needs to be manual.


**Speaker 0** `[03:58]`

Yeah, and that's obviously on John, so I just need to make sure that that's right.


**Speaker 1** `[04:01]`

Yeah. There is order ID as a field, which is something we can pull from the Google Sheet. I can add on the left side so you guys can see it under the payments. Order.


**Speaker 0** `[04:16]`

Yeah. I just don't oh, I guess yeah. As long as it's in this, like, drop down here, that would be awesome. The old property. Refresh it.


**Speaker 1** `[04:24]`

You should be able to see it. Order ID, you passed it. Okay.

Yeah. You passed it again. It's under Oh, I see.


**Speaker 0** `[04:35]`

Yeah. There we go. Okay. Cool. Yeah. As long as you have that order ID, because then we can start to link things by order ID, which will be awesome. That was the only thing that I noticed just, like, quickly going through them. Number two is is there a way that we can take any anyone? Maybe we have to, like, go back and link all of these. But what I also noticed is there was a lot of deals that are in, like, call booked that have previously purchased.

On I think this guy did. So I actually remember this guy. So this guy has purchased before. Like, is there any way to retroactively get this data in here? Because if I take a look at this person in actually, I'm not sure if this one did. There's a guy with a similar name, so let me double check. But so who like, to get them into the correct placements of the pipeline you have purchased?


**Speaker 1** `[05:31]`

Yes. So, let's see if that person purchased. So what we're doing is we are rechecking the schools manually and touching the the deals to them because, there's no automation to it. The data in Zoho is.

Not ideal. So I will really can't just export and import it. So we are rechecking, seeing what is happening. I can see now that the house file is used. So for new closed deals, that's that's cool, and we rechecked, most of the data, but we just need to go back one by one and like, see what is happening.


**Speaker 0** `[06:16]`

Okay. Got it. Because, like, even this guy, like, Wayne Gregory, like, his info is just not in here. Like, I don't have a deal here.


**Speaker 1** `[06:22]`

No. Let's talk about the old data. Like, that's something that I want to mention on this call, besides the task that you submitted. But I don't think.

I don't think Mark is in here. Right?


**Speaker 0** `[06:43]`

No. Again, that's something I wanted him on here for. Mark, let me message him again.


**Speaker 1** `[06:47]`

I mean, he he was here.


**Speaker 0** `[06:49]`

He's coming back. Yeah. I know. I saw him. I just need to get him back on here.


**Speaker 1** `[06:57]`

Yeah. Cool. So the, so old data.

I want to define a process about it because what we did was when we imported the the data, we imported all the deals that were kinda calls that's supposed to happen from the moment we moved in, in the future. Right? All the calls, all the future calls that became deals. Right? Now if you're saying that you need the past calls for retention calls or for some other situations, is that something we can do on contact level because it's a past data?


**Speaker 0** `[07:48]`

Yes. As long as we have all of the data that was in Zoho. Like, if we had, hey. They purchased. This is when they purchased. All that kind of stuff. I'm fine. I would just need a way that we could create a deal a new deal then from that point onward. Like, I would need a process that they would have to follow because if I'm not like, my setters aren't calling people to get someone retained. Right? I could call one of the old buyers and say, hey. David with Performance Golf. You wanna buy another school? Maybe they say yes. On that call. How do I then go and create a deal to make sure it follows all the steps? It has all the info that we're looking for. So I would put a form or something.


**Speaker 1** `[08:30]`

Calls. Are those calls you once have? Are those the alumni calls? Like, what what is that?


**Speaker 0** `[08:35]`

This is something that again, I wish Asawa was here. I mean, I can get her on. Let me see. So.


**Speaker 1** `[08:43]`

Because here's what I I have here as a tab that I didn't no. I didn't. What I can show you here is all the past calls. Like, everything that where the most recent meeting date was recent meeting date.

Is last, let's say.

Not last year, but last hundred and 80 days. Now we can have this and we can have the columns that you guys need, and from here, you can manage them. I just need to understand what needs to happen. Like, what is the idea? Because one of the things why we didn't export it all the calls and created deals for all the calls is because, I didn't want to clog the pipeline with a lot of deals and a lot of things in there because in the first place, you didn't even have these stages in Zoho.


**Speaker 0** `[09:56]`

Yeah. Okay. Well, here's the thing is we just need a way, like, a process to how to create a deal quickly when we need it. Because here's the issue is we have a lot of long term follow ups. Right? So, like, if someone was a a cold follow up that was September 5 that messages us back and says, hey. I'm ready to get going. Right? We would still want the data that was there saying, hey. This was the initial booking date. This was now a follow up. The sale was a paid ad sale from September. That's when the call happened. Here's when the purchase happened. Like, I still want that data if they come through. So I guess that's where if we just have a process to say, like, create deal or like, we have a form for people in that scenario or retention, a form for people in that scenario that just creates a deal like that.


**Speaker 2** `[10:49]`

Just one sec.


**Speaker 1** `[10:51]`

Okay. We'll think about it. What about. Hey, Mark. So while you're here, I have some questions.


**Speaker 0** `[10:59]`

Can you hear me?


**Speaker 2** `[11:01]`

Yeah.


**Speaker 1** `[11:01]`

Awesome So on this thing that you guys were showing me, like, all, I don't know which one was it. Was it this one? But there were fields about, Onesoft, and then there were, like, another field about, those once have once have date and huh. Booking date, and then at the end, there was, like, direct booking date and something else. So I just wanna understand what those dates are. Maybe they know about it. I don't know. But I want to understand from tech side who are those dates because maybe we have them, maybe we don't.


**Speaker 0** `[11:51]`

Yes. Actually, I can go some of them, because some of them, I don't even know if you are aware of those yet, Mark. So I'll go through real quick. Can I share my screen?


**Speaker 1** `[12:01]`

Yeah. I'll allow.


**Speaker 0** `[12:03]`

And then what I'll do is. I will, also maybe just put this into my document, whatever it is. Okay. So we have why is this? Okay. One sub date is the date of meeting.


**Speaker 1** `[12:25]`

Okay. Meeting date. Like, on the calendar.


**Speaker 0** `[12:27]`

Right? Yeah. Date. Where is it? K. What else do we have? I have one sub date. What other dates do we have in here? I have.


**Speaker 1** `[12:44]`

You want some other dates? Date survey submitted is.


**Speaker 0** `[12:47]`

Like, intuitive. I'll leave that. Date two active. Okay, and then I have direct booking date is activity creation of of any direct booking on the calendar, and I'll define direct booking. Is any booking not from a setter or phone team? So, like, they saw an ad, paid ad, email, etcetera. Right? So they booked on their own. They booked on their own. That's direct booking date, then I have date call scheduled. So this field I've been able to use. So date call scheduled when a setter books or confirms slash qualifies a call. This was in the attribute form. Yeah. Yeah. So it was today's date in the attribution form. Day's date in Zoho attribution.

Form, and then I have and that's really important for Mark, by the way. Same with what was the next one? Date lead added. So this, I would say, is, like, same as survey submitted. I created this for ad leads. I just did that. That was what I created for a Zap. I didn't really realize we had this up here when I made it, so that was my bad. But they're kinda doubled up. This is more like typically organic slash p g numbers, and then this is, again, like, typically ads.


**Speaker 1** `[15:05]`

Do you have one for ads and one for organic?


**Speaker 0** `[15:09]`

Yeah, and I might even, like, in the future, differentiate the UTMs between organic and UTMs between, paid because, like, our media buyer is wanting to get all of this stuff set up, and then the naming conventions are slightly different than they are for internal. So I might need to change some of this, but I'll I'll leave that for another time.


**Speaker 1** `[15:31]`

Okay. Okay. Cool. So now, Mark, you need this, data for like, what is the time frame? Are you checking the data for the previous day, or you're checking the data for today? Like, how is that working, or for on a weekly level.


**Speaker 0** `[15:49]`

Like, we typically update actually being extracted daily.


**Speaker 1** `[15:53]`

Daily for the day or for the previous day?


**Speaker 0** `[15:56]`

Month to date. Month to date. Yeah to date.


**Speaker 2** `[15:59]`

Yeah to select.


**Speaker 1** `[16:01]`

Okay. Month to date.


**Speaker 2** `[16:05]`

Response rate, and since it's where we wanna see.


**Speaker 0** `[16:13]`

I can't hear you very well, Mark.


**Speaker 1** `[16:15]`

Yeah. Me either.


**Speaker 2** `[16:17]`

Yep. So as I was saying, it's week extracted monthly date as mentioned by David.

There are actually the reason why we have those several dates and it needs to be present is because, the phone team is actually dependent on the booking date, when it was booked. Yep. For and then for the setters team, it's more on the appointment date and the, initial billing or when we actually got the revenue.


**Speaker 0** `[17:00]`

So this is all from the sheet that I was showing you the other day, Margarita. This is, like, mark sheet. So for the setters, he fills out all of this, and then for the phone team, I don't know if you use the same area. But, again, we have all this raw data that he then will utilize to, make the equations in in here. Right? Oh, sorry. Oops. In the center board. So we'll be able to see, right, the equation of, various fields from, you know, the raw data. So that's why we need the data is we need to be able to put it into this raw form so that we can use the equations that we've already created, essentially. Do you use the same raw area for the phone team, Mark?


**Speaker 2** `[17:49]`

Rested. Yep. That's right. It's just that, for phone team, I follow the phone rep name instead of setter.


**Speaker 0** `[17:58]`

Yeah. Exactly. Right? So we use phone rep, and that's the same thing that we have in Hubspot. Right? So in Hubspot, we have on the deal level deals. We have both Yeah. Phone rep. We can change this to phone rep, maybe. Yeah. That's Margarita, and then this is setter, and then it'll just match. But, yeah, that's essentially how we take the name and assign it.


**Speaker 1** `[18:22]`

In native source, that is the.


**Speaker 0** `[18:25]`

That's the the source, like, the long form v one, email. Okay. That type of stuff. So that was our source category in Zoho, and then setter source, I think, is setter source over here somewhere.


**Speaker 1** `[18:37]`

That's fine. Okay.


**Speaker 0** `[18:40]`

Cool. All the data that you need then right here, I can just share this table with Margarita, Mark.


**Speaker 1** `[18:46]`

Yeah. Send it to me so I can see. One question in this metrics. Like, if a part if a call was booked through a paid ads and then it was rebooked by the setter, In the first time when you're extracting the data, that call will be connected to the paid ads. But then if that happened within the same month, the second time when you will export the data, it will be attributed to the setter. Is that okay?


**Speaker 0** `[19:24]`

Yeah. I mean, the phone do you mean setter or phone team?


**Speaker 1** `[19:29]`

Yeah. Let's go with setter and phone phone team. Like, if if it is there a possibility to overlap some of the leads?


**Speaker 0** `[19:38]`

So kind of, so right now, our like, the phone reps, when they book people, let's just say this person, for example, when they book someone from the phone team, the phone rep so let's say it's Rubelin. I can't remember last name. Right, then the setter has to go in, and the setter also has to confirm and qualify that. So we are gonna be doubled up on this. Right? So we need both of them extracted, and we can filter how we need. But those are independent of the source. As long as we have our most recent source as setter source and then whatever the the actual source v two is. Can we get those side by side up here, by the way?


**Speaker 1** `[20:18]`

Yeah. Yeah. I can I can pull them?


**Speaker 0** `[20:21]`

Cool. View all properties. Yeah. Because we just really look at and and we'll have them in different rows. Right? So I'll see the source as whatever the source is, and this is, I guess, more from my viewing than Mark's, I think, then we have the setter source, which kinda which tells us again what was the most recent source that the setter provided. So that's the source in Onesub.

And those those are separate because this source or this native source is more of my source of truth than the setter source. The setter source is a subjective truth. So I like to know, did my Facebook ad long form v one close because it was a paid ad set or because it was prequalified confirmed, that type of stuff.


**Speaker 1** `[21:10]`

Okay. Cool. Makes sense. Now another thing in here, there there is, a column call status. Yep. The call status, I created today the field to confirm by the closer, but, no. No. Not to confirm. Sorry. When the closers are not showing up on the call.


**Speaker 0** `[21:28]`

Missed by closer?


**Speaker 1** `[21:29]`

Missed by closer. Yeah. I created that field and realized it's in in Zoho. You have the call status, and now after I realized that you guys send a ticket, hey. There the call status is used in this, report. So do we want to have the call status as a field, and if we do, there is, two, values that we need to discuss. One is the cancel one, which is easy. We can, like if the call is canceled, we can update that field as well. But the other one, which is not qualified or something, the value in there, I want to know how, you guys are now updating it so I know what actions if we can automate that based on the things that you guys are doing.


**Speaker 0** `[22:10]`

Yeah. So so not qualified. What that means is it's not prequalified. So if you click on any of these.


**Speaker 1** `[22:19]`

I have no idea where am I. Maybe this person?


**Speaker 0** `[22:24]`

So go to call status. So we use the not prequalified as not prequalified confirmed. That doesn't just apply to paid ads. What this means and we can even take out the paid ads. It can just be not prequalified slash confirmed. What this means is. I booked a call. I self booked direct booking. Right? I booked from a paid ad. I haven't talked to anyone yet. Our process says, in order for a closer to take the call, a setter has to prequalify and confirm them first.


**Speaker 1** `[22:58]`

If that person ghosted that process.


**Speaker 0** `[23:02]`

Then we count it as a canceled call, not a no show. We count it more as a canceled call and canceled because they didn't get prequalified and confirmed before the time of the booking, and we tried to call them at the time of the booking, and they never they never answer. So it's kind of a no show, but also I'm kinda saying, hey. Like, it's not prequalified confirmed.


**Speaker 1** `[23:26]`

So the no shows will go to not prequalified confirmed? What if they didn't show for real?


**Speaker 0** `[23:36]`

No. So I'm saying this is a canceled call.


**Speaker 1** `[23:38]`

Oh, okay. Yeah.


**Speaker 0** `[23:39]`

So we we technically call like, historically, we've called it a canceled call because they didn't get prequalified and confirmed before their meeting time.


**Speaker 1** `[23:49]`

And when is okay, and when is canceled then?


**Speaker 0** `[23:54]`

Cancelled could also oh, the canceled right there will be like, they they canceled. They message us and they say, hey. I had an emergency come up. III need to cancel my appointment, or they say, hey. I no longer wanna do this. I'm not interested. This is too much money for me. I talk talked with my wife. We can't do it. That's a canceled call.

But that typically happens that's if they communicate with us. Non prequalified confirmed means they ghosted us after booking. They never they never got to us at all. They booked the call. They never did anything with us. Canceled call means they messaged us and said, hey. I no longer wanna do this.


**Speaker 1** `[24:41]`

Okay. Cool. Miss Bakelo okay. We already have, we'll have this, and reschedule if they rescheduled it or what?


**Speaker 0** `[24:50]`

Yeah. That's just, like, again, call status. So we could leave that in in the the column of call booked, but it just means before my appointment or after my appointment, I said, hey. I can't I can't do this today. I had something come up. Can we reschedule for tomorrow, please?


**Speaker 1** `[25:06]`

And who is updating this field?


**Speaker 0** `[25:08]`

The confirmers.


**Speaker 1** `[25:10]`

Okay. Cool. So I can add this field, and they can manually.


**Speaker 0** `[25:13]`

Yep. Update it. Exactly.


**Speaker 1** `[25:16]`

Because I can see different scenarios of what is a cancel or not. So, okay, cool. I will create that call notes, and I will have that. Other than that, I think everything else, we have it in the so yeah.


**Speaker 0** `[25:31]`

Yeah, and then if you could, like, show us I I don't know. Are you gonna create a report, or are you gonna show Mark how to do an export?


**Speaker 1** `[25:39]`

Well, I don't know what is easier because in there, you need to import the data. Right? If it's a report, you need to, I'm in the wrong we need you need to, type it one by one.

Right? So I can do few things. One, I can create him a view like this that I have already created for, the billing team.


**Speaker 0** `[26:09]`

Yep, and then he can export that view, essentially.


**Speaker 1** `[26:14]`

Yeah. Yeah, and you can export it in CSV, whatever you need.


**Speaker 0** `[26:17]`

Yeah. I would say that's probably the easiest way to do it then for now, and then what we can do is because that just meshes with the way that we do things now, and what we can do is once we get fully over to Hubspot, once everything is is good, we're working together again, then we can work on creating a a better dashboard that just lives in, Hubspot.


**Speaker 1** `[26:41]`

Yeah. We can definitely do that for sure.


**Speaker 0** `[26:44]`

K.


**Speaker 1** `[26:46]`

I'm gonna say.


**Speaker 0** `[26:47]`

Does that work for you?

I know he's on his phone. I'm assuming power Internet outage or something. So, yes, if if we can create a, if we can create that, AAA view like that that shows all of that data that he can export. Mark, give me a thumbs up if you can hear me at least or a message in the chat.

Okay. Thumbs up. I'll send you Margarita's email. Can you add that to, as an editor to the the file or a viewer or whatever you are comfortable with, to the the sheet and then just tell her which tab it is?

Yeah. I don't know if I can add to it.


**Speaker 1** `[27:35]`

Cool. Month to date. So, practically so for order to do this, we need to have the month to date deals. Okay. One, thanks.


**Speaker 0** `[27:48]`

And then Mark, is there anything else? So so, like, she's thinking month to date deals. Do you just extract data.

For all time and update it, or like, how do you how do you typically extract the data now? Again, if you need to type it in the chat, let us know. But just let her know, like, what rules she needs to abide by that match what you're doing now so that this view makes sense, and then you guys can obviously communicate on Slack in that thread I created.

Cool. Yeah. I don't know if he can talk, so that's fine. Yeah, Mark. I'll send you her email, and then we have that thread in Slack that we can go back and forth in.


**Speaker 1** `[28:33]`

Okay. I.


**Speaker 0** `[28:34]`

Have to use MTD. Okay. That's perfect.


**Speaker 1** `[28:40]`

Cool. Another thing. Now if we can go back to to the other part that we were talking about, which is the retention part, I need to know the time spent like, the time frame for how back in the past we need to have the data in here. Like, in terms of I need to see all the calls that happened in this year so I can call these people.


**Speaker 0** `[29:13]`

It's all of it. Like, we're gonna eventually we're gonna need it so that we can have blast because, like, we didn't properly have everything automated at certain periods of time to go to our email list or whatever. So we just need all of it in there, and then we can filter by it. But, like, right now, like, yes, we're probably gonna focus heavily on people who've attended schools in the last 6 to 12 months, but I'm sure, like, we've had 4,000 people attend schools or whatever the number is. Like, we're gonna wanna be able to go back and talk to all of them because we've never had this retention specialist in play. So their job is literally just to contact everyone who's ever attended a school and try and get them into another school.


**Speaker 1** `[29:56]`

Okay. Cool. Question now. So that person now on a daily level, what they're doing, like, what data they're working with? Because because Asal sent me another thing, another room where she said, after the meeting date, we need to mark these people as alumni or something so we can start communicate with them. Yep. Which is fine. That is doable. That is something we can have in here. We can present it. But now what you're saying is a kind of different tab. So I wanna know if if we want to segment them segment segment.


**Speaker 0** `[30:33]`

Okay. That. Here here is where honestly, I I might just leave this to Asal because it's her team. It's her two employees that are retention specialists. I'm just speculating in all honesty. I'm just thinking, like, get it all in there, get all the information in there, and then we can deal with it and filter as we need. But, yeah, I think moving forward, like, she wants to have that alumni to know, like, hey. This person has attended a school. Now we can filter and create automations around when a person attended a school, create automations around, hey. This person is post school 15 days, post school 30 days. Let's send this email. Let's send this text. Let's have them try and book this call. Like, whatever it is. Right? I think that's her thought process.


**Speaker 1** `[31:16]`

Okay. We'll set up something in there. Okay. Cool. So for the old data, we will have it on a contact level. For mark purposes, I'm going to import the deals for this month then but I don't know where to import them. In which stage they should go?


**Speaker 0** `[31:37]`

I can create some rules around that based on what is in Zoho, or what we can do is another thought is the closures use Zoho up until Tuesday. We can just, like, cut off the data from what he has and just add to what he has from the 15th or whatever the day is. Whatever he has from the 15th onward, we can just add on top of that and remove any duplicates, or maybe we just add yeah. I would say that's probably the best bet. Is everything that he has, Mark, just, like, update until even today and then remove duplicate emails out of it or something, and then from there, we can just add on to it. Okay. Is is that fair, Mark? I don't know. Like, let me know. I'm just speculating here if they're throwing out ideas. Give me a thumbs up.


**Speaker 1** `[32:27]`

Or a thumbs down down if you're not a good answer, or a comment. I think.


**Speaker 0** `[32:31]`

He might be typing a comment if he's still here.


**Speaker 1** `[32:34]`

Yeah. He is, I think.


**Speaker 0** `[32:35]`

Yeah. How about this, Mark? I'll just have you connect with her through this Slack thread. That might just be easier for us, if you're not able to talk, which is fine. Just communicate through the Slack thread. Any questions oh, there he is again. Doubled up. Oh, maybe not.


**Speaker 3** `[32:52]`

Hello? There we go. Okay.


**Speaker 0** `[32:58]`

We can hear you.


**Speaker 3** `[32:59]`

Yeah. I can.


**Speaker 2** `[33:00]`

My Internet is back now. So yeah.


**Speaker 0** `[33:03]`

Nice.


**Speaker 3** `[33:04]`

Oh my god. This. Internet struggle. Okay. You were asking and you were asking for a thumb thumbs up earlier?


**Speaker 0** `[33:14]`

Yeah. So what I was saying is what we can do is we can just add all the data that's in Zoho month to date, and what we can do is we can create a month to date report on Hubspot, but we only started adding information into Hubspot for deals on, like, the 14th, 15th. So just continue to give you the month to date report, and you can remove duplicates of emails, and and then we can just count whatever is there as a unique, unique email, and then moving into, a, we will just continue to use Hubspot, and we won't have a merge of data. Is that fine?


**Speaker 2** `[33:50]`

Actually, if if you remember, you you mentioned that for, the data starting April 14.


**Speaker 3** `[33:59]`

Yeah. This is the first time that we we started using Hubspot. Right?


**Speaker 0** `[34:04]`

Yeah. We start the setters started using Hubspot on the 14th. The closers started using Hubspot on the 15th, and even then they were still adding some information into Zoho on, like, the 16th. So that's what I'm saying is, like, we can just take whatever's in Zoho up to today. We can merge that with whatever's in Hubspot right now Right to make sure we're not missing anything from when we transferred, and then you can just delete duplicates that have null information or the same information.


**Speaker 3** `[34:35]`

Sounds like a plan. Yeah, and then my extraction point would be from Hubspot moving forward. Yes.


**Speaker 0** `[34:41]`

Exactly.


**Speaker 3** `[34:42]`

Sure.


**Speaker 0** `[34:43]`

Awesome. Yeah. Marguerite will create that page. I'll just have you connect with her through that Slack thread whenever you need to, with whatever questions you guys have back and forth or Robert, who I'm assuming might also be helping on this, and then and then we'll be good to go.


**Speaker 3** `[35:00]`

Got it.


**Speaker 0** `[35:02]`

Awesome. Well, I have to jump, but thanks, guys. If you need anything else, let me know.


**Speaker 1** `[35:06]`

You. Thank you for your time. If there's anything, send everything in Slack, and yeah, let me know if there are any issues coming in. Awesome. Thanks, Margarita.


**Speaker 0** `[35:15]`

Bye. Bye.


**Speaker 1** `[35:16]`

Thanks.


---

## Metadata

- **Meeting UUID:** `93332df7-8d3e-4cfe-8af0-b1133c801693`
- **Transcription UUID:** `dd046615-9671-4fdf-b11f-f5d92eec2d9a`
- **Recording UUID:** `a0f7d697-c3ff-41b5-aa96-fb375c76bbe9`
- **Processing Status:** notes_available
- **Avoma URL:** https://app.avoma.com/meetings/93332df7-8d3e-4cfe-8af0-b1133c801693