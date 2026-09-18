import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { IllustrationCotesEtToits } from "@/components/ui/Illustrations";
import {
  contact,
  entreprise,
  reseauxSociaux,
  zoneIntervention,
} from "@/content/entreprise";
import { footer } from "@/content/interface";
import { services } from "@/content/services";
import { liensFooterLegal, navigationPrincipale } from "@/lib/navigation";

export function Footer() {
  const annee = new Date().getFullYear();

  return (
    <footer className="relative mt-16 bg-ardoise-900 text-ardoise-100 sm:mt-20 md:mt-24">
      {/* Liseré de toits : la transition douce entre la page et le pied */}
      <div aria-hidden="true" className="absolute inset-x-0 -top-px">
        <IllustrationCotesEtToits
          decoratif
          className="h-8 w-full rotate-180 opacity-25 sm:h-10"
        />
      </div>

      {/* Réserve la place de la barre d'action mobile */}
      <div className="conteneur marge-barre-mobile py-10 sm:py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-4">
          <div>
            <Logo teinte="clair" tailleSymbole="h-10 w-10" />
            <p className="mt-4 max-w-xs text-[14.5px] leading-relaxed text-ardoise-100/85 sm:text-[15px]">
              {entreprise.baseline}
            </p>
            <p className="mt-3 text-[13.5px] text-ardoise-100/70 sm:text-[14px]">
              {entreprise.definition}
            </p>
          </div>

          <nav aria-labelledby="footer-services">
            <h2
              id="footer-services"
              className="font-display text-[14px] font-semibold uppercase tracking-[0.14em] text-terre-300 sm:text-[15px]"
            >
              {footer.colonneServices}
            </h2>
            <ul className="mt-3 space-y-0.5 sm:mt-4">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex cible-tactile items-center py-1.5 text-[14.5px] text-ardoise-100/85 transition-colors hover:text-white sm:text-[15px]"
                  >
                    {s.titre}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-nav">
            <h2
              id="footer-nav"
              className="font-display text-[14px] font-semibold uppercase tracking-[0.14em] text-terre-300 sm:text-[15px]"
            >
              {footer.colonneNavigation}
            </h2>
            <ul className="mt-3 space-y-0.5 sm:mt-4">
              {[
                ...navigationPrincipale,
                { href: "/contact", label: footer.labelContact },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex cible-tactile items-center py-1.5 text-[14.5px] text-ardoise-100/85 transition-colors hover:text-white sm:text-[15px]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-[14px] font-semibold uppercase tracking-[0.14em] text-terre-300 sm:text-[15px]">
              {footer.colonneContact}
            </h2>
            <ul className="mt-3 space-y-1 text-[15px] sm:mt-4">
              <li>
                <a
                  href={contact.telephoneLien}
                  className="inline-flex cible-tactile items-center py-1.5 font-semibold text-white transition-colors hover:text-terre-300"
                >
                  {contact.telephone}
                </a>
              </li>
              <li>
                <a
                  href={contact.emailLien}
                  className="inline-flex cible-tactile items-center break-all py-1.5 text-[14.5px] text-ardoise-100/85 transition-colors hover:text-white"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
            <ul className="mt-3 space-y-1 text-[13.5px] text-ardoise-100/70 sm:text-[14px]">
              {contact.horaires.map((h) => (
                <li key={h.jours}>
                  <span className="text-ardoise-100/90">{h.jours}</span> ·{" "}
                  {h.heures}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13.5px] text-ardoise-100/75 sm:text-[14px]">
              {zoneIntervention.titreCourt}
            </p>
            <p className="mt-1 text-[13.5px] text-ardoise-100/60 sm:text-[14px]">
              {footer.labelAdresse} : {entreprise.adresse}
            </p>

            {/* Aucun réseau social réel : rien n'est affiché plutôt que des liens morts. */}
            {reseauxSociaux.length > 0 && (
              <ul className="mt-4 flex gap-2">
                {reseauxSociaux.map((r) => (
                  <li key={r.url}>
                    <a href={r.url} className="cible-tactile inline-flex p-2">
                      {r.nom}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13.5px] text-ardoise-100/65 sm:text-[14px] md:flex-row md:items-center md:justify-between">
          <p>
            © {annee} {entreprise.nom} — {entreprise.activite}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {liensFooterLegal.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex cible-tactile items-center py-1 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
