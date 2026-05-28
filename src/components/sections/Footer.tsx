import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";

// Icône LinkedIn inline (lucide v1.16.0 ne ship plus les icônes de marque).
const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.339 18.337V9.726H5.667v8.611H8.34zM7.005 8.55a1.548 1.548 0 1 0 0-3.096 1.548 1.548 0 0 0 0 3.096zm11.332 9.787v-4.717c0-2.31-.5-4.087-3.2-4.087-1.299 0-2.171.713-2.527 1.388h-.036V9.726h-2.566v8.611h2.674v-4.262c0-1.124.213-2.21 1.604-2.21 1.37 0 1.387 1.282 1.387 2.282v4.19h2.664z" />
  </svg>
);
import {
  FooterBackgroundGradient,
  TextHoverEffect,
} from "@/components/ui/hover-footer";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Footer Patrimos.ai. Grille 12 colonnes (brand 4 + 4 colonnes × 2),
 * texte géant SVG "PATRIMOS.AI" en bas (desktop uniquement) avec
 * révélation or au survol. Fond noir profond cohérent + radial or subtil.
 */
export function Footer({
  locale,
  footer,
}: {
  locale: Locale;
  footer: Dictionary["footer"];
}) {
  return (
    <footer className="relative overflow-hidden bg-surface">
      <Container className="relative z-10">
        <div className="pb-12 pt-20">
          {/* Brand + colonnes */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-4">
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
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-secondary">
                {footer.tagline}
              </p>
            </div>

            {/* 3 colonnes de liens */}
            {footer.columns.map((column) => (
              <div key={column.title} className="lg:col-span-2">
                <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-tertiary">
                  {column.title}
                </h4>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={localizeHref(link.href, locale)}
                        className="text-sm text-ink-secondary transition-colors hover:text-[#C9A55C]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Colonne Contact */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-tertiary">
                {footer.contact.title}
              </h4>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <a
                    href={`mailto:${footer.contact.email}`}
                    className="text-ink-secondary transition-colors hover:text-[#C9A55C]"
                  >
                    {footer.contact.email}
                  </a>
                </li>
                <li className="text-ink-secondary">{footer.contact.phone}</li>
                <li className="text-ink-secondary">{footer.contact.location}</li>
              </ul>
            </div>
          </div>

          <hr className="my-10 border-t border-line" />

          {/* Bas : socials + copyright/trademark */}
          <div className="flex flex-col-reverse items-center justify-between gap-6 text-xs md:flex-row">
            <div className="flex items-center gap-5">
              <a
                href={footer.social.linkedinHref}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={footer.social.linkedinLabel}
                className="text-ink-secondary transition-colors hover:text-[#C9A55C]"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={`mailto:${footer.contact.email}`}
                aria-label={footer.social.emailLabel}
                className="text-ink-secondary transition-colors hover:text-[#C9A55C]"
              >
                <Mail size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="text-center leading-relaxed text-ink-tertiary md:text-right">
              <p>{footer.copyright}</p>
              <p>{footer.trademark}</p>
            </div>
          </div>
        </div>

        {/* Texte géant "PATRIMOS.AI" — desktop seulement, révélation or au survol. */}
        <div className="-mt-10 hidden h-[14rem] lg:block">
          <TextHoverEffect text={footer.giant} />
        </div>
      </Container>

      <FooterBackgroundGradient />
    </footer>
  );
}
