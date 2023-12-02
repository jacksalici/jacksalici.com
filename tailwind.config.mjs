/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			'blue': '#17b3bb',
			'purple': '#6f73d2',
			'pink': '#ff57bb',
			'yellow': '#ffc82c',
			'primary': '#d4d2d5',
			'background': '#2b303a'
		  },
		  extend: {
			spacing: {
			  '128': '32rem',
			  '144': '36rem',
			},
			borderRadius: {
			  '4xl': '2rem',
			}
		  }
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
