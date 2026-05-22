import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Space Grotesk", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        brand: {
          purple: "#7C3AED",
          blue: "#2563EB",
          cyan: "#06B6D4",
          bg0: "#050816",
          bg1: "#0B1120",
          bg2: "#0D0D1F",
          text: "#F8FAFC",
          muted: "#94A3B8",
        },
      },
      boxShadow: {
        neonPurple: "0 0 20px rgba(168,85,247,0.4)",
        neonBlue: "0 0 20px rgba(59,130,246,0.4)",
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
          "0%, 100%": { boxShadow: "0 0 0 rgba(124,58,237,0.15)" },
          "50%": { boxShadow: "0 0 24px rgba(124,58,237,0.35)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.45s ease both",
        pulseGlow: "pulseGlow 2.2s ease-in-out infinite",
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(circle at 20% 20%, rgba(124,58,237,0.25), transparent 45%), radial-gradient(circle at 80% 0%, rgba(37,99,235,0.2), transparent 40%), radial-gradient(circle at 70% 65%, rgba(6,182,212,0.15), transparent 45%)",
      },
    },
  },
  plugins: [],
};

export default config;
