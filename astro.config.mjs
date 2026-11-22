import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";


import tailwindcss from "@tailwindcss/vite";


// https://astro.build/config
export default defineConfig({
  site: "https://jacksalici.com",
  integrations: [mdx(), sitemap()],

  // LaTeX in Markdown: `$…$` inline, `$$…$$` on its own lines for display.
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },

  redirects: {
    // Old URLs of pages that moved.
    "/papers": "/research",
    // The papers collection was renamed to research.
    "/papers/[...slug]": "/research/[...slug]",
    "/playground": "/apps",
    "/projects/website": "/notes/website",
    "/thesis": "/projects/sfm-gaze-framework"
  },

  vite: {
    plugins: [tailwindcss()],
  },
});