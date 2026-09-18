import { ButtonLink } from "@/components/ui/Button";
import { IllustrationArtisans } from "@/components/ui/Illustrations";
import { contact } from "@/content/entreprise";
import { ctaGlobal } from "@/content/interface";

type Props = {
  titre?: string;
  texte?: string;
  /** Version raccourcie du texte, affichée en dessous de `sm`. */
  texteCourt?: string;
  /** Lien du bouton principal, éventuellement pré-rempli (?sujet=...). */
  href?: string;
  libelle?: string;
  /** Version raccourcie du libellé du bouton, en dessous de `sm`. */
  libelleCourt?: string;
};

/**
 * Bloc d'appel à l'action de fin de page.
 * Sur mobile : un seul bouton plein, le téléphone devient un lien texte —
 * deux gros boutons empilés occupaient un tiers de l'écran pour rien.
 */
export function CTA({
  titre = ctaGlobal.titre,
  texte = ctaGlobal.texte,
  texteCourt = ctaGlobal.texteCourt,
  href = ctaGlobal.href,
  libelle = ctaGlobal.libelle,
  libelleCourt = ctaGlobal.libelleCourt,
}: Props) {
  return (
    <section className="relative py-9 sm:py-12 md:py-20 lg:py-24">
      <div className="conteneur">
        <div className="glass glass-lg glass-readable relative overflow-hidden rounded-xl px-5 py-9 text-center sm:px-8 sm:py-12 md:px-14 md:py-16">
          {/* Lueur chaude en fond du bloc */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-terre-300/35 blur-3xl dark:bg-terre-700/25"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-miel-300/30 blur-3xl dark:bg-miel-700/20"
          />

          <div className="relative">
            <IllustrationArtisans
              decoratif
              className="mx-auto mb-5 w-[132px] sm:mb-6 sm:w-[168px]"
            />
            <h2 className="mx-auto max-w-2xl text-balance font-display text-h2 font-semibold text-ardoise-900 dark:text-ardoise-100">
              {titre}
            </h2>
            <p className="mx-auto mt-3 max-w-lisible text-corps-lg text-ink-muted sm:mt-4">
              <span className="sm:hidden">{texteCourt}</span>
              <span className="hidden sm:inline">{texte}</span>
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <ButtonLink href={href} variante="secondaire" taille="lg">
                <span className="sm:hidden">{libelleCourt}</span>
                <span className="hidden sm:inline">{libelle}</span>
              </ButtonLink>

              {/* Mobile : lien texte. Tablette et plus : bouton verre. */}
              <p className="text-[14.5px] text-ink-muted sm:hidden">
                {ctaGlobal.libelleAppel}{" "}
                <a
                  href={contact.telephoneLien}
                  className="lien-souligne inline-block py-1.5 font-semibold text-terre-700 dark:text-terre-300"
                >
                  {contact.telephone}
                </a>
              </p>
              <ButtonLink
                href={contact.telephoneLien}
                variante="glass"
                taille="lg"
                className="hidden sm:inline-flex"
              >
                {contact.telephone}
              </ButtonLink>
            </div>

            <p className="mt-5 text-[13.5px] text-ink-muted sm:text-[14px]">
              <span className="sm:hidden">{ctaGlobal.reassuranceCourte}</span>
              <span className="hidden sm:inline">{ctaGlobal.reassurance}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
