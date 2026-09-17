import type { ReactNode } from "react";
import { Blobs } from "@/components/ui/Blobs";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type Props = {
  surtitre?: string;
  titre: string;
  intro?: string;
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
  intro,
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
        compact ? "pt-28 pb-12 md:pt-36 md:pb-16" : "pt-32 pb-16 md:pt-44 md:pb-24",
        className,
      )}
    >
      <Blobs variante={compact ? "section" : "hero"} />
      <div className="conteneur">
        <div
          className={cn(
            "grid items-center gap-10",
            aside && "lg:grid-cols-[1.15fr_0.85fr] lg:gap-14",
          )}
        >
          <div>
            {badge && (
              <Badge ton="glass" className="mb-5">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-terre-600"
                />
                {badge}
              </Badge>
            )}
            {surtitre && (
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-terre-700 dark:text-terre-300">
                {surtitre}
              </p>
            )}
            <h1 className="font-display text-h1 font-semibold text-ardoise-900 dark:text-ardoise-100">
              {titre}
            </h1>
            {intro && (
              <p className="mt-5 max-w-lisible text-corps-lg text-ink-muted">
                {intro}
              </p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {aside && <div>{aside}</div>}
        </div>
      </div>
    </section>
  );
}
