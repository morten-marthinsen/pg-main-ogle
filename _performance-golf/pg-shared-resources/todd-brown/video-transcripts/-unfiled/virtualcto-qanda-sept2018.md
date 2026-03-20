---
title: "VirtualCTO-QandA-Sept2018"
date: 2018-10-02
duration: 52m
duration_seconds: 3177
vimeo_id: 292833323
folder: "_unfiled"
source: vimeo
transcription: whisper-turbo
tags:
  - knowledge-base
  - video-transcript
  - vimeo
  - whisper
---

# VirtualCTO-QandA-Sept2018

**Date:** 2018-10-02 | **Duration:** 52m | **Folder:** _unfiled

---

Hey. Hello. Hey, Didi. Hey, John, how are you? Great, you?

Good, good. Sorry about yesterday. No problem. I think we might post something on Slack to remind people. I'm sorry, what was that?

Yeah, maybe we can post something on Slack to remind them that the call is now. Yeah, I'll post it right now. I did post it in there yesterday, but I'll post it again right now. Okay. In the meantime, while we wait for some other people, how can I help you?

Yeah. I would like to find a way to try, I would say, the ads, because I have different ads that drive traffic to the same registration page. Okay. And I have no idea which ads to, I would say, scale, because I don't really know which one is, I would say, the ROI provider, or maybe it's two or three of them. And because we say it was pretty difficult to have, I would say, kind of accurate data.

Okay. So that's the main thing that I would like to do. Now, which platform are you using for your landing pages? Are you using ClickFunnels or something else? Yeah.

So it's Kartra and as well the integration with EverWebinar. Okay. And then the contact information are sent to ActiveCampaign. Okay. And do they go to a Kartra registration page first or do they go to EverWebinar first?

To the Kartra registration page first. To the Kartra registration page first. Yeah. So I believe Kartra will support UTM parameters and capture those, not 100% positive. So have you added the UTM parameters to your campaigns yet?

Yeah. Yeah. Okay. And are you also using Google Analytics? No, no, not on the page, no.

Okay. I have the analytics, but it's not accurate as well. Okay. Yeah. Do you have a Google Analytics account set up at all?

Yeah. Yeah. I have the Google Analytics. Yeah. Okay.

So the first thing I do is I would add the Google Analytics to your Kartra account. There should be a place you can paste in that code. Yeah. And then because Google Analytics will also pick up the UTM code. So it'll just give you two different views in case Kartra doesn't necessarily report it
exactly the way you want.

Yeah. And then within Google Analytics, we can set up some goals. Let me share my screen here. Hang on a second. Okay.

Login to Analytics. Let's see. How do you count MIA? Hold on a second. All right.

Let's get to the right place here. Okay, so what you'll be able to do inside of Google Analytics, once you add that code
to Kartra, the two things we'll do, number one is we'll set up goals so you can kind
of see which goals are converting, but under the Acquisition tab, under this Source Medium
channel here, you will be able to see those UTM values. Let me see if I have some in a second. You can see different things coming from either Google Cost Per Click or Google Organic or Bing
Organic. There's no paid traffic coming here at the moment, but this is one report that you'll be able
to see.

The other report where you'll be able to see this is if you go under Site Content, you'll
be able to see specific pages that are getting traffic. And then if you select this here where it says Secondary Dimension and you select Acquisition
and you can again do the Source Medium. So the Medium is going to be Cost Per Click typically and in this case the Source would be Google
or Facebook. Now that's not going to give you the campaign level stuff that you want, but you can also
see different columns here. So you can see campaign, you can see a keyword or term, etc.

So I would say as long as you put, you know, the UTM campaign variable in here as well, then
you'll see how many people are coming from each of those traffic sources. And then once you set up the goals, you'll also be able to see how those goals are being
completed. So under the account, when you go to Admin, you'll come over here under Goals. And then basically these are just rules. The easiest way to set these up is as a rule.

You know, this would be something like opt-in. In this particular case, I'm triggering an event from Google Tag Manager, but you can also
just put destination, and then put in the URL that they would be landing. So whatever page they go to after the opt-in page, that would be the URL that you put in. Okay. And you only put in part of the URL.

You don't have to put in the www.yourdomain.com. You just put in the forward slash whatever the URL is. Now. Oh, yeah. Now.

So, okay. But I believe in Kartra, you'll get the same thing. Let me just check something. Again, I haven't used Kartra as much as I've used ClickFunnels, but. Yeah.

I find Kartra really slow. I don't know. For some reason, it takes a lot of time to load. And as well, is there any way to get the tag from which ads they come, you know, people come
from inside ActiveCampaign? So the only way to get it into ActiveCampaign would be, you'd have to do a couple things.

And again, I know you can do this in ClickFunnels. In ClickFunnels, I'm not sure whether you can do it in Kartra or not. But essentially, you'd have to create a couple custom fields in ActiveCampaign to store those
values. Okay. And then the form that you would use on your page, you would typically, let me see here.

Okay. Thank you. Thank you. Thank you. Thank you.

Thank you. Come on now. Yeah, I don't know, for some reason it takes a lot of time to load, sometimes, yeah, pretty
great. I think it's every time you have like, some sort of form in the page, it takes a lot
of time to load. Gotcha.

It's doing that. Hey, Kevin, how's it going? And somebody else just joined us as well, so welcome. We're
helping John with some tracking stuff here inside of Kartra. Kartra is not exactly cooperating
at the moment.

Okay. A little bit more. kalian
kalian
Kevin, I just muted you for a minute, or whatever that background noise was. Just type in the chat if you want to say something afterwards. So, let me just see if I can add hidden fields.

Okay. So you can add additional fields here, right? So you would add fields for UTM source, et cetera. And then I imagine there's some way that you map those to ActiveCampaign when you integrate the form. What you're going to have to do, though, is you're going to have to use some JavaScript or CSS so that those fields aren't visible to the user.

And so I would have to look. If you wanted to send me your page or something like that after you added them, I can show you how to – I can get you the code for that. But you would just hide those fields. And then you're going to need a piece of JavaScript that pulls that information out of the URL and populates those fields in the background so that when the form is submitted to ActiveCampaign, those values have been populated. Okay.

Got it. And do you think because I use the form from, I think, EverWebinar, because when you click on the button on the registration page, it triggers the EverWebinar form. And should I put the, I would say, custom field – I don't know if I can do that inside EverWebinar? Yeah, you would probably do it inside of EverWebinar then. And then you'd probably have to put the JavaScript code and stuff inside of EverWebinar as well.

Okay. Got it. Okay. Cool. But, yeah, so what I would do, you know, I would copy – I would maybe make a copy of the page, a copy of the EverWebinar form just to test it out.

Yeah. And then if you want to shoot me access privately through Skype or whatever, then I can look at it and help you kind of tweak it. Yeah, cool. Yeah, thanks so much. But, yeah, I would still definitely set up the Google Analytics because that will give you a different view on it as well.

So you're answering it from other places as well. Yeah. Cool. Anything else you had? As well, I have a question about – I don't know if there is a proper way to track people who buy right after the webinar
or who buy maybe with the email sequence.

The easiest way to do that would be when they start the email sequence after the webinar. It would be – so, again, it depends when that sequence exactly starts, right? But if it doesn't send – let's say they attend the webinar and it waits an hour or a day before it sends the first email. I'm not sure what that – but whatever that –
Yeah. Right.

So I would wait a certain period of time before you start sending the first email that gives them a chance –
a window to buy right after the webinar. Yeah. And then that – so those emails are being sent by Karcher or they're being sent by EverWebinar? It's sent by – so the reminders for the webinar is sent by EverWebinar and the post-webinar email is sent by ActiveCampaign. By ActiveCampaign.

Okay. Yeah. So in ActiveCampaign, whenever that first post-webinar email is sent, I would apply a tag saying that they started the post-webinar email sequence. Mm-hmm. Yeah.

And then that way you'll be able to know – like anybody who purchased but doesn't have that tag is somebody that purchased from the webinar. Mm-hmm. Yeah. Anybody that purchased and does have that tag is somebody that purchased from the email sequence. Yeah.

And as well, the automation is going to get triggered only for people who, I would say, don't have the purchase tag as well. Correct. Yeah. Once they purchase, I'm assuming they're getting pulled out of that post-webinar sequence so they don't get that tag. Yeah.

Yeah. Just make sure you only fire that tag – I would put it like right after that email is sent. So right after that first email is sent, then apply the tag, and then you'll know. Or you could put tags when they click on the links in the emails. That's the other way to do it.

Mm-hmm. Yeah. Yeah. Yeah. All right.

And, yeah, just last question about – I don't know if there's a way to set an automation to get data from Facebook ads from the ad account and to put them on a Google spreadsheet. To kind of set some reporting, but use, like, any type of automation to do that. There was a software that did that. I don't remember off the top of my head. I'd have to look for it.

Let me – shoot me a message and – shoot me a PM in Slack and remind me. And I'll –
Yeah. That's right. Okay. Sure.

Thanks. Thanks so much. Just keep in mind that, you know, I only trust the data that Facebook gives you with a grain of salt in terms of being accurate. Yeah. Yeah.

We found it to be highly inaccurate. Yeah. Yeah. Ultimately, at the end of the day, if you really want to solve this problem, something like Wicked Reports is going to be your best bet. Yeah.

But it's a little pricey, depending on how much revenue you're generating. Yeah. And as well, in one of the video inside Virtual CTO, you mentioned about kind of a main dashboard to gather all your data. And I think it's maybe like a software or something like that. But you didn't catch the name.

Yeah. I think that's probably Wicked Reports. That's what we use as our Wicked Reports. Okay. Got it.

Cool. Thanks so much. All right. Appreciate it. All right.

Kevin. Hey, Kevin. How's it going? Good, man. I don't know if you can hear me, but I'm on the ocean.

Yeah. I was going to say, it sounded like you were on the ocean, making us all jealous. I am sorry. I thought I would jump on and see if I could glean anything. And I just sent a note to Jessica and Ryan to see if they have any current questions for you to jump on to.

But thanks, man. And as soon as I get off this beach, you'll have a video testimonial and written testimonial heading your way. Okay. Awesome. I totally appreciate that.

What beach are you at? We are currently at Panama City Beach. Oh, nice. Nice. I went there on spring break one year.

All right. Cool. You came here for spring break? Yeah, I came there for spring break when I was in college, so it's been 20 years. Yeah.

Yeah. A little while for spring break. A little time or for fall break? Yeah, I'm sure. I'm sure.

Okay. Awesome. So, yeah. If something comes up, just kind of – I'll mute you for now, but just type something in the chat or something like that. All right.

Thank you, man. Thanks. All right. So, looks like we have Michael and one other person that's called in. Do you guys have anything you wanted to talk about?

I'm actually the same person because I'm in a car, so I'm on the phone to get the audio. Gotcha. The video is on the iPhone. I had a question. You know, I have three or four websites that I manage, and I have a couple of clients, and each one of them has at least one email attached to it, whether it's support ad or info ad.

And so, they all come to my iPhone, which is good, but, you know, it's getting expensive to run, you know, 20 emails or whatever it is. What do you recommend for email, you know, providers, and how do you – I know you can have it all go to one box. But, how do you respond, then, from, you know, support at what XYZ domain? Yeah. So, there's a couple ways to do it.

I mean, where do you host your websites? Like, I have some on Shopify. I have others on – there's a membership platform called Club Express. I think they're on Shopify, everything else. So, what I would suggest, you know, if you don't want to kind of incur the expense, like, for Google email accounts, which are, like, five bucks a month each, the cheapest way to do it is probably to get a really cheap HostGator account, like, whatever their basic shared HostGator account is.

And that usually gives you unlimited – just, you know, get one that covers as many domains as you're going to need, even though you're not going to host any websites on there. You're just going to use it for email. But, you know, it should be, like, seven or ten – worst-case scenarios, 20 bucks a month. But then, from there, you can use the HostGator's email service for each of your domains. You can create as many emails and aliases as you want.

And then, you know, through whatever email client you use, if you use Gmail or whatever you use, you can just pull in – you can just put in the email settings to pull in mail from those accounts. Or – you're going to want to pull them in because you're going to want to reply from them as well. That's the issue, yeah. I'm sorry, what was that? Pulling them in is fine.

Pulling them in is fine. It's the responding. They're applying from the specific ones. Yeah, so you can set up inside of Gmail – let me go to my Gmail. Hang on a second.

I don't know if you can see my screen or not on your phone. I'll just shut it off. Hang on. Let's see. Yeah, okay.

So, just a second here. apologize i know everything is running slow today
right now i have you know a lot of the emails through go daddy that's where i got the domains
but they have only two options their workspace email and the office 365 which is you know five
bucks a month per email yeah i mean there's definitely a way in the gmail settings where
you can specify other accounts that you want to be able to send from um and then when you're
composing an email you're able to select which email address you want to send from so so for
instance if if i were to compose an email right now people to do this any window
you
close this other stuff
come on man compose
got the settings here
can you guys still hear me yeah yeah yeah okay i'm not sure why it's not connecting
so basically you're saying you can have all the different emails go to the gmail
forwarded there or linkedin somehow and then in gmail there's some settings where you can
pick which email to reply from yeah when you compose a message the you know the from address becomes a
drop down list where you can where you can choose which which account you want to send it from um
it will there's a little verification process you got to go through to before gmail will allow you
to send through that address so it'll it'll send an email to that email account you have to either enter a
code or something yeah yeah um but yeah if this would load it should exactly where it is
let me try to stop sharing for one second let's see if it loads quicker
hang on
all right so this finally popped up so right here you can see my from address i can choose a variety of
different email addresses yeah okay uh so so that's how you do it when you're composing the message
and then under settings uh i believe it's under account yeah right here under accounts it says send mail
as uh you can add other email addresses here uh choose which ones you want to make the default
um you know reply from the same address the message was sent to you by default things like that uh what
about the uh signature the who it's from yeah the signature is probably um i don't use signature as much
but let me see something well because you don't have the same information for each site you can have a
different signature for each site oh you can okay good
well for each for each from address i mean uh right right so yeah so all you do here is you you add
another email address uh
that could be just the way that so yeah unless they change something uh this used to work so you'll have
to try it in your account each google account set up differently um but that should still work and then
under the the the imap here this is where you can kind of pull uh sorry let's see
yeah so under here check mail from other accounts this is where you can put put in those smtp settings
from those other accounts and i would probably do this first because it could be that once you add this
it'll also add it uh as an address to send from right
and the actual getting the email set up through you saying host gator would be a good place to go
yeah i mean host gator is probably going to be your cheapest option for just a cheap hosting uh server
so so what you would do is you go to host gator um i would just do
press hosting unlimited so this baby plan which is four dollars a month
um which is typically on an annual kind of thing that's all you would need um and then
you know working with cpanel and stuff like that i think there's a video in the
the portal on that if not i'll i can add one but uh let me log it to mine
so the first thing you do is you'd add the domain that you want to send email from
to the account so you just put in whatever the domain name is here um you can just leave the
this will default to something that's fine i'm not going to host anything here so it doesn't really
matter uh and then once that domain is added it'll go under email
and then you can create whatever email accounts or forwarders right so if you don't if it doesn't
necessarily have to be an account like you know if you want support at info at help at all go to one
account that's fine you can do that you can just forward all those to one main account uh or you can
create individual accounts for each one um but you just go in here you just you know what's the email
address going to be whatever test it my domain what's the password going to be and what's the quota
uh typically i would say it's unlimited uh and if i already if i already sorry if i already have
these email accounts for go daddy is that going to be a conflict uh you'd have to cancel them at go
daddy uh and then the third step of this is you have to point the you have to change your mx records for
the domain so are you familiar with changing dns records or anything yeah i've done that yeah so you would
just change the the the dns records to uh for the m just the mx records those are the only ones you
got to change uh to whatever good eddie says so if you go here
let's see
mx records
and typically they want you to point the whole domain to their dns servers but you shouldn't
have to do that you should be able to just
the next century
you may have to check with them to figure out what the actual record needs to be um but they
they can tell you what to actually point your mx records to be um it'll usually just be the ip address
of the server anyways that should be all you have to set so when you're when you're here
uh it tells you the ip address of the server is right here
so typically you just have to point your mx records to that
but but you know like so the only reason to do this is if the cost is becoming an issue of what you're
paying go daddy for for multiple domain multiple email addresses if the only issue is you know being
able to send from those different email addresses from one gmail account even if they're at go daddy you
should be able to do the same thing we talked about within gmail right right um yeah between the hosting
cost uh and the email because it might be a wash
gotcha yeah yeah i mean so if it's not a big cost difference then i would just keep everything
at godaddy that's fine um but yeah then just port it all over to to your gmail okay now we've talked
once before you know last month whenever it was uh and i have a list of like two lists email lists one
is kind of dormant donors donors who gave once in the last you know five years but you never heard
from them again we want to we run a charity uh and then i had bought a list from a data company that
says they've all you know agreed to opt in and receive other marketing offers but they're not on my
list so is there a danger of emailing these people you know in terms of uh you know getting blocked
because they don't know who we are so so it depends which email marketing system you're using what what
crm are you using uh spark post through click funnels spark post through click funnels uh so if you do
it through click funnels you should be probably fine um just know that you know you may want to
set up a spark post lets you create multiple accounts uh you may want to create a different
spark post account or maybe a send grid account or or something for that initial email to those people
um and i would typically only send at the most two emails uh just right um but yeah what you want
to do is you want to drive them directly to a landing page with some sort of compelling offer
that'll get them to officially opt in uh and they're on your list and then it's a whole different story
right right that's the whole thing but i have all these emails and it's worth at least contacting
once or twice yeah yeah and then the other option which i think i mentioned was to take that email list
import it into facebook as a custom audience and then run ads directly to that list driving them to the
opt-in that's that's the safer more legitimate way to do it but so you import them into facebook
yeah so you can go into your facebook account and create a custom audience where you import the list
so you come out come over here under audiences once you're in your account
and then you can create an audience you're going to create a custom audience
and it's going to be based on a customer file uh and then you add customers from your own file
except the terms and then you can upload the csv file uh and then just indicate you know however
much they have yet you know the more data you have their email only that's fine but if you have their phone
number as well that that helps match it a little bit better but just upload that uh give it a name
for for what the source is and then when you're creating an ad inside of facebook you can target
just this audience specifically and so that ad will only appear now it's not going to match everybody
in the list you know it might be a 60 60 match that matches depending on how good the list is but um
yeah at least you're specifically targeting them with a with a specific offer and then it's not
you're not risking your email but like i said if you open a second account a second
smt provider account through sign grid or spark post or smtp.com or any of the other ones um
that would be a way to do it the other thing i would say is if it's a big list i wouldn't mail the whole
thing at once like i would i would do a couple small batches of maybe a couple thousand people
uh because typically when you set up a new email account like that you kind of want to warm up the
domain a little bit um before you send a big blast to it if you just try to send 50 000 emails right
away it'll immediately get blocked so to do it right do a couple at a time what's the safer amount
thousand yeah a couple thousand at a time i mean it depends how big the list is but about 10 000 total
yeah so i would do i would do like a thousand thousand at a time maybe you know every couple
days to a thousand okay uh and how do you set up a second you know spark post or send grid with
you can do that at click funnels uh yeah you should be able to add multiple integrations
so you can add another one here uh and then just whichever one you want to use sun grid mandrill spark
posts and i believe when you're when you're composing an email message or or a campaign through
reaction edX uh you can select which one of these you want to use uh when you do a broadcast email
all right another question over on click funnels and i just recently got in google analytics
the code and they said to paste it into the uh you know into the funnel that the landing page that i'm
using how does one do that so there's two ways to do it um the recommended way uh there's a video on
this inside of the portal uh it's about using google tag manager uh which is a little bit easier
you're constantly pasting in multiple tracking codes but either way uh you in the funnel wherever
that page lives you just go to settings and then you're going to paste the code here into the head
tracking code and body tracking code and that'll put it that'll put it on all the pages
okay and then for shopify shopify should have something similar where you plug in your google
analytics code it should be a default setting somewhere in shop i don't use shopify so i can't
speak to it exactly it is definitely in there it'll have a similar kind of thing as this yeah i mean you
can just google it too i'm sure
um so it looks like it's under online store preferences and then you just paste it in right
there all right sounds good thank you awesome my pleasure
uh all right looks like we got neil what's going on neil oh hey guys yeah i'm good thanks cool um just a
quick question teddy i'm trying to look at utm tags and the best way of setting those up um have you
got anything in the portal for that uh i'm looking at google tag manager overview yeah i'm just kind
of pointing some best practices really on those yeah so i mean there's definitely a post uh there's
a post in slack where i was just talking to uh to jean michel about about that as well um but what's your
question about them i mean it's really to get some best practices kind of set up in terms of
whether or not you're doing it for each sort of sort of lead source uh funnel campaign yeah so let me
see let me find that link that i put because i put a link to a good article in here uh
uh yeah so if you look in the in the analytics group on september 15th it was actually to tony to
tony uh i put this guide in here about utm codes and okay the buffer app yeah was that the one yeah
okay was there a specific question about that not not really i think if that's a good starting point
i did have a quick look through um yeah i mean look in general it's pretty it's pretty simple i think
people tend to tend to complicate it more more than it is so utm source is always going to be
where they come from is it google is it facebook is it youtube is it instagram like what's what's the
platform that the traffic's coming from uh utm medium is either going to be typically email or ppc
indicating it's a pay-per-click campaign and then you know what's the name of the campaign
uh and then you can get more specific with like utm term if you want to know like you know which
specific ad in that campaign or which specific audience uh within a campaign you know you can
specify it but i mean these are basically at the end of the day it's like what's going to make sense
to you when you look at the reporting okay right and what what do you then look at those with do you
go to something like um some of the other reporting dashboards or just do it within google yeah so so we
were just talking about that in the beginning of the call so there's a couple different places so
the first one is you know if you're using click funnels um then in your click funnel stats uh you
can run a filter and you can filter and say you know show me just facebook traffic or just google traffic
yeah update your reports if you're in analytics uh then there's a couple different ways you can see it
back here uh so first is under you know site content behavior site content if i go to all pages
uh you can choose this additional column here um source medium would give you the high level hey it was
google and it was cost per click or whatever um or if you want to see what the actual campaign was
then under under advertising variable you can choose campaign i don't have anything here but
well here's one right so this is showing me that it's coming from from this campaign um so again you
know you might want to make the campaign name depending on where you're going to be looking at it like
if you're going to be looking at it in google it's because you can only see either source medium or campaign
uh it might be a good idea to to make the campaign name include you know hey this is google this is
uh the google display network this is our retargeting audiences for the workshop
you know responsive ads mobile so you can make these as descriptive as you want um so that when
they show up in the reports you know what you're looking at right yeah yeah
do you do you tend to follow a standard naming convention uh yeah well so these were actually
set up by rory that was doing some of our traffic so that's his name but i mean that's a good that's
a good way to look at it uh as well right so rfs just stands for rory f stern so we know it was him
but yeah so what's the network who is the audience um what campaign is it and you know which set of ads
was it and was it desktop or mobile now i would actually use uh hyphens between these so that
there's no spaces uh some of the pipe characters just so i would just do you know gdn dash retargeting
audience retargeting dash audiences whatever um just keeps it a little cleaner
okay cool yeah but at the end of the day it's again it's going to be kind of what makes sense to
to you guys um but the the core setup of you know utm source that's always you know again just
the name of the network medium is either going to be email or cpc or you know it might be a solo ad
it might be a display if it's a display network ad something like that um but then campaign and turn
i guess i can pull through into wiki reports can it as well yeah now wicked from wicked you can
you can actually generate what it's supposed to be like wicked will actually generate it for you
so i don't use wicked at the moment but i'm thinking that potentially i'd do a will
but to kind of want to make sure the utm is set up correctly really yeah so so once you start using
wicked um it'll become a lot easier once you create the ad in facebook you'll just go into wicked
there's a certain page inside of wicked uh where it'll show you the list of all your ads and you just
select them all and you say add tracking codes and it'll add the wicked id that it needs to track
it plus the utm parameters right no you don't have to think about it at that point then then it's more
about how do you name your campaigns uh inside of facebook so that they make sense when when wicked
generates those those parameters i'll take a look at that yeah great thanks teddy cool is that it
yeah it is for today yeah i'm just getting ready for the flight on wednesday awesome man well i look
forward to hanging out with you next week yeah that'll be good all right cool uh i think thank uh
thanks to jean is your own john michael for the uh link as well yeah you're welcome
um awesome all right uh was there anything else john michael or you're the only one left um i think
that's pretty much uh maybe do you know how to set custom events with facebook and google type manager
uh yeah um but i don't know if you can do that with for instance ever webinar uh just maybe to set
custom events based on um the consumption on on the video uh because i think you can do that with with
with fear uh and and be email but i'm not sure if you can do that with um player from ever webinar so
i haven't been in ever webinar in a while wasn't there a way in ever webinar to to show certain
content on the page like a call to action button at certain times oh yeah yeah you can display the
offer okay is it just display the offer or is it any html you want um it's basically how i can create
custom audiences based on um you know how long people watch them the webinar so right yeah so what i was
saying oh let me just see something uh
uh let me go unless i configure everything huh uh let's go external
uh uh if you want i can share my screen as well uh i have the other webinar um on my end let's do that
uh yeah can see my screen yep okay uh so go to maybe the live page
um product offer expand the product offers
uh start offer and offer name for headline text button yeah there's no way to put any html in there
um as well would would you recommend as well maybe to use like a utm link yeah uh yeah you could
definitely put the utm that they came from the webinar for sure um it doesn't look like i was hoping
there was a place where you could just show any random html at a certain point in time but looks like it
could just pop the offers uh what about under their tracking and analytics isn't there a way to to add to an
audience at a certain point um i'm gonna check that
i'm gonna check that and we under integrations
so right there third party tracking system
post registration page page page page page yeah so probably i mean you could potentially do it in
that webinar live room page tracking um you'd have to use some javascript that that basically just counts
down the time that they've been on the page so it's not going to be accurate in terms of what time
they're at in the video uh but that could potentially you know so you create a javascript timer thing
which i can find you some code on how to do that uh and then uh at whatever number of seconds you want
to fire something you call you know the facebook event tag or google analytics event tag or uh etc there may
may also be in tag manager this is i can't remember if this is in here or not uh
timer yeah so you could do it through tag manager right so you can create a timer
um same kind of thing certain interval um and you know enable this trigger when all the conditions
are true you can put the url to the wide wide page uh and then when that you know add a tag that
fires basically based on this timer okay got it that's that's one way to do it without uh
uh having to script anything you just want to you you know i would test it first like do it just set
up a couple like five seconds 10 seconds 15 seconds and then use the use the preview mode to test it but
that should work okay got it thanks all right cool
uh all righty guys and i don't think there's anybody else on double check
nope all right cool that's uh that's a wrap sean are you coming to mfa live at all
yeah yeah i'm gonna be there yeah awesome all right well make sure you grab me man yeah sure
good stuff see you next week then sounds good guys thanks so much for the call all right take care
take care
you
you
you
you
you
you
you
you
you
