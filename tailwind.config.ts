import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background:       '#FFFBF5',
        surface:          '#FFF8EE',
        border:           '#E8D5B7',
        accent:           '#C4522A',
        'accent-dark':    '#8B3A1E',
        'accent-light':   '#E8855E',
        success:          '#4A7C59',
        'text-primary':   '#2C1810',
        'text-secondary': '#6B4C3B',
        'text-muted':     '#A07060',
        'hover-row':      '#FFF0E0',
      },
      fontFamily: {
        sans:   ['Lora', 'Georgia', 'serif'],
        body:   ['Inter', 'system-ui', 'sans-serif'],
        mono:   ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'fade-in':    'fade-in 0.4s ease-out',
        'slide-up':   'slide-up 0.5s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
