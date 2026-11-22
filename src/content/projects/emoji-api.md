---
title: "Emoji list API and npm"
pubDate: 2022-08-02
description: "A simple API and npm package for querying emoji."
news: I built a RESTful API and npm package for fetching and randomizing emoji lists.
categories: ["web"]
kind: development
activities: ["coding-web-apps"]
stack: ["Python", "Node.js"]
cover: /uploads/emojiscreenshot.png
cta:
  - { url: "https://github.com/jacksalici/emoji-helper", label: "Take a look at the repository" }
hidden: true
---

Drawing a random letter is a matter of picking an index in a short contiguous alphabet, but emoji do not work that way: they are scattered over several Unicode blocks, and many of them are sequences of code points (skin-tone modifiers, joined sequences, flags) rather than single characters. Picking one at random, or all those of a given category, requires an explicit list. I needed exactly this while developing [EmojiPoll](https://jacksalici.com/projects/emojipoll), so I built a small RESTful API and a Node package for querying emoji.

![A JSON array of random emoji, as returned by the API](../../assets/uploads/emojiscreenshot.png)

Both tools read the same data: a script parses the `emoji-test.txt` file published by Unicode (version 15.0) into a [JSON list](https://raw.githubusercontent.com/jacksalici/emoji-helper/main/helper/emoji.json) of 4,733 records, 3,655 of which are fully-qualified emoji, each with its description, group, subgroup, code points, status and version, as in the example below. On top of it, the two tools expose the same queries: a list or a random sample of `n` emoji, filtered by included or excluded groups and subgroups, search terms, maximum emoji version and skin tones, returned either as bare glyphs or, in verbose mode, as full records. All the parameters are documented in the [GitHub repository](https://github.com/jacksalici/emoji-helper).

```json
{
    "emoji": "🌵",
    "description": "cactus",
    "group": "Animals & Nature",
    "subgroup": "plant-other",
    "code": "1F335",
    "status": "fully-qualified",
    "version": "E0.6"
}
```

The API is written in Python with FastAPI and was hosted on Deta; that deployment no longer answers, but the code can still be run locally from the repository. The Node package is published on npm as `emoji-random-list` and works offline:

```bash
npm i emoji-random-list
```

```javascript
var emoji = require("emoji-random-list")
console.log(emoji.random({n: 5, group: 'objects'}))
//[ '🪒', '📕', '🔋', '🔩', '💷' ]
```
