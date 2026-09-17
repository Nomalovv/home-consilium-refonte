import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  ton?: "ardoise" | "terre" | "glass";
};

const tons = {
  ardoise:
    "bg-ardoise-100 text-ardoise-900 dark:bg-white/10 dark:text-ardoise-100",
  terre: "bg-terre-300/50 text-terre-700 dark:bg-terre-700/25 dark:text-terre-300",
  glass: "glass glass-sm text-ardoise-900 dark:text-ardoise-100",
};

export function Badge({ children, className, ton = "ardoise" }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-[13px] font-medium tracking-wide",
        tons[ton],
        className,
      )}
    >
      {children}
    </span>
  );
}
