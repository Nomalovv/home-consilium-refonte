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
      className={cn(
        "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {services.map((s) => (
        <motion.li key={s.slug} variants={enfantSequence} className="flex">
          <Link
            href={`/services/${s.slug}`}
            className="group glass glass-readable flex w-full flex-col rounded-lg p-6 transition-all duration-300 ease-doux hover:-translate-y-1 hover:shadow-lift md:p-7"
          >
            <span
              aria-hidden="true"
              className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-ardoise-100 text-ardoise-700 transition-colors group-hover:bg-terre-300/60 group-hover:text-terre-700 dark:bg-white/10 dark:text-ardoise-100"
            >
              <svg width="20" height="20" viewBox="0 0 64 64" fill="none">
                <rect x="12" y="8" width="14" height="30" rx="7" fill="currentColor" />
                <rect x="38" y="26" width="14" height="30" rx="7" fill="currentColor" />
                <line
                  x1="19"
                  y1="34"
                  x2="45"
                  y2="30"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                  opacity="0.55"
                />
              </svg>
            </span>

            <h3 className="font-display text-h3 font-semibold text-ardoise-900 dark:text-ardoise-100">
              {s.titre}
            </h3>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-muted">
              {s.description}
            </p>

            <ul
              className={cn(
                "mt-5 space-y-1.5 text-[14px] text-ink-muted",
                explorables &&
                  "max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-doux group-hover:max-h-40 group-hover:opacity-100 group-focus-visible:max-h-40 group-focus-visible:opacity-100 motion-reduce:max-h-40 motion-reduce:opacity-100",
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

            <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-terre-700 dark:text-terre-300">
              {CTA_SERVICE}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
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
            className="group flex w-full flex-col rounded-lg border-2 border-dashed border-ardoise-300/70 p-6 transition-all duration-300 ease-doux hover:border-terre-500 hover:bg-white/40 dark:border-white/20 dark:hover:bg-white/[0.06] md:p-7"
          >
            <span
              aria-hidden="true"
              className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-ardoise-300/70 text-ardoise-700 dark:border-white/20 dark:text-ardoise-100"
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
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-muted">
              {serviceAutre.description}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-terre-700 dark:text-terre-300">
              {serviceAutre.cta}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
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
