import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "../accueil.css";
import { isLocale, locales } from "@/lib/i18n/config";
import { getAppHomeDictionary } from "@/lib/i18n/app-home";

/**
 * Root layout de la page d'accueil de la plateforme. Route interne
 * `/accueil/{fr|en}`, servie sur `/` et `/en` par réécriture (cf.
 * `src/proxy.ts`) : elle n'hérite ni de la Navbar ni du Footer du site.
 * Polices d'app.patrimos.ai, auto-hébergées par next/font au build.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-garamond",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getAppHomeDictionary(isLocale(lang) ? lang : "fr");
  return {
    title: dict.metaTitle,
    description: dict.metaDescription,
    alternates: { languages: { fr: "/", en: "/en" } },
  };
}

export default async function AppHomeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
