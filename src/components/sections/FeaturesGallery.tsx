import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  ContainerAnimated,
  ContainerStagger,
} from "@/components/ui/animated-gallery";
import { LoadingCarousel } from "@/components/ui/loading-carousel";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Section 7 — La plateforme en action. Carousel autoplay (embla) des captures
 * réelles de la plateforme, avec caption animée + barre de progression.
 * id="features" : cible des liens footer / nav.
 *
 * Captures dans /public (racine), format paysage 16:9 → `aspectRatio="video"`.
 */

// Captures de la plateforme présentées dans le carousel (dans l'ordre).
const PLATFORM_TIPS: { text: string; image: string }[] = [
  { text: "Tableau de bord — tout votre parc d'un coup d'œil", image: "/Dashboard_Patrimos.png" },
  { text: "Analytics & KPIs en temps réel", image: "/Analytics.png" },
  { text: "Rapports PDF / Excel exportables", image: "/Rapports.png" },
  { text: "Alertes suivies en Kanban", image: "/Alertes.png" },
  { text: "Registre complet des actifs", image: "/RegistreActifs.png" },
  { text: "Ajout d'un actif en quelques clics", image: "/AjoutActif.png" },
  { text: "Importation des actifs en masse", image: "/ImportationActifs.png" },
  { text: "Structuration du parc par zones", image: "/Structuration.png" },
  { text: "Insights IA sur votre patrimoine", image: "/AI.png" },
  { text: "Assistant PAT — votre copilote IA", image: "/Chatbot.png" },
  { text: "Sessions d'inventaire guidées", image: "/Sessions_inventaire.png" },
  { text: "Guide utilisateur intégré", image: "/GuideUtilisateur.png" },
];

export function FeaturesGallery({
  locale,
  features: dict,
}: {
  locale: Locale;
  features: Dictionary["features"];
}) {
  const ctaContact = localizeHref("/#contact", locale);
  const ctaMobileApp = localizeHref("/#mobile-app", locale);

  return (
    <section
      id="features"
      aria-label="Fonctionnalités clés"
      className="relative overflow-hidden bg-surface"
    >
      {/* Radial or très subtil en haut de section. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(201, 165, 92, 0.08), transparent 60%)",
        }}
      />

      {/* Header */}
      <Container className="relative z-10">
        <ContainerStagger className="pt-section text-center">
          <ContainerAnimated>
            <p className="text-xs uppercase tracking-[0.3em] text-gold/80">
              {dict.overline}
            </p>
          </ContainerAnimated>

          <ContainerAnimated>
            <h2 className="mt-5 font-serif text-4xl leading-[1.15] text-ink-primary md:text-5xl">
              {dict.titleLine1Pre}
              <span className="text-gold">{dict.titleLine1Accent}</span>
              <br />
              {dict.titleLine2}
            </h2>
          </ContainerAnimated>

          <ContainerAnimated>
            <p className="mx-auto mt-6 max-w-[600px] text-lg leading-relaxed text-ink-secondary">
              {dict.subtitle}
            </p>
          </ContainerAnimated>

          <ContainerAnimated>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={ctaContact}
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 font-sans text-sm font-medium tracking-wide text-surface transition-colors duration-300 hover:bg-gold-hover"
              >
                {dict.ctaPrimary}
              </Link>
              <Link
                href={ctaMobileApp}
                className="inline-flex items-center justify-center rounded-full border border-gold px-8 py-3 font-sans text-sm font-medium tracking-wide text-gold transition-colors duration-300 hover:bg-gold/10"
              >
                {dict.ctaSecondary}
              </Link>
            </div>
          </ContainerAnimated>
        </ContainerStagger>
      </Container>

      {/* Carousel autoplay des captures réelles de la plateforme. */}
      <Container className="relative z-10 mt-16 pb-section md:mt-24">
        <Reveal>
          <LoadingCarousel
            tips={PLATFORM_TIPS}
            aspectRatio="video"
            autoplayInterval={4500}
            showProgress={false}
            showIndicators
            showNavigation
            animateText={false}
          />
        </Reveal>
      </Container>
    </section>
  );
}
