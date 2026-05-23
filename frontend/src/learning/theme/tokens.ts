export const learningTheme = {
  colors: {
    primary: "#FF8C42",
    primaryLight: "#FFB380",
    primaryDark: "#E0621A",
    accent: "#FFC107",
    teal: "#3ABCAD",
    tealDark: "#2A9D8F",
    surface: "#FFFFFF",
    background: "#FAFAFA",
    textPrimary: "#1A1A2E",
    textSecondary: "#6B7280",
    textMuted: "#9CA3AF",
    badge: "#FF6B35",
    onboardingBg: "#FF9A5C",
    onboardingEnd: "#FFB07A",
    tabActive: "#FF8C42",
    tabInactive: "#B0B7C3",
  },
  radius: {
    sm: 6,
    md: 12,
    lg: 20,
    xl: 28,
    pill: 999,
  },
  shadow: {
    card: "0 4px 20px rgba(0,0,0,0.08)",
    button: "0 8px 24px rgba(255,140,66,0.35)",
    tab: "0 -2px 12px rgba(0,0,0,0.06)",
  },
} as const;

export type LearningTheme = typeof learningTheme;
