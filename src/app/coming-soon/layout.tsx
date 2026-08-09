import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "../globals.css";
import "./coming-soon.css";

/**
 * Root layout dédié à la page d'attente `/coming-soon`.
 *
 * La route vit volontairement HORS de `[locale]/` : elle n'hérite donc ni de
 * la Navbar ni du Footer du site, sans qu'aucun composant existant n'ait à
 * être modifié. Le site complet (`/fr`, `/en`, …) continue d'utiliser son
 * propre layout, inchangé.
 *
 * Supprimer le dossier `src/app/coming-soon/` suffit à retirer entièrement
 * cette page du projet.
 */
export const metadata: Metadata = {
  title: "Patrimos.ai — Site en cours",
  description:
    "Une nouvelle expérience arrive prochainement. Nous préparons une nouvelle version de Patrimos.ai.",
  // Page d'attente : on évite qu'elle soit indexée tant que le site complet
  // est en ligne. À retirer si `/coming-soon` devient la page publique.
  robots: { index: false, follow: false },
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
