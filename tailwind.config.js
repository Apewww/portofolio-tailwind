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
        }
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      "light",
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#3B82F6",   // Electric Blue
          "secondary": "#64748B", // Slate
          "accent": "#F43F5E",    // Bold Pink/Red for highlights
          "neutral": "#1E293B",
          "base-100": "#0F172A",
          "base-200": "#1E293B",
          "base-300": "#334155",
          "base-content": "#F8FAFC",
          "--rounded-box": "0.375rem", // Standard md rounding, firm
          "--rounded-btn": "0.375rem",
          "--rounded-badge": "0.25rem",
        },
      },
    ],
  },
}