"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const CLE = "hc-theme";

function appliquer(theme: Theme) {
  const racine = document.documentElement;
  if (theme === "system") racine.removeAttribute("data-theme");
  else racine.setAttribute("data-theme", theme);
}

/** Bascule clair / sombre. Par défaut, le site suit la préférence système. */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [monte, setMonte] = useState(false);

  useEffect(() => {
    setMonte(true);
    try {
      const enregistre = window.localStorage.getItem(CLE) as Theme | null;
      if (enregistre) setTheme(enregistre);
    } catch {
      /* stockage indisponible */
    }
  }, []);

  function basculer() {
    const sombreActuel =
      document.documentElement.getAttribute("data-theme") === "dark" ||
      (!document.documentElement.getAttribute("data-theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    const suivant: Theme = sombreActuel ? "light" : "dark";
    setTheme(suivant);
    appliquer(suivant);
    try {
      window.localStorage.setItem(CLE, suivant);
    } catch {
      /* stockage indisponible */
    }
  }

  const label =
    theme === "dark" ? "Passer en thème clair" : "Passer en thème sombre";

  return (
    <button
      type="button"
      onClick={basculer}
      aria-label={label}
      title={label}
      className={`cible-tactile inline-flex items-center justify-center rounded-full p-2.5 text-ardoise-900 transition-colors hover:bg-terre-100 dark:text-ardoise-100 dark:hover:bg-white/10 ${className ?? ""}`}
    >
      {monte && theme === "dark" ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 2.5v2.2M12 19.3v2.2M4.2 12H2M22 12h-2.2M5.6 5.6 4 4M20 20l-1.6-1.6M18.4 5.6 20 4M4 20l1.6-1.6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 14.5A8.2 8.2 0 0 1 9.5 4a8.3 8.3 0 1 0 10.5 10.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
