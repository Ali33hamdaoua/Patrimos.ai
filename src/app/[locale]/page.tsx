import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { HeroAnimated } from "@/components/sections/HeroAnimated";
import { Showcase } from "@/components/sections/Showcase";
import { StatsBar } from "@/components/sections/StatsBar";
import { WhatIsPatrimos } from "@/components/sections/WhatIsPatrimos";
import { WhyPatrimos } from "@/components/sections/WhyPatrimos";
import { MobileAppShowcase } from "@/components/sections/MobileAppShowcase";
import { FeaturesGallery } from "@/components/sections/FeaturesGallery";
import { Deployment } from "@/components/sections/Deployment";
import { Security } from "@/components/sections/Security";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

/**
 * Homepage. Sections validées assemblées au fur et à mesure du workflow.
 *
 * Placée directement sous `[locale]/` (hors du route group `(site)`) : pas
 * la Navbar globale est rendue dans `[locale]/layout.tsx` pour toutes les routes.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "fr";
  const dict = getDictionary(safeLocale);

  return (
    <main>
      <HeroAnimated locale={safeLocale} heroAnimated={dict.heroAnimated} />
      <Showcase showcase={dict.showcase} />
      <StatsBar stats={dict.stats} />
      <WhatIsPatrimos whatIsPatrimos={dict.whatIsPatrimos} />
      <WhyPatrimos whyPatrimos={dict.whyPatrimos} />
      <MobileAppShowcase locale={safeLocale} mobileApp={dict.mobileApp} />
      <FeaturesGallery locale={safeLocale} features={dict.features} />
      <Deployment locale={safeLocale} deployment={dict.deployment} />
      <Security locale={safeLocale} security={dict.security} />
      <Faq locale={safeLocale} faq={dict.faq} />
      <Contact contact={dict.contact} />
    </main>
  );
}
