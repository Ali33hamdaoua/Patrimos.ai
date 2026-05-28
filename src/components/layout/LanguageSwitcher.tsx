"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/cn";

/** Bascule FR / EN en conservant le chemin courant. */
export function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();

  function pathForLocale(locale: Locale): string {
    const segments = pathname.split("/");
    segments[1] = locale; // remplace le segment de locale
    return segments.join("/") || `/${locale}`;
  }

  return (
    <div
      role="group"
      aria-label="Choix de la langue"
      className="flex items-center text-xs"
    >
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          {index > 0 && <span className="mx-1.5 text-ink-tertiary">/</span>}
          <Link
            href={pathForLocale(locale)}
            aria-current={locale === current ? "true" : undefined}
            className={cn(
              "uppercase tracking-widest transition-colors",
              locale === current
                ? "text-gold"
                : "text-ink-tertiary hover:text-ink-secondary",
            )}
          >
            {locale}
          </Link>
        </span>
      ))}
    </div>
  );
}
