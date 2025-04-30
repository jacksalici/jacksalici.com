/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			'blue': '#07a3cc',
			'purple': '#3D2B8C',
			'pink': '#c02D22',
			'yellow': '#ba8e23',
			'primary-content': '#1F1F1F',
			'secondary-content': '#333333',
			'primary': '#C2C2C2',
			'background': '#CCCCCC',
			'black': '#1F1F1F'
			
		  },
		extend: { 
			spacing: {
			  '128': '32rem',
			  '144': '36rem',
			},
			borderRadius: {
			  '4xl': '2rem',
			},	  	 
			typography: {
				DEFAULT: {
					css: {
					  'blockquote p:first-of-type::before': false,
					  'blockquote p:first-of-type::after': false,
					},
				}
			} 
		},
		fontFamily: {
			display: ['Space\\ Grotesk', 'ui-serif'],
			body: ['IBM\\ Plex\\ Serif', 'ui-sans-serif'],
			mono: ['Space\\ Mono', 'ui-monospace']
		  },
	
		
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
