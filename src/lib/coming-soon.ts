/**
 * Interrupteur unique du mode « page d'attente ».
 *
 *   true  → `/` redirige (307, temporaire) vers `/coming-soon`
 *   false → `/` redirige vers `/fr` comme avant, site complet
 *
 * Le site n'est PAS démonté pour autant : `/fr`, `/en`, `/fr/application`…
 * restent servis normalement. Seule la racine change de destination.
 *
 * Surcharge possible sans toucher au code, via la variable d'environnement
 * `NEXT_PUBLIC_COMING_SOON` ("true" / "false"). Si elle n'est pas définie,
 * c'est la constante ci-dessous qui fait foi.
 */
const COMING_SOON_DEFAULT = true;

const envFlag = process.env.NEXT_PUBLIC_COMING_SOON;

export const COMING_SOON_ENABLED =
  envFlag === undefined || envFlag === "" ? COMING_SOON_DEFAULT : envFlag === "true";

/** Chemin de la page d'attente (route hors i18n, cf. `src/app/coming-soon/`). */
export const COMING_SOON_PATH = "/coming-soon";
