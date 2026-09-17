"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { methode } from "@/content/methode";
import { Section, TitreSection } from "@/components/sections/Section";
import { apparitionSequencee, enfantSequence, vueUneFois } from "@/lib/animations";

export function MethodeCondensee() {
  return (
    <Section>
      <TitreSection
        surtitre="Notre méthode"
        titre={methode.titre}
        intro={methode.intro}
      />

      <motion.ol
        variants={apparitionSequencee}
        initial="cachee"
        whileInView="visible"
        viewport={vueUneFois}
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {methode.etapes.map((etape) => (
          <motion.li
            key={etape.numero}
            variants={enfantSequence}
            className="glass glass-readable rounded-lg p-6"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-terre-600 font-display text-[14px] font-semibold text-white"
            >
              {etape.numero}
            </span>
            <h3 className="mt-4 font-display text-[18px] font-semibold text-ardoise-900 dark:text-ardoise-100">
              {etape.titre}
            </h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">
              {etape.resume}
            </p>
          </motion.li>
        ))}
      </motion.ol>

      <div className="mt-8">
        <Link
          href="/methode"
          className="lien-souligne cible-tactile inline-flex items-center gap-2 font-medium text-terre-700 dark:text-terre-300"
        >
          Voir la méthode en détail
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  );
}
