import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "../globals.css";
import "./coming-soon.css";

/**
 * Root layout dédié à la page d'attente.
 *
 * La route vit volontairement HORS de `[locale]/` : elle n'hérite donc ni de
 * la Navbar ni du Footer du site, sans qu'aucun composant existant n'ait à
 * être modifié. Le site complet (`/fr`, `/en`, …) conserve son propre layout,
 * inchangé — il est simplement dévié tant que le mode d'attente est actif.
 *
 * En mode d'attente, cette page est servie SUR LA RACINE par réécriture
 * (cf. `src/proxy.ts`) : l'URL publique est `www.patrimos.ai`.
 */
export const metadata: Metadata = {
  title: "Patrimos.ai — Site en cours",
  description:
    "Une nouvelle expérience arrive prochainement. Nous préparons une nouvelle version de Patrimos.ai.",
  // Indexation laissée ouverte : cette page EST la page publique du domaine.
  // La mettre en `noindex` ferait sortir patrimos.ai des résultats de
  // recherche pendant toute la durée de la refonte.
};

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={GeistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
