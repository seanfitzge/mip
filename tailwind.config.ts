import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        card: "rgb(var(--card))",
        cardForeground: "rgb(var(--card-foreground))",
        muted: "rgb(var(--muted))",
        mutedForeground: "rgb(var(--muted-foreground))",
        primary: "rgb(var(--primary))",
        primaryForeground: "rgb(var(--primary-foreground))",
        border: "rgb(var(--border))",
        success: "rgb(var(--color-success))",
        warning: "rgb(var(--color-warning))",
        critical: "rgb(var(--color-critical))",
        info: "rgb(var(--color-info))"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
        sans: ["var(--font-primary)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"]
      },
      fontSize: {
        xs: ["var(--text-xs)", { lineHeight: "1.5" }],
        sm: ["var(--text-sm)", { lineHeight: "1.5" }],
        base: ["var(--text-base)", { lineHeight: "1.6" }],
        lg: ["var(--text-lg)", { lineHeight: "1.5" }],
        xl: ["var(--text-xl)", { lineHeight: "1.3" }],
        "2xl": ["var(--text-2xl)", { lineHeight: "1.2" }],
        metric: ["var(--text-metric)", { lineHeight: "1" }],
        score: ["var(--text-score)", { lineHeight: "1" }]
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.1)"
      }
    }
  },
  plugins: []
}

export default config
