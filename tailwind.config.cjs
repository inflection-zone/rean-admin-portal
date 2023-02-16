/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],

  theme: {
    extend: {
      colors: {
          primary: '#5832A1',
          secondary: '#7165E3',
          tertiary: '#ECE4FC',
          accent: '#34d399',
          neutral: '#4b5563',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
          "base-100": "#ffffff",
          // '--lineragradient':'linear-gradient(to bottom, white 0%, white 35%, #7a33a1 35%, #7a33a1 100%)',
    },
  },
  backgroundImage: {
		'back-ground': 
		"linear-gradient(to bottom, white 0%, white 35%, #7165E3 35%, #7165E3 100%)",
		},
  },

  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'class',
};

module.exports = config;