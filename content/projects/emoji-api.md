---
title: "Emoji list API.  😄"
date: 2022-08-02T22:00:00Z
publishDate: 2022-08-02T22:00:00Z
slug: "emoji-list-api"
description: "A simple API for querying emoji. 😁"
categories: ["development"]
tags: ["Model"]
---


I developed a simple RESTful API for querying emoji, since I needed one for developing [EmojiPoll](https://jacksalici.com/projects/emojipoll). I used Python and FastAPI, and now is hosted on [Deta](http://emoji.deta.dev).

```python

import requests
import json

data=requests.get('https://emoji.deta.dev/random?n=10&skintones=False&nogroup=Symbols,Flags')
print(json.loads(data.text))
 
# ["☔","🤵‍♀️","🤍","🗿","🎥","👴","🏃","🥄","🧃","✌️"]
```

There are several parameters, you can see theme on the [GitHub repository](https://github.com/jacksalici/emoji-list-api). One of theme is the random option.

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