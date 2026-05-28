"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import AnimatedTextCycle from "@/components/ui/AnimatedTextCycle";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type HeroAnimatedProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  heroAnimated: Dictionary["heroAnimated"];
};

/**
 * Hero alternatif : canvas WebGL avec ondes de points en or antique en fond,
 * MiniNavbar Patrimos flottante en haut, phrase centrée avec un mot qui cycle.
 *
 * Rendu chrome-less : à utiliser sur des routes hors du route group `(site)`
 * (la Navbar globale n'est pas rendue ici, c'est volontaire).
 */
export function HeroAnimated({ locale, nav, heroAnimated }: HeroAnimatedProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-surface">
      {/* Couche fond : canvas + dégradés. */}
      <div className="absolute inset-0 z-0">
        <CanvasRevealEffect
          animationSpeed={3}
          containerClassName="bg-surface"
          // Or antique #C9A55C en RGB.
          colors={[
            [201, 165, 92],
            [201, 165, 92],
          ]}
          dotSize={6}
          reverse={false}
        />
        {/* Vignette radiale : centre légèrement assombri pour lisibilité du texte. */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(10,10,10,1)_0%,_transparent_100%)]" />
        {/* Dégradé du haut : laisse respirer la MiniNavbar. */}
        <div className="absolute left-0 right-0 top-0 h-1/3 bg-gradient-to-b from-surface to-transparent" />
      </div>

      {/* Couche contenu. */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <MiniNavbar locale={locale} nav={nav} />

        <div className="flex flex-1 items-center justify-center px-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="max-w-4xl font-serif text-3xl leading-tight tracking-tight text-ink-primary sm:text-4xl md:text-5xl lg:text-6xl">
              {heroAnimated.prefix}{" "}
              <AnimatedTextCycle
                words={[...heroAnimated.words]}
                interval={3000}
                className="font-serif italic text-gold"
              />
            </h1>

            <div className="mt-10 flex w-full max-w-sm flex-col items-stretch gap-4 sm:w-auto sm:max-w-none sm:flex-row sm:items-center md:mt-12">
              <Link
                href={localizeHref("/#contact", locale)}
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 font-sans text-sm font-medium tracking-wide text-surface transition-colors duration-300 hover:bg-gold-hover"
              >
                {heroAnimated.ctaPrimary}
              </Link>
              <Link
                href={localizeHref("/#showcase", locale)}
                className="inline-flex items-center justify-center rounded-full border border-gold px-8 py-3 font-sans text-sm font-medium tracking-wide text-gold transition-colors duration-300 hover:bg-gold/10"
              >
                {heroAnimated.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  AnimatedNavLink : lien avec effet de remontée au hover (source 1).        */
/* -------------------------------------------------------------------------- */

const AnimatedNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="group relative inline-block h-5 overflow-hidden text-sm leading-5"
    >
      <span className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
        <span className="leading-5 text-ink-secondary">{children}</span>
        <span className="leading-5 text-ink-primary">{children}</span>
      </span>
    </Link>
  );
};

/* -------------------------------------------------------------------------- */
/*  MiniNavbar : pilule flottante, version Patrimos.                          */
/*  Conserve l'animation de morph de la source (rounded-full ↔ rounded-xl).   */
/* -------------------------------------------------------------------------- */

function MiniNavbar({
  locale,
  nav,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full");
  const shapeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleMenu = () => setIsOpen((value) => !value);

  useEffect(() => {
    if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);

    if (isOpen) {
      setHeaderShapeClass("rounded-xl");
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass("rounded-full");
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    };
  }, [isOpen]);

  const ctaHref = localizeHref("/#contact", locale);

  const logoMark = (
    <Link
      href={`/${locale}`}
      aria-label="Patrimos.ai — Accueil"
      className="inline-flex items-center gap-2"
    >
      <svg
        viewBox="0 0 26 26"
        className="h-5 w-5 text-gold"
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
      <span className="font-serif text-sm tracking-wide text-ink-primary">
        Patrimos<span className="text-gold">.ai</span>
      </span>
    </Link>
  );

  const ctaButton = (
    <Link
      href={ctaHref}
      className="inline-flex w-full items-center justify-center rounded-full bg-gold px-4 py-2 text-xs font-medium tracking-wide text-surface transition-colors hover:bg-gold-hover sm:w-auto sm:text-sm"
    >
      {nav.cta}
    </Link>
  );

  return (
    <header
      className={`fixed left-1/2 top-6 z-20 flex w-[calc(100%-2rem)] -translate-x-1/2 transform flex-col items-center border border-line bg-[rgba(13,26,45,0.55)] px-6 py-3 backdrop-blur-sm sm:w-auto ${headerShapeClass} transition-[border-radius] duration-0 ease-in-out`}
    >
      <div className="flex w-full items-center justify-between gap-x-6 sm:gap-x-8">
        <div className="flex items-center">{logoMark}</div>

        <nav className="hidden items-center space-x-6 text-sm sm:flex">
          {nav.links.map((link) => (
            <AnimatedNavLink
              key={link.href}
              href={localizeHref(link.href, locale)}
            >
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">{ctaButton}</div>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center text-ink-secondary focus:outline-none sm:hidden"
          onClick={toggleMenu}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`flex w-full flex-col items-center overflow-hidden transition-all duration-300 ease-in-out sm:hidden ${
          isOpen
            ? "max-h-[1000px] opacity-100 pt-4"
            : "pointer-events-none max-h-0 opacity-0 pt-0"
        }`}
      >
        <nav className="flex w-full flex-col items-center space-y-4 text-base">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={localizeHref(link.href, locale)}
              className="w-full text-center text-ink-secondary transition-colors hover:text-ink-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 flex w-full flex-col items-center space-y-4">
          {ctaButton}
        </div>
      </div>
    </header>
  );
}
