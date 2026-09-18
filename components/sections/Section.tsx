import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Sections plus denses sur mobile (moins d'air perdu au défilement),
 * respirantes à partir de la tablette.
 */
export function Section({
  children,
  className,
  id,
  aria,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  aria?: string;
}) {
  return (
    <section
      id={id}
      aria-label={aria}
      className={cn("relative py-9 sm:py-12 md:py-20 lg:py-24", className)}
    >
      <div className="conteneur">{children}</div>
    </section>
  );
}

export function TitreSection({
  surtitre,
  titre,
  intro,
  /** Version raccourcie de l'intro, affichée en dessous de `sm`. */
  introCourte,
  centre = false,
  className,
}: {
  surtitre?: string;
  titre: string;
  intro?: string;
  introCourte?: string;
  centre?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(centre && "mx-auto text-center", "max-w-3xl", className)}>
      {surtitre && (
        <p className="mb-2.5 flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-terre-700 dark:text-terre-300 sm:text-[13px]">
          <span
            aria-hidden="true"
            className={cn(
              "h-px w-6 shrink-0 bg-terre-500",
              centre && "hidden",
            )}
          />
          {surtitre}
        </p>
      )}
      <h2 className="text-balance font-display text-h2 font-semibold text-ardoise-900 dark:text-ardoise-100">
        {titre}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-3 max-w-lisible text-corps-lg text-ink-muted sm:mt-4",
            centre && "mx-auto",
          )}
        >
          {introCourte ? (
            <>
              <span className="sm:hidden">{introCourte}</span>
              <span className="hidden sm:inline">{intro}</span>
            </>
          ) : (
            intro
          )}
        </p>
      )}
    </div>
  );
}
