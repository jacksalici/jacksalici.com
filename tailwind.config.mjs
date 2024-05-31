/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			'blue': '#17b3bb',
			'purple': '#3D2B8C',
			'pink': '#ff57dd',
			'yellow': '#ffc82c',
			'primary-content': '#232360',
			'secondary-content': '#676793',
			'primary': '#EDEDF7',
			'background': '#fafaff',
			'black': '#000500'
			
		  },
		  extend: {
			spacing: {
			  '128': '32rem',
			  '144': '36rem',
			},
			borderRadius: {
			  '4xl': '2rem',
			},
			typography: ({ theme }) => ({
				pink: {
				  css: {
					'--tw-prose-body': theme('colors.pink[800]'),
					'--tw-prose-headings': theme('colors.pink[900]'),
					'--tw-prose-lead': theme('colors.pink[700]'),
					'--tw-prose-links': theme('colors.pink[900]'),
					'--tw-prose-bold': theme('colors.pink[900]'),
					'--tw-prose-counters': theme('colors.pink[600]'),
					'--tw-prose-bullets': theme('colors.pink[400]'),
					'--tw-prose-hr': theme('colors.pink[300]'),
					'--tw-prose-quotes': theme('colors.pink[900]'),
					'--tw-prose-quote-borders': theme('colors.pink[300]'),
					'--tw-prose-captions': theme('colors.pink[700]'),
					'--tw-prose-code': theme('colors.pink[900]'),
					'--tw-prose-pre-code': theme('colors.pink[100]'),
					'--tw-prose-pre-bg': theme('colors.pink[900]'),
					'--tw-prose-th-borders': theme('colors.pink[300]'),
					'--tw-prose-td-borders': theme('colors.pink[200]'),
					'--tw-prose-invert-body': theme('colors.pink[200]'),
					'--tw-prose-invert-headings': theme('colors.white'),
					'--tw-prose-invert-lead': theme('colors.pink[300]'),
					'--tw-prose-invert-links': theme('colors.white'),
					'--tw-prose-invert-bold': theme('colors.white'),
					'--tw-prose-invert-counters': theme('colors.pink[400]'),
					'--tw-prose-invert-bullets': theme('colors.pink[600]'),
					'--tw-prose-invert-hr': theme('colors.pink[700]'),
					'--tw-prose-invert-quotes': theme('colors.pink[100]'),
					'--tw-prose-invert-quote-borders': theme('colors.pink[700]'),
					'--tw-prose-invert-captions': theme('colors.pink[400]'),
					'--tw-prose-invert-code': theme('colors.white'),
					'--tw-prose-invert-pre-code': theme('colors.pink[300]'),
					'--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
					'--tw-prose-invert-th-borders': theme('colors.pink[600]'),
					'--tw-prose-invert-td-borders': theme('colors.pink[700]'),
				  },
				},
			  }),
		  },
		  fontFamily: {
			display: ['Space\\ Grotesk', 'ui-serif'],
			body: ['DM\\ Sans', 'ui-sans-serif'],
			mono: ['Space\\ Mono', 'ui-monospace']
		  }
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
