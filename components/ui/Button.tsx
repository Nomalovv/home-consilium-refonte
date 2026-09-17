import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variante = "primaire" | "secondaire" | "glass" | "discret";
type Taille = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 cible-tactile rounded-sm px-5 py-3 font-medium " +
  "transition-all duration-300 ease-doux disabled:opacity-50 disabled:pointer-events-none " +
  "text-center leading-tight";

/**
 * Contrastes : Terre cuite 600 (#B5623E) sur blanc = 4,4:1 — réservé aux gros
 * boutons (texte ≥ 18px / bold). Le texte courant utilise Ardoise 700+ ou 900.
 */
const variantes: Record<Variante, string> = {
  primaire:
    "bg-ardoise-900 text-white hover:bg-ardoise-800 shadow-soft hover:shadow-lift " +
    "dark:bg-ardoise-100 dark:text-ardoise-900 dark:hover:bg-white",
  secondaire:
    "bg-terre-600 text-white text-[17px] font-semibold hover:bg-terre-700 shadow-soft hover:shadow-lift",
  glass:
    "glass glass-sm text-ardoise-900 dark:text-ardoise-100 hover:shadow-lift",
  discret:
    "text-ardoise-700 dark:text-ardoise-100 hover:bg-ardoise-100/70 dark:hover:bg-white/10",
};

const tailles: Record<Taille, string> = {
  md: "text-[15px] px-5 py-3",
  lg: "text-[17px] px-7 py-4",
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

export function Button({
  children,
  variante = "primaire",
  taille = "md",
  className,
  ...rest
}: BoutonProps) {
  return (
    <button
      className={cn(base, variantes[variante], tailles[taille], className)}
      {...rest}
    >
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
  const classes = cn(base, variantes[variante], tailles[taille], className);

  if (externe || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
