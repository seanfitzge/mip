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
        
        // Experimental colors
        neonCyan: "rgb(var(--color-neon-cyan))",
        electricBlue: "rgb(var(--color-electric-blue))",
        deepPurple: "rgb(var(--color-deep-purple))",
        hotMagenta: "rgb(var(--color-hot-magenta))",
        laserGreen: "rgb(var(--color-laser-green))",
        plasmaPink: "rgb(var(--color-plasma-pink))",
        arcticWhite: "rgb(var(--color-arctic-white))",
        voidBlack: "rgb(var(--color-void-black))",
        obsidian: "rgb(var(--color-obsidian))",
        charcoal: "rgb(var(--color-charcoal))",
        ghost: "rgb(var(--color-ghost))",
        
        // Legacy support
        success: "rgb(var(--color-laser-green))",
        warning: "rgb(var(--color-hot-magenta))",
        critical: "rgb(var(--color-hot-magenta))",
        info: "rgb(var(--color-neon-cyan))"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "2rem"
      },
      fontFamily: {
        sans: ["var(--font-primary)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "SF Mono", "ui-monospace", "Menlo", "monospace"],
        display: ["var(--font-primary)", "system-ui", "-apple-system", "sans-serif"]
      },
      fontSize: {
        xs: ["var(--text-xs)", { lineHeight: "1.5", letterSpacing: "0.02em" }],
        sm: ["var(--text-sm)", { lineHeight: "1.5", letterSpacing: "0.01em" }],
        base: ["var(--text-base)", { lineHeight: "1.7", letterSpacing: "0" }],
        lg: ["var(--text-lg)", { lineHeight: "1.6", letterSpacing: "-0.01em" }],
        xl: ["var(--text-xl)", { lineHeight: "1.4", letterSpacing: "-0.02em" }],
        "2xl": ["var(--text-2xl)", { lineHeight: "1.3", letterSpacing: "-0.03em" }],
        "3xl": ["var(--text-3xl)", { lineHeight: "1.2", letterSpacing: "-0.04em" }],
        "4xl": ["var(--text-4xl)", { lineHeight: "1.1", letterSpacing: "-0.05em" }],
        metric: ["var(--text-metric)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        score: ["var(--text-score)", { lineHeight: "0.95", letterSpacing: "-0.05em" }]
      },
      boxShadow: {
        card: "var(--shadow-float)",
        glow: "var(--glow-primary)",
        "glow-accent": "var(--glow-accent)",
        "glow-success": "var(--glow-success)",
        brutal: "var(--shadow-brutal)",
        float: "var(--shadow-float)"
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-accent": "var(--gradient-accent)",
        "gradient-success": "var(--gradient-success)",
        "gradient-mesh": "var(--gradient-mesh)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      animation: {
        "gradient-shift": "gradient-shift 4s ease infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "morph": "morph 8s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 3s infinite"
      },
      backdropBlur: {
        xs: "2px",
        "3xl": "64px"
      },
      letterSpacing: {
        tighter: "var(--tracking-tight)",
        wide: "var(--tracking-wide)",
        ultra: "var(--tracking-ultra)"
      }
    }
  },
  plugins: []
}

export default config
