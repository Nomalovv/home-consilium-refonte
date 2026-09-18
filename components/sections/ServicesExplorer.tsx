"use client";

import { useMemo, useState } from "react";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { filtresBesoin, services } from "@/content/services";
import { cn } from "@/lib/utils";

/** Filtre par besoin (chips) + grille des 6 cartes explorables. */
export function ServicesExplorer() {
  const [actif, setActif] = useState("tous");

  const visibles = useMemo(() => {
    const filtre = filtresBesoin.find((f) => f.id === actif) ?? filtresBesoin[0];
    return services.filter((s) => filtre.slugs.includes(s.slug));
  }, [actif]);

  return (
    <div>
      <div role="group" aria-label="Filtrer les services par besoin">
        <ul className="flex flex-wrap gap-2">
          {filtresBesoin.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => setActif(f.id)}
                aria-pressed={actif === f.id}
                className={cn(
                  "cible-tactile inline-flex items-center rounded-full px-3.5 py-2.5 text-[14px] font-semibold transition-all duration-200 sm:px-4 sm:text-[14.5px]",
                  actif === f.id
                    ? "bg-terre-700 text-white shadow-chaud"
                    : "glass glass-sm text-ardoise-900 hover:shadow-lift dark:text-ardoise-100",
                )}
              >
                {f.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p aria-live="polite" className="mt-3 text-[13.5px] text-ink-muted sm:mt-4">
        {visibles.length} domaine{visibles.length > 1 ? "s" : ""} affiché
        {visibles.length > 1 ? "s" : ""}.
      </p>

      <ServiceGrid
        key={actif}
        services={visibles}
        avecAutre={actif === "tous"}
        explorables
        className="mt-6 sm:mt-8"
      />
    </div>
  );
}
