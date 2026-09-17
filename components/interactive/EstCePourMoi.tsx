"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Props = {
  affirmations: string[];
  titreService: string;
  slug: string;
};

/**
 * Bloc d'orientation : aucune note ni score inventé, seulement une
 * reformulation honnête de ce que l'utilisateur vient de cocher.
 */
export default function EstCePourMoi({ affirmations, titreService, slug }: Props) {
  const [coches, setCoches] = useState<boolean[]>(affirmations.map(() => false));
  const nb = coches.filter(Boolean).length;
  const aRepondu = nb > 0;

  const verdict = !aRepondu
    ? "Cochez ce qui correspond à votre situation : nous vous dirons vers quoi vous orienter."
    : nb === affirmations.length
      ? `Votre situation correspond pleinement au domaine ${titreService}. Un premier échange sans engagement permettra de cadrer le projet.`
      : `Au moins un point de votre situation relève du domaine ${titreService}. Parlez-nous du reste : si nous ne sommes pas les mieux placés, nous vous le dirons franchement.`;

  return (
    <div className="glass glass-readable rounded-lg p-6 md:p-8">
      <h2 className="font-display text-h2 font-semibold text-ardoise-900 dark:text-ardoise-100">
        Est-ce pour moi ?
      </h2>
      <ul className="mt-6 space-y-2.5">
        {affirmations.map((a, i) => (
          <li key={a}>
            <button
              type="button"
              role="switch"
              aria-checked={coches[i]}
              onClick={() =>
                setCoches((c) => c.map((v, j) => (i === j ? !v : v)))
              }
              className={cn(
                "flex w-full cible-tactile items-start gap-3 rounded-sm border px-4 py-3.5 text-left text-[15px] leading-relaxed transition-all duration-200",
                coches[i]
                  ? "border-terre-600 bg-terre-300/25 text-ink dark:bg-terre-700/20"
                  : "border-ardoise-300/60 text-ink hover:border-terre-500 dark:border-white/20",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border transition-colors",
                  coches[i]
                    ? "border-terre-600 bg-terre-600 text-white"
                    : "border-ardoise-300 dark:border-white/30",
                )}
              >
                {coches[i] && (
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
                    <path
                      d="m4 10.5 4 4 8-9"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              {a}
            </button>
          </li>
        ))}
      </ul>

      <div
        aria-live="polite"
        className="mt-6 border-t pt-6"
      >
        <p className="max-w-lisible text-[15.5px] leading-relaxed text-ink-muted">
          {verdict}
        </p>
        {aRepondu && (
          <div className="mt-5">
            <ButtonLink href={`/contact?sujet=${slug}`} variante="secondaire">
              Parler de ce projet
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  );
}
