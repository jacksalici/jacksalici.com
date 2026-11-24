---
title: "Jack's Factory"
pubDate: 2026-11-24
description: "A website to send a prototyping project, with a sketch canvas to draw the idea."
news: "A website to send a prototyping project, with a sketch canvas to draw the idea."
hidden: true
stack: ["Next.js", "React", "TypeScript", "perfect-freehand", "Resend", "Vercel"]
playground:
  link: "https://factory.jacksalici.com/"
  tagline: "Got an idea for a prototype? Describe it, or just draw it."
  emoji: "🏭"
kind: development
---

Jack's Factory is the shop window for the prototyping work I take on outside research, from Mirandola (Modena): 3D printing, graphic design, coding, AI, engineering and woodworking. Most of these requests start as a rough idea that is easier to draw than to describe, so the site is a single page with a project form next to a small sketch canvas.

The form asks for name, e-mail, one or more project types and a message; the placeholder of the message box changes with the types picked, so a request for 3D printing asks for size and quantity, and one for 3D printing and computer engineering asks what goes inside the case. The canvas is a lightweight custom editor, written to replace Excalidraw: it has a freehand pen (strokes smoothed with [perfect-freehand](https://github.com/steveruizok/perfect-freehand)), arrows, rectangles, ellipses and triangles, and supports pan and zoom with trackpad, wheel, Space+drag or pinch. Shapes are stored in canvas coordinates, independently of the current view.

On submission, the browser sends the shapes rather than an image. The server validates them and writes an A4 vector PDF directly, without a PDF library, then sends two e-mails through Resend: one to me, with the sender as Reply-To, and a copy to the sender, both with the sketch attached as `sketch.pdf`. Bots are filtered with Vercel BotID and a honeypot field before anything is sent. After a successful send, the page shows a "sent" screen for 24 hours, based on a timestamp in `localStorage`, so that reloads or double clicks do not send the same project twice; this is a convenience, not an abuse limit.

The site is built with Next.js (App Router), React and TypeScript, and deployed on Vercel. Fonts (Fraunces, Funnel Display) and icons (Phosphor, inline SVG) are bundled and served from the site itself, so pages make no requests to third parties.
