import Link from "next/link";
import { libellesFilAriane } from "@/lib/navigation";

export type MailleFilAriane = { nom: string; chemin: string };

/** Construit les mailles à partir d'un chemin, ex. /services/cuisine-salle-de-bain. */
export function maillesDepuisChemin(chemin: string): MailleFilAriane[] {
  const segments = chemin.split("/").filter(Boolean);
  const mailles: MailleFilAriane[] = [{ nom: "Accueil", chemin: "/" }];
  let cumul = "";
  for (const seg of segments) {
    cumul += `/${seg}`;
    mailles.push({ nom: libellesFilAriane[seg] ?? seg, chemin: cumul });
  }
  return mailles;
}

export function Breadcrumb({ mailles }: { mailles: MailleFilAriane[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-5 sm:mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13.5px] text-ink-muted">
        {mailles.map((m, i) => {
          const dernier = i === mailles.length - 1;
          return (
            <li key={m.chemin} className="flex items-center gap-2">
              {dernier ? (
                <span aria-current="page" className="font-medium text-ardoise-900 dark:text-ardoise-100">
                  {m.nom}
                </span>
              ) : (
                <Link
                  href={m.chemin}
                  className="transition-colors hover:text-terre-700 dark:hover:text-terre-300"
                >
                  {m.nom}
                </Link>
              )}
              {!dernier && (
                <span aria-hidden="true" className="text-ink-muted/60">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
