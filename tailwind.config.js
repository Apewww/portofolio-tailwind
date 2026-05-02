/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        dev: {
          navy: '#0F172A',
          blue: '#3B82F6',
          slate: '#64748B',
          dark: '#1E293B',
          border: '#334155',
        },
        nb: {
          yellow: '#E8FF8E',
          pink: '#FF90E8',
          cyan: '#23A094',
          lime: '#00FF00',
          orange: '#FF8A00',
          black: '#000000',
          white: '#FFFFFF',
          cream: '#F4F1EA',
        }
      },
      boxShadow: {
        'nb': '4px 4px 0px 0px rgba(0,0,0,1)',
        'nb-hover': '2px 2px 0px 0px rgba(0,0,0,1)',
        'nb-large': '8px 8px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  darkMode: 'class',
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#FFFF00",
          "secondary": "#FF00FF",
          "accent": "#00FFFF",
          "neutral": "#000000",
          "base-100": "#FFFFFF",
          "base-200": "#F3F4F6",
          "--rounded-box": "0px",
          "--rounded-btn": "0px",
          "--rounded-badge": "0px",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#FFFF00",
          "secondary": "#FF00FF",
          "accent": "#00FFFF",
          "neutral": "#FFFFFF",
          "base-100": "#000000",
          "base-200": "#111111",
          "base-content": "#FFFFFF",
          "--rounded-box": "0px",
          "--rounded-btn": "0px",
          "--rounded-badge": "0px",
        },
      },
    ],
  },
}