import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  ContainerAnimated,
  ContainerStagger,
} from "@/components/ui/animated-gallery";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Section 7 — La plateforme. id="features" : cible des liens footer / nav.
 *
 * Les captures réelles sont temporairement retirées → placeholder
 * « Captures à venir » en attendant les visuels définitifs.
 */

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
        <ContainerStagger className="pt-20 text-center md:pt-section">
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

      {/* Placeholder « Captures à venir » (visuels définitifs à intégrer). */}
      <Container className="relative z-10 mt-16 pb-20 md:mt-24 md:pb-section">
        <Reveal>
          <div className="mx-auto flex aspect-video w-full max-w-4xl items-center justify-center rounded-2xl border border-dashed border-gold/25 bg-[#141414]">
            <p className="text-xs uppercase tracking-[0.3em] text-ink-tertiary md:text-sm">
              Captures à venir
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
