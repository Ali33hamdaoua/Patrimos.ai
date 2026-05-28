import { Fragment } from "react";
import {
  ChevronRight,
  Cpu,
  LayoutDashboard,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Section 4 — Qu'est-ce que Patrimos ? Bloc texte centré + schéma 3 étapes
 * (Puce RFID → App mobile + Zebra → Dashboard) avec flèches or discrètes
 * en desktop. Mobile : étapes empilées, sans flèches (espacement suffit).
 * id="solution" : cible du CTA "Voir la solution" du Hero.
 */

// Mapping icônes ↔ étapes (par index). Les icônes ne sont pas i18n,
// elles ne vivent pas dans le dictionnaire.
const stepIcons: readonly LucideIcon[] = [Cpu, Smartphone, LayoutDashboard];

export function WhatIsPatrimos({
  whatIsPatrimos: dict,
}: {
  whatIsPatrimos: Dictionary["whatIsPatrimos"];
}) {
  return (
    <Section
      id="solution"
      variant="base"
      padding="default"
      ariaLabel="Qu'est-ce que Patrimos"
    >
      <Container>
        {/* Bloc texte centré. */}
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
            <p className="mx-auto mt-7 text-lg leading-relaxed text-ink-secondary">
              {dict.description}
            </p>
          </Reveal>
        </div>

        {/* Schéma 3 étapes. */}
        <div className="mt-16 md:mt-20">
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-center md:gap-0">
            {dict.steps.map((step, index) => {
              const Icon = stepIcons[index];
              const isLast = index === dict.steps.length - 1;

              return (
                <Fragment key={step.title}>
                  <Reveal delay={0.1 + index * 0.1}>
                    <div className="flex w-44 flex-col items-center text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C9A55C]/30 bg-[#0D1524]">
                        <Icon
                          className="h-7 w-7 text-gold"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </div>
                      <p className="mt-5 text-base font-medium text-ink-primary">
                        {step.title}
                      </p>
                      <p className="mt-1 text-sm leading-snug text-ink-secondary">
                        {step.subtitle}
                      </p>
                    </div>
                  </Reveal>

                  {/* Flèche desktop entre étapes. */}
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className="hidden shrink-0 self-center md:mx-6 md:flex md:items-center lg:mx-10"
                      // L'icône est centrée sur la hauteur du badge (h-16) ;
                      // on remonte d'environ la moitié du contenu sous le badge
                      // (titre + sous-titre) pour qu'elle s'aligne sur les icônes.
                      style={{ marginTop: "1rem" }}
                    >
                      <ChevronRight
                        className="h-5 w-5 text-gold/50"
                        strokeWidth={1.5}
                      />
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
