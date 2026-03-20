---
title: "E5 Launch Tech Overview - Teddy - Jun. 2017 - Tactical"
date: 2017-09-08
duration: 45m
duration_seconds: 2758
vimeo_id: 233036773
folder: "Tactical Calls"
source: vimeo
transcription: whisper-turbo
tags:
  - knowledge-base
  - video-transcript
  - vimeo
  - whisper
---

# E5 Launch Tech Overview - Teddy - Jun. 2017 - Tactical

**Date:** 2017-09-08 | **Duration:** 45m | **Folder:** Tactical Calls

---

hey everyone sorry couldn't be with you live tonight obviously we're in the
middle of launch and things are a little crazy around here but everybody Todd
and Damian asked me to record this video for you guys just to kind of walk
through all the technology behind the launch what's going on what tools we
used how we implemented them any custom things we did things like that so I'm
gonna go through this kind of sort of quickly but you know the reality is is
that it wasn't all that it wasn't all that complicated we did use a lot of
different tools but fundamentally the core of platform that and how we built it is
pretty straightforward so I'm just gonna go ahead and dive right in if you guys
have any questions or want to see more in depth on how specific things were done
especially some of the custom stuff happy to share that either on the next call
or if you want to put some comments or questions and below below on this thread
I'll answer what I can in the comments all right so let's dive in so basically you
know it breaks down into some major areas including you know what we used for our
pages what we use for video what we use for our cart and CRM system what we use
for analytics how we things we use to build the members portal and then also
things we used for messaging prospects and customers so let's start with pages
so the entire platform was all the pages and everything were built on click
funnels they were designed mostly by Todd and our in-house designer Joshua and then
everything was wired up by me but nothing too complicated there there there is some
custom CSS that we had to do to kind of tweak the the actual video one two and
three pages to get the layout we wanted wanted to try to you know switch from the
typical launch series layout that has you know the videos across the top and things
like that so I think we achieve that a little bit with the sidebar layout pages
look really clean and and they worked well on mobile as well with some
caveats and tweaks of course so in the in our click funnels account for this
funnel so all the pages are built in this funnel what you will see though there's
about 27 different pages currently in use some of them are just templates or
one-time use pages but everything's in here so we've got our opt-in page we had a
reverse opt-in page for first for video one we've got the actual video one page the
opt-in for video two the actual video two page the opt-in for video three the
actual video three page the sales page we did separate order forms for full pay it's
split pay this is primarily from a tracking standpoint we could have put
both payment options on each form but we decided to split it out so we could
track a little bit more accurately who purchased full pays and who purchase pay
plans especially in terms of sending that information over to Facebook for
conversion tracking and other things there's a central order confirmation page
that each order process goes through there's the upsell which is the MFA live
upsell again it's the same thing for both the full pay and pay plan but this is
how we track conversions by whether they went to the full pay upsell pay plan up
sell and then these were just templates we've got the opt-in page for the
Facebook live that we're doing later tonight and then we've also got some
compliant pages so we made different versions of the sales page and some of the
other things to make them compliant for Facebook I'll talk about that in a second
we had a version of the sales page where the the body of the page didn't load till
a certain point in the video so there's the late version of that and then we
added a bridge page to make to make video for you know so there's more of a
introductory video before they get to the sales page that actually helped
conversions quite a bit just kind of you know did a little bit more training
before we got to the sales message and then we've got a redirect page that's
just a simple redirect for that for the URL that we gave out during the the webinar
or the live Facebook live so that's pretty much the the core structure of
what's in clickfunnels back here so custom JavaScript so on the opt-in pages and on
the video pages there is a little snippet of JavaScript that we use so essentially
what we did was when somebody opted in to any of the through any of the opt-in
pages we set a cookie they had opted in and that we checked for that cookie and if
the cookie was present they would skip right to the video page they wouldn't
have to opt-in again so even if they opted in to video one for me and then a
partner maybe sent them the video to they wouldn't have to opt-in again because
they were cookie already and vice versa we had a check on the video pages so that
somebody tried to access one of the video pages say somebody shared the link on
Facebook or you know you gave the link to your friend or whatever there was also a
check there that if they hadn't for that same cookie and if they had it up hadn't
opted in to the series yet they were redirected back to the appropriate opt-in
page for for that video before they could watch it and then the other custom
JavaScript is on all the video pages there's a little bit of JavaScript that I
wrote that helps track how much of the video they're watching and and I've
talked about this before on other calls I believe but so basically goes by where
they are once they get to a certain point in the timeline of the video it
calls a custom API script that we wrote that basically applies a tag to that
person inside of our CRM system so that we know that whether they've watched that
video or not and we can adjust the messaging based on that and the only
other thing that was a little custom was the way we did the survey now Ryan
Levesque obviously has an awesome tool called called bucket IO that could have
done this but since we were only asking one question it was pretty simple we just
did this with straight up with infusion and a custom custom field an infusion
that stored their answer to the question but in click funnels there's no no
widget necessarily for radio buttons so we just had to put the code in for the
radio buttons themselves and then there's a little piece of JavaScript that
would grab which which answer they selected and store that answer in a hidden
text field and pass that information off to infusion soft so again I'm not going
to go deep into those scripts and stuff here on this call but if anybody has
specific questions on those or wants copies of the scripts or whatever shoot me an
email or leave a comment below you can talk about that and in terms of custom API's
like I said there's only one custom API script all that does is apply a tag to a
contact that's what's called that's what this JavaScript calls it calls that
script in the background that applies the tag so we store the contacts ID in
Infusionsoft when they opt-in we store that in a cookie as well and so that's how
we're able to apply that tag the other two things I would talk about in terms of
pages is the use of mobile specific sections and also the Facebook compliance stuff so let me
talk about the Facebook compliance stuff first so for Facebook compliance you know Facebook
doesn't like things like pop-ups they don't like videos that play automatically and they
don't like any you know financial claims etc so for the for the sales page for instance we
removed any of the income claims we set the video to not autoplay things like that so
so but it is very important that if you're going to be driving paid traffic from Facebook that you do
that although you know generally want two versions because you want that kind of
stuff you want autoplay you want income testimonials on pages for people coming from
your list or coming from partners etc and then mobile specific sections so on certain
pages and it's a little hard let me see if I can show you this real easily I guess the easiest way
to do it would be to show you let's take the let's take the sales page which is probably was probably one
of the most complicated ones and I'm actually going to go into the classic editor so you can see this a
little bit better so you know for mobile in order to really get mobile to work right sometimes what
you need to do is you need to copy parts of the page and set one part of the page to only show for
desktop and other parts to show for mobile and since the sales page layout was pretty complicated that
was something that we ended up doing so for here for instance you'll see here this row has all these
testimonials stacked vertically which works best on mobile whereas here it's in two columns so so this
this section is set to appear only for mobile and this section appears for desktop so you set these rows to
desktop only and you set this row to mobile only so there's a couple sections we did that so the
testimonials was one place here's another set of testimonials same things were a little bit smaller for
mobile look a bigger for desktop those were fine and then the other part was down in the payment box
that there's two column layout works fine on desktop but on mobile we had to stack them so that they
would show up properly in mobile so that's just that's kind of the hack it I mean a lot of times in
click funnels you know click funnels makes it really easy to really optimize for mobile and so but there's
just sometimes when you have multiple column layouts that it's easier to create a mobile version of the single
column column and you know the other thing you can do now in the new editor is you can also change font
sizes specifically for mobile so certain headlines and things like that we would tweak the layout for
mobile so that it was a different size font things like that so let me go back to the other version of the editor here so
so you can see if I switch the mobile view
you'll see kind of that way out where you see the this is the mobile only section this is with the things stacked things like that
some headline sizes or tweets
which you can do
here you can see in this case they're actually the same but this mobile size option lets you change headlines for just the mobile specific version without having to duplicate it
you used to have to duplicate it and set one for desktop one for mobile now we have this mobile size option for text that helps you kind of get get the text right
in general after this launch I would say it's a really good idea to design for mobile first and then work backwards to create the desktop design or at least make sure you've thought through the mobile version because you know good portion of our traffic particularly because it was coming from Facebook
came from Facebook came from a mobile version
all right so that's pretty much it for quick falls in terms of video video street pretty straightforward we use Wistia for all of the launch videos
we use we use Vimeo inside of our membership portal but we use Vistia for any marketing stuff mostly because Wistia gives you great stats and you can actually see what's going on so this is a random
video it has nothing to do with the launch but this is the kind of stats you can get from Wistia where you can see kind of where the drop off is what the average engagement is and then you can actually see individual people and how much of it they watched
things like that so this is just very helpful information to know whether a video is resonating if there's a certain spot where there's a drop off
um this is part of the reason we added the uh little shorter video before people got to the sales page because we noticed that because the video was on the sales page
they were just kind of reading the copy on the sales page and not necessarily watching the video
um and we you know some of you may have seen the version with the Stallone story some of you may have not
um you know that we were split testing that as well
and seeing if the Stallone story was kind of getting in the way so anyways this is highly valuable
but we don't use this in the member portal because with Wistia you got to pay for bandwidth whereas with video
it's a lot cheaper so um but other than that really nothing fancy no amazon s3 no custom players
uh etc uh and we use Wistia instead of youtube just because we pretend to get but i like the analytics better
out of Wistia and the fact that uh the Wistia API allows me to to tap into the video and uh into the
video timeline to to know when to fire that tag so essentially when somebody gets to about 80% of the
video that's when i fire the tag that they actually watched it and you'll see how that plays out in the
in the campaigns uh in a second uh and then for the facebook live stream that we used uh there's a
there's a new tool that just launched uh i personally haven't played with this much um another part of
the team was kind of managing this part but it's called be live tv uh and essentially what be live tv is
you know it makes doing facebook lives uh a little bit easier it gives you more of a
a production type tool set where you know you can have on-screen updates you can have
kind of an interview face-to-face kind of thing um so that's relatively new um but this is what we
used for it so i can't speak too much about it because i didn't set it up but just want you guys to be aware
all right uh so obviously our shopping cart uh and crm system is infusionsoft um so you know all the
campaigns and everything all the reporting all all that kind of stuff comes from infusionsoft
all the order processing that kind of thing um one thing to note uh which i didn't put on here is
you know whenever you if you ever are doing a big launch like this uh it's important that you
communicate with your merchant accounts and your payment providers let them know what's coming up
so that you don't get flagged that they don't shut down your processing they don't hold your money
uh all that kind of stuff so you know we went through a process where we contacted them about
a month ahead of time we sent them links to all the pages so they could review it you know they looked
at the wording especially the payment plans all that kind of stuff uh and we helped tweak that to to
keep them satisfied so that they wouldn't shut us down and as a result of that we haven't had any
problems and a fairly low decline rate or as well for for orders um and then my fusion helper is a
helper app um that that works with my within fusion soft to kind of help us do a couple things
in this particular we use it for a lot of different things but in this particular launch
really the main thing we used it for was uh to add contacts to facebook custom audiences for
for retargeting and things like that uh as they completed different steps in the campaign
so as they opted in as they watched videos as they bought we moved them from from one custom
audience to another and i'll show you guys that in a second um so the the funnel inside of infuse soft
uh as usual with everything i build it's uh it's got a lot of moving pieces but uh i'll walk through
it quickly so you know essentially there's a there's an opt-in form for each of the the video landing
pages so video one video two video three um that when they submit that form it tags them so we know
which video they actually opted in for um it then merges all that all those people into this one
sequence here which tags everybody so you know this way i can run a search to say all right show me
everybody that's opted in to any of the videos or show me who has opted in specific videos um and then
because we were doing that survey question we also wanted to tag them as to which bucket they fell into
with a a new marketer an intermediate marketer or an advanced marketer um and whenever you do that kind
of thing you always want to have a catch-all for for like a no bucket somehow they bypass the question
or they come from your list somehow i mean never know how they're going to get into this no bucket
we didn't have too many fall into here but it's a good idea to always uh plan for that uh and then
this was the opt-in for the tuesday webinar page so anyways once they've opted in um they get they're
gonna get one of these tags in one of these sequences so they're gonna get the video one opt-in tag
they're gonna get the video two opt-in tag or the video three opt-in tag so if they opt in for video
one we send them the confirmation email there was a different confirmation email for for each of the
three buckets depending which way they came in um and then this tag was is the tag that was being
applied by the javascript when they actually watched video one um now i will say that we these are these
are turned off because we we ended up todd ended up just sending a lot of emails manually and doing
broadcast manually instead of kind of going through the sequences but people were still being tagged as
as a result of these different things um and so anyway so if they watched video one that's great we
tagged that we'd make a note that they watched it we'd move them into the video two sequence uh and then
once once once they're in here that we kind of can continue if they opted in for video two
the same thing we send them the confirmation email for video two uh and there there would have been
emails in here to get them to consume video two until they watched it uh but even if they didn't watch it
they would still move to video three and and these were all set to to trigger on the date that those
videos were were meant to be released also if they opted in for video two we wanted to make sure that
they watched video one so there was a check here to see hey did they watch video one meaning do they
have this video one watch tag uh and if they don't then come in here and let's remind them to watch video
one until they watch it uh it wasn't critical but it was something we we wanted to do um and then same
thing on video three except now we're checking well do they watch video one and did they watch video two
and so that's what this is going on down here but you know even if you removed all this stuff down at
the bottom the basic sequence of you know they opt in they watch video one and then this they wait
until video two is ready and they wait until video three is ready etc um and then everybody flows into
video four there is no opt-in for video four um and then there were three offer intensification sequences so
once the card opened uh we had specific messaging for each of the three buckets uh to you know kind of
push the offer a little bit more uh and once they've gone through those then they enter the countdown
sequence which basically is going to fire the last couple days of the campaign um if they purchase the
full pay or they purchase the pay plan they get tagged accordingly of what they purchased uh and then they
go into the sequence which tries to sell them mfa live if they didn't buy it um so that's pretty much
the the structure of the campaign um i will quickly show you kind of some of the tags that we used as well
just so you can kind of see how we structure our tags um
and these tags are all being applied primarily inside of that campaign so we have a specific category just
just for this launch um so there's about 50 tags here that we used uh so you can see the video one opt-in
video two opt-in video three opt-in which bucket they're in is the catch-all for everybody that opts in
this is if they did the reverse squeeze we've got the watch tags for which video they watched
we've got the order abandoned uh which i didn't talk about so um there was an order abandoned sequence
in that campaign as well um so essentially if they visited any of the cart pages um we added a tag that
that they abandoned uh infusionsoft now has a goal that you can put on your infusionsoft has a little
script you can put on your pages that can fire a goal um that will that will notify you if somebody
abandons the order so there's you know if they abandon the order there's like three emails that
they try to get them to complete the order um and then we were just additional all these things that
say start these are just kind of tracking where they are in the campaign so we kind of know where they
are um we have to purchase tags so so we're tracking whether they per we have tags to track whether
they purchased as part of this launch um there are other customer type tags as well being applied but we
wanted to just be able to see right show us all the buyers just from the launch show us all the buyers
who bought the pay plan show us all the buyers about the full pay uh shows all the buyers about the upsell
etc um and then we also had some tags we were adding for split tests so we could see kind of which
videos were performing better some of our partners things like that so okay um oh and then the other
part of it of infusionsoft is the facebook audiences so this is a similar flow as the one i just showed you
but all this campaign is doing is moving people into and out of different facebook custom audiences
um so when they opt in for instance we add them to the opt-in but did not watch bucket inside of
facebook once they've watched we once they've watched video one we removed them from did not watch video
one uh and then we add them that did not watch video two once they've watched video two we removed them
from did not watch video two add them to did not watch video three once they watch video three and
remove from did not watch video three add to did not watch video four et cetera um and so all these
things are doing is just basically two http posts to my fusion helper uh so in my fusion helper we create
all these steps here uh for the facebook custom audience and and these basically it's very simple you just
link your facebook account to this and you set up the audiences in facebook and then you come in here
and you select whether you want to add or remove somebody from a specific audience it gives you a little
url to put into this campaign and just put that url into these http posts um so that's how we handle that
and then our our damian and shane and the other people running our ads um could could use those custom
audiences to to change the ads that people were seeing uh throughout the launch process
all right uh so that's the core you've got your pages you've got your video and you've got the
shopping cart and crm um obviously as as we preach and teach and and definitely do ourselves analytics
is key especially during a launch you really got to know your numbers you really got to know what's
going on you've got to really be able to to have good insight into what's going on in order to react
quickly um because i just want i want to make this clear like yes we had a strategy for the launch
yes we built out the pages ahead of time all that kind of stuff but none of that is set in stone
everything is changing on the fly on a regular basis we're always tweaking we're always split
testing we're always kind of looking at what the audience is doing what they're saying how they're
responding how they're engaging uh and we're making changes daily uh throughout the process based on
based on what the data shows us um now you know initially uh initially i added a lot of different
tracking systems um just so that i had multiple angles to view it each tool gives you a little
bit different view on it um but as we got into the launch i started turning different tracking systems
off because a we weren't using them uh and b if you leave them on it just kind of each each different
system that you use slows down the page uh more and more um but you know what i do recommend is that
use google tag manager uh to control all of your tracking scripts and stuff like that uh i'll show
you that in a second but essentially what we used for for our stats uh primarily google analytics click
funnels so sorry primarily click funnels uh we have google analytics as a backup so we can see different
things um but honestly i haven't necessarily checked that all that much most of the data we've been looking
at is in the click funnels reporting uh as well as the infusionsoft reporting uh graphly is a tool
that helps uh it's built specifically for infusionsoft it pulls your data out of infusionsoft and uh makes
a more visual type dashboard with you know pie charts and line graphs and and stuff like that whereas
infusionsoft reports are all kind of just table data so graphly makes it visual so you can look at stuff
quickly over time things like that um eye tracker is a uh it's kind of an add-on script that basically
is what uh so we use utm parameters in in all of our in all of our urls from any paid traffic sources or
partners or things like that so that we know where contact came from um so eye tracker is basically just
a little script that will look for those utm variables in the in the urls and send that
information uh over to infusionsoft when somebody opts in and then lucky orange i'll show you as in a
minute as well but lucky orange is really cool it's fairly affordable as well which actually records users
interactions with your pages so you can see how people are interacting with a page if they're getting
stuck what's going on things like that um so let's start with tag manager so tag manager is kind of a
for those of you aren't familiar with this this is kind of a it's a free tool but made by google um
and essentially what it allows you to do is you put one snippet of code uh inside of click funnels uh
and then in tag manager you can control exactly uh all your other tracking scripts so you can again you
can see here that i had a lot of different things happening um but a lot that we didn't end up using
so we had bing we had uh the browser notifications we had conversion fly we had facebook pixels we had
google analytics uh tags and events we had graphly we had heap infusionsoft eye tracker kissmetrics uh lucky
orange proof whoopers open all that kind of stuff so all the different scripts for for all these different
things go in here um and then you create triggers uh which are basically just rules uh let's say you
know basically they're the the urls of your funnel so you know when if they're on a page where the path
starts with enroll dash full and notice how you starts with because the variations are going to have other
stuff after dash full it might be dash c or dash facebook or dash whatever uh so that's why it starts with
um so basically this this indicates that somebody viewed the full pay order form um and so you have
a variety of different rules that you set up for each of the different pages in your funnel uh and then
you can say all right hey when somebody views the uh the video views video one um i want to i want
to fire the facebook lead uh thing that they you know that they converted um so you'll notice that
different different things here only fire on specific pages while some things like the core google analytics
code fires on all pages infusionsoft's on all pages eye trackers on all pages uh etc lucky orange is on all
pages so uh a lot of your conversion tracking scripts and stuff like that uh this is this is where you
you want to put them and then it makes it very easy for you to make changes to your tracking and
analytics without having to go and edit the page because every time you edit a page there's a chance
to break something uh this is a much easier way to do it and actually see what's going on and really
dictate where when and where things happen um so these are this is what we used for that um and i also
mentioned lucky orange so lucky orange again is a heat map tool uh log in here real quick
i didn't want to log in because it starts dinging as soon as i log in of people so you can see right
you know so the other nice thing about is you can see your live visitors you can see how many people
are on the page uh at the current time but if i go to recordings um so these are these are basically
recordings of different people's sessions right there's a ding there's a new visitor etc uh let me
go to some older ones here and find some longer ones uh so this one's 27 seconds and that one's not on
mobile three minutes desktop all right so let's take this one for instance
so if i click play i can see exactly how this person interacted with the page
clicks the video this stuff here is just an effect of the way this thing records pages it's not
it's really happening on their page etc so he clicked off he went to the webinar page
uh you can see him kind of scrolling around checking out the webinar page uh and then then he bailed
um but again so you can kind of see you know what people are looking at how they're looking at it
find somebody that's viewed the sales page so again you can filter this out to people that view the sales
the sales page
uh
this one
so this guy's reading the facebook comments
he's reading he's reading there's there's a video here that you don't see him that he's watching
it's just really interesting to watch kind of people's mouse movements
especially when they're reading like long pages you see when I get to the sales page
and see them kind of actually hovering over different parts of the page sales page he
clicked he stopped the video he started scrolling through the page quickly goes back up
so that's just a indication of what it does and there's other tools here like heat maps and stuff
that you can use so you can get a heat map of the page kind of see that chiming drives me crazy
um so but those are all people coming coming in and out on the site as I'm watching it
you can use this for chat we didn't use this for chat though we used a different script that
integrates with our chat support system so we'll talk about that in a second
uh all right so we talked about tag manager talked about google analytics
new funnels a few soft graphite eye tracker yeah okay so that's pretty much it for analytics
um and then the other thing we used is a lot of different messaging tools so beyond emails
uh we also used push notifications so when once you opted in for the video uh right at the top of
the screen it's you've got a little pop-up it says hey you want to receive other notifications
uh we used two tools for that the main one we use is a tool called fan contact um i'm not sure if
this is open this was they did a launch for this a little bit a little while ago um so it may only
be open during launch windows may not be available all the time push crew is the more enterprise off
the shelf can buy anytime version fan contact had some additional features that we liked um which is
why we used that um but we already had a list inside of push crew um so we we ended up using them both
um but i can tell you that you know fan contact had or just push notifications in general so initially
when every video was released we sent out a push notification that popped up in everybody's
browser uh so the nice thing about push notifications is it's pretty much 100 deliverability
everybody sees it uh you can with fan contact for instance you can actually set it so it keeps showing
up you know x amount of times every x hours or x days until they actually click it uh which is nice
um and so you know you get a you get a huge open rate you get i think we had probably about
like 30 percent of the people that opted in to any one of the videos agreed to receive push notifications
so again just think of this as building another list uh with 100 deliverability you know spam complaints
uh and and the ability to instantly notify somebody uh and the click-through rates on most i'd say about
10 percent of the people that we sent push notifications to click through on them uh and
i've definitely seen a handful of orders as well uh that came specifically because of people that came
through push notifications um so again push crew is available all the time i'm not sure let me see if
fan contact is i'm not sure if it is or not
yep looks like you can buy at any point so uh so fan contact is a little bit cheaper now i want you
to imagine this imagine leveraging this powerful new facebook technology to get more sales increase
engagement so you can check this out fan contact.com um and then let's see uh so for sms messaging we
didn't use a whole lot of sms messaging uh in this launch mostly because we weren't collecting people's
phone numbers but for people that we did have phone numbers for that opted into our list previously
etc uh we sent out sms messages again using my fusion helper uh through a twilio account uh you can
also send out sms messages through call loop if you want to use just one system call loop is the one
that we use to send out voice messages uh technically i think we could have sent out voice messages through
my fusion helper in twilio uh but we like call loop chris brisson the owner of it is a good friend of mine
and todd's um so we did send out several voice blasts as new videos were released as well again
the people that we had phone numbers for uh using call loop um facebook messaging so we did run a
couple of different messenger campaigns uh through facebook again i didn't set these up shane did most
of the work on that um but i know we used many chat uh and i think hello tars for a couple of them
so many chat and hello tars are the tools that basically allow you to kind of create the facebook
messenger auto responder artificial intelligence kind of thing um so essentially the way it works
is you can run an ad on facebook instead of them clicking a link to go to an opt-in page they click
a message me link that pops up your messenger in facebook the many chat hello tars sends the initial
message and as soon as they respond to that message um they're basically added to your list in
many chat and then you could start a conversation with them a lot of the conversation can be
automated so you can create rules based on what the person types like the type price or if they type
how much or you know guarantee you can have kind of canned responses that pop up for that based on
those kind of trigger keywords um don't have the data on that yet i'm sure um probably the traffic call
damian or shane will talk a little bit more about that uh and then for live chat so we have live chat
on the sales page and the order forms um we use zendesk for our support desk zendesk is uh kind of
integrated directly with zopim so zopim is the live chat tool uh i will tell you that we had the live
chat settings set to auto initiate after somebody had been on the page for about three minutes
uh and we had our team kind of manning the live chat pretty much 24 7 uh and we've closed a bunch
of sales because of live chat um so doing a launch like this you definitely definitely want to make
sure you use that on your sales page and once the cart is open uh and then the other thing we used was
uh proof which is at useproof.com and so proof is basically this little thing that you've seen here
which is basically as somebody opts in as somebody purchases these little things are popping up
kind of creating social proof um and and making it seem like this is something else that you should
want to do uh the difference between proof and other things like this is that this is absolutely
accurate like this is if this thing's showing up it's because somebody just opted in or somebody
just purchased um and proof goes out even though we weren't collecting first name from people
once it proof gets their email address it knows it goes and searches the web and searches their social
profiles whatever figures out their name finds their picture finds their location as best as it can
um so it's it's really cool we didn't do an official split test to see how much of a bump it made in
conversions um but i can tell you that our opt-in pages were converting around 60 percent which
is the highest that i think we've ever seen uh for opt-in pages and my guess is this had something
to do with that can't verify it but um you know we we left it on throughout the entire funnel
uh okay so that was all the messaging stuff uh and then finally the member portal i think we've
talked about this before at least to the elevate group um but you know essentially our members
portal is built on wordpress it uses memberium as the membership plugin that that talks directly
to infusionsoft um and barium works primarily with infusionsoft and active campaign um so those
are the two crm systems it works with but this is what controls access to individual courses lessons
modules etc um buddy boss social learner is the current theme i will tell you that we are rolling out a
new revamped version of the membership site with a whole different theme that was custom built
um so it's not an off-shelf theme anyways we rebuilt it we hired some developers to build it for us
um and the reason for that uh while the social learner theme and buddy press so buddy press is the
plugin that added some functionality to this theme like the the user profiles and things like that
um it's a little bit heavy uh so that's why the membership slate's a little bit slow um so that's
why we just decided to to redo everything uh visual composer is a plugin that uh essentially lets you
kind of design pages the way you want um similar to click funnels sort of inside of wordpress it's got
little little blocks that you can add to a page to make design and layout a little bit easier
um we and the current members portal had comet chat which is like the the facebook messenger type
thing um we're probably going to remove that um only because we're actually adding a bigger better
real community and forum and and other ways for you guys to interact with each other uh and we did find
that comet chat was actually slowing causing to the slowness as well so um but that is the chat
messenger app if you need to know what it is uh again all the videos in the portal are hosted using
vimeo it's cheaper plus bandwidth costs all that kind of stuff you don't get quite the analytics but
we don't really need them as much in the portal in the portal we more track you know did you mark the
lesson as complete um then and that's our indication that you watched the video um some of the content
is stored on amazon s3 particularly the downloads the pdfs the handouts all that kind of stuff
and everything is hosted on liquid web uh with cloudflare in front of it uh for caching and content
distribution and hack protection all that kind of stuff um so that is pretty much our stack um
again if you have any questions or comments leave them in the comments below i'll be glad to kind of
help you guys out and i look forward to talking to you guys live next month so have a good one uh enjoy
watching the rest of the launch and uh we're down to the finish line here so we're all excited but
definitely definitely you know got a lot to do as well to bring this thing home so uh we'll talk to
you guys soon take care
you
you
you
you
you
you
you
you
you
you
you
you
