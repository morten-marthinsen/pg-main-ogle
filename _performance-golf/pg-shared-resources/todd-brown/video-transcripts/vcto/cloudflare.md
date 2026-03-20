---
title: "Cloudflare"
date: 2018-06-01
duration: 8m
duration_seconds: 524
vimeo_id: 273027653
folder: "VCTO"
source: vimeo
transcription: whisper-turbo
tags:
  - knowledge-base
  - video-transcript
  - vimeo
  - whisper
---

# Cloudflare

**Date:** 2018-06-01 | **Duration:** 8m | **Folder:** VCTO

---

so in this video we're going to talk about using Cloudflare so in the last
video we talked about registering and buying your domain name so Cloudflare
is essentially if you remember in that video I talked about the domain name
service which is typically the phone book where a browser checks to see what
server a particular domain name should be pointed to so Cloudflare is
essentially a standalone domain name service separate from the domain name
service that's provided by the domain registrar which typically GoDaddy or
Namecheap wherever you registered it now you can certainly use GoDaddy's or
Namecheap's domain name service you don't need to use Cloudflare but I highly
recommend it for a variety of reasons number one it's free number two it also
will speed up your site because what it ends up doing is it creates cached
versions of your pages and automatically distributes those cached versions all
across servers around the world on Cloudflare's network therefore when
somebody requests a page from your site if Cloudflare already has a cached
version of it it will grab that it also will prevent hacking and denial of service
attacks denial of service is when somebody's trying to hack your site and
they'll just send a ton of automated traffic to it to try to overload the
server and and crash it so that server can't process anybody else's requests for
the pages on your site so Cloudflare handles all that it and it also provides
you with a free SSL certificate so SSL stands for secure sockets layer and that
is what is used to encrypt information being collected on your website such as a
credit card number primarily but also like login pages and things like that and
you will need that obviously to process credit card transactions so it's a super
valuable service again it's completely free to use and it's in in my opinion a
must-have so essentially all you need to do is go in and sign up for a free
account again it's completely free just put in your name and email address and it'll
send you an email to set up your account I already have an account so I'm just
going to log in to mine and then I'll show you how to point your domain that you just
purchased or any of your existing domains over here to Cloudflare okay so now I'm inside my
Cloudflare account I have several domains set up already but what we're going to do
right now is add a new domain so you're going to choose one of the domains that you whatever
domain you want to choose and I just bought a bunch of domains based on that
keyword research that I did so I bought marketing funnel course calm so let's
set this up use this as our demo so I'm just going to add the site and so what
Cloudflare is going to do now is it's going to query your DNS records so again
when you first purchase the domain GoDaddy sets up its own DNS for that that
domain and it sets up some stock records and things like that so or if you already had a
domain set up somewhere else and now you're just moving it over to Cloudflare it's going
to pull in all your different DNS settings such as your mail servers and the IP address of the server
was already pointed to things like that but in most cases we just bought a brand new domain and
so there's not going to be much here that uses we're going to select the free plan so this is absolutely
absolutely free it gets you the free shared SSL certificate I have not found a reason to pay
for any of the paid plans as long as it's free keep using the free plan so we'll just select that
and we'll confirm our plan and so you'll see that it's pulled in several IP addresses and aliases and
things like that so you can verify this to make sure it's all correct but in most cases you're just
going to click continue here and so now what it's going to do is it's going to tell you that you
need to change your name servers at your domain registrar so it'll tell you which servers to use
so we got chip and reza.cloudflare.com so what I'm going to do now I'm going to log in to GoDaddy and
I'm going to go into my domain manager and I'm going to search for that domain that I just bought
called marketing funnel course so I'm going to open that up and then on this page it comes up you're
just going to scroll down to the bottom and click on manage DNS and so here again you will see the
different domain records that are in here we're not going to dive too deep in those but you'll also
see the name servers so this is what you want to change so you're just going to change this to custom
and you're going to copy what cloudflare gives you so I'm just going to put that in there
and copy reza put that in there and hit save
so it's going to take a little bit of time for usually GoDaddy is pretty quick so sometimes it's
almost instantaneous could take up to an hour theoretically it could take up to 48 hours for
this change to take effect but typically it doesn't typically it's pretty much right away
and so once you do that you can just click continue
and so it tells you that there's a DNS modification pending you can recheck this again sometimes it's
instant sometimes it's not it doesn't really matter we're not ready to necessarily point it to our
servers yet or start working with it yet now the DNS so once you have it set up here there's lots of
different settings here but primarily the everything is set up by default the way you want it the security
levels media and you'll get a full SSL certificate etc so really the only thing you need to do here
is if you hadn't already set the DNS previously then you're going to want to set it here now this
will depend on which system you're using so if you're using click funnels for instance to set up
is a little bit different than if you're using a wordpress site and you're hosting it on a server
which we'll talk about hosting and wordpress sites up in a different video but if you were hosting it on
wordpress then you would leave this a record and you would just change the IP this IP address to point
to the IP address of your server if you're using click funnels you actually will delete these there
shouldn't be two a records either it's kind of weird I'm not sure why there's two but typically you will
just delete these for click funnels which is what we're going to use in this case and then you will
add a new CNAME record and the CNAME is going to be the same name as the domain so marketing funnel course
dot com and this field here is the name of the click funnels domain name where you point your domains
to and it is called target dot click files comm so you just click add record and and then it'll
automatically set that up to www is an alias of marketing funnel course comm so www traffic will
redirect to mark without www typically I don't use www anymore I just use the root domains on all
my funnels and that's pretty much it that's for the most part all you have to do inside a cloudflare
to use it for click funnels again if it was going to be used for hosting on a regular server then you
would just change the a record to the IP address of that server and we'll dive into that in a different
video and I'll also then show you how to connect this domain to your click funnels account in a separate
video
