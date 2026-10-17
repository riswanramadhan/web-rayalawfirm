import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4b8fbb',
        // Varian gelap untuk teks kecil & latar tombol (kontras ≥ 4.5:1 dengan putih).
        'primary-700': '#2f6f99',
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
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 24px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translate3d(40px, 0, 0) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0) scale(1)' },
        },
        nudge: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '15%': { transform: 'scale(1.12) rotate(-5deg)' },
          '30%': { transform: 'scale(1.12) rotate(5deg)' },
          '45%': { transform: 'scale(1.12) rotate(-4deg)' },
          '60%': { transform: 'scale(1.12) rotate(3deg)' },
          '75%': { transform: 'scale(1.08) rotate(-1deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.8s ease-out both',
        'slide-in-right': 'slide-in-right 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        nudge: 'nudge 1.2s ease-in-out 0.6s 1 both',
      },
    },
  },
  plugins: [],
};

export default config;
