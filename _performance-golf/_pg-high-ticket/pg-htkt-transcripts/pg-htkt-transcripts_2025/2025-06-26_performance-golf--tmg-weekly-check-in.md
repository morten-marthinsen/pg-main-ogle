# Performance Golf <> TMG Weekly Check In

**Date:** 2025-06-26T18:00:00Z
**Duration:** 4577.537688 seconds
**Organizer:** margarita@themoderategenius.com

**Attendees:**
- John Cruz (john@performancegolfzone.com)
- test (margarita@themoderategenius.com)
- David Testawich (david@performancegolfzone.com)
- Assal Moradian (assal@performancegolfzone.com)
- Juan Carlos Bonato (juancarlos@performancegolfzone.com)
- Kelsey (kelsey@performancegolfzone.com)

---

## Transcript


**Speaker 1** `[00:14]`

Hi. Hi, Marika. Welcome. Welcome. So glad to have you here. How are you doing?


**Speaker 2** `[00:23]`

Doing well, and you?


**Speaker 1** `[00:25]`

Thank you. I'm great to hear as well. Back from vacation, see what is happening. So, yeah, Davis is here as well, and I can see Kelsey, I guess. Am I pronouncing it right? Perfect. Kelsey, welcome as well. Hi, David. Nice to see your face again.


**Speaker 0** `[00:49]`

Yeah. It's been a minute. How was your vacation?


**Speaker 1** `[00:52]`

Oh, it was a good one. It was pretty pleasant. Thank you. Thank you for asking that. Are you guys going on a vacation?


**Speaker 0** `[01:00]`

Sorry?


**Speaker 1** `[01:01]`

Are you guys going on vacation?


**Speaker 0** `[01:04]`

No time soon. Maybe end of summer, give or take.


**Speaker 1** `[01:09]`

Oh.


**Speaker 0** `[01:09]`

We have I have a cold winter where I'm at, so I would rather take a vacation in the middle of the winter and get out of the the cold and the snow.


**Speaker 1** `[01:17]`

Oh, you don't want the cold. Okay. I get it. Fine. Hi, Kelsey. Nice to see you. I don't know if we've met each other, but nice to see you. Hi. Okay. Cool. So first, can we give Juan. Okay. Cool. So, Juan, I would like to go through everything with you again through the things that you shared because I think the report is a bit confusing. I think that is confusing you. So I will go through the things with you today, and is John joining today or Kelsey you are presenting for John as well?


**Speaker 2** `[01:55]`

No. You know, Margarita, know Kelsey works on my team. So maybe what Sorry.


**Speaker 1** `[02:00]`

Okay. No.


**Speaker 2** `[02:01]`

No. It's okay. No problem. Maybe what we can do is the following just to show you the last progress that we made on on the report case. Kelsey made a really good progress on tying all those secondary attendance to the schools. Okay? So right right now, we can we can see all those guy that would that purchase more than one ticket, and then we can see for whom they want that that additional tickets. Okay. That for us is is is really important. Okay? So Kelsey may may may show you that. That for us was a really great zone and a bad a really bad problem. Okay? I believe she she did a great job to make the to get this solved, but we still have some inconsistencies that we may show you on the screen and then you know, see if if any any additional controls may be put in place. Okay? Just to prevent mistakes to happen. Okay? Yes. Because if you if if you like to take the the work, please go ahead as as we discuss.


**Speaker 1** `[03:16]`

Sure.


**Speaker 3** `[03:18]`

Sure. Let me share my screen.

Can you see this okay, or should I make it bigger?


**Speaker 1** `[03:28]`

Yeah. Okay.


**Speaker 2** `[03:30]`

It it looks perfect.


**Speaker 3** `[03:33]`

So some discrepancies that we found were just some information missing in the school area in Hubspot. So the GRU, the course, the dates. There are other ones in here too where the course name doesn't match the the guru's name or just small things like typos in there. Like, this one just has a bunch of random spaces in here, and so if the spreadsheet's flagging it as incorrect when it's just.

A typo in there or information missing such as the amount for this one was missing. This one here is just a one day long school, and that's how it's entered in the school section in Hubspot too. But in it is also listed as having two days, but then it's the same date. Okay.


**Speaker 1** `[04:31]`

Can you go to the details in there, please? When you are on the length of school, go to that field to which one? Where it says length of school, where it says two. Go. Yeah, and in there in details, can you go to details to that one? Okay. So this one's manually update.


**Speaker 0** `[04:50]`

So a lot of these are manual errors. Like, what I'm looking at here is they're manual errors by John Cruz. So that is something that. I just messaged him to get him on this call, but those are things that it it isn't really an issue with Hubspot. It's more of an issue with how are we inputting the data every time we put in a school. So that might just mean we need to look at exactly what issues come about and create a process so that we can repeat it every single time to make sure that there aren't whether it's spelling errors, extra spaces, start date, end date, and then Margarita, if we could even maybe make a rule where, like, length of school is like, if maybe it flags it somewhere or there's an error that's given if the start date and the end date are the same because we don't really have one day schools. Just certain things like that, maybe parameters in these fields that could help us ensure that we aren't accidentally making a manual mistake.


**Speaker 1** `[05:53]`

Okay. So there are one day schools or there are not? There aren't.


**Speaker 0** `[05:56]`

They are not. We only have two and 3 day schools.


**Speaker 1** `[06:00]`

Okay. So this one should the end day should not be the same. Okay? Right? So the date is actually a problem. Is that correct? Correct.


**Speaker 2** `[06:06]`

Yeah. It is.


**Speaker 1** `[06:08]`

Okay. Cool. Awesome. Now if you go back to the report itself in Google Sheet that you are showing it yeah. So. I wanna check with the tickets in here as as a column and the amount planned.

Is that something that is important for you to get, like like, a value? Because one of the issues that you're referring to for the tickets itself, when you're seeing the report, on the report, it's going to give you all the deals, which are all the students that are assigned to some school. So even though the tickets, it will say 4, it doesn't mean that that person is like it's just that person 4, and then some are missing. Like, oh my god. This one has no ticket. It's like, okay. This one is 4 because it has two schools and also bought two schools for his wife, let's say. So that's why it has 4 tickets. So the ticket itself as a number in here, I don't know if it's going to be valuable for you to see it in that way that we have it in Hubspot. So my question here is, like, if you're seeing the individual students for each school, like, in the report, you're seeing old students with all the schools, is this call you really valuable for you?


**Speaker 3** `[07:44]`

I think it is just because some of them are missing, and that helps to tell if it is the secondary person. So, like, if if somebody purchased it for themselves and another person, the secondary person will often have a zero or nothing there for the ticket, and then the primary person who purchased it will have two. So it kinda helps to tell if this if this is missing the secondary school information here, like they purchased one person purchased two tickets to for themselves from one school and another school versus if they purchased.

Two tickets for themselves and their partner for the same school, if that makes sense.


**Speaker 1** `[08:35]`

Yeah. It does. Well, yeah, I totally understand. It's like if there's a second school, if the second school data is in there, like a validation point.

Yeah. I understand it. I just wanna you guys understand that the tickets in there, it just doesn't mean that that person bought all the tickets or has all the tickets and why someone else doesn't have it is because of that, that what you just mentioned. I just wanna make sure that we're all clear what this means, and if you need to see if the additional person has two tickets as well, there is a new process that we need to kinda figure out if you want to see each person with a ticket number, if it makes sense. Because I think, Juan, you asked, what if the person buy 3 tickets? Why the person buy more than one ticket?

Each time so how the process is working is, like, each time they are buying a ticket, they are attached to a school. So when they're attached to a school, you when you're seeing on the report, you're seeing all the students. It doesn't matter, like, one student can can repeat multiple time if they're attached to multiple schools. So if they bought 3 times, they will show up 3 times on the report, but they will be attached to 3 different schools. So it doesn't really matter if you're seeing the ticket number or not because you will see them multiple times on the report.


**Speaker 2** `[10:05]`

No. That that that is perfect. You know, I I mean the for that case, I mean the following. Let us say that there is a guy that want to have a nice time with 3 friends. So he bought one school for him and 3 additional friends. So at the end of the day, he bought 4 tickets. Yeah. Right? Okay. My problem is that how we pay the gurus. We pay the gurus in a combination of number of students attending the school, the guru name the guru, the the course name, and this maybe the season of the year. Okay? So our problem was the following. Okay? In the preview in the in the repo that we used to pull out from Hubspot, we only saw one single line.

The guy who bought the ticket for 4 people. Okay? So we know we knew that this guy bought 4 ticket maybe for the same school. So we can run the numbers to tell the guru, okay. You have 4 tickets to be, paid to you. That's great. When the the problem arise, when the Google tells to you, okay. Please send me a breakdown of all the students that attended my school, all the students that you are paying for me in this given month. Okay? So I just have one name that bought 4 tickets, but the guys who attended are 3 additional guys that were not in my list. Okay? So we managed in some way, maybe, Kelsey, you may want to show it to Margarita what you did.

We managed in some way with Sean to get all these 3 attendants, additional attendants. Okay? That that was why I was a little bit confusing to us. Okay? Because the degree of information that we need to provide to the gurus is much deeper than the one that Hubspot is was providing to us. Okay?


**Speaker 1** `[11:58]`

Okay. So that's why I'm saying, like, if you are fully focusing on the ticket number, you will what you mentioned right now, I'm just seeing one person that bought 4 tickets. But all of those 3 other people are also put into the additional email part. If they're put in there, the all 3 people have a deal. So all of those 3 people will show up on the report. Now if you need to know who referred those people, then in the report, we can add that as a call you referred by.


**Speaker 2** `[12:31]`

So for No. I I don't need that. Sorry for interrupting. I just need the names of those guys who are going to attend this call. Perfect. That's all.


**Speaker 1** `[12:39]`

Awesome. So in that case, though, all of those 3 additional people, they do have a deal for itself, and they all have a closed one, and they all have a school attached to it because John is actually and the team, they are focusing on that, seeing how many additional emails. They're updating the deals all the time, like, with names and everything that needs to have. So they're monitoring that process. So each practically, each student has its own deal and is attached to specific schools. So you will have them into the report when you're exporting them. But as you're saying, in one line where it says only 4 tickets, you're not getting the 3 additional people in the same line. But you will get those 3 people somewhere in the report, but you you won't know that they're coming from that line at the above that says 4 tickets.


**Speaker 2** `[13:38]`

Well, you know, Kelsey, maybe you want to show the, sorry, the previous screen that you you were showing to us. Kelsey found a way, okay, to to tie the secondary attendance to the the to the to the deal that were sorry, to the guy who made the original payment for more than one ticket. Okay? So this this is more or less a way that she found to get the full list of students that are going to be paid to the gurus. Okay? This is this, you know, this is much much better than we used to have. You know? Frankly speaking, we cannot dip you know, we cannot go deal by deal for those who bought more than one ticket and you know, pull out information.

Frankly speaking, no one we were not able to do it. Frankly, we don't we'd look on the reporting side of Hubspot, frankly speaking, before this new query that Kelsey prepared yesterday, frankly speaking, we were not able to do it. So this is a really nice progress that she made for us.


**Speaker 1** `[14:45]`

Oh, I see. Okay. Kelsey, let's see it.


**Speaker 3** `[14:48]`

So it's just the these columns, like you were saying, the referred by. I just added those in to the primary person who purchased it. So we'll have their name on there, and then going backwards, it when we look for this person. John was telling me to find the it then the other way around would be to search for additional email addresses. So.

For the other one, we can go backwards and find their email address of Nick, the other guy who's the secondary person for this purchase. This one is actually split halfway where it has the purchase amount and one ticket on each of them, but a lot of them will have like, this one here, it will have zero and blank, and then some of them will have 5,000 on each one and then one ticket assigned to each one, then other ones like this one will have half and half. So half of have it all underneath the person who paid and then zero tickets and zero amount towards the secondary person. So. I just added in these two columns here so we could go back and link them together and make sure that they're all there.


**Speaker 1** `[16:05]`

Okay. Cool. So how are you getting that data in Hubspot?


**Speaker 3** `[16:10]`

This I have from.

In the reports, I just went and grabbed the referral column.

Forgot to add more in here.


**Speaker 2** `[16:42]`

That should be.


**Speaker 1** `[16:51]`

You had more in their reports. Maybe it's not this one. With the same name?


**Speaker 3** `[16:58]`

I think it's the same name. Customize.


**Speaker 2** `[17:01]`

Customize is what you're giving me.


**Speaker 3** `[17:07]`

So. I just grabbed the referred by, and then please add additional email.

For those two other fields.


**Speaker 1** `[17:20]`

Yeah. Yeah. Exactly. So the process that is happening for these additional people is when the closer is adding these additional emails in here, this in this field, this is creating a deal for these people, and it's attaching them to the schools that the original deal has, and this referred by then is added and say, okay. This person was re like, in here, as you can see, please add any additional emails. If you see the email in here, this means, like, this was the original deal, and then where it says referred by, this is like, okay. This deal was created because of this action, because of this email. A deal is created, and in here, we are saying, oh, okay.

This part this deal was created because it was referred by this person. So you will see all the the the students in there. So if you're seeing those students this way, you know who they're referred, and you know the additional emails and all that. Like, is there anything that is super valuable for you that you're not getting from Hubspot so we can get you that in the report? Like, is there something that is stopping you from, you know, getting your job done at this moment?


**Speaker 3** `[18:45]`

I think the main issue that we keep running against is the amount of manually entered information. There's just a lot of room for discrepancies. So if maybe there was, some of the fields were dependent on each other, like the if you select a certain guru, the the courses are dependent on whoever you select or different things like that because right now, it's just it they could put anything in there, and it's there's I mean, humans are humans, so there's a lot of room for error, and like, this one here, the I don't know if it's possible to have these two areas here dependent on the golf schools here, but this here does not one school matches, and then the other one is just a duplicate of the the the school, but it doesn't actually match what the school is here. Yeah, and they're both listed as school one, which doesn't really make sense. So this school here, school two, matches this one, but this is for September 23 25, and these are both for April. The city location here doesn't match this course name here.


**Speaker 1** `[20:08]`

Yeah. Because they need to be tagged as school one and school two to actually avoid this is because we put this on the deal level so that there is some visibility. However, in Hubspot, you can create a report where you can pull data from two objects. We can which is, like, you can pull the data from the deal, and you can put it pull the data from the golf school. So you don't need to rely on that data on the deal itself, but you can pull the data from the schools itself. I think we already shared some report with you guys about that. If we don't have it, we we I don't know which one that was, but I can share that again with you so you can see how we're doing that.

So that is, like, created a mixed report where you're not just using the deals, but you're using deals and golf schools. So you're getting the data from the golf school itself, and in there from there, you can take, like, what is what is the what is the name, what is the guru, what is the course, and all of that. Just because sometimes if the schools when they're adding the schools, if they're not labeling them as school one and school two as in the example that you saw it, if we don't have that on a deal level, that is more for visibility. We still have the data in Hubspot, but that is laying into the schools as objects. We can still pull the data. That's why I'm saying I need to understand what you need so we can create you the report and pull the data from the objects that we we can actually pull.


**Speaker 2** `[21:42]`

Okay. I. I understand that, but wouldn't it wouldn't be much, how to say, helpful to prevent these mistakes to happen at the deal level by, you know, a link in the golf school table with the deal one. Because if in that way, you know, the golf school table will prevent you to make mistake at at the at the deal level. Okay? Because you cannot assign a deal within the school that doesn't exist in the in the school's table.


**Speaker 1** `[22:11]`

Yeah. I understand that. However.

There is a little bit of complex process in here, which is like a deal screen in the specific courses or specific schools attached to them. So if we if we get the data for school one, school two, they need to be labeled properly, meaning meaning the school one needs to be labeled as school one. The second school needs to be labeled as school two, and it's not something we can automatically do it. It needs to be manually done it. So that's what I'm saying. Like, if we want to get the right data in here, we can play around with the reports and not relying on those fields. Like, if you need that, we can get from the school objects, and we can even remove those fields.

If if we're getting troubles with those fields, we can even remove those fields from deal level because we can always get the data from the school objects itself. But you don't need to rely on those fields entirely. What I'm trying to say is, like, if that is not working, if there's, like, a lot of room for mistake, that's fine. Like, let's not use it. Let's just use the school objects, get the data from there. I will show you I will send you a link on how that report can be created. Kelsey, maybe you can, like, play around, see whatever works with you guys best. You can do that. Right, and from there, we can see how the data is going, and if you're seeing something, then we can see how we can process from that.


**Speaker 2** `[23:42]`

K. That I feel that will be, you know, another option that we should explore. If you can share that info with us, that that will let us check which one works better. Okay? The one we have, we we already know what, you know, what mistakes and things we we found in there. Maybe use using the other way, it will be much easier for us. Let us check us which one was works better.


**Speaker 0** `[24:07]`

Can I just confirm some information here really quickly? I wanna share my screen because I I also just wanna understand, like, what is all the info that you guys fully need, at the end of every month? Like, what is needed? Because I was thinking is, like, what do we need for every school and every ticket? We need school name. We need it to be correct. We need start date, end date, and guru name. All of those to be the exact same. They have to be typed the exact same way. They have to the, you know, the start date and the end date have to match how many like, the length of school. Right? All of that needs to match, and those are some of our manual errors.

Right? So we can fix that. I can work with John on that. I can find ways with Margarita for us to, like, cross check and make sure those are done correctly. Right? Now for every attendee, we need their first and last name. We need their email. We need when they were enrolled into the school because only when they're enrolled into the school is when we pay the coach or the guru. Right?


**Speaker 2** `[25:03]`

Yes. So this is this is the field this sorry for interrupting. This is the field that is known as initial billing date on Hubspot.


**Speaker 0** `[25:11]`

So but here's the thing is I don't think initial billing date is the best. I think we need a new field for this, like, date. The reason I say this is here's a use case for this. Let's say someone purchases two tickets today. But one ticket today, June 26, they purchased a Martin Truck School. But the the next ticket, they don't they don't decide yet. It's an open ticket, technically. The open one.


**Speaker 2** `[25:35]`

So.


**Speaker 0** `[25:36]`

If they pick their ticket on July one, we're no we're not gonna pay the coach for that ticket. It's gonna get missed because we would say it was June, but we've already reconciled all of June's data, and we've already paid it all of June. So I think we need an enrolled date per ticket. So every time that we enroll a ticket, we have a date attached to that, and that is the date that we go off of personally. That's what I think is the best move. Margarita, Juan, let me know if you have any thoughts.


**Speaker 1** `[26:07]`

Yeah. I have a question. What. I'm sorry. Go ahead. What will be the enroll date? Like, why when will be that? Like because we have initial date when they're paying. We have a date when the deal is moved to a closed one. So when is this date? Like, what is the action that is actually triggering this date?


**Speaker 0** `[26:29]`

When we attack the golf school. When we golf school object is attached. Okay. Like, when do we make the action in here that we add someone's name as an attendee here? Right? When do we do that? That is the date that's most important. Because. I'll see if I can find a use case here really quickly. If I find closed sales, we have one that I wanna say I found this recently is.

Again, we'll get two school sales. I don't know if I can find this, but we'll get two school sales, and they just won't pick the next school yet. Like, it's just to be determined, it'll say. So we need to be able to say when we actually make that decision. Yeah. So choosing today. So what if this person doesn't choose today? Their first school, they pick this Cameron Mccormick school, but second school is to be determined. So if they don't pick it today and they pick it next month, we need to we can't just say initial billing date. It has to be when we actually put on this person's deal.

The.


**Speaker 1** `[27:47]`

But I'm seeing what is happening, and John is here. He he can correct me if I'm wrong. But when a deal is closed, you guys are adding the schools right away. Is that correct, John? Like, how is that happening at this moment? Yes.


**Speaker 0** `[27:59]`

They are. But here's what I'm saying is what if this person because we have two school sales, but they don't always pick the second school when they purchase is the issue. So we don't have a second school yet. We do have one here. But let's say this person never picked this school and they picked it next month. If we only base the payment off of the initial billing date, but they enroll we don't have anyone enrolled in the second Martin Chuck school. How are we supposed to know to pay Martin Chuck in July? That's the issue, is we don't because we're only basing it off of the June initial billing date. So we would then have to go back and see we we just don't we wouldn't know. Right? We don't have a second.


**Speaker 1** `[28:41]`

I see the issue now. Okay. So what if we base this one based on the labels? Because as you as you can see here, school one has a label, and there is a data for school one. For school two, there is no label on the school, and how you're adding the the label is not like that. If you, like, turn it off and yeah. If you more, if you go on more on the right, edit association labels, and in here, they need to put school two. When they'll put this one, then the school two data will be filled out.


**Speaker 0** `[29:17]`

Yeah. Is this person already yes. They're already in here. So my thought is, like, when we have their name populate here, why don't we just have another field that say, like, when when this happened? Like, what was the action date to put them in here? Right? Yep. That's what I'm saying.


**Speaker 1** `[29:31]`

Like, they are adding them after they close the deal. So practically, they are in here after the deal is closed.


**Speaker 0** `[29:37]`

The date My thought is, again, this is where manual error can come in, is why are we why would we make it dependent on this action being taken manually where we say association is school one when it's obvious, like, we see that this person doesn't have school two associated yet. Like, that's that's a manual error, and John would have to go in there. So the use case would say, what if John forgets to do this and we only catch it next month, then when we actually put in that date, it it would get missed, and again, we wouldn't be able to go back. So my thought is when a when an actual golf school object is attached to a deal or vice versa, when a deal is attached to a golf school, we have an action date for that. Right? That action date is when we say they've been added or enrolled to the school.


**Speaker 1** `[30:31]`

Are you saying.


**Speaker 0** `[30:32]`

That trigger.


**Speaker 1** `[30:33]`

Are you saying they should not add the second school until they know the start date?

I said not adding in here on the deal level?


**Speaker 0** `[30:45]`

No. What I'm saying is again.


**Speaker 4** `[30:49]`

I was gonna ask about an easy there we go.


**Speaker 0** `[30:50]`

So so this person purchased they purchased two tickets. Yeah. Ticket was assigned to Cameron Mccormick. The second ticket again, let's say this wasn't here. Let's say this this was not here. Right? We have a lot of people who don't pick their second school for a month or two. So they've bought a ticket, but it's technically an open ticket as a second ticket. Right? Okay. So first ticket is assigned to a school. The second ticket, we don't pay a guru out on it until it's assigned to another school. Right? So we need so, again, let's say this wasn't here. When I actually go in here and add the second school and I say the golf school name is Martin Chuck, whatever, golf school owner, we we put in all these things.

Sorry. This is existing. But when I actually put in another one that says, hang Haney, as soon as I click, I mean, as soon as I click save if I click save, as soon as that trigger happens, that's when I think we we do it. Right? Obviously, John should say school too. Right? It should happen. But let's say he misses it, I still want us to have a fail safe on it.


**Speaker 1** `[31:58]`

Yeah. That's fine. We can trigger a date on it. What I'm trying to say right now is I don't know if that's how you guys are doing it right now. Like, if they don't know the date. They don't know the date if you are attaching the school to the deal or not.


**Speaker 0** `[32:13]`

What do you mean they don't know the date? Like, we know when the school is happening. We know the date of the school. They just don't know which school they're picking. They have in front of them a list that looks like this in front of them where we have to say, hey, John or hey, Adam. Which school do you wanna go to, and they say, hey. I I don't know yet. I have to check some dates. I gotta check all my stuff, and maybe they get back to us two months later. Right, and they say, hey. Now that it's two months later, I wanna go to this Landon. Michelson school, and then we're gonna go in and add them to Landon Michelson's.


**Speaker 1** `[32:47]`

Okay. But until that time, they on the deal level, they have, like, an open ticket school connected? Okay. Well, that's fine. Like, if that well, in that case, if that that can still work.


**Speaker 0** `[33:00]`

Is is that what's happening, John? Like, when this guy didn't have a school associated to him, did we go in here and add a golf school to say that it there was an open ticket assigned to him, or did we just leave the blank?


**Speaker 4** `[33:14]`

Yeah. The school one and school two was actually announced late. So some of those those doesn't have the school one since there was no school one and school two before. Some of those doesn't have the school one, so it doesn't apply to everyone. That's why it's like that. What I'm thinking right now is maybe we can have what David wants. Once we enroll someone adding a school, there's gonna be a field there. Yep. Aside from the school one and school two, that's automatically filled out like a date that we can also edit out manually so we can correct some mistakes later on, then then adding the school one and school two also is a good thing as well. We we should keep that. So when someone enrolls a school, a date automatically fills out, then we can filter that out, then that's the enroll date.


**Speaker 1** `[34:14]`

Okay. We can have that. We can have a date when the school is attached to it, but the labels needs to happen because we need to know for what like, which date we need to update, which field, school one or school two.


**Speaker 4** `[34:29]`

Yeah. So we need to keep the school one and school two and have the date attached to that school one and school two as well.


**Speaker 0** `[34:36]`

So this needs to happen. Like, this school two thing is, like It needs.


**Speaker 1** `[34:40]`

To happen because we need to know for which fields we need to update.


**Speaker 0** `[34:44]`

So.


**Speaker 1** `[34:45]`

Here's the thought then So can we make that mandatory?


**Speaker 0** `[34:49]`

So when we add a school and we add existing and we say this one, we go next, do we can we make it mandatory where we have to have an association label? Like, it is you cannot click save unless one of these two are clicked.


**Speaker 1** `[35:04]`

Need to check that to see.


**Speaker 0** `[35:07]`

Because that's the fail safe is I I can't have it where John maybe has a day where he swamped one of his coworkers.


**Speaker 1** `[35:15]`

Totally understand it.


**Speaker 0** `[35:16]`

Yeah, and he's so rushed and he misses that, then it it then falls on on Juan and Kelsey and creates issues. I can't have that. I need there to be dependency here, and if we can find another way where we can. Because we are having a lot of manual errors, and we need to eliminate as many manual errors as possible.


**Speaker 1** `[35:33]`

Yeah. Okay. I'll see if we can make that mandatory. But the moment when that is filled out with them, we can push the enrolled date, and we'll say, okay. This is enrolled date for school one. This is enrolled date for school two. So you can two different dates.


**Speaker 0** `[35:48]`

Yep, and the thing is, like, if we accidentally pay someone, like, a month late, let's say, like, I I think the the error should be in the future, not in the past. So if we have an initial billing date of. July 20 or June 23, but the enroll date is June or July one, I would rather that be the issue than the opposite issue where we're basing it off of a date where we've already paid and we're not looking at anymore.


**Speaker 1** `[36:14]`

Okay.


**Speaker 0** `[36:15]`

So that's the right one. You.


**Speaker 2** `[36:17]`

Know, that suggestion is really good because we in that way, we will save a lot of issues that are, you know, always related to open tickets. It's very it's very hard to follow up open tickets. Okay? So in that way, the enrollment date would be amazing because we will come not to track any more open tickets.


**Speaker 0** `[36:43]`

That'll be awesome, and then yeah, what we can do is we can just have, like, an empty school maybe and just, like, if a ticket like, if someone buys two tickets, we just add in the golf school on the right hand side as open ticket, and we just let it.


**Speaker 1** `[36:56]`

They're doing that.


**Speaker 0** `[36:57]`

And then we can remove that open ticket school and then add in the actual physical school once we we do that, and then we have all of the dates that track the activity that we do that. I think that's the best way to do this.


**Speaker 3** `[37:10]`

Quick question. For the enrolled date, would this help with going backwards? Say somebody picks a school, pays for it, they have been paid, and then two months go by and they're like, my wife's having a baby then I can't attend this school. I wanna change it to a future school, and it turns into an open ticket. Would this enroll date help with that, or would we need both to calculate, like, when this was paid? So.


**Speaker 0** `[37:39]`

Actually, this is a good question for you guys for context is do we claw back that payment? So let's say we go to a school with with Martin Chuck, and then they say, hey. My wife's having a baby, and then they go to a school with Cameron Mccormick, and they switch it to another coach. I'm not sure if that happens. Do we claw back the payment from Martin Chuck and then give that payment to Cameron Mccormick? Yes? Yes. So we might we might need a we might also need a date, Margarita, for, like, removed from school or something like that. So if we remove someone from the school, then we know when that happened as well so that we can also kinda side by side say, here's the enrolled day, but we also have two people who got removed that have been previously paid out, and we have to be aware of that.


**Speaker 1** `[38:27]`

Okay.


**Speaker 0** `[38:28]`

Is there another use case for that, Kelsey?


**Speaker 2** `[38:31]`

We sorry. For removing for removing students, we have two cases. The one that the student who who who who transferred from one school to the other one, the student that is directly refunded. Okay? So these are sorry, Kelsey. I don't know if you were to mention this or any different thing, but that is something I wanted to add.


**Speaker 3** `[38:52]`

There is one other instance that I've noticed recently too. For example, they may just change from one school to another with the same Guru. However, this does affect their prices because Gurus have different amounts they're paid per school. So for example, Terry Rice emailed me about a list of about 10 students, and she asked when each one like, when their payment came through, and some of them started out. They paid in. February 2024. They moved to one school. They couldn't attend that school. They just decided to go to another school. They were an open ticket for a bit, and then finally, they joined this this school. So that also needs to we need to figure out if a student is maybe a repeat student, so they did attend each of those schools, or if a student moved from this school to this school to this school within the same Guru.

If that makes sense.


**Speaker 1** `[39:54]`

But you're removing them and you are adding them to another school?


**Speaker 3** `[39:59]`

Yes. So if they couldn't attend the. March 2024 school and they decided to move and join a September school in 2024, then they decided they also couldn't make that school, and they were just an open ticket, and they just stayed with an undetermined open ticket until this year in February, and then they decided that they wanted to go to a school in June. So this has already moved from one to another to another school, but it's the same Guru. It's just different schools in different locations, different time frames, but that Guru is paid different amounts for the different schools.


**Speaker 1** `[40:48]`

Okay.


**Speaker 0** `[40:49]`

So I just wrote it out just so that, like, that might make sense. So use case, if someone goes in March, they enroll, and then February 28, they say, hey. My wife's having a baby. I have to move it. They move it to June. If we paid the coach, Martin, 2,500 already, But in the middle of summer, Martin's more expensive, let's say, and we have to pay him for that school ticket for every enrollee or attendee $2,800 for the school in June. We have to be able to make up the difference. So we just need to be able to understand, again, based on a transaction log. Okay. Well, we can kind of remove 2,500 from Martin because we removed him from that school. Now this person has almost, like, what's, a $2,500 credit, and then we put $2,800. So we need to pay Martin the difference of that 2,800.


**Speaker 3** `[41:41]`

Yes, or just whenever they turn into an open ticket, deduct it then Because at that point in time, they may plan on staying with that guru, but open tickets can be there for about a year. So after a year, they may move cities and decide to go to a completely different one. So if we deduct it at the time they cancel.

And then treat it as a new student, kind of but so we can't really go off of an initial payment date on that one.


**Speaker 0** `[42:12]`

Yeah. This is a whole different set of dates that we need to have.

I know it's complex.


**Speaker 3** `[42:22]`

Super fun.


**Speaker 0** `[42:24]`

I hope you're enjoying your your first day back with us.


**Speaker 2** `[42:27]`

No. You know what you know we really like open tickets. It's a it's it's a it's an amazing work.


**Speaker 1** `[42:34]`

Okay. But you always need to know the last enroll date.


**Speaker 0** `[42:41]`

But we all know the last, like, disenrollment date, essentially. Like, we need to have both of them. Right? So if we can have a disenrollment date, then we basically, that lets us know, okay. In June, we get to claw back $3,000 from Martin Chuck. But, also, we have this many new enrollments. So they're they're two separate entities and two separate actions. So as long as you have a a disenrollment date I guess that's difficult, though, because if you're going based off of the school one and school two, then you're only linking it to that and that's their second school or their first school, then like, are the enrollment dates gonna change if we add them to another school?


**Speaker 1** `[43:24]`

So we can have enrollment per school, and we can have one date that will be, like, general, most recent enrollment date. This will represent the last action, which will be the last school that is attached to the deal. We'll trigger the action, and we'll save that as a date. I think matter which school it is, we will have most recent enrollment date and most recent remove date. I don't know.


**Speaker 0** `[43:53]`

If the most recent unless it locks on that deal, I feel like it has to be very specific to that golf school object. It can't just be a general when did we move and when did we not move. I think there's too much complexity here. I think it has to be a date that sets and almost locks with each golf school object that we add. That's why I was thinking, like, when we actually make the like, why don't we trigger it as the date that we make the action of adding them or adding that golf school object to that deal or vice versa? Because if we don't do that, then if we say last click, it's the same issue that we have with last click UTMs is they get overwritten or they can get overwritten, and it can cause issues with the third click that they made or the second click that they made when they've made 5 clicks. We just don't know what's happened in between, and I just don't want that to be the case if we move one person around into 4 different schools. Yep. So I'd rather each action with each object in mind to kind of lock towards that object if that's possible.


**Speaker 1** `[45:03]`

So practically, you have to have a date for each action. So, like, action happened on June. We have that as an action, then another action happened, I don't know, in July to have that safe as well as a July, but not overriding the June date.


**Speaker 0** `[45:19]`

Yeah, and I don't know if we could have, like, an array of this. I don't know if you can build out arrays in. Hubspot. I know that's a little bit more complex.


**Speaker 1** `[45:35]`

I don't know. I will need to think how we can make it.


**Speaker 4** `[45:38]`

But can we make it as a filter instead, like, a new box for the date that's automatically been filled out? Like, a disenrollment date, enrollment date. That way, we can also manually edit it out. Because sometimes we have someone enrolled today, then they change their mind the next day, and it's within the month. So if we rely on the action, that's gonna trigger the action, and it's gonna be an incorrect report.

Right?


**Speaker 1** `[46:11]`

I mean, if it's just for one action, let's say.

I think it will be fine. I think the the most complex part in here will be if we need to log each action, each removal, and each, you know, adding part into it because each every action needs to have its own date few days this year, and like, we can't go just with date as a field because. I don't know how many days we need to create. Like, I don't know how many times someone can change their mind. 10 times, 20 times, do we need to have 20 fields? Do we need to have 30 fields? Like, we can go from that part. So the only thing that's come to my mind that we probably can do, I need to speak with Robert about it. Maybe we can use tickets for something, the ticket field so we can count.


**Speaker 0** `[47:10]`

Something like that.


**Speaker 1** `[47:12]`

When each action happens, then create a ticket for it as well so we can have this as data as a data in there, and each ticket will have its own.

It's so, practically, this the deals will be used for salespeople. The tickets will practically bill for Juan, Kelsey, and everyone else that needs to export reports just for the gurus, the tickets objects, and then I don't know. I will need to think. I'm just talking right now, but I need to see how we can implement it. But if we need to know the date for each action and it's and that is repeating multiple times, we need to find a better way to track it, not just with a specific date.


**Speaker 0** `[48:00]`

Yeah, and I guess how often does that happen? Like, how often are people refunding, moving schools? Like, is this, like, 5%, 10% of every ticket? Like, what's I mean, we have, like, a 10% refund rate. So 10% of transactions do refund typically anyway, and then moving schools, maybe add another 10% to be conservative or 5%. Like, that's I think it is a pretty big impact. So a good long term solution, I think, we can take some time on. Do we have all the data that we need this month, Juan and Kelsey, or do we still have questions and things up in the air if it is a little bit difficult over the next 4 days?


**Speaker 2** `[48:40]`

No. We know we have the data, but we track them manually. You know, and as as you may imagine, this is subject to error, and to be honest, in the in May, some groups get really angry about about certain refund that the company decide to make. Okay? So this is the reason why we need to make careful about refunds and things like this because some guys get angry very easily, very, very easily. You know?


**Speaker 0** `[49:09]`

K.


**Speaker 4** `[49:11]`

I have one question for you, David. Is it possible or what does happen if we divide the the deals? For example, we have 10 k deals. What if we create a new deal, duplicate it, and divide it? So one deal has one school.

So in the reports, there there are gonna be two entries instead, so it's gonna be easy to track. So for example, if someone brings a wife, we're gonna divide that deal as well, or if he has two schools, one for this year, one for next year, that's two deals. That's two initial billing dates, two enrollments, two schools.


**Speaker 0** `[49:53]`

So only one deal per school, essentially. We'd have to duplicate it. So if we have.


**Speaker 1** `[50:02]`

Mean issue we are trying to solve? Is the initial data issue?


**Speaker 0** `[50:08]`

The enroll date and the disenroll date, essentially, is what we're trying to solve for. But we also don't want it to be overwritten because we wanna be able to see historical data. So if we use a last click attribution and we overwrite it, then we can't look at what was there previously unless we look at the details, but we can't just do a quick export and see each transaction log essentially. Right? Because if someone changes schools. I mean, I guess if they change it in a month, we haven't paid them out yet.


**Speaker 2** `[50:39]`

Or, you know, use a different logic. K. When someone disenroll, let us create a new deal, and when he get enrolled, let us create AAA new deal. So it one deal for for movement. Okay?


**Speaker 4** `[50:52]`

That's what I'm thinking as well.


**Speaker 2** `[50:53]`

Yeah. You know, that would be the the this is why. You know, let us say that we will have a a waiting list for those open tickets. Okay, or we may create a deal a new deal when the ticket is open, and then when the guy decided to Okay.


**Speaker 1** `[51:09]`

I think we can another.


**Speaker 2** `[51:11]`

We can sell the open ticket or the open deal, and then we create a new deal. Just suggesting. Okay? I'm not saying this may be the the right solution.


**Speaker 1** `[51:21]`

Okay. So what you're saying is, like, if if a person actually attends to school one but wants a refund to school two, then if you move the deal to a refund stage, it will say your export that it's refunded, but he actually showed up on school one.


**Speaker 4** `[51:42]`

Yeah. Whereas if we have a separate deal for that open ticket, then that specific deal as an open ticket gets the deal stage changes to refunded, and it doesn't affect the school one.


**Speaker 0** `[51:55]`

What if you have ticket stages? I believe let's go back to your ticket idea. If you have ticket stages in, like, a different pipeline where you have a ticket stage as open ticket, ticket stage that is, like, preschool, one a ticket stage as a post school, and one that's, like, refunded.


**Speaker 1** `[52:12]`

We could do that.


**Speaker 0** `[52:13]`

We could do something like that too. So rather than having to split up deals because that would cause complexity on the sales side.


**Speaker 2** `[52:20]`

Yeah.


**Speaker 0** `[52:21]`

At stages for tickets, that might make more sense.


**Speaker 1** `[52:25]`

Okay. So, practically, when you will save 4 tickets in there, we will create them as tickets. How many tickets are sold? We can create them as tickets tickets, but we will need to get the data, and then the tickets need to be connected to the school. I think that was the initial idea that we had, David, at the very beginning.


**Speaker 0** `[52:47]`

And we have I I can't remember why we didn't do that, but I wanted because, ideally, at the end of the at the end of all of this, I wanna be able to say, if we have two payments, we can track these two payments to this ticket, and this ticket links to this golf school, and this ticket also links to this deal. Like, I wanna all be able to be amalgamated, and that was the goal. So that might be the best way to to rethink this.


**Speaker 1** `[53:13]`

Yeah. Okay. I think we had a process for the tickets at the beginning, so we need to see how we were thinking about it, and then we can start doing that. But we can start doing that for the next month, I guess.


**Speaker 2** `[53:31]`

For sure. We we will manage this month. Okay? We we are well, you know, with the improvement that Kelsey made to the table she showed to you to you just 5 minutes ago, you know, we are we are in much better shape than we used to be a week ago. So we can manage it. But you know what? We cannot do is to keep this sustainable over the time because we are relying on manual adjustment to make the payment. That's that's the reason why. But, you know, I I feel that everything that we have discussed in here are a lot of value and make a lot of sense. Okay? Because I feel that we may simplify yes.

For sure, I do agree with David. No. No. No. No. No doubt about it. But, you know, what we cannot do is continue continue doing what we are doing because it's we create a lot of complexity for payments, and frankly speaking, as you may understand, the gurus population is very, how to say, sensitive to errors, to mistakes. So this is the reason why we are pushing this button, to be to be honest.


**Speaker 1** `[54:32]`

No. I appreciate I appreciate you being loud about it because we still need to see what is making sense for you guys. I understand that we were focusing on sales and the sales part of it pretty heavy. But I think what you showed so far, I think the data is in the air in Hubspot. We just find we just need to find a way to pull it for you guys in the reports. After this meeting, I will show you in the Loom how to get the data from the golf schools itself so you can get a better data on it, and additionally, for the first name and last name, John, now that I have you, I know you guys are updating that kinda manually. So what we added in here on a deal level.

Let me show you my screen just a quick. Where is the screen? I think it's this one. Yeah. K. I have so many screens. What we did, John, is we added in here contact first name and contact last last name because I think this is the two fields that they're seeing in their reports. So when your guys are updating the deals, just make sure that you guys have these two names as well for the additional deals.


**Speaker 4** `[55:52]`

Okay.


**Speaker 1** `[55:52]`

And that will do the trick for them to have the first name and the last name as well.


**Speaker 4** `[55:58]`

Okay.


**Speaker 1** `[55:59]`

And I think, yeah, I think that will be it. I think that will be helpful for you guys.


**Speaker 4** `[56:06]`

Can we also check the what David referred earlier if we can make the school one and school to mandatory? So the closers once.


**Speaker 1** `[56:13]`

Yeah. I will do that, actually. Yeah. I will do that, and also, I will check with the tickets part as well so it will make more sense for you guys. So we can go with that as well.


**Speaker 4** `[56:25]`

Also, with the school one and school two details, the one the ticket I raised last week, I think, which they're not filling out correctly. That's why the errors. Kelsey raised was mentioned.


**Speaker 1** `[56:40]`

Yep. Yeah. We will fix that first for them with the way how they're seeing it. They will pull the data from.

From the schools itself. So they're not going to pull it from the deal level, but they're going to pull it from the school level as well. So we will do that, and we'll see why some of those don't have oh, here's how it was additionally. So each buyer was getting a specific ticket, and that ticket was connected to a deal, and it should be a tech connected to a school as well.


**Speaker 4** `[57:19]`

Maybe can I request if we can have something like if you remember we have a yes, or no with the add additional emails that triggers the information to create a new deal? Maybe we can have something like a trigger as well where we can put yes, or no as well, then the school information in the golf school one and two will be transferred.


**Speaker 1** `[57:41]`

Oh, yeah. We can we can maybe we can implement that. That's a good idea, though.


**Speaker 4** `[57:46]`

Yeah. So once we have someone change their schools, we can have the trigger set, then the new school information will be input in the That's right. Yeah.


**Speaker 1** `[57:58]`

Yeah. Yeah.


**Speaker 4** `[58:00]`

Because error happens occasionally when someone changes their mind and they transfer to a different school, then the original school information in the golf school one in golf school two deal date details remains the same. It's not updated, so we are now manually updating it once we recognize that error. So the previous errors were not actually corrected since we don't have record record anymore. Okay.


**Speaker 1** `[58:27]`

So we can have that trigger.


**Speaker 4** `[58:29]`

So it's easily filled out.


**Speaker 1** `[58:32]`

Yeah. We can we can have a feel with that as well for sure. Thank you. Okay. Cool. Awesome. Okay. So that was it for you guys. Do you have anything else beside David? Because I have questions for David as well. So cool.


**Speaker 2** `[58:52]`

No. I guess no for me.


**Speaker 1** `[58:55]`

Awesome. Cool. So you you can stay if you want to, or you can leave if you have more work more work to do. But I have questions for David now. So David.


**Speaker 0** `[59:09]`

Okay. How.


**Speaker 1** `[59:11]`

Is the dialer doing? I haven't heard anything.


**Speaker 0** `[59:15]`

Like I mean, I think it might be getting us, like, very small marginal better results. I think it just it's also difficult without them having a texting platform because we do a lot through text that's like. I feel like we we were only doing part of the process as, like, a power dialer with them, and it just doesn't seem to quite be worth it. So, really, everyone's feedback has been I like it. I like the UI. It's a little bit quicker to make dials, but they're not noticing any major differences in results because they have to, yeah. You guys are good to jump. Thanks, guys. We're just not seeing they they have to jump back and forth between platforms when they're making dials.

They have to jump to the other platform to see if they've text us both back because we do have those automated texts that go out when someone opts in. So they have to check to see, hey. Did someone, like, do this? Did they accidentally book or something with a different email? Like, there's just a lot of things they have to think about, and it's I feel like it's more worth it to have a a slightly less powerful tool in front of them, like like Aloware, when it comes to pickup rate in order to be able to see everything in front of them.


**Speaker 1** `[60:35]`

Do you feel me? Maybe we should include some notifications or something. What do you mean? What you say they need to check if someone replied or didn't reply. What happening? What is happening there? Do you think we should implement something like notification, extra notification to get them notified if someone replies so they don't need to, like, recheck things.


**Speaker 0** `[61:00]`

Well, where would that notification pop up?


**Speaker 1** `[61:03]`

Well, I don't know where they are. Mostly, are they in Slack? Are they should we get to an email? Like, what they're using mostly?


**Speaker 0** `[61:12]`

I don't think that's the case because it's from a person to person basis. Right? So, like, if someone responds back on on Aloware, I know that I think Robert made a trigger where it removed them, but, like, if it happens at the same time, right, we just don't know. Right, or if it happens before they get removed, like, we just we just don't know, and it's not like they're gonna really be like, they get enough Slack notifications, enough emails. Like, I just don't think there's a way unless it were to pop up in the dialer for them to see text logs. Like, they're not gonna be able to find it, or it's not gonna be worth it to have them put an extra tab on another monitor to then pay attention to and then try and link back. Basically, what they do is when it goes into the preview of everything on the dialer, they just pop up on another screen, look up in Aloware, and just see, hey. Like, has anyone.

Like, what's what's going on with the sleep, and I also don't feel like our contact rate is, like I mean, it is relatively good, but I also don't know how to tell that with Alawares. Like, what is our contact rate in Alawares comparatively?


**Speaker 1** `[62:23]`

Okay. I can give you that information. I can give.


**Speaker 0** `[62:26]`

That would also be good because I just don't have the the contact rate per lead or contact rate rate per dial, and I just don't know the differences between the dialers either. So, like, I'm just going off feel. I have 4 reps on this. They're making similar amounts of dials, but they're not outperforming anyone else numbers wise. Sorry?


**Speaker 1** `[62:51]`

This is pretty good. Okay. What I'm seeing is, like, the numbers that I'm seeing are pretty good. Like, this one is pretty good. This one is pretty good. But for you to get a better better understanding if it's better from Oliver or not, I will get you the same calculation for Oliver as well so you can make the comparison, see if it's working. It's painful because they don't have the texting part of it, and it's a double work for the sufferers to manage two apps at the same time.


**Speaker 0** `[63:23]`

Yeah.


**Speaker 1** `[63:24]`

And it is the problem for everyone, not just you guys. So I understand that. But if it helps with the pickup rate, maybe it's worth for for that. Yeah. That's what I need to see is.


**Speaker 0** `[63:36]`

Like, what is the pickup rate compared to that, and if it's, like, a 4% rate, okay, how many dials total do those 4% like, if I put it out to my whole team to all 15 setters.


**Speaker 1** `[63:47]`

Yeah.


**Speaker 0** `[63:48]`

That 4%, how many more conversations that lead to over a month, how much more sets, how many more shows, how many more how much more revenue, and does that justify us having the that we have, and I think that's the decision that needs to be made, but I just don't have all the data, and I haven't really had the time to.


**Speaker 1** `[64:06]`

Yeah. No worries. I will may I will have that report for you. I will dive into numbers to see what is happening, and I will give you those numbers, and then we can you guys can make decision based on it to see if you wanna move forward or not, which is, like, the ultimate goal to see if it's going to work for you or not. But you guys also mentioned that you're going to use a third app or something that you want to move from Aloher, but I don't know if if that's still a thing or that time. I mean.


**Speaker 0** `[64:33]`

It was something that Brixton kinda said, hey, Firaz. Like, we should get off Aloher. We should get everything on to Attentive, and he was Faraj is kinda like, yeah. It'll probably take a couple months. I don't know where that's at. I haven't spoken with both of them in the same call in a while. So I have to ask, but that that also might be a case is is maybe we do. But I think they also like to be able to per lead see, like, has this lead opted in before? Right? Sometimes we see that. A lot of leads opt in two, 3, 4 times. They might have a conversation with someone on Aloware, and they might have said, hey.

This is out of my budget 5 months ago. So now we have the additional context on Aloware to scroll up and say, hey. You know, I saw you chatted with one of my colleagues 5 months ago. What's right? So that's that's the nice thing about having all of this is is there is a lot of logs that go on.


**Speaker 1** `[65:22]`

Yeah. You you can see the history, and I totally understand it. I understand it, and it's good that you can, like, integrate Alware with with Hubspot and all that good stuff. Okay. Let's do let's do some digging in the numbers and see if it's worded, if it's actually doing better or not. Based on what I can see, the numbers looks pretty good. But let's see what you have in our as well, and then we can do that. Exactly.


**Speaker 0** `[65:50]`

Because I just don't know what the baseline is. I can see numbers, and I'm like, hey. These look pretty good based on what the guy told me when he onboarded me, but. I Yeah. Know what the numbers are. Okay.


**Speaker 1** `[66:00]`

Yeah. We can do that. Cool. Next question is the ads, and Rebecca, I can see she said that the report's helpful around a lot, but I wanna see how the energy is about that. How we calm down. Like, is is are the ads now okay? Like, is that part okay. Now? Because.


**Speaker 0** `[66:20]`

Yeah. Relatively, we just noticed that there's I don't know how we're counting. Like, what are we basing the date off of? Because I think I saw it was like, hey. We just need to base this off of when leaves are moved to closed one, and then so there's different dates. There's 3 different dates that we can look at, and she's like, all 3 of these dates for most deals are different. Initial billing date, date moved or entered closed one, and then closed date. So I think that's the only part of confusion as we get kinda different answers based on what we look at.


**Speaker 1** `[66:54]`

Yeah, and additionally, I really need you guys to understand that the close percentage and every percentage in Hubspot is different than in Google Sheet.


**Speaker 0** `[67:07]`

Yeah, and and that's the thing too is I think we're we're okay. We're fine on that standpoint. I think that just all needs to be in Domo. In all honesty, we can sit here and we can ask, hey. How can we do this in Hubspot? I think it's all hates Praxis or Domo, but, like, that's the only way that we're gonna be able to do it unless we, like, export the data and give different variables for different dates. But.


**Speaker 1** `[67:30]`

Well, some of the ways how the clients are doing and not the fancy most fancy way of doing it, but, you know, the Google Sheet where you're, like, updating the number, how many closes you had, how many show up you had, and from that, you're getting the percentage. Like, you can see from the dashboards, the yesterday data. You can fill out the the Google Sheet, and you can get the percentage for that day. So that can be one way of doing it if she doesn't want to do with Domo. Because I don't know the possibilities of Domo. I don't know how that will be doing and how that can be done, but I know how you can do it in a Google Meet. Domo is, like.


**Speaker 0** `[68:06]`

The ideal because we need to have everything in Domo regardless. Like, all of our our whole company's metrics.


**Speaker 1** `[68:13]`

Sit a lot of here.


**Speaker 0** `[68:15]`

The issue is we can like, Bill is the only one. So Bill only ever has so much time, and Bill is the only one that can update that because it is a complex software. So we could do a Google Sheet in the meantime so that we at least have one source of truth where, like the issue is Brixton wants to be able to look at everyone's numbers up to date, and we wanna have an automated way that we can do that. That's the thing. He wants to be able to just take a quick peek whenever he wants, have one link that he goes into, and he can see everything he needs to see.


**Speaker 1** `[68:47]`

We can embed the Google Sheet in here.


**Speaker 0** `[68:51]`

Okay. Yeah. If we can make a Google Sheet that that shows what we're looking for based on, like, initial billing date and whatever other dates that we wanna be able to to do, and we if we can do that in a Google Sheet and then embed it, like, that's perfect.


**Speaker 1** `[69:08]`

So just to confirm the process, the process with the Google Sheet is you're seeing the yesterday data, how many showed up, how many closed yesterday. You're filling those numbers in a Google Sheet, and you're getting the percentage based on that.


**Speaker 0** `[69:24]`

Yeah. So we would have to fill that out manually, though. There's no way that we could just have a workflow that populates those in the Google Sheets.


**Speaker 1** `[69:32]`

We'll see. Anything is possible. Maybe we can push them automatically.


**Speaker 0** `[69:37]`

I mean, if it's app, it's probably not worth it.


**Speaker 1** `[69:40]`

No. But you have and now you have custom codes in. Hubspot. So maybe we can push them because. I think Robert made the end of day to be pushed through here through Hubspot. So maybe we can do the same thing.


**Speaker 0** `[69:55]`

Nice.


**Speaker 1** `[69:56]`

K. Yeah. I will I need to think about it, though. I will need to see if we can do it. I mean, I need to ask Robert because I have so many ideas, and he'll be like, you guys think everything is possible. It's not well, you can make it all possible.


**Speaker 0** `[70:08]`

So Yeah.


**Speaker 1** `[70:10]`

Okay. Cool. Awesome. So are there any other issues, complaints that are currently happening, something that is freaking out the team, something you guys are not happy about? Like, talk to me. Is this something I need to worry about?


**Speaker 0** `[70:27]`

I mean, we're hiring a new setter manager, and hopefully, I move into more of, a rev ops role. I don't really know what the next month or two is gonna look like. So that's exciting, but kinda see what pans out exactly. He wants to see some more granular data. So a lot of the setter stuff, I I know you set some of it up, but he wants to be able to see, like, a lot of percentages, and we also wanna be able to start charting out so not just him, but also our our VP of growth. He wants to be able to start charting out, like, closer performance from ads and like, how many calls they took from this specific source or from all paid and how many leads they got.

Same with setters. How many reps were on the rotation that day? How many leads did they get? How many sets did they get per rep? So that we can start to see is, like, from paid ads, if we gave all of our different setters or 10 setters 20 leads each, what was their conversion rate? How many shows did they get, then of those shows, which closers took them? Right? Are there closers that are performing better than others and start to see very granular data? Those are things that will probably start to come your way or will probably start to work with you on just building out some reports like that, if possible, so that we can actually map out where are things going wrong.

Like, is there a certain closer that just ***** with paid ad leads and we need to train them better? We need to take them off of that rotation? Are there certain setters that are doing worse with it? Because the profit is a huge thing. Right, and if one setter is really tanking and their cost per acquisition is $2,000, whereas maybe, you know, the best setters cost per acquisition is 500. Well, how do we replicate. Andy who is 500 versus maybe Sonya who's 2,000 cost per?


**Speaker 1** `[72:20]`

Yeah. I understand it. That's fine. We can work on that as the next thing. Okay. Cool. By the way, congrats.


**Speaker 0** `[72:30]`

Yeah. So, yeah, nothing is, like, fully I mean, we hired the guy, but nothing else fully panned out yet. So we'll see where everything leads. But, yeah, it'll it'll be a step in a in a good direction. I didn't want to be a setter manager for forever. So I think I.


**Speaker 1** `[72:46]`

Mean, you're already managing everything. Yeah. So it's all good. By the way, is that to make you still the person who are going to have the calls with? Are you still going to jump to these meetings and all that? Cool.


**Speaker 0** `[73:01]`

Yeah. If if there's a if there's a change, I'll let you know.


**Speaker 1** `[73:05]`

Okay. Perfect. That's that's that's a relief. Thank you. Awesome. Cool. So the ads are going doing great, as I can see, based on the graphs in here and all that. I asked. Rebecca how is going if we.


**Speaker 3** `[73:24]`

Need to help on that point as well.


**Speaker 1** `[73:27]`

And I think the biggest part right now is the reports for Juan and the billing team and figure that part out for them so they're not freaking out, and are we okay. With the ads? What is happening in here with the grading part?


**Speaker 0** `[73:44]`

Yeah. I need to change some of the grading. I mean, I can always just go into the code. I know how to do that and just change the weight myself. That's pretty simple. I I we do have a lot of two I I need to get basically the grade threes. I need the bottom half of the grade threes or the bottom quarter of them to go into grade two, and then I need the bottom half of the grade twos to end up in grade one. Like, I need to start actually having a good segregation here. I kinda threw some numbers at it, but I think that's also more of, like, a a me thing, and then I'll I'll change the calculations there, and I'll just let you guys know if there's any changes that need to be made.


**Speaker 1** `[74:23]`

Cool. Awesome. Okay. So that is it. Do you have any question, though? Any anything else?


**Speaker 0** `[74:30]`

I think I'm pretty good. Majority of everything has been smooth sailing. I think once we get this new setter manager up, he'll probably have some some thoughts. He's really good. Like, he's been in and around the the space for a long time, so he'll probably have things he wants to look at, maybe some spots he wants to change, and I'll I'll probably give him the autonomy to to do those things and to test them out and to to be on these calls and to brainstorm and have ideas with with you guys here. And.


**Speaker 1** `[74:57]`

Yeah. That's that's pretty good in mind. Cool.


**Speaker 0** `[75:00]`

Awesome Well, that's everything I have. Hope it was too too stressful of an hour and 15 minutes for you.


**Speaker 1** `[75:09]`

No. Yeah. It was so good. I really needed to see you guys because those messages were really stressing me out. While I was on vacation, I was like, when when for us also, it was included. I was like, oh my god. Is everything on fire? What is happening, and then when I realized it's not that big of a deal, it's more like things you can't see because you don't know a way to see them. I was like, okay. Thank you, Brady. Well.


**Speaker 0** `[75:31]`

I I tried telling. Juan that. I was like, I think we just need to export the data differently because you guys are looking at it on the deals. We need to look at it from the school attendees.


**Speaker 1** `[75:40]`

But not told them that. Okay.


**Speaker 0** `[75:42]`

But that's the other thing is, like, I can see how the date fields. We don't know when they were enrolled. Like, we don't know when they actually became a part of that school, and then I started to think of all those other use cases. I'm like, oh, no. We just need more fields to be able to show this data and export.


**Speaker 1** `[75:58]`

Okay. Cool. Yeah. We'll think about that, how we can implement it for the next month. Okay, Allison. Thank you so much for your time today. Yeah. We'll see you next week, and we'll talk in Slack. Have a great great rest of the weekend weekend itself.


**Speaker 0** `[76:13]`

Sounds good. You too.


**Speaker 1** `[76:15]`

Okay. Bye bye.


---

## Metadata

- **Meeting UUID:** `fb6b4dd1-6a56-4fd8-ae04-febd79ef5319`
- **Transcription UUID:** `007bb6e4-f966-406d-9e16-acf1c38a62f0`
- **Recording UUID:** `957e29c5-717b-49b7-b684-54319175287b`
- **Processing Status:** notes_available
- **Avoma URL:** https://app.avoma.com/meetings/fb6b4dd1-6a56-4fd8-ae04-febd79ef5319