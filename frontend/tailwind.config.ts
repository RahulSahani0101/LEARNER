import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        heading: ["Sora", "Plus Jakarta Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      colors: {
        brand: {
          purple: "#E9BE44",
          blue: "#FFD66F",
          cyan: "#52D1FF",
          bg0: "#141922",
          bg1: "#1A202B",
          bg2: "#202734",
          panel: "#262E3E",
          text: "#F5F7FA",
          muted: "#9EA9B8",
          border: "#313A4A",
        },
      },
      boxShadow: {
        neonPurple: "0 18px 44px rgba(233,190,68,0.24)",
        neonBlue: "0 18px 44px rgba(82,209,255,0.2)",
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
          "0%, 100%": { boxShadow: "0 0 0 rgba(233,190,68,0.1)" },
          "50%": { boxShadow: "0 0 30px rgba(233,190,68,0.25)" },
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
          "radial-gradient(circle at 14% 18%, rgba(233,190,68,0.28), transparent 37%), radial-gradient(circle at 90% 10%, rgba(255,214,111,0.26), transparent 28%), radial-gradient(circle at 72% 76%, rgba(82,209,255,0.16), transparent 38%)",
      },
    },
  },
  plugins: [],
};

export default config;
