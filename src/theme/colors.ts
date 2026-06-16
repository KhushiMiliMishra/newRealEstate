export const Colors = {
  light: {
    primary: "#1D4ED8",
    secondary: "#3B82F6",
    accent: "#10B981",
    background: "#FFFFFF",
    surface: "#F8FAFC",
    cardBg: "#FFFFFF",
    text: "#0F172A",
    mutedText: "#64748B",
    border: "#E2E8F0",
    success: "#22C55E",
    warning: "#F59E0B",
    error: "#EF4444",
  },

  dark: {
    primary: "#60A5FA",
    secondary: "#93C5FD",
    accent: "#34D399",
    background: "#0B1220",
    surface: "#111827",
    cardBg: "#1F2937",
    text: "#F9FAFB",
    mutedText: "#CBD5E1",
    border: "#334155",
    success: "#22C55E",
    warning: "#F59E0B",
    error: "#EF4444",
  },
};

// ✅ KEY FIX 👇 DO NOT USE literal inference
export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  cardBg: string;
  text: string;
  mutedText: string;
  border: string;
  success: string;
  warning: string;
  error: string;
};