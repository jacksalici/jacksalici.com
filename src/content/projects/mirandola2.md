---
title: "Mirandola 2 website"
pubDate: 2024-11-01
description: The fullstack website for my scout group.
categories: ["Web Development"]
tags: ["Nuxt", "Node.js", "fullstack"]
stack: ["Nuxt", "Node.js"]
cta:
  - { url: "https://github.com/mirandola2/frontend", label: "Frontend" }
  - { url: "https://github.com/mirandola2/middleware", label: "Middleware" }
cover: "https://raw.githubusercontent.com/mirandola2/frontend/refs/heads/main/doc/architecture.png"
---

In the last month I developed the new website of the scout group of my town, in which I serve as a scout leader.  
The importance of a website is nowadays undenaiable, but this project had several costraints that made it a little challenging to realize. Please note that some of them are more technical, while the first is more pratical.  

- The budget is nearly 0. As a not-profit association, we are not confortable in spending money in something not directly connected to our purposes. 
- We wanted something easy to maintain: Markdown files for the content, automatic deployment.
- We wanted a sort of database, to store our data and other dynamic content. This last point made all the "classic" static site generators not suitable for our use case. Having tons of archive images, it would be impossible to maintain them as static files.

## Architecture

The final architecture is 100% free to host and maintain, and it is composed of 3 main parts:
- **Database**: we used Cloudflare D1, a free SQLite-based database hosted on Cloudflare Workers. It is perfect for our use case, since it offers 10 million requests per month for free, which is more than enough for our low-traffic website.
- **Middleware**: built with Node.js and Express
- **Frontend**: built with Nuxt 3, it is a static website that is generated at build time. It fetches the content from the middleware API and renders it. It is hosted on Netlify becouse our `.it` domain was not supported by other services like Cloudflare Pages.
- **Images**: We used 2 types of image hosting: ImageKit for the most important images (like the homepage banner), and OneDrive for the rest of the images. The second one may raise some eyebrows, but as not-profit association we already had a Microsoft 365 subscription, so we took advantage of it. Using Power Automate, I created a flow that automatically syncs the images uploaded to a specific OneDrive folder to a public folder, making them accessible via direct link. 
Imagekit is used for the most important images because it offers image optimization and a CDN, which is not possible with OneDrive.
