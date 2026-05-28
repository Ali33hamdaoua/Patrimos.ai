"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * GlowCard — carte avec halo radial qui suit le curseur dans la fenêtre.
 *
 * Adaptations Patrimos :
 *   - Variant "gold" ajouté au glowColorMap, avec saturation/backdrop/border
 *     surclassés pour viser pile #C9A55C (or antique). Sans ces overrides,
 *     les valeurs par défaut du composant (hsl ?, 100%, 70%) produisent un
 *     jaune criard, pas de l'or.
 *   - Backdrop opaque #141414 et bordure or 22% pour que les cartes existent
 *     visuellement au repos (ex. mobile sans curseur).
 *   - "use client" + types stricts (pas d'`any`, custom-properties typées).
 *
 * Note perf : avec 3 cartes montées, on a 3 listeners `pointermove` sur
 * document. Acceptable, mais optimisable plus tard (1 listener parent +
 * rAF batch) si la page en accumule davantage.
 */

// Variants couleur supprimés (cleanup "aucun bleu / aucune couleur vive") :
// seul `gold` est conservé puisque c'est le seul utilisé. Ajouter d'autres
// teintes ici si besoin futur — mais respecter la charte (or, ambre).
type GlowColor = "gold";

type GlowVariant = {
  /** Teinte HSL de base (0–360). */
  base: number;
  /** Amplitude de variation de la teinte selon la position x du curseur. */
  spread: number;
  /** Saturation HSL en % (0–100). Si non défini, fallback CSS = 100. */
  saturation?: number;
  /** Couleur de fond solide de la carte (ex. "#141414"). */
  backdrop?: string;
  /** Couleur de la bordure statique (visible même sans curseur). */
  borderColor?: string;
};

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: GlowColor;
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  /** Si true, ignore `size` et laisse `width`/`height`/`className` piloter la taille. */
  customSize?: boolean;
}

const glowColorMap: Record<GlowColor, GlowVariant> = {
  // Or antique #C9A55C ≈ hsl(40, 50%, 57%). Spread étroit pour rester
  // dans la famille or/ambre et ne pas dériver vers le jaune vif.
  gold: {
    base: 38,
    spread: 20,
    saturation: 50,
    backdrop: "#141414",
    borderColor: "rgba(201, 165, 92, 0.22)",
  },
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
} as const;

type CSSPropertiesWithVars = React.CSSProperties & {
  [key: `--${string}`]: string | number;
};

export const GlowCard = ({
  children,
  className = "",
  glowColor = "gold",
  size = "md",
  width,
  height,
  customSize = false,
}: GlowCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (event: PointerEvent) => {
      const { clientX: x, clientY: y } = event;

      if (cardRef.current) {
        cardRef.current.style.setProperty("--x", x.toFixed(2));
        cardRef.current.style.setProperty(
          "--xp",
          (x / window.innerWidth).toFixed(2),
        );
        cardRef.current.style.setProperty("--y", y.toFixed(2));
        cardRef.current.style.setProperty(
          "--yp",
          (y / window.innerHeight).toFixed(2),
        );
      }
    };

    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  const variant = glowColorMap[glowColor];

  const getSizeClasses = () => {
    if (customSize) return "";
    return sizeMap[size];
  };

  const getInlineStyles = (): CSSPropertiesWithVars => {
    const styles: CSSPropertiesWithVars = {
      "--base": variant.base,
      "--spread": variant.spread,
      "--radius": "14",
      "--border": "3",
      "--backdrop": variant.backdrop ?? "hsl(0 0% 60% / 0.12)",
      "--backup-border": variant.borderColor ?? "var(--backdrop)",
      "--size": "200",
      "--outer": "1",
      "--border-size": "calc(var(--border, 2) * 1px)",
      "--spotlight-size": "calc(var(--size, 150) * 1px)",
      "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
      )`,
      backgroundColor: "var(--backdrop, transparent)",
      backgroundSize:
        "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
      backgroundPosition: "50% 50%",
      backgroundAttachment: "fixed",
      border: "var(--border-size) solid var(--backup-border)",
      position: "relative",
      touchAction: "none",
    };

    // Saturation forcée par variant (sinon fallback CSS 100% = trop criard).
    if (variant.saturation !== undefined) {
      styles["--saturation"] = variant.saturation;
    }
    if (width !== undefined) {
      styles.width = typeof width === "number" ? `${width}px` : width;
    }
    if (height !== undefined) {
      styles.height = typeof height === "number" ? `${height}px` : height;
    }

    return styles;
  };

  const beforeAfterStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }

    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
      );
      filter: brightness(2);
    }

    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
      );
    }

    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }

    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          ${!customSize ? "aspect-[3/4]" : ""}
          rounded-2xl
          relative
          grid
          grid-rows-[1fr_auto]
          shadow-[0_1rem_2rem_-1rem_black]
          p-4
          gap-4
          backdrop-blur-[5px]
          ${className}
        `}
      >
        <div ref={innerRef} data-glow></div>
        {children}
      </div>
    </>
  );
};
