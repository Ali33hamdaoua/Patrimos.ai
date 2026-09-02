/**
 * Interrupteur unique du mode « page d'attente ».
 *
 *   true  → TOUTE page publique (`/`, `/fr`, `/en`, `/fr/application`, …)
 *           redirige en 307 vers `/coming-soon`
 *   false → le site complet reprend son fonctionnement normal
 *
 * Le site n'est PAS démonté : aucune page, aucune section, aucun composant
 * n'a été supprimé. Seul l'accès public est dévié, le temps de la refonte.
 *
 * Non concernés par la redirection (cf. `matcher` dans `src/proxy.ts`) :
 * `/api/*`, `/_next/*` et les fichiers statiques.
 *
 * Surcharge possible sans toucher au code, via la variable d'environnement
 * `NEXT_PUBLIC_COMING_SOON` ("true" / "false"). Si elle n'est pas définie,
 * c'est la constante ci-dessous qui fait foi.
 */
const COMING_SOON_DEFAULT = true;

const envFlag = process.env.NEXT_PUBLIC_COMING_SOON;

export const COMING_SOON_ENABLED =
  envFlag === undefined || envFlag === ""
    ? COMING_SOON_DEFAULT
    : envFlag === "true";

/** Chemin de la page d'attente (route hors i18n, cf. `src/app/coming-soon/`). */
export const COMING_SOON_PATH = "/coming-soon";
