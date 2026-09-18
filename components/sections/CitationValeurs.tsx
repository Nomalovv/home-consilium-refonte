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
      <Blobs variante="discret" />
      <figure className="mx-auto max-w-4xl text-center">
        <blockquote className="font-display text-[clamp(24px,3.6vw,40px)] font-medium leading-[1.2] text-ardoise-900 dark:text-ardoise-100">
          <span aria-hidden="true" className="text-terre-600">
            «&nbsp;
          </span>
          {entreprise.citation}
          <span aria-hidden="true" className="text-terre-600">
            &nbsp;»
          </span>
        </blockquote>
        <figcaption className="mt-5 text-[14px] uppercase tracking-[0.16em] text-ink-muted">
          {entreprise.nom}
        </figcaption>
      </figure>

      <motion.ul
        variants={apparitionSequencee}
        initial="cachee"
        whileInView="visible"
        viewport={vueUneFois}
        className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3"
      >
        {reassurancesAccueil.map((phrase) => (
          <motion.li
            key={phrase}
            variants={enfantSequence}
            className="glass glass-readable flex items-start gap-2.5 rounded-lg p-4 text-[14.5px] leading-snug text-ink"
          >
            <span
              aria-hidden="true"
              className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-terre-600"
            />
            {phrase}
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
