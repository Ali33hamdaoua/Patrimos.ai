import Link from "next/link";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import AnimatedTextCycle from "@/components/ui/AnimatedTextCycle";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Hero animé : canvas WebGL avec ondes de points en or antique en fond,
 * phrase centrée avec un mot qui cycle, deux CTA (démo + showcase).
 *
 * Note : la navbar n'est plus dans ce composant. C'est la `Navbar` globale
 * (cf. `[locale]/layout.tsx`) qui assure la navigation, source unique sur
 * tout le site.
 */
type HeroAnimatedProps = {
  locale: Locale;
  heroAnimated: Dictionary["heroAnimated"];
};

export function HeroAnimated({ locale, heroAnimated }: HeroAnimatedProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-surface">
      {/* Couche fond : canvas + dégradés. */}
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
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="flex max-w-5xl flex-col items-center text-center">
            <h1 className="tracking-hero heading-shadow max-w-4xl text-balance text-4xl leading-[1.12] text-ink-primary sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">{heroAnimated.prefix}</span>
              {/* Dernière ligne (mot cyclé) : légèrement plus petite que les
                  lignes du titre (~87 %), calibrée pour faire à peu près la
                  même largeur que « L'inventaire de votre » → elle s'étend
                  jusqu'avant « L'inventaire » et reste centrée / intégrée au
                  titre, sur une seule ligne en desktop. */}
              <AnimatedTextCycle
                words={[...heroAnimated.words]}
                interval={3000}
                className="text-gold-gradient text-[1.9rem] tracking-[-0.02em] sm:text-[2.5rem] md:text-[3.25rem] lg:text-[4rem]"
              />
            </h1>

            <div className="mt-12 flex w-full max-w-sm flex-col items-stretch gap-4 sm:w-auto sm:max-w-none sm:flex-row sm:items-center md:mt-14">
              <Link
                href={localizeHref("/#contact", locale)}
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-surface transition-colors duration-300 hover:bg-gold-hover"
              >
                {heroAnimated.ctaPrimary}
              </Link>
              <Link
                href={localizeHref("/#showcase", locale)}
                className="inline-flex items-center justify-center rounded-full border border-gold/70 px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-gold transition-colors duration-300 hover:bg-gold/10"
              >
                {heroAnimated.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
