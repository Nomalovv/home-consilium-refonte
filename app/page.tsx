import dynamic from "next/dynamic";
import Link from "next/link";

import { Hero } from "@/components/sections/Hero";
import { Section, TitreSection } from "@/components/sections/Section";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { CarrouselRealisations } from "@/components/sections/CarrouselRealisations";
import { CitationValeurs } from "@/components/sections/CitationValeurs";
import { MethodeCondensee } from "@/components/sections/MethodeCondensee";
import { ZoneIntervention } from "@/components/sections/ZoneIntervention";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { IllustrationMaison } from "@/components/ui/Illustrations";

import {
  chiffresStructurels,
  contact,
  devis,
  entreprise,
  photos,
  zoneIntervention,
} from "@/content/entreprise";
import { accueil } from "@/content/interface";
import { services } from "@/content/services";
import { faqCles } from "@/content/faq";
import { jsonLdFaq } from "@/lib/seo";
import { asset } from "@/lib/utils";

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
        titreCourt={entreprise.accrocheCourte}
        intro={entreprise.introAccueil}
        introCourte={entreprise.introAccueilCourte}
        aside={<PanneauAccueil />}
      >
        {/*
          Mobile : un seul bouton plein + un lien texte. Deux gros boutons
          empilés pleine largeur mangeaient la moitié du premier écran.
        */}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <ButtonLink href="/contact" variante="secondaire" taille="lg">
            {devis.gratuit}
          </ButtonLink>
          <ButtonLink href="/services" variante="lien" taille="lg">
            {accueil.services.lien}
          </ButtonLink>
        </div>
        <p className="mt-4 text-[13.5px] text-ink-muted sm:text-[14px]">
          <span className="sm:hidden">{devis.sansEngagement}</span>
          <span className="hidden sm:inline">
            {devis.sansEngagement} · {contact.horairesResume}
          </span>
        </p>
      </Hero>

      <Section id="quiz" aria={accueil.quiz.titre}>
        <TitreSection
          surtitre={accueil.quiz.surtitre}
          titre={accueil.quiz.titre}
          intro={accueil.quiz.intro}
          introCourte={accueil.quiz.introCourte}
        />
        <div className="mt-6 sm:mt-8">
          <GuidedQuiz />
        </div>
      </Section>

      <Section id="services">
        <TitreSection
          surtitre={accueil.services.surtitre}
          titre={accueil.services.titre}
          intro={accueil.services.intro}
          introCourte={accueil.services.introCourte}
        />
        <ServiceGrid services={services} className="mt-7 sm:mt-10" />
        <div className="mt-6 sm:mt-8">
          <Link
            href="/services"
            className="lien-souligne cible-tactile group inline-flex items-center gap-2 font-semibold text-terre-700 dark:text-terre-300"
          >
            {accueil.services.lien}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </Link>
        </div>
      </Section>

      <CarrouselRealisations />

      <CitationValeurs />

      <MethodeCondensee />

      <ZoneIntervention />

      <Testimonials />

      <Section>
        <TitreSection surtitre={accueil.faq.surtitre} titre={accueil.faq.titre} />
        <div className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-8">
          <Accordion
            elements={faqCles.map((q) => ({
              id: q.id,
              question: q.question,
              reponse: q.reponse,
            }))}
            defaut={0}
          />
          <div className="glass glass-readable rounded-lg p-5 sm:p-6">
            <p className="text-ink-muted">{accueil.faq.relance}</p>
            <ButtonLink href="/faq" variante="glass" className="mt-4 sm:mt-5">
              {accueil.faq.lien}
            </ButtonLink>
          </div>
        </div>
      </Section>

      <CTA />
    </>
  );
}

/**
 * Panneau du hero : la photo du bâtiment dès qu'elle est fournie (sinon
 * l'illustration « maison »), puis uniquement des chiffres structurels et
 * vrais. Aucun chiffre business inventé.
 */
function PanneauAccueil() {
  return (
    <div className="glass glass-lg glass-readable overflow-hidden rounded-xl">
      {photos.batiment.src ? (
        /*
          Photo réelle du bâtiment. Format volontairement plus bas sur
          téléphone : en 4/3 pleine largeur, elle mangeait le premier écran.
          Pas de `next/image` (export statique sans optimiseur) : dimensions
          intrinsèques + `object-cover` pour éviter tout saut de mise en page.
        */
        <div className="relative aspect-[16/10] w-full sm:aspect-[4/3]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(photos.batiment.src)}
            alt={photos.batiment.alt}
            width={1200}
            height={900}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full bg-lin object-cover dark:bg-white/[0.06]"
          />
          {/* Voile chaleureux discret, dans la palette terre cuite / miel. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-terre-800/25 via-terre-700/5 to-miel-100/10"
          />
        </div>
      ) : (
        <div className="bg-gradient-to-b from-miel-100 to-terre-100 px-5 pt-5 dark:from-miel-700/15 dark:to-terre-700/15 sm:px-7 sm:pt-7">
          <IllustrationMaison className="mx-auto max-w-[300px]" />
        </div>
      )}

      <div className="p-5 sm:p-6 md:p-7">
        <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-terre-700 dark:text-terre-300 sm:text-[13px]">
          {entreprise.citation}
        </p>
        <dl className="mt-4 grid grid-cols-3 gap-3 sm:mt-5 sm:gap-4">
          {chiffresStructurels.map((c) => (
            <div key={c.libelle}>
              <dt className="sr-only">{c.libelle}</dt>
              <dd>
                <span className="block font-display text-[clamp(24px,6vw,36px)] font-semibold leading-none text-terre-700 dark:text-terre-300">
                  {c.valeur}
                </span>
                <span className="mt-1.5 block text-[12.5px] leading-snug text-ink-muted sm:text-[13px]">
                  {c.libelle}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        {/* Détails redondants avec la barre d'action mobile : masqués au format téléphone. */}
        <div className="mt-5 hidden space-y-2 border-t pt-4 text-[14.5px] text-ink-muted sm:block">
          <p>
            <span className="font-medium text-ink">
              {accueil.panneau.labelDevis}
            </span>{" "}
            — {devis.delai}
          </p>
          <p>
            <span className="font-medium text-ink">
              {accueil.panneau.labelContact}
            </span>{" "}
            —{" "}
            <a href={contact.telephoneLien} className="lien-souligne">
              {contact.telephone}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
