/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			'blue': '#087E8B',
			'purple': '#3D2B8C',
			'pink': '#ea5c1f',
			'yellow': '#F9C74F',
			'primary-content': '#232528',
			'secondary-content': '#393C41',
			'primary': '#bfc0c0',
			'secondary': '#E5E5E5',
			'background': '#f5f5f5',
			
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
			display: ['Space\\ Mono', 'ui-sans-serif'],
			body: ['Space\\ Grotesk', 'ui-sans-serif'],
			mono: ['Space\\ Mono', 'ui-monospace']
		  },
	
		
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
