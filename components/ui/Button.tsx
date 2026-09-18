import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variante = "primaire" | "secondaire" | "glass" | "discret" | "lien";
type Taille = "sm" | "md" | "lg";

/**
 * Boutons en forme de galet (rayon plein) : plus doux, plus accueillant.
 * Sur mobile, la hauteur de cible reste ≥ 44 px mais le rembourrage et la
 * typographie sont réduits, et la largeur reste automatique : deux gros
 * blocs pleine largeur empilés mangeaient tout l'écran.
 */
const base =
  "inline-flex w-auto max-w-full items-center justify-center gap-2 cible-tactile rounded-full font-medium " +
  "transition-all duration-300 ease-doux disabled:opacity-50 disabled:pointer-events-none " +
  "text-center leading-tight active:scale-[.98] motion-reduce:active:scale-100";

/**
 * Contrastes vérifiés sur crème #FBF6EE et sur brun sombre #1A1613 :
 * - blanc sur Terre cuite 700 (#9C4F30) = 5,9:1 → bouton d'accent ✔
 * - blanc sur Ardoise 900 (#1A322B) = 13,7:1 ✔
 * - Terre cuite 700 sur crème = 5,5:1 (texte) ✔ / Terre cuite 300 sur sombre = 9,9:1 ✔
 * Terre cuite 600 (4,1:1 sur crème) n'est jamais utilisé pour du texte.
 */
const variantes: Record<Variante, string> = {
  primaire:
    "bg-ardoise-900 text-white hover:bg-ardoise-800 shadow-soft hover:shadow-lift " +
    "dark:bg-ardoise-100 dark:text-ardoise-900 dark:hover:bg-white",
  secondaire:
    "bg-terre-700 text-white font-semibold shadow-chaud hover:bg-terre-800 hover:shadow-lift " +
    "hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
  glass:
    "glass glass-sm text-ardoise-900 dark:text-ardoise-100 hover:shadow-lift " +
    "hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
  discret:
    "text-ardoise-700 dark:text-ardoise-100 hover:bg-terre-100 dark:hover:bg-white/10",
  /** Lien d'action secondaire : ne pèse rien visuellement, idéal sur mobile. */
  lien:
    "px-1 font-semibold text-terre-700 underline decoration-terre-300 decoration-2 " +
    "underline-offset-[6px] hover:decoration-terre-700 dark:text-terre-300 " +
    "dark:decoration-terre-700 dark:hover:decoration-terre-300",
};

const tailles: Record<Taille, string> = {
  sm: "text-[14px] px-3.5 py-2 sm:text-[14.5px] sm:px-4",
  md: "text-[14.5px] px-4 py-2.5 sm:text-[15px] sm:px-5 sm:py-3",
  lg: "text-[15px] px-5 py-2.5 sm:text-[17px] sm:px-7 sm:py-3.5",
};

/** La variante « lien » ne porte pas de rembourrage de bouton. */
const taillesLien: Record<Taille, string> = {
  sm: "text-[14px]",
  md: "text-[14.5px] sm:text-[15px]",
  lg: "text-[15px] sm:text-[16px]",
};

type CommunProps = {
  children: ReactNode;
  variante?: Variante;
  taille?: Taille;
  className?: string;
};

type BoutonProps = CommunProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LienProps = CommunProps & {
  href: string;
  /** Lien externe / protocole (tel:, mailto:). */
  externe?: boolean;
  "aria-label"?: string;
};

function classes(variante: Variante, taille: Taille, className?: string) {
  return cn(
    base,
    variantes[variante],
    variante === "lien" ? taillesLien[taille] : tailles[taille],
    className,
  );
}

export function Button({
  children,
  variante = "primaire",
  taille = "md",
  className,
  ...rest
}: BoutonProps) {
  return (
    <button className={classes(variante, taille, className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  variante = "primaire",
  taille = "md",
  className,
  externe,
  ...rest
}: LienProps) {
  const c = classes(variante, taille, className);

  if (
    externe ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("http")
  ) {
    return (
      <a href={href} className={c} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={c} {...rest}>
      {children}
    </Link>
  );
}
