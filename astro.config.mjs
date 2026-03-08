import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";


import tailwindcss from "@tailwindcss/vite";


// https://astro.build/config
export default defineConfig({
  site: "https://jacksalici.com",
  integrations: [mdx(), sitemap()],

  redirects: {
    "/papers/": "/?t=papers#feed",
    "/notes/": "/?t=notes#feed",
    "/projects/": "/?t=projects#feed",
    "/b/": "/notes",
    "/projects/website": "/blog/website",
    "/p/[...slug]": "/projects/[...slug]",
    "/thesis": "/projects/sfm-gaze-framework"
  },

  vite: {
    plugins: [tailwindcss()],
  },
});