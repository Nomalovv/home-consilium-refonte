import { cn } from "@/lib/utils";

/**
 * Univers graphique : blobs doux ardoise / terre cuite en arrière-plan.
 * `animate-blob-drift` est neutralisé par la règle globale
 * `prefers-reduced-motion`, et l'ensemble est masqué en
 * `prefers-reduced-transparency` / `prefers-contrast: more`.
 */
export function Blobs({
  className,
  variante = "hero",
}: {
  className?: string;
  variante?: "hero" | "section" | "discret";
}) {
  const opacite =
    variante === "hero"
      ? "opacity-100"
      : variante === "section"
        ? "opacity-70"
        : "opacity-40";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "blobs pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        opacite,
        className,
      )}
    >
      <div
        className="absolute -left-[12%] -top-[18%] h-[52vw] max-h-[620px] w-[52vw] max-w-[620px] rounded-full blur-[90px] animate-blob-drift"
        style={{ background: "var(--blob-a)" }}
      />
      <div
        className="absolute -right-[10%] top-[8%] h-[40vw] max-h-[480px] w-[40vw] max-w-[480px] rounded-full blur-[100px] animate-blob-drift [animation-delay:-9s]"
        style={{ background: "var(--blob-b)" }}
      />
      <div
        className="absolute bottom-[-20%] left-[28%] h-[44vw] max-h-[520px] w-[44vw] max-w-[520px] rounded-full blur-[110px] animate-blob-drift [animation-delay:-18s]"
        style={{ background: "var(--blob-c)" }}
      />
    </div>
  );
}
