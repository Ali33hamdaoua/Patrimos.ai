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
  // 120px vertical desktop — le luxe respire.
  default: "py-section",
  // ~80→96px : bandeaux courts (stats, sécurité).
  tight: "py-20 md:py-24",
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
