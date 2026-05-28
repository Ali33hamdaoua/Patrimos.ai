import Link from "next/link";
import { Eye, MapPin, ShieldCheck, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Section 10 — Sécurité & Souveraineté. id="security" : ancre cible des
 * liens navbar "Sécurité" et footer "Sécurité" qui étaient morts jusqu'ici.
 *
 * Règle de vérité : aucune certification, norme ou spec technique
 * inventée. Le contenu reste sur des affirmations vérifiables et
 * défendables (hébergement N+One/AWS au choix, communications chiffrées
 * sans préciser la techno, transparence sur l'usage des données).
 */
const pillarIcons: readonly LucideIcon[] = [MapPin, ShieldCheck, Eye];

export function Security({
  locale,
  security: dict,
}: {
  locale: Locale;
  security: Dictionary["security"];
}) {
  return (
    <Section
      id="security"
      variant="base"
      padding="default"
      ariaLabel="Sécurité et souveraineté des données"
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
              {dict.title}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 text-lg leading-relaxed text-ink-secondary">
              {dict.subtitle}
            </p>
          </Reveal>
        </div>

        {/* 3 piliers (cartes sobres, sans glow/animation lourde) */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3 lg:gap-8">
          {dict.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index];
            return (
              <Reveal key={pillar.title} delay={0.1 + index * 0.08}>
                <article className="h-full rounded-2xl border border-[#C9A55C]/20 bg-surface-elevated p-7 shadow-2xl shadow-black/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C9A55C]/30 bg-surface">
                    <Icon
                      className="h-5 w-5 text-gold"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-ink-primary">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    {pillar.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Ligne de clôture + CTA fantôme */}
        <Reveal delay={0.4}>
          <div className="mx-auto mt-16 flex max-w-2xl flex-col items-center gap-6 text-center md:mt-20">
            <p className="text-sm leading-relaxed text-ink-secondary">
              {dict.closing}
            </p>
            <Link
              href={localizeHref("/#contact", locale)}
              className="inline-flex items-center justify-center rounded-full border border-gold px-6 py-2.5 font-sans text-sm font-medium tracking-wide text-gold transition-colors duration-300 hover:bg-gold/10"
            >
              {dict.cta}
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
