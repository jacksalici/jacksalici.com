---
title: "Ecowitt Weather Station Client"
pubDate: 2023-08-01
slug: weather-station
description: "A custom client for displaying my weather station data."
categories: ["Web Development"]
tags: ["Ecowitt", "Vue"]
stack: ["Vue", "Cloudflare Workers"]
cta:
  - { url: "https://weather.jacksalici.com", label: "Check the dashboard" }
cover: "https://raw.githubusercontent.com/jacksalici/weather_station/main/screenshot.png"
---

A custom front-end and middleware for displaying data from my Ecowitt weather station.
The front-end is built using Vue and relies on Tailwind, DaisyUI and GraphJS for the UI. The middleware is a Cloudflare Worker and is needed to hide to the users the token key.

