import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Rend la carte entièrement cliquable. */
  href?: string;
  /** Texte long à l'intérieur : passe sur une sous-couche opaque. */
  lisible?: boolean;
  survol?: boolean;
};

export function Card({
  children,
  className,
  href,
  lisible = false,
  survol = true,
}: Props) {
  const classes = cn(
    "glass rounded-lg p-6 md:p-7 transition-all duration-300 ease-doux",
    lisible && "glass-readable",
    survol && "hover:shadow-lift hover:-translate-y-0.5",
    href && "block focus-visible:outline-offset-4",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
