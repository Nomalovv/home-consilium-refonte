"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/content/services";
import { zoneIntervention } from "@/content/entreprise";
import { quiz } from "@/content/interface";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const OPTIONS_PROJET = [
  ...services.map((s) => ({ valeur: s.slug, label: s.titre })),
  { valeur: "inconnu", label: quiz.optionInconnu },
];

const OPTIONS_STADE = quiz.stades.map((s) => ({
  valeur: s.valeur,
  label: s.label,
}));

const ETAPES = quiz.etapes;

type Reponses = {
  projet?: string;
  zone?: string;
  stade?: string;
};

export default function GuidedQuiz() {
  const [etape, setEtape] = useState(0);
  const [reponses, setReponses] = useState<Reponses>({});
  const reduit = useReducedMotion();

  const service = useMemo(
    () => services.find((s) => s.slug === reponses.projet),
    [reponses.projet],
  );

  const lienResultat = useMemo(() => {
    const params = new URLSearchParams();
    params.set(
      "sujet",
      reponses.projet && reponses.projet !== "inconnu" ? reponses.projet : "autre",
    );
    if (reponses.zone) params.set("ville", reponses.zone);
    if (reponses.stade) params.set("stade", reponses.stade);
    return `/contact?${params.toString()}`;
  }, [reponses]);

  function choisir(cle: keyof Reponses, valeur: string) {
    setReponses((r) => ({ ...r, [cle]: valeur }));
    setEtape((e) => Math.min(e + 1, 3));
  }

  function recommencer() {
    setReponses({});
    setEtape(0);
  }

  const progression = ((etape + 1) / ETAPES.length) * 100;

  return (
    <div className="glass glass-lg glass-readable rounded-xl p-5 sm:p-6 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p
          className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-terre-700 dark:text-terre-300 sm:text-[13px]"
          aria-hidden="true"
        >
          {quiz.etapeCourante(etape + 1, ETAPES.length)}
        </p>
        {etape > 0 && (
          <button
            type="button"
            onClick={() => (etape === 3 ? recommencer() : setEtape((e) => e - 1))}
            className="cible-tactile inline-flex items-center gap-1.5 rounded-full px-2 text-[14px] text-ink-muted transition-colors hover:text-terre-700 dark:hover:text-terre-300"
          >
            <span aria-hidden="true">←</span>
            {etape === 3 ? quiz.recommencer : quiz.precedent}
          </button>
        )}
      </div>

      <div
        className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-terre-100 dark:bg-white/10"
        role="progressbar"
        aria-valuenow={etape + 1}
        aria-valuemin={1}
        aria-valuemax={ETAPES.length}
        aria-label={quiz.progression}
      >
        <div
          className="h-full rounded-full bg-terre-700 transition-[width] duration-500 ease-doux"
          style={{ width: `${progression}%` }}
        />
      </div>

      <div aria-live="polite" className="mt-6 sm:mt-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={etape}
            initial={reduit ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduit ? undefined : { opacity: 0, x: -16 }}
            transition={{ duration: reduit ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-balance font-display text-h3 font-semibold text-ardoise-900 dark:text-ardoise-100">
              {ETAPES[etape]}
            </h3>

            {etape === 0 && (
              <ListeOptions
                options={OPTIONS_PROJET}
                actif={reponses.projet}
                onChoisir={(v) => choisir("projet", v)}
              />
            )}

            {etape === 1 && (
              <>
                <ListeOptions
                  compact
                  options={zoneIntervention.zonesQuiz.map((z) => ({
                    valeur: z,
                    label: z,
                  }))}
                  actif={reponses.zone}
                  onChoisir={(v) => choisir("zone", v)}
                />
                <p className="mt-4 text-[13.5px] text-ink-muted sm:text-[14px]">
                  <span className="sm:hidden">
                    {zoneIntervention.limiteRegionCourte}
                  </span>
                  <span className="hidden sm:inline">
                    {zoneIntervention.limiteRegion}
                  </span>
                </p>
              </>
            )}

            {etape === 2 && (
              <ListeOptions
                options={OPTIONS_STADE}
                actif={reponses.stade}
                onChoisir={(v) => choisir("stade", v)}
              />
            )}

            {etape === 3 && (
              <div className="mt-5 sm:mt-6">
                {service ? (
                  <>
                    <p className="text-corps-lg text-ink">
                      {quiz.resultatConnu}{" "}
                      <strong className="font-semibold text-ardoise-900 dark:text-ardoise-100">
                        {service.titre}
                      </strong>
                      .
                    </p>
                    <p className="mt-3 max-w-lisible text-ink-muted">
                      {service.description}
                    </p>
                  </>
                ) : (
                  <p className="max-w-lisible text-corps-lg text-ink">
                    {quiz.resultatInconnu}
                  </p>
                )}

                {reponses.zone === "Autre" && (
                  <p className="mt-4 rounded-md border-l-4 border-terre-600 bg-terre-100 px-4 py-3 text-[14.5px] text-ink dark:bg-white/[0.06]">
                    {zoneIntervention.limiteRegion}
                  </p>
                )}

                {/* Mobile : un seul bouton plein, le reste en liens texte. */}
                <div className="mt-6 flex flex-col items-start gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center">
                  <ButtonLink href={lienResultat} variante="secondaire" taille="lg">
                    {quiz.ctaFormulaire}
                  </ButtonLink>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    {service && (
                      <ButtonLink
                        href={`/services/${service.slug}`}
                        variante="lien"
                      >
                        {quiz.ctaService}
                      </ButtonLink>
                    )}
                    <Button variante="lien" onClick={recommencer}>
                      {quiz.recommencer}
                    </Button>
                  </div>
                </div>
                <p className="mt-4 text-[13px] text-ink-muted sm:text-[13.5px]">
                  {quiz.note}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ListeOptions({
  options,
  actif,
  onChoisir,
  compact = false,
}: {
  options: { valeur: string; label: string }[];
  actif?: string;
  onChoisir: (valeur: string) => void;
  /** Listes longues (les communes) : boutons plus serrés, 2 à 4 colonnes. */
  compact?: boolean;
}) {
  return (
    <ul
      className={cn(
        "mt-5 grid gap-2 sm:mt-6 sm:gap-2.5",
        compact ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "sm:grid-cols-2",
      )}
    >
      {options.map((o) => (
        <li key={o.valeur}>
          <button
            type="button"
            onClick={() => onChoisir(o.valeur)}
            aria-pressed={actif === o.valeur}
            className={cn(
              "group flex w-full cible-tactile items-center justify-between gap-2 rounded-full border-2 text-left font-medium transition-all duration-200",
              compact
                ? "px-3.5 py-2.5 text-[14px]"
                : "px-4 py-3 text-[14.5px] sm:text-[15px]",
              actif === o.valeur
                ? "border-terre-600 bg-terre-200 text-terre-800 dark:bg-terre-700/30 dark:text-terre-300"
                : "border-terre-200 text-ardoise-900 hover:border-terre-500 hover:bg-terre-100 dark:border-white/15 dark:text-ardoise-100 dark:hover:bg-white/[0.08]",
            )}
          >
            <span className="min-w-0">{o.label}</span>
            <span
              aria-hidden="true"
              className="shrink-0 text-terre-700 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 dark:text-terre-300"
            >
              →
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
