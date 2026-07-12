/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Portfolio Color Palette
        black: {
          DEFAULT: '#0B0B0B',
          soft: '#111111',
          card: '#161616',
          border: '#222222',
        },
        crimson: {
          DEFAULT: '#8B0D1A',
          mid: '#A01020',
          glow: '#C01830',
          dim: '#5C0910',
        },
        offwhite: {
          DEFAULT: '#F5F2ED',
          dim: '#C8C4BF',
          muted: '#857F78',
        },
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'syne': ['Syne', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "marquee": {
          "from": { transform: "translateX(0)" },
          "to": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "from": { transform: "rotate(0deg)" },
          "to": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards",
        "fade-in": "fade-in 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards",
        "float": "float 7s ease-in-out infinite",
        "marquee": "marquee 28s linear infinite",
        "spin-slow": "spin-slow 18s linear infinite",
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.8, 0.25, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
