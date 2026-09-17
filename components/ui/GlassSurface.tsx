import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

type Flou = "sm" | "md" | "lg";
type Rayon = "sm" | "md" | "lg" | "xl";

type Props = {
  children: ReactNode;
  className?: string;
  /** Niveau de flou : sm (badges/chips), md (nav/cartes), lg (modales/panneaux). */
  flou?: Flou;
  rayon?: Rayon;
  /**
   * À activer dès qu'un bloc de texte long est posé sur la surface :
   * remplace le dégradé translucide par une sous-couche opaque (≥ 94 %)
   * pour garantir le contraste du texte.
   */
  lisible?: boolean;
  as?: ElementType;
};

const classesFlou: Record<Flou, string> = {
  sm: "glass-sm",
  md: "",
  lg: "glass-lg",
};

const classesRayon: Record<Rayon, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

export function GlassSurface({
  children,
  className,
  flou = "md",
  rayon = "lg",
  lisible = false,
  as: Composant = "div",
}: Props) {
  return (
    <Composant
      className={cn(
        "glass",
        classesFlou[flou],
        classesRayon[rayon],
        lisible && "glass-readable",
        className,
      )}
    >
      {children}
    </Composant>
  );
}
