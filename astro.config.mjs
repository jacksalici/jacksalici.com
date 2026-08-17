import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";


import tailwindcss from "@tailwindcss/vite";


// https://astro.build/config
export default defineConfig({
  site: "https://jacksalici.com",
  integrations: [mdx(), sitemap()],

  redirects: {
    // The collections no longer have their own index page: they live as
    // sections of the homepage.
    "/papers": "/#papers",
    "/projects": "/#projects",
    "/notes": "/#writing",
    "/projects/website": "/notes/website",
    "/thesis": "/projects/sfm-gaze-framework"
  },

  vite: {
    plugins: [tailwindcss()],
  },
});