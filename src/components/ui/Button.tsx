import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-sans font-semibold tracking-wide transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<Variant, string> = {
  // Or plein, texte sombre — CTA principal.
  solid: "bg-gold text-surface hover:bg-gold-hover",
  // Contour or, transparent — CTA secondaire.
  outline: "border border-gold/60 text-gold hover:bg-gold/10",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-12 px-7 text-sm",
};

type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "children"
> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Si défini, rend un lien Next au lieu d'un <button>. */
  href?: string;
};

export function Button({
  variant = "solid",
  size = "md",
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
