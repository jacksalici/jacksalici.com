const disabledCss = {
	'code::before': false,
	'code::after': false,
	'blockquote p:first-of-type::before': false,
	'blockquote p:last-of-type::after': false,
	pre: false,
	code: false,
	'pre code': false,
	'code::before': false,
	'code::after': false,
}

module.exports = {
  content: ['./layouts/**/*.html', './content/**/*.md'],
  theme: {
    extend: {
  		
    },
    colors:{
      primary: '#686bed'
    },
    fontFamily:{
      'sans': ['Open Sans', 'sans-serif'],
      'serif': ['Newsreader', 'serif'],
      'mono': ['Ubuntu Mono', 'monospace'],
    }
   
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui:{
    logs: false,
    themes: ['business'],
    
  }
}