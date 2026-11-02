/**
 * Régime d'accès public du site, choisi en UN seul endroit.
 *
 *   "landing"     → (défaut) la racine sert la page d'accueil de la
 *                   plateforme (« Se connecter » → app.patrimos.ai/login) ;
 *                   FR sur `/`, EN sur `/en`, page Confidentialité.
 *   "coming-soon" → la racine sert la page « Site en cours » (ancien défaut).
 *   "full"        → le site marketing complet (`/fr`, `/en`, …).
 *
 * Dans tous les cas, rien n'est supprimé : seul l'accès public est dévié
 * (cf. `src/proxy.ts`).
 *
 * Surcharge sans toucher au code : variable `NEXT_PUBLIC_SITE_MODE`. Absente,
 * vide ou inconnue → "landing".
 */
export type SiteMode = "landing" | "coming-soon" | "full";

const SITE_MODES: readonly SiteMode[] = ["landing", "coming-soon", "full"];

export function resolveSiteMode(value: string | undefined): SiteMode {
  return SITE_MODES.includes(value as SiteMode) ? (value as SiteMode) : "landing";
}

export const SITE_MODE: SiteMode = resolveSiteMode(process.env.NEXT_PUBLIC_SITE_MODE);

/** Racine des routes internes de la page d'accueil (`/accueil/fr`, `/accueil/en`). */
export const APP_HOME_PATH = "/accueil";

/**
 * Adresse de la plateforme. Surcharge possible par `NEXT_PUBLIC_APP_URL`
 * (ex. un environnement de recette) ; sans barre oblique finale.
 */
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://app.patrimos.ai").replace(/\/+$/, "");
