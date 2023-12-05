import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://jacksalici.com',
  integrations: [mdx(), sitemap(), tailwind()],
  redirects: {'/p/': '/#p', '/b/': '/#b', '/projects/website':'/blog/website', '/projects/[...slug]': '/p/[...slug]'}
});