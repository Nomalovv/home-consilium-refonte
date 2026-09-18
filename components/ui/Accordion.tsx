"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks";

export type ElementAccordeon = {
  id: string;
  question: string;
  reponse: string;
};

type Props = {
  elements: ElementAccordeon[];
  className?: string;
  /** Index ouvert par défaut. */
  defaut?: number;
};

export function Accordion({ elements, className, defaut = -1 }: Props) {
  const [ouvert, setOuvert] = useState<number>(defaut);
  const baseId = useId();
  const reduit = useReducedMotion();

  return (
    <div className={cn("divide-y divide-[color:var(--hairline)]", className)}>
      {elements.map((el, i) => {
        const estOuvert = ouvert === i;
        const idBouton = `${baseId}-b-${i}`;
        const idPanneau = `${baseId}-p-${i}`;

        return (
          <div key={el.id}>
            <h3 className="m-0">
              <button
                id={idBouton}
                type="button"
                aria-expanded={estOuvert}
                aria-controls={idPanneau}
                onClick={() => setOuvert(estOuvert ? -1 : i)}
                className="flex w-full cible-tactile items-start justify-between gap-3 py-4 text-left transition-colors hover:text-terre-700 dark:hover:text-terre-300 sm:gap-4 sm:py-5"
              >
                <span className="font-display text-[16px] font-semibold leading-snug sm:text-[17px] md:text-[19px]">
                  {el.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1 shrink-0 text-terre-700 transition-transform duration-300 ease-doux dark:text-terre-300",
                    estOuvert && "rotate-45",
                  )}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 4v12M4 10h12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {estOuvert && (
                <motion.div
                  id={idPanneau}
                  role="region"
                  aria-labelledby={idBouton}
                  initial={reduit ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduit ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: reduit ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-lisible pb-5 pr-4 text-ink-muted sm:pb-6 sm:pr-8">
                    {el.reponse}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
