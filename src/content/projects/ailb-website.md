---
title: "AImageLab website"
pubDate: 2026-03-13
description: Our new fullstack website for the AImageLab project.
news: The AImageLab new website is live!
categories: ["web"]
stack: ["Django", "Tailwind CSS"]
cta:
  - { url: "https://aimagelab.unimore.it/", label: "Website" }
  - { url: "https://github.com/AImageLab-zip/aimagelab-website", label: "Code" }
---

During the last months, some fellows of the AImageLab project and I developed the new website for our research group.

The website is built with Django, powered by SQLite for the database, Gunicorn as the WSGI HTTP server, and styled with Tailwind CSS. It is containerized with Docker and hosted on our own server. 

Moreover, it uses Celery for background tasks, which are executed by a worker container. This allows us to perform tasks like sending emails or processing data asynchronously, improving the performance and responsiveness of the website.

The website automatically fetches the latest publications from IRIS platform and displays them in a dedicated section. It also automatically displays the members, and it has a blog section where we can post news and updates about our research activities.