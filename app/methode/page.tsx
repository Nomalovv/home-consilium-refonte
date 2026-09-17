import dynamic from "next/dynamic";

import { Hero } from "@/components/sections/Hero";
import { Section, TitreSection } from "@/components/sections/Section";
import { CTA } from "@/components/sections/CTA";
import { Breadcrumb, maillesDepuisChemin } from "@/components/layout/Breadcrumb";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { Badge } from "@/components/ui/Badge";

import { methode } from "@/content/methode";
import { devis, zoneIntervention } from "@/content/entreprise";
import { construireMetadata } from "@/lib/seo";

const ProcessTimeline = dynamic(
  () => import("@/components/interactive/ProcessTimeline"),
);

export const metadata = construireMetadata({
  titre: "Notre méthode",
  description:
    "Quatre étapes, zéro zone d'ombre : interlocuteur unique, sélection rigoureuse d'artisans vérifiés, comparaison et négociation des devis, suivi de chantier jusqu'à la réception.",
  chemin: "/methode",
});

export default function MethodePage() {
  return (
    <>
      <ReadingProgress />

      <Hero
        compact
        badge={zoneIntervention.badge}
        surtitre="Méthode"
        titre={methode.titre}
        intro={methode.intro}
      />

      <Section className="pt-0">
        <Breadcrumb mailles={maillesDepuisChemin("/methode")} />
        <ProcessTimeline />
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass glass-readable rounded-lg p-6 md:p-8">
            <Badge ton="terre" className="mb-4">
              Vérification
            </Badge>
            <h2 className="font-display text-h3 font-semibold text-ardoise-900 dark:text-ardoise-100">
              {methode.verification.titre}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
              {methode.verification.intro}
            </p>
            <ul className="mt-5 space-y-2.5 border-t pt-5">
              {methode.verification.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] text-ink">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-etat-succes"
                  >
                    <path
                      d="m4 10.5 4 4 8-9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass glass-readable rounded-lg p-6 md:p-8">
            <Badge ton="terre" className="mb-4">
              Délais
            </Badge>
            <h2 className="font-display text-h3 font-semibold text-ardoise-900 dark:text-ardoise-100">
              {methode.delais.titre}
            </h2>
            <ol className="mt-5 space-y-4">
              {methode.delais.points.map((p, i) => (
                <li key={p} className="flex items-start gap-3.5 text-[15px] text-ink">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-terre-500 text-[12px] font-semibold text-terre-700 dark:text-terre-300"
                  >
                    {i + 1}
                  </span>
                  {p}
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t pt-5 text-[14.5px] text-ink-muted">
              {devis.gratuit} · Devis transmis {devis.delai}.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <TitreSection
          titre="Vous voyez les devis, vous décidez"
          intro="La transparence n'est pas un argument : c'est le fonctionnement. Chaque devis vous est présenté poste par poste, et le choix final vous appartient."
          centre
          className="mx-auto"
        />
      </Section>

      <CTA />
    </>
  );
}
