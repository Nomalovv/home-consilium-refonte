import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  ton?: "ardoise" | "terre" | "miel" | "glass";
};

/**
 * Pastilles arrondies. Contrastes vérifiés :
 * Ardoise 900 sur Terre cuite 200 = 9,9:1 · Ardoise 900 sur Miel 200 = 10,5:1 ·
 * Terre cuite 300 sur brun sombre = 9,9:1.
 */
const tons = {
  ardoise:
    "bg-ardoise-100 text-ardoise-900 dark:bg-white/10 dark:text-ardoise-100",
  terre:
    "bg-terre-200 text-terre-800 dark:bg-terre-700/30 dark:text-terre-300",
  miel: "bg-miel-200 text-miel-800 dark:bg-miel-700/25 dark:text-miel-300",
  glass: "glass glass-sm text-ardoise-900 dark:text-ardoise-100",
};

export function Badge({ children, className, ton = "ardoise" }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold tracking-wide sm:text-[13px]",
        tons[ton],
        className,
      )}
    >
      {children}
    </span>
  );
}
