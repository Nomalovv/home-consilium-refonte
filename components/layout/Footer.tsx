import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import {
  contact,
  entreprise,
  reseauxSociaux,
  zoneIntervention,
} from "@/content/entreprise";
import { services } from "@/content/services";
import { liensFooterLegal, navigationPrincipale } from "@/lib/navigation";

export function Footer() {
  const annee = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t bg-ardoise-900 text-ardoise-100">
      <div className="conteneur py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo teinte="clair" tailleSymbole="h-10 w-10" />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ardoise-100/80">
              {entreprise.baseline}
            </p>
            <p className="mt-3 text-[14px] text-ardoise-100/70">
              {entreprise.definition}
            </p>
          </div>

          <nav aria-labelledby="footer-services">
            <h2
              id="footer-services"
              className="font-display text-[15px] font-semibold uppercase tracking-[0.12em] text-ardoise-300"
            >
              Services
            </h2>
            <ul className="mt-4 space-y-1">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex cible-tactile items-center py-1.5 text-[15px] text-ardoise-100/85 transition-colors hover:text-white"
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
              className="font-display text-[15px] font-semibold uppercase tracking-[0.12em] text-ardoise-300"
            >
              Navigation
            </h2>
            <ul className="mt-4 space-y-1">
              {[...navigationPrincipale, { href: "/contact", label: "Contact" }].map(
                (l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="inline-flex cible-tactile items-center py-1.5 text-[15px] text-ardoise-100/85 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-[15px] font-semibold uppercase tracking-[0.12em] text-ardoise-300">
              Contact
            </h2>
            <ul className="mt-4 space-y-2 text-[15px]">
              <li>
                <a
                  href={contact.telephoneLien}
                  className="inline-flex cible-tactile items-center py-1.5 font-medium text-white transition-colors hover:text-terre-300"
                >
                  {contact.telephone}
                </a>
              </li>
              <li>
                <a
                  href={contact.emailLien}
                  className="inline-flex cible-tactile items-center break-all py-1.5 text-ardoise-100/85 transition-colors hover:text-white"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
            <ul className="mt-4 space-y-1 text-[14px] text-ardoise-100/70">
              {contact.horaires.map((h) => (
                <li key={h.jours}>
                  <span className="text-ardoise-100/90">{h.jours}</span> · {h.heures}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[14px] text-ardoise-100/70">
              {zoneIntervention.titre}
            </p>
            <p className="mt-1 text-[14px] text-ardoise-100/60">
              Adresse : {entreprise.adresse}
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

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-[14px] text-ardoise-100/65 md:flex-row md:items-center md:justify-between">
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
