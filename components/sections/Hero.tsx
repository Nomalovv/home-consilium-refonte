import type { ReactNode } from "react";
import { Blobs } from "@/components/ui/Blobs";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type Props = {
  surtitre?: string;
  titre: string;
  /** Version raccourcie du titre, affichée en dessous de `sm`. */
  titreCourt?: string;
  intro?: string;
  /** Version raccourcie de l'intro, affichée en dessous de `sm`. */
  introCourte?: string;
  badge?: string;
  children?: ReactNode;
  /** Contenu affiché à droite sur grand écran (panneau stats, illustration...). */
  aside?: ReactNode;
  className?: string;
  compact?: boolean;
};

export function Hero({
  surtitre,
  titre,
  titreCourt,
  intro,
  introCourte,
  badge,
  children,
  aside,
  className,
  compact = false,
}: Props) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        compact
          ? "pb-10 pt-24 sm:pt-28 md:pb-16 md:pt-36"
          : "pb-12 pt-24 sm:pt-28 md:pb-24 md:pt-44",
        className,
      )}
    >
      <Blobs variante={compact ? "section" : "hero"} />
      <div className="conteneur">
        <div
          className={cn(
            "grid items-center gap-8 md:gap-10",
            aside && "lg:grid-cols-[1.12fr_0.88fr] lg:gap-14",
          )}
        >
          <div>
            {badge && (
              <Badge ton="terre" className="mb-4">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-terre-600"
                />
                {badge}
              </Badge>
            )}
            {surtitre && (
              <p className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-terre-700 dark:text-terre-300 sm:text-[13px]">
                {surtitre}
              </p>
            )}
            <h1 className="text-balance font-display text-h1 font-semibold text-ardoise-900 dark:text-ardoise-100">
              {titreCourt ? (
                <>
                  <span className="sm:hidden">{titreCourt}</span>
                  <span className="hidden sm:inline">{titre}</span>
                </>
              ) : (
                titre
              )}
            </h1>
            {intro && (
              <p className="mt-4 max-w-lisible text-corps-lg text-ink-muted sm:mt-5">
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
            {children && <div className="mt-6 sm:mt-8">{children}</div>}
          </div>
          {aside && <div>{aside}</div>}
        </div>
      </div>
    </section>
  );
}
