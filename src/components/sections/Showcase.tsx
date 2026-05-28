import { LayoutDashboard } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Showcase : dashboard Patrimos.ai présenté dans une carte 3D qui se
 * redresse au scroll. Vient juste après le Hero (même fond noir profond,
 * pas de rupture). Placeholder visuel tant que le screenshot final n'est
 * pas fourni.
 */
export function Showcase({
  showcase,
}: {
  showcase: Dictionary["showcase"];
}) {
  return (
    <section
      id="showcase"
      className="overflow-hidden bg-surface"
      aria-label="Tableau de bord"
    >
      <ContainerScroll
        titleComponent={
          <>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              {showcase.overline}
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-[1.1] text-ink-primary sm:text-5xl md:text-6xl">
              {showcase.titleLine1}
              <br />
              <span className="text-gold">{showcase.titleLine2}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[600px] text-base leading-relaxed text-ink-secondary">
              {showcase.subtitle}
            </p>
          </>
        }
      >
        {/* Placeholder dashboard : icône or + texte gris, fond noir cohérent.
            À remplacer par <Image src="/images/dashboard.png" .../> quand
            le screenshot final sera fourni dans /public/images/. */}
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-surface">
          <LayoutDashboard
            className="h-16 w-16 text-gold"
            strokeWidth={1.25}
            aria-hidden="true"
          />
          <p className="text-sm text-ink-secondary">
            {showcase.placeholderText}
          </p>
        </div>
      </ContainerScroll>
    </section>
  );
}
