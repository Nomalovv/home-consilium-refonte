import dynamic from "next/dynamic";
import Link from "next/link";

import { Hero } from "@/components/sections/Hero";
import { Section, TitreSection } from "@/components/sections/Section";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { CitationValeurs } from "@/components/sections/CitationValeurs";
import { MethodeCondensee } from "@/components/sections/MethodeCondensee";
import { ZoneIntervention } from "@/components/sections/ZoneIntervention";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";

import {
  chiffresStructurels,
  contact,
  devis,
  entreprise,
  zoneIntervention,
} from "@/content/entreprise";
import { services } from "@/content/services";
import { faqCles } from "@/content/faq";
import { jsonLdFaq } from "@/lib/seo";

// Composant interactif chargé à la demande : il n'est pas nécessaire au rendu initial.
const GuidedQuiz = dynamic(() => import("@/components/interactive/GuidedQuiz"), {
  loading: () => (
    <div className="glass glass-lg rounded-xl p-10 text-center text-ink-muted">
      Chargement du questionnaire…
    </div>
  ),
});

export default function Accueil() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdFaq(
              faqCles.map((q) => ({ question: q.question, reponse: q.reponse })),
            ),
          ),
        }}
      />

      <Hero
        badge={zoneIntervention.badge}
        surtitre={entreprise.sousTitre}
        titre={entreprise.accroche}
        intro={entreprise.introAccueil}
        aside={<PanneauStats />}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href="/contact" variante="secondaire" taille="lg">
            {devis.gratuit}
          </ButtonLink>
          <ButtonLink href="/services" variante="glass" taille="lg">
            Découvrir nos services
          </ButtonLink>
        </div>
        <p className="mt-4 text-[14px] text-ink-muted">
          {devis.sansEngagement} · {contact.horairesResume}
        </p>
      </Hero>

      <Section id="quiz" aria="Questionnaire guidé">
        <TitreSection
          surtitre="En une minute"
          titre="Quel est votre besoin ?"
          intro="Trois questions pour identifier le domaine concerné et préparer votre demande. Aucune donnée n'est enregistrée à cette étape."
        />
        <div className="mt-8">
          <GuidedQuiz />
        </div>
      </Section>

      <Section id="services">
        <TitreSection
          surtitre="Nos domaines"
          titre="Cinq domaines, un seul interlocuteur"
          intro="Du chantier complet au lot technique, nous sélectionnons les entreprises adaptées et coordonnons leur intervention."
        />
        <ServiceGrid services={services} className="mt-10" />
        <div className="mt-8">
          <Link
            href="/services"
            className="lien-souligne cible-tactile inline-flex items-center gap-2 font-medium text-terre-700 dark:text-terre-300"
          >
            Voir tous les services
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>

      <CitationValeurs />

      <MethodeCondensee />

      <ZoneIntervention />

      <Testimonials />

      <Section>
        <TitreSection surtitre="FAQ" titre="Les questions qui reviennent le plus" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <Accordion
            elements={faqCles.map((q) => ({
              id: q.id,
              question: q.question,
              reponse: q.reponse,
            }))}
            defaut={0}
          />
          <div className="glass glass-readable rounded-lg p-6">
            <p className="text-ink-muted">
              D&apos;autres questions sur les délais, la zone d&apos;intervention ou
              la sélection des artisans ?
            </p>
            <ButtonLink href="/faq" variante="glass" className="mt-5">
              Consulter la FAQ complète
            </ButtonLink>
          </div>
        </div>
      </Section>

      <CTA />
    </>
  );
}

/** Panneau glass du hero : uniquement des chiffres structurels et vrais. */
function PanneauStats() {
  return (
    <div className="glass glass-lg glass-readable rounded-xl p-6 md:p-8">
      <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-terre-700 dark:text-terre-300">
        {entreprise.citation}
      </p>
      <dl className="mt-6 grid grid-cols-3 gap-4">
        {chiffresStructurels.map((c) => (
          <div key={c.libelle}>
            <dt className="sr-only">{c.libelle}</dt>
            <dd>
              <span className="block font-display text-[clamp(26px,4vw,38px)] font-semibold leading-none text-ardoise-900 dark:text-ardoise-100">
                {c.valeur}
              </span>
              <span className="mt-2 block text-[13px] leading-snug text-ink-muted">
                {c.libelle}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 space-y-2 border-t pt-5 text-[14.5px] text-ink-muted">
        <p>
          <span className="font-medium text-ink">Devis</span> — {devis.delai}
        </p>
        <p>
          <span className="font-medium text-ink">Contact</span> —{" "}
          <a href={contact.telephoneLien} className="lien-souligne">
            {contact.telephone}
          </a>
        </p>
      </div>
    </div>
  );
}
