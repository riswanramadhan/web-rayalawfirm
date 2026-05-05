import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4b8fbb',
        accent: '#bfdee8',
        navy: '#1a2e40',
        gold: '#c9a84c',
        dark: '#0d1b2a',
        offwhite: '#f8fbfd',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        body: ['var(--font-barlow)', 'system-ui', 'sans-serif'],
      },
      screens: {
        xs: '475px',
      },
    },
  },
  plugins: [],
};

export default config;
