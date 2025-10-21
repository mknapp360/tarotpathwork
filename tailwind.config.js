/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0f172a', // deep slate-900
          light: '#334155',
        },
        black: '#000000',
        accent: '#f59e0b',   // soft gold
        tpblue: '#1f2747',
        tpwhite: '#f2f2f2',
        tpblack: '#252d2f',
        tpgold: '#bb9258',
        tpred: '#752f3a',
        buttonbg: '#f4391f',
      },
    },
  },
  plugins: [],
}


