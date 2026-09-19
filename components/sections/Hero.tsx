import type { ReactNode } from "react";
import { Blobs } from "@/components/ui/Blobs";
import { Badge } from "@/components/ui/Badge";
import type { Photo } from "@/content/entreprise";
import { asset, cn } from "@/lib/utils";

type Props = {
  surtitre?: string;
  titre: string;
  /** Version raccourcie du titre, affichée en dessous de `sm`. */
  titreCourt?: string;
  intro?: string;
  /** Version raccourcie de l'intro, affichée en dessous de `sm`. */
  introCourte?: string;
  badge?: string;
  children?: ReactNode;
  /** Contenu affiché à droite sur grand écran (panneau stats, illustration...). */
  aside?: ReactNode;
  /**
   * Photo d'ambiance posée en fond du premier écran. Tant que son `src` est
   * vide, le hero garde ses nappes de couleur dessinées (`Blobs`).
   */
  fond?: Photo;
  className?: string;
  compact?: boolean;
};

export function Hero({
  surtitre,
  titre,
  titreCourt,
  intro,
  introCourte,
  badge,
  children,
  aside,
  fond,
  className,
  compact = false,
}: Props) {
  const photoFond = fond?.src ? fond : undefined;

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        photoFond
          ? /*
              Premier écran plein cadre : la photo d'ambiance occupe toute la
              hauteur visible, header compris. `min-h` (et non `h`) pour que le
              contenu puisse dépasser sur les écrans très courts.
              `marge-barre-mobile` réserve la place de la barre d'action fixe.
            */
            "marge-barre-mobile flex min-h-[100svh] flex-col justify-center pt-20 sm:pt-24 md:pb-16 md:pt-28 lg:pb-20 lg:pt-32"
          : compact
            ? "pb-10 pt-24 sm:pt-28 md:pb-16 md:pt-36"
            : "pb-12 pt-24 sm:pt-28 md:pb-24 md:pt-44",
        className,
      )}
    >
      {photoFond ? (
        <FondPhoto photo={photoFond} />
      ) : (
        <Blobs variante={compact ? "section" : "hero"} />
      )}
      <div className="conteneur">
        <div
          className={cn(
            "grid items-center gap-7 sm:gap-8 md:gap-10",
            /*
              Deux colonnes dès la tablette quand il y a un panneau : empilé,
              le premier écran devenait deux fois trop haut à 768 px.
            */
            aside &&
              "md:grid-cols-[1.08fr_0.92fr] lg:grid-cols-[1.12fr_0.88fr] lg:gap-14",
          )}
        >
          <div>
            {badge && (
              <Badge ton="terre" className="mb-4">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-terre-600"
                />
                {badge}
              </Badge>
            )}
            {surtitre && (
              <p className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-terre-700 dark:text-terre-300 sm:text-[13px]">
                {surtitre}
              </p>
            )}
            <h1 className="text-balance font-display text-h1 font-semibold text-ardoise-900 dark:text-ardoise-100">
              {titreCourt ? (
                <>
                  <span className="sm:hidden">{titreCourt}</span>
                  <span className="hidden sm:inline">{titre}</span>
                </>
              ) : (
                titre
              )}
            </h1>
            {intro && (
              <p className="mt-4 max-w-lisible text-corps-lg text-ink-muted sm:mt-5">
                {introCourte ? (
                  <>
                    <span className="sm:hidden">{introCourte}</span>
                    <span className="hidden sm:inline">{intro}</span>
                  </>
                ) : (
                  intro
                )}
              </p>
            )}
            {children && <div className="mt-6 sm:mt-8">{children}</div>}
          </div>
          {aside && <div>{aside}</div>}
        </div>
      </div>
    </section>
  );
}

/**
 * Photo d'ambiance du premier écran.
 *
 * Image décorative : `alt` vide **et** `aria-hidden`, le sens est porté par le
 * texte du hero. Pas de `next/image` (export statique sans optimiseur) :
 * dimensions intrinsèques + `object-cover`, donc aucun saut de mise en page.
 * Le cadrage est décalé vers la droite sur écran étroit pour garder la villa
 * et la mer dans le champ malgré le recadrage.
 *
 * Le voile (`.voile-hero`, défini dans globals.css) est bâti sur le token de
 * fond de page : il s'assombrit donc automatiquement en thème sombre et garde
 * le texte au-dessus du seuil AA dans les deux thèmes.
 */
function FondPhoto({ photo }: { photo: Photo }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(photo.src)}
        alt=""
        aria-hidden="true"
        width={860}
        height={573}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[70%_42%] sm:object-[64%_44%] lg:object-[56%_46%]"
      />
      <span className="voile-hero absolute inset-0" />
    </div>
  );
}
