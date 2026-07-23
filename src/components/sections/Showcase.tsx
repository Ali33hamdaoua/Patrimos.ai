import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Showcase : dashboard Patrimos.ai présenté dans une carte 3D qui se
 * redresse au scroll. Vient juste après le Hero (même fond noir profond,
 * pas de rupture). Affiche la capture réelle du tableau de bord.
 */
export function Showcase({
  showcase,
}: {
  showcase: Dictionary["showcase"];
}) {
  return (
    <section
      id="showcase"
      className="overflow-hidden bg-surface pt-24 md:pt-0"
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
        {/* Capture réelle du tableau de bord Patrimos.ai. La carte est en 16:9
            (comme l'image) → object-cover remplit l'écran bord à bord, sans
            bande noire ni rognage. */}
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <Image
            src="/Dashboard_Patrimos.png"
            alt="Tableau de bord Patrimos.ai"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover object-top"
          />
        </div>
      </ContainerScroll>
    </section>
  );
}
