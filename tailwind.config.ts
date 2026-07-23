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
        // Police unique du produit : Geist. Corps + UI.
        sans: [
          "var(--font-geist-sans)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        // `display` = même famille Geist, réservée aux titres (poids + tracking
        // serrés, cf. globals.css). `serif` est conservé comme ALIAS de compat
        // (les titres existants utilisent `font-serif`) et pointe désormais lui
        // aussi vers Geist — plus aucun serif éditorial sur le site.
        display: [
          "var(--font-geist-sans)",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        serif: [
          "var(--font-geist-sans)",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
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
