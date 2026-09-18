"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { CarteRealisation } from "@/components/sections/CarteRealisation";
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
        <ul className="flex flex-wrap gap-2">
          {realisations.filtres.map((f) => (
            <li key={f}>
              <button
                type="button"
                onClick={() => setFiltre(f)}
                aria-pressed={filtre === f}
                // Les filtres restent inertes tant qu'aucune réalisation n'est publiée.
                disabled={realisations.projets.length === 0}
                className={cn(
                  "cible-tactile inline-flex items-center rounded-full px-3.5 py-2.5 text-[14px] font-semibold transition-all duration-200 sm:px-4 sm:text-[14.5px]",
                  filtre === f
                    ? "bg-terre-700 text-white shadow-chaud"
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
        <div className="glass glass-readable mt-8 rounded-xl px-5 py-10 text-center sm:mt-10 sm:px-6 sm:py-14 md:px-12">
          <span
            aria-hidden="true"
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-miel-200 text-miel-800 dark:bg-miel-700/25 dark:text-miel-300 sm:mb-6"
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
        /* Même carte que le carrousel de l'accueil : photo en haut (si elle
           existe), puis le titre et « catégorie · ville ». */
        <ul className="carrousel-mobile mt-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {projets.map((p) => (
            <li key={p.titre} className="flex">
              <CarteRealisation projet={p} className="w-full" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
