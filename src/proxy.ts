import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/config";

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

  if (pathHasLocale(pathname)) {
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
