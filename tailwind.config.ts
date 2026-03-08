// Tailwind CSS v4 — most config lives in CSS (src/index.css).
// This file is kept for reference / future extensions.
// See: https://tailwindcss.com/docs/configuration

export default {
  // content scanning is automatic with @tailwindcss/vite
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
