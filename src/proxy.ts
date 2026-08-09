import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/config";
import { COMING_SOON_ENABLED, COMING_SOON_PATH } from "@/lib/coming-soon";

function pathHasLocale(pathname: string): boolean {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

/**
 * Préfixe chaque route avec la locale. `/` et toute route non préfixée sont
 * redirigées vers la langue par défaut (FR) — la navbar ne bascule jamais en
 * EN par surprise.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Mode page d'attente : seule la RACINE part sur `/coming-soon`. Les routes
  // localisées (`/fr`, `/en`, `/fr/application`, …) continuent de servir le
  // site complet — rien n'est démonté. Redirection 307 (temporaire) : les
  // navigateurs ne la mettront pas en cache, la bascule inverse est immédiate.
  // Interrupteur : `src/lib/coming-soon.ts`.
  if (COMING_SOON_ENABLED && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = COMING_SOON_PATH;
    return NextResponse.redirect(url);
  }

  if (pathHasLocale(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Exclut _next, l'API, la page d'attente `/coming-soon` (route hors i18n,
  // volontairement non préfixée par la locale) et tout fichier statique
  // (présence d'un point).
  matcher: ["/((?!_next|api|coming-soon|.*\\..*).*)"],
};
