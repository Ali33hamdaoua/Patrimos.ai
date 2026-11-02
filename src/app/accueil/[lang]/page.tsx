import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getAppHomeDictionary } from "@/lib/i18n/app-home";
import { AppHome } from "@/components/app-home/AppHome";

/** Page d'accueil de la plateforme (publique sur `/` et `/en`). */
export default async function AppHomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <AppHome locale={lang} dict={getAppHomeDictionary(lang)} />;
}
