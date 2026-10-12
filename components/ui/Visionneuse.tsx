"use client";

import { useEffect, useRef, useState } from "react";

import { visionneuse } from "@/content/interface";
import { useEchap, useReducedMotion, useVerrouScroll } from "@/lib/hooks";
import { asset, cn } from "@/lib/utils";

/** Une image affichable en grand, avec sa légende. */
export type ImageVisionneuse = {
  src: string;
  alt: string;
  legende: string;
  /** Petite pastille posée sur la légende (« Aperçu », par exemple). */
  badge?: string;
};

/**
 * Visionneuse plein écran.
 *
 * Affiche une image en grand, sans limite de temps : elle reste ouverte\n * jusqu'à ce qu'on la ferme (Échap, la croix ou un clic n'importe où).\n * Aucune commande de navigation.
 *
 * `role="dialog"` + `aria-modal`, focus pris puis rendu à l'élément qui a
 * ouvert la fenêtre, défilement du corps de page bloqué. L'image garde ses
 * proportions (`object-contain`) : jamais de déformation ni de recadrage.
 */
export function Visionneuse({
  image,
  onFermer,
}: {
  image: ImageVisionneuse;
  onFermer: () => void;
}) {
  const boutonFermer = useRef<HTMLButtonElement>(null);
  const [monte, setMonte] = useState(false);
  const mouvementReduit = useReducedMotion();

  useVerrouScroll(true);
  useEchap(true, onFermer);

  /* Ouverture : on prend le focus, et on le rend en partant. */
  useEffect(() => {
    const precedent = document.activeElement as HTMLElement | null;
    boutonFermer.current?.focus();
    setMonte(true);
    return () => precedent?.focus?.();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={visionneuse.aria}
      onClick={onFermer}
      className={cn(
        "fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center gap-4 p-4 sm:gap-5 sm:p-6",
        "bg-[rgb(26_22_19_/_0.92)] backdrop-blur-md",
        "transition-opacity duration-300 ease-doux",
        monte || mouvementReduit ? "opacity-100" : "opacity-0",
      )}
    >
      <button
        type="button"
        ref={boutonFermer}
        onClick={onFermer}
        aria-label={visionneuse.fermer}
        className="cible-tactile absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-creme transition-colors duration-300 hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <figure
        className={cn(
          "flex max-h-[85vh] w-full max-w-5xl flex-col items-center gap-4",
          "transition-transform duration-300 ease-doux",
          monte ? "scale-100" : "scale-[0.98]",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(image.src)}
          alt={image.alt}
          width={1200}
          height={900}
          decoding="async"
          className="max-h-[72vh] w-auto max-w-full rounded-lg object-contain shadow-lift"
        />
        <figcaption className="flex flex-wrap items-center justify-center gap-2.5 text-center">
          {image.badge && (
            <span className="rounded-full bg-terre-800 px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-terre-100">
              {image.badge}
            </span>
          )}
          <span className="font-display text-[17px] font-semibold text-creme sm:text-[19px]">
            {image.legende}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
