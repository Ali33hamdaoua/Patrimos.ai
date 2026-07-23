"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Accordion minimal — hand-rollé, sans dépendance.
 *
 * - Type "single collapsible" : un seul item ouvert à la fois, cliquer
 *   sur l'item ouvert le referme.
 * - Animation hauteur via la technique `grid-template-rows: 0fr → 1fr`
 *   (supporte le auto-height sans mesure JS). Respecte
 *   `prefers-reduced-motion`.
 * - Accessibilité : <button> natif, aria-expanded, aria-controls.
 */
type AccordionItemData = {
  question: string;
  answer: string;
};

export function Accordion({
  items,
}: {
  items: ReadonlyArray<AccordionItemData>;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <ul className="border-y border-[#C9A55C]/15">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const contentId = `${baseId}-content-${index}`;
        const isLast = index === items.length - 1;

        return (
          <li
            key={item.question}
            className={cn(!isLast && "border-b border-[#C9A55C]/15")}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-gold"
            >
              <span className="font-sans text-base font-medium text-ink-primary group-hover:text-gold md:text-lg">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-gold transition-transform duration-300 ease-out motion-reduce:transition-none",
                  isOpen && "rotate-180",
                )}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </button>

            <div
              id={contentId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-6 pr-10 text-sm leading-relaxed text-ink-secondary md:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
