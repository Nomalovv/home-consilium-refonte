import Link from "next/link";
import {
  BlocLegal,
  PageEditoriale,
} from "@/components/sections/PageEditoriale";
import { mentionsLegales } from "@/content/legal";
import { contact } from "@/content/entreprise";
import { construireMetadata } from "@/lib/seo";

export const metadata = construireMetadata({
  titre: "Mentions légales",
  description:
    "Mentions légales du site de Home Consilium, courtier en travaux en Normandie.",
  chemin: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <PageEditoriale
      titre={mentionsLegales.titre}
      chapeau={mentionsLegales.miseAJour}
      chemin="/mentions-legales"
    >
      {mentionsLegales.blocs.map((bloc) => (
        <BlocLegal key={bloc.titre} titre={bloc.titre}>
          <dl className="space-y-3">
            {bloc.lignes.map((ligne, i) => (
              <div
                key={`${bloc.titre}-${i}`}
                className="grid gap-1 sm:grid-cols-[220px_1fr] sm:gap-5"
              >
                {ligne.label && (
                  <dt className="text-[14.5px] font-medium text-ink-muted">
                    {ligne.label}
                  </dt>
                )}
                <dd
                  className={`text-[15.5px] leading-relaxed text-ink ${ligne.label ? "" : "sm:col-span-2"}`}
                >
                  {ligne.label === "Téléphone" ? (
                    <a href={contact.telephoneLien} className="lien-souligne">
                      {ligne.valeur}
                    </a>
                  ) : ligne.label === "Email" ? (
                    <a href={contact.emailLien} className="lien-souligne break-all">
                      {ligne.valeur}
                    </a>
                  ) : (
                    ligne.valeur
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </BlocLegal>
      ))}

      <p className="mt-10 border-t pt-8 text-[15px] text-ink-muted">
        Voir également notre{" "}
        <Link href="/confidentialite" className="lien-souligne font-medium text-terre-700 dark:text-terre-300">
          politique de confidentialité
        </Link>
        .
      </p>
    </PageEditoriale>
  );
}
