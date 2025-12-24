// Theme color configuration
// Light Mode: Sunlit Mist | Dark Mode: Deep Moss

export const THEME = {
  light: {
    background: "#F8FAF5",      // Warm Off-White (morning mist)
    foreground: "#1A2F1A",      // Forest Charcoal
    primary: "#22C55E",         // Leaf Green
    muted: "#94A3B8",           // Light Slate
    glassBorder: "rgba(0,0,0,0.08)",
    particle: {
      colors: ["181, 164, 139", "210, 190, 160"], // Golden Tan, Soft Wheat
      opacity: 0.25,            // Lower opacity (0.2-0.3)
      compositeOp: "source-over" as GlobalCompositeOperation,
    },
  },
  dark: {
    background: "#020D06",      // Deep Black-Green
    foreground: "#ECFDF5",      // Mint White
    primary: "#10B981",         // Emerald Green
    muted: "#64748B",           // Slate Grey
    glassBorder: "rgba(255,255,255,0.1)",
    particle: {
      colors: ["3, 25, 226", "0, 8, 74"], // #0c03ff (Electric Blue), #00084a (Deep Navy)
      opacity: 0.8,             // Higher opacity for glow
      compositeOp: "screen" as GlobalCompositeOperation,
    },
  },
} as const;

export type ThemeMode = "light" | "dark";
