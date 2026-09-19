import { Hero } from "@/components/sections/Hero";
import { Section, TitreSection } from "@/components/sections/Section";
import { CTA } from "@/components/sections/CTA";
import { ZoneIntervention } from "@/components/sections/ZoneIntervention";
import { TraitsMarque } from "@/components/sections/TraitsMarque";
import { Breadcrumb, maillesDepuisChemin } from "@/components/layout/Breadcrumb";
import { LogoSymbole } from "@/components/ui/Logo";
import {
  benefices,
  entreprise,
  photos,
  sectionDirigeant,
  valeurs,
  zoneIntervention,
} from "@/content/entreprise";
import { construireMetadata } from "@/lib/seo";
import { asset } from "@/lib/utils";

export const metadata = construireMetadata({
  titre: "À propos",
  description:
    "Home Consilium, courtier en travaux en Normandie : le trait d'union entre votre projet et les bons artisans. Proximité locale, transparence totale, un seul interlocuteur.",
  chemin: "/a-propos",
});

export default function AProposPage() {
  return (
    <>
      <Hero
        compact
        badge={zoneIntervention.badge}
        surtitre="À propos"
        titre={entreprise.citation}
        intro={`${entreprise.definition} ${entreprise.baseline}.`}
      />

      <Section className="pt-0">
        <Breadcrumb mailles={maillesDepuisChemin("/a-propos")} />

        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-10">
          <div className="glass glass-readable rounded-xl p-6 text-center sm:p-8">
            <LogoSymbole
              className="mx-auto h-20 w-20 sm:h-24 sm:w-24"
              titre="Symbole Home Consilium"
            />
            <p className="mt-6 text-[14.5px] leading-relaxed text-ink-muted">
              Deux formes disjointes, reliées par un trait franc : votre projet
              d&apos;un côté, les bonnes entreprises de l&apos;autre, et nous
              entre les deux.
            </p>
          </div>

          <div className="max-w-lisible space-y-4 text-corps-lg text-ink-muted sm:space-y-5">
            <p>
              Home Consilium est un courtier en travaux : l&apos;intermédiaire
              entre les particuliers et les artisans et entreprises du bâtiment.
            </p>
            <p>
              Notre valeur n&apos;est pas d&apos;avoir le plus gros carnet
              d&apos;adresses, mais de connaître le tissu artisanal normand
              assez bien pour vous présenter{" "}
              <strong className="font-semibold text-ink">
                les bonnes entreprises, pas les plus visibles
              </strong>
              .
            </p>
            <p>
              Et parce que la transparence n&apos;a de sens que si elle va
              jusqu&apos;au bout : vous voyez les devis, vous décidez. Si nous ne
              sommes pas les mieux placés pour votre projet, nous vous le dirons
              franchement.
            </p>
          </div>
        </div>
      </Section>

      {photos.dirigeant.src && <BlocDirigeant />}

      <Section>
        <TitreSection
          surtitre="Qui nous sommes"
          titre="Quatre mots, et rien à cacher derrière"
        />
        <div className="mt-7 sm:mt-10">
          <TraitsMarque />
        </div>
      </Section>

      <Section>
        <TitreSection surtitre="Ce que ça change" titre="Nos engagements au quotidien" />
        <ul className="mt-7 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5">
          {valeurs.map((v) => (
            <li key={v.titre} className="surface-chaude rounded-lg p-5 sm:p-6">
              <h3 className="font-display text-[18px] font-semibold text-ardoise-900 dark:text-ardoise-100">
                {v.titre}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                {v.texte}
              </p>
            </li>
          ))}
        </ul>
        <ul className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-3 sm:gap-5">
          {benefices.map((b) => (
            <li key={b.titre} className="glass glass-readable rounded-lg p-5 sm:p-6">
              <h3 className="font-display text-[17px] font-semibold text-terre-700 dark:text-terre-300">
                {b.titre}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">
                {b.texte}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <ZoneIntervention />

      <CTA />
    </>
  );
}

/**
 * Portrait du dirigeant et ce que l'entreprise a réellement communiqué à son
 * sujet : un prénom, une durée d'expérience, et son rôle — rien d'autre.
 * Portrait compact et centré sur téléphone, en vis-à-vis du texte à partir de
 * la tablette. Le bloc disparaît si aucune photo n'est fournie.
 */
function BlocDirigeant() {
  const portrait = photos.dirigeant;

  return (
    <Section aria={sectionDirigeant.titre}>
      <div className="glass glass-readable grid gap-6 rounded-xl p-5 sm:p-7 md:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] md:items-center md:gap-10 md:p-9">
        <div className="mx-auto w-full max-w-[210px] sm:max-w-[240px] md:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-lin shadow-chaud ring-1 ring-white/70 dark:bg-white/[0.06] dark:ring-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(portrait.src)}
              alt={portrait.alt}
              width={900}
              height={1125}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[50%_12%]"
            />
          </div>
        </div>

        <div>
          <p className="mb-2.5 flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-terre-700 dark:text-terre-300 sm:text-[13px]">
            <span aria-hidden="true" className="h-px w-6 shrink-0 bg-terre-500" />
            {sectionDirigeant.surtitre}
          </p>
          <h2 className="text-balance font-display text-h2 font-semibold text-ardoise-900 dark:text-ardoise-100">
            {sectionDirigeant.titre}
          </h2>
          <p className="mt-3 text-[14.5px] font-semibold text-terre-700 dark:text-terre-300">
            {portrait.experience}
          </p>
          <div className="mt-4 max-w-lisible space-y-3 text-ink-muted sm:mt-5 sm:space-y-4">
            {sectionDirigeant.paragraphes.map((texte, i) => (
              <p key={texte}>
                <span className="sm:hidden">
                  {sectionDirigeant.paragraphesCourts[i] ?? texte}
                </span>
                <span className="hidden sm:inline">{texte}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
