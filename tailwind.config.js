

module.exports = {
  content: ['./layouts/**/*.html', './content/**/*.md'],
  theme: {
    extend: {
  		
    },
    colors:{
      primary: '#686bed'
    },
    fontFamily:{
      'sans': ['Ubuntu', 'sans-serif'],
      'serif': ['Newsreader', 'serif'],
      'mono': ['Ubuntu Mono', 'monospace'],
    },
   
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