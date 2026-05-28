import type { Locale } from "./config";
import { fr, type Dictionary } from "./dictionaries/fr";
import { en } from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { fr, en };

/** Retourne le dictionnaire d'une locale (fallback FR par sécurité). */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? fr;
}

export type { Dictionary };
