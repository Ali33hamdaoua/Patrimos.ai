import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/config";
import { COMING_SOON_PATH } from "@/lib/coming-soon";
import { APP_HOME_PATH, SITE_MODE } from "@/lib/site-mode";

function pathHasLocale(pathname: string): boolean {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

/** Réécriture : l'adresse affichée ne change pas (`www.patrimos.ai/en` reste tel quel). */
function rewrite(request: NextRequest, pathname: string): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.rewrite(url);
}

/**
 * 307 sur une adresse publique, query string effacée (pas d'UTM d'une
 * ancienne campagne). 307 = temporaire : jamais mis en cache, la bascule
 * entre régimes est immédiate.
 */
function redirect(request: NextRequest, pathname: string): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  return NextResponse.redirect(url);
}

/**
 * Trois régimes, pilotés par `SITE_MODE` (cf. `src/lib/site-mode.ts`).
 *
 * 1. "landing" (défaut) — page d'accueil de la plateforme, quatre adresses
 *    publiques servies par RÉÉCRITURE vers `/accueil/{fr|en}` :
 *      `/`                  → accueil FR
 *      `/en`                → accueil EN
 *      `/confidentialite`   → Confidentialité FR
 *      `/en/confidentialite`→ Confidentialité EN
 *    Toute autre adresse (`/fr`, `/fr/application`, `/coming-soon`,
 *    `/accueil/…` en direct, un lien périmé…) revient sur `/` (ou `/en`).
 *
 * 2. "coming-soon" — `/` sert la page « Site en cours » ; tout le reste
 *    revient sur la racine.
 *
 * 3. "full" — comportement d'origine : routes préfixées par la locale, `/`
 *    part sur la langue par défaut (FR).
 *
 * Le site complet reste intégralement en place : rien n'est supprimé, seul
 * l'accès public est dévié.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (SITE_MODE === "landing") {
    // Une réécriture ne repasse pas par le proxy : `/accueil/…` tapé en
    // direct tombe donc dans la redirection finale.
    if (pathname === "/") return rewrite(request, `${APP_HOME_PATH}/fr`);
    if (pathname === "/en") return rewrite(request, `${APP_HOME_PATH}/en`);
    if (pathname === "/confidentialite") return rewrite(request, `${APP_HOME_PATH}/fr/confidentialite`);
    if (pathname === "/en/confidentialite") return rewrite(request, `${APP_HOME_PATH}/en/confidentialite`);
    // Une ancienne adresse anglaise garde l'anglais.
    return redirect(request, pathname === "/en" || pathname.startsWith("/en/") ? "/en" : "/");
  }

  if (SITE_MODE === "coming-soon") {
    if (pathname === "/") return rewrite(request, COMING_SOON_PATH);
    return redirect(request, "/");
  }

  /* ---------------------- Mode "full" : site complet ---------------------- */

  // La page d'attente reste joignable directement quand le mode est coupé.
  if (pathname.startsWith(COMING_SOON_PATH) || pathHasLocale(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Exclut _next, l'API et tout fichier statique (présence d'un point).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
