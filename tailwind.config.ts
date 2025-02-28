import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#6352A2",
        'secondary': "#735BCE",
        "yellow-customer": "#FDC040",
      },
      fontFamily: {
        kantumruy: ['var(--font-kantumruy)'],
        poppins: ['var(--font-poppins)'],
        notosanssc: ['var(--font-notosanssc)'],
      },
      keyframes: {
        slowSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        upDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5%)' },
        },
        leftRight: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-5%)' },
        },
        spinLeftRight: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-360deg)' },
          '50%': { transform: 'rotate(-360deg)' },
          '75%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        leftToRight45: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(10%, -10%)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        scaleUpDown: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
      animation: {
        slowSpin: 'slowSpin 10s linear infinite', // 10s for a slow rotation
        upDown: 'upDown 2s ease-in-out infinite',
        upDownTwo: 'upDown 3s ease-in-out infinite',
        leftRight: 'leftRight 2s ease-in-out infinite',
        spinLeftRight: 'spinLeftRight 12s ease-in-out infinite 6s',
        leftToRight45: 'leftToRight45 8s linear infinite',
        scaleUpDown: 'scaleUpDown 2s ease-in-out infinite', // 2s for scaling up and down
      },
    },
  },
  plugins: [],
} satisfies Config;
