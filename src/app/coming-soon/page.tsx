import { ComingSoon } from "@/components/sections/ComingSoon";

/**
 * Route publique `/coming-soon` — page d'attente temporaire.
 *
 * Indépendante du site : elle n'utilise ni la Navbar, ni le Footer, ni les
 * sections de la homepage, qui restent strictement inchangés. Aucune
 * redirection n'est posée : `/` continue de servir le site complet.
 */
export default function ComingSoonPage() {
  return <ComingSoon />;
}
