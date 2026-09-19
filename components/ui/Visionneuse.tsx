"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
 * `role="dialog"` + `aria-modal`, focus piégé puis rendu à l'élément qui a
 * ouvert la fenêtre, défilement du corps de page bloqué, fermeture par Échap,
 * par la croix ou en cliquant à côté de l'image. Navigation au clavier, par
 * les boutons et par glissement horizontal. L'image garde ses proportions
 * (`object-contain`) : jamais de déformation ni de recadrage.
 */
export function Visionneuse({
  images,
  index,
  onIndex,
  onFermer,
}: {
  images: ImageVisionneuse[];
  index: number;
  onIndex: (i: number) => void;
  onFermer: () => void;
}) {
  const panneau = useRef<HTMLDivElement>(null);
  const boutonFermer = useRef<HTMLButtonElement>(null);
  const departToucher = useRef<number | null>(null);
  const [monte, setMonte] = useState(false);
  const mouvementReduit = useReducedMotion();

  const total = images.length;
  const courante = images[Math.min(index, total - 1)];

  const aller = useCallback(
    (pas: 1 | -1) => onIndex((index + pas + total) % total),
    [index, onIndex, total],
  );

  useVerrouScroll(true);
  useEchap(true, onFermer);

  /* Ouverture : on prend le focus, et on le rend en partant. */
  useEffect(() => {
    const precedent = document.activeElement as HTMLElement | null;
    boutonFermer.current?.focus();
    setMonte(true);
    return () => precedent?.focus?.();
  }, []);

  /* Flèches clavier + piège à focus sur la tabulation. */
  useEffect(() => {
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        aller(1);
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        aller(-1);
        return;
      }
      if (e.key !== "Tab" || !panneau.current) return;
      const cibles = panneau.current.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (cibles.length === 0) return;
      const premier = cibles[0];
      const dernier = cibles[cibles.length - 1];
      if (e.shiftKey && document.activeElement === premier) {
        e.preventDefault();
        dernier.focus();
      } else if (!e.shiftKey && document.activeElement === dernier) {
        e.preventDefault();
        premier.focus();
      }
    };
    document.addEventListener("keydown", surTouche);
    return () => document.removeEventListener("keydown", surTouche);
  }, [aller]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={visionneuse.aria}
      ref={panneau}
      onClick={(e) => {
        // Clic sur le fond (et pas sur l'image ou les commandes) : on ferme.
        if (e.target === e.currentTarget) onFermer();
      }}
      onTouchStart={(e) => {
        departToucher.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const depart = departToucher.current;
        const fin = e.changedTouches[0]?.clientX;
        departToucher.current = null;
        if (depart === null || fin === undefined) return;
        if (Math.abs(fin - depart) < 44) return;
        aller(fin < depart ? 1 : -1);
      }}
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 p-4 sm:gap-5 sm:p-6",
        "bg-[rgb(26_22_19_/_0.92)] backdrop-blur-md",
        "transition-opacity duration-300 ease-doux",
        monte && !mouvementReduit ? "opacity-100" : mouvementReduit ? "opacity-100" : "opacity-0",
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
          "flex max-h-[78vh] w-full max-w-4xl flex-col items-center gap-4",
          "transition-transform duration-300 ease-doux",
          monte ? "scale-100" : "scale-[0.98]",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(courante.src)}
          alt={courante.alt}
          width={1200}
          height={900}
          decoding="async"
          className="max-h-[62vh] w-auto max-w-full rounded-lg object-contain shadow-lift"
        />
        <figcaption className="flex flex-wrap items-center justify-center gap-2.5 text-center">
          {courante.badge && (
            <span className="rounded-full bg-terre-800 px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-terre-100">
              {courante.badge}
            </span>
          )}
          <span className="font-display text-[17px] font-semibold text-creme sm:text-[19px]">
            {courante.legende}
          </span>
        </figcaption>
      </figure>

      <div className="flex items-center gap-3">
        <BoutonVisionneuse
          libelle={visionneuse.precedent}
          onClick={() => aller(-1)}
          sens="precedent"
        />
        <p className="min-w-[66px] text-center font-display text-[14px] font-semibold tabular-nums text-creme/90">
          {visionneuse.compteur(index + 1, total)}
        </p>
        <BoutonVisionneuse
          libelle={visionneuse.suivant}
          onClick={() => aller(1)}
          sens="suivant"
        />
      </div>

      <p className="text-[12.5px] text-creme/70">{visionneuse.aide}</p>
    </div>
  );
}

function BoutonVisionneuse({
  libelle,
  onClick,
  sens,
}: {
  libelle: string;
  onClick: () => void;
  sens: "precedent" | "suivant";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={libelle}
      className="cible-tactile inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-creme transition-colors duration-300 hover:bg-white/20"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={sens === "precedent" ? "M14.5 5 8 12l6.5 7" : "M9.5 5 16 12l-6.5 7"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
