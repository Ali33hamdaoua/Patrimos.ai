"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { tokens } from "@/lib/design-tokens";

/**
 * Page d'attente Patrimos.ai — Hero plein écran, temporaire.
 *
 * Le fond reprend EXACTEMENT celui du Hero de la homepage (`HeroAnimated`) :
 * `bg-surface` + `CanvasRevealEffect` (matrice de points or antique en WebGL,
 * animationSpeed 3 / dotSize 6) + vignette radiale centrale + dégradé haut.
 * S'y ajoutent deux halos à dérive très lente et un grain animé, tous pilotés
 * par `app/coming-soon/coming-soon.css` (classes `cs-*`).
 *
 * Composition volontairement nue : trois blocs de texte, tous en blanc (la
 * hiérarchie naît de la taille et de l'opacité, pas de la couleur). Ni logo,
 * ni badge, ni CTA.
 *
 * Aucun composant existant n'est modifié : ce fichier est autonome et peut
 * être supprimé sans impact sur le site.
 */

/** Contenu éditorial — court, sobre, orienté « évolution produit ». */
const COPY = {
  title: "Site en cours",
  subtitle: "Une nouvelle expérience arrive prochainement.",
  body: "Nous préparons une nouvelle version de Patrimos.ai, pensée pour offrir une expérience encore plus fluide, précise et élégante.",
} as const;

export function ComingSoon() {
  const reduceMotion = useReducedMotion();

  /* Apparition séquencée du contenu : opacity + translateY léger + blur très
     léger. Une seule fois au chargement, jamais en boucle. */
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: reduceMotion ? 0 : 0.15,
        staggerChildren: reduceMotion ? 0 : 0.16,
      },
    },
  };

  const item: Variants = {
    hidden: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 14, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: reduceMotion ? 0.2 : 0.9,
        ease: tokens.motion.ease,
      },
    },
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-surface">
      {/* Repli sans JavaScript : Framer Motion sérialise `opacity:0` côté
          serveur, le message resterait invisible si l'hydratation n'a pas
          lieu. Le contenu s'affiche alors simplement, sans animation. */}
      <noscript>
        <style>{`.cs-reveal{opacity:1!important;filter:none!important;transform:none!important}`}</style>
      </noscript>

      {/* ------------------------------------------------------------------ *
       *  Couche fond — identique au Hero de la homepage.                    *
       * ------------------------------------------------------------------ */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        {reduceMotion ? (
          /* Sans mouvement : on conserve la matière (halo diffus) sous forme
             statique plutôt que de laisser un aplat noir. */
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(201,165,92,0.10)_0%,_transparent_60%)]" />
        ) : (
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-surface"
            // Or antique #C9A55C en RGB — même réglage que `HeroAnimated`.
            colors={[
              [201, 165, 92],
              [201, 165, 92],
            ]}
            dotSize={6}
            reverse={false}
          />
        )}

        {/* Vignette radiale : centre assombri pour la lisibilité du texte. */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(10,10,10,1)_0%,_transparent_100%)]" />

        {/* Dégradé du haut, comme sur la homepage. */}
        <div className="absolute left-0 right-0 top-0 h-1/3 bg-gradient-to-b from-surface to-transparent" />

        {/* Halos à dérive très lente — le « souffle » du fond. */}
        <div className="cs-halo absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(201,165,92,0.10)_0%,_transparent_65%)] blur-3xl" />
        <div className="cs-halo cs-halo--slow absolute left-[15%] top-[70%] h-[45vmax] w-[45vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(226,205,160,0.07)_0%,_transparent_70%)] blur-3xl" />

        {/* Grain fin animé — texture, jamais visible consciemment. */}
        <div className="cs-grain absolute -inset-8" />

        {/* Fondu vers le noir en bas : ancre la composition. */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-surface to-transparent" />
      </div>

      {/* ------------------------------------------------------------------ *
       *  Couche contenu — centrée verticalement et horizontalement.         *
       *  Tout est blanc : la hiérarchie vient de la taille et de l'opacité. *
       * ------------------------------------------------------------------ */}
      <motion.main
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center sm:px-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="flex w-full max-w-3xl flex-col items-center">
          {/* 1 — Titre principal. */}
          <motion.h1
            variants={item}
            className="cs-reveal tracking-hero heading-shadow text-balance text-4xl leading-[1.06] text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {COPY.title}
          </motion.h1>

          {/* 2 — Sous-titre. */}
          <motion.p
            variants={item}
            className="cs-reveal mt-6 text-balance text-lg leading-relaxed text-white/85 sm:mt-7 sm:text-xl md:text-2xl"
          >
            {COPY.subtitle}
          </motion.p>

          {/* 3 — Texte secondaire. */}
          <motion.p
            variants={item}
            className="cs-reveal mt-5 max-w-xl text-pretty text-sm leading-relaxed text-white/60 sm:mt-6 sm:text-base"
          >
            {COPY.body}
          </motion.p>
        </div>
      </motion.main>
    </div>
  );
}
