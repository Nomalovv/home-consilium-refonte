import { ButtonLink } from "@/components/ui/Button";
import { contact, devis } from "@/content/entreprise";

type Props = {
  titre?: string;
  texte?: string;
  /** Lien du bouton principal, éventuellement pré-rempli (?sujet=...). */
  href?: string;
  libelle?: string;
};

export function CTA({
  titre = "Parlons de votre projet",
  texte = "Premier échange sans engagement, devis gratuit. Nous vous dirons franchement si nous pouvons vous accompagner.",
  href = "/contact",
  libelle = "Demander un devis gratuit",
}: Props) {
  return (
    <section className="relative py-12 md:py-24">
      <div className="conteneur">
        <div className="glass glass-lg glass-readable relative overflow-hidden rounded-xl px-6 py-10 text-center md:px-14 md:py-16">
          <h2 className="mx-auto max-w-2xl font-display text-h2 font-semibold text-ardoise-900 dark:text-ardoise-100">
            {titre}
          </h2>
          <p className="mx-auto mt-4 max-w-lisible text-corps-lg text-ink-muted">
            {texte}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={href} variante="secondaire" taille="lg">
              {libelle}
            </ButtonLink>
            <ButtonLink href={contact.telephoneLien} variante="glass" taille="lg">
              {contact.telephone}
            </ButtonLink>
          </div>
          <p className="mt-5 text-[14px] text-ink-muted">
            {devis.gratuit} · {devis.sansEngagement} · {contact.horairesResume}
          </p>
        </div>
      </div>
    </section>
  );
}
