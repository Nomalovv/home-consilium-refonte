import { cn } from "@/lib/utils";
import { entreprise } from "@/content/entreprise";

type Teinte = "couleur" | "clair" | "sombre";

const couleurs: Record<Teinte, { forme: string; trait: string }> = {
  couleur: { forme: "#234B44", trait: "#C77850" },
  clair: { forme: "#FFFFFF", trait: "#FFFFFF" },
  sombre: { forme: "#16302C", trait: "#16302C" },
};

/**
 * Symbole « Le Trait d'Union » : deux formes disjointes reliées par un trait
 * diagonal franc — le trait d'union entre le projet et les bons artisans.
 */
export function LogoSymbole({
  className,
  teinte = "couleur",
  titre,
}: {
  className?: string;
  teinte?: Teinte;
  titre?: string;
}) {
  const c = couleurs[teinte];
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block", className)}
      role={titre ? "img" : "presentation"}
      aria-label={titre}
      aria-hidden={titre ? undefined : true}
      focusable="false"
    >
      {titre && <title>{titre}</title>}
      <rect x="12" y="8" width="14" height="30" rx="7" fill={c.forme} />
      <rect x="38" y="26" width="14" height="30" rx="7" fill={c.forme} />
      <line
        x1="19"
        y1="34"
        x2="45"
        y2="30"
        stroke={c.trait}
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
}

type LogoProps = {
  /** horizontal : symbole + logotype côte à côte ; empile : logotype sous le symbole. */
  orientation?: "horizontal" | "empile";
  teinte?: Teinte;
  className?: string;
  classeTexte?: string;
  tailleSymbole?: string;
};

export function Logo({
  orientation = "horizontal",
  teinte = "couleur",
  className,
  classeTexte,
  tailleSymbole = "h-9 w-9",
}: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex select-none",
        orientation === "horizontal"
          ? "flex-row items-center gap-2.5"
          : "flex-col items-center gap-2",
        className,
      )}
    >
      <LogoSymbole className={tailleSymbole} teinte={teinte} />
      <span
        className={cn(
          "font-display text-[19px] font-semibold leading-none tracking-tight",
          teinte === "clair" && "text-white",
          teinte === "sombre" && "text-ardoise-900",
          teinte === "couleur" && "text-ardoise-900 dark:text-ardoise-100",
          classeTexte,
        )}
      >
        {entreprise.nom}
      </span>
    </span>
  );
}
