import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Hero } from "@/components/sections/Hero";
import { Section, TitreSection } from "@/components/sections/Section";
import { CTA } from "@/components/sections/CTA";
import { Breadcrumb, maillesDepuisChemin } from "@/components/layout/Breadcrumb";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

import {
  CTA_SERVICE,
  getService,
  getServices,
  services,
} from "@/content/services";
import { methode } from "@/content/methode";
import { devis, zoneIntervention } from "@/content/entreprise";
import { construireMetadata, jsonLdFaq, jsonLdFilAriane } from "@/lib/seo";

const EstCePourMoi = dynamic(
  () => import("@/components/interactive/EstCePourMoi"),
);

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return construireMetadata({
    titre: `${service.titre} dans le Calvados`,
    description: service.metaDescription,
    chemin: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const connexes = getServices(service.connexes);
  const chemin = `/services/${service.slug}`;
  const mailles = maillesDepuisChemin(chemin);

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFaq(service.faq)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFilAriane(mailles)),
        }}
      />

      <Hero
        compact
        badge={zoneIntervention.badge}
        surtitre="Domaine de service"
        titre={service.titre}
        intro={service.description}
      >
        <ul className="flex flex-wrap gap-2">
          {service.sousServices.map((ss) => (
            <li key={ss.titre}>
              <Badge ton="glass">{ss.titre}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href={`/contact?sujet=${service.slug}`}
            variante="secondaire"
            taille="lg"
          >
            {CTA_SERVICE}
          </ButtonLink>
          <ButtonLink href="/methode" variante="glass" taille="lg">
            Voir notre méthode
          </ButtonLink>
        </div>
      </Hero>

      <Section className="pt-0">
        <Breadcrumb mailles={mailles} />
        <EstCePourMoi
          affirmations={service.estCePourMoi}
          titreService={service.titre}
          slug={service.slug}
        />
      </Section>

      <Section>
        <TitreSection
          surtitre="Déroulé"
          titre={`Les étapes de votre projet « ${service.titre} »`}
          intro={methode.intro}
        />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {methode.etapes.map((etape) => (
            <li key={etape.numero} className="glass glass-readable rounded-lg p-6">
              <span
                aria-hidden="true"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-terre-600 font-display text-[14px] font-semibold text-white"
              >
                {etape.numero}
              </span>
              <h3 className="mt-4 font-display text-[18px] font-semibold text-ardoise-900 dark:text-ardoise-100">
                {etape.titre}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">
                {etape.resume}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-[14.5px] text-ink-muted">
          Devis transmis {devis.delai}. {devis.sansEngagement.toLowerCase()}.
        </p>
      </Section>

      <Section>
        <TitreSection surtitre="À voir aussi" titre="Services connexes" />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {connexes.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/services/${c.slug}`}
                className="group glass glass-readable flex h-full flex-col rounded-lg p-6 transition-all duration-300 ease-doux hover:-translate-y-1 hover:shadow-lift"
              >
                <h3 className="font-display text-h3 font-semibold text-ardoise-900 dark:text-ardoise-100">
                  {c.titre}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-muted">
                  {c.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-terre-700 dark:text-terre-300">
                  Découvrir
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <TitreSection surtitre="FAQ" titre={`Questions fréquentes — ${service.titre}`} />
        <div className="mt-8 max-w-3xl">
          <Accordion
            defaut={0}
            elements={service.faq.map((q, i) => ({
              id: `${service.slug}-${i}`,
              question: q.question,
              reponse: q.reponse,
            }))}
          />
          <Link
            href="/faq"
            className="lien-souligne cible-tactile mt-6 inline-flex items-center gap-2 font-medium text-terre-700 dark:text-terre-300"
          >
            Toutes les questions fréquentes
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>

      <CTA
        titre={`Parler de votre projet « ${service.titre} »`}
        href={`/contact?sujet=${service.slug}`}
        libelle={CTA_SERVICE}
      />
    </>
  );
}
