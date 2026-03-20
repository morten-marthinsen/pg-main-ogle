---
title: "Hosting - Clickfunnels"
date: 2018-06-01
duration: 13m
duration_seconds: 789
vimeo_id: 273028183
folder: "VCTO"
source: vimeo
transcription: whisper-turbo
tags:
  - knowledge-base
  - video-transcript
  - vimeo
  - whisper
---

# Hosting - Clickfunnels

**Date:** 2018-06-01 | **Duration:** 13m | **Folder:** VCTO

---

Okay, so in this video, we're going to talk about where to build and host your website. So essentially there are two basic options
that I would recommend. Number one is click funnels. This is what we use day in day out for everything that we build
and it's probably going to be your best choice long term
but it's a little bit more expensive than
some of the other options such as using WordPress and hosting it yourself. So click funnels runs
anywhere from 97 to 297 a month depending on which features you select
but you can certainly get away with the $97 a month plan and there is also a
Usually a free 14-day trial.

So if you're just getting started, you want to build your site quickly
You've got all your content assembled and ready to go
then you can use the 14-day trial get everything built in a couple days and
Then launch it start making some money
Enough to pay for the subscription. The other option is going to be using WordPress
So the advantages of click funnels number one is there's nothing to install with click funnels
Everything is already set up for you
You just point your domain at it and you can start building your site really quickly
It integrates with all the major CRM systems
The $297 a month plan has Actionetics, which is in itself its own CRM system
So technically you don't necessarily need another CRM system
Although I still recommend using something like Infusionsoft or ActiveCampaign
And it's also because of the way it's built it's less prone to hacking so your WordPress is by far the the most popular content
Management system on the planet and because of that it's also the source of most attacks
and hack attempts so
With WordPress you have to make sure that you install certain plugins to kind of protect your site
You have to make sure you're running daily backups to so you if anything happens you can restore your site things like that
So there's a lot more maintenance involved in using WordPress. It's a lot more technical knowledge involved in terms of
understanding FTP
understanding how to set up your hosting server
Things like installing the themes installing plugins knowing what to do when something breaks
So there's just a lot more to it
So if you can afford the $97 a month, I would highly suggest you just go to click funnels
WordPress is
Usually the only time we use WordPress is for our membership areas
Because there you want a little bit more integration and there are certain plugins
Designed for membership areas that make them much easier to manage in terms of who has access what they can access
as well as you know
Plugins like learn dash and things like that which help the course consumption process go smoother
Now click funnels does have a membership area in it as well
It's it's very simple, but it works fine. So as a starting point you could certainly start there as well
Now in terms of so again click funnels you just sign up
There's really nothing else you need to buy nothing else you need to set up all you would do is point your domain to it
And if you were going to go with WordPress
There's a variety of hosting companies that you can choose from I would say the two to look at would be
Number one hostgator or number two. I also like in motion hosting as well
In motion, you know has a little bit better options in terms of the types of servers that they use things like that
Now when you're choosing a hosting plan
You want to be careful as to which plan you choose
There's a variety of plans you don't necessarily want to go with the cheapest plan because
The cheaper plans basically put you on shared servers with lots of other sites
And if one site is having a problem or using up a lot of memory or CPU that can affect your website as well
So I would recommend going with the VPS hosting this is more of a
Virtual server that is yours that you control
And can pretty much do whatever you want on it.

You can have some limited domains on it things like that. So
That's probably the route I would go either on either
Hostgator or in motion
But then once you've set up your
Account you're going to get access to what is called cPanel
So cPanel and this will be this the same inside of in motion as well the user interface might look different from hosting provider to hosting provider
But in general they all all cPanels work the same
So the first thing you would do
inside of cPanel is you would add your domain to the account if
Now when you register
The when you register your account and first set it up if you're only going to
If you set up your primary domain to it
Then you don't have to do anything but if you're going to have multiple domains on here
You just go to add on domains and you would enter your domain name
You don't you have to enter a ftp user
And the document root is typically always going to be public
underscore html
forward slash whatever you want this to be
Usually the best thing to do is just put you know your site doc whatever your domain is
so that you know which site this is
And then you set a password you can use your password generator to generate a strong password
Just make sure you copy this down to a secure location so that you have it
And you do want to use strong passwords here
This will be your the ftp address for the site, but it's also what prevents the site from being hacked
Now once you've set that up
It'll go ahead and do its process and it'll give you back all the information which you can copy
And then you're going to need to install wordpress so most cpanel accounts have some sort of system for installing wordpress
Usually it's either quick install or fantastico or something like that
So what you would do is you just click on quick install
You say I want to install wordpress
And ideally you know you're going to go with the free option here
You don't have to pay them for anything, so you just click on install wordpress
It's going to ask you you know which domain do you want to install it on
As well as the path so by default you're going to install it right at the root and you wouldn't have a path here
But if you were installing it as like a membership site you want it to be your domain.com forward slash members or something like that
You can put members here
And the admin email is going to be your email this is where all notifications are related to the site will come into
Enter a title
Enter the username of the admin which again is going to be your username
Typically don't use admin here. You should use your name and your you know
Four or five characters at least and something that's not easy to guess
Put in your first name and your last name and then click install and it'll
Run through the process. It'll just create the databases
And it'll give you what your password is to access the site and once it's installed
You just go to your domain.com forward slash
wp-admin and
That will take you to the admin page where you can log in with the information to give it
Now in order for your domain.com to work
You first have to set the
The ip address so as we talked about before
If you're going to use your own hosting then inside of cloudflare
You have to go and set the a record to the ip address of the server
And you can get that information over here
Right here is the ip address of the server
So you can just copy that
Post that into cloudflare for the a record of the domain
Give it you know
An hour or two sometimes with the 24 hours for it to propagate but usually it's pretty quick with cloudflare
And then you'll be able to access the site at your domain
So that's how you do it inside of
cpanel and if you are using click funnels you would go under domains
And you would basically do the same thing so you would add a new domain
You can you're going to use an existing domain that you because you've already purchased it so you put in here
So marketing the fall course for instance
You should have already done this at cloudflare so this should already be pointed to target.clickfunnels.com
So click i've done this step
Uh, you'll see that because I did point it
So this is why you have to set up cloudflare first because it needs to find this so
Uh, and then you just associate this with a funnel
If you don't have the funnel built yet, then just click just show me my domains
And then when you build a new funnel so in this case, we don't have a funnel built yet, right? So if I were to build a new funnel
In this wizard, I usually always just create a custom funnel
But you can use their pre-built funnels which sets up some of the pages for you
Uh, so if you just want to do a lead generation campaign where you're collecting emails or if you need to sell a product or if you're doing a webinar, etc
Um, but I just like to create a custom funnel and name it whatever the domain is
The uh, the group tag is if you want to group all your funnels together kind of like in folders
So you can just create a new tag, uh, I'm gonna use demo since I already have demo
But if not, you could create a new tag and hit enter it would create a new tag
Then I'm just gonna click build funnel
All right, and then to associate this funnel with my domain
Uh, what I need to do is I need to scroll over here
One second
So I go under settings
And then under settings here domain, I'm gonna choose the one I set up
And then I hit save and update settings now that that domain is associated with this funnel
Uh, one other thing you need to do actually under
Especially once you've associated it with a domain
Is click on this little icon here
So you should see now that it's so well so the first page hasn't been built yet
So once the once you've built your funnel, you're gonna come in here and select the first page of the funnel
As the root url so that anybody that just types in marketingfunnelcourse.com will go to that page
You're gonna typically do the same thing for the 404 and error page just always redirect it to the first page of the funnel
So these two will be selected to this thing
Same thing and then you're gonna go under ssl and you can click this add ssl button
This will take a little while to to set up, but that's what will allow you to
securely process credit cards and things like that
So that's pretty much the overview
Again, I would say click funnels is by far going to be your best choice.

It's the most flexible
It's the easiest to use it just plain works
And it's you know relatively affordable and just a lot less hassle especially if you're not very technical
And then but if you wanted to you know host wordpress use wordpress for some reason
Then again hostgator or in motion hosting are the two I recommend liquid web is also very good
And a lot of people like to use wp engine I personally hate wp engine while it is very secure
And sites do load fast on it. I find that its caching mechanism
Gets in my way more often than not as a developer so that I can't always see the changes I make
Um and it's a little bit more complicated to use so unless you're doing you know getting a lot of traffic to your site
And you're having speed or scalability issues
I would recommend just getting a vps or a dedicated server on hostgator or
in motion
Alrighty that does it for this video
