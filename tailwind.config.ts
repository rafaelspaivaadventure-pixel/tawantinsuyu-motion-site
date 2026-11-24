import type { Config } from "tailwindcss";

/**
 * Tailwind v3 fica fixo de propósito: este arquivo é a fonte dos tokens de
 * design. As cores leem variáveis CSS (veja src/styles/globals.css), então
 * modificadores de opacidade como `bg-canvas/60` continuam funcionando.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", md: "3rem", xl: "6rem" },
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        canvas: "rgb(var(--bg-primary) / <alpha-value>)",
        panel: "rgb(var(--bg-secondary) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--text-primary) / <alpha-value>)",
        muted: "rgb(var(--text-muted) / <alpha-value>)",
        accent: "rgb(var(--accent-primary) / <alpha-value>)",
        ember: "rgb(var(--accent-secondary) / <alpha-value>)",
        line: "rgb(var(--border-subtle) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "fluid-hero": [
          "clamp(3.5rem, 10vw, 10rem)",
          { lineHeight: "0.88", letterSpacing: "-0.035em" },
        ],
        "fluid-h2": [
          "clamp(2.75rem, 6vw, 6.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.03em" },
        ],
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.35" },
          "50%": { transform: "translateY(5px)", opacity: "1" },
        },
        drift: {
          "0%, 100%": { transform: "translateX(-40px)" },
          "50%": { transform: "translateX(40px)" },
        },
        "drift-rev": {
          "0%, 100%": { transform: "translateX(40px)" },
          "50%": { transform: "translateX(-40px)" },
        },
        "float-up": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "15%": { opacity: "0.8" },
          "100%": { transform: "translateY(-105vh)", opacity: "0" },
        },
        glow: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "scroll-hint": "scroll-hint 2.4s ease-in-out infinite",
        drift: "drift 26s ease-in-out infinite",
        "drift-rev": "drift-rev 30s ease-in-out infinite",
        "float-up": "float-up 24s linear infinite",
        glow: "glow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
