"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { methode } from "@/content/methode";
import { methodeCondensee } from "@/content/interface";
import { Section, TitreSection } from "@/components/sections/Section";
import { IllustrationOutils } from "@/components/ui/Illustrations";
import { apparitionSequencee, enfantSequence, vueUneFois } from "@/lib/animations";

export function MethodeCondensee() {
  return (
    <Section className="overflow-hidden">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <TitreSection
          surtitre={methodeCondensee.surtitre}
          titre={methode.titre}
          intro={methode.intro}
          className="min-w-0 flex-1"
        />
        {/*
          L'illustration est dimensionnée par ce conteneur, jamais par une
          classe posée sur le <svg> : la largeur du SVG est déjà fixée à 100 %
          dans le composant, et une classe `w-…` concurrente perdrait l'arbitrage
          CSS. Le texte garde ainsi toute la largeur restante.
        */}
        <div
          aria-hidden="true"
          className="hidden w-[116px] shrink-0 lg:block xl:w-[136px]"
        >
          <IllustrationOutils decoratif className="animate-flottement" />
        </div>
      </div>

      <motion.ol
        variants={apparitionSequencee}
        initial="cachee"
        whileInView="visible"
        viewport={vueUneFois}
        className="carrousel-mobile mt-7 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4"
      >
        {methode.etapes.map((etape) => (
          <motion.li
            key={etape.numero}
            variants={enfantSequence}
            className="glass glass-readable relative overflow-hidden rounded-lg p-5 sm:p-6"
          >
            {/* Numéro fantôme en filigrane : du relief sans bruit */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-4 font-display text-[64px] font-semibold leading-none text-terre-500/10 dark:text-terre-300/10"
            >
              {etape.numero}
            </span>
            <span
              aria-hidden="true"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-terre-700 font-display text-[14px] font-semibold text-white shadow-chaud"
            >
              {etape.numero}
            </span>
            <h3 className="relative mt-3.5 font-display text-[17px] font-semibold text-ardoise-900 dark:text-ardoise-100 sm:text-[18px]">
              {etape.titre}
            </h3>
            <p className="relative mt-2 text-[14px] leading-relaxed text-ink-muted sm:text-[14.5px]">
              {etape.resume}
            </p>
          </motion.li>
        ))}
      </motion.ol>

      <div className="mt-6 sm:mt-8">
        <Link
          href="/methode"
          className="lien-souligne cible-tactile group inline-flex items-center gap-2 font-semibold text-terre-700 dark:text-terre-300"
        >
          {methodeCondensee.lienDetail}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          >
            →
          </span>
        </Link>
      </div>
    </Section>
  );
}
