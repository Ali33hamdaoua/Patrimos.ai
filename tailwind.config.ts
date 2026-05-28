import type { Config } from "tailwindcss";
import { colors, spacing } from "./src/lib/design-tokens";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // bg-surface / bg-surface-elevated
        surface: {
          DEFAULT: colors.background.base,
          elevated: colors.background.elevated,
        },
        // text-gold / bg-gold / border-gold + .hover / .pale
        gold: colors.gold,
        // text-ink-primary / text-ink-secondary / text-ink-tertiary
        ink: colors.ink,
        // border-hairline / border-line
        hairline: colors.hairline,
        line: colors.border,

        // Tokens shadcn (utilisés par les composants ui/* type Dialog).
        // Mappés sur la charte Patrimos — coexistent avec les tokens
        // sémantiques ci-dessus. NE PAS supprimer.
        background: colors.background.base,
        foreground: colors.ink.primary,
        card: {
          DEFAULT: colors.background.elevated,
          foreground: colors.ink.primary,
        },
        muted: {
          DEFAULT: colors.background.elevated,
          foreground: colors.ink.secondary,
        },
        border: colors.border,
        ring: colors.gold.DEFAULT,
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      maxWidth: {
        content: spacing.contentMax,
      },
      spacing: {
        section: spacing.sectionY,
        "section-lg": spacing.sectionYLg,
      },
    },
  },
  plugins: [],
};

export default config;
