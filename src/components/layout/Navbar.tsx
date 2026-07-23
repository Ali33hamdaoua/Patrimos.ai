"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Navbar globale (pill flottante or, source unique pour tout le site).
 *
 * - Fixée en haut (`top-4`), z-50, visible sur toutes les routes.
 * - Logo PNG à gauche (separate), pill desktop avec 6 liens + CTA or à
 *   droite, hamburger mobile.
 * - Mobile : overlay plein écran sous la navbar avec les liens en grand
 *   et le CTA en pleine largeur. Verrouille le scroll body + ferme à
 *   Esc + ferme à la navigation.
 * - Aucun blanc pur : pill `bg-white/[0.03]` ultra-subtil sur ring or 20%.
 */
type NavbarProps = {
  locale: Locale;
  nav: Dictionary["nav"];
};

export function Navbar({ locale, nav }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Ferme le menu à chaque navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Verrouille le scroll body + fermeture Esc quand le menu est ouvert.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const ctaHref = localizeHref("/#contact", locale);

  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            aria-label="Patrimos.ai — Accueil"
            className="inline-flex items-center"
          >
            <Image
              src="/logo.png"
              alt="Patrimos.ai"
              width={120}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Pill desktop */}
          <nav
            aria-label="Navigation principale"
            className="hidden md:flex items-center"
          >
            <div className="flex items-center gap-1 rounded-full bg-white/[0.03] px-1 py-1 ring-1 ring-[#C9A55C]/20 backdrop-blur">
              {nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={localizeHref(link.href, locale)}
                  className="px-3 py-2 font-sans text-sm font-medium text-white/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={ctaHref}
                className="ml-1 inline-flex items-center gap-2 rounded-full bg-gold px-3.5 py-2 font-sans text-sm font-medium text-black transition-colors hover:bg-gold/90"
              >
                {nav.cta}
                <ArrowUpRight
                  className="h-4 w-4"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </nav>

          {/* Toggle mobile */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] ring-1 ring-[#C9A55C]/20 backdrop-blur md:hidden"
          >
            {open ? (
              <X className="h-5 w-5 text-white/90" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5 text-white/90" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {/* Menu mobile — overlay plein écran sous la navbar. */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-surface px-6 pb-12 pt-8 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav aria-label="Navigation principale" className="flex flex-col">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={localizeHref(link.href, locale)}
              className="border-b border-[#C9A55C]/15 py-5 font-serif text-2xl text-ink-primary transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href={ctaHref}
          className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-sans text-sm font-medium tracking-wide text-black transition-colors hover:bg-gold/90"
        >
          {nav.cta}
          <ArrowUpRight
            className="h-4 w-4"
            strokeWidth={2}
            aria-hidden="true"
          />
        </Link>
      </div>
    </header>
  );
}
