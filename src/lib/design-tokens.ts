/**
 * Source de vérité unique des valeurs de design de Patrimos.ai.
 *
 * Toute couleur, espacement de section ou réglage d'animation doit venir d'ici.
 * - `tailwind.config.ts` importe `colors` / `spacing` pour générer les classes.
 * - Les composants Framer Motion importent `motion` pour les reveals.
 * On ne réécrit JAMAIS un hex ou une durée en dur dans un composant.
 */

export const colors = {
  /** Fonds : base = noir profond, elevated = bande légèrement plus claire (Stats, Déploiement). */
  background: {
    base: "#07111F",
    elevated: "#0D1A2D",
  },
  /** Or antique : DEFAULT pour CTA/accents, hover pour la transition douce des boutons, pale pour les citations. */
  gold: {
    DEFAULT: "#C9A55C",
    hover: "#D8BB78",
    pale: "#E2CDA0",
  },
  /** Texte : primary (blanc cassé), secondary (gris), tertiary (gris foncé / mentions légales). */
  ink: {
    primary: "#F5F5F5",
    secondary: "#A0A0A0",
    tertiary: "#606060",
  },
  /** Filets décoratifs en or très discret et bordures neutres. */
  hairline: "rgba(201, 165, 92, 0.22)",
  border: "rgba(245, 245, 245, 0.08)",
} as const;

export const spacing = {
  /** Padding vertical des sections (le luxe respire — minimum 120px desktop). */
  sectionY: "120px",
  sectionYLg: "160px",
  /** Largeur max du contenu (registre Linear : aéré, pas pleine largeur). */
  contentMax: "1200px",
} as const;

export const motion = {
  /** Durées en secondes (Framer Motion). Discrètes, jamais spectaculaires. */
  duration: {
    fast: 0.15,
    base: 0.3,
    slow: 0.6,
  },
  /** Easing expo-out : entrée douce, sortie nette. */
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** Reveal au scroll : translation et décalage du stagger. */
  reveal: {
    distance: 24,
    stagger: 0.08,
  },
} as const;

export const tokens = { colors, spacing, motion } as const;

export default tokens;
