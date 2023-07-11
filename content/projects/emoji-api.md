---
title: "Emoji list API and npm"
date: 2022-08-02T22:00:00Z
publishDate: 2022-08-02T22:00:00Z
slug: "emoji-list-api"
description: "A simple API and a npm for querying emoji."
categories: ["Web Development"]
tags: ["Model"]
langs: ["Python", "npm"]
featured: true

---

I developed a simple RESTful API and a Node package for querying emoji, since I needed one for developing [EmojiPoll](https://jacksalici.com/projects/emojipoll). For the first I used Python and FastAPI, and now is hosted on [Deta](http://emoji.deta.dev).

```python

import requests
import json

data=requests.get('https://emoji.deta.dev/random?n=10&skintones=False&nogroup=Symbols,Flags')
print(json.loads(data.text))
 
# ["☔","🤵‍♀️","🤍","🗿","🎥","👴","🏃","🥄","🧃","✌️"]
```

For both the tool there are several parameters, you can see them on the [GitHub repository](https://github.com/jacksalici/emoji-helper). One of them is the random option.

The data is parsed from the unicode website into a JSON list of dictionaries from which the emoji are retrieved ([JSON file](https://raw.githubusercontent.com/jacksalici/emoji-list-api/main/src/emoji.json)). Each dictionary presents several information reguarding an emoji, and can be retrieved using the verbose parameter. An example is reported.

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

For what concerns the **npm package**, here is an example.
   
```bash
npm i emoji-random-list
```

```javascript
var emoji = require("emoji-random-list")
console.log(emoji.random({n: 5, group: 'objects'}))
//[ '🪒', '📕', '🔋', '🔩', '💷' ]
```