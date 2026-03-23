import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:       'var(--bg)',
        surface:  'var(--surface)',
        surface2: 'var(--surface-2)',
        border:   'var(--border)',
        accent:   'var(--accent)',
        highlight:'var(--highlight)',
        text:     'var(--text)',
        muted:    'var(--text-muted)',
        dim:      'var(--text-dim)',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
        mono:    ['var(--font-jetbrains-mono)', 'monospace'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        fadeUp:  'fadeUp 0.7s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
