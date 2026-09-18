import { temoignages } from "@/content/entreprise";
import { sectionAvis } from "@/content/interface";
import { Section, TitreSection } from "@/components/sections/Section";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Aucun avis client réel n'est publié à ce jour : la section affiche un état
 * vide honnête plutôt que des témoignages d'exemple.
 */
export function Testimonials() {
  return (
    <Section>
      <TitreSection
        surtitre={sectionAvis.surtitre}
        titre={temoignages.titre}
        centre
        className="mx-auto"
      />
      <div className="mx-auto mt-7 max-w-2xl sm:mt-10">
        <div className="glass glass-readable rounded-lg px-5 py-8 text-center sm:px-6 sm:py-10 md:px-10">
          <span
            aria-hidden="true"
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-miel-200 text-miel-800 dark:bg-miel-700/25 dark:text-miel-300 sm:mb-5"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M4.5 5.5h15v10h-9l-4.5 3.5v-3.5h-1.5z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className="mx-auto max-w-lisible text-corps-lg text-ink-muted">
            {temoignages.etatVide}
          </p>
          <p className="mt-5 text-[13.5px] text-ink-muted sm:text-[14px]">
            {sectionAvis.mentionFicheGoogle} : {temoignages.lienGoogle}
          </p>
          <div className="mt-5 sm:mt-6">
            <ButtonLink href="/contact" variante="glass">
              {sectionAvis.cta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
