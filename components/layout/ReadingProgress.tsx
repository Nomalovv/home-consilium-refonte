"use client";

import { useEffect, useState } from "react";

/** Indicateur de progression de lecture — pages longues (/methode, services). */
export function ReadingProgress() {
  const [progression, setProgression] = useState(0);

  useEffect(() => {
    const calculer = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgression(total > 0 ? Math.min(1, h.scrollTop / total) : 0);
    };
    calculer();
    window.addEventListener("scroll", calculer, { passive: true });
    window.addEventListener("resize", calculer);
    return () => {
      window.removeEventListener("scroll", calculer);
      window.removeEventListener("resize", calculer);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
    >
      <div
        className="h-full origin-left bg-terre-600 transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progression})` }}
      />
    </div>
  );
}
