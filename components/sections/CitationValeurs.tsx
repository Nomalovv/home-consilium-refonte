"use client";

import { motion } from "framer-motion";
import { entreprise, reassurancesAccueil } from "@/content/entreprise";
import { Section } from "@/components/sections/Section";
import { apparitionSequencee, enfantSequence, vueUneFois } from "@/lib/animations";
import { Blobs } from "@/components/ui/Blobs";

/**
 * Version accueil, volontairement courte : la citation de marque + trois
 * phrases de réassurance. Le détail complet (valeurs + bénéfices) vit sur
 * /a-propos, pour ne pas dupliquer un mur de texte sur mobile.
 */
export function CitationValeurs() {
  return (
    <Section className="overflow-hidden">
      <Blobs variante="section" />
      <figure className="mx-auto max-w-4xl text-center">
        <blockquote className="text-balance font-display text-[clamp(23px,5.4vw,40px)] font-medium leading-[1.2] text-ardoise-900 dark:text-ardoise-100">
          <span aria-hidden="true" className="text-terre-600">
            «&nbsp;
          </span>
          {entreprise.citation}
          <span aria-hidden="true" className="text-terre-600">
            &nbsp;»
          </span>
        </blockquote>
        <figcaption className="mt-4 flex items-center justify-center gap-3 text-[13px] uppercase tracking-[0.16em] text-ink-muted sm:mt-5 sm:text-[14px]">
          <span aria-hidden="true" className="h-px w-8 bg-terre-500" />
          {entreprise.nom}
          <span aria-hidden="true" className="h-px w-8 bg-terre-500" />
        </figcaption>
      </figure>

      <motion.ul
        variants={apparitionSequencee}
        initial="cachee"
        whileInView="visible"
        viewport={vueUneFois}
        className="mx-auto mt-8 grid max-w-3xl gap-2.5 sm:mt-10 sm:grid-cols-3 sm:gap-3"
      >
        {reassurancesAccueil.map((phrase) => (
          <motion.li
            key={phrase}
            variants={enfantSequence}
            className="glass glass-readable flex items-start gap-2.5 rounded-lg p-4 text-[14px] leading-snug text-ink transition-transform duration-300 ease-doux hover:-translate-y-1 motion-reduce:hover:translate-y-0 sm:text-[14.5px]"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-terre-600 dark:text-terre-300"
            >
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                <path
                  d="m4 10.5 4 4 8-9"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {phrase}
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
