/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#dfb43e',
        secondary: '#ee6a03',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(223, 180, 62, 0.05)',
        'base': '0 1px 3px 0 rgba(223, 180, 62, 0.1), 0 1px 2px 0 rgba(223, 180, 62, 0.06)',
        'md': '0 4px 6px -1px rgba(223, 180, 62, 0.15), 0 2px 4px -1px rgba(223, 180, 62, 0.08)',
        'lg': '0 10px 15px -3px rgba(223, 180, 62, 0.2), 0 4px 6px -2px rgba(223, 180, 62, 0.1)',
        'xl': '0 20px 25px -5px rgba(223, 180, 62, 0.25), 0 10px 10px -5px rgba(223, 180, 62, 0.12)',
      },
    },
  },
  plugins: [],
};
