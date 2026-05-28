import Link from "next/link";
import {
  GraduationCap,
  Rocket,
  Search,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Section 8 — Déploiement. Timeline 4 étapes, horizontale en desktop,
 * verticale en mobile. Marqueurs ronds posés sur une ligne or 30 %.
 * id="deployment" : cible du footer.
 *
 * Astuce d'alignement de la ligne :
 *   - Desktop : une seule ligne horizontale `top-7` (= 28px = moitié du
 *     marqueur h-14), bornée à `left-[12.5%] right-[12.5%]` pour aller
 *     pile du centre du 1er marqueur au centre du 4e (4 colonnes → 12.5 %).
 *     Les marqueurs (z-10, fond opaque) masquent la ligne sous eux, ce qui
 *     donne l'effet de connexion entre cercles.
 *   - Mobile : une ligne par étape (sauf la dernière), positionnée à
 *     l'intérieur de la `<li>` relative, partant du bas du marqueur
 *     (`top-14`) et s'étendant 48 px sous la `<li>` (`-bottom-12`) pour
 *     rejoindre exactement le marqueur suivant (gap-12).
 */

const stepIcons: readonly LucideIcon[] = [
  Search,
  Tag,
  GraduationCap,
  Rocket,
];

export function Deployment({
  locale,
  deployment: dict,
}: {
  locale: Locale;
  deployment: Dictionary["deployment"];
}) {
  return (
    <Section
      id="deployment"
      variant="base"
      padding="default"
      ariaLabel="Déploiement"
    >
      <Container>
        {/* Bloc titre centré */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-gold/80">
              {dict.overline}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-serif text-4xl leading-[1.15] text-ink-primary md:text-5xl">
              {dict.titlePre}{" "}
              <span className="text-gold">{dict.titleAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 text-lg leading-relaxed text-ink-secondary">
              {dict.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Ligne horizontale (desktop) : du centre du 1er au centre du 4e marqueur. */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-[#C9A55C]/30 md:block"
          />

          <ol className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6">
            {dict.steps.map((step, index) => {
              const Icon = stepIcons[index];
              const isLast = index === dict.steps.length - 1;
              return (
                <Reveal key={step.title} delay={0.1 + index * 0.08}>
                  <li className="relative flex items-start md:flex-col md:items-center md:text-center">
                    {/* Ligne verticale (mobile) : connecte ce marqueur au suivant. */}
                    {!isLast && (
                      <div
                        aria-hidden="true"
                        className="absolute left-7 top-14 -bottom-12 w-px -translate-x-1/2 bg-[#C9A55C]/30 md:hidden"
                      />
                    )}

                    {/* Marqueur — fond opaque pour masquer la ligne dessous. */}
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#C9A55C]/40 bg-[#0D1524]">
                      <Icon
                        className="h-6 w-6 text-gold"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Contenu */}
                    <div className="ml-5 md:ml-0 md:mt-6 md:max-w-xs">
                      <p className="text-xs font-medium uppercase tracking-widest text-gold">
                        {step.timing}
                      </p>
                      <h3 className="mt-2 text-lg font-medium text-ink-primary">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                        {step.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>

        {/* CTA */}
        <Reveal delay={0.4}>
          <div className="mt-20 flex justify-center">
            <Link
              href={localizeHref("/#contact", locale)}
              className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 font-sans text-sm font-medium tracking-wide text-surface transition-colors duration-300 hover:bg-gold-hover"
            >
              {dict.cta}
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
