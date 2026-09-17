import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
      className={cn("relative py-16 md:py-24", className)}
    >
      <div className="conteneur">{children}</div>
    </section>
  );
}

export function TitreSection({
  surtitre,
  titre,
  intro,
  centre = false,
  className,
}: {
  surtitre?: string;
  titre: string;
  intro?: string;
  centre?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(centre && "mx-auto text-center", "max-w-3xl", className)}>
      {surtitre && (
        <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-terre-700 dark:text-terre-300">
          {surtitre}
        </p>
      )}
      <h2 className="font-display text-h2 font-semibold text-ardoise-900 dark:text-ardoise-100">
        {titre}
      </h2>
      {intro && (
        <p className="mt-4 max-w-lisible text-corps-lg text-ink-muted">
          {intro}
        </p>
      )}
    </div>
  );
}
