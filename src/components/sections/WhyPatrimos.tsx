import { FileCheck, Radar, Smartphone, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/spotlight-card";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Section 5 — Pourquoi Patrimos. Trois piliers en cartes GlowCard (variant
 * "gold") au format "problème → réponse". Le glow suit le curseur sur
 * desktop ; sur mobile, le fond solide #0D1524 + la bordure or 22% font
 * exister les cartes même sans interaction.
 */

const pillarIcons: readonly LucideIcon[] = [Radar, Smartphone, FileCheck];

export function WhyPatrimos({
  whyPatrimos: dict,
}: {
  whyPatrimos: Dictionary["whyPatrimos"];
}) {
  return (
    <Section variant="base" padding="default" ariaLabel="Pourquoi Patrimos">
      <Container>
        {/* Titre de section centré. */}
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
        </div>

        {/* Grille 3 piliers. */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3 lg:gap-8">
          {dict.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index];
            return (
              <Reveal key={pillar.title} delay={0.1 + index * 0.08}>
                <GlowCard
                  glowColor="gold"
                  customSize
                  height="100%"
                  className="min-h-[440px]"
                >
                  {/* Bloc haut : icône + titre + problème (grid-row 1fr). */}
                  <div className="flex flex-col">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C9A55C]/30 bg-surface">
                      <Icon
                        className="h-6 w-6 text-gold"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-6 text-lg font-medium text-ink-primary">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm italic leading-relaxed text-ink-secondary">
                      {pillar.problem}
                    </p>
                  </div>

                  {/* Bloc bas : séparateur or + réponse (grid-row auto). */}
                  <div>
                    <span
                      aria-hidden="true"
                      className="mb-4 block h-px w-12 bg-[#C9A55C]/30"
                    />
                    <p className="text-sm leading-relaxed text-ink-primary">
                      {pillar.response.text}
                      <span className="text-gold">{pillar.response.accent}</span>
                    </p>
                  </div>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
