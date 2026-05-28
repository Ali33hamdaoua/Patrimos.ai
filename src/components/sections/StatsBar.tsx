import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ShimmerText } from "@/components/ui/shimmer-text";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Stats Bar — bande horizontale de 4 chiffres clés en or, avec un effet
 * shimmer lent et discret sur chaque valeur. Fond noir profond cohérent
 * avec le Showcase qui précède.
 *
 * ⚠️ Les 4 chiffres affichés sont des PLACEHOLDERS — caractéristiques
 * produit annoncées, pas des résultats clients mesurés. Voir les commentaires
 * `TODO: chiffre à valider` dans `dictionaries/fr.ts → stats.items`.
 */
export function StatsBar({ stats }: { stats: Dictionary["stats"] }) {
  return (
    <Section variant="base" padding="default" ariaLabel="Chiffres clés">
      <Container>
        <Reveal>
          <p className="mb-14 text-center text-xs uppercase tracking-[0.3em] text-gold/70">
            {stats.overline}
          </p>
        </Reveal>

        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {stats.items.map((stat, index) => (
            <li
              key={stat.value}
              className={cn(
                "flex flex-col items-center px-6 py-8 text-center",
                "lg:py-0",
                // Séparateurs verticaux en or très faible, desktop uniquement.
                index > 0 && "lg:border-l lg:border-[#C9A55C]/15",
              )}
            >
              <Reveal delay={index * 0.08}>
                <ShimmerText
                  // Stagger sur les 4 chiffres pour un balayage en cascade,
                  // pas en synchro (effet plus discret).
                  delay={index * 0.3}
                  duration={2.5}
                  className="block font-serif text-5xl font-medium leading-none text-[#C9A55C] lg:text-6xl"
                >
                  {stat.value}
                </ShimmerText>
                <p className="mx-auto mt-4 max-w-[200px] text-sm leading-snug text-ink-secondary">
                  {stat.label}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
