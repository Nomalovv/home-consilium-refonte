"use client";

import { useEffect, useState } from "react";

/** Vrai si l'utilisateur demande une réduction des animations. */
export function useReducedMotion(): boolean {
  const [reduit, setReduit] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduit(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduit(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduit;
}

/** Verrouille le défilement du body (menus, modales). */
export function useVerrouScroll(actif: boolean) {
  useEffect(() => {
    if (!actif) return;
    const precedent = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = precedent;
    };
  }, [actif]);
}

/** Ferme un élément à l'appui sur Échap. */
export function useEchap(actif: boolean, onFermer: () => void) {
  useEffect(() => {
    if (!actif) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFermer();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [actif, onFermer]);
}
