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
          <div className="flex flex-col items-center text-center">
            <h1 className="max-w-4xl font-serif text-3xl leading-tight tracking-tight text-ink-primary sm:text-4xl md:text-5xl lg:text-6xl">
              {heroAnimated.prefix}{" "}
              <AnimatedTextCycle
                words={[...heroAnimated.words]}
                interval={3000}
                className="font-serif italic text-gold"
              />
            </h1>

            <div className="mt-10 flex w-full max-w-sm flex-col items-stretch gap-4 sm:w-auto sm:max-w-none sm:flex-row sm:items-center md:mt-12">
              <Link
                href={localizeHref("/#contact", locale)}
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 font-sans text-sm font-medium tracking-wide text-surface transition-colors duration-300 hover:bg-gold-hover"
              >
                {heroAnimated.ctaPrimary}
              </Link>
              <Link
                href={localizeHref("/#showcase", locale)}
                className="inline-flex items-center justify-center rounded-full border border-gold px-8 py-3 font-sans text-sm font-medium tracking-wide text-gold transition-colors duration-300 hover:bg-gold/10"
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
