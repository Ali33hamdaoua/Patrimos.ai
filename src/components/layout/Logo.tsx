import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

/**
 * Logo Patrimos.ai.
 * Placeholder : wordmark + marque « ondes RFID entrelacées » dessinée en SVG.
 * À remplacer par l'asset final (PNG/SVG) une fois fourni.
 */
export function Logo({ locale }: { locale: Locale }) {
  return (
    <Link
      href={`/${locale}`}
      aria-label="Patrimos.ai — Accueil"
      className="inline-flex items-center gap-2.5"
    >
      <svg
        viewBox="0 0 26 26"
        className="h-6 w-6 text-gold"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 13a8 8 0 0 1 8-8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M9 13a4 4 0 0 1 4-4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M21 13a8 8 0 0 1-8 8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M17 13a4 4 0 0 1-4 4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="13" cy="13" r="1.4" fill="currentColor" />
      </svg>
      <span className="font-serif text-lg tracking-wide text-ink-primary">
        Patrimos<span className="text-gold">.ai</span>
      </span>
    </Link>
  );
}
