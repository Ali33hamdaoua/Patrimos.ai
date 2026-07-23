import Link from "next/link";
import {
  Bell,
  Languages,
  Monitor,
  RefreshCw,
  ScanLine,
  Smartphone,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import AnimatedTextCycle from "@/components/ui/AnimatedTextCycle";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { FeatureCarousel } from "@/components/ui/feature-carousel";
import { ProductImageCarousel } from "@/components/ui/product-image-carousel";
import { GlowCard } from "@/components/ui/spotlight-card";
import { ScrollDrivenVideo } from "@/components/sections/ScrollDrivenVideo";
import { isLocale, localizeHref } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/**
 * Page /[locale]/application — présentation détaillée de l'app mobile +
 * matériel. Hérite de la Navbar globale rendue par `[locale]/layout.tsx`.
 *
 * 7 sections : Hero · ScrollDrivenVideo · Le matériel · App carousel ·
 * Features · Écosystème · CTA final.
 */

const featureIcons: readonly LucideIcon[] = [
  ScanLine,
  WifiOff,
  Bell,
  Languages,
  RefreshCw,
];

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "fr";
  const dict = getDictionary(safeLocale);
  const t = dict.application;

  return (
    <main id="application-page">
      {/* 1. Hero de page — même fond animé que la homepage (canvas or + dégradés). */}
      <section
        aria-label="Application & matériel"
        className="relative flex min-h-screen w-full flex-col overflow-hidden bg-surface"
      >
        {/* Couche fond : canvas WebGL ondes de points + dégradés. */}
        <div className="absolute inset-0 z-0">
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-surface"
            // Or antique #C9A55C en RGB.
            colors={[
              [201, 165, 92],
              [201, 165, 92],
            ]}
            dotSize={6}
            reverse={false}
          />
          {/* Vignette radiale : centre légèrement assombri pour lisibilité du texte. */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(10,10,10,1)_0%,_transparent_100%)]" />
          {/* Dégradé du haut : laisse respirer la Navbar globale. */}
          <div className="absolute left-0 right-0 top-0 h-1/3 bg-gradient-to-b from-surface to-transparent" />
        </div>

        {/* Couche contenu. */}
        <div className="relative z-10 flex min-h-screen flex-col">
          <div className="flex flex-1 items-center justify-center px-6 pt-24">
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.3em] text-gold/80">
                  {t.hero.overline}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-5 font-serif text-4xl leading-[1.15] text-ink-primary md:text-6xl">
                  {t.hero.titlePrefix}{" "}
                  <AnimatedTextCycle
                    words={[...t.hero.titleWords]}
                    interval={3000}
                    className="font-serif italic text-gold"
                  />
                  {t.hero.titleSuffix}
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mx-auto mt-6 text-lg leading-relaxed text-ink-secondary">
                  {t.hero.subtitle}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Scroll-driven video — layout side-by-side, texte gauche + vidéo cadrée droite */}
      <ScrollDrivenVideo
        src="/RFIDscanner.mp4"
        overline={t.video.overline}
        title={t.video.title}
        description={t.video.description}
        bullets={t.video.bullets}
      />

      {/* 3. Le matériel (2 cartes) */}
      <Section variant="base" padding="default" ariaLabel="Le matériel">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-gold/80">
                {t.hardware.overline}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-serif text-4xl leading-[1.15] text-ink-primary md:text-5xl">
                {t.hardware.title}
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 lg:gap-8">
            {t.hardware.items.map((item, index) => (
              <Reveal key={item.title} delay={0.1 + index * 0.08}>
                <GlowCard
                  glowColor="gold"
                  customSize
                  height="100%"
                  className="min-h-[580px]"
                >
                  {/* Région haute (grid-row 1fr) : carousel + titre + description. */}
                  <div className="flex flex-col">
                    <ProductImageCarousel
                      images={item.images}
                      alt={item.title}
                    />
                    <h3 className="mt-6 font-serif text-2xl text-ink-primary">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-ink-secondary">
                      {item.description}
                    </p>
                  </div>

                  {/* Région basse (grid-row auto) : bullets or. */}
                  <ul className="space-y-2.5">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm text-ink-primary"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. App carousel */}
      <Section
        variant="base"
        padding="default"
        ariaLabel="L'application mobile"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-gold/80">
                {t.appCarousel.overline}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-serif text-4xl leading-[1.15] text-ink-primary md:text-5xl">
                {t.appCarousel.title}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 text-lg leading-relaxed text-ink-secondary">
                {t.appCarousel.subtitle}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.24}>
            <div className="relative mt-14 md:mt-16">
              {/* Halo or très subtil derrière le carousel. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(201,165,92,0.08), transparent 60%)",
                }}
              />
              <div className="relative">
                <FeatureCarousel images={t.appCarousel.images} />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 5. Features (5 bullets en grille 2 colonnes) */}
      <Section variant="base" padding="default" ariaLabel="Ce que fait l'app">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-gold/80">
                {t.features.overline}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-serif text-4xl leading-[1.15] text-ink-primary md:text-5xl">
                {t.features.title}
              </h2>
            </Reveal>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-x-10 gap-y-10 md:mt-20 md:grid-cols-2">
            {t.features.items.map((feature, index) => {
              const Icon = featureIcons[index];
              return (
                <Reveal key={feature.title} delay={0.1 + index * 0.06}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#C9A55C]/30 bg-surface-elevated">
                      <Icon
                        className="h-5 w-5 text-gold"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-ink-primary">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 6. Écosystème (visualisation sobre) */}
      <Section variant="base" padding="default" ariaLabel="L'écosystème">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-gold/80">
                {t.ecosystem.overline}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-serif text-4xl leading-[1.15] text-ink-primary md:text-5xl">
                {t.ecosystem.title}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 text-lg leading-relaxed text-ink-secondary">
                {t.ecosystem.subtitle}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.24}>
            <div className="mx-auto mt-16 flex max-w-2xl items-center justify-center gap-6 md:mt-20 md:gap-14">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#C9A55C]/30 bg-surface-elevated">
                  <Smartphone
                    className="h-9 w-9 text-gold"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <span className="mt-3 text-xs uppercase tracking-widest text-ink-secondary">
                  {t.ecosystem.mobileLabel}
                </span>
              </div>

              {/* Ligne or avec pulse latéral subtil. */}
              <div
                aria-hidden="true"
                className="relative h-px max-w-[180px] flex-1 overflow-hidden bg-gold/20"
              >
                <span className="ecosystem-pulse absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-gold to-transparent" />
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#C9A55C]/30 bg-surface-elevated">
                  <Monitor
                    className="h-9 w-9 text-gold"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <span className="mt-3 text-xs uppercase tracking-widest text-ink-secondary">
                  {t.ecosystem.dashboardLabel}
                </span>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 7. CTA final */}
      <section
        aria-label="Demander une démo"
        className="bg-surface"
      >
        <Container>
          <div className="flex min-h-[50vh] flex-col items-center justify-center py-section text-center">
            <Reveal>
              <h2 className="font-serif text-4xl leading-[1.15] text-ink-primary md:text-5xl">
                {t.finalCta.title}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 text-lg leading-relaxed text-ink-secondary">
                {t.finalCta.subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <Link
                href={localizeHref("/#contact", safeLocale)}
                className="mt-10 inline-flex items-center justify-center rounded-full bg-gold px-10 py-4 font-sans text-base font-medium tracking-wide text-surface transition-colors duration-300 hover:bg-gold-hover"
              >
                {t.finalCta.cta}
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
