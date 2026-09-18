"use client";

import { motion } from "framer-motion";
import { traitsMarque } from "@/content/entreprise";
import { apparitionSequencee, enfantSequence } from "@/lib/animations";

/** Les 4 traits de marque, révélés séquentiellement au défilement. */
export function TraitsMarque() {
  return (
    <motion.ul
      variants={apparitionSequencee}
      initial="cachee"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid gap-4 sm:grid-cols-2 sm:gap-5"
    >
      {traitsMarque.map((t, i) => (
        <motion.li
          key={t.mot}
          variants={enfantSequence}
          className="glass glass-readable rounded-lg p-5 transition-transform duration-300 ease-doux hover:-translate-y-1 motion-reduce:hover:translate-y-0 sm:p-6 md:p-8"
        >
          <div className="flex items-baseline gap-3">
            <span
              aria-hidden="true"
              className="font-display text-[14px] font-semibold text-terre-700 dark:text-terre-300"
            >
              0{i + 1}
            </span>
            <h3 className="font-display text-h3 font-semibold text-ardoise-900 dark:text-ardoise-100">
              {t.mot}
            </h3>
          </div>
          <p className="mt-3 max-w-lisible text-[15px] leading-relaxed text-ink-muted">
            {t.texte}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
