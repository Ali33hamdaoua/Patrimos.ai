import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import {
  SpatialProductShowcase,
  type SpatialProduct,
} from "@/components/ui/spatial-product-showcase";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Section 6 — Application mobile & matériel. Switcher entre Terminal TC22
 * (avec l'app PATRIMOS) et Puce RFID. id="mobile-app" : cible des liens
 * footer et MiniNavbar pointant `/#mobile-app`.
 */
export function MobileAppShowcase({
  mobileApp: dict,
}: {
  mobileApp: Dictionary["mobileApp"];
}) {
  return (
    <Section
      id="mobile-app"
      variant="base"
      padding="default"
      ariaLabel="Application mobile et matériel"
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

        {/* Showcase produit (switcher TC22 / Puce RFID) */}
        <div className="mt-20">
          <SpatialProductShowcase
            products={dict.products as ReadonlyArray<SpatialProduct>}
          />
        </div>

        {/* Ligne de 4 bénéfices clés */}
        <div className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-2">
          {dict.benefits.map((benefit, index) => (
            <Reveal key={benefit} delay={index * 0.06}>
              <div className="flex items-start gap-3">
                <Check
                  className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-ink-primary">
                  {benefit}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
