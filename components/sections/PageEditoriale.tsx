import type { ReactNode } from "react";
import { Breadcrumb, maillesDepuisChemin } from "@/components/layout/Breadcrumb";

/**
 * Gabarit éditorial : pas de glass lourd, priorité à la lisibilité.
 */
export function PageEditoriale({
  titre,
  chapeau,
  chemin,
  children,
}: {
  titre: string;
  chapeau?: string;
  chemin: string;
  children: ReactNode;
}) {
  return (
    <div className="pt-28 md:pt-36">
      <div className="conteneur pb-20">
        <Breadcrumb mailles={maillesDepuisChemin(chemin)} />
        <header className="max-w-lisible">
          <h1 className="font-display text-h1 font-semibold text-ardoise-900 dark:text-ardoise-100">
            {titre}
          </h1>
          {chapeau && (
            <p className="mt-4 text-corps-lg text-ink-muted">{chapeau}</p>
          )}
        </header>
        <div className="mt-12 max-w-lisible">{children}</div>
      </div>
    </div>
  );
}

export function BlocLegal({
  titre,
  children,
}: {
  titre: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-10 border-t pt-8 first:border-0 first:pt-0">
      <h2 className="font-display text-h2 font-semibold text-ardoise-900 dark:text-ardoise-100">
        {titre}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
