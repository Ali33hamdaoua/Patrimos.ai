/** Configuration i18n. FR est la langue par défaut ; EN est prévu pour l'expansion. */
export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Préfixe un href interne avec la locale active.
 *   "/"            -> "/fr"
 *   "/#solution"   -> "/fr#solution"
 *   "/a-propos"    -> "/fr/a-propos"
 * Les href externes (http, mailto, tel) sont laissés intacts.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (href === "/") return `/${locale}`;
  if (href.startsWith("/#")) return `/${locale}${href.slice(1)}`;
  if (href.startsWith("/")) return `/${locale}${href}`;
  return href;
}
