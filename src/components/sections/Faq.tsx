import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/accordion";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Section 11 — Questions fréquentes. Accordéon hand-rollé, 6 items
 * "single collapsible". id="faq" : ancre pour navigation future.
 */
export function Faq({
  locale,
  faq: dict,
}: {
  locale: Locale;
  faq: Dictionary["faq"];
}) {
  return (
    <Section
      id="faq"
      variant="base"
      padding="default"
      ariaLabel="Questions fréquentes"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* Bloc titre centré */}
          <div className="text-center">
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
          </div>

          {/* Accordéon */}
          <Reveal delay={0.16}>
            <div className="mt-14 md:mt-16">
              <Accordion items={dict.items} />
            </div>
          </Reveal>

          {/* Ligne de clôture + CTA fantôme */}
          <Reveal delay={0.24}>
            <div className="mt-14 flex flex-col items-center gap-5 text-center md:mt-16">
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
        </div>
      </Container>
    </Section>
  );
}
