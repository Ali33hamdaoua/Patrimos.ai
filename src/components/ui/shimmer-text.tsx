"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * ShimmerText — balayage lumineux sur du texte, peint via background-clip.
 *
 * Adaptations Patrimos :
 *   - Import `motion/react` → `framer-motion` (version 12.40 installée).
 *   - `cn` importé depuis `@/lib/cn`.
 *   - Le contraste de balayage est forcé à `#E0C888` (or clair) au lieu du
 *     fork light/dark de la source : sur notre fond noir + texte or, le
 *     contraste rgba(0,0,0,0.5) du dark mode original rendrait le texte
 *     invisible pendant le shimmer. #E0C888 garde le balayage dans la
 *     famille or et reste parfaitement lisible mi-animation.
 *
 * Usage prévu : UN SEUL emplacement (StatsBar). Ne pas propager ailleurs.
 */

// Variants supprimés (cleanup "aucun bleu / aucune couleur vive") : on
// pilote la couleur du texte via `className` côté consommateur (ex. la
// StatsBar passe `text-[#C9A55C]`). Aucune palette générique conservée.
interface ShimmerTextProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  spread?: number;
}

export function ShimmerText({
  children,
  className,
  duration = 1.5,
  delay = 1.5,
}: ShimmerTextProps) {
  return (
    <div className="group overflow-hidden">
      <div>
        <motion.div
          className={cn(
            // Contraste forcé à or clair pour rester lisible sur fond noir.
            "inline-block [--shimmer-contrast:#E0C888]",
            className,
          )}
          style={
            {
              WebkitTextFillColor: "transparent",
              background:
                "currentColor linear-gradient(to right, currentColor 0%, var(--shimmer-contrast) 40%, var(--shimmer-contrast) 60%, currentColor 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              backgroundRepeat: "no-repeat",
              backgroundSize: "50% 200%",
            } as React.CSSProperties
          }
          initial={{ backgroundPositionX: "250%" }}
          animate={{ backgroundPositionX: ["-100%", "250%"] }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "linear",
          }}
        >
          <span>{children}</span>
        </motion.div>
      </div>
    </div>
  );
}

export default ShimmerText;
