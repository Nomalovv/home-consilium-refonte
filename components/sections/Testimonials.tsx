import { temoignages } from "@/content/entreprise";
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
        surtitre="Avis clients"
        titre={temoignages.titre}
        centre
        className="mx-auto"
      />
      <div className="mx-auto mt-10 max-w-2xl">
        <div className="glass glass-readable rounded-lg px-6 py-10 text-center md:px-10">
          <span
            aria-hidden="true"
            className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-ardoise-100 text-ardoise-700 dark:bg-white/10 dark:text-ardoise-100"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M4.5 5.5h15v10h-9l-4.5 3.5v-3.5h-1.5z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className="mx-auto max-w-lisible text-corps-lg text-ink-muted">
            {temoignages.etatVide}
          </p>
          <p className="mt-6 text-[14px] text-ink-muted">
            Fiche Google Business : {temoignages.lienGoogle}
          </p>
          <div className="mt-6">
            <ButtonLink href="/contact" variante="glass">
              Devenir notre prochain client
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
