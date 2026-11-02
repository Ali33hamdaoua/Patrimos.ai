/**
 * Page d'attente « Site en cours ».
 *
 * Son activation ne se règle plus ici : c'est le régime "coming-soon" de
 * `src/lib/site-mode.ts` (variable `NEXT_PUBLIC_SITE_MODE`). L'ancienne
 * variable `NEXT_PUBLIC_COMING_SOON` n'est plus lue.
 */

/** Chemin de la page d'attente (route hors i18n, cf. `src/app/coming-soon/`). */
export const COMING_SOON_PATH = "/coming-soon";
