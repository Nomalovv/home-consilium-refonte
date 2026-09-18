import { cn } from "@/lib/utils";

/**
 * Univers graphique : nappes de couleur chaudes (terre cuite, miel) avec
 * l'ardoise en appui, plutôt que l'inverse. `animate-blob-drift` est
 * neutralisé par la règle globale `prefers-reduced-motion`, et l'ensemble
 * est masqué en `prefers-reduced-transparency` / `prefers-contrast: more`.
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
        ? "opacity-75"
        : "opacity-45";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "blobs pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        opacite,
        className,
      )}
    >
      {/* Terre cuite, en haut à gauche : la couleur qui accueille */}
      <div
        className="animate-blob-drift absolute -left-[14%] -top-[16%] h-[58vw] max-h-[640px] w-[58vw] max-w-[640px] rounded-full blur-[90px]"
        style={{ background: "var(--blob-a)" }}
      />
      {/* Miel, en haut à droite : la lumière */}
      <div
        className="animate-blob-drift absolute -right-[12%] top-[4%] h-[44vw] max-h-[500px] w-[44vw] max-w-[500px] rounded-full blur-[100px] [animation-delay:-9s]"
        style={{ background: "var(--blob-b)" }}
      />
      {/* Ardoise, en bas : l'ancrage */}
      <div
        className="animate-blob-drift absolute bottom-[-22%] left-[26%] h-[46vw] max-h-[540px] w-[46vw] max-w-[540px] rounded-full blur-[110px] [animation-delay:-18s]"
        style={{ background: "var(--blob-c)" }}
      />
    </div>
  );
}
