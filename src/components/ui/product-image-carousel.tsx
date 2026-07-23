"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

/**
 * Carousel léger pour les visuels produit (section « Le matériel »).
 * Autoplay discret + points cliquables + flèches au survol. Chaque image est
 * `object-contain` dans une zone de hauteur fixe, comme l'image unique
 * d'origine. Retombe sur une image simple s'il n'y en a qu'une.
 */
export function ProductImageCarousel({
  images,
  alt,
}: {
  images: readonly string[];
  alt: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [autoplay] = useState(() =>
    Autoplay({ delay: 3500, stopOnInteraction: false }),
  );

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (images.length <= 1) {
    return (
      <div className="mx-auto flex h-44 items-center justify-center md:h-56">
        <Image
          src={images[0]}
          alt={alt}
          width={240}
          height={240}
          className="h-full w-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div>
      <Carousel
        setApi={setApi}
        plugins={[autoplay]}
        opts={{ loop: true }}
        className="group relative"
      >
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={src}>
              <div className="flex h-44 items-center justify-center md:h-56">
                <Image
                  src={src}
                  alt={`${alt} — vue ${i + 1}`}
                  width={240}
                  height={240}
                  className="h-full w-auto object-contain"
                  priority={i === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Flèches discrètes, visibles au survol de la carte. */}
        <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Carousel>

      {/* Points de pagination. */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => api?.scrollTo(i)}
            aria-label={`Voir la vue ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 bg-gold"
                : "w-1.5 bg-ink-tertiary/60 hover:bg-gold/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
