import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Conteneur centré, largeur max et gouttières latérales cohérentes partout. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-content px-6 md:px-8", className)}>
      {children}
    </div>
  );
}
