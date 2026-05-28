"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { cn } from "@/lib/cn";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type NavbarProps = {
  locale: Locale;
  nav: Dictionary["nav"];
};

export function Navbar({ locale, nav }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Transparent en haut, opaque dès qu'on scrolle.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile à chaque navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Verrouille le scroll du body + fermeture à la touche Échap quand le menu est ouvert.
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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-line bg-surface/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Logo locale={locale} />

          <nav
            aria-label="Navigation principale"
            className="hidden items-center gap-10 lg:flex"
          >
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={localizeHref(link.href, locale)}
                className="text-sm text-ink-secondary transition-colors hover:text-ink-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-7 lg:flex">
            <LanguageSwitcher current={locale} />
            <Button href={ctaHref} size="sm">
              {nav.cta}
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center text-ink-primary lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-menu" className="lg:hidden">
          <Container>
            <nav
              aria-label="Navigation principale"
              className="flex flex-col border-t border-line py-6"
            >
              {nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={localizeHref(link.href, locale)}
                  className="py-3 font-serif text-lg text-ink-primary"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 flex items-center justify-between">
                <LanguageSwitcher current={locale} />
                <Button href={ctaHref} size="sm">
                  {nav.cta}
                </Button>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
