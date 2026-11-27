---
title: "Sleigh Faces"
pubDate: 2026-11-27
slug: "sleigh-faces"
description: "Printable Christmas ornaments: a cartoon elf, Santa or snowman with a real face photo."
news: "Put a face on a cartoon elf, Santa or snowman, print it on card and hang it on the tree."
hidden: true
stack: ["React", "TypeScript", "Vite", "MediaPipe", "pdf-lib", "Vercel"]
playground:
  link: "https://sleighfaces.jacksalici.com/"
  tagline: "Put a face on a cartoon elf, Santa or snowman, print it on card and hang it on the tree."
  emoji: "🎄"
kind: development
---

Sleigh Faces makes printable Christmas ornaments: a cartoon body (an elf, Santa, a snowman or a grumpy green creature) with a real face in place of the drawn one. You pick a character, take a webcam snapshot or upload a photo, and the face is cut out and fitted into the head; it can then be dragged, scaled and rotated, and its brightness, contrast and saturation adjusted to match the drawing. The result is exported as a true-size PDF, ready to print on card and cut out.

Everything runs in the browser and photos never leave the device. MediaPipe's face landmarker finds the eyes, forehead and chin to straighten and size the face, and a multiclass selfie segmenter keeps face and hair while dropping background and neck. The ornament outline is the union of body and face, dilated by a white border of a chosen width, with a tab and a hang hole at the top and a grey cut line around it; [pdf-lib](https://pdf-lib.js.org) then packs as many copies as fit on an A4 or Letter page at 300 DPI.

The bodies are drawn with Gemini, each with a solid black oval where the face goes. An offline script removes the white background, finds the oval, turns it into a transparent window and stores its ellipse, so the app knows where to place the face; hats, beards and hoods are kept on a separate layer that overlaps it. New poses or characters can also be imported directly in the app, processed in the browser and stored on that device only.
