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
        accent: '#f59e0b',   // soft gold
        sectionblue: '#313d6e',
        buttonbg: '#f4391f',
      },
    },
  },
  plugins: [],
}


