import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "base" | "elevated";
type Padding = "default" | "tight" | "none";

const variantClass: Record<Variant, string> = {
  // Fond principal noir profond.
  base: "bg-surface",
  // Bande légèrement plus claire (Stats Bar, Déploiement, etc.).
  elevated: "bg-surface-elevated",
};

const paddingClass: Record<Padding, string> = {
  // Mobile plus compact (80px) → 120px desktop : le luxe respire sans
  // gaspiller de hauteur sur petit écran.
  default: "py-20 md:py-section",
  // ~64→96px : bandeaux courts (stats, sécurité).
  tight: "py-16 md:py-24",
  none: "",
};

/** Wrapper sémantique <section> avec variants de fond et densité verticale. */
export function Section({
  id,
  variant = "base",
  padding = "default",
  ariaLabel,
  className,
  children,
}: {
  id?: string;
  variant?: Variant;
  padding?: Padding;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative",
        variantClass[variant],
        paddingClass[padding],
        className,
      )}
    >
      {children}
    </section>
  );
}
