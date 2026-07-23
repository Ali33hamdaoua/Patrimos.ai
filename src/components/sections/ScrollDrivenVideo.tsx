"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";

/**
 * ScrollDrivenVideo — section h-screen pinned avec layout side-by-side :
 * texte à gauche (overline / titre / description / bullets), vidéo à droite
 * dans une carte cadrée or. Le fond clair du MP4 devient un "plan studio"
 * volontaire grâce au cadre, plutôt qu'une rupture avec le fond sombre de
 * la page.
 *
 * Mécanique GSAP ScrollTrigger inchangée :
 *   - Pin du container pendant ~scrollMultiplier × 100vh
 *   - `video.currentTime` calé sur `self.progress * video.duration`
 *   - Vidéo figée sur la dernière frame à la sortie du pin
 *   - Fallback mobile : si le seek est refusé après 3s, on bascule en
 *     autoplay + loop + muted
 */
type ScrollDrivenVideoProps = {
  src: string;
  poster?: string;
  /** Hauteur de scroll pendant le pin, en multiplicateur de viewport. Par défaut 2 = 200vh. */
  scrollMultiplier?: number;
  overline: string;
  title: string;
  description: string;
  bullets: ReadonlyArray<string>;
};

export function ScrollDrivenVideo({
  src,
  poster,
  scrollMultiplier = 2,
  overline,
  title,
  description,
  bullets,
}: ScrollDrivenVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    gsap.registerPlugin(ScrollTrigger);

    let trigger: ScrollTrigger | null = null;
    let activated = false;
    let fallbackTimer: number | null = null;

    function activateScrollSync() {
      if (activated) return;
      activated = true;

      const unlock = video!.play();
      if (unlock !== undefined) {
        unlock.then(() => video!.pause()).catch(() => {});
      }

      trigger = ScrollTrigger.create({
        trigger: container!,
        start: "top top",
        end: `+=${scrollMultiplier * 100}%`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          if (video!.duration && Number.isFinite(video!.duration)) {
            video!.currentTime = self.progress * video!.duration;
          }
        },
      });
    }

    function activateFallback() {
      if (activated) return;
      activated = true;
      video!.loop = true;
      video!.muted = true;
      video!.play().catch(() => {});
    }

    function onLoadedMetadata() {
      if (fallbackTimer !== null) {
        window.clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
      if (video!.duration > 0 && Number.isFinite(video!.duration)) {
        activateScrollSync();
      } else {
        activateFallback();
      }
    }

    fallbackTimer = window.setTimeout(activateFallback, 3000);

    if (video.readyState >= 1) {
      onLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", onLoadedMetadata, {
        once: true,
      });
    }

    return () => {
      if (fallbackTimer !== null) window.clearTimeout(fallbackTimer);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      trigger?.kill();
    };
  }, [scrollMultiplier]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-full items-center overflow-hidden bg-surface"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Colonne gauche : texte */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold/80">
              {overline}
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.15] text-ink-primary md:text-5xl">
              {title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-secondary md:text-lg">
              {description}
            </p>
            <ul className="mt-8 space-y-3">
              {bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 text-sm text-ink-primary md:text-base"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne droite : vidéo dans une carte cadrée or */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#C9A55C]/25 bg-surface-elevated shadow-2xl shadow-black/50">
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
