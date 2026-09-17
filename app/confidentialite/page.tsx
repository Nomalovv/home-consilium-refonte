import Link from "next/link";
import {
  BlocLegal,
  PageEditoriale,
} from "@/components/sections/PageEditoriale";
import { confidentialite } from "@/content/legal";
import { construireMetadata } from "@/lib/seo";

export const metadata = construireMetadata({
  titre: "Politique de confidentialité",
  description:
    "Données collectées, finalités, durées de conservation, destinataires, droits RGPD et cookies : la politique de confidentialité de Home Consilium.",
  chemin: "/confidentialite",
});

export default function ConfidentialitePage() {
  return (
    <PageEditoriale
      titre={confidentialite.titre}
      chapeau={confidentialite.intro}
      chemin="/confidentialite"
    >
      {confidentialite.sections.map((section) => (
        <BlocLegal key={section.titre} titre={section.titre}>
          <ul className="space-y-3">
            {section.paragraphes.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 text-[15.5px] leading-relaxed text-ink"
              >
                <span
                  aria-hidden="true"
                  className="mt-[11px] h-1 w-3 shrink-0 rounded-full bg-terre-500"
                />
                {p}
              </li>
            ))}
          </ul>
        </BlocLegal>
      ))}

      <p className="mt-10 border-t pt-8 text-[15px] text-ink-muted">
        Voir également nos{" "}
        <Link href="/mentions-legales" className="lien-souligne font-medium text-terre-700 dark:text-terre-300">
          mentions légales
        </Link>
        .
      </p>
    </PageEditoriale>
  );
}
