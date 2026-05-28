import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Hero({
  locale,
  hero,
}: {
  locale: Locale;
  hero: Dictionary["hero"];
}) {
  return (
    <section className="relative overflow-hidden">
      {/* Halo or discret en haut à droite */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-gold/5 blur-3xl"
      />

      <Container className="relative">
        <div className="grid min-h-screen items-center gap-12 pb-20 pt-32 lg:grid-cols-2 lg:gap-16">
          {/* Colonne texte */}
          <div className="max-w-xl">
            <Reveal>
              <h1 className="font-serif text-4xl leading-[1.08] text-ink-primary sm:text-5xl lg:text-6xl">
                {hero.h1}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-ink-secondary sm:text-lg">
                {hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href={localizeHref("/contact", locale)}>
                  {hero.ctaPrimary}
                </Button>
                <Button href={localizeHref("/#solution", locale)} variant="outline">
                  {hero.ctaSecondary}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-10 max-w-md text-xs leading-relaxed text-ink-tertiary">
                {hero.reference}
              </p>
            </Reveal>
          </div>

          {/* Colonne visuel */}
          <Reveal delay={0.15} className="lg:justify-self-end">
            <HeroVisual />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
