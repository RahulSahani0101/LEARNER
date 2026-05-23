import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        heading: ["Outfit", "Manrope", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      colors: {
        brand: {
          purple: "#8B5CF6",
          blue: "#3B82F6",
          cyan: "#06B6D4",
          bg0: "#090B12",
          bg1: "#0F1320",
          bg2: "#141A2A",
          panel: "#1A2133",
          text: "#EEF2FF",
          muted: "#90A0BE",
          border: "#283349",
        },
      },
      boxShadow: {
        neonPurple: "0 20px 44px rgba(139,92,246,0.24)",
        neonBlue: "0 20px 44px rgba(59,130,246,0.2)",
        softPanel: "0 14px 28px rgba(8,10,18,0.28)",
      },
      backdropBlur: {
        glass: "20px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(139,92,246,0.1)" },
          "50%": { boxShadow: "0 0 30px rgba(59,130,246,0.24)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.42s cubic-bezier(0.22, 1, 0.36, 1) both",
        pulseGlow: "pulseGlow 2.2s ease-in-out infinite",
        floatY: "floatY 4s ease-in-out infinite",
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(circle at 12% 15%, rgba(59,130,246,0.26), transparent 38%), radial-gradient(circle at 86% 10%, rgba(139,92,246,0.24), transparent 30%), radial-gradient(circle at 70% 74%, rgba(6,182,212,0.16), transparent 42%)",
      },
    },
  },
  plugins: [],
};

export default config;
