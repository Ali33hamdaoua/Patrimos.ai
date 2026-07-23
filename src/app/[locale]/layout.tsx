import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";

/**
 * Système typographique : Geist (Vercel) comme police unique — corps ET
 * titres. Identité « SaaS premium » (Linear / Vercel / Stripe) : une seule
 * grotesque géométrique, la hiérarchie naît du poids, de la taille et de
 * l'interlettrage (cf. globals.css + tailwind.config.ts).
 */

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "fr");
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  };
}

/**
 * Root layout : html + body + fonts + métadonnées. PAS de chrome (Navbar /
 * Footer) — ils sont ajoutés par le route group `(site)`. Les routes en
 * dehors de `(site)` (ex: `(showcase)/`) restent chrome-less.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={GeistSans.variable}>
      <body>
        <Navbar locale={locale} nav={dict.nav} />
        {children}
        <Footer locale={locale} footer={dict.footer} />
      </body>
    </html>
  );
}
