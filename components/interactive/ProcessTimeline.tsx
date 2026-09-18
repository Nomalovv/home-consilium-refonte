"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { methode } from "@/content/methode";
import { useReducedMotion } from "@/lib/hooks";

/** Timeline des 4 étapes, liée au défilement. */
export default function ProcessTimeline() {
  const conteneur = useRef<HTMLOListElement>(null);
  const reduit = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: conteneur,
    offset: ["start 65%", "end 60%"],
  });
  const progression = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <ol ref={conteneur} className="relative space-y-7 sm:space-y-10 md:space-y-16">
      {/* Rail de progression */}
      <div
        aria-hidden="true"
        className="absolute bottom-2 left-[19px] top-2 w-[3px] rounded-full bg-terre-200 dark:bg-white/10 md:left-[23px]"
      >
        <motion.div
          className="h-full w-full origin-top rounded-full bg-terre-700"
          style={reduit ? { scaleY: 1 } : { scaleY: progression }}
        />
      </div>

      {methode.etapes.map((etape, i) => (
        <motion.li
          key={etape.numero}
          initial={reduit ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: reduit ? 0 : 0.5,
            delay: reduit ? 0 : i * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative pl-12 sm:pl-14 md:pl-20"
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-terre-700 font-display text-[15px] font-semibold text-white shadow-chaud md:h-12 md:w-12 md:text-[17px]"
          >
            {etape.numero}
          </span>

          <div className="glass glass-readable rounded-lg p-5 sm:p-6 md:p-8">
            <h3 className="font-display text-h3 font-semibold text-ardoise-900 dark:text-ardoise-100">
              {etape.titre}
            </h3>
            <p className="mt-3 max-w-lisible text-corps-lg text-ink-muted">
              {etape.resume}
            </p>
            <ul className="mt-5 space-y-2.5 border-t pt-5">
              {etape.details.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[15px] text-ink">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-terre-700 dark:text-terre-300"
                  >
                    <path
                      d="m4 10.5 4 4 8-9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
