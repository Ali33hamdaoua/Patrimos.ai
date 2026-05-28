"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { tokens } from "@/lib/design-tokens";

type RevealProps = {
  children: ReactNode;
  /** Délai d'apparition en secondes (pour échelonner plusieurs éléments). */
  delay?: number;
  className?: string;
};

/**
 * Apparition discrète au scroll : fade + légère translation verticale, une
 * seule fois. Désactive la translation si l'utilisateur préfère moins
 * d'animations (accessibilité).
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : tokens.motion.reveal.distance,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: tokens.motion.duration.slow,
        ease: tokens.motion.ease,
        delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
