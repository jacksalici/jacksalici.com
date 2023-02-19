# Just my personal website. 🥸💅

Howdy! If you are reading this, you probably already know that the website simultaneously represents 📺:

- a portfolio for my personal and academic projects 🖼️,
- a kind of online resume 🪪,
- and a placeholder space for my nickname domain ⚓️.

_This code may not be the prettiest you have ever seen 👀, nor the most grammatically correct text. Please consider it a work in progress and not ready for production. Consider also that the main target of this `readme` is the future myself, so I don't pretend to be serious. 🎭_


## Architecture 🏗️

Currently, the website is powered by [Hugo](https://gohugo.io/documentation/) framework. The theme is a custom version of my own [Salinger](https://themes.gohugo.io/themes/salinger-theme/).

**Posts are stored in `/content` folder.**

To start the local server just execute the script:
```sh
./server.sh
```

Once the edits have been made, *just push the commits*: GitHub Action will build the website, update the `gh-pages` branch and host it using GitHub Pages. More on the workflow file: `.github/workflows/gh-pages.yml`.

The domain name is stored in the `static/CNAME` file, otherwise, GitHub Pages would reset it at every push.

## Changelog 🕰️

I like to change its style often so I tagged the main last versions, starting from 2021. Sadly, previous versions have been lost (I was not an expert in git yet and I made some embarrassing mistakes).  

|Version|Description|
|-|-|
v1.3.0| Dark blue dotted homepage with a [nice hover effect](https://github.com/jacksalici/jacksalici.github.io/blob/v1.3.0/themes/jacksaliciwebsite/assets/js/main.js).|
v1.2.0| Cream to Light Blue background gradient, landing homepage. [(Screenshot)](static/uploads/v1.2.0.png)
|v1.1.0| __Hugo Framework__, with [Salinger](https://themes.gohugo.io/themes/salinger-theme/) Theme.

