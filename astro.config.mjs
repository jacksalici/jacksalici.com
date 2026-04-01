import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";


// https://astro.build/config
export default defineConfig({
  site: "https://jacksalici.com",
  integrations: [mdx(), sitemap(), react()],

  redirects: {
    "/papers": "/?type=papers",
    "/notes": "/?type=notes",
    "/projects": "/?type=projects",
    "/projects/website": "/notes/website",
    "/thesis": "/projects/sfm-gaze-framework"
  },

  vite: {
    plugins: [tailwindcss()],
  },
});