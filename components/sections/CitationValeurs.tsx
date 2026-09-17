"use client";

import { motion } from "framer-motion";
import { benefices, entreprise, valeurs } from "@/content/entreprise";
import { Section } from "@/components/sections/Section";
import { apparitionSequencee, enfantSequence, vueUneFois } from "@/lib/animations";
import { Blobs } from "@/components/ui/Blobs";

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
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {valeurs.map((v) => (
          <motion.li
            key={v.titre}
            variants={enfantSequence}
            className="glass glass-readable rounded-lg p-6"
          >
            <h3 className="font-display text-[18px] font-semibold text-ardoise-900 dark:text-ardoise-100">
              {v.titre}
            </h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">
              {v.texte}
            </p>
          </motion.li>
        ))}
      </motion.ul>

      <motion.ul
        variants={apparitionSequencee}
        initial="cachee"
        whileInView="visible"
        viewport={vueUneFois}
        className="mt-5 grid gap-5 sm:grid-cols-3"
      >
        {benefices.map((b) => (
          <motion.li
            key={b.titre}
            variants={enfantSequence}
            className="rounded-lg border p-6"
          >
            <h3 className="font-display text-[17px] font-semibold text-terre-700 dark:text-terre-300">
              {b.titre}
            </h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">
              {b.texte}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
