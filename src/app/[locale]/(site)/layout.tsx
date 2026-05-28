import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Navbar } from "@/components/layout/Navbar";

/**
 * Layout du site principal : ajoute Navbar (et Footer plus tard) autour des
 * routes "normales" — homepage, /fonctionnalites, /securite, /contact, etc.
 * Les routes hors de ce groupe (cf. `(showcase)`) restent sans chrome.
 */
export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "fr";
  const dict = getDictionary(safeLocale);

  return (
    <>
      <Navbar locale={safeLocale} nav={dict.nav} />
      {children}
    </>
  );
}
