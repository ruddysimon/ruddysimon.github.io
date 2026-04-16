import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        "surface-foreground": "hsl(var(--surface-foreground))",
        cream: "hsl(var(--cream))",
        "cream-soft": "hsl(var(--cream-soft))",
        ink: "hsl(var(--ink))",
        "ink-soft": "hsl(var(--ink-soft))",
        accent: "hsl(var(--accent))",
        "accent-deep": "hsl(var(--accent-deep))",
        "accent-soft": "hsl(var(--accent-soft))",
      },
      fontFamily: {
        sans: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        pixel: ['"VT323"', "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius))",
        sm: "calc(var(--radius) / 2)",
      },
    },
  },
  plugins: [],
} satisfies Config;
