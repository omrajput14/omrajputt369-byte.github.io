import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#edf1e8',
        bg2: '#d7dbd2',
        fg: '#141414',
        accent: '#ed6a5a',
        accent2: '#f4f1bb',
        accent3: '#9bc1bc',
        accent4: '#5d576b',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Impact', 'sans-serif'],
        sans: ['Barlow', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
