

module.exports = {
    content: ['./hugo_stats.json'],
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
    themes: {
      light: {
        ...require("daisyui/src/theming/themes")["[data-theme=corporate]"],
      },
      dark: {
        ...require("daisyui/src/theming/themes")["[data-theme=business]"],
      },
    }
      
    
  }
}