import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/config";
import { COMING_SOON_ENABLED, COMING_SOON_PATH } from "@/lib/coming-soon";

function pathHasLocale(pathname: string): boolean {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

/**
 * Deux régimes, pilotés par `COMING_SOON_ENABLED` (cf. `src/lib/coming-soon.ts`).
 *
 * 1. Mode page d'attente (actuel) — UNE SEULE URL publique : la racine.
 *    `/` sert la page « Site en cours » par RÉÉCRITURE : l'adresse affichée
 *    reste `www.patrimos.ai`, sans `/fr`, sans `/coming-soon`, sans redirection
 *    visible. Toute autre URL (`/fr`, `/en`, `/fr/application`, `/coming-soon`,
 *    un lien périmé…) est renvoyée en 307 sur la racine.
 *
 * 2. Mode normal — comportement d'origine : chaque route est préfixée par la
 *    locale, `/` part sur la langue par défaut (FR).
 *
 * Le site complet reste intégralement en place dans les deux cas : rien n'est
 * supprimé, seul l'accès public est dévié le temps de la refonte.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (COMING_SOON_ENABLED) {
    // La racine SERT la page d'attente sans changer d'URL. `rewrite` (et non
    // `redirect`) : le visiteur reste sur `www.patrimos.ai`. Next propage
    // lui-même les en-têtes RSC nécessaires.
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = COMING_SOON_PATH;
      return NextResponse.rewrite(url);
    }

    // Tout le reste revient sur la racine. 307 = temporaire : aucun navigateur
    // ne la met en cache, la bascule inverse est immédiate. La query string est
    // effacée (pas d'UTM d'une ancienne campagne traînant sur la page).
    const root = request.nextUrl.clone();
    root.pathname = "/";
    root.search = "";
    return NextResponse.redirect(root);
  }

  /* ---------------------- Mode normal : site complet ---------------------- */

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
  // `/coming-soon` n'est plus exclu : en mode page d'attente, il doit lui
  // aussi être ramené sur la racine — une seule URL publique.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
