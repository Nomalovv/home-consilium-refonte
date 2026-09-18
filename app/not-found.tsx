import Link from "next/link";
import dynamic from "next/dynamic";
import { LogoSymbole } from "@/components/ui/Logo";
import { Blobs } from "@/components/ui/Blobs";
import { ButtonLink } from "@/components/ui/Button";

const FaqSearch = dynamic(() => import("@/components/interactive/FaqSearch"));

const RACCOURCIS = [
  {
    href: "/services",
    titre: "Services",
    texte: "Les cinq domaines que nous coordonnons.",
  },
  {
    href: "/methode",
    titre: "Méthode",
    texte: "Quatre étapes, zéro zone d'ombre.",
  },
  {
    href: "/contact",
    titre: "Contact",
    texte: "Devis gratuit, premier échange sans engagement.",
  },
];

export default function NotFound() {
  return (
    <div className="marge-barre-mobile relative overflow-hidden pb-16 pt-24 sm:pt-32 md:pb-24 md:pt-44">
      <Blobs variante="hero" />
      <div className="conteneur">
        <div className="mx-auto max-w-3xl text-center">
          <LogoSymbole
            className="mx-auto h-24 w-24 sm:h-28 sm:w-28 md:h-36 md:w-36"
            titre="Home Consilium"
          />
          <p className="mt-8 text-[13px] font-semibold uppercase tracking-[0.16em] text-terre-700 dark:text-terre-300">
            Erreur 404
          </p>
          <h1 className="mt-3 font-display text-h1 font-semibold text-ardoise-900 dark:text-ardoise-100">
            Cette page n&apos;existe pas
          </h1>
          <p className="mx-auto mt-5 max-w-lisible text-corps-lg text-ink-muted">
            Le lien est cassé ou la page a été déplacée. Voici par où reprendre.
          </p>
          <div className="mt-8">
            <ButtonLink href="/" variante="secondaire" taille="lg">
              Retour à l&apos;accueil
            </ButtonLink>
          </div>
        </div>

        <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5">
          {RACCOURCIS.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="group glass glass-readable flex h-full flex-col rounded-lg p-5 transition-all duration-300 ease-doux hover:-translate-y-1.5 hover:shadow-lift motion-reduce:hover:translate-y-0 sm:p-6"
              >
                <h2 className="font-display text-[18px] font-semibold text-ardoise-900 dark:text-ardoise-100">
                  {r.titre}
                </h2>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink-muted">
                  {r.texte}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-4 text-terre-700 transition-transform duration-300 group-hover:translate-x-1 dark:text-terre-300"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-10 flex max-w-4xl justify-center sm:mt-14">
          <FaqSearch compact />
        </div>
      </div>
    </div>
  );
}
