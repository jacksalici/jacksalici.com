---
title: "This website has been built several times."
pubDate: 2023-02-02
updatedDate: 2023-10-19
slug: "website"
description: "I often rebuild my own website."
categories: ["Web Development"]
tags: ["website", "portfolio", "Hugo"]
link: "https://github.com/jacksalici/salinger-theme"
linkText: "Based on Salinger Theme (See the Repo)"
featured: true
cover: "/website.jpg"
---

As you probably have imagined, I built this website myself. Actually, I've built it several times because I can't decide how I want it. I think that this is due to the fact that as soon as I find a new inspo or framework I cannot stop thinking to that.  

## Hugo

Until late 2023, the architecture was based on _Hugo framework_. It was very minimal and I liked that, moreover, the theme has also been coded by me, using _Tailwind_ and _DaisyUI_ library and the page scores are amazings. The template is called Salinger Theme and can be found [here](/p/salinger-theme). On GitHub it has several stars and forks and it was one of the theme featured on the 2023 Hugo Convention. 

![pages-scores](/uploads/scores.png)

## Astro

In the last quarter of 2023 I found out _Astro_ and I fell in love for it, in particular for 3 features. Firstly, it's UI agnostic, so it let me to use several UI framework at the same time. I don't have used that feature yet (as for now, only the native Astro language) but in the future I could mix some Vue component (where I am most confident in) with some React (since it's the most popular in the industry). 

On second istance, I like it's completely component-oriented and it solves the struggle of quering post using Hugo templates. In Astro it's possibile to integrate custom code everywhere and it works like a charm since JSX like code can be written in every HTML page. Since I also design all the website by myself it wasn't really useful to have a so strong separation between content and templates as it was in Hugo (also considering the fact that my website it's relatively very small).

Finally, it's very fast. Faster than Hugo, actually. That's moved the needle.

## Features

The entire source code of the website is open source and available on [this](https://github.com/jacksalici/jacksalici.com) Github repository. 

Since the website it's static, it's really good both in performance and in lightweightness, and moreover it makes it possible to pay nothing for the hosting (the whole thing is hosted on _Netlify_). The only expense I'm in charge of is the domain, which I have bought from _Cloudflare_ for a few dollars per year.

I also have added some easter eggs that no one will ever notice so if you are curious look for a 404 error for one instance of my broken humor...

Having said that, do you know that I love pizza, coding and succulent plants? This website is also reachable at ``[🍕💻🌵.tk](http://🍕💻🌵.tk)'' (emojis order matters).

Just looking at [these](/p/emojipoll/) [projects](/p/emoji-list-api/) you know that I also like emojis but normally they change according to the operative system where they are read. So, I've applied the _Tweemoji_ (open-source Twitter Emoji) library to be sure to get the same emoji experience on all the devices. The theme also uses some _Google Symbols_ and it suppors _Font Awesome_.



