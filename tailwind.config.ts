import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFB6D9",
        secondary: "#FFE5F0",
        accent: "#FF85B3",
        background: "#FFFAFC",
        cardBg: "#FFFFFF",
        textPrimary: "#000000",
        textSecondary: "#666666",
        success: "#98D8C8",
      },
      fontFamily: {
        retro: ['"Press Start 2P"', 'cursive'],
        pixel: ['"Pixelify Sans"', 'monospace'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
