"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { realisations } from "@/content/entreprise";
import { cn } from "@/lib/utils";

/**
 * Structure de galerie filtrable prête à recevoir du contenu.
 * Aucun projet réel n'étant documenté à ce jour, la galerie affiche un
 * état vide honnête : aucune fiche projet n'est inventée.
 */
export function GalerieRealisations() {
  const [filtre, setFiltre] = useState<string>(realisations.filtres[0]);

  const projets =
    filtre === realisations.filtres[0]
      ? realisations.projets
      : realisations.projets.filter((p) => p.categorie === filtre);

  return (
    <div>
      <div role="group" aria-label="Filtrer les réalisations">
        <ul className="flex flex-wrap gap-2.5">
          {realisations.filtres.map((f) => (
            <li key={f}>
              <button
                type="button"
                onClick={() => setFiltre(f)}
                aria-pressed={filtre === f}
                // Les filtres restent inertes tant qu'aucune réalisation n'est publiée.
                disabled={realisations.projets.length === 0}
                className={cn(
                  "cible-tactile inline-flex items-center rounded-sm px-4 py-2.5 text-[14.5px] font-medium transition-all duration-200",
                  filtre === f
                    ? "bg-ardoise-900 text-white dark:bg-ardoise-100 dark:text-ardoise-900"
                    : "glass glass-sm text-ardoise-900 dark:text-ardoise-100",
                  realisations.projets.length === 0 && "cursor-not-allowed opacity-45",
                )}
              >
                {f}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {projets.length === 0 ? (
        <div className="glass glass-readable mt-10 rounded-xl px-6 py-14 text-center md:px-12">
          <span
            aria-hidden="true"
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-ardoise-100 text-ardoise-700 dark:bg-white/10 dark:text-ardoise-100"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <rect
                x="3.5"
                y="5.5"
                width="17"
                height="13"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="m5 16 4.2-4.2 3 3L16 11l3 3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h2 className="font-display text-h2 font-semibold text-ardoise-900 dark:text-ardoise-100">
            Galerie en préparation
          </h2>
          <p className="mx-auto mt-4 max-w-lisible text-corps-lg text-ink-muted">
            {realisations.etatVide}
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact" variante="secondaire" taille="lg">
              Discuter du vôtre
            </ButtonLink>
          </div>
        </div>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projets.map((p) => (
            <li key={p.titre} className="glass glass-readable rounded-lg p-6">
              <h3 className="font-display text-h3 font-semibold text-ardoise-900 dark:text-ardoise-100">
                {p.titre}
              </h3>
              <p className="mt-2 text-[14.5px] text-ink-muted">
                {p.categorie} · {p.ville}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
