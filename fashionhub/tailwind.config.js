/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#faf6f0',
        sand: '#efe6d8',
        ink: '#16120f',
        clay: { DEFAULT: '#b5654a', dark: '#9a5039', light: '#e9c9bb' },
        gold: '#c8a165',
        plum: '#3a1f33',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -14px rgba(22,18,15,0.22)',
        lift: '0 30px 60px -20px rgba(22,18,15,0.35)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};
