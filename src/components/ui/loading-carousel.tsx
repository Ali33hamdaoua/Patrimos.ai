"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { ChevronRight } from "lucide-react";
import {
  AnimatePresence,
  Variants,
  motion,
  useAnimation,
} from "framer-motion";

import { cn } from "@/lib/cn";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

/**
 * LoadingCarousel — carousel autoplay (embla) avec captions animées.
 *
 * Adapté à Patrimos depuis le composant cult-ui :
 *   - `motion/react` → `framer-motion` ; `@/lib/utils` → `@/lib/cn`.
 *   - Tokens shadcn (bg-muted / text-primary / bg-primary) remplacés par la
 *     charte : fond #141414, bordure or, texte ink, barre de progression or,
 *     puces d'indicateur or/gris.
 *   - `TextScramble` simplifié (plus de `motion.create`).
 */

interface Tip {
  text: string;
  image: string;
  url?: string;
}

export interface LoadingCarouselProps {
  tips?: Tip[];
  className?: string;
  autoplayInterval?: number;
  showNavigation?: boolean;
  showIndicators?: boolean;
  showProgress?: boolean;
  aspectRatio?: "video" | "square" | "wide";
  textPosition?: "top" | "bottom";
  onTipChange?: (index: number) => void;
  backgroundTips?: boolean;
  backgroundGradient?: boolean;
  shuffleTips?: boolean;
  animateText?: boolean;
}

const defaultTips: Tip[] = [
  { text: "Tableau de bord — tout votre parc d'un coup d'œil", image: "/Dashboard_Patrimos.png" },
  { text: "Analytics & KPIs en temps réel", image: "/Analytics.png" },
  { text: "Rapports PDF / Excel exportables", image: "/Rapports.png" },
  { text: "Alertes en Kanban", image: "/Alertes.png" },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const carouselVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
};

const aspectRatioClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[2/1]",
};

type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: React.ElementType;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
};

const defaultChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as: Element = "p",
  trigger = true,
  onScrambleComplete,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const text = children;

  const scramble = useCallback(async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const steps = duration / speed;
    let step = 0;

    const interval = setInterval(() => {
      let scrambled = "";
      const progress = step / steps;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          scrambled += " ";
          continue;
        }

        if (progress * text.length > i) {
          scrambled += text[i];
        } else {
          scrambled +=
            characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setDisplayText(scrambled);
      step++;

      if (step > steps) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
        onScrambleComplete?.();
      }
    }, speed * 1000);
    return () => clearInterval(interval);
  }, [isAnimating, duration, speed, text, characterSet, onScrambleComplete]);

  useEffect(() => {
    if (!trigger) return;
    let clearScramble: (() => void) | undefined;
    scramble().then((clear) => (clearScramble = clear));
    return () => {
      if (clearScramble) clearScramble();
    };
  }, [trigger, scramble]);

  return React.createElement(Element, { className }, displayText);
}

export function LoadingCarousel({
  onTipChange,
  className,
  tips = defaultTips,
  showProgress = true,
  aspectRatio = "video",
  showNavigation = false,
  showIndicators = true,
  backgroundTips = false,
  textPosition = "bottom",
  autoplayInterval = 4500,
  backgroundGradient = false,
  shuffleTips = false,
  animateText = true,
}: LoadingCarouselProps) {
  const [progress, setProgress] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const controls = useAnimation();
  const [displayTips] = useState(() =>
    shuffleTips ? shuffleArray(tips) : tips,
  );

  const autoplay = Autoplay({
    delay: autoplayInterval,
    stopOnInteraction: false,
  });

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());
    setDirection(
      api.scrollSnapList().indexOf(api.selectedScrollSnap()) - current,
    );

    const onSelect = () => {
      const newIndex = api.selectedScrollSnap();
      setCurrent(newIndex);
      setDirection(api.scrollSnapList().indexOf(newIndex) - current);
      onTipChange?.(newIndex);
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, current, onTipChange]);

  useEffect(() => {
    if (!showProgress) return;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = 2;
        return Math.min(oldProgress + diff, 100);
      });
    }, autoplayInterval / 50);

    return () => {
      clearInterval(timer);
    };
  }, [showProgress, autoplayInterval]);

  useEffect(() => {
    if (progress === 100) {
      controls.start({ scaleX: 0 }).then(() => {
        setProgress(0);
        controls.set({ scaleX: 1 });
      });
    } else {
      controls.start({ scaleX: progress / 100 });
    }
  }, [progress, controls]);

  const handleSelect = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-gold/20 bg-[#141414] shadow-2xl shadow-black/40",
        className,
      )}
    >
      <div className="w-full overflow-hidden rounded-2xl">
        <Carousel
          setApi={setApi}
          plugins={[autoplay]}
          className="relative w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            <AnimatePresence initial={false} custom={direction}>
              {(displayTips || []).map((tip, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    variants={carouselVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={direction}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`relative ${aspectRatioClasses[aspectRatio]} w-full overflow-hidden`}
                  >
                    <Image
                      src={tip.image}
                      alt={`Aperçu : ${tip.text}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 1152px"
                      className="object-contain"
                      priority={index === 0}
                    />
                    {backgroundGradient && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    )}

                    {backgroundTips ? (
                      <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className={`absolute ${
                          textPosition === "top" ? "top-0" : "bottom-0"
                        } left-0 right-0 p-4 sm:p-6 md:p-8`}
                      >
                        {displayTips[current]?.url ? (
                          <a
                            href={displayTips[current]?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <p className="text-center font-medium leading-relaxed tracking-tight text-white md:text-left md:text-xl lg:text-2xl lg:font-bold">
                              {tip.text}
                            </p>
                          </a>
                        ) : (
                          <p className="text-center font-medium leading-relaxed tracking-tight text-white md:text-left md:text-xl lg:text-2xl lg:font-bold">
                            {tip.text}
                          </p>
                        )}
                      </motion.div>
                    ) : null}
                  </motion.div>
                </CarouselItem>
              ))}
            </AnimatePresence>
          </CarouselContent>
          {showNavigation && (
            <>
              <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2" />
            </>
          )}
        </Carousel>
        <div
          className={cn(
            "bg-[#141414] p-4",
            showIndicators && !backgroundTips ? "lg:px-4 lg:py-3" : "",
          )}
        >
          <div
            className={cn(
              "flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0",
              showIndicators && !backgroundTips
                ? "items-start gap-3 sm:flex-col sm:space-y-2"
                : "",
            )}
          >
            {showIndicators && (
              <div className="flex w-full space-x-2 overflow-x-auto pb-2 sm:w-auto sm:pb-0">
                {(displayTips || []).map((_, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    className="h-1 w-8 flex-shrink-0 rounded-full"
                    initial={false}
                    animate={{
                      backgroundColor:
                        index === current ? "#C9A55C" : "#3D3D3E",
                    }}
                    transition={{ duration: 0.5 }}
                    onClick={() => handleSelect(index)}
                    aria-label={`Aller à la slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
            <div className="flex items-center space-x-2 whitespace-nowrap text-ink-primary">
              {backgroundTips ? (
                <span className="text-sm font-medium text-ink-secondary">
                  {current + 1}/{displayTips?.length || 0}
                </span>
              ) : (
                <div className="flex flex-col">
                  {displayTips[current]?.url ? (
                    <a
                      href={displayTips[current]?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium tracking-tight lg:text-xl"
                    >
                      {animateText ? (
                        <TextScramble
                          key={displayTips[current]?.text}
                          duration={1.2}
                          characterSet=". "
                        >
                          {displayTips[current]?.text || ""}
                        </TextScramble>
                      ) : (
                        displayTips[current]?.text
                      )}
                    </a>
                  ) : (
                    <span className="text-base font-medium tracking-tight lg:text-xl">
                      {animateText ? (
                        <TextScramble
                          key={displayTips[current]?.text}
                          duration={1.2}
                          characterSet=". "
                        >
                          {displayTips[current]?.text || ""}
                        </TextScramble>
                      ) : (
                        displayTips[current]?.text
                      )}
                    </span>
                  )}
                </div>
              )}
              {backgroundTips && <ChevronRight className="h-4 w-4" />}
            </div>
          </div>
          {showProgress && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={controls}
              transition={{ duration: 0.5, ease: "linear" }}
              className="mt-2 h-1 origin-left bg-gold"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

LoadingCarousel.displayName = "LoadingCarousel";
