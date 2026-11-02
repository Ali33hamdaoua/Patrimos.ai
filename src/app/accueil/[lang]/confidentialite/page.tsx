import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getAppHomeDictionary } from "@/lib/i18n/app-home";
import { AppHomePrivacy } from "@/components/app-home/AppHomePrivacy";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getAppHomeDictionary(isLocale(lang) ? lang : "fr");
  return { title: `${dict.privacy} — Patrimos.AI` };
}

/** Confidentialité (publique sur `/confidentialite` et `/en/confidentialite`) : contenu à venir. */
export default async function AppHomePrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <AppHomePrivacy locale={lang} dict={getAppHomeDictionary(lang)} />;
}
