---
title: "Technology - Teddy - May 2017 - Tactical"
date: 2017-07-04
duration: 35m
duration_seconds: 2152
vimeo_id: 224194269
folder: "Tactical Calls"
source: vimeo
transcription: whisper-turbo
tags:
  - knowledge-base
  - video-transcript
  - vimeo
  - whisper
---

# Technology - Teddy - May 2017 - Tactical

**Date:** 2017-07-04 | **Duration:** 35m | **Folder:** Tactical Calls

---

Thank you. Hello? Hey, Terry, can you hear me? I'm here. Yes, thank you.

Cool. How are you doing? Great. That's good. Let's see.

Well, you're the first one on, and nobody else is here yet, so we can start. Well, they're coming. Yeah, that's fine. Got to wait for that Zoom stuff to load, you know? Yeah, there's the deal.

So, you're getting ready for your big launch? I'm getting ready for a big launch, yep, and a little bit of a pre-launch vacation should
be interesting, so. Oh, my gosh. You going anywhere fun? Yeah.

Yeah, Italy, actually, so. Oh, that's a huge trip. Yeah. Where in Italy? Rome and Venice.

Ah. No Florence this time, huh? I might take a day trip there or something. I have to say, Florence was my favorite, Rome second, and Venice was third. Really?

Okay. So, I'll be interested in your experience and your family's experience. What did you like about Florence? Well, obviously, the art and the city just seemed more livable. Gotcha.

Didn't feel like such a tourist. Just in Venice, it was sort of like people hated you if you were an American. Yeah, that's like, that's how I felt in Paris. And I even spoke Spanish to everybody in Paris. I was like, I'm not even American.

I'm Spanish. That's in my head. Well, you'll have a great time, so. Cool. All right.

Neil? Anybody else join? Are you going to share your screen when? Yeah, R. Yeah, I'm not sharing my camera only because I'm at a hotel with incredibly horrible internet bandwidth.

Ah. All right. What's up, Neil? Hello, R, whoever you are. Robert.

Robert. Yeah. What's up, Robert? All good. All good.

How you doing, buddy? Yeah, busy a week. That's good. All right. All right.

So let's get started. So Terry emailed me some stuff. I had some communications with her yesterday. So I'm going to help her out first, and then we'll bounce to you guys if you have any in particular. Uh, all right.

So, so yeah, Terry. So in terms, so the fact that you've already got, so everybody else, so Terry's question
was kind of about securing her WordPress and kind of what she needed to know and do before
she actually launched it to make sure it was secure. Um, and you know, one of the things I said to her was that, you know, for the most part,
if you're not, you're not storing any sensitive contact details or any payment information or
you don't have order forms or anything like that, um, while SSL is still, you know, it's
not necessarily required, especially not to, to launch the site. Um, but what I said was that, you know, some of the bigger issues, especially with WordPress
sites is around them getting hacked. Uh, and, um, you know, they're just, there's a very vulnerable target.

Um, so she was asking what kind of, hang on, let's see. She was asking what, you know, what she needed to do to kind of prevent against that and stuff
like that. Um, so, you know, in terms of what we do primarily, uh, there's, there's two plugins
that I install pretty much on every WordPress site we ever build. Uh, one of them is WordFence. The other one is Updraft.

Um, so WordFence is kind of a security plugin. It's kind of monitors the site for different types of attacks, either people trying to
submit different, you know, submit the same. password a bunch of times to try to brute force login, um, or just, you know, lots of requests
coming from a certain IP address or, uh, people trying to, you know, submit code into a blog
post comment, things like that. Um, and it also kind of creates a firewall, uh, to some degree that kind of helps block that
stuff out. Um, and then Updraft Plus is essentially just a backup plugin.

Like the, the reality is, is that there's, there, there's a, I'd say probably a 30% chance
that, that a WordPress site will get hacked. Um, typically, um, but so the key, the key to fixing a hack is, is having regular backups. So Updraft Plus is a good backup plugin that I use, uh, you can schedule it to back everything
up. You can have the backup sent to an offsite location such as Dropbox or Amazon S3 or, you
know, any of the other kind of cloud drive, uh, locations so that it's not on the server
so that, you know, if somebody was to able to actually get into the server, um, you know,
delete your backups. Now, the other thing I mentioned to Terry, an email I sent her was that it was the reality
is, is that most times when somebody hacks your site, um, they're typically not there
really to do damage in terms of stealing your database for personal details.

Like, you know, they go off to target and banks and stuff when they want to do that. Uh, most WordPress hacks are just somebody kind of manipulating the, the source code to,
uh, to install malware on a, on a visitor's computer when they visit the site. Uh, and, you know, most people's computers have antivirus on them that will detect, you
know, most of it. Uh, obviously we just saw with that, uh, you know, that payday kind of attack that happened
around the world a couple of weeks ago, uh, that plenty of computers are still vulnerable
to that. So, um, but what I'm saying is that, you know, they're not trying to steal your customer
details or not going in and deleting your database.

They typically don't even delete files. They'll typically just add files, uh, that allow them to get back into the server when
they need to, and, or we'll modify some of the code, uh, to, to render these different
things when somebody visits the site. So having a good backup is, is really the quickest, easiest way to restore it. Um, and then I mentioned to her that, you know, there's, there's a couple of companies,
um, security is one of them, uh, word fence. Terry actually also just launched a service similar to, um, security that, uh, well, you
know, not, not only audit the security of the site, but also kind of provide protection
as well.

But I think security is a better, better service for that because they'll actually go in and
clean it if something happens. Um, so security is, security is, it's S-U-C, S-U-C-U-R-R-I, I believe. Um, I think it's only one R. Oh, one R, yeah. Um, but anyways, so they will, they will kind of, they will do two things.

One, they will kind of create facade to some degree for your website so that any hack attempts
or any attempts to kind of access the server, never get to the actual server so that, you
know, when somebody tries to load your website, it's actually loading it through their servers,
not your servers. So it just adds an extra layer of protection, kind of like a firewall. Uh, and they'll also monitor, uh, the, the site files for any changes or modifications,
which word fence does as well. So you can set up word fence to run a scan every day and it'll tell you if it sees any files
that have been modified from, from what they're supposed to be. So it checks the, checks the WordPress repository for both the, the WordPress core code and also
the WordPress themes and plugins.

And if it notices that a file has been changed, it alerts you and lets you know, so you can kind
of fix it. Um, so then she was asking, um, so I think I answered your question a little bit about,
uh, about that. Uh, now you mentioned that, uh, you were clicking on some links, you got a four or four page and
your four or four page showed listings of other pages. Um, and you said that you have some fulfillment pages that you don't want people to be able
to access. So I guess my question is, were you planning to, were you planning that people would only
access those pages when you gave them the direct link to it?

Or were you planning on actually having some sort of membership site protection or password
protection on a page to actually prevent access to those pages? Okay. Let me, let me answer that. But before I do just a quick follow-up on what you shared, which is very helpful. Um, today I also got a recommendation for a plugin called Bulletproof Security.

Are you familiar with that one? I am not familiar with that one. Okay. All right. Um, but I'm using wishlist to control access to the pages that people need to have paid
in order to get access to.

Yeah. Okay. Um, so if that's, and two things. So even if that page does show up on the 404 page, if somebody clicked through to it, they
wouldn't be able to access. Okay.

Wishlist should grab that and say, nope, you got to log in and have access to this. So technically it's protected, but, um, that doesn't mean that you shouldn't create a custom
404 page that, that doesn't contain that site directory in it by default. Um, so there's, there's plugins that you can get for that. Um, there may even be a way to actually specify, I think, I think you just create a custom page
inside WordPress and then you can specify that to be the 404 page and there should be a plugin
that does that. I don't know what went off the top of my head.

And, and the custom 404 page would, what, have to specify things that shouldn't be shown
on it? Or is it only whatever it says on it is all it says and it won't be pulling in anything
from the website itself? Yeah. So what's happening is that the default 404 page in your theme is currently configured
to show the site directory when somebody can't find something, which is, which sometimes
is good, but in this case you don't necessarily want that. Um, so by creating a custom 404 page, you can basically design the page and you want and
you can say, Hey, look, sorry, you know, this, whatever you were looking for isn't
available, you can put a search box on there and let somebody search, uh, just be aware
that, you know, there are ways to search WordPress to, uh, basically without, you can see a search
box, like even if you have search blog posts kind of on the site somewhere, uh, you can
just enter nothing in that search box and hit submit.

It will actually show all the pages in the site as well. Um, but again, like nobody's going to be able to really access those protected pages
if they try to click through on it, they'll see that it exists. They'll know the URL to it, but they won't be able to access it because wishlists will
prevent it. So. Okay.

So you're saying I should put a search thing on a 404 page? Uh, you don't have to, you can just be like, sorry, that that page wasn't found and
just return to the homepage. Oh, okay. Okay. Great.

Thank you. Um, and then let's see, there's some typical things people do and try to get access to
the site. Yes. So security and word fence should handle both of those. Like I said, most of the times it's, it's one of three, it's one of three or four things.

Number one, they're going to, they're going to buy like, uh, they have scripts essentially
that run through basically all possible password combinations and including lots of common
passwords that they find. Um, and a lot of times, like when the big, for instance, like those, if the passwords
are, are visible, uh, those lists will get shared around the internet with hackers. And so, you know, we'll run through a database of, you know, a couple million entries and
try all the different passwords that were in that list to see if anything works kind of
thing. Um, so that's, what's called a brute force attack, whether it was hitting, hitting your
login page millions of times. So with word fence, you could say, you know, Hey, if, if anybody's, if anybody tries to log
in more than five times in five minutes and they failed five times, like block them for
a day, block them for a month, block them forever.

Um, and that, that forces them to kind of use a different IP address and, but it'll keep
automatically blocking them as we keep failing. So that kind of prevents that brute force. Um, the other way that people hack sometimes is, like I said, through comments, they'll try
to inject code into a comment box, um, that will try to execute that code on the server when
the, when the comments submitted, those don't work that much anymore. Um, but you know, a sophisticated hacker might be able to get in that way, but the, the most
common way that people get in is just using plugins that are outdated or haven't been updated
in a while. So, you know, be very careful of which plugins you're using, um, delete, deactivate and delete
anything that you're not using, uh, deactivate and delete any themes that, that you're not
using, um, just to minimize the surface area that somebody could use to kind of get in and
attack.

Um, and then also make sure like your FTP passwords are, you know, are long and complex and secure
and things like that so that somebody can't actually figure that out either. Okay. Very, very helpful. Going back to the other plugin you talked about in terms of Updraft Plus, is that, uh, it takes
backups automatically on a schedule or do you have to manually invoke that? Well, you can schedule.

Okay. Yeah. Both, both work. So WordFence, you can schedule when it scans and then anytime it runs a scan, it'll email
you if it finds any problems. So you'll be notified immediately.

Uh, and, uh, and a lot of times it'll notify, like sometimes you get too many notifications. A lot of times it'll just notify you of things that need to be updated, but. Right. Is, is there a recommended, uh, timing schedule for both of those? It kind of depends like how active the site's going to be and how much, you know, so if it's
getting, you know, if you're posting new blog posts every day and you're getting comments
every day, then you might want to do it daily.

If you're updating it once a week and you're not afraid to lose like a week's worth of
comments or, or posts, then that's a week. But so it's more determined by that schedule than anything else. It's talking about, um, WordFence, right? Or are you talking about Updraft Plus or both of them? Updraft.

Yeah. Updraft. Okay. WordFence, WordFence, there's nothing wrong with it scanning every day. I, that, that'll alert you as quickly as possible if, if something's changed and you can, you'll
have a backup to fix it.

Um, and in Updraft, you can set how many different backups to store, right? So if you set it to two or four backups so that if for some reason you didn't catch it. I'm, I'm, I'm sorry. I didn't quite hear you. How, you said how many to store what?

So the backups, you can set it to store how many different backups, right? So if you're backing up once a week, you can say store four, store a maximum of four backups. That way you'll have a month's worth of backups. So, you know, if for some reason you didn't catch the hack for two weeks, you have a backup. Got it.

You can restore. Okay. Okay. Great. Thank you very much.

Very helpful. Cool. But yeah, security, I mean, security will handle 99% of that for you anyways. Like if it does get hacked, like they'll make sure it's backed up. They'll, they'll restore it if something happens.

Um, so it's a good service. Yeah. I, I actually gave them my site when it, um, had been, um, hacked, um, by someone else on
another platform and they cleaned it all up. So that was good. Awesome.

Anything else on that? Nope. Awesome. Good deal. I'm excited that you're getting, getting it.

When are you actually launching it? Yeah. When do you plan to actually launch it? Well, I'm, I'm going through now. We had to update the, um, Avada theme because there was a security update that came out from
them.

Um, so I'm now in the process of going through and a couple of things got broken and, you
know, they don't have patches for, so we're doing a couple of workarounds, but I'm hoping
by the end of the week. Awesome. I'm excited for you. It's been a long time coming, as you well know. Sure has.

Sure has. That's good, though. Good. Awesome. All right.

Well, if anything else comes up, obviously during that time, let me know. Well, great. We'll do. Thanks. All right.

Robert's got his hands up. What you got, Robert? Well, uh, are you traveling? Did I hear you right? I am not traveling at the moment.

No, I will be. I will be traveling to Italy, uh, next week. Oh, next week? Yeah. Awesome.

Awesome. But I am in a hotel only, I think you guys, most of you guys know that I had a fire at
my house. No. Oh, yeah. About three weeks ago, there was a fire at my house, so.

Oh, my gosh. Everybody okay? Yeah. Everybody's okay. House is fixable.

All my stuff is okay, so, and hopefully insurance will give me some extra money that I didn't
have before, so we'll see. Oh, nice. Well, not nice, but. Yeah. Well, it's funny, so I'm telling you, I was like, be careful how you write your goals
at the beginning of the year, because at the beginning of the year, I clearly said I
wanted to redo my hardwood floors, put in new carpets, and paint the walls.

So, that's all happening. You didn't specify the circumstances under which that would take place. Oh, but, you know, to some degree, now somebody else is paying for it, so it's actually better. Let's see. It's like law of attraction in action.

Yeah. Yeah. Instant manifestation, for sure. So, my question is, I became an affiliate for the upcoming launch and spoke to Todd, and he volunteered
some help to promote that launch with me because I'm in the radio and newspaper business, so we're going to do that. So, he's going to record some of the stuff that we can play on the radio, but I already have some of my clients that would be interested in learning more
because Tom Brown is not necessarily as known in my neck of woods where I live, as I wish, and when I talk about him, the methodology that I've learned from you guys is becoming something that's an uphill battle.

So, I figured, let me get them maybe on the list, and one of the suggestions he gave me is to, in fact,
pick something from, let's say, from the portal and start using that as like a teaser, in a sense. But whenever I'm lately on Facebook, I'm noticing that you guys are already running ads for all kinds of things. And I would assume that you are behind that process, aren't you? I'm not behind the Facebook ads. Damien is, but I'm behind all the pages that the Facebook ads lead to, so yes.

Okay, okay. So, basically, I was just thinking this. In order for me to get the online version of Tom Brown presence, I was just thinking to include some of that instead of going to, let's say, the portal and pick something,
because that's becoming a little bit of, you know, the parts are, the lessons are kind of big. So, what I like is in those teasers on Facebook, I would like to use maybe one of those, and then get them on the list, so to speak. And, let's say, place it on my website, promote that website of mine, so they can get the teaser and go through,
because I signed up for a couple of, well, actually for one, twice, for the E5 camp.

And, you know, even that process of me, like, going through that process and me looking at that webinar,
signing up for the webinar, yara, yara, yara, I think that I find this a perfect fit,
because I think they would appreciate that it's not as advanced, so to speak. It's just perfect for the introduction to Tom Brown methodology. And, how can I get my hands on, and who would assist me with this? Well, so I can certainly create an affiliate link that you can use to send people to the current webinar. But just know that, you know, we're going to be pulling that webinar offline, you know,
about a week before the launch, so that all efforts are focused on the launch.

And also, you know, if you want to, if you want to compete for any of the affiliate prizes,
then you're going to want to promote during the launch window versus promoting to the webinar now. But on the flip side, we do have a site up at e5method.com,
which is going to be the domain for the launch. And on there are three of our blog posts, or four blog posts, actually,
that, you know, aren't pitching anything, aren't selling anything. I don't even think there's an opt-in. We're using them kind of just to warm up the domain.

But those could be things that you, you could send people to those. And they explain kind of the, you know, the prospect awareness pyramid and different things like that. So that could be good, that could be good seeder content that would prepare them for the launch as well. Is there a video in there in that blog post by any chance or just, just, just, just blog posts? Yeah, just, they're just blog posts currently.

We're, we're about to add a, a teaser video to, to some of those posts. Okay. Okay. So that would be perfect. Because I'm already an affiliate.

I already have my link. Uh, uh, I went to Tanya at one point, a couple of weeks ago. And, uh, I'm kind of put everything on hold because I don't know where to send those people right now. Even like we would talk about this. I talked to my clients.

I said, hold on, I'm going to have a link for you and I want to send them somewhere. So you've mentioned that there is a page already up. Uh, so if I place that on my website and on the radio, I can actually send them there. Uh, so they get, so, so if, if they start, uh, signing up for the list, would that be, or do I have to wait until you guys officially launch? Or would that be considered as those people signing up right now?

Uh, so they would just basically fall into that, uh, naturally into that, uh, sequence of events. Yeah. So, so if they get, so if they, so if they just go to E5, I'll show my screen here. Uh, so this is the E5 method.com site. So these are the blog posts.

Um, and again, it's a blog post and then there's three other blog posts on here. So, you know, it's a good professional looking site, uh, but two calls to actions to get on the notification list. Uh, so if they sign up for that, they, they will get attached to you, uh, as the affiliate and now I'll have to create an affiliate link. We don't have any affiliate links set up to go to this page yet, but I can add some to, to your account so you can, so you can do that. Oh, that would be fantastic.

So when can you do that? For my action on my end here. Yeah, I can do it, uh, later today. Okay. Oh, fantastic.

Oh, fantastic. So, cause, um, I talked to Dave on a couple of, uh, Friday or anyway, last, no, last Tuesday, actually. Wow. I was flying back, but, um, but he's arranging the recordings for me. So I'm just going to touch base with him most likely tomorrow, hopefully, and see where he's at with those recording, recordings actually.

And then if I would have the link, then I could get the ball rolling, uh, as early, probably as, uh, maybe Friday, hopefully. Um, that would, that would be great. Awesome. You know, the other thing you might be able to do, I don't have this content, but David probably does, or David probably does. Uh, I mean, you might be able, you might, can use your own testimonial video that you gave us at the event as, as a video, as pre-launch content.

Yeah. Yes. Yes. Uh, yeah, actually good point. Thank you.

Um, I can actually even use that absolutely, absolutely to validate and make that, uh, connection. Yeah. Fantastic. But yeah, I'll, I'll get these added, uh, and then, you know how to log into your affiliate portal to get your links and stuff? Yes.

I already went there a couple of times, uh, and, uh, yes, yes, absolutely. Okay. Yeah. So I'll make a note here and then, uh, I'll add it and then, uh, I'll, I'll send you an email or ping you when it's ready. Yes.

Uh, so I have more questions, but not for today for you. Uh, uh, Teddy, like you just, uh, there's something that just happened a couple of weeks ago. That's very exciting. So just, uh, but I want to finish this part before I start on, on the other stuff. So just make me aware.

Awesome. There's more stuff coming. So thank you so much for today. You're welcome. And before you go, so you're going, so when are you coming back?

You're coming back, hopefully not. Well, not hopefully, but I know the launch is coming, so I'm sure you're going to be needed here. No. Yeah. So this is the, this is the first time I've ever done this in a launch, but it's actually, it's actually nice that I'm working with Todd because it's also the first time that we've, usually when you're doing a launch like this, like you don't have any of the stuff ready until two days before the launch.

Uh, so the fact that we've been working on this pretty much all year and we have pretty much everything created now means I've been able to wire everything up. But yeah, I actually leave, I leave next Thursday and you know, launch starts June 15th. I don't get back till June 20th. Uh, so yeah, but, so I got to build it right the first time and hope nothing breaks, but. Oh, awesome.

Awesome. Awesome. Okay. So have a great trip and, uh, and what else? That's it.

And you know, so when are you moving in back to your house? Oh, it's probably going to be a while for them to rebuild it. Probably six months or so. So. Wow.

So you're going to live in a hotel until then? No, no, no. Once I get back from Italy, I'm moving into an apartment. Okay. Awesome.

Okay. Thank you so much. Take care. Thank you. All right.

And Neil dropped off for some reason. So we've got somebody on an iPhone. Do you have any questions? Can you hear us? You have another question, Terry?

I do. Totally new subject. Sure. Um, going back to our Facebook challenge, uh, don't yet know if my site really and truly
is blocked because somebody said, since you've got it on maintenance mode, it may be that
Facebook is reading that and is just not, you know, going to allow anybody to share at
this point anyway. So I'm going to go ahead and launch and then see what I have to do.

But I seem to remember that you had said, or Todd had shared that you guys had to come
up with another domain because Facebook didn't like either your company name or one of your
websites or whatever. Do you, what was the domain that you set up that you were using for your Facebook, um, focused
outreach? Uh, marketing funnel dot tips, marketing funnel dot tips. Oh, it's a new, new thing. And that worked fine.

Yep. Yeah. So it was so, but it wasn't the same situation as yours where, you know, yours, they're kind
of blocking me from just sharing links naturally. Uh, this was, they blocked our domain or they blocked our ad account, uh, associated with
that, but they blocked our ad account. And because we were using that domain for that ad account, um, we, we changed it to a
different domain.

It doesn't mean that I can go to Facebook today and post a link to marketing funnel
donation.com and just a blog in a regular organic post and it doesn't get blocked. Um, but the other thing I would tell you too is, so whatever that person told you may,
may be correct. So it could be, you have a robots.txt file that's preventing anybody from spidering the
file site. Uh, and you, there's also a setting in WordPress under, under settings that, uh, you know, allow
search engines to index the site kind of thing, which that may be blocking crawlers as well. Uh, right.

So again, I'm, I'm just going to go ahead and launch and then, you know, experiment from
there once we're actually live. Cool. Okay. Thank you. All right.

So it's just you two left. So unless Robert has anything else, I think we can call it a nice short night. Good, Robert. I, I think I'm good. Like I have so much stuff.

Like I just give you a preview. Um, there is this, uh, one of my clients, um, is in trading. Uh, he actually does Forex trading and I was looking at his stuff for a while and he got,
uh, uh, involved with some people from here in Toronto, then India, as all kinds of nonsense
happened. Um, and I was watching him and, uh, when we met, I ended up, uh, sharing what I've learned
and it was very interesting because I may become a partner with him on, on his activities. He has this unique, uh, unique, um, approach to trading Forex and, uh, I can wait when I'm,
when the lunch is done and I can actually formulate, um, some strategy for him as well as, uh, as well
as, uh, take advantage of your insights when it comes to, uh, uh, uh, like building some
of the funnels that, uh, that, uh, we'd like to build.

But anyway, that's, it's, it's coming up and I'm very excited about this in the background right now. I'm already working on it and, uh, and it's, it's interesting anyway. So that's something that, that will be coming up, uh, probably in, when you come back, obviously. Okay, cool. And you know, you should talk to Marcus about that too, obviously.

Yes, yes. I already spoke to him at the, at the event and, uh, I'm on his list as well. And he gave me a couple of good pointers and even for, because you know, like I've noticed
that, uh, uh, Forex is, is, is in the US Canada, it's, it's, it's okay. But when it comes to Europe and Asia, it's huge. So going to those markets, but then, uh, probably for traffic and stuff, I would have to, uh, talk
to some of, uh, the elevate members of John and, and, uh, even actually even, even to Sean
about how to approach those, those markets, because, you know, placing ads, uh, you know,
in, in, in, in Singapore or China, that's probably going to be a bit of a different
involving than here.

It definitely is. Definitely is. I was, I did some marketing for a casino in the Philippines that was marketing to China. Uh, and it was, it was definitely a challenge, especially when the, when the copy I wrote
got translated to Chinese and I had no idea whether it was translated properly or not. Uh, can't wait, can't wait.

This is exciting time for me. Awesome. So I thought I'm just going to share that and, uh, and, uh, and once again, have a good
trip. All right, buddy. I'll talk to you soon.

Take care. All right. And that's a wrap. Thanks guys. Bye.

Bye. Bye. Bye. Bye. Bye.

Bye. Bye. Bye. Bye. Bye.

Bye. Bye.
