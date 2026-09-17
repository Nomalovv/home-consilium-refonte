import { Hero } from "@/components/sections/Hero";
import { Section, TitreSection } from "@/components/sections/Section";
import { CTA } from "@/components/sections/CTA";
import { ZoneIntervention } from "@/components/sections/ZoneIntervention";
import { TraitsMarque } from "@/components/sections/TraitsMarque";
import { Breadcrumb, maillesDepuisChemin } from "@/components/layout/Breadcrumb";
import { LogoSymbole } from "@/components/ui/Logo";
import { benefices, entreprise, valeurs, zoneIntervention } from "@/content/entreprise";
import { construireMetadata } from "@/lib/seo";

export const metadata = construireMetadata({
  titre: "À propos",
  description:
    "Home Consilium, courtier en travaux dans le Calvados : le trait d'union entre votre projet et les bons artisans. Proximité locale, transparence totale, un seul interlocuteur.",
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

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="glass glass-readable rounded-xl p-8 text-center">
            <LogoSymbole
              className="mx-auto h-24 w-24"
              titre="Symbole Home Consilium"
            />
            <p className="mt-6 text-[14.5px] leading-relaxed text-ink-muted">
              Deux formes disjointes, reliées par un trait franc : votre projet
              d&apos;un côté, les bonnes entreprises de l&apos;autre, et nous
              entre les deux.
            </p>
          </div>

          <div className="max-w-lisible space-y-5 text-corps-lg text-ink-muted">
            <p>
              Home Consilium est un courtier en travaux : l&apos;intermédiaire
              entre les particuliers et les artisans et entreprises du bâtiment.
            </p>
            <p>
              Notre valeur n&apos;est pas d&apos;avoir le plus gros carnet
              d&apos;adresses, mais de connaître le tissu artisanal du Calvados
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

      <Section>
        <TitreSection
          surtitre="Qui nous sommes"
          titre="Quatre mots, et rien à cacher derrière"
        />
        <div className="mt-10">
          <TraitsMarque />
        </div>
      </Section>

      <Section>
        <TitreSection surtitre="Ce que ça change" titre="Nos engagements au quotidien" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {valeurs.map((v) => (
            <li key={v.titre} className="rounded-lg border p-6">
              <h3 className="font-display text-[18px] font-semibold text-ardoise-900 dark:text-ardoise-100">
                {v.titre}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                {v.texte}
              </p>
            </li>
          ))}
        </ul>
        <ul className="mt-5 grid gap-5 sm:grid-cols-3">
          {benefices.map((b) => (
            <li key={b.titre} className="glass glass-readable rounded-lg p-6">
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
