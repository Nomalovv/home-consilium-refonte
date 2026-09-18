"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CTA_SERVICE, serviceAutre, type Service } from "@/content/services";
import { apparitionSequencee, enfantSequence, vueUneFois } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Props = {
  services: Service[];
  /** Affiche la carte « Autre » en fin de grille. */
  avecAutre?: boolean;
  /** Révèle les sous-services au survol / focus. */
  explorables?: boolean;
  className?: string;
};

/**
 * Pictogrammes purement décoratifs, un par domaine : ils donnent un repère
 * visuel chaleureux sans rien affirmer sur le contenu.
 */
const PICTOS: Record<string, React.ReactNode> = {
  "renovation-complete": (
    <>
      <path d="M4 12 12 5l8 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 11v8h11v-8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 19v-4.5h3V19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  "cuisine-salle-de-bain": (
    <>
      <path d="M5 4v6a2.5 2.5 0 0 0 5 0V4M7.5 10v10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.5 20V4c-2 .8-3 2.8-3 5.5s1 4 3 4.2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  "extension-surelevation": (
    <>
      <path d="M3 20V10l6-4 6 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 20V13h6v7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 20h18" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  "amenagement-interieur": (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" strokeWidth="2" />
      <path d="M3.5 12h17M12 12v7" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  "amenagement-exterieur": (
    <>
      <path d="M4 19V9l8-5 8 5v10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 19h20" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 19v-5h8v5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

function Picto({ slug }: { slug: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      {PICTOS[slug] ?? (
        <path
          d="M12 5v14M5 12h14"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export function ServiceGrid({
  services,
  avecAutre = false,
  explorables = false,
  className,
}: Props) {
  return (
    <motion.ul
      variants={apparitionSequencee}
      initial="cachee"
      whileInView="visible"
      viewport={vueUneFois}
      /**
       * Sur mobile : carrousel horizontal avec accrochage — six cartes
       * empilées faisaient une page interminable au pouce.
       * À partir de `sm` : grille classique.
       */
      className={cn("carrousel-mobile sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {services.map((s) => (
        <motion.li key={s.slug} variants={enfantSequence} className="flex">
          <Link
            href={`/services/${s.slug}`}
            className="group glass glass-readable flex w-full flex-col rounded-lg p-5 transition-all duration-300 ease-doux hover:-translate-y-1.5 hover:shadow-lift motion-reduce:hover:translate-y-0 sm:p-6 md:p-7"
          >
            <span
              aria-hidden="true"
              className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-terre-100 text-terre-700 transition-all duration-300 ease-doux group-hover:scale-110 group-hover:bg-terre-200 motion-reduce:group-hover:scale-100 dark:bg-terre-700/25 dark:text-terre-300 sm:mb-5"
            >
              <Picto slug={s.slug} />
            </span>

            <h3 className="font-display text-h3 font-semibold text-ardoise-900 dark:text-ardoise-100">
              {s.titre}
            </h3>
            <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-ink-muted sm:text-[15px]">
              {s.description}
            </p>

            <ul
              className={cn(
                "mt-4 space-y-1.5 text-[13.5px] text-ink-muted sm:mt-5 sm:text-[14px]",
                explorables &&
                  "max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-doux group-hover:max-h-40 group-hover:opacity-100 group-focus-visible:max-h-40 group-focus-visible:opacity-100 motion-reduce:max-h-40 motion-reduce:opacity-100 max-sm:max-h-40 max-sm:opacity-100",
              )}
            >
              {s.sousServices.map((ss) => (
                <li key={ss.titre} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-1 w-3 shrink-0 rounded-full bg-terre-500"
                  />
                  {ss.titre}
                </li>
              ))}
            </ul>

            <span className="mt-5 inline-flex items-center gap-2 text-[14.5px] font-semibold text-terre-700 dark:text-terre-300 sm:mt-6 sm:text-[15px]">
              {CTA_SERVICE}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </span>
          </Link>
        </motion.li>
      ))}

      {avecAutre && (
        <motion.li variants={enfantSequence} className="flex">
          <Link
            href={serviceAutre.href}
            className="group flex w-full flex-col rounded-lg border-2 border-dashed border-terre-300 p-5 transition-all duration-300 ease-doux hover:border-terre-500 hover:bg-terre-100/60 dark:border-terre-700/60 dark:hover:bg-white/[0.06] sm:p-6 md:p-7"
          >
            <span
              aria-hidden="true"
              className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-dashed border-terre-300 text-terre-700 transition-transform duration-300 ease-doux group-hover:rotate-90 motion-reduce:group-hover:rotate-0 dark:border-terre-700/60 dark:text-terre-300 sm:mb-5"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 4v12M4 10h12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <h3 className="font-display text-h3 font-semibold text-ardoise-900 dark:text-ardoise-100">
              {serviceAutre.titre}
            </h3>
            <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-ink-muted sm:text-[15px]">
              {serviceAutre.description}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-[14.5px] font-semibold text-terre-700 dark:text-terre-300 sm:mt-6 sm:text-[15px]">
              {serviceAutre.cta}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </span>
          </Link>
        </motion.li>
      )}
    </motion.ul>
  );
}
