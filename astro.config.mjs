import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://jacksalici.com",
  integrations: [mdx(), sitemap(), tailwind()],
  redirects: {
    "/b/": "/notes",
    "/notes": "/#notes",
    "/projects/website": "/blog/website",
    "/p/[...slug]": "/projects/[...slug]",
    "/thesis": "/projects/sfm-gaze-framework"
  },
});
