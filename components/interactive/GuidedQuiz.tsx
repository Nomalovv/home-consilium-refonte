"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/content/services";
import { zoneIntervention } from "@/content/entreprise";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const OPTIONS_PROJET = [
  ...services.map((s) => ({ valeur: s.slug, label: s.titre })),
  { valeur: "inconnu", label: "Je ne sais pas encore" },
];

const OPTIONS_STADE = [
  { valeur: "idee", label: "Juste une idée" },
  { valeur: "devis", label: "J'ai des devis en cours ailleurs" },
  { valeur: "pret", label: "Je suis prêt à démarrer" },
];

const ETAPES = [
  "Quel type de projet avez-vous en tête ?",
  "Où se situe le bien ?",
  "À quel stade êtes-vous ?",
  "Votre orientation",
];

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
    params.set("sujet", reponses.projet && reponses.projet !== "inconnu" ? reponses.projet : "autre");
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
    <div className="glass glass-lg glass-readable rounded-xl p-6 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p
          className="text-[13px] font-semibold uppercase tracking-[0.16em] text-terre-700 dark:text-terre-300"
          aria-hidden="true"
        >
          Étape {etape + 1} / {ETAPES.length}
        </p>
        {etape > 0 && (
          <button
            type="button"
            onClick={() => (etape === 3 ? recommencer() : setEtape((e) => e - 1))}
            className="cible-tactile inline-flex items-center gap-1.5 rounded-sm px-2 text-[14px] text-ink-muted transition-colors hover:text-terre-700 dark:hover:text-terre-300"
          >
            <span aria-hidden="true">←</span>
            {etape === 3 ? "Recommencer" : "Étape précédente"}
          </button>
        )}
      </div>

      <div
        className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-ardoise-100 dark:bg-white/10"
        role="progressbar"
        aria-valuenow={etape + 1}
        aria-valuemin={1}
        aria-valuemax={ETAPES.length}
        aria-label="Progression du questionnaire"
      >
        <div
          className="h-full rounded-full bg-terre-600 transition-[width] duration-500 ease-doux"
          style={{ width: `${progression}%` }}
        />
      </div>

      <div aria-live="polite" className="mt-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={etape}
            initial={reduit ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduit ? undefined : { opacity: 0, x: -16 }}
            transition={{ duration: reduit ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-display text-h3 font-semibold text-ardoise-900 dark:text-ardoise-100">
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
                  options={zoneIntervention.zonesQuiz.map((z) => ({
                    valeur: z,
                    label: z,
                  }))}
                  actif={reponses.zone}
                  onChoisir={(v) => choisir("zone", v)}
                />
                <p className="mt-4 text-[14px] text-ink-muted">
                  {zoneIntervention.limiteDepartement}
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
              <div className="mt-6">
                {service ? (
                  <>
                    <p className="text-corps-lg text-ink">
                      Votre projet relève de notre domaine{" "}
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
                    Vous n&apos;avez pas encore identifié le domaine de votre
                    projet : parlez-nous-en directement. Si nous ne sommes pas
                    les mieux placés, nous vous le dirons franchement.
                  </p>
                )}

                {reponses.zone === "Autre" && (
                  <p className="mt-4 rounded-sm border-l-2 border-terre-600 bg-ardoise-50 px-4 py-3 text-[14.5px] text-ink-muted dark:bg-white/[0.06]">
                    {zoneIntervention.limiteDepartement}
                  </p>
                )}

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink href={lienResultat} variante="secondaire" taille="lg">
                    Continuer vers le formulaire
                  </ButtonLink>
                  {service && (
                    <ButtonLink href={`/services/${service.slug}`} variante="glass" taille="lg">
                      Découvrir ce service
                    </ButtonLink>
                  )}
                  <Button variante="discret" taille="lg" onClick={recommencer}>
                    Recommencer
                  </Button>
                </div>
                <p className="mt-4 text-[13.5px] text-ink-muted">
                  Le formulaire de contact sera pré-rempli avec vos réponses.
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
}: {
  options: { valeur: string; label: string }[];
  actif?: string;
  onChoisir: (valeur: string) => void;
}) {
  return (
    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
      {options.map((o) => (
        <li key={o.valeur}>
          <button
            type="button"
            onClick={() => onChoisir(o.valeur)}
            aria-pressed={actif === o.valeur}
            className={cn(
              "group flex w-full cible-tactile items-center justify-between gap-3 rounded-sm border px-4 py-3.5 text-left text-[15px] font-medium transition-all duration-200",
              actif === o.valeur
                ? "border-terre-600 bg-terre-300/30 text-ardoise-900 dark:bg-terre-700/25 dark:text-ardoise-100"
                : "border-ardoise-300/60 text-ardoise-900 hover:border-terre-500 hover:bg-white/60 dark:border-white/20 dark:text-ardoise-100 dark:hover:bg-white/[0.08]",
            )}
          >
            {o.label}
            <span
              aria-hidden="true"
              className="text-terre-600 opacity-0 transition-opacity group-hover:opacity-100"
            >
              →
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
