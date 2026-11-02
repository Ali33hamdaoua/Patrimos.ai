import type { Locale } from "./config";
import { APP_URL } from "@/lib/site-mode";

/**
 * Textes de la page d'accueil de la plateforme (reprise de la page d'accueil
 * d'app.patrimos.ai, mêmes formulations FR / EN).
 */
const fr = {
  metaTitle: "Patrimos.AI — Gestion Intelligente des Actifs",
  metaDescription:
    "Redéfinissez la précision financière avec notre infrastructure de gestion d'actifs de nouvelle génération.",
  language: "Langue",
  badge: "Propulsée par l'Intelligence Artificielle",
  titleLine1: "Gestion Intelligente",
  titleLine2: "des Actifs",
  subtitle:
    "Redéfinissez la précision financière avec notre infrastructure de gestion d'actifs de nouvelle génération. Sécurité atomique, analyses prédictives et vision en temps réel.",
  login: "Se connecter",
  metrics: {
    tags: "Tags scannés par seconde",
    accuracy: "Précision d'identification",
    latency: "Latence de traitement",
  },
  architecture: "Architecture",
  architectureTitle: "Conçu pour l'excellence opérationnelle",
  features: {
    securityTitle: "Sécurité Intégrale",
    securityDesc:
      "Protocoles de chiffrement de grade militaire et traçabilité RFID avec une précision atomique pour chaque actif.",
    aiTitle: "Analyse Financière IA",
    aiDesc:
      "Algorithmes prédicteurs natifs calculant les modèles de dépréciation et valeur nette comptable instantanément.",
    liveTitle: "Activité en direct",
    liveDesc:
      "Surveillance des flux de mouvements d'actifs en temps réel avec notification proactive et auditabilité totale.",
  },
  infrastructure: "Infrastructure",
  infraTitle1: "L'Atelier Numérique de la",
  infraTitle2: "Haute Finance.",
  infraDesc:
    "Chaque actif, chaque mouvement, chaque donnée financière — tracée, analysée et sécurisée dans une architecture cloud de nouvelle génération.",
  copyright: "© {year} Patrimos.AI — The Digital Atelier. Tous droits réservés.",
  ssl: "Chiffrement SSL",
  support: "Support",
  privacy: "Confidentialité",
  back: "Retour à l'accueil",
};

export type AppHomeDictionary = typeof fr;

const en: AppHomeDictionary = {
  metaTitle: "Patrimos.AI — Intelligent Asset Management",
  metaDescription:
    "Redefine financial precision with our next-generation asset management infrastructure.",
  language: "Language",
  badge: "Powered by Artificial Intelligence",
  titleLine1: "Intelligent",
  titleLine2: "Asset Management",
  subtitle:
    "Redefine financial precision with our next-generation asset management infrastructure. Atomic security, predictive analytics and real-time visibility.",
  login: "Sign in",
  metrics: {
    tags: "Tags scanned per second",
    accuracy: "Identification accuracy",
    latency: "Processing latency",
  },
  architecture: "Architecture",
  architectureTitle: "Built for operational excellence",
  features: {
    securityTitle: "End-to-end Security",
    securityDesc:
      "Military-grade encryption protocols and RFID traceability with atomic precision for every asset.",
    aiTitle: "AI Financial Analysis",
    aiDesc: "Native predictive algorithms computing depreciation models and net book value instantly.",
    liveTitle: "Live Activity",
    liveDesc: "Real-time monitoring of asset movements with proactive notifications and full auditability.",
  },
  infrastructure: "Infrastructure",
  infraTitle1: "The Digital Atelier of",
  infraTitle2: "High Finance.",
  infraDesc:
    "Every asset, every movement, every financial figure — tracked, analysed and secured in a next-generation cloud architecture.",
  copyright: "© {year} Patrimos.AI — The Digital Atelier. All rights reserved.",
  ssl: "SSL Encrypted",
  support: "Support",
  privacy: "Privacy",
  back: "Back to home",
};

export function getAppHomeDictionary(locale: Locale): AppHomeDictionary {
  return locale === "en" ? en : fr;
}

/** Adresses PUBLIQUES de la page d'accueil (FR sans préfixe, EN sous `/en`). */
export function appHomeHref(locale: Locale, page: "home" | "privacy" = "home"): string {
  const base = locale === "en" ? "/en" : "";
  return page === "privacy" ? `${base}/confidentialite` : base || "/";
}

/**
 * Liens vers la plateforme. `lang` fait suivre la langue choisie ici : l'app
 * la mémorise (cookie de son propre domaine) puis retire le paramètre.
 * `support=1` ouvre directement le formulaire de ticket de la connexion.
 */
export function appLoginUrl(locale: Locale, support = false): string {
  return `${APP_URL}/login?${support ? "support=1&" : ""}lang=${locale}`;
}
