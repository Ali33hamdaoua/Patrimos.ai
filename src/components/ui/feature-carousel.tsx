"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * FeatureCarousel — éventail 3D auto-rotatif (Apple-style fan).
 *
 * Adapté de la source `feature-carousel.tsx` (HeroSection) :
 *   - Extrait la partie carousel seulement (le titre/sous-titre sont gérés
 *     par la section parente — séparation des préoccupations).
 *   - Repeint à la charte or : bordure d'image #C9A55C/25, boutons or sur
 *     fond #C9A55C/10 avec ring #C9A55C/30. Plus de purple/blue.
 *   - Remplace le shadcn Button (non installé) par des <button> stylés.
 *   - next/image (lazy loading) au lieu de <img>.
 *   - Pause l'autoplay quand l'utilisateur survole le carousel.
 */

export type CarouselImage = { readonly src: string; readonly alt: string };

export function FeatureCarousel({
  images,
}: {
  images: ReadonlyArray<CarouselImage>;
}) {
  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(images.length / 2),
  );
  const [paused, setPaused] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-avance toutes les 4s — mis en pause au survol pour respecter
  // l'interaction utilisateur.
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(handleNext, 4000);
    return () => window.clearInterval(timer);
  }, [handleNext, paused]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative flex h-[420px] w-full items-center justify-center md:h-[500px]"
    >
      <div className="relative flex h-full w-full items-center justify-center [perspective:1000px]">
        {images.map((image, index) => {
          const offset = index - currentIndex;
          const total = images.length;
          let pos = (offset + total) % total;
          if (pos > Math.floor(total / 2)) {
            pos = pos - total;
          }

          const isCenter = pos === 0;
          const isAdjacent = Math.abs(pos) === 1;

          return (
            <div
              key={index}
              aria-hidden={!isCenter}
              className="absolute flex h-80 w-40 items-center justify-center transition-all duration-500 ease-in-out md:h-[440px] md:w-56"
              style={{
                transform: `translateX(${pos * 45}%) scale(${
                  isCenter ? 1 : isAdjacent ? 0.85 : 0.7
                }) rotateY(${pos * -10}deg)`,
                zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                opacity: isCenter ? 1 : isAdjacent ? 0.5 : 0,
                filter: isCenter ? "blur(0px)" : "blur(4px)",
                visibility: Math.abs(pos) > 1 ? "hidden" : "visible",
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={256}
                height={440}
                className="h-full w-full rounded-3xl border-2 border-[#C9A55C]/25 object-cover shadow-2xl shadow-black/50"
              />
            </div>
          );
        })}
      </div>

      {/* Navigation chevrons */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Image précédente"
        className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#C9A55C]/10 text-gold ring-1 ring-[#C9A55C]/30 backdrop-blur-sm transition-colors hover:bg-[#C9A55C]/20 sm:left-8"
      >
        <ChevronLeft
          className="h-5 w-5"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </button>
      <button
        type="button"
        onClick={handleNext}
        aria-label="Image suivante"
        className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#C9A55C]/10 text-gold ring-1 ring-[#C9A55C]/30 backdrop-blur-sm transition-colors hover:bg-[#C9A55C]/20 sm:right-8"
      >
        <ChevronRight
          className="h-5 w-5"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
