import dynamic from "next/dynamic";
import { Suspense } from "react";

import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/sections/Section";
import { Breadcrumb, maillesDepuisChemin } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import {
  contact,
  devis,
  entreprise,
  zoneIntervention,
} from "@/content/entreprise";
import { methode } from "@/content/methode";
import { construireMetadata } from "@/lib/seo";

const MultiStepForm = dynamic(
  () => import("@/components/interactive/MultiStepForm"),
);

export const metadata = construireMetadata({
  titre: "Contact & devis gratuit",
  description:
    "Contactez Home Consilium, courtier en travaux dans le Calvados : devis gratuit, premier échange sans engagement. Téléphone 07 61 66 09 80, contact@homeconsilium.fr.",
  chemin: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Hero
        compact
        badge={devis.gratuit}
        surtitre="Contact"
        titre="Parlons de votre projet"
        intro={`${devis.sansEngagement}. Décrivez-nous vos travaux : nous identifions les entreprises adaptées et vous transmettons des devis comparables ${devis.delai}.`}
      />

      <Section className="pt-0">
        <Breadcrumb mailles={maillesDepuisChemin("/contact")} />

        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
          <Suspense
            fallback={
              <div className="glass glass-lg rounded-xl p-10 text-center text-ink-muted">
                Chargement du formulaire…
              </div>
            }
          >
            <MultiStepForm />
          </Suspense>

          <aside className="space-y-5">
            <div className="glass glass-readable rounded-lg p-6">
              <h2 className="font-display text-h3 font-semibold text-ardoise-900 dark:text-ardoise-100">
                Nous joindre directement
              </h2>
              <ul className="mt-5 space-y-4">
                <li>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Téléphone
                  </p>
                  <a
                    href={contact.telephoneLien}
                    className="lien-souligne cible-tactile mt-1 inline-flex items-center text-[19px] font-semibold text-ardoise-900 dark:text-ardoise-100"
                  >
                    {contact.telephone}
                  </a>
                </li>
                <li>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Email
                  </p>
                  <a
                    href={contact.emailLien}
                    className="lien-souligne cible-tactile mt-1 inline-flex break-all text-[16px] font-medium text-ardoise-900 dark:text-ardoise-100"
                  >
                    {contact.email}
                  </a>
                </li>
                <li>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Adresse
                  </p>
                  <p className="mt-1 text-[15px] text-ink-muted">
                    {entreprise.adresse}
                  </p>
                </li>
              </ul>
            </div>

            <div className="glass glass-readable rounded-lg p-6">
              <h2 className="font-display text-h3 font-semibold text-ardoise-900 dark:text-ardoise-100">
                Horaires
              </h2>
              <dl className="mt-4 space-y-2.5">
                {contact.horaires.map((h) => (
                  <div
                    key={h.jours}
                    className="flex items-baseline justify-between gap-4 border-b pb-2.5 text-[15px] last:border-0 last:pb-0"
                  >
                    <dt className="text-ink">{h.jours}</dt>
                    <dd className="font-medium text-ardoise-900 dark:text-ardoise-100">
                      {h.heures}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-lg border p-6">
              <Badge ton="terre" className="mb-4">
                {zoneIntervention.badge}
              </Badge>
              <h2 className="font-display text-[17px] font-semibold text-ardoise-900 dark:text-ardoise-100">
                {zoneIntervention.titre}
              </h2>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">
                {zoneIntervention.limiteDepartement}
              </p>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="font-display text-[17px] font-semibold text-ardoise-900 dark:text-ardoise-100">
                Ce qui se passe ensuite
              </h2>
              <ol className="mt-4 space-y-3">
                {methode.delais.points.map((p, i) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-[14.5px] text-ink-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-terre-500 text-[11px] font-semibold text-terre-700 dark:text-terre-300"
                    >
                      {i + 1}
                    </span>
                    {p}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
