/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			'blue': '#1fb6ff',
			'purple': '#7e5bef',
			'pink': '#ff49db',
			'orange': '#ff7849',
			'green': '#13ce66',
			'yellow': '#ffc82c',
			'gray-dark': '#273444',
			'gray': '#8492a6',
			'gray-light': '#d3dce6',
			'primary': '#d3dce6',
			'foreground': '#202020'
		  },
		  fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
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
